import { useState, useEffect } from 'react'
import './App.css'
import '../../bootstrap-5.0.2-dist/css/bootstrap.min.css'
import Clock from './Clock'

function App() {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [description, setDescrption] = useState("");
  const [time, setTime] = useState("");
  const [checked, setChecked] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingTitle, setEditingTitle] = useState("")

  const handleCheck = (ev) => {
    let updatedList = [...checked];
    if (ev.target.checked) {
      updatedList = [...checked, ev.target.value];
    } else {
      updatedList.splice(checked.indexOf(ev.target.value, 1));
    }
    setChecked(updatedList)
  };
  const checkedItems = checked.length ? checked.reduce((total, item) => {
    return total + ", " + item;
  }) : " ";

  let isChecked = (item) => checked.includes(item) ? "checked-item" : "not-checked-item";
  let ishecked = (item) => checked.includes(item) ? "miniR" : "mini";

  const addTodo = (input, description, time) => {
    if (!input || !description || !time) {
      return
    }
    else {
      task.push({ Title: input, Description: description, Time: time })
      setTask([...task])
      setInput("");
      setDescrption("");
      setTime("");
    }
  }
  const deleteOne = (index) => {
    task.splice(index, 1)
    setTask([...task])
  }
  const clearAll = () => {
    setTask([])
  }

  function editTodo(id) {
    task[id].Title = editingTitle
    setTask([...task])
    setTodoEditing(null)
    setEditingTitle("")
  }

  return (
    <div className='body shadow'>
      <div className='first'>
        <Clock />
        {/* <div className='w-25 bg-success'>ToDo  APP</div> */}
      </div>
      <div className="second">
        <span className='w-100 d-flex justify-content-center fs-4'>Add task(s)</span>
        <div className="d-flex  w-100 justify-content-between mt-2">
          <input type="text" className='form-control w-50' placeholder='Title' value={input} onChange={(e) => setInput(e.target.value)} />
          <input type="text" className='form-control' placeholder='Description' value={description} onChange={(e) => setDescrption(e.target.value)} />
          <input type="time" className='form-control w-50' placeholder='Time' value={time} onChange={(e) => setTime(e.target.value)} />
          <button className='btn btn-success fs-5' onClick={() => addTodo(input, description, time)}>Add</button></div>


        {task.map((value, index) =>

          <div className='main  mt-3 w-100 bg-white shadow d-flex' key={index}>

            <div className={ishecked(value.Title) + " mini"}></div>
            <div className='w-100 bg-light cont'>
              <div className='content pe-2 ps-2'>
                <div>
                  <input value={value.Title} type="checkbox" onChange={handleCheck} />
                  {todoEditing === index ? <span><input type="text" onChange={(e) => setEditingTitle(e.target.value)} className='form-control edit-form  w-75' placeholder='Enter new title' /></span>
                    : <span className={isChecked(value.Title) + " fw-bold" + " fs-5"}> {value.Title}</span>}

                </div>
                <span className={isChecked(value.Title)}>{value.Time}</span>
              </div>
              <div className='content pe-2 ps-2'>
                <span className={isChecked(value.Title)}>{value.Description} </span>

                <div>
                  {todoEditing === index ? (<button className='btn btn-outline-success text-white btn-sm' onClick={() => editTodo(index)}>✔</button>) :
                    (<button className='btn btn-outline-info text-white btn-sm' onClick={() => setTodoEditing(index)}>🖊</button>)}


                  <button className='btn btn-outline-danger text-white btn-sm' onClick={() => deleteOne(index)}>🗑</button>
                </div>
              </div>
            </div>

          </div>

        )}
        <div className='d-flex w-100 justify-content-between mt-3'>
          <span>You have {task.length < 1 ? "no" : task.length} pending task{task.length <= 1 ? "" : "s"}  </span>
          <button className='btn btn-danger btn-sm' onClick={clearAll}>Clear All</button></div>
        {/* <div>items checked {checkedItems} </div> */}
      </div>


    </div>
  )
}

export default App
