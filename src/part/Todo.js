import React from 'react';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col, Modal, Form, Input, Select, DatePicker, Table, Tag, Space, message } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {FormInstance} from 'antd/lib/form';
import Axios from 'axios';
import jwt from "jwt-decode";
import { stringify } from 'query-string';
import {GetURL, Headerstyle, Del, Newbutton, InArray} from './Common';
const {TextArea} = Input;
const {Option} = Select;
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;


function Todo({location, match, history}){
    
    const geturl = useContext(GetURL);
    const inArray = useContext(InArray); // inArray 함수 정의
    const addbuttonlayout = useContext(Newbutton)('+ 추가');
    const [TodoGroups, setTodoGroups] = useState([]); // favouritegroup 
    useEffect(()=>{ // Todogroup 로딩
        Axios.get(geturl+"todo/todogroup/")
        .then(res => {
            console.log(res);
            const { data } = res;
            console.log(data);
            setTodoGroups(data);
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
        
        setShowConfirmModal(false);
        setShowModal(false);
    }
    const cancelmodal = () =>{// 취소
        setShowConfirmModal(false);
        setShowModal(false);
    }
    const confirmmessage = (value) =>{ //전송 성공시 메시지 여부
        console.log(value);
        Axios.post(geturl+"todo/todo/", {name:value.name, 
                                        status:value.status, 
                                        end_date:value.end_date._d.toISOString().slice(0,10), 
                                        group:value.group })
        .then(res=>{ console.log(res);
            setSendSuccess(true);
            setShowConfirmModal(true);
            setShowModal(false);})
        .catch(error=>{console.log(error);
        setSendSuccess(false);})        
    }
    const failmessage = () =>{ //전송 성공시 메시지 여부
        console.log("전송 실패")
    }
    const checkshowmodal = () => {setShowConfirmModal(false);}
    const checkcancelmodal = () => {setShowConfirmModal(false);}
    const addbutton = {...addbuttonlayout, props:{...addbuttonlayout.props, onClick:addfavourite}};

    if (match.params.id) {
        return "Todo "+match.params.id;
    }
    else{
        return (<> 
        <h1>할 일 목록{addbutton}</h1> 
                {
                <Modal title="등록"
                visible={showModal}
                okButtonProps = {{style:{display:'none'}}}
                cancelButtonProps = {{style:{display:'none'}}}
                >
                    <Form
                    name="submit"
                    onFinish={confirmmessage}
                    onFinishFailed={failmessage}
                    >
                    
                        <Form.Item // 이름 입력
                        label="명칭" name="name" 
                        rules={[{required:true, message:'이름을 입력하세요'}, 
                        {type:'string', max:50, message:'너무 이름이 깁니다' }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item // 이름 입력
                        label="상태" name="status" 
                        rules={[{required:true, message:'상태를 입력하세요'}, ]}>
                            <Select>
                                <Option value="Pending">대기중</Option>
                                <Option value="Inprogress">진행중</Option>
                                <Option value="End">완료</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item // 이름 입력
                        label="종료일" name="end_date" 
                        rules={[{required:true, message:'날짜를 입력하세요'}, ]}>
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item // 이름 입력
                        label="그룹" name="group" 
                        rules={[{required:true, message:'반드시 그룹을 선택해야 합니다'}, ]}>
                            <Select>
                                {TodoGroups.map( v => (<Option value={v.seq}>{v.name}</Option>))}
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
                </>
        );
    }
}

function TodoContent({location, match, history}){
    let del = useContext(Del);
    let geturl = useContext(GetURL);
    const [todospend, setTodospend] = useState([]);
    const [todosprogress, setTodosprogress] = useState([]);
    const [todosend, setTodosend] = useState([]);
    useEffect(()=>{
        Axios.get(geturl+"todo/todo/")
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
               renderItem = {todo=>{
                let onclick = () => {Axios.delete(geturl+'todo/todo/'+todo.seq+'/')}
                let del2 = <Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} onClick={onclick} />   
                return (
               <List.Item>
                   <List.Item.Meta
                   title={todo.name}
               description={<div> {todo.group_name}
                / {todo.end_date} {del2} </div>}
                   />
               </List.Item>
    
               )}}
               />
    

  </Col>
  <Col span={8}>
  <h2>진행중</h2>
  <List
               itemLayout="horizontal"
               dataSource={todosprogress}
               renderItem = {todo=>{
                let onclick = () => {Axios.delete(geturl+'todo/todo/'+todo.seq+'/')}
                let del2 = <Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} onClick={onclick} />  
                   
                return (
               <List.Item>
                   <List.Item.Meta
                   title={todo.name}
               description={<div> {todo.group_name}
                / {todo.end_date}  {del2} </div>}
                   />
               </List.Item>
    
               )}}
               />

  </Col>
  <Col span={8}>
  <h2>완료</h2>
  <List
               itemLayout="horizontal"
               dataSource={todosend}
               renderItem = {todo=>{
                let onclick = () => {Axios.delete(geturl+'todo/todo/'+todo.seq+'/')}
                let del2 = <Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} onClick={onclick} />  

                return (
               <List.Item>
                   <List.Item.Meta
                   title={todo.name}
               description={<div> {todo.group_name}
                / {todo.end_date}  {del2} </div>}
                   />
               </List.Item>
    
               )}}
               />

  </Col>
</Row>
        );

    }
}

export {Todo, TodoContent};