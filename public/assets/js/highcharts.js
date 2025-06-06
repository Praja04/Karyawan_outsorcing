/*
 Highcharts JS v10.3.3 (2023-01-20)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (aa, K) {
  "object" === typeof module && module.exports
    ? ((K["default"] = K), (module.exports = aa.document ? K(aa) : K))
    : "function" === typeof define && define.amd
      ? define("highcharts/highcharts", function () {
          return K(aa);
        })
      : (aa.Highcharts && aa.Highcharts.error(16, !0), (aa.Highcharts = K(aa)));
})("undefined" !== typeof window ? window : this, function (aa) {
  function K(a, A, g, F) {
    a.hasOwnProperty(A) ||
      ((a[A] = F.apply(null, g)),
      "function" === typeof CustomEvent &&
        aa.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: A, module: a[A] },
          }),
        ));
  }
  var g = {};
  K(g, "Core/Globals.js", [], function () {
    var a;
    (function (a) {
      a.SVG_NS = "http://www.w3.org/2000/svg";
      a.product = "Highcharts";
      a.version = "10.3.3";
      a.win = "undefined" !== typeof aa ? aa : {};
      a.doc = a.win.document;
      a.svg =
        a.doc &&
        a.doc.createElementNS &&
        !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect;
      a.userAgent = (a.win.navigator && a.win.navigator.userAgent) || "";
      a.isChrome = -1 !== a.userAgent.indexOf("Chrome");
      a.isFirefox = -1 !== a.userAgent.indexOf("Firefox");
      a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
      a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari");
      a.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a.userAgent);
      a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit");
      a.deg2rad = (2 * Math.PI) / 360;
      a.hasBidiBug =
        a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10);
      a.hasTouch = !!a.win.TouchEvent;
      a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      a.noop = function () {};
      a.supportsPassiveEvents = (function () {
        var g = !1;
        if (!a.isMS) {
          var A = Object.defineProperty({}, "passive", {
            get: function () {
              g = !0;
            },
          });
          a.win.addEventListener &&
            a.win.removeEventListener &&
            (a.win.addEventListener("testPassive", a.noop, A),
            a.win.removeEventListener("testPassive", a.noop, A));
        }
        return g;
      })();
      a.charts = [];
      a.dateFormats = {};
      a.seriesTypes = {};
      a.symbolSizes = {};
      a.chartCount = 0;
    })(a || (a = {}));
    ("");
    return a;
  });
  K(g, "Core/Utilities.js", [g["Core/Globals.js"]], function (a) {
    function g(b, c, n, J) {
      var z = c ? "Highcharts error" : "Highcharts warning";
      32 === b && (b = "" + z + ": Deprecated member");
      var q = l(b),
        u = q
          ? "" + z + " #" + b + ": www.highcharts.com/errors/" + b + "/"
          : b.toString();
      if ("undefined" !== typeof J) {
        var N = "";
        q && (u += "?");
        E(J, function (b, z) {
          N += "\n - ".concat(z, ": ").concat(b);
          q && (u += encodeURI(z) + "=" + encodeURI(b));
        });
        u += N;
      }
      y(
        a,
        "displayError",
        { chart: n, code: b, message: u, params: J },
        function () {
          if (c) throw Error(u);
          f.console && -1 === g.messages.indexOf(u) && console.warn(u);
        },
      );
      g.messages.push(u);
    }
    function x(b, f) {
      var z = {};
      E(b, function (c, q) {
        if (H(b[q], !0) && !b.nodeType && f[q])
          (c = x(b[q], f[q])), Object.keys(c).length && (z[q] = c);
        else if (H(b[q]) || b[q] !== f[q] || (q in b && !(q in f))) z[q] = b[q];
      });
      return z;
    }
    function F(b, f) {
      return parseInt(b, f || 10);
    }
    function C(b) {
      return "string" === typeof b;
    }
    function B(b) {
      b = Object.prototype.toString.call(b);
      return "[object Array]" === b || "[object Array Iterator]" === b;
    }
    function H(b, f) {
      return !!b && "object" === typeof b && (!f || !B(b));
    }
    function t(b) {
      return H(b) && "number" === typeof b.nodeType;
    }
    function r(b) {
      var f = b && b.constructor;
      return !(!H(b, !0) || t(b) || !f || !f.name || "Object" === f.name);
    }
    function l(b) {
      return (
        "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
      );
    }
    function e(b) {
      return "undefined" !== typeof b && null !== b;
    }
    function d(b, f, c) {
      var z = C(f) && !e(c),
        q,
        n = function (f, c) {
          e(f)
            ? b.setAttribute(c, f)
            : z
              ? (q = b.getAttribute(c)) ||
                "class" !== c ||
                (q = b.getAttribute(c + "Name"))
              : b.removeAttribute(c);
        };
      C(f) ? n(c, f) : E(f, n);
      return q;
    }
    function h(b, f) {
      var c;
      b || (b = {});
      for (c in f) b[c] = f[c];
      return b;
    }
    function m() {
      for (var b = arguments, f = b.length, c = 0; c < f; c++) {
        var J = b[c];
        if ("undefined" !== typeof J && null !== J) return J;
      }
    }
    function k(b, f) {
      a.isMS &&
        !a.svg &&
        f &&
        e(f.opacity) &&
        (f.filter = "alpha(opacity=".concat(100 * f.opacity, ")"));
      h(b.style, f);
    }
    function p(b) {
      return Math.pow(10, Math.floor(Math.log(b) / Math.LN10));
    }
    function D(b, f) {
      return 1e14 < b ? b : parseFloat(b.toPrecision(f || 14));
    }
    function I(b, c, n) {
      var z = a.getStyle || I;
      if ("width" === c)
        return (
          (c = Math.min(b.offsetWidth, b.scrollWidth)),
          (n = b.getBoundingClientRect && b.getBoundingClientRect().width),
          n < c && n >= c - 1 && (c = Math.floor(n)),
          Math.max(
            0,
            c -
              (z(b, "padding-left", !0) || 0) -
              (z(b, "padding-right", !0) || 0),
          )
        );
      if ("height" === c)
        return Math.max(
          0,
          Math.min(b.offsetHeight, b.scrollHeight) -
            (z(b, "padding-top", !0) || 0) -
            (z(b, "padding-bottom", !0) || 0),
        );
      f.getComputedStyle || g(27, !0);
      if ((b = f.getComputedStyle(b, void 0))) {
        var q = b.getPropertyValue(c);
        m(n, "opacity" !== c) && (q = F(q));
      }
      return q;
    }
    function E(b, f, c) {
      for (var z in b)
        Object.hasOwnProperty.call(b, z) && f.call(c || b[z], b[z], z, b);
    }
    function L(b, f, c) {
      function z(f, c) {
        var v = b.removeEventListener || a.removeEventListenerPolyfill;
        v && v.call(b, f, c, !1);
      }
      function q(c) {
        var v;
        if (b.nodeName) {
          if (f) {
            var q = {};
            q[f] = !0;
          } else q = c;
          E(q, function (b, f) {
            if (c[f]) for (v = c[f].length; v--; ) z(f, c[f][v].fn);
          });
        }
      }
      var n = ("function" === typeof b && b.prototype) || b;
      if (Object.hasOwnProperty.call(n, "hcEvents")) {
        var u = n.hcEvents;
        f
          ? ((n = u[f] || []),
            c
              ? ((u[f] = n.filter(function (b) {
                  return c !== b.fn;
                })),
                z(f, c))
              : (q(u), (u[f] = [])))
          : (q(u), delete n.hcEvents);
      }
    }
    function y(b, f, c, J) {
      c = c || {};
      if (w.createEvent && (b.dispatchEvent || (b.fireEvent && b !== a))) {
        var z = w.createEvent("Events");
        z.initEvent(f, !0, !0);
        c = h(z, c);
        b.dispatchEvent ? b.dispatchEvent(c) : b.fireEvent(f, c);
      } else if (b.hcEvents) {
        c.target ||
          h(c, {
            preventDefault: function () {
              c.defaultPrevented = !0;
            },
            target: b,
            type: f,
          });
        z = [];
        for (var q = b, n = !1; q.hcEvents; )
          Object.hasOwnProperty.call(q, "hcEvents") &&
            q.hcEvents[f] &&
            (z.length && (n = !0), z.unshift.apply(z, q.hcEvents[f])),
            (q = Object.getPrototypeOf(q));
        n &&
          z.sort(function (b, f) {
            return b.order - f.order;
          });
        z.forEach(function (f) {
          !1 === f.fn.call(b, c) && c.preventDefault();
        });
      }
      J && !c.defaultPrevented && J.call(b, c);
    }
    var c = a.charts,
      w = a.doc,
      f = a.win;
    (g || (g = {})).messages = [];
    Math.easeInOutSine = function (b) {
      return -0.5 * (Math.cos(Math.PI * b) - 1);
    };
    var n = Array.prototype.find
      ? function (b, f) {
          return b.find(f);
        }
      : function (b, f) {
          var c,
            q = b.length;
          for (c = 0; c < q; c++) if (f(b[c], c)) return b[c];
        };
    E(
      {
        map: "map",
        each: "forEach",
        grep: "filter",
        reduce: "reduce",
        some: "some",
      },
      function (b, f) {
        a[f] = function (c) {
          var q;
          g(
            32,
            !1,
            void 0,
            ((q = {}),
            (q["Highcharts.".concat(f)] = "use Array.".concat(b)),
            q),
          );
          return Array.prototype[b].apply(c, [].slice.call(arguments, 1));
        };
      },
    );
    var b,
      u = (function () {
        var f = Math.random().toString(36).substring(2, 9) + "-",
          c = 0;
        return function () {
          return "highcharts-" + (b ? "" : f) + c++;
        };
      })();
    f.jQuery &&
      (f.jQuery.fn.highcharts = function () {
        var b = [].slice.call(arguments);
        if (this[0])
          return b[0]
            ? (new a[C(b[0]) ? b.shift() : "Chart"](this[0], b[0], b[1]), this)
            : c[d(this[0], "data-highcharts-chart")];
      });
    n = {
      addEvent: function (b, f, c, J) {
        void 0 === J && (J = {});
        var q = ("function" === typeof b && b.prototype) || b;
        Object.hasOwnProperty.call(q, "hcEvents") || (q.hcEvents = {});
        q = q.hcEvents;
        a.Point &&
          b instanceof a.Point &&
          b.series &&
          b.series.chart &&
          (b.series.chart.runTrackerClick = !0);
        var z = b.addEventListener || a.addEventListenerPolyfill;
        z &&
          z.call(
            b,
            f,
            c,
            a.supportsPassiveEvents
              ? {
                  passive:
                    void 0 === J.passive
                      ? -1 !== f.indexOf("touch")
                      : J.passive,
                  capture: !1,
                }
              : !1,
          );
        q[f] || (q[f] = []);
        q[f].push({
          fn: c,
          order: "number" === typeof J.order ? J.order : Infinity,
        });
        q[f].sort(function (b, f) {
          return b.order - f.order;
        });
        return function () {
          L(b, f, c);
        };
      },
      arrayMax: function (b) {
        for (var f = b.length, c = b[0]; f--; ) b[f] > c && (c = b[f]);
        return c;
      },
      arrayMin: function (b) {
        for (var f = b.length, c = b[0]; f--; ) b[f] < c && (c = b[f]);
        return c;
      },
      attr: d,
      clamp: function (b, f, c) {
        return b > f ? (b < c ? b : c) : f;
      },
      cleanRecursively: x,
      clearTimeout: function (b) {
        e(b) && clearTimeout(b);
      },
      correctFloat: D,
      createElement: function (b, f, c, J, n) {
        b = w.createElement(b);
        f && h(b, f);
        n && k(b, { padding: "0", border: "none", margin: "0" });
        c && k(b, c);
        J && J.appendChild(b);
        return b;
      },
      css: k,
      defined: e,
      destroyObjectProperties: function (b, f) {
        E(b, function (c, q) {
          c && c !== f && c.destroy && c.destroy();
          delete b[q];
        });
      },
      discardElement: function (b) {
        b && b.parentElement && b.parentElement.removeChild(b);
      },
      erase: function (b, f) {
        for (var c = b.length; c--; )
          if (b[c] === f) {
            b.splice(c, 1);
            break;
          }
      },
      error: g,
      extend: h,
      extendClass: function (b, f) {
        var c = function () {};
        c.prototype = new b();
        h(c.prototype, f);
        return c;
      },
      find: n,
      fireEvent: y,
      getMagnitude: p,
      getNestedProperty: function (b, c) {
        for (b = b.split("."); b.length && e(c); ) {
          var q = b.shift();
          if ("undefined" === typeof q || "__proto__" === q) return;
          c = c[q];
          if (
            !e(c) ||
            "function" === typeof c ||
            "number" === typeof c.nodeType ||
            c === f
          )
            return;
        }
        return c;
      },
      getStyle: I,
      inArray: function (b, c, f) {
        g(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
        return c.indexOf(b, f);
      },
      isArray: B,
      isClass: r,
      isDOMElement: t,
      isFunction: function (b) {
        return "function" === typeof b;
      },
      isNumber: l,
      isObject: H,
      isString: C,
      keys: function (b) {
        g(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
        return Object.keys(b);
      },
      merge: function () {
        var b,
          c = arguments,
          f = {},
          J = function (b, c) {
            "object" !== typeof b && (b = {});
            E(c, function (f, v) {
              "__proto__" !== v &&
                "constructor" !== v &&
                (!H(f, !0) || r(f) || t(f)
                  ? (b[v] = c[v])
                  : (b[v] = J(b[v] || {}, f)));
            });
            return b;
          };
        !0 === c[0] && ((f = c[1]), (c = Array.prototype.slice.call(c, 2)));
        var n = c.length;
        for (b = 0; b < n; b++) f = J(f, c[b]);
        return f;
      },
      normalizeTickInterval: function (b, c, f, J, n) {
        var q = b;
        f = m(f, p(b));
        var u = b / f;
        c ||
          ((c = n
            ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
            : [1, 2, 2.5, 5, 10]),
          !1 === J &&
            (1 === f
              ? (c = c.filter(function (b) {
                  return 0 === b % 1;
                }))
              : 0.1 >= f && (c = [1 / f])));
        for (
          J = 0;
          J < c.length &&
          !((q = c[J]),
          (n && q * f >= b) || (!n && u <= (c[J] + (c[J + 1] || c[J])) / 2));
          J++
        );
        return (q = D(q * f, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: E,
      offset: function (b) {
        var c = w.documentElement;
        b =
          b.parentElement || b.parentNode
            ? b.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        return {
          top: b.top + (f.pageYOffset || c.scrollTop) - (c.clientTop || 0),
          left: b.left + (f.pageXOffset || c.scrollLeft) - (c.clientLeft || 0),
          width: b.width,
          height: b.height,
        };
      },
      pad: function (b, c, f) {
        return (
          Array((c || 2) + 1 - String(b).replace("-", "").length).join(
            f || "0",
          ) + b
        );
      },
      pick: m,
      pInt: F,
      relativeLength: function (b, c, f) {
        return /%$/.test(b)
          ? (c * parseFloat(b)) / 100 + (f || 0)
          : parseFloat(b);
      },
      removeEvent: L,
      splat: function (b) {
        return B(b) ? b : [b];
      },
      stableSort: function (b, c) {
        var f = b.length,
          J,
          n;
        for (n = 0; n < f; n++) b[n].safeI = n;
        b.sort(function (b, f) {
          J = c(b, f);
          return 0 === J ? b.safeI - f.safeI : J;
        });
        for (n = 0; n < f; n++) delete b[n].safeI;
      },
      syncTimeout: function (b, c, f) {
        if (0 < c) return setTimeout(b, c, f);
        b.call(0, f);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: u,
      useSerialIds: function (c) {
        return (b = m(c, b));
      },
      wrap: function (b, c, f) {
        var n = b[c];
        b[c] = function () {
          var b = arguments,
            c = this;
          return f.apply(
            this,
            [
              function () {
                return n.apply(c, arguments.length ? arguments : b);
              },
            ].concat([].slice.call(arguments)),
          );
        };
      },
    };
    ("");
    return n;
  });
  K(g, "Core/Chart/ChartDefaults.js", [], function () {
    return {
      alignThresholds: !1,
      panning: { enabled: !1, type: "x" },
      styledMode: !1,
      borderRadius: 0,
      colorCount: 10,
      allowMutatingData: !0,
      defaultSeriesType: "line",
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: { zIndex: 6 },
        position: { align: "right", x: -10, y: 10 },
      },
      zoomBySingleTouch: !1,
      zooming: {
        singleTouch: !1,
        resetButton: {
          theme: { zIndex: 6 },
          position: { align: "right", x: -10, y: 10 },
        },
      },
      width: null,
      height: null,
      borderColor: "#335cad",
      backgroundColor: "#ffffff",
      plotBorderColor: "#cccccc",
    };
  });
  K(
    g,
    "Core/Color/Color.js",
    [g["Core/Globals.js"], g["Core/Utilities.js"]],
    function (a, g) {
      var A = g.isNumber,
        F = g.merge,
        C = g.pInt;
      g = (function () {
        function g(A) {
          this.rgba = [NaN, NaN, NaN, NaN];
          this.input = A;
          var t = a.Color;
          if (t && t !== g) return new t(A);
          if (!(this instanceof g)) return new g(A);
          this.init(A);
        }
        g.parse = function (a) {
          return a ? new g(a) : g.None;
        };
        g.prototype.init = function (a) {
          var t;
          if ("object" === typeof a && "undefined" !== typeof a.stops)
            this.stops = a.stops.map(function (d) {
              return new g(d[1]);
            });
          else if ("string" === typeof a) {
            this.input = a = g.names[a.toLowerCase()] || a;
            if ("#" === a.charAt(0)) {
              var r = a.length;
              var l = parseInt(a.substr(1), 16);
              7 === r
                ? (t = [(l & 16711680) >> 16, (l & 65280) >> 8, l & 255, 1])
                : 4 === r &&
                  (t = [
                    ((l & 3840) >> 4) | ((l & 3840) >> 8),
                    ((l & 240) >> 4) | (l & 240),
                    ((l & 15) << 4) | (l & 15),
                    1,
                  ]);
            }
            if (!t)
              for (l = g.parsers.length; l-- && !t; ) {
                var e = g.parsers[l];
                (r = e.regex.exec(a)) && (t = e.parse(r));
              }
          }
          t && (this.rgba = t);
        };
        g.prototype.get = function (a) {
          var t = this.input,
            r = this.rgba;
          if ("object" === typeof t && "undefined" !== typeof this.stops) {
            var l = F(t);
            l.stops = [].slice.call(l.stops);
            this.stops.forEach(function (e, d) {
              l.stops[d] = [l.stops[d][0], e.get(a)];
            });
            return l;
          }
          return r && A(r[0])
            ? "rgb" === a || (!a && 1 === r[3])
              ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")"
              : "a" === a
                ? "".concat(r[3])
                : "rgba(" + r.join(",") + ")"
            : t;
        };
        g.prototype.brighten = function (a) {
          var t = this.rgba;
          if (this.stops)
            this.stops.forEach(function (l) {
              l.brighten(a);
            });
          else if (A(a) && 0 !== a)
            for (var r = 0; 3 > r; r++)
              (t[r] += C(255 * a)),
                0 > t[r] && (t[r] = 0),
                255 < t[r] && (t[r] = 255);
          return this;
        };
        g.prototype.setOpacity = function (a) {
          this.rgba[3] = a;
          return this;
        };
        g.prototype.tweenTo = function (a, t) {
          var r = this.rgba,
            l = a.rgba;
          if (!A(r[0]) || !A(l[0])) return a.input || "none";
          a = 1 !== l[3] || 1 !== r[3];
          return (
            (a ? "rgba(" : "rgb(") +
            Math.round(l[0] + (r[0] - l[0]) * (1 - t)) +
            "," +
            Math.round(l[1] + (r[1] - l[1]) * (1 - t)) +
            "," +
            Math.round(l[2] + (r[2] - l[2]) * (1 - t)) +
            (a ? "," + (l[3] + (r[3] - l[3]) * (1 - t)) : "") +
            ")"
          );
        };
        g.names = { white: "#ffffff", black: "#000000" };
        g.parsers = [
          {
            regex:
              /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            parse: function (a) {
              return [C(a[1]), C(a[2]), C(a[3]), parseFloat(a[4], 10)];
            },
          },
          {
            regex:
              /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function (a) {
              return [C(a[1]), C(a[2]), C(a[3]), 1];
            },
          },
        ];
        g.None = new g("");
        return g;
      })();
      ("");
      return g;
    },
  );
  K(g, "Core/Color/Palettes.js", [], function () {
    return {
      colors:
        "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(
          " ",
        ),
    };
  });
  K(
    g,
    "Core/Time.js",
    [g["Core/Globals.js"], g["Core/Utilities.js"]],
    function (a, g) {
      var A = a.win,
        F = g.defined,
        C = g.error,
        B = g.extend,
        H = g.isObject,
        t = g.merge,
        r = g.objectEach,
        l = g.pad,
        e = g.pick,
        d = g.splat,
        h = g.timeUnits,
        m = a.isSafari && A.Intl && A.Intl.DateTimeFormat.prototype.formatRange,
        k =
          a.isSafari && A.Intl && !A.Intl.DateTimeFormat.prototype.formatRange;
      g = (function () {
        function p(d) {
          this.options = {};
          this.variableTimezone = this.useUTC = !1;
          this.Date = A.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(d);
        }
        p.prototype.get = function (d, e) {
          if (this.variableTimezone || this.timezoneOffset) {
            var h = e.getTime(),
              k = h - this.getTimezoneOffset(e);
            e.setTime(k);
            d = e["getUTC" + d]();
            e.setTime(h);
            return d;
          }
          return this.useUTC ? e["getUTC" + d]() : e["get" + d]();
        };
        p.prototype.set = function (d, e, h) {
          if (this.variableTimezone || this.timezoneOffset) {
            if (
              "Milliseconds" === d ||
              "Seconds" === d ||
              ("Minutes" === d && 0 === this.getTimezoneOffset(e) % 36e5)
            )
              return e["setUTC" + d](h);
            var k = this.getTimezoneOffset(e);
            k = e.getTime() - k;
            e.setTime(k);
            e["setUTC" + d](h);
            d = this.getTimezoneOffset(e);
            k = e.getTime() + d;
            return e.setTime(k);
          }
          return this.useUTC || (m && "FullYear" === d)
            ? e["setUTC" + d](h)
            : e["set" + d](h);
        };
        p.prototype.update = function (d) {
          void 0 === d && (d = {});
          var h = e(d.useUTC, !0);
          this.options = d = t(!0, this.options, d);
          this.Date = d.Date || A.Date || Date;
          this.timezoneOffset =
            ((this.useUTC = h) && d.timezoneOffset) || void 0;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = h && !(!d.getTimezoneOffset && !d.timezone);
        };
        p.prototype.makeTime = function (d, h, m, p, y, c) {
          if (this.useUTC) {
            var w = this.Date.UTC.apply(0, arguments);
            var f = this.getTimezoneOffset(w);
            w += f;
            var n = this.getTimezoneOffset(w);
            f !== n
              ? (w += n - f)
              : f - 36e5 !== this.getTimezoneOffset(w - 36e5) ||
                k ||
                (w -= 36e5);
          } else
            w = new this.Date(
              d,
              h,
              e(m, 1),
              e(p, 0),
              e(y, 0),
              e(c, 0),
            ).getTime();
          return w;
        };
        p.prototype.timezoneOffsetFunction = function () {
          var d = this,
            e = this.options,
            h = e.getTimezoneOffset,
            k = e.moment || A.moment;
          if (!this.useUTC)
            return function (d) {
              return 6e4 * new Date(d.toString()).getTimezoneOffset();
            };
          if (e.timezone) {
            if (k)
              return function (d) {
                return 6e4 * -k.tz(d, e.timezone).utcOffset();
              };
            C(25);
          }
          return this.useUTC && h
            ? function (d) {
                return 6e4 * h(d.valueOf());
              }
            : function () {
                return 6e4 * (d.timezoneOffset || 0);
              };
        };
        p.prototype.dateFormat = function (d, h, k) {
          if (!F(h) || isNaN(h))
            return (
              (a.defaultOptions.lang && a.defaultOptions.lang.invalidDate) || ""
            );
          d = e(d, "%Y-%m-%d %H:%M:%S");
          var m = this,
            p = new this.Date(h),
            c = this.get("Hours", p),
            w = this.get("Day", p),
            f = this.get("Date", p),
            n = this.get("Month", p),
            b = this.get("FullYear", p),
            u = a.defaultOptions.lang,
            z = u && u.weekdays,
            q = u && u.shortWeekdays;
          p = B(
            {
              a: q ? q[w] : z[w].substr(0, 3),
              A: z[w],
              d: l(f),
              e: l(f, 2, " "),
              w: w,
              b: u.shortMonths[n],
              B: u.months[n],
              m: l(n + 1),
              o: n + 1,
              y: b.toString().substr(2, 2),
              Y: b,
              H: l(c),
              k: c,
              I: l(c % 12 || 12),
              l: c % 12 || 12,
              M: l(this.get("Minutes", p)),
              p: 12 > c ? "AM" : "PM",
              P: 12 > c ? "am" : "pm",
              S: l(p.getSeconds()),
              L: l(Math.floor(h % 1e3), 3),
            },
            a.dateFormats,
          );
          r(p, function (b, c) {
            for (; -1 !== d.indexOf("%" + c); )
              d = d.replace(
                "%" + c,
                "function" === typeof b ? b.call(m, h) : b,
              );
          });
          return k ? d.substr(0, 1).toUpperCase() + d.substr(1) : d;
        };
        p.prototype.resolveDTLFormat = function (e) {
          return H(e, !0)
            ? e
            : ((e = d(e)), { main: e[0], from: e[1], to: e[2] });
        };
        p.prototype.getTimeTicks = function (d, k, p, m) {
          var y = this,
            c = [],
            w = {},
            f = new y.Date(k),
            n = d.unitRange,
            b = d.count || 1,
            u;
          m = e(m, 1);
          if (F(k)) {
            y.set(
              "Milliseconds",
              f,
              n >= h.second ? 0 : b * Math.floor(y.get("Milliseconds", f) / b),
            );
            n >= h.second &&
              y.set(
                "Seconds",
                f,
                n >= h.minute ? 0 : b * Math.floor(y.get("Seconds", f) / b),
              );
            n >= h.minute &&
              y.set(
                "Minutes",
                f,
                n >= h.hour ? 0 : b * Math.floor(y.get("Minutes", f) / b),
              );
            n >= h.hour &&
              y.set(
                "Hours",
                f,
                n >= h.day ? 0 : b * Math.floor(y.get("Hours", f) / b),
              );
            n >= h.day &&
              y.set(
                "Date",
                f,
                n >= h.month
                  ? 1
                  : Math.max(1, b * Math.floor(y.get("Date", f) / b)),
              );
            if (n >= h.month) {
              y.set(
                "Month",
                f,
                n >= h.year ? 0 : b * Math.floor(y.get("Month", f) / b),
              );
              var z = y.get("FullYear", f);
            }
            n >= h.year && y.set("FullYear", f, z - (z % b));
            n === h.week &&
              ((z = y.get("Day", f)),
              y.set("Date", f, y.get("Date", f) - z + m + (z < m ? -7 : 0)));
            z = y.get("FullYear", f);
            m = y.get("Month", f);
            var q = y.get("Date", f),
              N = y.get("Hours", f);
            k = f.getTime();
            (!y.variableTimezone && y.useUTC) ||
              !F(p) ||
              (u =
                p - k > 4 * h.month ||
                y.getTimezoneOffset(k) !== y.getTimezoneOffset(p));
            k = f.getTime();
            for (f = 1; k < p; )
              c.push(k),
                (k =
                  n === h.year
                    ? y.makeTime(z + f * b, 0)
                    : n === h.month
                      ? y.makeTime(z, m + f * b)
                      : !u || (n !== h.day && n !== h.week)
                        ? u && n === h.hour && 1 < b
                          ? y.makeTime(z, m, q, N + f * b)
                          : k + n * b
                        : y.makeTime(z, m, q + f * b * (n === h.day ? 1 : 7))),
                f++;
            c.push(k);
            n <= h.hour &&
              1e4 > c.length &&
              c.forEach(function (b) {
                0 === b % 18e5 &&
                  "000000000" === y.dateFormat("%H%M%S%L", b) &&
                  (w[b] = "day");
              });
          }
          c.info = B(d, { higherRanks: w, totalRange: n * b });
          return c;
        };
        p.prototype.getDateFormat = function (d, e, k, p) {
          var m = this.dateFormat("%m-%d %H:%M:%S.%L", e),
            c = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
            w = "millisecond";
          for (f in h) {
            if (
              d === h.week &&
              +this.dateFormat("%w", e) === k &&
              "00:00:00.000" === m.substr(6)
            ) {
              var f = "week";
              break;
            }
            if (h[f] > d) {
              f = w;
              break;
            }
            if (c[f] && m.substr(c[f]) !== "01-01 00:00:00.000".substr(c[f]))
              break;
            "week" !== f && (w = f);
          }
          return this.resolveDTLFormat(p[f]).main;
        };
        return p;
      })();
      ("");
      return g;
    },
  );
  K(
    g,
    "Core/Defaults.js",
    [
      g["Core/Chart/ChartDefaults.js"],
      g["Core/Color/Color.js"],
      g["Core/Globals.js"],
      g["Core/Color/Palettes.js"],
      g["Core/Time.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C, B) {
      g = g.parse;
      var A = B.merge,
        t = {
          colors: F.colors,
          symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
          lang: {
            loading: "Loading...",
            months:
              "January February March April May June July August September October November December".split(
                " ",
              ),
            shortMonths:
              "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays:
              "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                " ",
              ),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " ",
          },
          global: {},
          time: {
            Date: void 0,
            getTimezoneOffset: void 0,
            timezone: void 0,
            timezoneOffset: 0,
            useUTC: !0,
          },
          chart: a,
          title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            widthAdjust: -44,
          },
          subtitle: { text: "", align: "center", widthAdjust: -44 },
          caption: {
            margin: 15,
            text: "",
            align: "left",
            verticalAlign: "bottom",
          },
          plotOptions: {},
          labels: { style: { position: "absolute", color: "#333333" } },
          legend: {
            enabled: !0,
            align: "center",
            alignColumns: !0,
            className: "highcharts-no-tooltip",
            layout: "horizontal",
            labelFormatter: function () {
              return this.name;
            },
            borderColor: "#999999",
            borderRadius: 0,
            navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
            itemStyle: {
              color: "#333333",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              textOverflow: "ellipsis",
            },
            itemHoverStyle: { color: "#000000" },
            itemHiddenStyle: { color: "#cccccc" },
            shadow: !1,
            itemCheckboxStyle: {
              position: "absolute",
              width: "13px",
              height: "13px",
            },
            squareSymbol: !0,
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: { style: { fontWeight: "bold" } },
          },
          loading: {
            labelStyle: {
              fontWeight: "bold",
              position: "relative",
              top: "45%",
            },
            style: {
              position: "absolute",
              backgroundColor: "#ffffff",
              opacity: 0.5,
              textAlign: "center",
            },
          },
          tooltip: {
            enabled: !0,
            animation: x.svg,
            borderRadius: 3,
            dateTimeLabelFormats: {
              millisecond: "%A, %b %e, %H:%M:%S.%L",
              second: "%A, %b %e, %H:%M:%S",
              minute: "%A, %b %e, %H:%M",
              hour: "%A, %b %e, %H:%M",
              day: "%A, %b %e, %Y",
              week: "Week from %A, %b %e, %Y",
              month: "%B %Y",
              year: "%Y",
            },
            footerFormat: "",
            headerShape: "callout",
            hideDelay: 500,
            padding: 8,
            shape: "callout",
            shared: !1,
            snap: x.isTouchDevice ? 25 : 10,
            headerFormat:
              '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            backgroundColor: g("#f7f7f7").setOpacity(0.85).get(),
            borderWidth: 1,
            shadow: !0,
            stickOnContact: !1,
            style: {
              color: "#333333",
              cursor: "default",
              fontSize: "12px",
              whiteSpace: "nowrap",
            },
            useHTML: !1,
          },
          credits: {
            enabled: !0,
            href: "https://www.highcharts.com?credits",
            position: {
              align: "right",
              x: -10,
              verticalAlign: "bottom",
              y: -5,
            },
            style: { cursor: "pointer", color: "#999999", fontSize: "9px" },
            text: "Highcharts.com",
          },
        };
      t.chart.styledMode = !1;
      ("");
      var r = new C(A(t.global, t.time));
      a = {
        defaultOptions: t,
        defaultTime: r,
        getOptions: function () {
          return t;
        },
        setOptions: function (l) {
          A(!0, t, l);
          if (l.time || l.global)
            x.time
              ? x.time.update(A(t.global, t.time, l.global, l.time))
              : (x.time = r);
          return t;
        },
      };
      ("");
      return a;
    },
  );
  K(
    g,
    "Core/Animation/Fx.js",
    [g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Utilities.js"]],
    function (a, g, x) {
      var A = a.parse,
        C = g.win,
        B = x.isNumber,
        H = x.objectEach;
      return (function () {
        function a(a, l, e) {
          this.pos = NaN;
          this.options = l;
          this.elem = a;
          this.prop = e;
        }
        a.prototype.dSetter = function () {
          var a = this.paths,
            l = a && a[0];
          a = a && a[1];
          var e = this.now || 0,
            d = [];
          if (1 !== e && l && a)
            if (l.length === a.length && 1 > e)
              for (var h = 0; h < a.length; h++) {
                for (var m = l[h], k = a[h], p = [], D = 0; D < k.length; D++) {
                  var I = m[D],
                    E = k[D];
                  B(I) && B(E) && ("A" !== k[0] || (4 !== D && 5 !== D))
                    ? (p[D] = I + e * (E - I))
                    : (p[D] = E);
                }
                d.push(p);
              }
            else d = a;
          else d = this.toD || [];
          this.elem.attr("d", d, void 0, !0);
        };
        a.prototype.update = function () {
          var a = this.elem,
            l = this.prop,
            e = this.now,
            d = this.options.step;
          if (this[l + "Setter"]) this[l + "Setter"]();
          else
            a.attr
              ? a.element && a.attr(l, e, null, !0)
              : (a.style[l] = e + this.unit);
          d && d.call(a, e, this);
        };
        a.prototype.run = function (r, l, e) {
          var d = this,
            h = d.options,
            m = function (e) {
              return m.stopped ? !1 : d.step(e);
            },
            k =
              C.requestAnimationFrame ||
              function (d) {
                setTimeout(d, 13);
              },
            p = function () {
              for (var d = 0; d < a.timers.length; d++)
                a.timers[d]() || a.timers.splice(d--, 1);
              a.timers.length && k(p);
            };
          r !== l || this.elem["forceAnimate:" + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = r),
              (this.end = l),
              (this.unit = e),
              (this.now = this.start),
              (this.pos = 0),
              (m.elem = this.elem),
              (m.prop = this.prop),
              m() && 1 === a.timers.push(m) && k(p))
            : (delete h.curAnim[this.prop],
              h.complete &&
                0 === Object.keys(h.curAnim).length &&
                h.complete.call(this.elem));
        };
        a.prototype.step = function (a) {
          var l = +new Date(),
            e = this.options,
            d = this.elem,
            h = e.complete,
            m = e.duration,
            k = e.curAnim;
          if (d.attr && !d.element) a = !1;
          else if (a || l >= m + this.startTime) {
            this.now = this.end;
            this.pos = 1;
            this.update();
            var p = (k[this.prop] = !0);
            H(k, function (d) {
              !0 !== d && (p = !1);
            });
            p && h && h.call(d);
            a = !1;
          } else
            (this.pos = e.easing((l - this.startTime) / m)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (a = !0);
          return a;
        };
        a.prototype.initPath = function (a, l, e) {
          function d(d, c) {
            for (; d.length < L; ) {
              var e = d[0],
                f = c[L - d.length];
              f &&
                "M" === e[0] &&
                (d[0] =
                  "C" === f[0]
                    ? ["C", e[1], e[2], e[1], e[2], e[1], e[2]]
                    : ["L", e[1], e[2]]);
              d.unshift(e);
              p && ((e = d.pop()), d.push(d[d.length - 1], e));
            }
          }
          function h(d, c) {
            for (; d.length < L; )
              if (
                ((c = d[Math.floor(d.length / D) - 1].slice()),
                "C" === c[0] && ((c[1] = c[5]), (c[2] = c[6])),
                p)
              ) {
                var e = d[Math.floor(d.length / D)].slice();
                d.splice(d.length / 2, 0, c, e);
              } else d.push(c);
          }
          var m = a.startX,
            k = a.endX;
          e = e.slice();
          var p = a.isArea,
            D = p ? 2 : 1;
          l = l && l.slice();
          if (!l) return [e, e];
          if (m && k && k.length) {
            for (a = 0; a < m.length; a++)
              if (m[a] === k[0]) {
                var I = a;
                break;
              } else if (m[0] === k[k.length - m.length + a]) {
                I = a;
                var E = !0;
                break;
              } else if (m[m.length - 1] === k[k.length - m.length + a]) {
                I = m.length - a;
                break;
              }
            "undefined" === typeof I && (l = []);
          }
          if (l.length && B(I)) {
            var L = e.length + I * D;
            E ? (d(l, e), h(e, l)) : (d(e, l), h(l, e));
          }
          return [l, e];
        };
        a.prototype.fillSetter = function () {
          a.prototype.strokeSetter.apply(this, arguments);
        };
        a.prototype.strokeSetter = function () {
          this.elem.attr(
            this.prop,
            A(this.start).tweenTo(A(this.end), this.pos),
            void 0,
            !0,
          );
        };
        a.timers = [];
        return a;
      })();
    },
  );
  K(
    g,
    "Core/Animation/AnimationUtilities.js",
    [g["Core/Animation/Fx.js"], g["Core/Utilities.js"]],
    function (a, g) {
      function A(d) {
        return r(d)
          ? l({ duration: 500, defer: 0 }, d)
          : { duration: d ? 500 : 0, defer: 0 };
      }
      function F(d, e) {
        for (var k = a.timers.length; k--; )
          a.timers[k].elem !== d ||
            (e && e !== a.timers[k].prop) ||
            (a.timers[k].stopped = !0);
      }
      var C = g.defined,
        B = g.getStyle,
        H = g.isArray,
        t = g.isNumber,
        r = g.isObject,
        l = g.merge,
        e = g.objectEach,
        d = g.pick;
      return {
        animate: function (d, m, k) {
          var p,
            h = "",
            I,
            E;
          if (!r(k)) {
            var g = arguments;
            k = { duration: g[2], easing: g[3], complete: g[4] };
          }
          t(k.duration) || (k.duration = 400);
          k.easing =
            "function" === typeof k.easing
              ? k.easing
              : Math[k.easing] || Math.easeInOutSine;
          k.curAnim = l(m);
          e(m, function (e, c) {
            F(d, c);
            E = new a(d, k, c);
            I = void 0;
            "d" === c && H(m.d)
              ? ((E.paths = E.initPath(d, d.pathArray, m.d)),
                (E.toD = m.d),
                (p = 0),
                (I = 1))
              : d.attr
                ? (p = d.attr(c))
                : ((p = parseFloat(B(d, c)) || 0),
                  "opacity" !== c && (h = "px"));
            I || (I = e);
            "string" === typeof I &&
              I.match("px") &&
              (I = I.replace(/px/g, ""));
            E.run(p, I, h);
          });
        },
        animObject: A,
        getDeferredAnimation: function (d, e, k) {
          var p = A(e),
            h = 0,
            m = 0;
          (k ? [k] : d.series).forEach(function (d) {
            d = A(d.options.animation);
            h = e && C(e.defer) ? p.defer : Math.max(h, d.duration + d.defer);
            m = Math.min(p.duration, d.duration);
          });
          d.renderer.forExport && (h = 0);
          return { defer: Math.max(0, h - m), duration: Math.min(h, m) };
        },
        setAnimation: function (e, m) {
          m.renderer.globalAnimation = d(e, m.options.chart.animation, !0);
        },
        stop: F,
      };
    },
  );
  K(
    g,
    "Core/Renderer/HTML/AST.js",
    [g["Core/Globals.js"], g["Core/Utilities.js"]],
    function (a, g) {
      var A = a.SVG_NS,
        F = g.attr,
        C = g.createElement,
        B = g.css,
        H = g.error,
        t = g.isFunction,
        r = g.isString,
        l = g.objectEach,
        e = g.splat,
        d =
          (g = a.win.trustedTypes) &&
          t(g.createPolicy) &&
          g.createPolicy("highcharts", {
            createHTML: function (d) {
              return d;
            },
          }),
        h = d ? d.createHTML("") : "";
      try {
        var m = !!new DOMParser().parseFromString(h, "text/html");
      } catch (k) {
        m = !1;
      }
      t = (function () {
        function k(d) {
          this.nodes = "string" === typeof d ? this.parseMarkup(d) : d;
        }
        k.filterUserAttributes = function (d) {
          l(d, function (e, h) {
            var m = !0;
            -1 === k.allowedAttributes.indexOf(h) && (m = !1);
            -1 !==
              ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(h) &&
              (m =
                r(e) &&
                k.allowedReferences.some(function (d) {
                  return 0 === e.indexOf(d);
                }));
            m ||
              (H(33, !1, void 0, {
                "Invalid attribute in config": "".concat(h),
              }),
              delete d[h]);
            r(e) && d[h] && (d[h] = e.replace(/</g, "&lt;"));
          });
          return d;
        };
        k.parseStyle = function (d) {
          return d.split(";").reduce(function (d, e) {
            e = e.split(":").map(function (d) {
              return d.trim();
            });
            var k = e.shift();
            k &&
              e.length &&
              (d[
                k.replace(/-([a-z])/g, function (d) {
                  return d[1].toUpperCase();
                })
              ] = e.join(":"));
            return d;
          }, {});
        };
        k.setElementHTML = function (d, e) {
          d.innerHTML = k.emptyHTML;
          e && new k(e).addToDOM(d);
        };
        k.prototype.addToDOM = function (d) {
          function h(d, m) {
            var p;
            e(d).forEach(function (d) {
              var c = d.tagName,
                e = d.textContent
                  ? a.doc.createTextNode(d.textContent)
                  : void 0,
                f = k.bypassHTMLFiltering;
              if (c)
                if ("#text" === c) var n = e;
                else if (-1 !== k.allowedTags.indexOf(c) || f) {
                  c = a.doc.createElementNS(
                    "svg" === c ? A : m.namespaceURI || A,
                    c,
                  );
                  var b = d.attributes || {};
                  l(d, function (c, f) {
                    "tagName" !== f &&
                      "attributes" !== f &&
                      "children" !== f &&
                      "style" !== f &&
                      "textContent" !== f &&
                      (b[f] = c);
                  });
                  F(c, f ? b : k.filterUserAttributes(b));
                  d.style && B(c, d.style);
                  e && c.appendChild(e);
                  h(d.children || [], c);
                  n = c;
                } else H(33, !1, void 0, { "Invalid tagName in config": c });
              n && m.appendChild(n);
              p = n;
            });
            return p;
          }
          return h(this.nodes, d);
        };
        k.prototype.parseMarkup = function (e) {
          var h = [];
          e = e.trim().replace(/ style=(["'])/g, " data-style=$1");
          if (m)
            e = new DOMParser().parseFromString(
              d ? d.createHTML(e) : e,
              "text/html",
            );
          else {
            var p = C("div");
            p.innerHTML = e;
            e = { body: p };
          }
          var a = function (d, e) {
            var c = d.nodeName.toLowerCase(),
              h = { tagName: c };
            "#text" === c && (h.textContent = d.textContent || "");
            if ((c = d.attributes)) {
              var f = {};
              [].forEach.call(c, function (b) {
                "data-style" === b.name
                  ? (h.style = k.parseStyle(b.value))
                  : (f[b.name] = b.value);
              });
              h.attributes = f;
            }
            if (d.childNodes.length) {
              var n = [];
              [].forEach.call(d.childNodes, function (b) {
                a(b, n);
              });
              n.length && (h.children = n);
            }
            e.push(h);
          };
          [].forEach.call(e.body.childNodes, function (d) {
            return a(d, h);
          });
          return h;
        };
        k.allowedAttributes =
          "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(
            " ",
          );
        k.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
        k.allowedTags =
          "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(
            " ",
          );
        k.emptyHTML = h;
        k.bypassHTMLFiltering = !1;
        return k;
      })();
      ("");
      return t;
    },
  );
  K(
    g,
    "Core/FormatUtilities.js",
    [g["Core/Defaults.js"], g["Core/Utilities.js"]],
    function (a, g) {
      function A(a, e, d, h) {
        a = +a || 0;
        e = +e;
        var m = F.lang,
          k = (a.toString().split(".")[1] || "").split("e")[0].length,
          p = a.toString().split("e"),
          l = e;
        if (-1 === e) e = Math.min(k, 20);
        else if (!H(e)) e = 2;
        else if (e && p[1] && 0 > p[1]) {
          var g = e + +p[1];
          0 <= g
            ? ((p[0] = (+p[0]).toExponential(g).split("e")[0]), (e = g))
            : ((p[0] = p[0].split(".")[0] || 0),
              (a = 20 > e ? (p[0] * Math.pow(10, p[1])).toFixed(e) : 0),
              (p[1] = 0));
        }
        g = (
          Math.abs(p[1] ? p[0] : a) + Math.pow(10, -Math.max(e, k) - 1)
        ).toFixed(e);
        k = String(r(g));
        var E = 3 < k.length ? k.length % 3 : 0;
        d = t(d, m.decimalPoint);
        h = t(h, m.thousandsSep);
        a = (0 > a ? "-" : "") + (E ? k.substr(0, E) + h : "");
        a =
          0 > +p[1] && !l
            ? "0"
            : a + k.substr(E).replace(/(\d{3})(?=\d)/g, "$1" + h);
        e && (a += d + g.slice(-e));
        p[1] && 0 !== +a && (a += "e" + p[1]);
        return a;
      }
      var F = a.defaultOptions,
        C = a.defaultTime,
        B = g.getNestedProperty,
        H = g.isNumber,
        t = g.pick,
        r = g.pInt;
      return {
        dateFormat: function (a, e, d) {
          return C.dateFormat(a, e, d);
        },
        format: function (a, e, d) {
          var h = "{",
            m = !1,
            k = /f$/,
            p = /\.([0-9])/,
            l = F.lang,
            g = (d && d.time) || C;
          d = (d && d.numberFormatter) || A;
          for (var E = []; a; ) {
            var t = a.indexOf(h);
            if (-1 === t) break;
            var y = a.slice(0, t);
            if (m) {
              y = y.split(":");
              h = B(y.shift() || "", e);
              if (y.length && "number" === typeof h)
                if (((y = y.join(":")), k.test(y))) {
                  var c = parseInt((y.match(p) || ["", "-1"])[1], 10);
                  null !== h &&
                    (h = d(
                      h,
                      c,
                      l.decimalPoint,
                      -1 < y.indexOf(",") ? l.thousandsSep : "",
                    ));
                } else h = g.dateFormat(y, h);
              E.push(h);
            } else E.push(y);
            a = a.slice(t + 1);
            h = (m = !m) ? "}" : "{";
          }
          E.push(a);
          return E.join("");
        },
        numberFormat: A,
      };
    },
  );
  K(
    g,
    "Core/Renderer/RendererUtilities.js",
    [g["Core/Utilities.js"]],
    function (a) {
      var g = a.clamp,
        x = a.pick,
        F = a.stableSort,
        C;
      (function (a) {
        function A(a, r, l) {
          var e = a,
            d = e.reducedLen || r,
            h = function (d, e) {
              return (e.rank || 0) - (d.rank || 0);
            },
            m = function (d, e) {
              return d.target - e.target;
            },
            k,
            p = !0,
            D = [],
            I = 0;
          for (k = a.length; k--; ) I += a[k].size;
          if (I > d) {
            F(a, h);
            for (I = k = 0; I <= d; ) (I += a[k].size), k++;
            D = a.splice(k - 1, a.length);
          }
          F(a, m);
          for (
            a = a.map(function (d) {
              return {
                size: d.size,
                targets: [d.target],
                align: x(d.align, 0.5),
              };
            });
            p;

          ) {
            for (k = a.length; k--; )
              (d = a[k]),
                (h =
                  (Math.min.apply(0, d.targets) +
                    Math.max.apply(0, d.targets)) /
                  2),
                (d.pos = g(h - d.size * d.align, 0, r - d.size));
            k = a.length;
            for (p = !1; k--; )
              0 < k &&
                a[k - 1].pos + a[k - 1].size > a[k].pos &&
                ((a[k - 1].size += a[k].size),
                (a[k - 1].targets = a[k - 1].targets.concat(a[k].targets)),
                (a[k - 1].align = 0.5),
                a[k - 1].pos + a[k - 1].size > r &&
                  (a[k - 1].pos = r - a[k - 1].size),
                a.splice(k, 1),
                (p = !0));
          }
          e.push.apply(e, D);
          k = 0;
          a.some(function (d) {
            var h = 0;
            return (d.targets || []).some(function () {
              e[k].pos = d.pos + h;
              if (
                "undefined" !== typeof l &&
                Math.abs(e[k].pos - e[k].target) > l
              )
                return (
                  e.slice(0, k + 1).forEach(function (d) {
                    return delete d.pos;
                  }),
                  (e.reducedLen = (e.reducedLen || r) - 0.1 * r),
                  e.reducedLen > 0.1 * r && A(e, r, l),
                  !0
                );
              h += e[k].size;
              k++;
              return !1;
            });
          });
          F(e, m);
          return e;
        }
        a.distribute = A;
      })(C || (C = {}));
      return C;
    },
  );
  K(
    g,
    "Core/Renderer/SVG/SVGElement.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Color/Color.js"],
      g["Core/Globals.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F) {
      var A = a.animate,
        B = a.animObject,
        H = a.stop,
        t = x.deg2rad,
        r = x.doc,
        l = x.svg,
        e = x.SVG_NS,
        d = x.win,
        h = F.addEvent,
        m = F.attr,
        k = F.createElement,
        p = F.css,
        D = F.defined,
        I = F.erase,
        E = F.extend,
        L = F.fireEvent,
        y = F.isArray,
        c = F.isFunction,
        w = F.isString,
        f = F.merge,
        n = F.objectEach,
        b = F.pick,
        u = F.pInt,
        z = F.syncTimeout,
        q = F.uniqueKey;
      a = (function () {
        function a() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = e;
          this.symbolCustomAttribs =
            "x y width height r start end innerR anchorX anchorY rounded".split(
              " ",
            );
        }
        a.prototype._defaultGetter = function (c) {
          c = b(
            this[c + "Value"],
            this[c],
            this.element ? this.element.getAttribute(c) : null,
            0,
          );
          /^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
          return c;
        };
        a.prototype._defaultSetter = function (b, c, f) {
          f.setAttribute(c, b);
        };
        a.prototype.add = function (b) {
          var c = this.renderer,
            f = this.element;
          b && (this.parentGroup = b);
          "undefined" !== typeof this.textStr &&
            "text" === this.element.nodeName &&
            c.buildText(this);
          this.added = !0;
          if (!b || b.handleZ || this.zIndex) var d = this.zIndexSetter();
          d || (b ? b.element : c.box).appendChild(f);
          if (this.onAdd) this.onAdd();
          return this;
        };
        a.prototype.addClass = function (b, c) {
          var f = c ? "" : this.attr("class") || "";
          b = (b || "")
            .split(/ /g)
            .reduce(
              function (b, c) {
                -1 === f.indexOf(c) && b.push(c);
                return b;
              },
              f ? [f] : [],
            )
            .join(" ");
          b !== f && this.attr("class", b);
          return this;
        };
        a.prototype.afterSetters = function () {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        };
        a.prototype.align = function (c, f, d) {
          var n = {},
            e = this.renderer,
            v = e.alignedObjects,
            q,
            J,
            u;
          if (c) {
            if (
              ((this.alignOptions = c), (this.alignByTranslate = f), !d || w(d))
            )
              (this.alignTo = q = d || "renderer"),
                I(v, this),
                v.push(this),
                (d = void 0);
          } else
            (c = this.alignOptions),
              (f = this.alignByTranslate),
              (q = this.alignTo);
          d = b(d, e[q], "scrollablePlotBox" === q ? e.plotBox : void 0, e);
          q = c.align;
          var a = c.verticalAlign;
          e = (d.x || 0) + (c.x || 0);
          v = (d.y || 0) + (c.y || 0);
          "right" === q ? (J = 1) : "center" === q && (J = 2);
          J && (e += (d.width - (c.width || 0)) / J);
          n[f ? "translateX" : "x"] = Math.round(e);
          "bottom" === a ? (u = 1) : "middle" === a && (u = 2);
          u && (v += (d.height - (c.height || 0)) / u);
          n[f ? "translateY" : "y"] = Math.round(v);
          this[this.placed ? "animate" : "attr"](n);
          this.placed = !0;
          this.alignAttr = n;
          return this;
        };
        a.prototype.alignSetter = function (b) {
          var c = { left: "start", center: "middle", right: "end" };
          c[b] &&
            ((this.alignValue = b),
            this.element.setAttribute("text-anchor", c[b]));
        };
        a.prototype.animate = function (c, f, d) {
          var e = this,
            q = B(b(f, this.renderer.globalAnimation, !0));
          f = q.defer;
          b(r.hidden, r.msHidden, r.webkitHidden, !1) && (q.duration = 0);
          0 !== q.duration
            ? (d && (q.complete = d),
              z(function () {
                e.element && A(e, c, q);
              }, f))
            : (this.attr(c, void 0, d || q.complete),
              n(
                c,
                function (b, c) {
                  q.step &&
                    q.step.call(this, b, { prop: c, pos: 1, elem: this });
                },
                this,
              ));
          return this;
        };
        a.prototype.applyTextOutline = function (b) {
          var c = this.element;
          -1 !== b.indexOf("contrast") &&
            (b = b.replace(
              /contrast/g,
              this.renderer.getContrast(c.style.fill),
            ));
          var f = b.split(" ");
          b = f[f.length - 1];
          if ((f = f[0]) && "none" !== f && x.svg) {
            this.fakeTS = !0;
            f = f.replace(/(^[\d\.]+)(.*?)$/g, function (b, c, f) {
              return 2 * Number(c) + f;
            });
            this.removeTextOutline();
            var d = r.createElementNS(e, "tspan");
            m(d, {
              class: "highcharts-text-outline",
              fill: b,
              stroke: b,
              "stroke-width": f,
              "stroke-linejoin": "round",
            });
            b = c.querySelector("textPath") || c;
            [].forEach.call(b.childNodes, function (b) {
              var c = b.cloneNode(!0);
              c.removeAttribute &&
                ["fill", "stroke", "stroke-width", "stroke"].forEach(
                  function (b) {
                    return c.removeAttribute(b);
                  },
                );
              d.appendChild(c);
            });
            var n = 0;
            [].forEach.call(b.querySelectorAll("text tspan"), function (b) {
              n += Number(b.getAttribute("dy"));
            });
            f = r.createElementNS(e, "tspan");
            f.textContent = "\u200b";
            m(f, { x: Number(c.getAttribute("x")), dy: -n });
            d.appendChild(f);
            b.insertBefore(d, b.firstChild);
          }
        };
        a.prototype.attr = function (b, c, f, d) {
          var e = this.element,
            v = this.symbolCustomAttribs,
            q,
            u = this,
            J,
            a;
          if ("string" === typeof b && "undefined" !== typeof c) {
            var G = b;
            b = {};
            b[G] = c;
          }
          "string" === typeof b
            ? (u = (this[b + "Getter"] || this._defaultGetter).call(this, b, e))
            : (n(
                b,
                function (c, f) {
                  J = !1;
                  d || H(this, f);
                  this.symbolName &&
                    -1 !== v.indexOf(f) &&
                    (q || (this.symbolAttr(b), (q = !0)), (J = !0));
                  !this.rotation ||
                    ("x" !== f && "y" !== f) ||
                    (this.doTransform = !0);
                  J ||
                    ((a = this[f + "Setter"] || this._defaultSetter),
                    a.call(this, c, f, e),
                    !this.styledMode &&
                      this.shadows &&
                      /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
                        f,
                      ) &&
                      this.updateShadows(f, c, a));
                },
                this,
              ),
              this.afterSetters());
          f && f.call(this);
          return u;
        };
        a.prototype.clip = function (b) {
          return this.attr(
            "clip-path",
            b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none",
          );
        };
        a.prototype.crisp = function (b, c) {
          c = c || b.strokeWidth || 0;
          var f = (Math.round(c) % 2) / 2;
          b.x = Math.floor(b.x || this.x || 0) + f;
          b.y = Math.floor(b.y || this.y || 0) + f;
          b.width = Math.floor((b.width || this.width || 0) - 2 * f);
          b.height = Math.floor((b.height || this.height || 0) - 2 * f);
          D(b.strokeWidth) && (b.strokeWidth = c);
          return b;
        };
        a.prototype.complexColor = function (b, c, d) {
          var e = this.renderer,
            u,
            v,
            a,
            J,
            h,
            z,
            G,
            k,
            M,
            w,
            m = [],
            p;
          L(this.renderer, "complexColor", { args: arguments }, function () {
            b.radialGradient
              ? (v = "radialGradient")
              : b.linearGradient && (v = "linearGradient");
            if (v) {
              a = b[v];
              h = e.gradients;
              z = b.stops;
              M = d.radialReference;
              y(a) &&
                (b[v] = a =
                  {
                    x1: a[0],
                    y1: a[1],
                    x2: a[2],
                    y2: a[3],
                    gradientUnits: "userSpaceOnUse",
                  });
              "radialGradient" === v &&
                M &&
                !D(a.gradientUnits) &&
                ((J = a),
                (a = f(a, e.getRadialAttr(M, J), {
                  gradientUnits: "userSpaceOnUse",
                })));
              n(a, function (b, c) {
                "id" !== c && m.push(c, b);
              });
              n(z, function (b) {
                m.push(b);
              });
              m = m.join(",");
              if (h[m]) w = h[m].attr("id");
              else {
                a.id = w = q();
                var U = (h[m] = e.createElement(v).attr(a).add(e.defs));
                U.radAttr = J;
                U.stops = [];
                z.forEach(function (b) {
                  0 === b[1].indexOf("rgba")
                    ? ((u = g.parse(b[1])),
                      (G = u.get("rgb")),
                      (k = u.get("a")))
                    : ((G = b[1]), (k = 1));
                  b = e
                    .createElement("stop")
                    .attr({ offset: b[0], "stop-color": G, "stop-opacity": k })
                    .add(U);
                  U.stops.push(b);
                });
              }
              p = "url(" + e.url + "#" + w + ")";
              d.setAttribute(c, p);
              d.gradient = m;
              b.toString = function () {
                return p;
              };
            }
          });
        };
        a.prototype.css = function (b) {
          var c = this.styles,
            d = {},
            e = this.element,
            q = !c;
          b.color && (b.fill = b.color);
          c &&
            n(b, function (b, f) {
              c && c[f] !== b && ((d[f] = b), (q = !0));
            });
          if (q) {
            c && (b = E(c, d));
            if (null === b.width || "auto" === b.width) delete this.textWidth;
            else if ("text" === e.nodeName.toLowerCase() && b.width)
              var v = (this.textWidth = u(b.width));
            this.styles = b;
            v && !l && this.renderer.forExport && delete b.width;
            var a = f(b);
            e.namespaceURI === this.SVG_NS &&
              ["textOutline", "textOverflow", "width"].forEach(function (b) {
                return a && delete a[b];
              });
            p(e, a);
            this.added &&
              ("text" === this.element.nodeName &&
                this.renderer.buildText(this),
              b.textOutline && this.applyTextOutline(b.textOutline));
          }
          return this;
        };
        a.prototype.dashstyleSetter = function (c) {
          var f = this["stroke-width"];
          "inherit" === f && (f = 1);
          if ((c = c && c.toLowerCase())) {
            var d = c
              .replace("shortdashdotdot", "3,1,1,1,1,1,")
              .replace("shortdashdot", "3,1,1,1")
              .replace("shortdot", "1,1,")
              .replace("shortdash", "3,1,")
              .replace("longdash", "8,3,")
              .replace(/dot/g, "1,3,")
              .replace("dash", "4,3,")
              .replace(/,$/, "")
              .split(",");
            for (c = d.length; c--; ) d[c] = "" + u(d[c]) * b(f, NaN);
            c = d.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", c);
          }
        };
        a.prototype.destroy = function () {
          var b = this,
            c = b.element || {},
            f = b.renderer,
            d = c.ownerSVGElement,
            e = (f.isSVG && "SPAN" === c.nodeName && b.parentGroup) || void 0;
          c.onclick =
            c.onmouseout =
            c.onmouseover =
            c.onmousemove =
            c.point =
              null;
          H(b);
          if (b.clipPath && d) {
            var v = b.clipPath;
            [].forEach.call(
              d.querySelectorAll("[clip-path],[CLIP-PATH]"),
              function (b) {
                -1 < b.getAttribute("clip-path").indexOf(v.element.id) &&
                  b.removeAttribute("clip-path");
              },
            );
            b.clipPath = v.destroy();
          }
          if (b.stops) {
            for (d = 0; d < b.stops.length; d++) b.stops[d].destroy();
            b.stops.length = 0;
            b.stops = void 0;
          }
          b.safeRemoveChild(c);
          for (
            f.styledMode || b.destroyShadows();
            e && e.div && 0 === e.div.childNodes.length;

          )
            (c = e.parentGroup),
              b.safeRemoveChild(e.div),
              delete e.div,
              (e = c);
          b.alignTo && I(f.alignedObjects, b);
          n(b, function (c, f) {
            b[f] && b[f].parentGroup === b && b[f].destroy && b[f].destroy();
            delete b[f];
          });
        };
        a.prototype.destroyShadows = function () {
          (this.shadows || []).forEach(function (b) {
            this.safeRemoveChild(b);
          }, this);
          this.shadows = void 0;
        };
        a.prototype.dSetter = function (b, c, f) {
          y(b) &&
            ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
            (this.pathArray = b),
            (b = b.reduce(function (b, c, f) {
              return c && c.join
                ? (f ? b + " " : "") + c.join(" ")
                : (c || "").toString();
            }, "")));
          /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
          this[c] !== b && (f.setAttribute(c, b), (this[c] = b));
        };
        a.prototype.fadeOut = function (c) {
          var f = this;
          f.animate(
            { opacity: 0 },
            {
              duration: b(c, 150),
              complete: function () {
                f.hide();
              },
            },
          );
        };
        a.prototype.fillSetter = function (b, c, f) {
          "string" === typeof b
            ? f.setAttribute(c, b)
            : b && this.complexColor(b, c, f);
        };
        a.prototype.getBBox = function (f, d) {
          var n = this.alignValue,
            e = this.element,
            q = this.renderer,
            v = this.styles,
            u = this.textStr,
            h = q.cache,
            z = q.cacheKeys,
            k = e.namespaceURI === this.SVG_NS;
          d = b(d, this.rotation, 0);
          var G = q.styledMode
              ? e && a.prototype.getStyle.call(e, "font-size")
              : v && v.fontSize,
            m;
          if (D(u)) {
            var M = u.toString();
            -1 === M.indexOf("<") && (M = M.replace(/[0-9]/g, "0"));
            M += [
              "",
              d,
              G,
              this.textWidth,
              n,
              v && v.textOverflow,
              v && v.fontWeight,
            ].join();
          }
          M && !f && (m = h[M]);
          if (!m) {
            if (k || q.forExport) {
              try {
                var w =
                  this.fakeTS &&
                  function (b) {
                    var c = e.querySelector(".highcharts-text-outline");
                    c && p(c, { display: b });
                  };
                c(w) && w("none");
                m = e.getBBox
                  ? E({}, e.getBBox())
                  : {
                      width: e.offsetWidth,
                      height: e.offsetHeight,
                      x: 0,
                      y: 0,
                    };
                c(w) && w("");
              } catch (V) {
                ("");
              }
              if (!m || 0 > m.width) m = { x: 0, y: 0, width: 0, height: 0 };
            } else m = this.htmlGetBBox();
            if (
              q.isSVG &&
              ((q = m.width),
              (f = m.height),
              k &&
                (m.height = f =
                  { "11px,17": 14, "13px,20": 16 }[
                    "" + (G || "") + ",".concat(Math.round(f))
                  ] || f),
              d)
            ) {
              k = Number(e.getAttribute("y") || 0) - m.y;
              n = { right: 1, center: 0.5 }[n || 0] || 0;
              v = d * t;
              G = (d - 90) * t;
              var J = q * Math.cos(v);
              d = q * Math.sin(v);
              w = Math.cos(G);
              v = Math.sin(G);
              q = m.x + n * (q - J) + k * w;
              G = q + J;
              w = G - f * w;
              J = w - J;
              k = m.y + k - n * d + k * v;
              n = k + d;
              f = n - f * v;
              d = f - d;
              m.x = Math.min(q, G, w, J);
              m.y = Math.min(k, n, f, d);
              m.width = Math.max(q, G, w, J) - m.x;
              m.height = Math.max(k, n, f, d) - m.y;
            }
            if (M && ("" === u || 0 < m.height)) {
              for (; 250 < z.length; ) delete h[z.shift()];
              h[M] || z.push(M);
              h[M] = m;
            }
          }
          return m;
        };
        a.prototype.getStyle = function (b) {
          return d
            .getComputedStyle(this.element || this, "")
            .getPropertyValue(b);
        };
        a.prototype.hasClass = function (b) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(b);
        };
        a.prototype.hide = function () {
          return this.attr({ visibility: "hidden" });
        };
        a.prototype.htmlGetBBox = function () {
          return { height: 0, width: 0, x: 0, y: 0 };
        };
        a.prototype.init = function (b, c) {
          this.element =
            "span" === c ? k(c) : r.createElementNS(this.SVG_NS, c);
          this.renderer = b;
          L(this, "afterInit");
        };
        a.prototype.on = function (b, c) {
          var f = this.onEvents;
          if (f[b]) f[b]();
          f[b] = h(this.element, b, c);
          return this;
        };
        a.prototype.opacitySetter = function (b, c, f) {
          this.opacity = b = Number(Number(b).toFixed(3));
          f.setAttribute(c, b);
        };
        a.prototype.removeClass = function (b) {
          return this.attr(
            "class",
            ("" + this.attr("class"))
              .replace(w(b) ? new RegExp("(^| )".concat(b, "( |$)")) : b, " ")
              .replace(/ +/g, " ")
              .trim(),
          );
        };
        a.prototype.removeTextOutline = function () {
          var b = this.element.querySelector("tspan.highcharts-text-outline");
          b && this.safeRemoveChild(b);
        };
        a.prototype.safeRemoveChild = function (b) {
          var c = b.parentNode;
          c && c.removeChild(b);
        };
        a.prototype.setRadialReference = function (b) {
          var c =
            this.element.gradient &&
            this.renderer.gradients[this.element.gradient];
          this.element.radialReference = b;
          c &&
            c.radAttr &&
            c.animate(this.renderer.getRadialAttr(b, c.radAttr));
          return this;
        };
        a.prototype.setTextPath = function (b, c) {
          var d = this;
          c = f(
            !0,
            {
              enabled: !0,
              attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" },
            },
            c,
          );
          var n = this.renderer.url,
            e = this.text || this,
            v = e.textPath,
            u = c.attributes,
            a = c.enabled;
          b = b || (v && v.path);
          v && v.undo();
          b && a
            ? ((c = h(e, "afterModifyTree", function (c) {
                if (b && a) {
                  var f = b.attr("id");
                  f || b.attr("id", (f = q()));
                  var v = { x: 0, y: 0 };
                  D(u.dx) && ((v.dx = u.dx), delete u.dx);
                  D(u.dy) && ((v.dy = u.dy), delete u.dy);
                  e.attr(v);
                  d.attr({ transform: "" });
                  d.box && (d.box = d.box.destroy());
                  v = c.nodes.slice(0);
                  c.nodes.length = 0;
                  c.nodes[0] = {
                    tagName: "textPath",
                    attributes: E(u, {
                      "text-anchor": u.textAnchor,
                      href: "" + n + "#".concat(f),
                    }),
                    children: v,
                  };
                }
              })),
              (e.textPath = { path: b, undo: c }))
            : (e.attr({ dx: 0, dy: 0 }), delete e.textPath);
          this.added && ((e.textCache = ""), this.renderer.buildText(e));
          return this;
        };
        a.prototype.shadow = function (b, c, f) {
          var d = [],
            e = this.element,
            v = this.oldShadowOptions,
            q = this.parentGroup,
            u = q && 90 === q.rotation;
          q = {
            color: "#000000",
            offsetX: u ? -1 : 1,
            offsetY: u ? -1 : 1,
            opacity: 0.15,
            width: 3,
          };
          var a = !1,
            h;
          !0 === b ? (h = q) : "object" === typeof b && (h = E(q, b));
          h &&
            (h &&
              v &&
              n(h, function (b, c) {
                b !== v[c] && (a = !0);
              }),
            a && this.destroyShadows(),
            (this.oldShadowOptions = h));
          if (!h) this.destroyShadows();
          else if (!this.shadows) {
            q = h.opacity / h.width;
            var G = u
              ? "translate(".concat(h.offsetY, ", ").concat(h.offsetX, ")")
              : "translate(".concat(h.offsetX, ", ").concat(h.offsetY, ")");
            for (u = 1; u <= h.width; u++) {
              var k = e.cloneNode(!1);
              var z = 2 * h.width + 1 - 2 * u;
              m(k, {
                stroke: b.color || "#000000",
                "stroke-opacity": q * u,
                "stroke-width": z,
                transform: G,
                fill: "none",
              });
              k.setAttribute(
                "class",
                (k.getAttribute("class") || "") + " highcharts-shadow",
              );
              f &&
                (m(k, "height", Math.max(m(k, "height") - z, 0)),
                (k.cutHeight = z));
              c
                ? c.element.appendChild(k)
                : e.parentNode && e.parentNode.insertBefore(k, e);
              d.push(k);
            }
            this.shadows = d;
          }
          return this;
        };
        a.prototype.show = function (b) {
          void 0 === b && (b = !0);
          return this.attr({ visibility: b ? "inherit" : "visible" });
        };
        a.prototype["stroke-widthSetter"] = function (b, c, f) {
          this[c] = b;
          f.setAttribute(c, b);
        };
        a.prototype.strokeWidth = function () {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          var b = this.getStyle("stroke-width"),
            c = 0;
          if (b.indexOf("px") === b.length - 2) c = u(b);
          else if ("" !== b) {
            var f = r.createElementNS(e, "rect");
            m(f, { width: b, "stroke-width": 0 });
            this.element.parentNode.appendChild(f);
            c = f.getBBox().width;
            f.parentNode.removeChild(f);
          }
          return c;
        };
        a.prototype.symbolAttr = function (c) {
          var f = this;
          "x y r start end width height innerR anchorX anchorY clockwise"
            .split(" ")
            .forEach(function (d) {
              f[d] = b(c[d], f[d]);
            });
          f.attr({
            d: f.renderer.symbols[f.symbolName](f.x, f.y, f.width, f.height, f),
          });
        };
        a.prototype.textSetter = function (b) {
          b !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = b),
            this.added && this.renderer.buildText(this));
        };
        a.prototype.titleSetter = function (c) {
          var f = this.element,
            d =
              f.getElementsByTagName("title")[0] ||
              r.createElementNS(this.SVG_NS, "title");
          f.insertBefore ? f.insertBefore(d, f.firstChild) : f.appendChild(d);
          d.textContent = String(b(c, ""))
            .replace(/<[^>]*>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        };
        a.prototype.toFront = function () {
          var b = this.element;
          b.parentNode.appendChild(b);
          return this;
        };
        a.prototype.translate = function (b, c) {
          return this.attr({ translateX: b, translateY: c });
        };
        a.prototype.updateShadows = function (b, c, f) {
          var d = this.shadows;
          if (d)
            for (var e = d.length; e--; )
              f.call(
                d[e],
                "height" === b
                  ? Math.max(c - (d[e].cutHeight || 0), 0)
                  : "d" === b
                    ? this.d
                    : c,
                b,
                d[e],
              );
        };
        a.prototype.updateTransform = function () {
          var c = this.element,
            f = this.matrix,
            d = this.rotation;
          d = void 0 === d ? 0 : d;
          var e = this.scaleX,
            n = this.scaleY,
            v = this.translateX,
            q = this.translateY;
          v = [
            "translate(" +
              (void 0 === v ? 0 : v) +
              "," +
              (void 0 === q ? 0 : q) +
              ")",
          ];
          D(f) && v.push("matrix(" + f.join(",") + ")");
          d &&
            v.push(
              "rotate(" +
                d +
                " " +
                b(this.rotationOriginX, c.getAttribute("x"), 0) +
                " " +
                b(this.rotationOriginY, c.getAttribute("y") || 0) +
                ")",
            );
          (D(e) || D(n)) && v.push("scale(" + b(e, 1) + " " + b(n, 1) + ")");
          v.length &&
            !(this.text || this).textPath &&
            c.setAttribute("transform", v.join(" "));
        };
        a.prototype.visibilitySetter = function (b, c, f) {
          "inherit" === b
            ? f.removeAttribute(c)
            : this[c] !== b && f.setAttribute(c, b);
          this[c] = b;
        };
        a.prototype.xGetter = function (b) {
          "circle" === this.element.nodeName &&
            ("x" === b ? (b = "cx") : "y" === b && (b = "cy"));
          return this._defaultGetter(b);
        };
        a.prototype.zIndexSetter = function (b, c) {
          var f = this.renderer,
            d = this.parentGroup,
            e = (d || f).element || f.box,
            v = this.element;
          f = e === f.box;
          var n = !1;
          var q = this.added;
          var a;
          D(b)
            ? (v.setAttribute("data-z-index", b),
              (b = +b),
              this[c] === b && (q = !1))
            : D(this[c]) && v.removeAttribute("data-z-index");
          this[c] = b;
          if (q) {
            (b = this.zIndex) && d && (d.handleZ = !0);
            c = e.childNodes;
            for (a = c.length - 1; 0 <= a && !n; a--) {
              d = c[a];
              q = d.getAttribute("data-z-index");
              var h = !D(q);
              if (d !== v)
                if (0 > b && h && !f && !a) e.insertBefore(v, c[a]), (n = !0);
                else if (u(q) <= b || (h && (!D(b) || 0 <= b)))
                  e.insertBefore(v, c[a + 1] || null), (n = !0);
            }
            n || (e.insertBefore(v, c[f ? 3 : 0] || null), (n = !0));
          }
          return n;
        };
        return a;
      })();
      a.prototype.strokeSetter = a.prototype.fillSetter;
      a.prototype.yGetter = a.prototype.xGetter;
      a.prototype.matrixSetter =
        a.prototype.rotationOriginXSetter =
        a.prototype.rotationOriginYSetter =
        a.prototype.rotationSetter =
        a.prototype.scaleXSetter =
        a.prototype.scaleYSetter =
        a.prototype.translateXSetter =
        a.prototype.translateYSetter =
        a.prototype.verticalAlignSetter =
          function (b, c) {
            this[c] = b;
            this.doTransform = !0;
          };
      ("");
      return a;
    },
  );
  K(
    g,
    "Core/Renderer/RendererRegistry.js",
    [g["Core/Globals.js"]],
    function (a) {
      var g;
      (function (g) {
        g.rendererTypes = {};
        var A;
        g.getRendererType = function (a) {
          void 0 === a && (a = A);
          return g.rendererTypes[a] || g.rendererTypes[A];
        };
        g.registerRendererType = function (x, B, H) {
          g.rendererTypes[x] = B;
          if (!A || H) (A = x), (a.Renderer = B);
        };
      })(g || (g = {}));
      return g;
    },
  );
  K(
    g,
    "Core/Renderer/SVG/SVGLabel.js",
    [g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]],
    function (a, g) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (e, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (d, e) {
                    d.__proto__ = e;
                  }) ||
                function (d, e) {
                  for (var a in e) e.hasOwnProperty(a) && (d[a] = e[a]);
                };
              return a(e, d);
            };
            return function (e, d) {
              function h() {
                this.constructor = e;
              }
              a(e, d);
              e.prototype =
                null === d
                  ? Object.create(d)
                  : ((h.prototype = d.prototype), new h());
            };
          })(),
        F = g.defined,
        C = g.extend,
        B = g.isNumber,
        H = g.merge,
        t = g.pick,
        r = g.removeEvent;
      return (function (g) {
        function e(d, a, m, k, p, l, I, E, r, y) {
          var c = g.call(this) || this;
          c.paddingLeftSetter = c.paddingSetter;
          c.paddingRightSetter = c.paddingSetter;
          c.init(d, "g");
          c.textStr = a;
          c.x = m;
          c.y = k;
          c.anchorX = l;
          c.anchorY = I;
          c.baseline = r;
          c.className = y;
          c.addClass(
            "button" === y ? "highcharts-no-tooltip" : "highcharts-label",
          );
          y && c.addClass("highcharts-" + y);
          c.text = d.text(void 0, 0, 0, E).attr({ zIndex: 1 });
          var h;
          "string" === typeof p &&
            ((h = /^url\((.*?)\)$/.test(p)) || c.renderer.symbols[p]) &&
            (c.symbolKey = p);
          c.bBox = e.emptyBBox;
          c.padding = 3;
          c.baselineOffset = 0;
          c.needsBox = d.styledMode || h;
          c.deferredAttr = {};
          c.alignFactor = 0;
          return c;
        }
        A(e, g);
        e.prototype.alignSetter = function (d) {
          d = { left: 0, center: 0.5, right: 1 }[d];
          d !== this.alignFactor &&
            ((this.alignFactor = d),
            this.bBox && B(this.xSetting) && this.attr({ x: this.xSetting }));
        };
        e.prototype.anchorXSetter = function (d, e) {
          this.anchorX = d;
          this.boxAttr(
            e,
            Math.round(d) - this.getCrispAdjust() - this.xSetting,
          );
        };
        e.prototype.anchorYSetter = function (d, e) {
          this.anchorY = d;
          this.boxAttr(e, d - this.ySetting);
        };
        e.prototype.boxAttr = function (d, e) {
          this.box ? this.box.attr(d, e) : (this.deferredAttr[d] = e);
        };
        e.prototype.css = function (d) {
          if (d) {
            var h = {};
            d = H(d);
            e.textProps.forEach(function (e) {
              "undefined" !== typeof d[e] && ((h[e] = d[e]), delete d[e]);
            });
            this.text.css(h);
            "fontSize" in h || "fontWeight" in h
              ? this.updateTextPadding()
              : ("width" in h || "textOverflow" in h) && this.updateBoxSize();
          }
          return a.prototype.css.call(this, d);
        };
        e.prototype.destroy = function () {
          r(this.element, "mouseenter");
          r(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          a.prototype.destroy.call(this);
        };
        e.prototype.fillSetter = function (d, e) {
          d && (this.needsBox = !0);
          this.fill = d;
          this.boxAttr(e, d);
        };
        e.prototype.getBBox = function () {
          this.textStr &&
            0 === this.bBox.width &&
            0 === this.bBox.height &&
            this.updateBoxSize();
          var d = this.padding,
            e = t(this.paddingLeft, d);
          return {
            width: this.width,
            height: this.height,
            x: this.bBox.x - e,
            y: this.bBox.y - d,
          };
        };
        e.prototype.getCrispAdjust = function () {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) %
                2) /
                2;
        };
        e.prototype.heightSetter = function (d) {
          this.heightSetting = d;
        };
        e.prototype.onAdd = function () {
          this.text.add(this);
          this.attr({
            text: t(this.textStr, ""),
            x: this.x || 0,
            y: this.y || 0,
          });
          this.box &&
            F(this.anchorX) &&
            this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        };
        e.prototype.paddingSetter = function (d, e) {
          B(d)
            ? d !== this[e] && ((this[e] = d), this.updateTextPadding())
            : (this[e] = void 0);
        };
        e.prototype.rSetter = function (d, e) {
          this.boxAttr(e, d);
        };
        e.prototype.shadow = function (d) {
          d &&
            !this.renderer.styledMode &&
            (this.updateBoxSize(), this.box && this.box.shadow(d));
          return this;
        };
        e.prototype.strokeSetter = function (d, e) {
          this.stroke = d;
          this.boxAttr(e, d);
        };
        e.prototype["stroke-widthSetter"] = function (d, e) {
          d && (this.needsBox = !0);
          this["stroke-width"] = d;
          this.boxAttr(e, d);
        };
        e.prototype["text-alignSetter"] = function (d) {
          this.textAlign = d;
        };
        e.prototype.textSetter = function (d) {
          "undefined" !== typeof d && this.text.attr({ text: d });
          this.updateTextPadding();
        };
        e.prototype.updateBoxSize = function () {
          var d = this.text,
            a = d.element.style,
            m = {},
            k = this.padding,
            p = (this.bBox =
              (B(this.widthSetting) &&
                B(this.heightSetting) &&
                !this.textAlign) ||
              !F(d.textStr)
                ? e.emptyBBox
                : d.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || p.height || 0) + 2 * k;
          a = this.renderer.fontMetrics(a && a.fontSize, d);
          this.baselineOffset =
            k +
            Math.min((this.text.firstLineMetrics || a).b, p.height || Infinity);
          this.heightSetting &&
            (this.baselineOffset += (this.heightSetting - a.h) / 2);
          this.needsBox &&
            !d.textPath &&
            (this.box ||
              ((d = this.box =
                this.symbolKey
                  ? this.renderer.symbol(this.symbolKey)
                  : this.renderer.rect()),
              d.addClass(
                ("button" === this.className ? "" : "highcharts-label-box") +
                  (this.className
                    ? " highcharts-" + this.className + "-box"
                    : ""),
              ),
              d.add(this)),
            (d = this.getCrispAdjust()),
            (m.x = d),
            (m.y = (this.baseline ? -this.baselineOffset : 0) + d),
            (m.width = Math.round(this.width)),
            (m.height = Math.round(this.height)),
            this.box.attr(C(m, this.deferredAttr)),
            (this.deferredAttr = {}));
        };
        e.prototype.updateTextPadding = function () {
          var d = this.text;
          if (!d.textPath) {
            this.updateBoxSize();
            var e = this.baseline ? 0 : this.baselineOffset,
              a = t(this.paddingLeft, this.padding);
            F(this.widthSetting) &&
              this.bBox &&
              ("center" === this.textAlign || "right" === this.textAlign) &&
              (a +=
                { center: 0.5, right: 1 }[this.textAlign] *
                (this.widthSetting - this.bBox.width));
            if (a !== d.x || e !== d.y)
              d.attr("x", a),
                d.hasBoxWidthChanged && (this.bBox = d.getBBox(!0)),
                "undefined" !== typeof e && d.attr("y", e);
            d.x = a;
            d.y = e;
          }
        };
        e.prototype.widthSetter = function (d) {
          this.widthSetting = B(d) ? d : void 0;
        };
        e.prototype.getPaddedWidth = function () {
          var d = this.padding,
            e = t(this.paddingLeft, d);
          d = t(this.paddingRight, d);
          return (this.widthSetting || this.bBox.width || 0) + e + d;
        };
        e.prototype.xSetter = function (d) {
          this.x = d;
          this.alignFactor &&
            ((d -= this.alignFactor * this.getPaddedWidth()),
            (this["forceAnimate:x"] = !0));
          this.xSetting = Math.round(d);
          this.attr("translateX", this.xSetting);
        };
        e.prototype.ySetter = function (d) {
          this.ySetting = this.y = Math.round(d);
          this.attr("translateY", this.ySetting);
        };
        e.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
        e.textProps =
          "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(
            " ",
          );
        return e;
      })(a);
    },
  );
  K(g, "Core/Renderer/SVG/Symbols.js", [g["Core/Utilities.js"]], function (a) {
    function g(a, g, l, e, d) {
      var h = [];
      if (d) {
        var m = d.start || 0,
          k = H(d.r, l);
        l = H(d.r, e || l);
        var p = (d.end || 0) - 0.001;
        e = d.innerR;
        var D = H(d.open, 0.001 > Math.abs((d.end || 0) - m - 2 * Math.PI)),
          I = Math.cos(m),
          E = Math.sin(m),
          r = Math.cos(p),
          y = Math.sin(p);
        m = H(d.longArc, 0.001 > p - m - Math.PI ? 0 : 1);
        h.push(
          ["M", a + k * I, g + l * E],
          ["A", k, l, 0, m, H(d.clockwise, 1), a + k * r, g + l * y],
        );
        C(e) &&
          h.push(
            D ? ["M", a + e * r, g + e * y] : ["L", a + e * r, g + e * y],
            [
              "A",
              e,
              e,
              0,
              m,
              C(d.clockwise) ? 1 - d.clockwise : 0,
              a + e * I,
              g + e * E,
            ],
          );
        D || h.push(["Z"]);
      }
      return h;
    }
    function x(a, g, l, e, d) {
      return d && d.r
        ? F(a, g, l, e, d)
        : [
            ["M", a, g],
            ["L", a + l, g],
            ["L", a + l, g + e],
            ["L", a, g + e],
            ["Z"],
          ];
    }
    function F(a, g, l, e, d) {
      d = (d && d.r) || 0;
      return [
        ["M", a + d, g],
        ["L", a + l - d, g],
        ["C", a + l, g, a + l, g, a + l, g + d],
        ["L", a + l, g + e - d],
        ["C", a + l, g + e, a + l, g + e, a + l - d, g + e],
        ["L", a + d, g + e],
        ["C", a, g + e, a, g + e, a, g + e - d],
        ["L", a, g + d],
        ["C", a, g, a, g, a + d, g],
      ];
    }
    var C = a.defined,
      B = a.isNumber,
      H = a.pick;
    return {
      arc: g,
      callout: function (a, g, l, e, d) {
        var h = Math.min((d && d.r) || 0, l, e),
          m = h + 6,
          k = d && d.anchorX;
        d = (d && d.anchorY) || 0;
        var p = F(a, g, l, e, { r: h });
        if (!B(k)) return p;
        a + k >= l
          ? d > g + m && d < g + e - m
            ? p.splice(
                3,
                1,
                ["L", a + l, d - 6],
                ["L", a + l + 6, d],
                ["L", a + l, d + 6],
                ["L", a + l, g + e - h],
              )
            : p.splice(
                3,
                1,
                ["L", a + l, e / 2],
                ["L", k, d],
                ["L", a + l, e / 2],
                ["L", a + l, g + e - h],
              )
          : 0 >= a + k
            ? d > g + m && d < g + e - m
              ? p.splice(
                  7,
                  1,
                  ["L", a, d + 6],
                  ["L", a - 6, d],
                  ["L", a, d - 6],
                  ["L", a, g + h],
                )
              : p.splice(
                  7,
                  1,
                  ["L", a, e / 2],
                  ["L", k, d],
                  ["L", a, e / 2],
                  ["L", a, g + h],
                )
            : d && d > e && k > a + m && k < a + l - m
              ? p.splice(
                  5,
                  1,
                  ["L", k + 6, g + e],
                  ["L", k, g + e + 6],
                  ["L", k - 6, g + e],
                  ["L", a + h, g + e],
                )
              : d &&
                0 > d &&
                k > a + m &&
                k < a + l - m &&
                p.splice(
                  1,
                  1,
                  ["L", k - 6, g],
                  ["L", k, g - 6],
                  ["L", k + 6, g],
                  ["L", l - h, g],
                );
        return p;
      },
      circle: function (a, r, l, e) {
        return g(a + l / 2, r + e / 2, l / 2, e / 2, {
          start: 0.5 * Math.PI,
          end: 2.5 * Math.PI,
          open: !1,
        });
      },
      diamond: function (a, g, l, e) {
        return [
          ["M", a + l / 2, g],
          ["L", a + l, g + e / 2],
          ["L", a + l / 2, g + e],
          ["L", a, g + e / 2],
          ["Z"],
        ];
      },
      rect: x,
      roundedRect: F,
      square: x,
      triangle: function (a, g, l, e) {
        return [
          ["M", a + l / 2, g],
          ["L", a + l, g + e],
          ["L", a, g + e],
          ["Z"],
        ];
      },
      "triangle-down": function (a, g, l, e) {
        return [["M", a, g], ["L", a + l, g], ["L", a + l / 2, g + e], ["Z"]];
      },
    };
  });
  K(
    g,
    "Core/Renderer/SVG/TextBuilder.js",
    [
      g["Core/Renderer/HTML/AST.js"],
      g["Core/Globals.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A = g.doc,
        C = g.SVG_NS,
        B = g.win,
        H = x.attr,
        t = x.extend,
        r = x.fireEvent,
        l = x.isString,
        e = x.objectEach,
        d = x.pick;
      return (function () {
        function h(d) {
          var e = d.styles;
          this.renderer = d.renderer;
          this.svgElement = d;
          this.width = d.textWidth;
          this.textLineHeight = e && e.lineHeight;
          this.textOutline = e && e.textOutline;
          this.ellipsis = !(!e || "ellipsis" !== e.textOverflow);
          this.noWrap = !(!e || "nowrap" !== e.whiteSpace);
          this.fontSize = e && e.fontSize;
        }
        h.prototype.buildSVG = function () {
          var e = this.svgElement,
            k = e.element,
            h = e.renderer,
            g = d(e.textStr, "").toString(),
            I = -1 !== g.indexOf("<"),
            E = k.childNodes;
          h = this.width && !e.added && h.box;
          var L = /<br.*?>/g,
            y = [
              g,
              this.ellipsis,
              this.noWrap,
              this.textLineHeight,
              this.textOutline,
              this.fontSize,
              this.width,
            ].join();
          if (y !== e.textCache) {
            e.textCache = y;
            delete e.actualWidth;
            for (y = E.length; y--; ) k.removeChild(E[y]);
            I ||
            this.ellipsis ||
            this.width ||
            e.textPath ||
            (-1 !== g.indexOf(" ") && (!this.noWrap || L.test(g)))
              ? "" !== g &&
                (h && h.appendChild(k),
                (g = new a(g)),
                this.modifyTree(g.nodes),
                g.addToDOM(k),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (k.textContent || "").indexOf("\u2026") &&
                  e.attr(
                    "title",
                    this.unescapeEntities(e.textStr || "", ["&lt;", "&gt;"]),
                  ),
                h && h.removeChild(k))
              : k.appendChild(A.createTextNode(this.unescapeEntities(g)));
            l(this.textOutline) &&
              e.applyTextOutline &&
              e.applyTextOutline(this.textOutline);
          }
        };
        h.prototype.modifyDOM = function () {
          var d = this,
            e = this.svgElement,
            a = H(e.element, "x");
          e.firstLineMetrics = void 0;
          for (var h; (h = e.element.firstChild); )
            if (/^[\s\u200B]*$/.test(h.textContent || " "))
              e.element.removeChild(h);
            else break;
          [].forEach.call(
            e.element.querySelectorAll("tspan.highcharts-br"),
            function (h, c) {
              h.nextSibling &&
                h.previousSibling &&
                (0 === c &&
                  1 === h.previousSibling.nodeType &&
                  (e.firstLineMetrics = e.renderer.fontMetrics(
                    void 0,
                    h.previousSibling,
                  )),
                H(h, { dy: d.getLineHeight(h.nextSibling), x: a }));
            },
          );
          var g = this.width || 0;
          if (g) {
            var l = function (h, c) {
                var w = h.textContent || "",
                  f = w.replace(/([^\^])-/g, "$1- ").split(" "),
                  n =
                    !d.noWrap &&
                    (1 < f.length || 1 < e.element.childNodes.length),
                  b = d.getLineHeight(c),
                  u = 0,
                  z = e.actualWidth;
                if (d.ellipsis)
                  w &&
                    d.truncate(
                      h,
                      w,
                      void 0,
                      0,
                      Math.max(0, g - parseInt(d.fontSize || 12, 10)),
                      function (b, c) {
                        return b.substring(0, c) + "\u2026";
                      },
                    );
                else if (n) {
                  w = [];
                  for (n = []; c.firstChild && c.firstChild !== h; )
                    n.push(c.firstChild), c.removeChild(c.firstChild);
                  for (; f.length; )
                    f.length &&
                      !d.noWrap &&
                      0 < u &&
                      (w.push(h.textContent || ""),
                      (h.textContent = f.join(" ").replace(/- /g, "-"))),
                      d.truncate(
                        h,
                        void 0,
                        f,
                        0 === u ? z || 0 : 0,
                        g,
                        function (b, c) {
                          return f.slice(0, c).join(" ").replace(/- /g, "-");
                        },
                      ),
                      (z = e.actualWidth),
                      u++;
                  n.forEach(function (b) {
                    c.insertBefore(b, h);
                  });
                  w.forEach(function (f) {
                    c.insertBefore(A.createTextNode(f), h);
                    f = A.createElementNS(C, "tspan");
                    f.textContent = "\u200b";
                    H(f, { dy: b, x: a });
                    c.insertBefore(f, h);
                  });
                }
              },
              L = function (d) {
                [].slice.call(d.childNodes).forEach(function (c) {
                  c.nodeType === B.Node.TEXT_NODE
                    ? l(c, d)
                    : (-1 !== c.className.baseVal.indexOf("highcharts-br") &&
                        (e.actualWidth = 0),
                      L(c));
                });
              };
            L(e.element);
          }
        };
        h.prototype.getLineHeight = function (d) {
          var e;
          d = d.nodeType === B.Node.TEXT_NODE ? d.parentElement : d;
          this.renderer.styledMode ||
            (e =
              d && /(px|em)$/.test(d.style.fontSize)
                ? d.style.fontSize
                : this.fontSize || this.renderer.style.fontSize || 12);
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(e, d || this.svgElement.element).h;
        };
        h.prototype.modifyTree = function (d) {
          var e = this,
            a = function (h, k) {
              var m = h.attributes;
              m = void 0 === m ? {} : m;
              var p = h.children,
                g = h.style;
              g = void 0 === g ? {} : g;
              var c = h.tagName,
                w = e.renderer.styledMode;
              if ("b" === c || "strong" === c)
                w
                  ? (m["class"] = "highcharts-strong")
                  : (g.fontWeight = "bold");
              else if ("i" === c || "em" === c)
                w
                  ? (m["class"] = "highcharts-emphasized")
                  : (g.fontStyle = "italic");
              g && g.color && (g.fill = g.color);
              "br" === c
                ? ((m["class"] = "highcharts-br"),
                  (h.textContent = "\u200b"),
                  (k = d[k + 1]) &&
                    k.textContent &&
                    (k.textContent = k.textContent.replace(/^ +/gm, "")))
                : "a" === c &&
                  p &&
                  p.some(function (c) {
                    return "#text" === c.tagName;
                  }) &&
                  (h.children = [{ children: p, tagName: "tspan" }]);
              "#text" !== c && "a" !== c && (h.tagName = "tspan");
              t(h, { attributes: m, style: g });
              p &&
                p
                  .filter(function (c) {
                    return "#text" !== c.tagName;
                  })
                  .forEach(a);
            };
          d.forEach(a);
          r(this.svgElement, "afterModifyTree", { nodes: d });
        };
        h.prototype.truncate = function (d, e, a, h, g, l) {
          var k = this.svgElement,
            m = k.renderer,
            c = k.rotation,
            w = [],
            f = a ? 1 : 0,
            n = (e || a || "").length,
            b = n,
            u,
            z = function (b, c) {
              c = c || b;
              var f = d.parentNode;
              if (f && "undefined" === typeof w[c])
                if (f.getSubStringLength)
                  try {
                    w[c] = h + f.getSubStringLength(0, a ? c + 1 : c);
                  } catch (Q) {
                    ("");
                  }
                else
                  m.getSpanWidth &&
                    ((d.textContent = l(e || a, b)),
                    (w[c] = h + m.getSpanWidth(k, d)));
              return w[c];
            };
          k.rotation = 0;
          var q = z(d.textContent.length);
          if (h + q > g) {
            for (; f <= n; )
              (b = Math.ceil((f + n) / 2)),
                a && (u = l(a, b)),
                (q = z(b, u && u.length - 1)),
                f === n ? (f = n + 1) : q > g ? (n = b - 1) : (f = b);
            0 === n
              ? (d.textContent = "")
              : (e && n === e.length - 1) ||
                (d.textContent = u || l(e || a, b));
          }
          a && a.splice(0, b);
          k.actualWidth = q;
          k.rotation = c;
        };
        h.prototype.unescapeEntities = function (d, a) {
          e(this.renderer.escapes, function (e, h) {
            (a && -1 !== a.indexOf(e)) ||
              (d = d.toString().replace(new RegExp(e, "g"), h));
          });
          return d;
        };
        return h;
      })();
    },
  );
  K(
    g,
    "Core/Renderer/SVG/SVGRenderer.js",
    [
      g["Core/Renderer/HTML/AST.js"],
      g["Core/Color/Color.js"],
      g["Core/Globals.js"],
      g["Core/Renderer/RendererRegistry.js"],
      g["Core/Renderer/SVG/SVGElement.js"],
      g["Core/Renderer/SVG/SVGLabel.js"],
      g["Core/Renderer/SVG/Symbols.js"],
      g["Core/Renderer/SVG/TextBuilder.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C, B, H, t, r) {
      var l = x.charts,
        e = x.deg2rad,
        d = x.doc,
        h = x.isFirefox,
        m = x.isMS,
        k = x.isWebKit,
        p = x.noop,
        D = x.SVG_NS,
        I = x.symbolSizes,
        E = x.win,
        L = r.addEvent,
        y = r.attr,
        c = r.createElement,
        w = r.css,
        f = r.defined,
        n = r.destroyObjectProperties,
        b = r.extend,
        u = r.isArray,
        z = r.isNumber,
        q = r.isObject,
        N = r.isString,
        J = r.merge,
        O = r.pick,
        Q = r.pInt,
        A = r.uniqueKey,
        Y;
      x = (function () {
        function v(b, c, f, d, e, v, a) {
          this.width =
            this.url =
            this.style =
            this.isSVG =
            this.imgCount =
            this.height =
            this.gradients =
            this.globalAnimation =
            this.defs =
            this.chartIndex =
            this.cacheKeys =
            this.cache =
            this.boxWrapper =
            this.box =
            this.alignedObjects =
              void 0;
          this.init(b, c, f, d, e, v, a);
        }
        v.prototype.init = function (b, c, f, e, v, a, n) {
          var G = this.createElement("svg").attr({
              version: "1.1",
              class: "highcharts-root",
            }),
            q = G.element;
          n || G.css(this.getStyle(e));
          b.appendChild(q);
          y(b, "dir", "ltr");
          -1 === b.innerHTML.indexOf("xmlns") && y(q, "xmlns", this.SVG_NS);
          this.isSVG = !0;
          this.box = q;
          this.boxWrapper = G;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement("desc")
            .add()
            .element.appendChild(
              d.createTextNode("Created with Highcharts 10.3.3"),
            );
          this.defs = this.createElement("defs").add();
          this.allowHTML = a;
          this.forExport = v;
          this.styledMode = n;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(c, f, !1);
          var u;
          h &&
            b.getBoundingClientRect &&
            ((c = function () {
              w(b, { left: 0, top: 0 });
              u = b.getBoundingClientRect();
              w(b, {
                left: Math.ceil(u.left) - u.left + "px",
                top: Math.ceil(u.top) - u.top + "px",
              });
            }),
            c(),
            (this.unSubPixelFix = L(E, "resize", c)));
        };
        v.prototype.definition = function (b) {
          return new a([b]).addToDOM(this.defs.element);
        };
        v.prototype.getReferenceURL = function () {
          if ((h || k) && d.getElementsByTagName("base").length) {
            if (!f(Y)) {
              var b = A();
              b = new a([
                {
                  tagName: "svg",
                  attributes: { width: 8, height: 8 },
                  children: [
                    {
                      tagName: "defs",
                      children: [
                        {
                          tagName: "clipPath",
                          attributes: { id: b },
                          children: [
                            {
                              tagName: "rect",
                              attributes: { width: 4, height: 4 },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: "rect",
                      attributes: {
                        id: "hitme",
                        width: 8,
                        height: 8,
                        "clip-path": "url(#".concat(b, ")"),
                        fill: "rgba(0,0,0,0.001)",
                      },
                    },
                  ],
                },
              ]).addToDOM(d.body);
              w(b, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              var c = d.elementFromPoint(6, 6);
              Y = "hitme" === (c && c.id);
              d.body.removeChild(b);
            }
            if (Y)
              return E.location.href
                .split("#")[0]
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20");
          }
          return "";
        };
        v.prototype.getStyle = function (c) {
          return (this.style = b(
            {
              fontFamily:
                '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
              fontSize: "12px",
            },
            c,
          ));
        };
        v.prototype.setStyle = function (b) {
          this.boxWrapper.css(this.getStyle(b));
        };
        v.prototype.isHidden = function () {
          return !this.boxWrapper.getBBox().width;
        };
        v.prototype.destroy = function () {
          var b = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          n(this.gradients || {});
          this.gradients = null;
          b && (this.defs = b.destroy());
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        };
        v.prototype.createElement = function (b) {
          var c = new this.Element();
          c.init(this, b);
          return c;
        };
        v.prototype.getRadialAttr = function (b, c) {
          return {
            cx: b[0] - b[2] / 2 + (c.cx || 0) * b[2],
            cy: b[1] - b[2] / 2 + (c.cy || 0) * b[2],
            r: (c.r || 0) * b[2],
          };
        };
        v.prototype.buildText = function (b) {
          new t(b).buildSVG();
        };
        v.prototype.getContrast = function (b) {
          b = g.parse(b).rgba.map(function (b) {
            b /= 255;
            return 0.03928 >= b
              ? b / 12.92
              : Math.pow((b + 0.055) / 1.055, 2.4);
          });
          b = 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2];
          return 1.05 / (b + 0.05) > (b + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
        };
        v.prototype.button = function (c, f, d, e, v, n, u, h, z, w) {
          void 0 === v && (v = {});
          var G = this.label(c, f, d, z, void 0, void 0, w, void 0, "button"),
            k = this.styledMode;
          c = v.states || {};
          var M = 0;
          v = J(v);
          delete v.states;
          var g = J(
            { color: "#333333", cursor: "pointer", fontWeight: "normal" },
            v.style,
          );
          delete v.style;
          var p = a.filterUserAttributes(v);
          G.attr(J({ padding: 8, r: 2 }, p));
          if (!k) {
            p = J({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 }, p);
            n = J(
              p,
              { fill: "#e6e6e6" },
              a.filterUserAttributes(n || c.hover || {}),
            );
            var U = n.style;
            delete n.style;
            u = J(
              p,
              {
                fill: "#e6ebf5",
                style: { color: "#000000", fontWeight: "bold" },
              },
              a.filterUserAttributes(u || c.select || {}),
            );
            var P = u.style;
            delete u.style;
            h = J(
              p,
              { style: { color: "#cccccc" } },
              a.filterUserAttributes(h || c.disabled || {}),
            );
            var y = h.style;
            delete h.style;
          }
          L(G.element, m ? "mouseover" : "mouseenter", function () {
            3 !== M && G.setState(1);
          });
          L(G.element, m ? "mouseout" : "mouseleave", function () {
            3 !== M && G.setState(M);
          });
          G.setState = function (b) {
            1 !== b && (G.state = M = b);
            G.removeClass(
              /highcharts-button-(normal|hover|pressed|disabled)/,
            ).addClass(
              "highcharts-button-" +
                ["normal", "hover", "pressed", "disabled"][b || 0],
            );
            k ||
              (G.attr([p, n, u, h][b || 0]),
              (b = [g, U, P, y][b || 0]),
              q(b) && G.css(b));
          };
          k ||
            (G.attr(p).css(b({ cursor: "default" }, g)),
            w && G.text.css({ pointerEvents: "none" }));
          return G.on("touchstart", function (b) {
            return b.stopPropagation();
          }).on("click", function (b) {
            3 !== M && e.call(G, b);
          });
        };
        v.prototype.crispLine = function (b, c, d) {
          void 0 === d && (d = "round");
          var e = b[0],
            v = b[1];
          f(e[1]) &&
            e[1] === v[1] &&
            (e[1] = v[1] = Math[d](e[1]) - (c % 2) / 2);
          f(e[2]) &&
            e[2] === v[2] &&
            (e[2] = v[2] = Math[d](e[2]) + (c % 2) / 2);
          return b;
        };
        v.prototype.path = function (c) {
          var f = this.styledMode ? {} : { fill: "none" };
          u(c) ? (f.d = c) : q(c) && b(f, c);
          return this.createElement("path").attr(f);
        };
        v.prototype.circle = function (b, c, f) {
          b = q(b) ? b : "undefined" === typeof b ? {} : { x: b, y: c, r: f };
          c = this.createElement("circle");
          c.xSetter = c.ySetter = function (b, c, f) {
            f.setAttribute("c" + c, b);
          };
          return c.attr(b);
        };
        v.prototype.arc = function (b, c, f, d, e, v) {
          q(b)
            ? ((d = b), (c = d.y), (f = d.r), (b = d.x))
            : (d = { innerR: d, start: e, end: v });
          b = this.symbol("arc", b, c, f, f, d);
          b.r = f;
          return b;
        };
        v.prototype.rect = function (b, c, f, d, e, v) {
          e = q(b) ? b.r : e;
          var a = this.createElement("rect");
          b = q(b)
            ? b
            : "undefined" === typeof b
              ? {}
              : { x: b, y: c, width: Math.max(f, 0), height: Math.max(d, 0) };
          this.styledMode ||
            ("undefined" !== typeof v &&
              ((b["stroke-width"] = v), (b = a.crisp(b))),
            (b.fill = "none"));
          e && (b.r = e);
          a.rSetter = function (b, c, f) {
            a.r = b;
            y(f, { rx: b, ry: b });
          };
          a.rGetter = function () {
            return a.r || 0;
          };
          return a.attr(b);
        };
        v.prototype.setSize = function (b, c, f) {
          this.width = b;
          this.height = c;
          this.boxWrapper.animate(
            { width: b, height: c },
            {
              step: function () {
                this.attr({
                  viewBox:
                    "0 0 " + this.attr("width") + " " + this.attr("height"),
                });
              },
              duration: O(f, !0) ? void 0 : 0,
            },
          );
          this.alignElements();
        };
        v.prototype.g = function (b) {
          var c = this.createElement("g");
          return b ? c.attr({ class: "highcharts-" + b }) : c;
        };
        v.prototype.image = function (b, c, f, d, e, v) {
          var a = { preserveAspectRatio: "none" },
            n = function (b, c) {
              b.setAttributeNS
                ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", c)
                : b.setAttribute("hc-svg-href", c);
            };
          z(c) && (a.x = c);
          z(f) && (a.y = f);
          z(d) && (a.width = d);
          z(e) && (a.height = e);
          var G = this.createElement("image").attr(a);
          c = function (c) {
            n(G.element, b);
            v.call(G, c);
          };
          v
            ? (n(
                G.element,
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
              ),
              (f = new E.Image()),
              L(f, "load", c),
              (f.src = b),
              f.complete && c({}))
            : n(G.element, b);
          return G;
        };
        v.prototype.symbol = function (e, v, a, n, G, q) {
          var u = this,
            h = /^url\((.*?)\)$/,
            z = h.test(e),
            k = !z && (this.symbols[e] ? e : "circle"),
            g = k && this.symbols[k],
            m;
          if (g) {
            "number" === typeof v &&
              (m = g.call(
                this.symbols,
                Math.round(v || 0),
                Math.round(a || 0),
                n || 0,
                G || 0,
                q,
              ));
            var p = this.path(m);
            u.styledMode || p.attr("fill", "none");
            b(p, { symbolName: k || void 0, x: v, y: a, width: n, height: G });
            q && b(p, q);
          } else if (z) {
            var P = e.match(h)[1];
            var U = (p = this.image(P));
            U.imgwidth = O(I[P] && I[P].width, q && q.width);
            U.imgheight = O(I[P] && I[P].height, q && q.height);
            var N = function (b) {
              return b.attr({ width: b.width, height: b.height });
            };
            ["width", "height"].forEach(function (b) {
              U[b + "Setter"] = function (b, c) {
                this[c] = b;
                b = this.alignByTranslate;
                var d = this.element,
                  e = this.width,
                  v = this.height,
                  a = this.imgwidth,
                  n = this.imgheight,
                  G = this["img" + c];
                if (f(G)) {
                  var u = 1;
                  q && "within" === q.backgroundSize && e && v
                    ? ((u = Math.min(e / a, v / n)),
                      (G = Math.round(G * u)),
                      y(d, {
                        width: Math.round(a * u),
                        height: Math.round(n * u),
                      }))
                    : d && d.setAttribute(c, G);
                  b ||
                    this.translate(
                      ((e || 0) - G * u) / 2,
                      ((v || 0) - G * u) / 2,
                    );
                }
              };
            });
            f(v) && U.attr({ x: v, y: a });
            U.isImg = !0;
            f(U.imgwidth) && f(U.imgheight)
              ? N(U)
              : (U.attr({ width: 0, height: 0 }),
                c("img", {
                  onload: function () {
                    var b = l[u.chartIndex];
                    0 === this.width &&
                      (w(this, { position: "absolute", top: "-999em" }),
                      d.body.appendChild(this));
                    I[P] = { width: this.width, height: this.height };
                    U.imgwidth = this.width;
                    U.imgheight = this.height;
                    U.element && N(U);
                    this.parentNode && this.parentNode.removeChild(this);
                    u.imgCount--;
                    if (!u.imgCount && b && !b.hasLoaded) b.onload();
                  },
                  src: P,
                }),
                this.imgCount++);
          }
          return p;
        };
        v.prototype.clipRect = function (b, c, f, d) {
          var e = A() + "-",
            v = this.createElement("clipPath").attr({ id: e }).add(this.defs);
          b = this.rect(b, c, f, d, 0).add(v);
          b.id = e;
          b.clipPath = v;
          b.count = 0;
          return b;
        };
        v.prototype.text = function (b, c, d, e) {
          var v = {};
          if (e && (this.allowHTML || !this.forExport))
            return this.html(b, c, d);
          v.x = Math.round(c || 0);
          d && (v.y = Math.round(d));
          f(b) && (v.text = b);
          b = this.createElement("text").attr(v);
          if (!e || (this.forExport && !this.allowHTML))
            b.xSetter = function (b, c, f) {
              for (
                var d = f.getElementsByTagName("tspan"),
                  e = f.getAttribute(c),
                  v = 0,
                  a;
                v < d.length;
                v++
              )
                (a = d[v]), a.getAttribute(c) === e && a.setAttribute(c, b);
              f.setAttribute(c, b);
            };
          return b;
        };
        v.prototype.fontMetrics = function (b, c) {
          b =
            (!this.styledMode && /px/.test(b)) || !E.getComputedStyle
              ? b ||
                (c && c.style && c.style.fontSize) ||
                (this.style && this.style.fontSize)
              : c && C.prototype.getStyle.call(c, "font-size");
          b = /px/.test(b) ? Q(b) : 12;
          c = 24 > b ? b + 3 : Math.round(1.2 * b);
          return { h: c, b: Math.round(0.8 * c), f: b };
        };
        v.prototype.rotCorr = function (b, c, f) {
          var d = b;
          c && f && (d = Math.max(d * Math.cos(c * e), 4));
          return { x: (-b / 3) * Math.sin(c * e), y: d };
        };
        v.prototype.pathToSegments = function (b) {
          for (
            var c = [],
              f = [],
              d = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 },
              e = 0;
            e < b.length;
            e++
          )
            N(f[0]) &&
              z(b[e]) &&
              f.length === d[f[0].toUpperCase()] &&
              b.splice(e, 0, f[0].replace("M", "L").replace("m", "l")),
              "string" === typeof b[e] &&
                (f.length && c.push(f.slice(0)), (f.length = 0)),
              f.push(b[e]);
          c.push(f.slice(0));
          return c;
        };
        v.prototype.label = function (b, c, f, d, e, v, a, n, q) {
          return new B(this, b, c, f, d, e, v, a, n, q);
        };
        v.prototype.alignElements = function () {
          this.alignedObjects.forEach(function (b) {
            return b.align();
          });
        };
        return v;
      })();
      b(x.prototype, {
        Element: C,
        SVG_NS: D,
        escapes: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        },
        symbols: H,
        draw: p,
      });
      F.registerRendererType("svg", x, !0);
      ("");
      return x;
    },
  );
  K(
    g,
    "Core/Renderer/HTML/HTMLElement.js",
    [
      g["Core/Globals.js"],
      g["Core/Renderer/SVG/SVGElement.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A =
          (this && this.__extends) ||
          (function () {
            var d = function (e, a) {
              d =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (d, e) {
                    d.__proto__ = e;
                  }) ||
                function (d, e) {
                  for (var a in e) e.hasOwnProperty(a) && (d[a] = e[a]);
                };
              return d(e, a);
            };
            return function (e, a) {
              function h() {
                this.constructor = e;
              }
              d(e, a);
              e.prototype =
                null === a
                  ? Object.create(a)
                  : ((h.prototype = a.prototype), new h());
            };
          })(),
        C = a.isFirefox,
        B = a.isMS,
        H = a.isWebKit,
        t = a.win,
        r = x.css,
        l = x.defined,
        e = x.extend,
        d = x.pick,
        h = x.pInt;
      return (function (a) {
        function k() {
          return (null !== a && a.apply(this, arguments)) || this;
        }
        A(k, a);
        k.compose = function (d) {
          if (-1 === k.composedClasses.indexOf(d)) {
            k.composedClasses.push(d);
            var e = k.prototype,
              a = d.prototype;
            a.getSpanCorrection = e.getSpanCorrection;
            a.htmlCss = e.htmlCss;
            a.htmlGetBBox = e.htmlGetBBox;
            a.htmlUpdateTransform = e.htmlUpdateTransform;
            a.setSpanRotation = e.setSpanRotation;
          }
          return d;
        };
        k.prototype.getSpanCorrection = function (d, e, a) {
          this.xCorr = -d * a;
          this.yCorr = -e;
        };
        k.prototype.htmlCss = function (a) {
          var h = "SPAN" === this.element.tagName && a && "width" in a,
            k = d(h && a.width, void 0);
          if (h) {
            delete a.width;
            this.textWidth = k;
            var g = !0;
          }
          a &&
            "ellipsis" === a.textOverflow &&
            ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
          this.styles = e(this.styles, a);
          r(this.element, a);
          g && this.htmlUpdateTransform();
          return this;
        };
        k.prototype.htmlGetBBox = function () {
          var d = this.element;
          return {
            x: d.offsetLeft,
            y: d.offsetTop,
            width: d.offsetWidth,
            height: d.offsetHeight,
          };
        };
        k.prototype.htmlUpdateTransform = function () {
          if (this.added) {
            var d = this.renderer,
              e = this.element,
              a = this.translateX || 0,
              k = this.translateY || 0,
              g = this.x || 0,
              m = this.y || 0,
              c = this.textAlign || "left",
              w = { left: 0, center: 0.5, right: 1 }[c],
              f = this.styles;
            f = f && f.whiteSpace;
            r(e, { marginLeft: a, marginTop: k });
            !d.styledMode &&
              this.shadows &&
              this.shadows.forEach(function (b) {
                r(b, { marginLeft: a + 1, marginTop: k + 1 });
              });
            this.inverted &&
              [].forEach.call(e.childNodes, function (b) {
                d.invertChild(b, e);
              });
            if ("SPAN" === e.tagName) {
              var n = this.rotation,
                b = this.textWidth && h(this.textWidth),
                u = [n, c, e.innerHTML, this.textWidth, this.textAlign].join(),
                z = void 0;
              z = !1;
              if (b !== this.oldTextWidth) {
                if (this.textPxLength) var q = this.textPxLength;
                else
                  r(e, { width: "", whiteSpace: f || "nowrap" }),
                    (q = e.offsetWidth);
                (b > this.oldTextWidth || q > b) &&
                  (/[ \-]/.test(e.textContent || e.innerText) ||
                    "ellipsis" === e.style.textOverflow) &&
                  (r(e, {
                    width: q > b || n ? b + "px" : "auto",
                    display: "block",
                    whiteSpace: f || "normal",
                  }),
                  (this.oldTextWidth = b),
                  (z = !0));
              }
              this.hasBoxWidthChanged = z;
              u !== this.cTT &&
                ((z = d.fontMetrics(e.style.fontSize, e).b),
                !l(n) ||
                  (n === (this.oldRotation || 0) && c === this.oldAlign) ||
                  this.setSpanRotation(n, w, z),
                this.getSpanCorrection(
                  (!l(n) && this.textPxLength) || e.offsetWidth,
                  z,
                  w,
                  n,
                  c,
                ));
              r(e, {
                left: g + (this.xCorr || 0) + "px",
                top: m + (this.yCorr || 0) + "px",
              });
              this.cTT = u;
              this.oldRotation = n;
              this.oldAlign = c;
            }
          } else this.alignOnAdd = !0;
        };
        k.prototype.setSpanRotation = function (d, e, a) {
          var h = {},
            k =
              B && !/Edge/.test(t.navigator.userAgent)
                ? "-ms-transform"
                : H
                  ? "-webkit-transform"
                  : C
                    ? "MozTransform"
                    : t.opera
                      ? "-o-transform"
                      : void 0;
          k &&
            ((h[k] = h.transform = "rotate(" + d + "deg)"),
            (h[k + (C ? "Origin" : "-origin")] = h.transformOrigin =
              100 * e + "% " + a + "px"),
            r(this.element, h));
        };
        k.composedClasses = [];
        return k;
      })(g);
    },
  );
  K(
    g,
    "Core/Renderer/HTML/HTMLRenderer.js",
    [
      g["Core/Renderer/HTML/AST.js"],
      g["Core/Renderer/SVG/SVGElement.js"],
      g["Core/Renderer/SVG/SVGRenderer.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (e, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (d, e) {
                    d.__proto__ = e;
                  }) ||
                function (d, e) {
                  for (var a in e) e.hasOwnProperty(a) && (d[a] = e[a]);
                };
              return a(e, d);
            };
            return function (e, d) {
              function h() {
                this.constructor = e;
              }
              a(e, d);
              e.prototype =
                null === d
                  ? Object.create(d)
                  : ((h.prototype = d.prototype), new h());
            };
          })(),
        B = F.attr,
        H = F.createElement,
        t = F.extend,
        r = F.pick;
      return (function (l) {
        function e() {
          return (null !== l && l.apply(this, arguments)) || this;
        }
        A(e, l);
        e.compose = function (d) {
          -1 === e.composedClasses.indexOf(d) &&
            (e.composedClasses.push(d), (d.prototype.html = e.prototype.html));
          return d;
        };
        e.prototype.html = function (d, e, m) {
          var h = this.createElement("span"),
            p = h.element,
            l = h.renderer,
            I = l.isSVG,
            E = function (d, e) {
              ["opacity", "visibility"].forEach(function (c) {
                d[c + "Setter"] = function (a, f, n) {
                  var b = d.div ? d.div.style : e;
                  g.prototype[c + "Setter"].call(this, a, f, n);
                  b && (b[f] = a);
                };
              });
              d.addedSetters = !0;
            };
          h.textSetter = function (d) {
            d !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              a.setElementHTML(this.element, r(d, "")),
              (this.textStr = d),
              (h.doTransform = !0));
          };
          I && E(h, h.element.style);
          h.xSetter =
            h.ySetter =
            h.alignSetter =
            h.rotationSetter =
              function (d, e) {
                "align" === e ? (h.alignValue = h.textAlign = d) : (h[e] = d);
                h.doTransform = !0;
              };
          h.afterSetters = function () {
            this.doTransform &&
              (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          h.attr({ text: d, x: Math.round(e), y: Math.round(m) }).css({
            position: "absolute",
          });
          l.styledMode ||
            h.css({
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
            });
          p.style.whiteSpace = "nowrap";
          h.css = h.htmlCss;
          I &&
            (h.add = function (d) {
              var e = l.box.parentNode,
                c = [];
              if ((this.parentGroup = d)) {
                var a = d.div;
                if (!a) {
                  for (; d; ) c.push(d), (d = d.parentGroup);
                  c.reverse().forEach(function (f) {
                    function d(b, c) {
                      f[c] = b;
                      "translateX" === c
                        ? (z.left = b + "px")
                        : (z.top = b + "px");
                      f.doTransform = !0;
                    }
                    var b = B(f.element, "class"),
                      u = f.styles || {};
                    a = f.div =
                      f.div ||
                      H(
                        "div",
                        b ? { className: b } : void 0,
                        {
                          position: "absolute",
                          left: (f.translateX || 0) + "px",
                          top: (f.translateY || 0) + "px",
                          display: f.display,
                          opacity: f.opacity,
                          cursor: u.cursor,
                          pointerEvents: u.pointerEvents,
                          visibility: f.visibility,
                        },
                        a || e,
                      );
                    var z = a.style;
                    t(f, {
                      classSetter: (function (b) {
                        return function (c) {
                          this.element.setAttribute("class", c);
                          b.className = c;
                        };
                      })(a),
                      on: function () {
                        c[0].div &&
                          h.on.apply(
                            { element: c[0].div, onEvents: f.onEvents },
                            arguments,
                          );
                        return f;
                      },
                      translateXSetter: d,
                      translateYSetter: d,
                    });
                    f.addedSetters || E(f);
                  });
                }
              } else a = e;
              a.appendChild(p);
              h.added = !0;
              h.alignOnAdd && h.htmlUpdateTransform();
              return h;
            });
          return h;
        };
        e.composedClasses = [];
        return e;
      })(x);
    },
  );
  K(g, "Core/Axis/AxisDefaults.js", [], function () {
    var a;
    (function (a) {
      a.defaultXAxisOptions = {
        alignTicks: !0,
        allowDecimals: void 0,
        panningEnabled: !0,
        zIndex: 2,
        zoomEnabled: !0,
        dateTimeLabelFormats: {
          millisecond: { main: "%H:%M:%S.%L", range: !1 },
          second: { main: "%H:%M:%S", range: !1 },
          minute: { main: "%H:%M", range: !1 },
          hour: { main: "%H:%M", range: !1 },
          day: { main: "%e. %b" },
          week: { main: "%e. %b" },
          month: { main: "%b '%y" },
          year: { main: "%Y" },
        },
        endOnTick: !1,
        gridLineDashStyle: "Solid",
        gridZIndex: 1,
        labels: {
          autoRotation: void 0,
          autoRotationLimit: 80,
          distance: void 0,
          enabled: !0,
          indentation: 10,
          overflow: "justify",
          padding: 5,
          reserveSpace: void 0,
          rotation: void 0,
          staggerLines: 0,
          step: 0,
          useHTML: !1,
          x: 0,
          zIndex: 7,
          style: { color: "#666666", cursor: "default", fontSize: "11px" },
        },
        maxPadding: 0.01,
        minorGridLineDashStyle: "Solid",
        minorTickLength: 2,
        minorTickPosition: "outside",
        minPadding: 0.01,
        offset: void 0,
        opposite: !1,
        reversed: void 0,
        reversedStacks: !1,
        showEmpty: !0,
        showFirstLabel: !0,
        showLastLabel: !0,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: "between",
        tickPosition: "outside",
        title: {
          align: "middle",
          rotation: 0,
          useHTML: !1,
          x: 0,
          y: 0,
          style: { color: "#666666" },
        },
        type: "linear",
        uniqueNames: !0,
        visible: !0,
        minorGridLineColor: "#f2f2f2",
        minorGridLineWidth: 1,
        minorTickColor: "#999999",
        lineColor: "#ccd6eb",
        lineWidth: 1,
        gridLineColor: "#e6e6e6",
        gridLineWidth: void 0,
        tickColor: "#ccd6eb",
      };
      a.defaultYAxisOptions = {
        reversedStacks: !0,
        endOnTick: !0,
        maxPadding: 0.05,
        minPadding: 0.05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: -8 },
        startOnTick: !0,
        title: { rotation: 270, text: "Values" },
        stackLabels: {
          animation: {},
          allowOverlap: !1,
          enabled: !1,
          crop: !0,
          overflow: "justify",
          formatter: function () {
            var a = this.axis.chart.numberFormatter;
            return a(this.total || 0, -1);
          },
          style: {
            color: "#000000",
            fontSize: "11px",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      };
      a.defaultLeftAxisOptions = {
        labels: { x: -15 },
        title: { rotation: 270 },
      };
      a.defaultRightAxisOptions = {
        labels: { x: 15 },
        title: { rotation: 90 },
      };
      a.defaultBottomAxisOptions = {
        labels: { autoRotation: [-45], x: 0 },
        margin: 15,
        title: { rotation: 0 },
      };
      a.defaultTopAxisOptions = {
        labels: { autoRotation: [-45], x: 0 },
        margin: 15,
        title: { rotation: 0 },
      };
    })(a || (a = {}));
    return a;
  });
  K(g, "Core/Foundation.js", [g["Core/Utilities.js"]], function (a) {
    var g = a.addEvent,
      x = a.isFunction,
      F = a.objectEach,
      C = a.removeEvent,
      B;
    (function (a) {
      a.registerEventOptions = function (a, r) {
        a.eventOptions = a.eventOptions || {};
        F(r.events, function (l, e) {
          a.eventOptions[e] !== l &&
            (a.eventOptions[e] &&
              (C(a, e, a.eventOptions[e]), delete a.eventOptions[e]),
            x(l) && ((a.eventOptions[e] = l), g(a, e, l)));
        });
      };
    })(B || (B = {}));
    return B;
  });
  K(
    g,
    "Core/Axis/Tick.js",
    [
      g["Core/FormatUtilities.js"],
      g["Core/Globals.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A = g.deg2rad,
        C = x.clamp,
        B = x.correctFloat,
        H = x.defined,
        t = x.destroyObjectProperties,
        r = x.extend,
        l = x.fireEvent,
        e = x.isNumber,
        d = x.merge,
        h = x.objectEach,
        m = x.pick;
      g = (function () {
        function g(d, e, a, h, g) {
          this.isNewLabel = this.isNew = !0;
          this.axis = d;
          this.pos = e;
          this.type = a || "";
          this.parameters = g || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          l(this, "init");
          a || h || this.addLabel();
        }
        g.prototype.addLabel = function () {
          var d = this,
            h = d.axis,
            g = h.options,
            k = h.chart,
            L = h.categories,
            y = h.logarithmic,
            c = h.names,
            w = d.pos,
            f = m(d.options && d.options.labels, g.labels),
            n = h.tickPositions,
            b = w === n[0],
            u = w === n[n.length - 1],
            z = (!f.step || 1 === f.step) && 1 === h.tickInterval;
          n = n.info;
          var q = d.label,
            N;
          L = this.parameters.category || (L ? m(L[w], c[w], w) : w);
          y && e(L) && (L = B(y.lin2log(L)));
          if (h.dateTime)
            if (n) {
              var J = k.time.resolveDTLFormat(
                g.dateTimeLabelFormats[
                  (!g.grid && n.higherRanks[w]) || n.unitName
                ],
              );
              var O = J.main;
            } else
              e(L) &&
                (O = h.dateTime.getXDateFormat(
                  L,
                  g.dateTimeLabelFormats || {},
                ));
          d.isFirst = b;
          d.isLast = u;
          var Q = {
            axis: h,
            chart: k,
            dateTimeLabelFormat: O,
            isFirst: b,
            isLast: u,
            pos: w,
            tick: d,
            tickPositionInfo: n,
            value: L,
          };
          l(this, "labelFormat", Q);
          var t = function (b) {
            return f.formatter
              ? f.formatter.call(b, b)
              : f.format
                ? ((b.text = h.defaultLabelFormatter.call(b, b)),
                  a.format(f.format, b, k))
                : h.defaultLabelFormatter.call(b, b);
          };
          g = t.call(Q, Q);
          var Y = J && J.list;
          d.shortenLabel = Y
            ? function () {
                for (N = 0; N < Y.length; N++)
                  if (
                    (r(Q, { dateTimeLabelFormat: Y[N] }),
                    q.attr({ text: t.call(Q, Q) }),
                    q.getBBox().width < h.getSlotWidth(d) - 2 * f.padding)
                  )
                    return;
                q.attr({ text: "" });
              }
            : void 0;
          z && h._addedPlotLB && d.moveLabel(g, f);
          H(q) || d.movedLabel
            ? q &&
              q.textStr !== g &&
              !z &&
              (!q.textWidth ||
                f.style.width ||
                q.styles.width ||
                q.css({ width: null }),
              q.attr({ text: g }),
              (q.textPxLength = q.getBBox().width))
            : ((d.label = q = d.createLabel({ x: 0, y: 0 }, g, f)),
              (d.rotation = 0));
        };
        g.prototype.createLabel = function (e, a, h) {
          var g = this.axis,
            k = g.chart;
          if (
            (e =
              H(a) && h.enabled
                ? k.renderer.text(a, e.x, e.y, h.useHTML).add(g.labelGroup)
                : null)
          )
            k.styledMode || e.css(d(h.style)),
              (e.textPxLength = e.getBBox().width);
          return e;
        };
        g.prototype.destroy = function () {
          t(this, this.axis);
        };
        g.prototype.getPosition = function (d, e, a, h) {
          var g = this.axis,
            k = g.chart,
            c = (h && k.oldChartHeight) || k.chartHeight;
          d = {
            x: d
              ? B(g.translate(e + a, void 0, void 0, h) + g.transB)
              : g.left +
                g.offset +
                (g.opposite
                  ? ((h && k.oldChartWidth) || k.chartWidth) - g.right - g.left
                  : 0),
            y: d
              ? c - g.bottom + g.offset - (g.opposite ? g.height : 0)
              : B(c - g.translate(e + a, void 0, void 0, h) - g.transB),
          };
          d.y = C(d.y, -1e5, 1e5);
          l(this, "afterGetPosition", { pos: d });
          return d;
        };
        g.prototype.getLabelPosition = function (d, e, a, h, g, k, c, w) {
          var f = this.axis,
            n = f.transA,
            b =
              f.isLinked && f.linkedParent
                ? f.linkedParent.reversed
                : f.reversed,
            u = f.staggerLines,
            z = f.tickRotCorr || { x: 0, y: 0 },
            q =
              h || f.reserveSpaceDefault
                ? 0
                : -f.labelOffset * ("center" === f.labelAlign ? 0.5 : 1),
            m = {};
          a =
            0 === f.side
              ? a.rotation
                ? -8
                : -a.getBBox().height
              : 2 === f.side
                ? z.y + 8
                : Math.cos(a.rotation * A) *
                  (z.y - a.getBBox(!1, 0).height / 2);
          H(g.y) && (a = 0 === f.side && f.horiz ? g.y + a : g.y);
          d = d + g.x + q + z.x - (k && h ? k * n * (b ? -1 : 1) : 0);
          e = e + a - (k && !h ? k * n * (b ? 1 : -1) : 0);
          u &&
            ((h = (c / (w || 1)) % u),
            f.opposite && (h = u - h - 1),
            (e += (f.labelOffset / u) * h));
          m.x = d;
          m.y = Math.round(e);
          l(this, "afterGetLabelPosition", {
            pos: m,
            tickmarkOffset: k,
            index: c,
          });
          return m;
        };
        g.prototype.getLabelSize = function () {
          return this.label
            ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
            : 0;
        };
        g.prototype.getMarkPath = function (d, e, a, h, g, k) {
          return k.crispLine(
            [
              ["M", d, e],
              ["L", d + (g ? 0 : -a), e + (g ? a : 0)],
            ],
            h,
          );
        };
        g.prototype.handleOverflow = function (d) {
          var e = this.axis,
            a = e.options.labels,
            h = d.x,
            g = e.chart.chartWidth,
            k = e.chart.spacing,
            c = m(e.labelLeft, Math.min(e.pos, k[3]));
          k = m(
            e.labelRight,
            Math.max(e.isRadial ? 0 : e.pos + e.len, g - k[1]),
          );
          var w = this.label,
            f = this.rotation,
            n = { left: 0, center: 0.5, right: 1 }[
              e.labelAlign || w.attr("align")
            ],
            b = w.getBBox().width,
            u = e.getSlotWidth(this),
            z = {},
            q = u,
            p = 1,
            l;
          if (f || "justify" !== a.overflow)
            0 > f && h - n * b < c
              ? (l = Math.round(h / Math.cos(f * A) - c))
              : 0 < f &&
                h + n * b > k &&
                (l = Math.round((g - h) / Math.cos(f * A)));
          else if (
            ((g = h + (1 - n) * b),
            h - n * b < c
              ? (q = d.x + q * (1 - n) - c)
              : g > k && ((q = k - d.x + q * n), (p = -1)),
            (q = Math.min(u, q)),
            q < u &&
              "center" === e.labelAlign &&
              (d.x += p * (u - q - n * (u - Math.min(b, q)))),
            b > q || (e.autoRotation && (w.styles || {}).width))
          )
            l = q;
          l &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((z.width = Math.floor(l) + "px"),
                (a.style || {}).textOverflow || (z.textOverflow = "ellipsis"),
                w.css(z)));
        };
        g.prototype.moveLabel = function (d, e) {
          var a = this,
            g = a.label,
            k = a.axis,
            m = k.reversed,
            c = !1;
          g && g.textStr === d
            ? ((a.movedLabel = g), (c = !0), delete a.label)
            : h(k.ticks, function (f) {
                c ||
                  f.isNew ||
                  f === a ||
                  !f.label ||
                  f.label.textStr !== d ||
                  ((a.movedLabel = f.label),
                  (c = !0),
                  (f.labelPos = a.movedLabel.xy),
                  delete f.label);
              });
          if (!c && (a.labelPos || g)) {
            var w = a.labelPos || g.xy;
            g = k.horiz ? (m ? 0 : k.width + k.left) : w.x;
            k = k.horiz ? w.y : m ? k.width + k.left : 0;
            a.movedLabel = a.createLabel({ x: g, y: k }, d, e);
            a.movedLabel && a.movedLabel.attr({ opacity: 0 });
          }
        };
        g.prototype.render = function (d, e, a) {
          var h = this.axis,
            g = h.horiz,
            k = this.pos,
            c = m(this.tickmarkOffset, h.tickmarkOffset);
          k = this.getPosition(g, k, c, e);
          c = k.x;
          var w = k.y;
          h = (g && c === h.pos + h.len) || (!g && w === h.pos) ? -1 : 1;
          g = m(a, this.label && this.label.newOpacity, 1);
          a = m(a, 1);
          this.isActive = !0;
          this.renderGridLine(e, a, h);
          this.renderMark(k, a, h);
          this.renderLabel(k, e, g, d);
          this.isNew = !1;
          l(this, "afterRender");
        };
        g.prototype.renderGridLine = function (d, e, a) {
          var h = this.axis,
            g = h.options,
            k = {},
            c = this.pos,
            w = this.type,
            f = m(this.tickmarkOffset, h.tickmarkOffset),
            n = h.chart.renderer,
            b = this.gridLine,
            u = g.gridLineWidth,
            z = g.gridLineColor,
            q = g.gridLineDashStyle;
          "minor" === this.type &&
            ((u = g.minorGridLineWidth),
            (z = g.minorGridLineColor),
            (q = g.minorGridLineDashStyle));
          b ||
            (h.chart.styledMode ||
              ((k.stroke = z), (k["stroke-width"] = u || 0), (k.dashstyle = q)),
            w || (k.zIndex = 1),
            d && (e = 0),
            (this.gridLine = b =
              n
                .path()
                .attr(k)
                .addClass("highcharts-" + (w ? w + "-" : "") + "grid-line")
                .add(h.gridGroup)));
          if (
            b &&
            (a = h.getPlotLinePath({
              value: c + f,
              lineWidth: b.strokeWidth() * a,
              force: "pass",
              old: d,
              acrossPanes: !1,
            }))
          )
            b[d || this.isNew ? "attr" : "animate"]({ d: a, opacity: e });
        };
        g.prototype.renderMark = function (d, e, a) {
          var h = this.axis,
            g = h.options,
            k = h.chart.renderer,
            c = this.type,
            w = h.tickSize(c ? c + "Tick" : "tick"),
            f = d.x;
          d = d.y;
          var n = m(
            g["minor" !== c ? "tickWidth" : "minorTickWidth"],
            !c && h.isXAxis ? 1 : 0,
          );
          g = g["minor" !== c ? "tickColor" : "minorTickColor"];
          var b = this.mark,
            u = !b;
          w &&
            (h.opposite && (w[0] = -w[0]),
            b ||
              ((this.mark = b =
                k
                  .path()
                  .addClass("highcharts-" + (c ? c + "-" : "") + "tick")
                  .add(h.axisGroup)),
              h.chart.styledMode || b.attr({ stroke: g, "stroke-width": n })),
            b[u ? "attr" : "animate"]({
              d: this.getMarkPath(f, d, w[0], b.strokeWidth() * a, h.horiz, k),
              opacity: e,
            }));
        };
        g.prototype.renderLabel = function (d, a, h, g) {
          var k = this.axis,
            l = k.horiz,
            c = k.options,
            w = this.label,
            f = c.labels,
            n = f.step;
          k = m(this.tickmarkOffset, k.tickmarkOffset);
          var b = d.x;
          d = d.y;
          var u = !0;
          w &&
            e(b) &&
            ((w.xy = d = this.getLabelPosition(b, d, w, l, f, k, g, n)),
            (this.isFirst && !this.isLast && !c.showFirstLabel) ||
            (this.isLast && !this.isFirst && !c.showLastLabel)
              ? (u = !1)
              : !l ||
                f.step ||
                f.rotation ||
                a ||
                0 === h ||
                this.handleOverflow(d),
            n && g % n && (u = !1),
            u && e(d.y)
              ? ((d.opacity = h),
                w[this.isNewLabel ? "attr" : "animate"](d).show(!0),
                (this.isNewLabel = !1))
              : (w.hide(), (this.isNewLabel = !0)));
        };
        g.prototype.replaceMovedLabel = function () {
          var d = this.label,
            e = this.axis,
            a = e.reversed;
          if (d && !this.isNew) {
            var h = e.horiz ? (a ? e.left : e.width + e.left) : d.xy.x;
            a = e.horiz ? d.xy.y : a ? e.width + e.top : e.top;
            d.animate({ x: h, y: a, opacity: 0 }, void 0, d.destroy);
            delete this.label;
          }
          e.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        };
        return g;
      })();
      ("");
      return g;
    },
  );
  K(
    g,
    "Core/Axis/Axis.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Axis/AxisDefaults.js"],
      g["Core/Color/Color.js"],
      g["Core/Defaults.js"],
      g["Core/Foundation.js"],
      g["Core/Globals.js"],
      g["Core/Axis/Tick.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C, B, H, t) {
      var r = a.animObject,
        l = F.defaultOptions,
        e = C.registerEventOptions,
        d = B.deg2rad,
        h = t.arrayMax,
        m = t.arrayMin,
        k = t.clamp,
        p = t.correctFloat,
        D = t.defined,
        I = t.destroyObjectProperties,
        E = t.erase,
        A = t.error,
        y = t.extend,
        c = t.fireEvent,
        w = t.isArray,
        f = t.isNumber,
        n = t.isString,
        b = t.merge,
        u = t.normalizeTickInterval,
        z = t.objectEach,
        q = t.pick,
        N = t.relativeLength,
        J = t.removeEvent,
        O = t.splat,
        Q = t.syncTimeout,
        T = function (b, c) {
          return u(
            c,
            void 0,
            void 0,
            q(b.options.allowDecimals, 0.5 > c || void 0 !== b.tickAmount),
            !!b.tickAmount,
          );
        };
      a = (function () {
        function a(b, c) {
          this.zoomEnabled =
            this.width =
            this.visible =
            this.userOptions =
            this.translationSlope =
            this.transB =
            this.transA =
            this.top =
            this.ticks =
            this.tickRotCorr =
            this.tickPositions =
            this.tickmarkOffset =
            this.tickInterval =
            this.tickAmount =
            this.side =
            this.series =
            this.right =
            this.positiveValuesOnly =
            this.pos =
            this.pointRangePadding =
            this.pointRange =
            this.plotLinesAndBandsGroups =
            this.plotLinesAndBands =
            this.paddedTicks =
            this.overlap =
            this.options =
            this.offset =
            this.names =
            this.minPixelPadding =
            this.minorTicks =
            this.minorTickInterval =
            this.min =
            this.maxLabelLength =
            this.max =
            this.len =
            this.left =
            this.labelFormatter =
            this.labelEdge =
            this.isLinked =
            this.height =
            this.hasVisibleSeries =
            this.hasNames =
            this.eventOptions =
            this.coll =
            this.closestPointRange =
            this.chart =
            this.bottom =
            this.alternateBands =
              void 0;
          this.init(b, c);
        }
        a.prototype.init = function (b, d) {
          var a = d.isX;
          this.chart = b;
          this.horiz = b.inverted && !this.isZAxis ? !a : a;
          this.isXAxis = a;
          this.coll = this.coll || (a ? "xAxis" : "yAxis");
          c(this, "init", { userOptions: d });
          this.opposite = q(d.opposite, this.opposite);
          this.side = q(
            d.side,
            this.side,
            this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3,
          );
          this.setOptions(d);
          var v = this.options,
            n = v.labels,
            h = v.type;
          this.userOptions = d;
          this.minPixelPadding = 0;
          this.reversed = q(v.reversed, this.reversed);
          this.visible = v.visible;
          this.zoomEnabled = v.zoomEnabled;
          this.hasNames = "category" === h || !0 === v.categories;
          this.categories = v.categories || (this.hasNames ? [] : void 0);
          this.names || ((this.names = []), (this.names.keys = {}));
          this.plotLinesAndBandsGroups = {};
          this.positiveValuesOnly = !!this.logarithmic;
          this.isLinked = D(v.linkedTo);
          this.ticks = {};
          this.labelEdge = [];
          this.minorTicks = {};
          this.plotLinesAndBands = [];
          this.alternateBands = {};
          this.len = 0;
          this.minRange = this.userMinRange = v.minRange || v.maxZoom;
          this.range = v.range;
          this.offset = v.offset || 0;
          this.min = this.max = null;
          d = q(v.crosshair, O(b.options.tooltip.crosshairs)[a ? 0 : 1]);
          this.crosshair = !0 === d ? {} : d;
          -1 === b.axes.indexOf(this) &&
            (a ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this),
            b[this.coll].push(this));
          this.series = this.series || [];
          b.inverted &&
            !this.isZAxis &&
            a &&
            "undefined" === typeof this.reversed &&
            (this.reversed = !0);
          this.labelRotation = f(n.rotation) ? n.rotation : void 0;
          e(this, v);
          c(this, "afterInit");
        };
        a.prototype.setOptions = function (f) {
          this.options = b(
            g.defaultXAxisOptions,
            "yAxis" === this.coll && g.defaultYAxisOptions,
            [
              g.defaultTopAxisOptions,
              g.defaultRightAxisOptions,
              g.defaultBottomAxisOptions,
              g.defaultLeftAxisOptions,
            ][this.side],
            b(l[this.coll], f),
          );
          c(this, "afterSetOptions", { userOptions: f });
        };
        a.prototype.defaultLabelFormatter = function (b) {
          var c = this.axis;
          b = this.chart.numberFormatter;
          var d = f(this.value) ? this.value : NaN,
            a = c.chart.time,
            e = this.dateTimeLabelFormat,
            v = l.lang,
            n = v.numericSymbols;
          v = v.numericSymbolMagnitude || 1e3;
          var h = c.logarithmic ? Math.abs(d) : c.tickInterval,
            q = n && n.length;
          if (c.categories) var u = "".concat(this.value);
          else if (e) u = a.dateFormat(e, d);
          else if (q && 1e3 <= h)
            for (; q-- && "undefined" === typeof u; )
              (c = Math.pow(v, q + 1)),
                h >= c &&
                  0 === (10 * d) % c &&
                  null !== n[q] &&
                  0 !== d &&
                  (u = b(d / c, -1) + n[q]);
          "undefined" === typeof u &&
            (u = 1e4 <= Math.abs(d) ? b(d, -1) : b(d, -1, void 0, ""));
          return u;
        };
        a.prototype.getSeriesExtremes = function () {
          var b = this,
            d = b.chart,
            a;
          c(this, "getSeriesExtremes", null, function () {
            b.hasVisibleSeries = !1;
            b.dataMin = b.dataMax = b.threshold = null;
            b.softThreshold = !b.isXAxis;
            b.series.forEach(function (c) {
              if (c.visible || !d.options.chart.ignoreHiddenSeries) {
                var e = c.options,
                  v = e.threshold;
                b.hasVisibleSeries = !0;
                b.positiveValuesOnly && 0 >= v && (v = null);
                if (b.isXAxis) {
                  if (((e = c.xData), e.length)) {
                    e = b.logarithmic ? e.filter(b.validatePositiveValue) : e;
                    a = c.getXExtremes(e);
                    var n = a.min;
                    var h = a.max;
                    f(n) ||
                      n instanceof Date ||
                      ((e = e.filter(f)),
                      (a = c.getXExtremes(e)),
                      (n = a.min),
                      (h = a.max));
                    e.length &&
                      ((b.dataMin = Math.min(q(b.dataMin, n), n)),
                      (b.dataMax = Math.max(q(b.dataMax, h), h)));
                  }
                } else if (
                  ((c = c.applyExtremes()),
                  f(c.dataMin) &&
                    ((n = c.dataMin),
                    (b.dataMin = Math.min(q(b.dataMin, n), n))),
                  f(c.dataMax) &&
                    ((h = c.dataMax),
                    (b.dataMax = Math.max(q(b.dataMax, h), h))),
                  D(v) && (b.threshold = v),
                  !e.softThreshold || b.positiveValuesOnly)
                )
                  b.softThreshold = !1;
              }
            });
          });
          c(this, "afterGetSeriesExtremes");
        };
        a.prototype.translate = function (b, c, d, a, e, n) {
          var v = this.linkedParent || this,
            h = a && v.old ? v.old.min : v.min;
          if (!f(h)) return NaN;
          var q = v.minPixelPadding;
          e =
            (v.isOrdinal ||
              (v.brokenAxis && v.brokenAxis.hasBreaks) ||
              (v.logarithmic && e)) &&
            v.lin2val;
          var u = 1,
            G = 0;
          a = a && v.old ? v.old.transA : v.transA;
          a || (a = v.transA);
          d && ((u *= -1), (G = v.len));
          v.reversed && ((u *= -1), (G -= u * (v.sector || v.len)));
          c
            ? ((n = (b * u + G - q) / a + h), e && (n = v.lin2val(n)))
            : (e && (b = v.val2lin(b)),
              (b = u * (b - h) * a),
              (n = (v.isRadial ? b : p(b)) + G + u * q + (f(n) ? a * n : 0)));
          return n;
        };
        a.prototype.toPixels = function (b, c) {
          return (
            this.translate(b, !1, !this.horiz, void 0, !0) + (c ? 0 : this.pos)
          );
        };
        a.prototype.toValue = function (b, c) {
          return this.translate(
            b - (c ? 0 : this.pos),
            !0,
            !this.horiz,
            void 0,
            !0,
          );
        };
        a.prototype.getPlotLinePath = function (b) {
          function d(b, c, f) {
            "pass" !== p &&
              (b < c || b > f) &&
              (p ? (b = k(b, c, f)) : (r = !0));
            return b;
          }
          var a = this,
            e = a.chart,
            v = a.left,
            n = a.top,
            h = b.old,
            u = b.value,
            g = b.lineWidth,
            z = (h && e.oldChartHeight) || e.chartHeight,
            w = (h && e.oldChartWidth) || e.chartWidth,
            m = a.transB,
            l = b.translatedValue,
            p = b.force,
            J,
            N,
            y,
            O,
            r;
          b = {
            value: u,
            lineWidth: g,
            old: h,
            force: p,
            acrossPanes: b.acrossPanes,
            translatedValue: l,
          };
          c(this, "getPlotLinePath", b, function (b) {
            l = q(l, a.translate(u, void 0, void 0, h));
            l = k(l, -1e5, 1e5);
            J = y = Math.round(l + m);
            N = O = Math.round(z - l - m);
            f(l)
              ? a.horiz
                ? ((N = n), (O = z - a.bottom), (J = y = d(J, v, v + a.width)))
                : ((J = v), (y = w - a.right), (N = O = d(N, n, n + a.height)))
              : ((r = !0), (p = !1));
            b.path =
              r && !p
                ? null
                : e.renderer.crispLine(
                    [
                      ["M", J, N],
                      ["L", y, O],
                    ],
                    g || 1,
                  );
          });
          return b.path;
        };
        a.prototype.getLinearTickPositions = function (b, c, f) {
          var d = p(Math.floor(c / b) * b);
          f = p(Math.ceil(f / b) * b);
          var a = [],
            e;
          p(d + b) === d && (e = 20);
          if (this.single) return [c];
          for (c = d; c <= f; ) {
            a.push(c);
            c = p(c + b, e);
            if (c === v) break;
            var v = c;
          }
          return a;
        };
        a.prototype.getMinorTickInterval = function () {
          var b = this.options;
          return !0 === b.minorTicks
            ? q(b.minorTickInterval, "auto")
            : !1 === b.minorTicks
              ? null
              : b.minorTickInterval;
        };
        a.prototype.getMinorTickPositions = function () {
          var b = this.options,
            c = this.tickPositions,
            f = this.minorTickInterval,
            d = this.pointRangePadding || 0,
            a = this.min - d;
          d = this.max + d;
          var e = d - a,
            n = [];
          if (e && e / f < this.len / 3) {
            var h = this.logarithmic;
            if (h)
              this.paddedTicks.forEach(function (b, c, d) {
                c &&
                  n.push.apply(n, h.getLogTickPositions(f, d[c - 1], d[c], !0));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              n = n.concat(
                this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(f),
                  a,
                  d,
                  b.startOfWeek,
                ),
              );
            else
              for (b = a + ((c[0] - a) % f); b <= d && b !== n[0]; b += f)
                n.push(b);
          }
          0 !== n.length && this.trimTicks(n);
          return n;
        };
        a.prototype.adjustForMinRange = function () {
          var b = this.options,
            c = this.logarithmic,
            f = this.min,
            d = this.max,
            a = 0,
            e,
            n,
            u,
            g;
          this.isXAxis &&
            "undefined" === typeof this.minRange &&
            !c &&
            (D(b.min) || D(b.max) || D(b.floor) || D(b.ceiling)
              ? (this.minRange = null)
              : (this.series.forEach(function (b) {
                  u = b.xData;
                  g = b.xIncrement ? 1 : u.length - 1;
                  if (1 < u.length)
                    for (e = g; 0 < e; e--)
                      if (((n = u[e] - u[e - 1]), !a || n < a)) a = n;
                }),
                (this.minRange = Math.min(
                  5 * a,
                  this.dataMax - this.dataMin,
                ))));
          if (d - f < this.minRange) {
            var z = this.dataMax - this.dataMin >= this.minRange;
            var k = this.minRange;
            var w = (k - d + f) / 2;
            w = [f - w, q(b.min, f - w)];
            z &&
              (w[2] = this.logarithmic
                ? this.logarithmic.log2lin(this.dataMin)
                : this.dataMin);
            f = h(w);
            d = [f + k, q(b.max, f + k)];
            z && (d[2] = c ? c.log2lin(this.dataMax) : this.dataMax);
            d = m(d);
            d - f < k && ((w[0] = d - k), (w[1] = q(b.min, d - k)), (f = h(w)));
          }
          this.min = f;
          this.max = d;
        };
        a.prototype.getClosest = function () {
          var b;
          this.categories
            ? (b = 1)
            : this.series.forEach(function (c) {
                var f = c.closestPointRange,
                  d = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
                !c.noSharedTooltip &&
                  D(f) &&
                  d &&
                  (b = D(b) ? Math.min(b, f) : f);
              });
          return b;
        };
        a.prototype.nameToX = function (b) {
          var c = w(this.options.categories),
            f = c ? this.categories : this.names,
            d = b.options.x;
          b.series.requireSorting = !1;
          D(d) ||
            (d =
              this.options.uniqueNames && f
                ? c
                  ? f.indexOf(b.name)
                  : q(f.keys[b.name], -1)
                : b.series.autoIncrement());
          if (-1 === d) {
            if (!c && f) var a = f.length;
          } else a = d;
          "undefined" !== typeof a
            ? ((this.names[a] = b.name), (this.names.keys[b.name] = a))
            : b.x && (a = b.x);
          return a;
        };
        a.prototype.updateNames = function () {
          var b = this,
            c = this.names;
          0 < c.length &&
            (Object.keys(c.keys).forEach(function (b) {
              delete c.keys[b];
            }),
            (c.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (c) {
              c.xIncrement = null;
              if (!c.points || c.isDirtyData)
                (b.max = Math.max(b.max, c.xData.length - 1)),
                  c.processData(),
                  c.generatePoints();
              c.data.forEach(function (f, d) {
                if (f && f.options && "undefined" !== typeof f.name) {
                  var a = b.nameToX(f);
                  "undefined" !== typeof a &&
                    a !== f.x &&
                    ((f.x = a), (c.xData[d] = a));
                }
              });
            }));
        };
        a.prototype.setAxisTranslation = function () {
          var b = this,
            f = b.max - b.min,
            d = b.linkedParent,
            a = !!b.categories,
            e = b.isXAxis,
            h = b.axisPointRange || 0,
            u = 0,
            g = 0,
            k = b.transA;
          if (e || a || h) {
            var z = b.getClosest();
            d
              ? ((u = d.minPointOffset), (g = d.pointRangePadding))
              : b.series.forEach(function (c) {
                  var f = a
                      ? 1
                      : e
                        ? q(c.options.pointRange, z, 0)
                        : b.axisPointRange || 0,
                    d = c.options.pointPlacement;
                  h = Math.max(h, f);
                  if (!b.single || a)
                    (c = c.is("xrange") ? !e : e),
                      (u = Math.max(u, c && n(d) ? 0 : f / 2)),
                      (g = Math.max(g, c && "on" === d ? 0 : f));
                });
            d = b.ordinal && b.ordinal.slope && z ? b.ordinal.slope / z : 1;
            b.minPointOffset = u *= d;
            b.pointRangePadding = g *= d;
            b.pointRange = Math.min(h, b.single && a ? 1 : f);
            e && (b.closestPointRange = z);
          }
          b.translationSlope =
            b.transA =
            k =
              b.staticScale || b.len / (f + g || 1);
          b.transB = b.horiz ? b.left : b.bottom;
          b.minPixelPadding = k * u;
          c(this, "afterSetAxisTranslation");
        };
        a.prototype.minFromRange = function () {
          return this.max - this.range;
        };
        a.prototype.setTickInterval = function (b) {
          var d = this.chart,
            a = this.logarithmic,
            e = this.options,
            n = this.isXAxis,
            h = this.isLinked,
            u = e.tickPixelInterval,
            v = this.categories,
            g = this.softThreshold,
            k = e.maxPadding,
            z = e.minPadding,
            w =
              f(e.tickInterval) && 0 <= e.tickInterval
                ? e.tickInterval
                : void 0,
            m = f(this.threshold) ? this.threshold : null;
          this.dateTime || v || h || this.getTickAmount();
          var l = q(this.userMin, e.min);
          var J = q(this.userMax, e.max);
          if (h) {
            this.linkedParent = d[this.coll][e.linkedTo];
            var N = this.linkedParent.getExtremes();
            this.min = q(N.min, N.dataMin);
            this.max = q(N.max, N.dataMax);
            e.type !== this.linkedParent.options.type && A(11, 1, d);
          } else {
            if (g && D(m))
              if (this.dataMin >= m) (N = m), (z = 0);
              else if (this.dataMax <= m) {
                var y = m;
                k = 0;
              }
            this.min = q(l, N, this.dataMin);
            this.max = q(J, y, this.dataMax);
          }
          a &&
            (this.positiveValuesOnly &&
              !b &&
              0 >= Math.min(this.min, q(this.dataMin, this.min)) &&
              A(10, 1, d),
            (this.min = p(a.log2lin(this.min), 16)),
            (this.max = p(a.log2lin(this.max), 16)));
          this.range &&
            D(this.max) &&
            ((this.userMin =
              this.min =
              l =
                Math.max(this.dataMin, this.minFromRange())),
            (this.userMax = J = this.max),
            (this.range = null));
          c(this, "foundExtremes");
          this.beforePadding && this.beforePadding();
          this.adjustForMinRange();
          !(
            v ||
            this.axisPointRange ||
            (this.stacking && this.stacking.usePercentage) ||
            h
          ) &&
            D(this.min) &&
            D(this.max) &&
            (d = this.max - this.min) &&
            (!D(l) && z && (this.min -= d * z),
            !D(J) && k && (this.max += d * k));
          f(this.userMin) ||
            (f(e.softMin) && e.softMin < this.min && (this.min = l = e.softMin),
            f(e.floor) && (this.min = Math.max(this.min, e.floor)));
          f(this.userMax) ||
            (f(e.softMax) && e.softMax > this.max && (this.max = J = e.softMax),
            f(e.ceiling) && (this.max = Math.min(this.max, e.ceiling)));
          g &&
            D(this.dataMin) &&
            ((m = m || 0),
            !D(l) && this.min < m && this.dataMin >= m
              ? (this.min = this.options.minRange
                  ? Math.min(m, this.max - this.minRange)
                  : m)
              : !D(J) &&
                this.max > m &&
                this.dataMax <= m &&
                (this.max = this.options.minRange
                  ? Math.max(m, this.min + this.minRange)
                  : m));
          f(this.min) &&
            f(this.max) &&
            !this.chart.polar &&
            this.min > this.max &&
            (D(this.options.min)
              ? (this.max = this.min)
              : D(this.options.max) && (this.min = this.max));
          this.tickInterval =
            this.min === this.max ||
            "undefined" === typeof this.min ||
            "undefined" === typeof this.max
              ? 1
              : h &&
                  this.linkedParent &&
                  !w &&
                  u === this.linkedParent.options.tickPixelInterval
                ? (w = this.linkedParent.tickInterval)
                : q(
                    w,
                    this.tickAmount
                      ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1)
                      : void 0,
                    v ? 1 : ((this.max - this.min) * u) / Math.max(this.len, u),
                  );
          if (n && !b) {
            var O =
              this.min !== (this.old && this.old.min) ||
              this.max !== (this.old && this.old.max);
            this.series.forEach(function (b) {
              b.forceCrop = b.forceCropping && b.forceCropping();
              b.processData(O);
            });
            c(this, "postProcessData", { hasExtremesChanged: O });
          }
          this.setAxisTranslation();
          c(this, "initialAxisTranslation");
          this.pointRange &&
            !w &&
            (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          b = q(
            e.minTickInterval,
            this.dateTime &&
              !this.series.some(function (b) {
                return b.noSharedTooltip;
              })
              ? this.closestPointRange
              : 0,
          );
          !w && this.tickInterval < b && (this.tickInterval = b);
          this.dateTime ||
            this.logarithmic ||
            w ||
            (this.tickInterval = T(this, this.tickInterval));
          this.tickAmount || (this.tickInterval = this.unsquish());
          this.setTickPositions();
        };
        a.prototype.setTickPositions = function () {
          var b = this.options,
            d = b.tickPositions,
            a = b.tickPositioner,
            e = this.getMinorTickInterval(),
            n = this.hasVerticalPanning(),
            h = "colorAxis" === this.coll,
            u = (h || !n) && b.startOnTick;
          n = (h || !n) && b.endOnTick;
          h = [];
          var q;
          this.tickmarkOffset =
            this.categories &&
            "between" === b.tickmarkPlacement &&
            1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval =
            "auto" === e && this.tickInterval ? this.tickInterval / 5 : e;
          this.single =
            this.min === this.max &&
            D(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
          if (d) h = d.slice();
          else if (f(this.min) && f(this.max)) {
            if (
              (this.ordinal && this.ordinal.positions) ||
              !(
                (this.max - this.min) / this.tickInterval >
                Math.max(2 * this.len, 200)
              )
            )
              if (this.dateTime)
                h = this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(
                    this.tickInterval,
                    b.units,
                  ),
                  this.min,
                  this.max,
                  b.startOfWeek,
                  this.ordinal && this.ordinal.positions,
                  this.closestPointRange,
                  !0,
                );
              else if (this.logarithmic)
                h = this.logarithmic.getLogTickPositions(
                  this.tickInterval,
                  this.min,
                  this.max,
                );
              else
                for (e = b = this.tickInterval; e <= 2 * b; )
                  if (
                    ((h = this.getLinearTickPositions(
                      this.tickInterval,
                      this.min,
                      this.max,
                    )),
                    this.tickAmount && h.length > this.tickAmount)
                  )
                    this.tickInterval = T(this, (e *= 1.1));
                  else break;
            else (h = [this.min, this.max]), A(19, !1, this.chart);
            h.length > this.len &&
              ((h = [h[0], h[h.length - 1]]), h[0] === h[1] && (h.length = 1));
            a &&
              ((this.tickPositions = h),
              (q = a.apply(this, [this.min, this.max])) && (h = q));
          }
          this.tickPositions = h;
          this.paddedTicks = h.slice(0);
          this.trimTicks(h, u, n);
          !this.isLinked &&
            f(this.min) &&
            f(this.max) &&
            (this.single &&
              2 > h.length &&
              !this.categories &&
              !this.series.some(function (b) {
                return (
                  b.is("heatmap") && "between" === b.options.pointPlacement
                );
              }) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            d || q || this.adjustTickAmount());
          c(this, "afterSetTickPositions");
        };
        a.prototype.trimTicks = function (b, f, d) {
          var a = b[0],
            e = b[b.length - 1],
            h = (!this.isOrdinal && this.minPointOffset) || 0;
          c(this, "trimTicks");
          if (!this.isLinked) {
            if (f && -Infinity !== a) this.min = a;
            else for (; this.min - h > b[0]; ) b.shift();
            if (d) this.max = e;
            else for (; this.max + h < b[b.length - 1]; ) b.pop();
            0 === b.length &&
              D(a) &&
              !this.options.tickPositions &&
              b.push((e + a) / 2);
          }
        };
        a.prototype.alignToOthers = function () {
          var b = this,
            c = [this],
            d = b.options,
            a =
              "yAxis" === this.coll && this.chart.options.chart.alignThresholds,
            e = [],
            h;
          b.thresholdAlignment = void 0;
          if (
            ((!1 !== this.chart.options.chart.alignTicks && d.alignTicks) ||
              a) &&
            !1 !== d.startOnTick &&
            !1 !== d.endOnTick &&
            !b.logarithmic
          ) {
            var n = function (b) {
                var c = b.options;
                return [
                  b.horiz ? c.left : c.top,
                  c.width,
                  c.height,
                  c.pane,
                ].join();
              },
              u = n(this);
            this.chart[this.coll].forEach(function (f) {
              var d = f.series;
              d.length &&
                d.some(function (b) {
                  return b.visible;
                }) &&
                f !== b &&
                n(f) === u &&
                ((h = !0), c.push(f));
            });
          }
          if (h && a) {
            c.forEach(function (c) {
              c = c.getThresholdAlignment(b);
              f(c) && e.push(c);
            });
            var q =
              1 < e.length
                ? e.reduce(function (b, c) {
                    return b + c;
                  }, 0) / e.length
                : void 0;
            c.forEach(function (b) {
              b.thresholdAlignment = q;
            });
          }
          return h;
        };
        a.prototype.getThresholdAlignment = function (b) {
          (!f(this.dataMin) ||
            (this !== b &&
              this.series.some(function (b) {
                return b.isDirty || b.isDirtyData;
              }))) &&
            this.getSeriesExtremes();
          if (f(this.threshold))
            return (
              (b = k(
                (this.threshold - (this.dataMin || 0)) /
                  ((this.dataMax || 0) - (this.dataMin || 0)),
                0,
                1,
              )),
              this.options.reversed && (b = 1 - b),
              b
            );
        };
        a.prototype.getTickAmount = function () {
          var b = this.options,
            c = b.tickPixelInterval,
            f = b.tickAmount;
          !D(b.tickInterval) &&
            !f &&
            this.len < c &&
            !this.isRadial &&
            !this.logarithmic &&
            b.startOnTick &&
            b.endOnTick &&
            (f = 2);
          !f && this.alignToOthers() && (f = Math.ceil(this.len / c) + 1);
          4 > f && ((this.finalTickAmt = f), (f = 5));
          this.tickAmount = f;
        };
        a.prototype.adjustTickAmount = function () {
          var b = this,
            c = b.finalTickAmt,
            d = b.max,
            a = b.min,
            e = b.options,
            h = b.tickPositions,
            n = b.tickAmount,
            u = b.thresholdAlignment,
            g = h && h.length,
            k = q(b.threshold, b.softThreshold ? 0 : null);
          var z = b.tickInterval;
          if (f(u)) {
            var w = 0.5 > u ? Math.ceil(u * (n - 1)) : Math.floor(u * (n - 1));
            e.reversed && (w = n - 1 - w);
          }
          if (b.hasData() && f(a) && f(d)) {
            u = function () {
              b.transA *= (g - 1) / (n - 1);
              b.min = e.startOnTick ? h[0] : Math.min(a, h[0]);
              b.max = e.endOnTick
                ? h[h.length - 1]
                : Math.max(d, h[h.length - 1]);
            };
            if (f(w) && f(b.threshold)) {
              for (
                ;
                h[w] !== k || h.length !== n || h[0] > a || h[h.length - 1] < d;

              ) {
                h.length = 0;
                for (h.push(b.threshold); h.length < n; )
                  void 0 === h[w] || h[w] > b.threshold
                    ? h.unshift(p(h[0] - z))
                    : h.push(p(h[h.length - 1] + z));
                if (z > 8 * b.tickInterval) break;
                z *= 2;
              }
              u();
            } else if (g < n) {
              for (; h.length < n; )
                h.length % 2 || a === k
                  ? h.push(p(h[h.length - 1] + z))
                  : h.unshift(p(h[0] - z));
              u();
            }
            if (D(c)) {
              for (z = k = h.length; z--; )
                ((3 === c && 1 === z % 2) || (2 >= c && 0 < z && z < k - 1)) &&
                  h.splice(z, 1);
              b.finalTickAmt = void 0;
            }
          }
        };
        a.prototype.setScale = function () {
          var b = !1,
            f = !1;
          this.series.forEach(function (c) {
            b = b || c.isDirtyData || c.isDirty;
            f = f || (c.xAxis && c.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          var d = this.len !== (this.old && this.old.len);
          d ||
          b ||
          f ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking &&
                (this.stacking.resetStacks(), this.stacking.buildStacks()),
              (this.forceRedraw = !1),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  d ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          b && this.panningState && (this.panningState.isDirty = !0);
          c(this, "afterSetScale");
        };
        a.prototype.setExtremes = function (b, f, d, a, e) {
          var h = this,
            n = h.chart;
          d = q(d, !0);
          h.series.forEach(function (b) {
            delete b.kdTree;
          });
          e = y(e, { min: b, max: f });
          c(h, "setExtremes", e, function () {
            h.userMin = b;
            h.userMax = f;
            h.eventArgs = e;
            d && n.redraw(a);
          });
        };
        a.prototype.zoom = function (b, f) {
          var d = this,
            a = this.dataMin,
            e = this.dataMax,
            h = this.options,
            n = Math.min(a, q(h.min, a)),
            u = Math.max(e, q(h.max, e));
          b = { newMin: b, newMax: f };
          c(this, "zoom", b, function (b) {
            var c = b.newMin,
              f = b.newMax;
            if (c !== d.min || f !== d.max)
              d.allowZoomOutside ||
                (D(a) && (c < n && (c = n), c > u && (c = u)),
                D(e) && (f < n && (f = n), f > u && (f = u))),
                (d.displayBtn =
                  "undefined" !== typeof c || "undefined" !== typeof f),
                d.setExtremes(c, f, !1, void 0, { trigger: "zoom" });
            b.zoomed = !0;
          });
          return b.zoomed;
        };
        a.prototype.setAxisSize = function () {
          var b = this.chart,
            c = this.options,
            f = c.offsets || [0, 0, 0, 0],
            d = this.horiz,
            a = (this.width = Math.round(
              N(q(c.width, b.plotWidth - f[3] + f[1]), b.plotWidth),
            )),
            e = (this.height = Math.round(
              N(q(c.height, b.plotHeight - f[0] + f[2]), b.plotHeight),
            )),
            h = (this.top = Math.round(
              N(q(c.top, b.plotTop + f[0]), b.plotHeight, b.plotTop),
            ));
          c = this.left = Math.round(
            N(q(c.left, b.plotLeft + f[3]), b.plotWidth, b.plotLeft),
          );
          this.bottom = b.chartHeight - e - h;
          this.right = b.chartWidth - a - c;
          this.len = Math.max(d ? a : e, 0);
          this.pos = d ? c : h;
        };
        a.prototype.getExtremes = function () {
          var b = this.logarithmic;
          return {
            min: b ? p(b.lin2log(this.min)) : this.min,
            max: b ? p(b.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        };
        a.prototype.getThreshold = function (b) {
          var c = this.logarithmic,
            f = c ? c.lin2log(this.min) : this.min;
          c = c ? c.lin2log(this.max) : this.max;
          null === b || -Infinity === b
            ? (b = f)
            : Infinity === b
              ? (b = c)
              : f > b
                ? (b = f)
                : c < b && (b = c);
          return this.translate(b, 0, 1, 0, 1);
        };
        a.prototype.autoLabelAlign = function (b) {
          var f = (q(b, 0) - 90 * this.side + 720) % 360;
          b = { align: "center" };
          c(this, "autoLabelAlign", b, function (b) {
            15 < f && 165 > f
              ? (b.align = "right")
              : 195 < f && 345 > f && (b.align = "left");
          });
          return b.align;
        };
        a.prototype.tickSize = function (b) {
          var f = this.options,
            d = q(
              f["tick" === b ? "tickWidth" : "minorTickWidth"],
              "tick" === b && this.isXAxis && !this.categories ? 1 : 0,
            ),
            a = f["tick" === b ? "tickLength" : "minorTickLength"];
          if (d && a) {
            "inside" === f[b + "Position"] && (a = -a);
            var e = [a, d];
          }
          b = { tickSize: e };
          c(this, "afterTickSize", b);
          return b.tickSize;
        };
        a.prototype.labelMetrics = function () {
          var b = (this.tickPositions && this.tickPositions[0]) || 0;
          return this.chart.renderer.fontMetrics(
            this.options.labels.style.fontSize,
            this.ticks[b] && this.ticks[b].label,
          );
        };
        a.prototype.unsquish = function () {
          var b = this.options.labels,
            c = this.horiz,
            a = this.tickInterval,
            e =
              this.len /
              (((this.categories ? 1 : 0) + this.max - this.min) / a),
            h = b.rotation,
            n = this.labelMetrics(),
            u = Math.max(this.max - this.min, 0),
            g = function (b) {
              var c = b / (e || 1);
              c = 1 < c ? Math.ceil(c) : 1;
              c * a > u &&
                Infinity !== b &&
                Infinity !== e &&
                u &&
                (c = Math.ceil(u / a));
              return p(c * a);
            },
            z = a,
            k = Number.MAX_VALUE;
          if (c) {
            if (!b.staggerLines)
              if (f(h)) var w = [h];
              else e < b.autoRotationLimit && (w = b.autoRotation);
            if (w)
              for (var m = (c = void 0), l = 0, J = w; l < J.length; l++) {
                var N = J[l];
                if (N === h || (N && -90 <= N && 90 >= N))
                  if (
                    ((c = g(Math.abs(n.h / Math.sin(d * N)))),
                    (m = c + Math.abs(N / 360)),
                    m < k)
                  ) {
                    k = m;
                    var y = N;
                    z = c;
                  }
              }
          } else z = g(n.h);
          this.autoRotation = w;
          this.labelRotation = q(y, f(h) ? h : 0);
          return b.step ? a : z;
        };
        a.prototype.getSlotWidth = function (b) {
          var c = this.chart,
            d = this.horiz,
            a = this.options.labels,
            e = Math.max(
              this.tickPositions.length - (this.categories ? 0 : 1),
              1,
            ),
            h = c.margin[3];
          if (b && f(b.slotWidth)) return b.slotWidth;
          if (d && 2 > a.step)
            return a.rotation ? 0 : ((this.staggerLines || 1) * this.len) / e;
          if (!d) {
            b = a.style.width;
            if (void 0 !== b) return parseInt(String(b), 10);
            if (h) return h - c.spacing[3];
          }
          return 0.33 * c.chartWidth;
        };
        a.prototype.renderUnsquish = function () {
          var b = this.chart,
            c = b.renderer,
            f = this.tickPositions,
            d = this.ticks,
            a = this.options.labels,
            e = a.style,
            h = this.horiz,
            u = this.getSlotWidth(),
            q = Math.max(1, Math.round(u - 2 * a.padding)),
            g = {},
            z = this.labelMetrics(),
            k = e.textOverflow,
            w = 0;
          n(a.rotation) || (g.rotation = a.rotation || 0);
          f.forEach(function (b) {
            b = d[b];
            b.movedLabel && b.replaceMovedLabel();
            b &&
              b.label &&
              b.label.textPxLength > w &&
              (w = b.label.textPxLength);
          });
          this.maxLabelLength = w;
          if (this.autoRotation)
            w > q && w > z.h
              ? (g.rotation = this.labelRotation)
              : (this.labelRotation = 0);
          else if (u) {
            var m = q;
            if (!k) {
              var l = "clip";
              for (q = f.length; !h && q--; ) {
                var p = f[q];
                if ((p = d[p].label))
                  p.styles && "ellipsis" === p.styles.textOverflow
                    ? p.css({ textOverflow: "clip" })
                    : p.textPxLength > u && p.css({ width: u + "px" }),
                    p.getBBox().height > this.len / f.length - (z.h - z.f) &&
                      (p.specificTextOverflow = "ellipsis");
              }
            }
          }
          g.rotation &&
            ((m = w > 0.5 * b.chartHeight ? 0.33 * b.chartHeight : w),
            k || (l = "ellipsis"));
          if (
            (this.labelAlign =
              a.align || this.autoLabelAlign(this.labelRotation))
          )
            g.align = this.labelAlign;
          f.forEach(function (b) {
            var c = (b = d[b]) && b.label,
              f = e.width,
              a = {};
            c &&
              (c.attr(g),
              b.shortenLabel
                ? b.shortenLabel()
                : m &&
                    !f &&
                    "nowrap" !== e.whiteSpace &&
                    (m < c.textPxLength || "SPAN" === c.element.tagName)
                  ? ((a.width = m + "px"),
                    k || (a.textOverflow = c.specificTextOverflow || l),
                    c.css(a))
                  : c.styles &&
                    c.styles.width &&
                    !a.width &&
                    !f &&
                    c.css({ width: null }),
              delete c.specificTextOverflow,
              (b.rotation = g.rotation));
          }, this);
          this.tickRotCorr = c.rotCorr(
            z.b,
            this.labelRotation || 0,
            0 !== this.side,
          );
        };
        a.prototype.hasData = function () {
          return (
            this.series.some(function (b) {
              return b.hasData();
            }) ||
            (this.options.showEmpty && D(this.min) && D(this.max))
          );
        };
        a.prototype.addTitle = function (c) {
          var f = this.chart.renderer,
            d = this.horiz,
            a = this.opposite,
            e = this.options.title,
            h = this.chart.styledMode,
            n;
          this.axisTitle ||
            ((n = e.textAlign) ||
              (n = (
                d
                  ? { low: "left", middle: "center", high: "right" }
                  : {
                      low: a ? "right" : "left",
                      middle: "center",
                      high: a ? "left" : "right",
                    }
              )[e.align]),
            (this.axisTitle = f
              .text(e.text || "", 0, 0, e.useHTML)
              .attr({ zIndex: 7, rotation: e.rotation, align: n })
              .addClass("highcharts-axis-title")),
            h || this.axisTitle.css(b(e.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          h ||
            e.style.width ||
            this.isRadial ||
            this.axisTitle.css({ width: this.len + "px" });
          this.axisTitle[c ? "show" : "hide"](c);
        };
        a.prototype.generateTick = function (b) {
          var c = this.ticks;
          c[b] ? c[b].addLabel() : (c[b] = new H(this, b));
        };
        a.prototype.getOffset = function () {
          var b = this,
            f = this,
            d = f.chart,
            a = f.horiz,
            e = f.options,
            h = f.side,
            n = f.ticks,
            u = f.tickPositions,
            g = f.coll,
            k = f.axisParent,
            w = d.renderer,
            m = d.inverted && !f.isZAxis ? [1, 0, 3, 2][h] : h,
            l = f.hasData(),
            p = e.title,
            N = e.labels,
            J = d.axisOffset;
          d = d.clipOffset;
          var y = [-1, 1, 1, -1][h],
            O = e.className,
            r,
            Q = 0,
            ja = 0,
            da = 0;
          f.showAxis = r = l || e.showEmpty;
          f.staggerLines = (f.horiz && N.staggerLines) || void 0;
          if (!f.axisGroup) {
            var I = function (c, f, d) {
              return w
                .g(c)
                .attr({ zIndex: d })
                .addClass(
                  "highcharts-".concat(g.toLowerCase()).concat(f, " ") +
                    (b.isRadial
                      ? "highcharts-radial-axis".concat(f, " ")
                      : "") +
                    (O || ""),
                )
                .add(k);
            };
            f.gridGroup = I("grid", "-grid", e.gridZIndex);
            f.axisGroup = I("axis", "", e.zIndex);
            f.labelGroup = I("axis-labels", "-labels", N.zIndex);
          }
          l || f.isLinked
            ? (u.forEach(function (b) {
                f.generateTick(b);
              }),
              f.renderUnsquish(),
              (f.reserveSpaceDefault =
                0 === h ||
                2 === h ||
                { 1: "left", 3: "right" }[h] === f.labelAlign),
              q(
                N.reserveSpace,
                "center" === f.labelAlign ? !0 : null,
                f.reserveSpaceDefault,
              ) &&
                u.forEach(function (b) {
                  da = Math.max(n[b].getLabelSize(), da);
                }),
              f.staggerLines && (da *= f.staggerLines),
              (f.labelOffset = da * (f.opposite ? -1 : 1)))
            : z(n, function (b, c) {
                b.destroy();
                delete n[c];
              });
          if (
            p &&
            p.text &&
            !1 !== p.enabled &&
            (f.addTitle(r), r && !1 !== p.reserveSpace)
          ) {
            f.titleOffset = Q = f.axisTitle.getBBox()[a ? "height" : "width"];
            var t = p.offset;
            ja = D(t) ? 0 : q(p.margin, a ? 5 : 10);
          }
          f.renderLine();
          f.offset = y * q(e.offset, J[h] ? J[h] + (e.margin || 0) : 0);
          f.tickRotCorr = f.tickRotCorr || { x: 0, y: 0 };
          p = 0 === h ? -f.labelMetrics().h : 2 === h ? f.tickRotCorr.y : 0;
          l = Math.abs(da) + ja;
          da && (l = l - p + y * (a ? q(N.y, f.tickRotCorr.y + 8 * y) : N.x));
          f.axisTitleMargin = q(t, l);
          f.getMaxLabelDimensions &&
            (f.maxLabelDimensions = f.getMaxLabelDimensions(n, u));
          "colorAxis" !== g &&
            ((a = this.tickSize("tick")),
            (J[h] = Math.max(
              J[h],
              (f.axisTitleMargin || 0) + Q + y * f.offset,
              l,
              u && u.length && a ? a[0] + y * f.offset : 0,
            )),
            (e =
              !f.axisLine || e.offset
                ? 0
                : 2 * Math.floor(f.axisLine.strokeWidth() / 2)),
            (d[m] = Math.max(d[m], e)));
          c(this, "afterGetOffset");
        };
        a.prototype.getLinePath = function (b) {
          var c = this.chart,
            f = this.opposite,
            d = this.offset,
            a = this.horiz,
            e = this.left + (f ? this.width : 0) + d;
          d = c.chartHeight - this.bottom - (f ? this.height : 0) + d;
          f && (b *= -1);
          return c.renderer.crispLine(
            [
              ["M", a ? this.left : e, a ? d : this.top],
              [
                "L",
                a ? c.chartWidth - this.right : e,
                a ? d : c.chartHeight - this.bottom,
              ],
            ],
            b,
          );
        };
        a.prototype.renderLine = function () {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass("highcharts-axis-line")
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                "stroke-width": this.options.lineWidth,
                zIndex: 7,
              }));
        };
        a.prototype.getTitlePosition = function () {
          var b = this.horiz,
            f = this.left,
            d = this.top,
            a = this.len,
            e = this.options.title,
            h = b ? f : d,
            n = this.opposite,
            u = this.offset,
            q = e.x,
            g = e.y,
            z = this.axisTitle,
            k = this.chart.renderer.fontMetrics(e.style.fontSize, z);
          z = z ? Math.max(z.getBBox(!1, 0).height - k.h - 1, 0) : 0;
          a = {
            low: h + (b ? 0 : a),
            middle: h + a / 2,
            high: h + (b ? a : 0),
          }[e.align];
          f =
            (b ? d + this.height : f) +
            (b ? 1 : -1) * (n ? -1 : 1) * (this.axisTitleMargin || 0) +
            [-z, z, k.f, -z][this.side];
          b = {
            x: b ? a + q : f + (n ? this.width : 0) + u + q,
            y: b ? f + g - (n ? this.height : 0) + u : a + g,
          };
          c(this, "afterGetTitlePosition", { titlePosition: b });
          return b;
        };
        a.prototype.renderMinorTick = function (b, c) {
          var f = this.minorTicks;
          f[b] || (f[b] = new H(this, b, "minor"));
          c && f[b].isNew && f[b].render(null, !0);
          f[b].render(null, !1, 1);
        };
        a.prototype.renderTick = function (b, c, f) {
          var d = this.ticks;
          if (
            !this.isLinked ||
            (b >= this.min && b <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            d[b] || (d[b] = new H(this, b)),
              f && d[b].isNew && d[b].render(c, !0, -1),
              d[b].render(c);
        };
        a.prototype.render = function () {
          var b = this,
            d = b.chart,
            a = b.logarithmic,
            e = b.options,
            h = b.isLinked,
            n = b.tickPositions,
            u = b.axisTitle,
            q = b.ticks,
            g = b.minorTicks,
            k = b.alternateBands,
            w = e.stackLabels,
            m = e.alternateGridColor,
            l = b.tickmarkOffset,
            p = b.axisLine,
            N = b.showAxis,
            J = r(d.renderer.globalAnimation),
            y,
            O;
          b.labelEdge.length = 0;
          b.overlap = !1;
          [q, g, k].forEach(function (b) {
            z(b, function (b) {
              b.isActive = !1;
            });
          });
          if (b.hasData() || h) {
            var D = b.chart.hasRendered && b.old && f(b.old.min);
            b.minorTickInterval &&
              !b.categories &&
              b.getMinorTickPositions().forEach(function (c) {
                b.renderMinorTick(c, D);
              });
            n.length &&
              (n.forEach(function (c, f) {
                b.renderTick(c, f, D);
              }),
              l &&
                (0 === b.min || b.single) &&
                (q[-1] || (q[-1] = new H(b, -1, null, !0)), q[-1].render(-1)));
            m &&
              n.forEach(function (c, f) {
                O = "undefined" !== typeof n[f + 1] ? n[f + 1] + l : b.max - l;
                0 === f % 2 &&
                  c < b.max &&
                  O <= b.max + (d.polar ? -l : l) &&
                  (k[c] || (k[c] = new B.PlotLineOrBand(b)),
                  (y = c + l),
                  (k[c].options = {
                    from: a ? a.lin2log(y) : y,
                    to: a ? a.lin2log(O) : O,
                    color: m,
                    className: "highcharts-alternate-grid",
                  }),
                  k[c].render(),
                  (k[c].isActive = !0));
              });
            b._addedPlotLB ||
              ((b._addedPlotLB = !0),
              (e.plotLines || [])
                .concat(e.plotBands || [])
                .forEach(function (c) {
                  b.addPlotBandOrLine(c);
                }));
          }
          [q, g, k].forEach(function (b) {
            var c = [],
              f = J.duration;
            z(b, function (b, f) {
              b.isActive || (b.render(f, !1, 0), (b.isActive = !1), c.push(f));
            });
            Q(
              function () {
                for (var f = c.length; f--; )
                  b[c[f]] &&
                    !b[c[f]].isActive &&
                    (b[c[f]].destroy(), delete b[c[f]]);
              },
              b !== k && d.hasRendered && f ? f : 0,
            );
          });
          p &&
            (p[p.isPlaced ? "animate" : "attr"]({
              d: this.getLinePath(p.strokeWidth()),
            }),
            (p.isPlaced = !0),
            p[N ? "show" : "hide"](N));
          u &&
            N &&
            ((e = b.getTitlePosition()),
            u[u.isNew ? "attr" : "animate"](e),
            (u.isNew = !1));
          w && w.enabled && b.stacking && b.stacking.renderStackTotals();
          b.old = {
            len: b.len,
            max: b.max,
            min: b.min,
            transA: b.transA,
            userMax: b.userMax,
            userMin: b.userMin,
          };
          b.isDirty = !1;
          c(this, "afterRender");
        };
        a.prototype.redraw = function () {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (b) {
              b.render();
            }));
          this.series.forEach(function (b) {
            b.isDirty = !0;
          });
        };
        a.prototype.getKeepProps = function () {
          return this.keepProps || a.keepProps;
        };
        a.prototype.destroy = function (b) {
          var f = this,
            d = f.plotLinesAndBands,
            a = this.eventOptions;
          c(this, "destroy", { keepEvents: b });
          b || J(f);
          [f.ticks, f.minorTicks, f.alternateBands].forEach(function (b) {
            I(b);
          });
          if (d) for (b = d.length; b--; ) d[b].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
            .split(" ")
            .forEach(function (b) {
              f[b] && (f[b] = f[b].destroy());
            });
          for (var e in f.plotLinesAndBandsGroups)
            f.plotLinesAndBandsGroups[e] =
              f.plotLinesAndBandsGroups[e].destroy();
          z(f, function (b, c) {
            -1 === f.getKeepProps().indexOf(c) && delete f[c];
          });
          this.eventOptions = a;
        };
        a.prototype.drawCrosshair = function (b, f) {
          var d = this.crosshair,
            a = q(d && d.snap, !0),
            e = this.chart,
            h,
            n = this.cross;
          c(this, "drawCrosshair", { e: b, point: f });
          b || (b = this.cross && this.cross.e);
          if (d && !1 !== (D(f) || !a)) {
            a
              ? D(f) &&
                (h = q(
                  "colorAxis" !== this.coll ? f.crosshairPos : null,
                  this.isXAxis ? f.plotX : this.len - f.plotY,
                ))
              : (h =
                  b &&
                  (this.horiz
                    ? b.chartX - this.pos
                    : this.len - b.chartY + this.pos));
            if (D(h)) {
              var u = {
                value: f && (this.isXAxis ? f.x : q(f.stackY, f.y)),
                translatedValue: h,
              };
              e.polar &&
                y(u, {
                  isCrosshair: !0,
                  chartX: b && b.chartX,
                  chartY: b && b.chartY,
                  point: f,
                });
              u = this.getPlotLinePath(u) || null;
            }
            if (!D(u)) {
              this.hideCrosshair();
              return;
            }
            a = this.categories && !this.isRadial;
            n ||
              ((this.cross = n =
                e.renderer
                  .path()
                  .addClass(
                    "highcharts-crosshair highcharts-crosshair-" +
                      (a ? "category " : "thin ") +
                      (d.className || ""),
                  )
                  .attr({ zIndex: q(d.zIndex, 2) })
                  .add()),
              e.styledMode ||
                (n
                  .attr({
                    stroke:
                      d.color ||
                      (a
                        ? x.parse("#ccd6eb").setOpacity(0.25).get()
                        : "#cccccc"),
                    "stroke-width": q(d.width, 1),
                  })
                  .css({ "pointer-events": "none" }),
                d.dashStyle && n.attr({ dashstyle: d.dashStyle })));
            n.show().attr({ d: u });
            a && !d.width && n.attr({ "stroke-width": this.transA });
            this.cross.e = b;
          } else this.hideCrosshair();
          c(this, "afterDrawCrosshair", { e: b, point: f });
        };
        a.prototype.hideCrosshair = function () {
          this.cross && this.cross.hide();
          c(this, "afterHideCrosshair");
        };
        a.prototype.hasVerticalPanning = function () {
          var b = this.chart.options.chart.panning;
          return !!(b && b.enabled && /y/.test(b.type));
        };
        a.prototype.validatePositiveValue = function (b) {
          return f(b) && 0 < b;
        };
        a.prototype.update = function (c, f) {
          var d = this.chart;
          c = b(this.userOptions, c);
          this.destroy(!0);
          this.init(d, c);
          d.isDirtyBox = !0;
          q(f, !0) && d.redraw();
        };
        a.prototype.remove = function (b) {
          for (
            var c = this.chart, f = this.coll, d = this.series, a = d.length;
            a--;

          )
            d[a] && d[a].remove(!1);
          E(c.axes, this);
          E(c[f], this);
          c[f].forEach(function (b, c) {
            b.options.index = b.userOptions.index = c;
          });
          this.destroy();
          c.isDirtyBox = !0;
          q(b, !0) && c.redraw();
        };
        a.prototype.setTitle = function (b, c) {
          this.update({ title: b }, c);
        };
        a.prototype.setCategories = function (b, c) {
          this.update({ categories: b }, c);
        };
        a.defaultOptions = g.defaultXAxisOptions;
        a.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
        return a;
      })();
      ("");
      return a;
    },
  );
  K(g, "Core/Axis/DateTimeAxis.js", [g["Core/Utilities.js"]], function (a) {
    var g = a.addEvent,
      x = a.getMagnitude,
      F = a.normalizeTickInterval,
      C = a.timeUnits,
      B;
    (function (a) {
      function t() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
      }
      function r(d) {
        "datetime" !== d.userOptions.type
          ? (this.dateTime = void 0)
          : this.dateTime || (this.dateTime = new e(this));
      }
      var l = [];
      a.compose = function (d) {
        -1 === l.indexOf(d) &&
          (l.push(d),
          d.keepProps.push("dateTime"),
          (d.prototype.getTimeTicks = t),
          g(d, "init", r));
        return d;
      };
      var e = (function () {
        function d(d) {
          this.axis = d;
        }
        d.prototype.normalizeTimeTickInterval = function (d, a) {
          var e = a || [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2]],
            ["week", [1, 2]],
            ["month", [1, 2, 3, 4, 6]],
            ["year", null],
          ];
          a = e[e.length - 1];
          var h = C[a[0]],
            g = a[1],
            m;
          for (
            m = 0;
            m < e.length &&
            !((a = e[m]),
            (h = C[a[0]]),
            (g = a[1]),
            e[m + 1] && d <= (h * g[g.length - 1] + C[e[m + 1][0]]) / 2);
            m++
          );
          h === C.year && d < 5 * h && (g = [1, 2, 5]);
          d = F(d / h, g, "year" === a[0] ? Math.max(x(d / h), 1) : 1);
          return { unitRange: h, count: d, unitName: a[0] };
        };
        d.prototype.getXDateFormat = function (d, a) {
          var e = this.axis,
            h = e.chart.time;
          return e.closestPointRange
            ? h.getDateFormat(
                e.closestPointRange,
                d,
                e.options.startOfWeek,
                a,
              ) || h.resolveDTLFormat(a.year).main
            : h.resolveDTLFormat(a.day).main;
        };
        return d;
      })();
      a.Additions = e;
    })(B || (B = {}));
    return B;
  });
  K(g, "Core/Axis/LogarithmicAxis.js", [g["Core/Utilities.js"]], function (a) {
    var g = a.addEvent,
      x = a.normalizeTickInterval,
      F = a.pick,
      C;
    (function (a) {
      function A(a) {
        var d = this.logarithmic;
        "logarithmic" !== a.userOptions.type
          ? (this.logarithmic = void 0)
          : d || (this.logarithmic = new l(this));
      }
      function t() {
        var a = this.logarithmic;
        a &&
          ((this.lin2val = function (d) {
            return a.lin2log(d);
          }),
          (this.val2lin = function (d) {
            return a.log2lin(d);
          }));
      }
      var r = [];
      a.compose = function (a) {
        -1 === r.indexOf(a) &&
          (r.push(a),
          a.keepProps.push("logarithmic"),
          g(a, "init", A),
          g(a, "afterInit", t));
        return a;
      };
      var l = (function () {
        function a(d) {
          this.axis = d;
        }
        a.prototype.getLogTickPositions = function (d, a, e, g) {
          var h = this.axis,
            k = h.len,
            m = h.options,
            l = [];
          g || (this.minorAutoInterval = void 0);
          if (0.5 <= d)
            (d = Math.round(d)), (l = h.getLinearTickPositions(d, a, e));
          else if (0.08 <= d) {
            var r = Math.floor(a),
              y,
              c = (m = void 0);
            for (
              k =
                0.3 < d
                  ? [1, 2, 4]
                  : 0.15 < d
                    ? [1, 2, 4, 6, 8]
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9];
              r < e + 1 && !c;
              r++
            ) {
              var w = k.length;
              for (y = 0; y < w && !c; y++) {
                var f = this.log2lin(this.lin2log(r) * k[y]);
                f > a &&
                  (!g || m <= e) &&
                  "undefined" !== typeof m &&
                  l.push(m);
                m > e && (c = !0);
                m = f;
              }
            }
          } else
            (a = this.lin2log(a)),
              (e = this.lin2log(e)),
              (d = g ? h.getMinorTickInterval() : m.tickInterval),
              (d = F(
                "auto" === d ? null : d,
                this.minorAutoInterval,
                ((m.tickPixelInterval / (g ? 5 : 1)) * (e - a)) /
                  ((g ? k / h.tickPositions.length : k) || 1),
              )),
              (d = x(d)),
              (l = h.getLinearTickPositions(d, a, e).map(this.log2lin)),
              g || (this.minorAutoInterval = d / 5);
          g || (h.tickInterval = d);
          return l;
        };
        a.prototype.lin2log = function (d) {
          return Math.pow(10, d);
        };
        a.prototype.log2lin = function (d) {
          return Math.log(d) / Math.LN10;
        };
        return a;
      })();
      a.Additions = l;
    })(C || (C = {}));
    return C;
  });
  K(
    g,
    "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",
    [g["Core/Utilities.js"]],
    function (a) {
      var g = a.erase,
        x = a.extend,
        F = a.isNumber,
        C;
      (function (a) {
        var A = [],
          t;
        a.compose = function (a, e) {
          t || (t = a);
          -1 === A.indexOf(e) && (A.push(e), x(e.prototype, r.prototype));
          return e;
        };
        var r = (function () {
          function a() {}
          a.prototype.getPlotBandPath = function (a, d, h) {
            void 0 === h && (h = this.options);
            var e = this.getPlotLinePath({
                value: d,
                force: !0,
                acrossPanes: h.acrossPanes,
              }),
              g = [],
              l = this.horiz;
            d =
              !F(this.min) ||
              !F(this.max) ||
              (a < this.min && d < this.min) ||
              (a > this.max && d > this.max);
            a = this.getPlotLinePath({
              value: a,
              force: !0,
              acrossPanes: h.acrossPanes,
            });
            h = 1;
            if (a && e) {
              if (d) {
                var r = a.toString() === e.toString();
                h = 0;
              }
              for (d = 0; d < a.length; d += 2) {
                var t = a[d],
                  E = a[d + 1],
                  A = e[d],
                  y = e[d + 1];
                ("M" !== t[0] && "L" !== t[0]) ||
                  ("M" !== E[0] && "L" !== E[0]) ||
                  ("M" !== A[0] && "L" !== A[0]) ||
                  ("M" !== y[0] && "L" !== y[0]) ||
                  (l && A[1] === t[1]
                    ? ((A[1] += h), (y[1] += h))
                    : l || A[2] !== t[2] || ((A[2] += h), (y[2] += h)),
                  g.push(
                    ["M", t[1], t[2]],
                    ["L", E[1], E[2]],
                    ["L", y[1], y[2]],
                    ["L", A[1], A[2]],
                    ["Z"],
                  ));
                g.isFlat = r;
              }
            }
            return g;
          };
          a.prototype.addPlotBand = function (a) {
            return this.addPlotBandOrLine(a, "plotBands");
          };
          a.prototype.addPlotLine = function (a) {
            return this.addPlotBandOrLine(a, "plotLines");
          };
          a.prototype.addPlotBandOrLine = function (a, d) {
            var e = this,
              g = this.userOptions,
              k = new t(this, a);
            this.visible && (k = k.render());
            if (k) {
              this._addedPlotLB ||
                ((this._addedPlotLB = !0),
                (g.plotLines || [])
                  .concat(g.plotBands || [])
                  .forEach(function (a) {
                    e.addPlotBandOrLine(a);
                  }));
              if (d) {
                var l = g[d] || [];
                l.push(a);
                g[d] = l;
              }
              this.plotLinesAndBands.push(k);
            }
            return k;
          };
          a.prototype.removePlotBandOrLine = function (a) {
            var d = this.plotLinesAndBands,
              e = this.options,
              m = this.userOptions;
            if (d) {
              for (var k = d.length; k--; ) d[k].id === a && d[k].destroy();
              [
                e.plotLines || [],
                m.plotLines || [],
                e.plotBands || [],
                m.plotBands || [],
              ].forEach(function (d) {
                for (k = d.length; k--; ) (d[k] || {}).id === a && g(d, d[k]);
              });
            }
          };
          a.prototype.removePlotBand = function (a) {
            this.removePlotBandOrLine(a);
          };
          a.prototype.removePlotLine = function (a) {
            this.removePlotBandOrLine(a);
          };
          return a;
        })();
      })(C || (C = {}));
      return C;
    },
  );
  K(
    g,
    "Core/Axis/PlotLineOrBand/PlotLineOrBand.js",
    [
      g["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g) {
      var A = g.arrayMax,
        F = g.arrayMin,
        C = g.defined,
        B = g.destroyObjectProperties,
        H = g.erase,
        t = g.fireEvent,
        r = g.merge,
        l = g.objectEach,
        e = g.pick;
      g = (function () {
        function d(a, d) {
          this.axis = a;
          d && ((this.options = d), (this.id = d.id));
        }
        d.compose = function (e) {
          return a.compose(d, e);
        };
        d.prototype.render = function () {
          t(this, "render");
          var a = this,
            d = a.axis,
            g = d.horiz,
            p = d.logarithmic,
            D = a.options,
            I = D.color,
            E = e(D.zIndex, 0),
            A = D.events,
            y = {},
            c = d.chart.renderer,
            w = D.label,
            f = a.label,
            n = D.to,
            b = D.from,
            u = D.value,
            z = a.svgElem,
            q = [],
            N = C(b) && C(n);
          q = C(u);
          var J = !z,
            O = {
              class:
                "highcharts-plot-" +
                (N ? "band " : "line ") +
                (D.className || ""),
            },
            Q = N ? "bands" : "lines";
          p && ((b = p.log2lin(b)), (n = p.log2lin(n)), (u = p.log2lin(u)));
          d.chart.styledMode ||
            (q
              ? ((O.stroke = I || "#999999"),
                (O["stroke-width"] = e(D.width, 1)),
                D.dashStyle && (O.dashstyle = D.dashStyle))
              : N &&
                ((O.fill = I || "#e6ebf5"),
                D.borderWidth &&
                  ((O.stroke = D.borderColor),
                  (O["stroke-width"] = D.borderWidth))));
          y.zIndex = E;
          Q += "-" + E;
          (p = d.plotLinesAndBandsGroups[Q]) ||
            (d.plotLinesAndBandsGroups[Q] = p =
              c
                .g("plot-" + Q)
                .attr(y)
                .add());
          J && (a.svgElem = z = c.path().attr(O).add(p));
          if (q)
            q = d.getPlotLinePath({
              value: u,
              lineWidth: z.strokeWidth(),
              acrossPanes: D.acrossPanes,
            });
          else if (N) q = d.getPlotBandPath(b, n, D);
          else return;
          !a.eventsAdded &&
            A &&
            (l(A, function (b, c) {
              z.on(c, function (b) {
                A[c].apply(a, [b]);
              });
            }),
            (a.eventsAdded = !0));
          (J || !z.d) && q && q.length
            ? z.attr({ d: q })
            : z &&
              (q
                ? (z.show(), z.animate({ d: q }))
                : z.d && (z.hide(), f && (a.label = f = f.destroy())));
          w &&
          (C(w.text) || C(w.formatter)) &&
          q &&
          q.length &&
          0 < d.width &&
          0 < d.height &&
          !q.isFlat
            ? ((w = r(
                {
                  align: g && N && "center",
                  x: g ? !N && 4 : 10,
                  verticalAlign: !g && N && "middle",
                  y: g ? (N ? 16 : 10) : N ? 6 : -4,
                  rotation: g && !N && 90,
                },
                w,
              )),
              this.renderLabel(w, q, N, E))
            : f && f.hide();
          return a;
        };
        d.prototype.renderLabel = function (a, d, e, g) {
          var h = this.axis,
            k = h.chart.renderer,
            m = this.label;
          m ||
            ((this.label = m =
              k
                .text(this.getLabelText(a), 0, 0, a.useHTML)
                .attr({
                  align: a.textAlign || a.align,
                  rotation: a.rotation,
                  class:
                    "highcharts-plot-" +
                    (e ? "band" : "line") +
                    "-label " +
                    (a.className || ""),
                  zIndex: g,
                })
                .add()),
            h.chart.styledMode ||
              m.css(r({ textOverflow: "ellipsis" }, a.style)));
          g = d.xBounds || [d[0][1], d[1][1], e ? d[2][1] : d[0][1]];
          d = d.yBounds || [d[0][2], d[1][2], e ? d[2][2] : d[0][2]];
          e = F(g);
          k = F(d);
          m.align(a, !1, { x: e, y: k, width: A(g) - e, height: A(d) - k });
          (m.alignValue && "left" !== m.alignValue) ||
            ((a = a.clip ? h.width : h.chart.chartWidth),
            m.css({
              width:
                (90 === m.rotation
                  ? h.height - (m.alignAttr.y - h.top)
                  : a - (m.alignAttr.x - h.left)) + "px",
            }));
          m.show(!0);
        };
        d.prototype.getLabelText = function (a) {
          return C(a.formatter) ? a.formatter.call(this) : a.text;
        };
        d.prototype.destroy = function () {
          H(this.axis.plotLinesAndBands, this);
          delete this.axis;
          B(this);
        };
        return d;
      })();
      ("");
      ("");
      return g;
    },
  );
  K(
    g,
    "Core/Tooltip.js",
    [
      g["Core/FormatUtilities.js"],
      g["Core/Globals.js"],
      g["Core/Renderer/RendererUtilities.js"],
      g["Core/Renderer/RendererRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C) {
      var A = a.format,
        H = g.doc,
        t = x.distribute,
        r = C.clamp,
        l = C.css,
        e = C.discardElement,
        d = C.extend,
        h = C.fireEvent,
        m = C.isArray,
        k = C.isNumber,
        p = C.isString,
        D = C.merge,
        I = C.pick,
        E = C.splat,
        L = C.syncTimeout;
      a = (function () {
        function a(c, a) {
          this.allowShared = !0;
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = c;
          this.init(c, a);
        }
        a.prototype.applyFilter = function () {
          var c = this.chart;
          c.renderer.definition({
            tagName: "filter",
            attributes: { id: "drop-shadow-" + c.index, opacity: 0.5 },
            children: [
              {
                tagName: "feGaussianBlur",
                attributes: { in: "SourceAlpha", stdDeviation: 1 },
              },
              { tagName: "feOffset", attributes: { dx: 1, dy: 1 } },
              {
                tagName: "feComponentTransfer",
                children: [
                  {
                    tagName: "feFuncA",
                    attributes: { type: "linear", slope: 0.3 },
                  },
                ],
              },
              {
                tagName: "feMerge",
                children: [
                  { tagName: "feMergeNode" },
                  {
                    tagName: "feMergeNode",
                    attributes: { in: "SourceGraphic" },
                  },
                ],
              },
            ],
          });
        };
        a.prototype.bodyFormatter = function (c) {
          return c.map(function (c) {
            var f = c.series.tooltipOptions;
            return (
              f[(c.point.formatPrefix || "point") + "Formatter"] ||
              c.point.tooltipFormatter
            ).call(
              c.point,
              f[(c.point.formatPrefix || "point") + "Format"] || "",
            );
          });
        };
        a.prototype.cleanSplit = function (c) {
          this.chart.series.forEach(function (a) {
            var f = a && a.tt;
            f && (!f.isActive || c ? (a.tt = f.destroy()) : (f.isActive = !1));
          });
        };
        a.prototype.defaultFormatter = function (c) {
          var a = this.points || E(this);
          var f = [c.tooltipFooterHeaderFormatter(a[0])];
          f = f.concat(c.bodyFormatter(a));
          f.push(c.tooltipFooterHeaderFormatter(a[0], !0));
          return f;
        };
        a.prototype.destroy = function () {
          this.label && (this.label = this.label.destroy());
          this.split &&
            this.tt &&
            (this.cleanSplit(!0), (this.tt = this.tt.destroy()));
          this.renderer &&
            ((this.renderer = this.renderer.destroy()), e(this.container));
          C.clearTimeout(this.hideTimer);
          C.clearTimeout(this.tooltipTimeout);
        };
        a.prototype.getAnchor = function (c, a) {
          var f = this.chart,
            d = f.pointer,
            b = f.inverted,
            e = f.plotTop;
          f = f.plotLeft;
          c = E(c);
          c[0].series &&
            c[0].series.yAxis &&
            !c[0].series.yAxis.options.reversedStacks &&
            (c = c.slice().reverse());
          if (this.followPointer && a)
            "undefined" === typeof a.chartX && (a = d.normalize(a)),
              (c = [a.chartX - f, a.chartY - e]);
          else if (c[0].tooltipPos) c = c[0].tooltipPos;
          else {
            var h = 0,
              g = 0;
            c.forEach(function (b) {
              if ((b = b.pos(!0))) (h += b[0]), (g += b[1]);
            });
            h /= c.length;
            g /= c.length;
            this.shared &&
              1 < c.length &&
              a &&
              (b ? (h = a.chartX) : (g = a.chartY));
            c = [h - f, g - e];
          }
          return c.map(Math.round);
        };
        a.prototype.getClassName = function (c, a, f) {
          var d = c.series,
            b = d.options;
          return [
            this.options.className,
            "highcharts-label",
            f && "highcharts-tooltip-header",
            a ? "highcharts-tooltip-box" : "highcharts-tooltip",
            !f && "highcharts-color-" + I(c.colorIndex, d.colorIndex),
            b && b.className,
          ]
            .filter(p)
            .join(" ");
        };
        a.prototype.getLabel = function () {
          var c = this,
            a = this.chart.styledMode,
            f = this.options,
            d = this.split && this.allowShared,
            b =
              f.style.pointerEvents ||
              (this.shouldStickOnContact() ? "auto" : "none"),
            e,
            h = this.chart.renderer;
          if (c.label) {
            var q = !c.label.hasClass("highcharts-label");
            ((d && !q) || (!d && q)) && c.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              q = this.chart.options.chart.style;
              var k = F.getRendererType();
              this.container = e = g.doc.createElement("div");
              e.className = "highcharts-tooltip-container";
              l(e, {
                position: "absolute",
                top: "1px",
                pointerEvents: b,
                zIndex: Math.max(
                  this.options.style.zIndex || 0,
                  ((q && q.zIndex) || 0) + 3,
                ),
              });
              g.doc.body.appendChild(e);
              this.renderer = h = new k(
                e,
                0,
                0,
                q,
                void 0,
                void 0,
                h.styledMode,
              );
            }
            d
              ? (this.label = h.g("tooltip"))
              : ((this.label = h
                  .label(
                    "",
                    0,
                    0,
                    f.shape,
                    void 0,
                    void 0,
                    f.useHTML,
                    void 0,
                    "tooltip",
                  )
                  .attr({ padding: f.padding, r: f.borderRadius })),
                a ||
                  this.label
                    .attr({
                      fill: f.backgroundColor,
                      "stroke-width": f.borderWidth,
                    })
                    .css(f.style)
                    .css({ pointerEvents: b })
                    .shadow(f.shadow));
            a &&
              f.shadow &&
              (this.applyFilter(),
              this.label.attr({
                filter: "url(#drop-shadow-" + this.chart.index + ")",
              }));
            if (c.outside && !c.split) {
              var m = this.label,
                p = m.xSetter,
                y = m.ySetter;
              m.xSetter = function (b) {
                p.call(m, c.distance);
                e.style.left = b + "px";
              };
              m.ySetter = function (b) {
                y.call(m, c.distance);
                e.style.top = b + "px";
              };
            }
            this.label.attr({ zIndex: 8 }).add();
          }
          return this.label;
        };
        a.prototype.getPosition = function (c, a, f) {
          var d = this.chart,
            b = this.distance,
            e = {},
            h = (d.inverted && f.h) || 0,
            g = this.outside,
            k = g ? H.documentElement.clientWidth - 2 * b : d.chartWidth,
            w = g
              ? Math.max(
                  H.body.scrollHeight,
                  H.documentElement.scrollHeight,
                  H.body.offsetHeight,
                  H.documentElement.offsetHeight,
                  H.documentElement.clientHeight,
                )
              : d.chartHeight,
            m = d.pointer.getChartPosition(),
            l = function (e) {
              var h = "x" === e;
              return [e, h ? k : w, h ? c : a].concat(
                g
                  ? [
                      h ? c * m.scaleX : a * m.scaleY,
                      h
                        ? m.left - b + (f.plotX + d.plotLeft) * m.scaleX
                        : m.top - b + (f.plotY + d.plotTop) * m.scaleY,
                      0,
                      h ? k : w,
                    ]
                  : [
                      h ? c : a,
                      h ? f.plotX + d.plotLeft : f.plotY + d.plotTop,
                      h ? d.plotLeft : d.plotTop,
                      h ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight,
                    ],
              );
            },
            p = l("y"),
            y = l("x"),
            v;
          l = !!f.negative;
          !d.polar &&
            d.hoverSeries &&
            d.hoverSeries.yAxis &&
            d.hoverSeries.yAxis.reversed &&
            (l = !l);
          var r = !this.followPointer && I(f.ttBelow, !d.inverted === l),
            t = function (c, f, a, d, n, u, q) {
              var z = g ? ("y" === c ? b * m.scaleY : b * m.scaleX) : b,
                k = (a - d) / 2,
                w = d < n - b,
                G = n + b + d < f,
                l = n - z - a + k;
              n = n + z - k;
              if (r && G) e[c] = n;
              else if (!r && w) e[c] = l;
              else if (w) e[c] = Math.min(q - d, 0 > l - h ? l : l - h);
              else if (G) e[c] = Math.max(u, n + h + a > f ? n : n + h);
              else return !1;
            },
            D = function (c, f, a, d, h) {
              var n;
              h < b || h > f - b
                ? (n = !1)
                : (e[c] =
                    h < a / 2 ? 1 : h > f - d / 2 ? f - d - 2 : h - a / 2);
              return n;
            },
            E = function (b) {
              var c = p;
              p = y;
              y = c;
              v = b;
            },
            G = function () {
              !1 !== t.apply(0, p)
                ? !1 !== D.apply(0, y) || v || (E(!0), G())
                : v
                  ? (e.x = e.y = 0)
                  : (E(!0), G());
            };
          (d.inverted || 1 < this.len) && E();
          G();
          return e;
        };
        a.prototype.hide = function (c) {
          var a = this;
          C.clearTimeout(this.hideTimer);
          c = I(c, this.options.hideDelay);
          this.isHidden ||
            (this.hideTimer = L(function () {
              a.getLabel().fadeOut(c ? void 0 : c);
              a.isHidden = !0;
            }, c));
        };
        a.prototype.init = function (c, a) {
          this.chart = c;
          this.options = a;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = !0;
          this.split = a.split && !c.inverted && !c.polar;
          this.shared = a.shared || this.split;
          this.outside = I(
            a.outside,
            !(!c.scrollablePixelsX && !c.scrollablePixelsY),
          );
        };
        a.prototype.shouldStickOnContact = function (c) {
          return !(
            this.followPointer ||
            !this.options.stickOnContact ||
            (c && !this.chart.pointer.inClass(c.target, "highcharts-tooltip"))
          );
        };
        a.prototype.move = function (c, a, f, e) {
          var b = this,
            h = b.now,
            n =
              !1 !== b.options.animation &&
              !b.isHidden &&
              (1 < Math.abs(c - h.x) || 1 < Math.abs(a - h.y)),
            g = b.followPointer || 1 < b.len;
          d(h, {
            x: n ? (2 * h.x + c) / 3 : c,
            y: n ? (h.y + a) / 2 : a,
            anchorX: g ? void 0 : n ? (2 * h.anchorX + f) / 3 : f,
            anchorY: g ? void 0 : n ? (h.anchorY + e) / 2 : e,
          });
          b.getLabel().attr(h);
          b.drawTracker();
          n &&
            (C.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              b && b.move(c, a, f, e);
            }, 32)));
        };
        a.prototype.refresh = function (c, a) {
          var f = this.chart,
            d = this.options,
            b = f.pointer,
            e = E(c),
            g = e[0],
            q = [],
            k = d.formatter || this.defaultFormatter,
            w = this.shared,
            l = f.styledMode,
            p = {};
          if (d.enabled && g.series) {
            C.clearTimeout(this.hideTimer);
            this.allowShared = !(!m(c) && c.series && c.series.noSharedTooltip);
            this.followPointer =
              !this.split && g.series.tooltipOptions.followPointer;
            c = this.getAnchor(c, a);
            var y = c[0],
              r = c[1];
            w && this.allowShared
              ? (b.applyInactiveState(e),
                e.forEach(function (b) {
                  b.setState("hover");
                  q.push(b.getLabelConfig());
                }),
                (p = { x: g.category, y: g.y }),
                (p.points = q))
              : (p = g.getLabelConfig());
            this.len = q.length;
            k = k.call(p, this);
            w = g.series;
            this.distance = I(w.tooltipOptions.distance, 16);
            if (!1 === k) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(k, e);
              else {
                var v = y,
                  t = r;
                a &&
                  b.isDirectTouch &&
                  ((v = a.chartX - f.plotLeft), (t = a.chartY - f.plotTop));
                if (
                  f.polar ||
                  !1 === w.options.clip ||
                  e.some(function (c) {
                    return b.isDirectTouch || c.series.shouldShowTooltip(v, t);
                  })
                )
                  (a = this.getLabel()),
                    (d.style.width && !l) ||
                      a.css({ width: f.spacingBox.width + "px" }),
                    a.attr({ text: k && k.join ? k.join("") : k }),
                    a.addClass(this.getClassName(g), !0),
                    l ||
                      a.attr({
                        stroke:
                          d.borderColor || g.color || w.color || "#666666",
                      }),
                    this.updatePosition({
                      plotX: y,
                      plotY: r,
                      negative: g.negative,
                      ttBelow: g.ttBelow,
                      h: c[2] || 0,
                    });
                else {
                  this.hide();
                  return;
                }
              }
              this.isHidden &&
                this.label &&
                this.label.attr({ opacity: 1 }).show();
              this.isHidden = !1;
            }
            h(this, "refresh");
          }
        };
        a.prototype.renderSplit = function (c, a) {
          function f(b, c, a, f, d) {
            void 0 === d && (d = !0);
            a
              ? ((c = R ? 0 : ba),
                (b = r(b - f / 2, P.left, P.right - f - (e.outside ? V : 0))))
              : ((c -= Z),
                (b = d ? b - f - x : b + x),
                (b = r(b, d ? b : P.left, P.right)));
            return { x: b, y: c };
          }
          var e = this,
            b = e.chart,
            h = e.chart,
            g = h.chartWidth,
            q = h.chartHeight,
            k = h.plotHeight,
            w = h.plotLeft,
            m = h.plotTop,
            l = h.pointer,
            y = h.scrollablePixelsY;
          y = void 0 === y ? 0 : y;
          var D = h.scrollablePixelsX,
            v = h.scrollingContainer;
          v = void 0 === v ? { scrollLeft: 0, scrollTop: 0 } : v;
          var E = v.scrollLeft;
          v = v.scrollTop;
          var A = h.styledMode,
            x = e.distance,
            L = e.options,
            G = e.options.positioner,
            P =
              e.outside && "number" !== typeof D
                ? H.documentElement.getBoundingClientRect()
                : { left: E, right: E + g, top: v, bottom: v + q },
            M = e.getLabel(),
            X = this.renderer || b.renderer,
            R = !(!b.xAxis[0] || !b.xAxis[0].opposite);
          b = l.getChartPosition();
          var V = b.left;
          b = b.top;
          var Z = m + v,
            C = 0,
            ba = k - y;
          p(c) && (c = [!1, c]);
          c = c.slice(0, a.length + 1).reduce(function (b, c, d) {
            if (!1 !== c && "" !== c) {
              d = a[d - 1] || {
                isHeader: !0,
                plotX: a[0].plotX,
                plotY: k,
                series: {},
              };
              var h = d.isHeader,
                n = h ? e : d.series;
              c = c.toString();
              var g = n.tt,
                u = d.isHeader;
              var q = d.series;
              g ||
                ((g = { padding: L.padding, r: L.borderRadius }),
                A ||
                  ((g.fill = L.backgroundColor),
                  (g["stroke-width"] = L.borderWidth)),
                (g = X.label(
                  "",
                  0,
                  0,
                  L[u ? "headerShape" : "shape"],
                  void 0,
                  void 0,
                  L.useHTML,
                )
                  .addClass(e.getClassName(d, !0, u))
                  .attr(g)
                  .add(M)));
              g.isActive = !0;
              g.attr({ text: c });
              A ||
                g
                  .css(L.style)
                  .shadow(L.shadow)
                  .attr({
                    stroke: L.borderColor || d.color || q.color || "#333333",
                  });
              n = n.tt = g;
              u = n.getBBox();
              c = u.width + n.strokeWidth();
              h && ((C = u.height), (ba += C), R && (Z -= C));
              q = d.plotX;
              q = void 0 === q ? 0 : q;
              g = d.plotY;
              g = void 0 === g ? 0 : g;
              var z = d.series;
              if (d.isHeader) {
                q = w + q;
                var l = m + k / 2;
              } else {
                var v = z.xAxis,
                  p = z.yAxis;
                q = v.pos + r(q, -x, v.len + x);
                z.shouldShowTooltip(0, p.pos - m + g, { ignoreX: !0 }) &&
                  (l = p.pos + g);
              }
              q = r(q, P.left - x, P.right + x);
              "number" === typeof l
                ? ((u = u.height + 1),
                  (g = G ? G.call(e, c, u, d) : f(q, l, h, c)),
                  b.push({
                    align: G ? 0 : void 0,
                    anchorX: q,
                    anchorY: l,
                    boxWidth: c,
                    point: d,
                    rank: I(g.rank, h ? 1 : 0),
                    size: u,
                    target: g.y,
                    tt: n,
                    x: g.x,
                  }))
                : (n.isActive = !1);
            }
            return b;
          }, []);
          !G &&
            c.some(function (b) {
              var c = (e.outside ? V : 0) + b.anchorX;
              return c < P.left && c + b.boxWidth < P.right
                ? !0
                : c < V - P.left + b.boxWidth && P.right - c > c;
            }) &&
            (c = c.map(function (b) {
              var c = f(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
              return d(b, { target: c.y, x: c.x });
            }));
          e.cleanSplit();
          t(c, ba);
          var B = V,
            F = V;
          c.forEach(function (b) {
            var c = b.x,
              a = b.boxWidth;
            b = b.isHeader;
            b ||
              (e.outside && V + c < B && (B = V + c),
              !b && e.outside && B + a > F && (F = V + c));
          });
          c.forEach(function (b) {
            var c = b.x,
              a = b.anchorX,
              f = b.pos,
              d = b.point.isHeader;
            f = {
              visibility: "undefined" === typeof f ? "hidden" : "inherit",
              x: c,
              y: (f || 0) + Z,
              anchorX: a,
              anchorY: b.anchorY,
            };
            if (e.outside && c < a) {
              var h = V - B;
              0 < h &&
                (d || ((f.x = c + h), (f.anchorX = a + h)),
                d && ((f.x = (F - B) / 2), (f.anchorX = a + h)));
            }
            b.tt.attr(f);
          });
          c = e.container;
          y = e.renderer;
          e.outside &&
            c &&
            y &&
            ((h = M.getBBox()),
            y.setSize(h.width + h.x, h.height + h.y, !1),
            (c.style.left = B + "px"),
            (c.style.top = b + "px"));
        };
        a.prototype.drawTracker = function () {
          if (this.shouldStickOnContact()) {
            var c = this.chart,
              a = this.label,
              f = this.shared ? c.hoverPoints : c.hoverPoint;
            if (a && f) {
              var d = { x: 0, y: 0, width: 0, height: 0 };
              f = this.getAnchor(f);
              var b = a.getBBox();
              f[0] += c.plotLeft - a.translateX;
              f[1] += c.plotTop - a.translateY;
              d.x = Math.min(0, f[0]);
              d.y = Math.min(0, f[1]);
              d.width =
                0 > f[0]
                  ? Math.max(Math.abs(f[0]), b.width - f[0])
                  : Math.max(Math.abs(f[0]), b.width);
              d.height =
                0 > f[1]
                  ? Math.max(Math.abs(f[1]), b.height - Math.abs(f[1]))
                  : Math.max(Math.abs(f[1]), b.height);
              this.tracker
                ? this.tracker.attr(d)
                : ((this.tracker = a.renderer
                    .rect(d)
                    .addClass("highcharts-tracker")
                    .add(a)),
                  c.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
          } else this.tracker && this.tracker.destroy();
        };
        a.prototype.styledModeFormat = function (c) {
          return c
            .replace('style="font-size: 10px"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"',
            );
        };
        a.prototype.tooltipFooterHeaderFormatter = function (c, a) {
          var f = c.series,
            d = f.tooltipOptions,
            b = f.xAxis,
            e = b && b.dateTime;
          b = { isFooter: a, labelConfig: c };
          var g = d.xDateFormat,
            q = d[a ? "footerFormat" : "headerFormat"];
          h(this, "headerFormatter", b, function (b) {
            e &&
              !g &&
              k(c.key) &&
              (g = e.getXDateFormat(c.key, d.dateTimeLabelFormats));
            e &&
              g &&
              ((c.point && c.point.tooltipDateKeys) || ["key"]).forEach(
                function (b) {
                  q = q.replace(
                    "{point." + b + "}",
                    "{point." + b + ":" + g + "}",
                  );
                },
              );
            f.chart.styledMode && (q = this.styledModeFormat(q));
            b.text = A(q, { point: c, series: f }, this.chart);
          });
          return b.text;
        };
        a.prototype.update = function (c) {
          this.destroy();
          D(!0, this.chart.options.tooltip.userOptions, c);
          this.init(this.chart, D(!0, this.options, c));
        };
        a.prototype.updatePosition = function (c) {
          var a = this.chart,
            f = this.distance,
            d = this.options,
            b = a.pointer,
            e = this.getLabel(),
            h = b.getChartPosition();
          b = h.left;
          var g = h.top,
            k = h.scaleX;
          h = h.scaleY;
          var m = (d.positioner || this.getPosition).call(
              this,
              e.width,
              e.height,
              c,
            ),
            p = (c.plotX || 0) + a.plotLeft;
          c = (c.plotY || 0) + a.plotTop;
          if (this.outside) {
            d.positioner && ((m.x += b - f), (m.y += g - f));
            f = d.borderWidth + 2 * f;
            this.renderer.setSize(e.width + f, e.height + f, !1);
            if (1 !== k || 1 !== h)
              l(this.container, {
                transform: "scale(".concat(k, ", ").concat(h, ")"),
              }),
                (p *= k),
                (c *= h);
            p += b - m.x;
            c += g - m.y;
          }
          this.move(Math.round(m.x), Math.round(m.y || 0), p, c);
        };
        return a;
      })();
      ("");
      return a;
    },
  );
  K(
    g,
    "Core/Series/Point.js",
    [
      g["Core/Renderer/HTML/AST.js"],
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Defaults.js"],
      g["Core/FormatUtilities.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C) {
      var A = g.animObject,
        H = x.defaultOptions,
        t = F.format,
        r = C.addEvent,
        l = C.defined,
        e = C.erase,
        d = C.extend,
        h = C.fireEvent,
        m = C.getNestedProperty,
        k = C.isArray,
        p = C.isFunction,
        D = C.isNumber,
        I = C.isObject,
        E = C.merge,
        L = C.objectEach,
        y = C.pick,
        c = C.syncTimeout,
        w = C.removeEvent,
        f = C.uniqueKey;
      g = (function () {
        function g() {
          this.category = void 0;
          this.formatPrefix = "point";
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.shapeArgs = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        g.prototype.animateBeforeDestroy = function () {
          var b = this,
            c = { x: b.startXPos, opacity: 0 },
            a = b.getGraphicalProps();
          a.singular.forEach(function (a) {
            b[a] = b[a].animate(
              "dataLabel" === a
                ? { x: b[a].startXPos, y: b[a].startYPos, opacity: 0 }
                : c,
            );
          });
          a.plural.forEach(function (c) {
            b[c].forEach(function (c) {
              c.element &&
                c.animate(
                  d(
                    { x: b.startXPos },
                    c.startYPos ? { x: c.startXPos, y: c.startYPos } : {},
                  ),
                );
            });
          });
        };
        g.prototype.applyOptions = function (b, c) {
          var a = this.series,
            f = a.options.pointValKey || a.pointValKey;
          b = g.prototype.optionsToObject.call(this, b);
          d(this, b);
          this.options = this.options ? d(this.options, b) : b;
          b.group && delete this.group;
          b.dataLabels && delete this.dataLabels;
          f && (this.y = g.prototype.getNestedProperty.call(this, f));
          this.formatPrefix = (this.isNull = this.isValid && !this.isValid())
            ? "null"
            : "point";
          this.selected && (this.state = "select");
          "name" in this &&
            "undefined" === typeof c &&
            a.xAxis &&
            a.xAxis.hasNames &&
            (this.x = a.xAxis.nameToX(this));
          "undefined" === typeof this.x && a
            ? (this.x = "undefined" === typeof c ? a.autoIncrement() : c)
            : D(b.x) &&
              a.options.relativeXValue &&
              (this.x = a.autoIncrement(b.x));
          return this;
        };
        g.prototype.destroy = function () {
          function b() {
            if (a.graphic || a.graphics || a.dataLabel || a.dataLabels)
              w(a), a.destroyElements();
            for (n in a) a[n] = null;
          }
          var a = this,
            f = a.series,
            d = f.chart;
          f = f.options.dataSorting;
          var h = d.hoverPoints,
            g = A(a.series.chart.renderer.globalAnimation),
            n;
          a.legendItem && d.legend.destroyItem(a);
          h && (a.setState(), e(h, a), h.length || (d.hoverPoints = null));
          if (a === d.hoverPoint) a.onMouseOut();
          f && f.enabled
            ? (this.animateBeforeDestroy(), c(b, g.duration))
            : b();
          d.pointCount--;
        };
        g.prototype.destroyElements = function (b) {
          var c = this;
          b = c.getGraphicalProps(b);
          b.singular.forEach(function (b) {
            c[b] = c[b].destroy();
          });
          b.plural.forEach(function (b) {
            c[b].forEach(function (b) {
              b && b.element && b.destroy();
            });
            delete c[b];
          });
        };
        g.prototype.firePointEvent = function (b, c, a) {
          var f = this,
            d = this.series.options;
          (d.point.events[b] ||
            (f.options && f.options.events && f.options.events[b])) &&
            f.importEvents();
          "click" === b &&
            d.allowPointSelect &&
            (a = function (b) {
              f.select && f.select(null, b.ctrlKey || b.metaKey || b.shiftKey);
            });
          h(f, b, c, a);
        };
        g.prototype.getClassName = function () {
          return (
            "highcharts-point" +
            (this.selected ? " highcharts-point-select" : "") +
            (this.negative ? " highcharts-negative" : "") +
            (this.isNull ? " highcharts-null-point" : "") +
            ("undefined" !== typeof this.colorIndex
              ? " highcharts-color-" + this.colorIndex
              : "") +
            (this.options.className ? " " + this.options.className : "") +
            (this.zone && this.zone.className
              ? " " + this.zone.className.replace("highcharts-negative", "")
              : "")
          );
        };
        g.prototype.getGraphicalProps = function (b) {
          var c = this,
            a = [],
            f = { singular: [], plural: [] },
            d;
          b = b || { graphic: 1, dataLabel: 1 };
          b.graphic && a.push("graphic", "shadowGroup");
          b.dataLabel &&
            a.push("dataLabel", "dataLabelPath", "dataLabelUpper", "connector");
          for (d = a.length; d--; ) {
            var e = a[d];
            c[e] && f.singular.push(e);
          }
          ["graphic", "dataLabel", "connector"].forEach(function (a) {
            var d = a + "s";
            b[a] && c[d] && f.plural.push(d);
          });
          return f;
        };
        g.prototype.getLabelConfig = function () {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        };
        g.prototype.getNestedProperty = function (b) {
          if (b)
            return 0 === b.indexOf("custom.") ? m(b, this.options) : this[b];
        };
        g.prototype.getZone = function () {
          var b = this.series,
            c = b.zones;
          b = b.zoneAxis || "y";
          var a,
            f = 0;
          for (a = c[f]; this[b] >= a.value; ) a = c[++f];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color =
            a && a.color && !this.options.color ? a.color : this.nonZonedColor;
          return a;
        };
        g.prototype.hasNewShapeType = function () {
          return (
            (this.graphic &&
              (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        };
        g.prototype.init = function (b, c, a) {
          this.series = b;
          this.applyOptions(c, a);
          this.id = l(this.id) ? this.id : f();
          this.resolveColor();
          b.chart.pointCount++;
          h(this, "afterInit");
          return this;
        };
        g.prototype.isValid = function () {
          return null !== this.x && D(this.y);
        };
        g.prototype.optionsToObject = function (b) {
          var c = this.series,
            a = c.options.keys,
            f = a || c.pointArrayMap || ["y"],
            d = f.length,
            e = {},
            h = 0,
            n = 0;
          if (D(b) || null === b) e[f[0]] = b;
          else if (k(b))
            for (
              !a &&
              b.length > d &&
              ((c = typeof b[0]),
              "string" === c ? (e.name = b[0]) : "number" === c && (e.x = b[0]),
              h++);
              n < d;

            )
              (a && "undefined" === typeof b[h]) ||
                (0 < f[n].indexOf(".")
                  ? g.prototype.setNestedProperty(e, b[h], f[n])
                  : (e[f[n]] = b[h])),
                h++,
                n++;
          else
            "object" === typeof b &&
              ((e = b),
              b.dataLabels && (c._hasPointLabels = !0),
              b.marker && (c._hasPointMarkers = !0));
          return e;
        };
        g.prototype.pos = function (b, c) {
          void 0 === c && (c = this.plotY);
          var a = this.plotX,
            f = this.series,
            d = f.chart,
            e = f.xAxis;
          f = f.yAxis;
          var h = 0,
            g = 0;
          if (D(a) && D(c))
            return (
              b && ((h = e ? e.pos : d.plotLeft), (g = f ? f.pos : d.plotTop)),
              d.inverted && e && f
                ? [f.len - c + g, e.len - a + h]
                : [a + h, c + g]
            );
        };
        g.prototype.resolveColor = function () {
          var b = this.series,
            c = b.chart.styledMode;
          var a = b.chart.options.chart.colorCount;
          delete this.nonZonedColor;
          if (b.options.colorByPoint) {
            if (!c) {
              a = b.options.colors || b.chart.options.colors;
              var f = a[b.colorCounter];
              a = a.length;
            }
            c = b.colorCounter;
            b.colorCounter++;
            b.colorCounter === a && (b.colorCounter = 0);
          } else c || (f = b.color), (c = b.colorIndex);
          this.colorIndex = y(this.options.colorIndex, c);
          this.color = y(this.options.color, f);
        };
        g.prototype.setNestedProperty = function (b, c, a) {
          a.split(".").reduce(function (b, a, f, d) {
            b[a] = d.length - 1 === f ? c : I(b[a], !0) ? b[a] : {};
            return b[a];
          }, b);
          return b;
        };
        g.prototype.shouldDraw = function () {
          return !this.isNull;
        };
        g.prototype.tooltipFormatter = function (b) {
          var c = this.series,
            a = c.tooltipOptions,
            f = y(a.valueDecimals, ""),
            d = a.valuePrefix || "",
            e = a.valueSuffix || "";
          c.chart.styledMode && (b = c.chart.tooltip.styledModeFormat(b));
          (c.pointArrayMap || ["y"]).forEach(function (c) {
            c = "{point." + c;
            if (d || e) b = b.replace(RegExp(c + "}", "g"), d + c + "}" + e);
            b = b.replace(RegExp(c + "}", "g"), c + ":,." + f + "f}");
          });
          return t(b, { point: this, series: this.series }, c.chart);
        };
        g.prototype.update = function (b, c, a, f) {
          function d() {
            e.applyOptions(b);
            var f = g && e.hasMockGraphic;
            f = null === e.y ? !f : f;
            g && f && ((e.graphic = g.destroy()), delete e.hasMockGraphic);
            I(b, !0) &&
              (g &&
                g.element &&
                b &&
                b.marker &&
                "undefined" !== typeof b.marker.symbol &&
                (e.graphic = g.destroy()),
              b &&
                b.dataLabels &&
                e.dataLabel &&
                (e.dataLabel = e.dataLabel.destroy()),
              e.connector && (e.connector = e.connector.destroy()));
            u = e.index;
            h.updateParallelArrays(e, u);
            q.data[u] =
              I(q.data[u], !0) || I(b, !0) ? e.options : y(b, q.data[u]);
            h.isDirty = h.isDirtyData = !0;
            !h.fixedBox && h.hasCartesianSeries && (n.isDirtyBox = !0);
            "point" === q.legendType && (n.isDirtyLegend = !0);
            c && n.redraw(a);
          }
          var e = this,
            h = e.series,
            g = e.graphic,
            n = h.chart,
            q = h.options,
            u;
          c = y(c, !0);
          !1 === f ? d() : e.firePointEvent("update", { options: b }, d);
        };
        g.prototype.remove = function (b, c) {
          this.series.removePoint(this.series.data.indexOf(this), b, c);
        };
        g.prototype.select = function (b, c) {
          var a = this,
            f = a.series,
            d = f.chart;
          this.selectedStaging = b = y(b, !a.selected);
          a.firePointEvent(
            b ? "select" : "unselect",
            { accumulate: c },
            function () {
              a.selected = a.options.selected = b;
              f.options.data[f.data.indexOf(a)] = a.options;
              a.setState(b && "select");
              c ||
                d.getSelectedPoints().forEach(function (b) {
                  var c = b.series;
                  b.selected &&
                    b !== a &&
                    ((b.selected = b.options.selected = !1),
                    (c.options.data[c.data.indexOf(b)] = b.options),
                    b.setState(
                      d.hoverPoints && c.options.inactiveOtherPoints
                        ? "inactive"
                        : "",
                    ),
                    b.firePointEvent("unselect"));
                });
            },
          );
          delete this.selectedStaging;
        };
        g.prototype.onMouseOver = function (b) {
          var c = this.series.chart,
            a = c.pointer;
          b = b
            ? a.normalize(b)
            : a.getChartCoordinatesFromPoint(this, c.inverted);
          a.runPointActions(b, this);
        };
        g.prototype.onMouseOut = function () {
          var b = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints ||
            (b.hoverPoints || []).forEach(function (b) {
              b.setState();
            });
          b.hoverPoints = b.hoverPoint = null;
        };
        g.prototype.importEvents = function () {
          if (!this.hasImportedEvents) {
            var b = this,
              c = E(b.series.options.point, b.options).events;
            b.events = c;
            L(c, function (c, a) {
              p(c) && r(b, a, c);
            });
            this.hasImportedEvents = !0;
          }
        };
        g.prototype.setState = function (b, c) {
          var f = this.series,
            e = this.state,
            g = f.options.states[b || "normal"] || {},
            n = H.plotOptions[f.type].marker && f.options.marker,
            u = n && !1 === n.enabled,
            k = (n && n.states && n.states[b || "normal"]) || {},
            m = !1 === k.enabled,
            w = this.marker || {},
            l = f.chart,
            p = n && f.markerAttribs,
            r = f.halo,
            t,
            E = f.stateMarkerGraphic;
          b = b || "";
          if (
            !(
              (b === this.state && !c) ||
              (this.selected && "select" !== b) ||
              !1 === g.enabled ||
              (b && (m || (u && !1 === k.enabled))) ||
              (b && w.states && w.states[b] && !1 === w.states[b].enabled)
            )
          ) {
            this.state = b;
            p && (t = f.markerAttribs(this, b));
            if (this.graphic && !this.hasMockGraphic) {
              e && this.graphic.removeClass("highcharts-point-" + e);
              b && this.graphic.addClass("highcharts-point-" + b);
              if (!l.styledMode) {
                e = f.pointAttribs(this, b);
                var G = y(l.options.chart.animation, g.animation);
                var P = e.opacity;
                f.options.inactiveOtherPoints &&
                  D(P) &&
                  ((this.dataLabels || []).forEach(function (b) {
                    b &&
                      !b.hasClass("highcharts-data-label-hidden") &&
                      b.animate({ opacity: P }, G);
                  }),
                  this.connector && this.connector.animate({ opacity: P }, G));
                this.graphic.animate(e, G);
              }
              t &&
                this.graphic.animate(
                  t,
                  y(l.options.chart.animation, k.animation, n.animation),
                );
              E && E.hide();
            } else {
              if (b && k) {
                n = w.symbol || f.symbol;
                E && E.currentSymbol !== n && (E = E.destroy());
                if (t)
                  if (E) E[c ? "animate" : "attr"]({ x: t.x, y: t.y });
                  else
                    n &&
                      ((f.stateMarkerGraphic = E =
                        l.renderer
                          .symbol(n, t.x, t.y, t.width, t.height)
                          .add(f.markerGroup)),
                      (E.currentSymbol = n));
                !l.styledMode &&
                  E &&
                  "inactive" !== this.state &&
                  E.attr(f.pointAttribs(this, b));
              }
              E &&
                (E[b && this.isInside ? "show" : "hide"](),
                (E.element.point = this),
                E.addClass(this.getClassName(), !0));
            }
            g = g.halo;
            t = ((E = this.graphic || E) && E.visibility) || "inherit";
            g && g.size && E && "hidden" !== t && !this.isCluster
              ? (r || (f.halo = r = l.renderer.path().add(E.parentGroup)),
                r.show()[c ? "animate" : "attr"]({ d: this.haloPath(g.size) }),
                r.attr({
                  class:
                    "highcharts-halo highcharts-color-" +
                    y(this.colorIndex, f.colorIndex) +
                    (this.className ? " " + this.className : ""),
                  visibility: t,
                  zIndex: -1,
                }),
                (r.point = this),
                l.styledMode ||
                  r.attr(
                    d(
                      {
                        fill: this.color || f.color,
                        "fill-opacity": g.opacity,
                      },
                      a.filterUserAttributes(g.attributes || {}),
                    ),
                  ))
              : r &&
                r.point &&
                r.point.haloPath &&
                r.animate({ d: r.point.haloPath(0) }, null, r.hide);
            h(this, "afterSetState", { state: b });
          }
        };
        g.prototype.haloPath = function (b) {
          var c = this.pos();
          return c
            ? this.series.chart.renderer.symbols.circle(
                Math.floor(c[0]) - b,
                c[1] - b,
                2 * b,
                2 * b,
              )
            : [];
        };
        return g;
      })();
      ("");
      return g;
    },
  );
  K(
    g,
    "Core/Pointer.js",
    [
      g["Core/Color/Color.js"],
      g["Core/Globals.js"],
      g["Core/Tooltip.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F) {
      var A = a.parse,
        B = g.charts,
        H = g.noop,
        t = F.addEvent,
        r = F.attr,
        l = F.css,
        e = F.defined,
        d = F.extend,
        h = F.find,
        m = F.fireEvent,
        k = F.isNumber,
        p = F.isObject,
        D = F.objectEach,
        I = F.offset,
        E = F.pick,
        L = F.splat;
      a = (function () {
        function a(c, a) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = c;
          this.hasDragged = !1;
          this.options = a;
          this.init(c, a);
        }
        a.prototype.applyInactiveState = function (c) {
          var a = [],
            f;
          (c || []).forEach(function (c) {
            f = c.series;
            a.push(f);
            f.linkedParent && a.push(f.linkedParent);
            f.linkedSeries && (a = a.concat(f.linkedSeries));
            f.navigatorSeries && a.push(f.navigatorSeries);
          });
          this.chart.series.forEach(function (c) {
            -1 === a.indexOf(c)
              ? c.setState("inactive", !0)
              : c.options.inactiveOtherPoints &&
                c.setAllPointsToState("inactive");
          });
        };
        a.prototype.destroy = function () {
          var c = this;
          this.eventsToUnbind.forEach(function (c) {
            return c();
          });
          this.eventsToUnbind = [];
          g.chartCount ||
            (a.unbindDocumentMouseUp &&
              (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()),
            a.unbindDocumentTouchEnd &&
              (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
          clearInterval(c.tooltipTimeout);
          D(c, function (a, f) {
            c[f] = void 0;
          });
        };
        a.prototype.getSelectionMarkerAttrs = function (c, a) {
          var f = this,
            d = {
              args: { chartX: c, chartY: a },
              attrs: {},
              shapeType: "rect",
            };
          m(this, "getSelectionMarkerAttrs", d, function (b) {
            var d = f.chart,
              e = f.mouseDownX;
            e = void 0 === e ? 0 : e;
            var h = f.mouseDownY;
            h = void 0 === h ? 0 : h;
            var g = f.zoomHor,
              n = f.zoomVert;
            b = b.attrs;
            b.x = d.plotLeft;
            b.y = d.plotTop;
            b.width = g ? 1 : d.plotWidth;
            b.height = n ? 1 : d.plotHeight;
            g &&
              ((d = c - e),
              (b.width = Math.abs(d)),
              (b.x = (0 < d ? 0 : d) + e));
            n &&
              ((d = a - h),
              (b.height = Math.abs(d)),
              (b.y = (0 < d ? 0 : d) + h));
          });
          return d;
        };
        a.prototype.drag = function (c) {
          var a = this.chart,
            f = a.options.chart,
            d = a.plotLeft,
            b = a.plotTop,
            e = a.plotWidth,
            h = a.plotHeight,
            g = this.mouseDownX || 0,
            k = this.mouseDownY || 0,
            m = p(f.panning) ? f.panning && f.panning.enabled : f.panning,
            l = f.panKey && c[f.panKey + "Key"],
            y = c.chartX,
            r = c.chartY,
            t = this.selectionMarker;
          (t && t.touch) ||
            (y < d ? (y = d) : y > d + e && (y = d + e),
            r < b ? (r = b) : r > b + h && (r = b + h),
            (this.hasDragged = Math.sqrt(
              Math.pow(g - y, 2) + Math.pow(k - r, 2),
            )),
            10 < this.hasDragged &&
              ((d = a.isInsidePlot(g - d, k - b, { visiblePlotOnly: !0 })),
              (r = this.getSelectionMarkerAttrs(y, r)),
              (y = r.shapeType),
              (r = r.attrs),
              (!a.hasCartesianSeries && !a.mapView) ||
                (!this.zoomX && !this.zoomY) ||
                !d ||
                l ||
                t ||
                ((this.selectionMarker = t = a.renderer[y]()),
                t
                  .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                  .add(),
                a.styledMode ||
                  t.attr({
                    fill:
                      f.selectionMarkerFill ||
                      A("#335cad").setOpacity(0.25).get(),
                  })),
              t && t.attr(r),
              d && !t && m && a.pan(c, f.panning)));
        };
        a.prototype.dragStart = function (c) {
          var a = this.chart;
          a.mouseIsDown = c.type;
          a.cancelClick = !1;
          a.mouseDownX = this.mouseDownX = c.chartX;
          a.mouseDownY = this.mouseDownY = c.chartY;
        };
        a.prototype.getSelectionBox = function (c) {
          var a = { args: { marker: c }, result: {} };
          m(this, "getSelectionBox", a, function (a) {
            a.result = {
              x: c.attr ? +c.attr("x") : c.x,
              y: c.attr ? +c.attr("y") : c.y,
              width: c.attr ? c.attr("width") : c.width,
              height: c.attr ? c.attr("height") : c.height,
            };
          });
          return a.result;
        };
        a.prototype.drop = function (c) {
          var a = this,
            f = this.chart,
            h = this.hasPinched;
          if (this.selectionMarker) {
            var b = this.getSelectionBox(this.selectionMarker),
              g = b.x,
              z = b.y,
              q = b.width,
              p = b.height,
              y = {
                originalEvent: c,
                xAxis: [],
                yAxis: [],
                x: g,
                y: z,
                width: q,
                height: p,
              },
              r = !!f.mapView;
            if (this.hasDragged || h)
              f.axes.forEach(function (b) {
                if (
                  b.zoomEnabled &&
                  e(b.min) &&
                  (h || a[{ xAxis: "zoomX", yAxis: "zoomY" }[b.coll]]) &&
                  k(g) &&
                  k(z) &&
                  k(q) &&
                  k(p)
                ) {
                  var f = b.horiz,
                    d = "touchend" === c.type ? b.minPixelPadding : 0,
                    n = b.toValue((f ? g : z) + d);
                  f = b.toValue((f ? g + q : z + p) - d);
                  y[b.coll].push({
                    axis: b,
                    min: Math.min(n, f),
                    max: Math.max(n, f),
                  });
                  r = !0;
                }
              }),
                r &&
                  m(f, "selection", y, function (b) {
                    f.zoom(d(b, h ? { animation: !1 } : null));
                  });
            k(f.index) &&
              (this.selectionMarker = this.selectionMarker.destroy());
            h && this.scaleGroups();
          }
          f &&
            k(f.index) &&
            (l(f.container, { cursor: f._cursor }),
            (f.cancelClick = 10 < this.hasDragged),
            (f.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        };
        a.prototype.findNearestKDPoint = function (c, a, f) {
          var d;
          c.forEach(function (b) {
            var c =
              !(b.noSharedTooltip && a) &&
              0 > b.options.findNearestPointBy.indexOf("y");
            b = b.searchPoint(f, c);
            if ((c = p(b, !0) && b.series) && !(c = !p(d, !0))) {
              c = d.distX - b.distX;
              var e = d.dist - b.dist,
                h =
                  (b.series.group && b.series.group.zIndex) -
                  (d.series.group && d.series.group.zIndex);
              c =
                0 <
                (0 !== c && a
                  ? c
                  : 0 !== e
                    ? e
                    : 0 !== h
                      ? h
                      : d.series.index > b.series.index
                        ? -1
                        : 1);
            }
            c && (d = b);
          });
          return d;
        };
        a.prototype.getChartCoordinatesFromPoint = function (c, a) {
          var f = c.series,
            d = f.xAxis;
          f = f.yAxis;
          var b = c.shapeArgs;
          if (d && f) {
            var e = E(c.clientX, c.plotX),
              h = c.plotY || 0;
            c.isNode && b && k(b.x) && k(b.y) && ((e = b.x), (h = b.y));
            return a
              ? { chartX: f.len + f.pos - h, chartY: d.len + d.pos - e }
              : { chartX: e + d.pos, chartY: h + f.pos };
          }
          if (b && b.x && b.y) return { chartX: b.x, chartY: b.y };
        };
        a.prototype.getChartPosition = function () {
          if (this.chartPosition) return this.chartPosition;
          var c = this.chart.container,
            a = I(c);
          this.chartPosition = {
            left: a.left,
            top: a.top,
            scaleX: 1,
            scaleY: 1,
          };
          var f = c.offsetWidth;
          c = c.offsetHeight;
          2 < f &&
            2 < c &&
            ((this.chartPosition.scaleX = a.width / f),
            (this.chartPosition.scaleY = a.height / c));
          return this.chartPosition;
        };
        a.prototype.getCoordinates = function (c) {
          var a = { xAxis: [], yAxis: [] };
          this.chart.axes.forEach(function (f) {
            a[f.isXAxis ? "xAxis" : "yAxis"].push({
              axis: f,
              value: f.toValue(c[f.horiz ? "chartX" : "chartY"]),
            });
          });
          return a;
        };
        a.prototype.getHoverData = function (c, a, f, d, b, e) {
          var g = [];
          d = !(!d || !c);
          var n = function (c) {
              return (
                c.visible &&
                !(!b && c.directTouch) &&
                E(c.options.enableMouseTracking, !0)
              );
            },
            k = {
              chartX: e ? e.chartX : void 0,
              chartY: e ? e.chartY : void 0,
              shared: b,
            };
          m(this, "beforeGetHoverData", k);
          var u =
            a && !a.stickyTracking
              ? [a]
              : f.filter(function (b) {
                  return b.stickyTracking && (k.filter || n)(b);
                });
          var l = d || !e ? c : this.findNearestKDPoint(u, b, e);
          a = l && l.series;
          l &&
            (b && !a.noSharedTooltip
              ? ((u = f.filter(function (b) {
                  return k.filter ? k.filter(b) : n(b) && !b.noSharedTooltip;
                })),
                u.forEach(function (b) {
                  var c = h(b.points, function (b) {
                    return b.x === l.x && !b.isNull;
                  });
                  p(c) &&
                    (b.boosted && b.boost && (c = b.boost.getPoint(c)),
                    g.push(c));
                }))
              : g.push(l));
          k = { hoverPoint: l };
          m(this, "afterGetHoverData", k);
          return { hoverPoint: k.hoverPoint, hoverSeries: a, hoverPoints: g };
        };
        a.prototype.getPointFromEvent = function (c) {
          c = c.target;
          for (var a; c && !a; ) (a = c.point), (c = c.parentNode);
          return a;
        };
        a.prototype.onTrackerMouseOut = function (c) {
          c = c.relatedTarget || c.toElement;
          var a = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !a ||
              !c ||
              a.stickyTracking ||
              this.inClass(c, "highcharts-tooltip") ||
              (this.inClass(c, "highcharts-series-" + a.index) &&
                this.inClass(c, "highcharts-tracker"))
            )
          )
            a.onMouseOut();
        };
        a.prototype.inClass = function (c, a) {
          for (var f; c; ) {
            if ((f = r(c, "class"))) {
              if (-1 !== f.indexOf(a)) return !0;
              if (-1 !== f.indexOf("highcharts-container")) return !1;
            }
            c = c.parentElement;
          }
        };
        a.prototype.init = function (c, a) {
          this.options = a;
          this.chart = c;
          this.runChartClick = !(!a.chart.events || !a.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          x && (c.tooltip = new x(c, a.tooltip));
          this.setDOMEvents();
        };
        a.prototype.normalize = function (c, a) {
          var f = c.touches,
            e = f
              ? f.length
                ? f.item(0)
                : E(f.changedTouches, c.changedTouches)[0]
              : c;
          a || (a = this.getChartPosition());
          f = e.pageX - a.left;
          e = e.pageY - a.top;
          f /= a.scaleX;
          e /= a.scaleY;
          return d(c, { chartX: Math.round(f), chartY: Math.round(e) });
        };
        a.prototype.onContainerClick = function (c) {
          var a = this.chart,
            f = a.hoverPoint;
          c = this.normalize(c);
          var e = a.plotLeft,
            b = a.plotTop;
          a.cancelClick ||
            (f && this.inClass(c.target, "highcharts-tracker")
              ? (m(f.series, "click", d(c, { point: f })),
                a.hoverPoint && f.firePointEvent("click", c))
              : (d(c, this.getCoordinates(c)),
                a.isInsidePlot(c.chartX - e, c.chartY - b, {
                  visiblePlotOnly: !0,
                }) && m(a, "click", c)));
        };
        a.prototype.onContainerMouseDown = function (a) {
          var c = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (g.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ("undefined" === typeof a.button || c)
            this.zoomOption(a),
              c && a.preventDefault && a.preventDefault(),
              this.dragStart(a);
        };
        a.prototype.onContainerMouseLeave = function (c) {
          var d = B[E(a.hoverChartIndex, -1)],
            f = this.chart.tooltip;
          c = this.normalize(c);
          d &&
            (c.relatedTarget || c.toElement) &&
            (d.pointer.reset(), (d.pointer.chartPosition = void 0));
          f && !f.isHidden && this.reset();
        };
        a.prototype.onContainerMouseEnter = function (a) {
          delete this.chartPosition;
        };
        a.prototype.onContainerMouseMove = function (a) {
          var c = this.chart,
            f = c.tooltip;
          a = this.normalize(a);
          this.setHoverChartIndex();
          a.preventDefault || (a.returnValue = !1);
          ("mousedown" === c.mouseIsDown || this.touchSelect(a)) &&
            this.drag(a);
          c.openMenu ||
            (!this.inClass(a.target, "highcharts-tracker") &&
              !c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            (f && f.shouldStickOnContact(a)) ||
            (this.inClass(a.target, "highcharts-no-tooltip")
              ? this.reset(!1, 0)
              : this.runPointActions(a));
        };
        a.prototype.onDocumentTouchEnd = function (c) {
          var d = B[E(a.hoverChartIndex, -1)];
          d && d.pointer.drop(c);
        };
        a.prototype.onContainerTouchMove = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a);
        };
        a.prototype.onContainerTouchStart = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0);
        };
        a.prototype.onDocumentMouseMove = function (a) {
          var c = this.chart,
            f = c.tooltip,
            d = this.chartPosition;
          a = this.normalize(a, d);
          !d ||
            c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
              visiblePlotOnly: !0,
            }) ||
            (f && f.shouldStickOnContact(a)) ||
            this.inClass(a.target, "highcharts-tracker") ||
            this.reset();
        };
        a.prototype.onDocumentMouseUp = function (c) {
          var d = B[E(a.hoverChartIndex, -1)];
          d && d.pointer.drop(c);
        };
        a.prototype.pinch = function (a) {
          var c = this,
            f = c.chart,
            e = c.pinchDown,
            b = a.touches || [],
            h = b.length,
            g = c.lastValidTouch,
            k = c.hasZoom,
            l = {},
            p =
              1 === h &&
              ((c.inClass(a.target, "highcharts-tracker") &&
                f.runTrackerClick) ||
                c.runChartClick),
            y = {},
            r = c.chart.tooltip;
          r = 1 === h && E(r && r.options.followTouchMove, !0);
          var t = c.selectionMarker;
          1 < h ? (c.initiated = !0) : r && (c.initiated = !1);
          k && c.initiated && !p && !1 !== a.cancelable && a.preventDefault();
          [].map.call(b, function (b) {
            return c.normalize(b);
          });
          "touchstart" === a.type
            ? ([].forEach.call(b, function (b, a) {
                e[a] = { chartX: b.chartX, chartY: b.chartY };
              }),
              (g.x = [e[0].chartX, e[1] && e[1].chartX]),
              (g.y = [e[0].chartY, e[1] && e[1].chartY]),
              f.axes.forEach(function (b) {
                if (b.zoomEnabled) {
                  var a = f.bounds[b.horiz ? "h" : "v"],
                    c = b.minPixelPadding,
                    d = b.toPixels(
                      Math.min(E(b.options.min, b.dataMin), b.dataMin),
                    ),
                    e = b.toPixels(
                      Math.max(E(b.options.max, b.dataMax), b.dataMax),
                    ),
                    h = Math.max(d, e);
                  a.min = Math.min(b.pos, Math.min(d, e) - c);
                  a.max = Math.max(b.pos + b.len, h + c);
                }
              }),
              (c.res = !0))
            : r
              ? this.runPointActions(c.normalize(a))
              : e.length &&
                (m(f, "touchpan", { originalEvent: a }, function () {
                  t ||
                    (c.selectionMarker = t =
                      d({ destroy: H, touch: !0 }, f.plotBox));
                  c.pinchTranslate(e, b, l, t, y, g);
                  c.hasPinched = k;
                  c.scaleGroups(l, y);
                }),
                c.res && ((c.res = !1), this.reset(!1, 0)));
        };
        a.prototype.pinchTranslate = function (a, d, f, e, b, h) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, d, f, e, b, h);
          this.zoomVert && this.pinchTranslateDirection(!1, a, d, f, e, b, h);
        };
        a.prototype.pinchTranslateDirection = function (
          a,
          d,
          f,
          e,
          b,
          h,
          g,
          k,
        ) {
          var c = this.chart,
            n = a ? "x" : "y",
            q = a ? "X" : "Y",
            u = "chart" + q,
            m = a ? "width" : "height",
            l = c["plot" + (a ? "Left" : "Top")],
            z = c.inverted,
            p = c.bounds[a ? "h" : "v"],
            w = 1 === d.length,
            y = d[0][u],
            r = !w && d[1][u];
          d = function () {
            "number" === typeof R &&
              20 < Math.abs(y - r) &&
              (M = k || Math.abs(t - R) / Math.abs(y - r));
            P = (l - t) / M + y;
            G = c["plot" + (a ? "Width" : "Height")] / M;
          };
          var G,
            P,
            M = k || 1,
            t = f[0][u],
            R = !w && f[1][u];
          d();
          f = P;
          if (f < p.min) {
            f = p.min;
            var E = !0;
          } else f + G > p.max && ((f = p.max - G), (E = !0));
          E
            ? ((t -= 0.8 * (t - g[n][0])),
              "number" === typeof R && (R -= 0.8 * (R - g[n][1])),
              d())
            : (g[n] = [t, R]);
          z || ((h[n] = P - l), (h[m] = G));
          h = z ? 1 / M : M;
          b[m] = G;
          b[n] = f;
          e[z ? (a ? "scaleY" : "scaleX") : "scale" + q] = M;
          e["translate" + q] = h * l + (t - h * y);
        };
        a.prototype.reset = function (a, d) {
          var c = this.chart,
            e = c.hoverSeries,
            b = c.hoverPoint,
            h = c.hoverPoints,
            g = c.tooltip,
            k = g && g.shared ? h : b;
          a &&
            k &&
            L(k).forEach(function (b) {
              b.series.isCartesian &&
                "undefined" === typeof b.plotX &&
                (a = !1);
            });
          if (a)
            g &&
              k &&
              L(k).length &&
              (g.refresh(k),
              g.shared && h
                ? h.forEach(function (b) {
                    b.setState(b.state, !0);
                    b.series.isCartesian &&
                      (b.series.xAxis.crosshair &&
                        b.series.xAxis.drawCrosshair(null, b),
                      b.series.yAxis.crosshair &&
                        b.series.yAxis.drawCrosshair(null, b));
                  })
                : b &&
                  (b.setState(b.state, !0),
                  c.axes.forEach(function (a) {
                    a.crosshair &&
                      b.series[a.coll] === a &&
                      a.drawCrosshair(null, b);
                  })));
          else {
            if (b) b.onMouseOut();
            h &&
              h.forEach(function (b) {
                b.setState();
              });
            if (e) e.onMouseOut();
            g && g.hide(d);
            this.unDocMouseMove &&
              (this.unDocMouseMove = this.unDocMouseMove());
            c.axes.forEach(function (b) {
              b.hideCrosshair();
            });
            this.hoverX = c.hoverPoints = c.hoverPoint = null;
          }
        };
        a.prototype.runPointActions = function (c, d, f) {
          var e = this.chart,
            b = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0,
            g = b ? b.shared : !1,
            k = d || e.hoverPoint,
            q = (k && k.series) || e.hoverSeries;
          d = this.getHoverData(
            k,
            q,
            e.series,
            (!c || "touchmove" !== c.type) &&
              (!!d || (q && q.directTouch && this.isDirectTouch)),
            g,
            c,
          );
          k = d.hoverPoint;
          q = d.hoverSeries;
          var m = d.hoverPoints;
          d = q && q.tooltipOptions.followPointer && !q.tooltipOptions.split;
          var l = g && q && !q.noSharedTooltip;
          if (k && (f || k !== e.hoverPoint || (b && b.isHidden))) {
            (e.hoverPoints || []).forEach(function (b) {
              -1 === m.indexOf(b) && b.setState();
            });
            if (e.hoverSeries !== q) q.onMouseOver();
            this.applyInactiveState(m);
            (m || []).forEach(function (b) {
              b.setState("hover");
            });
            e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
            if (!k.series) return;
            e.hoverPoints = m;
            e.hoverPoint = k;
            k.firePointEvent("mouseOver", void 0, function () {
              b && k && b.refresh(l ? m : k, c);
            });
          } else
            d &&
              b &&
              !b.isHidden &&
              ((f = b.getAnchor([{}], c)),
              e.isInsidePlot(f[0], f[1], { visiblePlotOnly: !0 }) &&
                b.updatePosition({ plotX: f[0], plotY: f[1] }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = t(
              e.container.ownerDocument,
              "mousemove",
              function (b) {
                var c = B[a.hoverChartIndex];
                if (c) c.pointer.onDocumentMouseMove(b);
              },
            )),
            this.eventsToUnbind.push(this.unDocMouseMove));
          e.axes.forEach(function (b) {
            var a = E((b.crosshair || {}).snap, !0),
              d;
            a &&
              (((d = e.hoverPoint) && d.series[b.coll] === b) ||
                (d = h(m, function (a) {
                  return a.series && a.series[b.coll] === b;
                })));
            d || !a ? b.drawCrosshair(c, d) : b.hideCrosshair();
          });
        };
        a.prototype.scaleGroups = function (a, d) {
          var c = this.chart;
          c.series.forEach(function (f) {
            var b = a || f.getPlotBox();
            f.group &&
              ((f.xAxis && f.xAxis.zoomEnabled) || c.mapView) &&
              (f.group.attr(b),
              f.markerGroup &&
                (f.markerGroup.attr(b),
                f.markerGroup.clip(d ? c.clipRect : null)),
              f.dataLabelsGroup && f.dataLabelsGroup.attr(b));
          });
          c.clipRect.attr(d || c.clipBox);
        };
        a.prototype.setDOMEvents = function () {
          var c = this,
            d = this.chart.container,
            f = d.ownerDocument;
          d.onmousedown = this.onContainerMouseDown.bind(this);
          d.onmousemove = this.onContainerMouseMove.bind(this);
          d.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(
            t(d, "mouseenter", this.onContainerMouseEnter.bind(this)),
          );
          this.eventsToUnbind.push(
            t(d, "mouseleave", this.onContainerMouseLeave.bind(this)),
          );
          a.unbindDocumentMouseUp ||
            (a.unbindDocumentMouseUp = t(
              f,
              "mouseup",
              this.onDocumentMouseUp.bind(this),
            ));
          for (
            var e = this.chart.renderTo.parentElement;
            e && "BODY" !== e.tagName;

          )
            this.eventsToUnbind.push(
              t(e, "scroll", function () {
                delete c.chartPosition;
              }),
            ),
              (e = e.parentElement);
          g.hasTouch &&
            (this.eventsToUnbind.push(
              t(d, "touchstart", this.onContainerTouchStart.bind(this), {
                passive: !1,
              }),
            ),
            this.eventsToUnbind.push(
              t(d, "touchmove", this.onContainerTouchMove.bind(this), {
                passive: !1,
              }),
            ),
            a.unbindDocumentTouchEnd ||
              (a.unbindDocumentTouchEnd = t(
                f,
                "touchend",
                this.onDocumentTouchEnd.bind(this),
                { passive: !1 },
              )));
        };
        a.prototype.setHoverChartIndex = function () {
          var c = this.chart,
            d = g.charts[E(a.hoverChartIndex, -1)];
          if (d && d !== c)
            d.pointer.onContainerMouseLeave({ relatedTarget: c.container });
          (d && d.mouseIsDown) || (a.hoverChartIndex = c.index);
        };
        a.prototype.touch = function (a, d) {
          var c = this.chart,
            e;
          this.setHoverChartIndex();
          if (1 === a.touches.length)
            if (
              ((a = this.normalize(a)),
              (e = c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                visiblePlotOnly: !0,
              })) && !c.openMenu)
            ) {
              d && this.runPointActions(a);
              if ("touchmove" === a.type) {
                d = this.pinchDown;
                var b = d[0]
                  ? 4 <=
                    Math.sqrt(
                      Math.pow(d[0].chartX - a.chartX, 2) +
                        Math.pow(d[0].chartY - a.chartY, 2),
                    )
                  : !1;
              }
              E(b, !0) && this.pinch(a);
            } else d && this.reset();
          else 2 === a.touches.length && this.pinch(a);
        };
        a.prototype.touchSelect = function (a) {
          return !(
            !this.chart.options.chart.zooming.singleTouch ||
            !a.touches ||
            1 !== a.touches.length
          );
        };
        a.prototype.zoomOption = function (a) {
          var c = this.chart,
            d = c.options.chart;
          c = c.inverted;
          var e = d.zooming.type || "";
          /touch/.test(a.type) && (e = E(d.zooming.pinchType, e));
          this.zoomX = a = /x/.test(e);
          this.zoomY = d = /y/.test(e);
          this.zoomHor = (a && !c) || (d && c);
          this.zoomVert = (d && !c) || (a && c);
          this.hasZoom = a || d;
        };
        return a;
      })();
      ("");
      return a;
    },
  );
  K(
    g,
    "Core/MSPointer.js",
    [g["Core/Globals.js"], g["Core/Pointer.js"], g["Core/Utilities.js"]],
    function (a, g, x) {
      function A() {
        var a = [];
        a.item = function (a) {
          return this[a];
        };
        h(p, function (d) {
          a.push({ pageX: d.pageX, pageY: d.pageY, target: d.target });
        });
        return a;
      }
      function C(a, d, e, h) {
        var c = H[g.hoverChartIndex || NaN];
        ("touch" !== a.pointerType &&
          a.pointerType !== a.MSPOINTER_TYPE_TOUCH) ||
          !c ||
          ((c = c.pointer),
          h(a),
          c[d]({
            type: e,
            target: a.currentTarget,
            preventDefault: r,
            touches: A(),
          }));
      }
      var B =
          (this && this.__extends) ||
          (function () {
            var a = function (d, e) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
                };
              return a(d, e);
            };
            return function (d, e) {
              function h() {
                this.constructor = d;
              }
              a(d, e);
              d.prototype =
                null === e
                  ? Object.create(e)
                  : ((h.prototype = e.prototype), new h());
            };
          })(),
        H = a.charts,
        t = a.doc,
        r = a.noop,
        l = a.win,
        e = x.addEvent,
        d = x.css,
        h = x.objectEach,
        m = x.pick,
        k = x.removeEvent,
        p = {},
        D = !!l.PointerEvent;
      return (function (h) {
        function g() {
          return (null !== h && h.apply(this, arguments)) || this;
        }
        B(g, h);
        g.isRequired = function () {
          return !(a.hasTouch || (!l.PointerEvent && !l.MSPointerEvent));
        };
        g.prototype.batchMSEvents = function (a) {
          a(
            this.chart.container,
            D ? "pointerdown" : "MSPointerDown",
            this.onContainerPointerDown,
          );
          a(
            this.chart.container,
            D ? "pointermove" : "MSPointerMove",
            this.onContainerPointerMove,
          );
          a(t, D ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        };
        g.prototype.destroy = function () {
          this.batchMSEvents(k);
          h.prototype.destroy.call(this);
        };
        g.prototype.init = function (a, e) {
          h.prototype.init.call(this, a, e);
          this.hasZoom &&
            d(a.container, {
              "-ms-touch-action": "none",
              "touch-action": "none",
            });
        };
        g.prototype.onContainerPointerDown = function (a) {
          C(a, "onContainerTouchStart", "touchstart", function (a) {
            p[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
              target: a.currentTarget,
            };
          });
        };
        g.prototype.onContainerPointerMove = function (a) {
          C(a, "onContainerTouchMove", "touchmove", function (a) {
            p[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
            p[a.pointerId].target || (p[a.pointerId].target = a.currentTarget);
          });
        };
        g.prototype.onDocumentPointerUp = function (a) {
          C(a, "onDocumentTouchEnd", "touchend", function (a) {
            delete p[a.pointerId];
          });
        };
        g.prototype.setDOMEvents = function () {
          var a = this.chart.tooltip;
          h.prototype.setDOMEvents.call(this);
          (this.hasZoom || m(a && a.options.followTouchMove, !0)) &&
            this.batchMSEvents(e);
        };
        return g;
      })(g);
    },
  );
  K(
    g,
    "Core/Legend/Legend.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/FormatUtilities.js"],
      g["Core/Globals.js"],
      g["Core/Series/Point.js"],
      g["Core/Renderer/RendererUtilities.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C, B) {
      var A = a.animObject,
        t = a.setAnimation,
        r = g.format,
        l = x.marginNames,
        e = C.distribute,
        d = B.addEvent,
        h = B.createElement,
        m = B.css,
        k = B.defined,
        p = B.discardElement,
        D = B.find,
        I = B.fireEvent,
        E = B.isNumber,
        L = B.merge,
        y = B.pick,
        c = B.relativeLength,
        w = B.stableSort,
        f = B.syncTimeout;
      a = (function () {
        function a(b, a) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth =
            this.maxLegendWidth =
            this.maxItemWidth =
            this.legendWidth =
            this.legendHeight =
            this.lastLineHeight =
            this.lastItemY =
            this.itemY =
            this.itemX =
            this.itemMarginTop =
            this.itemMarginBottom =
            this.itemHeight =
            this.initialItemY =
              0;
          this.options = void 0;
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption =
            this.totalItemWidth =
            this.titleHeight =
            this.symbolWidth =
            this.symbolHeight =
              0;
          this.chart = b;
          this.init(b, a);
        }
        a.prototype.init = function (b, a) {
          this.chart = b;
          this.setOptions(a);
          a.enabled &&
            (this.render(),
            d(this.chart, "endResize", function () {
              this.legend.positionCheckboxes();
            }),
            this.proximate
              ? (this.unchartrender = d(this.chart, "render", function () {
                  this.legend.proximatePositions();
                  this.legend.positionItems();
                }))
              : this.unchartrender && this.unchartrender());
        };
        a.prototype.setOptions = function (b) {
          var a = y(b.padding, 8);
          this.options = b;
          this.chart.styledMode ||
            ((this.itemStyle = b.itemStyle),
            (this.itemHiddenStyle = L(this.itemStyle, b.itemHiddenStyle)));
          this.itemMarginTop = b.itemMarginTop || 0;
          this.itemMarginBottom = b.itemMarginBottom || 0;
          this.padding = a;
          this.initialItemY = a - 5;
          this.symbolWidth = y(b.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === b.layout && !this.chart.inverted;
          this.baseline = void 0;
        };
        a.prototype.update = function (b, a) {
          var c = this.chart;
          this.setOptions(L(!0, this.options, b));
          this.destroy();
          c.isDirtyLegend = c.isDirtyBox = !0;
          y(a, !0) && c.redraw();
          I(this, "afterUpdate");
        };
        a.prototype.colorizeItem = function (b, a) {
          var c = b.legendItem || {},
            d = c.group,
            f = c.label,
            e = c.line;
          c = c.symbol;
          if (d)
            d[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
          if (!this.chart.styledMode) {
            var h = this.options;
            d = this.itemHiddenStyle.color;
            h = a ? h.itemStyle.color : d;
            var g = a ? b.color || d : d,
              k = b.options && b.options.marker,
              n = { fill: g };
            f && f.css({ fill: h, color: h });
            e && e.attr({ stroke: g });
            c &&
              (k &&
                c.isMarker &&
                ((n = b.pointAttribs()), a || (n.stroke = n.fill = d)),
              c.attr(n));
          }
          I(this, "afterColorizeItem", { item: b, visible: a });
        };
        a.prototype.positionItems = function () {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        };
        a.prototype.positionItem = function (b) {
          var a = this,
            c = b.legendItem || {},
            d = c.group,
            f = c.x;
          f = void 0 === f ? 0 : f;
          c = c.y;
          c = void 0 === c ? 0 : c;
          var e = this.options,
            h = e.symbolPadding,
            g = !e.rtl;
          e = b.checkbox;
          d &&
            d.element &&
            ((h = {
              translateX: g ? f : this.legendWidth - f - 2 * h - 4,
              translateY: c,
            }),
            d[k(d.translateY) ? "animate" : "attr"](h, void 0, function () {
              I(a, "afterPositionItem", { item: b });
            }));
          e && ((e.x = f), (e.y = c));
        };
        a.prototype.destroyItem = function (b) {
          for (
            var a = b.checkbox,
              c = b.legendItem || {},
              d = 0,
              f = ["group", "label", "line", "symbol"];
            d < f.length;
            d++
          ) {
            var e = f[d];
            c[e] && (c[e] = c[e].destroy());
          }
          a && p(a);
          b.legendItem = void 0;
        };
        a.prototype.destroy = function () {
          for (var b = 0, a = this.getAllItems(); b < a.length; b++)
            this.destroyItem(a[b]);
          b = 0;
          for (
            a = "clipRect up down pager nav box title group".split(" ");
            b < a.length;
            b++
          ) {
            var c = a[b];
            this[c] && (this[c] = this[c].destroy());
          }
          this.display = null;
        };
        a.prototype.positionCheckboxes = function () {
          var b = this.group && this.group.alignAttr,
            a = this.clipHeight || this.legendHeight,
            c = this.titleHeight;
          if (b) {
            var d = b.translateY;
            this.allItems.forEach(function (f) {
              var e = f.checkbox;
              if (e) {
                var h = d + c + e.y + (this.scrollOffset || 0) + 3;
                m(e, {
                  left: b.translateX + f.checkboxOffset + e.x - 20 + "px",
                  top: h + "px",
                  display:
                    this.proximate || (h > d - 6 && h < d + a - 6)
                      ? ""
                      : "none",
                });
              }
            }, this);
          }
        };
        a.prototype.renderTitle = function () {
          var b = this.options,
            a = this.padding,
            c = b.title,
            d = 0;
          c.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(
                  c.text,
                  a - 3,
                  a - 4,
                  void 0,
                  void 0,
                  void 0,
                  b.useHTML,
                  void 0,
                  "legend-title",
                )
                .attr({ zIndex: 1 })),
              this.chart.styledMode || this.title.css(c.style),
              this.title.add(this.group)),
            c.width || this.title.css({ width: this.maxLegendWidth + "px" }),
            (b = this.title.getBBox()),
            (d = b.height),
            (this.offsetWidth = b.width),
            this.contentGroup.attr({ translateY: d }));
          this.titleHeight = d;
        };
        a.prototype.setText = function (b) {
          var a = this.options;
          b.legendItem.label.attr({
            text: a.labelFormat
              ? r(a.labelFormat, b, this.chart)
              : a.labelFormatter.call(b),
          });
        };
        a.prototype.renderItem = function (b) {
          var a = (b.legendItem = b.legendItem || {}),
            c = this.chart,
            d = c.renderer,
            f = this.options,
            e = this.symbolWidth,
            h = f.symbolPadding || 0,
            g = this.itemStyle,
            k = this.itemHiddenStyle,
            n = "horizontal" === f.layout ? y(f.itemDistance, 20) : 0,
            m = !f.rtl,
            l = !b.series,
            p = !l && b.series.drawLegendSymbol ? b.series : b,
            r = p.options,
            w = this.createCheckboxForItem && r && r.showCheckbox,
            G = f.useHTML,
            P = b.options.className,
            M = a.label;
          r = e + h + n + (w ? 20 : 0);
          M ||
            ((a.group = d
              .g("legend-item")
              .addClass(
                "highcharts-" +
                  p.type +
                  "-series highcharts-color-" +
                  b.colorIndex +
                  (P ? " " + P : "") +
                  (l ? " highcharts-series-" + b.index : ""),
              )
              .attr({ zIndex: 1 })
              .add(this.scrollGroup)),
            (a.label = M = d.text("", m ? e + h : -h, this.baseline || 0, G)),
            c.styledMode || M.css(L(b.visible ? g : k)),
            M.attr({ align: m ? "left" : "right", zIndex: 2 }).add(a.group),
            this.baseline ||
              ((this.fontMetrics = d.fontMetrics(
                c.styledMode ? 12 : g.fontSize,
                M,
              )),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              M.attr("y", this.baseline),
              (this.symbolHeight = f.symbolHeight || this.fontMetrics.f),
              f.squareSymbol &&
                ((this.symbolWidth = y(
                  f.symbolWidth,
                  Math.max(this.symbolHeight, 16),
                )),
                (r = this.symbolWidth + h + n + (w ? 20 : 0)),
                m && M.attr("x", this.symbolWidth + h))),
            p.drawLegendSymbol(this, b),
            this.setItemEvents && this.setItemEvents(b, M, G));
          w &&
            !b.checkbox &&
            this.createCheckboxForItem &&
            this.createCheckboxForItem(b);
          this.colorizeItem(b, b.visible);
          (!c.styledMode && g.width) ||
            M.css({
              width:
                (f.itemWidth || this.widthOption || c.spacingBox.width) -
                r +
                "px",
            });
          this.setText(b);
          c = M.getBBox();
          d = (this.fontMetrics && this.fontMetrics.h) || 0;
          b.itemWidth = b.checkboxOffset =
            f.itemWidth || a.labelWidth || c.width + r;
          this.maxItemWidth = Math.max(this.maxItemWidth, b.itemWidth);
          this.totalItemWidth += b.itemWidth;
          this.itemHeight = b.itemHeight = Math.round(
            a.labelHeight || (c.height > 1.5 * d ? c.height : d),
          );
        };
        a.prototype.layoutItem = function (b) {
          var a = this.options,
            c = this.padding,
            d = "horizontal" === a.layout,
            f = b.itemHeight,
            e = this.itemMarginBottom,
            h = this.itemMarginTop,
            g = d ? y(a.itemDistance, 20) : 0,
            k = this.maxLegendWidth;
          a =
            a.alignColumns && this.totalItemWidth > k
              ? this.maxItemWidth
              : b.itemWidth;
          var n = b.legendItem || {};
          d &&
            this.itemX - c + a > k &&
            ((this.itemX = c),
            this.lastLineHeight && (this.itemY += h + this.lastLineHeight + e),
            (this.lastLineHeight = 0));
          this.lastItemY = h + this.itemY + e;
          this.lastLineHeight = Math.max(f, this.lastLineHeight);
          n.x = this.itemX;
          n.y = this.itemY;
          d
            ? (this.itemX += a)
            : ((this.itemY += h + f + e), (this.lastLineHeight = f));
          this.offsetWidth =
            this.widthOption ||
            Math.max(
              (d ? this.itemX - c - (b.checkbox ? 0 : g) : a) + c,
              this.offsetWidth,
            );
        };
        a.prototype.getAllItems = function () {
          var b = [];
          this.chart.series.forEach(function (a) {
            var c = a && a.options;
            a &&
              y(c.showInLegend, k(c.linkedTo) ? !1 : void 0, !0) &&
              (b = b.concat(
                (a.legendItem || {}).labels ||
                  ("point" === c.legendType ? a.data : a),
              ));
          });
          I(this, "afterGetAllItems", { allItems: b });
          return b;
        };
        a.prototype.getAlignment = function () {
          var b = this.options;
          return this.proximate
            ? b.align.charAt(0) + "tv"
            : b.floating
              ? ""
              : b.align.charAt(0) +
                b.verticalAlign.charAt(0) +
                b.layout.charAt(0);
        };
        a.prototype.adjustMargins = function (b, a) {
          var c = this.chart,
            d = this.options,
            f = this.getAlignment();
          f &&
            [
              /(lth|ct|rth)/,
              /(rtv|rm|rbv)/,
              /(rbh|cb|lbh)/,
              /(lbv|lm|ltv)/,
            ].forEach(function (e, h) {
              e.test(f) &&
                !k(b[h]) &&
                (c[l[h]] = Math.max(
                  c[l[h]],
                  c.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][h] * d[h % 2 ? "x" : "y"] +
                    y(d.margin, 12) +
                    a[h] +
                    (c.titleOffset[h] || 0),
                ));
            });
        };
        a.prototype.proximatePositions = function () {
          var b = this.chart,
            a = [],
            c = "left" === this.options.align;
          this.allItems.forEach(function (d) {
            var f;
            var e = c;
            if (d.yAxis) {
              d.xAxis.options.reversed && (e = !e);
              d.points &&
                (f = D(
                  e ? d.points : d.points.slice(0).reverse(),
                  function (b) {
                    return E(b.plotY);
                  },
                ));
              e =
                this.itemMarginTop +
                d.legendItem.label.getBBox().height +
                this.itemMarginBottom;
              var h = d.yAxis.top - b.plotTop;
              d.visible
                ? ((f = f ? f.plotY : d.yAxis.height), (f += h - 0.3 * e))
                : (f = h + d.yAxis.height);
              a.push({ target: f, size: e, item: d });
            }
          }, this);
          for (var d, f = 0, h = e(a, b.plotHeight); f < h.length; f++) {
            var g = h[f];
            d = g.item.legendItem || {};
            E(g.pos) && (d.y = b.plotTop - b.spacing[0] + g.pos);
          }
        };
        a.prototype.render = function () {
          var b = this.chart,
            a = b.renderer,
            d = this.options,
            f = this.padding,
            e = this.getAllItems(),
            h = this.group,
            g = this.box;
          this.itemX = f;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = c(d.width, b.spacingBox.width - f);
          var k = b.spacingBox.width - 2 * f - d.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) &&
            (k /= 2);
          this.maxLegendWidth = this.widthOption || k;
          h ||
            ((this.group = h =
              a
                .g("legend")
                .addClass(d.className || "")
                .attr({ zIndex: 7 })
                .add()),
            (this.contentGroup = a.g().attr({ zIndex: 1 }).add(h)),
            (this.scrollGroup = a.g().add(this.contentGroup)));
          this.renderTitle();
          w(e, function (b, a) {
            return (
              ((b.options && b.options.legendIndex) || 0) -
              ((a.options && a.options.legendIndex) || 0)
            );
          });
          d.reversed && e.reverse();
          this.allItems = e;
          this.display = k = !!e.length;
          this.itemHeight =
            this.totalItemWidth =
            this.maxItemWidth =
            this.lastLineHeight =
              0;
          e.forEach(this.renderItem, this);
          e.forEach(this.layoutItem, this);
          e = (this.widthOption || this.offsetWidth) + f;
          var n = this.lastItemY + this.lastLineHeight + this.titleHeight;
          n = this.handleOverflow(n);
          n += f;
          g ||
            (this.box = g =
              a
                .rect()
                .addClass("highcharts-legend-box")
                .attr({ r: d.borderRadius })
                .add(h));
          b.styledMode ||
            g
              .attr({
                stroke: d.borderColor,
                "stroke-width": d.borderWidth || 0,
                fill: d.backgroundColor || "none",
              })
              .shadow(d.shadow);
          if (0 < e && 0 < n)
            g[g.placed ? "animate" : "attr"](
              g.crisp.call(
                {},
                { x: 0, y: 0, width: e, height: n },
                g.strokeWidth(),
              ),
            );
          h[k ? "show" : "hide"]();
          b.styledMode && "none" === h.getStyle("display") && (e = n = 0);
          this.legendWidth = e;
          this.legendHeight = n;
          k && this.align();
          this.proximate || this.positionItems();
          I(this, "afterRender");
        };
        a.prototype.align = function (b) {
          void 0 === b && (b = this.chart.spacingBox);
          var a = this.chart,
            c = this.options,
            d = b.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0]
            ? (d += a.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < a.titleOffset[2] &&
              (d -= a.titleOffset[2]);
          d !== b.y && (b = L(b, { y: d }));
          a.hasRendered || (this.group.placed = !1);
          this.group.align(
            L(c, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? "top" : c.verticalAlign,
            }),
            !0,
            b,
          );
        };
        a.prototype.handleOverflow = function (b) {
          var a = this,
            c = this.chart,
            d = c.renderer,
            f = this.options,
            e = f.y,
            h = "top" === f.verticalAlign,
            g = this.padding,
            k = f.maxHeight,
            n = f.navigation,
            m = y(n.animation, !0),
            l = n.arrowSize || 12,
            p = this.pages,
            r = this.allItems,
            w = function (b) {
              "number" === typeof b
                ? D.attr({ height: b })
                : D && ((a.clipRect = D.destroy()), a.contentGroup.clip());
              a.contentGroup.div &&
                (a.contentGroup.div.style.clip = b
                  ? "rect(" + g + "px,9999px," + (g + b) + "px,0)"
                  : "auto");
            },
            G = function (b) {
              a[b] = d
                .circle(0, 0, 1.3 * l)
                .translate(l / 2, l / 2)
                .add(R);
              c.styledMode || a[b].attr("fill", "rgba(0,0,0,0.0001)");
              return a[b];
            },
            P,
            M,
            t;
          e = c.spacingBox.height + (h ? -e : e) - g;
          var R = this.nav,
            D = this.clipRect;
          "horizontal" !== f.layout ||
            "middle" === f.verticalAlign ||
            f.floating ||
            (e /= 2);
          k && (e = Math.min(e, k));
          p.length = 0;
          b && 0 < e && b > e && !1 !== n.enabled
            ? ((this.clipHeight = P =
                Math.max(e - 20 - this.titleHeight - g, 0)),
              (this.currentPage = y(this.currentPage, 1)),
              (this.fullHeight = b),
              r.forEach(function (b, a) {
                t = b.legendItem || {};
                b = t.y || 0;
                var c = Math.round(t.label.getBBox().height),
                  d = p.length;
                if (!d || (b - p[d - 1] > P && (M || b) !== p[d - 1]))
                  p.push(M || b), d++;
                t.pageIx = d - 1;
                M && ((r[a - 1].legendItem || {}).pageIx = d - 1);
                a === r.length - 1 &&
                  b + c - p[d - 1] > P &&
                  c <= P &&
                  (p.push(b), (t.pageIx = d));
                b !== M && (M = b);
              }),
              D ||
                ((D = a.clipRect = d.clipRect(0, g, 9999, 0)),
                a.contentGroup.clip(D)),
              w(P),
              R ||
                ((this.nav = R = d.g().attr({ zIndex: 1 }).add(this.group)),
                (this.up = d.symbol("triangle", 0, 0, l, l).add(R)),
                G("upTracker").on("click", function () {
                  a.scroll(-1, m);
                }),
                (this.pager = d
                  .text("", 15, 10)
                  .addClass("highcharts-legend-navigation")),
                !c.styledMode && n.style && this.pager.css(n.style),
                this.pager.add(R),
                (this.down = d.symbol("triangle-down", 0, 0, l, l).add(R)),
                G("downTracker").on("click", function () {
                  a.scroll(1, m);
                })),
              a.scroll(0),
              (b = e))
            : R &&
              (w(),
              (this.nav = R.destroy()),
              this.scrollGroup.attr({ translateY: 1 }),
              (this.clipHeight = 0));
          return b;
        };
        a.prototype.scroll = function (b, a) {
          var c = this,
            d = this.chart,
            e = this.pages,
            h = e.length,
            g = this.clipHeight,
            k = this.options.navigation,
            n = this.pager,
            m = this.padding,
            l = this.currentPage + b;
          l > h && (l = h);
          0 < l &&
            ("undefined" !== typeof a && t(a, d),
            this.nav.attr({
              translateX: m,
              translateY: g + this.padding + 7 + this.titleHeight,
              visibility: "inherit",
            }),
            [this.up, this.upTracker].forEach(function (b) {
              b.attr({
                class:
                  1 === l
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }),
            n.attr({ text: l + "/" + h }),
            [this.down, this.downTracker].forEach(function (b) {
              b.attr({
                x: 18 + this.pager.getBBox().width,
                class:
                  l === h
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }, this),
            d.styledMode ||
              (this.up.attr({
                fill: 1 === l ? k.inactiveColor : k.activeColor,
              }),
              this.upTracker.css({ cursor: 1 === l ? "default" : "pointer" }),
              this.down.attr({
                fill: l === h ? k.inactiveColor : k.activeColor,
              }),
              this.downTracker.css({
                cursor: l === h ? "default" : "pointer",
              })),
            (this.scrollOffset = -e[l - 1] + this.initialItemY),
            this.scrollGroup.animate({ translateY: this.scrollOffset }),
            (this.currentPage = l),
            this.positionCheckboxes(),
            (b = A(y(a, d.renderer.globalAnimation, !0))),
            f(function () {
              I(c, "afterScroll", { currentPage: l });
            }, b.duration));
        };
        a.prototype.setItemEvents = function (b, a, c) {
          var d = this,
            f = b.legendItem || {},
            e = d.chart.renderer.boxWrapper,
            h = b instanceof F,
            g = "highcharts-legend-" + (h ? "point" : "series") + "-active",
            k = d.chart.styledMode,
            n = function (a) {
              d.allItems.forEach(function (c) {
                b !== c &&
                  [c].concat(c.linkedSeries || []).forEach(function (b) {
                    b.setState(a, !h);
                  });
              });
            },
            m = 0;
          for (c = c ? [a, f.symbol] : [f.group]; m < c.length; m++)
            if ((f = c[m]))
              f.on("mouseover", function () {
                b.visible && n("inactive");
                b.setState("hover");
                b.visible && e.addClass(g);
                k || a.css(d.options.itemHoverStyle);
              })
                .on("mouseout", function () {
                  d.chart.styledMode ||
                    a.css(L(b.visible ? d.itemStyle : d.itemHiddenStyle));
                  n("");
                  e.removeClass(g);
                  b.setState();
                })
                .on("click", function (a) {
                  var c = function () {
                    b.setVisible && b.setVisible();
                    n(b.visible ? "inactive" : "");
                  };
                  e.removeClass(g);
                  a = { browserEvent: a };
                  b.firePointEvent
                    ? b.firePointEvent("legendItemClick", a, c)
                    : I(b, "legendItemClick", a, c);
                });
        };
        a.prototype.createCheckboxForItem = function (b) {
          b.checkbox = h(
            "input",
            {
              type: "checkbox",
              className: "highcharts-legend-checkbox",
              checked: b.selected,
              defaultChecked: b.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container,
          );
          d(b.checkbox, "click", function (a) {
            I(
              b.series || b,
              "checkboxClick",
              { checked: a.target.checked, item: b },
              function () {
                b.select();
              },
            );
          });
        };
        return a;
      })();
      ("");
      return a;
    },
  );
  K(
    g,
    "Core/Series/SeriesRegistry.js",
    [
      g["Core/Globals.js"],
      g["Core/Defaults.js"],
      g["Core/Series/Point.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F) {
      var A = g.defaultOptions,
        B = F.extendClass,
        H = F.merge,
        t;
      (function (g) {
        function l(a, d) {
          var e = A.plotOptions || {},
            m = d.defaultOptions,
            k = d.prototype;
          k.type = a;
          k.pointClass || (k.pointClass = x);
          m && (e[a] = m);
          g.seriesTypes[a] = d;
        }
        g.seriesTypes = a.seriesTypes;
        g.registerSeriesType = l;
        g.seriesType = function (a, d, h, m, k) {
          var e = A.plotOptions || {};
          d = d || "";
          e[a] = H(e[d], h);
          l(a, B(g.seriesTypes[d] || function () {}, m));
          g.seriesTypes[a].prototype.type = a;
          k && (g.seriesTypes[a].prototype.pointClass = B(x, k));
          return g.seriesTypes[a];
        };
      })(t || (t = {}));
      return t;
    },
  );
  K(
    g,
    "Core/Chart/Chart.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Axis/Axis.js"],
      g["Core/Defaults.js"],
      g["Core/FormatUtilities.js"],
      g["Core/Foundation.js"],
      g["Core/Globals.js"],
      g["Core/Legend/Legend.js"],
      g["Core/MSPointer.js"],
      g["Core/Pointer.js"],
      g["Core/Renderer/RendererRegistry.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Renderer/SVG/SVGRenderer.js"],
      g["Core/Time.js"],
      g["Core/Utilities.js"],
      g["Core/Renderer/HTML/AST.js"],
    ],
    function (a, g, x, F, C, B, H, t, r, l, e, d, h, m, k) {
      var p = a.animate,
        D = a.animObject,
        A = a.setAnimation,
        E = x.defaultOptions,
        L = x.defaultTime,
        y = F.numberFormat,
        c = C.registerEventOptions,
        w = B.charts,
        f = B.doc,
        n = B.marginNames,
        b = B.svg,
        u = B.win,
        z = e.seriesTypes,
        q = m.addEvent,
        N = m.attr,
        J = m.cleanRecursively,
        O = m.createElement,
        Q = m.css,
        T = m.defined,
        Y = m.discardElement,
        v = m.erase,
        U = m.error,
        K = m.extend,
        ca = m.find,
        S = m.fireEvent,
        G = m.getStyle,
        P = m.isArray,
        M = m.isNumber,
        X = m.isObject,
        R = m.isString,
        V = m.merge,
        Z = m.objectEach,
        W = m.pick,
        ba = m.pInt,
        fa = m.relativeLength,
        ha = m.removeEvent,
        ea = m.splat,
        ia = m.syncTimeout,
        ka = m.uniqueKey;
      a = (function () {
        function a(b, a, c) {
          this.series =
            this.renderTo =
            this.renderer =
            this.pointer =
            this.pointCount =
            this.plotWidth =
            this.plotTop =
            this.plotLeft =
            this.plotHeight =
            this.plotBox =
            this.options =
            this.numberFormatter =
            this.margin =
            this.legend =
            this.labelCollectors =
            this.isResizing =
            this.index =
            this.eventOptions =
            this.container =
            this.colorCounter =
            this.clipBox =
            this.chartWidth =
            this.chartHeight =
            this.bounds =
            this.axisOffset =
            this.axes =
              void 0;
          this.sharedClips = {};
          this.yAxis =
            this.xAxis =
            this.userOptions =
            this.titleOffset =
            this.time =
            this.symbolCounter =
            this.spacingBox =
            this.spacing =
              void 0;
          this.getArgs(b, a, c);
        }
        a.chart = function (b, c, d) {
          return new a(b, c, d);
        };
        a.prototype.getArgs = function (b, a, c) {
          R(b) || b.nodeName
            ? ((this.renderTo = b), this.init(a, c))
            : this.init(b, a);
        };
        a.prototype.init = function (b, a) {
          var d = b.plotOptions || {};
          S(this, "init", { args: arguments }, function () {
            var f = V(E, b),
              e = f.chart;
            Z(f.plotOptions, function (b, a) {
              X(b) && (b.tooltip = (d[a] && V(d[a].tooltip)) || void 0);
            });
            f.tooltip.userOptions =
              (b.chart && b.chart.forExport && b.tooltip.userOptions) ||
              b.tooltip;
            this.userOptions = b;
            this.margin = [];
            this.spacing = [];
            this.bounds = { h: {}, v: {} };
            this.labelCollectors = [];
            this.callback = a;
            this.isResizing = 0;
            var g = (e.zooming = e.zooming || {});
            b.chart && !b.chart.zooming && (g.resetButton = e.resetZoomButton);
            g.key = W(g.key, e.zoomKey);
            g.pinchType = W(g.pinchType, e.pinchType);
            g.singleTouch = W(g.singleTouch, e.zoomBySingleTouch);
            g.type = W(g.type, e.zoomType);
            this.options = f;
            this.axes = [];
            this.series = [];
            this.time =
              b.time && Object.keys(b.time).length ? new h(b.time) : B.time;
            this.numberFormatter = e.numberFormatter || y;
            this.styledMode = e.styledMode;
            this.hasCartesianSeries = e.showAxes;
            this.index = w.length;
            w.push(this);
            B.chartCount++;
            c(this, e);
            this.xAxis = [];
            this.yAxis = [];
            this.pointCount = this.colorCounter = this.symbolCounter = 0;
            S(this, "afterInit");
            this.firstRender();
          });
        };
        a.prototype.initSeries = function (b) {
          var a = this.options.chart;
          a = b.type || a.type || a.defaultSeriesType;
          var c = z[a];
          c || U(17, !0, this, { missingModuleFor: a });
          a = new c();
          "function" === typeof a.init && a.init(this, b);
          return a;
        };
        a.prototype.setSeriesData = function () {
          this.getSeriesOrderByLinks().forEach(function (b) {
            b.points ||
              b.data ||
              !b.enabledDataSorting ||
              b.setData(b.options.data, !1);
          });
        };
        a.prototype.getSeriesOrderByLinks = function () {
          return this.series.concat().sort(function (b, a) {
            return b.linkedSeries.length || a.linkedSeries.length
              ? a.linkedSeries.length - b.linkedSeries.length
              : 0;
          });
        };
        a.prototype.orderSeries = function (b) {
          var a = this.series;
          b = b || 0;
          for (var c = a.length; b < c; ++b)
            a[b] && ((a[b].index = b), (a[b].name = a[b].getName()));
        };
        a.prototype.isInsidePlot = function (b, a, c) {
          void 0 === c && (c = {});
          var d = this.inverted,
            f = this.plotBox,
            e = this.plotLeft,
            h = this.plotTop,
            g = this.scrollablePlotBox,
            k = 0;
          var n = 0;
          c.visiblePlotOnly &&
            this.scrollingContainer &&
            ((n = this.scrollingContainer),
            (k = n.scrollLeft),
            (n = n.scrollTop));
          var m = c.series;
          f = (c.visiblePlotOnly && g) || f;
          g = c.inverted ? a : b;
          a = c.inverted ? b : a;
          b = { x: g, y: a, isInsidePlot: !0, options: c };
          if (!c.ignoreX) {
            var q = (m && (d && !this.polar ? m.yAxis : m.xAxis)) || {
              pos: e,
              len: Infinity,
            };
            g = c.paneCoordinates ? q.pos + g : e + g;
            (g >= Math.max(k + e, q.pos) &&
              g <= Math.min(k + e + f.width, q.pos + q.len)) ||
              (b.isInsidePlot = !1);
          }
          !c.ignoreY &&
            b.isInsidePlot &&
            ((d = (c.axis && !c.axis.isXAxis && c.axis) ||
              (m && (d ? m.xAxis : m.yAxis)) || { pos: h, len: Infinity }),
            (c = c.paneCoordinates ? d.pos + a : h + a),
            (c >= Math.max(n + h, d.pos) &&
              c <= Math.min(n + h + f.height, d.pos + d.len)) ||
              (b.isInsidePlot = !1));
          S(this, "afterIsInsidePlot", b);
          return b.isInsidePlot;
        };
        a.prototype.redraw = function (b) {
          S(this, "beforeRedraw");
          var a = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
            c = this.series,
            d = this.pointer,
            f = this.legend,
            e = this.userOptions.legend,
            h = this.renderer,
            g = h.isHidden(),
            k = [],
            n = this.isDirtyBox,
            m = this.isDirtyLegend;
          this.setResponsive && this.setResponsive(!1);
          A(this.hasRendered ? b : !1, this);
          g && this.temporaryDisplay();
          this.layOutTitles();
          for (b = c.length; b--; ) {
            var q = c[b];
            if (q.options.stacking || q.options.centerInCategory) {
              var l = !0;
              if (q.isDirty) {
                var G = !0;
                break;
              }
            }
          }
          if (G)
            for (b = c.length; b--; )
              (q = c[b]), q.options.stacking && (q.isDirty = !0);
          c.forEach(function (b) {
            b.isDirty &&
              ("point" === b.options.legendType
                ? ("function" === typeof b.updateTotals && b.updateTotals(),
                  (m = !0))
                : e && (e.labelFormatter || e.labelFormat) && (m = !0));
            b.isDirtyData && S(b, "updatedData");
          });
          m &&
            f &&
            f.options.enabled &&
            (f.render(), (this.isDirtyLegend = !1));
          l && this.getStacks();
          a.forEach(function (b) {
            b.updateNames();
            b.setScale();
          });
          this.getMargins();
          a.forEach(function (b) {
            b.isDirty && (n = !0);
          });
          a.forEach(function (b) {
            var a = b.min + "," + b.max;
            b.extKey !== a &&
              ((b.extKey = a),
              k.push(function () {
                S(b, "afterSetExtremes", K(b.eventArgs, b.getExtremes()));
                delete b.eventArgs;
              }));
            (n || l) && b.redraw();
          });
          n && this.drawChartBox();
          S(this, "predraw");
          c.forEach(function (b) {
            (n || b.isDirty) && b.visible && b.redraw();
            b.isDirtyData = !1;
          });
          d && d.reset(!0);
          h.draw();
          S(this, "redraw");
          S(this, "render");
          g && this.temporaryDisplay(!0);
          k.forEach(function (b) {
            b.call();
          });
        };
        a.prototype.get = function (b) {
          function a(a) {
            return a.id === b || (a.options && a.options.id === b);
          }
          for (
            var c = this.series,
              d = ca(this.axes, a) || ca(this.series, a),
              f = 0;
            !d && f < c.length;
            f++
          )
            d = ca(c[f].points || [], a);
          return d;
        };
        a.prototype.getAxes = function () {
          var b = this,
            a = this.options,
            c = (a.xAxis = ea(a.xAxis || {}));
          a = a.yAxis = ea(a.yAxis || {});
          S(this, "getAxes");
          c.forEach(function (b, a) {
            b.index = a;
            b.isX = !0;
          });
          a.forEach(function (b, a) {
            b.index = a;
          });
          c.concat(a).forEach(function (a) {
            new g(b, a);
          });
          S(this, "afterGetAxes");
        };
        a.prototype.getSelectedPoints = function () {
          return this.series.reduce(function (b, a) {
            a.getPointsCollection().forEach(function (a) {
              W(a.selectedStaging, a.selected) && b.push(a);
            });
            return b;
          }, []);
        };
        a.prototype.getSelectedSeries = function () {
          return this.series.filter(function (b) {
            return b.selected;
          });
        };
        a.prototype.setTitle = function (b, a, c) {
          this.applyDescription("title", b);
          this.applyDescription("subtitle", a);
          this.applyDescription("caption", void 0);
          this.layOutTitles(c);
        };
        a.prototype.applyDescription = function (b, a) {
          var c = this,
            d =
              "title" === b
                ? {
                    color: "#333333",
                    fontSize: this.options.isStock ? "16px" : "18px",
                  }
                : { color: "#666666" };
          d = this.options[b] = V(
            !this.styledMode && { style: d },
            this.options[b],
            a,
          );
          var f = this[b];
          f && a && (this[b] = f = f.destroy());
          d &&
            !f &&
            ((f = this.renderer
              .text(d.text, 0, 0, d.useHTML)
              .attr({
                align: d.align,
                class: "highcharts-" + b,
                zIndex: d.zIndex || 4,
              })
              .add()),
            (f.update = function (a) {
              c[
                {
                  title: "setTitle",
                  subtitle: "setSubtitle",
                  caption: "setCaption",
                }[b]
              ](a);
            }),
            this.styledMode || f.css(d.style),
            (this[b] = f));
        };
        a.prototype.layOutTitles = function (b) {
          var a = [0, 0, 0],
            c = this.renderer,
            d = this.spacingBox;
          ["title", "subtitle", "caption"].forEach(function (b) {
            var f = this[b],
              e = this.options[b],
              h = e.verticalAlign || "top";
            b =
              "title" === b
                ? "top" === h
                  ? -3
                  : 0
                : "top" === h
                  ? a[0] + 2
                  : 0;
            var g;
            if (f) {
              this.styledMode || (g = e.style && e.style.fontSize);
              g = c.fontMetrics(g, f).b;
              f.css({
                width: (e.width || d.width + (e.widthAdjust || 0)) + "px",
              });
              var k = Math.round(f.getBBox(e.useHTML).height);
              f.align(
                K({ y: "bottom" === h ? g : b + g, height: k }, e),
                !1,
                "spacingBox",
              );
              e.floating ||
                ("top" === h
                  ? (a[0] = Math.ceil(a[0] + k))
                  : "bottom" === h && (a[2] = Math.ceil(a[2] + k)));
            }
          }, this);
          a[0] &&
            "top" === (this.options.title.verticalAlign || "top") &&
            (a[0] += this.options.title.margin);
          a[2] &&
            "bottom" === this.options.caption.verticalAlign &&
            (a[2] += this.options.caption.margin);
          var f =
            !this.titleOffset || this.titleOffset.join(",") !== a.join(",");
          this.titleOffset = a;
          S(this, "afterLayOutTitles");
          !this.isDirtyBox &&
            f &&
            ((this.isDirtyBox = this.isDirtyLegend = f),
            this.hasRendered && W(b, !0) && this.isDirtyBox && this.redraw());
        };
        a.prototype.getChartSize = function () {
          var b = this.options.chart,
            a = b.width;
          b = b.height;
          var c = this.renderTo;
          T(a) || (this.containerWidth = G(c, "width"));
          T(b) || (this.containerHeight = G(c, "height"));
          this.chartWidth = Math.max(0, a || this.containerWidth || 600);
          this.chartHeight = Math.max(
            0,
            fa(b, this.chartWidth) ||
              (1 < this.containerHeight ? this.containerHeight : 400),
          );
        };
        a.prototype.temporaryDisplay = function (b) {
          var a = this.renderTo;
          if (b)
            for (; a && a.style; )
              a.hcOrigStyle && (Q(a, a.hcOrigStyle), delete a.hcOrigStyle),
                a.hcOrigDetached &&
                  (f.body.removeChild(a), (a.hcOrigDetached = !1)),
                (a = a.parentNode);
          else
            for (; a && a.style; ) {
              f.body.contains(a) ||
                a.parentNode ||
                ((a.hcOrigDetached = !0), f.body.appendChild(a));
              if ("none" === G(a, "display", !1) || a.hcOricDetached)
                (a.hcOrigStyle = {
                  display: a.style.display,
                  height: a.style.height,
                  overflow: a.style.overflow,
                }),
                  (b = { display: "block", overflow: "hidden" }),
                  a !== this.renderTo && (b.height = 0),
                  Q(a, b),
                  a.offsetWidth ||
                    a.style.setProperty("display", "block", "important");
              a = a.parentNode;
              if (a === f.body) break;
            }
        };
        a.prototype.setClassName = function (b) {
          this.container.className = "highcharts-container " + (b || "");
        };
        a.prototype.getContainer = function () {
          var a = this.options,
            c = a.chart,
            e = ka(),
            h,
            g = this.renderTo;
          g || (this.renderTo = g = c.renderTo);
          R(g) && (this.renderTo = g = f.getElementById(g));
          g || U(13, !0, this);
          var n = ba(N(g, "data-highcharts-chart"));
          M(n) && w[n] && w[n].hasRendered && w[n].destroy();
          N(g, "data-highcharts-chart", this.index);
          g.innerHTML = k.emptyHTML;
          c.skipClone || g.offsetWidth || this.temporaryDisplay();
          this.getChartSize();
          n = this.chartWidth;
          var m = this.chartHeight;
          Q(g, { overflow: "hidden" });
          this.styledMode ||
            (h = K(
              {
                position: "relative",
                overflow: "hidden",
                width: n + "px",
                height: m + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                userSelect: "none",
                "touch-action": "manipulation",
                outline: "none",
              },
              c.style || {},
            ));
          this.container = e = O("div", { id: e }, h, g);
          this._cursor = e.style.cursor;
          this.renderer = new (
            c.renderer || !b ? l.getRendererType(c.renderer) : d
          )(
            e,
            n,
            m,
            void 0,
            c.forExport,
            a.exporting && a.exporting.allowHTML,
            this.styledMode,
          );
          A(void 0, this);
          this.setClassName(c.className);
          if (this.styledMode)
            for (var q in a.defs) this.renderer.definition(a.defs[q]);
          else this.renderer.setStyle(c.style);
          this.renderer.chartIndex = this.index;
          S(this, "afterGetContainer");
        };
        a.prototype.getMargins = function (b) {
          var a = this.spacing,
            c = this.margin,
            d = this.titleOffset;
          this.resetMargins();
          d[0] &&
            !T(c[0]) &&
            (this.plotTop = Math.max(this.plotTop, d[0] + a[0]));
          d[2] &&
            !T(c[2]) &&
            (this.marginBottom = Math.max(this.marginBottom, d[2] + a[2]));
          this.legend && this.legend.display && this.legend.adjustMargins(c, a);
          S(this, "getMargins");
          b || this.getAxisMargins();
        };
        a.prototype.getAxisMargins = function () {
          var b = this,
            a = (b.axisOffset = [0, 0, 0, 0]),
            c = b.colorAxis,
            d = b.margin,
            f = function (b) {
              b.forEach(function (b) {
                b.visible && b.getOffset();
              });
            };
          b.hasCartesianSeries ? f(b.axes) : c && c.length && f(c);
          n.forEach(function (c, f) {
            T(d[f]) || (b[c] += a[f]);
          });
          b.setChartSize();
        };
        a.prototype.reflow = function (b) {
          var a = this,
            c = a.options.chart,
            d = a.renderTo,
            e = T(c.width) && T(c.height),
            h = c.width || G(d, "width");
          c = c.height || G(d, "height");
          d = b ? b.target : u;
          delete a.pointer.chartPosition;
          if (!e && !a.isPrinting && h && c && (d === u || d === f)) {
            if (h !== a.containerWidth || c !== a.containerHeight)
              m.clearTimeout(a.reflowTimeout),
                (a.reflowTimeout = ia(
                  function () {
                    a.container && a.setSize(void 0, void 0, !1);
                  },
                  b ? 100 : 0,
                ));
            a.containerWidth = h;
            a.containerHeight = c;
          }
        };
        a.prototype.setReflow = function (b) {
          var a = this;
          !1 === b || this.unbindReflow
            ? !1 === b &&
              this.unbindReflow &&
              (this.unbindReflow = this.unbindReflow())
            : ((this.unbindReflow = q(u, "resize", function (b) {
                a.options && a.reflow(b);
              })),
              q(this, "destroy", this.unbindReflow));
        };
        a.prototype.setSize = function (b, a, c) {
          var d = this,
            f = d.renderer;
          d.isResizing += 1;
          A(c, d);
          c = f.globalAnimation;
          d.oldChartHeight = d.chartHeight;
          d.oldChartWidth = d.chartWidth;
          "undefined" !== typeof b && (d.options.chart.width = b);
          "undefined" !== typeof a && (d.options.chart.height = a);
          d.getChartSize();
          d.styledMode ||
            (c ? p : Q)(
              d.container,
              { width: d.chartWidth + "px", height: d.chartHeight + "px" },
              c,
            );
          d.setChartSize(!0);
          f.setSize(d.chartWidth, d.chartHeight, c);
          d.axes.forEach(function (b) {
            b.isDirty = !0;
            b.setScale();
          });
          d.isDirtyLegend = !0;
          d.isDirtyBox = !0;
          d.layOutTitles();
          d.getMargins();
          d.redraw(c);
          d.oldChartHeight = null;
          S(d, "resize");
          ia(function () {
            d &&
              S(d, "endResize", null, function () {
                --d.isResizing;
              });
          }, D(c).duration);
        };
        a.prototype.setChartSize = function (b) {
          var a = this.inverted,
            c = this.renderer,
            d = this.chartWidth,
            f = this.chartHeight,
            e = this.options.chart,
            h = this.spacing,
            g = this.clipOffset,
            k,
            n,
            m,
            q;
          this.plotLeft = k = Math.round(this.plotLeft);
          this.plotTop = n = Math.round(this.plotTop);
          this.plotWidth = m = Math.max(
            0,
            Math.round(d - k - this.marginRight),
          );
          this.plotHeight = q = Math.max(
            0,
            Math.round(f - n - this.marginBottom),
          );
          this.plotSizeX = a ? q : m;
          this.plotSizeY = a ? m : q;
          this.plotBorderWidth = e.plotBorderWidth || 0;
          this.spacingBox = c.spacingBox = {
            x: h[3],
            y: h[0],
            width: d - h[3] - h[1],
            height: f - h[0] - h[2],
          };
          this.plotBox = c.plotBox = { x: k, y: n, width: m, height: q };
          a = 2 * Math.floor(this.plotBorderWidth / 2);
          d = Math.ceil(Math.max(a, g[3]) / 2);
          f = Math.ceil(Math.max(a, g[0]) / 2);
          this.clipBox = {
            x: d,
            y: f,
            width: Math.floor(this.plotSizeX - Math.max(a, g[1]) / 2 - d),
            height: Math.max(
              0,
              Math.floor(this.plotSizeY - Math.max(a, g[2]) / 2 - f),
            ),
          };
          b ||
            (this.axes.forEach(function (b) {
              b.setAxisSize();
              b.setAxisTranslation();
            }),
            c.alignElements());
          S(this, "afterSetChartSize", { skipAxes: b });
        };
        a.prototype.resetMargins = function () {
          S(this, "resetMargins");
          var b = this,
            a = b.options.chart;
          ["margin", "spacing"].forEach(function (c) {
            var d = a[c],
              f = X(d) ? d : [d, d, d, d];
            ["Top", "Right", "Bottom", "Left"].forEach(function (d, e) {
              b[c][e] = W(a[c + d], f[e]);
            });
          });
          n.forEach(function (a, c) {
            b[a] = W(b.margin[c], b.spacing[c]);
          });
          b.axisOffset = [0, 0, 0, 0];
          b.clipOffset = [0, 0, 0, 0];
        };
        a.prototype.drawChartBox = function () {
          var b = this.options.chart,
            a = this.renderer,
            c = this.chartWidth,
            d = this.chartHeight,
            f = this.styledMode,
            e = this.plotBGImage,
            h = b.backgroundColor,
            g = b.plotBackgroundColor,
            k = b.plotBackgroundImage,
            n = this.plotLeft,
            m = this.plotTop,
            q = this.plotWidth,
            l = this.plotHeight,
            G = this.plotBox,
            u = this.clipRect,
            p = this.clipBox,
            M = this.chartBackground,
            v = this.plotBackground,
            w = this.plotBorder,
            r,
            z = "animate";
          M ||
            ((this.chartBackground = M =
              a.rect().addClass("highcharts-background").add()),
            (z = "attr"));
          if (f) var y = (r = M.strokeWidth());
          else {
            y = b.borderWidth || 0;
            r = y + (b.shadow ? 8 : 0);
            h = { fill: h || "none" };
            if (y || M["stroke-width"])
              (h.stroke = b.borderColor), (h["stroke-width"] = y);
            M.attr(h).shadow(b.shadow);
          }
          M[z]({
            x: r / 2,
            y: r / 2,
            width: c - r - (y % 2),
            height: d - r - (y % 2),
            r: b.borderRadius,
          });
          z = "animate";
          v ||
            ((z = "attr"),
            (this.plotBackground = v =
              a.rect().addClass("highcharts-plot-background").add()));
          v[z](G);
          f ||
            (v.attr({ fill: g || "none" }).shadow(b.plotShadow),
            k &&
              (e
                ? (k !== e.attr("href") && e.attr("href", k), e.animate(G))
                : (this.plotBGImage = a.image(k, n, m, q, l).add())));
          u
            ? u.animate({ width: p.width, height: p.height })
            : (this.clipRect = a.clipRect(p));
          z = "animate";
          w ||
            ((z = "attr"),
            (this.plotBorder = w =
              a
                .rect()
                .addClass("highcharts-plot-border")
                .attr({ zIndex: 1 })
                .add()));
          f ||
            w.attr({
              stroke: b.plotBorderColor,
              "stroke-width": b.plotBorderWidth || 0,
              fill: "none",
            });
          w[z](w.crisp({ x: n, y: m, width: q, height: l }, -w.strokeWidth()));
          this.isDirtyBox = !1;
          S(this, "afterDrawChartBox");
        };
        a.prototype.propFromSeries = function () {
          var b = this,
            a = b.options.chart,
            c = b.options.series,
            d,
            f,
            e;
          ["inverted", "angular", "polar"].forEach(function (h) {
            f = z[a.type || a.defaultSeriesType];
            e = a[h] || (f && f.prototype[h]);
            for (d = c && c.length; !e && d--; )
              (f = z[c[d].type]) && f.prototype[h] && (e = !0);
            b[h] = e;
          });
        };
        a.prototype.linkSeries = function () {
          var b = this,
            a = b.series;
          a.forEach(function (b) {
            b.linkedSeries.length = 0;
          });
          a.forEach(function (a) {
            var c = a.options.linkedTo;
            R(c) &&
              (c = ":previous" === c ? b.series[a.index - 1] : b.get(c)) &&
              c.linkedParent !== a &&
              (c.linkedSeries.push(a),
              (a.linkedParent = c),
              c.enabledDataSorting && a.setDataSortingOptions(),
              (a.visible = W(a.options.visible, c.options.visible, a.visible)));
          });
          S(this, "afterLinkSeries");
        };
        a.prototype.renderSeries = function () {
          this.series.forEach(function (b) {
            b.translate();
            b.render();
          });
        };
        a.prototype.renderLabels = function () {
          var b = this,
            a = b.options.labels;
          a.items &&
            a.items.forEach(function (c) {
              var d = K(a.style, c.style),
                f = ba(d.left) + b.plotLeft,
                e = ba(d.top) + b.plotTop + 12;
              delete d.left;
              delete d.top;
              b.renderer.text(c.html, f, e).attr({ zIndex: 2 }).css(d).add();
            });
        };
        a.prototype.render = function () {
          var b = this.axes,
            a = this.colorAxis,
            c = this.renderer,
            d = this.options,
            f = function (b) {
              b.forEach(function (b) {
                b.visible && b.render();
              });
            },
            e = 0;
          this.setTitle();
          this.legend = new H(this, d.legend);
          this.getStacks && this.getStacks();
          this.getMargins(!0);
          this.setChartSize();
          d = this.plotWidth;
          b.some(function (b) {
            if (
              b.horiz &&
              b.visible &&
              b.options.labels.enabled &&
              b.series.length
            )
              return (e = 21), !0;
          });
          var h = (this.plotHeight = Math.max(this.plotHeight - e, 0));
          b.forEach(function (b) {
            b.setScale();
          });
          this.getAxisMargins();
          var g = 1.1 < d / this.plotWidth,
            k = 1.05 < h / this.plotHeight;
          if (g || k)
            b.forEach(function (b) {
              ((b.horiz && g) || (!b.horiz && k)) && b.setTickInterval(!0);
            }),
              this.getMargins();
          this.drawChartBox();
          this.hasCartesianSeries ? f(b) : a && a.length && f(a);
          this.seriesGroup ||
            (this.seriesGroup = c.g("series-group").attr({ zIndex: 3 }).add());
          this.renderSeries();
          this.renderLabels();
          this.addCredits();
          this.setResponsive && this.setResponsive();
          this.hasRendered = !0;
        };
        a.prototype.addCredits = function (b) {
          var a = this,
            c = V(!0, this.options.credits, b);
          c.enabled &&
            !this.credits &&
            ((this.credits = this.renderer
              .text(c.text + (this.mapCredits || ""), 0, 0)
              .addClass("highcharts-credits")
              .on("click", function () {
                c.href && (u.location.href = c.href);
              })
              .attr({ align: c.position.align, zIndex: 8 })),
            a.styledMode || this.credits.css(c.style),
            this.credits.add().align(c.position),
            (this.credits.update = function (b) {
              a.credits = a.credits.destroy();
              a.addCredits(b);
            }));
        };
        a.prototype.destroy = function () {
          var b = this,
            a = b.axes,
            c = b.series,
            d = b.container,
            f = d && d.parentNode,
            e;
          S(b, "destroy");
          b.renderer.forExport ? v(w, b) : (w[b.index] = void 0);
          B.chartCount--;
          b.renderTo.removeAttribute("data-highcharts-chart");
          ha(b);
          for (e = a.length; e--; ) a[e] = a[e].destroy();
          this.scroller && this.scroller.destroy && this.scroller.destroy();
          for (e = c.length; e--; ) c[e] = c[e].destroy();
          "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
            .split(" ")
            .forEach(function (a) {
              var c = b[a];
              c && c.destroy && (b[a] = c.destroy());
            });
          d && ((d.innerHTML = k.emptyHTML), ha(d), f && Y(d));
          Z(b, function (a, c) {
            delete b[c];
          });
        };
        a.prototype.firstRender = function () {
          var b = this,
            a = b.options;
          if (!b.isReadyToRender || b.isReadyToRender()) {
            b.getContainer();
            b.resetMargins();
            b.setChartSize();
            b.propFromSeries();
            b.getAxes();
            (P(a.series) ? a.series : []).forEach(function (a) {
              b.initSeries(a);
            });
            b.linkSeries();
            b.setSeriesData();
            S(b, "beforeRender");
            r &&
              (t.isRequired()
                ? (b.pointer = new t(b, a))
                : (b.pointer = new r(b, a)));
            b.render();
            b.pointer.getChartPosition();
            if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
            b.temporaryDisplay(!0);
          }
        };
        a.prototype.onload = function () {
          this.callbacks.concat([this.callback]).forEach(function (b) {
            b && "undefined" !== typeof this.index && b.apply(this, [this]);
          }, this);
          S(this, "load");
          S(this, "render");
          T(this.index) && this.setReflow(this.options.chart.reflow);
          this.warnIfA11yModuleNotLoaded();
          this.hasLoaded = !0;
        };
        a.prototype.warnIfA11yModuleNotLoaded = function () {
          var b = this.options,
            a = this.title;
          b &&
            !this.accessibility &&
            (this.renderer.boxWrapper.attr({
              role: "img",
              "aria-label": ((a && a.element.textContent) || "").replace(
                /</g,
                "&lt;",
              ),
            }),
            (b.accessibility && !1 === b.accessibility.enabled) ||
              U(
                'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
                !1,
                this,
              ));
        };
        a.prototype.addSeries = function (b, a, c) {
          var d = this,
            f;
          b &&
            ((a = W(a, !0)),
            S(d, "addSeries", { options: b }, function () {
              f = d.initSeries(b);
              d.isDirtyLegend = !0;
              d.linkSeries();
              f.enabledDataSorting && f.setData(b.data, !1);
              S(d, "afterAddSeries", { series: f });
              a && d.redraw(c);
            }));
          return f;
        };
        a.prototype.addAxis = function (b, a, c, d) {
          return this.createAxis(a ? "xAxis" : "yAxis", {
            axis: b,
            redraw: c,
            animation: d,
          });
        };
        a.prototype.addColorAxis = function (b, a, c) {
          return this.createAxis("colorAxis", {
            axis: b,
            redraw: a,
            animation: c,
          });
        };
        a.prototype.createAxis = function (b, a) {
          b = new g(
            this,
            V(a.axis, { index: this[b].length, isX: "xAxis" === b }),
          );
          W(a.redraw, !0) && this.redraw(a.animation);
          return b;
        };
        a.prototype.showLoading = function (b) {
          var a = this,
            c = a.options,
            d = c.loading,
            f = function () {
              e &&
                Q(e, {
                  left: a.plotLeft + "px",
                  top: a.plotTop + "px",
                  width: a.plotWidth + "px",
                  height: a.plotHeight + "px",
                });
            },
            e = a.loadingDiv,
            h = a.loadingSpan;
          e ||
            (a.loadingDiv = e =
              O(
                "div",
                { className: "highcharts-loading highcharts-loading-hidden" },
                null,
                a.container,
              ));
          h ||
            ((a.loadingSpan = h =
              O("span", { className: "highcharts-loading-inner" }, null, e)),
            q(a, "redraw", f));
          e.className = "highcharts-loading";
          k.setElementHTML(h, W(b, c.lang.loading, ""));
          a.styledMode ||
            (Q(e, K(d.style, { zIndex: 10 })),
            Q(h, d.labelStyle),
            a.loadingShown ||
              (Q(e, { opacity: 0, display: "" }),
              p(
                e,
                { opacity: d.style.opacity || 0.5 },
                { duration: d.showDuration || 0 },
              )));
          a.loadingShown = !0;
          f();
        };
        a.prototype.hideLoading = function () {
          var b = this.options,
            a = this.loadingDiv;
          a &&
            ((a.className = "highcharts-loading highcharts-loading-hidden"),
            this.styledMode ||
              p(
                a,
                { opacity: 0 },
                {
                  duration: b.loading.hideDuration || 100,
                  complete: function () {
                    Q(a, { display: "none" });
                  },
                },
              ));
          this.loadingShown = !1;
        };
        a.prototype.update = function (b, a, d, f) {
          var e = this,
            g = {
              credits: "addCredits",
              title: "setTitle",
              subtitle: "setSubtitle",
              caption: "setCaption",
            },
            k = b.isResponsiveOptions,
            n = [],
            m,
            q;
          S(e, "update", { options: b });
          k || e.setResponsive(!1, !0);
          b = J(b, e.options);
          e.userOptions = V(e.userOptions, b);
          var l = b.chart;
          if (l) {
            V(!0, e.options.chart, l);
            "className" in l && e.setClassName(l.className);
            "reflow" in l && e.setReflow(l.reflow);
            if ("inverted" in l || "polar" in l || "type" in l) {
              e.propFromSeries();
              var G = !0;
            }
            "alignTicks" in l && (G = !0);
            "events" in l && c(this, l);
            Z(l, function (b, a) {
              -1 !== e.propsRequireUpdateSeries.indexOf("chart." + a) &&
                (m = !0);
              -1 !== e.propsRequireDirtyBox.indexOf(a) && (e.isDirtyBox = !0);
              -1 !== e.propsRequireReflow.indexOf(a) &&
                (k ? (e.isDirtyBox = !0) : (q = !0));
            });
            !e.styledMode &&
              l.style &&
              e.renderer.setStyle(e.options.chart.style || {});
          }
          !e.styledMode && b.colors && (this.options.colors = b.colors);
          b.time &&
            (this.time === L && (this.time = new h(b.time)),
            V(!0, e.options.time, b.time));
          Z(b, function (a, c) {
            if (e[c] && "function" === typeof e[c].update) e[c].update(a, !1);
            else if ("function" === typeof e[g[c]]) e[g[c]](a);
            else
              "colors" !== c &&
                -1 === e.collectionsWithUpdate.indexOf(c) &&
                V(!0, e.options[c], b[c]);
            "chart" !== c &&
              -1 !== e.propsRequireUpdateSeries.indexOf(c) &&
              (m = !0);
          });
          this.collectionsWithUpdate.forEach(function (a) {
            if (b[a]) {
              var c = [];
              e[a].forEach(function (b, a) {
                b.options.isInternal || c.push(W(b.options.index, a));
              });
              ea(b[a]).forEach(function (b, f) {
                var h = T(b.id),
                  g;
                h && (g = e.get(b.id));
                !g &&
                  e[a] &&
                  (g = e[a][c ? c[f] : f]) &&
                  h &&
                  T(g.options.id) &&
                  (g = void 0);
                g && g.coll === a && (g.update(b, !1), d && (g.touched = !0));
                !g &&
                  d &&
                  e.collectionsWithInit[a] &&
                  (e.collectionsWithInit[a][0].apply(
                    e,
                    [b].concat(e.collectionsWithInit[a][1] || []).concat([!1]),
                  ).touched = !0);
              });
              d &&
                e[a].forEach(function (b) {
                  b.touched || b.options.isInternal
                    ? delete b.touched
                    : n.push(b);
                });
            }
          });
          n.forEach(function (b) {
            b.chart && b.remove && b.remove(!1);
          });
          G &&
            e.axes.forEach(function (b) {
              b.update({}, !1);
            });
          m &&
            e.getSeriesOrderByLinks().forEach(function (b) {
              b.chart && b.update({}, !1);
            }, this);
          G = l && l.width;
          l = l && (R(l.height) ? fa(l.height, G || e.chartWidth) : l.height);
          q || (M(G) && G !== e.chartWidth) || (M(l) && l !== e.chartHeight)
            ? e.setSize(G, l, f)
            : W(a, !0) && e.redraw(f);
          S(e, "afterUpdate", { options: b, redraw: a, animation: f });
        };
        a.prototype.setSubtitle = function (b, a) {
          this.applyDescription("subtitle", b);
          this.layOutTitles(a);
        };
        a.prototype.setCaption = function (b, a) {
          this.applyDescription("caption", b);
          this.layOutTitles(a);
        };
        a.prototype.showResetZoom = function () {
          function b() {
            a.zoomOut();
          }
          var a = this,
            c = E.lang,
            d = a.options.chart.zooming.resetButton,
            f = d.theme,
            e =
              "chart" === d.relativeTo || "spacingBox" === d.relativeTo
                ? null
                : "scrollablePlotBox";
          S(this, "beforeShowResetZoom", null, function () {
            a.resetZoomButton = a.renderer
              .button(c.resetZoom, null, null, b, f)
              .attr({ align: d.position.align, title: c.resetZoomTitle })
              .addClass("highcharts-reset-zoom")
              .add()
              .align(d.position, !1, e);
          });
          S(this, "afterShowResetZoom");
        };
        a.prototype.zoomOut = function () {
          S(this, "selection", { resetSelection: !0 }, this.zoom);
        };
        a.prototype.zoom = function (b) {
          var a = this,
            c = a.pointer,
            d = !1,
            f;
          !b || b.resetSelection
            ? (a.axes.forEach(function (b) {
                f = b.zoom();
              }),
              (c.initiated = !1))
            : b.xAxis.concat(b.yAxis).forEach(function (b) {
                var e = b.axis;
                if (
                  (c[e.isXAxis ? "zoomX" : "zoomY"] &&
                    T(c.mouseDownX) &&
                    T(c.mouseDownY) &&
                    a.isInsidePlot(
                      c.mouseDownX - a.plotLeft,
                      c.mouseDownY - a.plotTop,
                      { axis: e },
                    )) ||
                  !T(a.inverted ? c.mouseDownX : c.mouseDownY)
                )
                  (f = e.zoom(b.min, b.max)), e.displayBtn && (d = !0);
              });
          var e = a.resetZoomButton;
          d && !e
            ? a.showResetZoom()
            : !d && X(e) && (a.resetZoomButton = e.destroy());
          f &&
            a.redraw(
              W(
                a.options.chart.animation,
                b && b.animation,
                100 > a.pointCount,
              ),
            );
        };
        a.prototype.pan = function (b, a) {
          var c = this,
            d = c.hoverPoints;
          a = "object" === typeof a ? a : { enabled: a, type: "x" };
          var f = c.options.chart;
          f && f.panning && (f.panning = a);
          var e = a.type,
            h;
          S(this, "pan", { originalEvent: b }, function () {
            d &&
              d.forEach(function (b) {
                b.setState();
              });
            var a = c.xAxis;
            "xy" === e ? (a = a.concat(c.yAxis)) : "y" === e && (a = c.yAxis);
            var f = {};
            a.forEach(function (a) {
              if (a.options.panningEnabled && !a.options.isInternal) {
                var d = a.horiz,
                  g = b[d ? "chartX" : "chartY"];
                d = d ? "mouseDownX" : "mouseDownY";
                var k = c[d],
                  n = a.minPointOffset || 0,
                  m =
                    (a.reversed && !c.inverted) || (!a.reversed && c.inverted)
                      ? -1
                      : 1,
                  l = a.getExtremes(),
                  q = a.toValue(k - g, !0) + n * m,
                  G =
                    a.toValue(k + a.len - g, !0) -
                    (n * m || (a.isXAxis && a.pointRangePadding) || 0),
                  u = G < q;
                m = a.hasVerticalPanning();
                k = u ? G : q;
                q = u ? q : G;
                var p = a.panningState;
                !m ||
                  a.isXAxis ||
                  (p && !p.isDirty) ||
                  a.series.forEach(function (b) {
                    var a = b.getProcessedData(!0);
                    a = b.getExtremes(a.yData, !0);
                    p ||
                      (p = {
                        startMin: Number.MAX_VALUE,
                        startMax: -Number.MAX_VALUE,
                      });
                    M(a.dataMin) &&
                      M(a.dataMax) &&
                      ((p.startMin = Math.min(
                        W(b.options.threshold, Infinity),
                        a.dataMin,
                        p.startMin,
                      )),
                      (p.startMax = Math.max(
                        W(b.options.threshold, -Infinity),
                        a.dataMax,
                        p.startMax,
                      )));
                  });
                m = Math.min(
                  W(p && p.startMin, l.dataMin),
                  n ? l.min : a.toValue(a.toPixels(l.min) - a.minPixelPadding),
                );
                G = Math.max(
                  W(p && p.startMax, l.dataMax),
                  n ? l.max : a.toValue(a.toPixels(l.max) + a.minPixelPadding),
                );
                a.panningState = p;
                a.isOrdinal ||
                  ((n = m - k),
                  0 < n && ((q += n), (k = m)),
                  (n = q - G),
                  0 < n && ((q = G), (k -= n)),
                  a.series.length &&
                    k !== l.min &&
                    q !== l.max &&
                    k >= m &&
                    q <= G &&
                    (a.setExtremes(k, q, !1, !1, { trigger: "pan" }),
                    !c.resetZoomButton &&
                      k !== m &&
                      q !== G &&
                      e.match("y") &&
                      (c.showResetZoom(), (a.displayBtn = !1)),
                    (h = !0)),
                  (f[d] = g));
              }
            });
            Z(f, function (b, a) {
              c[a] = b;
            });
            h && c.redraw(!1);
            Q(c.container, { cursor: "move" });
          });
        };
        return a;
      })();
      K(a.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [a.prototype.addAxis, [!0]],
          yAxis: [a.prototype.addAxis, [!1]],
          series: [a.prototype.addSeries],
        },
        collectionsWithUpdate: ["xAxis", "yAxis", "series"],
        propsRequireDirtyBox:
          "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
            " ",
          ),
        propsRequireReflow:
          "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
            " ",
          ),
        propsRequireUpdateSeries:
          "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
            " ",
          ),
      });
      ("");
      return a;
    },
  );
  K(g, "Core/Legend/LegendSymbol.js", [g["Core/Utilities.js"]], function (a) {
    var g = a.extend,
      x = a.merge,
      F = a.pick,
      C;
    (function (a) {
      a.drawLineMarker = function (a) {
        var t = (this.legendItem = this.legendItem || {}),
          r = this.options,
          l = a.symbolWidth,
          e = a.symbolHeight,
          d = e / 2,
          h = this.chart.renderer,
          m = t.group;
        a = a.baseline - Math.round(0.3 * a.fontMetrics.b);
        var k = {},
          p = r.marker,
          D = 0;
        this.chart.styledMode ||
          ((k = { "stroke-width": Math.min(r.lineWidth || 0, 24) }),
          r.dashStyle
            ? (k.dashstyle = r.dashStyle)
            : "square" !== r.linecap && (k["stroke-linecap"] = "round"));
        t.line = h.path().addClass("highcharts-graph").attr(k).add(m);
        k["stroke-linecap"] && (D = Math.min(t.line.strokeWidth(), l) / 2);
        t.line.attr({
          d: [
            ["M", D, a],
            ["L", l - D, a],
          ],
        });
        p &&
          !1 !== p.enabled &&
          l &&
          ((r = Math.min(F(p.radius, d), d)),
          0 === this.symbol.indexOf("url") &&
            ((p = x(p, { width: e, height: e })), (r = 0)),
          (t.symbol = t =
            h
              .symbol(
                this.symbol,
                l / 2 - r,
                a - r,
                2 * r,
                2 * r,
                g({ context: "legend" }, p),
              )
              .addClass("highcharts-point")
              .add(m)),
          (t.isMarker = !0));
      };
      a.drawRectangle = function (a, g) {
        g = g.legendItem || {};
        var r = a.symbolHeight,
          l = a.options.squareSymbol;
        g.symbol = this.chart.renderer
          .rect(
            l ? (a.symbolWidth - r) / 2 : 0,
            a.baseline - r + 1,
            l ? r : a.symbolWidth,
            r,
            F(a.options.symbolRadius, r / 2),
          )
          .addClass("highcharts-point")
          .attr({ zIndex: 3 })
          .add(g.group);
      };
    })(C || (C = {}));
    return C;
  });
  K(g, "Core/Series/SeriesDefaults.js", [], function () {
    return {
      lineWidth: 2,
      allowPointSelect: !1,
      crisp: !0,
      showCheckbox: !1,
      animation: { duration: 1e3 },
      events: {},
      marker: {
        enabledThreshold: 2,
        lineColor: "#ffffff",
        lineWidth: 0,
        radius: 4,
        states: {
          normal: { animation: !0 },
          hover: {
            animation: { duration: 50 },
            enabled: !0,
            radiusPlus: 2,
            lineWidthPlus: 1,
          },
          select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 },
        },
      },
      point: { events: {} },
      dataLabels: {
        animation: {},
        align: "center",
        borderWidth: 0,
        defer: !0,
        formatter: function () {
          var a = this.series.chart.numberFormatter;
          return "number" !== typeof this.y ? "" : a(this.y, -1);
        },
        padding: 5,
        style: {
          fontSize: "11px",
          fontWeight: "bold",
          color: "contrast",
          textOutline: "1px contrast",
        },
        verticalAlign: "bottom",
        x: 0,
        y: 0,
      },
      cropThreshold: 300,
      opacity: 1,
      pointRange: 0,
      softThreshold: !0,
      states: {
        normal: { animation: !0 },
        hover: {
          animation: { duration: 50 },
          lineWidthPlus: 1,
          marker: {},
          halo: { size: 10, opacity: 0.25 },
        },
        select: { animation: { duration: 0 } },
        inactive: { animation: { duration: 50 }, opacity: 0.2 },
      },
      stickyTracking: !0,
      turboThreshold: 1e3,
      findNearestPointBy: "x",
    };
  });
  K(
    g,
    "Core/Series/Series.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Defaults.js"],
      g["Core/Foundation.js"],
      g["Core/Globals.js"],
      g["Core/Legend/LegendSymbol.js"],
      g["Core/Series/Point.js"],
      g["Core/Series/SeriesDefaults.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Renderer/SVG/SVGElement.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C, B, H, t, r, l) {
      var e = a.animObject,
        d = a.setAnimation,
        h = g.defaultOptions,
        m = x.registerEventOptions,
        k = F.hasTouch,
        p = F.svg,
        D = F.win,
        A = t.seriesTypes,
        E = l.arrayMax,
        L = l.arrayMin,
        y = l.clamp,
        c = l.cleanRecursively,
        w = l.correctFloat,
        f = l.defined,
        n = l.erase,
        b = l.error,
        u = l.extend,
        z = l.find,
        q = l.fireEvent,
        N = l.getNestedProperty,
        J = l.isArray,
        O = l.isNumber,
        Q = l.isString,
        T = l.merge,
        Y = l.objectEach,
        v = l.pick,
        U = l.removeEvent,
        K = l.splat,
        ca = l.syncTimeout;
      a = (function () {
        function a() {
          this.zones =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.tooltipOptions =
            this.processedYData =
            this.processedXData =
            this.points =
            this.options =
            this.linkedSeries =
            this.index =
            this.eventsToUnbind =
            this.eventOptions =
            this.data =
            this.chart =
            this._i =
              void 0;
        }
        a.prototype.init = function (b, a) {
          q(this, "init", { options: a });
          var c = this,
            d = b.series;
          this.eventsToUnbind = [];
          c.chart = b;
          c.options = c.setOptions(a);
          a = c.options;
          c.linkedSeries = [];
          c.bindAxes();
          u(c, {
            name: a.name,
            state: "",
            visible: !1 !== a.visible,
            selected: !0 === a.selected,
          });
          m(this, a);
          var f = a.events;
          if (
            (f && f.click) ||
            (a.point && a.point.events && a.point.events.click) ||
            a.allowPointSelect
          )
            b.runTrackerClick = !0;
          c.getColor();
          c.getSymbol();
          c.parallelArrays.forEach(function (b) {
            c[b + "Data"] || (c[b + "Data"] = []);
          });
          c.isCartesian && (b.hasCartesianSeries = !0);
          var e;
          d.length && (e = d[d.length - 1]);
          c._i = v(e && e._i, -1) + 1;
          c.opacity = c.options.opacity;
          b.orderSeries(this.insert(d));
          a.dataSorting && a.dataSorting.enabled
            ? c.setDataSortingOptions()
            : c.points || c.data || c.setData(a.data, !1);
          q(this, "afterInit");
        };
        a.prototype.is = function (b) {
          return A[b] && this instanceof A[b];
        };
        a.prototype.insert = function (b) {
          var a = this.options.index,
            c;
          if (O(a)) {
            for (c = b.length; c--; )
              if (a >= v(b[c].options.index, b[c]._i)) {
                b.splice(c + 1, 0, this);
                break;
              }
            -1 === c && b.unshift(this);
            c += 1;
          } else b.push(this);
          return v(c, b.length - 1);
        };
        a.prototype.bindAxes = function () {
          var a = this,
            c = a.options,
            d = a.chart,
            f;
          q(this, "bindAxes", null, function () {
            (a.axisTypes || []).forEach(function (e) {
              var h = 0;
              d[e].forEach(function (b) {
                f = b.options;
                if (
                  (c[e] === h && !f.isInternal) ||
                  ("undefined" !== typeof c[e] && c[e] === f.id) ||
                  ("undefined" === typeof c[e] && 0 === f.index)
                )
                  a.insert(b.series), (a[e] = b), (b.isDirty = !0);
                f.isInternal || h++;
              });
              a[e] || a.optionalAxis === e || b(18, !0, d);
            });
          });
          q(this, "afterBindAxes");
        };
        a.prototype.updateParallelArrays = function (b, a) {
          var c = b.series,
            d = arguments,
            f = O(a)
              ? function (d) {
                  var f = "y" === d && c.toYData ? c.toYData(b) : b[d];
                  c[d + "Data"][a] = f;
                }
              : function (b) {
                  Array.prototype[a].apply(
                    c[b + "Data"],
                    Array.prototype.slice.call(d, 2),
                  );
                };
          c.parallelArrays.forEach(f);
        };
        a.prototype.hasData = function () {
          return (
            (this.visible &&
              "undefined" !== typeof this.dataMax &&
              "undefined" !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        };
        a.prototype.autoIncrement = function (b) {
          var a = this.options,
            c = a.pointIntervalUnit,
            d = a.relativeXValue,
            f = this.chart.time,
            e = this.xIncrement,
            h;
          e = v(e, a.pointStart, 0);
          this.pointInterval = h = v(this.pointInterval, a.pointInterval, 1);
          d && O(b) && (h *= b);
          c &&
            ((a = new f.Date(e)),
            "day" === c
              ? f.set("Date", a, f.get("Date", a) + h)
              : "month" === c
                ? f.set("Month", a, f.get("Month", a) + h)
                : "year" === c &&
                  f.set("FullYear", a, f.get("FullYear", a) + h),
            (h = a.getTime() - e));
          if (d && O(b)) return e + h;
          this.xIncrement = e + h;
          return e;
        };
        a.prototype.setDataSortingOptions = function () {
          var b = this.options;
          u(this, {
            requireSorting: !1,
            sorted: !1,
            enabledDataSorting: !0,
            allowDG: !1,
          });
          f(b.pointRange) || (b.pointRange = 1);
        };
        a.prototype.setOptions = function (b) {
          var a = this.chart,
            c = a.options,
            d = c.plotOptions,
            e = a.userOptions || {};
          b = T(b);
          a = a.styledMode;
          var g = { plotOptions: d, userOptions: b };
          q(this, "setOptions", g);
          var k = g.plotOptions[this.type],
            n = e.plotOptions || {};
          this.userOptions = g.userOptions;
          e = T(k, d.series, e.plotOptions && e.plotOptions[this.type], b);
          this.tooltipOptions = T(
            h.tooltip,
            h.plotOptions.series && h.plotOptions.series.tooltip,
            h.plotOptions[this.type].tooltip,
            c.tooltip.userOptions,
            d.series && d.series.tooltip,
            d[this.type].tooltip,
            b.tooltip,
          );
          this.stickyTracking = v(
            b.stickyTracking,
            n[this.type] && n[this.type].stickyTracking,
            n.series && n.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : e.stickyTracking,
          );
          null === k.marker && delete e.marker;
          this.zoneAxis = e.zoneAxis;
          d = this.zones = (e.zones || []).slice();
          (!e.negativeColor && !e.negativeFillColor) ||
            e.zones ||
            ((c = {
              value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
              className: "highcharts-negative",
            }),
            a ||
              ((c.color = e.negativeColor),
              (c.fillColor = e.negativeFillColor)),
            d.push(c));
          d.length &&
            f(d[d.length - 1].value) &&
            d.push(a ? {} : { color: this.color, fillColor: this.fillColor });
          q(this, "afterSetOptions", { options: e });
          return e;
        };
        a.prototype.getName = function () {
          return v(this.options.name, "Series " + (this.index + 1));
        };
        a.prototype.getCyclic = function (b, a, c) {
          var d = this.chart,
            e = this.userOptions,
            h = b + "Index",
            g = b + "Counter",
            k = c ? c.length : v(d.options.chart[b + "Count"], d[b + "Count"]);
          if (!a) {
            var n = v(e[h], e["_" + h]);
            f(n) ||
              (d.series.length || (d[g] = 0),
              (e["_" + h] = n = d[g] % k),
              (d[g] += 1));
            c && (a = c[n]);
          }
          "undefined" !== typeof n && (this[h] = n);
          this[b] = a;
        };
        a.prototype.getColor = function () {
          this.chart.styledMode
            ? this.getCyclic("color")
            : this.options.colorByPoint
              ? (this.color = "#cccccc")
              : this.getCyclic(
                  "color",
                  this.options.color || h.plotOptions[this.type].color,
                  this.chart.options.colors,
                );
        };
        a.prototype.getPointsCollection = function () {
          return (this.hasGroupedData ? this.points : this.data) || [];
        };
        a.prototype.getSymbol = function () {
          this.getCyclic(
            "symbol",
            this.options.marker.symbol,
            this.chart.options.symbols,
          );
        };
        a.prototype.findPointIndex = function (b, a) {
          var c = b.id,
            d = b.x,
            f = this.points,
            e = this.options.dataSorting,
            h,
            g;
          if (c) (e = this.chart.get(c)), e instanceof B && (h = e);
          else if (
            this.linkedParent ||
            this.enabledDataSorting ||
            this.options.relativeXValue
          )
            if (
              ((h = function (a) {
                return !a.touched && a.index === b.index;
              }),
              e && e.matchByName
                ? (h = function (a) {
                    return !a.touched && a.name === b.name;
                  })
                : this.options.relativeXValue &&
                  (h = function (a) {
                    return !a.touched && a.options.x === b.x;
                  }),
              (h = z(f, h)),
              !h)
            )
              return;
          if (h) {
            var k = h && h.index;
            "undefined" !== typeof k && (g = !0);
          }
          "undefined" === typeof k && O(d) && (k = this.xData.indexOf(d, a));
          -1 !== k &&
            "undefined" !== typeof k &&
            this.cropped &&
            (k = k >= this.cropStart ? k - this.cropStart : k);
          !g && O(k) && f[k] && f[k].touched && (k = void 0);
          return k;
        };
        a.prototype.updateData = function (b, a) {
          var c = this.options,
            d = c.dataSorting,
            e = this.points,
            h = [],
            g = this.requireSorting,
            k = b.length === e.length,
            n,
            m,
            q,
            l = !0;
          this.xIncrement = null;
          b.forEach(function (b, a) {
            var m =
                (f(b) &&
                  this.pointClass.prototype.optionsToObject.call(
                    { series: this },
                    b,
                  )) ||
                {},
              l = m.x;
            if (m.id || O(l)) {
              if (
                ((m = this.findPointIndex(m, q)),
                -1 === m || "undefined" === typeof m
                  ? h.push(b)
                  : e[m] && b !== c.data[m]
                    ? (e[m].update(b, !1, null, !1),
                      (e[m].touched = !0),
                      g && (q = m + 1))
                    : e[m] && (e[m].touched = !0),
                !k || a !== m || (d && d.enabled) || this.hasDerivedData)
              )
                n = !0;
            } else h.push(b);
          }, this);
          if (n)
            for (b = e.length; b--; )
              (m = e[b]) && !m.touched && m.remove && m.remove(!1, a);
          else
            !k || (d && d.enabled)
              ? (l = !1)
              : (b.forEach(function (b, a) {
                  b !== e[a].y && e[a].update && e[a].update(b, !1, null, !1);
                }),
                (h.length = 0));
          e.forEach(function (b) {
            b && (b.touched = !1);
          });
          if (!l) return !1;
          h.forEach(function (b) {
            this.addPoint(b, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = E(this.xData)), this.autoIncrement());
          return !0;
        };
        a.prototype.setData = function (a, c, d, f) {
          void 0 === c && (c = !0);
          var e = this,
            h = e.points,
            g = (h && h.length) || 0,
            k = e.options,
            n = e.chart,
            m = k.dataSorting,
            l = e.xAxis,
            q = k.turboThreshold,
            u = this.xData,
            p = this.yData,
            G = e.pointArrayMap;
          G = G && G.length;
          var v = k.keys,
            w,
            r = 0,
            z = 1,
            y = null;
          if (!n.options.chart.allowMutatingData) {
            k.data && delete e.options.data;
            e.userOptions.data && delete e.userOptions.data;
            var M = T(!0, a);
          }
          a = M || a || [];
          M = a.length;
          m && m.enabled && (a = this.sortData(a));
          n.options.chart.allowMutatingData &&
            !1 !== f &&
            M &&
            g &&
            !e.cropped &&
            !e.hasGroupedData &&
            e.visible &&
            !e.boosted &&
            (w = this.updateData(a, d));
          if (!w) {
            e.xIncrement = null;
            e.colorCounter = 0;
            this.parallelArrays.forEach(function (b) {
              e[b + "Data"].length = 0;
            });
            if (q && M > q)
              if (((y = e.getFirstValidPoint(a)), O(y)))
                for (d = 0; d < M; d++)
                  (u[d] = this.autoIncrement()), (p[d] = a[d]);
              else if (J(y))
                if (G)
                  if (y.length === G)
                    for (d = 0; d < M; d++)
                      (u[d] = this.autoIncrement()), (p[d] = a[d]);
                  else
                    for (d = 0; d < M; d++)
                      (f = a[d]), (u[d] = f[0]), (p[d] = f.slice(1, G + 1));
                else if (
                  (v &&
                    ((r = v.indexOf("x")),
                    (z = v.indexOf("y")),
                    (r = 0 <= r ? r : 0),
                    (z = 0 <= z ? z : 1)),
                  1 === y.length && (z = 0),
                  r === z)
                )
                  for (d = 0; d < M; d++)
                    (u[d] = this.autoIncrement()), (p[d] = a[d][z]);
                else
                  for (d = 0; d < M; d++)
                    (f = a[d]), (u[d] = f[r]), (p[d] = f[z]);
              else b(12, !1, n);
            else
              for (d = 0; d < M; d++)
                "undefined" !== typeof a[d] &&
                  ((f = { series: e }),
                  e.pointClass.prototype.applyOptions.apply(f, [a[d]]),
                  e.updateParallelArrays(f, d));
            p && Q(p[0]) && b(14, !0, n);
            e.data = [];
            e.options.data = e.userOptions.data = a;
            for (d = g; d--; ) h[d] && h[d].destroy && h[d].destroy();
            l && (l.minRange = l.userMinRange);
            e.isDirty = n.isDirtyBox = !0;
            e.isDirtyData = !!h;
            d = !1;
          }
          "point" === k.legendType &&
            (this.processData(), this.generatePoints());
          c && n.redraw(d);
        };
        a.prototype.sortData = function (b) {
          var a = this,
            c = a.options.dataSorting.sortKey || "y",
            d = function (b, a) {
              return (
                (f(a) &&
                  b.pointClass.prototype.optionsToObject.call(
                    { series: b },
                    a,
                  )) ||
                {}
              );
            };
          b.forEach(function (c, e) {
            b[e] = d(a, c);
            b[e].index = e;
          }, this);
          b.concat()
            .sort(function (b, a) {
              b = N(c, b);
              a = N(c, a);
              return a < b ? -1 : a > b ? 1 : 0;
            })
            .forEach(function (b, a) {
              b.x = a;
            }, this);
          a.linkedSeries &&
            a.linkedSeries.forEach(function (a) {
              var c = a.options,
                e = c.data;
              (c.dataSorting && c.dataSorting.enabled) ||
                !e ||
                (e.forEach(function (c, f) {
                  e[f] = d(a, c);
                  b[f] && ((e[f].x = b[f].x), (e[f].index = f));
                }),
                a.setData(e, !1));
            });
          return b;
        };
        a.prototype.getProcessedData = function (a) {
          var c = this.xAxis,
            d = this.options,
            e = d.cropThreshold,
            f = a || this.getExtremesFromAll || d.getExtremesFromAll,
            h = this.isCartesian;
          a = c && c.val2lin;
          d = !(!c || !c.logarithmic);
          var g = 0,
            k = this.xData,
            n = this.yData,
            m = this.requireSorting;
          var l = !1;
          var q = k.length;
          if (c) {
            l = c.getExtremes();
            var u = l.min;
            var p = l.max;
            l = !(!c.categories || c.names.length);
          }
          if (h && this.sorted && !f && (!e || q > e || this.forceCrop))
            if (k[q - 1] < u || k[0] > p) (k = []), (n = []);
            else if (this.yData && (k[0] < u || k[q - 1] > p)) {
              var G = this.cropData(this.xData, this.yData, u, p);
              k = G.xData;
              n = G.yData;
              g = G.start;
              G = !0;
            }
          for (e = k.length || 1; --e; )
            if (
              ((c = d ? a(k[e]) - a(k[e - 1]) : k[e] - k[e - 1]),
              0 < c && ("undefined" === typeof v || c < v))
            )
              var v = c;
            else 0 > c && m && !l && (b(15, !1, this.chart), (m = !1));
          return {
            xData: k,
            yData: n,
            cropped: G,
            cropStart: g,
            closestPointRange: v,
          };
        };
        a.prototype.processData = function (b) {
          var a = this.xAxis;
          if (
            this.isCartesian &&
            !this.isDirty &&
            !a.isDirty &&
            !this.yAxis.isDirty &&
            !b
          )
            return !1;
          b = this.getProcessedData();
          this.cropped = b.cropped;
          this.cropStart = b.cropStart;
          this.processedXData = b.xData;
          this.processedYData = b.yData;
          this.closestPointRange = this.basePointRange = b.closestPointRange;
          q(this, "afterProcessData");
        };
        a.prototype.cropData = function (b, a, c, d, e) {
          var f = b.length,
            h,
            g = 0,
            k = f;
          e = v(e, this.cropShoulder);
          for (h = 0; h < f; h++)
            if (b[h] >= c) {
              g = Math.max(0, h - e);
              break;
            }
          for (c = h; c < f; c++)
            if (b[c] > d) {
              k = c + e;
              break;
            }
          return {
            xData: b.slice(g, k),
            yData: a.slice(g, k),
            start: g,
            end: k,
          };
        };
        a.prototype.generatePoints = function () {
          var b = this.options,
            a = this.processedData || b.data,
            c = this.processedXData,
            d = this.processedYData,
            e = this.pointClass,
            f = c.length,
            h = this.cropStart || 0,
            g = this.hasGroupedData,
            k = b.keys,
            n = [];
          b = b.dataGrouping && b.dataGrouping.groupAll ? h : 0;
          var m,
            l,
            p = this.data;
          if (!p && !g) {
            var v = [];
            v.length = a.length;
            p = this.data = v;
          }
          k && g && (this.options.keys = !1);
          for (l = 0; l < f; l++) {
            v = h + l;
            if (g) {
              var r = new e().init(this, [c[l]].concat(K(d[l])));
              r.dataGroup = this.groupMap[b + l];
              r.dataGroup.options &&
                ((r.options = r.dataGroup.options),
                u(r, r.dataGroup.options),
                delete r.dataLabels);
            } else
              (r = p[v]) ||
                "undefined" === typeof a[v] ||
                (p[v] = r = new e().init(this, a[v], c[l]));
            r && ((r.index = g ? b + l : v), (n[l] = r));
          }
          this.options.keys = k;
          if (p && (f !== (m = p.length) || g))
            for (l = 0; l < m; l++)
              l !== h || g || (l += f),
                p[l] && (p[l].destroyElements(), (p[l].plotX = void 0));
          this.data = p;
          this.points = n;
          q(this, "afterGeneratePoints");
        };
        a.prototype.getXExtremes = function (b) {
          return { min: L(b), max: E(b) };
        };
        a.prototype.getExtremes = function (b, a) {
          var c = this.xAxis,
            d = this.yAxis,
            e = this.processedXData || this.xData,
            f = [],
            h = this.requireSorting ? this.cropShoulder : 0;
          d = d ? d.positiveValuesOnly : !1;
          var g,
            k = 0,
            n = 0,
            m = 0;
          b = b || this.stackedYData || this.processedYData || [];
          var l = b.length;
          if (c) {
            var p = c.getExtremes();
            k = p.min;
            n = p.max;
          }
          for (g = 0; g < l; g++) {
            var u = e[g];
            p = b[g];
            var G = (O(p) || J(p)) && (p.length || 0 < p || !d);
            u =
              a ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !c ||
              ((e[g + h] || u) >= k && (e[g - h] || u) <= n);
            if (G && u)
              if ((G = p.length)) for (; G--; ) O(p[G]) && (f[m++] = p[G]);
              else f[m++] = p;
          }
          b = { activeYData: f, dataMin: L(f), dataMax: E(f) };
          q(this, "afterGetExtremes", { dataExtremes: b });
          return b;
        };
        a.prototype.applyExtremes = function () {
          var b = this.getExtremes();
          this.dataMin = b.dataMin;
          this.dataMax = b.dataMax;
          return b;
        };
        a.prototype.getFirstValidPoint = function (b) {
          for (var a = b.length, c = 0, d = null; null === d && c < a; )
            (d = b[c]), c++;
          return d;
        };
        a.prototype.translate = function () {
          this.processedXData || this.processData();
          this.generatePoints();
          var b = this.options,
            a = b.stacking,
            c = this.xAxis,
            d = c.categories,
            e = this.enabledDataSorting,
            h = this.yAxis,
            g = this.points,
            k = g.length,
            n = this.pointPlacementToXValue(),
            m = !!n,
            l = b.threshold,
            p = b.startFromThreshold ? l : 0,
            u = this.zoneAxis || "y",
            r,
            z,
            t = Number.MAX_VALUE;
          for (r = 0; r < k; r++) {
            var D = g[r],
              E = D.x,
              A = void 0,
              N = void 0,
              I = D.y,
              x = D.low,
              C =
                a &&
                h.stacking &&
                h.stacking.stacks[
                  (this.negStacks && I < (p ? 0 : l) ? "-" : "") + this.stackKey
                ];
            if (
              (h.positiveValuesOnly && !h.validatePositiveValue(I)) ||
              (c.positiveValuesOnly && !c.validatePositiveValue(E))
            )
              D.isNull = !0;
            D.plotX = z = w(
              y(
                c.translate(E, 0, 0, 0, 1, n, "flags" === this.type),
                -1e5,
                1e5,
              ),
            );
            if (a && this.visible && C && C[E]) {
              var L = this.getStackIndicator(L, E, this.index);
              !D.isNull && L.key && ((A = C[E]), (N = A.points[L.key]));
              A &&
                J(N) &&
                ((x = N[0]),
                (I = N[1]),
                x === p && L.key === C[E].base && (x = v(O(l) ? l : h.min)),
                h.positiveValuesOnly && f(x) && 0 >= x && (x = void 0),
                (D.total = D.stackTotal = v(A.total)),
                (D.percentage =
                  f(D.y) && A.total ? (D.y / A.total) * 100 : void 0),
                (D.stackY = I),
                this.irregularWidths ||
                  A.setOffset(
                    this.pointXOffset || 0,
                    this.barW || 0,
                    void 0,
                    void 0,
                    void 0,
                    this.xAxis,
                  ));
            }
            D.yBottom = f(x)
              ? y(h.translate(x, 0, 1, 0, 1), -1e5, 1e5)
              : void 0;
            this.dataModify && (I = this.dataModify.modifyValue(I, r));
            D.plotY = void 0;
            O(I) &&
              ((A = h.translate(I, !1, !0, !1, !0)),
              "undefined" !== typeof A && (D.plotY = y(A, -1e5, 1e5)));
            D.isInside = this.isPointInside(D);
            D.clientX = m ? w(c.translate(E, 0, 0, 0, 1, n)) : z;
            D.negative = D[u] < (b[u + "Threshold"] || l || 0);
            D.category = v(d && d[D.x], D.x);
            if (!D.isNull && !1 !== D.visible) {
              "undefined" !== typeof B && (t = Math.min(t, Math.abs(z - B)));
              var B = z;
            }
            D.zone = this.zones.length ? D.getZone() : void 0;
            !D.graphic && this.group && e && (D.isNew = !0);
          }
          this.closestPointRangePx = t;
          q(this, "afterTranslate");
        };
        a.prototype.getValidPoints = function (b, a, c) {
          var d = this.chart;
          return (b || this.points || []).filter(function (b) {
            return a &&
              !d.isInsidePlot(b.plotX, b.plotY, { inverted: d.inverted })
              ? !1
              : !1 !== b.visible && (c || !b.isNull);
          });
        };
        a.prototype.getClipBox = function () {
          var b = this.chart,
            a = this.xAxis,
            c = this.yAxis,
            d = T(b.clipBox);
          a && a.len !== b.plotSizeX && (d.width = a.len);
          c && c.len !== b.plotSizeY && (d.height = c.len);
          return d;
        };
        a.prototype.getSharedClipKey = function () {
          return (this.sharedClipKey =
            (this.options.xAxis || 0) + "," + (this.options.yAxis || 0));
        };
        a.prototype.setClip = function () {
          var b = this.chart,
            a = this.group,
            c = this.markerGroup,
            d = b.sharedClips;
          b = b.renderer;
          var e = this.getClipBox(),
            f = this.getSharedClipKey(),
            h = d[f];
          h ? h.animate(e) : (d[f] = h = b.clipRect(e));
          a && a.clip(!1 === this.options.clip ? void 0 : h);
          c && c.clip();
        };
        a.prototype.animate = function (b) {
          var a = this.chart,
            c = this.group,
            d = this.markerGroup,
            f = a.inverted,
            h = e(this.options.animation),
            g = [this.getSharedClipKey(), h.duration, h.easing, h.defer].join(),
            k = a.sharedClips[g],
            n = a.sharedClips[g + "m"];
          if (b && c)
            (h = this.getClipBox()),
              k
                ? k.attr("height", h.height)
                : ((h.width = 0),
                  f && (h.x = a.plotHeight),
                  (k = a.renderer.clipRect(h)),
                  (a.sharedClips[g] = k),
                  (n = a.renderer.clipRect({
                    x: -99,
                    y: -99,
                    width: f ? a.plotWidth + 199 : 99,
                    height: f ? 99 : a.plotHeight + 199,
                  })),
                  (a.sharedClips[g + "m"] = n)),
              c.clip(k),
              d && d.clip(n);
          else if (k && !k.hasClass("highcharts-animating")) {
            a = this.getClipBox();
            var m = h.step;
            d &&
              d.element.childNodes.length &&
              (h.step = function (b, a) {
                m && m.apply(a, arguments);
                "width" === a.prop &&
                  n &&
                  n.element &&
                  n.attr(f ? "height" : "width", b + 99);
              });
            k.addClass("highcharts-animating").animate(a, h);
          }
        };
        a.prototype.afterAnimate = function () {
          var b = this;
          this.setClip();
          Y(this.chart.sharedClips, function (a, c, d) {
            a &&
              !b.chart.container.querySelector(
                '[clip-path="url(#'.concat(a.id, ')"]'),
              ) &&
              (a.destroy(), delete d[c]);
          });
          this.finishedAnimating = !0;
          q(this, "afterAnimate");
        };
        a.prototype.drawPoints = function (b) {
          void 0 === b && (b = this.points);
          var a = this.chart,
            c = a.styledMode,
            d = this.colorAxis,
            e = this.options.marker,
            f = this[this.specialGroup || "markerGroup"],
            h = this.xAxis,
            g = v(
              e.enabled,
              !h || h.isRadial ? !0 : null,
              this.closestPointRangePx >= e.enabledThreshold * e.radius,
            ),
            k,
            n;
          if (!1 !== e.enabled || this._hasPointMarkers)
            for (k = 0; k < b.length; k++) {
              var m = b[k];
              var l = (n = m.graphic) ? "animate" : "attr";
              var q = m.marker || {};
              var p = !!m.marker;
              if (
                ((g && "undefined" === typeof q.enabled) || q.enabled) &&
                !m.isNull &&
                !1 !== m.visible
              ) {
                var u = v(q.symbol, this.symbol, "rect");
                var G = this.markerAttribs(m, m.selected && "select");
                this.enabledDataSorting &&
                  (m.startXPos = h.reversed ? -(G.width || 0) : h.width);
                var r = !1 !== m.isInside;
                !n &&
                  r &&
                  (0 < (G.width || 0) || m.hasImage) &&
                  ((m.graphic = n =
                    a.renderer
                      .symbol(u, G.x, G.y, G.width, G.height, p ? q : e)
                      .add(f)),
                  this.enabledDataSorting &&
                    a.hasRendered &&
                    (n.attr({ x: m.startXPos }), (l = "animate")));
                n && "animate" === l && n[r ? "show" : "hide"](r).animate(G);
                if (n)
                  if (
                    ((q = this.pointAttribs(
                      m,
                      c || !m.selected ? void 0 : "select",
                    )),
                    c)
                  )
                    d && n.css({ fill: q.fill });
                  else n[l](q);
                n && n.addClass(m.getClassName(), !0);
              } else n && (m.graphic = n.destroy());
            }
        };
        a.prototype.markerAttribs = function (b, a) {
          var c = this.options,
            d = c.marker,
            e = b.marker || {},
            f = e.symbol || d.symbol,
            h = {},
            g = v(e.radius, d && d.radius);
          a &&
            ((d = d.states[a]),
            (a = e.states && e.states[a]),
            (g = v(
              a && a.radius,
              d && d.radius,
              g && g + ((d && d.radiusPlus) || 0),
            )));
          b.hasImage = f && 0 === f.indexOf("url");
          b.hasImage && (g = 0);
          b = b.pos();
          O(g) &&
            b &&
            ((h.x = b[0] - g),
            (h.y = b[1] - g),
            c.crisp && (h.x = Math.floor(h.x)));
          g && (h.width = h.height = 2 * g);
          return h;
        };
        a.prototype.pointAttribs = function (b, a) {
          var c = this.options.marker,
            d = b && b.options,
            e = (d && d.marker) || {},
            f = d && d.color,
            h = b && b.color,
            g = b && b.zone && b.zone.color,
            k = this.color;
          b = v(e.lineWidth, c.lineWidth);
          d = 1;
          k = f || g || h || k;
          f = e.fillColor || c.fillColor || k;
          h = e.lineColor || c.lineColor || k;
          a = a || "normal";
          c = c.states[a] || {};
          a = (e.states && e.states[a]) || {};
          b = v(
            a.lineWidth,
            c.lineWidth,
            b + v(a.lineWidthPlus, c.lineWidthPlus, 0),
          );
          f = a.fillColor || c.fillColor || f;
          h = a.lineColor || c.lineColor || h;
          d = v(a.opacity, c.opacity, d);
          return { stroke: h, "stroke-width": b, fill: f, opacity: d };
        };
        a.prototype.destroy = function (b) {
          var a = this,
            c = a.chart,
            d = /AppleWebKit\/533/.test(D.navigator.userAgent),
            e = a.data || [],
            f,
            h,
            g,
            k;
          q(a, "destroy", { keepEventsForUpdate: b });
          this.removeEvents(b);
          (a.axisTypes || []).forEach(function (b) {
            (k = a[b]) &&
              k.series &&
              (n(k.series, a), (k.isDirty = k.forceRedraw = !0));
          });
          a.legendItem && a.chart.legend.destroyItem(a);
          for (h = e.length; h--; ) (g = e[h]) && g.destroy && g.destroy();
          a.clips &&
            a.clips.forEach(function (b) {
              return b.destroy();
            });
          l.clearTimeout(a.animationTimeout);
          Y(a, function (b, a) {
            b instanceof r &&
              !b.survive &&
              ((f = d && "group" === a ? "hide" : "destroy"), b[f]());
          });
          c.hoverSeries === a && (c.hoverSeries = void 0);
          n(c.series, a);
          c.orderSeries();
          Y(a, function (c, d) {
            (b && "hcEvents" === d) || delete a[d];
          });
        };
        a.prototype.applyZones = function () {
          var b = this,
            a = this.chart,
            c = a.renderer,
            d = this.zones,
            e = this.clips || [],
            f = this.graph,
            h = this.area,
            g = Math.max(a.plotWidth, a.plotHeight),
            k = this[(this.zoneAxis || "y") + "Axis"],
            n = a.inverted,
            m,
            l,
            q,
            p,
            u,
            r,
            z,
            w,
            t = !1;
          if (d.length && (f || h) && k && "undefined" !== typeof k.min) {
            var D = k.reversed;
            var E = k.horiz;
            f && !this.showLine && f.hide();
            h && h.hide();
            var A = k.getExtremes();
            d.forEach(function (d, G) {
              m = D ? (E ? a.plotWidth : 0) : E ? 0 : k.toPixels(A.min) || 0;
              m = y(v(l, m), 0, g);
              l = y(Math.round(k.toPixels(v(d.value, A.max), !0) || 0), 0, g);
              t && (m = l = k.toPixels(A.max));
              p = Math.abs(m - l);
              u = Math.min(m, l);
              r = Math.max(m, l);
              k.isXAxis
                ? ((q = { x: n ? r : u, y: 0, width: p, height: g }),
                  E || (q.x = a.plotHeight - q.x))
                : ((q = { x: 0, y: n ? r : u, width: g, height: p }),
                  E && (q.y = a.plotWidth - q.y));
              n &&
                c.isVML &&
                (q = k.isXAxis
                  ? { x: 0, y: D ? u : r, height: q.width, width: a.chartWidth }
                  : {
                      x: q.y - a.plotLeft - a.spacingBox.x,
                      y: 0,
                      width: q.height,
                      height: a.chartHeight,
                    });
              e[G] ? e[G].animate(q) : (e[G] = c.clipRect(q));
              z = b["zone-area-" + G];
              w = b["zone-graph-" + G];
              f && w && w.clip(e[G]);
              h && z && z.clip(e[G]);
              t = d.value > A.max;
              b.resetZones && 0 === l && (l = void 0);
            });
            this.clips = e;
          } else b.visible && (f && f.show(), h && h.show());
        };
        a.prototype.plotGroup = function (b, a, c, d, e) {
          var h = this[b],
            g = !h;
          c = { visibility: c, zIndex: d || 0.1 };
          "undefined" === typeof this.opacity ||
            this.chart.styledMode ||
            "inactive" === this.state ||
            (c.opacity = this.opacity);
          g && (this[b] = h = this.chart.renderer.g().add(e));
          h.addClass(
            "highcharts-" +
              a +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series " +
              (f(this.colorIndex)
                ? "highcharts-color-" + this.colorIndex + " "
                : "") +
              (this.options.className || "") +
              (h.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
            !0,
          );
          h.attr(c)[g ? "attr" : "animate"](this.getPlotBox(a));
          return h;
        };
        a.prototype.getPlotBox = function (b) {
          var a = this.xAxis,
            c = this.yAxis,
            d = this.chart;
          b =
            d.inverted &&
            !d.polar &&
            a &&
            !1 !== this.invertible &&
            "series" === b;
          d.inverted && ((a = c), (c = this.xAxis));
          return {
            translateX: a ? a.left : d.plotLeft,
            translateY: c ? c.top : d.plotTop,
            rotation: b ? 90 : 0,
            rotationOriginX: b ? (a.len - c.len) / 2 : 0,
            rotationOriginY: b ? (a.len + c.len) / 2 : 0,
            scaleX: b ? -1 : 1,
            scaleY: 1,
          };
        };
        a.prototype.removeEvents = function (b) {
          b || U(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (b) {
              b();
            }),
            (this.eventsToUnbind.length = 0));
        };
        a.prototype.render = function () {
          var b = this,
            a = b.chart,
            c = b.options,
            d = e(c.animation),
            f = b.visible ? "inherit" : "hidden",
            h = c.zIndex,
            g = b.hasRendered,
            k = a.seriesGroup;
          a = !b.finishedAnimating && a.renderer.isSVG ? d.duration : 0;
          q(this, "render");
          b.plotGroup("group", "series", f, h, k);
          b.markerGroup = b.plotGroup("markerGroup", "markers", f, h, k);
          !1 !== c.clip && b.setClip();
          b.animate && a && b.animate(!0);
          b.drawGraph && (b.drawGraph(), b.applyZones());
          b.visible && b.drawPoints();
          b.drawDataLabels && b.drawDataLabels();
          b.redrawPoints && b.redrawPoints();
          b.drawTracker &&
            !1 !== b.options.enableMouseTracking &&
            b.drawTracker();
          b.animate && a && b.animate();
          g ||
            (a && d.defer && (a += d.defer),
            (b.animationTimeout = ca(function () {
              b.afterAnimate();
            }, a || 0)));
          b.isDirty = !1;
          b.hasRendered = !0;
          q(b, "afterRender");
        };
        a.prototype.redraw = function () {
          var b = this.isDirty || this.isDirtyData;
          this.translate();
          this.render();
          b && delete this.kdTree;
        };
        a.prototype.searchPoint = function (b, a) {
          var c = this.xAxis,
            d = this.yAxis,
            e = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: e ? c.len - b.chartY + c.pos : b.chartX - c.pos,
              plotY: e ? d.len - b.chartX + d.pos : b.chartY - d.pos,
            },
            a,
            b,
          );
        };
        a.prototype.buildKDTree = function (b) {
          function a(b, d, e) {
            var f = b && b.length;
            if (f) {
              var h = c.kdAxisArray[d % e];
              b.sort(function (b, a) {
                return b[h] - a[h];
              });
              f = Math.floor(f / 2);
              return {
                point: b[f],
                left: a(b.slice(0, f), d + 1, e),
                right: a(b.slice(f + 1), d + 1, e),
              };
            }
          }
          this.buildingKdTree = !0;
          var c = this,
            d = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete c.kdTree;
          ca(
            function () {
              c.kdTree = a(c.getValidPoints(null, !c.directTouch), d, d);
              c.buildingKdTree = !1;
            },
            c.options.kdNow || (b && "touchstart" === b.type) ? 0 : 1,
          );
        };
        a.prototype.searchKDTree = function (b, a, c) {
          function d(b, a, c, n) {
            var m = a.point,
              l = e.kdAxisArray[c % n],
              q = m,
              p = f(b[h]) && f(m[h]) ? Math.pow(b[h] - m[h], 2) : null;
            var u = f(b[g]) && f(m[g]) ? Math.pow(b[g] - m[g], 2) : null;
            u = (p || 0) + (u || 0);
            m.dist = f(u) ? Math.sqrt(u) : Number.MAX_VALUE;
            m.distX = f(p) ? Math.sqrt(p) : Number.MAX_VALUE;
            l = b[l] - m[l];
            u = 0 > l ? "left" : "right";
            p = 0 > l ? "right" : "left";
            a[u] && ((u = d(b, a[u], c + 1, n)), (q = u[k] < q[k] ? u : m));
            a[p] &&
              Math.sqrt(l * l) < q[k] &&
              ((b = d(b, a[p], c + 1, n)), (q = b[k] < q[k] ? b : q));
            return q;
          }
          var e = this,
            h = this.kdAxisArray[0],
            g = this.kdAxisArray[1],
            k = a ? "distX" : "dist";
          a = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(c);
          if (this.kdTree) return d(b, this.kdTree, a, a);
        };
        a.prototype.pointPlacementToXValue = function () {
          var b = this.options,
            a = b.pointRange,
            c = this.xAxis;
          b = b.pointPlacement;
          "between" === b && (b = c.reversed ? -0.5 : 0.5);
          return O(b) ? b * (a || c.pointRange) : 0;
        };
        a.prototype.isPointInside = function (b) {
          var a = this.chart,
            c = this.xAxis,
            d = this.yAxis;
          return (
            "undefined" !== typeof b.plotY &&
            "undefined" !== typeof b.plotX &&
            0 <= b.plotY &&
            b.plotY <= (d ? d.len : a.plotHeight) &&
            0 <= b.plotX &&
            b.plotX <= (c ? c.len : a.plotWidth)
          );
        };
        a.prototype.drawTracker = function () {
          var b = this,
            a = b.options,
            c = a.trackByArea,
            d = [].concat(c ? b.areaPath : b.graphPath),
            e = b.chart,
            f = e.pointer,
            h = e.renderer,
            g = e.options.tooltip.snap,
            n = b.tracker,
            m = function (a) {
              if (e.hoverSeries !== b) b.onMouseOver();
            },
            l = "rgba(192,192,192," + (p ? 0.0001 : 0.002) + ")";
          n
            ? n.attr({ d: d })
            : b.graph &&
              ((b.tracker = h
                .path(d)
                .attr({
                  visibility: b.visible ? "inherit" : "hidden",
                  zIndex: 2,
                })
                .addClass(
                  c ? "highcharts-tracker-area" : "highcharts-tracker-line",
                )
                .add(b.group)),
              e.styledMode ||
                b.tracker.attr({
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  stroke: l,
                  fill: c ? l : "none",
                  "stroke-width": b.graph.strokeWidth() + (c ? 0 : 2 * g),
                }),
              [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(
                function (b) {
                  if (
                    b &&
                    (b
                      .addClass("highcharts-tracker")
                      .on("mouseover", m)
                      .on("mouseout", function (b) {
                        f.onTrackerMouseOut(b);
                      }),
                    a.cursor && !e.styledMode && b.css({ cursor: a.cursor }),
                    k)
                  )
                    b.on("touchstart", m);
                },
              ));
          q(this, "afterDrawTracker");
        };
        a.prototype.addPoint = function (b, a, c, d, e) {
          var f = this.options,
            h = this.data,
            g = this.chart,
            k = this.xAxis;
          k = k && k.hasNames && k.names;
          var n = f.data,
            m = this.xData,
            l;
          a = v(a, !0);
          var p = { series: this };
          this.pointClass.prototype.applyOptions.apply(p, [b]);
          var u = p.x;
          var r = m.length;
          if (this.requireSorting && u < m[r - 1])
            for (l = !0; r && m[r - 1] > u; ) r--;
          this.updateParallelArrays(p, "splice", r, 0, 0);
          this.updateParallelArrays(p, r);
          k && p.name && (k[u] = p.name);
          n.splice(r, 0, b);
          if (l || this.processedData)
            this.data.splice(r, 0, null), this.processData();
          "point" === f.legendType && this.generatePoints();
          c &&
            (h[0] && h[0].remove
              ? h[0].remove(!1)
              : (h.shift(), this.updateParallelArrays(p, "shift"), n.shift()));
          !1 !== e && q(this, "addPoint", { point: p });
          this.isDirtyData = this.isDirty = !0;
          a && g.redraw(d);
        };
        a.prototype.removePoint = function (b, a, c) {
          var e = this,
            f = e.data,
            h = f[b],
            g = e.points,
            k = e.chart,
            n = function () {
              g && g.length === f.length && g.splice(b, 1);
              f.splice(b, 1);
              e.options.data.splice(b, 1);
              e.updateParallelArrays(h || { series: e }, "splice", b, 1);
              h && h.destroy();
              e.isDirty = !0;
              e.isDirtyData = !0;
              a && k.redraw();
            };
          d(c, k);
          a = v(a, !0);
          h ? h.firePointEvent("remove", null, n) : n();
        };
        a.prototype.remove = function (b, a, c, d) {
          function e() {
            f.destroy(d);
            h.isDirtyLegend = h.isDirtyBox = !0;
            h.linkSeries();
            v(b, !0) && h.redraw(a);
          }
          var f = this,
            h = f.chart;
          !1 !== c ? q(f, "remove", null, e) : e();
        };
        a.prototype.update = function (a, d) {
          a = c(a, this.userOptions);
          q(this, "update", { options: a });
          var e = this,
            f = e.chart,
            h = e.userOptions,
            g = e.initialType || e.type,
            k = f.options.plotOptions,
            n = A[g].prototype,
            m = e.finishedAnimating && { animation: !1 },
            l = {},
            p = ["eventOptions", "navigatorSeries", "baseSeries"],
            r = a.type || h.type || f.options.chart.type,
            z = !(
              this.hasDerivedData ||
              (r && r !== this.type) ||
              "undefined" !== typeof a.pointStart ||
              "undefined" !== typeof a.pointInterval ||
              "undefined" !== typeof a.relativeXValue ||
              a.joinBy ||
              a.mapData ||
              e.hasOptionChanged("dataGrouping") ||
              e.hasOptionChanged("pointStart") ||
              e.hasOptionChanged("pointInterval") ||
              e.hasOptionChanged("pointIntervalUnit") ||
              e.hasOptionChanged("keys")
            );
          r = r || g;
          z &&
            (p.push(
              "data",
              "isDirtyData",
              "points",
              "processedData",
              "processedXData",
              "processedYData",
              "xIncrement",
              "cropped",
              "_hasPointMarkers",
              "_hasPointLabels",
              "clips",
              "nodes",
              "layout",
              "level",
              "mapMap",
              "mapData",
              "minY",
              "maxY",
              "minX",
              "maxX",
            ),
            !1 !== a.visible && p.push("area", "graph"),
            e.parallelArrays.forEach(function (b) {
              p.push(b + "Data");
            }),
            a.data &&
              (a.dataSorting && u(e.options.dataSorting, a.dataSorting),
              this.setData(a.data, !1)));
          a = T(
            h,
            m,
            {
              index: "undefined" === typeof h.index ? e.index : h.index,
              pointStart: v(
                k && k.series && k.series.pointStart,
                h.pointStart,
                e.xData[0],
              ),
            },
            !z && { data: e.options.data },
            a,
          );
          z && a.data && (a.data = e.options.data);
          p = [
            "group",
            "markerGroup",
            "dataLabelsGroup",
            "transformGroup",
            "shadowGroup",
          ].concat(p);
          p.forEach(function (b) {
            p[b] = e[b];
            delete e[b];
          });
          k = !1;
          if (A[r]) {
            if (((k = r !== e.type), e.remove(!1, !1, !1, !0), k))
              if (Object.setPrototypeOf)
                Object.setPrototypeOf(e, A[r].prototype);
              else {
                m = Object.hasOwnProperty.call(e, "hcEvents") && e.hcEvents;
                for (w in n) e[w] = void 0;
                u(e, A[r].prototype);
                m ? (e.hcEvents = m) : delete e.hcEvents;
              }
          } else b(17, !0, f, { missingModuleFor: r });
          p.forEach(function (b) {
            e[b] = p[b];
          });
          e.init(f, a);
          if (z && this.points) {
            a = e.options;
            if (!1 === a.visible) (l.graphic = 1), (l.dataLabel = 1);
            else if (!e._hasPointLabels) {
              n = a.marker;
              var w = a.dataLabels;
              h = h.marker || {};
              !n ||
                (!1 !== n.enabled &&
                  h.symbol === n.symbol &&
                  h.height === n.height &&
                  h.width === n.width) ||
                (l.graphic = 1);
              w && !1 === w.enabled && (l.dataLabel = 1);
            }
            h = 0;
            for (n = this.points; h < n.length; h++)
              (w = n[h]) &&
                w.series &&
                (w.resolveColor(),
                Object.keys(l).length && w.destroyElements(l),
                !1 === a.showInLegend &&
                  w.legendItem &&
                  f.legend.destroyItem(w));
          }
          e.initialType = g;
          f.linkSeries();
          k && e.linkedSeries.length && (e.isDirtyData = !0);
          q(this, "afterUpdate");
          v(d, !0) && f.redraw(z ? void 0 : !1);
        };
        a.prototype.setName = function (b) {
          this.name = this.options.name = this.userOptions.name = b;
          this.chart.isDirtyLegend = !0;
        };
        a.prototype.hasOptionChanged = function (b) {
          var a = this.options[b],
            c = this.chart.options.plotOptions,
            d = this.userOptions[b];
          return d
            ? a !== d
            : a !==
                v(
                  c && c[this.type] && c[this.type][b],
                  c && c.series && c.series[b],
                  a,
                );
        };
        a.prototype.onMouseOver = function () {
          var b = this.chart,
            a = b.hoverSeries;
          b.pointer.setHoverChartIndex();
          if (a && a !== this) a.onMouseOut();
          this.options.events.mouseOver && q(this, "mouseOver");
          this.setState("hover");
          b.hoverSeries = this;
        };
        a.prototype.onMouseOut = function () {
          var b = this.options,
            a = this.chart,
            c = a.tooltip,
            d = a.hoverPoint;
          a.hoverSeries = null;
          if (d) d.onMouseOut();
          this && b.events.mouseOut && q(this, "mouseOut");
          !c ||
            this.stickyTracking ||
            (c.shared && !this.noSharedTooltip) ||
            c.hide();
          a.series.forEach(function (b) {
            b.setState("", !0);
          });
        };
        a.prototype.setState = function (b, a) {
          var c = this,
            d = c.options,
            e = c.graph,
            f = d.inactiveOtherPoints,
            h = d.states,
            g = v(
              h[b || "normal"] && h[b || "normal"].animation,
              c.chart.options.chart.animation,
            ),
            k = d.lineWidth,
            n = 0,
            m = d.opacity;
          b = b || "";
          if (
            c.state !== b &&
            ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function (a) {
              a &&
                (c.state && a.removeClass("highcharts-series-" + c.state),
                b && a.addClass("highcharts-series-" + b));
            }),
            (c.state = b),
            !c.chart.styledMode)
          ) {
            if (h[b] && !1 === h[b].enabled) return;
            b &&
              ((k = h[b].lineWidth || k + (h[b].lineWidthPlus || 0)),
              (m = v(h[b].opacity, m)));
            if (e && !e.dashstyle && O(k))
              for (
                d = { "stroke-width": k }, e.animate(d, g);
                c["zone-graph-" + n];

              )
                c["zone-graph-" + n].animate(d, g), (n += 1);
            f ||
              [
                c.group,
                c.markerGroup,
                c.dataLabelsGroup,
                c.labelBySeries,
              ].forEach(function (b) {
                b && b.animate({ opacity: m }, g);
              });
          }
          a && f && c.points && c.setAllPointsToState(b || void 0);
        };
        a.prototype.setAllPointsToState = function (b) {
          this.points.forEach(function (a) {
            a.setState && a.setState(b);
          });
        };
        a.prototype.setVisible = function (b, a) {
          var c = this,
            d = c.chart,
            e = d.options.chart.ignoreHiddenSeries,
            f = c.visible,
            h = (c.visible =
              b =
              c.options.visible =
              c.userOptions.visible =
                "undefined" === typeof b ? !f : b)
              ? "show"
              : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(
            function (b) {
              if (c[b]) c[b][h]();
            },
          );
          if (
            d.hoverSeries === c ||
            (d.hoverPoint && d.hoverPoint.series) === c
          )
            c.onMouseOut();
          c.legendItem && d.legend.colorizeItem(c, b);
          c.isDirty = !0;
          c.options.stacking &&
            d.series.forEach(function (b) {
              b.options.stacking && b.visible && (b.isDirty = !0);
            });
          c.linkedSeries.forEach(function (a) {
            a.setVisible(b, !1);
          });
          e && (d.isDirtyBox = !0);
          q(c, h);
          !1 !== a && d.redraw();
        };
        a.prototype.show = function () {
          this.setVisible(!0);
        };
        a.prototype.hide = function () {
          this.setVisible(!1);
        };
        a.prototype.select = function (b) {
          this.selected =
            b =
            this.options.selected =
              "undefined" === typeof b ? !this.selected : b;
          this.checkbox && (this.checkbox.checked = b);
          q(this, b ? "select" : "unselect");
        };
        a.prototype.shouldShowTooltip = function (b, a, c) {
          void 0 === c && (c = {});
          c.series = this;
          c.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(b, a, c);
        };
        a.defaultOptions = H;
        a.types = t.seriesTypes;
        a.registerType = t.registerSeriesType;
        return a;
      })();
      u(a.prototype, {
        axisTypes: ["xAxis", "yAxis"],
        coll: "series",
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        drawLegendSymbol: C.drawLineMarker,
        isCartesian: !0,
        kdAxisArray: ["clientX", "plotY"],
        parallelArrays: ["x", "y"],
        pointClass: B,
        requireSorting: !0,
        sorted: !0,
      });
      t.series = a;
      ("");
      ("");
      return a;
    },
  );
  K(
    g,
    "Extensions/ScrollablePlotArea.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Axis/Axis.js"],
      g["Core/Chart/Chart.js"],
      g["Core/Series/Series.js"],
      g["Core/Renderer/RendererRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C, B) {
      var A = a.stop,
        t = B.addEvent,
        r = B.createElement,
        l = B.defined,
        e = B.merge,
        d = B.pick;
      t(x, "afterSetChartSize", function (a) {
        var d = this.options.chart.scrollablePlotArea,
          h = d && d.minWidth;
        d = d && d.minHeight;
        if (!this.renderer.forExport) {
          if (h) {
            if (
              (this.scrollablePixelsX = h = Math.max(0, h - this.chartWidth))
            ) {
              this.scrollablePlotBox = this.renderer.scrollablePlotBox = e(
                this.plotBox,
              );
              this.plotBox.width = this.plotWidth += h;
              this.inverted
                ? (this.clipBox.height += h)
                : (this.clipBox.width += h);
              var p = { 1: { name: "right", value: h } };
            }
          } else
            d &&
              ((this.scrollablePixelsY = h = Math.max(0, d - this.chartHeight)),
              l(h) &&
                ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                  e(this.plotBox)),
                (this.plotBox.height = this.plotHeight += h),
                this.inverted
                  ? (this.clipBox.width += h)
                  : (this.clipBox.height += h),
                (p = { 2: { name: "bottom", value: h } })));
          p &&
            !a.skipAxes &&
            this.axes.forEach(function (a) {
              p[a.side]
                ? (a.getPlotLinePath = function () {
                    var d = p[a.side].name,
                      e = this[d];
                    this[d] = e - p[a.side].value;
                    var h = g.prototype.getPlotLinePath.apply(this, arguments);
                    this[d] = e;
                    return h;
                  })
                : (a.setAxisSize(), a.setAxisTranslation());
            });
        }
      });
      t(x, "render", function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      x.prototype.setUpScrolling = function () {
        var a = this,
          d = {
            WebkitOverflowScrolling: "touch",
            overflowX: "hidden",
            overflowY: "hidden",
          };
        this.scrollablePixelsX && (d.overflowX = "auto");
        this.scrollablePixelsY && (d.overflowY = "auto");
        this.scrollingParent = r(
          "div",
          { className: "highcharts-scrolling-parent" },
          { position: "relative" },
          this.renderTo,
        );
        this.scrollingContainer = r(
          "div",
          { className: "highcharts-scrolling" },
          d,
          this.scrollingParent,
        );
        var e;
        t(this.scrollingContainer, "scroll", function () {
          a.pointer &&
            (delete a.pointer.chartPosition,
            a.hoverPoint && (e = a.hoverPoint),
            a.pointer.runPointActions(void 0, e, !0));
        });
        this.innerContainer = r(
          "div",
          { className: "highcharts-inner-container" },
          null,
          this.scrollingContainer,
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      x.prototype.moveFixedElements = function () {
        var a = this.container,
          d = this.fixedRenderer,
          e =
            ".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
              " ",
            ),
          g;
        this.scrollablePixelsX && !this.inverted
          ? (g = ".highcharts-yaxis")
          : this.scrollablePixelsX && this.inverted
            ? (g = ".highcharts-xaxis")
            : this.scrollablePixelsY && !this.inverted
              ? (g = ".highcharts-xaxis")
              : this.scrollablePixelsY &&
                this.inverted &&
                (g = ".highcharts-yaxis");
        g &&
          e.push(
            "" + g + ":not(.highcharts-radial-axis)",
            "" + g + "-labels:not(.highcharts-radial-axis-labels)",
          );
        e.forEach(function (e) {
          [].forEach.call(a.querySelectorAll(e), function (a) {
            (a.namespaceURI === d.SVG_NS
              ? d.box
              : d.box.parentNode
            ).appendChild(a);
            a.style.pointerEvents = "auto";
          });
        });
      };
      x.prototype.applyFixed = function () {
        var a = !this.fixedDiv,
          e = this.options.chart,
          g = e.scrollablePlotArea,
          l = C.getRendererType();
        a
          ? ((this.fixedDiv = r(
              "div",
              { className: "highcharts-fixed" },
              {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((e.style && e.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0,
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer,
              ),
            (this.renderTo.style.overflow = "visible"),
            (this.fixedRenderer = e =
              new l(
                this.fixedDiv,
                this.chartWidth,
                this.chartHeight,
                this.options.chart.style,
              )),
            (this.scrollableMask = e
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": d(g.opacity, 0.85),
                zIndex: -1,
              })
              .addClass("highcharts-scrollable-mask")
              .add()),
            t(this, "afterShowResetZoom", this.moveFixedElements),
            t(this, "afterApplyDrilldown", this.moveFixedElements),
            t(this, "afterLayOutTitles", this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || a)
          (this.scrollableDirty = !1), this.moveFixedElements();
        e = this.chartWidth + (this.scrollablePixelsX || 0);
        l = this.chartHeight + (this.scrollablePixelsY || 0);
        A(this.container);
        this.container.style.width = e + "px";
        this.container.style.height = l + "px";
        this.renderer.boxWrapper.attr({
          width: e,
          height: l,
          viewBox: [0, 0, e, l].join(" "),
        });
        this.chartBackground.attr({ width: e, height: l });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        a &&
          (g.scrollPositionX &&
            (this.scrollingContainer.scrollLeft =
              this.scrollablePixelsX * g.scrollPositionX),
          g.scrollPositionY &&
            (this.scrollingContainer.scrollTop =
              this.scrollablePixelsY * g.scrollPositionY));
        l = this.axisOffset;
        a = this.plotTop - l[0] - 1;
        g = this.plotLeft - l[3] - 1;
        e = this.plotTop + this.plotHeight + l[2] + 1;
        l = this.plotLeft + this.plotWidth + l[1] + 1;
        var D = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          x = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        a = this.scrollablePixelsX
          ? [
              ["M", 0, a],
              ["L", this.plotLeft - 1, a],
              ["L", this.plotLeft - 1, e],
              ["L", 0, e],
              ["Z"],
              ["M", D, a],
              ["L", this.chartWidth, a],
              ["L", this.chartWidth, e],
              ["L", D, e],
              ["Z"],
            ]
          : this.scrollablePixelsY
            ? [
                ["M", g, 0],
                ["L", g, this.plotTop - 1],
                ["L", l, this.plotTop - 1],
                ["L", l, 0],
                ["Z"],
                ["M", g, x],
                ["L", g, this.chartHeight],
                ["L", l, this.chartHeight],
                ["L", l, x],
                ["Z"],
              ]
            : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger &&
          this.scrollableMask.attr({ d: a });
      };
      t(g, "afterInit", function () {
        this.chart.scrollableDirty = !0;
      });
      t(F, "show", function () {
        this.chart.scrollableDirty = !0;
      });
      ("");
    },
  );
  K(
    g,
    "Core/Axis/Stacking/StackItem.js",
    [
      g["Core/FormatUtilities.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A = a.format,
        C = g.series,
        B = x.destroyObjectProperties,
        H = x.pick,
        t = x.isNumber;
      a = (function () {
        function a(a, e, d, h, g) {
          var k = a.chart.inverted,
            m = a.reversed;
          this.axis = a;
          a = this.isNegative = !!d !== !!m;
          this.options = e = e || {};
          this.x = h;
          this.cumulative = this.total = null;
          this.points = {};
          this.hasValidPoints = !1;
          this.stack = g;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = {
            align: e.align || (k ? (a ? "left" : "right") : "center"),
            verticalAlign:
              e.verticalAlign || (k ? "middle" : a ? "bottom" : "top"),
            y: e.y,
            x: e.x,
          };
          this.textAlign =
            e.textAlign || (k ? (a ? "right" : "left") : "center");
        }
        a.prototype.destroy = function () {
          B(this, this.axis);
        };
        a.prototype.render = function (a) {
          var e = this.axis.chart,
            d = this.options,
            h = d.format;
          h = h ? A(h, this, e) : d.formatter.call(this);
          this.label
            ? this.label.attr({ text: h, visibility: "hidden" })
            : ((this.label = e.renderer.label(
                h,
                null,
                void 0,
                d.shape,
                void 0,
                void 0,
                d.useHTML,
                !1,
                "stack-labels",
              )),
              (h = {
                r: d.borderRadius || 0,
                text: h,
                padding: H(d.padding, 5),
                visibility: "hidden",
              }),
              e.styledMode ||
                ((h.fill = d.backgroundColor),
                (h.stroke = d.borderColor),
                (h["stroke-width"] = d.borderWidth),
                this.label.css(d.style || {})),
              this.label.attr(h),
              this.label.added || this.label.add(a));
          this.label.labelrank = e.plotSizeY;
        };
        a.prototype.setOffset = function (a, e, d, h, g, k) {
          var m = this.alignOptions,
            l = this.axis,
            r = this.label,
            E = this.options,
            A = this.textAlign,
            y = l.chart;
          a = this.getStackBox({
            xOffset: a,
            width: e,
            boxBottom: d,
            boxTop: h,
            defaultX: g,
            xAxis: k,
          });
          g = m.verticalAlign;
          r &&
            a &&
            ((e = r.getBBox()),
            (d = r.padding),
            (h = "justify" === H(E.overflow, "justify")),
            (m.x = E.x || 0),
            (m.y = E.y || 0),
            (g = this.adjustStackPosition({
              labelBox: e,
              verticalAlign: g,
              textAlign: A,
            })),
            (A = g.x),
            (g = g.y),
            (a.x -= A),
            (a.y -= g),
            r.align(m, !1, a),
            (A = y.isInsidePlot(
              r.alignAttr.x + m.x + A,
              r.alignAttr.y + m.y + g,
            )) || (h = !1),
            h && C.prototype.justifyDataLabel.call(l, r, m, r.alignAttr, e, a),
            r.attr({
              x: r.alignAttr.x,
              y: r.alignAttr.y,
              rotation: E.rotation,
              rotationOriginX: e.width / 2,
              rotationOriginY: e.height / 2,
            }),
            H(!h && E.crop, !0) &&
              (A =
                t(r.x) &&
                t(r.y) &&
                y.isInsidePlot(r.x - d + r.width, r.y) &&
                y.isInsidePlot(r.x + d, r.y)),
            r[A ? "show" : "hide"]());
        };
        a.prototype.adjustStackPosition = function (a) {
          var e = a.labelBox,
            d = { bottom: 0, middle: 1, top: 2, right: 1, center: 0, left: -1 };
          return {
            x: e.width / 2 + (e.width / 2) * d[a.textAlign],
            y: (e.height / 2) * d[a.verticalAlign],
          };
        };
        a.prototype.getStackBox = function (a) {
          var e = this.axis,
            d = e.chart,
            h = a.boxTop,
            g = a.defaultX,
            k = a.xOffset,
            l = a.width,
            r = a.boxBottom;
          h = e.stacking.usePercentage ? 100 : H(h, this.total, 0);
          h = e.toPixels(h);
          a = H(g, (a.xAxis || d.xAxis[0]).toPixels(this.x)) + k;
          e = e.toPixels(r ? r : 0);
          e = Math.abs(h - e);
          r = this.isNegative;
          return d.inverted
            ? {
                x: (r ? h : h - e) - d.plotLeft,
                y: a - d.plotTop,
                width: e,
                height: l,
              }
            : {
                x: a - d.plotLeft,
                y: (r ? h - e : h) - d.plotTop,
                width: l,
                height: e,
              };
        };
        return a;
      })();
      ("");
      return a;
    },
  );
  K(
    g,
    "Core/Axis/Stacking/StackingAxis.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Axis/Axis.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Axis/Stacking/StackItem.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C) {
      function A() {
        var b = this,
          a = b.inverted;
        b.yAxis.forEach(function (b) {
          b.stacking &&
            b.stacking.stacks &&
            b.hasVisibleSeries &&
            (b.stacking.oldStacks = b.stacking.stacks);
        });
        b.series.forEach(function (c) {
          var d = (c.xAxis && c.xAxis.options) || {};
          !c.options.stacking ||
            (!0 !== c.visible && !1 !== b.options.chart.ignoreHiddenSeries) ||
            (c.stackKey = [
              c.type,
              f(c.options.stack, ""),
              a ? d.top : d.left,
              a ? d.height : d.width,
            ].join());
        });
      }
      function H() {
        var b = this.stacking;
        if (b) {
          var a = b.stacks;
          w(a, function (b, c) {
            E(b);
            a[c] = null;
          });
          b && b.stackTotalGroup && b.stackTotalGroup.destroy();
        }
      }
      function t() {
        "yAxis" !== this.coll || this.stacking || (this.stacking = new n(this));
      }
      function r(b, a, c, d) {
        !I(b) || b.x !== a || (d && b.stackKey !== d)
          ? (b = { x: a, index: 0, key: d, stackKey: d })
          : b.index++;
        b.key = [c, a, b.index].join();
        return b;
      }
      function l() {
        var b = this,
          a = b.stackKey,
          c = b.yAxis.stacking.stacks,
          d = b.processedXData,
          e = b[b.options.stacking + "Stacker"],
          f;
        e &&
          [a, "-" + a].forEach(function (a) {
            for (var h = d.length, g, k; h--; )
              (g = d[h]),
                (f = b.getStackIndicator(f, g, b.index, a)),
                (k = (g = c[a] && c[a][g]) && g.points[f.key]) &&
                  e.call(b, k, g, h);
          });
      }
      function e(b, a, c) {
        a = a.total ? 100 / a.total : 0;
        b[0] = D(b[0] * a);
        b[1] = D(b[1] * a);
        this.stackedYData[c] = b[1];
      }
      function d() {
        var b = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? k.setStackedPoints.call(this, "group")
          : b &&
            w(b.stacks, function (a, c) {
              "group" === c.slice(-5) &&
                (w(a, function (b) {
                  return b.destroy();
                }),
                delete b.stacks[c]);
            });
      }
      function h(b) {
        var a = this.chart,
          c = b || this.options.stacking;
        if (
          c &&
          (!0 === this.visible || !1 === a.options.chart.ignoreHiddenSeries)
        ) {
          var d = this.processedXData,
            e = this.processedYData,
            h = [],
            g = e.length,
            k = this.options,
            n = k.threshold,
            m = f(k.startFromThreshold && n, 0);
          k = k.stack;
          b = b ? "" + this.type + ",".concat(c) : this.stackKey;
          var l = "-" + b,
            p = this.negStacks;
          a = "group" === c ? a.yAxis[0] : this.yAxis;
          var u = a.stacking.stacks,
            r = a.stacking.oldStacks,
            w,
            t;
          a.stacking.stacksTouched += 1;
          for (t = 0; t < g; t++) {
            var E = d[t];
            var A = e[t];
            var x = this.getStackIndicator(x, E, this.index);
            var C = x.key;
            var B = (w = p && A < (m ? 0 : n)) ? l : b;
            u[B] || (u[B] = {});
            u[B][E] ||
              (r[B] && r[B][E]
                ? ((u[B][E] = r[B][E]), (u[B][E].total = null))
                : (u[B][E] = new F(a, a.options.stackLabels, !!w, E, k)));
            B = u[B][E];
            null !== A
              ? ((B.points[C] = B.points[this.index] = [f(B.cumulative, m)]),
                I(B.cumulative) || (B.base = C),
                (B.touched = a.stacking.stacksTouched),
                0 < x.index &&
                  !1 === this.singleStacks &&
                  (B.points[C][0] = B.points[this.index + "," + E + ",0"][0]))
              : (B.points[C] = B.points[this.index] = null);
            "percent" === c
              ? ((w = w ? b : l),
                p && u[w] && u[w][E]
                  ? ((w = u[w][E]),
                    (B.total = w.total =
                      Math.max(w.total, B.total) + Math.abs(A) || 0))
                  : (B.total = D(B.total + (Math.abs(A) || 0))))
              : "group" === c
                ? (y(A) && (A = A[0]),
                  null !== A && (B.total = (B.total || 0) + 1))
                : (B.total = D(B.total + (A || 0)));
            B.cumulative =
              "group" === c
                ? (B.total || 1) - 1
                : f(B.cumulative, m) + (A || 0);
            null !== A &&
              (B.points[C].push(B.cumulative),
              (h[t] = B.cumulative),
              (B.hasValidPoints = !0));
          }
          "percent" === c && (a.stacking.usePercentage = !0);
          "group" !== c && (this.stackedYData = h);
          a.stacking.oldStacks = {};
        }
      }
      var m = a.getDeferredAnimation,
        k = x.series.prototype,
        p = C.addEvent,
        D = C.correctFloat,
        I = C.defined,
        E = C.destroyObjectProperties,
        L = C.fireEvent,
        y = C.isArray,
        c = C.isNumber,
        w = C.objectEach,
        f = C.pick,
        n = (function () {
          function b(b) {
            this.oldStacks = {};
            this.stacks = {};
            this.stacksTouched = 0;
            this.axis = b;
          }
          b.prototype.buildStacks = function () {
            var b = this.axis,
              a = b.series,
              c = b.options.reversedStacks,
              d = a.length,
              e;
            this.usePercentage = !1;
            for (e = d; e--; ) {
              var f = a[c ? e : d - e - 1];
              f.setStackedPoints();
              f.setGroupedPoints();
            }
            for (e = 0; e < d; e++) a[e].modifyStacks();
            L(b, "afterBuildStacks");
          };
          b.prototype.cleanStacks = function () {
            if (this.oldStacks) var b = (this.stacks = this.oldStacks);
            w(b, function (b) {
              w(b, function (b) {
                b.cumulative = b.total;
              });
            });
          };
          b.prototype.resetStacks = function () {
            var b = this;
            w(this.stacks, function (a) {
              w(a, function (d, e) {
                c(d.touched) && d.touched < b.stacksTouched
                  ? (d.destroy(), delete a[e])
                  : ((d.total = null), (d.cumulative = null));
              });
            });
          };
          b.prototype.renderStackTotals = function () {
            var b = this.axis,
              a = b.chart,
              c = a.renderer,
              d = this.stacks;
            b = m(
              a,
              (b.options.stackLabels && b.options.stackLabels.animation) || !1,
            );
            var e = (this.stackTotalGroup =
              this.stackTotalGroup ||
              c.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add());
            e.translate(a.plotLeft, a.plotTop);
            w(d, function (b) {
              w(b, function (b) {
                b.render(e);
              });
            });
            e.animate({ opacity: 1 }, b);
          };
          return b;
        })(),
        b;
      (function (b) {
        var a = [];
        b.compose = function (b, c, f) {
          -1 === a.indexOf(b) &&
            (a.push(b), p(b, "init", t), p(b, "destroy", H));
          -1 === a.indexOf(c) && (a.push(c), (c.prototype.getStacks = A));
          -1 === a.indexOf(f) &&
            (a.push(f),
            (b = f.prototype),
            (b.getStackIndicator = r),
            (b.modifyStacks = l),
            (b.percentStacker = e),
            (b.setGroupedPoints = d),
            (b.setStackedPoints = h));
        };
      })(b || (b = {}));
      return b;
    },
  );
  K(
    g,
    "Series/Line/LineSeries.js",
    [
      g["Core/Series/Series.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (g, r) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, e) {
                    a.__proto__ = e;
                  }) ||
                function (a, e) {
                  for (var d in e) e.hasOwnProperty(d) && (a[d] = e[d]);
                };
              return a(g, r);
            };
            return function (g, r) {
              function l() {
                this.constructor = g;
              }
              a(g, r);
              g.prototype =
                null === r
                  ? Object.create(r)
                  : ((l.prototype = r.prototype), new l());
            };
          })(),
        C = x.defined,
        B = x.merge;
      x = (function (g) {
        function t() {
          var a = (null !== g && g.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        A(t, g);
        t.prototype.drawGraph = function () {
          var a = this,
            g = this.options,
            e = (this.gappedPath || this.getGraphPath).call(this),
            d = this.chart.styledMode,
            h = [["graph", "highcharts-graph"]];
          d || h[0].push(g.lineColor || this.color || "#cccccc", g.dashStyle);
          h = a.getZonesGraphs(h);
          h.forEach(function (h, k) {
            var m = h[0],
              l = a[m],
              r = l ? "animate" : "attr";
            l
              ? ((l.endX = a.preventGraphAnimation ? null : e.xMap),
                l.animate({ d: e }))
              : e.length &&
                (a[m] = l =
                  a.chart.renderer
                    .path(e)
                    .addClass(h[1])
                    .attr({ zIndex: 1 })
                    .add(a.group));
            l &&
              !d &&
              ((m = {
                stroke: h[2],
                "stroke-width": g.lineWidth || 0,
                fill: (a.fillGraph && a.color) || "none",
              }),
              h[3]
                ? (m.dashstyle = h[3])
                : "square" !== g.linecap &&
                  (m["stroke-linecap"] = m["stroke-linejoin"] = "round"),
              l[r](m).shadow(2 > k && g.shadow));
            l && ((l.startX = e.xMap), (l.isArea = e.isArea));
          });
        };
        t.prototype.getGraphPath = function (a, g, e) {
          var d = this,
            h = d.options,
            m = [],
            k = [],
            l,
            r = h.step;
          a = a || d.points;
          var t = a.reversed;
          t && a.reverse();
          (r = { right: 1, center: 2 }[r] || (r && 3)) && t && (r = 4 - r);
          a = this.getValidPoints(a, !1, !(h.connectNulls && !g && !e));
          a.forEach(function (p, t) {
            var y = p.plotX,
              c = p.plotY,
              w = a[t - 1];
            (p.leftCliff || (w && w.rightCliff)) && !e && (l = !0);
            p.isNull && !C(g) && 0 < t
              ? (l = !h.connectNulls)
              : p.isNull && !g
                ? (l = !0)
                : (0 === t || l
                    ? (t = [["M", p.plotX, p.plotY]])
                    : d.getPointSpline
                      ? (t = [d.getPointSpline(a, p, t)])
                      : r
                        ? ((t =
                            1 === r
                              ? [["L", w.plotX, c]]
                              : 2 === r
                                ? [
                                    ["L", (w.plotX + y) / 2, w.plotY],
                                    ["L", (w.plotX + y) / 2, c],
                                  ]
                                : [["L", y, w.plotY]]),
                          t.push(["L", y, c]))
                        : (t = [["L", y, c]]),
                  k.push(p.x),
                  r && (k.push(p.x), 2 === r && k.push(p.x)),
                  m.push.apply(m, t),
                  (l = !1));
          });
          m.xMap = k;
          return (d.graphPath = m);
        };
        t.prototype.getZonesGraphs = function (a) {
          this.zones.forEach(function (g, e) {
            e = [
              "zone-graph-" + e,
              "highcharts-graph highcharts-zone-graph-" +
                e +
                " " +
                (g.className || ""),
            ];
            this.chart.styledMode ||
              e.push(
                g.color || this.color,
                g.dashStyle || this.options.dashStyle,
              );
            a.push(e);
          }, this);
          return a;
        };
        t.defaultOptions = B(a.defaultOptions, {});
        return t;
      })(a);
      g.registerSeriesType("line", x);
      ("");
      return x;
    },
  );
  K(
    g,
    "Series/Area/AreaSeries.js",
    [
      g["Core/Color/Color.js"],
      g["Core/Legend/LegendSymbol.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (d, e) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, d) {
                    a.__proto__ = d;
                  }) ||
                function (a, d) {
                  for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e]);
                };
              return a(d, e);
            };
            return function (d, e) {
              function h() {
                this.constructor = d;
              }
              a(d, e);
              d.prototype =
                null === e
                  ? Object.create(e)
                  : ((h.prototype = e.prototype), new h());
            };
          })(),
        B = a.parse,
        H = x.seriesTypes.line;
      a = F.extend;
      var t = F.merge,
        r = F.objectEach,
        l = F.pick;
      F = (function (a) {
        function d() {
          var d = (null !== a && a.apply(this, arguments)) || this;
          d.data = void 0;
          d.options = void 0;
          d.points = void 0;
          return d;
        }
        A(d, a);
        d.prototype.drawGraph = function () {
          this.areaPath = [];
          a.prototype.drawGraph.apply(this);
          var d = this,
            e = this.areaPath,
            g = this.options,
            p = [["area", "highcharts-area", this.color, g.fillColor]];
          this.zones.forEach(function (a, e) {
            p.push([
              "zone-area-" + e,
              "highcharts-area highcharts-zone-area-" + e + " " + a.className,
              a.color || d.color,
              a.fillColor || g.fillColor,
            ]);
          });
          p.forEach(function (a) {
            var h = a[0],
              k = {},
              m = d[h],
              p = m ? "animate" : "attr";
            m
              ? ((m.endX = d.preventGraphAnimation ? null : e.xMap),
                m.animate({ d: e }))
              : ((k.zIndex = 0),
                (m = d[h] =
                  d.chart.renderer.path(e).addClass(a[1]).add(d.group)),
                (m.isArea = !0));
            d.chart.styledMode ||
              (k.fill = l(
                a[3],
                B(a[2]).setOpacity(l(g.fillOpacity, 0.75)).get(),
              ));
            m[p](k);
            m.startX = e.xMap;
            m.shiftUnit = g.step ? 2 : 1;
          });
        };
        d.prototype.getGraphPath = function (a) {
          var d = H.prototype.getGraphPath,
            e = this.options,
            h = e.stacking,
            g = this.yAxis,
            r = [],
            t = [],
            A = this.index,
            y = g.stacking.stacks[this.stackKey],
            c = e.threshold,
            w = Math.round(g.getThreshold(e.threshold));
          e = l(e.connectNulls, "percent" === h);
          var f = function (b, d, e) {
            var f = a[b];
            b = h && y[f.x].points[A];
            var n = f[e + "Null"] || 0;
            e = f[e + "Cliff"] || 0;
            f = !0;
            if (e || n) {
              var k = (n ? b[0] : b[1]) + e;
              var m = b[0] + e;
              f = !!n;
            } else !h && a[d] && a[d].isNull && (k = m = c);
            "undefined" !== typeof k &&
              (t.push({
                plotX: z,
                plotY: null === k ? w : g.getThreshold(k),
                isNull: f,
                isCliff: !0,
              }),
              r.push({
                plotX: z,
                plotY: null === m ? w : g.getThreshold(m),
                doCurve: !1,
              }));
          };
          a = a || this.points;
          h && (a = this.getStackPoints(a));
          for (var n = 0, b = a.length; n < b; ++n) {
            h ||
              (a[n].leftCliff =
                a[n].rightCliff =
                a[n].leftNull =
                a[n].rightNull =
                  void 0);
            var u = a[n].isNull;
            var z = l(a[n].rectPlotX, a[n].plotX);
            var q = h ? l(a[n].yBottom, w) : w;
            if (!u || e)
              e || f(n, n - 1, "left"),
                (u && !h && e) ||
                  (t.push(a[n]), r.push({ x: n, plotX: z, plotY: q })),
                e || f(n, n + 1, "right");
          }
          f = d.call(this, t, !0, !0);
          r.reversed = !0;
          u = d.call(this, r, !0, !0);
          (q = u[0]) && "M" === q[0] && (u[0] = ["L", q[1], q[2]]);
          u = f.concat(u);
          u.length && u.push(["Z"]);
          d = d.call(this, t, !1, e);
          u.xMap = f.xMap;
          this.areaPath = u;
          return d;
        };
        d.prototype.getStackPoints = function (a) {
          var d = this,
            e = [],
            h = [],
            g = this.xAxis,
            t = this.yAxis,
            A = t.stacking.stacks[this.stackKey],
            x = {},
            y = t.series,
            c = y.length,
            w = t.options.reversedStacks ? 1 : -1,
            f = y.indexOf(d);
          a = a || this.points;
          if (this.options.stacking) {
            for (var n = 0; n < a.length; n++)
              (a[n].leftNull = a[n].rightNull = void 0), (x[a[n].x] = a[n]);
            r(A, function (b, a) {
              null !== b.total && h.push(a);
            });
            h.sort(function (b, a) {
              return b - a;
            });
            var b = y.map(function (b) {
              return b.visible;
            });
            h.forEach(function (a, n) {
              var k = 0,
                m,
                p;
              if (x[a] && !x[a].isNull)
                e.push(x[a]),
                  [-1, 1].forEach(function (e) {
                    var g = 1 === e ? "rightNull" : "leftNull",
                      k = A[h[n + e]],
                      l = 0;
                    if (k)
                      for (var q = f; 0 <= q && q < c; ) {
                        var u = y[q].index;
                        m = k.points[u];
                        m ||
                          (u === d.index
                            ? (x[a][g] = !0)
                            : b[q] &&
                              (p = A[a].points[u]) &&
                              (l -= p[1] - p[0]));
                        q += w;
                      }
                    x[a][1 === e ? "rightCliff" : "leftCliff"] = l;
                  });
              else {
                for (var u = f; 0 <= u && u < c; ) {
                  if ((m = A[a].points[y[u].index])) {
                    k = m[1];
                    break;
                  }
                  u += w;
                }
                k = l(k, 0);
                k = t.translate(k, 0, 1, 0, 1);
                e.push({
                  isNull: !0,
                  plotX: g.translate(a, 0, 0, 0, 1),
                  x: a,
                  plotY: k,
                  yBottom: k,
                });
              }
            });
          }
          return e;
        };
        d.defaultOptions = t(H.defaultOptions, { threshold: 0 });
        return d;
      })(H);
      a(F.prototype, { singleStacks: !1, drawLegendSymbol: g.drawRectangle });
      x.registerSeriesType("area", F);
      ("");
      return F;
    },
  );
  K(
    g,
    "Series/Spline/SplineSeries.js",
    [g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]],
    function (a, g) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (g, r) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, e) {
                    a.__proto__ = e;
                  }) ||
                function (a, e) {
                  for (var d in e) e.hasOwnProperty(d) && (a[d] = e[d]);
                };
              return a(g, r);
            };
            return function (g, r) {
              function l() {
                this.constructor = g;
              }
              a(g, r);
              g.prototype =
                null === r
                  ? Object.create(r)
                  : ((l.prototype = r.prototype), new l());
            };
          })(),
        F = a.seriesTypes.line,
        C = g.merge,
        B = g.pick;
      g = (function (a) {
        function g() {
          var g = (null !== a && a.apply(this, arguments)) || this;
          g.data = void 0;
          g.options = void 0;
          g.points = void 0;
          return g;
        }
        A(g, a);
        g.prototype.getPointSpline = function (a, g, e) {
          var d = g.plotX || 0,
            h = g.plotY || 0,
            m = a[e - 1];
          e = a[e + 1];
          if (
            m &&
            !m.isNull &&
            !1 !== m.doCurve &&
            !g.isCliff &&
            e &&
            !e.isNull &&
            !1 !== e.doCurve &&
            !g.isCliff
          ) {
            a = m.plotY || 0;
            var k = e.plotX || 0;
            e = e.plotY || 0;
            var l = 0;
            var r = (1.5 * d + (m.plotX || 0)) / 2.5;
            var t = (1.5 * h + a) / 2.5;
            k = (1.5 * d + k) / 2.5;
            var A = (1.5 * h + e) / 2.5;
            k !== r && (l = ((A - t) * (k - d)) / (k - r) + h - A);
            t += l;
            A += l;
            t > a && t > h
              ? ((t = Math.max(a, h)), (A = 2 * h - t))
              : t < a && t < h && ((t = Math.min(a, h)), (A = 2 * h - t));
            A > e && A > h
              ? ((A = Math.max(e, h)), (t = 2 * h - A))
              : A < e && A < h && ((A = Math.min(e, h)), (t = 2 * h - A));
            g.rightContX = k;
            g.rightContY = A;
          }
          g = [
            "C",
            B(m.rightContX, m.plotX, 0),
            B(m.rightContY, m.plotY, 0),
            B(r, d, 0),
            B(t, h, 0),
            d,
            h,
          ];
          m.rightContX = m.rightContY = void 0;
          return g;
        };
        g.defaultOptions = C(F.defaultOptions);
        return g;
      })(F);
      a.registerSeriesType("spline", g);
      ("");
      return g;
    },
  );
  K(
    g,
    "Series/AreaSpline/AreaSplineSeries.js",
    [
      g["Series/Spline/SplineSeries.js"],
      g["Core/Legend/LegendSymbol.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (e, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, d) {
                    a.__proto__ = d;
                  }) ||
                function (a, d) {
                  for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e]);
                };
              return a(e, d);
            };
            return function (e, d) {
              function g() {
                this.constructor = e;
              }
              a(e, d);
              e.prototype =
                null === d
                  ? Object.create(d)
                  : ((g.prototype = d.prototype), new g());
            };
          })(),
        B = x.seriesTypes,
        H = B.area;
      B = B.area.prototype;
      var t = F.extend,
        r = F.merge;
      F = (function (g) {
        function e() {
          var a = (null !== g && g.apply(this, arguments)) || this;
          a.data = void 0;
          a.points = void 0;
          a.options = void 0;
          return a;
        }
        A(e, g);
        e.defaultOptions = r(a.defaultOptions, H.defaultOptions);
        return e;
      })(a);
      t(F.prototype, {
        getGraphPath: B.getGraphPath,
        getStackPoints: B.getStackPoints,
        drawGraph: B.drawGraph,
        drawLegendSymbol: g.drawRectangle,
      });
      x.registerSeriesType("areaspline", F);
      ("");
      return F;
    },
  );
  K(g, "Series/Column/ColumnSeriesDefaults.js", [], function () {
    "";
    return {
      borderRadius: 0,
      centerInCategory: !1,
      groupPadding: 0.2,
      marker: null,
      pointPadding: 0.1,
      minPointLength: 0,
      cropThreshold: 50,
      pointRange: null,
      states: {
        hover: { halo: !1, brightness: 0.1 },
        select: { color: "#cccccc", borderColor: "#000000" },
      },
      dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
      startFromThreshold: !0,
      stickyTracking: !1,
      tooltip: { distance: 6 },
      threshold: 0,
      borderColor: "#ffffff",
    };
  });
  K(
    g,
    "Series/Column/ColumnSeries.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Color/Color.js"],
      g["Series/Column/ColumnSeriesDefaults.js"],
      g["Core/Globals.js"],
      g["Core/Legend/LegendSymbol.js"],
      g["Core/Series/Series.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C, B, H, t) {
      var r =
          (this && this.__extends) ||
          (function () {
            var a = function (c, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                };
              return a(c, d);
            };
            return function (c, d) {
              function e() {
                this.constructor = c;
              }
              a(c, d);
              c.prototype =
                null === d
                  ? Object.create(d)
                  : ((e.prototype = d.prototype), new e());
            };
          })(),
        l = a.animObject,
        e = g.parse,
        d = F.hasTouch;
      a = F.noop;
      var h = t.clamp,
        m = t.defined,
        k = t.extend,
        p = t.fireEvent,
        A = t.isArray,
        I = t.isNumber,
        E = t.merge,
        L = t.pick,
        y = t.objectEach;
      t = (function (a) {
        function c() {
          var c = (null !== a && a.apply(this, arguments)) || this;
          c.borderWidth = void 0;
          c.data = void 0;
          c.group = void 0;
          c.options = void 0;
          c.points = void 0;
          return c;
        }
        r(c, a);
        c.prototype.animate = function (a) {
          var c = this,
            b = this.yAxis,
            d = c.options,
            e = this.chart.inverted,
            f = {},
            g = e ? "translateX" : "translateY";
          if (a)
            (f.scaleY = 0.001),
              (a = h(b.toPixels(d.threshold), b.pos, b.pos + b.len)),
              e ? (f.translateX = a - b.len) : (f.translateY = a),
              c.clipBox && c.setClip(),
              c.group.attr(f);
          else {
            var m = Number(c.group.attr(g));
            c.group.animate(
              { scaleY: 1 },
              k(l(c.options.animation), {
                step: function (a, d) {
                  c.group &&
                    ((f[g] = m + d.pos * (b.pos - m)), c.group.attr(f));
                },
              }),
            );
          }
        };
        c.prototype.init = function (c, d) {
          a.prototype.init.apply(this, arguments);
          var b = this;
          c = b.chart;
          c.hasRendered &&
            c.series.forEach(function (a) {
              a.type === b.type && (a.isDirty = !0);
            });
        };
        c.prototype.getColumnMetrics = function () {
          var a = this,
            c = a.options,
            b = a.xAxis,
            d = a.yAxis,
            e = b.options.reversedStacks;
          e = (b.reversed && !e) || (!b.reversed && e);
          var g = {},
            h,
            k = 0;
          !1 === c.grouping
            ? (k = 1)
            : a.chart.series.forEach(function (b) {
                var c = b.yAxis,
                  e = b.options;
                if (
                  b.type === a.type &&
                  (b.visible || !a.chart.options.chart.ignoreHiddenSeries) &&
                  d.len === c.len &&
                  d.pos === c.pos
                ) {
                  if (e.stacking && "group" !== e.stacking) {
                    h = b.stackKey;
                    "undefined" === typeof g[h] && (g[h] = k++);
                    var f = g[h];
                  } else !1 !== e.grouping && (f = k++);
                  b.columnIndex = f;
                }
              });
          var m = Math.min(
              Math.abs(b.transA) *
                ((b.ordinal && b.ordinal.slope) ||
                  c.pointRange ||
                  b.closestPointRange ||
                  b.tickInterval ||
                  1),
              b.len,
            ),
            l = m * c.groupPadding,
            p = (m - 2 * l) / (k || 1);
          c = Math.min(
            c.maxPointWidth || b.len,
            L(c.pointWidth, p * (1 - 2 * c.pointPadding)),
          );
          a.columnMetrics = {
            width: c,
            offset:
              (p - c) / 2 +
              (l + ((a.columnIndex || 0) + (e ? 1 : 0)) * p - m / 2) *
                (e ? -1 : 1),
            paddedWidth: p,
            columnCount: k,
          };
          return a.columnMetrics;
        };
        c.prototype.crispCol = function (a, c, b, d) {
          var e = this.chart,
            f = this.borderWidth,
            g = -(f % 2 ? 0.5 : 0);
          f = f % 2 ? 0.5 : 1;
          e.inverted && e.renderer.isVML && (f += 1);
          this.options.crisp &&
            ((b = Math.round(a + b) + g), (a = Math.round(a) + g), (b -= a));
          d = Math.round(c + d) + f;
          g = 0.5 >= Math.abs(c) && 0.5 < d;
          c = Math.round(c) + f;
          d -= c;
          g && d && (--c, (d += 1));
          return { x: a, y: c, width: b, height: d };
        };
        c.prototype.adjustForMissingColumns = function (a, c, b, d) {
          var e = this,
            f = this.options.stacking;
          if (!b.isNull && 1 < d.columnCount) {
            var g = this.yAxis.options.reversedStacks,
              h = 0,
              k = g ? 0 : -d.columnCount;
            y(this.yAxis.stacking && this.yAxis.stacking.stacks, function (a) {
              if ("number" === typeof b.x) {
                var c = a[b.x.toString()];
                c &&
                  ((a = c.points[e.index]),
                  f
                    ? (a && (h = k), c.hasValidPoints && (g ? k++ : k--))
                    : A(a) &&
                      ((a = Object.keys(c.points)
                        .filter(function (b) {
                          return (
                            !b.match(",") &&
                            c.points[b] &&
                            1 < c.points[b].length
                          );
                        })
                        .map(parseFloat)
                        .sort(function (b, a) {
                          return a - b;
                        })),
                      (h = a.indexOf(e.index)),
                      (k = a.length)));
              }
            });
            a =
              (b.plotX || 0) +
              ((k - 1) * d.paddedWidth + c) / 2 -
              c -
              h * d.paddedWidth;
          }
          return a;
        };
        c.prototype.translate = function () {
          var a = this,
            c = a.chart,
            b = a.options,
            d = (a.dense = 2 > a.closestPointRange * a.xAxis.transA);
          d = a.borderWidth = L(b.borderWidth, d ? 0 : 1);
          var e = a.xAxis,
            g = a.yAxis,
            k = b.threshold,
            l = (a.translatedThreshold = g.getThreshold(k)),
            p = L(b.minPointLength, 5),
            r = a.getColumnMetrics(),
            w = r.width,
            y = (a.pointXOffset = r.offset),
            v = a.dataMin,
            t = a.dataMax,
            A = (a.barW = Math.max(w, 1 + 2 * d));
          c.inverted && (l -= 0.5);
          b.pointPadding && (A = Math.ceil(A));
          B.prototype.translate.apply(a);
          a.points.forEach(function (d) {
            var f = L(d.yBottom, l),
              n = 999 + Math.abs(f),
              q = d.plotX || 0;
            n = h(d.plotY, -n, g.len + n);
            var u = Math.min(n, f),
              z = Math.max(n, f) - u,
              D = w,
              x = q + y,
              E = A;
            p &&
              Math.abs(z) < p &&
              ((z = p),
              (q = (!g.reversed && !d.negative) || (g.reversed && d.negative)),
              I(k) &&
                I(t) &&
                d.y === k &&
                t <= k &&
                (g.min || 0) < k &&
                (v !== t || (g.max || 0) <= k) &&
                (q = !q),
              (u = Math.abs(u - l) > p ? f - p : l - (q ? p : 0)));
            m(d.options.pointWidth) &&
              ((D = E = Math.ceil(d.options.pointWidth)),
              (x -= Math.round((D - w) / 2)));
            b.centerInCategory && (x = a.adjustForMissingColumns(x, D, d, r));
            d.barX = x;
            d.pointWidth = D;
            d.tooltipPos = c.inverted
              ? [
                  h(
                    g.len + g.pos - c.plotLeft - n,
                    g.pos - c.plotLeft,
                    g.len + g.pos - c.plotLeft,
                  ),
                  e.len + e.pos - c.plotTop - x - E / 2,
                  z,
                ]
              : [
                  e.left - c.plotLeft + x + E / 2,
                  h(
                    n + g.pos - c.plotTop,
                    g.pos - c.plotTop,
                    g.len + g.pos - c.plotTop,
                  ),
                  z,
                ];
            d.shapeType = a.pointClass.prototype.shapeType || "rect";
            d.shapeArgs = a.crispCol.apply(
              a,
              d.isNull ? [x, l, E, 0] : [x, u, E, z],
            );
          });
        };
        c.prototype.drawGraph = function () {
          this.group[this.dense ? "addClass" : "removeClass"](
            "highcharts-dense-data",
          );
        };
        c.prototype.pointAttribs = function (a, c) {
          var b = this.options,
            d = this.pointAttrToOptions || {},
            f = d.stroke || "borderColor",
            g = d["stroke-width"] || "borderWidth",
            h = (a && a.color) || this.color,
            k = (a && a[f]) || b[f] || h;
          d = (a && a.options.dashStyle) || b.dashStyle;
          var n = (a && a[g]) || b[g] || this[g] || 0,
            m = L(a && a.opacity, b.opacity, 1);
          if (a && this.zones.length) {
            var l = a.getZone();
            h =
              a.options.color ||
              (l && (l.color || a.nonZonedColor)) ||
              this.color;
            l &&
              ((k = l.borderColor || k),
              (d = l.dashStyle || d),
              (n = l.borderWidth || n));
          }
          c &&
            a &&
            ((a = E(
              b.states[c],
              (a.options.states && a.options.states[c]) || {},
            )),
            (c = a.brightness),
            (h =
              a.color ||
              ("undefined" !== typeof c && e(h).brighten(a.brightness).get()) ||
              h),
            (k = a[f] || k),
            (n = a[g] || n),
            (d = a.dashStyle || d),
            (m = L(a.opacity, m)));
          f = { fill: h, stroke: k, "stroke-width": n, opacity: m };
          d && (f.dashstyle = d);
          return f;
        };
        c.prototype.drawPoints = function (a) {
          void 0 === a && (a = this.points);
          var c = this,
            b = this.chart,
            d = c.options,
            e = b.renderer,
            f = d.animationLimit || 250,
            g;
          a.forEach(function (a) {
            var h = a.graphic,
              k = !!h,
              n = h && b.pointCount < f ? "animate" : "attr";
            if (I(a.plotY) && null !== a.y) {
              g = a.shapeArgs;
              h && a.hasNewShapeType() && (h = h.destroy());
              c.enabledDataSorting &&
                (a.startXPos = c.xAxis.reversed
                  ? -(g ? g.width || 0 : 0)
                  : c.xAxis.width);
              h ||
                ((a.graphic = h = e[a.shapeType](g).add(a.group || c.group)) &&
                  c.enabledDataSorting &&
                  b.hasRendered &&
                  b.pointCount < f &&
                  (h.attr({ x: a.startXPos }), (k = !0), (n = "animate")));
              if (h && k) h[n](E(g));
              if (d.borderRadius) h[n]({ r: d.borderRadius });
              b.styledMode ||
                h[n](c.pointAttribs(a, a.selected && "select")).shadow(
                  !1 !== a.allowShadow && d.shadow,
                  null,
                  d.stacking && !d.borderRadius,
                );
              h &&
                (h.addClass(a.getClassName(), !0),
                h.attr({ visibility: a.visible ? "inherit" : "hidden" }));
            } else h && (a.graphic = h.destroy());
          });
        };
        c.prototype.drawTracker = function (a) {
          void 0 === a && (a = this.points);
          var c = this,
            b = c.chart,
            e = b.pointer,
            f = function (a) {
              var b = e.getPointFromEvent(a);
              "undefined" !== typeof b &&
                ((e.isDirectTouch = !0), b.onMouseOver(a));
            },
            g;
          a.forEach(function (a) {
            g = A(a.dataLabels)
              ? a.dataLabels
              : a.dataLabel
                ? [a.dataLabel]
                : [];
            a.graphic && (a.graphic.element.point = a);
            g.forEach(function (b) {
              b.div ? (b.div.point = a) : (b.element.point = a);
            });
          });
          c._hasTracking ||
            (c.trackerGroups.forEach(function (a) {
              if (c[a]) {
                c[a]
                  .addClass("highcharts-tracker")
                  .on("mouseover", f)
                  .on("mouseout", function (a) {
                    e.onTrackerMouseOut(a);
                  });
                if (d) c[a].on("touchstart", f);
                !b.styledMode &&
                  c.options.cursor &&
                  c[a].css({ cursor: c.options.cursor });
              }
            }),
            (c._hasTracking = !0));
          p(this, "afterDrawTracker");
        };
        c.prototype.remove = function () {
          var a = this,
            c = a.chart;
          c.hasRendered &&
            c.series.forEach(function (b) {
              b.type === a.type && (b.isDirty = !0);
            });
          B.prototype.remove.apply(a, arguments);
        };
        c.defaultOptions = E(B.defaultOptions, x);
        return c;
      })(B);
      k(t.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        drawLegendSymbol: C.drawRectangle,
        getSymbol: a,
        negStacks: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      H.registerSeriesType("column", t);
      ("");
      return t;
    },
  );
  K(
    g,
    "Core/Series/DataLabel.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/FormatUtilities.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A = a.getDeferredAnimation,
        C = g.format,
        B = x.defined,
        H = x.extend,
        t = x.fireEvent,
        r = x.isArray,
        l = x.isString,
        e = x.merge,
        d = x.objectEach,
        h = x.pick,
        m = x.splat,
        k;
      (function (a) {
        function g(a, c, b, d, e) {
          var f = this,
            g = this.chart,
            k = this.isCartesian && g.inverted,
            n = this.enabledDataSorting,
            m = a.plotX,
            l = a.plotY,
            p = b.rotation,
            r = b.align,
            u =
              B(m) &&
              B(l) &&
              g.isInsidePlot(m, Math.round(l), {
                inverted: k,
                paneCoordinates: !0,
                series: f,
              });
          l = function (b) {
            n && f.xAxis && !w && f.setDataLabelStartPos(a, c, e, u, b);
          };
          var w = "justify" === h(b.overflow, n ? "none" : "justify");
          m =
            this.visible &&
            !1 !== a.visible &&
            B(m) &&
            (a.series.forceDL ||
              (n && !w) ||
              u ||
              (h(b.inside, !!this.options.stacking) &&
                d &&
                g.isInsidePlot(m, k ? d.x + 1 : d.y + d.height - 1, {
                  inverted: k,
                  paneCoordinates: !0,
                  series: f,
                })));
          k = a.pos();
          if (m && k) {
            p && c.attr({ align: r });
            r = c.getBBox(!0);
            var y = [0, 0];
            var t = g.renderer.fontMetrics(
              g.styledMode ? void 0 : b.style.fontSize,
              c,
            ).b;
            d = H({ x: k[0], y: Math.round(k[1]), width: 0, height: 0 }, d);
            H(b, { width: r.width, height: r.height });
            p
              ? ((w = !1),
                (y = g.renderer.rotCorr(t, p)),
                (t = {
                  x: d.x + (b.x || 0) + d.width / 2 + y.x,
                  y:
                    d.y +
                    (b.y || 0) +
                    { top: 0, middle: 0.5, bottom: 1 }[b.verticalAlign] *
                      d.height,
                }),
                (y = [r.x - Number(c.attr("x")), r.y - Number(c.attr("y"))]),
                l(t),
                c[e ? "attr" : "animate"](t))
              : (l(d), c.align(b, void 0, d), (t = c.alignAttr));
            w && 0 <= d.height
              ? this.justifyDataLabel(c, b, t, r, d, e)
              : h(b.crop, !0) &&
                ((d = t.x),
                (l = t.y),
                (d += y[0]),
                (l += y[1]),
                (m =
                  g.isInsidePlot(d, l, { paneCoordinates: !0, series: f }) &&
                  g.isInsidePlot(d + r.width, l + r.height, {
                    paneCoordinates: !0,
                    series: f,
                  })));
            if (b.shape && !p)
              c[e ? "attr" : "animate"]({ anchorX: k[0], anchorY: k[1] });
          }
          e && n && (c.placed = !1);
          m || (n && !w) ? c.show() : (c.hide(), (c.placed = !1));
        }
        function k(a, c) {
          var b = c.filter;
          return b
            ? ((c = b.operator),
              (a = a[b.property]),
              (b = b.value),
              (">" === c && a > b) ||
              ("<" === c && a < b) ||
              (">=" === c && a >= b) ||
              ("<=" === c && a <= b) ||
              ("==" === c && a == b) ||
              ("===" === c && a === b)
                ? !0
                : !1)
            : !0;
        }
        function p(a) {
          void 0 === a && (a = this.points);
          var c = this,
            b = c.chart,
            e = c.options,
            f = c.hasRendered || 0,
            g = b.renderer,
            p = b.options.chart,
            w = p.backgroundColor;
          p = p.plotBackgroundColor;
          var x = g.getContrast((l(p) && p) || (l(w) && w) || "#000000"),
            D = e.dataLabels,
            E;
          w = D.animation;
          w = D.defer ? A(b, w, c) : { defer: 0, duration: 0 };
          D = y(
            y(
              b.options.plotOptions &&
                b.options.plotOptions.series &&
                b.options.plotOptions.series.dataLabels,
              b.options.plotOptions &&
                b.options.plotOptions[c.type] &&
                b.options.plotOptions[c.type].dataLabels,
            ),
            D,
          );
          t(this, "drawDataLabels");
          if (r(D) || D.enabled || c._hasPointLabels) {
            var F = c.plotGroup(
              "dataLabelsGroup",
              "data-labels",
              f ? "inherit" : "hidden",
              D.zIndex || 6,
            );
            F.attr({ opacity: +f });
            !f &&
              (f = c.dataLabelsGroup) &&
              (c.visible && F.show(),
              f[e.animation ? "animate" : "attr"]({ opacity: 1 }, w));
            a.forEach(function (a) {
              E = m(y(D, a.dlOptions || (a.options && a.options.dataLabels)));
              E.forEach(function (f, n) {
                var m =
                    f.enabled && (!a.isNull || a.dataLabelOnNull) && k(a, f),
                  l = a.connectors ? a.connectors[n] : a.connector,
                  p = a.dataLabels ? a.dataLabels[n] : a.dataLabel,
                  q = !p,
                  r = h(f.distance, a.labelDistance);
                if (m) {
                  var u = a.getLabelConfig();
                  var w = h(f[a.formatPrefix + "Format"], f.format);
                  u = B(w)
                    ? C(w, u, b)
                    : (f[a.formatPrefix + "Formatter"] || f.formatter).call(
                        u,
                        f,
                      );
                  w = f.style;
                  var y = f.rotation;
                  b.styledMode ||
                    ((w.color = h(f.color, w.color, c.color, "#000000")),
                    "contrast" === w.color
                      ? ((a.contrastColor = g.getContrast(a.color || c.color)),
                        (w.color =
                          (!B(r) && f.inside) || 0 > r || e.stacking
                            ? a.contrastColor
                            : x))
                      : delete a.contrastColor,
                    e.cursor && (w.cursor = e.cursor));
                  var t = {
                    r: f.borderRadius || 0,
                    rotation: y,
                    padding: f.padding,
                    zIndex: 1,
                  };
                  if (!b.styledMode) {
                    r = f.backgroundColor;
                    var v = f.borderColor;
                    t.fill = "auto" === r ? a.color : r;
                    t.stroke = "auto" === v ? a.color : v;
                    t["stroke-width"] = f.borderWidth;
                  }
                  d(t, function (a, b) {
                    "undefined" === typeof a && delete t[b];
                  });
                }
                !p ||
                  (m &&
                    B(u) &&
                    !!p.div === !!f.useHTML &&
                    ((p.rotation && f.rotation) ||
                      p.rotation === f.rotation)) ||
                  ((q = !0),
                  (a.dataLabel = p = a.dataLabel && a.dataLabel.destroy()),
                  a.dataLabels &&
                    (1 === a.dataLabels.length
                      ? delete a.dataLabels
                      : delete a.dataLabels[n]),
                  n || delete a.dataLabel,
                  l &&
                    ((a.connector = a.connector.destroy()),
                    a.connectors &&
                      (1 === a.connectors.length
                        ? delete a.connectors
                        : delete a.connectors[n])));
                m && B(u)
                  ? (p
                      ? (t.text = u)
                      : ((a.dataLabels = a.dataLabels || []),
                        (p = a.dataLabels[n] =
                          y
                            ? g
                                .text(u, 0, 0, f.useHTML)
                                .addClass("highcharts-data-label")
                            : g.label(
                                u,
                                0,
                                0,
                                f.shape,
                                null,
                                null,
                                f.useHTML,
                                null,
                                "data-label",
                              )),
                        n || (a.dataLabel = p),
                        p.addClass(
                          " highcharts-data-label-color-" +
                            a.colorIndex +
                            " " +
                            (f.className || "") +
                            (f.useHTML ? " highcharts-tracker" : ""),
                        )),
                    (p.options = f),
                    p.attr(t),
                    b.styledMode || p.css(w).shadow(f.shadow),
                    (n = f[a.formatPrefix + "TextPath"] || f.textPath) &&
                      !f.useHTML &&
                      (p.setTextPath(
                        (a.getDataLabelPath && a.getDataLabelPath(p)) ||
                          a.graphic,
                        n,
                      ),
                      a.dataLabelPath &&
                        !n.enabled &&
                        (a.dataLabelPath = a.dataLabelPath.destroy())),
                    p.added || p.add(F),
                    c.alignDataLabel(a, p, f, null, q))
                  : p && p.hide();
              });
            });
          }
          t(this, "afterDrawDataLabels");
        }
        function x(a, c, b, d, e, g) {
          var f = this.chart,
            h = c.align,
            k = c.verticalAlign,
            n = a.box ? 0 : a.padding || 0,
            m = c.x;
          m = void 0 === m ? 0 : m;
          var l = c.y;
          l = void 0 === l ? 0 : l;
          var p = (b.x || 0) + n;
          if (0 > p) {
            "right" === h && 0 <= m
              ? ((c.align = "left"), (c.inside = !0))
              : (m -= p);
            var q = !0;
          }
          p = (b.x || 0) + d.width - n;
          p > f.plotWidth &&
            ("left" === h && 0 >= m
              ? ((c.align = "right"), (c.inside = !0))
              : (m += f.plotWidth - p),
            (q = !0));
          p = b.y + n;
          0 > p &&
            ("bottom" === k && 0 <= l
              ? ((c.verticalAlign = "top"), (c.inside = !0))
              : (l -= p),
            (q = !0));
          p = (b.y || 0) + d.height - n;
          p > f.plotHeight &&
            ("top" === k && 0 >= l
              ? ((c.verticalAlign = "bottom"), (c.inside = !0))
              : (l += f.plotHeight - p),
            (q = !0));
          q && ((c.x = m), (c.y = l), (a.placed = !g), a.align(c, void 0, e));
          return q;
        }
        function y(a, c) {
          var b = [],
            d;
          if (r(a) && !r(c))
            b = a.map(function (a) {
              return e(a, c);
            });
          else if (r(c) && !r(a))
            b = c.map(function (b) {
              return e(a, b);
            });
          else if (r(a) || r(c))
            for (d = Math.max(a.length, c.length); d--; ) b[d] = e(a[d], c[d]);
          else b = e(a, c);
          return b;
        }
        function c(a, c, b, d, e) {
          var f = this.chart,
            g = f.inverted,
            h = this.xAxis,
            k = h.reversed,
            m = g ? c.height / 2 : c.width / 2;
          a = (a = a.pointWidth) ? a / 2 : 0;
          c.startXPos = g ? e.x : k ? -m - a : h.width - m + a;
          c.startYPos = g ? (k ? this.yAxis.height - m + a : -m - a) : e.y;
          d
            ? "hidden" === c.visibility &&
              (c.show(), c.attr({ opacity: 0 }).animate({ opacity: 1 }))
            : c.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, c.hide);
          f.hasRendered &&
            (b && c.attr({ x: c.startXPos, y: c.startYPos }), (c.placed = !0));
        }
        var w = [];
        a.compose = function (a) {
          if (-1 === w.indexOf(a)) {
            var d = a.prototype;
            w.push(a);
            d.alignDataLabel = g;
            d.drawDataLabels = p;
            d.justifyDataLabel = x;
            d.setDataLabelStartPos = c;
          }
        };
      })(k || (k = {}));
      ("");
      return k;
    },
  );
  K(
    g,
    "Series/Column/ColumnDataLabel.js",
    [
      g["Core/Series/DataLabel.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A = g.series,
        C = x.merge,
        B = x.pick,
        H;
      (function (g) {
        function r(a, d, g, m, k) {
          var e = this.chart.inverted,
            h = a.series,
            l = (h.xAxis ? h.xAxis.len : this.chart.plotSizeX) || 0;
          h = (h.yAxis ? h.yAxis.len : this.chart.plotSizeY) || 0;
          var r = a.dlBox || a.shapeArgs,
            t = B(a.below, a.plotY > B(this.translatedThreshold, h)),
            y = B(g.inside, !!this.options.stacking);
          r &&
            ((m = C(r)),
            0 > m.y && ((m.height += m.y), (m.y = 0)),
            (r = m.y + m.height - h),
            0 < r && r < m.height && (m.height -= r),
            e &&
              (m = {
                x: h - m.y - m.height,
                y: l - m.x - m.width,
                width: m.height,
                height: m.width,
              }),
            y ||
              (e
                ? ((m.x += t ? 0 : m.width), (m.width = 0))
                : ((m.y += t ? m.height : 0), (m.height = 0))));
          g.align = B(g.align, !e || y ? "center" : t ? "right" : "left");
          g.verticalAlign = B(
            g.verticalAlign,
            e || y ? "middle" : t ? "top" : "bottom",
          );
          A.prototype.alignDataLabel.call(this, a, d, g, m, k);
          g.inside && a.contrastColor && d.css({ color: a.contrastColor });
        }
        var l = [];
        g.compose = function (e) {
          a.compose(A);
          -1 === l.indexOf(e) && (l.push(e), (e.prototype.alignDataLabel = r));
        };
      })(H || (H = {}));
      return H;
    },
  );
  K(
    g,
    "Series/Bar/BarSeries.js",
    [
      g["Series/Column/ColumnSeries.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (g, r) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, e) {
                    a.__proto__ = e;
                  }) ||
                function (a, e) {
                  for (var d in e) e.hasOwnProperty(d) && (a[d] = e[d]);
                };
              return a(g, r);
            };
            return function (g, r) {
              function l() {
                this.constructor = g;
              }
              a(g, r);
              g.prototype =
                null === r
                  ? Object.create(r)
                  : ((l.prototype = r.prototype), new l());
            };
          })(),
        C = x.extend,
        B = x.merge;
      x = (function (g) {
        function t() {
          var a = (null !== g && g.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        A(t, g);
        t.defaultOptions = B(a.defaultOptions, {});
        return t;
      })(a);
      C(x.prototype, { inverted: !0 });
      g.registerSeriesType("bar", x);
      ("");
      return x;
    },
  );
  K(g, "Series/Scatter/ScatterSeriesDefaults.js", [], function () {
    "";
    return {
      lineWidth: 0,
      findNearestPointBy: "xy",
      jitter: { x: 0, y: 0 },
      marker: { enabled: !0 },
      tooltip: {
        headerFormat:
          '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
      },
    };
  });
  K(
    g,
    "Series/Scatter/ScatterSeries.js",
    [
      g["Series/Scatter/ScatterSeriesDefaults.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (e, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, d) {
                    a.__proto__ = d;
                  }) ||
                function (a, d) {
                  for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e]);
                };
              return a(e, d);
            };
            return function (e, d) {
              function g() {
                this.constructor = e;
              }
              a(e, d);
              e.prototype =
                null === d
                  ? Object.create(d)
                  : ((g.prototype = d.prototype), new g());
            };
          })(),
        C = g.seriesTypes,
        B = C.column,
        H = C.line;
      C = x.addEvent;
      var t = x.extend,
        r = x.merge;
      x = (function (g) {
        function e() {
          var a = (null !== g && g.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        A(e, g);
        e.prototype.applyJitter = function () {
          var a = this,
            e = this.options.jitter,
            g = this.points.length;
          e &&
            this.points.forEach(function (d, h) {
              ["x", "y"].forEach(function (k, m) {
                var l = "plot" + k.toUpperCase();
                if (e[k] && !d.isNull) {
                  var p = a[k + "Axis"];
                  var r = e[k] * p.transA;
                  if (p && !p.isLog) {
                    var c = Math.max(0, d[l] - r);
                    p = Math.min(p.len, d[l] + r);
                    m = 1e4 * Math.sin(h + m * g);
                    d[l] = c + (p - c) * (m - Math.floor(m));
                    "x" === k && (d.clientX = d.plotX);
                  }
                }
              });
            });
        };
        e.prototype.drawGraph = function () {
          this.options.lineWidth
            ? g.prototype.drawGraph.call(this)
            : this.graph && (this.graph = this.graph.destroy());
        };
        e.defaultOptions = r(H.defaultOptions, a);
        return e;
      })(H);
      t(x.prototype, {
        drawTracker: B.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
      });
      C(x, "afterTranslate", function () {
        this.applyJitter();
      });
      g.registerSeriesType("scatter", x);
      return x;
    },
  );
  K(
    g,
    "Series/CenteredUtilities.js",
    [g["Core/Globals.js"], g["Core/Series/Series.js"], g["Core/Utilities.js"]],
    function (a, g, x) {
      var A = a.deg2rad,
        C = x.fireEvent,
        B = x.isNumber,
        H = x.pick,
        t = x.relativeLength,
        r;
      (function (a) {
        a.getCenter = function () {
          var a = this.options,
            d = this.chart,
            h = 2 * (a.slicedOffset || 0),
            m = d.plotWidth - 2 * h,
            k = d.plotHeight - 2 * h,
            l = a.center,
            r = Math.min(m, k),
            A = a.thickness,
            x = a.size,
            F = a.innerSize || 0;
          "string" === typeof x && (x = parseFloat(x));
          "string" === typeof F && (F = parseFloat(F));
          a = [
            H(l[0], "50%"),
            H(l[1], "50%"),
            H(x && 0 > x ? void 0 : a.size, "100%"),
            H(F && 0 > F ? void 0 : a.innerSize || 0, "0%"),
          ];
          !d.angular || this instanceof g || (a[3] = 0);
          for (l = 0; 4 > l; ++l)
            (x = a[l]),
              (d = 2 > l || (2 === l && /%$/.test(x))),
              (a[l] = t(x, [m, k, r, a[2]][l]) + (d ? h : 0));
          a[3] > a[2] && (a[3] = a[2]);
          B(A) && 2 * A < a[2] && 0 < A && (a[3] = a[2] - 2 * A);
          C(this, "afterGetCenter", { positions: a });
          return a;
        };
        a.getStartAndEndRadians = function (a, d) {
          a = B(a) ? a : 0;
          d = B(d) && d > a && 360 > d - a ? d : a + 360;
          return { start: A * (a + -90), end: A * (d + -90) };
        };
      })(r || (r = {}));
      ("");
      return r;
    },
  );
  K(
    g,
    "Series/Pie/PiePoint.js",
    [
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Series/Point.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x) {
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (d, e) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, d) {
                    a.__proto__ = d;
                  }) ||
                function (a, d) {
                  for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e]);
                };
              return a(d, e);
            };
            return function (d, e) {
              function g() {
                this.constructor = d;
              }
              a(d, e);
              d.prototype =
                null === e
                  ? Object.create(e)
                  : ((g.prototype = e.prototype), new g());
            };
          })(),
        C = a.setAnimation,
        B = x.addEvent,
        H = x.defined;
      a = x.extend;
      var t = x.isNumber,
        r = x.pick,
        l = x.relativeLength;
      g = (function (a) {
        function d() {
          var d = (null !== a && a.apply(this, arguments)) || this;
          d.labelDistance = void 0;
          d.options = void 0;
          d.series = void 0;
          return d;
        }
        A(d, a);
        d.prototype.getConnectorPath = function () {
          var a = this.labelPosition,
            d = this.series.options.dataLabels,
            e = this.connectorShapes,
            g = d.connectorShape;
          e[g] && (g = e[g]);
          return g.call(
            this,
            { x: a.final.x, y: a.final.y, alignment: a.alignment },
            a.connectorPosition,
            d,
          );
        };
        d.prototype.getTranslate = function () {
          return this.sliced
            ? this.slicedTranslation
            : { translateX: 0, translateY: 0 };
        };
        d.prototype.haloPath = function (a) {
          var d = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                d.x,
                d.y,
                d.r + a,
                d.r + a,
                { innerR: d.r - 1, start: d.start, end: d.end },
              );
        };
        d.prototype.init = function () {
          var d = this;
          a.prototype.init.apply(this, arguments);
          this.name = r(this.name, "Slice");
          var e = function (a) {
            d.slice("select" === a.type);
          };
          B(this, "select", e);
          B(this, "unselect", e);
          return this;
        };
        d.prototype.isValid = function () {
          return t(this.y) && 0 <= this.y;
        };
        d.prototype.setVisible = function (a, d) {
          var e = this,
            g = this.series,
            h = g.chart,
            m = g.options.ignoreHiddenPoint;
          d = r(d, m);
          a !== this.visible &&
            ((this.visible =
              this.options.visible =
              a =
                "undefined" === typeof a ? !this.visible : a),
            (g.options.data[g.data.indexOf(this)] = this.options),
            ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(
              function (d) {
                if (e[d]) e[d][a ? "show" : "hide"](a);
              },
            ),
            this.legendItem && h.legend.colorizeItem(this, a),
            a || "hover" !== this.state || this.setState(""),
            m && (g.isDirty = !0),
            d && h.redraw());
        };
        d.prototype.slice = function (a, d, e) {
          var g = this.series;
          C(e, g.chart);
          r(d, !0);
          this.sliced = this.options.sliced = H(a) ? a : !this.sliced;
          g.options.data[g.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
          this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        };
        return d;
      })(g);
      a(g.prototype, {
        connectorShapes: {
          fixedOffset: function (a, d, g) {
            var e = d.breakAt;
            d = d.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              g.softConnector
                ? [
                    "C",
                    a.x + ("left" === a.alignment ? -5 : 5),
                    a.y,
                    2 * e.x - d.x,
                    2 * e.y - d.y,
                    e.x,
                    e.y,
                  ]
                : ["L", e.x, e.y],
              ["L", d.x, d.y],
            ];
          },
          straight: function (a, d) {
            d = d.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              ["L", d.x, d.y],
            ];
          },
          crookedLine: function (a, d, g) {
            d = d.touchingSliceAt;
            var e = this.series,
              h = e.center[0],
              p = e.chart.plotWidth,
              r = e.chart.plotLeft;
            e = a.alignment;
            var t = this.shapeArgs.r;
            g = l(g.crookDistance, 1);
            p =
              "left" === e
                ? h + t + (p + r - h - t) * (1 - g)
                : r + (h - t) * g;
            g = ["L", p, a.y];
            h = !0;
            if ("left" === e ? p > a.x || p < d.x : p < a.x || p > d.x) h = !1;
            a = [["M", a.x, a.y]];
            h && a.push(g);
            a.push(["L", d.x, d.y]);
            return a;
          },
        },
      });
      return g;
    },
  );
  K(g, "Series/Pie/PieSeriesDefaults.js", [], function () {
    "";
    return {
      center: [null, null],
      clip: !1,
      colorByPoint: !0,
      dataLabels: {
        allowOverlap: !0,
        connectorPadding: 5,
        connectorShape: "fixedOffset",
        crookDistance: "70%",
        distance: 30,
        enabled: !0,
        formatter: function () {
          return this.point.isNull ? void 0 : this.point.name;
        },
        softConnector: !0,
        x: 0,
      },
      fillColor: void 0,
      ignoreHiddenPoint: !0,
      inactiveOtherPoints: !0,
      legendType: "point",
      marker: null,
      size: null,
      showInLegend: !1,
      slicedOffset: 10,
      stickyTracking: !1,
      tooltip: { followPointer: !0 },
      borderColor: "#ffffff",
      borderWidth: 1,
      lineWidth: void 0,
      states: { hover: { brightness: 0.1 } },
    };
  });
  K(
    g,
    "Series/Pie/PieSeries.js",
    [
      g["Series/CenteredUtilities.js"],
      g["Series/Column/ColumnSeries.js"],
      g["Core/Globals.js"],
      g["Core/Legend/LegendSymbol.js"],
      g["Series/Pie/PiePoint.js"],
      g["Series/Pie/PieSeriesDefaults.js"],
      g["Core/Series/Series.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Renderer/SVG/Symbols.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C, B, H, t, r, l) {
      var e =
          (this && this.__extends) ||
          (function () {
            var a = function (d, e) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, d) {
                    a.__proto__ = d;
                  }) ||
                function (a, d) {
                  for (var c in d) d.hasOwnProperty(c) && (a[c] = d[c]);
                };
              return a(d, e);
            };
            return function (d, e) {
              function c() {
                this.constructor = d;
              }
              a(d, e);
              d.prototype =
                null === e
                  ? Object.create(e)
                  : ((c.prototype = e.prototype), new c());
            };
          })(),
        d = a.getStartAndEndRadians;
      x = x.noop;
      var h = l.clamp,
        m = l.extend,
        k = l.fireEvent,
        p = l.merge,
        A = l.pick,
        I = l.relativeLength;
      l = (function (a) {
        function g() {
          var d = (null !== a && a.apply(this, arguments)) || this;
          d.center = void 0;
          d.data = void 0;
          d.maxLabelDistance = void 0;
          d.options = void 0;
          d.points = void 0;
          return d;
        }
        e(g, a);
        g.prototype.animate = function (a) {
          var c = this,
            d = c.points,
            e = c.startAngleRad;
          a ||
            d.forEach(function (a) {
              var b = a.graphic,
                d = a.shapeArgs;
              b &&
                d &&
                (b.attr({
                  r: A(a.startR, c.center && c.center[3] / 2),
                  start: e,
                  end: e,
                }),
                b.animate(
                  { r: d.r, start: d.start, end: d.end },
                  c.options.animation,
                ));
            });
        };
        g.prototype.drawEmpty = function () {
          var a = this.startAngleRad,
            c = this.endAngleRad,
            d = this.options;
          if (0 === this.total && this.center) {
            var e = this.center[0];
            var g = this.center[1];
            this.graph ||
              (this.graph = this.chart.renderer
                .arc(e, g, this.center[1] / 2, 0, a, c)
                .addClass("highcharts-empty-series")
                .add(this.group));
            this.graph.attr({
              d: r.arc(e, g, this.center[2] / 2, 0, {
                start: a,
                end: c,
                innerR: this.center[3] / 2,
              }),
            });
            this.chart.styledMode ||
              this.graph.attr({
                "stroke-width": d.borderWidth,
                fill: d.fillColor || "none",
                stroke: d.color || "#cccccc",
              });
          } else this.graph && (this.graph = this.graph.destroy());
        };
        g.prototype.drawPoints = function () {
          var a = this.chart.renderer;
          this.points.forEach(function (c) {
            c.graphic &&
              c.hasNewShapeType() &&
              (c.graphic = c.graphic.destroy());
            c.graphic ||
              ((c.graphic = a[c.shapeType](c.shapeArgs).add(c.series.group)),
              (c.delayedRendering = !0));
          });
        };
        g.prototype.generatePoints = function () {
          a.prototype.generatePoints.call(this);
          this.updateTotals();
        };
        g.prototype.getX = function (a, c, d) {
          var e = this.center,
            g = this.radii ? this.radii[d.index] || 0 : e[2] / 2;
          a = Math.asin(h((a - e[1]) / (g + d.labelDistance), -1, 1));
          return (
            e[0] +
            (c ? -1 : 1) * Math.cos(a) * (g + d.labelDistance) +
            (0 < d.labelDistance
              ? (c ? -1 : 1) * this.options.dataLabels.padding
              : 0)
          );
        };
        g.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        g.prototype.redrawPoints = function () {
          var a = this,
            c = a.chart,
            d = c.renderer,
            e = a.options.shadow,
            g,
            b,
            h,
            k;
          this.drawEmpty();
          !e ||
            a.shadowGroup ||
            c.styledMode ||
            (a.shadowGroup = d.g("shadow").attr({ zIndex: -1 }).add(a.group));
          a.points.forEach(function (f) {
            var n = {};
            b = f.graphic;
            if (!f.isNull && b) {
              var l = void 0;
              k = f.shapeArgs;
              g = f.getTranslate();
              c.styledMode ||
                ((l = f.shadowGroup),
                e &&
                  !l &&
                  (l = f.shadowGroup = d.g("shadow").add(a.shadowGroup)),
                l && l.attr(g),
                (h = a.pointAttribs(f, f.selected && "select")));
              f.delayedRendering
                ? (b.setRadialReference(a.center).attr(k).attr(g),
                  c.styledMode ||
                    b.attr(h).attr({ "stroke-linejoin": "round" }).shadow(e, l),
                  (f.delayedRendering = !1))
                : (b.setRadialReference(a.center),
                  c.styledMode || p(!0, n, h),
                  p(!0, n, k, g),
                  b.animate(n));
              b.attr({ visibility: f.visible ? "inherit" : "hidden" });
              b.addClass(f.getClassName(), !0);
            } else b && (f.graphic = b.destroy());
          });
        };
        g.prototype.sortByAngle = function (a, c) {
          a.sort(function (a, d) {
            return "undefined" !== typeof a.angle && (d.angle - a.angle) * c;
          });
        };
        g.prototype.translate = function (a) {
          k(this, "translate");
          this.generatePoints();
          var c = this.options,
            e = c.slicedOffset,
            f = e + (c.borderWidth || 0),
            g = d(c.startAngle, c.endAngle),
            b = (this.startAngleRad = g.start);
          g = (this.endAngleRad = g.end) - b;
          var h = this.points,
            l = c.dataLabels.distance;
          c = c.ignoreHiddenPoint;
          var m = h.length,
            p,
            r = 0;
          a || (this.center = a = this.getCenter());
          for (p = 0; p < m; p++) {
            var t = h[p];
            var y = b + r * g;
            !t.isValid() || (c && !t.visible) || (r += t.percentage / 100);
            var x = b + r * g;
            var D = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * y) / 1e3,
              end: Math.round(1e3 * x) / 1e3,
            };
            t.shapeType = "arc";
            t.shapeArgs = D;
            t.labelDistance = A(
              t.options.dataLabels && t.options.dataLabels.distance,
              l,
            );
            t.labelDistance = I(t.labelDistance, D.r);
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              t.labelDistance,
            );
            x = (x + y) / 2;
            x > 1.5 * Math.PI
              ? (x -= 2 * Math.PI)
              : x < -Math.PI / 2 && (x += 2 * Math.PI);
            t.slicedTranslation = {
              translateX: Math.round(Math.cos(x) * e),
              translateY: Math.round(Math.sin(x) * e),
            };
            D = (Math.cos(x) * a[2]) / 2;
            var v = (Math.sin(x) * a[2]) / 2;
            t.tooltipPos = [a[0] + 0.7 * D, a[1] + 0.7 * v];
            t.half = x < -Math.PI / 2 || x > Math.PI / 2 ? 1 : 0;
            t.angle = x;
            y = Math.min(f, t.labelDistance / 5);
            t.labelPosition = {
              natural: {
                x: a[0] + D + Math.cos(x) * t.labelDistance,
                y: a[1] + v + Math.sin(x) * t.labelDistance,
              },
              final: {},
              alignment:
                0 > t.labelDistance ? "center" : t.half ? "right" : "left",
              connectorPosition: {
                breakAt: {
                  x: a[0] + D + Math.cos(x) * y,
                  y: a[1] + v + Math.sin(x) * y,
                },
                touchingSliceAt: { x: a[0] + D, y: a[1] + v },
              },
            };
          }
          k(this, "afterTranslate");
        };
        g.prototype.updateTotals = function () {
          var a = this.points,
            c = a.length,
            d = this.options.ignoreHiddenPoint,
            e,
            g = 0;
          for (e = 0; e < c; e++) {
            var b = a[e];
            !b.isValid() || (d && !b.visible) || (g += b.y);
          }
          this.total = g;
          for (e = 0; e < c; e++)
            (b = a[e]),
              (b.percentage = 0 < g && (b.visible || !d) ? (b.y / g) * 100 : 0),
              (b.total = g);
        };
        g.defaultOptions = p(H.defaultOptions, B);
        return g;
      })(H);
      m(l.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawLegendSymbol: F.drawRectangle,
        drawTracker: g.prototype.drawTracker,
        getCenter: a.getCenter,
        getSymbol: x,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: g.prototype.pointAttribs,
        pointClass: C,
        requireSorting: !1,
        searchPoint: x,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      t.registerSeriesType("pie", l);
      return l;
    },
  );
  K(
    g,
    "Series/Pie/PieDataLabel.js",
    [
      g["Core/Series/DataLabel.js"],
      g["Core/Globals.js"],
      g["Core/Renderer/RendererUtilities.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Core/Utilities.js"],
    ],
    function (a, g, x, F, C) {
      var A = g.noop,
        H = x.distribute,
        t = F.series,
        r = C.arrayMax,
        l = C.clamp,
        e = C.defined,
        d = C.merge,
        h = C.pick,
        m = C.relativeLength,
        k;
      (function (g) {
        function k() {
          var a = this,
            g = a.data,
            f = a.chart,
            k = a.options.dataLabels || {},
            b = k.connectorPadding,
            l = f.plotWidth,
            m = f.plotHeight,
            p = f.plotLeft,
            y = Math.round(f.chartWidth / 3),
            A = a.center,
            x = A[2] / 2,
            D = A[1],
            B = [[], []],
            E = [0, 0, 0, 0],
            v = a.dataLabelPositioners,
            C,
            F,
            I,
            L,
            G,
            K,
            M,
            X,
            R,
            V,
            Z,
            W;
          a.visible &&
            (k.enabled || a._hasPointLabels) &&
            (g.forEach(function (a) {
              a.dataLabel &&
                a.visible &&
                a.dataLabel.shortened &&
                (a.dataLabel
                  .attr({ width: "auto" })
                  .css({ width: "auto", textOverflow: "clip" }),
                (a.dataLabel.shortened = !1));
            }),
            t.prototype.drawDataLabels.apply(a),
            g.forEach(function (a) {
              a.dataLabel &&
                (a.visible
                  ? (B[a.half].push(a),
                    (a.dataLabel._pos = null),
                    !e(k.style.width) &&
                      !e(
                        a.options.dataLabels &&
                          a.options.dataLabels.style &&
                          a.options.dataLabels.style.width,
                      ) &&
                      a.dataLabel.getBBox().width > y &&
                      (a.dataLabel.css({ width: Math.round(0.7 * y) + "px" }),
                      (a.dataLabel.shortened = !0)))
                  : ((a.dataLabel = a.dataLabel.destroy()),
                    a.dataLabels &&
                      1 === a.dataLabels.length &&
                      delete a.dataLabels));
            }),
            B.forEach(function (c, d) {
              var g = c.length,
                n = [],
                q;
              if (g) {
                a.sortByAngle(c, d - 0.5);
                if (0 < a.maxLabelDistance) {
                  var r = Math.max(0, D - x - a.maxLabelDistance);
                  var t = Math.min(D + x + a.maxLabelDistance, f.plotHeight);
                  c.forEach(function (a) {
                    0 < a.labelDistance &&
                      a.dataLabel &&
                      ((a.top = Math.max(0, D - x - a.labelDistance)),
                      (a.bottom = Math.min(
                        D + x + a.labelDistance,
                        f.plotHeight,
                      )),
                      (q = a.dataLabel.getBBox().height || 21),
                      (a.distributeBox = {
                        target: a.labelPosition.natural.y - a.top + q / 2,
                        size: q,
                        rank: a.y,
                      }),
                      n.push(a.distributeBox));
                  });
                  r = t + q - r;
                  H(n, r, r / 5);
                }
                for (Z = 0; Z < g; Z++) {
                  C = c[Z];
                  K = C.labelPosition;
                  L = C.dataLabel;
                  V = !1 === C.visible ? "hidden" : "inherit";
                  R = r = K.natural.y;
                  n &&
                    e(C.distributeBox) &&
                    ("undefined" === typeof C.distributeBox.pos
                      ? (V = "hidden")
                      : ((M = C.distributeBox.size),
                        (R = v.radialDistributionY(C))));
                  delete C.positionIndex;
                  if (k.justify) X = v.justify(C, x, A);
                  else
                    switch (k.alignTo) {
                      case "connectors":
                        X = v.alignToConnectors(c, d, l, p);
                        break;
                      case "plotEdges":
                        X = v.alignToPlotEdges(L, d, l, p);
                        break;
                      default:
                        X = v.radialDistributionX(a, C, R, r);
                    }
                  L._attr = { visibility: V, align: K.alignment };
                  W = C.options.dataLabels || {};
                  L._pos = {
                    x:
                      X +
                      h(W.x, k.x) +
                      ({ left: b, right: -b }[K.alignment] || 0),
                    y: R + h(W.y, k.y) - 10,
                  };
                  K.final.x = X;
                  K.final.y = R;
                  h(k.crop, !0) &&
                    ((G = L.getBBox().width),
                    (r = null),
                    X - G < b && 1 === d
                      ? ((r = Math.round(G - X + b)),
                        (E[3] = Math.max(r, E[3])))
                      : X + G > l - b &&
                        0 === d &&
                        ((r = Math.round(X + G - l + b)),
                        (E[1] = Math.max(r, E[1]))),
                    0 > R - M / 2
                      ? (E[0] = Math.max(Math.round(-R + M / 2), E[0]))
                      : R + M / 2 > m &&
                        (E[2] = Math.max(Math.round(R + M / 2 - m), E[2])),
                    (L.sideOverflow = r));
                }
              }
            }),
            0 === r(E) || this.verifyDataLabelOverflow(E)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (b) {
              W = d(k, b.options.dataLabels);
              if ((F = h(W.connectorWidth, 1))) {
                var c;
                I = b.connector;
                if (
                  (L = b.dataLabel) &&
                  L._pos &&
                  b.visible &&
                  0 < b.labelDistance
                ) {
                  V = L._attr.visibility;
                  if ((c = !I))
                    (b.connector = I =
                      f.renderer
                        .path()
                        .addClass(
                          "highcharts-data-label-connector  highcharts-color-" +
                            b.colorIndex +
                            (b.className ? " " + b.className : ""),
                        )
                        .add(a.dataLabelsGroup)),
                      f.styledMode ||
                        I.attr({
                          "stroke-width": F,
                          stroke: W.connectorColor || b.color || "#666666",
                        });
                  I[c ? "attr" : "animate"]({ d: b.getConnectorPath() });
                  I.attr("visibility", V);
                } else I && (b.connector = I.destroy());
              }
            }));
        }
        function p() {
          this.points.forEach(function (a) {
            var c = a.dataLabel,
              d;
            c &&
              a.visible &&
              ((d = c._pos)
                ? (c.sideOverflow &&
                    ((c._attr.width = Math.max(
                      c.getBBox().width - c.sideOverflow,
                      0,
                    )),
                    c.css({
                      width: c._attr.width + "px",
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow ||
                        "ellipsis",
                    }),
                    (c.shortened = !0)),
                  c.attr(c._attr),
                  c[c.moved ? "animate" : "attr"](d),
                  (c.moved = !0))
                : c && c.attr({ y: -9999 }));
            delete a.distributeBox;
          }, this);
        }
        function x(a) {
          var c = this.center,
            d = this.options,
            e = d.center,
            b = d.minSize || 80,
            g = null !== d.size;
          if (!g) {
            if (null !== e[0]) var h = Math.max(c[2] - Math.max(a[1], a[3]), b);
            else
              (h = Math.max(c[2] - a[1] - a[3], b)),
                (c[0] += (a[3] - a[1]) / 2);
            null !== e[1]
              ? (h = l(h, b, c[2] - Math.max(a[0], a[2])))
              : ((h = l(h, b, c[2] - a[0] - a[2])),
                (c[1] += (a[0] - a[2]) / 2));
            h < c[2]
              ? ((c[2] = h),
                (c[3] = Math.min(
                  d.thickness
                    ? Math.max(0, h - 2 * d.thickness)
                    : Math.max(0, m(d.innerSize || 0, h)),
                  h,
                )),
                this.translate(c),
                this.drawDataLabels && this.drawDataLabels())
              : (g = !0);
          }
          return g;
        }
        var B = [],
          y = {
            radialDistributionY: function (a) {
              return a.top + a.distributeBox.pos;
            },
            radialDistributionX: function (a, d, e, g) {
              return a.getX(
                e < d.top + 2 || e > d.bottom - 2 ? g : e,
                d.half,
                d,
              );
            },
            justify: function (a, d, e) {
              return e[0] + (a.half ? -1 : 1) * (d + a.labelDistance);
            },
            alignToPlotEdges: function (a, d, e, g) {
              a = a.getBBox().width;
              return d ? a + g : e - a - g;
            },
            alignToConnectors: function (a, d, e, g) {
              var b = 0,
                c;
              a.forEach(function (a) {
                c = a.dataLabel.getBBox().width;
                c > b && (b = c);
              });
              return d ? b + g : e - b - g;
            },
          };
        g.compose = function (c) {
          a.compose(t);
          -1 === B.indexOf(c) &&
            (B.push(c),
            (c = c.prototype),
            (c.dataLabelPositioners = y),
            (c.alignDataLabel = A),
            (c.drawDataLabels = k),
            (c.placeDataLabels = p),
            (c.verifyDataLabelOverflow = x));
        };
      })(k || (k = {}));
      return k;
    },
  );
  K(
    g,
    "Extensions/OverlappingDataLabels.js",
    [g["Core/Chart/Chart.js"], g["Core/Utilities.js"]],
    function (a, g) {
      function A(a, e) {
        var d = !1;
        if (a) {
          var g = a.newOpacity;
          a.oldOpacity !== g &&
            (a.alignAttr && a.placed
              ? (a[g ? "removeClass" : "addClass"](
                  "highcharts-data-label-hidden",
                ),
                (d = !0),
                (a.alignAttr.opacity = g),
                a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function () {
                  e.styledMode || a.css({ pointerEvents: g ? "auto" : "none" });
                }),
                C(e, "afterHideOverlappingLabel"))
              : a.attr({ opacity: g }));
          a.isOld = !0;
        }
        return d;
      }
      var F = g.addEvent,
        C = g.fireEvent,
        B = g.isArray,
        H = g.isNumber,
        t = g.objectEach,
        r = g.pick;
      F(a, "render", function () {
        var a = this,
          e = [];
        (this.labelCollectors || []).forEach(function (a) {
          e = e.concat(a());
        });
        (this.yAxis || []).forEach(function (a) {
          a.stacking &&
            a.options.stackLabels &&
            !a.options.stackLabels.allowOverlap &&
            t(a.stacking.stacks, function (a) {
              t(a, function (a) {
                a.label && e.push(a.label);
              });
            });
        });
        (this.series || []).forEach(function (d) {
          var g = d.options.dataLabels;
          d.visible &&
            (!1 !== g.enabled || d._hasPointLabels) &&
            ((g = function (d) {
              return d.forEach(function (d) {
                d.visible &&
                  (B(d.dataLabels)
                    ? d.dataLabels
                    : d.dataLabel
                      ? [d.dataLabel]
                      : []
                  ).forEach(function (g) {
                    var h = g.options;
                    g.labelrank = r(
                      h.labelrank,
                      d.labelrank,
                      d.shapeArgs && d.shapeArgs.height,
                    );
                    h.allowOverlap
                      ? ((g.oldOpacity = g.opacity),
                        (g.newOpacity = 1),
                        A(g, a))
                      : e.push(g);
                  });
              });
            }),
            g(d.nodes || []),
            g(d.points));
        });
        this.hideOverlappingLabels(e);
      });
      a.prototype.hideOverlappingLabels = function (a) {
        var e = this,
          d = a.length,
          g = e.renderer,
          l,
          k,
          p,
          r = !1;
        var t = function (a) {
          var c,
            d = a.box ? 0 : a.padding || 0,
            e = (c = 0),
            h;
          if (a && (!a.alignAttr || a.placed)) {
            var b = a.alignAttr || { x: a.attr("x"), y: a.attr("y") };
            var k = a.parentGroup;
            a.width ||
              ((c = a.getBBox()),
              (a.width = c.width),
              (a.height = c.height),
              (c = g.fontMetrics(null, a.element).h));
            var l = a.width - 2 * d;
            (h = { left: "0", center: "0.5", right: "1" }[a.alignValue])
              ? (e = +h * l)
              : H(a.x) &&
                Math.round(a.x) !== a.translateX &&
                (e = a.x - a.translateX);
            return {
              x: b.x + (k.translateX || 0) + d - (e || 0),
              y: b.y + (k.translateY || 0) + d - c,
              width: a.width - 2 * d,
              height: a.height - 2 * d,
            };
          }
        };
        for (k = 0; k < d; k++)
          if ((l = a[k]))
            (l.oldOpacity = l.opacity),
              (l.newOpacity = 1),
              (l.absoluteBox = t(l));
        a.sort(function (a, c) {
          return (c.labelrank || 0) - (a.labelrank || 0);
        });
        for (k = 0; k < d; k++) {
          var x = (t = a[k]) && t.absoluteBox;
          for (l = k + 1; l < d; ++l) {
            var B = (p = a[l]) && p.absoluteBox;
            !x ||
              !B ||
              t === p ||
              0 === t.newOpacity ||
              0 === p.newOpacity ||
              "hidden" === t.visibility ||
              "hidden" === p.visibility ||
              B.x >= x.x + x.width ||
              B.x + B.width <= x.x ||
              B.y >= x.y + x.height ||
              B.y + B.height <= x.y ||
              ((t.labelrank < p.labelrank ? t : p).newOpacity = 0);
          }
        }
        a.forEach(function (a) {
          A(a, e) && (r = !0);
        });
        r && C(e, "afterHideAllOverlappingLabels");
      };
    },
  );
  K(g, "Core/Responsive.js", [g["Core/Utilities.js"]], function (a) {
    var g = a.extend,
      x = a.find,
      F = a.isArray,
      C = a.isObject,
      B = a.merge,
      H = a.objectEach,
      t = a.pick,
      r = a.splat,
      l = a.uniqueKey,
      e;
    (function (a) {
      var d = [];
      a.compose = function (a) {
        -1 === d.indexOf(a) && (d.push(a), g(a.prototype, e.prototype));
        return a;
      };
      var e = (function () {
        function a() {}
        a.prototype.currentOptions = function (a) {
          function d(a, g, c, h) {
            var f;
            H(a, function (a, b) {
              if (!h && -1 < e.collectionsWithUpdate.indexOf(b) && g[b])
                for (
                  a = r(a), c[b] = [], f = 0;
                  f < Math.max(a.length, g[b].length);
                  f++
                )
                  g[b][f] &&
                    (void 0 === a[f]
                      ? (c[b][f] = g[b][f])
                      : ((c[b][f] = {}), d(a[f], g[b][f], c[b][f], h + 1)));
              else
                C(a)
                  ? ((c[b] = F(a) ? [] : {}), d(a, g[b] || {}, c[b], h + 1))
                  : (c[b] = "undefined" === typeof g[b] ? null : g[b]);
            });
          }
          var e = this,
            g = {};
          d(a, this.options, g, 0);
          return g;
        };
        a.prototype.matchResponsiveRule = function (a, d) {
          var e = a.condition;
          (
            e.callback ||
            function () {
              return (
                this.chartWidth <= t(e.maxWidth, Number.MAX_VALUE) &&
                this.chartHeight <= t(e.maxHeight, Number.MAX_VALUE) &&
                this.chartWidth >= t(e.minWidth, 0) &&
                this.chartHeight >= t(e.minHeight, 0)
              );
            }
          ).call(this) && d.push(a._id);
        };
        a.prototype.setResponsive = function (a, d) {
          var e = this,
            g = this.options.responsive,
            h = this.currentResponsive,
            k = [];
          !d &&
            g &&
            g.rules &&
            g.rules.forEach(function (a) {
              "undefined" === typeof a._id && (a._id = l());
              e.matchResponsiveRule(a, k);
            }, this);
          d = B.apply(
            void 0,
            k
              .map(function (a) {
                return x((g || {}).rules || [], function (c) {
                  return c._id === a;
                });
              })
              .map(function (a) {
                return a && a.chartOptions;
              }),
          );
          d.isResponsiveOptions = !0;
          k = k.toString() || void 0;
          k !== (h && h.ruleIds) &&
            (h && this.update(h.undoOptions, a, !0),
            k
              ? ((h = this.currentOptions(d)),
                (h.isResponsiveOptions = !0),
                (this.currentResponsive = {
                  ruleIds: k,
                  mergedOptions: d,
                  undoOptions: h,
                }),
                this.update(d, a, !0))
              : (this.currentResponsive = void 0));
        };
        return a;
      })();
    })(e || (e = {}));
    ("");
    ("");
    return e;
  });
  K(
    g,
    "masters/highcharts.src.js",
    [
      g["Core/Globals.js"],
      g["Core/Utilities.js"],
      g["Core/Defaults.js"],
      g["Core/Animation/Fx.js"],
      g["Core/Animation/AnimationUtilities.js"],
      g["Core/Renderer/HTML/AST.js"],
      g["Core/FormatUtilities.js"],
      g["Core/Renderer/RendererUtilities.js"],
      g["Core/Renderer/SVG/SVGElement.js"],
      g["Core/Renderer/SVG/SVGRenderer.js"],
      g["Core/Renderer/HTML/HTMLElement.js"],
      g["Core/Renderer/HTML/HTMLRenderer.js"],
      g["Core/Axis/Axis.js"],
      g["Core/Axis/DateTimeAxis.js"],
      g["Core/Axis/LogarithmicAxis.js"],
      g["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
      g["Core/Axis/Tick.js"],
      g["Core/Tooltip.js"],
      g["Core/Series/Point.js"],
      g["Core/Pointer.js"],
      g["Core/MSPointer.js"],
      g["Core/Legend/Legend.js"],
      g["Core/Chart/Chart.js"],
      g["Core/Axis/Stacking/StackingAxis.js"],
      g["Core/Axis/Stacking/StackItem.js"],
      g["Core/Series/Series.js"],
      g["Core/Series/SeriesRegistry.js"],
      g["Series/Column/ColumnSeries.js"],
      g["Series/Column/ColumnDataLabel.js"],
      g["Series/Pie/PieSeries.js"],
      g["Series/Pie/PieDataLabel.js"],
      g["Core/Series/DataLabel.js"],
      g["Core/Responsive.js"],
      g["Core/Color/Color.js"],
      g["Core/Time.js"],
    ],
    function (
      a,
      g,
      x,
      F,
      C,
      B,
      H,
      t,
      r,
      l,
      e,
      d,
      h,
      m,
      k,
      p,
      D,
      I,
      E,
      L,
      y,
      c,
      w,
      f,
      n,
      b,
      u,
      z,
      q,
      K,
      J,
      O,
      Q,
      T,
      Y,
    ) {
      a.animate = C.animate;
      a.animObject = C.animObject;
      a.getDeferredAnimation = C.getDeferredAnimation;
      a.setAnimation = C.setAnimation;
      a.stop = C.stop;
      a.timers = F.timers;
      a.AST = B;
      a.Axis = h;
      a.Chart = w;
      a.chart = w.chart;
      a.Fx = F;
      a.Legend = c;
      a.PlotLineOrBand = p;
      a.Point = E;
      a.Pointer = y.isRequired() ? y : L;
      a.Series = b;
      a.StackItem = n;
      a.SVGElement = r;
      a.SVGRenderer = l;
      a.Tick = D;
      a.Time = Y;
      a.Tooltip = I;
      a.Color = T;
      a.color = T.parse;
      d.compose(l);
      e.compose(r);
      a.defaultOptions = x.defaultOptions;
      a.getOptions = x.getOptions;
      a.time = x.defaultTime;
      a.setOptions = x.setOptions;
      a.dateFormat = H.dateFormat;
      a.format = H.format;
      a.numberFormat = H.numberFormat;
      a.addEvent = g.addEvent;
      a.arrayMax = g.arrayMax;
      a.arrayMin = g.arrayMin;
      a.attr = g.attr;
      a.clearTimeout = g.clearTimeout;
      a.correctFloat = g.correctFloat;
      a.createElement = g.createElement;
      a.css = g.css;
      a.defined = g.defined;
      a.destroyObjectProperties = g.destroyObjectProperties;
      a.discardElement = g.discardElement;
      a.distribute = t.distribute;
      a.erase = g.erase;
      a.error = g.error;
      a.extend = g.extend;
      a.extendClass = g.extendClass;
      a.find = g.find;
      a.fireEvent = g.fireEvent;
      a.getMagnitude = g.getMagnitude;
      a.getStyle = g.getStyle;
      a.inArray = g.inArray;
      a.isArray = g.isArray;
      a.isClass = g.isClass;
      a.isDOMElement = g.isDOMElement;
      a.isFunction = g.isFunction;
      a.isNumber = g.isNumber;
      a.isObject = g.isObject;
      a.isString = g.isString;
      a.keys = g.keys;
      a.merge = g.merge;
      a.normalizeTickInterval = g.normalizeTickInterval;
      a.objectEach = g.objectEach;
      a.offset = g.offset;
      a.pad = g.pad;
      a.pick = g.pick;
      a.pInt = g.pInt;
      a.relativeLength = g.relativeLength;
      a.removeEvent = g.removeEvent;
      a.seriesType = u.seriesType;
      a.splat = g.splat;
      a.stableSort = g.stableSort;
      a.syncTimeout = g.syncTimeout;
      a.timeUnits = g.timeUnits;
      a.uniqueKey = g.uniqueKey;
      a.useSerialIds = g.useSerialIds;
      a.wrap = g.wrap;
      q.compose(z);
      O.compose(b);
      m.compose(h);
      k.compose(h);
      J.compose(K);
      p.compose(h);
      Q.compose(w);
      f.compose(h, w, b);
      return a;
    },
  );
  g["masters/highcharts.src.js"]._modules = g;
  return g["masters/highcharts.src.js"];
});
//# sourceMappingURL=highcharts.js.map
