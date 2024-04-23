import { useContext, useEffect } from "react";
import Dashboard from "../Components/Dashboard";
import { AppCtx } from "../Context/AppContext";
import { addProduct } from "../Helpers/helper";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addSchema } from "../Helpers/Schema";

export default function AddProductPage(){

    const {loading,setLoading,result,setResult,setProductName,setProductQuantity,setProductPrice}=useContext(AppCtx);
    const navigate=useNavigate();


    const {values,handleChange,handleSubmit,handleBlur,errors,touched}=useFormik({
        initialValues:{
            productName:"",
            productQuantity:"",
            productPrice:"",
            productCategory:""
        },
        validationSchema:addSchema,
        onSubmit:async(object)=>{
            console.log(object)
            setLoading("on")
            const data={
                name:object.productName,
                category:object.productCategory,
                price:object.productPrice,
                quantity:object.productQuantity
            }
           await addProduct(data).then((result)=>{
                if(result.message==="Add Product Successfull"){
                    setResult(result.message);
                    setTimeout(()=>{
                        navigate("/dashboard");
                        window.location.reload();
                    },2000)
                }else{
                    setResult(result.message);
                }
        }).catch((error)=>{
            console.log(error)});
            setLoading("off") 
        }
    });
    
    useEffect(()=>{
      setResult("");
      setProductName("");
      setProductPrice("");
      setProductQuantity("")  
    },[])
    return(
        <div className="addProductPage-section">
           <Dashboard>
            <form className="addtoproduct-formsection" onSubmit={handleSubmit}>
           <input value={values.productName} name="productName" onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Product Name" className="input input-bordered w-full max-w-xs mt-28" /><br/>
           {touched.productName && errors.productName?(<div className="font-bold text-xs mb-4">{errors.productName}</div>):("")}
           <input value={values.productCategory} name="productCategory" onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Product Category" className="input input-bordered w-full max-w-xs" /><br/>
           {touched.productCategory && errors.productCategory?(<div className="font-bold text-xs mb-4">{errors.productCategory}</div>):("")}
           <input value={values.productPrice} name="productPrice" onChange={handleChange} onBlur={handleBlur} type="number" placeholder="Product Price" className="input input-bordered w-full max-w-xs" /><br/>
           {touched.productPrice && errors.productPrice?(<div className="font-bold text-xs mb-4">{errors.productPrice}</div>):("")}
           <input value={values.productQuantity} name="productQuantity" onChange={handleChange} onBlur={handleBlur} type="number" placeholder="Product Quantity" className="input input-bordered w-full max-w-xs" /><br/>
           {touched.productQuantity && errors.productQuantity?(<div className="font-bold text-xs mb-4">{errors.productQuantity}</div>):("")}
           <button className="btn skeleton mb-2 bg-primary" type="submit">{loading==="off"?"Add Product":<span className="loading loading-spinner loading-xs"></span>}</button>
           {result?<h3>{result}</h3>:""} 
           </form>
           </Dashboard>
        </div>
    )
}