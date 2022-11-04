import { forwardRef } from 'react';
import './ModalCard.css';

type ModalCardProps = {
  children: React.ReactNode;
};

const ModalCard = forwardRef<HTMLDivElement, ModalCardProps>(
  ({ children }, ref) => {
    return (
      <div
        className='modal-card text-white'
        ref={ref}>
        {children}
      </div>
    );
  }
);
export default ModalCard;
