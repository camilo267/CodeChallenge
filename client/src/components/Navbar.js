import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

   const nav = { 
      'background': '#0082e6',
      'height': '60px',
      'width': '100%',
      'marginBottom': '20px'
   }
   const ul ={ 
      'float': 'right',
      'marginRight': '20px', 
   }
   const li = { 
      'display': 'inline-block',
      'lineHeight': '60px',
      'margin': '0 5px',
   }
   const a ={
      'color': 'white',
      'fontSize': '17px',
      'padding': '7px 13px',
      'borderRadius': '3px'
   }

   return(
      <>
         <nav style={nav}>
            <ul style={ul}>
               <li style={li}><Link to="/contractors" style={a}>Home</Link></li>
            </ul>
         </nav>
      </>
   )
}
