const extractCompanyLogoAndDomain = (response) => {
  if (response && response.data && response.data[0]) {
    return {
      logo: response.data[0].logo,
      domain: response.data[0].domain,
    };
  }
};

export default extractCompanyLogoAndDomain;
