/**
 * distance squared
 */
function dist2(p1, p2) {
    var s= 0;
    var d;
    for (var i=0; i<dim; i++) {
        d= p1.x[i]-p2.x[i];
        s+= d*d;
    }
    return s;
}

/**
 * distance
 */
function dist(p1, p2) { return Math.sqrt(dist2(p1, p2)); }

/**
 * product of a number and a vector
 */
function prod(num, vector) {
    var r= [];
    for (var i=0; i<vector.length; i++) {
        r[i]= vector[i]*num;
    }
    return r;
}

/**
 * sum of vectors
 */
function sum(u, v) {
    var r = [];
    var dim = Math.min(u.length, v.length);
    for (var i=0; i<dim; i++) {
        r[i]= u[i]+v[i];
    }
    return r;
}


/**
 * length of a vector
 */
function norm(v) {
    r = 0;
    for (var i in c) r += c[i]*c[i];
    return Math.sqrt(r);
}


/**
 * scalar product
 */
function scal_prod(u, v) {
    r=0;
    var dim = Math.min(u.length, v.length);
    for (var i=0; i<dim; i++) {
        r += u[i]*v[i];
    }
    return r;
}

function sum_vectors(u, v) {
    var dim = Math.min(u.length, v.length);
    var r = [];
    for (var i=0; i<dim; i++) {
        r[i] = u[i]+v[i];
    }
    return r;
}

/* Projection of vector Y to the plane of vectors U,V */

function projection(y, u, v) {
    var p = [];
    p[0] = scal_prod(u, y);
    p[1] = scal_prod(v, y);
    return p;
}

function unit(v) { return prod(1/norma(v), v); }

