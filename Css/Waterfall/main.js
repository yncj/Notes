/**
 * Created by 11499 on 2018/4/10.
 */
window.onload=function () {
    waterfall('main','box');
    var dateInt={"date":[{"scr":"1.jpg"},{"scr":"2.jpg"},{"scr":"3.jpg"},{"scr":"4.jpg"},{"scr":"5.jpg"},{"scr":"1.jpg"}]}
    window.onscroll=function () {
        if(checkScrollSlide){
            var oParent =document.getElementById("main")
            //将数据块渲染到当前页面的尾部
            for(var i=0;i<dateInt.date.length;i++){
                var oBox =document.createElement('div');
                oBox.className="box";
                oParent.appendChild(oBox);
                var oPic=document.createElement("div");
                oPic.className="pic";
                oBox.appendChild(oPic);
                var oImg =document.createElement("img");
                oImg.src="images/"+dateInt.date[i].scr;
                oPic.appendChild(oImg);
            }
            waterfall("main","box")
        }
    }
}

function waterfall(parent, box) {
    //将main下的所有class为box的元素取出来
    var oParent =document.getElementById(parent);
    var oBoxs=getClass(oParent,box);
    //计算整个页面显示的列数
    var oBoxW=oBoxs[0].offsetWidth,
        cols = Math.floor(document.documentElement.clientWidth/oBoxW)
    //设置main的宽度
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
    var hArry=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArry.push(oBoxs[i].offsetHeight);
        }else {
            var minH=Math.min.apply(null,hArry);
            var index=getMinhIndex(hArry,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            oBoxs[i].style.left=oBoxW*index+'px';
            hArry[index]+=oBoxs[i].offsetHeight;
        }
    }
}

//获取class为box的元素
function getClass(parent, className) {
    var boxArr=new Array(),
        oElements=parent.getElementsByTagName('*');
    for(var i=0;i<oElements.length;i++){
        if (oElements[i].className==className){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

//获取数组最小值得索引
function getMinhIndex(arr, val) {
    for(var i in arr){
        if (arr[i]==val){
            return i;
        }
    }
}

//检测是否加载数据块的条件
function checkScrollSlide() {
    var oParent=document.getElementById('main'),
        oBox =getClass(oParent,'box');
    var lastBoxH =oBoxs[oBox.length-1].offsetTop;
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var height =document.body.clientHeight||document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;
}

