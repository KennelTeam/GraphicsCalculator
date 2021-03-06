class point {
    constructor(X, Y) {
        this.x = X;
        this.y = Y;
    }
}

function gen_points(func, down, up) {
    var data = new Array();
    for (var i = down; i < up; i += 0.01) {
        data.push(new point(i, func.calculate(3.5)));
        console.log(i);
    }
    return data;
}

function Scale(pnt, minX, minY, maxX, maxY, plot) {
    var szx = maxX - minX;
    var szy = maxY - minY;
    var pltx = plot.width - 2;
    var plty = plot.height - 2;
    return new point(x = (pnt.x - minX) * (pltx / Math.max(szx, 0.01)) + 1,
        y = (-pnt.y - minY) * (plty / Math.max(szy, 0.01)) + 1)
}

function mod(A, B) {
    return A - Math.floor(A / B);
}

function Redraw(func, minX, minY, SZX, SZY) {
    var cvas = document.getElementById("plot");
    var ctx = cvas.getContext("2d")
    ctx.clearRect(0, 0, cvas.width, cvas.height);
    minY *= -1;
    var maxX = minX + SZX;
    var maxY = minY + SZY;
    pts = gen_points(func, minX, maxX);
    console.log("Points: " + pts);
    ctx.beginPath();
    ctx.lineWidth = 1;
    //ctx.strokeStyle = 'silver';
    ctx.font = "7px Verdana";
    var step = Math.pow(10, Math.max(Math.floor(Math.log10(SZX)), Math.floor(Math.log10(SZY))));
    for (var XX = maxX + step - maxX % step; XX >= minX; XX -= step) {
        ctx.beginPath()
        if (XX == 0) {
            ctx.strokeStyle = 'black';
        } else {
            ctx.strokeStyle = 'silver';
        }
        var pltx = cvas.width - 2;
        var gX = (XX - minX) * pltx / (maxX - minX);
        ctx.moveTo(gX + 1, 0);
        ctx.fillText(Math.round(XX), gX + 2, cvas.height);
        ctx.lineTo(gX + 1, cvas.height)
        ctx.stroke()
    }
    for (var XX = maxY + step - maxY % step; XX >= minY; XX -= step) {
        ctx.beginPath()
        if (XX == 0) {
            ctx.strokeStyle = 'black';
        } else {
            ctx.strokeStyle = 'silver';
        }
        var pltx = cvas.height - 2;
        var gX = (XX - minY) * pltx / (maxY - minY);
        ctx.moveTo(0, gX + 1);
        ctx.fillText(-Math.round(XX), 2, gX);
        ctx.lineTo(cvas.width, gX + 1)
        ctx.stroke()
    }
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    var pt = Scale(pts[0], minX, minY, maxX, maxY, cvas);
    ctx.moveTo(pt.x, pt.y);
    for (var i = 1; i < pts.length; i++) {
        var pt = Scale(pts[i], minX, minY, maxX, maxY, cvas);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
    }
    ctx.closePath();
}