import * as React from 'react';
import * as yup from 'yup';

import { PasswordResetRequest } from '../@types';

import {
    Button,
    TextField
} from '@material-ui/core';

import { changePassword } from '../axios/users';
import { useHistory } from 'react-router-dom';

const schema = yup.object<PasswordResetRequest>().shape({
    userEmail: yup.string().email('Must be in email format').required('Email is required'),
    oldPassword: yup.string().required('Old password is required'),
    newPassword: yup.string().required('New password is required'),
});

const Setting: React.FC = () => {

    const history = useHistory();
    
    const [passwordResetRequest, setPasswordResetRequest] = React.useState<PasswordResetRequest>({
        userEmail: '',
        oldPassword: '',
        newPassword: ''
    });

    const [errors, setErrors] = React.useState<any>({});

    const handleChange = (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordResetRequest({ ...passwordResetRequest, [name]: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // prevent component from reloading
      
        schema.validate(passwordResetRequest, {abortEarly: false})
            .then(() => {
                setErrors({});
                changePassword(passwordResetRequest).then(res => {
                    alert(res.data);
                    history.push('/user');
                }).catch(err => {
                    setErrors(err.response.data.editErrors);
                });
            }).catch((err: yup.ValidationError) => {
                const list: any = {};
                for (const e of err.inner) {
                    list[e.path] = e.message;
                }
                setErrors(list);
            });
    }      

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                label="Email"
                fullWidth={true}
                value={passwordResetRequest.userEmail}
                margin="dense"
                variant="outlined"
                onChange={handleChange('userEmail')}
                error={!!errors['userEmail']}
                helperText={errors['userEmail']}
            />
            <TextField
                label="Old Password"
                fullWidth={true}
                value={passwordResetRequest.oldPassword}
                margin="dense"
                variant="outlined"
                type="password"
                onChange={handleChange('oldPassword')}
                error={!!errors['oldPassword']}
                helperText={errors['oldPassword']}
            />
            <TextField
                label="New Password"
                fullWidth={true}
                value={passwordResetRequest.newPassword}
                margin="dense"
                variant="outlined"
                type="password"
                onChange={handleChange('newPassword')}
                error={!!errors['newPassword']}
                helperText={errors['newPassword']}
            />
            
            <hr style={{margin: '20px 0px'}} />

            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </form>
    )
}

export default Setting;
