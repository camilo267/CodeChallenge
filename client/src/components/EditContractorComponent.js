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
      console.log(response.data);
   }

   const handleEdit = (e) =>{
      e.preventDefault();
      editContractor(formState);
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
   const container = {
      'position': 'absolute',
      'top': '50%',
      'left': '50%',
      'width': '400px',
      'padding': '40px',
      'transform': 'translate(-50%, -50%)',
      'background': 'rgba(0,0,0,.5)',
      'boxSizing': 'border-box',
      'boxShadow': '0 15px 25px rgba(0,0,0,.6)',
      'borderRadius': '10px',
      'backgroundColor': 'white'
   }
   const label = {
      'position': 'relative',
      'padding': '0px 0',
      'fontSize': '16px',
      'color': '#f1356d',
      'transition': '.5s',
   }
   const labelBox ={
      'position': 'relative'
   }
   const title = {
      'fontSize': '20px',
      'color': '#f1356d',
      'marginBottom': '8px',
      'padding': '10px 16px',
   }
   const input = {
      'width': '100%',
      'padding': '10px 0',
      'fontSize': '16px',
      'color': 'black',
      'marginBottom': '30px',
      'border': 'none',
      'borderBottom': '1px solid #f1356d',
      'outline': 'none',
      'background': 'transparent',
   }
   const inputFile = {
      'width': '100%',
      'background': 'transparent',
      'marginTop': '10px',
      'marginBottom': '20px',
      'padding': '3px'
   }

   const button = {
      'background': '#f1356d',
      'color': '#fff',
      'border': '0',
      'padding': '8px',
      'borderRadius': '8px',
      'cursor': 'pointer',
      'marginTop': '5px'
   }
     
   return(
      <div style={container}>
         <h2 style={title}>
            Edit Contractor
         </h2>
         <form onSubmit={ handleEdit }>
            <div style={labelBox}>
               <label style={label}>First Name:</label>
               <input
                  type='text'
                  name="firstName"
                  value={ firstName }
                  onChange={ handleInputChange }
                  required
                  style={input}
               />
            </div>
            <div style={labelBox}>
               <label style={label}>Last Name:</label>
               <input
                  type='text'
                  name="lastName"
                  value={ lastName }
                  onChange={ handleInputChange }
                  required
                  style={input}
               />
            </div>
            <div style={labelBox}>   
               <label style={label}>Email</label>
               <input
                  type='text'
                  name="email"
                  value={ email }
                  onChange={ handleInputChange }
                  required
                  style={input}
               />
            </div>
            <div style={labelBox}>
               <label style={label}>Phone Number</label>
               <input
                  type='number'
                  name="phoneNumber"
                  value={ phoneNumber }
                  onChange={ handleInputChange }
                  required
                  style={input}
               />
            </div>
            <div style={labelBox}>
               <label style={label}>Image</label>
               <input
                  type='text'
                  name="image"
                  // value={ image }
                  onChange={ handleInputChange }
                  required
                  style={input}
               />
            </div>
            <button type="submit" style={button} >Edit Contractor</button>
         </form>
      </div>
   )
}