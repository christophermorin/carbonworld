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

  const getYears = () => {
    const years = new Set()
    coData.forEach(entry => {
      years.add(entry.year)
    })
    return Array.from(years)
  }

  const getCountryNames = () => {
    const names = new Set()
    coData.forEach(entry => {
      names.add(entry.country_name)
    })
    return Array.from(names)
  }

  const coValues = (name) => {
    const values = new Set()
    coData.forEach(entry => {
      if (entry.country_name === name) {
        values.add(Math.floor(entry.value))
      }
    })
    return Array.from(values)
  }


  const buildDataSet = () => {
    const countryCount = getCountryNames()
    let dataSets = []
    countryCount.forEach(country => {
      dataSets.push({
        label: country,
        data: coValues(country),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      })
    })
    return dataSets
  }

  const years = getYears()



  const data = {
    labels: years.map(year => year),
    datasets: buildDataSet(),
  };




  return (
    <Dialog
      open={chartOpen}
      onClose={chartClosed}
      sx={{ maxWidth: 'unset' }}
    >
      <Box
        width={'100%'}
      >
        <DialogTitle>Carbon Emissions</DialogTitle>
        <Line data={data} />
      </Box>
    </Dialog >
  )
}