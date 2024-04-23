import easyinvoice from "easyinvoice";
import Dashboard from "../Components/Dashboard";
import { useContext, useEffect } from "react";
import { AppCtx } from "../Context/AppContext";


export default function BillingPage(){
   
    const {loading,setLoading,addSymbol,setAddSymbol,data,billUserName,billEmail,setBillUserName,setBillEmail,billValue,setBillValue,globalData,setGlobalData}=useContext(AppCtx);
    useEffect(()=>{
         const data=JSON.parse(localStorage.getItem("userData"));
            setBillUserName(data.data[0].name);
            setBillEmail(data.data[0].email);
    },[])

async function createpdf(){
    setLoading("on")
// Create your invoice! Easy!
var data = {
    apiKey: "free", 
    mode: "development",
    images: {
        // The logo on top of your invoice
        logo: "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?size=626&ext=jpg",
        // The invoice background
        background: "https://e0.pxfuel.com/wallpapers/541/770/desktop-wallpaper-white-plain-background-dirty-white.jpg"
    },
    // Your own data
    sender: {
        company: "Your Inventory Bill",
        country: "India",
    },
    // Your recipient
    client: {
        company:`${billUserName}`,
        address: `${billEmail}`
    },
    information: {
        // Invoice number
        number: Math.floor(Math.random() * 100) *9999999,
        // Invoice data
        date: new Date().toLocaleDateString(),
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: globalData
    
        
    
};

await easyinvoice.createInvoice(data, function (result) {
    // The response will contain a base64 encoded PDF file
    easyinvoice.download('myInvoice.pdf', result.pdf);
    // Now this result can be used to save, download or render your invoice
    // Please review the documentation below on how to do this
});
setLoading("off")
}
 
async function addToCart(name,billValue,price){
    setAddSymbol("on");
    const product={
        quantity:billValue,
        description:name,
        taxRate:18,
        price
    }
    await globalData.push(product);
    setTimeout(()=>{
       setAddSymbol("off");
    },2000)
   
}
    return(
        <div className="billing-section">
            <Dashboard>
               <form onSubmit={(event)=>event.preventDefault()}>

               
                <div className="overflow-x-auto">
                <table className="table mt-4">
                    {/* head */}
                    <thead>
                    <tr className="text-center text-xl">
                        <th></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity Available</th>
                        <th>Quantity</th>
                        <th>Add to Bill</th>
                    </tr>
                    </thead>
                    <tbody>
                        
                    {/* row 1 */}
                    {data && data?.map((value,index)=>(
                     <tr key={index} className="text-center text-lg  font-bold">
                     <th>{index+1}</th>
                     <td className="uppercase">{value.name}</td>
                     <td className="capitalize">{value.category}</td>
                     <td>{value.price}</td>
                     <td>{value.quantity}</td>
                     <td> <input type="number" className="grow input input-bordered w-12" min="0" max={`${value.quantity}`} defaultValue={0} onChange={(event)=>setBillValue(event.target.value)}/></td>
                     <td><button className="btn" onClick={()=>addToCart(value.name,billValue,value.price)}>Add</button></td>
                    </tr>
                    ))} 
                     
                    
                    
                    </tbody>
                </table>
                </div>
                <button className="btn skeleton bg-primary" onClick={()=>{createpdf()
                setGlobalData([]);
                }}>{loading==="off"?"Get Bill":<span className="loading loading-spinner loading-xs"></span>}</button>
                
                </form>
                {addSymbol==="on"?(  <div role="alert" className="alert bg-primary mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Product Added Successfully</span>
                </div>):""}
            </Dashboard>
        </div>
    )
}