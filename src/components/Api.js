 fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  headers: {
    authorization: "81ee6d99-9b3c-40e0-aeb8-7f9ed65e18da"
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });