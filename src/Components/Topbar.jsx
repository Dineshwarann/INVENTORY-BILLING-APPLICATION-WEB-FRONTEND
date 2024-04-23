import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { AppCtx } from "../Context/AppContext";

export default function Topbar(){

    const navigate=useNavigate();

    const {setResult,userName,setUsername}=useContext(AppCtx);

    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem("userData"));
        setUsername(data.data[0].name);
    },[])
    return(
        <div className="topbar-section">
            
            <div className="navbar bg-primary">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </div>
                <ul tabIndex={0} className="font-bold menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52">
                    <li><a onClick={()=>navigate("/dashboard")}>Dashboard</a></li> 
                    <li><a onClick={()=>navigate("/addtoproduct")}>Add Product</a></li>
                    <li><a onClick={()=>navigate("/billing")}>Billing</a></li>
                    <li><a onClick={()=>{
                        setResult("");
                        navigate("/")}}>Logout</a></li>
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl font-bold">Welcome, {userName}</a>
            </div>
            </div>
        </div>
    )
}