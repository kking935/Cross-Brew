import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, ModalProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

export type ConfirmDialogProps = {
    title: string,
    message: string,
    open: boolean,
    onClose: any
}

const useStyles = makeStyles({
    dialog: {
    },
	dialogTitle: {
        color: 'black',
        textAlign: 'center',
        margin: '0px 5vw 10px',
        borderBottom: '1px solid black',
    },
    dialogContent: {
        margin: '0px 3vw 0px',
    },
})

const ConfirmDialog = (props: ConfirmDialogProps) => {
    const classes = useStyles();

	return (
		<>
			<Dialog
				open={props.open}
				onClose={props.onClose}
				aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                className={classes.dialog}
			>
				<DialogTitle className={classes.dialogTitle}>
					{props.title}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<DialogContentText>
						{props.message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.onClose} variant='contained' color='secondary'>
						Cancel
					</Button>
					<Button onClick={props.onClose} variant='contained' color='primary' autoFocus>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConfirmDialog