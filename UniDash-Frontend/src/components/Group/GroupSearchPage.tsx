import React from 'react';
import { BT } from 'mui-bueno';
import { useOtherStyles } from '../../App';
import { useHistory } from 'react-router-dom';
import { Box, Card } from '@material-ui/core';
import { GroupMinimal } from '../../@types';
import { getGroups } from '../../axios/groups';
import { makeStyles } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';
import GroupsList from './GroupList';
import GroupSearchBar from './GroupSearchBar';

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
	groupCard: {
		margin: '10px 5vw',
	},
	actionIcon: {
		padding: '20px',
	},
});

const GroupSearchPage = () => {
	const globalClasses = useOtherStyles();
	const classes = useStyles();

	const [groups, setGroups] = React.useState<GroupMinimal[]>([]);
	React.useEffect(() => {
		getGroups()
			.then((res: any) => {
				setGroups(res.data);
			})
			.catch((err: any) => console.log(err));
	}, []);

	const handleSearch = () => {};

	return (
		<>
			<BT variant='h4' className={globalClasses.banner}>
				Group Dashboard
			</BT>
			<BT variant='subtitle2' className={globalClasses.info}>
				The groups from your university
			</BT>
			<hr className={globalClasses.hrDivider} />
			<GroupSearchBar groups={groups} onSearch={handleSearch} />
			<GroupsList groups={groups} />
		</>
	);
};

export default GroupSearchPage;
