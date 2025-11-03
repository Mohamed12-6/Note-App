import { Navigate } from "react-router-dom"

export default function ProtctedRouting({children}) {
    if (localStorage.getItem("Token")!==null) {
        return children 
    }
    else{
        return <Navigate to={"/allnotes"}></Navigate>
    }

}

