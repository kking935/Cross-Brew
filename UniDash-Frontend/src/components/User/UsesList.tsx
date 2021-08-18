import React from 'react';
import { BT } from 'mui-bueno';
import { useOtherStyles } from '../../App';
import { useHistory } from 'react-router-dom';
import { Box, Card } from '@material-ui/core';
import { User, UserDetails, UserMinimal } from '../../@types';
import { getUsers } from '../../axios/users';
import { makeStyles } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';
import UserCardHeader from './UserCardHeader';

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
			display: 'none',
		},
	},
	userCard: {
		margin: '5px 0',
	},
	actionIcon: {
		padding: '20px',
	},
});

export type UsersListProps = {
	users: UserMinimal[];
};

const UsersList = (props: UsersListProps) => {
	const classes = useStyles();
	const history = useHistory();

	const onSelectUser = (email: string | undefined) => {
		if (email) {
			history.push(`/Students/details/${email}`);
		}
	};

	return (
		<>
			<Box>
				{props.users.map((user: UserMinimal) => {
					return user.email == 'admin@psu.edu' ? (
						''
					) : (
						<Card
							color='primary'
							className={classes.userCard}
							key={'user-' + user.id}
							onClick={() => onSelectUser(user.email)}
						>
							<UserCardHeader user={user} />
						</Card>
					);
				})}
			</Box>
		</>
	);
};

export default UsersList;
