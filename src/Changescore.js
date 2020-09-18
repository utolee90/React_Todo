import React from 'react';

function Changescore(){

    const [student, setStudent] = React.useState(
        {name:'홍길동', math:80, science:30, english:60})
    
    const click = () =>{
        setStudent({...student, math:0, science:0, english:0 });
    }
    
    return(
        <>
        <span>{JSON.stringify(student)}</span>
        <button onClick={click}>클릭</button>
        </>
    );
        
}


export default Changescore;
