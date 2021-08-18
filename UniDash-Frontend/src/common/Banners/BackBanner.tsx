import { AppBar, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

export type BackBannerProps = {
	title: string;
};

const useStyles = makeStyles({
	banner: {
		borderRadius: '5px',
        backgroundColor: 'rgb(18, 163, 247)',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
	},
	title: {
        color: 'white',
        margin: '0 auto'

	},
	backButton: {
        color: 'white',
	},
});

const BackBanner = (props: BackBannerProps) => {
	const classes = useStyles();
	const history = useHistory();

	const handleBackButton = () => {
		history.goBack();
	};

	return (
		<>
			<Toolbar className={classes.banner}>
				<IconButton
					onClick={handleBackButton}
					edge='start'
					aria-label='menu'
					className={classes.backButton}
				>
					<ArrowBack />
				</IconButton>
					<Typography
						className={classes.title}
						variant='h4'
						color='inherit'
					>
						{props.title}
					</Typography>
			</Toolbar>
		</>
	);
};

export default BackBanner;
