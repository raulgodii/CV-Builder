import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { logoutRequest } from './../api/auth';

function Navbar() {
    const { isAuthenticated, logoutContext, user } = useAuth();
    return (
        <nav>
            {
                isAuthenticated ? (
                    <>
                        <h1>Welcome "{user.username}"</h1>
                        <Link to="/">Home</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/" onClick={() => { logoutContext() }}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )
            }


        </nav>
    )
}

export default Navbar