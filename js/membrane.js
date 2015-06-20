/**
 * Created by Капитан on 20.06.2015.
 */
var z = [];
var shots;
var density;
for (var j = 0; j <= 200; j++) {
    z[j] = [];
    for (var i = 0; i <= 15; i++){
        z[j][i] = [];
    }
}

$(document).ready(function () {
    var global;
    $('ul li input').on('click', function(){
        var id = $(this).attr('id'),
            f, mu1M, mu2M, mu1P, mu2P, u0, u1, obj;
        switch (id) {
            case 'task1':
                f = function(x, y, t) {return 0;};
                u0 = function(x, y) {return 0;};
                u1 = function(x, y) {return 0;};
                mu1M = function(y, t) {return 0;};
                mu2M = function(x ,t) {return 0;};
                mu1P = function(y, t) {return 0;};
                mu2P = function(x, t) {return 0;};
                break;
            case 'task2':
                f = function(x, y, t) {return -6000*Math.sin(40*t)*(800*x*x*(1-x)*(1-x)*y*y*(1-y)*(1-y)+(6*x*x-6*x+1)*y*y*(1-y)*(1-y)+(6*y*y-6*y+1)*x*x*(1-x)*(1-x));};
                u0 = function(x,y) {return 0;};
                u1 = function(x,y) {return 3000*40*x*x*(1-x)*(1-x)*y*y*(1-y)*(1-y);};
                mu1M = function(y,t) {return 0;};
                mu2M = function(x,t) {return 0;};
                mu1P = function(y,t) {return 0;};
                mu2P = function(x,t) {return 0;};
                break;
            case 'task3':
                f = function(x, y, t) {return -(t*t)*(Math.exp(x)-Math.cos(y)) + (2-(t-t*t)*(t-t*t))*(Math.exp(x)+Math.cos(y));};
                u0 = function(x, y) {return 0;};
                u1 = function(x, y) {return 0;};
                mu1M = function(y, t) {return (1 + Math.cos(y)) * t * t;};
                mu2M = function(x ,t) {return (1+Math.exp(x))*t*t;};
                mu1P = function(y, t) {return (Math.exp(1) + Math.cos(y)) * t * t;};
                mu2P = function(x, t) {return (Math.cos(1)+Math.exp(x))*t*t;};
                break;

        }
        obj = {f: f, u0: u0, u1: u1, mu1M: mu1M, mu2M: mu2M, mu1P: mu1P, mu2P: mu2P};
        console.log(obj);
        global = obj;
        return obj;
    });

    $('#submit').click(function(){
        var T = 200, N = 15, u=[], v=[],y=[];

        for (var j = 0; j <= T; j++) {
            u[j] = [];
            v[j] = [];
            y[j] = [];
            for (var i = 0; i <= N; i++){
                u[j][i] = [];
                v[j][i] = [];
                y[j][i] = [];
            }
        }

        var h = 1/N, tau = 1/T,
            sigma = 0.25, d = 2 + h*h/(2*tau*tau*sigma),
            F1 = [], F2 = [], ai = [], bi = [], ci = [];


        for (var i1 = 0; i1 <= N; i1++){
            for (var i2 = 0; i2 <= N; i2++){
                y[0][i1][i2] = global.u0(i1*h, i2*h);
                v[0][i1][i2] = global.u0(i1*h, i2*h);
                u[0][i1][i2] = global.u0(i1*h, i2*h);
            }
        }

        for (var i = 0; i <= N; i++){
            v[1][i][0] = global.mu2M(i1*h, 0);
            v[1][i][N] = global.mu2P(i1*h, 0);
            y[1][0][i] = global.mu1M(i2*h, 0);
            y[1][N][i] = global.mu1P(i2*h, 0);
            u[1][i][0] = global.mu2M(i1*h, 0);
            u[1][i][N] = global.mu2P(i1*h, 0);
            u[1][0][i] = global.mu1M(i2*h, 0);
            u[1][N][i] = global.mu1P(i2*h, 0);

        }

        for (var i1 = 1; i1 < N; i1++){
            for (var i2 = 0; i2 <= N; i2++){
                y[1][i1][i2] = global.u0(i1*h, i2*h) + global.u1(i1*h, i2*h)*tau + 0.5*tau*tau*((global.u0(h*(i1+1), h*i2) - 2*global.u0(i1*h, i2*h) + global.u0(h*(i1-1),i2*h))/(h*h) + (global.u0((h*i1),h*(i2+1)) - 2*global.u0(i1*h, i2*h) + global.u0(h*i1,(i2-1)*h))/(h*h) + 0.5*global.f(i1*h, i2*h, 0));
            }
        }

        for (var i1 = 0; i1 <= N; i1++){
            for (var i2 = 1; i2 < N; i2++){
                v[1][i1][i2] = global.u0(i1*h, i2*h) + global.u1(i1*h, i2*h)*tau + 0.5*tau*tau*((global.u0(h*(i1+1), h*i2) - 2*global.u0(i1*h, i2*h) + global.u0(h*(i1-1),i2*h))/(h*h)+(global.u0((h*i1),h*(i2+1)) - 2*global.u0(i1*h, i2*h) + global.u0(h*i1,(i2-1)*h))/(h*h) + 0.5*global.f(i1*h, i2*h, 0));
            }
        }


        for (var j = 1; j < T; j++) {
            for (var i2 = 0; i2 <= N; i2++){

                F1[0] = global.mu1M(i2*h, (j+1)*tau);
                F1[N] = global.mu1P(i2*h, (j+1)*tau);
                F2[0] = global.mu2M(i2*h, (j+1)*tau);
                F2[N] = global.mu2P(i2*h, (j+1)*tau);

                for (var i1 = 1; i1 < N; i1++) {

                    F1[i1] = h*h*(-y[j][i1][i2]+0.5*y[j-1][i1][i2])/(tau*tau*sigma) - (1-2*sigma)*(y[j][i1-1][i2]-2*y[j][i1][i2]+y[j][i1+1][i2]) -
                    (y[j][i1-1][i2]-2*y[j-1][i1][i2]+y[j][i1+1][i2]) - 0.5*h*h*global.f(i1 * h, i2 * h, j * tau)/sigma;

                    F2[i1] = h*h*(-v[j][i2][i1]+0.5*v[j-1][i2][i1])/(tau*tau*sigma) - (1-2*sigma)*(v[j][i2][i1-1]-2*v[j][i2][i1]+v[j][i2][i1+1]) -
                    (v[j][i2][i1-1]-2*v[j-1][i2][i1]+v[j][i2][i1+1]) - 0.5*h*h*global.f(i1 * h, i2 * h, j  * tau)/sigma;

                    ai[0] = 0;
                    bi[0] = 0;
                    ci[0] = 0;
                    ai[1] = 1 /(d);
                    bi[1] = (F1[1] - global.mu1M(i2 * h, tau * (j + 1))) / (-d);
                    ci[1] = (F2[1] - global.mu2M(i2 * h, tau * (j + 1))) / (-d);

                    for (var i = 2; i < N - 1; i++) {
                        ai[i] = -1 / (ai[i - 1] - d);
                        bi[i] = (F1[i] - bi[i - 1]) / (ai[i - 1] - d);
                        ci[i] = (F2[i] - bi[i - 1]) / (ai[i - 1] - d);
                    }
                    bi[N - 1] = (F1[N - 1] - global.mu1P(i2 * h, tau * (j + 1)) - bi[N - 2]) / (ai[N - 2] - d);
                    ci[N - 1] = (F2[N - 1] - global.mu2P(i2 * h, tau * (j + 1)) - ci[N - 2]) / (ai[N - 2] - d);

                    y[j + 1][0][i2] = global.mu1M(i2 * h, tau * (j + 1));
                    y[j + 1][N][i2] = global.mu1P(i2 * h, tau * (j + 1));
                    y[j + 1][N - 1][i2] = bi[N - 1];
                    v[j + 1][i2][0] = global.mu2M(i2 * h, tau * (j + 1));
                    v[j + 1][i2][N] = global.mu2P(i2 * h, tau * (j + 1));
                    v[j + 1][i2][N - 1] = ci[N - 1];
                    u[j + 1][0][i2] = global.mu1M(i2 * h, tau * (j + 1));
                    u[j + 1][N][i2] = global.mu1P(i2 * h, tau * (j + 1));
                    u[j + 1][i2][0] = global.mu2M(i2 * h, tau * (j + 1));
                    u[j + 1][i2][N] = global.mu2P(i2 * h, tau * (j + 1));
                    u[j + 1][N - 1][i2] = bi[N - 1];
                    u[j + 1][i2][N - 1] = ci[N - 1];


                    for (var i = N - 2; i > 0; i--) {
                        y[j + 1][i][i2] = ai[i] * y[j + 1][i + 1][i2] + bi[i];
                        v[j + 1][i2][i] = ai[i] * v[j + 1][i2][i + 1] + ci[i];
                    }
                }
            }
        }

        for (var j = 0; j <= T; j++) {
            for (var i1 = 1; i1 < N-1; i1++) {
                for (var i2 = 1; i2 < N-1; i2++) {
                    u[j][i1][i2] = 0.5*(y[j][i1][i2] + v[j][i1][i2]);
                }
            }
        }

        density = N;
        shots = T;
        delta = 1/density;
        z = u;
        console.log(z);
        start();

    });

    $('#task1').click();
});