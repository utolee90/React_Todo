import React from 'react';
import './App.css';
import Count from 'Count';
import Welcome from 'Welcome';
import ReactM from 'ReactM';
import Fruits from 'Fruit';
import 'antd/dist/antd.css';


function App() { // jsx - HTML과 유사 - 그러나 JS 코드로 내부적으로 변환.
    return (<div>
      <Welcome/>
      <ReactM/>
      <Fruits/>
    </div>
  ); //컴포넌트 넣기 : 대문자로 사용.  
}

export default App;
