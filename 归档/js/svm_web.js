var con = "<td><input type='checkbox' class='activate'></td><td style='padding:0 10px;'><input></td><td style='padding:0 10px;'><input></input></td><td><input type='file' class='chengfenbiao'></td><td style='padding:0 10px;'><input class='price'></td><td><a>添加</a></td></tr>";
(function(){
var packDiv = document.getElementById("pack");
var volumeDiv = document.getElementById("volume");
var weightDiv = document.getElementById("weight");
var tasteDiv = document.getElementById("taste");
var tableDiv = document.getElementById("tableDiv");
var arrMap = [],arr = [],arr1 = [];
var packs=packDiv.getElementsByTagName("input"),
    volumes=volumeDiv.getElementsByTagName("input"),
    weights=weightDiv.getElementsByTagName("input"),
    tastes =tasteDiv.getElementsByTagName("input");
packDiv.onclick = volumeDiv.onclick = weightDiv.onclick = tasteDiv.onclick = function(e) {
    e = e.srcElement || e.target;
    if (e.tagName == "INPUT" && e.type == "checkbox") {
        var vC = volumeDiv.childNodes;
        var wC = weightDiv.childNodes;
        var wCFlag = false,vCFlag = false;
        if(e.parentNode.parentNode == volumeDiv){
            if(getChecked(weights).length){
            		alert("重量和容积只能二选一");
                e.checked = false;
            };
        };
        if(e.parentNode.parentNode == weightDiv){
            if(getChecked(volumes).length){
            		alert("重量和容积只能二选一");
                 e.checked = false;
            };
        };
        createTable();
        initHtml(arrMap);
    };
};

function createTable()
{

    var packArr=getChecked(packs),
        volumeArr=getChecked(volumes),
        weightArr=getChecked(weights),
        tasteArr=getChecked(tastes);
        arrMap = [],arr = [];
        zLArr = volumeArr.length?volumeArr:weightArr;
    if (packArr.length == 0) {
        tableDiv.innerHTML = "";
        return;
    };
   
    for (var i = 0; i < packArr.length; i++) {
        arr = [];
        arr.push("<tr><td>" + packArr[i].value + "</td>");
        if (0 == zLArr.length) {
            arr1 = arr.concat("<td></td>");
            showTaste(arr1,tasteArr,arrMap);
        }else {
            for (var j = 0; j < zLArr.length; j++) {
                arr1 = arr.concat("<td>" + zLArr[j].value + "</td>");
                showTaste(arr1,tasteArr,arrMap);
            };
        };
    };
};
 
    function getChecked(inputs) {
        var arr = [];
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                arr.push(inputs[i]);
            };
        };
        return arr;
    };

})();
function initHtml(arrMap){
    var html ="<table border=0 cellspacing=1><tr><td>包装</td><td>容积</td><td>口味</td><td>是否激活</td><td>条形码</td><td>商品编码</td><td>营养成分表</td><td>标价</td><td>图片</td></tr>";
	for(var i in arrMap){
		html += arrMap[i];
	};
	html+="</table>";
    tableDiv.innerHTML=html.replace(/\,/g,"");
};
function showTaste(arr1,tasteArr,arrMap) {
    if (0 == tasteArr.length) {
        arrMap.push(arr1.concat("<td></td>" + con));
    } else {
        for (var k = 0; k < tasteArr.length; k++) {
            arrMap.push(arr1.concat("<td>" + tasteArr[k].value + "</td>" + con));
        };
    };
};
if($(".activate").is(":checked")){
    		console.log(123);
    }
