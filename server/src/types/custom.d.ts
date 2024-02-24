// src/types/custom.d.ts or any other file name of your choice

import { Request } from 'express';

// Extend the user property according to the structure you expect it to have
interface UserPayload {
  _id: string;
  email: string;
  name: string;
  // include other user properties as needed
}

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // The user property is optional to account for routes where the user might not be authenticated
    }
  }
}
