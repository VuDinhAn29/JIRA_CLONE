import React from "react";

const initialState = {
    Component: <p>Nội dung mặc định</p>
}

export const ModalReducer =  (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_FORM' : {
        state.Component = action.Component;
        return {...state};
    }

  

  default: return {...state}
  }
}
