const ACCURACY = 100;
const EPS = 0.0001;

    function funIntersect(func1, func2, f_rect) {
        var intersects = new Array();
        var x;
        var isLastLower;
        var yf1, yf2;
        var last_yf1 = func1.calculate(f_rect[0]), last_yf2 = func2.calculate(f_rect[0]);
        isLastLower = last_yf1 < last_yf2;
        for (x = f_rect[0]; x < f_rect[0] + f_rect[2]; x += f_rect[2] / ACCURACY) {
            yf1 = func1.calculate(x);
            yf2 = func2.calculate(x);
            if (Math.abs(yf1 - yf2) < EPS)
                intersects[intersects.length] = {x: x, y: yf1};
            else if ((yf1 < yf2) != isLastLower && last_yf1 != last_yf2) {
                var left = x - f_rect[2] / ACCURACY, right = x, mid = x;
                var j = 0;
                while ((Math.abs(func1.calculate(mid) - func2.calculate(x)) > EPS) && (j < 10000)) {
                    mid = (right + left) / 2;
                    if (last_yf1 - last_yf2 > yf1 - yf2)
                        func1.calculate(mid) - func2.calculate(mid) > 0 ? left = mid : right = mid;
                    else
                        func1.calculate(mid) - func2.calculate(mid) > 0 ? right = mid : left = mid;
                    j++;
                }
                if ((Math.abs(func1.calculate(mid) - func2.calculate(x)) < EPS) && (f_rect[1] <= func1.calculate(mid))
                                     && (func1.calculate(mid) <= f_rect[1] + f_rect[3]))
                    intersects[intersects.length] = {x: mid, y: func1.calculate(mid)};
            }
            last_yf1 = yf1;
            last_yf2 = yf2;
            isLastLower = yf1 < yf2;
        }
        return intersects;
    }