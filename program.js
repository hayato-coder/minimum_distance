var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const INF = 1000000000;

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
        //     console.log(point_x, point_y)
        }
        var tbl = new Array(10);
            for(let y = 0; y < 10; y++) {
            tbl[y] = new Array(10).fill(0);
        }
        for (var i = 0; i < 10; i++) {
            tbl[i][i] = 1;
        }
        var dic_cost = new Array(10);
            for(let y = 0; y < 10; y++) {
            dic_cost[y] = new Array(10).fill(INF);
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
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    var cost = Math.floor(dist(point[i][0], point[i][1], point[tmp][0], point[tmp][1])/10)+1
                    ctx.font = "20px serif";
                    ctx.fillText(cost, (point[i][0]+point[tmp][0])/2+50, (point[i][1]+point[tmp][1])/2+50);
                    dic_cost[tmp][i] = cost;
                    dic_cost[i][tmp] = cost;
                }
            }
        }
        var cnt = 0;
        var selected_id;
        canvas.addEventListener("click", e => {
            const rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var flag = false;
            var id;
            for (var i = 0; i < 10; i++) {
                if (dist(x-50, y-35, point[i][0], point[i][1]) < 50) {
                    id = i;
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                // alert("駅を選択してください");
                // flag = true;
                console.log("駅を選択してください");
                cnt = 0;
            }　else {
                console.log(x, y);
                if (cnt%2 == 0) {
                    selected_id = id;
                    cnt++;
                    console.log('a');
                } else {
                    // ctx.beginPath();
                    // ctx.moveTo(selected_x, selected_y);
                    // ctx.lineTo(x, y);
                    // ctx.strokeStyle = "red" ;
                    // ctx.lineWidth = 2;
                    // ctx.stroke();
                    // console.log('b');
                    var used = new Array(10).fill(false);
                    var d  = new Array(10).fill(INF);
                    var s = selected_id;
                    d[s] = 0;
                    used[s] = true;
                    for (var k = 0; k < 10; k++) {
                        for (var l = 0; l < 10; l++) {
                            if (dic_cost[s][l] != INF && used[l] == false && d[l] > d[s]+dic_cost[s][l]) {
                                d[l] = d[s]+cost[s][l];
                            }
                        }
                        var dic_id = -1;
                        for (var l = 0; l < 10; l++) {
                            if ((dic_id == -1 || d[l] < d[id]) && used[l] == false) {
                                dic_id = l;
                            }
                        }
                        if (dic_id == l) {
                            break;
                        }
                        used[dic_id] = true;
                        s = dic_id;
                    }

                    ctx.font = "40px serif";
                    ctx.fillText(d[id], point[id][0], point[id][1]);
                    cnt++;
                }
            }
        }, false);
    };
}
