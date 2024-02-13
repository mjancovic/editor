import { c as L, S as M, i as T, f as k, s as j, e as d, a as P, b as h, d as w, g as m, l as C, n as $, h as y, j as O, r as Q, k as R, t as U, m as V, o as W, p as z, q as K, u as F, v as G, w as v, x as X, y as E, z as I, A as J, B as Y, C as S, D as Z } from "./ckeditor5-12fb12ea.js";
function q(n) {
  return n?.length !== void 0 ? n : Array.from(n);
}
function A(n, t, s) {
  const e = n.slice();
  return e[4] = t[s], e;
}
function D(n) {
  let t, s = (
    /*button*/
    n[4].text + ""
  ), e, l, i, u, f;
  return {
    c() {
      t = d("button"), e = U(s), h(t, "class", l = /*button*/
      n[4].style), h(t, "title", i = /*button*/
      n[4].text);
    },
    m(r, a) {
      w(r, t, a), m(t, e), u || (f = C(t, "click", function() {
        V(
          /*button*/
          n[4].handler
        ) && n[4].handler.apply(this, arguments);
      }), u = !0);
    },
    p(r, a) {
      n = r, a & /*buttons*/
      1 && s !== (s = /*button*/
      n[4].text + "") && W(e, s), a & /*buttons*/
      1 && l !== (l = /*button*/
      n[4].style) && h(t, "class", l), a & /*buttons*/
      1 && i !== (i = /*button*/
      n[4].text) && h(t, "title", i);
    },
    d(r) {
      r && y(t), u = !1, f();
    }
  };
}
function x(n) {
  let t, s, e, l, i, u, f, r = q(
    /*buttons*/
    n[0]
  ), a = [];
  for (let o = 0; o < r.length; o += 1)
    a[o] = D(A(n, r, o));
  return {
    c() {
      t = d("div"), s = d("button"), s.textContent = "HTML", e = P(), l = d("button"), l.textContent = "Plain", i = P();
      for (let o = 0; o < a.length; o += 1)
        a[o].c();
      h(s, "class", "HTMLEditor"), h(l, "class", "PlainEditor");
    },
    m(o, _) {
      w(o, t, _), m(t, s), m(t, e), m(t, l), m(t, i);
      for (let c = 0; c < a.length; c += 1)
        a[c] && a[c].m(t, null);
      u || (f = [
        C(
          s,
          "click",
          /*onHtml*/
          n[1]
        ),
        C(
          l,
          "click",
          /*onPlain*/
          n[2]
        )
      ], u = !0);
    },
    p(o, [_]) {
      if (_ & /*buttons*/
      1) {
        r = q(
          /*buttons*/
          o[0]
        );
        let c;
        for (c = 0; c < r.length; c += 1) {
          const g = A(o, r, c);
          a[c] ? a[c].p(g, _) : (a[c] = D(g), a[c].c(), a[c].m(t, null));
        }
        for (; c < a.length; c += 1)
          a[c].d(1);
        a.length = r.length;
      }
    },
    i: $,
    o: $,
    d(o) {
      o && y(t), O(a, o), u = !1, Q(f);
    }
  };
}
function tt(n, t, s) {
  const e = R();
  let { buttons: l = [] } = t;
  function i() {
    e("html", {});
  }
  function u() {
    e("plain", {});
  }
  return n.$$set = (f) => {
    "buttons" in f && s(0, l = f.buttons);
  }, [l, i, u];
}
class N extends M {
  constructor(t) {
    super(), T(this, t, tt, x, j, { buttons: 0 });
  }
  get buttons() {
    return this.$$.ctx[0];
  }
  set buttons(t) {
    this.$$set({ buttons: t }), k();
  }
}
L(N, { buttons: {} }, [], [], !0);
function et(n) {
  let t, s, e;
  return {
    c() {
      t = d("textarea");
    },
    m(l, i) {
      w(l, t, i), S(
        t,
        /*value*/
        n[0]
      ), s || (e = C(
        t,
        "input",
        /*textarea_input_handler*/
        n[6]
      ), s = !0);
    },
    p(l, i) {
      i & /*value*/
      1 && S(
        t,
        /*value*/
        l[0]
      );
    },
    i: $,
    o: $,
    d(l) {
      l && y(t), s = !1, e();
    }
  };
}
function nt(n) {
  let t, s, e;
  function l(u) {
    n[5](u);
  }
  let i = {};
  return (
    /*value*/
    n[0] !== void 0 && (i.value = /*value*/
    n[0]), t = new Z({ props: i }), z.push(() => K(t, "value", l)), {
      c() {
        F(t.$$.fragment);
      },
      m(u, f) {
        G(t, u, f), e = !0;
      },
      p(u, f) {
        const r = {};
        !s && f & /*value*/
        1 && (s = !0, r.value = /*value*/
        u[0], I(() => s = !1)), t.$set(r);
      },
      i(u) {
        e || (E(t.$$.fragment, u), e = !0);
      },
      o(u) {
        v(t.$$.fragment, u), e = !1;
      },
      d(u) {
        J(t, u);
      }
    }
  );
}
function st(n) {
  let t, s, e, l, i, u, f, r;
  const a = [nt, et], o = [];
  function _(b, p) {
    return (
      /*html*/
      b[2] ? 0 : 1
    );
  }
  e = _(n), l = o[e] = a[e](n);
  function c(b) {
    n[7](b);
  }
  let g = {};
  return (
    /*buttons*/
    n[1] !== void 0 && (g.buttons = /*buttons*/
    n[1]), u = new N({ props: g }), z.push(() => K(u, "buttons", c)), u.$on(
      "html",
      /*handleHtml*/
      n[3]
    ), u.$on(
      "plain",
      /*handlePlain*/
      n[4]
    ), {
      c() {
        t = d("main"), s = d("div"), l.c(), i = P(), F(u.$$.fragment), h(s, "class", "Editor");
      },
      m(b, p) {
        w(b, t, p), m(t, s), o[e].m(s, null), m(t, i), G(u, t, null), r = !0;
      },
      p(b, [p]) {
        let H = e;
        e = _(b), e === H ? o[e].p(b, p) : (Y(), v(o[H], 1, 1, () => {
          o[H] = null;
        }), X(), l = o[e], l ? l.p(b, p) : (l = o[e] = a[e](b), l.c()), E(l, 1), l.m(s, null));
        const B = {};
        !f && p & /*buttons*/
        2 && (f = !0, B.buttons = /*buttons*/
        b[1], I(() => f = !1)), u.$set(B);
      },
      i(b) {
        r || (E(l), E(u.$$.fragment, b), r = !0);
      },
      o(b) {
        v(l), v(u.$$.fragment, b), r = !1;
      },
      d(b) {
        b && y(t), o[e].d(), J(u);
      }
    }
  );
}
function lt(n, t, s) {
  let { value: e = "" } = t, { buttons: l = [] } = t, { html: i = !0 } = t;
  function u() {
    i || s(2, i = !0);
  }
  function f() {
    i && (s(0, e = e.replace(/<[^>]*>?/gm, "")), s(2, i = !1));
  }
  function r(_) {
    e = _, s(0, e);
  }
  function a() {
    e = this.value, s(0, e);
  }
  function o(_) {
    l = _, s(1, l);
  }
  return n.$$set = (_) => {
    "value" in _ && s(0, e = _.value), "buttons" in _ && s(1, l = _.buttons), "html" in _ && s(2, i = _.html);
  }, [
    e,
    l,
    i,
    u,
    f,
    r,
    a,
    o
  ];
}
class ut extends M {
  constructor(t) {
    super(), T(this, t, lt, st, j, { value: 0, buttons: 1, html: 2 });
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(t) {
    this.$$set({ value: t }), k();
  }
  get buttons() {
    return this.$$.ctx[1];
  }
  set buttons(t) {
    this.$$set({ buttons: t }), k();
  }
  get html() {
    return this.$$.ctx[2];
  }
  set html(t) {
    this.$$set({ html: t }), k();
  }
}
customElements.define("switchable-editor", L(ut, { value: {}, buttons: {}, html: { type: "Boolean" } }, [], [], !1));
