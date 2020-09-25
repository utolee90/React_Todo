import React from 'react';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col, Modal, Form, Input, Select, Calander } from 'antd';
import {HomeOutlined, HeartOutlined, ProfileOutlined, CopyOutlined, FormOutlined, DeleteOutlined} from '@ant-design/icons';
import {FormInstance} from 'antd/lib/form';
import './REACT.css';
import Axios from 'axios';
import { Route, Link, NavLink, Switch} from 'react-router-dom';
import {HomePage, Favouritegroup, Todogroup, Favourite, Todo, NoPage,
    HomeContent, FavouritegroupContent, FavouriteContent, TodogroupContent, TodoContent } 
    from  'REACT_Project_sub'; 

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
            <Header className='header' style={{backgroundColor:'#f9f9f9'}}>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/home" component={HomePage}/>
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
