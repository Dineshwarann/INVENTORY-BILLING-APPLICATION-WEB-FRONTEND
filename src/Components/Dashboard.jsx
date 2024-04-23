import Topbar from "./Topbar";

export default function Dashboard({children}){
    return(
        <div className="text-center">
        <div className="row">
          <div className="col">
             <Topbar/>
          </div>
        </div>
          <div className="col main-section" >
            {children}
          </div>
        </div>
    )
}