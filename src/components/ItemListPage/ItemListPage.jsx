import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ItemListPage() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEMS' });
  }, [dispatch]);

  const categories = ['Meat', 'Veggie', 'Beverage', 'Sauce', 'Rice', 'Kitchen tools', 'Supplies'];

  return (
    <div>
      <h2>Item List</h2>
      {categories.map(category => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {items
              .filter(item => item.category === category)
              .map(item => (
                <li key={item.id}>
                  <strong>{item.name}</strong> - {item.quantity}
                  <br />
                  Note: {item.note}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ItemListPage;
