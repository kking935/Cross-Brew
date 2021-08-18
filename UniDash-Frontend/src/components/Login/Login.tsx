import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import {
  BButtonBar,
  BEmail,
  BForm,
  BPassword,
  BReset,
  BSubmit,
  BT,
} from "mui-bueno";
import { LoginRequest } from "../../@types";
import { loginUser } from "../../axios/login";
import { loginSuccess } from "../../modules/login-reducer";
import axiosInstance from "../../axios/axios-instance";
import { useOtherStyles } from "../../App";
import { Link } from "@material-ui/core";

const Login: React.FC = () => {
  const globalClasses = useOtherStyles();
  const history = useHistory();
  const dispatcher = useDispatch();

  const initialValues: LoginRequest = {
    email: "",
    password: "",
  };

  const handleSubmit = (loginRequest: LoginRequest) => {
    console.log(loginRequest);
    loginUser(loginRequest)
      .then((res) => {
        axiosInstance.defaults.headers.common.Authorization =
          "Bearer " + res.data.token;
        dispatcher(loginSuccess(res.data));
        localStorage.setItem("token", res.data.token);
        history.push("/Students");
      })
      .catch((err: any) => {
        alert(err.response.data.message);
        console.log("ERROR: ", err.response.data.message);
      });
  };

  return (
    <>
      <BT className={globalClasses.banner} variant="h4" color="textPrimary">
        Login
      </BT>
      <BT
        className={globalClasses.info}
        variant="subtitle2"
        color="textPrimary"
      >
        Sign in to your Vector Rideshare University account.
      </BT>
      <hr className={globalClasses.hrDivider} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <BForm>
          <BEmail
            required
            full
            name="email"
            placeholder="Email"
            className={globalClasses.textField}
          />
          <BPassword
            required
            full
            name="password"
            placeholder="Password"
            className={globalClasses.textField}
            textFieldProps={{
              color: 'primary',
            }}
          />
          <BButtonBar className={globalClasses.buttonBar} spacing={2}>
            {/* <BReset locationInButtonBar="left" name="cancel" color="secondary">
              Reset
            </BReset> */}
            <BSubmit locationInButtonBar="right" color="primary" name="submit">
              Login
            </BSubmit>
          </BButtonBar>
        </BForm>
      </Formik>
      {/* <BT variant="subtitle2" className={globalClasses.secret}>
        Forgot your password? <br />{" "}
        <Link href="https://VectorRideshare.com">
          Reset Password
        </Link>
      </BT> */}
    </>
  );
};

export default Login;
