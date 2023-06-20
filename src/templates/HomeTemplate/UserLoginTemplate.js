
import { Button, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom';



export const UserLoginTemplate = (props) => {
    const [{width,height},setSize] = useState({width:Math.round(window.innerWidth),height:Math.round(window.innerHeight)});

    useEffect(()=>{
      window.onresize = () => {
          setSize({
              width: Math.round(window.innerWidth),
              height:Math.round(window.innerHeight)
          })
      }
  },[])

     let {Component,...restRoute} = props;
  return <Route {...restRoute} render={(propsRoute)=>{
    return <>
      <Layout>
         <Sider width={window.innerWidth/2} style={{height:window.innerHeight,backgroundImage:`url(https://picsum.photos/${Math.round(width/2)}/${height})`,backgroundSize:'100%'}} > 
             
         </Sider>
         <Content>
            <Component {...propsRoute}/>
         </Content>
      </Layout>
    </>
  }} />
}
