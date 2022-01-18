var CSV = require('comma-separated-values');
var iconv = require('iconv-lite');
var fs = require('fs');

// CSVデータを読み込む
var txt = fs.readFileSync('data.csv');
// iconv-lite で UTF-8 に変換する
txt = iconv.decode(txt, 'SHIFT_JIS');

// CSVファイルをパースする
var csv = new CSV(txt, { header: false });
var records = csv.parse();
// 1行目はヘッダなので削除する
records.shift();

// データを表示
for (var i = 0; i < records.length; i++) {
	var fs = records[i];
	var name = fs[1];
	var price = fs[2];
	console.log(name, price);
}