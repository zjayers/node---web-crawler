const axios = require("axios");
const cheerio = require("cheerio");
const colors = require("colors");

const visitedLinks = [];

const searchForLinks = (url) => {
  if (visitedLinks.indexOf(url) === -1) {
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          logVisitedLink(url);
          const html = response.data;
          const $ = cheerio.load(html);
          const links = $("a"); //jquery get all hyperlinks
          $(links).each(function (i, link) {
            const href = $(link).attr("href");
            searchForLinks(href);
          });
        }
      })
      .catch((err) => {
        //ignore
      });
  }
};

const logVisitedLink = (url) => {
  visitedLinks.push(url);
  console.log(`Visited: ${url}`.yellow);
};

searchForLinks("https://www.galvanize.com");

