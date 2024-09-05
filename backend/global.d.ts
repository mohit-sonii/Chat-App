import User from "./models/User.model";

declare global {
   namespace Express {
      interface Request {
         userData: User,
      }
   }
}