var WINDOW_HEIGHT=589,
    WINDOW_WIDTH=1000,
    RADIUS=5,
    MARGIN_LEFT=80,
    MARGIN_TOP=60;

var curShowTimeSeconds=0;

var balls=[];
const colors=["#33B5E5","#0099CC","AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function () {
    //获取到画布
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");

    //设置画布大小
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;


    curShowTimeSeconds=getCurShowTimeSeconds();

    //定时刷新屏幕时间达到时钟效果
    setInterval(function () {
        render(context);
        update();
    },50)
};

function render(cxt) {
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=parseInt(curShowTimeSeconds%60);

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+8*(RADIUS+6),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+16*(RADIUS+6),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+20*(RADIUS+6),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+28*(RADIUS+6),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+36*(RADIUS+6),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+40*(RADIUS+6),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+48*(RADIUS+6),MARGIN_TOP,parseInt(seconds%10),cxt);

    for (var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }

    console.log(balls.length);
}

function renderDigit(x,y,num,cxt) {
    cxt.fillStyle="rgb(0,102,153)";

    for (var i=0;i<digit[num].length;i++){
        for (var j=0;j<digit[num][i].length;j++){
            if (digit[num][i][j]===1){
                cxt.beginPath();
                cxt.arc(x+j*(RADIUS+6)+(RADIUS+6),y+i*(RADIUS+6)+(RADIUS+6),RADIUS,0,2*Math.PI,true);
                cxt.closePath();
                cxt.fill();
                // console.log(digit[num][i][j])
        }
    }
}

}

function getCurShowTimeSeconds() {
    var curTime = new Date();
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();

    return ret;
}

function update() {
    var nextShowTimeSeconds=getCurShowTimeSeconds();
    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=parseInt(nextShowTimeSeconds%60);

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds=parseInt(curShowTimeSeconds%60);

    if (nextSeconds!=curSeconds){
        if (parseInt(nextHours/10)!=parseInt(curHours/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(nextHours/10));
        }
        if (parseInt(nextHours%10)!=parseInt(curHours%10)){
            addBalls(MARGIN_LEFT+8*(RADIUS+6),MARGIN_TOP,parseInt(nextHours%10));
        }
        if (parseInt(nextMinutes/10)!=parseInt(curMinutes/10)){
            addBalls(MARGIN_LEFT+20*(RADIUS+6),MARGIN_TOP,parseInt(nextMinutes/10));
        }
        if (parseInt(nextMinutes%10)!=parseInt(curMinutes%10)){
            addBalls(MARGIN_LEFT+28*(RADIUS+6),MARGIN_TOP,parseInt(nextMinutes%10));
        }
        if (parseInt(nextSeconds/10)!=parseInt(curSeconds/10)){
            addBalls(MARGIN_LEFT+40*(RADIUS+6),MARGIN_TOP,parseInt(nextSeconds/10));
        }
        if (parseInt(nextSeconds%10)!=parseInt(curSeconds%10)){
            addBalls(MARGIN_LEFT+48*(RADIUS+6),MARGIN_TOP,parseInt(nextSeconds%10));
        }
        curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls()
}

function addBalls(x,y,num,) {
    for(var i=0;i<digit[num].length;i++){
        for (var j=0;j<digit[num][i].length;j++){
            if (digit[num][i][j]===1){
                var ball={
                    x:x+j*2*(RADIUS+6)+(RADIUS+6),
                    y:y+i*2*(RADIUS+6)+(RADIUS+6),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*100))*4,
                    vy:-5,
                    color:colors[Math.floor((Math.random()*colors.length))]
                };

                balls.push(ball);
            }
        }
    }

    var cont=0;
    for (var i=0;i<balls.length;i++){
        if (balls[i].x<WINDOW_WIDTH-RADIUS&&balls[i].x+RADIUS>=0) {
            balls[cont++]=balls[i];
        }
    }

    while (cont<balls.length){
        balls.pop();
    }
}

function updateBalls() {
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