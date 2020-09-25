import React from 'react';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Layout, Menu, Button, List, Avatar , Row, Col, Modal, Form, Input, Select, DatePicker} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {FormInstance} from 'antd/lib/form';
import './REACT.css';
import Axios from 'axios';
import { Route, Link, NavLink, Switch} from 'react-router-dom';
import { stringify } from 'query-string';
const {TextArea} = Input;
const {Option} = Select;
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

// 공용 문자
const GetURL = createContext('http://localhost:8000/');
const Headerstyle = createContext({ backgroundColor:'#f9f9f9',width:'100%', height:'70px', padding:'10px', textAlign:'left'});
const Del = createContext(<Button style={{float:'right'}} shape="circle" icon={<DeleteOutlined/>} />);
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



function HomePage({location, match, history}){
    return <h1>HOME</h1>;
}
function Favouritegroup({location, match, history}){
    return <h1>즐겨찾기 그룹</h1>;
}
function Todogroup({location, match, history}){
    return <h1>할 일 그룹</h1>;
}
function Favourite({location, match, history}){
    const geturl = useContext(GetURL);
    const inArray = useContext(InArray); // inArray 함수 정의
    const addbuttonlayout = useContext(Newbutton)('+ 추가');
    const [FavouriteGroups, setFavouriteGroups] = useState([]); // favouritegroup 
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
    const confirmmessage = () =>{ //전송 성공시 메시지 여부
        setSendSuccess(true); //전송 성공
        setShowConfirmModal(true);
        setShowModal(false);
    }
    let favouritegroupname = FavouriteGroups.map( val =>(val.name));
    const checkshowmodal = () => {setShowConfirmModal(false);}
    const addbutton = {...addbuttonlayout, props:{...addbuttonlayout.props, onClick:addfavourite}};

    if (match.params.id) {
        return "Favourite "+match.params.id;
    }
    else{
        return (<> <h1>즐겨찾기 목록{addbutton}</h1>
        {<Modal title="등록"
        visible={showModal}
        onOk = {confirmmodal}
        onCancel={cancelmodal}
        okText='등록'
        cancelText='취소'
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
                        {favouritegroupname.map( v => (<Option value={v}>{v}</Option>))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>}
        {<Modal title="전송 확인"
        visible={showConfirmModal}
        onOK={checkshowmodal}
        okText='확인'>
            {sendSuccess?'전송 성공':'전송 실패'}
        </Modal>}
        </>)
        ;
    }
}
function Todo({location, match, history}){
    const geturl = useContext(GetURL);
    const inArray = useContext(InArray); // inArray 함수 정의
    const addbuttonlayout = useContext(Newbutton)('+ 추가');
    const [TodoGroups, setTodoGroups] = useState([]); // favouritegroup 
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
    const confirmmessage = () =>{ //전송 성공시 메시지 여부
        setSendSuccess(true); //전송 성공
        setShowConfirmModal(true);
        setShowModal(false);
    }
    let todogroupname = TodoGroups.map( val =>(val.name));
    const checkshowmodal = () => {setShowConfirmModal(false);}
    const addbutton = {...addbuttonlayout, props:{...addbuttonlayout.props, onClick:addfavourite}};

    if (match.params.id) {
        return "Todo "+match.params.id;
    }
    else{
        return (<> 
        <h1>할 일 목록{addbutton}</h1> 
                {<Modal title="등록"
                visible={showModal}
                onOk = {confirmmodal}
                onCancel={cancelmodal}
                okText='등록'
                cancelText='취소'
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
                                {todogroupname.map( v => (<Option value={v}>{v}</Option>))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>}
                {<Modal title="전송 확인"
                visible={showConfirmModal}
                onOK={checkshowmodal}
                okText='확인'>
                    {sendSuccess?'전송 성공':'전송 실패'}
                </Modal>}
                </>
        );
    }
}

function NoPage({location, match, history}){
    return "NOPAGE";
}

function HomeContent({location, match, history}){
    return '';
}
function FavouritegroupContent({location, match, history}){
     
    const onclick = () => {history.push('/home');}
    let del = {...useContext(Del), props:{...useContext(Del).props, onClick:onclick}}
    let geturl = useContext(GetURL);
    console.dir(del)
    
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
                renderItem = {(item)=>(
                <List.Item>
                    <List.Item.Meta
                    title={item.name}
                    description={<div><span onClick={onclick}>클릭</span> {del}</div>}
                    />
                </List.Item>
                )}
                />
    );
    
}
function TodogroupContent({location, match, history}){
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



export {HomePage, Favouritegroup, Todogroup, Favourite, Todo, NoPage,
    HomeContent, FavouritegroupContent, FavouriteContent, TodogroupContent, TodoContent } ;