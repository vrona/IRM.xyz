import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PopupProps {
  message: string;
}

export const PopUp: React.FC<PopupProps> = ({ message }) => {
  const displayPopup = () => {
    toast.info(message);
  };

  return null;
};