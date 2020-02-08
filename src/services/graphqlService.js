const taskRepository = require('../repositories/taskRepository');
const userRepository = require('../repositories/userRepository');

// get all user
const getAllUser = async () => {
    return await userRepository.getAllUser();
}

// get all the tasks
const getAll = async () => {
    return await taskRepository.getAll();
}

// get all the task for user by id
const getAllTaskForUser = async (userId) => {
    let listTaskOfUser = [];
    await taskRepository.getAllTaskForUser(userId).then(rs => {
        listTaskOfUser = [...rs];
    });
    return listTaskOfUser;
}

// save a new employee
const save = async (task) => {
    return await taskRepository.save(task);
}

// delete employee by id
const deleteById = async (taskId) => {
    return await taskRepository.deleteById(taskId);
}

module.exports = {
    getAllUser,
    getAll,
    getAllTaskForUser,
    save,
    deleteById,
};