import axios from 'axios';
import { SET_USER,LOAD_USER ,LOGOUT_SUCCESS,AUTH_ERROR } from './types';

export const setUser = (username) =>(dispatch,getState)=>{
                              
  axios.post("/user/details",username)
        .then(user=>dispatch({
        type: SET_USER,
        payload:user.data
      }))
  }

  export const loadUser = () =>(dispatch,getState)=>{
    const username=getState().user.user
    axios.post("/user/details",{username})
              .then(user=>dispatch({
              type: LOAD_USER,
              payload:user.data
          }))

           .catch(err=>dispatch({type:AUTH_ERROR}))
      }
    

  export const logOut = () =>dispatch=>{
        dispatch({type: LOGOUT_SUCCESS})
          }      