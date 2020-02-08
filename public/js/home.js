let stringTaskArr = document.getElementById('listTasks').innerHTML;
let taskArr = JSON.parse(stringTaskArr);

// add task
function addTask() {
    // show modal
    $("#taskModal").modal();
    //  change header name of modal when using add button
    document.getElementById("exampleModalLabel").innerHTML = `ADD TASK`;
    document.getElementById("taskIdHidden").innerHTML = null;
    document.getElementById("taskName").innerHTML = '';
    document.getElementById("description").innerHTML = '';
    $("#checkBoxDone").prop("checked", false);
}

// edit task
function editTask(id) {
    // show modal
    $("#taskModal").modal();
    //  change header name of modal when using edit button
    document.getElementById("exampleModalLabel").innerHTML = `EDIT TASK`;
    document.getElementById("taskIdHidden").innerHTML = id;
    let taskToEdit = taskArr.filter(item => item.id == id)[0];
    document.getElementById("taskName").innerHTML = taskToEdit.taskname;
    document.getElementById("description").innerHTML = taskToEdit.description;
    if (taskToEdit.iscomplete) {
        $("#checkBoxDone").prop("checked", true);
    } else {
        $("#checkBoxDone").prop("checked", false);
    }
}

// delete task by id
function deleteTask(id) {
    // show modal delete task
    $("#confirmDeleteModal").modal();
    document.getElementById("taskIdHiddenDel").innerHTML = id;
    let taskToEdit = taskArr.filter(item => item.id == id)[0];
    document.getElementById("taskNameDel").innerHTML = taskToEdit.taskname;
    document.getElementById("descriptionDel").innerHTML = taskToEdit.description;
    if (taskToEdit.iscomplete) {
        $("#checkBoxDoneDel").prop("checked", true);
    } else {
        $("#checkBoxDoneDel").prop("checked", false);
    }
}

function validateForm() {
    if ($("#taskName").val() === '') {
        alert('Task name is required');
        return false;
    }
}