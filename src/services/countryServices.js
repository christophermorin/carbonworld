import axios from "axios";

const getCountryData = async (selectedCountries) => {
  let countriesToQuery = `${selectedCountries.join(',')}`

  try {
    const countryData = await axios.post('/api/getData', { query: selectedCountries })
    return countryData.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default { getCountryData }