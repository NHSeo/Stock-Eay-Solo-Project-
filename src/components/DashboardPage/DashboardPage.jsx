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
import './DashboardPage.css';

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

  const [lowStockThreshold, setLowStockThreshold] = useState(10);

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEMS' });
  }, [dispatch]);

  const lowStockItems = items.filter(item => item.quantity < lowStockThreshold);

  const chartData = {
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
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Top 10 Most Changed Items</h2>
          <Bar
            data={chartData}
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
          <h2>Low Stock Alert</h2>
          <label>
            Set Low Stock Threshold: 
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(Number(e.target.value))}
            />
          </label>
          {lowStockItems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items are below the low stock threshold.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
