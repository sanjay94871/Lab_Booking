import axios from "axios"
import React,{useState} from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label
} from 'reactstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Table from "./Table"
import {connect } from "react-redux"


function Card(props){
    
    const details={
        bench:props.name,
        date:new Date()
     }

    const [cbook,setCbook]=useState('initial')
    const [modal,setModal]=useState(false)
    const [date,changeMaxdate]=useState({today:'',max:''})
    
     //-------------open modal with restricted date------------//
  
    const handleToggle = () => {
        
        setModal(!modal);
        changeMaxdate(()=>{
                  var today = new Date();
                  var dd = today.getDate();
                  var mm = today.getMonth()+1; //January is 0!
                  var yyyy = today.getFullYear();
                  today.setDate(dd+2)
                  var maxdd=today.getDate()
                  var maxmm=today.toLocaleDateString()[0]
                  if(dd<10)
                    dd='0'+dd
                  if(maxdd<10) 
                    maxdd='0'+maxdd
                  if(mm<10)
                    mm='0'+mm
                  if(maxmm<10)
                    maxmm='0'+maxmm
                  today = yyyy+'-'+mm+'-'+dd;
                  var max=yyyy+'-'+maxmm+'-'+maxdd;
                    
                  return {today:today,max:max}
        })
        
      }
    //-----------------------------------------------------------//    
     
     const handleOnSubmit = async (e) => {
              e.preventDefault()
              checkfromtime()
              const date=document.getElementById("datefield").value
              const from=document.getElementById("fromtime").value
              const to=document.getElementById("totime").value
              const fromtime=new Date(date.split("-"))
              const totime=new Date(date.split("-"))
              fromtime.setHours(from)
              totime.setHours(to)
         
        if(fromtime<new Date()) 
                alert("select a time that's after "+new Date().toLocaleString())
        else{        
        var bookstatus=await axios.post("/book/newBook",{...props.currentUser,bench:props.name,From:fromtime,To:totime})
                         .then(res=>res.data);
        
        if(bookstatus.status)
        {
          document.getElementById("booked").setAttribute("style",'{{display:"block"}}')
          setTimeout(handleToggle,2000)
        }
        else
         
          alert(bookstatus.message)
        
        };
      }
    
  
    //--------get current user of the bench----------------------//
    async function getcurrentbook()

    {   
      var message=await axios.post("/book/check",details)
                         .then(res=>res.data)
                         setCbook(message)
                        
                       }

      if(cbook==='initial') {
         getcurrentbook()
        
        }
     else{ 
         setTimeout(getcurrentbook,900000)
       
     }
    
    //-----------------------------------------------------------//
    
   
    //-----------------check From and To time--------------------//
    function checkfromtime(){
        var fromtime=Number(document.getElementById("fromtime").value)+1
        const totimeinput= document.getElementById("totime")
        totimeinput.setAttribute("min", fromtime)
           
      }
    //-----------------------------------------------------------//
   
   
   
    return(
    <div className="col-sm-3 ">
        <div className="text-center ">
            <img className="img-fluid mx-auto" src={props.src} alt='' width="120" height="80" /> 
        </div>
        <div className="currentUser container">{(cbook.status)?(<p className="img-fluid mx-auto">currently used by: {cbook.username}<br />mobilenumber:{cbook.mobilenumber}<br />Ends at: {new Date(cbook.To).toLocaleString("en-IN")}</p>):<p>free</p>}</div>
        <div>
             <button className="btn home-btn"  onClick={handleToggle} >Book now</button>
          
        </div>

        <div><Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>{props.name} Bookings</ModalHeader>
        <ModalBody>
        <Table bench={props.name} />
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
            <div>
              
              <Label for="item" style={{position:"absolute"}}>Date:</Label>
              <input type="date" className="bookform" id="datefield" min={date.today}  max={date.max}  required/><br />
             
              
              <Label for="item" style={{position:"absolute"}}>From:</Label>
              <input type="number" className="bookform time" id="fromtime" onChange={checkfromtime} min='0' max="22" required></input> : <input className="time" type="number" value="00" disabled={true} /><br />
              
             
              <Label for="item" style={{position:"absolute"}}>To:</Label>
              <input type="number" className="bookform time" id="totime"  min ='1' max="23" required></input> : <input className="time" type="number" value="00" disabled={true} /> 

              <p style={{display:"none"}} id="booked" className="alert alert-success"><CheckCircleIcon fontSize="small" />Successfully Booked</p>
             </div>

             
              <Button color="dark" style={{ marginTop: '3rem' }} block> Book</Button>
            
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal></div>
    </div>
)
}
const mapStateToProps = state => ({
  currentUser: state.user.user,

});

export default connect(mapStateToProps,null)(Card);

