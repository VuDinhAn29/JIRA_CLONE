import { Button, Input, Popconfirm, Popover, Table,message } from 'antd'
import React, { useEffect, useState } from 'react'
import { FormOutlined, DeleteOutlined, CloseSquareOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { history } from '../../../util/history';
import { useDispatch } from 'react-redux';
import './UserManagement.css'
import FormCreateUser from '../../../components/Forms/FormCreateUser';
import FormEditUser from '../../../components/Forms/FormEditUser';



export default function UserManagement() {
    
    const [keyWord, setKeyword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'GET_LIST_USER_SAGA' })
    }, [])


    const { listUser, userLogin } = useSelector(state => state.UserLoginCyberBugsReducer);
    // console.log('123',listUser);

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
        show: 'none'
    });

    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const columns = [
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (item2, item1) => {
                if (item2 < item1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (item2, item1) => {
                let email1 = item1.email?.trim().toLowerCase();
                let email2 = item2.email?.trim().toLowerCase()

                if (email1 < email2) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            sorter: (item2, item1) => {
                if (item2 < item1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                    <button className="btn mr-2 btn-primary" onClick={() => {
                        dispatch({
                            type: 'OPEN_FORM_EDIT_USER',
                            title: 'Edit Project',
                            Component: <FormEditUser />
                        })
                        // console.log('record',record);

                        dispatch({
                            type: 'EDIT_USER',
                            userEdit: record
                        })


                    }}>   <FormOutlined style={{ fontSize: 17 }} /></button>
                    
                    <Popconfirm
                        title="Are you sure to delete this User?"
                        onConfirm={()=>{
                            dispatch({
                            type:'DELETE_USER_SAGA',
                            IdUser: record.userId 
                        })}}
                       
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>

                    </Popconfirm>

                    

                </div>

            }
        }

    ]

    return (
        <div className='container-fluid m-3' style={{ width: '80%' }}>
            <div className='d-flex justify-content-between'>
                <h3>User Management</h3>
                <div className='d-flex justify-content-center align-items-center' style={{ fontSize: '20px', position: 'relative' }}>
                    <p className='mb-0 mr-3'>Chào !, {userLogin.name}</p>
                    <img src={userLogin.avatar} style={{ width: '50px', height: '50px', borderRadius: '50%', marginLeft: '20px', marginRight: '10px' }} alt='userlogin' />
                    <Popover placement="bottom" title={""} content={
                        <Button type="primary" style={{ fontSize: 18, transition: "all 0.5s" }} onClick={() => {
                            localStorage.removeItem('USER_LOGIN')
                            localStorage.removeItem('access_token')
                            history.push("/login")
                        }}
                        >Đăng xuất
                        </Button>} trigger="click">
                        <CaretDownOutlined style={{ fontSize: '50px' }} />
                    </Popover>

                </div>

            </div>

            <div className="mb-3 font-weight-bold" style={{ fontSize: 20, width: '150px' }} onClick={() => {
                dispatch({
                    type: 'OPEN_FORM_CREATE_TASK',
                    title: 'Create User',
                    Component: <FormCreateUser />
                })
            }}>
                <p style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>Create User + </p>
            </div>
            <div className='mb-4'>
                <Input placeholder="Search ..." style={{ width: '80%', fontSize: 20, }} onChange={(e)=>{
                    setKeyword(e.target.value);
                }} />
                <Button type="primary" size={'large'} style={{ width: '10%' }} className="ml-3" onClick={()=>{
                    dispatch({
                        type:'SEARCH_USER_SAGA',
                        keyWord:keyWord
                    })
                }} >Search</Button>
            </div>
            <Table columns={columns} rowKey={"id"} dataSource={listUser} pagination={{ defaultPageSize: 8, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }} />
        </div>
    )
}


