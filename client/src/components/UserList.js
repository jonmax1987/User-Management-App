import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api/user';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Container, Paper, Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import EditUserForm from './EditUserForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const loadUsers = async () => {
        try {
            const response = await fetchUsers();
            
            if (response.data.status === 'success') {
                setUsers(response.data.data);
            } else {
                setError(response.data.message || 'Failed to fetch users');
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
            setError('Failed to fetch users');
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditOpen(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setSelectedUser(null);
        loadUsers(); 
    };

    const handleCloseDelete = async () => {
        setIsDeleteOpen(false);
        setSelectedUser(null);
        await loadUsers();
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                User List
            </Typography>
            {error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.firstname}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEditClick(user)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(user)} color="secondary">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {selectedUser && (
                <EditUserForm
                    open={isEditOpen}
                    user={selectedUser}
                    onClose={handleCloseEdit}
                />
            )}

            {selectedUser && (
                <DeleteConfirmationDialog
                    open={isDeleteOpen}
                    user={selectedUser}
                    onClose={handleCloseDelete}
                />
            )}
        </Container>
    );
};

export default UserList;
