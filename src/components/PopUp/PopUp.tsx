import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PopUp.css';

interface PopupProps {
  message: string;
  onClose:() => void;
}

export const PopUp: React.FC<PopupProps> = ({ message, onClose }) => {
  useEffect(() => {
    toast.info(message, { onClose }); // Pass the onClose callback to close the popup
  }, []);

  return (
  <div className="popup-container">
    <p>{message}</p>
    {/* Add any additional elements or buttons here */}
  </div>
  );
};