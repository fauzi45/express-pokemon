const Request = require("axios");
const express = require("express");
const Boom = require("boom");

const app = express();

const commonHttpRequest = async (options) => {
  const timeStart = process.hrtime();
  try {
    const requestConfig = {};
    Object.entries(options).forEach(([key, value]) => {
      requestConfig[key] = value;
    });

    const response = await Request.request(requestConfig);

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    const logData = {
      timeTaken,
      status: response && response.status,
      uri: `${options.baseURL}${options.url}`,
    };

    console.log(["commonHttpRequest", "Response", "INFO"], logData);

    return Promise.resolve(response.data);
  } catch (err) {
    if (err.response) {
      const timeDiff = process.hrtime(timeStart);
      const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

      const logData = {
        timeTaken,
        uri: `${options.baseURL}${options.url}`,
        status: err.response.status,
        error: `${err.response.data}`,
      };

      console.log(["commonHttpRequest", "Response", "ERROR"], logData);
    }

    return Promise.reject(Boom.badImplementation(err));
  }
};

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

module.exports = {
  commonHttpRequest,
  isPrime
};
