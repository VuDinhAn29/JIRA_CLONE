import React from 'react'
import Header from '../../components/Home/Header/Header';
import { Route } from 'react-router-dom';



export default function HomeTemplate(props) {
  const {Component,...restParam} = props;
  
  return <Route {...restParam} render={(propsRoute)=>{
    return <>
        <Header />
        <Component {...propsRoute} />
    </>
  }} />
}

