import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Typography, Paper, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();

    const onSubmit = async (data) => {
        clearErrors(); 
        setServerError('');
        try {
            const response = await registerUser(data);
    
            if (response.status === 201 && response.data.status === 'success') {
                showSnackbar('Registration successful! Please log in.', 'success');
                navigate('/login');
            } else if (response.status >= 400 && response.status < 500 && response.data.status === 'fail') {
                if (response.data.errors) {
                    response.data.errors.forEach((err) => {
                        setError(err.path, { type: 'server', message: err.msg });
                    });
                }
                setServerError(response.data.message);
            } else {           
                setServerError(response.data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setServerError('Registration failed. Please try again.');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register('firstname', { required: 'First name is required' })}
                            error={!!errors.firstname}
                            helperText={errors.firstname?.message}
                            onFocus={() => clearErrors('firstname')} 
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register('lastname', { required: 'Last name is required' })}
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
                                pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            onFocus={() => clearErrors('email')} 
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onFocus={() => clearErrors('password')} 
                        />
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
