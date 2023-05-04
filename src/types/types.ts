import { Timestamp } from "@firebase/firestore-types";

export enum AuthActionTypeEnum {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  AUTH_IS_READY = "AUTH_IS_READY",
}

export interface User {
  displayName?: string;
  photoURL?: string;
  id?: string;
  online?: boolean;
}

export interface Comment extends User {
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
  assignedUsersList: User[];
  category: projectCategories | null;
  comments: Comment[];
  createdAt: Timestamp | null;
  createdBy: User | null;
  details: string;
  dueDate: Timestamp | null;
  name: string;
  id: string;
}

export type Collecions = User[] | Project[];
