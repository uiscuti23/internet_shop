import '../../styles/homepg/chapter.css';

const Chapter = ({heading, children}) => {
	return (
		<div className="chapter">
			<h2>{heading}</h2>
			<div className="chapter__row">
				{children}
			</div>
		</div>
	)
}

export { Chapter }