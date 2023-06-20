import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Home from './page/Home/Home'
import Contact from './page/Contact/Contact'
import About from './page/About/About'
import Header from './components/Home/Header/Header';
import Login from './page/Login/Login';
import Detail from './page/Detail/Detail';
import PageNotFound from './page/PageNotFound/PageNotFound';
import Todolist from './page/Todolist/Todolist';
import TodolistRFC from './page/Todolist/TodolistRFC';
import ToDoListReducer from './redux/reducers/ToDoListReducer';
import ToDoListRedux from './page/Todolist/ToDoListRedux';
import {  UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import BaiTapToDoListSaga from './page/BaiTapToDoListSaga/BaiTapToDoListSaga';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './page/DemoHOCModal/DemoHOCModal';
import Modal from './HOC/Modal/Modal';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import LoginCyberBugs from './page/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import CyberbugsTemplate from './templates/HomeTemplate/CyberbugsTemplate';

import CreateCyberBugs from './page/CyberBugs/CreateCyberBugs/CreateCyberBugs';
import indexCyberbug from './redux/constants/indexCyberbug';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProjectManagement from './page/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberbugs from './HOC/CyberbugsHOC/DrawerCyberbugs';
import DemoDragDrop from './page/DemoDragDrop/DemoDragDrop';
import SignUpCyberBugs from './page/CyberBugs/SignUpCyberBugs/SignUpCyberBugs';
import UserManagement from './page/CyberBugs/UserManagement/UserManagement';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch({type:'ADD_HISTORY',history:history})
  },[])
  return (
    <div>
       {/* <Header/>  */}
       {/* <Modal/> */}
       <DrawerCyberbugs/>
       <LoadingComponent/>
       <Switch>
            {/* <Route exact path='/home' component={Home} /> */}
            <HomeTemplate path="/home" exact Component={Home} />
            <HomeTemplate exact path='/contact' Component={Contact} />
            <HomeTemplate exact path='/about' Component={About} />
            <HomeTemplate exact path='/dragdrop' Component={DemoDragDrop} />
            <HomeTemplate exact path='/detail/:id' Component={Detail} />
            <HomeTemplate exact path='/todolistrcc' Component={Todolist} />
            <HomeTemplate exact path='/todolistrfc' Component={TodolistRFC} />
            <HomeTemplate exact path='/todolistredux' Component={ToDoListRedux} />
            <HomeTemplate exact path='/todolistsaga' Component={BaiTapToDoListSaga} />
            <HomeTemplate exact path='/demohocmodal' Component={DemoHOCModal} />


            <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
            <UserLoginTemplate exact path='/signupcyberbug' Component={SignUpCyberBugs} />
            <CyberbugsTemplate exact path='/cyberbugs' Component={indexCyberbug}  />
            <CyberbugsTemplate exact path='/createproject' Component={CreateCyberBugs} />
            <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
            <CyberbugsTemplate exact path='/usermanagement' Component={UserManagement}  />
            <CyberbugsTemplate exact path='/projectdetail/:projectId' Component={indexCyberbug} />
            


            <UserLoginTemplate exact path='/' Component={LoginCyberBugs} />
            <HomeTemplate  path='*' Component={PageNotFound} />
      

       </Switch>

     
    </div>
  );
}

export default App;
