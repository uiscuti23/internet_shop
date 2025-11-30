import cl from '../../../styles/UI/inputs/SearchInput.module.css';

const SearchInput = ({...props}) => {
	return (
		<input className={cl.search_users} {...props} />
	);
};

export { SearchInput };
