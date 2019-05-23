//this file is to grab what we need and export to a csv file
const request = require('request');
const cheerio = require('cheerio');
//file system dependency comes with node already
const fs = require('fs');

const writeStream = fs.createWriteStream('post.csv');

//write headers for spreadsheet with an escape for new line
writeStream.write(`Name, Link, Address \n`)

//request url you'd like to scrape here
request('https://tickets.edfringe.com/venues', (error,
  response, html) => {
    if(!error && response.statusCode == 200){
      // check to see that you're getting the html
      // console.log(html);

      // assign a variable to the load call - using dollar sign allows us to use jquery
      const $ = cheerio.load(html);


      $('.venue-details').each((i, el)=>{
        const name = $(el)
        .find('h3')
        .text();

        const link = $(el).find('h3 a').attr('href');

        const address = $(el)
        .find('li')
        .text()
        .replace(/\s\s+/g, '');

        //write row to csv
        writeStream.write(`${name}, ${link}, ${address} \n`);


        // console.log(name, link, address);
      });

      console.log('scraping finished');

    }
});
