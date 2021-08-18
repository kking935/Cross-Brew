import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";
import { Box, Checkbox } from "@material-ui/core";
import "./App.css";

import NotFound from "./common/routes/routes";
import LoginRoute from "./common/routes/LoginRoute";
import ProtectedRoute from "./common/routes/ProtectedRoute";

import Header from "./common/Header/Header";
import Footer from "./common/Footer/Footer";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import CreateAccount from "./components/CreateAccount";
import UserDetail from "./components/User/UserDetail";
import GroupSearchPage from "./components/Group/GroupSearchPage";
import Settings from "./components/Settings/Settings";
import UserSearchPage from "./components/User/UserSearchPage";
import Setting from "./components/Settings";
import GroupsList from "./components/Group/GroupList";
import GroupDetail from "./components/Group/GroupDetail";

const useStyles = makeStyles({
  page: {
    maxWidth: "80vw",
    margin: "50px 10vw 100px",
    minHeight: "90vh",
  },
  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
  },
});

export const useOtherStyles = makeStyles({
  textField: {
    background: grey[100]
  },
  banner: {
    textAlign: "center",
  },
  info: {
    textAlign: "center",
  },
  buttonBar: {
    margin: "30px 0px 10px 0px",
  },
  hrDivider: {
    margin: "15px 0px 30px 0px",
  },
  secret: {
    padding: "50px 0px 0px 0px",
    fontStyle: "italic",
    fontSize: "12px",
    textAlign: "center",
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  const [darkState, setDarkState] = useState(false);
  const secondaryColor = darkState ? grey[300] : grey[300];
  const primaryTextColor = darkState ? grey[100] : grey[900];
  const secondaryTextColor = darkState ? grey[900] : grey[900];
  const defaultBackgroundColor = darkState ? grey[900] : "whitesmoke";

  const darkTheme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: defaultBackgroundColor,
      },
      text: {
        primary: primaryTextColor,
        secondary: secondaryTextColor,
      },
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const darkCheckbox = (
    <Checkbox
      style={{ backgroundColor: "whitesmoke", marginLeft: "10px" }}
      color="default"
      checked={darkState}
      onChange={handleThemeChange}
    />
  );

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header darkMode={darkState} darkToggle={darkCheckbox} />
        <Box className={classes.page}>
          <Switch>
            <Route exact path="/" component={About} />
            <LoginRoute exact path="/Login" component={Login} />
            <Route exact path="/create-account" component={CreateAccount} />
            
            <ProtectedRoute exact path="/Students" component={UserSearchPage} />
            <ProtectedRoute
              exact
              path="/Students/details/:email"
              component={UserDetail}
            />
            <ProtectedRoute exact path="/Groups" component={GroupSearchPage} />            
            <ProtectedRoute
              exact
              path="/Groups/details/:name"
              component={GroupDetail}
            />

            <Route exact path='/Settings' component={Settings} />
            <Route exact path='/Setting' component={Setting} />

            <Route component={NotFound} />
          </Switch>
        </Box>
        <Footer darkMode={darkState} darkToggle={darkCheckbox} />
      </ThemeProvider>
    </>
  );
};

export default App;
