import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';

//컴포넌트 클래스형, 함수형
function Count() {
  const [cnt, setCnt] = React.useState(0); //상태값 0으로 초기화
  const click = () =>{
    setCnt(cnt+1);
  };
  return (<div id="content">
  합계 숫자는? <span>{cnt}</span>
<div onClick={click}>클릭</div>
</div>
  );

}

function App() { // jsx - HTML과 유사 - 그러나 JS 코드로 내부적으로 변환.
    return (<div>
      <Count/>
    </div>
  ); //컴포넌트 넣기 
}

export default App;
