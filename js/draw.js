$(function(){
    window.canvas = document.getElementById('mycanvas');
    window.context = canvas.getContext('2d');
    window.step = 0;
    context.lineWidth = 1;
    draw_line(0);
});

function start() {
    window.timer = setInterval(
        function() {
            draw_line(step);
            step++;
        },
        50
    );
}
/**
 * Map point p to the canvas, p is JS array: [x,y].
 */
function mapping(p) {
    var map = {center:[0,0], scale: [6,60]}; // if x: 0...100, y: 0...10 then choose scale: {width/100, height/10}
    var r;
    if (!p) {
        alert("No p");
        return;
    }
    r = {x: (p[0] + map.center[0])*map.scale[0] , y: 0.5*$(canvas).height() - (p[1] + map.center[1])*map.scale[1]};
    return r;
}

function draw_canvas() {
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, $(canvas).width(), $(canvas).height());
    context.strokeStyle = '#909090';
    context.beginPath();
    for (var i=0; i<=10; i++) {
        context.moveTo(i*$(canvas).width()/10, 0);
        context.lineTo(i*$(canvas).width()/10, $(canvas).height());
        context.textStyle = '#00FF00';
        context.strokeText(i, i*$(canvas).width()/10 + 4, $(canvas).height() - 4);
    }
    for (var i=0; i<=10; i++) {
        context.moveTo(0, i*$(canvas).height()/10);
        context.lineTo($(canvas).width(), i*$(canvas).height()/10);
    }
    context.stroke();
}

/**
 * Draw the n-th element of lines_arr, see array.js.
 */
function draw_line(n) {
    var coo, point;
    if ( ! lines_arr[n] ) {
        clearInterval(timer);
        return;
    }
    draw_canvas();

    context.strokeStyle = '#0000FF';
    context.beginPath();
    coo = mapping( [ 0, lines_arr[n][0] ] );
    context.moveTo(coo.x, coo.y);
    for (var i=1; i<=100; i++) {
        coo = mapping( [ i, lines_arr[n][i] ] );
        context.lineTo(coo.x, coo.y);
    }
    context.stroke();
}