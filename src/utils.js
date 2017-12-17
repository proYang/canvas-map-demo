//画线段
export function drawLine(ctx, color, x1, y1, x2, y2, lineWidth) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
//画圆
export function drawCircle(ctx, color, x, y, radius) {
    //画一个空心圆
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 360, false);
    ctx.fillStyle = "#fff"; //填充颜色
    ctx.fill(); //画实心圆
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke(); //画空心圆
    ctx.closePath();
}

// 画文字
export function drawMeasureInfo(ctx, x, y, text) {
    ctx.fillStyle = '#fff'
    ctx.fillRect(x + 8, y - 30, 75, 25);
    ctx.strokeStyle = '#eee'
    ctx.strokeRect(x + 8, y - 30, 75, 25)
    ctx.font = '14px Arial';
    ctx.fillStyle = '#0099CC';
    ctx.fillText(text, x + 12, y - 12);
}

// 画用户信息
export function drawPeopleInfo(ctx, x, y, info) {
    ctx.fillStyle = '#fff'
    ctx.fillRect(x + 18, y - 30, 100, 50);
    ctx.strokeStyle = '#eee'
    ctx.strokeRect(x + 18, y - 30, 100, 50)
    ctx.font = '14px Arial';
    ctx.fillStyle = '#0099CC';
    ctx.fillText(`编号：${info.id}`, x + 23, y - 10);
    ctx.fillText(`姓名：${info.name}`, x + 23, y + 10);
}


// 勾股定理算两点距离
export function calculateLength(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export function directPeople(pos, people, r) {
    let peopleIndex
    people.forEach(({
        move
    }, index) => {
        if (move.length <= 0) return
        let peoplePos = move[move.length - 1]
        let pointLength = calculateLength(pos.x, pos.y, peoplePos.x, peoplePos.y)
        if (pointLength < r) peopleIndex = index
    });

    return peopleIndex
}