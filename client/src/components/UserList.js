import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api/user';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Container, Paper, Alert, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import EditUserForm from './EditUserForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import AddUserForm from './AddUserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

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

    const handleAddClick = () => {
        setIsAddOpen(true);
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

    const handleCloseAdd = () => {
        setIsAddOpen(false);
        loadUsers(); 
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                User List
            </Typography>
            {error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleAddClick}
                        style={{ marginBottom: '20px' }}
                    >
                        Add User
                    </Button>
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
                </>
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

            <AddUserForm
                open={isAddOpen}
                onClose={handleCloseAdd}
            />
        </Container>
    );
};

export default UserList;
