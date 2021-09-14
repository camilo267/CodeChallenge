import React, { useEffect, useState } from 'react'
import { Link, useHistory  } from 'react-router-dom';
import axios from 'axios';
import '../App.css'
export const ListContractorComponent = ({url}) => {

   const [contractors, setContractors] = useState([])

   const history = useHistory();

   useEffect(() => {
      (async () => {
         const response = await axios.get(`${url}/contractors`);
         setContractors(response.data.reverse());
      })();
   });

   const handleAddContractor = () => {
      history.push('/contractors/add')
   }
   const mainContainer = {
      'display': 'flex',
      'justifyContent': 'center'
   }
   const card = {
      'borderBottom': '1px solid #fafafa',
      'padding': '10px 16px',
      'margin': '20px 0',
      'width': '500px'
   }
   const containerTitle ={
      'display': 'flex',
      'justifyContent': 'center',
      'fontSize': '1.5rem'
   }
   const title = {
      'fontSize': '20px',
      'color': '#f1356d',
      'marginBottom': '8px',
      'padding': '10px 16px',
   }
   const containerButton ={
      'display': 'flex',
      'justifyContent': 'flex-end',
      'marginRight': '20px'
   }
   const button = {
      'background': '#f1356d',
      'color': '#fff',
      'border': '0',
      'padding': '8px',
      'borderRadius': '8px',
      'cursor': 'pointer',
   }
   const name = {
      'fontSize': '20px',
      'color': '#f1356d',
   }
   const email = {

   }
   return (
      <>
      <div style={containerButton}>
         <button onClick={ handleAddContractor } style={button} id="add-contractor-button">Add Contractor</button>
      </div>
      <div style={containerTitle}>
         <h2 style={title} className="main-title">Contractors</h2>
      </div>
      <div style={mainContainer}>
         <div>
            {contractors.map((contractor) => (
               <div key={contractor._id} style={card} className="card">
                  <Link to={`/contractors/${contractor._id}`}>
                     <h2 style={name}>{contractor.firstName} {contractor.lastName} </h2>
                     <p style={email} id='email'>{contractor.email}</p>
                  </Link>
               </div>
            ))}
         </div>
      </div>

      </>
   );
}



