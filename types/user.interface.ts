

import { UserRole } from "@/lib/auth-utils";
// import { IPatient } from "./patient.interface";

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED' | 'REQUESTED' | 'SUSPENDED'; 


export interface IUserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    userStatus: UserStatus;
    bio?: string;
    image?: string;
    interests?: string[]
    hobbies?: string[]
    location?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IVerifiedUser {
  id?: string;
  name:string;
  email:string;
  role: UserRole;
  iat?:number;
  exp?:number
}



