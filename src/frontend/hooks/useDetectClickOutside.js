import { useEffect, useRef, useState } from 'react';

// Custom Hook that Detects click outside a component.
// Takes an initial state for the item (Shown or Hidden Visually)
// Returns a state,
//           setter function,
//           nodeRef for referencing the node to keep track,
//           triggerRef to reference the node that triggers the state
function useDetectClickOutside(initialState) {
	const nodeRef = useRef(null);
	const triggerRef = useRef(null);

	const [showItem, setShowItem] = useState(initialState);

	const handleClickOutside = e => {
		// If click is on trigger(can be a button), toggle item
		if (triggerRef.current && triggerRef.current.contains(e.target)) {
			return setShowItem(!showItem);
		}

		// If item is open and click is outside of item, close item
		if (nodeRef.current && !nodeRef.current.contains(e.target)) {
			return setShowItem(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return {
		triggerRef,
		nodeRef,
		showItem,
		setShowItem
	};
}
export default useDetectClickOutside;
