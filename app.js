const colors = require('colors');
const { inquirerMenu, pause, readInput, listTasksToDelete, confirm, tasksCheckList } = require('./helpers/inquirer');
const { saveTasks, readTasks } = require('./helpers/saveTasks');
const Tasks = require('./models/tasks');


const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    if (readTasks()) tasks.loadTasksFile(readTasks());

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const description = await readInput('Descripción:');
                tasks.createTask(description);
                break;
            case '2':
                tasks.fullList();
                break;
            case '3':
                tasks.donePendingList(true);
                break;
            case '4':
                tasks.donePendingList(false);
                break;
            case '5':
                const ids = await tasksCheckList(tasks.arrayList);
                tasks.toggleDoneTasks(ids);
                break;
            case '6':
                const id = await listTasksToDelete(tasks.arrayList);
                if (id !== '0') {
                    console.log();
                    const deleteTask = await confirm("¿Está seguro?");
                    if (deleteTask) {
                        let taskDeleted = tasks.arrayList.find(
                            (task) => task.id == id
                        );
                        tasks.deleteTask(id);
                        console.log();
                        console.log(
                            `Se ha eliminado la tarea ${colors.red(
                             taskDeleted.description
                         )}`
                        );
                    }
                }
                break;
        }

        saveTasks(tasks.arrayList);

        if (opt != 0) {
            console.log('\n');
            await pause();
        }

    } while (opt != '0');

}

main();