import React from 'react';

//컴포넌트 클래스형, 함수형
export default function Count() {
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
