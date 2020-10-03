import React from 'react';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col, Modal, Form, Input, Select, Calander } from 'antd';
import {HomeOutlined, HeartOutlined, ProfileOutlined, CopyOutlined, FormOutlined, DeleteOutlined} from '@ant-design/icons';
import {FormInstance} from 'antd/lib/form';
import './REACT.css';
import jwt from "jwt-decode";
import { Route, Link, NavLink, Switch} from 'react-router-dom';
import LoginContent  from './account/login';
import {LoginHead} from './account/login';
import LoginContext from './account/Util'
import {getToken} from './account/Util';
import {HomePage, HomeContent, NoPage }  from './part/Home';
import {Favourite, FavouriteContent } from './part/Favourite';
import {FavouriteGroup, FavouriteGroupContent } from './part/FavouriteGroup';
import {Todo, TodoContent } from './part/Todo';
import {TodoGroup, TodoGroupContent } from './part/TodoGroup';

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;
// 공용 문자
const GetURL = createContext('http://localhost:8000/');
const Headerstyle = createContext({ backgroundColor:'#f9f9f9',width:'100%', height:'70px', padding:'10px', textAlign:'left'});
const Del = createContext(<Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} />);
const Newbutton = createContext((text)=>(
    <Button style={{float:'right', marginRight:'30px', marginLeft:'30px', backgroundColor:'#e8e8e8', marginTop:'10px', marginBottom:'10px'}}>{text}</Button>
))


export default function REACT_Project(){
    // 메뉴 축소용
    const [islogin, setIslogin] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [logoHTML, setLogoHTML] = useState('Todo Project');
    const [triggertext, setTriggertext] = useState('< 접기')
    const uncsiderstyle = {
        float:"left", backgroundColor :"#f9f9f9", height:"100%",
    };
    const [siderstyle, setSiderstyle] = useState(uncsiderstyle);
    const login = useContext(LoginContext)

    //메뉴, 축소 버튼 스타일
    const menustyle ={
        backgroundColor:'#f9f9f9'
    }

    const collapsemenu = () =>{
        setCollapsed(collapsed===true ? false: true);
        setLogoHTML(collapsed===false? <HomeOutlined/> :'Todo Project');
        setTriggertext(collapsed===false? '>' : '< 접기')
    };

    const [itemcollapsed, setItemcollapsed] = useState(false)
    const toggleitemcollapse = () =>{
        setItemcollapsed(!itemcollapsed)
    }

    const triggerbutton = (<div style={{background:'#ddf', color:'ButtonText'}}> {triggertext} </div>);

    const [isLogin, setIsLogin] = React.useState(false);

    const handleClick = e => {
        console.log('click ', e);
      };

    const logoutsite = () =>{
        window.localStorage.removeItem("token");
        setIsLogin(false);
    }

    useEffect (() =>{
      const token = window.localStorage.getItem("token");
      if (token!=null){
        setIsLogin(true);
      }
      else {
          setIsLogin(false);
      }
    }, [])


    return (        
        <LoginContext.Provider value={{isLogin, setIsLogin}}>
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
            <Header className='header' style={{backgroundColor:'#f9f9f9'}}>
                <div style={{float:"right"}}>{isLogin?<Link to='' onClick={logoutsite}>로그아웃</Link>:<Link to="/login">로그인</Link>}</div>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/home" component={HomePage}/>
                <Route exact path="/favouritegroup" component={isLogin?FavouriteGroup:LoginHead}/>
                <Route exact path="/todogroup" component={isLogin?TodoGroup:LoginHead}/>
                <Route exact path="/login" component={LoginHead}/>
                <Route path="/favourite/:id" component={isLogin?Favourite:LoginHead}/>
                <Route path="/favourite" component={isLogin?Favourite:LoginHead}/>
                <Route path="/todo/:id" component={isLogin?Todo:LoginHead}/>  
                <Route path="/todo" component={isLogin?Todo:LoginHead}/>                     
                <Route component={NoPage}/>
            </Switch>
            </Header>
        <Content id="content" className="content">
        <Switch>
                <Route exact path="/" component={HomeContent}/>
                <Route exact path="/home" component={HomeContent}/>
                <Route exact path="/favouritegroup" component={isLogin?FavouriteGroupContent:LoginContent}/>
                <Route exact path="/todogroup" component={isLogin?TodoGroupContent:LoginContent}/>
                <Route exact path="/login" component={LoginContent}/>
                <Route path="/favourite/:id" component={isLogin?FavouriteContent:LoginContent}/>
                <Route path="/favourite" component={isLogin?FavouriteContent:LoginContent}/>
                <Route path="/todo/:id" component={isLogin?TodoContent:LoginContent}/>  
                <Route path="/todo" component={isLogin?TodoContent:LoginContent}/>                     
                <Route component={NoPage}/>
        </Switch>
            
        </Content>
        </Layout>
        
        </Layout>
        </LoginContext.Provider>      
    )

}
