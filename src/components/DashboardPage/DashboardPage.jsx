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
import axios from 'axios';
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

    const [recentChanges, setRecentChanges] = useState([]);

    useEffect(() => {
        dispatch({ type: 'FETCH_ITEMS' });
    }, [dispatch]);

    useEffect(() => {
        const fetchRecentChanges = async () => {
            try {
                const response = await axios.get('/api/items/recent-changes');

                const groupedChanges = response.data.reduce((acc, item) => {
                    if (acc[item.name]) {
                        acc[item.name] += item.change;
                    } else {
                        acc[item.name] = item.change;
                    }
                    return acc;
                }, {});

                const processedChanges = Object.keys(groupedChanges)
                    .map(name => ({
                        name,
                        change: groupedChanges[name]
                    }));

                setRecentChanges(processedChanges);
            } catch (error) {
                console.error('Failed to fetch recent changes:', error);
            }
        };

        fetchRecentChanges();
    }, [items]);

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
                    <h2>Recent Item Changes</h2>
                    <Bar
                        data={{
                            labels: recentChanges.map(item => item.name),
                            datasets: [
                                {
                                    label: 'Quantity Change',
                                    data: recentChanges.map(item => item.change),
                                    backgroundColor: recentChanges.map(item => item.change > 0 ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)'),
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 2,
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            scales: {
                                y: {
                                    min: -5,
                                    max: 5,
                                    beginAtZero: false,
                                    ticks: {
                                        callback: function (value) {
                                            return value > 0 ? `+${value}` : value;
                                        }
                                    }
                                }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return `${tooltipItem.label}: ${tooltipItem.raw > 0 ? '+' : ''}${tooltipItem.raw}`;
                                        }
                                    }
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
