import {useNavigate} from "react-router-dom";
import './style.css'
const Logout = ()=> {
    const navigate = useNavigate();
    const handleLogout = ()=> {
        localStorage.setItem("authorization", "");
        navigate("/");
    }
    return (
        <>
        <button className='add-product' onClick={handleLogout}>Logout</button>
        </>
    )
}
export default Logout;