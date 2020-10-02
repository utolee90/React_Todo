import React from 'react';

function HoverTest(){
    const style = {
    width:'100px',
    height:'100px',
    fontSize:'20px',
    backgroundColor:'yellow',
    textAlign:'center',
    lineHeight:'100px'
    };
    const [val, setVal] = React.useState(0);
    const m_over = () =>{
        setVal(1);
    }
    const mout = () =>{
        setVal(0);
    }

    return(
    <>
    <div style={style} 
    onMouseOver={m_over} 
    onMouseOut={mout}>{val}</div>
    </>
    )
    }

    export default HoverTest;