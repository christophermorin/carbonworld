import axios from "axios";

const getCountryData = async (selectedCountries) => {
  try {
    const countryData = await axios.post('/api/getData', { query: selectedCountries })
    return countryData.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default { getCountryData }