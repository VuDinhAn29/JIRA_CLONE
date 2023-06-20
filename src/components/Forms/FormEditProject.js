import React from 'react'
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import * as Yup  from 'yup'

function FormEditProject(props) {
    const dispatch = useDispatch();
    const {arrProjectCategory} = useSelector(state=>state.ProjectCategoryReducer);

    // console.log('h1',arrProjectCategory);


    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        //xét hết value
        setValues,
        //xét 1 trường
        setFieldValue
        

    } = props;

    const submitForm = (e) => {
        e.preventDefault();
        alert('submit edit');
    }

    //componentdidmount
    useEffect(() => {

        //Gọi api load project category 
        dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' })

        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFunction: handleSubmit });




    }, [])


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }
    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4">  
                    <div className='form-group'>
                       <p className="font-weight-bold">Category name</p>
                       <select  name='categoryId' value={values.categoryId}>
                          {arrProjectCategory.map((item,index)=>{
                            return <option value={item.id}  key={index} >{item.projectCategoryName}</option>
                          })}
                       </select>               
                    </div>                
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor

                            name="description123"
                            initialValue={values.description}

                            init={{
                                selector: 'textarea#myTextArea',

                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </div>
        </form >
    )
}


const editProjectForm = withFormik({
    //khi thuộc tính thay đổi thì binding các giá trị trong return kia
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        console.log('propvalue',props);
        const {projectEdit} = props
        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId,
            
        }
    },
    validationSchema: Yup.object().shape({
   

    }),
    handleSubmit: (values, { props, setSubmitting }) => {

    //  console.log('props',values);
    const action = {
        type: 'UPDATE_PROJECT_SAGA',
        projectUpdate: values,
    }

    props.dispatch(action);
      

    },
    displayName: 'EditProjectFormik',
})(FormEditProject);

const mapStateToProps = (state) =>({
    projectEdit: state.projectReducer.projectEdit
})


export default connect(mapStateToProps) (editProjectForm);