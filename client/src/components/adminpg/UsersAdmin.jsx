import cl from '../../styles/adminpg/users/users_admin.module.css';

import { useState, useEffect } from 'react';
import { AdminColumn } from './users_components/AdminColumn';
import { useSearchParams } from 'react-router-dom';
import { UserFilter } from './users_components/UserFilter';
import { NotFound } from '../NotFound';
import { LoaderDual } from '../animation/LoaderDual';
import { AdminCaption } from './users_components/AdminCaption';
import { useAuth } from '../../hook/useAuth';
import { observer } from 'mobx-react-lite';

const UsersAdmin = observer(() => {
  const { stores, getAndSetUsers } = useAuth();
  const users = stores.allUsers.allUsers;
  const isLoading = stores.allUsers.isLoading;

  useEffect(() => {
    stores.allUsers.setIsLoading(true);
    getAndSetUsers();
  }, []);

  const [selectedColumn, setSelectedColumn] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const emailQuery = searchParams.get('email') || '';
  const roleQuery = searchParams.get('role') || 'all';

  const [sortBy, setSortBy] = useState('');

  const selectColumn = id => setSelectedColumn(id);

  const filterUsers = users => {
    const filtered = users.filter(
      user =>
        user.email.toLowerCase().includes(emailQuery.toLowerCase()) &&
        (user.role === roleQuery.toUpperCase() || roleQuery === 'all')
    );
    return filtered;
  };
  const filteredUsers = filterUsers(users);

  const sortUsers = (usersArr, sortBy) => {
    const array = [...usersArr];
    const sortOptions = {
      email: (a, b) => a.email.localeCompare(b.email),
      createdDate: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
      updatedDate: (a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt),
      emailRev: (a, b) => b.email.localeCompare(a.email),
      createdDateRev: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      updatedDateRev: (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
    };

    if (sortOptions[sortBy]) {
      array.sort(sortOptions[sortBy]);
    }

    return array;
  };

  const sortedUsers = sortUsers(filteredUsers, sortBy);

  return (
    <div className={cl.table}>
      <h2>Users</h2>
      <UserFilter emailQuery={emailQuery} roleQuery={roleQuery} setSearchParams={setSearchParams} />
      {isLoading ? (
        <div className={cl.loader_wrapper}>
          <LoaderDual />
        </div>
      ) : (
        <div className={cl.table__row}>
          {sortedUsers.length === 0 ? (
            <NotFound element='Users' />
          ) : (
            <AdminCaption setSortBy={setSortBy} />
          )}
          {sortedUsers.length !== 0 && (
            <ul className={cl.columns__row}>
              {sortedUsers.map(user => (
                <AdminColumn
                  key={user.id}
                  user={user}
                  selectedId={selectedColumn}
                  select={selectColumn}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
});

export { UsersAdmin };
