const request = require('request');
const cheerio = require('cheerio');

//request url you'd like to scrape here
request('https://tickets.edfringe.com/venues', (error,
  response, html) => {
    if(!error && response.statusCode == 200){
      // check to see that you're getting the html
      // console.log(html);

      // assign a variable to the load call - using dollar sign allows us to use jquery
      const $ = cheerio.load(html);

      const venueDetails = $('.venue-details');
      // console.log(venueDetails);

      //this gives us all the html
      // console.log(venueDetails.html());

      //this gives us all the text
      // console.log(venueDetails.text());

      //we can also use the .find variable to grab specific content in the DOM
      const output = venueDetails.find('h3').text();
      // console.log(output);

      // loop through each element in a list and grab the text
      $('.venue-details h3 a').each((i, el) => {
        const venueName = $(el).text();

        // loop through each element in a list and grab the link (a tag)
        const venueLink =$(el).attr('href');

        // console.log(venueName);
        console.log(venueLink);
      });

    }
});
