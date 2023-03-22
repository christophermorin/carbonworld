import { useEffect, useState } from "react"
import { Button, Box, Container, Typography } from "@mui/material";
import LineChart from "./components/LineChart";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.css";
import countryServices from "./services/countryServices";


//TODO :: correct the whole namespace once it works

function App() {
  const [regions, setRegions] = useState([])
  const [chartOpen, setChartOpen] = useState(false)
  const [coData, setCoData] = useState([])

  useEffect(() => {
    const map = new jsVectorMap({
      selector: "#map",
      regionsSelectable: true,
      regionStyle: {
        selected: { fill: 'red' },
        selectedHover: { fill: 'purple' }
      },
      onRegionSelected: function (index, isSelected, selectedRegions) {
        setRegions((prevState) => {
          if (!prevState.includes(`${(map.mapData.paths[index].name)}%`) && isSelected) {
            return (
              [
                ...prevState,
                `${(map.mapData.paths[index].name)}%`
              ]
            )
          }
          else if (!isSelected) {
            return prevState.filter(country => country !== `${(map.mapData.paths[index].name)}%`)
          }
        })
      },
    });
  }, [])

  //TODO: rename this, button for querying the database
  const handleClick = async () => {
    const results = await countryServices.getCountryData(regions)
    if (results) {
      setChartOpen(true)
      setCoData(results)
    }
  }

  const handleDialogClose = () => {
    setChartOpen(false)
  }
  console.log(regions)
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        height: '90vh'
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        color="rgba(255,255,255,1)"
        sx={{
          background: 'rgba(32,32,34,1)'

        }}
      >
        Carbon World
      </Typography>
      <ul style={{ color: 'rgba(255,255,255,1)' }}>
        <li>Scroll to Zoom</li>
        <li>Hold to drag</li>
        <li>Select a region</li>
        <li>Click button for results</li>
      </ul>
      <Box
        style={{ border: '2px solid rgba(32,32,34,1)' }}
        id="map"
        boxShadow="0 0 10px 2px rgba(32,32,34,1)"
      />
      <LineChart
        chartOpen={chartOpen}
        chartClosed={handleDialogClose}
        coData={coData}
      />
      <Box
        display={'flex'}
        justifyContent="center"
      >
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            background: 'rgba(32,32,34,1)'
          }}
        >
          Click Me
        </Button>

      </Box>
    </Container>
  )
}

const styles = {
  // width: '100%',
  // height: ''
}



export default App
