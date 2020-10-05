import React from 'react';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col, Modal, Form, Input, Select, DatePicker, Table, Tag, Space, message, Upload } from 'antd';
import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import {FormInstance} from 'antd/lib/form';
import Axios from 'axios';
import jwt from "jwt-decode";
import { stringify } from 'query-string';
import {GetURL, Headerstyle, Del, Newbutton, InArray} from './Common';
import LoginContext from '../account/Util';
import { Route, Link, NavLink, Switch} from 'react-router-dom';
const {TextArea} = Input;
const {Option} = Select;
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;



function Todo({location, match, history}){
    
    const geturl = useContext(GetURL);
    const inArray = useContext(InArray); // inArray 함수 정의
    const addbuttonlayout = useContext(Newbutton)('+ 추가');
    const [TodoGroups, setTodoGroups] = useState([]); // TodoGroup
    const [Todos, setTodos] = useState({});
    const [ID, setID] = useState(1)
    const [fileList, setFileList] = React.useState({fileList:[], uploading:false})
    const login = useContext(LoginContext)

    useEffect(()=>{
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
     
    useEffect(()=>{ // Todogroup 로딩
        Axios.get(geturl+"todo/allTodo", {headers:{'Authorization':'JWT '+window.localStorage.getItem("token")}} )
        .then(res => {
            console.log(res);
            const { data } = res;
            console.log(data);
            setTodos(data.all);
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

        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('status', value.status);
        formData.append('end_date', value.end_date._d.toISOString().slice(0,10));
        formData.append('group', value.group);
        formData.append('image', fileList.fileList[0]);

        console.log(value);
        Axios.post(geturl+"todo/todo/", formData)
        .then(res=>{ console.log(res);
            setSendSuccess(true);
            setShowConfirmModal(true);
            setShowModal(false);})
        .catch(error=>{console.log(error);
        setSendSuccess(false);})
        .then(res =>{
            window.location.reload();
        }
        )         
    }
    const failmessage = () =>{ //전송 성공시 메시지 여부
        console.log("전송 실패")
    }
    const checkshowmodal = () => {setShowConfirmModal(false);}
    const checkcancelmodal = () => {setShowConfirmModal(false);}
    const addbutton = {...addbuttonlayout, props:{...addbuttonlayout.props, onClick:addfavourite}};
    
    const props = {
        onRemove: file => {
        setFileList(state => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: file => {
          setFileList(state => ({
            fileList: [...state.fileList, file],
          }));
          return false;
        },
        fileList: fileList.fileList,
      };

    if (match.params.id) {
        var x =[]
        for (var i=0; i<Todos.length;i++){
            x = [...x, (Todos[i].seq)];
        }
        let ind = x.indexOf(parseInt(match.params.id))
        console.log('seq', x)
        return (<>
        <h1>{Todos[ind]!=undefined?Todos[ind].name:'접근 불가'}</h1>

        </>
        );
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
                        label="이미지" name="image" 
                        >
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
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
    const [Todos, setTodos] = useState([]);
    const [todospend, setTodospend] = useState([]);
    const [todosprogress, setTodosprogress] = useState([]);
    const [todosend, setTodosend] = useState([]);
    useEffect(()=>{
        Axios.get(geturl+"todo/allTodo", {headers:{'Authorization':'JWT '+window.localStorage.getItem("token")}} )
        .then(res => {
            console.log(res);
            const { data } = res;
            console.log(data)
            setTodos(data.all);
            console.log(data.all)
            setTodospend(data.pending);
            setTodosprogress(data.inprogress);
            setTodosend(data.end);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    const status_tr = (v) =>{
        switch(v){
            case 'Inprogress':
                return '진행중';
            case 'Pending':
                return '대기중';
            case 'End':
                return '완료';
            default:
                return '오류';
        }
    }
   
    if (match.params.id){
        console.log(Todos);
        
        let seqlist = Todos.map((v) => (v.seq) )
        let i = seqlist.indexOf(parseInt(match.params.id))

        const column = [
            {title:'항목', dataIndex:'property', key:'property' },
            {title:'내용', dataIndex:'contents', key:'contents'}
        ]

    
        const datasource = [
            {key:'1', property: '이름', contents:(Todos[i]==undefined?'':Todos[i].name)},
            {key:'2', property: '상태', contents:(Todos[i]==undefined?'':status_tr(Todos[i].status))},
            {key:'3', property: '종료일', contents:(Todos[i]==undefined?'':Todos[i].end_date)},
            {key:'4', property: '분류', contents:(Todos[i]==undefined?'':Todos[i].group_name)},
        ] 
        
        return ( <>
            <Table columns={column} dataSource={datasource}>
            </Table>
            </>);
    
    }
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
                let turl = '/todo/'+todo.seq  
                return (
               <List.Item>
                   <List.Item.Meta
                   title={<Link to={turl}>{todo.name}</Link>}
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
                let turl = '/todo/'+todo.seq    
                return (
               <List.Item>
                   <List.Item.Meta
                   title={<Link to={turl}>{todo.name}</Link>}
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
                let turl = '/todo/'+todo.seq  
                return (
               <List.Item>
                   <List.Item.Meta
                   title={<Link to={turl}>{todo.name}</Link>}
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