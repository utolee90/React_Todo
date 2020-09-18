import React from 'react';
import './App.css';
import Count from 'Count';
import Welcome from 'Welcome';
import ReactM from 'ReactM';
import Fruits from 'Fruit';
import Buttontest from 'Buttontest';
import 'antd/dist/antd.css';
import List from 'List';
import TFtoggle from 'TFtoggle';

function JsxTest(){
  const user=2
  return(
  <>
  {
  (()=>{
  if(user==1) return <div>가위</div>;
  if(user==2) return <div>바위</div>;
  if(user==3) return <div>보</div>;
  })()
  }
  </>
  )
  };


function App() { // jsx - HTML과 유사 - 그러나 JS 코드로 내부적으로 변환.
  const listx= ['1','2','3']
    return (<div>
      <Welcome/>
      <ReactM/>
      <Buttontest/>
      <List/>
      <TFtoggle/>
    </div>
  ); //컴포넌트 넣기 : 대문자로 사용.  
}

export default App;
