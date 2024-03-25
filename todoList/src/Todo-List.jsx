
import React, { useState, useEffect } from 'react'

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [date, setDate] = useState(new Date());

    function handleInputChange(event){
        setNewTask(event.target.value);
    }
    function addTask(){
        if(newTask.trim() !== ''){
            setTasks(prevTasks => [...prevTasks, {name: newTask, completed: false, date: dateOfCreation}]);
            setNewTask('');
        }
    }

    function handleEnterKeyPress(event){
        if(event.key === 'Enter'){
            if(newTask.trim() !== ''){
                setTasks(prevTasks => [...prevTasks, {name: newTask, completed: false, date: dateOfCreation}]);
                setNewTask('');
            }
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }
    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
    }
    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
    }
    function toggleCompletion(index){
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks)
    }

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks && storedTasks.length > 0){
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    
    document.body.style.backgroundColor = '#15151A' 
    const dateOfCreation = date.toDateString()
  return (
    <div className='todo-container'>
        <h1>TODO LIST</h1>
        <div className='input-container'>
            <input className='input' type='text' placeholder='Name task...' value={newTask} onChange={handleInputChange} onKeyDown={handleEnterKeyPress}/>
            <button className='button add-button' onClick={addTask}>Add Task</button>
        </div>
        <ul className='todo-list'>
            {tasks.map((task, index) => <li key={index} className='todo'>
                <div className='task-container'>
                    <div className='task-date-checkbox-container'>
                        <input className='completed' type='checkbox' onChange={() => toggleCompletion(index)}></input>
                        <div className='task-date-container'>
                            <p className={`task ${task.completed ? 'completed-task' : 'uncompleted-task'}`}>{task.name}</p>
                            <p className='date'>{dateOfCreation}</p>
                        </div>
                    </div>
                    <div className='delete-move-container'>
                        <button className='button delete-button' onClick={() => deleteTask(index)}>🚮</button>
                        <button className='button move-button up' onClick={() => moveTaskUp(index)}>⬆️</button>
                        <button className='button move-button down' onClick={() => moveTaskDown(index)}>⬇️</button>
                    </div>
                </div>
            </li>)}
        </ul>
    </div>
  )
}

export default TodoList
