import { useContext, useEffect } from "react"
import { AppCtx } from "../Context/AppContext"
import { forgotUser, resetPassword, signinUser, signupUser } from "../Helpers/helper";
import { useNavigate, useParams } from "react-router-dom";
import Signup from "../Components/Signup";
import Signin from "../Components/Signin";
import Forgot from "../Components/Forgot";
import Reset from "../Components/Reset";

export default function AuthenticationPage(){
     
    const {auth,setAuth,email,name,pass,setEmail,setName,setPass,result,setResult,loading,setLoading}=useContext(AppCtx);

    const params=useParams();
    useEffect(()=>{
          if(params.id){
            setAuth("Reset");
          }
    },[])


    
    

    
 

    
    return(
        <div className="authentication-section ">
<div className="card card-section w-96 bg-base-100  shadow-xl">
    
  <div className="card-body card-body-section">
            <h2 className="card-title  font-bold">INVENTORY APPLICATION</h2>
            <h2 className="card-title"> <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box ">
            <li><a onClick={()=>{
                setResult("");
                setAuth("Signin");
                setEmail("");
        setPass("");
        setName("");
                }}>Signin</a></li>
            <li><a onClick={()=>{
                setResult("");
                setEmail("");
        setPass("");
        setName("");
                setAuth("Signup")}} >Signup</a></li>
            </ul></h2>
           {auth==="Signup"?
              <Signup/>
           :auth==="Signin"?
           <Signin/>
           :auth==="Forgot"?
             <Forgot/>
             :  <Reset/>
           }
</div>
</div>   
</div>
    )
}