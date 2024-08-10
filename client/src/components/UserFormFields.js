import React from 'react';
import { TextField } from '@mui/material';

const UserFormFields = ({ register, errors, clearErrors = () => {} }) => (
    <>
        <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('firstname', {
                required: 'First name is required',
                pattern: {
                    value: /^[A-Za-zא-ת]+$/,
                    message: 'First name contains invalid characters'
                }
            })}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
            onFocus={() => clearErrors('firstname')}
        />
        <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('lastname', {
                required: 'Last name is required',
                pattern: {
                    value: /^[A-Za-zא-ת]+$/,
                    message: 'Last name contains invalid characters'
                }
            })}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
            onFocus={() => clearErrors('lastname')}
        />
        <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('email', {
                required: 'Email is required',
                pattern: {
                    value: /^\S+@\S+$/,
                    message: 'Invalid email address'
                }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            onFocus={() => clearErrors('email')}
        />
    </>
);

export default UserFormFields;
