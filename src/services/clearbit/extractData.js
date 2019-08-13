import ClearBitService from "./index";

const ClearBitExtractData = {
  extractCompanyLogoAndDomain: (response) => {
    if (response && response.data && response.data[0]) {
      return {
        logo: response.data[0].logo,
        domain: response.data[0].domain,
      };
    }

  },
  addLogoAndDomainToCompany: async (companyData, name) => {
    let logoAndDomainResponse = null;
    let logoAndDomainExtractedData = null;
    try {
      logoAndDomainResponse = await ClearBitService.fetchCompanyLogoAndDomain(name);
      if (logoAndDomainResponse) {
        logoAndDomainExtractedData = ClearBitExtractData.extractCompanyLogoAndDomain(logoAndDomainResponse);
        return {...companyData, ...logoAndDomainExtractedData};
      }
    } catch (e) {
      throw new Error(`Error while login domain requesting ${e}`);
    }
  }
};

export default ClearBitExtractData;
