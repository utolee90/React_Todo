import React, { useEffect } from 'react';
import './App.css';
// import Count from 'Count';
// import Welcome from 'Welcome';
// import ReactM from 'ReactM';
// import Fruits from 'Fruit';
// import Buttontest from 'Buttontest';
import 'antd/dist/antd.css';
// import List from 'List';
// import TFtoggle from 'TFtoggle';
// import Changescore from 'Changescore';
// import Changelist from 'Changelist';
// import Sumbox from 'Sumbox';
// import HoverTest from 'HoverTest';
import Gugudan from 'Gugudan';
import MakeTodo from 'MakeTodo';
import Timer from 'Timer';
import Master from 'Master';
import Clock from 'Clock';
import TestReducer from 'TestReducer';
import TestReducer2 from 'TestReducer2';
import ContextApiTest from 'ContextApiTest';
import ContextApiTest2 from 'ContextApiTest2';
import ContextApiCourse from 'ContextApiCourse';
import AxiosTest from 'AxiosTest';

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

function Sumproj(){
  const [num1, setNum1] = React.useState();
  const [num2, setNum2] = React.useState();

  const change1 = (e) =>{
    setNum1(e.target.value);
  }
  const change2 = (e) =>{
    setNum2(e.target.value);
  }
  return (
    <>
    <div>
      <input value={num1} onChange={change1}/>{'+'}
      <input value={num2} onChange={change2}/>{'='}
      <input value={parseFloat(num1)+parseFloat(num2)}/>
    </div>
    
    </>

  )
}

function Parent(){
  const [num, setNum] = React.useState(25);

  const changenumber = (param) =>{
    setNum(param);
  }
  
  return(<>
    숫자:{num}
    <Child changenumber={changenumber}
    color="red"
    number={10}
    student = {{name:'홍길동', age:35, address:'인천'}}/>
    </>
  );
}

function Child(prop){ //prop -> 오브젝트 형태로 받는다. 
  const click = () =>{
    prop.changenumber(10);
  }
  return(
    <>
    <button onClick={click}>클릭</button>
    </>
  )

}

function Add({x,y}){
  return (<div>{x+y}</div>) ;
}

function CountArray(){
  const [state,setState]=React.useState(0);
  const click=()=>{
  setState(state+1);
  }
  
  React.useEffect(()=>{ //UseEffect -> [] 처음 웹페이지를 띄울 때에만 실행
  console.log("useEffect:componentDidMount")
  return ()=>{
  console.log("useEffect:componentWillUnmount")
  }
  },[])
  React.useEffect(()=>{ // [state] => state 값이 변할 때에만 실행. 
  console.log("useEffect:componentDidUpdate",state)
  },[state])
  return(
  <>
  현재 숫자는? <span>{state}</span>
  <div onClick={click}>클릭</div>
  </>
  );
  }



function App() { // jsx - HTML과 유사 - 그러나 JS 코드로 내부적으로 변환.
    
    
  
    return (<div>
      {/*<Welcome/>
      <Sumproj/> */
      /*<Parent/> */}
      {/*<Add x={10} y={20}/> */}
      {/* <Gugudan/><br/>
      <MakeTodo/><br/>
      <CountArray/><br/><br/>
      <Clock/><br/>
      <Master/><br/>
      <Timer/> */}
      {/* <TestReducer/>
      <TestReducer2/> */}
      <ContextApiTest/> 
      <ContextApiTest2/> 
      <ContextApiCourse/>
      <AxiosTest/>
    </div>
  ); //컴포넌트 넣기 : 대문자로 사용.  
}

export default App;
