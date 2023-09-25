import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const ToDo = ({text, updateMode, deleteToDo, userId}) => {

// Filtra las tareas para mostrar solo las del usuario logeado
const isTaskBelongsToUser = text.userId === userId;

if (!isTaskBelongsToUser) {
  // Si la tarea no pertenece al usuario logeado, no la muestra
  return null;
}

  return (
    <div className='todo'>
        <div className='text'>{text}</div>
        <div className='icons'>
           <BiEdit className= 'icon' onClick={updateMode} />
           <AiFillDelete className= 'icon' onClick={deleteToDo} />
        </div>
    </div>
  )
}

export default ToDo