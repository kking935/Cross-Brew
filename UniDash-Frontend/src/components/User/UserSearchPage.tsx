import React from 'react';
import { BT } from 'mui-bueno';
import { useOtherStyles } from '../../App';
import { useHistory } from 'react-router-dom';
import {
	Box,
	Card,
} from '@material-ui/core';
import { UserMinimal } from '../../@types';
import { getUsers } from '../../axios/users';
import { makeStyles } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';
import UsersList from './UsesList';
import UserSearchBar from './UserSearchBar';

const useStyles = makeStyles({
	title: {
		color: 'black',
	},
	avatar: {
		backgroundColor: blue[500],
	},
	action: {
    padding: '20px 1vw 0px 0px',
    ['@media (max-width:600px)']: { 
      display: 'none'
    }
	},
	userCard: {
		margin: '10px 5vw',
  },
  actionIcon: {
    padding: '20px'
  }
});

const UserSearchPage = () => {
	const globalClasses = useOtherStyles();
	const classes = useStyles();

	const [users, setUsers] = React.useState<UserMinimal[]>([]);
	React.useEffect(() => {
		getUsers()
			.then((res: any) => {
				setUsers(res.data);
			})
			.catch((err: any) => console.log(err));
	}, []);
	
	const handleSearch = () => {
		
	}
    
	return (
		<>
			<BT variant='h4' className={globalClasses.banner}>
				Student Dashboard
			</BT>
			<BT variant='subtitle2' className={globalClasses.info}>
				The Vectoreans from your university
			</BT>
			<hr className={globalClasses.hrDivider} />
			<UserSearchBar users={users} onSearch={handleSearch} />
			<UsersList users={users} />
		</>
	);
}

export default UserSearchPage;
