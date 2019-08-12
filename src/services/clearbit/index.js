import axios from "axios";

const API_URL = process.env.REACT_APP_CLEARBIT_API_URL;

const ClearBitService = {
  fetchCompanyLogoAndDomain: (query) => {
    return axios.get(`${API_URL}v1/companies/suggest?query=${query}`);
  },
};

export default ClearBitService;