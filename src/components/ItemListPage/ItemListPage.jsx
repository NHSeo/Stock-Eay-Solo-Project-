import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThreshold } from "../../redux/reducers/thresholds.reducer";
import '../ItemListPage/ItemListPage.css';

function ItemListPage() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);
  const thresholds = useSelector((store) => store.thresholds);

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEMS' });
  }, [dispatch]);

  const handleIncrease = (itemId) => {
    const item = items.find(item => item.id === itemId);
    if (item) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
    }
  };

  const handleDecrease = (itemId) => {
    const item = items.find(item => item.id === itemId);
    if (item && item.quantity > 0) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
    }
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

  return (
    <div className="item-list-container">
      <h2>Item List</h2>
      {Object.keys(categorizedItems).map((category) => (
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
          {categorizedItems[category].map((item) => (
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
