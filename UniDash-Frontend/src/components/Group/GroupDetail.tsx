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
import { UpdateGroup, Group, UserMinimal } from '../../@types';
import {
	getGroup,
	updateGroup,
	deleteGroup,
	getGroupMembers,
} from '../../axios/groups';
import { BButton, BT } from 'mui-bueno';
import { blue, green, grey, red } from '@material-ui/core/colors';
import { ExpandMore, RotateLeft } from '@material-ui/icons';
import GroupCardHeader from './GroupCardHeader';
import BackBanner from '../../common/Banners/BackBanner';
import { useEffect } from 'react';
import ConfirmDialog from '../../common/Dialogs/ConfirmDialog';
import UsersList from '../User/UsesList';

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

type GroupItemProps = {
	name: string;
	value: string;
};

const GroupDetail: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();
	const { name } = useParams<any>();

	const GroupItem = (props: GroupItemProps) => {
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

	const [group, setGroup] = React.useState<Group>({
		id: '',
		name: '',
		members: [],
	});

	React.useEffect(() => {
		console.log('Group name: ', name);
		if (name) {
			console.log(name);
			getGroup(name).then((res: any) => {
				console.log(res.data);

				setGroup({ ...res.data });
			});
		}
	}, [name]);

	// React.useEffect(() => {
	// 	console.log('Group name: ', name);
	// 	if (name) {
	// 		console.log(name);
	// 		getGroupMembers(name).then((res: any) => {
	// 			console.log(res.data);

	// 			setMembers({...res.data});
	// 		});
	// 	}
	// }, [members]);

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [openDU, setOpenDU] = React.useState(false);
	const handleClickOpenDU = () => {
		setOpenDU(true);
	};
	const handleCloseDU = () => {
		setOpenDU(false);
		deleteGroup(group.id)
			.then((result: any) => {
				console.log(result);
				history.push('/Groups');
			})
			.catch((err: any) => {
				console.log('ERROR: ', err);
				history.push('/Groups');
			});
	};

	const removeGroup = (
		<>
			<BButton
				onClick={handleClickOpenDU}
				className={`${classes.actionButton} ${classes.deleteButton}`}
			>
				Permanently Remove Group
			</BButton>
			<ConfirmDialog
				title={`Are you sure you want to remove ${group.name}?`}
				message={`By removing the group ${group.name} from your university, all members will be removed from the group and the group will be deleted.`}
				open={openDU}
				onClose={handleCloseDU}
			/>
		</>
	);

	const actionButtons = (
		<>
			<Box className={classes.buttonBanner}>{removeGroup}</Box>
		</>
	);

	return (
		<div className={classes.root}>
			<BackBanner title='Group Details' />

			<Card className={classes.card}>
				<GroupCardHeader group={{ ...group }} />
				<hr />
				<CardContent>
					<Table>
						<TableBody style={{textAlign: 'left'}}>
							<Typography style={{marginLeft: '10px'}} variant='subtitle1' color='textSecondary'>Members</Typography>
						</TableBody>
					</Table>
					<UsersList users={group.members} />
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

export default GroupDetail;
