import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { deleteUser } from '../api/user';
import { useSnackbar } from '../context/SnackbarContext'; 

const DeleteConfirmationDialog = ({ open, user, onClose }) => {
    const showSnackbar = useSnackbar(); 

    const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            showSnackbar('User deleted successfully.', 'success'); 
            onClose(); 
        } catch (error) {
            console.error('Failed to delete user:', error);
            showSnackbar('Failed to delete user. Please try again.', 'error'); 
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {user.firstname} {user.lastname}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
