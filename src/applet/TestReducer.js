import React from "react";

// 상태값 변경
const reducer = (prev, action) =>{
    const {type, value} = action;

    if (type ==='CHANGE'){
        return value;
    }
    if (type ==='name'){
        return {...prev, name:value};
    }
    if (type ==='age'){
        return {...prev, age:value};
    }
}

export default function TestReducer(){
    /* const [name, dispatch] = React.useReducer(reducer, '홍길동');
    
    const click = () =>{
        dispatch({type:"CHANGE", value:"이몽룡"})
    } */

    // const [name, setName] = React.useState('홍길동');
    // const [age, setAge] = React.useState(35);
    // const [student, setStudent] = React.useState({name:'홍길동', age:35})
    const [student, dispatch] = React.useReducer(reducer, {
        "name":"홍길동", "age":35
    })

    const change = (e) =>{ // object 형태로 지정.
        /*
        const {value, name} = e.target;
        setStudent((prev)=>(
            {...prev, 
            [name]:value} // 태그명을 집어넣을 때 사용할 수 있다.
        ));
        */
       const {value, name:type} = e.target;
       dispatch({
           type, value:value,
       })
    }


    return(
        /*
        <>
        {name}
        <button onClick={click}>변경</button>
        </> */
        <>
        <div>{student.name} {student.age}</div>
        <input name="name" onChange={change} type="text" value={student.name}/> <br/>
        <input name="age" onChange={change} type="text" value={student.age}/>
        </>
    )

}