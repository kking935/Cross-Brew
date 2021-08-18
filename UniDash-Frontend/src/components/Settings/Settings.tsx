import React from 'react';
import { Link, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BT } from "mui-bueno";
import { useOtherStyles } from "../../App";

const useStyles = makeStyles({
	root: {
		textAlign: 'center',
	},
	restrictWidth: {},
});

function Settings() {
	const classes = useStyles();
	const globalClasses = useOtherStyles();

	return (
		<>
			<div className={classes.root}>
				<BT
					variant='h4'
					className={`${globalClasses.banner} ${classes.restrictWidth}`}
				>
					Settings
				</BT>
				<BT
					variant='subtitle2'
					className={`${globalClasses.info} ${classes.restrictWidth}`}
				>
					Edit your University settings
				</BT>
				<hr className={globalClasses.hrDivider} />
				<BT variant='body2' className={classes.restrictWidth}>
					COMING SOON!
				</BT>
                <Switch name='switch' />
			</div>
		</>
	);
}

export default Settings;
