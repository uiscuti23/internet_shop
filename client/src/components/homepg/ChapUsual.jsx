const ChapterUsual = ({heading, children}) => {
	return (
		<div className="chapter-usual">
			<h2>{heading}</h2>
			<div className="chapter-usual__row">
				{children}
			</div>
		</div>
	)
}

export { ChapterUsual }