const fs = require("fs");
const router = require("express").Router();
router
  .route("/config/put")
  // to create new resources
  .post(function (req, res, next) {
    const data = JSON.stringify(req.body);
    if(req.body.appName && req.body.appSubName && req.body.automationCandidates){
          fs.writeFile(process.cwd() + "/assets/json/config.json", data, err => {
            if (err) {
                res.writeHead(404);
                res.end(
                  JSON.stringify(
                    `Error: Could not write to: ${
                      process.cwd() + "/assets/json/config.json"
                    }`
                  )
                );
            } else {
                res.writeHead(200);
                res.end(data);
            }
          });
    }
  });

router
  .route("/config/patch")
  // to create new resources
  .post(function (req, res, next) {
    const data = req.body;
    fs.readFile(
        process.cwd() + "/assets/json/config.json",
        function (err, data) {
          if (err) {
            res.writeHead(404);
            res.end(
              JSON.stringify(
                `Error: Could not read: ${
                  process.cwd() + "/assets/json/config.json"
                }`
              )
            );
            return;
          }
          if(data.length > 0){
            data.forEach(configItem => {
                const key = configItem.key;
                const value = configItem.value;
                if(key && key != ""){
                    const keyArray = key.split('.');
                    keyArray.forEach(element => {
                        
                    });
                }
            });
          }
          res.writeHead(200);
          res.end(data);
        }
      );
  });

router
  .route("/config/get")
  // to retrieve a single resource
  .get(function (req, res, next) {
    fs.readFile(
      process.cwd() + "/assets/json/config.json",
      function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(
            JSON.stringify(
              `Error: Could not read: ${
                process.cwd() + "/assets/json/config.json"
              }`
            )
          );
          return;
        }
        res.writeHead(200);
        res.end(data);
      }
    );
  });
module.exports = router;
