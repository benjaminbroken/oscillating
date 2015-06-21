$(function(){
    window.plane =  [ [1,-1.5,0], [-1,-1,0.2] ]; // a plane to project to
    window.map = {center:[1.7,3.8], scale: [210,110]}; // if x: 0...100, y: 0...10 then choose scale: {width/100, height/10}

    /*
     Suitable parameters:

     plane = [ [1,-1.5,0], [-1,-1,0.2] ];
     map = {center:[1.6,3.2], scale: [220,100]};

     plane = [ [1.0791, -1.0302, -0.5943], [0.7881, -1.4106, 1.3833] ];
     [ [1.1514, 0.7422, 0.0711], [-0.4062, -1.4186999999999999, -1.032] ]

     [ [-0.0258, 0.6624, 0.039], [-0.534, -0.4107, 0.2205] ]; //


     */

    window.canvas = document.getElementById('mycanvas');
    window.context = canvas.getContext('2d');
    window.step = 0;
    window.density = z[0][0].length - 1;
    window.delta = 1 / density;

    $('#vector1').text( plane[0].join(", ") );
    $('#vector2').text( plane[1].join(", ") );
    context.lineWidth = 1;
    draw_surface(0);

});

function start() {
    step = 0;
    if (window.timer) {
        clearInterval(window.timer);
    }
    window.timer = setInterval(
        function() {
            draw_surface(step);
            step++;
        },
        100
    );
}

function rnd() {
    return (Math.random()-0.5).toFixed(4);
}

function generate_view() {
    window.plane[0] = prod(3, [rnd(), rnd(), rnd()] );
    $('#vector1').text( plane[0].join(", ") );
    window.plane[1] = prod(3, [rnd(), rnd(), rnd()]);
    $('#vector2').text( plane[1].join(", ") );
    step = 0;
    if (window.timer) {
        clearInterval(window.timer);
    }
    draw_surface(0);
}


/**
 * Map point p to the canvas, p is JS array: [x,y].
 */

function mapping(p) {
    var r;
    if (!p) {
        alert("No p");
        return;
    }
    r = {x: (p[0] + map.center[0])*map.scale[0], y: $(canvas).height() - (p[1] + map.center[1])*map.scale[1]};
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
     //		context.strokeText(i, i*$(canvas).width()/10 + 4, $(canvas).height() - 4);
     }
     for (var i=0; i<=10; i++) {
     context.moveTo(0, i*$(canvas).height()/10);
     context.lineTo($(canvas).width(), i*$(canvas).height()/10);
     }
    context.stroke();
    context.beginPath();
    context.strokeStyle = '#009030';

    coo = mapping( projection([0,0,0], plane[0], plane[1]) );
    context.moveTo(coo.x, coo.y);
    coo = mapping( projection([0,1.1,0], plane[0], plane[1]) );
    context.lineTo(coo.x, coo.y);
    context.strokeText('X', coo.x, coo.y);

    coo = mapping( projection([0,0,0], plane[0], plane[1]) );
    context.moveTo(coo.x, coo.y);
    coo = mapping( projection([1.1,0,0], plane[0], plane[1]) );
    context.lineTo(coo.x, coo.y);
    context.strokeText('Y', coo.x, coo.y);

    coo = mapping( projection([0,0,0], plane[0], plane[1]) );
    context.moveTo(coo.x, coo.y);
    coo = mapping( projection([0,0,5], plane[0], plane[1]) );
    context.lineTo(coo.x, coo.y);
    context.strokeText('Z', coo.x, coo.y);


    context.stroke();
}

/**
 * Draw the n-th element of the array of surfaces, see data-3d.js.
 */


function draw_surface(n) {
    var coo, point;
    if ( ! z[n] ) {
        clearInterval(timer);
        return;
    }
    draw_canvas();

    context.strokeStyle = '#0000FF';

    for (var i=0; i<=density; i++) {
        coo = mapping( projection([i*delta, 0, z[n][i][0] ], plane[0], plane[1]) );
        context.beginPath();
        context.moveTo(coo.x, coo.y);
        for (var j=0; j<=density; j++) {
            coo = mapping( projection([i*delta, j*delta, z[n][i][j] ], plane[0], plane[1]) );
            context.lineTo(coo.x, coo.y);
//			$('#status').text(i + ' cycle one ' +j);
//			console.log(coo.x+ ';'+coo.y);
        }
        context.stroke();
    }
    for (var i=0; i<=density; i++) {
        coo = mapping( projection([0, i*delta, z[n][0][i] ], plane[0], plane[1]) );
        context.beginPath();
        context.moveTo(coo.x, coo.y);
        for (var j=0; j<=density; j++) {
            coo = mapping( projection([j*delta, i*delta, z[n][j][i]], plane[0], plane[1]) );
            if (isNaN(coo.x)) {
                alert('isNaN(coo.x ' + i + ' ' + j);
            }
            context.lineTo(coo.x, coo.y);
//			$('#status').text(i + ' cycle two ' +j);
//			console.log(coo.x+ ';'+coo.y);
        }
        context.stroke();
    }
}
