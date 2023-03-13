const fs = require("fs");
const path = require("path");
const fileController = {};

fileController.writeToFile = (req, res, next) => {
  const { serviceIds } = req.body;
  console.log("in filecontroller", serviceIds);
  const filePath = path.resolve(__dirname, "../../src/Chart/service.json");
  const msServiceIdsExample = [
    {
      name: "cakerSixFunction",
      serviceIds: [
        {
          Name: "cakerSixFunction",
          Names: ["cakerSixFunction"],
          Type: "client",
        },
        {
          Name: "cakerSixFunction",
          Names: ["cakerSixFunction"],
          Type: "AWS::Lambda",
        },
        {
          AccountId: "498545057811",
          Name: "cakerSixFunction",
          Names: ["cakerSixFunction"],
          Type: "AWS::Lambda::Function",
        },
      ],
    },
    {
      name: "cakerFiveFunction",
      serviceIds: [
        {
          Name: "cakerFiveFunction",
          Names: ["cakerSixFunction"],
          Type: "client",
        },
        {
          Name: "cakerFiveFunction",
          Names: ["cakerSixFunction"],
          Type: "AWS::Lambda",
        },
        {
          AccountId: "498545057811",
          Name: "cakerFiveFunction",
          Names: ["cakerSixFunction"],
          Type: "AWS::Lambda::Function",
        },
      ],
    },
  ];

  function ServiceParser(arrayObj) {
    const serviceJSON = {
      nodes: [],
      links: [],
    };
    arrayObj.forEach((obj) => {
      //take serviceId array
      const serviceArray = obj.serviceIds;
      serviceArray.forEach((serviceObj, i) => {
        serviceJSON.nodes.push({
          id: `${serviceObj.Name}${i}`,
          name: serviceObj.Type,
        });

        serviceJSON.links.push({
          source: `${serviceObj.Name}0`,
          target: `${serviceObj.Name}${i}`,
        });
      });
    });
    // console.log(serviceJSON.nodes);
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
