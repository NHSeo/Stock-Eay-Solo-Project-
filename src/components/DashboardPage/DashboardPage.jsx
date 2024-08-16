import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Grid, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, 
  Title,
  Tooltip,
  Legend
);

const borderTextPlugin = {
  id: 'borderText',
  afterDatasetsDraw(chart) {
    if (chart.config.type !== 'bar') return;
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        const fontSize = 14;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeText(value, bar.x, bar.y);
        ctx.fillText(value, bar.x, bar.y);
      });
    });
  },
};

ChartJS.register(borderTextPlugin);

const colors = {
    primaryBackground: '#F5F5F5',
    primaryText: '#333333',
    accent: '#6B4F4F',
    tableHeaderBackground: '#B2958F',
    tableRowOddBackground: '#E2E2E2', 
    cardBackground: '#FAFAFA'
};

const CategoryHeader = styled(Typography)({
    color: colors.accent,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '8px 0',
    fontSize: '1.25rem', 
});

const ItemBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    backgroundColor: colors.tableRowOddBackground,
    borderRadius: '4px',
    marginBottom: '8px',
});

const NoteText = styled(Typography)({
    marginLeft: '16px',
    color: colors.primaryText,
    flex: '1',
    textAlign: 'left',
    fontWeight: 'bold',
});

const DashboardPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);
  const thresholds = useSelector((store) => store.thresholds);

  const [increasedItems, setIncreasedItems] = useState([]);
  const [decreasedItems, setDecreasedItems] = useState([]);
  const [recentlyAddedItems, setRecentlyAddedItems] = useState([]);

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

        const increased = Object.keys(groupedChanges)
          .filter(name => groupedChanges[name] > 0)
          .map(name => ({ name, change: groupedChanges[name] }))
          .slice(0, 5);

        const decreased = Object.keys(groupedChanges)
          .filter(name => groupedChanges[name] < 0)
          .map(name => ({ name, change: groupedChanges[name] }))
          .slice(0, 5);

        setIncreasedItems(increased);
        setDecreasedItems(decreased);
      } catch (error) {
        console.error('Failed to fetch recent changes:', error);
      }
    };

    fetchRecentChanges();
  }, [items]);

  useEffect(() => {
    setRecentlyAddedItems(items.slice(0, 5)); 
  }, [items]);

  const createChartData = (label, data, color) => ({
    labels: data.map((item) => item.name),
    datasets: [
      {
        label,
        data: data.map((item) => item.change),
        backgroundColor: color,
        borderColor: '#F3F3F3',
        borderWidth: 2,
      }
    ]
  });

  const createDoughnutData = (data) => ({
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.quantity), 
        backgroundColor: ['#6B4F4F', '#D3B8AE', '#B2958F', '#E2E2E2', '#333333'], 
        hoverBackgroundColor: ['#6B4F4F', '#D3B8AE', '#B2958F', '#E2E2E2', '#333333']
      }
    ]
  });

  ChartJS.defaults.color = '#000000'; 

  const increaseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 5,
        beginAtZero: true,
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
      x: {
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: +${tooltipItem.raw}`;
          }
        }
      },
      legend: {
        labels: {
          font: {
            weight: 'bold',
          }
        }
      },
    }
  };

  const decreaseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: -5,
        max: 0,
        beginAtZero: true,
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
      x: {
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      },
      legend: {
        labels: {
          font: {
            weight: 'bold',
          }
        }
      },
    }
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      },
      legend: {
        labels: {
          font: {
            weight: 'bold',
          }
        }
      },
    },
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
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'black' }}>
        DASHBOARD
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '350px', backgroundColor: '#FAF9F6' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                RECENTLY INCREASED
              </Typography>
              <div style={{ height: '250px' }}>
                <Bar
                  data={createChartData('Quantity Increase', increasedItems, '#6B4F4F')}
                  options={increaseChartOptions}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '350px', backgroundColor: '#E2E2E2' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                RECENTLY DECREASED
              </Typography>
              <div style={{ height: '250px' }}>
                <Bar
                  data={createChartData('Quantity Decrease', decreasedItems, '#D3B8AE')}
                  options={decreaseChartOptions}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '350px', backgroundColor: '#B2958F' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                RECENTLY ADDED
              </Typography>
              <div style={{ height: '250px' }}>
                <Doughnut
                  data={createDoughnutData(recentlyAddedItems)}
                  options={doughnutChartOptions}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'black', mt: 4 }}>
            LOW STOCK ALERT
          </Typography>
          {Object.keys(categorizedItems).map((category) => {
            const lowStockItems = categorizedItems[category].filter(
              item => item.quantity < (thresholds[category] || 10)
            );

            if (lowStockItems.length === 0) return null;

            return (
              <Box key={category} sx={{ marginBottom: 4 }}>
                <CategoryHeader variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {category}
                </CategoryHeader>
                <Divider sx={{ marginBottom: 2, backgroundColor: '#000000', height: '2px' }} />
                {lowStockItems.map(item => (
                  <ItemBox key={item.id}>
                    <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                    <NoteText sx={{ fontWeight: 'bold' }}>{item.note}</NoteText>
                    <Typography sx={{ fontWeight: 'bold' }}>{item.quantity}</Typography>
                  </ItemBox>
                ))}
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
