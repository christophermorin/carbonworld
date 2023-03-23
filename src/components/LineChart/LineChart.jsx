import { Dialog, DialogTitle, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import creatingCoDataCharts from '../../services/countryData';

export default function LineChart({ chartOpen, chartClosed, coData }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  function getYears() {
    const years = new Set()
    for (let entry of coData) {
      years.add(entry.year)
    }
    return Array.from(years)
  }
  const years = getYears()

  const data = {
    labels: years.map(year => year),
    datasets: creatingCoDataCharts(coData)
  };

  const options = {
    indexAxis: 'x',
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'rgba(32,190,190,1)',
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
          lineWidth: 1,
        },
      },
      y: {
        ticks: {
          color: 'rgba(32,190,190,1)',
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
          lineWidth: 1,
        },
      },
    },
    elements: {
      point: {
        pointBackgroundColor: 'rgba(255,0,0,1)',
        pointBorderColor: 'rgba(255,255,255,1)',
        pointBorderWidth: 1,
        radius: 4,
        hoverRadius: 5,
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255,255,255,1)'
        }
      },
    },
  };



  return (
    <Dialog
      open={chartOpen}
      onClose={chartClosed}
      fullWidth
      sx={{
        '.MuiDialog-paper': {
          maxWidth: 'unset'
        },
      }}
    >
      <Box
        width={'100%'}
        sx={{
          background: 'rgba(32,32,34,1)'
        }}
      >
        <DialogTitle sx={{ color: 'rgba(255,255,255,1)' }}>
          Carbon Emissions
        </DialogTitle>
        <Line
          data={data}
          options={options}
        />
      </Box>
    </Dialog >
  )
}