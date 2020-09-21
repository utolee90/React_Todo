import React from 'react';
import 'RPS.css';
import Scissors from "assets/Scissors.png";
import Rock from "assets/Rock.png";
import Paper from "assets/Paper.png";

export default function RPS(){

    const [resultbox, setResult] = React.useState(Array(3)); // 결과 제작

    
    const do_rps = (e) =>{
        let num1 = parseInt(e.target.id);
        let num2 = Math.floor(Math.random() *3);
        var txt;
        switch (num1-num2){
            case 0:
                txt = '비겼습니다.';
                break;
            case 1:
            case -2:
                txt = '이겼습니다.';
                break;
            case 2:
            case -1:
                txt = '졌습니다.';
                break;
            }
        setResult([drawing(num1), drawing(num2), txt]);
    } 

    const drawing = (_e) => {
        switch(_e){
            case 0:
                return <img src={Scissors}/>;
            case 1:
                return <img src={Rock}/>;
            case 2:
                return <img src={Paper}/>
        }
    }

return(
        <>
        <h1>셋 중 하나를 선택해주세요.</h1>
<div id='rps_box'>
<div id="scissors" onClick={do_rps}><img id="0" src={Scissors}/></div>
<div id="rock" onClick={do_rps}><img id="1" src={Rock}/></div>
<div id="paper" onClick={do_rps}><img id="2" src={Paper}/></div>
</div>
<div id="result">{resultbox[0]}{resultbox[1]}<br/>{resultbox[2]}</div>
</>
    );

}

function DO_RPS({e}) {
    
    let num1 = e
    let num2 = Math.floor(Math.random() *3);
    var txt;
    switch (num1-num2){
            case 0:
                txt = '비겼습니다.';
                break;
            case 1:
            case -2:
                txt = '이겼습니다.';
                break;
            case 2:
            case -1:
                txt = '졌습니다.';
                break;
            }
    
    return [num1, num2, txt]; //일단...

}
