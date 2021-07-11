import React,{useState} from "react"
import "./signup.css"
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Spinner } from 'reactstrap';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import $ from "jquery"

function Signup(){
   
    const [uwarn,setUWarn]= useState(0)
    const [pwarn,setPWarn]= useState(0)
    const [reg,setReg]= useState(0)
    
   
    function testpasswords(){
       setPWarn(($("#floatingInput4").val()!==$("#floatingInput5").val())?1:0)
    }

    async function onSubmit(e){
        e.preventDefault()
        if(pwarn===0){
            var User={name:$('#floatingInput1').val(),mobilenumber:$('#floatingInput2').val(),username:$('#floatingInput3').val(),password:$('#floatingInput4').val()}
            var status=await axios.post("/user/signup",User)
                .then(res=>res.data.message)
        }
        
        setUWarn(!status?1:0);
        if(status)
        {setReg(1)
        setTimeout(()=>window.location="/",3000)}
    }




    return (
        <div className="container-fluid form-signup text-center">
        <form onSubmit={onSubmit}>
            <img className="mb-4" src="bosch.png" alt="" width="100" height="100" />   
        
            <div className="form-floating ">
                <input type="text" className="form-control" id="floatingInput1" name="nm" placeholder="Name" required maxLength="20"/>
                <label htmlFor="floatingInput1">Full name</label>
            </div>
           
            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput2" name="mn" placeholder="monile number" required minLength="10" maxLength="10" />
                <label htmlFor="floatingInput2">Mobile number</label>
            </div>

            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput3" name ="un" placeholder="email" required />
                <label htmlFor="floatingInput3">User name</label>
                {uwarn?<p className="warning"><ErrorIcon fontSize="small"/>username Already exist</p>:null}
            </div>
            
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingInput4" name="pwd" placeholder="Name" onChange={testpasswords} required />
                <label htmlFor="floatingInput4">password</label>
            </div>

        
            <div className="form-floating">
                <input type="password" style={{marginBottom:'5px'}} className="form-control" id="floatingInput5" name="cpwd" onChange={testpasswords} placeholder="Password" required />
                <label htmlFor="floatingInput5">Confirm password</label>
                      
            {(pwarn===1)?<p className="warning"><ErrorIcon fontSize="small"/> password mismatch</p>:null}
            {(reg)?<p className="alert alert-success"><CheckCircleIcon fontSize="small" /> Successfully Registered!!!</p>:null} 
            </div>
      
       
           
            <div>
                 <button className=" btn btn-lg" type="submit"> {(reg)?<Spinner children=""/>:"submit"}</button>
            </div>
         
          </form>  
                 Already have an account?<Link to="/">signin</Link>
              
        </div>
    )
}

export default Signup;