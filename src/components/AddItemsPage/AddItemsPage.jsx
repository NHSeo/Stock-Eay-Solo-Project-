import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';

const colors = {
    primaryBackground: '#F5F5F5',
    primaryText: '#333333',
    accent: '#6B4F4F',
    buttonBackground: '#6B4F4F',
    buttonHover: '#B2958F',
    tableHeaderBackground: '#6B4F4F',
    tableRowOddBackground: '#FAFAFA',
};

const PrimaryButton = styled(Button)({
    borderRadius: '20px',
    padding: '10px 20px',
    width: '200px',
    backgroundColor: colors.buttonBackground,
    color: '#FFFFFF',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: colors.buttonHover,
    },
});

const StyledTextField = styled(TextField)({
    marginBottom: '20px',
    '& label.Mui-focused': {
        color: colors.accent,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: colors.accent,
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: colors.accent,
        },
    },
    '& input': {
        fontWeight: 'bold',
        textAlign: 'left',
    },
});

const StyledTableCell = styled(TableCell)({
    backgroundColor: colors.tableHeaderBackground,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
});

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: colors.tableRowOddBackground,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '& td': {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
        borderRadius: '20px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: colors.primaryBackground,
    },
});

const DialogButton = styled(Button)({
    borderRadius: '20px',
    padding: '10px 20px',
    backgroundColor: colors.buttonBackground,
    color: '#FFFFFF',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: colors.buttonHover,
    },
});

const AddItemsPage = () => {
    const [itemName, setItemName] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('Meat');
    const [quantity, setQuantity] = useState(1);
    const [editingItemId, setEditingItemId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const dispatch = useDispatch();

    const items = useSelector((store) => store.items);

    useEffect(() => {
        dispatch({ type: 'FETCH_ITEMS' });
    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newItem = {
            name: itemName,
            note: note,
            category: category,
            quantity: quantity,
        };

        dispatch({
            type: 'ADD_ITEM',
            payload: newItem,
        });

        setItemName('');
        setNote('');
        setCategory('Meat');
        setQuantity(1);
    };

    const handleEditClick = (itemId) => {
        setEditingItemId(itemId);
    };

    const handleSaveEdit = (itemId) => {
        const editedItem = items.find(item => item.id === itemId);
        if (editedItem) {
            dispatch({
                type: 'EDIT_ITEM',
                payload: editedItem,
            });
            setEditingItemId(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
    };

    const handleEditChange = (itemId, field, value) => {
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, [field]: value } : item
        );
        dispatch({
            type: 'SET_ITEMS',
            payload: updatedItems,
        });
    };

    const handleDeleteClick = (itemId) => {
        setItemIdToDelete(itemId);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = () => {
        dispatch({
            type: 'DELETE_ITEM',
            payload: itemIdToDelete,
        });
        setOpenDialog(false);
        setItemIdToDelete(null);
    };

    const handleDeleteCancel = () => {
        setOpenDialog(false);
        setItemIdToDelete(null);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                ADD NEW ITEM
            </Typography>
            <form onSubmit={handleSubmit}>
                <StyledTextField
                    fullWidth
                    label="Item Name"
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                    margin="normal"
                />
                <StyledTextField
                    fullWidth
                    label="Note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    margin="normal"
                />
                <StyledTextField
                    fullWidth
                    select
                    label="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    SelectProps={{
                        native: true,
                    }}
                    margin="normal"
                >
                    <option value="Meat">Meat</option>
                    <option value="Veggie">Veggie</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Sauce">Sauce</option>
                    <option value="Rice">Rice</option>
                    <option value="Kitchen tools">Kitchen tools</option>
                    <option value="Supplies">Supplies</option>
                </StyledTextField>
                <StyledTextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    margin="normal"
                />
                <Box mt={2} mb={10} display="flex" justifyContent="center">
                    <PrimaryButton type="submit">Add Item</PrimaryButton>
                </Box>
            </form>

            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                RECENTLY ADDED ITEMS
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>NAME</StyledTableCell>
                                <StyledTableCell>NOTE</StyledTableCell>
                                <StyledTableCell>CATEGORY</StyledTableCell>
                                <StyledTableCell>QUANTITY</StyledTableCell>
                                <StyledTableCell>ACTIONS</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.slice(0, 7).map((item) => (
                                <StyledTableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {editingItemId === item.id ? (
                                            <TextField
                                                value={item.name}
                                                onChange={(e) => handleEditChange(item.id, 'name', e.target.value)}
                                                margin="normal"
                                                sx={{ fontWeight: 'bold', textAlign: 'left' }}
                                            />
                                        ) : (
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingItemId === item.id ? (
                                            <TextField
                                                value={item.note}
                                                onChange={(e) => handleEditChange(item.id, 'note', e.target.value)}
                                                margin="normal"
                                                sx={{ fontWeight: 'bold', textAlign: 'left' }}
                                            />
                                        ) : (
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>{item.note}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingItemId === item.id ? (
                                            <TextField
                                                select
                                                value={item.category}
                                                onChange={(e) => handleEditChange(item.id, 'category', e.target.value)}
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                margin="normal"
                                                sx={{ fontWeight: 'bold', textAlign: 'left' }}
                                            >
                                                <option value="Meat">Meat</option>
                                                <option value="Veggie">Veggie</option>
                                                <option value="Beverage">Beverage</option>
                                                <option value="Sauce">Sauce</option>
                                                <option value="Rice">Rice</option>
                                                <option value="Kitchen tools">Kitchen tools</option>
                                                <option value="Supplies">Supplies</option>
                                            </TextField>
                                        ) : (
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>{item.category}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingItemId === item.id ? (
                                            <TextField
                                                value={item.quantity}
                                                type="number"
                                                onChange={(e) => handleEditChange(item.id, 'quantity', e.target.value)}
                                                margin="normal"
                                                sx={{ fontWeight: 'bold', textAlign: 'left' }}
                                            />
                                        ) : (
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>{item.quantity}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingItemId === item.id ? (
                                            <>
                                                <Button variant="contained" onClick={() => handleSaveEdit(item.id)} sx={{ fontWeight: 'bold', backgroundColor: '#b2958f', color: '#FFFFFF', '&:hover': { backgroundColor: '#a17b7b' } }}>
                                                    Save
                                                </Button>
                                                <Button onClick={handleCancelEdit} sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#b2958f' }}>
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    startIcon={<Edit />}
                                                    onClick={() => handleEditClick(item.id)}
                                                    sx={{ fontWeight: 'bold', color: '#a27f78' }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    startIcon={<Delete />}
                                                    onClick={() => handleDeleteClick(item.id)}
                                                    sx={{ fontWeight: 'bold', color: '#707070' }}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <StyledDialog
                open={openDialog}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-confirmation-dialog"
            >
                <DialogTitle id="delete-confirmation-dialog" sx={{ fontWeight: 'bold' }}>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontWeight: 'bold' }}>
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogButton onClick={handleDeleteConfirm}>Yes</DialogButton>
                    <DialogButton onClick={handleDeleteCancel} autoFocus>No</DialogButton>
                </DialogActions>
            </StyledDialog>
        </Container>
    );
}

export default AddItemsPage;
