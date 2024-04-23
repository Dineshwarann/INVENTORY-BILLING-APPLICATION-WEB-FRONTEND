import { useContext, useEffect } from "react"
import { AppCtx } from "../Context/AppContext"
import { forgotUser, resetPassword, signinUser, signupUser } from "../Helpers/helper";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthenticationPage(){
     
    const {auth,setAuth,email,name,pass,setEmail,setName,setPass,result,setResult,loading,setLoading}=useContext(AppCtx);

    const params=useParams();
    useEffect(()=>{
          if(params.id){
            setAuth("Reset");
          }
    },[])


    const navigate=useNavigate();
    async function signup(){
        setLoading("on")
        const data={
            email,
            name,
            password:pass
        }
                    await signupUser(data).then((result)=>{
                        if(result.message==="Signup successfull"){
                            setResult(result.message);
                        }else{
                            setResult(result.message);
                        }
                    }).catch((error)=>{
                    console.log(error)});
            setLoading("off")
            setEmail("");
            setPass("");
            setName("");



    }

    async function signin(){
        setLoading("on")
        const data={
            email,
            password:pass
        }
        await signinUser(data).then((result)=>{
            if(result.message==="login success"){
                localStorage.setItem("userData",JSON.stringify(result));
                setResult(result.message);
                navigate("/dashboard");
                window.location.reload();
            }else{
                setResult(result.message);
            }
    }).catch((error)=>{
        console.log(error)});
        setLoading("off")
        setEmail("");
        setPass("");
        setName("");
    }

    async function forgot(){
        setLoading("on")
        const data={
            email
        }
       await forgotUser(data).then((result)=>{
                        if(result.message==="Reset Link sent to mail"){
                            setResult(result.message);
                        }else{
                            setResult(result.message);
                        }
                }).catch((error)=>{
                    console.log(error)});
                    setLoading("off")
                    setEmail("");
                    setPass("");
                    setName("");
    }

    async function reset(){
        setLoading("on")
        const id=params.id;
        const data={
            password:pass
        }
        await resetPassword(id,data).then((result)=>{
            if(result.message==="Password Reset Successfull"){
                setResult(result.message);
            }else{
                setResult(result.message);
            }
    }).catch((error)=>{
        console.log(error)});
        setLoading("off")
        setEmail("");
        setPass("");
        setName("");
    }
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
              (
              <div className=" text-center">
                <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="grow" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} value={email}/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" placeholder="Username" onChange={(event)=>setName(event.target.value)} value={name}/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" className="grow" placeholder="Password" onChange={(event)=>setPass(event.target.value)} value={pass}/>
              </label>
              <button className="btn " onClick={()=>{
                setResult("")
                signup()}}>{loading==="off"?"Signup":<span className="loading loading-spinner loading-xs"></span>}</button>
              {result?<h3>{result}</h3>:""}
              </div>)
           :auth==="Signin"?
           <div className=" text-center">
            <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" className="grow" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} value={email}/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" className="grow" placeholder="Password" onChange={(event)=>setPass(event.target.value)} value={pass}/>
            </label>
            <button className="btn" onClick={()=>{
                setResult("")
                signin()}}>{loading==="off"?"Signin":<span className="loading loading-spinner loading-xs"></span>}</button><br/>
            <button className="btn btn-ghost " onClick={()=>{setAuth("Forgot");
        setEmail("");
        setPass("");
        setName("");
        }}>Forgot Password?</button>
            {result?<h3>{result}</h3>:""} 
            </div>:auth==="Forgot"?
            <div className=" text-center">
             <label className="input input-bordered flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
             <input type="text" className="grow" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} value={email}/>
             </label>
             <button className="btn" onClick={()=>forgot()}>{loading==="off"?"Forgot":<span className="loading loading-spinner loading-xs"></span>}</button>
             {result?<h3>{result}</h3>:""} 
             </div>
             :  <div className=" text-center">
             <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" className="grow" placeholder="Password" onChange={(event)=>setPass(event.target.value)} value={pass} />
            </label>
            <button className="btn" onClick={()=>reset()}>{loading==="off"?"Reset":<span className="loading loading-spinner loading-xs"></span>}</button>
            {result?<h3 className="ml-1">{result}</h3>:""} 
             </div>
           }
</div>
</div>   
</div>
    )
}