import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DrawerCyberbugs() {
    
    const {visible,ComponentCotentDrawer,callBackSubmit,title} = useSelector(state=>state.DrawerCyberbugsReducer);
    const dispatch = useDispatch();

    const showDrawer = () => {
      dispatch({type:'OPEN_DRAWER'})
    };
  
    const onClose = () => {
        dispatch({type:'CLOSE_DRAWER'})
    };
  
    return (
      <>
        {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New account
        </Button> */}
        <Drawer
          title={title}
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                <Button  type="primary" onClick={callBackSubmit} >
                    Submit
                </Button>
            </div>
          }
        >
            {/* Nội dung thay đổi của drawer  */}
            {ComponentCotentDrawer}
         
        </Drawer>
      </>
    );
}
