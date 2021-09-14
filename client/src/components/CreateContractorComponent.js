import { useState } from "react"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import '../App.css' 

export const CreateContractorComponent = ({url}) => {

   const history = useHistory();
   const [formState, setFormState] = useState({
      firstName: '',
      lastName: '',
      image: '',
      email: '',
      phoneNumber: ''
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

   const handleSubmit = (e) =>{
      e.preventDefault();
      // console.log('form', formState);
      postContractor(formState); //Call Axios post request
      //console.log(formState);
   }


   const postContractor = async (form) => {  
      await axios.post(`${url}/contractors/add`, form).then(res => {  
         console.log(res);
         history.push('/contractors');
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
   }
   const label = {
      'position': 'relative',
      'padding': '0px 0',
      // 'margin': '0px',
      'fontSize': '16px',
      'color': '#fff',
      'transition': '.5s',
   }
   const labelBox ={
      'position': 'relative'
   }
   const title = {
      'margin': '0 0 30px',
      'padding': '0',
      'color': '#fff',
      'textAlign': 'center',
   }
   const input = {
      'width': '100%',
      'padding': '10px 0',
      'fontSize': '16px',
      'color': '#fff',
      'marginBottom': '30px',
      'border': 'none',
      'borderBottom': '1px solid #fff',
      'outline': 'none',
      'background': 'transparent',
   }

   const containerImage ={
      'position': 'relative'
   }
   // const labelImage = {
   //    'display': 'inline-block',
   //    'padding': '8px 12px', 
   //    'cursor': 'pointer',
   //    'borderRadius': '4px',
   //    'backgroundColor': '#9c27b0',
   //    'fontSize': '16px',
   //    'color': '#fff',
   // }
   // const inputFile = {
   //    'position': 'absolute',
   //    'zIndex': '-1',
   //    'top': '6px',
   //    'left': '0',
   //    'fontSize': '15px',
   //    'color': 'rgb(153,153,153)',
   // }
  
   const button = {
      'display':'inlineBlock',
      'padding':'0.3em 1.2em',
      'margin':'0 0.3em 0.3em 0',
      'borderRadius':'2em',
      'boxSizing': 'border-box',
      'fontWeight':'300',
      'color':'#FFFFFF',
      'backgroundColor':'#4eb5f1',
      'textAlign':'center',
      'transition': 'all 0.2s',
   }

   
   return(
      <div style={container}>
         <h2 style={title}>
            Create Contractor
         </h2>
         <form onSubmit={ handleSubmit }>
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
            <div>
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

            <div>
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
            <div>
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
            <div style={containerImage}>
               <label className='labelImage'>Image</label>
               <input
                  type='file'
                  name="image"
                  value={ image }
                  onChange={ handleInputChange }
                  required
                  className="input"
                  // style={inputFile}
               />
                 <span className="file-custom"></span>
            </div>
            <button type="submit" style={button} >Add Contractor</button>
         </form>
      </div>
   )
}