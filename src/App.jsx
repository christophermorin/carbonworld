import { useEffect, useState } from "react"
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.css";
import countryServices from "./services/countryServices";

function App() {
  const [regions, setRegions] = useState([])

  console.log(regions)

  useEffect(() => {
    const map = new jsVectorMap({
      selector: "#map",
      regionsSelectable: true,
      regionStyle: {
        selected: { fill: 'red' },
        selectedHover: { fill: 'purple' }
      },
      onRegionSelected: function (index, isSelected, selectedRegions) {
        setRegions(prevState => [...prevState, `'${(map.mapData.paths[index].name)}'`])
      },
    });
  }, [])

  const handleClick = async () => {
    const results = await countryServices.getCountryData(regions)
  }

  return (
    <>
      <button onClick={handleClick}>Click Me</button>
      <div id="map" style={styles}>
      </div>
    </>
  )
}

const styles = {
  width: '100%',
  height: '100vh'
}



export default App
