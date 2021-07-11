import axios from "axios"
import React,{useState} from "react"
import { Table } from 'reactstrap'
import { connect } from "react-redux"

function DataTable(props){
  const[allbook,setallbook]=useState({data:[],valuestatus:false})

  async function allbooks(){var books=await axios.post("/book/allbook",{bench:props.bench})
                              .then(res=>res.data)
                              setallbook({data:books,valuestatus:true})
                            }

   if(!allbook.valuestatus){
     
      allbooks()
      }; 
      //console.log(props.user.name);
    async function deleteBook(id){
        var status=await axios.delete(`/book/delbook/${id}`)
                  .then(res=>res.data)
        if(status.delstatus)
            setallbook({valuestatus:false})          
    }  

      return (
      (allbook.valuestatus && allbook.data.length)?
        (<Table bordered>
        <thead>
          <tr>    
            <th>S.No</th>
            <th>User Name</th>
            <th>Mobilenumber</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody> 
           { (allbook.data.map((book,index)=>(<tr key={index} >
            <td>{index+1}<br/>{(book.name===props.user.name)?<button onClick={()=>deleteBook(book._id)}>delete</button>:null}</td>
            <td>{book.name}</td>
            <td>{book.mobilenumber}</td>
            <td>{new Date(book.From).toLocaleString()}</td>
            <td>{new Date(book.To).toLocaleString()}</td>
           
            </tr>)))}

        </tbody>
          </Table>):<p>No Bookings</p>
            );
  }
  const mapStateToProps = state => ({
    user: state.user.user,
  
  });


  export default connect(mapStateToProps,null)(DataTable);
  