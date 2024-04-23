import { useContext, useEffect } from "react";
import { AppCtx } from "../Context/AppContext";
import { resetPassword } from "../Helpers/helper";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { resetSchema } from "../Helpers/Schema";

export default function Reset(){

    const {auth,setAuth,email,name,pass,setEmail,setName,setPass,result,setResult,loading,setLoading}=useContext(AppCtx);
    const params=useParams();
    
    useEffect(()=>{
        setResult("")
    },[])
    const {values,handleChange,handleSubmit,handleBlur,errors,touched}=useFormik({
        initialValues:{
            password:""
        },
        validationSchema:resetSchema,
        onSubmit:async(object)=>{
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
    });

    return(
        <form className=" text-center" onSubmit={handleSubmit}>
             <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input value={values.password} name="password" onChange={handleChange} onBlur={handleBlur} type="password" className="grow" placeholder="Password" />
            </label>
            {touched.password && errors.password?(<div className="font-bold text-xs mb-4">{errors.password}</div>):("")}
            <button className="btn" type="submit" >{loading==="off"?"Reset":<span className="loading loading-spinner loading-xs"></span>}</button>
            {result?<h3 className="ml-1">{result}</h3>:""} 
             </form>
    )
}