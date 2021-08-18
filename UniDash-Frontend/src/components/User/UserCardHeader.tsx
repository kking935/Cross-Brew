import {
	Avatar,
	CardHeader,
	Icon,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { DriveEta, EmojiPeople } from '@material-ui/icons';
import React from 'react';
import { User, UserDetails, UserMinimal } from '../../@types';

const useStyles = makeStyles({
	title: {
		color: 'black',
	},
	// subHeader:{
	// 	fontSize: '15px'
	// },
	avatar: {
		backgroundColor: blue[500],
	},
	action: {
		padding: '20px 1vw 0px 0px',
	},
	userCard: {
		margin: '10px 5vw',
	},
	actionIcon: {
		['@media (max-width:475px)']: {
			padding: '10px',
		},
		['@media (max-width:375px)']: {
			padding: '5px',
		},
		['@media (max-width:340px)']: {
			padding: '0px',
		},
		padding: '20px',
	},
});

export type UserCardHeaderProps = {
	user: UserMinimal;
};

const UserCardHeader = (props: UserCardHeaderProps) => {
	const classes = useStyles();
	const user = props.user;

	const handleDisableCheck = (target: string, list: string[]) => {
		if (list?.includes(target)) {
			return 'primary';
		} else {
			return 'disabled';
		}
	};

	const handleDriverIcon = (userRoles: string[]) => {
		return (
			<>
				<Icon
					className={classes.actionIcon}
					color={handleDisableCheck('driver', userRoles)}
				>
					<DriveEta />
				</Icon>
			</>
		);
	};

	const handleRiderIcon = (userRoles: string[]) => {
		return (
			<>
				<Icon
					className={classes.actionIcon}
					color={handleDisableCheck('rider', userRoles)}
				>
					<EmojiPeople />
				</Icon>
			</>
		);
	};

	return (
		<>
			<CardHeader
				classes={{
					title: classes.title,
					action: classes.action,
				}}
				avatar={
					<Avatar aria-label='User' className={classes.avatar}>
						{user.firstName[0]}
						{user.lastName[0]}
					</Avatar>
				}
				title={
					<>
						<Typography className={classes.title}>
							{user.firstName + ' ' + user.lastName}
						</Typography>
					</>
				}
				subheader={
					<>
						{/* <Typography className={classes.subHeader}>
							{user.email}
						</Typography> */}
					</>
				}
				action={
					<>
						{handleRiderIcon(user.roles)}
						{handleDriverIcon(user.roles)}
					</>
				}
			/>
		</>
	);
};

export default UserCardHeader;
