const fs = require('fs');

const file = './db/tasks.json';

const saveTasks = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readTasks = () => {
    if (!fs.existsSync(file)) return null;

    const tasks = fs.readFileSync(file, { encoding: 'utf-8' });
    return JSON.parse(tasks);
}

module.exports = {
    saveTasks,
    readTasks
}