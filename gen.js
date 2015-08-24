var fs=require("fs");
var gugu=fs.readFileSync("gugu.xml","utf8").split(/\r?\n/);
var entry=[];
var dict="gugu";

var tb="",cn="",batch=1;
var emitdict=function() {
	fs.writeFileSync(dict+batch+".tsv",entry.join("\n"),"utf8");
	var batches=[];
	for (var i=1;i<=batch;i++) batches.push(dict+i+".tsv");
	fs.writeFileSync(dict+".lst",batches.join("\n"),"utf8")
}
for (var i=0;i<gugu.length;i++) {
	var line=gugu[i];
	var tag=line.substr(0,4);
	if (tag==="<tb>") {
		tb=line.substring(4,line.length-5);
		if (tb==="ཀ་ནི་ཥཀ"){
			emitdict();
			batch=1;
			dict="gugutwo";
		}
	} else if (tag==="<cn>") {
		var cn=line.substring(4,line.length-5);
		entry.push(tb+"\t"+cn);
	}
	if (entry.length>2048) {
		fs.writeFileSync(dict+batch+".tsv",entry.join("\n"),"utf8");
		entry=[];
		batch++;
	}
}

emitdict();