

const initialState = {
   visible: false,
   title: '',
   ComponentCotentDrawer: <p>default</p>,
   callBackSubmit: (propsValue) => { alert('click demo!') }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
   switch (action.type) {
      case 'OPEN_DRAWER':
         return { ...state, visible: true }
      case 'CLOSE_DRAWER':
         return { ...state, visible: false }
      case 'OPEN_FORM_EDIT_PROJECT': {
         state.visible = true;
         state.title = action.title;
         state.ComponentCotentDrawer = action.Component;
         return { ...state }

      }
      case 'SET_SUBMIT_EDIT_PROJECT': {
         state.callBackSubmit = action.submitFunction;
         return { ...state }
      }

      case 'SET_SUBMIT_CREATE_TASK': {
         return { ...state, callBackSubmit: action.callBackSubmit }
      }

      case 'SET_SUBMIT_EDIT_USER': {
         return { ...state, callBackSubmit: action.callBackSubmit }
      }

      case 'OPEN_FORM_CREATE_TASK': {
         state.visible = true;
         state.ComponentCotentDrawer = action.Component;
         state.title = action.title;
         return { ...state };
      }

      case 'OPEN_FORM_EDIT_USER': {
         state.visible = true;
         state.ComponentCotentDrawer = action.Component;
         state.title = action.title;
         return { ...state };
      }

     

      default:
         return state
   }
}
