const fs = require("fs");
const path = require("path");
const fileController = {};

//d3 node chart needs to read data from a json file. fs system does not work from the front end
fileController.writeToFile = (req, res, next) => {
  const { serviceIds } = req.body;
  console.log("in filecontroller", serviceIds);
  //writing to service.json file in Charts. D3 node chart is set to read from service.json from the same Charts folder
  const filePath = path.resolve(__dirname, "../../src/Chart/service.json");

  //separate service parser function to convert serviceIds array to a format readable by the d3 chart
  function ServiceParser(arrayObj) {
    const serviceJSON = {
      nodes: [],
      links: [],
    };
    arrayObj.forEach((obj) => {
      const serviceArray = obj.serviceIds;
      //each service id needs a unique key so the links can work from service to service (if related)
      serviceArray.forEach((serviceObj, i) => {
        serviceJSON.nodes.push({
          id: `${serviceObj.Name}${i}`,
          name: serviceObj.Type,
        });
        //source needs a "0" unique id as the first item in each serviceObj is the source for the other 2 services
        serviceJSON.links.push({
          source: `${serviceObj.Name}0`,
          target: `${serviceObj.Name}${i}`,
        });
      });
    });
    //convert the dataResults to JSON format before writing to file
    const dataResults = JSON.stringify(serviceJSON);

    //the "w" flag will overwrite whatever is already in the JSON file to update it
    fs.writeFile(filePath, dataResults, { flag: "w" }, (err) => {
      console.log("filePath", filePath);
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data written to file");
      res.locals.writtenServices = dataResults;
      return next();
    });
  }
  ServiceParser(serviceIds);
};
module.exports = fileController;
