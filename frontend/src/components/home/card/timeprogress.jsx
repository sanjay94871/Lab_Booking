import React,{ useState } from "react";

function TimeProgress(props){
    setInterval(calTime,1000)  
    const [remainTime,setrt]=useState({hours:0,minutes:0})
    
    function calTime(){
         var remainMinutes=Math.ceil(((new Date(props.cbook.To))-new Date())/60000)
         if(remainMinutes>60){
             const remainHours=remainMinutes/60
             remainMinutes=remainMinutes%60
             setrt({hours:remainHours,minutes:remainMinutes})
          }
          else{
              setrt({hours:0,minutes:remainMinutes})
          
    } 
}
    
    
     return(<span>{(remainTime.hours)?(remainTime.hours+'Hours and '+remainTime.minutes+' mins'):(remainTime.minutes)+' mins'}</span>)

}

export default TimeProgress



// Math.ceil(((new Date(props.cbook.To))-new Date())/60000)