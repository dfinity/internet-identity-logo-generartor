var D = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rt(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
function nt(l) {
  if (l.__esModule)
    return l;
  var x = l.default;
  if (typeof x == "function") {
    var u = function c() {
      return this instanceof c ? Reflect.construct(x, arguments, this.constructor) : x.apply(this, arguments);
    };
    u.prototype = x.prototype;
  } else
    u = {};
  return Object.defineProperty(u, "__esModule", { value: !0 }), Object.keys(l).forEach(function(c) {
    var f = Object.getOwnPropertyDescriptor(l, c);
    Object.defineProperty(u, c, f.get ? f : {
      enumerable: !0,
      get: function() {
        return l[c];
      }
    });
  }), u;
}
var K = { exports: {} };
K.exports;
(function(l) {
  (function(x, u, c) {
    function f(t) {
      var r = this, s = i();
      r.next = function() {
        var e = 2091639 * r.s0 + r.c * 23283064365386963e-26;
        return r.s0 = r.s1, r.s1 = r.s2, r.s2 = e - (r.c = e | 0);
      }, r.c = 1, r.s0 = s(" "), r.s1 = s(" "), r.s2 = s(" "), r.s0 -= s(t), r.s0 < 0 && (r.s0 += 1), r.s1 -= s(t), r.s1 < 0 && (r.s1 += 1), r.s2 -= s(t), r.s2 < 0 && (r.s2 += 1), s = null;
    }
    function h(t, r) {
      return r.c = t.c, r.s0 = t.s0, r.s1 = t.s1, r.s2 = t.s2, r;
    }
    function A(t, r) {
      var s = new f(t), e = r && r.state, n = s.next;
      return n.int32 = function() {
        return s.next() * 4294967296 | 0;
      }, n.double = function() {
        return n() + (n() * 2097152 | 0) * 11102230246251565e-32;
      }, n.quick = n, e && (typeof e == "object" && h(e, s), n.state = function() {
        return h(s, {});
      }), n;
    }
    function i() {
      var t = 4022871197, r = function(s) {
        s = String(s);
        for (var e = 0; e < s.length; e++) {
          t += s.charCodeAt(e);
          var n = 0.02519603282416938 * t;
          t = n >>> 0, n -= t, n *= t, t = n >>> 0, n -= t, t += n * 4294967296;
        }
        return (t >>> 0) * 23283064365386963e-26;
      };
      return r;
    }
    u && u.exports ? u.exports = A : c && c.amd ? c(function() {
      return A;
    }) : this.alea = A;
  })(
    D,
    l,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(K);
var ot = K.exports, V = { exports: {} };
V.exports;
(function(l) {
  (function(x, u, c) {
    function f(i) {
      var t = this, r = "";
      t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.next = function() {
        var e = t.x ^ t.x << 11;
        return t.x = t.y, t.y = t.z, t.z = t.w, t.w ^= t.w >>> 19 ^ e ^ e >>> 8;
      }, i === (i | 0) ? t.x = i : r += i;
      for (var s = 0; s < r.length + 64; s++)
        t.x ^= r.charCodeAt(s) | 0, t.next();
    }
    function h(i, t) {
      return t.x = i.x, t.y = i.y, t.z = i.z, t.w = i.w, t;
    }
    function A(i, t) {
      var r = new f(i), s = t && t.state, e = function() {
        return (r.next() >>> 0) / 4294967296;
      };
      return e.double = function() {
        do
          var n = r.next() >>> 11, o = (r.next() >>> 0) / 4294967296, d = (n + o) / (1 << 21);
        while (d === 0);
        return d;
      }, e.int32 = r.next, e.quick = e, s && (typeof s == "object" && h(s, r), e.state = function() {
        return h(r, {});
      }), e;
    }
    u && u.exports ? u.exports = A : c && c.amd ? c(function() {
      return A;
    }) : this.xor128 = A;
  })(
    D,
    l,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(V);
var st = V.exports, J = { exports: {} };
J.exports;
(function(l) {
  (function(x, u, c) {
    function f(i) {
      var t = this, r = "";
      t.next = function() {
        var e = t.x ^ t.x >>> 2;
        return t.x = t.y, t.y = t.z, t.z = t.w, t.w = t.v, (t.d = t.d + 362437 | 0) + (t.v = t.v ^ t.v << 4 ^ (e ^ e << 1)) | 0;
      }, t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.v = 0, i === (i | 0) ? t.x = i : r += i;
      for (var s = 0; s < r.length + 64; s++)
        t.x ^= r.charCodeAt(s) | 0, s == r.length && (t.d = t.x << 10 ^ t.x >>> 4), t.next();
    }
    function h(i, t) {
      return t.x = i.x, t.y = i.y, t.z = i.z, t.w = i.w, t.v = i.v, t.d = i.d, t;
    }
    function A(i, t) {
      var r = new f(i), s = t && t.state, e = function() {
        return (r.next() >>> 0) / 4294967296;
      };
      return e.double = function() {
        do
          var n = r.next() >>> 11, o = (r.next() >>> 0) / 4294967296, d = (n + o) / (1 << 21);
        while (d === 0);
        return d;
      }, e.int32 = r.next, e.quick = e, s && (typeof s == "object" && h(s, r), e.state = function() {
        return h(r, {});
      }), e;
    }
    u && u.exports ? u.exports = A : c && c.amd ? c(function() {
      return A;
    }) : this.xorwow = A;
  })(
    D,
    l,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(J);
var it = J.exports, Q = { exports: {} };
Q.exports;
(function(l) {
  (function(x, u, c) {
    function f(i) {
      var t = this;
      t.next = function() {
        var s = t.x, e = t.i, n, o;
        return n = s[e], n ^= n >>> 7, o = n ^ n << 24, n = s[e + 1 & 7], o ^= n ^ n >>> 10, n = s[e + 3 & 7], o ^= n ^ n >>> 3, n = s[e + 4 & 7], o ^= n ^ n << 7, n = s[e + 7 & 7], n = n ^ n << 13, o ^= n ^ n << 9, s[e] = o, t.i = e + 1 & 7, o;
      };
      function r(s, e) {
        var n, o = [];
        if (e === (e | 0))
          o[0] = e;
        else
          for (e = "" + e, n = 0; n < e.length; ++n)
            o[n & 7] = o[n & 7] << 15 ^ e.charCodeAt(n) + o[n + 1 & 7] << 13;
        for (; o.length < 8; )
          o.push(0);
        for (n = 0; n < 8 && o[n] === 0; ++n)
          ;
        for (n == 8 ? o[7] = -1 : o[n], s.x = o, s.i = 0, n = 256; n > 0; --n)
          s.next();
      }
      r(t, i);
    }
    function h(i, t) {
      return t.x = i.x.slice(), t.i = i.i, t;
    }
    function A(i, t) {
      i == null && (i = +/* @__PURE__ */ new Date());
      var r = new f(i), s = t && t.state, e = function() {
        return (r.next() >>> 0) / 4294967296;
      };
      return e.double = function() {
        do
          var n = r.next() >>> 11, o = (r.next() >>> 0) / 4294967296, d = (n + o) / (1 << 21);
        while (d === 0);
        return d;
      }, e.int32 = r.next, e.quick = e, s && (s.x && h(s, r), e.state = function() {
        return h(r, {});
      }), e;
    }
    u && u.exports ? u.exports = A : c && c.amd ? c(function() {
      return A;
    }) : this.xorshift7 = A;
  })(
    D,
    l,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(Q);
var ut = Q.exports, Y = { exports: {} };
Y.exports;
(function(l) {
  (function(x, u, c) {
    function f(i) {
      var t = this;
      t.next = function() {
        var s = t.w, e = t.X, n = t.i, o, d;
        return t.w = s = s + 1640531527 | 0, d = e[n + 34 & 127], o = e[n = n + 1 & 127], d ^= d << 13, o ^= o << 17, d ^= d >>> 15, o ^= o >>> 12, d = e[n] = d ^ o, t.i = n, d + (s ^ s >>> 16) | 0;
      };
      function r(s, e) {
        var n, o, d, a, S, N = [], j = 128;
        for (e === (e | 0) ? (o = e, e = null) : (e = e + "\0", o = 0, j = Math.max(j, e.length)), d = 0, a = -32; a < j; ++a)
          e && (o ^= e.charCodeAt((a + 32) % e.length)), a === 0 && (S = o), o ^= o << 10, o ^= o >>> 15, o ^= o << 4, o ^= o >>> 13, a >= 0 && (S = S + 1640531527 | 0, n = N[a & 127] ^= o + S, d = n == 0 ? d + 1 : 0);
        for (d >= 128 && (N[(e && e.length || 0) & 127] = -1), d = 127, a = 4 * 128; a > 0; --a)
          o = N[d + 34 & 127], n = N[d = d + 1 & 127], o ^= o << 13, n ^= n << 17, o ^= o >>> 15, n ^= n >>> 12, N[d] = o ^ n;
        s.w = S, s.X = N, s.i = d;
      }
      r(t, i);
    }
    function h(i, t) {
      return t.i = i.i, t.w = i.w, t.X = i.X.slice(), t;
    }
    function A(i, t) {
      i == null && (i = +/* @__PURE__ */ new Date());
      var r = new f(i), s = t && t.state, e = function() {
        return (r.next() >>> 0) / 4294967296;
      };
      return e.double = function() {
        do
          var n = r.next() >>> 11, o = (r.next() >>> 0) / 4294967296, d = (n + o) / (1 << 21);
        while (d === 0);
        return d;
      }, e.int32 = r.next, e.quick = e, s && (s.X && h(s, r), e.state = function() {
        return h(r, {});
      }), e;
    }
    u && u.exports ? u.exports = A : c && c.amd ? c(function() {
      return A;
    }) : this.xor4096 = A;
  })(
    D,
    // window object or global
    l,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(Y);
var ct = Y.exports, Z = { exports: {} };
Z.exports;
(function(l) {
  (function(x, u, c) {
    function f(i) {
      var t = this, r = "";
      t.next = function() {
        var e = t.b, n = t.c, o = t.d, d = t.a;
        return e = e << 25 ^ e >>> 7 ^ n, n = n - o | 0, o = o << 24 ^ o >>> 8 ^ d, d = d - e | 0, t.b = e = e << 20 ^ e >>> 12 ^ n, t.c = n = n - o | 0, t.d = o << 16 ^ n >>> 16 ^ d, t.a = d - e | 0;
      }, t.a = 0, t.b = 0, t.c = -1640531527, t.d = 1367130551, i === Math.floor(i) ? (t.a = i / 4294967296 | 0, t.b = i | 0) : r += i;
      for (var s = 0; s < r.length + 20; s++)
        t.b ^= r.charCodeAt(s) | 0, t.next();
    }
    function h(i, t) {
      return t.a = i.a, t.b = i.b, t.c = i.c, t.d = i.d, t;
    }
    function A(i, t) {
      var r = new f(i), s = t && t.state, e = function() {
        return (r.next() >>> 0) / 4294967296;
      };
      return e.double = function() {
        do
          var n = r.next() >>> 11, o = (r.next() >>> 0) / 4294967296, d = (n + o) / (1 << 21);
        while (d === 0);
        return d;
      }, e.int32 = r.next, e.quick = e, s && (typeof s == "object" && h(s, r), e.state = function() {
        return h(r, {});
      }), e;
    }
    u && u.exports ? u.exports = A : c && c.amd ? c(function() {
      return A;
    }) : this.tychei = A;
  })(
    D,
    l,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(Z);
var at = Z.exports, et = { exports: {} };
const lt = {}, ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lt
}, Symbol.toStringTag, { value: "Module" })), pt = /* @__PURE__ */ nt(ft);
(function(l) {
  (function(x, u, c) {
    var f = 256, h = 6, A = 52, i = "random", t = c.pow(f, h), r = c.pow(2, A), s = r * 2, e = f - 1, n;
    function o(m, y, M) {
      var b = [];
      y = y == !0 ? { entropy: !0 } : y || {};
      var p = N(S(
        y.entropy ? [m, B(u)] : m ?? j(),
        3
      ), b), v = new d(b), w = function() {
        for (var $ = v.g(h), g = t, C = 0; $ < r; )
          $ = ($ + C) * f, g *= f, C = v.g(1);
        for (; $ >= s; )
          $ /= 2, g /= 2, C >>>= 1;
        return ($ + C) / g;
      };
      return w.int32 = function() {
        return v.g(4) | 0;
      }, w.quick = function() {
        return v.g(4) / 4294967296;
      }, w.double = w, N(B(v.S), u), (y.pass || M || function($, g, C, k) {
        return k && (k.S && a(k, v), $.state = function() {
          return a(v, {});
        }), C ? (c[i] = $, g) : $;
      })(
        w,
        p,
        "global" in y ? y.global : this == c,
        y.state
      );
    }
    function d(m) {
      var y, M = m.length, b = this, p = 0, v = b.i = b.j = 0, w = b.S = [];
      for (M || (m = [M++]); p < f; )
        w[p] = p++;
      for (p = 0; p < f; p++)
        w[p] = w[v = e & v + m[p % M] + (y = w[p])], w[v] = y;
      (b.g = function($) {
        for (var g, C = 0, k = b.i, R = b.j, G = b.S; $--; )
          g = G[k = e & k + 1], C = C * f + G[e & (G[k] = G[R = e & R + g]) + (G[R] = g)];
        return b.i = k, b.j = R, C;
      })(f);
    }
    function a(m, y) {
      return y.i = m.i, y.j = m.j, y.S = m.S.slice(), y;
    }
    function S(m, y) {
      var M = [], b = typeof m, p;
      if (y && b == "object")
        for (p in m)
          try {
            M.push(S(m[p], y - 1));
          } catch {
          }
      return M.length ? M : b == "string" ? m : m + "\0";
    }
    function N(m, y) {
      for (var M = m + "", b, p = 0; p < M.length; )
        y[e & p] = e & (b ^= y[e & p] * 19) + M.charCodeAt(p++);
      return B(y);
    }
    function j() {
      try {
        var m;
        return n && (m = n.randomBytes) ? m = m(f) : (m = new Uint8Array(f), (x.crypto || x.msCrypto).getRandomValues(m)), B(m);
      } catch {
        var y = x.navigator, M = y && y.plugins;
        return [+/* @__PURE__ */ new Date(), x, M, x.screen, B(u)];
      }
    }
    function B(m) {
      return String.fromCharCode.apply(0, m);
    }
    if (N(c.random(), u), l.exports) {
      l.exports = o;
      try {
        n = pt;
      } catch {
      }
    } else
      c["seed" + i] = o;
  })(
    // global: `self` in browsers (including strict mode and web workers),
    // otherwise `this` in Node and other environments
    typeof self < "u" ? self : D,
    [],
    // pool: entropy pool starts empty
    Math
    // math: package containing random, pow, and seedrandom
  );
})(et);
var xt = et.exports, dt = ot, bt = st, ht = it, At = ut, mt = ct, yt = at, O = xt;
O.alea = dt;
O.xor128 = bt;
O.xorwow = ht;
O.xorshift7 = At;
O.xor4096 = mt;
O.tychei = yt;
var $t = O;
const gt = /* @__PURE__ */ rt($t), H = {
  blue: [0, 178, 255, 1],
  // blue
  pink: [255, 0, 130, 1],
  // pink
  purple: [90, 0, 159, 1],
  // purple
  yellow: [255, 171, 0, 1],
  // yellow
  orange: [255, 75, 0, 1]
  // orange
}, vt = [
  ["blue", "pink"],
  ["purple", "blue"],
  ["purple", "pink"],
  ["yellow", "orange"],
  ["orange", "pink"],
  ["yellow", "purple"]
], W = [
  H.blue,
  H.pink,
  H.purple,
  H.yellow
], wt = vt.map((l) => ({
  colorNames: l,
  colors: [
    H[l[0]],
    H[l[1]]
  ]
})), Ct = (l, x = Math.random) => {
  const u = [...l], c = [];
  for (; u.length > 0; ) {
    const f = Math.floor(x() * u.length);
    c.push(u[f]), u.splice(f, 1);
  }
  return c;
}, Et = (l, x = Math.random) => {
  const u = Ct(l, x), c = [];
  return u.filter((f) => {
    const h = f.colorNames[0], A = f.colorNames[1];
    return c.includes(h) || c.includes(A) ? !1 : (c.push(h), c.push(A), !0);
  }).map((f) => f.colors);
}, St = (l) => {
  const x = gt(l), u = Et(wt, x), c = W[Math.floor(Math.random() * W.length)], f = x(), h = 0.45 + x() * 0.3;
  return {
    colorPairs: u,
    colorCenter: c,
    innerPointRadius: 15,
    rings: 2,
    ringStrokeWidth: 15,
    rotations: [
      (f + h * 0.5 + (-0.1 + x() * 0.2)) % 1,
      // rotate inner ring
      f,
      f + (-0.25 + x() * 0.5)
      // most outer ring
    ],
    rotationOffsets: [0, 0],
    strokeLengths: [
      0.5 + x() * 0.16,
      // outer ring
      h
      // inner ring
    ],
    gradientStops: [0.25, 0.75],
    strokeLinecap: "round",
    showDesignRules: !1
  };
}, F = (l, x = 1) => {
  if (typeof l == "string") {
    let u = l;
    return u.length === 4 || (u.length === 7 && x !== 1 ? u = u + Math.round(x * 255).toString(16) : u.length === 9 && x && (u = u.slice(0, 7) + Math.round(x * 255).toString(16))), u;
  } else {
    const u = [...l];
    return x !== 1 && (u[3] = x), `rgba(${u.join(", ")})`;
  }
}, E = "http://www.w3.org/2000/svg";
function tt(l, x, u, c, f) {
  const h = document.createElementNS(E, "rect");
  return h.setAttribute("x", `${l}`), h.setAttribute("y", `${x}`), h.setAttribute("width", `${u}`), h.setAttribute("height", `${c}`), h.setAttribute("fill", f), h.classList.add("shape"), h;
}
function I(l, x, u, c) {
  const f = document.createElementNS(E, "circle");
  return f.setAttribute("cx", `${l}`), f.setAttribute("cy", `${x}`), f.setAttribute("r", `${u}`), f.setAttribute("fill", c), f.classList.add("shape"), f;
}
function kt(l, x, u, c, f, h, A) {
  const i = 2 * Math.PI * u, t = A !== "butt" ? c / 2 : 0, r = i * f + t, s = Math.max(
    i * h - t * 2,
    0.1
  ), e = I(l, x, u, "none");
  return e.setAttribute("stroke-linecap", A || "round"), e.setAttribute("stroke", "#fff"), e.setAttribute("stroke-width", `${c}`), e.setAttribute(
    "stroke-dasharray",
    `${s} ${i - s}`
  ), e.setAttribute("stroke-dashoffset", `${-r}`), e;
}
const Mt = (l, x) => l / x * (180 / Math.PI), Nt = ({
  colorPairs: l,
  // color pairs as array of color pairs as RGBA arrays
  colorCenter: x = [255, 255, 255, 1],
  // color of the center point
  innerPointRadius: u = 20,
  // radius of the inner point
  rings: c = 2,
  // number of rings,
  rotations: f = new Array(2 + 1).fill(0).map(() => Math.random()),
  rotationOffsets: h = new Array(2 + 1).fill(0).map(() => Math.random()),
  strokeLengths: A = new Array(2 + 1).fill(0).map(() => Math.random() * 0.5 + 0.25),
  ringStrokeWidth: i = 20,
  // stroke width of the rings
  idPrefix: t = "logo-0",
  // prefix for the ids of the elements so they can be styled more than once on a page 
  logoClass: r = "logo",
  // class name for the logo
  gradientStops: s = [0.2, 0.8],
  // stops percents for the gradients
  strokeLinecap: e = "round",
  // stroke linecap
  showDesignRules: n = !1
  // show design rules
}) => {
  const o = document.createElementNS(E, "svg");
  o.setAttribute("xmlns", E), o.setAttribute("version", "1.1");
  const d = u * 2, a = c * i + d;
  o.setAttribute("viewBox", `0 0 ${a} ${a}`), o.classList.add(r);
  const S = document.createElementNS(E, "defs"), N = document.createElementNS(E, "style");
  S.appendChild(N), o.appendChild(S), N.innerHTML = `
    .${r} .shape{
      transform-box: fill-box;
      transform-origin: center;
      transform: rotate(calc(var(--rotation) * 360deg + var(--rotationOffset, 1) * 360deg));
    }
  `;
  const j = new Array(c).fill(0).map((b, p) => a - p * i);
  o.appendChild(I(a / 2, a / 2, u, "var(--bg, #fff)"));
  const B = new Array(c + 1).fill(0).map(() => document.createElementNS(E, "linearGradient")), m = [...l, [x, x]];
  B.forEach((b, p) => {
    b.setAttribute("id", `${t}-gradient-${p}`);
    const v = (j[p] || 0) / 2;
    let w = 0;
    const $ = p === c;
    A[p] && (w = 180 + Mt((A[p] || 0) * 2 * Math.PI * v, v) / 2 + 90), b.setAttribute("gradientTransform", `rotate(${w} .5 .5)`), b.setAttribute("gradientUnits", "objectBoundingBox");
    const g = m[p % m.length];
    b.innerHTML = `
      <stop offset="${$ ? 0 : (s[0] || 0) * 100}%" stop-color="${F(g[1] || [0, 0, 0, 1])}"/>
      <stop offset="${$ ? 100 : (s[1] || 0) * 100}%" stop-opacity="0" stop-color="${F(g[1] || [0, 0, 0, 1])}"/>
    `, b.classList.add("gradient"), S.appendChild(b);
  }), j.forEach((b, p) => {
    const v = b / 2, w = (a - b) / 2, g = tt(
      w,
      w,
      b,
      b,
      `${F(
        l[p % l.length][0] || "rgba(0,0,0,0)"
      )}`
    );
    g.style.setProperty("--rotation", `${f[p + 1]}`), g.style.setProperty("--rotationOffset", `${h[p]}`), g.setAttribute("data-layer", `${p + 1}`), o.appendChild(g);
    const C = kt(
      a / 2,
      a / 2,
      v - i / 2,
      i,
      0,
      A[p] || 0,
      e
    ), k = document.createElementNS(E, "mask");
    k.appendChild(C), k.setAttribute("id", `${t}-mask-${p}`), S.appendChild(k), g.setAttribute("mask", `url(#${t}-mask-${p})`);
  });
  const y = I(
    a / 2,
    a / 2,
    u,
    `url(#${t}-gradient-${c})`
  );
  if (y.style.setProperty("--rotation", `${f[0]}`), y.setAttribute("data-layer", "0"), o.appendChild(y), j.map((b, p) => {
    const v = (a - b) / 2, $ = tt(
      v,
      v,
      b,
      b,
      `url(#${t}-gradient-${p})`
    );
    return $.setAttribute("data-layer", `${p + 1}`), $.style.setProperty("--rotation", `${f[p + 1]}`), $.setAttribute("mask", `url(#${t}-mask-${p})`), $;
  }).reverse().forEach((b) => o.appendChild(b)), n) {
    const b = document.createElementNS(E, "g");
    b.setAttribute("class", "design-rules");
    const p = document.createElementNS(E, "g");
    b.setAttribute("class", "design-rules"), j.forEach((k, R) => {
      const G = k / 2, _ = i;
      let z = (a - k) / 2;
      R % 2 === 1 && (z += k - _);
      const P = a / 2, T = document.createElementNS(E, "line");
      T.setAttribute("x1", `${z}`), T.setAttribute("y1", `${P}`), T.setAttribute("x2", `${z + _}`), T.setAttribute("y2", `${P}`), T.setAttribute("stroke", "currentColor"), T.setAttribute("stroke-width", `${a / 800}`);
      const U = I(
        a / 2,
        a / 2,
        G,
        "none"
      );
      U.setAttribute("stroke", "currentColor"), U.setAttribute("stroke-width", `${a / 800}`);
      const X = document.createElementNS(E, "text");
      X.setAttribute("x", `${z + i / 2}`), X.setAttribute("y", `${a - i / 8}`), X.setAttribute("text-anchor", "middle"), X.setAttribute("dominant-baseline", "middle"), X.setAttribute("font-size", `${a / 20}`), X.setAttribute("fill", "currentColor"), X.innerHTML = "1x";
      const q = document.createElementNS(E, "line");
      q.setAttribute("x1", `${z + _}`), q.setAttribute("y1", `${P}`), q.setAttribute("x2", `${z + _}`), q.setAttribute("y2", `${a}`), q.setAttribute("stroke", "currentColor"), q.setAttribute("stroke-width", `${a / 800}`);
      const L = document.createElementNS(E, "line");
      L.setAttribute("x1", `${z + _ - _}`), L.setAttribute("y1", `${P}`), L.setAttribute("x2", `${z + _ - _}`), L.setAttribute("y2", `${a}`), L.setAttribute("stroke", "currentColor"), L.setAttribute("stroke-width", `${a / 800}`), b.appendChild(U), p.appendChild(T), p.appendChild(q), p.appendChild(L), p.appendChild(X);
    });
    const v = I(
      a / 2,
      a / 2,
      u,
      "none"
    );
    v.setAttribute("stroke", "currentColor"), v.setAttribute("stroke-width", `${a / 800}`);
    const w = I(
      a / 2,
      a / 2,
      u - i / 2,
      "none"
    );
    w.setAttribute("stroke", "currentColor"), w.setAttribute("stroke-width", `${a / 800}`);
    const $ = document.createElementNS(E, "line");
    $.setAttribute("x1", `${a / 2}`), $.setAttribute("y1", `${a / 2 - u}`), $.setAttribute("x2", `${a / 2}`), $.setAttribute("y2", `${a / 2 + u}`), $.setAttribute("stroke", "currentColor"), $.setAttribute("stroke-width", `${a / 800}`);
    const g = document.createElementNS(E, "text");
    g.setAttribute("x", `${a / 2}`), g.setAttribute("y", `${a / 2}`), g.setAttribute("text-anchor", "middle"), g.setAttribute("dominant-baseline", "middle"), g.setAttribute("font-size", `${a / 20}`), g.setAttribute("fill", "currentColor"), g.innerHTML = `${Math.round(u * 2 / i * 10) / 10}x`;
    const C = document.createElementNS(E, "circle");
    C.setAttribute("cx", `${a / 2}`), C.setAttribute("cy", `${a / 2}`), C.setAttribute("r", `${u}`), C.setAttribute("fill", "none"), C.setAttribute("stroke", "currentColor"), C.setAttribute("stroke-width", `${a / 800}`), b.appendChild($), p.appendChild(g), p.appendChild(C), o.prepend(v), o.prepend(b), o.prepend(w), o.appendChild(p);
  }
  return o;
};
export {
  wt as brandColorsAsRGBAPairs,
  W as brandColorsAsRGBAforCenter,
  Nt as generateLogo,
  St as generator,
  Et as randomUniqueColorPairs,
  Ct as shuffleArray
};
