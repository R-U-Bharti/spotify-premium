import { ModeToggle } from "@/components/mode-toggle"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {

    let token = localStorage.getItem('token')

    return (
        <div>
            <ModeToggle />
            {token ? <Outlet /> : <Navigate to="/" />}
        </div>
    )
}

export default ProtectedRoutes