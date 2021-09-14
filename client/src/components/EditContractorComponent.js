import { useState, useEffect } from "react"
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

export const EditContractorComponent = ({url}) => {

   const { id } = useParams();
   const history = useHistory();
   const [formState, setFormState] = useState({
      firstName: '',
      lastName: '',
      image: '',
      email: '',
      phoneNumber: '',
      _id: ''
   });

   const { firstName, lastName, image, email, phoneNumber } = formState; //Destructuring object properties

   const handleInputChange = ({ target }) => {
      setFormState({
         ...formState, //In case any field doesn't change 
         [target.name] : target.value
         // By using property name in the input is 
         //possible to handle all the fields with a single hadleInputChange
      });
   }

   useEffect(() => {
      getContractorById(id);
   }, []);

   const getContractorById = async() =>{
      const response = await axios.get(`${url}/contractors/${id}`);
      setFormState(response.data);
   }

   const handleEdit = (e) =>{
      e.preventDefault();
      editContractor(formState); //Call Axios post request
      console.log('form para editar', formState);
   }

   const editContractor = async (form) => {  
      await axios.put(`${url}/contractors/edit/${id}`, form).then(res => {  
         console.log(res)  
         history.push('/contractors')
        })  
        .catch(err => {  
          console.log(err)  
      });  
   }  
     
   return(
      <>
         <h1>
            Edit Contractor
         </h1>
         <form onSubmit={ handleEdit }>
            <label>First Name:</label>
            <input
               type='text'
               name="firstName"
               value={ firstName }
               onChange={ handleInputChange }
               required

            />
            <label>Last Name:</label>
            <input
               type='text'
               name="lastName"
               value={ lastName }
               onChange={ handleInputChange }
               required
            />
            <label>Image</label>
            <input
               type='text'
               name="image"
               value={ image }
               onChange={ handleInputChange }
               required
            />
            <label>Email</label>
            <input
               type='text'
               name="email"
               value={ email }
               onChange={ handleInputChange }
               required
            />
            <label>Phone Number</label>
            <input
               type='number'
               name="phoneNumber"
               value={ phoneNumber }
               onChange={ handleInputChange }
               required
            />
            <button type="submit" >Edit Contractor</button>
         </form>
      </>
   )
}