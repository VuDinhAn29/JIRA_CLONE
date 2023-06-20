import React from 'react'
import { useDispatch } from 'react-redux'
import Login from '../Login/Login';
import Regis from '../Regis/Regis';
import SlideDown from '../../HOC/Modal/SlideDown';

export default function DemoHOCModal() {
    const LoginWithSlideDown = new SlideDown(Login);
    // const LoginWithSlideDown =() => new SlideDown(Login);

    const dispatch = useDispatch();
  return (
    <div>
    <button onClick={()=>{
        dispatch({
            type:'OPEN_FORM',
            Component: <Login />
        })
    }} type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
      Đăng nhập
    </button>

    <button onClick={()=>{
         dispatch({
            type:'OPEN_FORM',
            Component: <Regis />
        })
    }} type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
    Đăng ký
    </button>
      {/* return thì phải dùng {}  */}
     {LoginWithSlideDown}
     {/* nếu trả về thẻ thì bên trên phải là function  */}
    </div>
    
    
  )
}
