var WINDOW_HEIGHT=589,
    WINDOW_WIDTH=1000,
    MARGIN_LEFT=80,
    MARGIN_TOP=60,
    RADIUS=6;

var curShowTimeSeconds;  //定义一个变量来保存需求的倒计时的时间差值

var balls=[];    //声明一个数组，来保存当前页面需要渲染的小球个数

const colors=["#33B5E5","#0099CC","AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"] //小球的颜色

//.当文档内容完全加载完成会触发该事件
window.onload=function () {
    //获取画布
    var canvas=document.getElementById("canvas"),
        context=canvas.getContext("2d");

    //设置画布大小
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    curShowTimeSeconds=getCurShowTimeSeconds();  //获取当前时间


    setInterval(function () {
        render(context); //渲染页面
        update();  //变更数据
    },100);


};

//渲染页面
function render(cxt) {
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours=parseInt(curShowTimeSeconds/3600),   //获取当前小时
        minutes=parseInt((curShowTimeSeconds-hours*3600)/60), //获取当前分钟
        seconds=parseInt(curShowTimeSeconds%60);  //获取当前秒钟

    //分别渲染出小时、分钟、秒钟
    renderDigit(cxt,MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
    renderDigit(cxt,MARGIN_LEFT+(RADIUS+6)*8,MARGIN_TOP,parseInt(hours%10));
    renderDigit(cxt,MARGIN_LEFT+(RADIUS+6)*16,MARGIN_TOP,10);
    renderDigit(cxt,MARGIN_LEFT+(RADIUS+6)*20,MARGIN_TOP,parseInt(minutes/10));
    renderDigit(cxt,MARGIN_LEFT+(RADIUS+6)*28,MARGIN_TOP,parseInt(minutes%10));
    renderDigit(cxt,MARGIN_LEFT+(RADIUS+6)*36,MARGIN_TOP,10);
    renderDigit(cxt,MARGIN_LEFT+(RADIUS+6)*40,MARGIN_TOP,parseInt(seconds/10));
    renderDigit(cxt,MARGIN_LEFT+(RADIUS+6)*48,MARGIN_TOP,parseInt(seconds%10));

    for (var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }

    console.log(balls.length)
}
//渲染出小球的方法
function renderDigit(cxt,x,y,num,){
    cxt.fillStyle="rgb(0,102,153)";

    for (var i=0;i<digit[num].length;i++){
        for (var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]===1){
                cxt.beginPath();
                cxt.arc(x+j*(RADIUS+6)+(RADIUS+6),y+i*(RADIUS+6)+(RADIUS+6),RADIUS,0,2*Math.PI,true);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}

//获取当前时间
function getCurShowTimeSeconds() {
    var curTime= new Date();   //获取当前时间
    var ret =curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();      //获取当前时间一共多少秒
    return ret;
}

//数据变化时所发生的函数
function update() {
    var nextShowTimeSeconds=getCurShowTimeSeconds(),
        nextHours=parseInt(nextShowTimeSeconds/3600),  //获取当前小时
        nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60), //获取当前分钟
        nextSeconds=parseInt(nextShowTimeSeconds%60);   //获取当前秒钟

    var curHours=parseInt(curShowTimeSeconds/3600),
        curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60),
        curSeconds=parseInt(curShowTimeSeconds%60);

    if (nextSeconds!==curSeconds){
        if(parseInt(nextHours/10)!=parseInt(curHours/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(nextHours/10))
        }
        if(parseInt(nextHours%10)!=parseInt(curHours%10)){
            addBalls(MARGIN_LEFT+8*(RADIUS+6),MARGIN_TOP,parseInt(curHours%10))
        }
        if(parseInt(nextMinutes/10)!=parseInt(curMinutes/10)){
            addBalls(MARGIN_LEFT+20*(RADIUS+6),MARGIN_TOP,parseInt(curMinutes/10))
        }
        if(parseInt(nextMinutes%10)!=parseInt(curMinutes%10)){
            addBalls(MARGIN_LEFT+28*(RADIUS+6),MARGIN_TOP,parseInt(curMinutes%10))
        }
        if(parseInt(nextSeconds/10)!=parseInt(curSeconds/10)){
            addBalls(MARGIN_LEFT+40*(RADIUS+6),MARGIN_TOP,parseInt(curSeconds/10))
        }
        if(parseInt(nextSeconds%10)!=parseInt(curSeconds%10)){
            addBalls(MARGIN_LEFT+48*(RADIUS+6),MARGIN_TOP,parseInt(curSeconds%10))
        }
        curShowTimeSeconds=nextShowTimeSeconds;
    }

    updataBalls();

}

//时间变化 小球散开后开始计算小球个数
function addBalls(x,y,num) {
    for (var i=0;i<digit[num].length;i++){
        for (var j = 0; j < digit[num][i].length;j++){
            if(digit[num][i][j]===1){
                var ball={
                    x:x+j*2*(RADIUS+6)+(RADIUS+6),
                    y:y+i*2*(RADIUS+6)+(RADIUS+6),
                    g:2.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*100))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };

                balls.push(ball);
            }
        }
    }

    var cont=0;
    for (var i=0;i<ball.length;i++){
       if (balls[i].x<WINDOW_WIDTH-RADIUS&&balls[i].x+RADIUS>=0){
           balls[cont++]=balls[i];
       }
    }

    // while (cont<balls.length){
    //     balls.pop();
    // }
}

//随着时间变化，每个小球的X,Y轴位置
function updataBalls() {
    for (var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;

        if (balls[i].y>WINDOW_HEIGHT-RADIUS){
            balls[i].y=WINDOW_HEIGHT-RADIUS;
            balls[i].vy=balls[i].vy*-0.75;
        }
    }
}