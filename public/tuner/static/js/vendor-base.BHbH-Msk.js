(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      var isInstance = false;
      try {
        isInstance = this instanceof a2;
      } catch {
      }
      if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var type;
var hasRequiredType;
function requireType() {
  if (hasRequiredType) return type;
  hasRequiredType = 1;
  type = TypeError;
  return type;
}
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var objectInspect;
var hasRequiredObjectInspect;
function requireObjectInspect() {
  if (hasRequiredObjectInspect) return objectInspect;
  hasRequiredObjectInspect = 1;
  var hasMap = typeof Map === "function" && Map.prototype;
  var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
  var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
  var mapForEach = hasMap && Map.prototype.forEach;
  var hasSet = typeof Set === "function" && Set.prototype;
  var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
  var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
  var setForEach = hasSet && Set.prototype.forEach;
  var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
  var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
  var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
  var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
  var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
  var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
  var booleanValueOf = Boolean.prototype.valueOf;
  var objectToString2 = Object.prototype.toString;
  var functionToString = Function.prototype.toString;
  var $match = String.prototype.match;
  var $slice = String.prototype.slice;
  var $replace = String.prototype.replace;
  var $toUpperCase = String.prototype.toUpperCase;
  var $toLowerCase = String.prototype.toLowerCase;
  var $test = RegExp.prototype.test;
  var $concat = Array.prototype.concat;
  var $join = Array.prototype.join;
  var $arrSlice = Array.prototype.slice;
  var $floor = Math.floor;
  var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
  var gOPS = Object.getOwnPropertySymbols;
  var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
  var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
  var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
    return O.__proto__;
  } : null);
  function addNumericSeparator(num, str) {
    if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
      return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === "number") {
      var int = num < 0 ? -$floor(-num) : $floor(num);
      if (int !== num) {
        var intStr = String(int);
        var dec = $slice.call(str, intStr.length + 1);
        return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return $replace.call(str, sepRegex, "$&_");
  }
  var utilInspect = require$$0;
  var inspectCustom = utilInspect.custom;
  var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
  var quotes = {
    __proto__: null,
    "double": '"',
    single: "'"
  };
  var quoteREs = {
    __proto__: null,
    "double": /(["\\])/g,
    single: /(['\\])/g
  };
  objectInspect = function inspect_(obj, options, depth, seen2) {
    var opts = options || {};
    if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
    if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    }
    if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;
    if (typeof obj === "undefined") {
      return "undefined";
    }
    if (obj === null) {
      return "null";
    }
    if (typeof obj === "boolean") {
      return obj ? "true" : "false";
    }
    if (typeof obj === "string") {
      return inspectString(obj, opts);
    }
    if (typeof obj === "number") {
      if (obj === 0) {
        return Infinity / obj > 0 ? "0" : "-0";
      }
      var str = String(obj);
      return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === "bigint") {
      var bigIntStr = String(obj) + "n";
      return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }
    var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
    if (typeof depth === "undefined") {
      depth = 0;
    }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
      return isArray2(obj) ? "[Array]" : "[Object]";
    }
    var indent = getIndent(opts, depth);
    if (typeof seen2 === "undefined") {
      seen2 = [];
    } else if (indexOf(seen2, obj) >= 0) {
      return "[Circular]";
    }
    function inspect(value, from, noIndent) {
      if (from) {
        seen2 = $arrSlice.call(seen2);
        seen2.push(from);
      }
      if (noIndent) {
        var newOpts = {
          depth: opts.depth
        };
        if (has(opts, "quoteStyle")) {
          newOpts.quoteStyle = opts.quoteStyle;
        }
        return inspect_(value, newOpts, depth + 1, seen2);
      }
      return inspect_(value, opts, depth + 1, seen2);
    }
    if (typeof obj === "function" && !isRegExp2(obj)) {
      var name = nameOf(obj);
      var keys = arrObjKeys(obj, inspect);
      return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
    }
    if (isSymbol(obj)) {
      var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
      return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement2(obj)) {
      var s = "<" + $toLowerCase.call(String(obj.nodeName));
      var attrs = obj.attributes || [];
      for (var i2 = 0; i2 < attrs.length; i2++) {
        s += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
      }
      s += ">";
      if (obj.childNodes && obj.childNodes.length) {
        s += "...";
      }
      s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
      return s;
    }
    if (isArray2(obj)) {
      if (obj.length === 0) {
        return "[]";
      }
      var xs = arrObjKeys(obj, inspect);
      if (indent && !singleLineValues(xs)) {
        return "[" + indentedJoin(xs, indent) + "]";
      }
      return "[ " + $join.call(xs, ", ") + " ]";
    }
    if (isError(obj)) {
      var parts = arrObjKeys(obj, inspect);
      if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
        return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
      }
      if (parts.length === 0) {
        return "[" + String(obj) + "]";
      }
      return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
    }
    if (typeof obj === "object" && customInspect) {
      if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
        return utilInspect(obj, { depth: maxDepth - depth });
      } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
        return obj.inspect();
      }
    }
    if (isMap(obj)) {
      var mapParts = [];
      if (mapForEach) {
        mapForEach.call(obj, function(value, key2) {
          mapParts.push(inspect(key2, obj, true) + " => " + inspect(value, obj));
        });
      }
      return collectionOf("Map", mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
      var setParts = [];
      if (setForEach) {
        setForEach.call(obj, function(value) {
          setParts.push(inspect(value, obj));
        });
      }
      return collectionOf("Set", setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
      return weakCollectionOf("WeakMap");
    }
    if (isWeakSet(obj)) {
      return weakCollectionOf("WeakSet");
    }
    if (isWeakRef(obj)) {
      return weakCollectionOf("WeakRef");
    }
    if (isNumber2(obj)) {
      return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
      return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean2(obj)) {
      return markBoxed(booleanValueOf.call(obj));
    }
    if (isString2(obj)) {
      return markBoxed(inspect(String(obj)));
    }
    if (typeof window !== "undefined" && obj === window) {
      return "{ [object Window] }";
    }
    if (typeof globalThis !== "undefined" && obj === globalThis || typeof commonjsGlobal !== "undefined" && obj === commonjsGlobal) {
      return "{ [object globalThis] }";
    }
    if (!isDate2(obj) && !isRegExp2(obj)) {
      var ys = arrObjKeys(obj, inspect);
      var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
      var protoTag = obj instanceof Object ? "" : "null prototype";
      var stringTag = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
      var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
      var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
      if (ys.length === 0) {
        return tag + "{}";
      }
      if (indent) {
        return tag + "{" + indentedJoin(ys, indent) + "}";
      }
      return tag + "{ " + $join.call(ys, ", ") + " }";
    }
    return String(obj);
  };
  function wrapQuotes(s, defaultStyle, opts) {
    var style = opts.quoteStyle || defaultStyle;
    var quoteChar = quotes[style];
    return quoteChar + s + quoteChar;
  }
  function quote(s) {
    return $replace.call(String(s), /"/g, "&quot;");
  }
  function canTrustToString(obj) {
    return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
  }
  function isArray2(obj) {
    return toStr(obj) === "[object Array]" && canTrustToString(obj);
  }
  function isDate2(obj) {
    return toStr(obj) === "[object Date]" && canTrustToString(obj);
  }
  function isRegExp2(obj) {
    return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
  }
  function isError(obj) {
    return toStr(obj) === "[object Error]" && canTrustToString(obj);
  }
  function isString2(obj) {
    return toStr(obj) === "[object String]" && canTrustToString(obj);
  }
  function isNumber2(obj) {
    return toStr(obj) === "[object Number]" && canTrustToString(obj);
  }
  function isBoolean2(obj) {
    return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
  }
  function isSymbol(obj) {
    if (hasShammedSymbols) {
      return obj && typeof obj === "object" && obj instanceof Symbol;
    }
    if (typeof obj === "symbol") {
      return true;
    }
    if (!obj || typeof obj !== "object" || !symToString) {
      return false;
    }
    try {
      symToString.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isBigInt(obj) {
    if (!obj || typeof obj !== "object" || !bigIntValueOf) {
      return false;
    }
    try {
      bigIntValueOf.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  var hasOwn2 = Object.prototype.hasOwnProperty || function(key2) {
    return key2 in this;
  };
  function has(obj, key2) {
    return hasOwn2.call(obj, key2);
  }
  function toStr(obj) {
    return objectToString2.call(obj);
  }
  function nameOf(f) {
    if (f.name) {
      return f.name;
    }
    var m2 = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m2) {
      return m2[1];
    }
    return null;
  }
  function indexOf(xs, x) {
    if (xs.indexOf) {
      return xs.indexOf(x);
    }
    for (var i2 = 0, l = xs.length; i2 < l; i2++) {
      if (xs[i2] === x) {
        return i2;
      }
    }
    return -1;
  }
  function isMap(x) {
    if (!mapSize || !x || typeof x !== "object") {
      return false;
    }
    try {
      mapSize.call(x);
      try {
        setSize.call(x);
      } catch (s) {
        return true;
      }
      return x instanceof Map;
    } catch (e) {
    }
    return false;
  }
  function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakMapHas.call(x, weakMapHas);
      try {
        weakSetHas.call(x, weakSetHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakMap;
    } catch (e) {
    }
    return false;
  }
  function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakRefDeref.call(x);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isSet(x) {
    if (!setSize || !x || typeof x !== "object") {
      return false;
    }
    try {
      setSize.call(x);
      try {
        mapSize.call(x);
      } catch (m2) {
        return true;
      }
      return x instanceof Set;
    } catch (e) {
    }
    return false;
  }
  function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakSetHas.call(x, weakSetHas);
      try {
        weakMapHas.call(x, weakMapHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakSet;
    } catch (e) {
    }
    return false;
  }
  function isElement2(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
      return true;
    }
    return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
  }
  function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
      var remaining = str.length - opts.maxStringLength;
      var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
      return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    var quoteRE = quoteREs[opts.quoteStyle || "single"];
    quoteRE.lastIndex = 0;
    var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, "single", opts);
  }
  function lowbyte(c2) {
    var n = c2.charCodeAt(0);
    var x = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[n];
    if (x) {
      return "\\" + x;
    }
    return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
  }
  function markBoxed(str) {
    return "Object(" + str + ")";
  }
  function weakCollectionOf(type4) {
    return type4 + " { ? }";
  }
  function collectionOf(type4, size2, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
    return type4 + " (" + size2 + ") {" + joinedEntries + "}";
  }
  function singleLineValues(xs) {
    for (var i2 = 0; i2 < xs.length; i2++) {
      if (indexOf(xs[i2], "\n") >= 0) {
        return false;
      }
    }
    return true;
  }
  function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === "	") {
      baseIndent = "	";
    } else if (typeof opts.indent === "number" && opts.indent > 0) {
      baseIndent = $join.call(Array(opts.indent + 1), " ");
    } else {
      return null;
    }
    return {
      base: baseIndent,
      prev: $join.call(Array(depth + 1), baseIndent)
    };
  }
  function indentedJoin(xs, indent) {
    if (xs.length === 0) {
      return "";
    }
    var lineJoiner = "\n" + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
  }
  function arrObjKeys(obj, inspect) {
    var isArr = isArray2(obj);
    var xs = [];
    if (isArr) {
      xs.length = obj.length;
      for (var i2 = 0; i2 < obj.length; i2++) {
        xs[i2] = has(obj, i2) ? inspect(obj[i2], obj) : "";
      }
    }
    var syms = typeof gOPS === "function" ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
      symMap = {};
      for (var k = 0; k < syms.length; k++) {
        symMap["$" + syms[k]] = syms[k];
      }
    }
    for (var key2 in obj) {
      if (!has(obj, key2)) {
        continue;
      }
      if (isArr && String(Number(key2)) === key2 && key2 < obj.length) {
        continue;
      }
      if (hasShammedSymbols && symMap["$" + key2] instanceof Symbol) {
        continue;
      } else if ($test.call(/[^\w$]/, key2)) {
        xs.push(inspect(key2, obj) + ": " + inspect(obj[key2], obj));
      } else {
        xs.push(key2 + ": " + inspect(obj[key2], obj));
      }
    }
    if (typeof gOPS === "function") {
      for (var j = 0; j < syms.length; j++) {
        if (isEnumerable.call(obj, syms[j])) {
          xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
        }
      }
    }
    return xs;
  }
  return objectInspect;
}
var sideChannelList;
var hasRequiredSideChannelList;
function requireSideChannelList() {
  if (hasRequiredSideChannelList) return sideChannelList;
  hasRequiredSideChannelList = 1;
  var inspect = /* @__PURE__ */ requireObjectInspect();
  var $TypeError = /* @__PURE__ */ requireType();
  var listGetNode = function(list, key2, isDelete) {
    var prev = list;
    var curr;
    for (; (curr = prev.next) != null; prev = curr) {
      if (curr.key === key2) {
        prev.next = curr.next;
        if (!isDelete) {
          curr.next = /** @type {NonNullable<typeof list.next>} */
          list.next;
          list.next = curr;
        }
        return curr;
      }
    }
  };
  var listGet = function(objects, key2) {
    if (!objects) {
      return void 0;
    }
    var node = listGetNode(objects, key2);
    return node && node.value;
  };
  var listSet = function(objects, key2, value) {
    var node = listGetNode(objects, key2);
    if (node) {
      node.value = value;
    } else {
      objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
      {
        // eslint-disable-line no-param-reassign, no-extra-parens
        key: key2,
        next: objects.next,
        value
      };
    }
  };
  var listHas = function(objects, key2) {
    if (!objects) {
      return false;
    }
    return !!listGetNode(objects, key2);
  };
  var listDelete = function(objects, key2) {
    if (objects) {
      return listGetNode(objects, key2, true);
    }
  };
  sideChannelList = function getSideChannelList() {
    var $o;
    var channel = {
      assert: function(key2) {
        if (!channel.has(key2)) {
          throw new $TypeError("Side channel does not contain " + inspect(key2));
        }
      },
      "delete": function(key2) {
        var root = $o && $o.next;
        var deletedNode = listDelete($o, key2);
        if (deletedNode && root && root === deletedNode) {
          $o = void 0;
        }
        return !!deletedNode;
      },
      get: function(key2) {
        return listGet($o, key2);
      },
      has: function(key2) {
        return listHas($o, key2);
      },
      set: function(key2, value) {
        if (!$o) {
          $o = {
            next: void 0
          };
        }
        listSet(
          /** @type {NonNullable<typeof $o>} */
          $o,
          key2,
          value
        );
      }
    };
    return channel;
  };
  return sideChannelList;
}
var esObjectAtoms;
var hasRequiredEsObjectAtoms;
function requireEsObjectAtoms() {
  if (hasRequiredEsObjectAtoms) return esObjectAtoms;
  hasRequiredEsObjectAtoms = 1;
  esObjectAtoms = Object;
  return esObjectAtoms;
}
var esErrors;
var hasRequiredEsErrors;
function requireEsErrors() {
  if (hasRequiredEsErrors) return esErrors;
  hasRequiredEsErrors = 1;
  esErrors = Error;
  return esErrors;
}
var _eval;
var hasRequired_eval;
function require_eval() {
  if (hasRequired_eval) return _eval;
  hasRequired_eval = 1;
  _eval = EvalError;
  return _eval;
}
var range$1;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range$1;
  hasRequiredRange = 1;
  range$1 = RangeError;
  return range$1;
}
var ref;
var hasRequiredRef;
function requireRef() {
  if (hasRequiredRef) return ref;
  hasRequiredRef = 1;
  ref = ReferenceError;
  return ref;
}
var syntax;
var hasRequiredSyntax;
function requireSyntax() {
  if (hasRequiredSyntax) return syntax;
  hasRequiredSyntax = 1;
  syntax = SyntaxError;
  return syntax;
}
var uri;
var hasRequiredUri;
function requireUri() {
  if (hasRequiredUri) return uri;
  hasRequiredUri = 1;
  uri = URIError;
  return uri;
}
var abs;
var hasRequiredAbs;
function requireAbs() {
  if (hasRequiredAbs) return abs;
  hasRequiredAbs = 1;
  abs = Math.abs;
  return abs;
}
var floor;
var hasRequiredFloor;
function requireFloor() {
  if (hasRequiredFloor) return floor;
  hasRequiredFloor = 1;
  floor = Math.floor;
  return floor;
}
var max;
var hasRequiredMax;
function requireMax() {
  if (hasRequiredMax) return max;
  hasRequiredMax = 1;
  max = Math.max;
  return max;
}
var min;
var hasRequiredMin;
function requireMin() {
  if (hasRequiredMin) return min;
  hasRequiredMin = 1;
  min = Math.min;
  return min;
}
var pow;
var hasRequiredPow;
function requirePow() {
  if (hasRequiredPow) return pow;
  hasRequiredPow = 1;
  pow = Math.pow;
  return pow;
}
var round;
var hasRequiredRound;
function requireRound() {
  if (hasRequiredRound) return round;
  hasRequiredRound = 1;
  round = Math.round;
  return round;
}
var _isNaN;
var hasRequired_isNaN;
function require_isNaN() {
  if (hasRequired_isNaN) return _isNaN;
  hasRequired_isNaN = 1;
  _isNaN = Number.isNaN || function isNaN2(a) {
    return a !== a;
  };
  return _isNaN;
}
var sign;
var hasRequiredSign;
function requireSign() {
  if (hasRequiredSign) return sign;
  hasRequiredSign = 1;
  var $isNaN = /* @__PURE__ */ require_isNaN();
  sign = function sign2(number4) {
    if ($isNaN(number4) || number4 === 0) {
      return number4;
    }
    return number4 < 0 ? -1 : 1;
  };
  return sign;
}
var gOPD;
var hasRequiredGOPD;
function requireGOPD() {
  if (hasRequiredGOPD) return gOPD;
  hasRequiredGOPD = 1;
  gOPD = Object.getOwnPropertyDescriptor;
  return gOPD;
}
var gopd;
var hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd) return gopd;
  hasRequiredGopd = 1;
  var $gOPD = /* @__PURE__ */ requireGOPD();
  if ($gOPD) {
    try {
      $gOPD([], "length");
    } catch (e) {
      $gOPD = null;
    }
  }
  gopd = $gOPD;
  return gopd;
}
var esDefineProperty;
var hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty) return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var $defineProperty = Object.defineProperty || false;
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty = false;
    }
  }
  esDefineProperty = $defineProperty;
  return esDefineProperty;
}
var shams;
var hasRequiredShams;
function requireShams() {
  if (hasRequiredShams) return shams;
  hasRequiredShams = 1;
  shams = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (var _ in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(obj, sym)
      );
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  return shams;
}
var hasSymbols;
var hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols) return hasSymbols;
  hasRequiredHasSymbols = 1;
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = requireShams();
  hasSymbols = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  return hasSymbols;
}
var Reflect_getPrototypeOf;
var hasRequiredReflect_getPrototypeOf;
function requireReflect_getPrototypeOf() {
  if (hasRequiredReflect_getPrototypeOf) return Reflect_getPrototypeOf;
  hasRequiredReflect_getPrototypeOf = 1;
  Reflect_getPrototypeOf = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  return Reflect_getPrototypeOf;
}
var Object_getPrototypeOf;
var hasRequiredObject_getPrototypeOf;
function requireObject_getPrototypeOf() {
  if (hasRequiredObject_getPrototypeOf) return Object_getPrototypeOf;
  hasRequiredObject_getPrototypeOf = 1;
  var $Object = /* @__PURE__ */ requireEsObjectAtoms();
  Object_getPrototypeOf = $Object.getPrototypeOf || null;
  return Object_getPrototypeOf;
}
var implementation;
var hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var toStr = Object.prototype.toString;
  var max2 = Math.max;
  var funcType = "[object Function]";
  var concatty = function concatty2(a, b) {
    var arr = [];
    for (var i2 = 0; i2 < a.length; i2 += 1) {
      arr[i2] = a[i2];
    }
    for (var j = 0; j < b.length; j += 1) {
      arr[j + a.length] = b[j];
    }
    return arr;
  };
  var slicy = function slicy2(arrLike, offset) {
    var arr = [];
    for (var i2 = offset, j = 0; i2 < arrLike.length; i2 += 1, j += 1) {
      arr[j] = arrLike[i2];
    }
    return arr;
  };
  var joiny = function(arr, joiner) {
    var str = "";
    for (var i2 = 0; i2 < arr.length; i2 += 1) {
      str += arr[i2];
      if (i2 + 1 < arr.length) {
        str += joiner;
      }
    }
    return str;
  };
  implementation = function bind(that) {
    var target = this;
    if (typeof target !== "function" || toStr.apply(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          concatty(args, arguments)
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      }
      return target.apply(
        that,
        concatty(args, arguments)
      );
    };
    var boundLength = max2(0, target.length - args.length);
    var boundArgs = [];
    for (var i2 = 0; i2 < boundLength; i2++) {
      boundArgs[i2] = "$" + i2;
    }
    bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
  return implementation;
}
var functionBind;
var hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind) return functionBind;
  hasRequiredFunctionBind = 1;
  var implementation2 = requireImplementation();
  functionBind = Function.prototype.bind || implementation2;
  return functionBind;
}
var functionCall;
var hasRequiredFunctionCall;
function requireFunctionCall() {
  if (hasRequiredFunctionCall) return functionCall;
  hasRequiredFunctionCall = 1;
  functionCall = Function.prototype.call;
  return functionCall;
}
var functionApply;
var hasRequiredFunctionApply;
function requireFunctionApply() {
  if (hasRequiredFunctionApply) return functionApply;
  hasRequiredFunctionApply = 1;
  functionApply = Function.prototype.apply;
  return functionApply;
}
var reflectApply;
var hasRequiredReflectApply;
function requireReflectApply() {
  if (hasRequiredReflectApply) return reflectApply;
  hasRequiredReflectApply = 1;
  reflectApply = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  return reflectApply;
}
var actualApply;
var hasRequiredActualApply;
function requireActualApply() {
  if (hasRequiredActualApply) return actualApply;
  hasRequiredActualApply = 1;
  var bind = requireFunctionBind();
  var $apply = requireFunctionApply();
  var $call = requireFunctionCall();
  var $reflectApply = requireReflectApply();
  actualApply = $reflectApply || bind.call($call, $apply);
  return actualApply;
}
var callBindApplyHelpers;
var hasRequiredCallBindApplyHelpers;
function requireCallBindApplyHelpers() {
  if (hasRequiredCallBindApplyHelpers) return callBindApplyHelpers;
  hasRequiredCallBindApplyHelpers = 1;
  var bind = requireFunctionBind();
  var $TypeError = /* @__PURE__ */ requireType();
  var $call = requireFunctionCall();
  var $actualApply = requireActualApply();
  callBindApplyHelpers = function callBindBasic(args) {
    if (args.length < 1 || typeof args[0] !== "function") {
      throw new $TypeError("a function is required");
    }
    return $actualApply(bind, $call, args);
  };
  return callBindApplyHelpers;
}
var get;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet) return get;
  hasRequiredGet = 1;
  var callBind = requireCallBindApplyHelpers();
  var gOPD2 = /* @__PURE__ */ requireGopd();
  var hasProtoAccessor;
  try {
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (e) {
    if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
      throw e;
    }
  }
  var desc = !!hasProtoAccessor && gOPD2 && gOPD2(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  );
  var $Object = Object;
  var $getPrototypeOf = $Object.getPrototypeOf;
  get = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
    /** @type {import('./get')} */
    function getDunder(value) {
      return $getPrototypeOf(value == null ? value : $Object(value));
    }
  ) : false;
  return get;
}
var getProto;
var hasRequiredGetProto;
function requireGetProto() {
  if (hasRequiredGetProto) return getProto;
  hasRequiredGetProto = 1;
  var reflectGetProto = requireReflect_getPrototypeOf();
  var originalGetProto = requireObject_getPrototypeOf();
  var getDunderProto = /* @__PURE__ */ requireGet();
  getProto = reflectGetProto ? function getProto2(O) {
    return reflectGetProto(O);
  } : originalGetProto ? function getProto2(O) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new TypeError("getProto: not an object");
    }
    return originalGetProto(O);
  } : getDunderProto ? function getProto2(O) {
    return getDunderProto(O);
  } : null;
  return getProto;
}
var hasown;
var hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown) return hasown;
  hasRequiredHasown = 1;
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  var bind = requireFunctionBind();
  hasown = bind.call(call, $hasOwn);
  return hasown;
}
var getIntrinsic;
var hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic) return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var undefined$1;
  var $Object = /* @__PURE__ */ requireEsObjectAtoms();
  var $Error = /* @__PURE__ */ requireEsErrors();
  var $EvalError = /* @__PURE__ */ require_eval();
  var $RangeError = /* @__PURE__ */ requireRange();
  var $ReferenceError = /* @__PURE__ */ requireRef();
  var $SyntaxError = /* @__PURE__ */ requireSyntax();
  var $TypeError = /* @__PURE__ */ requireType();
  var $URIError = /* @__PURE__ */ requireUri();
  var abs2 = /* @__PURE__ */ requireAbs();
  var floor2 = /* @__PURE__ */ requireFloor();
  var max2 = /* @__PURE__ */ requireMax();
  var min2 = /* @__PURE__ */ requireMin();
  var pow2 = /* @__PURE__ */ requirePow();
  var round2 = /* @__PURE__ */ requireRound();
  var sign2 = /* @__PURE__ */ requireSign();
  var $Function = Function;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD = /* @__PURE__ */ requireGopd();
  var $defineProperty = /* @__PURE__ */ requireEsDefineProperty();
  var throwTypeError = function() {
    throw new $TypeError();
  };
  var ThrowTypeError = $gOPD ? (function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  })() : throwTypeError;
  var hasSymbols2 = requireHasSymbols()();
  var getProto2 = requireGetProto();
  var $ObjectGPO = requireObject_getPrototypeOf();
  var $ReflectGPO = requireReflect_getPrototypeOf();
  var $apply = requireFunctionApply();
  var $call = requireFunctionCall();
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" || !getProto2 ? undefined$1 : getProto2(Uint8Array);
  var INTRINSICS = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols2 && getProto2 ? getProto2([][Symbol.iterator]()) : undefined$1,
    "%AsyncFromSyncIteratorPrototype%": undefined$1,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": $Error,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": $EvalError,
    "%Float16Array%": typeof Float16Array === "undefined" ? undefined$1 : Float16Array,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols2 && getProto2 ? getProto2(getProto2([][Symbol.iterator]())) : undefined$1,
    "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
    "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 || !getProto2 ? undefined$1 : getProto2((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": $Object,
    "%Object.getOwnPropertyDescriptor%": $gOPD,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
    "%RangeError%": $RangeError,
    "%ReferenceError%": $ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 || !getProto2 ? undefined$1 : getProto2((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols2 && getProto2 ? getProto2(""[Symbol.iterator]()) : undefined$1,
    "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
    "%URIError%": $URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
    "%Function.prototype.call%": $call,
    "%Function.prototype.apply%": $apply,
    "%Object.defineProperty%": $defineProperty,
    "%Object.getPrototypeOf%": $ObjectGPO,
    "%Math.abs%": abs2,
    "%Math.floor%": floor2,
    "%Math.max%": max2,
    "%Math.min%": min2,
    "%Math.pow%": pow2,
    "%Math.round%": round2,
    "%Math.sign%": sign2,
    "%Reflect.getPrototypeOf%": $ReflectGPO
  };
  if (getProto2) {
    try {
      null.error;
    } catch (e) {
      var errorProto = getProto2(getProto2(e));
      INTRINSICS["%Error.prototype%"] = errorProto;
    }
  }
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto2) {
        value = getProto2(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = requireFunctionBind();
  var hasOwn2 = /* @__PURE__ */ requireHasown();
  var $concat = bind.call($call, Array.prototype.concat);
  var $spliceApply = bind.call($apply, Array.prototype.splice);
  var $replace = bind.call($call, String.prototype.replace);
  var $strSlice = bind.call($call, String.prototype.slice);
  var $exec = bind.call($call, RegExp.prototype.exec);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string3) {
    var first = $strSlice(string3, 0, 1);
    var last = $strSlice(string3, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace(string3, rePropName, function(match, number4, quote, subString) {
      result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number4 || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn2(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn2(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  getIntrinsic = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
      throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
      var part = parts[i2];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn2(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
          }
          return void undefined$1;
        }
        if ($gOPD && i2 + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn2(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
  return getIntrinsic;
}
var callBound;
var hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound) return callBound;
  hasRequiredCallBound = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var callBindBasic = requireCallBindApplyHelpers();
  var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
  callBound = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      GetIntrinsic(name, !!allowMissing)
    );
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
      return callBindBasic(
        /** @type {const} */
        [intrinsic]
      );
    }
    return intrinsic;
  };
  return callBound;
}
var sideChannelMap;
var hasRequiredSideChannelMap;
function requireSideChannelMap() {
  if (hasRequiredSideChannelMap) return sideChannelMap;
  hasRequiredSideChannelMap = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var callBound2 = /* @__PURE__ */ requireCallBound();
  var inspect = /* @__PURE__ */ requireObjectInspect();
  var $TypeError = /* @__PURE__ */ requireType();
  var $Map = GetIntrinsic("%Map%", true);
  var $mapGet = callBound2("Map.prototype.get", true);
  var $mapSet = callBound2("Map.prototype.set", true);
  var $mapHas = callBound2("Map.prototype.has", true);
  var $mapDelete = callBound2("Map.prototype.delete", true);
  var $mapSize = callBound2("Map.prototype.size", true);
  sideChannelMap = !!$Map && /** @type {Exclude<import('.'), false>} */
  function getSideChannelMap() {
    var $m;
    var channel = {
      assert: function(key2) {
        if (!channel.has(key2)) {
          throw new $TypeError("Side channel does not contain " + inspect(key2));
        }
      },
      "delete": function(key2) {
        if ($m) {
          var result = $mapDelete($m, key2);
          if ($mapSize($m) === 0) {
            $m = void 0;
          }
          return result;
        }
        return false;
      },
      get: function(key2) {
        if ($m) {
          return $mapGet($m, key2);
        }
      },
      has: function(key2) {
        if ($m) {
          return $mapHas($m, key2);
        }
        return false;
      },
      set: function(key2, value) {
        if (!$m) {
          $m = new $Map();
        }
        $mapSet($m, key2, value);
      }
    };
    return channel;
  };
  return sideChannelMap;
}
var sideChannelWeakmap;
var hasRequiredSideChannelWeakmap;
function requireSideChannelWeakmap() {
  if (hasRequiredSideChannelWeakmap) return sideChannelWeakmap;
  hasRequiredSideChannelWeakmap = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var callBound2 = /* @__PURE__ */ requireCallBound();
  var inspect = /* @__PURE__ */ requireObjectInspect();
  var getSideChannelMap = requireSideChannelMap();
  var $TypeError = /* @__PURE__ */ requireType();
  var $WeakMap = GetIntrinsic("%WeakMap%", true);
  var $weakMapGet = callBound2("WeakMap.prototype.get", true);
  var $weakMapSet = callBound2("WeakMap.prototype.set", true);
  var $weakMapHas = callBound2("WeakMap.prototype.has", true);
  var $weakMapDelete = callBound2("WeakMap.prototype.delete", true);
  sideChannelWeakmap = $WeakMap ? (
    /** @type {Exclude<import('.'), false>} */
    function getSideChannelWeakMap() {
      var $wm;
      var $m;
      var channel = {
        assert: function(key2) {
          if (!channel.has(key2)) {
            throw new $TypeError("Side channel does not contain " + inspect(key2));
          }
        },
        "delete": function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapDelete($wm, key2);
            }
          } else if (getSideChannelMap) {
            if ($m) {
              return $m["delete"](key2);
            }
          }
          return false;
        },
        get: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key2);
            }
          }
          return $m && $m.get(key2);
        },
        has: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key2);
            }
          }
          return !!$m && $m.has(key2);
        },
        set: function(key2, value) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key2, value);
          } else if (getSideChannelMap) {
            if (!$m) {
              $m = getSideChannelMap();
            }
            $m.set(key2, value);
          }
        }
      };
      return channel;
    }
  ) : getSideChannelMap;
  return sideChannelWeakmap;
}
var sideChannel;
var hasRequiredSideChannel;
function requireSideChannel() {
  if (hasRequiredSideChannel) return sideChannel;
  hasRequiredSideChannel = 1;
  var $TypeError = /* @__PURE__ */ requireType();
  var inspect = /* @__PURE__ */ requireObjectInspect();
  var getSideChannelList = requireSideChannelList();
  var getSideChannelMap = requireSideChannelMap();
  var getSideChannelWeakMap = requireSideChannelWeakmap();
  var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
  sideChannel = function getSideChannel() {
    var $channelData;
    var channel = {
      assert: function(key2) {
        if (!channel.has(key2)) {
          throw new $TypeError("Side channel does not contain " + inspect(key2));
        }
      },
      "delete": function(key2) {
        return !!$channelData && $channelData["delete"](key2);
      },
      get: function(key2) {
        return $channelData && $channelData.get(key2);
      },
      has: function(key2) {
        return !!$channelData && $channelData.has(key2);
      },
      set: function(key2, value) {
        if (!$channelData) {
          $channelData = makeChannel();
        }
        $channelData.set(key2, value);
      }
    };
    return channel;
  };
  return sideChannel;
}
var vconsole_min$1 = { exports: {} };
/*!
 * vConsole v3.15.1 (https://github.com/Tencent/vConsole)
 *
 * Tencent is pleased to support the open source community by making vConsole available.
 * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
var vconsole_min = vconsole_min$1.exports;
var hasRequiredVconsole_min;
function requireVconsole_min() {
  if (hasRequiredVconsole_min) return vconsole_min$1.exports;
  hasRequiredVconsole_min = 1;
  (function(module, exports$1) {
    !(function(t, n) {
      module.exports = n();
    })(vconsole_min || self, (function() {
      return (function() {
        var __webpack_modules__ = { 4264: function(t, n, e) {
          t.exports = e(7588);
        }, 5036: function(t, n, e) {
          e(1719), e(5677), e(6394), e(5334), e(6969), e(2021), e(8328), e(2129);
          var o = e(1287);
          t.exports = o.Promise;
        }, 2582: function(t, n, e) {
          e(1646), e(6394), e(2004), e(462), e(8407), e(2429), e(1172), e(8288), e(1274), e(8201), e(6626), e(3211), e(9952), e(15), e(9831), e(7521), e(2972), e(6956), e(5222), e(2257);
          var o = e(1287);
          t.exports = o.Symbol;
        }, 8257: function(t, n, e) {
          var o = e(7583), r = e(9212), i2 = e(5637), a = o.TypeError;
          t.exports = function(t2) {
            if (r(t2)) return t2;
            throw a(i2(t2) + " is not a function");
          };
        }, 1186: function(t, n, e) {
          var o = e(7583), r = e(2097), i2 = e(5637), a = o.TypeError;
          t.exports = function(t2) {
            if (r(t2)) return t2;
            throw a(i2(t2) + " is not a constructor");
          };
        }, 9882: function(t, n, e) {
          var o = e(7583), r = e(9212), i2 = o.String, a = o.TypeError;
          t.exports = function(t2) {
            if ("object" == typeof t2 || r(t2)) return t2;
            throw a("Can't set " + i2(t2) + " as a prototype");
          };
        }, 6288: function(t, n, e) {
          var o = e(3649), r = e(3590), i2 = e(4615), a = o("unscopables"), c2 = Array.prototype;
          null == c2[a] && i2.f(c2, a, { configurable: true, value: r(null) }), t.exports = function(t2) {
            c2[a][t2] = true;
          };
        }, 4761: function(t, n, e) {
          var o = e(7583), r = e(2447), i2 = o.TypeError;
          t.exports = function(t2, n2) {
            if (r(n2, t2)) return t2;
            throw i2("Incorrect invocation");
          };
        }, 2569: function(t, n, e) {
          var o = e(7583), r = e(794), i2 = o.String, a = o.TypeError;
          t.exports = function(t2) {
            if (r(t2)) return t2;
            throw a(i2(t2) + " is not an object");
          };
        }, 5766: function(t, n, e) {
          var o = e(2977), r = e(6782), i2 = e(1825), a = function(t2) {
            return function(n2, e2, a2) {
              var c2, u = o(n2), s = i2(u), l = r(a2, s);
              if (t2 && e2 != e2) {
                for (; s > l; ) if ((c2 = u[l++]) != c2) return true;
              } else for (; s > l; l++) if ((t2 || l in u) && u[l] === e2) return t2 || l || 0;
              return !t2 && -1;
            };
          };
          t.exports = { includes: a(true), indexOf: a(false) };
        }, 4805: function(t, n, e) {
          var o = e(2938), r = e(7386), i2 = e(5044), a = e(1324), c2 = e(1825), u = e(4822), s = r([].push), l = function(t2) {
            var n2 = 1 == t2, e2 = 2 == t2, r2 = 3 == t2, l2 = 4 == t2, f = 6 == t2, d = 7 == t2, v = 5 == t2 || f;
            return function(p, h, g, m2) {
              for (var _, b, y = a(p), w = i2(y), E = o(h, g), L = c2(w), T = 0, x = m2 || u, C = n2 ? x(p, L) : e2 || d ? x(p, 0) : void 0; L > T; T++) if ((v || T in w) && (b = E(_ = w[T], T, y), t2)) if (n2) C[T] = b;
              else if (b) switch (t2) {
                case 3:
                  return true;
                case 5:
                  return _;
                case 6:
                  return T;
                case 2:
                  s(C, _);
              }
              else switch (t2) {
                case 4:
                  return false;
                case 7:
                  s(C, _);
              }
              return f ? -1 : r2 || l2 ? l2 : C;
            };
          };
          t.exports = { forEach: l(0), map: l(1), filter: l(2), some: l(3), every: l(4), find: l(5), findIndex: l(6), filterReject: l(7) };
        }, 9269: function(t, n, e) {
          var o = e(6544), r = e(3649), i2 = e(4061), a = r("species");
          t.exports = function(t2) {
            return i2 >= 51 || !o((function() {
              var n2 = [];
              return (n2.constructor = {})[a] = function() {
                return { foo: 1 };
              }, 1 !== n2[t2](Boolean).foo;
            }));
          };
        }, 4546: function(t, n, e) {
          var o = e(7583), r = e(6782), i2 = e(1825), a = e(5999), c2 = o.Array, u = Math.max;
          t.exports = function(t2, n2, e2) {
            for (var o2 = i2(t2), s = r(n2, o2), l = r(void 0 === e2 ? o2 : e2, o2), f = c2(u(l - s, 0)), d = 0; s < l; s++, d++) a(f, d, t2[s]);
            return f.length = d, f;
          };
        }, 6917: function(t, n, e) {
          var o = e(7386);
          t.exports = o([].slice);
        }, 5289: function(t, n, e) {
          var o = e(7583), r = e(4521), i2 = e(2097), a = e(794), c2 = e(3649)("species"), u = o.Array;
          t.exports = function(t2) {
            var n2;
            return r(t2) && (n2 = t2.constructor, (i2(n2) && (n2 === u || r(n2.prototype)) || a(n2) && null === (n2 = n2[c2])) && (n2 = void 0)), void 0 === n2 ? u : n2;
          };
        }, 4822: function(t, n, e) {
          var o = e(5289);
          t.exports = function(t2, n2) {
            return new (o(t2))(0 === n2 ? 0 : n2);
          };
        }, 3616: function(t, n, e) {
          var o = e(3649)("iterator"), r = false;
          try {
            var i2 = 0, a = { next: function() {
              return { done: !!i2++ };
            }, return: function() {
              r = true;
            } };
            a[o] = function() {
              return this;
            }, Array.from(a, (function() {
              throw 2;
            }));
          } catch (t2) {
          }
          t.exports = function(t2, n2) {
            if (!n2 && !r) return false;
            var e2 = false;
            try {
              var i3 = {};
              i3[o] = function() {
                return { next: function() {
                  return { done: e2 = true };
                } };
              }, t2(i3);
            } catch (t3) {
            }
            return e2;
          };
        }, 9624: function(t, n, e) {
          var o = e(7386), r = o({}.toString), i2 = o("".slice);
          t.exports = function(t2) {
            return i2(r(t2), 8, -1);
          };
        }, 3058: function(t, n, e) {
          var o = e(7583), r = e(8191), i2 = e(9212), a = e(9624), c2 = e(3649)("toStringTag"), u = o.Object, s = "Arguments" == a(/* @__PURE__ */ (function() {
            return arguments;
          })());
          t.exports = r ? a : function(t2) {
            var n2, e2, o2;
            return void 0 === t2 ? "Undefined" : null === t2 ? "Null" : "string" == typeof (e2 = (function(t3, n3) {
              try {
                return t3[n3];
              } catch (t4) {
              }
            })(n2 = u(t2), c2)) ? e2 : s ? a(n2) : "Object" == (o2 = a(n2)) && i2(n2.callee) ? "Arguments" : o2;
          };
        }, 1509: function(t, n, e) {
          var o = e(7386)("".replace), r = String(Error("zxcasd").stack), i2 = /\n\s*at [^:]*:[^\n]*/, a = i2.test(r);
          t.exports = function(t2, n2) {
            if (a && "string" == typeof t2) for (; n2--; ) t2 = o(t2, i2, "");
            return t2;
          };
        }, 3478: function(t, n, e) {
          var o = e(2870), r = e(929), i2 = e(6683), a = e(4615);
          t.exports = function(t2, n2, e2) {
            for (var c2 = r(n2), u = a.f, s = i2.f, l = 0; l < c2.length; l++) {
              var f = c2[l];
              o(t2, f) || e2 && o(e2, f) || u(t2, f, s(n2, f));
            }
          };
        }, 926: function(t, n, e) {
          var o = e(6544);
          t.exports = !o((function() {
            function t2() {
            }
            return t2.prototype.constructor = null, Object.getPrototypeOf(new t2()) !== t2.prototype;
          }));
        }, 4683: function(t, n, e) {
          var o = e(2365).IteratorPrototype, r = e(3590), i2 = e(4677), a = e(8821), c2 = e(339), u = function() {
            return this;
          };
          t.exports = function(t2, n2, e2, s) {
            var l = n2 + " Iterator";
            return t2.prototype = r(o, { next: i2(+!s, e2) }), a(t2, l, false, true), c2[l] = u, t2;
          };
        }, 57: function(t, n, e) {
          var o = e(8494), r = e(4615), i2 = e(4677);
          t.exports = o ? function(t2, n2, e2) {
            return r.f(t2, n2, i2(1, e2));
          } : function(t2, n2, e2) {
            return t2[n2] = e2, t2;
          };
        }, 4677: function(t) {
          t.exports = function(t2, n) {
            return { enumerable: !(1 & t2), configurable: !(2 & t2), writable: !(4 & t2), value: n };
          };
        }, 5999: function(t, n, e) {
          var o = e(8734), r = e(4615), i2 = e(4677);
          t.exports = function(t2, n2, e2) {
            var a = o(n2);
            a in t2 ? r.f(t2, a, i2(0, e2)) : t2[a] = e2;
          };
        }, 9012: function(t, n, e) {
          var o = e(7263), r = e(8262), i2 = e(6268), a = e(4340), c2 = e(9212), u = e(4683), s = e(729), l = e(7496), f = e(8821), d = e(57), v = e(1270), p = e(3649), h = e(339), g = e(2365), m2 = a.PROPER, _ = a.CONFIGURABLE, b = g.IteratorPrototype, y = g.BUGGY_SAFARI_ITERATORS, w = p("iterator"), E = "keys", L = "values", T = "entries", x = function() {
            return this;
          };
          t.exports = function(t2, n2, e2, a2, p2, g2, C) {
            u(e2, n2, a2);
            var O, I, D, $ = function(t3) {
              if (t3 === p2 && S) return S;
              if (!y && t3 in P2) return P2[t3];
              switch (t3) {
                case E:
                case L:
                case T:
                  return function() {
                    return new e2(this, t3);
                  };
              }
              return function() {
                return new e2(this);
              };
            }, R = n2 + " Iterator", k = false, P2 = t2.prototype, M = P2[w] || P2["@@iterator"] || p2 && P2[p2], S = !y && M || $(p2), j = "Array" == n2 && P2.entries || M;
            if (j && (O = s(j.call(new t2()))) !== Object.prototype && O.next && (i2 || s(O) === b || (l ? l(O, b) : c2(O[w]) || v(O, w, x)), f(O, R, true, true), i2 && (h[R] = x)), m2 && p2 == L && M && M.name !== L && (!i2 && _ ? d(P2, "name", L) : (k = true, S = function() {
              return r(M, this);
            })), p2) if (I = { values: $(L), keys: g2 ? S : $(E), entries: $(T) }, C) for (D in I) (y || k || !(D in P2)) && v(P2, D, I[D]);
            else o({ target: n2, proto: true, forced: y || k }, I);
            return i2 && !C || P2[w] === S || v(P2, w, S, { name: p2 }), h[n2] = S, I;
          };
        }, 2219: function(t, n, e) {
          var o = e(1287), r = e(2870), i2 = e(491), a = e(4615).f;
          t.exports = function(t2) {
            var n2 = o.Symbol || (o.Symbol = {});
            r(n2, t2) || a(n2, t2, { value: i2.f(t2) });
          };
        }, 8494: function(t, n, e) {
          var o = e(6544);
          t.exports = !o((function() {
            return 7 != Object.defineProperty({}, 1, { get: function() {
              return 7;
            } })[1];
          }));
        }, 6668: function(t, n, e) {
          var o = e(7583), r = e(794), i2 = o.document, a = r(i2) && r(i2.createElement);
          t.exports = function(t2) {
            return a ? i2.createElement(t2) : {};
          };
        }, 6778: function(t) {
          t.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
        }, 9307: function(t, n, e) {
          var o = e(6668)("span").classList, r = o && o.constructor && o.constructor.prototype;
          t.exports = r === Object.prototype ? void 0 : r;
        }, 2274: function(t) {
          t.exports = "object" == typeof window;
        }, 3256: function(t, n, e) {
          var o = e(6918), r = e(7583);
          t.exports = /ipad|iphone|ipod/i.test(o) && void 0 !== r.Pebble;
        }, 7020: function(t, n, e) {
          var o = e(6918);
          t.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(o);
        }, 5354: function(t, n, e) {
          var o = e(9624), r = e(7583);
          t.exports = "process" == o(r.process);
        }, 6846: function(t, n, e) {
          var o = e(6918);
          t.exports = /web0s(?!.*chrome)/i.test(o);
        }, 6918: function(t, n, e) {
          var o = e(5897);
          t.exports = o("navigator", "userAgent") || "";
        }, 4061: function(t, n, e) {
          var o, r, i2 = e(7583), a = e(6918), c2 = i2.process, u = i2.Deno, s = c2 && c2.versions || u && u.version, l = s && s.v8;
          l && (r = (o = l.split("."))[0] > 0 && o[0] < 4 ? 1 : +(o[0] + o[1])), !r && a && (!(o = a.match(/Edge\/(\d+)/)) || o[1] >= 74) && (o = a.match(/Chrome\/(\d+)/)) && (r = +o[1]), t.exports = r;
        }, 5690: function(t) {
          t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
        }, 1178: function(t, n, e) {
          var o = e(6544), r = e(4677);
          t.exports = !o((function() {
            var t2 = Error("a");
            return !("stack" in t2) || (Object.defineProperty(t2, "stack", r(1, 7)), 7 !== t2.stack);
          }));
        }, 7263: function(t, n, e) {
          var o = e(7583), r = e(6683).f, i2 = e(57), a = e(1270), c2 = e(460), u = e(3478), s = e(4451);
          t.exports = function(t2, n2) {
            var e2, l, f, d, v, p = t2.target, h = t2.global, g = t2.stat;
            if (e2 = h ? o : g ? o[p] || c2(p, {}) : (o[p] || {}).prototype) for (l in n2) {
              if (d = n2[l], f = t2.noTargetGet ? (v = r(e2, l)) && v.value : e2[l], !s(h ? l : p + (g ? "." : "#") + l, t2.forced) && void 0 !== f) {
                if (typeof d == typeof f) continue;
                u(d, f);
              }
              (t2.sham || f && f.sham) && i2(d, "sham", true), a(e2, l, d, t2);
            }
          };
        }, 6544: function(t) {
          t.exports = function(t2) {
            try {
              return !!t2();
            } catch (t3) {
              return true;
            }
          };
        }, 1611: function(t, n, e) {
          var o = e(8987), r = Function.prototype, i2 = r.apply, a = r.call;
          t.exports = "object" == typeof Reflect && Reflect.apply || (o ? a.bind(i2) : function() {
            return a.apply(i2, arguments);
          });
        }, 2938: function(t, n, e) {
          var o = e(7386), r = e(8257), i2 = e(8987), a = o(o.bind);
          t.exports = function(t2, n2) {
            return r(t2), void 0 === n2 ? t2 : i2 ? a(t2, n2) : function() {
              return t2.apply(n2, arguments);
            };
          };
        }, 8987: function(t, n, e) {
          var o = e(6544);
          t.exports = !o((function() {
            var t2 = (function() {
            }).bind();
            return "function" != typeof t2 || t2.hasOwnProperty("prototype");
          }));
        }, 8262: function(t, n, e) {
          var o = e(8987), r = Function.prototype.call;
          t.exports = o ? r.bind(r) : function() {
            return r.apply(r, arguments);
          };
        }, 4340: function(t, n, e) {
          var o = e(8494), r = e(2870), i2 = Function.prototype, a = o && Object.getOwnPropertyDescriptor, c2 = r(i2, "name"), u = c2 && "something" === (function() {
          }).name, s = c2 && (!o || o && a(i2, "name").configurable);
          t.exports = { EXISTS: c2, PROPER: u, CONFIGURABLE: s };
        }, 7386: function(t, n, e) {
          var o = e(8987), r = Function.prototype, i2 = r.bind, a = r.call, c2 = o && i2.bind(a, a);
          t.exports = o ? function(t2) {
            return t2 && c2(t2);
          } : function(t2) {
            return t2 && function() {
              return a.apply(t2, arguments);
            };
          };
        }, 5897: function(t, n, e) {
          var o = e(7583), r = e(9212), i2 = function(t2) {
            return r(t2) ? t2 : void 0;
          };
          t.exports = function(t2, n2) {
            return arguments.length < 2 ? i2(o[t2]) : o[t2] && o[t2][n2];
          };
        }, 8272: function(t, n, e) {
          var o = e(3058), r = e(911), i2 = e(339), a = e(3649)("iterator");
          t.exports = function(t2) {
            if (null != t2) return r(t2, a) || r(t2, "@@iterator") || i2[o(t2)];
          };
        }, 6307: function(t, n, e) {
          var o = e(7583), r = e(8262), i2 = e(8257), a = e(2569), c2 = e(5637), u = e(8272), s = o.TypeError;
          t.exports = function(t2, n2) {
            var e2 = arguments.length < 2 ? u(t2) : n2;
            if (i2(e2)) return a(r(e2, t2));
            throw s(c2(t2) + " is not iterable");
          };
        }, 911: function(t, n, e) {
          var o = e(8257);
          t.exports = function(t2, n2) {
            var e2 = t2[n2];
            return null == e2 ? void 0 : o(e2);
          };
        }, 7583: function(t, n, e) {
          var o = function(t2) {
            return t2 && t2.Math == Math && t2;
          };
          t.exports = o("object" == typeof globalThis && globalThis) || o("object" == typeof window && window) || o("object" == typeof self && self) || o("object" == typeof e.g && e.g) || /* @__PURE__ */ (function() {
            return this;
          })() || Function("return this")();
        }, 2870: function(t, n, e) {
          var o = e(7386), r = e(1324), i2 = o({}.hasOwnProperty);
          t.exports = Object.hasOwn || function(t2, n2) {
            return i2(r(t2), n2);
          };
        }, 4639: function(t) {
          t.exports = {};
        }, 2716: function(t, n, e) {
          var o = e(7583);
          t.exports = function(t2, n2) {
            var e2 = o.console;
            e2 && e2.error && (1 == arguments.length ? e2.error(t2) : e2.error(t2, n2));
          };
        }, 482: function(t, n, e) {
          var o = e(5897);
          t.exports = o("document", "documentElement");
        }, 275: function(t, n, e) {
          var o = e(8494), r = e(6544), i2 = e(6668);
          t.exports = !o && !r((function() {
            return 7 != Object.defineProperty(i2("div"), "a", { get: function() {
              return 7;
            } }).a;
          }));
        }, 5044: function(t, n, e) {
          var o = e(7583), r = e(7386), i2 = e(6544), a = e(9624), c2 = o.Object, u = r("".split);
          t.exports = i2((function() {
            return !c2("z").propertyIsEnumerable(0);
          })) ? function(t2) {
            return "String" == a(t2) ? u(t2, "") : c2(t2);
          } : c2;
        }, 9734: function(t, n, e) {
          var o = e(7386), r = e(9212), i2 = e(1314), a = o(Function.toString);
          r(i2.inspectSource) || (i2.inspectSource = function(t2) {
            return a(t2);
          }), t.exports = i2.inspectSource;
        }, 4402: function(t, n, e) {
          var o = e(794), r = e(57);
          t.exports = function(t2, n2) {
            o(n2) && "cause" in n2 && r(t2, "cause", n2.cause);
          };
        }, 2743: function(t, n, e) {
          var o, r, i2, a = e(9491), c2 = e(7583), u = e(7386), s = e(794), l = e(57), f = e(2870), d = e(1314), v = e(9137), p = e(4639), h = "Object already initialized", g = c2.TypeError, m2 = c2.WeakMap;
          if (a || d.state) {
            var _ = d.state || (d.state = new m2()), b = u(_.get), y = u(_.has), w = u(_.set);
            o = function(t2, n2) {
              if (y(_, t2)) throw new g(h);
              return n2.facade = t2, w(_, t2, n2), n2;
            }, r = function(t2) {
              return b(_, t2) || {};
            }, i2 = function(t2) {
              return y(_, t2);
            };
          } else {
            var E = v("state");
            p[E] = true, o = function(t2, n2) {
              if (f(t2, E)) throw new g(h);
              return n2.facade = t2, l(t2, E, n2), n2;
            }, r = function(t2) {
              return f(t2, E) ? t2[E] : {};
            }, i2 = function(t2) {
              return f(t2, E);
            };
          }
          t.exports = { set: o, get: r, has: i2, enforce: function(t2) {
            return i2(t2) ? r(t2) : o(t2, {});
          }, getterFor: function(t2) {
            return function(n2) {
              var e2;
              if (!s(n2) || (e2 = r(n2)).type !== t2) throw g("Incompatible receiver, " + t2 + " required");
              return e2;
            };
          } };
        }, 114: function(t, n, e) {
          var o = e(3649), r = e(339), i2 = o("iterator"), a = Array.prototype;
          t.exports = function(t2) {
            return void 0 !== t2 && (r.Array === t2 || a[i2] === t2);
          };
        }, 4521: function(t, n, e) {
          var o = e(9624);
          t.exports = Array.isArray || function(t2) {
            return "Array" == o(t2);
          };
        }, 9212: function(t) {
          t.exports = function(t2) {
            return "function" == typeof t2;
          };
        }, 2097: function(t, n, e) {
          var o = e(7386), r = e(6544), i2 = e(9212), a = e(3058), c2 = e(5897), u = e(9734), s = function() {
          }, l = [], f = c2("Reflect", "construct"), d = /^\s*(?:class|function)\b/, v = o(d.exec), p = !d.exec(s), h = function(t2) {
            if (!i2(t2)) return false;
            try {
              return f(s, l, t2), true;
            } catch (t3) {
              return false;
            }
          }, g = function(t2) {
            if (!i2(t2)) return false;
            switch (a(t2)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return false;
            }
            try {
              return p || !!v(d, u(t2));
            } catch (t3) {
              return true;
            }
          };
          g.sham = true, t.exports = !f || r((function() {
            var t2;
            return h(h.call) || !h(Object) || !h((function() {
              t2 = true;
            })) || t2;
          })) ? g : h;
        }, 4451: function(t, n, e) {
          var o = e(6544), r = e(9212), i2 = /#|\.prototype\./, a = function(t2, n2) {
            var e2 = u[c2(t2)];
            return e2 == l || e2 != s && (r(n2) ? o(n2) : !!n2);
          }, c2 = a.normalize = function(t2) {
            return String(t2).replace(i2, ".").toLowerCase();
          }, u = a.data = {}, s = a.NATIVE = "N", l = a.POLYFILL = "P";
          t.exports = a;
        }, 794: function(t, n, e) {
          var o = e(9212);
          t.exports = function(t2) {
            return "object" == typeof t2 ? null !== t2 : o(t2);
          };
        }, 6268: function(t) {
          t.exports = false;
        }, 5871: function(t, n, e) {
          var o = e(7583), r = e(5897), i2 = e(9212), a = e(2447), c2 = e(7786), u = o.Object;
          t.exports = c2 ? function(t2) {
            return "symbol" == typeof t2;
          } : function(t2) {
            var n2 = r("Symbol");
            return i2(n2) && a(n2.prototype, u(t2));
          };
        }, 4026: function(t, n, e) {
          var o = e(7583), r = e(2938), i2 = e(8262), a = e(2569), c2 = e(5637), u = e(114), s = e(1825), l = e(2447), f = e(6307), d = e(8272), v = e(7093), p = o.TypeError, h = function(t2, n2) {
            this.stopped = t2, this.result = n2;
          }, g = h.prototype;
          t.exports = function(t2, n2, e2) {
            var o2, m2, _, b, y, w, E, L = e2 && e2.that, T = !(!e2 || !e2.AS_ENTRIES), x = !(!e2 || !e2.IS_ITERATOR), C = !(!e2 || !e2.INTERRUPTED), O = r(n2, L), I = function(t3) {
              return o2 && v(o2, "normal", t3), new h(true, t3);
            }, D = function(t3) {
              return T ? (a(t3), C ? O(t3[0], t3[1], I) : O(t3[0], t3[1])) : C ? O(t3, I) : O(t3);
            };
            if (x) o2 = t2;
            else {
              if (!(m2 = d(t2))) throw p(c2(t2) + " is not iterable");
              if (u(m2)) {
                for (_ = 0, b = s(t2); b > _; _++) if ((y = D(t2[_])) && l(g, y)) return y;
                return new h(false);
              }
              o2 = f(t2, m2);
            }
            for (w = o2.next; !(E = i2(w, o2)).done; ) {
              try {
                y = D(E.value);
              } catch (t3) {
                v(o2, "throw", t3);
              }
              if ("object" == typeof y && y && l(g, y)) return y;
            }
            return new h(false);
          };
        }, 7093: function(t, n, e) {
          var o = e(8262), r = e(2569), i2 = e(911);
          t.exports = function(t2, n2, e2) {
            var a, c2;
            r(t2);
            try {
              if (!(a = i2(t2, "return"))) {
                if ("throw" === n2) throw e2;
                return e2;
              }
              a = o(a, t2);
            } catch (t3) {
              c2 = true, a = t3;
            }
            if ("throw" === n2) throw e2;
            if (c2) throw a;
            return r(a), e2;
          };
        }, 2365: function(t, n, e) {
          var o, r, i2, a = e(6544), c2 = e(9212), u = e(3590), s = e(729), l = e(1270), f = e(3649), d = e(6268), v = f("iterator"), p = false;
          [].keys && ("next" in (i2 = [].keys()) ? (r = s(s(i2))) !== Object.prototype && (o = r) : p = true), null == o || a((function() {
            var t2 = {};
            return o[v].call(t2) !== t2;
          })) ? o = {} : d && (o = u(o)), c2(o[v]) || l(o, v, (function() {
            return this;
          })), t.exports = { IteratorPrototype: o, BUGGY_SAFARI_ITERATORS: p };
        }, 339: function(t) {
          t.exports = {};
        }, 1825: function(t, n, e) {
          var o = e(97);
          t.exports = function(t2) {
            return o(t2.length);
          };
        }, 2095: function(t, n, e) {
          var o, r, i2, a, c2, u, s, l, f = e(7583), d = e(2938), v = e(6683).f, p = e(8117).set, h = e(7020), g = e(3256), m2 = e(6846), _ = e(5354), b = f.MutationObserver || f.WebKitMutationObserver, y = f.document, w = f.process, E = f.Promise, L = v(f, "queueMicrotask"), T = L && L.value;
          T || (o = function() {
            var t2, n2;
            for (_ && (t2 = w.domain) && t2.exit(); r; ) {
              n2 = r.fn, r = r.next;
              try {
                n2();
              } catch (t3) {
                throw r ? a() : i2 = void 0, t3;
              }
            }
            i2 = void 0, t2 && t2.enter();
          }, h || _ || m2 || !b || !y ? !g && E && E.resolve ? ((s = E.resolve(void 0)).constructor = E, l = d(s.then, s), a = function() {
            l(o);
          }) : _ ? a = function() {
            w.nextTick(o);
          } : (p = d(p, f), a = function() {
            p(o);
          }) : (c2 = true, u = y.createTextNode(""), new b(o).observe(u, { characterData: true }), a = function() {
            u.data = c2 = !c2;
          })), t.exports = T || function(t2) {
            var n2 = { fn: t2, next: void 0 };
            i2 && (i2.next = n2), r || (r = n2, a()), i2 = n2;
          };
        }, 783: function(t, n, e) {
          var o = e(7583);
          t.exports = o.Promise;
        }, 8640: function(t, n, e) {
          var o = e(4061), r = e(6544);
          t.exports = !!Object.getOwnPropertySymbols && !r((function() {
            var t2 = Symbol();
            return !String(t2) || !(Object(t2) instanceof Symbol) || !Symbol.sham && o && o < 41;
          }));
        }, 9491: function(t, n, e) {
          var o = e(7583), r = e(9212), i2 = e(9734), a = o.WeakMap;
          t.exports = r(a) && /native code/.test(i2(a));
        }, 5084: function(t, n, e) {
          var o = e(8257), r = function(t2) {
            var n2, e2;
            this.promise = new t2((function(t3, o2) {
              if (void 0 !== n2 || void 0 !== e2) throw TypeError("Bad Promise constructor");
              n2 = t3, e2 = o2;
            })), this.resolve = o(n2), this.reject = o(e2);
          };
          t.exports.f = function(t2) {
            return new r(t2);
          };
        }, 2764: function(t, n, e) {
          var o = e(8320);
          t.exports = function(t2, n2) {
            return void 0 === t2 ? arguments.length < 2 ? "" : n2 : o(t2);
          };
        }, 3590: function(t, n, e) {
          var o, r = e(2569), i2 = e(8728), a = e(5690), c2 = e(4639), u = e(482), s = e(6668), l = e(9137), f = l("IE_PROTO"), d = function() {
          }, v = function(t2) {
            return "<script>" + t2 + "<\/script>";
          }, p = function(t2) {
            t2.write(v("")), t2.close();
            var n2 = t2.parentWindow.Object;
            return t2 = null, n2;
          }, h = function() {
            try {
              o = new ActiveXObject("htmlfile");
            } catch (t3) {
            }
            var t2, n2;
            h = "undefined" != typeof document ? document.domain && o ? p(o) : ((n2 = s("iframe")).style.display = "none", u.appendChild(n2), n2.src = String("javascript:"), (t2 = n2.contentWindow.document).open(), t2.write(v("document.F=Object")), t2.close(), t2.F) : p(o);
            for (var e2 = a.length; e2--; ) delete h.prototype[a[e2]];
            return h();
          };
          c2[f] = true, t.exports = Object.create || function(t2, n2) {
            var e2;
            return null !== t2 ? (d.prototype = r(t2), e2 = new d(), d.prototype = null, e2[f] = t2) : e2 = h(), void 0 === n2 ? e2 : i2.f(e2, n2);
          };
        }, 8728: function(t, n, e) {
          var o = e(8494), r = e(7670), i2 = e(4615), a = e(2569), c2 = e(2977), u = e(5432);
          n.f = o && !r ? Object.defineProperties : function(t2, n2) {
            a(t2);
            for (var e2, o2 = c2(n2), r2 = u(n2), s = r2.length, l = 0; s > l; ) i2.f(t2, e2 = r2[l++], o2[e2]);
            return t2;
          };
        }, 4615: function(t, n, e) {
          var o = e(7583), r = e(8494), i2 = e(275), a = e(7670), c2 = e(2569), u = e(8734), s = o.TypeError, l = Object.defineProperty, f = Object.getOwnPropertyDescriptor, d = "enumerable", v = "configurable", p = "writable";
          n.f = r ? a ? function(t2, n2, e2) {
            if (c2(t2), n2 = u(n2), c2(e2), "function" == typeof t2 && "prototype" === n2 && "value" in e2 && p in e2 && !e2.writable) {
              var o2 = f(t2, n2);
              o2 && o2.writable && (t2[n2] = e2.value, e2 = { configurable: v in e2 ? e2.configurable : o2.configurable, enumerable: d in e2 ? e2.enumerable : o2.enumerable, writable: false });
            }
            return l(t2, n2, e2);
          } : l : function(t2, n2, e2) {
            if (c2(t2), n2 = u(n2), c2(e2), i2) try {
              return l(t2, n2, e2);
            } catch (t3) {
            }
            if ("get" in e2 || "set" in e2) throw s("Accessors not supported");
            return "value" in e2 && (t2[n2] = e2.value), t2;
          };
        }, 6683: function(t, n, e) {
          var o = e(8494), r = e(8262), i2 = e(112), a = e(4677), c2 = e(2977), u = e(8734), s = e(2870), l = e(275), f = Object.getOwnPropertyDescriptor;
          n.f = o ? f : function(t2, n2) {
            if (t2 = c2(t2), n2 = u(n2), l) try {
              return f(t2, n2);
            } catch (t3) {
            }
            if (s(t2, n2)) return a(!r(i2.f, t2, n2), t2[n2]);
          };
        }, 3130: function(t, n, e) {
          var o = e(9624), r = e(2977), i2 = e(9275).f, a = e(4546), c2 = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
          t.exports.f = function(t2) {
            return c2 && "Window" == o(t2) ? (function(t3) {
              try {
                return i2(t3);
              } catch (t4) {
                return a(c2);
              }
            })(t2) : i2(r(t2));
          };
        }, 9275: function(t, n, e) {
          var o = e(8356), r = e(5690).concat("length", "prototype");
          n.f = Object.getOwnPropertyNames || function(t2) {
            return o(t2, r);
          };
        }, 4012: function(t, n) {
          n.f = Object.getOwnPropertySymbols;
        }, 729: function(t, n, e) {
          var o = e(7583), r = e(2870), i2 = e(9212), a = e(1324), c2 = e(9137), u = e(926), s = c2("IE_PROTO"), l = o.Object, f = l.prototype;
          t.exports = u ? l.getPrototypeOf : function(t2) {
            var n2 = a(t2);
            if (r(n2, s)) return n2[s];
            var e2 = n2.constructor;
            return i2(e2) && n2 instanceof e2 ? e2.prototype : n2 instanceof l ? f : null;
          };
        }, 2447: function(t, n, e) {
          var o = e(7386);
          t.exports = o({}.isPrototypeOf);
        }, 8356: function(t, n, e) {
          var o = e(7386), r = e(2870), i2 = e(2977), a = e(5766).indexOf, c2 = e(4639), u = o([].push);
          t.exports = function(t2, n2) {
            var e2, o2 = i2(t2), s = 0, l = [];
            for (e2 in o2) !r(c2, e2) && r(o2, e2) && u(l, e2);
            for (; n2.length > s; ) r(o2, e2 = n2[s++]) && (~a(l, e2) || u(l, e2));
            return l;
          };
        }, 5432: function(t, n, e) {
          var o = e(8356), r = e(5690);
          t.exports = Object.keys || function(t2) {
            return o(t2, r);
          };
        }, 112: function(t, n) {
          var e = {}.propertyIsEnumerable, o = Object.getOwnPropertyDescriptor, r = o && !e.call({ 1: 2 }, 1);
          n.f = r ? function(t2) {
            var n2 = o(this, t2);
            return !!n2 && n2.enumerable;
          } : e;
        }, 7496: function(t, n, e) {
          var o = e(7386), r = e(2569), i2 = e(9882);
          t.exports = Object.setPrototypeOf || ("__proto__" in {} ? (function() {
            var t2, n2 = false, e2 = {};
            try {
              (t2 = o(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(e2, []), n2 = e2 instanceof Array;
            } catch (t3) {
            }
            return function(e3, o2) {
              return r(e3), i2(o2), n2 ? t2(e3, o2) : e3.__proto__ = o2, e3;
            };
          })() : void 0);
        }, 3060: function(t, n, e) {
          var o = e(8191), r = e(3058);
          t.exports = o ? {}.toString : function() {
            return "[object " + r(this) + "]";
          };
        }, 6252: function(t, n, e) {
          var o = e(7583), r = e(8262), i2 = e(9212), a = e(794), c2 = o.TypeError;
          t.exports = function(t2, n2) {
            var e2, o2;
            if ("string" === n2 && i2(e2 = t2.toString) && !a(o2 = r(e2, t2))) return o2;
            if (i2(e2 = t2.valueOf) && !a(o2 = r(e2, t2))) return o2;
            if ("string" !== n2 && i2(e2 = t2.toString) && !a(o2 = r(e2, t2))) return o2;
            throw c2("Can't convert object to primitive value");
          };
        }, 929: function(t, n, e) {
          var o = e(5897), r = e(7386), i2 = e(9275), a = e(4012), c2 = e(2569), u = r([].concat);
          t.exports = o("Reflect", "ownKeys") || function(t2) {
            var n2 = i2.f(c2(t2)), e2 = a.f;
            return e2 ? u(n2, e2(t2)) : n2;
          };
        }, 1287: function(t, n, e) {
          var o = e(7583);
          t.exports = o;
        }, 544: function(t) {
          t.exports = function(t2) {
            try {
              return { error: false, value: t2() };
            } catch (t3) {
              return { error: true, value: t3 };
            }
          };
        }, 5732: function(t, n, e) {
          var o = e(2569), r = e(794), i2 = e(5084);
          t.exports = function(t2, n2) {
            if (o(t2), r(n2) && n2.constructor === t2) return n2;
            var e2 = i2.f(t2);
            return (0, e2.resolve)(n2), e2.promise;
          };
        }, 2723: function(t) {
          var n = function() {
            this.head = null, this.tail = null;
          };
          n.prototype = { add: function(t2) {
            var n2 = { item: t2, next: null };
            this.head ? this.tail.next = n2 : this.head = n2, this.tail = n2;
          }, get: function() {
            var t2 = this.head;
            if (t2) return this.head = t2.next, this.tail === t2 && (this.tail = null), t2.item;
          } }, t.exports = n;
        }, 6893: function(t, n, e) {
          var o = e(1270);
          t.exports = function(t2, n2, e2) {
            for (var r in n2) o(t2, r, n2[r], e2);
            return t2;
          };
        }, 1270: function(t, n, e) {
          var o = e(7583), r = e(9212), i2 = e(2870), a = e(57), c2 = e(460), u = e(9734), s = e(2743), l = e(4340).CONFIGURABLE, f = s.get, d = s.enforce, v = String(String).split("String");
          (t.exports = function(t2, n2, e2, u2) {
            var s2, f2 = !!u2 && !!u2.unsafe, p = !!u2 && !!u2.enumerable, h = !!u2 && !!u2.noTargetGet, g = u2 && void 0 !== u2.name ? u2.name : n2;
            r(e2) && ("Symbol(" === String(g).slice(0, 7) && (g = "[" + String(g).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), (!i2(e2, "name") || l && e2.name !== g) && a(e2, "name", g), (s2 = d(e2)).source || (s2.source = v.join("string" == typeof g ? g : ""))), t2 !== o ? (f2 ? !h && t2[n2] && (p = true) : delete t2[n2], p ? t2[n2] = e2 : a(t2, n2, e2)) : p ? t2[n2] = e2 : c2(n2, e2);
          })(Function.prototype, "toString", (function() {
            return r(this) && f(this).source || u(this);
          }));
        }, 3955: function(t, n, e) {
          var o = e(7583).TypeError;
          t.exports = function(t2) {
            if (null == t2) throw o("Can't call method on " + t2);
            return t2;
          };
        }, 460: function(t, n, e) {
          var o = e(7583), r = Object.defineProperty;
          t.exports = function(t2, n2) {
            try {
              r(o, t2, { value: n2, configurable: true, writable: true });
            } catch (e2) {
              o[t2] = n2;
            }
            return n2;
          };
        }, 7730: function(t, n, e) {
          var o = e(5897), r = e(4615), i2 = e(3649), a = e(8494), c2 = i2("species");
          t.exports = function(t2) {
            var n2 = o(t2), e2 = r.f;
            a && n2 && !n2[c2] && e2(n2, c2, { configurable: true, get: function() {
              return this;
            } });
          };
        }, 8821: function(t, n, e) {
          var o = e(4615).f, r = e(2870), i2 = e(3649)("toStringTag");
          t.exports = function(t2, n2, e2) {
            t2 && !e2 && (t2 = t2.prototype), t2 && !r(t2, i2) && o(t2, i2, { configurable: true, value: n2 });
          };
        }, 9137: function(t, n, e) {
          var o = e(7836), r = e(8284), i2 = o("keys");
          t.exports = function(t2) {
            return i2[t2] || (i2[t2] = r(t2));
          };
        }, 1314: function(t, n, e) {
          var o = e(7583), r = e(460), i2 = "__core-js_shared__", a = o[i2] || r(i2, {});
          t.exports = a;
        }, 7836: function(t, n, e) {
          var o = e(6268), r = e(1314);
          (t.exports = function(t2, n2) {
            return r[t2] || (r[t2] = void 0 !== n2 ? n2 : {});
          })("versions", []).push({ version: "3.21.1", mode: o ? "pure" : "global", copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE", source: "https://github.com/zloirock/core-js" });
        }, 564: function(t, n, e) {
          var o = e(2569), r = e(1186), i2 = e(3649)("species");
          t.exports = function(t2, n2) {
            var e2, a = o(t2).constructor;
            return void 0 === a || null == (e2 = o(a)[i2]) ? n2 : r(e2);
          };
        }, 6389: function(t, n, e) {
          var o = e(7386), r = e(7486), i2 = e(8320), a = e(3955), c2 = o("".charAt), u = o("".charCodeAt), s = o("".slice), l = function(t2) {
            return function(n2, e2) {
              var o2, l2, f = i2(a(n2)), d = r(e2), v = f.length;
              return d < 0 || d >= v ? t2 ? "" : void 0 : (o2 = u(f, d)) < 55296 || o2 > 56319 || d + 1 === v || (l2 = u(f, d + 1)) < 56320 || l2 > 57343 ? t2 ? c2(f, d) : o2 : t2 ? s(f, d, d + 2) : l2 - 56320 + (o2 - 55296 << 10) + 65536;
            };
          };
          t.exports = { codeAt: l(false), charAt: l(true) };
        }, 8117: function(t, n, e) {
          var o, r, i2, a, c2 = e(7583), u = e(1611), s = e(2938), l = e(9212), f = e(2870), d = e(6544), v = e(482), p = e(6917), h = e(6668), g = e(7520), m2 = e(7020), _ = e(5354), b = c2.setImmediate, y = c2.clearImmediate, w = c2.process, E = c2.Dispatch, L = c2.Function, T = c2.MessageChannel, x = c2.String, C = 0, O = {}, I = "onreadystatechange";
          try {
            o = c2.location;
          } catch (t2) {
          }
          var D = function(t2) {
            if (f(O, t2)) {
              var n2 = O[t2];
              delete O[t2], n2();
            }
          }, $ = function(t2) {
            return function() {
              D(t2);
            };
          }, R = function(t2) {
            D(t2.data);
          }, k = function(t2) {
            c2.postMessage(x(t2), o.protocol + "//" + o.host);
          };
          b && y || (b = function(t2) {
            g(arguments.length, 1);
            var n2 = l(t2) ? t2 : L(t2), e2 = p(arguments, 1);
            return O[++C] = function() {
              u(n2, void 0, e2);
            }, r(C), C;
          }, y = function(t2) {
            delete O[t2];
          }, _ ? r = function(t2) {
            w.nextTick($(t2));
          } : E && E.now ? r = function(t2) {
            E.now($(t2));
          } : T && !m2 ? (a = (i2 = new T()).port2, i2.port1.onmessage = R, r = s(a.postMessage, a)) : c2.addEventListener && l(c2.postMessage) && !c2.importScripts && o && "file:" !== o.protocol && !d(k) ? (r = k, c2.addEventListener("message", R, false)) : r = I in h("script") ? function(t2) {
            v.appendChild(h("script")).onreadystatechange = function() {
              v.removeChild(this), D(t2);
            };
          } : function(t2) {
            setTimeout($(t2), 0);
          }), t.exports = { set: b, clear: y };
        }, 6782: function(t, n, e) {
          var o = e(7486), r = Math.max, i2 = Math.min;
          t.exports = function(t2, n2) {
            var e2 = o(t2);
            return e2 < 0 ? r(e2 + n2, 0) : i2(e2, n2);
          };
        }, 2977: function(t, n, e) {
          var o = e(5044), r = e(3955);
          t.exports = function(t2) {
            return o(r(t2));
          };
        }, 7486: function(t) {
          var n = Math.ceil, e = Math.floor;
          t.exports = function(t2) {
            var o = +t2;
            return o != o || 0 === o ? 0 : (o > 0 ? e : n)(o);
          };
        }, 97: function(t, n, e) {
          var o = e(7486), r = Math.min;
          t.exports = function(t2) {
            return t2 > 0 ? r(o(t2), 9007199254740991) : 0;
          };
        }, 1324: function(t, n, e) {
          var o = e(7583), r = e(3955), i2 = o.Object;
          t.exports = function(t2) {
            return i2(r(t2));
          };
        }, 2670: function(t, n, e) {
          var o = e(7583), r = e(8262), i2 = e(794), a = e(5871), c2 = e(911), u = e(6252), s = e(3649), l = o.TypeError, f = s("toPrimitive");
          t.exports = function(t2, n2) {
            if (!i2(t2) || a(t2)) return t2;
            var e2, o2 = c2(t2, f);
            if (o2) {
              if (void 0 === n2 && (n2 = "default"), e2 = r(o2, t2, n2), !i2(e2) || a(e2)) return e2;
              throw l("Can't convert object to primitive value");
            }
            return void 0 === n2 && (n2 = "number"), u(t2, n2);
          };
        }, 8734: function(t, n, e) {
          var o = e(2670), r = e(5871);
          t.exports = function(t2) {
            var n2 = o(t2, "string");
            return r(n2) ? n2 : n2 + "";
          };
        }, 8191: function(t, n, e) {
          var o = {};
          o[e(3649)("toStringTag")] = "z", t.exports = "[object z]" === String(o);
        }, 8320: function(t, n, e) {
          var o = e(7583), r = e(3058), i2 = o.String;
          t.exports = function(t2) {
            if ("Symbol" === r(t2)) throw TypeError("Cannot convert a Symbol value to a string");
            return i2(t2);
          };
        }, 5637: function(t, n, e) {
          var o = e(7583).String;
          t.exports = function(t2) {
            try {
              return o(t2);
            } catch (t3) {
              return "Object";
            }
          };
        }, 8284: function(t, n, e) {
          var o = e(7386), r = 0, i2 = Math.random(), a = o(1 .toString);
          t.exports = function(t2) {
            return "Symbol(" + (void 0 === t2 ? "" : t2) + ")_" + a(++r + i2, 36);
          };
        }, 7786: function(t, n, e) {
          var o = e(8640);
          t.exports = o && !Symbol.sham && "symbol" == typeof Symbol.iterator;
        }, 7670: function(t, n, e) {
          var o = e(8494), r = e(6544);
          t.exports = o && r((function() {
            return 42 != Object.defineProperty((function() {
            }), "prototype", { value: 42, writable: false }).prototype;
          }));
        }, 7520: function(t, n, e) {
          var o = e(7583).TypeError;
          t.exports = function(t2, n2) {
            if (t2 < n2) throw o("Not enough arguments");
            return t2;
          };
        }, 491: function(t, n, e) {
          var o = e(3649);
          n.f = o;
        }, 3649: function(t, n, e) {
          var o = e(7583), r = e(7836), i2 = e(2870), a = e(8284), c2 = e(8640), u = e(7786), s = r("wks"), l = o.Symbol, f = l && l.for, d = u ? l : l && l.withoutSetter || a;
          t.exports = function(t2) {
            if (!i2(s, t2) || !c2 && "string" != typeof s[t2]) {
              var n2 = "Symbol." + t2;
              c2 && i2(l, t2) ? s[t2] = l[t2] : s[t2] = u && f ? f(n2) : d(n2);
            }
            return s[t2];
          };
        }, 1719: function(t, n, e) {
          var o = e(7263), r = e(7583), i2 = e(2447), a = e(729), c2 = e(7496), u = e(3478), s = e(3590), l = e(57), f = e(4677), d = e(1509), v = e(4402), p = e(4026), h = e(2764), g = e(3649), m2 = e(1178), _ = g("toStringTag"), b = r.Error, y = [].push, w = function(t2, n2) {
            var e2, o2 = arguments.length > 2 ? arguments[2] : void 0, r2 = i2(E, this);
            c2 ? e2 = c2(new b(), r2 ? a(this) : E) : (e2 = r2 ? this : s(E), l(e2, _, "Error")), void 0 !== n2 && l(e2, "message", h(n2)), m2 && l(e2, "stack", d(e2.stack, 1)), v(e2, o2);
            var u2 = [];
            return p(t2, y, { that: u2 }), l(e2, "errors", u2), e2;
          };
          c2 ? c2(w, b) : u(w, b, { name: true });
          var E = w.prototype = s(b.prototype, { constructor: f(1, w), message: f(1, ""), name: f(1, "AggregateError") });
          o({ global: true }, { AggregateError: w });
        }, 1646: function(t, n, e) {
          var o = e(7263), r = e(7583), i2 = e(6544), a = e(4521), c2 = e(794), u = e(1324), s = e(1825), l = e(5999), f = e(4822), d = e(9269), v = e(3649), p = e(4061), h = v("isConcatSpreadable"), g = 9007199254740991, m2 = "Maximum allowed index exceeded", _ = r.TypeError, b = p >= 51 || !i2((function() {
            var t2 = [];
            return t2[h] = false, t2.concat()[0] !== t2;
          })), y = d("concat"), w = function(t2) {
            if (!c2(t2)) return false;
            var n2 = t2[h];
            return void 0 !== n2 ? !!n2 : a(t2);
          };
          o({ target: "Array", proto: true, forced: !b || !y }, { concat: function(t2) {
            var n2, e2, o2, r2, i3, a2 = u(this), c3 = f(a2, 0), d2 = 0;
            for (n2 = -1, o2 = arguments.length; n2 < o2; n2++) if (w(i3 = -1 === n2 ? a2 : arguments[n2])) {
              if (d2 + (r2 = s(i3)) > g) throw _(m2);
              for (e2 = 0; e2 < r2; e2++, d2++) e2 in i3 && l(c3, d2, i3[e2]);
            } else {
              if (d2 >= g) throw _(m2);
              l(c3, d2++, i3);
            }
            return c3.length = d2, c3;
          } });
        }, 5677: function(t, n, e) {
          var o = e(2977), r = e(6288), i2 = e(339), a = e(2743), c2 = e(4615).f, u = e(9012), s = e(6268), l = e(8494), f = "Array Iterator", d = a.set, v = a.getterFor(f);
          t.exports = u(Array, "Array", (function(t2, n2) {
            d(this, { type: f, target: o(t2), index: 0, kind: n2 });
          }), (function() {
            var t2 = v(this), n2 = t2.target, e2 = t2.kind, o2 = t2.index++;
            return !n2 || o2 >= n2.length ? (t2.target = void 0, { value: void 0, done: true }) : "keys" == e2 ? { value: o2, done: false } : "values" == e2 ? { value: n2[o2], done: false } : { value: [o2, n2[o2]], done: false };
          }), "values");
          var p = i2.Arguments = i2.Array;
          if (r("keys"), r("values"), r("entries"), !s && l && "values" !== p.name) try {
            c2(p, "name", { value: "values" });
          } catch (t2) {
          }
        }, 6956: function(t, n, e) {
          var o = e(7583);
          e(8821)(o.JSON, "JSON", true);
        }, 5222: function(t, n, e) {
          e(8821)(Math, "Math", true);
        }, 6394: function(t, n, e) {
          var o = e(8191), r = e(1270), i2 = e(3060);
          o || r(Object.prototype, "toString", i2, { unsafe: true });
        }, 6969: function(t, n, e) {
          var o = e(7263), r = e(8262), i2 = e(8257), a = e(5084), c2 = e(544), u = e(4026);
          o({ target: "Promise", stat: true }, { allSettled: function(t2) {
            var n2 = this, e2 = a.f(n2), o2 = e2.resolve, s = e2.reject, l = c2((function() {
              var e3 = i2(n2.resolve), a2 = [], c3 = 0, s2 = 1;
              u(t2, (function(t3) {
                var i3 = c3++, u2 = false;
                s2++, r(e3, n2, t3).then((function(t4) {
                  u2 || (u2 = true, a2[i3] = { status: "fulfilled", value: t4 }, --s2 || o2(a2));
                }), (function(t4) {
                  u2 || (u2 = true, a2[i3] = { status: "rejected", reason: t4 }, --s2 || o2(a2));
                }));
              })), --s2 || o2(a2);
            }));
            return l.error && s(l.value), e2.promise;
          } });
        }, 2021: function(t, n, e) {
          var o = e(7263), r = e(8257), i2 = e(5897), a = e(8262), c2 = e(5084), u = e(544), s = e(4026), l = "No one promise resolved";
          o({ target: "Promise", stat: true }, { any: function(t2) {
            var n2 = this, e2 = i2("AggregateError"), o2 = c2.f(n2), f = o2.resolve, d = o2.reject, v = u((function() {
              var o3 = r(n2.resolve), i3 = [], c3 = 0, u2 = 1, v2 = false;
              s(t2, (function(t3) {
                var r2 = c3++, s2 = false;
                u2++, a(o3, n2, t3).then((function(t4) {
                  s2 || v2 || (v2 = true, f(t4));
                }), (function(t4) {
                  s2 || v2 || (s2 = true, i3[r2] = t4, --u2 || d(new e2(i3, l)));
                }));
              })), --u2 || d(new e2(i3, l));
            }));
            return v.error && d(v.value), o2.promise;
          } });
        }, 8328: function(t, n, e) {
          var o = e(7263), r = e(6268), i2 = e(783), a = e(6544), c2 = e(5897), u = e(9212), s = e(564), l = e(5732), f = e(1270);
          if (o({ target: "Promise", proto: true, real: true, forced: !!i2 && a((function() {
            i2.prototype.finally.call({ then: function() {
            } }, (function() {
            }));
          })) }, { finally: function(t2) {
            var n2 = s(this, c2("Promise")), e2 = u(t2);
            return this.then(e2 ? function(e3) {
              return l(n2, t2()).then((function() {
                return e3;
              }));
            } : t2, e2 ? function(e3) {
              return l(n2, t2()).then((function() {
                throw e3;
              }));
            } : t2);
          } }), !r && u(i2)) {
            var d = c2("Promise").prototype.finally;
            i2.prototype.finally !== d && f(i2.prototype, "finally", d, { unsafe: true });
          }
        }, 5334: function(t, n, e) {
          var o, r, i2, a, c2 = e(7263), u = e(6268), s = e(7583), l = e(5897), f = e(8262), d = e(783), v = e(1270), p = e(6893), h = e(7496), g = e(8821), m2 = e(7730), _ = e(8257), b = e(9212), y = e(794), w = e(4761), E = e(9734), L = e(4026), T = e(3616), x = e(564), C = e(8117).set, O = e(2095), I = e(5732), D = e(2716), $ = e(5084), R = e(544), k = e(2723), P2 = e(2743), M = e(4451), S = e(3649), j = e(2274), B = e(5354), A = e(4061), U = S("species"), G = "Promise", N = P2.getterFor(G), V = P2.set, W = P2.getterFor(G), K = d && d.prototype, H = d, F = K, Z = s.TypeError, q = s.document, X = s.process, z = $.f, Y = z, J = !!(q && q.createEvent && s.dispatchEvent), Q = b(s.PromiseRejectionEvent), tt = "unhandledrejection", nt = false, et = M(G, (function() {
            var t2 = E(H), n2 = t2 !== String(H);
            if (!n2 && 66 === A) return true;
            if (u && !F.finally) return true;
            if (A >= 51 && /native code/.test(t2)) return false;
            var e2 = new H((function(t3) {
              t3(1);
            })), o2 = function(t3) {
              t3((function() {
              }), (function() {
              }));
            };
            return (e2.constructor = {})[U] = o2, !(nt = e2.then((function() {
            })) instanceof o2) || !n2 && j && !Q;
          })), ot = et || !T((function(t2) {
            H.all(t2).catch((function() {
            }));
          })), rt = function(t2) {
            var n2;
            return !(!y(t2) || !b(n2 = t2.then)) && n2;
          }, it = function(t2, n2) {
            var e2, o2, r2, i3 = n2.value, a2 = 1 == n2.state, c3 = a2 ? t2.ok : t2.fail, u2 = t2.resolve, s2 = t2.reject, l2 = t2.domain;
            try {
              c3 ? (a2 || (2 === n2.rejection && lt(n2), n2.rejection = 1), true === c3 ? e2 = i3 : (l2 && l2.enter(), e2 = c3(i3), l2 && (l2.exit(), r2 = true)), e2 === t2.promise ? s2(Z("Promise-chain cycle")) : (o2 = rt(e2)) ? f(o2, e2, u2, s2) : u2(e2)) : s2(i3);
            } catch (t3) {
              l2 && !r2 && l2.exit(), s2(t3);
            }
          }, at = function(t2, n2) {
            t2.notified || (t2.notified = true, O((function() {
              for (var e2, o2 = t2.reactions; e2 = o2.get(); ) it(e2, t2);
              t2.notified = false, n2 && !t2.rejection && ut(t2);
            })));
          }, ct = function(t2, n2, e2) {
            var o2, r2;
            J ? ((o2 = q.createEvent("Event")).promise = n2, o2.reason = e2, o2.initEvent(t2, false, true), s.dispatchEvent(o2)) : o2 = { promise: n2, reason: e2 }, !Q && (r2 = s["on" + t2]) ? r2(o2) : t2 === tt && D("Unhandled promise rejection", e2);
          }, ut = function(t2) {
            f(C, s, (function() {
              var n2, e2 = t2.facade, o2 = t2.value;
              if (st(t2) && (n2 = R((function() {
                B ? X.emit("unhandledRejection", o2, e2) : ct(tt, e2, o2);
              })), t2.rejection = B || st(t2) ? 2 : 1, n2.error)) throw n2.value;
            }));
          }, st = function(t2) {
            return 1 !== t2.rejection && !t2.parent;
          }, lt = function(t2) {
            f(C, s, (function() {
              var n2 = t2.facade;
              B ? X.emit("rejectionHandled", n2) : ct("rejectionhandled", n2, t2.value);
            }));
          }, ft = function(t2, n2, e2) {
            return function(o2) {
              t2(n2, o2, e2);
            };
          }, dt = function(t2, n2, e2) {
            t2.done || (t2.done = true, e2 && (t2 = e2), t2.value = n2, t2.state = 2, at(t2, true));
          }, vt = function t2(n2, e2, o2) {
            if (!n2.done) {
              n2.done = true, o2 && (n2 = o2);
              try {
                if (n2.facade === e2) throw Z("Promise can't be resolved itself");
                var r2 = rt(e2);
                r2 ? O((function() {
                  var o3 = { done: false };
                  try {
                    f(r2, e2, ft(t2, o3, n2), ft(dt, o3, n2));
                  } catch (t3) {
                    dt(o3, t3, n2);
                  }
                })) : (n2.value = e2, n2.state = 1, at(n2, false));
              } catch (t3) {
                dt({ done: false }, t3, n2);
              }
            }
          };
          if (et && (F = (H = function(t2) {
            w(this, F), _(t2), f(o, this);
            var n2 = N(this);
            try {
              t2(ft(vt, n2), ft(dt, n2));
            } catch (t3) {
              dt(n2, t3);
            }
          }).prototype, (o = function(t2) {
            V(this, { type: G, done: false, notified: false, parent: false, reactions: new k(), rejection: false, state: 0, value: void 0 });
          }).prototype = p(F, { then: function(t2, n2) {
            var e2 = W(this), o2 = z(x(this, H));
            return e2.parent = true, o2.ok = !b(t2) || t2, o2.fail = b(n2) && n2, o2.domain = B ? X.domain : void 0, 0 == e2.state ? e2.reactions.add(o2) : O((function() {
              it(o2, e2);
            })), o2.promise;
          }, catch: function(t2) {
            return this.then(void 0, t2);
          } }), r = function() {
            var t2 = new o(), n2 = N(t2);
            this.promise = t2, this.resolve = ft(vt, n2), this.reject = ft(dt, n2);
          }, $.f = z = function(t2) {
            return t2 === H || t2 === i2 ? new r(t2) : Y(t2);
          }, !u && b(d) && K !== Object.prototype)) {
            a = K.then, nt || (v(K, "then", (function(t2, n2) {
              var e2 = this;
              return new H((function(t3, n3) {
                f(a, e2, t3, n3);
              })).then(t2, n2);
            }), { unsafe: true }), v(K, "catch", F.catch, { unsafe: true }));
            try {
              delete K.constructor;
            } catch (t2) {
            }
            h && h(K, F);
          }
          c2({ global: true, wrap: true, forced: et }, { Promise: H }), g(H, G, false, true), m2(G), i2 = l(G), c2({ target: G, stat: true, forced: et }, { reject: function(t2) {
            var n2 = z(this);
            return f(n2.reject, void 0, t2), n2.promise;
          } }), c2({ target: G, stat: true, forced: u || et }, { resolve: function(t2) {
            return I(u && this === i2 ? H : this, t2);
          } }), c2({ target: G, stat: true, forced: ot }, { all: function(t2) {
            var n2 = this, e2 = z(n2), o2 = e2.resolve, r2 = e2.reject, i3 = R((function() {
              var e3 = _(n2.resolve), i4 = [], a2 = 0, c3 = 1;
              L(t2, (function(t3) {
                var u2 = a2++, s2 = false;
                c3++, f(e3, n2, t3).then((function(t4) {
                  s2 || (s2 = true, i4[u2] = t4, --c3 || o2(i4));
                }), r2);
              })), --c3 || o2(i4);
            }));
            return i3.error && r2(i3.value), e2.promise;
          }, race: function(t2) {
            var n2 = this, e2 = z(n2), o2 = e2.reject, r2 = R((function() {
              var r3 = _(n2.resolve);
              L(t2, (function(t3) {
                f(r3, n2, t3).then(e2.resolve, o2);
              }));
            }));
            return r2.error && o2(r2.value), e2.promise;
          } });
        }, 2257: function(t, n, e) {
          var o = e(7263), r = e(7583), i2 = e(8821);
          o({ global: true }, { Reflect: {} }), i2(r.Reflect, "Reflect", true);
        }, 2129: function(t, n, e) {
          var o = e(6389).charAt, r = e(8320), i2 = e(2743), a = e(9012), c2 = "String Iterator", u = i2.set, s = i2.getterFor(c2);
          a(String, "String", (function(t2) {
            u(this, { type: c2, string: r(t2), index: 0 });
          }), (function() {
            var t2, n2 = s(this), e2 = n2.string, r2 = n2.index;
            return r2 >= e2.length ? { value: void 0, done: true } : (t2 = o(e2, r2), n2.index += t2.length, { value: t2, done: false });
          }));
        }, 462: function(t, n, e) {
          e(2219)("asyncIterator");
        }, 8407: function(t, n, e) {
          var o = e(7263), r = e(8494), i2 = e(7583), a = e(7386), c2 = e(2870), u = e(9212), s = e(2447), l = e(8320), f = e(4615).f, d = e(3478), v = i2.Symbol, p = v && v.prototype;
          if (r && u(v) && (!("description" in p) || void 0 !== v().description)) {
            var h = {}, g = function() {
              var t2 = arguments.length < 1 || void 0 === arguments[0] ? void 0 : l(arguments[0]), n2 = s(p, this) ? new v(t2) : void 0 === t2 ? v() : v(t2);
              return "" === t2 && (h[n2] = true), n2;
            };
            d(g, v), g.prototype = p, p.constructor = g;
            var m2 = "Symbol(test)" == String(v("test")), _ = a(p.toString), b = a(p.valueOf), y = /^Symbol\((.*)\)[^)]+$/, w = a("".replace), E = a("".slice);
            f(p, "description", { configurable: true, get: function() {
              var t2 = b(this), n2 = _(t2);
              if (c2(h, t2)) return "";
              var e2 = m2 ? E(n2, 7, -1) : w(n2, y, "$1");
              return "" === e2 ? void 0 : e2;
            } }), o({ global: true, forced: true }, { Symbol: g });
          }
        }, 2429: function(t, n, e) {
          e(2219)("hasInstance");
        }, 1172: function(t, n, e) {
          e(2219)("isConcatSpreadable");
        }, 8288: function(t, n, e) {
          e(2219)("iterator");
        }, 2004: function(t, n, e) {
          var o = e(7263), r = e(7583), i2 = e(5897), a = e(1611), c2 = e(8262), u = e(7386), s = e(6268), l = e(8494), f = e(8640), d = e(6544), v = e(2870), p = e(4521), h = e(9212), g = e(794), m2 = e(2447), _ = e(5871), b = e(2569), y = e(1324), w = e(2977), E = e(8734), L = e(8320), T = e(4677), x = e(3590), C = e(5432), O = e(9275), I = e(3130), D = e(4012), $ = e(6683), R = e(4615), k = e(8728), P2 = e(112), M = e(6917), S = e(1270), j = e(7836), B = e(9137), A = e(4639), U = e(8284), G = e(3649), N = e(491), V = e(2219), W = e(8821), K = e(2743), H = e(4805).forEach, F = B("hidden"), Z = "Symbol", q = G("toPrimitive"), X = K.set, z = K.getterFor(Z), Y = Object.prototype, J = r.Symbol, Q = J && J.prototype, tt = r.TypeError, nt = r.QObject, et = i2("JSON", "stringify"), ot = $.f, rt = R.f, it = I.f, at = P2.f, ct = u([].push), ut = j("symbols"), st = j("op-symbols"), lt = j("string-to-symbol-registry"), ft = j("symbol-to-string-registry"), dt = j("wks"), vt = !nt || !nt.prototype || !nt.prototype.findChild, pt = l && d((function() {
            return 7 != x(rt({}, "a", { get: function() {
              return rt(this, "a", { value: 7 }).a;
            } })).a;
          })) ? function(t2, n2, e2) {
            var o2 = ot(Y, n2);
            o2 && delete Y[n2], rt(t2, n2, e2), o2 && t2 !== Y && rt(Y, n2, o2);
          } : rt, ht = function(t2, n2) {
            var e2 = ut[t2] = x(Q);
            return X(e2, { type: Z, tag: t2, description: n2 }), l || (e2.description = n2), e2;
          }, gt = function(t2, n2, e2) {
            t2 === Y && gt(st, n2, e2), b(t2);
            var o2 = E(n2);
            return b(e2), v(ut, o2) ? (e2.enumerable ? (v(t2, F) && t2[F][o2] && (t2[F][o2] = false), e2 = x(e2, { enumerable: T(0, false) })) : (v(t2, F) || rt(t2, F, T(1, {})), t2[F][o2] = true), pt(t2, o2, e2)) : rt(t2, o2, e2);
          }, mt = function(t2, n2) {
            b(t2);
            var e2 = w(n2), o2 = C(e2).concat(wt(e2));
            return H(o2, (function(n3) {
              l && !c2(_t, e2, n3) || gt(t2, n3, e2[n3]);
            })), t2;
          }, _t = function(t2) {
            var n2 = E(t2), e2 = c2(at, this, n2);
            return !(this === Y && v(ut, n2) && !v(st, n2)) && (!(e2 || !v(this, n2) || !v(ut, n2) || v(this, F) && this[F][n2]) || e2);
          }, bt = function(t2, n2) {
            var e2 = w(t2), o2 = E(n2);
            if (e2 !== Y || !v(ut, o2) || v(st, o2)) {
              var r2 = ot(e2, o2);
              return !r2 || !v(ut, o2) || v(e2, F) && e2[F][o2] || (r2.enumerable = true), r2;
            }
          }, yt = function(t2) {
            var n2 = it(w(t2)), e2 = [];
            return H(n2, (function(t3) {
              v(ut, t3) || v(A, t3) || ct(e2, t3);
            })), e2;
          }, wt = function(t2) {
            var n2 = t2 === Y, e2 = it(n2 ? st : w(t2)), o2 = [];
            return H(e2, (function(t3) {
              !v(ut, t3) || n2 && !v(Y, t3) || ct(o2, ut[t3]);
            })), o2;
          };
          (f || (J = function() {
            if (m2(Q, this)) throw tt("Symbol is not a constructor");
            var t2 = arguments.length && void 0 !== arguments[0] ? L(arguments[0]) : void 0, n2 = U(t2), e2 = function t3(e3) {
              this === Y && c2(t3, st, e3), v(this, F) && v(this[F], n2) && (this[F][n2] = false), pt(this, n2, T(1, e3));
            };
            return l && vt && pt(Y, n2, { configurable: true, set: e2 }), ht(n2, t2);
          }, S(Q = J.prototype, "toString", (function() {
            return z(this).tag;
          })), S(J, "withoutSetter", (function(t2) {
            return ht(U(t2), t2);
          })), P2.f = _t, R.f = gt, k.f = mt, $.f = bt, O.f = I.f = yt, D.f = wt, N.f = function(t2) {
            return ht(G(t2), t2);
          }, l && (rt(Q, "description", { configurable: true, get: function() {
            return z(this).description;
          } }), s || S(Y, "propertyIsEnumerable", _t, { unsafe: true }))), o({ global: true, wrap: true, forced: !f, sham: !f }, { Symbol: J }), H(C(dt), (function(t2) {
            V(t2);
          })), o({ target: Z, stat: true, forced: !f }, { for: function(t2) {
            var n2 = L(t2);
            if (v(lt, n2)) return lt[n2];
            var e2 = J(n2);
            return lt[n2] = e2, ft[e2] = n2, e2;
          }, keyFor: function(t2) {
            if (!_(t2)) throw tt(t2 + " is not a symbol");
            if (v(ft, t2)) return ft[t2];
          }, useSetter: function() {
            vt = true;
          }, useSimple: function() {
            vt = false;
          } }), o({ target: "Object", stat: true, forced: !f, sham: !l }, { create: function(t2, n2) {
            return void 0 === n2 ? x(t2) : mt(x(t2), n2);
          }, defineProperty: gt, defineProperties: mt, getOwnPropertyDescriptor: bt }), o({ target: "Object", stat: true, forced: !f }, { getOwnPropertyNames: yt, getOwnPropertySymbols: wt }), o({ target: "Object", stat: true, forced: d((function() {
            D.f(1);
          })) }, { getOwnPropertySymbols: function(t2) {
            return D.f(y(t2));
          } }), et) && o({ target: "JSON", stat: true, forced: !f || d((function() {
            var t2 = J();
            return "[null]" != et([t2]) || "{}" != et({ a: t2 }) || "{}" != et(Object(t2));
          })) }, { stringify: function(t2, n2, e2) {
            var o2 = M(arguments), r2 = n2;
            if ((g(n2) || void 0 !== t2) && !_(t2)) return p(n2) || (n2 = function(t3, n3) {
              if (h(r2) && (n3 = c2(r2, this, t3, n3)), !_(n3)) return n3;
            }), o2[1] = n2, a(et, null, o2);
          } });
          if (!Q[q]) {
            var Et = Q.valueOf;
            S(Q, q, (function(t2) {
              return c2(Et, this);
            }));
          }
          W(J, Z), A[F] = true;
        }, 8201: function(t, n, e) {
          e(2219)("matchAll");
        }, 1274: function(t, n, e) {
          e(2219)("match");
        }, 6626: function(t, n, e) {
          e(2219)("replace");
        }, 3211: function(t, n, e) {
          e(2219)("search");
        }, 9952: function(t, n, e) {
          e(2219)("species");
        }, 15: function(t, n, e) {
          e(2219)("split");
        }, 9831: function(t, n, e) {
          e(2219)("toPrimitive");
        }, 7521: function(t, n, e) {
          e(2219)("toStringTag");
        }, 2972: function(t, n, e) {
          e(2219)("unscopables");
        }, 4655: function(t, n, e) {
          var o = e(7583), r = e(6778), i2 = e(9307), a = e(5677), c2 = e(57), u = e(3649), s = u("iterator"), l = u("toStringTag"), f = a.values, d = function(t2, n2) {
            if (t2) {
              if (t2[s] !== f) try {
                c2(t2, s, f);
              } catch (n3) {
                t2[s] = f;
              }
              if (t2[l] || c2(t2, l, n2), r[n2]) {
                for (var e2 in a) if (t2[e2] !== a[e2]) try {
                  c2(t2, e2, a[e2]);
                } catch (n3) {
                  t2[e2] = a[e2];
                }
              }
            }
          };
          for (var v in r) d(o[v] && o[v].prototype, v);
          d(i2, "DOMTokenList");
        }, 8765: function(t, n, e) {
          var o = e(5036);
          e(4655), t.exports = o;
        }, 5441: function(t, n, e) {
          var o = e(2582);
          e(4655), t.exports = o;
        }, 7705: function(t) {
          t.exports = function(t2) {
            var n = [];
            return n.toString = function() {
              return this.map((function(n2) {
                var e = "", o = void 0 !== n2[5];
                return n2[4] && (e += "@supports (".concat(n2[4], ") {")), n2[2] && (e += "@media ".concat(n2[2], " {")), o && (e += "@layer".concat(n2[5].length > 0 ? " ".concat(n2[5]) : "", " {")), e += t2(n2), o && (e += "}"), n2[2] && (e += "}"), n2[4] && (e += "}"), e;
              })).join("");
            }, n.i = function(t3, e, o, r, i2) {
              "string" == typeof t3 && (t3 = [[null, t3, void 0]]);
              var a = {};
              if (o) for (var c2 = 0; c2 < this.length; c2++) {
                var u = this[c2][0];
                null != u && (a[u] = true);
              }
              for (var s = 0; s < t3.length; s++) {
                var l = [].concat(t3[s]);
                o && a[l[0]] || (void 0 !== i2 && (void 0 === l[5] || (l[1] = "@layer".concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {").concat(l[1], "}")), l[5] = i2), e && (l[2] ? (l[1] = "@media ".concat(l[2], " {").concat(l[1], "}"), l[2] = e) : l[2] = e), r && (l[4] ? (l[1] = "@supports (".concat(l[4], ") {").concat(l[1], "}"), l[4] = r) : l[4] = "".concat(r)), n.push(l));
              }
            }, n;
          };
        }, 6738: function(t) {
          t.exports = function(t2) {
            return t2[1];
          };
        }, 8679: function(t) {
          var n = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, e = window.WeakMap;
          if (void 0 === e) {
            var o = Object.defineProperty, r = Date.now() % 1e9;
            (e = function() {
              this.name = "__st" + (1e9 * Math.random() >>> 0) + r++ + "__";
            }).prototype = { set: function(t2, n2) {
              var e2 = t2[this.name];
              return e2 && e2[0] === t2 ? e2[1] = n2 : o(t2, this.name, { value: [t2, n2], writable: true }), this;
            }, get: function(t2) {
              var n2;
              return (n2 = t2[this.name]) && n2[0] === t2 ? n2[1] : void 0;
            }, delete: function(t2) {
              var n2 = t2[this.name];
              if (!n2) return false;
              var e2 = n2[0] === t2;
              return n2[0] = n2[1] = void 0, e2;
            }, has: function(t2) {
              var n2 = t2[this.name];
              return !!n2 && n2[0] === t2;
            } };
          }
          var i2 = new e(), a = window.msSetImmediate;
          if (!a) {
            var c2 = [], u = String(Math.random());
            window.addEventListener("message", (function(t2) {
              if (t2.data === u) {
                var n2 = c2;
                c2 = [], n2.forEach((function(t3) {
                  t3();
                }));
              }
            })), a = function(t2) {
              c2.push(t2), window.postMessage(u, "*");
            };
          }
          var s = false, l = [];
          function f() {
            s = false;
            var t2 = l;
            l = [], t2.sort((function(t3, n3) {
              return t3.uid_ - n3.uid_;
            }));
            var n2 = false;
            t2.forEach((function(t3) {
              var e2 = t3.takeRecords();
              !(function(t4) {
                t4.nodes_.forEach((function(n3) {
                  var e3 = i2.get(n3);
                  e3 && e3.forEach((function(n4) {
                    n4.observer === t4 && n4.removeTransientObservers();
                  }));
                }));
              })(t3), e2.length && (t3.callback_(e2, t3), n2 = true);
            })), n2 && f();
          }
          function d(t2, n2) {
            for (var e2 = t2; e2; e2 = e2.parentNode) {
              var o2 = i2.get(e2);
              if (o2) for (var r2 = 0; r2 < o2.length; r2++) {
                var a2 = o2[r2], c3 = a2.options;
                if (e2 === t2 || c3.subtree) {
                  var u2 = n2(c3);
                  u2 && a2.enqueue(u2);
                }
              }
            }
          }
          var v, p, h = 0;
          function g(t2) {
            this.callback_ = t2, this.nodes_ = [], this.records_ = [], this.uid_ = ++h;
          }
          function m2(t2, n2) {
            this.type = t2, this.target = n2, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null;
          }
          function _(t2, n2) {
            return v = new m2(t2, n2);
          }
          function b(t2) {
            return p || ((e2 = new m2((n2 = v).type, n2.target)).addedNodes = n2.addedNodes.slice(), e2.removedNodes = n2.removedNodes.slice(), e2.previousSibling = n2.previousSibling, e2.nextSibling = n2.nextSibling, e2.attributeName = n2.attributeName, e2.attributeNamespace = n2.attributeNamespace, e2.oldValue = n2.oldValue, (p = e2).oldValue = t2, p);
            var n2, e2;
          }
          function y(t2, n2) {
            return t2 === n2 ? t2 : p && ((e2 = t2) === p || e2 === v) ? p : null;
            var e2;
          }
          function w(t2, n2, e2) {
            this.observer = t2, this.target = n2, this.options = e2, this.transientObservedNodes = [];
          }
          g.prototype = { observe: function(t2, n2) {
            var e2;
            if (e2 = t2, t2 = window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e2) || e2, !n2.childList && !n2.attributes && !n2.characterData || n2.attributeOldValue && !n2.attributes || n2.attributeFilter && n2.attributeFilter.length && !n2.attributes || n2.characterDataOldValue && !n2.characterData) throw new SyntaxError();
            var o2, r2 = i2.get(t2);
            r2 || i2.set(t2, r2 = []);
            for (var a2 = 0; a2 < r2.length; a2++) if (r2[a2].observer === this) {
              (o2 = r2[a2]).removeListeners(), o2.options = n2;
              break;
            }
            o2 || (o2 = new w(this, t2, n2), r2.push(o2), this.nodes_.push(t2)), o2.addListeners();
          }, disconnect: function() {
            this.nodes_.forEach((function(t2) {
              for (var n2 = i2.get(t2), e2 = 0; e2 < n2.length; e2++) {
                var o2 = n2[e2];
                if (o2.observer === this) {
                  o2.removeListeners(), n2.splice(e2, 1);
                  break;
                }
              }
            }), this), this.records_ = [];
          }, takeRecords: function() {
            var t2 = this.records_;
            return this.records_ = [], t2;
          } }, w.prototype = { enqueue: function(t2) {
            var n2, e2 = this.observer.records_, o2 = e2.length;
            if (e2.length > 0) {
              var r2 = y(e2[o2 - 1], t2);
              if (r2) return void (e2[o2 - 1] = r2);
            } else n2 = this.observer, l.push(n2), s || (s = true, a(f));
            e2[o2] = t2;
          }, addListeners: function() {
            this.addListeners_(this.target);
          }, addListeners_: function(t2) {
            var n2 = this.options;
            n2.attributes && t2.addEventListener("DOMAttrModified", this, true), n2.characterData && t2.addEventListener("DOMCharacterDataModified", this, true), n2.childList && t2.addEventListener("DOMNodeInserted", this, true), (n2.childList || n2.subtree) && t2.addEventListener("DOMNodeRemoved", this, true);
          }, removeListeners: function() {
            this.removeListeners_(this.target);
          }, removeListeners_: function(t2) {
            var n2 = this.options;
            n2.attributes && t2.removeEventListener("DOMAttrModified", this, true), n2.characterData && t2.removeEventListener("DOMCharacterDataModified", this, true), n2.childList && t2.removeEventListener("DOMNodeInserted", this, true), (n2.childList || n2.subtree) && t2.removeEventListener("DOMNodeRemoved", this, true);
          }, addTransientObserver: function(t2) {
            if (t2 !== this.target) {
              this.addListeners_(t2), this.transientObservedNodes.push(t2);
              var n2 = i2.get(t2);
              n2 || i2.set(t2, n2 = []), n2.push(this);
            }
          }, removeTransientObservers: function() {
            var t2 = this.transientObservedNodes;
            this.transientObservedNodes = [], t2.forEach((function(t3) {
              this.removeListeners_(t3);
              for (var n2 = i2.get(t3), e2 = 0; e2 < n2.length; e2++) if (n2[e2] === this) {
                n2.splice(e2, 1);
                break;
              }
            }), this);
          }, handleEvent: function(t2) {
            switch (t2.stopImmediatePropagation(), t2.type) {
              case "DOMAttrModified":
                var n2 = t2.attrName, e2 = t2.relatedNode.namespaceURI, o2 = t2.target;
                (i3 = new _("attributes", o2)).attributeName = n2, i3.attributeNamespace = e2;
                var r2 = null;
                "undefined" != typeof MutationEvent && t2.attrChange === MutationEvent.ADDITION || (r2 = t2.prevValue), d(o2, (function(t3) {
                  if (t3.attributes && (!t3.attributeFilter || !t3.attributeFilter.length || -1 !== t3.attributeFilter.indexOf(n2) || -1 !== t3.attributeFilter.indexOf(e2))) return t3.attributeOldValue ? b(r2) : i3;
                }));
                break;
              case "DOMCharacterDataModified":
                var i3 = _("characterData", o2 = t2.target);
                r2 = t2.prevValue;
                d(o2, (function(t3) {
                  if (t3.characterData) return t3.characterDataOldValue ? b(r2) : i3;
                }));
                break;
              case "DOMNodeRemoved":
                this.addTransientObserver(t2.target);
              case "DOMNodeInserted":
                o2 = t2.relatedNode;
                var a2, c3, u2 = t2.target;
                "DOMNodeInserted" === t2.type ? (a2 = [u2], c3 = []) : (a2 = [], c3 = [u2]);
                var s2 = u2.previousSibling, l2 = u2.nextSibling;
                (i3 = _("childList", o2)).addedNodes = a2, i3.removedNodes = c3, i3.previousSibling = s2, i3.nextSibling = l2, d(o2, (function(t3) {
                  if (t3.childList) return i3;
                }));
            }
            v = p = void 0;
          } }, n || (n = g), t.exports = n;
        }, 7588: function(t) {
          var n = (function(t2) {
            var n2, e = Object.prototype, o = e.hasOwnProperty, r = "function" == typeof Symbol ? Symbol : {}, i2 = r.iterator || "@@iterator", a = r.asyncIterator || "@@asyncIterator", c2 = r.toStringTag || "@@toStringTag";
            function u(t3, n3, e2) {
              return Object.defineProperty(t3, n3, { value: e2, enumerable: true, configurable: true, writable: true }), t3[n3];
            }
            try {
              u({}, "");
            } catch (t3) {
              u = function(t4, n3, e2) {
                return t4[n3] = e2;
              };
            }
            function s(t3, n3, e2, o2) {
              var r2 = n3 && n3.prototype instanceof g ? n3 : g, i3 = Object.create(r2.prototype), a2 = new I(o2 || []);
              return i3._invoke = /* @__PURE__ */ (function(t4, n4, e3) {
                var o3 = f;
                return function(r3, i4) {
                  if (o3 === v) throw new Error("Generator is already running");
                  if (o3 === p) {
                    if ("throw" === r3) throw i4;
                    return $();
                  }
                  for (e3.method = r3, e3.arg = i4; ; ) {
                    var a3 = e3.delegate;
                    if (a3) {
                      var c3 = x(a3, e3);
                      if (c3) {
                        if (c3 === h) continue;
                        return c3;
                      }
                    }
                    if ("next" === e3.method) e3.sent = e3._sent = e3.arg;
                    else if ("throw" === e3.method) {
                      if (o3 === f) throw o3 = p, e3.arg;
                      e3.dispatchException(e3.arg);
                    } else "return" === e3.method && e3.abrupt("return", e3.arg);
                    o3 = v;
                    var u2 = l(t4, n4, e3);
                    if ("normal" === u2.type) {
                      if (o3 = e3.done ? p : d, u2.arg === h) continue;
                      return { value: u2.arg, done: e3.done };
                    }
                    "throw" === u2.type && (o3 = p, e3.method = "throw", e3.arg = u2.arg);
                  }
                };
              })(t3, e2, a2), i3;
            }
            function l(t3, n3, e2) {
              try {
                return { type: "normal", arg: t3.call(n3, e2) };
              } catch (t4) {
                return { type: "throw", arg: t4 };
              }
            }
            t2.wrap = s;
            var f = "suspendedStart", d = "suspendedYield", v = "executing", p = "completed", h = {};
            function g() {
            }
            function m2() {
            }
            function _() {
            }
            var b = {};
            u(b, i2, (function() {
              return this;
            }));
            var y = Object.getPrototypeOf, w = y && y(y(D([])));
            w && w !== e && o.call(w, i2) && (b = w);
            var E = _.prototype = g.prototype = Object.create(b);
            function L(t3) {
              ["next", "throw", "return"].forEach((function(n3) {
                u(t3, n3, (function(t4) {
                  return this._invoke(n3, t4);
                }));
              }));
            }
            function T(t3, n3) {
              function e2(r3, i3, a2, c3) {
                var u2 = l(t3[r3], t3, i3);
                if ("throw" !== u2.type) {
                  var s2 = u2.arg, f2 = s2.value;
                  return f2 && "object" == typeof f2 && o.call(f2, "__await") ? n3.resolve(f2.__await).then((function(t4) {
                    e2("next", t4, a2, c3);
                  }), (function(t4) {
                    e2("throw", t4, a2, c3);
                  })) : n3.resolve(f2).then((function(t4) {
                    s2.value = t4, a2(s2);
                  }), (function(t4) {
                    return e2("throw", t4, a2, c3);
                  }));
                }
                c3(u2.arg);
              }
              var r2;
              this._invoke = function(t4, o2) {
                function i3() {
                  return new n3((function(n4, r3) {
                    e2(t4, o2, n4, r3);
                  }));
                }
                return r2 = r2 ? r2.then(i3, i3) : i3();
              };
            }
            function x(t3, e2) {
              var o2 = t3.iterator[e2.method];
              if (o2 === n2) {
                if (e2.delegate = null, "throw" === e2.method) {
                  if (t3.iterator.return && (e2.method = "return", e2.arg = n2, x(t3, e2), "throw" === e2.method)) return h;
                  e2.method = "throw", e2.arg = new TypeError("The iterator does not provide a 'throw' method");
                }
                return h;
              }
              var r2 = l(o2, t3.iterator, e2.arg);
              if ("throw" === r2.type) return e2.method = "throw", e2.arg = r2.arg, e2.delegate = null, h;
              var i3 = r2.arg;
              return i3 ? i3.done ? (e2[t3.resultName] = i3.value, e2.next = t3.nextLoc, "return" !== e2.method && (e2.method = "next", e2.arg = n2), e2.delegate = null, h) : i3 : (e2.method = "throw", e2.arg = new TypeError("iterator result is not an object"), e2.delegate = null, h);
            }
            function C(t3) {
              var n3 = { tryLoc: t3[0] };
              1 in t3 && (n3.catchLoc = t3[1]), 2 in t3 && (n3.finallyLoc = t3[2], n3.afterLoc = t3[3]), this.tryEntries.push(n3);
            }
            function O(t3) {
              var n3 = t3.completion || {};
              n3.type = "normal", delete n3.arg, t3.completion = n3;
            }
            function I(t3) {
              this.tryEntries = [{ tryLoc: "root" }], t3.forEach(C, this), this.reset(true);
            }
            function D(t3) {
              if (t3) {
                var e2 = t3[i2];
                if (e2) return e2.call(t3);
                if ("function" == typeof t3.next) return t3;
                if (!isNaN(t3.length)) {
                  var r2 = -1, a2 = function e3() {
                    for (; ++r2 < t3.length; ) if (o.call(t3, r2)) return e3.value = t3[r2], e3.done = false, e3;
                    return e3.value = n2, e3.done = true, e3;
                  };
                  return a2.next = a2;
                }
              }
              return { next: $ };
            }
            function $() {
              return { value: n2, done: true };
            }
            return m2.prototype = _, u(E, "constructor", _), u(_, "constructor", m2), m2.displayName = u(_, c2, "GeneratorFunction"), t2.isGeneratorFunction = function(t3) {
              var n3 = "function" == typeof t3 && t3.constructor;
              return !!n3 && (n3 === m2 || "GeneratorFunction" === (n3.displayName || n3.name));
            }, t2.mark = function(t3) {
              return Object.setPrototypeOf ? Object.setPrototypeOf(t3, _) : (t3.__proto__ = _, u(t3, c2, "GeneratorFunction")), t3.prototype = Object.create(E), t3;
            }, t2.awrap = function(t3) {
              return { __await: t3 };
            }, L(T.prototype), u(T.prototype, a, (function() {
              return this;
            })), t2.AsyncIterator = T, t2.async = function(n3, e2, o2, r2, i3) {
              void 0 === i3 && (i3 = Promise);
              var a2 = new T(s(n3, e2, o2, r2), i3);
              return t2.isGeneratorFunction(e2) ? a2 : a2.next().then((function(t3) {
                return t3.done ? t3.value : a2.next();
              }));
            }, L(E), u(E, c2, "Generator"), u(E, i2, (function() {
              return this;
            })), u(E, "toString", (function() {
              return "[object Generator]";
            })), t2.keys = function(t3) {
              var n3 = [];
              for (var e2 in t3) n3.push(e2);
              return n3.reverse(), function e3() {
                for (; n3.length; ) {
                  var o2 = n3.pop();
                  if (o2 in t3) return e3.value = o2, e3.done = false, e3;
                }
                return e3.done = true, e3;
              };
            }, t2.values = D, I.prototype = { constructor: I, reset: function(t3) {
              if (this.prev = 0, this.next = 0, this.sent = this._sent = n2, this.done = false, this.delegate = null, this.method = "next", this.arg = n2, this.tryEntries.forEach(O), !t3) for (var e2 in this) "t" === e2.charAt(0) && o.call(this, e2) && !isNaN(+e2.slice(1)) && (this[e2] = n2);
            }, stop: function() {
              this.done = true;
              var t3 = this.tryEntries[0].completion;
              if ("throw" === t3.type) throw t3.arg;
              return this.rval;
            }, dispatchException: function(t3) {
              if (this.done) throw t3;
              var e2 = this;
              function r2(o2, r3) {
                return c3.type = "throw", c3.arg = t3, e2.next = o2, r3 && (e2.method = "next", e2.arg = n2), !!r3;
              }
              for (var i3 = this.tryEntries.length - 1; i3 >= 0; --i3) {
                var a2 = this.tryEntries[i3], c3 = a2.completion;
                if ("root" === a2.tryLoc) return r2("end");
                if (a2.tryLoc <= this.prev) {
                  var u2 = o.call(a2, "catchLoc"), s2 = o.call(a2, "finallyLoc");
                  if (u2 && s2) {
                    if (this.prev < a2.catchLoc) return r2(a2.catchLoc, true);
                    if (this.prev < a2.finallyLoc) return r2(a2.finallyLoc);
                  } else if (u2) {
                    if (this.prev < a2.catchLoc) return r2(a2.catchLoc, true);
                  } else {
                    if (!s2) throw new Error("try statement without catch or finally");
                    if (this.prev < a2.finallyLoc) return r2(a2.finallyLoc);
                  }
                }
              }
            }, abrupt: function(t3, n3) {
              for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
                var r2 = this.tryEntries[e2];
                if (r2.tryLoc <= this.prev && o.call(r2, "finallyLoc") && this.prev < r2.finallyLoc) {
                  var i3 = r2;
                  break;
                }
              }
              i3 && ("break" === t3 || "continue" === t3) && i3.tryLoc <= n3 && n3 <= i3.finallyLoc && (i3 = null);
              var a2 = i3 ? i3.completion : {};
              return a2.type = t3, a2.arg = n3, i3 ? (this.method = "next", this.next = i3.finallyLoc, h) : this.complete(a2);
            }, complete: function(t3, n3) {
              if ("throw" === t3.type) throw t3.arg;
              return "break" === t3.type || "continue" === t3.type ? this.next = t3.arg : "return" === t3.type ? (this.rval = this.arg = t3.arg, this.method = "return", this.next = "end") : "normal" === t3.type && n3 && (this.next = n3), h;
            }, finish: function(t3) {
              for (var n3 = this.tryEntries.length - 1; n3 >= 0; --n3) {
                var e2 = this.tryEntries[n3];
                if (e2.finallyLoc === t3) return this.complete(e2.completion, e2.afterLoc), O(e2), h;
              }
            }, catch: function(t3) {
              for (var n3 = this.tryEntries.length - 1; n3 >= 0; --n3) {
                var e2 = this.tryEntries[n3];
                if (e2.tryLoc === t3) {
                  var o2 = e2.completion;
                  if ("throw" === o2.type) {
                    var r2 = o2.arg;
                    O(e2);
                  }
                  return r2;
                }
              }
              throw new Error("illegal catch attempt");
            }, delegateYield: function(t3, e2, o2) {
              return this.delegate = { iterator: D(t3), resultName: e2, nextLoc: o2 }, "next" === this.method && (this.arg = n2), h;
            } }, t2;
          })(t.exports);
          try {
            regeneratorRuntime = n;
          } catch (t2) {
            "object" == typeof globalThis ? globalThis.regeneratorRuntime = n : Function("r", "regeneratorRuntime = r")(n);
          }
        }, 8702: function(t, n, e) {
          e.d(n, { Z: function() {
            return j;
          } });
          var o = e(4296), r = e(6464), i2 = e(6881), a = e(2942), c2 = e(7003), u = e(3379), s = e.n(u), l = e(7795), f = e.n(l), d = e(569), v = e.n(d), p = e(3565), h = e.n(p), g = e(9216), m2 = e.n(g), _ = e(4589), b = e.n(_), y = e(5313), w = {};
          y.Z && y.Z.locals && (w.locals = y.Z.locals);
          var E, L = 0, T = {};
          T.styleTagTransform = b(), T.setAttributes = h(), T.insert = v().bind(null, "head"), T.domAPI = f(), T.insertStyleElement = m2(), w.use = function(t2) {
            return T.options = t2 || {}, L++ || (E = s()(y.Z, T)), w;
          }, w.unuse = function() {
            L > 0 && !--L && (E(), E = null);
          };
          var x = w;
          function C(t2) {
            var n2, e2;
            return { c: function() {
              n2 = (0, a.bi5)("svg"), e2 = (0, a.bi5)("path"), (0, a.Ljt)(e2, "d", "M599.99999 832.000004h47.999999a24 24 0 0 0 23.999999-24V376.000013a24 24 0 0 0-23.999999-24h-47.999999a24 24 0 0 0-24 24v431.999991a24 24 0 0 0 24 24zM927.999983 160.000017h-164.819997l-67.999998-113.399998A95.999998 95.999998 0 0 0 612.819989 0.00002H411.179993a95.999998 95.999998 0 0 0-82.319998 46.599999L260.819996 160.000017H95.999999A31.999999 31.999999 0 0 0 64 192.000016v32a31.999999 31.999999 0 0 0 31.999999 31.999999h32v671.999987a95.999998 95.999998 0 0 0 95.999998 95.999998h575.999989a95.999998 95.999998 0 0 0 95.999998-95.999998V256.000015h31.999999a31.999999 31.999999 0 0 0 32-31.999999V192.000016a31.999999 31.999999 0 0 0-32-31.999999zM407.679993 101.820018A12 12 0 0 1 417.999993 96.000018h187.999996a12 12 0 0 1 10.3 5.82L651.219989 160.000017H372.779994zM799.999986 928.000002H223.999997V256.000015h575.999989z m-423.999992-95.999998h47.999999a24 24 0 0 0 24-24V376.000013a24 24 0 0 0-24-24h-47.999999a24 24 0 0 0-24 24v431.999991a24 24 0 0 0 24 24z"), (0, a.Ljt)(n2, "class", "vc-icon-delete"), (0, a.Ljt)(n2, "viewBox", "0 0 1024 1024"), (0, a.Ljt)(n2, "width", "200"), (0, a.Ljt)(n2, "height", "200");
            }, m: function(t3, o2) {
              (0, a.$Tr)(t3, n2, o2), (0, a.R3I)(n2, e2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function O(t2) {
            var n2, e2, o2;
            return { c: function() {
              n2 = (0, a.bi5)("svg"), e2 = (0, a.bi5)("path"), o2 = (0, a.bi5)("path"), (0, a.Ljt)(e2, "d", "M874.154197 150.116875A511.970373 511.970373 0 1 0 1023.993986 511.991687a511.927744 511.927744 0 0 0-149.839789-361.874812z m-75.324866 648.382129A405.398688 405.398688 0 1 1 917.422301 511.991687a405.313431 405.313431 0 0 1-118.59297 286.507317z"), (0, a.Ljt)(o2, "d", "M725.039096 299.274605a54.351559 54.351559 0 0 0-76.731613 0l-135.431297 135.431297L377.274375 299.274605a54.436817 54.436817 0 0 0-76.944756 76.987385l135.388668 135.431297-135.388668 135.473925a54.436817 54.436817 0 0 0 76.944756 76.987385l135.388668-135.431297 135.431297 135.473926a54.436817 54.436817 0 0 0 76.731613-76.987385l-135.388668-135.473926 135.388668-135.431296a54.479445 54.479445 0 0 0 0.213143-77.030014z"), (0, a.Ljt)(n2, "viewBox", "0 0 1024 1024"), (0, a.Ljt)(n2, "width", "200"), (0, a.Ljt)(n2, "height", "200");
            }, m: function(t3, r2) {
              (0, a.$Tr)(t3, n2, r2), (0, a.R3I)(n2, e2), (0, a.R3I)(n2, o2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function I(t2) {
            var n2, e2;
            return { c: function() {
              n2 = (0, a.bi5)("svg"), e2 = (0, a.bi5)("path"), (0, a.Ljt)(e2, "fill-rule", "evenodd"), (0, a.Ljt)(e2, "d", "M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"), (0, a.Ljt)(n2, "class", "vc-icon-copy"), (0, a.Ljt)(n2, "viewBox", "0 0 16 16");
            }, m: function(t3, o2) {
              (0, a.$Tr)(t3, n2, o2), (0, a.R3I)(n2, e2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function D(t2) {
            var n2, e2;
            return { c: function() {
              n2 = (0, a.bi5)("svg"), e2 = (0, a.bi5)("path"), (0, a.Ljt)(e2, "fill-rule", "evenodd"), (0, a.Ljt)(e2, "d", "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"), (0, a.Ljt)(n2, "class", "vc-icon-suc"), (0, a.Ljt)(n2, "viewBox", "0 0 16 16");
            }, m: function(t3, o2) {
              (0, a.$Tr)(t3, n2, o2), (0, a.R3I)(n2, e2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function $(t2) {
            var n2, e2, o2;
            return { c: function() {
              n2 = (0, a.bi5)("svg"), e2 = (0, a.bi5)("path"), o2 = (0, a.bi5)("path"), (0, a.Ljt)(e2, "d", "M776.533333 1024 162.133333 1024C72.533333 1024 0 951.466667 0 861.866667L0 247.466667C0 157.866667 72.533333 85.333333 162.133333 85.333333L469.333333 85.333333c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666667L162.133333 170.666667C119.466667 170.666667 85.333333 204.8 85.333333 247.466667l0 610.133333c0 42.666667 34.133333 76.8 76.8 76.8l610.133333 0c42.666667 0 76.8-34.133333 76.8-76.8L849.066667 554.666667c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666667 42.666667l0 307.2C938.666667 951.466667 866.133333 1024 776.533333 1024z"), (0, a.Ljt)(o2, "d", "M256 810.666667c-12.8 0-21.333333-4.266667-29.866667-12.8C217.6 789.333333 213.333333 772.266667 213.333333 759.466667l42.666667-213.333333c0-8.533333 4.266667-17.066667 12.8-21.333333l512-512c17.066667-17.066667 42.666667-17.066667 59.733333 0l170.666667 170.666667c17.066667 17.066667 17.066667 42.666667 0 59.733333l-512 512c-4.266667 4.266667-12.8 8.533333-21.333333 12.8l-213.333333 42.666667C260.266667 810.666667 260.266667 810.666667 256 810.666667zM337.066667 576l-25.6 136.533333 136.533333-25.6L921.6 213.333333 810.666667 102.4 337.066667 576z"), (0, a.Ljt)(n2, "class", "vc-icon-edit"), (0, a.Ljt)(n2, "viewBox", "0 0 1024 1024"), (0, a.Ljt)(n2, "width", "200"), (0, a.Ljt)(n2, "height", "200");
            }, m: function(t3, r2) {
              (0, a.$Tr)(t3, n2, r2), (0, a.R3I)(n2, e2), (0, a.R3I)(n2, o2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function R(t2) {
            var n2, e2;
            return { c: function() {
              n2 = (0, a.bi5)("svg"), e2 = (0, a.bi5)("path"), (0, a.Ljt)(e2, "d", "M581.338005 987.646578c-2.867097 4.095853-4.573702 8.669555-8.191705 12.287558a83.214071 83.214071 0 0 1-60.959939 24.029001 83.214071 83.214071 0 0 1-61.028203-24.029001c-3.618003-3.618003-5.324608-8.191705-8.123441-12.15103L24.370323 569.050448a83.418864 83.418864 0 0 1 117.892289-117.89229l369.923749 369.92375L1308.829682 24.438587A83.418864 83.418864 0 0 1 1426.721971 142.194348L581.338005 987.646578z"), (0, a.Ljt)(n2, "class", "vc-icon-don"), (0, a.Ljt)(n2, "viewBox", "0 0 1501 1024"), (0, a.Ljt)(n2, "width", "200"), (0, a.Ljt)(n2, "height", "200");
            }, m: function(t3, o2) {
              (0, a.$Tr)(t3, n2, o2), (0, a.R3I)(n2, e2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function k(t2) {
            var n2, e2;
            return { c: function() {
              n2 = (0, a.bi5)("svg"), e2 = (0, a.bi5)("path"), (0, a.Ljt)(e2, "d", "M894.976 574.464q0 78.848-29.696 148.48t-81.408 123.392-121.856 88.064-151.04 41.472q-5.12 1.024-9.216 1.536t-9.216 0.512l-177.152 0q-17.408 0-34.304-6.144t-30.208-16.896-22.016-25.088-8.704-29.696 8.192-29.696 21.504-24.576 29.696-16.384 33.792-6.144l158.72 1.024q54.272 0 102.4-19.968t83.968-53.76 56.32-79.36 20.48-97.792q0-49.152-18.432-92.16t-50.688-76.8-75.264-54.784-93.184-26.112q-2.048 0-2.56 0.512t-2.56 0.512l-162.816 0 0 80.896q0 17.408-13.824 25.6t-44.544-10.24q-8.192-5.12-26.112-17.92t-41.984-30.208-50.688-36.864l-51.2-38.912q-15.36-12.288-26.624-22.016t-11.264-24.064q0-12.288 12.8-25.6t29.184-26.624q18.432-15.36 44.032-35.84t50.688-39.936 45.056-35.328 28.16-22.016q24.576-17.408 39.936-7.168t16.384 30.72l0 81.92 162.816 0q5.12 0 10.752 1.024t10.752 2.048q79.872 8.192 149.504 41.984t121.344 87.552 80.896 123.392 29.184 147.456z"), (0, a.Ljt)(n2, "class", "vc-icon-cancel"), (0, a.Ljt)(n2, "viewBox", "0 0 1024 1024"), (0, a.Ljt)(n2, "width", "200"), (0, a.Ljt)(n2, "height", "200");
            }, m: function(t3, o2) {
              (0, a.$Tr)(t3, n2, o2), (0, a.R3I)(n2, e2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function P2(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2, l2, f2 = "delete" === t2[0] && C(), d2 = "clear" === t2[0] && O(), v2 = "copy" === t2[0] && I(), p2 = "success" === t2[0] && D(), h2 = "edit" === t2[0] && $(), g2 = "done" === t2[0] && R(), m3 = "cancel" === t2[0] && k();
            return { c: function() {
              n2 = (0, a.bGB)("i"), f2 && f2.c(), e2 = (0, a.DhX)(), d2 && d2.c(), o2 = (0, a.DhX)(), v2 && v2.c(), r2 = (0, a.DhX)(), p2 && p2.c(), i3 = (0, a.DhX)(), h2 && h2.c(), c3 = (0, a.DhX)(), g2 && g2.c(), u2 = (0, a.DhX)(), m3 && m3.c(), (0, a.Ljt)(n2, "class", "vc-icon");
            }, m: function(_2, b2) {
              (0, a.$Tr)(_2, n2, b2), f2 && f2.m(n2, null), (0, a.R3I)(n2, e2), d2 && d2.m(n2, null), (0, a.R3I)(n2, o2), v2 && v2.m(n2, null), (0, a.R3I)(n2, r2), p2 && p2.m(n2, null), (0, a.R3I)(n2, i3), h2 && h2.m(n2, null), (0, a.R3I)(n2, c3), g2 && g2.m(n2, null), (0, a.R3I)(n2, u2), m3 && m3.m(n2, null), s2 || (l2 = (0, a.oLt)(n2, "click", t2[1]), s2 = true);
            }, p: function(t3, a2) {
              a2[0];
              "delete" === t3[0] ? f2 || ((f2 = C()).c(), f2.m(n2, e2)) : f2 && (f2.d(1), f2 = null), "clear" === t3[0] ? d2 || ((d2 = O()).c(), d2.m(n2, o2)) : d2 && (d2.d(1), d2 = null), "copy" === t3[0] ? v2 || ((v2 = I()).c(), v2.m(n2, r2)) : v2 && (v2.d(1), v2 = null), "success" === t3[0] ? p2 || ((p2 = D()).c(), p2.m(n2, i3)) : p2 && (p2.d(1), p2 = null), "edit" === t3[0] ? h2 || ((h2 = $()).c(), h2.m(n2, c3)) : h2 && (h2.d(1), h2 = null), "done" === t3[0] ? g2 || ((g2 = R()).c(), g2.m(n2, u2)) : g2 && (g2.d(1), g2 = null), "cancel" === t3[0] ? m3 || ((m3 = k()).c(), m3.m(n2, null)) : m3 && (m3.d(1), m3 = null);
            }, i: a.ZTd, o: a.ZTd, d: function(t3) {
              t3 && (0, a.ogt)(n2), f2 && f2.d(), d2 && d2.d(), v2 && v2.d(), p2 && p2.d(), h2 && h2.d(), g2 && g2.d(), m3 && m3.d(), s2 = false, l2();
            } };
          }
          function M(t2, n2, e2) {
            var o2 = n2.name;
            return (0, c2.H3)((function() {
              x.use();
            })), (0, c2.ev)((function() {
              x.unuse();
            })), t2.$$set = function(t3) {
              "name" in t3 && e2(0, o2 = t3.name);
            }, [o2, function(n3) {
              a.cKT.call(this, t2, n3);
            }];
          }
          var S = (function(t2) {
            function n2(n3) {
              var e2;
              return e2 = t2.call(this) || this, (0, a.S1n)((0, r.Z)(e2), n3, M, P2, a.N8, { name: 0 }), e2;
            }
            return (0, i2.Z)(n2, t2), (0, o.Z)(n2, [{ key: "name", get: function() {
              return this.$$.ctx[0];
            }, set: function(t3) {
              this.$$set({ name: t3 }), (0, a.yl1)();
            } }]), n2;
          })(a.f_C), j = S;
        }, 3903: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
          var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6464), _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6881), svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2942), svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7003), _component_icon_icon_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8702), _logTool__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8665), _log_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5629), _logCommand_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3411);
          function get_each_context(t, n, e) {
            var o = t.slice();
            return o[28] = n[e], o;
          }
          function create_if_block_2(t) {
            var n, e, o;
            return { c: function() {
              (n = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("li")).textContent = "Close", (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(n, "class", "vc-cmd-prompted-hide");
            }, m: function(r, i2) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.$Tr)(r, n, i2), e || (o = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(n, "click", t[5]), e = true);
            }, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ZTd, d: function(t2) {
              t2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ogt)(n), e = false, o();
            } };
          }
          function create_else_block(t) {
            var n;
            return { c: function() {
              (n = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("li")).textContent = "No Prompted";
            }, m: function(t2, e) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.$Tr)(t2, n, e);
            }, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ZTd, d: function(t2) {
              t2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ogt)(n);
            } };
          }
          function create_each_block(t) {
            var n, e, o, r, i2 = t[28].text + "";
            function a() {
              return t[14](t[28]);
            }
            return { c: function() {
              n = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("li"), e = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.fLW)(i2);
            }, m: function(t2, i3) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.$Tr)(t2, n, i3), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(n, e), o || (r = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(n, "click", a), o = true);
            }, p: function(n2, o2) {
              t = n2, 8 & o2 && i2 !== (i2 = t[28].text + "") && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.rTO)(e, i2);
            }, d: function(t2) {
              t2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ogt)(n), o = false, r();
            } };
          }
          function create_if_block_1(t) {
            var n, e, o, r, i2;
            return e = new _component_icon_icon_svelte__WEBPACK_IMPORTED_MODULE_2__.Z({ props: { name: "clear" } }), { c: function() {
              n = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("div"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.YCL)(e.$$.fragment), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(n, "class", "vc-cmd-clear-btn");
            }, m: function(a, c2) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.$Tr)(a, n, c2), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.yef)(e, n, null), o = true, r || (i2 = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(n, "click", (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.AT7)(t[17])), r = true);
            }, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ZTd, i: function(t2) {
              o || ((0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ui)(e.$$.fragment, t2), o = true);
            }, o: function(t2) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.etI)(e.$$.fragment, t2), o = false;
            }, d: function(t2) {
              t2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ogt)(n), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.vpE)(e), r = false, i2();
            } };
          }
          function create_if_block(t) {
            var n, e, o, r, i2;
            return e = new _component_icon_icon_svelte__WEBPACK_IMPORTED_MODULE_2__.Z({ props: { name: "clear" } }), { c: function() {
              n = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("div"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.YCL)(e.$$.fragment), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(n, "class", "vc-cmd-clear-btn");
            }, m: function(a, c2) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.$Tr)(a, n, c2), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.yef)(e, n, null), o = true, r || (i2 = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(n, "click", (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.AT7)(t[19])), r = true);
            }, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ZTd, i: function(t2) {
              o || ((0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ui)(e.$$.fragment, t2), o = true);
            }, o: function(t2) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.etI)(e.$$.fragment, t2), o = false;
            }, d: function(t2) {
              t2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ogt)(n), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.vpE)(e), r = false, i2();
            } };
          }
          function create_fragment(t) {
            for (var n, e, o, r, i2, a, c2, u, s, l, f, d, v, p, h, g, m2, _, b, y, w, E = t[3].length > 0 && create_if_block_2(t), L = t[3], T = [], x = 0; x < L.length; x += 1) T[x] = create_each_block(get_each_context(t, L, x));
            var C = null;
            L.length || (C = create_else_block());
            var O = t[1].length > 0 && create_if_block_1(t), I = t[4].length > 0 && create_if_block(t);
            return { c: function() {
              n = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("form"), e = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("ul"), E && E.c(), o = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.DhX)();
              for (var b2 = 0; b2 < T.length; b2 += 1) T[b2].c();
              C && C.c(), r = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.DhX)(), i2 = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("div"), a = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("textarea"), c2 = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.DhX)(), O && O.c(), u = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.DhX)(), (s = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("button")).textContent = "OK", l = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.DhX)(), f = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("form"), d = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("ul"), v = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.DhX)(), p = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("div"), h = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("textarea"), g = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.DhX)(), I && I.c(), m2 = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.DhX)(), (_ = (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bGB)("button")).textContent = "Filter", (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(e, "class", "vc-cmd-prompted"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(e, "style", t[2]), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(a, "class", "vc-cmd-input"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(a, "placeholder", "command..."), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(i2, "class", "vc-cmd-input-wrap"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(s, "class", "vc-cmd-btn"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(s, "type", "submit"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(n, "class", "vc-cmd"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(d, "class", "vc-cmd-prompted"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(h, "class", "vc-cmd-input"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(h, "placeholder", "filter..."), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(p, "class", "vc-cmd-input-wrap"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(_, "class", "vc-cmd-btn"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(_, "type", "submit"), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(f, "class", "vc-cmd vc-filter");
            }, m: function(L2, x2) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.$Tr)(L2, n, x2), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(n, e), E && E.m(e, null), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(e, o);
              for (var D = 0; D < T.length; D += 1) T[D].m(e, null);
              C && C.m(e, null), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(n, r), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(n, i2), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(i2, a), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.BmG)(a, t[1]), t[16](a), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(i2, c2), O && O.m(i2, null), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(n, u), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(n, s), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.$Tr)(L2, l, x2), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.$Tr)(L2, f, x2), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(f, d), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(f, v), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(f, p), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(p, h), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.BmG)(h, t[4]), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(p, g), I && I.m(p, null), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(f, m2), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.R3I)(f, _), b = true, y || (w = [(0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(a, "input", t[15]), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(a, "keydown", t[10]), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(a, "keyup", t[11]), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(a, "focus", t[8]), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(a, "blur", t[9]), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(n, "submit", (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.AT7)(t[12])), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(h, "input", t[18]), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.oLt)(f, "submit", (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.AT7)(t[13]))], y = true);
            }, p: function(t2, n2) {
              var r2 = n2[0];
              if (t2[3].length > 0 ? E ? E.p(t2, r2) : ((E = create_if_block_2(t2)).c(), E.m(e, o)) : E && (E.d(1), E = null), 136 & r2) {
                var c3;
                for (L = t2[3], c3 = 0; c3 < L.length; c3 += 1) {
                  var u2 = get_each_context(t2, L, c3);
                  T[c3] ? T[c3].p(u2, r2) : (T[c3] = create_each_block(u2), T[c3].c(), T[c3].m(e, null));
                }
                for (; c3 < T.length; c3 += 1) T[c3].d(1);
                T.length = L.length, !L.length && C ? C.p(t2, r2) : L.length ? C && (C.d(1), C = null) : ((C = create_else_block()).c(), C.m(e, null));
              }
              (!b || 4 & r2) && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ljt)(e, "style", t2[2]), 2 & r2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.BmG)(a, t2[1]), t2[1].length > 0 ? O ? (O.p(t2, r2), 2 & r2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ui)(O, 1)) : ((O = create_if_block_1(t2)).c(), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ui)(O, 1), O.m(i2, null)) : O && ((0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dvw)(), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.etI)(O, 1, 1, (function() {
                O = null;
              })), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.gbL)()), 16 & r2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.BmG)(h, t2[4]), t2[4].length > 0 ? I ? (I.p(t2, r2), 16 & r2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ui)(I, 1)) : ((I = create_if_block(t2)).c(), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ui)(I, 1), I.m(p, null)) : I && ((0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dvw)(), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.etI)(I, 1, 1, (function() {
                I = null;
              })), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.gbL)());
            }, i: function(t2) {
              b || ((0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ui)(O), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.Ui)(I), b = true);
            }, o: function(t2) {
              (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.etI)(O), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.etI)(I), b = false;
            }, d: function(e2) {
              e2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ogt)(n), E && E.d(), (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.RMB)(T, e2), C && C.d(), t[16](null), O && O.d(), e2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ogt)(l), e2 && (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ogt)(f), I && I.d(), y = false, (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.j7q)(w);
            } };
          }
          function instance($$self, $$props, $$invalidate) {
            var module = _log_model__WEBPACK_IMPORTED_MODULE_3__.W.getSingleton(_log_model__WEBPACK_IMPORTED_MODULE_3__.W, "VConsoleLogModel"), cachedObjKeys = {}, dispatch = (0, svelte__WEBPACK_IMPORTED_MODULE_1__.x)(), cmdElement, cmdValue = "", promptedStyle = "", promptedList = [], filterValue = "";
            (0, svelte__WEBPACK_IMPORTED_MODULE_1__.H3)((function() {
              _logCommand_less__WEBPACK_IMPORTED_MODULE_4__.Z.use();
            })), (0, svelte__WEBPACK_IMPORTED_MODULE_1__.ev)((function() {
              _logCommand_less__WEBPACK_IMPORTED_MODULE_4__.Z.unuse();
            }));
            var evalCommand = function(t) {
              module.evalCommand(t);
            }, moveCursorToPos = function(t, n) {
              t.setSelectionRange && setTimeout((function() {
                t.setSelectionRange(n, n);
              }), 1);
            }, clearPromptedList = function() {
              $$invalidate(2, promptedStyle = "display: none;"), $$invalidate(3, promptedList = []);
            }, updatePromptedList = function updatePromptedList(identifier) {
              if ("" !== cmdValue) {
                identifier || (identifier = (0, _logTool__WEBPACK_IMPORTED_MODULE_5__.oj)(cmdValue));
                var objName = "window", keyName = cmdValue;
                if ("." !== identifier.front.text && "[" !== identifier.front.text || (objName = identifier.front.before, keyName = "" !== identifier.back.text ? identifier.back.before : identifier.front.after), keyName = keyName.replace(/(^['"]+)|(['"']+$)/g, ""), !cachedObjKeys[objName]) try {
                  cachedObjKeys[objName] = Object.getOwnPropertyNames(eval("(" + objName + ")")).sort();
                } catch (t) {
                }
                try {
                  if (cachedObjKeys[objName]) for (var i = 0; i < cachedObjKeys[objName].length && !(promptedList.length >= 100); i++) {
                    var key = String(cachedObjKeys[objName][i]), keyPattern = new RegExp("^" + keyName, "i");
                    if (keyPattern.test(key)) {
                      var completeCmd = objName;
                      "." === identifier.front.text || "" === identifier.front.text ? completeCmd += "." + key : "[" === identifier.front.text && (completeCmd += "['" + key + "']"), promptedList.push({ text: key, value: completeCmd });
                    }
                  }
                } catch (t) {
                }
                if (promptedList.length > 0) {
                  var m = Math.min(200, 31 * (promptedList.length + 1));
                  $$invalidate(2, promptedStyle = "display: block; height: " + m + "px; margin-top: " + (-m - 2) + "px;"), $$invalidate(3, promptedList);
                } else clearPromptedList();
              } else clearPromptedList();
            }, autoCompleteBrackets = function(t, n) {
              if (!(8 === n || 46 === n) && "" === t.front.after) switch (t.front.text) {
                case "[":
                  return $$invalidate(1, cmdValue += "]"), void moveCursorToPos(cmdElement, cmdValue.length - 1);
                case "(":
                  return $$invalidate(1, cmdValue += ")"), void moveCursorToPos(cmdElement, cmdValue.length - 1);
                case "{":
                  return $$invalidate(1, cmdValue += "}"), void moveCursorToPos(cmdElement, cmdValue.length - 1);
              }
            }, dispatchFilterEvent = function() {
              dispatch("filterText", { filterText: filterValue });
            }, onTapClearText = function(t) {
              "cmd" === t ? ($$invalidate(1, cmdValue = ""), clearPromptedList()) : "filter" === t && ($$invalidate(4, filterValue = ""), dispatchFilterEvent());
            }, onTapPromptedItem = function onTapPromptedItem(item) {
              var type = "";
              try {
                type = eval("typeof " + item.value);
              } catch (t) {
              }
              $$invalidate(1, cmdValue = item.value + ("function" === type ? "()" : "")), clearPromptedList();
            }, onCmdFocus = function() {
              updatePromptedList();
            }, onCmdBlur = function() {
            }, onCmdKeyDown = function(t) {
              13 === t.keyCode && (t.preventDefault(), onCmdSubmit());
            }, onCmdKeyUp = function(t) {
              $$invalidate(3, promptedList = []);
              var n = (0, _logTool__WEBPACK_IMPORTED_MODULE_5__.oj)(t.target.value);
              autoCompleteBrackets(n, t.keyCode), updatePromptedList(n);
            }, onCmdSubmit = function() {
              "" !== cmdValue && evalCommand(cmdValue), clearPromptedList();
            }, onFilterSubmit = function(t) {
              dispatchFilterEvent();
            }, click_handler = function(t) {
              return onTapPromptedItem(t);
            };
            function textarea0_input_handler() {
              cmdValue = this.value, $$invalidate(1, cmdValue);
            }
            function textarea0_binding(t) {
              svelte_internal__WEBPACK_IMPORTED_MODULE_0__.VnY[t ? "unshift" : "push"]((function() {
                $$invalidate(0, cmdElement = t);
              }));
            }
            var click_handler_1 = function() {
              return onTapClearText("cmd");
            };
            function textarea1_input_handler() {
              filterValue = this.value, $$invalidate(4, filterValue);
            }
            var click_handler_2 = function() {
              return onTapClearText("filter");
            };
            return [cmdElement, cmdValue, promptedStyle, promptedList, filterValue, clearPromptedList, onTapClearText, onTapPromptedItem, onCmdFocus, onCmdBlur, onCmdKeyDown, onCmdKeyUp, onCmdSubmit, onFilterSubmit, click_handler, textarea0_input_handler, textarea0_binding, click_handler_1, textarea1_input_handler, click_handler_2];
          }
          var LogCommand = (function(t) {
            function n(n2) {
              var e;
              return e = t.call(this) || this, (0, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.S1n)((0, _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__.Z)(e), n2, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.N8, {}), e;
            }
            return (0, _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__.Z)(n, t), n;
          })(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.f_C);
          __webpack_exports__.Z = LogCommand;
        }, 4687: function(t, n, e) {
          e.d(n, { x: function() {
            return r;
          } });
          var o = e(3313), r = (function() {
            var t2 = (0, o.fZ)({ updateTime: 0 }), n2 = t2.subscribe, e2 = t2.set, r2 = t2.update;
            return { subscribe: n2, set: e2, update: r2, updateTime: function() {
              r2((function(t3) {
                return t3.updateTime = Date.now(), t3;
              }));
            } };
          })();
        }, 643: function(t, n, e) {
          e.d(n, { N: function() {
            return o;
          } });
          var o = (function() {
            function t2() {
              this._onDataUpdateCallbacks = [];
            }
            return t2.getSingleton = function(n2, e2) {
              return e2 || (e2 = n2.toString()), t2.singleton[e2] || (t2.singleton[e2] = new n2()), t2.singleton[e2];
            }, t2;
          })();
          o.singleton = {};
        }, 5103: function(t, n, e) {
          function o(t2) {
            var n2 = t2 > 0 ? new Date(t2) : /* @__PURE__ */ new Date(), e2 = n2.getDate() < 10 ? "0" + n2.getDate() : n2.getDate(), o2 = n2.getMonth() < 9 ? "0" + (n2.getMonth() + 1) : n2.getMonth() + 1, r2 = n2.getFullYear(), i3 = n2.getHours() < 10 ? "0" + n2.getHours() : n2.getHours(), a2 = n2.getMinutes() < 10 ? "0" + n2.getMinutes() : n2.getMinutes(), c3 = n2.getSeconds() < 10 ? "0" + n2.getSeconds() : n2.getSeconds(), u2 = n2.getMilliseconds() < 10 ? "0" + n2.getMilliseconds() : n2.getMilliseconds();
            return u2 < 100 && (u2 = "0" + u2), { time: +n2, year: r2, month: o2, day: e2, hour: i3, minute: a2, second: c3, millisecond: u2 };
          }
          function r(t2) {
            return "[object Number]" === Object.prototype.toString.call(t2);
          }
          function i2(t2) {
            return "bigint" == typeof t2;
          }
          function a(t2) {
            return "string" == typeof t2;
          }
          function c2(t2) {
            return "[object Array]" === Object.prototype.toString.call(t2);
          }
          function u(t2) {
            return "boolean" == typeof t2;
          }
          function s(t2) {
            return void 0 === t2;
          }
          function l(t2) {
            return null === t2;
          }
          function f(t2) {
            return "symbol" == typeof t2;
          }
          function d(t2) {
            return !("[object Object]" !== Object.prototype.toString.call(t2) && (r(t2) || i2(t2) || a(t2) || u(t2) || c2(t2) || l(t2) || v(t2) || s(t2) || f(t2)));
          }
          function v(t2) {
            return "function" == typeof t2;
          }
          function p(t2) {
            return "object" == typeof HTMLElement ? t2 instanceof HTMLElement : t2 && "object" == typeof t2 && null !== t2 && 1 === t2.nodeType && "string" == typeof t2.nodeName;
          }
          function h(t2) {
            var n2 = Object.prototype.toString.call(t2);
            return "[object Window]" === n2 || "[object DOMWindow]" === n2 || "[object global]" === n2;
          }
          function g(t2) {
            return null != t2 && "string" != typeof t2 && "boolean" != typeof t2 && "number" != typeof t2 && "function" != typeof t2 && "symbol" != typeof t2 && "bigint" != typeof t2 && ("undefined" != typeof Symbol && "function" == typeof t2[Symbol.iterator]);
          }
          function m2(t2) {
            return Object.prototype.toString.call(t2).replace(/\[object (.*)\]/, "$1");
          }
          e.d(n, { C4: function() {
            return i2;
          }, DV: function() {
            return b;
          }, FJ: function() {
            return h;
          }, Ft: function() {
            return l;
          }, HD: function() {
            return a;
          }, H_: function() {
            return B;
          }, KL: function() {
            return O;
          }, Kn: function() {
            return d;
          }, MH: function() {
            return R;
          }, PO: function() {
            return y;
          }, QI: function() {
            return j;
          }, QK: function() {
            return k;
          }, TW: function() {
            return g;
          }, _3: function() {
            return o;
          }, _D: function() {
            return P2;
          }, cF: function() {
            return S;
          }, hZ: function() {
            return C;
          }, hj: function() {
            return r;
          }, id: function() {
            return I;
          }, jn: function() {
            return u;
          }, kJ: function() {
            return c2;
          }, kK: function() {
            return p;
          }, mf: function() {
            return v;
          }, o8: function() {
            return s;
          }, po: function() {
            return M;
          }, qr: function() {
            return $;
          }, qt: function() {
            return A;
          }, rE: function() {
            return L;
          }, yk: function() {
            return f;
          }, zl: function() {
            return m2;
          } });
          var _ = /(function|class) ([^ \{\()}]{1,})[\(| ]/;
          function b(t2) {
            var n2;
            if (null == t2) return "";
            var e2 = _.exec((null == t2 || null == (n2 = t2.constructor) ? void 0 : n2.toString()) || "");
            return e2 && e2.length > 1 ? e2[2] : "";
          }
          function y(t2) {
            var n2, e2 = Object.prototype.hasOwnProperty;
            if (!t2 || "object" != typeof t2 || t2.nodeType || h(t2)) return false;
            try {
              if (t2.constructor && !e2.call(t2, "constructor") && !e2.call(t2.constructor.prototype, "isPrototypeOf")) return false;
            } catch (t3) {
              return false;
            }
            for (n2 in t2) ;
            return void 0 === n2 || e2.call(t2, n2);
          }
          var w = /[\n\t]/g, E = function(t2) {
            return { "\n": "\\n", "	": "\\t" }[t2];
          };
          function L(t2) {
            return "string" != typeof t2 ? t2 : String(t2).replace(w, E);
          }
          var T = function(t2, n2) {
            void 0 === n2 && (n2 = 0);
            var e2 = "";
            return a(t2) ? (n2 > 0 && (t2 = I(t2, n2)), e2 += '"' + L(t2) + '"') : f(t2) ? e2 += String(t2).replace(/^Symbol\((.*)\)$/i, 'Symbol("$1")') : v(t2) ? e2 += (t2.name || "function") + "()" : i2(t2) ? e2 += String(t2) + "n" : e2 += String(t2), e2;
          }, x = function t2(n2, e2, o2) {
            if (void 0 === o2 && (o2 = 0), d(n2) || c2(n2)) if (e2.circularFinder(n2)) {
              var r2 = "";
              if (c2(n2)) r2 = "(Circular Array)";
              else if (d(n2)) {
                var i3;
                r2 = "(Circular " + ((null == (i3 = n2.constructor) ? void 0 : i3.name) || "Object") + ")";
              }
              e2.ret += e2.standardJSON ? '"' + r2 + '"' : r2;
            } else {
              var u2 = "", s2 = "";
              if (e2.pretty) {
                for (var l2 = 0; l2 <= o2; l2++) u2 += "  ";
                s2 = "\n";
              }
              var v2 = "{", p2 = "}";
              c2(n2) && (v2 = "[", p2 = "]"), e2.ret += v2 + s2;
              for (var h2 = R(n2), g2 = 0; g2 < h2.length; g2++) {
                var m3 = h2[g2];
                e2.ret += u2;
                try {
                  c2(n2) || (d(m3) || c2(m3) || f(m3) ? e2.ret += Object.prototype.toString.call(m3) : a(m3) && e2.standardJSON ? e2.ret += '"' + m3 + '"' : e2.ret += m3, e2.ret += ": ");
                } catch (t3) {
                  continue;
                }
                try {
                  var _2 = n2[m3];
                  if (c2(_2)) e2.maxDepth > -1 && o2 >= e2.maxDepth ? e2.ret += "Array(" + _2.length + ")" : t2(_2, e2, o2 + 1);
                  else if (d(_2)) {
                    var b2;
                    if (e2.maxDepth > -1 && o2 >= e2.maxDepth) e2.ret += ((null == (b2 = _2.constructor) ? void 0 : b2.name) || "Object") + " {}";
                    else t2(_2, e2, o2 + 1);
                  } else e2.ret += T(_2, e2.keyMaxLen);
                } catch (t3) {
                  e2.ret += e2.standardJSON ? '"(PARSE_ERROR)"' : "(PARSE_ERROR)";
                }
                if (e2.keyMaxLen > 0 && e2.ret.length >= 10 * e2.keyMaxLen) {
                  e2.ret += ", (...)";
                  break;
                }
                g2 < h2.length - 1 && (e2.ret += ", "), e2.ret += s2;
              }
              e2.ret += u2.substring(0, u2.length - 2) + p2;
            }
            else e2.ret += T(n2, e2.keyMaxLen);
          };
          function C(t2, n2) {
            void 0 === n2 && (n2 = { maxDepth: -1, keyMaxLen: -1, pretty: false, standardJSON: false });
            var e2, o2 = Object.assign({ ret: "", maxDepth: -1, keyMaxLen: -1, pretty: false, standardJSON: false, circularFinder: (e2 = /* @__PURE__ */ new WeakSet(), function(t3) {
              if ("object" == typeof t3 && null !== t3) {
                if (e2.has(t3)) return true;
                e2.add(t3);
              }
              return false;
            }) }, n2);
            return x(t2, o2), o2.ret;
          }
          function O(t2) {
            return t2 <= 0 ? "" : t2 >= 1e6 ? (t2 / 1e3 / 1e3).toFixed(1) + " MB" : t2 >= 1e3 ? (t2 / 1e3).toFixed(1) + " KB" : t2 + " B";
          }
          function I(t2, n2) {
            return t2.length > n2 && (t2 = t2.substring(0, n2) + "...(" + O((function(t3) {
              try {
                return encodeURI(t3).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
              } catch (t4) {
                return 0;
              }
            })(t2)) + ")"), t2;
          }
          var D = function(t2, n2) {
            return String(t2).localeCompare(String(n2), void 0, { numeric: true, sensitivity: "base" });
          };
          function $(t2) {
            return t2.sort(D);
          }
          function R(t2) {
            return d(t2) || c2(t2) ? Object.keys(t2) : [];
          }
          function k(t2) {
            var n2 = R(t2), e2 = (function(t3) {
              return d(t3) || c2(t3) ? Object.getOwnPropertyNames(t3) : [];
            })(t2);
            return e2.filter((function(t3) {
              return -1 === n2.indexOf(t3);
            }));
          }
          function P2(t2) {
            return d(t2) || c2(t2) ? Object.getOwnPropertySymbols(t2) : [];
          }
          function M(t2, n2) {
            window.localStorage && (t2 = "vConsole_" + t2, localStorage.setItem(t2, n2));
          }
          function S(t2) {
            if (window.localStorage) return t2 = "vConsole_" + t2, localStorage.getItem(t2);
          }
          function j(t2) {
            return void 0 === t2 && (t2 = ""), "__vc_" + t2 + Math.random().toString(36).substring(2, 8);
          }
          function B() {
            return "undefined" != typeof window && !!window.__wxConfig && !!window.wx && !!window.__virtualDOM__;
          }
          function A(t2) {
            if (B() && "function" == typeof window.wx[t2]) try {
              for (var n2, e2 = arguments.length, o2 = new Array(e2 > 1 ? e2 - 1 : 0), r2 = 1; r2 < e2; r2++) o2[r2 - 1] = arguments[r2];
              var i3 = (n2 = window.wx[t2]).call.apply(n2, [window.wx].concat(o2));
              return i3;
            } catch (n3) {
              return void console.debug("[vConsole] Fail to call wx." + t2 + "():", n3);
            }
          }
        }, 5629: function(t, n, e) {
          e.d(n, { W: function() {
            return p;
          } });
          var o = e(8270), r = e(6881), i2 = e(5103), a = e(643), c2 = e(4687), u = e(8665), s = e(9923);
          function l(t2, n2) {
            var e2 = Object.keys(t2);
            if (Object.getOwnPropertySymbols) {
              var o2 = Object.getOwnPropertySymbols(t2);
              n2 && (o2 = o2.filter((function(n3) {
                return Object.getOwnPropertyDescriptor(t2, n3).enumerable;
              }))), e2.push.apply(e2, o2);
            }
            return e2;
          }
          function f(t2) {
            for (var n2 = 1; n2 < arguments.length; n2++) {
              var e2 = null != arguments[n2] ? arguments[n2] : {};
              n2 % 2 ? l(Object(e2), true).forEach((function(n3) {
                (0, o.Z)(t2, n3, e2[n3]);
              })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(e2)) : l(Object(e2)).forEach((function(n3) {
                Object.defineProperty(t2, n3, Object.getOwnPropertyDescriptor(e2, n3));
              }));
            }
            return t2;
          }
          function d(t2, n2) {
            var e2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
            if (e2) return (e2 = e2.call(t2)).next.bind(e2);
            if (Array.isArray(t2) || (e2 = (function(t3, n3) {
              if (!t3) return;
              if ("string" == typeof t3) return v(t3, n3);
              var e3 = Object.prototype.toString.call(t3).slice(8, -1);
              "Object" === e3 && t3.constructor && (e3 = t3.constructor.name);
              if ("Map" === e3 || "Set" === e3) return Array.from(t3);
              if ("Arguments" === e3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3)) return v(t3, n3);
            })(t2)) || n2) {
              e2 && (t2 = e2);
              var o2 = 0;
              return function() {
                return o2 >= t2.length ? { done: true } : { done: false, value: t2[o2++] };
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function v(t2, n2) {
            (null == n2 || n2 > t2.length) && (n2 = t2.length);
            for (var e2 = 0, o2 = new Array(n2); e2 < n2; e2++) o2[e2] = t2[e2];
            return o2;
          }
          var p = (function(t2) {
            function n2() {
              for (var n3, e3 = arguments.length, o2 = new Array(e3), r2 = 0; r2 < e3; r2++) o2[r2] = arguments[r2];
              return (n3 = t2.call.apply(t2, [this].concat(o2)) || this).LOG_METHODS = ["log", "info", "warn", "debug", "error"], n3.ADDED_LOG_PLUGIN_ID = [], n3.maxLogNumber = 1e3, n3.logCounter = 0, n3.groupLevel = 0, n3.groupLabelCollapsedStack = [], n3.pluginPattern = void 0, n3.logQueue = [], n3.flushLogScheduled = false, n3.origConsole = {}, n3;
            }
            (0, r.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.bindPlugin = function(t3) {
              return !(this.ADDED_LOG_PLUGIN_ID.indexOf(t3) > -1) && (0 === this.ADDED_LOG_PLUGIN_ID.length && this.mockConsole(), s.O.create(t3), this.ADDED_LOG_PLUGIN_ID.push(t3), this.pluginPattern = new RegExp("^\\[(" + this.ADDED_LOG_PLUGIN_ID.join("|") + ")\\]$", "i"), true);
            }, e2.unbindPlugin = function(t3) {
              var n3 = this.ADDED_LOG_PLUGIN_ID.indexOf(t3);
              return -1 !== n3 && (this.ADDED_LOG_PLUGIN_ID.splice(n3, 1), s.O.delete(t3), 0 === this.ADDED_LOG_PLUGIN_ID.length && this.unmockConsole(), true);
            }, e2.mockConsole = function() {
              var t3 = this;
              "function" != typeof this.origConsole.log && (window.console ? (this.LOG_METHODS.map((function(n3) {
                t3.origConsole[n3] = window.console[n3];
              })), this.origConsole.time = window.console.time, this.origConsole.timeEnd = window.console.timeEnd, this.origConsole.clear = window.console.clear, this.origConsole.group = window.console.group, this.origConsole.groupCollapsed = window.console.groupCollapsed, this.origConsole.groupEnd = window.console.groupEnd) : window.console = {}, this._mockConsoleLog(), this._mockConsoleTime(), this._mockConsoleGroup(), this._mockConsoleClear(), window._vcOrigConsole = this.origConsole);
            }, e2._mockConsoleLog = function() {
              var t3 = this;
              this.LOG_METHODS.map((function(n3) {
                window.console[n3] = (function() {
                  for (var e3 = arguments.length, o2 = new Array(e3), r2 = 0; r2 < e3; r2++) o2[r2] = arguments[r2];
                  t3.addLog({ type: n3, origData: o2 || [] });
                }).bind(window.console);
              }));
            }, e2._mockConsoleTime = function() {
              var t3 = this, n3 = {};
              window.console.time = (function(t4) {
                void 0 === t4 && (t4 = ""), n3[t4] = Date.now();
              }).bind(window.console), window.console.timeEnd = (function(e3) {
                void 0 === e3 && (e3 = "");
                var o2 = n3[e3], r2 = 0;
                o2 && (r2 = Date.now() - o2, delete n3[e3]), t3.addLog({ type: "log", origData: [e3 + ": " + r2 + "ms"] });
              }).bind(window.console);
            }, e2._mockConsoleGroup = function() {
              var t3 = this, n3 = function(n4) {
                return (function(e3) {
                  void 0 === e3 && (e3 = "console.group");
                  var o2 = Symbol(e3);
                  t3.groupLabelCollapsedStack.push({ label: o2, collapsed: n4 }), t3.addLog({ type: "log", origData: [e3], isGroupHeader: n4 ? 2 : 1, isGroupCollapsed: false }, { noOrig: true }), t3.groupLevel++, n4 ? t3.origConsole.groupCollapsed(e3) : t3.origConsole.group(e3);
                }).bind(window.console);
              };
              window.console.group = n3(false), window.console.groupCollapsed = n3(true), window.console.groupEnd = (function() {
                t3.groupLabelCollapsedStack.pop(), t3.groupLevel = Math.max(0, t3.groupLevel - 1), t3.origConsole.groupEnd();
              }).bind(window.console);
            }, e2._mockConsoleClear = function() {
              var t3 = this;
              window.console.clear = (function() {
                t3.resetGroup(), t3.clearLog();
                for (var n3 = arguments.length, e3 = new Array(n3), o2 = 0; o2 < n3; o2++) e3[o2] = arguments[o2];
                t3.callOriginalConsole.apply(t3, ["clear"].concat(e3));
              }).bind(window.console);
            }, e2.unmockConsole = function() {
              for (var t3 in this.origConsole) window.console[t3] = this.origConsole[t3], delete this.origConsole[t3];
              window._vcOrigConsole && delete window._vcOrigConsole;
            }, e2.callOriginalConsole = function(t3) {
              if ("function" == typeof this.origConsole[t3]) {
                for (var n3 = arguments.length, e3 = new Array(n3 > 1 ? n3 - 1 : 0), o2 = 1; o2 < n3; o2++) e3[o2 - 1] = arguments[o2];
                this.origConsole[t3].apply(window.console, e3);
              }
            }, e2.resetGroup = function() {
              for (; this.groupLevel > 0; ) console.groupEnd();
            }, e2.clearLog = function() {
              var t3 = s.O.getAll();
              for (var n3 in t3) this.clearPluginLog(n3);
            }, e2.clearPluginLog = function(t3) {
              var n3 = this.logQueue;
              this.logQueue = [];
              for (var e3, o2 = d(n3); !(e3 = o2()).done; ) {
                var r2 = e3.value;
                this._extractPluginIdByLog(r2) !== t3 && this.logQueue.push(r2);
              }
              s.O.get(t3).update((function(t4) {
                return t4.logList.length = 0, t4;
              })), c2.x.updateTime();
            }, e2.addLog = function(t3, n3) {
              void 0 === t3 && (t3 = { type: "log", origData: [], isGroupHeader: 0, isGroupCollapsed: false });
              var e3 = this.groupLabelCollapsedStack[this.groupLabelCollapsedStack.length - 2], o2 = this.groupLabelCollapsedStack[this.groupLabelCollapsedStack.length - 1], r2 = { _id: i2.QI(), type: t3.type, cmdType: null == n3 ? void 0 : n3.cmdType, toggle: {}, date: Date.now(), data: (0, u.b1)(t3.origData || []), repeated: 0, groupLabel: null == o2 ? void 0 : o2.label, groupLevel: this.groupLevel, groupHeader: t3.isGroupHeader, groupCollapsed: t3.isGroupHeader ? !(null == e3 || !e3.collapsed) : !(null == o2 || !o2.collapsed) };
              this._signalLog(r2), null != n3 && n3.noOrig || this.callOriginalConsole.apply(this, [t3.type].concat(t3.origData));
            }, e2.evalCommand = function(t3) {
              this.addLog({ type: "log", origData: [t3] }, { cmdType: "input" });
              var n3 = void 0;
              try {
                n3 = eval.call(window, "(" + t3 + ")");
              } catch (e3) {
                try {
                  n3 = eval.call(window, t3);
                } catch (t4) {
                }
              }
              this.addLog({ type: "log", origData: [n3] }, { cmdType: "output" });
            }, e2._signalLog = function(t3) {
              var n3 = this;
              this.flushLogScheduled || (this.flushLogScheduled = true, window.requestAnimationFrame((function() {
                n3.flushLogScheduled = false, n3._flushLogs();
              }))), this.logQueue.push(t3);
            }, e2._flushLogs = function() {
              var t3 = this, n3 = this.logQueue;
              this.logQueue = [];
              for (var e3, o2 = {}, r2 = d(n3); !(e3 = r2()).done; ) {
                var i3 = e3.value, a2 = this._extractPluginIdByLog(i3);
                (o2[a2] = o2[a2] || []).push(i3);
              }
              for (var u2 = function(n4) {
                var e4 = o2[n4];
                s.O.get(n4).update((function(n5) {
                  for (var o3, r3 = [].concat(n5.logList), i4 = d(e4); !(o3 = i4()).done; ) {
                    var a3 = o3.value;
                    t3._isRepeatedLog(r3, a3) ? t3._updateLastLogRepeated(r3) : r3.push(a3);
                  }
                  return { logList: r3 = t3._limitLogListLength(r3) };
                }));
              }, l2 = 0, f2 = Object.keys(o2); l2 < f2.length; l2++) {
                u2(f2[l2]);
              }
              c2.x.updateTime();
            }, e2._extractPluginIdByLog = function(t3) {
              var n3, e3 = "default", o2 = null == (n3 = t3.data[0]) ? void 0 : n3.origData;
              if (i2.HD(o2)) {
                var r2 = o2.match(this.pluginPattern);
                if (null !== r2 && r2.length > 1) {
                  var a2 = r2[1].toLowerCase();
                  this.ADDED_LOG_PLUGIN_ID.indexOf(a2) > -1 && (e3 = a2, t3.data.shift());
                }
              }
              return e3;
            }, e2._isRepeatedLog = function(t3, n3) {
              var e3 = t3[t3.length - 1];
              if (!e3) return false;
              var o2 = false;
              if (n3.type === e3.type && n3.cmdType === e3.cmdType && n3.data.length === e3.data.length) {
                o2 = true;
                for (var r2 = 0; r2 < n3.data.length; r2++) if (n3.data[r2].origData !== e3.data[r2].origData) {
                  o2 = false;
                  break;
                }
              }
              return o2;
            }, e2._updateLastLogRepeated = function(t3) {
              var n3 = t3[t3.length - 1], e3 = n3.repeated ? n3.repeated + 1 : 2;
              return t3[t3.length - 1] = f(f({}, n3), {}, { repeated: e3 }), t3;
            }, e2._limitLogListLength = function(t3) {
              var n3 = t3.length, e3 = this.maxLogNumber;
              return n3 > e3 ? t3.slice(n3 - e3, n3) : t3;
            }, n2;
          })(a.N);
        }, 9923: function(t, n, e) {
          e.d(n, { O: function() {
            return r;
          } });
          var o = e(3313), r = (function() {
            function t2() {
            }
            return t2.create = function(t3) {
              return this.storeMap[t3] || (this.storeMap[t3] = (0, o.fZ)({ logList: [] })), this.storeMap[t3];
            }, t2.delete = function(t3) {
              this.storeMap[t3] && delete this.storeMap[t3];
            }, t2.get = function(t3) {
              return this.storeMap[t3];
            }, t2.getRaw = function(t3) {
              return (0, o.U2)(this.storeMap[t3]);
            }, t2.getAll = function() {
              return this.storeMap;
            }, t2;
          })();
          r.storeMap = {};
        }, 8665: function(t, n, e) {
          e.d(n, { HX: function() {
            return l;
          }, LH: function() {
            return i2;
          }, Tg: function() {
            return v;
          }, b1: function() {
            return d;
          }, oj: function() {
            return s;
          } });
          var o = e(5103), r = function(t2) {
            var n2 = o.hZ(t2, { maxDepth: 0 }), e2 = n2.substring(0, 36), r2 = o.DV(t2);
            return n2.length > 36 && (e2 += "..."), r2 = o.rE(r2 + " " + e2);
          }, i2 = function(t2, n2) {
            void 0 === n2 && (n2 = true);
            var e2 = "undefined", i3 = t2;
            return t2 instanceof v ? (e2 = "uninvocatable", i3 = "(...)") : o.kJ(t2) ? (e2 = "array", i3 = r(t2)) : o.Kn(t2) ? (e2 = "object", i3 = r(t2)) : o.HD(t2) ? (e2 = "string", i3 = o.rE(t2), n2 && (i3 = '"' + i3 + '"')) : o.hj(t2) ? (e2 = "number", i3 = String(t2)) : o.C4(t2) ? (e2 = "bigint", i3 = String(t2) + "n") : o.jn(t2) ? (e2 = "boolean", i3 = String(t2)) : o.Ft(t2) ? (e2 = "null", i3 = "null") : o.o8(t2) ? (e2 = "undefined", i3 = "undefined") : o.mf(t2) ? (e2 = "function", i3 = (t2.name || "function") + "()") : o.yk(t2) && (e2 = "symbol", i3 = String(t2)), { text: i3, valueType: e2 };
          }, a = [".", "[", "(", "{", "}"], c2 = ["]", ")", "}"], u = function(t2, n2, e2) {
            void 0 === e2 && (e2 = 0);
            for (var o2 = { text: "", pos: -1, before: "", after: "" }, r2 = t2.length - 1; r2 >= e2; r2--) {
              var i3 = n2.indexOf(t2[r2]);
              if (i3 > -1) {
                o2.text = n2[i3], o2.pos = r2, o2.before = t2.substring(e2, r2), o2.after = t2.substring(r2 + 1, t2.length);
                break;
              }
            }
            return o2;
          }, s = function(t2) {
            var n2 = u(t2, a, 0);
            return { front: n2, back: u(t2, c2, n2.pos + 1) };
          }, l = function(t2, n2) {
            if ("" === n2) return true;
            for (var e2 = 0; e2 < t2.data.length; e2++) {
              if ("string" === typeof t2.data[e2].origData && t2.data[e2].origData.indexOf(n2) > -1) return true;
            }
            return false;
          }, f = /(\%[csdo] )|( \%[csdo])/g, d = function(t2) {
            if (f.lastIndex = 0, o.HD(t2[0]) && f.test(t2[0])) {
              for (var n2, e2 = [].concat(t2), r2 = e2.shift().split(f).filter((function(t3) {
                return void 0 !== t3 && "" !== t3;
              })), i3 = e2, a2 = [], c3 = false, u2 = ""; r2.length > 0; ) {
                var s2 = r2.shift();
                if (/ ?\%c ?/.test(s2) ? i3.length > 0 ? "string" != typeof (u2 = i3.shift()) && (u2 = "") : (n2 = s2, u2 = "", c3 = true) : / ?\%[sd] ?/.test(s2) ? (n2 = i3.length > 0 ? o.Kn(i3[0]) ? o.DV(i3.shift()) : String(i3.shift()) : s2, c3 = true) : / ?\%o ?/.test(s2) ? (n2 = i3.length > 0 ? i3.shift() : s2, c3 = true) : (n2 = s2, c3 = true), c3) {
                  var l2 = { origData: n2 };
                  u2 && (l2.style = u2), a2.push(l2), c3 = false, n2 = void 0, u2 = "";
                }
              }
              for (var d2 = 0; d2 < i3.length; d2++) a2.push({ origData: i3[d2] });
              return a2;
            }
            for (var v2 = [], p = 0; p < t2.length; p++) v2.push({ origData: t2[p] });
            return v2;
          }, v = function() {
          };
        }, 5313: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, ".vc-icon {\n  word-break: normal;\n  white-space: normal;\n  overflow: visible;\n}\n.vc-icon svg {\n  fill: var(--VC-FG-2);\n  height: 1em;\n  width: 1em;\n  vertical-align: -0.11em;\n}\n.vc-icon .vc-icon-delete {\n  vertical-align: -0.11em;\n}\n.vc-icon .vc-icon-copy {\n  height: 1.1em;\n  width: 1.1em;\n  vertical-align: -0.16em;\n}\n.vc-icon .vc-icon-suc {\n  fill: var(--VC-TEXTGREEN);\n  height: 1.1em;\n  width: 1.1em;\n  vertical-align: -0.16em;\n}\n", ""]), n.Z = a;
        }, 1142: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, ".vc-scroller-viewport {\n  position: relative;\n  overflow: hidden;\n  height: 100%;\n}\n.vc-scroller-contents {\n  min-height: 100%;\n  will-change: transform;\n}\n.vc-scroller-items {\n  will-change: height;\n  position: relative;\n}\n.vc-scroller-item {\n  display: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n}\n.vc-scroller-viewport.static .vc-scroller-item {\n  display: block;\n  position: static;\n}\n.vc-scroller-scrollbar-track {\n  width: 4px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  padding: 1px;\n}\n.vc-scroller-scrollbar-thumb {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  border-radius: 999px;\n}\n", ""]), n.Z = a;
        }, 3283: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, '#__vconsole {\n  --VC-BG-0: #ededed;\n  --VC-BG-1: #f7f7f7;\n  --VC-BG-2: #fff;\n  --VC-BG-3: #f7f7f7;\n  --VC-BG-4: #4c4c4c;\n  --VC-BG-5: #fff;\n  --VC-BG-6: rgba(0, 0, 0, 0.1);\n  --VC-FG-0: rgba(0, 0, 0, 0.9);\n  --VC-FG-HALF: rgba(0, 0, 0, 0.9);\n  --VC-FG-1: rgba(0, 0, 0, 0.5);\n  --VC-FG-2: rgba(0, 0, 0, 0.3);\n  --VC-FG-3: rgba(0, 0, 0, 0.1);\n  --VC-RED: #fa5151;\n  --VC-ORANGE: #fa9d3b;\n  --VC-YELLOW: #ffc300;\n  --VC-GREEN: #91d300;\n  --VC-LIGHTGREEN: #95ec69;\n  --VC-BRAND: #07c160;\n  --VC-BLUE: #10aeff;\n  --VC-INDIGO: #1485ee;\n  --VC-PURPLE: #6467f0;\n  --VC-LINK: #576b95;\n  --VC-TEXTGREEN: #06ae56;\n  --VC-FG: black;\n  --VC-BG: white;\n  --VC-BG-COLOR-ACTIVE: #ececec;\n  --VC-WARN-BG: #fff3cc;\n  --VC-WARN-BORDER: #ffe799;\n  --VC-ERROR-BG: #fedcdc;\n  --VC-ERROR-BORDER: #fdb9b9;\n  --VC-DOM-TAG-NAME-COLOR: #881280;\n  --VC-DOM-ATTRIBUTE-NAME-COLOR: #994500;\n  --VC-DOM-ATTRIBUTE-VALUE-COLOR: #1a1aa6;\n  --VC-CODE-KEY-FG: #881391;\n  --VC-CODE-PRIVATE-KEY-FG: #cfa1d3;\n  --VC-CODE-FUNC-FG: #0d22aa;\n  --VC-CODE-NUMBER-FG: #1c00cf;\n  --VC-CODE-STR-FG: #c41a16;\n  --VC-CODE-NULL-FG: #808080;\n  color: var(--VC-FG-0);\n  font-size: 13px;\n  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n  -webkit-user-select: auto;\n  /* global */\n}\n#__vconsole .vc-max-height {\n  max-height: 19.23076923em;\n}\n#__vconsole .vc-max-height-line {\n  max-height: 6.30769231em;\n}\n#__vconsole .vc-min-height {\n  min-height: 3.07692308em;\n}\n#__vconsole dd,\n#__vconsole dl,\n#__vconsole pre {\n  margin: 0;\n}\n#__vconsole pre {\n  white-space: pre-wrap;\n}\n#__vconsole i {\n  font-style: normal;\n}\n.vc-table {\n  height: 100%;\n}\n.vc-table .vc-table-row {\n  line-height: 1.5;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  overflow: hidden;\n  border-bottom: 1px solid var(--VC-FG-3);\n}\n.vc-table .vc-table-row.vc-left-border {\n  border-left: 1px solid var(--VC-FG-3);\n}\n.vc-table .vc-table-row-icon {\n  margin-left: 4px;\n}\n.vc-table .vc-table-col {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -moz-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  padding: 0.23076923em 0.30769231em;\n  border-left: 1px solid var(--VC-FG-3);\n  overflow: auto;\n}\n.vc-table .vc-table-col:first-child {\n  border: none;\n}\n.vc-table .vc-table-col-value {\n  white-space: pre-wrap;\n  word-break: break-word;\n  /*white-space: nowrap;\n    text-overflow: ellipsis;*/\n  -webkit-overflow-scrolling: touch;\n}\n.vc-table .vc-small .vc-table-col {\n  padding: 0 0.30769231em;\n  font-size: 0.92307692em;\n}\n.vc-table .vc-table-col-2 {\n  -webkit-box-flex: 2;\n  -webkit-flex: 2;\n  -moz-box-flex: 2;\n  -ms-flex: 2;\n  flex: 2;\n}\n.vc-table .vc-table-col-3 {\n  -webkit-box-flex: 3;\n  -webkit-flex: 3;\n  -moz-box-flex: 3;\n  -ms-flex: 3;\n  flex: 3;\n}\n.vc-table .vc-table-col-4 {\n  -webkit-box-flex: 4;\n  -webkit-flex: 4;\n  -moz-box-flex: 4;\n  -ms-flex: 4;\n  flex: 4;\n}\n.vc-table .vc-table-col-5 {\n  -webkit-box-flex: 5;\n  -webkit-flex: 5;\n  -moz-box-flex: 5;\n  -ms-flex: 5;\n  flex: 5;\n}\n.vc-table .vc-table-col-6 {\n  -webkit-box-flex: 6;\n  -webkit-flex: 6;\n  -moz-box-flex: 6;\n  -ms-flex: 6;\n  flex: 6;\n}\n.vc-table .vc-table-row-error {\n  border-color: var(--VC-ERROR-BORDER);\n  background-color: var(--VC-ERROR-BG);\n}\n.vc-table .vc-table-row-error .vc-table-col {\n  color: var(--VC-RED);\n  border-color: var(--VC-ERROR-BORDER);\n}\n.vc-table .vc-table-col-title {\n  font-weight: bold;\n}\n.vc-table .vc-table-action {\n  display: flex;\n  justify-content: space-evenly;\n}\n.vc-table .vc-table-action .vc-icon {\n  flex: 1;\n  text-align: center;\n  display: block;\n}\n.vc-table .vc-table-action .vc-icon:hover {\n  background: var(--VC-BG-3);\n}\n.vc-table .vc-table-action .vc-icon:active {\n  background: var(--VC-BG-1);\n}\n.vc-table .vc-table-input {\n  width: 100%;\n  border: none;\n  color: var(--VC-FG-0);\n  background-color: var(--VC-BG-6);\n  height: 3.53846154em;\n}\n.vc-table .vc-table-input:focus {\n  background-color: var(--VC-FG-2);\n}\n@media (prefers-color-scheme: dark) {\n  #__vconsole:not([data-theme="light"]) {\n    --VC-BG-0: #191919;\n    --VC-BG-1: #1f1f1f;\n    --VC-BG-2: #232323;\n    --VC-BG-3: #2f2f2f;\n    --VC-BG-4: #606060;\n    --VC-BG-5: #2c2c2c;\n    --VC-BG-6: rgba(255, 255, 255, 0.2);\n    --VC-FG-0: rgba(255, 255, 255, 0.8);\n    --VC-FG-HALF: rgba(255, 255, 255, 0.6);\n    --VC-FG-1: rgba(255, 255, 255, 0.5);\n    --VC-FG-2: rgba(255, 255, 255, 0.3);\n    --VC-FG-3: rgba(255, 255, 255, 0.05);\n    --VC-RED: #fa5151;\n    --VC-ORANGE: #c87d2f;\n    --VC-YELLOW: #cc9c00;\n    --VC-GREEN: #74a800;\n    --VC-LIGHTGREEN: #28b561;\n    --VC-BRAND: #07c160;\n    --VC-BLUE: #10aeff;\n    --VC-INDIGO: #1196ff;\n    --VC-PURPLE: #8183ff;\n    --VC-LINK: #7d90a9;\n    --VC-TEXTGREEN: #259c5c;\n    --VC-FG: white;\n    --VC-BG: black;\n    --VC-BG-COLOR-ACTIVE: #282828;\n    --VC-WARN-BG: #332700;\n    --VC-WARN-BORDER: #664e00;\n    --VC-ERROR-BG: #321010;\n    --VC-ERROR-BORDER: #642020;\n    --VC-DOM-TAG-NAME-COLOR: #5DB0D7;\n    --VC-DOM-ATTRIBUTE-NAME-COLOR: #9BBBDC;\n    --VC-DOM-ATTRIBUTE-VALUE-COLOR: #f29766;\n    --VC-CODE-KEY-FG: #e36eec;\n    --VC-CODE-PRIVATE-KEY-FG: #f4c5f7;\n    --VC-CODE-FUNC-FG: #556af2;\n    --VC-CODE-NUMBER-FG: #9980ff;\n    --VC-CODE-STR-FG: #e93f3b;\n    --VC-CODE-NULL-FG: #808080;\n  }\n}\n#__vconsole[data-theme="dark"] {\n  --VC-BG-0: #191919;\n  --VC-BG-1: #1f1f1f;\n  --VC-BG-2: #232323;\n  --VC-BG-3: #2f2f2f;\n  --VC-BG-4: #606060;\n  --VC-BG-5: #2c2c2c;\n  --VC-BG-6: rgba(255, 255, 255, 0.2);\n  --VC-FG-0: rgba(255, 255, 255, 0.8);\n  --VC-FG-HALF: rgba(255, 255, 255, 0.6);\n  --VC-FG-1: rgba(255, 255, 255, 0.5);\n  --VC-FG-2: rgba(255, 255, 255, 0.3);\n  --VC-FG-3: rgba(255, 255, 255, 0.05);\n  --VC-RED: #fa5151;\n  --VC-ORANGE: #c87d2f;\n  --VC-YELLOW: #cc9c00;\n  --VC-GREEN: #74a800;\n  --VC-LIGHTGREEN: #28b561;\n  --VC-BRAND: #07c160;\n  --VC-BLUE: #10aeff;\n  --VC-INDIGO: #1196ff;\n  --VC-PURPLE: #8183ff;\n  --VC-LINK: #7d90a9;\n  --VC-TEXTGREEN: #259c5c;\n  --VC-FG: white;\n  --VC-BG: black;\n  --VC-BG-COLOR-ACTIVE: #282828;\n  --VC-WARN-BG: #332700;\n  --VC-WARN-BORDER: #664e00;\n  --VC-ERROR-BG: #321010;\n  --VC-ERROR-BORDER: #642020;\n  --VC-DOM-TAG-NAME-COLOR: #5DB0D7;\n  --VC-DOM-ATTRIBUTE-NAME-COLOR: #9BBBDC;\n  --VC-DOM-ATTRIBUTE-VALUE-COLOR: #f29766;\n  --VC-CODE-KEY-FG: #e36eec;\n  --VC-CODE-PRIVATE-KEY-FG: #f4c5f7;\n  --VC-CODE-FUNC-FG: #556af2;\n  --VC-CODE-NUMBER-FG: #9980ff;\n  --VC-CODE-STR-FG: #e93f3b;\n  --VC-CODE-NULL-FG: #808080;\n}\n.vc-tabbar {\n  border-bottom: 1px solid var(--VC-FG-3);\n  overflow-x: auto;\n  height: 3em;\n  width: auto;\n  white-space: nowrap;\n}\n.vc-tabbar .vc-tab {\n  display: inline-block;\n  line-height: 3em;\n  padding: 0 1.15384615em;\n  border-right: 1px solid var(--VC-FG-3);\n  text-decoration: none;\n  color: var(--VC-FG-0);\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n.vc-tabbar .vc-tab:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n.vc-tabbar .vc-tab.vc-actived {\n  background-color: var(--VC-BG-1);\n}\n.vc-toolbar {\n  border-top: 1px solid var(--VC-FG-3);\n  line-height: 3em;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n.vc-toolbar .vc-tool {\n  display: none;\n  font-style: normal;\n  text-decoration: none;\n  color: var(--VC-FG-0);\n  width: 50%;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -moz-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  text-align: center;\n  position: relative;\n  -webkit-touch-callout: none;\n}\n.vc-toolbar .vc-tool.vc-toggle,\n.vc-toolbar .vc-tool.vc-global-tool {\n  display: block;\n}\n.vc-toolbar .vc-tool:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n.vc-toolbar .vc-tool:after {\n  content: " ";\n  position: absolute;\n  top: 0.53846154em;\n  bottom: 0.53846154em;\n  right: 0;\n  border-left: 1px solid var(--VC-FG-3);\n}\n.vc-toolbar .vc-tool-last:after {\n  border: none;\n}\n.vc-topbar {\n  background-color: var(--VC-BG-1);\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  width: 100%;\n}\n.vc-topbar .vc-toptab {\n  display: none;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -moz-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  line-height: 2.30769231em;\n  padding: 0 1.15384615em;\n  border-bottom: 1px solid var(--VC-FG-3);\n  text-decoration: none;\n  text-align: center;\n  color: var(--VC-FG-0);\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n.vc-topbar .vc-toptab.vc-toggle {\n  display: block;\n}\n.vc-topbar .vc-toptab:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n.vc-topbar .vc-toptab.vc-actived {\n  border-bottom: 1px solid var(--VC-INDIGO);\n}\n.vc-mask {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0);\n  z-index: 10001;\n  -webkit-transition: background 0.3s;\n  transition: background 0.3s;\n  -webkit-tap-highlight-color: transparent;\n  overflow-y: scroll;\n}\n.vc-panel {\n  display: none;\n  position: fixed;\n  min-height: 85%;\n  left: 0;\n  right: 0;\n  bottom: -100%;\n  z-index: 10002;\n  background-color: var(--VC-BG-0);\n  transition: bottom 0.3s;\n}\n.vc-toggle .vc-switch {\n  display: none;\n}\n.vc-toggle .vc-mask {\n  background: rgba(0, 0, 0, 0.6);\n  display: block;\n}\n.vc-toggle .vc-panel {\n  bottom: 0;\n}\n.vc-content {\n  background-color: var(--VC-BG-2);\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: absolute;\n  top: 3.07692308em;\n  left: 0;\n  right: 0;\n  bottom: 3.07692308em;\n  -webkit-overflow-scrolling: touch;\n  margin-bottom: constant(safe-area-inset-bottom);\n  margin-bottom: env(safe-area-inset-bottom);\n}\n.vc-content.vc-has-topbar {\n  top: 5.46153846em;\n}\n.vc-plugin-box {\n  display: none;\n  position: relative;\n  min-height: 100%;\n}\n.vc-plugin-box.vc-fixed-height {\n  height: 100%;\n}\n.vc-plugin-box.vc-actived {\n  display: block;\n}\n.vc-plugin-content {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  flex-direction: column;\n  -webkit-tap-highlight-color: transparent;\n}\n.vc-plugin-content:empty:before {\n  content: "Empty";\n  color: var(--VC-FG-1);\n  position: absolute;\n  top: 45%;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  font-size: 1.15384615em;\n  text-align: center;\n}\n.vc-plugin-empty {\n  color: var(--VC-FG-1);\n  font-size: 1.15384615em;\n  height: 100%;\n  width: 100%;\n  padding: 1.15384615em 0;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {\n  .vc-toolbar,\n  .vc-switch {\n    bottom: constant(safe-area-inset-bottom);\n    bottom: env(safe-area-inset-bottom);\n  }\n}\n', ""]), n.Z = a;
        }, 7558: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, ".vc-switch {\n  display: block;\n  position: fixed;\n  right: 0.76923077em;\n  bottom: 0.76923077em;\n  color: #FFF;\n  background-color: var(--VC-BRAND);\n  line-height: 1;\n  font-size: 1.07692308em;\n  padding: 0.61538462em 1.23076923em;\n  z-index: 10000;\n  border-radius: 0.30769231em;\n  box-shadow: 0 0 0.61538462em rgba(0, 0, 0, 0.4);\n}\n", ""]), n.Z = a;
        }, 5670: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, '/* color */\n.vcelm-node {\n  color: var(--VC-DOM-TAG-NAME-COLOR);\n}\n.vcelm-k {\n  color: var(--VC-DOM-ATTRIBUTE-NAME-COLOR);\n}\n.vcelm-v {\n  color: var(--VC-DOM-ATTRIBUTE-VALUE-COLOR);\n}\n.vcelm-l.vc-actived > .vcelm-node {\n  background-color: var(--VC-FG-3);\n}\n/* layout */\n.vcelm-l {\n  padding-left: 8px;\n  position: relative;\n  word-wrap: break-word;\n  line-height: 1.2;\n}\n/*.vcelm-l.vcelm-noc {\n  padding-left: 0;\n}*/\n.vcelm-l .vcelm-node:active {\n  background-color: var(--VC-BG-COLOR-ACTIVE);\n}\n.vcelm-l.vcelm-noc .vcelm-node:active {\n  background-color: transparent;\n}\n.vcelm-t {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n/* level */\n/* arrow */\n.vcelm-l:before {\n  content: "";\n  display: block;\n  position: absolute;\n  top: 6px;\n  left: 3px;\n  width: 0;\n  height: 0;\n  border: transparent solid 3px;\n  border-left-color: var(--VC-FG-1);\n}\n.vcelm-l.vc-toggle:before {\n  display: block;\n  top: 6px;\n  left: 0;\n  border-top-color: var(--VC-FG-1);\n  border-left-color: transparent;\n}\n.vcelm-l.vcelm-noc:before {\n  display: none;\n}\n', ""]), n.Z = a;
        }, 3327: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, "", ""]), n.Z = a;
        }, 1130: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, ".vc-cmd {\n  height: 3.07692308em;\n  border-top: 1px solid var(--VC-FG-3);\n  display: flex;\n  flex-direction: row;\n}\n.vc-cmd.vc-filter {\n  bottom: 0;\n}\n.vc-cmd-input-wrap {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  position: relative;\n  height: 2.15384615em;\n  padding: 0.46153846em 0.61538462em;\n}\n.vc-cmd-input {\n  width: 100%;\n  border: none;\n  resize: none;\n  outline: none;\n  padding: 0;\n  font-size: 0.92307692em;\n  background-color: transparent;\n  color: var(--VC-FG-0);\n}\n.vc-cmd-input::-webkit-input-placeholder {\n  line-height: 2.15384615em;\n}\n.vc-cmd-btn {\n  width: 3.07692308em;\n  border: none;\n  background-color: var(--VC-BG-0);\n  color: var(--VC-FG-0);\n  outline: none;\n  -webkit-touch-callout: none;\n  font-size: 1em;\n}\n.vc-cmd-clear-btn {\n  flex: 1 3.07692308em;\n  text-align: center;\n  line-height: 3.07692308em;\n}\n.vc-cmd-btn:active,\n.vc-cmd-clear-btn:active {\n  background-color: var(--VC-BG-COLOR-ACTIVE);\n}\n.vc-cmd-prompted {\n  position: absolute;\n  left: 0.46153846em;\n  right: 0.46153846em;\n  background-color: var(--VC-BG-3);\n  border: 1px solid var(--VC-FG-3);\n  overflow-x: scroll;\n  display: none;\n}\n.vc-cmd-prompted li {\n  list-style: none;\n  line-height: 30px;\n  padding: 0 0.46153846em;\n  border-bottom: 1px solid var(--VC-FG-3);\n}\n.vc-cmd-prompted li:active {\n  background-color: var(--VC-BG-COLOR-ACTIVE);\n}\n.vc-cmd-prompted-hide {\n  text-align: center;\n}\n", ""]), n.Z = a;
        }, 7147: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, '.vc-log-row {\n  margin: 0;\n  padding: 0.46153846em 0.61538462em;\n  overflow: hidden;\n  line-height: 1.3;\n  border-bottom: 1px solid var(--VC-FG-3);\n  word-break: break-word;\n  position: relative;\n  display: flex;\n}\n.vc-log-info {\n  color: var(--VC-PURPLE);\n}\n.vc-log-debug {\n  color: var(--VC-YELLOW);\n}\n.vc-log-warn {\n  color: var(--VC-ORANGE);\n  border-color: var(--VC-WARN-BORDER);\n  background-color: var(--VC-WARN-BG);\n}\n.vc-log-error {\n  color: var(--VC-RED);\n  border-color: var(--VC-ERROR-BORDER);\n  background-color: var(--VC-ERROR-BG);\n}\n.vc-logrow-icon {\n  margin-left: auto;\n}\n.vc-log-padding {\n  width: 1.53846154em;\n  border-left: 1px solid var(--VC-FG-3);\n}\n.vc-log-group .vc-log-content {\n  font-weight: bold;\n}\n.vc-log-group-toggle {\n  padding-left: 0.76923077em;\n}\n.vc-log-group-toggle {\n  display: block;\n  font-style: italic;\n  padding-left: 0.76923077em;\n  position: relative;\n}\n.vc-log-group-toggle:active {\n  background-color: var(--VC-BG-COLOR-ACTIVE);\n}\n.vc-log-group > .vc-log-group-toggle::before {\n  content: "";\n  position: absolute;\n  top: 0.30769231em;\n  left: 0.15384615em;\n  width: 0;\n  height: 0;\n  border: transparent solid 0.30769231em;\n  border-left-color: var(--VC-FG-1);\n}\n.vc-log-group.vc-toggle > .vc-log-group-toggle::before {\n  top: 0.46153846em;\n  left: 0;\n  border-top-color: var(--VC-FG-1);\n  border-left-color: transparent;\n}\n.vc-log-time {\n  width: 6.15384615em;\n  color: #777;\n}\n.vc-log-repeat i {\n  margin-right: 0.30769231em;\n  padding: 0 6.5px;\n  color: #D7E0EF;\n  background-color: #42597F;\n  border-radius: 8.66666667px;\n}\n.vc-log-error .vc-log-repeat i {\n  color: #901818;\n  background-color: var(--VC-RED);\n}\n.vc-log-warn .vc-log-repeat i {\n  color: #987D20;\n  background-color: #F4BD02;\n}\n.vc-log-content {\n  flex: 1;\n}\n.vc-log-input,\n.vc-log-output {\n  padding-left: 0.92307692em;\n}\n.vc-log-input:before,\n.vc-log-output:before {\n  content: "›";\n  position: absolute;\n  top: 0.15384615em;\n  left: 0;\n  font-size: 1.23076923em;\n  color: #6A5ACD;\n}\n.vc-log-output:before {\n  content: "‹";\n}\n', ""]), n.Z = a;
        }, 1237: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, '.vc-log-tree {\n  display: block;\n  overflow: auto;\n  position: relative;\n  -webkit-overflow-scrolling: touch;\n}\n.vc-log-tree-node {\n  display: block;\n  font-style: italic;\n  padding-left: 0.76923077em;\n  position: relative;\n}\n.vc-log-tree.vc-is-tree > .vc-log-tree-node:active {\n  background-color: var(--VC-BG-COLOR-ACTIVE);\n}\n.vc-log-tree.vc-is-tree > .vc-log-tree-node::before {\n  content: "";\n  position: absolute;\n  top: 0.30769231em;\n  left: 0.15384615em;\n  width: 0;\n  height: 0;\n  border: transparent solid 0.30769231em;\n  border-left-color: var(--VC-FG-1);\n}\n.vc-log-tree.vc-is-tree.vc-toggle > .vc-log-tree-node::before {\n  top: 0.46153846em;\n  left: 0;\n  border-top-color: var(--VC-FG-1);\n  border-left-color: transparent;\n}\n.vc-log-tree-child {\n  margin-left: 0.76923077em;\n}\n.vc-log-tree-loadmore {\n  text-decoration: underline;\n  padding-left: 1.84615385em;\n  position: relative;\n  color: var(--VC-CODE-FUNC-FG);\n}\n.vc-log-tree-loadmore::before {\n  content: "››";\n  position: absolute;\n  top: -0.15384615em;\n  left: 0.76923077em;\n  font-size: 1.23076923em;\n  color: var(--VC-CODE-FUNC-FG);\n}\n.vc-log-tree-loadmore:active {\n  background-color: var(--VC-BG-COLOR-ACTIVE);\n}\n', ""]), n.Z = a;
        }, 845: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, ".vc-log-key {\n  color: var(--VC-CODE-KEY-FG);\n}\n.vc-log-key-private {\n  color: var(--VC-CODE-PRIVATE-KEY-FG);\n}\n.vc-log-val {\n  white-space: pre-line;\n}\n.vc-log-val-function {\n  color: var(--VC-CODE-FUNC-FG);\n  font-style: italic !important;\n}\n.vc-log-val-bigint {\n  color: var(--VC-CODE-FUNC-FG);\n}\n.vc-log-val-number,\n.vc-log-val-boolean {\n  color: var(--VC-CODE-NUMBER-FG);\n}\n.vc-log-val-string {\n  white-space: pre-wrap;\n}\n.vc-log-val-string.vc-log-val-haskey {\n  color: var(--VC-CODE-STR-FG);\n  white-space: normal;\n}\n.vc-log-val-null,\n.vc-log-val-undefined,\n.vc-log-val-uninvocatable {\n  color: var(--VC-CODE-NULL-FG);\n}\n.vc-log-val-symbol {\n  color: var(--VC-CODE-STR-FG);\n}\n", ""]), n.Z = a;
        }, 8747: function(t, n, e) {
          var o = e(6738), r = e.n(o), i2 = e(7705), a = e.n(i2)()(r());
          a.push([t.id, ".vc-group .vc-group-preview {\n  -webkit-touch-callout: none;\n}\n.vc-group .vc-group-preview:active {\n  background-color: var(--VC-BG-COLOR-ACTIVE);\n}\n.vc-group .vc-group-detail {\n  display: none;\n  padding: 0 0 0.76923077em 1.53846154em;\n  border-bottom: 1px solid var(--VC-FG-3);\n}\n.vc-group.vc-actived .vc-group-detail {\n  display: block;\n  background-color: var(--VC-BG-1);\n}\n.vc-group.vc-actived .vc-table-row {\n  background-color: var(--VC-BG-2);\n}\n.vc-group.vc-actived .vc-group-preview {\n  background-color: var(--VC-BG-1);\n}\n", ""]), n.Z = a;
        }, 3411: function(t, n, e) {
          var o = e(3379), r = e.n(o), i2 = e(7795), a = e.n(i2), c2 = e(569), u = e.n(c2), s = e(3565), l = e.n(s), f = e(9216), d = e.n(f), v = e(4589), p = e.n(v), h = e(1130), g = {};
          h.Z && h.Z.locals && (g.locals = h.Z.locals);
          var m2, _ = 0, b = {};
          b.styleTagTransform = p(), b.setAttributes = l(), b.insert = u().bind(null, "head"), b.domAPI = a(), b.insertStyleElement = d(), g.use = function(t2) {
            return b.options = t2 || {}, _++ || (m2 = r()(h.Z, b)), g;
          }, g.unuse = function() {
            _ > 0 && !--_ && (m2(), m2 = null);
          }, n.Z = g;
        }, 3379: function(t) {
          var n = [];
          function e(t2) {
            for (var e2 = -1, o2 = 0; o2 < n.length; o2++) if (n[o2].identifier === t2) {
              e2 = o2;
              break;
            }
            return e2;
          }
          function o(t2, o2) {
            for (var i2 = {}, a = [], c2 = 0; c2 < t2.length; c2++) {
              var u = t2[c2], s = o2.base ? u[0] + o2.base : u[0], l = i2[s] || 0, f = "".concat(s, " ").concat(l);
              i2[s] = l + 1;
              var d = e(f), v = { css: u[1], media: u[2], sourceMap: u[3], supports: u[4], layer: u[5] };
              if (-1 !== d) n[d].references++, n[d].updater(v);
              else {
                var p = r(v, o2);
                o2.byIndex = c2, n.splice(c2, 0, { identifier: f, updater: p, references: 1 });
              }
              a.push(f);
            }
            return a;
          }
          function r(t2, n2) {
            var e2 = n2.domAPI(n2);
            e2.update(t2);
            return function(n3) {
              if (n3) {
                if (n3.css === t2.css && n3.media === t2.media && n3.sourceMap === t2.sourceMap && n3.supports === t2.supports && n3.layer === t2.layer) return;
                e2.update(t2 = n3);
              } else e2.remove();
            };
          }
          t.exports = function(t2, r2) {
            var i2 = o(t2 = t2 || [], r2 = r2 || {});
            return function(t3) {
              t3 = t3 || [];
              for (var a = 0; a < i2.length; a++) {
                var c2 = e(i2[a]);
                n[c2].references--;
              }
              for (var u = o(t3, r2), s = 0; s < i2.length; s++) {
                var l = e(i2[s]);
                0 === n[l].references && (n[l].updater(), n.splice(l, 1));
              }
              i2 = u;
            };
          };
        }, 569: function(t) {
          var n = {};
          t.exports = function(t2, e) {
            var o = (function(t3) {
              if (void 0 === n[t3]) {
                var e2 = document.querySelector(t3);
                if (window.HTMLIFrameElement && e2 instanceof window.HTMLIFrameElement) try {
                  e2 = e2.contentDocument.head;
                } catch (t4) {
                  e2 = null;
                }
                n[t3] = e2;
              }
              return n[t3];
            })(t2);
            if (!o) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            o.appendChild(e);
          };
        }, 9216: function(t) {
          t.exports = function(t2) {
            var n = document.createElement("style");
            return t2.setAttributes(n, t2.attributes), t2.insert(n, t2.options), n;
          };
        }, 3565: function(t, n, e) {
          t.exports = function(t2) {
            var n2 = e.nc;
            n2 && t2.setAttribute("nonce", n2);
          };
        }, 7795: function(t) {
          t.exports = function(t2) {
            var n = t2.insertStyleElement(t2);
            return { update: function(e) {
              !(function(t3, n2, e2) {
                var o = "";
                e2.supports && (o += "@supports (".concat(e2.supports, ") {")), e2.media && (o += "@media ".concat(e2.media, " {"));
                var r = void 0 !== e2.layer;
                r && (o += "@layer".concat(e2.layer.length > 0 ? " ".concat(e2.layer) : "", " {")), o += e2.css, r && (o += "}"), e2.media && (o += "}"), e2.supports && (o += "}");
                var i2 = e2.sourceMap;
                i2 && "undefined" != typeof btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i2)))), " */")), n2.styleTagTransform(o, t3, n2.options);
              })(n, t2, e);
            }, remove: function() {
              !(function(t3) {
                if (null === t3.parentNode) return false;
                t3.parentNode.removeChild(t3);
              })(n);
            } };
          };
        }, 4589: function(t) {
          t.exports = function(t2, n) {
            if (n.styleSheet) n.styleSheet.cssText = t2;
            else {
              for (; n.firstChild; ) n.removeChild(n.firstChild);
              n.appendChild(document.createTextNode(t2));
            }
          };
        }, 6464: function(t, n, e) {
          function o(t2) {
            if (void 0 === t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t2;
          }
          e.d(n, { Z: function() {
            return o;
          } });
        }, 4296: function(t, n, e) {
          function o(t2, n2) {
            for (var e2 = 0; e2 < n2.length; e2++) {
              var o2 = n2[e2];
              o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(t2, o2.key, o2);
            }
          }
          function r(t2, n2, e2) {
            return n2 && o(t2.prototype, n2), e2 && o(t2, e2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
          }
          e.d(n, { Z: function() {
            return r;
          } });
        }, 8270: function(t, n, e) {
          function o(t2, n2, e2) {
            return n2 in t2 ? Object.defineProperty(t2, n2, { value: e2, enumerable: true, configurable: true, writable: true }) : t2[n2] = e2, t2;
          }
          e.d(n, { Z: function() {
            return o;
          } });
        }, 6881: function(t, n, e) {
          e.d(n, { Z: function() {
            return r;
          } });
          var o = e(2717);
          function r(t2, n2) {
            t2.prototype = Object.create(n2.prototype), t2.prototype.constructor = t2, (0, o.Z)(t2, n2);
          }
        }, 2717: function(t, n, e) {
          function o(t2, n2) {
            return o = Object.setPrototypeOf || function(t3, n3) {
              return t3.__proto__ = n3, t3;
            }, o(t2, n2);
          }
          e.d(n, { Z: function() {
            return o;
          } });
        }, 7003: function(t, n, e) {
          e.d(n, { H3: function() {
            return o.H3E;
          }, ev: function() {
            return o.evW;
          }, x: function() {
            return o.xa3;
          } });
          var o = e(2942);
        }, 2942: function(t, n, e) {
          e.d(n, { f_C: function() {
            return Ct;
          }, hjT: function() {
            return at;
          }, R3I: function() {
            return O;
          }, Ljt: function() {
            return U;
          }, akz: function() {
            return yt;
          }, VnY: function() {
            return Q;
          }, cKT: function() {
            return Y;
          }, gbL: function() {
            return pt;
          }, FIv: function() {
            return b;
          }, XGm: function() {
            return x;
          }, xa3: function() {
            return z;
          }, YCL: function() {
            return wt;
          }, nuO: function() {
            return y;
          }, vpE: function() {
            return Lt;
          }, RMB: function() {
            return $;
          }, ogt: function() {
            return D;
          }, bGB: function() {
            return R;
          }, cSb: function() {
            return S;
          }, yl1: function() {
            return st;
          }, VOJ: function() {
            return T;
          }, u2N: function() {
            return E;
          }, $XI: function() {
            return _;
          }, lig: function() {
            return mt;
          }, dvw: function() {
            return vt;
          }, S1n: function() {
            return xt;
          }, $Tr: function() {
            return I;
          }, sBU: function() {
            return v;
          }, oLt: function() {
            return j;
          }, yef: function() {
            return Et;
          }, ZTd: function() {
            return s;
          }, AqN: function() {
            return h;
          }, evW: function() {
            return X;
          }, H3E: function() {
            return q;
          }, cly: function() {
            return _t;
          }, AT7: function() {
            return B;
          }, j7q: function() {
            return d;
          }, N8: function() {
            return p;
          }, rTO: function() {
            return G;
          }, BmG: function() {
            return N;
          }, fxP: function() {
            return C;
          }, czc: function() {
            return V;
          }, DhX: function() {
            return M;
          }, XET: function() {
            return A;
          }, LdU: function() {
            return m2;
          }, bi5: function() {
            return k;
          }, fLW: function() {
            return P2;
          }, VHj: function() {
            return W;
          }, Ui: function() {
            return ht;
          }, etI: function() {
            return gt;
          }, GQg: function() {
            return bt;
          }, kmG: function() {
            return L;
          } });
          e(2717);
          e(6881);
          function s() {
          }
          function l(t2) {
            return t2();
          }
          function f() {
            return /* @__PURE__ */ Object.create(null);
          }
          function d(t2) {
            t2.forEach(l);
          }
          function v(t2) {
            return "function" == typeof t2;
          }
          function p(t2, n2) {
            return t2 != t2 ? n2 == n2 : t2 !== n2 || t2 && "object" == typeof t2 || "function" == typeof t2;
          }
          function h(t2, n2) {
            return t2 != t2 ? n2 == n2 : t2 !== n2;
          }
          function g(t2) {
            return 0 === Object.keys(t2).length;
          }
          function m2(t2) {
            if (null == t2) return s;
            for (var n2 = arguments.length, e2 = new Array(n2 > 1 ? n2 - 1 : 0), o = 1; o < n2; o++) e2[o - 1] = arguments[o];
            var r = t2.subscribe.apply(t2, e2);
            return r.unsubscribe ? function() {
              return r.unsubscribe();
            } : r;
          }
          function _(t2) {
            var n2;
            return m2(t2, (function(t3) {
              return n2 = t3;
            }))(), n2;
          }
          function b(t2, n2, e2) {
            t2.$$.on_destroy.push(m2(n2, e2));
          }
          function y(t2, n2, e2, o) {
            if (t2) {
              var r = w(t2, n2, e2, o);
              return t2[0](r);
            }
          }
          function w(t2, n2, e2, o) {
            return t2[1] && o ? (function(t3, n3) {
              for (var e3 in n3) t3[e3] = n3[e3];
              return t3;
            })(e2.ctx.slice(), t2[1](o(n2))) : e2.ctx;
          }
          function E(t2, n2, e2, o) {
            if (t2[2] && o) {
              var r = t2[2](o(e2));
              if (void 0 === n2.dirty) return r;
              if ("object" == typeof r) {
                for (var i2 = [], a = Math.max(n2.dirty.length, r.length), c2 = 0; c2 < a; c2 += 1) i2[c2] = n2.dirty[c2] | r[c2];
                return i2;
              }
              return n2.dirty | r;
            }
            return n2.dirty;
          }
          function L(t2, n2, e2, o, r, i2) {
            if (r) {
              var a = w(n2, e2, o, i2);
              t2.p(a, r);
            }
          }
          function T(t2) {
            if (t2.ctx.length > 32) {
              for (var n2 = [], e2 = t2.ctx.length / 32, o = 0; o < e2; o++) n2[o] = -1;
              return n2;
            }
            return -1;
          }
          function x(t2) {
            var n2 = {};
            for (var e2 in t2) n2[e2] = true;
            return n2;
          }
          function C(t2, n2, e2) {
            return t2.set(e2), n2;
          }
          function O(t2, n2) {
            t2.appendChild(n2);
          }
          function I(t2, n2, e2) {
            t2.insertBefore(n2, e2 || null);
          }
          function D(t2) {
            t2.parentNode.removeChild(t2);
          }
          function $(t2, n2) {
            for (var e2 = 0; e2 < t2.length; e2 += 1) t2[e2] && t2[e2].d(n2);
          }
          function R(t2) {
            return document.createElement(t2);
          }
          function k(t2) {
            return document.createElementNS("http://www.w3.org/2000/svg", t2);
          }
          function P2(t2) {
            return document.createTextNode(t2);
          }
          function M() {
            return P2(" ");
          }
          function S() {
            return P2("");
          }
          function j(t2, n2, e2, o) {
            return t2.addEventListener(n2, e2, o), function() {
              return t2.removeEventListener(n2, e2, o);
            };
          }
          function B(t2) {
            return function(n2) {
              return n2.preventDefault(), t2.call(this, n2);
            };
          }
          function A(t2) {
            return function(n2) {
              return n2.stopPropagation(), t2.call(this, n2);
            };
          }
          function U(t2, n2, e2) {
            null == e2 ? t2.removeAttribute(n2) : t2.getAttribute(n2) !== e2 && t2.setAttribute(n2, e2);
          }
          function G(t2, n2) {
            n2 = "" + n2, t2.wholeText !== n2 && (t2.data = n2);
          }
          function N(t2, n2) {
            t2.value = null == n2 ? "" : n2;
          }
          function V(t2, n2, e2, o) {
            null === e2 ? t2.style.removeProperty(n2) : t2.style.setProperty(n2, e2, o ? "important" : "");
          }
          function W(t2, n2, e2) {
            t2.classList[e2 ? "add" : "remove"](n2);
          }
          function K(t2, n2, e2) {
            void 0 === e2 && (e2 = false);
            var o = document.createEvent("CustomEvent");
            return o.initCustomEvent(t2, e2, false, n2), o;
          }
          var H;
          function F(t2) {
            H = t2;
          }
          function Z() {
            if (!H) throw new Error("Function called outside component initialization");
            return H;
          }
          function q(t2) {
            Z().$$.on_mount.push(t2);
          }
          function X(t2) {
            Z().$$.on_destroy.push(t2);
          }
          function z() {
            var t2 = Z();
            return function(n2, e2) {
              var o = t2.$$.callbacks[n2];
              if (o) {
                var r = K(n2, e2);
                o.slice().forEach((function(n3) {
                  n3.call(t2, r);
                }));
              }
            };
          }
          function Y(t2, n2) {
            var e2 = this, o = t2.$$.callbacks[n2.type];
            o && o.slice().forEach((function(t3) {
              return t3.call(e2, n2);
            }));
          }
          var J = [], Q = [], tt = [], nt = [], et = Promise.resolve(), ot = false;
          function rt() {
            ot || (ot = true, et.then(st));
          }
          function it(t2) {
            tt.push(t2);
          }
          function at(t2) {
            nt.push(t2);
          }
          var ct = /* @__PURE__ */ new Set(), ut = 0;
          function st() {
            var t2 = H;
            do {
              for (; ut < J.length; ) {
                var n2 = J[ut];
                ut++, F(n2), lt(n2.$$);
              }
              for (F(null), J.length = 0, ut = 0; Q.length; ) Q.pop()();
              for (var e2 = 0; e2 < tt.length; e2 += 1) {
                var o = tt[e2];
                ct.has(o) || (ct.add(o), o());
              }
              tt.length = 0;
            } while (J.length);
            for (; nt.length; ) nt.pop()();
            ot = false, ct.clear(), F(t2);
          }
          function lt(t2) {
            if (null !== t2.fragment) {
              t2.update(), d(t2.before_update);
              var n2 = t2.dirty;
              t2.dirty = [-1], t2.fragment && t2.fragment.p(t2.ctx, n2), t2.after_update.forEach(it);
            }
          }
          var ft, dt = /* @__PURE__ */ new Set();
          function vt() {
            ft = { r: 0, c: [], p: ft };
          }
          function pt() {
            ft.r || d(ft.c), ft = ft.p;
          }
          function ht(t2, n2) {
            t2 && t2.i && (dt.delete(t2), t2.i(n2));
          }
          function gt(t2, n2, e2, o) {
            if (t2 && t2.o) {
              if (dt.has(t2)) return;
              dt.add(t2), ft.c.push((function() {
                dt.delete(t2), o && (e2 && t2.d(1), o());
              })), t2.o(n2);
            }
          }
          var mt = "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : commonjsGlobal;
          function _t(t2, n2) {
            gt(t2, 1, 1, (function() {
              n2.delete(t2.key);
            }));
          }
          function bt(t2, n2, e2, o, r, i2, a, c2, u, s2, l2, f2) {
            for (var d2 = t2.length, v2 = i2.length, p2 = d2, h2 = {}; p2--; ) h2[t2[p2].key] = p2;
            var g2 = [], m3 = /* @__PURE__ */ new Map(), _2 = /* @__PURE__ */ new Map();
            for (p2 = v2; p2--; ) {
              var b2 = f2(r, i2, p2), y2 = e2(b2), w2 = a.get(y2);
              w2 ? o && w2.p(b2, n2) : (w2 = s2(y2, b2)).c(), m3.set(y2, g2[p2] = w2), y2 in h2 && _2.set(y2, Math.abs(p2 - h2[y2]));
            }
            var E2 = /* @__PURE__ */ new Set(), L2 = /* @__PURE__ */ new Set();
            function T2(t3) {
              ht(t3, 1), t3.m(c2, l2), a.set(t3.key, t3), l2 = t3.first, v2--;
            }
            for (; d2 && v2; ) {
              var x2 = g2[v2 - 1], C2 = t2[d2 - 1], O2 = x2.key, I2 = C2.key;
              x2 === C2 ? (l2 = x2.first, d2--, v2--) : m3.has(I2) ? !a.has(O2) || E2.has(O2) ? T2(x2) : L2.has(I2) ? d2-- : _2.get(O2) > _2.get(I2) ? (L2.add(O2), T2(x2)) : (E2.add(I2), d2--) : (u(C2, a), d2--);
            }
            for (; d2--; ) {
              var D2 = t2[d2];
              m3.has(D2.key) || u(D2, a);
            }
            for (; v2; ) T2(g2[v2 - 1]);
            return g2;
          }
          function yt(t2, n2, e2) {
            var o = t2.$$.props[n2];
            void 0 !== o && (t2.$$.bound[o] = e2, e2(t2.$$.ctx[o]));
          }
          function wt(t2) {
            t2 && t2.c();
          }
          function Et(t2, n2, e2, o) {
            var r = t2.$$, i2 = r.fragment, a = r.on_mount, c2 = r.on_destroy, u = r.after_update;
            i2 && i2.m(n2, e2), o || it((function() {
              var n3 = a.map(l).filter(v);
              c2 ? c2.push.apply(c2, n3) : d(n3), t2.$$.on_mount = [];
            })), u.forEach(it);
          }
          function Lt(t2, n2) {
            var e2 = t2.$$;
            null !== e2.fragment && (d(e2.on_destroy), e2.fragment && e2.fragment.d(n2), e2.on_destroy = e2.fragment = null, e2.ctx = []);
          }
          function Tt(t2, n2) {
            -1 === t2.$$.dirty[0] && (J.push(t2), rt(), t2.$$.dirty.fill(0)), t2.$$.dirty[n2 / 31 | 0] |= 1 << n2 % 31;
          }
          function xt(t2, n2, e2, o, r, i2, a, c2) {
            void 0 === c2 && (c2 = [-1]);
            var u = H;
            F(t2);
            var l2 = t2.$$ = { fragment: null, ctx: null, props: i2, update: s, not_equal: r, bound: f(), on_mount: [], on_destroy: [], on_disconnect: [], before_update: [], after_update: [], context: new Map(n2.context || (u ? u.$$.context : [])), callbacks: f(), dirty: c2, skip_bound: false, root: n2.target || u.$$.root };
            a && a(l2.root);
            var v2, p2 = false;
            if (l2.ctx = e2 ? e2(t2, n2.props || {}, (function(n3, e3) {
              var o2 = !(arguments.length <= 2) && arguments.length - 2 ? arguments.length <= 2 ? void 0 : arguments[2] : e3;
              return l2.ctx && r(l2.ctx[n3], l2.ctx[n3] = o2) && (!l2.skip_bound && l2.bound[n3] && l2.bound[n3](o2), p2 && Tt(t2, n3)), e3;
            })) : [], l2.update(), p2 = true, d(l2.before_update), l2.fragment = !!o && o(l2.ctx), n2.target) {
              if (n2.hydrate) {
                var h2 = (v2 = n2.target, Array.from(v2.childNodes));
                l2.fragment && l2.fragment.l(h2), h2.forEach(D);
              } else l2.fragment && l2.fragment.c();
              n2.intro && ht(t2.$$.fragment), Et(t2, n2.target, n2.anchor, n2.customElement), st();
            }
            F(u);
          }
          var Ct = (function() {
            function t2() {
            }
            var n2 = t2.prototype;
            return n2.$destroy = function() {
              Lt(this, 1), this.$destroy = s;
            }, n2.$on = function(t3, n3) {
              var e2 = this.$$.callbacks[t3] || (this.$$.callbacks[t3] = []);
              return e2.push(n3), function() {
                var t4 = e2.indexOf(n3);
                -1 !== t4 && e2.splice(t4, 1);
              };
            }, n2.$set = function(t3) {
              this.$$set && !g(t3) && (this.$$.skip_bound = true, this.$$set(t3), this.$$.skip_bound = false);
            }, t2;
          })();
        }, 3313: function(t, n, e) {
          e.d(n, { U2: function() {
            return o.$XI;
          }, fZ: function() {
            return c2;
          } });
          var o = e(2942);
          function r(t2, n2) {
            var e2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
            if (e2) return (e2 = e2.call(t2)).next.bind(e2);
            if (Array.isArray(t2) || (e2 = (function(t3, n3) {
              if (!t3) return;
              if ("string" == typeof t3) return i2(t3, n3);
              var e3 = Object.prototype.toString.call(t3).slice(8, -1);
              "Object" === e3 && t3.constructor && (e3 = t3.constructor.name);
              if ("Map" === e3 || "Set" === e3) return Array.from(t3);
              if ("Arguments" === e3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3)) return i2(t3, n3);
            })(t2)) || n2) {
              e2 && (t2 = e2);
              var o2 = 0;
              return function() {
                return o2 >= t2.length ? { done: true } : { done: false, value: t2[o2++] };
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function i2(t2, n2) {
            (null == n2 || n2 > t2.length) && (n2 = t2.length);
            for (var e2 = 0, o2 = new Array(n2); e2 < n2; e2++) o2[e2] = t2[e2];
            return o2;
          }
          var a = [];
          function c2(t2, n2) {
            var e2;
            void 0 === n2 && (n2 = o.ZTd);
            var i3 = /* @__PURE__ */ new Set();
            function c3(n3) {
              if ((0, o.N8)(t2, n3) && (t2 = n3, e2)) {
                for (var c4, u = !a.length, s = r(i3); !(c4 = s()).done; ) {
                  var l = c4.value;
                  l[1](), a.push(l, t2);
                }
                if (u) {
                  for (var f = 0; f < a.length; f += 2) a[f][0](a[f + 1]);
                  a.length = 0;
                }
              }
            }
            return { set: c3, update: function(n3) {
              c3(n3(t2));
            }, subscribe: function(r2, a2) {
              void 0 === a2 && (a2 = o.ZTd);
              var u = [r2, a2];
              return i3.add(u), 1 === i3.size && (e2 = n2(c3) || o.ZTd), r2(t2), function() {
                i3.delete(u), 0 === i3.size && (e2(), e2 = null);
              };
            } };
          }
        } }, __webpack_module_cache__ = {};
        function __webpack_require__(t) {
          var n = __webpack_module_cache__[t];
          if (void 0 !== n) return n.exports;
          var e = __webpack_module_cache__[t] = { id: t, exports: {} };
          return __webpack_modules__[t](e, e.exports, __webpack_require__), e.exports;
        }
        __webpack_require__.n = function(t) {
          var n = t && t.__esModule ? function() {
            return t.default;
          } : function() {
            return t;
          };
          return __webpack_require__.d(n, { a: n }), n;
        }, __webpack_require__.d = function(t, n) {
          for (var e in n) __webpack_require__.o(n, e) && !__webpack_require__.o(t, e) && Object.defineProperty(t, e, { enumerable: true, get: n[e] });
        }, __webpack_require__.g = (function() {
          if ("object" == typeof globalThis) return globalThis;
          try {
            return this || new Function("return this")();
          } catch (t) {
            if ("object" == typeof window) return window;
          }
        })(), __webpack_require__.o = function(t, n) {
          return Object.prototype.hasOwnProperty.call(t, n);
        };
        var __webpack_exports__ = {};
        return (function() {
          __webpack_require__.d(__webpack_exports__, { default: function() {
            return Br;
          } });
          __webpack_require__(5441), __webpack_require__(8765);
          var t = __webpack_require__(4296), n = __webpack_require__(5103), e = { one: function(t2, n2) {
            void 0 === n2 && (n2 = document);
            try {
              return n2.querySelector(t2) || void 0;
            } catch (t3) {
              return;
            }
          }, all: function(t2, n2) {
            void 0 === n2 && (n2 = document);
            try {
              var e2 = n2.querySelectorAll(t2);
              return [].slice.call(e2);
            } catch (t3) {
              return [];
            }
          }, addClass: function(t2, e2) {
            if (t2) for (var o2 = (0, n.kJ)(t2) ? t2 : [t2], r2 = 0; r2 < o2.length; r2++) {
              var i3 = (o2[r2].className || "").split(" ");
              i3.indexOf(e2) > -1 || (i3.push(e2), o2[r2].className = i3.join(" "));
            }
          }, removeClass: function(t2, e2) {
            if (t2) for (var o2 = (0, n.kJ)(t2) ? t2 : [t2], r2 = 0; r2 < o2.length; r2++) {
              for (var i3 = o2[r2].className.split(" "), a2 = 0; a2 < i3.length; a2++) i3[a2] == e2 && (i3[a2] = "");
              o2[r2].className = i3.join(" ").trim();
            }
          }, hasClass: function(t2, n2) {
            return !(!t2 || !t2.classList) && t2.classList.contains(n2);
          }, bind: function(t2, e2, o2, r2) {
            (void 0 === r2 && (r2 = false), t2) && ((0, n.kJ)(t2) ? t2 : [t2]).forEach((function(t3) {
              t3.addEventListener(e2, o2, !!r2);
            }));
          }, delegate: function(t2, n2, o2, r2) {
            t2 && t2.addEventListener(n2, (function(n3) {
              var i3 = e.all(o2, t2);
              if (i3) t: for (var a2 = 0; a2 < i3.length; a2++) for (var c3 = n3.target; c3; ) {
                if (c3 == i3[a2]) {
                  r2.call(c3, n3, c3);
                  break t;
                }
                if ((c3 = c3.parentNode) == t2) break;
              }
            }), false);
          }, removeChildren: function(t2) {
            for (; t2.firstChild; ) t2.removeChild(t2.lastChild);
            return t2;
          } }, o = e, r = __webpack_require__(6464), i2 = __webpack_require__(6881), a = __webpack_require__(2942), c2 = __webpack_require__(7003), u = __webpack_require__(3379), s = __webpack_require__.n(u), l = __webpack_require__(7795), f = __webpack_require__.n(l), d = __webpack_require__(569), v = __webpack_require__.n(d), p = __webpack_require__(3565), h = __webpack_require__.n(p), g = __webpack_require__(9216), m2 = __webpack_require__.n(g), _ = __webpack_require__(4589), b = __webpack_require__.n(_), y = __webpack_require__(7558), w = {};
          y.Z && y.Z.locals && (w.locals = y.Z.locals);
          var E, L = 0, T = {};
          T.styleTagTransform = b(), T.setAttributes = h(), T.insert = v().bind(null, "head"), T.domAPI = f(), T.insertStyleElement = m2(), w.use = function(t2) {
            return T.options = t2 || {}, L++ || (E = s()(y.Z, T)), w;
          }, w.unuse = function() {
            L > 0 && !--L && (E(), E = null);
          };
          var x = w;
          function C(t2) {
            var n2, e2, o2, r2;
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.fLW)("vConsole"), (0, a.Ljt)(n2, "class", "vc-switch"), (0, a.czc)(n2, "right", t2[2].x + "px"), (0, a.czc)(n2, "bottom", t2[2].y + "px"), (0, a.czc)(n2, "display", t2[0] ? "block" : "none");
            }, m: function(i3, c3) {
              (0, a.$Tr)(i3, n2, c3), (0, a.R3I)(n2, e2), t2[8](n2), o2 || (r2 = [(0, a.oLt)(n2, "touchstart", t2[3], { passive: false }), (0, a.oLt)(n2, "touchend", t2[4], { passive: false }), (0, a.oLt)(n2, "touchmove", t2[5], { passive: false }), (0, a.oLt)(n2, "click", t2[7])], o2 = true);
            }, p: function(t3, e3) {
              var o3 = e3[0];
              4 & o3 && (0, a.czc)(n2, "right", t3[2].x + "px"), 4 & o3 && (0, a.czc)(n2, "bottom", t3[2].y + "px"), 1 & o3 && (0, a.czc)(n2, "display", t3[0] ? "block" : "none");
            }, i: a.ZTd, o: a.ZTd, d: function(e3) {
              e3 && (0, a.ogt)(n2), t2[8](null), o2 = false, (0, a.j7q)(r2);
            } };
          }
          function O(t2, e2, o2) {
            var r2, i3 = e2.show, u2 = void 0 === i3 || i3, s2 = e2.position, l2 = void 0 === s2 ? { x: 0, y: 0 } : s2, f2 = { hasMoved: false, x: 0, y: 0, startX: 0, startY: 0, endX: 0, endY: 0 }, d2 = { x: 0, y: 0 };
            (0, c2.H3)((function() {
              x.use();
            })), (0, c2.ev)((function() {
              x.unuse();
            }));
            var v2 = function(t3, e3) {
              var r3 = p2(t3, e3);
              t3 = r3[0], e3 = r3[1], f2.x = t3, f2.y = e3, o2(2, d2.x = t3, d2), o2(2, d2.y = e3, d2), n.po("switch_x", t3 + ""), n.po("switch_y", e3 + "");
            }, p2 = function(t3, n2) {
              var e3 = Math.max(document.documentElement.offsetWidth, window.innerWidth), o3 = Math.max(document.documentElement.offsetHeight, window.innerHeight);
              return t3 + r2.offsetWidth > e3 && (t3 = e3 - r2.offsetWidth), n2 + r2.offsetHeight > o3 && (n2 = o3 - r2.offsetHeight), t3 < 0 && (t3 = 0), n2 < 20 && (n2 = 20), [t3, n2];
            };
            return t2.$$set = function(t3) {
              "show" in t3 && o2(0, u2 = t3.show), "position" in t3 && o2(6, l2 = t3.position);
            }, t2.$$.update = function() {
              66 & t2.$$.dirty && r2 && v2(l2.x, l2.y);
            }, [u2, r2, d2, function(t3) {
              f2.startX = t3.touches[0].pageX, f2.startY = t3.touches[0].pageY, f2.hasMoved = false;
            }, function(t3) {
              f2.hasMoved && (f2.startX = 0, f2.startY = 0, f2.hasMoved = false, v2(f2.endX, f2.endY));
            }, function(t3) {
              if (!(t3.touches.length <= 0)) {
                var n2 = t3.touches[0].pageX - f2.startX, e3 = t3.touches[0].pageY - f2.startY, r3 = Math.floor(f2.x - n2), i4 = Math.floor(f2.y - e3), a2 = p2(r3, i4);
                r3 = a2[0], i4 = a2[1], o2(2, d2.x = r3, d2), o2(2, d2.y = i4, d2), f2.endX = r3, f2.endY = i4, f2.hasMoved = true, t3.preventDefault();
              }
            }, l2, function(n2) {
              a.cKT.call(this, t2, n2);
            }, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                o2(1, r2 = t3);
              }));
            }];
          }
          var I = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, O, C, a.N8, { show: 0, position: 6 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "show", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ show: t2 }), (0, a.yl1)();
            } }, { key: "position", get: function() {
              return this.$$.ctx[6];
            }, set: function(t2) {
              this.$$set({ position: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), D = I;
          function $(t2) {
            var n2, e2;
            return { c: function() {
              n2 = (0, a.bGB)("div"), (0, a.Ljt)(n2, "id", e2 = "__vc_plug_" + t2[0]), (0, a.Ljt)(n2, "class", "vc-plugin-box"), (0, a.VHj)(n2, "vc-fixed-height", t2[1]), (0, a.VHj)(n2, "vc-actived", t2[2]);
            }, m: function(e3, o2) {
              (0, a.$Tr)(e3, n2, o2), t2[6](n2);
            }, p: function(t3, o2) {
              var r2 = o2[0];
              1 & r2 && e2 !== (e2 = "__vc_plug_" + t3[0]) && (0, a.Ljt)(n2, "id", e2), 2 & r2 && (0, a.VHj)(n2, "vc-fixed-height", t3[1]), 4 & r2 && (0, a.VHj)(n2, "vc-actived", t3[2]);
            }, i: a.ZTd, o: a.ZTd, d: function(e3) {
              e3 && (0, a.ogt)(n2), t2[6](null);
            } };
          }
          function R(t2, e2, o2) {
            var r2 = e2.pluginId, i3 = void 0 === r2 ? "" : r2, c3 = e2.fixedHeight, u2 = void 0 !== c3 && c3, s2 = e2.actived, l2 = void 0 !== s2 && s2, f2 = e2.content, d2 = void 0 === f2 ? void 0 : f2, v2 = void 0, p2 = void 0;
            return t2.$$set = function(t3) {
              "pluginId" in t3 && o2(0, i3 = t3.pluginId), "fixedHeight" in t3 && o2(1, u2 = t3.fixedHeight), "actived" in t3 && o2(2, l2 = t3.actived), "content" in t3 && o2(4, d2 = t3.content);
            }, t2.$$.update = function() {
              57 & t2.$$.dirty && p2 !== i3 && d2 && v2 && (o2(5, p2 = i3), o2(3, v2.innerHTML = "", v2), (0, n.HD)(d2) ? o2(3, v2.innerHTML = d2, v2) : (0, n.kK)(d2) && v2.appendChild(d2));
            }, [i3, u2, l2, v2, d2, p2, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                o2(3, v2 = t3), o2(5, p2), o2(0, i3), o2(4, d2);
              }));
            }];
          }
          var k = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, R, $, a.N8, { pluginId: 0, fixedHeight: 1, actived: 2, content: 4 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "pluginId", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ pluginId: t2 }), (0, a.yl1)();
            } }, { key: "fixedHeight", get: function() {
              return this.$$.ctx[1];
            }, set: function(t2) {
              this.$$set({ fixedHeight: t2 }), (0, a.yl1)();
            } }, { key: "actived", get: function() {
              return this.$$.ctx[2];
            }, set: function(t2) {
              this.$$set({ actived: t2 }), (0, a.yl1)();
            } }, { key: "content", get: function() {
              return this.$$.ctx[4];
            }, set: function(t2) {
              this.$$set({ content: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), P2 = k, M = __webpack_require__(4687), S = __webpack_require__(3283), j = {};
          S.Z && S.Z.locals && (j.locals = S.Z.locals);
          var B, A = 0, U = {};
          U.styleTagTransform = b(), U.setAttributes = h(), U.insert = v().bind(null, "head"), U.domAPI = f(), U.insertStyleElement = m2(), j.use = function(t2) {
            return U.options = t2 || {}, A++ || (B = s()(S.Z, U)), j;
          }, j.unuse = function() {
            A > 0 && !--A && (B(), B = null);
          };
          var G = j;
          function N(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[39] = n2[e2][0], o2[40] = n2[e2][1], o2;
          }
          function V(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[43] = n2[e2], o2[45] = e2, o2;
          }
          function W(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[39] = n2[e2][0], o2[40] = n2[e2][1], o2;
          }
          function K(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[39] = n2[e2][0], o2[40] = n2[e2][1], o2;
          }
          function H(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[43] = n2[e2], o2[45] = e2, o2;
          }
          function F(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[39] = n2[e2][0], o2[40] = n2[e2][1], o2;
          }
          function Z(t2) {
            var n2, e2, o2, r2, i3, c3 = t2[40].name + "";
            function u2() {
              return t2[25](t2[40]);
            }
            return { c: function() {
              n2 = (0, a.bGB)("a"), e2 = (0, a.fLW)(c3), (0, a.Ljt)(n2, "class", "vc-tab"), (0, a.Ljt)(n2, "id", o2 = "__vc_tab_" + t2[40].id), (0, a.VHj)(n2, "vc-actived", t2[40].id === t2[2]);
            }, m: function(t3, o3) {
              (0, a.$Tr)(t3, n2, o3), (0, a.R3I)(n2, e2), r2 || (i3 = (0, a.oLt)(n2, "click", u2), r2 = true);
            }, p: function(r3, i4) {
              t2 = r3, 8 & i4[0] && c3 !== (c3 = t2[40].name + "") && (0, a.rTO)(e2, c3), 8 & i4[0] && o2 !== (o2 = "__vc_tab_" + t2[40].id) && (0, a.Ljt)(n2, "id", o2), 12 & i4[0] && (0, a.VHj)(n2, "vc-actived", t2[40].id === t2[2]);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), r2 = false, i3();
            } };
          }
          function q(t2) {
            var n2, e2 = t2[40].hasTabPanel && Z(t2);
            return { c: function() {
              e2 && e2.c(), n2 = (0, a.cSb)();
            }, m: function(t3, o2) {
              e2 && e2.m(t3, o2), (0, a.$Tr)(t3, n2, o2);
            }, p: function(t3, o2) {
              t3[40].hasTabPanel ? e2 ? e2.p(t3, o2) : ((e2 = Z(t3)).c(), e2.m(n2.parentNode, n2)) : e2 && (e2.d(1), e2 = null);
            }, d: function(t3) {
              e2 && e2.d(t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function X(t2) {
            var n2, e2, o2, r2, i3, c3 = t2[43].name + "";
            function u2() {
              for (var n3, e3 = arguments.length, o3 = new Array(e3), r3 = 0; r3 < e3; r3++) o3[r3] = arguments[r3];
              return (n3 = t2)[26].apply(n3, [t2[40], t2[45]].concat(o3));
            }
            return { c: function() {
              n2 = (0, a.bGB)("i"), e2 = (0, a.fLW)(c3), (0, a.Ljt)(n2, "class", o2 = "vc-toptab vc-topbar-" + t2[40].id + " " + t2[43].className), (0, a.VHj)(n2, "vc-toggle", t2[40].id === t2[2]), (0, a.VHj)(n2, "vc-actived", t2[43].actived);
            }, m: function(t3, o3) {
              (0, a.$Tr)(t3, n2, o3), (0, a.R3I)(n2, e2), r2 || (i3 = (0, a.oLt)(n2, "click", u2), r2 = true);
            }, p: function(r3, i4) {
              t2 = r3, 8 & i4[0] && c3 !== (c3 = t2[43].name + "") && (0, a.rTO)(e2, c3), 8 & i4[0] && o2 !== (o2 = "vc-toptab vc-topbar-" + t2[40].id + " " + t2[43].className) && (0, a.Ljt)(n2, "class", o2), 12 & i4[0] && (0, a.VHj)(n2, "vc-toggle", t2[40].id === t2[2]), 8 & i4[0] && (0, a.VHj)(n2, "vc-actived", t2[43].actived);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), r2 = false, i3();
            } };
          }
          function z(t2) {
            for (var n2, e2 = t2[40].topbarList, o2 = [], r2 = 0; r2 < e2.length; r2 += 1) o2[r2] = X(H(t2, e2, r2));
            return { c: function() {
              for (var t3 = 0; t3 < o2.length; t3 += 1) o2[t3].c();
              n2 = (0, a.cSb)();
            }, m: function(t3, e3) {
              for (var r3 = 0; r3 < o2.length; r3 += 1) o2[r3].m(t3, e3);
              (0, a.$Tr)(t3, n2, e3);
            }, p: function(t3, r3) {
              if (8204 & r3[0]) {
                var i3;
                for (e2 = t3[40].topbarList, i3 = 0; i3 < e2.length; i3 += 1) {
                  var a2 = H(t3, e2, i3);
                  o2[i3] ? o2[i3].p(a2, r3) : (o2[i3] = X(a2), o2[i3].c(), o2[i3].m(n2.parentNode, n2));
                }
                for (; i3 < o2.length; i3 += 1) o2[i3].d(1);
                o2.length = e2.length;
              }
            }, d: function(t3) {
              (0, a.RMB)(o2, t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function Y(t2) {
            var n2, e2, o2, r2 = P2;
            function i3(t3) {
              var n3;
              return { props: { pluginId: t3[40].id, fixedHeight: null == (n3 = t3[40].tabOptions) ? void 0 : n3.fixedHeight, actived: t3[40].id === t3[2], content: t3[40].content } };
            }
            return r2 && (n2 = new r2(i3(t2))), { c: function() {
              n2 && (0, a.YCL)(n2.$$.fragment), e2 = (0, a.cSb)();
            }, m: function(t3, r3) {
              n2 && (0, a.yef)(n2, t3, r3), (0, a.$Tr)(t3, e2, r3), o2 = true;
            }, p: function(t3, o3) {
              var c3, u2 = {};
              if (8 & o3[0] && (u2.pluginId = t3[40].id), 8 & o3[0] && (u2.fixedHeight = null == (c3 = t3[40].tabOptions) ? void 0 : c3.fixedHeight), 12 & o3[0] && (u2.actived = t3[40].id === t3[2]), 8 & o3[0] && (u2.content = t3[40].content), r2 !== (r2 = P2)) {
                if (n2) {
                  (0, a.dvw)();
                  var s2 = n2;
                  (0, a.etI)(s2.$$.fragment, 1, 0, (function() {
                    (0, a.vpE)(s2, 1);
                  })), (0, a.gbL)();
                }
                r2 ? (n2 = new r2(i3(t3)), (0, a.YCL)(n2.$$.fragment), (0, a.Ui)(n2.$$.fragment, 1), (0, a.yef)(n2, e2.parentNode, e2)) : n2 = null;
              } else r2 && n2.$set(u2);
            }, i: function(t3) {
              o2 || (n2 && (0, a.Ui)(n2.$$.fragment, t3), o2 = true);
            }, o: function(t3) {
              n2 && (0, a.etI)(n2.$$.fragment, t3), o2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(e2), n2 && (0, a.vpE)(n2, t3);
            } };
          }
          function J(t2) {
            var n2, e2, o2, r2, i3, c3 = t2[43].name + "";
            function u2() {
              for (var n3, e3 = arguments.length, o3 = new Array(e3), r3 = 0; r3 < e3; r3++) o3[r3] = arguments[r3];
              return (n3 = t2)[28].apply(n3, [t2[40], t2[45]].concat(o3));
            }
            return { c: function() {
              n2 = (0, a.bGB)("i"), e2 = (0, a.fLW)(c3), (0, a.Ljt)(n2, "class", o2 = "vc-tool vc-tool-" + t2[40].id), (0, a.VHj)(n2, "vc-global-tool", t2[43].global), (0, a.VHj)(n2, "vc-toggle", t2[40].id === t2[2]);
            }, m: function(t3, o3) {
              (0, a.$Tr)(t3, n2, o3), (0, a.R3I)(n2, e2), r2 || (i3 = (0, a.oLt)(n2, "click", u2), r2 = true);
            }, p: function(r3, i4) {
              t2 = r3, 8 & i4[0] && c3 !== (c3 = t2[43].name + "") && (0, a.rTO)(e2, c3), 8 & i4[0] && o2 !== (o2 = "vc-tool vc-tool-" + t2[40].id) && (0, a.Ljt)(n2, "class", o2), 8 & i4[0] && (0, a.VHj)(n2, "vc-global-tool", t2[43].global), 12 & i4[0] && (0, a.VHj)(n2, "vc-toggle", t2[40].id === t2[2]);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), r2 = false, i3();
            } };
          }
          function Q(t2) {
            for (var n2, e2 = t2[40].toolbarList, o2 = [], r2 = 0; r2 < e2.length; r2 += 1) o2[r2] = J(V(t2, e2, r2));
            return { c: function() {
              for (var t3 = 0; t3 < o2.length; t3 += 1) o2[t3].c();
              n2 = (0, a.cSb)();
            }, m: function(t3, e3) {
              for (var r3 = 0; r3 < o2.length; r3 += 1) o2[r3].m(t3, e3);
              (0, a.$Tr)(t3, n2, e3);
            }, p: function(t3, r3) {
              if (16396 & r3[0]) {
                var i3;
                for (e2 = t3[40].toolbarList, i3 = 0; i3 < e2.length; i3 += 1) {
                  var a2 = V(t3, e2, i3);
                  o2[i3] ? o2[i3].p(a2, r3) : (o2[i3] = J(a2), o2[i3].c(), o2[i3].m(n2.parentNode, n2));
                }
                for (; i3 < o2.length; i3 += 1) o2[i3].d(1);
                o2.length = e2.length;
              }
            }, d: function(t3) {
              (0, a.RMB)(o2, t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function tt(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2, l2, f2, d2, v2, p2, h2, g2, m3, _2, b2, y2, w2, E2;
            function L2(n3) {
              t2[23](n3);
            }
            function T2(n3) {
              t2[24](n3);
            }
            var x2 = {};
            void 0 !== t2[0] && (x2.show = t2[0]), void 0 !== t2[1] && (x2.position = t2[1]), e2 = new D({ props: x2 }), a.VnY.push((function() {
              return (0, a.akz)(e2, "show", L2);
            })), a.VnY.push((function() {
              return (0, a.akz)(e2, "position", T2);
            })), e2.$on("click", t2[10]);
            for (var C2 = Object.entries(t2[3]), O2 = [], I2 = 0; I2 < C2.length; I2 += 1) O2[I2] = q(F(t2, C2, I2));
            for (var $2 = Object.entries(t2[3]), R2 = [], k2 = 0; k2 < $2.length; k2 += 1) R2[k2] = z(K(t2, $2, k2));
            for (var P3 = Object.entries(t2[3]), M2 = [], S2 = 0; S2 < P3.length; S2 += 1) M2[S2] = Y(W(t2, P3, S2));
            for (var j2 = function(t3) {
              return (0, a.etI)(M2[t3], 1, 1, (function() {
                M2[t3] = null;
              }));
            }, B2 = Object.entries(t2[3]), A2 = [], U2 = 0; U2 < B2.length; U2 += 1) A2[U2] = Q(N(t2, B2, U2));
            return { c: function() {
              var o3, r3;
              n2 = (0, a.bGB)("div"), (0, a.YCL)(e2.$$.fragment), i3 = (0, a.DhX)(), c3 = (0, a.bGB)("div"), u2 = (0, a.DhX)(), s2 = (0, a.bGB)("div"), l2 = (0, a.bGB)("div");
              for (var y3 = 0; y3 < O2.length; y3 += 1) O2[y3].c();
              f2 = (0, a.DhX)(), d2 = (0, a.bGB)("div");
              for (var w3 = 0; w3 < R2.length; w3 += 1) R2[w3].c();
              v2 = (0, a.DhX)(), p2 = (0, a.bGB)("div");
              for (var E3 = 0; E3 < M2.length; E3 += 1) M2[E3].c();
              h2 = (0, a.DhX)(), g2 = (0, a.bGB)("div");
              for (var L3 = 0; L3 < A2.length; L3 += 1) A2[L3].c();
              m3 = (0, a.DhX)(), (_2 = (0, a.bGB)("i")).textContent = "Hide", (0, a.Ljt)(c3, "class", "vc-mask"), (0, a.czc)(c3, "display", t2[8] ? "block" : "none"), (0, a.Ljt)(l2, "class", "vc-tabbar"), (0, a.Ljt)(d2, "class", "vc-topbar"), (0, a.Ljt)(p2, "class", "vc-content"), (0, a.VHj)(p2, "vc-has-topbar", (null == (o3 = t2[3][t2[2]]) || null == (r3 = o3.topbarList) ? void 0 : r3.length) > 0), (0, a.Ljt)(_2, "class", "vc-tool vc-global-tool vc-tool-last vc-hide"), (0, a.Ljt)(g2, "class", "vc-toolbar"), (0, a.Ljt)(s2, "class", "vc-panel"), (0, a.czc)(s2, "display", t2[7] ? "block" : "none"), (0, a.Ljt)(n2, "id", "__vconsole"), (0, a.Ljt)(n2, "style", b2 = t2[5] ? "font-size:" + t2[5] + ";" : ""), (0, a.Ljt)(n2, "data-theme", t2[4]), (0, a.VHj)(n2, "vc-toggle", t2[6]);
            }, m: function(o3, r3) {
              (0, a.$Tr)(o3, n2, r3), (0, a.yef)(e2, n2, null), (0, a.R3I)(n2, i3), (0, a.R3I)(n2, c3), (0, a.R3I)(n2, u2), (0, a.R3I)(n2, s2), (0, a.R3I)(s2, l2);
              for (var b3 = 0; b3 < O2.length; b3 += 1) O2[b3].m(l2, null);
              (0, a.R3I)(s2, f2), (0, a.R3I)(s2, d2);
              for (var L3 = 0; L3 < R2.length; L3 += 1) R2[L3].m(d2, null);
              (0, a.R3I)(s2, v2), (0, a.R3I)(s2, p2);
              for (var T3 = 0; T3 < M2.length; T3 += 1) M2[T3].m(p2, null);
              t2[27](p2), (0, a.R3I)(s2, h2), (0, a.R3I)(s2, g2);
              for (var x3 = 0; x3 < A2.length; x3 += 1) A2[x3].m(g2, null);
              (0, a.R3I)(g2, m3), (0, a.R3I)(g2, _2), y2 = true, w2 || (E2 = [(0, a.oLt)(c3, "click", t2[11]), (0, a.oLt)(p2, "touchstart", t2[15]), (0, a.oLt)(p2, "touchmove", t2[16]), (0, a.oLt)(p2, "touchend", t2[17]), (0, a.oLt)(p2, "scroll", t2[18]), (0, a.oLt)(_2, "click", t2[11]), (0, a.oLt)(n2, "touchstart", t2[19].touchStart, { passive: false, capture: true }), (0, a.oLt)(n2, "touchmove", t2[19].touchMove, { passive: false, capture: true }), (0, a.oLt)(n2, "touchend", t2[19].touchEnd, { passive: false, capture: true })], w2 = true);
            }, p: function(t3, i4) {
              var u3, f3, v3 = {};
              if (!o2 && 1 & i4[0] && (o2 = true, v3.show = t3[0], (0, a.hjT)((function() {
                return o2 = false;
              }))), !r2 && 2 & i4[0] && (r2 = true, v3.position = t3[1], (0, a.hjT)((function() {
                return r2 = false;
              }))), e2.$set(v3), (!y2 || 256 & i4[0]) && (0, a.czc)(c3, "display", t3[8] ? "block" : "none"), 4108 & i4[0]) {
                var h3;
                for (C2 = Object.entries(t3[3]), h3 = 0; h3 < C2.length; h3 += 1) {
                  var _3 = F(t3, C2, h3);
                  O2[h3] ? O2[h3].p(_3, i4) : (O2[h3] = q(_3), O2[h3].c(), O2[h3].m(l2, null));
                }
                for (; h3 < O2.length; h3 += 1) O2[h3].d(1);
                O2.length = C2.length;
              }
              if (8204 & i4[0]) {
                var w3;
                for ($2 = Object.entries(t3[3]), w3 = 0; w3 < $2.length; w3 += 1) {
                  var E3 = K(t3, $2, w3);
                  R2[w3] ? R2[w3].p(E3, i4) : (R2[w3] = z(E3), R2[w3].c(), R2[w3].m(d2, null));
                }
                for (; w3 < R2.length; w3 += 1) R2[w3].d(1);
                R2.length = $2.length;
              }
              if (12 & i4[0]) {
                var L3;
                for (P3 = Object.entries(t3[3]), L3 = 0; L3 < P3.length; L3 += 1) {
                  var T3 = W(t3, P3, L3);
                  M2[L3] ? (M2[L3].p(T3, i4), (0, a.Ui)(M2[L3], 1)) : (M2[L3] = Y(T3), M2[L3].c(), (0, a.Ui)(M2[L3], 1), M2[L3].m(p2, null));
                }
                for ((0, a.dvw)(), L3 = P3.length; L3 < M2.length; L3 += 1) j2(L3);
                (0, a.gbL)();
              }
              12 & i4[0] && (0, a.VHj)(p2, "vc-has-topbar", (null == (u3 = t3[3][t3[2]]) || null == (f3 = u3.topbarList) ? void 0 : f3.length) > 0);
              if (16396 & i4[0]) {
                var x3;
                for (B2 = Object.entries(t3[3]), x3 = 0; x3 < B2.length; x3 += 1) {
                  var I3 = N(t3, B2, x3);
                  A2[x3] ? A2[x3].p(I3, i4) : (A2[x3] = Q(I3), A2[x3].c(), A2[x3].m(g2, m3));
                }
                for (; x3 < A2.length; x3 += 1) A2[x3].d(1);
                A2.length = B2.length;
              }
              (!y2 || 128 & i4[0]) && (0, a.czc)(s2, "display", t3[7] ? "block" : "none"), (!y2 || 32 & i4[0] && b2 !== (b2 = t3[5] ? "font-size:" + t3[5] + ";" : "")) && (0, a.Ljt)(n2, "style", b2), (!y2 || 16 & i4[0]) && (0, a.Ljt)(n2, "data-theme", t3[4]), 64 & i4[0] && (0, a.VHj)(n2, "vc-toggle", t3[6]);
            }, i: function(t3) {
              if (!y2) {
                (0, a.Ui)(e2.$$.fragment, t3);
                for (var n3 = 0; n3 < P3.length; n3 += 1) (0, a.Ui)(M2[n3]);
                y2 = true;
              }
            }, o: function(t3) {
              (0, a.etI)(e2.$$.fragment, t3), M2 = M2.filter(Boolean);
              for (var n3 = 0; n3 < M2.length; n3 += 1) (0, a.etI)(M2[n3]);
              y2 = false;
            }, d: function(o3) {
              o3 && (0, a.ogt)(n2), (0, a.vpE)(e2), (0, a.RMB)(O2, o3), (0, a.RMB)(R2, o3), (0, a.RMB)(M2, o3), t2[27](null), (0, a.RMB)(A2, o3), w2 = false, (0, a.j7q)(E2);
            } };
          }
          function nt(t2, e2, o2) {
            var r2, i3, u2 = e2.theme, s2 = void 0 === u2 ? "" : u2, l2 = e2.disableScrolling, f2 = void 0 !== l2 && l2, d2 = e2.show, v2 = void 0 !== d2 && d2, p2 = e2.showSwitchButton, h2 = void 0 === p2 || p2, g2 = e2.switchButtonPosition, m3 = void 0 === g2 ? { x: 0, y: 0 } : g2, _2 = e2.activedPluginId, b2 = void 0 === _2 ? "" : _2, y2 = e2.pluginList, w2 = void 0 === y2 ? {} : y2, E2 = (0, c2.x)(), L2 = false, T2 = "", x2 = false, C2 = false, O2 = false, I2 = true, D2 = 0, $2 = null, R2 = {};
            (0, c2.H3)((function() {
              var t3 = document.querySelectorAll('[name="viewport"]');
              if (t3 && t3[0]) {
                var n2 = (t3[t3.length - 1].getAttribute("content") || "").match(/initial\-scale\=\d+(\.\d+)?/), e3 = n2 ? parseFloat(n2[0].split("=")[1]) : 1;
                1 !== e3 && o2(5, T2 = Math.floor(1 / e3 * 13) + "px");
              }
              G.use && G.use(), r2 = M.x.subscribe((function(t4) {
                v2 && D2 !== t4.updateTime && (D2 = t4.updateTime, k2());
              }));
            })), (0, c2.ev)((function() {
              G.unuse && G.unuse(), r2 && r2();
            }));
            var k2 = function() {
              !f2 && I2 && i3 && o2(9, i3.scrollTop = i3.scrollHeight - i3.offsetHeight, i3);
            }, P3 = function(t3) {
              t3 !== b2 && (o2(2, b2 = t3), E2("changePanel", { pluginId: t3 }), setTimeout((function() {
                i3 && o2(9, i3.scrollTop = R2[b2] || 0, i3);
              }), 0));
            }, S2 = function(t3, e3, r3) {
              var i4 = w2[e3].topbarList[r3], a2 = true;
              if (n.mf(i4.onClick) && (a2 = i4.onClick.call(t3.target, t3, i4.data)), false === a2) ;
              else {
                for (var c3 = 0; c3 < w2[e3].topbarList.length; c3++) o2(3, w2[e3].topbarList[c3].actived = r3 === c3, w2);
                o2(3, w2);
              }
            }, j2 = function(t3, e3, o3) {
              var r3 = w2[e3].toolbarList[o3];
              n.mf(r3.onClick) && r3.onClick.call(t3.target, t3, r3.data);
            }, B2 = { tapTime: 700, tapBoundary: 10, lastTouchStartTime: 0, touchstartX: 0, touchstartY: 0, touchHasMoved: false, targetElem: null }, A2 = { touchStart: function(t3) {
              if (0 === B2.lastTouchStartTime) {
                var n2 = t3.targetTouches[0];
                B2.touchstartX = n2.pageX, B2.touchstartY = n2.pageY, B2.lastTouchStartTime = t3.timeStamp, B2.targetElem = t3.target.nodeType === Node.TEXT_NODE ? t3.target.parentNode : t3.target;
              }
            }, touchMove: function(t3) {
              var n2 = t3.changedTouches[0];
              (Math.abs(n2.pageX - B2.touchstartX) > B2.tapBoundary || Math.abs(n2.pageY - B2.touchstartY) > B2.tapBoundary) && (B2.touchHasMoved = true);
            }, touchEnd: function(t3) {
              if (false === B2.touchHasMoved && t3.timeStamp - B2.lastTouchStartTime < B2.tapTime && null != B2.targetElem) {
                var n2 = false;
                switch (B2.targetElem.tagName.toLowerCase()) {
                  case "textarea":
                    n2 = true;
                    break;
                  case "select":
                    n2 = !B2.targetElem.disabled && !B2.targetElem.readOnly;
                    break;
                  case "input":
                    switch (B2.targetElem.type) {
                      case "button":
                      case "checkbox":
                      case "file":
                      case "image":
                      case "radio":
                      case "submit":
                        n2 = false;
                        break;
                      default:
                        n2 = !B2.targetElem.disabled && !B2.targetElem.readOnly;
                    }
                }
                n2 ? B2.targetElem.focus() : t3.preventDefault();
                var e3 = t3.changedTouches[0], o3 = new MouseEvent("click", { bubbles: true, cancelable: true, view: window, screenX: e3.screenX, screenY: e3.screenY, clientX: e3.clientX, clientY: e3.clientY });
                B2.targetElem.dispatchEvent(o3);
              }
              B2.lastTouchStartTime = 0, B2.touchHasMoved = false, B2.targetElem = null;
            } };
            return t2.$$set = function(t3) {
              "theme" in t3 && o2(4, s2 = t3.theme), "disableScrolling" in t3 && o2(20, f2 = t3.disableScrolling), "show" in t3 && o2(21, v2 = t3.show), "showSwitchButton" in t3 && o2(0, h2 = t3.showSwitchButton), "switchButtonPosition" in t3 && o2(1, m3 = t3.switchButtonPosition), "activedPluginId" in t3 && o2(2, b2 = t3.activedPluginId), "pluginList" in t3 && o2(3, w2 = t3.pluginList);
            }, t2.$$.update = function() {
              6291456 & t2.$$.dirty[0] && (true === v2 ? (o2(7, C2 = true), o2(8, O2 = true), $2 && clearTimeout($2), o2(22, $2 = setTimeout((function() {
                o2(6, x2 = true), k2();
              }), 10))) : (o2(6, x2 = false), $2 && clearTimeout($2), o2(22, $2 = setTimeout((function() {
                o2(7, C2 = false), o2(8, O2 = false);
              }), 330))));
            }, [h2, m3, b2, w2, s2, T2, x2, C2, O2, i3, function(t3) {
              E2("show", { show: true });
            }, function(t3) {
              E2("show", { show: false });
            }, P3, S2, j2, function(t3) {
              if (!("INPUT" === t3.target.tagName || "TEXTAREA" === t3.target.tagName)) {
                var n2 = false;
                if ("function" == typeof window.getComputedStyle) {
                  var e3 = window.getComputedStyle(t3.target);
                  "auto" !== e3.overflow && "initial" !== e3.overflow && "scroll" !== e3.overflow || (n2 = true);
                }
                if (!n2) {
                  var r3 = i3.scrollTop, a2 = i3.scrollHeight, c3 = r3 + i3.offsetHeight;
                  0 === r3 ? (o2(9, i3.scrollTop = 1, i3), 0 === i3.scrollTop && (L2 = true)) : c3 === a2 && (o2(9, i3.scrollTop = r3 - 1, i3), i3.scrollTop === r3 && (L2 = true));
                }
              }
            }, function(t3) {
              L2 && t3.preventDefault();
            }, function(t3) {
              L2 = false;
            }, function(t3) {
              v2 && (I2 = i3.scrollTop + i3.offsetHeight >= i3.scrollHeight - 50, R2[b2] = i3.scrollTop);
            }, A2, f2, v2, $2, function(t3) {
              o2(0, h2 = t3);
            }, function(t3) {
              o2(1, m3 = t3);
            }, function(t3) {
              return P3(t3.id);
            }, function(t3, n2, e3) {
              return S2(e3, t3.id, n2);
            }, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                o2(9, i3 = t3);
              }));
            }, function(t3, n2, e3) {
              return j2(e3, t3.id, n2);
            }];
          }
          var et = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, nt, tt, a.N8, { theme: 4, disableScrolling: 20, show: 21, showSwitchButton: 0, switchButtonPosition: 1, activedPluginId: 2, pluginList: 3 }, null, [-1, -1]), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "theme", get: function() {
              return this.$$.ctx[4];
            }, set: function(t2) {
              this.$$set({ theme: t2 }), (0, a.yl1)();
            } }, { key: "disableScrolling", get: function() {
              return this.$$.ctx[20];
            }, set: function(t2) {
              this.$$set({ disableScrolling: t2 }), (0, a.yl1)();
            } }, { key: "show", get: function() {
              return this.$$.ctx[21];
            }, set: function(t2) {
              this.$$set({ show: t2 }), (0, a.yl1)();
            } }, { key: "showSwitchButton", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ showSwitchButton: t2 }), (0, a.yl1)();
            } }, { key: "switchButtonPosition", get: function() {
              return this.$$.ctx[1];
            }, set: function(t2) {
              this.$$set({ switchButtonPosition: t2 }), (0, a.yl1)();
            } }, { key: "activedPluginId", get: function() {
              return this.$$.ctx[2];
            }, set: function(t2) {
              this.$$set({ activedPluginId: t2 }), (0, a.yl1)();
            } }, { key: "pluginList", get: function() {
              return this.$$.ctx[3];
            }, set: function(t2) {
              this.$$set({ pluginList: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), ot = et, rt = (function() {
            function e2(t2, n2) {
              void 0 === n2 && (n2 = "newPlugin"), this.isReady = false, this.eventMap = /* @__PURE__ */ new Map(), this.exporter = void 0, this._id = void 0, this._name = void 0, this._vConsole = void 0, this.id = t2, this.name = n2, this.isReady = false;
            }
            var o2 = e2.prototype;
            return o2.on = function(t2, n2) {
              return this.eventMap.set(t2, n2), this;
            }, o2.onRemove = function() {
              this.unbindExporter();
            }, o2.trigger = function(t2, n2) {
              var e3 = this.eventMap.get(t2);
              if ("function" == typeof e3) e3.call(this, n2);
              else {
                var o3 = "on" + t2.charAt(0).toUpperCase() + t2.slice(1);
                "function" == typeof this[o3] && this[o3].call(this, n2);
              }
              return this;
            }, o2.bindExporter = function() {
              if (this._vConsole && this.exporter) {
                var t2 = "default" === this.id ? "log" : this.id;
                this._vConsole[t2] = this.exporter;
              }
            }, o2.unbindExporter = function() {
              var t2 = "default" === this.id ? "log" : this.id;
              this._vConsole && this._vConsole[t2] && (this._vConsole[t2] = void 0);
            }, o2.getUniqueID = function(t2) {
              return void 0 === t2 && (t2 = ""), (0, n.QI)(t2);
            }, (0, t.Z)(e2, [{ key: "id", get: function() {
              return this._id;
            }, set: function(t2) {
              if ("string" != typeof t2) throw "[vConsole] Plugin ID must be a string.";
              if (!t2) throw "[vConsole] Plugin ID cannot be empty.";
              this._id = t2.toLowerCase();
            } }, { key: "name", get: function() {
              return this._name;
            }, set: function(t2) {
              if ("string" != typeof t2) throw "[vConsole] Plugin name must be a string.";
              if (!t2) throw "[vConsole] Plugin name cannot be empty.";
              this._name = t2;
            } }, { key: "vConsole", get: function() {
              return this._vConsole || void 0;
            }, set: function(t2) {
              if (!t2) throw "[vConsole] vConsole cannot be empty";
              this._vConsole = t2, this.bindExporter();
            } }]), e2;
          })(), it = (function(t2) {
            function n2(n3, e3, o2, r2) {
              var i3;
              return (i3 = t2.call(this, n3, e3) || this).CompClass = void 0, i3.compInstance = void 0, i3.initialProps = void 0, i3.CompClass = o2, i3.initialProps = r2, i3;
            }
            (0, i2.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.onReady = function() {
              this.isReady = true;
            }, e2.onRenderTab = function(t3) {
              var n3 = document.createElement("div"), e3 = this.compInstance = new this.CompClass({ target: n3, props: this.initialProps });
              t3(n3.firstElementChild, e3.options);
            }, e2.onRemove = function() {
              t2.prototype.onRemove && t2.prototype.onRemove.call(this), this.compInstance && this.compInstance.$destroy();
            }, n2;
          })(rt), at = __webpack_require__(8665), ct = __webpack_require__(9923);
          var ut = __webpack_require__(8702);
          function st(t2) {
            var n2, e2;
            return (n2 = new ut.Z({ props: { name: t2[0] ? "success" : "copy" } })).$on("click", t2[1]), { c: function() {
              (0, a.YCL)(n2.$$.fragment);
            }, m: function(t3, o2) {
              (0, a.yef)(n2, t3, o2), e2 = true;
            }, p: function(t3, e3) {
              var o2 = {};
              1 & e3[0] && (o2.name = t3[0] ? "success" : "copy"), n2.$set(o2);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(n2.$$.fragment, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), e2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3);
            } };
          }
          function lt(t2, e2, o2) {
            var r2 = e2.content, i3 = void 0 === r2 ? "" : r2, a2 = e2.handler, c3 = void 0 === a2 ? void 0 : a2, u2 = { target: document.documentElement }, s2 = false;
            return t2.$$set = function(t3) {
              "content" in t3 && o2(2, i3 = t3.content), "handler" in t3 && o2(3, c3 = t3.handler);
            }, [s2, function(t3) {
              (function(t4, n2) {
                var e3 = (void 0 === n2 ? {} : n2).target, o3 = void 0 === e3 ? document.body : e3, r3 = document.createElement("textarea"), i4 = document.activeElement;
                r3.value = t4, r3.setAttribute("readonly", ""), r3.style.contain = "strict", r3.style.position = "absolute", r3.style.left = "-9999px", r3.style.fontSize = "12pt";
                var a3 = document.getSelection(), c4 = false;
                a3.rangeCount > 0 && (c4 = a3.getRangeAt(0)), o3.append(r3), r3.select(), r3.selectionStart = 0, r3.selectionEnd = t4.length;
                var u3 = false;
                try {
                  u3 = document.execCommand("copy");
                } catch (t5) {
                }
                r3.remove(), c4 && (a3.removeAllRanges(), a3.addRange(c4)), i4 && i4.focus();
              })(n.mf(c3) ? c3(i3) || "" : n.Kn(i3) || n.kJ(i3) ? n.hZ(i3, { maxDepth: 10, keyMaxLen: 1e4, pretty: false, standardJSON: true }) : i3, u2), o2(0, s2 = true), setTimeout((function() {
                o2(0, s2 = false);
              }), 600);
            }, i3, c3];
          }
          var ft = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, lt, st, a.N8, { content: 2, handler: 3 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "content", get: function() {
              return this.$$.ctx[2];
            }, set: function(t2) {
              this.$$set({ content: t2 }), (0, a.yl1)();
            } }, { key: "handler", get: function() {
              return this.$$.ctx[3];
            }, set: function(t2) {
              this.$$set({ handler: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), dt = ft, vt = __webpack_require__(845), pt = {};
          vt.Z && vt.Z.locals && (pt.locals = vt.Z.locals);
          var ht, gt = 0, mt = {};
          mt.styleTagTransform = b(), mt.setAttributes = h(), mt.insert = v().bind(null, "head"), mt.domAPI = f(), mt.insertStyleElement = m2(), pt.use = function(t2) {
            return mt.options = t2 || {}, gt++ || (ht = s()(vt.Z, mt)), pt;
          }, pt.unuse = function() {
            gt > 0 && !--gt && (ht(), ht = null);
          };
          var _t = pt;
          function bt(t2) {
            var e2, o2, r2, i3 = n.rE(t2[1]) + "";
            return { c: function() {
              e2 = (0, a.bGB)("i"), o2 = (0, a.fLW)(i3), r2 = (0, a.fLW)(":"), (0, a.Ljt)(e2, "class", "vc-log-key"), (0, a.VHj)(e2, "vc-log-key-symbol", "symbol" === t2[2]), (0, a.VHj)(e2, "vc-log-key-private", "private" === t2[2]);
            }, m: function(t3, n2) {
              (0, a.$Tr)(t3, e2, n2), (0, a.R3I)(e2, o2), (0, a.$Tr)(t3, r2, n2);
            }, p: function(t3, r3) {
              2 & r3 && i3 !== (i3 = n.rE(t3[1]) + "") && (0, a.rTO)(o2, i3), 4 & r3 && (0, a.VHj)(e2, "vc-log-key-symbol", "symbol" === t3[2]), 4 & r3 && (0, a.VHj)(e2, "vc-log-key-private", "private" === t3[2]);
            }, d: function(t3) {
              t3 && (0, a.ogt)(e2), t3 && (0, a.ogt)(r2);
            } };
          }
          function yt(t2) {
            var n2, e2, o2, r2, i3 = void 0 !== t2[1] && bt(t2);
            return { c: function() {
              i3 && i3.c(), n2 = (0, a.DhX)(), e2 = (0, a.bGB)("i"), o2 = (0, a.fLW)(t2[3]), (0, a.Ljt)(e2, "class", r2 = "vc-log-val vc-log-val-" + t2[4]), (0, a.Ljt)(e2, "style", t2[0]), (0, a.VHj)(e2, "vc-log-val-haskey", void 0 !== t2[1]);
            }, m: function(t3, r3) {
              i3 && i3.m(t3, r3), (0, a.$Tr)(t3, n2, r3), (0, a.$Tr)(t3, e2, r3), (0, a.R3I)(e2, o2);
            }, p: function(t3, c3) {
              var u2 = c3[0];
              void 0 !== t3[1] ? i3 ? i3.p(t3, u2) : ((i3 = bt(t3)).c(), i3.m(n2.parentNode, n2)) : i3 && (i3.d(1), i3 = null), 8 & u2 && (0, a.rTO)(o2, t3[3]), 16 & u2 && r2 !== (r2 = "vc-log-val vc-log-val-" + t3[4]) && (0, a.Ljt)(e2, "class", r2), 1 & u2 && (0, a.Ljt)(e2, "style", t3[0]), 18 & u2 && (0, a.VHj)(e2, "vc-log-val-haskey", void 0 !== t3[1]);
            }, i: a.ZTd, o: a.ZTd, d: function(t3) {
              i3 && i3.d(t3), t3 && (0, a.ogt)(n2), t3 && (0, a.ogt)(e2);
            } };
          }
          function wt(t2, n2, e2) {
            var o2 = n2.origData, r2 = n2.style, i3 = void 0 === r2 ? "" : r2, a2 = n2.dataKey, u2 = void 0 === a2 ? void 0 : a2, s2 = n2.keyType, l2 = void 0 === s2 ? "" : s2, f2 = "", d2 = "", v2 = false;
            return (0, c2.H3)((function() {
              _t.use();
            })), (0, c2.ev)((function() {
              _t.unuse();
            })), t2.$$set = function(t3) {
              "origData" in t3 && e2(5, o2 = t3.origData), "style" in t3 && e2(0, i3 = t3.style), "dataKey" in t3 && e2(1, u2 = t3.dataKey), "keyType" in t3 && e2(2, l2 = t3.keyType);
            }, t2.$$.update = function() {
              if (122 & t2.$$.dirty) {
                e2(6, v2 = void 0 !== u2);
                var n3 = (0, at.LH)(o2, v2);
                e2(4, d2 = n3.valueType), e2(3, f2 = n3.text), v2 || "string" !== d2 || e2(3, f2 = f2.replace(/\\n/g, "\n").replace(/\\t/g, "    "));
              }
            }, [i3, u2, l2, f2, d2, o2, v2];
          }
          var Et = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, wt, yt, a.AqN, { origData: 5, style: 0, dataKey: 1, keyType: 2 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "origData", get: function() {
              return this.$$.ctx[5];
            }, set: function(t2) {
              this.$$set({ origData: t2 }), (0, a.yl1)();
            } }, { key: "style", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ style: t2 }), (0, a.yl1)();
            } }, { key: "dataKey", get: function() {
              return this.$$.ctx[1];
            }, set: function(t2) {
              this.$$set({ dataKey: t2 }), (0, a.yl1)();
            } }, { key: "keyType", get: function() {
              return this.$$.ctx[2];
            }, set: function(t2) {
              this.$$set({ keyType: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), Lt = Et, Tt = __webpack_require__(1237), xt = {};
          Tt.Z && Tt.Z.locals && (xt.locals = Tt.Z.locals);
          var Ct, Ot = 0, It = {};
          It.styleTagTransform = b(), It.setAttributes = h(), It.insert = v().bind(null, "head"), It.domAPI = f(), It.insertStyleElement = m2(), xt.use = function(t2) {
            return It.options = t2 || {}, Ot++ || (Ct = s()(Tt.Z, It)), xt;
          }, xt.unuse = function() {
            Ot > 0 && !--Ot && (Ct(), Ct = null);
          };
          var Dt = xt;
          function $t(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[19] = n2[e2], o2[21] = e2, o2;
          }
          function Rt(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[19] = n2[e2], o2;
          }
          function kt(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[19] = n2[e2], o2[21] = e2, o2;
          }
          function Pt(t2) {
            for (var n2, e2, o2, r2, i3, c3, u2, s2 = [], l2 = /* @__PURE__ */ new Map(), f2 = [], d2 = /* @__PURE__ */ new Map(), v2 = [], p2 = /* @__PURE__ */ new Map(), h2 = t2[7], g2 = function(t3) {
              return t3[19];
            }, m3 = 0; m3 < h2.length; m3 += 1) {
              var _2 = kt(t2, h2, m3), b2 = g2(_2);
              l2.set(b2, s2[m3] = St(b2, _2));
            }
            for (var y2 = t2[11] < t2[7].length && jt(t2), w2 = t2[9], E2 = function(t3) {
              return t3[19];
            }, L2 = 0; L2 < w2.length; L2 += 1) {
              var T2 = Rt(t2, w2, L2), x2 = E2(T2);
              d2.set(x2, f2[L2] = Bt(x2, T2));
            }
            for (var C2 = t2[8], O2 = function(t3) {
              return t3[19];
            }, I2 = 0; I2 < C2.length; I2 += 1) {
              var D2 = $t(t2, C2, I2), $2 = O2(D2);
              p2.set($2, v2[I2] = Ut($2, D2));
            }
            var R2 = t2[12] < t2[8].length && Gt(t2), k2 = t2[10] && Nt(t2);
            return { c: function() {
              n2 = (0, a.bGB)("div");
              for (var t3 = 0; t3 < s2.length; t3 += 1) s2[t3].c();
              e2 = (0, a.DhX)(), y2 && y2.c(), o2 = (0, a.DhX)();
              for (var u3 = 0; u3 < f2.length; u3 += 1) f2[u3].c();
              r2 = (0, a.DhX)();
              for (var l3 = 0; l3 < v2.length; l3 += 1) v2[l3].c();
              i3 = (0, a.DhX)(), R2 && R2.c(), c3 = (0, a.DhX)(), k2 && k2.c(), (0, a.Ljt)(n2, "class", "vc-log-tree-child");
            }, m: function(t3, l3) {
              (0, a.$Tr)(t3, n2, l3);
              for (var d3 = 0; d3 < s2.length; d3 += 1) s2[d3].m(n2, null);
              (0, a.R3I)(n2, e2), y2 && y2.m(n2, null), (0, a.R3I)(n2, o2);
              for (var p3 = 0; p3 < f2.length; p3 += 1) f2[p3].m(n2, null);
              (0, a.R3I)(n2, r2);
              for (var h3 = 0; h3 < v2.length; h3 += 1) v2[h3].m(n2, null);
              (0, a.R3I)(n2, i3), R2 && R2.m(n2, null), (0, a.R3I)(n2, c3), k2 && k2.m(n2, null), u2 = true;
            }, p: function(t3, u3) {
              67721 & u3 && (h2 = t3[7], (0, a.dvw)(), s2 = (0, a.GQg)(s2, u3, g2, 1, t3, h2, l2, n2, a.cly, St, e2, kt), (0, a.gbL)()), t3[11] < t3[7].length ? y2 ? y2.p(t3, u3) : ((y2 = jt(t3)).c(), y2.m(n2, o2)) : y2 && (y2.d(1), y2 = null), 66057 & u3 && (w2 = t3[9], (0, a.dvw)(), f2 = (0, a.GQg)(f2, u3, E2, 1, t3, w2, d2, n2, a.cly, Bt, r2, Rt), (0, a.gbL)()), 69897 & u3 && (C2 = t3[8], (0, a.dvw)(), v2 = (0, a.GQg)(v2, u3, O2, 1, t3, C2, p2, n2, a.cly, Ut, i3, $t), (0, a.gbL)()), t3[12] < t3[8].length ? R2 ? R2.p(t3, u3) : ((R2 = Gt(t3)).c(), R2.m(n2, c3)) : R2 && (R2.d(1), R2 = null), t3[10] ? k2 ? (k2.p(t3, u3), 1024 & u3 && (0, a.Ui)(k2, 1)) : ((k2 = Nt(t3)).c(), (0, a.Ui)(k2, 1), k2.m(n2, null)) : k2 && ((0, a.dvw)(), (0, a.etI)(k2, 1, 1, (function() {
                k2 = null;
              })), (0, a.gbL)());
            }, i: function(t3) {
              if (!u2) {
                for (var n3 = 0; n3 < h2.length; n3 += 1) (0, a.Ui)(s2[n3]);
                for (var e3 = 0; e3 < w2.length; e3 += 1) (0, a.Ui)(f2[e3]);
                for (var o3 = 0; o3 < C2.length; o3 += 1) (0, a.Ui)(v2[o3]);
                (0, a.Ui)(k2), u2 = true;
              }
            }, o: function(t3) {
              for (var n3 = 0; n3 < s2.length; n3 += 1) (0, a.etI)(s2[n3]);
              for (var e3 = 0; e3 < f2.length; e3 += 1) (0, a.etI)(f2[e3]);
              for (var o3 = 0; o3 < v2.length; o3 += 1) (0, a.etI)(v2[o3]);
              (0, a.etI)(k2), u2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
              for (var e3 = 0; e3 < s2.length; e3 += 1) s2[e3].d();
              y2 && y2.d();
              for (var o3 = 0; o3 < f2.length; o3 += 1) f2[o3].d();
              for (var r3 = 0; r3 < v2.length; r3 += 1) v2[r3].d();
              R2 && R2.d(), k2 && k2.d();
            } };
          }
          function Mt(t2) {
            var n2, e2;
            return n2 = new Kt({ props: { origData: t2[16](t2[19]), dataKey: t2[19], keyPath: t2[3] + "." + t2[19], toggle: t2[0] } }), { c: function() {
              (0, a.YCL)(n2.$$.fragment);
            }, m: function(t3, o2) {
              (0, a.yef)(n2, t3, o2), e2 = true;
            }, p: function(t3, e3) {
              var o2 = {};
              128 & e3 && (o2.origData = t3[16](t3[19])), 128 & e3 && (o2.dataKey = t3[19]), 136 & e3 && (o2.keyPath = t3[3] + "." + t3[19]), 1 & e3 && (o2.toggle = t3[0]), n2.$set(o2);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(n2.$$.fragment, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), e2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3);
            } };
          }
          function St(t2, n2) {
            var e2, o2, r2, i3 = n2[21] < n2[11] && Mt(n2);
            return { key: t2, first: null, c: function() {
              e2 = (0, a.cSb)(), i3 && i3.c(), o2 = (0, a.cSb)(), this.first = e2;
            }, m: function(t3, n3) {
              (0, a.$Tr)(t3, e2, n3), i3 && i3.m(t3, n3), (0, a.$Tr)(t3, o2, n3), r2 = true;
            }, p: function(t3, e3) {
              (n2 = t3)[21] < n2[11] ? i3 ? (i3.p(n2, e3), 2176 & e3 && (0, a.Ui)(i3, 1)) : ((i3 = Mt(n2)).c(), (0, a.Ui)(i3, 1), i3.m(o2.parentNode, o2)) : i3 && ((0, a.dvw)(), (0, a.etI)(i3, 1, 1, (function() {
                i3 = null;
              })), (0, a.gbL)());
            }, i: function(t3) {
              r2 || ((0, a.Ui)(i3), r2 = true);
            }, o: function(t3) {
              (0, a.etI)(i3), r2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(e2), i3 && i3.d(t3), t3 && (0, a.ogt)(o2);
            } };
          }
          function jt(t2) {
            var n2, e2, o2, r2, i3 = t2[14](t2[7].length - t2[11]) + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.fLW)(i3), (0, a.Ljt)(n2, "class", "vc-log-tree-loadmore");
            }, m: function(i4, c3) {
              (0, a.$Tr)(i4, n2, c3), (0, a.R3I)(n2, e2), o2 || (r2 = (0, a.oLt)(n2, "click", t2[17]), o2 = true);
            }, p: function(t3, n3) {
              2176 & n3 && i3 !== (i3 = t3[14](t3[7].length - t3[11]) + "") && (0, a.rTO)(e2, i3);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), o2 = false, r2();
            } };
          }
          function Bt(t2, n2) {
            var e2, o2, r2;
            return o2 = new Kt({ props: { origData: n2[16](n2[19]), dataKey: String(n2[19]), keyType: "symbol", keyPath: n2[3] + "[" + String(n2[19]) + "]", toggle: n2[0] } }), { key: t2, first: null, c: function() {
              e2 = (0, a.cSb)(), (0, a.YCL)(o2.$$.fragment), this.first = e2;
            }, m: function(t3, n3) {
              (0, a.$Tr)(t3, e2, n3), (0, a.yef)(o2, t3, n3), r2 = true;
            }, p: function(t3, e3) {
              n2 = t3;
              var r3 = {};
              512 & e3 && (r3.origData = n2[16](n2[19])), 512 & e3 && (r3.dataKey = String(n2[19])), 520 & e3 && (r3.keyPath = n2[3] + "[" + String(n2[19]) + "]"), 1 & e3 && (r3.toggle = n2[0]), o2.$set(r3);
            }, i: function(t3) {
              r2 || ((0, a.Ui)(o2.$$.fragment, t3), r2 = true);
            }, o: function(t3) {
              (0, a.etI)(o2.$$.fragment, t3), r2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(e2), (0, a.vpE)(o2, t3);
            } };
          }
          function At(t2) {
            var n2, e2;
            return n2 = new Kt({ props: { origData: t2[16](t2[19]), dataKey: t2[19], keyType: "private", keyPath: t2[3] + "." + t2[19], toggle: t2[0] } }), { c: function() {
              (0, a.YCL)(n2.$$.fragment);
            }, m: function(t3, o2) {
              (0, a.yef)(n2, t3, o2), e2 = true;
            }, p: function(t3, e3) {
              var o2 = {};
              256 & e3 && (o2.origData = t3[16](t3[19])), 256 & e3 && (o2.dataKey = t3[19]), 264 & e3 && (o2.keyPath = t3[3] + "." + t3[19]), 1 & e3 && (o2.toggle = t3[0]), n2.$set(o2);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(n2.$$.fragment, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), e2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3);
            } };
          }
          function Ut(t2, n2) {
            var e2, o2, r2, i3 = n2[21] < n2[12] && At(n2);
            return { key: t2, first: null, c: function() {
              e2 = (0, a.cSb)(), i3 && i3.c(), o2 = (0, a.cSb)(), this.first = e2;
            }, m: function(t3, n3) {
              (0, a.$Tr)(t3, e2, n3), i3 && i3.m(t3, n3), (0, a.$Tr)(t3, o2, n3), r2 = true;
            }, p: function(t3, e3) {
              (n2 = t3)[21] < n2[12] ? i3 ? (i3.p(n2, e3), 4352 & e3 && (0, a.Ui)(i3, 1)) : ((i3 = At(n2)).c(), (0, a.Ui)(i3, 1), i3.m(o2.parentNode, o2)) : i3 && ((0, a.dvw)(), (0, a.etI)(i3, 1, 1, (function() {
                i3 = null;
              })), (0, a.gbL)());
            }, i: function(t3) {
              r2 || ((0, a.Ui)(i3), r2 = true);
            }, o: function(t3) {
              (0, a.etI)(i3), r2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(e2), i3 && i3.d(t3), t3 && (0, a.ogt)(o2);
            } };
          }
          function Gt(t2) {
            var n2, e2, o2, r2, i3 = t2[14](t2[8].length - t2[12]) + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.fLW)(i3), (0, a.Ljt)(n2, "class", "vc-log-tree-loadmore");
            }, m: function(i4, c3) {
              (0, a.$Tr)(i4, n2, c3), (0, a.R3I)(n2, e2), o2 || (r2 = (0, a.oLt)(n2, "click", t2[18]), o2 = true);
            }, p: function(t3, n3) {
              4352 & n3 && i3 !== (i3 = t3[14](t3[8].length - t3[12]) + "") && (0, a.rTO)(e2, i3);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), o2 = false, r2();
            } };
          }
          function Nt(t2) {
            var n2, e2;
            return n2 = new Kt({ props: { origData: t2[16]("__proto__"), dataKey: "__proto__", keyType: "private", keyPath: t2[3] + ".__proto__", toggle: t2[0] } }), { c: function() {
              (0, a.YCL)(n2.$$.fragment);
            }, m: function(t3, o2) {
              (0, a.yef)(n2, t3, o2), e2 = true;
            }, p: function(t3, e3) {
              var o2 = {};
              8 & e3 && (o2.keyPath = t3[3] + ".__proto__"), 1 & e3 && (o2.toggle = t3[0]), n2.$set(o2);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(n2.$$.fragment, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), e2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3);
            } };
          }
          function Vt(t2) {
            var n2, e2, o2, r2, i3, c3, u2;
            o2 = new Lt({ props: { origData: t2[1], dataKey: t2[2], keyType: t2[4] } });
            var s2 = t2[6] && t2[5] && Pt(t2);
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("div"), (0, a.YCL)(o2.$$.fragment), r2 = (0, a.DhX)(), s2 && s2.c(), (0, a.Ljt)(e2, "class", "vc-log-tree-node"), (0, a.Ljt)(n2, "class", "vc-log-tree"), (0, a.Ljt)(n2, "data-keypath", t2[3]), (0, a.VHj)(n2, "vc-toggle", t2[5]), (0, a.VHj)(n2, "vc-is-tree", t2[6]);
            }, m: function(l2, f2) {
              (0, a.$Tr)(l2, n2, f2), (0, a.R3I)(n2, e2), (0, a.yef)(o2, e2, null), (0, a.R3I)(n2, r2), s2 && s2.m(n2, null), i3 = true, c3 || (u2 = (0, a.oLt)(e2, "click", (0, a.XET)(t2[15])), c3 = true);
            }, p: function(t3, e3) {
              var r3 = e3[0], c4 = {};
              2 & r3 && (c4.origData = t3[1]), 4 & r3 && (c4.dataKey = t3[2]), 16 & r3 && (c4.keyType = t3[4]), o2.$set(c4), t3[6] && t3[5] ? s2 ? (s2.p(t3, r3), 96 & r3 && (0, a.Ui)(s2, 1)) : ((s2 = Pt(t3)).c(), (0, a.Ui)(s2, 1), s2.m(n2, null)) : s2 && ((0, a.dvw)(), (0, a.etI)(s2, 1, 1, (function() {
                s2 = null;
              })), (0, a.gbL)()), (!i3 || 8 & r3) && (0, a.Ljt)(n2, "data-keypath", t3[3]), 32 & r3 && (0, a.VHj)(n2, "vc-toggle", t3[5]), 64 & r3 && (0, a.VHj)(n2, "vc-is-tree", t3[6]);
            }, i: function(t3) {
              i3 || ((0, a.Ui)(o2.$$.fragment, t3), (0, a.Ui)(s2), i3 = true);
            }, o: function(t3) {
              (0, a.etI)(o2.$$.fragment, t3), (0, a.etI)(s2), i3 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(o2), s2 && s2.d(), c3 = false, u2();
            } };
          }
          function Wt(t2, e2, o2) {
            var r2, i3, a2, u2 = e2.origData, s2 = e2.dataKey, l2 = void 0 === s2 ? void 0 : s2, f2 = e2.keyPath, d2 = void 0 === f2 ? "" : f2, v2 = e2.keyType, p2 = void 0 === v2 ? "" : v2, h2 = e2.toggle, g2 = void 0 === h2 ? {} : h2, m3 = false, _2 = false, b2 = false, y2 = 50, w2 = 50;
            (0, c2.H3)((function() {
              Dt.use();
            })), (0, c2.ev)((function() {
              Dt.unuse();
            }));
            var E2 = function(t3) {
              "enum" === t3 ? o2(11, y2 += 50) : "nonEnum" === t3 && o2(12, w2 += 50);
            };
            return t2.$$set = function(t3) {
              "origData" in t3 && o2(1, u2 = t3.origData), "dataKey" in t3 && o2(2, l2 = t3.dataKey), "keyPath" in t3 && o2(3, d2 = t3.keyPath), "keyType" in t3 && o2(4, p2 = t3.keyType), "toggle" in t3 && o2(0, g2 = t3.toggle);
            }, t2.$$.update = function() {
              1003 & t2.$$.dirty && (o2(5, m3 = g2[d2] || false), o2(6, _2 = !(u2 instanceof at.Tg) && (n.kJ(u2) || n.Kn(u2))), _2 && m3 && (o2(7, r2 = r2 || n.qr(n.MH(u2))), o2(8, i3 = i3 || n.qr(n.QK(u2))), o2(9, a2 = a2 || n._D(u2)), o2(10, b2 = n.Kn(u2) && -1 === i3.indexOf("__proto__"))));
            }, [g2, u2, l2, d2, p2, m3, _2, r2, i3, a2, b2, y2, w2, E2, function(t3) {
              return "(..." + t3 + " Key" + (t3 > 1 ? "s" : "") + " Left)";
            }, function() {
              o2(5, m3 = !m3), o2(0, g2[d2] = m3, g2);
            }, function(t3) {
              try {
                return u2[t3];
              } catch (t4) {
                return new at.Tg();
              }
            }, function() {
              return E2("enum");
            }, function() {
              return E2("nonEnum");
            }];
          }
          var Kt = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, Wt, Vt, a.AqN, { origData: 1, dataKey: 2, keyPath: 3, keyType: 4, toggle: 0 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "origData", get: function() {
              return this.$$.ctx[1];
            }, set: function(t2) {
              this.$$set({ origData: t2 }), (0, a.yl1)();
            } }, { key: "dataKey", get: function() {
              return this.$$.ctx[2];
            }, set: function(t2) {
              this.$$set({ dataKey: t2 }), (0, a.yl1)();
            } }, { key: "keyPath", get: function() {
              return this.$$.ctx[3];
            }, set: function(t2) {
              this.$$set({ keyPath: t2 }), (0, a.yl1)();
            } }, { key: "keyType", get: function() {
              return this.$$.ctx[4];
            }, set: function(t2) {
              this.$$set({ keyType: t2 }), (0, a.yl1)();
            } }, { key: "toggle", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ toggle: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), Ht = Kt, Ft = __webpack_require__(7147), Zt = {};
          Ft.Z && Ft.Z.locals && (Zt.locals = Ft.Z.locals);
          var qt, Xt = 0, zt = {};
          zt.styleTagTransform = b(), zt.setAttributes = h(), zt.insert = v().bind(null, "head"), zt.domAPI = f(), zt.insertStyleElement = m2(), Zt.use = function(t2) {
            return zt.options = t2 || {}, Xt++ || (qt = s()(Ft.Z, zt)), Zt;
          }, Zt.unuse = function() {
            Xt > 0 && !--Xt && (qt(), qt = null);
          };
          var Yt = Zt;
          function Jt(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[9] = n2[e2], o2[11] = e2, o2;
          }
          function Qt(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[12] = n2[e2], o2;
          }
          function tn(t2) {
            for (var n2, e2, o2, r2, i3, c3, u2, s2, l2, f2, d2, v2, p2, h2 = [], g2 = /* @__PURE__ */ new Map(), m3 = t2[0].groupLevel && nn(t2), _2 = t2[2] > 0 && on2(), b2 = t2[1] && rn(t2), y2 = t2[0].repeated && an(t2), w2 = t2[0].data, E2 = function(t3) {
              return t3[11];
            }, L2 = 0; L2 < w2.length; L2 += 1) {
              var T2 = Jt(t2, w2, L2), x2 = E2(T2);
              g2.set(x2, h2[L2] = sn(x2, T2));
            }
            return l2 = new dt({ props: { handler: t2[6] } }), { c: function() {
              n2 = (0, a.bGB)("div"), m3 && m3.c(), e2 = (0, a.DhX)(), _2 && _2.c(), o2 = (0, a.DhX)(), b2 && b2.c(), r2 = (0, a.DhX)(), y2 && y2.c(), i3 = (0, a.DhX)(), c3 = (0, a.bGB)("div");
              for (var d3 = 0; d3 < h2.length; d3 += 1) h2[d3].c();
              u2 = (0, a.DhX)(), s2 = (0, a.bGB)("div"), (0, a.YCL)(l2.$$.fragment), (0, a.Ljt)(c3, "class", "vc-log-content"), (0, a.Ljt)(s2, "class", "vc-logrow-icon"), (0, a.Ljt)(n2, "class", f2 = "vc-log-row vc-log-" + t2[0].type), (0, a.VHj)(n2, "vc-log-input", "input" === t2[0].cmdType), (0, a.VHj)(n2, "vc-log-output", "output" === t2[0].cmdType), (0, a.VHj)(n2, "vc-log-group", t2[2] > 0), (0, a.VHj)(n2, "vc-toggle", 1 === t2[2]);
            }, m: function(f3, g3) {
              (0, a.$Tr)(f3, n2, g3), m3 && m3.m(n2, null), (0, a.R3I)(n2, e2), _2 && _2.m(n2, null), (0, a.R3I)(n2, o2), b2 && b2.m(n2, null), (0, a.R3I)(n2, r2), y2 && y2.m(n2, null), (0, a.R3I)(n2, i3), (0, a.R3I)(n2, c3);
              for (var w3 = 0; w3 < h2.length; w3 += 1) h2[w3].m(c3, null);
              (0, a.R3I)(n2, u2), (0, a.R3I)(n2, s2), (0, a.yef)(l2, s2, null), d2 = true, v2 || (p2 = (0, a.oLt)(n2, "click", t2[5]), v2 = true);
            }, p: function(t3, u3) {
              t3[0].groupLevel ? m3 ? m3.p(t3, u3) : ((m3 = nn(t3)).c(), m3.m(n2, e2)) : m3 && (m3.d(1), m3 = null), t3[2] > 0 ? _2 || ((_2 = on2()).c(), _2.m(n2, o2)) : _2 && (_2.d(1), _2 = null), t3[1] ? b2 ? b2.p(t3, u3) : ((b2 = rn(t3)).c(), b2.m(n2, r2)) : b2 && (b2.d(1), b2 = null), t3[0].repeated ? y2 ? y2.p(t3, u3) : ((y2 = an(t3)).c(), y2.m(n2, i3)) : y2 && (y2.d(1), y2 = null), 17 & u3 && (w2 = t3[0].data, (0, a.dvw)(), h2 = (0, a.GQg)(h2, u3, E2, 1, t3, w2, g2, c3, a.cly, sn, null, Jt), (0, a.gbL)()), (!d2 || 1 & u3 && f2 !== (f2 = "vc-log-row vc-log-" + t3[0].type)) && (0, a.Ljt)(n2, "class", f2), 1 & u3 && (0, a.VHj)(n2, "vc-log-input", "input" === t3[0].cmdType), 1 & u3 && (0, a.VHj)(n2, "vc-log-output", "output" === t3[0].cmdType), 5 & u3 && (0, a.VHj)(n2, "vc-log-group", t3[2] > 0), 5 & u3 && (0, a.VHj)(n2, "vc-toggle", 1 === t3[2]);
            }, i: function(t3) {
              if (!d2) {
                for (var n3 = 0; n3 < w2.length; n3 += 1) (0, a.Ui)(h2[n3]);
                (0, a.Ui)(l2.$$.fragment, t3), d2 = true;
              }
            }, o: function(t3) {
              for (var n3 = 0; n3 < h2.length; n3 += 1) (0, a.etI)(h2[n3]);
              (0, a.etI)(l2.$$.fragment, t3), d2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), m3 && m3.d(), _2 && _2.d(), b2 && b2.d(), y2 && y2.d();
              for (var e3 = 0; e3 < h2.length; e3 += 1) h2[e3].d();
              (0, a.vpE)(l2), v2 = false, p2();
            } };
          }
          function nn(t2) {
            for (var n2, e2 = new Array(t2[0].groupLevel), o2 = [], r2 = 0; r2 < e2.length; r2 += 1) o2[r2] = en(Qt(t2, e2, r2));
            return { c: function() {
              for (var t3 = 0; t3 < o2.length; t3 += 1) o2[t3].c();
              n2 = (0, a.cSb)();
            }, m: function(t3, e3) {
              for (var r3 = 0; r3 < o2.length; r3 += 1) o2[r3].m(t3, e3);
              (0, a.$Tr)(t3, n2, e3);
            }, p: function(t3, r3) {
              if (1 & r3) {
                var i3;
                for (e2 = new Array(t3[0].groupLevel), i3 = 0; i3 < e2.length; i3 += 1) {
                  var a2 = Qt(t3, e2, i3);
                  o2[i3] ? o2[i3].p(a2, r3) : (o2[i3] = en(), o2[i3].c(), o2[i3].m(n2.parentNode, n2));
                }
                for (; i3 < o2.length; i3 += 1) o2[i3].d(1);
                o2.length = e2.length;
              }
            }, d: function(t3) {
              (0, a.RMB)(o2, t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function en(t2) {
            var n2;
            return { c: function() {
              n2 = (0, a.bGB)("i"), (0, a.Ljt)(n2, "class", "vc-log-padding");
            }, m: function(t3, e2) {
              (0, a.$Tr)(t3, n2, e2);
            }, p: a.ZTd, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function on2(t2) {
            var n2;
            return { c: function() {
              n2 = (0, a.bGB)("div"), (0, a.Ljt)(n2, "class", "vc-log-group-toggle");
            }, m: function(t3, e2) {
              (0, a.$Tr)(t3, n2, e2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function rn(t2) {
            var n2, e2;
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.fLW)(t2[3]), (0, a.Ljt)(n2, "class", "vc-log-time");
            }, m: function(t3, o2) {
              (0, a.$Tr)(t3, n2, o2), (0, a.R3I)(n2, e2);
            }, p: function(t3, n3) {
              8 & n3 && (0, a.rTO)(e2, t3[3]);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function an(t2) {
            var n2, e2, o2, r2 = t2[0].repeated + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("i"), o2 = (0, a.fLW)(r2), (0, a.Ljt)(n2, "class", "vc-log-repeat");
            }, m: function(t3, r3) {
              (0, a.$Tr)(t3, n2, r3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2);
            }, p: function(t3, n3) {
              1 & n3 && r2 !== (r2 = t3[0].repeated + "") && (0, a.rTO)(o2, r2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function cn(t2) {
            var n2, e2;
            return n2 = new Lt({ props: { origData: t2[9].origData, style: t2[9].style } }), { c: function() {
              (0, a.YCL)(n2.$$.fragment);
            }, m: function(t3, o2) {
              (0, a.yef)(n2, t3, o2), e2 = true;
            }, p: function(t3, e3) {
              var o2 = {};
              1 & e3 && (o2.origData = t3[9].origData), 1 & e3 && (o2.style = t3[9].style), n2.$set(o2);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(n2.$$.fragment, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), e2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3);
            } };
          }
          function un(t2) {
            var n2, e2;
            return n2 = new Ht({ props: { origData: t2[9].origData, keyPath: String(t2[11]), toggle: t2[0].toggle } }), { c: function() {
              (0, a.YCL)(n2.$$.fragment);
            }, m: function(t3, o2) {
              (0, a.yef)(n2, t3, o2), e2 = true;
            }, p: function(t3, e3) {
              var o2 = {};
              1 & e3 && (o2.origData = t3[9].origData), 1 & e3 && (o2.keyPath = String(t3[11])), 1 & e3 && (o2.toggle = t3[0].toggle), n2.$set(o2);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(n2.$$.fragment, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), e2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3);
            } };
          }
          function sn(t2, n2) {
            var e2, o2, r2, i3, c3, u2, s2 = [un, cn], l2 = [];
            function f2(t3, n3) {
              return 1 & n3 && (o2 = null), null == o2 && (o2 = !!t3[4](t3[9].origData)), o2 ? 0 : 1;
            }
            return r2 = f2(n2, -1), i3 = l2[r2] = s2[r2](n2), { key: t2, first: null, c: function() {
              e2 = (0, a.cSb)(), i3.c(), c3 = (0, a.cSb)(), this.first = e2;
            }, m: function(t3, n3) {
              (0, a.$Tr)(t3, e2, n3), l2[r2].m(t3, n3), (0, a.$Tr)(t3, c3, n3), u2 = true;
            }, p: function(t3, e3) {
              var o3 = r2;
              (r2 = f2(n2 = t3, e3)) === o3 ? l2[r2].p(n2, e3) : ((0, a.dvw)(), (0, a.etI)(l2[o3], 1, 1, (function() {
                l2[o3] = null;
              })), (0, a.gbL)(), (i3 = l2[r2]) ? i3.p(n2, e3) : (i3 = l2[r2] = s2[r2](n2)).c(), (0, a.Ui)(i3, 1), i3.m(c3.parentNode, c3));
            }, i: function(t3) {
              u2 || ((0, a.Ui)(i3), u2 = true);
            }, o: function(t3) {
              (0, a.etI)(i3), u2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(e2), l2[r2].d(t3), t3 && (0, a.ogt)(c3);
            } };
          }
          function ln(t2) {
            var n2, e2, o2 = t2[0] && tn(t2);
            return { c: function() {
              o2 && o2.c(), n2 = (0, a.cSb)();
            }, m: function(t3, r2) {
              o2 && o2.m(t3, r2), (0, a.$Tr)(t3, n2, r2), e2 = true;
            }, p: function(t3, e3) {
              var r2 = e3[0];
              t3[0] ? o2 ? (o2.p(t3, r2), 1 & r2 && (0, a.Ui)(o2, 1)) : ((o2 = tn(t3)).c(), (0, a.Ui)(o2, 1), o2.m(n2.parentNode, n2)) : o2 && ((0, a.dvw)(), (0, a.etI)(o2, 1, 1, (function() {
                o2 = null;
              })), (0, a.gbL)());
            }, i: function(t3) {
              e2 || ((0, a.Ui)(o2), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(o2), e2 = false;
            }, d: function(t3) {
              o2 && o2.d(t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function fn(t2, e2, o2) {
            var r2 = e2.log, i3 = e2.showTimestamps, a2 = void 0 !== i3 && i3, u2 = e2.groupHeader, s2 = void 0 === u2 ? 0 : u2, l2 = (0, c2.x)(), f2 = "", d2 = function(t3, n2) {
              var e3 = "000" + t3;
              return e3.substring(e3.length - n2);
            };
            (0, c2.H3)((function() {
              Yt.use();
            })), (0, c2.ev)((function() {
              Yt.unuse();
            }));
            return t2.$$set = function(t3) {
              "log" in t3 && o2(0, r2 = t3.log), "showTimestamps" in t3 && o2(1, a2 = t3.showTimestamps), "groupHeader" in t3 && o2(2, s2 = t3.groupHeader);
            }, t2.$$.update = function() {
              if (3 & t2.$$.dirty && a2) {
                var n2 = new Date(r2.date);
                o2(3, f2 = d2(n2.getHours(), 2) + ":" + d2(n2.getMinutes(), 2) + ":" + d2(n2.getSeconds(), 2) + ":" + d2(n2.getMilliseconds(), 3));
              }
            }, [r2, a2, s2, f2, function(t3) {
              return !(t3 instanceof at.Tg) && (n.kJ(t3) || n.Kn(t3));
            }, function() {
              s2 > 0 && l2("groupCollapsed", { groupLabel: r2.groupLabel, groupHeader: 1 === s2 ? 2 : 1, isGroupCollapsed: 1 === s2 });
            }, function() {
              var t3 = [];
              try {
                for (var e3 = 0; e3 < r2.data.length; e3++) n.HD(r2.data[e3].origData) || n.hj(r2.data[e3].origData) ? t3.push(r2.data[e3].origData) : t3.push(n.hZ(r2.data[e3].origData, { maxDepth: 10, keyMaxLen: 1e4, pretty: false, standardJSON: true }));
              } catch (t4) {
              }
              return t3.join(" ");
            }];
          }
          var dn = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, fn, ln, a.AqN, { log: 0, showTimestamps: 1, groupHeader: 2 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "log", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ log: t2 }), (0, a.yl1)();
            } }, { key: "showTimestamps", get: function() {
              return this.$$.ctx[1];
            }, set: function(t2) {
              this.$$set({ showTimestamps: t2 }), (0, a.yl1)();
            } }, { key: "groupHeader", get: function() {
              return this.$$.ctx[2];
            }, set: function(t2) {
              this.$$set({ groupHeader: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), vn = dn, pn = __webpack_require__(3903), hn = __webpack_require__(3327), gn = {};
          hn.Z && hn.Z.locals && (gn.locals = hn.Z.locals);
          var mn, _n = 0, bn = {};
          bn.styleTagTransform = b(), bn.setAttributes = h(), bn.insert = v().bind(null, "head"), bn.domAPI = f(), bn.insertStyleElement = m2(), gn.use = function(t2) {
            return bn.options = t2 || {}, _n++ || (mn = s()(hn.Z, bn)), gn;
          }, gn.unuse = function() {
            _n > 0 && !--_n && (mn(), mn = null);
          };
          var yn = gn, wn = __webpack_require__(4264), En = __webpack_require__.n(wn), Ln = (function() {
            function t2(t3) {
              console.debug("[vConsole] `ResizeObserver` is not supported in the browser, vConsole cannot render correctly.");
              t3([{ contentRect: { height: 30 } }], this);
            }
            var n2 = t2.prototype;
            return n2.disconnect = function() {
            }, n2.observe = function(t3, n3) {
            }, n2.unobserve = function(t3) {
            }, t2;
          })(), Tn = function() {
            return "function" == typeof window.ResizeObserver;
          }, xn = function() {
            return window.ResizeObserver || Ln;
          };
          function Cn(t2) {
            var n2, e2, o2 = t2[6].default, r2 = (0, a.nuO)(o2, t2, t2[5], null);
            return { c: function() {
              n2 = (0, a.bGB)("div"), r2 && r2.c(), (0, a.Ljt)(n2, "class", "vc-scroller-item"), (0, a.czc)(n2, "display", t2[0] ? "block" : "none", false), (0, a.czc)(n2, "top", t2[3] ? t2[1] + "px" : "auto", false);
            }, m: function(o3, i3) {
              (0, a.$Tr)(o3, n2, i3), r2 && r2.m(n2, null), t2[7](n2), e2 = true;
            }, p: function(t3, i3) {
              var c3 = i3[0];
              r2 && r2.p && (!e2 || 32 & c3) && (0, a.kmG)(r2, o2, t3, t3[5], e2 ? (0, a.u2N)(o2, t3[5], c3, null) : (0, a.VOJ)(t3[5]), null), 1 & c3 && (0, a.czc)(n2, "display", t3[0] ? "block" : "none", false), 2 & c3 && (0, a.czc)(n2, "top", t3[3] ? t3[1] + "px" : "auto", false);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(r2, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(r2, t3), e2 = false;
            }, d: function(e3) {
              e3 && (0, a.ogt)(n2), r2 && r2.d(e3), t2[7](null);
            } };
          }
          function On(t2, n2, e2) {
            var o2, r2 = n2.$$slots, i3 = void 0 === r2 ? {} : r2, u2 = n2.$$scope, s2 = n2.show, l2 = void 0 === s2 ? !Tn() : s2, f2 = n2.top, d2 = n2.onResize, v2 = void 0 === d2 ? function() {
            } : d2, p2 = null, h2 = Tn();
            return (0, c2.H3)((function() {
              if (l2 && v2(o2.getBoundingClientRect().height), h2) {
                var t3 = xn();
                (p2 = new t3((function(t4) {
                  var n3 = t4[0];
                  l2 && v2(n3.contentRect.height);
                }))).observe(o2);
              }
            })), (0, c2.ev)((function() {
              h2 && p2.disconnect();
            })), t2.$$set = function(t3) {
              "show" in t3 && e2(0, l2 = t3.show), "top" in t3 && e2(1, f2 = t3.top), "onResize" in t3 && e2(4, v2 = t3.onResize), "$$scope" in t3 && e2(5, u2 = t3.$$scope);
            }, [l2, f2, o2, h2, v2, u2, i3, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                e2(2, o2 = t3);
              }));
            }];
          }
          var In = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, On, Cn, a.N8, { show: 0, top: 1, onResize: 4 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "show", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ show: t2 }), (0, a.yl1)();
            } }, { key: "top", get: function() {
              return this.$$.ctx[1];
            }, set: function(t2) {
              this.$$set({ top: t2 }), (0, a.yl1)();
            } }, { key: "onResize", get: function() {
              return this.$$.ctx[4];
            }, set: function(t2) {
              this.$$set({ onResize: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), Dn = In, $n = (function() {
            function t2() {
              this._x = 0, this._endX = 0, this._v = 0, this._startTime = 0, this._endTime = 0;
            }
            var n2 = t2.prototype;
            return n2.set = function(t3, n3, e2, o2) {
              this._x = t3, this._endX = n3, this._v = (n3 - t3) / e2, this._startTime = o2 || Date.now(), this._endTime = this._startTime + e2;
            }, n2.x = function(t3) {
              if (this.done(t3)) return this._endX;
              var n3 = t3 - this._startTime;
              return this._x + this._v * n3;
            }, n2.dx = function(t3) {
              return this.done(t3) ? 0 : this._v;
            }, n2.done = function(t3) {
              return t3 >= this._endTime;
            }, t2;
          })(), Rn = (function() {
            function t2(t3) {
              this._drag = void 0, this._dragLog = void 0, this._x = 0, this._v = 0, this._startTime = 0, this._drag = t3, this._dragLog = Math.log(t3);
            }
            var n2 = t2.prototype;
            return n2.set = function(t3, n3, e2) {
              this._x = t3, this._v = n3, this._startTime = e2 || Date.now();
            }, n2.x = function(t3) {
              var n3 = (t3 - this._startTime) / 1e3;
              return this._x + this._v * Math.pow(this._drag, n3) / this._dragLog - this._v / this._dragLog;
            }, n2.dx = function(t3) {
              var n3 = (t3 - this._startTime) / 1e3;
              return this._v * Math.pow(this._drag, n3);
            }, n2.done = function(t3) {
              return Math.abs(this.dx(t3)) < 3;
            }, t2;
          })(), kn = function(t2, n2) {
            return t2 > n2 - 0.1 && t2 < n2 + 0.1;
          }, Pn = function(t2) {
            return kn(t2, 0);
          }, Mn = (function() {
            function t2(t3, n3, e2) {
              this._solver = void 0, this._solution = void 0, this._endPosition = void 0, this._startTime = void 0, this._solver = (function(t4, n4, e3) {
                var o2 = e3, r2 = t4, i3 = n4, a2 = o2 * o2 - 4 * r2 * i3;
                if (0 == a2) {
                  var c3 = -o2 / (2 * r2);
                  return function(t5, n5) {
                    var e4 = t5, o3 = n5 / (c3 * t5);
                    return { x: function(t6) {
                      return (e4 + o3 * t6) * Math.pow(Math.E, c3 * t6);
                    }, dx: function(t6) {
                      return (c3 * (e4 + o3 * t6) + o3) * Math.pow(Math.E, c3 * t6);
                    } };
                  };
                }
                if (a2 > 0) {
                  var u2 = (-o2 - Math.sqrt(a2)) / (2 * r2), s2 = (-o2 + Math.sqrt(a2)) / (2 * r2);
                  return function(t5, n5) {
                    var e4 = (n5 - u2 * t5) / (s2 - u2), o3 = t5 - e4;
                    return { x: function(t6) {
                      return o3 * Math.pow(Math.E, u2 * t6) + e4 * Math.pow(Math.E, s2 * t6);
                    }, dx: function(t6) {
                      return o3 * u2 * Math.pow(Math.E, u2 * t6) + e4 * s2 * Math.pow(Math.E, s2 * t6);
                    } };
                  };
                }
                var l2 = Math.sqrt(4 * r2 * i3 - o2 * o2) / (2 * r2), f2 = -o2 / 2 * r2;
                return function(t5, n5) {
                  var e4 = t5, o3 = (n5 - f2 * t5) / l2;
                  return { x: function(t6) {
                    return Math.pow(Math.E, f2 * t6) * (e4 * Math.cos(l2 * t6) + o3 * Math.sin(l2 * t6));
                  }, dx: function(t6) {
                    var n6 = Math.pow(Math.E, f2 * t6), r3 = Math.cos(l2 * t6), i4 = Math.sin(l2 * t6);
                    return n6 * (o3 * l2 * r3 - e4 * l2 * i4) + f2 * n6 * (o3 * i4 + e4 * r3);
                  } };
                };
              })(t3, n3, e2), this._solution = null, this._endPosition = 0, this._startTime = 0;
            }
            var n2 = t2.prototype;
            return n2.x = function(t3) {
              if (!this._solution) return 0;
              var n3 = (t3 - this._startTime) / 1e3;
              return this._endPosition + this._solution.x(n3);
            }, n2.dx = function(t3) {
              if (!this._solution) return 0;
              var n3 = (t3 - this._startTime) / 1e3;
              return this._solution.dx(n3);
            }, n2.set = function(t3, n3, e2, o2) {
              o2 || (o2 = Date.now()), this._endPosition = t3, n3 == t3 && Pn(e2) || (this._solution = this._solver(n3 - t3, e2), this._startTime = o2);
            }, n2.done = function(t3) {
              return t3 || (t3 = Date.now()), kn(this.x(t3), this._endPosition) && Pn(this.dx(t3));
            }, t2;
          })(), Sn = (function() {
            function t2(t3, n3) {
              this._enableSpring = n3, this._getExtend = void 0, this._friction = new Rn(0.05), this._spring = new Mn(1, 90, 20), this._toEdge = false, this._getExtend = t3;
            }
            var n2 = t2.prototype;
            return n2.set = function(t3, n3, e2) {
              if (void 0 === e2 && (e2 = Date.now()), this._friction.set(t3, n3, e2), t3 > 0 && n3 >= 0) this._toEdge = true, this._enableSpring && this._spring.set(0, t3, n3, e2);
              else {
                var o2 = this._getExtend();
                t3 < -o2 && n3 <= 0 ? (this._toEdge = true, this._enableSpring && this._spring.set(-o2, t3, n3, e2)) : this._toEdge = false;
              }
            }, n2.x = function(t3) {
              if (this._enableSpring && this._toEdge) return this._spring.x(t3);
              var n3 = this._friction.x(t3), e2 = this._friction.dx(t3);
              if (n3 > 0 && e2 >= 0) {
                if (this._toEdge = true, !this._enableSpring) return 0;
                this._spring.set(0, n3, e2, t3);
              } else {
                var o2 = this._getExtend();
                if (n3 < -o2 && e2 <= 0) {
                  if (this._toEdge = true, !this._enableSpring) return -o2;
                  this._spring.set(-o2, n3, e2, t3);
                }
              }
              return n3;
            }, n2.dx = function(t3) {
              return this._toEdge ? this._enableSpring ? this._spring.dx(t3) : 0 : this._friction.dx(t3);
            }, n2.done = function(t3) {
              return this._toEdge ? !this._enableSpring || this._spring.done(t3) : this._friction.done(t3);
            }, t2;
          })();
          function jn(t2, n2) {
            var e2, o2;
            return (function r2() {
              if (!o2) {
                var i3 = Date.now();
                n2(i3), t2.done(i3) || (e2 = requestAnimationFrame(r2));
              }
            })(), { cancel: function() {
              cancelAnimationFrame(e2), o2 = true;
            } };
          }
          var Bn = (function() {
            function t2(t3, n3) {
              this._updatePosition = n3, this._scrollModel = void 0, this._linearModel = void 0, this._startPosition = 0, this._position = 0, this._animate = null, this._getExtent = void 0, this._getExtent = t3, this._scrollModel = new Sn(t3, false), this._linearModel = new $n();
            }
            var n2 = t2.prototype;
            return n2.onTouchStart = function() {
              var t3 = this._position;
              if (t3 > 0) t3 *= 0;
              else {
                var n3 = this._getExtent();
                t3 < -n3 && (t3 = 0 * (t3 + n3) - n3);
              }
              this._startPosition = this._position = t3, this._animate && (this._animate.cancel(), this._animate = null), this._updatePosition(-t3);
            }, n2.onTouchMove = function(t3, n3) {
              var e2 = n3 + this._startPosition;
              if (e2 > 0) e2 *= 0;
              else {
                var o2 = this._getExtent();
                e2 < -o2 && (e2 = 0 * (e2 + o2) - o2);
              }
              this._position = e2, this._updatePosition(-e2);
            }, n2.onTouchEnd = function(t3, n3, e2, o2) {
              var r2 = this, i3 = n3 + this._startPosition;
              if (i3 > 0) i3 *= 0;
              else {
                var a2 = this._getExtent();
                i3 < -a2 && (i3 = 0 * (i3 + a2) - a2);
              }
              if (this._position = i3, this._updatePosition(-i3), !(Math.abs(n3) <= 0.1 && Math.abs(o2) <= 0.1)) {
                var c3 = this._scrollModel;
                c3.set(i3, o2), this._animate = jn(c3, (function(t4) {
                  var n4 = r2._position = c3.x(t4);
                  r2._updatePosition(-n4);
                }));
              }
            }, n2.onTouchCancel = function() {
              var t3 = this, n3 = this._position;
              if (n3 > 0) n3 *= 0;
              else {
                var e2 = this._getExtent();
                n3 < -e2 && (n3 = 0 * (n3 + e2) - e2);
              }
              this._position = n3;
              var o2 = this._scrollModel;
              o2.set(n3, 0), this._animate = jn(o2, (function(n4) {
                var e3 = t3._position = o2.x(n4);
                t3._updatePosition(-e3);
              }));
            }, n2.onWheel = function(t3, n3) {
              var e2 = this._position - n3;
              if (this._animate && (this._animate.cancel(), this._animate = null), e2 > 0) e2 = 0;
              else {
                var o2 = this._getExtent();
                e2 < -o2 && (e2 = -o2);
              }
              this._position = e2, this._updatePosition(-e2);
            }, n2.getPosition = function() {
              return -this._position;
            }, n2.updatePosition = function(t3) {
              var n3 = -t3 - this._position;
              this._startPosition += n3, this._position += n3;
              var e2 = this._position;
              this._updatePosition(-e2);
              var o2 = this._scrollModel, r2 = Date.now();
              if (!o2.done(r2)) {
                var i3 = o2.dx(r2);
                o2.set(e2, i3, r2);
              }
            }, n2.scrollTo = function(t3, n3) {
              var e2 = this;
              if (this._animate && (this._animate.cancel(), this._animate = null), n3 > 0) {
                var o2 = this._linearModel;
                o2.set(this._position, -t3, n3), this._animate = jn(this._linearModel, (function(t4) {
                  var n4 = e2._position = o2.x(t4);
                  e2._updatePosition(-n4);
                }));
              } else this._updatePosition(t3);
            }, t2;
          })();
          function An(t2, n2) {
            var e2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
            if (e2) return (e2 = e2.call(t2)).next.bind(e2);
            if (Array.isArray(t2) || (e2 = (function(t3, n3) {
              if (!t3) return;
              if ("string" == typeof t3) return Un(t3, n3);
              var e3 = Object.prototype.toString.call(t3).slice(8, -1);
              "Object" === e3 && t3.constructor && (e3 = t3.constructor.name);
              if ("Map" === e3 || "Set" === e3) return Array.from(t3);
              if ("Arguments" === e3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3)) return Un(t3, n3);
            })(t2)) || n2) {
              e2 && (t2 = e2);
              var o2 = 0;
              return function() {
                return o2 >= t2.length ? { done: true } : { done: false, value: t2[o2++] };
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function Un(t2, n2) {
            (null == n2 || n2 > t2.length) && (n2 = t2.length);
            for (var e2 = 0, o2 = new Array(n2); e2 < n2; e2++) o2[e2] = t2[e2];
            return o2;
          }
          var Gn = function(t2) {
            var n2 = null, e2 = false, o2 = function o3() {
              e2 = false, t2(), n2 = requestAnimationFrame((function() {
                n2 = null, e2 && o3();
              }));
            };
            return { trigger: function() {
              null === n2 ? o2() : e2 = true;
            }, cancel: function() {
              n2 && (cancelAnimationFrame(n2), e2 = false, n2 = null);
            } };
          }, Nn = (function() {
            function t2(t3) {
              var n2 = this;
              this._handler = t3, this._touchId = null, this._startX = 0, this._startY = 0, this._historyX = [], this._historyY = [], this._historyTime = [], this._wheelDeltaX = 0, this._wheelDeltaY = 0, this._onTouchMove = function() {
                var t4 = n2._historyX[n2._historyX.length - 1], e2 = n2._historyY[n2._historyY.length - 1];
                n2._handler.onTouchMove(t4, e2);
              }, this._onWheel = Gn((function() {
                var t4 = n2._wheelDeltaX, e2 = n2._wheelDeltaY;
                n2._wheelDeltaX = 0, n2._wheelDeltaY = 0, n2._handler.onWheel(t4, e2);
              })), this.handleTouchStart = function(t4) {
                var e2;
                if ("1" !== (null == (e2 = t4.target.dataset) ? void 0 : e2.scrollable)) {
                  t4.preventDefault();
                  var o2 = t4.touches[0];
                  n2._touchId = o2.identifier, n2._startX = o2.pageX, n2._startY = o2.pageY, n2._historyX = [0], n2._historyY = [0], n2._historyTime = [Date.now()], n2._handler.onTouchStart();
                }
              }, this.handleTouchMove = function(t4) {
                var e2;
                if ("1" !== (null == (e2 = t4.target.dataset) ? void 0 : e2.scrollable)) {
                  t4.preventDefault();
                  var o2 = n2._getTouchDelta(t4);
                  null !== o2 && (n2._historyX.push(o2.x), n2._historyY.push(o2.y), n2._historyTime.push(Date.now()), n2._onTouchMove());
                }
              }, this.handleTouchEnd = function(t4) {
                var e2;
                if ("1" !== (null == (e2 = t4.target.dataset) ? void 0 : e2.scrollable)) {
                  t4.preventDefault();
                  var o2 = n2._getTouchDelta(t4);
                  if (null !== o2) {
                    for (var r2 = 0, i3 = 0, a2 = Date.now(), c3 = o2.y, u2 = o2.x, s2 = n2._historyTime, l2 = s2.length - 1; l2 > 0; l2 -= 1) {
                      var f2 = a2 - s2[l2];
                      if (f2 > 30) {
                        r2 = 1e3 * (u2 - n2._historyX[l2]) / f2, i3 = 1e3 * (c3 - n2._historyY[l2]) / f2;
                        break;
                      }
                    }
                    n2._touchId = null, n2._handler.onTouchEnd(o2.x, o2.y, r2, i3);
                  }
                }
              }, this.handleTouchCancel = function(t4) {
                var e2;
                "1" !== (null == (e2 = t4.target.dataset) ? void 0 : e2.scrollable) && (t4.preventDefault(), null !== n2._getTouchDelta(t4) && (n2._touchId = null, n2._handler.onTouchCancel()));
              }, this.handleWheel = function(t4) {
                var e2;
                "1" !== (null == (e2 = t4.target.dataset) ? void 0 : e2.scrollable) && (t4.preventDefault(), n2._wheelDeltaX += t4.deltaX, n2._wheelDeltaY += t4.deltaY, n2._onWheel.trigger());
              };
            }
            return t2.prototype._getTouchDelta = function(t3) {
              if (null === this._touchId) return null;
              for (var n2, e2 = An(t3.changedTouches); !(n2 = e2()).done; ) {
                var o2 = n2.value;
                if (o2.identifier === this._touchId) return { x: o2.pageX - this._startX, y: o2.pageY - this._startY };
              }
              return null;
            }, t2;
          })(), Vn = __webpack_require__(1142), Wn = {};
          Vn.Z && Vn.Z.locals && (Wn.locals = Vn.Z.locals);
          var Kn, Hn = 0, Fn = {};
          Fn.styleTagTransform = b(), Fn.setAttributes = h(), Fn.insert = v().bind(null, "head"), Fn.domAPI = f(), Fn.insertStyleElement = m2(), Wn.use = function(t2) {
            return Fn.options = t2 || {}, Hn++ || (Kn = s()(Vn.Z, Fn)), Wn;
          }, Wn.unuse = function() {
            Hn > 0 && !--Hn && (Kn(), Kn = null);
          };
          var Zn = Wn, qn = function() {
            var t2 = [], n2 = [], e2 = 0, o2 = 0, r2 = 0, i3 = 0, a2 = 0;
            return function(c3, u2, s2) {
              if (r2 === c3 && i3 === u2 && a2 === s2) return t2;
              var l2 = n2.length, f2 = u2 <= o2 ? Math.max(0, Math.min(u2, Math.max(e2, Math.min(o2 - 1, s2 - l2)))) : u2, d2 = e2 <= s2 ? Math.max(s2, Math.min(c3, Math.max(e2 + 1, Math.min(o2, f2 + l2)))) : s2;
              if (0 === l2 || d2 - f2 < l2) {
                for (var v2 = t2.length = n2.length = s2 - u2, p2 = 0; p2 < v2; p2 += 1) n2[p2] = p2, t2[p2] = { key: p2, index: p2 + u2, show: true };
                return e2 = u2, o2 = s2, r2 = c3, i3 = u2, a2 = s2, t2;
              }
              var h2 = 0, g2 = 0, m3 = 0, _2 = 0;
              o2 < f2 || d2 < e2 ? (m3 = f2, _2 = f2 + l2) : e2 < f2 ? (g2 = f2 - e2, m3 = f2, _2 = f2 + l2) : d2 < o2 ? (g2 = l2 - (o2 - d2), m3 = d2 - l2, _2 = d2) : f2 <= e2 && o2 <= d2 && (m3 = e2, _2 = o2);
              for (var b2 = f2; b2 < u2; b2 += 1, h2 += 1) {
                var y2 = n2[(g2 + h2) % l2], w2 = t2[b2 - f2];
                w2.key = y2, w2.index = b2, w2.show = false;
              }
              for (var E2 = u2, L2 = 0; E2 < s2; E2 += 1) {
                var T2 = void 0;
                m3 <= E2 && E2 < _2 ? (T2 = n2[(g2 + h2) % l2], h2 += 1) : (T2 = l2 + L2, L2 += 1);
                var x2 = E2 - f2;
                if (x2 < t2.length) {
                  var C2 = t2[x2];
                  C2.key = T2, C2.index = E2, C2.show = true;
                } else t2.push({ key: T2, index: E2, show: true });
              }
              for (var O2 = s2; O2 < d2; O2 += 1, h2 += 1) {
                var I2 = n2[(g2 + h2) % l2], D2 = t2[O2 - f2];
                D2.key = I2, D2.index = O2, D2.show = false;
              }
              for (var $2 = 0; $2 < t2.length; $2 += 1) n2[$2] = t2[$2].key;
              return t2.sort((function(t3, n3) {
                return t3.key - n3.key;
              })), e2 = f2, o2 = d2, r2 = c3, i3 = u2, a2 = s2, t2;
            };
          }, Xn = a.lig.Map, zn = function(t2) {
            return {};
          }, Yn = function(t2) {
            return {};
          }, Jn = function(t2) {
            return {};
          }, Qn = function(t2) {
            return {};
          };
          function te(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[53] = n2[e2], o2[55] = e2, o2;
          }
          var ne = function(t2) {
            return { item: 1025 & t2[0] };
          }, ee = function(t2) {
            return { item: t2[0][t2[53].index] };
          }, oe = function(t2) {
            return {};
          }, re = function(t2) {
            return {};
          };
          function ie(t2) {
            var n2, e2, o2 = t2[24].header, r2 = (0, a.nuO)(o2, t2, t2[31], re);
            return { c: function() {
              n2 = (0, a.bGB)("div"), r2 && r2.c(), (0, a.Ljt)(n2, "class", "vc-scroller-header");
            }, m: function(o3, i3) {
              (0, a.$Tr)(o3, n2, i3), r2 && r2.m(n2, null), t2[25](n2), e2 = true;
            }, p: function(t3, n3) {
              r2 && r2.p && (!e2 || 1 & n3[1]) && (0, a.kmG)(r2, o2, t3, t3[31], e2 ? (0, a.u2N)(o2, t3[31], n3, oe) : (0, a.VOJ)(t3[31]), re);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(r2, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(r2, t3), e2 = false;
            }, d: function(e3) {
              e3 && (0, a.ogt)(n2), r2 && r2.d(e3), t2[25](null);
            } };
          }
          function ae(t2) {
            var n2, e2 = t2[24].empty, o2 = (0, a.nuO)(e2, t2, t2[31], Qn);
            return { c: function() {
              o2 && o2.c();
            }, m: function(t3, e3) {
              o2 && o2.m(t3, e3), n2 = true;
            }, p: function(t3, r2) {
              o2 && o2.p && (!n2 || 1 & r2[1]) && (0, a.kmG)(o2, e2, t3, t3[31], n2 ? (0, a.u2N)(e2, t3[31], r2, Jn) : (0, a.VOJ)(t3[31]), Qn);
            }, i: function(t3) {
              n2 || ((0, a.Ui)(o2, t3), n2 = true);
            }, o: function(t3) {
              (0, a.etI)(o2, t3), n2 = false;
            }, d: function(t3) {
              o2 && o2.d(t3);
            } };
          }
          function ce(t2) {
            for (var n2, e2, o2 = [], r2 = new Xn(), i3 = t2[10], c3 = function(t3) {
              return t3[53].key;
            }, u2 = 0; u2 < i3.length; u2 += 1) {
              var s2 = te(t2, i3, u2), l2 = c3(s2);
              r2.set(l2, o2[u2] = se(l2, s2));
            }
            return { c: function() {
              for (var t3 = 0; t3 < o2.length; t3 += 1) o2[t3].c();
              n2 = (0, a.cSb)();
            }, m: function(t3, r3) {
              for (var i4 = 0; i4 < o2.length; i4 += 1) o2[i4].m(t3, r3);
              (0, a.$Tr)(t3, n2, r3), e2 = true;
            }, p: function(t3, e3) {
              17921 & e3[0] | 1 & e3[1] && (i3 = t3[10], (0, a.dvw)(), o2 = (0, a.GQg)(o2, e3, c3, 1, t3, i3, r2, n2.parentNode, a.cly, se, n2, te), (0, a.gbL)());
            }, i: function(t3) {
              if (!e2) {
                for (var n3 = 0; n3 < i3.length; n3 += 1) (0, a.Ui)(o2[n3]);
                e2 = true;
              }
            }, o: function(t3) {
              for (var n3 = 0; n3 < o2.length; n3 += 1) (0, a.etI)(o2[n3]);
              e2 = false;
            }, d: function(t3) {
              for (var e3 = 0; e3 < o2.length; e3 += 1) o2[e3].d(t3);
              t3 && (0, a.ogt)(n2);
            } };
          }
          function ue(t2) {
            var n2, e2, o2 = t2[24].item, r2 = (0, a.nuO)(o2, t2, t2[31], ee), i3 = r2 || /* @__PURE__ */ (function(t3) {
              var n3;
              return { c: function() {
                n3 = (0, a.fLW)("Missing template");
              }, m: function(t4, e3) {
                (0, a.$Tr)(t4, n3, e3);
              }, d: function(t4) {
                t4 && (0, a.ogt)(n3);
              } };
            })();
            return { c: function() {
              i3 && i3.c(), n2 = (0, a.DhX)();
            }, m: function(t3, o3) {
              i3 && i3.m(t3, o3), (0, a.$Tr)(t3, n2, o3), e2 = true;
            }, p: function(t3, n3) {
              r2 && r2.p && (!e2 || 1025 & n3[0] | 1 & n3[1]) && (0, a.kmG)(r2, o2, t3, t3[31], e2 ? (0, a.u2N)(o2, t3[31], n3, ne) : (0, a.VOJ)(t3[31]), ee);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(i3, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(i3, t3), e2 = false;
            }, d: function(t3) {
              i3 && i3.d(t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function se(t2, n2) {
            var e2, o2, r2;
            function i3() {
              for (var t3, e3 = arguments.length, o3 = new Array(e3), r3 = 0; r3 < e3; r3++) o3[r3] = arguments[r3];
              return (t3 = n2)[26].apply(t3, [n2[53]].concat(o3));
            }
            return o2 = new Dn({ props: { show: n2[53].show, top: n2[9][n2[53].index], onResize: i3, $$slots: { default: [ue] }, $$scope: { ctx: n2 } } }), { key: t2, first: null, c: function() {
              e2 = (0, a.cSb)(), (0, a.YCL)(o2.$$.fragment), this.first = e2;
            }, m: function(t3, n3) {
              (0, a.$Tr)(t3, e2, n3), (0, a.yef)(o2, t3, n3), r2 = true;
            }, p: function(t3, e3) {
              n2 = t3;
              var r3 = {};
              1024 & e3[0] && (r3.show = n2[53].show), 1536 & e3[0] && (r3.top = n2[9][n2[53].index]), 1024 & e3[0] && (r3.onResize = i3), 1025 & e3[0] | 1 & e3[1] && (r3.$$scope = { dirty: e3, ctx: n2 }), o2.$set(r3);
            }, i: function(t3) {
              r2 || ((0, a.Ui)(o2.$$.fragment, t3), r2 = true);
            }, o: function(t3) {
              (0, a.etI)(o2.$$.fragment, t3), r2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(e2), (0, a.vpE)(o2, t3);
            } };
          }
          function le(t2) {
            var n2, e2, o2 = t2[24].footer, r2 = (0, a.nuO)(o2, t2, t2[31], Yn);
            return { c: function() {
              n2 = (0, a.bGB)("div"), r2 && r2.c(), (0, a.Ljt)(n2, "class", "vc-scroller-footer");
            }, m: function(o3, i3) {
              (0, a.$Tr)(o3, n2, i3), r2 && r2.m(n2, null), t2[28](n2), e2 = true;
            }, p: function(t3, n3) {
              r2 && r2.p && (!e2 || 1 & n3[1]) && (0, a.kmG)(r2, o2, t3, t3[31], e2 ? (0, a.u2N)(o2, t3[31], n3, zn) : (0, a.VOJ)(t3[31]), Yn);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(r2, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(r2, t3), e2 = false;
            }, d: function(e3) {
              e3 && (0, a.ogt)(n2), r2 && r2.d(e3), t2[28](null);
            } };
          }
          function fe(t2) {
            var n2, e2, o2 = t2[7] + "%", r2 = t2[8] + "%";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("div"), (0, a.Ljt)(e2, "class", "vc-scroller-scrollbar-thumb"), (0, a.czc)(e2, "height", o2, false), (0, a.czc)(e2, "top", r2, false), (0, a.Ljt)(n2, "class", "vc-scroller-scrollbar-track"), (0, a.czc)(n2, "display", t2[7] < 100 ? "block" : "none", false);
            }, m: function(t3, o3) {
              (0, a.$Tr)(t3, n2, o3), (0, a.R3I)(n2, e2);
            }, p: function(t3, i3) {
              128 & i3[0] && o2 !== (o2 = t3[7] + "%") && (0, a.czc)(e2, "height", o2, false), 256 & i3[0] && r2 !== (r2 = t3[8] + "%") && (0, a.czc)(e2, "top", r2, false), 128 & i3[0] && (0, a.czc)(n2, "display", t3[7] < 100 ? "block" : "none", false);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function de(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2, l2, f2, d2, v2 = t2[15].header && ie(t2), p2 = [ce, ae], h2 = [];
            function g2(t3, n3) {
              return t3[0].length ? 0 : 1;
            }
            i3 = g2(t2), c3 = h2[i3] = p2[i3](t2);
            var m3 = t2[15].footer && le(t2), _2 = t2[1] && fe(t2);
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("div"), v2 && v2.c(), o2 = (0, a.DhX)(), r2 = (0, a.bGB)("div"), c3.c(), u2 = (0, a.DhX)(), m3 && m3.c(), s2 = (0, a.DhX)(), _2 && _2.c(), (0, a.Ljt)(r2, "class", "vc-scroller-items"), (0, a.Ljt)(e2, "class", "vc-scroller-contents"), (0, a.Ljt)(n2, "class", "vc-scroller-viewport"), (0, a.VHj)(n2, "static", !t2[13]);
            }, m: function(c4, p3) {
              (0, a.$Tr)(c4, n2, p3), (0, a.R3I)(n2, e2), v2 && v2.m(e2, null), (0, a.R3I)(e2, o2), (0, a.R3I)(e2, r2), h2[i3].m(r2, null), t2[27](r2), (0, a.R3I)(e2, u2), m3 && m3.m(e2, null), t2[29](e2), (0, a.R3I)(n2, s2), _2 && _2.m(n2, null), t2[30](n2), l2 = true, f2 || (d2 = [(0, a.oLt)(n2, "touchstart", (function() {
                (0, a.sBU)(t2[13] ? t2[11].handleTouchStart : t2[12]) && (t2[13] ? t2[11].handleTouchStart : t2[12]).apply(this, arguments);
              })), (0, a.oLt)(n2, "touchmove", (function() {
                (0, a.sBU)(t2[13] ? t2[11].handleTouchMove : t2[12]) && (t2[13] ? t2[11].handleTouchMove : t2[12]).apply(this, arguments);
              })), (0, a.oLt)(n2, "touchend", (function() {
                (0, a.sBU)(t2[13] ? t2[11].handleTouchEnd : t2[12]) && (t2[13] ? t2[11].handleTouchEnd : t2[12]).apply(this, arguments);
              })), (0, a.oLt)(n2, "touchcancel", (function() {
                (0, a.sBU)(t2[13] ? t2[11].handleTouchCancel : t2[12]) && (t2[13] ? t2[11].handleTouchCancel : t2[12]).apply(this, arguments);
              })), (0, a.oLt)(n2, "wheel", (function() {
                (0, a.sBU)(t2[13] ? t2[11].handleWheel : t2[12]) && (t2[13] ? t2[11].handleWheel : t2[12]).apply(this, arguments);
              }))], f2 = true);
            }, p: function(u3, s3) {
              (t2 = u3)[15].header ? v2 ? (v2.p(t2, s3), 32768 & s3[0] && (0, a.Ui)(v2, 1)) : ((v2 = ie(t2)).c(), (0, a.Ui)(v2, 1), v2.m(e2, o2)) : v2 && ((0, a.dvw)(), (0, a.etI)(v2, 1, 1, (function() {
                v2 = null;
              })), (0, a.gbL)());
              var l3 = i3;
              (i3 = g2(t2)) === l3 ? h2[i3].p(t2, s3) : ((0, a.dvw)(), (0, a.etI)(h2[l3], 1, 1, (function() {
                h2[l3] = null;
              })), (0, a.gbL)(), (c3 = h2[i3]) ? c3.p(t2, s3) : (c3 = h2[i3] = p2[i3](t2)).c(), (0, a.Ui)(c3, 1), c3.m(r2, null)), t2[15].footer ? m3 ? (m3.p(t2, s3), 32768 & s3[0] && (0, a.Ui)(m3, 1)) : ((m3 = le(t2)).c(), (0, a.Ui)(m3, 1), m3.m(e2, null)) : m3 && ((0, a.dvw)(), (0, a.etI)(m3, 1, 1, (function() {
                m3 = null;
              })), (0, a.gbL)()), t2[1] ? _2 ? _2.p(t2, s3) : ((_2 = fe(t2)).c(), _2.m(n2, null)) : _2 && (_2.d(1), _2 = null);
            }, i: function(t3) {
              l2 || ((0, a.Ui)(v2), (0, a.Ui)(c3), (0, a.Ui)(m3), l2 = true);
            }, o: function(t3) {
              (0, a.etI)(v2), (0, a.etI)(c3), (0, a.etI)(m3), l2 = false;
            }, d: function(e3) {
              e3 && (0, a.ogt)(n2), v2 && v2.d(), h2[i3].d(), t2[27](null), m3 && m3.d(), t2[29](null), _2 && _2.d(), t2[30](null), f2 = false, (0, a.j7q)(d2);
            } };
          }
          function ve(t2, n2, e2) {
            var o2, r2, i3, u2, s2, l2, f2, d2 = n2.$$slots, v2 = void 0 === d2 ? {} : d2, p2 = n2.$$scope, h2 = (0, a.XGm)(v2), g2 = this && this.__awaiter || function(t3, n3, e3, o3) {
              return new (e3 || (e3 = Promise))((function(r3, i4) {
                function a2(t4) {
                  try {
                    u3(o3.next(t4));
                  } catch (t5) {
                    i4(t5);
                  }
                }
                function c3(t4) {
                  try {
                    u3(o3.throw(t4));
                  } catch (t5) {
                    i4(t5);
                  }
                }
                function u3(t4) {
                  var n4;
                  t4.done ? r3(t4.value) : (n4 = t4.value, n4 instanceof e3 ? n4 : new e3((function(t5) {
                    t5(n4);
                  }))).then(a2, c3);
                }
                u3((o3 = o3.apply(t3, n3 || [])).next());
              }));
            }, m3 = n2.items, _2 = n2.itemKey, b2 = void 0 === _2 ? void 0 : _2, y2 = n2.itemHeight, w2 = void 0 === y2 ? void 0 : y2, E2 = n2.buffer, L2 = void 0 === E2 ? 200 : E2, T2 = n2.stickToBottom, x2 = void 0 !== T2 && T2, C2 = n2.scrollbar, O2 = void 0 !== C2 && C2, I2 = n2.start, D2 = void 0 === I2 ? 0 : I2, $2 = n2.end, R2 = void 0 === $2 ? 0 : $2, k2 = 0, P3 = 0, M2 = 0, S2 = 0, j2 = 100, B2 = 0, A2 = [], U2 = [], G2 = [], N2 = qn(), V2 = function() {
              return Math.max(0, S2 + k2 + P3 - M2);
            }, W2 = true, K2 = false, H2 = [], F2 = false, Z2 = false, q2 = Tn(), X2 = function(t3, n3) {
              var e3;
              (0, c2.H3)((function() {
                var o3 = t3();
                if (o3) {
                  n3(o3.getBoundingClientRect().height), e3 && e3.disconnect();
                  var r3 = xn();
                  (e3 = new r3((function(t4) {
                    var e4 = t4[0];
                    n3(e4.contentRect.height);
                  }))).observe(o3);
                } else n3(0), e3 && (e3.disconnect(), e3 = null);
              })), (0, c2.ev)((function() {
                e3 && (e3.disconnect(), e3 = null);
              }));
            }, z2 = function() {
              var t3 = l2.getPosition(), n3 = 100 / (S2 + k2 + P3);
              e2(8, B2 = t3 * n3), e2(7, j2 = M2 * n3);
            }, Y2 = function(t3) {
              var n3 = V2();
              (t3 || l2.getPosition() > n3) && l2.updatePosition(n3);
            }, J2 = function(t3) {
              !(function(t4, n3, o3) {
                for (var r3 = /* @__PURE__ */ new Map(), i4 = 0; i4 < H2.length; i4 += 1) {
                  var a2 = H2[i4], c3 = void 0 === b2 ? a2 : a2[b2];
                  r3.set(c3, A2[i4]);
                }
                e2(9, U2.length = A2.length = t4.length, U2);
                for (var u3 = 0, f3 = 0; f3 < t4.length; f3 += 1) {
                  var d3 = t4[f3], v3 = void 0 === b2 ? d3 : d3[b2];
                  r3.has(v3) ? A2[f3] = r3.get(v3) : A2[f3] = o3, e2(9, U2[f3] = u3, U2), u3 += A2[f3];
                }
                S2 = Math.max(u3, n3 - k2 - P3), H2 = t4, q2 ? (Q2(t4, l2.getPosition(), n3), e2(6, s2.style.height = S2 + "px", s2), Y2(W2 && x2), z2()) : Q2(t4, 0, 9e6);
              })(t3, M2, w2);
            };
            function Q2(t3, n3, o3) {
              for (var r3 = 0, i4 = 0; r3 < t3.length && i4 + A2[r3] < n3 - L2; ) i4 += A2[r3], r3 += 1;
              for (e2(16, D2 = r3); r3 < t3.length && o3 && i4 < n3 + o3 + L2; ) i4 += A2[r3], r3 += 1;
              e2(17, R2 = r3), e2(10, G2 = N2(t3.length, D2, R2));
            }
            var tt2 = function(t3, n3) {
              return g2(void 0, void 0, void 0, En().mark((function o3() {
                var r3, i4, a2, c3;
                return En().wrap((function(o4) {
                  for (; ; ) switch (o4.prev = o4.next) {
                    case 0:
                      if (A2[t3] !== n3 && 0 !== M2) {
                        o4.next = 2;
                        break;
                      }
                      return o4.abrupt("return");
                    case 2:
                      for (r3 = A2[t3], A2[t3] = n3, i4 = m3.length, a2 = t3; a2 < i4 - 1; a2 += 1) e2(9, U2[a2 + 1] = U2[a2] + A2[a2], U2);
                      return S2 = Math.max(U2[i4 - 1] + A2[i4 - 1], M2 - k2 - P3), c3 = l2.getPosition(), K2 = true, U2[t3] + r3 < c3 ? l2.updatePosition(c3 + n3 - r3) : Y2(W2 && x2), o4.next = 12, new Promise((function(t4) {
                        return setTimeout(t4, 0);
                      }));
                    case 12:
                      Q2(m3, l2.getPosition(), M2), e2(6, s2.style.height = S2 + "px", s2), z2();
                    case 15:
                    case "end":
                      return o4.stop();
                  }
                }), o3);
              })));
            };
            (0, c2.H3)((function() {
              e2(23, F2 = true), Zn.use();
            })), (0, c2.ev)((function() {
              Zn.unuse();
            })), q2 && (q2 && (l2 = l2 || new Bn(V2, (function(t3) {
              return g2(void 0, void 0, void 0, En().mark((function n3() {
                var o3;
                return En().wrap((function(n4) {
                  for (; ; ) switch (n4.prev = n4.next) {
                    case 0:
                      if (o3 = V2(), W2 = Math.abs(t3 - o3) <= 1, e2(5, u2.style.transform = "translateY(" + -t3 + "px) translateZ(0)", u2), z2(), !K2) {
                        n4.next = 8;
                        break;
                      }
                      K2 = false, n4.next = 11;
                      break;
                    case 8:
                      return n4.next = 10, new Promise((function(t4) {
                        return setTimeout(t4, 0);
                      }));
                    case 10:
                      Q2(m3, t3, M2);
                    case 11:
                    case "end":
                      return n4.stop();
                  }
                }), n3);
              })));
            })), e2(11, f2 = f2 || new Nn(l2))), !Z2 && q2 && (X2((function() {
              return i3;
            }), (function(t3) {
              return g2(void 0, void 0, void 0, En().mark((function n3() {
                var o3, r3;
                return En().wrap((function(n4) {
                  for (; ; ) switch (n4.prev = n4.next) {
                    case 0:
                      if (M2 !== t3) {
                        n4.next = 2;
                        break;
                      }
                      return n4.abrupt("return");
                    case 2:
                      for (M2 = t3, o3 = 0, r3 = 0; r3 < m3.length; r3 += 1) o3 += A2[r3];
                      return S2 = Math.max(o3, M2 - P3), e2(6, s2.style.height = S2 + "px", s2), n4.next = 9, new Promise((function(t4) {
                        return setTimeout(t4, 0);
                      }));
                    case 9:
                      J2(m3), Q2(m3, l2.getPosition(), M2), 0 !== M2 && Y2(W2 && x2), z2();
                    case 13:
                    case "end":
                      return n4.stop();
                  }
                }), n3);
              })));
            })), X2((function() {
              return r2;
            }), (function(t3) {
              if (P3 !== t3) {
                P3 = t3;
                for (var n3 = 0, o3 = 0; o3 < m3.length; o3 += 1) n3 += A2[o3];
                S2 = Math.max(n3, M2 - k2 - P3), e2(6, s2.style.height = S2 + "px", s2), 0 !== M2 && Y2(W2 && x2), z2();
              }
            })), X2((function() {
              return o2;
            }), (function(t3) {
              k2 !== t3 && (k2 = t3, J2(m3), z2());
            }))));
            var nt2 = { scrollTo: function(t3) {
              if (q2) {
                var n3 = U2[Math.max(0, Math.min(m3.length - 1, t3))], e3 = Math.min(V2(), n3), o3 = Math.min(Math.floor(500 * Math.abs(l2.getPosition() - e3) / 2e3), 500);
                l2.scrollTo(e3, o3);
              }
            } };
            return t2.$$set = function(t3) {
              "items" in t3 && e2(0, m3 = t3.items), "itemKey" in t3 && e2(18, b2 = t3.itemKey), "itemHeight" in t3 && e2(19, w2 = t3.itemHeight), "buffer" in t3 && e2(20, L2 = t3.buffer), "stickToBottom" in t3 && e2(21, x2 = t3.stickToBottom), "scrollbar" in t3 && e2(1, O2 = t3.scrollbar), "start" in t3 && e2(16, D2 = t3.start), "end" in t3 && e2(17, R2 = t3.end), "$$scope" in t3 && e2(31, p2 = t3.$$scope);
            }, t2.$$.update = function() {
              8388609 & t2.$$.dirty[0] && F2 && (q2 || e2(4, i3.parentElement.style.height = "auto", i3), J2(m3), Z2 = true);
            }, [m3, O2, o2, r2, i3, u2, s2, j2, B2, U2, G2, f2, function() {
            }, q2, tt2, h2, D2, R2, b2, w2, L2, x2, nt2, F2, v2, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                e2(2, o2 = t3);
              }));
            }, function(t3, n3) {
              return tt2(t3.index, n3);
            }, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                e2(6, s2 = t3);
              }));
            }, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                e2(3, r2 = t3);
              }));
            }, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                e2(5, u2 = t3);
              }));
            }, function(t3) {
              a.VnY[t3 ? "unshift" : "push"]((function() {
                e2(4, i3 = t3), e2(23, F2), e2(13, q2), e2(0, m3);
              }));
            }, p2];
          }
          var pe = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, ve, de, a.N8, { items: 0, itemKey: 18, itemHeight: 19, buffer: 20, stickToBottom: 21, scrollbar: 1, start: 16, end: 17, handler: 22 }, null, [-1, -1]), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "items", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ items: t2 }), (0, a.yl1)();
            } }, { key: "itemKey", get: function() {
              return this.$$.ctx[18];
            }, set: function(t2) {
              this.$$set({ itemKey: t2 }), (0, a.yl1)();
            } }, { key: "itemHeight", get: function() {
              return this.$$.ctx[19];
            }, set: function(t2) {
              this.$$set({ itemHeight: t2 }), (0, a.yl1)();
            } }, { key: "buffer", get: function() {
              return this.$$.ctx[20];
            }, set: function(t2) {
              this.$$set({ buffer: t2 }), (0, a.yl1)();
            } }, { key: "stickToBottom", get: function() {
              return this.$$.ctx[21];
            }, set: function(t2) {
              this.$$set({ stickToBottom: t2 }), (0, a.yl1)();
            } }, { key: "scrollbar", get: function() {
              return this.$$.ctx[1];
            }, set: function(t2) {
              this.$$set({ scrollbar: t2 }), (0, a.yl1)();
            } }, { key: "start", get: function() {
              return this.$$.ctx[16];
            }, set: function(t2) {
              this.$$set({ start: t2 }), (0, a.yl1)();
            } }, { key: "end", get: function() {
              return this.$$.ctx[17];
            }, set: function(t2) {
              this.$$set({ end: t2 }), (0, a.yl1)();
            } }, { key: "handler", get: function() {
              return this.$$.ctx[22];
            } }]), e2;
          })(a.f_C), he = pe;
          function ge(t2) {
            var n2;
            return { c: function() {
              (n2 = (0, a.bGB)("div")).textContent = "Empty", (0, a.Ljt)(n2, "slot", "empty"), (0, a.Ljt)(n2, "class", "vc-plugin-empty");
            }, m: function(t3, e2) {
              (0, a.$Tr)(t3, n2, e2);
            }, p: a.ZTd, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function me(t2) {
            var n2, e2;
            return (n2 = new vn({ props: { slot: "item", log: t2[16], showTimestamps: t2[1], groupHeader: t2[16].groupHeader } })).$on("groupCollapsed", t2[6]), { c: function() {
              (0, a.YCL)(n2.$$.fragment);
            }, m: function(t3, o2) {
              (0, a.yef)(n2, t3, o2), e2 = true;
            }, p: function(t3, e3) {
              var o2 = {};
              65536 & e3 && (o2.log = t3[16]), 2 & e3 && (o2.showTimestamps = t3[1]), 65536 & e3 && (o2.groupHeader = t3[16].groupHeader), n2.$set(o2);
            }, i: function(t3) {
              e2 || ((0, a.Ui)(n2.$$.fragment, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), e2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3);
            } };
          }
          function _e(t2) {
            var n2, e2;
            return (n2 = new pn.Z({})).$on("filterText", t2[5]), { c: function() {
              (0, a.YCL)(n2.$$.fragment);
            }, m: function(t3, o2) {
              (0, a.yef)(n2, t3, o2), e2 = true;
            }, p: a.ZTd, i: function(t3) {
              e2 || ((0, a.Ui)(n2.$$.fragment, t3), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), e2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3);
            } };
          }
          function be(t2) {
            var n2, e2, o2 = t2[0] && _e(t2);
            return { c: function() {
              o2 && o2.c(), n2 = (0, a.cSb)();
            }, m: function(t3, r2) {
              o2 && o2.m(t3, r2), (0, a.$Tr)(t3, n2, r2), e2 = true;
            }, p: function(t3, e3) {
              t3[0] ? o2 ? (o2.p(t3, e3), 1 & e3 && (0, a.Ui)(o2, 1)) : ((o2 = _e(t3)).c(), (0, a.Ui)(o2, 1), o2.m(n2.parentNode, n2)) : o2 && ((0, a.dvw)(), (0, a.etI)(o2, 1, 1, (function() {
                o2 = null;
              })), (0, a.gbL)());
            }, i: function(t3) {
              e2 || ((0, a.Ui)(o2), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(o2), e2 = false;
            }, d: function(t3) {
              o2 && o2.d(t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function ye(t2) {
            var n2, e2, o2, r2;
            function i3(n3) {
              t2[15](n3);
            }
            var c3 = { items: t2[4], itemKey: "_id", itemHeight: 30, buffer: 100, stickToBottom: true, scrollbar: true, $$slots: { footer: [be], item: [me, function(t3) {
              return { 16: t3.item };
            }, function(t3) {
              return t3.item ? 65536 : 0;
            }], empty: [ge] }, $$scope: { ctx: t2 } };
            return void 0 !== t2[3] && (c3.handler = t2[3]), e2 = new he({ props: c3 }), a.VnY.push((function() {
              return (0, a.akz)(e2, "handler", i3);
            })), { c: function() {
              n2 = (0, a.bGB)("div"), (0, a.YCL)(e2.$$.fragment), (0, a.Ljt)(n2, "class", "vc-plugin-content"), (0, a.VHj)(n2, "vc-logs-has-cmd", t2[0]);
            }, m: function(t3, o3) {
              (0, a.$Tr)(t3, n2, o3), (0, a.yef)(e2, n2, null), r2 = true;
            }, p: function(t3, r3) {
              var i4 = r3[0], c4 = {};
              16 & i4 && (c4.items = t3[4]), 196611 & i4 && (c4.$$scope = { dirty: i4, ctx: t3 }), !o2 && 8 & i4 && (o2 = true, c4.handler = t3[3], (0, a.hjT)((function() {
                return o2 = false;
              }))), e2.$set(c4), 1 & i4 && (0, a.VHj)(n2, "vc-logs-has-cmd", t3[0]);
            }, i: function(t3) {
              r2 || ((0, a.Ui)(e2.$$.fragment, t3), r2 = true);
            }, o: function(t3) {
              (0, a.etI)(e2.$$.fragment, t3), r2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(e2);
            } };
          }
          function we(t2, n2, e2) {
            var o2, r2 = a.ZTd;
            t2.$$.on_destroy.push((function() {
              return r2();
            }));
            var i3, u2, s2 = n2.pluginId, l2 = void 0 === s2 ? "default" : s2, f2 = n2.showCmd, d2 = void 0 !== f2 && f2, v2 = n2.filterType, p2 = void 0 === v2 ? "all" : v2, h2 = n2.showTimestamps, g2 = void 0 !== h2 && h2, m3 = false, _2 = "", b2 = [];
            (0, c2.H3)((function() {
              yn.use();
            })), (0, c2.ev)((function() {
              yn.unuse();
            }));
            return t2.$$set = function(t3) {
              "pluginId" in t3 && e2(7, l2 = t3.pluginId), "showCmd" in t3 && e2(0, d2 = t3.showCmd), "filterType" in t3 && e2(8, p2 = t3.filterType), "showTimestamps" in t3 && e2(1, g2 = t3.showTimestamps);
            }, t2.$$.update = function() {
              29056 & t2.$$.dirty && (m3 || (e2(2, i3 = ct.O.get(l2)), r2(), r2 = (0, a.LdU)(i3, (function(t3) {
                return e2(14, o2 = t3);
              })), e2(12, m3 = true)), e2(4, b2 = o2.logList.filter((function(t3) {
                return ("all" === p2 || p2 === t3.type) && ("" === _2 || (0, at.HX)(t3, _2)) && !t3.groupCollapsed;
              }))));
            }, [d2, g2, i3, u2, b2, function(t3) {
              e2(13, _2 = t3.detail.filterText || "");
            }, function(t3) {
              var n3 = t3.detail.groupLabel, e3 = t3.detail.groupHeader, o3 = t3.detail.isGroupCollapsed;
              i3.update((function(t4) {
                return t4.logList.forEach((function(t5) {
                  t5.groupLabel === n3 && (t5.groupHeader > 0 ? t5.groupHeader = e3 : t5.groupCollapsed = o3);
                })), t4;
              }));
            }, l2, p2, function() {
              u2.scrollTo(0);
            }, function() {
              u2.scrollTo(b2.length - 1);
            }, { fixedHeight: true }, m3, _2, o2, function(t3) {
              e2(3, u2 = t3);
            }];
          }
          var Ee = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, we, ye, a.N8, { pluginId: 7, showCmd: 0, filterType: 8, showTimestamps: 1, scrollToTop: 9, scrollToBottom: 10, options: 11 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "pluginId", get: function() {
              return this.$$.ctx[7];
            }, set: function(t2) {
              this.$$set({ pluginId: t2 }), (0, a.yl1)();
            } }, { key: "showCmd", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ showCmd: t2 }), (0, a.yl1)();
            } }, { key: "filterType", get: function() {
              return this.$$.ctx[8];
            }, set: function(t2) {
              this.$$set({ filterType: t2 }), (0, a.yl1)();
            } }, { key: "showTimestamps", get: function() {
              return this.$$.ctx[1];
            }, set: function(t2) {
              this.$$set({ showTimestamps: t2 }), (0, a.yl1)();
            } }, { key: "scrollToTop", get: function() {
              return this.$$.ctx[9];
            } }, { key: "scrollToBottom", get: function() {
              return this.$$.ctx[10];
            } }, { key: "options", get: function() {
              return this.$$.ctx[11];
            } }]), e2;
          })(a.f_C), Le = Ee, Te = __webpack_require__(5629), xe = (function() {
            function t2(t3) {
              this.model = void 0, this.pluginId = void 0, this.pluginId = t3;
            }
            return t2.prototype.destroy = function() {
              this.model = void 0;
            }, t2;
          })(), Ce = (function(t2) {
            function n2() {
              for (var n3, e3 = arguments.length, o2 = new Array(e3), r2 = 0; r2 < e3; r2++) o2[r2] = arguments[r2];
              return (n3 = t2.call.apply(t2, [this].concat(o2)) || this).model = Te.W.getSingleton(Te.W, "VConsoleLogModel"), n3;
            }
            (0, i2.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.log = function() {
              for (var t3 = arguments.length, n3 = new Array(t3), e3 = 0; e3 < t3; e3++) n3[e3] = arguments[e3];
              this.addLog.apply(this, ["log"].concat(n3));
            }, e2.info = function() {
              for (var t3 = arguments.length, n3 = new Array(t3), e3 = 0; e3 < t3; e3++) n3[e3] = arguments[e3];
              this.addLog.apply(this, ["info"].concat(n3));
            }, e2.debug = function() {
              for (var t3 = arguments.length, n3 = new Array(t3), e3 = 0; e3 < t3; e3++) n3[e3] = arguments[e3];
              this.addLog.apply(this, ["debug"].concat(n3));
            }, e2.warn = function() {
              for (var t3 = arguments.length, n3 = new Array(t3), e3 = 0; e3 < t3; e3++) n3[e3] = arguments[e3];
              this.addLog.apply(this, ["warn"].concat(n3));
            }, e2.error = function() {
              for (var t3 = arguments.length, n3 = new Array(t3), e3 = 0; e3 < t3; e3++) n3[e3] = arguments[e3];
              this.addLog.apply(this, ["error"].concat(n3));
            }, e2.clear = function() {
              this.model && this.model.clearPluginLog(this.pluginId);
            }, e2.addLog = function(t3) {
              if (this.model) {
                for (var n3 = arguments.length, e3 = new Array(n3 > 1 ? n3 - 1 : 0), o2 = 1; o2 < n3; o2++) e3[o2 - 1] = arguments[o2];
                e3.unshift("[" + this.pluginId + "]"), this.model.addLog({ type: t3, origData: e3 }, { noOrig: true });
              }
            }, n2;
          })(xe), Oe = (function(t2) {
            function n2(n3, e3) {
              var o2;
              return (o2 = t2.call(this, n3, e3, Le, { pluginId: n3, filterType: "all" }) || this).model = Te.W.getSingleton(Te.W, "VConsoleLogModel"), o2.isReady = false, o2.isShow = false, o2.isInBottom = true, o2.model.bindPlugin(n3), o2.exporter = new Ce(n3), o2;
            }
            (0, i2.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.onReady = function() {
              var n3, e3;
              t2.prototype.onReady.call(this), this.model.maxLogNumber = Number(null == (n3 = this.vConsole.option.log) ? void 0 : n3.maxLogNumber) || 1e3, this.compInstance.showTimestamps = !(null == (e3 = this.vConsole.option.log) || !e3.showTimestamps);
            }, e2.onRemove = function() {
              t2.prototype.onRemove.call(this), this.model.unbindPlugin(this.id);
            }, e2.onAddTopBar = function(t3) {
              for (var n3 = this, e3 = ["All", "Log", "Info", "Warn", "Error"], o2 = [], r2 = 0; r2 < e3.length; r2++) o2.push({ name: e3[r2], data: { type: e3[r2].toLowerCase() }, actived: 0 === r2, className: "", onClick: function(t4, e4) {
                if (e4.type === n3.compInstance.filterType) return false;
                n3.compInstance.filterType = e4.type;
              } });
              o2[0].className = "vc-actived", t3(o2);
            }, e2.onAddTool = function(t3) {
              var n3 = this;
              t3([{ name: "Clear", global: false, onClick: function(t4) {
                n3.model.clearPluginLog(n3.id), n3.vConsole.triggerEvent("clearLog");
              } }, { name: "Top", global: false, onClick: function(t4) {
                n3.compInstance.scrollToTop();
              } }, { name: "Bottom", global: false, onClick: function(t4) {
                n3.compInstance.scrollToBottom();
              } }]);
            }, e2.onUpdateOption = function() {
              var t3, n3, e3, o2;
              (null == (t3 = this.vConsole.option.log) ? void 0 : t3.maxLogNumber) !== this.model.maxLogNumber && (this.model.maxLogNumber = Number(null == (e3 = this.vConsole.option.log) ? void 0 : e3.maxLogNumber) || 1e3);
              !(null == (n3 = this.vConsole.option.log) || !n3.showTimestamps) !== this.compInstance.showTimestamps && (this.compInstance.showTimestamps = !(null == (o2 = this.vConsole.option.log) || !o2.showTimestamps));
            }, n2;
          })(it), Ie = (function(t2) {
            function e2() {
              for (var n2, e3 = arguments.length, o3 = new Array(e3), r2 = 0; r2 < e3; r2++) o3[r2] = arguments[r2];
              return (n2 = t2.call.apply(t2, [this].concat(o3)) || this).onErrorHandler = void 0, n2.resourceErrorHandler = void 0, n2.rejectionHandler = void 0, n2;
            }
            (0, i2.Z)(e2, t2);
            var o2 = e2.prototype;
            return o2.onReady = function() {
              t2.prototype.onReady.call(this), this.bindErrors(), this.compInstance.showCmd = true;
            }, o2.onRemove = function() {
              t2.prototype.onRemove.call(this), this.unbindErrors();
            }, o2.bindErrors = function() {
              n.FJ(window) && n.mf(window.addEventListener) && (this.catchWindowOnError(), this.catchResourceError(), this.catchUnhandledRejection());
            }, o2.unbindErrors = function() {
              n.FJ(window) && n.mf(window.addEventListener) && (window.removeEventListener("error", this.onErrorHandler), window.removeEventListener("error", this.resourceErrorHandler), window.removeEventListener("unhandledrejection", this.rejectionHandler));
            }, o2.catchWindowOnError = function() {
              var t3 = this;
              this.onErrorHandler = this.onErrorHandler ? this.onErrorHandler : function(n2) {
                var e3 = n2.message;
                n2.filename && (e3 += "\\n\\t" + n2.filename.replace(location.origin, ""), (n2.lineno || n2.colno) && (e3 += ":" + n2.lineno + ":" + n2.colno)), e3 += "\\n" + (!!n2.error && !!n2.error.stack && n2.error.stack.toString() || ""), t3.model.addLog({ type: "error", origData: [e3] }, { noOrig: true });
              }, window.removeEventListener("error", this.onErrorHandler), window.addEventListener("error", this.onErrorHandler);
            }, o2.catchResourceError = function() {
              var t3 = this;
              this.resourceErrorHandler = this.resourceErrorHandler ? this.resourceErrorHandler : function(n2) {
                var e3 = n2.target;
                if (["link", "video", "script", "img", "audio"].indexOf(e3.localName) > -1) {
                  var o3 = e3.href || e3.src || e3.currentSrc;
                  t3.model.addLog({ type: "error", origData: ["GET <" + e3.localName + "> error: " + o3] }, { noOrig: true });
                }
              }, window.removeEventListener("error", this.resourceErrorHandler), window.addEventListener("error", this.resourceErrorHandler, true);
            }, o2.catchUnhandledRejection = function() {
              var t3 = this;
              this.rejectionHandler = this.rejectionHandler ? this.rejectionHandler : function(n2) {
                var e3 = n2 && n2.reason, o3 = "Uncaught (in promise) ", r2 = [o3, e3];
                e3 instanceof Error && (r2 = [o3, { name: e3.name, message: e3.message, stack: e3.stack }]), t3.model.addLog({ type: "error", origData: r2 }, { noOrig: true });
              }, window.removeEventListener("unhandledrejection", this.rejectionHandler), window.addEventListener("unhandledrejection", this.rejectionHandler);
            }, e2;
          })(Oe), De = (function(t2) {
            function n2() {
              return t2.apply(this, arguments) || this;
            }
            (0, i2.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.onReady = function() {
              t2.prototype.onReady.call(this), this.printSystemInfo();
            }, e2.printSystemInfo = function() {
              var t3 = navigator.userAgent, n3 = [], e3 = t3.match(/MicroMessenger\/([\d\.]+)/i), o2 = e3 && e3[1] ? e3[1] : null;
              "servicewechat.com" === location.host || console.info("[system]", "Location:", location.href);
              var r2 = t3.match(/(ipod).*\s([\d_]+)/i), i3 = t3.match(/(ipad).*\s([\d_]+)/i), a2 = t3.match(/(iphone)\sos\s([\d_]+)/i), c3 = t3.match(/(android)\s([\d\.]+)/i), u2 = t3.match(/(Mac OS X)\s([\d_]+)/i);
              n3 = [], c3 ? n3.push("Android " + c3[2]) : a2 ? n3.push("iPhone, iOS " + a2[2].replace(/_/g, ".")) : i3 ? n3.push("iPad, iOS " + i3[2].replace(/_/g, ".")) : r2 ? n3.push("iPod, iOS " + r2[2].replace(/_/g, ".")) : u2 && n3.push("Mac, MacOS " + u2[2].replace(/_/g, ".")), o2 && n3.push("WeChat " + o2), console.info("[system]", "Client:", n3.length ? n3.join(", ") : "Unknown");
              var s2 = t3.toLowerCase().match(/ nettype\/([^ ]+)/g);
              s2 && s2[0] && (n3 = [(s2 = s2[0].split("/"))[1]], console.info("[system]", "Network:", n3.length ? n3.join(", ") : "Unknown")), console.info("[system]", "UA:", t3), setTimeout((function() {
                var t4 = window.performance || window.msPerformance || window.webkitPerformance;
                if (t4 && t4.timing) {
                  var n4 = t4.timing;
                  n4.navigationStart && console.info("[system]", "navigationStart:", n4.navigationStart), n4.navigationStart && n4.domainLookupStart && console.info("[system]", "navigation:", n4.domainLookupStart - n4.navigationStart + "ms"), n4.domainLookupEnd && n4.domainLookupStart && console.info("[system]", "dns:", n4.domainLookupEnd - n4.domainLookupStart + "ms"), n4.connectEnd && n4.connectStart && (n4.connectEnd && n4.secureConnectionStart ? console.info("[system]", "tcp (ssl):", n4.connectEnd - n4.connectStart + "ms (" + (n4.connectEnd - n4.secureConnectionStart) + "ms)") : console.info("[system]", "tcp:", n4.connectEnd - n4.connectStart + "ms")), n4.responseStart && n4.requestStart && console.info("[system]", "request:", n4.responseStart - n4.requestStart + "ms"), n4.responseEnd && n4.responseStart && console.info("[system]", "response:", n4.responseEnd - n4.responseStart + "ms"), n4.domComplete && n4.domLoading && (n4.domContentLoadedEventStart && n4.domLoading ? console.info("[system]", "domComplete (domLoaded):", n4.domComplete - n4.domLoading + "ms (" + (n4.domContentLoadedEventStart - n4.domLoading) + "ms)") : console.info("[system]", "domComplete:", n4.domComplete - n4.domLoading + "ms")), n4.loadEventEnd && n4.loadEventStart && console.info("[system]", "loadEvent:", n4.loadEventEnd - n4.loadEventStart + "ms"), n4.navigationStart && n4.loadEventEnd && console.info("[system]", "total (DOM):", n4.loadEventEnd - n4.navigationStart + "ms (" + (n4.domComplete - n4.navigationStart) + "ms)");
                }
              }), 0);
            }, n2;
          })(Oe), $e = __webpack_require__(3313), Re = __webpack_require__(643);
          function ke(t2, n2) {
            var e2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
            if (e2) return (e2 = e2.call(t2)).next.bind(e2);
            if (Array.isArray(t2) || (e2 = (function(t3, n3) {
              if (!t3) return;
              if ("string" == typeof t3) return Pe(t3, n3);
              var e3 = Object.prototype.toString.call(t3).slice(8, -1);
              "Object" === e3 && t3.constructor && (e3 = t3.constructor.name);
              if ("Map" === e3 || "Set" === e3) return Array.from(t3);
              if ("Arguments" === e3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3)) return Pe(t3, n3);
            })(t2)) || n2) {
              e2 && (t2 = e2);
              var o2 = 0;
              return function() {
                return o2 >= t2.length ? { done: true } : { done: false, value: t2[o2++] };
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function Pe(t2, n2) {
            (null == n2 || n2 > t2.length) && (n2 = t2.length);
            for (var e2 = 0, o2 = new Array(n2); e2 < n2; e2++) o2[e2] = t2[e2];
            return o2;
          }
          var Me = function(t2, e2) {
            void 0 === e2 && (e2 = {}), n.Kn(e2) || (e2 = {});
            var o2 = t2 ? t2.split("?") : [];
            if (o2.shift(), o2.length > 0) for (var r2, i3 = ke(o2 = o2.join("?").split("&")); !(r2 = i3()).done; ) {
              var a2 = r2.value.split("=");
              try {
                e2[a2[0]] = decodeURIComponent(a2[1]);
              } catch (t3) {
                e2[a2[0]] = a2[1];
              }
            }
            return e2;
          }, Se = function(t2, e2) {
            var o2 = "";
            switch (t2) {
              case "":
              case "text":
              case "json":
                if (n.HD(e2)) try {
                  o2 = JSON.parse(e2), o2 = n.hZ(o2, { maxDepth: 10, keyMaxLen: 1e4, pretty: true, standardJSON: true });
                } catch (t3) {
                  o2 = n.id(String(e2), 1e4);
                }
                else n.Kn(e2) || n.kJ(e2) ? o2 = n.hZ(e2, { maxDepth: 10, keyMaxLen: 1e4, pretty: true, standardJSON: true }) : void 0 !== e2 && (o2 = Object.prototype.toString.call(e2));
                break;
              default:
                void 0 !== e2 && (o2 = Object.prototype.toString.call(e2));
            }
            return o2;
          }, je = function(t2) {
            if (!t2) return null;
            var e2 = null;
            if ("string" == typeof t2) try {
              e2 = JSON.parse(t2);
            } catch (n2) {
              var o2 = t2.split("&");
              if (1 === o2.length) e2 = t2;
              else {
                e2 = {};
                for (var r2, i3 = ke(o2); !(r2 = i3()).done; ) {
                  var a2 = r2.value.split("=");
                  e2[a2[0]] = void 0 === a2[1] ? "undefined" : a2[1];
                }
              }
            }
            else if (n.TW(t2)) {
              e2 = {};
              for (var c3, u2 = ke(t2); !(c3 = u2()).done; ) {
                var s2 = c3.value, l2 = s2[0], f2 = s2[1];
                e2[l2] = "string" == typeof f2 ? f2 : "[object Object]";
              }
            } else if (n.PO(t2)) e2 = t2;
            else {
              e2 = "[object " + n.zl(t2) + "]";
            }
            return e2;
          }, Be = function(t2) {
            (void 0 === t2 && (t2 = ""), t2.startsWith("//")) && (t2 = "" + new URL(window.location.href).protocol + t2);
            return t2.startsWith("http") ? new URL(t2) : new URL(t2, window.location.href);
          }, Ae = function() {
            this.id = "", this.name = "", this.method = "", this.url = "", this.status = 0, this.statusText = "", this.cancelState = 0, this.readyState = 0, this.header = null, this.responseType = "", this.requestType = void 0, this.requestHeader = null, this.response = void 0, this.responseSize = 0, this.responseSizeText = "", this.startTime = 0, this.startTimeText = "", this.endTime = 0, this.costTime = 0, this.getData = null, this.postData = null, this.actived = false, this.noVConsole = false, this.id = (0, n.QI)();
          }, Ue = (function(t2) {
            function n2(e2) {
              var o2;
              return (o2 = t2.call(this) || this)._response = void 0, new Proxy(e2, n2.Handler) || (0, r.Z)(o2);
            }
            return (0, i2.Z)(n2, t2), n2;
          })(Ae);
          Ue.Handler = { get: function(t2, n2) {
            return "response" === n2 ? t2._response : Reflect.get(t2, n2);
          }, set: function(t2, n2, e2) {
            var o2;
            switch (n2) {
              case "response":
                return t2._response = Se(t2.responseType, e2), true;
              case "url":
                var r2 = (null == (o2 = e2 = String(e2)) ? void 0 : o2.replace(new RegExp("[/]*$"), "").split("/").pop()) || "Unknown";
                Reflect.set(t2, "name", r2);
                var i3 = Me(e2, t2.getData);
                Reflect.set(t2, "getData", i3);
                break;
              case "status":
                var a2 = String(e2) || "Unknown";
                Reflect.set(t2, "statusText", a2);
                break;
              case "startTime":
                if (e2 && t2.endTime) {
                  var c3 = t2.endTime - e2;
                  Reflect.set(t2, "costTime", c3);
                }
                break;
              case "endTime":
                if (e2 && t2.startTime) {
                  var u2 = e2 - t2.startTime;
                  Reflect.set(t2, "costTime", u2);
                }
            }
            return Reflect.set(t2, n2, e2);
          } };
          var Ge = (function() {
            function t2(t3, n2) {
              var e3 = this;
              this.XMLReq = void 0, this.item = void 0, this.onUpdateCallback = void 0, this.XMLReq = t3, this.XMLReq.onreadystatechange = function() {
                e3.onReadyStateChange();
              }, this.XMLReq.onabort = function() {
                e3.onAbort();
              }, this.XMLReq.ontimeout = function() {
                e3.onTimeout();
              }, this.item = new Ae(), this.item.requestType = "xhr", this.onUpdateCallback = n2;
            }
            var e2 = t2.prototype;
            return e2.get = function(t3, n2) {
              switch (n2) {
                case "_noVConsole":
                  return this.item.noVConsole;
                case "open":
                  return this.getOpen(t3);
                case "send":
                  return this.getSend(t3);
                case "setRequestHeader":
                  return this.getSetRequestHeader(t3);
                default:
                  var e3 = Reflect.get(t3, n2);
                  return "function" == typeof e3 ? e3.bind(t3) : e3;
              }
            }, e2.set = function(t3, n2, e3) {
              switch (n2) {
                case "_noVConsole":
                  return void (this.item.noVConsole = !!e3);
                case "onreadystatechange":
                  return this.setOnReadyStateChange(t3, n2, e3);
                case "onabort":
                  return this.setOnAbort(t3, n2, e3);
                case "ontimeout":
                  return this.setOnTimeout(t3, n2, e3);
              }
              return Reflect.set(t3, n2, e3);
            }, e2.onReadyStateChange = function() {
              this.item.readyState = this.XMLReq.readyState, this.item.responseType = this.XMLReq.responseType, this.item.endTime = Date.now(), this.item.costTime = this.item.endTime - this.item.startTime, this.updateItemByReadyState(), this.item.response = Se(this.item.responseType, this.item.response), this.triggerUpdate();
            }, e2.onAbort = function() {
              this.item.cancelState = 1, this.item.statusText = "Abort", this.triggerUpdate();
            }, e2.onTimeout = function() {
              this.item.cancelState = 3, this.item.statusText = "Timeout", this.triggerUpdate();
            }, e2.triggerUpdate = function() {
              this.item.noVConsole || this.onUpdateCallback(this.item);
            }, e2.getOpen = function(t3) {
              var n2 = this, e3 = Reflect.get(t3, "open");
              return function() {
                for (var o2 = arguments.length, r2 = new Array(o2), i3 = 0; i3 < o2; i3++) r2[i3] = arguments[i3];
                var a2 = r2[0], c3 = r2[1];
                return n2.item.method = a2 ? a2.toUpperCase() : "GET", n2.item.url = c3 || "", n2.item.name = n2.item.url.replace(new RegExp("[/]*$"), "").split("/").pop() || "", n2.item.getData = Me(n2.item.url, {}), n2.triggerUpdate(), e3.apply(t3, r2);
              };
            }, e2.getSend = function(t3) {
              var n2 = this, e3 = Reflect.get(t3, "send");
              return function() {
                for (var o2 = arguments.length, r2 = new Array(o2), i3 = 0; i3 < o2; i3++) r2[i3] = arguments[i3];
                var a2 = r2[0];
                return n2.item.postData = je(a2), n2.triggerUpdate(), e3.apply(t3, r2);
              };
            }, e2.getSetRequestHeader = function(t3) {
              var n2 = this, e3 = Reflect.get(t3, "setRequestHeader");
              return function() {
                n2.item.requestHeader || (n2.item.requestHeader = {});
                for (var o2 = arguments.length, r2 = new Array(o2), i3 = 0; i3 < o2; i3++) r2[i3] = arguments[i3];
                return n2.item.requestHeader[r2[0]] = r2[1], n2.triggerUpdate(), e3.apply(t3, r2);
              };
            }, e2.setOnReadyStateChange = function(t3, n2, e3) {
              var o2 = this;
              return Reflect.set(t3, n2, (function() {
                o2.onReadyStateChange();
                for (var n3 = arguments.length, r2 = new Array(n3), i3 = 0; i3 < n3; i3++) r2[i3] = arguments[i3];
                e3.apply(t3, r2);
              }));
            }, e2.setOnAbort = function(t3, n2, e3) {
              var o2 = this;
              return Reflect.set(t3, n2, (function() {
                o2.onAbort();
                for (var n3 = arguments.length, r2 = new Array(n3), i3 = 0; i3 < n3; i3++) r2[i3] = arguments[i3];
                e3.apply(t3, r2);
              }));
            }, e2.setOnTimeout = function(t3, n2, e3) {
              var o2 = this;
              return Reflect.set(t3, n2, (function() {
                o2.onTimeout();
                for (var n3 = arguments.length, r2 = new Array(n3), i3 = 0; i3 < n3; i3++) r2[i3] = arguments[i3];
                e3.apply(t3, r2);
              }));
            }, e2.updateItemByReadyState = function() {
              switch (this.XMLReq.readyState) {
                case 0:
                case 1:
                  if (this.item.status = 0, this.item.statusText = "Pending", !this.item.startTime) {
                    this.item.startTime = Date.now();
                    var t3 = (0, n._3)(this.item.startTime);
                    this.item.startTimeText = t3.year + "-" + t3.month + "-" + t3.day + " " + t3.hour + ":" + t3.minute + ":" + t3.second + "." + t3.millisecond;
                  }
                  break;
                case 2:
                  this.item.status = this.XMLReq.status, this.item.statusText = "Loading", this.item.header = {};
                  for (var e3 = (this.XMLReq.getAllResponseHeaders() || "").split("\n"), o2 = 0; o2 < e3.length; o2++) {
                    var r2 = e3[o2];
                    if (r2) {
                      var i3 = r2.split(": "), a2 = i3[0], c3 = i3.slice(1).join(": ");
                      this.item.header[a2] = c3;
                    }
                  }
                  break;
                case 3:
                  this.item.status = this.XMLReq.status, this.item.statusText = "Loading", this.XMLReq.response && this.XMLReq.response.length && (this.item.responseSize = this.XMLReq.response.length, this.item.responseSizeText = (0, n.KL)(this.item.responseSize));
                  break;
                case 4:
                  this.item.status = this.XMLReq.status || this.item.status || 0, this.item.statusText = String(this.item.status), this.item.endTime = Date.now(), this.item.costTime = this.item.endTime - (this.item.startTime || this.item.endTime), this.item.response = this.XMLReq.response, this.XMLReq.response && this.XMLReq.response.length && (this.item.responseSize = this.XMLReq.response.length, this.item.responseSizeText = (0, n.KL)(this.item.responseSize));
                  break;
                default:
                  this.item.status = this.XMLReq.status, this.item.statusText = "Unknown";
              }
            }, t2;
          })(), Ne = (function() {
            function t2() {
            }
            return t2.create = function(t3) {
              return new Proxy(XMLHttpRequest, { construct: function(n2) {
                var e2 = new n2();
                return new Proxy(e2, new Ge(e2, t3));
              } });
            }, t2;
          })();
          function Ve(t2, n2) {
            var e2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
            if (e2) return (e2 = e2.call(t2)).next.bind(e2);
            if (Array.isArray(t2) || (e2 = (function(t3, n3) {
              if (!t3) return;
              if ("string" == typeof t3) return We(t3, n3);
              var e3 = Object.prototype.toString.call(t3).slice(8, -1);
              "Object" === e3 && t3.constructor && (e3 = t3.constructor.name);
              if ("Map" === e3 || "Set" === e3) return Array.from(t3);
              if ("Arguments" === e3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3)) return We(t3, n3);
            })(t2)) || n2) {
              e2 && (t2 = e2);
              var o2 = 0;
              return function() {
                return o2 >= t2.length ? { done: true } : { done: false, value: t2[o2++] };
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function We(t2, n2) {
            (null == n2 || n2 > t2.length) && (n2 = t2.length);
            for (var e2 = 0, o2 = new Array(n2); e2 < n2; e2++) o2[e2] = t2[e2];
            return o2;
          }
          Ne.origXMLHttpRequest = XMLHttpRequest;
          var Ke = (function() {
            function t2(t3, n2, e3) {
              this.resp = void 0, this.item = void 0, this.onUpdateCallback = void 0, this.resp = t3, this.item = n2, this.onUpdateCallback = e3, this.mockReader();
            }
            var e2 = t2.prototype;
            return e2.set = function(t3, n2, e3) {
              return Reflect.set(t3, n2, e3);
            }, e2.get = function(t3, n2) {
              var e3 = this, o2 = Reflect.get(t3, n2);
              switch (n2) {
                case "arrayBuffer":
                case "blob":
                case "formData":
                case "json":
                case "text":
                  return function() {
                    return e3.item.responseType = n2.toLowerCase(), o2.apply(t3).then((function(t4) {
                      return e3.item.response = Se(e3.item.responseType, t4), e3.onUpdateCallback(e3.item), t4;
                    }));
                  };
              }
              return "function" == typeof o2 ? o2.bind(t3) : o2;
            }, e2.mockReader = function() {
              var t3, e3 = this;
              if (this.resp.body && "function" == typeof this.resp.body.getReader) {
                var o2 = this.resp.body.getReader;
                this.resp.body.getReader = function() {
                  var r2 = o2.apply(e3.resp.body);
                  if (4 === e3.item.readyState) return r2;
                  var i3 = r2.read, a2 = r2.cancel;
                  return e3.item.responseType = "arraybuffer", r2.read = function() {
                    return i3.apply(r2).then((function(o3) {
                      if (t3) {
                        var r3 = new Uint8Array(t3.length + o3.value.length);
                        r3.set(t3), r3.set(o3.value, t3.length), t3 = r3;
                      } else t3 = new Uint8Array(o3.value);
                      return e3.item.endTime = Date.now(), e3.item.costTime = e3.item.endTime - (e3.item.startTime || e3.item.endTime), e3.item.readyState = o3.done ? 4 : 3, e3.item.statusText = o3.done ? String(e3.item.status) : "Loading", e3.item.responseSize = t3.length, e3.item.responseSizeText = n.KL(e3.item.responseSize), o3.done && (e3.item.response = Se(e3.item.responseType, t3)), e3.onUpdateCallback(e3.item), o3;
                    }));
                  }, r2.cancel = function() {
                    e3.item.cancelState = 2, e3.item.statusText = "Cancel", e3.item.endTime = Date.now(), e3.item.costTime = e3.item.endTime - (e3.item.startTime || e3.item.endTime), e3.item.response = Se(e3.item.responseType, t3), e3.onUpdateCallback(e3.item);
                    for (var n2 = arguments.length, o3 = new Array(n2), i4 = 0; i4 < n2; i4++) o3[i4] = arguments[i4];
                    return a2.apply(r2, o3);
                  }, r2;
                };
              }
            }, t2;
          })(), He = (function() {
            function t2(t3) {
              this.onUpdateCallback = void 0, this.onUpdateCallback = t3;
            }
            var e2 = t2.prototype;
            return e2.apply = function(t3, n2, e3) {
              var o2 = this, r2 = e3[0], i3 = e3[1], a2 = new Ae();
              return this.beforeFetch(a2, r2, i3), t3.apply(window, e3).then(this.afterFetch(a2)).catch((function(t4) {
                throw a2.endTime = Date.now(), a2.costTime = a2.endTime - (a2.startTime || a2.endTime), o2.onUpdateCallback(a2), t4;
              }));
            }, e2.beforeFetch = function(t3, e3, o2) {
              var r2, i3 = "GET", a2 = null;
              if (n.HD(e3) ? (i3 = (null == o2 ? void 0 : o2.method) || "GET", r2 = Be(e3), a2 = (null == o2 ? void 0 : o2.headers) || null) : (i3 = e3.method || "GET", r2 = Be(e3.url), a2 = e3.headers), t3.method = i3, t3.requestType = "fetch", t3.requestHeader = a2, t3.url = r2.toString(), t3.name = (r2.pathname.split("/").pop() || "") + r2.search, t3.status = 0, t3.statusText = "Pending", t3.readyState = 1, !t3.startTime) {
                t3.startTime = Date.now();
                var c3 = n._3(t3.startTime);
                t3.startTimeText = c3.year + "-" + c3.month + "-" + c3.day + " " + c3.hour + ":" + c3.minute + ":" + c3.second + "." + c3.millisecond;
              }
              if ("[object Headers]" === Object.prototype.toString.call(a2)) {
                t3.requestHeader = {};
                for (var u2, s2 = Ve(a2); !(u2 = s2()).done; ) {
                  var l2 = u2.value, f2 = l2[0], d2 = l2[1];
                  t3.requestHeader[f2] = d2;
                }
              } else t3.requestHeader = a2;
              if (r2.search && r2.searchParams) {
                t3.getData = {};
                for (var v2, p2 = Ve(r2.searchParams); !(v2 = p2()).done; ) {
                  var h2 = v2.value, g2 = h2[0], m3 = h2[1];
                  t3.getData[g2] = m3;
                }
              }
              null != o2 && o2.body && (t3.postData = je(o2.body)), this.onUpdateCallback(t3);
            }, e2.afterFetch = function(t3) {
              var e3 = this;
              return function(o2) {
                t3.endTime = Date.now(), t3.costTime = t3.endTime - (t3.startTime || t3.endTime), t3.status = o2.status, t3.statusText = String(o2.status);
                var r2 = false;
                t3.header = {};
                for (var i3, a2 = Ve(o2.headers); !(i3 = a2()).done; ) {
                  var c3 = i3.value, u2 = c3[0], s2 = c3[1];
                  t3.header[u2] = s2, r2 = s2.toLowerCase().indexOf("chunked") > -1 || r2;
                }
                return r2 ? t3.readyState = 3 : (t3.readyState = 4, e3.handleResponseBody(o2.clone(), t3).then((function(o3) {
                  t3.responseSize = "string" == typeof o3 ? o3.length : o3.byteLength, t3.responseSizeText = n.KL(t3.responseSize), t3.response = Se(t3.responseType, o3), e3.onUpdateCallback(t3);
                }))), e3.onUpdateCallback(t3), new Proxy(o2, new Ke(o2, t3, e3.onUpdateCallback));
              };
            }, e2.handleResponseBody = function(t3, n2) {
              var e3 = t3.headers.get("content-type");
              return e3 && e3.includes("application/json") ? (n2.responseType = "json", t3.text()) : e3 && (e3.includes("text/html") || e3.includes("text/plain")) ? (n2.responseType = "text", t3.text()) : (n2.responseType = "arraybuffer", t3.arrayBuffer());
            }, t2;
          })(), Fe = (function() {
            function t2() {
            }
            return t2.create = function(t3) {
              return new Proxy(fetch, new He(t3));
            }, t2;
          })();
          function Ze(t2, n2) {
            var e2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
            if (e2) return (e2 = e2.call(t2)).next.bind(e2);
            if (Array.isArray(t2) || (e2 = (function(t3, n3) {
              if (!t3) return;
              if ("string" == typeof t3) return qe(t3, n3);
              var e3 = Object.prototype.toString.call(t3).slice(8, -1);
              "Object" === e3 && t3.constructor && (e3 = t3.constructor.name);
              if ("Map" === e3 || "Set" === e3) return Array.from(t3);
              if ("Arguments" === e3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3)) return qe(t3, n3);
            })(t2)) || n2) {
              e2 && (t2 = e2);
              var o2 = 0;
              return function() {
                return o2 >= t2.length ? { done: true } : { done: false, value: t2[o2++] };
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function qe(t2, n2) {
            (null == n2 || n2 > t2.length) && (n2 = t2.length);
            for (var e2 = 0, o2 = new Array(n2); e2 < n2; e2++) o2[e2] = t2[e2];
            return o2;
          }
          Fe.origFetch = fetch;
          var Xe = function(t2) {
            return t2 instanceof Blob ? t2.type : t2 instanceof FormData ? "multipart/form-data" : t2 instanceof URLSearchParams ? "application/x-www-form-urlencoded;charset=UTF-8" : "text/plain;charset=UTF-8";
          }, ze = (function() {
            function t2(t3) {
              this.onUpdateCallback = void 0, this.onUpdateCallback = t3;
            }
            return t2.prototype.apply = function(t3, n2, e2) {
              var o2 = e2[0], r2 = e2[1], i3 = new Ae(), a2 = Be(o2);
              if (i3.method = "POST", i3.url = o2, i3.name = (a2.pathname.split("/").pop() || "") + a2.search, i3.requestType = "ping", i3.requestHeader = { "Content-Type": Xe(r2) }, i3.status = 0, i3.statusText = "Pending", a2.search && a2.searchParams) {
                i3.getData = {};
                for (var c3, u2 = Ze(a2.searchParams); !(c3 = u2()).done; ) {
                  var s2 = c3.value, l2 = s2[0], f2 = s2[1];
                  i3.getData[l2] = f2;
                }
              }
              i3.postData = je(r2), i3.startTime || (i3.startTime = Date.now()), this.onUpdateCallback(i3);
              var d2 = t3.apply(n2, e2);
              return d2 ? (i3.endTime = Date.now(), i3.costTime = i3.endTime - (i3.startTime || i3.endTime), i3.status = 0, i3.statusText = "Sent", i3.readyState = 4) : (i3.status = 500, i3.statusText = "Unknown"), this.onUpdateCallback(i3), d2;
            }, t2;
          })(), Ye = (function() {
            function t2() {
            }
            return t2.create = function(t3) {
              return new Proxy(navigator.sendBeacon, new ze(t3));
            }, t2;
          })();
          Ye.origSendBeacon = navigator.sendBeacon;
          var Je = (0, $e.fZ)({}), Qe = (function(t2) {
            function n2() {
              var n3;
              return (n3 = t2.call(this) || this).maxNetworkNumber = 1e3, n3.ignoreUrlRegExp = void 0, n3.itemCounter = 0, n3.mockXHR(), n3.mockFetch(), n3.mockSendBeacon(), n3;
            }
            (0, i2.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.unMock = function() {
              window.hasOwnProperty("XMLHttpRequest") && (window.XMLHttpRequest = Ne.origXMLHttpRequest), window.hasOwnProperty("fetch") && (window.fetch = Fe.origFetch), window.navigator.sendBeacon && (window.navigator.sendBeacon = Ye.origSendBeacon);
            }, e2.clearLog = function() {
              Je.set({});
            }, e2.updateRequest = function(t3, n3) {
              var e3, o2 = n3.url;
              if (!o2 || null == (e3 = this.ignoreUrlRegExp) || !e3.test(o2)) {
                var r2 = (0, $e.U2)(Je), i3 = !!r2[t3];
                if (i3) {
                  var a2 = r2[t3];
                  for (var c3 in n3) a2[c3] = n3[c3];
                  n3 = a2;
                }
                Je.update((function(e4) {
                  return e4[t3] = n3, e4;
                })), i3 || (M.x.updateTime(), this.limitListLength());
              }
            }, e2.mockXHR = function() {
              var t3 = this;
              window.hasOwnProperty("XMLHttpRequest") && (window.XMLHttpRequest = Ne.create((function(n3) {
                t3.updateRequest(n3.id, n3);
              })));
            }, e2.mockFetch = function() {
              var t3 = this;
              window.hasOwnProperty("fetch") && (window.fetch = Fe.create((function(n3) {
                t3.updateRequest(n3.id, n3);
              })));
            }, e2.mockSendBeacon = function() {
              var t3, n3, e3 = this;
              null != (t3 = window) && null != (n3 = t3.navigator) && n3.sendBeacon && (window.navigator.sendBeacon = Ye.create((function(t4) {
                e3.updateRequest(t4.id, t4);
              })));
            }, e2.limitListLength = function() {
              var t3 = this;
              if (this.itemCounter++, this.itemCounter % 10 == 0) {
                this.itemCounter = 0;
                var n3 = (0, $e.U2)(Je), e3 = Object.keys(n3);
                e3.length > this.maxNetworkNumber - 10 && Je.update((function(n4) {
                  for (var o2 = e3.splice(0, e3.length - t3.maxNetworkNumber + 10), r2 = 0; r2 < o2.length; r2++) n4[o2[r2]] = void 0, delete n4[o2[r2]];
                  return n4;
                }));
              }
            }, n2;
          })(Re.N), to = __webpack_require__(8747), no = {};
          to.Z && to.Z.locals && (no.locals = to.Z.locals);
          var eo, oo = 0, ro = {};
          ro.styleTagTransform = b(), ro.setAttributes = h(), ro.insert = v().bind(null, "head"), ro.domAPI = f(), ro.insertStyleElement = m2(), no.use = function(t2) {
            return ro.options = t2 || {}, oo++ || (eo = s()(to.Z, ro)), no;
          }, no.unuse = function() {
            oo > 0 && !--oo && (eo(), eo = null);
          };
          var io = no;
          function ao(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[11] = n2[e2][0], o2[12] = n2[e2][1], o2;
          }
          function co(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[11] = n2[e2][0], o2[12] = n2[e2][1], o2;
          }
          function uo(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[11] = n2[e2][0], o2[12] = n2[e2][1], o2;
          }
          function so(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[11] = n2[e2][0], o2[12] = n2[e2][1], o2;
          }
          function lo(t2) {
            var n2, e2, o2;
            return { c: function() {
              n2 = (0, a.fLW)("("), e2 = (0, a.fLW)(t2[0]), o2 = (0, a.fLW)(")");
            }, m: function(t3, r2) {
              (0, a.$Tr)(t3, n2, r2), (0, a.$Tr)(t3, e2, r2), (0, a.$Tr)(t3, o2, r2);
            }, p: function(t3, n3) {
              1 & n3 && (0, a.rTO)(e2, t3[0]);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), t3 && (0, a.ogt)(e2), t3 && (0, a.ogt)(o2);
            } };
          }
          function fo(t2) {
            var n2, e2, o2, r2, i3, c3, u2 = t2[0] > 0 && lo(t2);
            return { c: function() {
              n2 = (0, a.bGB)("dl"), e2 = (0, a.bGB)("dd"), o2 = (0, a.fLW)("Name "), u2 && u2.c(), (r2 = (0, a.bGB)("dd")).textContent = "Method", (i3 = (0, a.bGB)("dd")).textContent = "Status", (c3 = (0, a.bGB)("dd")).textContent = "Time", (0, a.Ljt)(e2, "class", "vc-table-col vc-table-col-4"), (0, a.Ljt)(r2, "class", "vc-table-col"), (0, a.Ljt)(i3, "class", "vc-table-col"), (0, a.Ljt)(c3, "class", "vc-table-col"), (0, a.Ljt)(n2, "class", "vc-table-row");
            }, m: function(t3, s2) {
              (0, a.$Tr)(t3, n2, s2), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), u2 && u2.m(e2, null), (0, a.R3I)(n2, r2), (0, a.R3I)(n2, i3), (0, a.R3I)(n2, c3);
            }, p: function(t3, n3) {
              t3[0] > 0 ? u2 ? u2.p(t3, n3) : ((u2 = lo(t3)).c(), u2.m(e2, null)) : u2 && (u2.d(1), u2 = null);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), u2 && u2.d();
            } };
          }
          function vo(t2) {
            var n2;
            return { c: function() {
              (n2 = (0, a.bGB)("div")).textContent = "Empty", (0, a.Ljt)(n2, "slot", "empty"), (0, a.Ljt)(n2, "class", "vc-plugin-empty");
            }, m: function(t3, e2) {
              (0, a.$Tr)(t3, n2, e2);
            }, p: a.ZTd, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function po(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2;
            c3 = new dt({ props: { content: t2[10].requestHeader } });
            for (var l2 = Object.entries(t2[10].requestHeader), f2 = [], d2 = 0; d2 < l2.length; d2 += 1) f2[d2] = ho(so(t2, l2, d2));
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("dl"), o2 = (0, a.bGB)("dt"), r2 = (0, a.fLW)("Request Headers\n                "), i3 = (0, a.bGB)("i"), (0, a.YCL)(c3.$$.fragment), u2 = (0, a.DhX)();
              for (var t3 = 0; t3 < f2.length; t3 += 1) f2[t3].c();
              (0, a.Ljt)(i3, "class", "vc-table-row-icon"), (0, a.Ljt)(o2, "class", "vc-table-col vc-table-col-title"), (0, a.Ljt)(e2, "class", "vc-table-row vc-left-border");
            }, m: function(t3, l3) {
              (0, a.$Tr)(t3, n2, l3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(o2, r2), (0, a.R3I)(o2, i3), (0, a.yef)(c3, i3, null), (0, a.R3I)(n2, u2);
              for (var d3 = 0; d3 < f2.length; d3 += 1) f2[d3].m(n2, null);
              s2 = true;
            }, p: function(t3, e3) {
              var o3 = {};
              if (1024 & e3 && (o3.content = t3[10].requestHeader), c3.$set(o3), 1040 & e3) {
                var r3;
                for (l2 = Object.entries(t3[10].requestHeader), r3 = 0; r3 < l2.length; r3 += 1) {
                  var i4 = so(t3, l2, r3);
                  f2[r3] ? f2[r3].p(i4, e3) : (f2[r3] = ho(i4), f2[r3].c(), f2[r3].m(n2, null));
                }
                for (; r3 < f2.length; r3 += 1) f2[r3].d(1);
                f2.length = l2.length;
              }
            }, i: function(t3) {
              s2 || ((0, a.Ui)(c3.$$.fragment, t3), s2 = true);
            }, o: function(t3) {
              (0, a.etI)(c3.$$.fragment, t3), s2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(c3), (0, a.RMB)(f2, t3);
            } };
          }
          function ho(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2 = t2[11] + "", l2 = t2[4](t2[12]) + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("div"), o2 = (0, a.fLW)(s2), r2 = (0, a.DhX)(), i3 = (0, a.bGB)("div"), c3 = (0, a.fLW)(l2), u2 = (0, a.DhX)(), (0, a.Ljt)(e2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(i3, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(n2, "class", "vc-table-row vc-left-border vc-small");
            }, m: function(t3, s3) {
              (0, a.$Tr)(t3, n2, s3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(n2, r2), (0, a.R3I)(n2, i3), (0, a.R3I)(i3, c3), (0, a.R3I)(n2, u2);
            }, p: function(t3, n3) {
              1024 & n3 && s2 !== (s2 = t3[11] + "") && (0, a.rTO)(o2, s2), 1024 & n3 && l2 !== (l2 = t3[4](t3[12]) + "") && (0, a.rTO)(c3, l2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function go(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2;
            c3 = new dt({ props: { content: t2[10].getData } });
            for (var l2 = Object.entries(t2[10].getData), f2 = [], d2 = 0; d2 < l2.length; d2 += 1) f2[d2] = mo(uo(t2, l2, d2));
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("dl"), o2 = (0, a.bGB)("dt"), r2 = (0, a.fLW)("Query String Parameters\n                "), i3 = (0, a.bGB)("i"), (0, a.YCL)(c3.$$.fragment), u2 = (0, a.DhX)();
              for (var t3 = 0; t3 < f2.length; t3 += 1) f2[t3].c();
              (0, a.Ljt)(i3, "class", "vc-table-row-icon"), (0, a.Ljt)(o2, "class", "vc-table-col vc-table-col-title"), (0, a.Ljt)(e2, "class", "vc-table-row vc-left-border");
            }, m: function(t3, l3) {
              (0, a.$Tr)(t3, n2, l3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(o2, r2), (0, a.R3I)(o2, i3), (0, a.yef)(c3, i3, null), (0, a.R3I)(n2, u2);
              for (var d3 = 0; d3 < f2.length; d3 += 1) f2[d3].m(n2, null);
              s2 = true;
            }, p: function(t3, e3) {
              var o3 = {};
              if (1024 & e3 && (o3.content = t3[10].getData), c3.$set(o3), 1040 & e3) {
                var r3;
                for (l2 = Object.entries(t3[10].getData), r3 = 0; r3 < l2.length; r3 += 1) {
                  var i4 = uo(t3, l2, r3);
                  f2[r3] ? f2[r3].p(i4, e3) : (f2[r3] = mo(i4), f2[r3].c(), f2[r3].m(n2, null));
                }
                for (; r3 < f2.length; r3 += 1) f2[r3].d(1);
                f2.length = l2.length;
              }
            }, i: function(t3) {
              s2 || ((0, a.Ui)(c3.$$.fragment, t3), s2 = true);
            }, o: function(t3) {
              (0, a.etI)(c3.$$.fragment, t3), s2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(c3), (0, a.RMB)(f2, t3);
            } };
          }
          function mo(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2 = t2[11] + "", l2 = t2[4](t2[12]) + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("div"), o2 = (0, a.fLW)(s2), r2 = (0, a.DhX)(), i3 = (0, a.bGB)("div"), c3 = (0, a.fLW)(l2), u2 = (0, a.DhX)(), (0, a.Ljt)(e2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(i3, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(n2, "class", "vc-table-row vc-left-border vc-small");
            }, m: function(t3, s3) {
              (0, a.$Tr)(t3, n2, s3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(n2, r2), (0, a.R3I)(n2, i3), (0, a.R3I)(i3, c3), (0, a.R3I)(n2, u2);
            }, p: function(t3, n3) {
              1024 & n3 && s2 !== (s2 = t3[11] + "") && (0, a.rTO)(o2, s2), 1024 & n3 && l2 !== (l2 = t3[4](t3[12]) + "") && (0, a.rTO)(c3, l2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function _o(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2;
            function l2(t3, n3) {
              return "string" == typeof t3[10].postData ? yo : bo;
            }
            c3 = new dt({ props: { content: t2[10].postData } });
            var f2 = l2(t2), d2 = f2(t2);
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("dl"), o2 = (0, a.bGB)("dt"), r2 = (0, a.fLW)("Request Payload\n                "), i3 = (0, a.bGB)("i"), (0, a.YCL)(c3.$$.fragment), u2 = (0, a.DhX)(), d2.c(), (0, a.Ljt)(i3, "class", "vc-table-row-icon"), (0, a.Ljt)(o2, "class", "vc-table-col vc-table-col-title"), (0, a.Ljt)(e2, "class", "vc-table-row vc-left-border");
            }, m: function(t3, l3) {
              (0, a.$Tr)(t3, n2, l3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(o2, r2), (0, a.R3I)(o2, i3), (0, a.yef)(c3, i3, null), (0, a.R3I)(n2, u2), d2.m(n2, null), s2 = true;
            }, p: function(t3, e3) {
              var o3 = {};
              1024 & e3 && (o3.content = t3[10].postData), c3.$set(o3), f2 === (f2 = l2(t3)) && d2 ? d2.p(t3, e3) : (d2.d(1), (d2 = f2(t3)) && (d2.c(), d2.m(n2, null)));
            }, i: function(t3) {
              s2 || ((0, a.Ui)(c3.$$.fragment, t3), s2 = true);
            }, o: function(t3) {
              (0, a.etI)(c3.$$.fragment, t3), s2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(c3), d2.d();
            } };
          }
          function bo(t2) {
            for (var n2, e2 = Object.entries(t2[10].postData), o2 = [], r2 = 0; r2 < e2.length; r2 += 1) o2[r2] = wo(co(t2, e2, r2));
            return { c: function() {
              for (var t3 = 0; t3 < o2.length; t3 += 1) o2[t3].c();
              n2 = (0, a.cSb)();
            }, m: function(t3, e3) {
              for (var r3 = 0; r3 < o2.length; r3 += 1) o2[r3].m(t3, e3);
              (0, a.$Tr)(t3, n2, e3);
            }, p: function(t3, r3) {
              if (1040 & r3) {
                var i3;
                for (e2 = Object.entries(t3[10].postData), i3 = 0; i3 < e2.length; i3 += 1) {
                  var a2 = co(t3, e2, i3);
                  o2[i3] ? o2[i3].p(a2, r3) : (o2[i3] = wo(a2), o2[i3].c(), o2[i3].m(n2.parentNode, n2));
                }
                for (; i3 < o2.length; i3 += 1) o2[i3].d(1);
                o2.length = e2.length;
              }
            }, d: function(t3) {
              (0, a.RMB)(o2, t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function yo(t2) {
            var n2, e2, o2, r2 = t2[10].postData + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("pre"), o2 = (0, a.fLW)(r2), (0, a.Ljt)(e2, "class", "vc-table-col vc-table-col-value vc-max-height-line"), (0, a.Ljt)(e2, "data-scrollable", "1"), (0, a.Ljt)(n2, "class", "vc-table-row vc-left-border vc-small");
            }, m: function(t3, r3) {
              (0, a.$Tr)(t3, n2, r3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2);
            }, p: function(t3, n3) {
              1024 & n3 && r2 !== (r2 = t3[10].postData + "") && (0, a.rTO)(o2, r2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function wo(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2 = t2[11] + "", l2 = t2[4](t2[12]) + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("div"), o2 = (0, a.fLW)(s2), r2 = (0, a.DhX)(), i3 = (0, a.bGB)("div"), c3 = (0, a.fLW)(l2), u2 = (0, a.DhX)(), (0, a.Ljt)(e2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(i3, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(i3, "data-scrollable", "1"), (0, a.Ljt)(n2, "class", "vc-table-row vc-left-border vc-small");
            }, m: function(t3, s3) {
              (0, a.$Tr)(t3, n2, s3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(n2, r2), (0, a.R3I)(n2, i3), (0, a.R3I)(i3, c3), (0, a.R3I)(n2, u2);
            }, p: function(t3, n3) {
              1024 & n3 && s2 !== (s2 = t3[11] + "") && (0, a.rTO)(o2, s2), 1024 & n3 && l2 !== (l2 = t3[4](t3[12]) + "") && (0, a.rTO)(c3, l2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function Eo(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2;
            c3 = new dt({ props: { content: t2[10].header } });
            for (var l2 = Object.entries(t2[10].header), f2 = [], d2 = 0; d2 < l2.length; d2 += 1) f2[d2] = Lo(ao(t2, l2, d2));
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("dl"), o2 = (0, a.bGB)("dt"), r2 = (0, a.fLW)("Response Headers\n                "), i3 = (0, a.bGB)("i"), (0, a.YCL)(c3.$$.fragment), u2 = (0, a.DhX)();
              for (var t3 = 0; t3 < f2.length; t3 += 1) f2[t3].c();
              (0, a.Ljt)(i3, "class", "vc-table-row-icon"), (0, a.Ljt)(o2, "class", "vc-table-col vc-table-col-title"), (0, a.Ljt)(e2, "class", "vc-table-row vc-left-border");
            }, m: function(t3, l3) {
              (0, a.$Tr)(t3, n2, l3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(o2, r2), (0, a.R3I)(o2, i3), (0, a.yef)(c3, i3, null), (0, a.R3I)(n2, u2);
              for (var d3 = 0; d3 < f2.length; d3 += 1) f2[d3].m(n2, null);
              s2 = true;
            }, p: function(t3, e3) {
              var o3 = {};
              if (1024 & e3 && (o3.content = t3[10].header), c3.$set(o3), 1040 & e3) {
                var r3;
                for (l2 = Object.entries(t3[10].header), r3 = 0; r3 < l2.length; r3 += 1) {
                  var i4 = ao(t3, l2, r3);
                  f2[r3] ? f2[r3].p(i4, e3) : (f2[r3] = Lo(i4), f2[r3].c(), f2[r3].m(n2, null));
                }
                for (; r3 < f2.length; r3 += 1) f2[r3].d(1);
                f2.length = l2.length;
              }
            }, i: function(t3) {
              s2 || ((0, a.Ui)(c3.$$.fragment, t3), s2 = true);
            }, o: function(t3) {
              (0, a.etI)(c3.$$.fragment, t3), s2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(c3), (0, a.RMB)(f2, t3);
            } };
          }
          function Lo(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2 = t2[11] + "", l2 = t2[4](t2[12]) + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("div"), o2 = (0, a.fLW)(s2), r2 = (0, a.DhX)(), i3 = (0, a.bGB)("div"), c3 = (0, a.fLW)(l2), u2 = (0, a.DhX)(), (0, a.Ljt)(e2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(i3, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(n2, "class", "vc-table-row vc-left-border vc-small");
            }, m: function(t3, s3) {
              (0, a.$Tr)(t3, n2, s3), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(n2, r2), (0, a.R3I)(n2, i3), (0, a.R3I)(i3, c3), (0, a.R3I)(n2, u2);
            }, p: function(t3, n3) {
              1024 & n3 && s2 !== (s2 = t3[11] + "") && (0, a.rTO)(o2, s2), 1024 & n3 && l2 !== (l2 = t3[4](t3[12]) + "") && (0, a.rTO)(c3, l2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function To(t2) {
            var n2, e2, o2, r2, i3, c3 = t2[10].responseSizeText + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), (e2 = (0, a.bGB)("div")).textContent = "Size", o2 = (0, a.DhX)(), r2 = (0, a.bGB)("div"), i3 = (0, a.fLW)(c3), (0, a.Ljt)(e2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(r2, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(n2, "class", "vc-table-row vc-left-border vc-small");
            }, m: function(t3, c4) {
              (0, a.$Tr)(t3, n2, c4), (0, a.R3I)(n2, e2), (0, a.R3I)(n2, o2), (0, a.R3I)(n2, r2), (0, a.R3I)(r2, i3);
            }, p: function(t3, n3) {
              1024 & n3 && c3 !== (c3 = t3[10].responseSizeText + "") && (0, a.rTO)(i3, c3);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function xo(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2, l2, f2, d2, v2, p2, h2, g2, m3, _2, b2, y2, w2, E2, L2, T2, x2, C2, O2, I2, D2, $2, R2, k2, P3, M2, S2, j2, B2, A2, U2, G2, N2, V2, W2, K2, H2, F2, Z2, q2, X2, z2, Y2, J2, Q2, tt2, nt2, et2, ot2, rt2, it2, at2, ct2, ut2, st2, lt2, ft2, vt2, pt2, ht2, gt2, mt2 = t2[10].name + "", _t2 = t2[10].method + "", bt2 = t2[10].statusText + "", yt2 = t2[10].costTime + "", wt2 = t2[10].url + "", Et2 = t2[10].method + "", Lt2 = t2[10].requestType + "", Tt2 = t2[10].status + "", xt2 = t2[10].startTimeText + "", Ct2 = (t2[10].response || "") + "";
            function Ot2() {
              return t2[7](t2[10]);
            }
            b2 = new dt({ props: { handler: t2[3], content: t2[10] } });
            var It2 = null !== t2[10].requestHeader && po(t2), Dt2 = null !== t2[10].getData && go(t2), $t2 = null !== t2[10].postData && _o(t2), Rt2 = null !== t2[10].header && Eo(t2);
            at2 = new dt({ props: { content: t2[10].response } });
            var kt2 = t2[10].responseSize > 0 && To(t2);
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("dl"), o2 = (0, a.bGB)("dd"), r2 = (0, a.fLW)(mt2), i3 = (0, a.bGB)("dd"), c3 = (0, a.fLW)(_t2), u2 = (0, a.bGB)("dd"), s2 = (0, a.fLW)(bt2), l2 = (0, a.bGB)("dd"), f2 = (0, a.fLW)(yt2), d2 = (0, a.DhX)(), v2 = (0, a.bGB)("div"), p2 = (0, a.bGB)("div"), h2 = (0, a.bGB)("dl"), g2 = (0, a.bGB)("dt"), m3 = (0, a.fLW)("General\n                "), _2 = (0, a.bGB)("i"), (0, a.YCL)(b2.$$.fragment), y2 = (0, a.DhX)(), w2 = (0, a.bGB)("div"), (E2 = (0, a.bGB)("div")).textContent = "URL", L2 = (0, a.DhX)(), T2 = (0, a.bGB)("div"), x2 = (0, a.fLW)(wt2), C2 = (0, a.DhX)(), O2 = (0, a.bGB)("div"), (I2 = (0, a.bGB)("div")).textContent = "Method", D2 = (0, a.DhX)(), $2 = (0, a.bGB)("div"), R2 = (0, a.fLW)(Et2), k2 = (0, a.DhX)(), P3 = (0, a.bGB)("div"), (M2 = (0, a.bGB)("div")).textContent = "Request Type", S2 = (0, a.DhX)(), j2 = (0, a.bGB)("div"), B2 = (0, a.fLW)(Lt2), A2 = (0, a.DhX)(), U2 = (0, a.bGB)("div"), (G2 = (0, a.bGB)("div")).textContent = "HTTP Status", N2 = (0, a.DhX)(), V2 = (0, a.bGB)("div"), W2 = (0, a.fLW)(Tt2), K2 = (0, a.DhX)(), H2 = (0, a.bGB)("div"), (F2 = (0, a.bGB)("div")).textContent = "Start Time", Z2 = (0, a.DhX)(), q2 = (0, a.bGB)("div"), X2 = (0, a.fLW)(xt2), z2 = (0, a.DhX)(), It2 && It2.c(), Y2 = (0, a.DhX)(), Dt2 && Dt2.c(), J2 = (0, a.DhX)(), $t2 && $t2.c(), Q2 = (0, a.DhX)(), Rt2 && Rt2.c(), tt2 = (0, a.DhX)(), nt2 = (0, a.bGB)("div"), et2 = (0, a.bGB)("dl"), ot2 = (0, a.bGB)("dt"), rt2 = (0, a.fLW)("Response\n                "), it2 = (0, a.bGB)("i"), (0, a.YCL)(at2.$$.fragment), ct2 = (0, a.DhX)(), kt2 && kt2.c(), ut2 = (0, a.DhX)(), st2 = (0, a.bGB)("div"), lt2 = (0, a.bGB)("pre"), ft2 = (0, a.fLW)(Ct2), (0, a.Ljt)(o2, "class", "vc-table-col vc-table-col-4"), (0, a.Ljt)(i3, "class", "vc-table-col"), (0, a.Ljt)(u2, "class", "vc-table-col"), (0, a.Ljt)(l2, "class", "vc-table-col"), (0, a.Ljt)(e2, "class", "vc-table-row vc-group-preview"), (0, a.VHj)(e2, "vc-table-row-error", t2[10].status >= 400), (0, a.Ljt)(_2, "class", "vc-table-row-icon"), (0, a.Ljt)(g2, "class", "vc-table-col vc-table-col-title"), (0, a.Ljt)(h2, "class", "vc-table-row vc-left-border"), (0, a.Ljt)(E2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(T2, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(w2, "class", "vc-table-row vc-left-border vc-small"), (0, a.Ljt)(I2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)($2, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(O2, "class", "vc-table-row vc-left-border vc-small"), (0, a.Ljt)(M2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(j2, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(P3, "class", "vc-table-row vc-left-border vc-small"), (0, a.Ljt)(G2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(V2, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(U2, "class", "vc-table-row vc-left-border vc-small"), (0, a.Ljt)(F2, "class", "vc-table-col vc-table-col-2"), (0, a.Ljt)(q2, "class", "vc-table-col vc-table-col-4 vc-table-col-value vc-max-height-line"), (0, a.Ljt)(H2, "class", "vc-table-row vc-left-border vc-small"), (0, a.Ljt)(it2, "class", "vc-table-row-icon"), (0, a.Ljt)(ot2, "class", "vc-table-col vc-table-col-title"), (0, a.Ljt)(et2, "class", "vc-table-row vc-left-border"), (0, a.Ljt)(lt2, "class", "vc-table-col vc-max-height vc-min-height"), (0, a.Ljt)(lt2, "data-scrollable", "1"), (0, a.Ljt)(st2, "class", "vc-table-row vc-left-border vc-small"), (0, a.Ljt)(v2, "class", "vc-group-detail"), (0, a.Ljt)(n2, "slot", "item"), (0, a.Ljt)(n2, "class", "vc-group"), (0, a.Ljt)(n2, "id", vt2 = t2[10].id), (0, a.VHj)(n2, "vc-actived", t2[10].actived);
            }, m: function(t3, dt2) {
              (0, a.$Tr)(t3, n2, dt2), (0, a.R3I)(n2, e2), (0, a.R3I)(e2, o2), (0, a.R3I)(o2, r2), (0, a.R3I)(e2, i3), (0, a.R3I)(i3, c3), (0, a.R3I)(e2, u2), (0, a.R3I)(u2, s2), (0, a.R3I)(e2, l2), (0, a.R3I)(l2, f2), (0, a.R3I)(n2, d2), (0, a.R3I)(n2, v2), (0, a.R3I)(v2, p2), (0, a.R3I)(p2, h2), (0, a.R3I)(h2, g2), (0, a.R3I)(g2, m3), (0, a.R3I)(g2, _2), (0, a.yef)(b2, _2, null), (0, a.R3I)(p2, y2), (0, a.R3I)(p2, w2), (0, a.R3I)(w2, E2), (0, a.R3I)(w2, L2), (0, a.R3I)(w2, T2), (0, a.R3I)(T2, x2), (0, a.R3I)(p2, C2), (0, a.R3I)(p2, O2), (0, a.R3I)(O2, I2), (0, a.R3I)(O2, D2), (0, a.R3I)(O2, $2), (0, a.R3I)($2, R2), (0, a.R3I)(p2, k2), (0, a.R3I)(p2, P3), (0, a.R3I)(P3, M2), (0, a.R3I)(P3, S2), (0, a.R3I)(P3, j2), (0, a.R3I)(j2, B2), (0, a.R3I)(p2, A2), (0, a.R3I)(p2, U2), (0, a.R3I)(U2, G2), (0, a.R3I)(U2, N2), (0, a.R3I)(U2, V2), (0, a.R3I)(V2, W2), (0, a.R3I)(p2, K2), (0, a.R3I)(p2, H2), (0, a.R3I)(H2, F2), (0, a.R3I)(H2, Z2), (0, a.R3I)(H2, q2), (0, a.R3I)(q2, X2), (0, a.R3I)(v2, z2), It2 && It2.m(v2, null), (0, a.R3I)(v2, Y2), Dt2 && Dt2.m(v2, null), (0, a.R3I)(v2, J2), $t2 && $t2.m(v2, null), (0, a.R3I)(v2, Q2), Rt2 && Rt2.m(v2, null), (0, a.R3I)(v2, tt2), (0, a.R3I)(v2, nt2), (0, a.R3I)(nt2, et2), (0, a.R3I)(et2, ot2), (0, a.R3I)(ot2, rt2), (0, a.R3I)(ot2, it2), (0, a.yef)(at2, it2, null), (0, a.R3I)(nt2, ct2), kt2 && kt2.m(nt2, null), (0, a.R3I)(nt2, ut2), (0, a.R3I)(nt2, st2), (0, a.R3I)(st2, lt2), (0, a.R3I)(lt2, ft2), pt2 = true, ht2 || (gt2 = (0, a.oLt)(e2, "click", Ot2), ht2 = true);
            }, p: function(o3, i4) {
              t2 = o3, (!pt2 || 1024 & i4) && mt2 !== (mt2 = t2[10].name + "") && (0, a.rTO)(r2, mt2), (!pt2 || 1024 & i4) && _t2 !== (_t2 = t2[10].method + "") && (0, a.rTO)(c3, _t2), (!pt2 || 1024 & i4) && bt2 !== (bt2 = t2[10].statusText + "") && (0, a.rTO)(s2, bt2), (!pt2 || 1024 & i4) && yt2 !== (yt2 = t2[10].costTime + "") && (0, a.rTO)(f2, yt2), 1024 & i4 && (0, a.VHj)(e2, "vc-table-row-error", t2[10].status >= 400);
              var u3 = {};
              1024 & i4 && (u3.content = t2[10]), b2.$set(u3), (!pt2 || 1024 & i4) && wt2 !== (wt2 = t2[10].url + "") && (0, a.rTO)(x2, wt2), (!pt2 || 1024 & i4) && Et2 !== (Et2 = t2[10].method + "") && (0, a.rTO)(R2, Et2), (!pt2 || 1024 & i4) && Lt2 !== (Lt2 = t2[10].requestType + "") && (0, a.rTO)(B2, Lt2), (!pt2 || 1024 & i4) && Tt2 !== (Tt2 = t2[10].status + "") && (0, a.rTO)(W2, Tt2), (!pt2 || 1024 & i4) && xt2 !== (xt2 = t2[10].startTimeText + "") && (0, a.rTO)(X2, xt2), null !== t2[10].requestHeader ? It2 ? (It2.p(t2, i4), 1024 & i4 && (0, a.Ui)(It2, 1)) : ((It2 = po(t2)).c(), (0, a.Ui)(It2, 1), It2.m(v2, Y2)) : It2 && ((0, a.dvw)(), (0, a.etI)(It2, 1, 1, (function() {
                It2 = null;
              })), (0, a.gbL)()), null !== t2[10].getData ? Dt2 ? (Dt2.p(t2, i4), 1024 & i4 && (0, a.Ui)(Dt2, 1)) : ((Dt2 = go(t2)).c(), (0, a.Ui)(Dt2, 1), Dt2.m(v2, J2)) : Dt2 && ((0, a.dvw)(), (0, a.etI)(Dt2, 1, 1, (function() {
                Dt2 = null;
              })), (0, a.gbL)()), null !== t2[10].postData ? $t2 ? ($t2.p(t2, i4), 1024 & i4 && (0, a.Ui)($t2, 1)) : (($t2 = _o(t2)).c(), (0, a.Ui)($t2, 1), $t2.m(v2, Q2)) : $t2 && ((0, a.dvw)(), (0, a.etI)($t2, 1, 1, (function() {
                $t2 = null;
              })), (0, a.gbL)()), null !== t2[10].header ? Rt2 ? (Rt2.p(t2, i4), 1024 & i4 && (0, a.Ui)(Rt2, 1)) : ((Rt2 = Eo(t2)).c(), (0, a.Ui)(Rt2, 1), Rt2.m(v2, tt2)) : Rt2 && ((0, a.dvw)(), (0, a.etI)(Rt2, 1, 1, (function() {
                Rt2 = null;
              })), (0, a.gbL)());
              var l3 = {};
              1024 & i4 && (l3.content = t2[10].response), at2.$set(l3), t2[10].responseSize > 0 ? kt2 ? kt2.p(t2, i4) : ((kt2 = To(t2)).c(), kt2.m(nt2, ut2)) : kt2 && (kt2.d(1), kt2 = null), (!pt2 || 1024 & i4) && Ct2 !== (Ct2 = (t2[10].response || "") + "") && (0, a.rTO)(ft2, Ct2), (!pt2 || 1024 & i4 && vt2 !== (vt2 = t2[10].id)) && (0, a.Ljt)(n2, "id", vt2), 1024 & i4 && (0, a.VHj)(n2, "vc-actived", t2[10].actived);
            }, i: function(t3) {
              pt2 || ((0, a.Ui)(b2.$$.fragment, t3), (0, a.Ui)(It2), (0, a.Ui)(Dt2), (0, a.Ui)($t2), (0, a.Ui)(Rt2), (0, a.Ui)(at2.$$.fragment, t3), pt2 = true);
            }, o: function(t3) {
              (0, a.etI)(b2.$$.fragment, t3), (0, a.etI)(It2), (0, a.etI)(Dt2), (0, a.etI)($t2), (0, a.etI)(Rt2), (0, a.etI)(at2.$$.fragment, t3), pt2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(b2), It2 && It2.d(), Dt2 && Dt2.d(), $t2 && $t2.d(), Rt2 && Rt2.d(), (0, a.vpE)(at2), kt2 && kt2.d(), ht2 = false, gt2();
            } };
          }
          function Co(t2) {
            var n2, e2, o2, r2;
            return o2 = new he({ props: { items: t2[1], itemKey: "id", itemHeight: 30, buffer: 100, stickToBottom: true, scrollbar: true, $$slots: { item: [xo, function(t3) {
              return { 10: t3.item };
            }, function(t3) {
              return t3.item ? 1024 : 0;
            }], empty: [vo], header: [fo] }, $$scope: { ctx: t2 } } }), { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("div"), (0, a.YCL)(o2.$$.fragment), (0, a.Ljt)(e2, "class", "vc-plugin-content"), (0, a.Ljt)(n2, "class", "vc-table");
            }, m: function(t3, i3) {
              (0, a.$Tr)(t3, n2, i3), (0, a.R3I)(n2, e2), (0, a.yef)(o2, e2, null), r2 = true;
            }, p: function(t3, n3) {
              var e3 = n3[0], r3 = {};
              2 & e3 && (r3.items = t3[1]), 2098177 & e3 && (r3.$$scope = { dirty: e3, ctx: t3 }), o2.$set(r3);
            }, i: function(t3) {
              r2 || ((0, a.Ui)(o2.$$.fragment, t3), r2 = true);
            }, o: function(t3) {
              (0, a.etI)(o2.$$.fragment, t3), r2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(o2);
            } };
          }
          function Oo(t2, e2, o2) {
            var r2;
            (0, a.FIv)(t2, Je, (function(t3) {
              return o2(6, r2 = t3);
            }));
            var i3 = 0, u2 = function(t3) {
              o2(0, i3 = Object.keys(t3).length);
            }, s2 = Je.subscribe(u2);
            u2(r2);
            var l2 = [], f2 = function(t3) {
              (0, a.fxP)(Je, r2[t3].actived = !r2[t3].actived, r2);
            };
            (0, c2.H3)((function() {
              io.use();
            })), (0, c2.ev)((function() {
              s2(), io.unuse();
            }));
            return t2.$$.update = function() {
              64 & t2.$$.dirty && o2(1, l2 = Object.values(r2));
            }, [i3, l2, f2, function(t3) {
              var e3 = "curl -X " + t3.method;
              return "string" == typeof t3.postData ? e3 += " -d '" + t3.postData + "'" : "object" == typeof t3.postData && null !== t3.postData && (e3 += " -d '" + n.hZ(t3.postData) + "'"), e3 + " '" + t3.url + "'";
            }, function(t3) {
              return n.Kn(t3) || n.kJ(t3) ? n.hZ(t3, { maxDepth: 10, keyMaxLen: 1e4, pretty: true }) : t3;
            }, { fixedHeight: true }, r2, function(t3) {
              return f2(t3.id);
            }];
          }
          var Io = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, Oo, Co, a.N8, { options: 5 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "options", get: function() {
              return this.$$.ctx[5];
            } }]), e2;
          })(a.f_C), Do = Io, $o = (function(t2) {
            function n2() {
              for (var n3, e3 = arguments.length, o2 = new Array(e3), r2 = 0; r2 < e3; r2++) o2[r2] = arguments[r2];
              return (n3 = t2.call.apply(t2, [this].concat(o2)) || this).model = Qe.getSingleton(Qe, "VConsoleNetworkModel"), n3;
            }
            (0, i2.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.add = function(t3) {
              var n3 = new Ue(new Ae());
              for (var e3 in t3) n3[e3] = t3[e3];
              return n3.startTime = n3.startTime || Date.now(), n3.requestType = n3.requestType || "custom", this.model.updateRequest(n3.id, n3), n3;
            }, e2.update = function(t3, n3) {
              this.model.updateRequest(t3, n3);
            }, e2.clear = function() {
              this.model.clearLog();
            }, n2;
          })(xe), Ro = (function(t2) {
            function n2(n3, e3, o2) {
              var r2;
              return void 0 === o2 && (o2 = {}), (r2 = t2.call(this, n3, e3, Do, o2) || this).model = Qe.getSingleton(Qe, "VConsoleNetworkModel"), r2.exporter = void 0, r2.exporter = new $o(n3), r2;
            }
            (0, i2.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.onReady = function() {
              t2.prototype.onReady.call(this), this.onUpdateOption();
            }, e2.onAddTool = function(t3) {
              var n3 = this;
              t3([{ name: "Clear", global: false, onClick: function(t4) {
                n3.model.clearLog();
              } }]);
            }, e2.onRemove = function() {
              t2.prototype.onRemove.call(this), this.model && this.model.unMock();
            }, e2.onUpdateOption = function() {
              var t3, n3, e3;
              (null == (t3 = this.vConsole.option.network) ? void 0 : t3.maxNetworkNumber) !== this.model.maxNetworkNumber && (this.model.maxNetworkNumber = Number(null == (e3 = this.vConsole.option.network) ? void 0 : e3.maxNetworkNumber) || 1e3);
              null != (n3 = this.vConsole.option.network) && n3.ignoreUrlRegExp && (this.model.ignoreUrlRegExp = this.vConsole.option.network.ignoreUrlRegExp);
            }, n2;
          })(it), ko = __webpack_require__(8679), Po = __webpack_require__.n(ko), Mo = (0, $e.fZ)(), So = (0, $e.fZ)(), jo = __webpack_require__(5670), Bo = {};
          jo.Z && jo.Z.locals && (Bo.locals = jo.Z.locals);
          var Ao, Uo = 0, Go = {};
          Go.styleTagTransform = b(), Go.setAttributes = h(), Go.insert = v().bind(null, "head"), Go.domAPI = f(), Go.insertStyleElement = m2(), Bo.use = function(t2) {
            return Go.options = t2 || {}, Uo++ || (Ao = s()(jo.Z, Go)), Bo;
          }, Bo.unuse = function() {
            Uo > 0 && !--Uo && (Ao(), Ao = null);
          };
          var No = Bo;
          function Vo(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[8] = n2[e2], o2;
          }
          function Wo(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[11] = n2[e2], o2;
          }
          function Ko(t2) {
            var n2, e2, o2, r2 = t2[0].nodeType === Node.ELEMENT_NODE && Ho(t2), i3 = t2[0].nodeType === Node.TEXT_NODE && er(t2);
            return { c: function() {
              n2 = (0, a.bGB)("div"), r2 && r2.c(), e2 = (0, a.DhX)(), i3 && i3.c(), (0, a.Ljt)(n2, "class", "vcelm-l"), (0, a.VHj)(n2, "vc-actived", t2[0]._isActived), (0, a.VHj)(n2, "vc-toggle", t2[0]._isExpand), (0, a.VHj)(n2, "vcelm-noc", t2[0]._isSingleLine);
            }, m: function(t3, c3) {
              (0, a.$Tr)(t3, n2, c3), r2 && r2.m(n2, null), (0, a.R3I)(n2, e2), i3 && i3.m(n2, null), o2 = true;
            }, p: function(t3, o3) {
              t3[0].nodeType === Node.ELEMENT_NODE ? r2 ? (r2.p(t3, o3), 1 & o3 && (0, a.Ui)(r2, 1)) : ((r2 = Ho(t3)).c(), (0, a.Ui)(r2, 1), r2.m(n2, e2)) : r2 && ((0, a.dvw)(), (0, a.etI)(r2, 1, 1, (function() {
                r2 = null;
              })), (0, a.gbL)()), t3[0].nodeType === Node.TEXT_NODE ? i3 ? i3.p(t3, o3) : ((i3 = er(t3)).c(), i3.m(n2, null)) : i3 && (i3.d(1), i3 = null), 1 & o3 && (0, a.VHj)(n2, "vc-actived", t3[0]._isActived), 1 & o3 && (0, a.VHj)(n2, "vc-toggle", t3[0]._isExpand), 1 & o3 && (0, a.VHj)(n2, "vcelm-noc", t3[0]._isSingleLine);
            }, i: function(t3) {
              o2 || ((0, a.Ui)(r2), o2 = true);
            }, o: function(t3) {
              (0, a.etI)(r2), o2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), r2 && r2.d(), i3 && i3.d();
            } };
          }
          function Ho(t2) {
            var n2, e2, o2, r2, i3, c3, u2, s2, l2, f2, d2 = t2[0].nodeName + "", v2 = (t2[0].className || t2[0].attributes.length) && Fo(t2), p2 = t2[0]._isNullEndTag && zo(), h2 = t2[0].childNodes.length > 0 && Yo(t2), g2 = !t2[0]._isNullEndTag && nr(t2);
            return { c: function() {
              n2 = (0, a.bGB)("span"), e2 = (0, a.fLW)("<"), o2 = (0, a.fLW)(d2), v2 && v2.c(), r2 = (0, a.cSb)(), p2 && p2.c(), i3 = (0, a.fLW)(">"), h2 && h2.c(), c3 = (0, a.cSb)(), g2 && g2.c(), u2 = (0, a.cSb)(), (0, a.Ljt)(n2, "class", "vcelm-node");
            }, m: function(d3, m3) {
              (0, a.$Tr)(d3, n2, m3), (0, a.R3I)(n2, e2), (0, a.R3I)(n2, o2), v2 && v2.m(n2, null), (0, a.R3I)(n2, r2), p2 && p2.m(n2, null), (0, a.R3I)(n2, i3), h2 && h2.m(d3, m3), (0, a.$Tr)(d3, c3, m3), g2 && g2.m(d3, m3), (0, a.$Tr)(d3, u2, m3), s2 = true, l2 || (f2 = (0, a.oLt)(n2, "click", t2[2]), l2 = true);
            }, p: function(t3, e3) {
              (!s2 || 1 & e3) && d2 !== (d2 = t3[0].nodeName + "") && (0, a.rTO)(o2, d2), t3[0].className || t3[0].attributes.length ? v2 ? v2.p(t3, e3) : ((v2 = Fo(t3)).c(), v2.m(n2, r2)) : v2 && (v2.d(1), v2 = null), t3[0]._isNullEndTag ? p2 || ((p2 = zo()).c(), p2.m(n2, i3)) : p2 && (p2.d(1), p2 = null), t3[0].childNodes.length > 0 ? h2 ? (h2.p(t3, e3), 1 & e3 && (0, a.Ui)(h2, 1)) : ((h2 = Yo(t3)).c(), (0, a.Ui)(h2, 1), h2.m(c3.parentNode, c3)) : h2 && ((0, a.dvw)(), (0, a.etI)(h2, 1, 1, (function() {
                h2 = null;
              })), (0, a.gbL)()), t3[0]._isNullEndTag ? g2 && (g2.d(1), g2 = null) : g2 ? g2.p(t3, e3) : ((g2 = nr(t3)).c(), g2.m(u2.parentNode, u2));
            }, i: function(t3) {
              s2 || ((0, a.Ui)(h2), s2 = true);
            }, o: function(t3) {
              (0, a.etI)(h2), s2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), v2 && v2.d(), p2 && p2.d(), h2 && h2.d(t3), t3 && (0, a.ogt)(c3), g2 && g2.d(t3), t3 && (0, a.ogt)(u2), l2 = false, f2();
            } };
          }
          function Fo(t2) {
            for (var n2, e2 = t2[0].attributes, o2 = [], r2 = 0; r2 < e2.length; r2 += 1) o2[r2] = Xo(Wo(t2, e2, r2));
            return { c: function() {
              n2 = (0, a.bGB)("i");
              for (var t3 = 0; t3 < o2.length; t3 += 1) o2[t3].c();
              (0, a.Ljt)(n2, "class", "vcelm-k");
            }, m: function(t3, e3) {
              (0, a.$Tr)(t3, n2, e3);
              for (var r3 = 0; r3 < o2.length; r3 += 1) o2[r3].m(n2, null);
            }, p: function(t3, r3) {
              if (1 & r3) {
                var i3;
                for (e2 = t3[0].attributes, i3 = 0; i3 < e2.length; i3 += 1) {
                  var a2 = Wo(t3, e2, i3);
                  o2[i3] ? o2[i3].p(a2, r3) : (o2[i3] = Xo(a2), o2[i3].c(), o2[i3].m(n2, null));
                }
                for (; i3 < o2.length; i3 += 1) o2[i3].d(1);
                o2.length = e2.length;
              }
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.RMB)(o2, t3);
            } };
          }
          function Zo(t2) {
            var n2, e2 = t2[11].name + "";
            return { c: function() {
              n2 = (0, a.fLW)(e2);
            }, m: function(t3, e3) {
              (0, a.$Tr)(t3, n2, e3);
            }, p: function(t3, o2) {
              1 & o2 && e2 !== (e2 = t3[11].name + "") && (0, a.rTO)(n2, e2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function qo(t2) {
            var n2, e2, o2, r2, i3, c3 = t2[11].name + "", u2 = t2[11].value + "";
            return { c: function() {
              n2 = (0, a.fLW)(c3), e2 = (0, a.fLW)('="'), o2 = (0, a.bGB)("i"), r2 = (0, a.fLW)(u2), i3 = (0, a.fLW)('"'), (0, a.Ljt)(o2, "class", "vcelm-v");
            }, m: function(t3, c4) {
              (0, a.$Tr)(t3, n2, c4), (0, a.$Tr)(t3, e2, c4), (0, a.$Tr)(t3, o2, c4), (0, a.R3I)(o2, r2), (0, a.$Tr)(t3, i3, c4);
            }, p: function(t3, e3) {
              1 & e3 && c3 !== (c3 = t3[11].name + "") && (0, a.rTO)(n2, c3), 1 & e3 && u2 !== (u2 = t3[11].value + "") && (0, a.rTO)(r2, u2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), t3 && (0, a.ogt)(e2), t3 && (0, a.ogt)(o2), t3 && (0, a.ogt)(i3);
            } };
          }
          function Xo(t2) {
            var n2, e2;
            function o2(t3, n3) {
              return "" !== t3[11].value ? qo : Zo;
            }
            var r2 = o2(t2), i3 = r2(t2);
            return { c: function() {
              n2 = (0, a.fLW)(" \n            "), i3.c(), e2 = (0, a.cSb)();
            }, m: function(t3, o3) {
              (0, a.$Tr)(t3, n2, o3), i3.m(t3, o3), (0, a.$Tr)(t3, e2, o3);
            }, p: function(t3, n3) {
              r2 === (r2 = o2(t3)) && i3 ? i3.p(t3, n3) : (i3.d(1), (i3 = r2(t3)) && (i3.c(), i3.m(e2.parentNode, e2)));
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), i3.d(t3), t3 && (0, a.ogt)(e2);
            } };
          }
          function zo(t2) {
            var n2;
            return { c: function() {
              n2 = (0, a.fLW)("/");
            }, m: function(t3, e2) {
              (0, a.$Tr)(t3, n2, e2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function Yo(t2) {
            var n2, e2, o2, r2, i3 = [Qo, Jo], c3 = [];
            function u2(t3, n3) {
              return t3[0]._isExpand ? 1 : 0;
            }
            return n2 = u2(t2), e2 = c3[n2] = i3[n2](t2), { c: function() {
              e2.c(), o2 = (0, a.cSb)();
            }, m: function(t3, e3) {
              c3[n2].m(t3, e3), (0, a.$Tr)(t3, o2, e3), r2 = true;
            }, p: function(t3, r3) {
              var s2 = n2;
              (n2 = u2(t3)) === s2 ? c3[n2].p(t3, r3) : ((0, a.dvw)(), (0, a.etI)(c3[s2], 1, 1, (function() {
                c3[s2] = null;
              })), (0, a.gbL)(), (e2 = c3[n2]) ? e2.p(t3, r3) : (e2 = c3[n2] = i3[n2](t3)).c(), (0, a.Ui)(e2, 1), e2.m(o2.parentNode, o2));
            }, i: function(t3) {
              r2 || ((0, a.Ui)(e2), r2 = true);
            }, o: function(t3) {
              (0, a.etI)(e2), r2 = false;
            }, d: function(t3) {
              c3[n2].d(t3), t3 && (0, a.ogt)(o2);
            } };
          }
          function Jo(t2) {
            for (var n2, e2, o2 = t2[0].childNodes, r2 = [], i3 = 0; i3 < o2.length; i3 += 1) r2[i3] = tr(Vo(t2, o2, i3));
            var c3 = function(t3) {
              return (0, a.etI)(r2[t3], 1, 1, (function() {
                r2[t3] = null;
              }));
            };
            return { c: function() {
              for (var t3 = 0; t3 < r2.length; t3 += 1) r2[t3].c();
              n2 = (0, a.cSb)();
            }, m: function(t3, o3) {
              for (var i4 = 0; i4 < r2.length; i4 += 1) r2[i4].m(t3, o3);
              (0, a.$Tr)(t3, n2, o3), e2 = true;
            }, p: function(t3, e3) {
              if (1 & e3) {
                var i4;
                for (o2 = t3[0].childNodes, i4 = 0; i4 < o2.length; i4 += 1) {
                  var u2 = Vo(t3, o2, i4);
                  r2[i4] ? (r2[i4].p(u2, e3), (0, a.Ui)(r2[i4], 1)) : (r2[i4] = tr(u2), r2[i4].c(), (0, a.Ui)(r2[i4], 1), r2[i4].m(n2.parentNode, n2));
                }
                for ((0, a.dvw)(), i4 = o2.length; i4 < r2.length; i4 += 1) c3(i4);
                (0, a.gbL)();
              }
            }, i: function(t3) {
              if (!e2) {
                for (var n3 = 0; n3 < o2.length; n3 += 1) (0, a.Ui)(r2[n3]);
                e2 = true;
              }
            }, o: function(t3) {
              r2 = r2.filter(Boolean);
              for (var n3 = 0; n3 < r2.length; n3 += 1) (0, a.etI)(r2[n3]);
              e2 = false;
            }, d: function(t3) {
              (0, a.RMB)(r2, t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function Qo(t2) {
            var n2;
            return { c: function() {
              n2 = (0, a.fLW)("...");
            }, m: function(t3, e2) {
              (0, a.$Tr)(t3, n2, e2);
            }, p: a.ZTd, i: a.ZTd, o: a.ZTd, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function tr(t2) {
            var n2, e2, o2;
            return (n2 = new ir({ props: { node: t2[8] } })).$on("toggleNode", t2[4]), { c: function() {
              (0, a.YCL)(n2.$$.fragment), e2 = (0, a.DhX)();
            }, m: function(t3, r2) {
              (0, a.yef)(n2, t3, r2), (0, a.$Tr)(t3, e2, r2), o2 = true;
            }, p: function(t3, e3) {
              var o3 = {};
              1 & e3 && (o3.node = t3[8]), n2.$set(o3);
            }, i: function(t3) {
              o2 || ((0, a.Ui)(n2.$$.fragment, t3), o2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), o2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3), t3 && (0, a.ogt)(e2);
            } };
          }
          function nr(t2) {
            var n2, e2, o2, r2, i3 = t2[0].nodeName + "";
            return { c: function() {
              n2 = (0, a.bGB)("span"), e2 = (0, a.fLW)("</"), o2 = (0, a.fLW)(i3), r2 = (0, a.fLW)(">"), (0, a.Ljt)(n2, "class", "vcelm-node");
            }, m: function(t3, i4) {
              (0, a.$Tr)(t3, n2, i4), (0, a.R3I)(n2, e2), (0, a.R3I)(n2, o2), (0, a.R3I)(n2, r2);
            }, p: function(t3, n3) {
              1 & n3 && i3 !== (i3 = t3[0].nodeName + "") && (0, a.rTO)(o2, i3);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function er(t2) {
            var n2, e2, o2 = t2[1](t2[0].textContent) + "";
            return { c: function() {
              n2 = (0, a.bGB)("span"), e2 = (0, a.fLW)(o2), (0, a.Ljt)(n2, "class", "vcelm-t vcelm-noc");
            }, m: function(t3, o3) {
              (0, a.$Tr)(t3, n2, o3), (0, a.R3I)(n2, e2);
            }, p: function(t3, n3) {
              1 & n3 && o2 !== (o2 = t3[1](t3[0].textContent) + "") && (0, a.rTO)(e2, o2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function or(t2) {
            var n2, e2, o2 = t2[0] && Ko(t2);
            return { c: function() {
              o2 && o2.c(), n2 = (0, a.cSb)();
            }, m: function(t3, r2) {
              o2 && o2.m(t3, r2), (0, a.$Tr)(t3, n2, r2), e2 = true;
            }, p: function(t3, e3) {
              var r2 = e3[0];
              t3[0] ? o2 ? (o2.p(t3, r2), 1 & r2 && (0, a.Ui)(o2, 1)) : ((o2 = Ko(t3)).c(), (0, a.Ui)(o2, 1), o2.m(n2.parentNode, n2)) : o2 && ((0, a.dvw)(), (0, a.etI)(o2, 1, 1, (function() {
                o2 = null;
              })), (0, a.gbL)());
            }, i: function(t3) {
              e2 || ((0, a.Ui)(o2), e2 = true);
            }, o: function(t3) {
              (0, a.etI)(o2), e2 = false;
            }, d: function(t3) {
              o2 && o2.d(t3), t3 && (0, a.ogt)(n2);
            } };
          }
          function rr(t2, n2, e2) {
            var o2;
            (0, a.FIv)(t2, So, (function(t3) {
              return e2(3, o2 = t3);
            }));
            var r2 = n2.node, i3 = (0, c2.x)(), u2 = ["br", "hr", "img", "input", "link", "meta"];
            (0, c2.H3)((function() {
              No.use();
            })), (0, c2.ev)((function() {
              No.unuse();
            }));
            return t2.$$set = function(t3) {
              "node" in t3 && e2(0, r2 = t3.node);
            }, t2.$$.update = function() {
              9 & t2.$$.dirty && r2 && (e2(0, r2._isActived = r2 === o2, r2), e2(0, r2._isNullEndTag = (function(t3) {
                return u2.indexOf(t3.nodeName) > -1;
              })(r2), r2), e2(0, r2._isSingleLine = 0 === r2.childNodes.length || r2._isNullEndTag, r2));
            }, [r2, function(t3) {
              return t3.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            }, function() {
              r2._isNullEndTag || (e2(0, r2._isExpand = !r2._isExpand, r2), i3("toggleNode", { node: r2 }));
            }, o2, function(n3) {
              a.cKT.call(this, t2, n3);
            }];
          }
          var ir = (function(n2) {
            function e2(t2) {
              var e3;
              return e3 = n2.call(this) || this, (0, a.S1n)((0, r.Z)(e3), t2, rr, or, a.N8, { node: 0 }), e3;
            }
            return (0, i2.Z)(e2, n2), (0, t.Z)(e2, [{ key: "node", get: function() {
              return this.$$.ctx[0];
            }, set: function(t2) {
              this.$$set({ node: t2 }), (0, a.yl1)();
            } }]), e2;
          })(a.f_C), ar = ir;
          function cr(t2) {
            var n2, e2, o2;
            return (e2 = new ar({ props: { node: t2[0] } })).$on("toggleNode", t2[1]), { c: function() {
              n2 = (0, a.bGB)("div"), (0, a.YCL)(e2.$$.fragment), (0, a.Ljt)(n2, "class", "vc-plugin-content");
            }, m: function(t3, r2) {
              (0, a.$Tr)(t3, n2, r2), (0, a.yef)(e2, n2, null), o2 = true;
            }, p: function(t3, n3) {
              var o3 = {};
              1 & n3[0] && (o3.node = t3[0]), e2.$set(o3);
            }, i: function(t3) {
              o2 || ((0, a.Ui)(e2.$$.fragment, t3), o2 = true);
            }, o: function(t3) {
              (0, a.etI)(e2.$$.fragment, t3), o2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.vpE)(e2);
            } };
          }
          function ur(t2, n2, e2) {
            var o2;
            return (0, a.FIv)(t2, Mo, (function(t3) {
              return e2(0, o2 = t3);
            })), [o2, function(n3) {
              a.cKT.call(this, t2, n3);
            }];
          }
          var sr = (function(t2) {
            function n2(n3) {
              var e2;
              return e2 = t2.call(this) || this, (0, a.S1n)((0, r.Z)(e2), n3, ur, cr, a.N8, {}), e2;
            }
            return (0, i2.Z)(n2, t2), n2;
          })(a.f_C), lr = sr, fr = (function(t2) {
            function n2(n3, e3, o2) {
              var r2;
              return void 0 === o2 && (o2 = {}), (r2 = t2.call(this, n3, e3, lr, o2) || this).isInited = false, r2.observer = void 0, r2.nodeMap = void 0, r2;
            }
            (0, i2.Z)(n2, t2);
            var e2 = n2.prototype;
            return e2.onShow = function() {
              this.isInited || this._init();
            }, e2.onRemove = function() {
              t2.prototype.onRemove.call(this), this.isInited && (this.observer.disconnect(), this.isInited = false, this.nodeMap = void 0, Mo.set(void 0));
            }, e2.onAddTool = function(t3) {
              var n3 = this;
              t3([{ name: "Expand", global: false, onClick: function(t4) {
                n3._expandActivedNode();
              } }, { name: "Collapse", global: false, onClick: function(t4) {
                n3._collapseActivedNode();
              } }]);
            }, e2._init = function() {
              var t3 = this;
              this.isInited = true, this.nodeMap = /* @__PURE__ */ new WeakMap();
              var n3 = this._generateVNode(document.documentElement);
              n3._isExpand = true, So.set(n3), Mo.set(n3), this.compInstance.$on("toggleNode", (function(t4) {
                So.set(t4.detail.node);
              })), this.observer = new (Po())((function(n4) {
                for (var e3 = 0; e3 < n4.length; e3++) {
                  var o2 = n4[e3];
                  t3._isInVConsole(o2.target) || t3._handleMutation(o2);
                }
              })), this.observer.observe(document.documentElement, { attributes: true, childList: true, characterData: true, subtree: true });
            }, e2._handleMutation = function(t3) {
              switch (t3.type) {
                case "childList":
                  t3.removedNodes.length > 0 && this._onChildRemove(t3), t3.addedNodes.length > 0 && this._onChildAdd(t3);
                  break;
                case "attributes":
                  this._onAttributesChange(t3);
                  break;
                case "characterData":
                  this._onCharacterDataChange(t3);
              }
            }, e2._onChildRemove = function(t3) {
              var n3 = this.nodeMap.get(t3.target);
              if (n3) {
                for (var e3 = 0; e3 < t3.removedNodes.length; e3++) {
                  var o2 = this.nodeMap.get(t3.removedNodes[e3]);
                  if (o2) {
                    for (var r2 = 0; r2 < n3.childNodes.length; r2++) if (n3.childNodes[r2] === o2) {
                      n3.childNodes.splice(r2, 1);
                      break;
                    }
                    this.nodeMap.delete(t3.removedNodes[e3]);
                  }
                }
                this._refreshStore();
              }
            }, e2._onChildAdd = function(t3) {
              var n3 = this.nodeMap.get(t3.target);
              if (n3) {
                for (var e3 = 0; e3 < t3.addedNodes.length; e3++) {
                  var o2 = t3.addedNodes[e3], r2 = this._generateVNode(o2);
                  if (r2) {
                    var i3 = void 0, a2 = o2;
                    do {
                      if (null === a2.nextSibling) break;
                      a2.nodeType === Node.ELEMENT_NODE && (i3 = this.nodeMap.get(a2.nextSibling) || void 0), a2 = a2.nextSibling;
                    } while (void 0 === i3);
                    if (void 0 === i3) n3.childNodes.push(r2);
                    else for (var c3 = 0; c3 < n3.childNodes.length; c3++) if (n3.childNodes[c3] === i3) {
                      n3.childNodes.splice(c3, 0, r2);
                      break;
                    }
                  }
                }
                this._refreshStore();
              }
            }, e2._onAttributesChange = function(t3) {
              this._updateVNodeAttributes(t3.target), this._refreshStore();
            }, e2._onCharacterDataChange = function(t3) {
              var n3 = this.nodeMap.get(t3.target);
              n3 && (n3.textContent = t3.target.textContent, this._refreshStore());
            }, e2._generateVNode = function(t3) {
              if (!this._isIgnoredNode(t3)) {
                var n3 = { nodeType: t3.nodeType, nodeName: t3.nodeName.toLowerCase(), textContent: "", id: "", className: "", attributes: [], childNodes: [] };
                if (this.nodeMap.set(t3, n3), n3.nodeType != t3.TEXT_NODE && n3.nodeType != t3.DOCUMENT_TYPE_NODE || (n3.textContent = t3.textContent), t3.childNodes.length > 0) {
                  n3.childNodes = [];
                  for (var e3 = 0; e3 < t3.childNodes.length; e3++) {
                    var o2 = this._generateVNode(t3.childNodes[e3]);
                    o2 && n3.childNodes.push(o2);
                  }
                }
                return this._updateVNodeAttributes(t3), n3;
              }
            }, e2._updateVNodeAttributes = function(t3) {
              var n3 = this.nodeMap.get(t3);
              if (n3 && t3 instanceof Element && (n3.id = t3.id || "", n3.className = t3.className || "", t3.hasAttributes && t3.hasAttributes())) {
                n3.attributes = [];
                for (var e3 = 0; e3 < t3.attributes.length; e3++) n3.attributes.push({ name: t3.attributes[e3].name, value: t3.attributes[e3].value || "" });
              }
            }, e2._expandActivedNode = function() {
              var t3 = (0, $e.U2)(So);
              if (t3._isExpand) for (var n3 = 0; n3 < t3.childNodes.length; n3++) t3.childNodes[n3]._isExpand = true;
              else t3._isExpand = true;
              this._refreshStore();
            }, e2._collapseActivedNode = function() {
              var t3 = (0, $e.U2)(So);
              if (t3._isExpand) {
                for (var n3 = false, e3 = 0; e3 < t3.childNodes.length; e3++) t3.childNodes[e3]._isExpand && (n3 = true, t3.childNodes[e3]._isExpand = false);
                n3 || (t3._isExpand = false), this._refreshStore();
              }
            }, e2._isIgnoredNode = function(t3) {
              if (t3.nodeType === t3.TEXT_NODE) {
                if ("" === t3.textContent.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$|\n+/g, "")) return true;
              } else if (t3.nodeType === t3.COMMENT_NODE) return true;
              return false;
            }, e2._isInVConsole = function(t3) {
              for (var n3 = t3; void 0 !== n3; ) {
                if ("__vconsole" == n3.id) return true;
                n3 = n3.parentElement || void 0;
              }
              return false;
            }, e2._refreshStore = function() {
              Mo.update((function(t3) {
                return t3;
              }));
            }, n2;
          })(it);
          function dr(t2, n2, e2, o2, r2, i3, a2) {
            try {
              var c3 = t2[i3](a2), u2 = c3.value;
            } catch (t3) {
              return void e2(t3);
            }
            c3.done ? n2(u2) : Promise.resolve(u2).then(o2, r2);
          }
          function vr(t2) {
            return function() {
              var n2 = this, e2 = arguments;
              return new Promise((function(o2, r2) {
                var i3 = t2.apply(n2, e2);
                function a2(t3) {
                  dr(i3, o2, r2, a2, c3, "next", t3);
                }
                function c3(t3) {
                  dr(i3, o2, r2, a2, c3, "throw", t3);
                }
                a2(void 0);
              }));
            };
          }
          var pr = __webpack_require__(8270);
          function hr(t2, n2) {
            var e2 = Object.keys(t2);
            if (Object.getOwnPropertySymbols) {
              var o2 = Object.getOwnPropertySymbols(t2);
              n2 && (o2 = o2.filter((function(n3) {
                return Object.getOwnPropertyDescriptor(t2, n3).enumerable;
              }))), e2.push.apply(e2, o2);
            }
            return e2;
          }
          function gr(t2) {
            for (var n2 = 1; n2 < arguments.length; n2++) {
              var e2 = null != arguments[n2] ? arguments[n2] : {};
              n2 % 2 ? hr(Object(e2), true).forEach((function(n3) {
                (0, pr.Z)(t2, n3, e2[n3]);
              })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(e2)) : hr(Object(e2)).forEach((function(n3) {
                Object.defineProperty(t2, n3, Object.getOwnPropertyDescriptor(e2, n3));
              }));
            }
            return t2;
          }
          var mr = function(t2) {
            if (!t2 || 0 === t2.length) return {};
            for (var n2 = {}, e2 = t2.split(";"), o2 = 0; o2 < e2.length; o2++) {
              var r2 = e2[o2].indexOf("=");
              if (!(r2 < 0)) {
                var i3 = e2[o2].substring(0, r2).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), a2 = e2[o2].substring(r2 + 1, e2[o2].length);
                try {
                  i3 = decodeURIComponent(i3);
                } catch (t3) {
                }
                try {
                  a2 = decodeURIComponent(a2);
                } catch (t3) {
                }
                n2[i3] = a2;
              }
            }
            return n2;
          }, _r = function(t2, n2, e2) {
            "undefined" != typeof document && void 0 !== document.cookie && (document.cookie = encodeURIComponent(t2) + "=" + encodeURIComponent(n2) + (function(t3) {
              void 0 === t3 && (t3 = {});
              var n3 = t3, e3 = n3.path, o2 = n3.domain, r2 = n3.expires, i3 = n3.secure, a2 = n3.sameSite, c3 = ["none", "lax", "strict"].indexOf((a2 || "").toLowerCase()) > -1 ? a2 : null;
              return [null == e3 ? "" : ";path=" + e3, null == o2 ? "" : ";domain=" + o2, null == r2 ? "" : ";expires=" + r2.toUTCString(), void 0 === i3 || false === i3 ? "" : ";secure", null === c3 ? "" : ";SameSite=" + c3].join("");
            })(e2));
          }, br = function() {
            return "undefined" == typeof document || void 0 === document.cookie ? "" : document.cookie;
          }, yr = (function() {
            function n2() {
            }
            var e2 = n2.prototype;
            return e2.key = function(t2) {
              return t2 < this.keys.length ? this.keys[t2] : null;
            }, e2.setItem = function(t2, n3, e3) {
              _r(t2, n3, e3);
            }, e2.getItem = function(t2) {
              var n3 = mr(br());
              return Object.prototype.hasOwnProperty.call(n3, t2) ? n3[t2] : null;
            }, e2.removeItem = function(t2, n3) {
              for (var e3, o2, r2 = ["", "/"], i3 = (null == (e3 = location) || null == (o2 = e3.hostname) ? void 0 : o2.split(".")) || []; i3.length > 1; ) r2.push(i3.join(".")), i3.shift();
              for (var a2 = 0; a2 < r2.length; a2++) for (var c3, u2, s2 = (null == (c3 = location) || null == (u2 = c3.pathname) ? void 0 : u2.split("/")) || [], l2 = ""; s2.length > 0; ) {
                l2 += ("/" === l2 ? "" : "/") + s2.shift();
                var f2 = gr(gr({}, n3), {}, { path: l2, domain: r2[a2], expires: /* @__PURE__ */ new Date(0) });
                _r(t2, "", f2);
              }
            }, e2.clear = function() {
              for (var t2 = [].concat(this.keys), n3 = 0; n3 < t2.length; n3++) this.removeItem(t2[n3]);
            }, (0, t.Z)(n2, [{ key: "length", get: function() {
              return this.keys.length;
            } }, { key: "keys", get: function() {
              var t2 = mr(br());
              return Object.keys(t2).sort();
            } }]), n2;
          })(), wr = (function() {
            function e2() {
              this.keys = [], this.currentSize = 0, this.limitSize = 0;
            }
            var o2 = e2.prototype;
            return o2.key = function(t2) {
              return t2 < this.keys.length ? this.keys[t2] : null;
            }, o2.prepare = (function() {
              var t2 = vr(En().mark((function t3() {
                var e3 = this;
                return En().wrap((function(t4) {
                  for (; ; ) switch (t4.prev = t4.next) {
                    case 0:
                      return t4.abrupt("return", new Promise((function(t5, o3) {
                        (0, n.qt)("getStorageInfo", { success: function(n2) {
                          e3.keys = n2 ? n2.keys.sort() : [], e3.currentSize = n2 ? n2.currentSize : 0, e3.limitSize = n2 ? n2.limitSize : 0, t5(true);
                        }, fail: function() {
                          o3(false);
                        } });
                      })));
                    case 1:
                    case "end":
                      return t4.stop();
                  }
                }), t3);
              })));
              return function() {
                return t2.apply(this, arguments);
              };
            })(), o2.getItem = function(t2) {
              return new Promise((function(e3, o3) {
                (0, n.qt)("getStorage", { key: t2, success: function(t3) {
                  var n2 = t3.data;
                  if ("object" == typeof t3.data) try {
                    n2 = JSON.stringify(t3.data);
                  } catch (t4) {
                  }
                  e3(n2);
                }, fail: function(t3) {
                  o3(t3);
                } });
              }));
            }, o2.setItem = function(t2, e3) {
              return new Promise((function(o3, r2) {
                (0, n.qt)("setStorage", { key: t2, data: e3, success: function(t3) {
                  o3(t3);
                }, fail: function(t3) {
                  r2(t3);
                } });
              }));
            }, o2.removeItem = function(t2) {
              return new Promise((function(e3, o3) {
                (0, n.qt)("removeStorage", { key: t2, success: function(t3) {
                  e3(t3);
                }, fail: function(t3) {
                  o3(t3);
                } });
              }));
            }, o2.clear = function() {
              return new Promise((function(t2, e3) {
                (0, n.qt)("clearStorage", { success: function(n2) {
                  t2(n2);
                }, fail: function(t3) {
                  e3(t3);
                } });
              }));
            }, (0, t.Z)(e2, [{ key: "length", get: function() {
              return this.keys.length;
            } }]), e2;
          })(), Er = { updateTime: (0, $e.fZ)(0), activedName: (0, $e.fZ)(null), defaultStorages: (0, $e.fZ)(["cookies", "localStorage", "sessionStorage"]) }, Lr = (function(e2) {
            function o2() {
              var t2;
              return (t2 = e2.call(this) || this).storage = /* @__PURE__ */ new Map(), Er.activedName.subscribe((function(t3) {
                var n2 = (0, $e.U2)(Er.defaultStorages);
                n2.length > 0 && -1 === n2.indexOf(t3) && Er.activedName.set(n2[0]);
              })), Er.defaultStorages.subscribe((function(n2) {
                -1 === n2.indexOf((0, $e.U2)(Er.activedName)) && Er.activedName.set(n2[0]), t2.updateEnabledStorages();
              })), t2;
            }
            (0, i2.Z)(o2, e2);
            var r2 = o2.prototype;
            return r2.getItem = (function() {
              var t2 = vr(En().mark((function t3(n2) {
                return En().wrap((function(t4) {
                  for (; ; ) switch (t4.prev = t4.next) {
                    case 0:
                      if (this.activedStorage) {
                        t4.next = 2;
                        break;
                      }
                      return t4.abrupt("return", "");
                    case 2:
                      return t4.next = 4, this.promisify(this.activedStorage.getItem(n2));
                    case 4:
                      return t4.abrupt("return", t4.sent);
                    case 5:
                    case "end":
                      return t4.stop();
                  }
                }), t3, this);
              })));
              return function(n2) {
                return t2.apply(this, arguments);
              };
            })(), r2.setItem = (function() {
              var t2 = vr(En().mark((function t3(n2, e3) {
                var o3;
                return En().wrap((function(t4) {
                  for (; ; ) switch (t4.prev = t4.next) {
                    case 0:
                      if (this.activedStorage) {
                        t4.next = 2;
                        break;
                      }
                      return t4.abrupt("return");
                    case 2:
                      return t4.next = 4, this.promisify(this.activedStorage.setItem(n2, e3));
                    case 4:
                      return o3 = t4.sent, this.refresh(), t4.abrupt("return", o3);
                    case 7:
                    case "end":
                      return t4.stop();
                  }
                }), t3, this);
              })));
              return function(n2, e3) {
                return t2.apply(this, arguments);
              };
            })(), r2.removeItem = (function() {
              var t2 = vr(En().mark((function t3(n2) {
                var e3;
                return En().wrap((function(t4) {
                  for (; ; ) switch (t4.prev = t4.next) {
                    case 0:
                      if (this.activedStorage) {
                        t4.next = 2;
                        break;
                      }
                      return t4.abrupt("return");
                    case 2:
                      return t4.next = 4, this.promisify(this.activedStorage.removeItem(n2));
                    case 4:
                      return e3 = t4.sent, this.refresh(), t4.abrupt("return", e3);
                    case 7:
                    case "end":
                      return t4.stop();
                  }
                }), t3, this);
              })));
              return function(n2) {
                return t2.apply(this, arguments);
              };
            })(), r2.clear = (function() {
              var t2 = vr(En().mark((function t3() {
                var n2;
                return En().wrap((function(t4) {
                  for (; ; ) switch (t4.prev = t4.next) {
                    case 0:
                      if (this.activedStorage) {
                        t4.next = 2;
                        break;
                      }
                      return t4.abrupt("return");
                    case 2:
                      return t4.next = 4, this.promisify(this.activedStorage.clear());
                    case 4:
                      return n2 = t4.sent, this.refresh(), t4.abrupt("return", n2);
                    case 7:
                    case "end":
                      return t4.stop();
                  }
                }), t3, this);
              })));
              return function() {
                return t2.apply(this, arguments);
              };
            })(), r2.refresh = function() {
              Er.updateTime.set(Date.now());
            }, r2.getEntries = (function() {
              var t2 = vr(En().mark((function t3() {
                var n2, e3, o3, r3, i3;
                return En().wrap((function(t4) {
                  for (; ; ) switch (t4.prev = t4.next) {
                    case 0:
                      if (n2 = this.activedStorage) {
                        t4.next = 3;
                        break;
                      }
                      return t4.abrupt("return", []);
                    case 3:
                      if ("function" != typeof n2.prepare) {
                        t4.next = 6;
                        break;
                      }
                      return t4.next = 6, n2.prepare();
                    case 6:
                      e3 = [], o3 = 0;
                    case 8:
                      if (!(o3 < n2.length)) {
                        t4.next = 17;
                        break;
                      }
                      return r3 = n2.key(o3), t4.next = 12, this.getItem(r3);
                    case 12:
                      i3 = t4.sent, e3.push([r3, i3]);
                    case 14:
                      o3++, t4.next = 8;
                      break;
                    case 17:
                      return t4.abrupt("return", e3);
                    case 18:
                    case "end":
                      return t4.stop();
                  }
                }), t3, this);
              })));
              return function() {
                return t2.apply(this, arguments);
              };
            })(), r2.updateEnabledStorages = function() {
              var t2 = (0, $e.U2)(Er.defaultStorages);
              t2.indexOf("cookies") > -1 ? void 0 !== document.cookie && this.storage.set("cookies", new yr()) : this.deleteStorage("cookies"), t2.indexOf("localStorage") > -1 ? window.localStorage && this.storage.set("localStorage", window.localStorage) : this.deleteStorage("localStorage"), t2.indexOf("sessionStorage") > -1 ? window.sessionStorage && this.storage.set("sessionStorage", window.sessionStorage) : this.deleteStorage("sessionStorage"), t2.indexOf("wxStorage") > -1 ? (0, n.H_)() && this.storage.set("wxStorage", new wr()) : this.deleteStorage("wxStorage");
            }, r2.promisify = function(t2) {
              return "string" == typeof t2 || null == t2 ? Promise.resolve(t2) : t2;
            }, r2.deleteStorage = function(t2) {
              this.storage.has(t2) && this.storage.delete(t2);
            }, (0, t.Z)(o2, [{ key: "activedStorage", get: function() {
              return this.storage.get((0, $e.U2)(Er.activedName));
            } }]), o2;
          })(Re.N);
          function Tr(t2, n2, e2) {
            var o2 = t2.slice();
            return o2[20] = n2[e2][0], o2[21] = n2[e2][1], o2[23] = e2, o2;
          }
          function xr(t2) {
            var n2;
            return { c: function() {
              (n2 = (0, a.bGB)("div")).textContent = "Empty", (0, a.Ljt)(n2, "class", "vc-plugin-empty");
            }, m: function(t3, e2) {
              (0, a.$Tr)(t3, n2, e2);
            }, p: a.ZTd, d: function(t3) {
              t3 && (0, a.ogt)(n2);
            } };
          }
          function Cr(t2) {
            var n2, e2, o2, r2, i3, c3 = t2[20] + "", u2 = t2[5](t2[21]) + "";
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.fLW)(c3), o2 = (0, a.DhX)(), r2 = (0, a.bGB)("div"), i3 = (0, a.fLW)(u2), (0, a.Ljt)(n2, "class", "vc-table-col"), (0, a.Ljt)(r2, "class", "vc-table-col vc-table-col-2");
            }, m: function(t3, c4) {
              (0, a.$Tr)(t3, n2, c4), (0, a.R3I)(n2, e2), (0, a.$Tr)(t3, o2, c4), (0, a.$Tr)(t3, r2, c4), (0, a.R3I)(r2, i3);
            }, p: function(t3, n3) {
              1 & n3 && c3 !== (c3 = t3[20] + "") && (0, a.rTO)(e2, c3), 1 & n3 && u2 !== (u2 = t3[5](t3[21]) + "") && (0, a.rTO)(i3, u2);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), t3 && (0, a.ogt)(o2), t3 && (0, a.ogt)(r2);
            } };
          }
          function Or(t2) {
            var n2, e2, o2, r2, i3, c3, u2;
            return { c: function() {
              n2 = (0, a.bGB)("div"), e2 = (0, a.bGB)("textarea"), o2 = (0, a.DhX)(), r2 = (0, a.bGB)("div"), i3 = (0, a.bGB)("textarea"), (0, a.Ljt)(e2, "class", "vc-table-input"), (0, a.Ljt)(n2, "class", "vc-table-col"), (0, a.Ljt)(i3, "class", "vc-table-input"), (0, a.Ljt)(r2, "class", "vc-table-col vc-table-col-2");
            }, m: function(s2, l2) {
              (0, a.$Tr)(s2, n2, l2), (0, a.R3I)(n2, e2), (0, a.BmG)(e2, t2[2]), (0, a.$Tr)(s2, o2, l2), (0, a.$Tr)(s2, r2, l2), (0, a.R3I)(r2, i3), (0, a.BmG)(i3, t2[3]), c3 || (u2 = [(0, a.oLt)(e2, "input", t2[11]), (0, a.oLt)(i3, "input", t2[12])], c3 = true);
            }, p: function(t3, n3) {
              4 & n3 && (0, a.BmG)(e2, t3[2]), 8 & n3 && (0, a.BmG)(i3, t3[3]);
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), t3 && (0, a.ogt)(o2), t3 && (0, a.ogt)(r2), c3 = false, (0, a.j7q)(u2);
            } };
          }
          function Ir(t2) {
            var n2, e2, o2, r2, i3, c3;
            return (n2 = new ut.Z({ props: { name: "delete" } })).$on("click", (function() {
              return t2[14](t2[20]);
            })), o2 = new dt({ props: { content: [t2[20], t2[21]].join("=") } }), (i3 = new ut.Z({ props: { name: "edit" } })).$on("click", (function() {
              return t2[15](t2[20], t2[21], t2[23]);
            })), { c: function() {
              (0, a.YCL)(n2.$$.fragment), e2 = (0, a.DhX)(), (0, a.YCL)(o2.$$.fragment), r2 = (0, a.DhX)(), (0, a.YCL)(i3.$$.fragment);
            }, m: function(t3, u2) {
              (0, a.yef)(n2, t3, u2), (0, a.$Tr)(t3, e2, u2), (0, a.yef)(o2, t3, u2), (0, a.$Tr)(t3, r2, u2), (0, a.yef)(i3, t3, u2), c3 = true;
            }, p: function(n3, e3) {
              t2 = n3;
              var r3 = {};
              1 & e3 && (r3.content = [t2[20], t2[21]].join("=")), o2.$set(r3);
            }, i: function(t3) {
              c3 || ((0, a.Ui)(n2.$$.fragment, t3), (0, a.Ui)(o2.$$.fragment, t3), (0, a.Ui)(i3.$$.fragment, t3), c3 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), (0, a.etI)(o2.$$.fragment, t3), (0, a.etI)(i3.$$.fragment, t3), c3 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3), t3 && (0, a.ogt)(e2), (0, a.vpE)(o2, t3), t3 && (0, a.ogt)(r2), (0, a.vpE)(i3, t3);
            } };
          }
          function Dr(t2) {
            var n2, e2, o2, r2;
            return (n2 = new ut.Z({ props: { name: "cancel" } })).$on("click", t2[9]), (o2 = new ut.Z({ props: { name: "done" } })).$on("click", (function() {
              return t2[13](t2[20]);
            })), { c: function() {
              (0, a.YCL)(n2.$$.fragment), e2 = (0, a.DhX)(), (0, a.YCL)(o2.$$.fragment);
            }, m: function(t3, i3) {
              (0, a.yef)(n2, t3, i3), (0, a.$Tr)(t3, e2, i3), (0, a.yef)(o2, t3, i3), r2 = true;
            }, p: function(n3, e3) {
              t2 = n3;
            }, i: function(t3) {
              r2 || ((0, a.Ui)(n2.$$.fragment, t3), (0, a.Ui)(o2.$$.fragment, t3), r2 = true);
            }, o: function(t3) {
              (0, a.etI)(n2.$$.fragment, t3), (0, a.etI)(o2.$$.fragment, t3), r2 = false;
            }, d: function(t3) {
              (0, a.vpE)(n2, t3), t3 && (0, a.ogt)(e2), (0, a.vpE)(o2, t3);
            } };
          }
          function $r(t2) {
            var n2, e2, o2, r2, i3, c3, u2;
            function s2(t3, n3) {
              return t3[1] === t3[23] ? Or : Cr;
            }
            var l2 = s2(t2), f2 = l2(t2), d2 = [Dr, Ir], v2 = [];
            function p2(t3, n3) {
              return t3[1] === t3[23] ? 0 : 1;
            }
            return r2 = p2(t2), i3 = v2[r2] = d2[r2](t2), { c: function() {
              n2 = (0, a.bGB)("div"), f2.c(), e2 = (0, a.DhX)(), o2 = (0, a.bGB)("div"), i3.c(), c3 = (0, a.DhX)(), (0, a.Ljt)(o2, "class", "vc-table-col vc-table-col-1 vc-table-action"), (0, a.Ljt)(n2, "class", "vc-table-row");
            }, m: function(t3, i4) {
              (0, a.$Tr)(t3, n2, i4), f2.m(n2, null), (0, a.R3I)(n2, e2), (0, a.R3I)(n2, o2), v2[r2].m(o2, null), (0, a.R3I)(n2, c3), u2 = true;
            }, p: function(t3, c4) {
              l2 === (l2 = s2(t3)) && f2 ? f2.p(t3, c4) : (f2.d(1), (f2 = l2(t3)) && (f2.c(), f2.m(n2, e2)));
              var u3 = r2;
              (r2 = p2(t3)) === u3 ? v2[r2].p(t3, c4) : ((0, a.dvw)(), (0, a.etI)(v2[u3], 1, 1, (function() {
                v2[u3] = null;
              })), (0, a.gbL)(), (i3 = v2[r2]) ? i3.p(t3, c4) : (i3 = v2[r2] = d2[r2](t3)).c(), (0, a.Ui)(i3, 1), i3.m(o2, null));
            }, i: function(t3) {
              u2 || ((0, a.Ui)(i3), u2 = true);
            }, o: function(t3) {
              (0, a.etI)(i3), u2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), f2.d(), v2[r2].d();
            } };
          }
          function Rr(t2) {
            for (var n2, e2, o2, r2, i3 = t2[0], c3 = [], u2 = 0; u2 < i3.length; u2 += 1) c3[u2] = $r(Tr(t2, i3, u2));
            var s2 = function(t3) {
              return (0, a.etI)(c3[t3], 1, 1, (function() {
                c3[t3] = null;
              }));
            }, l2 = null;
            return i3.length || (l2 = xr()), { c: function() {
              n2 = (0, a.bGB)("div"), (e2 = (0, a.bGB)("div")).innerHTML = '<div class="vc-table-col">Key</div> \n    <div class="vc-table-col vc-table-col-2">Value</div> \n    <div class="vc-table-col vc-table-col-1 vc-table-action"></div>', o2 = (0, a.DhX)();
              for (var t3 = 0; t3 < c3.length; t3 += 1) c3[t3].c();
              l2 && l2.c(), (0, a.Ljt)(e2, "class", "vc-table-row"), (0, a.Ljt)(n2, "class", "vc-table");
            }, m: function(t3, i4) {
              (0, a.$Tr)(t3, n2, i4), (0, a.R3I)(n2, e2), (0, a.R3I)(n2, o2);
              for (var u3 = 0; u3 < c3.length; u3 += 1) c3[u3].m(n2, null);
              l2 && l2.m(n2, null), r2 = true;
            }, p: function(t3, e3) {
              var o3 = e3[0];
              if (1007 & o3) {
                var r3;
                for (i3 = t3[0], r3 = 0; r3 < i3.length; r3 += 1) {
                  var u3 = Tr(t3, i3, r3);
                  c3[r3] ? (c3[r3].p(u3, o3), (0, a.Ui)(c3[r3], 1)) : (c3[r3] = $r(u3), c3[r3].c(), (0, a.Ui)(c3[r3], 1), c3[r3].m(n2, null));
                }
                for ((0, a.dvw)(), r3 = i3.length; r3 < c3.length; r3 += 1) s2(r3);
                (0, a.gbL)(), !i3.length && l2 ? l2.p(t3, o3) : i3.length ? l2 && (l2.d(1), l2 = null) : ((l2 = xr()).c(), l2.m(n2, null));
              }
            }, i: function(t3) {
              if (!r2) {
                for (var n3 = 0; n3 < i3.length; n3 += 1) (0, a.Ui)(c3[n3]);
                r2 = true;
              }
            }, o: function(t3) {
              c3 = c3.filter(Boolean);
              for (var n3 = 0; n3 < c3.length; n3 += 1) (0, a.etI)(c3[n3]);
              r2 = false;
            }, d: function(t3) {
              t3 && (0, a.ogt)(n2), (0, a.RMB)(c3, t3), l2 && l2.d();
            } };
          }
          function kr(t2, e2, o2) {
            var r2, i3 = this && this.__awaiter || function(t3, n2, e3, o3) {
              return new (e3 || (e3 = Promise))((function(r3, i4) {
                function a2(t4) {
                  try {
                    u3(o3.next(t4));
                  } catch (t5) {
                    i4(t5);
                  }
                }
                function c4(t4) {
                  try {
                    u3(o3.throw(t4));
                  } catch (t5) {
                    i4(t5);
                  }
                }
                function u3(t4) {
                  var n3;
                  t4.done ? r3(t4.value) : (n3 = t4.value, n3 instanceof e3 ? n3 : new e3((function(t5) {
                    t5(n3);
                  }))).then(a2, c4);
                }
                u3((o3 = o3.apply(t3, n2 || [])).next());
              }));
            }, c3 = Lr.getSingleton(Lr, "VConsoleStorageModel"), u2 = Er.updateTime;
            (0, a.FIv)(t2, u2, (function(t3) {
              return o2(10, r2 = t3);
            }));
            var s2 = [], l2 = -1, f2 = "", d2 = "", v2 = function() {
              o2(1, l2 = -1), o2(2, f2 = ""), o2(3, d2 = "");
            }, p2 = function(t3) {
              return i3(void 0, void 0, void 0, En().mark((function n2() {
                return En().wrap((function(n3) {
                  for (; ; ) switch (n3.prev = n3.next) {
                    case 0:
                      return n3.next = 2, c3.removeItem(t3);
                    case 2:
                    case "end":
                      return n3.stop();
                  }
                }), n2);
              })));
            }, h2 = function(t3) {
              return i3(void 0, void 0, void 0, En().mark((function n2() {
                return En().wrap((function(n3) {
                  for (; ; ) switch (n3.prev = n3.next) {
                    case 0:
                      if (f2 === t3) {
                        n3.next = 3;
                        break;
                      }
                      return n3.next = 3, c3.removeItem(t3);
                    case 3:
                      c3.setItem(f2, d2), v2();
                    case 5:
                    case "end":
                      return n3.stop();
                  }
                }), n2);
              })));
            }, g2 = function(t3, n2, e3) {
              return i3(void 0, void 0, void 0, En().mark((function r3() {
                return En().wrap((function(r4) {
                  for (; ; ) switch (r4.prev = r4.next) {
                    case 0:
                      o2(2, f2 = t3), o2(3, d2 = n2), o2(1, l2 = e3);
                    case 3:
                    case "end":
                      return r4.stop();
                  }
                }), r3);
              })));
            };
            return t2.$$.update = function() {
              1024 & t2.$$.dirty && r2 && i3(void 0, void 0, void 0, En().mark((function t3() {
                return En().wrap((function(t4) {
                  for (; ; ) switch (t4.prev = t4.next) {
                    case 0:
                      return v2(), t4.t0 = o2, t4.next = 4, c3.getEntries();
                    case 4:
                      t4.t1 = s2 = t4.sent, (0, t4.t0)(0, t4.t1);
                    case 6:
                    case "end":
                      return t4.stop();
                  }
                }), t3);
              })));
            }, [s2, l2, f2, d2, u2, function(t3) {
              return (0, n.id)(t3, 1024);
            }, p2, h2, g2, function() {
              v2();
            }, r2, function() {
              f2 = this.value, o2(2, f2);
            }, function() {
              d2 = this.value, o2(3, d2);
            }, function(t3) {
              return h2(t3);
            }, function(t3) {
              return p2(t3);
            }, function(t3, n2, e3) {
              return g2(t3, n2, e3);
            }];
          }
          var Pr = (function(t2) {
            function n2(n3) {
              var e2;
              return e2 = t2.call(this) || this, (0, a.S1n)((0, r.Z)(e2), n3, kr, Rr, a.N8, {}), e2;
            }
            return (0, i2.Z)(n2, t2), n2;
          })(a.f_C), Mr = Pr, Sr = (function(t2) {
            function e2(n2, e3, o3) {
              var r2;
              return void 0 === o3 && (o3 = {}), (r2 = t2.call(this, n2, e3, Mr, o3) || this).model = Lr.getSingleton(Lr, "VConsoleStorageModel"), r2.onAddTopBarCallback = void 0, r2;
            }
            (0, i2.Z)(e2, t2);
            var o2 = e2.prototype;
            return o2.onReady = function() {
              t2.prototype.onReady.call(this), this.onUpdateOption();
            }, o2.onShow = function() {
              this.model.refresh();
            }, o2.onAddTopBar = function(t3) {
              this.onAddTopBarCallback = t3, this.updateTopBar();
            }, o2.onAddTool = function(t3) {
              var n2 = this;
              t3([{ name: "Add", global: false, onClick: function() {
                n2.model.setItem("new_" + Date.now(), "new_value");
              } }, { name: "Refresh", global: false, onClick: function() {
                n2.model.refresh();
              } }, { name: "Clear", global: false, onClick: function() {
                n2.model.clear();
              } }]);
            }, o2.onUpdateOption = function() {
              var t3, e3 = null == (t3 = this.vConsole.option.storage) ? void 0 : t3.defaultStorages;
              (0, n.kJ)(e3) && (e3 = e3.length > 0 ? e3 : ["cookies"]) !== (0, $e.U2)(Er.defaultStorages) && (Er.defaultStorages.set(e3), Er.activedName.set(e3[0]), this.updateTopBar());
            }, o2.updateTopBar = function() {
              var t3 = this;
              if ("function" == typeof this.onAddTopBarCallback) {
                for (var n2 = (0, $e.U2)(Er.defaultStorages), e3 = [], o3 = 0; o3 < n2.length; o3++) {
                  var r2 = n2[o3];
                  e3.push({ name: r2[0].toUpperCase() + r2.substring(1), data: { name: r2 }, actived: r2 === (0, $e.U2)(Er.activedName), onClick: function(n3, e4) {
                    var o4 = (0, $e.U2)(Er.activedName);
                    if (e4.name === o4) return false;
                    Er.activedName.set(e4.name), t3.model.refresh();
                  } });
                }
                this.onAddTopBarCallback(e3);
              }
            }, e2;
          })(it), jr = (function() {
            function e2(t2) {
              var r3 = this;
              if (this.version = "3.15.1", this.isInited = false, this.option = {}, this.compInstance = void 0, this.pluginList = {}, this.log = void 0, this.system = void 0, this.network = void 0, e2.instance && e2.instance instanceof e2) return console.debug("[vConsole] vConsole is already exists."), e2.instance;
              if (e2.instance = this, this.isInited = false, this.option = { defaultPlugins: ["system", "network", "element", "storage"], log: {}, network: {}, storage: {} }, n.Kn(t2)) for (var i3 in t2) this.option[i3] = t2[i3];
              void 0 !== this.option.maxLogNumber && (this.option.log.maxLogNumber = this.option.maxLogNumber, console.debug("[vConsole] Deprecated option: `maxLogNumber`, use `log.maxLogNumber` instead.")), void 0 !== this.option.onClearLog && console.debug("[vConsole] Deprecated option: `onClearLog`."), void 0 !== this.option.maxNetworkNumber && (this.option.network.maxNetworkNumber = this.option.maxNetworkNumber, console.debug("[vConsole] Deprecated option: `maxNetworkNumber`, use `network.maxNetworkNumber` instead.")), this._addBuiltInPlugins();
              var a2 = function() {
                r3.isInited || (r3._initComponent(), r3._autoRun());
              };
              if (void 0 !== document) "loading" === document.readyState ? o.bind(window, "DOMContentLoaded", a2) : a2();
              else {
                var c3;
                c3 = setTimeout((function t3() {
                  document && "complete" == document.readyState ? (c3 && clearTimeout(c3), a2()) : c3 = setTimeout(t3, 1);
                }), 1);
              }
            }
            var r2 = e2.prototype;
            return r2._addBuiltInPlugins = function() {
              this.addPlugin(new Ie("default", "Log"));
              var t2 = this.option.defaultPlugins, e3 = { system: { proto: De, name: "System" } };
              if (e3.network = { proto: Ro, name: "Network" }, e3.element = { proto: fr, name: "Element" }, e3.storage = { proto: Sr, name: "Storage" }, t2 && n.kJ(t2)) for (var o2 = 0; o2 < t2.length; o2++) {
                var r3 = e3[t2[o2]];
                r3 ? this.addPlugin(new r3.proto(t2[o2], r3.name)) : console.debug("[vConsole] Unrecognized default plugin ID:", t2[o2]);
              }
            }, r2._initComponent = function() {
              var t2 = this;
              if (!o.one("#__vconsole")) {
                var e3, r3 = 1 * n.cF("switch_x"), i3 = 1 * n.cF("switch_y");
                "string" == typeof this.option.target ? e3 = document.querySelector(this.option.target) : this.option.target instanceof HTMLElement && (e3 = this.option.target), e3 instanceof HTMLElement || (e3 = document.documentElement), this.compInstance = new ot({ target: e3, props: { switchButtonPosition: { x: r3, y: i3 } } }), this.compInstance.$on("show", (function(n2) {
                  n2.detail.show ? t2.show() : t2.hide();
                })), this.compInstance.$on("changePanel", (function(n2) {
                  var e4 = n2.detail.pluginId;
                  t2.showPlugin(e4);
                }));
              }
              this._updateComponentByOptions();
            }, r2._updateComponentByOptions = function() {
              if (this.compInstance) {
                if (this.compInstance.theme !== this.option.theme) {
                  var t2 = this.option.theme;
                  t2 = "light" !== t2 && "dark" !== t2 ? "" : t2, this.compInstance.theme = t2;
                }
                this.compInstance.disableScrolling !== this.option.disableLogScrolling && (this.compInstance.disableScrolling = !!this.option.disableLogScrolling);
              }
            }, r2.setSwitchPosition = function(t2, n2) {
              this.compInstance.switchButtonPosition = { x: t2, y: n2 };
            }, r2._autoRun = function() {
              for (var t2 in this.isInited = true, this.pluginList) this._initPlugin(this.pluginList[t2]);
              this._showFirstPluginWhenEmpty(), this.triggerEvent("ready");
            }, r2._showFirstPluginWhenEmpty = function() {
              var t2 = Object.keys(this.pluginList);
              "" === this.compInstance.activedPluginId && t2.length > 0 && this.showPlugin(t2[0]);
            }, r2.triggerEvent = function(t2, e3) {
              var o2 = this;
              t2 = "on" + t2.charAt(0).toUpperCase() + t2.slice(1), n.mf(this.option[t2]) && setTimeout((function() {
                o2.option[t2].apply(o2, e3);
              }), 0);
            }, r2._initPlugin = function(t2) {
              var n2 = this;
              t2.vConsole = this, this.compInstance.pluginList[t2.id] = { id: t2.id, name: t2.name, hasTabPanel: false, tabOptions: void 0, topbarList: [], toolbarList: [], content: void 0, contentContainer: void 0 }, this.compInstance.pluginList = this._reorderPluginList(this.compInstance.pluginList), t2.trigger("init"), t2.trigger("renderTab", (function(e3, o2) {
                void 0 === o2 && (o2 = {});
                var r3 = n2.compInstance.pluginList[t2.id];
                r3.hasTabPanel = true, r3.tabOptions = o2, e3 && (n2.compInstance.pluginList[t2.id].content = e3), n2.compInstance.pluginList = n2.compInstance.pluginList;
              })), t2.trigger("addTopBar", (function(e3) {
                if (e3) {
                  for (var o2 = [], r3 = 0; r3 < e3.length; r3++) {
                    var i3 = e3[r3];
                    o2.push({ name: i3.name || "Undefined", className: i3.className || "", actived: !!i3.actived, data: i3.data, onClick: i3.onClick });
                  }
                  n2.compInstance.pluginList[t2.id].topbarList = o2, n2.compInstance.pluginList = n2.compInstance.pluginList;
                }
              })), t2.trigger("addTool", (function(e3) {
                if (e3) {
                  for (var o2 = [], r3 = 0; r3 < e3.length; r3++) {
                    var i3 = e3[r3];
                    o2.push({ name: i3.name || "Undefined", global: !!i3.global, data: i3.data, onClick: i3.onClick });
                  }
                  n2.compInstance.pluginList[t2.id].toolbarList = o2, n2.compInstance.pluginList = n2.compInstance.pluginList;
                }
              })), t2.isReady = true, t2.trigger("ready");
            }, r2._triggerPluginsEvent = function(t2) {
              for (var n2 in this.pluginList) this.pluginList[n2].isReady && this.pluginList[n2].trigger(t2);
            }, r2._triggerPluginEvent = function(t2, n2) {
              var e3 = this.pluginList[t2];
              e3 && e3.isReady && e3.trigger(n2);
            }, r2._reorderPluginList = function(t2) {
              var e3 = this;
              if (!n.kJ(this.option.pluginOrder)) return t2;
              for (var o2 = Object.keys(t2).sort((function(t3, n2) {
                var o3 = e3.option.pluginOrder.indexOf(t3), r4 = e3.option.pluginOrder.indexOf(n2);
                return o3 === r4 ? 0 : -1 === o3 ? 1 : -1 === r4 ? -1 : o3 - r4;
              })), r3 = {}, i3 = 0; i3 < o2.length; i3++) r3[o2[i3]] = t2[o2[i3]];
              return r3;
            }, r2.addPlugin = function(t2) {
              return void 0 !== this.pluginList[t2.id] ? (console.debug("[vConsole] Plugin `" + t2.id + "` has already been added."), false) : (this.pluginList[t2.id] = t2, this.isInited && (this._initPlugin(t2), this._showFirstPluginWhenEmpty()), true);
            }, r2.removePlugin = function(t2) {
              t2 = (t2 + "").toLowerCase();
              var n2 = this.pluginList[t2];
              if (void 0 === n2) return console.debug("[vConsole] Plugin `" + t2 + "` does not exist."), false;
              n2.trigger("remove");
              try {
                delete this.pluginList[t2], delete this.compInstance.pluginList[t2];
              } catch (n3) {
                this.pluginList[t2] = void 0, this.compInstance.pluginList[t2] = void 0;
              }
              return this.compInstance.pluginList = this.compInstance.pluginList, this.compInstance.activedPluginId == t2 && (this.compInstance.activedPluginId = "", this._showFirstPluginWhenEmpty()), true;
            }, r2.show = function() {
              this.isInited && (this.compInstance.show = true, this._triggerPluginsEvent("showConsole"));
            }, r2.hide = function() {
              this.isInited && (this.compInstance.show = false, this._triggerPluginsEvent("hideConsole"));
            }, r2.showSwitch = function() {
              this.isInited && (this.compInstance.showSwitchButton = true);
            }, r2.hideSwitch = function() {
              this.isInited && (this.compInstance.showSwitchButton = false);
            }, r2.showPlugin = function(t2) {
              this.isInited && (this.pluginList[t2] || console.debug("[vConsole] Plugin `" + t2 + "` does not exist."), this.compInstance.activedPluginId && this._triggerPluginEvent(this.compInstance.activedPluginId, "hide"), this.compInstance.activedPluginId = t2, this._triggerPluginEvent(this.compInstance.activedPluginId, "show"));
            }, r2.setOption = function(t2, e3) {
              if ("string" == typeof t2) {
                for (var o2 = t2.split("."), r3 = this.option, i3 = 0; i3 < o2.length; i3++) {
                  if ("__proto__" === o2[i3] || "constructor" === o2[i3] || "prototype" === o2[i3]) return void console.debug("[vConsole] Cannot set `" + o2[i3] + "` in `vConsole.setOption()`.");
                  void 0 === r3[o2[i3]] && (r3[o2[i3]] = {}), i3 === o2.length - 1 && (r3[o2[i3]] = e3), r3 = r3[o2[i3]];
                }
                this._triggerPluginsEvent("updateOption"), this._updateComponentByOptions();
              } else if (n.Kn(t2)) {
                for (var a2 in t2) "__proto__" !== a2 && "constructor" !== a2 && "prototype" !== a2 ? this.option[a2] = t2[a2] : console.debug("[vConsole] Cannot set `" + a2 + "` in `vConsole.setOption()`.");
                this._triggerPluginsEvent("updateOption"), this._updateComponentByOptions();
              } else console.debug("[vConsole] The first parameter of `vConsole.setOption()` must be a string or an object.");
            }, r2.destroy = function() {
              if (this.isInited) {
                this.isInited = false, e2.instance = void 0;
                for (var t2 = Object.keys(this.pluginList), n2 = t2.length - 1; n2 >= 0; n2--) this.removePlugin(t2[n2]);
                this.compInstance.$destroy();
              }
            }, (0, t.Z)(e2, null, [{ key: "instance", get: function() {
              return window.__VCONSOLE_INSTANCE;
            }, set: function(t2) {
              void 0 === t2 || t2 instanceof e2 ? window.__VCONSOLE_INSTANCE = t2 : console.debug("[vConsole] Cannot set `VConsole.instance` because the value is not the instance of VConsole.");
            } }]), e2;
          })();
          jr.VConsolePlugin = void 0, jr.VConsoleLogPlugin = void 0, jr.VConsoleDefaultPlugin = void 0, jr.VConsoleSystemPlugin = void 0, jr.VConsoleNetworkPlugin = void 0, jr.VConsoleElementPlugin = void 0, jr.VConsoleStoragePlugin = void 0, jr.VConsolePlugin = rt, jr.VConsoleLogPlugin = Oe, jr.VConsoleDefaultPlugin = Ie, jr.VConsoleSystemPlugin = De, jr.VConsoleNetworkPlugin = Ro, jr.VConsoleElementPlugin = fr, jr.VConsoleStoragePlugin = Sr;
          var Br = jr;
        })(), __webpack_exports__ = __webpack_exports__.default, __webpack_exports__;
      })();
    }));
  })(vconsole_min$1);
  return vconsole_min$1.exports;
}
var vconsole_minExports = /* @__PURE__ */ requireVconsole_min();
const VConsole = /* @__PURE__ */ getDefaultExportFromCjs(vconsole_minExports);
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/tuner/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item2 of res || []) {
      if (item2.status !== "rejected") continue;
      handlePreloadError(item2.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
/*!
  * shared v11.2.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function warn(msg2, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg2);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const inBrowser = typeof window !== "undefined";
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key2, source) => friendlyJSONstringify({ l: locale, k: key2, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign$1 = Object.assign;
const _create = Object.create;
const create$1 = (obj = null) => _create(obj);
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : create$1());
};
function escapeHtml(rawText) {
  return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function escapeAttributeValue(value) {
  return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sanitizeTranslatedHtml(html) {
  html = html.replace(/(\w+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${escapeAttributeValue(attrValue)}"`);
  html = html.replace(/(\w+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${escapeAttributeValue(attrValue)}'`);
  const eventHandlerPattern = /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi;
  if (eventHandlerPattern.test(html)) {
    html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3");
  }
  const javascriptUrlPattern = [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ];
  javascriptUrlPattern.forEach((pattern4) => {
    html = html.replace(pattern4, "$1javascript&#58;");
  });
  return html;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key2) {
  return hasOwnProperty.call(obj, key2);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
  return items.reduce((str, item2, index) => index === 0 ? str + item2 : str + separator + item2, "");
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key2) => {
      if (key2 === "__proto__") {
        return;
      }
      if (isObject(src2[key2]) && !isObject(des2[key2])) {
        des2[key2] = Array.isArray(src2[key2]) ? [] : create$1();
      }
      if (isNotObjectOrIsArray(des2[key2]) || isNotObjectOrIsArray(src2[key2])) {
        des2[key2] = src2[key2];
      } else {
        stack.push({ src: src2[key2], des: des2[key2] });
      }
    });
  }
}
/*!
  * message-compiler v11.2.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  return loc;
}
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14
};
const COMPILE_ERROR_CODES_EXTEND_POINT = 17;
function createCompileError(code, loc, options = {}) {
  const { domain, messages: messages2, args } = options;
  const msg2 = code;
  const error = new SyntaxError(String(msg2));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location2 = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 13,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 13,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location2 ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type4, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type4;
    const token = { type: type4 };
    if (location2) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    13
    /* TokenTypes.EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 7) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 7 || currentType === 11)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isTextStart(scnr, false);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "") => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return hasSpace;
      } else if (ch === "@" || !ch) {
        return hasSpace;
      } else if (ch === "|") {
        return !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36 || // $
    cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || // 0-9
    cc >= 65 && cc <= 70 || // A-F
    cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    const currentChar = scnr.currentChar();
    if (currentChar && currentChar !== "}" && currentChar !== EOF && currentChar !== CHAR_SP && currentChar !== CHAR_LF && currentChar !== "　") {
      const invalidPart = readInvalidIdentifier(scnr);
      emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, name + invalidPart);
      return name + invalidPart;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i2 = 0; i2 < digits; i2++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(buf);
      }
    };
    return fn("");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* TokenChars.Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* TokenChars.BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 4 || context2.currentType === 5 || context2.currentType === 6)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 4, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 6, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 12, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 11, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 10, readLinkedRefer(scnr));
          }
        }
        if (currentType === 7) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        13
        /* TokenTypes.EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    // eslint-disable-next-line no-useless-escape
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "�";
    }
  }
}
function createParser(options = {}) {
  const location2 = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location2 ? createLocation(start, end) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function startNode(type4, offset, loc) {
    const node = { type: type4 };
    if (location2) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type4) {
    if (location2) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key2) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key2;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 11) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 8) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 9) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 10:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 4:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 7: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 13 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg2 = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg2.items.length === 0;
      }
      node.cases.push(msg2);
    } while (context.currentType !== 13);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 13) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign$1({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location2 && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 13) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 13) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i2 = 0; i2 < nodes.length; i2++) {
    traverseNode(nodes[i2], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* HelperNameMap.LINKED */
      );
      transformer.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c2) => optimizeMessageNode(c2));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item2 = message.items[0];
    if (item2.type === 3 || item2.type === 9) {
      message.static = item2.value;
      delete item2.value;
    }
  } else {
    const values = [];
    for (let i2 = 0; i2 < message.items.length; i2++) {
      const item2 = message.items[i2];
      if (!(item2.type === 3 || item2.type === 9)) {
        break;
      }
      if (item2.value == null) {
        break;
      }
      values.push(item2.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i2 = 0; i2 < message.items.length; i2++) {
        const item2 = message.items[i2];
        if (item2.type === 3 || item2.type === 9) {
          delete item2.value;
        }
      }
    }
  }
}
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i2 = 0; i2 < cases.length; i2++) {
        minify(cases[i2]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message = node;
      const items = message.items;
      for (let i2 = 0; i2 < items.length; i2++) {
        minify(items[i2]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
  }
  delete node.type;
}
function createCodeGenerator(ast, options) {
  const { filename, breakLineCode, needIndent: _needIndent } = options;
  const location2 = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location2 && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code, node) {
    _context.code += code;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key2) => `_${key2}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i2 = 0; i2 < length; i2++) {
    generateNode(generator, node.items[i2]);
    if (i2 === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i2 = 0; i2 < length; i2++) {
      generateNode(generator, node.cases[i2]);
      if (i2 === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "list"
        /* HelperNameMap.LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    filename,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code, map } = generator.context();
  return {
    ast,
    code,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign$1({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
/*!
  * core-base v11.2.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function initFeatureFlags() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
function isMessageAST(val) {
  return isObject(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
}
const PROPS_BODY = ["b", "body"];
function resolveBody(node) {
  return resolveProps(node, PROPS_BODY);
}
const PROPS_CASES = ["c", "cases"];
function resolveCases(node) {
  return resolveProps(node, PROPS_CASES, []);
}
const PROPS_STATIC = ["s", "static"];
function resolveStatic(node) {
  return resolveProps(node, PROPS_STATIC);
}
const PROPS_ITEMS = ["i", "items"];
function resolveItems(node) {
  return resolveProps(node, PROPS_ITEMS, []);
}
const PROPS_TYPE = ["t", "type"];
function resolveType(node) {
  return resolveProps(node, PROPS_TYPE);
}
const PROPS_VALUE = ["v", "value"];
function resolveValue$1(node, type4) {
  const resolved = resolveProps(node, PROPS_VALUE);
  if (resolved != null) {
    return resolved;
  } else {
    throw createUnhandleNodeError(type4);
  }
}
const PROPS_MODIFIER = ["m", "modifier"];
function resolveLinkedModifier(node) {
  return resolveProps(node, PROPS_MODIFIER);
}
const PROPS_KEY = ["k", "key"];
function resolveLinkedKey(node) {
  const resolved = resolveProps(node, PROPS_KEY);
  if (resolved) {
    return resolved;
  } else {
    throw createUnhandleNodeError(
      6
      /* NodeTypes.Linked */
    );
  }
}
function resolveProps(node, props, defaultValue) {
  for (let i2 = 0; i2 < props.length; i2++) {
    const prop = props[i2];
    if (hasOwn(node, prop) && node[prop] != null) {
      return node[prop];
    }
  }
  return defaultValue;
}
const AST_NODE_PROPS_KEYS = [
  ...PROPS_BODY,
  ...PROPS_CASES,
  ...PROPS_STATIC,
  ...PROPS_ITEMS,
  ...PROPS_KEY,
  ...PROPS_MODIFIER,
  ...PROPS_VALUE,
  ...PROPS_TYPE
];
function createUnhandleNodeError(type4) {
  return new Error(`unhandled node type: ${type4}`);
}
function format$1(ast) {
  const msg2 = (ctx) => formatParts(ctx, ast);
  return msg2;
}
function formatParts(ctx, ast) {
  const body = resolveBody(ast);
  if (body == null) {
    throw createUnhandleNodeError(
      0
      /* NodeTypes.Resource */
    );
  }
  const type4 = resolveType(body);
  if (type4 === 1) {
    const plural = body;
    const cases = resolveCases(plural);
    return ctx.plural(cases.reduce((messages2, c2) => [
      ...messages2,
      formatMessageParts(ctx, c2)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const static_ = resolveStatic(node);
  if (static_ != null) {
    return ctx.type === "text" ? static_ : ctx.normalize([static_]);
  } else {
    const messages2 = resolveItems(node).reduce((acm, c2) => [...acm, formatMessagePart(ctx, c2)], []);
    return ctx.normalize(messages2);
  }
}
function formatMessagePart(ctx, node) {
  const type4 = resolveType(node);
  switch (type4) {
    case 3: {
      return resolveValue$1(node, type4);
    }
    case 9: {
      return resolveValue$1(node, type4);
    }
    case 4: {
      const named = node;
      if (hasOwn(named, "k") && named.k) {
        return ctx.interpolate(ctx.named(named.k));
      }
      if (hasOwn(named, "key") && named.key) {
        return ctx.interpolate(ctx.named(named.key));
      }
      throw createUnhandleNodeError(type4);
    }
    case 5: {
      const list = node;
      if (hasOwn(list, "i") && isNumber(list.i)) {
        return ctx.interpolate(ctx.list(list.i));
      }
      if (hasOwn(list, "index") && isNumber(list.index)) {
        return ctx.interpolate(ctx.list(list.index));
      }
      throw createUnhandleNodeError(type4);
    }
    case 6: {
      const linked = node;
      const modifier = resolveLinkedModifier(linked);
      const key2 = resolveLinkedKey(linked);
      return ctx.linked(formatMessagePart(ctx, key2), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      return resolveValue$1(node, type4);
    }
    case 8: {
      return resolveValue$1(node, type4);
    }
    default:
      throw new Error(`unhandled node on format message part: ${type4}`);
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = create$1();
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
// @__NO_SIDE_EFFECTS__
function compile(message, context) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && isString(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: false,
      jit: true
    });
    const msg2 = format$1(ast);
    return !detectError ? compileCache[cacheKey] = msg2 : msg2;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format$1(message);
    } else {
      return format$1(message);
    }
  }
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n, version, meta) {
  devtools && devtools.emit("i18n:init", {
    timestamp: Date.now(),
    i18n,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook("function:translate");
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const CoreErrorCodes = {
  INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
};
const CORE_ERROR_CODES_EXTEND_POINT = 24;
function createCoreError(code) {
  return createCompileError(code, null, void 0);
}
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve = locale();
        if (isPromise(resolve)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i2 = 0; i2 < block.length && isBoolean(follow); i2++) {
    const locale = block[i2];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i2], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return ch;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse$2(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c2;
  let key2;
  let newChar;
  let type4;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key2 === void 0) {
      key2 = newChar;
    } else {
      key2 += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key2 !== void 0) {
      keys.push(key2);
      key2 = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key2 === void 0) {
        return false;
      }
      key2 = formatSubPath(key2);
      if (key2 === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c2 = path[index];
    if (c2 === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type4 = getPathCharType(c2);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type4] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c2;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache$1 = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache$1.get(path);
  if (!hit) {
    hit = parse$2(path);
    if (hit) {
      cache$1.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i2 = 0;
  while (i2 < len) {
    const key2 = hit[i2];
    if (AST_NODE_PROPS_KEYS.includes(key2) && isMessageAST(last)) {
      return null;
    }
    const val = last[key2];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i2++;
  }
  return last;
}
const VERSION = "11.2.8";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type4) => {
      return type4 === "text" && isString(val) ? val.toUpperCase() : type4 === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type4) => {
      return type4 === "text" && isString(val) ? val.toLowerCase() : type4 === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type4) => {
      return type4 === "text" && isString(val) ? capitalize(val) : type4 === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString(options.version) ? options.version : VERSION;
  const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages2 = isPlainObject(options.messages) ? options.messages : createResources(_locale);
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale);
  const modifiers = assign$1(create$1(), options.modifiers, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || create$1();
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages: messages2,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  if (__INTLIFY_PROD_DEVTOOLS__) {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
const createResources = (locale) => ({ [locale]: create$1() });
function handleMissing(context, key2, locale, missingWarn, type4) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key2, type4);
    return isString(ret) ? ret : key2;
  } else {
    return key2;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales) {
  const index = locales.indexOf(targetLocale);
  if (index === -1) {
    return false;
  }
  for (let i2 = index + 1; i2 < locales.length; i2++) {
    if (isAlmostSameLocale(targetLocale, locales[i2])) {
      return true;
    }
  }
  return false;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key2, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key2) || key2 === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type4 = "datetime format";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = locales[i2];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key2];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key2, targetLocale, missingWarn, type4);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key2;
  }
  let id = `${targetLocale}__${key2}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign$1({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create$1();
  let overrides = create$1();
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key2) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key2)) {
        overrides[key2] = arg2[key2];
      } else {
        options[key2] = arg2[key2];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key2 in format2) {
    const id = `${locale}__${key2}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key2, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key2) || key2 === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type4 = "number format";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = locales[i2];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key2];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key2, targetLocale, missingWarn, type4);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key2;
  }
  let id = `${targetLocale}__${key2}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign$1({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create$1();
  let overrides = create$1();
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key2) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key2)) {
        overrides[key2] = arg2[key2];
      } else {
        options[key2] = arg2[key2];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key2 in format2) {
    const id = `${locale}__${key2}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages2) => {
    return messages2[pluralRule(pluralIndex, messages2.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || create$1();
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key2) => _named[key2];
  function message(key2, useLinked) {
    const msg2 = isFunction(options.messages) ? options.messages(key2, !!useLinked) : isObject(options.messages) ? options.messages[key2] : false;
    return !msg2 ? options.parent ? options.parent.message(key2) : DEFAULT_MESSAGE : msg2;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type4 = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key2, ...args) => {
    const [arg1, arg2] = args;
    let type22 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
        modifier = arg1.modifier || modifier;
        type22 = arg1.type || type22;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type22 = arg2 || type22;
      }
    }
    const ret = message(key2, true)(ctx);
    const msg2 = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type22 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg2, type22) : msg2;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type4,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign$1(create$1(), _list, _named)
  };
  return ctx;
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages: messages2 } = context;
  const [key2, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key2 : key2 : fallbackFormat ? !messageCompiler ? () => key2 : key2 : null;
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey));
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key2, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key2,
    locale,
    messages2[locale] || create$1()
  ];
  let format2 = formatScope;
  let cacheBaseKey = key2;
  if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key2;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg2 = !isMessageFunction(format2) ? compileMessageFormat(context, key2, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg2, msgContext);
  let ret = postTranslation ? postTranslation(messaged, key2) : messaged;
  if (escapeParameter && isString(ret)) {
    ret = sanitizeTranslatedHtml(ret);
  }
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const payloads = {
      timestamp: Date.now(),
      key: isString(key2) ? key2 : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign$1({}, context.__meta, /* @__PURE__ */ getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item2) => isString(item2) ? escapeHtml(item2) : item2);
  } else if (isObject(options.named)) {
    Object.keys(options.named).forEach((key2) => {
      if (isString(options.named[key2])) {
        options.named[key2] = escapeHtml(options.named[key2]);
      }
    });
  }
}
function resolveMessageFormat(context, key2, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages: messages2, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = create$1();
  let targetLocale;
  let format2 = null;
  const type4 = "translate";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = locales[i2];
    message = messages2[targetLocale] || create$1();
    if ((format2 = resolveValue2(message, key2)) === null) {
      format2 = message[key2];
    }
    if (isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales)) {
      const missingRet = handleMissing(
        context,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        key2,
        targetLocale,
        missingWarn,
        type4
      );
      if (missingRet !== key2) {
        format2 = missingRet;
      }
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key2, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg22 = format2;
    msg22.locale = msg22.locale || targetLocale;
    msg22.key = msg22.key || key2;
    return msg22;
  }
  if (messageCompiler == null) {
    const msg22 = (() => format2);
    msg22.locale = targetLocale;
    msg22.key = key2;
    return msg22;
  }
  const msg2 = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg2.locale = targetLocale;
  msg2.key = key2;
  msg2.source = format2;
  return msg2;
}
function evaluateMessage(context, msg2, msgCtx) {
  const messaged = msg2(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = create$1();
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key2 = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign$1(options, arg3);
  }
  return [key2, options];
}
function getCompileContext(context, locale, key2, source, warnHtmlMessage, onError) {
  return {
    locale,
    key: key2,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key2, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key2, useLinked) => {
    let val = resolveValue2(message, key2);
    if (val == null && (fallbackContext || useLinked)) {
      const [, , message2] = resolveMessageFormat(
        fallbackContext || context,
        // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
        key2,
        locale,
        fallbackLocale,
        fallbackWarn,
        missingWarn
      );
      val = resolveValue2(message2, key2);
    }
    if (isString(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg2 = compileMessageFormat(context, key2, locale, val, key2, onError);
      return !occurred ? msg2 : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
{
  initFeatureFlags();
}
function plugin(options) {
  let _bPrefix = ".";
  let _ePrefix = "__";
  let _mPrefix = "--";
  let c2;
  if (options) {
    let t = options.blockPrefix;
    if (t) {
      _bPrefix = t;
    }
    t = options.elementPrefix;
    if (t) {
      _ePrefix = t;
    }
    t = options.modifierPrefix;
    if (t) {
      _mPrefix = t;
    }
  }
  const _plugin = {
    install(instance2) {
      c2 = instance2.c;
      const ctx = instance2.context;
      ctx.bem = {};
      ctx.bem.b = null;
      ctx.bem.els = null;
    }
  };
  function b(arg) {
    let memorizedB;
    let memorizedE;
    return {
      before(ctx) {
        memorizedB = ctx.bem.b;
        memorizedE = ctx.bem.els;
        ctx.bem.els = null;
      },
      after(ctx) {
        ctx.bem.b = memorizedB;
        ctx.bem.els = memorizedE;
      },
      $({ context, props }) {
        arg = typeof arg === "string" ? arg : arg({ context, props });
        context.bem.b = arg;
        return `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}`;
      }
    };
  }
  function e(arg) {
    let memorizedE;
    return {
      before(ctx) {
        memorizedE = ctx.bem.els;
      },
      after(ctx) {
        ctx.bem.els = memorizedE;
      },
      $({ context, props }) {
        arg = typeof arg === "string" ? arg : arg({ context, props });
        context.bem.els = arg.split(",").map((v) => v.trim());
        return context.bem.els.map((el) => `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${_ePrefix}${el}`).join(", ");
      }
    };
  }
  function m2(arg) {
    return {
      $({ context, props }) {
        arg = typeof arg === "string" ? arg : arg({ context, props });
        const modifiers = arg.split(",").map((v) => v.trim());
        function elementToSelector(el) {
          return modifiers.map((modifier) => `&${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${el !== void 0 ? `${_ePrefix}${el}` : ""}${_mPrefix}${modifier}`).join(", ");
        }
        const els = context.bem.els;
        if (els !== null) {
          return elementToSelector(els[0]);
        } else {
          return elementToSelector();
        }
      }
    };
  }
  function notM(arg) {
    return {
      $({ context, props }) {
        arg = typeof arg === "string" ? arg : arg({ context, props });
        const els = context.bem.els;
        return `&:not(${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${els !== null && els.length > 0 ? `${_ePrefix}${els[0]}` : ""}${_mPrefix}${arg})`;
      }
    };
  }
  const cB = ((...args) => c2(b(args[0]), args[1], args[2]));
  const cE = ((...args) => c2(e(args[0]), args[1], args[2]));
  const cM = ((...args) => c2(m2(args[0]), args[1], args[2]));
  const cNotM = ((...args) => c2(notM(args[0]), args[1], args[2]));
  Object.assign(_plugin, {
    cB,
    cE,
    cM,
    cNotM
  });
  return _plugin;
}
function ampCount(selector) {
  let cnt = 0;
  for (let i2 = 0; i2 < selector.length; ++i2) {
    if (selector[i2] === "&")
      ++cnt;
  }
  return cnt;
}
const separatorRegex = /\s*,(?![^(]*\))\s*/g;
const extraSpaceRegex = /\s+/g;
function resolveSelectorWithAmp(amp, selector) {
  const nextAmp = [];
  selector.split(separatorRegex).forEach((partialSelector) => {
    let round2 = ampCount(partialSelector);
    if (!round2) {
      amp.forEach((partialAmp) => {
        nextAmp.push(
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          (partialAmp && partialAmp + " ") + partialSelector
        );
      });
      return;
    } else if (round2 === 1) {
      amp.forEach((partialAmp) => {
        nextAmp.push(partialSelector.replace("&", partialAmp));
      });
      return;
    }
    let partialNextAmp = [
      partialSelector
    ];
    while (round2--) {
      const nextPartialNextAmp = [];
      partialNextAmp.forEach((selectorItr) => {
        amp.forEach((partialAmp) => {
          nextPartialNextAmp.push(selectorItr.replace("&", partialAmp));
        });
      });
      partialNextAmp = nextPartialNextAmp;
    }
    partialNextAmp.forEach((part) => nextAmp.push(part));
  });
  return nextAmp;
}
function resolveSelector(amp, selector) {
  const nextAmp = [];
  selector.split(separatorRegex).forEach((partialSelector) => {
    amp.forEach((partialAmp) => {
      nextAmp.push((partialAmp && partialAmp + " ") + partialSelector);
    });
  });
  return nextAmp;
}
function parseSelectorPath(selectorPaths) {
  let amp = [""];
  selectorPaths.forEach((selector) => {
    selector = selector && selector.trim();
    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !selector
    ) {
      return;
    }
    if (selector.includes("&")) {
      amp = resolveSelectorWithAmp(amp, selector);
    } else {
      amp = resolveSelector(amp, selector);
    }
  });
  return amp.join(", ").replace(extraSpaceRegex, " ");
}
function removeElement(el) {
  if (!el)
    return;
  const parentElement = el.parentElement;
  if (parentElement)
    parentElement.removeChild(el);
}
function queryElement(id, parent) {
  return (parent !== null && parent !== void 0 ? parent : document.head).querySelector(`style[cssr-id="${id}"]`);
}
function createElement(id) {
  const el = document.createElement("style");
  el.setAttribute("cssr-id", id);
  return el;
}
function isMediaOrSupports(selector) {
  if (!selector)
    return false;
  return /^\s*@(s|m)/.test(selector);
}
const kebabRegex = /[A-Z]/g;
function kebabCase(pattern4) {
  return pattern4.replace(kebabRegex, (match) => "-" + match.toLowerCase());
}
function unwrapProperty(prop, indent = "  ") {
  if (typeof prop === "object" && prop !== null) {
    return " {\n" + Object.entries(prop).map((v) => {
      return indent + `  ${kebabCase(v[0])}: ${v[1]};`;
    }).join("\n") + "\n" + indent + "}";
  }
  return `: ${prop};`;
}
function unwrapProperties(props, instance2, params) {
  if (typeof props === "function") {
    return props({
      context: instance2.context,
      props: params
    });
  }
  return props;
}
function createStyle(selector, props, instance2, params) {
  if (!props)
    return "";
  const unwrappedProps = unwrapProperties(props, instance2, params);
  if (!unwrappedProps)
    return "";
  if (typeof unwrappedProps === "string") {
    return `${selector} {
${unwrappedProps}
}`;
  }
  const propertyNames = Object.keys(unwrappedProps);
  if (propertyNames.length === 0) {
    if (instance2.config.keepEmptyBlock)
      return selector + " {\n}";
    return "";
  }
  const statements = selector ? [
    selector + " {"
  ] : [];
  propertyNames.forEach((propertyName) => {
    const property = unwrappedProps[propertyName];
    if (propertyName === "raw") {
      statements.push("\n" + property + "\n");
      return;
    }
    propertyName = kebabCase(propertyName);
    if (property !== null && property !== void 0) {
      statements.push(`  ${propertyName}${unwrapProperty(property)}`);
    }
  });
  if (selector) {
    statements.push("}");
  }
  return statements.join("\n");
}
function loopCNodeListWithCallback(children, options, callback) {
  if (!children)
    return;
  children.forEach((child) => {
    if (Array.isArray(child)) {
      loopCNodeListWithCallback(child, options, callback);
    } else if (typeof child === "function") {
      const grandChildren = child(options);
      if (Array.isArray(grandChildren)) {
        loopCNodeListWithCallback(grandChildren, options, callback);
      } else if (grandChildren) {
        callback(grandChildren);
      }
    } else if (child) {
      callback(child);
    }
  });
}
function traverseCNode(node, selectorPaths, styles, instance2, params) {
  const $ = node.$;
  let blockSelector = "";
  if (!$ || typeof $ === "string") {
    if (isMediaOrSupports($)) {
      blockSelector = $;
    } else {
      selectorPaths.push($);
    }
  } else if (typeof $ === "function") {
    const selector2 = $({
      context: instance2.context,
      props: params
    });
    if (isMediaOrSupports(selector2)) {
      blockSelector = selector2;
    } else {
      selectorPaths.push(selector2);
    }
  } else {
    if ($.before)
      $.before(instance2.context);
    if (!$.$ || typeof $.$ === "string") {
      if (isMediaOrSupports($.$)) {
        blockSelector = $.$;
      } else {
        selectorPaths.push($.$);
      }
    } else if ($.$) {
      const selector2 = $.$({
        context: instance2.context,
        props: params
      });
      if (isMediaOrSupports(selector2)) {
        blockSelector = selector2;
      } else {
        selectorPaths.push(selector2);
      }
    }
  }
  const selector = parseSelectorPath(selectorPaths);
  const style = createStyle(selector, node.props, instance2, params);
  if (blockSelector) {
    styles.push(`${blockSelector} {`);
  } else if (style.length) {
    styles.push(style);
  }
  if (node.children) {
    loopCNodeListWithCallback(node.children, {
      context: instance2.context,
      props: params
    }, (childNode) => {
      if (typeof childNode === "string") {
        const style2 = createStyle(selector, { raw: childNode }, instance2, params);
        styles.push(style2);
      } else {
        traverseCNode(childNode, selectorPaths, styles, instance2, params);
      }
    });
  }
  selectorPaths.pop();
  if (blockSelector) {
    styles.push("}");
  }
  if ($ && $.after)
    $.after(instance2.context);
}
function render(node, instance2, props) {
  const styles = [];
  traverseCNode(node, [], styles, instance2, props);
  return styles.join("\n\n");
}
function murmur2(str) {
  var h = 0;
  var k, i2 = 0, len = str.length;
  for (; len >= 4; ++i2, len -= 4) {
    k = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i2 + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i2 + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i2) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
if (typeof window !== "undefined") {
  window.__cssrContext = {};
}
function unmount(instance2, node, id, parent) {
  const { els } = node;
  if (id === void 0) {
    els.forEach(removeElement);
    node.els = [];
  } else {
    const target = queryElement(id, parent);
    if (target && els.includes(target)) {
      removeElement(target);
      node.els = els.filter((el) => el !== target);
    }
  }
}
function addElementToList(els, target) {
  els.push(target);
}
function mount(instance2, node, id, props, head, force, anchorMetaName, parent, ssrAdapter) {
  let style;
  if (id === void 0) {
    style = node.render(props);
    id = murmur2(style);
  }
  if (ssrAdapter) {
    ssrAdapter.adapter(id, style !== null && style !== void 0 ? style : node.render(props));
    return;
  }
  if (parent === void 0) {
    parent = document.head;
  }
  const queriedTarget = queryElement(id, parent);
  if (queriedTarget !== null && !force) {
    return queriedTarget;
  }
  const target = queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : createElement(id);
  if (style === void 0)
    style = node.render(props);
  target.textContent = style;
  if (queriedTarget !== null)
    return queriedTarget;
  if (anchorMetaName) {
    const anchorMetaEl = parent.querySelector(`meta[name="${anchorMetaName}"]`);
    if (anchorMetaEl) {
      parent.insertBefore(target, anchorMetaEl);
      addElementToList(node.els, target);
      return target;
    }
  }
  if (head) {
    parent.insertBefore(target, parent.querySelector("style, link"));
  } else {
    parent.appendChild(target);
  }
  addElementToList(node.els, target);
  return target;
}
function wrappedRender(props) {
  return render(this, this.instance, props);
}
function wrappedMount(options = {}) {
  const { id, ssr, props, head = false, force = false, anchorMetaName, parent } = options;
  const targetElement = mount(this.instance, this, id, props, head, force, anchorMetaName, parent, ssr);
  return targetElement;
}
function wrappedUnmount(options = {}) {
  const { id, parent } = options;
  unmount(this.instance, this, id, parent);
}
const createCNode = function(instance2, $, props, children) {
  return {
    instance: instance2,
    $,
    props,
    children,
    els: [],
    render: wrappedRender,
    mount: wrappedMount,
    unmount: wrappedUnmount
  };
};
const c = function(instance2, $, props, children) {
  if (Array.isArray($)) {
    return createCNode(instance2, { $: null }, null, $);
  } else if (Array.isArray(props)) {
    return createCNode(instance2, $, null, props);
  } else if (Array.isArray(children)) {
    return createCNode(instance2, $, props, children);
  } else {
    return createCNode(instance2, $, props, null);
  }
};
function CssRender(config = {}) {
  const cssr = {
    c: ((...args) => c(cssr, ...args)),
    use: (plugin2, ...args) => plugin2.install(cssr, ...args),
    find: queryElement,
    context: {},
    config
  };
  return cssr;
}
function exists(id, ssr) {
  if (id === void 0)
    return false;
  if (ssr) {
    const { context: { ids } } = ssr;
    return ids.has(id);
  }
  return queryElement(id) !== null;
}
let onceCbs = [];
const paramsMap = /* @__PURE__ */ new WeakMap();
function flushOnceCallbacks() {
  onceCbs.forEach((cb) => cb(...paramsMap.get(cb)));
  onceCbs = [];
}
function beforeNextFrameOnce(cb, ...params) {
  paramsMap.set(cb, params);
  if (onceCbs.includes(cb))
    return;
  onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks);
}
function happensIn(e, dataSetPropName) {
  let { target } = e;
  while (target) {
    if (target.dataset) {
      if (target.dataset[dataSetPropName] !== void 0)
        return true;
    }
    target = target.parentElement;
  }
  return false;
}
function getPreciseEventTarget(event) {
  return event.composedPath()[0] || null;
}
function parseResponsiveProp(reponsiveProp) {
  if (typeof reponsiveProp === "number") {
    return {
      "": reponsiveProp.toString()
    };
  }
  const params = {};
  reponsiveProp.split(/ +/).forEach((pairLiteral) => {
    if (pairLiteral === "")
      return;
    const [prefix2, value] = pairLiteral.split(":");
    if (value === void 0) {
      params[""] = prefix2;
    } else {
      params[prefix2] = value;
    }
  });
  return params;
}
function parseResponsivePropValue(reponsiveProp, activeKeyOrSize) {
  var _a;
  if (reponsiveProp === void 0 || reponsiveProp === null)
    return void 0;
  const classObj = parseResponsiveProp(reponsiveProp);
  if (activeKeyOrSize === void 0)
    return classObj[""];
  if (typeof activeKeyOrSize === "string") {
    return (_a = classObj[activeKeyOrSize]) !== null && _a !== void 0 ? _a : classObj[""];
  } else if (Array.isArray(activeKeyOrSize)) {
    for (let i2 = activeKeyOrSize.length - 1; i2 >= 0; --i2) {
      const key2 = activeKeyOrSize[i2];
      if (key2 in classObj)
        return classObj[key2];
    }
    return classObj[""];
  } else {
    let activeValue = void 0;
    let activeKey = -1;
    Object.keys(classObj).forEach((key2) => {
      const keyAsNum = Number(key2);
      if (!Number.isNaN(keyAsNum) && activeKeyOrSize >= keyAsNum && keyAsNum >= activeKey) {
        activeKey = keyAsNum;
        activeValue = classObj[key2];
      }
    });
    return activeValue;
  }
}
function depx(value) {
  if (typeof value === "string") {
    if (value.endsWith("px")) {
      return Number(value.slice(0, value.length - 2));
    }
    return Number(value);
  }
  return value;
}
function pxfy(value) {
  if (value === void 0 || value === null)
    return void 0;
  if (typeof value === "number")
    return `${value}px`;
  if (value.endsWith("px"))
    return value;
  return `${value}px`;
}
function getMargin(value, position) {
  const parts = value.trim().split(/\s+/g);
  const margin = {
    top: parts[0]
  };
  switch (parts.length) {
    case 1:
      margin.right = parts[0];
      margin.bottom = parts[0];
      margin.left = parts[0];
      break;
    case 2:
      margin.right = parts[1];
      margin.left = parts[1];
      margin.bottom = parts[0];
      break;
    case 3:
      margin.right = parts[1];
      margin.bottom = parts[2];
      margin.left = parts[1];
      break;
    case 4:
      margin.right = parts[1];
      margin.bottom = parts[2];
      margin.left = parts[3];
      break;
    default:
      throw new Error("[seemly/getMargin]:" + value + " is not a valid value.");
  }
  if (position === void 0)
    return margin;
  return margin[position];
}
function getGap(value, orient) {
  const [rowGap, colGap] = value.split(" ");
  return {
    row: rowGap,
    col: colGap || rowGap
  };
}
const colors = {
  aliceblue: "#F0F8FF",
  antiquewhite: "#FAEBD7",
  aqua: "#0FF",
  aquamarine: "#7FFFD4",
  azure: "#F0FFFF",
  beige: "#F5F5DC",
  bisque: "#FFE4C4",
  black: "#000",
  blanchedalmond: "#FFEBCD",
  blue: "#00F",
  blueviolet: "#8A2BE2",
  brown: "#A52A2A",
  burlywood: "#DEB887",
  cadetblue: "#5F9EA0",
  chartreuse: "#7FFF00",
  chocolate: "#D2691E",
  coral: "#FF7F50",
  cornflowerblue: "#6495ED",
  cornsilk: "#FFF8DC",
  crimson: "#DC143C",
  cyan: "#0FF",
  darkblue: "#00008B",
  darkcyan: "#008B8B",
  darkgoldenrod: "#B8860B",
  darkgray: "#A9A9A9",
  darkgrey: "#A9A9A9",
  darkgreen: "#006400",
  darkkhaki: "#BDB76B",
  darkmagenta: "#8B008B",
  darkolivegreen: "#556B2F",
  darkorange: "#FF8C00",
  darkorchid: "#9932CC",
  darkred: "#8B0000",
  darksalmon: "#E9967A",
  darkseagreen: "#8FBC8F",
  darkslateblue: "#483D8B",
  darkslategray: "#2F4F4F",
  darkslategrey: "#2F4F4F",
  darkturquoise: "#00CED1",
  darkviolet: "#9400D3",
  deeppink: "#FF1493",
  deepskyblue: "#00BFFF",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1E90FF",
  firebrick: "#B22222",
  floralwhite: "#FFFAF0",
  forestgreen: "#228B22",
  fuchsia: "#F0F",
  gainsboro: "#DCDCDC",
  ghostwhite: "#F8F8FF",
  gold: "#FFD700",
  goldenrod: "#DAA520",
  gray: "#808080",
  grey: "#808080",
  green: "#008000",
  greenyellow: "#ADFF2F",
  honeydew: "#F0FFF0",
  hotpink: "#FF69B4",
  indianred: "#CD5C5C",
  indigo: "#4B0082",
  ivory: "#FFFFF0",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  lavenderblush: "#FFF0F5",
  lawngreen: "#7CFC00",
  lemonchiffon: "#FFFACD",
  lightblue: "#ADD8E6",
  lightcoral: "#F08080",
  lightcyan: "#E0FFFF",
  lightgoldenrodyellow: "#FAFAD2",
  lightgray: "#D3D3D3",
  lightgrey: "#D3D3D3",
  lightgreen: "#90EE90",
  lightpink: "#FFB6C1",
  lightsalmon: "#FFA07A",
  lightseagreen: "#20B2AA",
  lightskyblue: "#87CEFA",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#B0C4DE",
  lightyellow: "#FFFFE0",
  lime: "#0F0",
  limegreen: "#32CD32",
  linen: "#FAF0E6",
  magenta: "#F0F",
  maroon: "#800000",
  mediumaquamarine: "#66CDAA",
  mediumblue: "#0000CD",
  mediumorchid: "#BA55D3",
  mediumpurple: "#9370DB",
  mediumseagreen: "#3CB371",
  mediumslateblue: "#7B68EE",
  mediumspringgreen: "#00FA9A",
  mediumturquoise: "#48D1CC",
  mediumvioletred: "#C71585",
  midnightblue: "#191970",
  mintcream: "#F5FFFA",
  mistyrose: "#FFE4E1",
  moccasin: "#FFE4B5",
  navajowhite: "#FFDEAD",
  navy: "#000080",
  oldlace: "#FDF5E6",
  olive: "#808000",
  olivedrab: "#6B8E23",
  orange: "#FFA500",
  orangered: "#FF4500",
  orchid: "#DA70D6",
  palegoldenrod: "#EEE8AA",
  palegreen: "#98FB98",
  paleturquoise: "#AFEEEE",
  palevioletred: "#DB7093",
  papayawhip: "#FFEFD5",
  peachpuff: "#FFDAB9",
  peru: "#CD853F",
  pink: "#FFC0CB",
  plum: "#DDA0DD",
  powderblue: "#B0E0E6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#F00",
  rosybrown: "#BC8F8F",
  royalblue: "#4169E1",
  saddlebrown: "#8B4513",
  salmon: "#FA8072",
  sandybrown: "#F4A460",
  seagreen: "#2E8B57",
  seashell: "#FFF5EE",
  sienna: "#A0522D",
  silver: "#C0C0C0",
  skyblue: "#87CEEB",
  slateblue: "#6A5ACD",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#FFFAFA",
  springgreen: "#00FF7F",
  steelblue: "#4682B4",
  tan: "#D2B48C",
  teal: "#008080",
  thistle: "#D8BFD8",
  tomato: "#FF6347",
  turquoise: "#40E0D0",
  violet: "#EE82EE",
  wheat: "#F5DEB3",
  white: "#FFF",
  whitesmoke: "#F5F5F5",
  yellow: "#FF0",
  yellowgreen: "#9ACD32",
  transparent: "#0000"
};
function hsv2rgb(h, s, v) {
  s /= 100;
  v /= 100;
  let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5) * 255, f(3) * 255, f(1) * 255];
}
function hsl2rgb(h, s, l) {
  s /= 100;
  l /= 100;
  let a = s * Math.min(l, 1 - l);
  let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}
const prefix = "^\\s*";
const suffix = "\\s*$";
const percent = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*";
const float = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*";
const hex = "([0-9A-Fa-f])";
const dhex = "([0-9A-Fa-f]{2})";
const hslRegex = new RegExp(`${prefix}hsl\\s*\\(${float},${percent},${percent}\\)${suffix}`);
const hsvRegex = new RegExp(`${prefix}hsv\\s*\\(${float},${percent},${percent}\\)${suffix}`);
const hslaRegex = new RegExp(`${prefix}hsla\\s*\\(${float},${percent},${percent},${float}\\)${suffix}`);
const hsvaRegex = new RegExp(`${prefix}hsva\\s*\\(${float},${percent},${percent},${float}\\)${suffix}`);
const rgbRegex = new RegExp(`${prefix}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
const rgbaRegex = new RegExp(`${prefix}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
const sHexRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${suffix}`);
const hexRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${suffix}`);
const sHexaRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${hex}${suffix}`);
const hexaRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
function parseHex(value) {
  return parseInt(value, 16);
}
function hsla(color) {
  try {
    let i2;
    if (i2 = hslaRegex.exec(color)) {
      return [
        roundDeg(i2[1]),
        roundPercent(i2[5]),
        roundPercent(i2[9]),
        roundAlpha(i2[13])
      ];
    } else if (i2 = hslRegex.exec(color)) {
      return [roundDeg(i2[1]), roundPercent(i2[5]), roundPercent(i2[9]), 1];
    }
    throw new Error(`[seemly/hsla]: Invalid color value ${color}.`);
  } catch (e) {
    throw e;
  }
}
function hsva(color) {
  try {
    let i2;
    if (i2 = hsvaRegex.exec(color)) {
      return [
        roundDeg(i2[1]),
        roundPercent(i2[5]),
        roundPercent(i2[9]),
        roundAlpha(i2[13])
      ];
    } else if (i2 = hsvRegex.exec(color)) {
      return [roundDeg(i2[1]), roundPercent(i2[5]), roundPercent(i2[9]), 1];
    }
    throw new Error(`[seemly/hsva]: Invalid color value ${color}.`);
  } catch (e) {
    throw e;
  }
}
function rgba(color) {
  try {
    let i2;
    if (i2 = hexRegex.exec(color)) {
      return [parseHex(i2[1]), parseHex(i2[2]), parseHex(i2[3]), 1];
    } else if (i2 = rgbRegex.exec(color)) {
      return [roundChannel(i2[1]), roundChannel(i2[5]), roundChannel(i2[9]), 1];
    } else if (i2 = rgbaRegex.exec(color)) {
      return [
        roundChannel(i2[1]),
        roundChannel(i2[5]),
        roundChannel(i2[9]),
        roundAlpha(i2[13])
      ];
    } else if (i2 = sHexRegex.exec(color)) {
      return [
        parseHex(i2[1] + i2[1]),
        parseHex(i2[2] + i2[2]),
        parseHex(i2[3] + i2[3]),
        1
      ];
    } else if (i2 = hexaRegex.exec(color)) {
      return [
        parseHex(i2[1]),
        parseHex(i2[2]),
        parseHex(i2[3]),
        roundAlpha(parseHex(i2[4]) / 255)
      ];
    } else if (i2 = sHexaRegex.exec(color)) {
      return [
        parseHex(i2[1] + i2[1]),
        parseHex(i2[2] + i2[2]),
        parseHex(i2[3] + i2[3]),
        roundAlpha(parseHex(i2[4] + i2[4]) / 255)
      ];
    } else if (color in colors) {
      return rgba(colors[color]);
    } else if (hslRegex.test(color) || hslaRegex.test(color)) {
      const [h, s, l, a] = hsla(color);
      return [...hsl2rgb(h, s, l), a];
    } else if (hsvRegex.test(color) || hsvaRegex.test(color)) {
      const [h, s, v, a] = hsva(color);
      return [...hsv2rgb(h, s, v), a];
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${color}.`);
  } catch (e) {
    throw e;
  }
}
function normalizeAlpha(alphaValue) {
  return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
}
function stringifyRgba(r, g, b, a) {
  return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
}
function compositeChannel(v1, a1, v2, a2, a) {
  return roundChannel((v1 * a1 * (1 - a2) + v2 * a2) / a);
}
function composite(background, overlay) {
  if (!Array.isArray(background))
    background = rgba(background);
  if (!Array.isArray(overlay))
    overlay = rgba(overlay);
  const a1 = background[3];
  const a2 = overlay[3];
  const alpha = roundAlpha(a1 + a2 - a1 * a2);
  return stringifyRgba(compositeChannel(background[0], a1, overlay[0], a2, alpha), compositeChannel(background[1], a1, overlay[1], a2, alpha), compositeChannel(background[2], a1, overlay[2], a2, alpha), alpha);
}
function changeColor(base, options) {
  const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
  if (typeof options.alpha === "number") {
    return stringifyRgba(r, g, b, options.alpha);
  }
  return stringifyRgba(r, g, b, a);
}
function scaleColor(base, options) {
  const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
  const { lightness = 1, alpha = 1 } = options;
  return toRgbaString([r * lightness, g * lightness, b * lightness, a * alpha]);
}
function roundAlpha(value) {
  const v = Math.round(Number(value) * 100) / 100;
  if (v > 1)
    return 1;
  if (v < 0)
    return 0;
  return v;
}
function roundDeg(value) {
  const v = Math.round(Number(value));
  if (v >= 360)
    return 0;
  if (v < 0)
    return 0;
  return v;
}
function roundChannel(value) {
  const v = Math.round(Number(value));
  if (v > 255)
    return 255;
  if (v < 0)
    return 0;
  return v;
}
function roundPercent(value) {
  const v = Math.round(Number(value));
  if (v > 100)
    return 100;
  if (v < 0)
    return 0;
  return v;
}
function toRgbaString(base) {
  const [r, g, b] = base;
  if (3 in base) {
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${roundAlpha(base[3])})`;
  }
  return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, 1)`;
}
function createId(length = 8) {
  return Math.random().toString(16).slice(2, 2 + length);
}
function repeat(count, v) {
  const ret = [];
  for (let i2 = 0; i2 < count; ++i2) {
    ret.push(v);
  }
  return ret;
}
function getEventTarget(e) {
  const path = e.composedPath();
  return path[0];
}
const traps = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function createTrapHandler(name, el, originalHandler) {
  if (name === "mousemoveoutside") {
    const moveHandler = (e) => {
      if (el.contains(getEventTarget(e)))
        return;
      originalHandler(e);
    };
    return {
      mousemove: moveHandler,
      touchstart: moveHandler
    };
  } else if (name === "clickoutside") {
    let mouseDownOutside = false;
    const downHandler = (e) => {
      mouseDownOutside = !el.contains(getEventTarget(e));
    };
    const upHanlder = (e) => {
      if (!mouseDownOutside)
        return;
      if (el.contains(getEventTarget(e)))
        return;
      originalHandler(e);
    };
    return {
      mousedown: downHandler,
      mouseup: upHanlder,
      touchstart: downHandler,
      touchend: upHanlder
    };
  }
  console.error(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `[evtd/create-trap-handler]: name \`${name}\` is invalid. This could be a bug of evtd.`
  );
  return {};
}
function ensureTrapHandlers(name, el, handler) {
  const handlers = traps[name];
  let elHandlers = handlers.get(el);
  if (elHandlers === void 0) {
    handlers.set(el, elHandlers = /* @__PURE__ */ new WeakMap());
  }
  let trapHandler = elHandlers.get(handler);
  if (trapHandler === void 0) {
    elHandlers.set(handler, trapHandler = createTrapHandler(name, el, handler));
  }
  return trapHandler;
}
function trapOn(name, el, handler, options) {
  if (name === "mousemoveoutside" || name === "clickoutside") {
    const trapHandlers = ensureTrapHandlers(name, el, handler);
    Object.keys(trapHandlers).forEach((key2) => {
      on(key2, document, trapHandlers[key2], options);
    });
    return true;
  }
  return false;
}
function trapOff(name, el, handler, options) {
  if (name === "mousemoveoutside" || name === "clickoutside") {
    const trapHandlers = ensureTrapHandlers(name, el, handler);
    Object.keys(trapHandlers).forEach((key2) => {
      off(key2, document, trapHandlers[key2], options);
    });
    return true;
  }
  return false;
}
function createDelegate() {
  if (typeof window === "undefined") {
    return {
      on: () => {
      },
      off: () => {
      }
    };
  }
  const propagationStopped = /* @__PURE__ */ new WeakMap();
  const immediatePropagationStopped = /* @__PURE__ */ new WeakMap();
  function trackPropagation() {
    propagationStopped.set(this, true);
  }
  function trackImmediate() {
    propagationStopped.set(this, true);
    immediatePropagationStopped.set(this, true);
  }
  function spy(event, propName, fn) {
    const source = event[propName];
    event[propName] = function() {
      fn.apply(event, arguments);
      return source.apply(event, arguments);
    };
    return event;
  }
  function unspy(event, propName) {
    event[propName] = Event.prototype[propName];
  }
  const currentTargets = /* @__PURE__ */ new WeakMap();
  const currentTargetDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function getCurrentTarget() {
    var _a;
    return (_a = currentTargets.get(this)) !== null && _a !== void 0 ? _a : null;
  }
  function defineCurrentTarget(event, getter) {
    if (currentTargetDescriptor === void 0)
      return;
    Object.defineProperty(event, "currentTarget", {
      configurable: true,
      enumerable: true,
      get: getter !== null && getter !== void 0 ? getter : currentTargetDescriptor.get
    });
  }
  const phaseToTypeToElToHandlers = {
    bubble: {},
    capture: {}
  };
  const typeToWindowEventHandlers = {};
  function createUnifiedHandler() {
    const delegeteHandler = function(e) {
      const { type: type4, eventPhase, bubbles } = e;
      const target = getEventTarget(e);
      if (eventPhase === 2)
        return;
      const phase = eventPhase === 1 ? "capture" : "bubble";
      let cursor = target;
      const path = [];
      while (true) {
        if (cursor === null)
          cursor = window;
        path.push(cursor);
        if (cursor === window) {
          break;
        }
        cursor = cursor.parentNode || null;
      }
      const captureElToHandlers = phaseToTypeToElToHandlers.capture[type4];
      const bubbleElToHandlers = phaseToTypeToElToHandlers.bubble[type4];
      spy(e, "stopPropagation", trackPropagation);
      spy(e, "stopImmediatePropagation", trackImmediate);
      defineCurrentTarget(e, getCurrentTarget);
      if (phase === "capture") {
        if (captureElToHandlers === void 0)
          return;
        for (let i2 = path.length - 1; i2 >= 0; --i2) {
          if (propagationStopped.has(e))
            break;
          const target2 = path[i2];
          const handlers = captureElToHandlers.get(target2);
          if (handlers !== void 0) {
            currentTargets.set(e, target2);
            for (const handler of handlers) {
              if (immediatePropagationStopped.has(e))
                break;
              handler(e);
            }
          }
          if (i2 === 0 && !bubbles && bubbleElToHandlers !== void 0) {
            const bubbleHandlers = bubbleElToHandlers.get(target2);
            if (bubbleHandlers !== void 0) {
              for (const handler of bubbleHandlers) {
                if (immediatePropagationStopped.has(e))
                  break;
                handler(e);
              }
            }
          }
        }
      } else if (phase === "bubble") {
        if (bubbleElToHandlers === void 0)
          return;
        for (let i2 = 0; i2 < path.length; ++i2) {
          if (propagationStopped.has(e))
            break;
          const target2 = path[i2];
          const handlers = bubbleElToHandlers.get(target2);
          if (handlers !== void 0) {
            currentTargets.set(e, target2);
            for (const handler of handlers) {
              if (immediatePropagationStopped.has(e))
                break;
              handler(e);
            }
          }
        }
      }
      unspy(e, "stopPropagation");
      unspy(e, "stopImmediatePropagation");
      defineCurrentTarget(e);
    };
    delegeteHandler.displayName = "evtdUnifiedHandler";
    return delegeteHandler;
  }
  function createUnifiedWindowEventHandler() {
    const delegateHandler = function(e) {
      const { type: type4, eventPhase } = e;
      if (eventPhase !== 2)
        return;
      const handlers = typeToWindowEventHandlers[type4];
      if (handlers === void 0)
        return;
      handlers.forEach((handler) => handler(e));
    };
    delegateHandler.displayName = "evtdUnifiedWindowEventHandler";
    return delegateHandler;
  }
  const unifiedHandler = createUnifiedHandler();
  const unfiendWindowEventHandler = createUnifiedWindowEventHandler();
  function ensureElToHandlers(phase, type4) {
    const phaseHandlers = phaseToTypeToElToHandlers[phase];
    if (phaseHandlers[type4] === void 0) {
      phaseHandlers[type4] = /* @__PURE__ */ new Map();
      window.addEventListener(type4, unifiedHandler, phase === "capture");
    }
    return phaseHandlers[type4];
  }
  function ensureWindowEventHandlers(type4) {
    const windowEventHandlers = typeToWindowEventHandlers[type4];
    if (windowEventHandlers === void 0) {
      typeToWindowEventHandlers[type4] = /* @__PURE__ */ new Set();
      window.addEventListener(type4, unfiendWindowEventHandler);
    }
    return typeToWindowEventHandlers[type4];
  }
  function ensureHandlers(elToHandlers, el) {
    let elHandlers = elToHandlers.get(el);
    if (elHandlers === void 0) {
      elToHandlers.set(el, elHandlers = /* @__PURE__ */ new Set());
    }
    return elHandlers;
  }
  function handlerExist(el, phase, type4, handler) {
    const elToHandlers = phaseToTypeToElToHandlers[phase][type4];
    if (elToHandlers !== void 0) {
      const handlers = elToHandlers.get(el);
      if (handlers !== void 0) {
        if (handlers.has(handler))
          return true;
      }
    }
    return false;
  }
  function windowEventHandlerExist(type4, handler) {
    const handlers = typeToWindowEventHandlers[type4];
    if (handlers !== void 0) {
      if (handlers.has(handler)) {
        return true;
      }
    }
    return false;
  }
  function on2(type4, el, handler, options) {
    let mergedHandler;
    if (typeof options === "object" && options.once === true) {
      mergedHandler = (e) => {
        off2(type4, el, mergedHandler, options);
        handler(e);
      };
    } else {
      mergedHandler = handler;
    }
    const trapped = trapOn(type4, el, mergedHandler, options);
    if (trapped)
      return;
    const phase = options === true || typeof options === "object" && options.capture === true ? "capture" : "bubble";
    const elToHandlers = ensureElToHandlers(phase, type4);
    const handlers = ensureHandlers(elToHandlers, el);
    if (!handlers.has(mergedHandler))
      handlers.add(mergedHandler);
    if (el === window) {
      const windowEventHandlers = ensureWindowEventHandlers(type4);
      if (!windowEventHandlers.has(mergedHandler)) {
        windowEventHandlers.add(mergedHandler);
      }
    }
  }
  function off2(type4, el, handler, options) {
    const trapped = trapOff(type4, el, handler, options);
    if (trapped)
      return;
    const capture = options === true || typeof options === "object" && options.capture === true;
    const phase = capture ? "capture" : "bubble";
    const elToHandlers = ensureElToHandlers(phase, type4);
    const handlers = ensureHandlers(elToHandlers, el);
    if (el === window) {
      const mirrorPhase = capture ? "bubble" : "capture";
      if (!handlerExist(el, mirrorPhase, type4, handler) && windowEventHandlerExist(type4, handler)) {
        const windowEventHandlers = typeToWindowEventHandlers[type4];
        windowEventHandlers.delete(handler);
        if (windowEventHandlers.size === 0) {
          window.removeEventListener(type4, unfiendWindowEventHandler);
          typeToWindowEventHandlers[type4] = void 0;
        }
      }
    }
    if (handlers.has(handler))
      handlers.delete(handler);
    if (handlers.size === 0) {
      elToHandlers.delete(el);
    }
    if (elToHandlers.size === 0) {
      window.removeEventListener(type4, unifiedHandler, phase === "capture");
      phaseToTypeToElToHandlers[phase][type4] = void 0;
    }
  }
  return {
    on: on2,
    off: off2
  };
}
const { on, off } = createDelegate();
var resizeObservers = [];
var hasActiveObservations = function() {
  return resizeObservers.some(function(ro) {
    return ro.activeTargets.length > 0;
  });
};
var hasSkippedObservations = function() {
  return resizeObservers.some(function(ro) {
    return ro.skippedTargets.length > 0;
  });
};
var msg = "ResizeObserver loop completed with undelivered notifications.";
var deliverResizeLoopError = function() {
  var event;
  if (typeof ErrorEvent === "function") {
    event = new ErrorEvent("error", {
      message: msg
    });
  } else {
    event = document.createEvent("Event");
    event.initEvent("error", false, false);
    event.message = msg;
  }
  window.dispatchEvent(event);
};
var ResizeObserverBoxOptions;
(function(ResizeObserverBoxOptions2) {
  ResizeObserverBoxOptions2["BORDER_BOX"] = "border-box";
  ResizeObserverBoxOptions2["CONTENT_BOX"] = "content-box";
  ResizeObserverBoxOptions2["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));
var freeze = function(obj) {
  return Object.freeze(obj);
};
var ResizeObserverSize = /* @__PURE__ */ (function() {
  function ResizeObserverSize2(inlineSize, blockSize) {
    this.inlineSize = inlineSize;
    this.blockSize = blockSize;
    freeze(this);
  }
  return ResizeObserverSize2;
})();
var DOMRectReadOnly = (function() {
  function DOMRectReadOnly2(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    return freeze(this);
  }
  DOMRectReadOnly2.prototype.toJSON = function() {
    var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
    return { x, y, top, right, bottom, left, width, height };
  };
  DOMRectReadOnly2.fromRect = function(rectangle) {
    return new DOMRectReadOnly2(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };
  return DOMRectReadOnly2;
})();
var isSVG = function(target) {
  return target instanceof SVGElement && "getBBox" in target;
};
var isHidden = function(target) {
  if (isSVG(target)) {
    var _a = target.getBBox(), width = _a.width, height = _a.height;
    return !width && !height;
  }
  var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
  return !(offsetWidth || offsetHeight || target.getClientRects().length);
};
var isElement = function(obj) {
  var _a;
  if (obj instanceof Element) {
    return true;
  }
  var scope = (_a = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
  return !!(scope && obj instanceof scope.Element);
};
var isReplacedElement = function(target) {
  switch (target.tagName) {
    case "INPUT":
      if (target.type !== "image") {
        break;
      }
    case "VIDEO":
    case "AUDIO":
    case "EMBED":
    case "OBJECT":
    case "CANVAS":
    case "IFRAME":
    case "IMG":
      return true;
  }
  return false;
};
var global$1 = typeof window !== "undefined" ? window : {};
var cache = /* @__PURE__ */ new WeakMap();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = /msie|trident/i.test(global$1.navigator && global$1.navigator.userAgent);
var parseDimension = function(pixel) {
  return parseFloat(pixel || "0");
};
var size = function(inlineSize, blockSize, switchSizes) {
  if (inlineSize === void 0) {
    inlineSize = 0;
  }
  if (blockSize === void 0) {
    blockSize = 0;
  }
  if (switchSizes === void 0) {
    switchSizes = false;
  }
  return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
};
var zeroBoxes = freeze({
  devicePixelContentBoxSize: size(),
  borderBoxSize: size(),
  contentBoxSize: size(),
  contentRect: new DOMRectReadOnly(0, 0, 0, 0)
});
var calculateBoxSizes = function(target, forceRecalculation) {
  if (forceRecalculation === void 0) {
    forceRecalculation = false;
  }
  if (cache.has(target) && !forceRecalculation) {
    return cache.get(target);
  }
  if (isHidden(target)) {
    cache.set(target, zeroBoxes);
    return zeroBoxes;
  }
  var cs = getComputedStyle(target);
  var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
  var removePadding = !IE && cs.boxSizing === "border-box";
  var switchSizes = verticalRegexp.test(cs.writingMode || "");
  var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
  var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
  var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
  var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
  var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
  var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
  var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
  var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
  var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
  var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
  var horizontalPadding = paddingLeft + paddingRight;
  var verticalPadding = paddingTop + paddingBottom;
  var horizontalBorderArea = borderLeft + borderRight;
  var verticalBorderArea = borderTop + borderBottom;
  var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
  var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
  var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
  var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
  var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
  var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
  var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
  var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
  var boxes = freeze({
    devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
    borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
    contentBoxSize: size(contentWidth, contentHeight, switchSizes),
    contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
  });
  cache.set(target, boxes);
  return boxes;
};
var calculateBoxSize = function(target, observedBox, forceRecalculation) {
  var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
  switch (observedBox) {
    case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
      return devicePixelContentBoxSize;
    case ResizeObserverBoxOptions.BORDER_BOX:
      return borderBoxSize;
    default:
      return contentBoxSize;
  }
};
var ResizeObserverEntry = /* @__PURE__ */ (function() {
  function ResizeObserverEntry2(target) {
    var boxes = calculateBoxSizes(target);
    this.target = target;
    this.contentRect = boxes.contentRect;
    this.borderBoxSize = freeze([boxes.borderBoxSize]);
    this.contentBoxSize = freeze([boxes.contentBoxSize]);
    this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
  }
  return ResizeObserverEntry2;
})();
var calculateDepthForNode = function(node) {
  if (isHidden(node)) {
    return Infinity;
  }
  var depth = 0;
  var parent = node.parentNode;
  while (parent) {
    depth += 1;
    parent = parent.parentNode;
  }
  return depth;
};
var broadcastActiveObservations = function() {
  var shallowestDepth = Infinity;
  var callbacks2 = [];
  resizeObservers.forEach(function processObserver(ro) {
    if (ro.activeTargets.length === 0) {
      return;
    }
    var entries = [];
    ro.activeTargets.forEach(function processTarget(ot) {
      var entry = new ResizeObserverEntry(ot.target);
      var targetDepth = calculateDepthForNode(ot.target);
      entries.push(entry);
      ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
      if (targetDepth < shallowestDepth) {
        shallowestDepth = targetDepth;
      }
    });
    callbacks2.push(function resizeObserverCallback() {
      ro.callback.call(ro.observer, entries, ro.observer);
    });
    ro.activeTargets.splice(0, ro.activeTargets.length);
  });
  for (var _i = 0, callbacks_1 = callbacks2; _i < callbacks_1.length; _i++) {
    var callback = callbacks_1[_i];
    callback();
  }
  return shallowestDepth;
};
var gatherActiveObservationsAtDepth = function(depth) {
  resizeObservers.forEach(function processObserver(ro) {
    ro.activeTargets.splice(0, ro.activeTargets.length);
    ro.skippedTargets.splice(0, ro.skippedTargets.length);
    ro.observationTargets.forEach(function processTarget(ot) {
      if (ot.isActive()) {
        if (calculateDepthForNode(ot.target) > depth) {
          ro.activeTargets.push(ot);
        } else {
          ro.skippedTargets.push(ot);
        }
      }
    });
  });
};
var process$1 = function() {
  var depth = 0;
  gatherActiveObservationsAtDepth(depth);
  while (hasActiveObservations()) {
    depth = broadcastActiveObservations();
    gatherActiveObservationsAtDepth(depth);
  }
  if (hasSkippedObservations()) {
    deliverResizeLoopError();
  }
  return depth > 0;
};
var trigger;
var callbacks = [];
var notify = function() {
  return callbacks.splice(0).forEach(function(cb) {
    return cb();
  });
};
var queueMicroTask = function(callback) {
  if (!trigger) {
    var toggle_1 = 0;
    var el_1 = document.createTextNode("");
    var config = { characterData: true };
    new MutationObserver(function() {
      return notify();
    }).observe(el_1, config);
    trigger = function() {
      el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++);
    };
  }
  callbacks.push(callback);
  trigger();
};
var queueResizeObserver = function(cb) {
  queueMicroTask(function ResizeObserver2() {
    requestAnimationFrame(cb);
  });
};
var watching = 0;
var isWatching = function() {
  return !!watching;
};
var CATCH_PERIOD = 250;
var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
var events = [
  "resize",
  "load",
  "transitionend",
  "animationend",
  "animationstart",
  "animationiteration",
  "keyup",
  "keydown",
  "mouseup",
  "mousedown",
  "mouseover",
  "mouseout",
  "blur",
  "focus"
];
var time = function(timeout) {
  if (timeout === void 0) {
    timeout = 0;
  }
  return Date.now() + timeout;
};
var scheduled = false;
var Scheduler = (function() {
  function Scheduler2() {
    var _this = this;
    this.stopped = true;
    this.listener = function() {
      return _this.schedule();
    };
  }
  Scheduler2.prototype.run = function(timeout) {
    var _this = this;
    if (timeout === void 0) {
      timeout = CATCH_PERIOD;
    }
    if (scheduled) {
      return;
    }
    scheduled = true;
    var until = time(timeout);
    queueResizeObserver(function() {
      var elementsHaveResized = false;
      try {
        elementsHaveResized = process$1();
      } finally {
        scheduled = false;
        timeout = until - time();
        if (!isWatching()) {
          return;
        }
        if (elementsHaveResized) {
          _this.run(1e3);
        } else if (timeout > 0) {
          _this.run(timeout);
        } else {
          _this.start();
        }
      }
    });
  };
  Scheduler2.prototype.schedule = function() {
    this.stop();
    this.run();
  };
  Scheduler2.prototype.observe = function() {
    var _this = this;
    var cb = function() {
      return _this.observer && _this.observer.observe(document.body, observerConfig);
    };
    document.body ? cb() : global$1.addEventListener("DOMContentLoaded", cb);
  };
  Scheduler2.prototype.start = function() {
    var _this = this;
    if (this.stopped) {
      this.stopped = false;
      this.observer = new MutationObserver(this.listener);
      this.observe();
      events.forEach(function(name) {
        return global$1.addEventListener(name, _this.listener, true);
      });
    }
  };
  Scheduler2.prototype.stop = function() {
    var _this = this;
    if (!this.stopped) {
      this.observer && this.observer.disconnect();
      events.forEach(function(name) {
        return global$1.removeEventListener(name, _this.listener, true);
      });
      this.stopped = true;
    }
  };
  return Scheduler2;
})();
var scheduler = new Scheduler();
var updateCount = function(n) {
  !watching && n > 0 && scheduler.start();
  watching += n;
  !watching && scheduler.stop();
};
var skipNotifyOnElement = function(target) {
  return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
};
var ResizeObservation = (function() {
  function ResizeObservation2(target, observedBox) {
    this.target = target;
    this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
    this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  ResizeObservation2.prototype.isActive = function() {
    var size2 = calculateBoxSize(this.target, this.observedBox, true);
    if (skipNotifyOnElement(this.target)) {
      this.lastReportedSize = size2;
    }
    if (this.lastReportedSize.inlineSize !== size2.inlineSize || this.lastReportedSize.blockSize !== size2.blockSize) {
      return true;
    }
    return false;
  };
  return ResizeObservation2;
})();
var ResizeObserverDetail = /* @__PURE__ */ (function() {
  function ResizeObserverDetail2(resizeObserver, callback) {
    this.activeTargets = [];
    this.skippedTargets = [];
    this.observationTargets = [];
    this.observer = resizeObserver;
    this.callback = callback;
  }
  return ResizeObserverDetail2;
})();
var observerMap = /* @__PURE__ */ new WeakMap();
var getObservationIndex = function(observationTargets, target) {
  for (var i2 = 0; i2 < observationTargets.length; i2 += 1) {
    if (observationTargets[i2].target === target) {
      return i2;
    }
  }
  return -1;
};
var ResizeObserverController = (function() {
  function ResizeObserverController2() {
  }
  ResizeObserverController2.connect = function(resizeObserver, callback) {
    var detail = new ResizeObserverDetail(resizeObserver, callback);
    observerMap.set(resizeObserver, detail);
  };
  ResizeObserverController2.observe = function(resizeObserver, target, options) {
    var detail = observerMap.get(resizeObserver);
    var firstObservation = detail.observationTargets.length === 0;
    if (getObservationIndex(detail.observationTargets, target) < 0) {
      firstObservation && resizeObservers.push(detail);
      detail.observationTargets.push(new ResizeObservation(target, options && options.box));
      updateCount(1);
      scheduler.schedule();
    }
  };
  ResizeObserverController2.unobserve = function(resizeObserver, target) {
    var detail = observerMap.get(resizeObserver);
    var index = getObservationIndex(detail.observationTargets, target);
    var lastObservation = detail.observationTargets.length === 1;
    if (index >= 0) {
      lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
      detail.observationTargets.splice(index, 1);
      updateCount(-1);
    }
  };
  ResizeObserverController2.disconnect = function(resizeObserver) {
    var _this = this;
    var detail = observerMap.get(resizeObserver);
    detail.observationTargets.slice().forEach(function(ot) {
      return _this.unobserve(resizeObserver, ot.target);
    });
    detail.activeTargets.splice(0, detail.activeTargets.length);
  };
  return ResizeObserverController2;
})();
var ResizeObserver = (function() {
  function ResizeObserver2(callback) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (typeof callback !== "function") {
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    }
    ResizeObserverController.connect(this, callback);
  }
  ResizeObserver2.prototype.observe = function(target, options) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (!isElement(target)) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }
    ResizeObserverController.observe(this, target, options);
  };
  ResizeObserver2.prototype.unobserve = function(target) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (!isElement(target)) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }
    ResizeObserverController.unobserve(this, target);
  };
  ResizeObserver2.prototype.disconnect = function() {
    ResizeObserverController.disconnect(this);
  };
  ResizeObserver2.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  };
  return ResizeObserver2;
})();
function toArray(arg) {
  if (Array.isArray(arg))
    return arg;
  return [arg];
}
const TRAVERSE_COMMAND = {
  STOP: "STOP"
};
function traverseWithCb(treeNode, callback) {
  const command = callback(treeNode);
  if (treeNode.children !== void 0 && command !== TRAVERSE_COMMAND.STOP) {
    treeNode.children.forEach((childNode) => traverseWithCb(childNode, callback));
  }
}
function getNonLeafKeys(treeNodes, options = {}) {
  const { preserveGroup = false } = options;
  const keys = [];
  const cb = preserveGroup ? (node) => {
    if (!node.isLeaf) {
      keys.push(node.key);
      traverse(node.children);
    }
  } : (node) => {
    if (!node.isLeaf) {
      if (!node.isGroup)
        keys.push(node.key);
      traverse(node.children);
    }
  };
  function traverse(nodes) {
    nodes.forEach(cb);
  }
  traverse(treeNodes);
  return keys;
}
function isLeaf(rawNode, getChildren) {
  const { isLeaf: isLeaf2 } = rawNode;
  if (isLeaf2 !== void 0)
    return isLeaf2;
  else if (!getChildren(rawNode))
    return true;
  return false;
}
function defaultGetChildren(node) {
  return node.children;
}
function defaultGetKey(node) {
  return node.key;
}
function isIgnored() {
  return false;
}
function isShallowLoaded(rawNode, getChildren) {
  const { isLeaf: isLeaf2 } = rawNode;
  if (isLeaf2 === false && !Array.isArray(getChildren(rawNode)))
    return false;
  return true;
}
function isDisabled(rawNode) {
  return rawNode.disabled === true;
}
function isExpilicitlyNotLoaded(rawNode, getChildren) {
  return rawNode.isLeaf === false && !Array.isArray(getChildren(rawNode));
}
function unwrapCheckedKeys(result) {
  var _a;
  if (result === void 0 || result === null)
    return [];
  if (Array.isArray(result))
    return result;
  return (_a = result.checkedKeys) !== null && _a !== void 0 ? _a : [];
}
function unwrapIndeterminateKeys(result) {
  var _a;
  if (result === void 0 || result === null || Array.isArray(result)) {
    return [];
  }
  return (_a = result.indeterminateKeys) !== null && _a !== void 0 ? _a : [];
}
function merge(originalKeys, keysToAdd) {
  const set = new Set(originalKeys);
  keysToAdd.forEach((key2) => {
    if (!set.has(key2)) {
      set.add(key2);
    }
  });
  return Array.from(set);
}
function minus(originalKeys, keysToRemove) {
  const set = new Set(originalKeys);
  keysToRemove.forEach((key2) => {
    if (set.has(key2)) {
      set.delete(key2);
    }
  });
  return Array.from(set);
}
function isGroup(rawNode) {
  return (rawNode === null || rawNode === void 0 ? void 0 : rawNode.type) === "group";
}
function createIndexGetter(treeNodes) {
  const map = /* @__PURE__ */ new Map();
  treeNodes.forEach((treeNode, i2) => {
    map.set(treeNode.key, i2);
  });
  return (key2) => {
    var _a;
    return (_a = map.get(key2)) !== null && _a !== void 0 ? _a : null;
  };
}
class SubtreeNotLoadedError extends Error {
  constructor() {
    super();
    this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function getExtendedCheckedKeySetAfterCheck(checkKeys, currentCheckedKeys, treeMate, allowNotLoaded) {
  return getExtendedCheckedKeySet(currentCheckedKeys.concat(checkKeys), treeMate, allowNotLoaded, false);
}
function getAvailableAscendantNodeSet(uncheckedKeys, treeMate) {
  const visitedKeys = /* @__PURE__ */ new Set();
  uncheckedKeys.forEach((uncheckedKey) => {
    const uncheckedTreeNode = treeMate.treeNodeMap.get(uncheckedKey);
    if (uncheckedTreeNode !== void 0) {
      let nodeCursor = uncheckedTreeNode.parent;
      while (nodeCursor !== null) {
        if (nodeCursor.disabled)
          break;
        if (visitedKeys.has(nodeCursor.key))
          break;
        else {
          visitedKeys.add(nodeCursor.key);
        }
        nodeCursor = nodeCursor.parent;
      }
    }
  });
  return visitedKeys;
}
function getExtendedCheckedKeySetAfterUncheck(uncheckedKeys, currentCheckedKeys, treeMate, allowNotLoaded) {
  const extendedCheckedKeySet = getExtendedCheckedKeySet(currentCheckedKeys, treeMate, allowNotLoaded, false);
  const extendedKeySetToUncheck = getExtendedCheckedKeySet(uncheckedKeys, treeMate, allowNotLoaded, true);
  const ascendantKeySet = getAvailableAscendantNodeSet(uncheckedKeys, treeMate);
  const keysToRemove = [];
  extendedCheckedKeySet.forEach((key2) => {
    if (extendedKeySetToUncheck.has(key2) || ascendantKeySet.has(key2)) {
      keysToRemove.push(key2);
    }
  });
  keysToRemove.forEach((key2) => extendedCheckedKeySet.delete(key2));
  return extendedCheckedKeySet;
}
function getCheckedKeys(options, treeMate) {
  const { checkedKeys, keysToCheck, keysToUncheck, indeterminateKeys, cascade, leafOnly, checkStrategy, allowNotLoaded } = options;
  if (!cascade) {
    if (keysToCheck !== void 0) {
      return {
        checkedKeys: merge(checkedKeys, keysToCheck),
        indeterminateKeys: Array.from(indeterminateKeys)
      };
    } else if (keysToUncheck !== void 0) {
      return {
        checkedKeys: minus(checkedKeys, keysToUncheck),
        indeterminateKeys: Array.from(indeterminateKeys)
      };
    } else {
      return {
        checkedKeys: Array.from(checkedKeys),
        indeterminateKeys: Array.from(indeterminateKeys)
      };
    }
  }
  const { levelTreeNodeMap } = treeMate;
  let extendedCheckedKeySet;
  if (keysToUncheck !== void 0) {
    extendedCheckedKeySet = getExtendedCheckedKeySetAfterUncheck(keysToUncheck, checkedKeys, treeMate, allowNotLoaded);
  } else if (keysToCheck !== void 0) {
    extendedCheckedKeySet = getExtendedCheckedKeySetAfterCheck(keysToCheck, checkedKeys, treeMate, allowNotLoaded);
  } else {
    extendedCheckedKeySet = getExtendedCheckedKeySet(checkedKeys, treeMate, allowNotLoaded, false);
  }
  const checkStrategyIsParent = checkStrategy === "parent";
  const checkStrategyIsChild = checkStrategy === "child" || leafOnly;
  const syntheticCheckedKeySet = extendedCheckedKeySet;
  const syntheticIndeterminateKeySet = /* @__PURE__ */ new Set();
  const maxLevel = Math.max.apply(null, Array.from(levelTreeNodeMap.keys()));
  for (let level = maxLevel; level >= 0; level -= 1) {
    const levelIsZero = level === 0;
    const levelTreeNodes = levelTreeNodeMap.get(level);
    for (const levelTreeNode of levelTreeNodes) {
      if (levelTreeNode.isLeaf)
        continue;
      const { key: levelTreeNodeKey, shallowLoaded } = levelTreeNode;
      if (checkStrategyIsChild && shallowLoaded) {
        levelTreeNode.children.forEach((v) => {
          if (!v.disabled && !v.isLeaf && v.shallowLoaded && syntheticCheckedKeySet.has(v.key)) {
            syntheticCheckedKeySet.delete(v.key);
          }
        });
      }
      if (levelTreeNode.disabled || !shallowLoaded) {
        continue;
      }
      let fullyChecked = true;
      let partialChecked = false;
      let allDisabled = true;
      for (const childNode of levelTreeNode.children) {
        const childKey = childNode.key;
        if (childNode.disabled)
          continue;
        if (allDisabled)
          allDisabled = false;
        if (syntheticCheckedKeySet.has(childKey)) {
          partialChecked = true;
        } else if (syntheticIndeterminateKeySet.has(childKey)) {
          partialChecked = true;
          fullyChecked = false;
          break;
        } else {
          fullyChecked = false;
          if (partialChecked) {
            break;
          }
        }
      }
      if (fullyChecked && !allDisabled) {
        if (checkStrategyIsParent) {
          levelTreeNode.children.forEach((v) => {
            if (!v.disabled && syntheticCheckedKeySet.has(v.key)) {
              syntheticCheckedKeySet.delete(v.key);
            }
          });
        }
        syntheticCheckedKeySet.add(levelTreeNodeKey);
      } else if (partialChecked) {
        syntheticIndeterminateKeySet.add(levelTreeNodeKey);
      }
      if (levelIsZero && checkStrategyIsChild && syntheticCheckedKeySet.has(levelTreeNodeKey)) {
        syntheticCheckedKeySet.delete(levelTreeNodeKey);
      }
    }
  }
  return {
    checkedKeys: Array.from(syntheticCheckedKeySet),
    indeterminateKeys: Array.from(syntheticIndeterminateKeySet)
  };
}
function getExtendedCheckedKeySet(checkedKeys, treeMate, allowNotLoaded, isUnchecking) {
  const { treeNodeMap, getChildren } = treeMate;
  const visitedKeySet = /* @__PURE__ */ new Set();
  const extendedKeySet = new Set(checkedKeys);
  checkedKeys.forEach((checkedKey) => {
    const checkedTreeNode = treeNodeMap.get(checkedKey);
    if (checkedTreeNode !== void 0) {
      traverseWithCb(checkedTreeNode, (treeNode) => {
        if (treeNode.disabled) {
          return TRAVERSE_COMMAND.STOP;
        }
        const { key: key2 } = treeNode;
        if (visitedKeySet.has(key2))
          return;
        visitedKeySet.add(key2);
        extendedKeySet.add(key2);
        if (isExpilicitlyNotLoaded(treeNode.rawNode, getChildren)) {
          if (isUnchecking) {
            return TRAVERSE_COMMAND.STOP;
          } else if (!allowNotLoaded) {
            throw new SubtreeNotLoadedError();
          }
        }
      });
    }
  });
  return extendedKeySet;
}
function getPath(key2, { includeGroup = false, includeSelf = true }, treeMate) {
  var _a;
  const treeNodeMap = treeMate.treeNodeMap;
  let treeNode = key2 === null || key2 === void 0 ? null : (_a = treeNodeMap.get(key2)) !== null && _a !== void 0 ? _a : null;
  const mergedPath = {
    keyPath: [],
    treeNodePath: [],
    treeNode
  };
  if (treeNode === null || treeNode === void 0 ? void 0 : treeNode.ignored) {
    mergedPath.treeNode = null;
    return mergedPath;
  }
  while (treeNode) {
    if (!treeNode.ignored && (includeGroup || !treeNode.isGroup)) {
      mergedPath.treeNodePath.push(treeNode);
    }
    treeNode = treeNode.parent;
  }
  mergedPath.treeNodePath.reverse();
  if (!includeSelf)
    mergedPath.treeNodePath.pop();
  mergedPath.keyPath = mergedPath.treeNodePath.map((treeNode2) => treeNode2.key);
  return mergedPath;
}
function getFirstAvailableNode(nodes) {
  if (nodes.length === 0)
    return null;
  const node = nodes[0];
  if (node.isGroup || node.ignored || node.disabled) {
    return node.getNext();
  }
  return node;
}
function rawGetNext(node, loop) {
  const sibs = node.siblings;
  const l = sibs.length;
  const { index } = node;
  if (loop) {
    return sibs[(index + 1) % l];
  } else {
    if (index === sibs.length - 1)
      return null;
    return sibs[index + 1];
  }
}
function move(fromNode, dir, { loop = false, includeDisabled = false } = {}) {
  const iterate = dir === "prev" ? rawGetPrev : rawGetNext;
  const getChildOptions = {
    reverse: dir === "prev"
  };
  let meet = false;
  let endNode = null;
  function traverse(node) {
    if (node === null)
      return;
    if (node === fromNode) {
      if (!meet) {
        meet = true;
      } else if (!fromNode.disabled && !fromNode.isGroup) {
        endNode = fromNode;
        return;
      }
    } else {
      if ((!node.disabled || includeDisabled) && !node.ignored && !node.isGroup) {
        endNode = node;
        return;
      }
    }
    if (node.isGroup) {
      const child = getChild(node, getChildOptions);
      if (child !== null) {
        endNode = child;
      } else {
        traverse(iterate(node, loop));
      }
    } else {
      const nextNode = iterate(node, false);
      if (nextNode !== null) {
        traverse(nextNode);
      } else {
        const parent = rawGetParent(node);
        if (parent === null || parent === void 0 ? void 0 : parent.isGroup) {
          traverse(iterate(parent, loop));
        } else if (loop) {
          traverse(iterate(node, true));
        }
      }
    }
  }
  traverse(fromNode);
  return endNode;
}
function rawGetPrev(node, loop) {
  const sibs = node.siblings;
  const l = sibs.length;
  const { index } = node;
  if (loop) {
    return sibs[(index - 1 + l) % l];
  } else {
    if (index === 0)
      return null;
    return sibs[index - 1];
  }
}
function rawGetParent(node) {
  return node.parent;
}
function getChild(node, options = {}) {
  const { reverse = false } = options;
  const { children } = node;
  if (children) {
    const { length } = children;
    const start = reverse ? length - 1 : 0;
    const end = reverse ? -1 : length;
    const delta = reverse ? -1 : 1;
    for (let i2 = start; i2 !== end; i2 += delta) {
      const child = children[i2];
      if (!child.disabled && !child.ignored) {
        if (child.isGroup) {
          const childInGroup = getChild(child, options);
          if (childInGroup !== null)
            return childInGroup;
        } else {
          return child;
        }
      }
    }
  }
  return null;
}
const moveMethods = {
  getChild() {
    if (this.ignored)
      return null;
    return getChild(this);
  },
  getParent() {
    const { parent } = this;
    if (parent === null || parent === void 0 ? void 0 : parent.isGroup) {
      return parent.getParent();
    }
    return parent;
  },
  getNext(options = {}) {
    return move(this, "next", options);
  },
  getPrev(options = {}) {
    return move(this, "prev", options);
  }
};
function flatten$1(treeNodes, expandedKeys) {
  const expandedKeySet = expandedKeys ? new Set(expandedKeys) : void 0;
  const flattenedNodes = [];
  function traverse(treeNodes2) {
    treeNodes2.forEach((treeNode) => {
      flattenedNodes.push(treeNode);
      if (treeNode.isLeaf || !treeNode.children || treeNode.ignored)
        return;
      if (treeNode.isGroup) {
        traverse(treeNode.children);
      } else if (
        // normal non-leaf node
        expandedKeySet === void 0 || expandedKeySet.has(treeNode.key)
      ) {
        traverse(treeNode.children);
      }
    });
  }
  traverse(treeNodes);
  return flattenedNodes;
}
function contains(parent, child) {
  const parentKey = parent.key;
  while (child) {
    if (child.key === parentKey)
      return true;
    child = child.parent;
  }
  return false;
}
function createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, parent = null, level = 0) {
  const treeNodes = [];
  rawNodes.forEach((rawNode, index) => {
    var _a;
    const treeNode = Object.create(nodeProto);
    treeNode.rawNode = rawNode;
    treeNode.siblings = treeNodes;
    treeNode.level = level;
    treeNode.index = index;
    treeNode.isFirstChild = index === 0;
    treeNode.isLastChild = index + 1 === rawNodes.length;
    treeNode.parent = parent;
    if (!treeNode.ignored) {
      const rawChildren = getChildren(rawNode);
      if (Array.isArray(rawChildren)) {
        treeNode.children = createTreeNodes(rawChildren, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, treeNode, level + 1);
      }
    }
    treeNodes.push(treeNode);
    treeNodeMap.set(treeNode.key, treeNode);
    if (!levelTreeNodeMap.has(level))
      levelTreeNodeMap.set(level, []);
    (_a = levelTreeNodeMap.get(level)) === null || _a === void 0 ? void 0 : _a.push(treeNode);
  });
  return treeNodes;
}
function createTreeMate(rawNodes, options = {}) {
  var _a;
  const treeNodeMap = /* @__PURE__ */ new Map();
  const levelTreeNodeMap = /* @__PURE__ */ new Map();
  const { getDisabled = isDisabled, getIgnored = isIgnored, getIsGroup = isGroup, getKey = defaultGetKey } = options;
  const _getChildren = (_a = options.getChildren) !== null && _a !== void 0 ? _a : defaultGetChildren;
  const getChildren = options.ignoreEmptyChildren ? (node) => {
    const children = _getChildren(node);
    if (Array.isArray(children)) {
      if (!children.length)
        return null;
      return children;
    }
    return children;
  } : _getChildren;
  const nodeProto = Object.assign({
    get key() {
      return getKey(this.rawNode);
    },
    get disabled() {
      return getDisabled(this.rawNode);
    },
    get isGroup() {
      return getIsGroup(this.rawNode);
    },
    get isLeaf() {
      return isLeaf(this.rawNode, getChildren);
    },
    get shallowLoaded() {
      return isShallowLoaded(this.rawNode, getChildren);
    },
    get ignored() {
      return getIgnored(this.rawNode);
    },
    contains(node) {
      return contains(this, node);
    }
  }, moveMethods);
  const treeNodes = createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren);
  function getNode(key2) {
    if (key2 === null || key2 === void 0)
      return null;
    const tmNode = treeNodeMap.get(key2);
    if (tmNode && !tmNode.isGroup && !tmNode.ignored) {
      return tmNode;
    }
    return null;
  }
  function _getNode(key2) {
    if (key2 === null || key2 === void 0)
      return null;
    const tmNode = treeNodeMap.get(key2);
    if (tmNode && !tmNode.ignored) {
      return tmNode;
    }
    return null;
  }
  function getPrev(key2, options2) {
    const node = _getNode(key2);
    if (!node)
      return null;
    return node.getPrev(options2);
  }
  function getNext(key2, options2) {
    const node = _getNode(key2);
    if (!node)
      return null;
    return node.getNext(options2);
  }
  function getParent(key2) {
    const node = _getNode(key2);
    if (!node)
      return null;
    return node.getParent();
  }
  function getChild2(key2) {
    const node = _getNode(key2);
    if (!node)
      return null;
    return node.getChild();
  }
  const treemate = {
    treeNodes,
    treeNodeMap,
    levelTreeNodeMap,
    maxLevel: Math.max(...levelTreeNodeMap.keys()),
    getChildren,
    getFlattenedNodes(expandedKeys) {
      return flatten$1(treeNodes, expandedKeys);
    },
    getNode,
    getPrev,
    getNext,
    getParent,
    getChild: getChild2,
    getFirstAvailableNode() {
      return getFirstAvailableNode(treeNodes);
    },
    getPath(key2, options2 = {}) {
      return getPath(key2, options2, treemate);
    },
    getCheckedKeys(checkedKeys, options2 = {}) {
      const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
      return getCheckedKeys({
        checkedKeys: unwrapCheckedKeys(checkedKeys),
        indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
        cascade,
        leafOnly,
        checkStrategy,
        allowNotLoaded
      }, treemate);
    },
    check(keysToCheck, checkedKeys, options2 = {}) {
      const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
      return getCheckedKeys({
        checkedKeys: unwrapCheckedKeys(checkedKeys),
        indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
        keysToCheck: keysToCheck === void 0 || keysToCheck === null ? [] : toArray(keysToCheck),
        cascade,
        leafOnly,
        checkStrategy,
        allowNotLoaded
      }, treemate);
    },
    uncheck(keysToUncheck, checkedKeys, options2 = {}) {
      const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
      return getCheckedKeys({
        checkedKeys: unwrapCheckedKeys(checkedKeys),
        indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
        keysToUncheck: keysToUncheck === null || keysToUncheck === void 0 ? [] : toArray(keysToUncheck),
        cascade,
        leafOnly,
        checkStrategy,
        allowNotLoaded
      }, treemate);
    },
    getNonLeafKeys(options2 = {}) {
      return getNonLeafKeys(treeNodes, options2);
    }
  };
  return treemate;
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance2 = new Constructor();
      if (Class2) _setPrototypeOf(instance2, Class2.prototype);
      return instance2;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
var formatRegExp = /%[sdj%]/g;
var warning = function warning2() {
};
function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function(error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var i2 = 0;
  var len = args.length;
  if (typeof template === "function") {
    return template.apply(null, args);
  }
  if (typeof template === "string") {
    var str = template.replace(formatRegExp, function(x) {
      if (x === "%%") {
        return "%";
      }
      if (i2 >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i2++]);
        case "%d":
          return Number(args[i2++]);
        case "%j":
          try {
            return JSON.stringify(args[i2++]);
          } catch (_) {
            return "[Circular]";
          }
          break;
        default:
          return x;
      }
    });
    return str;
  }
  return template;
}
function isNativeStringType(type4) {
  return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
}
function isEmptyValue(value, type4) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (type4 === "array" && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type4) && typeof value === "string" && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors || []);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function(a) {
    func(a, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function(k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}
var AsyncValidationError = /* @__PURE__ */ (function(_Error) {
  _inheritsLoose(AsyncValidationError2, _Error);
  function AsyncValidationError2(errors, fields) {
    var _this;
    _this = _Error.call(this, "Async Validation Error") || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }
  return AsyncValidationError2;
})(/* @__PURE__ */ _wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    _pending["catch"](function(e) {
      return e;
    });
    return _pending;
  }
  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function(resolve, reject) {
    var next = function next2(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }
    objArrKeys.forEach(function(key2) {
      var arr = objArr[key2];
      if (firstFields.indexOf(key2) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function(e) {
    return e;
  });
  return pending;
}
function isErrorObj(obj) {
  return !!(obj && obj.message !== void 0);
}
function getValue(value, path) {
  var v = value;
  for (var i2 = 0; i2 < path.length; i2++) {
    if (v == void 0) {
      return v;
    }
    v = v[path[i2]];
  }
  return v;
}
function complementError(rule, source) {
  return function(oe) {
    var fieldValue;
    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }
    return {
      message: typeof oe === "function" ? oe() : oe,
      fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if (typeof value === "object" && typeof target[s] === "object") {
          target[s] = _extends$1({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}
var required$1 = function required(rule, value, source, errors, options, type4) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type4 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};
var whitespace = function whitespace2(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};
var urlReg;
var getUrlRegex = (function() {
  if (urlReg) {
    return urlReg;
  }
  var word = "[a-fA-F\\d:]";
  var b = function b2(options) {
    return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
  };
  var v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
  var v6seg = "[a-fA-F\\d]{1,4}";
  var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
  var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
  var v4exact = new RegExp("^" + v4 + "$");
  var v6exact = new RegExp("^" + v6 + "$");
  var ip = function ip2(options) {
    return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
  };
  ip.v4 = function(options) {
    return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), "g");
  };
  ip.v6 = function(options) {
    return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
  };
  var protocol = "(?:(?:[a-z]+:)?//)";
  var auth = "(?:\\S+(?::\\S*)?@)?";
  var ipv4 = ip.v4().source;
  var ipv6 = ip.v6().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
  var port = "(?::\\d{2,5})?";
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
  urlReg = new RegExp("(?:^" + regex + "$)", "i");
  return urlReg;
});
var pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float2(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
  },
  number: function number3(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  },
  object: function object(value) {
    return typeof value === "object" && !types.array(value);
  },
  method: function method(value) {
    return typeof value === "function";
  },
  email: function email(value) {
    return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === "string" && value.length <= 2048 && !!value.match(getUrlRegex());
  },
  hex: function hex2(value) {
    return typeof value === "string" && !!value.match(pattern$2.hex);
  }
};
var type$1 = function type3(rule, value, source, errors, options) {
  if (rule.required && value === void 0) {
    required$1(rule, value, source, errors, options);
    return;
  }
  var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};
var range = function range2(rule, value, source, errors, options) {
  var len = typeof rule.len === "number";
  var min2 = typeof rule.min === "number";
  var max2 = typeof rule.max === "number";
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key2 = null;
  var num = typeof value === "number";
  var str = typeof value === "string";
  var arr = Array.isArray(value);
  if (num) {
    key2 = "number";
  } else if (str) {
    key2 = "string";
  } else if (arr) {
    key2 = "array";
  }
  if (!key2) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    val = value.replace(spRegexp, "_").length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key2].len, rule.fullField, rule.len));
    }
  } else if (min2 && !max2 && val < rule.min) {
    errors.push(format(options.messages[key2].min, rule.fullField, rule.min));
  } else if (max2 && !min2 && val > rule.max) {
    errors.push(format(options.messages[key2].max, rule.fullField, rule.max));
  } else if (min2 && max2 && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key2].range, rule.fullField, rule.min, rule.max));
  }
};
var ENUM$1 = "enum";
var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
  }
};
var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};
var rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  "enum": enumerable$1,
  pattern: pattern$1
};
var string = function string2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "string");
    if (!isEmptyValue(value, "string")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
};
var method2 = function method3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var number2 = function number32(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (value === "") {
      value = void 0;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var _boolean = function _boolean2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var regexp2 = function regexp3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var integer2 = function integer3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var floatFn = function floatFn2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var array2 = function array3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if ((value === void 0 || value === null) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "array");
    if (value !== void 0 && value !== null) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var object2 = function object3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var ENUM = "enum";
var enumerable2 = function enumerable3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules[ENUM](rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var pattern2 = function pattern3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "string")) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var date2 = function date3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "date") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "date")) {
      var dateObject;
      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
};
var required2 = function required3(rule, value, callback, source, options) {
  var errors = [];
  var type4 = Array.isArray(value) ? "array" : typeof value;
  rules.required(rule, value, source, errors, options, type4);
  callback(errors);
};
var type2 = function type32(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var any = function any2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
};
var validators = {
  string,
  method: method2,
  number: number2,
  "boolean": _boolean,
  regexp: regexp2,
  integer: integer2,
  "float": floatFn,
  array: array2,
  object: object2,
  "enum": enumerable2,
  pattern: pattern2,
  date: date2,
  url: type2,
  hex: type2,
  email: type2,
  required: required2,
  any
};
function newMessages() {
  return {
    "default": "Validation error on field %s",
    required: "%s is required",
    "enum": "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      "boolean": "%s is not a %s",
      integer: "%s is not an %s",
      "float": "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();
var Schema = /* @__PURE__ */ (function() {
  function Schema2(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  var _proto = Schema2.prototype;
  _proto.define = function define(rules2) {
    var _this = this;
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    Object.keys(rules2).forEach(function(name) {
      var item2 = rules2[name];
      _this.rules[name] = Array.isArray(item2) ? item2 : [item2];
    });
  };
  _proto.messages = function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  };
  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this;
    if (o === void 0) {
      o = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }
      return Promise.resolve(source);
    }
    function complete(results) {
      var errors = [];
      var fields = {};
      function add(e) {
        if (Array.isArray(e)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }
      for (var i2 = 0; i2 < results.length; i2++) {
        add(results[i2]);
      }
      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function(z) {
      var arr = _this2.rules[z];
      var value = source[z];
      arr.forEach(function(r) {
        var rule = r;
        if (typeof rule.transform === "function") {
          if (source === source_) {
            source = _extends$1({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends$1({}, rule);
        }
        rule.validator = _this2.getValidationMethod(rule);
        if (!rule.validator) {
          return;
        }
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value,
          source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function(data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullField(key2, schema) {
        return _extends$1({}, schema, {
          fullField: rule.fullField + "." + key2,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key2]) : [key2]
        });
      }
      function cb(e) {
        if (e === void 0) {
          e = [];
        }
        var errorList = Array.isArray(e) ? e : [e];
        if (!options.suppressWarning && errorList.length) {
          Schema2.warning("async-validator:", errorList);
        }
        if (errorList.length && rule.message !== void 0) {
          errorList = [].concat(rule.message);
        }
        var filledErrors = errorList.map(complementError(rule, source));
        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }
        if (!deep) {
          doIt(filledErrors);
        } else {
          if (rule.required && !data.value) {
            if (rule.message !== void 0) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }
            return doIt(filledErrors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            Object.keys(data.value).map(function(key2) {
              fieldsSchema[key2] = rule.defaultField;
            });
          }
          fieldsSchema = _extends$1({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function(field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema2(paredFieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function(errs) {
            var finalErrors = [];
            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        try {
          res = rule.validator(rule, data.value, cb, data.source, options);
        } catch (error) {
          console.error == null ? void 0 : console.error(error);
          if (!options.suppressValidatorError) {
            setTimeout(function() {
              throw error;
            }, 0);
          }
          cb(error.message);
        }
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function() {
          return cb();
        }, function(e) {
          return cb(e);
        });
      }
    }, function(results) {
      complete(results);
    }, source);
  };
  _proto.getType = function getType(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  };
  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf("message");
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === "required") {
      return validators.required;
    }
    return validators[this.getType(rule)] || void 0;
  };
  return Schema2;
})();
Schema.register = function register(type4, validator) {
  if (typeof validator !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type4] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key2, val] of props) {
    target[key2] = val;
  }
  return target;
};
if (typeof window !== "undefined") {
  window.TONE_SILENCE_LOGGING = true;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function ok() {
  return true;
}
function notOk() {
  return false;
}
function undef() {
  return void 0;
}
const NOT_TYPED_FUNCTION = "Argument is not a typed-function.";
function create() {
  function isPlainObject2(x) {
    return typeof x === "object" && x !== null && x.constructor === Object;
  }
  const _types = [{
    name: "number",
    test: function(x) {
      return typeof x === "number";
    }
  }, {
    name: "string",
    test: function(x) {
      return typeof x === "string";
    }
  }, {
    name: "boolean",
    test: function(x) {
      return typeof x === "boolean";
    }
  }, {
    name: "Function",
    test: function(x) {
      return typeof x === "function";
    }
  }, {
    name: "Array",
    test: Array.isArray
  }, {
    name: "Date",
    test: function(x) {
      return x instanceof Date;
    }
  }, {
    name: "RegExp",
    test: function(x) {
      return x instanceof RegExp;
    }
  }, {
    name: "Object",
    test: isPlainObject2
  }, {
    name: "null",
    test: function(x) {
      return x === null;
    }
  }, {
    name: "undefined",
    test: function(x) {
      return x === void 0;
    }
  }];
  const anyType = {
    name: "any",
    test: ok,
    isAny: true
  };
  let typeMap;
  let typeList;
  let nConversions = 0;
  let typed = {
    createCount: 0
  };
  function findType(typeName) {
    const type4 = typeMap.get(typeName);
    if (type4) {
      return type4;
    }
    let message = 'Unknown type "' + typeName + '"';
    const name = typeName.toLowerCase();
    let otherName;
    for (otherName of typeList) {
      if (otherName.toLowerCase() === name) {
        message += '. Did you mean "' + otherName + '" ?';
        break;
      }
    }
    throw new TypeError(message);
  }
  function addTypes(types2) {
    let beforeSpec = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
    const beforeIndex = beforeSpec ? findType(beforeSpec).index : typeList.length;
    const newTypes = [];
    for (let i2 = 0; i2 < types2.length; ++i2) {
      if (!types2[i2] || typeof types2[i2].name !== "string" || typeof types2[i2].test !== "function") {
        throw new TypeError("Object with properties {name: string, test: function} expected");
      }
      const typeName = types2[i2].name;
      if (typeMap.has(typeName)) {
        throw new TypeError('Duplicate type name "' + typeName + '"');
      }
      newTypes.push(typeName);
      typeMap.set(typeName, {
        name: typeName,
        test: types2[i2].test,
        isAny: types2[i2].isAny,
        index: beforeIndex + i2,
        conversionsTo: []
        // Newly added type can't have any conversions to it
      });
    }
    const affectedTypes = typeList.slice(beforeIndex);
    typeList = typeList.slice(0, beforeIndex).concat(newTypes).concat(affectedTypes);
    for (let i2 = beforeIndex + newTypes.length; i2 < typeList.length; ++i2) {
      typeMap.get(typeList[i2]).index = i2;
    }
  }
  function clear() {
    typeMap = /* @__PURE__ */ new Map();
    typeList = [];
    nConversions = 0;
    addTypes([anyType], false);
  }
  clear();
  addTypes(_types);
  function clearConversions() {
    let typeName;
    for (typeName of typeList) {
      typeMap.get(typeName).conversionsTo = [];
    }
    nConversions = 0;
  }
  function findTypeNames(value) {
    const matches = typeList.filter((name) => {
      const type4 = typeMap.get(name);
      return !type4.isAny && type4.test(value);
    });
    if (matches.length) {
      return matches;
    }
    return ["any"];
  }
  function isTypedFunction(entity) {
    return entity && typeof entity === "function" && "_typedFunctionData" in entity;
  }
  function findSignature(fn, signature, options) {
    if (!isTypedFunction(fn)) {
      throw new TypeError(NOT_TYPED_FUNCTION);
    }
    const exact = options && options.exact;
    const stringSignature = Array.isArray(signature) ? signature.join(",") : signature;
    const params = parseSignature(stringSignature);
    const canonicalSignature = stringifyParams(params);
    if (!exact || canonicalSignature in fn.signatures) {
      const match = fn._typedFunctionData.signatureMap.get(canonicalSignature);
      if (match) {
        return match;
      }
    }
    const nParams = params.length;
    let remainingSignatures;
    if (exact) {
      remainingSignatures = [];
      let name;
      for (name in fn.signatures) {
        remainingSignatures.push(fn._typedFunctionData.signatureMap.get(name));
      }
    } else {
      remainingSignatures = fn._typedFunctionData.signatures;
    }
    for (let i2 = 0; i2 < nParams; ++i2) {
      const want = params[i2];
      const filteredSignatures = [];
      let possibility;
      for (possibility of remainingSignatures) {
        const have = getParamAtIndex(possibility.params, i2);
        if (!have || want.restParam && !have.restParam) {
          continue;
        }
        if (!have.hasAny) {
          const haveTypes = paramTypeSet(have);
          if (want.types.some((wtype) => !haveTypes.has(wtype.name))) {
            continue;
          }
        }
        filteredSignatures.push(possibility);
      }
      remainingSignatures = filteredSignatures;
      if (remainingSignatures.length === 0) break;
    }
    let candidate;
    for (candidate of remainingSignatures) {
      if (candidate.params.length <= nParams) {
        return candidate;
      }
    }
    throw new TypeError("Signature not found (signature: " + (fn.name || "unnamed") + "(" + stringifyParams(params, ", ") + "))");
  }
  function find(fn, signature, options) {
    return findSignature(fn, signature, options).implementation;
  }
  function convert(value, typeName) {
    const type4 = findType(typeName);
    if (type4.test(value)) {
      return value;
    }
    const conversions = type4.conversionsTo;
    if (conversions.length === 0) {
      throw new Error("There are no conversions to " + typeName + " defined.");
    }
    for (let i2 = 0; i2 < conversions.length; i2++) {
      const fromType = findType(conversions[i2].from);
      if (fromType.test(value)) {
        return conversions[i2].convert(value);
      }
    }
    throw new Error("Cannot convert " + value + " to " + typeName);
  }
  function stringifyParams(params) {
    let separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return params.map((p) => p.name).join(separator);
  }
  function parseParam(param) {
    const restParam = param.indexOf("...") === 0;
    const types2 = !restParam ? param : param.length > 3 ? param.slice(3) : "any";
    const typeDefs = types2.split("|").map((s) => findType(s.trim()));
    let hasAny = false;
    let paramName = restParam ? "..." : "";
    const exactTypes = typeDefs.map(function(type4) {
      hasAny = type4.isAny || hasAny;
      paramName += type4.name + "|";
      return {
        name: type4.name,
        typeIndex: type4.index,
        test: type4.test,
        isAny: type4.isAny,
        conversion: null,
        conversionIndex: -1
      };
    });
    return {
      types: exactTypes,
      name: paramName.slice(0, -1),
      // remove trailing '|' from above
      hasAny,
      hasConversion: false,
      restParam
    };
  }
  function expandParam(param) {
    const typeNames = param.types.map((t) => t.name);
    const matchingConversions = availableConversions(typeNames);
    let hasAny = param.hasAny;
    let newName = param.name;
    const convertibleTypes = matchingConversions.map(function(conversion) {
      const type4 = findType(conversion.from);
      hasAny = type4.isAny || hasAny;
      newName += "|" + conversion.from;
      return {
        name: conversion.from,
        typeIndex: type4.index,
        test: type4.test,
        isAny: type4.isAny,
        conversion,
        conversionIndex: conversion.index
      };
    });
    return {
      types: param.types.concat(convertibleTypes),
      name: newName,
      hasAny,
      hasConversion: convertibleTypes.length > 0,
      restParam: param.restParam
    };
  }
  function paramTypeSet(param) {
    if (!param.typeSet) {
      param.typeSet = /* @__PURE__ */ new Set();
      param.types.forEach((type4) => param.typeSet.add(type4.name));
    }
    return param.typeSet;
  }
  function parseSignature(rawSignature) {
    const params = [];
    if (typeof rawSignature !== "string") {
      throw new TypeError("Signatures must be strings");
    }
    const signature = rawSignature.trim();
    if (signature === "") {
      return params;
    }
    const rawParams = signature.split(",");
    for (let i2 = 0; i2 < rawParams.length; ++i2) {
      const parsedParam = parseParam(rawParams[i2].trim());
      if (parsedParam.restParam && i2 !== rawParams.length - 1) {
        throw new SyntaxError('Unexpected rest parameter "' + rawParams[i2] + '": only allowed for the last parameter');
      }
      if (parsedParam.types.length === 0) {
        return null;
      }
      params.push(parsedParam);
    }
    return params;
  }
  function hasRestParam(params) {
    const param = last(params);
    return param ? param.restParam : false;
  }
  function compileTest(param) {
    if (!param || param.types.length === 0) {
      return ok;
    } else if (param.types.length === 1) {
      return findType(param.types[0].name).test;
    } else if (param.types.length === 2) {
      const test0 = findType(param.types[0].name).test;
      const test1 = findType(param.types[1].name).test;
      return function or(x) {
        return test0(x) || test1(x);
      };
    } else {
      const tests = param.types.map(function(type4) {
        return findType(type4.name).test;
      });
      return function or(x) {
        for (let i2 = 0; i2 < tests.length; i2++) {
          if (tests[i2](x)) {
            return true;
          }
        }
        return false;
      };
    }
  }
  function compileTests(params) {
    let tests, test0, test1;
    if (hasRestParam(params)) {
      tests = initial(params).map(compileTest);
      const varIndex = tests.length;
      const lastTest = compileTest(last(params));
      const testRestParam = function(args) {
        for (let i2 = varIndex; i2 < args.length; i2++) {
          if (!lastTest(args[i2])) {
            return false;
          }
        }
        return true;
      };
      return function testArgs(args) {
        for (let i2 = 0; i2 < tests.length; i2++) {
          if (!tests[i2](args[i2])) {
            return false;
          }
        }
        return testRestParam(args) && args.length >= varIndex + 1;
      };
    } else {
      if (params.length === 0) {
        return function testArgs(args) {
          return args.length === 0;
        };
      } else if (params.length === 1) {
        test0 = compileTest(params[0]);
        return function testArgs(args) {
          return test0(args[0]) && args.length === 1;
        };
      } else if (params.length === 2) {
        test0 = compileTest(params[0]);
        test1 = compileTest(params[1]);
        return function testArgs(args) {
          return test0(args[0]) && test1(args[1]) && args.length === 2;
        };
      } else {
        tests = params.map(compileTest);
        return function testArgs(args) {
          for (let i2 = 0; i2 < tests.length; i2++) {
            if (!tests[i2](args[i2])) {
              return false;
            }
          }
          return args.length === tests.length;
        };
      }
    }
  }
  function getParamAtIndex(params, index) {
    return index < params.length ? params[index] : hasRestParam(params) ? last(params) : null;
  }
  function getTypeSetAtIndex(params, index) {
    const param = getParamAtIndex(params, index);
    if (!param) {
      return /* @__PURE__ */ new Set();
    }
    return paramTypeSet(param);
  }
  function isExactType(type4) {
    return type4.conversion === null || type4.conversion === void 0;
  }
  function mergeExpectedParams(signatures, index) {
    const typeSet = /* @__PURE__ */ new Set();
    signatures.forEach((signature) => {
      const paramSet = getTypeSetAtIndex(signature.params, index);
      let name;
      for (name of paramSet) {
        typeSet.add(name);
      }
    });
    return typeSet.has("any") ? ["any"] : Array.from(typeSet);
  }
  function createError(name, args, signatures) {
    let err, expected;
    const _name = name || "unnamed";
    let matchingSignatures = signatures;
    let index;
    for (index = 0; index < args.length; index++) {
      const nextMatchingDefs = [];
      matchingSignatures.forEach((signature) => {
        const param = getParamAtIndex(signature.params, index);
        const test = compileTest(param);
        if ((index < signature.params.length || hasRestParam(signature.params)) && test(args[index])) {
          nextMatchingDefs.push(signature);
        }
      });
      if (nextMatchingDefs.length === 0) {
        expected = mergeExpectedParams(matchingSignatures, index);
        if (expected.length > 0) {
          const actualTypes = findTypeNames(args[index]);
          err = new TypeError("Unexpected type of argument in function " + _name + " (expected: " + expected.join(" or ") + ", actual: " + actualTypes.join(" | ") + ", index: " + index + ")");
          err.data = {
            category: "wrongType",
            fn: _name,
            index,
            actual: actualTypes,
            expected
          };
          return err;
        }
      } else {
        matchingSignatures = nextMatchingDefs;
      }
    }
    const lengths = matchingSignatures.map(function(signature) {
      return hasRestParam(signature.params) ? Infinity : signature.params.length;
    });
    if (args.length < Math.min.apply(null, lengths)) {
      expected = mergeExpectedParams(matchingSignatures, index);
      err = new TypeError("Too few arguments in function " + _name + " (expected: " + expected.join(" or ") + ", index: " + args.length + ")");
      err.data = {
        category: "tooFewArgs",
        fn: _name,
        index: args.length,
        expected
      };
      return err;
    }
    const maxLength = Math.max.apply(null, lengths);
    if (args.length > maxLength) {
      err = new TypeError("Too many arguments in function " + _name + " (expected: " + maxLength + ", actual: " + args.length + ")");
      err.data = {
        category: "tooManyArgs",
        fn: _name,
        index: args.length,
        expectedLength: maxLength
      };
      return err;
    }
    const argTypes = [];
    for (let i2 = 0; i2 < args.length; ++i2) {
      argTypes.push(findTypeNames(args[i2]).join("|"));
    }
    err = new TypeError('Arguments of type "' + argTypes.join(", ") + '" do not match any of the defined signatures of function ' + _name + ".");
    err.data = {
      category: "mismatch",
      actual: argTypes
    };
    return err;
  }
  function getLowestTypeIndex(param) {
    let min2 = typeList.length + 1;
    for (let i2 = 0; i2 < param.types.length; i2++) {
      min2 = Math.min(min2, param.types[i2].typeIndex);
    }
    return min2;
  }
  function getLowestConversionIndex(param) {
    let min2 = nConversions + 1;
    for (let i2 = 0; i2 < param.types.length; i2++) {
      if (!isExactType(param.types[i2])) {
        min2 = Math.min(min2, param.types[i2].conversionIndex);
      }
    }
    return min2;
  }
  function compareParams(param1, param2) {
    if (param1.hasAny) {
      if (!param2.hasAny) {
        return 0.1;
      }
    } else if (param2.hasAny) {
      return -0.1;
    }
    if (param1.restParam) {
      if (!param2.restParam) {
        return 0.01;
      }
    } else if (param2.restParam) {
      return -0.01;
    }
    const typeDiff = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
    if (typeDiff < 0) {
      return -1e-3;
    }
    if (typeDiff > 0) {
      return 1e-3;
    }
    const conv1 = getLowestConversionIndex(param1);
    const conv2 = getLowestConversionIndex(param2);
    if (param1.hasConversion) {
      if (!param2.hasConversion) {
        return (1 + conv1) * 1e-6;
      }
    } else if (param2.hasConversion) {
      return -(1 + conv2) * 1e-6;
    }
    const convDiff = conv1 - conv2;
    if (convDiff < 0) {
      return -1e-7;
    }
    if (convDiff > 0) {
      return 1e-7;
    }
    return 0;
  }
  function compareSignatures(signature1, signature2) {
    const pars1 = signature1.params;
    const pars2 = signature2.params;
    const last1 = last(pars1);
    const last2 = last(pars2);
    const hasRest1 = hasRestParam(pars1);
    const hasRest2 = hasRestParam(pars2);
    if (hasRest1 && last1.hasAny) {
      if (!hasRest2 || !last2.hasAny) {
        return 1e7;
      }
    } else if (hasRest2 && last2.hasAny) {
      return -1e7;
    }
    let any1 = 0;
    let conv1 = 0;
    let par;
    for (par of pars1) {
      if (par.hasAny) ++any1;
      if (par.hasConversion) ++conv1;
    }
    let any22 = 0;
    let conv2 = 0;
    for (par of pars2) {
      if (par.hasAny) ++any22;
      if (par.hasConversion) ++conv2;
    }
    if (any1 !== any22) {
      return (any1 - any22) * 1e6;
    }
    if (hasRest1 && last1.hasConversion) {
      if (!hasRest2 || !last2.hasConversion) {
        return 1e5;
      }
    } else if (hasRest2 && last2.hasConversion) {
      return -1e5;
    }
    if (conv1 !== conv2) {
      return (conv1 - conv2) * 1e4;
    }
    if (hasRest1) {
      if (!hasRest2) {
        return 1e3;
      }
    } else if (hasRest2) {
      return -1e3;
    }
    const lengthCriterion = (pars1.length - pars2.length) * (hasRest1 ? -100 : 100);
    if (lengthCriterion !== 0) {
      return lengthCriterion;
    }
    const comparisons = [];
    let tc = 0;
    for (let i2 = 0; i2 < pars1.length; ++i2) {
      const thisComparison = compareParams(pars1[i2], pars2[i2]);
      comparisons.push(thisComparison);
      tc += thisComparison;
    }
    if (tc !== 0) {
      return (tc < 0 ? -10 : 10) + tc;
    }
    let c2;
    let bonus = 9;
    const decrement = bonus / (comparisons.length + 1);
    for (c2 of comparisons) {
      if (c2 !== 0) {
        return (c2 < 0 ? -bonus : bonus) + c2;
      }
      bonus -= decrement;
    }
    return 0;
  }
  function availableConversions(typeNames) {
    if (typeNames.length === 0) {
      return [];
    }
    const types2 = typeNames.map(findType);
    if (typeNames.length === 1) return types2[0].conversionsTo;
    const knownTypes = new Set(typeNames);
    const convertibleTypes = /* @__PURE__ */ new Set();
    for (let i2 = 0; i2 < types2.length; ++i2) {
      for (const match of types2[i2].conversionsTo) {
        if (!knownTypes.has(match.from)) convertibleTypes.add(match.from);
      }
    }
    const matches = [];
    for (const typeName of convertibleTypes) {
      let bestIndex = nConversions + 1;
      let bestConversion = null;
      for (let i2 = 0; i2 < types2.length; ++i2) {
        for (const match of types2[i2].conversionsTo) {
          if (match.from === typeName && match.index < bestIndex) {
            bestIndex = match.index;
            bestConversion = match;
          }
        }
      }
      matches.push(bestConversion);
    }
    return matches;
  }
  function compileArgsPreprocessing(params, fn) {
    let fnConvert = fn;
    let name = "";
    if (params.some((p) => p.hasConversion)) {
      const restParam = hasRestParam(params);
      const compiledConversions = params.map(compileArgConversion);
      name = compiledConversions.map((conv) => conv.name).join(";");
      fnConvert = function convertArgs() {
        const args = [];
        const last2 = restParam ? arguments.length - 1 : arguments.length;
        for (let i2 = 0; i2 < last2; i2++) {
          args[i2] = compiledConversions[i2](arguments[i2]);
        }
        if (restParam) {
          args[last2] = arguments[last2].map(compiledConversions[last2]);
        }
        return fn.apply(this, args);
      };
    }
    let fnPreprocess = fnConvert;
    if (hasRestParam(params)) {
      const offset = params.length - 1;
      fnPreprocess = function preprocessRestParams() {
        return fnConvert.apply(this, slice(arguments, 0, offset).concat([slice(arguments, offset)]));
      };
    }
    if (name) Object.defineProperty(fnPreprocess, "name", {
      value: name
    });
    return fnPreprocess;
  }
  function compileArgConversion(param) {
    let test0, test1, conversion0, conversion1;
    const tests = [];
    const conversions = [];
    let name = "";
    param.types.forEach(function(type4) {
      if (type4.conversion) {
        name += type4.conversion.from + "~>" + type4.conversion.to + ",";
        tests.push(findType(type4.conversion.from).test);
        conversions.push(type4.conversion.convert);
      }
    });
    if (name) name = name.slice(0, -1);
    else name = "pass";
    let convertor = (arg) => arg;
    switch (conversions.length) {
      case 0:
        break;
      case 1:
        test0 = tests[0];
        conversion0 = conversions[0];
        convertor = function convertArg(arg) {
          if (test0(arg)) {
            return conversion0(arg);
          }
          return arg;
        };
        break;
      case 2:
        test0 = tests[0];
        test1 = tests[1];
        conversion0 = conversions[0];
        conversion1 = conversions[1];
        convertor = function convertArg(arg) {
          if (test0(arg)) {
            return conversion0(arg);
          }
          if (test1(arg)) {
            return conversion1(arg);
          }
          return arg;
        };
        break;
      default:
        convertor = function convertArg(arg) {
          for (let i2 = 0; i2 < conversions.length; i2++) {
            if (tests[i2](arg)) {
              return conversions[i2](arg);
            }
          }
          return arg;
        };
    }
    Object.defineProperty(convertor, "name", {
      value: name
    });
    return convertor;
  }
  function splitParams(params) {
    function _splitParams(params2, index, paramsSoFar) {
      if (index < params2.length) {
        const param = params2[index];
        let resultingParams = [];
        if (param.restParam) {
          const exactTypes = param.types.filter(isExactType);
          if (exactTypes.length < param.types.length) {
            resultingParams.push({
              types: exactTypes,
              name: "..." + exactTypes.map((t) => t.name).join("|"),
              hasAny: exactTypes.some((t) => t.isAny),
              hasConversion: false,
              restParam: true
            });
          }
          resultingParams.push(param);
        } else {
          resultingParams = param.types.map(function(type4) {
            return {
              types: [type4],
              name: type4.name,
              hasAny: type4.isAny,
              hasConversion: type4.conversion,
              restParam: false
            };
          });
        }
        return flatMap(resultingParams, function(nextParam) {
          return _splitParams(params2, index + 1, paramsSoFar.concat([nextParam]));
        });
      } else {
        return [paramsSoFar];
      }
    }
    return _splitParams(params, 0, []);
  }
  function conflicting(params1, params2) {
    const ii = Math.max(params1.length, params2.length);
    for (let i2 = 0; i2 < ii; i2++) {
      const typeSet1 = getTypeSetAtIndex(params1, i2);
      const typeSet2 = getTypeSetAtIndex(params2, i2);
      let overlap = false;
      let name;
      for (name of typeSet2) {
        if (typeSet1.has(name)) {
          overlap = true;
          break;
        }
      }
      if (!overlap) {
        return false;
      }
    }
    const len1 = params1.length;
    const len2 = params2.length;
    const restParam1 = hasRestParam(params1);
    const restParam2 = hasRestParam(params2);
    return restParam1 ? restParam2 ? len1 === len2 : len2 >= len1 : restParam2 ? len1 >= len2 : len1 === len2;
  }
  function clearResolutions(functionList) {
    return functionList.map((fn) => {
      if (isReferToSelf(fn)) {
        return referToSelf(fn.referToSelf.callback);
      }
      if (isReferTo(fn)) {
        return makeReferTo(fn.referTo.references, fn.referTo.callback);
      }
      return fn;
    });
  }
  function collectResolutions(references, functionList, signatureMap) {
    const resolvedReferences = [];
    let reference;
    for (reference of references) {
      let resolution = signatureMap[reference];
      if (typeof resolution !== "number") {
        throw new TypeError('No definition for referenced signature "' + reference + '"');
      }
      resolution = functionList[resolution];
      if (typeof resolution !== "function") {
        return false;
      }
      resolvedReferences.push(resolution);
    }
    return resolvedReferences;
  }
  function resolveReferences(functionList, signatureMap, self2) {
    const resolvedFunctions = clearResolutions(functionList);
    const isResolved = new Array(resolvedFunctions.length).fill(false);
    let leftUnresolved = true;
    while (leftUnresolved) {
      leftUnresolved = false;
      let nothingResolved = true;
      for (let i2 = 0; i2 < resolvedFunctions.length; ++i2) {
        if (isResolved[i2]) continue;
        const fn = resolvedFunctions[i2];
        if (isReferToSelf(fn)) {
          resolvedFunctions[i2] = fn.referToSelf.callback(self2);
          resolvedFunctions[i2].referToSelf = fn.referToSelf;
          isResolved[i2] = true;
          nothingResolved = false;
        } else if (isReferTo(fn)) {
          const resolvedReferences = collectResolutions(fn.referTo.references, resolvedFunctions, signatureMap);
          if (resolvedReferences) {
            resolvedFunctions[i2] = fn.referTo.callback.apply(this, resolvedReferences);
            resolvedFunctions[i2].referTo = fn.referTo;
            isResolved[i2] = true;
            nothingResolved = false;
          } else {
            leftUnresolved = true;
          }
        }
      }
      if (nothingResolved && leftUnresolved) {
        throw new SyntaxError("Circular reference detected in resolving typed.referTo");
      }
    }
    return resolvedFunctions;
  }
  function validateDeprecatedThis(signaturesMap) {
    const deprecatedThisRegex = /\bthis(\(|\.signatures\b)/;
    Object.keys(signaturesMap).forEach((signature) => {
      const fn = signaturesMap[signature];
      if (deprecatedThisRegex.test(fn.toString())) {
        throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
      }
    });
  }
  function createTypedFunction(name, rawSignaturesMap) {
    typed.createCount++;
    if (Object.keys(rawSignaturesMap).length === 0) {
      throw new SyntaxError("No signatures provided");
    }
    if (typed.warnAgainstDeprecatedThis) {
      validateDeprecatedThis(rawSignaturesMap);
    }
    const parsedParams = [];
    const originalFunctions = [];
    const signaturesMap = {};
    const preliminarySignatures = [];
    let signature;
    for (signature in rawSignaturesMap) {
      if (!Object.prototype.hasOwnProperty.call(rawSignaturesMap, signature)) {
        continue;
      }
      const params = parseSignature(signature);
      if (!params) continue;
      parsedParams.forEach(function(pp) {
        if (conflicting(pp, params)) {
          throw new TypeError('Conflicting signatures "' + stringifyParams(pp) + '" and "' + stringifyParams(params) + '".');
        }
      });
      parsedParams.push(params);
      const functionIndex = originalFunctions.length;
      originalFunctions.push(rawSignaturesMap[signature]);
      const conversionParams = params.map(expandParam);
      let sp;
      for (sp of splitParams(conversionParams)) {
        const spName = stringifyParams(sp);
        preliminarySignatures.push({
          params: sp,
          name: spName,
          fn: functionIndex
        });
        if (sp.every((p) => !p.hasConversion)) {
          signaturesMap[spName] = functionIndex;
        }
      }
    }
    preliminarySignatures.sort(compareSignatures);
    const resolvedFunctions = resolveReferences(originalFunctions, signaturesMap, theTypedFn);
    let s;
    for (s in signaturesMap) {
      if (Object.prototype.hasOwnProperty.call(signaturesMap, s)) {
        signaturesMap[s] = resolvedFunctions[signaturesMap[s]];
      }
    }
    const signatures = [];
    const internalSignatureMap = /* @__PURE__ */ new Map();
    for (s of preliminarySignatures) {
      if (!internalSignatureMap.has(s.name)) {
        s.fn = resolvedFunctions[s.fn];
        signatures.push(s);
        internalSignatureMap.set(s.name, s);
      }
    }
    const ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
    const ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
    const ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
    const ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
    const ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
    const ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
    const allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;
    for (let i2 = 0; i2 < signatures.length; ++i2) {
      signatures[i2].test = compileTests(signatures[i2].params);
    }
    const test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
    const test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
    const test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
    const test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
    const test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
    const test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;
    const test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
    const test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
    const test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
    const test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
    const test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
    const test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;
    for (let i2 = 0; i2 < signatures.length; ++i2) {
      signatures[i2].implementation = compileArgsPreprocessing(signatures[i2].params, signatures[i2].fn);
    }
    const fn0 = ok0 ? signatures[0].implementation : undef;
    const fn1 = ok1 ? signatures[1].implementation : undef;
    const fn2 = ok2 ? signatures[2].implementation : undef;
    const fn3 = ok3 ? signatures[3].implementation : undef;
    const fn4 = ok4 ? signatures[4].implementation : undef;
    const fn5 = ok5 ? signatures[5].implementation : undef;
    const len0 = ok0 ? signatures[0].params.length : -1;
    const len1 = ok1 ? signatures[1].params.length : -1;
    const len2 = ok2 ? signatures[2].params.length : -1;
    const len3 = ok3 ? signatures[3].params.length : -1;
    const len4 = ok4 ? signatures[4].params.length : -1;
    const len5 = ok5 ? signatures[5].params.length : -1;
    const iStart = allOk ? 6 : 0;
    const iEnd = signatures.length;
    const tests = signatures.map((s2) => s2.test);
    const fns = signatures.map((s2) => s2.implementation);
    const generic = function generic2() {
      for (let i2 = iStart; i2 < iEnd; i2++) {
        if (tests[i2](arguments)) {
          return fns[i2].apply(this, arguments);
        }
      }
      return typed.onMismatch(name, arguments, signatures);
    };
    function theTypedFn(arg0, arg1) {
      if (arguments.length === len0 && test00(arg0) && test01(arg1)) {
        return fn0.apply(this, arguments);
      }
      if (arguments.length === len1 && test10(arg0) && test11(arg1)) {
        return fn1.apply(this, arguments);
      }
      if (arguments.length === len2 && test20(arg0) && test21(arg1)) {
        return fn2.apply(this, arguments);
      }
      if (arguments.length === len3 && test30(arg0) && test31(arg1)) {
        return fn3.apply(this, arguments);
      }
      if (arguments.length === len4 && test40(arg0) && test41(arg1)) {
        return fn4.apply(this, arguments);
      }
      if (arguments.length === len5 && test50(arg0) && test51(arg1)) {
        return fn5.apply(this, arguments);
      }
      return generic.apply(this, arguments);
    }
    try {
      Object.defineProperty(theTypedFn, "name", {
        value: name
      });
    } catch (err) {
    }
    theTypedFn.signatures = signaturesMap;
    theTypedFn._typedFunctionData = {
      signatures,
      signatureMap: internalSignatureMap
    };
    return theTypedFn;
  }
  function _onMismatch(name, args, signatures) {
    throw createError(name, args, signatures);
  }
  function initial(arr) {
    return slice(arr, 0, arr.length - 1);
  }
  function last(arr) {
    return arr[arr.length - 1];
  }
  function slice(arr, start, end) {
    return Array.prototype.slice.call(arr, start, end);
  }
  function findInArray(arr, test) {
    for (let i2 = 0; i2 < arr.length; i2++) {
      if (test(arr[i2])) {
        return arr[i2];
      }
    }
    return void 0;
  }
  function flatMap(arr, callback) {
    return Array.prototype.concat.apply([], arr.map(callback));
  }
  function referTo() {
    const references = initial(arguments).map((s) => stringifyParams(parseSignature(s)));
    const callback = last(arguments);
    if (typeof callback !== "function") {
      throw new TypeError("Callback function expected as last argument");
    }
    return makeReferTo(references, callback);
  }
  function makeReferTo(references, callback) {
    return {
      referTo: {
        references,
        callback
      }
    };
  }
  function referToSelf(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Callback function expected as first argument");
    }
    return {
      referToSelf: {
        callback
      }
    };
  }
  function isReferTo(objectOrFn) {
    return objectOrFn && typeof objectOrFn.referTo === "object" && Array.isArray(objectOrFn.referTo.references) && typeof objectOrFn.referTo.callback === "function";
  }
  function isReferToSelf(objectOrFn) {
    return objectOrFn && typeof objectOrFn.referToSelf === "object" && typeof objectOrFn.referToSelf.callback === "function";
  }
  function checkName(nameSoFar, newName) {
    if (!nameSoFar) {
      return newName;
    }
    if (newName && newName !== nameSoFar) {
      const err = new Error("Function names do not match (expected: " + nameSoFar + ", actual: " + newName + ")");
      err.data = {
        actual: newName,
        expected: nameSoFar
      };
      throw err;
    }
    return nameSoFar;
  }
  function getObjectName(obj) {
    let name;
    for (const key2 in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key2) && (isTypedFunction(obj[key2]) || typeof obj[key2].signature === "string")) {
        name = checkName(name, obj[key2].name);
      }
    }
    return name;
  }
  function mergeSignatures(dest, source) {
    let key2;
    for (key2 in source) {
      if (Object.prototype.hasOwnProperty.call(source, key2)) {
        if (key2 in dest) {
          if (source[key2] !== dest[key2]) {
            const err = new Error('Signature "' + key2 + '" is defined twice');
            err.data = {
              signature: key2,
              sourceFunction: source[key2],
              destFunction: dest[key2]
            };
            throw err;
          }
        }
        dest[key2] = source[key2];
      }
    }
  }
  const saveTyped = typed;
  typed = function(maybeName) {
    const named = typeof maybeName === "string";
    const start = named ? 1 : 0;
    let name = named ? maybeName : "";
    const allSignatures = {};
    for (let i2 = start; i2 < arguments.length; ++i2) {
      const item2 = arguments[i2];
      let theseSignatures = {};
      let thisName;
      if (typeof item2 === "function") {
        thisName = item2.name;
        if (typeof item2.signature === "string") {
          theseSignatures[item2.signature] = item2;
        } else if (isTypedFunction(item2)) {
          theseSignatures = item2.signatures;
        }
      } else if (isPlainObject2(item2)) {
        theseSignatures = item2;
        if (!named) {
          thisName = getObjectName(item2);
        }
      }
      if (Object.keys(theseSignatures).length === 0) {
        const err = new TypeError("Argument to 'typed' at index " + i2 + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        err.data = {
          index: i2,
          argument: item2
        };
        throw err;
      }
      if (!named) {
        name = checkName(name, thisName);
      }
      mergeSignatures(allSignatures, theseSignatures);
    }
    return createTypedFunction(name || "", allSignatures);
  };
  typed.create = create;
  typed.createCount = saveTyped.createCount;
  typed.onMismatch = _onMismatch;
  typed.throwMismatchError = _onMismatch;
  typed.createError = createError;
  typed.clear = clear;
  typed.clearConversions = clearConversions;
  typed.addTypes = addTypes;
  typed._findType = findType;
  typed.referTo = referTo;
  typed.referToSelf = referToSelf;
  typed.convert = convert;
  typed.findSignature = findSignature;
  typed.find = find;
  typed.isTypedFunction = isTypedFunction;
  typed.warnAgainstDeprecatedThis = true;
  typed.addType = function(type4, beforeObjectTest) {
    let before = "any";
    if (beforeObjectTest !== false && typeMap.has("Object")) {
      before = "Object";
    }
    typed.addTypes([type4], before);
  };
  function _validateConversion(conversion) {
    if (!conversion || typeof conversion.from !== "string" || typeof conversion.to !== "string" || typeof conversion.convert !== "function") {
      throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    }
    if (conversion.to === conversion.from) {
      throw new SyntaxError('Illegal to define conversion from "' + conversion.from + '" to itself.');
    }
  }
  typed.addConversion = function(conversion) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      override: false
    };
    _validateConversion(conversion);
    const to = findType(conversion.to);
    const existing = to.conversionsTo.find((other) => other.from === conversion.from);
    if (existing) {
      if (options && options.override) {
        typed.removeConversion({
          from: existing.from,
          to: conversion.to,
          convert: existing.convert
        });
      } else {
        throw new Error('There is already a conversion from "' + conversion.from + '" to "' + to.name + '"');
      }
    }
    to.conversionsTo.push({
      from: conversion.from,
      to: to.name,
      convert: conversion.convert,
      index: nConversions++
    });
  };
  typed.addConversions = function(conversions, options) {
    conversions.forEach((conversion) => typed.addConversion(conversion, options));
  };
  typed.removeConversion = function(conversion) {
    _validateConversion(conversion);
    const to = findType(conversion.to);
    const existingConversion = findInArray(to.conversionsTo, (c2) => c2.from === conversion.from);
    if (!existingConversion) {
      throw new Error("Attempt to remove nonexistent conversion from " + conversion.from + " to " + conversion.to);
    }
    if (existingConversion.convert !== conversion.convert) {
      throw new Error("Conversion to remove does not match existing conversion");
    }
    const index = to.conversionsTo.indexOf(existingConversion);
    to.conversionsTo.splice(index, 1);
  };
  typed.resolve = function(tf, argList) {
    if (!isTypedFunction(tf)) {
      throw new TypeError(NOT_TYPED_FUNCTION);
    }
    const sigs = tf._typedFunctionData.signatures;
    for (let i2 = 0; i2 < sigs.length; ++i2) {
      if (sigs[i2].test(argList)) {
        return sigs[i2];
      }
    }
    return null;
  };
  return typed;
}
const typedFunction = create();
const cosh = Math.cosh || function(x) {
  return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
};
const sinh = Math.sinh || function(x) {
  return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
};
const cosm1 = (x) => {
  const s = Math.sin(0.5 * x);
  return -2 * s * s;
};
const hypot = function(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  if (x < y) [x, y] = [y, x];
  if (x < 1e8) return Math.sqrt(x * x + y * y);
  y /= x;
  return x * Math.sqrt(1 + y * y);
};
const parser_exit = function() {
  throw SyntaxError("Invalid Param");
};
function logHypot(a, b) {
  const _a = Math.abs(a);
  const _b = Math.abs(b);
  if (a === 0) {
    return Math.log(_b);
  }
  if (b === 0) {
    return Math.log(_a);
  }
  if (_a < 3e3 && _b < 3e3) {
    return Math.log(a * a + b * b) * 0.5;
  }
  a = a * 0.5;
  b = b * 0.5;
  return 0.5 * Math.log(a * a + b * b) + Math.LN2;
}
const P$1 = { "re": 0, "im": 0 };
const parse$1 = function(a, b) {
  const z = P$1;
  if (a === void 0 || a === null) {
    z["re"] = z["im"] = 0;
  } else if (b !== void 0) {
    z["re"] = a;
    z["im"] = b;
  } else
    switch (typeof a) {
      case "object":
        if ("im" in a && "re" in a) {
          z["re"] = a["re"];
          z["im"] = a["im"];
        } else if ("abs" in a && "arg" in a) {
          if (!isFinite(a["abs"]) && isFinite(a["arg"])) {
            return Complex["INFINITY"];
          }
          z["re"] = a["abs"] * Math.cos(a["arg"]);
          z["im"] = a["abs"] * Math.sin(a["arg"]);
        } else if ("r" in a && "phi" in a) {
          if (!isFinite(a["r"]) && isFinite(a["phi"])) {
            return Complex["INFINITY"];
          }
          z["re"] = a["r"] * Math.cos(a["phi"]);
          z["im"] = a["r"] * Math.sin(a["phi"]);
        } else if (a.length === 2) {
          z["re"] = a[0];
          z["im"] = a[1];
        } else {
          parser_exit();
        }
        break;
      case "string":
        z["im"] = /* void */
        z["re"] = 0;
        const tokens = a.replace(/_/g, "").match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
        let plus = 1;
        let minus2 = 0;
        if (tokens === null) {
          parser_exit();
        }
        for (let i2 = 0; i2 < tokens.length; i2++) {
          const c2 = tokens[i2];
          if (c2 === " " || c2 === "	" || c2 === "\n") ;
          else if (c2 === "+") {
            plus++;
          } else if (c2 === "-") {
            minus2++;
          } else if (c2 === "i" || c2 === "I") {
            if (plus + minus2 === 0) {
              parser_exit();
            }
            if (tokens[i2 + 1] !== " " && !isNaN(tokens[i2 + 1])) {
              z["im"] += parseFloat((minus2 % 2 ? "-" : "") + tokens[i2 + 1]);
              i2++;
            } else {
              z["im"] += parseFloat((minus2 % 2 ? "-" : "") + "1");
            }
            plus = minus2 = 0;
          } else {
            if (plus + minus2 === 0 || isNaN(c2)) {
              parser_exit();
            }
            if (tokens[i2 + 1] === "i" || tokens[i2 + 1] === "I") {
              z["im"] += parseFloat((minus2 % 2 ? "-" : "") + c2);
              i2++;
            } else {
              z["re"] += parseFloat((minus2 % 2 ? "-" : "") + c2);
            }
            plus = minus2 = 0;
          }
        }
        if (plus + minus2 > 0) {
          parser_exit();
        }
        break;
      case "number":
        z["im"] = 0;
        z["re"] = a;
        break;
      default:
        parser_exit();
    }
  if (isNaN(z["re"]) || isNaN(z["im"])) ;
  return z;
};
function Complex(a, b) {
  if (!(this instanceof Complex)) {
    return new Complex(a, b);
  }
  const z = parse$1(a, b);
  this["re"] = z["re"];
  this["im"] = z["im"];
}
Complex.prototype = {
  "re": 0,
  "im": 0,
  /**
   * Calculates the sign of a complex number, which is a normalized complex
   *
   * @returns {Complex}
   */
  "sign": function() {
    const abs2 = hypot(this["re"], this["im"]);
    return new Complex(
      this["re"] / abs2,
      this["im"] / abs2
    );
  },
  /**
   * Adds two complex numbers
   *
   * @returns {Complex}
   */
  "add": function(a, b) {
    const z = parse$1(a, b);
    const tInfin = this["isInfinite"]();
    const zInfin = !(isFinite(z["re"]) && isFinite(z["im"]));
    if (tInfin || zInfin) {
      if (tInfin && zInfin) {
        return Complex["NAN"];
      }
      return Complex["INFINITY"];
    }
    return new Complex(
      this["re"] + z["re"],
      this["im"] + z["im"]
    );
  },
  /**
   * Subtracts two complex numbers
   *
   * @returns {Complex}
   */
  "sub": function(a, b) {
    const z = parse$1(a, b);
    const tInfin = this["isInfinite"]();
    const zInfin = !(isFinite(z["re"]) && isFinite(z["im"]));
    if (tInfin || zInfin) {
      if (tInfin && zInfin) {
        return Complex["NAN"];
      }
      return Complex["INFINITY"];
    }
    return new Complex(
      this["re"] - z["re"],
      this["im"] - z["im"]
    );
  },
  /**
   * Multiplies two complex numbers
   *
   * @returns {Complex}
   */
  "mul": function(a, b) {
    const z = parse$1(a, b);
    const tInfin = this["isInfinite"]();
    const zInfin = !(isFinite(z["re"]) && isFinite(z["im"]));
    const tIsZero = this["re"] === 0 && this["im"] === 0;
    const zIsZero = z["re"] === 0 && z["im"] === 0;
    if (tInfin && zIsZero || zInfin && tIsZero) {
      return Complex["NAN"];
    }
    if (tInfin || zInfin) {
      return Complex["INFINITY"];
    }
    if (z["im"] === 0 && this["im"] === 0) {
      return new Complex(this["re"] * z["re"], 0);
    }
    return new Complex(
      this["re"] * z["re"] - this["im"] * z["im"],
      this["re"] * z["im"] + this["im"] * z["re"]
    );
  },
  /**
   * Divides two complex numbers
   *
   * @returns {Complex}
   */
  "div": function(a, b) {
    const z = parse$1(a, b);
    const tInfin = this["isInfinite"]();
    const zInfin = !(isFinite(z["re"]) && isFinite(z["im"]));
    const tIsZero = this["re"] === 0 && this["im"] === 0;
    const zIsZero = z["re"] === 0 && z["im"] === 0;
    if (tIsZero && zIsZero || tInfin && zInfin) {
      return Complex["NAN"];
    }
    if (zIsZero || tInfin) {
      return Complex["INFINITY"];
    }
    if (tIsZero || zInfin) {
      return Complex["ZERO"];
    }
    if (0 === z["im"]) {
      return new Complex(this["re"] / z["re"], this["im"] / z["re"]);
    }
    if (Math.abs(z["re"]) < Math.abs(z["im"])) {
      const x = z["re"] / z["im"];
      const t = z["re"] * x + z["im"];
      return new Complex(
        (this["re"] * x + this["im"]) / t,
        (this["im"] * x - this["re"]) / t
      );
    } else {
      const x = z["im"] / z["re"];
      const t = z["im"] * x + z["re"];
      return new Complex(
        (this["re"] + this["im"] * x) / t,
        (this["im"] - this["re"] * x) / t
      );
    }
  },
  /**
   * Calculate the power of two complex numbers
   *
   * @returns {Complex}
   */
  "pow": function(a, b) {
    const z = parse$1(a, b);
    const tIsZero = this["re"] === 0 && this["im"] === 0;
    const zIsZero = z["re"] === 0 && z["im"] === 0;
    if (zIsZero) {
      return Complex["ONE"];
    }
    if (z["im"] === 0) {
      if (this["im"] === 0 && this["re"] > 0) {
        return new Complex(Math.pow(this["re"], z["re"]), 0);
      } else if (this["re"] === 0) {
        switch ((z["re"] % 4 + 4) % 4) {
          case 0:
            return new Complex(Math.pow(this["im"], z["re"]), 0);
          case 1:
            return new Complex(0, Math.pow(this["im"], z["re"]));
          case 2:
            return new Complex(-Math.pow(this["im"], z["re"]), 0);
          case 3:
            return new Complex(0, -Math.pow(this["im"], z["re"]));
        }
      }
    }
    if (tIsZero && z["re"] > 0) {
      return Complex["ZERO"];
    }
    const arg = Math.atan2(this["im"], this["re"]);
    const loh = logHypot(this["re"], this["im"]);
    let re = Math.exp(z["re"] * loh - z["im"] * arg);
    let im = z["im"] * loh + z["re"] * arg;
    return new Complex(
      re * Math.cos(im),
      re * Math.sin(im)
    );
  },
  /**
   * Calculate the complex square root
   *
   * @returns {Complex}
   */
  "sqrt": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      if (a >= 0) {
        return new Complex(Math.sqrt(a), 0);
      } else {
        return new Complex(0, Math.sqrt(-a));
      }
    }
    const r = hypot(a, b);
    let re = Math.sqrt(0.5 * (r + Math.abs(a)));
    let im = Math.abs(b) / (2 * re);
    if (a >= 0) {
      return new Complex(re, b < 0 ? -im : im);
    } else {
      return new Complex(im, b < 0 ? -re : re);
    }
  },
  /**
   * Calculate the complex exponent
   *
   * @returns {Complex}
   */
  "exp": function() {
    const er = Math.exp(this["re"]);
    if (this["im"] === 0) {
      return new Complex(er, 0);
    }
    return new Complex(
      er * Math.cos(this["im"]),
      er * Math.sin(this["im"])
    );
  },
  /**
   * Calculate the complex exponent and subtracts one.
   *
   * This may be more accurate than `Complex(x).exp().sub(1)` if
   * `x` is small.
   *
   * @returns {Complex}
   */
  "expm1": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      Math.expm1(a) * Math.cos(b) + cosm1(b),
      Math.exp(a) * Math.sin(b)
    );
  },
  /**
   * Calculate the natural log
   *
   * @returns {Complex}
   */
  "log": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0 && a > 0) {
      return new Complex(Math.log(a), 0);
    }
    return new Complex(
      logHypot(a, b),
      Math.atan2(b, a)
    );
  },
  /**
   * Calculate the magnitude of the complex number
   *
   * @returns {number}
   */
  "abs": function() {
    return hypot(this["re"], this["im"]);
  },
  /**
   * Calculate the angle of the complex number
   *
   * @returns {number}
   */
  "arg": function() {
    return Math.atan2(this["im"], this["re"]);
  },
  /**
   * Calculate the sine of the complex number
   *
   * @returns {Complex}
   */
  "sin": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      Math.sin(a) * cosh(b),
      Math.cos(a) * sinh(b)
    );
  },
  /**
   * Calculate the cosine
   *
   * @returns {Complex}
   */
  "cos": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      Math.cos(a) * cosh(b),
      -Math.sin(a) * sinh(b)
    );
  },
  /**
   * Calculate the tangent
   *
   * @returns {Complex}
   */
  "tan": function() {
    const a = 2 * this["re"];
    const b = 2 * this["im"];
    const d = Math.cos(a) + cosh(b);
    return new Complex(
      Math.sin(a) / d,
      sinh(b) / d
    );
  },
  /**
   * Calculate the cotangent
   *
   * @returns {Complex}
   */
  "cot": function() {
    const a = 2 * this["re"];
    const b = 2 * this["im"];
    const d = Math.cos(a) - cosh(b);
    return new Complex(
      -Math.sin(a) / d,
      sinh(b) / d
    );
  },
  /**
   * Calculate the secant
   *
   * @returns {Complex}
   */
  "sec": function() {
    const a = this["re"];
    const b = this["im"];
    const d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);
    return new Complex(
      Math.cos(a) * cosh(b) / d,
      Math.sin(a) * sinh(b) / d
    );
  },
  /**
   * Calculate the cosecans
   *
   * @returns {Complex}
   */
  "csc": function() {
    const a = this["re"];
    const b = this["im"];
    const d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);
    return new Complex(
      Math.sin(a) * cosh(b) / d,
      -Math.cos(a) * sinh(b) / d
    );
  },
  /**
   * Calculate the complex arcus sinus
   *
   * @returns {Complex}
   */
  "asin": function() {
    const a = this["re"];
    const b = this["im"];
    const t1 = new Complex(
      b * b - a * a + 1,
      -2 * a * b
    )["sqrt"]();
    const t2 = new Complex(
      t1["re"] - b,
      t1["im"] + a
    )["log"]();
    return new Complex(t2["im"], -t2["re"]);
  },
  /**
   * Calculate the complex arcus cosinus
   *
   * @returns {Complex}
   */
  "acos": function() {
    const a = this["re"];
    const b = this["im"];
    const t1 = new Complex(
      b * b - a * a + 1,
      -2 * a * b
    )["sqrt"]();
    const t2 = new Complex(
      t1["re"] - b,
      t1["im"] + a
    )["log"]();
    return new Complex(Math.PI / 2 - t2["im"], t2["re"]);
  },
  /**
   * Calculate the complex arcus tangent
   *
   * @returns {Complex}
   */
  "atan": function() {
    const a = this["re"];
    const b = this["im"];
    if (a === 0) {
      if (b === 1) {
        return new Complex(0, Infinity);
      }
      if (b === -1) {
        return new Complex(0, -Infinity);
      }
    }
    const d = a * a + (1 - b) * (1 - b);
    const t1 = new Complex(
      (1 - b * b - a * a) / d,
      -2 * a / d
    ).log();
    return new Complex(-0.5 * t1["im"], 0.5 * t1["re"]);
  },
  /**
   * Calculate the complex arcus cotangent
   *
   * @returns {Complex}
   */
  "acot": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      return new Complex(Math.atan2(1, a), 0);
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).atan() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).atan();
  },
  /**
   * Calculate the complex arcus secant
   *
   * @returns {Complex}
   */
  "asec": function() {
    const a = this["re"];
    const b = this["im"];
    if (a === 0 && b === 0) {
      return new Complex(0, Infinity);
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).acos() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).acos();
  },
  /**
   * Calculate the complex arcus cosecans
   *
   * @returns {Complex}
   */
  "acsc": function() {
    const a = this["re"];
    const b = this["im"];
    if (a === 0 && b === 0) {
      return new Complex(Math.PI / 2, Infinity);
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).asin() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).asin();
  },
  /**
   * Calculate the complex sinh
   *
   * @returns {Complex}
   */
  "sinh": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      sinh(a) * Math.cos(b),
      cosh(a) * Math.sin(b)
    );
  },
  /**
   * Calculate the complex cosh
   *
   * @returns {Complex}
   */
  "cosh": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      cosh(a) * Math.cos(b),
      sinh(a) * Math.sin(b)
    );
  },
  /**
   * Calculate the complex tanh
   *
   * @returns {Complex}
   */
  "tanh": function() {
    const a = 2 * this["re"];
    const b = 2 * this["im"];
    const d = cosh(a) + Math.cos(b);
    return new Complex(
      sinh(a) / d,
      Math.sin(b) / d
    );
  },
  /**
   * Calculate the complex coth
   *
   * @returns {Complex}
   */
  "coth": function() {
    const a = 2 * this["re"];
    const b = 2 * this["im"];
    const d = cosh(a) - Math.cos(b);
    return new Complex(
      sinh(a) / d,
      -Math.sin(b) / d
    );
  },
  /**
   * Calculate the complex csch
   *
   * @returns {Complex}
   */
  "csch": function() {
    const a = this["re"];
    const b = this["im"];
    const d = Math.cos(2 * b) - cosh(2 * a);
    return new Complex(
      -2 * sinh(a) * Math.cos(b) / d,
      2 * cosh(a) * Math.sin(b) / d
    );
  },
  /**
   * Calculate the complex sech
   *
   * @returns {Complex}
   */
  "sech": function() {
    const a = this["re"];
    const b = this["im"];
    const d = Math.cos(2 * b) + cosh(2 * a);
    return new Complex(
      2 * cosh(a) * Math.cos(b) / d,
      -2 * sinh(a) * Math.sin(b) / d
    );
  },
  /**
   * Calculate the complex asinh
   *
   * @returns {Complex}
   */
  "asinh": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      if (a === 0) {
        return new Complex(0, 0);
      }
      const x = Math.abs(a);
      const r = Math.log(x + Math.sqrt(x * x + 1));
      return new Complex(a < 0 ? -r : r, 0);
    }
    const re2 = a * a - b * b + 1;
    const im2 = 2 * a * b;
    const t = new Complex(re2, im2)["sqrt"]();
    return new Complex(a + t["re"], b + t["im"])["log"]();
  },
  /**
   * Calculate the complex acosh
   *
   * @returns {Complex}
   */
  "acosh": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      if (a > 1) {
        return new Complex(
          Math.log(a + Math.sqrt(a - 1) * Math.sqrt(a + 1)),
          0
        );
      }
      if (a < -1) {
        const t = Math.sqrt(a * a - 1);
        return new Complex(Math.log(-a + t), Math.PI);
      }
      return new Complex(0, Math.acos(a));
    }
    const t1 = new Complex(a - 1, b)["sqrt"]();
    const t2 = new Complex(a + 1, b)["sqrt"]();
    return new Complex(
      a + t1["re"] * t2["re"] - t1["im"] * t2["im"],
      b + t1["re"] * t2["im"] + t1["im"] * t2["re"]
    )["log"]();
  },
  /**
   * Calculate the complex atanh
   *
   * @returns {Complex}
   */
  "atanh": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      if (a === 0) {
        return new Complex(0, 0);
      }
      if (a === 1) {
        return new Complex(Infinity, 0);
      }
      if (a === -1) {
        return new Complex(-Infinity, 0);
      }
      if (-1 < a && a < 1) {
        return new Complex(
          0.5 * Math.log((1 + a) / (1 - a)),
          0
        );
      }
      if (a > 1) {
        const t2 = (a + 1) / (a - 1);
        return new Complex(
          0.5 * Math.log(t2),
          -Math.PI / 2
        );
      }
      const t = (1 + a) / (1 - a);
      return new Complex(
        0.5 * Math.log(-t),
        // log((1 - a)/(1 + a))
        Math.PI / 2
      );
    }
    const oneMinus = 1 - a;
    const onePlus = 1 + a;
    const d = oneMinus * oneMinus + b * b;
    if (d === 0) {
      return new Complex(
        a !== -1 ? a / 0 : 0,
        b !== 0 ? b / 0 : 0
      );
    }
    const xr = (onePlus * oneMinus - b * b) / d;
    const xi = (b * oneMinus + onePlus * b) / d;
    return new Complex(
      logHypot(xr, xi) / 2,
      Math.atan2(xi, xr) / 2
    );
  },
  /**
   * Calculate the complex acoth
   *
   * @returns {Complex}
   */
  "acoth": function() {
    const a = this["re"];
    const b = this["im"];
    if (a === 0 && b === 0) {
      return new Complex(0, Math.PI / 2);
    }
    const d = a * a + b * b;
    if (d !== 0) {
      return new Complex(a / d, -b / d)["atanh"]();
    }
    return new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    )["atanh"]();
  },
  /**
   * Calculate the complex acsch
   *
   * @returns {Complex}
   */
  "acsch": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      if (a === 0) {
        return new Complex(Infinity, 0);
      }
      const inv = 1 / a;
      return new Complex(
        Math.log(inv + Math.sqrt(inv * inv + 1)),
        0
      );
    }
    const d = a * a + b * b;
    if (d !== 0) {
      return new Complex(a / d, -b / d)["asinh"]();
    }
    return new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    )["asinh"]();
  },
  /**
   * Calculate the complex asech
   *
   * @returns {Complex}
   */
  "asech": function() {
    const a = this["re"];
    const b = this["im"];
    if (this["isZero"]()) {
      return Complex["INFINITY"];
    }
    const d = a * a + b * b;
    if (d !== 0) {
      return new Complex(a / d, -b / d)["acosh"]();
    }
    return new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    )["acosh"]();
  },
  /**
   * Calculate the complex inverse 1/z
   *
   * @returns {Complex}
   */
  "inverse": function() {
    if (this["isZero"]()) {
      return Complex["INFINITY"];
    }
    if (this["isInfinite"]()) {
      return Complex["ZERO"];
    }
    const a = this["re"];
    const b = this["im"];
    const d = a * a + b * b;
    return new Complex(a / d, -b / d);
  },
  /**
   * Returns the complex conjugate
   *
   * @returns {Complex}
   */
  "conjugate": function() {
    return new Complex(this["re"], -this["im"]);
  },
  /**
   * Gets the negated complex number
   *
   * @returns {Complex}
   */
  "neg": function() {
    return new Complex(-this["re"], -this["im"]);
  },
  /**
   * Ceils the actual complex number
   *
   * @returns {Complex}
   */
  "ceil": function(places) {
    places = Math.pow(10, places || 0);
    return new Complex(
      Math.ceil(this["re"] * places) / places,
      Math.ceil(this["im"] * places) / places
    );
  },
  /**
   * Floors the actual complex number
   *
   * @returns {Complex}
   */
  "floor": function(places) {
    places = Math.pow(10, places || 0);
    return new Complex(
      Math.floor(this["re"] * places) / places,
      Math.floor(this["im"] * places) / places
    );
  },
  /**
   * Ceils the actual complex number
   *
   * @returns {Complex}
   */
  "round": function(places) {
    places = Math.pow(10, places || 0);
    return new Complex(
      Math.round(this["re"] * places) / places,
      Math.round(this["im"] * places) / places
    );
  },
  /**
   * Compares two complex numbers
   *
   * **Note:** new Complex(Infinity).equals(Infinity) === false
   *
   * @returns {boolean}
   */
  "equals": function(a, b) {
    const z = parse$1(a, b);
    return Math.abs(z["re"] - this["re"]) <= Complex["EPSILON"] && Math.abs(z["im"] - this["im"]) <= Complex["EPSILON"];
  },
  /**
   * Clones the actual object
   *
   * @returns {Complex}
   */
  "clone": function() {
    return new Complex(this["re"], this["im"]);
  },
  /**
   * Gets a string of the actual complex number
   *
   * @returns {string}
   */
  "toString": function() {
    let a = this["re"];
    let b = this["im"];
    let ret = "";
    if (this["isNaN"]()) {
      return "NaN";
    }
    if (this["isInfinite"]()) {
      return "Infinity";
    }
    if (Math.abs(a) < Complex["EPSILON"]) {
      a = 0;
    }
    if (Math.abs(b) < Complex["EPSILON"]) {
      b = 0;
    }
    if (b === 0) {
      return ret + a;
    }
    if (a !== 0) {
      ret += a;
      ret += " ";
      if (b < 0) {
        b = -b;
        ret += "-";
      } else {
        ret += "+";
      }
      ret += " ";
    } else if (b < 0) {
      b = -b;
      ret += "-";
    }
    if (1 !== b) {
      ret += b;
    }
    return ret + "i";
  },
  /**
   * Returns the actual number as a vector
   *
   * @returns {Array}
   */
  "toVector": function() {
    return [this["re"], this["im"]];
  },
  /**
   * Returns the actual real value of the current object
   *
   * @returns {number|null}
   */
  "valueOf": function() {
    if (this["im"] === 0) {
      return this["re"];
    }
    return null;
  },
  /**
   * Determines whether a complex number is not on the Riemann sphere.
   *
   * @returns {boolean}
   */
  "isNaN": function() {
    return isNaN(this["re"]) || isNaN(this["im"]);
  },
  /**
   * Determines whether or not a complex number is at the zero pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  "isZero": function() {
    return this["im"] === 0 && this["re"] === 0;
  },
  /**
   * Determines whether a complex number is not at the infinity pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  "isFinite": function() {
    return isFinite(this["re"]) && isFinite(this["im"]);
  },
  /**
   * Determines whether or not a complex number is at the infinity pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  "isInfinite": function() {
    return !this["isFinite"]();
  }
};
Complex["ZERO"] = new Complex(0, 0);
Complex["ONE"] = new Complex(1, 0);
Complex["I"] = new Complex(0, 1);
Complex["PI"] = new Complex(Math.PI, 0);
Complex["E"] = new Complex(Math.E, 0);
Complex["INFINITY"] = new Complex(Infinity, Infinity);
Complex["NAN"] = new Complex(NaN, NaN);
Complex["EPSILON"] = 1e-15;
if (typeof BigInt === "undefined") BigInt = function(n) {
  if (isNaN(n)) throw new Error("");
  return n;
};
const C_ZERO = BigInt(0);
const C_ONE = BigInt(1);
const C_TWO = BigInt(2);
const C_THREE = BigInt(3);
const C_FIVE = BigInt(5);
const C_TEN = BigInt(10);
BigInt(Number.MAX_SAFE_INTEGER);
const MAX_CYCLE_LEN = 2e3;
const P = {
  "s": C_ONE,
  "n": C_ZERO,
  "d": C_ONE
};
function assign(n, s) {
  try {
    n = BigInt(n);
  } catch (e) {
    throw InvalidParameter();
  }
  return n * s;
}
function ifloor(x) {
  return typeof x === "bigint" ? x : Math.floor(x);
}
function newFraction(n, d) {
  if (d === C_ZERO) {
    throw DivisionByZero();
  }
  const f = Object.create(Fraction.prototype);
  f["s"] = n < C_ZERO ? -C_ONE : C_ONE;
  n = n < C_ZERO ? -n : n;
  const a = gcd(n, d);
  f["n"] = n / a;
  f["d"] = d / a;
  return f;
}
const FACTORSTEPS = [C_TWO * C_TWO, C_TWO, C_TWO * C_TWO, C_TWO, C_TWO * C_TWO, C_TWO * C_THREE, C_TWO, C_TWO * C_THREE];
function factorize(n) {
  const factors = /* @__PURE__ */ Object.create(null);
  if (n <= C_ONE) {
    factors[n] = C_ONE;
    return factors;
  }
  const add = (p) => {
    factors[p] = (factors[p] || C_ZERO) + C_ONE;
  };
  while (n % C_TWO === C_ZERO) {
    add(C_TWO);
    n /= C_TWO;
  }
  while (n % C_THREE === C_ZERO) {
    add(C_THREE);
    n /= C_THREE;
  }
  while (n % C_FIVE === C_ZERO) {
    add(C_FIVE);
    n /= C_FIVE;
  }
  for (let si = 0, p = C_TWO + C_FIVE; p * p <= n; ) {
    while (n % p === C_ZERO) {
      add(p);
      n /= p;
    }
    p += FACTORSTEPS[si];
    si = si + 1 & 7;
  }
  if (n > C_ONE) add(n);
  return factors;
}
const parse = function(p1, p2) {
  let n = C_ZERO, d = C_ONE, s = C_ONE;
  if (p1 === void 0 || p1 === null) ;
  else if (p2 !== void 0) {
    if (typeof p1 === "bigint") {
      n = p1;
    } else if (isNaN(p1)) {
      throw InvalidParameter();
    } else if (p1 % 1 !== 0) {
      throw NonIntegerParameter();
    } else {
      n = BigInt(p1);
    }
    if (typeof p2 === "bigint") {
      d = p2;
    } else if (isNaN(p2)) {
      throw InvalidParameter();
    } else if (p2 % 1 !== 0) {
      throw NonIntegerParameter();
    } else {
      d = BigInt(p2);
    }
    s = n * d;
  } else if (typeof p1 === "object") {
    if ("d" in p1 && "n" in p1) {
      n = BigInt(p1["n"]);
      d = BigInt(p1["d"]);
      if ("s" in p1)
        n *= BigInt(p1["s"]);
    } else if (0 in p1) {
      n = BigInt(p1[0]);
      if (1 in p1)
        d = BigInt(p1[1]);
    } else if (typeof p1 === "bigint") {
      n = p1;
    } else {
      throw InvalidParameter();
    }
    s = n * d;
  } else if (typeof p1 === "number") {
    if (isNaN(p1)) {
      throw InvalidParameter();
    }
    if (p1 < 0) {
      s = -C_ONE;
      p1 = -p1;
    }
    if (p1 % 1 === 0) {
      n = BigInt(p1);
    } else {
      let z = 1;
      let A = 0, B = 1;
      let C = 1, D = 1;
      let N = 1e7;
      if (p1 >= 1) {
        z = 10 ** Math.floor(1 + Math.log10(p1));
        p1 /= z;
      }
      while (B <= N && D <= N) {
        let M = (A + C) / (B + D);
        if (p1 === M) {
          if (B + D <= N) {
            n = A + C;
            d = B + D;
          } else if (D > B) {
            n = C;
            d = D;
          } else {
            n = A;
            d = B;
          }
          break;
        } else {
          if (p1 > M) {
            A += C;
            B += D;
          } else {
            C += A;
            D += B;
          }
          if (B > N) {
            n = C;
            d = D;
          } else {
            n = A;
            d = B;
          }
        }
      }
      n = BigInt(n) * BigInt(z);
      d = BigInt(d);
    }
  } else if (typeof p1 === "string") {
    let ndx = 0;
    let v = C_ZERO, w = C_ZERO, x = C_ZERO, y = C_ONE, z = C_ONE;
    let match = p1.replace(/_/g, "").match(/\d+|./g);
    if (match === null)
      throw InvalidParameter();
    if (match[ndx] === "-") {
      s = -C_ONE;
      ndx++;
    } else if (match[ndx] === "+") {
      ndx++;
    }
    if (match.length === ndx + 1) {
      w = assign(match[ndx++], s);
    } else if (match[ndx + 1] === "." || match[ndx] === ".") {
      if (match[ndx] !== ".") {
        v = assign(match[ndx++], s);
      }
      ndx++;
      if (ndx + 1 === match.length || match[ndx + 1] === "(" && match[ndx + 3] === ")" || match[ndx + 1] === "'" && match[ndx + 3] === "'") {
        w = assign(match[ndx], s);
        y = C_TEN ** BigInt(match[ndx].length);
        ndx++;
      }
      if (match[ndx] === "(" && match[ndx + 2] === ")" || match[ndx] === "'" && match[ndx + 2] === "'") {
        x = assign(match[ndx + 1], s);
        z = C_TEN ** BigInt(match[ndx + 1].length) - C_ONE;
        ndx += 3;
      }
    } else if (match[ndx + 1] === "/" || match[ndx + 1] === ":") {
      w = assign(match[ndx], s);
      y = assign(match[ndx + 2], C_ONE);
      ndx += 3;
    } else if (match[ndx + 3] === "/" && match[ndx + 1] === " ") {
      v = assign(match[ndx], s);
      w = assign(match[ndx + 2], s);
      y = assign(match[ndx + 4], C_ONE);
      ndx += 5;
    }
    if (match.length <= ndx) {
      d = y * z;
      s = /* void */
      n = x + d * v + z * w;
    } else {
      throw InvalidParameter();
    }
  } else if (typeof p1 === "bigint") {
    n = p1;
    s = p1;
    d = C_ONE;
  } else {
    throw InvalidParameter();
  }
  if (d === C_ZERO) {
    throw DivisionByZero();
  }
  P["s"] = s < C_ZERO ? -C_ONE : C_ONE;
  P["n"] = n < C_ZERO ? -n : n;
  P["d"] = d < C_ZERO ? -d : d;
};
function modpow(b, e, m2) {
  let r = C_ONE;
  for (; e > C_ZERO; b = b * b % m2, e >>= C_ONE) {
    if (e & C_ONE) {
      r = r * b % m2;
    }
  }
  return r;
}
function cycleLen(n, d) {
  for (; d % C_TWO === C_ZERO; d /= C_TWO) {
  }
  for (; d % C_FIVE === C_ZERO; d /= C_FIVE) {
  }
  if (d === C_ONE)
    return C_ZERO;
  let rem = C_TEN % d;
  let t = 1;
  for (; rem !== C_ONE; t++) {
    rem = rem * C_TEN % d;
    if (t > MAX_CYCLE_LEN)
      return C_ZERO;
  }
  return BigInt(t);
}
function cycleStart(n, d, len) {
  let rem1 = C_ONE;
  let rem2 = modpow(C_TEN, len, d);
  for (let t = 0; t < 300; t++) {
    if (rem1 === rem2)
      return BigInt(t);
    rem1 = rem1 * C_TEN % d;
    rem2 = rem2 * C_TEN % d;
  }
  return 0;
}
function gcd(a, b) {
  if (!a)
    return b;
  if (!b)
    return a;
  while (1) {
    a %= b;
    if (!a)
      return b;
    b %= a;
    if (!b)
      return a;
  }
}
function Fraction(a, b) {
  parse(a, b);
  if (this instanceof Fraction) {
    a = gcd(P["d"], P["n"]);
    this["s"] = P["s"];
    this["n"] = P["n"] / a;
    this["d"] = P["d"] / a;
  } else {
    return newFraction(P["s"] * P["n"], P["d"]);
  }
}
const DivisionByZero = function() {
  return new Error("Division by Zero");
};
const InvalidParameter = function() {
  return new Error("Invalid argument");
};
const NonIntegerParameter = function() {
  return new Error("Parameters must be integer");
};
Fraction.prototype = {
  "s": C_ONE,
  "n": C_ZERO,
  "d": C_ONE,
  /**
   * Calculates the absolute value
   *
   * Ex: new Fraction(-4).abs() => 4
   **/
  "abs": function() {
    return newFraction(this["n"], this["d"]);
  },
  /**
   * Inverts the sign of the current fraction
   *
   * Ex: new Fraction(-4).neg() => 4
   **/
  "neg": function() {
    return newFraction(-this["s"] * this["n"], this["d"]);
  },
  /**
   * Adds two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
   **/
  "add": function(a, b) {
    parse(a, b);
    return newFraction(
      this["s"] * this["n"] * P["d"] + P["s"] * this["d"] * P["n"],
      this["d"] * P["d"]
    );
  },
  /**
   * Subtracts two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
   **/
  "sub": function(a, b) {
    parse(a, b);
    return newFraction(
      this["s"] * this["n"] * P["d"] - P["s"] * this["d"] * P["n"],
      this["d"] * P["d"]
    );
  },
  /**
   * Multiplies two rational numbers
   *
   * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
   **/
  "mul": function(a, b) {
    parse(a, b);
    return newFraction(
      this["s"] * P["s"] * this["n"] * P["n"],
      this["d"] * P["d"]
    );
  },
  /**
   * Divides two rational numbers
   *
   * Ex: new Fraction("-17.(345)").inverse().div(3)
   **/
  "div": function(a, b) {
    parse(a, b);
    return newFraction(
      this["s"] * P["s"] * this["n"] * P["d"],
      this["d"] * P["n"]
    );
  },
  /**
   * Clones the actual object
   *
   * Ex: new Fraction("-17.(345)").clone()
   **/
  "clone": function() {
    return newFraction(this["s"] * this["n"], this["d"]);
  },
  /**
   * Calculates the modulo of two rational numbers - a more precise fmod
   *
   * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
   * Ex: new Fraction(20, 10).mod().equals(0) ? "is Integer"
   **/
  "mod": function(a, b) {
    if (a === void 0) {
      return newFraction(this["s"] * this["n"] % this["d"], C_ONE);
    }
    parse(a, b);
    if (C_ZERO === P["n"] * this["d"]) {
      throw DivisionByZero();
    }
    return newFraction(
      this["s"] * (P["d"] * this["n"]) % (P["n"] * this["d"]),
      P["d"] * this["d"]
    );
  },
  /**
   * Calculates the fractional gcd of two rational numbers
   *
   * Ex: new Fraction(5,8).gcd(3,7) => 1/56
   */
  "gcd": function(a, b) {
    parse(a, b);
    return newFraction(gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]), P["d"] * this["d"]);
  },
  /**
   * Calculates the fractional lcm of two rational numbers
   *
   * Ex: new Fraction(5,8).lcm(3,7) => 15
   */
  "lcm": function(a, b) {
    parse(a, b);
    if (P["n"] === C_ZERO && this["n"] === C_ZERO) {
      return newFraction(C_ZERO, C_ONE);
    }
    return newFraction(P["n"] * this["n"], gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]));
  },
  /**
   * Gets the inverse of the fraction, means numerator and denominator are exchanged
   *
   * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
   **/
  "inverse": function() {
    return newFraction(this["s"] * this["d"], this["n"]);
  },
  /**
   * Calculates the fraction to some integer exponent
   *
   * Ex: new Fraction(-1,2).pow(-3) => -8
   */
  "pow": function(a, b) {
    parse(a, b);
    if (P["d"] === C_ONE) {
      if (P["s"] < C_ZERO) {
        return newFraction((this["s"] * this["d"]) ** P["n"], this["n"] ** P["n"]);
      } else {
        return newFraction((this["s"] * this["n"]) ** P["n"], this["d"] ** P["n"]);
      }
    }
    if (this["s"] < C_ZERO) return null;
    let N = factorize(this["n"]);
    let D = factorize(this["d"]);
    let n = C_ONE;
    let d = C_ONE;
    for (let k in N) {
      if (k === "1") continue;
      if (k === "0") {
        n = C_ZERO;
        break;
      }
      N[k] *= P["n"];
      if (N[k] % P["d"] === C_ZERO) {
        N[k] /= P["d"];
      } else return null;
      n *= BigInt(k) ** N[k];
    }
    for (let k in D) {
      if (k === "1") continue;
      D[k] *= P["n"];
      if (D[k] % P["d"] === C_ZERO) {
        D[k] /= P["d"];
      } else return null;
      d *= BigInt(k) ** D[k];
    }
    if (P["s"] < C_ZERO) {
      return newFraction(d, n);
    }
    return newFraction(n, d);
  },
  /**
   * Calculates the logarithm of a fraction to a given rational base
   *
   * Ex: new Fraction(27, 8).log(9, 4) => 3/2
   */
  "log": function(a, b) {
    parse(a, b);
    if (this["s"] <= C_ZERO || P["s"] <= C_ZERO) return null;
    const allPrimes = /* @__PURE__ */ Object.create(null);
    const baseFactors = factorize(P["n"]);
    const T1 = factorize(P["d"]);
    const numberFactors = factorize(this["n"]);
    const T2 = factorize(this["d"]);
    for (const prime in T1) {
      baseFactors[prime] = (baseFactors[prime] || C_ZERO) - T1[prime];
    }
    for (const prime in T2) {
      numberFactors[prime] = (numberFactors[prime] || C_ZERO) - T2[prime];
    }
    for (const prime in baseFactors) {
      if (prime === "1") continue;
      allPrimes[prime] = true;
    }
    for (const prime in numberFactors) {
      if (prime === "1") continue;
      allPrimes[prime] = true;
    }
    let retN = null;
    let retD = null;
    for (const prime in allPrimes) {
      const baseExponent = baseFactors[prime] || C_ZERO;
      const numberExponent = numberFactors[prime] || C_ZERO;
      if (baseExponent === C_ZERO) {
        if (numberExponent !== C_ZERO) {
          return null;
        }
        continue;
      }
      let curN = numberExponent;
      let curD = baseExponent;
      const gcdValue = gcd(curN, curD);
      curN /= gcdValue;
      curD /= gcdValue;
      if (retN === null && retD === null) {
        retN = curN;
        retD = curD;
      } else if (curN * retD !== retN * curD) {
        return null;
      }
    }
    return retN !== null && retD !== null ? newFraction(retN, retD) : null;
  },
  /**
   * Check if two rational numbers are the same
   *
   * Ex: new Fraction(19.6).equals([98, 5]);
   **/
  "equals": function(a, b) {
    parse(a, b);
    return this["s"] * this["n"] * P["d"] === P["s"] * P["n"] * this["d"];
  },
  /**
   * Check if this rational number is less than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "lt": function(a, b) {
    parse(a, b);
    return this["s"] * this["n"] * P["d"] < P["s"] * P["n"] * this["d"];
  },
  /**
   * Check if this rational number is less than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "lte": function(a, b) {
    parse(a, b);
    return this["s"] * this["n"] * P["d"] <= P["s"] * P["n"] * this["d"];
  },
  /**
   * Check if this rational number is greater than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "gt": function(a, b) {
    parse(a, b);
    return this["s"] * this["n"] * P["d"] > P["s"] * P["n"] * this["d"];
  },
  /**
   * Check if this rational number is greater than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "gte": function(a, b) {
    parse(a, b);
    return this["s"] * this["n"] * P["d"] >= P["s"] * P["n"] * this["d"];
  },
  /**
   * Compare two rational numbers
   * < 0 iff this < that
   * > 0 iff this > that
   * = 0 iff this = that
   *
   * Ex: new Fraction(19.6).compare([98, 5]);
   **/
  "compare": function(a, b) {
    parse(a, b);
    let t = this["s"] * this["n"] * P["d"] - P["s"] * P["n"] * this["d"];
    return (C_ZERO < t) - (t < C_ZERO);
  },
  /**
   * Calculates the ceil of a rational number
   *
   * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
   **/
  "ceil": function(places) {
    places = C_TEN ** BigInt(places || 0);
    return newFraction(
      ifloor(this["s"] * places * this["n"] / this["d"]) + (places * this["n"] % this["d"] > C_ZERO && this["s"] >= C_ZERO ? C_ONE : C_ZERO),
      places
    );
  },
  /**
   * Calculates the floor of a rational number
   *
   * Ex: new Fraction('4.(3)').floor() => (4 / 1)
   **/
  "floor": function(places) {
    places = C_TEN ** BigInt(places || 0);
    return newFraction(
      ifloor(this["s"] * places * this["n"] / this["d"]) - (places * this["n"] % this["d"] > C_ZERO && this["s"] < C_ZERO ? C_ONE : C_ZERO),
      places
    );
  },
  /**
   * Rounds a rational numbers
   *
   * Ex: new Fraction('4.(3)').round() => (4 / 1)
   **/
  "round": function(places) {
    places = C_TEN ** BigInt(places || 0);
    return newFraction(
      ifloor(this["s"] * places * this["n"] / this["d"]) + this["s"] * ((this["s"] >= C_ZERO ? C_ONE : C_ZERO) + C_TWO * (places * this["n"] % this["d"]) > this["d"] ? C_ONE : C_ZERO),
      places
    );
  },
  /**
    * Rounds a rational number to a multiple of another rational number
    *
    * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
    **/
  "roundTo": function(a, b) {
    parse(a, b);
    const n = this["n"] * P["d"];
    const d = this["d"] * P["n"];
    const r = n % d;
    let k = ifloor(n / d);
    if (r + r >= d) {
      k++;
    }
    return newFraction(this["s"] * k * P["n"], P["d"]);
  },
  /**
   * Check if two rational numbers are divisible
   *
   * Ex: new Fraction(19.6).divisible(1.5);
   */
  "divisible": function(a, b) {
    parse(a, b);
    if (P["n"] === C_ZERO) return false;
    return this["n"] * P["d"] % (P["n"] * this["d"]) === C_ZERO;
  },
  /**
   * Returns a decimal representation of the fraction
   *
   * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
   **/
  "valueOf": function() {
    return Number(this["s"] * this["n"]) / Number(this["d"]);
  },
  /**
   * Creates a string representation of a fraction with all digits
   *
   * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
   **/
  "toString": function(dec = 15) {
    let N = this["n"];
    let D = this["d"];
    let cycLen = cycleLen(N, D);
    let cycOff = cycleStart(N, D, cycLen);
    let str = this["s"] < C_ZERO ? "-" : "";
    str += ifloor(N / D);
    N %= D;
    N *= C_TEN;
    if (N)
      str += ".";
    if (cycLen) {
      for (let i2 = cycOff; i2--; ) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
      str += "(";
      for (let i2 = cycLen; i2--; ) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
      str += ")";
    } else {
      for (let i2 = dec; N && i2--; ) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
    }
    return str;
  },
  /**
   * Returns a string-fraction representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
   **/
  "toFraction": function(showMixed = false) {
    let n = this["n"];
    let d = this["d"];
    let str = this["s"] < C_ZERO ? "-" : "";
    if (d === C_ONE) {
      str += n;
    } else {
      const whole = ifloor(n / d);
      if (showMixed && whole > C_ZERO) {
        str += whole;
        str += " ";
        n %= d;
      }
      str += n;
      str += "/";
      str += d;
    }
    return str;
  },
  /**
   * Returns a latex representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
   **/
  "toLatex": function(showMixed = false) {
    let n = this["n"];
    let d = this["d"];
    let str = this["s"] < C_ZERO ? "-" : "";
    if (d === C_ONE) {
      str += n;
    } else {
      const whole = ifloor(n / d);
      if (showMixed && whole > C_ZERO) {
        str += whole;
        n %= d;
      }
      str += "\\frac{";
      str += n;
      str += "}{";
      str += d;
      str += "}";
    }
    return str;
  },
  /**
   * Returns an array of continued fraction elements
   *
   * Ex: new Fraction("7/8").toContinued() => [0,1,7]
   */
  "toContinued": function() {
    let a = this["n"];
    let b = this["d"];
    const res = [];
    while (b) {
      res.push(ifloor(a / b));
      const t = a % b;
      a = b;
      b = t;
    }
    return res;
  },
  "simplify": function(eps = 1e-3) {
    const ieps = BigInt(Math.ceil(1 / eps));
    const thisABS = this["abs"]();
    const cont = thisABS["toContinued"]();
    for (let i2 = 1; i2 < cont.length; i2++) {
      let s = newFraction(cont[i2 - 1], C_ONE);
      for (let k = i2 - 2; k >= 0; k--) {
        s = s["inverse"]()["add"](cont[k]);
      }
      let t = s["sub"](thisABS);
      if (t["n"] * ieps < t["d"]) {
        return s["mul"](this["s"]);
      }
    }
    return this;
  }
};
var tinyEmitter = { exports: {} };
var hasRequiredTinyEmitter;
function requireTinyEmitter() {
  if (hasRequiredTinyEmitter) return tinyEmitter.exports;
  hasRequiredTinyEmitter = 1;
  function E() {
  }
  E.prototype = {
    on: function(name, callback, ctx) {
      var e = this.e || (this.e = {});
      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx
      });
      return this;
    },
    once: function(name, callback, ctx) {
      var self2 = this;
      function listener() {
        self2.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },
    emit: function(name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i2 = 0;
      var len = evtArr.length;
      for (i2; i2 < len; i2++) {
        evtArr[i2].fn.apply(evtArr[i2].ctx, data);
      }
      return this;
    },
    off: function(name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];
      if (evts && callback) {
        for (var i2 = 0, len = evts.length; i2 < len; i2++) {
          if (evts[i2].fn !== callback && evts[i2].fn._ !== callback)
            liveEvents.push(evts[i2]);
        }
      }
      liveEvents.length ? e[name] = liveEvents : delete e[name];
      return this;
    }
  };
  tinyEmitter.exports = E;
  tinyEmitter.exports.TinyEmitter = E;
  return tinyEmitter.exports;
}
var tinyEmitterExports = requireTinyEmitter();
const Emitter = /* @__PURE__ */ getDefaultExportFromCjs(tinyEmitterExports);
var load$1 = { exports: {} };
var base64;
var hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64) return base64;
  hasRequiredBase64 = 1;
  function b64ToUint6(nChr) {
    return nChr > 64 && nChr < 91 ? nChr - 65 : nChr > 96 && nChr < 123 ? nChr - 71 : nChr > 47 && nChr < 58 ? nChr + 4 : nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
  }
  function decode(sBase64, nBlocksSize) {
    var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, "");
    var nInLen = sB64Enc.length;
    var nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2;
    var taBytes = new Uint8Array(nOutLen);
    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
      nMod4 = nInIdx & 3;
      nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
      if (nMod4 === 3 || nInLen - nInIdx === 1) {
        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
          taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
        }
        nUint24 = 0;
      }
    }
    return taBytes;
  }
  base64 = { decode };
  return base64;
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer_1;
var hasRequiredIsBuffer;
function requireIsBuffer() {
  if (hasRequiredIsBuffer) return isBuffer_1;
  hasRequiredIsBuffer = 1;
  isBuffer_1 = function(obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
  };
  function isBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  }
  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
  }
  return isBuffer_1;
}
var hasRequiredLoad;
function requireLoad() {
  if (hasRequiredLoad) return load$1.exports;
  hasRequiredLoad = 1;
  (function(module2) {
    var base642 = requireBase64();
    var isBuffer = requireIsBuffer();
    function fromRegex(r) {
      return function(o) {
        return typeof o === "string" && r.test(o);
      };
    }
    function prefix2(pre, name) {
      return typeof pre === "string" ? pre + name : typeof pre === "function" ? pre(name) : name;
    }
    function load2(source, options, defVal) {
      var loader = (
        // Basic audio loading
        isArrayBuffer(source) || isBuffer(source) ? decodeBuffer : isAudioFileName(source) ? loadAudioFile : isPromise2(source) ? loadPromise : isArray2(source) ? loadArrayData : isObject2(source) ? loadObjectData : isJsonFileName(source) ? loadJsonFile : isBase64Audio(source) ? loadBase64Audio : isJsFileName(source) ? loadMidiJSFile : null
      );
      var opts = options || {};
      var promise = loader ? loader(source, opts) : defVal ? Promise.resolve(defVal) : Promise.reject("Source not valid (" + source + ")");
      return promise.then(function(data) {
        opts.ready(null, data);
        return data;
      }, function(err) {
        opts.ready(err);
        throw err;
      });
    }
    function isArrayBuffer(o) {
      return o instanceof ArrayBuffer;
    }
    function decodeBuffer(array4, options) {
      return options.decode(array4);
    }
    var isAudioFileName = fromRegex(/\.(mp3|wav|ogg)(\?.*)?$/i);
    function loadAudioFile(name, options) {
      var url2 = prefix2(options.from, name);
      return load2(options.fetch(url2, "arraybuffer"), options);
    }
    function isPromise2(o) {
      return o && typeof o.then === "function";
    }
    function loadPromise(promise, options) {
      return promise.then(function(value) {
        return load2(value, options);
      });
    }
    var isArray2 = Array.isArray;
    function loadArrayData(array4, options) {
      return Promise.all(array4.map(function(data) {
        return load2(data, options, data);
      }));
    }
    function isObject2(o) {
      return o && typeof o === "object";
    }
    function loadObjectData(obj, options) {
      var dest = {};
      var promises = Object.keys(obj).map(function(key2) {
        if (options.only && options.only.indexOf(key2) === -1) return null;
        var value = obj[key2];
        return load2(value, options, value).then(function(audio) {
          dest[key2] = audio;
        });
      });
      return Promise.all(promises).then(function() {
        return dest;
      });
    }
    var isJsonFileName = fromRegex(/\.json(\?.*)?$/i);
    function loadJsonFile(name, options) {
      var url2 = prefix2(options.from, name);
      return load2(options.fetch(url2, "text").then(JSON.parse), options);
    }
    var isBase64Audio = fromRegex(/^data:audio/);
    function loadBase64Audio(source, options) {
      var i2 = source.indexOf(",");
      return load2(base642.decode(source.slice(i2 + 1)).buffer, options);
    }
    var isJsFileName = fromRegex(/\.js(\?.*)?$/i);
    function loadMidiJSFile(name, options) {
      var url2 = prefix2(options.from, name);
      return load2(options.fetch(url2, "text").then(midiJsToJson), options);
    }
    function midiJsToJson(data) {
      var begin = data.indexOf("MIDI.Soundfont.");
      if (begin < 0) throw Error("Invalid MIDI.js Soundfont format");
      begin = data.indexOf("=", begin) + 2;
      var end = data.lastIndexOf(",");
      return JSON.parse(data.slice(begin, end) + "}");
    }
    if (module2.exports) module2.exports = load2;
    if (typeof window !== "undefined") window.loadAudio = load2;
  })(load$1);
  return load$1.exports;
}
var audioContext;
var hasRequiredAudioContext;
function requireAudioContext() {
  if (hasRequiredAudioContext) return audioContext;
  hasRequiredAudioContext = 1;
  var cache2 = {};
  audioContext = function getContext(options) {
    if (typeof window === "undefined") return null;
    var OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    var Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return null;
    if (typeof options === "number") {
      options = { sampleRate: options };
    }
    var sampleRate = options && options.sampleRate;
    if (options && options.offline) {
      if (!OfflineContext) return null;
      return new OfflineContext(options.channels || 2, options.length, sampleRate || 44100);
    }
    var ctx = cache2[sampleRate];
    if (ctx) return ctx;
    try {
      ctx = new Context(options);
    } catch (err) {
      ctx = new Context();
    }
    cache2[ctx.sampleRate] = cache2[sampleRate] = ctx;
    return ctx;
  };
  return audioContext;
}
var browser;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser;
  hasRequiredBrowser = 1;
  var load2 = requireLoad();
  var context = requireAudioContext();
  browser = function(source, options, cb) {
    if (options instanceof Function) {
      cb = options;
      options = {};
    }
    options = options || {};
    options.ready = cb || function() {
    };
    var ac = options && options.context ? options.context : context();
    var defaults = { decode: getAudioDecoder(ac), fetch: fetch2 };
    var opts = Object.assign(defaults, options);
    return load2(source, opts);
  };
  function getAudioDecoder(ac) {
    return function decode(buffer) {
      return new Promise(function(resolve, reject) {
        ac.decodeAudioData(
          buffer,
          function(data) {
            resolve(data);
          },
          function(err) {
            reject(err);
          }
        );
      });
    };
  }
  function fetch2(url2, type4) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      if (type4) req.responseType = type4;
      req.open("GET", url2);
      req.onload = function() {
        req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
      };
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send();
    });
  }
  return browser;
}
var browserExports = requireBrowser();
const load = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
const createExtendedExponentialRampToValueAutomationEvent = (value, endTime, insertTime) => {
  return { endTime, insertTime, type: "exponentialRampToValue", value };
};
const createExtendedLinearRampToValueAutomationEvent = (value, endTime, insertTime) => {
  return { endTime, insertTime, type: "linearRampToValue", value };
};
const createSetValueAutomationEvent = (value, startTime) => {
  return { startTime, type: "setValue", value };
};
const createSetValueCurveAutomationEvent = (values, startTime, duration) => {
  return { duration, startTime, type: "setValueCurve", values };
};
const getTargetValueAtTime = (time2, valueAtStartTime, { startTime, target, timeConstant }) => {
  return target + (valueAtStartTime - target) * Math.exp((startTime - time2) / timeConstant);
};
const isExponentialRampToValueAutomationEvent = (automationEvent) => {
  return automationEvent.type === "exponentialRampToValue";
};
const isLinearRampToValueAutomationEvent = (automationEvent) => {
  return automationEvent.type === "linearRampToValue";
};
const isAnyRampToValueAutomationEvent = (automationEvent) => {
  return isExponentialRampToValueAutomationEvent(automationEvent) || isLinearRampToValueAutomationEvent(automationEvent);
};
const isSetValueAutomationEvent = (automationEvent) => {
  return automationEvent.type === "setValue";
};
const isSetValueCurveAutomationEvent = (automationEvent) => {
  return automationEvent.type === "setValueCurve";
};
const getValueOfAutomationEventAtIndexAtTime = (automationEvents, index, time2, defaultValue) => {
  const automationEvent = automationEvents[index];
  return automationEvent === void 0 ? defaultValue : isAnyRampToValueAutomationEvent(automationEvent) || isSetValueAutomationEvent(automationEvent) ? automationEvent.value : isSetValueCurveAutomationEvent(automationEvent) ? automationEvent.values[automationEvent.values.length - 1] : getTargetValueAtTime(time2, getValueOfAutomationEventAtIndexAtTime(automationEvents, index - 1, automationEvent.startTime, defaultValue), automationEvent);
};
const getEndTimeAndValueOfPreviousAutomationEvent = (automationEvents, index, currentAutomationEvent, nextAutomationEvent, defaultValue) => {
  return currentAutomationEvent === void 0 ? [nextAutomationEvent.insertTime, defaultValue] : isAnyRampToValueAutomationEvent(currentAutomationEvent) ? [currentAutomationEvent.endTime, currentAutomationEvent.value] : isSetValueAutomationEvent(currentAutomationEvent) ? [currentAutomationEvent.startTime, currentAutomationEvent.value] : isSetValueCurveAutomationEvent(currentAutomationEvent) ? [
    currentAutomationEvent.startTime + currentAutomationEvent.duration,
    currentAutomationEvent.values[currentAutomationEvent.values.length - 1]
  ] : [
    currentAutomationEvent.startTime,
    getValueOfAutomationEventAtIndexAtTime(automationEvents, index - 1, currentAutomationEvent.startTime, defaultValue)
  ];
};
const isCancelAndHoldAutomationEvent = (automationEvent) => {
  return automationEvent.type === "cancelAndHold";
};
const isCancelScheduledValuesAutomationEvent = (automationEvent) => {
  return automationEvent.type === "cancelScheduledValues";
};
const getEventTime = (automationEvent) => {
  if (isCancelAndHoldAutomationEvent(automationEvent) || isCancelScheduledValuesAutomationEvent(automationEvent)) {
    return automationEvent.cancelTime;
  }
  if (isExponentialRampToValueAutomationEvent(automationEvent) || isLinearRampToValueAutomationEvent(automationEvent)) {
    return automationEvent.endTime;
  }
  return automationEvent.startTime;
};
const getExponentialRampValueAtTime = (time2, startTime, valueAtStartTime, { endTime, value }) => {
  if (valueAtStartTime === value) {
    return value;
  }
  if (0 < valueAtStartTime && 0 < value || valueAtStartTime < 0 && value < 0) {
    return valueAtStartTime * (value / valueAtStartTime) ** ((time2 - startTime) / (endTime - startTime));
  }
  return 0;
};
const getLinearRampValueAtTime = (time2, startTime, valueAtStartTime, { endTime, value }) => {
  return valueAtStartTime + (time2 - startTime) / (endTime - startTime) * (value - valueAtStartTime);
};
const interpolateValue = (values, theoreticIndex) => {
  const lowerIndex = Math.floor(theoreticIndex);
  const upperIndex = Math.ceil(theoreticIndex);
  if (lowerIndex === upperIndex) {
    return values[lowerIndex];
  }
  return (1 - (theoreticIndex - lowerIndex)) * values[lowerIndex] + (1 - (upperIndex - theoreticIndex)) * values[upperIndex];
};
const getValueCurveValueAtTime = (time2, { duration, startTime, values }) => {
  const theoreticIndex = (time2 - startTime) / duration * (values.length - 1);
  return interpolateValue(values, theoreticIndex);
};
const isSetTargetAutomationEvent = (automationEvent) => {
  return automationEvent.type === "setTarget";
};
class AutomationEventList {
  constructor(defaultValue) {
    this._automationEvents = [];
    this._currenTime = 0;
    this._defaultValue = defaultValue;
  }
  [Symbol.iterator]() {
    return this._automationEvents[Symbol.iterator]();
  }
  add(automationEvent) {
    const eventTime = getEventTime(automationEvent);
    if (isCancelAndHoldAutomationEvent(automationEvent) || isCancelScheduledValuesAutomationEvent(automationEvent)) {
      const index = this._automationEvents.findIndex((currentAutomationEvent) => {
        if (isCancelScheduledValuesAutomationEvent(automationEvent) && isSetValueCurveAutomationEvent(currentAutomationEvent)) {
          return currentAutomationEvent.startTime + currentAutomationEvent.duration >= eventTime;
        }
        return getEventTime(currentAutomationEvent) >= eventTime;
      });
      const removedAutomationEvent = this._automationEvents[index];
      if (index !== -1) {
        this._automationEvents = this._automationEvents.slice(0, index);
      }
      if (isCancelAndHoldAutomationEvent(automationEvent)) {
        const lastAutomationEvent = this._automationEvents[this._automationEvents.length - 1];
        if (removedAutomationEvent !== void 0 && isAnyRampToValueAutomationEvent(removedAutomationEvent)) {
          if (lastAutomationEvent !== void 0 && isSetTargetAutomationEvent(lastAutomationEvent)) {
            throw new Error("The internal list is malformed.");
          }
          const startTime = lastAutomationEvent === void 0 ? removedAutomationEvent.insertTime : isSetValueCurveAutomationEvent(lastAutomationEvent) ? lastAutomationEvent.startTime + lastAutomationEvent.duration : getEventTime(lastAutomationEvent);
          const startValue = lastAutomationEvent === void 0 ? this._defaultValue : isSetValueCurveAutomationEvent(lastAutomationEvent) ? lastAutomationEvent.values[lastAutomationEvent.values.length - 1] : lastAutomationEvent.value;
          const value = isExponentialRampToValueAutomationEvent(removedAutomationEvent) ? getExponentialRampValueAtTime(eventTime, startTime, startValue, removedAutomationEvent) : getLinearRampValueAtTime(eventTime, startTime, startValue, removedAutomationEvent);
          const truncatedAutomationEvent = isExponentialRampToValueAutomationEvent(removedAutomationEvent) ? createExtendedExponentialRampToValueAutomationEvent(value, eventTime, this._currenTime) : createExtendedLinearRampToValueAutomationEvent(value, eventTime, this._currenTime);
          this._automationEvents.push(truncatedAutomationEvent);
        }
        if (lastAutomationEvent !== void 0 && isSetTargetAutomationEvent(lastAutomationEvent)) {
          this._automationEvents.push(createSetValueAutomationEvent(this.getValue(eventTime), eventTime));
        }
        if (lastAutomationEvent !== void 0 && isSetValueCurveAutomationEvent(lastAutomationEvent) && lastAutomationEvent.startTime + lastAutomationEvent.duration > eventTime) {
          const duration = eventTime - lastAutomationEvent.startTime;
          const ratio = (lastAutomationEvent.values.length - 1) / lastAutomationEvent.duration;
          const length = Math.max(2, 1 + Math.ceil(duration * ratio));
          const fraction = duration / (length - 1) * ratio;
          const values = lastAutomationEvent.values.slice(0, length);
          if (fraction < 1) {
            for (let i2 = 1; i2 < length; i2 += 1) {
              const factor = fraction * i2 % 1;
              values[i2] = lastAutomationEvent.values[i2 - 1] * (1 - factor) + lastAutomationEvent.values[i2] * factor;
            }
          }
          this._automationEvents[this._automationEvents.length - 1] = createSetValueCurveAutomationEvent(values, lastAutomationEvent.startTime, duration);
        }
      }
    } else {
      const index = this._automationEvents.findIndex((currentAutomationEvent) => getEventTime(currentAutomationEvent) > eventTime);
      const previousAutomationEvent = index === -1 ? this._automationEvents[this._automationEvents.length - 1] : this._automationEvents[index - 1];
      if (previousAutomationEvent !== void 0 && isSetValueCurveAutomationEvent(previousAutomationEvent) && getEventTime(previousAutomationEvent) + previousAutomationEvent.duration > eventTime) {
        return false;
      }
      const persistentAutomationEvent = isExponentialRampToValueAutomationEvent(automationEvent) ? createExtendedExponentialRampToValueAutomationEvent(automationEvent.value, automationEvent.endTime, this._currenTime) : isLinearRampToValueAutomationEvent(automationEvent) ? createExtendedLinearRampToValueAutomationEvent(automationEvent.value, eventTime, this._currenTime) : automationEvent;
      if (index === -1) {
        this._automationEvents.push(persistentAutomationEvent);
      } else {
        if (isSetValueCurveAutomationEvent(automationEvent) && eventTime + automationEvent.duration > getEventTime(this._automationEvents[index])) {
          return false;
        }
        this._automationEvents.splice(index, 0, persistentAutomationEvent);
      }
    }
    return true;
  }
  flush(time2) {
    const index = this._automationEvents.findIndex((currentAutomationEvent) => getEventTime(currentAutomationEvent) > time2);
    if (index > 1) {
      const remainingAutomationEvents = this._automationEvents.slice(index - 1);
      const firstRemainingAutomationEvent = remainingAutomationEvents[0];
      if (isSetTargetAutomationEvent(firstRemainingAutomationEvent)) {
        remainingAutomationEvents.unshift(createSetValueAutomationEvent(getValueOfAutomationEventAtIndexAtTime(this._automationEvents, index - 2, firstRemainingAutomationEvent.startTime, this._defaultValue), firstRemainingAutomationEvent.startTime));
      }
      this._automationEvents = remainingAutomationEvents;
    }
  }
  getValue(time2) {
    if (this._automationEvents.length === 0) {
      return this._defaultValue;
    }
    const indexOfNextEvent = this._automationEvents.findIndex((automationEvent) => getEventTime(automationEvent) > time2);
    const nextAutomationEvent = this._automationEvents[indexOfNextEvent];
    const indexOfCurrentEvent = (indexOfNextEvent === -1 ? this._automationEvents.length : indexOfNextEvent) - 1;
    const currentAutomationEvent = this._automationEvents[indexOfCurrentEvent];
    if (currentAutomationEvent !== void 0 && isSetTargetAutomationEvent(currentAutomationEvent) && (nextAutomationEvent === void 0 || !isAnyRampToValueAutomationEvent(nextAutomationEvent) || nextAutomationEvent.insertTime > time2)) {
      return getTargetValueAtTime(time2, getValueOfAutomationEventAtIndexAtTime(this._automationEvents, indexOfCurrentEvent - 1, currentAutomationEvent.startTime, this._defaultValue), currentAutomationEvent);
    }
    if (currentAutomationEvent !== void 0 && isSetValueAutomationEvent(currentAutomationEvent) && (nextAutomationEvent === void 0 || !isAnyRampToValueAutomationEvent(nextAutomationEvent))) {
      return currentAutomationEvent.value;
    }
    if (currentAutomationEvent !== void 0 && isSetValueCurveAutomationEvent(currentAutomationEvent) && (nextAutomationEvent === void 0 || !isAnyRampToValueAutomationEvent(nextAutomationEvent) || currentAutomationEvent.startTime + currentAutomationEvent.duration > time2)) {
      if (time2 < currentAutomationEvent.startTime + currentAutomationEvent.duration) {
        return getValueCurveValueAtTime(time2, currentAutomationEvent);
      }
      return currentAutomationEvent.values[currentAutomationEvent.values.length - 1];
    }
    if (currentAutomationEvent !== void 0 && isAnyRampToValueAutomationEvent(currentAutomationEvent) && (nextAutomationEvent === void 0 || !isAnyRampToValueAutomationEvent(nextAutomationEvent))) {
      return currentAutomationEvent.value;
    }
    if (nextAutomationEvent !== void 0 && isExponentialRampToValueAutomationEvent(nextAutomationEvent)) {
      const [startTime, value] = getEndTimeAndValueOfPreviousAutomationEvent(this._automationEvents, indexOfCurrentEvent, currentAutomationEvent, nextAutomationEvent, this._defaultValue);
      return getExponentialRampValueAtTime(time2, startTime, value, nextAutomationEvent);
    }
    if (nextAutomationEvent !== void 0 && isLinearRampToValueAutomationEvent(nextAutomationEvent)) {
      const [startTime, value] = getEndTimeAndValueOfPreviousAutomationEvent(this._automationEvents, indexOfCurrentEvent, currentAutomationEvent, nextAutomationEvent, this._defaultValue);
      return getLinearRampValueAtTime(time2, startTime, value, nextAutomationEvent);
    }
    return this._defaultValue;
  }
}
const createCancelAndHoldAutomationEvent = (cancelTime) => {
  return { cancelTime, type: "cancelAndHold" };
};
const createCancelScheduledValuesAutomationEvent = (cancelTime) => {
  return { cancelTime, type: "cancelScheduledValues" };
};
const createExponentialRampToValueAutomationEvent = (value, endTime) => {
  return { endTime, type: "exponentialRampToValue", value };
};
const createLinearRampToValueAutomationEvent = (value, endTime) => {
  return { endTime, type: "linearRampToValue", value };
};
const createSetTargetAutomationEvent = (target, startTime, timeConstant) => {
  return { startTime, target, timeConstant, type: "setTarget" };
};
function __decorate(decorators, target, key2, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key2) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key2, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key2, r) : d(target, key2)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key2, r), r;
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var midiFile = {};
var midiParser;
var hasRequiredMidiParser;
function requireMidiParser() {
  if (hasRequiredMidiParser) return midiParser;
  hasRequiredMidiParser = 1;
  function parseMidi(data) {
    var p = new Parser(data);
    var headerChunk = p.readChunk();
    if (headerChunk.id != "MThd")
      throw "Bad MIDI file.  Expected 'MHdr', got: '" + headerChunk.id + "'";
    var header = parseHeader(headerChunk.data);
    var tracks = [];
    for (var i2 = 0; !p.eof() && i2 < header.numTracks; i2++) {
      var trackChunk = p.readChunk();
      if (trackChunk.id != "MTrk")
        throw "Bad MIDI file.  Expected 'MTrk', got: '" + trackChunk.id + "'";
      var track = parseTrack(trackChunk.data);
      tracks.push(track);
    }
    return {
      header,
      tracks
    };
  }
  function parseHeader(data) {
    var p = new Parser(data);
    var format2 = p.readUInt16();
    var numTracks = p.readUInt16();
    var result = {
      format: format2,
      numTracks
    };
    var timeDivision = p.readUInt16();
    if (timeDivision & 32768) {
      result.framesPerSecond = 256 - (timeDivision >> 8);
      result.ticksPerFrame = timeDivision & 255;
    } else {
      result.ticksPerBeat = timeDivision;
    }
    return result;
  }
  function parseTrack(data) {
    var p = new Parser(data);
    var events2 = [];
    while (!p.eof()) {
      var event = readEvent();
      events2.push(event);
    }
    return events2;
    var lastEventTypeByte = null;
    function readEvent() {
      var event2 = {};
      event2.deltaTime = p.readVarInt();
      var eventTypeByte = p.readUInt8();
      if ((eventTypeByte & 240) === 240) {
        if (eventTypeByte === 255) {
          event2.meta = true;
          var metatypeByte = p.readUInt8();
          var length = p.readVarInt();
          switch (metatypeByte) {
            case 0:
              event2.type = "sequenceNumber";
              if (length !== 2) throw "Expected length for sequenceNumber event is 2, got " + length;
              event2.number = p.readUInt16();
              return event2;
            case 1:
              event2.type = "text";
              event2.text = p.readString(length);
              return event2;
            case 2:
              event2.type = "copyrightNotice";
              event2.text = p.readString(length);
              return event2;
            case 3:
              event2.type = "trackName";
              event2.text = p.readString(length);
              return event2;
            case 4:
              event2.type = "instrumentName";
              event2.text = p.readString(length);
              return event2;
            case 5:
              event2.type = "lyrics";
              event2.text = p.readString(length);
              return event2;
            case 6:
              event2.type = "marker";
              event2.text = p.readString(length);
              return event2;
            case 7:
              event2.type = "cuePoint";
              event2.text = p.readString(length);
              return event2;
            case 32:
              event2.type = "channelPrefix";
              if (length != 1) throw "Expected length for channelPrefix event is 1, got " + length;
              event2.channel = p.readUInt8();
              return event2;
            case 33:
              event2.type = "portPrefix";
              if (length != 1) throw "Expected length for portPrefix event is 1, got " + length;
              event2.port = p.readUInt8();
              return event2;
            case 47:
              event2.type = "endOfTrack";
              if (length != 0) throw "Expected length for endOfTrack event is 0, got " + length;
              return event2;
            case 81:
              event2.type = "setTempo";
              if (length != 3) throw "Expected length for setTempo event is 3, got " + length;
              event2.microsecondsPerBeat = p.readUInt24();
              return event2;
            case 84:
              event2.type = "smpteOffset";
              if (length != 5) throw "Expected length for smpteOffset event is 5, got " + length;
              var hourByte = p.readUInt8();
              var FRAME_RATES = { 0: 24, 32: 25, 64: 29, 96: 30 };
              event2.frameRate = FRAME_RATES[hourByte & 96];
              event2.hour = hourByte & 31;
              event2.min = p.readUInt8();
              event2.sec = p.readUInt8();
              event2.frame = p.readUInt8();
              event2.subFrame = p.readUInt8();
              return event2;
            case 88:
              event2.type = "timeSignature";
              if (length != 2 && length != 4) throw "Expected length for timeSignature event is 4 or 2, got " + length;
              event2.numerator = p.readUInt8();
              event2.denominator = 1 << p.readUInt8();
              if (length === 4) {
                event2.metronome = p.readUInt8();
                event2.thirtyseconds = p.readUInt8();
              } else {
                event2.metronome = 36;
                event2.thirtyseconds = 8;
              }
              return event2;
            case 89:
              event2.type = "keySignature";
              if (length != 2) throw "Expected length for keySignature event is 2, got " + length;
              event2.key = p.readInt8();
              event2.scale = p.readUInt8();
              return event2;
            case 127:
              event2.type = "sequencerSpecific";
              event2.data = p.readBytes(length);
              return event2;
            default:
              event2.type = "unknownMeta";
              event2.data = p.readBytes(length);
              event2.metatypeByte = metatypeByte;
              return event2;
          }
        } else if (eventTypeByte == 240) {
          event2.type = "sysEx";
          var length = p.readVarInt();
          event2.data = p.readBytes(length);
          return event2;
        } else if (eventTypeByte == 247) {
          event2.type = "endSysEx";
          var length = p.readVarInt();
          event2.data = p.readBytes(length);
          return event2;
        } else {
          throw "Unrecognised MIDI event type byte: " + eventTypeByte;
        }
      } else {
        var param1;
        if ((eventTypeByte & 128) === 0) {
          if (lastEventTypeByte === null)
            throw "Running status byte encountered before status byte";
          param1 = eventTypeByte;
          eventTypeByte = lastEventTypeByte;
          event2.running = true;
        } else {
          param1 = p.readUInt8();
          lastEventTypeByte = eventTypeByte;
        }
        var eventType = eventTypeByte >> 4;
        event2.channel = eventTypeByte & 15;
        switch (eventType) {
          case 8:
            event2.type = "noteOff";
            event2.noteNumber = param1;
            event2.velocity = p.readUInt8();
            return event2;
          case 9:
            var velocity = p.readUInt8();
            event2.type = velocity === 0 ? "noteOff" : "noteOn";
            event2.noteNumber = param1;
            event2.velocity = velocity;
            if (velocity === 0) event2.byte9 = true;
            return event2;
          case 10:
            event2.type = "noteAftertouch";
            event2.noteNumber = param1;
            event2.amount = p.readUInt8();
            return event2;
          case 11:
            event2.type = "controller";
            event2.controllerType = param1;
            event2.value = p.readUInt8();
            return event2;
          case 12:
            event2.type = "programChange";
            event2.programNumber = param1;
            return event2;
          case 13:
            event2.type = "channelAftertouch";
            event2.amount = param1;
            return event2;
          case 14:
            event2.type = "pitchBend";
            event2.value = param1 + (p.readUInt8() << 7) - 8192;
            return event2;
          default:
            throw "Unrecognised MIDI event type: " + eventType;
        }
      }
    }
  }
  function Parser(data) {
    this.buffer = data;
    this.bufferLen = this.buffer.length;
    this.pos = 0;
  }
  Parser.prototype.eof = function() {
    return this.pos >= this.bufferLen;
  };
  Parser.prototype.readUInt8 = function() {
    var result = this.buffer[this.pos];
    this.pos += 1;
    return result;
  };
  Parser.prototype.readInt8 = function() {
    var u = this.readUInt8();
    if (u & 128)
      return u - 256;
    else
      return u;
  };
  Parser.prototype.readUInt16 = function() {
    var b0 = this.readUInt8(), b1 = this.readUInt8();
    return (b0 << 8) + b1;
  };
  Parser.prototype.readInt16 = function() {
    var u = this.readUInt16();
    if (u & 32768)
      return u - 65536;
    else
      return u;
  };
  Parser.prototype.readUInt24 = function() {
    var b0 = this.readUInt8(), b1 = this.readUInt8(), b2 = this.readUInt8();
    return (b0 << 16) + (b1 << 8) + b2;
  };
  Parser.prototype.readInt24 = function() {
    var u = this.readUInt24();
    if (u & 8388608)
      return u - 16777216;
    else
      return u;
  };
  Parser.prototype.readUInt32 = function() {
    var b0 = this.readUInt8(), b1 = this.readUInt8(), b2 = this.readUInt8(), b3 = this.readUInt8();
    return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
  };
  Parser.prototype.readBytes = function(len) {
    var bytes = this.buffer.slice(this.pos, this.pos + len);
    this.pos += len;
    return bytes;
  };
  Parser.prototype.readString = function(len) {
    var bytes = this.readBytes(len);
    return String.fromCharCode.apply(null, bytes);
  };
  Parser.prototype.readVarInt = function() {
    var result = 0;
    while (!this.eof()) {
      var b = this.readUInt8();
      if (b & 128) {
        result += b & 127;
        result <<= 7;
      } else {
        return result + b;
      }
    }
    return result;
  };
  Parser.prototype.readChunk = function() {
    var id = this.readString(4);
    var length = this.readUInt32();
    var data = this.readBytes(length);
    return {
      id,
      length,
      data
    };
  };
  midiParser = parseMidi;
  return midiParser;
}
var midiWriter;
var hasRequiredMidiWriter;
function requireMidiWriter() {
  if (hasRequiredMidiWriter) return midiWriter;
  hasRequiredMidiWriter = 1;
  function writeMidi(data, opts) {
    if (typeof data !== "object")
      throw "Invalid MIDI data";
    opts = opts || {};
    var header = data.header || {};
    var tracks = data.tracks || [];
    var i2, len = tracks.length;
    var w = new Writer();
    writeHeader(w, header, len);
    for (i2 = 0; i2 < len; i2++) {
      writeTrack(w, tracks[i2], opts);
    }
    return w.buffer;
  }
  function writeHeader(w, header, numTracks) {
    var format2 = header.format == null ? 1 : header.format;
    var timeDivision = 128;
    if (header.timeDivision) {
      timeDivision = header.timeDivision;
    } else if (header.ticksPerFrame && header.framesPerSecond) {
      timeDivision = -(header.framesPerSecond & 255) << 8 | header.ticksPerFrame & 255;
    } else if (header.ticksPerBeat) {
      timeDivision = header.ticksPerBeat & 32767;
    }
    var h = new Writer();
    h.writeUInt16(format2);
    h.writeUInt16(numTracks);
    h.writeUInt16(timeDivision);
    w.writeChunk("MThd", h.buffer);
  }
  function writeTrack(w, track, opts) {
    var t = new Writer();
    var i2, len = track.length;
    var eventTypeByte = null;
    for (i2 = 0; i2 < len; i2++) {
      if (opts.running === false || !opts.running && !track[i2].running) eventTypeByte = null;
      eventTypeByte = writeEvent(t, track[i2], eventTypeByte, opts.useByte9ForNoteOff);
    }
    w.writeChunk("MTrk", t.buffer);
  }
  function writeEvent(w, event, lastEventTypeByte, useByte9ForNoteOff) {
    var type4 = event.type;
    var deltaTime = event.deltaTime;
    var text = event.text || "";
    var data = event.data || [];
    var eventTypeByte = null;
    w.writeVarInt(deltaTime);
    switch (type4) {
      // meta events
      case "sequenceNumber":
        w.writeUInt8(255);
        w.writeUInt8(0);
        w.writeVarInt(2);
        w.writeUInt16(event.number);
        break;
      case "text":
        w.writeUInt8(255);
        w.writeUInt8(1);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;
      case "copyrightNotice":
        w.writeUInt8(255);
        w.writeUInt8(2);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;
      case "trackName":
        w.writeUInt8(255);
        w.writeUInt8(3);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;
      case "instrumentName":
        w.writeUInt8(255);
        w.writeUInt8(4);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;
      case "lyrics":
        w.writeUInt8(255);
        w.writeUInt8(5);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;
      case "marker":
        w.writeUInt8(255);
        w.writeUInt8(6);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;
      case "cuePoint":
        w.writeUInt8(255);
        w.writeUInt8(7);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;
      case "channelPrefix":
        w.writeUInt8(255);
        w.writeUInt8(32);
        w.writeVarInt(1);
        w.writeUInt8(event.channel);
        break;
      case "portPrefix":
        w.writeUInt8(255);
        w.writeUInt8(33);
        w.writeVarInt(1);
        w.writeUInt8(event.port);
        break;
      case "endOfTrack":
        w.writeUInt8(255);
        w.writeUInt8(47);
        w.writeVarInt(0);
        break;
      case "setTempo":
        w.writeUInt8(255);
        w.writeUInt8(81);
        w.writeVarInt(3);
        w.writeUInt24(event.microsecondsPerBeat);
        break;
      case "smpteOffset":
        w.writeUInt8(255);
        w.writeUInt8(84);
        w.writeVarInt(5);
        var FRAME_RATES = { 24: 0, 25: 32, 29: 64, 30: 96 };
        var hourByte = event.hour & 31 | FRAME_RATES[event.frameRate];
        w.writeUInt8(hourByte);
        w.writeUInt8(event.min);
        w.writeUInt8(event.sec);
        w.writeUInt8(event.frame);
        w.writeUInt8(event.subFrame);
        break;
      case "timeSignature":
        w.writeUInt8(255);
        w.writeUInt8(88);
        w.writeVarInt(4);
        w.writeUInt8(event.numerator);
        var denominator = Math.floor(Math.log(event.denominator) / Math.LN2) & 255;
        w.writeUInt8(denominator);
        w.writeUInt8(event.metronome);
        w.writeUInt8(event.thirtyseconds || 8);
        break;
      case "keySignature":
        w.writeUInt8(255);
        w.writeUInt8(89);
        w.writeVarInt(2);
        w.writeInt8(event.key);
        w.writeUInt8(event.scale);
        break;
      case "sequencerSpecific":
        w.writeUInt8(255);
        w.writeUInt8(127);
        w.writeVarInt(data.length);
        w.writeBytes(data);
        break;
      case "unknownMeta":
        if (event.metatypeByte != null) {
          w.writeUInt8(255);
          w.writeUInt8(event.metatypeByte);
          w.writeVarInt(data.length);
          w.writeBytes(data);
        }
        break;
      // system-exclusive
      case "sysEx":
        w.writeUInt8(240);
        w.writeVarInt(data.length);
        w.writeBytes(data);
        break;
      case "endSysEx":
        w.writeUInt8(247);
        w.writeVarInt(data.length);
        w.writeBytes(data);
        break;
      // channel events
      case "noteOff":
        var noteByte = useByte9ForNoteOff !== false && event.byte9 || useByte9ForNoteOff && event.velocity == 0 ? 144 : 128;
        eventTypeByte = noteByte | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.noteNumber);
        w.writeUInt8(event.velocity);
        break;
      case "noteOn":
        eventTypeByte = 144 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.noteNumber);
        w.writeUInt8(event.velocity);
        break;
      case "noteAftertouch":
        eventTypeByte = 160 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.noteNumber);
        w.writeUInt8(event.amount);
        break;
      case "controller":
        eventTypeByte = 176 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.controllerType);
        w.writeUInt8(event.value);
        break;
      case "programChange":
        eventTypeByte = 192 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.programNumber);
        break;
      case "channelAftertouch":
        eventTypeByte = 208 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.amount);
        break;
      case "pitchBend":
        eventTypeByte = 224 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        var value14 = 8192 + event.value;
        var lsb14 = value14 & 127;
        var msb14 = value14 >> 7 & 127;
        w.writeUInt8(lsb14);
        w.writeUInt8(msb14);
        break;
      default:
        throw "Unrecognized event type: " + type4;
    }
    return eventTypeByte;
  }
  function Writer() {
    this.buffer = [];
  }
  Writer.prototype.writeUInt8 = function(v) {
    this.buffer.push(v & 255);
  };
  Writer.prototype.writeInt8 = Writer.prototype.writeUInt8;
  Writer.prototype.writeUInt16 = function(v) {
    var b0 = v >> 8 & 255, b1 = v & 255;
    this.writeUInt8(b0);
    this.writeUInt8(b1);
  };
  Writer.prototype.writeInt16 = Writer.prototype.writeUInt16;
  Writer.prototype.writeUInt24 = function(v) {
    var b0 = v >> 16 & 255, b1 = v >> 8 & 255, b2 = v & 255;
    this.writeUInt8(b0);
    this.writeUInt8(b1);
    this.writeUInt8(b2);
  };
  Writer.prototype.writeInt24 = Writer.prototype.writeUInt24;
  Writer.prototype.writeUInt32 = function(v) {
    var b0 = v >> 24 & 255, b1 = v >> 16 & 255, b2 = v >> 8 & 255, b3 = v & 255;
    this.writeUInt8(b0);
    this.writeUInt8(b1);
    this.writeUInt8(b2);
    this.writeUInt8(b3);
  };
  Writer.prototype.writeInt32 = Writer.prototype.writeUInt32;
  Writer.prototype.writeBytes = function(arr) {
    this.buffer = this.buffer.concat(Array.prototype.slice.call(arr, 0));
  };
  Writer.prototype.writeString = function(str) {
    var i2, len = str.length, arr = [];
    for (i2 = 0; i2 < len; i2++) {
      arr.push(str.codePointAt(i2));
    }
    this.writeBytes(arr);
  };
  Writer.prototype.writeVarInt = function(v) {
    if (v < 0) throw "Cannot write negative variable-length integer";
    if (v <= 127) {
      this.writeUInt8(v);
    } else {
      var i2 = v;
      var bytes = [];
      bytes.push(i2 & 127);
      i2 >>= 7;
      while (i2) {
        var b = i2 & 127 | 128;
        bytes.push(b);
        i2 >>= 7;
      }
      this.writeBytes(bytes.reverse());
    }
  };
  Writer.prototype.writeChunk = function(id, data) {
    this.writeString(id);
    this.writeUInt32(data.length);
    this.writeBytes(data);
  };
  midiWriter = writeMidi;
  return midiWriter;
}
var hasRequiredMidiFile;
function requireMidiFile() {
  if (hasRequiredMidiFile) return midiFile;
  hasRequiredMidiFile = 1;
  midiFile.parseMidi = requireMidiParser();
  midiFile.writeMidi = requireMidiWriter();
  return midiFile;
}
function flatten(array4) {
  var result = [];
  $flatten(array4, result);
  return result;
}
function $flatten(array4, result) {
  for (var i2 = 0; i2 < array4.length; i2++) {
    var value = array4[i2];
    if (Array.isArray(value)) {
      $flatten(value, result);
    } else {
      result.push(value);
    }
  }
}
const dist_es2015 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  flatten
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(dist_es2015);
export {
  CssRender as $,
  AST_NODE_PROPS_KEYS as A,
  translate as B,
  CORE_ERROR_CODES_EXTEND_POINT as C,
  DEFAULT_LOCALE as D,
  parseDateTimeArgs as E,
  datetime as F,
  parseNumberArgs as G,
  number as H,
  isMessageFunction as I,
  NUMBER_FORMAT_OPTIONS_KEYS as J,
  DATETIME_FORMAT_OPTIONS_KEYS as K,
  registerMessageCompiler as L,
  MISSING_RESOLVE_VALUE as M,
  NOT_REOSLVED as N,
  registerMessageResolver as O,
  registerLocaleFallbacker as P,
  getGlobalThis as Q,
  setDevToolsHook as R,
  compile as S,
  resolveValue as T,
  on as U,
  off as V,
  requireSideChannel as W,
  getDefaultExportFromCjs as X,
  VConsole as Y,
  __vitePreload as Z,
  _export_sfc as _,
  isPlainObject as a,
  plugin as a0,
  beforeNextFrameOnce as a1,
  ResizeObserver as a2,
  depx as a3,
  pxfy as a4,
  createId as a5,
  getPreciseEventTarget as a6,
  getMargin as a7,
  murmur2 as a8,
  exists as a9,
  __decorate as aA,
  require$$2 as aB,
  requireMidiFile as aC,
  scaleColor as aa,
  composite as ab,
  rgba as ac,
  happensIn as ad,
  createIndexGetter as ae,
  changeColor as af,
  createTreeMate as ag,
  repeat as ah,
  getGap as ai,
  Schema as aj,
  parseResponsivePropValue as ak,
  load as al,
  typedFunction as am,
  Complex as an,
  Fraction as ao,
  _extends as ap,
  Emitter as aq,
  AutomationEventList as ar,
  createSetValueCurveAutomationEvent as as,
  createSetValueAutomationEvent as at,
  createSetTargetAutomationEvent as au,
  createLinearRampToValueAutomationEvent as av,
  createExponentialRampToValueAutomationEvent as aw,
  createCancelScheduledValuesAutomationEvent as ax,
  createCancelAndHoldAutomationEvent as ay,
  __awaiter as az,
  assign$1 as b,
  isString as c,
  isArray as d,
  isRegExp as e,
  isFunction as f,
  inBrowser as g,
  createCompileError as h,
  isBoolean as i,
  isEmptyObject as j,
  isObject as k,
  create$1 as l,
  makeSymbol as m,
  deepCopy as n,
  hasOwn as o,
  createCoreContext as p,
  clearDateTimeFormat as q,
  clearNumberFormat as r,
  isNumber as s,
  isMessageAST as t,
  updateFallbackLocale as u,
  setAdditionalMeta as v,
  getFallbackContext as w,
  fallbackWithLocaleChain as x,
  setFallbackContext as y,
  parseTranslateArgs as z
};
