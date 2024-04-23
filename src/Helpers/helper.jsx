import { API } from "./api";

//function to register user
export async function signupUser(data){
   try {
      const res=await fetch(`${API}/signup`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json"
        }
      })
      const result=await res.json();
      return result;
   } catch (error) {
      return error;
   }
}

//function to login user
export async function signinUser(data){
   try {
      const res=await fetch(`${API}/signin`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json"
        }
      })
      const result=await res.json();
      return result;
   } catch (error) {
      return error;
   }
}

export async function forgotUser(data){
    try {
       const res=await fetch(`${API}/forgot`,{
         method:"POST",
         body:JSON.stringify(data),
         headers:{
             "Content-type":"application/json"
         }
       })
       const result=await res.json();
       return result;
    } catch (error) {
       return error;
    }
 }

 //function to reset password
 export async function resetPassword(id,data){
    try {
       const res=await fetch(`${API}/reset/${id}`,{
         method:"POST",
         body:JSON.stringify(data),
         headers:{
             "Content-type":"application/json"
         }
       })
       const result=await res.json();
       return result;
    } catch (error) {
       return error;
    }
 }

 export async function addProduct(data){
    try {
       const res=await fetch(`${API}/addproduct`,{
         method:"POST",
         body:JSON.stringify(data),
         headers:{
             "Content-type":"application/json"
         }
       })
       const result=await res.json();
       return result;
    } catch (error) {
       return error;
    }
 }



 export async function getProduct(){
   try {
      const res=await fetch(`${API}/getproduct`,{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }
      })
      const result=await res.json();
      return result;
   } catch (error) {
      return error;
   }
 } 

 
 export async function deleteProduct(data){
   try {
      const res=await fetch(`${API}/deleteproduct`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json"
        }
      })
      const result=await res.json();
      return result;
   } catch (error) {
      return error;
   }
}
