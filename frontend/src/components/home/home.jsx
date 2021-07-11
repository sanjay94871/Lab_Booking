import React,{useState,useEffect} from "react"
import "./home.css"
import Card from "./card/card"
import { Button } from "reactstrap";
import { connect } from 'react-redux';
import { setUser } from '../../actions/setUser';
import { logOut } from '../../actions/setUser';



function Home(props){
return(
<div className="container bg-light home">
<div className="row" id="hometitle"><h3 style={{width:"35rem"}}>Hello {props.currentUser.name}</h3><Button id="logoutButton" onClick={props.logOut}>logout</Button></div>
    <div className="row">
        <Card name="Waymo" src="waymo.png"   />
        <Card name="Magna" src="magna.png"  />
        <Card name="Aston" src="aston.png"  />
        <Card name="Schaeffler" src="schaeffler.png"  />
        <Card name="Ferrari" src="ferrari.png"  />
    </div>
</div>

)
}

const mapStateToProps = state => ({
    currentUser: state.user.user,
  
  });

export default connect(mapStateToProps,{setUser,logOut})( Home);