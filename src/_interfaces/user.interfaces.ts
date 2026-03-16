
export enum ManagementType {
  Admin = "Admin",
  Collaborator = "Collaborator",
}

export interface GetUsersResI {
  data: User[];
  meta: Meta;
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  activationKey: any;
  userStatus: any;
  coin: any;
  createdAt: string;
  updatedAt: any;
  blocked: boolean;
  affiliateId?: string;
  affiliate?: AffiliateI;
}

export interface AffiliateI {
  id: string;
  refferalCode: string;
  totalEarnings: number;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GetDownloadResI {
  data: DownloadI[];
  meta: Meta;
}

export interface DownloadI {
  id: string;
  userId: string;
  user: User;
  productId: string;
  createdAt: Date;
}
