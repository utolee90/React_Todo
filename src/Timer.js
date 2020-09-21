import React from 'react';

export default function Timer(){
    const [cnt,setCnt]=React.useState(0);
    const [curtime, setCurtime] = React.useState(new Date()); //Current time setting
    const [timer, setTimer] = React.useState([]);
    
    const click=()=>{
        setCnt(cnt+1);
        }
    
    React.useEffect(()=>{
    setTimer([...timer, new Date()]); //timer 리스트에 기록
    } , [cnt]) // 타임 기록
    React.useEffect(()=>{
        const rectime = setInterval(()=>setCurtime(new Date()),1000); //
        return () => clearInterval(rectime);
    }, [])

    return(
    <>
    <div>타이머개수 : {cnt}<button onClick={click}>추가</button></div>
    {timer.slice(1).map($time=>{return (
        <div>{$time.toISOString()} / 
        {parseInt((curtime.getTime()-$time.getTime())/1000 +1)+'초 경과'} </div>
        );
    }
    )}
    </>
    );
    }
