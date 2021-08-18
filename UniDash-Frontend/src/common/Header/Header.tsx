import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Button, Slide, Toolbar, Tooltip } from '@material-ui/core';
import axiosInstance from '../../axios/axios-instance';
import { clearStoreLogout } from '../../modules/login-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../modules/root-reducer';
import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import { DarkModeProps } from '../../@types';
import { BT } from 'mui-bueno';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const Header = (props: DarkModeProps) => {
	// const trigger = useScrollTrigger({ threshold: 20 });

	const background = props.darkMode ? grey[900] : grey[100];
	const useStyles = makeStyles({
		header: {
			backgroundColor: background,
			color: 'rgb(18, 163, 247)',
			margin: '0px',
			padding: '10px 10px 10px 5vw',
			borderBottom: '1px solid black',
		},
		showHeader: {
			transform: 'translateY(0)',
			transition: 'transform 20s',
		},
		hideHeader: {
			transform: 'translateY(-110%)',
			transition: 'transform 20s',
		},
		icons: {
			color: 'rgb(0, 0, 0)',
		},
		logo: {
			padding: '10px 5px',
			width: '50px',
			margin: '5px 0px 0px',
			backgroundColor: 'rgb(255, 255, 255)',
			borderRadius: '10px',
			border: '1px solid black',
    },
    fillerBox: {
      height: '100px'
    },
    list: {
      textAlign: 'center'
    }
	});

	const classes = useStyles();

	const dispatch = useDispatch();

  const history = useHistory();
  const [clicked, setClicked] = React.useState<boolean>(true);

  const handleDropdownList = () => {
    let list = document.getElementById("dropdown-list");
    if (list) {
      if (!clicked) {
        list.style.display = "none";
        list.style.visibility = "hidden";
        setClicked(true);
      }
    }
  };

	// ensure that you import Store from root-reducer.tsx, not from 'redux'!
	const token = useSelector<Store, string>(
		(store) => store.loginReducer.token
	);
	console.log('TOKEN: ', token);
	const [showLogin, setShowLogin] = React.useState<boolean>(true);

	React.useEffect(() => {
		setShowLogin(token === '');
	}, [token]);
	console.log(showLogin);
	// const handleNewAcct = () => {
	//   history.push("/create-account");
	// };

	const handleLogin = () => {
    handleDropdownList();

		history.push('/Login');
	};

	const handleSettings = () => {
    handleDropdownList();

		history.push('/Settings');
	};

	const handleStudents = () => {
    handleDropdownList();

		history.push('/Students');
	};

	const handleGroups = () => {
    handleDropdownList();

		history.push('/Groups');
	};

	const handleAbout = () => {
    handleDropdownList();

		history.push('/About');
	};

	const handleLogout = () => {
    handleDropdownList();

		axiosInstance.defaults.headers.common.Authorization = '';
		dispatch(clearStoreLogout());
		localStorage.removeItem('token');
		history.push('Login');
	};

	const notLoggedIn = (
		<>
			{/* <li className="social-header">
        <Button
          className="header-buttons"
          color="default"
          variant="contained"
          onClick={handleNewAcct}
        >
          Signup
        </Button>
      </li> */}
			<li className='social-header'>
				<Button
					className='header-buttons'
					color='primary'
					variant='contained'
					onClick={handleLogin}
				>
					Login
				</Button>
			</li>
		</>
	);

	const loggedIn = (
		<>
			<li className='social-header'>
				<Tooltip title='Logout'>
					<Button
						className='header-buttons'
						variant='outlined'
						color='primary'
						onClick={handleLogout}
					>
						Logout
						{/* <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" /> */}
					</Button>
				</Tooltip>
			</li>
			<li className='social-header'>
				<Tooltip title='Settings'>
					<Button
						className='header-buttons'
						color='primary'
						onClick={handleSettings}
					>
						Settings
						{/* <FontAwesomeIcon icon={faCog} size="2x" /> */}
					</Button>
				</Tooltip>
			</li>
			<li className='social-header'>
				<Tooltip title='View Groups'>
					<Button
						className='header-buttons'
						color='primary'
						onClick={handleGroups}
					>
						Groups
						{/* <FontAwesomeIcon icon={faIdCard} size="2x" /> */}
					</Button>
				</Tooltip>
			</li>
			<li className='social-header'>
				<Tooltip title='View Students'>
					<Button
						className='header-buttons'
						color='primary'
						onClick={handleStudents}
					>
						Students
						{/* <FontAwesomeIcon icon={faIdCard} size="2x" /> */}
					</Button>
				</Tooltip>
			</li>
		</>
	);
	const notLoggedInDropdown = (
		<>
			<li>
				<Link to='/Login' onClick={handleLogout}>
					{/* <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" /> */}
					<BT
						variant='subtitle1'
						color='primary'
						className='dropdown-list-titles'
					>
						Login
					</BT>
				</Link>
			</li>
			{/* <li>
        <Link to="create-account">
          <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" />
          <BT variant='subtitle1' color='primary' className="dropdown-list-titles">Create an Account</BT>
        </Link>
      </li> */}
		</>
	);

	const loggedInDropdown = (
		<>
			<li onClick={handleStudents}>
					{/* <FontAwesomeIcon icon={faIdCard} size="2x" /> */}
					<BT
						variant='subtitle1'
						color='primary'
						className='dropdown-list-titles'
					>
						Students
					</BT>
			</li>
			<li onClick={handleGroups}>
					{/* <FontAwesomeIcon icon={faInfo} size="2x" /> */}
					<BT
						variant='subtitle1'
						color='primary'
						className='dropdown-list-titles'
					>
						Groups
					</BT>
			</li>
			<li onClick={handleSettings}>
					{/* <FontAwesomeIcon icon={faCog} size="2x" /> */}
					<BT
						variant='subtitle1'
						color='primary'
						className='dropdown-list-titles'
					>
						Settings
					</BT>
			</li>
			<li onClick={handleLogout}>
					{/* <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" /> */}
					<BT
						variant='subtitle1'
						color='primary'
						className='dropdown-list-titles'
					>
						Logout
					</BT>
			</li>
		</>
	);

  const displayDropdownList = () => {
    setClicked(!clicked);
    let list = document.getElementById("dropdown-list");
    if (list) {
      if (clicked) {
        list.style.display = "block";
        list.style.visibility = "visible";
      } else {
        list.style.display = "none";
        list.style.visibility = "hidden";
      }
    }
  };

	return (
    <>
		{/* <Slide appear={false} direction='down' in={!trigger}> */}
			<AppBar
      position='static'
				className={`${classes.header}`}
			>
				<ul className='Header-list'>
					<li id='header-title'>
						<img
							className={classes.logo}
							src='https://www.vectorrideshare.com/wp-content/uploads/2020/05/Vector-Logo-Update.png'
							alt='Vector Rideshare'
						/>
					</li>
					<li onClick={() => history.push('/')}>
						<h1 id='header-title'>UniDash</h1>
					</li>
					{showLogin ? notLoggedIn : loggedIn}

					<li
						id='dropdown-waffle'
						className='social-header'
						onClick={displayDropdownList}
					>
						<FontAwesomeIcon icon={faBars} size='2x' />
					</li>
				</ul>
				<ul className={classes.list} id='dropdown-list'>
					{showLogin ? notLoggedInDropdown : loggedInDropdown}
				</ul>
			</AppBar>
		{/* </Slide> */}
    </>
	);
};

export default Header;
