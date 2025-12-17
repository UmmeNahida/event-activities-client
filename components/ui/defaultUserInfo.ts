import { IUserInfo } from "@/types/user.interface";

export const defaultUserInfo: IUserInfo = {
  id: '',
  name: '',
  email: '',
  bio: '',
  image: '',
  interests: [],
  hobbies: [],
  location: '',
  role: 'USER',
  userStatus: 'REQUESTED',
  createdAt: new Date().toISOString(),
};