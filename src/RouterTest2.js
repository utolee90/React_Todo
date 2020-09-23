import React from 'react';
import queryString from 'query-string';
// import 'antd/dist/antd.css';
import { Menu, List } from 'antd';
import API from 'Api';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

export default function RouterTest() {
    const active = {}
    const [current, setCurrent] = React.useState('home');

    const handleClick =(e) =>{
        setCurrent(e.key);

    }
    return (        
        <>
        <div id="menu">
            <Menu onClick={handleClick} selectedKeys={current} mode='horizontal'>
                <Menu.Item key='home'><NavLink exact to="/" activeStyle={active}>홈</NavLink></Menu.Item>
                <Menu.Item key='student'><NavLink exact to="/students" activeStyle={active}>학생</NavLink></Menu.Item>
                <Menu.Item key='score'><NavLink exact to="/scores" activeStyle={active}>점수</NavLink></Menu.Item>
            </Menu>
        </div>
        <div id="content">
        <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/students" component={Students}/>
                <Route exact path="/scores" component={Scores}/>                
                <Route component={NoPage}/>
            </Switch>

        </div>
        </>        
    )
}


function Home({history, location, match})
{
    return(
        <div>
            HOME
        </div>
    )
}

function Students({location, match, history})
{
    const [students, setStudents] = React.useState([]);
    React.useEffect(()=>{
        API.get("study/students/")
        .then(res => {
            console.log(res);
            const { data } = res;
            setStudents(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])
    return(
        <List
        itemLayout='horizontal'
        dataSource={students}
        renderItem={ item=>(
            <List.Item>
                <List.Item.Meta
                    title={item.name}
                    description={item.address+' / '+item.email}
                    />
            </List.Item>
        )}
        />
    );
}
function Scores({location, match, history})
{
    const [scores, setScores] = React.useState([]);
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
    return(
        <List
        itemLayout='horizontal'
        dataSource={scores}
        renderItem={ item=>(
            <List.Item>
                <List.Item.Meta
                    title={item.name}
                    description={'수학: '+item.math+' / 과학: '+item.science+' / 영어: '+item.english+' /'}
                    />
            </List.Item>
        )}
        />
    );
}

function NoPage({history, location, match})
{
    return(
        <div>
            NO CONTENT
        </div>
    )
}
