import React from 'react';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col, Modal, Form, Input, Select, DatePicker, Table, Tag, Space, message } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {FormInstance} from 'antd/lib/form';
import Axios from 'axios';
import jwt from "jwt-decode";
import { stringify } from 'query-string';
import {GetURL, Headerstyle, Del, Newbutton, InArray} from './Common';
import LoginContext from '../account/Util';
const {TextArea} = Input;
const {Option} = Select;
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;



function TodoGroup({location, match, history}){
    return <h1>할 일 그룹</h1>;
}

function TodoGroupContent({location, match, history}){
    const [todos, setTodos] = useState([]);
    let del = useContext(Del);
    let geturl = useContext(GetURL);
    
    useEffect(()=>{
        Axios.get(geturl+"todo/todogroup/")
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
           renderItem = {(item)=>{
            let onclick = () => {Axios.delete(geturl+'todo/todogroup/'+item.seq+'/')}
            let del2 = <Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} onClick={onclick} />

               return (
           <List.Item>
               <List.Item.Meta
               title={item.name}
               description={del2}
               />
           </List.Item>
           )}
           }
           />
)
}

export {TodoGroup, TodoGroupContent}