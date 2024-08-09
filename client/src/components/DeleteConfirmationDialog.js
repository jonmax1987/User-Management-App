import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { deleteUser } from '../api/user';
import { useSnackbar } from '../context/SnackbarContext'; // ייבוא ה-Snackbar context

const DeleteConfirmationDialog = ({ open, user, onClose }) => {
    const showSnackbar = useSnackbar(); // שימוש בפונקציית ה-Snackbar הגלובלית

    const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            showSnackbar('User deleted successfully.', 'success'); // הצגת הודעת הצלחה
            onClose(); // סגירת הדיאלוג מיד
        } catch (error) {
            console.error('Failed to delete user:', error);
            showSnackbar('Failed to delete user. Please try again.', 'error'); // הצגת הודעת שגיאה
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
