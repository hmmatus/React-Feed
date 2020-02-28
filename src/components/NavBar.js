import React,{Component} from 'react'
import {Link} from 'react-router-dom'

const NavBar=props=>{
        return (
            <nav className="navbar">
                <li><a href="#">Inicio</a></li>
                <li><button className="btn btn-primary" onClick={props.logout}>Cerrar sesion</button></li>
            </nav>
        )
    }

export default NavBar;