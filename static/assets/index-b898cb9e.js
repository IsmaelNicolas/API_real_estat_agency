function If(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const o = Object.getOwnPropertyDescriptor(r, l);
          o &&
            Object.defineProperty(
              e,
              l,
              o.get ? o : { enumerable: !0, get: () => r[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerpolicy && (o.referrerPolicy = l.referrerpolicy),
      l.crossorigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossorigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function Af(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var jr = {},
  Uf = {
    get exports() {
      return jr;
    },
    set exports(e) {
      jr = e;
    },
  },
  mo = {},
  N = {},
  Bf = {
    get exports() {
      return N;
    },
    set exports(e) {
      N = e;
    },
  },
  W = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tl = Symbol.for("react.element"),
  $f = Symbol.for("react.portal"),
  Hf = Symbol.for("react.fragment"),
  Vf = Symbol.for("react.strict_mode"),
  Wf = Symbol.for("react.profiler"),
  Qf = Symbol.for("react.provider"),
  Kf = Symbol.for("react.context"),
  Yf = Symbol.for("react.forward_ref"),
  Gf = Symbol.for("react.suspense"),
  Xf = Symbol.for("react.memo"),
  Jf = Symbol.for("react.lazy"),
  Su = Symbol.iterator;
function Zf(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Su && e[Su]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ec = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  tc = Object.assign,
  nc = {};
function Zn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = nc),
    (this.updater = n || ec);
}
Zn.prototype.isReactComponent = {};
Zn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Zn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function rc() {}
rc.prototype = Zn.prototype;
function ga(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = nc),
    (this.updater = n || ec);
}
var ya = (ga.prototype = new rc());
ya.constructor = ga;
tc(ya, Zn.prototype);
ya.isPureReactComponent = !0;
var Eu = Array.isArray,
  lc = Object.prototype.hasOwnProperty,
  wa = { current: null },
  oc = { key: !0, ref: !0, __self: !0, __source: !0 };
function ic(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      lc.call(t, r) && !oc.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), s = 0; s < a; s++) u[s] = arguments[s + 2];
    l.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) l[r] === void 0 && (l[r] = a[r]);
  return {
    $$typeof: tl,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: wa.current,
  };
}
function qf(e, t) {
  return {
    $$typeof: tl,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function xa(e) {
  return typeof e == "object" && e !== null && e.$$typeof === tl;
}
function bf(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var ku = /\/+/g;
function Vo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? bf("" + e.key)
    : t.toString(36);
}
function Ll(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case tl:
          case $f:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + Vo(i, 0) : r),
      Eu(l)
        ? ((n = ""),
          e != null && (n = e.replace(ku, "$&/") + "/"),
          Ll(l, t, n, "", function (s) {
            return s;
          }))
        : l != null &&
          (xa(l) &&
            (l = qf(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(ku, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), Eu(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var u = r + Vo(o, a);
      i += Ll(o, t, n, u, l);
    }
  else if (((u = Zf(e)), typeof u == "function"))
    for (e = u.call(e), a = 0; !(o = e.next()).done; )
      (o = o.value), (u = r + Vo(o, a++)), (i += Ll(o, t, n, u, l));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function pl(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Ll(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function ep(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Me = { current: null },
  Dl = { transition: null },
  tp = {
    ReactCurrentDispatcher: Me,
    ReactCurrentBatchConfig: Dl,
    ReactCurrentOwner: wa,
  };
W.Children = {
  map: pl,
  forEach: function (e, t, n) {
    pl(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      pl(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      pl(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!xa(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
W.Component = Zn;
W.Fragment = Hf;
W.Profiler = Wf;
W.PureComponent = ga;
W.StrictMode = Vf;
W.Suspense = Gf;
W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tp;
W.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = tc({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = wa.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (u in t)
      lc.call(t, u) &&
        !oc.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var s = 0; s < u; s++) a[s] = arguments[s + 2];
    r.children = a;
  }
  return { $$typeof: tl, type: e.type, key: l, ref: o, props: r, _owner: i };
};
W.createContext = function (e) {
  return (
    (e = {
      $$typeof: Kf,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Qf, _context: e }),
    (e.Consumer = e)
  );
};
W.createElement = ic;
W.createFactory = function (e) {
  var t = ic.bind(null, e);
  return (t.type = e), t;
};
W.createRef = function () {
  return { current: null };
};
W.forwardRef = function (e) {
  return { $$typeof: Yf, render: e };
};
W.isValidElement = xa;
W.lazy = function (e) {
  return { $$typeof: Jf, _payload: { _status: -1, _result: e }, _init: ep };
};
W.memo = function (e, t) {
  return { $$typeof: Xf, type: e, compare: t === void 0 ? null : t };
};
W.startTransition = function (e) {
  var t = Dl.transition;
  Dl.transition = {};
  try {
    e();
  } finally {
    Dl.transition = t;
  }
};
W.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
W.useCallback = function (e, t) {
  return Me.current.useCallback(e, t);
};
W.useContext = function (e) {
  return Me.current.useContext(e);
};
W.useDebugValue = function () {};
W.useDeferredValue = function (e) {
  return Me.current.useDeferredValue(e);
};
W.useEffect = function (e, t) {
  return Me.current.useEffect(e, t);
};
W.useId = function () {
  return Me.current.useId();
};
W.useImperativeHandle = function (e, t, n) {
  return Me.current.useImperativeHandle(e, t, n);
};
W.useInsertionEffect = function (e, t) {
  return Me.current.useInsertionEffect(e, t);
};
W.useLayoutEffect = function (e, t) {
  return Me.current.useLayoutEffect(e, t);
};
W.useMemo = function (e, t) {
  return Me.current.useMemo(e, t);
};
W.useReducer = function (e, t, n) {
  return Me.current.useReducer(e, t, n);
};
W.useRef = function (e) {
  return Me.current.useRef(e);
};
W.useState = function (e) {
  return Me.current.useState(e);
};
W.useSyncExternalStore = function (e, t, n) {
  return Me.current.useSyncExternalStore(e, t, n);
};
W.useTransition = function () {
  return Me.current.useTransition();
};
W.version = "18.2.0";
(function (e) {
  e.exports = W;
})(Bf);
const St = Af(N),
  wi = If({ __proto__: null, default: St }, [N]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var np = N,
  rp = Symbol.for("react.element"),
  lp = Symbol.for("react.fragment"),
  op = Object.prototype.hasOwnProperty,
  ip = np.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  ap = { key: !0, ref: !0, __self: !0, __source: !0 };
function ac(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) op.call(t, r) && !ap.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: rp,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: ip.current,
  };
}
mo.Fragment = lp;
mo.jsx = ac;
mo.jsxs = ac;
(function (e) {
  e.exports = mo;
})(Uf);
const Hl = jr.Fragment,
  d = jr.jsx,
  R = jr.jsxs;
var xi = {},
  Si = {},
  up = {
    get exports() {
      return Si;
    },
    set exports(e) {
      Si = e;
    },
  },
  $e = {},
  Ei = {},
  sp = {
    get exports() {
      return Ei;
    },
    set exports(e) {
      Ei = e;
    },
  },
  uc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(M, A) {
    var H = M.length;
    M.push(A);
    e: for (; 0 < H; ) {
      var Y = (H - 1) >>> 1,
        ce = M[Y];
      if (0 < l(ce, A)) (M[Y] = A), (M[H] = ce), (H = Y);
      else break e;
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0];
  }
  function r(M) {
    if (M.length === 0) return null;
    var A = M[0],
      H = M.pop();
    if (H !== A) {
      M[0] = H;
      e: for (var Y = 0, ce = M.length, wn = ce >>> 1; Y < wn; ) {
        var at = 2 * (Y + 1) - 1,
          rr = M[at],
          ht = at + 1,
          xn = M[ht];
        if (0 > l(rr, H))
          ht < ce && 0 > l(xn, rr)
            ? ((M[Y] = xn), (M[ht] = H), (Y = ht))
            : ((M[Y] = rr), (M[at] = H), (Y = at));
        else if (ht < ce && 0 > l(xn, H)) (M[Y] = xn), (M[ht] = H), (Y = ht);
        else break e;
      }
    }
    return A;
  }
  function l(M, A) {
    var H = M.sortIndex - A.sortIndex;
    return H !== 0 ? H : M.id - A.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      a = i.now();
    e.unstable_now = function () {
      return i.now() - a;
    };
  }
  var u = [],
    s = [],
    h = 1,
    v = null,
    c = 3,
    g = !1,
    S = !1,
    x = !1,
    P = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(M) {
    for (var A = n(s); A !== null; ) {
      if (A.callback === null) r(s);
      else if (A.startTime <= M)
        r(s), (A.sortIndex = A.expirationTime), t(u, A);
      else break;
      A = n(s);
    }
  }
  function y(M) {
    if (((x = !1), m(M), !S))
      if (n(u) !== null) (S = !0), nr(_);
      else {
        var A = n(s);
        A !== null && se(y, A.startTime - M);
      }
  }
  function _(M, A) {
    (S = !1), x && ((x = !1), p(O), (O = -1)), (g = !0);
    var H = c;
    try {
      for (
        m(A), v = n(u);
        v !== null && (!(v.expirationTime > A) || (M && !ae()));

      ) {
        var Y = v.callback;
        if (typeof Y == "function") {
          (v.callback = null), (c = v.priorityLevel);
          var ce = Y(v.expirationTime <= A);
          (A = e.unstable_now()),
            typeof ce == "function" ? (v.callback = ce) : v === n(u) && r(u),
            m(A);
        } else r(u);
        v = n(u);
      }
      if (v !== null) var wn = !0;
      else {
        var at = n(s);
        at !== null && se(y, at.startTime - A), (wn = !1);
      }
      return wn;
    } finally {
      (v = null), (c = H), (g = !1);
    }
  }
  var z = !1,
    T = null,
    O = -1,
    J = 5,
    U = -1;
  function ae() {
    return !(e.unstable_now() - U < J);
  }
  function Je() {
    if (T !== null) {
      var M = e.unstable_now();
      U = M;
      var A = !0;
      try {
        A = T(!0, M);
      } finally {
        A ? pt() : ((z = !1), (T = null));
      }
    } else z = !1;
  }
  var pt;
  if (typeof f == "function")
    pt = function () {
      f(Je);
    };
  else if (typeof MessageChannel < "u") {
    var ul = new MessageChannel(),
      Io = ul.port2;
    (ul.port1.onmessage = Je),
      (pt = function () {
        Io.postMessage(null);
      });
  } else
    pt = function () {
      P(Je, 0);
    };
  function nr(M) {
    (T = M), z || ((z = !0), pt());
  }
  function se(M, A) {
    O = P(function () {
      M(e.unstable_now());
    }, A);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || g || ((S = !0), nr(_));
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (J = 0 < M ? Math.floor(1e3 / M) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return c;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (M) {
      switch (c) {
        case 1:
        case 2:
        case 3:
          var A = 3;
          break;
        default:
          A = c;
      }
      var H = c;
      c = A;
      try {
        return M();
      } finally {
        c = H;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, A) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var H = c;
      c = M;
      try {
        return A();
      } finally {
        c = H;
      }
    }),
    (e.unstable_scheduleCallback = function (M, A, H) {
      var Y = e.unstable_now();
      switch (
        (typeof H == "object" && H !== null
          ? ((H = H.delay), (H = typeof H == "number" && 0 < H ? Y + H : Y))
          : (H = Y),
        M)
      ) {
        case 1:
          var ce = -1;
          break;
        case 2:
          ce = 250;
          break;
        case 5:
          ce = 1073741823;
          break;
        case 4:
          ce = 1e4;
          break;
        default:
          ce = 5e3;
      }
      return (
        (ce = H + ce),
        (M = {
          id: h++,
          callback: A,
          priorityLevel: M,
          startTime: H,
          expirationTime: ce,
          sortIndex: -1,
        }),
        H > Y
          ? ((M.sortIndex = H),
            t(s, M),
            n(u) === null &&
              M === n(s) &&
              (x ? (p(O), (O = -1)) : (x = !0), se(y, H - Y)))
          : ((M.sortIndex = ce), t(u, M), S || g || ((S = !0), nr(_))),
        M
      );
    }),
    (e.unstable_shouldYield = ae),
    (e.unstable_wrapCallback = function (M) {
      var A = c;
      return function () {
        var H = c;
        c = A;
        try {
          return M.apply(this, arguments);
        } finally {
          c = H;
        }
      };
    });
})(uc);
(function (e) {
  e.exports = uc;
})(sp);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sc = N,
  Be = Ei;
function k(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var cc = new Set(),
  Fr = {};
function vn(e, t) {
  Vn(e, t), Vn(e + "Capture", t);
}
function Vn(e, t) {
  for (Fr[e] = t, e = 0; e < t.length; e++) cc.add(t[e]);
}
var Ct = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ki = Object.prototype.hasOwnProperty,
  cp =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Cu = {},
  Nu = {};
function dp(e) {
  return ki.call(Nu, e)
    ? !0
    : ki.call(Cu, e)
    ? !1
    : cp.test(e)
    ? (Nu[e] = !0)
    : ((Cu[e] = !0), !1);
}
function fp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function pp(e, t, n, r) {
  if (t === null || typeof t > "u" || fp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Le(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var Se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Se[e] = new Le(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Se[t] = new Le(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Se[e] = new Le(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Se[e] = new Le(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Se[e] = new Le(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Se[e] = new Le(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Se[e] = new Le(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Se[e] = new Le(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Se[e] = new Le(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Sa = /[\-:]([a-z])/g;
function Ea(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Sa, Ea);
    Se[t] = new Le(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Sa, Ea);
    Se[t] = new Le(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Sa, Ea);
  Se[t] = new Le(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Se[e] = new Le(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Se.xlinkHref = new Le(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Se[e] = new Le(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ka(e, t, n, r) {
  var l = Se.hasOwnProperty(t) ? Se[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (pp(t, n, l, r) && (n = null),
    r || l === null
      ? dp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Mt = sc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  hl = Symbol.for("react.element"),
  kn = Symbol.for("react.portal"),
  Cn = Symbol.for("react.fragment"),
  Ca = Symbol.for("react.strict_mode"),
  Ci = Symbol.for("react.profiler"),
  dc = Symbol.for("react.provider"),
  fc = Symbol.for("react.context"),
  Na = Symbol.for("react.forward_ref"),
  Ni = Symbol.for("react.suspense"),
  _i = Symbol.for("react.suspense_list"),
  _a = Symbol.for("react.memo"),
  Tt = Symbol.for("react.lazy"),
  pc = Symbol.for("react.offscreen"),
  _u = Symbol.iterator;
function sr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (_u && e[_u]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var oe = Object.assign,
  Wo;
function wr(e) {
  if (Wo === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Wo = (t && t[1]) || "";
    }
  return (
    `
` +
    Wo +
    e
  );
}
var Qo = !1;
function Ko(e, t) {
  if (!e || Qo) return "";
  Qo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (s) {
          var r = s;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (s) {
          r = s;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (
        var l = s.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          a = o.length - 1;
        1 <= i && 0 <= a && l[i] !== o[a];

      )
        a--;
      for (; 1 <= i && 0 <= a; i--, a--)
        if (l[i] !== o[a]) {
          if (i !== 1 || a !== 1)
            do
              if ((i--, a--, 0 > a || l[i] !== o[a])) {
                var u =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= i && 0 <= a);
          break;
        }
    }
  } finally {
    (Qo = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? wr(e) : "";
}
function hp(e) {
  switch (e.tag) {
    case 5:
      return wr(e.type);
    case 16:
      return wr("Lazy");
    case 13:
      return wr("Suspense");
    case 19:
      return wr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Ko(e.type, !1)), e;
    case 11:
      return (e = Ko(e.type.render, !1)), e;
    case 1:
      return (e = Ko(e.type, !0)), e;
    default:
      return "";
  }
}
function Pi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Cn:
      return "Fragment";
    case kn:
      return "Portal";
    case Ci:
      return "Profiler";
    case Ca:
      return "StrictMode";
    case Ni:
      return "Suspense";
    case _i:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case fc:
        return (e.displayName || "Context") + ".Consumer";
      case dc:
        return (e._context.displayName || "Context") + ".Provider";
      case Na:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case _a:
        return (
          (t = e.displayName || null), t !== null ? t : Pi(e.type) || "Memo"
        );
      case Tt:
        (t = e._payload), (e = e._init);
        try {
          return Pi(e(t));
        } catch {}
    }
  return null;
}
function mp(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Pi(t);
    case 8:
      return t === Ca ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Xt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function hc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function vp(e) {
  var t = hc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function ml(e) {
  e._valueTracker || (e._valueTracker = vp(e));
}
function mc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = hc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Vl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ri(e, t) {
  var n = t.checked;
  return oe({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Pu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Xt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function vc(e, t) {
  (t = t.checked), t != null && ka(e, "checked", t, !1);
}
function Mi(e, t) {
  vc(e, t);
  var n = Xt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Li(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Li(e, t.type, Xt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Ru(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Li(e, t, n) {
  (t !== "number" || Vl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var xr = Array.isArray;
function Fn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Xt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Di(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return oe({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Mu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(k(92));
      if (xr(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Xt(n) };
}
function gc(e, t) {
  var n = Xt(t.value),
    r = Xt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Lu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function yc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function zi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? yc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var vl,
  wc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        vl = vl || document.createElement("div"),
          vl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = vl.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Ir(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Cr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  gp = ["Webkit", "ms", "Moz", "O"];
Object.keys(Cr).forEach(function (e) {
  gp.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Cr[t] = Cr[e]);
  });
});
function xc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Cr.hasOwnProperty(e) && Cr[e])
    ? ("" + t).trim()
    : t + "px";
}
function Sc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = xc(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var yp = oe(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Ti(e, t) {
  if (t) {
    if (yp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function Oi(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ji = null;
function Pa(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Fi = null,
  In = null,
  An = null;
function Du(e) {
  if ((e = ll(e))) {
    if (typeof Fi != "function") throw Error(k(280));
    var t = e.stateNode;
    t && ((t = xo(t)), Fi(e.stateNode, e.type, t));
  }
}
function Ec(e) {
  In ? (An ? An.push(e) : (An = [e])) : (In = e);
}
function kc() {
  if (In) {
    var e = In,
      t = An;
    if (((An = In = null), Du(e), t)) for (e = 0; e < t.length; e++) Du(t[e]);
  }
}
function Cc(e, t) {
  return e(t);
}
function Nc() {}
var Yo = !1;
function _c(e, t, n) {
  if (Yo) return e(t, n);
  Yo = !0;
  try {
    return Cc(e, t, n);
  } finally {
    (Yo = !1), (In !== null || An !== null) && (Nc(), kc());
  }
}
function Ar(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = xo(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
  return n;
}
var Ii = !1;
if (Ct)
  try {
    var cr = {};
    Object.defineProperty(cr, "passive", {
      get: function () {
        Ii = !0;
      },
    }),
      window.addEventListener("test", cr, cr),
      window.removeEventListener("test", cr, cr);
  } catch {
    Ii = !1;
  }
function wp(e, t, n, r, l, o, i, a, u) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, s);
  } catch (h) {
    this.onError(h);
  }
}
var Nr = !1,
  Wl = null,
  Ql = !1,
  Ai = null,
  xp = {
    onError: function (e) {
      (Nr = !0), (Wl = e);
    },
  };
function Sp(e, t, n, r, l, o, i, a, u) {
  (Nr = !1), (Wl = null), wp.apply(xp, arguments);
}
function Ep(e, t, n, r, l, o, i, a, u) {
  if ((Sp.apply(this, arguments), Nr)) {
    if (Nr) {
      var s = Wl;
      (Nr = !1), (Wl = null);
    } else throw Error(k(198));
    Ql || ((Ql = !0), (Ai = s));
  }
}
function gn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Pc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function zu(e) {
  if (gn(e) !== e) throw Error(k(188));
}
function kp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = gn(e)), t === null)) throw Error(k(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return zu(l), e;
        if (o === r) return zu(l), t;
        o = o.sibling;
      }
      throw Error(k(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, a = l.child; a; ) {
        if (a === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (a === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = o.child; a; ) {
          if (a === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (a === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          a = a.sibling;
        }
        if (!i) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function Rc(e) {
  return (e = kp(e)), e !== null ? Mc(e) : null;
}
function Mc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Mc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Lc = Be.unstable_scheduleCallback,
  Tu = Be.unstable_cancelCallback,
  Cp = Be.unstable_shouldYield,
  Np = Be.unstable_requestPaint,
  ue = Be.unstable_now,
  _p = Be.unstable_getCurrentPriorityLevel,
  Ra = Be.unstable_ImmediatePriority,
  Dc = Be.unstable_UserBlockingPriority,
  Kl = Be.unstable_NormalPriority,
  Pp = Be.unstable_LowPriority,
  zc = Be.unstable_IdlePriority,
  vo = null,
  dt = null;
function Rp(e) {
  if (dt && typeof dt.onCommitFiberRoot == "function")
    try {
      dt.onCommitFiberRoot(vo, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var lt = Math.clz32 ? Math.clz32 : Dp,
  Mp = Math.log,
  Lp = Math.LN2;
function Dp(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Mp(e) / Lp) | 0)) | 0;
}
var gl = 64,
  yl = 4194304;
function Sr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Yl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var a = i & ~l;
    a !== 0 ? (r = Sr(a)) : ((o &= i), o !== 0 && (r = Sr(o)));
  } else (i = n & ~l), i !== 0 ? (r = Sr(i)) : o !== 0 && (r = Sr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - lt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function zp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Tp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - lt(o),
      a = 1 << i,
      u = l[i];
    u === -1
      ? (!(a & n) || a & r) && (l[i] = zp(a, t))
      : u <= t && (e.expiredLanes |= a),
      (o &= ~a);
  }
}
function Ui(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Tc() {
  var e = gl;
  return (gl <<= 1), !(gl & 4194240) && (gl = 64), e;
}
function Go(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function nl(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - lt(t)),
    (e[t] = n);
}
function Op(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - lt(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function Ma(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - lt(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var X = 0;
function Oc(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var jc,
  La,
  Fc,
  Ic,
  Ac,
  Bi = !1,
  wl = [],
  Bt = null,
  $t = null,
  Ht = null,
  Ur = new Map(),
  Br = new Map(),
  Ft = [],
  jp =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Ou(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Bt = null;
      break;
    case "dragenter":
    case "dragleave":
      $t = null;
      break;
    case "mouseover":
    case "mouseout":
      Ht = null;
      break;
    case "pointerover":
    case "pointerout":
      Ur.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Br.delete(t.pointerId);
  }
}
function dr(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = ll(t)), t !== null && La(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Fp(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (Bt = dr(Bt, e, t, n, r, l)), !0;
    case "dragenter":
      return ($t = dr($t, e, t, n, r, l)), !0;
    case "mouseover":
      return (Ht = dr(Ht, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return Ur.set(o, dr(Ur.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), Br.set(o, dr(Br.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function Uc(e) {
  var t = ln(e.target);
  if (t !== null) {
    var n = gn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Pc(n)), t !== null)) {
          (e.blockedOn = t),
            Ac(e.priority, function () {
              Fc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function zl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = $i(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ji = r), n.target.dispatchEvent(r), (ji = null);
    } else return (t = ll(n)), t !== null && La(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function ju(e, t, n) {
  zl(e) && n.delete(t);
}
function Ip() {
  (Bi = !1),
    Bt !== null && zl(Bt) && (Bt = null),
    $t !== null && zl($t) && ($t = null),
    Ht !== null && zl(Ht) && (Ht = null),
    Ur.forEach(ju),
    Br.forEach(ju);
}
function fr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Bi ||
      ((Bi = !0),
      Be.unstable_scheduleCallback(Be.unstable_NormalPriority, Ip)));
}
function $r(e) {
  function t(l) {
    return fr(l, e);
  }
  if (0 < wl.length) {
    fr(wl[0], e);
    for (var n = 1; n < wl.length; n++) {
      var r = wl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Bt !== null && fr(Bt, e),
      $t !== null && fr($t, e),
      Ht !== null && fr(Ht, e),
      Ur.forEach(t),
      Br.forEach(t),
      n = 0;
    n < Ft.length;
    n++
  )
    (r = Ft[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Ft.length && ((n = Ft[0]), n.blockedOn === null); )
    Uc(n), n.blockedOn === null && Ft.shift();
}
var Un = Mt.ReactCurrentBatchConfig,
  Gl = !0;
function Ap(e, t, n, r) {
  var l = X,
    o = Un.transition;
  Un.transition = null;
  try {
    (X = 1), Da(e, t, n, r);
  } finally {
    (X = l), (Un.transition = o);
  }
}
function Up(e, t, n, r) {
  var l = X,
    o = Un.transition;
  Un.transition = null;
  try {
    (X = 4), Da(e, t, n, r);
  } finally {
    (X = l), (Un.transition = o);
  }
}
function Da(e, t, n, r) {
  if (Gl) {
    var l = $i(e, t, n, r);
    if (l === null) li(e, t, r, Xl, n), Ou(e, r);
    else if (Fp(l, e, t, n, r)) r.stopPropagation();
    else if ((Ou(e, r), t & 4 && -1 < jp.indexOf(e))) {
      for (; l !== null; ) {
        var o = ll(l);
        if (
          (o !== null && jc(o),
          (o = $i(e, t, n, r)),
          o === null && li(e, t, r, Xl, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else li(e, t, r, null, n);
  }
}
var Xl = null;
function $i(e, t, n, r) {
  if (((Xl = null), (e = Pa(r)), (e = ln(e)), e !== null))
    if (((t = gn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Pc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Xl = e), null;
}
function Bc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (_p()) {
        case Ra:
          return 1;
        case Dc:
          return 4;
        case Kl:
        case Pp:
          return 16;
        case zc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var At = null,
  za = null,
  Tl = null;
function $c() {
  if (Tl) return Tl;
  var e,
    t = za,
    n = t.length,
    r,
    l = "value" in At ? At.value : At.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (Tl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Ol(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function xl() {
  return !0;
}
function Fu() {
  return !1;
}
function He(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? xl
        : Fu),
      (this.isPropagationStopped = Fu),
      this
    );
  }
  return (
    oe(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = xl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = xl));
      },
      persist: function () {},
      isPersistent: xl,
    }),
    t
  );
}
var qn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Ta = He(qn),
  rl = oe({}, qn, { view: 0, detail: 0 }),
  Bp = He(rl),
  Xo,
  Jo,
  pr,
  go = oe({}, rl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Oa,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== pr &&
            (pr && e.type === "mousemove"
              ? ((Xo = e.screenX - pr.screenX), (Jo = e.screenY - pr.screenY))
              : (Jo = Xo = 0),
            (pr = e)),
          Xo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Jo;
    },
  }),
  Iu = He(go),
  $p = oe({}, go, { dataTransfer: 0 }),
  Hp = He($p),
  Vp = oe({}, rl, { relatedTarget: 0 }),
  Zo = He(Vp),
  Wp = oe({}, qn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Qp = He(Wp),
  Kp = oe({}, qn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Yp = He(Kp),
  Gp = oe({}, qn, { data: 0 }),
  Au = He(Gp),
  Xp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Jp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Zp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function qp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Zp[e]) ? !!t[e] : !1;
}
function Oa() {
  return qp;
}
var bp = oe({}, rl, {
    key: function (e) {
      if (e.key) {
        var t = Xp[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Ol(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Jp[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Oa,
    charCode: function (e) {
      return e.type === "keypress" ? Ol(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ol(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  eh = He(bp),
  th = oe({}, go, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Uu = He(th),
  nh = oe({}, rl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Oa,
  }),
  rh = He(nh),
  lh = oe({}, qn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  oh = He(lh),
  ih = oe({}, go, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  ah = He(ih),
  uh = [9, 13, 27, 32],
  ja = Ct && "CompositionEvent" in window,
  _r = null;
Ct && "documentMode" in document && (_r = document.documentMode);
var sh = Ct && "TextEvent" in window && !_r,
  Hc = Ct && (!ja || (_r && 8 < _r && 11 >= _r)),
  Bu = String.fromCharCode(32),
  $u = !1;
function Vc(e, t) {
  switch (e) {
    case "keyup":
      return uh.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Wc(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Nn = !1;
function ch(e, t) {
  switch (e) {
    case "compositionend":
      return Wc(t);
    case "keypress":
      return t.which !== 32 ? null : (($u = !0), Bu);
    case "textInput":
      return (e = t.data), e === Bu && $u ? null : e;
    default:
      return null;
  }
}
function dh(e, t) {
  if (Nn)
    return e === "compositionend" || (!ja && Vc(e, t))
      ? ((e = $c()), (Tl = za = At = null), (Nn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Hc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var fh = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Hu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!fh[e.type] : t === "textarea";
}
function Qc(e, t, n, r) {
  Ec(r),
    (t = Jl(t, "onChange")),
    0 < t.length &&
      ((n = new Ta("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Pr = null,
  Hr = null;
function ph(e) {
  nd(e, 0);
}
function yo(e) {
  var t = Rn(e);
  if (mc(t)) return e;
}
function hh(e, t) {
  if (e === "change") return t;
}
var Kc = !1;
if (Ct) {
  var qo;
  if (Ct) {
    var bo = "oninput" in document;
    if (!bo) {
      var Vu = document.createElement("div");
      Vu.setAttribute("oninput", "return;"),
        (bo = typeof Vu.oninput == "function");
    }
    qo = bo;
  } else qo = !1;
  Kc = qo && (!document.documentMode || 9 < document.documentMode);
}
function Wu() {
  Pr && (Pr.detachEvent("onpropertychange", Yc), (Hr = Pr = null));
}
function Yc(e) {
  if (e.propertyName === "value" && yo(Hr)) {
    var t = [];
    Qc(t, Hr, e, Pa(e)), _c(ph, t);
  }
}
function mh(e, t, n) {
  e === "focusin"
    ? (Wu(), (Pr = t), (Hr = n), Pr.attachEvent("onpropertychange", Yc))
    : e === "focusout" && Wu();
}
function vh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return yo(Hr);
}
function gh(e, t) {
  if (e === "click") return yo(t);
}
function yh(e, t) {
  if (e === "input" || e === "change") return yo(t);
}
function wh(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var it = typeof Object.is == "function" ? Object.is : wh;
function Vr(e, t) {
  if (it(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ki.call(t, l) || !it(e[l], t[l])) return !1;
  }
  return !0;
}
function Qu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ku(e, t) {
  var n = Qu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Qu(n);
  }
}
function Gc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Gc(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Xc() {
  for (var e = window, t = Vl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Vl(e.document);
  }
  return t;
}
function Fa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function xh(e) {
  var t = Xc(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Gc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Fa(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = Ku(n, o));
        var i = Ku(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Sh = Ct && "documentMode" in document && 11 >= document.documentMode,
  _n = null,
  Hi = null,
  Rr = null,
  Vi = !1;
function Yu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Vi ||
    _n == null ||
    _n !== Vl(r) ||
    ((r = _n),
    "selectionStart" in r && Fa(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Rr && Vr(Rr, r)) ||
      ((Rr = r),
      (r = Jl(Hi, "onSelect")),
      0 < r.length &&
        ((t = new Ta("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = _n))));
}
function Sl(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Pn = {
    animationend: Sl("Animation", "AnimationEnd"),
    animationiteration: Sl("Animation", "AnimationIteration"),
    animationstart: Sl("Animation", "AnimationStart"),
    transitionend: Sl("Transition", "TransitionEnd"),
  },
  ei = {},
  Jc = {};
Ct &&
  ((Jc = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Pn.animationend.animation,
    delete Pn.animationiteration.animation,
    delete Pn.animationstart.animation),
  "TransitionEvent" in window || delete Pn.transitionend.transition);
function wo(e) {
  if (ei[e]) return ei[e];
  if (!Pn[e]) return e;
  var t = Pn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Jc) return (ei[e] = t[n]);
  return e;
}
var Zc = wo("animationend"),
  qc = wo("animationiteration"),
  bc = wo("animationstart"),
  ed = wo("transitionend"),
  td = new Map(),
  Gu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Zt(e, t) {
  td.set(e, t), vn(t, [e]);
}
for (var ti = 0; ti < Gu.length; ti++) {
  var ni = Gu[ti],
    Eh = ni.toLowerCase(),
    kh = ni[0].toUpperCase() + ni.slice(1);
  Zt(Eh, "on" + kh);
}
Zt(Zc, "onAnimationEnd");
Zt(qc, "onAnimationIteration");
Zt(bc, "onAnimationStart");
Zt("dblclick", "onDoubleClick");
Zt("focusin", "onFocus");
Zt("focusout", "onBlur");
Zt(ed, "onTransitionEnd");
Vn("onMouseEnter", ["mouseout", "mouseover"]);
Vn("onMouseLeave", ["mouseout", "mouseover"]);
Vn("onPointerEnter", ["pointerout", "pointerover"]);
Vn("onPointerLeave", ["pointerout", "pointerover"]);
vn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
vn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
vn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
vn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
vn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
vn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Er =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Ch = new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));
function Xu(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Ep(r, t, void 0, e), (e.currentTarget = null);
}
function nd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var a = r[i],
            u = a.instance,
            s = a.currentTarget;
          if (((a = a.listener), u !== o && l.isPropagationStopped())) break e;
          Xu(l, a, s), (o = u);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((a = r[i]),
            (u = a.instance),
            (s = a.currentTarget),
            (a = a.listener),
            u !== o && l.isPropagationStopped())
          )
            break e;
          Xu(l, a, s), (o = u);
        }
    }
  }
  if (Ql) throw ((e = Ai), (Ql = !1), (Ai = null), e);
}
function b(e, t) {
  var n = t[Gi];
  n === void 0 && (n = t[Gi] = new Set());
  var r = e + "__bubble";
  n.has(r) || (rd(t, e, 2, !1), n.add(r));
}
function ri(e, t, n) {
  var r = 0;
  t && (r |= 4), rd(n, e, r, t);
}
var El = "_reactListening" + Math.random().toString(36).slice(2);
function Wr(e) {
  if (!e[El]) {
    (e[El] = !0),
      cc.forEach(function (n) {
        n !== "selectionchange" && (Ch.has(n) || ri(n, !1, e), ri(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[El] || ((t[El] = !0), ri("selectionchange", !1, t));
  }
}
function rd(e, t, n, r) {
  switch (Bc(t)) {
    case 1:
      var l = Ap;
      break;
    case 4:
      l = Up;
      break;
    default:
      l = Da;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !Ii ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function li(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var a = r.stateNode.containerInfo;
        if (a === l || (a.nodeType === 8 && a.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var u = i.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = i.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; a !== null; ) {
          if (((i = ln(a)), i === null)) return;
          if (((u = i.tag), u === 5 || u === 6)) {
            r = o = i;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  _c(function () {
    var s = o,
      h = Pa(n),
      v = [];
    e: {
      var c = td.get(e);
      if (c !== void 0) {
        var g = Ta,
          S = e;
        switch (e) {
          case "keypress":
            if (Ol(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = eh;
            break;
          case "focusin":
            (S = "focus"), (g = Zo);
            break;
          case "focusout":
            (S = "blur"), (g = Zo);
            break;
          case "beforeblur":
          case "afterblur":
            g = Zo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = Iu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Hp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = rh;
            break;
          case Zc:
          case qc:
          case bc:
            g = Qp;
            break;
          case ed:
            g = oh;
            break;
          case "scroll":
            g = Bp;
            break;
          case "wheel":
            g = ah;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Yp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Uu;
        }
        var x = (t & 4) !== 0,
          P = !x && e === "scroll",
          p = x ? (c !== null ? c + "Capture" : null) : c;
        x = [];
        for (var f = s, m; f !== null; ) {
          m = f;
          var y = m.stateNode;
          if (
            (m.tag === 5 &&
              y !== null &&
              ((m = y),
              p !== null && ((y = Ar(f, p)), y != null && x.push(Qr(f, y, m)))),
            P)
          )
            break;
          f = f.return;
        }
        0 < x.length &&
          ((c = new g(c, S, null, n, h)), v.push({ event: c, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((c = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          c &&
            n !== ji &&
            (S = n.relatedTarget || n.fromElement) &&
            (ln(S) || S[Nt]))
        )
          break e;
        if (
          (g || c) &&
          ((c =
            h.window === h
              ? h
              : (c = h.ownerDocument)
              ? c.defaultView || c.parentWindow
              : window),
          g
            ? ((S = n.relatedTarget || n.toElement),
              (g = s),
              (S = S ? ln(S) : null),
              S !== null &&
                ((P = gn(S)), S !== P || (S.tag !== 5 && S.tag !== 6)) &&
                (S = null))
            : ((g = null), (S = s)),
          g !== S)
        ) {
          if (
            ((x = Iu),
            (y = "onMouseLeave"),
            (p = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = Uu),
              (y = "onPointerLeave"),
              (p = "onPointerEnter"),
              (f = "pointer")),
            (P = g == null ? c : Rn(g)),
            (m = S == null ? c : Rn(S)),
            (c = new x(y, f + "leave", g, n, h)),
            (c.target = P),
            (c.relatedTarget = m),
            (y = null),
            ln(h) === s &&
              ((x = new x(p, f + "enter", S, n, h)),
              (x.target = m),
              (x.relatedTarget = P),
              (y = x)),
            (P = y),
            g && S)
          )
            t: {
              for (x = g, p = S, f = 0, m = x; m; m = En(m)) f++;
              for (m = 0, y = p; y; y = En(y)) m++;
              for (; 0 < f - m; ) (x = En(x)), f--;
              for (; 0 < m - f; ) (p = En(p)), m--;
              for (; f--; ) {
                if (x === p || (p !== null && x === p.alternate)) break t;
                (x = En(x)), (p = En(p));
              }
              x = null;
            }
          else x = null;
          g !== null && Ju(v, c, g, x, !1),
            S !== null && P !== null && Ju(v, P, S, x, !0);
        }
      }
      e: {
        if (
          ((c = s ? Rn(s) : window),
          (g = c.nodeName && c.nodeName.toLowerCase()),
          g === "select" || (g === "input" && c.type === "file"))
        )
          var _ = hh;
        else if (Hu(c))
          if (Kc) _ = yh;
          else {
            _ = vh;
            var z = mh;
          }
        else
          (g = c.nodeName) &&
            g.toLowerCase() === "input" &&
            (c.type === "checkbox" || c.type === "radio") &&
            (_ = gh);
        if (_ && (_ = _(e, s))) {
          Qc(v, _, n, h);
          break e;
        }
        z && z(e, c, s),
          e === "focusout" &&
            (z = c._wrapperState) &&
            z.controlled &&
            c.type === "number" &&
            Li(c, "number", c.value);
      }
      switch (((z = s ? Rn(s) : window), e)) {
        case "focusin":
          (Hu(z) || z.contentEditable === "true") &&
            ((_n = z), (Hi = s), (Rr = null));
          break;
        case "focusout":
          Rr = Hi = _n = null;
          break;
        case "mousedown":
          Vi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Vi = !1), Yu(v, n, h);
          break;
        case "selectionchange":
          if (Sh) break;
        case "keydown":
        case "keyup":
          Yu(v, n, h);
      }
      var T;
      if (ja)
        e: {
          switch (e) {
            case "compositionstart":
              var O = "onCompositionStart";
              break e;
            case "compositionend":
              O = "onCompositionEnd";
              break e;
            case "compositionupdate":
              O = "onCompositionUpdate";
              break e;
          }
          O = void 0;
        }
      else
        Nn
          ? Vc(e, n) && (O = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (O = "onCompositionStart");
      O &&
        (Hc &&
          n.locale !== "ko" &&
          (Nn || O !== "onCompositionStart"
            ? O === "onCompositionEnd" && Nn && (T = $c())
            : ((At = h),
              (za = "value" in At ? At.value : At.textContent),
              (Nn = !0))),
        (z = Jl(s, O)),
        0 < z.length &&
          ((O = new Au(O, e, null, n, h)),
          v.push({ event: O, listeners: z }),
          T ? (O.data = T) : ((T = Wc(n)), T !== null && (O.data = T)))),
        (T = sh ? ch(e, n) : dh(e, n)) &&
          ((s = Jl(s, "onBeforeInput")),
          0 < s.length &&
            ((h = new Au("onBeforeInput", "beforeinput", null, n, h)),
            v.push({ event: h, listeners: s }),
            (h.data = T)));
    }
    nd(v, t);
  });
}
function Qr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Jl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = Ar(e, n)),
      o != null && r.unshift(Qr(e, o, l)),
      (o = Ar(e, t)),
      o != null && r.push(Qr(e, o, l))),
      (e = e.return);
  }
  return r;
}
function En(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ju(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      s = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 &&
      s !== null &&
      ((a = s),
      l
        ? ((u = Ar(n, o)), u != null && i.unshift(Qr(n, u, a)))
        : l || ((u = Ar(n, o)), u != null && i.push(Qr(n, u, a)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Nh = /\r\n?/g,
  _h = /\u0000|\uFFFD/g;
function Zu(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Nh,
      `
`
    )
    .replace(_h, "");
}
function kl(e, t, n) {
  if (((t = Zu(t)), Zu(e) !== t && n)) throw Error(k(425));
}
function Zl() {}
var Wi = null,
  Qi = null;
function Ki(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Yi = typeof setTimeout == "function" ? setTimeout : void 0,
  Ph = typeof clearTimeout == "function" ? clearTimeout : void 0,
  qu = typeof Promise == "function" ? Promise : void 0,
  Rh =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof qu < "u"
      ? function (e) {
          return qu.resolve(null).then(e).catch(Mh);
        }
      : Yi;
function Mh(e) {
  setTimeout(function () {
    throw e;
  });
}
function oi(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), $r(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  $r(t);
}
function Vt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function bu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var bn = Math.random().toString(36).slice(2),
  ct = "__reactFiber$" + bn,
  Kr = "__reactProps$" + bn,
  Nt = "__reactContainer$" + bn,
  Gi = "__reactEvents$" + bn,
  Lh = "__reactListeners$" + bn,
  Dh = "__reactHandles$" + bn;
function ln(e) {
  var t = e[ct];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Nt] || n[ct])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = bu(e); e !== null; ) {
          if ((n = e[ct])) return n;
          e = bu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function ll(e) {
  return (
    (e = e[ct] || e[Nt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Rn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function xo(e) {
  return e[Kr] || null;
}
var Xi = [],
  Mn = -1;
function qt(e) {
  return { current: e };
}
function ee(e) {
  0 > Mn || ((e.current = Xi[Mn]), (Xi[Mn] = null), Mn--);
}
function q(e, t) {
  Mn++, (Xi[Mn] = e.current), (e.current = t);
}
var Jt = {},
  _e = qt(Jt),
  Te = qt(!1),
  dn = Jt;
function Wn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Jt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Oe(e) {
  return (e = e.childContextTypes), e != null;
}
function ql() {
  ee(Te), ee(_e);
}
function es(e, t, n) {
  if (_e.current !== Jt) throw Error(k(168));
  q(_e, t), q(Te, n);
}
function ld(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(k(108, mp(e) || "Unknown", l));
  return oe({}, n, r);
}
function bl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Jt),
    (dn = _e.current),
    q(_e, e),
    q(Te, Te.current),
    !0
  );
}
function ts(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n
    ? ((e = ld(e, t, dn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ee(Te),
      ee(_e),
      q(_e, e))
    : ee(Te),
    q(Te, n);
}
var yt = null,
  So = !1,
  ii = !1;
function od(e) {
  yt === null ? (yt = [e]) : yt.push(e);
}
function zh(e) {
  (So = !0), od(e);
}
function bt() {
  if (!ii && yt !== null) {
    ii = !0;
    var e = 0,
      t = X;
    try {
      var n = yt;
      for (X = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (yt = null), (So = !1);
    } catch (l) {
      throw (yt !== null && (yt = yt.slice(e + 1)), Lc(Ra, bt), l);
    } finally {
      (X = t), (ii = !1);
    }
  }
  return null;
}
var Ln = [],
  Dn = 0,
  eo = null,
  to = 0,
  Ve = [],
  We = 0,
  fn = null,
  wt = 1,
  xt = "";
function nn(e, t) {
  (Ln[Dn++] = to), (Ln[Dn++] = eo), (eo = e), (to = t);
}
function id(e, t, n) {
  (Ve[We++] = wt), (Ve[We++] = xt), (Ve[We++] = fn), (fn = e);
  var r = wt;
  e = xt;
  var l = 32 - lt(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - lt(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (wt = (1 << (32 - lt(t) + l)) | (n << l) | r),
      (xt = o + e);
  } else (wt = (1 << o) | (n << l) | r), (xt = e);
}
function Ia(e) {
  e.return !== null && (nn(e, 1), id(e, 1, 0));
}
function Aa(e) {
  for (; e === eo; )
    (eo = Ln[--Dn]), (Ln[Dn] = null), (to = Ln[--Dn]), (Ln[Dn] = null);
  for (; e === fn; )
    (fn = Ve[--We]),
      (Ve[We] = null),
      (xt = Ve[--We]),
      (Ve[We] = null),
      (wt = Ve[--We]),
      (Ve[We] = null);
}
var Ue = null,
  Ae = null,
  ne = !1,
  nt = null;
function ad(e, t) {
  var n = Qe(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function ns(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ue = e), (Ae = Vt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ue = e), (Ae = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = fn !== null ? { id: wt, overflow: xt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Qe(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ue = e),
            (Ae = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ji(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Zi(e) {
  if (ne) {
    var t = Ae;
    if (t) {
      var n = t;
      if (!ns(e, t)) {
        if (Ji(e)) throw Error(k(418));
        t = Vt(n.nextSibling);
        var r = Ue;
        t && ns(e, t)
          ? ad(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (ne = !1), (Ue = e));
      }
    } else {
      if (Ji(e)) throw Error(k(418));
      (e.flags = (e.flags & -4097) | 2), (ne = !1), (Ue = e);
    }
  }
}
function rs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ue = e;
}
function Cl(e) {
  if (e !== Ue) return !1;
  if (!ne) return rs(e), (ne = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ki(e.type, e.memoizedProps))),
    t && (t = Ae))
  ) {
    if (Ji(e)) throw (ud(), Error(k(418)));
    for (; t; ) ad(e, t), (t = Vt(t.nextSibling));
  }
  if ((rs(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ae = Vt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ae = null;
    }
  } else Ae = Ue ? Vt(e.stateNode.nextSibling) : null;
  return !0;
}
function ud() {
  for (var e = Ae; e; ) e = Vt(e.nextSibling);
}
function Qn() {
  (Ae = Ue = null), (ne = !1);
}
function Ua(e) {
  nt === null ? (nt = [e]) : nt.push(e);
}
var Th = Mt.ReactCurrentBatchConfig;
function et(e, t) {
  if (e && e.defaultProps) {
    (t = oe({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var no = qt(null),
  ro = null,
  zn = null,
  Ba = null;
function $a() {
  Ba = zn = ro = null;
}
function Ha(e) {
  var t = no.current;
  ee(no), (e._currentValue = t);
}
function qi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Bn(e, t) {
  (ro = e),
    (Ba = zn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ze = !0), (e.firstContext = null));
}
function Ye(e) {
  var t = e._currentValue;
  if (Ba !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), zn === null)) {
      if (ro === null) throw Error(k(308));
      (zn = e), (ro.dependencies = { lanes: 0, firstContext: e });
    } else zn = zn.next = e;
  return t;
}
var on = null;
function Va(e) {
  on === null ? (on = [e]) : on.push(e);
}
function sd(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), Va(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    _t(e, r)
  );
}
function _t(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Ot = !1;
function Wa(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function cd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Et(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Wt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), K & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      _t(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Va(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    _t(e, n)
  );
}
function jl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ma(e, n);
  }
}
function ls(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function lo(e, t, n, r) {
  var l = e.updateQueue;
  Ot = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a,
      s = u.next;
    (u.next = null), i === null ? (o = s) : (i.next = s), (i = u);
    var h = e.alternate;
    h !== null &&
      ((h = h.updateQueue),
      (a = h.lastBaseUpdate),
      a !== i &&
        (a === null ? (h.firstBaseUpdate = s) : (a.next = s),
        (h.lastBaseUpdate = u)));
  }
  if (o !== null) {
    var v = l.baseState;
    (i = 0), (h = s = u = null), (a = o);
    do {
      var c = a.lane,
        g = a.eventTime;
      if ((r & c) === c) {
        h !== null &&
          (h = h.next =
            {
              eventTime: g,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var S = e,
            x = a;
          switch (((c = t), (g = n), x.tag)) {
            case 1:
              if (((S = x.payload), typeof S == "function")) {
                v = S.call(g, v, c);
                break e;
              }
              v = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (
                ((S = x.payload),
                (c = typeof S == "function" ? S.call(g, v, c) : S),
                c == null)
              )
                break e;
              v = oe({}, v, c);
              break e;
            case 2:
              Ot = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (c = l.effects),
          c === null ? (l.effects = [a]) : c.push(a));
      } else
        (g = {
          eventTime: g,
          lane: c,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          h === null ? ((s = h = g), (u = v)) : (h = h.next = g),
          (i |= c);
      if (((a = a.next), a === null)) {
        if (((a = l.shared.pending), a === null)) break;
        (c = a),
          (a = c.next),
          (c.next = null),
          (l.lastBaseUpdate = c),
          (l.shared.pending = null);
      }
    } while (1);
    if (
      (h === null && (u = v),
      (l.baseState = u),
      (l.firstBaseUpdate = s),
      (l.lastBaseUpdate = h),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (hn |= i), (e.lanes = i), (e.memoizedState = v);
  }
}
function os(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(k(191, l));
        l.call(r);
      }
    }
}
var dd = new sc.Component().refs;
function bi(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : oe({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Eo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? gn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Re(),
      l = Kt(e),
      o = Et(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = Wt(e, o, l)),
      t !== null && (ot(t, e, l, r), jl(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Re(),
      l = Kt(e),
      o = Et(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = Wt(e, o, l)),
      t !== null && (ot(t, e, l, r), jl(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Re(),
      r = Kt(e),
      l = Et(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = Wt(e, l, r)),
      t !== null && (ot(t, e, r, n), jl(t, e, r));
  },
};
function is(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Vr(n, r) || !Vr(l, o)
      : !0
  );
}
function fd(e, t, n) {
  var r = !1,
    l = Jt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Ye(o))
      : ((l = Oe(t) ? dn : _e.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? Wn(e, l) : Jt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Eo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function as(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Eo.enqueueReplaceState(t, t.state, null);
}
function ea(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = dd), Wa(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = Ye(o))
    : ((o = Oe(t) ? dn : _e.current), (l.context = Wn(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (bi(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && Eo.enqueueReplaceState(l, l.state, null),
      lo(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function hr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var a = l.refs;
            a === dd && (a = l.refs = {}),
              i === null ? delete a[o] : (a[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function Nl(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      k(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function us(e) {
  var t = e._init;
  return t(e._payload);
}
function pd(e) {
  function t(p, f) {
    if (e) {
      var m = p.deletions;
      m === null ? ((p.deletions = [f]), (p.flags |= 16)) : m.push(f);
    }
  }
  function n(p, f) {
    if (!e) return null;
    for (; f !== null; ) t(p, f), (f = f.sibling);
    return null;
  }
  function r(p, f) {
    for (p = new Map(); f !== null; )
      f.key !== null ? p.set(f.key, f) : p.set(f.index, f), (f = f.sibling);
    return p;
  }
  function l(p, f) {
    return (p = Yt(p, f)), (p.index = 0), (p.sibling = null), p;
  }
  function o(p, f, m) {
    return (
      (p.index = m),
      e
        ? ((m = p.alternate),
          m !== null
            ? ((m = m.index), m < f ? ((p.flags |= 2), f) : m)
            : ((p.flags |= 2), f))
        : ((p.flags |= 1048576), f)
    );
  }
  function i(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, f, m, y) {
    return f === null || f.tag !== 6
      ? ((f = pi(m, p.mode, y)), (f.return = p), f)
      : ((f = l(f, m)), (f.return = p), f);
  }
  function u(p, f, m, y) {
    var _ = m.type;
    return _ === Cn
      ? h(p, f, m.props.children, y, m.key)
      : f !== null &&
        (f.elementType === _ ||
          (typeof _ == "object" &&
            _ !== null &&
            _.$$typeof === Tt &&
            us(_) === f.type))
      ? ((y = l(f, m.props)), (y.ref = hr(p, f, m)), (y.return = p), y)
      : ((y = $l(m.type, m.key, m.props, null, p.mode, y)),
        (y.ref = hr(p, f, m)),
        (y.return = p),
        y);
  }
  function s(p, f, m, y) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== m.containerInfo ||
      f.stateNode.implementation !== m.implementation
      ? ((f = hi(m, p.mode, y)), (f.return = p), f)
      : ((f = l(f, m.children || [])), (f.return = p), f);
  }
  function h(p, f, m, y, _) {
    return f === null || f.tag !== 7
      ? ((f = cn(m, p.mode, y, _)), (f.return = p), f)
      : ((f = l(f, m)), (f.return = p), f);
  }
  function v(p, f, m) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return (f = pi("" + f, p.mode, m)), (f.return = p), f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case hl:
          return (
            (m = $l(f.type, f.key, f.props, null, p.mode, m)),
            (m.ref = hr(p, null, f)),
            (m.return = p),
            m
          );
        case kn:
          return (f = hi(f, p.mode, m)), (f.return = p), f;
        case Tt:
          var y = f._init;
          return v(p, y(f._payload), m);
      }
      if (xr(f) || sr(f))
        return (f = cn(f, p.mode, m, null)), (f.return = p), f;
      Nl(p, f);
    }
    return null;
  }
  function c(p, f, m, y) {
    var _ = f !== null ? f.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return _ !== null ? null : a(p, f, "" + m, y);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case hl:
          return m.key === _ ? u(p, f, m, y) : null;
        case kn:
          return m.key === _ ? s(p, f, m, y) : null;
        case Tt:
          return (_ = m._init), c(p, f, _(m._payload), y);
      }
      if (xr(m) || sr(m)) return _ !== null ? null : h(p, f, m, y, null);
      Nl(p, m);
    }
    return null;
  }
  function g(p, f, m, y, _) {
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return (p = p.get(m) || null), a(f, p, "" + y, _);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case hl:
          return (p = p.get(y.key === null ? m : y.key) || null), u(f, p, y, _);
        case kn:
          return (p = p.get(y.key === null ? m : y.key) || null), s(f, p, y, _);
        case Tt:
          var z = y._init;
          return g(p, f, m, z(y._payload), _);
      }
      if (xr(y) || sr(y)) return (p = p.get(m) || null), h(f, p, y, _, null);
      Nl(f, y);
    }
    return null;
  }
  function S(p, f, m, y) {
    for (
      var _ = null, z = null, T = f, O = (f = 0), J = null;
      T !== null && O < m.length;
      O++
    ) {
      T.index > O ? ((J = T), (T = null)) : (J = T.sibling);
      var U = c(p, T, m[O], y);
      if (U === null) {
        T === null && (T = J);
        break;
      }
      e && T && U.alternate === null && t(p, T),
        (f = o(U, f, O)),
        z === null ? (_ = U) : (z.sibling = U),
        (z = U),
        (T = J);
    }
    if (O === m.length) return n(p, T), ne && nn(p, O), _;
    if (T === null) {
      for (; O < m.length; O++)
        (T = v(p, m[O], y)),
          T !== null &&
            ((f = o(T, f, O)), z === null ? (_ = T) : (z.sibling = T), (z = T));
      return ne && nn(p, O), _;
    }
    for (T = r(p, T); O < m.length; O++)
      (J = g(T, p, O, m[O], y)),
        J !== null &&
          (e && J.alternate !== null && T.delete(J.key === null ? O : J.key),
          (f = o(J, f, O)),
          z === null ? (_ = J) : (z.sibling = J),
          (z = J));
    return (
      e &&
        T.forEach(function (ae) {
          return t(p, ae);
        }),
      ne && nn(p, O),
      _
    );
  }
  function x(p, f, m, y) {
    var _ = sr(m);
    if (typeof _ != "function") throw Error(k(150));
    if (((m = _.call(m)), m == null)) throw Error(k(151));
    for (
      var z = (_ = null), T = f, O = (f = 0), J = null, U = m.next();
      T !== null && !U.done;
      O++, U = m.next()
    ) {
      T.index > O ? ((J = T), (T = null)) : (J = T.sibling);
      var ae = c(p, T, U.value, y);
      if (ae === null) {
        T === null && (T = J);
        break;
      }
      e && T && ae.alternate === null && t(p, T),
        (f = o(ae, f, O)),
        z === null ? (_ = ae) : (z.sibling = ae),
        (z = ae),
        (T = J);
    }
    if (U.done) return n(p, T), ne && nn(p, O), _;
    if (T === null) {
      for (; !U.done; O++, U = m.next())
        (U = v(p, U.value, y)),
          U !== null &&
            ((f = o(U, f, O)), z === null ? (_ = U) : (z.sibling = U), (z = U));
      return ne && nn(p, O), _;
    }
    for (T = r(p, T); !U.done; O++, U = m.next())
      (U = g(T, p, O, U.value, y)),
        U !== null &&
          (e && U.alternate !== null && T.delete(U.key === null ? O : U.key),
          (f = o(U, f, O)),
          z === null ? (_ = U) : (z.sibling = U),
          (z = U));
    return (
      e &&
        T.forEach(function (Je) {
          return t(p, Je);
        }),
      ne && nn(p, O),
      _
    );
  }
  function P(p, f, m, y) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === Cn &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case hl:
          e: {
            for (var _ = m.key, z = f; z !== null; ) {
              if (z.key === _) {
                if (((_ = m.type), _ === Cn)) {
                  if (z.tag === 7) {
                    n(p, z.sibling),
                      (f = l(z, m.props.children)),
                      (f.return = p),
                      (p = f);
                    break e;
                  }
                } else if (
                  z.elementType === _ ||
                  (typeof _ == "object" &&
                    _ !== null &&
                    _.$$typeof === Tt &&
                    us(_) === z.type)
                ) {
                  n(p, z.sibling),
                    (f = l(z, m.props)),
                    (f.ref = hr(p, z, m)),
                    (f.return = p),
                    (p = f);
                  break e;
                }
                n(p, z);
                break;
              } else t(p, z);
              z = z.sibling;
            }
            m.type === Cn
              ? ((f = cn(m.props.children, p.mode, y, m.key)),
                (f.return = p),
                (p = f))
              : ((y = $l(m.type, m.key, m.props, null, p.mode, y)),
                (y.ref = hr(p, f, m)),
                (y.return = p),
                (p = y));
          }
          return i(p);
        case kn:
          e: {
            for (z = m.key; f !== null; ) {
              if (f.key === z)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === m.containerInfo &&
                  f.stateNode.implementation === m.implementation
                ) {
                  n(p, f.sibling),
                    (f = l(f, m.children || [])),
                    (f.return = p),
                    (p = f);
                  break e;
                } else {
                  n(p, f);
                  break;
                }
              else t(p, f);
              f = f.sibling;
            }
            (f = hi(m, p.mode, y)), (f.return = p), (p = f);
          }
          return i(p);
        case Tt:
          return (z = m._init), P(p, f, z(m._payload), y);
      }
      if (xr(m)) return S(p, f, m, y);
      if (sr(m)) return x(p, f, m, y);
      Nl(p, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        f !== null && f.tag === 6
          ? (n(p, f.sibling), (f = l(f, m)), (f.return = p), (p = f))
          : (n(p, f), (f = pi(m, p.mode, y)), (f.return = p), (p = f)),
        i(p))
      : n(p, f);
  }
  return P;
}
var Kn = pd(!0),
  hd = pd(!1),
  ol = {},
  ft = qt(ol),
  Yr = qt(ol),
  Gr = qt(ol);
function an(e) {
  if (e === ol) throw Error(k(174));
  return e;
}
function Qa(e, t) {
  switch ((q(Gr, t), q(Yr, e), q(ft, ol), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : zi(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = zi(t, e));
  }
  ee(ft), q(ft, t);
}
function Yn() {
  ee(ft), ee(Yr), ee(Gr);
}
function md(e) {
  an(Gr.current);
  var t = an(ft.current),
    n = zi(t, e.type);
  t !== n && (q(Yr, e), q(ft, n));
}
function Ka(e) {
  Yr.current === e && (ee(ft), ee(Yr));
}
var re = qt(0);
function oo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var ai = [];
function Ya() {
  for (var e = 0; e < ai.length; e++)
    ai[e]._workInProgressVersionPrimary = null;
  ai.length = 0;
}
var Fl = Mt.ReactCurrentDispatcher,
  ui = Mt.ReactCurrentBatchConfig,
  pn = 0,
  le = null,
  he = null,
  ve = null,
  io = !1,
  Mr = !1,
  Xr = 0,
  Oh = 0;
function ke() {
  throw Error(k(321));
}
function Ga(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!it(e[n], t[n])) return !1;
  return !0;
}
function Xa(e, t, n, r, l, o) {
  if (
    ((pn = o),
    (le = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Fl.current = e === null || e.memoizedState === null ? Ah : Uh),
    (e = n(r, l)),
    Mr)
  ) {
    o = 0;
    do {
      if (((Mr = !1), (Xr = 0), 25 <= o)) throw Error(k(301));
      (o += 1),
        (ve = he = null),
        (t.updateQueue = null),
        (Fl.current = Bh),
        (e = n(r, l));
    } while (Mr);
  }
  if (
    ((Fl.current = ao),
    (t = he !== null && he.next !== null),
    (pn = 0),
    (ve = he = le = null),
    (io = !1),
    t)
  )
    throw Error(k(300));
  return e;
}
function Ja() {
  var e = Xr !== 0;
  return (Xr = 0), e;
}
function st() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return ve === null ? (le.memoizedState = ve = e) : (ve = ve.next = e), ve;
}
function Ge() {
  if (he === null) {
    var e = le.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = he.next;
  var t = ve === null ? le.memoizedState : ve.next;
  if (t !== null) (ve = t), (he = e);
  else {
    if (e === null) throw Error(k(310));
    (he = e),
      (e = {
        memoizedState: he.memoizedState,
        baseState: he.baseState,
        baseQueue: he.baseQueue,
        queue: he.queue,
        next: null,
      }),
      ve === null ? (le.memoizedState = ve = e) : (ve = ve.next = e);
  }
  return ve;
}
function Jr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function si(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = he,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var a = (i = null),
      u = null,
      s = o;
    do {
      var h = s.lane;
      if ((pn & h) === h)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null,
            }),
          (r = s.hasEagerState ? s.eagerState : e(r, s.action));
      else {
        var v = {
          lane: h,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        };
        u === null ? ((a = u = v), (i = r)) : (u = u.next = v),
          (le.lanes |= h),
          (hn |= h);
      }
      s = s.next;
    } while (s !== null && s !== o);
    u === null ? (i = r) : (u.next = a),
      it(r, t.memoizedState) || (ze = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (le.lanes |= o), (hn |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ci(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    it(o, t.memoizedState) || (ze = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function vd() {}
function gd(e, t) {
  var n = le,
    r = Ge(),
    l = t(),
    o = !it(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (ze = !0)),
    (r = r.queue),
    Za(xd.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (ve !== null && ve.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Zr(9, wd.bind(null, n, r, l, t), void 0, null),
      ge === null)
    )
      throw Error(k(349));
    pn & 30 || yd(n, t, l);
  }
  return l;
}
function yd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = le.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (le.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function wd(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Sd(t) && Ed(e);
}
function xd(e, t, n) {
  return n(function () {
    Sd(t) && Ed(e);
  });
}
function Sd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !it(e, n);
  } catch {
    return !0;
  }
}
function Ed(e) {
  var t = _t(e, 1);
  t !== null && ot(t, e, 1, -1);
}
function ss(e) {
  var t = st();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Jr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Ih.bind(null, le, e)),
    [t.memoizedState, e]
  );
}
function Zr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = le.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (le.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function kd() {
  return Ge().memoizedState;
}
function Il(e, t, n, r) {
  var l = st();
  (le.flags |= e),
    (l.memoizedState = Zr(1 | t, n, void 0, r === void 0 ? null : r));
}
function ko(e, t, n, r) {
  var l = Ge();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (he !== null) {
    var i = he.memoizedState;
    if (((o = i.destroy), r !== null && Ga(r, i.deps))) {
      l.memoizedState = Zr(t, n, o, r);
      return;
    }
  }
  (le.flags |= e), (l.memoizedState = Zr(1 | t, n, o, r));
}
function cs(e, t) {
  return Il(8390656, 8, e, t);
}
function Za(e, t) {
  return ko(2048, 8, e, t);
}
function Cd(e, t) {
  return ko(4, 2, e, t);
}
function Nd(e, t) {
  return ko(4, 4, e, t);
}
function _d(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Pd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), ko(4, 4, _d.bind(null, t, e), n)
  );
}
function qa() {}
function Rd(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ga(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Md(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ga(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Ld(e, t, n) {
  return pn & 21
    ? (it(n, t) || ((n = Tc()), (le.lanes |= n), (hn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ze = !0)), (e.memoizedState = n));
}
function jh(e, t) {
  var n = X;
  (X = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = ui.transition;
  ui.transition = {};
  try {
    e(!1), t();
  } finally {
    (X = n), (ui.transition = r);
  }
}
function Dd() {
  return Ge().memoizedState;
}
function Fh(e, t, n) {
  var r = Kt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    zd(e))
  )
    Td(t, n);
  else if (((n = sd(e, t, n, r)), n !== null)) {
    var l = Re();
    ot(n, e, r, l), Od(n, t, r);
  }
}
function Ih(e, t, n) {
  var r = Kt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (zd(e)) Td(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          a = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = a), it(a, i))) {
          var u = t.interleaved;
          u === null
            ? ((l.next = l), Va(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = sd(e, t, l, r)),
      n !== null && ((l = Re()), ot(n, e, r, l), Od(n, t, r));
  }
}
function zd(e) {
  var t = e.alternate;
  return e === le || (t !== null && t === le);
}
function Td(e, t) {
  Mr = io = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Od(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ma(e, n);
  }
}
var ao = {
    readContext: Ye,
    useCallback: ke,
    useContext: ke,
    useEffect: ke,
    useImperativeHandle: ke,
    useInsertionEffect: ke,
    useLayoutEffect: ke,
    useMemo: ke,
    useReducer: ke,
    useRef: ke,
    useState: ke,
    useDebugValue: ke,
    useDeferredValue: ke,
    useTransition: ke,
    useMutableSource: ke,
    useSyncExternalStore: ke,
    useId: ke,
    unstable_isNewReconciler: !1,
  },
  Ah = {
    readContext: Ye,
    useCallback: function (e, t) {
      return (st().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Ye,
    useEffect: cs,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Il(4194308, 4, _d.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Il(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Il(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = st();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = st();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Fh.bind(null, le, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = st();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ss,
    useDebugValue: qa,
    useDeferredValue: function (e) {
      return (st().memoizedState = e);
    },
    useTransition: function () {
      var e = ss(!1),
        t = e[0];
      return (e = jh.bind(null, e[1])), (st().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = le,
        l = st();
      if (ne) {
        if (n === void 0) throw Error(k(407));
        n = n();
      } else {
        if (((n = t()), ge === null)) throw Error(k(349));
        pn & 30 || yd(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        cs(xd.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Zr(9, wd.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = st(),
        t = ge.identifierPrefix;
      if (ne) {
        var n = xt,
          r = wt;
        (n = (r & ~(1 << (32 - lt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Xr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Oh++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Uh = {
    readContext: Ye,
    useCallback: Rd,
    useContext: Ye,
    useEffect: Za,
    useImperativeHandle: Pd,
    useInsertionEffect: Cd,
    useLayoutEffect: Nd,
    useMemo: Md,
    useReducer: si,
    useRef: kd,
    useState: function () {
      return si(Jr);
    },
    useDebugValue: qa,
    useDeferredValue: function (e) {
      var t = Ge();
      return Ld(t, he.memoizedState, e);
    },
    useTransition: function () {
      var e = si(Jr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: vd,
    useSyncExternalStore: gd,
    useId: Dd,
    unstable_isNewReconciler: !1,
  },
  Bh = {
    readContext: Ye,
    useCallback: Rd,
    useContext: Ye,
    useEffect: Za,
    useImperativeHandle: Pd,
    useInsertionEffect: Cd,
    useLayoutEffect: Nd,
    useMemo: Md,
    useReducer: ci,
    useRef: kd,
    useState: function () {
      return ci(Jr);
    },
    useDebugValue: qa,
    useDeferredValue: function (e) {
      var t = Ge();
      return he === null ? (t.memoizedState = e) : Ld(t, he.memoizedState, e);
    },
    useTransition: function () {
      var e = ci(Jr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: vd,
    useSyncExternalStore: gd,
    useId: Dd,
    unstable_isNewReconciler: !1,
  };
function Gn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += hp(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function di(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ta(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var $h = typeof WeakMap == "function" ? WeakMap : Map;
function jd(e, t, n) {
  (n = Et(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      so || ((so = !0), (da = r)), ta(e, t);
    }),
    n
  );
}
function Fd(e, t, n) {
  (n = Et(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        ta(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        ta(e, t),
          typeof r != "function" &&
            (Qt === null ? (Qt = new Set([this])) : Qt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function ds(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new $h();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = tm.bind(null, e, t, n)), t.then(e, e));
}
function fs(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ps(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Et(-1, 1)), (t.tag = 2), Wt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Hh = Mt.ReactCurrentOwner,
  ze = !1;
function Pe(e, t, n, r) {
  t.child = e === null ? hd(t, null, n, r) : Kn(t, e.child, n, r);
}
function hs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    Bn(t, l),
    (r = Xa(e, t, n, r, o, l)),
    (n = Ja()),
    e !== null && !ze
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Pt(e, t, l))
      : (ne && n && Ia(t), (t.flags |= 1), Pe(e, t, r, l), t.child)
  );
}
function ms(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !iu(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Id(e, t, o, r, l))
      : ((e = $l(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Vr), n(i, r) && e.ref === t.ref)
    )
      return Pt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = Yt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Id(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Vr(o, r) && e.ref === t.ref)
      if (((ze = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (ze = !0);
      else return (t.lanes = e.lanes), Pt(e, t, l);
  }
  return na(e, t, n, r, l);
}
function Ad(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        q(On, Ie),
        (Ie |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          q(On, Ie),
          (Ie |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        q(On, Ie),
        (Ie |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      q(On, Ie),
      (Ie |= r);
  return Pe(e, t, l, n), t.child;
}
function Ud(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function na(e, t, n, r, l) {
  var o = Oe(n) ? dn : _e.current;
  return (
    (o = Wn(t, o)),
    Bn(t, l),
    (n = Xa(e, t, n, r, o, l)),
    (r = Ja()),
    e !== null && !ze
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Pt(e, t, l))
      : (ne && r && Ia(t), (t.flags |= 1), Pe(e, t, n, l), t.child)
  );
}
function vs(e, t, n, r, l) {
  if (Oe(n)) {
    var o = !0;
    bl(t);
  } else o = !1;
  if ((Bn(t, l), t.stateNode === null))
    Al(e, t), fd(t, n, r), ea(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      a = t.memoizedProps;
    i.props = a;
    var u = i.context,
      s = n.contextType;
    typeof s == "object" && s !== null
      ? (s = Ye(s))
      : ((s = Oe(n) ? dn : _e.current), (s = Wn(t, s)));
    var h = n.getDerivedStateFromProps,
      v =
        typeof h == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    v ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((a !== r || u !== s) && as(t, i, r, s)),
      (Ot = !1);
    var c = t.memoizedState;
    (i.state = c),
      lo(t, r, i, l),
      (u = t.memoizedState),
      a !== r || c !== u || Te.current || Ot
        ? (typeof h == "function" && (bi(t, n, h, r), (u = t.memoizedState)),
          (a = Ot || is(t, n, a, r, c, u, s))
            ? (v ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (i.props = r),
          (i.state = u),
          (i.context = s),
          (r = a))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      cd(e, t),
      (a = t.memoizedProps),
      (s = t.type === t.elementType ? a : et(t.type, a)),
      (i.props = s),
      (v = t.pendingProps),
      (c = i.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = Ye(u))
        : ((u = Oe(n) ? dn : _e.current), (u = Wn(t, u)));
    var g = n.getDerivedStateFromProps;
    (h =
      typeof g == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((a !== v || c !== u) && as(t, i, r, u)),
      (Ot = !1),
      (c = t.memoizedState),
      (i.state = c),
      lo(t, r, i, l);
    var S = t.memoizedState;
    a !== v || c !== S || Te.current || Ot
      ? (typeof g == "function" && (bi(t, n, g, r), (S = t.memoizedState)),
        (s = Ot || is(t, n, s, r, c, S, u) || !1)
          ? (h ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, S, u),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, S, u)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (a === e.memoizedProps && c === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && c === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (i.props = r),
        (i.state = S),
        (i.context = u),
        (r = s))
      : (typeof i.componentDidUpdate != "function" ||
          (a === e.memoizedProps && c === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && c === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ra(e, t, n, r, o, l);
}
function ra(e, t, n, r, l, o) {
  Ud(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && ts(t, n, !1), Pt(e, t, o);
  (r = t.stateNode), (Hh.current = t);
  var a =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = Kn(t, e.child, null, o)), (t.child = Kn(t, null, a, o)))
      : Pe(e, t, a, o),
    (t.memoizedState = r.state),
    l && ts(t, n, !0),
    t.child
  );
}
function Bd(e) {
  var t = e.stateNode;
  t.pendingContext
    ? es(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && es(e, t.context, !1),
    Qa(e, t.containerInfo);
}
function gs(e, t, n, r, l) {
  return Qn(), Ua(l), (t.flags |= 256), Pe(e, t, n, r), t.child;
}
var la = { dehydrated: null, treeContext: null, retryLane: 0 };
function oa(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function $d(e, t, n) {
  var r = t.pendingProps,
    l = re.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    a;
  if (
    ((a = i) ||
      (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    a
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    q(re, l & 1),
    e === null)
  )
    return (
      Zi(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = _o(i, r, 0, null)),
              (e = cn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = oa(n)),
              (t.memoizedState = la),
              e)
            : ba(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((a = l.dehydrated), a !== null)))
    return Vh(e, t, i, r, a, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (a = l.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = Yt(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      a !== null ? (o = Yt(a, o)) : ((o = cn(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? oa(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = la),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Yt(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function ba(e, t) {
  return (
    (t = _o({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function _l(e, t, n, r) {
  return (
    r !== null && Ua(r),
    Kn(t, e.child, null, n),
    (e = ba(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Vh(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = di(Error(k(422)))), _l(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (l = t.mode),
        (r = _o({ mode: "visible", children: r.children }, l, 0, null)),
        (o = cn(o, l, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && Kn(t, e.child, null, i),
        (t.child.memoizedState = oa(i)),
        (t.memoizedState = la),
        o);
  if (!(t.mode & 1)) return _l(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (o = Error(k(419))), (r = di(o, r, void 0)), _l(e, t, i, r);
  }
  if (((a = (i & e.childLanes) !== 0), ze || a)) {
    if (((r = ge), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), _t(e, l), ot(r, e, l, -1));
    }
    return ou(), (r = di(Error(k(421)))), _l(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = nm.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ae = Vt(l.nextSibling)),
      (Ue = t),
      (ne = !0),
      (nt = null),
      e !== null &&
        ((Ve[We++] = wt),
        (Ve[We++] = xt),
        (Ve[We++] = fn),
        (wt = e.id),
        (xt = e.overflow),
        (fn = t)),
      (t = ba(t, r.children)),
      (t.flags |= 4096),
      t);
}
function ys(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), qi(e.return, t, n);
}
function fi(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function Hd(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((Pe(e, t, r.children, n), (r = re.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ys(e, n, t);
        else if (e.tag === 19) ys(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((q(re, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && oo(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          fi(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && oo(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        fi(t, !0, n, null, o);
        break;
      case "together":
        fi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Al(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Pt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (hn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Yt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Yt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Wh(e, t, n) {
  switch (t.tag) {
    case 3:
      Bd(t), Qn();
      break;
    case 5:
      md(t);
      break;
    case 1:
      Oe(t.type) && bl(t);
      break;
    case 4:
      Qa(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      q(no, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (q(re, re.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? $d(e, t, n)
          : (q(re, re.current & 1),
            (e = Pt(e, t, n)),
            e !== null ? e.sibling : null);
      q(re, re.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Hd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        q(re, re.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Ad(e, t, n);
  }
  return Pt(e, t, n);
}
var Vd, ia, Wd, Qd;
Vd = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
ia = function () {};
Wd = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), an(ft.current);
    var o = null;
    switch (n) {
      case "input":
        (l = Ri(e, l)), (r = Ri(e, r)), (o = []);
        break;
      case "select":
        (l = oe({}, l, { value: void 0 })),
          (r = oe({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = Di(e, l)), (r = Di(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Zl);
    }
    Ti(n, r);
    var i;
    n = null;
    for (s in l)
      if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
        if (s === "style") {
          var a = l[s];
          for (i in a) a.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          s !== "dangerouslySetInnerHTML" &&
            s !== "children" &&
            s !== "suppressContentEditableWarning" &&
            s !== "suppressHydrationWarning" &&
            s !== "autoFocus" &&
            (Fr.hasOwnProperty(s)
              ? o || (o = [])
              : (o = o || []).push(s, null));
    for (s in r) {
      var u = r[s];
      if (
        ((a = l != null ? l[s] : void 0),
        r.hasOwnProperty(s) && u !== a && (u != null || a != null))
      )
        if (s === "style")
          if (a) {
            for (i in a)
              !a.hasOwnProperty(i) ||
                (u && u.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in u)
              u.hasOwnProperty(i) &&
                a[i] !== u[i] &&
                (n || (n = {}), (n[i] = u[i]));
          } else n || (o || (o = []), o.push(s, n)), (n = u);
        else
          s === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (o = o || []).push(s, u))
            : s === "children"
            ? (typeof u != "string" && typeof u != "number") ||
              (o = o || []).push(s, "" + u)
            : s !== "suppressContentEditableWarning" &&
              s !== "suppressHydrationWarning" &&
              (Fr.hasOwnProperty(s)
                ? (u != null && s === "onScroll" && b("scroll", e),
                  o || a === u || (o = []))
                : (o = o || []).push(s, u));
    }
    n && (o = o || []).push("style", n);
    var s = o;
    (t.updateQueue = s) && (t.flags |= 4);
  }
};
Qd = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function mr(e, t) {
  if (!ne)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Ce(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Qh(e, t, n) {
  var r = t.pendingProps;
  switch ((Aa(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Ce(t), null;
    case 1:
      return Oe(t.type) && ql(), Ce(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Yn(),
        ee(Te),
        ee(_e),
        Ya(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Cl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), nt !== null && (ha(nt), (nt = null)))),
        ia(e, t),
        Ce(t),
        null
      );
    case 5:
      Ka(t);
      var l = an(Gr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Wd(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return Ce(t), null;
        }
        if (((e = an(ft.current)), Cl(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[ct] = t), (r[Kr] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              b("cancel", r), b("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              b("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Er.length; l++) b(Er[l], r);
              break;
            case "source":
              b("error", r);
              break;
            case "img":
            case "image":
            case "link":
              b("error", r), b("load", r);
              break;
            case "details":
              b("toggle", r);
              break;
            case "input":
              Pu(r, o), b("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                b("invalid", r);
              break;
            case "textarea":
              Mu(r, o), b("invalid", r);
          }
          Ti(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var a = o[i];
              i === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 &&
                      kl(r.textContent, a, e),
                    (l = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (o.suppressHydrationWarning !== !0 &&
                      kl(r.textContent, a, e),
                    (l = ["children", "" + a]))
                : Fr.hasOwnProperty(i) &&
                  a != null &&
                  i === "onScroll" &&
                  b("scroll", r);
            }
          switch (n) {
            case "input":
              ml(r), Ru(r, o, !0);
              break;
            case "textarea":
              ml(r), Lu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Zl);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = yc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[ct] = t),
            (e[Kr] = r),
            Vd(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = Oi(n, r)), n)) {
              case "dialog":
                b("cancel", e), b("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                b("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Er.length; l++) b(Er[l], e);
                l = r;
                break;
              case "source":
                b("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                b("error", e), b("load", e), (l = r);
                break;
              case "details":
                b("toggle", e), (l = r);
                break;
              case "input":
                Pu(e, r), (l = Ri(e, r)), b("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = oe({}, r, { value: void 0 })),
                  b("invalid", e);
                break;
              case "textarea":
                Mu(e, r), (l = Di(e, r)), b("invalid", e);
                break;
              default:
                l = r;
            }
            Ti(n, l), (a = l);
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var u = a[o];
                o === "style"
                  ? Sc(e, u)
                  : o === "dangerouslySetInnerHTML"
                  ? ((u = u ? u.__html : void 0), u != null && wc(e, u))
                  : o === "children"
                  ? typeof u == "string"
                    ? (n !== "textarea" || u !== "") && Ir(e, u)
                    : typeof u == "number" && Ir(e, "" + u)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (Fr.hasOwnProperty(o)
                      ? u != null && o === "onScroll" && b("scroll", e)
                      : u != null && ka(e, o, u, i));
              }
            switch (n) {
              case "input":
                ml(e), Ru(e, r, !1);
                break;
              case "textarea":
                ml(e), Lu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Xt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Fn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Fn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Zl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Ce(t), null;
    case 6:
      if (e && t.stateNode != null) Qd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (((n = an(Gr.current)), an(ft.current), Cl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[ct] = t),
            (o = r.nodeValue !== n) && ((e = Ue), e !== null))
          )
            switch (e.tag) {
              case 3:
                kl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  kl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[ct] = t),
            (t.stateNode = r);
      }
      return Ce(t), null;
    case 13:
      if (
        (ee(re),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ne && Ae !== null && t.mode & 1 && !(t.flags & 128))
          ud(), Qn(), (t.flags |= 98560), (o = !1);
        else if (((o = Cl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(k(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(k(317));
            o[ct] = t;
          } else
            Qn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Ce(t), (o = !1);
        } else nt !== null && (ha(nt), (nt = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || re.current & 1 ? me === 0 && (me = 3) : ou())),
          t.updateQueue !== null && (t.flags |= 4),
          Ce(t),
          null);
    case 4:
      return (
        Yn(), ia(e, t), e === null && Wr(t.stateNode.containerInfo), Ce(t), null
      );
    case 10:
      return Ha(t.type._context), Ce(t), null;
    case 17:
      return Oe(t.type) && ql(), Ce(t), null;
    case 19:
      if ((ee(re), (o = t.memoizedState), o === null)) return Ce(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) mr(o, !1);
        else {
          if (me !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = oo(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    mr(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return q(re, (re.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            ue() > Xn &&
            ((t.flags |= 128), (r = !0), mr(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = oo(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              mr(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !ne)
            )
              return Ce(t), null;
          } else
            2 * ue() - o.renderingStartTime > Xn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), mr(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = ue()),
          (t.sibling = null),
          (n = re.current),
          q(re, r ? (n & 1) | 2 : n & 1),
          t)
        : (Ce(t), null);
    case 22:
    case 23:
      return (
        lu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ie & 1073741824 && (Ce(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Ce(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function Kh(e, t) {
  switch ((Aa(t), t.tag)) {
    case 1:
      return (
        Oe(t.type) && ql(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Yn(),
        ee(Te),
        ee(_e),
        Ya(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Ka(t), null;
    case 13:
      if (
        (ee(re), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(k(340));
        Qn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return ee(re), null;
    case 4:
      return Yn(), null;
    case 10:
      return Ha(t.type._context), null;
    case 22:
    case 23:
      return lu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Pl = !1,
  Ne = !1,
  Yh = typeof WeakSet == "function" ? WeakSet : Set,
  L = null;
function Tn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ie(e, t, r);
      }
    else n.current = null;
}
function aa(e, t, n) {
  try {
    n();
  } catch (r) {
    ie(e, t, r);
  }
}
var ws = !1;
function Gh(e, t) {
  if (((Wi = Gl), (e = Xc()), Fa(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            a = -1,
            u = -1,
            s = 0,
            h = 0,
            v = e,
            c = null;
          t: for (;;) {
            for (
              var g;
              v !== n || (l !== 0 && v.nodeType !== 3) || (a = i + l),
                v !== o || (r !== 0 && v.nodeType !== 3) || (u = i + r),
                v.nodeType === 3 && (i += v.nodeValue.length),
                (g = v.firstChild) !== null;

            )
              (c = v), (v = g);
            for (;;) {
              if (v === e) break t;
              if (
                (c === n && ++s === l && (a = i),
                c === o && ++h === r && (u = i),
                (g = v.nextSibling) !== null)
              )
                break;
              (v = c), (c = v.parentNode);
            }
            v = g;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Qi = { focusedElem: e, selectionRange: n }, Gl = !1, L = t; L !== null; )
    if (((t = L), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (L = e);
    else
      for (; L !== null; ) {
        t = L;
        try {
          var S = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (S !== null) {
                  var x = S.memoizedProps,
                    P = S.memoizedState,
                    p = t.stateNode,
                    f = p.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : et(t.type, x),
                      P
                    );
                  p.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 &&
                    m.documentElement &&
                    m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(k(163));
            }
        } catch (y) {
          ie(t, t.return, y);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (L = e);
          break;
        }
        L = t.return;
      }
  return (S = ws), (ws = !1), S;
}
function Lr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && aa(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Co(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ua(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Kd(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Kd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[ct], delete t[Kr], delete t[Gi], delete t[Lh], delete t[Dh])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Yd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function xs(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Yd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function sa(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Zl));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (sa(e, t, n), e = e.sibling; e !== null; ) sa(e, t, n), (e = e.sibling);
}
function ca(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ca(e, t, n), e = e.sibling; e !== null; ) ca(e, t, n), (e = e.sibling);
}
var ye = null,
  tt = !1;
function zt(e, t, n) {
  for (n = n.child; n !== null; ) Gd(e, t, n), (n = n.sibling);
}
function Gd(e, t, n) {
  if (dt && typeof dt.onCommitFiberUnmount == "function")
    try {
      dt.onCommitFiberUnmount(vo, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ne || Tn(n, t);
    case 6:
      var r = ye,
        l = tt;
      (ye = null),
        zt(e, t, n),
        (ye = r),
        (tt = l),
        ye !== null &&
          (tt
            ? ((e = ye),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ye.removeChild(n.stateNode));
      break;
    case 18:
      ye !== null &&
        (tt
          ? ((e = ye),
            (n = n.stateNode),
            e.nodeType === 8
              ? oi(e.parentNode, n)
              : e.nodeType === 1 && oi(e, n),
            $r(e))
          : oi(ye, n.stateNode));
      break;
    case 4:
      (r = ye),
        (l = tt),
        (ye = n.stateNode.containerInfo),
        (tt = !0),
        zt(e, t, n),
        (ye = r),
        (tt = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ne &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && aa(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      zt(e, t, n);
      break;
    case 1:
      if (
        !Ne &&
        (Tn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          ie(n, t, a);
        }
      zt(e, t, n);
      break;
    case 21:
      zt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ne = (r = Ne) || n.memoizedState !== null), zt(e, t, n), (Ne = r))
        : zt(e, t, n);
      break;
    default:
      zt(e, t, n);
  }
}
function Ss(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Yh()),
      t.forEach(function (r) {
        var l = rm.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function be(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          a = i;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (ye = a.stateNode), (tt = !1);
              break e;
            case 3:
              (ye = a.stateNode.containerInfo), (tt = !0);
              break e;
            case 4:
              (ye = a.stateNode.containerInfo), (tt = !0);
              break e;
          }
          a = a.return;
        }
        if (ye === null) throw Error(k(160));
        Gd(o, i, l), (ye = null), (tt = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (s) {
        ie(l, t, s);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Xd(t, e), (t = t.sibling);
}
function Xd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((be(t, e), ut(e), r & 4)) {
        try {
          Lr(3, e, e.return), Co(3, e);
        } catch (x) {
          ie(e, e.return, x);
        }
        try {
          Lr(5, e, e.return);
        } catch (x) {
          ie(e, e.return, x);
        }
      }
      break;
    case 1:
      be(t, e), ut(e), r & 512 && n !== null && Tn(n, n.return);
      break;
    case 5:
      if (
        (be(t, e),
        ut(e),
        r & 512 && n !== null && Tn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Ir(l, "");
        } catch (x) {
          ie(e, e.return, x);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            a === "input" && o.type === "radio" && o.name != null && vc(l, o),
              Oi(a, i);
            var s = Oi(a, o);
            for (i = 0; i < u.length; i += 2) {
              var h = u[i],
                v = u[i + 1];
              h === "style"
                ? Sc(l, v)
                : h === "dangerouslySetInnerHTML"
                ? wc(l, v)
                : h === "children"
                ? Ir(l, v)
                : ka(l, h, v, s);
            }
            switch (a) {
              case "input":
                Mi(l, o);
                break;
              case "textarea":
                gc(l, o);
                break;
              case "select":
                var c = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var g = o.value;
                g != null
                  ? Fn(l, !!o.multiple, g, !1)
                  : c !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Fn(l, !!o.multiple, o.defaultValue, !0)
                      : Fn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[Kr] = o;
          } catch (x) {
            ie(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((be(t, e), ut(e), r & 4)) {
        if (e.stateNode === null) throw Error(k(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (x) {
          ie(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (be(t, e), ut(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          $r(t.containerInfo);
        } catch (x) {
          ie(e, e.return, x);
        }
      break;
    case 4:
      be(t, e), ut(e);
      break;
    case 13:
      be(t, e),
        ut(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (nu = ue())),
        r & 4 && Ss(e);
      break;
    case 22:
      if (
        ((h = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Ne = (s = Ne) || h), be(t, e), (Ne = s)) : be(t, e),
        ut(e),
        r & 8192)
      ) {
        if (
          ((s = e.memoizedState !== null),
          (e.stateNode.isHidden = s) && !h && e.mode & 1)
        )
          for (L = e, h = e.child; h !== null; ) {
            for (v = L = h; L !== null; ) {
              switch (((c = L), (g = c.child), c.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Lr(4, c, c.return);
                  break;
                case 1:
                  Tn(c, c.return);
                  var S = c.stateNode;
                  if (typeof S.componentWillUnmount == "function") {
                    (r = c), (n = c.return);
                    try {
                      (t = r),
                        (S.props = t.memoizedProps),
                        (S.state = t.memoizedState),
                        S.componentWillUnmount();
                    } catch (x) {
                      ie(r, n, x);
                    }
                  }
                  break;
                case 5:
                  Tn(c, c.return);
                  break;
                case 22:
                  if (c.memoizedState !== null) {
                    ks(v);
                    continue;
                  }
              }
              g !== null ? ((g.return = c), (L = g)) : ks(v);
            }
            h = h.sibling;
          }
        e: for (h = null, v = e; ; ) {
          if (v.tag === 5) {
            if (h === null) {
              h = v;
              try {
                (l = v.stateNode),
                  s
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((a = v.stateNode),
                      (u = v.memoizedProps.style),
                      (i =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (a.style.display = xc("display", i)));
              } catch (x) {
                ie(e, e.return, x);
              }
            }
          } else if (v.tag === 6) {
            if (h === null)
              try {
                v.stateNode.nodeValue = s ? "" : v.memoizedProps;
              } catch (x) {
                ie(e, e.return, x);
              }
          } else if (
            ((v.tag !== 22 && v.tag !== 23) ||
              v.memoizedState === null ||
              v === e) &&
            v.child !== null
          ) {
            (v.child.return = v), (v = v.child);
            continue;
          }
          if (v === e) break e;
          for (; v.sibling === null; ) {
            if (v.return === null || v.return === e) break e;
            h === v && (h = null), (v = v.return);
          }
          h === v && (h = null), (v.sibling.return = v.return), (v = v.sibling);
        }
      }
      break;
    case 19:
      be(t, e), ut(e), r & 4 && Ss(e);
      break;
    case 21:
      break;
    default:
      be(t, e), ut(e);
  }
}
function ut(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Yd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Ir(l, ""), (r.flags &= -33));
          var o = xs(e);
          ca(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            a = xs(e);
          sa(e, a, i);
          break;
        default:
          throw Error(k(161));
      }
    } catch (u) {
      ie(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Xh(e, t, n) {
  (L = e), Jd(e);
}
function Jd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Pl;
      if (!i) {
        var a = l.alternate,
          u = (a !== null && a.memoizedState !== null) || Ne;
        a = Pl;
        var s = Ne;
        if (((Pl = i), (Ne = u) && !s))
          for (L = l; L !== null; )
            (i = L),
              (u = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Cs(l)
                : u !== null
                ? ((u.return = i), (L = u))
                : Cs(l);
        for (; o !== null; ) (L = o), Jd(o), (o = o.sibling);
        (L = l), (Pl = a), (Ne = s);
      }
      Es(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (L = o)) : Es(e);
  }
}
function Es(e) {
  for (; L !== null; ) {
    var t = L;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ne || Co(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ne)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : et(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && os(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                os(t, i, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var s = t.alternate;
                if (s !== null) {
                  var h = s.memoizedState;
                  if (h !== null) {
                    var v = h.dehydrated;
                    v !== null && $r(v);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(k(163));
          }
        Ne || (t.flags & 512 && ua(t));
      } catch (c) {
        ie(t, t.return, c);
      }
    }
    if (t === e) {
      L = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (L = n);
      break;
    }
    L = t.return;
  }
}
function ks(e) {
  for (; L !== null; ) {
    var t = L;
    if (t === e) {
      L = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (L = n);
      break;
    }
    L = t.return;
  }
}
function Cs(e) {
  for (; L !== null; ) {
    var t = L;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Co(4, t);
          } catch (u) {
            ie(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              ie(t, l, u);
            }
          }
          var o = t.return;
          try {
            ua(t);
          } catch (u) {
            ie(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            ua(t);
          } catch (u) {
            ie(t, i, u);
          }
      }
    } catch (u) {
      ie(t, t.return, u);
    }
    if (t === e) {
      L = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (L = a);
      break;
    }
    L = t.return;
  }
}
var Jh = Math.ceil,
  uo = Mt.ReactCurrentDispatcher,
  eu = Mt.ReactCurrentOwner,
  Ke = Mt.ReactCurrentBatchConfig,
  K = 0,
  ge = null,
  fe = null,
  xe = 0,
  Ie = 0,
  On = qt(0),
  me = 0,
  qr = null,
  hn = 0,
  No = 0,
  tu = 0,
  Dr = null,
  De = null,
  nu = 0,
  Xn = 1 / 0,
  vt = null,
  so = !1,
  da = null,
  Qt = null,
  Rl = !1,
  Ut = null,
  co = 0,
  zr = 0,
  fa = null,
  Ul = -1,
  Bl = 0;
function Re() {
  return K & 6 ? ue() : Ul !== -1 ? Ul : (Ul = ue());
}
function Kt(e) {
  return e.mode & 1
    ? K & 2 && xe !== 0
      ? xe & -xe
      : Th.transition !== null
      ? (Bl === 0 && (Bl = Tc()), Bl)
      : ((e = X),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Bc(e.type))),
        e)
    : 1;
}
function ot(e, t, n, r) {
  if (50 < zr) throw ((zr = 0), (fa = null), Error(k(185)));
  nl(e, n, r),
    (!(K & 2) || e !== ge) &&
      (e === ge && (!(K & 2) && (No |= n), me === 4 && It(e, xe)),
      je(e, r),
      n === 1 && K === 0 && !(t.mode & 1) && ((Xn = ue() + 500), So && bt()));
}
function je(e, t) {
  var n = e.callbackNode;
  Tp(e, t);
  var r = Yl(e, e === ge ? xe : 0);
  if (r === 0)
    n !== null && Tu(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Tu(n), t === 1))
      e.tag === 0 ? zh(Ns.bind(null, e)) : od(Ns.bind(null, e)),
        Rh(function () {
          !(K & 6) && bt();
        }),
        (n = null);
    else {
      switch (Oc(r)) {
        case 1:
          n = Ra;
          break;
        case 4:
          n = Dc;
          break;
        case 16:
          n = Kl;
          break;
        case 536870912:
          n = zc;
          break;
        default:
          n = Kl;
      }
      n = lf(n, Zd.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Zd(e, t) {
  if (((Ul = -1), (Bl = 0), K & 6)) throw Error(k(327));
  var n = e.callbackNode;
  if ($n() && e.callbackNode !== n) return null;
  var r = Yl(e, e === ge ? xe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = fo(e, r);
  else {
    t = r;
    var l = K;
    K |= 2;
    var o = bd();
    (ge !== e || xe !== t) && ((vt = null), (Xn = ue() + 500), sn(e, t));
    do
      try {
        bh();
        break;
      } catch (a) {
        qd(e, a);
      }
    while (1);
    $a(),
      (uo.current = o),
      (K = l),
      fe !== null ? (t = 0) : ((ge = null), (xe = 0), (t = me));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Ui(e)), l !== 0 && ((r = l), (t = pa(e, l)))), t === 1)
    )
      throw ((n = qr), sn(e, 0), It(e, r), je(e, ue()), n);
    if (t === 6) It(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Zh(l) &&
          ((t = fo(e, r)),
          t === 2 && ((o = Ui(e)), o !== 0 && ((r = o), (t = pa(e, o)))),
          t === 1))
      )
        throw ((n = qr), sn(e, 0), It(e, r), je(e, ue()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          rn(e, De, vt);
          break;
        case 3:
          if (
            (It(e, r), (r & 130023424) === r && ((t = nu + 500 - ue()), 10 < t))
          ) {
            if (Yl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              Re(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Yi(rn.bind(null, e, De, vt), t);
            break;
          }
          rn(e, De, vt);
          break;
        case 4:
          if ((It(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - lt(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = ue() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Jh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Yi(rn.bind(null, e, De, vt), r);
            break;
          }
          rn(e, De, vt);
          break;
        case 5:
          rn(e, De, vt);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return je(e, ue()), e.callbackNode === n ? Zd.bind(null, e) : null;
}
function pa(e, t) {
  var n = Dr;
  return (
    e.current.memoizedState.isDehydrated && (sn(e, t).flags |= 256),
    (e = fo(e, t)),
    e !== 2 && ((t = De), (De = n), t !== null && ha(t)),
    e
  );
}
function ha(e) {
  De === null ? (De = e) : De.push.apply(De, e);
}
function Zh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!it(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function It(e, t) {
  for (
    t &= ~tu,
      t &= ~No,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - lt(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Ns(e) {
  if (K & 6) throw Error(k(327));
  $n();
  var t = Yl(e, 0);
  if (!(t & 1)) return je(e, ue()), null;
  var n = fo(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ui(e);
    r !== 0 && ((t = r), (n = pa(e, r)));
  }
  if (n === 1) throw ((n = qr), sn(e, 0), It(e, t), je(e, ue()), n);
  if (n === 6) throw Error(k(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    rn(e, De, vt),
    je(e, ue()),
    null
  );
}
function ru(e, t) {
  var n = K;
  K |= 1;
  try {
    return e(t);
  } finally {
    (K = n), K === 0 && ((Xn = ue() + 500), So && bt());
  }
}
function mn(e) {
  Ut !== null && Ut.tag === 0 && !(K & 6) && $n();
  var t = K;
  K |= 1;
  var n = Ke.transition,
    r = X;
  try {
    if (((Ke.transition = null), (X = 1), e)) return e();
  } finally {
    (X = r), (Ke.transition = n), (K = t), !(K & 6) && bt();
  }
}
function lu() {
  (Ie = On.current), ee(On);
}
function sn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Ph(n)), fe !== null))
    for (n = fe.return; n !== null; ) {
      var r = n;
      switch ((Aa(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && ql();
          break;
        case 3:
          Yn(), ee(Te), ee(_e), Ya();
          break;
        case 5:
          Ka(r);
          break;
        case 4:
          Yn();
          break;
        case 13:
          ee(re);
          break;
        case 19:
          ee(re);
          break;
        case 10:
          Ha(r.type._context);
          break;
        case 22:
        case 23:
          lu();
      }
      n = n.return;
    }
  if (
    ((ge = e),
    (fe = e = Yt(e.current, null)),
    (xe = Ie = t),
    (me = 0),
    (qr = null),
    (tu = No = hn = 0),
    (De = Dr = null),
    on !== null)
  ) {
    for (t = 0; t < on.length; t++)
      if (((n = on[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    on = null;
  }
  return e;
}
function qd(e, t) {
  do {
    var n = fe;
    try {
      if (($a(), (Fl.current = ao), io)) {
        for (var r = le.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        io = !1;
      }
      if (
        ((pn = 0),
        (ve = he = le = null),
        (Mr = !1),
        (Xr = 0),
        (eu.current = null),
        n === null || n.return === null)
      ) {
        (me = 1), (qr = t), (fe = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          a = n,
          u = t;
        if (
          ((t = xe),
          (a.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var s = u,
            h = a,
            v = h.tag;
          if (!(h.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var c = h.alternate;
            c
              ? ((h.updateQueue = c.updateQueue),
                (h.memoizedState = c.memoizedState),
                (h.lanes = c.lanes))
              : ((h.updateQueue = null), (h.memoizedState = null));
          }
          var g = fs(i);
          if (g !== null) {
            (g.flags &= -257),
              ps(g, i, a, o, t),
              g.mode & 1 && ds(o, s, t),
              (t = g),
              (u = s);
            var S = t.updateQueue;
            if (S === null) {
              var x = new Set();
              x.add(u), (t.updateQueue = x);
            } else S.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              ds(o, s, t), ou();
              break e;
            }
            u = Error(k(426));
          }
        } else if (ne && a.mode & 1) {
          var P = fs(i);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256),
              ps(P, i, a, o, t),
              Ua(Gn(u, a));
            break e;
          }
        }
        (o = u = Gn(u, a)),
          me !== 4 && (me = 2),
          Dr === null ? (Dr = [o]) : Dr.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var p = jd(o, u, t);
              ls(o, p);
              break e;
            case 1:
              a = u;
              var f = o.type,
                m = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (Qt === null || !Qt.has(m))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var y = Fd(o, a, t);
                ls(o, y);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      tf(n);
    } catch (_) {
      (t = _), fe === n && n !== null && (fe = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function bd() {
  var e = uo.current;
  return (uo.current = ao), e === null ? ao : e;
}
function ou() {
  (me === 0 || me === 3 || me === 2) && (me = 4),
    ge === null || (!(hn & 268435455) && !(No & 268435455)) || It(ge, xe);
}
function fo(e, t) {
  var n = K;
  K |= 2;
  var r = bd();
  (ge !== e || xe !== t) && ((vt = null), sn(e, t));
  do
    try {
      qh();
      break;
    } catch (l) {
      qd(e, l);
    }
  while (1);
  if (($a(), (K = n), (uo.current = r), fe !== null)) throw Error(k(261));
  return (ge = null), (xe = 0), me;
}
function qh() {
  for (; fe !== null; ) ef(fe);
}
function bh() {
  for (; fe !== null && !Cp(); ) ef(fe);
}
function ef(e) {
  var t = rf(e.alternate, e, Ie);
  (e.memoizedProps = e.pendingProps),
    t === null ? tf(e) : (fe = t),
    (eu.current = null);
}
function tf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Kh(n, t)), n !== null)) {
        (n.flags &= 32767), (fe = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (me = 6), (fe = null);
        return;
      }
    } else if (((n = Qh(n, t, Ie)), n !== null)) {
      fe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      fe = t;
      return;
    }
    fe = t = e;
  } while (t !== null);
  me === 0 && (me = 5);
}
function rn(e, t, n) {
  var r = X,
    l = Ke.transition;
  try {
    (Ke.transition = null), (X = 1), em(e, t, n, r);
  } finally {
    (Ke.transition = l), (X = r);
  }
  return null;
}
function em(e, t, n, r) {
  do $n();
  while (Ut !== null);
  if (K & 6) throw Error(k(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(k(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Op(e, o),
    e === ge && ((fe = ge = null), (xe = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Rl ||
      ((Rl = !0),
      lf(Kl, function () {
        return $n(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Ke.transition), (Ke.transition = null);
    var i = X;
    X = 1;
    var a = K;
    (K |= 4),
      (eu.current = null),
      Gh(e, n),
      Xd(n, e),
      xh(Qi),
      (Gl = !!Wi),
      (Qi = Wi = null),
      (e.current = n),
      Xh(n),
      Np(),
      (K = a),
      (X = i),
      (Ke.transition = o);
  } else e.current = n;
  if (
    (Rl && ((Rl = !1), (Ut = e), (co = l)),
    (o = e.pendingLanes),
    o === 0 && (Qt = null),
    Rp(n.stateNode),
    je(e, ue()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (so) throw ((so = !1), (e = da), (da = null), e);
  return (
    co & 1 && e.tag !== 0 && $n(),
    (o = e.pendingLanes),
    o & 1 ? (e === fa ? zr++ : ((zr = 0), (fa = e))) : (zr = 0),
    bt(),
    null
  );
}
function $n() {
  if (Ut !== null) {
    var e = Oc(co),
      t = Ke.transition,
      n = X;
    try {
      if (((Ke.transition = null), (X = 16 > e ? 16 : e), Ut === null))
        var r = !1;
      else {
        if (((e = Ut), (Ut = null), (co = 0), K & 6)) throw Error(k(331));
        var l = K;
        for (K |= 4, L = e.current; L !== null; ) {
          var o = L,
            i = o.child;
          if (L.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var s = a[u];
                for (L = s; L !== null; ) {
                  var h = L;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Lr(8, h, o);
                  }
                  var v = h.child;
                  if (v !== null) (v.return = h), (L = v);
                  else
                    for (; L !== null; ) {
                      h = L;
                      var c = h.sibling,
                        g = h.return;
                      if ((Kd(h), h === s)) {
                        L = null;
                        break;
                      }
                      if (c !== null) {
                        (c.return = g), (L = c);
                        break;
                      }
                      L = g;
                    }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var x = S.child;
                if (x !== null) {
                  S.child = null;
                  do {
                    var P = x.sibling;
                    (x.sibling = null), (x = P);
                  } while (x !== null);
                }
              }
              L = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (L = i);
          else
            e: for (; L !== null; ) {
              if (((o = L), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Lr(9, o, o.return);
                }
              var p = o.sibling;
              if (p !== null) {
                (p.return = o.return), (L = p);
                break e;
              }
              L = o.return;
            }
        }
        var f = e.current;
        for (L = f; L !== null; ) {
          i = L;
          var m = i.child;
          if (i.subtreeFlags & 2064 && m !== null) (m.return = i), (L = m);
          else
            e: for (i = f; L !== null; ) {
              if (((a = L), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Co(9, a);
                  }
                } catch (_) {
                  ie(a, a.return, _);
                }
              if (a === i) {
                L = null;
                break e;
              }
              var y = a.sibling;
              if (y !== null) {
                (y.return = a.return), (L = y);
                break e;
              }
              L = a.return;
            }
        }
        if (
          ((K = l), bt(), dt && typeof dt.onPostCommitFiberRoot == "function")
        )
          try {
            dt.onPostCommitFiberRoot(vo, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (X = n), (Ke.transition = t);
    }
  }
  return !1;
}
function _s(e, t, n) {
  (t = Gn(n, t)),
    (t = jd(e, t, 1)),
    (e = Wt(e, t, 1)),
    (t = Re()),
    e !== null && (nl(e, 1, t), je(e, t));
}
function ie(e, t, n) {
  if (e.tag === 3) _s(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        _s(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Qt === null || !Qt.has(r)))
        ) {
          (e = Gn(n, e)),
            (e = Fd(t, e, 1)),
            (t = Wt(t, e, 1)),
            (e = Re()),
            t !== null && (nl(t, 1, e), je(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function tm(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Re()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ge === e &&
      (xe & n) === n &&
      (me === 4 || (me === 3 && (xe & 130023424) === xe && 500 > ue() - nu)
        ? sn(e, 0)
        : (tu |= n)),
    je(e, t);
}
function nf(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = yl), (yl <<= 1), !(yl & 130023424) && (yl = 4194304))
      : (t = 1));
  var n = Re();
  (e = _t(e, t)), e !== null && (nl(e, t, n), je(e, n));
}
function nm(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), nf(e, n);
}
function rm(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(k(314));
  }
  r !== null && r.delete(t), nf(e, n);
}
var rf;
rf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Te.current) ze = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (ze = !1), Wh(e, t, n);
      ze = !!(e.flags & 131072);
    }
  else (ze = !1), ne && t.flags & 1048576 && id(t, to, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Al(e, t), (e = t.pendingProps);
      var l = Wn(t, _e.current);
      Bn(t, n), (l = Xa(null, t, r, e, l, n));
      var o = Ja();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Oe(r) ? ((o = !0), bl(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Wa(t),
            (l.updater = Eo),
            (t.stateNode = l),
            (l._reactInternals = t),
            ea(t, r, e, n),
            (t = ra(null, t, r, !0, o, n)))
          : ((t.tag = 0), ne && o && Ia(t), Pe(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Al(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = om(r)),
          (e = et(r, e)),
          l)
        ) {
          case 0:
            t = na(null, t, r, e, n);
            break e;
          case 1:
            t = vs(null, t, r, e, n);
            break e;
          case 11:
            t = hs(null, t, r, e, n);
            break e;
          case 14:
            t = ms(null, t, r, et(r.type, e), n);
            break e;
        }
        throw Error(k(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : et(r, l)),
        na(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : et(r, l)),
        vs(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Bd(t), e === null)) throw Error(k(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          cd(e, t),
          lo(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = Gn(Error(k(423)), t)), (t = gs(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = Gn(Error(k(424)), t)), (t = gs(e, t, r, n, l));
            break e;
          } else
            for (
              Ae = Vt(t.stateNode.containerInfo.firstChild),
                Ue = t,
                ne = !0,
                nt = null,
                n = hd(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Qn(), r === l)) {
            t = Pt(e, t, n);
            break e;
          }
          Pe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        md(t),
        e === null && Zi(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Ki(r, l) ? (i = null) : o !== null && Ki(r, o) && (t.flags |= 32),
        Ud(e, t),
        Pe(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && Zi(t), null;
    case 13:
      return $d(e, t, n);
    case 4:
      return (
        Qa(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Kn(t, null, r, n)) : Pe(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : et(r, l)),
        hs(e, t, r, l, n)
      );
    case 7:
      return Pe(e, t, t.pendingProps, n), t.child;
    case 8:
      return Pe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Pe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          q(no, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (it(o.value, i)) {
            if (o.children === l.children && !Te.current) {
              t = Pt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies;
              if (a !== null) {
                i = o.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      (u = Et(-1, n & -n)), (u.tag = 2);
                      var s = o.updateQueue;
                      if (s !== null) {
                        s = s.shared;
                        var h = s.pending;
                        h === null
                          ? (u.next = u)
                          : ((u.next = h.next), (h.next = u)),
                          (s.pending = u);
                      }
                    }
                    (o.lanes |= n),
                      (u = o.alternate),
                      u !== null && (u.lanes |= n),
                      qi(o.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(k(341));
                (i.lanes |= n),
                  (a = i.alternate),
                  a !== null && (a.lanes |= n),
                  qi(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        Pe(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        Bn(t, n),
        (l = Ye(l)),
        (r = r(l)),
        (t.flags |= 1),
        Pe(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = et(r, t.pendingProps)),
        (l = et(r.type, l)),
        ms(e, t, r, l, n)
      );
    case 15:
      return Id(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : et(r, l)),
        Al(e, t),
        (t.tag = 1),
        Oe(r) ? ((e = !0), bl(t)) : (e = !1),
        Bn(t, n),
        fd(t, r, l),
        ea(t, r, l, n),
        ra(null, t, r, !0, e, n)
      );
    case 19:
      return Hd(e, t, n);
    case 22:
      return Ad(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function lf(e, t) {
  return Lc(e, t);
}
function lm(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Qe(e, t, n, r) {
  return new lm(e, t, n, r);
}
function iu(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function om(e) {
  if (typeof e == "function") return iu(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Na)) return 11;
    if (e === _a) return 14;
  }
  return 2;
}
function Yt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Qe(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function $l(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) iu(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case Cn:
        return cn(n.children, l, o, t);
      case Ca:
        (i = 8), (l |= 8);
        break;
      case Ci:
        return (
          (e = Qe(12, n, t, l | 2)), (e.elementType = Ci), (e.lanes = o), e
        );
      case Ni:
        return (e = Qe(13, n, t, l)), (e.elementType = Ni), (e.lanes = o), e;
      case _i:
        return (e = Qe(19, n, t, l)), (e.elementType = _i), (e.lanes = o), e;
      case pc:
        return _o(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case dc:
              i = 10;
              break e;
            case fc:
              i = 9;
              break e;
            case Na:
              i = 11;
              break e;
            case _a:
              i = 14;
              break e;
            case Tt:
              (i = 16), (r = null);
              break e;
          }
        throw Error(k(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Qe(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function cn(e, t, n, r) {
  return (e = Qe(7, e, r, t)), (e.lanes = n), e;
}
function _o(e, t, n, r) {
  return (
    (e = Qe(22, e, r, t)),
    (e.elementType = pc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function pi(e, t, n) {
  return (e = Qe(6, e, null, t)), (e.lanes = n), e;
}
function hi(e, t, n) {
  return (
    (t = Qe(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function im(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Go(0)),
    (this.expirationTimes = Go(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Go(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function au(e, t, n, r, l, o, i, a, u) {
  return (
    (e = new im(e, t, n, a, u)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Qe(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Wa(o),
    e
  );
}
function am(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: kn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function of(e) {
  if (!e) return Jt;
  e = e._reactInternals;
  e: {
    if (gn(e) !== e || e.tag !== 1) throw Error(k(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Oe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Oe(n)) return ld(e, n, t);
  }
  return t;
}
function af(e, t, n, r, l, o, i, a, u) {
  return (
    (e = au(n, r, !0, e, l, o, i, a, u)),
    (e.context = of(null)),
    (n = e.current),
    (r = Re()),
    (l = Kt(n)),
    (o = Et(r, l)),
    (o.callback = t ?? null),
    Wt(n, o, l),
    (e.current.lanes = l),
    nl(e, l, r),
    je(e, r),
    e
  );
}
function Po(e, t, n, r) {
  var l = t.current,
    o = Re(),
    i = Kt(l);
  return (
    (n = of(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Et(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Wt(l, t, i)),
    e !== null && (ot(e, l, i, o), jl(e, l, i)),
    i
  );
}
function po(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ps(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function uu(e, t) {
  Ps(e, t), (e = e.alternate) && Ps(e, t);
}
function um() {
  return null;
}
var uf =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function su(e) {
  this._internalRoot = e;
}
Ro.prototype.render = su.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  Po(e, t, null, null);
};
Ro.prototype.unmount = su.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    mn(function () {
      Po(null, e, null, null);
    }),
      (t[Nt] = null);
  }
};
function Ro(e) {
  this._internalRoot = e;
}
Ro.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Ic();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ft.length && t !== 0 && t < Ft[n].priority; n++);
    Ft.splice(n, 0, e), n === 0 && Uc(e);
  }
};
function cu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Mo(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Rs() {}
function sm(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var s = po(i);
        o.call(s);
      };
    }
    var i = af(t, r, e, 0, null, !1, !1, "", Rs);
    return (
      (e._reactRootContainer = i),
      (e[Nt] = i.current),
      Wr(e.nodeType === 8 ? e.parentNode : e),
      mn(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var s = po(u);
      a.call(s);
    };
  }
  var u = au(e, 0, !1, null, null, !1, !1, "", Rs);
  return (
    (e._reactRootContainer = u),
    (e[Nt] = u.current),
    Wr(e.nodeType === 8 ? e.parentNode : e),
    mn(function () {
      Po(t, u, n, r);
    }),
    u
  );
}
function Lo(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var a = l;
      l = function () {
        var u = po(i);
        a.call(u);
      };
    }
    Po(t, i, e, l);
  } else i = sm(n, t, e, l, r);
  return po(i);
}
jc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Sr(t.pendingLanes);
        n !== 0 &&
          (Ma(t, n | 1), je(t, ue()), !(K & 6) && ((Xn = ue() + 500), bt()));
      }
      break;
    case 13:
      mn(function () {
        var r = _t(e, 1);
        if (r !== null) {
          var l = Re();
          ot(r, e, 1, l);
        }
      }),
        uu(e, 1);
  }
};
La = function (e) {
  if (e.tag === 13) {
    var t = _t(e, 134217728);
    if (t !== null) {
      var n = Re();
      ot(t, e, 134217728, n);
    }
    uu(e, 134217728);
  }
};
Fc = function (e) {
  if (e.tag === 13) {
    var t = Kt(e),
      n = _t(e, t);
    if (n !== null) {
      var r = Re();
      ot(n, e, t, r);
    }
    uu(e, t);
  }
};
Ic = function () {
  return X;
};
Ac = function (e, t) {
  var n = X;
  try {
    return (X = e), t();
  } finally {
    X = n;
  }
};
Fi = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Mi(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = xo(r);
            if (!l) throw Error(k(90));
            mc(r), Mi(r, l);
          }
        }
      }
      break;
    case "textarea":
      gc(e, n);
      break;
    case "select":
      (t = n.value), t != null && Fn(e, !!n.multiple, t, !1);
  }
};
Cc = ru;
Nc = mn;
var cm = { usingClientEntryPoint: !1, Events: [ll, Rn, xo, Ec, kc, ru] },
  vr = {
    findFiberByHostInstance: ln,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  dm = {
    bundleType: vr.bundleType,
    version: vr.version,
    rendererPackageName: vr.rendererPackageName,
    rendererConfig: vr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Mt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Rc(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: vr.findFiberByHostInstance || um,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ml = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ml.isDisabled && Ml.supportsFiber)
    try {
      (vo = Ml.inject(dm)), (dt = Ml);
    } catch {}
}
$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = cm;
$e.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!cu(t)) throw Error(k(200));
  return am(e, t, null, n);
};
$e.createRoot = function (e, t) {
  if (!cu(e)) throw Error(k(299));
  var n = !1,
    r = "",
    l = uf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = au(e, 1, !1, null, null, n, !1, r, l)),
    (e[Nt] = t.current),
    Wr(e.nodeType === 8 ? e.parentNode : e),
    new su(t)
  );
};
$e.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(k(188))
      : ((e = Object.keys(e).join(",")), Error(k(268, e)));
  return (e = Rc(t)), (e = e === null ? null : e.stateNode), e;
};
$e.flushSync = function (e) {
  return mn(e);
};
$e.hydrate = function (e, t, n) {
  if (!Mo(t)) throw Error(k(200));
  return Lo(null, e, t, !0, n);
};
$e.hydrateRoot = function (e, t, n) {
  if (!cu(e)) throw Error(k(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = uf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = af(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[Nt] = t.current),
    Wr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new Ro(t);
};
$e.render = function (e, t, n) {
  if (!Mo(t)) throw Error(k(200));
  return Lo(null, e, t, !1, n);
};
$e.unmountComponentAtNode = function (e) {
  if (!Mo(e)) throw Error(k(40));
  return e._reactRootContainer
    ? (mn(function () {
        Lo(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Nt] = null);
        });
      }),
      !0)
    : !1;
};
$e.unstable_batchedUpdates = ru;
$e.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Mo(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return Lo(e, t, n, !1, r);
};
$e.version = "18.2.0-next-9e3b772b8-20220608";
(function (e) {
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (n) {
        console.error(n);
      }
  }
  t(), (e.exports = $e);
})(up);
var Ms = Si;
(xi.createRoot = Ms.createRoot), (xi.hydrateRoot = Ms.hydrateRoot);
/**
 * @remix-run/router v1.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Z() {
  return (
    (Z = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Z.apply(this, arguments)
  );
}
var de;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(de || (de = {}));
const Ls = "popstate";
function fm(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: o, search: i, hash: a } = r.location;
    return br(
      "",
      { pathname: o, search: i, hash: a },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : Rt(l);
  }
  return mm(t, n, null, e);
}
function $(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function pm(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function hm() {
  return Math.random().toString(36).substr(2, 8);
}
function Ds(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function br(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Z(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Lt(t) : t,
      { state: n, key: (t && t.key) || r || hm() }
    )
  );
}
function Rt(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Lt(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function mm(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: o = !1 } = r,
    i = l.history,
    a = de.Pop,
    u = null,
    s = h();
  s == null && ((s = 0), i.replaceState(Z({}, i.state, { idx: s }), ""));
  function h() {
    return (i.state || { idx: null }).idx;
  }
  function v() {
    let P = de.Pop,
      p = h();
    if (p != null) {
      let f = p - s;
      (a = P), (s = p), u && u({ action: a, location: x.location, delta: f });
    } else
      pm(
        !1,
        "You are trying to block a POP navigation to a location that was not created by @remix-run/router. The block will fail silently in production, but in general you should do all navigation with the router (instead of using window.history.pushState directly) to avoid this situation."
      );
  }
  function c(P, p) {
    a = de.Push;
    let f = br(x.location, P, p);
    n && n(f, P), (s = h() + 1);
    let m = Ds(f, s),
      y = x.createHref(f);
    try {
      i.pushState(m, "", y);
    } catch {
      l.location.assign(y);
    }
    o && u && u({ action: a, location: x.location, delta: 1 });
  }
  function g(P, p) {
    a = de.Replace;
    let f = br(x.location, P, p);
    n && n(f, P), (s = h());
    let m = Ds(f, s),
      y = x.createHref(f);
    i.replaceState(m, "", y),
      o && u && u({ action: a, location: x.location, delta: 0 });
  }
  function S(P) {
    let p = l.location.origin !== "null" ? l.location.origin : l.location.href,
      f = typeof P == "string" ? P : Rt(P);
    return (
      $(
        p,
        "No window.location.(origin|href) available to create URL for href: " +
          f
      ),
      new URL(f, p)
    );
  }
  let x = {
    get action() {
      return a;
    },
    get location() {
      return e(l, i);
    },
    listen(P) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Ls, v),
        (u = P),
        () => {
          l.removeEventListener(Ls, v), (u = null);
        }
      );
    },
    createHref(P) {
      return t(l, P);
    },
    createURL: S,
    encodeLocation(P) {
      let p = S(P);
      return { pathname: p.pathname, search: p.search, hash: p.hash };
    },
    push: c,
    replace: g,
    go(P) {
      return i.go(P);
    },
  };
  return x;
}
var we;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(we || (we = {}));
function vm(e) {
  return e.index === !0;
}
function sf(e, t, n) {
  return (
    t === void 0 && (t = []),
    n === void 0 && (n = new Set()),
    e.map((r, l) => {
      let o = [...t, l],
        i = typeof r.id == "string" ? r.id : o.join("-");
      return (
        $(
          r.index !== !0 || !r.children,
          "Cannot specify children on an index route"
        ),
        $(
          !n.has(i),
          'Found a route id collision on id "' +
            i +
            `".  Route id's must be globally unique within Data Router usages`
        ),
        n.add(i),
        vm(r)
          ? Z({}, r, { id: i })
          : Z({}, r, {
              id: i,
              children: r.children ? sf(r.children, o, n) : void 0,
            })
      );
    })
  );
}
function kr(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? Lt(t) : t,
    l = ff(r.pathname || "/", n);
  if (l == null) return null;
  let o = cf(e);
  gm(o);
  let i = null;
  for (let a = 0; i == null && a < o.length; ++a) i = _m(o[a], Mm(l));
  return i;
}
function cf(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (o, i, a) => {
    let u = {
      relativePath: a === void 0 ? o.path || "" : a,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    };
    u.relativePath.startsWith("/") &&
      ($(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let s = kt([r, u.relativePath]),
      h = n.concat(u);
    o.children &&
      o.children.length > 0 &&
      ($(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + s + '".')
      ),
      cf(o.children, t, h, s)),
      !(o.path == null && !o.index) &&
        t.push({ path: s, score: Cm(s, o.index), routesMeta: h });
  };
  return (
    e.forEach((o, i) => {
      var a;
      if (o.path === "" || !((a = o.path) != null && a.includes("?"))) l(o, i);
      else for (let u of df(o.path)) l(o, i, u);
    }),
    t
  );
}
function df(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [o, ""] : [o];
  let i = df(r.join("/")),
    a = [];
  return (
    a.push(...i.map((u) => (u === "" ? o : [o, u].join("/")))),
    l && a.push(...i),
    a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function gm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Nm(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const ym = /^:\w+$/,
  wm = 3,
  xm = 2,
  Sm = 1,
  Em = 10,
  km = -2,
  zs = (e) => e === "*";
function Cm(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(zs) && (r += km),
    t && (r += xm),
    n
      .filter((l) => !zs(l))
      .reduce((l, o) => l + (ym.test(o) ? wm : o === "" ? Sm : Em), r)
  );
}
function Nm(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function _m(e, t) {
  let { routesMeta: n } = e,
    r = {},
    l = "/",
    o = [];
  for (let i = 0; i < n.length; ++i) {
    let a = n[i],
      u = i === n.length - 1,
      s = l === "/" ? t : t.slice(l.length) || "/",
      h = Pm(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: u },
        s
      );
    if (!h) return null;
    Object.assign(r, h.params);
    let v = a.route;
    o.push({
      params: r,
      pathname: kt([l, h.pathname]),
      pathnameBase: Tm(kt([l, h.pathnameBase])),
      route: v,
    }),
      h.pathnameBase !== "/" && (l = kt([l, h.pathnameBase]));
  }
  return o;
}
function Pm(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Rm(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let o = l[0],
    i = o.replace(/(.)\/+$/, "$1"),
    a = l.slice(1);
  return {
    params: r.reduce((s, h, v) => {
      if (h === "*") {
        let c = a[v] || "";
        i = o.slice(0, o.length - c.length).replace(/(.)\/+$/, "$1");
      }
      return (s[h] = Lm(a[v] || "", h)), s;
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function Rm(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Do(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&")
        .replace(/\/:(\w+)/g, (i, a) => (r.push(a), "/([^\\/]+)"));
  return (
    e.endsWith("*")
      ? (r.push("*"),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (l += "\\/*$")
      : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function Mm(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      Do(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Lm(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      Do(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + n + ").")
      ),
      e
    );
  }
}
function ff(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Do(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Dm(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? Lt(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : zm(n, t)) : t,
    search: Om(r),
    hash: jm(l),
  };
}
function zm(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function mi(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function zo(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function du(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = Lt(e))
    : ((l = Z({}, e)),
      $(
        !l.pathname || !l.pathname.includes("?"),
        mi("?", "pathname", "search", l)
      ),
      $(
        !l.pathname || !l.pathname.includes("#"),
        mi("#", "pathname", "hash", l)
      ),
      $(!l.search || !l.search.includes("#"), mi("#", "search", "hash", l)));
  let o = e === "" || l.pathname === "",
    i = o ? "/" : l.pathname,
    a;
  if (r || i == null) a = n;
  else {
    let v = t.length - 1;
    if (i.startsWith("..")) {
      let c = i.split("/");
      for (; c[0] === ".."; ) c.shift(), (v -= 1);
      l.pathname = c.join("/");
    }
    a = v >= 0 ? t[v] : "/";
  }
  let u = Dm(l, a),
    s = i && i !== "/" && i.endsWith("/"),
    h = (o || i === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (s || h) && (u.pathname += "/"), u;
}
const kt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Tm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Om = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  jm = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class Ts extends Error {}
class Fm {
  constructor(t, n) {
    (this.pendingKeysSet = new Set()),
      (this.subscribers = new Set()),
      (this.deferredKeys = []),
      $(
        t && typeof t == "object" && !Array.isArray(t),
        "defer() only accepts plain objects"
      );
    let r;
    (this.abortPromise = new Promise((o, i) => (r = i))),
      (this.controller = new AbortController());
    let l = () => r(new Ts("Deferred data aborted"));
    (this.unlistenAbortSignal = () =>
      this.controller.signal.removeEventListener("abort", l)),
      this.controller.signal.addEventListener("abort", l),
      (this.data = Object.entries(t).reduce((o, i) => {
        let [a, u] = i;
        return Object.assign(o, { [a]: this.trackPromise(a, u) });
      }, {})),
      (this.init = n);
  }
  trackPromise(t, n) {
    if (!(n instanceof Promise)) return n;
    this.deferredKeys.push(t), this.pendingKeysSet.add(t);
    let r = Promise.race([n, this.abortPromise]).then(
      (l) => this.onSettle(r, t, null, l),
      (l) => this.onSettle(r, t, l)
    );
    return (
      r.catch(() => {}),
      Object.defineProperty(r, "_tracked", { get: () => !0 }),
      r
    );
  }
  onSettle(t, n, r, l) {
    return this.controller.signal.aborted && r instanceof Ts
      ? (this.unlistenAbortSignal(),
        Object.defineProperty(t, "_error", { get: () => r }),
        Promise.reject(r))
      : (this.pendingKeysSet.delete(n),
        this.done && this.unlistenAbortSignal(),
        r
          ? (Object.defineProperty(t, "_error", { get: () => r }),
            this.emit(!1, n),
            Promise.reject(r))
          : (Object.defineProperty(t, "_data", { get: () => l }),
            this.emit(!1, n),
            l));
  }
  emit(t, n) {
    this.subscribers.forEach((r) => r(t, n));
  }
  subscribe(t) {
    return this.subscribers.add(t), () => this.subscribers.delete(t);
  }
  cancel() {
    this.controller.abort(),
      this.pendingKeysSet.forEach((t, n) => this.pendingKeysSet.delete(n)),
      this.emit(!0);
  }
  async resolveData(t) {
    let n = !1;
    if (!this.done) {
      let r = () => this.cancel();
      t.addEventListener("abort", r),
        (n = await new Promise((l) => {
          this.subscribe((o) => {
            t.removeEventListener("abort", r), (o || this.done) && l(o);
          });
        }));
    }
    return n;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    return (
      $(
        this.data !== null && this.done,
        "Can only unwrap data on initialized and settled deferreds"
      ),
      Object.entries(this.data).reduce((t, n) => {
        let [r, l] = n;
        return Object.assign(t, { [r]: Am(l) });
      }, {})
    );
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function Im(e) {
  return e instanceof Promise && e._tracked === !0;
}
function Am(e) {
  if (!Im(e)) return e;
  if (e._error) throw e._error;
  return e._data;
}
class To {
  constructor(t, n, r, l) {
    l === void 0 && (l = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = l),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r);
  }
}
function pf(e) {
  return e instanceof To;
}
const hf = ["post", "put", "patch", "delete"],
  Um = new Set(hf),
  Bm = ["get", ...hf],
  $m = new Set(Bm),
  Hm = new Set([301, 302, 303, 307, 308]),
  Vm = new Set([307, 308]),
  vi = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
  },
  Wm = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
  },
  Os = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  mf =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Qm = !mf;
function Km(e) {
  $(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let t = sf(e.routes),
    n = null,
    r = new Set(),
    l = null,
    o = null,
    i = null,
    a = e.hydrationData != null,
    u = kr(t, e.history.location, e.basename),
    s = null;
  if (u == null) {
    let w = gt(404, { pathname: e.history.location.pathname }),
      { matches: E, route: C } = Bs(t);
    (u = E), (s = { [C.id]: w });
  }
  let h = !u.some((w) => w.route.loader) || e.hydrationData != null,
    v,
    c = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: u,
      initialized: h,
      navigation: vi,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || s,
      fetchers: new Map(),
      blockers: new Map(),
    },
    g = de.Pop,
    S = !1,
    x,
    P = !1,
    p = !1,
    f = [],
    m = [],
    y = new Map(),
    _ = 0,
    z = -1,
    T = new Map(),
    O = new Set(),
    J = new Map(),
    U = new Map(),
    ae = null,
    Je = new Map(),
    pt = !1;
  function ul() {
    return (
      (n = e.history.listen((w) => {
        let { action: E, location: C, delta: j } = w;
        if (pt) {
          pt = !1;
          return;
        }
        let D = yu({
          currentLocation: c.location,
          nextLocation: C,
          historyAction: E,
        });
        if (D) {
          (pt = !0),
            e.history.go(j * -1),
            cl(D, {
              state: "blocked",
              location: C,
              proceed() {
                cl(D, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: C,
                }),
                  e.history.go(j);
              },
              reset() {
                or(D), se({ blockers: new Map(v.state.blockers) });
              },
            });
          return;
        }
        return Y(E, C);
      })),
      c.initialized || Y(de.Pop, c.location),
      v
    );
  }
  function Io() {
    n && n(),
      r.clear(),
      x && x.abort(),
      c.fetchers.forEach((w, E) => Bo(E)),
      c.blockers.forEach((w, E) => or(E));
  }
  function nr(w) {
    return r.add(w), () => r.delete(w);
  }
  function se(w) {
    (c = Z({}, c, w)), r.forEach((E) => E(c));
  }
  function M(w, E) {
    var C, j;
    let D =
        c.actionData != null &&
        c.navigation.formMethod != null &&
        jt(c.navigation.formMethod) &&
        c.navigation.state === "loading" &&
        ((C = w.state) == null ? void 0 : C._isRedirect) !== !0,
      B;
    E.actionData
      ? Object.keys(E.actionData).length > 0
        ? (B = E.actionData)
        : (B = null)
      : D
      ? (B = c.actionData)
      : (B = null);
    let I = E.loaderData
      ? Us(c.loaderData, E.loaderData, E.matches || [], E.errors)
      : c.loaderData;
    for (let [F] of Je) or(F);
    let Q =
      S === !0 ||
      (c.navigation.formMethod != null &&
        jt(c.navigation.formMethod) &&
        ((j = w.state) == null ? void 0 : j._isRedirect) !== !0);
    se(
      Z({}, E, {
        actionData: B,
        loaderData: I,
        historyAction: g,
        location: w,
        initialized: !0,
        navigation: vi,
        revalidation: "idle",
        restoreScrollPosition: wu(w, E.matches || c.matches),
        preventScrollReset: Q,
        blockers: new Map(c.blockers),
      })
    ),
      P ||
        g === de.Pop ||
        (g === de.Push
          ? e.history.push(w, w.state)
          : g === de.Replace && e.history.replace(w, w.state)),
      (g = de.Pop),
      (S = !1),
      (P = !1),
      (p = !1),
      (f = []),
      (m = []);
  }
  async function A(w, E) {
    if (typeof w == "number") {
      e.history.go(w);
      return;
    }
    let { path: C, submission: j, error: D } = js(w, E),
      B = c.location,
      I = br(c.location, C, E && E.state);
    I = Z({}, I, e.history.encodeLocation(I));
    let Q = E && E.replace != null ? E.replace : void 0,
      F = de.Push;
    Q === !0
      ? (F = de.Replace)
      : Q === !1 ||
        (j != null &&
          jt(j.formMethod) &&
          j.formAction === c.location.pathname + c.location.search &&
          (F = de.Replace));
    let pe =
        E && "preventScrollReset" in E ? E.preventScrollReset === !0 : void 0,
      V = yu({ currentLocation: B, nextLocation: I, historyAction: F });
    if (V) {
      cl(V, {
        state: "blocked",
        location: I,
        proceed() {
          cl(V, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: I,
          }),
            A(w, E);
        },
        reset() {
          or(V), se({ blockers: new Map(c.blockers) });
        },
      });
      return;
    }
    return await Y(F, I, {
      submission: j,
      pendingError: D,
      preventScrollReset: pe,
      replace: E && E.replace,
    });
  }
  function H() {
    if (
      (Ao(),
      se({ revalidation: "loading" }),
      c.navigation.state !== "submitting")
    ) {
      if (c.navigation.state === "idle") {
        Y(c.historyAction, c.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      Y(g || c.historyAction, c.navigation.location, {
        overrideNavigation: c.navigation,
      });
    }
  }
  async function Y(w, E, C) {
    x && x.abort(),
      (x = null),
      (g = w),
      (P = (C && C.startUninterruptedRevalidation) === !0),
      Tf(c.location, c.matches),
      (S = (C && C.preventScrollReset) === !0);
    let j = C && C.overrideNavigation,
      D = kr(t, E, e.basename);
    if (!D) {
      let te = gt(404, { pathname: E.pathname }),
        { matches: Ze, route: qe } = Bs(t);
      $o(), M(E, { matches: Ze, loaderData: {}, errors: { [qe.id]: te } });
      return;
    }
    if (Zm(c.location, E)) {
      M(E, { matches: D });
      return;
    }
    x = new AbortController();
    let B = yr(e.history, E, x.signal, C && C.submission),
      I,
      Q;
    if (C && C.pendingError) Q = { [jn(D).route.id]: C.pendingError };
    else if (C && C.submission && jt(C.submission.formMethod)) {
      let te = await ce(B, E, C.submission, D, { replace: C.replace });
      if (te.shortCircuited) return;
      (I = te.pendingActionData),
        (Q = te.pendingActionError),
        (j = Z({ state: "loading", location: E }, C.submission)),
        (B = new Request(B.url, { signal: B.signal }));
    }
    let {
      shortCircuited: F,
      loaderData: pe,
      errors: V,
    } = await wn(B, E, D, j, C && C.submission, C && C.replace, I, Q);
    F ||
      ((x = null),
      M(
        E,
        Z({ matches: D }, I ? { actionData: I } : {}, {
          loaderData: pe,
          errors: V,
        })
      ));
  }
  async function ce(w, E, C, j, D) {
    Ao();
    let B = Z({ state: "submitting", location: E }, C);
    se({ navigation: B });
    let I,
      Q = Ws(j, E);
    if (!Q.route.action)
      I = {
        type: we.error,
        error: gt(405, {
          method: w.method,
          pathname: E.pathname,
          routeId: Q.route.id,
        }),
      };
    else if (((I = await gr("action", w, Q, j, v.basename)), w.signal.aborted))
      return { shortCircuited: !0 };
    if (Hn(I)) {
      let F;
      return (
        D && D.replace != null
          ? (F = D.replace)
          : (F = I.location === c.location.pathname + c.location.search),
        await lr(c, I, { submission: C, replace: F }),
        { shortCircuited: !0 }
      );
    }
    if (Tr(I)) {
      let F = jn(j, Q.route.id);
      return (
        (D && D.replace) !== !0 && (g = de.Push),
        { pendingActionData: {}, pendingActionError: { [F.route.id]: I.error } }
      );
    }
    if (un(I)) throw gt(400, { type: "defer-action" });
    return { pendingActionData: { [Q.route.id]: I.data } };
  }
  async function wn(w, E, C, j, D, B, I, Q) {
    let F = j;
    F ||
      (F = Z(
        {
          state: "loading",
          location: E,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
        },
        D
      ));
    let pe =
        D ||
        (F.formMethod && F.formAction && F.formData && F.formEncType
          ? {
              formMethod: F.formMethod,
              formAction: F.formAction,
              formData: F.formData,
              formEncType: F.formEncType,
            }
          : void 0),
      [V, te] = Fs(e.history, c, C, pe, E, p, f, m, I, Q, J);
    if (
      ($o(
        (Ee) =>
          !(C && C.some((Fe) => Fe.route.id === Ee)) ||
          (V && V.some((Fe) => Fe.route.id === Ee))
      ),
      V.length === 0 && te.length === 0)
    )
      return (
        M(
          E,
          Z(
            { matches: C, loaderData: {}, errors: Q || null },
            I ? { actionData: I } : {}
          )
        ),
        { shortCircuited: !0 }
      );
    if (!P) {
      te.forEach((Fe) => {
        let [en] = Fe,
          ar = c.fetchers.get(en),
          ur = {
            state: "loading",
            data: ar && ar.data,
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            " _hasFetcherDoneAnything ": !0,
          };
        c.fetchers.set(en, ur);
      });
      let Ee = I || c.actionData;
      se(
        Z(
          { navigation: F },
          Ee
            ? Object.keys(Ee).length === 0
              ? { actionData: null }
              : { actionData: Ee }
            : {},
          te.length > 0 ? { fetchers: new Map(c.fetchers) } : {}
        )
      );
    }
    (z = ++_),
      te.forEach((Ee) => {
        let [Fe] = Ee;
        return y.set(Fe, x);
      });
    let {
      results: Ze,
      loaderResults: qe,
      fetcherResults: ir,
    } = await mu(c.matches, C, V, te, w);
    if (w.signal.aborted) return { shortCircuited: !0 };
    te.forEach((Ee) => {
      let [Fe] = Ee;
      return y.delete(Fe);
    });
    let dl = $s(Ze);
    if (dl) return await lr(c, dl, { replace: B }), { shortCircuited: !0 };
    let { loaderData: fl, errors: Sn } = As(c, C, V, qe, Q, te, ir, U);
    U.forEach((Ee, Fe) => {
      Ee.subscribe((en) => {
        (en || Ee.done) && U.delete(Fe);
      });
    }),
      Lf();
    let Ho = gu(z);
    return Z(
      { loaderData: fl, errors: Sn },
      Ho || te.length > 0 ? { fetchers: new Map(c.fetchers) } : {}
    );
  }
  function at(w) {
    return c.fetchers.get(w) || Wm;
  }
  function rr(w, E, C, j) {
    if (Qm)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback."
      );
    y.has(w) && sl(w);
    let D = kr(t, C, e.basename);
    if (!D) {
      Uo(w, E, gt(404, { pathname: C }));
      return;
    }
    let { path: B, submission: I } = js(C, j, !0),
      Q = Ws(D, B);
    if (I && jt(I.formMethod)) {
      ht(w, E, B, Q, D, I);
      return;
    }
    J.set(w, [B, Q, D]), xn(w, E, B, Q, D, I);
  }
  async function ht(w, E, C, j, D, B) {
    if ((Ao(), J.delete(w), !j.route.action)) {
      let mt = gt(405, { method: B.formMethod, pathname: C, routeId: E });
      Uo(w, E, mt);
      return;
    }
    let I = c.fetchers.get(w),
      Q = Z({ state: "submitting" }, B, {
        data: I && I.data,
        " _hasFetcherDoneAnything ": !0,
      });
    c.fetchers.set(w, Q), se({ fetchers: new Map(c.fetchers) });
    let F = new AbortController(),
      pe = yr(e.history, C, F.signal, B);
    y.set(w, F);
    let V = await gr("action", pe, j, D, v.basename);
    if (pe.signal.aborted) {
      y.get(w) === F && y.delete(w);
      return;
    }
    if (Hn(V)) {
      y.delete(w), O.add(w);
      let mt = Z({ state: "loading" }, B, {
        data: void 0,
        " _hasFetcherDoneAnything ": !0,
      });
      return (
        c.fetchers.set(w, mt),
        se({ fetchers: new Map(c.fetchers) }),
        lr(c, V, { isFetchActionRedirect: !0 })
      );
    }
    if (Tr(V)) {
      Uo(w, E, V.error);
      return;
    }
    if (un(V)) throw gt(400, { type: "defer-action" });
    let te = c.navigation.location || c.location,
      Ze = yr(e.history, te, F.signal),
      qe =
        c.navigation.state !== "idle"
          ? kr(t, c.navigation.location, e.basename)
          : c.matches;
    $(qe, "Didn't find any matches after fetcher action");
    let ir = ++_;
    T.set(w, ir);
    let dl = Z({ state: "loading", data: V.data }, B, {
      " _hasFetcherDoneAnything ": !0,
    });
    c.fetchers.set(w, dl);
    let [fl, Sn] = Fs(
      e.history,
      c,
      qe,
      B,
      te,
      p,
      f,
      m,
      { [j.route.id]: V.data },
      void 0,
      J
    );
    Sn.filter((mt) => {
      let [tn] = mt;
      return tn !== w;
    }).forEach((mt) => {
      let [tn] = mt,
        xu = c.fetchers.get(tn),
        Ff = {
          state: "loading",
          data: xu && xu.data,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          " _hasFetcherDoneAnything ": !0,
        };
      c.fetchers.set(tn, Ff), y.set(tn, F);
    }),
      se({ fetchers: new Map(c.fetchers) });
    let {
      results: Ho,
      loaderResults: Ee,
      fetcherResults: Fe,
    } = await mu(c.matches, qe, fl, Sn, Ze);
    if (F.signal.aborted) return;
    T.delete(w),
      y.delete(w),
      Sn.forEach((mt) => {
        let [tn] = mt;
        return y.delete(tn);
      });
    let en = $s(Ho);
    if (en) return lr(c, en);
    let { loaderData: ar, errors: ur } = As(
        c,
        c.matches,
        fl,
        Ee,
        void 0,
        Sn,
        Fe,
        U
      ),
      Of = {
        state: "idle",
        data: V.data,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        " _hasFetcherDoneAnything ": !0,
      };
    c.fetchers.set(w, Of);
    let jf = gu(ir);
    c.navigation.state === "loading" && ir > z
      ? ($(g, "Expected pending action"),
        x && x.abort(),
        M(c.navigation.location, {
          matches: qe,
          loaderData: ar,
          errors: ur,
          fetchers: new Map(c.fetchers),
        }))
      : (se(
          Z(
            { errors: ur, loaderData: Us(c.loaderData, ar, qe, ur) },
            jf ? { fetchers: new Map(c.fetchers) } : {}
          )
        ),
        (p = !1));
  }
  async function xn(w, E, C, j, D, B) {
    let I = c.fetchers.get(w),
      Q = Z(
        {
          state: "loading",
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
        },
        B,
        { data: I && I.data, " _hasFetcherDoneAnything ": !0 }
      );
    c.fetchers.set(w, Q), se({ fetchers: new Map(c.fetchers) });
    let F = new AbortController(),
      pe = yr(e.history, C, F.signal);
    y.set(w, F);
    let V = await gr("loader", pe, j, D, v.basename);
    if (
      (un(V) && (V = (await wf(V, pe.signal, !0)) || V),
      y.get(w) === F && y.delete(w),
      pe.signal.aborted)
    )
      return;
    if (Hn(V)) {
      await lr(c, V);
      return;
    }
    if (Tr(V)) {
      let Ze = jn(c.matches, E);
      c.fetchers.delete(w),
        se({
          fetchers: new Map(c.fetchers),
          errors: { [Ze.route.id]: V.error },
        });
      return;
    }
    $(!un(V), "Unhandled fetcher deferred data");
    let te = {
      state: "idle",
      data: V.data,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      " _hasFetcherDoneAnything ": !0,
    };
    c.fetchers.set(w, te), se({ fetchers: new Map(c.fetchers) });
  }
  async function lr(w, E, C) {
    var j;
    let {
      submission: D,
      replace: B,
      isFetchActionRedirect: I,
    } = C === void 0 ? {} : C;
    E.revalidate && (p = !0);
    let Q = br(
      w.location,
      E.location,
      Z({ _isRedirect: !0 }, I ? { _isFetchActionRedirect: !0 } : {})
    );
    if (
      ($(Q, "Expected a location on the redirect navigation"),
      mf && typeof ((j = window) == null ? void 0 : j.location) < "u")
    ) {
      let qe = e.history.createURL(E.location).origin;
      if (window.location.origin !== qe) {
        B
          ? window.location.replace(E.location)
          : window.location.assign(E.location);
        return;
      }
    }
    x = null;
    let F = B === !0 ? de.Replace : de.Push,
      {
        formMethod: pe,
        formAction: V,
        formEncType: te,
        formData: Ze,
      } = w.navigation;
    !D &&
      pe &&
      V &&
      Ze &&
      te &&
      (D = { formMethod: pe, formAction: V, formEncType: te, formData: Ze }),
      Vm.has(E.status) && D && jt(D.formMethod)
        ? await Y(F, Q, {
            submission: Z({}, D, { formAction: E.location }),
            preventScrollReset: S,
          })
        : await Y(F, Q, {
            overrideNavigation: {
              state: "loading",
              location: Q,
              formMethod: D ? D.formMethod : void 0,
              formAction: D ? D.formAction : void 0,
              formEncType: D ? D.formEncType : void 0,
              formData: D ? D.formData : void 0,
            },
            preventScrollReset: S,
          });
  }
  async function mu(w, E, C, j, D) {
    let B = await Promise.all([
        ...C.map((F) => gr("loader", D, F, E, v.basename)),
        ...j.map((F) => {
          let [, pe, V, te] = F;
          return gr("loader", yr(e.history, pe, D.signal), V, te, v.basename);
        }),
      ]),
      I = B.slice(0, C.length),
      Q = B.slice(C.length);
    return (
      await Promise.all([
        Hs(w, C, I, D.signal, !1, c.loaderData),
        Hs(
          w,
          j.map((F) => {
            let [, , pe] = F;
            return pe;
          }),
          Q,
          D.signal,
          !0
        ),
      ]),
      { results: B, loaderResults: I, fetcherResults: Q }
    );
  }
  function Ao() {
    (p = !0),
      f.push(...$o()),
      J.forEach((w, E) => {
        y.has(E) && (m.push(E), sl(E));
      });
  }
  function Uo(w, E, C) {
    let j = jn(c.matches, E);
    Bo(w), se({ errors: { [j.route.id]: C }, fetchers: new Map(c.fetchers) });
  }
  function Bo(w) {
    y.has(w) && sl(w),
      J.delete(w),
      T.delete(w),
      O.delete(w),
      c.fetchers.delete(w);
  }
  function sl(w) {
    let E = y.get(w);
    $(E, "Expected fetch controller: " + w), E.abort(), y.delete(w);
  }
  function vu(w) {
    for (let E of w) {
      let j = {
        state: "idle",
        data: at(E).data,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        " _hasFetcherDoneAnything ": !0,
      };
      c.fetchers.set(E, j);
    }
  }
  function Lf() {
    let w = [];
    for (let E of O) {
      let C = c.fetchers.get(E);
      $(C, "Expected fetcher: " + E),
        C.state === "loading" && (O.delete(E), w.push(E));
    }
    vu(w);
  }
  function gu(w) {
    let E = [];
    for (let [C, j] of T)
      if (j < w) {
        let D = c.fetchers.get(C);
        $(D, "Expected fetcher: " + C),
          D.state === "loading" && (sl(C), T.delete(C), E.push(C));
      }
    return vu(E), E.length > 0;
  }
  function Df(w, E) {
    let C = c.blockers.get(w) || Os;
    return (
      Je.get(w) !== E &&
        (Je.set(w, E),
        ae == null
          ? (ae = w)
          : w !== ae && Do(!1, "A router only supports one blocker at a time")),
      C
    );
  }
  function or(w) {
    c.blockers.delete(w), Je.delete(w), ae === w && (ae = null);
  }
  function cl(w, E) {
    let C = c.blockers.get(w) || Os;
    $(
      (C.state === "unblocked" && E.state === "blocked") ||
        (C.state === "blocked" && E.state === "blocked") ||
        (C.state === "blocked" && E.state === "proceeding") ||
        (C.state === "blocked" && E.state === "unblocked") ||
        (C.state === "proceeding" && E.state === "unblocked"),
      "Invalid blocker state transition: " + C.state + " -> " + E.state
    ),
      c.blockers.set(w, E),
      se({ blockers: new Map(c.blockers) });
  }
  function yu(w) {
    let { currentLocation: E, nextLocation: C, historyAction: j } = w;
    if (ae == null) return;
    let D = Je.get(ae);
    $(D, "Could not find a function for the active blocker");
    let B = c.blockers.get(ae);
    if (
      !(B && B.state === "proceeding") &&
      D({ currentLocation: E, nextLocation: C, historyAction: j })
    )
      return ae;
  }
  function $o(w) {
    let E = [];
    return (
      U.forEach((C, j) => {
        (!w || w(j)) && (C.cancel(), E.push(j), U.delete(j));
      }),
      E
    );
  }
  function zf(w, E, C) {
    if (
      ((l = w), (i = E), (o = C || ((j) => j.key)), !a && c.navigation === vi)
    ) {
      a = !0;
      let j = wu(c.location, c.matches);
      j != null && se({ restoreScrollPosition: j });
    }
    return () => {
      (l = null), (i = null), (o = null);
    };
  }
  function Tf(w, E) {
    if (l && o && i) {
      let C = E.map((D) => Vs(D, c.loaderData)),
        j = o(w, C) || w.key;
      l[j] = i();
    }
  }
  function wu(w, E) {
    if (l && o && i) {
      let C = E.map((B) => Vs(B, c.loaderData)),
        j = o(w, C) || w.key,
        D = l[j];
      if (typeof D == "number") return D;
    }
    return null;
  }
  return (
    (v = {
      get basename() {
        return e.basename;
      },
      get state() {
        return c;
      },
      get routes() {
        return t;
      },
      initialize: ul,
      subscribe: nr,
      enableScrollRestoration: zf,
      navigate: A,
      fetch: rr,
      revalidate: H,
      createHref: (w) => e.history.createHref(w),
      encodeLocation: (w) => e.history.encodeLocation(w),
      getFetcher: at,
      deleteFetcher: Bo,
      dispose: Io,
      getBlocker: Df,
      deleteBlocker: or,
      _internalFetchControllers: y,
      _internalActiveDeferreds: U,
    }),
    v
  );
}
function Ym(e) {
  return e != null && "formData" in e;
}
function js(e, t, n) {
  n === void 0 && (n = !1);
  let r = typeof e == "string" ? e : Rt(e);
  if (!t || !Ym(t)) return { path: r };
  if (t.formMethod && !bm(t.formMethod))
    return { path: r, error: gt(405, { method: t.formMethod }) };
  let l;
  if (
    t.formData &&
    ((l = {
      formMethod: t.formMethod || "get",
      formAction: yf(r),
      formEncType: (t && t.formEncType) || "application/x-www-form-urlencoded",
      formData: t.formData,
    }),
    jt(l.formMethod))
  )
    return { path: r, submission: l };
  let o = Lt(r);
  try {
    let i = gf(t.formData);
    n && o.search && xf(o.search) && i.append("index", ""),
      (o.search = "?" + i);
  } catch {
    return { path: r, error: gt(400) };
  }
  return { path: Rt(o), submission: l };
}
function Gm(e, t) {
  let n = e;
  if (t) {
    let r = e.findIndex((l) => l.route.id === t);
    r >= 0 && (n = e.slice(0, r));
  }
  return n;
}
function Fs(e, t, n, r, l, o, i, a, u, s, h) {
  let v = s ? Object.values(s)[0] : u ? Object.values(u)[0] : void 0,
    c = s ? Object.keys(s)[0] : void 0,
    S = Gm(n, c).filter(
      (P, p) =>
        P.route.loader != null &&
        (Xm(t.loaderData, t.matches[p], P) ||
          i.some((f) => f === P.route.id) ||
          Is(e, t.location, t.matches[p], r, l, P, o, v))
    ),
    x = [];
  return (
    h &&
      h.forEach((P, p) => {
        let [f, m, y] = P;
        a.includes(p)
          ? x.push([p, f, m, y])
          : o && Is(e, f, m, r, f, m, o, v) && x.push([p, f, m, y]);
      }),
    [S, x]
  );
}
function Xm(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    l = e[n.route.id] === void 0;
  return r || l;
}
function vf(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function Is(e, t, n, r, l, o, i, a) {
  let u = e.createURL(t),
    s = n.params,
    h = e.createURL(l),
    v = o.params,
    c = vf(n, o) || u.toString() === h.toString() || u.search !== h.search || i;
  if (o.route.shouldRevalidate) {
    let g = o.route.shouldRevalidate(
      Z({ currentUrl: u, currentParams: s, nextUrl: h, nextParams: v }, r, {
        actionResult: a,
        defaultShouldRevalidate: c,
      })
    );
    if (typeof g == "boolean") return g;
  }
  return c;
}
async function gr(e, t, n, r, l, o, i, a) {
  l === void 0 && (l = "/"), o === void 0 && (o = !1), i === void 0 && (i = !1);
  let u,
    s,
    h,
    v = new Promise((g, S) => (h = S)),
    c = () => h();
  t.signal.addEventListener("abort", c);
  try {
    let g = n.route[e];
    $(
      g,
      "Could not find the " + e + ' to run on the "' + n.route.id + '" route'
    ),
      (s = await Promise.race([
        g({ request: t, params: n.params, context: a }),
        v,
      ])),
      $(
        s !== void 0,
        "You defined " +
          (e === "action" ? "an action" : "a loader") +
          " for route " +
          ('"' +
            n.route.id +
            "\" but didn't return anything from your `" +
            e +
            "` ") +
          "function. Please return a value or `null`."
      );
  } catch (g) {
    (u = we.error), (s = g);
  } finally {
    t.signal.removeEventListener("abort", c);
  }
  if (qm(s)) {
    let g = s.status;
    if (Hm.has(g)) {
      let P = s.headers.get("Location");
      if (
        ($(
          P,
          "Redirects returned/thrown from loaders/actions must have a Location header"
        ),
        /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(P))
      ) {
        if (!o) {
          let f = new URL(t.url),
            m = P.startsWith("//") ? new URL(f.protocol + P) : new URL(P);
          m.origin === f.origin && (P = m.pathname + m.search + m.hash);
        }
      } else {
        let f = r.slice(0, r.indexOf(n) + 1),
          m = zo(f).map((_) => _.pathnameBase),
          y = du(P, m, new URL(t.url).pathname);
        if (($(Rt(y), "Unable to resolve redirect location: " + P), l)) {
          let _ = y.pathname;
          y.pathname = _ === "/" ? l : kt([l, _]);
        }
        P = Rt(y);
      }
      if (o) throw (s.headers.set("Location", P), s);
      return {
        type: we.redirect,
        status: g,
        location: P,
        revalidate: s.headers.get("X-Remix-Revalidate") !== null,
      };
    }
    if (i) throw { type: u || we.data, response: s };
    let S,
      x = s.headers.get("Content-Type");
    return (
      x && /\bapplication\/json\b/.test(x)
        ? (S = await s.json())
        : (S = await s.text()),
      u === we.error
        ? { type: u, error: new To(g, s.statusText, S), headers: s.headers }
        : { type: we.data, data: S, statusCode: s.status, headers: s.headers }
    );
  }
  return u === we.error
    ? { type: u, error: s }
    : s instanceof Fm
    ? { type: we.deferred, deferredData: s }
    : { type: we.data, data: s };
}
function yr(e, t, n, r) {
  let l = e.createURL(yf(t)).toString(),
    o = { signal: n };
  if (r && jt(r.formMethod)) {
    let { formMethod: i, formEncType: a, formData: u } = r;
    (o.method = i.toUpperCase()),
      (o.body = a === "application/x-www-form-urlencoded" ? gf(u) : u);
  }
  return new Request(l, o);
}
function gf(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    $(
      typeof r == "string",
      'File inputs are not supported with encType "application/x-www-form-urlencoded", please use "multipart/form-data" instead.'
    ),
      t.append(n, r);
  return t;
}
function Jm(e, t, n, r, l) {
  let o = {},
    i = null,
    a,
    u = !1,
    s = {};
  return (
    n.forEach((h, v) => {
      let c = t[v].route.id;
      if (
        ($(!Hn(h), "Cannot handle redirect results in processLoaderData"),
        Tr(h))
      ) {
        let g = jn(e, c),
          S = h.error;
        r && ((S = Object.values(r)[0]), (r = void 0)),
          (i = i || {}),
          i[g.route.id] == null && (i[g.route.id] = S),
          (o[c] = void 0),
          u || ((u = !0), (a = pf(h.error) ? h.error.status : 500)),
          h.headers && (s[c] = h.headers);
      } else
        un(h)
          ? (l.set(c, h.deferredData), (o[c] = h.deferredData.data))
          : (o[c] = h.data),
          h.statusCode != null &&
            h.statusCode !== 200 &&
            !u &&
            (a = h.statusCode),
          h.headers && (s[c] = h.headers);
    }),
    r && ((i = r), (o[Object.keys(r)[0]] = void 0)),
    { loaderData: o, errors: i, statusCode: a || 200, loaderHeaders: s }
  );
}
function As(e, t, n, r, l, o, i, a) {
  let { loaderData: u, errors: s } = Jm(t, n, r, l, a);
  for (let h = 0; h < o.length; h++) {
    let [v, , c] = o[h];
    $(
      i !== void 0 && i[h] !== void 0,
      "Did not find corresponding fetcher result"
    );
    let g = i[h];
    if (Tr(g)) {
      let S = jn(e.matches, c.route.id);
      (s && s[S.route.id]) || (s = Z({}, s, { [S.route.id]: g.error })),
        e.fetchers.delete(v);
    } else if (Hn(g)) $(!1, "Unhandled fetcher revalidation redirect");
    else if (un(g)) $(!1, "Unhandled fetcher deferred data");
    else {
      let S = {
        state: "idle",
        data: g.data,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        " _hasFetcherDoneAnything ": !0,
      };
      e.fetchers.set(v, S);
    }
  }
  return { loaderData: u, errors: s };
}
function Us(e, t, n, r) {
  let l = Z({}, t);
  for (let o of n) {
    let i = o.route.id;
    if (
      (t.hasOwnProperty(i)
        ? t[i] !== void 0 && (l[i] = t[i])
        : e[i] !== void 0 && (l[i] = e[i]),
      r && r.hasOwnProperty(i))
    )
      break;
  }
  return l;
}
function jn(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function Bs(e) {
  let t = e.find((n) => n.index || !n.path || n.path === "/") || {
    id: "__shim-error-route__",
  };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
    route: t,
  };
}
function gt(e, t) {
  let { pathname: n, routeId: r, method: l, type: o } = t === void 0 ? {} : t,
    i = "Unknown Server Error",
    a = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((i = "Bad Request"),
        l && n && r
          ? (a =
              "You made a " +
              l +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : o === "defer-action"
          ? (a = "defer() is not supported in actions")
          : (a = "Cannot submit binary form data using GET"))
      : e === 403
      ? ((i = "Forbidden"),
        (a = 'Route "' + r + '" does not match URL "' + n + '"'))
      : e === 404
      ? ((i = "Not Found"), (a = 'No route matches URL "' + n + '"'))
      : e === 405 &&
        ((i = "Method Not Allowed"),
        l && n && r
          ? (a =
              "You made a " +
              l.toUpperCase() +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide an `action` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : l && (a = 'Invalid request method "' + l.toUpperCase() + '"')),
    new To(e || 500, i, new Error(a), !0)
  );
}
function $s(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (Hn(n)) return n;
  }
}
function yf(e) {
  let t = typeof e == "string" ? Lt(e) : e;
  return Rt(Z({}, t, { hash: "" }));
}
function Zm(e, t) {
  return (
    e.pathname === t.pathname && e.search === t.search && e.hash !== t.hash
  );
}
function un(e) {
  return e.type === we.deferred;
}
function Tr(e) {
  return e.type === we.error;
}
function Hn(e) {
  return (e && e.type) === we.redirect;
}
function qm(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function bm(e) {
  return $m.has(e);
}
function jt(e) {
  return Um.has(e);
}
async function Hs(e, t, n, r, l, o) {
  for (let i = 0; i < n.length; i++) {
    let a = n[i],
      u = t[i],
      s = e.find((v) => v.route.id === u.route.id),
      h = s != null && !vf(s, u) && (o && o[u.route.id]) !== void 0;
    un(a) &&
      (l || h) &&
      (await wf(a, r, l).then((v) => {
        v && (n[i] = v || n[i]);
      }));
  }
}
async function wf(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: we.data, data: e.deferredData.unwrappedData };
      } catch (l) {
        return { type: we.error, error: l };
      }
    return { type: we.data, data: e.deferredData.data };
  }
}
function xf(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function Vs(e, t) {
  let { route: n, pathname: r, params: l } = e;
  return { id: n.id, pathname: r, params: l, data: t[n.id], handle: n.handle };
}
function Ws(e, t) {
  let n = typeof t == "string" ? Lt(t).search : t.search;
  if (e[e.length - 1].route.index && xf(n || "")) return e[e.length - 1];
  let r = zo(e);
  return r[r.length - 1];
}
/**
 * React Router v6.7.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ho() {
  return (
    (ho = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ho.apply(this, arguments)
  );
}
function ev(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
const tv = typeof Object.is == "function" ? Object.is : ev,
  { useState: nv, useEffect: rv, useLayoutEffect: lv, useDebugValue: ov } = wi;
function iv(e, t, n) {
  const r = t(),
    [{ inst: l }, o] = nv({ inst: { value: r, getSnapshot: t } });
  return (
    lv(() => {
      (l.value = r), (l.getSnapshot = t), gi(l) && o({ inst: l });
    }, [e, r, t]),
    rv(
      () => (
        gi(l) && o({ inst: l }),
        e(() => {
          gi(l) && o({ inst: l });
        })
      ),
      [e]
    ),
    ov(r),
    r
  );
}
function gi(e) {
  const t = e.getSnapshot,
    n = e.value;
  try {
    const r = t();
    return !tv(n, r);
  } catch {
    return !0;
  }
}
function av(e, t, n) {
  return t();
}
const uv =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  sv = !uv,
  cv = sv ? av : iv,
  dv = "useSyncExternalStore" in wi ? ((e) => e.useSyncExternalStore)(wi) : cv,
  fu = N.createContext(null),
  Oo = N.createContext(null),
  il = N.createContext(null),
  jo = N.createContext(null),
  yn = N.createContext({ outlet: null, matches: [] }),
  Sf = N.createContext(null);
function fv(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  al() || $(!1);
  let { basename: r, navigator: l } = N.useContext(il),
    { hash: o, pathname: i, search: a } = pu(e, { relative: n }),
    u = i;
  return (
    r !== "/" && (u = i === "/" ? r : kt([r, i])),
    l.createHref({ pathname: u, search: a, hash: o })
  );
}
function al() {
  return N.useContext(jo) != null;
}
function er() {
  return al() || $(!1), N.useContext(jo).location;
}
function Dt() {
  al() || $(!1);
  let { basename: e, navigator: t } = N.useContext(il),
    { matches: n } = N.useContext(yn),
    { pathname: r } = er(),
    l = JSON.stringify(zo(n).map((a) => a.pathnameBase)),
    o = N.useRef(!1);
  return (
    N.useEffect(() => {
      o.current = !0;
    }),
    N.useCallback(
      function (a, u) {
        if ((u === void 0 && (u = {}), !o.current)) return;
        if (typeof a == "number") {
          t.go(a);
          return;
        }
        let s = du(a, JSON.parse(l), r, u.relative === "path");
        e !== "/" &&
          (s.pathname = s.pathname === "/" ? e : kt([e, s.pathname])),
          (u.replace ? t.replace : t.push)(s, u.state, u);
      },
      [e, t, l, r]
    )
  );
}
const pv = N.createContext(null);
function hv(e) {
  let t = N.useContext(yn).outlet;
  return t && N.createElement(pv.Provider, { value: e }, t);
}
function pu(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { matches: r } = N.useContext(yn),
    { pathname: l } = er(),
    o = JSON.stringify(zo(r).map((i) => i.pathnameBase));
  return N.useMemo(() => du(e, JSON.parse(o), l, n === "path"), [e, o, l, n]);
}
function mv(e, t) {
  al() || $(!1);
  let { navigator: n } = N.useContext(il),
    r = N.useContext(Oo),
    { matches: l } = N.useContext(yn),
    o = l[l.length - 1],
    i = o ? o.params : {};
  o && o.pathname;
  let a = o ? o.pathnameBase : "/";
  o && o.route;
  let u = er(),
    s;
  if (t) {
    var h;
    let x = typeof t == "string" ? Lt(t) : t;
    a === "/" || ((h = x.pathname) != null && h.startsWith(a)) || $(!1),
      (s = x);
  } else s = u;
  let v = s.pathname || "/",
    c = a === "/" ? v : v.slice(a.length) || "/",
    g = kr(e, { pathname: c }),
    S = wv(
      g &&
        g.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, i, x.params),
            pathname: kt([
              a,
              n.encodeLocation
                ? n.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? a
                : kt([
                    a,
                    n.encodeLocation
                      ? n.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          })
        ),
      l,
      r || void 0
    );
  return t && S
    ? N.createElement(
        jo.Provider,
        {
          value: {
            location: ho(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              s
            ),
            navigationType: de.Pop,
          },
        },
        S
      )
    : S;
}
function vv() {
  let e = Cf(),
    t = pf(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = "rgba(200,200,200, 0.5)",
    l = { padding: "0.5rem", backgroundColor: r },
    o = { padding: "2px 4px", backgroundColor: r };
  return N.createElement(
    N.Fragment,
    null,
    N.createElement("h2", null, "Unhandled Thrown Error!"),
    N.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? N.createElement("pre", { style: l }, n) : null,
    N.createElement("p", null, "💿 Hey developer 👋"),
    N.createElement(
      "p",
      null,
      "You can provide a way better UX than this when your app throws errors by providing your own ",
      N.createElement("code", { style: o }, "errorElement"),
      " props on ",
      N.createElement("code", { style: o }, "<Route>")
    )
  );
}
class gv extends N.Component {
  constructor(t) {
    super(t), (this.state = { location: t.location, error: t.error });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location
      ? { error: t.error, location: t.location }
      : { error: t.error || n.error, location: n.location };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error
      ? N.createElement(
          yn.Provider,
          { value: this.props.routeContext },
          N.createElement(Sf.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function yv(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = N.useContext(fu);
  return (
    l &&
      l.static &&
      l.staticContext &&
      n.route.errorElement &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    N.createElement(yn.Provider, { value: t }, r)
  );
}
function wv(e, t, n) {
  if ((t === void 0 && (t = []), e == null))
    if (n != null && n.errors) e = n.matches;
    else return null;
  let r = e,
    l = n == null ? void 0 : n.errors;
  if (l != null) {
    let o = r.findIndex(
      (i) => i.route.id && (l == null ? void 0 : l[i.route.id])
    );
    o >= 0 || $(!1), (r = r.slice(0, Math.min(r.length, o + 1)));
  }
  return r.reduceRight((o, i, a) => {
    let u = i.route.id ? (l == null ? void 0 : l[i.route.id]) : null,
      s = n ? i.route.errorElement || N.createElement(vv, null) : null,
      h = t.concat(r.slice(0, a + 1)),
      v = () =>
        N.createElement(
          yv,
          { match: i, routeContext: { outlet: o, matches: h } },
          u ? s : i.route.element !== void 0 ? i.route.element : o
        );
    return n && (i.route.errorElement || a === 0)
      ? N.createElement(gv, {
          location: n.location,
          component: s,
          error: u,
          children: v(),
          routeContext: { outlet: null, matches: h },
        })
      : v();
  }, null);
}
var Qs;
(function (e) {
  (e.UseBlocker = "useBlocker"), (e.UseRevalidator = "useRevalidator");
})(Qs || (Qs = {}));
var Jn;
(function (e) {
  (e.UseLoaderData = "useLoaderData"),
    (e.UseActionData = "useActionData"),
    (e.UseRouteError = "useRouteError"),
    (e.UseNavigation = "useNavigation"),
    (e.UseRouteLoaderData = "useRouteLoaderData"),
    (e.UseMatches = "useMatches"),
    (e.UseRevalidator = "useRevalidator");
})(Jn || (Jn = {}));
function Ef(e) {
  let t = N.useContext(Oo);
  return t || $(!1), t;
}
function xv(e) {
  let t = N.useContext(yn);
  return t || $(!1), t;
}
function kf(e) {
  let t = xv(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || $(!1), n.route.id;
}
function tr() {
  let e = Ef(Jn.UseLoaderData),
    t = kf(Jn.UseLoaderData);
  if (e.errors && e.errors[t] != null) {
    console.error(
      "You cannot `useLoaderData` in an errorElement (routeId: " + t + ")"
    );
    return;
  }
  return e.loaderData[t];
}
function Cf() {
  var e;
  let t = N.useContext(Sf),
    n = Ef(Jn.UseRouteError),
    r = kf(Jn.UseRouteError);
  return t || ((e = n.errors) == null ? void 0 : e[r]);
}
function Sv(e) {
  let { fallbackElement: t, router: n } = e,
    r = dv(
      n.subscribe,
      () => n.state,
      () => n.state
    ),
    l = N.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (i) => n.navigate(i),
        push: (i, a, u) =>
          n.navigate(i, {
            state: a,
            preventScrollReset: u == null ? void 0 : u.preventScrollReset,
          }),
        replace: (i, a, u) =>
          n.navigate(i, {
            replace: !0,
            state: a,
            preventScrollReset: u == null ? void 0 : u.preventScrollReset,
          }),
      }),
      [n]
    ),
    o = n.basename || "/";
  return N.createElement(
    N.Fragment,
    null,
    N.createElement(
      fu.Provider,
      { value: { router: n, navigator: l, static: !1, basename: o } },
      N.createElement(
        Oo.Provider,
        { value: r },
        N.createElement(
          Cv,
          {
            basename: n.basename,
            location: n.state.location,
            navigationType: n.state.historyAction,
            navigator: l,
          },
          n.state.initialized ? N.createElement(Nv, null) : t
        )
      )
    ),
    null
  );
}
function Ev(e) {
  return hv(e.context);
}
function kv(e) {
  $(!1);
}
function Cv(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = de.Pop,
    navigator: o,
    static: i = !1,
  } = e;
  al() && $(!1);
  let a = t.replace(/^\/*/, "/"),
    u = N.useMemo(() => ({ basename: a, navigator: o, static: i }), [a, o, i]);
  typeof r == "string" && (r = Lt(r));
  let {
      pathname: s = "/",
      search: h = "",
      hash: v = "",
      state: c = null,
      key: g = "default",
    } = r,
    S = N.useMemo(() => {
      let x = ff(s, a);
      return x == null
        ? null
        : { pathname: x, search: h, hash: v, state: c, key: g };
    }, [a, s, h, v, c, g]);
  return S == null
    ? null
    : N.createElement(
        il.Provider,
        { value: u },
        N.createElement(jo.Provider, {
          children: n,
          value: { location: S, navigationType: l },
        })
      );
}
function Nv(e) {
  let { children: t, location: n } = e,
    r = N.useContext(fu),
    l = r && !t ? r.router.routes : ma(t);
  return mv(l, n);
}
var Ks;
(function (e) {
  (e[(e.pending = 0)] = "pending"),
    (e[(e.success = 1)] = "success"),
    (e[(e.error = 2)] = "error");
})(Ks || (Ks = {}));
new Promise(() => {});
function ma(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    N.Children.forEach(e, (r, l) => {
      if (!N.isValidElement(r)) return;
      if (r.type === N.Fragment) {
        n.push.apply(n, ma(r.props.children, t));
        return;
      }
      r.type !== kv && $(!1), !r.props.index || !r.props.children || $(!1);
      let o = [...t, l],
        i = {
          id: r.props.id || o.join("-"),
          caseSensitive: r.props.caseSensitive,
          element: r.props.element,
          index: r.props.index,
          path: r.props.path,
          loader: r.props.loader,
          action: r.props.action,
          errorElement: r.props.errorElement,
          hasErrorBoundary: r.props.errorElement != null,
          shouldRevalidate: r.props.shouldRevalidate,
          handle: r.props.handle,
        };
      r.props.children && (i.children = ma(r.props.children, o)), n.push(i);
    }),
    n
  );
}
function Nf(e) {
  return e.map((t) => {
    let n = ho({}, t);
    return (
      n.hasErrorBoundary == null &&
        (n.hasErrorBoundary = n.errorElement != null),
      n.children && (n.children = Nf(n.children)),
      n
    );
  });
}
/**
 * React Router DOM v6.7.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function el() {
  return (
    (el = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    el.apply(this, arguments)
  );
}
function _f(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    o;
  for (o = 0; o < r.length; o++)
    (l = r[o]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function _v(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Pv(e, t) {
  return e.button === 0 && (!t || t === "_self") && !_v(e);
}
const Rv = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
  ],
  Mv = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "children",
  ];
function Lv(e, t) {
  return Km({
    basename: t == null ? void 0 : t.basename,
    history: fm({ window: t == null ? void 0 : t.window }),
    hydrationData: (t == null ? void 0 : t.hydrationData) || Dv(),
    routes: Nf(e),
  }).initialize();
}
function Dv() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return t && t.errors && (t = el({}, t, { errors: zv(t.errors) })), t;
}
function zv(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [r, l] of t)
    if (l && l.__type === "RouteErrorResponse")
      n[r] = new To(l.status, l.statusText, l.data, l.internal === !0);
    else if (l && l.__type === "Error") {
      let o = new Error(l.message);
      (o.stack = ""), (n[r] = o);
    } else n[r] = l;
  return n;
}
const Fo = N.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: o,
        replace: i,
        state: a,
        target: u,
        to: s,
        preventScrollReset: h,
      } = t,
      v = _f(t, Rv),
      c = fv(s, { relative: l }),
      g = Tv(s, {
        replace: i,
        state: a,
        target: u,
        preventScrollReset: h,
        relative: l,
      });
    function S(x) {
      r && r(x), x.defaultPrevented || g(x);
    }
    return N.createElement(
      "a",
      el({}, v, { href: c, onClick: o ? r : S, ref: n, target: u })
    );
  }),
  va = N.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: l = !1,
        className: o = "",
        end: i = !1,
        style: a,
        to: u,
        children: s,
      } = t,
      h = _f(t, Mv),
      v = pu(u, { relative: h.relative }),
      c = er(),
      g = N.useContext(Oo),
      { navigator: S } = N.useContext(il),
      x = S.encodeLocation ? S.encodeLocation(v).pathname : v.pathname,
      P = c.pathname,
      p =
        g && g.navigation && g.navigation.location
          ? g.navigation.location.pathname
          : null;
    l ||
      ((P = P.toLowerCase()),
      (p = p ? p.toLowerCase() : null),
      (x = x.toLowerCase()));
    let f = P === x || (!i && P.startsWith(x) && P.charAt(x.length) === "/"),
      m =
        p != null &&
        (p === x || (!i && p.startsWith(x) && p.charAt(x.length) === "/")),
      y = f ? r : void 0,
      _;
    typeof o == "function"
      ? (_ = o({ isActive: f, isPending: m }))
      : (_ = [o, f ? "active" : null, m ? "pending" : null]
          .filter(Boolean)
          .join(" "));
    let z = typeof a == "function" ? a({ isActive: f, isPending: m }) : a;
    return N.createElement(
      Fo,
      el({}, h, { "aria-current": y, className: _, ref: n, style: z, to: u }),
      typeof s == "function" ? s({ isActive: f, isPending: m }) : s
    );
  });
var Ys;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmitImpl = "useSubmitImpl"),
    (e.UseFetcher = "useFetcher");
})(Ys || (Ys = {}));
var Gs;
(function (e) {
  (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Gs || (Gs = {}));
function Tv(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: o,
      relative: i,
    } = t === void 0 ? {} : t,
    a = Dt(),
    u = er(),
    s = pu(e, { relative: i });
  return N.useCallback(
    (h) => {
      if (Pv(h, n)) {
        h.preventDefault();
        let v = r !== void 0 ? r : Rt(u) === Rt(s);
        a(e, { replace: v, state: l, preventScrollReset: o, relative: i });
      }
    },
    [u, a, s, r, l, n, e, o, i]
  );
}
const Ov = "/assets/log-13350404.svg",
  hu = () =>
    d(Fo, {
      to: "/",
      children: d("img", { src: Ov, className: "w-auto h-auto object-cover" }),
    }),
  rt = "https://toorblue.com/api/",
  Xs = () => {
    const e = Dt(),
      { status: t, user: n } = tr();
    return (
      N.useEffect(() => {
        t != 200 && e("/login");
      }, []),
      R("div", {
        className:
          "flex justify-center flex-col items-center align-middle h-screen bg-base-200",
        children: [
          R("span", {
            children: [
              "Bienvenido ",
              n.name_employee,
              " ",
              n.lastname_employee,
            ],
          }),
          d(hu, {}),
        ],
      })
    );
  },
  Js = async () => {
    const e = await fetch(rt + "user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      t = await e.json();
    return { status: await e.status, user: t };
  },
  jv = ({ message: e, title: t, show: n, handleClose: r }) =>
    n
      ? d("div", {
          className: "card w-96 bg-red-100 shadow-2xl z-100",
          children: R("div", {
            className: "card-body",
            children: [
              R("h2", {
                className: "card-title text-error",
                children: [t, "!!"],
              }),
              d("p", { children: e }),
              d("div", {
                className: "card-actions justify-end",
                children: d("button", {
                  className: "btn btn-error text-base-100",
                  onClick: r,
                  children: "Aceptar",
                }),
              }),
            ],
          }),
        })
      : null,
  Fv = () => {
    const [e, t] = N.useState(""),
      [n, r] = N.useState(""),
      [l, o] = N.useState(!1),
      [i, a] = N.useState(!1),
      u = Dt(),
      s = () => {
        o(!0), u("/home");
      };
    return (
      N.useEffect(() => {
        l && s();
      }, [l]),
      R("div", {
        className: "hero min-h-screen bg-base-200",
        children: [
          R("div", {
            className: "hero-content flex-col lg:flex-row-reverse",
            children: [
              d("div", {
                className: "text-center lg:text-left",
                children: d(hu, {}),
              }),
              d("form", {
                className:
                  "card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100",
                onSubmit: async (v) => {
                  v.preventDefault();
                  const c = await fetch(rt + "login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({
                        email_employee: e,
                        password_employee: n,
                      }),
                    }).catch((x) => {
                      console.log("no valeee", x), a(!0);
                    }),
                    g = await c.status,
                    S = await c.json();
                  console.log({ perm: S, status: g }),
                    g == 200 && S.permissions == "admin" && u("/admin"),
                    g == 200 && S.permissions == "emp" && u("/home");
                },
                children: R("div", {
                  className: "card-body",
                  children: [
                    R("div", {
                      className: "form-control",
                      children: [
                        d("label", {
                          className: "label",
                          children: d("span", {
                            className: "label-text text-primary",
                            children: "Email",
                          }),
                        }),
                        d("input", {
                          type: "text",
                          placeholder: "Email",
                          className: "input input-bordered",
                          onChange: (v) => t(v.target.value),
                        }),
                      ],
                    }),
                    R("div", {
                      className: "form-control",
                      children: [
                        d("label", {
                          className: "label",
                          children: d("span", {
                            className: "label-text",
                            children: "Contraseña",
                          }),
                        }),
                        d("input", {
                          type: "password",
                          placeholder: "Contraseña",
                          className: "input input-bordered",
                          onChange: (v) => r(v.target.value),
                        }),
                        d("label", {
                          className: "label",
                          children: d("a", {
                            href: "#",
                            className: "label-text-alt link link-hover",
                            children: "Olvidaste tu contraseña?",
                          }),
                        }),
                      ],
                    }),
                    d("div", {
                      className: "form-control mt-6",
                      children: d("button", {
                        className: "btn btn-primary text-base-100",
                        type: "submit",
                        children: "Ingresar",
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
          d(jv, {
            show: i,
            handleClose: () => a(!1),
            title: "Error",
            message: "Datos incorrectos",
          }),
        ],
      })
    );
  };
var Pf = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Zs = St.createContext && St.createContext(Pf),
  Gt =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (Gt =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var l in t)
                Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
            }
            return e;
          }),
        Gt.apply(this, arguments)
      );
    },
  Iv =
    (globalThis && globalThis.__rest) ||
    function (e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          t.indexOf(r) < 0 &&
          (n[r] = e[r]);
      if (e != null && typeof Object.getOwnPropertySymbols == "function")
        for (var l = 0, r = Object.getOwnPropertySymbols(e); l < r.length; l++)
          t.indexOf(r[l]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, r[l]) &&
            (n[r[l]] = e[r[l]]);
      return n;
    };
function Rf(e) {
  return (
    e &&
    e.map(function (t, n) {
      return St.createElement(t.tag, Gt({ key: n }, t.attr), Rf(t.child));
    })
  );
}
function Xe(e) {
  return function (t) {
    return St.createElement(Av, Gt({ attr: Gt({}, e.attr) }, t), Rf(e.child));
  };
}
function Av(e) {
  var t = function (n) {
    var r = e.attr,
      l = e.size,
      o = e.title,
      i = Iv(e, ["attr", "size", "title"]),
      a = l || n.size || "1em",
      u;
    return (
      n.className && (u = n.className),
      e.className && (u = (u ? u + " " : "") + e.className),
      St.createElement(
        "svg",
        Gt(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          i,
          {
            className: u,
            style: Gt(Gt({ color: e.color || n.color }, n.style), e.style),
            height: a,
            width: a,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        o && St.createElement("title", null, o),
        e.children
      )
    );
  };
  return Zs !== void 0
    ? St.createElement(Zs.Consumer, null, function (n) {
        return t(n);
      })
    : t(Pf);
}
function Uv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: {
          d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
        },
      },
    ],
  })(e);
}
function Bv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: {
          d: "M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z",
        },
      },
    ],
  })(e);
}
function $v(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      { tag: "path", attr: { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" } },
    ],
  })(e);
}
function Hv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: {
          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
        },
      },
    ],
  })(e);
}
function Vv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: {
          d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
        },
      },
    ],
  })(e);
}
function Wv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: {
          d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
        },
      },
    ],
  })(e);
}
function Qv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: {
          d: "M10 4h4v4h-4zM4 16h4v4H4zM4 10h4v4H4zM4 4h4v4H4zM14 12.42V10h-4v4h2.42zM20.88 11.29l-1.17-1.17a.41.41 0 00-.58 0l-.88.88L20 12.75l.88-.88a.41.41 0 000-.58zM11 18.25V20h1.75l6.67-6.67-1.75-1.75zM16 4h4v4h-4z",
        },
      },
    ],
  })(e);
}
function Kv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: {
          d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
        },
      },
    ],
  })(e);
}
function Yv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0V0z" } },
      {
        tag: "path",
        attr: {
          d: "M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z",
        },
      },
    ],
  })(e);
}
function Gv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" },
      },
    ],
  })(e);
}
function Xv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0V0z" } },
      {
        tag: "path",
        attr: {
          d: "M7 9H2V7h5v2zm0 3H2v2h5v-2zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59 20.59 19zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3zM2 19h10v-2H2v2z",
        },
      },
    ],
  })(e);
}
function Jv(e) {
  return Xe({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } },
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z",
        },
      },
      {
        tag: "circle",
        attr: { cx: "9", cy: "8", r: "4", fillRule: "evenodd" },
      },
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 010 7.52c.42.14.86.24 1.33.24zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z",
        },
      },
    ],
  })(e);
}
const Zv = () => {
    const e = Dt(),
      { clients: t, status: n } = tr();
    return (
      console.log(t),
      d("div", {
        className: "h-screen bg-base-200 flex justify-center",
        children: d("div", {
          className: "pt-20 w-5/6",
          children: d("div", {
            className: "card w-full bg-base-100 shadow-xl",
            children: R("div", {
              className: "card-body ",
              children: [
                R("h2", {
                  className: "card-title flex justify-between",
                  children: [
                    "Clientes",
                    d("button", {
                      className:
                        "btn btn-info w-6/6  sm:w-1/6 text-xs sm:text-xs",
                      onClick: () => {
                        e("/clients/register");
                      },
                      children: "Registrar nuevo",
                    }),
                  ],
                }),
                R("div", {
                  className: "overflow-x-auto",
                  children: [
                    R("table", {
                      className: "table table-compact w-full",
                      children: [
                        d("thead", {
                          children: R("tr", {
                            children: [
                              d("th", {}),
                              d("th", { children: "Cedula" }),
                              d("th", { children: "Nombre" }),
                              d("th", { children: "Telefono" }),
                              d("th", { children: "Fecha de registro" }),
                              d("th", { children: "Acciones" }),
                            ],
                          }),
                        }),
                        d("tbody", {
                          children: t.map((l, o) =>
                            R("tr", {
                              children: [
                                d("th", { children: o + 1 }),
                                d("td", { children: l.Id_client }),
                                d("td", {
                                  children:
                                    l.Name_client + " " + l.Lastname_client,
                                }),
                                d("td", { children: l.Phone_client }),
                                d("td", { children: l.Date_suscribe }),
                                R("td", {
                                  className: "flex justify-between text-2xl",
                                  children: [
                                    d(Wv, {
                                      className: "text-blue-700",
                                      onClick: () => console.log(l.Id_client),
                                    }),
                                    d(Kv, { className: "text-green-700" }),
                                    d(Uv, { className: "text-red-700" }),
                                  ],
                                }),
                              ],
                            })
                          ),
                        }),
                      ],
                    }),
                    d("div", {}),
                  ],
                }),
              ],
            }),
          }),
        }),
      })
    );
  },
  qv = async () => {
    const e = await fetch(BASE_URL + "clients", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      t = await e.json(),
      n = await e.status;
    return { clients: t, status: n };
  },
  bv = () => {
    N.useState();
    const e = Dt(),
      { client: t, spouse: n, stage: r, economic: l } = tr(),
      o = {
        Nombre: t[0].Name_client + " " + t[0].Lastname_client,
        Cédula: t[0].Id_client,
        "Fecha de inscripción": t[0].Date_suscribe,
        Correo: t[0].Email_client,
        Número: t[0].Phone_client,
        "Estado Civil": t[0].Marital_status_client,
      };
    let i;
    n != null &&
      (i = {
        Nombre: n.Spouse_name,
        Ocupacion: n.Spouse_ocupation,
        "Nombre de la entidad": n.Spouse_entity,
        Dirección: n.Spouse_direction,
        "Ingreso Mensual": n.Spouse_salary,
      });
    let a;
    r != null && ((a = r), console.log(a));
    let u;
    l != null &&
      (console.log(l),
      (u = {
        "Nombre Entidad": l[0].Entity_name,
        "Direccion Entidad": l[0].Direction_entity,
        "Ocupacion Cliente": l[0].Ocupation_client,
        "Ingerso mensual": l[0].Salary_client,
      }));
    function s(h) {
      const { p: v } = h,
        c = [];
      for (const g in v)
        c.push(
          R(
            "div",
            {
              children: [
                d("span", { className: "text-xl font-medium", children: g }),
                d("p", { className: "text-base", children: v[g] }),
              ],
            },
            g
          )
        );
      return c;
    }
    return d("div", {
      className: "h-auto bg-gray-200 flex justify-center ",
      children: R("div", {
        className: " pt-20 w-5/6 flex-col mb-10",
        children: [
          R("div", {
            className: "flex justify-between",
            children: [
              d("div", {
                className: "card w-1/3 mt-5 mr-2 bg-base-100 shadow-xl ",
                children: R("div", {
                  className: "card-body",
                  children: [
                    d("h2", {
                      className: "card-title text-2xl text-primary",
                      children: "Datos peronales",
                    }),
                    d("div", {
                      className: "flex justify-center",
                      children:
                        t != null
                          ? d("div", {
                              className: "w-3/4",
                              children: s({ p: o }),
                            })
                          : d("div", { children: "nope" }),
                    }),
                  ],
                }),
              }),
              d("div", {
                className: "card w-1/3 mt-5 mr-2 bg-base-100 shadow-xl ",
                children: R("div", {
                  className: "card-body flex justify-center flex-col",
                  children: [
                    d("h2", {
                      className: "card-title text-2xl text-primary",
                      children: "Datos Conyuge",
                    }),
                    n != null
                      ? d("div", { children: s({ p: i }) })
                      : d("button", {
                          className: "btn w-1/2  m-20",
                          onClick: () => {
                            e("/clients/register/spouse");
                          },
                          children: "Continuar con la etapa",
                        }),
                  ],
                }),
              }),
              d("div", {
                className: "card w-1/3 mt-5 mr-2 bg-base-100 shadow-xl ",
                children: R("div", {
                  className: "card-body flex justify-center flex-col",
                  children: [
                    d("h2", {
                      className: "card-title text-2xl text-primary",
                      children: "Informe Economico",
                    }),
                    l != null
                      ? d("div", { children: s({ p: u }) })
                      : d("button", {
                          className: "btn w-1/2  m-20",
                          onClick: () => {
                            e("/clients/register/spouse");
                          },
                          children: "Continuar con la etapa",
                        }),
                  ],
                }),
              }),
            ],
          }),
          r != null
            ? d("div", {
                className: "flex ",
                children: d("div", {
                  className: "card w-full mt-5 mr-2 bg-base-100 shadow-xl ",
                  children: R("div", {
                    className: "card-body flex justify-center flex-col",
                    children: [
                      d("h2", {
                        className: "card-title text-2xl text-primary",
                        children: "Etapas",
                      }),
                      console.log(r),
                      r != null
                        ? R("table", {
                            className: "table table-compact w-full",
                            children: [
                              d("thead", {
                                children: R("tr", {
                                  children: [
                                    d("th", {}),
                                    d("th", { children: "Etapa" }),
                                    d("th", { children: "Inicio" }),
                                    d("th", { children: "Fin" }),
                                    d("th", { children: "Check" }),
                                  ],
                                }),
                              }),
                              d("tbody", {
                                children: a.map((h, v) =>
                                  R("tr", {
                                    children: [
                                      d("th", { children: v + 1 }),
                                      d("td", { children: h.Name_stage }),
                                      d("td", { children: h.Stage_start_date }),
                                      d("td", { children: h.Stage_end_date }),
                                      d("td", {
                                        children: d("div", {
                                          className: "form-control",
                                          children: R("label", {
                                            className: "cursor-pointer label",
                                            children: [
                                              d("span", {
                                                className: "label-text",
                                                children: "Etapa aprobada",
                                              }),
                                              d("input", {
                                                type: "checkbox",
                                                className:
                                                  "checkbox checkbox-success",
                                              }),
                                            ],
                                          }),
                                        }),
                                      }),
                                    ],
                                  })
                                ),
                              }),
                            ],
                          })
                        : d("div", {}),
                    ],
                  }),
                }),
              })
            : d("div", {
                className: "flex justify-center",
                children: d("button", {
                  onClick: (h) => {
                    e("/clients/stage1", { state: { id: t[0].Id_client } });
                  },
                  className: "btn btn-primary mt-10 text-4xl text-base-100",
                  children: "REGISTRAR",
                }),
              }),
        ],
      }),
    });
  },
  e0 = async ({ params: e }) => {
    const t = [
        fetch(rt + "client/" + e.idClient, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
        fetch(rt + "spouse/" + e.idClient, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
        fetch(rt + "stage/" + e.idClient, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
        fetch(rt + "economic/" + e.idClient, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
      ],
      [n, r, l, o] = await Promise.all(t).catch((h) => console.log(h)),
      i = await n.json(),
      a = await r.json(),
      u = await l.json(),
      s = await o.json();
    return { client: i, spouse: a, stage: u, economic: s };
  },
  t0 = () => {
    const e = Cf();
    return (
      console.log(e),
      R("div", {
        className:
          "flex justify-center flex-col items-center align-middle h-screen bg-base-200",
        children: [
          d(hu, {}),
          d("div", { className: "flex align-middle" }),
          d("div", {
            className: "text-3xl text-center sm:text-2xl mb-5",
            children: "Pagina no encontrada",
          }),
          d(Fo, {
            to: "/login",
            children: d("button", {
              className:
                "btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary text-base-100 mt-5",
              children: "Volver al inicio",
            }),
          }),
        ],
      })
    );
  },
  n0 = () => {
    const e = Dt(),
      t = () => {
        e("/login");
      };
    return (
      tr(),
      d("div", {
        className: "hero min-h-screen bg-base-200",
        children: d("div", {
          className: "hero-content text-center",
          children: R("div", {
            className: "max-w-md",
            children: [
              d("h1", {
                className: "text-5xl font-bold",
                children: "Gracias por usar el sistema",
              }),
              d("p", {
                className: "py-6",
                children:
                  "¡Gracias por utilizar nuestro sistema! Estamos contentos de poder ayudarte. Si necesitas algo más, no dudes en preguntar.",
              }),
              d("button", {
                className: "btn btn-primary text-base-100",
                onClick: t,
                children: "Aceptar",
              }),
            ],
          }),
        }),
      })
    );
  },
  r0 = async () => ({
    logi: await fetch("https://toorblue.com/api/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }),
  }),
  l0 = () =>
    R("footer", {
      className:
        "footer items-center p-4 bg-primary text-base-100 bottom-0 w-full z-50",
      children: [
        R("div", {
          className: "items-center grid-flow-col",
          children: [
            d("svg", {
              width: "36",
              height: "36",
              viewBox: "0 0 24 24",
              xmlns: "http://www.w3.org/2000/svg",
              fillRule: "evenodd",
              clipRule: "evenodd",
              className: "fill-current",
              children: d("path", {
                d: "M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z",
              }),
            }),
            d("p", { children: "Copyright © 2023 - All right reserved" }),
          ],
        }),
        R("div", {
          className:
            "grid-flow-col gap-4 md:place-self-center md:justify-self-end",
          children: [
            d("a", {
              children: d("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                className: "fill-current",
                children: d("path", {
                  d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
                }),
              }),
            }),
            d("a", {
              children: d("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                className: "fill-current",
                children: d("path", {
                  d: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
                }),
              }),
            }),
            d("a", {
              children: d("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                className: "fill-current",
                children: d("path", {
                  d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
                }),
              }),
            }),
          ],
        }),
      ],
    }),
  yi = (e) => {
    let t =
        "text-neutral bg-base-200  font-medium block py-5 px-3 flex items-center",
      n =
        "text-white font-medium block py-5 px-3 hover:bg-neutral flex items-center";
    return R(va, {
      to: e.path,
      className: ({ isActive: r }) => (r ? t : n),
      children: [
        d("div", { className: " text-3xl sm:text-3xl", children: e.icon }),
        d("span", { className: "ml-2", children: e.text }),
      ],
    });
  },
  o0 = (e) => {
    let t = "block text-base-100 py-5 px-3 flex items-center",
      n = "block  text-base-100 py-5 px-3  flex items-center";
    return R("div", {
      className: "collapse",
      children: [
        d("input", { type: "checkbox", className: "peer" }),
        R("div", {
          className:
            "flex items-center collapse-title bg-primary text-base-100 peer-checked:bg-secondary",
          children: [
            d("div", { className: " text-3xl sm:text-3xl", children: e.icon }),
            d("span", { className: "ml-2", children: e.text }),
          ],
        }),
        R("div", {
          className:
            "collapse-content bg-primary text-primary-content peer-checked:bg-secondary",
          children: [
            R(va, {
              to: e.path1,
              className: ({ isActive: r }) => (r ? t : n),
              children: [
                d(Qv, {}),
                d("span", { className: "ml-2", children: "Registro" }),
              ],
            }),
            R(va, {
              to: e.path2,
              className: ({ isActive: r }) => (r ? t : n),
              children: [
                d(Xv, {}),
                d("span", { className: "ml-2", children: "Buscar" }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  i0 = ({ isOpen: e, setIsOpen: t }) =>
    d("aside", {
      className: `bg-primary h-screen w-64 absolute top-15 z-20 left-0 ${
        e ? "Open" : "hidden"
      } shadow-md`,
      children: R("nav", {
        className: "flex flex-col h-screen shadow-lg align-middle",
        children: [
          d(yi, { text: "Principal", icon: d($v, {}), path: "/home" }),
          d(o0, {
            text: "Clientes",
            icon: d(Jv, {}),
            path1: "/clients/register",
            path2: "/clients/search",
          }),
          d(yi, { text: "Sobre Nosotros", icon: d(Hv, {}), path: "/about" }),
          d(yi, { text: "Cerrar Session", icon: d(Bv, {}), path: "/logout" }),
        ],
      }),
    }),
  a0 = () => {
    const [e, t] = N.useState(!1);
    return R("header", {
      className: "fixed top-0 w-full z-50",
      children: [
        R("nav", {
          className: "flex items-center justify-between p-4 bg-primary",
          children: [
            d("button", {
              onClick: () => t(!e),
              className: "text-white font-medium",
              children: e
                ? d(Yv, { className: "text-white text-2xl" })
                : d(Gv, { className: "text-white text-2xl" }),
            }),
            d("h1", { className: "text-base-100", children: "Bienvenido" }),
            d(Fo, {
              to: "/",
              className: "text-white font-medium",
              children: "Accion Inmobiliaria",
            }),
          ],
        }),
        d(i0, { isOpen: e, setIsOpen: t }),
      ],
    });
  },
  G = ({ text: e, type: t, name: n, defaultValue: r, onChange: l }) =>
    R("div", {
      className: "form-control w-full ml-2",
      children: [
        d("label", {
          className: "label",
          children: d("span", { className: "label-text", children: e }),
        }),
        d("input", {
          type: t,
          placeholder: e,
          name: n,
          onChange: l,
          defaultValue: r,
          required: !0,
          className: "input input-bordered w-full bg-orange-50",
        }),
      ],
    }),
  u0 = ({ handleChange: e, handleSubmit: t, employees: n, noti: r }) =>
    R("div", {
      className: "card  mt-9  w-2/3 bg-white mx-auto px-4",
      children: [
        d("h1", {
          className: "text-2xl font-medium mt-6 mb-3 text-center",
          children: "Registro de usuario",
        }),
        R("form", {
          onSubmit: t,
          children: [
            R("div", {
              className: "flex justify-between",
              children: [
                d(G, {
                  text: "Nombre",
                  type: "text",
                  name: "name_employee",
                  onChange: e,
                }),
                d(G, {
                  text: "Apellido",
                  type: "text",
                  name: "lastname_employee",
                  onChange: e,
                }),
              ],
            }),
            R("div", {
              className: "flex justify-between",
              children: [
                R("div", {
                  className: "form-control w-full max-w-xs mr-4",
                  children: [
                    d("label", {
                      className: "label",
                      children: d("span", {
                        className: "label-text",
                        children: "Superior",
                      }),
                    }),
                    R("div", {
                      className: "indicator w-full",
                      children: [
                        r
                          ? d("span", {
                              className: "indicator-item badge badge-secondary",
                            })
                          : d(Hl, {}),
                        R("select", {
                          className:
                            "select select-bordered bg-orange-50 w-full",
                          name: "emp_id_emp",
                          onChange: e,
                          required: !0,
                          children: [
                            d("option", {
                              disabled: !0,
                              selected: !0,
                              children: "Superior",
                            }),
                            n
                              ? n.map((l) => {
                                  const {
                                    id_employee: o,
                                    name_employee: i,
                                    lastname_employee: a,
                                  } = l;
                                  return d(
                                    "option",
                                    { value: o, children: i + " " + a },
                                    o
                                  );
                                })
                              : d(Hl, {}),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                d(G, {
                  text: "Email",
                  type: "email",
                  name: "email_employee",
                  onChange: e,
                }),
                d(G, {
                  text: "Contraseña",
                  type: "password",
                  name: "password_employee",
                  onChange: e,
                }),
              ],
            }),
            d("div", {
              className: "flex justify-center mt-5 card-actions mb-5",
              children: d("button", {
                type: "submit",
                className:
                  "bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary m-2 ",
                children: "Registrar Empleado",
              }),
            }),
          ],
        }),
      ],
    }),
  Mf = () => {
    const [e, t] = N.useState({ emp_id_emp: "" }),
      [n, r] = N.useState(!1),
      l = (s) => {
        const { name: h, value: v } = s.target;
        t({ ...e, [h]: v });
      },
      o = async (s) => {
        if ((s.preventDefault(), e.emp_id_emp == "")) {
          r(!0);
          return;
        }
        const h = await fetch(rt + "register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(e),
        }).catch((v) => (console.log(v), v));
        console.log(h);
      },
      i = Dt(),
      { status: a, employees: u } = tr();
    return (
      u != null && u.forEach((s) => {}),
      R("section", {
        className: "bg-gray-100 py-12 h-screen",
        children: [
          d("button", {
            onClick: (s) => {
              i("/login");
            },
            className:
              "bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary absolute top-0 right-0 m-4",
            children: "Cerrar sesión",
          }),
          d(u0, { handleSubmit: o, handleChange: l, employees: u, noti: n }),
        ],
      })
    );
  },
  s0 = async () => {
    const e = await fetch(rt + "employees", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      t = await e.json();
    return { status: e.status, employees: t };
  },
  c0 = () => {
    const { status: e, user: t } = tr();
    return t.permissions == "admin"
      ? d(Hl, { children: d(Mf, {}) })
      : R(Hl, { children: [d(a0, {}), d(Ev, {}), d(l0, {})] });
  },
  d0 = async () => {
    const e = await fetch(rt + "user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      t = await e.json(),
      n = await e.status;
    return console.log(n), { status: n, user: t };
  },
  Or = ({ text: e, value: t, name: n, options: r, onChange: l }) =>
    R("div", {
      className: "form-control w-full max-w-xs mr-4",
      children: [
        d("label", {
          className: "label",
          children: d("span", { className: "label-text", children: e }),
        }),
        R("select", {
          className: "select select-bordered bg-orange-50",
          value: t,
          name: n,
          onChange: l,
          required: !0,
          children: [
            d("option", { disabled: !0, selected: !0, children: e }),
            r.map((o, i) => d("option", { value: o, children: o }, i)),
          ],
        }),
      ],
    }),
  f0 = () => {
    const [e, t] = N.useState({
        id_client: "",
        name_client: "",
        lastname_client: "",
        email_client: "",
        phone_client: "",
        city_subscribe: "",
        direction_client: "",
        marital_status_client: "",
      }),
      [n, r] = N.useState([!1]),
      [l, o] = N.useState(!1),
      i = Dt(),
      a = (c) => {
        const g = [...n];
        (g[c] = !g[c]), r(g), g.every((S) => S === !0) ? o(!0) : o(!1);
      },
      u = (c) => {
        const { name: g, value: S } = c.target;
        t({ ...e, [g]: S });
      },
      s = async (c) => {
        c.preventDefault(), console.log(e);
        const g = await fetch(rt + "clients/insert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(e),
        })
          .then((S) => {
            if (S.ok) return S.status;
            throw new Error("Error: " + S.status);
          })
          .catch((S) => S);
        l && g == 200 && i("/clients/stage1", { state: { id: e.id_client } });
      },
      [h, v] = N.useState("");
    return (
      N.useEffect(() => {
        const c = new Date(),
          g = new Date(c.setMonth(c.getMonth() + 3));
        v(g.toISOString().split("T")[0]);
      }, []),
      d("form", {
        onSubmit: s,
        children: d("div", {
          className: "h-auto bg-base-200 flex justify-center",
          children: d("div", {
            className: "pt-20 w-5/6 mb-10",
            children: d("div", {
              className: "card w-full bg-base-100 shadow-xl",
              children: R("div", {
                className: "card-body flex justify-center",
                children: [
                  d("h2", { className: "card-title", children: "Registro" }),
                  R("div", {
                    className: "flex",
                    children: [
                      d("div", {
                        className: "w-1/2 mr-2",
                        children: d(G, {
                          text: "Cedula",
                          type: "text",
                          name: "id_client",
                          onChange: u,
                        }),
                      }),
                      d("div", {
                        className: "w-1/2 ml-2",
                        children: d(G, {
                          text: "Ciudad",
                          type: "text",
                          name: "city_subscribe",
                          onChange: u,
                        }),
                      }),
                    ],
                  }),
                  R("div", {
                    className: "flex",
                    children: [
                      d("div", {
                        className: "w-1/2 mr-2",
                        children: d(G, {
                          text: "Nombres",
                          type: "text",
                          name: "name_client",
                          onChange: u,
                        }),
                      }),
                      d("div", {
                        className: "w-1/2 ml-2",
                        children: d(G, {
                          text: "Apellidos",
                          type: "text",
                          name: "lastname_client",
                          onChange: u,
                        }),
                      }),
                    ],
                  }),
                  R("div", {
                    className: "mt-2 flex justify-between",
                    children: [
                      d(Or, {
                        text: "Estado Civil",
                        name: "marital_status_client",
                        options: ["Soltero", "Casado", "Divorciado"],
                        onChange: u,
                      }),
                      d(G, {
                        text: "Email",
                        type: "email",
                        name: "email_client",
                        onChange: u,
                      }),
                    ],
                  }),
                  d(G, {
                    text: "Direccion domiciliaria",
                    type: "text",
                    name: "direction_client",
                    onChange: u,
                  }),
                  d(G, { text: "Referencia", type: "text" }),
                  R("div", {
                    className: "flex",
                    children: [
                      d("div", {
                        className: "w-1/2 mr-2",
                        children: d(G, {
                          text: "Telefono Fijo",
                          type: "text",
                          name: "phone_client",
                          onChange: u,
                        }),
                      }),
                      d("div", {
                        className: "w-1/2 ml-2",
                        children: d(G, {
                          text: "Telefono Cedular",
                          type: "text",
                        }),
                      }),
                    ],
                  }),
                  d("div", {
                    className: "form-control",
                    children: R("label", {
                      className: "cursor-pointer label",
                      children: [
                        d("span", {
                          className: "label-text text-primary text-xl",
                          children: "Realiza Abono",
                        }),
                        d("input", {
                          type: "checkbox",
                          className: "checkbox checkbox-success",
                          checked: n[0],
                          onChange: () => a(0),
                        }),
                      ],
                    }),
                  }),
                  l
                    ? d("div", {})
                    : d(G, {
                        name: "date_reunion",
                        text: "Fecha siguiente reunion",
                        type: "date",
                        defaultValue: h,
                      }),
                  R("div", {
                    className: "card-actions justify-center mt-5",
                    children: [
                      d("input", {
                        type: "submit",
                        value: "Registrar",
                        className: "btn btn-primary text-base-100",
                      }),
                      d("input", {
                        type: "submit",
                        value: "Continuar con proceso",
                        className: "btn btn-primary text-base-100",
                        disabled: !l,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        }),
      })
    );
  },
  qs = ({ onClick: e, onChange: t, text: n }) =>
    d("div", {
      className: "form-control",
      children: R("div", {
        className: "input-group",
        children: [
          d("input", {
            type: "text",
            placeholder: n,
            onChange: t,
            className: "input input-bordered",
          }),
          d("button", {
            className: "btn btn-square",
            onClick: e,
            children: d(Vv, { className: "text-2xl" }),
          }),
        ],
      }),
    }),
  bs = () => {
    const [e, t] = N.useState(),
      n = Dt(),
      r = (o) => {
        t(o.target.value);
      },
      l = () => {
        n("/clients/" + e);
      };
    return d("div", {
      className: "h-screen bg-base-200 flex justify-center",
      children: d("div", {
        className: "pt-20 w-5/6",
        children: d("div", {
          className: "card w-full bg-base-100 shadow-xl",
          children: R("div", {
            className: "card-body flex flex-row justify-between",
            children: [
              R("h2", {
                className: "card-title w-full flex justify-center ",
                children: [
                  d("span", {
                    className: "mr-2",
                    children: "Buscar por cedula:",
                  }),
                  d(qs, { onChange: r, onClick: l, text: "Cedula" }),
                ],
              }),
              R("h2", {
                className: "card-title w-full flex justify-center",
                children: [
                  d("span", {
                    className: "mr-2",
                    children: "Buscar por apellido:",
                  }),
                  d(qs, { onChange: r, onClick: l, text: "Apellidoo" }),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  },
  p0 = () => {
    const e = er(),
      [t, n] = N.useState("");
    N.useEffect(() => {
      const a = new Date(),
        u = new Date(a.setMonth(a.getMonth() + 3));
      n(u.toISOString().split("T")[0]);
    }, []);
    const [r, l] = N.useState({
        id_client: e.state.id,
        property_direction: "",
        date_reunion: t,
        spouse_entity: "",
        client_ocupation: "",
        entity_direction: "",
        spouse_ocupation: "",
        client_position: "",
        spouse_salary: 0,
        client_salary: 0,
        spouse_lastname: "",
        spouse_direction: "",
        payment: 0,
      }),
      o = (a) => {
        const { name: u, value: s } = a.target;
        l({ ...r, [u]: s });
      };
    return d("form", {
      onSubmit: async (a) => {
        a.preventDefault(),
          console.log(r),
          await fetch(rt + "clients/insert/economiccard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(r),
          })
            .then((u) => {
              if (u.ok) return u.status;
              throw (console.log(r), new Error("Error: " + u.status));
            })
            .catch((u) => u);
      },
      children: d("div", {
        className: " bg-base-200 flex justify-center mb-10",
        children: d("div", {
          className: "pt-20 w-5/6 bg-base-200 h-auto",
          children: d("div", {
            className: "card w-full bg-base-100 shadow-xl",
            children: R("div", {
              className: "card-body flex justify-center",
              children: [
                d("h2", {
                  className: "card-title",
                  children: "Registro de Etapa",
                }),
                R("div", {
                  className: "flex",
                  children: [
                    d(Or, {
                      name: "type_property",
                      text: "Tipo de propiedad",
                      onChange: o,
                      options: ["Terreno", "Departamento", "Casa", "Otro"],
                    }),
                    d(G, {
                      name: "property_direction",
                      text: "Sector de la propiedad",
                      type: "text",
                      onChange: o,
                    }),
                  ],
                }),
                R("div", {
                  className: "flex",
                  children: [
                    d(G, {
                      name: "payment",
                      text: "Valor del abono",
                      type: "number",
                      onChange: o,
                    }),
                    d(G, {
                      name: "date_reunion",
                      text: "Fecha siguiente reunion",
                      type: "date",
                      defaultValue: t,
                      onChange: o,
                    }),
                  ],
                }),
                R("div", {
                  children: [
                    d("h2", {
                      className: "card-title mt-2 mb-2",
                      children: "Registro Informe Economico",
                    }),
                    d(G, {
                      name: "client_entity",
                      text: "Nombre de la entidad",
                      type: "text",
                      onChange: o,
                    }),
                    d(G, {
                      name: "client_position",
                      text: "Cargo",
                      type: "text",
                      onChange: o,
                    }),
                    d(G, {
                      name: "entity_direction",
                      text: "Dirección",
                      type: "text",
                      onChange: o,
                    }),
                    R("div", {
                      className: "mt-2 flex justify-between",
                      children: [
                        d(Or, {
                          name: "client_ocupation",
                          text: "Ocupacion",
                          onChange: o,
                          options: [
                            "Empleado publico",
                            "Empleado privado",
                            "Independiente",
                            "Otro",
                          ],
                        }),
                        d(G, {
                          name: "client_salary",
                          text: "Ingreso Mensual",
                          type: "number",
                          onChange: o,
                        }),
                      ],
                    }),
                  ],
                }),
                R("div", {
                  children: [
                    d("h2", {
                      className: "card-title mt-2 mb-2",
                      children: "Registro Conyugue u Otro",
                    }),
                    d(G, {
                      name: "spouse_lastname",
                      text: "Apellido",
                      type: "text",
                      onChange: o,
                    }),
                    d(G, {
                      name: "spouse_entity",
                      text: "Nombre de la entidad",
                      type: "text",
                      onChange: o,
                    }),
                    d(G, {
                      name: "spouse_direction",
                      text: "Dirección",
                      type: "text",
                      onChange: o,
                    }),
                    R("div", {
                      className: "mt-2 flex justify-between",
                      children: [
                        d(Or, {
                          name: "spouse_ocupation",
                          text: "Ocupacion",
                          onChange: o,
                          options: [
                            "Empleado publico",
                            "Empleado privado",
                            "Independiente",
                            "Otro",
                          ],
                        }),
                        d(G, {
                          name: "spouse_salary",
                          text: "Ingreso Mensual",
                          type: "number",
                          onChange: o,
                        }),
                      ],
                    }),
                  ],
                }),
                d("div", {
                  className: "card-actions justify-center mt-5",
                  children: d("input", {
                    type: "submit",
                    value: "Registrar",
                    className: "btn btn-primary text-base-100",
                  }),
                }),
              ],
            }),
          }),
        }),
      }),
    });
  },
  h0 = () =>
    d("form", {
      children: d("div", {
        className: "h-screen bg-base-200 flex justify-center",
        children: d("div", {
          className: "pt-20 w-5/6",
          children: d("div", {
            className: "card w-full bg-base-100 shadow-xl",
            children: R("div", {
              className: "card-body flex justify-center",
              children: [
                d("h2", {
                  className: "card-title",
                  children: "Registro Conyugue u Otro",
                }),
                d(G, {
                  name: "spouse_lastname",
                  text: "Apellido",
                  type: "text",
                }),
                d(G, {
                  name: "spouse_entity",
                  text: "Nombre de la entidad",
                  type: "text",
                }),
                d(G, {
                  name: "spouse_direction",
                  text: "Dirección",
                  type: "text",
                }),
                R("div", {
                  className: "mt-2 flex justify-between",
                  children: [
                    d(Or, {
                      name: "spouse_ocupation",
                      text: "Ocupacion",
                      options: [
                        "Empleado publico",
                        "Empleado privado",
                        "Independiente",
                        "Otro",
                      ],
                    }),
                    d(G, {
                      name: "spouse_salary",
                      text: "Ingreso Mensual",
                      type: "number",
                    }),
                  ],
                }),
                d("div", {
                  className: "card-actions justify-center mt-5",
                  children: d("input", {
                    type: "submit",
                    value: "Registrar",
                    className: "btn btn-primary text-base-100",
                  }),
                }),
              ],
            }),
          }),
        }),
      }),
    }),
  m0 = Lv([
    { path: "/login", element: d(Fv, {}) },
    { path: "/admin", element: d(Mf, {}), loader: s0 },
    {
      path: "/",
      element: d(c0, {}),
      errorElement: d(t0, {}),
      loader: d0,
      children: [
        { index: !0, element: d(Xs, {}), loader: Js },
        { path: "/home", element: d(Xs, {}), loader: Js },
        { path: "/clients", element: d(Zv, {}), loader: qv },
        { path: "/clients/search", element: d(bs, {}) },
        {
          path: "/clients/:idClient",
          element: d(bv, {}),
          loader: e0,
          errorElement: d(bs, {}),
        },
        { path: "/clients/register", element: d(f0, {}) },
        { path: "/clients/stage1", element: d(p0, {}) },
        { path: "/clients/register/spouse", element: d(h0, {}) },
        { path: "logout", element: d(n0, {}), loader: r0 },
      ],
    },
  ]);
xi.createRoot(document.getElementById("root")).render(
  d(St.StrictMode, { children: d(Sv, { router: m0 }) })
);
