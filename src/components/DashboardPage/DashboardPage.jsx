import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../DashboardPage/DashboardPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardPage() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);
  const thresholds = useSelector((store) => store.thresholds);

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEMS' });
  }, [dispatch]);

  const categorizedItems = items.reduce((categories, item) => {
    const category = item.category || 'Uncategorized';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(item);
    return categories;
  }, {});

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Top 10 Most Changed Items</h2>
          <Bar
            data={{
              labels: items.slice(0, 10).map(item => item.name),
              datasets: [
                {
                  label: 'Top 10 Most Changed Items',
                  data: items.slice(0, 10).map(item => item.quantity),
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                }
              ]
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
        
        <div className="dashboard-card">
          <h2>Low Stock Alert by Category</h2>
          {Object.keys(categorizedItems).map((category) => (
            <div key={category} className="category-section">
              <div className="category-title">{category}</div>
              {categorizedItems[category]
                .filter(item => item.quantity < (thresholds[category] || 10))
                .map(item => (
                  <div key={item.id} className="item-card">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">{item.quantity}</span>
                  </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
