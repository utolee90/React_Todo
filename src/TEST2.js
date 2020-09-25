// 2번 문제 실습용 REACT App

import React from 'react';
import Axios from 'axios';

export default function TEST2(){
    const imgstyle = {width:'40px', height:'40px', borderRadius:'50%' }
    const [users, setUsers] = React.useState([]);
    React.useEffect(()=>{
        Axios.get('https://api.github.com/users?since=1000')
        .then((res)=>{
            const {data} = res;
            console.log(data)
            setUsers(data);
        }
    )}, [] );

   return ( <div>
     {users.map((user, i)=>(
        <div key={i}><img src={user.avatar_url} style={imgstyle}/>{user.login}</div>
     )) }
    </div>
    );

}