import cl from '../../../styles/UI/buttons/CtaButton.module.css';

const CtaButton = ({children, disabled, ...props}) => {
	return (
		<button
			className={cl.btn}
			disabled={disabled}
			{...props}>
			{children}
		</button>
	);
};

export { CtaButton };
