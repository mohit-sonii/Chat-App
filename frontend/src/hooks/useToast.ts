
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const useToast = () => {
   const newToast = (toastMessage:string) => {
      toast(`${ toastMessage }`);
   }
   return {newToast}
}