import { useContext } from "react";
import { AppCtx } from "../Context/AppContext";
import { forgotUser } from "../Helpers/helper";
import { useFormik } from "formik";
import { forgotSchema } from "../Helpers/Schema";

export default function Forgot(){

    const {auth,setAuth,email,name,pass,setEmail,setName,setPass,result,setResult,loading,setLoading}=useContext(AppCtx);

    const {values,handleChange,handleSubmit,handleBlur,errors,touched}=useFormik({
        initialValues:{
            email:""
        },
        validationSchema:forgotSchema,
        onSubmit:async(object)=>{
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
    });

    return(
        <form className=" text-center" onSubmit={handleSubmit}>
             <label className="input input-bordered flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-10 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
             <input value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} type="text" className="grow" placeholder="Email" />
             </label>
             {touched.email && errors.email?(<div className="font-bold text-xs mb-4">{errors.email}</div>):("")}
             <button className="btn" type="submit">{loading==="off"?"Forgot":<span className="loading loading-spinner loading-xs"></span>}</button>
             {result?<h3>{result}</h3>:""} 
             </form>
    )
}