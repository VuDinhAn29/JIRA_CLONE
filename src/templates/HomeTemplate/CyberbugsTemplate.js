import React from 'react'
import { Route } from 'react-router-dom';
import SidebarCyberbugs from '../../components/Cyberbugs/SidebarCyberbugs';
import MenuCyberBugs from '../../components/Cyberbugs/MenuCyberBugs';
import ModalCyberBugs from '../../components/Cyberbugs/ModalCyberBugs.js/ModalCyberBugs';

export default function CyberbugsTemplate(props) {
    const {Component,...restParam} = props;
  return <Route {...restParam} render={(propsRoute)=>{
    return <>
       <div className='jira'>
            <SidebarCyberbugs/>
            <MenuCyberBugs/>
              <Component {...propsRoute} />
            <ModalCyberBugs/>
       </div>
    </>
  }} />
     
  
}
