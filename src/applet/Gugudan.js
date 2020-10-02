import React from 'react';

function Gugudan(){
    const [x, setX] = React.useState(2);
    
    const numinput = (e) =>{
        if (!isNaN(e.target.value) && e.target.value !=NaN){
        setX(parseInt(e.target.value));
        }
      }
    
    const num_list = [1,2,3,4,5,6,7,8,9]; 
  
    return (
      <>
      <h2>구구단 출력 - 숫자 입력하면 자동으로 구구단 완성</h2>
      <input type='text' onChange={numinput}/>
      {num_list.map( (v,i)=>{
        return <div key={i}> {x} X {v} = {x*v}</div>;
      }
      )}
      </>
    );
   
  }
  

export default Gugudan; // export default -> 유일하게 export할 때 지정