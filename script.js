
const toDo = document.querySelector('#new-toDo');
const btn = document.querySelector('.btn');
const sortBtn = document.querySelector('.sort');
const sortToStartBtn = document.querySelector('.sort-to-start');

function addToList() {
    const newTask = toDo.value;
    createTask(newTask);
    toDo.value = '';
}

function sortList() {
    sortToStartBtn.style.display = 'block';
    sortBtn.style.display = 'none';

    const inputTasks = document.querySelectorAll('[name=to-do]');
    const spreaded = [...inputTasks];
    const sortedTasks = spreaded.sort((taskOne, taskTwo) => taskOne.value < taskTwo.value ? -1 : 1);
    const mainBlock = document.querySelector('.all-task');
    mainBlock.innerHTML = '';
    for(let task of sortedTasks){
        createTaskList(mainBlock, task.value);
    }
    dragDrop();
}

function sortRandom() {
    sortToStartBtn.style.display = 'none';
    sortBtn.style.display = 'block';

    const inputTasks = document.querySelectorAll('[name=to-do]');
    const spreaded = [...inputTasks];
    //const sortedTasks = spreaded.sort(() => Math.random() - 0.5);
    const sortedTasks = spreaded.reverse();
    const mainBlock = document.querySelector('.all-task');
    mainBlock.innerHTML = '';
    for(let task of sortedTasks){
        createTaskList(mainBlock, task.value);
    }
    dragDrop();
}

function createTask(task) {
    const mainBlock = document.querySelector('.all-task');
    mainBlock.style.display = 'block';
    createTaskList(mainBlock,task);

    dragDrop();

}

function deleteTask() {
    const mainBlock = document.querySelector('.all-task');
    mainBlock.addEventListener('click', function (event) {
        if (!event.target.matches('.delete')) return
        event.target.parentNode.remove();
        if (mainBlock.innerHTML == '') {
            mainBlock.style.display = 'none';
        }
    })
}

function deleteValue() {
    const deleteBtn = document.querySelector('.new-task .delete');
    deleteBtn.addEventListener('click', function(){
        toDo.value = '';
    })
}

function createTaskList(mainBlock,task){
    const blockTask = document.createElement('div');
    blockTask.classList.add('task');

    const dot = document.createElement('img');
    dot.classList.add('dots');
    dot.src = "icons/dots.png";
    dot.draggable = "true";

    const deleteX = document.createElement('img');
    deleteX.classList.add('delete');
    deleteX.src = "icons/grayX.png";

    const taskName = document.createElement('input');
    taskName.value = task;
    taskName.type = "text";
    taskName.name = "to-do"

    blockTask.append(dot, deleteX, taskName);
    mainBlock.appendChild(blockTask);
}

//the following two functions are responsible for dragging and dropping a task in the to-do list
function getDragElement(container, y){
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height/2;
        if(offset < 0 && offset > closest.offset){
            return { offset: offset, element: child}
        }else{
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function dragDrop() {
    const container = document.querySelector('.all-task');
    const draggables = document.querySelectorAll('.dots ');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.parentNode.classList.add('dragging');
        })
    
        draggable.addEventListener('dragend', () => {
            draggable.parentNode.classList.remove('dragging');
        })
    })

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if(afterElement == null){
            container.appendChild(draggable);
        }else{
            container.insertBefore(draggable, afterElement)
        }   
    })
    
}


sortBtn.addEventListener('click', ()=>{   
        sortList();  
});
sortToStartBtn.addEventListener('click', ()=>{   
    sortRandom();  
});
btn.addEventListener('click', addToList);

toDo.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addToList();
    }
});

deleteTask();
deleteValue();
dragDrop();


