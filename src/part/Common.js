import React from 'react';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col, Modal, Form, Input, Select, DatePicker, Table, Tag, Space, message } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {FormInstance} from 'antd/lib/form';
const {TextArea} = Input;
const {Option} = Select;
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

// 공용 문자

const GetURL = createContext('http://localhost:8000/api/');
const Headerstyle = createContext({ backgroundColor:'#f9f9f9',width:'100%', height:'70px', padding:'10px', textAlign:'left'});
const Del = createContext(<Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} /> );
const Newbutton = createContext((text)=>(
    <Button style={{float:'right', marginRight:'30px', marginLeft:'30px', backgroundColor:'#e8e8e8', marginTop:'10px', marginBottom:'10px'}}>{text}</Button>
))
const InArray = createContext((_e, _Array) => {
    let res = false;
    if (_Array.isArray() === true ){
        _Array.forEach(val=> {res = (res || val===_e);})
    }
    return res;
}
) // Array 안에 있는 여부 확인하는 함수

export {GetURL, Headerstyle, Del, Newbutton, InArray};