
import { redirect } from "next/navigation";
import { deleteCookie } from "./tokenHandler"

export const logOutUser = async ()=>{
    // Logic to log out the user
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    redirect('/login');
}