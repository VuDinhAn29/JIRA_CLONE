import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Space, Button, Avatar, Popover, AutoComplete } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../../components/Forms/FormEditProject';
import { message, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';


export default function ProjectManagement() {
  const { projectList } = useSelector(state => state.ProjectCyberBugReducer);
  const { userSearch } = useSelector(state => state.UserLoginCyberBugsReducer);
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const [value, setValue] = useState('');

  const searchRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'GET_LIST_PROJECT_SAGA',
    })
  }, [])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter:(item2,item1) =>{
         return item2.id - item1.id;

      },
      sortDirections: ['descend'],


    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render:(text,record,index)=>{
          return <NavLink to={`projectdetail/${record.id}`} >{text}</NavLink>
      },
      sorter:(item2,item1) =>{
         let projectName1 = item1.projectName?.trim().toLowerCase();
         let projectName2 = item2.projectName?.trim().toLowerCase();
         if(projectName2<projectName1) {
            return -1;
         }
         return 1;
      }

    },
    // {
    //   title: 'description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render: (text, record, index) => {
    //     let contentJSX = ReactHtmlParser(text);

    //     return <div>
    //       {contentJSX}
    //     </div>
    //   }
    // },
    {
      title: 'category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter:(item2,item1) =>{
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if(categoryName2<categoryName1) {
           return -1;
        }
        return 1;
     }
    },
    {
      title: 'creator',
      key: 'creator',
      render: (text, record, index) => {
        // console.log('record',record);
        return <Tag color="#87d068">{record.creator?.name}</Tag>
      }
    },
    {
      title: 'members',
      key: 'members',
      render: (text, record, index) => {
        // console.log(record);
        return <div>
          {record.members?.slice(0, 3).map((member, index) => {
            return (
              <Popover key={index} placement='top' title='members' content={() => {
                return <table className='table'>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>avatar</th>
                      <th>name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.members?.map((item, index) => {
                      return <tr key={index}>
                        <td>{item.userId}</td>
                        <td><img src={item.avatar} width='30' height='30' style={{ borderRadius: '15px' }} /></td>
                        <td>{item.name}</td>
                        <td>
                          <button className='btn btn-danger' onClick={() => {
                            dispatch({
                              type: 'REMOVE_USER_PROJECT_API',
                              userProject: {
                                userId:item.userId,
                                projectId: record.id
                              }
                            })
                          }}>Delete</button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              }} >
                <Avatar key={index} src={member.avatar} />
              </Popover>
            )
          })}
          {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

          <Popover placement="rightTop" title={'Add user'} content={() => {
            return <AutoComplete
              options={userSearch?.map((user, index) => {
                return { label: user.name, value: user.userId.toString() }
              })}
              value={value}

              onChange
              ={(text) => {
                setValue(text);
              }}

              onSelect={(valueSelect, option) => {
                //set giá trị của hộp thọa = option.label

                setValue(option.label);
                //Gọi api gửi về backend
                dispatch({
                  type: 'ADD_USER_PROJECT_API',
                  userProject: {
                    "projectId": record.id,
                    "userId": valueSelect
                  }
                })
              }}

              style={{ width: '100%' }} onSearch={(value) => {
                // console.log('value',value);
                if (searchRef.current) {
                  clearTimeout(searchRef.current);
                }
                searchRef.current = setTimeout(() => {
                  dispatch({
                    type: 'GET_USER_API',
                    keyWord: value
                  })

                }, 300)
              }} />
          }} trigger="click">
            <Button style={{ borderRadius: '50%' }}>+</Button>
          </Popover>
        </div>
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => {
        return <div>
          <button className="btn mr-2 btn-primary" onClick={() => {
            const action = {
              type: 'OPEN_FORM_EDIT_PROJECT',
              title: 'EDIT PROJECT',
              Component: <FormEditProject />
            }
            //dispatch lên reduce nội dung drawer
            dispatch(action)

            //dispatch dữ liệu dòng hiện tại lên reducer
            const actionEditProject = {
              type: 'EDIT_PROJECT',
              projectEditModal: record
            }
            dispatch(actionEditProject)

          }}>
            <FormOutlined style={{ fontSize: 17 }} />
          </button>

          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({ type: 'DELETE_PROJECT_SAGA', IdProject: record.id })
            }}

            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger" >
              <DeleteOutlined style={{ fontSize: 17 }} />
            </button>
          </Popconfirm>

        </div>
      },
    }

  ];
  return (
    <div className="container-fluid mt-5">
      <h3>Project management</h3>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
    </div>
  )
}
