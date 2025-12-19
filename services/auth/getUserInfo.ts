"use server"

import {IVerifiedUser } from "@/types/user.interface"
import { getCookie } from "./tokenHandler"
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"
import { ENV } from "@/config"

export const getUserInfo = async (): Promise<IVerifiedUser | null> => {
   try {
      const accessToken = await getCookie("accessToken")

    if (!accessToken) {
       return null
    }

   const varifiedToken = jwt.verify(accessToken, ENV.JWT_SECRET as string) as JwtPayload;

   if(!varifiedToken){
        return null
   }

   const userInfo: IVerifiedUser ={
         name: varifiedToken.name || "unknown name",
         email: varifiedToken.email,
         role: varifiedToken.role
   }


    return userInfo;
   }catch (error: any){
     console.log(error)
     return null
   }

}