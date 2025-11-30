import cl from '../../../styles/adminpg/users/users_admin.module.css';

const AdminDateItem = ({timeString, isDay}) => {
	let separator, sepIndex, rootClass, sepClass;
	if (isDay) {
		separator = '/';
		sepIndex = 2;
		rootClass = cl.day;
		sepClass = cl.day__separator;
	} else {
		separator = ':';
		sepIndex = 1;
		rootClass = cl.time;
		sepClass = cl.time__separator;
	}

	const getDateArray = (time, isDate = true) => {
		const date = new Date(Date.parse(time));
		const array = isDate
			? [date.getDate(), date.getMonth() + 1, date.getFullYear()]
			: [date.getHours(), date.getMinutes()];

		return array.map(time => checkTimeLength(time));
	}

	const checkTimeLength = time => (String(time).length === 1) ? `0${time}` : `${time}`;

	return (
		<div className={rootClass}>
			{
				getDateArray(timeString, isDay).map((i, index) => (
					<div key={index} className={cl.wrapper}>
						<span className={cl.number}>{i}</span>
						{
							(index !== sepIndex)
								? <span className={sepClass}>
									{separator}
								</span>
								: ''
						}
					</div>
				))
			}
		</div>
	);
};

export { AdminDateItem };
