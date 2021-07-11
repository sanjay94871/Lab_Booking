import { SET_USER ,LOAD_USER,LOGOUT_SUCCESS,AUTH_ERROR} from '../actions/types';

const initialState = {
  user:sessionStorage.getItem('user'),
  isAuthenticated:false,
};

export default function usereducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      sessionStorage.setItem("user",action.payload.username)
      return {
        ...state,
        user: action.payload,
        isAuthenticated:true
      };
    case LOAD_USER:
        return {
          ...state,
          user:action.payload,
          isAuthenticated:true
        };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      sessionStorage.removeItem('user');
        return {
              ...state,
              user:null,
              isAuthenticated: false,  
            };
    default:
      return state;
  }
}
