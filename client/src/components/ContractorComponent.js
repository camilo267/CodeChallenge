import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";


export const ContractorComponent = ({url}) => {


   const { id } = useParams()
   const history = useHistory();
   const [data, setData] = useState([]);

   useEffect(() => {
      (async () => {
      const response = await axios.get(`http://localhost:8080/contractors/${id}`);
         setData(response.data);
      })();
   },[id]);

   const handleDeleteContractor = async() => {
      await axios.delete(`${url}/contractors/delete/${id}`).then(res => {  
         console.log(res)  
         history.push('/contractors')
         })  
         .catch(err => {  
            console.log(err)  
      });  
        
   }
   const container ={
      'display': 'flex',
      'justifyContent': 'center',
   }
   
   const card = {
      'display': 'flex',
      'justifyContent': 'center',
      'width': '300px',
      'height': '300px',
      'boxShadow': '0 50px 50px rgba(0, 0, 0, 0.2)',
      'overflow': 'hidden',
      'transition': 'height 0.5s ease-in-out', 
   }
 
   const cardContent ={
      'display': 'flex',
      'alignItems': 'center',
      'flexDirection': 'column'
   }
   const divImg = {
      'position': 'relative',
      'width': '80px',
      'height': '80px',
      'borderRadius': '50%',
      'overflow': 'hidden',
      'marginBottom': '5px',
      'marginTop': '5px'
   }

   const img = {
      'position': 'relative',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'objectFit': 'cover',
   }
   const name ={
      'fontSize': '1.4em',
      'color': '#f1356d',
      'marginBottom': '8px',
      'padding': '10px 16px',
   }
   const details = {
      'fontSize': '1em',
      'fontWeight': '400',
      'color': '#999',
   }
   const container_button = {
      'display': 'flex',
      'justifyContent': 'space-between'
   }
   const button = {
      'background': '#f1356d',
      'color': '#fff',
      'border': '0',
      'padding': '8px',
      'borderRadius': '8px',
      'cursor': 'pointer',
      'marginTop': '3em',
      'margin': '10px'
   }
   return (
<div style={container}>
      <div style={card}>
	      <div style={cardContent}>
		      <div style={divImg}>
			      <img style={img} src={`${data.image}`} alt="Avatar" />
		      </div>
            <div>
		         <h2 style={name}>{data.firstName} {data.lastName}</h2>
            </div>
            <div>
               <h2 style={details}>{data.email}</h2>
               <h2 style={details}>{data.phoneNumber}</h2>
            </div>
            <div style={container_button}>
               <Link to={`/contractors/edit/${id}`}><button style={button}>Edit</button></Link>
               <button style={button} onClick={ handleDeleteContractor }>Delete</button>
            </div>
         </div>
      </div>
   </div>
   )
}