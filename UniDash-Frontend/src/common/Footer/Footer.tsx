import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { BT } from "mui-bueno";
import { makeStyles } from "@material-ui/styles";
import { Box, CheckboxProps } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { DarkModeProps } from "../../@types";

const Footer = (props: DarkModeProps) => {
  const backgroundColor = grey[900];
  const socialColors = grey[100];

  const useStyles = makeStyles({
    Footer: {
      backgroundColor: backgroundColor,
      padding: "40px",
      color: socialColors,
      textAlign: "center",
      borderTop: '1px solid white',
    },
    socialContainer: {
      color: socialColors,
      padding: "20px",
    },
  });

  const classes = useStyles();

  return (
    <Box className={classes.Footer}>
      <BT variant='subtitle1'>
        Vector Rideshare &copy; 2020
      </BT>
      <BT variant="subtitle2">
        Dark Mode {props.darkToggle}
      </BT>
      <Box paddingTop='10px'>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/VectorRideshare"
          className={classes.socialContainer}
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/VectorRideshare"
          className={classes.socialContainer}
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.twitter.com/RideshareVector"
          className={classes.socialContainer}
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
