import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';
import { updateUser } from '../api/user';

const EditUserForm = ({ open, user, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm();
    const [serverError, setServerError] = useState('');

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
                onClose();
            } else if (response.data.status === 'fail') {
                if (response.data.errors) {
                    response.data.errors.forEach((err) => {
                        setError(err.path, { type: 'server', message: err.msg });
                    });
                }
                setServerError(response.data.message);
            } else {                
                setServerError('Update failed. Please try again.');
            }
        } catch (error) {
            console.error('Failed to update user:', error);
            setServerError('Update failed. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        fullWidth
                        {...register('firstname', { 
                            required: 'First name is required', 
                            pattern: {
                                value: /^[A-Za-zא-ת]+$/,
                                message: 'First name contains invalid characters'
                            }
                        })}
                        error={!!errors.firstname}
                        helperText={errors.firstname?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        {...register('lastname', { 
                            required: 'Last name is required', 
                            pattern: {
                                value: /^[A-Za-zא-ת]+$/,
                                message: 'Last name contains invalid characters'
                            }
                        })}
                        error={!!errors.lastname}
                        helperText={errors.lastname?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/,
                                message: 'Invalid email address',
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
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
