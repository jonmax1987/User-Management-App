import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Typography, Paper, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); 
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data) => {
        clearErrors(); 
        setServerError(''); 
        try {
            const response = await loginUser(data);
            if (response.data.status === 'success') {
                login(response.data.token);
                navigate('/users');
            } else if (response.data.status === 'fail') {
                if (response.data.errors) {
                    response.data.errors.forEach((err) => {
                        setError(err.path, { type: 'server', message: err.msg });
                    });
                }
                setServerError(response.data.message);
            } else {
                setServerError('Login failed. Please try again.');
            }
        } catch (error) {
            setServerError(error.response?.data?.message || 'Login failed. Please try again.');
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
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: 'Password is required' })}
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
                        />
                        {serverError && (
                            <Typography color="error" align="center" style={{ marginTop: '10px' }}>
                                {serverError}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                    <Typography align="center" style={{ marginTop: '10px' }}>
                        <Link href="/forgot-password" variant="body2">
                            Forgot Password?
                        </Link>
                    </Typography>
                    <Typography align="center" style={{ marginTop: '10px' }}>
                        <Link href="/register" variant="body2">
                            Don't have an account? Sign up here
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
