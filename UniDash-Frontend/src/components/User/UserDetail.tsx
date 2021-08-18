import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import {
	Card,
	IconButton,
	CardContent,
	CardActions,
	makeStyles,
	Box,
	AppBar,
	Collapse,
	TableRow,
	TableCell,
	Table,
	TableBody,
	Typography,
	Dialog,
	DialogTitle,
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@material-ui/core';
import { UpdateUser, User, UserDetails } from '../../@types';
import { getUser, updateUser, deleteUser } from '../../axios/users';
import { BButton, BT } from 'mui-bueno';
import { blue, green, grey, red } from '@material-ui/core/colors';
import { ExpandMore, RotateLeft } from '@material-ui/icons';
import UserCardHeader from './UserCardHeader';
import BackBanner from '../../common/Banners/BackBanner';
import { useEffect } from 'react';
import ConfirmDialog from '../../common/Dialogs/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
	root: {},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	cardAction: {
		margin: '0px',
		padding: '0px',
	},
	buttonBanner: {
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'space-around',
		['@media (max-width:600px)']: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	actionButton: {
		fontSize: '12px',
		flex: 1,
		maxWidth: '130px',
		margin: '10px',
		['@media (max-width:600px)']: {
			maxWidth: '60vw',
			width: '60vw',
		},
	},
	enableButton: {
		backgroundColor: blue[400],
		'&:hover': {
			background: blue[800],
		},
	},
	suspendButton: {
		backgroundColor: grey[500],
		'&:hover': {
			background: grey[800],
		},
	},
	deleteButton: {
		backgroundColor: red[400],
		'&:hover': {
			background: red[800],
		},
	},
	card: {
		backgroundColor: 'secondary',
	},
	infoRow: {
		color: 'black',
	},
	text: {
		fontSize: '15px',
		['@media (max-width:400px)']: {
			fontSize: '5vw',
		},
	},
	boldText: {
		weight: '600',
	},
}));

type UserItemProps = {
	name: string;
	value: string;
};

const UserDetail: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();
	const { email } = useParams<any>();

	const UserItem = (props: UserItemProps) => {
		return (
			<>
				<TableRow hover={true}>
					<TableCell>
						<Typography
							className={`${classes.text} ${classes.boldText}`}
							color='textSecondary'
						>
							{props.name}
						</Typography>
					</TableCell>
					<TableCell>
						<Typography
							className={classes.text}
							color='textSecondary'
						>
							{props.value}
						</Typography>
					</TableCell>
				</TableRow>
			</>
		);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [user, setUser] = React.useState<UserDetails>({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		collegeId: '',
		phoneNumberCode: '',
		phoneNumber: '',
		ratingFromRiders: '',
		ratingFromDrivers: '',
		ratingTotal: '',
		privacyPolicyAgreeDateTime: '',
		roles: [],
		userDetail: '',
	});

	React.useEffect(() => {
		console.log('User email: ', email);
		if (email) {
			console.log(email);
			getUser(email).then((res: any) => {
				console.log(res.data);
				setUser(res.data);
			});
		}
	}, [email]);

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [openER, setOpenER] = React.useState(false);
	const handleClickOpenER = () => {
		setOpenER(true);
	};
	const handleCloseER = () => {
		setOpenER(false);
		console.log('enabling rider priv');
		let newRoles: string[] = [];
		user.roles.map((role) => {
			if (role == 'rider') {
				return;
			} else {
				newRoles.push(role);
			}
		});
		newRoles.push('rider');

		updateUser({ id: user.id, roles: newRoles })
			.then((res: any) => {
				const newUser: UserDetails = {
					...user,
					roles: newRoles,
				};
				setUser(newUser);
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	const [openDR, setOpenSR] = React.useState(false);
	const handleClickOpenSR = () => {
		setOpenSR(true);
	};
	const handleCloseSR = () => {
		setOpenSR(false);
		console.log('suspending rider priv');
		let newRoles: string[] = [];
		user.roles.map((role) => {
			if (role != 'rider') {
				console.log(role);
				newRoles.push(role);
			}
		});

		updateUser({ id: user.id, roles: newRoles })
			.then((res: any) => {
				const newUser: UserDetails = {
					...user,
					roles: newRoles,
				};
				setUser(newUser);
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	const enableRidePrivileges = (
		<>
			<BButton
				onClick={handleClickOpenER}
				className={`${classes.actionButton} ${classes.enableButton}`}
			>
				Enable Rider Privileges
			</BButton>
			<ConfirmDialog
				title={`Are you sure you want to enable rider privileges for ${user.firstName} ${user.lastName}?`}
				message={`By enabling ${user.firstName} ${user.lastName}'s rider privileges, they will be able to schedule rides in the app.`}
				open={openER}
				onClose={handleCloseER}
			/>
		</>
	);

	const suspendRidePrivileges = (
		<>
			<BButton
				onClick={handleClickOpenSR}
				className={`${classes.actionButton} ${classes.suspendButton}`}
			>
				Suspend Rider Privileges
			</BButton>
			<ConfirmDialog
				title={`Are you sure you want to suspend rider privileges for ${user.firstName} ${user.lastName}?`}
				message={`By suspending ${user.firstName} ${user.lastName}'s rider privileges, they will no longer be able to schedule rides in the app.`}
				open={openDR}
				onClose={handleCloseSR}
			/>
		</>
	);

	const rideOptions = user.roles?.includes('rider')
		? suspendRidePrivileges
		: enableRidePrivileges;

	const [openED, setOpenED] = React.useState(false);
	const handleClickOpenED = () => {
		setOpenED(true);
	};
	const handleCloseED = () => {
		setOpenED(false);
		console.log('enabling driver priv');
		let newRoles: string[] = [];
		user.roles.map((role) => {
			if (role == 'driver') {
				return;
			} else {
				newRoles.push(role);
			}
		});
		newRoles.push('driver');

		updateUser({ id: user.id, roles: newRoles })
			.then((res: any) => {
				const newUser: UserDetails = {
					...user,
					roles: newRoles,
				};
				setUser(newUser);
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	const [openSD, setOpenSD] = React.useState(false);
	const handleClickOpenSD = () => {
		setOpenSD(true);
	};
	const handleCloseSD = () => {
		setOpenSD(false);
		console.log('suspending driver priv');
		let newRoles: string[] = [];
		user.roles.map((role) => {
			if (role != 'driver') {
				newRoles.push(role);
			}
		});

		updateUser({ id: user.id, roles: newRoles })
			.then((res: any) => {
				console.log(res);
				const newUser: UserDetails = {
					...user,
					roles: newRoles,
				};
				setUser(newUser);
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	const enableDrivePrivileges = (
		<>
			<BButton
				onClick={handleClickOpenED}
				className={`${classes.actionButton} ${classes.enableButton}`}
			>
				Enable Driver Privileges
			</BButton>
			<ConfirmDialog
				title={`Are you sure you want to enable driver privileges for ${user.firstName} ${user.lastName}?`}
				message={`By enabling ${user.firstName} ${user.lastName}'s driver privileges, they will be able to schedule drives in the app.`}
				open={openED}
				onClose={handleCloseED}
			/>
		</>
	);

	const suspendDrivePrivileges = (
		<>
			<BButton
				onClick={handleClickOpenSD}
				className={`${classes.actionButton} ${classes.suspendButton}`}
			>
				Suspend Driver Privileges
			</BButton>
			<ConfirmDialog
				title={`Are you sure you want to suspend driver privileges for ${user.firstName} ${user.lastName}?`}
				message={`By suspending ${user.firstName} ${user.lastName}'s driver privileges, they will be able to schedule drives in the app.`}
				open={openSD}
				onClose={handleCloseSD}
			/>
		</>
	);

	const driveOptions = user.roles?.includes('driver')
		? suspendDrivePrivileges
		: enableDrivePrivileges;

	const [openDU, setOpenDU] = React.useState(false);
	const handleClickOpenDU = () => {
		setOpenDU(true);
	};
	const handleCloseDU = () => {
		setOpenDU(false);
		deleteUser(user.id)
			.then((result: any) => {
				console.log(result);
				history.push('/Students');
			})
			.catch((err: any) => {
				console.log('ERROR: ', err);
				history.push('/Students');
			});
	};

	const removeUser = (
		<>
			<BButton
				onClick={handleClickOpenDU}
				className={`${classes.actionButton} ${classes.deleteButton}`}
			>
				Permanently Remove User
			</BButton>
			<ConfirmDialog
				title={`Are you sure you want to remove ${user.firstName} ${user.lastName}?`}
				message={`By removing ${user.firstName} ${user.lastName}'s from your university, their .edu email will be blocked and they will no longer have access to the Vector Rideshare app.`}
				open={openDU}
				onClose={handleCloseDU}
			/>
		</>
	);

	const actionButtons = (
		<>
			<Box className={classes.buttonBanner}>
				{rideOptions}
				{driveOptions}
				{removeUser}
			</Box>
		</>
	);

	return (
		<div className={classes.root}>
			<BackBanner title='User Details' />

			<Card className={classes.card}>
				<UserCardHeader user={user} />
				<hr />
				<CardContent>
					<Table>
						<TableBody>
							<UserItem
								name='College ID'
								value={user.collegeId}
							/>
							<UserItem
								name='University Email'
								value={user.email}
							/>
							<UserItem
								name='Phone Number'
								value={`(${user.phoneNumberCode}) ${user.phoneNumber}`}
							/>
							<UserItem
								name='Rating From Riders'
								value={user.ratingFromRiders}
							/>
							<UserItem
								name='Rating From Drivers'
								value={user.ratingFromDrivers}
							/>

							<UserItem
								name='Total Rating'
								value={user.ratingTotal}
							/>
						</TableBody>
					</Table>
				</CardContent>
				<hr />
				<CardActions className={classes.cardAction} disableSpacing>
					<IconButton
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'
						className={classes.expand}
					>
						<BT variant='subtitle2'>Actions</BT>
						<ExpandMore
							className={clsx(classes.expand, {
								[classes.expandOpen]: expanded,
							})}
						/>
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>{actionButtons}</CardContent>
				</Collapse>
			</Card>
		</div>
	);
};

export default UserDetail;
