import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { createUser } from '../api/user';
import { useSnackbar } from '../context/SnackbarContext';
import UserFormFields from './UserFormFields';

const AddUserForm = ({ open, onClose }) => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm(); 
    const [serverError, setServerError] = useState('');
    const showSnackbar = useSnackbar();

    const onSubmit = async (data) => {
        clearErrors(); 
        setServerError('');
        try {
            const response = await createUser(data);

            if (response.data.status === 'success') {
                showSnackbar('User added successfully!', 'success');
                reset(); 
                onClose();
            } else if (response.data.status === 'fail') {
                response.data.errors?.forEach(err => setError(err.path, { type: 'server', message: err.msg }));
                setServerError(response.data.message);
            } else {
                setServerError('Creation failed. Please try again.');
            }
        } catch (error) {
            setServerError('Creation failed. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add User</DialogTitle>
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
                            Add User
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddUserForm;
