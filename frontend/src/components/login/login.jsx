import React,{useState} from "react"
import "./login.css"
import axios from 'axios'
import $ from 'jquery'
import ErrorIcon from '@material-ui/icons/Error';
import { Link } from 'react-router-dom';
 import { connect } from 'react-redux';
 import { setUser } from '../../actions/setUser';
 import Home from "../home/home"


function Login(props){
  const [warn,setWarn]= useState(2)

 
  async function onSubmit(e){
   
    e.preventDefault()
    var User={username:$('#floatingInput').val(),password:$('#floatingPassword').val()}
    
    var message=await axios.post("/user/signin",User)
                           .then(res=>res.data.message)
    if(message===1)
          props.setUser(User);
    setWarn(message) 
 
    
    
   }
  
    return (<div>
    {(!props.isAuthenticated)?
    <div className="container">
      <div className="form-signin text-center">
        <form onSubmit={onSubmit}>
          <img className="mb-4" src="bosch.png" alt="" width="100" height="100" />
        
          <div className="form-floating username">
            <input type="email" className="form-control" id="floatingInput" name="email"  placeholder="username" />
            <label htmlFor="floatingInput">Username</label>
            {(warn===-1)?<p className="warning"><ErrorIcon fontSize="small" /> username doesn't exist </p>:null}
          </div>
        
          <div className="form-floating password">
            <input type="password" className="form-control" id="floatingPassword" name="pewd" placeholder="password" />
            <label htmlFor="floatingPassword">password</label>
            {(warn===0)?<p className="warning"><ErrorIcon fontSize="small"/> password incorrect</p>:null}
          </div>
        
          <button className="btn btn-lg" type="submit">Sign in</button>
        </form>  
          <Link to="/signup" className="link">Create Account</Link> 
      </div>
    </div>
    :<Home />}</div>)
}

const mapStateToProps = state => ({
  currentUser: state.user.user,
  isAuthenticated:state.user.isAuthenticated

});


export default connect(mapStateToProps,{setUser})(Login);

