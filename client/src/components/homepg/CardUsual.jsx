import { Link } from "react-router-dom";

const CardUsual = ({name, image}) => {
	return (
		<Link to='/' className="category-card">
			<div className="category-card__img">
				<img src={image} alt={name} />
			</div>
			<p>{name}</p>
		</Link>
	)
}

export { CardUsual }