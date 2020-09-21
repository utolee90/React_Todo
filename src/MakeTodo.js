import React from 'react';
import 'MakeTodo.css';

function MakeTodo(){
    const [todolist, setTodolist] = React.useState(Array());
    const [todo, setTodo] = React.useState();
  
    const textcontent = (e) =>{
      setTodo(e.target.value);
    }

    const appendtodo = () =>{
        setTodolist([...todolist, todo]);
      }
    
    const deletetodo = (e) =>{
        let key_id = e.target.parentNode.id;
        let key_num = parseInt(key_id.slice(4));
        let new_todolist = [];
        for (var i=0; i<todolist.length; i++){
            if (i !=key_num){
                new_todolist.push(todolist[i]);
            }
        }
        setTodolist(new_todolist);
    }
  
    return (<>
    <input type='text' onChange={textcontent} onKeyPress={
        (e)=> {if (e.key ==='Enter'){appendtodo();}} 
    } />
    <input type='button' value='추가' onClick={appendtodo}/>
        {
            todolist.map(
            (v, i) => { return (<div key={i} id={`box_${i}`} className="todobox">{i} {v} <span onClick={deletetodo}>삭제</span></div>
             ); }
          )
        }
    </>
    );
  }
  

export default MakeTodo;