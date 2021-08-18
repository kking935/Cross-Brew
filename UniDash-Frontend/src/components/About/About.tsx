import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { BT } from 'mui-bueno';
import React from 'react';
import { useOtherStyles } from '../../App';

const useStyles = makeStyles({
	root: {
		textAlign: 'center',
	},
	restrictWidth: {
		textAlign: 'center',
		margin: '0 15vw',
	},
});

function About() {
	const classes = useStyles();
	const globalClasses = useOtherStyles();

	return (
		<>
			<div className={classes.root}>
				<BT variant='h4' className={`${globalClasses.banner}`}>
					Welcome to UniDash
				</BT>
				<BT variant='subtitle2' className={`${globalClasses.info} `}>
					The Official User Management System for Vector Rideshare
					Universities
				</BT>
				<hr className={globalClasses.hrDivider} />
				<BT variant='body2' className={classes.restrictWidth}>
					This platform is designed for authorized university
					personnel to manage the students and groups under
					their Vector Rideshare plan.
				</BT>
				<BT variant='body2' className={classes.restrictWidth}>
					The tools in this application provide a simple, easy way to
					view and moderate all of the students on the Vector
					Rideshare app under your university.
				</BT>
				<BT variant='body2' className={classes.restrictWidth}>
					To get started, log in with your Vector Rideshare University
					account.
				</BT>
			</div>
		</>
	);
}

export default About;
