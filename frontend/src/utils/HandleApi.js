import axios from 'axios'

const baseUrl = 'http://localhost:4000'

const getAllToDo = (setTodo) => {
    axios.get(baseUrl)
    .then(({data}) =>{
        console.log('data --->', data);
        setTodo(data)
    })
}

const addToDo = (text, setText, setToDo) => {
 axios
 .post(`${baseUrl}/save`, {text})
 .then((data) => {
    console.log(data);
    setText('')
    getAllToDo(setToDo)
 })
}

export {getAllToDo, addToDo};