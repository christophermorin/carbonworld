import { useEffect, useState } from "react"
import { Box, Container } from "@mui/material";
import jsVectorMap from "jsvectormap";
import Header from "./components/Header/Header";
import Steps from "./components/Instruct/Steps";
import SubmitButton from "./components/Submit/SubmitButton";
import LineChart from "./components/LineChart/LineChart";
import Footer from "./components/Footer/Footer";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.css";
import countryServices from "./services/countryServices";

function App() {
  const [regions, setRegions] = useState([])
  const [chartOpen, setChartOpen] = useState(false)
  const [coData, setCoData] = useState([])

  useEffect(() => {
    const map = new jsVectorMap({
      selector: "#map",
      regionsSelectable: true,
      regionStyle: {
        selected: { fill: 'rgba(32,190,190,1)' },
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

  const handleSubmit = async () => {
    const results = await countryServices.getCountryData(regions)
    if (results) {
      setChartOpen(true)
      setCoData(results)
    }
  }

  const handleDialogClose = () => {
    setChartOpen(false)
  }

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
      <Header />
      <Steps />
      <SubmitButton handleSubmit={handleSubmit} />
      <Box
        id="map"
        border="2px solid rgba(32,32,34,1)"
        boxShadow="0 0 10px 2px rgba(32,32,34,1)"
      />
      <LineChart
        chartOpen={chartOpen}
        chartClosed={handleDialogClose}
        coData={coData}
      />
      <Footer />
    </Container>
  )
}

export default App
