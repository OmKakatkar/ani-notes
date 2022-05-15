function Input({ type, label, name, value, handleChange }) {
	return (
		<div className="input-container">
			<label htmlFor={name}> {label}</label>
			<input
				type={type}
				name={name}
				className="input text-md"
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default Input;
