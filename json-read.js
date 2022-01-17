var fs = require('fs');
// JSONファイルを読み込む
var json = fs.readFileSync('test.json', "utf-8");
// JS オブジェクトに変換
var obj = JSON.parse(json);

// item 一覧を表示
var items = obj.items;
for (var i in items) {
	var item = items[i];
	var name = item.name;
	var price = item.price;
	console.log(name, price);
}