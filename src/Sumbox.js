import React from 'react';

function Sumbox(){

    const [x, setX] = React.useState();
    const [y, setY] = React.useState();
    const [z, setZ] = React.useState(0);
  
    function changeX(e) {
      setX(parseFloat(e.target.value));
    }
    function changeY(e) {
      setY(parseFloat(e.target.value));
      
    }
    
    const changeZ = (e) =>{
       setZ(e.target.value);
    }
  
    return (<>
    <form>
      <input type='text' onChange={changeX}/>{'+'}
      <input type='text' onChange={changeY}/>{'='}
      <input type='text' value={x+y} onChange={changeZ}/>
    </form>
      </>
    );
        
}


export default Sumbox;
