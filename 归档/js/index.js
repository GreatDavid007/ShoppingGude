function rd(packArr,weightArr,tasteArr){
	if(packArr.length == 0){	
		return;
	};
	var pl=packArr.length;
	var wl=weightArr.length;
	var tl=tasteArr.length;
	var maxlength = Math.max.apply(null,[pl,wl,tl]);
	var tarr = [];
	
	for (i=0;i<maxlength;i++){
		var arr = [];
		if(pl){
			arr.push(packArr.shift());
		}else{
			arr.push("");
		};
		if(wl){
			arr.push(weightArr.shift());
		}else{
			arr.push("");
		};
		if(tl){
			arr.push(tasteArr.shift());
		}else{
			arr.push("");
		};
		tarr.push(arr);
	}
		return tarr;
};