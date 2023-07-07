const dayjs = require("dayjs");
const _ = require("lodash");
const tc = require("title-case");
const relativeTime = require('dayjs/plugin/relativeTime')
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

console.log(tc.titleCase("pio"));

module.exports = function (config) {

  // commented out because it's set in /x/x.json
  //
  // config.addGlobalData("date", "git Last Modified");

  // Pass-through images
  config.addPassthroughCopy("./_site/images");

  // Add Date filters
  config.addFilter("date", (dateObj) => {
    return dayjs(dateObj).format("MMMM Do, YYYY");
  });

  config.addFilter("sitemapDate", (dateObj) => {
    return dayjs(dateObj).toISOString();
  });

  config.addFilter("year", () => {
    return dayjs().format("YYYY");
  });

  config.addFilter("titleCase", (str) => {
    return tc.titleCase(str);
  });

  config.addFilter('limit', function(arr, limit) {
    console.log('here');
    return arr.slice(0, limit);
  });

  // commented out because a tag is set in /x/x.json
  //
  // Add pages collection
  // config.addCollection("pages", function (collections) {
  //   return collections.getFilteredByTag("page").sort(function (a, b) {
  //     return a.data.order - b.data.order;
  //   });
  // });

  config.addNunjucksFilter("datawoohoo", function(dateObj)
  {
    // return dayjs(dateObj).format("MMMM D, YYYY");
    return dayjs(dateObj).format("Do MMMM YYYY");
  });


  function myCustomPageNameGenerator(label) {
    let slugify = require('slugify');
    // console.log(slugify(label, {lower:true}));
    return slugify(label, {lower:true});
  }

  let markdownIt = require("markdown-it");
  let wikilinks = require('markdown-it-wikilinks')({
    baseURL: '/x/',
    uriSuffix: '/',
    relativeBaseURL: '/x/',
    postProcessPageName: myCustomPageNameGenerator
  })

  let markdownLib = markdownIt({html:true}).use(wikilinks)

  config.setLibrary("md", markdownLib);

  // console.log(markdownLib.render('Click [[Wiki Links|here]] to learn about [[/Wiki]] links.'));
  // console.log(config);

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
      output: "_output",
    },
  };
};
