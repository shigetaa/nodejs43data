# データ形式の基礎知識

Web状には様々なデータが公開されてますが、公開されているデータ形式も様々です。
ここでは、どんなデータフォーマットがあるのかどのようにしてJavaScriptで扱うのか紹介します。

## Web にあるデータ形式

Web上で公開されているデータがすべてJSON形式になったらようのに
多くのJavaScript プログラマーがこの様に思うことでしょう。
JSON形式とはJavaScriptにおけるオブジェクトリテラルの記述方式で、非常に可動性が良いうえに、JavaScriptから扱いやすいと言う特徴があります。

しかしながら、Ｗｅｂにデータを公開している人がすべてJavaScriptプログラマーではありません。
データ形式にも、様々な流行り廃りがあるものです。
一時期、ＸＭＬが流行した頃は、こぞってＸＭＬでデータを公開しましたし、JavaScriptが流行しJSON形式が盛り上がると多くの人が
JSONデータを公開しました。そしてRuby on Rails が流行すると、その設定データとして採用されたYAMLが流行し、多くのデータがYAMLでも書かれるようになりました。
今後も、別の新しいデータ形式が登場するでしょう。
でーたの作成者は、とんなデータを、とんな目的で公開するのかによって、フォーマットを選んでいると思いますが、中には、流行ってるからとか、データ作成に利用したツールが対応しているからと言う理由で選ばれたかもしれません。
幸いなことに、NodeJSでは様々なデータ形式を扱う為のライブラリも存在するので、どのように処理したら良いのか紹介していきます。

## JSON形式とは

初めに、JavaScript から最も扱いやすいデータ形式JSON形式から見て行きましょう。

まずは、配列データの例です。
数値データでは、数値をそのままカンマ区切りで記述できます。

```javascript
[31, 20, 55, 34]
```
文字列データであれば、ダブルコーテーションで囲って記述できます。
```javascript
["apple", "banana", "tomato"]
```
オブジェクトデータの記述は下記の様になります。
```javascript
{
	"id": 1234,
	"name": "Tomato",
	"price": 250,
	"memo": "Fresh & sweet"
}
```
そして、オブジェクトの中に配列を、配列の中にオブジェクトを入れ子に記述することもできます。
```javascript
{
	"group": "vegetable",
	"items": [
		{"name":"Tomato", "price":300},
		{"name":"Banana", "price":170},
		{"name":"Apple", "price":210},
	]
}
```
JavaScript でJSONを扱うのは簡単です。基本的に、JSON形式のデータを`eval()`メソッドで評価すれば、JavaScriptのオブジェクトとして扱うことができるからです。
しかし、セキュリティの観点から現在JSONデータを`eval()`で扱う事はせず、
`JSON.parse()`という専用メソッドが用意されています。

ここでは、以下の`test.json`データを用意して
```javascript
{
	"group": "vegetable",
	"items": [
		{"name":"Tomato", "price":300},
		{"name":"Banana", "price":170},
		{"name":"Apple", "price":210},
	]
}
```
読み込むプログラム`json-read.js`にて表示をしてみます。
```javascript
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
```
プログラムを実行するには以下のコマンドを実行します。
```bash
node json-read.js
```
```javascript
Tomato 300
Banana 170
Apple 210 
```

## JSON5 形式とは

JSON5形式とは、JSON形式の欠点であった以下の点を改良した形式になります。

- データ中にコメントが入力出来ない
- オブジェクトのキーもダブルコーテーションで囲う必要がある
- データの末尾にカンマを書くとパースエラーになる

これらの決定を改良したのが、JSON5形式です。
基本的にはJSONと同じなのですが以下の様に記述することが可能です。
```javascript
// コメントが記述できます。
{
	// キー名をダブルコーテーションで囲う必要が無い
	key: "value",
	// 複数行の文字も「\」で区切って記述可能
	multi_line: "This is a pen.\
	This is a eraser.\
	This is a bookmark.",
	/*
	 * 範囲コメントも記述可能
	 */
	// 16進数も記述可能
	hex_data_sample: 0xC0FFEE,
	// 小数点の 0 を省略可能
	half_sample: .5,
	// 明示的に +/- を記述可能
	data: +94,
	// Infinity や NuN も記述可能
	value_a: Infinity,
	value_b: NaN,
	// 配列末尾にカンマがあっても大丈夫
	items: [
		"apple",
		"banana",
		"tomato",// <= , があっても parse error にならない
	]
}
```

さて、この様に記述したJSON5のデータですが、ほぼJSONと同じ様に、JavaScriptのオブジェクトに変換することができますがライブラリのインストールが必要です。

次のコマンドでライブラリをインストールします。
```bash
npm i json5
```

ライブラリをインストールしたら、次の様にJSONデータを扱うプログラムを書いてみます。

```javascript
// モジュールの読み込み
var JSON5 = require('json5');

// JSON5の利用
var obj = JSON5.parse('[1,2,3,]');
var str = JSON5.stringify(obj);
```

## CSON 形式とは

JSON形式がJavaScriptのオブジェクト記述式を基にしているのに対し、CSON形式は、CoffeeScript のオブジェクト記述式を基にしたデータ形式です。

CoffeeScriptのプラグラムはJavaScriptに変換されて実行されますし、CoffeeScriptはJavaScriptの子供のようなものです。そのため、ざっくり言うとCSONは、JSONの記述式を簡潔にしたものと言えます。

具体的なデータは下記の様になります。
```cson
{
	# 配列の記述
	items: [
		'banana'
		'apple'
		'tomato'
	]
	# オブジェクトの記述
	dog:
		name: 'taro'
		age: 30
	# 複数行のテキストデータも記述可能
	memo: '''
		His name is Taro.
		Taro is 4 years old.
		He is my friend.
		'''
}
```

CSONを操作するには、ライブラリのインストールが必要です。
```bash
npm i cson
```

ライブラリをインストールしたら、次の様にCSONデータを扱うプログラムを書いてみます。

```javascript
// モジュールの読み込み
var JSON5 = require('cson');

// CSON5の利用
var obj = CSON.parse('[1,2,3,]');
var str = CSON.stringify(obj);
```

加えて、CSONをインストールすると、JSONからCSONへの変換、CSONからJSONへの変換を行うコマンドラインツールも利用できるようになります。

例えば以下のコマンドで CSON から JSON 形式に変換ができます。
```bash
cso2json test.cson > test.json
```

## XML / RSS 形式とは

XMLやRSSは、バイナリデータでは無く、テキストデータです。
テキストファイルを利用して編集することができます。
タグによって、データをマークアップすることが出来、タグを入れ子状の階層構造にすることもできます。

以下のXMLの基本工場を表す物です。
```xml
<要素名 属性="属性値">内容</要素名>
```
そして、この要素を異なる要素でグループ化することが出来ます。
これにより要素を階層化することができます。
```xml
<商品グループ type="電子機器">
  <商品 id="s001" price="1500">SDカード</商品>
  <商品 id="1002" price="2000">USBメモリ</商品>
</商品グループ>
```
この様な、XML形式のデータを扱うために、「`xml2js`」「`cheerio`」の様なモジュールを使うとデータを操作しやすくなります。

今回は、CSSセレクタ名みたいな感じで、XMLデータを操作出来る、モジュールとして「`cheerio`」を使用してみます。

### cheerio インストール

以下のコマンドで`cheerio`インストールします。

```bash
npm i cheerio
```
### cheerio で XMLを解析してみる

今回のプログラムを`xml-read.js`と言うファイル名で作成します。

Yahoo!天気予報のRSSファイルをダウンロードしてきて、プログラムで解析出力してみます。
```javascript
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
```
以下のコマンドを実行すると、ダウンロードしたxmlファイルを解析して出力します。

```bash
node xml-read.js
```
```bash
【 18日（火） 大阪（大阪） 】 曇のち晴 - 8℃/2℃ - Yahoo!天気・災害
【 19日（水） 大阪（大阪） 】 曇時々晴 - 7℃/1℃ - Yahoo!天気・災害
【 20日（木） 大阪（大阪） 】 晴時々曇 - 8℃/3℃ - Yahoo!天気・災害
【 21日（金） 大阪（大阪） 】 曇時々晴 - 6℃/1℃ - Yahoo!天気・災害
【 22日（土） 大阪（大阪） 】 晴時々曇 - 8℃/1℃ - Yahoo!天気・災害
【 23日（日） 大阪（大阪） 】 曇時々晴 - 10℃/2℃ - Yahoo!天気・災害
【 24日（月） 大阪（大阪） 】 曇時々雨 - 10℃/4℃ - Yahoo!天気・災害
【 25日（火） 大阪（大阪） 】 曇一時雨 - 11℃/4℃ - Yahoo!天気・災害
【 大阪市 】注意報があります - Yahoo!天気・災害
【 北大阪 】注意報があります - Yahoo!天気・災害
【 東部大阪 】注意報があります - Yahoo!天気・災害
【 南河内 】注意報があります - Yahoo!天気・災害
【 泉州 】注意報があります - Yahoo!天気・災害
```
無事にxml を解析して出力してますが、ダウンロードする手間がありますので、プログラムが直接、xmlファイルを見に行って解析出力するプログラムを作成してみます。

### cheerio-httpcli インストール
上記の`cheerio`モジュールにネットワーク経由でxmlを解析するモジュール`cheerio-httpcli`をインストールしてみます。

以下のコマンドで`cheerio-httpcli`インストールします。

```bash
npm i cheerio-httpcli
```
### cheerio-httpcli で XMLを解析してみる

今回のプログラムを`xml-http.js`と言うファイル名で作成します。

Yahoo!天気予報のRSSファイルをネット経由でプログラムで解析出力してみます。

```javascript
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
```

以下のコマンドを実行すると、ネット経由で通信してxmlを解析して出力します。

```bash
node xml-http.js
```
```bash
【 18日（火） 大阪（大阪） 】 曇のち晴 - 8℃/2℃ - Yahoo!天気・災害
【 19日（水） 大阪（大阪） 】 曇時々晴 - 7℃/1℃ - Yahoo!天気・災害
【 20日（木） 大阪（大阪） 】 晴時々曇 - 8℃/3℃ - Yahoo!天気・災害
【 21日（金） 大阪（大阪） 】 曇時々晴 - 6℃/1℃ - Yahoo!天気・災害
【 22日（土） 大阪（大阪） 】 晴時々曇 - 8℃/1℃ - Yahoo!天気・災害
【 23日（日） 大阪（大阪） 】 曇時々晴 - 10℃/2℃ - Yahoo!天気・災害
【 24日（月） 大阪（大阪） 】 曇時々雨 - 10℃/4℃ - Yahoo!天気・災害
【 25日（火） 大阪（大阪） 】 曇一時雨 - 11℃/4℃ - Yahoo!天気・災害
【 大阪市 】注意報があります - Yahoo!天気・災害
【 北大阪 】注意報があります - Yahoo!天気・災害
【 東部大阪 】注意報があります - Yahoo!天気・災害
【 南河内 】注意報があります - Yahoo!天気・災害
【 泉州 】注意報があります - Yahoo!天気・災害
```

xml 形式の解析の仕方は、`cheerio` と `cheerio-httpcli` は同じなので
解析するファイルの保存場所によって、使い分けるといいでしょう。

## YAML形式とは

YAML(ヤムル)とは、インデントを利用して階層構造を票券するのが特徴のデータ形式です。
テキストデータなので、テキストエディタを用いて編集することができます。
XMLよりシンプルで扱いやすいです。

インデントを用いて階層構造を記述しますが、インデントにはタブが利用出来ず、スペースのみが利用できます。

YAMLの基本は、配列、ハッシュ、スカラ（文字列・数値・真偽値など）です。
配列を表すには、行頭にハイフン「-」をつけます。ハイフンの後には半角スペースが必要です。

```yaml
- banana
- apple
- tomato
```
この時半角スペースでインデントすると、配列中に配列を表現することが出来ます。
ただし、インデントする直前には以下の様に空の要素を入れてください
```yaml
- Yellow
-
  - banana
  - mikan
- Red
-
  - apple
  - strawberry
```
次に、ハッシュの書き方を紹介します。
ハッシュとは、JavaScript のオブジェクトに相当する物で、「キー:値」の形式で記述します。
```yaml
name: tomato
price: 120
color: red
```
こちらもインデントすることで階層構造を表現できます。
```yaml
name: tomato
property:
  price: 120
  color: red
```
配列とハッシュを組み合わせて、複雑なデータを表現できます。
```yaml
- name: tomato
  price: 120
  color: red
  shops:
    - "イオン"
	- "ダイエー"
- name: banana
  price: 200
  color: yellow
  shops:
    - "ローソン"
	- "ファミマ"
```
加えて、YAMLにはフロースタイルが用意されており、これを利用すると、JSONと同じように、配列を、[n1, n2, n3, ...]で表現し、ハッシュを{key1:value1, key2:value2, ...}の様に表現できます。ただしカンマ`,`やコロン`:`の後には半角空白を入れる費用があります。
```yaml
- name: tomato
  price: 120
  color: red
  shops: ["イオン", "ダイエー"]
- name: banana
  price: 200
  color: yellow
  shops: ["ローソン", "ファミマ"]
```
YAMLではコメントを記述することができます。コメントは「`#`」から始めます。
また、複数行の文字列も指定することもできます。
```yaml
# YAMLにはコメントを残す事が可能
multi-line: |
 I like Banana.
 I like Apple.
 I like Tomato.
```
さらに、YAMLではアンカーエイリアスが利用出来ます。

`&name` で印をつけておいて `*name` で参照することが出来ます。

`&name` がアンカーで `*name` がエイリアスです。

例で見てみましょう。以下のYAMLデータでは、冒頭で色を定義し、それ以降の部分で実際に色データを指定してます。
```yaml
# 色を定義
color_define: 
  - &color1 #FF0000
  - &color2 #00FF00
  - &color3 #00FFFF

# 色を記述する
frame_color:
  title: *color1
  logo: *color2
article_color:
  title: *color2
  logo: *color3
```
この様な、YAML形式のデータを扱うために、「`js-yaml`」モジュールを使うとデータを操作しやすくなります。

### js-yaml インストール

以下のコマンドで`js-yaml`インストールします。

```bash
npm i js-yaml
```
### js-yaml で YAMLを解析してみる

YAML形式のデータファイルを`data.yml`と言うファイル名で作成します。

```yaml
title: Fruits Database
version: 1.2
price-define:
  - &one-coin 100
  - &two-coin 200
  - &three-coin 300
items:
  - name: Tomato
    price: *three-coin
  - name: Apple
    price: *two-coin
  - name: Banana
    price: *one-coin

```

YAMLを解析するプログラムを`yaml-read.js`と言うファイル名で作成します。

```javascript
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
```
以下のコマンドを実行すると、YAMLを解析して出力します。

```bash
node yaml-read.js
```
```bash
Tomato 300
Apple 200
Banana 100
```

## INIファイル形式とは



## CSV形式とは


