import React,{ useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import * as Yup  from 'yup'
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/Cyberbugs/CyberbugsReducer';
import { withFormik } from 'formik';

 function CreateCyberBugs(props) {
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const {arrProjectCategory} = useSelector(state=>state.ProjectCategoryReducer);

    // console.log('1aa',arrProjectCategory);

    // console.log(arrProjectCategory);
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

    useEffect(()=>{
        dispatch({type:GET_ALL_PROJECT_CATEGORY_SAGA})
    },[]);

    const handleEditorChange = (content, editor) => {
        // console.log(props);
        setFieldValue('description',content)
    }
    return (
        <div className='container m-5'>
            <h3>CreateProject</h3>
            <form className='container'  onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    <Editor
                        name='description'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className='form-group'>
                    <select name='categoryId' className='form-control' onChange={handleChange}>
                        {arrProjectCategory.map((item,index)=>{
                            return <option value={item.id} key={index} >{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button type='submit' className='btn btn-outline-primary'>Create project</button>
            </form>
        </div>
    )
}

const createProjectForm = withFormik({
    //khi thuộc tính thay đổi thì binding các giá trị trong return kia
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log('propvalue',props);
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id,
            
        }
    },
    validationSchema: Yup.object().shape({
   

    }),
    handleSubmit: (values, { props, setSubmitting }) => {

    //  console.log('props',values);
      props.dispatch({
        type:'CREATE_PROJECT_SAGA',
        newProject: values, 
      })

    },
    displayName: 'CreateProjectFormik',
})(CreateCyberBugs);

const mapStateToProps = (state) =>({
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
})

export default connect(mapStateToProps) (createProjectForm);