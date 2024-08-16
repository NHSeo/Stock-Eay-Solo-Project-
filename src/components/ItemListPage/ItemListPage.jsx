import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { styled } from '@mui/system';
import { setThreshold } from "../../redux/reducers/thresholds.reducer";

const StyledTextField = styled(TextField)({
    marginBottom: '20px',
    '& label.Mui-focused': {
        color: '#333333',
        fontWeight: 'bold',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#333333',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#333333',
        },
    },
    '& input': {
        fontWeight: 'bold',
        color: '#333333',
    },
});

const StyledTableCell = styled(TableCell)({
    backgroundColor: '#6B4F4F',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
});

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FAFAFA',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '& td': {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const CategoryContainer = styled(Box)({
    marginBottom: '40px',
});

const ThresholdInput = styled(StyledTextField)({
    marginBottom: '20px',
});

const ItemListPage = () => {
    const dispatch = useDispatch();
    const items = useSelector((store) => store.items);
    const thresholds = useSelector((store) => store.thresholds);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch({ type: 'FETCH_ITEMS' });
    }, [dispatch]);

    const handleIncrease = (itemId) => {
        dispatch({ type: 'INCREASE_ITEM_QUANTITY', payload: itemId });
    };

    const handleDecrease = (itemId) => {
        dispatch({ type: 'DECREASE_ITEM_QUANTITY', payload: itemId });
    };

    const handleThresholdChange = (category, value) => {
        dispatch(setThreshold(category, value));
    };

    const categorizedItems = items.reduce((categories, item) => {
        const category = item.category || 'Uncategorized';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(item);
        return categories;
    }, {});

    const filteredItems = Object.keys(categorizedItems).reduce((filtered, category) => {
        const itemsInCategory = categorizedItems[category].filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (itemsInCategory.length > 0) {
            filtered[category] = itemsInCategory;
        }
        return filtered;
    }, {});

    return (
        <Container maxWidth="md">
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                ITEM LIST
            </Typography>
            <StyledTextField
                fullWidth
                label="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {Object.keys(filteredItems).map((category) => (
                <CategoryContainer key={category}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#6B4F4F' }}>
                        {category}
                    </Typography>
                    <ThresholdInput
                        fullWidth
                        label={`Set Low Stock Threshold for ${category}`}
                        type="number"
                        value={thresholds[category] || ''}
                        onChange={(e) => handleThresholdChange(category, Number(e.target.value))}
                    />
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>NAME</StyledTableCell>
                                        <StyledTableCell>NOTE</StyledTableCell>
                                        <StyledTableCell>QUANTITY</StyledTableCell>
                                        <StyledTableCell>ACTIONS</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredItems[category].map((item) => (
                                        <StyledTableRow key={item.id}>
                                            <TableCell>
                                                <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{ fontWeight: 'bold' }}>{item.note}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{ fontWeight: 'bold' }}>{item.quantity}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" justifyContent="center">
                                                    <Button
                                                        startIcon={<Add />}
                                                        onClick={() => handleIncrease(item.id)}
                                                        sx={{ 
                                                            fontWeight: 'bold', 
                                                            marginRight: '10px',
                                                            color: '#a27f78', 
                                                        }}
                                                    >
                                                        INCREASE
                                                    </Button>
                                                    <Button
                                                        startIcon={<Remove />}
                                                        onClick={() => handleDecrease(item.id)}
                                                        sx={{ 
                                                            fontWeight: 'bold', 
                                                            color: '#707070', 
                                                        }}
                                                    >
                                                        DECREASE
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Divider sx={{ marginTop: '40px' }} />
                </CategoryContainer>
            ))}
        </Container>
    );
}

export default ItemListPage;
