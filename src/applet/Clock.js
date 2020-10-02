import React from 'react';

export default function Clock(){
    const [data,setDate]=React.useState(new Date());
    React.useEffect(() => {
    const timer = setInterval(()=>setDate(new Date()),1000);
    return () => clearInterval(timer);
    },[])
    return(
    <div>{'현재 시각 : '}{data.toLocaleTimeString()}</div>
    );
    };
