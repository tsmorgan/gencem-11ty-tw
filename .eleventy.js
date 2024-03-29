const dayjs = require("dayjs");
const _ = require("lodash");
const tc = require("title-case");
const relativeTime = require('dayjs/plugin/relativeTime')
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

module.exports = function (config) {

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

    return {
        dir: {
            input: "_site",
            data: "_data",
            includes: "_includes",
            layouts: "_layouts",
            output: "_output",
        }
    };
};