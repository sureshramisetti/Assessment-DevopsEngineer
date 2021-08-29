"use strict";
const MarketParser = require("market-parser");
const aws = require("aws-sdk");
const moment = require("moment");
exports.handler = async function(event, context, callback) {
  const dateStr = moment(+new Date())
    .format("YYYY-MM-DD");
const s3 = new aws.S3();
  await MarketParser.process(function(body) {
    s3.putObject({
      Body: JSON.stringify(body.ticks),
      Bucket: "exchange-data-raw",
      Key: `${dateAsString}/${body.market}.txt`,
    }, (err, data) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Stored data in S3");
      }
    });
  }, console.error);
  callback();
};
