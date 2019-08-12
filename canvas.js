var num = 150; //星星数
var star = []; //星星位置
var canvas = document.querySelector("#canvas");

//设置画布宽高为浏览器宽高
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

//获取上下文
var ctx = canvas.getContext("2d");

// 创建星星
for (let i = 0; i < num; i++) {
    star[i] = {
        x: Math.random() * w,
        y: Math.random() * h,
        x0: Math.random() * 0.5 - 0.25,
        y0: Math.random() * 0.5 - 0.25,
    };
    drawStar(star[i].x, star[i].y);
}

//绘制星星
function drawStar(x, y, starSize = 1.5, starColor = "white") {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = starColor;
    ctx.arc(x, y, starSize, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
};

// 定时使星星移动
setInterval(() => {
    move();
}, 13);

//星星移动
function move() {
    ctx.clearRect(0, 0, w, h)
    // 加上长尾效果
    // ctx.fillStyle = 'rgba(0,0,0,0.2)';
    // ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < num; i++) {
        // 当星星到达屏幕边界时, 转换移动方向
        star[i].x0 = star[i].x < 0 || star[i].x > w ? -star[i].x0 : star[i].x0;
        star[i].y0 = star[i].y < 0 || star[i].y > h ? -star[i].y0 : star[i].y0;
        // 使星星移动
        star[i].x += star[i].x0;
        star[i].y += star[i].y0;
        drawStar(star[i].x, star[i].y)
        // 连接相邻的星星
        link(star[i].x, star[i].y)
    }
};

// 连接相邻的星星
function link(centerX, centerY, lineWidth = "0.3", lineColor = "white") {
    for (let i = 0; i < num; i++) {
        // 勾股定理算相邻距离
        var distance = Math.pow(Math.pow((centerX - star[i].x), 2) + Math.pow((centerY - star[i].y), 2), 0.5)
        if (distance < 50) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(star[i].x, star[i].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            ctx.restore();
        }
    }
}


// 监听鼠标移动事件 添加鼠标位置的星星
canvas.addEventListener('mousemove', (e) => {
    // 移动后先将上一次push的star删除掉
    star.pop();
    // 增加一个星星
    num = star.push({
        x: e.clientX,
        y: e.clientY,
        x0: 0,
        y0: 0
    })
    // 连接新增的星星与其附近的星星
    link(e.clientX, e.clientY);
})