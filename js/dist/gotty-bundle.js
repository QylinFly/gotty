! function (e) {
    function t(i) {
        if (r[i]) return r[i].exports;
        var o = r[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var r = {};
    t.m = e, t.c = r, t.i = function (e) {
        return e
    }, t.d = function (e, r, i) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, t.n = function (e) {
        var r = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 28)
}([function (e, t, r) {
    "use strict";

    function i(e) {
        var t = this;
        if (!(this instanceof i)) return new i(arguments[0], arguments[1], arguments[2]);
        t.browser = S, t.cancel = i.cancel, u.EventEmitter.call(this), "number" == typeof e && (e = {
            cols: arguments[0],
            rows: arguments[1],
            handler: arguments[2]
        }), e = e || {}, Object.keys(i.defaults).forEach(function (r) {
            null == e[r] && (e[r] = i.options[r], i[r] !== i.defaults[r] && (e[r] = i[r])), t[r] = e[r]
        }), 8 === e.colors.length ? e.colors = e.colors.concat(i._colors.slice(8)) : 16 === e.colors.length ? e.colors = e.colors.concat(i._colors.slice(16)) : 10 === e.colors.length ? e.colors = e.colors.slice(0, -2).concat(i._colors.slice(8, -2), e.colors.slice(-2)) : 18 === e.colors.length && (e.colors = e.colors.concat(i._colors.slice(16, -2), e.colors.slice(-2))), this.colors = e.colors, this.options = e, this.parent = e.body || e.parent || (A ? A.getElementsByTagName("body")[0] : null), this.cols = e.cols || e.geometry[0], this.rows = e.rows || e.geometry[1], this.geometry = [this.cols, this.rows], e.handler && this.on("data", e.handler), this.ybase = 0, this.ydisp = 0, this.x = 0, this.y = 0, this.cursorState = 0, this.cursorHidden = !1, this.convertEol, this.queue = "", this.scrollTop = 0, this.scrollBottom = this.rows - 1, this.customKeyEventHandler = null, this.cursorBlinkInterval = null, this.applicationKeypad = !1, this.applicationCursor = !1, this.originMode = !1, this.insertMode = !1, this.wraparoundMode = !0, this.normal = null, this.charset = null, this.gcharset = null, this.glevel = 0, this.charsets = [null], this.decLocator, this.x10Mouse, this.vt200Mouse, this.vt300Mouse, this.normalMouse, this.mouseEvents, this.sendFocus, this.utfMouse, this.sgrMouse, this.urxvtMouse, this.element, this.children, this.refreshStart, this.refreshEnd, this.savedX, this.savedY, this.savedCols, this.readable = !0, this.writable = !0, this.defAttr = 131840, this.curAttr = this.defAttr, this.params = [], this.currentParam = 0, this.prefix = "", this.postfix = "", this.inputHandler = new m.InputHandler(this), this.parser = new y.Parser(this.inputHandler, this), this.renderer = this.renderer || null, this.selectionManager = this.selectionManager || null, this.linkifier = this.linkifier || new _.Linkifier, this.writeBuffer = [], this.writeInProgress = !1, this.xoffSentToCatchUp = !1, this.writeStopped = !1, this.surrogate_high = "", this.lines = new f.CircularList(this.scrollback);
        for (var r = this.rows; r--;) this.lines.push(this.blankLine());
        this.selectionManager && this.selectionManager.setBuffer(this.lines), this.tabs, this.setupStops(), this.userScrolling = !1
    }

    function o(e, t, r, i) {
        Array.isArray(e) || (e = [e]), e.forEach(function (e) {
            e.addEventListener(t, r, i || !1)
        })
    }

    function s(e, t, r, i) {
        e.removeEventListener(t, r, i || !1)
    }

    function n(e, t) {
        function r() {
            this.constructor = e
        }
        r.prototype = t.prototype, e.prototype = new r
    }

    function a(e, t) {
        var r = e.browser.isMac && t.altKey && !t.ctrlKey && !t.metaKey || e.browser.isMSWindows && t.altKey && t.ctrlKey && !t.metaKey;
        return "keypress" == t.type ? r : r && (!t.keyCode || t.keyCode > 47)
    }

    function l(e, t, r) {
        var o = e << 16 | t << 8 | r;
        if (null != l._cache[o]) return l._cache[o];
        for (var s, n, a, h, c, u = 1 / 0, d = -1, p = 0; p < i.vcolors.length; p++) {
            if (s = i.vcolors[p], n = s[0], a = s[1], h = s[2], 0 === (c = l.distance(e, t, r, n, a, h))) {
                d = p;
                break
            }
            c < u && (u = c, d = p)
        }
        return l._cache[o] = d
    }

    function h(e) {
        return 16 === e.keyCode || 17 === e.keyCode || 18 === e.keyCode
    }
    /*!
     * xterm (https://npmjs.com/package/xterm)
     * @license MIT
     * @version 2.8.1
     * ==xterm/LICENSE==
     * Copyright (c) 2014-2016, SourceLair Private Company (https://www.sourcelair.com)
     * Copyright (c) 2012-2013, Christopher Jeffrey (https://github.com/chjj/)
     * 
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     * 
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = r(15),
        u = r(1),
        d = r(22),
        p = r(23),
        f = r(25),
        g = r(2),
        m = r(16),
        y = r(18),
        b = r(19),
        _ = r(17),
        C = r(20),
        w = r(24),
        S = r(9),
        v = r(10),
        A = "undefined" != typeof window ? window.document : null;
    n(i, u.EventEmitter), i.prototype.eraseAttr = function () {
            return -512 & this.defAttr | 511 & this.curAttr
        }, i.tangoColors = ["#2e3436", "#cc0000", "#4e9a06", "#c4a000", "#3465a4", "#75507b", "#06989a", "#d3d7cf", "#555753", "#ef2929", "#8ae234", "#fce94f", "#729fcf", "#ad7fa8", "#34e2e2", "#eeeeec"], i.colors = function () {
            function e(e, r, i) {
                o.push("#" + t(e) + t(r) + t(i))
            }

            function t(e) {
                return (e = e.toString(16)).length < 2 ? "0" + e : e
            }
            var r, o = i.tangoColors.slice(),
                s = [0, 95, 135, 175, 215, 255];
            for (r = 0; r < 216; r++) e(s[r / 36 % 6 | 0], s[r / 6 % 6 | 0], s[r % 6]);
            for (r = 0; r < 24; r++) e(s = 8 + 10 * r, s, s);
            return o
        }(), i._colors = i.colors.slice(), i.vcolors = function () {
            for (var e, t = [], r = i.colors, o = 0; o < 256; o++) e = parseInt(r[o].substring(1), 16), t.push([e >> 16 & 255, e >> 8 & 255, 255 & e]);
            return t
        }(), i.defaults = {
            colors: i.colors,
            theme: "default",
            convertEol: !1,
            termName: "xterm",
            geometry: [80, 24],
            cursorBlink: !1,
            cursorStyle: "block",
            visualBell: !1,
            popOnBell: !1,
            scrollback: 1e3,
            screenKeys: !1,
            debug: !1,
            cancelEvents: !1,
            disableStdin: !1,
            useFlowControl: !1,
            tabStopWidth: 8
        }, i.options = {}, i.focus = null,
        function (e, t, r) {
            if (e.forEach) return e.forEach(t, r);
            for (var i = 0; i < e.length; i++) t.call(r, e[i], i, e)
        }(function (e) {
            if (Object.keys) return Object.keys(e);
            var t, r = [];
            for (t in e) Object.prototype.hasOwnProperty.call(e, t) && r.push(t);
            return r
        }(i.defaults), function (e) {
            i[e] = i.defaults[e], i.options[e] = i.defaults[e]
        }), i.prototype.focus = function () {
            return this.textarea.focus()
        }, i.prototype.getOption = function (e, t) {
            if (!(e in i.defaults)) throw new Error('No option with key "' + e + '"');
            return void 0 !== this.options[e] ? this.options[e] : this[e]
        }, i.prototype.setOption = function (e, t) {
            if (!(e in i.defaults)) throw new Error('No option with key "' + e + '"');
            switch (e) {
                case "scrollback":
                    if (t < this.rows) {
                        var r = "Setting the scrollback value less than the number of rows ";
                        return r += "(" + this.rows + ") is not allowed.", console.warn(r), !1
                    }
                    if (this.options[e] !== t) {
                        if (this.lines.length > t) {
                            var o = this.lines.length - t,
                                s = this.ydisp - o < 0;
                            this.lines.trimStart(o), this.ybase = Math.max(this.ybase - o, 0), this.ydisp = Math.max(this.ydisp - o, 0), s && this.refresh(0, this.rows - 1)
                        }
                        this.lines.maxLength = t, this.viewport.syncScrollArea()
                    }
            }
            switch (this[e] = t, this.options[e] = t, e) {
                case "cursorBlink":
                    this.setCursorBlinking(t);
                    break;
                case "cursorStyle":
                    this.element.classList.toggle("xterm-cursor-style-underline", "underline" === t), this.element.classList.toggle("xterm-cursor-style-bar", "bar" === t);
                    break;
                case "tabStopWidth":
                    this.setupStops()
            }
        }, i.prototype.restartCursorBlinking = function () {
            this.setCursorBlinking(this.options.cursorBlink)
        }, i.prototype.setCursorBlinking = function (e) {
            if (this.element.classList.toggle("xterm-cursor-blink", e), this.clearCursorBlinkingInterval(), e) {
                var t = this;
                this.cursorBlinkInterval = setInterval(function () {
                    t.element.classList.toggle("xterm-cursor-blink-on")
                }, 600)
            }
        }, i.prototype.clearCursorBlinkingInterval = function () {
            this.element.classList.remove("xterm-cursor-blink-on"), this.cursorBlinkInterval && (clearInterval(this.cursorBlinkInterval), this.cursorBlinkInterval = null)
        }, i.bindFocus = function (e) {
            o(e.textarea, "focus", function (t) {
                e.sendFocus && e.send(g.C0.ESC + "[I"), e.element.classList.add("focus"), e.showCursor(), e.restartCursorBlinking.apply(e), i.focus = e, e.emit("focus", {
                    terminal: e
                })
            })
        }, i.prototype.blur = function () {
            return this.textarea.blur()
        }, i.bindBlur = function (e) {
            o(e.textarea, "blur", function (t) {
                e.refresh(e.y, e.y), e.sendFocus && e.send(g.C0.ESC + "[O"), e.element.classList.remove("focus"), e.clearCursorBlinkingInterval.apply(e), i.focus = null, e.emit("blur", {
                    terminal: e
                })
            })
        }, i.prototype.initGlobal = function () {
            var e = this,
                t = this;
            i.bindKeys(this), i.bindFocus(this), i.bindBlur(this), o(this.element, "copy", function (r) {
                e.mouseEvents || p.copyHandler(r, t, e.selectionManager)
            });
            var r = function (e) {
                return p.pasteHandler(e, t)
            };
            o(this.textarea, "paste", r), o(this.element, "paste", r), t.browser.isFirefox ? o(this.element, "mousedown", function (t) {
                2 == t.button && p.rightClickHandler(t, e.textarea, e.selectionManager)
            }) : o(this.element, "contextmenu", function (t) {
                p.rightClickHandler(t, e.textarea, e.selectionManager)
            }), t.browser.isLinux && o(this.element, "auxclick", function (t) {
                1 === t.button && p.moveTextAreaUnderMouseCursor(t, e.textarea, e.selectionManager)
            })
        }, i.bindKeys = function (e) {
            o(e.element, "keydown", function (t) {
                A.activeElement == this && e.keyDown(t)
            }, !0), o(e.element, "keypress", function (t) {
                A.activeElement == this && e.keyPress(t)
            }, !0), o(e.element, "keyup", function (t) {
                h(t) || e.focus(e)
            }, !0), o(e.textarea, "keydown", function (t) {
                e.keyDown(t)
            }, !0), o(e.textarea, "keypress", function (t) {
                e.keyPress(t), this.value = ""
            }, !0), o(e.textarea, "compositionstart", e.compositionHelper.compositionstart.bind(e.compositionHelper)), o(e.textarea, "compositionupdate", e.compositionHelper.compositionupdate.bind(e.compositionHelper)), o(e.textarea, "compositionend", e.compositionHelper.compositionend.bind(e.compositionHelper)), e.on("refresh", e.compositionHelper.updateCompositionElements.bind(e.compositionHelper)), e.on("refresh", function (t) {
                e.queueLinkification(t.start, t.end)
            })
        }, i.prototype.insertRow = function (e) {
            return "object" != typeof e && (e = A.createElement("div")), this.rowContainer.appendChild(e), this.children.push(e), e
        }, i.prototype.open = function (e, t) {
            var r = this,
                i = this,
                s = 0;
            if (this.parent = e || this.parent, !this.parent) throw new Error("Terminal requires a parent element.");
            for (this.context = this.parent.ownerDocument.defaultView, this.document = this.parent.ownerDocument, this.body = this.document.getElementsByTagName("body")[0], this.element = this.document.createElement("div"), this.element.classList.add("terminal"), this.element.classList.add("xterm"), this.element.classList.add("xterm-theme-" + this.theme), this.setCursorBlinking(this.options.cursorBlink), this.element.setAttribute("tabindex", 0), this.viewportElement = A.createElement("div"), this.viewportElement.classList.add("xterm-viewport"), this.element.appendChild(this.viewportElement), this.viewportScrollArea = A.createElement("div"), this.viewportScrollArea.classList.add("xterm-scroll-area"), this.viewportElement.appendChild(this.viewportScrollArea), this.selectionContainer = A.createElement("div"), this.selectionContainer.classList.add("xterm-selection"), this.element.appendChild(this.selectionContainer), this.rowContainer = A.createElement("div"), this.rowContainer.classList.add("xterm-rows"), this.element.appendChild(this.rowContainer), this.children = [], this.linkifier.attachToDom(A, this.children), this.helperContainer = A.createElement("div"), this.helperContainer.classList.add("xterm-helpers"), this.element.appendChild(this.helperContainer), this.textarea = A.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this.textarea.addEventListener("focus", function () {
                    i.emit("focus", {
                        terminal: i
                    })
                }), this.textarea.addEventListener("blur", function () {
                    i.emit("blur", {
                        terminal: i
                    })
                }), this.helperContainer.appendChild(this.textarea), this.compositionView = A.createElement("div"), this.compositionView.classList.add("composition-view"), this.compositionHelper = new c.CompositionHelper(this.textarea, this.compositionView, this), this.helperContainer.appendChild(this.compositionView), this.charSizeStyleElement = A.createElement("style"), this.helperContainer.appendChild(this.charSizeStyleElement); s < this.rows; s++) this.insertRow();
            if (this.parent.appendChild(this.element), this.charMeasure = new w.CharMeasure(A, this.helperContainer), this.charMeasure.on("charsizechanged", function () {
                    i.updateCharSizeStyles()
                }), this.charMeasure.measure(), this.viewport = new d.Viewport(this, this.viewportElement, this.viewportScrollArea, this.charMeasure), this.renderer = new b.Renderer(this), this.selectionManager = new C.SelectionManager(this, this.lines, this.rowContainer, this.charMeasure), this.selectionManager.on("refresh", function (e) {
                    r.renderer.refreshSelection(e.start, e.end)
                }), this.selectionManager.on("newselection", function (e) {
                    r.textarea.value = e, r.textarea.focus(), r.textarea.select()
                }), this.on("scroll", function () {
                    return r.selectionManager.refresh()
                }), this.viewportElement.addEventListener("scroll", function () {
                    return r.selectionManager.refresh()
                }), this.refresh(0, this.rows - 1), this.initGlobal(), void 0 === t) {
                var n = "You did not pass the `focus` argument in `Terminal.prototype.open()`.\n";
                n += "The `focus` argument now defaults to `true` but starting with xterm.js 3.0 ", n += "it will default to `false`.", console.warn(n), t = !0
            }
            t && this.focus(), o(this.element, "click", function () {
                var e = A.getSelection(),
                    t = e.isCollapsed;
                ("boolean" == typeof t ? !t : "Range" == e.type) || i.focus()
            }), this.bindMouse(), this.emit("open")
        }, i.loadAddon = function (e, t) {
            return r(29)("./" + e + "/" + e)
        }, i.prototype.updateCharSizeStyles = function () {
            this.charSizeStyleElement.textContent = ".xterm-wide-char{width:" + 2 * this.charMeasure.width + "px;}.xterm-normal-char{width:" + this.charMeasure.width + "px;}.xterm-rows > div{height:" + this.charMeasure.height + "px;}"
        }, i.prototype.bindMouse = function () {
            function e(e) {
                var t, r;
                if (t = n(e), r = v.getRawByteCoords(e, l.rowContainer, l.charMeasure, l.cols, l.rows)) switch (i(t, r), e.overrideType || e.type) {
                    case "mousedown":
                        h = t;
                        break;
                    case "mouseup":
                        h = 32
                }
            }

            function t(e) {
                var t, r = h;
                (t = v.getRawByteCoords(e, l.rowContainer, l.charMeasure, l.cols, l.rows)) && i(r += 32, t)
            }

            function r(e, t) {
                if (l.utfMouse) {
                    if (2047 === t) return e.push(0);
                    t < 127 ? e.push(t) : (t > 2047 && (t = 2047), e.push(192 | t >> 6), e.push(128 | 63 & t))
                } else {
                    if (255 === t) return e.push(0);
                    t > 127 && (t = 127), e.push(t)
                }
            }

            function i(e, t) {
                if (l.vt300Mouse) {
                    e &= 3, t.x -= 32, t.y -= 32;
                    var i = g.C0.ESC + "[24";
                    if (0 === e) i += "1";
                    else if (1 === e) i += "3";
                    else if (2 === e) i += "5";
                    else {
                        if (3 === e) return;
                        i += "0"
                    }
                    return i += "~[" + t.x + "," + t.y + "]\r", void l.send(i)
                }
                return l.decLocator ? (e &= 3, t.x -= 32, t.y -= 32, 0 === e ? e = 2 : 1 === e ? e = 4 : 2 === e ? e = 6 : 3 === e && (e = 3), void l.send(g.C0.ESC + "[" + e + ";" + (3 === e ? 4 : 0) + ";" + t.y + ";" + t.x + ";" + (t.page || 0) + "&w")) : l.urxvtMouse ? (t.x -= 32, t.y -= 32, t.x++, t.y++, void l.send(g.C0.ESC + "[" + e + ";" + t.x + ";" + t.y + "M")) : l.sgrMouse ? (t.x -= 32, t.y -= 32, void l.send(g.C0.ESC + "[<" + ((3 == (3 & e) ? -4 & e : e) - 32) + ";" + t.x + ";" + t.y + (3 == (3 & e) ? "m" : "M"))) : (r(i = [], e), r(i, t.x), r(i, t.y), void l.send(g.C0.ESC + "[M" + String.fromCharCode.apply(String, i)))
            }

            function n(e) {
                var t, r, i, o, s;
                switch (e.overrideType || e.type) {
                    case "mousedown":
                        t = null != e.button ? +e.button : null != e.which ? e.which - 1 : null, l.browser.isMSIE && (t = 1 === t ? 0 : 4 === t ? 1 : t);
                        break;
                    case "mouseup":
                        t = 3;
                        break;
                    case "DOMMouseScroll":
                        t = e.detail < 0 ? 64 : 65;
                        break;
                    case "wheel":
                        t = e.wheelDeltaY > 0 ? 64 : 65
                }
                return r = e.shiftKey ? 4 : 0, i = e.metaKey ? 8 : 0, o = e.ctrlKey ? 16 : 0, s = r | i | o, l.vt200Mouse ? s &= o : l.normalMouse || (s = 0), t = 32 + (s << 2) + t
            }
            var a = this.element,
                l = this,
                h = 32;
            o(a, "mousedown", function (r) {
                if (l.mouseEvents) return e(r), l.focus(), l.vt200Mouse ? (r.overrideType = "mouseup", e(r), l.cancel(r)) : (l.normalMouse && o(l.document, "mousemove", t), l.x10Mouse || o(l.document, "mouseup", function r(i) {
                    return e(i), l.normalMouse && s(l.document, "mousemove", t), s(l.document, "mouseup", r), l.cancel(i)
                }), l.cancel(r))
            }), o(a, "wheel", function (t) {
                if (l.mouseEvents && !(l.x10Mouse || l.vt300Mouse || l.decLocator)) return e(t), l.cancel(t)
            }), o(a, "wheel", function (e) {
                if (!l.mouseEvents) return l.viewport.onWheel(e), l.cancel(e)
            }), o(a, "touchstart", function (e) {
                if (!l.mouseEvents) return l.viewport.onTouchStart(e), l.cancel(e)
            }), o(a, "touchmove", function (e) {
                if (!l.mouseEvents) return l.viewport.onTouchMove(e), l.cancel(e)
            })
        }, i.prototype.destroy = function () {
            this.readable = !1, this.writable = !1, this._events = {}, this.handler = function () {}, this.write = function () {}, this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element)
        }, i.prototype.refresh = function (e, t) {
            this.renderer && this.renderer.queueRefresh(e, t)
        }, i.prototype.queueLinkification = function (e, t) {
            if (this.linkifier)
                for (var r = e; r <= t; r++) this.linkifier.linkifyRow(r)
        }, i.prototype.showCursor = function () {
            this.cursorState || (this.cursorState = 1, this.refresh(this.y, this.y))
        }, i.prototype.scroll = function (e) {
            var t;
            this.lines.length === this.lines.maxLength && (this.lines.trimStart(1), this.ybase--, 0 !== this.ydisp && this.ydisp--), this.ybase++, this.userScrolling || (this.ydisp = this.ybase), t = this.ybase + this.rows - 1, (t -= this.rows - 1 - this.scrollBottom) === this.lines.length ? this.lines.push(this.blankLine(void 0, e)) : this.lines.splice(t, 0, this.blankLine(void 0, e)), 0 !== this.scrollTop && (0 !== this.ybase && (this.ybase--, this.userScrolling || (this.ydisp = this.ybase)), this.lines.splice(this.ybase + this.scrollTop, 1)), this.updateRange(this.scrollTop), this.updateRange(this.scrollBottom), this.emit("scroll", this.ydisp)
        }, i.prototype.scrollDisp = function (e, t) {
            if (e < 0) {
                if (0 === this.ydisp) return;
                this.userScrolling = !0
            } else e + this.ydisp >= this.ybase && (this.userScrolling = !1);
            this.ydisp += e, this.ydisp > this.ybase ? this.ydisp = this.ybase : this.ydisp < 0 && (this.ydisp = 0), t || this.emit("scroll", this.ydisp), this.refresh(0, this.rows - 1)
        }, i.prototype.scrollPages = function (e) {
            this.scrollDisp(e * (this.rows - 1))
        }, i.prototype.scrollToTop = function () {
            this.scrollDisp(-this.ydisp)
        }, i.prototype.scrollToBottom = function () {
            this.scrollDisp(this.ybase - this.ydisp)
        }, i.prototype.write = function (e) {
            if (this.writeBuffer.push(e), this.options.useFlowControl && !this.xoffSentToCatchUp && this.writeBuffer.length >= 5 && (this.send(g.C0.DC3), this.xoffSentToCatchUp = !0), !this.writeInProgress && this.writeBuffer.length > 0) {
                this.writeInProgress = !0;
                var t = this;
                setTimeout(function () {
                    t.innerWrite()
                })
            }
        }, i.prototype.innerWrite = function () {
            for (var e = this.writeBuffer.splice(0, 300); e.length > 0;) {
                var t = e.shift();
                t.length;
                this.xoffSentToCatchUp && 0 === e.length && 0 === this.writeBuffer.length && (this.send(g.C0.DC1), this.xoffSentToCatchUp = !1), this.refreshStart = this.y, this.refreshEnd = this.y;
                var r = this.parser.parse(t);
                this.parser.setState(r), this.updateRange(this.y), this.refresh(this.refreshStart, this.refreshEnd)
            }
            if (this.writeBuffer.length > 0) {
                var i = this;
                setTimeout(function () {
                    i.innerWrite()
                }, 0)
            } else this.writeInProgress = !1
        }, i.prototype.writeln = function (e) {
            this.write(e + "\r\n")
        }, i.prototype.attachCustomKeydownHandler = function (e) {
            console.warn("attachCustomKeydownHandler() is DEPRECATED and will be removed soon. Please use attachCustomKeyEventHandler() instead."), this.attachCustomKeyEventHandler(e)
        }, i.prototype.attachCustomKeyEventHandler = function (e) {
            this.customKeyEventHandler = e
        }, i.prototype.setHypertextLinkHandler = function (e) {
            if (!this.linkifier) throw new Error("Cannot attach a hypertext link handler before Terminal.open is called");
            this.linkifier.setHypertextLinkHandler(e), this.refresh(0, this.rows - 1)
        }, i.prototype.setHypertextValidationCallback = function (e) {
            if (!this.linkifier) throw new Error("Cannot attach a hypertext validation callback before Terminal.open is called");
            this.linkifier.setHypertextValidationCallback(e), this.refresh(0, this.rows - 1)
        }, i.prototype.registerLinkMatcher = function (e, t, r) {
            if (this.linkifier) {
                var i = this.linkifier.registerLinkMatcher(e, t, r);
                return this.refresh(0, this.rows - 1), i
            }
        }, i.prototype.deregisterLinkMatcher = function (e) {
            this.linkifier && this.linkifier.deregisterLinkMatcher(e) && this.refresh(0, this.rows - 1)
        }, i.prototype.hasSelection = function () {
            return this.selectionManager.hasSelection
        }, i.prototype.getSelection = function () {
            return this.selectionManager.selectionText
        }, i.prototype.clearSelection = function () {
            this.selectionManager.clearSelection()
        }, i.prototype.selectAll = function () {
            this.selectionManager.selectAll()
        }, i.prototype.keyDown = function (e) {
            if (this.customKeyEventHandler && !1 === this.customKeyEventHandler(e)) return !1;
            if (this.restartCursorBlinking(), !this.compositionHelper.keydown.bind(this.compositionHelper)(e)) return this.ybase !== this.ydisp && this.scrollToBottom(), !1;
            var t = this.evaluateKeyEscapeSequence(e);
            return t.key === g.C0.DC3 ? this.writeStopped = !0 : t.key === g.C0.DC1 && (this.writeStopped = !1), t.scrollDisp ? (this.scrollDisp(t.scrollDisp), this.cancel(e, !0)) : !!a(this, e) || (t.cancel && this.cancel(e, !0), !t.key || (this.emit("keydown", e), this.emit("key", t.key, e), this.showCursor(), this.handler(t.key), this.cancel(e, !0)))
        }, i.prototype.evaluateKeyEscapeSequence = function (e) {
            var t = {
                    cancel: !1,
                    key: void 0,
                    scrollDisp: void 0
                },
                r = e.shiftKey << 0 | e.altKey << 1 | e.ctrlKey << 2 | e.metaKey << 3;
            switch (e.keyCode) {
                case 8:
                    if (e.shiftKey) {
                        t.key = g.C0.BS;
                        break
                    }
                    t.key = g.C0.DEL;
                    break;
                case 9:
                    if (e.shiftKey) {
                        t.key = g.C0.ESC + "[Z";
                        break
                    }
                    t.key = g.C0.HT, t.cancel = !0;
                    break;
                case 13:
                    t.key = g.C0.CR, t.cancel = !0;
                    break;
                case 27:
                    t.key = g.C0.ESC, t.cancel = !0;
                    break;
                case 37:
                    r ? (t.key = g.C0.ESC + "[1;" + (r + 1) + "D", t.key == g.C0.ESC + "[1;3D" && (t.key = this.browser.isMac ? g.C0.ESC + "b" : g.C0.ESC + "[1;5D")) : this.applicationCursor ? t.key = g.C0.ESC + "OD" : t.key = g.C0.ESC + "[D";
                    break;
                case 39:
                    r ? (t.key = g.C0.ESC + "[1;" + (r + 1) + "C", t.key == g.C0.ESC + "[1;3C" && (t.key = this.browser.isMac ? g.C0.ESC + "f" : g.C0.ESC + "[1;5C")) : this.applicationCursor ? t.key = g.C0.ESC + "OC" : t.key = g.C0.ESC + "[C";
                    break;
                case 38:
                    r ? (t.key = g.C0.ESC + "[1;" + (r + 1) + "A", t.key == g.C0.ESC + "[1;3A" && (t.key = g.C0.ESC + "[1;5A")) : this.applicationCursor ? t.key = g.C0.ESC + "OA" : t.key = g.C0.ESC + "[A";
                    break;
                case 40:
                    r ? (t.key = g.C0.ESC + "[1;" + (r + 1) + "B", t.key == g.C0.ESC + "[1;3B" && (t.key = g.C0.ESC + "[1;5B")) : this.applicationCursor ? t.key = g.C0.ESC + "OB" : t.key = g.C0.ESC + "[B";
                    break;
                case 45:
                    e.shiftKey || e.ctrlKey || (t.key = g.C0.ESC + "[2~");
                    break;
                case 46:
                    t.key = r ? g.C0.ESC + "[3;" + (r + 1) + "~" : g.C0.ESC + "[3~";
                    break;
                case 36:
                    r ? t.key = g.C0.ESC + "[1;" + (r + 1) + "H" : this.applicationCursor ? t.key = g.C0.ESC + "OH" : t.key = g.C0.ESC + "[H";
                    break;
                case 35:
                    r ? t.key = g.C0.ESC + "[1;" + (r + 1) + "F" : this.applicationCursor ? t.key = g.C0.ESC + "OF" : t.key = g.C0.ESC + "[F";
                    break;
                case 33:
                    e.shiftKey ? t.scrollDisp = -(this.rows - 1) : t.key = g.C0.ESC + "[5~";
                    break;
                case 34:
                    e.shiftKey ? t.scrollDisp = this.rows - 1 : t.key = g.C0.ESC + "[6~";
                    break;
                case 112:
                    t.key = r ? g.C0.ESC + "[1;" + (r + 1) + "P" : g.C0.ESC + "OP";
                    break;
                case 113:
                    t.key = r ? g.C0.ESC + "[1;" + (r + 1) + "Q" : g.C0.ESC + "OQ";
                    break;
                case 114:
                    t.key = r ? g.C0.ESC + "[1;" + (r + 1) + "R" : g.C0.ESC + "OR";
                    break;
                case 115:
                    t.key = r ? g.C0.ESC + "[1;" + (r + 1) + "S" : g.C0.ESC + "OS";
                    break;
                case 116:
                    t.key = r ? g.C0.ESC + "[15;" + (r + 1) + "~" : g.C0.ESC + "[15~";
                    break;
                case 117:
                    t.key = r ? g.C0.ESC + "[17;" + (r + 1) + "~" : g.C0.ESC + "[17~";
                    break;
                case 118:
                    t.key = r ? g.C0.ESC + "[18;" + (r + 1) + "~" : g.C0.ESC + "[18~";
                    break;
                case 119:
                    t.key = r ? g.C0.ESC + "[19;" + (r + 1) + "~" : g.C0.ESC + "[19~";
                    break;
                case 120:
                    t.key = r ? g.C0.ESC + "[20;" + (r + 1) + "~" : g.C0.ESC + "[20~";
                    break;
                case 121:
                    t.key = r ? g.C0.ESC + "[21;" + (r + 1) + "~" : g.C0.ESC + "[21~";
                    break;
                case 122:
                    t.key = r ? g.C0.ESC + "[23;" + (r + 1) + "~" : g.C0.ESC + "[23~";
                    break;
                case 123:
                    t.key = r ? g.C0.ESC + "[24;" + (r + 1) + "~" : g.C0.ESC + "[24~";
                    break;
                default:
                    !e.ctrlKey || e.shiftKey || e.altKey || e.metaKey ? this.browser.isMac || !e.altKey || e.ctrlKey || e.metaKey ? this.browser.isMac && !e.altKey && !e.ctrlKey && e.metaKey && 65 === e.keyCode && this.selectAll() : e.keyCode >= 65 && e.keyCode <= 90 ? t.key = g.C0.ESC + String.fromCharCode(e.keyCode + 32) : 192 === e.keyCode ? t.key = g.C0.ESC + "`" : e.keyCode >= 48 && e.keyCode <= 57 && (t.key = g.C0.ESC + (e.keyCode - 48)) : e.keyCode >= 65 && e.keyCode <= 90 ? t.key = String.fromCharCode(e.keyCode - 64) : 32 === e.keyCode ? t.key = String.fromCharCode(0) : e.keyCode >= 51 && e.keyCode <= 55 ? t.key = String.fromCharCode(e.keyCode - 51 + 27) : 56 === e.keyCode ? t.key = String.fromCharCode(127) : 219 === e.keyCode ? t.key = String.fromCharCode(27) : 220 === e.keyCode ? t.key = String.fromCharCode(28) : 221 === e.keyCode && (t.key = String.fromCharCode(29))
            }
            return t
        }, i.prototype.setgLevel = function (e) {
            this.glevel = e, this.charset = this.charsets[e]
        }, i.prototype.setgCharset = function (e, t) {
            this.charsets[e] = t, this.glevel === e && (this.charset = t)
        }, i.prototype.keyPress = function (e) {
            var t;
            if (this.customKeyEventHandler && !1 === this.customKeyEventHandler(e)) return !1;
            if (this.cancel(e), e.charCode) t = e.charCode;
            else if (null == e.which) t = e.keyCode;
            else {
                if (0 === e.which || 0 === e.charCode) return !1;
                t = e.which
            }
            return !(!t || (e.altKey || e.ctrlKey || e.metaKey) && !a(this, e)) && (t = String.fromCharCode(t), this.emit("keypress", t, e), this.emit("key", t, e), this.showCursor(), this.handler(t), !0)
        }, i.prototype.send = function (e) {
            var t = this;
            this.queue || setTimeout(function () {
                t.handler(t.queue), t.queue = ""
            }, 1), this.queue += e
        }, i.prototype.bell = function () {
            if (this.visualBell) {
                var e = this;
                this.element.style.borderColor = "white", setTimeout(function () {
                    e.element.style.borderColor = ""
                }, 10), this.popOnBell && this.focus()
            }
        }, i.prototype.log = function () {
            if (this.debug && this.context.console && this.context.console.log) {
                var e = Array.prototype.slice.call(arguments);
                this.context.console.log.apply(this.context.console, e)
            }
        }, i.prototype.error = function () {
            if (this.debug && this.context.console && this.context.console.error) {
                var e = Array.prototype.slice.call(arguments);
                this.context.console.error.apply(this.context.console, e)
            }
        }, i.prototype.resize = function (e, t) {
            if (!isNaN(e) && !isNaN(t)) {
                t > this.getOption("scrollback") && this.setOption("scrollback", t);
                var r, i, o, s, n;
                if (e !== this.cols || t !== this.rows) {
                    if (e < 1 && (e = 1), t < 1 && (t = 1), (o = this.cols) < e)
                        for (s = [this.defAttr, " ", 1], i = this.lines.length; i--;)
                            for (; this.lines.get(i).length < e;) this.lines.get(i).push(s);
                    if (this.cols = e, this.setupStops(this.cols), o = this.rows, n = 0, o < t)
                        for (r = this.element; o++ < t;) this.lines.length < t + this.ybase && (this.ybase > 0 && this.lines.length <= this.ybase + this.y + n + 1 ? (this.ybase--, n++, this.ydisp > 0 && this.ydisp--) : this.lines.push(this.blankLine())), this.children.length < t && this.insertRow();
                    else
                        for (; o-- > t;)
                            if (this.lines.length > t + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++)), this.children.length > t) {
                                if (!(r = this.children.shift())) continue;
                                r.parentNode.removeChild(r)
                            }
                    this.rows = t, this.y >= t && (this.y = t - 1), n && (this.y += n), this.x >= e && (this.x = e - 1), this.scrollTop = 0, this.scrollBottom = t - 1, this.charMeasure.measure(), this.refresh(0, this.rows - 1), this.normal = null, this.geometry = [this.cols, this.rows], this.emit("resize", {
                        terminal: this,
                        cols: e,
                        rows: t
                    })
                }
            }
        }, i.prototype.updateRange = function (e) {
            e < this.refreshStart && (this.refreshStart = e), e > this.refreshEnd && (this.refreshEnd = e)
        }, i.prototype.maxRange = function () {
            this.refreshStart = 0, this.refreshEnd = this.rows - 1
        }, i.prototype.setupStops = function (e) {
            for (null != e ? this.tabs[e] || (e = this.prevStop(e)) : (this.tabs = {}, e = 0); e < this.cols; e += this.getOption("tabStopWidth")) this.tabs[e] = !0
        }, i.prototype.prevStop = function (e) {
            for (null == e && (e = this.x); !this.tabs[--e] && e > 0;);
            return e >= this.cols ? this.cols - 1 : e < 0 ? 0 : e
        }, i.prototype.nextStop = function (e) {
            for (null == e && (e = this.x); !this.tabs[++e] && e < this.cols;);
            return e >= this.cols ? this.cols - 1 : e < 0 ? 0 : e
        }, i.prototype.eraseRight = function (e, t) {
            var r = this.lines.get(this.ybase + t);
            if (r) {
                for (var i = [this.eraseAttr(), " ", 1]; e < this.cols; e++) r[e] = i;
                this.updateRange(t)
            }
        }, i.prototype.eraseLeft = function (e, t) {
            var r = this.lines.get(this.ybase + t);
            if (r) {
                var i = [this.eraseAttr(), " ", 1];
                for (e++; e--;) r[e] = i;
                this.updateRange(t)
            }
        }, i.prototype.clear = function () {
            if (0 !== this.ybase || 0 !== this.y) {
                this.lines.set(0, this.lines.get(this.ybase + this.y)), this.lines.length = 1, this.ydisp = 0, this.ybase = 0, this.y = 0;
                for (var e = 1; e < this.rows; e++) this.lines.push(this.blankLine());
                this.refresh(0, this.rows - 1), this.emit("scroll", this.ydisp)
            }
        }, i.prototype.eraseLine = function (e) {
            this.eraseRight(0, e)
        }, i.prototype.blankLine = function (e, t) {
            var r = [e ? this.eraseAttr() : this.defAttr, " ", 1],
                i = [],
                o = 0;
            for (t && (i.isWrapped = t); o < this.cols; o++) i[o] = r;
            return i
        }, i.prototype.ch = function (e) {
            return e ? [this.eraseAttr(), " ", 1] : [this.defAttr, " ", 1]
        }, i.prototype.is = function (e) {
            return 0 === (this.termName + "").indexOf(e)
        }, i.prototype.handler = function (e) {
            this.options.disableStdin || (this.ybase !== this.ydisp && this.scrollToBottom(), this.emit("data", e))
        }, i.prototype.handleTitle = function (e) {
            this.emit("title", e)
        }, i.prototype.index = function () {
            ++this.y > this.scrollBottom && (this.y--, this.scroll()), this.x >= this.cols && this.x--
        }, i.prototype.reverseIndex = function () {
            this.y === this.scrollTop ? (this.lines.shiftElements(this.y + this.ybase, this.rows - 1, 1), this.lines.set(this.y + this.ybase, this.blankLine(!0)), this.updateRange(this.scrollTop), this.updateRange(this.scrollBottom)) : this.y--
        }, i.prototype.reset = function () {
            this.options.rows = this.rows, this.options.cols = this.cols;
            var e = this.customKeyEventHandler,
                t = this.cursorBlinkInterval;
            i.call(this, this.options), this.customKeyEventHandler = e, this.cursorBlinkInterval = t, this.refresh(0, this.rows - 1), this.viewport.syncScrollArea()
        }, i.prototype.tabSet = function () {
            this.tabs[this.x] = !0
        }, i.prototype.matchColor = l, l._cache = {}, l.distance = function (e, t, r, i, o, s) {
            return Math.pow(30 * (e - i), 2) + Math.pow(59 * (t - o), 2) + Math.pow(11 * (r - s), 2)
        }, i.EventEmitter = u.EventEmitter, i.inherits = n, i.on = o, i.off = s, i.cancel = function (e, t) {
            if (this.cancelEvents || t) return e.preventDefault(), e.stopPropagation(), !1
        }, e.exports = i
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function () {
        function e() {
            this._events = this._events || {}
        }
        return e.prototype.on = function (e, t) {
            this._events[e] = this._events[e] || [], this._events[e].push(t)
        }, e.prototype.off = function (e, t) {
            if (this._events[e])
                for (var r = this._events[e], i = r.length; i--;)
                    if (r[i] === t || r[i].listener === t) return void r.splice(i, 1)
        }, e.prototype.removeAllListeners = function (e) {
            this._events[e] && delete this._events[e]
        }, e.prototype.once = function (e, t) {
            function r() {
                var i = Array.prototype.slice.call(arguments);
                return this.off(e, r), t.apply(this, i)
            }
            return r.listener = t, this.on(e, r)
        }, e.prototype.emit = function (e) {
            for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            if (this._events[e])
                for (var i = this._events[e], o = 0; o < i.length; o++) i[o].apply(this, t)
        }, e.prototype.listeners = function (e) {
            return this._events[e] || []
        }, e
    }();
    t.EventEmitter = i
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    ! function (e) {
        e.NUL = "\0", e.SOH = "", e.STX = "", e.ETX = "", e.EOT = "", e.ENQ = "", e.ACK = "", e.BEL = "", e.BS = "\b", e.HT = "\t", e.LF = "\n", e.VT = "\v", e.FF = "\f", e.CR = "\r", e.SO = "", e.SI = "", e.DLE = "", e.DC1 = "", e.DC2 = "", e.DC3 = "", e.DC4 = "", e.NAK = "", e.SYN = "", e.ETB = "", e.CAN = "", e.EM = "", e.SUB = "", e.ESC = "", e.FS = "", e.GS = "", e.RS = "", e.US = "", e.SP = " ", e.DEL = ""
    }(t.C0 || (t.C0 = {}))
}, function (e, t, r) {
    "use strict";
    /*!
     * libapps (https://npmjs.com/package/libapps)
     * @license BSD-3-Clause
     * @version 1.70.0
     * ==libapps/LICENSE==
     * // Copyright (c) 2006-2009 The Chromium OS Authors. All rights reserved.
     * //
     * // Redistribution and use in source and binary forms, with or without
     * // modification, are permitted provided that the following conditions are
     * // met:
     * //
     * //    * Redistributions of source code must retain the above copyright
     * // notice, this list of conditions and the following disclaimer.
     * //    * Redistributions in binary form must reproduce the above
     * // copyright notice, this list of conditions and the following disclaimer
     * // in the documentation and/or other materials provided with the
     * // distribution.
     * //    * Neither the name of Google Inc. nor the names of its
     * // contributors may be used to endorse or promote products derived from
     * // this software without specific prior written permission.
     * //
     * // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     * // "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     * // LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
     * // A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
     * // OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
     * // SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
     * // LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
     * // DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
     * // THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * // (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
     * // OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */
    if (void 0 !== i) throw new Error('Global "lib" object already exists.');
    var i = {};
    i.runtimeDependencies_ = {}, i.initCallbacks_ = [], i.rtdep = function (e) {
        var t;
        try {
            throw new Error
        } catch (e) {
            var r = e.stack.split("\n");
            t = r.length >= 3 ? r[2].replace(/^\s*at\s+/, "") : r[1].replace(/^\s*global code@/, "")
        }
        for (var o = 0; o < arguments.length; o++) {
            var s = arguments[o];
            if (s instanceof Array) i.rtdep.apply(i, s);
            else {
                var n = this.runtimeDependencies_[s];
                n || (n = this.runtimeDependencies_[s] = []), n.push(t)
            }
        }
    }, i.ensureRuntimeDependencies_ = function () {
        var e = !0;
        for (var t in i.runtimeDependencies_)
            for (var r = i.runtimeDependencies_[t], o = t.split("."), s = window || self, n = 0; n < o.length; n++) {
                if (!(o[n] in s)) {
                    console.warn('Missing "' + t + '" is needed by', r), e = !1;
                    break
                }
                s = s[o[n]]
            }
        if (!e) throw new Error("Failed runtime dependency check")
    }, i.registerInit = function (e, t) {
        return i.initCallbacks_.push([e, t]), t
    }, i.init = function (e, t) {
        var r = i.initCallbacks_,
            o = function () {
                if (r.length) {
                    var s = r.shift();
                    t && t("init: " + s[0]), s[1](i.f.alarm(o))
                } else e()
            };
        if ("function" != typeof e) throw new Error("Missing or invalid argument: onInit");
        i.ensureRuntimeDependencies_(), setTimeout(o, 0)
    }, String.prototype.padStart || (String.prototype.padStart = function (e, t) {
        return (e -= this.length) <= 0 ? String(this) : (void 0 === t && (t = " "), e > t.length && (t = t.repeat(e / t.length + 1)), t.slice(0, e) + String(this))
    }), String.prototype.padEnd || (String.prototype.padEnd = function (e, t) {
        return (e -= this.length) <= 0 ? String(this) : (void 0 === t && (t = " "), e > t.length && (t = t.repeat(e / t.length + 1)), String(this) + t.slice(0, e))
    }), i.colors = {}, i.colors.re_ = {
        hex16: /#([a-f0-9])([a-f0-9])([a-f0-9])/i,
        hex24: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i,
        rgb: new RegExp("^/s*rgb/s*/(/s*(/d{1,3})/s*,/s*(/d{1,3})/s*,/s*(/d{1,3})/s*/)/s*$".replace(/\//g, "\\"), "i"),
        rgba: new RegExp("^/s*rgba/s*/(/s*(/d{1,3})/s*,/s*(/d{1,3})/s*,/s*(/d{1,3})/s*(?:,/s*(/d+(?:/./d+)?)/s*)/)/s*$".replace(/\//g, "\\"), "i"),
        rgbx: new RegExp("^/s*rgba?/s*/(/s*(/d{1,3})/s*,/s*(/d{1,3})/s*,/s*(/d{1,3})/s*(?:,/s*(/d+(?:/./d+)?)/s*)?/)/s*$".replace(/\//g, "\\"), "i"),
        x11rgb: /^\s*rgb:([a-f0-9]{1,4})\/([a-f0-9]{1,4})\/([a-f0-9]{1,4})\s*$/i,
        name: /[a-z][a-z0-9\s]+/
    }, i.colors.rgbToX11 = function (e) {
        function t(e) {
            return e = (257 * Math.min(e, 255)).toString(16), i.f.zpad(e, 4)
        }
        var r = e.match(i.colors.re_.rgbx);
        return r ? "rgb:" + t(r[1]) + "/" + t(r[2]) + "/" + t(r[3]) : null
    }, i.colors.x11HexToCSS = function (e) {
        if (!e.startsWith("#")) return null;
        if (e = e.substr(1), -1 == [3, 6, 9, 12].indexOf(e.length)) return null;
        if (e.match(/[^a-f0-9]/i)) return null;
        var t = e.length / 3,
            r = e.substr(0, t),
            o = e.substr(t, t),
            s = e.substr(t + t, t);
        return i.colors.arrayToRGBA([r, o, s].map(function (e) {
            return e = parseInt(e, 16), 2 == t ? e : 1 == t ? e << 4 : e >> 4 * (t - 2)
        }))
    }, i.colors.x11ToCSS = function (e) {
        var t = e.match(i.colors.re_.x11rgb);
        return t ? (t.splice(0, 1), i.colors.arrayToRGBA(t.map(function (e) {
            return 1 == e.length ? parseInt(e + e, 16) : 2 == e.length ? parseInt(e, 16) : (3 == e.length && (e += e.substr(2)), Math.round(parseInt(e, 16) / 257))
        }))) : e.startsWith("#") ? i.colors.x11HexToCSS(e) : i.colors.nameToRGB(e)
    }, i.colors.hexToRGB = function (e) {
        function t(e) {
            4 == e.length && (e = e.replace(r, function (e, t, r, i) {
                return "#" + t + t + r + r + i + i
            }));
            var t = e.match(o);
            return t ? "rgb(" + parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) + ")" : null
        }
        var r = i.colors.re_.hex16,
            o = i.colors.re_.hex24;
        if (e instanceof Array)
            for (var s = 0; s < e.length; s++) e[s] = t(e[s]);
        else e = t(e);
        return e
    }, i.colors.rgbToHex = function (e) {
        function t(e) {
            var t = i.colors.crackRGB(e);
            return t ? "#" + i.f.zpad((parseInt(t[0]) << 16 | parseInt(t[1]) << 8 | parseInt(t[2]) << 0).toString(16), 6) : null
        }
        if (e instanceof Array)
            for (var r = 0; r < e.length; r++) e[r] = t(e[r]);
        else e = t(e);
        return e
    }, i.colors.normalizeCSS = function (e) {
        return e.startsWith("#") ? i.colors.hexToRGB(e) : i.colors.re_.rgbx.test(e) ? e : i.colors.nameToRGB(e)
    }, i.colors.arrayToRGBA = function (e) {
        var t = e.length > 3 ? e[3] : 1;
        return "rgba(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + t + ")"
    }, i.colors.setAlpha = function (e, t) {
        var r = i.colors.crackRGB(e);
        return r[3] = t, i.colors.arrayToRGBA(r)
    }, i.colors.mix = function (e, t, r) {
        for (var o = i.colors.crackRGB(e), s = i.colors.crackRGB(t), n = 0; n < 4; ++n) {
            var a = s[n] - o[n];
            o[n] = Math.round(parseInt(o[n]) + a * r)
        }
        return i.colors.arrayToRGBA(o)
    }, i.colors.crackRGB = function (e) {
        if (e.startsWith("rgba")) {
            if (t = e.match(i.colors.re_.rgba)) return t.shift(), t
        } else {
            var t = e.match(i.colors.re_.rgb);
            if (t) return t.shift(), t.push(1), t
        }
        return console.error("Couldn't crack: " + e), null
    }, i.colors.nameToRGB = function (e) {
        return e in i.colors.colorNames ? i.colors.colorNames[e] : (e = e.toLowerCase()) in i.colors.colorNames ? i.colors.colorNames[e] : (e = e.replace(/\s+/g, "")) in i.colors.colorNames ? i.colors.colorNames[e] : null
    }, i.colors.stockColorPalette = i.colors.hexToRGB(["#000000", "#CC0000", "#4E9A06", "#C4A000", "#3465A4", "#75507B", "#06989A", "#D3D7CF", "#555753", "#EF2929", "#00BA13", "#FCE94F", "#729FCF", "#F200CB", "#00B5BD", "#EEEEEC", "#000000", "#00005F", "#000087", "#0000AF", "#0000D7", "#0000FF", "#005F00", "#005F5F", "#005F87", "#005FAF", "#005FD7", "#005FFF", "#008700", "#00875F", "#008787", "#0087AF", "#0087D7", "#0087FF", "#00AF00", "#00AF5F", "#00AF87", "#00AFAF", "#00AFD7", "#00AFFF", "#00D700", "#00D75F", "#00D787", "#00D7AF", "#00D7D7", "#00D7FF", "#00FF00", "#00FF5F", "#00FF87", "#00FFAF", "#00FFD7", "#00FFFF", "#5F0000", "#5F005F", "#5F0087", "#5F00AF", "#5F00D7", "#5F00FF", "#5F5F00", "#5F5F5F", "#5F5F87", "#5F5FAF", "#5F5FD7", "#5F5FFF", "#5F8700", "#5F875F", "#5F8787", "#5F87AF", "#5F87D7", "#5F87FF", "#5FAF00", "#5FAF5F", "#5FAF87", "#5FAFAF", "#5FAFD7", "#5FAFFF", "#5FD700", "#5FD75F", "#5FD787", "#5FD7AF", "#5FD7D7", "#5FD7FF", "#5FFF00", "#5FFF5F", "#5FFF87", "#5FFFAF", "#5FFFD7", "#5FFFFF", "#870000", "#87005F", "#870087", "#8700AF", "#8700D7", "#8700FF", "#875F00", "#875F5F", "#875F87", "#875FAF", "#875FD7", "#875FFF", "#878700", "#87875F", "#878787", "#8787AF", "#8787D7", "#8787FF", "#87AF00", "#87AF5F", "#87AF87", "#87AFAF", "#87AFD7", "#87AFFF", "#87D700", "#87D75F", "#87D787", "#87D7AF", "#87D7D7", "#87D7FF", "#87FF00", "#87FF5F", "#87FF87", "#87FFAF", "#87FFD7", "#87FFFF", "#AF0000", "#AF005F", "#AF0087", "#AF00AF", "#AF00D7", "#AF00FF", "#AF5F00", "#AF5F5F", "#AF5F87", "#AF5FAF", "#AF5FD7", "#AF5FFF", "#AF8700", "#AF875F", "#AF8787", "#AF87AF", "#AF87D7", "#AF87FF", "#AFAF00", "#AFAF5F", "#AFAF87", "#AFAFAF", "#AFAFD7", "#AFAFFF", "#AFD700", "#AFD75F", "#AFD787", "#AFD7AF", "#AFD7D7", "#AFD7FF", "#AFFF00", "#AFFF5F", "#AFFF87", "#AFFFAF", "#AFFFD7", "#AFFFFF", "#D70000", "#D7005F", "#D70087", "#D700AF", "#D700D7", "#D700FF", "#D75F00", "#D75F5F", "#D75F87", "#D75FAF", "#D75FD7", "#D75FFF", "#D78700", "#D7875F", "#D78787", "#D787AF", "#D787D7", "#D787FF", "#D7AF00", "#D7AF5F", "#D7AF87", "#D7AFAF", "#D7AFD7", "#D7AFFF", "#D7D700", "#D7D75F", "#D7D787", "#D7D7AF", "#D7D7D7", "#D7D7FF", "#D7FF00", "#D7FF5F", "#D7FF87", "#D7FFAF", "#D7FFD7", "#D7FFFF", "#FF0000", "#FF005F", "#FF0087", "#FF00AF", "#FF00D7", "#FF00FF", "#FF5F00", "#FF5F5F", "#FF5F87", "#FF5FAF", "#FF5FD7", "#FF5FFF", "#FF8700", "#FF875F", "#FF8787", "#FF87AF", "#FF87D7", "#FF87FF", "#FFAF00", "#FFAF5F", "#FFAF87", "#FFAFAF", "#FFAFD7", "#FFAFFF", "#FFD700", "#FFD75F", "#FFD787", "#FFD7AF", "#FFD7D7", "#FFD7FF", "#FFFF00", "#FFFF5F", "#FFFF87", "#FFFFAF", "#FFFFD7", "#FFFFFF", "#080808", "#121212", "#1C1C1C", "#262626", "#303030", "#3A3A3A", "#444444", "#4E4E4E", "#585858", "#626262", "#6C6C6C", "#767676", "#808080", "#8A8A8A", "#949494", "#9E9E9E", "#A8A8A8", "#B2B2B2", "#BCBCBC", "#C6C6C6", "#D0D0D0", "#DADADA", "#E4E4E4", "#EEEEEE"]), i.colors.colorPalette = i.colors.stockColorPalette, i.colors.colorNames = {
        aliceblue: "rgb(240, 248, 255)",
        antiquewhite: "rgb(250, 235, 215)",
        antiquewhite1: "rgb(255, 239, 219)",
        antiquewhite2: "rgb(238, 223, 204)",
        antiquewhite3: "rgb(205, 192, 176)",
        antiquewhite4: "rgb(139, 131, 120)",
        aquamarine: "rgb(127, 255, 212)",
        aquamarine1: "rgb(127, 255, 212)",
        aquamarine2: "rgb(118, 238, 198)",
        aquamarine3: "rgb(102, 205, 170)",
        aquamarine4: "rgb(69, 139, 116)",
        azure: "rgb(240, 255, 255)",
        azure1: "rgb(240, 255, 255)",
        azure2: "rgb(224, 238, 238)",
        azure3: "rgb(193, 205, 205)",
        azure4: "rgb(131, 139, 139)",
        beige: "rgb(245, 245, 220)",
        bisque: "rgb(255, 228, 196)",
        bisque1: "rgb(255, 228, 196)",
        bisque2: "rgb(238, 213, 183)",
        bisque3: "rgb(205, 183, 158)",
        bisque4: "rgb(139, 125, 107)",
        black: "rgb(0, 0, 0)",
        blanchedalmond: "rgb(255, 235, 205)",
        blue: "rgb(0, 0, 255)",
        blue1: "rgb(0, 0, 255)",
        blue2: "rgb(0, 0, 238)",
        blue3: "rgb(0, 0, 205)",
        blue4: "rgb(0, 0, 139)",
        blueviolet: "rgb(138, 43, 226)",
        brown: "rgb(165, 42, 42)",
        brown1: "rgb(255, 64, 64)",
        brown2: "rgb(238, 59, 59)",
        brown3: "rgb(205, 51, 51)",
        brown4: "rgb(139, 35, 35)",
        burlywood: "rgb(222, 184, 135)",
        burlywood1: "rgb(255, 211, 155)",
        burlywood2: "rgb(238, 197, 145)",
        burlywood3: "rgb(205, 170, 125)",
        burlywood4: "rgb(139, 115, 85)",
        cadetblue: "rgb(95, 158, 160)",
        cadetblue1: "rgb(152, 245, 255)",
        cadetblue2: "rgb(142, 229, 238)",
        cadetblue3: "rgb(122, 197, 205)",
        cadetblue4: "rgb(83, 134, 139)",
        chartreuse: "rgb(127, 255, 0)",
        chartreuse1: "rgb(127, 255, 0)",
        chartreuse2: "rgb(118, 238, 0)",
        chartreuse3: "rgb(102, 205, 0)",
        chartreuse4: "rgb(69, 139, 0)",
        chocolate: "rgb(210, 105, 30)",
        chocolate1: "rgb(255, 127, 36)",
        chocolate2: "rgb(238, 118, 33)",
        chocolate3: "rgb(205, 102, 29)",
        chocolate4: "rgb(139, 69, 19)",
        coral: "rgb(255, 127, 80)",
        coral1: "rgb(255, 114, 86)",
        coral2: "rgb(238, 106, 80)",
        coral3: "rgb(205, 91, 69)",
        coral4: "rgb(139, 62, 47)",
        cornflowerblue: "rgb(100, 149, 237)",
        cornsilk: "rgb(255, 248, 220)",
        cornsilk1: "rgb(255, 248, 220)",
        cornsilk2: "rgb(238, 232, 205)",
        cornsilk3: "rgb(205, 200, 177)",
        cornsilk4: "rgb(139, 136, 120)",
        cyan: "rgb(0, 255, 255)",
        cyan1: "rgb(0, 255, 255)",
        cyan2: "rgb(0, 238, 238)",
        cyan3: "rgb(0, 205, 205)",
        cyan4: "rgb(0, 139, 139)",
        darkblue: "rgb(0, 0, 139)",
        darkcyan: "rgb(0, 139, 139)",
        darkgoldenrod: "rgb(184, 134, 11)",
        darkgoldenrod1: "rgb(255, 185, 15)",
        darkgoldenrod2: "rgb(238, 173, 14)",
        darkgoldenrod3: "rgb(205, 149, 12)",
        darkgoldenrod4: "rgb(139, 101, 8)",
        darkgray: "rgb(169, 169, 169)",
        darkgreen: "rgb(0, 100, 0)",
        darkgrey: "rgb(169, 169, 169)",
        darkkhaki: "rgb(189, 183, 107)",
        darkmagenta: "rgb(139, 0, 139)",
        darkolivegreen: "rgb(85, 107, 47)",
        darkolivegreen1: "rgb(202, 255, 112)",
        darkolivegreen2: "rgb(188, 238, 104)",
        darkolivegreen3: "rgb(162, 205, 90)",
        darkolivegreen4: "rgb(110, 139, 61)",
        darkorange: "rgb(255, 140, 0)",
        darkorange1: "rgb(255, 127, 0)",
        darkorange2: "rgb(238, 118, 0)",
        darkorange3: "rgb(205, 102, 0)",
        darkorange4: "rgb(139, 69, 0)",
        darkorchid: "rgb(153, 50, 204)",
        darkorchid1: "rgb(191, 62, 255)",
        darkorchid2: "rgb(178, 58, 238)",
        darkorchid3: "rgb(154, 50, 205)",
        darkorchid4: "rgb(104, 34, 139)",
        darkred: "rgb(139, 0, 0)",
        darksalmon: "rgb(233, 150, 122)",
        darkseagreen: "rgb(143, 188, 143)",
        darkseagreen1: "rgb(193, 255, 193)",
        darkseagreen2: "rgb(180, 238, 180)",
        darkseagreen3: "rgb(155, 205, 155)",
        darkseagreen4: "rgb(105, 139, 105)",
        darkslateblue: "rgb(72, 61, 139)",
        darkslategray: "rgb(47, 79, 79)",
        darkslategray1: "rgb(151, 255, 255)",
        darkslategray2: "rgb(141, 238, 238)",
        darkslategray3: "rgb(121, 205, 205)",
        darkslategray4: "rgb(82, 139, 139)",
        darkslategrey: "rgb(47, 79, 79)",
        darkturquoise: "rgb(0, 206, 209)",
        darkviolet: "rgb(148, 0, 211)",
        debianred: "rgb(215, 7, 81)",
        deeppink: "rgb(255, 20, 147)",
        deeppink1: "rgb(255, 20, 147)",
        deeppink2: "rgb(238, 18, 137)",
        deeppink3: "rgb(205, 16, 118)",
        deeppink4: "rgb(139, 10, 80)",
        deepskyblue: "rgb(0, 191, 255)",
        deepskyblue1: "rgb(0, 191, 255)",
        deepskyblue2: "rgb(0, 178, 238)",
        deepskyblue3: "rgb(0, 154, 205)",
        deepskyblue4: "rgb(0, 104, 139)",
        dimgray: "rgb(105, 105, 105)",
        dimgrey: "rgb(105, 105, 105)",
        dodgerblue: "rgb(30, 144, 255)",
        dodgerblue1: "rgb(30, 144, 255)",
        dodgerblue2: "rgb(28, 134, 238)",
        dodgerblue3: "rgb(24, 116, 205)",
        dodgerblue4: "rgb(16, 78, 139)",
        firebrick: "rgb(178, 34, 34)",
        firebrick1: "rgb(255, 48, 48)",
        firebrick2: "rgb(238, 44, 44)",
        firebrick3: "rgb(205, 38, 38)",
        firebrick4: "rgb(139, 26, 26)",
        floralwhite: "rgb(255, 250, 240)",
        forestgreen: "rgb(34, 139, 34)",
        gainsboro: "rgb(220, 220, 220)",
        ghostwhite: "rgb(248, 248, 255)",
        gold: "rgb(255, 215, 0)",
        gold1: "rgb(255, 215, 0)",
        gold2: "rgb(238, 201, 0)",
        gold3: "rgb(205, 173, 0)",
        gold4: "rgb(139, 117, 0)",
        goldenrod: "rgb(218, 165, 32)",
        goldenrod1: "rgb(255, 193, 37)",
        goldenrod2: "rgb(238, 180, 34)",
        goldenrod3: "rgb(205, 155, 29)",
        goldenrod4: "rgb(139, 105, 20)",
        gray: "rgb(190, 190, 190)",
        gray0: "rgb(0, 0, 0)",
        gray1: "rgb(3, 3, 3)",
        gray10: "rgb(26, 26, 26)",
        gray100: "rgb(255, 255, 255)",
        gray11: "rgb(28, 28, 28)",
        gray12: "rgb(31, 31, 31)",
        gray13: "rgb(33, 33, 33)",
        gray14: "rgb(36, 36, 36)",
        gray15: "rgb(38, 38, 38)",
        gray16: "rgb(41, 41, 41)",
        gray17: "rgb(43, 43, 43)",
        gray18: "rgb(46, 46, 46)",
        gray19: "rgb(48, 48, 48)",
        gray2: "rgb(5, 5, 5)",
        gray20: "rgb(51, 51, 51)",
        gray21: "rgb(54, 54, 54)",
        gray22: "rgb(56, 56, 56)",
        gray23: "rgb(59, 59, 59)",
        gray24: "rgb(61, 61, 61)",
        gray25: "rgb(64, 64, 64)",
        gray26: "rgb(66, 66, 66)",
        gray27: "rgb(69, 69, 69)",
        gray28: "rgb(71, 71, 71)",
        gray29: "rgb(74, 74, 74)",
        gray3: "rgb(8, 8, 8)",
        gray30: "rgb(77, 77, 77)",
        gray31: "rgb(79, 79, 79)",
        gray32: "rgb(82, 82, 82)",
        gray33: "rgb(84, 84, 84)",
        gray34: "rgb(87, 87, 87)",
        gray35: "rgb(89, 89, 89)",
        gray36: "rgb(92, 92, 92)",
        gray37: "rgb(94, 94, 94)",
        gray38: "rgb(97, 97, 97)",
        gray39: "rgb(99, 99, 99)",
        gray4: "rgb(10, 10, 10)",
        gray40: "rgb(102, 102, 102)",
        gray41: "rgb(105, 105, 105)",
        gray42: "rgb(107, 107, 107)",
        gray43: "rgb(110, 110, 110)",
        gray44: "rgb(112, 112, 112)",
        gray45: "rgb(115, 115, 115)",
        gray46: "rgb(117, 117, 117)",
        gray47: "rgb(120, 120, 120)",
        gray48: "rgb(122, 122, 122)",
        gray49: "rgb(125, 125, 125)",
        gray5: "rgb(13, 13, 13)",
        gray50: "rgb(127, 127, 127)",
        gray51: "rgb(130, 130, 130)",
        gray52: "rgb(133, 133, 133)",
        gray53: "rgb(135, 135, 135)",
        gray54: "rgb(138, 138, 138)",
        gray55: "rgb(140, 140, 140)",
        gray56: "rgb(143, 143, 143)",
        gray57: "rgb(145, 145, 145)",
        gray58: "rgb(148, 148, 148)",
        gray59: "rgb(150, 150, 150)",
        gray6: "rgb(15, 15, 15)",
        gray60: "rgb(153, 153, 153)",
        gray61: "rgb(156, 156, 156)",
        gray62: "rgb(158, 158, 158)",
        gray63: "rgb(161, 161, 161)",
        gray64: "rgb(163, 163, 163)",
        gray65: "rgb(166, 166, 166)",
        gray66: "rgb(168, 168, 168)",
        gray67: "rgb(171, 171, 171)",
        gray68: "rgb(173, 173, 173)",
        gray69: "rgb(176, 176, 176)",
        gray7: "rgb(18, 18, 18)",
        gray70: "rgb(179, 179, 179)",
        gray71: "rgb(181, 181, 181)",
        gray72: "rgb(184, 184, 184)",
        gray73: "rgb(186, 186, 186)",
        gray74: "rgb(189, 189, 189)",
        gray75: "rgb(191, 191, 191)",
        gray76: "rgb(194, 194, 194)",
        gray77: "rgb(196, 196, 196)",
        gray78: "rgb(199, 199, 199)",
        gray79: "rgb(201, 201, 201)",
        gray8: "rgb(20, 20, 20)",
        gray80: "rgb(204, 204, 204)",
        gray81: "rgb(207, 207, 207)",
        gray82: "rgb(209, 209, 209)",
        gray83: "rgb(212, 212, 212)",
        gray84: "rgb(214, 214, 214)",
        gray85: "rgb(217, 217, 217)",
        gray86: "rgb(219, 219, 219)",
        gray87: "rgb(222, 222, 222)",
        gray88: "rgb(224, 224, 224)",
        gray89: "rgb(227, 227, 227)",
        gray9: "rgb(23, 23, 23)",
        gray90: "rgb(229, 229, 229)",
        gray91: "rgb(232, 232, 232)",
        gray92: "rgb(235, 235, 235)",
        gray93: "rgb(237, 237, 237)",
        gray94: "rgb(240, 240, 240)",
        gray95: "rgb(242, 242, 242)",
        gray96: "rgb(245, 245, 245)",
        gray97: "rgb(247, 247, 247)",
        gray98: "rgb(250, 250, 250)",
        gray99: "rgb(252, 252, 252)",
        green: "rgb(0, 255, 0)",
        green1: "rgb(0, 255, 0)",
        green2: "rgb(0, 238, 0)",
        green3: "rgb(0, 205, 0)",
        green4: "rgb(0, 139, 0)",
        greenyellow: "rgb(173, 255, 47)",
        grey: "rgb(190, 190, 190)",
        grey0: "rgb(0, 0, 0)",
        grey1: "rgb(3, 3, 3)",
        grey10: "rgb(26, 26, 26)",
        grey100: "rgb(255, 255, 255)",
        grey11: "rgb(28, 28, 28)",
        grey12: "rgb(31, 31, 31)",
        grey13: "rgb(33, 33, 33)",
        grey14: "rgb(36, 36, 36)",
        grey15: "rgb(38, 38, 38)",
        grey16: "rgb(41, 41, 41)",
        grey17: "rgb(43, 43, 43)",
        grey18: "rgb(46, 46, 46)",
        grey19: "rgb(48, 48, 48)",
        grey2: "rgb(5, 5, 5)",
        grey20: "rgb(51, 51, 51)",
        grey21: "rgb(54, 54, 54)",
        grey22: "rgb(56, 56, 56)",
        grey23: "rgb(59, 59, 59)",
        grey24: "rgb(61, 61, 61)",
        grey25: "rgb(64, 64, 64)",
        grey26: "rgb(66, 66, 66)",
        grey27: "rgb(69, 69, 69)",
        grey28: "rgb(71, 71, 71)",
        grey29: "rgb(74, 74, 74)",
        grey3: "rgb(8, 8, 8)",
        grey30: "rgb(77, 77, 77)",
        grey31: "rgb(79, 79, 79)",
        grey32: "rgb(82, 82, 82)",
        grey33: "rgb(84, 84, 84)",
        grey34: "rgb(87, 87, 87)",
        grey35: "rgb(89, 89, 89)",
        grey36: "rgb(92, 92, 92)",
        grey37: "rgb(94, 94, 94)",
        grey38: "rgb(97, 97, 97)",
        grey39: "rgb(99, 99, 99)",
        grey4: "rgb(10, 10, 10)",
        grey40: "rgb(102, 102, 102)",
        grey41: "rgb(105, 105, 105)",
        grey42: "rgb(107, 107, 107)",
        grey43: "rgb(110, 110, 110)",
        grey44: "rgb(112, 112, 112)",
        grey45: "rgb(115, 115, 115)",
        grey46: "rgb(117, 117, 117)",
        grey47: "rgb(120, 120, 120)",
        grey48: "rgb(122, 122, 122)",
        grey49: "rgb(125, 125, 125)",
        grey5: "rgb(13, 13, 13)",
        grey50: "rgb(127, 127, 127)",
        grey51: "rgb(130, 130, 130)",
        grey52: "rgb(133, 133, 133)",
        grey53: "rgb(135, 135, 135)",
        grey54: "rgb(138, 138, 138)",
        grey55: "rgb(140, 140, 140)",
        grey56: "rgb(143, 143, 143)",
        grey57: "rgb(145, 145, 145)",
        grey58: "rgb(148, 148, 148)",
        grey59: "rgb(150, 150, 150)",
        grey6: "rgb(15, 15, 15)",
        grey60: "rgb(153, 153, 153)",
        grey61: "rgb(156, 156, 156)",
        grey62: "rgb(158, 158, 158)",
        grey63: "rgb(161, 161, 161)",
        grey64: "rgb(163, 163, 163)",
        grey65: "rgb(166, 166, 166)",
        grey66: "rgb(168, 168, 168)",
        grey67: "rgb(171, 171, 171)",
        grey68: "rgb(173, 173, 173)",
        grey69: "rgb(176, 176, 176)",
        grey7: "rgb(18, 18, 18)",
        grey70: "rgb(179, 179, 179)",
        grey71: "rgb(181, 181, 181)",
        grey72: "rgb(184, 184, 184)",
        grey73: "rgb(186, 186, 186)",
        grey74: "rgb(189, 189, 189)",
        grey75: "rgb(191, 191, 191)",
        grey76: "rgb(194, 194, 194)",
        grey77: "rgb(196, 196, 196)",
        grey78: "rgb(199, 199, 199)",
        grey79: "rgb(201, 201, 201)",
        grey8: "rgb(20, 20, 20)",
        grey80: "rgb(204, 204, 204)",
        grey81: "rgb(207, 207, 207)",
        grey82: "rgb(209, 209, 209)",
        grey83: "rgb(212, 212, 212)",
        grey84: "rgb(214, 214, 214)",
        grey85: "rgb(217, 217, 217)",
        grey86: "rgb(219, 219, 219)",
        grey87: "rgb(222, 222, 222)",
        grey88: "rgb(224, 224, 224)",
        grey89: "rgb(227, 227, 227)",
        grey9: "rgb(23, 23, 23)",
        grey90: "rgb(229, 229, 229)",
        grey91: "rgb(232, 232, 232)",
        grey92: "rgb(235, 235, 235)",
        grey93: "rgb(237, 237, 237)",
        grey94: "rgb(240, 240, 240)",
        grey95: "rgb(242, 242, 242)",
        grey96: "rgb(245, 245, 245)",
        grey97: "rgb(247, 247, 247)",
        grey98: "rgb(250, 250, 250)",
        grey99: "rgb(252, 252, 252)",
        honeydew: "rgb(240, 255, 240)",
        honeydew1: "rgb(240, 255, 240)",
        honeydew2: "rgb(224, 238, 224)",
        honeydew3: "rgb(193, 205, 193)",
        honeydew4: "rgb(131, 139, 131)",
        hotpink: "rgb(255, 105, 180)",
        hotpink1: "rgb(255, 110, 180)",
        hotpink2: "rgb(238, 106, 167)",
        hotpink3: "rgb(205, 96, 144)",
        hotpink4: "rgb(139, 58, 98)",
        indianred: "rgb(205, 92, 92)",
        indianred1: "rgb(255, 106, 106)",
        indianred2: "rgb(238, 99, 99)",
        indianred3: "rgb(205, 85, 85)",
        indianred4: "rgb(139, 58, 58)",
        ivory: "rgb(255, 255, 240)",
        ivory1: "rgb(255, 255, 240)",
        ivory2: "rgb(238, 238, 224)",
        ivory3: "rgb(205, 205, 193)",
        ivory4: "rgb(139, 139, 131)",
        khaki: "rgb(240, 230, 140)",
        khaki1: "rgb(255, 246, 143)",
        khaki2: "rgb(238, 230, 133)",
        khaki3: "rgb(205, 198, 115)",
        khaki4: "rgb(139, 134, 78)",
        lavender: "rgb(230, 230, 250)",
        lavenderblush: "rgb(255, 240, 245)",
        lavenderblush1: "rgb(255, 240, 245)",
        lavenderblush2: "rgb(238, 224, 229)",
        lavenderblush3: "rgb(205, 193, 197)",
        lavenderblush4: "rgb(139, 131, 134)",
        lawngreen: "rgb(124, 252, 0)",
        lemonchiffon: "rgb(255, 250, 205)",
        lemonchiffon1: "rgb(255, 250, 205)",
        lemonchiffon2: "rgb(238, 233, 191)",
        lemonchiffon3: "rgb(205, 201, 165)",
        lemonchiffon4: "rgb(139, 137, 112)",
        lightblue: "rgb(173, 216, 230)",
        lightblue1: "rgb(191, 239, 255)",
        lightblue2: "rgb(178, 223, 238)",
        lightblue3: "rgb(154, 192, 205)",
        lightblue4: "rgb(104, 131, 139)",
        lightcoral: "rgb(240, 128, 128)",
        lightcyan: "rgb(224, 255, 255)",
        lightcyan1: "rgb(224, 255, 255)",
        lightcyan2: "rgb(209, 238, 238)",
        lightcyan3: "rgb(180, 205, 205)",
        lightcyan4: "rgb(122, 139, 139)",
        lightgoldenrod: "rgb(238, 221, 130)",
        lightgoldenrod1: "rgb(255, 236, 139)",
        lightgoldenrod2: "rgb(238, 220, 130)",
        lightgoldenrod3: "rgb(205, 190, 112)",
        lightgoldenrod4: "rgb(139, 129, 76)",
        lightgoldenrodyellow: "rgb(250, 250, 210)",
        lightgray: "rgb(211, 211, 211)",
        lightgreen: "rgb(144, 238, 144)",
        lightgrey: "rgb(211, 211, 211)",
        lightpink: "rgb(255, 182, 193)",
        lightpink1: "rgb(255, 174, 185)",
        lightpink2: "rgb(238, 162, 173)",
        lightpink3: "rgb(205, 140, 149)",
        lightpink4: "rgb(139, 95, 101)",
        lightsalmon: "rgb(255, 160, 122)",
        lightsalmon1: "rgb(255, 160, 122)",
        lightsalmon2: "rgb(238, 149, 114)",
        lightsalmon3: "rgb(205, 129, 98)",
        lightsalmon4: "rgb(139, 87, 66)",
        lightseagreen: "rgb(32, 178, 170)",
        lightskyblue: "rgb(135, 206, 250)",
        lightskyblue1: "rgb(176, 226, 255)",
        lightskyblue2: "rgb(164, 211, 238)",
        lightskyblue3: "rgb(141, 182, 205)",
        lightskyblue4: "rgb(96, 123, 139)",
        lightslateblue: "rgb(132, 112, 255)",
        lightslategray: "rgb(119, 136, 153)",
        lightslategrey: "rgb(119, 136, 153)",
        lightsteelblue: "rgb(176, 196, 222)",
        lightsteelblue1: "rgb(202, 225, 255)",
        lightsteelblue2: "rgb(188, 210, 238)",
        lightsteelblue3: "rgb(162, 181, 205)",
        lightsteelblue4: "rgb(110, 123, 139)",
        lightyellow: "rgb(255, 255, 224)",
        lightyellow1: "rgb(255, 255, 224)",
        lightyellow2: "rgb(238, 238, 209)",
        lightyellow3: "rgb(205, 205, 180)",
        lightyellow4: "rgb(139, 139, 122)",
        limegreen: "rgb(50, 205, 50)",
        linen: "rgb(250, 240, 230)",
        magenta: "rgb(255, 0, 255)",
        magenta1: "rgb(255, 0, 255)",
        magenta2: "rgb(238, 0, 238)",
        magenta3: "rgb(205, 0, 205)",
        magenta4: "rgb(139, 0, 139)",
        maroon: "rgb(176, 48, 96)",
        maroon1: "rgb(255, 52, 179)",
        maroon2: "rgb(238, 48, 167)",
        maroon3: "rgb(205, 41, 144)",
        maroon4: "rgb(139, 28, 98)",
        mediumaquamarine: "rgb(102, 205, 170)",
        mediumblue: "rgb(0, 0, 205)",
        mediumorchid: "rgb(186, 85, 211)",
        mediumorchid1: "rgb(224, 102, 255)",
        mediumorchid2: "rgb(209, 95, 238)",
        mediumorchid3: "rgb(180, 82, 205)",
        mediumorchid4: "rgb(122, 55, 139)",
        mediumpurple: "rgb(147, 112, 219)",
        mediumpurple1: "rgb(171, 130, 255)",
        mediumpurple2: "rgb(159, 121, 238)",
        mediumpurple3: "rgb(137, 104, 205)",
        mediumpurple4: "rgb(93, 71, 139)",
        mediumseagreen: "rgb(60, 179, 113)",
        mediumslateblue: "rgb(123, 104, 238)",
        mediumspringgreen: "rgb(0, 250, 154)",
        mediumturquoise: "rgb(72, 209, 204)",
        mediumvioletred: "rgb(199, 21, 133)",
        midnightblue: "rgb(25, 25, 112)",
        mintcream: "rgb(245, 255, 250)",
        mistyrose: "rgb(255, 228, 225)",
        mistyrose1: "rgb(255, 228, 225)",
        mistyrose2: "rgb(238, 213, 210)",
        mistyrose3: "rgb(205, 183, 181)",
        mistyrose4: "rgb(139, 125, 123)",
        moccasin: "rgb(255, 228, 181)",
        navajowhite: "rgb(255, 222, 173)",
        navajowhite1: "rgb(255, 222, 173)",
        navajowhite2: "rgb(238, 207, 161)",
        navajowhite3: "rgb(205, 179, 139)",
        navajowhite4: "rgb(139, 121, 94)",
        navy: "rgb(0, 0, 128)",
        navyblue: "rgb(0, 0, 128)",
        oldlace: "rgb(253, 245, 230)",
        olivedrab: "rgb(107, 142, 35)",
        olivedrab1: "rgb(192, 255, 62)",
        olivedrab2: "rgb(179, 238, 58)",
        olivedrab3: "rgb(154, 205, 50)",
        olivedrab4: "rgb(105, 139, 34)",
        orange: "rgb(255, 165, 0)",
        orange1: "rgb(255, 165, 0)",
        orange2: "rgb(238, 154, 0)",
        orange3: "rgb(205, 133, 0)",
        orange4: "rgb(139, 90, 0)",
        orangered: "rgb(255, 69, 0)",
        orangered1: "rgb(255, 69, 0)",
        orangered2: "rgb(238, 64, 0)",
        orangered3: "rgb(205, 55, 0)",
        orangered4: "rgb(139, 37, 0)",
        orchid: "rgb(218, 112, 214)",
        orchid1: "rgb(255, 131, 250)",
        orchid2: "rgb(238, 122, 233)",
        orchid3: "rgb(205, 105, 201)",
        orchid4: "rgb(139, 71, 137)",
        palegoldenrod: "rgb(238, 232, 170)",
        palegreen: "rgb(152, 251, 152)",
        palegreen1: "rgb(154, 255, 154)",
        palegreen2: "rgb(144, 238, 144)",
        palegreen3: "rgb(124, 205, 124)",
        palegreen4: "rgb(84, 139, 84)",
        paleturquoise: "rgb(175, 238, 238)",
        paleturquoise1: "rgb(187, 255, 255)",
        paleturquoise2: "rgb(174, 238, 238)",
        paleturquoise3: "rgb(150, 205, 205)",
        paleturquoise4: "rgb(102, 139, 139)",
        palevioletred: "rgb(219, 112, 147)",
        palevioletred1: "rgb(255, 130, 171)",
        palevioletred2: "rgb(238, 121, 159)",
        palevioletred3: "rgb(205, 104, 137)",
        palevioletred4: "rgb(139, 71, 93)",
        papayawhip: "rgb(255, 239, 213)",
        peachpuff: "rgb(255, 218, 185)",
        peachpuff1: "rgb(255, 218, 185)",
        peachpuff2: "rgb(238, 203, 173)",
        peachpuff3: "rgb(205, 175, 149)",
        peachpuff4: "rgb(139, 119, 101)",
        peru: "rgb(205, 133, 63)",
        pink: "rgb(255, 192, 203)",
        pink1: "rgb(255, 181, 197)",
        pink2: "rgb(238, 169, 184)",
        pink3: "rgb(205, 145, 158)",
        pink4: "rgb(139, 99, 108)",
        plum: "rgb(221, 160, 221)",
        plum1: "rgb(255, 187, 255)",
        plum2: "rgb(238, 174, 238)",
        plum3: "rgb(205, 150, 205)",
        plum4: "rgb(139, 102, 139)",
        powderblue: "rgb(176, 224, 230)",
        purple: "rgb(160, 32, 240)",
        purple1: "rgb(155, 48, 255)",
        purple2: "rgb(145, 44, 238)",
        purple3: "rgb(125, 38, 205)",
        purple4: "rgb(85, 26, 139)",
        red: "rgb(255, 0, 0)",
        red1: "rgb(255, 0, 0)",
        red2: "rgb(238, 0, 0)",
        red3: "rgb(205, 0, 0)",
        red4: "rgb(139, 0, 0)",
        rosybrown: "rgb(188, 143, 143)",
        rosybrown1: "rgb(255, 193, 193)",
        rosybrown2: "rgb(238, 180, 180)",
        rosybrown3: "rgb(205, 155, 155)",
        rosybrown4: "rgb(139, 105, 105)",
        royalblue: "rgb(65, 105, 225)",
        royalblue1: "rgb(72, 118, 255)",
        royalblue2: "rgb(67, 110, 238)",
        royalblue3: "rgb(58, 95, 205)",
        royalblue4: "rgb(39, 64, 139)",
        saddlebrown: "rgb(139, 69, 19)",
        salmon: "rgb(250, 128, 114)",
        salmon1: "rgb(255, 140, 105)",
        salmon2: "rgb(238, 130, 98)",
        salmon3: "rgb(205, 112, 84)",
        salmon4: "rgb(139, 76, 57)",
        sandybrown: "rgb(244, 164, 96)",
        seagreen: "rgb(46, 139, 87)",
        seagreen1: "rgb(84, 255, 159)",
        seagreen2: "rgb(78, 238, 148)",
        seagreen3: "rgb(67, 205, 128)",
        seagreen4: "rgb(46, 139, 87)",
        seashell: "rgb(255, 245, 238)",
        seashell1: "rgb(255, 245, 238)",
        seashell2: "rgb(238, 229, 222)",
        seashell3: "rgb(205, 197, 191)",
        seashell4: "rgb(139, 134, 130)",
        sienna: "rgb(160, 82, 45)",
        sienna1: "rgb(255, 130, 71)",
        sienna2: "rgb(238, 121, 66)",
        sienna3: "rgb(205, 104, 57)",
        sienna4: "rgb(139, 71, 38)",
        skyblue: "rgb(135, 206, 235)",
        skyblue1: "rgb(135, 206, 255)",
        skyblue2: "rgb(126, 192, 238)",
        skyblue3: "rgb(108, 166, 205)",
        skyblue4: "rgb(74, 112, 139)",
        slateblue: "rgb(106, 90, 205)",
        slateblue1: "rgb(131, 111, 255)",
        slateblue2: "rgb(122, 103, 238)",
        slateblue3: "rgb(105, 89, 205)",
        slateblue4: "rgb(71, 60, 139)",
        slategray: "rgb(112, 128, 144)",
        slategray1: "rgb(198, 226, 255)",
        slategray2: "rgb(185, 211, 238)",
        slategray3: "rgb(159, 182, 205)",
        slategray4: "rgb(108, 123, 139)",
        slategrey: "rgb(112, 128, 144)",
        snow: "rgb(255, 250, 250)",
        snow1: "rgb(255, 250, 250)",
        snow2: "rgb(238, 233, 233)",
        snow3: "rgb(205, 201, 201)",
        snow4: "rgb(139, 137, 137)",
        springgreen: "rgb(0, 255, 127)",
        springgreen1: "rgb(0, 255, 127)",
        springgreen2: "rgb(0, 238, 118)",
        springgreen3: "rgb(0, 205, 102)",
        springgreen4: "rgb(0, 139, 69)",
        steelblue: "rgb(70, 130, 180)",
        steelblue1: "rgb(99, 184, 255)",
        steelblue2: "rgb(92, 172, 238)",
        steelblue3: "rgb(79, 148, 205)",
        steelblue4: "rgb(54, 100, 139)",
        tan: "rgb(210, 180, 140)",
        tan1: "rgb(255, 165, 79)",
        tan2: "rgb(238, 154, 73)",
        tan3: "rgb(205, 133, 63)",
        tan4: "rgb(139, 90, 43)",
        thistle: "rgb(216, 191, 216)",
        thistle1: "rgb(255, 225, 255)",
        thistle2: "rgb(238, 210, 238)",
        thistle3: "rgb(205, 181, 205)",
        thistle4: "rgb(139, 123, 139)",
        tomato: "rgb(255, 99, 71)",
        tomato1: "rgb(255, 99, 71)",
        tomato2: "rgb(238, 92, 66)",
        tomato3: "rgb(205, 79, 57)",
        tomato4: "rgb(139, 54, 38)",
        turquoise: "rgb(64, 224, 208)",
        turquoise1: "rgb(0, 245, 255)",
        turquoise2: "rgb(0, 229, 238)",
        turquoise3: "rgb(0, 197, 205)",
        turquoise4: "rgb(0, 134, 139)",
        violet: "rgb(238, 130, 238)",
        violetred: "rgb(208, 32, 144)",
        violetred1: "rgb(255, 62, 150)",
        violetred2: "rgb(238, 58, 140)",
        violetred3: "rgb(205, 50, 120)",
        violetred4: "rgb(139, 34, 82)",
        wheat: "rgb(245, 222, 179)",
        wheat1: "rgb(255, 231, 186)",
        wheat2: "rgb(238, 216, 174)",
        wheat3: "rgb(205, 186, 150)",
        wheat4: "rgb(139, 126, 102)",
        white: "rgb(255, 255, 255)",
        whitesmoke: "rgb(245, 245, 245)",
        yellow: "rgb(255, 255, 0)",
        yellow1: "rgb(255, 255, 0)",
        yellow2: "rgb(238, 238, 0)",
        yellow3: "rgb(205, 205, 0)",
        yellow4: "rgb(139, 139, 0)",
        yellowgreen: "rgb(154, 205, 50)"
    }, i.f = {}, i.f.createEnum = function (e) {
        return new String(e)
    }, i.f.replaceVars = function (e, t) {
        return e.replace(/%([a-z]*)\(([^\)]+)\)/gi, function (e, r, o) {
            if (void 0 === t[o]) throw "Unknown variable: " + o;
            var s = t[o];
            if (r in i.f.replaceVars.functions) s = i.f.replaceVars.functions[r](s);
            else if (r) throw "Unknown escape function: " + r;
            return s
        })
    }, i.f.replaceVars.functions = {
        encodeURI: encodeURI,
        encodeURIComponent: encodeURIComponent,
        escapeHTML: function (e) {
            var t = {
                "<": "&lt;",
                ">": "&gt;",
                "&": "&amp;",
                '"': "&quot;",
                "'": "&#39;"
            };
            return e.replace(/[<>&\"\']/g, function (e) {
                return t[e]
            })
        }
    }, i.f.getAcceptLanguages = function (e) {
        i.f.getAcceptLanguages.chromeSupported() ? chrome.i18n.getAcceptLanguages(e) : setTimeout(function () {
            e([navigator.language.replace(/-/g, "_")])
        }, 0)
    }, i.f.getAcceptLanguages.chromeSupported = function () {
        return window.chrome && chrome.i18n
    }, i.f.parseQuery = function (e) {
        e.startsWith("?") && (e = e.substr(1));
        for (var t = {}, r = e.split("&"), i = 0; i < r.length; i++) {
            var o = r[i].split("=");
            t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
        }
        return t
    }, i.f.getURL = function (e) {
        return i.f.getURL.chromeSupported() ? chrome.runtime.getURL(e) : e
    }, i.f.getURL.chromeSupported = function () {
        return window.chrome && chrome.runtime && chrome.runtime.getURL
    }, i.f.clamp = function (e, t, r) {
        return e < t ? t : e > r ? r : e
    }, i.f.zpad = function (e, t) {
        return String(e).padStart(t, "0")
    }, i.f.getWhitespace = function (e) {
        if (e <= 0) return "";
        var t = this.getWhitespace;
        for (t.whitespace || (t.whitespace = "          "); e > t.whitespace.length;) t.whitespace += t.whitespace;
        return t.whitespace.substr(0, e)
    }, i.f.alarm = function (e, t) {
        var r = t || 5e3,
            o = i.f.getStack(1);
        return function () {
            var t = setTimeout(function () {
                    var i = "string" == typeof e ? i : e.name;
                    i = i ? ": " + i : "", console.warn("lib.f.alarm: timeout expired: " + r / 1e3 + "s" + i), console.log(o), t = null
                }, r),
                i = function (e) {
                    return function () {
                        return t && (clearTimeout(t), t = null), e.apply(null, arguments)
                    }
                };
            return "string" == typeof e ? i : i(e)
        }()
    }, i.f.getStack = function (e) {
        var t, r = e ? e + 2 : 2;
        try {
            throw new Error
        } catch (e) {
            t = e.stack.split("\n")
        }
        for (var i = {}, o = r; o < t.length; o++) i[o - r] = t[o].replace(/^\s*at\s+/, "");
        return i
    }, i.f.smartFloorDivide = function (e, t) {
        var r = e / t,
            i = Math.ceil(r);
        return i - r < 1e-4 ? i : Math.floor(r)
    }, i.f.randomInt = function (e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }, i.MessageManager = function (e) {
        this.languages_ = e.map(function (e) {
            return e.replace(/-/g, "_")
        }), -1 == this.languages_.indexOf("en") && this.languages_.unshift("en"), this.messages = {}
    }, i.MessageManager.prototype.addMessages = function (e) {
        for (var t in e) {
            var r = e[t];
            r.placeholders ? this.messages[t] = r.message.replace(/\$([a-z][^\s\$]+)\$/gi, function (r, i) {
                return e[t].placeholders[i.toLowerCase()].content
            }) : this.messages[t] = r.message
        }
    }, i.MessageManager.prototype.findAndLoadMessages = function (e, t) {
        function r(e) {
            e ? o = i.shift() : s = i.shift(), i.length ? n() : t(o, s)
        }
        var i = this.languages_.concat(),
            o = [],
            s = [],
            n = function () {
                this.loadMessages(this.replaceReferences(e, i), r.bind(this, !0), r.bind(this, !1))
            }.bind(this);
        n()
    }, i.MessageManager.prototype.loadMessages = function (e, t, r) {
        var i = new XMLHttpRequest;
        i.onloadend = function () {
            200 == i.status ? (this.addMessages(JSON.parse(i.responseText)), t()) : r && r(i.status)
        }.bind(this), i.open("GET", e), i.send()
    }, i.MessageManager.replaceReferences = function (e, t) {
        return e.replace(/\$(\d+)/g, function (e, r) {
            return t[r - 1]
        })
    }, i.MessageManager.prototype.replaceReferences = i.MessageManager.replaceReferences, i.MessageManager.prototype.get = function (e, t, r) {
        var i;
        if (e in this.messages) i = this.messages[e];
        else if (window.chrome.i18n && (i = chrome.i18n.getMessage(e)), !i) return console.warn("Unknown message: " + e), void 0 === r ? e : r;
        return t ? (t instanceof Array || (t = [t]), this.replaceReferences(i, t)) : i
    }, i.MessageManager.prototype.processI18nAttributes = function (e) {
        for (var t = e.querySelectorAll("[i18n]"), r = 0; r < t.length; r++) this.processI18nAttribute(t[r])
    }, i.MessageManager.prototype.processI18nAttribute = function (e) {
        var t = e.getAttribute("i18n");
        if (t) {
            try {
                t = JSON.parse(t)
            } catch (r) {
                throw console.error("Can't parse " + e.tagName + "#" + e.id + ": " + t), r
            }
            for (var r in t) {
                var i = r,
                    o = t[r];
                o.startsWith("=") && (o = t[r = o.substr(1)]), o.startsWith("$") && (o = function (e) {
                    return e.replace(/-/g, "_").toUpperCase()
                }(e.getAttribute(o.substr(1)) + "_" + r));
                var s = this.get(o);
                "_" == i ? e.textContent = s : e.setAttribute(i, s)
            }
        }
    }, i.PreferenceManager = function (e, t) {
        this.storage = e, this.storageObserver_ = this.onStorageChange_.bind(this), this.isActive_ = !1, this.activate(), this.trace = !1;
        var r = t || "/";
        r.endsWith("/") || (r += "/"), this.prefix = r, this.prefRecords_ = {}, this.globalObservers_ = [], this.childFactories_ = {}, this.childLists_ = {}
    }, i.PreferenceManager.prototype.DEFAULT_VALUE = i.f.createEnum("DEFAULT"), i.PreferenceManager.Record = function (e, t) {
        this.name = e, this.defaultValue = t, this.currentValue = this.DEFAULT_VALUE, this.observers = []
    }, i.PreferenceManager.Record.prototype.DEFAULT_VALUE = i.PreferenceManager.prototype.DEFAULT_VALUE, i.PreferenceManager.Record.prototype.addObserver = function (e) {
        this.observers.push(e)
    }, i.PreferenceManager.Record.prototype.removeObserver = function (e) {
        var t = this.observers.indexOf(e);
        t >= 0 && this.observers.splice(t, 1)
    }, i.PreferenceManager.Record.prototype.get = function () {
        return this.currentValue === this.DEFAULT_VALUE ? /^(string|number)$/.test(typeof this.defaultValue) ? this.defaultValue : "object" == typeof this.defaultValue ? JSON.parse(JSON.stringify(this.defaultValue)) : this.defaultValue : this.currentValue
    }, i.PreferenceManager.prototype.deactivate = function () {
        if (!this.isActive_) throw new Error("Not activated");
        this.isActive_ = !1, this.storage.removeObserver(this.storageObserver_)
    }, i.PreferenceManager.prototype.activate = function () {
        if (this.isActive_) throw new Error("Already activated");
        this.isActive_ = !0, this.storage.addObserver(this.storageObserver_)
    }, i.PreferenceManager.prototype.readStorage = function (e) {
        function t() {
            0 == --r && e && e()
        }
        var r = 0,
            i = Object.keys(this.prefRecords_).map(function (e) {
                return this.prefix + e
            }.bind(this));
        this.trace && console.log("Preferences read: " + this.prefix), this.storage.getItems(i, function (i) {
            var o = this.prefix.length;
            for (var s in i) {
                var n = i[s],
                    a = s.substr(o),
                    l = a in this.childLists_ && JSON.stringify(n) != JSON.stringify(this.prefRecords_[a].currentValue);
                this.prefRecords_[a].currentValue = n, l && (r++, this.syncChildList(a, t))
            }
            0 == r && e && setTimeout(e)
        }.bind(this))
    }, i.PreferenceManager.prototype.definePreference = function (e, t, r) {
        var o = this.prefRecords_[e];
        o ? this.changeDefault(e, t) : o = this.prefRecords_[e] = new i.PreferenceManager.Record(e, t), r && o.addObserver(r)
    }, i.PreferenceManager.prototype.definePreferences = function (e) {
        for (var t = 0; t < e.length; t++) this.definePreference(e[t][0], e[t][1], e[t][2])
    }, i.PreferenceManager.prototype.defineChildren = function (e, t) {
        this.definePreference(e, [], this.onChildListChange_.bind(this, e)), this.childFactories_[e] = t, this.childLists_[e] = {}
    }, i.PreferenceManager.prototype.addObservers = function (e, t) {
        if (e && "function" != typeof e) throw new Error("Invalid param: globals");
        if (e && this.globalObservers_.push(e), t)
            for (var r in t) {
                if (!(r in this.prefRecords_)) throw new Error("Unknown preference: " + r);
                this.prefRecords_[r].addObserver(t[r])
            }
    }, i.PreferenceManager.prototype.notifyAll = function () {
        for (var e in this.prefRecords_) this.notifyChange_(e)
    }, i.PreferenceManager.prototype.notifyChange_ = function (e) {
        var t = this.prefRecords_[e];
        if (!t) throw new Error("Unknown preference: " + e);
        for (var r = t.get(), i = 0; i < this.globalObservers_.length; i++) this.globalObservers_[i](e, r);
        for (i = 0; i < t.observers.length; i++) t.observers[i](r, e, this)
    }, i.PreferenceManager.prototype.createChild = function (e, t, r) {
        var o, s = this.get(e);
        if (r) {
            if (o = r, -1 != s.indexOf(o)) throw new Error("Duplicate child: " + e + ": " + o)
        } else
            for (; !o || -1 != s.indexOf(o);) o = i.f.randomInt(1, 65535).toString(16), o = i.f.zpad(o, 4), t && (o = t + ":" + o);
        var n = this.childFactories_[e](this, o);
        return n.trace = this.trace, n.resetAll(), this.childLists_[e][o] = n, s.push(o), this.set(e, s), n
    }, i.PreferenceManager.prototype.removeChild = function (e, t) {
        this.getChild(e, t).resetAll();
        var r = this.get(e),
            i = r.indexOf(t); - 1 != i && (r.splice(i, 1), this.set(e, r)), delete this.childLists_[e][t]
    }, i.PreferenceManager.prototype.getChild = function (e, t, r) {
        if (!(e in this.childLists_)) throw new Error("Unknown child list: " + e);
        var i = this.childLists_[e];
        if (!(t in i)) {
            if (void 0 === r) throw new Error('Unknown "' + e + '" child: ' + t);
            return r
        }
        return i[t]
    }, i.PreferenceManager.diffChildLists = function (e, t) {
        for (var r = {
                added: {},
                removed: {},
                common: {}
            }, i = 0; i < e.length; i++) - 1 != t.indexOf(e[i]) ? r.common[e[i]] = !0 : r.added[e[i]] = !0;
        for (i = 0; i < t.length; i++) t[i] in r.added || t[i] in r.common || (r.removed[t[i]] = !0);
        return r
    }, i.PreferenceManager.prototype.syncChildList = function (e, t) {
        for (var r = 0, o = this.get(e), s = Object.keys(this.childLists_[e]), n = (i.PreferenceManager.diffChildLists(o, s), 0); n < o.length; n++) {
            var a = o[n],
                l = s.indexOf(a);
            if (l >= 0 && s.splice(l, 1), !this.childLists_[e][a]) {
                var h = this.childFactories_[e](this, a);
                if (!h) {
                    console.warn("Unable to restore child: " + e + ": " + a);
                    continue
                }
                h.trace = this.trace, this.childLists_[e][a] = h, r++, h.readStorage(function () {
                    0 == --r && t && t()
                })
            }
        }
        for (n = 0; n < s.length; n++) delete this.childLists_[e][s[n]];
        !r && t && setTimeout(t)
    }, i.PreferenceManager.prototype.reset = function (e) {
        var t = this.prefRecords_[e];
        if (!t) throw new Error("Unknown preference: " + e);
        this.storage.removeItem(this.prefix + e), t.currentValue !== this.DEFAULT_VALUE && (t.currentValue = this.DEFAULT_VALUE, this.notifyChange_(e))
    }, i.PreferenceManager.prototype.resetAll = function () {
        var e = [];
        for (var t in this.childLists_) {
            var r = this.childLists_[t];
            for (var i in r) r[i].resetAll()
        }
        for (var o in this.prefRecords_) this.prefRecords_[o].currentValue !== this.DEFAULT_VALUE && (this.prefRecords_[o].currentValue = this.DEFAULT_VALUE, e.push(o));
        var s = Object.keys(this.prefRecords_).map(function (e) {
            return this.prefix + e
        }.bind(this));
        this.storage.removeItems(s), e.forEach(this.notifyChange_.bind(this))
    }, i.PreferenceManager.prototype.diff = function (e, t) {
        return typeof e != typeof t || !/^(undefined|boolean|number|string)$/.test(typeof e) || e !== t
    }, i.PreferenceManager.prototype.changeDefault = function (e, t) {
        var r = this.prefRecords_[e];
        if (!r) throw new Error("Unknown preference: " + e);
        this.diff(r.defaultValue, t) && (r.currentValue === this.DEFAULT_VALUE ? (r.defaultValue = t, this.notifyChange_(e)) : r.defaultValue = t)
    }, i.PreferenceManager.prototype.changeDefaults = function (e) {
        for (var t in e) this.changeDefault(t, e[t])
    }, i.PreferenceManager.prototype.set = function (e, t) {
        var r = this.prefRecords_[e];
        if (!r) throw new Error("Unknown preference: " + e);
        var i = r.get();
        this.diff(i, t) && (this.diff(r.defaultValue, t) ? (r.currentValue = t, this.storage.setItem(this.prefix + e, t)) : (r.currentValue = this.DEFAULT_VALUE, this.storage.removeItem(this.prefix + e)), setTimeout(this.notifyChange_.bind(this, e), 0))
    }, i.PreferenceManager.prototype.get = function (e) {
        var t = this.prefRecords_[e];
        if (!t) throw new Error("Unknown preference: " + e);
        return t.get()
    }, i.PreferenceManager.prototype.exportAsJson = function () {
        var e = {};
        for (var t in this.prefRecords_)
            if (t in this.childLists_) {
                e[t] = [];
                for (var r = this.get(t), i = 0; i < r.length; i++) {
                    var o = r[i];
                    e[t].push({
                        id: o,
                        json: this.getChild(t, o).exportAsJson()
                    })
                }
            } else {
                var s = this.prefRecords_[t];
                s.currentValue != this.DEFAULT_VALUE && (e[t] = s.currentValue)
            }
        return e
    }, i.PreferenceManager.prototype.importFromJson = function (e) {
        for (var t in e)
            if (t in this.childLists_)
                for (var r = e[t], i = 0; i < r.length; i++) {
                    var o = r[i].id,
                        s = this.childLists_[t][o];
                    s || (s = this.createChild(t, null, o)), s.importFromJson(r[i].json)
                } else this.set(t, e[t])
    }, i.PreferenceManager.prototype.onChildListChange_ = function (e) {
        this.syncChildList(e)
    }, i.PreferenceManager.prototype.onStorageChange_ = function (e) {
        for (var t in e)
            if (!this.prefix || 0 == t.lastIndexOf(this.prefix, 0)) {
                var r = t.substr(this.prefix.length);
                if (r in this.prefRecords_) {
                    var i = this.prefRecords_[r],
                        o = e[t].newValue,
                        s = i.currentValue;
                    s === i.DEFAULT_VALUE && (s = void 0), this.diff(s, o) && (i.currentValue = void 0 === o || null === o ? i.DEFAULT_VALUE : o, this.notifyChange_(r))
                }
            }
    }, i.resource = {
        resources_: {}
    }, i.resource.add = function (e, t, r) {
        i.resource.resources_[e] = {
            type: t,
            name: e,
            data: r
        }
    }, i.resource.get = function (e, t) {
        if (!(e in i.resource.resources_)) {
            if (void 0 === t) throw "Unknown resource: " + e;
            return t
        }
        return i.resource.resources_[e]
    }, i.resource.getData = function (e, t) {
        if (!(e in i.resource.resources_)) {
            if (void 0 === t) throw "Unknown resource: " + e;
            return t
        }
        return i.resource.resources_[e].data
    }, i.resource.getDataUrl = function (e, t) {
        var r = i.resource.get(e, t);
        return "data:" + r.type + "," + r.data
    }, i.Storage = new Object, i.Storage.Chrome = function (e) {
        this.storage_ = e, this.observers_ = [], chrome.storage.onChanged.addListener(this.onChanged_.bind(this))
    }, i.Storage.Chrome.prototype.onChanged_ = function (e, t) {
        if (chrome.storage[t] == this.storage_)
            for (var r = 0; r < this.observers_.length; r++) this.observers_[r](e)
    }, i.Storage.Chrome.prototype.addObserver = function (e) {
        this.observers_.push(e)
    }, i.Storage.Chrome.prototype.removeObserver = function (e) {
        var t = this.observers_.indexOf(e); - 1 != t && this.observers_.splice(t, 1)
    }, i.Storage.Chrome.prototype.clear = function (e) {
        this.storage_.clear(), e && setTimeout(e, 0)
    }, i.Storage.Chrome.prototype.getItem = function (e, t) {
        this.storage_.get(e, t)
    }, i.Storage.Chrome.prototype.getItems = function (e, t) {
        this.storage_.get(e, t)
    }, i.Storage.Chrome.prototype.setItem = function (e, t, r) {
        var i = {};
        i[e] = t, this.storage_.set(i, r)
    }, i.Storage.Chrome.prototype.setItems = function (e, t) {
        this.storage_.set(e, t)
    }, i.Storage.Chrome.prototype.removeItem = function (e, t) {
        this.storage_.remove(e, t)
    }, i.Storage.Chrome.prototype.removeItems = function (e, t) {
        this.storage_.remove(e, t)
    }, i.Storage.Local = function () {
        this.observers_ = [], this.storage_ = window.localStorage, window.addEventListener("storage", this.onStorage_.bind(this))
    }, i.Storage.Local.prototype.onStorage_ = function (e) {
        if (e.storageArea == this.storage_) {
            var t = e.oldValue ? JSON.parse(e.oldValue) : e.oldValue,
                r = e.newValue ? JSON.parse(e.newValue) : e.newValue,
                i = {};
            i[e.key] = {
                oldValue: t,
                newValue: r
            };
            for (var o = 0; o < this.observers_.length; o++) this.observers_[o](i)
        }
    }, i.Storage.Local.prototype.addObserver = function (e) {
        this.observers_.push(e)
    }, i.Storage.Local.prototype.removeObserver = function (e) {
        var t = this.observers_.indexOf(e); - 1 != t && this.observers_.splice(t, 1)
    }, i.Storage.Local.prototype.clear = function (e) {
        this.storage_.clear(), e && setTimeout(e, 0)
    }, i.Storage.Local.prototype.getItem = function (e, t) {
        var r = this.storage_.getItem(e);
        if ("string" == typeof r) try {
            r = JSON.parse(r)
        } catch (e) {}
        setTimeout(t.bind(null, r), 0)
    }, i.Storage.Local.prototype.getItems = function (e, t) {
        for (var r = {}, i = e.length - 1; i >= 0; i--) {
            var o = e[i],
                s = this.storage_.getItem(o);
            if ("string" == typeof s) try {
                r[o] = JSON.parse(s)
            } catch (e) {
                r[o] = s
            } else e.splice(i, 1)
        }
        setTimeout(t.bind(null, r), 0)
    }, i.Storage.Local.prototype.setItem = function (e, t, r) {
        this.storage_.setItem(e, JSON.stringify(t)), r && setTimeout(r, 0)
    }, i.Storage.Local.prototype.setItems = function (e, t) {
        for (var r in e) this.storage_.setItem(r, JSON.stringify(e[r]));
        t && setTimeout(t, 0)
    }, i.Storage.Local.prototype.removeItem = function (e, t) {
        this.storage_.removeItem(e), t && setTimeout(t, 0)
    }, i.Storage.Local.prototype.removeItems = function (e, t) {
        for (var r = 0; r < e.length; r++) this.storage_.removeItem(e[r]);
        t && setTimeout(t, 0)
    }, i.Storage.Memory = function () {
        this.observers_ = [], this.storage_ = {}
    }, i.Storage.Memory.prototype.addObserver = function (e) {
        this.observers_.push(e)
    }, i.Storage.Memory.prototype.removeObserver = function (e) {
        var t = this.observers_.indexOf(e); - 1 != t && this.observers_.splice(t, 1)
    }, i.Storage.Memory.prototype.clear = function (e) {
        var t = {};
        for (var r in this.storage_) t[r] = {
            oldValue: this.storage_[r],
            newValue: void 0
        };
        this.storage_ = {}, setTimeout(function () {
            for (var e = 0; e < this.observers_.length; e++) this.observers_[e](t)
        }.bind(this), 0), e && setTimeout(e, 0)
    }, i.Storage.Memory.prototype.getItem = function (e, t) {
        var r = this.storage_[e];
        if ("string" == typeof r) try {
            r = JSON.parse(r)
        } catch (e) {}
        setTimeout(t.bind(null, r), 0)
    }, i.Storage.Memory.prototype.getItems = function (e, t) {
        for (var r = {}, i = e.length - 1; i >= 0; i--) {
            var o = e[i],
                s = this.storage_[o];
            if ("string" == typeof s) try {
                r[o] = JSON.parse(s)
            } catch (e) {
                r[o] = s
            } else e.splice(i, 1)
        }
        setTimeout(t.bind(null, r), 0)
    }, i.Storage.Memory.prototype.setItem = function (e, t, r) {
        var i = this.storage_[e];
        this.storage_[e] = JSON.stringify(t);
        var o = {};
        o[e] = {
            oldValue: i,
            newValue: t
        }, setTimeout(function () {
            for (var e = 0; e < this.observers_.length; e++) this.observers_[e](o)
        }.bind(this), 0), r && setTimeout(r, 0)
    }, i.Storage.Memory.prototype.setItems = function (e, t) {
        var r = {};
        for (var i in e) r[i] = {
            oldValue: this.storage_[i],
            newValue: e[i]
        }, this.storage_[i] = JSON.stringify(e[i]);
        setTimeout(function () {
            for (var e = 0; e < this.observers_.length; e++) this.observers_[e](r)
        }.bind(this)), t && setTimeout(t, 0)
    }, i.Storage.Memory.prototype.removeItem = function (e, t) {
        delete this.storage_[e], t && setTimeout(t, 0)
    }, i.Storage.Memory.prototype.removeItems = function (e, t) {
        for (var r = 0; r < e.length; r++) delete this.storage_[e[r]];
        t && setTimeout(t, 0)
    }, i.TestManager = function (e) {
        this.log = e || new i.TestManager.Log
    }, i.TestManager.prototype.createTestRun = function (e) {
        return new i.TestManager.TestRun(this, e)
    }, i.TestManager.prototype.onTestRunComplete = function (e) {}, i.TestManager.prototype.testPreamble = function (e, t) {}, i.TestManager.prototype.testPostamble = function (e, t) {}, i.TestManager.Log = function (e = console) {
        this.save = !1, this.data = "", this.prefix_ = "", this.prefixStack_ = 0, this.console_ = e, ["log", "debug", "info", "warn", "error"].forEach(e => {
            let t = "";
            switch (e) {
                case "debug":
                case "warn":
                case "error":
                    t = e.toUpperCase() + ": "
            }
            const r = this.console_[e];
            this[e] = this.console_[e] = ((...e) => {
                this.save && (this.data += this.prefix_ + t + e.join(" ") + "\n"), r.apply(this.console_, e)
            })
        }), ["group", "groupCollapsed"].forEach(e => {
            const t = this.console_[e];
            this[e] = this.console_[e] = ((e = "") => {
                t(e), this.save && (this.data += this.prefix_ + e + "\n"), this.prefix_ = "  ".repeat(++this.prefixStack_)
            })
        });
        const t = this.console_.groupEnd;
        this.groupEnd = this.console_.groupEnd = (() => {
            t(), this.prefix_ = "  ".repeat(--this.prefixStack_)
        })
    }, i.TestManager.Suite = function (e) {
        function t(t, r) {
            this.testManager_ = t, this.suiteName = e, this.setup(r)
        }
        return t.suiteName = e, t.addTest = i.TestManager.Suite.addTest, t.disableTest = i.TestManager.Suite.disableTest, t.getTest = i.TestManager.Suite.getTest, t.getTestList = i.TestManager.Suite.getTestList, t.testList_ = [], t.testMap_ = {}, t.prototype = Object.create(i.TestManager.Suite.prototype), t.constructor = i.TestManager.Suite, i.TestManager.Suite.subclasses.push(t), t
    }, i.TestManager.Suite.subclasses = [], i.TestManager.Suite.addTest = function (e, t) {
        if (e in this.testMap_) throw "Duplicate test name: " + e;
        var r = new i.TestManager.Test(this, e, t);
        this.testMap_[e] = r, this.testList_.push(r)
    }, i.TestManager.Suite.disableTest = function (e, t) {
        if (e in this.testMap_) throw "Duplicate test name: " + e;
        var r = new i.TestManager.Test(this, e, t);
        console.log("Disabled test: " + r.fullName)
    }, i.TestManager.Suite.getTest = function (e) {
        return this.testMap_[e]
    }, i.TestManager.Suite.getTestList = function () {
        return this.testList_
    }, i.TestManager.Suite.prototype.setDefaults = function (e, t) {
        for (var r in t) this[r] = r in e ? e[r] : t[r]
    }, i.TestManager.Suite.prototype.setup = function (e) {}, i.TestManager.Suite.prototype.preamble = function (e, t) {}, i.TestManager.Suite.prototype.postamble = function (e, t) {}, i.TestManager.Test = function (e, t, r) {
        this.suiteClass = e, this.testName = t, this.fullName = e.suiteName + "[" + t + "]", this.testFunction_ = r
    }, i.TestManager.Test.prototype.run = function (e) {
        try {
            this.testFunction_.apply(e.suite, [e, e.testRun.cx])
        } catch (t) {
            if (t instanceof i.TestManager.Result.TestComplete) return;
            e.println("Test raised an exception: " + t), t.stack && (t.stack instanceof Array ? e.println(t.stack.join("\n")) : e.println(t.stack)), e.completeTest_(e.FAILED, !1)
        }
    }, i.TestManager.TestRun = function (e, t) {
        this.testManager = e, this.log = e.log, this.cx = t || {}, this.failures = [], this.passes = [], this.startDate = null, this.duration = null, this.currentResult = null, this.maxFailures = 0, this.panic = !1, this.testQueue_ = []
    }, i.TestManager.TestRun.prototype.ALL_TESTS = i.f.createEnum("<all-tests>"), i.TestManager.TestRun.prototype.selectTest = function (e) {
        this.testQueue_.push(e)
    }, i.TestManager.TestRun.prototype.selectSuite = function (e, t) {
        for (var r = t || this.ALL_TESTS, i = 0, o = e.getTestList(), s = 0; s < o.length; s++) {
            var n = o[s];
            if (r !== this.ALL_TESTS)
                if (r instanceof RegExp) {
                    if (!r.test(n.testName)) continue
                } else if (n.testName != r) continue;
            this.selectTest(n), i++
        }
        return i
    }, i.TestManager.TestRun.prototype.selectPattern = function (e) {
        for (var t = 0, r = 0; r < i.TestManager.Suite.subclasses.length; r++) t += this.selectSuite(i.TestManager.Suite.subclasses[r], e);
        return t || this.log.warn("No tests matched selection criteria: " + e), t
    }, i.TestManager.TestRun.prototype.onUncaughtException_ = function (e, t, r) {
        if (0 == e.indexOf("Uncaught lib.TestManager.Result.TestComplete") || -1 != e.indexOf("status: passed")) return !0;
        if (this.currentResult && e != "Uncaught " + this.currentResult.expectedErrorMessage_) {
            var i = "during";
            return this.currentResult.status != this.currentResult.PENDING && (i = "after"), this.log.error("Uncaught exception " + i + " test case: " + this.currentResult.test.fullName), this.log.error(e + ", " + t + ":" + r), this.currentResult.completeTest_(this.currentResult.FAILED, !1), !1
        }
    }, i.TestManager.TestRun.prototype.onTestRunComplete_ = function (e) {
        e ? (this.duration = new Date - this.startDate, this.log.groupEnd(), this.log.info(this.passes.length + " passed, " + this.failures.length + " failed, " + this.msToSeconds_(this.duration)), this.summarize(), window.onerror = null, this.testManager.onTestRunComplete(this)) : setTimeout(this.onTestRunComplete_.bind(this), 0, !0)
    }, i.TestManager.TestRun.prototype.onResultComplete = function (e) {
        try {
            this.testManager.testPostamble(e, this.cx), e.suite.postamble(e, this.ctx)
        } catch (e) {
            this.log.error("Unexpected exception in postamble: " + (e.stack ? e.stack : e)), this.panic = !0
        }
        if (e.status != e.PASSED ? this.log.error(e.status) : e.duration > 500 && this.log.warn("Slow test took " + this.msToSeconds_(e.duration)), this.log.groupEnd(), e.status == e.FAILED) this.failures.push(e), this.currentSuite = null;
        else {
            if (e.status != e.PASSED) return this.log.error("Unknown result status: " + e.test.fullName + ": " + e.status), this.panic = !0;
            this.passes.push(e)
        }
        this.runNextTest_()
    }, i.TestManager.TestRun.prototype.onResultReComplete = function (e, t) {
        this.log.error("Late complete for test: " + e.test.fullName + ": " + t);
        var r = this.passes.indexOf(e);
        r >= 0 && (this.passes.splice(r, 1), this.failures.push(e))
    }, i.TestManager.TestRun.prototype.runNextTest_ = function () {
        if (this.panic || !this.testQueue_.length) return this.onTestRunComplete_();
        if (this.maxFailures && this.failures.length >= this.maxFailures) return this.log.error("Maximum failure count reached, aborting test run."), this.onTestRunComplete_();
        var e = this.testQueue_[0],
            t = this.currentResult ? this.currentResult.suite : null;
        try {
            t && t instanceof e.suiteClass || (t && this.log.groupEnd(), this.log.group(e.suiteClass.suiteName), t = new e.suiteClass(this.testManager, this.cx))
        } catch (e) {
            return this.log.error("Exception during setup: " + (e.stack ? e.stack : e)), this.panic = !0, void this.onTestRunComplete_()
        }
        try {
            this.log.group(e.testName), this.currentResult = new i.TestManager.Result(this, t, e), this.testManager.testPreamble(this.currentResult, this.cx), t.preamble(this.currentResult, this.cx), this.testQueue_.shift()
        } catch (e) {
            return this.log.error("Unexpected exception during test preamble: " + (e.stack ? e.stack : e)), this.log.groupEnd(), this.panic = !0, void this.onTestRunComplete_()
        }
        try {
            this.currentResult.run()
        } catch (e) {
            this.log.error("Unexpected exception during test run: " + (e.stack ? e.stack : e)), this.panic = !0
        }
    }, i.TestManager.TestRun.prototype.run = function () {
        this.log.info("Running " + this.testQueue_.length + " test(s)"), window.onerror = this.onUncaughtException_.bind(this), this.startDate = new Date, this.runNextTest_()
    }, i.TestManager.TestRun.prototype.msToSeconds_ = function (e) {
        return (e / 1e3).toFixed(2) + "s"
    }, i.TestManager.TestRun.prototype.summarize = function () {
        if (this.failures.length)
            for (var e = 0; e < this.failures.length; e++) this.log.error("FAILED: " + this.failures[e].test.fullName);
        this.testQueue_.length && this.log.warn("Test run incomplete: " + this.testQueue_.length + " test(s) were not run.")
    }, i.TestManager.Result = function (e, t, r) {
        this.testRun = e, this.suite = t, this.test = r, this.startDate = null, this.duration = null, this.status = this.PENDING, this.expectedErrorMessage_ = null
    }, i.TestManager.Result.prototype.PENDING = "pending", i.TestManager.Result.prototype.FAILED = "FAILED", i.TestManager.Result.prototype.PASSED = "passed", i.TestManager.Result.TestComplete = function (e) {
        this.result = e
    }, i.TestManager.Result.TestComplete.prototype.toString = function () {
        return "lib.TestManager.Result.TestComplete: " + this.result.test.fullName + ", status: " + this.result.status
    }, i.TestManager.Result.prototype.run = function () {
        this.startDate = new Date, this.test.run(this), this.status != this.PENDING || this.timeout_ || (this.println("Test did not return a value and did not request more time."), this.completeTest_(this.FAILED, !1))
    }, i.TestManager.Result.prototype.expectErrorMessage = function (e) {
        this.expectedErrorMessage_ = e
    }, i.TestManager.Result.prototype.onTimeout_ = function () {
        this.timeout_ = null, this.status == this.PENDING && (this.println("Test timed out."), this.completeTest_(this.FAILED, !1))
    }, i.TestManager.Result.prototype.requestTime = function (e) {
        this.timeout_ && clearTimeout(this.timeout_), this.timeout_ = setTimeout(this.onTimeout_.bind(this), e)
    }, i.TestManager.Result.prototype.completeTest_ = function (e, t) {
        if (this.status == this.PENDING ? (this.duration = new Date - this.startDate, this.status = e, this.testRun.onResultComplete(this)) : this.testRun.onResultReComplete(this, e), arguments.length < 2 || t) throw new i.TestManager.Result.TestComplete(this)
    }, i.TestManager.Result.prototype.arrayEQ_ = function (e, t) {
        if (!e || !t) return !e && !t;
        if (e.length != t.length) return !1;
        for (var r = 0; r < e.length; ++r)
            if (e[r] != t[r]) return !1;
        return !0
    }, i.TestManager.Result.prototype.assertEQ = function (e, t, r) {
        function i(e) {
            if ("number" == typeof e) return e;
            var t = String(e).split("\n").map(function (e) {
                return JSON.stringify(e)
            });
            return t.length > 1 ? "\n" + t.join("\n") : t.join("\n")
        }
        if (e !== t && !(t instanceof Array && this.arrayEQ_(e, t))) {
            var o = r ? "[" + r + "]" : "";
            this.fail("assertEQ" + o + ": " + this.getCallerLocation_(1) + ": " + i(e) + " !== " + i(t))
        }
    }, i.TestManager.Result.prototype.assert = function (e, t) {
        if (!0 !== e) {
            var r = t ? "[" + t + "]" : "";
            this.fail("assert" + r + ": " + this.getCallerLocation_(1) + ": " + String(e))
        }
    }, i.TestManager.Result.prototype.getCallerLocation_ = function (e) {
        try {
            throw new Error
        } catch (r) {
            var t = r.stack.split("\n")[e + 2].match(/([^/]+:\d+):\d+\)?$/);
            return t ? t[1] : "???"
        }
    }, i.TestManager.Result.prototype.println = function (e) {
        this.testRun.log.info(e)
    }, i.TestManager.Result.prototype.fail = function (e) {
        arguments.length && this.println(e), this.completeTest_(this.FAILED, !0)
    }, i.TestManager.Result.prototype.pass = function () {
        this.completeTest_(this.PASSED, !0)
    }, i.UTF8Decoder = function () {
        this.bytesLeft = 0, this.codePoint = 0, this.lowerBound = 0
    }, i.UTF8Decoder.prototype.decode = function (e) {
        for (var t = "", r = 0; r < e.length; r++) {
            var i = e.charCodeAt(r);
            if (0 == this.bytesLeft) i <= 127 ? t += e.charAt(r) : 192 <= i && i <= 223 ? (this.codePoint = i - 192, this.bytesLeft = 1, this.lowerBound = 128) : 224 <= i && i <= 239 ? (this.codePoint = i - 224, this.bytesLeft = 2, this.lowerBound = 2048) : 240 <= i && i <= 247 ? (this.codePoint = i - 240, this.bytesLeft = 3, this.lowerBound = 65536) : 248 <= i && i <= 251 ? (this.codePoint = i - 248, this.bytesLeft = 4, this.lowerBound = 2097152) : 252 <= i && i <= 253 ? (this.codePoint = i - 252, this.bytesLeft = 5, this.lowerBound = 67108864) : t += "�";
            else if (128 <= i && i <= 191) {
                if (this.bytesLeft--, this.codePoint = (this.codePoint << 6) + (i - 128), 0 == this.bytesLeft) {
                    var o = this.codePoint;
                    o < this.lowerBound || 55296 <= o && o <= 57343 || o > 1114111 ? t += "�" : o < 65536 ? t += String.fromCharCode(o) : (o -= 65536, t += String.fromCharCode(55296 + (o >>> 10 & 1023), 56320 + (1023 & o)))
                }
            } else t += "�", this.bytesLeft = 0, r--
        }
        return t
    }, i.decodeUTF8 = function (e) {
        return (new i.UTF8Decoder).decode(e)
    }, i.encodeUTF8 = function (e) {
        for (var t = "", r = 0; r < e.length; r++) {
            var i = e.charCodeAt(r);
            if (56320 <= i && i <= 57343) i = 65533;
            else if (55296 <= i && i <= 56319)
                if (r + 1 < e.length) {
                    var o = e.charCodeAt(r + 1);
                    56320 <= o && o <= 57343 ? (i = 65536 + ((1023 & i) << 10) + (1023 & o), r++) : i = 65533
                } else i = 65533;
            var s;
            if (i <= 127) t += e.charAt(r);
            else
                for (i <= 2047 ? (t += String.fromCharCode(192 | i >>> 6), s = 1) : i <= 65535 ? (t += String.fromCharCode(224 | i >>> 12), s = 2) : (t += String.fromCharCode(240 | i >>> 18), s = 3); s > 0;) s--, t += String.fromCharCode(128 | i >>> 6 * s & 63)
        }
        return t
    }, i.wc = {}, i.wc.nulWidth = 0, i.wc.controlWidth = 0, i.wc.regardCjkAmbiguous = !1, i.wc.cjkAmbiguousWidth = 2, i.wc.combining = [
        [768, 879],
        [1155, 1158],
        [1160, 1161],
        [1425, 1469],
        [1471, 1471],
        [1473, 1474],
        [1476, 1477],
        [1479, 1479],
        [1536, 1539],
        [1552, 1557],
        [1611, 1630],
        [1648, 1648],
        [1750, 1764],
        [1767, 1768],
        [1770, 1773],
        [1807, 1807],
        [1809, 1809],
        [1840, 1866],
        [1958, 1968],
        [2027, 2035],
        [2305, 2306],
        [2364, 2364],
        [2369, 2376],
        [2381, 2381],
        [2385, 2388],
        [2402, 2403],
        [2433, 2433],
        [2492, 2492],
        [2497, 2500],
        [2509, 2509],
        [2530, 2531],
        [2561, 2562],
        [2620, 2620],
        [2625, 2626],
        [2631, 2632],
        [2635, 2637],
        [2672, 2673],
        [2689, 2690],
        [2748, 2748],
        [2753, 2757],
        [2759, 2760],
        [2765, 2765],
        [2786, 2787],
        [2817, 2817],
        [2876, 2876],
        [2879, 2879],
        [2881, 2883],
        [2893, 2893],
        [2902, 2902],
        [2946, 2946],
        [3008, 3008],
        [3021, 3021],
        [3134, 3136],
        [3142, 3144],
        [3146, 3149],
        [3157, 3158],
        [3260, 3260],
        [3263, 3263],
        [3270, 3270],
        [3276, 3277],
        [3298, 3299],
        [3393, 3395],
        [3405, 3405],
        [3530, 3530],
        [3538, 3540],
        [3542, 3542],
        [3633, 3633],
        [3636, 3642],
        [3655, 3662],
        [3761, 3761],
        [3764, 3769],
        [3771, 3772],
        [3784, 3789],
        [3864, 3865],
        [3893, 3893],
        [3895, 3895],
        [3897, 3897],
        [3953, 3966],
        [3968, 3972],
        [3974, 3975],
        [3984, 3991],
        [3993, 4028],
        [4038, 4038],
        [4141, 4144],
        [4146, 4146],
        [4150, 4151],
        [4153, 4153],
        [4184, 4185],
        [4448, 4607],
        [4959, 4959],
        [5906, 5908],
        [5938, 5940],
        [5970, 5971],
        [6002, 6003],
        [6068, 6069],
        [6071, 6077],
        [6086, 6086],
        [6089, 6099],
        [6109, 6109],
        [6155, 6157],
        [6313, 6313],
        [6432, 6434],
        [6439, 6440],
        [6450, 6450],
        [6457, 6459],
        [6679, 6680],
        [6912, 6915],
        [6964, 6964],
        [6966, 6970],
        [6972, 6972],
        [6978, 6978],
        [7019, 7027],
        [7616, 7626],
        [7678, 7679],
        [8203, 8207],
        [8234, 8238],
        [8288, 8291],
        [8298, 8303],
        [8400, 8431],
        [12330, 12335],
        [12441, 12442],
        [43014, 43014],
        [43019, 43019],
        [43045, 43046],
        [64286, 64286],
        [65024, 65039],
        [65056, 65059],
        [65279, 65279],
        [65529, 65531],
        [68097, 68099],
        [68101, 68102],
        [68108, 68111],
        [68152, 68154],
        [68159, 68159],
        [119143, 119145],
        [119155, 119170],
        [119173, 119179],
        [119210, 119213],
        [119362, 119364],
        [917505, 917505],
        [917536, 917631],
        [917760, 917999]
    ], i.wc.ambiguous = [
        [161, 161],
        [164, 164],
        [167, 168],
        [170, 170],
        [174, 174],
        [176, 180],
        [182, 186],
        [188, 191],
        [198, 198],
        [208, 208],
        [215, 216],
        [222, 225],
        [230, 230],
        [232, 234],
        [236, 237],
        [240, 240],
        [242, 243],
        [247, 250],
        [252, 252],
        [254, 254],
        [257, 257],
        [273, 273],
        [275, 275],
        [283, 283],
        [294, 295],
        [299, 299],
        [305, 307],
        [312, 312],
        [319, 322],
        [324, 324],
        [328, 331],
        [333, 333],
        [338, 339],
        [358, 359],
        [363, 363],
        [462, 462],
        [464, 464],
        [466, 466],
        [468, 468],
        [470, 470],
        [472, 472],
        [474, 474],
        [476, 476],
        [593, 593],
        [609, 609],
        [708, 708],
        [711, 711],
        [713, 715],
        [717, 717],
        [720, 720],
        [728, 731],
        [733, 733],
        [735, 735],
        [913, 929],
        [931, 937],
        [945, 961],
        [963, 969],
        [1025, 1025],
        [1040, 1103],
        [1105, 1105],
        [8208, 8208],
        [8211, 8214],
        [8216, 8217],
        [8220, 8221],
        [8224, 8226],
        [8228, 8231],
        [8240, 8240],
        [8242, 8243],
        [8245, 8245],
        [8251, 8251],
        [8254, 8254],
        [8308, 8308],
        [8319, 8319],
        [8321, 8324],
        [8364, 8364],
        [8451, 8451],
        [8453, 8453],
        [8457, 8457],
        [8467, 8467],
        [8470, 8470],
        [8481, 8482],
        [8486, 8486],
        [8491, 8491],
        [8531, 8532],
        [8539, 8542],
        [8544, 8555],
        [8560, 8569],
        [8592, 8601],
        [8632, 8633],
        [8658, 8658],
        [8660, 8660],
        [8679, 8679],
        [8704, 8704],
        [8706, 8707],
        [8711, 8712],
        [8715, 8715],
        [8719, 8719],
        [8721, 8721],
        [8725, 8725],
        [8730, 8730],
        [8733, 8736],
        [8739, 8739],
        [8741, 8741],
        [8743, 8748],
        [8750, 8750],
        [8756, 8759],
        [8764, 8765],
        [8776, 8776],
        [8780, 8780],
        [8786, 8786],
        [8800, 8801],
        [8804, 8807],
        [8810, 8811],
        [8814, 8815],
        [8834, 8835],
        [8838, 8839],
        [8853, 8853],
        [8857, 8857],
        [8869, 8869],
        [8895, 8895],
        [8978, 8978],
        [9312, 9449],
        [9451, 9547],
        [9552, 9587],
        [9600, 9615],
        [9618, 9621],
        [9632, 9633],
        [9635, 9641],
        [9650, 9651],
        [9654, 9655],
        [9660, 9661],
        [9664, 9665],
        [9670, 9672],
        [9675, 9675],
        [9678, 9681],
        [9698, 9701],
        [9711, 9711],
        [9733, 9734],
        [9737, 9737],
        [9742, 9743],
        [9748, 9749],
        [9756, 9756],
        [9758, 9758],
        [9792, 9792],
        [9794, 9794],
        [9824, 9825],
        [9827, 9829],
        [9831, 9834],
        [9836, 9837],
        [9839, 9839],
        [10045, 10045],
        [10102, 10111],
        [57344, 63743],
        [65533, 65533],
        [983040, 1048573],
        [1048576, 1114109]
    ], i.wc.isSpace = function (e) {
        var t, r = 0,
            o = i.wc.combining.length - 1;
        if (e < i.wc.combining[0][0] || e > i.wc.combining[o][1]) return !1;
        for (; o >= r;)
            if (t = Math.floor((r + o) / 2), e > i.wc.combining[t][1]) r = t + 1;
            else {
                if (!(e < i.wc.combining[t][0])) return !0;
                o = t - 1
            }
        return !1
    }, i.wc.isCjkAmbiguous = function (e) {
        var t, r = 0,
            o = i.wc.ambiguous.length - 1;
        if (e < i.wc.ambiguous[0][0] || e > i.wc.ambiguous[o][1]) return !1;
        for (; o >= r;)
            if (t = Math.floor((r + o) / 2), e > i.wc.ambiguous[t][1]) r = t + 1;
            else {
                if (!(e < i.wc.ambiguous[t][0])) return !0;
                o = t - 1
            }
        return !1
    }, i.wc.charWidth = function (e) {
        return i.wc.regardCjkAmbiguous ? i.wc.charWidthRegardAmbiguous(e) : i.wc.charWidthDisregardAmbiguous(e)
    }, i.wc.charWidthDisregardAmbiguous = function (e) {
        return 0 === e ? i.wc.nulWidth : e < 32 || e >= 127 && e < 160 ? i.wc.controlWidth : e < 127 ? 1 : i.wc.isSpace(e) ? 0 : 1 + (e >= 4352 && (e <= 4447 || 9001 == e || 9002 == e || e >= 11904 && e <= 42191 && 12351 != e || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65135 || e >= 65280 && e <= 65376 || e >= 65504 && e <= 65510 || e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141))
    }, i.wc.charWidthRegardAmbiguous = function (e) {
        return i.wc.isCjkAmbiguous(e) ? i.wc.cjkAmbiguousWidth : i.wc.charWidthDisregardAmbiguous(e)
    }, i.wc.strWidth = function (e) {
        for (var t, r = 0, o = 0; o < e.length;) {
            var s = e.codePointAt(o);
            if ((t = i.wc.charWidth(s)) < 0) return -1;
            r += t, o += s <= 65535 ? 1 : 2
        }
        return r
    }, i.wc.substr = function (e, t, r) {
        var o, s, n;
        for (o = 0, n = 0; o < e.length && !((n += i.wc.charWidth(e.charCodeAt(o))) > t); o++);
        if (void 0 != r) {
            for (s = o, n = 0; s < e.length && n <= r; n += i.wc.charWidth(e.charCodeAt(s)), s++);
            return n > r && s--, e.substring(o, s)
        }
        return e.substr(o)
    }, i.wc.substring = function (e, t, r) {
        return i.wc.substr(e, t, r - t)
    }, i.resource.add("libdot/changelog/version", "text/plain", "1.16"), i.resource.add("libdot/changelog/date", "text/plain", "2017-08-16"), i.rtdep("lib.Storage");
    var o = {};
    o.windowType = null, o.zoomWarningMessage = "ZOOM != 100%", o.notifyCopyMessage = "✂", o.desktopNotificationTitle = "♪ %(title) ♪", o.testDeps = ["hterm.ScrollPort.Tests", "hterm.Screen.Tests", "hterm.Terminal.Tests", "hterm.VT.Tests", "hterm.VT.CannedTests"], i.registerInit("hterm", function (e) {
        function t(t) {
            o.windowType = t.type, setTimeout(e, 0)
        }
        o.defaultStorage || (window.chrome && chrome.storage && chrome.storage.sync ? o.defaultStorage = new i.Storage.Chrome(chrome.storage.sync) : o.defaultStorage = new i.Storage.Local);
        var r = !1;
        if (window.chrome && chrome.runtime && chrome.runtime.getManifest) {
            var s = chrome.runtime.getManifest();
            r = s.app && s.app.background
        }
        r ? setTimeout(t.bind(null, {
            type: "popup"
        }), 0) : window.chrome && chrome.tabs ? chrome.tabs.getCurrent(function (r) {
            r && window.chrome ? chrome.windows.get(r.windowId, null, t) : (o.windowType = "normal", setTimeout(e, 0))
        }) : setTimeout(t.bind(null, {
            type: "normal"
        }), 0)
    }), o.getClientSize = function (e) {
        return e.getBoundingClientRect()
    }, o.getClientWidth = function (e) {
        return e.getBoundingClientRect().width
    }, o.getClientHeight = function (e) {
        return e.getBoundingClientRect().height
    }, o.copySelectionToClipboard = function (e) {
        try {
            e.execCommand("copy")
        } catch (e) {}
    }, o.pasteFromClipboard = function (e) {
        try {
            return e.execCommand("paste")
        } catch (e) {
            return !1
        }
    }, o.notify = function (e) {
        var t = (e, t) => void 0 !== e ? e : t;
        void 0 !== e && null !== e || (e = {});
        var r = {
                body: e.body,
                icon: t(e.icon, i.resource.getDataUrl("hterm/images/icon-96"))
            },
            s = t(e.title, window.document.title);
        s || (s = "hterm"), s = i.f.replaceVars(o.desktopNotificationTitle, {
            title: s
        });
        var n = new Notification(s, r);
        return n.onclick = function () {
            window.focus(), this.close()
        }, n
    }, o.Size = function (e, t) {
        this.width = e, this.height = t
    }, o.Size.prototype.resize = function (e, t) {
        this.width = e, this.height = t
    }, o.Size.prototype.clone = function () {
        return new o.Size(this.width, this.height)
    }, o.Size.prototype.setTo = function (e) {
        this.width = e.width, this.height = e.height
    }, o.Size.prototype.equals = function (e) {
        return this.width == e.width && this.height == e.height
    }, o.Size.prototype.toString = function () {
        return "[hterm.Size: " + this.width + ", " + this.height + "]"
    }, o.RowCol = function (e, t, r) {
        this.row = e, this.column = t, this.overflow = !!r
    }, o.RowCol.prototype.move = function (e, t, r) {
        this.row = e, this.column = t, this.overflow = !!r
    }, o.RowCol.prototype.clone = function () {
        return new o.RowCol(this.row, this.column, this.overflow)
    }, o.RowCol.prototype.setTo = function (e) {
        this.row = e.row, this.column = e.column, this.overflow = e.overflow
    }, o.RowCol.prototype.equals = function (e) {
        return this.row == e.row && this.column == e.column && this.overflow == e.overflow
    }, o.RowCol.prototype.toString = function () {
        return "[hterm.RowCol: " + this.row + ", " + this.column + ", " + this.overflow + "]"
    }, i.rtdep("lib.f"), o.Frame = function (e, t, r) {
        this.terminal_ = e, this.div_ = e.div_, this.url = t, this.options = r || {}, this.iframe_ = null, this.container_ = null, this.messageChannel_ = null
    }, o.Frame.prototype.onMessage_ = function (e) {
        switch (e.data.name) {
            case "ipc-init-ok":
                return void this.sendTerminalInfo_();
            case "terminal-info-ok":
                return this.container_.style.display = "flex", this.messageChannel_.port1.onmessage = this.onMessage.bind(this), void this.onLoad();
            default:
                return void console.log("Unknown message from frame:", e.data)
        }
    }, o.Frame.prototype.onMessage = function () {}, o.Frame.prototype.onLoad_ = function () {
        this.messageChannel_ = new MessageChannel, this.messageChannel_.port1.onmessage = this.onMessage_.bind(this), this.messageChannel_.port1.start(), this.iframe_.contentWindow.postMessage({
            name: "ipc-init",
            argv: [{
                messagePort: this.messageChannel_.port2
            }]
        }, this.url, [this.messageChannel_.port2])
    }, o.Frame.prototype.onLoad = function () {}, o.Frame.prototype.sendTerminalInfo_ = function () {
        i.f.getAcceptLanguages(function (e) {
            this.postMessage("terminal-info", [{
                acceptLanguages: e,
                foregroundColor: this.terminal_.getForegroundColor(),
                backgroundColor: this.terminal_.getBackgroundColor(),
                cursorColor: this.terminal_.getCursorColor(),
                fontSize: this.terminal_.getFontSize(),
                fontFamily: this.terminal_.getFontFamily(),
                baseURL: i.f.getURL("/")
            }])
        }.bind(this))
    }, o.Frame.prototype.onCloseClicked_ = function () {
        this.close()
    }, o.Frame.prototype.close = function () {
        this.container_ && this.container_.parentNode && (this.container_.parentNode.removeChild(this.container_), this.onClose())
    }, o.Frame.prototype.onClose = function () {}, o.Frame.prototype.postMessage = function (e, t) {
        if (!this.messageChannel_) throw new Error("Message channel is not set up.");
        this.messageChannel_.port1.postMessage({
            name: e,
            argv: t
        })
    }, o.Frame.prototype.show = function () {
        function e(e, r) {
            return e in t.options ? t.options[e] : r
        }
        var t = this,
            t = this;
        if (this.container_ && this.container_.parentNode) console.error("Frame already visible");
        else {
            var r = o.getClientSize(this.div_),
                i = e("width", 640),
                s = e("height", 480),
                n = (r.width, r.height, this.terminal_.document_),
                a = this.container_ = n.createElement("div");
            a.style.cssText = "position: absolute;display: none;flex-direction: column;top: 10%;left: 4%;width: 90%;height: 80%;min-height: 20%;max-height: 80%;box-shadow: 0 0 2px " + this.terminal_.getForegroundColor() + ";border: 2px " + this.terminal_.getForegroundColor() + " solid;";
            var l = this.iframe_ = n.createElement("iframe");
            l.onload = this.onLoad_.bind(this), l.style.cssText = "display: flex;flex: 1;width: 100%", l.setAttribute("src", this.url), l.setAttribute("seamless", !0), a.appendChild(l), this.div_.appendChild(a)
        }
    }, i.rtdep("hterm.Keyboard.KeyMap"), o.Keyboard = function (e) {
        this.terminal = e, this.keyboardElement_ = null, this.handlers_ = [
            ["focusout", this.onFocusOut_.bind(this)],
            ["keydown", this.onKeyDown_.bind(this)],
            ["keypress", this.onKeyPress_.bind(this)],
            ["keyup", this.onKeyUp_.bind(this)],
            ["textInput", this.onTextInput_.bind(this)]
        ], this.keyMap = new o.Keyboard.KeyMap(this), this.bindings = new o.Keyboard.Bindings(this), this.altGrMode = "none", this.shiftInsertPaste = !0, this.homeKeysScroll = !1, this.pageKeysScroll = !1, this.ctrlPlusMinusZeroZoom = !0, this.ctrlCCopy = !1, this.ctrlVPaste = !1, this.applicationKeypad = !1, this.applicationCursor = !1, this.backspaceSendsBackspace = !1, this.characterEncoding = "utf-8", this.metaSendsEscape = !0, this.passMetaV = !0, this.altSendsWhat = "escape", this.altIsMeta = !1, this.altBackspaceIsMetaBackspace = !1, this.altKeyPressed = 0, this.mediaKeysAreFKeys = !1, this.previousAltSendsWhat_ = null
    }, o.Keyboard.KeyActions = {
        CANCEL: i.f.createEnum("CANCEL"),
        DEFAULT: i.f.createEnum("DEFAULT"),
        PASS: i.f.createEnum("PASS"),
        STRIP: i.f.createEnum("STRIP")
    }, o.Keyboard.prototype.encode = function (e) {
        return "utf-8" == this.characterEncoding ? this.terminal.vt.encodeUTF8(e) : e
    }, o.Keyboard.prototype.installKeyboard = function (e) {
        if (e != this.keyboardElement_) {
            e && this.keyboardElement_ && this.installKeyboard(null);
            for (var t = 0; t < this.handlers_.length; t++) {
                var r = this.handlers_[t];
                e ? e.addEventListener(r[0], r[1]) : this.keyboardElement_.removeEventListener(r[0], r[1])
            }
            this.keyboardElement_ = e
        }
    }, o.Keyboard.prototype.uninstallKeyboard = function () {
        this.installKeyboard(null)
    }, o.Keyboard.prototype.onTextInput_ = function (e) {
        e.data && e.data.split("").forEach(this.terminal.onVTKeystroke.bind(this.terminal))
    }, o.Keyboard.prototype.onKeyPress_ = function (e) {
        var t = String.fromCharCode(e.which).toLowerCase();
        if (!e.ctrlKey && !e.metaKey || "c" != t && "v" != t) {
            if (e.altKey && "browser-key" == this.altSendsWhat && 0 == e.charCode) {
                var r = String.fromCharCode(e.keyCode);
                e.shiftKey || (r = r.toLowerCase()), r.charCodeAt(0) + 128
            } else e.charCode >= 32 && (r = e.charCode);
            r && this.terminal.onVTKeystroke(String.fromCharCode(r)), e.preventDefault(), e.stopPropagation()
        }
    }, o.Keyboard.prototype.preventChromeAppNonCtrlShiftDefault_ = function (e) {
        window.chrome && window.chrome.app && window.chrome.app.window && (e.ctrlKey && e.shiftKey || e.preventDefault())
    }, o.Keyboard.prototype.onFocusOut_ = function (e) {
        this.altKeyPressed = 0
    }, o.Keyboard.prototype.onKeyUp_ = function (e) {
        18 == e.keyCode && (this.altKeyPressed = this.altKeyPressed & ~(1 << e.location - 1)), 27 == e.keyCode && this.preventChromeAppNonCtrlShiftDefault_(e)
    }, o.Keyboard.prototype.onKeyDown_ = function (e) {
        function t(o) {
            i = o;
            var n = r[o];
            return "function" == typeof n && (n = n.apply(s.keyMap, [e, r])), n === a && "normal" != o && (n = t("normal")), n
        }
        18 == e.keyCode && (this.altKeyPressed = this.altKeyPressed | 1 << e.location - 1), 27 == e.keyCode && this.preventChromeAppNonCtrlShiftDefault_(e);
        var r = this.keyMap.keyDefs[e.keyCode];
        if (r) {
            var i = null,
                s = this,
                n = o.Keyboard.KeyActions.CANCEL,
                a = o.Keyboard.KeyActions.DEFAULT,
                l = o.Keyboard.KeyActions.PASS,
                h = o.Keyboard.KeyActions.STRIP,
                c = e.ctrlKey,
                u = !this.altIsMeta && e.altKey,
                d = this.altIsMeta ? e.altKey || e.metaKey : e.metaKey,
                p = !/^\[\w+\]$/.test(r.keyCap);
            switch (this.altGrMode) {
                case "ctrl-alt":
                    p && c && u && (c = !1, u = !1);
                    break;
                case "right-alt":
                    p && 2 & this.terminal.keyboard.altKeyPressed && (c = !1, u = !1);
                    break;
                case "left-alt":
                    p && 1 & this.terminal.keyboard.altKeyPressed && (c = !1, u = !1)
            }
            var f;
            f = t(c ? "control" : u ? "alt" : d ? "meta" : "normal");
            var g = !e.maskShiftKey && e.shiftKey,
                m = {
                    keyCode: e.keyCode,
                    shift: e.shiftKey,
                    ctrl: c,
                    alt: u,
                    meta: d
                },
                y = this.bindings.getBinding(m);
            if (y && (g = c = u = d = !1, i = "normal", "function" == typeof (f = y.action) && (f = f.call(this, this.terminal, m))), u && "browser-key" == this.altSendsWhat && f == a && (f = l), f !== l && (f !== a || c || u || d) && (f === h && (u = c = !1, "function" == typeof (f = r.normal) && (f = f.apply(this.keyMap, [e, r])), f == a && 2 == r.keyCap.length && (f = r.keyCap.substr(g ? 1 : 0, 1))), e.preventDefault(), e.stopPropagation(), f !== n))
                if (f === a || "string" == typeof f) {
                    if ("control" == i ? c = !1 : "alt" == i ? u = !1 : "meta" == i && (d = !1), "[" == f.substr(0, 2) && (u || c || g)) {
                        var b;
                        !g || u || c ? !u || g || c ? g && u && !c ? b = ";4" : !c || g || u ? g && c && !u ? b = ";6" : u && c && !g ? b = ";7" : g && u && c && (b = ";8") : b = ";5" : b = ";3" : b = ";2", f = 3 == f.length ? "[1" + b + f.substr(2, 1) : f.substr(0, f.length - 1) + b + f.substr(f.length - 1)
                    } else {
                        if (f === a && (f = r.keyCap.substr(g ? 1 : 0, 1), c && (_ = r.keyCap.substr(0, 1).charCodeAt(0)) >= 64 && _ <= 95 && (f = String.fromCharCode(_ - 64))), u && "8-bit" == this.altSendsWhat && 1 == f.length) {
                            var _ = f.charCodeAt(0) + 128;
                            f = String.fromCharCode(_)
                        }(u && "escape" == this.altSendsWhat || d && this.metaSendsEscape) && (f = "" + f)
                    }
                    this.terminal.onVTKeystroke(f)
                } else console.warn("Invalid action: " + JSON.stringify(f))
        } else console.warn("No definition for keyCode: " + e.keyCode)
    }, o.Keyboard.Bindings = function () {
        this.bindings_ = {}
    }, o.Keyboard.Bindings.prototype.clear = function () {
        this.bindings_ = {}
    }, o.Keyboard.Bindings.prototype.addBinding_ = function (e, t) {
        var r = null,
            i = this.bindings_[e.keyCode];
        if (i)
            for (var s = 0; s < i.length; s++)
                if (i[s].keyPattern.matchKeyPattern(e)) {
                    r = i[s];
                    break
                }
        r ? r.action = t : (r = {
            keyPattern: e,
            action: t
        }, i ? (this.bindings_[e.keyCode].push(r), i.sort(function (e, t) {
            return o.Keyboard.KeyPattern.sortCompare(e.keyPattern, t.keyPattern)
        })) : this.bindings_[e.keyCode] = [r])
    }, o.Keyboard.Bindings.prototype.addBinding = function (e, t) {
        if ("string" == typeof e) {
            var r = new o.Parser;
            r.reset(e);
            var i;
            try {
                i = r.parseKeySequence()
            } catch (e) {
                return void console.error(e)
            }
            if (r.isComplete()) {
                if ("string" == typeof t) {
                    r.reset(t);
                    try {
                        t = r.parseKeyAction()
                    } catch (e) {
                        return void console.error(e)
                    }
                }
                r.isComplete() ? this.addBinding_(new o.Keyboard.KeyPattern(i), t) : console.error(r.error("Expected end of sequence: " + i))
            } else console.error(r.error("Expected end of sequence: " + i))
        } else this.addBinding_(e, t)
    }, o.Keyboard.Bindings.prototype.addBindings = function (e) {
        for (var t in e) this.addBinding(t, e[t])
    }, o.Keyboard.Bindings.prototype.getBinding = function (e) {
        var t = this.bindings_[e.keyCode];
        if (!t) return null;
        for (var r = 0; r < t.length; r++) {
            var i = t[r];
            if (i.keyPattern.matchKeyDown(e)) return i
        }
        return null
    }, i.rtdep("hterm.Keyboard.KeyActions"), o.Keyboard.KeyMap = function (e) {
        this.keyboard = e, this.keyDefs = {}, this.reset()
    }, o.Keyboard.KeyMap.prototype.addKeyDef = function (e, t) {
        e in this.keyDefs && console.warn("Duplicate keyCode: " + e), this.keyDefs[e] = t
    }, o.Keyboard.KeyMap.prototype.addKeyDefs = function (e) {
        for (var t = 0; t < arguments.length; t++) this.addKeyDef(arguments[t][0], {
            keyCap: arguments[t][1],
            normal: arguments[t][2],
            control: arguments[t][3],
            alt: arguments[t][4],
            meta: arguments[t][5]
        })
    }, o.Keyboard.KeyMap.prototype.reset = function () {
        function e(e, t, r) {
            return "function" == typeof e ? e.apply(c, [t, r]) : e
        }

        function t(t, r) {
            return function (i, o) {
                return e(i.shiftKey || i.ctrlKey || i.altKey || i.metaKey || !c.keyboard.applicationCursor ? t : r, i, o)
            }
        }

        function r(t, r) {
            return function (i, o) {
                return e(c.keyboard.backspaceSendsBackspace ? r : t, i, o)
            }
        }

        function i(t, r) {
            return function (i, o) {
                var s = i.shiftKey ? r : t;
                return i.maskShiftKey = !0, e(s, i, o)
            }
        }

        function s(t, r) {
            return function (i, o) {
                return e(i.altKey ? r : t, i, o)
            }
        }

        function n(t, r) {
            return function (i, o) {
                return e(i.shiftKey || i.ctrlKey || i.altKey || i.metaKey ? r : t, i, o)
            }
        }

        function a(e) {
            return String.fromCharCode(e.charCodeAt(0) - 64)
        }

        function l(e) {
            return function (t, r) {
                return this[e](t, r)
            }
        }

        function h(t) {
            return function (r, i) {
                return c.keyboard.mediaKeysAreFKeys ? e(t, r, i) : 166 == r.keyCode || 167 == r.keyCode || 168 == r.keyCode ? o.Keyboard.KeyActions.CANCEL : o.Keyboard.KeyActions.PASS
            }
        }
        this.keyDefs = {};
        var c = this,
            u = o.Keyboard.KeyActions.CANCEL,
            d = o.Keyboard.KeyActions.DEFAULT,
            p = o.Keyboard.KeyActions.PASS,
            f = o.Keyboard.KeyActions.STRIP;
        this.addKeyDefs([0, "[UNKNOWN]", p, p, p, p], [27, "[ESC]", "", d, d, d], [112, "[F1]", n("OP", "[P"), d, "[23~", d], [113, "[F2]", n("OQ", "[Q"), d, "[24~", d], [114, "[F3]", n("OR", "[R"), d, "[25~", d], [115, "[F4]", n("OS", "[S"), d, "[26~", d], [116, "[F5]", "[15~", d, "[28~", d], [117, "[F6]", "[17~", d, "[29~", d], [118, "[F7]", "[18~", d, "[31~", d], [119, "[F8]", "[19~", d, "[32~", d], [120, "[F9]", "[20~", d, "[33~", d], [121, "[F10]", "[21~", d, "[34~", d], [122, "[F11]", "[23~", d, "[42~", d], [123, "[F12]", "[24~", d, "[43~", d], [192, "`~", d, i(a("@"), a("^")), d, p], [49, "1!", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [50, "2@", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [51, "3#", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [52, "4$", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [53, "5%", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [54, "6^", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [55, "7&", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [56, "8*", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [57, "9(", d, l("onCtrlNum_"), l("onAltNum_"), l("onMetaNum_")], [48, "0)", d, l("onPlusMinusZero_"), l("onAltNum_"), l("onPlusMinusZero_")], [189, "-_", d, l("onPlusMinusZero_"), d, l("onPlusMinusZero_")], [187, "=+", d, l("onPlusMinusZero_"), d, l("onPlusMinusZero_")], [173, "-_", d, l("onPlusMinusZero_"), d, l("onPlusMinusZero_")], [61, "=+", d, l("onPlusMinusZero_"), d, l("onPlusMinusZero_")], [171, "+*", d, l("onPlusMinusZero_"), d, l("onPlusMinusZero_")], [8, "[BKSP]", r("", "\b"), r("\b", ""), d, d], [9, "[TAB]", i("\t", "[Z"), f, p, d], [81, "qQ", d, a("Q"), d, d], [87, "wW", d, a("W"), d, d], [69, "eE", d, a("E"), d, d], [82, "rR", d, a("R"), d, d], [84, "tT", d, a("T"), d, d], [89, "yY", d, a("Y"), d, d], [85, "uU", d, a("U"), d, d], [73, "iI", d, a("I"), d, d], [79, "oO", d, a("O"), d, d], [80, "pP", d, a("P"), d, d], [219, "[{", d, a("["), d, d], [221, "]}", d, a("]"), d, d], [220, "\\|", d, a("\\"), d, d], [20, "[CAPS]", p, p, p, d], [65, "aA", d, a("A"), d, d], [83, "sS", d, a("S"), d, d], [68, "dD", d, a("D"), d, d], [70, "fF", d, a("F"), d, d], [71, "gG", d, a("G"), d, d], [72, "hH", d, a("H"), d, d], [74, "jJ", d, i(a("J"), p), d, d], [75, "kK", d, i(a("K"), l("onClear_")), d, d], [76, "lL", d, i(a("L"), p), d, d], [186, ";:", d, f, d, d], [222, "'\"", d, f, d, d], [13, "[ENTER]", "\r", u, u, d], [16, "[SHIFT]", p, p, p, d], [90, "zZ", d, a("Z"), d, d], [88, "xX", d, a("X"), d, d], [67, "cC", d, l("onCtrlC_"), d, l("onMetaC_")], [86, "vV", d, l("onCtrlV_"), d, l("onMetaV_")], [66, "bB", d, i(a("B"), p), d, i(d, p)], [78, "nN", d, l("onCtrlN_"), d, l("onMetaN_")], [77, "mM", d, a("M"), d, d], [188, ",<", d, s(f, p), d, d], [190, ".>", d, s(f, p), d, d], [191, "/?", d, i(a("_"), a("?")), d, d], [17, "[CTRL]", p, p, p, p], [18, "[ALT]", p, p, p, p], [91, "[LAPL]", p, p, p, p], [32, " ", d, a("@"), d, d], [92, "[RAPL]", p, p, p, p], [93, "[RMENU]", p, p, p, p], [42, "[PRTSCR]", p, p, p, p], [145, "[SCRLK]", p, p, p, p], [19, "[BREAK]", p, p, p, p], [45, "[INSERT]", l("onKeyInsert_"), d, d, d], [36, "[HOME]", l("onKeyHome_"), d, d, d], [33, "[PGUP]", l("onKeyPageUp_"), d, d, d], [46, "[DEL]", l("onKeyDel_"), d, d, d], [35, "[END]", l("onKeyEnd_"), d, d, d], [34, "[PGDOWN]", l("onKeyPageDown_"), d, d, d], [38, "[UP]", l("onKeyArrowUp_"), d, d, d], [40, "[DOWN]", l("onKeyArrowDown_"), d, d, d], [39, "[RIGHT]", t("[C", "OC"), d, d, d], [37, "[LEFT]", t("[D", "OD"), d, d, d], [144, "[NUMLOCK]", p, p, p, p], [96, "[KP0]", d, d, d, d], [97, "[KP1]", d, d, d, d], [98, "[KP2]", d, d, d, d], [99, "[KP3]", d, d, d, d], [100, "[KP4]", d, d, d, d], [101, "[KP5]", d, d, d, d], [102, "[KP6]", d, d, d, d], [103, "[KP7]", d, d, d, d], [104, "[KP8]", d, d, d, d], [105, "[KP9]", d, d, d, d], [107, "[KP+]", d, l("onPlusMinusZero_"), d, l("onPlusMinusZero_")], [109, "[KP-]", d, l("onPlusMinusZero_"), d, l("onPlusMinusZero_")], [106, "[KP*]", d, d, d, d], [111, "[KP/]", d, d, d, d], [110, "[KP.]", d, d, d, d], [166, "[BACK]", h(n("OP", "[P")), d, "[23~", d], [167, "[FWD]", h(n("OQ", "[Q")), d, "[24~", d], [168, "[RELOAD]", h(n("OR", "[R")), d, "[25~", d], [183, "[FSCR]", h(n("OS", "[S")), d, "[26~", d], [182, "[WINS]", h("[15~"), d, "[28~", d], [216, "[BRIT-]", h("[17~"), d, "[29~", d], [217, "[BRIT+]", h("[18~"), d, "[31~", d])
    }, o.Keyboard.KeyMap.prototype.onKeyInsert_ = function (e) {
        return this.keyboard.shiftInsertPaste && e.shiftKey ? o.Keyboard.KeyActions.PASS : "[2~"
    }, o.Keyboard.KeyMap.prototype.onKeyHome_ = function (e) {
        return !this.keyboard.homeKeysScroll ^ e.shiftKey ? e.altey || e.ctrlKey || e.shiftKey || !this.keyboard.applicationCursor ? "[H" : "OH" : (this.keyboard.terminal.scrollHome(), o.Keyboard.KeyActions.CANCEL)
    }, o.Keyboard.KeyMap.prototype.onKeyEnd_ = function (e) {
        return !this.keyboard.homeKeysScroll ^ e.shiftKey ? e.altKey || e.ctrlKey || e.shiftKey || !this.keyboard.applicationCursor ? "[F" : "OF" : (this.keyboard.terminal.scrollEnd(), o.Keyboard.KeyActions.CANCEL)
    }, o.Keyboard.KeyMap.prototype.onKeyPageUp_ = function (e) {
        return !this.keyboard.pageKeysScroll ^ e.shiftKey ? "[5~" : (this.keyboard.terminal.scrollPageUp(), o.Keyboard.KeyActions.CANCEL)
    }, o.Keyboard.KeyMap.prototype.onKeyDel_ = function (e) {
        return this.keyboard.altBackspaceIsMetaBackspace && this.keyboard.altKeyPressed && !e.altKey ? "" : "[3~"
    }, o.Keyboard.KeyMap.prototype.onKeyPageDown_ = function (e) {
        return !this.keyboard.pageKeysScroll ^ e.shiftKey ? "[6~" : (this.keyboard.terminal.scrollPageDown(), o.Keyboard.KeyActions.CANCEL)
    }, o.Keyboard.KeyMap.prototype.onKeyArrowUp_ = function (e) {
        return !this.keyboard.applicationCursor && e.shiftKey ? (this.keyboard.terminal.scrollLineUp(), o.Keyboard.KeyActions.CANCEL) : e.shiftKey || e.ctrlKey || e.altKey || e.metaKey || !this.keyboard.applicationCursor ? "[A" : "OA"
    }, o.Keyboard.KeyMap.prototype.onKeyArrowDown_ = function (e) {
        return !this.keyboard.applicationCursor && e.shiftKey ? (this.keyboard.terminal.scrollLineDown(), o.Keyboard.KeyActions.CANCEL) : e.shiftKey || e.ctrlKey || e.altKey || e.metaKey || !this.keyboard.applicationCursor ? "[B" : "OB"
    }, o.Keyboard.KeyMap.prototype.onClear_ = function (e, t) {
        return this.keyboard.terminal.wipeContents(), o.Keyboard.KeyActions.CANCEL
    }, o.Keyboard.KeyMap.prototype.onCtrlNum_ = function (e, t) {
        function r(e) {
            return String.fromCharCode(e.charCodeAt(0) - 64)
        }
        if (this.keyboard.terminal.passCtrlNumber && !e.shiftKey) return o.Keyboard.KeyActions.PASS;
        switch (t.keyCap.substr(0, 1)) {
            case "1":
                return "1";
            case "2":
                return r("@");
            case "3":
                return r("[");
            case "4":
                return r("\\");
            case "5":
                return r("]");
            case "6":
                return r("^");
            case "7":
                return r("_");
            case "8":
                return "";
            case "9":
                return "9"
        }
    }, o.Keyboard.KeyMap.prototype.onAltNum_ = function (e, t) {
        return this.keyboard.terminal.passAltNumber && !e.shiftKey ? o.Keyboard.KeyActions.PASS : o.Keyboard.KeyActions.DEFAULT
    }, o.Keyboard.KeyMap.prototype.onMetaNum_ = function (e, t) {
        return this.keyboard.terminal.passMetaNumber && !e.shiftKey ? o.Keyboard.KeyActions.PASS : o.Keyboard.KeyActions.DEFAULT
    }, o.Keyboard.KeyMap.prototype.onCtrlC_ = function (e, t) {
        var r = this.keyboard.terminal.getDocument().getSelection();
        if (!r.isCollapsed) {
            if (this.keyboard.ctrlCCopy && !e.shiftKey) return this.keyboard.terminal.clearSelectionAfterCopy && setTimeout(r.collapseToEnd.bind(r), 50), o.Keyboard.KeyActions.PASS;
            if (!this.keyboard.ctrlCCopy && e.shiftKey) return this.keyboard.terminal.clearSelectionAfterCopy && setTimeout(r.collapseToEnd.bind(r), 50), this.keyboard.terminal.copySelectionToClipboard(), o.Keyboard.KeyActions.CANCEL
        }
        return ""
    }, o.Keyboard.KeyMap.prototype.onCtrlN_ = function (e, t) {
        return e.shiftKey ? (window.open(document.location.href, "", "chrome=no,close=yes,resize=yes,scrollbars=yes,minimizable=yes,width=" + window.innerWidth + ",height=" + window.innerHeight), o.Keyboard.KeyActions.CANCEL) : ""
    }, o.Keyboard.KeyMap.prototype.onCtrlV_ = function (e, t) {
        return !e.shiftKey && this.keyboard.ctrlVPaste || e.shiftKey && !this.keyboard.ctrlVPaste ? this.keyboard.terminal.paste() ? o.Keyboard.KeyActions.CANCEL : o.Keyboard.KeyActions.PASS : ""
    }, o.Keyboard.KeyMap.prototype.onMetaN_ = function (e, t) {
        return e.shiftKey ? (window.open(document.location.href, "", "chrome=no,close=yes,resize=yes,scrollbars=yes,minimizable=yes,width=" + window.outerWidth + ",height=" + window.outerHeight), o.Keyboard.KeyActions.CANCEL) : o.Keyboard.KeyActions.DEFAULT
    }, o.Keyboard.KeyMap.prototype.onMetaC_ = function (e, t) {
        var r = this.keyboard.terminal.getDocument();
        return e.shiftKey || r.getSelection().isCollapsed ? t.keyCap.substr(e.shiftKey ? 1 : 0, 1) : (this.keyboard.terminal.clearSelectionAfterCopy && setTimeout(function () {
            r.getSelection().collapseToEnd()
        }, 50), o.Keyboard.KeyActions.PASS)
    }, o.Keyboard.KeyMap.prototype.onMetaV_ = function (e, t) {
        return e.shiftKey ? o.Keyboard.KeyActions.PASS : this.keyboard.passMetaV ? o.Keyboard.KeyActions.PASS : o.Keyboard.KeyActions.DEFAULT
    }, o.Keyboard.KeyMap.prototype.onPlusMinusZero_ = function (e, t) {
        if (!(this.keyboard.ctrlPlusMinusZeroZoom ^ e.shiftKey)) return "-_" == t.keyCap ? "" : o.Keyboard.KeyActions.CANCEL;
        if (1 != this.keyboard.terminal.getZoomFactor()) return o.Keyboard.KeyActions.PASS;
        var r = t.keyCap.substr(0, 1);
        if ("0" == r) this.keyboard.terminal.setFontSize(0);
        else {
            var i = this.keyboard.terminal.getFontSize();
            "-" == r || "[KP-]" == t.keyCap ? i -= 1 : i += 1, this.keyboard.terminal.setFontSize(i)
        }
        return o.Keyboard.KeyActions.CANCEL
    }, o.Keyboard.KeyPattern = function (e) {
        this.wildcardCount = 0, this.keyCode = e.keyCode, o.Keyboard.KeyPattern.modifiers.forEach(function (t) {
            this[t] = e[t] || !1, "*" == this[t] && this.wildcardCount++
        }.bind(this))
    }, o.Keyboard.KeyPattern.modifiers = ["shift", "ctrl", "alt", "meta"], o.Keyboard.KeyPattern.sortCompare = function (e, t) {
        return e.wildcardCount < t.wildcardCount ? -1 : e.wildcardCount > t.wildcardCount ? 1 : 0
    }, o.Keyboard.KeyPattern.prototype.match_ = function (e, t) {
        if (this.keyCode != e.keyCode) return !1;
        var r = !0;
        return o.Keyboard.KeyPattern.modifiers.forEach(function (i) {
            var o = i in e && e[i];
            r && (t || "*" != this[i]) && this[i] != o && (r = !1)
        }.bind(this)), r
    }, o.Keyboard.KeyPattern.prototype.matchKeyDown = function (e) {
        return this.match_(e, !1)
    }, o.Keyboard.KeyPattern.prototype.matchKeyPattern = function (e) {
        return this.match_(e, !0)
    }, o.Options = function (e) {
        this.wraparound = !e || e.wraparound, this.reverseWraparound = !!e && e.reverseWraparound, this.originMode = !!e && e.originMode, this.autoCarriageReturn = !!e && e.autoCarriageReturn, this.cursorVisible = !!e && e.cursorVisible, this.cursorBlink = !!e && e.cursorBlink, this.insertMode = !!e && e.insertMode, this.reverseVideo = !!e && e.reverseVideo, this.bracketedPaste = !!e && e.bracketedPaste
    }, i.rtdep("hterm.Keyboard.KeyActions"), o.Parser = function () {
        this.source = "", this.pos = 0, this.ch = null
    }, o.Parser.prototype.error = function (e) {
        return new Error("Parse error at " + this.pos + ": " + e)
    }, o.Parser.prototype.isComplete = function () {
        return this.pos == this.source.length
    }, o.Parser.prototype.reset = function (e, t) {
        this.source = e, this.pos = t || 0, this.ch = e.substr(0, 1)
    }, o.Parser.prototype.parseKeySequence = function () {
        var e = {
            keyCode: null
        };
        for (var t in o.Parser.identifiers.modifierKeys) e[o.Parser.identifiers.modifierKeys[t]] = !1;
        for (; this.pos < this.source.length;) {
            this.skipSpace();
            var r = this.parseToken();
            if ("integer" == r.type) e.keyCode = r.value;
            else if ("identifier" == r.type) {
                var i = r.value.toUpperCase();
                if (i in o.Parser.identifiers.modifierKeys && o.Parser.identifiers.modifierKeys.hasOwnProperty(i)) {
                    var s = o.Parser.identifiers.modifierKeys[i];
                    if (e[s] && "*" != e[s]) throw this.error("Duplicate modifier: " + r.value);
                    e[s] = !0
                } else {
                    if (!(i in o.Parser.identifiers.keyCodes && o.Parser.identifiers.keyCodes.hasOwnProperty(i))) throw this.error("Unknown key: " + r.value);
                    e.keyCode = o.Parser.identifiers.keyCodes[i]
                }
            } else {
                if ("symbol" != r.type) throw this.error("Expected integer or identifier");
                if ("*" != r.value) throw this.error("Unexpected symbol: " + r.value);
                for (var n in o.Parser.identifiers.modifierKeys) {
                    var a = o.Parser.identifiers.modifierKeys[n];
                    e[a] || (e[a] = "*")
                }
            }
            if (this.skipSpace(), "-" != this.ch) break;
            if (null != e.keyCode) throw this.error("Extra definition after target key");
            this.advance(1)
        }
        if (null == e.keyCode) throw this.error("Missing target key");
        return e
    }, o.Parser.prototype.parseKeyAction = function () {
        this.skipSpace();
        var e = this.parseToken();
        if ("string" == e.type) return e.value;
        if ("identifier" == e.type) {
            if (e.value in o.Parser.identifiers.actions && o.Parser.identifiers.actions.hasOwnProperty(e.value)) return o.Parser.identifiers.actions[e.value];
            throw this.error("Unknown key action: " + e.value)
        }
        throw this.error("Expected string or identifier")
    }, o.Parser.prototype.peekString = function () {
        return "'" == this.ch || '"' == this.ch
    }, o.Parser.prototype.peekIdentifier = function () {
        return this.ch.match(/[a-z_]/i)
    }, o.Parser.prototype.peekInteger = function () {
        return this.ch.match(/[0-9]/)
    }, o.Parser.prototype.parseToken = function () {
        if ("*" == this.ch) {
            var e = {
                type: "symbol",
                value: this.ch
            };
            return this.advance(1), e
        }
        if (this.peekIdentifier()) return {
            type: "identifier",
            value: this.parseIdentifier()
        };
        if (this.peekString()) return {
            type: "string",
            value: this.parseString()
        };
        if (this.peekInteger()) return {
            type: "integer",
            value: this.parseInteger()
        };
        throw this.error("Unexpected token")
    }, o.Parser.prototype.parseIdentifier = function () {
        if (!this.peekIdentifier()) throw this.error("Expected identifier");
        return this.parsePattern(/[a-z0-9_]+/gi)
    }, o.Parser.prototype.parseInteger = function () {
        return "0" == this.ch && this.pos < this.source.length - 1 && "x" == this.source.substr(this.pos + 1, 1) ? parseInt(this.parsePattern(/0x[0-9a-f]+/gi)) : parseInt(this.parsePattern(/\d+/g))
    }, o.Parser.prototype.parseString = function () {
        var e = "",
            t = this.ch;
        if ('"' != t && "'" != t) throw this.error("String expected");
        this.advance(1);
        for (var r = new RegExp("[\\\\" + t + "]", "g"); this.pos < this.source.length;) {
            if (r.lastIndex = this.pos, !r.exec(this.source)) throw this.error("Unterminated string literal");
            if (e += this.source.substring(this.pos, r.lastIndex - 1), this.advance(r.lastIndex - this.pos - 1), '"' != t || "\\" != this.ch)
                if ("'" != t || "\\" != this.ch) {
                    if (this.ch == t) return this.advance(1), e
                } else e += this.ch, this.advance(1);
            else this.advance(1), e += this.parseEscape()
        }
        throw this.error("Unterminated string literal")
    }, o.Parser.prototype.parseEscape = function () {
        var e = {
            '"': '"',
            "'": "'",
            "\\": "\\",
            a: "",
            b: "\b",
            e: "",
            f: "\f",
            n: "\n",
            r: "\r",
            t: "\t",
            v: "\v",
            x: function () {
                var e = this.parsePattern(/[a-z0-9]{2}/gi);
                return String.fromCharCode(parseInt(e, 16))
            },
            u: function () {
                var e = this.parsePattern(/[a-z0-9]{4}/gi);
                return String.fromCharCode(parseInt(e, 16))
            }
        };
        if (!(this.ch in e && e.hasOwnProperty(this.ch))) throw this.error("Unknown escape: " + this.ch);
        var t = e[this.ch];
        return this.advance(1), "function" == typeof t && (t = t.call(this)), t
    }, o.Parser.prototype.parsePattern = function (e) {
        if (!e.global) throw this.error("Internal error: Span patterns must be global");
        e.lastIndex = this.pos;
        var t = e.exec(this.source);
        if (!t || e.lastIndex - t[0].length != this.pos) throw this.error("Expected match for: " + e);
        return this.pos = e.lastIndex - 1, this.advance(1), t[0]
    }, o.Parser.prototype.advance = function (e) {
        this.pos += e, this.ch = this.source.substr(this.pos, 1)
    }, o.Parser.prototype.skipSpace = function (e) {
        if (/\s/.test(this.ch)) {
            var t = /\s+/gm;
            t.lastIndex = this.pos;
            var r = this.source;
            if (t.exec(r) && (this.pos = t.lastIndex), this.ch = this.source.substr(this.pos, 1), e && -1 == this.ch.indexOf(e)) throw this.error("Expected one of " + e + ", found: " + this.ch)
        }
    }, o.Parser.identifiers = {}, o.Parser.identifiers.modifierKeys = {
        SHIFT: "shift",
        CTRL: "ctrl",
        CONTROL: "ctrl",
        ALT: "alt",
        META: "meta"
    }, o.Parser.identifiers.keyCodes = {
        ESCAPE: 27,
        ESC: 27,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        ZERO: 48,
        BACKSPACE: 8,
        BKSP: 8,
        BS: 8,
        TAB: 9,
        Q: 81,
        W: 87,
        E: 69,
        R: 82,
        T: 84,
        Y: 89,
        U: 85,
        I: 73,
        O: 79,
        P: 80,
        CAPS_LOCK: 20,
        CAPSLOCK: 20,
        CAPS: 20,
        A: 65,
        S: 83,
        D: 68,
        F: 70,
        G: 71,
        H: 72,
        J: 74,
        K: 75,
        L: 76,
        ENTER: 13,
        ENT: 13,
        RETURN: 13,
        RET: 13,
        Z: 90,
        X: 88,
        C: 67,
        V: 86,
        B: 66,
        N: 78,
        M: 77,
        SPACE: 32,
        SP: 32,
        PRINT_SCREEN: 42,
        PRTSC: 42,
        SCROLL_LOCK: 145,
        SCRLK: 145,
        BREAK: 19,
        BRK: 19,
        INSERT: 45,
        INS: 45,
        HOME: 36,
        PAGE_UP: 33,
        PGUP: 33,
        DELETE: 46,
        DEL: 46,
        END: 35,
        PAGE_DOWN: 34,
        PGDOWN: 34,
        PGDN: 34,
        UP: 38,
        DOWN: 40,
        RIGHT: 39,
        LEFT: 37,
        NUMLOCK: 144,
        KP0: 96,
        KP1: 97,
        KP2: 98,
        KP3: 99,
        KP4: 100,
        KP5: 101,
        KP6: 102,
        KP7: 103,
        KP8: 104,
        KP9: 105,
        KP_PLUS: 107,
        KP_ADD: 107,
        KP_MINUS: 109,
        KP_SUBTRACT: 109,
        KP_STAR: 106,
        KP_MULTIPLY: 106,
        KP_DIVIDE: 111,
        KP_DECIMAL: 110,
        KP_PERIOD: 110,
        NAVIGATE_BACK: 166,
        NAVIGATE_FORWARD: 167,
        RELOAD: 168,
        FULL_SCREEN: 183,
        WINDOW_OVERVIEW: 182,
        BRIGHTNESS_UP: 216,
        BRIGHTNESS_DOWN: 217
    }, o.Parser.identifiers.actions = {
        CANCEL: o.Keyboard.KeyActions.CANCEL,
        DEFAULT: o.Keyboard.KeyActions.DEFAULT,
        PASS: o.Keyboard.KeyActions.PASS,
        scrollPageUp: function (e) {
            return e.scrollPageUp(), o.Keyboard.KeyActions.CANCEL
        },
        scrollPageDown: function (e) {
            return e.scrollPageDown(), o.Keyboard.KeyActions.CANCEL
        },
        scrollToTop: function (e) {
            return e.scrollEnd(), o.Keyboard.KeyActions.CANCEL
        },
        scrollToBottom: function (e) {
            return e.scrollEnd(), o.Keyboard.KeyActions.CANCEL
        },
        clearScrollback: function (e) {
            return e.wipeContents(), o.Keyboard.KeyActions.CANCEL
        }
    }, i.rtdep("lib.f", "lib.Storage"), o.PreferenceManager = function (e) {
        i.PreferenceManager.call(this, o.defaultStorage, "/hterm/profiles/" + e);
        var t = o.PreferenceManager.defaultPreferences;
        Object.keys(t).forEach(function (e) {
            this.definePreference(e, t[e][1])
        }.bind(this))
    }, o.PreferenceManager.categories = {}, o.PreferenceManager.categories.Keyboard = "Keyboard", o.PreferenceManager.categories.Appearance = "Appearance", o.PreferenceManager.categories.CopyPaste = "CopyPaste", o.PreferenceManager.categories.Sounds = "Sounds", o.PreferenceManager.categories.Scrolling = "Scrolling", o.PreferenceManager.categories.Encoding = "Encoding", o.PreferenceManager.categories.Miscellaneous = "Miscellaneous", o.PreferenceManager.categoryDefinitions = [{
        id: o.PreferenceManager.categories.Appearance,
        text: "Appearance (fonts, colors, images)"
    }, {
        id: o.PreferenceManager.categories.CopyPaste,
        text: "Copy & Paste"
    }, {
        id: o.PreferenceManager.categories.Encoding,
        text: "Encoding"
    }, {
        id: o.PreferenceManager.categories.Keyboard,
        text: "Keyboard"
    }, {
        id: o.PreferenceManager.categories.Scrolling,
        text: "Scrolling"
    }, {
        id: o.PreferenceManager.categories.Sounds,
        text: "Sounds"
    }, {
        id: o.PreferenceManager.categories.Miscellaneous,
        text: "Misc."
    }], o.PreferenceManager.defaultPreferences = {
        "alt-gr-mode": [o.PreferenceManager.categories.Keyboard, null, [null, "none", "ctrl-alt", "left-alt", "right-alt"], "Select an AltGr detection hack^Wheuristic.\n\n'null': Autodetect based on navigator.language:\n      'en-us' => 'none', else => 'right-alt'\n'none': Disable any AltGr related munging.\n'ctrl-alt': Assume Ctrl+Alt means AltGr.\n'left-alt': Assume left Alt means AltGr.\n'right-alt': Assume right Alt means AltGr.\n"],
        "alt-backspace-is-meta-backspace": [o.PreferenceManager.categories.Keyboard, !1, "bool", "If set, undoes the Chrome OS Alt-Backspace->DEL remap, so that alt-backspace indeed is alt-backspace."],
        "alt-is-meta": [o.PreferenceManager.categories.Keyboard, !1, "bool", "Set whether the alt key acts as a meta key or as a distinct alt key."],
        "alt-sends-what": [o.PreferenceManager.categories.Keyboard, "escape", ["escape", "8-bit", "browser-key"], "Controls how the alt key is handled.\n\n  escape....... Send an ESC prefix.\n  8-bit........ Add 128 to the unshifted character as in xterm.\n  browser-key.. Wait for the keypress event and see what the browser \n                says.  (This won't work well on platforms where the \n                browser performs a default action for some alt sequences.)"],
        "audible-bell-sound": [o.PreferenceManager.categories.Sounds, "lib-resource:hterm/audio/bell", "url", "URL of the terminal bell sound.  Empty string for no audible bell."],
        "desktop-notification-bell": [o.PreferenceManager.categories.Sounds, !1, "bool", 'If true, terminal bells in the background will create a Web Notification. https://www.w3.org/TR/notifications/\n\nDisplaying notifications requires permission from the user. When this option is set to true, hterm will attempt to ask the user for permission if necessary. Note browsers may not show this permission request if it did not originate from a user action.\n\nChrome extensions with the "notifications" permission have permission to display notifications.'],
        "background-color": [o.PreferenceManager.categories.Appearance, "rgb(16, 16, 16)", "color", "The background color for text with no other color attributes."],
        "background-image": [o.PreferenceManager.categories.Appearance, "", "string", "CSS value of the background image.  Empty string for no image.\n\nFor example:\n  url(https://goo.gl/anedTK)\n  linear-gradient(top bottom, blue, red)"],
        "background-size": [o.PreferenceManager.categories.Appearance, "", "string", "CSS value of the background image size.  Defaults to none."],
        "background-position": [o.PreferenceManager.categories.Appearance, "", "string", "CSS value of the background image position.\n\nFor example:\n  10% 10%\n  center"],
        "backspace-sends-backspace": [o.PreferenceManager.categories.Keyboard, !1, "bool", "If true, the backspace should send BS ('\\x08', aka ^H).  Otherwise the backspace key should send '\\x7f'."],
        "character-map-overrides": [o.PreferenceManager.categories.Appearance, null, "value", 'This is specified as an object. It is a sparse array, where each property is the character set code and the value is an object that is a sparse array itself. In that sparse array, each property is the received character and the value is the displayed character.\n\nFor example:\n  {"0":{"+":"\\u2192",",":"\\u2190","-":"\\u2191",".":"\\u2193", "0":"\\u2588"}}'],
        "close-on-exit": [o.PreferenceManager.categories.Miscellaneous, !0, "bool", "Whether or not to close the window when the command exits."],
        "cursor-blink": [o.PreferenceManager.categories.Appearance, !1, "bool", "Whether or not to blink the cursor by default."],
        "cursor-blink-cycle": [o.PreferenceManager.categories.Appearance, [1e3, 500], "value", "The cursor blink rate in milliseconds.\n\nA two element array, the first of which is how long the cursor should be on, second is how long it should be off."],
        "cursor-color": [o.PreferenceManager.categories.Appearance, "rgba(255, 0, 0, 0.5)", "color", "The color of the visible cursor."],
        "color-palette-overrides": [o.PreferenceManager.categories.Appearance, null, "value", "Override colors in the default palette.\n\nThis can be specified as an array or an object.  If specified as an object it is assumed to be a sparse array, where each property is a numeric index into the color palette.\n\nValues can be specified as almost any css color value.  This includes #RGB, #RRGGBB, rgb(...), rgba(...), and any color names that are also part of the stock X11 rgb.txt file.\n\nYou can use 'null' to specify that the default value should be not be changed.  This is useful for skipping a small number of indices when the value is specified as an array."],
        "copy-on-select": [o.PreferenceManager.categories.CopyPaste, !0, "bool", "Automatically copy mouse selection to the clipboard."],
        "use-default-window-copy": [o.PreferenceManager.categories.CopyPaste, !1, "bool", "Whether to use the default window copy behavior"],
        "clear-selection-after-copy": [o.PreferenceManager.categories.CopyPaste, !0, "bool", "Whether to clear the selection after copying."],
        "ctrl-plus-minus-zero-zoom": [o.PreferenceManager.categories.Keyboard, !0, "bool", "If true, Ctrl-Plus/Minus/Zero controls zoom.\nIf false, Ctrl-Shift-Plus/Minus/Zero controls zoom, Ctrl-Minus sends ^_, Ctrl-Plus/Zero do nothing."],
        "ctrl-c-copy": [o.PreferenceManager.categories.Keyboard, !1, "bool", "Ctrl+C copies if true, send ^C to host if false.\nCtrl+Shift+C sends ^C to host if true, copies if false."],
        "ctrl-v-paste": [o.PreferenceManager.categories.Keyboard, !1, "bool", "Ctrl+V pastes if true, send ^V to host if false.\nCtrl+Shift+V sends ^V to host if true, pastes if false."],
        "east-asian-ambiguous-as-two-column": [o.PreferenceManager.categories.Keyboard, !1, "bool", "Set whether East Asian Ambiguous characters have two column width."],
        "enable-8-bit-control": [o.PreferenceManager.categories.Keyboard, !1, "bool", "True to enable 8-bit control characters, false to ignore them.\n\nWe'll respect the two-byte versions of these control characters regardless of this setting."],
        "enable-bold": [o.PreferenceManager.categories.Appearance, null, "tristate", "True if we should use bold weight font for text with the bold/bright attribute.  False to use the normal weight font.  Null to autodetect."],
        "enable-bold-as-bright": [o.PreferenceManager.categories.Appearance, !0, "bool", "True if we should use bright colors (8-15 on a 16 color palette) for any text with the bold attribute.  False otherwise."],
        "enable-blink": [o.PreferenceManager.categories.Appearance, !0, "bool", "True if we should respect the blink attribute.  False to ignore it.  "],
        "enable-clipboard-notice": [o.PreferenceManager.categories.CopyPaste, !0, "bool", "Show a message in the terminal when the host writes to the clipboard."],
        "enable-clipboard-write": [o.PreferenceManager.categories.CopyPaste, !0, "bool", "Allow the host to write directly to the system clipboard."],
        "enable-dec12": [o.PreferenceManager.categories.Miscellaneous, !1, "bool", "Respect the host's attempt to change the cursor blink status using DEC Private Mode 12."],
        environment: [o.PreferenceManager.categories.Miscellaneous, {
            TERM: "xterm-256color"
        }, "value", "The default environment variables, as an object."],
        "font-family": [o.PreferenceManager.categories.Appearance, '"DejaVu Sans Mono", "Everson Mono", FreeMono, "Menlo", "Terminal", monospace', "string", "Default font family for the terminal text."],
        "font-size": [o.PreferenceManager.categories.Appearance, 15, "int", "The default font size in pixels."],
        "font-smoothing": [o.PreferenceManager.categories.Appearance, "antialiased", "string", "CSS font-smoothing property."],
        "foreground-color": [o.PreferenceManager.categories.Appearance, "rgb(240, 240, 240)", "color", "The foreground color for text with no other color attributes."],
        "home-keys-scroll": [o.PreferenceManager.categories.Keyboard, !1, "bool", "If true, home/end will control the terminal scrollbar and shift home/end will send the VT keycodes.  If false then home/end sends VT codes and shift home/end scrolls."],
        keybindings: [o.PreferenceManager.categories.Keyboard, null, "value", 'A map of key sequence to key actions.  Key sequences include zero or more modifier keys followed by a key code.  Key codes can be decimal or hexadecimal numbers, or a key identifier.  Key actions can be specified a string to send to the host, or an action identifier.  For a full explanation of the format, see https://goo.gl/LWRndr.\n\nSample keybindings:\n{\n  "Ctrl-Alt-K": "clearScrollback",\n  "Ctrl-Shift-L": "PASS",\n  "Ctrl-H": "\'HELLO\\n\'"\n}'],
        "max-string-sequence": [o.PreferenceManager.categories.Encoding, 1e5, "int", "Max length of a DCS, OSC, PM, or APS sequence before we give up and ignore the code."],
        "media-keys-are-fkeys": [o.PreferenceManager.categories.Keyboard, !1, "bool", "If true, convert media keys to their Fkey equivalent. If false, let the browser handle the keys."],
        "meta-sends-escape": [o.PreferenceManager.categories.Keyboard, !0, "bool", "Set whether the meta key sends a leading escape or not."],
        "mouse-right-click-paste": [o.PreferenceManager.categories.CopyPaste, !0, "bool", 'Paste on right mouse button clicks.\n\nThis option is activate independent of the "mouse-paste-button" setting.\n\nNote: This will handle left & right handed mice correctly.'],
        "mouse-paste-button": [o.PreferenceManager.categories.CopyPaste, null, [null, 0, 1, 2, 3, 4, 5, 6], "Mouse paste button, or null to autodetect.\n\nFor autodetect, we'll use the middle mouse button for non-X11 platforms (including Chrome OS).  On X11, we'll use the right mouse button (since the native window manager should paste via the middle mouse button).\n\n0 == left (primary) button.\n1 == middle (auxiliary) button.\n2 == right (secondary) button.\n\nThis option is activate independent of the \"mouse-right-click-paste\" setting.\n\nNote: This will handle left & right handed mice correctly."],
        "word-break-match-left": [o.PreferenceManager.categories.CopyPaste, "[^\\s\\[\\](){}<>\"'\\^!@#$%&*,;:`]", "string", 'Regular expression to halt matching to the left (start) of a selection.\n\nNormally this is a character class to reject specific characters.\nWe allow "~" and "." by default as paths frequently start with those.'],
        "word-break-match-right": [o.PreferenceManager.categories.CopyPaste, "[^\\s\\[\\](){}<>\"'\\^!@#$%&*,;:~.`]", "string", "Regular expression to halt matching to the right (end) of a selection.\n\nNormally this is a character class to reject specific characters."],
        "word-break-match-middle": [o.PreferenceManager.categories.CopyPaste, "[^\\s\\[\\](){}<>\"'\\^]*", "string", "Regular expression to match all the characters in the middle.\n\nNormally this is a character class to reject specific characters.\n\nUsed to expand the selection surrounding the starting point."],
        "page-keys-scroll": [o.PreferenceManager.categories.Keyboard, !1, "bool", "If true, page up/down will control the terminal scrollbar and shift page up/down will send the VT keycodes.  If false then page up/down sends VT codes and shift page up/down scrolls."],
        "pass-alt-number": [o.PreferenceManager.categories.Keyboard, null, "tristate", "Set whether we should pass Alt-1..9 to the browser.\n\nThis is handy when running hterm in a browser tab, so that you don't lose Chrome's \"switch to tab\" keyboard accelerators.  When not running in a tab it's better to send these keys to the host so they can be used in vim or emacs.\n\nIf true, Alt-1..9 will be handled by the browser.  If false, Alt-1..9 will be sent to the host.  If null, autodetect based on browser platform and window type."],
        "pass-ctrl-number": [o.PreferenceManager.categories.Keyboard, null, "tristate", "Set whether we should pass Ctrl-1..9 to the browser.\n\nThis is handy when running hterm in a browser tab, so that you don't lose Chrome's \"switch to tab\" keyboard accelerators.  When not running in a tab it's better to send these keys to the host so they can be used in vim or emacs.\n\nIf true, Ctrl-1..9 will be handled by the browser.  If false, Ctrl-1..9 will be sent to the host.  If null, autodetect based on browser platform and window type."],
        "pass-meta-number": [o.PreferenceManager.categories.Keyboard, null, "tristate", "Set whether we should pass Meta-1..9 to the browser.\n\nThis is handy when running hterm in a browser tab, so that you don't lose Chrome's \"switch to tab\" keyboard accelerators.  When not running in a tab it's better to send these keys to the host so they can be used in vim or emacs.\n\nIf true, Meta-1..9 will be handled by the browser.  If false, Meta-1..9 will be sent to the host.  If null, autodetect based on browser platform and window type."],
        "pass-meta-v": [o.PreferenceManager.categories.Keyboard, !0, "bool", "Set whether meta-V gets passed to host."],
        "receive-encoding": [o.PreferenceManager.categories.Encoding, "utf-8", ["utf-8", "raw"], "Set the expected encoding for data received from the host.\n\nValid values are 'utf-8' and 'raw'."],
        "scroll-on-keystroke": [o.PreferenceManager.categories.Scrolling, !0, "bool", "If true, scroll to the bottom on any keystroke."],
        "scroll-on-output": [o.PreferenceManager.categories.Scrolling, !1, "bool", "If true, scroll to the bottom on terminal output."],
        "scrollbar-visible": [o.PreferenceManager.categories.Scrolling, !0, "bool", "The vertical scrollbar mode."],
        "scroll-wheel-may-send-arrow-keys": [o.PreferenceManager.categories.Scrolling, !1, "bool", "When using the alternative screen buffer, and DECCKM (Application Cursor Keys) is active, mouse wheel scroll events will emulate arrow keys.\n\nIt can be temporarily disabled by holding the shift key.\n\nThis frequently comes up when using pagers (less) or reading man pages or text editors (vi/nano) or using screen/tmux."],
        "scroll-wheel-move-multiplier": [o.PreferenceManager.categories.Scrolling, 1, "int", "The multiplier for the pixel delta in wheel events caused by the scroll wheel. Alters how fast the page scrolls."],
        "send-encoding": [o.PreferenceManager.categories.Encoding, "utf-8", ["utf-8", "raw"], "Set the encoding for data sent to host."],
        "terminal-encoding": [o.PreferenceManager.categories.Encoding, "iso-2022", ["iso-2022", "utf-8", "utf-8-locked"], "The default terminal encoding (DOCS).\n\nISO-2022 enables character map translations (like graphics maps).\nUTF-8 disables support for those.\n\nThe locked variant means the encoding cannot be changed at runtime via terminal escape sequences.\n\nYou should stick with UTF-8 unless you notice broken rendering with legacy applications."],
        "shift-insert-paste": [o.PreferenceManager.categories.Keyboard, !0, "bool", "Shift + Insert pastes if true, sent to host if false."],
        "user-css": [o.PreferenceManager.categories.Appearance, "", "url", "URL of user stylesheet to include in the terminal document."],
        "user-css-text": [o.PreferenceManager.categories.Appearance, "", "multiline-string", "Custom CSS text for styling the terminal."]
    }, o.PreferenceManager.prototype = Object.create(i.PreferenceManager.prototype), o.PreferenceManager.constructor = o.PreferenceManager, o.PubSub = function () {
        this.observers_ = {}
    }, o.PubSub.addBehavior = function (e) {
        var t = new o.PubSub;
        for (var r in o.PubSub.prototype) e[r] = o.PubSub.prototype[r].bind(t)
    }, o.PubSub.prototype.subscribe = function (e, t) {
        e in this.observers_ || (this.observers_[e] = []), this.observers_[e].push(t)
    }, o.PubSub.prototype.unsubscribe = function (e, t) {
        var r = this.observers_[e];
        if (!r) throw "Invalid subject: " + e;
        var i = r.indexOf(t);
        if (i < 0) throw "Not subscribed: " + e;
        r.splice(i, 1)
    }, o.PubSub.prototype.publish = function (e, t, r) {
        function i(e) {
            e < o.length - 1 && setTimeout(i, 0, e + 1), o[e](t)
        }
        var o = this.observers_[e];
        o && (o = [].concat(o)), r && (o ? o.push(r) : o = [r]), o && setTimeout(i, 0, 0)
    }, i.rtdep("lib.f", "lib.wc", "hterm.RowCol", "hterm.Size", "hterm.TextAttributes"), o.Screen = function (e) {
        this.rowsArray = [], this.columnCount_ = e || 80, this.textAttributes = new o.TextAttributes(window.document), this.cursorPosition = new o.RowCol(0, 0), this.cursorRowNode_ = null, this.cursorNode_ = null, this.cursorOffset_ = null, this.wordBreakMatchLeft = null, this.wordBreakMatchRight = null, this.wordBreakMatchMiddle = null
    }, o.Screen.prototype.getSize = function () {
        return new o.Size(this.columnCount_, this.rowsArray.length)
    }, o.Screen.prototype.getHeight = function () {
        return this.rowsArray.length
    }, o.Screen.prototype.getWidth = function () {
        return this.columnCount_
    }, o.Screen.prototype.setColumnCount = function (e) {
        this.columnCount_ = e, this.cursorPosition.column >= e && this.setCursorPosition(this.cursorPosition.row, e - 1)
    }, o.Screen.prototype.shiftRow = function () {
        return this.shiftRows(1)[0]
    }, o.Screen.prototype.shiftRows = function (e) {
        return this.rowsArray.splice(0, e)
    }, o.Screen.prototype.unshiftRow = function (e) {
        this.rowsArray.splice(0, 0, e)
    }, o.Screen.prototype.unshiftRows = function (e) {
        this.rowsArray.unshift.apply(this.rowsArray, e)
    }, o.Screen.prototype.popRow = function () {
        return this.popRows(1)[0]
    }, o.Screen.prototype.popRows = function (e) {
        return this.rowsArray.splice(this.rowsArray.length - e, e)
    }, o.Screen.prototype.pushRow = function (e) {
        this.rowsArray.push(e)
    }, o.Screen.prototype.pushRows = function (e) {
        e.push.apply(this.rowsArray, e)
    }, o.Screen.prototype.insertRow = function (e, t) {
        this.rowsArray.splice(e, 0, t)
    }, o.Screen.prototype.insertRows = function (e, t) {
        for (var r = 0; r < t.length; r++) this.rowsArray.splice(e + r, 0, t[r])
    }, o.Screen.prototype.removeRow = function (e) {
        return this.rowsArray.splice(e, 1)[0]
    }, o.Screen.prototype.removeRows = function (e, t) {
        return this.rowsArray.splice(e, t)
    }, o.Screen.prototype.invalidateCursorPosition = function () {
        this.cursorPosition.move(0, 0), this.cursorRowNode_ = null, this.cursorNode_ = null, this.cursorOffset_ = null
    }, o.Screen.prototype.clearCursorRow = function () {
        this.cursorRowNode_.innerHTML = "", this.cursorRowNode_.removeAttribute("line-overflow"), this.cursorOffset_ = 0, this.cursorPosition.column = 0, this.cursorPosition.overflow = !1;
        var e;
        e = this.textAttributes.isDefault() ? "" : i.f.getWhitespace(this.columnCount_);
        var t = this.textAttributes.inverse;
        this.textAttributes.inverse = !1, this.textAttributes.syncColors();
        var r = this.textAttributes.createContainer(e);
        this.cursorRowNode_.appendChild(r), this.cursorNode_ = r, this.textAttributes.inverse = t, this.textAttributes.syncColors()
    }, o.Screen.prototype.commitLineOverflow = function () {
        this.cursorRowNode_.setAttribute("line-overflow", !0)
    }, o.Screen.prototype.setCursorPosition = function (e, t) {
        if (this.rowsArray.length) {
            e >= this.rowsArray.length ? (console.error("Row out of bounds: " + e), e = this.rowsArray.length - 1) : e < 0 && (console.error("Row out of bounds: " + e), e = 0), t >= this.columnCount_ ? (console.error("Column out of bounds: " + t), t = this.columnCount_ - 1) : t < 0 && (console.error("Column out of bounds: " + t), t = 0), this.cursorPosition.overflow = !1;
            var r = this.rowsArray[e],
                i = r.firstChild;
            i || (i = r.ownerDocument.createTextNode(""), r.appendChild(i));
            var s = 0;
            for (r == this.cursorRowNode_ ? t >= this.cursorPosition.column - this.cursorOffset_ && (i = this.cursorNode_, s = this.cursorPosition.column - this.cursorOffset_) : this.cursorRowNode_ = r, this.cursorPosition.move(e, t); i;) {
                var n = t - s,
                    a = o.TextAttributes.nodeWidth(i);
                if (!i.nextSibling || a > n) return this.cursorNode_ = i, void(this.cursorOffset_ = n);
                s += a, i = i.nextSibling
            }
        } else console.warn("Attempt to set cursor position on empty screen.")
    }, o.Screen.prototype.syncSelectionCaret = function (e) {
        try {
            e.collapse(this.cursorNode_, this.cursorOffset_)
        } catch (e) {}
    }, o.Screen.prototype.splitNode_ = function (e, t) {
        var r = e.cloneNode(!1),
            s = e.textContent;
        e.textContent = o.TextAttributes.nodeSubstr(e, 0, t), r.textContent = i.wc.substr(s, t), r.textContent && e.parentNode.insertBefore(r, e.nextSibling), e.textContent || e.parentNode.removeChild(e)
    }, o.Screen.prototype.maybeClipCurrentRow = function () {
        var e = o.TextAttributes.nodeWidth(this.cursorRowNode_);
        if (e <= this.columnCount_) this.cursorPosition.column >= this.columnCount_ && (this.setCursorPosition(this.cursorPosition.row, this.columnCount_ - 1), this.cursorPosition.overflow = !0);
        else {
            var t = this.cursorPosition.column;
            this.setCursorPosition(this.cursorPosition.row, this.columnCount_ - 1), e = o.TextAttributes.nodeWidth(this.cursorNode_), this.cursorOffset_ < e - 1 && (this.cursorNode_.textContent = o.TextAttributes.nodeSubstr(this.cursorNode_, 0, this.cursorOffset_ + 1));
            for (var r = this.cursorRowNode_, i = this.cursorNode_.nextSibling; i;) r.removeChild(i), i = this.cursorNode_.nextSibling;
            t < this.columnCount_ ? this.setCursorPosition(this.cursorPosition.row, t) : this.cursorPosition.overflow = !0
        }
    }, o.Screen.prototype.insertString = function (e) {
        var t = this.cursorNode_,
            r = t.textContent;
        this.cursorRowNode_.removeAttribute("line-overflow");
        var s = i.wc.strWidth(e);
        this.cursorPosition.column += s;
        var n = this.cursorOffset_,
            a = o.TextAttributes.nodeWidth(t) - n;
        if (a < 0) {
            var l = i.f.getWhitespace(-a);
            if (this.textAttributes.underline || this.textAttributes.strikethrough || this.textAttributes.background || this.textAttributes.wcNode || !this.textAttributes.asciiNode || null != this.textAttributes.tileData)
                if (3 != t.nodeType && (t.wcNode || !t.asciiNode || t.tileNode || t.style.textDecoration || t.style.backgroundColor)) {
                    var h = t.ownerDocument.createTextNode(l);
                    this.cursorRowNode_.insertBefore(h, t.nextSibling), this.cursorNode_ = t = h, this.cursorOffset_ = n = -a, r = l
                } else t.textContent = r += l;
            else e = l + e;
            a = 0
        }
        if (this.textAttributes.matchesContainer(t)) return t.textContent = 0 == a ? r + e : 0 == n ? e + r : o.TextAttributes.nodeSubstr(t, 0, n) + e + o.TextAttributes.nodeSubstr(t, n), void(this.cursorOffset_ += s);
        if (0 == n) {
            var c = t.previousSibling;
            if (c && this.textAttributes.matchesContainer(c)) return c.textContent += e, this.cursorNode_ = c, void(this.cursorOffset_ = i.wc.strWidth(c.textContent));
            d = this.textAttributes.createContainer(e);
            return this.cursorRowNode_.insertBefore(d, t), this.cursorNode_ = d, void(this.cursorOffset_ = s)
        }
        if (0 == a) {
            var u = t.nextSibling;
            if (u && this.textAttributes.matchesContainer(u)) return u.textContent = e + u.textContent, this.cursorNode_ = u, void(this.cursorOffset_ = i.wc.strWidth(e));
            d = this.textAttributes.createContainer(e);
            return this.cursorRowNode_.insertBefore(d, u), this.cursorNode_ = d, void(this.cursorOffset_ = o.TextAttributes.nodeWidth(d))
        }
        this.splitNode_(t, n);
        var d = this.textAttributes.createContainer(e);
        this.cursorRowNode_.insertBefore(d, t.nextSibling), this.cursorNode_ = d, this.cursorOffset_ = s
    }, o.Screen.prototype.overwriteString = function (e) {
        var t = this.columnCount_ - this.cursorPosition.column;
        if (!t) return [e];
        var r = i.wc.strWidth(e);
        if (this.textAttributes.matchesContainer(this.cursorNode_) && this.cursorNode_.textContent.substr(this.cursorOffset_) == e) return this.cursorOffset_ += r, void(this.cursorPosition.column += r);
        this.deleteChars(Math.min(r, t)), this.insertString(e)
    }, o.Screen.prototype.deleteChars = function (e) {
        var t = this.cursorNode_,
            r = this.cursorOffset_,
            i = this.cursorPosition.column;
        if (!(e = Math.min(e, this.columnCount_ - i))) return 0;
        for (var s, n, a = e; t && e;) {
            if (s = o.TextAttributes.nodeWidth(t), t.textContent = o.TextAttributes.nodeSubstr(t, 0, r) + o.TextAttributes.nodeSubstr(t, r + e), n = o.TextAttributes.nodeWidth(t), e -= s - n, r < s && n && s == n) {
                var l = this.textAttributes.createContainer(" ");
                t.parentNode.insertBefore(l, t.nextSibling), t.textContent = "", n = 0, e -= 1
            }
            var h = t.nextSibling;
            0 == n && t != this.cursorNode_ && t.parentNode.removeChild(t), t = h, r = 0
        }
        if (3 != this.cursorNode_.nodeType && !this.cursorNode_.textContent) {
            var c = this.cursorNode_;
            if (c.previousSibling) this.cursorNode_ = c.previousSibling, this.cursorOffset_ = o.TextAttributes.nodeWidth(c.previousSibling);
            else if (c.nextSibling) this.cursorNode_ = c.nextSibling, this.cursorOffset_ = 0;
            else {
                var u = this.cursorRowNode_.ownerDocument.createTextNode("");
                this.cursorRowNode_.appendChild(u), this.cursorNode_ = u, this.cursorOffset_ = 0
            }
            this.cursorRowNode_.removeChild(c)
        }
        return a
    }, o.Screen.prototype.getLineStartRow_ = function (e) {
        for (; e.previousSibling && e.previousSibling.hasAttribute("line-overflow");) e = e.previousSibling;
        return e
    }, o.Screen.prototype.getLineText_ = function (e) {
        for (var t = ""; e && (t += e.textContent, e.hasAttribute("line-overflow"));) e = e.nextSibling;
        return t
    }, o.Screen.prototype.getXRowAncestor_ = function (e) {
        for (; e && "X-ROW" !== e.nodeName;) e = e.parentNode;
        return e
    }, o.Screen.prototype.getPositionWithOverflow_ = function (e, t, r) {
        if (!t) return -1;
        var i = this.getXRowAncestor_(t);
        if (!i) return -1;
        for (var s = 0; i != e;) {
            if (s += o.TextAttributes.nodeWidth(e), !e.hasAttribute("line-overflow") || !e.nextSibling) return -1;
            e = e.nextSibling
        }
        return s + this.getPositionWithinRow_(e, t, r)
    }, o.Screen.prototype.getPositionWithinRow_ = function (e, t, r) {
        if (t.parentNode != e) return null == t.parentNode ? -1 : this.getPositionWithinRow_(t.parentNode, t, r) + this.getPositionWithinRow_(e, t.parentNode, 0);
        for (var i = 0, s = 0; s < e.childNodes.length; s++) {
            var n = e.childNodes[s];
            if (n == t) return i + r;
            i += o.TextAttributes.nodeWidth(n)
        }
        return -1
    }, o.Screen.prototype.getNodeAndOffsetWithOverflow_ = function (e, t) {
        for (; e && t > o.TextAttributes.nodeWidth(e);) {
            if (!e.hasAttribute("line-overflow") || !e.nextSibling) return -1;
            t -= o.TextAttributes.nodeWidth(e), e = e.nextSibling
        }
        return this.getNodeAndOffsetWithinRow_(e, t)
    }, o.Screen.prototype.getNodeAndOffsetWithinRow_ = function (e, t) {
        for (var r = 0; r < e.childNodes.length; r++) {
            var i = e.childNodes[r],
                s = o.TextAttributes.nodeWidth(i);
            if (t <= s) return "SPAN" === i.nodeName ? this.getNodeAndOffsetWithinRow_(i, t) : [i, t];
            t -= s
        }
        return null
    }, o.Screen.prototype.setRange_ = function (e, t, r, i) {
        var o = this.getNodeAndOffsetWithOverflow_(e, t);
        if (null != o) {
            var s = this.getNodeAndOffsetWithOverflow_(e, r);
            null != s && (i.setStart(o[0], o[1]), i.setEnd(s[0], s[1]))
        }
    }, o.Screen.prototype.expandSelection = function (e) {
        if (e) {
            var t = e.getRangeAt(0);
            if (t && !t.toString().match(/\s/)) {
                var r = this.getLineStartRow_(this.getXRowAncestor_(t.startContainer));
                if (r) {
                    var o = this.getPositionWithOverflow_(r, t.startContainer, t.startOffset);
                    if (-1 != o) {
                        var s = this.getPositionWithOverflow_(r, t.endContainer, t.endOffset);
                        if (-1 != s) {
                            var n = this.wordBreakMatchLeft,
                                a = this.wordBreakMatchRight,
                                l = this.wordBreakMatchMiddle,
                                h = this.getLineText_(r),
                                c = i.wc.substring(h, 0, s),
                                u = new RegExp(n + l + "$"),
                                d = c.search(u);
                            if (!(-1 == d || d > o)) {
                                var p = i.wc.substring(h, o, i.wc.strWidth(h)),
                                    f = new RegExp("^" + l + a),
                                    g = p.match(f);
                                if (g) {
                                    var m = o + i.wc.strWidth(g[0]); - 1 == m || m < s || (this.setRange_(r, d, m, t), e.addRange(t))
                                }
                            }
                        }
                    }
                }
            }
        }
    }, i.rtdep("lib.f", "hterm.PubSub", "hterm.Size"), o.ScrollPort = function (e) {
        o.PubSub.addBehavior(this), this.rowProvider_ = e, this.characterSize = new o.Size(10, 10), this.ruler_ = null, this.selection = new o.ScrollPort.Selection(this), this.currentRowNodeCache_ = null, this.previousRowNodeCache_ = {}, this.lastScreenWidth_ = null, this.lastScreenHeight_ = null, this.selectionEnabled_ = !0, this.lastRowCount_ = 0, this.scrollWheelMultiplier_ = 1, this.lastTouch_ = {}, this.isScrolledEnd = !0, this.currentScrollbarWidthPx = 16, this.ctrlVPaste = !1, this.div_ = null, this.document_ = null, this.timeouts_ = {}, this.observers_ = {}, this.DEBUG_ = !1
    }, o.ScrollPort.Selection = function (e) {
        this.scrollPort_ = e, this.startRow = null, this.endRow = null, this.isMultiline = null, this.isCollapsed = null
    }, o.ScrollPort.Selection.prototype.findFirstChild = function (e, t) {
        for (var r = e.firstChild; r;) {
            if (-1 != t.indexOf(r)) return r;
            if (r.childNodes.length) {
                var i = this.findFirstChild(r, t);
                if (i) return i
            }
            r = r.nextSibling
        }
        return null
    }, o.ScrollPort.Selection.prototype.sync = function () {
        function e() {
            r.startRow = o, r.startNode = i.anchorNode, r.startOffset = i.anchorOffset, r.endRow = s, r.endNode = i.focusNode, r.endOffset = i.focusOffset
        }

        function t() {
            r.startRow = s, r.startNode = i.focusNode, r.startOffset = i.focusOffset, r.endRow = o, r.endNode = i.anchorNode, r.endOffset = i.anchorOffset
        }
        var r = this,
            i = this.scrollPort_.getDocument().getSelection();
        if (this.startRow = null, this.endRow = null, this.isMultiline = null, this.isCollapsed = !i || i.isCollapsed, !this.isCollapsed) {
            for (var o = i.anchorNode; o && !("rowIndex" in o);) o = o.parentNode;
            if (o) {
                for (var s = i.focusNode; s && !("rowIndex" in s);) s = s.parentNode;
                if (s) {
                    if (o.rowIndex < s.rowIndex) e();
                    else if (o.rowIndex > s.rowIndex) t();
                    else if (i.focusNode == i.anchorNode) i.anchorOffset < i.focusOffset ? e() : t();
                    else {
                        var n = this.findFirstChild(o, [i.anchorNode, i.focusNode]);
                        if (!n) throw new Error("Unexpected error syncing selection.");
                        n == i.anchorNode ? e() : t()
                    }
                    this.isMultiline = o.rowIndex != s.rowIndex
                } else console.error("Selection focus is not rooted in a row node: " + i.focusNode.nodeName)
            } else console.error("Selection anchor is not rooted in a row node: " + i.anchorNode.nodeName)
        }
    }, o.ScrollPort.prototype.decorate = function (e) {
        this.div_ = e, this.iframe_ = e.ownerDocument.createElement("iframe"), this.iframe_.style.cssText = "border: 0;height: 100%;position: absolute;width: 100%", "mozInnerScreenX" in window && (this.iframe_.src = "#"), e.appendChild(this.iframe_), this.iframe_.contentWindow.addEventListener("resize", this.onResize_.bind(this));
        var t = this.document_ = this.iframe_.contentDocument;
        t.body.style.cssText = "margin: 0px;padding: 0px;height: 100%;width: 100%;overflow: hidden;cursor: var(--hterm-mouse-cursor-style);-webkit-user-select: none;-moz-user-select: none;", this.DEBUG_ && (this.document_.body.style.paddingTop = this.document_.body.style.paddingBottom = "calc(var(--hterm-charsize-height) * 3)");
        var r = t.createElement("style");
        r.textContent = "x-row {  display: block;  height: var(--hterm-charsize-height);  line-height: var(--hterm-charsize-height);}", t.head.appendChild(r), this.userCssLink_ = t.createElement("link"), this.userCssLink_.setAttribute("rel", "stylesheet"), this.userCssText_ = t.createElement("style"), t.head.appendChild(this.userCssText_), this.screen_ = t.createElement("x-screen"), this.screen_.setAttribute("contenteditable", "true"), this.screen_.setAttribute("spellcheck", "false"), this.screen_.setAttribute("autocomplete", "off"), this.screen_.setAttribute("autocorrect", "off"), this.screen_.setAttribute("autocaptalize", "none"), this.screen_.setAttribute("role", "textbox"), this.screen_.setAttribute("tabindex", "-1"), this.screen_.style.cssText = "caret-color: transparent;display: block;font-family: monospace;font-size: 15px;font-variant-ligatures: none;height: 100%;overflow-y: scroll; overflow-x: hidden;white-space: pre;width: 100%;outline: none !important", t.body.appendChild(this.screen_), this.screen_.addEventListener("scroll", this.onScroll_.bind(this)), this.screen_.addEventListener("wheel", this.onScrollWheel_.bind(this)), this.screen_.addEventListener("touchstart", this.onTouch_.bind(this)), this.screen_.addEventListener("touchmove", this.onTouch_.bind(this)), this.screen_.addEventListener("touchend", this.onTouch_.bind(this)), this.screen_.addEventListener("touchcancel", this.onTouch_.bind(this)), this.screen_.addEventListener("copy", this.onCopy_.bind(this)), this.screen_.addEventListener("paste", this.onPaste_.bind(this)), this.screen_.addEventListener("drop", function (e) {
            return e.preventDefault(), !1
        }), t.body.addEventListener("keydown", this.onBodyKeyDown_.bind(this)), this.rowNodes_ = t.createElement("div"), this.rowNodes_.id = "hterm:row-nodes", this.rowNodes_.style.cssText = "display: block;position: fixed;overflow: hidden;-webkit-user-select: text;-moz-user-select: text;", this.screen_.appendChild(this.rowNodes_), this.topSelectBag_ = t.createElement("x-select-bag"), this.topSelectBag_.style.cssText = "display: block;overflow: hidden;height: var(--hterm-charsize-height);white-space: pre;", this.bottomSelectBag_ = this.topSelectBag_.cloneNode(), this.topFold_ = t.createElement("x-fold"), this.topFold_.id = "hterm:top-fold-for-row-selection", this.topFold_.style.cssText = "display: block;", this.rowNodes_.appendChild(this.topFold_), this.bottomFold_ = this.topFold_.cloneNode(), this.bottomFold_.id = "hterm:bottom-fold-for-row-selection", this.rowNodes_.appendChild(this.bottomFold_), this.scrollArea_ = t.createElement("div"), this.scrollArea_.id = "hterm:scrollarea", this.scrollArea_.style.cssText = "visibility: hidden", this.screen_.appendChild(this.scrollArea_);
        var i = "http://www.w3.org/2000/svg";
        this.svg_ = this.div_.ownerDocument.createElementNS(i, "svg"), this.svg_.id = "hterm:zoom-detector", this.svg_.setAttribute("xmlns", i), this.svg_.setAttribute("version", "1.1"), this.svg_.style.cssText = "position: absolute;top: 0;left: 0;visibility: hidden", this.pasteTarget_ = t.createElement("textarea"), this.pasteTarget_.id = "hterm:ctrl-v-paste-target", this.pasteTarget_.setAttribute("tabindex", "-1"), this.pasteTarget_.style.cssText = "position: absolute;height: 1px;width: 1px;left: 0px; bottom: 0px;opacity: 0", this.pasteTarget_.contentEditable = !0, this.screen_.appendChild(this.pasteTarget_), this.pasteTarget_.addEventListener("textInput", this.handlePasteTargetTextInput_.bind(this)), this.resize()
    }, o.ScrollPort.prototype.setFontFamily = function (e, t) {
        this.screen_.style.fontFamily = e, this.screen_.style.webkitFontSmoothing = t || "", this.syncCharacterSize()
    }, o.ScrollPort.prototype.getFontFamily = function () {
        return this.screen_.style.fontFamily
    }, o.ScrollPort.prototype.setUserCssUrl = function (e) {
        e ? (this.userCssLink_.setAttribute("href", e), this.userCssLink_.parentNode || this.document_.head.appendChild(this.userCssLink_)) : this.userCssLink_.parentNode && this.document_.head.removeChild(this.userCssLink_)
    }, o.ScrollPort.prototype.setUserCssText = function (e) {
        this.userCssText_.textContent = e
    }, o.ScrollPort.prototype.focus = function () {
        this.iframe_.focus(), this.screen_.focus()
    }, o.ScrollPort.prototype.getForegroundColor = function () {
        return this.screen_.style.color
    }, o.ScrollPort.prototype.setForegroundColor = function (e) {
        this.screen_.style.color = e
    }, o.ScrollPort.prototype.getBackgroundColor = function () {
        return this.screen_.style.backgroundColor
    }, o.ScrollPort.prototype.setBackgroundColor = function (e) {
        this.screen_.style.backgroundColor = e
    }, o.ScrollPort.prototype.setBackgroundImage = function (e) {
        this.screen_.style.backgroundImage = e
    }, o.ScrollPort.prototype.setBackgroundSize = function (e) {
        this.screen_.style.backgroundSize = e
    }, o.ScrollPort.prototype.setBackgroundPosition = function (e) {
        this.screen_.style.backgroundPosition = e
    }, o.ScrollPort.prototype.setCtrlVPaste = function (e) {
        this.ctrlVPaste = e
    }, o.ScrollPort.prototype.getScreenSize = function () {
        var e = o.getClientSize(this.screen_);
        return {
            height: e.height,
            width: e.width - this.currentScrollbarWidthPx
        }
    }, o.ScrollPort.prototype.getScreenWidth = function () {
        return this.getScreenSize().width
    }, o.ScrollPort.prototype.getScreenHeight = function () {
        return this.getScreenSize().height
    }, o.ScrollPort.prototype.getDocument = function () {
        return this.document_
    }, o.ScrollPort.prototype.getScreenNode = function () {
        return this.screen_
    }, o.ScrollPort.prototype.resetCache = function () {
        this.currentRowNodeCache_ = null, this.previousRowNodeCache_ = {}
    }, o.ScrollPort.prototype.setRowProvider = function (e) {
        this.resetCache(), this.rowProvider_ = e, this.scheduleRedraw()
    }, o.ScrollPort.prototype.invalidate = function () {
        for (var e = this.topFold_.nextSibling; e != this.bottomFold_;) {
            var t = e.nextSibling;
            e.parentElement.removeChild(e), e = t
        }
        this.previousRowNodeCache_ = null;
        var r = this.getTopRowIndex(),
            i = this.getBottomRowIndex(r);
        this.drawVisibleRows_(r, i)
    }, o.ScrollPort.prototype.scheduleInvalidate = function () {
        if (!this.timeouts_.invalidate) {
            var e = this;
            this.timeouts_.invalidate = setTimeout(function () {
                delete e.timeouts_.invalidate, e.invalidate()
            }, 0)
        }
    }, o.ScrollPort.prototype.setFontSize = function (e) {
        this.screen_.style.fontSize = e + "px", this.syncCharacterSize()
    }, o.ScrollPort.prototype.getFontSize = function () {
        return parseInt(this.screen_.style.fontSize)
    }, o.ScrollPort.prototype.measureCharacterSize = function (e) {
        this.ruler_ || (this.ruler_ = this.document_.createElement("div"), this.ruler_.id = "hterm:ruler-character-size", this.ruler_.style.cssText = "position: absolute;top: 0;left: 0;visibility: hidden;height: auto !important;width: auto !important;", this.rulerSpan_ = this.document_.createElement("span"), this.rulerSpan_.id = "hterm:ruler-span-workaround", this.rulerSpan_.innerHTML = ("X".repeat(100) + "\r").repeat(100), this.ruler_.appendChild(this.rulerSpan_), this.rulerBaseline_ = this.document_.createElement("span"), this.rulerSpan_.id = "hterm:ruler-baseline", this.rulerBaseline_.style.fontSize = "0px", this.rulerBaseline_.textContent = "X"), this.rulerSpan_.style.fontWeight = e || "", this.rowNodes_.appendChild(this.ruler_);
        var t = o.getClientSize(this.rulerSpan_),
            r = new o.Size(t.width / 100, t.height / 100);
        return this.ruler_.appendChild(this.rulerBaseline_), r.baseline = this.rulerBaseline_.offsetTop, this.ruler_.removeChild(this.rulerBaseline_), this.rowNodes_.removeChild(this.ruler_), this.div_.ownerDocument.body.appendChild(this.svg_), r.zoomFactor = this.svg_.currentScale, this.div_.ownerDocument.body.removeChild(this.svg_), r
    }, o.ScrollPort.prototype.syncCharacterSize = function () {
        this.characterSize = this.measureCharacterSize(), this.resize()
    }, o.ScrollPort.prototype.resize = function () {
        this.currentScrollbarWidthPx = o.getClientWidth(this.screen_) - this.screen_.clientWidth, this.syncScrollHeight(), this.syncRowNodesDimensions_();
        var e = this;
        this.publish("resize", {
            scrollPort: this
        }, function () {
            e.scrollRowToBottom(e.rowProvider_.getRowCount()), e.scheduleRedraw()
        })
    }, o.ScrollPort.prototype.syncRowNodesDimensions_ = function () {
        var e = this.getScreenSize();
        this.lastScreenWidth_ = e.width, this.lastScreenHeight_ = e.height, this.visibleRowCount = i.f.smartFloorDivide(e.height, this.characterSize.height);
        var t = this.visibleRowCount * this.characterSize.height;
        this.visibleRowTopMargin = 0, this.visibleRowBottomMargin = e.height - t, this.topFold_.style.marginBottom = this.visibleRowTopMargin + "px";
        for (var r = 0, s = this.topFold_.previousSibling; s;) r += o.getClientHeight(s), s = s.previousSibling;
        this.rowNodes_.style.width = e.width + "px", this.rowNodes_.style.height = t + r + "px", this.rowNodes_.style.left = this.screen_.offsetLeft + "px", this.rowNodes_.style.top = this.screen_.offsetTop - r + "px"
    }, o.ScrollPort.prototype.syncScrollHeight = function () {
        this.lastRowCount_ = this.rowProvider_.getRowCount(), this.scrollArea_.style.height = this.characterSize.height * this.lastRowCount_ + this.visibleRowTopMargin + this.visibleRowBottomMargin + "px"
    }, o.ScrollPort.prototype.scheduleRedraw = function () {
        if (!this.timeouts_.redraw) {
            var e = this;
            this.timeouts_.redraw = setTimeout(function () {
                delete e.timeouts_.redraw, e.redraw_()
            }, 0)
        }
    }, o.ScrollPort.prototype.redraw_ = function () {
        this.resetSelectBags_(), this.selection.sync(), this.syncScrollHeight(), this.currentRowNodeCache_ = {};
        var e = this.getTopRowIndex(),
            t = this.getBottomRowIndex(e);
        this.drawTopFold_(e), this.drawBottomFold_(t), this.drawVisibleRows_(e, t), this.syncRowNodesDimensions_(), this.previousRowNodeCache_ = this.currentRowNodeCache_, this.currentRowNodeCache_ = null, this.isScrolledEnd = this.getTopRowIndex() + this.visibleRowCount >= this.lastRowCount_
    }, o.ScrollPort.prototype.drawTopFold_ = function (e) {
        if (!this.selection.startRow || this.selection.startRow.rowIndex >= e) this.rowNodes_.firstChild != this.topFold_ && this.rowNodes_.insertBefore(this.topFold_, this.rowNodes_.firstChild);
        else {
            if (!this.selection.isMultiline || this.selection.endRow.rowIndex >= e) this.selection.startRow.nextSibling != this.topFold_ && this.rowNodes_.insertBefore(this.topFold_, this.selection.startRow.nextSibling);
            else
                for (this.selection.endRow.nextSibling != this.topFold_ && this.rowNodes_.insertBefore(this.topFold_, this.selection.endRow.nextSibling); this.selection.startRow.nextSibling != this.selection.endRow;) this.rowNodes_.removeChild(this.selection.startRow.nextSibling);
            for (; this.rowNodes_.firstChild != this.selection.startRow;) this.rowNodes_.removeChild(this.rowNodes_.firstChild)
        }
    }, o.ScrollPort.prototype.drawBottomFold_ = function (e) {
        if (!this.selection.endRow || this.selection.endRow.rowIndex <= e) this.rowNodes_.lastChild != this.bottomFold_ && this.rowNodes_.appendChild(this.bottomFold_);
        else {
            if (!this.selection.isMultiline || this.selection.startRow.rowIndex <= e) this.bottomFold_.nextSibling != this.selection.endRow && this.rowNodes_.insertBefore(this.bottomFold_, this.selection.endRow);
            else
                for (this.bottomFold_.nextSibling != this.selection.startRow && this.rowNodes_.insertBefore(this.bottomFold_, this.selection.startRow); this.selection.startRow.nextSibling != this.selection.endRow;) this.rowNodes_.removeChild(this.selection.startRow.nextSibling);
            for (; this.rowNodes_.lastChild != this.selection.endRow;) this.rowNodes_.removeChild(this.rowNodes_.lastChild)
        }
    }, o.ScrollPort.prototype.drawVisibleRows_ = function (e, t) {
        function r(e, t) {
            for (; e != t;) {
                if (!e) throw "Did not encounter target node";
                if (e == i.bottomFold_) throw "Encountered bottom fold before target node";
                var r = e;
                e = e.nextSibling, r.parentNode.removeChild(r)
            }
        }
        for (var i = this, o = this.selection.startRow, s = this.selection.endRow, n = this.bottomFold_, a = this.topFold_.nextSibling, l = Math.min(this.visibleRowCount, this.rowProvider_.getRowCount()), h = 0; h < l; h++) {
            var c = e + h;
            if (a != n)
                if (a.rowIndex != c)
                    if (o && o.rowIndex == c) r(a, o), a = o.nextSibling;
                    else if (s && s.rowIndex == c) r(a, s), a = s.nextSibling;
            else if (a != o && a != s) {
                var u = this.fetchRowNode_(c);
                if (!u) {
                    console.log("Couldn't fetch row index: " + c);
                    break
                }
                a != u ? (this.rowNodes_.insertBefore(u, a), u.nextSibling, this.rowNodes_.removeChild(a), a = u.nextSibling) : a = a.nextSibling
            } else {
                if (!(u = this.fetchRowNode_(c))) {
                    console.log("Couldn't fetch row index: " + c);
                    break
                }
                this.rowNodes_.insertBefore(u, a)
            } else a = a.nextSibling;
            else {
                if (!(u = this.fetchRowNode_(c))) {
                    console.log("Couldn't fetch row index: " + c);
                    break
                }
                this.rowNodes_.insertBefore(u, a)
            }
        }
        a != this.bottomFold_ && r(a, n)
    }, o.ScrollPort.prototype.resetSelectBags_ = function () {
        this.topSelectBag_.parentNode && (this.topSelectBag_.textContent = "", this.topSelectBag_.parentNode.removeChild(this.topSelectBag_)), this.bottomSelectBag_.parentNode && (this.bottomSelectBag_.textContent = "", this.bottomSelectBag_.parentNode.removeChild(this.bottomSelectBag_))
    }, o.ScrollPort.prototype.cacheRowNode_ = function (e) {
        this.currentRowNodeCache_[e.rowIndex] = e
    }, o.ScrollPort.prototype.fetchRowNode_ = function (e) {
        var t;
        return t = this.previousRowNodeCache_ && e in this.previousRowNodeCache_ ? this.previousRowNodeCache_[e] : this.rowProvider_.getRowNode(e), this.currentRowNodeCache_ && this.cacheRowNode_(t), t
    }, o.ScrollPort.prototype.selectAll = function () {
        var e;
        if (0 != this.topFold_.nextSibling.rowIndex) {
            for (; this.topFold_.previousSibling;) this.rowNodes_.removeChild(this.topFold_.previousSibling);
            e = this.fetchRowNode_(0), this.rowNodes_.insertBefore(e, this.topFold_), this.syncRowNodesDimensions_()
        } else e = this.topFold_.nextSibling;
        var t, r = this.rowProvider_.getRowCount() - 1;
        if (this.bottomFold_.previousSibling.rowIndex != r) {
            for (; this.bottomFold_.nextSibling;) this.rowNodes_.removeChild(this.bottomFold_.nextSibling);
            t = this.fetchRowNode_(r), this.rowNodes_.appendChild(t)
        } else t = this.bottomFold_.previousSibling.rowIndex;
        var i = this.document_.getSelection();
        i.collapse(e, 0), i.extend(t, t.childNodes.length), this.selection.sync()
    }, o.ScrollPort.prototype.getScrollMax_ = function (e) {
        return o.getClientHeight(this.scrollArea_) + this.visibleRowTopMargin + this.visibleRowBottomMargin - o.getClientHeight(this.screen_)
    }, o.ScrollPort.prototype.scrollRowToTop = function (e) {
        this.syncScrollHeight(), this.isScrolledEnd = e + this.visibleRowCount >= this.lastRowCount_;
        var t = e * this.characterSize.height + this.visibleRowTopMargin,
            r = this.getScrollMax_();
        t > r && (t = r), this.screen_.scrollTop != t && (this.screen_.scrollTop = t, this.scheduleRedraw())
    }, o.ScrollPort.prototype.scrollRowToBottom = function (e) {
        this.syncScrollHeight(), this.isScrolledEnd = e + this.visibleRowCount >= this.lastRowCount_;
        var t = e * this.characterSize.height + this.visibleRowTopMargin + this.visibleRowBottomMargin;
        (t -= this.visibleRowCount * this.characterSize.height) < 0 && (t = 0), this.screen_.scrollTop != t && (this.screen_.scrollTop = t)
    }, o.ScrollPort.prototype.getTopRowIndex = function () {
        return Math.round(this.screen_.scrollTop / this.characterSize.height)
    }, o.ScrollPort.prototype.getBottomRowIndex = function (e) {
        return e + this.visibleRowCount - 1
    }, o.ScrollPort.prototype.onScroll_ = function (e) {
        var t = this.getScreenSize();
        t.width == this.lastScreenWidth_ && t.height == this.lastScreenHeight_ ? (this.redraw_(), this.publish("scroll", {
            scrollPort: this
        })) : this.resize()
    }, o.ScrollPort.prototype.onScrollWheel = function (e) {}, o.ScrollPort.prototype.onScrollWheel_ = function (e) {
        if (this.onScrollWheel(e), !e.defaultPrevented) {
            var t = this.scrollWheelDelta(e),
                r = this.screen_.scrollTop - t;
            r < 0 && (r = 0);
            var i = this.getScrollMax_();
            r > i && (r = i), r != this.screen_.scrollTop && (this.screen_.scrollTop = r, e.preventDefault())
        }
    }, o.ScrollPort.prototype.scrollWheelDelta = function (e) {
        var t;
        switch (e.deltaMode) {
            case WheelEvent.DOM_DELTA_PIXEL:
                t = e.deltaY * this.scrollWheelMultiplier_;
                break;
            case WheelEvent.DOM_DELTA_LINE:
                t = e.deltaY * this.characterSize.height;
                break;
            case WheelEvent.DOM_DELTA_PAGE:
                t = e.deltaY * this.characterSize.height * this.screen_.getHeight()
        }
        return -1 * t
    }, o.ScrollPort.prototype.onTouch = function (e) {}, o.ScrollPort.prototype.onTouch_ = function (e) {
        if (this.onTouch(e), !e.defaultPrevented) {
            var t, r, i = function (e) {
                return {
                    id: e.identifier,
                    y: e.clientY,
                    x: e.clientX
                }
            };
            switch (e.type) {
                case "touchstart":
                    for (t = 0; t < e.changedTouches.length; ++t) r = i(e.changedTouches[t]), this.lastTouch_[r.id] = r;
                    break;
                case "touchcancel":
                case "touchend":
                    for (t = 0; t < e.changedTouches.length; ++t) delete this.lastTouch_[e.changedTouches[t].identifier];
                    break;
                case "touchmove":
                    var o = 0;
                    for (t = 0; t < e.changedTouches.length; ++t) r = i(e.changedTouches[t]), o += this.lastTouch_[r.id].y - r.y, this.lastTouch_[r.id] = r;
                    o *= -1;
                    var s = this.screen_.scrollTop - o;
                    s < 0 && (s = 0);
                    var n = this.getScrollMax_();
                    s > n && (s = n), s != this.screen_.scrollTop && (this.screen_.scrollTop = s)
            }
            e.preventDefault()
        }
    }, o.ScrollPort.prototype.onResize_ = function (e) {
        this.syncCharacterSize(), this.resize()
    }, o.ScrollPort.prototype.onCopy = function (e) {}, o.ScrollPort.prototype.onCopy_ = function (e) {
        if (this.onCopy(e), !e.defaultPrevented && (this.resetSelectBags_(), this.selection.sync(), this.selection.startRow && !(this.selection.endRow.rowIndex - this.selection.startRow.rowIndex < 2))) {
            var t = this.getTopRowIndex(),
                r = this.getBottomRowIndex(t);
            if (this.selection.startRow.rowIndex < t) {
                var i;
                i = this.selection.endRow.rowIndex < t ? this.selection.endRow.rowIndex : this.topFold_.nextSibling.rowIndex, this.topSelectBag_.textContent = this.rowProvider_.getRowsText(this.selection.startRow.rowIndex + 1, i), this.rowNodes_.insertBefore(this.topSelectBag_, this.selection.startRow.nextSibling), this.syncRowNodesDimensions_()
            }
            if (this.selection.endRow.rowIndex > r) {
                var o;
                o = this.selection.startRow.rowIndex > r ? this.selection.startRow.rowIndex + 1 : this.bottomFold_.previousSibling.rowIndex + 1, this.bottomSelectBag_.textContent = this.rowProvider_.getRowsText(o, this.selection.endRow.rowIndex), this.rowNodes_.insertBefore(this.bottomSelectBag_, this.selection.endRow)
            }
        }
    }, o.ScrollPort.prototype.onBodyKeyDown_ = function (e) {
        if (this.ctrlVPaste) {
            var t = String.fromCharCode(e.which).toLowerCase();
            (e.ctrlKey || e.metaKey) && "v" == t && this.pasteTarget_.focus()
        }
    }, o.ScrollPort.prototype.onPaste_ = function (e) {
        this.pasteTarget_.focus();
        var t = this;
        setTimeout(function () {
            t.publish("paste", {
                text: t.pasteTarget_.value
            }), t.pasteTarget_.value = "", t.screen_.focus()
        }, 0)
    }, o.ScrollPort.prototype.handlePasteTargetTextInput_ = function (e) {
        e.stopPropagation()
    }, o.ScrollPort.prototype.setScrollbarVisible = function (e) {
        this.screen_.style.overflowY = e ? "scroll" : "hidden"
    }, o.ScrollPort.prototype.setScrollWheelMoveMultipler = function (e) {
        this.scrollWheelMultiplier_ = e
    }, i.rtdep("lib.colors", "lib.PreferenceManager", "lib.resource", "lib.wc", "lib.f", "hterm.Keyboard", "hterm.Options", "hterm.PreferenceManager", "hterm.Screen", "hterm.ScrollPort", "hterm.Size", "hterm.TextAttributes", "hterm.VT"), o.Terminal = function (e) {
        this.profileId_ = null, this.primaryScreen_ = new o.Screen, this.alternateScreen_ = new o.Screen, this.screen_ = this.primaryScreen_, this.screenSize = new o.Size(0, 0), this.scrollPort_ = new o.ScrollPort(this), this.scrollPort_.subscribe("resize", this.onResize_.bind(this)), this.scrollPort_.subscribe("scroll", this.onScroll_.bind(this)), this.scrollPort_.subscribe("paste", this.onPaste_.bind(this)), this.scrollPort_.onCopy = this.onCopy_.bind(this), this.div_ = null, this.document_ = window.document, this.scrollbackRows_ = [], this.tabStops_ = [], this.defaultTabStops = !0, this.vtScrollTop_ = null, this.vtScrollBottom_ = null, this.cursorNode_ = null, this.cursorShape_ = o.Terminal.cursorShape.BLOCK, this.cursorColor_ = null, this.cursorBlinkCycle_ = [100, 100], this.myOnCursorBlink_ = this.onCursorBlink_.bind(this), this.backgroundColor_ = null, this.foregroundColor_ = null, this.scrollOnOutput_ = null, this.scrollOnKeystroke_ = null, this.scrollWheelArrowKeys_ = null, this.defeatMouseReports_ = !1, this.bellAudio_ = this.document_.createElement("audio"), this.bellAudio_.id = "hterm:bell-audio", this.bellAudio_.setAttribute("preload", "auto"), this.bellNotificationList_ = [], this.desktopNotificationBell_ = !1, this.savedOptions_ = {}, this.options_ = new o.Options, this.timeouts_ = {}, this.vt = new o.VT(this), this.keyboard = new o.Keyboard(this), this.io = new o.Terminal.IO(this), this.enableMouseDragScroll = !0, this.copyOnSelect = null, this.mouseRightClickPaste = null, this.mousePasteButton = null, this.useDefaultWindowCopy = !1, this.clearSelectionAfterCopy = !0, this.realizeSize_(80, 24), this.setDefaultTabStops(), this.setProfile(e || "default", function () {
            this.onTerminalReady()
        }.bind(this))
    }, o.Terminal.cursorShape = {
        BLOCK: "BLOCK",
        BEAM: "BEAM",
        UNDERLINE: "UNDERLINE"
    }, o.Terminal.prototype.onTerminalReady = function () {}, o.Terminal.prototype.tabWidth = 8, o.Terminal.prototype.setProfile = function (e, t) {
        this.profileId_ = e.replace(/\//g, "");
        var r = this;
        this.prefs_ && this.prefs_.deactivate(), this.prefs_ = new o.PreferenceManager(this.profileId_), this.prefs_.addObservers(null, {
            "alt-gr-mode": function (e) {
                e = null == e ? "en-us" == navigator.language.toLowerCase() ? "none" : "right-alt" : "string" == typeof e ? e.toLowerCase() : "none", /^(none|ctrl-alt|left-alt|right-alt)$/.test(e) || (e = "none"), r.keyboard.altGrMode = e
            },
            "alt-backspace-is-meta-backspace": function (e) {
                r.keyboard.altBackspaceIsMetaBackspace = e
            },
            "alt-is-meta": function (e) {
                r.keyboard.altIsMeta = e
            },
            "alt-sends-what": function (e) {
                /^(escape|8-bit|browser-key)$/.test(e) || (e = "escape"), r.keyboard.altSendsWhat = e
            },
            "audible-bell-sound": function (e) {
                var t = e.match(/^lib-resource:(\S+)/);
                t ? r.bellAudio_.setAttribute("src", i.resource.getDataUrl(t[1])) : r.bellAudio_.setAttribute("src", e)
            },
            "desktop-notification-bell": function (e) {
                e && Notification ? (r.desktopNotificationBell_ = "granted" === Notification.permission, r.desktopNotificationBell_ || console.warn("desktop-notification-bell is true but we do not have permission to display notifications.")) : r.desktopNotificationBell_ = !1
            },
            "background-color": function (e) {
                r.setBackgroundColor(e)
            },
            "background-image": function (e) {
                r.scrollPort_.setBackgroundImage(e)
            },
            "background-size": function (e) {
                r.scrollPort_.setBackgroundSize(e)
            },
            "background-position": function (e) {
                r.scrollPort_.setBackgroundPosition(e)
            },
            "backspace-sends-backspace": function (e) {
                r.keyboard.backspaceSendsBackspace = e
            },
            "character-map-overrides": function (e) {
                null == e || e instanceof Object ? (r.vt.characterMaps.reset(), r.vt.characterMaps.setOverrides(e)) : console.warn("Preference character-map-modifications is not an object: " + e)
            },
            "cursor-blink": function (e) {
                r.setCursorBlink(!!e)
            },
            "cursor-blink-cycle": function (e) {
                e instanceof Array && "number" == typeof e[0] && "number" == typeof e[1] ? r.cursorBlinkCycle_ = e : r.cursorBlinkCycle_ = "number" == typeof e ? [e, e] : [100, 100]
            },
            "cursor-color": function (e) {
                r.setCursorColor(e)
            },
            "color-palette-overrides": function (e) {
                if (null == e || e instanceof Object || e instanceof Array) {
                    if (i.colors.colorPalette = i.colors.stockColorPalette.concat(), e)
                        for (var t in e) {
                            var o = parseInt(t);
                            if (isNaN(o) || o < 0 || o > 255) console.log("Invalid value in palette: " + t + ": " + e[t]);
                            else if (e[o]) {
                                var s = i.colors.normalizeCSS(e[o]);
                                s && (i.colors.colorPalette[o] = s)
                            }
                        }
                    r.primaryScreen_.textAttributes.resetColorPalette(), r.alternateScreen_.textAttributes.resetColorPalette()
                } else console.warn("Preference color-palette-overrides is not an array or object: " + e)
            },
            "copy-on-select": function (e) {
                r.copyOnSelect = !!e
            },
            "use-default-window-copy": function (e) {
                r.useDefaultWindowCopy = !!e
            },
            "clear-selection-after-copy": function (e) {
                r.clearSelectionAfterCopy = !!e
            },
            "ctrl-plus-minus-zero-zoom": function (e) {
                r.keyboard.ctrlPlusMinusZeroZoom = e
            },
            "ctrl-c-copy": function (e) {
                r.keyboard.ctrlCCopy = e
            },
            "ctrl-v-paste": function (e) {
                r.keyboard.ctrlVPaste = e, r.scrollPort_.setCtrlVPaste(e)
            },
            "east-asian-ambiguous-as-two-column": function (e) {
                i.wc.regardCjkAmbiguous = e
            },
            "enable-8-bit-control": function (e) {
                r.vt.enable8BitControl = !!e
            },
            "enable-bold": function (e) {
                r.syncBoldSafeState()
            },
            "enable-bold-as-bright": function (e) {
                r.primaryScreen_.textAttributes.enableBoldAsBright = !!e, r.alternateScreen_.textAttributes.enableBoldAsBright = !!e
            },
            "enable-blink": function (e) {
                r.syncBlinkState()
            },
            "enable-clipboard-write": function (e) {
                r.vt.enableClipboardWrite = !!e
            },
            "enable-dec12": function (e) {
                r.vt.enableDec12 = !!e
            },
            "font-family": function (e) {
                r.syncFontFamily()
            },
            "font-size": function (e) {
                r.setFontSize(e)
            },
            "font-smoothing": function (e) {
                r.syncFontFamily()
            },
            "foreground-color": function (e) {
                r.setForegroundColor(e)
            },
            "home-keys-scroll": function (e) {
                r.keyboard.homeKeysScroll = e
            },
            keybindings: function (e) {
                if (r.keyboard.bindings.clear(), e)
                    if (e instanceof Object) try {
                        r.keyboard.bindings.addBindings(e)
                    } catch (e) {
                        console.error("Error in keybindings preference: " + e)
                    } else console.error("Error in keybindings preference: Expected object")
            },
            "max-string-sequence": function (e) {
                r.vt.maxStringSequence = e
            },
            "media-keys-are-fkeys": function (e) {
                r.keyboard.mediaKeysAreFKeys = e
            },
            "meta-sends-escape": function (e) {
                r.keyboard.metaSendsEscape = e
            },
            "mouse-right-click-paste": function (e) {
                r.mouseRightClickPaste = e
            },
            "mouse-paste-button": function (e) {
                r.syncMousePasteButton()
            },
            "page-keys-scroll": function (e) {
                r.keyboard.pageKeysScroll = e
            },
            "pass-alt-number": function (e) {
                null == e && (e = !window.navigator.userAgent.match(/Mac OS X/) && "popup" != o.windowType), r.passAltNumber = e
            },
            "pass-ctrl-number": function (e) {
                null == e && (e = !window.navigator.userAgent.match(/Mac OS X/) && "popup" != o.windowType), r.passCtrlNumber = e
            },
            "pass-meta-number": function (e) {
                null == e && (e = window.navigator.userAgent.match(/Mac OS X/) && "popup" != o.windowType), r.passMetaNumber = e
            },
            "pass-meta-v": function (e) {
                r.keyboard.passMetaV = e
            },
            "receive-encoding": function (e) {
                /^(utf-8|raw)$/.test(e) || (console.warn('Invalid value for "receive-encoding": ' + e), e = "utf-8"), r.vt.characterEncoding = e
            },
            "scroll-on-keystroke": function (e) {
                r.scrollOnKeystroke_ = e
            },
            "scroll-on-output": function (e) {
                r.scrollOnOutput_ = e
            },
            "scrollbar-visible": function (e) {
                r.setScrollbarVisible(e)
            },
            "scroll-wheel-may-send-arrow-keys": function (e) {
                r.scrollWheelArrowKeys_ = e
            },
            "scroll-wheel-move-multiplier": function (e) {
                r.setScrollWheelMoveMultipler(e)
            },
            "send-encoding": function (e) {
                /^(utf-8|raw)$/.test(e) || (console.warn('Invalid value for "send-encoding": ' + e), e = "utf-8"), r.keyboard.characterEncoding = e
            },
            "shift-insert-paste": function (e) {
                r.keyboard.shiftInsertPaste = e
            },
            "terminal-encoding": function (e) {
                r.vt.setEncoding(e)
            },
            "user-css": function (e) {
                r.scrollPort_.setUserCssUrl(e)
            },
            "user-css-text": function (e) {
                r.scrollPort_.setUserCssText(e)
            },
            "word-break-match-left": function (e) {
                r.primaryScreen_.wordBreakMatchLeft = e, r.alternateScreen_.wordBreakMatchLeft = e
            },
            "word-break-match-right": function (e) {
                r.primaryScreen_.wordBreakMatchRight = e, r.alternateScreen_.wordBreakMatchRight = e
            },
            "word-break-match-middle": function (e) {
                r.primaryScreen_.wordBreakMatchMiddle = e, r.alternateScreen_.wordBreakMatchMiddle = e
            }
        }), this.prefs_.readStorage(function () {
            this.prefs_.notifyAll(), t && t()
        }.bind(this))
    }, o.Terminal.prototype.getPrefs = function () {
        return this.prefs_
    }, o.Terminal.prototype.setBracketedPaste = function (e) {
        this.options_.bracketedPaste = e
    }, o.Terminal.prototype.setCursorColor = function (e) {
        this.cursorColor_ = e, this.cursorNode_.style.backgroundColor = e, this.cursorNode_.style.borderColor = e
    }, o.Terminal.prototype.getCursorColor = function () {
        return this.cursorColor_
    }, o.Terminal.prototype.setSelectionEnabled = function (e) {
        this.enableMouseDragScroll = e
    }, o.Terminal.prototype.setBackgroundColor = function (e) {
        this.backgroundColor_ = i.colors.normalizeCSS(e), this.primaryScreen_.textAttributes.setDefaults(this.foregroundColor_, this.backgroundColor_), this.alternateScreen_.textAttributes.setDefaults(this.foregroundColor_, this.backgroundColor_), this.scrollPort_.setBackgroundColor(e)
    }, o.Terminal.prototype.getBackgroundColor = function () {
        return this.backgroundColor_
    }, o.Terminal.prototype.setForegroundColor = function (e) {
        this.foregroundColor_ = i.colors.normalizeCSS(e), this.primaryScreen_.textAttributes.setDefaults(this.foregroundColor_, this.backgroundColor_), this.alternateScreen_.textAttributes.setDefaults(this.foregroundColor_, this.backgroundColor_), this.scrollPort_.setForegroundColor(e)
    }, o.Terminal.prototype.getForegroundColor = function () {
        return this.foregroundColor_
    }, o.Terminal.prototype.runCommandClass = function (e, t) {
        var r = this.prefs_.get("environment");
        "object" == typeof r && null != r || (r = {});
        var i = this;
        this.command = new e({
            argString: t || "",
            io: this.io.push(),
            environment: r,
            onExit: function (e) {
                i.io.pop(), i.uninstallKeyboard(), i.prefs_.get("close-on-exit") && window.close()
            }
        }), this.installKeyboard(), this.command.run()
    }, o.Terminal.prototype.isPrimaryScreen = function () {
        return this.screen_ == this.primaryScreen_
    }, o.Terminal.prototype.installKeyboard = function () {
        this.keyboard.installKeyboard(this.scrollPort_.getDocument().body)
    }, o.Terminal.prototype.uninstallKeyboard = function () {
        this.keyboard.installKeyboard(null)
    }, o.Terminal.prototype.setCssVar = function (e, t, r = "--hterm-") {
        this.document_.documentElement.style.setProperty(`${r}${e}`, t)
    }, o.Terminal.prototype.setFontSize = function (e) {
        0 === e && (e = this.prefs_.get("font-size")), this.scrollPort_.setFontSize(e), this.setCssVar("charsize-width", this.scrollPort_.characterSize.width + "px"), this.setCssVar("charsize-height", this.scrollPort_.characterSize.height + "px")
    }, o.Terminal.prototype.getFontSize = function () {
        return this.scrollPort_.getFontSize()
    }, o.Terminal.prototype.getFontFamily = function () {
        return this.scrollPort_.getFontFamily()
    }, o.Terminal.prototype.syncFontFamily = function () {
        this.scrollPort_.setFontFamily(this.prefs_.get("font-family"), this.prefs_.get("font-smoothing")), this.syncBoldSafeState()
    }, o.Terminal.prototype.syncMousePasteButton = function () {
        var e = this.prefs_.get("mouse-paste-button");
        if ("number" != typeof e) {
            var t = navigator.userAgent.match(/\(X11;\s+(\S+)/);
            t && "CrOS" != t[1] ? this.mousePasteButton = 2 : this.mousePasteButton = 1
        } else this.mousePasteButton = e
    }, o.Terminal.prototype.syncBoldSafeState = function () {
        var e = this.prefs_.get("enable-bold");
        if (null !== e) return this.primaryScreen_.textAttributes.enableBold = e, void(this.alternateScreen_.textAttributes.enableBold = e);
        var t = this.scrollPort_.measureCharacterSize(),
            r = this.scrollPort_.measureCharacterSize("bold"),
            i = t.equals(r);
        i || console.warn("Bold characters disabled: Size of bold weight differs from normal.  Font family is: " + this.scrollPort_.getFontFamily()), this.primaryScreen_.textAttributes.enableBold = i, this.alternateScreen_.textAttributes.enableBold = i
    }, o.Terminal.prototype.syncBlinkState = function () {
        this.setCssVar("node-duration", this.prefs_.get("enable-blink") ? "0.7s" : "0")
    }, o.Terminal.prototype.syncMouseStyle = function () {
        this.setCssVar("mouse-cursor-style", this.vt.mouseReport == this.vt.MOUSE_REPORT_DISABLED ? "var(--hterm-mouse-cursor-text)" : "var(--hterm-mouse-cursor-pointer)")
    }, o.Terminal.prototype.saveCursor = function () {
        return this.screen_.cursorPosition.clone()
    }, o.Terminal.prototype.getTextAttributes = function () {
        return this.screen_.textAttributes
    }, o.Terminal.prototype.setTextAttributes = function (e) {
        this.screen_.textAttributes = e
    }, o.Terminal.prototype.getZoomFactor = function () {
        return this.scrollPort_.characterSize.zoomFactor
    }, o.Terminal.prototype.setWindowTitle = function (e) {
        window.document.title = e
    }, o.Terminal.prototype.restoreCursor = function (e) {
        var t = i.f.clamp(e.row, 0, this.screenSize.height - 1),
            r = i.f.clamp(e.column, 0, this.screenSize.width - 1);
        this.screen_.setCursorPosition(t, r), (e.column > r || e.column == r && e.overflow) && (this.screen_.cursorPosition.overflow = !0)
    }, o.Terminal.prototype.clearCursorOverflow = function () {
        this.screen_.cursorPosition.overflow = !1
    }, o.Terminal.prototype.setCursorShape = function (e) {
        this.cursorShape_ = e, this.restyleCursor_()
    }, o.Terminal.prototype.getCursorShape = function () {
        return this.cursorShape_
    }, o.Terminal.prototype.setWidth = function (e) {
        null != e ? (this.div_.style.width = Math.ceil(this.scrollPort_.characterSize.width * e + this.scrollPort_.currentScrollbarWidthPx) + "px", this.realizeSize_(e, this.screenSize.height), this.scheduleSyncCursorPosition_()) : this.div_.style.width = "100%"
    }, o.Terminal.prototype.setHeight = function (e) {
        null != e ? (this.div_.style.height = this.scrollPort_.characterSize.height * e + "px", this.realizeSize_(this.screenSize.width, e), this.scheduleSyncCursorPosition_()) : this.div_.style.height = "100%"
    }, o.Terminal.prototype.realizeSize_ = function (e, t) {
        e != this.screenSize.width && this.realizeWidth_(e), t != this.screenSize.height && this.realizeHeight_(t), this.io.onTerminalResize_(e, t)
    }, o.Terminal.prototype.realizeWidth_ = function (e) {
        if (e <= 0) throw new Error("Attempt to realize bad width: " + e);
        var t = e - this.screen_.getWidth();
        if (this.screenSize.width = e, this.screen_.setColumnCount(e), t > 0) this.defaultTabStops && this.setDefaultTabStops(this.screenSize.width - t);
        else
            for (var r = this.tabStops_.length - 1; r >= 0 && !(this.tabStops_[r] < e); r--) this.tabStops_.pop();
        this.screen_.setColumnCount(this.screenSize.width)
    }, o.Terminal.prototype.realizeHeight_ = function (e) {
        if (e <= 0) throw new Error("Attempt to realize bad height: " + e);
        var t = e - this.screen_.getHeight();
        this.screenSize.height = e;
        var r = this.saveCursor();
        if (t < 0) {
            for (t *= -1; t;) {
                var i = this.getRowCount() - 1;
                if (i - this.scrollbackRows_.length == r.row) break;
                if (this.getRowText(i)) break;
                this.screen_.popRow(), t--
            }
            var o = this.screen_.shiftRows(t);
            this.scrollbackRows_.push.apply(this.scrollbackRows_, o), r.row = Math.max(r.row - t, 0)
        } else if (t > 0) {
            if (t <= this.scrollbackRows_.length) {
                var s = Math.min(t, this.scrollbackRows_.length),
                    n = this.scrollbackRows_.splice(this.scrollbackRows_.length - s, s);
                this.screen_.unshiftRows(n), t -= s, r.row += s
            }
            t && this.appendRows_(t)
        }
        this.setVTScrollRegion(null, null), this.restoreCursor(r)
    }, o.Terminal.prototype.scrollHome = function () {
        this.scrollPort_.scrollRowToTop(0)
    }, o.Terminal.prototype.scrollEnd = function () {
        this.scrollPort_.scrollRowToBottom(this.getRowCount())
    }, o.Terminal.prototype.scrollPageUp = function () {
        var e = this.scrollPort_.getTopRowIndex();
        this.scrollPort_.scrollRowToTop(e - this.screenSize.height + 1)
    }, o.Terminal.prototype.scrollPageDown = function () {
        var e = this.scrollPort_.getTopRowIndex();
        this.scrollPort_.scrollRowToTop(e + this.screenSize.height - 1)
    }, o.Terminal.prototype.scrollLineUp = function () {
        var e = this.scrollPort_.getTopRowIndex();
        this.scrollPort_.scrollRowToTop(e - 1)
    }, o.Terminal.prototype.scrollLineDown = function () {
        var e = this.scrollPort_.getTopRowIndex();
        this.scrollPort_.scrollRowToTop(e + 1)
    }, o.Terminal.prototype.wipeContents = function () {
        this.scrollbackRows_.length = 0, this.scrollPort_.resetCache(), [this.primaryScreen_, this.alternateScreen_].forEach(function (e) {
            var t = e.getHeight();
            t > 0 && (this.renumberRows_(0, t), this.clearHome(e))
        }.bind(this)), this.syncCursorPosition_(), this.scrollPort_.invalidate()
    }, o.Terminal.prototype.reset = function () {
        this.clearAllTabStops(), this.setDefaultTabStops(), this.clearHome(this.primaryScreen_), this.primaryScreen_.textAttributes.reset(), this.clearHome(this.alternateScreen_), this.alternateScreen_.textAttributes.reset(), this.setCursorBlink(!!this.prefs_.get("cursor-blink")), this.vt.reset(), this.softReset()
    }, o.Terminal.prototype.softReset = function () {
        this.options_ = new o.Options, this.options_.cursorBlink = !!this.timeouts_.cursorBlink, this.primaryScreen_.textAttributes.resetColorPalette(), this.alternateScreen_.textAttributes.resetColorPalette(), this.setVTScrollRegion(null, null), this.setCursorVisible(!0)
    }, o.Terminal.prototype.forwardTabStop = function () {
        for (var e = this.screen_.cursorPosition.column, t = 0; t < this.tabStops_.length; t++)
            if (this.tabStops_[t] > e) return void this.setCursorColumn(this.tabStops_[t]);
        var r = this.screen_.cursorPosition.overflow;
        this.setCursorColumn(this.screenSize.width - 1), this.screen_.cursorPosition.overflow = r
    }, o.Terminal.prototype.backwardTabStop = function () {
        for (var e = this.screen_.cursorPosition.column, t = this.tabStops_.length - 1; t >= 0; t--)
            if (this.tabStops_[t] < e) return void this.setCursorColumn(this.tabStops_[t]);
        this.setCursorColumn(1)
    }, o.Terminal.prototype.setTabStop = function (e) {
        for (var t = this.tabStops_.length - 1; t >= 0; t--) {
            if (this.tabStops_[t] == e) return;
            if (this.tabStops_[t] < e) return void this.tabStops_.splice(t + 1, 0, e)
        }
        this.tabStops_.splice(0, 0, e)
    }, o.Terminal.prototype.clearTabStopAtCursor = function () {
        var e = this.screen_.cursorPosition.column,
            t = this.tabStops_.indexOf(e); - 1 != t && this.tabStops_.splice(t, 1)
    }, o.Terminal.prototype.clearAllTabStops = function () {
        this.tabStops_.length = 0, this.defaultTabStops = !1
    }, o.Terminal.prototype.setDefaultTabStops = function (e) {
        for (var t = e || 0, r = this.tabWidth, i = t = t - 1 - (t - 1) % r + r; i < this.screenSize.width; i += r) this.setTabStop(i);
        this.defaultTabStops = !0
    }, o.Terminal.prototype.interpret = function (e) {
        this.vt.interpret(e), this.scheduleSyncCursorPosition_()
    }, o.Terminal.prototype.decorate = function (e) {
        this.div_ = e, this.scrollPort_.decorate(e), this.scrollPort_.setBackgroundImage(this.prefs_.get("background-image")), this.scrollPort_.setBackgroundSize(this.prefs_.get("background-size")), this.scrollPort_.setBackgroundPosition(this.prefs_.get("background-position")), this.scrollPort_.setUserCssUrl(this.prefs_.get("user-css")), this.scrollPort_.setUserCssText(this.prefs_.get("user-css-text")), this.div_.focus = this.focus.bind(this), this.setFontSize(this.prefs_.get("font-size")), this.syncFontFamily(), this.setScrollbarVisible(this.prefs_.get("scrollbar-visible")), this.setScrollWheelMoveMultipler(this.prefs_.get("scroll-wheel-move-multiplier")), this.document_ = this.scrollPort_.getDocument(), this.document_.body.oncontextmenu = function () {
            return !1
        };
        var t = this.onMouse_.bind(this),
            r = this.scrollPort_.getScreenNode();
        r.addEventListener("mousedown", t), r.addEventListener("mouseup", t), r.addEventListener("mousemove", t), this.scrollPort_.onScrollWheel = t, r.addEventListener("focus", this.onFocusChange_.bind(this, !0)), r.addEventListener("mousedown", function () {
            setTimeout(this.onFocusChange_.bind(this, !0))
        }.bind(this)), r.addEventListener("blur", this.onFocusChange_.bind(this, !1));
        var i = this.document_.createElement("style");
        i.textContent = '.cursor-node[focus="false"] {  box-sizing: border-box;  background-color: transparent !important;  border-width: 2px;  border-style: solid;}.wc-node {  display: inline-block;  text-align: center;  width: calc(var(--hterm-charsize-width) * 2);  line-height: var(--hterm-charsize-height);}:root {  --hterm-charsize-width: ' + this.scrollPort_.characterSize.width + "px;  --hterm-charsize-height: " + this.scrollPort_.characterSize.height + "px;  --hterm-cursor-offset-col: 0;  --hterm-cursor-offset-row: 0;  --hterm-blink-node-duration: 0.7s;  --hterm-mouse-cursor-text: text;  --hterm-mouse-cursor-pointer: default;  --hterm-mouse-cursor-style: var(--hterm-mouse-cursor-text);}@keyframes blink {  from { opacity: 1.0; }  to { opacity: 0.0; }}.blink-node {  animation-name: blink;  animation-duration: var(--hterm-blink-node-duration);  animation-iteration-count: infinite;  animation-timing-function: ease-in-out;  animation-direction: alternate;}", this.document_.head.appendChild(i), this.cursorNode_ = this.document_.createElement("div"), this.cursorNode_.id = "hterm:terminal-cursor", this.cursorNode_.className = "cursor-node", this.cursorNode_.style.cssText = "position: absolute;left: calc(var(--hterm-charsize-width) * var(--hterm-cursor-offset-col));top: calc(var(--hterm-charsize-height) * var(--hterm-cursor-offset-row));display: block;width: var(--hterm-charsize-width);height: var(--hterm-charsize-height);-webkit-transition: opacity, background-color 100ms linear;-moz-transition: opacity, background-color 100ms linear;", this.setCursorColor(this.prefs_.get("cursor-color")), this.setCursorBlink(!!this.prefs_.get("cursor-blink")), this.restyleCursor_(), this.document_.body.appendChild(this.cursorNode_), this.scrollBlockerNode_ = this.document_.createElement("div"), this.scrollBlockerNode_.id = "hterm:mouse-drag-scroll-blocker", this.scrollBlockerNode_.style.cssText = "position: absolute;top: -99px;display: block;width: 10px;height: 10px;", this.document_.body.appendChild(this.scrollBlockerNode_), this.scrollPort_.onScrollWheel = t, ["mousedown", "mouseup", "mousemove", "click", "dblclick"].forEach(function (e) {
            this.scrollBlockerNode_.addEventListener(e, t), this.cursorNode_.addEventListener(e, t), this.document_.addEventListener(e, t)
        }.bind(this)), this.cursorNode_.addEventListener("mousedown", function () {
            setTimeout(this.focus.bind(this))
        }.bind(this)), this.setReverseVideo(!1), this.scrollPort_.focus(), this.scrollPort_.scheduleRedraw()
    }, o.Terminal.prototype.getDocument = function () {
        return this.document_
    }, o.Terminal.prototype.focus = function () {
        this.scrollPort_.focus()
    }, o.Terminal.prototype.getRowNode = function (e) {
        if (e < this.scrollbackRows_.length) return this.scrollbackRows_[e];
        var t = e - this.scrollbackRows_.length;
        return this.screen_.rowsArray[t]
    }, o.Terminal.prototype.getRowsText = function (e, t) {
        for (var r = [], i = e; i < t; i++) {
            var o = this.getRowNode(i);
            r.push(o.textContent), i < t - 1 && !o.getAttribute("line-overflow") && r.push("\n")
        }
        return r.join("")
    }, o.Terminal.prototype.getRowText = function (e) {
        return this.getRowNode(e).textContent
    }, o.Terminal.prototype.getRowCount = function () {
        return this.scrollbackRows_.length + this.screen_.rowsArray.length
    }, o.Terminal.prototype.appendRows_ = function (e) {
        for (var t = this.screen_.rowsArray.length, r = this.scrollbackRows_.length + t, i = 0; i < e; i++) {
            var o = this.document_.createElement("x-row");
            o.appendChild(this.document_.createTextNode("")), o.rowIndex = r + i, this.screen_.pushRow(o)
        }
        var s = this.screen_.rowsArray.length - this.screenSize.height;
        if (s > 0) {
            var n = this.screen_.shiftRows(s);
            Array.prototype.push.apply(this.scrollbackRows_, n), this.scrollPort_.isScrolledEnd && this.scheduleScrollDown_()
        }
        t >= this.screen_.rowsArray.length && (t = this.screen_.rowsArray.length - 1), this.setAbsoluteCursorPosition(t, 0)
    }, o.Terminal.prototype.moveRows_ = function (e, t, r) {
        var i = this.screen_.removeRows(e, t);
        this.screen_.insertRows(r, i);
        var o, s;
        e < r ? (o = e, s = r + t) : (o = r, s = e + t), this.renumberRows_(o, s), this.scrollPort_.scheduleInvalidate()
    }, o.Terminal.prototype.renumberRows_ = function (e, t, r) {
        for (var i = r || this.screen_, o = this.scrollbackRows_.length, s = e; s < t; s++) i.rowsArray[s].rowIndex = o + s
    }, o.Terminal.prototype.print = function (e) {
        for (var t = 0, r = i.wc.strWidth(e); t < r;) {
            this.options_.wraparound && this.screen_.cursorPosition.overflow && (this.screen_.commitLineOverflow(), this.newLine());
            var s, n = r - t,
                a = !1;
            this.screen_.cursorPosition.column + n >= this.screenSize.width && (a = !0, n = this.screenSize.width - this.screen_.cursorPosition.column), a && !this.options_.wraparound ? (s = i.wc.substr(e, t, n - 1) + i.wc.substr(e, r - 1), n = r) : s = i.wc.substr(e, t, n);
            for (var l = o.TextAttributes.splitWidecharString(s), h = 0; h < l.length; h++) this.screen_.textAttributes.wcNode = l[h].wcNode, this.screen_.textAttributes.asciiNode = l[h].asciiNode, this.options_.insertMode ? this.screen_.insertString(l[h].str) : this.screen_.overwriteString(l[h].str), this.screen_.textAttributes.wcNode = !1, this.screen_.textAttributes.asciiNode = !0;
            this.screen_.maybeClipCurrentRow(), t += n
        }
        this.scheduleSyncCursorPosition_(), this.scrollOnOutput_ && this.scrollPort_.scrollRowToBottom(this.getRowCount())
    }, o.Terminal.prototype.setVTScrollRegion = function (e, t) {
        0 == e && t == this.screenSize.height - 1 ? (this.vtScrollTop_ = null, this.vtScrollBottom_ = null) : (this.vtScrollTop_ = e, this.vtScrollBottom_ = t)
    }, o.Terminal.prototype.getVTScrollTop = function () {
        return null != this.vtScrollTop_ ? this.vtScrollTop_ : 0
    }, o.Terminal.prototype.getVTScrollBottom = function () {
        return null != this.vtScrollBottom_ ? this.vtScrollBottom_ : this.screenSize.height - 1
    }, o.Terminal.prototype.newLine = function () {
        var e = this.screen_.cursorPosition.row == this.screen_.rowsArray.length - 1;
        null != this.vtScrollBottom_ ? this.screen_.cursorPosition.row == this.vtScrollBottom_ ? (this.vtScrollUp(1), this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row, 0)) : e ? this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row, 0) : this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row + 1, 0) : e ? this.appendRows_(1) : this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row + 1, 0)
    }, o.Terminal.prototype.lineFeed = function () {
        var e = this.screen_.cursorPosition.column;
        this.newLine(), this.setCursorColumn(e)
    }, o.Terminal.prototype.formFeed = function () {
        this.options_.autoCarriageReturn ? this.newLine() : this.lineFeed()
    }, o.Terminal.prototype.reverseLineFeed = function () {
        var e = this.getVTScrollTop(),
            t = this.screen_.cursorPosition.row;
        t == e ? this.insertLines(1) : this.setAbsoluteCursorRow(t - 1)
    }, o.Terminal.prototype.eraseToLeft = function () {
        var e = this.saveCursor();
        this.setCursorColumn(0), this.screen_.overwriteString(i.f.getWhitespace(e.column + 1)), this.restoreCursor(e)
    }, o.Terminal.prototype.eraseToRight = function (e) {
        if (!this.screen_.cursorPosition.overflow) {
            var t = this.screenSize.width - this.screen_.cursorPosition.column,
                r = e ? Math.min(e, t) : t;
            if (this.screen_.textAttributes.background === this.screen_.textAttributes.DEFAULT_COLOR) {
                var s = this.screen_.rowsArray[this.screen_.cursorPosition.row];
                if (o.TextAttributes.nodeWidth(s) <= this.screen_.cursorPosition.column + r) return this.screen_.deleteChars(r), void this.clearCursorOverflow()
            }
            var n = this.saveCursor();
            this.screen_.overwriteString(i.f.getWhitespace(r)), this.restoreCursor(n), this.clearCursorOverflow()
        }
    }, o.Terminal.prototype.eraseLine = function () {
        var e = this.saveCursor();
        this.screen_.clearCursorRow(), this.restoreCursor(e), this.clearCursorOverflow()
    }, o.Terminal.prototype.eraseAbove = function () {
        var e = this.saveCursor();
        this.eraseToLeft();
        for (var t = 0; t < e.row; t++) this.setAbsoluteCursorPosition(t, 0), this.screen_.clearCursorRow();
        this.restoreCursor(e), this.clearCursorOverflow()
    }, o.Terminal.prototype.eraseBelow = function () {
        var e = this.saveCursor();
        this.eraseToRight();
        for (var t = this.screenSize.height - 1, r = e.row + 1; r <= t; r++) this.setAbsoluteCursorPosition(r, 0), this.screen_.clearCursorRow();
        this.restoreCursor(e), this.clearCursorOverflow()
    }, o.Terminal.prototype.fill = function (e) {
        var t = this.saveCursor();
        this.setAbsoluteCursorPosition(0, 0);
        for (var r = 0; r < this.screenSize.height; r++)
            for (var i = 0; i < this.screenSize.width; i++) this.setAbsoluteCursorPosition(r, i), this.screen_.overwriteString(e);
        this.restoreCursor(t)
    }, o.Terminal.prototype.clearHome = function (e) {
        var t = e || this.screen_,
            r = t.getHeight();
        if (0 != r) {
            for (var i = 0; i < r; i++) t.setCursorPosition(i, 0), t.clearCursorRow();
            t.setCursorPosition(0, 0)
        }
    }, o.Terminal.prototype.clear = function (e) {
        var t = e || this.screen_,
            r = t.cursorPosition.clone();
        this.clearHome(t), t.setCursorPosition(r.row, r.column)
    }, o.Terminal.prototype.insertLines = function (e) {
        var t = this.screen_.cursorPosition.row,
            r = this.getVTScrollBottom(),
            i = r - t - (e = Math.min(e, r - t)) + 1;
        i && this.moveRows_(t, i, t + e);
        for (var o = e - 1; o >= 0; o--) this.setAbsoluteCursorPosition(t + o, 0), this.screen_.clearCursorRow()
    }, o.Terminal.prototype.deleteLines = function (e) {
        var t = this.saveCursor(),
            r = t.row,
            i = this.getVTScrollBottom(),
            o = i - r + 1,
            s = i - (e = Math.min(e, o)) + 1;
        e != o && this.moveRows_(r, e, s);
        for (var n = 0; n < e; n++) this.setAbsoluteCursorPosition(s + n, 0), this.screen_.clearCursorRow();
        this.restoreCursor(t), this.clearCursorOverflow()
    }, o.Terminal.prototype.insertSpace = function (e) {
        var t = this.saveCursor(),
            r = i.f.getWhitespace(e || 1);
        this.screen_.insertString(r), this.screen_.maybeClipCurrentRow(), this.restoreCursor(t), this.clearCursorOverflow()
    }, o.Terminal.prototype.deleteChars = function (e) {
        var t = this.screen_.deleteChars(e);
        if (t && !this.screen_.textAttributes.isDefault()) {
            var r = this.saveCursor();
            this.setCursorColumn(this.screenSize.width - t), this.screen_.insertString(i.f.getWhitespace(t)), this.restoreCursor(r)
        }
        this.clearCursorOverflow()
    }, o.Terminal.prototype.vtScrollUp = function (e) {
        var t = this.saveCursor();
        this.setAbsoluteCursorRow(this.getVTScrollTop()), this.deleteLines(e), this.restoreCursor(t)
    }, o.Terminal.prototype.vtScrollDown = function (e) {
        var t = this.saveCursor();
        this.setAbsoluteCursorPosition(this.getVTScrollTop(), 0), this.insertLines(e), this.restoreCursor(t)
    }, o.Terminal.prototype.setCursorPosition = function (e, t) {
        this.options_.originMode ? this.setRelativeCursorPosition(e, t) : this.setAbsoluteCursorPosition(e, t)
    }, o.Terminal.prototype.setRelativeCursorPosition = function (e, t) {
        var r = this.getVTScrollTop();
        e = i.f.clamp(e + r, r, this.getVTScrollBottom()), t = i.f.clamp(t, 0, this.screenSize.width - 1), this.screen_.setCursorPosition(e, t)
    }, o.Terminal.prototype.setAbsoluteCursorPosition = function (e, t) {
        e = i.f.clamp(e, 0, this.screenSize.height - 1), t = i.f.clamp(t, 0, this.screenSize.width - 1), this.screen_.setCursorPosition(e, t)
    }, o.Terminal.prototype.setCursorColumn = function (e) {
        this.setAbsoluteCursorPosition(this.screen_.cursorPosition.row, e)
    }, o.Terminal.prototype.getCursorColumn = function () {
        return this.screen_.cursorPosition.column
    }, o.Terminal.prototype.setAbsoluteCursorRow = function (e) {
        this.setAbsoluteCursorPosition(e, this.screen_.cursorPosition.column)
    }, o.Terminal.prototype.getCursorRow = function () {
        return this.screen_.cursorPosition.row
    }, o.Terminal.prototype.scheduleRedraw_ = function () {
        if (!this.timeouts_.redraw) {
            var e = this;
            this.timeouts_.redraw = setTimeout(function () {
                delete e.timeouts_.redraw, e.scrollPort_.redraw_()
            }, 0)
        }
    }, o.Terminal.prototype.scheduleScrollDown_ = function () {
        if (!this.timeouts_.scrollDown) {
            var e = this;
            this.timeouts_.scrollDown = setTimeout(function () {
                delete e.timeouts_.scrollDown, e.scrollPort_.scrollRowToBottom(e.getRowCount())
            }, 10)
        }
    }, o.Terminal.prototype.cursorUp = function (e) {
        return this.cursorDown(-(e || 1))
    }, o.Terminal.prototype.cursorDown = function (e) {
        e = e || 1;
        var t = this.options_.originMode ? this.getVTScrollTop() : 0,
            r = this.options_.originMode ? this.getVTScrollBottom() : this.screenSize.height - 1,
            o = i.f.clamp(this.screen_.cursorPosition.row + e, t, r);
        this.setAbsoluteCursorRow(o)
    }, o.Terminal.prototype.cursorLeft = function (e) {
        if (!((e = e || 1) < 1)) {
            var t = this.screen_.cursorPosition.column;
            if (this.options_.reverseWraparound) {
                if (this.screen_.cursorPosition.overflow && (e--, this.clearCursorOverflow(), !e)) return;
                var r = this.screen_.cursorPosition.row;
                (i = t - e) < 0 && ((r = r - Math.floor(e / this.screenSize.width) - 1) < 0 && (r = this.screenSize.height + r % this.screenSize.height), i = this.screenSize.width + i % this.screenSize.width), this.setCursorPosition(Math.max(r, 0), i)
            } else {
                var i = Math.max(t - e, 0);
                this.setCursorColumn(i)
            }
        }
    }, o.Terminal.prototype.cursorRight = function (e) {
        if (!((e = e || 1) < 1)) {
            var t = i.f.clamp(this.screen_.cursorPosition.column + e, 0, this.screenSize.width - 1);
            this.setCursorColumn(t)
        }
    }, o.Terminal.prototype.setReverseVideo = function (e) {
        this.options_.reverseVideo = e, e ? (this.scrollPort_.setForegroundColor(this.prefs_.get("background-color")), this.scrollPort_.setBackgroundColor(this.prefs_.get("foreground-color"))) : (this.scrollPort_.setForegroundColor(this.prefs_.get("foreground-color")), this.scrollPort_.setBackgroundColor(this.prefs_.get("background-color")))
    }, o.Terminal.prototype.ringBell = function () {
        this.cursorNode_.style.backgroundColor = this.scrollPort_.getForegroundColor();
        var e = this;
        if (setTimeout(function () {
                e.cursorNode_.style.backgroundColor = e.prefs_.get("cursor-color")
            }, 200), !this.bellSquelchTimeout_ && (this.bellAudio_.getAttribute("src") ? (this.bellAudio_.play(), this.bellSequelchTimeout_ = setTimeout(function () {
                delete this.bellSquelchTimeout_
            }.bind(this), 500)) : delete this.bellSquelchTimeout_, this.desktopNotificationBell_ && !this.document_.hasFocus())) {
            var t = o.notify();
            this.bellNotificationList_.push(t), t.onclick = function () {
                e.closeBellNotifications_()
            }
        }
    }, o.Terminal.prototype.setOriginMode = function (e) {
        this.options_.originMode = e, this.setCursorPosition(0, 0)
    }, o.Terminal.prototype.setInsertMode = function (e) {
        this.options_.insertMode = e
    }, o.Terminal.prototype.setAutoCarriageReturn = function (e) {
        this.options_.autoCarriageReturn = e
    }, o.Terminal.prototype.setWraparound = function (e) {
        this.options_.wraparound = e
    }, o.Terminal.prototype.setReverseWraparound = function (e) {
        this.options_.reverseWraparound = e
    }, o.Terminal.prototype.setAlternateMode = function (e) {
        var t = this.saveCursor();
        if (this.screen_ = e ? this.alternateScreen_ : this.primaryScreen_, this.screen_.rowsArray.length && this.screen_.rowsArray[0].rowIndex != this.scrollbackRows_.length)
            for (var r = this.scrollbackRows_.length, i = this.screen_.rowsArray, o = 0; o < i.length; o++) i[o].rowIndex = r + o;
        this.realizeWidth_(this.screenSize.width), this.realizeHeight_(this.screenSize.height), this.scrollPort_.syncScrollHeight(), this.scrollPort_.invalidate(), this.restoreCursor(t), this.scrollPort_.resize()
    }, o.Terminal.prototype.setCursorBlink = function (e) {
        this.options_.cursorBlink = e, !e && this.timeouts_.cursorBlink && (clearTimeout(this.timeouts_.cursorBlink), delete this.timeouts_.cursorBlink), this.options_.cursorVisible && this.setCursorVisible(!0)
    }, o.Terminal.prototype.setCursorVisible = function (e) {
        if (this.options_.cursorVisible = e, !e) return this.timeouts_.cursorBlink && (clearTimeout(this.timeouts_.cursorBlink), delete this.timeouts_.cursorBlink), void(this.cursorNode_.style.opacity = "0");
        if (this.syncCursorPosition_(), this.cursorNode_.style.opacity = "1", this.options_.cursorBlink) {
            if (this.timeouts_.cursorBlink) return;
            this.onCursorBlink_()
        } else this.timeouts_.cursorBlink && (clearTimeout(this.timeouts_.cursorBlink), delete this.timeouts_.cursorBlink)
    }, o.Terminal.prototype.syncCursorPosition_ = function () {
        var e = this.scrollPort_.getTopRowIndex(),
            t = this.scrollPort_.getBottomRowIndex(e),
            r = this.scrollbackRows_.length + this.screen_.cursorPosition.row;
        if (r > t) this.setCssVar("cursor-offset-row", "-1");
        else {
            this.options_.cursorVisible && "none" == this.cursorNode_.style.display && (this.cursorNode_.style.display = ""), this.setCssVar("cursor-offset-row", `${r-e} + ` + `${this.scrollPort_.visibleRowTopMargin}px`), this.setCssVar("cursor-offset-col", this.screen_.cursorPosition.column), this.cursorNode_.setAttribute("title", "(" + this.screen_.cursorPosition.column + ", " + this.screen_.cursorPosition.row + ")");
            var i = this.document_.getSelection();
            i && i.isCollapsed && this.screen_.syncSelectionCaret(i)
        }
    }, o.Terminal.prototype.restyleCursor_ = function () {
        var e = this.cursorShape_;
        "false" == this.cursorNode_.getAttribute("focus") && (e = o.Terminal.cursorShape.BLOCK);
        var t = this.cursorNode_.style;
        switch (e) {
            case o.Terminal.cursorShape.BEAM:
                t.height = "var(--hterm-charsize-height)", t.backgroundColor = "transparent", t.borderBottomStyle = null, t.borderLeftStyle = "solid";
                break;
            case o.Terminal.cursorShape.UNDERLINE:
                t.height = this.scrollPort_.characterSize.baseline + "px", t.backgroundColor = "transparent", t.borderBottomStyle = "solid", t.borderLeftStyle = null;
                break;
            default:
                t.height = "var(--hterm-charsize-height)", t.backgroundColor = this.cursorColor_, t.borderBottomStyle = null, t.borderLeftStyle = null
        }
    }, o.Terminal.prototype.scheduleSyncCursorPosition_ = function () {
        if (!this.timeouts_.syncCursor) {
            var e = this;
            this.timeouts_.syncCursor = setTimeout(function () {
                e.syncCursorPosition_(), delete e.timeouts_.syncCursor
            }, 0)
        }
    }, o.Terminal.prototype.showZoomWarning_ = function (e) {
        if (!this.zoomWarningNode_) {
            if (!e) return;
            this.zoomWarningNode_ = this.document_.createElement("div"), this.zoomWarningNode_.id = "hterm:zoom-warning", this.zoomWarningNode_.style.cssText = "color: black;background-color: #ff2222;font-size: large;border-radius: 8px;opacity: 0.75;padding: 0.2em 0.5em 0.2em 0.5em;top: 0.5em;right: 1.2em;position: absolute;-webkit-text-size-adjust: none;-webkit-user-select: none;-moz-text-size-adjust: none;-moz-user-select: none;", this.zoomWarningNode_.addEventListener("click", function (e) {
                this.parentNode.removeChild(this)
            })
        }
        this.zoomWarningNode_.textContent = i.MessageManager.replaceReferences(o.zoomWarningMessage, [parseInt(100 * this.scrollPort_.characterSize.zoomFactor)]), this.zoomWarningNode_.style.fontFamily = this.prefs_.get("font-family"), e ? this.zoomWarningNode_.parentNode || this.div_.parentNode.appendChild(this.zoomWarningNode_) : this.zoomWarningNode_.parentNode && this.zoomWarningNode_.parentNode.removeChild(this.zoomWarningNode_)
    }, o.Terminal.prototype.showOverlay = function (e, t) {
        if (!this.overlayNode_) {
            if (!this.div_) return;
            this.overlayNode_ = this.document_.createElement("div"), this.overlayNode_.style.cssText = "border-radius: 15px;font-size: xx-large;opacity: 0.75;padding: 0.2em 0.5em 0.2em 0.5em;position: absolute;-webkit-user-select: none;-webkit-transition: opacity 180ms ease-in;-moz-user-select: none;-moz-transition: opacity 180ms ease-in;", this.overlayNode_.addEventListener("mousedown", function (e) {
                e.preventDefault(), e.stopPropagation()
            }, !0)
        }
        this.overlayNode_.style.color = this.prefs_.get("background-color"), this.overlayNode_.style.backgroundColor = this.prefs_.get("foreground-color"), this.overlayNode_.style.fontFamily = this.prefs_.get("font-family"), this.overlayNode_.textContent = e, this.overlayNode_.style.opacity = "0.75", this.overlayNode_.parentNode || this.div_.appendChild(this.overlayNode_);
        var r = o.getClientSize(this.div_),
            i = o.getClientSize(this.overlayNode_);
        this.overlayNode_.style.top = (r.height - i.height) / 2 + "px", this.overlayNode_.style.left = (r.width - i.width - this.scrollPort_.currentScrollbarWidthPx) / 2 + "px";
        var s = this;
        this.overlayTimeout_ && clearTimeout(this.overlayTimeout_), null !== t && (this.overlayTimeout_ = setTimeout(function () {
            s.overlayNode_.style.opacity = "0", s.overlayTimeout_ = setTimeout(function () {
                s.overlayNode_.parentNode && s.overlayNode_.parentNode.removeChild(s.overlayNode_), s.overlayTimeout_ = null, s.overlayNode_.style.opacity = "0.75"
            }, 200)
        }, t || 1500))
    }, o.Terminal.prototype.paste = function () {
        return o.pasteFromClipboard(this.document_)
    }, o.Terminal.prototype.copyStringToClipboard = function (e) {
        this.prefs_.get("enable-clipboard-notice") && setTimeout(this.showOverlay.bind(this, o.notifyCopyMessage, 500), 200);
        var t = this.document_.createElement("pre");
        t.id = "hterm:copy-to-clipboard-source", t.textContent = e, t.style.cssText = "-webkit-user-select: text;-moz-user-select: text;position: absolute;top: -99px", this.document_.body.appendChild(t);
        var r = this.document_.getSelection(),
            i = r.anchorNode,
            s = r.anchorOffset,
            n = r.focusNode,
            a = r.focusOffset;
        r.selectAllChildren(t), o.copySelectionToClipboard(this.document_), r.extend && (r.collapse(i, s), r.extend(n, a)), t.parentNode.removeChild(t)
    }, o.Terminal.prototype.getSelectionText = function () {
        var e = this.scrollPort_.selection;
        if (e.sync(), e.isCollapsed) return null;
        var t = e.startOffset,
            r = e.startNode;
        if ("X-ROW" != r.nodeName)
            for ("#text" == r.nodeName && "SPAN" == r.parentNode.nodeName && (r = r.parentNode); r.previousSibling;) r = r.previousSibling, t += o.TextAttributes.nodeWidth(r);
        var s = o.TextAttributes.nodeWidth(e.endNode) - e.endOffset;
        if ("X-ROW" != (r = e.endNode).nodeName)
            for ("#text" == r.nodeName && "SPAN" == r.parentNode.nodeName && (r = r.parentNode); r.nextSibling;) r = r.nextSibling, s += o.TextAttributes.nodeWidth(r);
        var n = this.getRowsText(e.startRow.rowIndex, e.endRow.rowIndex + 1);
        return i.wc.substring(n, t, i.wc.strWidth(n) - s)
    }, o.Terminal.prototype.copySelectionToClipboard = function () {
        var e = this.getSelectionText();
        null != e && this.copyStringToClipboard(e)
    }, o.Terminal.prototype.overlaySize = function () {
        this.showOverlay(this.screenSize.width + "x" + this.screenSize.height)
    }, o.Terminal.prototype.onVTKeystroke = function (e) {
        this.scrollOnKeystroke_ && this.scrollPort_.scrollRowToBottom(this.getRowCount()), this.io.onVTKeystroke(this.keyboard.encode(e))
    }, o.Terminal.prototype.openUrl = function (e) {
        window.chrome && window.chrome.browser ? chrome.browser.openTab({
            url: e
        }) : window.open(e, "_blank").focus()
    }, o.Terminal.prototype.openSelectedUrl_ = function () {
        var e = this.getSelectionText();
        if ((null != e || (this.screen_.expandSelection(this.document_.getSelection()), null != (e = this.getSelectionText()))) && !(e.length > 2048 || e.search(/[\s\[\](){}<>"'\\^`]/) >= 0)) {
            if (e.search("^[a-zA-Z][a-zA-Z0-9+.-]*://") < 0) switch (e.split(":", 1)[0]) {
                case "mailto":
                    break;
                default:
                    e = "http://" + e
            }
            this.openUrl(e)
        }
    }, o.Terminal.prototype.onMouse_ = function (e) {
        if (!e.processedByTerminalHandler_) {
            var t = !this.defeatMouseReports_ && this.vt.mouseReport != this.vt.MOUSE_REPORT_DISABLED;
            if (e.processedByTerminalHandler_ = !0, e.terminalRow = parseInt((e.clientY - this.scrollPort_.visibleRowTopMargin) / this.scrollPort_.characterSize.height) + 1, e.terminalColumn = parseInt(e.clientX / this.scrollPort_.characterSize.width) + 1, !("mousedown" == e.type && e.terminalColumn > this.screenSize.width)) {
                if (this.options_.cursorVisible && !t && (e.terminalRow - 1 == this.screen_.cursorPosition.row && e.terminalColumn - 1 == this.screen_.cursorPosition.column ? this.cursorNode_.style.display = "none" : "none" == this.cursorNode_.style.display && (this.cursorNode_.style.display = "")), "mousedown" == e.type && (e.altKey || !t ? (this.defeatMouseReports_ = !0, this.setSelectionEnabled(!0)) : (this.defeatMouseReports_ = !1, this.document_.getSelection().collapseToEnd(), this.setSelectionEnabled(!1), e.preventDefault())), t) this.scrollBlockerNode_.engaged || ("mousedown" == e.type ? (this.scrollBlockerNode_.engaged = !0, this.scrollBlockerNode_.style.top = e.clientY - 5 + "px", this.scrollBlockerNode_.style.left = e.clientX - 5 + "px") : "mousemove" == e.type && (this.document_.getSelection().collapseToEnd(), e.preventDefault())), this.onMouse(e);
                else {
                    if ("dblclick" == e.type && this.copyOnSelect && (this.screen_.expandSelection(this.document_.getSelection()), this.copySelectionToClipboard(this.document_)), "click" == e.type && !e.shiftKey && (e.ctrlKey || e.metaKey)) return clearTimeout(this.timeouts_.openUrl), void(this.timeouts_.openUrl = setTimeout(this.openSelectedUrl_.bind(this), 500));
                    if ("mousedown" == e.type && (this.mouseRightClickPaste && 2 == e.button || e.button == this.mousePasteButton) && (this.paste() || console.warning("Could not paste manually due to web restrictions")), "mouseup" == e.type && 0 == e.button && this.copyOnSelect && !this.document_.getSelection().isCollapsed && this.copySelectionToClipboard(this.document_), "mousemove" != e.type && "mouseup" != e.type || !this.scrollBlockerNode_.engaged || (this.scrollBlockerNode_.engaged = !1, this.scrollBlockerNode_.style.top = "-99px"), this.scrollWheelArrowKeys_ && !e.shiftKey && this.keyboard.applicationCursor && !this.isPrimaryScreen() && "wheel" == e.type) {
                        var r = this.scrollPort_.scrollWheelDelta(e),
                            o = i.f.smartFloorDivide(Math.abs(r), this.scrollPort_.characterSize.height),
                            s = "O" + (r < 0 ? "B" : "A");
                        this.io.sendString(s.repeat(o)), e.preventDefault()
                    }
                }
                "mouseup" == e.type && this.document_.getSelection().isCollapsed && (this.defeatMouseReports_ = !1)
            }
        }
    }, o.Terminal.prototype.onMouse = function (e) {}, o.Terminal.prototype.onFocusChange_ = function (e) {
        this.cursorNode_.setAttribute("focus", e), this.restyleCursor_(), !0 === e && this.closeBellNotifications_()
    }, o.Terminal.prototype.onScroll_ = function () {
        this.scheduleSyncCursorPosition_()
    }, o.Terminal.prototype.onPaste_ = function (e) {
        var t = e.text.replace(/\n/gm, "\r");
        t = this.keyboard.encode(t), this.options_.bracketedPaste && (t = "[200~" + t + "[201~"), this.io.sendString(t)
    }, o.Terminal.prototype.onCopy_ = function (e) {
        this.useDefaultWindowCopy || (e.preventDefault(), setTimeout(this.copySelectionToClipboard.bind(this), 0))
    }, o.Terminal.prototype.onResize_ = function () {
        var e = Math.floor(this.scrollPort_.getScreenWidth() / this.scrollPort_.characterSize.width) || 0,
            t = i.f.smartFloorDivide(this.scrollPort_.getScreenHeight(), this.scrollPort_.characterSize.height) || 0;
        if (!(e <= 0 || t <= 0)) {
            var r = e != this.screenSize.width || t != this.screenSize.height;
            this.realizeSize_(e, t), this.showZoomWarning_(1 != this.scrollPort_.characterSize.zoomFactor), r && this.overlaySize(), this.restyleCursor_(), this.scheduleSyncCursorPosition_()
        }
    }, o.Terminal.prototype.onCursorBlink_ = function () {
        this.options_.cursorBlink ? "false" == this.cursorNode_.getAttribute("focus") || "0" == this.cursorNode_.style.opacity ? (this.cursorNode_.style.opacity = "1", this.timeouts_.cursorBlink = setTimeout(this.myOnCursorBlink_, this.cursorBlinkCycle_[0])) : (this.cursorNode_.style.opacity = "0", this.timeouts_.cursorBlink = setTimeout(this.myOnCursorBlink_, this.cursorBlinkCycle_[1])) : delete this.timeouts_.cursorBlink
    }, o.Terminal.prototype.setScrollbarVisible = function (e) {
        this.scrollPort_.setScrollbarVisible(e)
    }, o.Terminal.prototype.setScrollWheelMoveMultipler = function (e) {
        this.scrollPort_.setScrollWheelMoveMultipler(e)
    }, o.Terminal.prototype.closeBellNotifications_ = function () {
        this.bellNotificationList_.forEach(function (e) {
            e.close()
        }), this.bellNotificationList_.length = 0
    }, i.rtdep("lib.encodeUTF8"), o.Terminal.IO = function (e) {
        this.terminal_ = e, this.previousIO_ = null
    }, o.Terminal.IO.prototype.showOverlay = function (e, t) {
        this.terminal_.showOverlay(e, t)
    }, o.Terminal.IO.prototype.createFrame = function (e, t) {
        return new o.Frame(this.terminal_, e, t)
    }, o.Terminal.IO.prototype.setTerminalProfile = function (e) {
        this.terminal_.setProfile(e)
    }, o.Terminal.IO.prototype.push = function () {
        var e = new o.Terminal.IO(this.terminal_);
        return e.keyboardCaptured_ = this.keyboardCaptured_, e.columnCount = this.columnCount, e.rowCount = this.rowCount, e.previousIO_ = this.terminal_.io, this.terminal_.io = e, e
    }, o.Terminal.IO.prototype.pop = function () {
        this.terminal_.io = this.previousIO_
    }, o.Terminal.IO.prototype.sendString = function (e) {
        console.log("Unhandled sendString: " + e)
    }, o.Terminal.IO.prototype.onVTKeystroke = function (e) {
        console.log("Unobserverd VT keystroke: " + JSON.stringify(e))
    }, o.Terminal.IO.prototype.onTerminalResize_ = function (e, t) {
        for (var r = this; r;) r.columnCount = e, r.rowCount = t, r = r.previousIO_;
        this.onTerminalResize(e, t)
    }, o.Terminal.IO.prototype.onTerminalResize = function (e, t) {}, o.Terminal.IO.prototype.writeUTF8 = function (e) {
        if (this.terminal_.io != this) throw "Attempt to print from inactive IO object.";
        this.terminal_.interpret(e)
    }, o.Terminal.IO.prototype.writelnUTF8 = function (e) {
        if (this.terminal_.io != this) throw "Attempt to print from inactive IO object.";
        this.terminal_.interpret(e + "\r\n")
    }, o.Terminal.IO.prototype.print = o.Terminal.IO.prototype.writeUTF16 = function (e) {
        this.writeUTF8(i.encodeUTF8(e))
    }, o.Terminal.IO.prototype.println = o.Terminal.IO.prototype.writelnUTF16 = function (e) {
        this.writelnUTF8(i.encodeUTF8(e))
    }, i.rtdep("lib.colors"), o.TextAttributes = function (e) {
        this.document_ = e, this.foregroundSource = this.SRC_DEFAULT, this.backgroundSource = this.SRC_DEFAULT, this.foreground = this.DEFAULT_COLOR, this.background = this.DEFAULT_COLOR, this.defaultForeground = "rgb(255, 255, 255)", this.defaultBackground = "rgb(0, 0, 0)", this.bold = !1, this.faint = !1, this.italic = !1, this.blink = !1, this.underline = !1, this.strikethrough = !1, this.inverse = !1, this.invisible = !1, this.wcNode = !1, this.asciiNode = !0, this.tileData = null, this.colorPalette = null, this.resetColorPalette()
    }, o.TextAttributes.prototype.enableBold = !0, o.TextAttributes.prototype.enableBoldAsBright = !0, o.TextAttributes.prototype.DEFAULT_COLOR = i.f.createEnum(""), o.TextAttributes.prototype.SRC_DEFAULT = "default", o.TextAttributes.prototype.SRC_RGB = "rgb", o.TextAttributes.prototype.setDocument = function (e) {
        this.document_ = e
    }, o.TextAttributes.prototype.clone = function () {
        var e = new o.TextAttributes(null);
        for (var t in this) e[t] = this[t];
        return e.colorPalette = this.colorPalette.concat(), e
    }, o.TextAttributes.prototype.reset = function () {
        this.foregroundSource = this.SRC_DEFAULT, this.backgroundSource = this.SRC_DEFAULT, this.foreground = this.DEFAULT_COLOR, this.background = this.DEFAULT_COLOR, this.bold = !1, this.faint = !1, this.italic = !1, this.blink = !1, this.underline = !1, this.strikethrough = !1, this.inverse = !1, this.invisible = !1, this.wcNode = !1, this.asciiNode = !0
    }, o.TextAttributes.prototype.resetColorPalette = function () {
        this.colorPalette = i.colors.colorPalette.concat(), this.syncColors()
    }, o.TextAttributes.prototype.isDefault = function () {
        return this.foregroundSource == this.SRC_DEFAULT && this.backgroundSource == this.SRC_DEFAULT && !this.bold && !this.faint && !this.italic && !this.blink && !this.underline && !this.strikethrough && !this.inverse && !this.invisible && !this.wcNode && this.asciiNode && null == this.tileData
    }, o.TextAttributes.prototype.createContainer = function (e) {
        if (this.isDefault()) return this.document_.createTextNode(e);
        var t = this.document_.createElement("span"),
            r = t.style,
            i = [];
        this.foreground != this.DEFAULT_COLOR && (r.color = this.foreground), this.background != this.DEFAULT_COLOR && (r.backgroundColor = this.background), this.enableBold && this.bold && (r.fontWeight = "bold"), this.faint && (t.faint = !0), this.italic && (r.fontStyle = "italic"), this.blink && (i.push("blink-node"), t.blinkNode = !0);
        var o = "";
        return this.underline && (o += " underline", t.underline = !0), this.strikethrough && (o += " line-through", t.strikethrough = !0), o && (r.textDecoration = o), this.wcNode && (i.push("wc-node"), t.wcNode = !0, t.asciiNode = !1), null != this.tileData && (i.push("tile"), i.push("tile_" + this.tileData), t.tileNode = !0), e && (t.textContent = e), i.length && (t.className = i.join(" ")), t
    }, o.TextAttributes.prototype.matchesContainer = function (e) {
        if ("string" == typeof e || 3 == e.nodeType) return this.isDefault();
        var t = e.style;
        return !(this.wcNode || e.wcNode || this.asciiNode != this.asciiNode || null != this.tileData || e.tileNode || this.foreground != t.color || this.background != t.backgroundColor || (this.enableBold && this.bold) != !!t.fontWeight || this.blink != e.blinkNode || this.italic != !!t.fontStyle || !!this.underline != !!e.underline || !!this.strikethrough != !!e.strikethrough)
    }, o.TextAttributes.prototype.setDefaults = function (e, t) {
        this.defaultForeground = e, this.defaultBackground = t, this.syncColors()
    }, o.TextAttributes.prototype.syncColors = function () {
        var e = this.foregroundSource,
            t = this.backgroundSource,
            r = this.DEFAULT_COLOR,
            o = this.DEFAULT_COLOR;
        if (this.inverse && (e = this.backgroundSource, t = this.foregroundSource, r = this.defaultBackground, o = this.defaultForeground), this.enableBoldAsBright && this.bold && e != this.SRC_DEFAULT && e != this.SRC_RGB && (e = function (e) {
                return e < 8 ? e + 8 : e
            }(e)), this.invisible && (e = t, r = this.defaultBackground), e != this.SRC_RGB && (this.foreground = e == this.SRC_DEFAULT ? r : this.colorPalette[e]), this.faint && !this.invisible) {
            var s = this.foreground == this.DEFAULT_COLOR ? this.defaultForeground : this.foreground;
            this.foreground = i.colors.mix(s, "rgb(0, 0, 0)", .3333)
        }
        t != this.SRC_RGB && (this.background = t == this.SRC_DEFAULT ? o : this.colorPalette[t])
    }, o.TextAttributes.containersMatch = function (e, t) {
        if ("string" == typeof e) return o.TextAttributes.containerIsDefault(t);
        if (e.nodeType != t.nodeType) return !1;
        if (3 == e.nodeType) return !0;
        var r = e.style,
            i = t.style;
        return r.color == i.color && r.backgroundColor == i.backgroundColor && r.fontWeight == i.fontWeight && r.fontStyle == i.fontStyle && r.textDecoration == i.textDecoration
    }, o.TextAttributes.containerIsDefault = function (e) {
        return "string" == typeof e || 3 == e.nodeType
    }, o.TextAttributes.nodeWidth = function (e) {
        return e.asciiNode ? e.textContent.length : i.wc.strWidth(e.textContent)
    }, o.TextAttributes.nodeSubstr = function (e, t, r) {
        return e.asciiNode ? e.textContent.substr(t, r) : i.wc.substr(e.textContent, t, r)
    }, o.TextAttributes.nodeSubstring = function (e, t, r) {
        return e.asciiNode ? e.textContent.substring(t, r) : i.wc.substring(e.textContent, t, r)
    }, o.TextAttributes.splitWidecharString = function (e) {
        for (var t = [], r = 0, o = 0, s = !0, n = 0; n < e.length;) {
            var a = e.codePointAt(n),
                l = a <= 65535 ? 1 : 2;
            a < 128 ? o += l : i.wc.charWidth(a) <= 1 ? (o += l, s = !1) : (o && (t.push({
                str: e.substr(r, o),
                asciiNode: s
            }), s = !0), t.push({
                str: e.substr(n, l),
                wcNode: !0,
                asciiNode: !1
            }), r = n + l, o = 0), n += l
        }
        return o && t.push({
            str: e.substr(r, o),
            asciiNode: s
        }), t
    }, i.rtdep("lib.colors", "lib.f", "lib.UTF8Decoder", "hterm.VT.CharacterMap"), o.VT = function (e) {
        this.terminal = e, e.onMouse = this.onTerminalMouse_.bind(this), this.mouseReport = this.MOUSE_REPORT_DISABLED, this.parseState_ = new o.VT.ParseState(this.parseUnknown_), this.leadingModifier_ = "", this.trailingModifier_ = "", this.allowColumnWidthChanges_ = !1, this.oscTimeLimit_ = 2e4, this.utf8Decoder_ = new i.UTF8Decoder, this.enable8BitControl = !1, this.enableClipboardWrite = !0, this.enableDec12 = !1, this.characterEncoding = "utf-8", this.maxStringSequence = 1024, this.warnUnimplemented = !0, this.characterMaps = new o.VT.CharacterMaps, this.G0 = this.G1 = this.G2 = this.G3 = this.characterMaps.getMap("B"), this.GL = "G0", this.GR = "G0", this.codingSystemUtf8_ = !1, this.codingSystemLocked_ = !1, this.cc1Pattern_ = null, this.updateEncodingState_(), this.savedState_ = new o.VT.CursorState(this)
    }, o.VT.prototype.MOUSE_REPORT_DISABLED = 0, o.VT.prototype.MOUSE_REPORT_CLICK = 1, o.VT.prototype.MOUSE_REPORT_DRAG = 3, o.VT.ParseState = function (e, t) {
        this.defaultFunction = e, this.buf = t || null, this.pos = 0, this.func = e, this.args = []
    }, o.VT.ParseState.prototype.reset = function (e) {
        this.resetParseFunction(), this.resetBuf(e || ""), this.resetArguments()
    }, o.VT.ParseState.prototype.resetParseFunction = function () {
        this.func = this.defaultFunction
    }, o.VT.ParseState.prototype.resetBuf = function (e) {
        this.buf = "string" == typeof e ? e : null, this.pos = 0
    }, o.VT.ParseState.prototype.resetArguments = function (e) {
        this.args.length = 0, void 0 !== e && (this.args[0] = e)
    }, o.VT.ParseState.prototype.iarg = function (e, t) {
        var r = this.args[e];
        if (r) {
            var i = parseInt(r, 10);
            return 0 == i && (i = t), i
        }
        return t
    }, o.VT.ParseState.prototype.advance = function (e) {
        this.pos += e
    }, o.VT.ParseState.prototype.peekRemainingBuf = function () {
        return this.buf.substr(this.pos)
    }, o.VT.ParseState.prototype.peekChar = function () {
        return this.buf.substr(this.pos, 1)
    }, o.VT.ParseState.prototype.consumeChar = function () {
        return this.buf.substr(this.pos++, 1)
    }, o.VT.ParseState.prototype.isComplete = function () {
        return null == this.buf || this.buf.length <= this.pos
    }, o.VT.CursorState = function (e) {
        this.vt_ = e, this.save()
    }, o.VT.CursorState.prototype.save = function () {
        this.cursor = this.vt_.terminal.saveCursor(), this.textAttributes = this.vt_.terminal.getTextAttributes().clone(), this.GL = this.vt_.GL, this.GR = this.vt_.GR, this.G0 = this.vt_.G0, this.G1 = this.vt_.G1, this.G2 = this.vt_.G2, this.G3 = this.vt_.G3
    }, o.VT.CursorState.prototype.restore = function () {
        this.vt_.terminal.restoreCursor(this.cursor), this.vt_.terminal.setTextAttributes(this.textAttributes.clone()), this.vt_.GL = this.GL, this.vt_.GR = this.GR, this.vt_.G0 = this.G0, this.vt_.G1 = this.G1, this.vt_.G2 = this.G2, this.vt_.G3 = this.G3
    }, o.VT.prototype.reset = function () {
        this.G0 = this.characterMaps.getMap("B"), this.G1 = this.characterMaps.getMap("0"), this.G2 = this.characterMaps.getMap("B"), this.G3 = this.characterMaps.getMap("B"), this.GL = "G0", this.GR = "G0", this.savedState_ = new o.VT.CursorState(this), this.mouseReport = this.MOUSE_REPORT_DISABLED
    }, o.VT.prototype.onTerminalMouse_ = function (e) {
        if (this.mouseReport != this.MOUSE_REPORT_DISABLED) {
            var t, r = 0;
            e.shiftKey && (r |= 4), (e.metaKey || this.terminal.keyboard.altIsMeta && e.altKey) && (r |= 8), e.ctrlKey && (r |= 16);
            var o = String.fromCharCode(i.f.clamp(e.terminalColumn + 32, 32, 255)),
                s = String.fromCharCode(i.f.clamp(e.terminalRow + 32, 32, 255));
            switch (e.type) {
                case "wheel":
                    n = 96 + (-1 * e.deltaY > 0 ? 0 : 1), n |= r, t = "[M" + String.fromCharCode(n) + o + s, e.preventDefault();
                    break;
                case "mousedown":
                    var n = Math.min(e.button, 2) + 32;
                    n |= r, t = "[M" + String.fromCharCode(n) + o + s;
                    break;
                case "mouseup":
                    t = "[M#" + o + s;
                    break;
                case "mousemove":
                    this.mouseReport == this.MOUSE_REPORT_DRAG && e.buttons && (n = 32, 1 & e.buttons ? n += 0 : 4 & e.buttons ? n += 1 : 2 & e.buttons ? n += 2 : n += 3, n += 32, n |= r, t = "[M" + String.fromCharCode(n) + o + s);
                    break;
                case "click":
                case "dblclick":
                    break;
                default:
                    console.error("Unknown mouse event: " + e.type, e)
            }
            t && this.terminal.io.sendString(t)
        }
    }, o.VT.prototype.interpret = function (e) {
        for (this.parseState_.resetBuf(this.decode(e)); !this.parseState_.isComplete();) {
            var t = this.parseState_.func,
                r = this.parseState_.pos,
                e = this.parseState_.buf;
            if (this.parseState_.func.call(this, this.parseState_), this.parseState_.func == t && this.parseState_.pos == r && this.parseState_.buf == e) throw "Parser did not alter the state!"
        }
    }, o.VT.prototype.decode = function (e) {
        return "utf-8" == this.characterEncoding ? this.decodeUTF8(e) : e
    }, o.VT.prototype.encodeUTF8 = function (e) {
        return i.encodeUTF8(e)
    }, o.VT.prototype.decodeUTF8 = function (e) {
        return this.utf8Decoder_.decode(e)
    }, o.VT.prototype.setEncoding = function (e) {
        switch (e) {
            default: console.warn('Invalid value for "terminal-encoding": ' + e);
            case "iso-2022":
                    this.codingSystemUtf8_ = !1,
                this.codingSystemLocked_ = !1;
                break;
            case "utf-8-locked":
                    this.codingSystemUtf8_ = !0,
                this.codingSystemLocked_ = !0;
                break;
            case "utf-8":
                    this.codingSystemUtf8_ = !0,
                this.codingSystemLocked_ = !1
        }
        this.updateEncodingState_()
    }, o.VT.prototype.updateEncodingState_ = function () {
        var e = Object.keys(o.VT.CC1).filter(e => !this.codingSystemUtf8_ || e.charCodeAt() < 128).map(e => "\\x" + i.f.zpad(e.charCodeAt().toString(16), 2)).join("");
        this.cc1Pattern_ = new RegExp(`[${e}]`)
    }, o.VT.prototype.parseUnknown_ = function (e) {
        function t(e) {
            !r.codingSystemUtf8_ && r[r.GL].GL && (e = r[r.GL].GL(e)), r.terminal.print(e)
        }
        var r = this,
            i = e.peekRemainingBuf(),
            o = i.search(this.cc1Pattern_);
        return 0 == o ? (this.dispatch("CC1", i.substr(0, 1), e), void e.advance(1)) : -1 == o ? (t(i), void e.reset()) : (t(i.substr(0, o)), this.dispatch("CC1", i.substr(o, 1), e), void e.advance(o + 1))
    }, o.VT.prototype.parseCSI_ = function (e) {
        var t = e.peekChar(),
            r = e.args;
        t >= "@" && t <= "~" ? (this.dispatch("CSI", this.leadingModifier_ + this.trailingModifier_ + t, e), e.resetParseFunction()) : ";" == t ? this.trailingModifier_ ? e.resetParseFunction() : (r.length || r.push(""), r.push("")) : t >= "0" && t <= "9" ? this.trailingModifier_ ? e.resetParseFunction() : r.length ? r[r.length - 1] += t : r[0] = t : t >= " " && t <= "?" && ":" != t ? r.length ? this.trailingModifier_ += t : this.leadingModifier_ += t : this.cc1Pattern_.test(t) ? this.dispatch("CC1", t, e) : e.resetParseFunction(), e.advance(1)
    }, o.VT.prototype.parseUntilStringTerminator_ = function (e) {
        var t = e.peekRemainingBuf(),
            r = t.search(/(\x1b\\|\x07)/),
            i = e.args;
        if (i.length || (i[0] = "", i[1] = new Date), -1 == r) {
            i[0] += t;
            var o;
            return i[0].length > this.maxStringSequence && (o = "too long: " + i[0].length), -1 != i[0].indexOf("") && (o = "embedded escape: " + i[0].indexOf("")), new Date - i[1] > this.oscTimeLimit_ && (o = "timeout expired: " + new Date - i[1]), o ? (console.log("parseUntilStringTerminator_: aborting: " + o, i[0]), e.reset(i[0]), !1) : (e.advance(t.length), !0)
        }
        return i[0].length + r > this.maxStringSequence ? (e.reset(i[0] + t), !1) : (i[0] += t.substr(0, r), e.resetParseFunction(), e.advance(r + ("" == t.substr(r, 1) ? 2 : 1)), !0)
    }, o.VT.prototype.dispatch = function (e, t, r) {
        var i = o.VT[e][t];
        i ? i != o.VT.ignore ? "CC1" == e && t > "" && !this.enable8BitControl ? console.warn("Ignoring 8-bit control code: 0x" + t.charCodeAt(0).toString(16)) : i.apply(this, [r, t]) : this.warnUnimplemented && console.warn("Ignored " + e + " code: " + JSON.stringify(t)) : this.warnUnimplemented && console.warn("Unknown " + e + " code: " + JSON.stringify(t))
    }, o.VT.prototype.setANSIMode = function (e, t) {
        4 == e ? this.terminal.setInsertMode(t) : 20 == e ? this.terminal.setAutoCarriageReturn(t) : this.warnUnimplemented && console.warn("Unimplemented ANSI Mode: " + e)
    }, o.VT.prototype.setDECMode = function (e, t) {
        switch (parseInt(e, 10)) {
            case 1:
                this.terminal.keyboard.applicationCursor = t;
                break;
            case 3:
                this.allowColumnWidthChanges_ && (this.terminal.setWidth(t ? 132 : 80), this.terminal.clearHome(), this.terminal.setVTScrollRegion(null, null));
                break;
            case 5:
                this.terminal.setReverseVideo(t);
                break;
            case 6:
                this.terminal.setOriginMode(t);
                break;
            case 7:
                this.terminal.setWraparound(t);
                break;
            case 12:
                this.enableDec12 && this.terminal.setCursorBlink(t);
                break;
            case 25:
                this.terminal.setCursorVisible(t);
                break;
            case 30:
                this.terminal.setScrollbarVisible(t);
                break;
            case 40:
                this.terminal.allowColumnWidthChanges_ = t;
                break;
            case 45:
                this.terminal.setReverseWraparound(t);
                break;
            case 67:
                this.terminal.keyboard.backspaceSendsBackspace = t;
                break;
            case 1e3:
                this.mouseReport = t ? this.MOUSE_REPORT_CLICK : this.MOUSE_REPORT_DISABLED, this.terminal.syncMouseStyle();
                break;
            case 1002:
                this.mouseReport = t ? this.MOUSE_REPORT_DRAG : this.MOUSE_REPORT_DISABLED, this.terminal.syncMouseStyle();
                break;
            case 1010:
                this.terminal.scrollOnOutput = t;
                break;
            case 1011:
                this.terminal.scrollOnKeystroke = t;
                break;
            case 1036:
                this.terminal.keyboard.metaSendsEscape = t;
                break;
            case 1039:
                t ? this.terminal.keyboard.previousAltSendsWhat_ || (this.terminal.keyboard.previousAltSendsWhat_ = this.terminal.keyboard.altSendsWhat, this.terminal.keyboard.altSendsWhat = "escape") : this.terminal.keyboard.previousAltSendsWhat_ && (this.terminal.keyboard.altSendsWhat = this.terminal.keyboard.previousAltSendsWhat_, this.terminal.keyboard.previousAltSendsWhat_ = null);
                break;
            case 47:
            case 1047:
                this.terminal.setAlternateMode(t);
                break;
            case 1048:
                this.savedState_.save();
            case 1049:
                t ? (this.savedState_.save(), this.terminal.setAlternateMode(t), this.terminal.clear()) : (this.terminal.setAlternateMode(t), this.savedState_.restore());
                break;
            case 2004:
                this.terminal.setBracketedPaste(t);
                break;
            default:
                this.warnUnimplemented && console.warn("Unimplemented DEC Private Mode: " + e)
        }
    }, o.VT.ignore = function () {}, o.VT.CC1 = {}, o.VT.ESC = {}, o.VT.CSI = {}, o.VT.OSC = {}, o.VT.VT52 = {}, o.VT.CC1["\0"] = o.VT.ignore, o.VT.CC1[""] = o.VT.ignore, o.VT.CC1[""] = function () {
        this.terminal.ringBell()
    }, o.VT.CC1["\b"] = function () {
        this.terminal.cursorLeft(1)
    }, o.VT.CC1["\t"] = function () {
        this.terminal.forwardTabStop()
    }, o.VT.CC1["\n"] = function () {
        this.terminal.formFeed()
    }, o.VT.CC1["\v"] = o.VT.CC1["\n"], o.VT.CC1["\f"] = o.VT.CC1["\n"], o.VT.CC1["\r"] = function () {
        this.terminal.setCursorColumn(0)
    }, o.VT.CC1[""] = function () {
        this.GL = "G1"
    }, o.VT.CC1[""] = function () {
        this.GL = "G0"
    }, o.VT.CC1[""] = o.VT.ignore, o.VT.CC1[""] = o.VT.ignore, o.VT.CC1[""] = function (e) {
        "G1" == this.GL && (this.GL = "G0"), e.resetParseFunction(), this.terminal.print("?")
    }, o.VT.CC1[""] = o.VT.CC1[""], o.VT.CC1[""] = function (e) {
        function t(e) {
            var r = e.consumeChar();
            "" != r && (this.dispatch("ESC", r, e), e.func == t && e.resetParseFunction())
        }
        e.func = t
    }, o.VT.CC1[""] = o.VT.ignore, o.VT.CC1[""] = o.VT.ESC.D = function () {
        this.terminal.lineFeed()
    }, o.VT.CC1[""] = o.VT.ESC.E = function () {
        this.terminal.setCursorColumn(0), this.terminal.cursorDown(1)
    }, o.VT.CC1[""] = o.VT.ESC.H = function () {
        this.terminal.setTabStop(this.terminal.getCursorColumn())
    }, o.VT.CC1[""] = o.VT.ESC.M = function () {
        this.terminal.reverseLineFeed()
    }, o.VT.CC1[""] = o.VT.ESC.N = o.VT.ignore, o.VT.CC1[""] = o.VT.ESC.O = o.VT.ignore, o.VT.CC1[""] = o.VT.ESC.P = function (e) {
        e.resetArguments(), e.func = this.parseUntilStringTerminator_
    }, o.VT.CC1[""] = o.VT.ESC.V = o.VT.ignore, o.VT.CC1[""] = o.VT.ESC.W = o.VT.ignore, o.VT.CC1[""] = o.VT.ESC.X = o.VT.ignore, o.VT.CC1[""] = o.VT.ESC.Z = function () {
        this.terminal.io.sendString("[?1;2c")
    }, o.VT.CC1[""] = o.VT.ESC["["] = function (e) {
        e.resetArguments(), this.leadingModifier_ = "", this.trailingModifier_ = "", e.func = this.parseCSI_
    }, o.VT.CC1[""] = o.VT.ESC["\\"] = o.VT.ignore, o.VT.CC1[""] = o.VT.ESC["]"] = function (e) {
        function t(e) {
            if (this.parseUntilStringTerminator_(e) && e.func != t) {
                var r = e.args[0].match(/^(\d+);(.*)$/);
                r ? (e.args[0] = r[2], this.dispatch("OSC", r[1], e)) : console.warn("Invalid OSC: " + JSON.stringify(e.args[0]))
            }
        }
        e.resetArguments(), e.func = t
    }, o.VT.CC1[""] = o.VT.ESC["^"] = function (e) {
        e.resetArguments(), e.func = this.parseUntilStringTerminator_
    }, o.VT.CC1[""] = o.VT.ESC._ = function (e) {
        e.resetArguments(), e.func = this.parseUntilStringTerminator_
    }, o.VT.ESC[" "] = function (e) {
        e.func = function (e) {
            var t = e.consumeChar();
            this.warnUnimplemented && console.warn("Unimplemented sequence: ESC 0x20 " + t), e.resetParseFunction()
        }
    }, o.VT.ESC["#"] = function (e) {
        e.func = function (e) {
            "8" == e.consumeChar() && this.terminal.fill("E"), e.resetParseFunction()
        }
    }, o.VT.ESC["%"] = function (e) {
        e.func = function (e) {
            var t = e.consumeChar();
            if (this.codingSystemLocked_) return "/" == t && e.consumeChar(), void e.resetParseFunction();
            switch (t) {
                case "@":
                    this.setEncoding("iso-2022");
                    break;
                case "G":
                    this.setEncoding("utf-8");
                    break;
                case "/":
                    switch (t = e.consumeChar()) {
                        case "G":
                        case "H":
                        case "I":
                            this.setEncoding("utf-8-locked");
                            break;
                        default:
                            this.warnUnimplemented && console.warn("Unknown ESC % / argument: " + JSON.stringify(t))
                    }
                    break;
                default:
                    this.warnUnimplemented && console.warn("Unknown ESC % argument: " + JSON.stringify(t))
            }
            e.resetParseFunction()
        }
    }, o.VT.ESC["("] = o.VT.ESC[")"] = o.VT.ESC["*"] = o.VT.ESC["+"] = o.VT.ESC["-"] = o.VT.ESC["."] = o.VT.ESC["/"] = function (e, t) {
        e.func = function (e) {
            var r = e.consumeChar();
            if ("" == r) return e.resetParseFunction(), void e.func();
            var i = this.characterMaps.getMap(r);
            void 0 !== i ? "(" == t ? this.G0 = i : ")" == t || "-" == t ? this.G1 = i : "*" == t || "." == t ? this.G2 = i : "+" != t && "/" != t || (this.G3 = i) : this.warnUnimplemented && console.log('Invalid character set for "' + t + '": ' + r), e.resetParseFunction()
        }
    }, o.VT.ESC[6] = o.VT.ignore, o.VT.ESC[7] = function () {
        this.savedState_.save()
    }, o.VT.ESC[8] = function () {
        this.savedState_.restore()
    }, o.VT.ESC[9] = o.VT.ignore, o.VT.ESC["="] = function () {
        this.terminal.keyboard.applicationKeypad = !0
    }, o.VT.ESC[">"] = function () {
        this.terminal.keyboard.applicationKeypad = !1
    }, o.VT.ESC.F = o.VT.ignore, o.VT.ESC.c = function () {
        this.reset(), this.terminal.reset()
    }, o.VT.ESC.l = o.VT.ESC.m = o.VT.ignore, o.VT.ESC.n = function () {
        this.GL = "G2"
    }, o.VT.ESC.o = function () {
        this.GL = "G3"
    }, o.VT.ESC["|"] = function () {
        this.GR = "G3"
    }, o.VT.ESC["}"] = function () {
        this.GR = "G2"
    }, o.VT.ESC["~"] = function () {
        this.GR = "G1"
    }, o.VT.OSC[0] = function (e) {
        this.terminal.setWindowTitle(e.args[0])
    }, o.VT.OSC[2] = o.VT.OSC[0], o.VT.OSC[4] = function (e) {
        for (var t = e.args[0].split(";"), r = parseInt(t.length / 2), o = this.terminal.getTextAttributes().colorPalette, s = [], n = 0; n < r; ++n) {
            var a = parseInt(t[2 * n]),
                l = t[2 * n + 1];
            a >= o.length || ("?" != l ? (l = i.colors.x11ToCSS(l)) && (o[a] = l) : (l = i.colors.rgbToX11(o[a])) && s.push(a + ";" + l))
        }
        s.length && this.terminal.io.sendString("]4;" + s.join(";") + "")
    }, o.VT.OSC[9] = function (e) {
        o.notify({
            body: e.args[0]
        })
    }, o.VT.OSC[10] = function (e) {
        var t = e.args[0].split(";");
        if (t) {
            var r = i.colors.x11ToCSS(t.shift());
            r && this.terminal.setForegroundColor(r), t.length > 0 && (e.args[0] = t.join(";"), o.VT.OSC[11].apply(this, [e]))
        }
    }, o.VT.OSC[11] = function (e) {
        var t = e.args[0].split(";");
        if (t) {
            var r = i.colors.x11ToCSS(t.shift());
            r && this.terminal.setBackgroundColor(r)
        }
    }, o.VT.OSC[50] = function (e) {
        var t = e.args[0].match(/CursorShape=(.)/i);
        if (t) switch (t[1]) {
            case "1":
                this.terminal.setCursorShape(o.Terminal.cursorShape.BEAM);
                break;
            case "2":
                this.terminal.setCursorShape(o.Terminal.cursorShape.UNDERLINE);
                break;
            default:
                this.terminal.setCursorShape(o.Terminal.cursorShape.BLOCK)
        } else console.warn("Could not parse OSC 50 args: " + e.args[0])
    }, o.VT.OSC[52] = function (e) {
        var t = e.args[0].match(/^[cps01234567]*;(.*)/);
        if (t) {
            var r = window.atob(t[1]);
            r && this.terminal.copyStringToClipboard(this.decode(r))
        }
    }, o.VT.OSC[777] = function (e) {
        var t;
        switch (e.args[0].split(";", 1)[0]) {
            case "notify":
                var r, i;
                (t = e.args[0].match(/^[^;]+;([^;]*)(;([\s\S]*))?$/)) && (r = t[1], i = t[3]), o.notify({
                    title: r,
                    body: i
                });
                break;
            default:
                console.warn("Unknown urxvt module: " + e.args[0])
        }
    }, o.VT.CSI["@"] = function (e) {
        this.terminal.insertSpace(e.iarg(0, 1))
    }, o.VT.CSI.A = function (e) {
        this.terminal.cursorUp(e.iarg(0, 1))
    }, o.VT.CSI.B = function (e) {
        this.terminal.cursorDown(e.iarg(0, 1))
    }, o.VT.CSI.C = function (e) {
        this.terminal.cursorRight(e.iarg(0, 1))
    }, o.VT.CSI.D = function (e) {
        this.terminal.cursorLeft(e.iarg(0, 1))
    }, o.VT.CSI.E = function (e) {
        this.terminal.cursorDown(e.iarg(0, 1)), this.terminal.setCursorColumn(0)
    }, o.VT.CSI.F = function (e) {
        this.terminal.cursorUp(e.iarg(0, 1)), this.terminal.setCursorColumn(0)
    }, o.VT.CSI.G = function (e) {
        this.terminal.setCursorColumn(e.iarg(0, 1) - 1)
    }, o.VT.CSI.H = function (e) {
        this.terminal.setCursorPosition(e.iarg(0, 1) - 1, e.iarg(1, 1) - 1)
    }, o.VT.CSI.I = function (e) {
        var t = e.iarg(0, 1);
        t = i.f.clamp(t, 1, this.terminal.screenSize.width);
        for (var r = 0; r < t; r++) this.terminal.forwardTabStop()
    }, o.VT.CSI.J = o.VT.CSI["?J"] = function (e, t) {
        var r = e.args[0];
        r && 0 != r ? 1 == r ? this.terminal.eraseAbove() : 2 == r ? this.terminal.clear() : 3 == r && this.terminal.clear() : this.terminal.eraseBelow()
    }, o.VT.CSI.K = o.VT.CSI["?K"] = function (e, t) {
        var r = e.args[0];
        r && 0 != r ? 1 == r ? this.terminal.eraseToLeft() : 2 == r && this.terminal.eraseLine() : this.terminal.eraseToRight()
    }, o.VT.CSI.L = function (e) {
        this.terminal.insertLines(e.iarg(0, 1))
    }, o.VT.CSI.M = function (e) {
        this.terminal.deleteLines(e.iarg(0, 1))
    }, o.VT.CSI.P = function (e) {
        this.terminal.deleteChars(e.iarg(0, 1))
    }, o.VT.CSI.S = function (e) {
        this.terminal.vtScrollUp(e.iarg(0, 1))
    }, o.VT.CSI.T = function (e) {
        e.args.length <= 1 && this.terminal.vtScrollDown(e.iarg(0, 1))
    }, o.VT.CSI[">T"] = o.VT.ignore, o.VT.CSI.X = function (e) {
        this.terminal.eraseToRight(e.iarg(0, 1))
    }, o.VT.CSI.Z = function (e) {
        var t = e.iarg(0, 1);
        t = i.f.clamp(t, 1, this.terminal.screenSize.width);
        for (var r = 0; r < t; r++) this.terminal.backwardTabStop()
    }, o.VT.CSI["`"] = o.VT.CSI.G, o.VT.CSI.a = function (e) {
        this.terminal.setCursorColumn(this.terminal.getCursorColumn() + e.iarg(0, 1))
    }, o.VT.CSI.b = o.VT.ignore, o.VT.CSI.c = function (e) {
        e.args[0] && 0 != e.args[0] || this.terminal.io.sendString("[?1;2c")
    }, o.VT.CSI[">c"] = function (e) {
        this.terminal.io.sendString("[>0;256;0c")
    }, o.VT.CSI.d = function (e) {
        this.terminal.setAbsoluteCursorRow(e.iarg(0, 1) - 1)
    }, o.VT.CSI.f = o.VT.CSI.H, o.VT.CSI.g = function (e) {
        e.args[0] && 0 != e.args[0] ? 3 == e.args[0] && this.terminal.clearAllTabStops() : this.terminal.clearTabStopAtCursor(!1)
    }, o.VT.CSI.h = function (e) {
        for (var t = 0; t < e.args.length; t++) this.setANSIMode(e.args[t], !0)
    }, o.VT.CSI["?h"] = function (e) {
        for (var t = 0; t < e.args.length; t++) this.setDECMode(e.args[t], !0)
    }, o.VT.CSI.i = o.VT.CSI["?i"] = o.VT.ignore, o.VT.CSI.l = function (e) {
        for (var t = 0; t < e.args.length; t++) this.setANSIMode(e.args[t], !1)
    }, o.VT.CSI["?l"] = function (e) {
        for (var t = 0; t < e.args.length; t++) this.setDECMode(e.args[t], !1)
    }, o.VT.CSI.m = function (e) {
        function t(t) {
            return e.args.length < t + 2 || 5 != e.args[t + 1] ? null : e.iarg(t + 2, 0)
        }

        function r(t) {
            return e.args.length < t + 5 || 2 != e.args[t + 1] ? null : "rgb(" + e.iarg(t + 2, 0) + " ," + e.iarg(t + 3, 0) + " ," + e.iarg(t + 4, 0) + ")"
        }
        var i = this.terminal.getTextAttributes();
        if (e.args.length) {
            for (var o = 0; o < e.args.length; o++) {
                var s = e.iarg(o, 0);
                if (s < 30) 0 == s ? i.reset() : 1 == s ? i.bold = !0 : 2 == s ? i.faint = !0 : 3 == s ? i.italic = !0 : 4 == s ? i.underline = !0 : 5 == s ? i.blink = !0 : 7 == s ? i.inverse = !0 : 8 == s ? i.invisible = !0 : 9 == s ? i.strikethrough = !0 : 22 == s ? (i.bold = !1, i.faint = !1) : 23 == s ? i.italic = !1 : 24 == s ? i.underline = !1 : 25 == s ? i.blink = !1 : 27 == s ? i.inverse = !1 : 28 == s ? i.invisible = !1 : 29 == s && (i.strikethrough = !1);
                else if (s < 50)
                    if (s < 38) i.foregroundSource = s - 30;
                    else if (38 == s)
                    if (null != (n = r(o))) i.foregroundSource = i.SRC_RGB, i.foreground = n, o += 5;
                    else {
                        if (null == (a = t(o))) break;
                        if (o += 2, a >= i.colorPalette.length) continue;
                        i.foregroundSource = a
                    }
                else if (39 == s) i.foregroundSource = i.SRC_DEFAULT;
                else if (s < 48) i.backgroundSource = s - 40;
                else if (48 == s) {
                    var n = r(o);
                    if (null != n) i.backgroundSource = i.SRC_RGB, i.background = n, o += 5;
                    else {
                        var a = t(o);
                        if (null == a) break;
                        if (o += 2, a >= i.colorPalette.length) continue;
                        i.backgroundSource = a
                    }
                } else i.backgroundSource = i.SRC_DEFAULT;
                else s >= 90 && s <= 97 ? i.foregroundSource = s - 90 + 8 : s >= 100 && s <= 107 && (i.backgroundSource = s - 100 + 8)
            }
            i.setDefaults(this.terminal.getForegroundColor(), this.terminal.getBackgroundColor())
        } else i.reset()
    }, o.VT.CSI[">m"] = o.VT.ignore, o.VT.CSI.n = function (e) {
        if (5 == e.args[0]) this.terminal.io.sendString("0n");
        else if (6 == e.args[0]) {
            var t = this.terminal.getCursorRow() + 1,
                r = this.terminal.getCursorColumn() + 1;
            this.terminal.io.sendString("[" + t + ";" + r + "R")
        }
    }, o.VT.CSI[">n"] = o.VT.ignore, o.VT.CSI["?n"] = function (e) {
        if (6 == e.args[0]) {
            var t = this.terminal.getCursorRow() + 1,
                r = this.terminal.getCursorColumn() + 1;
            this.terminal.io.sendString("[" + t + ";" + r + "R")
        } else 15 == e.args[0] ? this.terminal.io.sendString("[?11n") : 25 == e.args[0] ? this.terminal.io.sendString("[?21n") : 26 == e.args[0] ? this.terminal.io.sendString("[?12;1;0;0n") : 53 == e.args[0] && this.terminal.io.sendString("[?50n")
    }, o.VT.CSI[">p"] = o.VT.ignore, o.VT.CSI["!p"] = function () {
        this.reset(), this.terminal.softReset()
    }, o.VT.CSI.$p = o.VT.ignore, o.VT.CSI["?$p"] = o.VT.ignore, o.VT.CSI['"p'] = o.VT.ignore, o.VT.CSI.q = o.VT.ignore, o.VT.CSI[" q"] = function (e) {
        var t = e.args[0];
        0 == t || 1 == t ? (this.terminal.setCursorShape(o.Terminal.cursorShape.BLOCK), this.terminal.setCursorBlink(!0)) : 2 == t ? (this.terminal.setCursorShape(o.Terminal.cursorShape.BLOCK), this.terminal.setCursorBlink(!1)) : 3 == t ? (this.terminal.setCursorShape(o.Terminal.cursorShape.UNDERLINE), this.terminal.setCursorBlink(!0)) : 4 == t ? (this.terminal.setCursorShape(o.Terminal.cursorShape.UNDERLINE), this.terminal.setCursorBlink(!1)) : 5 == t ? (this.terminal.setCursorShape(o.Terminal.cursorShape.BEAM), this.terminal.setCursorBlink(!0)) : 6 == t ? (this.terminal.setCursorShape(o.Terminal.cursorShape.BEAM), this.terminal.setCursorBlink(!1)) : console.warn("Unknown cursor style: " + t)
    }, o.VT.CSI['"q'] = o.VT.ignore, o.VT.CSI.r = function (e) {
        var t = e.args,
            r = t[0] ? parseInt(t[0], 10) - 1 : null,
            i = t[1] ? parseInt(t[1], 10) - 1 : null;
        this.terminal.setVTScrollRegion(r, i), this.terminal.setCursorPosition(0, 0)
    }, o.VT.CSI["?r"] = o.VT.ignore, o.VT.CSI.$r = o.VT.ignore, o.VT.CSI.s = function () {
        this.savedState_.save()
    }, o.VT.CSI["?s"] = o.VT.ignore, o.VT.CSI.t = o.VT.ignore, o.VT.CSI.$t = o.VT.ignore, o.VT.CSI[">t"] = o.VT.ignore, o.VT.CSI[" t"] = o.VT.ignore, o.VT.CSI.u = function () {
        this.savedState_.restore()
    }, o.VT.CSI[" u"] = o.VT.ignore, o.VT.CSI.$v = o.VT.ignore, o.VT.CSI["'w"] = o.VT.ignore, o.VT.CSI.x = o.VT.ignore, o.VT.CSI["*x"] = o.VT.ignore, o.VT.CSI.$x = o.VT.ignore, o.VT.CSI.z = function (e) {
        if (!(e.args.length < 1)) {
            var t = e.args[0];
            if (0 == t) {
                if (e.args.length < 2) return;
                this.terminal.getTextAttributes().tileData = e.args[1]
            } else 1 == t && (this.terminal.getTextAttributes().tileData = null)
        }
    }, o.VT.CSI["'z"] = o.VT.ignore, o.VT.CSI.$z = o.VT.ignore, o.VT.CSI["'{"] = o.VT.ignore, o.VT.CSI["'|"] = o.VT.ignore, o.VT.CSI["'}"] = o.VT.ignore, o.VT.CSI["'~"] = o.VT.ignore, i.rtdep("lib.f"), o.VT.CharacterMap = function (e, t) {
        this.description = e, this.GL = null, this.glmapBase_ = t, this.sync_()
    }, o.VT.CharacterMap.prototype.sync_ = function (e) {
        if (!this.glmapBase_ && !e) return this.GL = null, delete this.glmap_, void delete this.glre_;
        this.glmap_ = e ? Object.assign({}, this.glmapBase_, e) : this.glmapBase_;
        var t = Object.keys(this.glmap_).map(e => "\\x" + i.f.zpad(e.charCodeAt(0).toString(16)));
        this.glre_ = new RegExp("[" + t.join("") + "]", "g"), this.GL = (e => e.replace(this.glre_, e => this.glmap_[e]))
    }, o.VT.CharacterMap.prototype.reset = function () {
        this.glmap_ !== this.glmapBase_ && this.sync_()
    }, o.VT.CharacterMap.prototype.setOverrides = function (e) {
        this.sync_(e)
    }, o.VT.CharacterMap.prototype.clone = function () {
        var e = new o.VT.CharacterMap(this.description, this.glmapBase_);
        return this.glmap_ !== this.glmapBase_ && e.setOverrides(this.glmap_), e
    }, o.VT.CharacterMaps = function () {
        this.maps_ = o.VT.CharacterMaps.DefaultMaps, this.mapsBase_ = this.maps_
    }, o.VT.CharacterMaps.prototype.getMap = function (e) {
        return this.maps_.hasOwnProperty(e) ? this.maps_[e] : void 0
    }, o.VT.CharacterMaps.prototype.addMap = function (e, t) {
        this.maps_ === this.mapsBase_ && (this.maps_ = Object.assign({}, this.mapsBase_)), this.maps_[e] = t
    }, o.VT.CharacterMaps.prototype.reset = function () {
        this.maps_ !== o.VT.CharacterMaps.DefaultMaps && (this.maps_ = o.VT.CharacterMaps.DefaultMaps)
    }, o.VT.CharacterMaps.prototype.setOverrides = function (e) {
        this.maps_ === this.mapsBase_ && (this.maps_ = Object.assign({}, this.mapsBase_));
        for (var t in e) {
            var r = this.getMap(t);
            void 0 !== r ? (this.maps_[t] = r.clone(), this.maps_[t].setOverrides(e[t])) : this.addMap(t, new o.VT.CharacterMap("user " + t, e[t]))
        }
    }, o.VT.CharacterMaps.DefaultMaps = {}, o.VT.CharacterMaps.DefaultMaps[0] = new o.VT.CharacterMap("graphic", {
        "`": "◆",
        a: "▒",
        b: "␉",
        c: "␌",
        d: "␍",
        e: "␊",
        f: "°",
        g: "±",
        h: "␤",
        i: "␋",
        j: "┘",
        k: "┐",
        l: "┌",
        m: "└",
        n: "┼",
        o: "⎺",
        p: "⎻",
        q: "─",
        r: "⎼",
        s: "⎽",
        t: "├",
        u: "┤",
        v: "┴",
        w: "┬",
        x: "│",
        y: "≤",
        z: "≥",
        "{": "π",
        "|": "≠",
        "}": "£",
        "~": "·"
    }), o.VT.CharacterMaps.DefaultMaps.A = new o.VT.CharacterMap("british", {
        "#": "£"
    }), o.VT.CharacterMaps.DefaultMaps.B = new o.VT.CharacterMap("us", null), o.VT.CharacterMaps.DefaultMaps[4] = new o.VT.CharacterMap("dutch", {
        "#": "£",
        "@": "¾",
        "[": "Ĳ",
        "\\": "½",
        "]": "|",
        "{": "¨",
        "|": "f",
        "}": "¼",
        "~": "´"
    }), o.VT.CharacterMaps.DefaultMaps.C = o.VT.CharacterMaps.DefaultMaps[5] = new o.VT.CharacterMap("finnish", {
        "[": "Ä",
        "\\": "Ö",
        "]": "Å",
        "^": "Ü",
        "`": "é",
        "{": "ä",
        "|": "ö",
        "}": "å",
        "~": "ü"
    }), o.VT.CharacterMaps.DefaultMaps.R = new o.VT.CharacterMap("french", {
        "#": "£",
        "@": "à",
        "[": "°",
        "\\": "ç",
        "]": "§",
        "{": "é",
        "|": "ù",
        "}": "è",
        "~": "¨"
    }), o.VT.CharacterMaps.DefaultMaps.Q = new o.VT.CharacterMap("french canadian", {
        "@": "à",
        "[": "â",
        "\\": "ç",
        "]": "ê",
        "^": "î",
        "`": "ô",
        "{": "é",
        "|": "ù",
        "}": "è",
        "~": "û"
    }), o.VT.CharacterMaps.DefaultMaps.K = new o.VT.CharacterMap("german", {
        "@": "§",
        "[": "Ä",
        "\\": "Ö",
        "]": "Ü",
        "{": "ä",
        "|": "ö",
        "}": "ü",
        "~": "ß"
    }), o.VT.CharacterMaps.DefaultMaps.Y = new o.VT.CharacterMap("italian", {
        "#": "£",
        "@": "§",
        "[": "°",
        "\\": "ç",
        "]": "é",
        "`": "ù",
        "{": "à",
        "|": "ò",
        "}": "è",
        "~": "ì"
    }), o.VT.CharacterMaps.DefaultMaps.E = o.VT.CharacterMaps.DefaultMaps[6] = new o.VT.CharacterMap("norwegian/danish", {
        "@": "Ä",
        "[": "Æ",
        "\\": "Ø",
        "]": "Å",
        "^": "Ü",
        "`": "ä",
        "{": "æ",
        "|": "ø",
        "}": "å",
        "~": "ü"
    }), o.VT.CharacterMaps.DefaultMaps.Z = new o.VT.CharacterMap("spanish", {
        "#": "£",
        "@": "§",
        "[": "¡",
        "\\": "Ñ",
        "]": "¿",
        "{": "°",
        "|": "ñ",
        "}": "ç"
    }), o.VT.CharacterMaps.DefaultMaps[7] = o.VT.CharacterMaps.DefaultMaps.H = new o.VT.CharacterMap("swedish", {
        "@": "É",
        "[": "Ä",
        "\\": "Ö",
        "]": "Å",
        "^": "Ü",
        "`": "é",
        "{": "ä",
        "|": "ö",
        "}": "å",
        "~": "ü"
    }), o.VT.CharacterMaps.DefaultMaps["="] = new o.VT.CharacterMap("swiss", {
        "#": "ù",
        "@": "à",
        "[": "é",
        "\\": "ç",
        "]": "ê",
        "^": "î",
        _: "è",
        "`": "ô",
        "{": "ä",
        "|": "ö",
        "}": "ü",
        "~": "û"
    }), i.resource.add("hterm/audio/bell", "audio/ogg;base64", "T2dnUwACAAAAAAAAAADhqW5KAAAAAMFvEjYBHgF2b3JiaXMAAAAAAYC7AAAAAAAAAHcBAAAAAAC4AU9nZ1MAAAAAAAAAAAAA4aluSgEAAAAAesI3EC3//////////////////8kDdm9yYmlzHQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMDkwNzA5AAAAAAEFdm9yYmlzKUJDVgEACAAAADFMIMWA0JBVAAAQAABgJCkOk2ZJKaWUoSh5mJRISSmllMUwiZiUicUYY4wxxhhjjDHGGGOMIDRkFQAABACAKAmOo+ZJas45ZxgnjnKgOWlOOKcgB4pR4DkJwvUmY26mtKZrbs4pJQgNWQUAAAIAQEghhRRSSCGFFGKIIYYYYoghhxxyyCGnnHIKKqigggoyyCCDTDLppJNOOumoo4466ii00EILLbTSSkwx1VZjrr0GXXxzzjnnnHPOOeecc84JQkNWAQAgAAAEQgYZZBBCCCGFFFKIKaaYcgoyyIDQkFUAACAAgAAAAABHkRRJsRTLsRzN0SRP8ixREzXRM0VTVE1VVVVVdV1XdmXXdnXXdn1ZmIVbuH1ZuIVb2IVd94VhGIZhGIZhGIZh+H3f933f930gNGQVACABAKAjOZbjKaIiGqLiOaIDhIasAgBkAAAEACAJkiIpkqNJpmZqrmmbtmirtm3LsizLsgyEhqwCAAABAAQAAAAAAKBpmqZpmqZpmqZpmqZpmqZpmqZpmmZZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZQGjIKgBAAgBAx3Ecx3EkRVIkx3IsBwgNWQUAyAAACABAUizFcjRHczTHczzHczxHdETJlEzN9EwPCA1ZBQAAAgAIAAAAAABAMRzFcRzJ0SRPUi3TcjVXcz3Xc03XdV1XVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYHQkFUAAAQAACGdZpZqgAgzkGEgNGQVAIAAAAAYoQhDDAgNWQUAAAQAAIih5CCa0JrzzTkOmuWgqRSb08GJVJsnuamYm3POOeecbM4Z45xzzinKmcWgmdCac85JDJqloJnQmnPOeRKbB62p0ppzzhnnnA7GGWGcc85p0poHqdlYm3POWdCa5qi5FJtzzomUmye1uVSbc84555xzzjnnnHPOqV6czsE54Zxzzonam2u5CV2cc875ZJzuzQnhnHPOOeecc84555xzzglCQ1YBAEAAAARh2BjGnYIgfY4GYhQhpiGTHnSPDpOgMcgppB6NjkZKqYNQUhknpXSC0JBVAAAgAACEEFJIIYUUUkghhRRSSCGGGGKIIaeccgoqqKSSiirKKLPMMssss8wyy6zDzjrrsMMQQwwxtNJKLDXVVmONteaec645SGultdZaK6WUUkoppSA0ZBUAAAIAQCBkkEEGGYUUUkghhphyyimnoIIKCA1ZBQAAAgAIAAAA8CTPER3RER3RER3RER3RER3P8RxREiVREiXRMi1TMz1VVFVXdm1Zl3Xbt4Vd2HXf133f141fF4ZlWZZlWZZlWZZlWZZlWZZlCUJDVgEAIAAAAEIIIYQUUkghhZRijDHHnINOQgmB0JBVAAAgAIAAAAAAR3EUx5EcyZEkS7IkTdIszfI0T/M00RNFUTRNUxVd0RV10xZlUzZd0zVl01Vl1XZl2bZlW7d9WbZ93/d93/d93/d93/d939d1IDRkFQAgAQCgIzmSIimSIjmO40iSBISGrAIAZAAABACgKI7iOI4jSZIkWZImeZZniZqpmZ7pqaIKhIasAgAAAQAEAAAAAACgaIqnmIqniIrniI4oiZZpiZqquaJsyq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7rukBoyCoAQAIAQEdyJEdyJEVSJEVyJAcIDVkFAMgAAAgAwDEcQ1Ikx7IsTfM0T/M00RM90TM9VXRFFwgNWQUAAAIACAAAAAAAwJAMS7EczdEkUVIt1VI11VItVVQ9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV1TRN0zSB0JCVAAAZAAAjQQYZhBCKcpBCbj1YCDHmJAWhOQahxBiEpxAzDDkNInSQQSc9uJI5wwzz4FIoFURMg40lN44gDcKmXEnlOAhCQ1YEAFEAAIAxyDHEGHLOScmgRM4xCZ2UyDknpZPSSSktlhgzKSWmEmPjnKPSScmklBhLip2kEmOJrQAAgAAHAIAAC6HQkBUBQBQAAGIMUgophZRSzinmkFLKMeUcUko5p5xTzjkIHYTKMQadgxAppRxTzinHHITMQeWcg9BBKAAAIMABACDAQig0ZEUAECcA4HAkz5M0SxQlSxNFzxRl1xNN15U0zTQ1UVRVyxNV1VRV2xZNVbYlTRNNTfRUVRNFVRVV05ZNVbVtzzRl2VRV3RZV1bZl2xZ+V5Z13zNNWRZV1dZNVbV115Z9X9ZtXZg0zTQ1UVRVTRRV1VRV2zZV17Y1UXRVUVVlWVRVWXZlWfdVV9Z9SxRV1VNN2RVVVbZV2fVtVZZ94XRVXVdl2fdVWRZ+W9eF4fZ94RhV1dZN19V1VZZ9YdZlYbd13yhpmmlqoqiqmiiqqqmqtm2qrq1bouiqoqrKsmeqrqzKsq+rrmzrmiiqrqiqsiyqqiyrsqz7qizrtqiquq3KsrCbrqvrtu8LwyzrunCqrq6rsuz7qizruq3rxnHrujB8pinLpqvquqm6um7runHMtm0co6rqvirLwrDKsu/rui+0dSFRVXXdlF3jV2VZ921fd55b94WybTu/rfvKceu60vg5z28cubZtHLNuG7+t+8bzKz9hOI6lZ5q2baqqrZuqq+uybivDrOtCUVV9XZVl3zddWRdu3zeOW9eNoqrquirLvrDKsjHcxm8cuzAcXds2jlvXnbKtC31jyPcJz2vbxnH7OuP2daOvDAnHjwAAgAEHAIAAE8pAoSErAoA4AQAGIecUUxAqxSB0EFLqIKRUMQYhc05KxRyUUEpqIZTUKsYgVI5JyJyTEkpoKZTSUgehpVBKa6GU1lJrsabUYu0gpBZKaS2U0lpqqcbUWowRYxAy56RkzkkJpbQWSmktc05K56CkDkJKpaQUS0otVsxJyaCj0kFIqaQSU0mptVBKa6WkFktKMbYUW24x1hxKaS2kEltJKcYUU20txpojxiBkzknJnJMSSmktlNJa5ZiUDkJKmYOSSkqtlZJSzJyT0kFIqYOOSkkptpJKTKGU1kpKsYVSWmwx1pxSbDWU0lpJKcaSSmwtxlpbTLV1EFoLpbQWSmmttVZraq3GUEprJaUYS0qxtRZrbjHmGkppraQSW0mpxRZbji3GmlNrNabWam4x5hpbbT3WmnNKrdbUUo0txppjbb3VmnvvIKQWSmktlNJiai3G1mKtoZTWSiqxlZJabDHm2lqMOZTSYkmpxZJSjC3GmltsuaaWamwx5ppSi7Xm2nNsNfbUWqwtxppTS7XWWnOPufVWAADAgAMAQIAJZaDQkJUAQBQAAEGIUs5JaRByzDkqCULMOSepckxCKSlVzEEIJbXOOSkpxdY5CCWlFksqLcVWaykptRZrLQAAoMABACDABk2JxQEKDVkJAEQBACDGIMQYhAYZpRiD0BikFGMQIqUYc05KpRRjzknJGHMOQioZY85BKCmEUEoqKYUQSkklpQIAAAocAAACbNCUWByg0JAVAUAUAABgDGIMMYYgdFQyKhGETEonqYEQWgutddZSa6XFzFpqrbTYQAithdYySyXG1FpmrcSYWisAAOzAAQDswEIoNGQlAJAHAEAYoxRjzjlnEGLMOegcNAgx5hyEDirGnIMOQggVY85BCCGEzDkIIYQQQuYchBBCCKGDEEIIpZTSQQghhFJK6SCEEEIppXQQQgihlFIKAAAqcAAACLBRZHOCkaBCQ1YCAHkAAIAxSjkHoZRGKcYglJJSoxRjEEpJqXIMQikpxVY5B6GUlFrsIJTSWmw1dhBKaS3GWkNKrcVYa64hpdZirDXX1FqMteaaa0otxlprzbkAANwFBwCwAxtFNicYCSo0ZCUAkAcAgCCkFGOMMYYUYoox55xDCCnFmHPOKaYYc84555RijDnnnHOMMeecc845xphzzjnnHHPOOeecc44555xzzjnnnHPOOeecc84555xzzgkAACpwAAAIsFFkc4KRoEJDVgIAqQAAABFWYowxxhgbCDHGGGOMMUYSYowxxhhjbDHGGGOMMcaYYowxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGFtrrbXWWmuttdZaa6211lprrQBAvwoHAP8HG1ZHOCkaCyw0ZCUAEA4AABjDmHOOOQYdhIYp6KSEDkIIoUNKOSglhFBKKSlzTkpKpaSUWkqZc1JSKiWlllLqIKTUWkottdZaByWl1lJqrbXWOgiltNRaa6212EFIKaXWWostxlBKSq212GKMNYZSUmqtxdhirDGk0lJsLcYYY6yhlNZaazHGGGstKbXWYoy1xlprSam11mKLNdZaCwDgbnAAgEiwcYaVpLPC0eBCQ1YCACEBAARCjDnnnHMQQgghUoox56CDEEIIIURKMeYcdBBCCCGEjDHnoIMQQgghhJAx5hx0EEIIIYQQOucchBBCCKGEUkrnHHQQQgghlFBC6SCEEEIIoYRSSikdhBBCKKGEUkopJYQQQgmllFJKKaWEEEIIoYQSSimllBBCCKWUUkoppZQSQgghlFJKKaWUUkIIoZRQSimllFJKCCGEUkoppZRSSgkhhFBKKaWUUkopIYQSSimllFJKKaUAAIADBwCAACPoJKPKImw04cIDUGjISgCADAAAcdhq6ynWyCDFnISWS4SQchBiLhFSijlHsWVIGcUY1ZQxpRRTUmvonGKMUU+dY0oxw6yUVkookYLScqy1dswBAAAgCAAwECEzgUABFBjIAIADhAQpAKCwwNAxXAQE5BIyCgwKx4Rz0mkDABCEyAyRiFgMEhOqgaJiOgBYXGDIB4AMjY20iwvoMsAFXdx1IIQgBCGIxQEUkICDE2544g1PuMEJOkWlDgIAAAAA4AAAHgAAkg0gIiKaOY4Ojw+QEJERkhKTE5QAAAAAALABgA8AgCQFiIiIZo6jw+MDJERkhKTE5AQlAAAAAAAAAAAACAgIAAAAAAAEAAAACAhPZ2dTAAQYOwAAAAAAAOGpbkoCAAAAmc74DRgyNjM69TAzOTk74dnLubewsbagmZiNp4d0KbsExSY/I3XUTwJgkeZdn1HY4zoj33/q9DFtv3Ui1/jmx7lCUtPt18/sYf9MkgAsAGRBd3gMGP4sU+qCPYBy9VrA3YqJosW3W2/ef1iO/u3cg8ZG/57jU+pPmbGEJUgkfnaI39DbPqxddZphbMRmCc5rKlkUMkyx8iIoug5dJv1OYH9a59c+3Gevqc7Z2XFdDjL/qHztRfjWEWxJ/aiGezjohu9HsCZdQBKbiH0VtU/3m85lDG2T/+xkZcYnX+E+aqzv/xTgOoTFG+x7SNqQ4N+oAABSxuVXw77Jd5bmmTmuJakX7509HH0kGYKvARPpwfOSAPySPAc2EkneDwB2HwAAJlQDYK5586N79GJCjx4+p6aDUd27XSvRyXLJkIC5YZ1jLv5lpOhZTz0s+DmnF1diptrnM6UDgIW11Xh8cHTd0/SmbgOAdxcyWwMAAGIrZ3fNSfZbzKiYrK4+tPqtnMVLOeWOG2kVvUY+p2PJ/hkCl5aFRO4TLGYPZcIU3vYM1hohS4jHFlnyW/2T5J7kGsShXWT8N05V+3C/GPqJ1QdWisGPxEzHqXISBPIinWDUt7IeJv/f5OtzBxpTzZZQ+CYEhHXfqG4aABQli72GJhN4oJv+hXcApAJSErAW8G2raAX4NUcABnVt77CzZAB+LsHcVe+Q4h+QB1wh/ZrJTPxSBdI8mgTeAdTsQOoFUEng9BHcVPhxSRRYkKWZJXOFYP6V4AEripJoEjXgA2wJRZHSExmJDm8F0A6gEXsg5a4ZsALItrMB7+fh7UKLvYWSdtsDwFf1mzYzS1F82N1h2Oyt2e76B1QdS0SAsQigLPMOgJS9JRC7hFXA6kUsLFNKD5cA5cTRvgSqPc3Fl99xW3QTi/MHR8DEm6WnvaVQATwRqRKjywQ9BrrhugR2AKTsPQeQckrAOgDOhbTESyrXQ50CkNpXdtWjW7W2/3UjeX3U95gIdalfRAoAmqUEiwp53hCdcCwlg47fcbfzlmQMAgaBkh7c+fcDgF+ifwDXfzegLPcLYJsAAJQArTXjnh/uXGy3v1Hk3pV6/3t5ruW81f6prfbM2Q3WNVy98BwUtbCwhFhAWuPev6Oe/4ZaFQUcgKrVs4defzh1TADA1DEh5b3VlDaECw5b+bPfkKos3tIAue3vJZOih3ga3l6O3PSfIkrLv0PAS86PPdL7g8oc2KteNFKKzKRehOv2gJoFLBPXmaXvPBQILgJon0bbWBszrYZYYwE7jl2j+vTdU7Vpk21LiU0QajPkywAAHqbUC0/YsYOdb4e6BOp7E0cCi04Ao/TgD8ZVAMid6h/A8IeBNkp6/xsAACZELEYIk+yvI6Qz1NN6lIftB/6IMWjWJNOqPTMedAmyaj6Es0QBklJpiSWWHnQ2CoYbGWAmt+0gLQBFKCBnp2QUUQZ/1thtZDBJUpFWY82z34ocorB62oX7qB5y0oPAv/foxH25wVmgIHf2xFOr8leZcBq1Kx3ZvCq9Bga639AxuHuPNL/71YCF4EywJpqHFAX6XF0sjVbuANnvvdLcrufYwOM/iDa6iA468AYAAB6mNBMXcgTD8HSRqJ4vw8CjAlCEPACASlX/APwPOJKl9xQAAAPmnev2eWp33Xgyw3Dvfz6myGk3oyP8YTKsCOvzAgALQi0o1c6Nzs2O2Pg2h4ACIJAgAGP0aNn5x0BDgVfH7u2TtyfDcRIuYAyQhBF/lvSRAttgA6TPbWZA9gaUrZWAUEAA+Dx47Q3/r87HxUUqZmB0BmUuMlojFjHt1gDunnvuX8MImsjSq5WkzSzGS62OEIlOufWWezxWpv6FBgDgJVltfXFYtNAAnqU0xQoD0YLiXo5cF5QV4CnY1tBLAkZCOABAhbk/AM+/AwSCCdlWAAAMcFjS7owb8GVDzveDiZvznbt2tF4bL5odN1YKl88TAEABCZvufq9YCTBtMwVAQUEAwGtNltzSaHvADYC3TxLVjqiRA+OZAMhzcqEgRcAOwoCgvdTxsTHLQEF6+oOb2+PAI8ciPQcXg7pOY+LjxQSv2fjmFuj34gGwz310/bGK6z3xgT887eomWULEaDd04wHetYxdjcgV2SxvSwn0VoZXJRqkRC5ASQ/muVoAUsX7AgAQMBNaVwAAlABRxT/1PmfqLqSRNDbhXb07berpB3b94jpuWEZjBCD2OcdXFpCKEgCDfcFPMw8AAADUwT4lnUm50lmwrpMMhPQIKj6u0E8fr2vGBngMNdIlrZsigjahljud6AFVg+tzXwUnXL3TJLpajaWKA4VAAAAMiFfqJgKAZ08XrtS3dxtQNYcpPvYEG8ClvrQRJgBephwnNWJjtGqmp6VEPSvBe7EBiU3qgJbQAwD4Le8LAMDMhHbNAAAlgK+tFs5O+YyJc9yCnJa3rxLPulGnxwsXV9Fsk2k4PisCAHC8FkwbGE9gJQAAoMnyksj0CdFMZLLgoz8M+FxziwYBgIx+zHiCBAKAlBKNpF1sO9JpVcyEi9ar15YlHgrut5fPJnkdJ6vEwZPyAHQBIEDUrlMcBAAd2KAS0Qq+JwRsE4AJZtMnAD6GnOYwYlOIZvtzUNdjreB7fiMkWI0CmBB6AIAKc38A9osEFlTSGECB+cbeRDC0aRpLHqNPplcK/76Lxn2rpmqyXsYJWRi/FQAAAKBQk9MCAOibrQBQADCDsqpooPutd+05Ce9g6iEdiYXgVmQAI4+4wskEBEiBloNQ6Ki0/KTQ0QjWfjxzi+AeuXKoMjEVfQOZzr0y941qLgM2AExvbZOqcxZ6J6krlrj4y2j9AdgKDx6GnJsVLhbc42uq584+ouSdNBpoCiCVHrz+WzUA/DDtD8ATgA3h0lMCAAzcFv+S+fSSNkeYWlTpb34mf2RfmqqJeMeklhHAfu7VoAEACgAApKRktL+KkQDWMwYCUAAAAHCKsp80xhp91UjqQBw3x45cetqkjQEyu3G9B6N+R650Uq8OVig7wOm6Wun0ea4lKDPoabJs6aLqgbhPzpv4KR4iODilw88ZpY7q1IOMcbASAOAVtmcCnobcrkG4KGS7/ZnskVWRNF9J0RUHKOnByy9WA8Dv6L4AAARMCQUA4GritfVM2lcZfH3Q3T/vZ47J2YHhcmBazjfdyuV25gLAzrc0cwAAAAAYCh6PdwAAAGyWjFW4yScjaWa2mGcofHxWxewKALglWBpLUvwwk+UOh5eNGyUOs1/EF+pZr+ud5OzoGwYdAABg2p52LiSgAY/ZVlOmilEgHn6G3OcwYjzI7vOj1t6xsx4S3lBY96EUQBF6AIBAmPYH4PoGYCoJAADWe+OZJZi7/x76/yH7Lzf9M5XzRKnFPmveMsilQHwVAAAAAKB3LQD8PCIAAADga0QujBLywzeJ4a6Z/ERVBAUlAEDqvoM7BQBAuAguzFqILtmjH3Kd4wfKobnOhA3z85qWoRPm9hwoOHoDAAlCbwDAA56FHAuXflHo3fe2ttG9XUDeA9YmYCBQ0oPr/1QC8IvuCwAAApbUAQCK22MmE3O78VAbHQT9PIPNoT9zNc3l2Oe7TAVLANBufT8MAQAAAGzT4PS8AQAAoELGHb2uaCwwEv1EWhFriUkbAaAZ27/fVZnTZXbWz3BwWpjUaMZKRj7dZ0J//gUeTdpVEwAAZOFsNxKAjQSgA+ABPoY8Jj5y2wje81jsXc/1TOQWTDYZBmAkNDiqVwuA2NJ9AQAAEBKAt9Vrsfs/2N19MO91S9rd8EHTZHnzC5MYmfQEACy/FBcAAADA5c4gi4z8RANs/m6FNXVo9DV46JG1BBDukqlw/Va5G7QbuGVSI+2aZaoLXJrdVj2zlC9Z5QEAEFz/5QzgVZwAAAAA/oXcxyC6WfTu+09Ve/c766J4VTAGUFmA51+VANKi/QPoPwYgYAkA715OH4S0s5KDHvj99MMq8TPFc3roKZnGOoT1bmIhVgc7XAMBAAAAAMAW1VbQw3gapzOpJd+Kd2fc4iSO62fJv9+movui1wUNPAj059N3OVxzk4gV73PmE8FIA2F5mRq37Evc76vLXfF4rD5UJJAw46hW6LZCb5sNLdx+kzMCAAB+hfy95+965ZCLP7B3/VlTHCvDEKtQhTm4KiCgAEAbrfbWTPssAAAAXpee1tVrozYYn41wD1aeYtkKfswN5/SXPO0JDnhO/4laUortv/s412fybe/nONdncoCHnBVliu0CQGBWlPY/5Kwom2L/kruPM6Q7oz4tvDQy+bZ3HzOi+gNHA4DZEgA="), i.resource.add("hterm/images/icon-96", "image/png;base64", "iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAFKhJREFUeNrtXXlsXMd5/30z8649uDzEmxRFibIsOXZ8VInTJFYSW3actE1ctWkctEF6I0VRFEWAoihQoAjQFmiBogWaIEADFCmQXklto04TO0ndWI4bxZalWHJinTYtkRJFkctzl9zd977+8c49+UjuipbCD1y+9+ae75vvmJlv3gO2YRu2YRu2YRu2YUuAtroBN3nfeKsaSXWurarvRvUrTnlccV/5a3lDReRKFdc4Za6nzvW2b7OIpwZh7N37iHYiPztyvy4iqA00Tng/WXH1f3GQsFki0Qbz+cAV12jeRkTwwUd2yfsVI89OjbLrwnoJILw8EoAOIAFgLwDTCxcAJBEJIiIAgoiICAIgIgIBJGpdPRCRq3sPCBAJAii8QgAk/PIFkSBBQvh3QRkQXtECBKpxH9br5hMikhcg4QV4dYkgARFBSkmlUmnp7LmLX8rl8q95OPKJ0DQCkPeTEcQrAD179+7+7LsP3vtJw9A1ZvbwFfQM/r1/AyD64KLBv5JHIaIwIpI5GIbevd82r0I3OMjvJfOo5ffCqw1EhIRlQQi3a37p0atfTVB22PhIuHt95tnnBr75zHN/AGASoYjyxVVTCOCPfOWN9sGfue+df/L4r3z8MSGUOv3aWYDIq43BEXXEQRPCQK5qFleFMdduOwMV3WKUBXFVyVXhtm3jrjtvw13vuL1uPXGAAUghkGlLPXJ9ZvZzL738oz8HsOhFF2u3aH0E8JEvAWhe+n2PHD70Z7/xmccfLBSK9M1nX0AqnYFSKiB7fIiOzg3k21BeYHW1gMkr1/DBB+6HkGLTxmRfbxf9+qc/8WszM9lzF99468twxZCAq5wbQiMCREWPBkDXde3eI489+he/+1u/et/c3AK+/uSzyLTvgK7rm+tBE4CZA1HRaFT7oqNQKCCdsqBp61GD9eHBD77XunJ16o/+6q+/cLJYLP2fhzfGGkRYiwBRK2fnL/3iRz7/uT/8nfuuz2Txla8+hXRbJ6QUKBaLuJmgVLJRKuShlIBpatiEFApACIFHH/lA//NHj33qe0ePvQJXEa/JnHEIoABYd925/zOPf+JjBxMJC//yxX+GYaZgGAZse00ue1uByyWMQrGEldVVKCWbQgAA6OnegQP7997zvaPH2gGsIpQidWuoRwA/o2/bDz70off+nFIa/fczz2Pq2hzSbRksLCxsNT43BI7jYCW/ihd/cBKWZTZhQcFV9qMjQ0gmEwm4hkqsOVEjDogq37bOjvaElBKLizmYVgKWZW01HjeOLGaAbUipoJTWHAKwa4KYpmHCJUB0lQCoU0scK0gCMJRSqqOjHel0EqZpIpFIbDUeNwwOM2y7gO4dnWhrSzVFBDEzMpkULNM04BIgFsS1ggxNUzKVSiCRsEBEUEoFiRq2v5HNXjMd18pSHVeZnuuniZaopIIQBAIhnUqgvb1tU3OBKFiWCdMydABWBH+bIoCvA3RNU9KyDOiahG2XAAAzszO4NHkZINcKALuddRHi3VWFReLcWy8dhxO5aFpvkhamD5HFwQQuStgwLPpsOza45GD/yD4MDw2jVCrCMHSkUwmws3kCMADD0GCZpialMG3bia4trVsJ+xkJAKSUStM0oWsSQrgTGdu2MXllEmezF/HRhz+C4b6hyEgrnyjVLLzhcho1iFsDiGomOzt+Ds/8z7PIzmfR39eP1dVVSOEijR0nRsFrg1ISpmkoQ9cTufxKrBbHmoUoJZWmlPDXRZgdMDNsx8HuXbtx3zvvhRQKTdFmLQACoT2dwY9efRWlvA1m1xJy2IEggkPrnUvXB9M0lGkaiVx+xR/ADQuPRQAppaY0JfzOBB0joFAs4Oyb59E0Y7pF4DDDdmw47LgygQHbbs7Ij4JpGMIwjGRFcF0xFJcDdE0pUb3YQ1hYWsDFSxff7vgHMyO3kkMGiaAPzScAwzB0YVlmAuHo3zQHkKaUppTHAUQBLQnAYm4J41feCldAGeHe2FaCq9fdXQMP8qt5sB6OlGbP4pkBwzBgGHoKMdcIG82Ew0RK6UqTxHAJEHSBCLmVHCavXwUcwGpXMJIS2YnVhrq01cAOQxkC7YMG5i6vwi65LV4trIK10GJyHLvpTTR0DZZlJtEEMxR+IVJJTSlFAFdZL47joFgswrEZ3X06Dv3eAH787Vm8/t0s8nMld9PjBhHCN1G7dlm490g3rIzCt/5yHIWiA5dxGQ5HOcBpatuYGZquwTSNTXMAogVoSukuAXwlzFUpSRCyl1cx+VoOBz/Zi93vyeDE16bx1iuLsIsOSLSWCuwwEh0a9h/uxDs+2gWnxDj+79dQKjhlg4bZl/vkiaDmtkvXNFimmURMJ4VYOkBpSldSug91TDYiIDdXwtEvTeDNlxZw3y/34PDnduLCi/M4+eQ0Zt5cCdI1G/FKFxg5mME9R7rRMWTi/AtzOPnENLKXV2tyrA+lFqzkKk3BNI0k3BWE5swDXA7wlm0bFEkEODbjzWPzmDqTw4HDnbjz57swdHcKp56+jte/k0VurtRUInSPJXD3Y90YfXcbZt7I49t/M45LJ5ZgF7lMAbsN9BfiXE5uthXEzFBK+TpAhrVunAAEeEp4DQ4oyyQI+fkSjn/tGsZfWcA9j3Xjvk/0Yte72vD8FyZw/Y2VauRsAA483ImDn+oF28DL/zqFn3wni/xcESSoTvkExxdBBNilFnCAlLBMM+Hhdk3HtThoIE1TulTuDlscAgAuNxCA6XN5HP+Pa8heWsHAgSQyA0ZzFr8IGHhHCukeHedfmMOpb8wgly021jXkTsjYm9C0YjNJSgFvHuAP7qbMA3TpcwAo1ooDOwwjKTH2QDvu/lg3lCnwg69cxcSpJc8dZJPgACeeuAYhgf0Pd6JjyMArX5/GlZ8sg23U5TCf+ESt0QFCCFiWYcF131kT4lhBpDSXAMy+Eq1PAXYAIYHBu9O490g3evclMf7yAk785zSuX8i7Y68ZOoCA6xdW8N2/u4TRd2dw75FuPPqnu3Dmu7N49RszWLiyGvgGRfM47HjNdzmg6U6kRLAs02wGAXwieBwgggoaMUD7oI67fmEHbjvUgfmrBTz395fw5ksLKK26pmgzO0wCsFcZ576XxeTpZdzxaCfu+HAXRg624eST0zh/dB6FXDjK3TUgVwQREUot0AFCEEx3U8ZoBgEAVwdoUnheFnWGLztA1y4Tj/zxCIyUwI+emsaPn5nF8qyvFFs0D/C805Zni3jpq1MY/+EC7jnSg/f+5gB69yXw/BcnYBfDIeMrYaLW6ACAYFmmjpi7YqpmCRWMq2maLgIOqFcUQ7MErp5ZxqmnZ0Jx0+IJWNBIr5qpszl852/fwp73ZNC3PwmhKCQAUWCGAu5MuNlriEQEy6zaFauLhHg6QClNejte9YQICcL1i3k8/4UJd/bZZHETGwGCYK8yzjw3h4vHFmAXym19dxfNE0EtcqkxTVPTdd0qFApRPNaEtcxQAiA0TelCeKvRDTSoXWTYJb5ho75Rq0kApbwDrphrOREd0Ip5AOBuyhiGHsttpB4BohiUmqZpgel4Mx1qournYCbcUg4wpLccUasVZVCLAJUZhKaUTp5hvTWCpXnAcEIOsG00fxuVYRq6MA3dX5JuCGt5xhEAqWkq4IC4M+GYbV0/bLJ6h92dmlaJIG9ThkyzbE9gQ0rYB6lpSgUc0CT8C0nQzPUvCDk2o7iysUU0gmsFcSCCnJZspeq6BtPUk3HSxrGChKZpmu/U2gwKsMPo2Z/E+397AELFL48EMHFqGd//x0k49gYwR+VWUGvmAQxD12GZZgox1tpiuSa6HOCJIJ8umxo5hELOxvSFPEiuIxcR5idXNzVqqwnQXBZghr8r5m/KbHgxzs+oNE1T/sBvhggiAcyOr+B//+FyUzsfD0ERM7RFIkjTgj2BNTmgnhUUXcd2N4SpBUp4C6DVHABmaEr5+8L+rtiGlTADUK4I8kJ8XeDDes/KAw37zPUSrYUn5tpJOJqE4ThOSACn+RzAAKSU/p7AmgI2phWkyeB4ZqQiAsFZtkFOZI+Ao7SgytVgeJoQVBkf+HRGrxVhVBFGqHj24imSP3psFUAylYCSEsWSDdu2y86WNQukuytmIdwVq3tSJo5zrtI0JUMjiAJzbrB/AA8YRnCWNnLON3JuFyEiIj8AZen9Vc0wL0JkRtMgGlfjDHBwDSLKzwp7dRZL+aYivZwAApZlWnAPt0TxuSYBKocCA1BKUxIgMBy0taUAOCiVikilUkin0/FbFnEz3xxQLGMg6rpemX9paQm37x2DlLLMU6IZIITwOUCraEAVERotR4ccoDQJAI7DGBrsx8MP3o+nv/V9dHf3BAc1IjguO00d+OpHffYrw5ir09WMi5wd4PC8QLDHXHGmIHr1G8dgsOOgoyOJB973LjR/KSLYFYtuymxYCZOUUtM8z2i/w48cPgTTMPDD46eQX1mG768Smqq+qAFEROwIQSASZVdBAiQIQggI8q7+c/AjSCEgZBgm/TgZ3stovKy4RsqzLBMjOweRSiXhNOFwRi0CmJbhE2BTm/KspNQ0pcrMVaUkDj/0fnzg0P0olkqhs+4a71xoeA0LKCurIrhmf2rJzca9cl0Um3U0qZoAqNwV25AS9pEdnA2IguM4kFLC95bYLPiiJYIjtEI83BggWKapCSEsx3E2txinlPJOx9z8k7AbBUTBSRkrl8tv+GUdDIClksphFsvL+ZacKLn1gL3V0DICrOuQXvSohUNE2rnz41QqcdPNtVsRGEBbOgnbdkjTVKUZWgWqRn4fHABOoVBcNE2ztHPnoL7NAfHANHS8dPzE0sxMdsILqvsGrXocEGRYXFx67fUz5y729e7Yw4ADjumb2AJoWq2xCtrwdh0TQRz74YmLpZI9HitHjTCCa0KZANKGoX88lUo+pCmlhBASYMmAjE76Ea4CoNyerDYuUZHRXwiq2Pan8r/yNkcMAiqvv+pwFFWmpQqbl6isaqoVVtajsJfB0piXwCEidhyHp6/PHpudnfs8gDm4b07xX+xXBnEW43jv2Ojo73/20x+ezc47Fy6MN/IOXZ+ZxBvIE6eeCovbn0FXzjXqt4urEsVlGsPQ8NFHP0RP/dez4sv/9G8ZuK8wq2uKxtkRs+44cNs7e3t61NEXXwVIVUye1o+f+nnXsT1ZlrwiH9dKjLp+TZVhoRNy/Jb5PrPjlyfAzDiwf28vgD4AV+AuS5dq5au3FuS/I0IB6B3bM7L7wsW3IJSBjvb2ls0gb3YgIiym0hi/NImB/p5Mpi09Or+weBqu+CliHYtx/ruCpGWZu3cOD/Sceu08ioUiFhcX12rHTy0QEXTdwKVLV7B/326tt3fHnvmFRQMu8v03aAERIjTyC5IAtJGdg/s7OjLmbHYBXV29TVt6uFVB13VMXZtFwrIwMNA3dvbcGxaAFYQb9LE5QAFI7Nk9cgdAyOeL2CFlS8XPrbDUoZTC4lIexVIJw0P9IwDScBVxzVOT9QggvbiuvWOjY9nsPBxmLC0tbc+G1wApJWyHMTObxcjwYB+ALgBTCN8+WTYpa0QAQUTDu0eH+ycmp5BOtyGVSm0r4Big6wYmJqYwNNTfIaXss237DEIRVMYFUQIEnnDwOGBwoG9ff19P+tXT52BZiVtCRLS6D8wM0zRx6fJV/Oz991jdOzp3Xp2a9iVKlTlayQFR89PYPTp8wLJMys4tItNuYH5+fqvx97YHIQQ0XcfUtRmkUgnq7+8duTo1raGOj1AlB0TnAOm9Y6O35XJ5MAskk8lt8bMOmMzOwHEYw0P9IydOnjYR6oC6BADK5wD9e8d2DV65Og3dMKGUuuUUcCvFkcPA/PwCRnYODAJoA3AdNRy1anGABCA7O9vHRnYOdrx84sdgBubm5rY5ICa4m/8Sk1enMTQ00A2gG8BbKOcCBmpzgASgj44M7+/oaJfXpmfR3t5xy07AWsUFhUIRlyemcOcde9OpVHJgaWn5FawhgqLfhkmOje26nZmRyxXQtePmfU3xVoFpmbg2PYtMW1rr6+3eeX5pOaqEgyWJShHkJ9px297RXddnsiiWbCwuLv5UiJ9aX/bYSBlE7nV5OYe2dAqDA727zl94s5IAZSIoKv9FImHt2rN7pDs7N4/l5WVIOesRwH8Tbs2qgwvXi6uKr9PB+u8ujomSeKlonZG0RmRl6AcPHcTAQC8GB/uGEb5RPToh46j3bhCxc3hg39Bgn9nbswPpVBK53ErZR2tqOV358eVx4X2wzRRx2K103q12yEXo5Bvcry99I4ewuI5kYdsj6SIOxV5omXOwphS6ujoghMDw0EAvXEvoSgTfAKrfaUMA9F0jQ7d3d3chk0njoQ+9b83NiK0VTnHendOqdnLdIIY7K3YJ0N8ppeixbecMYixFpHaNDI+mU0n3pdl8a9n+NxJ87ujv7030dO8YvHL1mr8zWsYBlZrZymTSKaUlQNLAVo/vmxsIxCV0tLeJzs72bo8AboSH71qroStLS8u567PzyK86G9ox32yjW1lU6/sTrYFhmQqWZSGdSmZqpVZlqV3IzcxkZ6evTWFpebWmT2+tj6MF76OtdbSL61gyzDXTlZ0hKE9Q9rEGrrK8uELec1Vc+bcJIvfRwyM1wpiry2sU5opvRqYtCcuUKBSKJYQf/QzcFX0CRN0Rc8dPnD5qJZ7okVKCHYd8V27/RRcM9gAAewc/2bsLH+GnCf+Xp/PmFsFtEBumLqss8oTIX9lzUFCQJ9rAijRV92VtjTxHyquqpKzLjn+Fu+xsKyULzLzyxhuXnkSNL66WnYRB+KnCDNydHP/dZzpCU7WWUuAGzxwjvlYZ9cLWm4cbxMUpD2vkqQzzkVwEUIC7Gb/iXQvez3fSYlWR0YZLuUUvkYHw453+JGK9EKdTrdT0Db2TW9CO6DeGSyhHetWXVqOfvXAq7m0vY9xvBW+28RvJ3ygP4ca3KcpJUU7wER/VAQBqK2H/DRZ+hspDe81EYKsQsZV1Vg7oKNKjyGegsXNuFOE302Ywr/G8Fe2pq4fqIfZmQvjbHbZ6AGzDNmzDNmzD2xT+H+5UT7Tyxc2HAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA2LTMwVDExOjUwOjAyLTA0OjAwOaSkCgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMS0wMVQxMDozODoyNC0wNDowMNba8BsAAAAASUVORK5CYII="), i.resource.add("hterm/concat/date", "text/plain", "Tue, 22 Aug 2017 06:42:31 +0000"), i.resource.add("hterm/changelog/version", "text/plain", "1.70"), i.resource.add("hterm/changelog/date", "text/plain", "2017-08-16"), i.resource.add("hterm/git/HEAD", "text/plain", "git rev-parse HEAD"), e.exports = {
        hterm: o,
        lib: i
    }
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.CHARSETS = {}, t.DEFAULT_CHARSET = t.CHARSETS.B, t.CHARSETS[0] = {
        "`": "◆",
        a: "▒",
        b: "\t",
        c: "\f",
        d: "\r",
        e: "\n",
        f: "°",
        g: "±",
        h: "␤",
        i: "\v",
        j: "┘",
        k: "┐",
        l: "┌",
        m: "└",
        n: "┼",
        o: "⎺",
        p: "⎻",
        q: "─",
        r: "⎼",
        s: "⎽",
        t: "├",
        u: "┤",
        v: "┴",
        w: "┬",
        x: "│",
        y: "≤",
        z: "≥",
        "{": "π",
        "|": "≠",
        "}": "£",
        "~": "·"
    }, t.CHARSETS.A = {
        "#": "£"
    }, t.CHARSETS.B = null, t.CHARSETS[4] = {
        "#": "£",
        "@": "¾",
        "[": "ij",
        "\\": "½",
        "]": "|",
        "{": "¨",
        "|": "f",
        "}": "¼",
        "~": "´"
    }, t.CHARSETS.C = t.CHARSETS[5] = {
        "[": "Ä",
        "\\": "Ö",
        "]": "Å",
        "^": "Ü",
        "`": "é",
        "{": "ä",
        "|": "ö",
        "}": "å",
        "~": "ü"
    }, t.CHARSETS.R = {
        "#": "£",
        "@": "à",
        "[": "°",
        "\\": "ç",
        "]": "§",
        "{": "é",
        "|": "ù",
        "}": "è",
        "~": "¨"
    }, t.CHARSETS.Q = {
        "@": "à",
        "[": "â",
        "\\": "ç",
        "]": "ê",
        "^": "î",
        "`": "ô",
        "{": "é",
        "|": "ù",
        "}": "è",
        "~": "û"
    }, t.CHARSETS.K = {
        "@": "§",
        "[": "Ä",
        "\\": "Ö",
        "]": "Ü",
        "{": "ä",
        "|": "ö",
        "}": "ü",
        "~": "ß"
    }, t.CHARSETS.Y = {
        "#": "£",
        "@": "§",
        "[": "°",
        "\\": "ç",
        "]": "é",
        "`": "ù",
        "{": "à",
        "|": "ò",
        "}": "è",
        "~": "ì"
    }, t.CHARSETS.E = t.CHARSETS[6] = {
        "@": "Ä",
        "[": "Æ",
        "\\": "Ø",
        "]": "Å",
        "^": "Ü",
        "`": "ä",
        "{": "æ",
        "|": "ø",
        "}": "å",
        "~": "ü"
    }, t.CHARSETS.Z = {
        "#": "£",
        "@": "§",
        "[": "¡",
        "\\": "Ñ",
        "]": "¿",
        "{": "°",
        "|": "ñ",
        "}": "ç"
    }, t.CHARSETS.H = t.CHARSETS[7] = {
        "@": "É",
        "[": "Ä",
        "\\": "Ö",
        "]": "Å",
        "^": "Ü",
        "`": "é",
        "{": "ä",
        "|": "ö",
        "}": "å",
        "~": "ü"
    }, t.CHARSETS["="] = {
        "#": "ù",
        "@": "à",
        "[": "é",
        "\\": "ç",
        "]": "ê",
        "^": "î",
        _: "è",
        "`": "ô",
        "{": "ä",
        "|": "ö",
        "}": "ü",
        "~": "û"
    }
}, function (e, t, r) {
    /**
     * Implements the attach method, that attaches the terminal to a WebSocket stream.
     * @module xterm/addons/attach/attach
     * @license MIT
     */
    ! function (t) {
        e.exports = t(r(0))
    }(function (e) {
        "use strict";
        var t = {};
        return t.attach = function (e, t, r, i) {
            r = void 0 === r || r, e.socket = t, e._flushBuffer = function () {
                e.write(e._attachSocketBuffer), e._attachSocketBuffer = null, clearTimeout(e._attachSocketBufferTimer), e._attachSocketBufferTimer = null
            }, e._pushToBuffer = function (t) {
                e._attachSocketBuffer ? e._attachSocketBuffer += t : (e._attachSocketBuffer = t, setTimeout(e._flushBuffer, 10))
            }, e._getMessage = function (t) {
                i ? e._pushToBuffer(t.data) : e.write(t.data)
            }, e._sendData = function (e) {
                t.send(e)
            }, t.addEventListener("message", e._getMessage), r && e.on("data", e._sendData), t.addEventListener("close", e.detach.bind(e, t)), t.addEventListener("error", e.detach.bind(e, t))
        }, t.detach = function (e, t) {
            e.off("data", e._sendData), (t = void 0 === t ? e.socket : t) && t.removeEventListener("message", e._getMessage), delete e.socket
        }, e.prototype.attach = function (e, r, i) {
            return t.attach(this, e, r, i)
        }, e.prototype.detach = function (e) {
            return t.detach(this, e)
        }, t
    })
}, function (e, t, r) {
    /**
     * Fit terminal columns and rows to the dimensions of its DOM element.
     *
     * ## Approach
     * - Rows: Truncate the division of the terminal parent element height by the terminal row height.
     *
     * - Columns: Truncate the division of the terminal parent element width by the terminal character
     * width (apply display: inline at the terminal row and truncate its width with the current
     * number of columns).
     * @module xterm/addons/fit/fit
     * @license MIT
     */
    ! function (t) {
        e.exports = t(r(0))
    }(function (e) {
        var t = {};
        return t.proposeGeometry = function (e) {
            if (!e.element.parentElement) return null;
            var t, r, i, o, s = window.getComputedStyle(e.element.parentElement),
                n = parseInt(s.getPropertyValue("height")),
                a = Math.max(0, parseInt(s.getPropertyValue("width")) - 17),
                l = window.getComputedStyle(e.element),
                h = n - (parseInt(l.getPropertyValue("padding-top")) + parseInt(l.getPropertyValue("padding-bottom"))),
                c = a - (parseInt(l.getPropertyValue("padding-right")) + parseInt(l.getPropertyValue("padding-left"))),
                u = (e.rowContainer, e.rowContainer.firstElementChild),
                d = u.innerHTML;
            return u.style.display = "inline", u.innerHTML = "W", i = u.getBoundingClientRect().width, u.style.display = "", t = u.getBoundingClientRect().height, u.innerHTML = d, r = parseInt(h / t), o = parseInt(c / i), {
                cols: o,
                rows: r
            }
        }, t.fit = function (e) {
            var r = t.proposeGeometry(e);
            r && e.resize(r.cols, r.rows)
        }, e.prototype.proposeGeometry = function () {
            return t.proposeGeometry(this)
        }, e.prototype.fit = function () {
            return t.fit(this)
        }, t
    })
}, function (e, t, r) {
    /**
     * Fullscreen addon for xterm.js
     * @module xterm/addons/fullscreen/fullscreen
     * @license MIT
     */
    ! function (t) {
        e.exports = t(r(0))
    }(function (e) {
        var t = {};
        return t.toggleFullScreen = function (e, t) {
            var r;
            r = void 0 === t ? e.element.classList.contains("fullscreen") ? "remove" : "add" : t ? "add" : "remove", e.element.classList[r]("fullscreen")
        }, e.prototype.toggleFullscreen = function (e) {
            t.toggleFullScreen(this, e)
        }, t
    })
}, function (e, t, r) {
    /**
     * This module provides methods for attaching a terminal to a terminado WebSocket stream.
     *
     * @module xterm/addons/terminado/terminado
     * @license MIT
     */
    ! function (t) {
        e.exports = t(r(0))
    }(function (e) {
        "use strict";
        var t = {};
        return t.terminadoAttach = function (e, t, r, i) {
            r = void 0 === r || r, e.socket = t, e._flushBuffer = function () {
                e.write(e._attachSocketBuffer), e._attachSocketBuffer = null, clearTimeout(e._attachSocketBufferTimer), e._attachSocketBufferTimer = null
            }, e._pushToBuffer = function (t) {
                e._attachSocketBuffer ? e._attachSocketBuffer += t : (e._attachSocketBuffer = t, setTimeout(e._flushBuffer, 10))
            }, e._getMessage = function (t) {
                var r = JSON.parse(t.data);
                "stdout" == r[0] && (i ? e._pushToBuffer(r[1]) : e.write(r[1]))
            }, e._sendData = function (e) {
                t.send(JSON.stringify(["stdin", e]))
            }, e._setSize = function (e) {
                t.send(JSON.stringify(["set_size", e.rows, e.cols]))
            }, t.addEventListener("message", e._getMessage), r && e.on("data", e._sendData), e.on("resize", e._setSize), t.addEventListener("close", e.terminadoDetach.bind(e, t)), t.addEventListener("error", e.terminadoDetach.bind(e, t))
        }, t.terminadoDetach = function (e, t) {
            e.off("data", e._sendData), (t = void 0 === t ? e.socket : t) && t.removeEventListener("message", e._getMessage), delete e.socket
        }, e.prototype.terminadoAttach = function (e, r, i) {
            return t.terminadoAttach(this, e, r, i)
        }, e.prototype.terminadoDetach = function (e) {
            return t.terminadoDetach(this, e)
        }, t
    })
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = r(27),
        o = "undefined" == typeof navigator,
        s = o ? "node" : navigator.userAgent,
        n = o ? "node" : navigator.platform;
    t.isFirefox = !!~s.indexOf("Firefox"), t.isMSIE = !!~s.indexOf("MSIE") || !!~s.indexOf("Trident"), t.isMac = i.contains(["Macintosh", "MacIntel", "MacPPC", "Mac68K"], n), t.isIpad = "iPad" === n, t.isIphone = "iPhone" === n, t.isMSWindows = i.contains(["Windows", "Win16", "Win32", "WinCE"], n), t.isLinux = n.indexOf("Linux") >= 0
}, function (e, t, r) {
    "use strict";

    function i(e, t) {
        if (null == e.pageX) return null;
        for (var r = e.pageX, i = e.pageY; t && t !== self.document.documentElement;) r -= t.offsetLeft, i -= t.offsetTop, t = "offsetParent" in t ? t.offsetParent : t.parentElement;
        return [r, i]
    }

    function o(e, t, r, o, s, n) {
        var a = i(e, t);
        return a[0] = Math.ceil((a[0] + (n ? r.width / 2 : 0)) / r.width), a[1] = Math.ceil(a[1] / r.height), a[0] = Math.min(Math.max(a[0], 1), o + 1), a[1] = Math.min(Math.max(a[1], 1), s + 1), a
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getCoordsRelativeToElement = i, t.getCoords = o, t.getRawByteCoords = function (e, t, r, i, s) {
        var n = o(e, t, r, i, s),
            a = n[0],
            l = n[1];
        return a += 32, l += 32, {
            x: a,
            y: l
        }
    }
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = r(3),
        o = function () {
            function e(e) {
                this.elem = e, i.hterm.defaultStorage = new i.lib.Storage.Memory, this.term = new i.hterm.Terminal, this.term.getPrefs().set("send-encoding", "raw"), this.term.decorate(this.elem), this.io = this.term.io.push(), this.term.installKeyboard()
            }
            return e.prototype.info = function () {
                return {
                    columns: this.columns,
                    rows: this.rows
                }
            }, e.prototype.output = function (e) {
                null != this.term.io && this.term.io.writeUTF8(e)
            }, e.prototype.showMessage = function (e, t) {
                this.message = e, t > 0 ? this.term.io.showOverlay(e, t) : this.term.io.showOverlay(e, null)
            }, e.prototype.removeMessage = function () {
                this.term.io.showOverlay(this.message, 0)
            }, e.prototype.setWindowTitle = function (e) {
                this.term.setWindowTitle(e)
            }, e.prototype.setPreferences = function (e) {
                var t = this;
                Object.keys(e).forEach(function (r) {
                    t.term.getPrefs().set(r, e[r])
                })
            }, e.prototype.onInput = function (e) {
                this.io.onVTKeystroke = function (t) {
                    e(t)
                }, this.io.sendString = function (t) {
                    e(t)
                }
            }, e.prototype.onResize = function (e) {
                var t = this;
                this.io.onTerminalResize = function (r, i) {
                    t.columns = r, t.rows = i, e(r, i)
                }
            }, e.prototype.deactivate = function () {
                this.io.onVTKeystroke = null, this.io.sendString = null, this.io.onTerminalResize = null, this.term.uninstallKeyboard()
            }, e.prototype.reset = function () {
                this.removeMessage(), this.term.installKeyboard()
            }, e.prototype.close = function () {
                this.term.uninstallKeyboard()
            }, e
        }();
    t.Hterm = o
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function () {
        function e(e, t) {
            this.url = e, this.protocols = t
        }
        return e.prototype.create = function () {
            return new o(this.url, this.protocols)
        }, e
    }();
    t.ConnectionFactory = i;
    var o = function () {
        function e(e, t) {
            this.bare = new WebSocket(e, t)
        }
        return e.prototype.open = function () {}, e.prototype.close = function () {
            this.bare.close()
        }, e.prototype.send = function (e) {
            this.bare.send(e)
        }, e.prototype.isOpen = function () {
            return this.bare.readyState == WebSocket.CONNECTING || this.bare.readyState == WebSocket.OPEN
        }, e.prototype.onOpen = function (e) {
            this.bare.onopen = function (t) {
                e()
            }
        }, e.prototype.onReceive = function (e) {
            this.bare.onmessage = function (t) {
                e(t.data)
            }
        }, e.prototype.onClose = function (e) {
            this.bare.onclose = function (t) {
                e()
            }
        }, e
    }();
    t.Connection = o
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.protocols = ["webtty"], t.msgInputUnknown = "0", t.msgInput = "1", t.msgPing = "2", t.msgResizeTerminal = "3", t.msgUnknownOutput = "0", t.msgOutput = "1", t.msgPong = "2", t.msgSetWindowTitle = "3", t.msgSetPreferences = "4", t.msgSetReconnect = "5";
    var i = function () {
        function e(e, t, r, i) {
            this.term = e, this.connectionFactory = t, this.args = r, this.authToken = i, this.reconnect = -1
        }
        return e.prototype.open = function () {
            var e, r, i = this,
                o = this.connectionFactory.create(),
                s = function () {
                    o.onOpen(function () {
                        var r = i.term.info();
                        o.send(JSON.stringify({
                            Arguments: i.args,
                            AuthToken: i.authToken
                        }));
                        var s = function (e, r) {
                            o.send(t.msgResizeTerminal + JSON.stringify({
                                columns: e,
                                rows: r
                            }))
                        };
                        i.term.onResize(s), s(r.columns, r.rows), i.term.onInput(function (e) {
                            o.send(t.msgInput + e)
                        }), e = setInterval(function () {
                            o.send(t.msgPing)
                        }, 3e4)
                    }), o.onReceive(function (e) {
                        var r = e.slice(1);
                        switch (e[0]) {
                            case t.msgOutput:
                                i.term.output(atob(r));
                                break;
                            case t.msgPong:
                                break;
                            case t.msgSetWindowTitle:
                                i.term.setWindowTitle(r);
                                break;
                            case t.msgSetPreferences:
                                var o = JSON.parse(r);
                                i.term.setPreferences(o);
                                break;
                            case t.msgSetReconnect:
                                var s = JSON.parse(r);
                                console.log("Enabling reconnect: " + s + " seconds"), i.reconnect = s
                        }
                    }), o.onClose(function () {
                        clearInterval(e), i.term.deactivate(), i.term.showMessage("Connection Closed", 0), i.reconnect > 0 && (r = setTimeout(function () {
                            o = i.connectionFactory.create(), i.term.reset(), s()
                        }, 1e3 * i.reconnect))
                    }), o.open()
                };
            return s(),
                function () {
                    clearTimeout(r), o.close()
                }
        }, e
    }();
    t.WebTTY = i
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = r(0),
        o = r(3);
    i.loadAddon("fit");
    var s = function () {
        function e(e) {
            var t = this;
            this.elem = e, this.term = new i, this.message = e.ownerDocument.createElement("div"), this.message.className = "xterm-overlay", this.messageTimeout = 2e3, this.resizeListener = function () {
                t.term.fit(), t.term.scrollToBottom(), t.showMessage(String(t.term.cols) + "x" + String(t.term.rows), t.messageTimeout)
            }, this.term.on("open", function () {
                t.resizeListener(), window.addEventListener("resize", function () {
                    t.resizeListener()
                })
            }), this.term.open(e, !0), this.decoder = new o.lib.UTF8Decoder
        }
        return e.prototype.info = function () {
            return {
                columns: this.term.cols,
                rows: this.term.rows
            }
        }, e.prototype.output = function (e) {
            this.term.write(this.decoder.decode(e))
        }, e.prototype.showMessage = function (e, t) {
            var r = this;
            this.message.textContent = e, this.elem.appendChild(this.message), this.messageTimer && clearTimeout(this.messageTimer), t > 0 && (this.messageTimer = setTimeout(function () {
                r.elem.removeChild(r.message)
            }, t))
        }, e.prototype.removeMessage = function () {
            this.message.parentNode == this.elem && this.elem.removeChild(this.message)
        }, e.prototype.setWindowTitle = function (e) {
            document.title = e
        }, e.prototype.setPreferences = function (e) {}, e.prototype.onInput = function (e) {
            this.term.on("data", function (t) {
                e(t)
            })
        }, e.prototype.onResize = function (e) {
            this.term.on("resize", function (t) {
                e(t.cols, t.rows)
            })
        }, e.prototype.deactivate = function () {
            this.term.off("data"), this.term.off("resize"), this.term.blur()
        }, e.prototype.reset = function () {
            this.removeMessage(), this.term.clear()
        }, e.prototype.close = function () {
            window.removeEventListener("resize", this.resizeListener), this.term.destroy()
        }, e
    }();
    t.Xterm = s
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function () {
        function e(e, t, r) {
            this.textarea = e, this.compositionView = t, this.terminal = r, this.isComposing = !1, this.isSendingComposition = !1, this.compositionPosition = {
                start: null,
                end: null
            }
        }
        return e.prototype.compositionstart = function () {
            this.isComposing = !0, this.compositionPosition.start = this.textarea.value.length, this.compositionView.textContent = "", this.compositionView.classList.add("active")
        }, e.prototype.compositionupdate = function (e) {
            var t = this;
            this.compositionView.textContent = e.data, this.updateCompositionElements(), setTimeout(function () {
                t.compositionPosition.end = t.textarea.value.length
            }, 0)
        }, e.prototype.compositionend = function () {
            this.finalizeComposition(!0)
        }, e.prototype.keydown = function (e) {
            if (this.isComposing || this.isSendingComposition) {
                if (229 === e.keyCode) return !1;
                if (16 === e.keyCode || 17 === e.keyCode || 18 === e.keyCode) return !1;
                this.finalizeComposition(!1)
            }
            return 229 !== e.keyCode || (this.handleAnyTextareaChanges(), !1)
        }, e.prototype.finalizeComposition = function (e) {
            var t = this;
            if (this.compositionView.classList.remove("active"), this.isComposing = !1, this.clearTextareaPosition(), e) {
                var r = {
                    start: this.compositionPosition.start,
                    end: this.compositionPosition.end
                };
                this.isSendingComposition = !0, setTimeout(function () {
                    if (t.isSendingComposition) {
                        t.isSendingComposition = !1;
                        var e = void 0;
                        e = t.isComposing ? t.textarea.value.substring(r.start, r.end) : t.textarea.value.substring(r.start), t.terminal.handler(e)
                    }
                }, 0)
            } else {
                this.isSendingComposition = !1;
                var i = this.textarea.value.substring(this.compositionPosition.start, this.compositionPosition.end);
                this.terminal.handler(i)
            }
        }, e.prototype.handleAnyTextareaChanges = function () {
            var e = this,
                t = this.textarea.value;
            setTimeout(function () {
                if (!e.isComposing) {
                    var r = e.textarea.value.replace(t, "");
                    r.length > 0 && e.terminal.handler(r)
                }
            }, 0)
        }, e.prototype.updateCompositionElements = function (e) {
            var t = this;
            if (this.isComposing) {
                var r = this.terminal.element.querySelector(".terminal-cursor");
                if (r) {
                    var i = this.terminal.element.querySelector(".xterm-rows").offsetTop + r.offsetTop;
                    this.compositionView.style.left = r.offsetLeft + "px", this.compositionView.style.top = i + "px", this.compositionView.style.height = r.offsetHeight + "px", this.compositionView.style.lineHeight = r.offsetHeight + "px";
                    var o = this.compositionView.getBoundingClientRect();
                    this.textarea.style.left = r.offsetLeft + "px", this.textarea.style.top = i + "px", this.textarea.style.width = o.width + "px", this.textarea.style.height = o.height + "px", this.textarea.style.lineHeight = o.height + "px"
                }
                e || setTimeout(function () {
                    return t.updateCompositionElements(!0)
                }, 0)
            }
        }, e.prototype.clearTextareaPosition = function () {
            this.textarea.style.left = "", this.textarea.style.top = ""
        }, e
    }();
    t.CompositionHelper = i
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = r(2),
        o = r(4),
        s = function () {
            function e(e) {
                this._terminal = e
            }
            return e.prototype.addChar = function (e, t) {
                if (e >= " ") {
                    var r = n(t);
                    this._terminal.charset && this._terminal.charset[e] && (e = this._terminal.charset[e]);
                    var i = this._terminal.y + this._terminal.ybase;
                    if (!r && this._terminal.x) return void(this._terminal.lines.get(i)[this._terminal.x - 1] && (this._terminal.lines.get(i)[this._terminal.x - 1][2] ? this._terminal.lines.get(i)[this._terminal.x - 1][1] += e : this._terminal.lines.get(i)[this._terminal.x - 2] && (this._terminal.lines.get(i)[this._terminal.x - 2][1] += e), this._terminal.updateRange(this._terminal.y)));
                    if (this._terminal.x + r - 1 >= this._terminal.cols)
                        if (this._terminal.wraparoundMode) this._terminal.x = 0, ++this._terminal.y > this._terminal.scrollBottom ? (this._terminal.y--, this._terminal.scroll(!0)) : this._terminal.lines.get(this._terminal.y).isWrapped = !0;
                        else if (2 === r) return;
                    if (i = this._terminal.y + this._terminal.ybase, this._terminal.insertMode)
                        for (var o = 0; o < r; ++o) 0 === this._terminal.lines.get(this._terminal.y + this._terminal.ybase).pop()[2] && this._terminal.lines.get(i)[this._terminal.cols - 2] && 2 === this._terminal.lines.get(i)[this._terminal.cols - 2][2] && (this._terminal.lines.get(i)[this._terminal.cols - 2] = [this._terminal.curAttr, " ", 1]), this._terminal.lines.get(i).splice(this._terminal.x, 0, [this._terminal.curAttr, " ", 1]);
                    this._terminal.lines.get(i)[this._terminal.x] = [this._terminal.curAttr, e, r], this._terminal.x++, this._terminal.updateRange(this._terminal.y), 2 === r && (this._terminal.lines.get(i)[this._terminal.x] = [this._terminal.curAttr, "", 0], this._terminal.x++)
                }
            }, e.prototype.bell = function () {
                var e = this;
                this._terminal.visualBell && (this._terminal.element.style.borderColor = "white", setTimeout(function () {
                    return e._terminal.element.style.borderColor = ""
                }, 10), this._terminal.popOnBell && this._terminal.focus())
            }, e.prototype.lineFeed = function () {
                this._terminal.convertEol && (this._terminal.x = 0), ++this._terminal.y > this._terminal.scrollBottom && (this._terminal.y--, this._terminal.scroll()), this._terminal.x >= this._terminal.cols && this._terminal.x--
            }, e.prototype.carriageReturn = function () {
                this._terminal.x = 0
            }, e.prototype.backspace = function () {
                this._terminal.x > 0 && this._terminal.x--
            }, e.prototype.tab = function () {
                this._terminal.x = this._terminal.nextStop()
            }, e.prototype.shiftOut = function () {
                this._terminal.setgLevel(1)
            }, e.prototype.shiftIn = function () {
                this._terminal.setgLevel(0)
            }, e.prototype.insertChars = function (e) {
                var t, r, i, o;
                for ((t = e[0]) < 1 && (t = 1), r = this._terminal.y + this._terminal.ybase, i = this._terminal.x, o = [this._terminal.eraseAttr(), " ", 1]; t-- && i < this._terminal.cols;) this._terminal.lines.get(r).splice(i++, 0, o), this._terminal.lines.get(r).pop()
            }, e.prototype.cursorUp = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.y -= t, this._terminal.y < 0 && (this._terminal.y = 0)
            }, e.prototype.cursorDown = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.y += t, this._terminal.y >= this._terminal.rows && (this._terminal.y = this._terminal.rows - 1), this._terminal.x >= this._terminal.cols && this._terminal.x--
            }, e.prototype.cursorForward = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.x += t, this._terminal.x >= this._terminal.cols && (this._terminal.x = this._terminal.cols - 1)
            }, e.prototype.cursorBackward = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.x >= this._terminal.cols && this._terminal.x--, this._terminal.x -= t, this._terminal.x < 0 && (this._terminal.x = 0)
            }, e.prototype.cursorNextLine = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.y += t, this._terminal.y >= this._terminal.rows && (this._terminal.y = this._terminal.rows - 1), this._terminal.x = 0
            }, e.prototype.cursorPrecedingLine = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.y -= t, this._terminal.y < 0 && (this._terminal.y = 0), this._terminal.x = 0
            }, e.prototype.cursorCharAbsolute = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.x = t - 1
            }, e.prototype.cursorPosition = function (e) {
                var t, r;
                t = e[0] - 1, r = e.length >= 2 ? e[1] - 1 : 0, t < 0 ? t = 0 : t >= this._terminal.rows && (t = this._terminal.rows - 1), r < 0 ? r = 0 : r >= this._terminal.cols && (r = this._terminal.cols - 1), this._terminal.x = r, this._terminal.y = t
            }, e.prototype.cursorForwardTab = function (e) {
                for (var t = e[0] || 1; t--;) this._terminal.x = this._terminal.nextStop()
            }, e.prototype.eraseInDisplay = function (e) {
                var t;
                switch (e[0]) {
                    case 0:
                        for (this._terminal.eraseRight(this._terminal.x, this._terminal.y), t = this._terminal.y + 1; t < this._terminal.rows; t++) this._terminal.eraseLine(t);
                        break;
                    case 1:
                        for (this._terminal.eraseLeft(this._terminal.x, this._terminal.y), t = this._terminal.y; t--;) this._terminal.eraseLine(t);
                        break;
                    case 2:
                        for (t = this._terminal.rows; t--;) this._terminal.eraseLine(t);
                        break;
                    case 3:
                        var r = this._terminal.lines.length - this._terminal.rows;
                        r > 0 && (this._terminal.lines.trimStart(r), this._terminal.ybase = Math.max(this._terminal.ybase - r, 0), this._terminal.ydisp = Math.max(this._terminal.ydisp - r, 0))
                }
            }, e.prototype.eraseInLine = function (e) {
                switch (e[0]) {
                    case 0:
                        this._terminal.eraseRight(this._terminal.x, this._terminal.y);
                        break;
                    case 1:
                        this._terminal.eraseLeft(this._terminal.x, this._terminal.y);
                        break;
                    case 2:
                        this._terminal.eraseLine(this._terminal.y)
                }
            }, e.prototype.insertLines = function (e) {
                var t, r, i;
                for ((t = e[0]) < 1 && (t = 1), r = this._terminal.y + this._terminal.ybase, i = this._terminal.rows - 1 - this._terminal.scrollBottom, i = this._terminal.rows - 1 + this._terminal.ybase - i + 1; t--;) this._terminal.lines.length === this._terminal.lines.maxLength && (this._terminal.lines.trimStart(1), this._terminal.ybase--, this._terminal.ydisp--, r--, i--), this._terminal.lines.splice(r, 0, this._terminal.blankLine(!0)), this._terminal.lines.splice(i, 1);
                this._terminal.updateRange(this._terminal.y), this._terminal.updateRange(this._terminal.scrollBottom)
            }, e.prototype.deleteLines = function (e) {
                var t, r, i;
                for ((t = e[0]) < 1 && (t = 1), r = this._terminal.y + this._terminal.ybase, i = this._terminal.rows - 1 - this._terminal.scrollBottom, i = this._terminal.rows - 1 + this._terminal.ybase - i; t--;) this._terminal.lines.length === this._terminal.lines.maxLength && (this._terminal.lines.trimStart(1), this._terminal.ybase -= 1, this._terminal.ydisp -= 1), this._terminal.lines.splice(i + 1, 0, this._terminal.blankLine(!0)), this._terminal.lines.splice(r, 1);
                this._terminal.updateRange(this._terminal.y), this._terminal.updateRange(this._terminal.scrollBottom)
            }, e.prototype.deleteChars = function (e) {
                var t, r, i;
                for ((t = e[0]) < 1 && (t = 1), r = this._terminal.y + this._terminal.ybase, i = [this._terminal.eraseAttr(), " ", 1]; t--;) this._terminal.lines.get(r).splice(this._terminal.x, 1), this._terminal.lines.get(r).push(i)
            }, e.prototype.scrollUp = function (e) {
                for (var t = e[0] || 1; t--;) this._terminal.lines.splice(this._terminal.ybase + this._terminal.scrollTop, 1), this._terminal.lines.splice(this._terminal.ybase + this._terminal.scrollBottom, 0, this._terminal.blankLine());
                this._terminal.updateRange(this._terminal.scrollTop), this._terminal.updateRange(this._terminal.scrollBottom)
            }, e.prototype.scrollDown = function (e) {
                for (var t = e[0] || 1; t--;) this._terminal.lines.splice(this._terminal.ybase + this._terminal.scrollBottom, 1), this._terminal.lines.splice(this._terminal.ybase + this._terminal.scrollTop, 0, this._terminal.blankLine());
                this._terminal.updateRange(this._terminal.scrollTop), this._terminal.updateRange(this._terminal.scrollBottom)
            }, e.prototype.eraseChars = function (e) {
                var t, r, i, o;
                for ((t = e[0]) < 1 && (t = 1), r = this._terminal.y + this._terminal.ybase, i = this._terminal.x, o = [this._terminal.eraseAttr(), " ", 1]; t-- && i < this._terminal.cols;) this._terminal.lines.get(r)[i++] = o
            }, e.prototype.cursorBackwardTab = function (e) {
                for (var t = e[0] || 1; t--;) this._terminal.x = this._terminal.prevStop()
            }, e.prototype.charPosAbsolute = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.x = t - 1, this._terminal.x >= this._terminal.cols && (this._terminal.x = this._terminal.cols - 1)
            }, e.prototype.HPositionRelative = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.x += t, this._terminal.x >= this._terminal.cols && (this._terminal.x = this._terminal.cols - 1)
            }, e.prototype.repeatPrecedingCharacter = function (e) {
                for (var t = e[0] || 1, r = this._terminal.lines.get(this._terminal.ybase + this._terminal.y), i = r[this._terminal.x - 1] || [this._terminal.defAttr, " ", 1]; t--;) r[this._terminal.x++] = i
            }, e.prototype.sendDeviceAttributes = function (e) {
                e[0] > 0 || (this._terminal.prefix ? ">" === this._terminal.prefix && (this._terminal.is("xterm") ? this._terminal.send(i.C0.ESC + "[>0;276;0c") : this._terminal.is("rxvt-unicode") ? this._terminal.send(i.C0.ESC + "[>85;95;0c") : this._terminal.is("linux") ? this._terminal.send(e[0] + "c") : this._terminal.is("screen") && this._terminal.send(i.C0.ESC + "[>83;40003;0c")) : this._terminal.is("xterm") || this._terminal.is("rxvt-unicode") || this._terminal.is("screen") ? this._terminal.send(i.C0.ESC + "[?1;2c") : this._terminal.is("linux") && this._terminal.send(i.C0.ESC + "[?6c"))
            }, e.prototype.linePosAbsolute = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.y = t - 1, this._terminal.y >= this._terminal.rows && (this._terminal.y = this._terminal.rows - 1)
            }, e.prototype.VPositionRelative = function (e) {
                var t = e[0];
                t < 1 && (t = 1), this._terminal.y += t, this._terminal.y >= this._terminal.rows && (this._terminal.y = this._terminal.rows - 1), this._terminal.x >= this._terminal.cols && this._terminal.x--
            }, e.prototype.HVPosition = function (e) {
                e[0] < 1 && (e[0] = 1), e[1] < 1 && (e[1] = 1), this._terminal.y = e[0] - 1, this._terminal.y >= this._terminal.rows && (this._terminal.y = this._terminal.rows - 1), this._terminal.x = e[1] - 1, this._terminal.x >= this._terminal.cols && (this._terminal.x = this._terminal.cols - 1)
            }, e.prototype.tabClear = function (e) {
                var t = e[0];
                t <= 0 ? delete this._terminal.tabs[this._terminal.x] : 3 === t && (this._terminal.tabs = {})
            }, e.prototype.setMode = function (e) {
                if (e.length > 1)
                    for (var t = 0; t < e.length; t++) this.setMode([e[t]]);
                else if (this._terminal.prefix) {
                    if ("?" === this._terminal.prefix) switch (e[0]) {
                        case 1:
                            this._terminal.applicationCursor = !0;
                            break;
                        case 2:
                            this._terminal.setgCharset(0, o.DEFAULT_CHARSET), this._terminal.setgCharset(1, o.DEFAULT_CHARSET), this._terminal.setgCharset(2, o.DEFAULT_CHARSET), this._terminal.setgCharset(3, o.DEFAULT_CHARSET);
                            break;
                        case 3:
                            this._terminal.savedCols = this._terminal.cols, this._terminal.resize(132, this._terminal.rows);
                            break;
                        case 6:
                            this._terminal.originMode = !0;
                            break;
                        case 7:
                            this._terminal.wraparoundMode = !0;
                            break;
                        case 12:
                            break;
                        case 66:
                            this._terminal.log("Serial port requested application keypad."), this._terminal.applicationKeypad = !0, this._terminal.viewport.syncScrollArea();
                            break;
                        case 9:
                        case 1e3:
                        case 1002:
                        case 1003:
                            this._terminal.x10Mouse = 9 === e[0], this._terminal.vt200Mouse = 1e3 === e[0], this._terminal.normalMouse = e[0] > 1e3, this._terminal.mouseEvents = !0, this._terminal.element.classList.add("enable-mouse-events"), this._terminal.selectionManager.disable(), this._terminal.log("Binding to mouse events.");
                            break;
                        case 1004:
                            this._terminal.sendFocus = !0;
                            break;
                        case 1005:
                            this._terminal.utfMouse = !0;
                            break;
                        case 1006:
                            this._terminal.sgrMouse = !0;
                            break;
                        case 1015:
                            this._terminal.urxvtMouse = !0;
                            break;
                        case 25:
                            this._terminal.cursorHidden = !1;
                            break;
                        case 1049:
                        case 47:
                        case 1047:
                            if (!this._terminal.normal) {
                                var r = {
                                    lines: this._terminal.lines,
                                    ybase: this._terminal.ybase,
                                    ydisp: this._terminal.ydisp,
                                    x: this._terminal.x,
                                    y: this._terminal.y,
                                    scrollTop: this._terminal.scrollTop,
                                    scrollBottom: this._terminal.scrollBottom,
                                    tabs: this._terminal.tabs
                                };
                                this._terminal.reset(), this._terminal.viewport.syncScrollArea(), this._terminal.normal = r, this._terminal.showCursor()
                            }
                    }
                } else switch (e[0]) {
                    case 4:
                        this._terminal.insertMode = !0
                }
            }, e.prototype.resetMode = function (e) {
                if (e.length > 1)
                    for (var t = 0; t < e.length; t++) this.resetMode([e[t]]);
                else if (this._terminal.prefix) {
                    if ("?" === this._terminal.prefix) switch (e[0]) {
                        case 1:
                            this._terminal.applicationCursor = !1;
                            break;
                        case 3:
                            132 === this._terminal.cols && this._terminal.savedCols && this._terminal.resize(this._terminal.savedCols, this._terminal.rows), delete this._terminal.savedCols;
                            break;
                        case 6:
                            this._terminal.originMode = !1;
                            break;
                        case 7:
                            this._terminal.wraparoundMode = !1;
                            break;
                        case 12:
                            break;
                        case 66:
                            this._terminal.log("Switching back to normal keypad."), this._terminal.applicationKeypad = !1, this._terminal.viewport.syncScrollArea();
                            break;
                        case 9:
                        case 1e3:
                        case 1002:
                        case 1003:
                            this._terminal.x10Mouse = !1, this._terminal.vt200Mouse = !1, this._terminal.normalMouse = !1, this._terminal.mouseEvents = !1, this._terminal.element.classList.remove("enable-mouse-events"), this._terminal.selectionManager.enable();
                            break;
                        case 1004:
                            this._terminal.sendFocus = !1;
                            break;
                        case 1005:
                            this._terminal.utfMouse = !1;
                            break;
                        case 1006:
                            this._terminal.sgrMouse = !1;
                            break;
                        case 1015:
                            this._terminal.urxvtMouse = !1;
                            break;
                        case 25:
                            this._terminal.cursorHidden = !0;
                            break;
                        case 1049:
                        case 47:
                        case 1047:
                            this._terminal.normal && (this._terminal.lines = this._terminal.normal.lines, this._terminal.ybase = this._terminal.normal.ybase, this._terminal.ydisp = this._terminal.normal.ydisp, this._terminal.x = this._terminal.normal.x, this._terminal.y = this._terminal.normal.y, this._terminal.scrollTop = this._terminal.normal.scrollTop, this._terminal.scrollBottom = this._terminal.normal.scrollBottom, this._terminal.tabs = this._terminal.normal.tabs, this._terminal.normal = null, this._terminal.selectionManager.setBuffer(this._terminal.lines), this._terminal.refresh(0, this._terminal.rows - 1), this._terminal.viewport.syncScrollArea(), this._terminal.showCursor())
                    }
                } else switch (e[0]) {
                    case 4:
                        this._terminal.insertMode = !1
                }
            }, e.prototype.charAttributes = function (e) {
                if (1 !== e.length || 0 !== e[0]) {
                    for (var t, r = e.length, i = 0, o = this._terminal.curAttr >> 18, s = this._terminal.curAttr >> 9 & 511, n = 511 & this._terminal.curAttr; i < r; i++)(t = e[i]) >= 30 && t <= 37 ? s = t - 30 : t >= 40 && t <= 47 ? n = t - 40 : t >= 90 && t <= 97 ? s = (t += 8) - 90 : t >= 100 && t <= 107 ? n = (t += 8) - 100 : 0 === t ? (o = this._terminal.defAttr >> 18, s = this._terminal.defAttr >> 9 & 511, n = 511 & this._terminal.defAttr) : 1 === t ? o |= 1 : 4 === t ? o |= 2 : 5 === t ? o |= 4 : 7 === t ? o |= 8 : 8 === t ? o |= 16 : 22 === t ? o &= -2 : 24 === t ? o &= -3 : 25 === t ? o &= -5 : 27 === t ? o &= -9 : 28 === t ? o &= -17 : 39 === t ? s = this._terminal.defAttr >> 9 & 511 : 49 === t ? n = 511 & this._terminal.defAttr : 38 === t ? 2 === e[i + 1] ? (i += 2, -1 === (s = this._terminal.matchColor(255 & e[i], 255 & e[i + 1], 255 & e[i + 2])) && (s = 511), i += 2) : 5 === e[i + 1] && (s = t = 255 & e[i += 2]) : 48 === t ? 2 === e[i + 1] ? (i += 2, -1 === (n = this._terminal.matchColor(255 & e[i], 255 & e[i + 1], 255 & e[i + 2])) && (n = 511), i += 2) : 5 === e[i + 1] && (n = t = 255 & e[i += 2]) : 100 === t ? (s = this._terminal.defAttr >> 9 & 511, n = 511 & this._terminal.defAttr) : this._terminal.error("Unknown SGR attribute: %d.", t);
                    this._terminal.curAttr = o << 18 | s << 9 | n
                } else this._terminal.curAttr = this._terminal.defAttr
            }, e.prototype.deviceStatus = function (e) {
                if (this._terminal.prefix) {
                    if ("?" === this._terminal.prefix) switch (e[0]) {
                        case 6:
                            this._terminal.send(i.C0.ESC + "[?" + (this._terminal.y + 1) + ";" + (this._terminal.x + 1) + "R")
                    }
                } else switch (e[0]) {
                    case 5:
                        this._terminal.send(i.C0.ESC + "[0n");
                        break;
                    case 6:
                        this._terminal.send(i.C0.ESC + "[" + (this._terminal.y + 1) + ";" + (this._terminal.x + 1) + "R")
                }
            }, e.prototype.softReset = function (e) {
                this._terminal.cursorHidden = !1, this._terminal.insertMode = !1, this._terminal.originMode = !1, this._terminal.wraparoundMode = !0, this._terminal.applicationKeypad = !1, this._terminal.viewport.syncScrollArea(), this._terminal.applicationCursor = !1, this._terminal.scrollTop = 0, this._terminal.scrollBottom = this._terminal.rows - 1, this._terminal.curAttr = this._terminal.defAttr, this._terminal.x = this._terminal.y = 0, this._terminal.charset = null, this._terminal.glevel = 0, this._terminal.charsets = [null]
            }, e.prototype.setCursorStyle = function (e) {
                var t = e[0] < 1 ? 1 : e[0];
                switch (t) {
                    case 1:
                    case 2:
                        this._terminal.setOption("cursorStyle", "block");
                        break;
                    case 3:
                    case 4:
                        this._terminal.setOption("cursorStyle", "underline");
                        break;
                    case 5:
                    case 6:
                        this._terminal.setOption("cursorStyle", "bar")
                }
                var r = t % 2 == 1;
                this._terminal.setOption("cursorBlink", r)
            }, e.prototype.setScrollRegion = function (e) {
                this._terminal.prefix || (this._terminal.scrollTop = (e[0] || 1) - 1, this._terminal.scrollBottom = (e[1] && e[1] <= this._terminal.rows ? e[1] : this._terminal.rows) - 1, this._terminal.x = 0, this._terminal.y = 0)
            }, e.prototype.saveCursor = function (e) {
                this._terminal.savedX = this._terminal.x, this._terminal.savedY = this._terminal.y
            }, e.prototype.restoreCursor = function (e) {
                this._terminal.x = this._terminal.savedX || 0, this._terminal.y = this._terminal.savedY || 0
            }, e
        }();
    t.InputHandler = s;
    var n = function (e) {
        function t(e) {
            var t, r = 0,
                o = i.length - 1;
            if (e < i[0][0] || e > i[o][1]) return !1;
            for (; o >= r;)
                if (t = Math.floor((r + o) / 2), e > i[t][1]) r = t + 1;
                else {
                    if (!(e < i[t][0])) return !0;
                    o = t - 1
                }
            return !1
        }

        function r(e) {
            return e >= 4352 && (e <= 4447 || 9001 === e || 9002 === e || e >= 11904 && e <= 42191 && 12351 !== e || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65135 || e >= 65280 && e <= 65376 || e >= 65504 && e <= 65510 || e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141)
        }
        var i = [
            [768, 879],
            [1155, 1158],
            [1160, 1161],
            [1425, 1469],
            [1471, 1471],
            [1473, 1474],
            [1476, 1477],
            [1479, 1479],
            [1536, 1539],
            [1552, 1557],
            [1611, 1630],
            [1648, 1648],
            [1750, 1764],
            [1767, 1768],
            [1770, 1773],
            [1807, 1807],
            [1809, 1809],
            [1840, 1866],
            [1958, 1968],
            [2027, 2035],
            [2305, 2306],
            [2364, 2364],
            [2369, 2376],
            [2381, 2381],
            [2385, 2388],
            [2402, 2403],
            [2433, 2433],
            [2492, 2492],
            [2497, 2500],
            [2509, 2509],
            [2530, 2531],
            [2561, 2562],
            [2620, 2620],
            [2625, 2626],
            [2631, 2632],
            [2635, 2637],
            [2672, 2673],
            [2689, 2690],
            [2748, 2748],
            [2753, 2757],
            [2759, 2760],
            [2765, 2765],
            [2786, 2787],
            [2817, 2817],
            [2876, 2876],
            [2879, 2879],
            [2881, 2883],
            [2893, 2893],
            [2902, 2902],
            [2946, 2946],
            [3008, 3008],
            [3021, 3021],
            [3134, 3136],
            [3142, 3144],
            [3146, 3149],
            [3157, 3158],
            [3260, 3260],
            [3263, 3263],
            [3270, 3270],
            [3276, 3277],
            [3298, 3299],
            [3393, 3395],
            [3405, 3405],
            [3530, 3530],
            [3538, 3540],
            [3542, 3542],
            [3633, 3633],
            [3636, 3642],
            [3655, 3662],
            [3761, 3761],
            [3764, 3769],
            [3771, 3772],
            [3784, 3789],
            [3864, 3865],
            [3893, 3893],
            [3895, 3895],
            [3897, 3897],
            [3953, 3966],
            [3968, 3972],
            [3974, 3975],
            [3984, 3991],
            [3993, 4028],
            [4038, 4038],
            [4141, 4144],
            [4146, 4146],
            [4150, 4151],
            [4153, 4153],
            [4184, 4185],
            [4448, 4607],
            [4959, 4959],
            [5906, 5908],
            [5938, 5940],
            [5970, 5971],
            [6002, 6003],
            [6068, 6069],
            [6071, 6077],
            [6086, 6086],
            [6089, 6099],
            [6109, 6109],
            [6155, 6157],
            [6313, 6313],
            [6432, 6434],
            [6439, 6440],
            [6450, 6450],
            [6457, 6459],
            [6679, 6680],
            [6912, 6915],
            [6964, 6964],
            [6966, 6970],
            [6972, 6972],
            [6978, 6978],
            [7019, 7027],
            [7616, 7626],
            [7678, 7679],
            [8203, 8207],
            [8234, 8238],
            [8288, 8291],
            [8298, 8303],
            [8400, 8431],
            [12330, 12335],
            [12441, 12442],
            [43014, 43014],
            [43019, 43019],
            [43045, 43046],
            [64286, 64286],
            [65024, 65039],
            [65056, 65059],
            [65279, 65279],
            [65529, 65531],
            [68097, 68099],
            [68101, 68102],
            [68108, 68111],
            [68152, 68154],
            [68159, 68159],
            [119143, 119145],
            [119155, 119170],
            [119173, 119179],
            [119210, 119213],
            [119362, 119364],
            [917505, 917505],
            [917536, 917631],
            [917760, 917999]
        ];
        return function (i) {
            return 0 === i ? e.nul : i < 32 || i >= 127 && i < 160 ? e.control : t(i) ? 0 : r(i) ? 2 : 1
        }
    }({
        nul: 0,
        control: 0
    })
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = new RegExp("(?:^|[^\\da-z\\.-]+)((https?:\\/\\/)((([\\da-z\\.-]+)\\.([a-z\\.]{2,6}))|((\\d{1,3}\\.){3}\\d{1,3})|(localhost))(:\\d{1,5})?(\\/[\\/\\w\\.\\-%~]*)*(\\?[0-9\\w\\[\\]\\(\\)\\/\\?\\!#@$%&'*+,:;~\\=\\.\\-]*)?(#[0-9\\w\\[\\]\\(\\)\\/\\?\\!#@$%&'*+,:;~\\=\\.\\-]*)?)($|[^\\/\\w\\.\\-%]+)"),
        o = 0,
        s = function () {
            function e() {
                this._nextLinkMatcherId = o, this._rowTimeoutIds = [], this._linkMatchers = [], this.registerLinkMatcher(i, null, {
                    matchIndex: 1
                })
            }
            return e.prototype.attachToDom = function (e, t) {
                this._document = e, this._rows = t
            }, e.prototype.linkifyRow = function (t) {
                if (this._document) {
                    var r = this._rowTimeoutIds[t];
                    r && clearTimeout(r), this._rowTimeoutIds[t] = setTimeout(this._linkifyRow.bind(this, t), e.TIME_BEFORE_LINKIFY)
                }
            }, e.prototype.setHypertextLinkHandler = function (e) {
                this._linkMatchers[o].handler = e
            }, e.prototype.setHypertextValidationCallback = function (e) {
                this._linkMatchers[o].validationCallback = e
            }, e.prototype.registerLinkMatcher = function (e, t, r) {
                if (void 0 === r && (r = {}), this._nextLinkMatcherId !== o && !t) throw new Error("handler must be defined");
                var i = {
                    id: this._nextLinkMatcherId++,
                    regex: e,
                    handler: t,
                    matchIndex: r.matchIndex,
                    validationCallback: r.validationCallback,
                    priority: r.priority || 0
                };
                return this._addLinkMatcherToList(i), i.id
            }, e.prototype._addLinkMatcherToList = function (e) {
                if (0 !== this._linkMatchers.length) {
                    for (var t = this._linkMatchers.length - 1; t >= 0; t--)
                        if (e.priority <= this._linkMatchers[t].priority) return void this._linkMatchers.splice(t + 1, 0, e);
                    this._linkMatchers.splice(0, 0, e)
                } else this._linkMatchers.push(e)
            }, e.prototype.deregisterLinkMatcher = function (e) {
                for (var t = 1; t < this._linkMatchers.length; t++)
                    if (this._linkMatchers[t].id === e) return this._linkMatchers.splice(t, 1), !0;
                return !1
            }, e.prototype._linkifyRow = function (e) {
                var t = this._rows[e];
                if (t) {
                    t.textContent;
                    for (var r = 0; r < this._linkMatchers.length; r++) {
                        var i = this._linkMatchers[r],
                            o = this._doLinkifyRow(t, i);
                        if (o.length > 0) {
                            if (i.validationCallback)
                                for (var s = function (e) {
                                        var t = o[e];
                                        i.validationCallback(t.textContent, t, function (e) {
                                            e || t.classList.add("xterm-invalid-link")
                                        })
                                    }, n = 0; n < o.length; n++) s(n);
                            return
                        }
                    }
                }
            }, e.prototype._doLinkifyRow = function (e, t) {
                var r = [],
                    i = t.id === o,
                    s = e.childNodes,
                    n = e.textContent.match(t.regex);
                if (!n || 0 === n.length) return r;
                for (var a = n["number" != typeof t.matchIndex ? 0 : t.matchIndex], l = n.index + a.length, h = 0; h < s.length; h++) {
                    var c = s[h],
                        u = c.textContent.indexOf(a);
                    if (u >= 0) {
                        var d = this._createAnchorElement(a, t.handler, i);
                        if (c.textContent.length === a.length)
                            if (3 === c.nodeType) this._replaceNode(c, d);
                            else {
                                var p = c;
                                if ("A" === p.nodeName) return r;
                                p.innerHTML = "", p.appendChild(d)
                            }
                        else if (c.childNodes.length > 1)
                            for (var f = 0; f < c.childNodes.length; f++) {
                                var g = c.childNodes[f],
                                    m = g.textContent.indexOf(a);
                                if (-1 !== m) {
                                    this._replaceNodeSubstringWithNode(g, d, a, m);
                                    break
                                }
                            } else h += this._replaceNodeSubstringWithNode(c, d, a, u);
                        if (r.push(d), !(n = e.textContent.substring(l).match(t.regex)) || 0 === n.length) return r;
                        a = n["number" != typeof t.matchIndex ? 0 : t.matchIndex], l += n.index + a.length
                    }
                }
                return r
            }, e.prototype._createAnchorElement = function (e, t, r) {
                var i = this._document.createElement("a");
                return i.textContent = e, i.draggable = !1, r ? (i.href = e, i.target = "_blank", i.addEventListener("click", function (r) {
                    if (t) return t(r, e)
                })) : i.addEventListener("click", function (r) {
                    if (!i.classList.contains("xterm-invalid-link")) return t(r, e)
                }), i
            }, e.prototype._replaceNode = function (e) {
                for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                for (var i = e.parentNode, o = 0; o < t.length; o++) i.insertBefore(t[o], e);
                i.removeChild(e)
            }, e.prototype._replaceNodeSubstringWithNode = function (e, t, r, i) {
                if (1 === e.childNodes.length && (e = e.childNodes[0]), 3 !== e.nodeType) throw new Error("targetNode must be a text node or only contain a single text node");
                var o = e.textContent;
                if (0 === i) {
                    var s = o.substring(r.length),
                        n = this._document.createTextNode(s);
                    return this._replaceNode(e, t, n), 0
                }
                if (i === e.textContent.length - r.length) {
                    var a = o.substring(0, i),
                        l = this._document.createTextNode(a);
                    return this._replaceNode(e, l, t), 0
                }
                var h = o.substring(0, i),
                    c = this._document.createTextNode(h),
                    u = o.substring(i + r.length),
                    d = this._document.createTextNode(u);
                return this._replaceNode(e, c, t, d), 1
            }, e
        }();
    s.TIME_BEFORE_LINKIFY = 200, t.Linkifier = s
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = r(2),
        o = r(4),
        s = {};
    s[i.C0.BEL] = function (e, t) {
        return t.bell()
    }, s[i.C0.LF] = function (e, t) {
        return t.lineFeed()
    }, s[i.C0.VT] = s[i.C0.LF], s[i.C0.FF] = s[i.C0.LF], s[i.C0.CR] = function (e, t) {
        return t.carriageReturn()
    }, s[i.C0.BS] = function (e, t) {
        return t.backspace()
    }, s[i.C0.HT] = function (e, t) {
        return t.tab()
    }, s[i.C0.SO] = function (e, t) {
        return t.shiftOut()
    }, s[i.C0.SI] = function (e, t) {
        return t.shiftIn()
    }, s[i.C0.ESC] = function (e, t) {
        return e.setState(h.ESCAPED)
    };
    var n = {};
    n["["] = function (e, t) {
        t.params = [], t.currentParam = 0, e.setState(h.CSI_PARAM)
    }, n["]"] = function (e, t) {
        t.params = [], t.currentParam = 0, e.setState(h.OSC)
    }, n.P = function (e, t) {
        t.params = [], t.currentParam = 0, e.setState(h.DCS)
    }, n._ = function (e, t) {
        e.setState(h.IGNORE)
    }, n["^"] = function (e, t) {
        e.setState(h.IGNORE)
    }, n.c = function (e, t) {
        t.reset()
    }, n.E = function (e, t) {
        t.x = 0, t.index(), e.setState(h.NORMAL)
    }, n.D = function (e, t) {
        t.index(), e.setState(h.NORMAL)
    }, n.M = function (e, t) {
        t.reverseIndex(), e.setState(h.NORMAL)
    }, n["%"] = function (e, t) {
        t.setgLevel(0), t.setgCharset(0, o.DEFAULT_CHARSET), e.setState(h.NORMAL), e.skipNextChar()
    }, n[i.C0.CAN] = function (e) {
        return e.setState(h.NORMAL)
    };
    var a = {};
    a["?"] = function (e) {
        return e.setPrefix("?")
    }, a[">"] = function (e) {
        return e.setPrefix(">")
    }, a["!"] = function (e) {
        return e.setPrefix("!")
    }, a[0] = function (e) {
        return e.setParam(10 * e.getParam())
    }, a[1] = function (e) {
        return e.setParam(10 * e.getParam() + 1)
    }, a[2] = function (e) {
        return e.setParam(10 * e.getParam() + 2)
    }, a[3] = function (e) {
        return e.setParam(10 * e.getParam() + 3)
    }, a[4] = function (e) {
        return e.setParam(10 * e.getParam() + 4)
    }, a[5] = function (e) {
        return e.setParam(10 * e.getParam() + 5)
    }, a[6] = function (e) {
        return e.setParam(10 * e.getParam() + 6)
    }, a[7] = function (e) {
        return e.setParam(10 * e.getParam() + 7)
    }, a[8] = function (e) {
        return e.setParam(10 * e.getParam() + 8)
    }, a[9] = function (e) {
        return e.setParam(10 * e.getParam() + 9)
    }, a.$ = function (e) {
        return e.setPostfix("$")
    }, a['"'] = function (e) {
        return e.setPostfix('"')
    }, a[" "] = function (e) {
        return e.setPostfix(" ")
    }, a["'"] = function (e) {
        return e.setPostfix("'")
    }, a[";"] = function (e) {
        return e.finalizeParam()
    }, a[i.C0.CAN] = function (e) {
        return e.setState(h.NORMAL)
    };
    var l = {};
    l["@"] = function (e, t, r) {
        return e.insertChars(t)
    }, l.A = function (e, t, r) {
        return e.cursorUp(t)
    }, l.B = function (e, t, r) {
        return e.cursorDown(t)
    }, l.C = function (e, t, r) {
        return e.cursorForward(t)
    }, l.D = function (e, t, r) {
        return e.cursorBackward(t)
    }, l.E = function (e, t, r) {
        return e.cursorNextLine(t)
    }, l.F = function (e, t, r) {
        return e.cursorPrecedingLine(t)
    }, l.G = function (e, t, r) {
        return e.cursorCharAbsolute(t)
    }, l.H = function (e, t, r) {
        return e.cursorPosition(t)
    }, l.I = function (e, t, r) {
        return e.cursorForwardTab(t)
    }, l.J = function (e, t, r) {
        return e.eraseInDisplay(t)
    }, l.K = function (e, t, r) {
        return e.eraseInLine(t)
    }, l.L = function (e, t, r) {
        return e.insertLines(t)
    }, l.M = function (e, t, r) {
        return e.deleteLines(t)
    }, l.P = function (e, t, r) {
        return e.deleteChars(t)
    }, l.S = function (e, t, r) {
        return e.scrollUp(t)
    }, l.T = function (e, t, r) {
        t.length < 2 && !r && e.scrollDown(t)
    }, l.X = function (e, t, r) {
        return e.eraseChars(t)
    }, l.Z = function (e, t, r) {
        return e.cursorBackwardTab(t)
    }, l["`"] = function (e, t, r) {
        return e.charPosAbsolute(t)
    }, l.a = function (e, t, r) {
        return e.HPositionRelative(t)
    }, l.b = function (e, t, r) {
        return e.repeatPrecedingCharacter(t)
    }, l.c = function (e, t, r) {
        return e.sendDeviceAttributes(t)
    }, l.d = function (e, t, r) {
        return e.linePosAbsolute(t)
    }, l.e = function (e, t, r) {
        return e.VPositionRelative(t)
    }, l.f = function (e, t, r) {
        return e.HVPosition(t)
    }, l.g = function (e, t, r) {
        return e.tabClear(t)
    }, l.h = function (e, t, r) {
        return e.setMode(t)
    }, l.l = function (e, t, r) {
        return e.resetMode(t)
    }, l.m = function (e, t, r) {
        return e.charAttributes(t)
    }, l.n = function (e, t, r) {
        return e.deviceStatus(t)
    }, l.p = function (e, t, r) {
        switch (r) {
            case "!":
                e.softReset(t)
        }
    }, l.q = function (e, t, r, i) {
        " " === i && e.setCursorStyle(t)
    }, l.r = function (e, t) {
        return e.setScrollRegion(t)
    }, l.s = function (e, t) {
        return e.saveCursor(t)
    }, l.u = function (e, t) {
        return e.restoreCursor(t)
    }, l[i.C0.CAN] = function (e, t, r, i, o) {
        return o.setState(h.NORMAL)
    };
    var h;
    ! function (e) {
        e[e.NORMAL = 0] = "NORMAL", e[e.ESCAPED = 1] = "ESCAPED", e[e.CSI_PARAM = 2] = "CSI_PARAM", e[e.CSI = 3] = "CSI", e[e.OSC = 4] = "OSC", e[e.CHARSET = 5] = "CHARSET", e[e.DCS = 6] = "DCS", e[e.IGNORE = 7] = "IGNORE"
    }(h || (h = {}));
    var c = function () {
        function e(e, t) {
            this._inputHandler = e, this._terminal = t, this._state = h.NORMAL
        }
        return e.prototype.parse = function (e) {
            var t, r, c, u, d = e.length;
            for (this._position = 0, this._terminal.surrogate_high && (e = this._terminal.surrogate_high + e, this._terminal.surrogate_high = ""); this._position < d; this._position++) {
                if (r = e[this._position], 55296 <= (c = e.charCodeAt(this._position)) && c <= 56319) {
                    if (u = e.charCodeAt(this._position + 1), isNaN(u)) {
                        this._terminal.surrogate_high = r;
                        continue
                    }
                    c = 1024 * (c - 55296) + (u - 56320) + 65536, r += e.charAt(this._position + 1)
                }
                if (!(56320 <= c && c <= 57343)) switch (this._state) {
                    case h.NORMAL:
                        r in s ? s[r](this, this._inputHandler) : this._inputHandler.addChar(r, c);
                        break;
                    case h.ESCAPED:
                        if (r in n) {
                            n[r](this, this._terminal);
                            break
                        }
                        switch (r) {
                            case "(":
                            case ")":
                            case "*":
                            case "+":
                            case "-":
                            case ".":
                                switch (r) {
                                    case "(":
                                        this._terminal.gcharset = 0;
                                        break;
                                    case ")":
                                        this._terminal.gcharset = 1;
                                        break;
                                    case "*":
                                        this._terminal.gcharset = 2;
                                        break;
                                    case "+":
                                        this._terminal.gcharset = 3;
                                        break;
                                    case "-":
                                        this._terminal.gcharset = 1;
                                        break;
                                    case ".":
                                        this._terminal.gcharset = 2
                                }
                                this._state = h.CHARSET;
                                break;
                            case "/":
                                this._terminal.gcharset = 3, this._state = h.CHARSET, this._position--;
                                break;
                            case "N":
                            case "O":
                                break;
                            case "n":
                                this._terminal.setgLevel(2);
                                break;
                            case "o":
                            case "|":
                                this._terminal.setgLevel(3);
                                break;
                            case "}":
                                this._terminal.setgLevel(2);
                                break;
                            case "~":
                                this._terminal.setgLevel(1);
                                break;
                            case "7":
                                this._inputHandler.saveCursor(), this._state = h.NORMAL;
                                break;
                            case "8":
                                this._inputHandler.restoreCursor(), this._state = h.NORMAL;
                                break;
                            case "#":
                                this._state = h.NORMAL, this._position++;
                                break;
                            case "H":
                                this._terminal.tabSet(), this._state = h.NORMAL;
                                break;
                            case "=":
                                this._terminal.log("Serial port requested application keypad."), this._terminal.applicationKeypad = !0, this._terminal.viewport.syncScrollArea(), this._state = h.NORMAL;
                                break;
                            case ">":
                                this._terminal.log("Switching back to normal keypad."), this._terminal.applicationKeypad = !1, this._terminal.viewport.syncScrollArea(), this._state = h.NORMAL;
                                break;
                            default:
                                this._state = h.NORMAL, this._terminal.error("Unknown ESC control: %s.", r)
                        }
                        break;
                    case h.CHARSET:
                        r in o.CHARSETS ? (t = o.CHARSETS[r], "/" === r && this.skipNextChar()) : t = o.DEFAULT_CHARSET, this._terminal.setgCharset(this._terminal.gcharset, t), this._terminal.gcharset = null, this._state = h.NORMAL;
                        break;
                    case h.OSC:
                        if (r === i.C0.ESC || r === i.C0.BEL) {
                            switch (r === i.C0.ESC && this._position++, this._terminal.params.push(this._terminal.currentParam), this._terminal.params[0]) {
                                case 0:
                                case 1:
                                case 2:
                                    this._terminal.params[1] && (this._terminal.title = this._terminal.params[1], this._terminal.handleTitle(this._terminal.title))
                            }
                            this._terminal.params = [], this._terminal.currentParam = 0, this._state = h.NORMAL
                        } else this._terminal.params.length ? this._terminal.currentParam += r : r >= "0" && r <= "9" ? this._terminal.currentParam = 10 * this._terminal.currentParam + r.charCodeAt(0) - 48 : ";" === r && (this._terminal.params.push(this._terminal.currentParam), this._terminal.currentParam = "");
                        break;
                    case h.CSI_PARAM:
                        if (r in a) {
                            a[r](this);
                            break
                        }
                        this.finalizeParam(), this._state = h.CSI;
                    case h.CSI:
                        r in l ? l[r](this._inputHandler, this._terminal.params, this._terminal.prefix, this._terminal.postfix, this) : this._terminal.error("Unknown CSI code: %s.", r), this._state = h.NORMAL, this._terminal.prefix = "", this._terminal.postfix = "";
                        break;
                    case h.DCS:
                        if (r === i.C0.ESC || r === i.C0.BEL) {
                            r === i.C0.ESC && this._position++;
                            var p = void 0,
                                f = void 0;
                            switch (this._terminal.prefix) {
                                case "":
                                    break;
                                case "$q":
                                    switch (p = this._terminal.currentParam, f = !1, p) {
                                        case '"q':
                                            p = '0"q';
                                            break;
                                        case '"p':
                                            p = '61"p';
                                            break;
                                        case "r":
                                            p = this._terminal.scrollTop + 1 + ";" + (this._terminal.scrollBottom + 1) + "r";
                                            break;
                                        case "m":
                                            p = "0m";
                                            break;
                                        default:
                                            this._terminal.error("Unknown DCS Pt: %s.", p), p = ""
                                    }
                                    this._terminal.send(i.C0.ESC + "P" + +f + "$r" + p + i.C0.ESC + "\\");
                                    break;
                                case "+p":
                                    break;
                                case "+q":
                                    p = this._terminal.currentParam, f = !1, this._terminal.send(i.C0.ESC + "P" + +f + "+r" + p + i.C0.ESC + "\\");
                                    break;
                                default:
                                    this._terminal.error("Unknown DCS prefix: %s.", this._terminal.prefix)
                            }
                            this._terminal.currentParam = 0, this._terminal.prefix = "", this._state = h.NORMAL
                        } else this._terminal.currentParam ? this._terminal.currentParam += r : this._terminal.prefix || "$" === r || "+" === r ? 2 === this._terminal.prefix.length ? this._terminal.currentParam = r : this._terminal.prefix += r : this._terminal.currentParam = r;
                        break;
                    case h.IGNORE:
                        r !== i.C0.ESC && r !== i.C0.BEL || (r === i.C0.ESC && this._position++, this._state = h.NORMAL)
                }
            }
            return this._state
        }, e.prototype.setState = function (e) {
            this._state = e
        }, e.prototype.setPrefix = function (e) {
            this._terminal.prefix = e
        }, e.prototype.setPostfix = function (e) {
            this._terminal.postfix = e
        }, e.prototype.setParam = function (e) {
            this._terminal.currentParam = e
        }, e.prototype.getParam = function () {
            return this._terminal.currentParam
        }, e.prototype.finalizeParam = function () {
            this._terminal.params.push(this._terminal.currentParam), this._terminal.currentParam = 0
        }, e.prototype.skipNextChar = function () {
            this._position++
        }, e
    }();
    t.Parser = c
}, function (e, t, r) {
    "use strict";

    function i(e) {
        var t = e.ownerDocument.createElement("span");
        t.innerHTML = "hello world", e.appendChild(t);
        var r = t.offsetWidth,
            i = t.offsetHeight;
        t.style.fontWeight = "bold";
        var o = t.offsetWidth,
            s = t.offsetHeight;
        return e.removeChild(t), r !== o || i !== s
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o, s = r(26);
    ! function (e) {
        e[e.BOLD = 1] = "BOLD", e[e.UNDERLINE = 2] = "UNDERLINE", e[e.BLINK = 4] = "BLINK", e[e.INVERSE = 8] = "INVERSE", e[e.INVISIBLE = 16] = "INVISIBLE"
    }(o || (o = {}));
    var n = null,
        a = function () {
            function e(e) {
                this._terminal = e, this._refreshRowsQueue = [], this._refreshFramesSkipped = 0, this._refreshAnimationFrame = null, this._spanElementObjectPool = new s.DomElementObjectPool("span"), null === n && (n = i(this._terminal.element)), this._spanElementObjectPool = new s.DomElementObjectPool("span")
            }
            return e.prototype.queueRefresh = function (e, t) {
                this._refreshRowsQueue.push({
                    start: e,
                    end: t
                }), this._refreshAnimationFrame || (this._refreshAnimationFrame = window.requestAnimationFrame(this._refreshLoop.bind(this)))
            }, e.prototype._refreshLoop = function () {
                if (this._terminal.writeBuffer.length > 0 && this._refreshFramesSkipped++ <= 5) this._refreshAnimationFrame = window.requestAnimationFrame(this._refreshLoop.bind(this));
                else {
                    this._refreshFramesSkipped = 0;
                    var e, t;
                    if (this._refreshRowsQueue.length > 4) e = 0, t = this._terminal.rows - 1;
                    else {
                        e = this._refreshRowsQueue[0].start, t = this._refreshRowsQueue[0].end;
                        for (var r = 1; r < this._refreshRowsQueue.length; r++) this._refreshRowsQueue[r].start < e && (e = this._refreshRowsQueue[r].start), this._refreshRowsQueue[r].end > t && (t = this._refreshRowsQueue[r].end)
                    }
                    this._refreshRowsQueue = [], this._refreshAnimationFrame = null, this._refresh(e, t)
                }
            }, e.prototype._refresh = function (e, t) {
                var r;
                t - e >= this._terminal.rows / 2 && (r = this._terminal.element.parentNode) && this._terminal.element.removeChild(this._terminal.rowContainer);
                var i = this._terminal.cols,
                    s = e;
                for (t >= this._terminal.rows && (this._terminal.log("`end` is too large. Most likely a bad CSR."), t = this._terminal.rows - 1); s <= t; s++) {
                    var a = s + this._terminal.ydisp,
                        l = this._terminal.lines.get(a),
                        h = void 0;
                    h = this._terminal.y === s - (this._terminal.ybase - this._terminal.ydisp) && this._terminal.cursorState && !this._terminal.cursorHidden ? this._terminal.x : -1;
                    for (var c = this._terminal.defAttr, u = document.createDocumentFragment(), d = "", p = void 0; this._terminal.children[s].children.length;) {
                        var f = this._terminal.children[s].children[0];
                        this._terminal.children[s].removeChild(f), this._spanElementObjectPool.release(f)
                    }
                    for (var g = 0; g < i; g++) {
                        var m = l[g][0],
                            y = l[g][1],
                            b = l[g][2];
                        if (b) {
                            if (g === h && (m = -1), m !== c && (c !== this._terminal.defAttr && (d && (p.innerHTML = d, d = ""), u.appendChild(p), p = null), m !== this._terminal.defAttr))
                                if (d && !p && (p = this._spanElementObjectPool.acquire()), p && (d && (p.innerHTML = d, d = ""), u.appendChild(p)), p = this._spanElementObjectPool.acquire(), -1 === m) p.classList.add("reverse-video"), p.classList.add("terminal-cursor");
                                else {
                                    var _ = 511 & m,
                                        C = m >> 9 & 511,
                                        w = m >> 18;
                                    if (w & o.BOLD && (n || p.classList.add("xterm-bold"), C < 8 && (C += 8)), w & o.UNDERLINE && p.classList.add("xterm-underline"), w & o.BLINK && p.classList.add("xterm-blink"), w & o.INVERSE) {
                                        var S = _;
                                        _ = C, C = S, 1 & w && C < 8 && (C += 8)
                                    }
                                    w & o.INVISIBLE && p.classList.add("xterm-hidden"), w & o.INVERSE && (257 === _ && (_ = 15), 256 === C && (C = 0)), _ < 256 && p.classList.add("xterm-bg-color-" + _), C < 256 && p.classList.add("xterm-color-" + C)
                                }
                            if (2 === b) d += '<span class="xterm-wide-char">' + y + "</span>";
                            else if (y.charCodeAt(0) > 255) d += '<span class="xterm-normal-char">' + y + "</span>";
                            else switch (y) {
                                case "&":
                                    d += "&amp;";
                                    break;
                                case "<":
                                    d += "&lt;";
                                    break;
                                case ">":
                                    d += "&gt;";
                                    break;
                                default:
                                    d += y <= " " ? "&nbsp;" : y
                            }
                            c = m
                        }
                    }
                    d && !p && (p = this._spanElementObjectPool.acquire()), p && (d && (p.innerHTML = d, d = ""), u.appendChild(p), p = null), this._terminal.children[s].appendChild(u)
                }
                r && this._terminal.element.appendChild(this._terminal.rowContainer), this._terminal.emit("refresh", {
                    element: this._terminal.element,
                    start: e,
                    end: t
                })
            }, e.prototype.refreshSelection = function (e, t) {
                for (; this._terminal.selectionContainer.children.length;) this._terminal.selectionContainer.removeChild(this._terminal.selectionContainer.children[0]);
                if (e && t) {
                    var r = e[1] - this._terminal.ydisp,
                        i = t[1] - this._terminal.ydisp,
                        o = Math.max(r, 0),
                        s = Math.min(i, this._terminal.rows - 1);
                    if (!(o >= this._terminal.rows || s < 0)) {
                        var n = document.createDocumentFragment(),
                            a = r === o ? e[0] : 0,
                            l = o === s ? t[0] : this._terminal.cols;
                        n.appendChild(this._createSelectionElement(o, a, l));
                        var h = s - o - 1;
                        if (n.appendChild(this._createSelectionElement(o + 1, 0, this._terminal.cols, h)), o !== s) {
                            var c = i === s ? t[0] : this._terminal.cols;
                            n.appendChild(this._createSelectionElement(s, 0, c))
                        }
                        this._terminal.selectionContainer.appendChild(n)
                    }
                }
            }, e.prototype._createSelectionElement = function (e, t, r, i) {
                void 0 === i && (i = 1);
                var o = document.createElement("div");
                return o.style.height = i * this._terminal.charMeasure.height + "px", o.style.top = e * this._terminal.charMeasure.height + "px", o.style.left = t * this._terminal.charMeasure.width + "px", o.style.width = this._terminal.charMeasure.width * (r - t) + "px", o
            }, e
        }();
    t.Renderer = a
}, function (e, t, r) {
    "use strict";
    var i = this && this.__extends || function () {
        var e = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        };
        return function (t, r) {
            function i() {
                this.constructor = t
            }
            e(t, r), t.prototype = null === r ? Object.create(r) : (i.prototype = r.prototype, new i)
        }
    }();
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o, s = r(10),
        n = r(9),
        a = r(1),
        l = r(21),
        h = String.fromCharCode(160),
        c = new RegExp(h, "g");
    ! function (e) {
        e[e.NORMAL = 0] = "NORMAL", e[e.WORD = 1] = "WORD", e[e.LINE = 2] = "LINE"
    }(o || (o = {}));
    var u = function (e) {
        function t(t, r, i, s) {
            var n = e.call(this) || this;
            return n._terminal = t, n._buffer = r, n._rowContainer = i, n._charMeasure = s, n._initListeners(), n.enable(), n._model = new l.SelectionModel(t), n._lastMouseDownTime = 0, n._activeSelectionMode = o.NORMAL, n
        }
        return i(t, e), t.prototype._initListeners = function () {
            var e = this;
            this._bufferTrimListener = function (t) {
                return e._onTrim(t)
            }, this._mouseMoveListener = function (t) {
                return e._onMouseMove(t)
            }, this._mouseDownListener = function (t) {
                return e._onMouseDown(t)
            }, this._mouseUpListener = function (t) {
                return e._onMouseUp(t)
            }
        }, t.prototype.disable = function () {
            this.clearSelection(), this._buffer.off("trim", this._bufferTrimListener), this._rowContainer.removeEventListener("mousedown", this._mouseDownListener)
        }, t.prototype.enable = function () {
            this._buffer.on("trim", this._bufferTrimListener), this._rowContainer.addEventListener("mousedown", this._mouseDownListener)
        }, t.prototype.setBuffer = function (e) {
            this._buffer = e, this.clearSelection()
        }, Object.defineProperty(t.prototype, "hasSelection", {
            get: function () {
                var e = this._model.finalSelectionStart,
                    t = this._model.finalSelectionEnd;
                return !(!e || !t) && (e[0] !== t[0] || e[1] !== t[1])
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "selectionText", {
            get: function () {
                var e = this._model.finalSelectionStart,
                    t = this._model.finalSelectionEnd;
                if (!e || !t) return "";
                var r = e[1] === t[1] ? t[0] : null,
                    i = [];
                i.push(this._translateBufferLineToString(this._buffer.get(e[1]), !0, e[0], r));
                for (var o = e[1] + 1; o <= t[1] - 1; o++) {
                    var s = this._buffer.get(o),
                        a = this._translateBufferLineToString(s, !0);
                    s.isWrapped ? i[i.length - 1] += a : i.push(a)
                }
                if (e[1] !== t[1]) {
                    var s = this._buffer.get(t[1]),
                        a = this._translateBufferLineToString(s, !0, 0, t[0]);
                    s.isWrapped ? i[i.length - 1] += a : i.push(a)
                }
                return i.map(function (e) {
                    return e.replace(c, " ")
                }).join(n.isMSWindows ? "\r\n" : "\n")
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.clearSelection = function () {
            this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh()
        }, t.prototype._translateBufferLineToString = function (e, t, r, i) {
            void 0 === r && (r = 0), void 0 === i && (i = null);
            for (var o = "", s = r, n = i, a = 0; a < e.length; a++) {
                var l = e[a];
                o += l[1], 0 === l[2] && (r >= a && s--, i >= a && n--)
            }
            var h = n || e.length;
            if (t) {
                var c = o.search(/\s+$/);
                if (-1 !== c && (h = Math.min(h, c)), h <= s) return ""
            }
            return o.substring(s, h)
        }, t.prototype.refresh = function (e) {
            var t = this;
            this._refreshAnimationFrame || (this._refreshAnimationFrame = window.requestAnimationFrame(function () {
                return t._refresh()
            })), n.isLinux && e && this.selectionText.length && this.emit("newselection", this.selectionText)
        }, t.prototype._refresh = function () {
            this._refreshAnimationFrame = null, this.emit("refresh", {
                start: this._model.finalSelectionStart,
                end: this._model.finalSelectionEnd
            })
        }, t.prototype.selectAll = function () {
            this._model.isSelectAllActive = !0, this.refresh()
        }, t.prototype._onTrim = function (e) {
            this._model.onTrim(e) && this.refresh()
        }, t.prototype._getMouseBufferCoords = function (e) {
            var t = s.getCoords(e, this._rowContainer, this._charMeasure, this._terminal.cols, this._terminal.rows, !0);
            return t[0]--, t[1]--, t[1] += this._terminal.ydisp, t
        }, t.prototype._getMouseEventScrollAmount = function (e) {
            var t = s.getCoordsRelativeToElement(e, this._rowContainer)[1],
                r = this._terminal.rows * this._charMeasure.height;
            return t >= 0 && t <= r ? 0 : (t > r && (t -= r), t = Math.min(Math.max(t, -50), 50), (t /= 50) / Math.abs(t) + Math.round(14 * t))
        }, t.prototype._onMouseDown = function (e) {
            0 === e.button && (e.preventDefault(), this._dragScrollAmount = 0, this._setMouseClickCount(e), e.shiftKey ? this._onShiftClick(e) : 1 === this._clickCount ? this._onSingleClick(e) : 2 === this._clickCount ? this._onDoubleClick(e) : 3 === this._clickCount && this._onTripleClick(e), this._addMouseDownListeners(), this.refresh(!0))
        }, t.prototype._addMouseDownListeners = function () {
            var e = this;
            this._rowContainer.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._rowContainer.ownerDocument.addEventListener("mouseup", this._mouseUpListener), this._dragScrollIntervalTimer = setInterval(function () {
                return e._dragScroll()
            }, 50)
        }, t.prototype._removeMouseDownListeners = function () {
            this._rowContainer.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._rowContainer.ownerDocument.removeEventListener("mouseup", this._mouseUpListener), clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = null
        }, t.prototype._onShiftClick = function (e) {
            this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e))
        }, t.prototype._onSingleClick = function (e) {
            this._model.selectionStartLength = 0, this._model.isSelectAllActive = !1, this._activeSelectionMode = o.NORMAL, this._model.selectionStart = this._getMouseBufferCoords(e), this._model.selectionStart && (this._model.selectionEnd = null, 0 === this._buffer.get(this._model.selectionStart[1])[this._model.selectionStart[0]][2] && this._model.selectionStart[0]++)
        }, t.prototype._onDoubleClick = function (e) {
            var t = this._getMouseBufferCoords(e);
            t && (this._activeSelectionMode = o.WORD, this._selectWordAt(t))
        }, t.prototype._onTripleClick = function (e) {
            var t = this._getMouseBufferCoords(e);
            t && (this._activeSelectionMode = o.LINE, this._selectLineAt(t[1]))
        }, t.prototype._setMouseClickCount = function (e) {
            var t = (new Date).getTime();
            (t - this._lastMouseDownTime > 400 || this._distanceFromLastMousePosition(e) > 10) && (this._clickCount = 0), this._lastMouseDownTime = t, this._lastMousePosition = [e.pageX, e.pageY], this._clickCount++
        }, t.prototype._distanceFromLastMousePosition = function (e) {
            return Math.max(Math.abs(this._lastMousePosition[0] - e.pageX), Math.abs(this._lastMousePosition[1] - e.pageY))
        }, t.prototype._onMouseMove = function (e) {
            var t = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
            if (this._model.selectionEnd = this._getMouseBufferCoords(e), this._activeSelectionMode === o.LINE ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._terminal.cols : this._activeSelectionMode === o.WORD && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e), this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._terminal.cols - 1 : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] < this._buffer.length) {
                var r = this._buffer.get(this._model.selectionEnd[1])[this._model.selectionEnd[0]];
                r && 0 === r[2] && this._model.selectionEnd[0]++
            }
            t && t[0] === this._model.selectionEnd[0] && t[1] === this._model.selectionEnd[1] || this.refresh(!0)
        }, t.prototype._dragScroll = function () {
            this._dragScrollAmount && (this._terminal.scrollDisp(this._dragScrollAmount, !1), this._dragScrollAmount > 0 ? this._model.selectionEnd = [this._terminal.cols - 1, this._terminal.ydisp + this._terminal.rows] : this._model.selectionEnd = [0, this._terminal.ydisp], this.refresh())
        }, t.prototype._onMouseUp = function (e) {
            this._removeMouseDownListeners()
        }, t.prototype._convertViewportColToCharacterIndex = function (e, t) {
            for (var r = t[0], i = 0; t[0] >= i; i++) 0 === e[i][2] && r--;
            return r
        }, t.prototype._getWordAt = function (e) {
            var t = this._buffer.get(e[1]),
                r = this._translateBufferLineToString(t, !1),
                i = this._convertViewportColToCharacterIndex(t, e),
                o = i,
                s = e[0] - o,
                n = 0,
                a = 0;
            if (" " === r.charAt(o)) {
                for (; o > 0 && " " === r.charAt(o - 1);) o--;
                for (; i < r.length && " " === r.charAt(i + 1);) i++
            } else {
                var l = e[0],
                    h = e[0];
                for (0 === t[l][2] && (n++, l--), 2 === t[h][2] && (a++, h++); o > 0 && !this._isCharWordSeparator(r.charAt(o - 1));) 0 === t[l - 1][2] && (n++, l--), o--, l--;
                for (; i + 1 < r.length && !this._isCharWordSeparator(r.charAt(i + 1));) 2 === t[h + 1][2] && (a++, h++), i++, h++
            }
            return {
                start: o + s - n,
                length: Math.min(i - o + n + a + 1, this._terminal.cols)
            }
        }, t.prototype._selectWordAt = function (e) {
            var t = this._getWordAt(e);
            this._model.selectionStart = [t.start, e[1]], this._model.selectionStartLength = t.length
        }, t.prototype._selectToWordAt = function (e) {
            var t = this._getWordAt(e);
            this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? t.start : t.start + t.length, e[1]]
        }, t.prototype._isCharWordSeparator = function (e) {
            return " ()[]{}'\"".indexOf(e) >= 0
        }, t.prototype._selectLineAt = function (e) {
            this._model.selectionStart = [0, e], this._model.selectionStartLength = this._terminal.cols
        }, t
    }(a.EventEmitter);
    t.SelectionManager = u
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function () {
        function e(e) {
            this._terminal = e, this.clearSelection()
        }
        return e.prototype.clearSelection = function () {
            this.selectionStart = null, this.selectionEnd = null, this.isSelectAllActive = !1, this.selectionStartLength = 0
        }, Object.defineProperty(e.prototype, "finalSelectionStart", {
            get: function () {
                return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "finalSelectionEnd", {
            get: function () {
                return this.isSelectAllActive ? [this._terminal.cols, this._terminal.ybase + this._terminal.rows - 1] : this.selectionStart ? !this.selectionEnd || this.areSelectionValuesReversed() ? [this.selectionStart[0] + this.selectionStartLength, this.selectionStart[1]] : this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1] ? [Math.max(this.selectionStart[0] + this.selectionStartLength, this.selectionEnd[0]), this.selectionEnd[1]] : this.selectionEnd : null
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.areSelectionValuesReversed = function () {
            var e = this.selectionStart,
                t = this.selectionEnd;
            return e[1] > t[1] || e[1] === t[1] && e[0] > t[0]
        }, e.prototype.onTrim = function (e) {
            return this.selectionStart && (this.selectionStart[1] -= e), this.selectionEnd && (this.selectionEnd[1] -= e), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), !0) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), !1)
        }, e
    }();
    t.SelectionModel = i
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function () {
        function e(e, t, r, i) {
            var o = this;
            this.terminal = e, this.viewportElement = t, this.scrollArea = r, this.charMeasure = i, this.currentRowHeight = 0, this.lastRecordedBufferLength = 0, this.lastRecordedViewportHeight = 0, this.terminal.on("scroll", this.syncScrollArea.bind(this)), this.terminal.on("resize", this.syncScrollArea.bind(this)), this.viewportElement.addEventListener("scroll", this.onScroll.bind(this)), setTimeout(function () {
                return o.syncScrollArea()
            }, 0)
        }
        return e.prototype.refresh = function () {
            if (this.charMeasure.height > 0) {
                var e = this.charMeasure.height !== this.currentRowHeight;
                e && (this.currentRowHeight = this.charMeasure.height, this.viewportElement.style.lineHeight = this.charMeasure.height + "px", this.terminal.rowContainer.style.lineHeight = this.charMeasure.height + "px");
                var t = this.lastRecordedViewportHeight !== this.terminal.rows;
                (e || t) && (this.lastRecordedViewportHeight = this.terminal.rows, this.viewportElement.style.height = this.charMeasure.height * this.terminal.rows + "px", this.terminal.selectionContainer.style.height = this.viewportElement.style.height), this.scrollArea.style.height = this.charMeasure.height * this.lastRecordedBufferLength + "px"
            }
        }, e.prototype.syncScrollArea = function () {
            this.lastRecordedBufferLength !== this.terminal.lines.length ? (this.lastRecordedBufferLength = this.terminal.lines.length, this.refresh()) : this.lastRecordedViewportHeight !== this.terminal.rows ? this.refresh() : this.charMeasure.height !== this.currentRowHeight && this.refresh();
            var e = this.terminal.ydisp * this.currentRowHeight;
            this.viewportElement.scrollTop !== e && (this.viewportElement.scrollTop = e)
        }, e.prototype.onScroll = function (e) {
            var t = Math.round(this.viewportElement.scrollTop / this.currentRowHeight) - this.terminal.ydisp;
            this.terminal.scrollDisp(t, !0)
        }, e.prototype.onWheel = function (e) {
            if (0 !== e.deltaY) {
                var t = 1;
                e.deltaMode === WheelEvent.DOM_DELTA_LINE ? t = this.currentRowHeight : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t = this.currentRowHeight * this.terminal.rows), this.viewportElement.scrollTop += e.deltaY * t, e.preventDefault()
            }
        }, e.prototype.onTouchStart = function (e) {
            this.lastTouchY = e.touches[0].pageY
        }, e.prototype.onTouchMove = function (e) {
            var t = this.lastTouchY - e.touches[0].pageY;
            this.lastTouchY = e.touches[0].pageY, 0 !== t && (this.viewportElement.scrollTop += t, e.preventDefault())
        }, e
    }();
    t.Viewport = i
}, function (e, t, r) {
    "use strict";

    function i(e, t) {
        return t ? e.replace(/\r?\n/g, "\r") : e
    }

    function o(e, t) {
        t.style.position = "fixed", t.style.width = "20px", t.style.height = "20px", t.style.left = e.clientX - 10 + "px", t.style.top = e.clientY - 10 + "px", t.style.zIndex = "1000", t.focus(), setTimeout(function () {
            t.style.position = null, t.style.width = null, t.style.height = null, t.style.left = null, t.style.top = null, t.style.zIndex = null
        }, 4)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.prepareTextForTerminal = i, t.copyHandler = function (e, t, r) {
        t.browser.isMSIE ? window.clipboardData.setData("Text", r.selectionText) : e.clipboardData.setData("text/plain", r.selectionText), e.preventDefault()
    }, t.pasteHandler = function (e, t) {
        e.stopPropagation();
        var r = function (r) {
            return r = i(r, t.browser.isMSWindows), t.handler(r), t.textarea.value = "", t.emit("paste", r), t.cancel(e)
        };
        t.browser.isMSIE ? window.clipboardData && r(window.clipboardData.getData("Text")) : e.clipboardData && r(e.clipboardData.getData("text/plain"))
    }, t.moveTextAreaUnderMouseCursor = o, t.rightClickHandler = function (e, t, r) {
        o(e, t), t.value = r.selectionText, t.select()
    }
}, function (e, t, r) {
    "use strict";
    var i = this && this.__extends || function () {
        var e = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        };
        return function (t, r) {
            function i() {
                this.constructor = t
            }
            e(t, r), t.prototype = null === r ? Object.create(r) : (i.prototype = r.prototype, new i)
        }
    }();
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function (e) {
        function t(t, r) {
            var i = e.call(this) || this;
            return i._document = t, i._parentElement = r, i
        }
        return i(t, e), Object.defineProperty(t.prototype, "width", {
            get: function () {
                return this._width
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "height", {
            get: function () {
                return this._height
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.measure = function () {
            var e = this;
            this._measureElement ? this._doMeasure() : (this._measureElement = this._document.createElement("span"), this._measureElement.style.position = "absolute", this._measureElement.style.top = "0", this._measureElement.style.left = "-9999em", this._measureElement.textContent = "W", this._measureElement.setAttribute("aria-hidden", "true"), this._parentElement.appendChild(this._measureElement), setTimeout(function () {
                return e._doMeasure()
            }, 0))
        }, t.prototype._doMeasure = function () {
            var e = this._measureElement.getBoundingClientRect();
            0 !== e.width && 0 !== e.height && (this._width === e.width && this._height === e.height || (this._width = e.width, this._height = e.height, this.emit("charsizechanged")))
        }, t
    }(r(1).EventEmitter);
    t.CharMeasure = o
}, function (e, t, r) {
    "use strict";
    var i = this && this.__extends || function () {
        var e = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        };
        return function (t, r) {
            function i() {
                this.constructor = t
            }
            e(t, r), t.prototype = null === r ? Object.create(r) : (i.prototype = r.prototype, new i)
        }
    }();
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function (e) {
        function t(t) {
            var r = e.call(this) || this;
            return r._array = new Array(t), r._startIndex = 0, r._length = 0, r
        }
        return i(t, e), Object.defineProperty(t.prototype, "maxLength", {
            get: function () {
                return this._array.length
            },
            set: function (e) {
                for (var t = new Array(e), r = 0; r < Math.min(e, this.length); r++) t[r] = this._array[this._getCyclicIndex(r)];
                this._array = t, this._startIndex = 0
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "length", {
            get: function () {
                return this._length
            },
            set: function (e) {
                if (e > this._length)
                    for (var t = this._length; t < e; t++) this._array[t] = void 0;
                this._length = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "forEach", {
            get: function () {
                var e = this;
                return function (t) {
                    for (var r = e.length, i = 0; i < r; i++) t(e.get(i), i)
                }
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.get = function (e) {
            return this._array[this._getCyclicIndex(e)]
        }, t.prototype.set = function (e, t) {
            this._array[this._getCyclicIndex(e)] = t
        }, t.prototype.push = function (e) {
            this._array[this._getCyclicIndex(this._length)] = e, this._length === this.maxLength ? (++this._startIndex === this.maxLength && (this._startIndex = 0), this.emit("trim", 1)) : this._length++
        }, t.prototype.pop = function () {
            return this._array[this._getCyclicIndex(this._length-- - 1)]
        }, t.prototype.splice = function (e, t) {
            for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
            if (t) {
                for (o = e; o < this._length - t; o++) this._array[this._getCyclicIndex(o)] = this._array[this._getCyclicIndex(o + t)];
                this._length -= t
            }
            if (r && r.length) {
                for (o = this._length - 1; o >= e; o--) this._array[this._getCyclicIndex(o + r.length)] = this._array[this._getCyclicIndex(o)];
                for (var o = 0; o < r.length; o++) this._array[this._getCyclicIndex(e + o)] = r[o];
                if (this._length + r.length > this.maxLength) {
                    var s = this._length + r.length - this.maxLength;
                    this._startIndex += s, this._length = this.maxLength, this.emit("trim", s)
                } else this._length += r.length
            }
        }, t.prototype.trimStart = function (e) {
            e > this._length && (e = this._length), this._startIndex += e, this._length -= e, this.emit("trim", e)
        }, t.prototype.shiftElements = function (e, t, r) {
            if (!(t <= 0)) {
                if (e < 0 || e >= this._length) throw new Error("start argument out of range");
                if (e + r < 0) throw new Error("Cannot shift elements in list beyond index 0");
                if (r > 0) {
                    for (o = t - 1; o >= 0; o--) this.set(e + o + r, this.get(e + o));
                    var i = e + t + r - this._length;
                    if (i > 0)
                        for (this._length += i; this._length > this.maxLength;) this._length--, this._startIndex++, this.emit("trim", 1)
                } else
                    for (var o = 0; o < t; o++) this.set(e + o + r, this.get(e + o))
            }
        }, t.prototype._getCyclicIndex = function (e) {
            return (this._startIndex + e) % this.maxLength
        }, t
    }(r(1).EventEmitter);
    t.CircularList = o
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function () {
        function e(e) {
            this.type = e, this._type = e, this._pool = [], this._inUse = {}
        }
        return e.prototype.acquire = function () {
            var t;
            return t = 0 === this._pool.length ? this._createNew() : this._pool.pop(), this._inUse[t.getAttribute(e.OBJECT_ID_ATTRIBUTE)] = t, t
        }, e.prototype.release = function (t) {
            if (!this._inUse[t.getAttribute(e.OBJECT_ID_ATTRIBUTE)]) throw new Error("Could not release an element not yet acquired");
            delete this._inUse[t.getAttribute(e.OBJECT_ID_ATTRIBUTE)], this._cleanElement(t), this._pool.push(t)
        }, e.prototype._createNew = function () {
            var t = document.createElement(this._type),
                r = e._objectCount++;
            return t.setAttribute(e.OBJECT_ID_ATTRIBUTE, r.toString(10)), t
        }, e.prototype._cleanElement = function (e) {
            e.className = "", e.innerHTML = ""
        }, e
    }();
    i.OBJECT_ID_ATTRIBUTE = "data-obj-id", i._objectCount = 0, t.DomElementObjectPool = i
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.contains = function (e, t) {
        return e.indexOf(t) >= 0
    }
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = r(11),
        o = r(14),
        s = r(13),
        n = r(12),
        a = document.getElementById("terminal");
    if (null !== a) {
        var l;
        l = "hterm" == gotty_term ? new i.Hterm(a) : new o.Xterm(a);
        var h = ("https:" == window.location.protocol ? "wss://" : "ws://") + window.location.host + window.location.pathname + "ws"+window.location.search,
            c = window.location.search,
            u = new n.ConnectionFactory(h, s.protocols),
            d = new s.WebTTY(l, u, c, gotty_auth_token).open();
        window.addEventListener("unload", function () {
            d(), l.close()
        })
    }
}, function (e, t, r) {
    function i(e) {
        return r(o(e))
    }

    function o(e) {
        var t = s[e];
        if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
        return t
    }
    var s = {
        "./attach/attach": 5,
        "./attach/attach.js": 5,
        "./attach/package.json": 30,
        "./fit/fit": 6,
        "./fit/fit.js": 6,
        "./fit/package.json": 31,
        "./fullscreen/fullscreen": 7,
        "./fullscreen/fullscreen.css": 32,
        "./fullscreen/fullscreen.js": 7,
        "./fullscreen/package.json": 33,
        "./terminado/package.json": 34,
        "./terminado/terminado": 8,
        "./terminado/terminado.js": 8
    };
    i.keys = function () {
        return Object.keys(s)
    }, i.resolve = o, e.exports = i, i.id = 29
}, function (e, t) {
    e.exports = {
        name: "xterm.attach",
        main: "attach.js",
        private: !0
    }
}, function (e, t) {
    e.exports = {
        name: "xterm.fit",
        main: "fit.js",
        private: !0
    }
}, function (e, t) {
    throw new Error("Module parse failed: /home/yudai/archive/products/2015/gotty/src/github.com/yudai/gotty/js/node_modules/xterm/lib/addons/fullscreen/fullscreen.css Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| .xterm.fullscreen {\n|     position: fixed;\n|     top: 0;")
}, function (e, t) {
    e.exports = {
        name: "xterm.fullscreen",
        main: "fullscreen.js",
        private: !0
    }
}, function (e, t) {
    e.exports = {
        name: "xterm.terminado",
        main: "terminado.js",
        private: !0
    }
}]);