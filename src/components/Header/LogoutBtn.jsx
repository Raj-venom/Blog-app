import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth"
import { logout } from "../../features/auth/authSlice"
import { clearPost } from "../../features/post/postSlice";

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {

        // logout returns poromise so we can use .then here 
        authService.logout().then(() => {
            dispatch(logout())
            dispatch(clearPost())
        })
    }

    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn