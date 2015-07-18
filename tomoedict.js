/*
	convert to MOEDICT format

	體例： 

	199299	སྐམ་ཐག་ཆོད་པ	同 སྐམ་ཀྲོག་གེ。

	199275	སྐན或རེ་སྐན	〔副〕非；决不；决非(赌咒词)。如说：决没有(ཡོད་རེ་སྐན)，决不是(ཡིན་རེ་སྐན)。

	200330	ཁ་ཞེ་མཐུན་པ亦作ཁ་ཞེ་མེད་པ	〔语〕心口一致，心口如一。


	未處理 體例
*/

var wylie=require("tibetan/wylie");
var fs=require("fs");
var content=fs.readFileSync("gugu.xml","utf8");
var wylie=require("tibetan/wylie");

var dump=function() {
	var title="",moe=[];
	content.replace(/<([tc][bn])>([^<]+?)<\//g,function(m,m1,m2){
		if (m1=="tb") {
			title=wylie.toWylie(m2);
		} else if (m1=="cn") {
			moe.push({"heteronyms":{"definitions":[{"def":m2}]},title:title});
		}
	});
	return moe;
}

fs.writeFileSync("gugu.json",JSON.stringify(dump(),""," "),"utf8");
console.log("write to gugu.json");