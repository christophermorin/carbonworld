export default function creatingCoDataCharts(coData) {
  function getCountryNames() {
    const countryNames = new Set()
    for (let entry of coData) {
      countryNames.add(entry.country_name)
    }
    return Array.from(countryNames)
  }

  function getCountryValues(country) {
    const countryValues = []
    for (let entry of coData) {
      if (entry.country_name === country) {
        countryValues.push(entry.value)
      }
    }
    return countryValues
  }

  function randomLineColors() {
    let colorString = []
    for (let i = 0; i < 3; i++) {
      colorString.push(Math.floor(Math.random(1) * 255))
    }
    return `rgba(${colorString.join(',')})`
  }

  function buildDataSet() {
    const countryCount = getCountryNames()
    let dataSets = []
    for (let country of countryCount) {
      dataSets.push({
        label: country,
        data: getCountryValues(country),
        fill: false,
        borderColor: randomLineColors(),
        tension: 0.1,
      })
    }
    return dataSets
  }
  return buildDataSet()
}
