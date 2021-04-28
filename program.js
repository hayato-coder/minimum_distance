var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

window.onload = function() {
    
    function fitCanvasSize() {
      // Canvas のサイズをクライアントサイズに合わせる
      canvas.width = document.documentElement.clientWidth - 10;
      canvas.height = document.documentElement.clientHeight - 10;
    }

    fitCanvasSize();
    window.onresize = fitCanvasSize;
    var img = new Image();
    var w = window.innerWidth - 100;
    var h = window.innerHeight - 100;
    var r = 200;
    var point = [];
    function dist(x1, y1, x2, y2) {
        return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    }
    img.src = 'station.png';
    img.onload = function(){
        for (var i = 0; i < 10; i++){
            while(1) {
                var point_x = Math.random()*w;
                var point_y = Math.random()*h;
                var flag = true;
                for (var j = 0; j < point.length; j++) {
                    if (dist(point_x, point_y, point[j][0], point[j][1]) < r) {
                        flag = false;
                    }
                }
                if (flag) break;
            }
            point.push([point_x, point_y]);
            ctx.drawImage(img, point_x, point_y, 100, 70);
        }
        var tbl = new Array(10);
            for(let y = 0; y < 10; y++) {
            tbl[y] = new Array(10).fill(0);
        }
        for (var i = 0; i < 10; i++) {
            tbl[i][i] = 1;
        }
        function intRandom(min, max){
            return Math.floor( Math.random() * (max - min + 1)) + min;
        }
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var tmp = intRandom(0, 9);
                if (!tbl[tmp][i] && !tbl[i][tmp] && tmp != i && dist(point[i][0], point[i][1], point[tmp][0], point[tmp][1]) < 500) {
                    tbl[tmp][i] = 1;
                    tbl[i][tmp] = 1;
                    ctx.beginPath();
                    ctx.moveTo(point[i][0]+50, point[i][1]+35);
                    ctx.lineTo(point[tmp][0]+50, point[tmp][1]+35);
                    ctx.LineWidth = 10;
                    ctx.stroke();
                    console.log(i, tmp)
                    var cost = Math.floor(dist(point[i][0], point[i][1], point[tmp][0], point[tmp][1])/10)+1
                    ctx.font = "20px serif";
                    ctx.fillText(cost, (point[i][0]+point[tmp][0])/2+50, (point[i][1]+point[tmp][1])/2+50);
                }
            }
        }
    };
}
