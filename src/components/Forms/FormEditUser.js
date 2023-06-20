import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { connect } from 'react-redux';

function FormEditUser(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'SET_SUBMIT_EDIT_USER', callBackSubmit: handleSubmit })

    }, [])
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
                            <p className="font-weight-bold">User Id</p>
                            <input value={values.id} disabled  onChange={handleChange} className="form-control" name="id" />
                        </div>
                       
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Email</p>
                        <input value={values.email} onChange={handleChange} className="form-control" name="email" />
                    </div>
                    <div className='text-danger'>{errors.email}</div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Phone Number</p>
                        <input value={values.phoneNumber} onChange={handleChange} className="form-control" name="phoneNumber" />
                    </div>
                    <div className='text-danger'>{errors.phoneNumber}</div>

                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">User Name</p>
                        <input value={values.name} onChange={handleChange} className="form-control" name="name" />
                    </div>
                    <div className='text-danger'>{errors.name}</div>

                </div>

            </div>
        </form>
    )
}

const FormEditUserWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
         const {userEdit} = props;
         return {
             id: userEdit?.userId,
             email:userEdit.email,
             phoneNumber:userEdit.phoneNumber,
             name:userEdit.name,
             password:''
         }
    },

    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        password: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password  have max 32 characters'),
        phoneNumber: Yup.string().min(6, 'phoneNumber must have min 6 characters').max(12, 'phoneNumber  have max 12 characters'),
        name: Yup.string().min(6, 'userName must have min 6 characters').max(32, 'userName  have max 32 characters'),

    }),

    handleSubmit: ({ email, password, phoneNumber, name,id }, { props, setSubmitting }) => {

        props.dispatch({
            type: 'EDIT_USER_SAGA',
            userDetails: {
                id,
                email,
                password,
                phoneNumber,
                name,
            }
        });

        props.dispatch({ type: 'CLOSE_DRAWER' })
    },

    displayName: 'Edit User',
})(FormEditUser);

  const mapStateToProps = (state)=>({
      userEdit : state.UserLoginCyberBugsReducer.userEdit
  })

export default connect(mapStateToProps)(FormEditUserWithFormik)
