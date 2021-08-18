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
import { Group, GroupMinimal } from '../../@types';

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
	groupCard: {
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

export type GroupCardHeaderProps = {
	group: GroupMinimal;
};

const GroupCardHeader = (props: GroupCardHeaderProps) => {
	const classes = useStyles();
	const group = props.group;

	const handleDisableCheck = (target: string, list: String[]) => {
		if (list?.includes(target)) {
			return 'primary';
		} else {
			return 'disabled';
		}
	};

	const handleDriverIcon = (groupRoles: String[]) => {
		return (
			<>
				<Icon
					className={classes.actionIcon}
					color={handleDisableCheck('driver', groupRoles)}
				>
					<DriveEta />
				</Icon>
			</>
		);
	};

	const handleRiderIcon = (groupRoles: String[]) => {
		return (
			<>
				<Icon
					className={classes.actionIcon}
					color={handleDisableCheck('rider', groupRoles)}
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
					<Avatar aria-label='Group' className={classes.avatar}>
						{group.name[0]}
					</Avatar>
				}
				title={
					<>
						<Typography className={classes.title}>
							{group.name}
						</Typography>
					</>
				}
				subheader={
					<>
						{/* <Typography className={classes.subHeader}>
							{group.email}
						</Typography> */}
					</>
				}
				// action={
				// 	<>
				// 		{handleRiderIcon(group.roles)}
				// 		{handleDriverIcon(group.roles)}
				// 	</>
				// }
			/>
		</>
	);
};

export default GroupCardHeader;
