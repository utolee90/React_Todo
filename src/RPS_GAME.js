import React from 'react';
import img1 from "assets/Scissors.png";
import img2 from "assets/Rock.png";
import img3 from "assets/Paper.png";

export default function RPS_GAME(){
    const images = [img1, img2, img3]
    const [user, setUser] = React.useState(null); // 플레이어 
    const [comp, setComp] = React.useState(null); // 컴퓨터
    const [txt, setTxt] = React.useState(null); // 결과문

    const click = (e) => {
        let num1 = e.target.getAttribute("user");
        let num2 = Math.floor(Math.random() *3);
        setUser(images[num1]);
        setComp(images[num2]);
        switch (num1-num2){
            case 0:
                setTxt('비겼습니다.');
                break;
            case 1:
            case -2:
                setTxt('이겼습니다.');
                break;
            case 2:
            case -1:
                setTxt('졌습니다.');
                break;
            }
    }
    
return(
        <>
        <h1>셋 중 하나를 선택해주세요.</h1>
<div id='rps_box'>
<img user={0} src={img1} onClick={click} style={{width:100}}/>
<img user={1} src={img2} onClick={click} style={{width:100}}/>
<img user={2} src={img3} onClick={click} style={{width:100}}/>
</div>
<div id='result_box' style={{textAlign:"center", alignSelf:"center"}}>
<img src={user} style={{width:100}}/>
<img src={comp} style={{width:100}}/>
<h2>{txt}</h2>
</div>
</>
    );

}
