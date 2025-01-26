import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutPage = () => {
    const navigate = useNavigate();


    useEffect(() => {
        // Remove token from localStorage when the logout page is loaded
        localStorage.removeItem("token");
        navigate("/login"); 

    }, []);

};
export default LogoutPage;