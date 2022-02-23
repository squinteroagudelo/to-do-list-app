const colors = require('colors');
const Task = require("./task");

class Tasks {
    _list = {};

    get arrayList() {
        const list = [];
        Object.keys(this._list).forEach(key => list.push(this._list[key]));
        return list;
    }

    constructor() {
        this._list = {};
    }

    loadTasksFile(tasks = []) {
        tasks.forEach(task => this._list[task.id] = task);
    }

    createTask(description = '') {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    deleteTask(id) {
        if (this._list[id]) delete this._list[id];
    }

    fullList() {
        console.log();
        this.arrayList.forEach((task, i) => {
            console.log(`${colors.green(i+1)}${'.'.green} ${task.description} :: ${task.done ? 'Completada'.green : 'Pendiente'.red}`);
        });
    }

    donePendingList(done = true) {
        console.log();
        let counter = 0;
        this.arrayList.forEach((task, i) => {
            if (done && task.done) {
                counter++;
                console.log(`${colors.green(i + 1)}${'.'.green} ${task.description} :: ${task.done.green}`);
            } else if (!done && !task.done) {
                counter++;
                console.log(`${colors.red(i + 1)}${'.'.red} ${task.description} :: ${'Pendiente'.red}`);
            }
        });
        console.log(`\n${counter} ${counter > 1 ? 'Tareas' : 'Tarea'} ${ done ? counter > 1 ? 'Completadas'.green : 'Completada'.green : counter > 1 ? 'Pendientes'.red : 'Pendiente'.red}.`);
    }

    toggleDoneTasks(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.done) task.done = new Date().toISOString();
        });

        this.arrayList.forEach(task => {
            if (!ids.includes(task.id)) this._list[task.id].done = null;
        });
    }
}

module.exports = Tasks;