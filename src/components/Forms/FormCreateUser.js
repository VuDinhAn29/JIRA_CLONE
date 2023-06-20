import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

function FormCreateUser(props) {
   const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:'SET_SUBMIT_CREATE_TASK',callBackSubmit: handleSubmit})

},[])
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <form className='container' onSubmit={handleSubmit}>
      <div className='row'>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Email</p>
            <input onChange={handleChange} className="form-control" name="email" />
          </div>
          <div className='text-danger'>{errors.email}</div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">PassWord</p>
            <input type="password" onChange={handleChange} className="form-control" name="passWord" />
          </div>
          <div  className='text-danger'>{errors.passWord}</div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Phone Number</p>
            <input onChange={handleChange} className="form-control" name="phoneNumber" />
          </div>
          <div className='text-danger'>{errors.phoneNumber}</div>

        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">User Name</p>
            <input onChange={handleChange} className="form-control" name="name" />
          </div>
          <div className='text-danger'>{errors.name}</div>

        </div>

      </div>
    </form>
  )
}


const FormCreateUserWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    passWord: '',
    phoneNumber: '',
    name: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required!').email('email is invalid!'),
    passWord: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password  have max 32 characters'),
    phoneNumber: Yup.string().min(6, 'phoneNumber must have min 6 characters').max(12, 'phoneNumber  have max 12 characters'),
    name: Yup.string().min(6, 'userName must have min 6 characters').max(32, 'userName  have max 32 characters'),

  }),

  handleSubmit: ({ email, password, phoneNumber, name }, { props, setSubmitting }) => {

        props.dispatch({
          type: 'SIGN_UP_USER_SAGA',
          userDetails: {
            email,
            password,
            phoneNumber,
            name,
          }
        });

        props.dispatch({type:'CLOSE_DRAWER'})  
  },

  displayName: 'Create User',
})(FormCreateUser);

export default connect() (FormCreateUserWithFormik)