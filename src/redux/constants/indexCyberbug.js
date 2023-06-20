import React from 'react'
import HeaderMain from '../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../components/Cyberbugs/Main/InfoMain'
import ContentMain from '../../components/Cyberbugs/Main/ContentMain'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function IndexCyberbug(props) {

    const {projectDetail} = useSelector(state=>state.projectReducer);
    
    const dispatch = useDispatch();

    // console.log('projectDetail',projectDetail);

    useEffect(()=>{
        //Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url -> gọi saga
        const {projectId} = props.match.params;

        // console.log('1',props.match.params);

        dispatch({
            type: 'GET_PROJECT_DETAIL',
            projectId
        })

    },[])

    return (
        <div className="main">
            <HeaderMain projectDetail={projectDetail} />

            <InfoMain projectDetail={projectDetail} />

            <ContentMain projectDetail={projectDetail} />
        </div>
    )
}
