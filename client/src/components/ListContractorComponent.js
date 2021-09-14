import React, { useEffect, useState } from 'react'
import { Link, useHistory  } from 'react-router-dom';
import axios from 'axios';
// import { CreateContractorComponent } from './CreateContractorComponent'
// import { postContractor , getContractorById } from '../helpers/ActionsContractor'

export const ListContractorComponent = ({url}) => {

   const [contractors, setContractors] = useState([])

   const history = useHistory();

   useEffect(() => {
      (async () => {
         const response = await axios.get(`${url}/contractors`);
         setContractors(response.data);
      })();
   });

   const handleAddContractor = () => {
      history.push('/contractors/add')
   }

   return (
      <>
      <button onClick={ handleAddContractor }>Add Contractor</button>
      <h1>Contractors</h1>
      <hr />
      <div>
         {contractors.map((contractor) => (
            <div key={contractor._id}>
               <Link to={`/contractors/${contractor._id}`}>
                  <h2>{contractor.firstName}</h2>
               </Link>
                  {/* <button onClick={ () => handleDeleteContractor(contractor._id)}>Delete</button> */}
                  {/* <button onClick={ () => handleEditContractor(contractor._id)}>Edit</button> */}
            </div>
         ))}
      </div>
      </>
   );
}



