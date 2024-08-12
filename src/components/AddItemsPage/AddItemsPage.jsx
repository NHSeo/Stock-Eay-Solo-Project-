import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddItemsPage() {
    const [itemName, setItemName] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('Meat');
    const [quantity, setQuantity] = useState(1);
    const [editingItemId, setEditingItemId] = useState(null);
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

    const handleDelete = (itemId) => {
        dispatch({
            type: 'DELETE_ITEM',
            payload: itemId,
        });
    };

    return (
        <div>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="itemName">Item Name:</label>
                    <input
                        type="text"
                        id="itemName"
                        value={itemName}
                        onChange={(event) => setItemName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="note">Note:</label>
                    <input
                        type="text"
                        id="note"
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        required
                    >
                        <option value="Meat">Meat</option>
                        <option value="Veggie">Veggie</option>
                        <option value="Beverage">Beverage</option>
                        <option value="Sauce">Sauce</option>
                        <option value="Rice">Rice</option>
                        <option value="Kitchen tools">Kitchen tools</option>
                        <option value="Supplies">Supplies</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                        required
                        min="0"
                    />
                </div>
                <div>
                    <button type="submit">Add Item</button>
                </div>
            </form>

            <h3>Recently Added Items</h3>
            <ul>
                {items.slice(0, 10).map((item, index) => (
                    <li key={`${item.id}-${index}`}>
                        {editingItemId === item.id ? (
                            <>
                                <strong>Name: </strong>
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleEditChange(item.id, 'name', e.target.value)}
                                />
                                <br />
                                <strong>Category: </strong>
                                <select
                                    value={item.category}
                                    onChange={(e) => handleEditChange(item.id, 'category', e.target.value)}
                                >
                                    <option value="Meat">Meat</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Beverage">Beverage</option>
                                    <option value="Sauce">Sauce</option>
                                    <option value="Rice">Rice</option>
                                    <option value="Kitchen tools">Kitchen tools</option>
                                    <option value="Supplies">Supplies</option>
                                </select>
                                <br />
                                <strong>Quantity: </strong>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleEditChange(item.id, 'quantity', e.target.value)}
                                />
                                <br />
                                <strong>Note: </strong>
                                <input
                                    type="text"
                                    value={item.note}
                                    onChange={(e) => handleEditChange(item.id, 'note', e.target.value)}
                                />
                                <br />
                                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </>
                        ) : (
                            <>
                                <strong>{item.name}</strong> - {item.category} ({item.quantity})
                                <br />
                                Note: {item.note}
                                <br />
                                <button onClick={() => handleEditClick(item.id)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddItemsPage;
