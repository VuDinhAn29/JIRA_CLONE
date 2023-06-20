import React, {useState} from 'react'

export default function Login(props) {

    const [userLogin,setUserLogin] = useState({userName:'',userLogin:''}) 
   
    console.log(userLogin);
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        })
    };
    const handleLogin = (e) =>{
         e.preventdefault();
         if(userLogin.userName === 'cyberlearn' && userLogin.userLogin === 'cyberlearn'){
            //Thành công chuyển trang trước đó
            // props.history.goBack();
            // chuyển đến trang chỉ định sau khi xử lý
            // Chuyển hướng đến path tương ứng
            props.history.push('/home');

            //replace thay đổi nội dung path tương ứng
          //   props.history.replace('/home');
         }else{
            alert('Login fail');
            return;
         }
    }


  return (
    <form className="container" onSubmit={handleLogin}>
        <h3 className="display-4">Login</h3>
        <div className="form-group">
             <p>User name</p>
             <input name="userName" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
             <p>Password</p>
             <input name="password" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
             <button className="btn btn-success">Đăng nhập</button>
        </div>
    </form>
  )
}
