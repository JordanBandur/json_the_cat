const request = require('request');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = function(url) {
  request(url, (error, response, body) => {
    // Handle network errors and non-200 status codes
    if (error || response.statusCode !== 200) {
      console.error("Failed to fetch data:", error || `Status Code: ${response.statusCode}`);
      return;
    }

    try {
      const data = JSON.parse(body);
      // Check if the data array is non-empty
      if (Array.isArray(data) && data.length > 0) {
        console.log('\n');
        console.log("Description: ", data[0].description);
      } else {
        console.log("No results found for the given breed.");
      }
    } catch (e) {
      // Handle JSON parsing errors
      console.error("Failed to parse JSON response:", e.message);
    }
  });
};

readline.question('What breed of cat were you interested in? ', input => {
  let url = `https://api.thecatapi.com/v1/breeds/search?q=${input}`;
  fetcher(url);
  readline.close();
});


/* fs.writeFile(path, body, err => {
  if (err) {
    console.error(err);
    return;
  }
  if (response.statusCode !== 200) {
    console.error(`Failed to download. Status Code: ${response.statusCode}`);
    return;
  }
  //const size = getFilesizeInBytes(path);
  console.log(`Downloaded and saved ${size} Bytes to ${path}`);
}); */