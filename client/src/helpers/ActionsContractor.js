import axios from 'axios';

export const postContractor = async (url, form) => {  
   // console.log(form);
   const response = await axios.post(`${url}/contractors/add`, form)  
   return response
}  


export const editContractor = async (url, form) => {  
   const response = await axios.put(`${url}/contractors/add`, form) 
   return response
}  

export const getContractorById = async(url, id) =>{
   const response = await axios.get(`${url}/contractors/${id}`);
   return response
}