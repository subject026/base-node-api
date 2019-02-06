// Add user as potential property on request object
declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
      isAdmin: boolean;
    };
  }
}
