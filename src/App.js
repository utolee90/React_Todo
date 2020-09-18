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
import Changescore from 'Changescore';
import Changelist from 'Changelist';
import Sumbox from 'Sumbox';
import HoverTest from 'HoverTest';

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

  function StateTest(){
    const [num,setNum] = React.useState(10);
    const [txt,setTxt] = React.useState('안녕하세요');
    const [obj,setObj] = React.useState({name:'홍길동',age:30,address:'인천시'});
    const [lis,setLis] = React.useState(['1','3','5','7'])
    const click = () =>{
      //비동기식  ->가장 아래 하나만 동작
      setNum(num+1)
      //setNum(num+2)
      //함수를 사용해서 동기처럼 동작 가능
      //setNum((x)=>x+1)
      //setNum((x)=>x+2)

      setObj({...obj, age:40});
      setLis([...lis.slice(0,2),0,0]); // 데이터 바꿀 때 확인. 
    }
    const change = (e) =>{
      setNum(e.target.value)
    }

    return(
    <>
    <input value={num} onChange={change}/>
    <div>{num}</div>
    <div>{txt}</div>
    <div>{obj.name} {obj.age} {obj.address}</div>
    <div>{JSON.stringify(obj)}</div>
    <div>{lis[0]}</div>
    <div>{'['+lis.toString(', ')+']'}</div>
    <button onClick={click}>값 변경</button>
    </>
    )
    }
  function StateTest2(){
      const [num,setNum] = React.useState(0)
      const [obj,setObj] = React.useState({name:'홍길동',age:30,address:'인천시'});
      const click=()=>{
      setNum(num+1)
      setObj({...obj,name:'이진범'})
      }
      return(
      <>
      {num}
      {JSON.stringify(obj)}
      <button onClick={click}>클릭</button>
      </>
      )
      }

    
function Prerender() {
  const [x, setX] = React.useState();
  const [y, setY] = React.useState();
  const [z, setZ] = React.useState(0);

  function changeX(e) {
    setX(parseInt(e.target.value));
  }
  function changeY(e) {
    setY(parseInt(e.target.value));
    
  }
  
  const changeZ = (e) =>{
    setZ(e.target.value)
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


function App() { // jsx - HTML과 유사 - 그러나 JS 코드로 내부적으로 변환.
    
    const [z, setZ] = React.useState(0);
    var x=0;
    var y=0;
    

    const dosum = () =>{
      setZ(x+y)
    }
    
  
    return (<div>
      <Welcome/>
      <ReactM/>
      <Buttontest/><br/>
      <List/>
      <TFtoggle/><br/>
      <StateTest/>
      <br/>
      <Changescore/><br/>
      <Changelist/><br/>
      <Sumbox/>
      <HoverTest/>
      
    </div>
  ); //컴포넌트 넣기 : 대문자로 사용.  
}

export default App;
