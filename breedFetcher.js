const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  let url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
  request(url, (error, response, body) => {
    // Handle network errors and non-200 status codes
    if (error || response.statusCode !== 200) {
      return callback("Failed to fetch data: " + (error || `Status Code: ${response.statusCode}`), null);
    }

    try {
      const data = JSON.parse(body);
      // Check if the data array is non-empty
      if (Array.isArray(data) && data.length > 0) {
        callback(null, data[0].description);
      } else {
        callback("No results found for the given breed.", null);
      }
    } catch (e) {
      // Handle JSON parsing errors
      callback("Failed to parse JSON response: " + e.message, null);
    }
  });
};

module.exports = { fetchBreedDescription };