import { useEffect, useState } from "react"
import { Button, Box, Container } from "@mui/material";
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
          if (!prevState.includes(`'${(map.mapData.paths[index].name)}'`) && isSelected) {
            return (
              [
                ...prevState,
                `'${(map.mapData.paths[index].name)}'`
              ]
            )
          }
          else if (!isSelected) {
            return prevState.filter(country => country !== `'${(map.mapData.paths[index].name)}'`)
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
    <Container>
      <Box
        id="map"
      />
      <Button
        variant="contained"
        onClick={handleClick}
      >
        Click Me
      </Button>
      <LineChart
        chartOpen={chartOpen}
        chartClosed={handleDialogClose}
        coData={coData}
      />
    </Container>
  )
}

const styles = {
  // width: '100%',
  // height: ''
}



export default App
