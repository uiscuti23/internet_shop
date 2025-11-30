import cl from "../../../styles/adminpg/users/users_admin.module.css";

const AdminEmail = ({email, role}) => {

	const getRoleClass = () => {
		if (role === 'ADMIN') {
			return <span className={cl.role + ' ' + cl.role__admin}>{role.toLowerCase()}</span>;
		} else if (role === 'SELLER') {
			return <span className={cl.role + ' ' + cl.role__seller}>{role.toLowerCase()}</span>;
		} else {
			return '';
		}
	}
	getRoleClass()

	return (
		<div className={cl.item + ' ' + cl.email}>
			{email}
			{getRoleClass()}
		</div>
	);
};

export { AdminEmail };
