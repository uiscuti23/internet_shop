import succesIcon from '../../../assets/header_icons/succes.png';
import cl from "../../../styles/UI/indicators/SuccessIndicator.module.css";

const SuccessIndicator = () => {
	return (
		<span className={cl.success}>
			<img className={cl.success_icon} src={succesIcon} alt="succesIcon" />
		</span>
	);
};

export { SuccessIndicator };
