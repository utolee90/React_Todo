import React from 'react';
import Axios from 'axios';
import API from 'Api';

export default function AxiosScore() {
    const [scores, setScores] = React.useState([]);
    const [id, setId] = React.useState(null);
    React.useEffect(()=>{
        API.get("study/scores/")
        .then(res => {
            console.log(res);
            const { data } = res;
            setScores(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])
    const click = (e) => {
        setId(e.target.id);
    }
    return(
        <div>
            학생 목록
            {
                scores.map((v)=>{
                    return <div id={v.id} onClick={click}>{v.name}</div>
                })
            }
            <hr/>
            <AxiosScoreDetail id={id}/>
        </div>
    )
}
function AxiosScoreDetail({id}) {
    const [score, setScore] = React.useState(null)
    React.useEffect(()=> {
        API.get("study/scores/" + id+'/')
        .then(res => {
            console.log(res);
            const { data } = res;  
            setScore(data);
        }).catch(error=>{
            console.log(error);
        })
        console.log("ID 가 변경됨~")
    },[id])
    return(
    <div>
        점수 정보<br/>
        {score && <div>
            <span>{score.name}</span> &nbsp;    
            수학 : <span>{score.math}</span> &nbsp;    
            과학 : <span>{score.science}</span> &nbsp;   
            영어 : <span>{score.english}</span>    
        </div>}
    </div>
    )
}