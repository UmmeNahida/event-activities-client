/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import {IVerifiedUser } from "@/types/user.interface"
import { getCookie } from "./tokenHandler"
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"
import { ENV } from "@/config"
import { serverFetch } from "@/lib/server-fetch"

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

export const viewUserProfileData = async (
  userId: string
) => {
  try {
    const res = await serverFetch.get(`/users/${userId}`);

    const result = await res.json();
    return result.data
  } catch (err: any) {
    return {
      success: false,
      message: `${
        ENV.NODE_ENV === "development"
          ? err.message
          : "something went wrong"
      }`,
    };
  }
};