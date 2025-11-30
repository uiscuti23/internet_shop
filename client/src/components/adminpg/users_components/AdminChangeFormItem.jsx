import cl from '../../../styles/adminpg/users/admin_change_form_item.module.css';

const AdminChangeFormItem = ({value, currentValue, userId, idClass, callback, disabled, ...props}) => {

	const checkVal = (str) => value === str ? true : false;

	const id = currentValue + idClass + userId;

	return (
		<div className={cl.radio__item}>
			<input
				className={cl.radio_input}
				type="radio"
				name="role"
				value={currentValue}
				checked={checkVal(currentValue)}
				onChange={e => callback(e.target.value)}
				id={id}
				disabled={disabled}
			/>
			<label
				className={cl.radio_label}
				htmlFor={id}
				>
				<span>{currentValue}</span>
			</label>
		</div>
		

	);
};

export { AdminChangeFormItem };
