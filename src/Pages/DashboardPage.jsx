import { useContext, useEffect } from "react";
import Dashboard from "../Components/Dashboard";
import { AppCtx } from "../Context/AppContext";
import { deleteProduct } from "../Helpers/helper";

export default function DashboardPage(){

    const {data,loading,setLoading}=useContext(AppCtx);
    const quantity=data.reduce((accumulator,value,index,array)=>{
        return accumulator+=value.quantity;
    },0)
    const storeValue=data.reduce((accumulator,value,index,array)=>{
        return accumulator+=(value.price*value.quantity);
    },0)
    async function deleteProductFromDb(id){
        setLoading("on")
        const data={
            id
        }
        await deleteProduct(data).then((result)=>{
            if(result.message==="Delete Product Successfull"){
               console.log("delete product sucessfull")
            }else{
                console.log("Error deleting data")
            }
    }).catch((error)=>{console.log("Error fetching deleting data")});
    await setLoading("off");
    window.location.reload();
    }
    return(
        <div className="dashboard-page">
            <Dashboard>
            <a className="btn btn-ghost text-xl font-bold mt-4 mb-2">Inventory Stats</a><br/>
                <div className="stats shadow skeleton bg-primary">
                <div className="stat place-items-center">
                    <div className="stat-title font-bold">Total Products</div>
                    <div className="stat-value">{data.length}</div>
                
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title font-bold">Total Quantity</div>
                    <div className="stat-value">{quantity}</div>
                    
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title font-bold">Total Store Value</div>
                    <div className="stat-value">{storeValue}</div>
                   
                </div>
                </div><br/>
                <a className="btn btn-ghost text-xl font-bold mt-4 mb-2">Inventory Items</a><br/>

                <div className="overflow-x-auto font-bold">
                    <table className="table ">
                        {/* head */}
                        <thead className="text-xl">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Value</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody className="text-lg">
                        {/* row 1 */}
                        {data && data?.map((value,index)=>(
                            
                            <tr key={index}>
                            <th>{index+1}</th>
                            <td className="uppercase">{value.name}</td>
                            <td className="capitalize">{value.category}</td>
                            <td>{value.price}Rs/-</td>
                            <td>{value.quantity}</td>
                            <td>{value.price*value.quantity}</td>
                            <td className="delete-button capitalize" onClick={()=>{deleteProductFromDb(value._id)    
                            }}>{loading==="off"?"Delete":<span className="loading loading-spinner loading-xs"></span>}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
            </Dashboard>
        </div>
    )
}