
function createPdfDeal(client) {
  const formData = new FormData()
  formData.append('keyz', true)

  const serializedData = Object.fromEntries(formData);

    client.request.invoke("getDealPdf",
      { 
        teste: "argu"
      }
    )
    .then(
      function(data) {
        console.log("Server method Request ID is: " + data.requestID);
        console.log("Server method response is: " + data.response);
      }
    ).catch((error) => {
      console.log(error)
    })
}

export default createPdfDeal