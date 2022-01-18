var yaml = require('js-yaml');
var fs = require('fs');

// YAMLデータを読み込む
var txt = fs.readFileSync('data.yml', 'utf-8');

// JavaScript のオブジェクトに変換
var obj = yaml.load(txt);

// データを表示
for (var i in obj.items) {
	var item = obj.items[i];
	console.log(item.name, item.price);
}