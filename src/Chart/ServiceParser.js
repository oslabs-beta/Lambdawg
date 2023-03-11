const fs = require("fs");

//HARD CODED right now - LAMBDA not generating traces, who why
const msServiceIds = [
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

function parseService(arrayObj) {
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

  fs.writeFile("service.json", dataResults, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file");
  });
}
// parseService(msServiceIds);

//have to write to JSON file for d3 iframe chart to read

export default parseService;
