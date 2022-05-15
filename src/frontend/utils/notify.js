import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const notify = (type, msg) => {
	toast[type](msg, {
		position: toast.POSITION.BOTTOM_LEFT,
	});
};
