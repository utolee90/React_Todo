import React from 'react';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col, Modal, Form, Input, Select, DatePicker, Table, Tag, Space, message } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {FormInstance} from 'antd/lib/form';
import Axios from 'axios';
import jwt from "jwt-decode";
import { stringify } from 'query-string';
import {GetURL, Headerstyle, Del, Newbutton, InArray} from './Common';
import LoginContext from '../account/Util.js';
const {TextArea} = Input;
const {Option} = Select;
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;




function FavouriteGroup({location, match, history}){
    return <h1>즐겨찾기 그룹</h1>;
}

function FavouriteGroupContent({location, match, history}){

    let del = useContext(Del);
    let geturl = useContext(GetURL);
    
    //console.dir(del)
    
    const [favourites, setFavourites] = useState([]);
    useEffect(()=>{
        Axios.get(geturl+"todo/favouritegroup/")
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
                renderItem = {(item)=>{
                    
                    let onclick = () => {Axios.delete(geturl+'todo/favouritegroup/'+item.seq +'/')}
                    let del2 = <Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} onClick={onclick} />
                    return (
                    <List.Item>
                        <List.Item.Meta
                        title={item.name}
                        description={<div> {del2}</div>}
                        />
                    </List.Item>
                    )}}
                />
    );
    
}

export {FavouriteGroup, FavouriteGroupContent};