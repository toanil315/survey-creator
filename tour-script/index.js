(() => {
  'use strict';
  var e = {
      305: function (e, s) {
        s.pathToRegexp = pathToRegexp;
        const d = '/',
          NOOP_VALUE = (e) => e,
          c = /^[$_\p{ID_Start}]$/u,
          u = /^[$\u200c\u200d\p{ID_Continue}]$/u,
          m = 'https://git.new/pathToRegexpError',
          h = {
            '{': '{',
            '}': '}',
            '(': '(',
            ')': ')',
            '[': '[',
            ']': ']',
            '+': '+',
            '?': '?',
            '!': '!',
          };
        function escape(e) {
          return e.replace(/[.+*?^${}()[\]|/\\]/g, '\\$&');
        }
        class Iter {
          constructor(e) {
            this.tokens = e;
          }
          peek() {
            if (!this._peek) {
              const e = this.tokens.next();
              this._peek = e.value;
            }
            return this._peek;
          }
          tryConsume(e) {
            const s = this.peek();
            if (s.type === e) return (this._peek = void 0), s.value;
          }
          consume(e) {
            const s = this.tryConsume(e);
            if (void 0 !== s) return s;
            const { type: d, index: c } = this.peek();
            throw new TypeError(`Unexpected ${d} at ${c}, expected ${e}: ${m}`);
          }
          text() {
            let e,
              s = '';
            for (; (e = this.tryConsume('CHAR') || this.tryConsume('ESCAPED')); ) s += e;
            return s;
          }
        }
        class TokenData {
          constructor(e) {
            this.tokens = e;
          }
        }
        function parse(e, s = {}) {
          const { encodePath: d = NOOP_VALUE } = s,
            g = new Iter(
              (function* lexer(e) {
                const s = [...e];
                let d = 0;
                function name() {
                  let e = '';
                  if (c.test(s[++d])) for (e += s[d]; u.test(s[++d]); ) e += s[d];
                  else if ('"' === s[d]) {
                    let c = d;
                    for (; d < s.length; ) {
                      if ('"' === s[++d]) {
                        d++, (c = 0);
                        break;
                      }
                      e += '\\' === s[d] ? s[++d] : s[d];
                    }
                    if (c) throw new TypeError(`Unterminated quote at ${c}: ${m}`);
                  }
                  if (!e) throw new TypeError(`Missing parameter name at ${d}: ${m}`);
                  return e;
                }
                for (; d < s.length; ) {
                  const e = s[d],
                    c = h[e];
                  if (c) yield { type: c, index: d++, value: e };
                  else if ('\\' === e) yield { type: 'ESCAPED', index: d++, value: s[d++] };
                  else if (':' === e) {
                    const e = name();
                    yield { type: 'PARAM', index: d, value: e };
                  } else if ('*' === e) {
                    const e = name();
                    yield { type: 'WILDCARD', index: d, value: e };
                  } else yield { type: 'CHAR', index: d, value: s[d++] };
                }
                return { type: 'END', index: d, value: '' };
              })(e),
            );
          const y = (function consume(e) {
            const s = [];
            for (;;) {
              const c = g.text();
              c && s.push({ type: 'text', value: d(c) });
              const u = g.tryConsume('PARAM');
              if (u) {
                s.push({ type: 'param', name: u });
                continue;
              }
              const m = g.tryConsume('WILDCARD');
              if (m) {
                s.push({ type: 'wildcard', name: m });
                continue;
              }
              if (!g.tryConsume('{')) return g.consume(e), s;
              s.push({ type: 'group', tokens: consume('}') });
            }
          })('END');
          return new TokenData(y);
        }
        function tokensToFunction(e, s, d) {
          const c = e.map((e) =>
            (function tokenToFunction(e, s, d) {
              if ('text' === e.type) return () => [e.value];
              if ('group' === e.type) {
                const c = tokensToFunction(e.tokens, s, d);
                return (e) => {
                  const [s, ...d] = c(e);
                  return d.length ? [''] : [s];
                };
              }
              const c = d || NOOP_VALUE;
              if ('wildcard' === e.type && !1 !== d)
                return (d) => {
                  const u = d[e.name];
                  if (null == u) return ['', e.name];
                  if (!Array.isArray(u) || 0 === u.length)
                    throw new TypeError(`Expected "${e.name}" to be a non-empty array`);
                  return [
                    u
                      .map((s, d) => {
                        if ('string' != typeof s)
                          throw new TypeError(`Expected "${e.name}/${d}" to be a string`);
                        return c(s);
                      })
                      .join(s),
                  ];
                };
              return (s) => {
                const d = s[e.name];
                if (null == d) return ['', e.name];
                if ('string' != typeof d)
                  throw new TypeError(`Expected "${e.name}" to be a string`);
                return [c(d)];
              };
            })(e, s, d),
          );
          return (e) => {
            const s = [''];
            for (const d of c) {
              const [c, ...u] = d(e);
              (s[0] += c), s.push(...u);
            }
            return s;
          };
        }
        function pathToRegexp(e, s = {}) {
          const { delimiter: c = d, end: u = !0, sensitive: m = !1, trailing: h = !0 } = s,
            g = [],
            y = [],
            E = m ? '' : 'i',
            x = (Array.isArray(e) ? e : [e]).map((e) => (e instanceof TokenData ? e : parse(e, s)));
          for (const { tokens: e } of x)
            for (const s of flatten(e, 0, [])) {
              const e = sequenceToRegExp(s, c, g);
              y.push(e);
            }
          let _ = `^(?:${y.join('|')})`;
          h && (_ += `(?:${escape(c)}$)?`), (_ += u ? '$' : `(?=${escape(c)}|$)`);
          return { regexp: new RegExp(_, E), keys: g };
        }
        function* flatten(e, s, d) {
          if (s === e.length) return yield d;
          const c = e[s];
          if ('group' === c.type) {
            const u = d.slice();
            for (const d of flatten(c.tokens, 0, u)) yield* flatten(e, s + 1, d);
          } else d.push(c);
          yield* flatten(e, s + 1, d);
        }
        function sequenceToRegExp(e, s, d) {
          let c = '',
            u = '',
            h = !0;
          for (let g = 0; g < e.length; g++) {
            const y = e[g];
            if ('text' !== y.type)
              if ('param' !== y.type && 'wildcard' !== y.type);
              else {
                if (!h && !u) throw new TypeError(`Missing text after "${y.name}": ${m}`);
                'param' === y.type ? (c += `(${negate(s, h ? '' : u)}+)`) : (c += '([\\s\\S]+)'),
                  d.push(y),
                  (u = ''),
                  (h = !1);
              }
            else (c += escape(y.value)), (u += y.value), h || (h = y.value.includes(s));
          }
          return c;
        }
        function negate(e, s) {
          return s.length < 2
            ? e.length < 2
              ? `[^${escape(e + s)}]`
              : `(?:(?!${escape(e)})[^${escape(s)}])`
            : e.length < 2
            ? `(?:(?!${escape(s)})[^${escape(e)}])`
            : `(?:(?!${escape(s)}|${escape(e)})[\\s\\S])`;
        }
      },
    },
    s = {};
  function __webpack_require__(d) {
    var c = s[d];
    if (void 0 !== c) return c.exports;
    var u = (s[d] = { exports: {} });
    return e[d](u, u.exports, __webpack_require__), u.exports;
  }
  (__webpack_require__.d = function (e, s) {
    for (var d in s)
      __webpack_require__.o(s, d) &&
        !__webpack_require__.o(e, d) &&
        Object.defineProperty(e, d, { enumerable: !0, get: s[d] });
  }),
    (__webpack_require__.o = function (e, s) {
      return Object.prototype.hasOwnProperty.call(e, s);
    }),
    (__webpack_require__.rv = function () {
      return '1.0.0-beta.5';
    }),
    (__webpack_require__.ruid = 'bundler=rspack@1.0.0-beta.5');
  var d, c;
  __webpack_require__.d({}, { L: () => z }),
    ((c = d || (d = {})).START_GETTING_ELEMENT = 'start-getting-element'),
    (c.END_GETTING_ELEMENT = 'end-getting-element'),
    (c.CLEAN_UP = 'clean-up'),
    (c.HIGHLIGHT_ELEMENT = 'highlight-element'),
    (c.PREVIEW_TOUR = 'preview-tour'),
    (c.SELECT_ELEMENT = 'select-element'),
    (c.HANDSHAKE = 'handshake'),
    (c.CONNECTION_ESTABLISHED = 'connection-established'),
    (c.ON_LOADED = 'on-loaded'),
    (c.SHOW_TOUR = 'show-tour'),
    (c.CURRENT_STEP_INDEX = 'current-step-index'),
    (c.READY_FOR_TOURING = 'ready-for-touring'),
    (c.STORE_USER_ID = 'store-user-id'),
    (c.CREDENTIALS_FROM_POPUP = 'credentials-from-popup'),
    (c.CREDENTIALS_FROM_EDITOR = 'credentials-from-editor'),
    (c.CLOSE_VIDEO_POPUP = 'close-video-popup');
  const u = 'GET_CREDENTIALS_ACTION';
  var m, h, g, y, E, x, _, C;
  ((h = m || (m = {})).tooltip = 'tooltip'),
    (h.modal = 'modal'),
    (h.drivenAction = 'driven action'),
    ((y = g || (g = {})).click = 'click'),
    (y.input = 'input'),
    ((x = E || (E = {})).id = 'id'),
    (x.domHierarchy = 'dom-hierarchy'),
    ((C = _ || (_ = {})).text = 'text'),
    (C.image = 'image'),
    (C.link = 'link'),
    (C.media = 'media'),
    (C.iframe = 'iframe'),
    (C.description = 'description');
  let T = {};
  function D(e = {}) {
    T = {
      animate: !0,
      allowClose: !0,
      overlayOpacity: 0.7,
      smoothScroll: !1,
      disableActiveInteraction: !1,
      showProgress: !1,
      stagePadding: 10,
      stageRadius: 5,
      popoverOffset: 10,
      showButtons: ['next', 'previous', 'close'],
      disableButtons: [],
      overlayColor: '#000',
      ...e,
    };
  }
  function a(e) {
    return e ? T[e] : T;
  }
  function W(e, s, d, c) {
    return (e /= c / 2) < 1 ? (d / 2) * e * e + s : (-d / 2) * (--e * (e - 2) - 1) + s;
  }
  function Q(e) {
    const s =
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
    return e
      .flatMap((e) => {
        const d = e.matches(s),
          c = Array.from(e.querySelectorAll(s));
        return [...(d ? [e] : []), ...c];
      })
      .filter(
        (e) =>
          'none' !== getComputedStyle(e).pointerEvents &&
          (function ae(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
          })(e),
      );
  }
  function Z(e) {
    if (
      !e ||
      (function se(e) {
        const s = e.getBoundingClientRect();
        return (
          s.top >= 0 &&
          s.left >= 0 &&
          s.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          s.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      })(e)
    )
      return;
    const s = a('smoothScroll');
    e.scrollIntoView({
      behavior: !s || re(e) ? 'auto' : 'smooth',
      inline: 'center',
      block: 'center',
    });
  }
  function re(e) {
    if (!e || !e.parentElement) return;
    const s = e.parentElement;
    return s.scrollHeight > s.clientHeight;
  }
  let k = {};
  function b(e, s) {
    k[e] = s;
  }
  function l(e) {
    return e ? k[e] : k;
  }
  function V() {
    k = {};
  }
  let S = {};
  function N(e, s) {
    S[e] = s;
  }
  function L(e) {
    var s;
    null == (s = S[e]) || s.call(S);
  }
  function G(e) {
    if (!e) return;
    const s = e.getBoundingClientRect(),
      d = { x: s.x, y: s.y, width: s.width, height: s.height };
    b('__activeStagePosition', d), J(d);
  }
  function pe(e) {
    const s = (function ue(e) {
      const s = window.innerWidth,
        d = window.innerHeight,
        c = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      c.classList.add('driver-overlay', 'driver-overlay-animated'),
        c.setAttribute('viewBox', `0 0 ${s} ${d}`),
        c.setAttribute('xmlSpace', 'preserve'),
        c.setAttribute('xmlnsXlink', 'http://www.w3.org/1999/xlink'),
        c.setAttribute('version', '1.1'),
        c.setAttribute('preserveAspectRatio', 'xMinYMin slice'),
        (c.style.fillRule = 'evenodd'),
        (c.style.clipRule = 'evenodd'),
        (c.style.strokeLinejoin = 'round'),
        (c.style.strokeMiterlimit = '2'),
        (c.style.zIndex = '10000'),
        (c.style.position = 'fixed'),
        (c.style.top = '0'),
        (c.style.left = '0'),
        (c.style.width = '100%'),
        (c.style.height = '100%');
      const u = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      return (
        u.setAttribute('d', U(e)),
        (u.style.fill = a('overlayColor') || 'rgb(0,0,0)'),
        (u.style.opacity = `${a('overlayOpacity')}`),
        (u.style.pointerEvents = 'auto'),
        (u.style.cursor = 'auto'),
        c.appendChild(u),
        c
      );
    })(e);
    document.body.appendChild(s),
      te(s, (e) => {
        'path' === e.target.tagName && L('overlayClick');
      }),
      b('__overlaySvg', s);
  }
  function J(e) {
    const s = l('__overlaySvg');
    if (!s) return void pe(e);
    const d = s.firstElementChild;
    if ('path' !== (null == d ? void 0 : d.tagName))
      throw new Error('no path element found in stage svg');
    d.setAttribute('d', U(e));
  }
  function U(e) {
    const s = window.innerWidth,
      d = window.innerHeight,
      c = a('stagePadding') || 0,
      u = a('stageRadius') || 0,
      m = e.width + 2 * c,
      h = e.height + 2 * c,
      g = Math.min(u, m / 2, h / 2),
      y = Math.floor(Math.max(g, 0)),
      E = m - 2 * y,
      x = h - 2 * y;
    return `M${s},0L0,0L0,${d}L${s},${d}L${s},0Z\n    M${e.x - c + y},${
      e.y - c
    } h${E} a${y},${y} 0 0 1 ${y},${y} v${x} a${y},${y} 0 0 1 -${y},${y} h-${E} a${y},${y} 0 0 1 -${y},-${y} v-${x} a${y},${y} 0 0 1 ${y},-${y} z`;
  }
  function K(e) {
    const { element: s } = e;
    let d = 'string' == typeof s ? document.querySelector(s) : s;
    d ||
      (d = (function fe() {
        const e = document.getElementById('driver-dummy-element');
        if (e) return e;
        let s = document.createElement('div');
        return (
          (s.id = 'driver-dummy-element'),
          (s.style.width = '0'),
          (s.style.height = '0'),
          (s.style.pointerEvents = 'none'),
          (s.style.opacity = '0'),
          (s.style.position = 'fixed'),
          (s.style.top = '50%'),
          (s.style.left = '50%'),
          document.body.appendChild(s),
          s
        );
      })()),
      (function ge(e, s) {
        const d = Date.now(),
          c = l('__activeStep'),
          u = l('__activeElement') || e,
          m = !u || u === e,
          h = 'driver-dummy-element' === e.id,
          g = 'driver-dummy-element' === u.id,
          y = a('animate'),
          E = s.onHighlightStarted || a('onHighlightStarted'),
          x = (null == s ? void 0 : s.onHighlighted) || a('onHighlighted'),
          _ = (null == c ? void 0 : c.onDeselected) || a('onDeselected'),
          C = a(),
          T = l();
        !m && _ && _(g ? void 0 : u, c, { config: C, state: T }),
          E && E(h ? void 0 : e, s, { config: C, state: T });
        const k = !m && y;
        let S = !1;
        (function xe() {
          const e = l('popover');
          e && (e.wrapper.style.display = 'none');
        })(),
          b('previousStep', c),
          b('previousElement', u),
          b('activeStep', s),
          b('activeElement', e);
        const P = () => {
          if (l('__transitionCallback') !== P) return;
          const m = Date.now() - d,
            g = 400 - m <= 200;
          s.popover && g && !S && k && (X(e, s), (S = !0)),
            a('animate') && m < 400
              ? (function le(e, s, d, c) {
                  let u = l('__activeStagePosition');
                  const m = u || d.getBoundingClientRect(),
                    h = c.getBoundingClientRect();
                  (u = {
                    x: W(e, m.x, h.x - m.x, s),
                    y: W(e, m.y, h.y - m.y, s),
                    width: W(e, m.width, h.width - m.width, s),
                    height: W(e, m.height, h.height - m.height, s),
                  }),
                    J(u),
                    b('__activeStagePosition', u);
                })(m, 400, u, e)
              : (G(e),
                x && x(h ? void 0 : e, s, { config: a(), state: l() }),
                b('__transitionCallback', void 0),
                b('__previousStep', c),
                b('__previousElement', u),
                b('__activeStep', s),
                b('__activeElement', e)),
            window.requestAnimationFrame(P);
        };
        b('__transitionCallback', P),
          window.requestAnimationFrame(P),
          Z(e),
          !k && s.popover && X(e, s),
          u.classList.remove('driver-active-element', 'driver-no-interaction'),
          u.removeAttribute('aria-haspopup'),
          u.removeAttribute('aria-expanded'),
          u.removeAttribute('aria-controls'),
          a('disableActiveInteraction') && e.classList.add('driver-no-interaction'),
          e.classList.add('driver-active-element'),
          e.setAttribute('aria-haspopup', 'dialog'),
          e.setAttribute('aria-expanded', 'true'),
          e.setAttribute('aria-controls', 'driver-popover-content');
      })(d, e);
  }
  function he() {
    const e = l('__activeElement'),
      s = l('__activeStep');
    e &&
      (G(e),
      (function de() {
        const e = l('__activeStagePosition'),
          s = l('__overlaySvg');
        if (!e) return;
        if (!s) return void console.warn('No stage svg found.');
        const d = window.innerWidth,
          c = window.innerHeight;
        s.setAttribute('viewBox', `0 0 ${d} ${c}`);
      })(),
      ie(e, s));
  }
  function I() {
    const e = l('__resizeTimeout');
    e && window.cancelAnimationFrame(e), b('__resizeTimeout', window.requestAnimationFrame(he));
  }
  function me(e) {
    var s;
    if (!l('isInitialized') || ('Tab' !== e.key && 9 !== e.keyCode)) return;
    const d = l('__activeElement'),
      c = null == (s = l('popover')) ? void 0 : s.wrapper,
      u = Q([...(c ? [c] : []), ...(d ? [d] : [])]),
      m = u[0],
      h = u[u.length - 1];
    if ((e.preventDefault(), e.shiftKey)) {
      const e = u[u.indexOf(document.activeElement) - 1] || h;
      null == e || e.focus();
    } else {
      const e = u[u.indexOf(document.activeElement) + 1] || m;
      null == e || e.focus();
    }
  }
  function ee(e) {
    var s;
    (null == (s = a('allowKeyboardControl')) || s) &&
      ('Escape' === e.key
        ? L('escapePress')
        : 'ArrowRight' === e.key
        ? L('arrowRightPress')
        : 'ArrowLeft' === e.key && L('arrowLeftPress'));
  }
  function te(e, s, d) {
    const i = (s, c) => {
      const u = s.target;
      e.contains(u) &&
        ((!d || d(u)) && (s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation()),
        null == c || c(s));
    };
    document.addEventListener('pointerdown', i, !0),
      document.addEventListener('mousedown', i, !0),
      document.addEventListener('pointerup', i, !0),
      document.addEventListener('mouseup', i, !0),
      document.addEventListener(
        'click',
        (e) => {
          i(e, s);
        },
        !0,
      );
  }
  function X(e, s) {
    var d, c;
    let u = l('popover');
    u && document.body.removeChild(u.wrapper),
      (u = (function Pe() {
        const e = document.createElement('div');
        e.classList.add('driver-popover');
        const s = document.createElement('div');
        s.classList.add('driver-popover-arrow');
        const d = document.createElement('header');
        (d.id = 'driver-popover-title'),
          d.classList.add('driver-popover-title'),
          (d.style.display = 'none'),
          (d.innerText = 'Popover Title');
        const c = document.createElement('div');
        (c.id = 'driver-popover-description'),
          c.classList.add('driver-popover-description'),
          (c.style.display = 'none'),
          (c.innerText = 'Popover description is here');
        const u = document.createElement('button');
        (u.type = 'button'),
          u.classList.add('driver-popover-close-btn'),
          u.setAttribute('aria-label', 'Close'),
          (u.innerHTML = '&times;');
        const m = document.createElement('footer');
        m.classList.add('driver-popover-footer');
        const h = document.createElement('span');
        h.classList.add('driver-popover-progress-text'), (h.innerText = '');
        const g = document.createElement('span');
        g.classList.add('driver-popover-navigation-btns');
        const y = document.createElement('button');
        (y.type = 'button'),
          y.classList.add('driver-popover-prev-btn'),
          (y.innerHTML = '&larr; Previous');
        const E = document.createElement('button');
        return (
          (E.type = 'button'),
          E.classList.add('driver-popover-next-btn'),
          (E.innerHTML = 'Next &rarr;'),
          g.appendChild(y),
          g.appendChild(E),
          m.appendChild(h),
          m.appendChild(g),
          e.appendChild(u),
          e.appendChild(s),
          e.appendChild(d),
          e.appendChild(c),
          e.appendChild(m),
          {
            wrapper: e,
            arrow: s,
            title: d,
            description: c,
            footer: m,
            previousButton: y,
            nextButton: E,
            closeButton: u,
            footerButtons: g,
            progress: h,
          }
        );
      })()),
      document.body.appendChild(u.wrapper);
    const {
      title: m,
      description: h,
      showButtons: g,
      disableButtons: y,
      showProgress: E,
      nextBtnText: x = a('nextBtnText') || 'Next &rarr;',
      prevBtnText: _ = a('prevBtnText') || '&larr; Previous',
      progressText: C = a('progressText') || '{current} of {total}',
    } = s.popover || {};
    (u.nextButton.innerHTML = x),
      (u.previousButton.innerHTML = _),
      (u.progress.innerHTML = C),
      m
        ? ((u.title.innerHTML = m), (u.title.style.display = 'block'))
        : (u.title.style.display = 'none'),
      h
        ? ((u.description.innerHTML = h), (u.description.style.display = 'block'))
        : (u.description.style.display = 'none');
    const T = g || a('showButtons'),
      k = E || a('showProgress') || !1,
      S =
        (null == T ? void 0 : T.includes('next')) ||
        (null == T ? void 0 : T.includes('previous')) ||
        k;
    (u.closeButton.style.display = T.includes('close') ? 'block' : 'none'),
      S
        ? ((u.footer.style.display = 'flex'),
          (u.progress.style.display = k ? 'block' : 'none'),
          (u.nextButton.style.display = T.includes('next') ? 'block' : 'none'),
          (u.previousButton.style.display = T.includes('previous') ? 'block' : 'none'))
        : (u.footer.style.display = 'none');
    const $ = y || a('disableButtons') || [];
    null != $ &&
      $.includes('next') &&
      ((u.nextButton.disabled = !0), u.nextButton.classList.add('driver-popover-btn-disabled')),
      null != $ &&
        $.includes('previous') &&
        ((u.previousButton.disabled = !0),
        u.previousButton.classList.add('driver-popover-btn-disabled')),
      null != $ &&
        $.includes('close') &&
        ((u.closeButton.disabled = !0), u.closeButton.classList.add('driver-popover-btn-disabled'));
    const A = u.wrapper;
    (A.style.display = 'block'),
      (A.style.left = ''),
      (A.style.top = ''),
      (A.style.bottom = ''),
      (A.style.right = ''),
      (A.id = 'driver-popover-content'),
      A.setAttribute('role', 'dialog'),
      A.setAttribute('aria-labelledby', 'driver-popover-title'),
      A.setAttribute('aria-describedby', 'driver-popover-description');
    u.arrow.className = 'driver-popover-arrow';
    const H = (null == (d = s.popover) ? void 0 : d.popoverClass) || a('popoverClass') || '';
    (A.className = `driver-popover ${H}`.trim()),
      te(
        u.wrapper,
        (d) => {
          var c, u, m;
          const h = d.target,
            g = (null == (c = s.popover) ? void 0 : c.onNextClick) || a('onNextClick'),
            y = (null == (u = s.popover) ? void 0 : u.onPrevClick) || a('onPrevClick'),
            E = (null == (m = s.popover) ? void 0 : m.onCloseClick) || a('onCloseClick');
          return h.classList.contains('driver-popover-next-btn')
            ? g
              ? g(e, s, { config: a(), state: l() })
              : L('nextClick')
            : h.classList.contains('driver-popover-prev-btn')
            ? y
              ? y(e, s, { config: a(), state: l() })
              : L('prevClick')
            : h.classList.contains('driver-popover-close-btn')
            ? E
              ? E(e, s, { config: a(), state: l() })
              : L('closeClick')
            : void 0;
        },
        (e) =>
          !(null != u && u.description.contains(e)) &&
          !(null != u && u.title.contains(e)) &&
          'string' == typeof e.className &&
          e.className.includes('driver-popover'),
      ),
      b('popover', u);
    const R = (null == (c = s.popover) ? void 0 : c.onPopoverRender) || a('onPopoverRender');
    R && R(u, { config: a(), state: l() }), ie(e, s), Z(A);
    const M = Q([A, ...(e.classList.contains('driver-dummy-element') ? [] : [e])]);
    M.length > 0 && M[0].focus();
  }
  function oe() {
    const e = l('popover');
    if (null == e || !e.wrapper) return;
    const s = e.wrapper.getBoundingClientRect(),
      d = a('stagePadding') || 0,
      c = a('popoverOffset') || 0;
    return {
      width: s.width + d + c,
      height: s.height + d + c,
      realWidth: s.width,
      realHeight: s.height,
    };
  }
  function Y(e, s) {
    const {
      elementDimensions: d,
      popoverDimensions: c,
      popoverPadding: u,
      popoverArrowDimensions: m,
    } = s;
    return 'start' === e
      ? Math.max(Math.min(d.top - u, window.innerHeight - c.realHeight - m.width), m.width)
      : 'end' === e
      ? Math.max(
          Math.min(
            d.top - (null == c ? void 0 : c.realHeight) + d.height + u,
            window.innerHeight - (null == c ? void 0 : c.realHeight) - m.width,
          ),
          m.width,
        )
      : 'center' === e
      ? Math.max(
          Math.min(
            d.top + d.height / 2 - (null == c ? void 0 : c.realHeight) / 2,
            window.innerHeight - (null == c ? void 0 : c.realHeight) - m.width,
          ),
          m.width,
        )
      : 0;
  }
  function j(e, s) {
    const {
      elementDimensions: d,
      popoverDimensions: c,
      popoverPadding: u,
      popoverArrowDimensions: m,
    } = s;
    return 'start' === e
      ? Math.max(Math.min(d.left - u, window.innerWidth - c.realWidth - m.width), m.width)
      : 'end' === e
      ? Math.max(
          Math.min(
            d.left - (null == c ? void 0 : c.realWidth) + d.width + u,
            window.innerWidth - (null == c ? void 0 : c.realWidth) - m.width,
          ),
          m.width,
        )
      : 'center' === e
      ? Math.max(
          Math.min(
            d.left + d.width / 2 - (null == c ? void 0 : c.realWidth) / 2,
            window.innerWidth - (null == c ? void 0 : c.realWidth) - m.width,
          ),
          m.width,
        )
      : 0;
  }
  function ie(e, s) {
    const d = l('popover');
    if (!d) return;
    const { align: c = 'start', side: u = 'left' } = (null == s ? void 0 : s.popover) || {},
      m = c,
      h = 'driver-dummy-element' === e.id ? 'over' : u,
      g = a('stagePadding') || 0,
      y = oe(),
      E = d.arrow.getBoundingClientRect(),
      x = e.getBoundingClientRect(),
      _ = x.top - y.height;
    let C = _ >= 0;
    const T = window.innerHeight - (x.bottom + y.height);
    let k = T >= 0;
    const S = x.left - y.width;
    let $ = S >= 0;
    const A = window.innerWidth - (x.right + y.width);
    let H = A >= 0;
    const R = !(C || k || $ || H);
    let M = h;
    if (
      ('top' === h && C
        ? (H = $ = k = !1)
        : 'bottom' === h && k
        ? (H = $ = C = !1)
        : 'left' === h && $
        ? (H = C = k = !1)
        : 'right' === h && H && ($ = C = k = !1),
      'over' === h)
    ) {
      const e = window.innerWidth / 2 - y.realWidth / 2,
        s = window.innerHeight / 2 - y.realHeight / 2;
      (d.wrapper.style.left = `${e}px`),
        (d.wrapper.style.right = 'auto'),
        (d.wrapper.style.top = `${s}px`),
        (d.wrapper.style.bottom = 'auto');
    } else if (R) {
      const e = window.innerWidth / 2 - (null == y ? void 0 : y.realWidth) / 2,
        s = 10;
      (d.wrapper.style.left = `${e}px`),
        (d.wrapper.style.right = 'auto'),
        (d.wrapper.style.bottom = `${s}px`),
        (d.wrapper.style.top = 'auto');
    } else if ($) {
      const e = Math.min(S, window.innerWidth - (null == y ? void 0 : y.realWidth) - E.width),
        s = Y(m, {
          elementDimensions: x,
          popoverDimensions: y,
          popoverPadding: g,
          popoverArrowDimensions: E,
        });
      (d.wrapper.style.left = `${e}px`),
        (d.wrapper.style.top = `${s}px`),
        (d.wrapper.style.bottom = 'auto'),
        (d.wrapper.style.right = 'auto'),
        (M = 'left');
    } else if (H) {
      const e = Math.min(A, window.innerWidth - (null == y ? void 0 : y.realWidth) - E.width),
        s = Y(m, {
          elementDimensions: x,
          popoverDimensions: y,
          popoverPadding: g,
          popoverArrowDimensions: E,
        });
      (d.wrapper.style.right = `${e}px`),
        (d.wrapper.style.top = `${s}px`),
        (d.wrapper.style.bottom = 'auto'),
        (d.wrapper.style.left = 'auto'),
        (M = 'right');
    } else if (C) {
      const e = Math.min(_, window.innerHeight - y.realHeight - E.width);
      let s = j(m, {
        elementDimensions: x,
        popoverDimensions: y,
        popoverPadding: g,
        popoverArrowDimensions: E,
      });
      (d.wrapper.style.top = `${e}px`),
        (d.wrapper.style.left = `${s}px`),
        (d.wrapper.style.bottom = 'auto'),
        (d.wrapper.style.right = 'auto'),
        (M = 'top');
    } else if (k) {
      const e = Math.min(T, window.innerHeight - (null == y ? void 0 : y.realHeight) - E.width);
      let s = j(m, {
        elementDimensions: x,
        popoverDimensions: y,
        popoverPadding: g,
        popoverArrowDimensions: E,
      });
      (d.wrapper.style.left = `${s}px`),
        (d.wrapper.style.bottom = `${e}px`),
        (d.wrapper.style.top = 'auto'),
        (d.wrapper.style.right = 'auto'),
        (M = 'bottom');
    }
    R
      ? d.arrow.classList.add('driver-popover-arrow-none')
      : (function Ce(e, s, d) {
          const c = l('popover');
          if (!c) return;
          const u = d.getBoundingClientRect(),
            m = oe(),
            h = c.arrow,
            g = m.width,
            y = window.innerWidth,
            E = u.width,
            x = u.left,
            _ = m.height,
            C = window.innerHeight,
            T = u.top,
            k = u.height;
          h.className = 'driver-popover-arrow';
          let S = s,
            $ = e;
          'top' === s
            ? (x + E <= 0
                ? ((S = 'right'), ($ = 'end'))
                : x + E - g <= 0 && ((S = 'top'), ($ = 'start')),
              x >= y ? ((S = 'left'), ($ = 'end')) : x + g >= y && ((S = 'top'), ($ = 'end')))
            : 'bottom' === s
            ? (x + E <= 0
                ? ((S = 'right'), ($ = 'start'))
                : x + E - g <= 0 && ((S = 'bottom'), ($ = 'start')),
              x >= y ? ((S = 'left'), ($ = 'start')) : x + g >= y && ((S = 'bottom'), ($ = 'end')))
            : 'left' === s
            ? (T + k <= 0
                ? ((S = 'bottom'), ($ = 'end'))
                : T + k - _ <= 0 && ((S = 'left'), ($ = 'start')),
              T >= C ? ((S = 'top'), ($ = 'end')) : T + _ >= C && ((S = 'left'), ($ = 'end')))
            : 'right' === s &&
              (T + k <= 0
                ? ((S = 'bottom'), ($ = 'start'))
                : T + k - _ <= 0 && ((S = 'right'), ($ = 'start')),
              T >= C ? ((S = 'top'), ($ = 'start')) : T + _ >= C && ((S = 'right'), ($ = 'end'))),
            S
              ? (h.classList.add(`driver-popover-arrow-side-${S}`),
                h.classList.add(`driver-popover-arrow-align-${$}`))
              : h.classList.add('driver-popover-arrow-none');
        })(m, M, e);
  }
  function ke(e = {}) {
    function o() {
      a('allowClose') && v();
    }
    function t() {
      const e = l('activeIndex'),
        s = a('steps') || [];
      if (void 0 === e) return;
      const d = e + 1;
      s[d] ? r(d) : v();
    }
    function i() {
      const e = l('activeIndex'),
        s = a('steps') || [];
      if (void 0 === e) return;
      const d = e - 1;
      s[d] ? r(d) : v();
    }
    function n() {
      var e;
      if (l('__transitionCallback')) return;
      const s = l('activeIndex'),
        d = l('__activeStep'),
        c = l('__activeElement');
      if (void 0 === s || void 0 === d || void 0 === l('activeIndex')) return;
      const u = (null == (e = d.popover) ? void 0 : e.onPrevClick) || a('onPrevClick');
      if (u) return u(c, d, { config: a(), state: l() });
      i();
    }
    function f() {
      var e;
      if (l('__transitionCallback')) return;
      const s = l('activeIndex'),
        d = l('__activeStep'),
        c = l('__activeElement');
      if (void 0 === s || void 0 === d) return;
      const u = (null == (e = d.popover) ? void 0 : e.onNextClick) || a('onNextClick');
      if (u) return u(c, d, { config: a(), state: l() });
      t();
    }
    function w() {
      l('isInitialized') ||
        (b('isInitialized', !0),
        document.body.classList.add(
          'driver-active',
          a('animate') ? 'driver-fade' : 'driver-simple',
        ),
        (function ye() {
          window.addEventListener('keyup', ee, !1),
            window.addEventListener('keydown', me, !1),
            window.addEventListener('resize', I),
            window.addEventListener('scroll', I);
        })(),
        N('overlayClick', o),
        N('escapePress', o),
        N('arrowLeftPress', n),
        N('arrowRightPress', f));
    }
    function r(e = 0) {
      var s, d, c, u, m, h, g, y;
      const E = a('steps');
      if (!E) return console.error('No steps to drive through'), void v();
      if (!E[e]) return void v();
      b('__activeOnDestroyed', document.activeElement), b('activeIndex', e);
      const x = E[e],
        _ = E[e + 1],
        C = E[e - 1],
        T = (null == (s = x.popover) ? void 0 : s.doneBtnText) || a('doneBtnText') || 'Done',
        k = a('allowClose'),
        S =
          void 0 !== (null == (d = x.popover) ? void 0 : d.showProgress)
            ? null == (c = x.popover)
              ? void 0
              : c.showProgress
            : a('showProgress'),
        $ = (
          (null == (u = x.popover) ? void 0 : u.progressText) ||
          a('progressText') ||
          '{{current}} of {{total}}'
        )
          .replace('{{current}}', `${e + 1}`)
          .replace('{{total}}', `${E.length}`),
        A = (null == (m = x.popover) ? void 0 : m.showButtons) || a('showButtons'),
        H = ['next', 'previous', ...(k ? ['close'] : [])].filter(
          (e) => !(null != A && A.length) || A.includes(e),
        ),
        R = (null == (h = x.popover) ? void 0 : h.onNextClick) || a('onNextClick'),
        M = (null == (g = x.popover) ? void 0 : g.onPrevClick) || a('onPrevClick'),
        B = (null == (y = x.popover) ? void 0 : y.onCloseClick) || a('onCloseClick');
      K({
        ...x,
        popover: {
          showButtons: H,
          nextBtnText: _ ? void 0 : T,
          disableButtons: [...(C ? [] : ['previous'])],
          showProgress: S,
          progressText: $,
          onNextClick:
            R ||
            (() => {
              _ ? r(e + 1) : v();
            }),
          onPrevClick:
            M ||
            (() => {
              r(e - 1);
            }),
          onCloseClick:
            B ||
            (() => {
              v();
            }),
          ...((null == x ? void 0 : x.popover) || {}),
        },
      });
    }
    function v(e = !0) {
      const s = l('__activeElement'),
        d = l('__activeStep'),
        c = l('__activeOnDestroyed'),
        u = a('onDestroyStarted');
      if (e && u) {
        return void u(
          !s || 'driver-dummy-element' === (null == s ? void 0 : s.id) ? void 0 : s,
          d,
          { config: a(), state: l() },
        );
      }
      const m = (null == d ? void 0 : d.onDeselected) || a('onDeselected'),
        h = a('onDestroyed');
      if (
        (document.body.classList.remove('driver-active', 'driver-fade', 'driver-simple'),
        (function be() {
          window.removeEventListener('keyup', ee),
            window.removeEventListener('resize', I),
            window.removeEventListener('scroll', I);
        })(),
        (function Se() {
          var e;
          const s = l('popover');
          s && (null == (e = s.wrapper.parentElement) || e.removeChild(s.wrapper));
        })(),
        (function we() {
          var e;
          null == (e = document.getElementById('driver-dummy-element')) || e.remove(),
            document.querySelectorAll('.driver-active-element').forEach((e) => {
              e.classList.remove('driver-active-element', 'driver-no-interaction'),
                e.removeAttribute('aria-haspopup'),
                e.removeAttribute('aria-expanded'),
                e.removeAttribute('aria-controls');
            });
        })(),
        (function ve() {
          const e = l('__overlaySvg');
          e && e.remove();
        })(),
        (function ce() {
          S = {};
        })(),
        V(),
        s && d)
      ) {
        const e = 'driver-dummy-element' === s.id;
        m && m(e ? void 0 : s, d, { config: a(), state: l() }),
          h && h(e ? void 0 : s, d, { config: a(), state: l() });
      }
      c && c.focus();
    }
    return (
      D(e),
      {
        isActive: () => l('isInitialized') || !1,
        refresh: I,
        drive: (e = 0) => {
          w(), r(e);
        },
        setConfig: D,
        setSteps: (e) => {
          V(), D({ ...a(), steps: e });
        },
        getConfig: a,
        getState: l,
        getActiveIndex: () => l('activeIndex'),
        isFirstStep: () => 0 === l('activeIndex'),
        isLastStep: () => {
          const e = a('steps') || [],
            s = l('activeIndex');
          return void 0 !== s && s === e.length - 1;
        },
        getActiveStep: () => l('activeStep'),
        getActiveElement: () => l('activeElement'),
        getPreviousElement: () => l('previousElement'),
        getPreviousStep: () => l('previousStep'),
        moveNext: t,
        movePrevious: i,
        moveTo: function p(e) {
          (a('steps') || [])[e] ? r(e) : v();
        },
        hasNextStep: () => {
          const e = a('steps') || [],
            s = l('activeIndex');
          return void 0 !== s && e[s + 1];
        },
        hasPreviousStep: () => {
          const e = a('steps') || [],
            s = l('activeIndex');
          return void 0 !== s && e[s - 1];
        },
        highlight: (e) => {
          w(),
            K({
              ...e,
              popover: e.popover
                ? { showButtons: [], showProgress: !1, progressText: '', ...e.popover }
                : void 0,
            });
        },
        destroy: () => {
          v(!1);
        },
      }
    );
  }
  class UiUtils {
    static checkIsInViewport(e) {
      return new Promise((s) => {
        new IntersectionObserver((e, d) => {
          e.forEach((e) => {
            s(e.isIntersecting), d.unobserve(e.target);
          });
        }).observe(e);
      });
    }
    static setStyle(e, s, d) {
      e.style[s] = d;
    }
    static getElementIndex(e) {
      var s;
      if (!e) return;
      const d = Array.from(
        (null === (s = e.parentElement) || void 0 === s ? void 0 : s.children) || [],
      ).filter((s) => s.tagName === e.tagName);
      return 1 === d.length ? -1 : [].indexOf.call(d, e) + 1;
    }
    static getDomHierarchy(e) {
      const s = [],
        d = this.getElementIndex(e);
      for (
        s.push(e.tagName + this.indexElementStr(d));
        'HTML' !== (null == e ? void 0 : e.parentNode).tagName;

      ) {
        const d = this.getElementIndex(null == e ? void 0 : e.parentNode);
        s.push((null == e ? void 0 : e.parentNode).tagName + this.indexElementStr(d)),
          (e = null == e ? void 0 : e.parentNode);
      }
      return s
        .map((e) => e.toLowerCase())
        .reverse()
        .join(' > ');
    }
  }
  !(function _define_property(e, s, d) {
    return (
      s in e
        ? Object.defineProperty(e, s, { value: d, enumerable: !0, configurable: !0, writable: !0 })
        : (e[s] = d),
      e
    );
  })(UiUtils, 'indexElementStr', function () {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
    return -1 === e ? '' : `:nth-of-type(${e})`;
  });
  const modalTemplate = function (e) {
      let s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      const { title: d, description: c } = e,
        { allowClose: u } = s;
      return `\n  <div class="introduction-container">\n  <div class="introduction-content">\n  ${
        u
          ? "\n  <button class=\"introduction-skip-button\" onClick=\"window.onCloseVideoPopup()\">\n  <svg\n  width='20'\n  height='20'\n  viewBox='0 0 12 12'\n  fill='none'\n  xmlns='http://www.w3.org/2000/svg'\n  >\n  <path\n  d='M6 4.82178L10.125 0.696777L11.3033 1.87511L7.17834 6.00011L11.3033 10.1251L10.125 11.3034L6 7.17844L1.875 11.3034L0.696671 10.1251L4.82167 6.00011L0.696671 1.87511L1.875 0.696777L6 4.82178Z'\n  fill='#232525'\n  />\n  </svg>\n  </button>\n  "
          : '\n  <button class="introduction-skip-button" onClick = "window.onClickSkip()" >\n  Skip\n  <div class="introduction-arrow-icon" >\n  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M14.4291 18.8191C14.2391 18.8191 14.0491 18.7491 13.8991 18.5991C13.6091 18.3091 13.6091 17.8291 13.8991 17.5391L19.4391 11.9991L13.8991 6.45914C13.6091 6.16914 13.6091 5.68914 13.8991 5.39914C14.1891 5.10914 14.6691 5.10914 14.9591 5.39914L21.0291 11.4691C21.3191 11.7591 21.3191 12.2391 21.0291 12.5291L14.9591 18.5991C14.8091 18.7491 14.6191 18.8191 14.4291 18.8191Z" fill="#1E2328" />\n  <path d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z" fill="#1E2328" />\n  </svg>\n  </div>\n  </button > '
      }\n  <div class="introduction-acciona-logo">\n    <svg width="30" height="30">\n      <path d="M0,14.52H11.67v11.41l11.67-11.41V3.11H11.67L0,14.52Z" fill="#1E766E" fill-rule="evenodd"></path>\n    </svg>\n    walkthrough\n  </div>\n  <div class="introduction-line"></div>\n  ${
        d ? `\n  <div class="introduction-title">${d}</div>\n  ` : ''
      }\n${renderDescription(c)}\n  </div>\n  </div>`;
    },
    renderDescription = (e) => {
      let s = '';
      return (
        e.forEach((e) => {
          switch (e.type) {
            case 'description':
              s += `<div class="introduction-subtitle">${e.value}</div>`;
              break;
            case 'image':
              s += e.value
                ? `<div className="driver-popover-description-item description-image">\n          <img src="${e.value}" alt="${e.alt}" />\n        </div>`
                : '';
              break;
            case 'media':
              s += e.value
                ? `  <div class="introduction-video-container">\n          <iframe src="${e.value}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen />\n          </div>`
                : '';
          }
        }),
        s
      );
    };
  class ExecutionFrequency {
    static throttle(e) {
      let s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
        d = 0;
      return function () {
        for (var c = arguments.length, u = new Array(c), m = 0; m < c; m++) u[m] = arguments[m];
        const h = Date.now();
        h - d >= s && (e(...u), (d = h));
      };
    }
  }
  const $ = { pointerEvents: 'auto', zIndex: '0', position: 'unset' };
  let A = {
    id: 'highlight-box',
    boundingRect: { top: -99999, left: -99999, width: 0, height: 0 },
    target: null,
  };
  const resetScrollTopOfScrollableElement = (e) => {
      if (e) {
        const s = e.split('>'),
          d = s.length;
        let c = 0,
          u = null;
        for (let e = 1; e < d - 1; e++) {
          const d = document.querySelector(s.slice(0, e).join('>'));
          d && c < d.scrollHeight && ((c = d.scrollHeight), (u = d));
        }
        u && (u.scrollTop = 0);
      }
    },
    preventDefaultWhenDrivenActionIsHighlighted = async (e, s) => {
      const d = e.getConfig().steps || [],
        c = d.findIndex((e) => e.id === s.id),
        u = c < d.length - 1 ? d[c + 1] : null;
      u &&
        (await new Promise((e) => {
          const s = setInterval(() => {
            const d = document.querySelector(
              '.driver-popover-navigation-btns .driver-popover-next-btn',
            );
            d && (d.classList.add('driver-popover-next-btn-disabled'), clearInterval(s), e());
          }, 300);
        })),
        'click' === s.popover.action
          ? ((e, s, d) => {
              if (!e.element) return;
              const c = document.querySelector(e.element);
              c &&
                c.addEventListener('mousedown', function moveNextWhenActionIsTriggered() {
                  if (s.element) {
                    let e = 0;
                    const c = setInterval(() => {
                      const u = document.querySelector(s.element);
                      (e += 1),
                        e > 10 && (clearInterval(c), d.moveNext()),
                        u && (clearInterval(c), d.moveTo(s.index));
                    }, 200);
                  } else d.moveNext();
                  c.removeEventListener('mousedown', moveNextWhenActionIsTriggered);
                });
            })(s, { ...u, index: c + 1 }, e)
          : ((e, s) => {
              if (!e.element) return;
              const d = document.querySelector(e.element);
              if (!d) return;
              let c = null;
              d.addEventListener('keydown', function moveNextWhenActionIsTriggered() {
                c && clearTimeout(c),
                  (c = setTimeout(() => {
                    s.moveNext(), d.removeEventListener('keydown', moveNextWhenActionIsTriggered);
                  }, 700));
              });
            })(s, e);
    },
    preventActionIfElementIsTooltip = (e, s) => {
      e &&
        s.popover.stepType === m.tooltip &&
        (($.pointerEvents = e.style.pointerEvents), (e.style.pointerEvents = 'none'));
    },
    releaseActionWhenTooltipDeselected = (e, s) => {
      e && s.popover.stepType === m.tooltip && (e.style.pointerEvents = $.pointerEvents);
    },
    removeBlurOverlayWhenHighlight = () => {
      const e = document.getElementById('driverjs-blur-overlay');
      e && e.remove();
    },
    returnOldZIndexAfterHighlighting = (e) => {
      e && ((e.style.zIndex = String($.zIndex)), (e.style.position = $.position));
    };
  const createBlurOverlayWhenHighlight = (e) => {
      let s = document.createElement('div');
      (s.id = 'driverjs-blur-overlay'),
        (s.style.position = 'fixed'),
        (s.style.top = '0'),
        (s.style.left = '0'),
        (s.style.width = '100vw'),
        (s.style.height = '100vh'),
        (s.style.zIndex = '9000'),
        (s.style.backdropFilter = 'blur(2px)'),
        document.body.appendChild(s),
        e &&
        (function ifParentElementHasZIndex(e) {
          if (!e) return !1;
          let s = e.parentElement;
          for (; s && s !== document.body; ) {
            if (window.getComputedStyle(s).getPropertyValue('z-index')) return !0;
            s = s.parentElement;
          }
          return !1;
        })(e)
          ? e.parentElement.appendChild(s)
          : document.body.appendChild(s);
    },
    scrollIfElementIsNotInViewport = async (e, s) => {
      if (!e) return;
      if (!(await UiUtils.checkIsInViewport(e))) {
        e.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const d = setInterval(async () => {
          (await UiUtils.checkIsInViewport(e)) && (clearInterval(d), s.refresh());
        }, 200);
      }
    };
  (window.openVideoPopup = (e) => {
    const s = z ? H : R,
      d = s.getConfig(),
      c = s.getActiveIndex(),
      u = {
        element: void 0,
        popover: {
          popoverClass: 'introduction-linked-site',
          description: modalTemplate(
            { description: [{ type: 'media', value: e }] },
            { allowClose: !0 },
          ),
        },
      };
    s.destroy();
    let m = ke(M);
    window.addEventListener('close-video-popup', function closeVideoPopup() {
      s.setConfig(d),
        s.drive(c),
        (m = null),
        window.removeEventListener('close-video-popup', closeVideoPopup);
    }),
      m.highlight({ ...u });
  }),
    (window.onCloseVideoPopup = () => {
      window.dispatchEvent(new CustomEvent(d.CLOSE_VIDEO_POPUP));
    }),
    (window.onDestroyClick = () => {
      R.destroy();
    }),
    (window.onClickSkip = () => {
      R.moveNext();
    });
  const preventContextMenu = (e) => {
      e.preventDefault();
    },
    removeElement = (e) => {
      var s = document.getElementById(e);
      s && s.remove();
    },
    highlightElementWhenHover = (e) => {
      ExecutionFrequency.throttle(() => {
        const s = e.target.getBoundingClientRect();
        if (
          ((e) => {
            let { top: s, left: d } = e;
            return s !== A.boundingRect.top || d !== A.boundingRect.left;
          })(s)
        ) {
          removeElement(A.id), (A.boundingRect = s), (A.target = e.target);
          const d = document.createElement('div');
          (d.id = A.id),
            (d.style.position = 'fixed'),
            (d.style.top = `${A.boundingRect.top}px`),
            (d.style.left = `${A.boundingRect.left}px`),
            (d.style.width = `${A.boundingRect.width}px`),
            (d.style.height = `${A.boundingRect.height}px`),
            (d.style.border = '2px solid #D00B05'),
            (d.style.background = 'rgba(30, 118, 110, 0.1)'),
            (d.style.pointerEvents = 'none'),
            (d.style.zIndex = '999999999'),
            document.body.appendChild(d);
        }
      })();
    },
    selectElementToHighlight = (e) => {
      if (2 === e.button)
        try {
          window.parent.postMessage(
            {
              type: d.SELECT_ELEMENT,
              ...((s = A.target),
              s.id
                ? {
                    element: `#${s.id}`,
                    methodToGetElement: 'id',
                    domHierarchyString: UiUtils.getDomHierarchy(s),
                  }
                : {
                    element: UiUtils.getDomHierarchy(s),
                    methodToGetElement: 'dom-hierarchy',
                    domHierarchyString: UiUtils.getDomHierarchy(s),
                  }),
            },
            '*',
          );
        } catch (e) {
          console.log('parent.postMessage error', e);
        }
      var s;
    },
    enableSelectElement = () => {
      const e = document;
      (e.body.style.cursor = 'grab'),
        e.addEventListener('mousedown', selectElementToHighlight),
        e.addEventListener('mouseover', highlightElementWhenHover),
        window.addEventListener('contextmenu', preventContextMenu);
    },
    disableSelectElement = () => {
      const e = document;
      (e.body.style.cursor = 'default'),
        removeElement(A.id),
        e.removeEventListener('mousedown', selectElementToHighlight),
        e.removeEventListener('mouseover', highlightElementWhenHover),
        window.removeEventListener('contextmenu', preventContextMenu);
    };
  let H, R;
  const M = {
      showProgress: !0,
      progressText: "<span class='bold'>{{current}}</span> of {{total}}",
      popoverClass: 'driverjs-theme',
      allowClose: !1,
      disableActiveInteraction: !1,
      nextBtnText: 'Next',
      prevBtnText: 'Previous',
      onHighlightStarted: (e, s) => {
        e &&
          (resetScrollTopOfScrollableElement(s.domHierarchyString),
          s.popover.stepType === m.drivenAction &&
            preventDefaultWhenDrivenActionIsHighlighted(R, s),
          preventActionIfElementIsTooltip(e, s),
          scrollIfElementIsNotInViewport(e, R));
      },
      onDeselected: (e, s) => {
        releaseActionWhenTooltipDeselected(e, s),
          removeBlurOverlayWhenHighlight(),
          returnOldZIndexAfterHighlighting(e);
      },
      onPopoverRender: (e, s) => {
        let { config: d, state: c } = s;
        if (!c.activeStep) return;
        var u;
        c.activeElement &&
          (createBlurOverlayWhenHighlight(c.activeElement),
          (u = c.activeElement) &&
            (($.zIndex = u.style.zIndex),
            ($.position = u.style.position),
            u.style.position || (u.style.position = 'relative'),
            (u.style.zIndex = '9999')));
        const h = c.activeStep,
          { title: g, description: y, wrapper: E } = e;
        h.stepType === m.modal &&
          (h.fontSize &&
            (UiUtils.setStyle(y, 'fontSize', `${h.fontSize}px`),
            UiUtils.setStyle(g, 'fontSize', `${h.fontSize}px`)),
          h.titleColor && UiUtils.setStyle(g, 'color', h.titleColor),
          h.descriptionColor && UiUtils.setStyle(y, 'color', h.descriptionColor),
          h.tooltipBgColor && UiUtils.setStyle(E, 'backgroundColor', h.tooltipBgColor));
      },
    },
    initDriverJs = () => {
      (H = ke(M)), (R = ke(M));
    },
    popoverDescriptionTemplate = (e) => {
      let s = '';
      return (
        e.forEach((e) => {
          switch (e.type) {
            case 'text':
              s += `<div class="driver-popover-description-item description-text">${e.value}</div>`;
              break;
            case 'image':
              s += e.value
                ? `<div class="driver-popover-description-item description-image">\n        <img src="${e.value}" alt="${e.alt}" />\n        </div>`
                : '';
              break;
            case 'link':
              s += e.value
                ? `<a href="${e.value}" target="_blank" class="driver-popover-description-item description-link">${e.linkText}</a>`
                : '';
              break;
            case 'media':
              s += e.value
                ? `<div class="driver-popover-description-item description-media" onClick="window.openVideoPopup('${e.value}')">\n        <div class="description-media-trigger">\n        <div class="play-icon">\n        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M8.96276 6.1004C9.75283 5.64424 9.75283 4.5039 8.96276 4.04774L2.29609 0.198637C1.50601 -0.257526 0.518311 0.312642 0.518311 1.22511V8.92303C0.518311 9.8355 1.50601 10.4057 2.29609 9.9495L8.96276 6.1004Z" fill="#E20714"/>\n        </svg>\n        </div>\n        </div>\n        ${e.mediaText}\n        </div>`
                : '';
          }
        }),
        s
      );
    },
    buildPopoverContent = (e) =>
      e.stepType !== m.modal
        ? {
            ...e,
            title:
              e.title +
              "\n<span class=\"popover-close-btn\">\n<svg\nwidth='12'\nheight='12'\nviewBox='0 0 12 12'\nfill='none'\nxmlns='http://www.w3.org/2000/svg'\n{...props}\nonClick = \"window.onDestroyClick()\"\n>\n<path\nd='M6 4.82178L10.125 0.696777L11.3033 1.87511L7.17834 6.00011L11.3033 10.1251L10.125 11.3034L6 7.17844L1.875 11.3034L0.696671 10.1251L4.82167 6.00011L0.696671 1.87511L1.875 0.696777L6 4.82178Z'\nfill='white'\n/>\n</svg>  \n</span>\n",
            description: popoverDescriptionTemplate(e.description),
          }
        : { ...e, popoverClass: 'introduction-linked-site', description: modalTemplate(e) },
    updateContentOfPopover = (e) =>
      e.popover.stepType !== m.modal
        ? (((e) => {
            const s = document.querySelector('.driver-popover > .driver-popover-description'),
              d = document.querySelector('.driver-popover > .driver-popover-title'),
              c = e.popover;
            d && (d.innerHTML = c.title),
              s && (s.innerHTML = popoverDescriptionTemplate(e.popover.description));
          })(e),
          void ((e) => {
            const s = e.popover,
              d = document.querySelector('.driver-popover'),
              c = document.querySelector('.driver-popover > .driver-popover-description'),
              u = document.querySelector('.driver-popover > .driver-popover-title');
            s.fontSize &&
              (c && UiUtils.setStyle(c, 'fontSize', `${s.fontSize}px`),
              u && UiUtils.setStyle(u, 'fontSize', `${s.fontSize}px`)),
              s.titleColor && u && UiUtils.setStyle(u, 'color', s.titleColor),
              s.descriptionColor && c && UiUtils.setStyle(c, 'color', s.descriptionColor),
              s.tooltipBgColor && d && UiUtils.setStyle(d, 'backgroundColor', s.tooltipBgColor);
          })(e))
        : ((e) => {
            const s = document.querySelector('.introduction-linked-site .introduction-title'),
              d = document.querySelector('.introduction-linked-site .introduction-subtitle'),
              c = document.querySelector(
                '.introduction-linked-site .introduction-video-container iframe',
              ),
              u = e.popover;
            s && (s.innerHTML = u.title),
              d && (d.innerHTML = ''),
              c.src !== u.videoUrl && (c.src = u.videoUrl);
          })(e),
    convertFromDtoToDriverJsStep = (e) => {
      const { element: s, domHierarchyString: d, methodToGetElement: c, ...u } = e;
      return {
        id: e.id || Date.now(),
        element: s,
        domHierarchyString: d,
        methodToGetElement: c,
        popover: u,
      };
    },
    highlightELement = (e) => {
      const s = convertFromDtoToDriverJsStep(e.data.step),
        { element: d, popover: c } = s;
      let u = c.stepType === m.modal || Boolean(d);
      const h = H.getActiveStep();
      return h && h.element === d
        ? updateContentOfPopover(s)
        : u
        ? H.highlight({ element: d || void 0, popover: buildPopoverContent(c) })
        : H.destroy();
    },
    buildFullTour = (e) => [
      ...e.map((e) => {
        const s = convertFromDtoToDriverJsStep(e);
        return { ...s, popover: buildPopoverContent(s.popover) };
      }),
    ],
    previewTour = (e) => {
      H.setConfig({
        ...M,
        steps: buildFullTour(e.data.steps),
        onHighlightStarted: (e, s) => {
          resetScrollTopOfScrollableElement(s.domHierarchyString),
            s.popover.stepType === m.drivenAction &&
              preventDefaultWhenDrivenActionIsHighlighted(H, s);
        },
        onHighlighted: (e, s, c) => {
          const { state: u } = c;
          window.parent.postMessage({ type: d.CURRENT_STEP_INDEX, stepIndex: u.activeIndex }, '*'),
            scrollIfElementIsNotInViewport(e, H),
            preventActionIfElementIsTooltip(e, s);
        },
        onDeselected: (e, s) => {
          window.parent.postMessage({ type: d.CURRENT_STEP_INDEX, stepIndex: -1 }, '*'),
            releaseActionWhenTooltipDeselected(e, s),
            removeBlurOverlayWhenHighlight(),
            returnOldZIndexAfterHighlighting(e);
        },
      }),
        H.drive();
    };
  let B = {},
    O = null;
  const notifyReadyForTouring = () => {
      window.parent.postMessage({ type: d.READY_FOR_TOURING }, '*'),
        window.dispatchEvent(new CustomEvent(d.READY_FOR_TOURING));
    },
    overrideWindowFetchMethod = () => {
      const { fetch: e } = window;
      setTimeout(() => {
        notifyReadyForTouring();
      }, 5e3),
        (window.fetch = async function () {
          for (var s = arguments.length, d = new Array(s), c = 0; c < s; c++) d[c] = arguments[c];
          const [u, m] = d;
          if (
            (clearTimeout(null),
            !((e) =>
              (e.origin && e.origin.includes('cognito')) ||
              e.includes('cognito') ||
              e.includes('google-analytics'))(u))
          ) {
            const s = u + JSON.stringify((null == m ? void 0 : m.body) || '');
            (B[s] = !1), O && clearTimeout(O);
            const c = await e(...d);
            return (
              ((e) => {
                (B[e] = !0),
                  Object.values(B).every(Boolean) &&
                    (O && clearTimeout(O),
                    (O = setTimeout(() => {
                      (B = {}), notifyReadyForTouring(), (O = null);
                    }, 1e3)));
              })(s),
              c
            );
          }
          return e(...d);
        });
    };
  var q = __webpack_require__('305');
  let z = !1;
  const F = 'http://localhost:5500/tours';
  async function getProperlyTourData() {
    const e = await (async function fetchTourData() {
        const e = await fetch(F);
        if (e.ok) return e.json();
      })(),
      s = window.location.pathname,
      d = window.location.hostname;
    return e.find((e) => {
      const c = (0, q.pathToRegexp)(e.pathNamePattern),
        u = 'published' === e.status;
      let m = e.url.includes(d) && window.location.href.includes(e.url) && c.regexp.test(s);
      return u && m;
    });
  }
  async function showTour() {
    try {
      const e = await getProperlyTourData();
      if (!e) return;
      e && (R.setConfig({ ...e, ...M, steps: buildFullTour(e.steps) }), R.drive());
    } catch (e) {
      console.log('showTour error: ', e);
    }
  }
  function eventHandler(e) {
    switch (e.data.type) {
      case d.START_GETTING_ELEMENT:
        enableSelectElement(), H.destroy();
        break;
      case d.END_GETTING_ELEMENT:
        disableSelectElement();
        break;
      case d.HIGHLIGHT_ELEMENT:
        highlightELement(e);
        break;
      case d.PREVIEW_TOUR:
        previewTour(e);
        break;
      case d.CLEAN_UP:
        removeBlurOverlayWhenHighlight(), H.destroy();
        break;
      case d.CREDENTIALS_FROM_EDITOR:
        !(function setCredentialsFromEditor(e) {
          Object.keys(e.localStorageCredentials).forEach((s) => {
            localStorage.setItem(s, e.localStorageCredentials[s]);
          }),
            Object.keys(e.sessionStorageCredentials).forEach((s) => {
              sessionStorage.setItem(s, e.sessionStorageCredentials[s]);
            }),
            window.location.reload();
        })(e.data.credentials);
    }
  }
  async function loadListeners(e) {
    await new Promise((s) => {
      const d = setInterval(() => {
        var c;
        (null === (c = document.getElementById(e)) || void 0 === c
          ? void 0
          : c.childElementCount) && (clearInterval(d), initDriverJs(), s());
      }, 1e3);
    }),
      overrideWindowFetchMethod(),
      (async function initTourCreatorTool() {
        window.parent.postMessage({ type: d.ON_LOADED }, '*');
        const e = await new Promise((e) => {
          window.addEventListener('message', function (s) {
            s.data.type === d.HANDSHAKE &&
              (window.parent.postMessage({ type: d.CONNECTION_ESTABLISHED }, '*'),
              (z = !0),
              e(s.data.parentUrl));
          });
        });
        e &&
          window.addEventListener('message', function (s) {
            s.origin === e && eventHandler(s);
          });
      })(),
      (async function initTourListener() {
        try {
          window.addEventListener(d.SHOW_TOUR, showTour);
        } catch (e) {
          console.log('init tour error: ', e);
        }
      })();
  }
  window.initTourConnection = async function initTourConnection(e) {
    !(function sendCredentialsToEditor() {
      if (new URLSearchParams(document.location.search).get('tour_editor_action') === u) {
        const e = { ...localStorage },
          s = { ...sessionStorage };
        window.opener.postMessage(
          {
            type: d.CREDENTIALS_FROM_POPUP,
            credentials: { localStorageCredentials: e, sessionStorageCredentials: s },
          },
          '*',
        ),
          window.close();
      }
    })(),
      loadListeners(e);
  };
})();
