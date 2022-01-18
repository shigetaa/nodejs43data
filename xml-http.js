var fs = require('fs');
var cheerio = require('cheerio-httpcli');
// XMLファイルを読み込むURL
var url = "https://rss-weather.yahoo.co.jp/rss/days/6200.xml";

// XML ファイルをHTTP経由で取得してパースする
cheerio.fetch(url, {}, function (err, $, res) {
	$("item > title").each(function (idx) {
		var title = $(this).text();
		console.log(title);
	});
});
