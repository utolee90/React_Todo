import React from "react";

// 상태값 변경
const reducer = (prev, action) =>{
    const {type, value} = action;

    if (type ==='INCREASE'){
        return value+1;
    }
}

export default function TestReducer2(){
   
    const [cnt, dispatch] = React.useReducer(reducer, 0)

    const click = () =>{
        dispatch({type:"INCREASE", value:cnt})
    } 

    return(
        <>
        <div>현재 숫자는? {cnt}</div>
        <div onClick={click}>클릭</div>
        </>
    )

}