/**
 * Created by Капитан on 13.05.2015.
 */

var lines_arr = [];
for (var k = 0; k<= 200; k++) {
    lines_arr[k] = [];
}

$(document).ready(function () {
    var global;
    $('ul li input').on('click', function(){
        var id = $(this).attr('id'),
            f, mu1, mu2, u0, u1, obj;
        switch (id) {
            case 'task1':
                f = function(x, t) {return 0;};
                mu1 = function(t) {return 0;};
                mu2 = function(t) {return 0;};
                u0 = function(x) {return 0;};
                u1 = function(x) {return 0;};
                break;
            case 'task2':
                f = function(x, t) {return 0;};
                mu1 = function(t) {return Math.sin(t);};
                mu2 = function(t) {return Math.sin(t+1);};
                u0 = function(x) {return Math.sin(x);};
                u1 = function(x) {return Math.cos(x);};
                break;
            case 'task3':
                f = function(x, t) {return -22.5*Math.pow(Math.PI,2)*Math.cos(2*Math.PI*(0.5*x-2*t)+1);};
                mu1 = function(t) {return 1.5*Math.cos(1-t*4*Math.PI);};
                mu2 = function(t) {return -1.5*Math.cos(1-t*4*Math.PI);};
                u0 = function(x) {return 1.5*Math.cos(x*Math.PI+1);};
                u1 = function(x) {return 6*Math.PI*Math.sin(x*Math.PI+1);};
                break;
            case 'task4':
                f = function(x, t) {return 900*(t*t-x*x)*Math.sin(Math.PI/16+30*t*x);};
                mu1 = function(t) {return Math.sin(Math.PI/16);};
                mu2 = function(t) {return Math.sin(Math.PI/16+30*t);};
                u0 = function(x) {return Math.sin(Math.PI/16);};
                u1 = function(x) {return 30*x*Math.cos(Math.PI/16);};
                break;
        }
        obj = {f: f, mu1: mu1, mu2: mu2, u0: u0, u1: u1};
        console.log(obj);
        global = obj;
        return obj;
    });

    $('#submit').click(function(){
        var  T = 200, N = 100;
        var sigma = 0.2, h = 1/N, tau = 1/T;

        var y = new Array(N+1), F = [], ai = [], bi = [], d = 2 + h*h/(tau*tau*sigma);

        for (var i = 0; i <= T; i++) {
            y [i] = new Array(N+1);
        }


        for (var i = 0; i <= N; i++) {
            y[0][i] = global.u0(i*h);
        }

        y[1][0] = global.mu1(tau);
        y[1][N] = global.mu2(tau);
        for (i = 1; i < N; i++) {
            y[1][i] = global.u0(i*h) + global.u1(i*h)*tau + 0.5*tau*tau*((global.u0(h*(i+1)) - 2*global.u0(i*h) + global.u0(h*(i-1)))/(h*h) + global.f(i*h, 0));
        }

        for (var j = 1; j < T; j++) {
            for (i = 1; i < N; i++) {
                F[i] = h*h*(-2*y[j][i] + y[j-1][i])/(tau*tau*sigma) - (1 - 2*sigma)*(y[j][i-1] - 2*y[j][i] + y[j][i+1])/sigma
                - (y[j-1][i-1] - 2*y[j-1][i] +y[j-1][i+1]) - h*h*global.f(i*h, tau*j)/sigma;
            }

            //Метод прогонки
            ai[1] = 1/d;
            bi[1] = (F[1] - global.mu1(tau*(j+1)))/(-d);
            for(i = 2; i < N-1; i++){
                ai[i] = -1/(ai[i-1]-d);
                bi[i] = (F[i]-bi[i-1])/(ai[i-1]-d);
            }
            bi[N-1]=(F[N-1] - global.mu2(tau*(j+1)) - bi[N-2])/(ai[N-2]-d);

            y[j+1][0] = global.mu1(tau*(j+1));
            y[j+1][N] = global.mu2(tau*(j+1));
            y[j+1][N-1] = bi[N-1];

            for  (i = N-2; i > 0; i--) {
                y[j+1][i] = ai[i]*y[j+1][i+1] + bi[i];
            }

        }

       // console.log(y);

        lines_arr = y;
        start();
    });
    $('#task1').click();
});

