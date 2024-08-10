import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Typography, Paper, Link } from '@mui/material';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';
import UserFormFields from './UserFormFields';
import PasswordField from './PasswordField';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();

    const onSubmit = async (data) => {
        setServerError('');
        try {
            const response = await registerUser(data);

            if (response.status === 201 && response.data.status === 'success') {
                showSnackbar('Registration successful! Please log in.', 'success');
                navigate('/login');
            } else if (response.status >= 400 && response.status < 500 && response.data.status === 'fail') {
                response.data.errors?.forEach(err => setError(err.path, { type: 'server', message: err.msg }));
                setServerError(response.data.message);
            } else {
                setServerError(response.data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setServerError('Registration failed. Please try again.');
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <UserFormFields register={register} errors={errors} />
                        <PasswordField register={register} errors={errors} />
                        {serverError && (
                            <Typography color="error" align="center">
                                {serverError}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </form>
                    <Typography align="center" style={{ marginTop: '10px' }}>
                        <Link href="/login" variant="body2">
                            Already have an account? Login here
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
