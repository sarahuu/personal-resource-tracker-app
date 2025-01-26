import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutPage = () => {
    const navigate = useNavigate();


    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/login"); 

    }, []);

};
export default LogoutPage;