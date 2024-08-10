import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { updateUser } from '../api/user';
import { useSnackbar } from '../context/SnackbarContext';
import UserFormFields from './UserFormFields';

const EditUserForm = ({ open, user, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm();
    const [serverError, setServerError] = useState('');
    const showSnackbar = useSnackbar();

    useEffect(() => {
        if (user) {
            reset({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        clearErrors(); 
        setServerError(''); 
        try {
            const response = await updateUser(user.id, data);

            if (response.data.status === 'success') {
                showSnackbar('User updated successfully.', 'success');
                onClose();
            } else if (response.data.status === 'fail') {
                response.data.errors?.forEach(err => setError(err.path, { type: 'server', message: err.msg }));
                setServerError(response.data.message);
            } else {                
                setServerError('Update failed. Please try again.');
            }
        } catch (error) {
            setServerError('Update failed. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UserFormFields register={register} errors={errors} clearErrors={clearErrors} />
                    {serverError && (
                        <Typography color="error" align="center" style={{ marginTop: '10px' }}>
                            {serverError}
                        </Typography>
                    )}
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserForm;
