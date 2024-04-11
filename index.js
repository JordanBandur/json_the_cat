const { fetchBreedDescription } = require('./breedFetcher');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('What breed of cat were you interested in? ', breed => {
  fetchBreedDescription(breed, (error, description) => {
    if (error) {
      console.error(error);
    } else {
      console.log('\nDescription: ', description);
    }
    readline.close();
  });
});