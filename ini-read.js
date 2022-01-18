var ini = require('ini');
var fs = require('fs');

// INIデータを読み込む
var txt = fs.readFileSync('data.ini', 'utf-8');

// JavaScript のオブジェクトに変換
var obj = ini.parse(txt);

// データを表示
for (var name in obj) {
	var item = obj[name];
	console.log(name, item.price, item.color);
}