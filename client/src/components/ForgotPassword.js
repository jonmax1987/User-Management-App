import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const ForgotPassword = () => {
    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Forgot Password
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        This page is currently under construction and will be available soon. 
                        Please check back later.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;
