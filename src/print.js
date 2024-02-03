const express = require("express");
const Fingerprint = require("express-fingerprint");

const app = express();

const port = 3000;

app.use(
  Fingerprint({
    parameters: [
      // Defaults
      Fingerprint.useragent,
      Fingerprint.acceptHeaders,
      Fingerprint.geoip,

      // Additional parameters
      function (next) {
        // ...do something...
        next(null, {
          param1: "value1",
        });
      },
      function (next) {
        // ...do something...
        next(null, {
          param2: "value2",
        });
      },
    ],
  })
);

app.get("*", (req, res) => {
  console.log(req.fingerprint);
  res.send("sucess");
});

app.listen(port, () => {
  console.log("listenig at port:", port);
});
