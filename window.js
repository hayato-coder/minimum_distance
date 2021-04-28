window.onload = function() {
    var canvas = document.getElementById("my_canvas");
    var ctx = canvas.getContext("2d");

    function fitCanvasSize() {
      // Canvas のサイズをクライアントサイズに合わせる
      canvas.width = document.documentElement.clientWidth - 10;
      canvas.height = document.documentElement.clientHeight - 10;
    }

    fitCanvasSize();
    window.onresize = fitCanvasSize;
  }