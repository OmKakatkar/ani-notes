function Input({
	type,
	label,
	name,
	value,
	handleChange,
	classNames,
	required,
}) {
	return (
		<div className="input-container">
			<label htmlFor={name}> {label}</label>
			<input
				type={type}
				name={name}
				className={`input text-md ${classNames}`}
				value={value}
				onChange={handleChange}
				required={required}
			/>
		</div>
	);
}

export default Input;
