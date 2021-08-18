import React from 'react';
import { BT } from 'mui-bueno';
import { useOtherStyles } from '../../App';
import { useHistory } from 'react-router-dom';
import {
	Box,
	Card,
} from '@material-ui/core';
import { Group, GroupMinimal } from '../../@types';
import { getGroups } from '../../axios/groups';
import { makeStyles } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';
import GroupCardHeader from './GroupCardHeader';

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
	groupCard: {
		margin: '5px 0px',
  },
  actionIcon: {
    padding: '20px'
  }
});

export type GroupsListProps = {
	groups: GroupMinimal[]
}

const GroupsList = (props: GroupsListProps) => {
	const classes = useStyles();
	const history = useHistory();

	const onSelectGroup = (name: string | undefined) => {
		if (name) {
			history.push(`/Groups/details/${name}`);
		}
	};

	return (
		<>
			<Box>
				{props.groups?.map((group) => {
					return (
						<Card
							color='primary'
							className={classes.groupCard}
							key={'group-' + group.id}
							onClick={() => onSelectGroup(group.name)}
						>
							<GroupCardHeader group={group} />
						</Card>
					);
				})}
			</Box>
		</>
	);
}

export default GroupsList;
