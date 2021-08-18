import * as React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import {
  BButtonBar,
  BEmail,
  BForm,
  BPassword,
  BReset,
  BSubmit,
  BT,
  BTextField,
} from "mui-bueno";
import { CreateGroupRequest, CreateUserRequest } from "../@types";
import { createNewUser, createUser } from "../axios/users";
import { useHistory } from "react-router-dom";
import { useOtherStyles } from "../App";
import { createNewGroup } from "../axios/groups";

const CreateAccount: React.FC = () => {
  const globalClasses = useOtherStyles();
  const history = useHistory();

  const initialValues: CreateUserRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    collegeId: "",
    phoneNumberCode: "",
    phoneNumber: ""
  };

  const initialValuesGroup: CreateGroupRequest = {
    name: "",
  };

  const handleSubmit = (newUser: CreateUserRequest) => {
    console.log(newUser);
    console.log(JSON.stringify(newUser));
    createNewUser(newUser)
      .then((res) => {
        console.log("in hereee");
        alert("Account successfully created!");
        history.push("/login");
      })
      .catch((err: any) => {
        alert(err.response.data.message);
        console.log("ERROR: ", err.response.data.message);
      });
    console.log("end");
  };

  const handleSubmitGroup = (newGroup: CreateGroupRequest) => {
    console.log(newGroup);
    console.log(JSON.stringify(newGroup));
    createNewGroup(newGroup)
      .then((res) => {
        alert("Group successfully created!");
      })
      .catch((err: any) => {
        alert(err.response.data.message);
        console.log("ERROR: ", err.response.data.message);
      });
    console.log("end");
  };

  return (
    <>
      <BT className={globalClasses.banner} variant="h4" color="textPrimary">
        Create an Account
      </BT>
      <BT
        className={globalClasses.info}
        variant="subtitle2"
        color="textPrimary"
      >
        This page is for development purposes only and won't be included in
        production.
      </BT>
      <hr className={globalClasses.hrDivider} />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <BForm>
          <BTextField required full name="firstName" placeholder="First Name" />
          <BTextField required full name="lastName" placeholder="Last Name" />
          <BEmail required full name="email" placeholder="Email" />
          <BPassword required full name="password" placeholder="Password" />
          <BTextField required full name="collegeId" placeholder="College ID" />
          <BTextField required full name="phoneNumberCode" placeholder="Phone Number Area Code" />
          <BTextField required full name="phoneNumber" placeholder="Phone Number" />
          
          <BButtonBar className={globalClasses.buttonBar} spacing={2}>
            <BReset locationInButtonBar="left" name="cancel" color="secondary">
              Reset
            </BReset>
            <BSubmit locationInButtonBar="right" color="primary" name="submit">
              Create Account
            </BSubmit>
          </BButtonBar>
        </BForm>
      </Formik>

      <BT className={globalClasses.banner} variant="h4" color="textPrimary">
        Create an Account
      </BT>
      <BT
        className={globalClasses.info}
        variant="subtitle2"
        color="textPrimary"
      >
        This page is for development purposes only and won't be included in
        production.
      </BT>
      <hr className={globalClasses.hrDivider} />

      <Formik
        initialValues={initialValuesGroup}
        onSubmit={handleSubmitGroup}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <BForm>
          <BTextField required full name="name" placeholder="Group Name" />
          <BButtonBar className={globalClasses.buttonBar} spacing={2}>
            <BReset locationInButtonBar="left" name="cancel" color="secondary">
              Reset
            </BReset>
            <BSubmit locationInButtonBar="right" color="primary" name="submit">
              Create Account
            </BSubmit>
          </BButtonBar>
        </BForm>
      </Formik>
    </>
  );
};

export default CreateAccount;
