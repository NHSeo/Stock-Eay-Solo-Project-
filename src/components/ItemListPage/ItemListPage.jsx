import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThreshold } from "../../redux/reducers/thresholds.reducer";
import '../ItemListPage/ItemListPage.css';

function ItemListPage() {
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
        <div className="item-list-container">
            <h2>Item List</h2>
            <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            {Object.keys(filteredItems).map((category) => (
                <div key={category} className="category-section">
                    <h3 className="category-title">{category}</h3>
                    <label className="threshold-input">
                        Set Low Stock Threshold:
                        <input
                            type="number"
                            value={thresholds[category] || ''}
                            onChange={(e) => handleThresholdChange(category, Number(e.target.value))}
                        />
                    </label>
                    {filteredItems[category].map((item) => (
                        <div key={item.id} className="item-card">
                            <span className="item-name">{item.name}</span>
                            <span className="item-note">{item.note}</span>
                            <span className="item-quantity">{item.quantity}</span>
                            <div className="button-group">
                                <button onClick={() => handleDecrease(item.id)}>-</button>
                                <button onClick={() => handleIncrease(item.id)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ItemListPage;
