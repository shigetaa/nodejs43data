var CSV = require('comma-separated-values');
var iconv = require('iconv-lite');
var fs = require('fs');

// CSVデータを読み込む
var txt = fs.readFileSync('data.csv');
// iconv-lite で UTF-8 に変換する
txt = iconv.decode(txt, 'SHIFT_JIS');

// CSVファイルをパースする
var csv = new CSV(txt, { header: true });
var records = csv.parse();

console.log(records);