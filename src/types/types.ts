import { Timestamp } from "@firebase/firestore-types";

export enum AuthActionTypeEnum {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  AUTH_IS_READY = "AUTH_IS_READY",
}

export interface User {
  displayName?: string;
  id?: string;
  photoURL?: string;
}

export interface comment extends User {
  content: string;
  createdAt: Timestamp;
}

export enum projectCategories {
  DESIGN = "design",
  DEVELOPMENT = "development",
  MARKETING = "marketing",
  SALES = "sales",
}

export interface Project {
  assignedUserList?: User[];
  category?: projectCategories;
  comments?: comment[];
  createdAt?: Timestamp;
  createdBy?: User;
  details?: string;
  dueDate?: Timestamp;
  name?: string;
  id?: string;
}

export type Collecions = User[] | Project[];
