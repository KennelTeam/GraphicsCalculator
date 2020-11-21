class point {
    constructor(X, Y) {
        this.x = X;
        this.y = Y;
    }
}
var points = [];
for (var i = -5; i < 5; i += 0.01) {
    points.push(new point(i, Math.sin(i) * 3))
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

function Redraw(pts, minX, minY, SZX, SZY) {
    var cvas = document.getElementById("plot");
    var ctx = cvas.getContext("2d")
    minY *= -1;
    var maxX = minX + SZX;
    var maxY = minY + SZY;
    ctx.beginPath();
    ctx.lineWidth = 1;
    //ctx.strokeStyle = 'silver';
    ctx.font = "7px Verdana";
    for (var i = 0; i < 1; i++) {
        var step = Math.pow(10, i);
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

function setup_drawer() {
    Redraw(points, 0, 1, 1, 1);
}