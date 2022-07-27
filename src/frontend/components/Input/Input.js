function Input({
	type,
	label,
	name,
	autoComplete,
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
				autoComplete={autoComplete}
				className={`input text-md ${classNames}`}
				value={value}
				onChange={handleChange}
				required={required}
			/>
		</div>
	);
}

export default Input;
