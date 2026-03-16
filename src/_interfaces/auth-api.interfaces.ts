import { CollaboratorI } from "./collaborator.interfaces";


export interface LoginReqI {
  email?: string;
  password?: string;
}

export interface LoginResI {
  user: UserI;
  token: string;
}

export interface UserI extends CollaboratorI {}

export interface CreateBranchReqI {
  email: string;
  name: string;
  operatingAreaId: string;
}

export interface BranchI {
  id: string;
  email: string;
  operatingAreaId: string;
  name: string;
  isOnline: boolean;
}

export interface OperatingAreaI {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface GetProfileResI {
  data: CollaboratorI;
}
