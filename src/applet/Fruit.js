import React from 'react';

//컴포넌트 클래스형, 함수형
function Fruits() {
    let fruit0 = document.querySelector('#fruit');

    const fb = ()=>{
        document.querySelector('#fruit').innerHTML = '바나나';
        }
    const fa = ()=>{
        document.querySelector('#fruit').innerHTML = '사과';
        }
    const fs = ()=>{
         document.querySelector('#fruit').innerHTML = '딸기';
        }

        
    return (<div>
    <div id="fruit">0</div>
    <button onClick={fb}>바나나</button>
    <button onClick={fa}>사과</button>
    <button onClick={fs}>딸기</button>

    </div>);
  }

  export default Fruits;