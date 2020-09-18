import React from 'react';

function Changelist(){

    const [number, setNumber] = React.useState(
        [1,2,3,4,5,6,7,8,9])
    
    const click = () =>{
        setNumber([...number.slice(0,4), 0,0, ...number.slice(6,9)]);
    }
    
    return(
        <>
        <span>{JSON.stringify(number)}</span>
        <button onClick={click}>클릭</button>
        </>
    );
        
}


export default Changelist;
