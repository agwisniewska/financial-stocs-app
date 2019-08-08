const extractCompanyLogoAndDomain = (response) => {
  console.log(response.data[0])
  console.log("TEST")
  if (response && response.data && response.data[0]) {
    return {
      logo: response.data[0].logo,
      domain: response.data[0].domain,
    };
  }
};

export default extractCompanyLogoAndDomain;
