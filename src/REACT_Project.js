import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col } from 'antd';
import {HomeOutlined, HeartOutlined, ProfileOutlined, CopyOutlined, FormOutlined} from '@ant-design/icons';
import './REACT.css';
import Axios from 'axios';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

const styleContext = createContext({});

export default function REACT_Project(){
    // 메뉴 축소용
    const [collapsed, setCollapsed] = useState(false);
    const [logoHTML, setLogoHTML] = useState('Todo Project');
    const [triggertext, setTriggertext] = useState('< 접기')
    const uncsiderstyle = {
        float:"left", backgroundColor :"#f9f9f9", height:"100%",
    };
    const [siderstyle, setSiderstyle] = useState(uncsiderstyle);

    //메뉴, 축소 버튼 스타일
    const menustyle ={
        backgroundColor:'#f9f9f9'
    }

    const collapsemenu = () =>{
        setCollapsed(collapsed===true ? false: true);
        setLogoHTML(collapsed===false? 'H' :'Todo Project');
        setTriggertext(collapsed===false? '>' : '< 접기')
    };

    const [itemcollapsed, setItemcollapsed] = useState(false)
    const toggleitemcollapse = () =>{
        setItemcollapsed(!itemcollapsed)
    }

    const triggerbutton = (<div style={{background:'#ddf', color:'ButtonText'}}> {triggertext} </div>);

    //Header용
    
    const headerstyle = { backgroundColor:'#f9f9f9',width:'100%', height:'70px', padding:'10px', textAlign:'left'};


    return (        
        <Layout className='layout'>
        <Sider style={siderstyle} collapsible onCollapse = {collapsemenu} width='180' scollapsedWidth='80' trigger={triggerbutton} >
            <div id='logo'><a href="/home" id="logo_link">{logoHTML}</a></div>
            <Menu mode='inline' style={menustyle} collapsedWidth="60" >
                <SubMenu key="favouriteset" icon={<HeartOutlined/>} title='즐겨찾기'>
                    <Menu.Item key='favouritegrouop' icon={<CopyOutlined/>}><NavLink exact to="/favouritegroup">그룹관리</NavLink></Menu.Item>
                    <Menu.Item key='favourite' icon={<FormOutlined/>}><NavLink to="/favourite">즐겨찾기</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="todoset" icon={<ProfileOutlined/>} title='할 일'>
                    <Menu.Item key='todogroup' icon={<CopyOutlined/>}><NavLink exact to="/todogroup">그룹관리</NavLink></Menu.Item>
                    <Menu.Item key='todo' icon={<FormOutlined/>}><NavLink to="/todo">할 일</NavLink></Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        <Layout className='layoutRight'>
            <Header className='header' style={{backgroundColor:'#e9e9e9'}}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/favouritegroup" component={Favouritegroup}/>
                <Route exact path="/todogroup" component={Todogroup}/>
                <Route path="/favourite/:id" component={Favourite}/>
                <Route path="/favourite" component={Favourite}/>
                <Route path="/todo/:id" component={Todo}/>  
                <Route path="/todo" component={Todo}/>                     
                <Route component={NoPage}/>
            </Switch>
            </Header>
        <Content id="content" className="content">
        <Switch>
                <Route exact path="/" component={HomeContent}/>
                <Route exact path="/home" component={HomeContent}/>
                <Route exact path="/favouritegroup" component={FavouritegroupContent}/>
                <Route exact path="/todogroup" component={TodogroupContent}/>
                <Route path="/favourite/:id" component={FavouriteContent}/>
                <Route path="/favourite" component={FavouriteContent}/>
                <Route path="/todo/:id" component={TodoContent}/>  
                <Route path="/todo" component={TodoContent}/>                     
                <Route component={NoPage}/>
        </Switch>
            
        </Content>
        </Layout>
        
        </Layout>        
    )

}

function Home({location, match, history}){
    return <h1>HOME</h1>;
}
function Favouritegroup({location, match, history}){
    return <h1>즐겨찾기 그룹</h1>;
}
function Todogroup({location, match, history}){
    return <h1>할 일 그룹</h1>;
}
function Favourite({location, match, history}){
    const buttonstyle = {float:'right', backgroundColor:'#eef', verticalAlign:'middle'};
    
    if (match.params.id) {
        return "Favourite "+match.params.id;
    }
    else{
        return <h1>즐겨찾기 목록<Button style={buttonstyle}>+ 추가</Button></h1>;
    }
}
function Todo({location, match, history}){
    const buttonstyle = {float:'right', backgroundColor:'#eef', verticalAlign:'middle'};

    if (match.params.id) {
        return "Todo "+match.params.id;
    }
    else{
        return <h1>할 일 목록<Button style={buttonstyle}>+ 추가</Button></h1>
    }
}

function NoPage({location, match, history}){
    return "NOPAGE";
}

function HomeContent({location, match, history}){
    return <img src="https://www.clipartmax.com/png/small/186-1867388_recycle-bin-icon-trash-bin-icon-png.png" style={{width:'50px'}}/>;
}
function FavouritegroupContent({location, match, history}){
    const [favourites, setFavourites] = useState([]);
    const del = <img style={{float:'right', width:'20px', height:'20px'}}
    src="https://www.clipartmax.com/png/small/186-1867388_recycle-bin-icon-trash-bin-icon-png.png"/>
    useEffect(()=>{
        Axios.get("http://localhost:8000/todo/favouritegroup/")
        .then(res => {
            console.log(res);
            const { data } = res;
            console.log(data);
            setFavourites(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    return(
             <List
                itemLayout="horizontal"
                dataSource={favourites}
                renderItem = {(item)=>(
                <List.Item>
                    <List.Item.Meta
                    title={item.name}
                    description={del}
                    />
                </List.Item>
                )}
                />
    )
}
function TodogroupContent({location, match, history}){
    const [todos, setTodos] = useState([]);
    const del = <img style={{float:'right', width:'20px', height:'20px'}}
    src="https://www.clipartmax.com/png/small/186-1867388_recycle-bin-icon-trash-bin-icon-png.png"/>
    useEffect(()=>{
        Axios.get("http://localhost:8000/todo/todogroup/")
        .then(res => {
            console.log(res);
            const { data } = res;
            setTodos(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    return(
        <List
           itemLayout="horizontal"
           dataSource={todos}
           renderItem = {(item)=>(
           <List.Item>
               <List.Item.Meta
               title={item.name}
               description={del}
               />
           </List.Item>
           )
           }
           />
)
}
function FavouriteContent({location, match, history}){
    const [favourites, setFavourites] = useState([]);
    const del = <img style={{float:'right', width:'20px', height:'20px'}}
    src="https://www.clipartmax.com/png/small/186-1867388_recycle-bin-icon-trash-bin-icon-png.png"/>
    useEffect(()=>{
        Axios.get("http://localhost:8000/todo/favourite/")
        .then(res => {
            console.log(res);
            const { data } = res;
            setFavourites(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])


    if (match.params.id){

        return ( 'Favourite_Content '+match.params.id   );

    }
    else { 
    
        return(
            <List
               itemLayout="horizontal"
               dataSource={favourites}
               renderItem = {favourite=>(
               <List.Item>
                   <List.Item.Meta
                   title={favourite.name}
               description={<div> {favourite.group}
                / {favourite.reg_date} {del} </div>}
                   />
               </List.Item>
    
               )}
               />
    )
    }
}
function TodoContent({location, match, history}){
    const del = <img style={{float:'right', width:'20px', height:'20px'}}
    src="https://www.clipartmax.com/png/small/186-1867388_recycle-bin-icon-trash-bin-icon-png.png"/>
    const [todospend, setTodospend] = useState([]);
    const [todosprogress, setTodosprogress] = useState([]);
    const [todosend, setTodosend] = useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:8000/todo/todo/")
        .then(res => {
            console.log(res);
            const { data } = res;
            console.log(data)
            var data_pend = [] //Pending 리스트
            var data_progress = [] //Inprogress 리스트
            var data_end = [] // End 리스트
            for (var i=0; i<data.length;i++){
                switch(data[i].status){
                    case 'Pending': 
                        data_pend.push(data[i]);
                        break;
                    case 'Inprogress':
                        data_progress.push(data[i]);
                        break;
                    case 'End':
                        data_end.push(data[i]);
                        break;
                }
            }
            setTodospend(data_pend);
            setTodosprogress(data_progress);
            setTodosend(data_end);
        }).catch(error=>{
            console.log(error);
        })
    }, [])
    if (match.params.id){
    return "Todo "+match.params.id;}
    else { 
        return (
            <Row gutter={[8, 16]}>
  <Col span={8}>
      <h2>대기중</h2>
      <List
               itemLayout="horizontal"
               dataSource={todospend}
               renderItem = {todo=>(
               <List.Item>
                   <List.Item.Meta
                   title={todo.name}
               description={<div> {todo.group}
                / {todo.end_date} {del} </div>}
                   />
               </List.Item>
    
               )}
               />
    

  </Col>
  <Col span={8}>
  <h2>진행중</h2>
  <List
               itemLayout="horizontal"
               dataSource={todosprogress}
               renderItem = {todo=>(
               <List.Item>
                   <List.Item.Meta
                   title={todo.name}
               description={<div> {todo.group}
                / {todo.end_date} </div>}
                   />
               </List.Item>
    
               )}
               />

  </Col>
  <Col span={8}>
  <h2>완료</h2>
  <List
               itemLayout="horizontal"
               dataSource={todosend}
               renderItem = {todo=>(
               <List.Item>
                   <List.Item.Meta
                   title={todo.name}
               description={<div> {todo.group}
                / {todo.end_date} </div>}
                   />
               </List.Item>
    
               )}
               />

  </Col>
</Row>
        );

    }
}
