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


function Favourite({location, match, history}){
    const geturl = useContext(GetURL);
    const inArray = useContext(InArray); // inArray 함수 정의
    const addbuttonlayout = useContext(Newbutton)('+ 추가');
    const [FavouriteGroups, setFavouriteGroups] = useState([]); // favouritegroup 
    const [Favourites, setFavourites] = useState({});
    const [ID, setID] = useState(1)
    const login = useContext(LoginContext)
    
    
    useEffect(()=>{
        Axios.get(geturl+"todo/favouritegroup/")
        .then(res => {
            console.log(res);
            const { data } = res;
            console.log(data);
            setFavouriteGroups(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    useEffect(()=>{
        Axios.get(geturl+"todo/allFavourite", {headers:{'Authorization':'JWT '+window.localStorage.getItem("token")}} )
        .then(res => {
            console.log(res);
            const { data } = res;
            console.log(data);
            setFavourites(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    const [showModal, setShowModal] = useState(false); // 등록폼 모달 보여주기
    const [showConfirmModal, setShowConfirmModal] = useState(false); // 전송 확인/실패 모달 보여주기
    const [sendSuccess, setSendSuccess] = useState(false); //전송 성공/실패 여부
    const addfavourite = () => { //전송 등록
        setShowModal(true);
        setShowConfirmModal(false);
        setSendSuccess(false);
    }
    const confirmmodal = () =>{ //보내기
        setShowModal(false);
    }
    const cancelmodal = () =>{// 취소
        setShowConfirmModal(false);
        setShowModal(false);
    }
    const confirmmessage = (value) =>{ //전송 성공시 메시지 여부
        console.log(value);
        Axios.post(geturl+"todo/favourite/", {name:value.name, 
                                                url:value.url, 
                                                memo:value.memo, 
                                                group:value.group })
            .then(res=>{ console.log(res);
                    setSendSuccess(true);
                    setShowConfirmModal(true);
                    setShowModal(false);})
            .catch(error=>{console.log(error);
                    setSendSuccess(false);}) 
    }
    
    const checkshowmodal = () => {setShowConfirmModal(false);}
    const addbutton = {...addbuttonlayout, props:{...addbuttonlayout.props, onClick:addfavourite}};
    const modifybuttonlayout = useContext(Newbutton)('V 수정');

    if (match.params.id) {
        var x =[]
        for (var i=0; i<Favourites.length;i++){
            x = [...x, (Favourites[i].seq)];
        }
        let ind = x.indexOf(parseInt(match.params.id))
        console.log('seq', x)
        let ind_fav = Favourites[ind]
        return (<>
        <h1>{Favourites[ind]!=undefined?Favourites[ind].name:'none'}</h1>

        </>
        );
    }
    else{
        return (<> <h1>즐겨찾기 목록{addbutton}</h1>
        {<Modal title="등록"
        visible={showModal}
        okButtonProps = {{style:{display:'none'}}}
        cancelButtonProps = {{style:{display:'none'}}}
        >
            <Form
            name="등록"
            onFinish={confirmmessage}
            >
                <Form.Item // 이름 입력
                label="명칭" name="name" 
                rules={[{required:true, message:'이름을 입력하세요'}, 
                {type:'string', max:50, message:'너무 이름이 깁니다' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item // 이름 입력
                label="URL" name="url" 
                rules={[{required:true, message:'URL을 입력하세요'}, 
                {type:'string', max:100, message:'데이터가 너무 깁니다' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item // 이름 입력
                label="메모" name="memo" 
                rules={[{required:true, message:'메모를 입력하세요'}, ]}>
                    <TextArea/>
                </Form.Item>
                <Form.Item // 이름 입력
                label="그룹" name="group" 
                rules={[{required:true, message:'반드시 그룹을 선택해야 합니다'}, ]}>
                    <Select>
                        {FavouriteGroups.map( v => (<Option value={v.seq}>{v.name}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button style={{float:'right', margin:'5px'}} type="primary" htmlType="submit"> 등록 </Button>
                    <Button style={{float:'right', margin:'5px'}} onClick={cancelmodal}> 취소 </Button>
                </Form.Item>
            </Form>
        </Modal>}
        {<Modal title="전송 확인"
            visible={showConfirmModal}
            cancelButtonProps={{style:{display:'none'}}}
            okText='확인'
            onOk={checkshowmodal}>
            {sendSuccess?'전송 성공':'전송 실패'}
        </Modal>}
        </>)
        ;
    }
}

function FavouriteContent({location, match, history}){
    const [favourites, setFavourites] = useState([]);
    let del = useContext(Del);
    let geturl = useContext(GetURL);
    useEffect(()=>{
        Axios.get(geturl+"todo/favourite/")
        .then(res => {
            console.log(res);
            const { data } = res;
            setFavourites(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    if (match.params.id){
        let seqlist = favourites.map((v) => (v.seq) )
        let i = seqlist.indexOf(parseInt(match.params.id))

        const column = [
            {title:'항목', dataIndex:'property', key:'property' },
            {title:'내용', dataIndex:'contents', key:'contents'}
        ]

    
        const datasource = [
            {key:'1', property: '이름', contents:(favourites[i]==undefined?'':favourites[i].name)},
            {key:'2', property: 'URL', contents:(favourites[i]==undefined?'':favourites[i].url)},
            {key:'3', property: '메모', contents:(favourites[i]==undefined?'':favourites[i].memo)},
            {key:'4', property: '그룹', contents:(favourites[i]==undefined?'':favourites[i].group_name)},
        ] 
        
        return ( <>
            <Table columns={column} dataSource={datasource}>
            </Table>
            </>);

    }
    else { 
    
        return(
            <List
               itemLayout="horizontal"
               dataSource={favourites}
               renderItem = {favourite=>{
                let onclick = () => {Axios.delete(geturl+'todo/favourite/'+favourite.seq+'/')}
                let del2 = <Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} onClick={onclick} />
                   
                return (
               <List.Item>
                   <List.Item.Meta
                   title={favourite.name}
               description={<div> {favourite.group_name}
                / {favourite.reg_date} {del2} </div>}
                   />
               </List.Item>
    
               )}}
               />
    )
    }
}

export {Favourite, FavouriteContent} ;