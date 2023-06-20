import React from 'react'
import './LoadingComponent.modul.css'
import { useSelector } from 'react-redux'

export default function LoadingComponent() {
    const {isLoading} = useSelector(state=>state.LoadingReducer)

    if(isLoading){
        return (
          <div className="bgLoading">
              <img src={require('../../../assets/imgLoading/loading.gif')} />
          </div>
        )

    }
    else{
        return ''
    }
}
