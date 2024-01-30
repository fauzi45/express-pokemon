const Request = require('axios');
const express = require('express');
const Boom = require('boom');

const app = express();

const commonHttpRequest = async (options) => {
    /*
    Pass options object from function argument as requestConfig for axios api-call.
    See documentation at https://axios-http.com/docs/req_config
    */
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
        uri: `${options.baseURL}${options.url}`
      };
  
      console.log(['commonHttpRequest', 'Response', 'INFO'], logData);
  
      return Promise.resolve(response.data);
    } catch (err) {
      if (err.response) {
        const timeDiff = process.hrtime(timeStart);
        const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
  
        const logData = {
          timeTaken,
          uri: `${options.baseURL}${options.url}`,
          status: err.response.status,
          error: `${err.response.data}`
        };
  
        console.log(['commonHttpRequest', 'Response', 'ERROR'], logData);
      }
  
      return Promise.reject(Boom.badImplementation(err));
    }
  };
  
  module.exports = {
    commonHttpRequest
  };