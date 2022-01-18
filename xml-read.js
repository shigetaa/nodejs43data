var fs = require('fs');
var cheerio = require('cheerio');
// XMLファイルを読み込む
var xml = fs.readFileSync("rss-weather-osaka.xml", "utf-8");
// XML ファイルをパースする
$ = cheerio.load(xml);

$("item > title").each(function (idx) {
	var title = $(this).text();
	console.log(title);
});