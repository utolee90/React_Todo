import React from 'react';

function TFtoggle(){
    const [toggle, setToggle] = React.useState(true);
    const togglechange = () =>{
      toggle ? setToggle(false) : setToggle(true);
    }
    
    return(
      <>
      {toggle? <div>참입니다.</div> : <div>거짓입니다.</div>}
      <button onClick={togglechange}>클릭</button>
      </>
    )
  }

export default TFtoggle;