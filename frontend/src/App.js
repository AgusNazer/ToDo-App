
import { useEffect, useState } from 'react';
import './App.css';
import ToDo from './components/ToDo';
import { getAllToDo, addToDo } from './utils/HandleApi';

function App() {

const [toDo, setToDo] = useState([])
const [text, setText] = useState('')

useEffect(() =>{
 getAllToDo(setToDo)
}, [])

  return (
    <div className="App">
     <div className='container'>
     <h1>To Do App</h1>

     <div className='top'>
      <input 
      type='text' 
      placeholder='Add toDos'
      value={text}
      onChange={(e) => setText(e.target.value)}
      />

      <div className='add' onClick={() => addToDo(text, setText, setToDo)}>Add</div>
     </div>
       
        <div className='list'>

          {toDo.map((item) => 
            <ToDo key ={item._id} text={item.text} />
          )}

          <ToDo text='Hi'/>
          <ToDo text='Hi'/>
          <ToDo text='Hi'/>
        </div>

     </div>
    </div>
  );
}

export default App;
