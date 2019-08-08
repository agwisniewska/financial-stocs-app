import axios from "axios";

const API_URL = 'https://autocomplete.clearbit.com/';


const ClearBitService = {
  fetchCompanyLogoAndDomain: (query) => {
    return axios.get(`${API_URL}v1/companies/suggest?query=${query}`);
  },
};

export default ClearBitService;