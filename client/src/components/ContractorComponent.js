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
      'justifyContent': 'center'
   }
   const card = {
      
         'position': 'relative',
         'width': '400px',
         'height': '300px',
         'backgroundColor': '#fff',
         'boxShadow': '0 50px 50px rgba(0, 0, 0, 0.2)',
         'padding': '8px',
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
      'fontSize': '1.2em',
      'fontWeight': '400',
      'color': 'black',
      'marginLeft': '30px'
   }
   const details = {
      'fontSize': '0.7em',
      'fontWeight': '400',
      'color': '#999',
      'marginLeft': '30px'
   }
   const container_button = {
      'display': 'flex',
      'justifyContent': 'space-between'
   }
   const button = {
      'display':'inlineBlock',
      'padding':'0.3em 1.2em',
      'margin':'20px 0.3em 0.3em 0',
      'borderRadius':'2em',
      'boxSizing': 'border-box',
      'fontWeight':'300',
      'color':'#FFFFFF',
      'backgroundColor':'#4eb5f1',
      'textAlign':'center',
      'transition': 'all 0.2s', 
   }
   return (
      <div style={container}>
         <div style={card}>
	         <div style={cardContent}>
		         <div style={divImg}>
			         <img style={img} src="https://avatars.githubusercontent.com/u/58844494?v=4" alt="Avatar" />
		         </div>
               <div>
                  <div>
		               <h2><span style={name}>{data.firstName} {data.lastName}</span></h2>
                  </div>
		            <h2><span style={details}>{data.email}</span></h2>
		            <h2><span style={details}>{data.phoneNumber}</span></h2>
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