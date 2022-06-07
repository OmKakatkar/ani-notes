import { forwardRef } from "react";
import "./ModalCard.css";

const ModalCard = forwardRef(({ children }, ref) => {
	return (
		<div className="modal-card text-white" ref={ref}>
			{children}
		</div>
	);
});
export default ModalCard;
