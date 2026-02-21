import {
  __commonJS,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  __publicField,
  __require,
  __toESM
} from "./chunk-ZSMWDLMK.js";

// browser-external:path
var require_path = __commonJS({
  "browser-external:path"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "path" has been externalized for browser compatibility. Cannot access "path.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:url
var require_node_url = __commonJS({
  "browser-external:node:url"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:url" has been externalized for browser compatibility. Cannot access "node:url.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:path
var require_node_path = __commonJS({
  "browser-external:node:path"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:path" has been externalized for browser compatibility. Cannot access "node:path.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:fs
var require_fs = __commonJS({
  "browser-external:fs"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "fs" has been externalized for browser compatibility. Cannot access "fs.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:fs
var require_node_fs = __commonJS({
  "browser-external:node:fs"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:fs" has been externalized for browser compatibility. Cannot access "node:fs.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:fs/promises
var require_promises = __commonJS({
  "browser-external:node:fs/promises"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:fs/promises" has been externalized for browser compatibility. Cannot access "node:fs/promises.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:events
var require_node_events = __commonJS({
  "browser-external:node:events"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:events" has been externalized for browser compatibility. Cannot access "node:events.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:stream
var require_node_stream = __commonJS({
  "browser-external:node:stream"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:stream" has been externalized for browser compatibility. Cannot access "node:stream.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:string_decoder
var require_node_string_decoder = __commonJS({
  "browser-external:node:string_decoder"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:string_decoder" has been externalized for browser compatibility. Cannot access "node:string_decoder.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0) return "undefined";
      if (val === null) return "null";
      var type = typeof val;
      if (type === "boolean") return "boolean";
      if (type === "string") return "string";
      if (type === "number") return "number";
      if (type === "symbol") return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val)) return "array";
      if (isBuffer(val)) return "buffer";
      if (isArguments(val)) return "arguments";
      if (isDate(val)) return "date";
      if (isError(val)) return "error";
      if (isRegexp(val)) return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray) return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date) return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp) return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isObject2 = require_is_extendable();
    module2.exports = function extend(o2) {
      if (!isObject2(o2)) {
        o2 = {};
      }
      var len2 = arguments.length;
      for (var i = 1; i < len2; i++) {
        var obj = arguments[i];
        if (isObject2(obj)) {
          assign(o2, obj);
        }
      }
      return o2;
    };
    function assign(a, b) {
      for (var key in b) {
        if (hasOwn(b, key)) {
          a[key] = b[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "node_modules/section-matter/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var extend = require_extend_shallow();
    module2.exports = function(input, options2) {
      if (typeof options2 === "function") {
        options2 = { parse: options2 };
      }
      var file = toObject(input);
      var defaults2 = { section_delimiter: "---", parse: identity };
      var opts = extend({}, defaults2, options2);
      var delim = opts.section_delimiter;
      var lines = file.content.split(/\r?\n/);
      var sections = null;
      var section = createSection();
      var content = [];
      var stack = [];
      function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
      }
      function closeSection(val) {
        if (stack.length) {
          section.key = getKey(stack[0], delim);
          section.content = val;
          opts.parse(section, sections);
          sections.push(section);
          section = createSection();
          content = [];
          stack = [];
        }
      }
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var len2 = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
          if (ln.length === 3 && i !== 0) {
            if (len2 === 0 || len2 === 2) {
              content.push(line);
              continue;
            }
            stack.push(ln);
            section.data = content.join("\n");
            content = [];
            continue;
          }
          if (sections === null) {
            initSections(content.join("\n"));
          }
          if (len2 === 2) {
            closeSection(content.join("\n"));
          }
          stack.push(ln);
          continue;
        }
        content.push(line);
      }
      if (sections === null) {
        initSections(content.join("\n"));
      } else {
        closeSection(content.join("\n"));
      }
      file.sections = sections;
      return file;
    };
    function isDelimiter(line, delim) {
      if (line.slice(0, delim.length) !== delim) {
        return false;
      }
      if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
      }
      return true;
    }
    function toObject(input) {
      if (typeOf(input) !== "object") {
        input = { content: input };
      }
      if (typeof input.content !== "string" && !isBuffer(input.content)) {
        throw new TypeError("expected a buffer or string");
      }
      input.content = input.content.toString();
      input.sections = [];
      return input;
    }
    function getKey(val, delim) {
      return val ? val.slice(delim.length).trim() : "";
    }
    function createSection() {
      return { key: "", data: "", content: "" };
    }
    function identity(val) {
      return val;
    }
    function isBuffer(val) {
      if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject2(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject2;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer) return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types2;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types2 = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types2 = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types2 = common.toArray(types2);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types2.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types2
      });
    };
    module2.exports = Schema;
  }
});

// node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null) return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null) return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null) return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max) return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (ch !== "0" && ch !== "1") return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_") return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch === ":") break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_") return false;
      if (ch !== ":") return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0") return 0;
      if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match2, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match2 = YAML_DATE_REGEXP.exec(data);
      if (match2 === null) match2 = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match2 === null) throw new Error("Date resolve error");
      year = +match2[1];
      month = +match2[2] - 1;
      day = +match2[3];
      if (!match2[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match2[4];
      minute = +match2[5];
      second = +match2[6];
      if (match2[7]) {
        fraction = match2[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match2[9]) {
        tz_hour = +match2[10];
        tz_minute = +(match2[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match2[9] === "-") delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta) date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    "use strict";
    var NodeBuffer;
    try {
      _require = __require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__2) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null) return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64) continue;
        if (code < 0) return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString2 = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null) return true;
      var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString2.call(pair) !== "[object Object]") return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _toString2 = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null) return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString2.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null) return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null) return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null) return false;
      if (data.length === 0) return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        if (modifiers.length > 3) return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/") return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global) result += "g";
      if (object.multiline) result += "m";
      if (object.ignoreCase) result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    "use strict";
    var esprima;
    try {
      _require = __require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined") esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null) return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "" : c === 95 ? " " : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    function setProperty(object, key, value) {
      if (key === "__proto__") {
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value
        });
      } else {
        object[key] = value;
      }
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    var i;
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match2, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match2 = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match2 === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match2[1], 10);
        minor = parseInt(match2[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
          setProperty(destination, key, source[key]);
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33) return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38) return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42) return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch)) break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString2 = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type;
      if (map === null) return {};
      result = {};
      keys = Object.keys(map);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str2) {
      var index, length, type;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str2)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      }();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match2;
      while (match2 = lineRe.exec(string)) {
        var prefix = match2[1], line = match2[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ") return line;
      var breakRe = / [^ ]/g;
      var match2;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match2 = breakRe.exec(line)) {
        next = match2.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0) _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (index !== 0) pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString2.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString2.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid) return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs) getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true)) return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "node_modules/gray-matter/lib/engines.js"(exports, module) {
    "use strict";
    var yaml = require_js_yaml2();
    var engines = exports = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  }
});

// node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "node_modules/strip-bom-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str2) {
      if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
        return str2.slice(1);
      }
      return str2;
    };
  }
});

// node_modules/gray-matter/lib/utils.js
var require_utils = __commonJS({
  "node_modules/gray-matter/lib/utils.js"(exports2) {
    "use strict";
    var stripBom = require_strip_bom_string();
    var typeOf = require_kind_of();
    exports2.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports2.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports2.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports2.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports2.toString = function(input) {
      if (exports2.isBuffer(input)) return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports2.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.startsWith = function(str2, substr, len2) {
      if (typeof len2 !== "number") len2 = substr.length;
      return str2.slice(0, len2) === substr;
    };
  }
});

// node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
    "use strict";
    var engines2 = require_engines();
    var utils = require_utils();
    module2.exports = function(options2) {
      const opts = Object.assign({}, options2);
      opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
      if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
      }
      opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
      opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
      return opts;
    };
  }
});

// node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "node_modules/gray-matter/lib/engine.js"(exports2, module2) {
    "use strict";
    module2.exports = function(name, options2) {
      let engine = options2.engines[name] || options2.engines[aliase(name)];
      if (typeof engine === "undefined") {
        throw new Error('gray-matter engine "' + name + '" is not registered');
      }
      if (typeof engine === "function") {
        engine = { parse: engine };
      }
      return engine;
    };
    function aliase(name) {
      switch (name.toLowerCase()) {
        case "js":
        case "javascript":
          return "javascript";
        case "coffee":
        case "coffeescript":
        case "cson":
          return "coffee";
        case "yaml":
        case "yml":
          return "yaml";
        default: {
          return name;
        }
      }
    }
  }
});

// node_modules/gray-matter/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var getEngine = require_engine();
    var defaults2 = require_defaults();
    module2.exports = function(file, data, options2) {
      if (data == null && options2 == null) {
        switch (typeOf(file)) {
          case "object":
            data = file.data;
            options2 = {};
            break;
          case "string":
            return file;
          default: {
            throw new TypeError("expected file to be a string or object");
          }
        }
      }
      const str2 = file.content;
      const opts = defaults2(options2);
      if (data == null) {
        if (!opts.data) return file;
        data = opts.data;
      }
      const language = file.language || opts.language;
      const engine = getEngine(language, opts);
      if (typeof engine.stringify !== "function") {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
      }
      data = Object.assign({}, file.data, data);
      const open = opts.delimiters[0];
      const close = opts.delimiters[1];
      const matter = engine.stringify(data, options2).trim();
      let buf = "";
      if (matter !== "{}") {
        buf = newline(open) + newline(matter) + newline(close);
      }
      if (typeof file.excerpt === "string" && file.excerpt !== "") {
        if (str2.indexOf(file.excerpt.trim()) === -1) {
          buf += newline(file.excerpt) + newline(close);
        }
      }
      return buf + newline(str2);
    };
    function newline(str2) {
      return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
    }
  }
});

// node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
    "use strict";
    var defaults2 = require_defaults();
    module2.exports = function(file, options2) {
      const opts = defaults2(options2);
      if (file.data == null) {
        file.data = {};
      }
      if (typeof opts.excerpt === "function") {
        return opts.excerpt(file, opts);
      }
      const sep2 = file.data.excerpt_separator || opts.excerpt_separator;
      if (sep2 == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
      }
      const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep2 || opts.delimiters[0];
      const idx = file.content.indexOf(delimiter);
      if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
      }
      return file;
    };
  }
});

// node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var stringify = require_stringify();
    var utils = require_utils();
    module2.exports = function(file) {
      if (typeOf(file) !== "object") {
        file = { content: file };
      }
      if (typeOf(file.data) !== "object") {
        file.data = {};
      }
      if (file.contents && file.content == null) {
        file.content = file.contents;
      }
      utils.define(file, "orig", utils.toBuffer(file.content));
      utils.define(file, "language", file.language || "");
      utils.define(file, "matter", file.matter || "");
      utils.define(file, "stringify", function(data, options2) {
        if (options2 && options2.language) {
          file.language = options2.language;
        }
        return stringify(file, data, options2);
      });
      file.content = utils.toString(file.content);
      file.isEmpty = false;
      file.excerpt = "";
      return file;
    };
  }
});

// node_modules/gray-matter/lib/parse.js
var require_parse = __commonJS({
  "node_modules/gray-matter/lib/parse.js"(exports2, module2) {
    "use strict";
    var getEngine = require_engine();
    var defaults2 = require_defaults();
    module2.exports = function(language, str2, options2) {
      const opts = defaults2(options2);
      const engine = getEngine(language, opts);
      if (typeof engine.parse !== "function") {
        throw new TypeError('expected "' + language + '.parse" to be a function');
      }
      return engine.parse(str2, opts);
    };
  }
});

// node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "node_modules/gray-matter/index.js"(exports2, module2) {
    "use strict";
    var fs = require_fs();
    var sections = require_section_matter();
    var defaults2 = require_defaults();
    var stringify = require_stringify();
    var excerpt = require_excerpt();
    var engines2 = require_engines();
    var toFile = require_to_file();
    var parse2 = require_parse();
    var utils = require_utils();
    function matter(input, options2) {
      if (input === "") {
        return { data: {}, content: input, excerpt: "", orig: input };
      }
      let file = toFile(input);
      const cached = matter.cache[file.content];
      if (!options2) {
        if (cached) {
          file = Object.assign({}, cached);
          file.orig = cached.orig;
          return file;
        }
        matter.cache[file.content] = file;
      }
      return parseMatter(file, options2);
    }
    function parseMatter(file, options2) {
      const opts = defaults2(options2);
      const open = opts.delimiters[0];
      const close = "\n" + opts.delimiters[1];
      let str2 = file.content;
      if (opts.language) {
        file.language = opts.language;
      }
      const openLen = open.length;
      if (!utils.startsWith(str2, open, openLen)) {
        excerpt(file, opts);
        return file;
      }
      if (str2.charAt(openLen) === open.slice(-1)) {
        return file;
      }
      str2 = str2.slice(openLen);
      const len2 = str2.length;
      const language = matter.language(str2, opts);
      if (language.name) {
        file.language = language.name;
        str2 = str2.slice(language.raw.length);
      }
      let closeIndex = str2.indexOf(close);
      if (closeIndex === -1) {
        closeIndex = len2;
      }
      file.matter = str2.slice(0, closeIndex);
      const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
      if (block === "") {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
      } else {
        file.data = parse2(file.language, file.matter, opts);
      }
      if (closeIndex === len2) {
        file.content = "";
      } else {
        file.content = str2.slice(closeIndex + close.length);
        if (file.content[0] === "\r") {
          file.content = file.content.slice(1);
        }
        if (file.content[0] === "\n") {
          file.content = file.content.slice(1);
        }
      }
      excerpt(file, opts);
      if (opts.sections === true || typeof opts.section === "function") {
        sections(file, opts.section);
      }
      return file;
    }
    matter.engines = engines2;
    matter.stringify = function(file, data, options2) {
      if (typeof file === "string") file = matter(file, options2);
      return stringify(file, data, options2);
    };
    matter.read = function(filepath, options2) {
      const str2 = fs.readFileSync(filepath, "utf8");
      const file = matter(str2, options2);
      file.path = filepath;
      return file;
    };
    matter.test = function(str2, options2) {
      return utils.startsWith(str2, defaults2(options2).delimiters[0]);
    };
    matter.language = function(str2, options2) {
      const opts = defaults2(options2);
      const open = opts.delimiters[0];
      if (matter.test(str2)) {
        str2 = str2.slice(open.length);
      }
      const language = str2.slice(0, str2.search(/\r?\n/));
      return {
        raw: language,
        name: language ? language.trim() : ""
      };
    };
    matter.cache = {};
    matter.clearCache = function() {
      matter.cache = {};
    };
    module2.exports = matter;
  }
});

// node_modules/vitepress-sidebar/dist/sidebar.js
var import_path = __toESM(require_path(), 1);

// node_modules/balanced-match/dist/esm/index.js
var balanced = (a, b, str2) => {
  const ma = a instanceof RegExp ? maybeMatch(a, str2) : a;
  const mb = b instanceof RegExp ? maybeMatch(b, str2) : b;
  const r2 = ma !== null && mb != null && range(ma, mb, str2);
  return r2 && {
    start: r2[0],
    end: r2[1],
    pre: str2.slice(0, r2[0]),
    body: str2.slice(r2[0] + ma.length, r2[1]),
    post: str2.slice(r2[1] + mb.length)
  };
};
var maybeMatch = (reg, str2) => {
  const m = str2.match(reg);
  return m ? m[0] : null;
};
var range = (a, b, str2) => {
  let begs, beg, left, right = void 0, result;
  let ai = str2.indexOf(a);
  let bi = str2.indexOf(b, ai + 1);
  let i = ai;
  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str2.length;
    while (i >= 0 && !result) {
      if (i === ai) {
        begs.push(i);
        ai = str2.indexOf(a, i + 1);
      } else if (begs.length === 1) {
        const r2 = begs.pop();
        if (r2 !== void 0)
          result = [r2, bi];
      } else {
        beg = begs.pop();
        if (beg !== void 0 && beg < left) {
          left = beg;
          right = bi;
        }
        bi = str2.indexOf(b, i + 1);
      }
      i = ai < bi && ai >= 0 ? ai : bi;
    }
    if (begs.length && right !== void 0) {
      result = [left, right];
    }
  }
  return result;
};

// node_modules/brace-expansion/dist/esm/index.js
var escSlash = "\0SLASH" + Math.random() + "\0";
var escOpen = "\0OPEN" + Math.random() + "\0";
var escClose = "\0CLOSE" + Math.random() + "\0";
var escComma = "\0COMMA" + Math.random() + "\0";
var escPeriod = "\0PERIOD" + Math.random() + "\0";
var escSlashPattern = new RegExp(escSlash, "g");
var escOpenPattern = new RegExp(escOpen, "g");
var escClosePattern = new RegExp(escClose, "g");
var escCommaPattern = new RegExp(escComma, "g");
var escPeriodPattern = new RegExp(escPeriod, "g");
var slashPattern = /\\\\/g;
var openPattern = /\\{/g;
var closePattern = /\\}/g;
var commaPattern = /\\,/g;
var periodPattern = /\\./g;
var EXPANSION_MAX = 1e5;
function numeric(str2) {
  return !isNaN(str2) ? parseInt(str2, 10) : str2.charCodeAt(0);
}
function escapeBraces(str2) {
  return str2.replace(slashPattern, escSlash).replace(openPattern, escOpen).replace(closePattern, escClose).replace(commaPattern, escComma).replace(periodPattern, escPeriod);
}
function unescapeBraces(str2) {
  return str2.replace(escSlashPattern, "\\").replace(escOpenPattern, "{").replace(escClosePattern, "}").replace(escCommaPattern, ",").replace(escPeriodPattern, ".");
}
function parseCommaParts(str2) {
  if (!str2) {
    return [""];
  }
  const parts = [];
  const m = balanced("{", "}", str2);
  if (!m) {
    return str2.split(",");
  }
  const { pre, body, post } = m;
  const p = pre.split(",");
  p[p.length - 1] += "{" + body + "}";
  const postParts = parseCommaParts(post);
  if (post.length) {
    ;
    p[p.length - 1] += postParts.shift();
    p.push.apply(p, postParts);
  }
  parts.push.apply(parts, p);
  return parts;
}
function expand(str2, options2 = {}) {
  if (!str2) {
    return [];
  }
  const { max = EXPANSION_MAX } = options2;
  if (str2.slice(0, 2) === "{}") {
    str2 = "\\{\\}" + str2.slice(2);
  }
  return expand_(escapeBraces(str2), max, true).map(unescapeBraces);
}
function embrace(str2) {
  return "{" + str2 + "}";
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}
function lte(i, y2) {
  return i <= y2;
}
function gte(i, y2) {
  return i >= y2;
}
function expand_(str2, max, isTop) {
  const expansions = [];
  const m = balanced("{", "}", str2);
  if (!m)
    return [str2];
  const pre = m.pre;
  const post = m.post.length ? expand_(m.post, max, false) : [""];
  if (/\$$/.test(m.pre)) {
    for (let k = 0; k < post.length && k < max; k++) {
      const expansion = pre + "{" + m.body + "}" + post[k];
      expansions.push(expansion);
    }
  } else {
    const isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    const isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    const isSequence = isNumericSequence || isAlphaSequence;
    const isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,(?!,).*\}/)) {
        str2 = m.pre + "{" + m.body + escClose + m.post;
        return expand_(str2, max, true);
      }
      return [str2];
    }
    let n2;
    if (isSequence) {
      n2 = m.body.split(/\.\./);
    } else {
      n2 = parseCommaParts(m.body);
      if (n2.length === 1 && n2[0] !== void 0) {
        n2 = expand_(n2[0], max, false).map(embrace);
        if (n2.length === 1) {
          return post.map((p) => m.pre + n2[0] + p);
        }
      }
    }
    let N;
    if (isSequence && n2[0] !== void 0 && n2[1] !== void 0) {
      const x3 = numeric(n2[0]);
      const y2 = numeric(n2[1]);
      const width = Math.max(n2[0].length, n2[1].length);
      let incr = n2.length === 3 && n2[2] !== void 0 ? Math.abs(numeric(n2[2])) : 1;
      let test = lte;
      const reverse = y2 < x3;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      const pad = n2.some(isPadded);
      N = [];
      for (let i = x3; test(i, y2); i += incr) {
        let c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === "\\") {
            c = "";
          }
        } else {
          c = String(i);
          if (pad) {
            const need = width - c.length;
            if (need > 0) {
              const z2 = new Array(need + 1).join("0");
              if (i < 0) {
                c = "-" + z2 + c.slice(1);
              } else {
                c = z2 + c;
              }
            }
          }
        }
        N.push(c);
      }
    } else {
      N = [];
      for (let j = 0; j < n2.length; j++) {
        N.push.apply(N, expand_(n2[j], max, false));
      }
    }
    for (let j = 0; j < N.length; j++) {
      for (let k = 0; k < post.length && expansions.length < max; k++) {
        const expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) {
          expansions.push(expansion);
        }
      }
    }
  }
  return expansions;
}

// node_modules/minimatch/dist/esm/assert-valid-pattern.js
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = (pattern) => {
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};

// node_modules/minimatch/dist/esm/brace-expressions.js
var posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
var braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
var regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var rangesToString = (ranges) => ranges.join("");
var parseClass = (glob2, position) => {
  const pos = position;
  if (glob2.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE: while (i < glob2.length) {
    const c = glob2.charAt(i);
    if ((c === "!" || c === "^") && i === pos + 1) {
      negate = true;
      i++;
      continue;
    }
    if (c === "]" && sawStart && !escaping) {
      endPos = i + 1;
      break;
    }
    sawStart = true;
    if (c === "\\") {
      if (!escaping) {
        escaping = true;
        i++;
        continue;
      }
    }
    if (c === "[" && !escaping) {
      for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
        if (glob2.startsWith(cls, i)) {
          if (rangeStart) {
            return ["$.", false, glob2.length - pos, true];
          }
          i += cls.length;
          if (neg)
            negs.push(unip);
          else
            ranges.push(unip);
          uflag = uflag || u;
          continue WHILE;
        }
      }
    }
    escaping = false;
    if (rangeStart) {
      if (c > rangeStart) {
        ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
      } else if (c === rangeStart) {
        ranges.push(braceEscape(c));
      }
      rangeStart = "";
      i++;
      continue;
    }
    if (glob2.startsWith("-]", i + 1)) {
      ranges.push(braceEscape(c + "-"));
      i += 2;
      continue;
    }
    if (glob2.startsWith("-", i + 1)) {
      rangeStart = c;
      i += 2;
      continue;
    }
    ranges.push(braceEscape(c));
    i++;
  }
  if (endPos < i) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob2.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r2 = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r2), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};

// node_modules/minimatch/dist/esm/unescape.js
var unescape = (s, { windowsPathsNoEscape = false, magicalBraces = true } = {}) => {
  if (magicalBraces) {
    return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
  }
  return windowsPathsNoEscape ? s.replace(/\[([^\/\\{}])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\{}])\]/g, "$1$2").replace(/\\([^\/{}])/g, "$1");
};

// node_modules/minimatch/dist/esm/ast.js
var types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var isExtglobType = (c) => types.has(c);
var startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
var startNoDot = "(?!\\.)";
var addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
var justDots = /* @__PURE__ */ new Set(["..", "."]);
var reSpecials = new Set("().*{}+?[]^$\\!");
var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var qmark = "[^/]";
var star = qmark + "*?";
var starNoEmpty = qmark + "+?";
var _root, _hasMagic, _uflag, _parts, _parent, _parentIndex, _negs, _filledNegs, _options, _toString, _emptyExt, _AST_instances, fillNegs_fn, _AST_static, parseAST_fn, partsToRegExp_fn, parseGlob_fn;
var _AST = class _AST {
  constructor(type, parent, options2 = {}) {
    __privateAdd(this, _AST_instances);
    __publicField(this, "type");
    __privateAdd(this, _root);
    __privateAdd(this, _hasMagic);
    __privateAdd(this, _uflag, false);
    __privateAdd(this, _parts, []);
    __privateAdd(this, _parent);
    __privateAdd(this, _parentIndex);
    __privateAdd(this, _negs);
    __privateAdd(this, _filledNegs, false);
    __privateAdd(this, _options);
    __privateAdd(this, _toString);
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    __privateAdd(this, _emptyExt, false);
    this.type = type;
    if (type)
      __privateSet(this, _hasMagic, true);
    __privateSet(this, _parent, parent);
    __privateSet(this, _root, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _root) : this);
    __privateSet(this, _options, __privateGet(this, _root) === this ? options2 : __privateGet(__privateGet(this, _root), _options));
    __privateSet(this, _negs, __privateGet(this, _root) === this ? [] : __privateGet(__privateGet(this, _root), _negs));
    if (type === "!" && !__privateGet(__privateGet(this, _root), _filledNegs))
      __privateGet(this, _negs).push(this);
    __privateSet(this, _parentIndex, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0);
  }
  get hasMagic() {
    if (__privateGet(this, _hasMagic) !== void 0)
      return __privateGet(this, _hasMagic);
    for (const p of __privateGet(this, _parts)) {
      if (typeof p === "string")
        continue;
      if (p.type || p.hasMagic)
        return __privateSet(this, _hasMagic, true);
    }
    return __privateGet(this, _hasMagic);
  }
  // reconstructs the pattern
  toString() {
    if (__privateGet(this, _toString) !== void 0)
      return __privateGet(this, _toString);
    if (!this.type) {
      return __privateSet(this, _toString, __privateGet(this, _parts).map((p) => String(p)).join(""));
    } else {
      return __privateSet(this, _toString, this.type + "(" + __privateGet(this, _parts).map((p) => String(p)).join("|") + ")");
    }
  }
  push(...parts) {
    for (const p of parts) {
      if (p === "")
        continue;
      if (typeof p !== "string" && !(p instanceof _AST && __privateGet(p, _parent) === this)) {
        throw new Error("invalid part: " + p);
      }
      __privateGet(this, _parts).push(p);
    }
  }
  toJSON() {
    var _a6;
    const ret = this.type === null ? __privateGet(this, _parts).slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...__privateGet(this, _parts).map((p) => p.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === __privateGet(this, _root) || __privateGet(__privateGet(this, _root), _filledNegs) && ((_a6 = __privateGet(this, _parent)) == null ? void 0 : _a6.type) === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    var _a6;
    if (__privateGet(this, _root) === this)
      return true;
    if (!((_a6 = __privateGet(this, _parent)) == null ? void 0 : _a6.isStart()))
      return false;
    if (__privateGet(this, _parentIndex) === 0)
      return true;
    const p = __privateGet(this, _parent);
    for (let i = 0; i < __privateGet(this, _parentIndex); i++) {
      const pp = __privateGet(p, _parts)[i];
      if (!(pp instanceof _AST && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    var _a6, _b4, _c4;
    if (__privateGet(this, _root) === this)
      return true;
    if (((_a6 = __privateGet(this, _parent)) == null ? void 0 : _a6.type) === "!")
      return true;
    if (!((_b4 = __privateGet(this, _parent)) == null ? void 0 : _b4.isEnd()))
      return false;
    if (!this.type)
      return (_c4 = __privateGet(this, _parent)) == null ? void 0 : _c4.isEnd();
    const pl = __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0;
    return __privateGet(this, _parentIndex) === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent) {
    const c = new _AST(this.type, parent);
    for (const p of __privateGet(this, _parts)) {
      c.copyIn(p);
    }
    return c;
  }
  static fromGlob(pattern, options2 = {}) {
    var _a6;
    const ast = new _AST(null, void 0, options2);
    __privateMethod(_a6 = _AST, _AST_static, parseAST_fn).call(_a6, pattern, ast, 0, options2);
    return ast;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== __privateGet(this, _root))
      return __privateGet(this, _root).toMMPattern();
    const glob2 = this.toString();
    const [re, body, hasMagic2, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic2 || __privateGet(this, _hasMagic) || __privateGet(this, _options).nocase && !__privateGet(this, _options).nocaseMagicOnly && glob2.toUpperCase() !== glob2.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (__privateGet(this, _options).nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re}$`, flags), {
      _src: re,
      _glob: glob2
    });
  }
  get options() {
    return __privateGet(this, _options);
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    var _a6;
    const dot = allowDot ?? !!__privateGet(this, _options).dot;
    if (__privateGet(this, _root) === this)
      __privateMethod(this, _AST_instances, fillNegs_fn).call(this);
    if (!this.type) {
      const noEmpty = this.isStart() && this.isEnd() && !__privateGet(this, _parts).some((s) => typeof s !== "string");
      const src = __privateGet(this, _parts).map((p) => {
        var _a7;
        const [re, _, hasMagic2, uflag] = typeof p === "string" ? __privateMethod(_a7 = _AST, _AST_static, parseGlob_fn).call(_a7, p, __privateGet(this, _hasMagic), noEmpty) : p.toRegExpSource(allowDot);
        __privateSet(this, _hasMagic, __privateGet(this, _hasMagic) || hasMagic2);
        __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
        return re;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof __privateGet(this, _parts)[0] === "string") {
          const dotTravAllowed = __privateGet(this, _parts).length === 1 && justDots.has(__privateGet(this, _parts)[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && __privateGet(__privateGet(this, _root), _filledNegs) && ((_a6 = __privateGet(this, _parent)) == null ? void 0 : _a6.type) === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        unescape(src),
        __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
        __privateGet(this, _uflag)
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      __privateSet(this, _parts, [s]);
      this.type = null;
      __privateSet(this, _hasMagic, void 0);
      return [s, unescape(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && __privateGet(this, _emptyExt)) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      unescape(body),
      __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
      __privateGet(this, _uflag)
    ];
  }
};
_root = new WeakMap();
_hasMagic = new WeakMap();
_uflag = new WeakMap();
_parts = new WeakMap();
_parent = new WeakMap();
_parentIndex = new WeakMap();
_negs = new WeakMap();
_filledNegs = new WeakMap();
_options = new WeakMap();
_toString = new WeakMap();
_emptyExt = new WeakMap();
_AST_instances = new WeakSet();
fillNegs_fn = function() {
  if (this !== __privateGet(this, _root))
    throw new Error("should only call on root");
  if (__privateGet(this, _filledNegs))
    return this;
  this.toString();
  __privateSet(this, _filledNegs, true);
  let n2;
  while (n2 = __privateGet(this, _negs).pop()) {
    if (n2.type !== "!")
      continue;
    let p = n2;
    let pp = __privateGet(p, _parent);
    while (pp) {
      for (let i = __privateGet(p, _parentIndex) + 1; !pp.type && i < __privateGet(pp, _parts).length; i++) {
        for (const part of __privateGet(n2, _parts)) {
          if (typeof part === "string") {
            throw new Error("string part in extglob AST??");
          }
          part.copyIn(__privateGet(pp, _parts)[i]);
        }
      }
      p = pp;
      pp = __privateGet(p, _parent);
    }
  }
  return this;
};
_AST_static = new WeakSet();
parseAST_fn = function(str2, ast, pos, opt) {
  var _a6, _b4;
  let escaping = false;
  let inBrace = false;
  let braceStart = -1;
  let braceNeg = false;
  if (ast.type === null) {
    let i2 = pos;
    let acc2 = "";
    while (i2 < str2.length) {
      const c = str2.charAt(i2++);
      if (escaping || c === "\\") {
        escaping = !escaping;
        acc2 += c;
        continue;
      }
      if (inBrace) {
        if (i2 === braceStart + 1) {
          if (c === "^" || c === "!") {
            braceNeg = true;
          }
        } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc2 += c;
        continue;
      } else if (c === "[") {
        inBrace = true;
        braceStart = i2;
        braceNeg = false;
        acc2 += c;
        continue;
      }
      if (!opt.noext && isExtglobType(c) && str2.charAt(i2) === "(") {
        ast.push(acc2);
        acc2 = "";
        const ext2 = new _AST(c, ast);
        i2 = __privateMethod(_a6 = _AST, _AST_static, parseAST_fn).call(_a6, str2, ext2, i2, opt);
        ast.push(ext2);
        continue;
      }
      acc2 += c;
    }
    ast.push(acc2);
    return i2;
  }
  let i = pos + 1;
  let part = new _AST(null, ast);
  const parts = [];
  let acc = "";
  while (i < str2.length) {
    const c = str2.charAt(i++);
    if (escaping || c === "\\") {
      escaping = !escaping;
      acc += c;
      continue;
    }
    if (inBrace) {
      if (i === braceStart + 1) {
        if (c === "^" || c === "!") {
          braceNeg = true;
        }
      } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
        inBrace = false;
      }
      acc += c;
      continue;
    } else if (c === "[") {
      inBrace = true;
      braceStart = i;
      braceNeg = false;
      acc += c;
      continue;
    }
    if (isExtglobType(c) && str2.charAt(i) === "(") {
      part.push(acc);
      acc = "";
      const ext2 = new _AST(c, part);
      part.push(ext2);
      i = __privateMethod(_b4 = _AST, _AST_static, parseAST_fn).call(_b4, str2, ext2, i, opt);
      continue;
    }
    if (c === "|") {
      part.push(acc);
      acc = "";
      parts.push(part);
      part = new _AST(null, ast);
      continue;
    }
    if (c === ")") {
      if (acc === "" && __privateGet(ast, _parts).length === 0) {
        __privateSet(ast, _emptyExt, true);
      }
      part.push(acc);
      acc = "";
      ast.push(...parts, part);
      return i;
    }
    acc += c;
  }
  ast.type = null;
  __privateSet(ast, _hasMagic, void 0);
  __privateSet(ast, _parts, [str2.substring(pos - 1)]);
  return i;
};
partsToRegExp_fn = function(dot) {
  return __privateGet(this, _parts).map((p) => {
    if (typeof p === "string") {
      throw new Error("string type in extglob ast??");
    }
    const [re, _, _hasMagic2, uflag] = p.toRegExpSource(dot);
    __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
    return re;
  }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
};
parseGlob_fn = function(glob2, hasMagic2, noEmpty = false) {
  let escaping = false;
  let re = "";
  let uflag = false;
  let inStar = false;
  for (let i = 0; i < glob2.length; i++) {
    const c = glob2.charAt(i);
    if (escaping) {
      escaping = false;
      re += (reSpecials.has(c) ? "\\" : "") + c;
      continue;
    }
    if (c === "*") {
      if (inStar)
        continue;
      inStar = true;
      re += noEmpty && /^[*]+$/.test(glob2) ? starNoEmpty : star;
      hasMagic2 = true;
      continue;
    } else {
      inStar = false;
    }
    if (c === "\\") {
      if (i === glob2.length - 1) {
        re += "\\\\";
      } else {
        escaping = true;
      }
      continue;
    }
    if (c === "[") {
      const [src, needUflag, consumed, magic] = parseClass(glob2, i);
      if (consumed) {
        re += src;
        uflag = uflag || needUflag;
        i += consumed - 1;
        hasMagic2 = hasMagic2 || magic;
        continue;
      }
    }
    if (c === "?") {
      re += qmark;
      hasMagic2 = true;
      continue;
    }
    re += regExpEscape(c);
  }
  return [re, unescape(glob2), !!hasMagic2, uflag];
};
__privateAdd(_AST, _AST_static);
var AST = _AST;

// node_modules/minimatch/dist/esm/escape.js
var escape = (s, { windowsPathsNoEscape = false, magicalBraces = false } = {}) => {
  if (magicalBraces) {
    return windowsPathsNoEscape ? s.replace(/[?*()[\]{}]/g, "[$&]") : s.replace(/[?*()[\]\\{}]/g, "\\$&");
  }
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};

// node_modules/minimatch/dist/esm/index.js
var minimatch = (p, pattern, options2 = {}) => {
  assertValidPattern(pattern);
  if (!options2.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern, options2).match(p);
};
var starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
var starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
var starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
var starDotExtTestNocase = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
};
var starDotExtTestNocaseDot = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => f.toLowerCase().endsWith(ext2);
};
var starDotStarRE = /^\*+\.\*+$/;
var starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
var starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
var dotStarRE = /^\.\*+$/;
var dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
var starRE = /^\*+$/;
var starTest = (f) => f.length !== 0 && !f.startsWith(".");
var starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
var qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
var qmarksTestNocase = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTest = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTestNoExt = ([$0]) => {
  const len2 = $0.length;
  return (f) => f.length === len2 && !f.startsWith(".");
};
var qmarksTestNoExtDot = ([$0]) => {
  const len2 = $0.length;
  return (f) => f.length === len2 && f !== "." && f !== "..";
};
var defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var path = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
};
var sep = defaultPlatform === "win32" ? path.win32.sep : path.posix.sep;
minimatch.sep = sep;
var GLOBSTAR = Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
var qmark2 = "[^/]";
var star2 = qmark2 + "*?";
var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
var filter = (pattern, options2 = {}) => (p) => minimatch(p, pattern, options2);
minimatch.filter = filter;
var ext = (a, b = {}) => Object.assign({}, a, b);
var defaults = (def) => {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  const orig = minimatch;
  const m = (p, pattern, options2 = {}) => orig(p, pattern, ext(def, options2));
  return Object.assign(m, {
    Minimatch: class Minimatch extends orig.Minimatch {
      constructor(pattern, options2 = {}) {
        super(pattern, ext(def, options2));
      }
      static defaults(options2) {
        return orig.defaults(ext(def, options2)).Minimatch;
      }
    },
    AST: class AST extends orig.AST {
      /* c8 ignore start */
      constructor(type, parent, options2 = {}) {
        super(type, parent, ext(def, options2));
      }
      /* c8 ignore stop */
      static fromGlob(pattern, options2 = {}) {
        return orig.AST.fromGlob(pattern, ext(def, options2));
      }
    },
    unescape: (s, options2 = {}) => orig.unescape(s, ext(def, options2)),
    escape: (s, options2 = {}) => orig.escape(s, ext(def, options2)),
    filter: (pattern, options2 = {}) => orig.filter(pattern, ext(def, options2)),
    defaults: (options2) => orig.defaults(ext(def, options2)),
    makeRe: (pattern, options2 = {}) => orig.makeRe(pattern, ext(def, options2)),
    braceExpand: (pattern, options2 = {}) => orig.braceExpand(pattern, ext(def, options2)),
    match: (list, pattern, options2 = {}) => orig.match(list, pattern, ext(def, options2)),
    sep: orig.sep,
    GLOBSTAR
  });
};
minimatch.defaults = defaults;
var braceExpand = (pattern, options2 = {}) => {
  assertValidPattern(pattern);
  if (options2.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    return [pattern];
  }
  return expand(pattern, { max: options2.braceExpandMax });
};
minimatch.braceExpand = braceExpand;
var makeRe = (pattern, options2 = {}) => new Minimatch(pattern, options2).makeRe();
minimatch.makeRe = makeRe;
var match = (list, pattern, options2 = {}) => {
  const mm = new Minimatch(pattern, options2);
  list = list.filter((f) => mm.match(f));
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
minimatch.match = match;
var globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
var regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var Minimatch = class {
  constructor(pattern, options2 = {}) {
    __publicField(this, "options");
    __publicField(this, "set");
    __publicField(this, "pattern");
    __publicField(this, "windowsPathsNoEscape");
    __publicField(this, "nonegate");
    __publicField(this, "negate");
    __publicField(this, "comment");
    __publicField(this, "empty");
    __publicField(this, "preserveMultipleSlashes");
    __publicField(this, "partial");
    __publicField(this, "globSet");
    __publicField(this, "globParts");
    __publicField(this, "nocase");
    __publicField(this, "isWindows");
    __publicField(this, "platform");
    __publicField(this, "windowsNoMagicRoot");
    __publicField(this, "regexp");
    assertValidPattern(pattern);
    options2 = options2 || {};
    this.options = options2;
    this.pattern = pattern;
    this.platform = options2.platform || defaultPlatform;
    this.isWindows = this.platform === "win32";
    const awe = "allowWindowsEscape";
    this.windowsPathsNoEscape = !!options2.windowsPathsNoEscape || options2[awe] === false;
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, "/");
    }
    this.preserveMultipleSlashes = !!options2.preserveMultipleSlashes;
    this.regexp = null;
    this.negate = false;
    this.nonegate = !!options2.nonegate;
    this.comment = false;
    this.empty = false;
    this.partial = !!options2.partial;
    this.nocase = !!this.options.nocase;
    this.windowsNoMagicRoot = options2.windowsNoMagicRoot !== void 0 ? options2.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
    this.globSet = [];
    this.globParts = [];
    this.set = [];
    this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) {
      return true;
    }
    for (const pattern of this.set) {
      for (const part of pattern) {
        if (typeof part !== "string")
          return true;
      }
    }
    return false;
  }
  debug(..._) {
  }
  make() {
    const pattern = this.pattern;
    const options2 = this.options;
    if (!options2.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    this.globSet = [...new Set(this.braceExpand())];
    if (options2.debug) {
      this.debug = (...args) => console.error(...args);
    }
    this.debug(this.pattern, this.globSet);
    const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(rawGlobParts);
    this.debug(this.pattern, this.globParts);
    let set = this.globParts.map((s, _, __2) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
        const isDrive = /^[a-z]:/i.test(s[0]);
        if (isUNC) {
          return [
            ...s.slice(0, 4),
            ...s.slice(4).map((ss) => this.parse(ss))
          ];
        } else if (isDrive) {
          return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
        }
      }
      return s.map((ss) => this.parse(ss));
    });
    this.debug(this.pattern, set);
    this.set = set.filter((s) => s.indexOf(false) === -1);
    if (this.isWindows) {
      for (let i = 0; i < this.set.length; i++) {
        const p = this.set[i];
        if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
          p[2] = "?";
        }
      }
    }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(globParts) {
    if (this.options.noglobstar) {
      for (let i = 0; i < globParts.length; i++) {
        for (let j = 0; j < globParts[i].length; j++) {
          if (globParts[i][j] === "**") {
            globParts[i][j] = "*";
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      globParts = this.firstPhasePreProcess(globParts);
      globParts = this.secondPhasePreProcess(globParts);
    } else if (optimizationLevel >= 1) {
      globParts = this.levelOneOptimize(globParts);
    } else {
      globParts = this.adjascentGlobstarOptimize(globParts);
    }
    return globParts;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(globParts) {
    return globParts.map((parts) => {
      let gs = -1;
      while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
        let i = gs;
        while (parts[i + 1] === "**") {
          i++;
        }
        if (i !== gs) {
          parts.splice(gs, i - gs);
        }
      }
      return parts;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(globParts) {
    return globParts.map((parts) => {
      parts = parts.reduce((set, part) => {
        const prev = set[set.length - 1];
        if (part === "**" && prev === "**") {
          return set;
        }
        if (part === "..") {
          if (prev && prev !== ".." && prev !== "." && prev !== "**") {
            set.pop();
            return set;
          }
        }
        set.push(part);
        return set;
      }, []);
      return parts.length === 0 ? [""] : parts;
    });
  }
  levelTwoFileOptimize(parts) {
    if (!Array.isArray(parts)) {
      parts = this.slashSplit(parts);
    }
    let didSomething = false;
    do {
      didSomething = false;
      if (!this.preserveMultipleSlashes) {
        for (let i = 1; i < parts.length - 1; i++) {
          const p = parts[i];
          if (i === 1 && p === "" && parts[0] === "")
            continue;
          if (p === "." || p === "") {
            didSomething = true;
            parts.splice(i, 1);
            i--;
          }
        }
        if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
          didSomething = true;
          parts.pop();
        }
      }
      let dd = 0;
      while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
        const p = parts[dd - 1];
        if (p && p !== "." && p !== ".." && p !== "**") {
          didSomething = true;
          parts.splice(dd - 1, 2);
          dd -= 2;
        }
      }
    } while (didSomething);
    return parts.length === 0 ? [""] : parts;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(globParts) {
    let didSomething = false;
    do {
      didSomething = false;
      for (let parts of globParts) {
        let gs = -1;
        while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
          let gss = gs;
          while (parts[gss + 1] === "**") {
            gss++;
          }
          if (gss > gs) {
            parts.splice(gs + 1, gss - gs);
          }
          let next = parts[gs + 1];
          const p = parts[gs + 2];
          const p2 = parts[gs + 3];
          if (next !== "..")
            continue;
          if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
            continue;
          }
          didSomething = true;
          parts.splice(gs, 1);
          const other = parts.slice(0);
          other[gs] = "**";
          globParts.push(other);
          gs--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < parts.length - 1; i++) {
            const p = parts[i];
            if (i === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p = parts[dd - 1];
          if (p && p !== "." && p !== ".." && p !== "**") {
            didSomething = true;
            const needDot = dd === 1 && parts[dd + 1] === "**";
            const splin = needDot ? ["."] : [];
            parts.splice(dd - 1, 2, ...splin);
            if (parts.length === 0)
              parts.push("");
            dd -= 2;
          }
        }
      }
    } while (didSomething);
    return globParts;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(globParts) {
    for (let i = 0; i < globParts.length - 1; i++) {
      for (let j = i + 1; j < globParts.length; j++) {
        const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
        if (matched) {
          globParts[i] = [];
          globParts[j] = matched;
          break;
        }
      }
    }
    return globParts.filter((gs) => gs.length);
  }
  partsMatch(a, b, emptyGSMatch = false) {
    let ai = 0;
    let bi = 0;
    let result = [];
    let which = "";
    while (ai < a.length && bi < b.length) {
      if (a[ai] === b[bi]) {
        result.push(which === "b" ? b[bi] : a[ai]);
        ai++;
        bi++;
      } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
        result.push(a[ai]);
        ai++;
      } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
        result.push(b[bi]);
        bi++;
      } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
        if (which === "b")
          return false;
        which = "a";
        result.push(a[ai]);
        ai++;
        bi++;
      } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
        if (which === "a")
          return false;
        which = "b";
        result.push(b[bi]);
        ai++;
        bi++;
      } else {
        return false;
      }
    }
    return a.length === b.length && result;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.slice(negateOffset);
    this.negate = negate;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(file, pattern, partial = false) {
    const options2 = this.options;
    if (this.isWindows) {
      const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
      const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
      const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
      const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
      const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
      const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
      if (typeof fdi === "number" && typeof pdi === "number") {
        const [fd, pd] = [
          file[fdi],
          pattern[pdi]
        ];
        if (fd.toLowerCase() === pd.toLowerCase()) {
          pattern[pdi] = fd;
          if (pdi > fdi) {
            pattern = pattern.slice(pdi);
          } else if (fdi > pdi) {
            file = file.slice(fdi);
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      file = this.levelTwoFileOptimize(file);
    }
    this.debug("matchOne", this, { file, pattern });
    this.debug("matchOne", file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false) {
        return false;
      }
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug("** at the end");
          for (; fi < fl; fi++) {
            if (file[fi] === "." || file[fi] === ".." || !options2.dot && file[fi].charAt(0) === ".")
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug("globstar found match!", fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === "." || swallowee === ".." || !options2.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file, fr, pattern, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue");
            fr++;
          }
        }
        if (partial) {
          this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
          if (fr === fl) {
            return true;
          }
        }
        return false;
      }
      let hit;
      if (typeof p === "string") {
        hit = f === p;
        this.debug("string match", p, f, hit);
      } else {
        hit = p.test(f);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      return fi === fl - 1 && file[fi] === "";
    } else {
      throw new Error("wtf?");
    }
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(pattern) {
    assertValidPattern(pattern);
    const options2 = this.options;
    if (pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    let m;
    let fastTest = null;
    if (m = pattern.match(starRE)) {
      fastTest = options2.dot ? starTestDot : starTest;
    } else if (m = pattern.match(starDotExtRE)) {
      fastTest = (options2.nocase ? options2.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options2.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
    } else if (m = pattern.match(qmarksRE)) {
      fastTest = (options2.nocase ? options2.dot ? qmarksTestNocaseDot : qmarksTestNocase : options2.dot ? qmarksTestDot : qmarksTest)(m);
    } else if (m = pattern.match(starDotStarRE)) {
      fastTest = options2.dot ? starDotStarTestDot : starDotStarTest;
    } else if (m = pattern.match(dotStarRE)) {
      fastTest = dotStarTest;
    }
    const re = AST.fromGlob(pattern, this.options).toMMPattern();
    if (fastTest && typeof re === "object") {
      Reflect.defineProperty(re, "test", { value: fastTest });
    }
    return re;
  }
  makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    const set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    const options2 = this.options;
    const twoStar = options2.noglobstar ? star2 : options2.dot ? twoStarDot : twoStarNoDot;
    const flags = new Set(options2.nocase ? ["i"] : []);
    let re = set.map((pattern) => {
      const pp = pattern.map((p) => {
        if (p instanceof RegExp) {
          for (const f of p.flags.split(""))
            flags.add(f);
        }
        return typeof p === "string" ? regExpEscape2(p) : p === GLOBSTAR ? GLOBSTAR : p._src;
      });
      pp.forEach((p, i) => {
        const next = pp[i + 1];
        const prev = pp[i - 1];
        if (p !== GLOBSTAR || prev === GLOBSTAR) {
          return;
        }
        if (prev === void 0) {
          if (next !== void 0 && next !== GLOBSTAR) {
            pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
          } else {
            pp[i] = twoStar;
          }
        } else if (next === void 0) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + ")?";
        } else if (next !== GLOBSTAR) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
          pp[i + 1] = GLOBSTAR;
        }
      });
      const filtered = pp.filter((p) => p !== GLOBSTAR);
      if (this.partial && filtered.length >= 1) {
        const prefixes = [];
        for (let i = 1; i <= filtered.length; i++) {
          prefixes.push(filtered.slice(0, i).join("/"));
        }
        return "(?:" + prefixes.join("|") + ")";
      }
      return filtered.join("/");
    }).join("|");
    const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
    re = "^" + open + re + close + "$";
    if (this.partial) {
      re = "^(?:\\/|" + open + re.slice(1, -1) + close + ")$";
    }
    if (this.negate)
      re = "^(?!" + re + ").+$";
    try {
      this.regexp = new RegExp(re, [...flags].join(""));
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(p) {
    if (this.preserveMultipleSlashes) {
      return p.split("/");
    } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
      return ["", ...p.split(/\/+/)];
    } else {
      return p.split(/\/+/);
    }
  }
  match(f, partial = this.partial) {
    this.debug("match", f, this.pattern);
    if (this.comment) {
      return false;
    }
    if (this.empty) {
      return f === "";
    }
    if (f === "/" && partial) {
      return true;
    }
    const options2 = this.options;
    if (this.isWindows) {
      f = f.split("\\").join("/");
    }
    const ff = this.slashSplit(f);
    this.debug(this.pattern, "split", ff);
    const set = this.set;
    this.debug(this.pattern, "set", set);
    let filename = ff[ff.length - 1];
    if (!filename) {
      for (let i = ff.length - 2; !filename && i >= 0; i--) {
        filename = ff[i];
      }
    }
    for (let i = 0; i < set.length; i++) {
      const pattern = set[i];
      let file = ff;
      if (options2.matchBase && pattern.length === 1) {
        file = [filename];
      }
      const hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options2.flipNegate) {
          return true;
        }
        return !this.negate;
      }
    }
    if (options2.flipNegate) {
      return false;
    }
    return this.negate;
  }
  static defaults(def) {
    return minimatch.defaults(def).Minimatch;
  }
};
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape;
minimatch.unescape = unescape;

// node_modules/glob/dist/esm/glob.js
var import_node_url2 = __toESM(require_node_url(), 1);

// node_modules/lru-cache/dist/esm/index.min.js
var M = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date;
var I = /* @__PURE__ */ new Set();
var R = typeof process == "object" && process ? process : {};
var x = (a, t2, e3, i) => {
  typeof R.emitWarning == "function" ? R.emitWarning(a, t2, e3, i) : console.error(`[${e3}] ${t2}: ${a}`);
};
var C = globalThis.AbortController;
var D = globalThis.AbortSignal;
var _a;
if (typeof C > "u") {
  D = class {
    constructor() {
      __publicField(this, "onabort");
      __publicField(this, "_onabort", []);
      __publicField(this, "reason");
      __publicField(this, "aborted", false);
    }
    addEventListener(i, s) {
      this._onabort.push(s);
    }
  }, C = class {
    constructor() {
      __publicField(this, "signal", new D());
      t2();
    }
    abort(i) {
      var _a6, _b4;
      if (!this.signal.aborted) {
        this.signal.reason = i, this.signal.aborted = true;
        for (let s of this.signal._onabort) s(i);
        (_b4 = (_a6 = this.signal).onabort) == null ? void 0 : _b4.call(_a6, i);
      }
    }
  };
  let a = ((_a = R.env) == null ? void 0 : _a.LRU_CACHE_IGNORE_AC_WARNING) !== "1", t2 = () => {
    a && (a = false, x("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", t2));
  };
}
var G = (a) => !I.has(a);
var H = Symbol("type");
var y = (a) => a && a === Math.floor(a) && a > 0 && isFinite(a);
var U = (a) => y(a) ? a <= Math.pow(2, 8) ? Uint8Array : a <= Math.pow(2, 16) ? Uint16Array : a <= Math.pow(2, 32) ? Uint32Array : a <= Number.MAX_SAFE_INTEGER ? z : null : null;
var z = class extends Array {
  constructor(t2) {
    super(t2), this.fill(0);
  }
};
var _a2, _o;
var W = (_a2 = class {
  constructor(t2, e3) {
    __publicField(this, "heap");
    __publicField(this, "length");
    if (!__privateGet(_a2, _o)) throw new TypeError("instantiate Stack using Stack.create(n)");
    this.heap = new e3(t2), this.length = 0;
  }
  static create(t2) {
    let e3 = U(t2);
    if (!e3) return [];
    __privateSet(_a2, _o, true);
    let i = new _a2(t2, e3);
    return __privateSet(_a2, _o, false), i;
  }
  push(t2) {
    this.heap[this.length++] = t2;
  }
  pop() {
    return this.heap[--this.length];
  }
}, _o = new WeakMap(), __privateAdd(_a2, _o, false), _a2);
var _a3, _b, _o2, _c2, _w, _C, _S, _L, _I, _m, _n, __, _s, _i, _t, _a4, _u, _l, _h, _b2, _r, _y, _A, _d, _g, _T, _v, _f, _x, _a_instances, j_fn, _R, _z, _N, _p, B_fn, _W, _U, _P, F_fn, O_fn, H_fn, M_fn, G_fn, e_fn, k_fn, D_fn, E_fn, V_fn, _c;
var L = (_c = class {
  constructor(t2) {
    __privateAdd(this, _a_instances);
    __privateAdd(this, _o2);
    __privateAdd(this, _c2);
    __privateAdd(this, _w);
    __privateAdd(this, _C);
    __privateAdd(this, _S);
    __privateAdd(this, _L);
    __privateAdd(this, _I);
    __privateAdd(this, _m);
    __publicField(this, "ttl");
    __publicField(this, "ttlResolution");
    __publicField(this, "ttlAutopurge");
    __publicField(this, "updateAgeOnGet");
    __publicField(this, "updateAgeOnHas");
    __publicField(this, "allowStale");
    __publicField(this, "noDisposeOnSet");
    __publicField(this, "noUpdateTTL");
    __publicField(this, "maxEntrySize");
    __publicField(this, "sizeCalculation");
    __publicField(this, "noDeleteOnFetchRejection");
    __publicField(this, "noDeleteOnStaleGet");
    __publicField(this, "allowStaleOnFetchAbort");
    __publicField(this, "allowStaleOnFetchRejection");
    __publicField(this, "ignoreFetchAbort");
    __privateAdd(this, _n);
    __privateAdd(this, __);
    __privateAdd(this, _s);
    __privateAdd(this, _i);
    __privateAdd(this, _t);
    __privateAdd(this, _a4);
    __privateAdd(this, _u);
    __privateAdd(this, _l);
    __privateAdd(this, _h);
    __privateAdd(this, _b2);
    __privateAdd(this, _r);
    __privateAdd(this, _y);
    __privateAdd(this, _A);
    __privateAdd(this, _d);
    __privateAdd(this, _g);
    __privateAdd(this, _T);
    __privateAdd(this, _v);
    __privateAdd(this, _f);
    __privateAdd(this, _x);
    __privateAdd(this, _R, () => {
    });
    __privateAdd(this, _z, () => {
    });
    __privateAdd(this, _N, () => {
    });
    __privateAdd(this, _p, () => false);
    __privateAdd(this, _W, (t2) => {
    });
    __privateAdd(this, _U, (t2, e3, i) => {
    });
    __privateAdd(this, _P, (t2, e3, i, s) => {
      if (i || s) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      return 0;
    });
    __publicField(this, _a3, "LRUCache");
    let { max: e3 = 0, ttl: i, ttlResolution: s = 1, ttlAutopurge: h, updateAgeOnGet: n2, updateAgeOnHas: o2, allowStale: r2, dispose: f, onInsert: m, disposeAfter: c, noDisposeOnSet: d, noUpdateTTL: g, maxSize: A = 0, maxEntrySize: p = 0, sizeCalculation: _, fetchMethod: l2, memoMethod: w, noDeleteOnFetchRejection: b, noDeleteOnStaleGet: S, allowStaleOnFetchRejection: u, allowStaleOnFetchAbort: T, ignoreFetchAbort: F, perf: v } = t2;
    if (v !== void 0 && typeof (v == null ? void 0 : v.now) != "function") throw new TypeError("perf option must have a now() method if specified");
    if (__privateSet(this, _m, v ?? M), e3 !== 0 && !y(e3)) throw new TypeError("max option must be a nonnegative integer");
    let O = e3 ? U(e3) : Array;
    if (!O) throw new Error("invalid max value: " + e3);
    if (__privateSet(this, _o2, e3), __privateSet(this, _c2, A), this.maxEntrySize = p || __privateGet(this, _c2), this.sizeCalculation = _, this.sizeCalculation) {
      if (!__privateGet(this, _c2) && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation != "function") throw new TypeError("sizeCalculation set to non-function");
    }
    if (w !== void 0 && typeof w != "function") throw new TypeError("memoMethod must be a function if defined");
    if (__privateSet(this, _I, w), l2 !== void 0 && typeof l2 != "function") throw new TypeError("fetchMethod must be a function if specified");
    if (__privateSet(this, _L, l2), __privateSet(this, _v, !!l2), __privateSet(this, _s, /* @__PURE__ */ new Map()), __privateSet(this, _i, new Array(e3).fill(void 0)), __privateSet(this, _t, new Array(e3).fill(void 0)), __privateSet(this, _a4, new O(e3)), __privateSet(this, _u, new O(e3)), __privateSet(this, _l, 0), __privateSet(this, _h, 0), __privateSet(this, _b2, W.create(e3)), __privateSet(this, _n, 0), __privateSet(this, __, 0), typeof f == "function" && __privateSet(this, _w, f), typeof m == "function" && __privateSet(this, _C, m), typeof c == "function" ? (__privateSet(this, _S, c), __privateSet(this, _r, [])) : (__privateSet(this, _S, void 0), __privateSet(this, _r, void 0)), __privateSet(this, _T, !!__privateGet(this, _w)), __privateSet(this, _x, !!__privateGet(this, _C)), __privateSet(this, _f, !!__privateGet(this, _S)), this.noDisposeOnSet = !!d, this.noUpdateTTL = !!g, this.noDeleteOnFetchRejection = !!b, this.allowStaleOnFetchRejection = !!u, this.allowStaleOnFetchAbort = !!T, this.ignoreFetchAbort = !!F, this.maxEntrySize !== 0) {
      if (__privateGet(this, _c2) !== 0 && !y(__privateGet(this, _c2))) throw new TypeError("maxSize must be a positive integer if specified");
      if (!y(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
      __privateMethod(this, _a_instances, B_fn).call(this);
    }
    if (this.allowStale = !!r2, this.noDeleteOnStaleGet = !!S, this.updateAgeOnGet = !!n2, this.updateAgeOnHas = !!o2, this.ttlResolution = y(s) || s === 0 ? s : 1, this.ttlAutopurge = !!h, this.ttl = i || 0, this.ttl) {
      if (!y(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
      __privateMethod(this, _a_instances, j_fn).call(this);
    }
    if (__privateGet(this, _o2) === 0 && this.ttl === 0 && __privateGet(this, _c2) === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !__privateGet(this, _o2) && !__privateGet(this, _c2)) {
      let E = "LRU_CACHE_UNBOUNDED";
      G(E) && (I.add(E), x("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", E, _c));
    }
  }
  get perf() {
    return __privateGet(this, _m);
  }
  static unsafeExposeInternals(t2) {
    return { starts: __privateGet(t2, _A), ttls: __privateGet(t2, _d), autopurgeTimers: __privateGet(t2, _g), sizes: __privateGet(t2, _y), keyMap: __privateGet(t2, _s), keyList: __privateGet(t2, _i), valList: __privateGet(t2, _t), next: __privateGet(t2, _a4), prev: __privateGet(t2, _u), get head() {
      return __privateGet(t2, _l);
    }, get tail() {
      return __privateGet(t2, _h);
    }, free: __privateGet(t2, _b2), isBackgroundFetch: (e3) => {
      var _a6;
      return __privateMethod(_a6 = t2, _a_instances, e_fn).call(_a6, e3);
    }, backgroundFetch: (e3, i, s, h) => {
      var _a6;
      return __privateMethod(_a6 = t2, _a_instances, G_fn).call(_a6, e3, i, s, h);
    }, moveToTail: (e3) => {
      var _a6;
      return __privateMethod(_a6 = t2, _a_instances, D_fn).call(_a6, e3);
    }, indexes: (e3) => {
      var _a6;
      return __privateMethod(_a6 = t2, _a_instances, F_fn).call(_a6, e3);
    }, rindexes: (e3) => {
      var _a6;
      return __privateMethod(_a6 = t2, _a_instances, O_fn).call(_a6, e3);
    }, isStale: (e3) => {
      var _a6;
      return __privateGet(_a6 = t2, _p).call(_a6, e3);
    } };
  }
  get max() {
    return __privateGet(this, _o2);
  }
  get maxSize() {
    return __privateGet(this, _c2);
  }
  get calculatedSize() {
    return __privateGet(this, __);
  }
  get size() {
    return __privateGet(this, _n);
  }
  get fetchMethod() {
    return __privateGet(this, _L);
  }
  get memoMethod() {
    return __privateGet(this, _I);
  }
  get dispose() {
    return __privateGet(this, _w);
  }
  get onInsert() {
    return __privateGet(this, _C);
  }
  get disposeAfter() {
    return __privateGet(this, _S);
  }
  getRemainingTTL(t2) {
    return __privateGet(this, _s).has(t2) ? 1 / 0 : 0;
  }
  *entries() {
    for (let t2 of __privateMethod(this, _a_instances, F_fn).call(this)) __privateGet(this, _t)[t2] !== void 0 && __privateGet(this, _i)[t2] !== void 0 && !__privateMethod(this, _a_instances, e_fn).call(this, __privateGet(this, _t)[t2]) && (yield [__privateGet(this, _i)[t2], __privateGet(this, _t)[t2]]);
  }
  *rentries() {
    for (let t2 of __privateMethod(this, _a_instances, O_fn).call(this)) __privateGet(this, _t)[t2] !== void 0 && __privateGet(this, _i)[t2] !== void 0 && !__privateMethod(this, _a_instances, e_fn).call(this, __privateGet(this, _t)[t2]) && (yield [__privateGet(this, _i)[t2], __privateGet(this, _t)[t2]]);
  }
  *keys() {
    for (let t2 of __privateMethod(this, _a_instances, F_fn).call(this)) {
      let e3 = __privateGet(this, _i)[t2];
      e3 !== void 0 && !__privateMethod(this, _a_instances, e_fn).call(this, __privateGet(this, _t)[t2]) && (yield e3);
    }
  }
  *rkeys() {
    for (let t2 of __privateMethod(this, _a_instances, O_fn).call(this)) {
      let e3 = __privateGet(this, _i)[t2];
      e3 !== void 0 && !__privateMethod(this, _a_instances, e_fn).call(this, __privateGet(this, _t)[t2]) && (yield e3);
    }
  }
  *values() {
    for (let t2 of __privateMethod(this, _a_instances, F_fn).call(this)) __privateGet(this, _t)[t2] !== void 0 && !__privateMethod(this, _a_instances, e_fn).call(this, __privateGet(this, _t)[t2]) && (yield __privateGet(this, _t)[t2]);
  }
  *rvalues() {
    for (let t2 of __privateMethod(this, _a_instances, O_fn).call(this)) __privateGet(this, _t)[t2] !== void 0 && !__privateMethod(this, _a_instances, e_fn).call(this, __privateGet(this, _t)[t2]) && (yield __privateGet(this, _t)[t2]);
  }
  [(_b = Symbol.iterator, _a3 = Symbol.toStringTag, _b)]() {
    return this.entries();
  }
  find(t2, e3 = {}) {
    for (let i of __privateMethod(this, _a_instances, F_fn).call(this)) {
      let s = __privateGet(this, _t)[i], h = __privateMethod(this, _a_instances, e_fn).call(this, s) ? s.__staleWhileFetching : s;
      if (h !== void 0 && t2(h, __privateGet(this, _i)[i], this)) return this.get(__privateGet(this, _i)[i], e3);
    }
  }
  forEach(t2, e3 = this) {
    for (let i of __privateMethod(this, _a_instances, F_fn).call(this)) {
      let s = __privateGet(this, _t)[i], h = __privateMethod(this, _a_instances, e_fn).call(this, s) ? s.__staleWhileFetching : s;
      h !== void 0 && t2.call(e3, h, __privateGet(this, _i)[i], this);
    }
  }
  rforEach(t2, e3 = this) {
    for (let i of __privateMethod(this, _a_instances, O_fn).call(this)) {
      let s = __privateGet(this, _t)[i], h = __privateMethod(this, _a_instances, e_fn).call(this, s) ? s.__staleWhileFetching : s;
      h !== void 0 && t2.call(e3, h, __privateGet(this, _i)[i], this);
    }
  }
  purgeStale() {
    let t2 = false;
    for (let e3 of __privateMethod(this, _a_instances, O_fn).call(this, { allowStale: true })) __privateGet(this, _p).call(this, e3) && (__privateMethod(this, _a_instances, E_fn).call(this, __privateGet(this, _i)[e3], "expire"), t2 = true);
    return t2;
  }
  info(t2) {
    let e3 = __privateGet(this, _s).get(t2);
    if (e3 === void 0) return;
    let i = __privateGet(this, _t)[e3], s = __privateMethod(this, _a_instances, e_fn).call(this, i) ? i.__staleWhileFetching : i;
    if (s === void 0) return;
    let h = { value: s };
    if (__privateGet(this, _d) && __privateGet(this, _A)) {
      let n2 = __privateGet(this, _d)[e3], o2 = __privateGet(this, _A)[e3];
      if (n2 && o2) {
        let r2 = n2 - (__privateGet(this, _m).now() - o2);
        h.ttl = r2, h.start = Date.now();
      }
    }
    return __privateGet(this, _y) && (h.size = __privateGet(this, _y)[e3]), h;
  }
  dump() {
    let t2 = [];
    for (let e3 of __privateMethod(this, _a_instances, F_fn).call(this, { allowStale: true })) {
      let i = __privateGet(this, _i)[e3], s = __privateGet(this, _t)[e3], h = __privateMethod(this, _a_instances, e_fn).call(this, s) ? s.__staleWhileFetching : s;
      if (h === void 0 || i === void 0) continue;
      let n2 = { value: h };
      if (__privateGet(this, _d) && __privateGet(this, _A)) {
        n2.ttl = __privateGet(this, _d)[e3];
        let o2 = __privateGet(this, _m).now() - __privateGet(this, _A)[e3];
        n2.start = Math.floor(Date.now() - o2);
      }
      __privateGet(this, _y) && (n2.size = __privateGet(this, _y)[e3]), t2.unshift([i, n2]);
    }
    return t2;
  }
  load(t2) {
    this.clear();
    for (let [e3, i] of t2) {
      if (i.start) {
        let s = Date.now() - i.start;
        i.start = __privateGet(this, _m).now() - s;
      }
      this.set(e3, i.value, i);
    }
  }
  set(t2, e3, i = {}) {
    var _a6, _b4, _c4, _d3, _e2, _f3, _g3;
    if (e3 === void 0) return this.delete(t2), this;
    let { ttl: s = this.ttl, start: h, noDisposeOnSet: n2 = this.noDisposeOnSet, sizeCalculation: o2 = this.sizeCalculation, status: r2 } = i, { noUpdateTTL: f = this.noUpdateTTL } = i, m = __privateGet(this, _P).call(this, t2, e3, i.size || 0, o2);
    if (this.maxEntrySize && m > this.maxEntrySize) return r2 && (r2.set = "miss", r2.maxEntrySizeExceeded = true), __privateMethod(this, _a_instances, E_fn).call(this, t2, "set"), this;
    let c = __privateGet(this, _n) === 0 ? void 0 : __privateGet(this, _s).get(t2);
    if (c === void 0) c = __privateGet(this, _n) === 0 ? __privateGet(this, _h) : __privateGet(this, _b2).length !== 0 ? __privateGet(this, _b2).pop() : __privateGet(this, _n) === __privateGet(this, _o2) ? __privateMethod(this, _a_instances, M_fn).call(this, false) : __privateGet(this, _n), __privateGet(this, _i)[c] = t2, __privateGet(this, _t)[c] = e3, __privateGet(this, _s).set(t2, c), __privateGet(this, _a4)[__privateGet(this, _h)] = c, __privateGet(this, _u)[c] = __privateGet(this, _h), __privateSet(this, _h, c), __privateWrapper(this, _n)._++, __privateGet(this, _U).call(this, c, m, r2), r2 && (r2.set = "add"), f = false, __privateGet(this, _x) && ((_a6 = __privateGet(this, _C)) == null ? void 0 : _a6.call(this, e3, t2, "add"));
    else {
      __privateMethod(this, _a_instances, D_fn).call(this, c);
      let d = __privateGet(this, _t)[c];
      if (e3 !== d) {
        if (__privateGet(this, _v) && __privateMethod(this, _a_instances, e_fn).call(this, d)) {
          d.__abortController.abort(new Error("replaced"));
          let { __staleWhileFetching: g } = d;
          g !== void 0 && !n2 && (__privateGet(this, _T) && ((_b4 = __privateGet(this, _w)) == null ? void 0 : _b4.call(this, g, t2, "set")), __privateGet(this, _f) && ((_c4 = __privateGet(this, _r)) == null ? void 0 : _c4.push([g, t2, "set"])));
        } else n2 || (__privateGet(this, _T) && ((_d3 = __privateGet(this, _w)) == null ? void 0 : _d3.call(this, d, t2, "set")), __privateGet(this, _f) && ((_e2 = __privateGet(this, _r)) == null ? void 0 : _e2.push([d, t2, "set"])));
        if (__privateGet(this, _W).call(this, c), __privateGet(this, _U).call(this, c, m, r2), __privateGet(this, _t)[c] = e3, r2) {
          r2.set = "replace";
          let g = d && __privateMethod(this, _a_instances, e_fn).call(this, d) ? d.__staleWhileFetching : d;
          g !== void 0 && (r2.oldValue = g);
        }
      } else r2 && (r2.set = "update");
      __privateGet(this, _x) && ((_f3 = this.onInsert) == null ? void 0 : _f3.call(this, e3, t2, e3 === d ? "update" : "replace"));
    }
    if (s !== 0 && !__privateGet(this, _d) && __privateMethod(this, _a_instances, j_fn).call(this), __privateGet(this, _d) && (f || __privateGet(this, _N).call(this, c, s, h), r2 && __privateGet(this, _z).call(this, r2, c)), !n2 && __privateGet(this, _f) && __privateGet(this, _r)) {
      let d = __privateGet(this, _r), g;
      for (; g = d == null ? void 0 : d.shift(); ) (_g3 = __privateGet(this, _S)) == null ? void 0 : _g3.call(this, ...g);
    }
    return this;
  }
  pop() {
    var _a6;
    try {
      for (; __privateGet(this, _n); ) {
        let t2 = __privateGet(this, _t)[__privateGet(this, _l)];
        if (__privateMethod(this, _a_instances, M_fn).call(this, true), __privateMethod(this, _a_instances, e_fn).call(this, t2)) {
          if (t2.__staleWhileFetching) return t2.__staleWhileFetching;
        } else if (t2 !== void 0) return t2;
      }
    } finally {
      if (__privateGet(this, _f) && __privateGet(this, _r)) {
        let t2 = __privateGet(this, _r), e3;
        for (; e3 = t2 == null ? void 0 : t2.shift(); ) (_a6 = __privateGet(this, _S)) == null ? void 0 : _a6.call(this, ...e3);
      }
    }
  }
  has(t2, e3 = {}) {
    let { updateAgeOnHas: i = this.updateAgeOnHas, status: s } = e3, h = __privateGet(this, _s).get(t2);
    if (h !== void 0) {
      let n2 = __privateGet(this, _t)[h];
      if (__privateMethod(this, _a_instances, e_fn).call(this, n2) && n2.__staleWhileFetching === void 0) return false;
      if (__privateGet(this, _p).call(this, h)) s && (s.has = "stale", __privateGet(this, _z).call(this, s, h));
      else return i && __privateGet(this, _R).call(this, h), s && (s.has = "hit", __privateGet(this, _z).call(this, s, h)), true;
    } else s && (s.has = "miss");
    return false;
  }
  peek(t2, e3 = {}) {
    let { allowStale: i = this.allowStale } = e3, s = __privateGet(this, _s).get(t2);
    if (s === void 0 || !i && __privateGet(this, _p).call(this, s)) return;
    let h = __privateGet(this, _t)[s];
    return __privateMethod(this, _a_instances, e_fn).call(this, h) ? h.__staleWhileFetching : h;
  }
  async fetch(t2, e3 = {}) {
    let { allowStale: i = this.allowStale, updateAgeOnGet: s = this.updateAgeOnGet, noDeleteOnStaleGet: h = this.noDeleteOnStaleGet, ttl: n2 = this.ttl, noDisposeOnSet: o2 = this.noDisposeOnSet, size: r2 = 0, sizeCalculation: f = this.sizeCalculation, noUpdateTTL: m = this.noUpdateTTL, noDeleteOnFetchRejection: c = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: d = this.allowStaleOnFetchRejection, ignoreFetchAbort: g = this.ignoreFetchAbort, allowStaleOnFetchAbort: A = this.allowStaleOnFetchAbort, context: p, forceRefresh: _ = false, status: l2, signal: w } = e3;
    if (!__privateGet(this, _v)) return l2 && (l2.fetch = "get"), this.get(t2, { allowStale: i, updateAgeOnGet: s, noDeleteOnStaleGet: h, status: l2 });
    let b = { allowStale: i, updateAgeOnGet: s, noDeleteOnStaleGet: h, ttl: n2, noDisposeOnSet: o2, size: r2, sizeCalculation: f, noUpdateTTL: m, noDeleteOnFetchRejection: c, allowStaleOnFetchRejection: d, allowStaleOnFetchAbort: A, ignoreFetchAbort: g, status: l2, signal: w }, S = __privateGet(this, _s).get(t2);
    if (S === void 0) {
      l2 && (l2.fetch = "miss");
      let u = __privateMethod(this, _a_instances, G_fn).call(this, t2, S, b, p);
      return u.__returned = u;
    } else {
      let u = __privateGet(this, _t)[S];
      if (__privateMethod(this, _a_instances, e_fn).call(this, u)) {
        let E = i && u.__staleWhileFetching !== void 0;
        return l2 && (l2.fetch = "inflight", E && (l2.returnedStale = true)), E ? u.__staleWhileFetching : u.__returned = u;
      }
      let T = __privateGet(this, _p).call(this, S);
      if (!_ && !T) return l2 && (l2.fetch = "hit"), __privateMethod(this, _a_instances, D_fn).call(this, S), s && __privateGet(this, _R).call(this, S), l2 && __privateGet(this, _z).call(this, l2, S), u;
      let F = __privateMethod(this, _a_instances, G_fn).call(this, t2, S, b, p), O = F.__staleWhileFetching !== void 0 && i;
      return l2 && (l2.fetch = T ? "stale" : "refresh", O && T && (l2.returnedStale = true)), O ? F.__staleWhileFetching : F.__returned = F;
    }
  }
  async forceFetch(t2, e3 = {}) {
    let i = await this.fetch(t2, e3);
    if (i === void 0) throw new Error("fetch() returned undefined");
    return i;
  }
  memo(t2, e3 = {}) {
    let i = __privateGet(this, _I);
    if (!i) throw new Error("no memoMethod provided to constructor");
    let { context: s, forceRefresh: h, ...n2 } = e3, o2 = this.get(t2, n2);
    if (!h && o2 !== void 0) return o2;
    let r2 = i(t2, o2, { options: n2, context: s });
    return this.set(t2, r2, n2), r2;
  }
  get(t2, e3 = {}) {
    let { allowStale: i = this.allowStale, updateAgeOnGet: s = this.updateAgeOnGet, noDeleteOnStaleGet: h = this.noDeleteOnStaleGet, status: n2 } = e3, o2 = __privateGet(this, _s).get(t2);
    if (o2 !== void 0) {
      let r2 = __privateGet(this, _t)[o2], f = __privateMethod(this, _a_instances, e_fn).call(this, r2);
      return n2 && __privateGet(this, _z).call(this, n2, o2), __privateGet(this, _p).call(this, o2) ? (n2 && (n2.get = "stale"), f ? (n2 && i && r2.__staleWhileFetching !== void 0 && (n2.returnedStale = true), i ? r2.__staleWhileFetching : void 0) : (h || __privateMethod(this, _a_instances, E_fn).call(this, t2, "expire"), n2 && i && (n2.returnedStale = true), i ? r2 : void 0)) : (n2 && (n2.get = "hit"), f ? r2.__staleWhileFetching : (__privateMethod(this, _a_instances, D_fn).call(this, o2), s && __privateGet(this, _R).call(this, o2), r2));
    } else n2 && (n2.get = "miss");
  }
  delete(t2) {
    return __privateMethod(this, _a_instances, E_fn).call(this, t2, "delete");
  }
  clear() {
    return __privateMethod(this, _a_instances, V_fn).call(this, "delete");
  }
}, _o2 = new WeakMap(), _c2 = new WeakMap(), _w = new WeakMap(), _C = new WeakMap(), _S = new WeakMap(), _L = new WeakMap(), _I = new WeakMap(), _m = new WeakMap(), _n = new WeakMap(), __ = new WeakMap(), _s = new WeakMap(), _i = new WeakMap(), _t = new WeakMap(), _a4 = new WeakMap(), _u = new WeakMap(), _l = new WeakMap(), _h = new WeakMap(), _b2 = new WeakMap(), _r = new WeakMap(), _y = new WeakMap(), _A = new WeakMap(), _d = new WeakMap(), _g = new WeakMap(), _T = new WeakMap(), _v = new WeakMap(), _f = new WeakMap(), _x = new WeakMap(), _a_instances = new WeakSet(), j_fn = function() {
  let t2 = new z(__privateGet(this, _o2)), e3 = new z(__privateGet(this, _o2));
  __privateSet(this, _d, t2), __privateSet(this, _A, e3);
  let i = this.ttlAutopurge ? new Array(__privateGet(this, _o2)) : void 0;
  __privateSet(this, _g, i), __privateSet(this, _N, (n2, o2, r2 = __privateGet(this, _m).now()) => {
    if (e3[n2] = o2 !== 0 ? r2 : 0, t2[n2] = o2, (i == null ? void 0 : i[n2]) && (clearTimeout(i[n2]), i[n2] = void 0), o2 !== 0 && i) {
      let f = setTimeout(() => {
        __privateGet(this, _p).call(this, n2) && __privateMethod(this, _a_instances, E_fn).call(this, __privateGet(this, _i)[n2], "expire");
      }, o2 + 1);
      f.unref && f.unref(), i[n2] = f;
    }
  }), __privateSet(this, _R, (n2) => {
    e3[n2] = t2[n2] !== 0 ? __privateGet(this, _m).now() : 0;
  }), __privateSet(this, _z, (n2, o2) => {
    if (t2[o2]) {
      let r2 = t2[o2], f = e3[o2];
      if (!r2 || !f) return;
      n2.ttl = r2, n2.start = f, n2.now = s || h();
      let m = n2.now - f;
      n2.remainingTTL = r2 - m;
    }
  });
  let s = 0, h = () => {
    let n2 = __privateGet(this, _m).now();
    if (this.ttlResolution > 0) {
      s = n2;
      let o2 = setTimeout(() => s = 0, this.ttlResolution);
      o2.unref && o2.unref();
    }
    return n2;
  };
  this.getRemainingTTL = (n2) => {
    let o2 = __privateGet(this, _s).get(n2);
    if (o2 === void 0) return 0;
    let r2 = t2[o2], f = e3[o2];
    if (!r2 || !f) return 1 / 0;
    let m = (s || h()) - f;
    return r2 - m;
  }, __privateSet(this, _p, (n2) => {
    let o2 = e3[n2], r2 = t2[n2];
    return !!r2 && !!o2 && (s || h()) - o2 > r2;
  });
}, _R = new WeakMap(), _z = new WeakMap(), _N = new WeakMap(), _p = new WeakMap(), B_fn = function() {
  let t2 = new z(__privateGet(this, _o2));
  __privateSet(this, __, 0), __privateSet(this, _y, t2), __privateSet(this, _W, (e3) => {
    __privateSet(this, __, __privateGet(this, __) - t2[e3]), t2[e3] = 0;
  }), __privateSet(this, _P, (e3, i, s, h) => {
    if (__privateMethod(this, _a_instances, e_fn).call(this, i)) return 0;
    if (!y(s)) if (h) {
      if (typeof h != "function") throw new TypeError("sizeCalculation must be a function");
      if (s = h(i, e3), !y(s)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
    } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
    return s;
  }), __privateSet(this, _U, (e3, i, s) => {
    if (t2[e3] = i, __privateGet(this, _c2)) {
      let h = __privateGet(this, _c2) - t2[e3];
      for (; __privateGet(this, __) > h; ) __privateMethod(this, _a_instances, M_fn).call(this, true);
    }
    __privateSet(this, __, __privateGet(this, __) + t2[e3]), s && (s.entrySize = i, s.totalCalculatedSize = __privateGet(this, __));
  });
}, _W = new WeakMap(), _U = new WeakMap(), _P = new WeakMap(), F_fn = function* ({ allowStale: t2 = this.allowStale } = {}) {
  if (__privateGet(this, _n)) for (let e3 = __privateGet(this, _h); !(!__privateMethod(this, _a_instances, H_fn).call(this, e3) || ((t2 || !__privateGet(this, _p).call(this, e3)) && (yield e3), e3 === __privateGet(this, _l))); ) e3 = __privateGet(this, _u)[e3];
}, O_fn = function* ({ allowStale: t2 = this.allowStale } = {}) {
  if (__privateGet(this, _n)) for (let e3 = __privateGet(this, _l); !(!__privateMethod(this, _a_instances, H_fn).call(this, e3) || ((t2 || !__privateGet(this, _p).call(this, e3)) && (yield e3), e3 === __privateGet(this, _h))); ) e3 = __privateGet(this, _a4)[e3];
}, H_fn = function(t2) {
  return t2 !== void 0 && __privateGet(this, _s).get(__privateGet(this, _i)[t2]) === t2;
}, M_fn = function(t2) {
  var _a6, _b4, _c4;
  let e3 = __privateGet(this, _l), i = __privateGet(this, _i)[e3], s = __privateGet(this, _t)[e3];
  return __privateGet(this, _v) && __privateMethod(this, _a_instances, e_fn).call(this, s) ? s.__abortController.abort(new Error("evicted")) : (__privateGet(this, _T) || __privateGet(this, _f)) && (__privateGet(this, _T) && ((_a6 = __privateGet(this, _w)) == null ? void 0 : _a6.call(this, s, i, "evict")), __privateGet(this, _f) && ((_b4 = __privateGet(this, _r)) == null ? void 0 : _b4.push([s, i, "evict"]))), __privateGet(this, _W).call(this, e3), ((_c4 = __privateGet(this, _g)) == null ? void 0 : _c4[e3]) && (clearTimeout(__privateGet(this, _g)[e3]), __privateGet(this, _g)[e3] = void 0), t2 && (__privateGet(this, _i)[e3] = void 0, __privateGet(this, _t)[e3] = void 0, __privateGet(this, _b2).push(e3)), __privateGet(this, _n) === 1 ? (__privateSet(this, _l, __privateSet(this, _h, 0)), __privateGet(this, _b2).length = 0) : __privateSet(this, _l, __privateGet(this, _a4)[e3]), __privateGet(this, _s).delete(i), __privateWrapper(this, _n)._--, e3;
}, G_fn = function(t2, e3, i, s) {
  let h = e3 === void 0 ? void 0 : __privateGet(this, _t)[e3];
  if (__privateMethod(this, _a_instances, e_fn).call(this, h)) return h;
  let n2 = new C(), { signal: o2 } = i;
  o2 == null ? void 0 : o2.addEventListener("abort", () => n2.abort(o2.reason), { signal: n2.signal });
  let r2 = { signal: n2.signal, options: i, context: s }, f = (p, _ = false) => {
    let { aborted: l2 } = n2.signal, w = i.ignoreFetchAbort && p !== void 0, b = i.ignoreFetchAbort || !!(i.allowStaleOnFetchAbort && p !== void 0);
    if (i.status && (l2 && !_ ? (i.status.fetchAborted = true, i.status.fetchError = n2.signal.reason, w && (i.status.fetchAbortIgnored = true)) : i.status.fetchResolved = true), l2 && !w && !_) return c(n2.signal.reason, b);
    let S = g, u = __privateGet(this, _t)[e3];
    return (u === g || w && _ && u === void 0) && (p === void 0 ? S.__staleWhileFetching !== void 0 ? __privateGet(this, _t)[e3] = S.__staleWhileFetching : __privateMethod(this, _a_instances, E_fn).call(this, t2, "fetch") : (i.status && (i.status.fetchUpdated = true), this.set(t2, p, r2.options))), p;
  }, m = (p) => (i.status && (i.status.fetchRejected = true, i.status.fetchError = p), c(p, false)), c = (p, _) => {
    let { aborted: l2 } = n2.signal, w = l2 && i.allowStaleOnFetchAbort, b = w || i.allowStaleOnFetchRejection, S = b || i.noDeleteOnFetchRejection, u = g;
    if (__privateGet(this, _t)[e3] === g && (!S || !_ && u.__staleWhileFetching === void 0 ? __privateMethod(this, _a_instances, E_fn).call(this, t2, "fetch") : w || (__privateGet(this, _t)[e3] = u.__staleWhileFetching)), b) return i.status && u.__staleWhileFetching !== void 0 && (i.status.returnedStale = true), u.__staleWhileFetching;
    if (u.__returned === u) throw p;
  }, d = (p, _) => {
    var _a6;
    let l2 = (_a6 = __privateGet(this, _L)) == null ? void 0 : _a6.call(this, t2, h, r2);
    l2 && l2 instanceof Promise && l2.then((w) => p(w === void 0 ? void 0 : w), _), n2.signal.addEventListener("abort", () => {
      (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) && (p(void 0), i.allowStaleOnFetchAbort && (p = (w) => f(w, true)));
    });
  };
  i.status && (i.status.fetchDispatched = true);
  let g = new Promise(d).then(f, m), A = Object.assign(g, { __abortController: n2, __staleWhileFetching: h, __returned: void 0 });
  return e3 === void 0 ? (this.set(t2, A, { ...r2.options, status: void 0 }), e3 = __privateGet(this, _s).get(t2)) : __privateGet(this, _t)[e3] = A, A;
}, e_fn = function(t2) {
  if (!__privateGet(this, _v)) return false;
  let e3 = t2;
  return !!e3 && e3 instanceof Promise && e3.hasOwnProperty("__staleWhileFetching") && e3.__abortController instanceof C;
}, k_fn = function(t2, e3) {
  __privateGet(this, _u)[e3] = t2, __privateGet(this, _a4)[t2] = e3;
}, D_fn = function(t2) {
  t2 !== __privateGet(this, _h) && (t2 === __privateGet(this, _l) ? __privateSet(this, _l, __privateGet(this, _a4)[t2]) : __privateMethod(this, _a_instances, k_fn).call(this, __privateGet(this, _u)[t2], __privateGet(this, _a4)[t2]), __privateMethod(this, _a_instances, k_fn).call(this, __privateGet(this, _h), t2), __privateSet(this, _h, t2));
}, E_fn = function(t2, e3) {
  var _a6, _b4, _c4, _d3, _e2, _f3;
  let i = false;
  if (__privateGet(this, _n) !== 0) {
    let s = __privateGet(this, _s).get(t2);
    if (s !== void 0) if (((_a6 = __privateGet(this, _g)) == null ? void 0 : _a6[s]) && (clearTimeout((_b4 = __privateGet(this, _g)) == null ? void 0 : _b4[s]), __privateGet(this, _g)[s] = void 0), i = true, __privateGet(this, _n) === 1) __privateMethod(this, _a_instances, V_fn).call(this, e3);
    else {
      __privateGet(this, _W).call(this, s);
      let h = __privateGet(this, _t)[s];
      if (__privateMethod(this, _a_instances, e_fn).call(this, h) ? h.__abortController.abort(new Error("deleted")) : (__privateGet(this, _T) || __privateGet(this, _f)) && (__privateGet(this, _T) && ((_c4 = __privateGet(this, _w)) == null ? void 0 : _c4.call(this, h, t2, e3)), __privateGet(this, _f) && ((_d3 = __privateGet(this, _r)) == null ? void 0 : _d3.push([h, t2, e3]))), __privateGet(this, _s).delete(t2), __privateGet(this, _i)[s] = void 0, __privateGet(this, _t)[s] = void 0, s === __privateGet(this, _h)) __privateSet(this, _h, __privateGet(this, _u)[s]);
      else if (s === __privateGet(this, _l)) __privateSet(this, _l, __privateGet(this, _a4)[s]);
      else {
        let n2 = __privateGet(this, _u)[s];
        __privateGet(this, _a4)[n2] = __privateGet(this, _a4)[s];
        let o2 = __privateGet(this, _a4)[s];
        __privateGet(this, _u)[o2] = __privateGet(this, _u)[s];
      }
      __privateWrapper(this, _n)._--, __privateGet(this, _b2).push(s);
    }
  }
  if (__privateGet(this, _f) && ((_e2 = __privateGet(this, _r)) == null ? void 0 : _e2.length)) {
    let s = __privateGet(this, _r), h;
    for (; h = s == null ? void 0 : s.shift(); ) (_f3 = __privateGet(this, _S)) == null ? void 0 : _f3.call(this, ...h);
  }
  return i;
}, V_fn = function(t2) {
  var _a6, _b4, _c4, _d3;
  for (let e3 of __privateMethod(this, _a_instances, O_fn).call(this, { allowStale: true })) {
    let i = __privateGet(this, _t)[e3];
    if (__privateMethod(this, _a_instances, e_fn).call(this, i)) i.__abortController.abort(new Error("deleted"));
    else {
      let s = __privateGet(this, _i)[e3];
      __privateGet(this, _T) && ((_a6 = __privateGet(this, _w)) == null ? void 0 : _a6.call(this, i, s, t2)), __privateGet(this, _f) && ((_b4 = __privateGet(this, _r)) == null ? void 0 : _b4.push([i, s, t2]));
    }
  }
  if (__privateGet(this, _s).clear(), __privateGet(this, _t).fill(void 0), __privateGet(this, _i).fill(void 0), __privateGet(this, _d) && __privateGet(this, _A)) {
    __privateGet(this, _d).fill(0), __privateGet(this, _A).fill(0);
    for (let e3 of __privateGet(this, _g) ?? []) e3 !== void 0 && clearTimeout(e3);
    (_c4 = __privateGet(this, _g)) == null ? void 0 : _c4.fill(void 0);
  }
  if (__privateGet(this, _y) && __privateGet(this, _y).fill(0), __privateSet(this, _l, 0), __privateSet(this, _h, 0), __privateGet(this, _b2).length = 0, __privateSet(this, __, 0), __privateSet(this, _n, 0), __privateGet(this, _f) && __privateGet(this, _r)) {
    let e3 = __privateGet(this, _r), i;
    for (; i = e3 == null ? void 0 : e3.shift(); ) (_d3 = __privateGet(this, _S)) == null ? void 0 : _d3.call(this, ...i);
  }
}, _c);

// node_modules/path-scurry/dist/esm/index.js
var import_node_path = __toESM(require_node_path());
var import_node_url = __toESM(require_node_url());
var import_fs = __toESM(require_fs());
var actualFS = __toESM(require_node_fs());
var import_promises = __toESM(require_promises());

// node_modules/minipass/dist/esm/index.js
var import_node_events = __toESM(require_node_events());
var import_node_stream = __toESM(require_node_stream());
var import_node_string_decoder = __toESM(require_node_string_decoder());
var proc = typeof process === "object" && process ? process : {
  stdout: null,
  stderr: null
};
var isStream = (s) => !!s && typeof s === "object" && (s instanceof Minipass || s instanceof import_node_stream.default || isReadable(s) || isWritable(s));
var isReadable = (s) => !!s && typeof s === "object" && s instanceof import_node_events.EventEmitter && typeof s.pipe === "function" && // node core Writable streams have a pipe() method, but it throws
s.pipe !== import_node_stream.default.Writable.prototype.pipe;
var isWritable = (s) => !!s && typeof s === "object" && s instanceof import_node_events.EventEmitter && typeof s.write === "function" && typeof s.end === "function";
var EOF = Symbol("EOF");
var MAYBE_EMIT_END = Symbol("maybeEmitEnd");
var EMITTED_END = Symbol("emittedEnd");
var EMITTING_END = Symbol("emittingEnd");
var EMITTED_ERROR = Symbol("emittedError");
var CLOSED = Symbol("closed");
var READ = Symbol("read");
var FLUSH = Symbol("flush");
var FLUSHCHUNK = Symbol("flushChunk");
var ENCODING = Symbol("encoding");
var DECODER = Symbol("decoder");
var FLOWING = Symbol("flowing");
var PAUSED = Symbol("paused");
var RESUME = Symbol("resume");
var BUFFER = Symbol("buffer");
var PIPES = Symbol("pipes");
var BUFFERLENGTH = Symbol("bufferLength");
var BUFFERPUSH = Symbol("bufferPush");
var BUFFERSHIFT = Symbol("bufferShift");
var OBJECTMODE = Symbol("objectMode");
var DESTROYED = Symbol("destroyed");
var ERROR = Symbol("error");
var EMITDATA = Symbol("emitData");
var EMITEND = Symbol("emitEnd");
var EMITEND2 = Symbol("emitEnd2");
var ASYNC = Symbol("async");
var ABORT = Symbol("abort");
var ABORTED = Symbol("aborted");
var SIGNAL = Symbol("signal");
var DATALISTENERS = Symbol("dataListeners");
var DISCARDED = Symbol("discarded");
var defer = (fn) => Promise.resolve().then(fn);
var nodefer = (fn) => fn();
var isEndish = (ev) => ev === "end" || ev === "finish" || ev === "prefinish";
var isArrayBufferLike = (b) => b instanceof ArrayBuffer || !!b && typeof b === "object" && b.constructor && b.constructor.name === "ArrayBuffer" && b.byteLength >= 0;
var isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
var Pipe = class {
  constructor(src, dest, opts) {
    __publicField(this, "src");
    __publicField(this, "dest");
    __publicField(this, "opts");
    __publicField(this, "ondrain");
    this.src = src;
    this.dest = dest;
    this.opts = opts;
    this.ondrain = () => src[RESUME]();
    this.dest.on("drain", this.ondrain);
  }
  unpipe() {
    this.dest.removeListener("drain", this.ondrain);
  }
  // only here for the prototype
  /* c8 ignore start */
  proxyErrors(_er) {
  }
  /* c8 ignore stop */
  end() {
    this.unpipe();
    if (this.opts.end)
      this.dest.end();
  }
};
var PipeProxyErrors = class extends Pipe {
  unpipe() {
    this.src.removeListener("error", this.proxyErrors);
    super.unpipe();
  }
  constructor(src, dest, opts) {
    super(src, dest, opts);
    this.proxyErrors = (er) => this.dest.emit("error", er);
    src.on("error", this.proxyErrors);
  }
};
var isObjectModeOptions = (o2) => !!o2.objectMode;
var isEncodingOptions = (o2) => !o2.objectMode && !!o2.encoding && o2.encoding !== "buffer";
var _a5, _b3, _c3, _d2, _e, _f2, _g2, _h2, _i2, _j, _k, _l2, _m2, _n2, _o3, _p2, _q, _r2, _s2;
var Minipass = class extends import_node_events.EventEmitter {
  /**
   * If `RType` is Buffer, then options do not need to be provided.
   * Otherwise, an options object must be provided to specify either
   * {@link Minipass.SharedOptions.objectMode} or
   * {@link Minipass.SharedOptions.encoding}, as appropriate.
   */
  constructor(...args) {
    const options2 = args[0] || {};
    super();
    __publicField(this, _s2, false);
    __publicField(this, _r2, false);
    __publicField(this, _q, []);
    __publicField(this, _p2, []);
    __publicField(this, _o3);
    __publicField(this, _n2);
    __publicField(this, _m2);
    __publicField(this, _l2);
    __publicField(this, _k, false);
    __publicField(this, _j, false);
    __publicField(this, _i2, false);
    __publicField(this, _h2, false);
    __publicField(this, _g2, null);
    __publicField(this, _f2, 0);
    __publicField(this, _e, false);
    __publicField(this, _d2);
    __publicField(this, _c3, false);
    __publicField(this, _b3, 0);
    __publicField(this, _a5, false);
    /**
     * true if the stream can be written
     */
    __publicField(this, "writable", true);
    /**
     * true if the stream can be read
     */
    __publicField(this, "readable", true);
    if (options2.objectMode && typeof options2.encoding === "string") {
      throw new TypeError("Encoding and objectMode may not be used together");
    }
    if (isObjectModeOptions(options2)) {
      this[OBJECTMODE] = true;
      this[ENCODING] = null;
    } else if (isEncodingOptions(options2)) {
      this[ENCODING] = options2.encoding;
      this[OBJECTMODE] = false;
    } else {
      this[OBJECTMODE] = false;
      this[ENCODING] = null;
    }
    this[ASYNC] = !!options2.async;
    this[DECODER] = this[ENCODING] ? new import_node_string_decoder.StringDecoder(this[ENCODING]) : null;
    if (options2 && options2.debugExposeBuffer === true) {
      Object.defineProperty(this, "buffer", { get: () => this[BUFFER] });
    }
    if (options2 && options2.debugExposePipes === true) {
      Object.defineProperty(this, "pipes", { get: () => this[PIPES] });
    }
    const { signal } = options2;
    if (signal) {
      this[SIGNAL] = signal;
      if (signal.aborted) {
        this[ABORT]();
      } else {
        signal.addEventListener("abort", () => this[ABORT]());
      }
    }
  }
  /**
   * The amount of data stored in the buffer waiting to be read.
   *
   * For Buffer strings, this will be the total byte length.
   * For string encoding streams, this will be the string character length,
   * according to JavaScript's `string.length` logic.
   * For objectMode streams, this is a count of the items waiting to be
   * emitted.
   */
  get bufferLength() {
    return this[BUFFERLENGTH];
  }
  /**
   * The `BufferEncoding` currently in use, or `null`
   */
  get encoding() {
    return this[ENCODING];
  }
  /**
   * @deprecated - This is a read only property
   */
  set encoding(_enc) {
    throw new Error("Encoding must be set at instantiation time");
  }
  /**
   * @deprecated - Encoding may only be set at instantiation time
   */
  setEncoding(_enc) {
    throw new Error("Encoding must be set at instantiation time");
  }
  /**
   * True if this is an objectMode stream
   */
  get objectMode() {
    return this[OBJECTMODE];
  }
  /**
   * @deprecated - This is a read-only property
   */
  set objectMode(_om) {
    throw new Error("objectMode must be set at instantiation time");
  }
  /**
   * true if this is an async stream
   */
  get ["async"]() {
    return this[ASYNC];
  }
  /**
   * Set to true to make this stream async.
   *
   * Once set, it cannot be unset, as this would potentially cause incorrect
   * behavior.  Ie, a sync stream can be made async, but an async stream
   * cannot be safely made sync.
   */
  set ["async"](a) {
    this[ASYNC] = this[ASYNC] || !!a;
  }
  // drop everything and get out of the flow completely
  [(_s2 = FLOWING, _r2 = PAUSED, _q = PIPES, _p2 = BUFFER, _o3 = OBJECTMODE, _n2 = ENCODING, _m2 = ASYNC, _l2 = DECODER, _k = EOF, _j = EMITTED_END, _i2 = EMITTING_END, _h2 = CLOSED, _g2 = EMITTED_ERROR, _f2 = BUFFERLENGTH, _e = DESTROYED, _d2 = SIGNAL, _c3 = ABORTED, _b3 = DATALISTENERS, _a5 = DISCARDED, ABORT)]() {
    var _a6, _b4;
    this[ABORTED] = true;
    this.emit("abort", (_a6 = this[SIGNAL]) == null ? void 0 : _a6.reason);
    this.destroy((_b4 = this[SIGNAL]) == null ? void 0 : _b4.reason);
  }
  /**
   * True if the stream has been aborted.
   */
  get aborted() {
    return this[ABORTED];
  }
  /**
   * No-op setter. Stream aborted status is set via the AbortSignal provided
   * in the constructor options.
   */
  set aborted(_) {
  }
  write(chunk, encoding, cb) {
    var _a6;
    if (this[ABORTED])
      return false;
    if (this[EOF])
      throw new Error("write after end");
    if (this[DESTROYED]) {
      this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" }));
      return true;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = "utf8";
    }
    if (!encoding)
      encoding = "utf8";
    const fn = this[ASYNC] ? defer : nodefer;
    if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
      if (isArrayBufferView(chunk)) {
        chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      } else if (isArrayBufferLike(chunk)) {
        chunk = Buffer.from(chunk);
      } else if (typeof chunk !== "string") {
        throw new Error("Non-contiguous data written to non-objectMode stream");
      }
    }
    if (this[OBJECTMODE]) {
      if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
        this[FLUSH](true);
      if (this[FLOWING])
        this.emit("data", chunk);
      else
        this[BUFFERPUSH](chunk);
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    if (!chunk.length) {
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    if (typeof chunk === "string" && // unless it is a string already ready for us to use
    !(encoding === this[ENCODING] && !((_a6 = this[DECODER]) == null ? void 0 : _a6.lastNeed))) {
      chunk = Buffer.from(chunk, encoding);
    }
    if (Buffer.isBuffer(chunk) && this[ENCODING]) {
      chunk = this[DECODER].write(chunk);
    }
    if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
      this[FLUSH](true);
    if (this[FLOWING])
      this.emit("data", chunk);
    else
      this[BUFFERPUSH](chunk);
    if (this[BUFFERLENGTH] !== 0)
      this.emit("readable");
    if (cb)
      fn(cb);
    return this[FLOWING];
  }
  /**
   * Low-level explicit read method.
   *
   * In objectMode, the argument is ignored, and one item is returned if
   * available.
   *
   * `n` is the number of bytes (or in the case of encoding streams,
   * characters) to consume. If `n` is not provided, then the entire buffer
   * is returned, or `null` is returned if no data is available.
   *
   * If `n` is greater that the amount of data in the internal buffer,
   * then `null` is returned.
   */
  read(n2) {
    if (this[DESTROYED])
      return null;
    this[DISCARDED] = false;
    if (this[BUFFERLENGTH] === 0 || n2 === 0 || n2 && n2 > this[BUFFERLENGTH]) {
      this[MAYBE_EMIT_END]();
      return null;
    }
    if (this[OBJECTMODE])
      n2 = null;
    if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
      this[BUFFER] = [
        this[ENCODING] ? this[BUFFER].join("") : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])
      ];
    }
    const ret = this[READ](n2 || null, this[BUFFER][0]);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [READ](n2, chunk) {
    if (this[OBJECTMODE])
      this[BUFFERSHIFT]();
    else {
      const c = chunk;
      if (n2 === c.length || n2 === null)
        this[BUFFERSHIFT]();
      else if (typeof c === "string") {
        this[BUFFER][0] = c.slice(n2);
        chunk = c.slice(0, n2);
        this[BUFFERLENGTH] -= n2;
      } else {
        this[BUFFER][0] = c.subarray(n2);
        chunk = c.subarray(0, n2);
        this[BUFFERLENGTH] -= n2;
      }
    }
    this.emit("data", chunk);
    if (!this[BUFFER].length && !this[EOF])
      this.emit("drain");
    return chunk;
  }
  end(chunk, encoding, cb) {
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = void 0;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = "utf8";
    }
    if (chunk !== void 0)
      this.write(chunk, encoding);
    if (cb)
      this.once("end", cb);
    this[EOF] = true;
    this.writable = false;
    if (this[FLOWING] || !this[PAUSED])
      this[MAYBE_EMIT_END]();
    return this;
  }
  // don't let the internal resume be overwritten
  [RESUME]() {
    if (this[DESTROYED])
      return;
    if (!this[DATALISTENERS] && !this[PIPES].length) {
      this[DISCARDED] = true;
    }
    this[PAUSED] = false;
    this[FLOWING] = true;
    this.emit("resume");
    if (this[BUFFER].length)
      this[FLUSH]();
    else if (this[EOF])
      this[MAYBE_EMIT_END]();
    else
      this.emit("drain");
  }
  /**
   * Resume the stream if it is currently in a paused state
   *
   * If called when there are no pipe destinations or `data` event listeners,
   * this will place the stream in a "discarded" state, where all data will
   * be thrown away. The discarded state is removed if a pipe destination or
   * data handler is added, if pause() is called, or if any synchronous or
   * asynchronous iteration is started.
   */
  resume() {
    return this[RESUME]();
  }
  /**
   * Pause the stream
   */
  pause() {
    this[FLOWING] = false;
    this[PAUSED] = true;
    this[DISCARDED] = false;
  }
  /**
   * true if the stream has been forcibly destroyed
   */
  get destroyed() {
    return this[DESTROYED];
  }
  /**
   * true if the stream is currently in a flowing state, meaning that
   * any writes will be immediately emitted.
   */
  get flowing() {
    return this[FLOWING];
  }
  /**
   * true if the stream is currently in a paused state
   */
  get paused() {
    return this[PAUSED];
  }
  [BUFFERPUSH](chunk) {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] += 1;
    else
      this[BUFFERLENGTH] += chunk.length;
    this[BUFFER].push(chunk);
  }
  [BUFFERSHIFT]() {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] -= 1;
    else
      this[BUFFERLENGTH] -= this[BUFFER][0].length;
    return this[BUFFER].shift();
  }
  [FLUSH](noDrain = false) {
    do {
    } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) && this[BUFFER].length);
    if (!noDrain && !this[BUFFER].length && !this[EOF])
      this.emit("drain");
  }
  [FLUSHCHUNK](chunk) {
    this.emit("data", chunk);
    return this[FLOWING];
  }
  /**
   * Pipe all data emitted by this stream into the destination provided.
   *
   * Triggers the flow of data.
   */
  pipe(dest, opts) {
    if (this[DESTROYED])
      return dest;
    this[DISCARDED] = false;
    const ended = this[EMITTED_END];
    opts = opts || {};
    if (dest === proc.stdout || dest === proc.stderr)
      opts.end = false;
    else
      opts.end = opts.end !== false;
    opts.proxyErrors = !!opts.proxyErrors;
    if (ended) {
      if (opts.end)
        dest.end();
    } else {
      this[PIPES].push(!opts.proxyErrors ? new Pipe(this, dest, opts) : new PipeProxyErrors(this, dest, opts));
      if (this[ASYNC])
        defer(() => this[RESUME]());
      else
        this[RESUME]();
    }
    return dest;
  }
  /**
   * Fully unhook a piped destination stream.
   *
   * If the destination stream was the only consumer of this stream (ie,
   * there are no other piped destinations or `'data'` event listeners)
   * then the flow of data will stop until there is another consumer or
   * {@link Minipass#resume} is explicitly called.
   */
  unpipe(dest) {
    const p = this[PIPES].find((p2) => p2.dest === dest);
    if (p) {
      if (this[PIPES].length === 1) {
        if (this[FLOWING] && this[DATALISTENERS] === 0) {
          this[FLOWING] = false;
        }
        this[PIPES] = [];
      } else
        this[PIPES].splice(this[PIPES].indexOf(p), 1);
      p.unpipe();
    }
  }
  /**
   * Alias for {@link Minipass#on}
   */
  addListener(ev, handler) {
    return this.on(ev, handler);
  }
  /**
   * Mostly identical to `EventEmitter.on`, with the following
   * behavior differences to prevent data loss and unnecessary hangs:
   *
   * - Adding a 'data' event handler will trigger the flow of data
   *
   * - Adding a 'readable' event handler when there is data waiting to be read
   *   will cause 'readable' to be emitted immediately.
   *
   * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
   *   already passed will cause the event to be emitted immediately and all
   *   handlers removed.
   *
   * - Adding an 'error' event handler after an error has been emitted will
   *   cause the event to be re-emitted immediately with the error previously
   *   raised.
   */
  on(ev, handler) {
    const ret = super.on(ev, handler);
    if (ev === "data") {
      this[DISCARDED] = false;
      this[DATALISTENERS]++;
      if (!this[PIPES].length && !this[FLOWING]) {
        this[RESUME]();
      }
    } else if (ev === "readable" && this[BUFFERLENGTH] !== 0) {
      super.emit("readable");
    } else if (isEndish(ev) && this[EMITTED_END]) {
      super.emit(ev);
      this.removeAllListeners(ev);
    } else if (ev === "error" && this[EMITTED_ERROR]) {
      const h = handler;
      if (this[ASYNC])
        defer(() => h.call(this, this[EMITTED_ERROR]));
      else
        h.call(this, this[EMITTED_ERROR]);
    }
    return ret;
  }
  /**
   * Alias for {@link Minipass#off}
   */
  removeListener(ev, handler) {
    return this.off(ev, handler);
  }
  /**
   * Mostly identical to `EventEmitter.off`
   *
   * If a 'data' event handler is removed, and it was the last consumer
   * (ie, there are no pipe destinations or other 'data' event listeners),
   * then the flow of data will stop until there is another consumer or
   * {@link Minipass#resume} is explicitly called.
   */
  off(ev, handler) {
    const ret = super.off(ev, handler);
    if (ev === "data") {
      this[DATALISTENERS] = this.listeners("data").length;
      if (this[DATALISTENERS] === 0 && !this[DISCARDED] && !this[PIPES].length) {
        this[FLOWING] = false;
      }
    }
    return ret;
  }
  /**
   * Mostly identical to `EventEmitter.removeAllListeners`
   *
   * If all 'data' event handlers are removed, and they were the last consumer
   * (ie, there are no pipe destinations), then the flow of data will stop
   * until there is another consumer or {@link Minipass#resume} is explicitly
   * called.
   */
  removeAllListeners(ev) {
    const ret = super.removeAllListeners(ev);
    if (ev === "data" || ev === void 0) {
      this[DATALISTENERS] = 0;
      if (!this[DISCARDED] && !this[PIPES].length) {
        this[FLOWING] = false;
      }
    }
    return ret;
  }
  /**
   * true if the 'end' event has been emitted
   */
  get emittedEnd() {
    return this[EMITTED_END];
  }
  [MAYBE_EMIT_END]() {
    if (!this[EMITTING_END] && !this[EMITTED_END] && !this[DESTROYED] && this[BUFFER].length === 0 && this[EOF]) {
      this[EMITTING_END] = true;
      this.emit("end");
      this.emit("prefinish");
      this.emit("finish");
      if (this[CLOSED])
        this.emit("close");
      this[EMITTING_END] = false;
    }
  }
  /**
   * Mostly identical to `EventEmitter.emit`, with the following
   * behavior differences to prevent data loss and unnecessary hangs:
   *
   * If the stream has been destroyed, and the event is something other
   * than 'close' or 'error', then `false` is returned and no handlers
   * are called.
   *
   * If the event is 'end', and has already been emitted, then the event
   * is ignored. If the stream is in a paused or non-flowing state, then
   * the event will be deferred until data flow resumes. If the stream is
   * async, then handlers will be called on the next tick rather than
   * immediately.
   *
   * If the event is 'close', and 'end' has not yet been emitted, then
   * the event will be deferred until after 'end' is emitted.
   *
   * If the event is 'error', and an AbortSignal was provided for the stream,
   * and there are no listeners, then the event is ignored, matching the
   * behavior of node core streams in the presense of an AbortSignal.
   *
   * If the event is 'finish' or 'prefinish', then all listeners will be
   * removed after emitting the event, to prevent double-firing.
   */
  emit(ev, ...args) {
    const data = args[0];
    if (ev !== "error" && ev !== "close" && ev !== DESTROYED && this[DESTROYED]) {
      return false;
    } else if (ev === "data") {
      return !this[OBJECTMODE] && !data ? false : this[ASYNC] ? (defer(() => this[EMITDATA](data)), true) : this[EMITDATA](data);
    } else if (ev === "end") {
      return this[EMITEND]();
    } else if (ev === "close") {
      this[CLOSED] = true;
      if (!this[EMITTED_END] && !this[DESTROYED])
        return false;
      const ret2 = super.emit("close");
      this.removeAllListeners("close");
      return ret2;
    } else if (ev === "error") {
      this[EMITTED_ERROR] = data;
      super.emit(ERROR, data);
      const ret2 = !this[SIGNAL] || this.listeners("error").length ? super.emit("error", data) : false;
      this[MAYBE_EMIT_END]();
      return ret2;
    } else if (ev === "resume") {
      const ret2 = super.emit("resume");
      this[MAYBE_EMIT_END]();
      return ret2;
    } else if (ev === "finish" || ev === "prefinish") {
      const ret2 = super.emit(ev);
      this.removeAllListeners(ev);
      return ret2;
    }
    const ret = super.emit(ev, ...args);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [EMITDATA](data) {
    for (const p of this[PIPES]) {
      if (p.dest.write(data) === false)
        this.pause();
    }
    const ret = this[DISCARDED] ? false : super.emit("data", data);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [EMITEND]() {
    if (this[EMITTED_END])
      return false;
    this[EMITTED_END] = true;
    this.readable = false;
    return this[ASYNC] ? (defer(() => this[EMITEND2]()), true) : this[EMITEND2]();
  }
  [EMITEND2]() {
    if (this[DECODER]) {
      const data = this[DECODER].end();
      if (data) {
        for (const p of this[PIPES]) {
          p.dest.write(data);
        }
        if (!this[DISCARDED])
          super.emit("data", data);
      }
    }
    for (const p of this[PIPES]) {
      p.end();
    }
    const ret = super.emit("end");
    this.removeAllListeners("end");
    return ret;
  }
  /**
   * Return a Promise that resolves to an array of all emitted data once
   * the stream ends.
   */
  async collect() {
    const buf = Object.assign([], {
      dataLength: 0
    });
    if (!this[OBJECTMODE])
      buf.dataLength = 0;
    const p = this.promise();
    this.on("data", (c) => {
      buf.push(c);
      if (!this[OBJECTMODE])
        buf.dataLength += c.length;
    });
    await p;
    return buf;
  }
  /**
   * Return a Promise that resolves to the concatenation of all emitted data
   * once the stream ends.
   *
   * Not allowed on objectMode streams.
   */
  async concat() {
    if (this[OBJECTMODE]) {
      throw new Error("cannot concat in objectMode");
    }
    const buf = await this.collect();
    return this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength);
  }
  /**
   * Return a void Promise that resolves once the stream ends.
   */
  async promise() {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED, () => reject(new Error("stream destroyed")));
      this.on("error", (er) => reject(er));
      this.on("end", () => resolve());
    });
  }
  /**
   * Asynchronous `for await of` iteration.
   *
   * This will continue emitting all chunks until the stream terminates.
   */
  [Symbol.asyncIterator]() {
    this[DISCARDED] = false;
    let stopped = false;
    const stop = async () => {
      this.pause();
      stopped = true;
      return { value: void 0, done: true };
    };
    const next = () => {
      if (stopped)
        return stop();
      const res = this.read();
      if (res !== null)
        return Promise.resolve({ done: false, value: res });
      if (this[EOF])
        return stop();
      let resolve;
      let reject;
      const onerr = (er) => {
        this.off("data", ondata);
        this.off("end", onend);
        this.off(DESTROYED, ondestroy);
        stop();
        reject(er);
      };
      const ondata = (value) => {
        this.off("error", onerr);
        this.off("end", onend);
        this.off(DESTROYED, ondestroy);
        this.pause();
        resolve({ value, done: !!this[EOF] });
      };
      const onend = () => {
        this.off("error", onerr);
        this.off("data", ondata);
        this.off(DESTROYED, ondestroy);
        stop();
        resolve({ done: true, value: void 0 });
      };
      const ondestroy = () => onerr(new Error("stream destroyed"));
      return new Promise((res2, rej) => {
        reject = rej;
        resolve = res2;
        this.once(DESTROYED, ondestroy);
        this.once("error", onerr);
        this.once("end", onend);
        this.once("data", ondata);
      });
    };
    return {
      next,
      throw: stop,
      return: stop,
      [Symbol.asyncIterator]() {
        return this;
      },
      [Symbol.asyncDispose]: async () => {
      }
    };
  }
  /**
   * Synchronous `for of` iteration.
   *
   * The iteration will terminate when the internal buffer runs out, even
   * if the stream has not yet terminated.
   */
  [Symbol.iterator]() {
    this[DISCARDED] = false;
    let stopped = false;
    const stop = () => {
      this.pause();
      this.off(ERROR, stop);
      this.off(DESTROYED, stop);
      this.off("end", stop);
      stopped = true;
      return { done: true, value: void 0 };
    };
    const next = () => {
      if (stopped)
        return stop();
      const value = this.read();
      return value === null ? stop() : { done: false, value };
    };
    this.once("end", stop);
    this.once(ERROR, stop);
    this.once(DESTROYED, stop);
    return {
      next,
      throw: stop,
      return: stop,
      [Symbol.iterator]() {
        return this;
      },
      [Symbol.dispose]: () => {
      }
    };
  }
  /**
   * Destroy a stream, preventing it from being used for any further purpose.
   *
   * If the stream has a `close()` method, then it will be called on
   * destruction.
   *
   * After destruction, any attempt to write data, read data, or emit most
   * events will be ignored.
   *
   * If an error argument is provided, then it will be emitted in an
   * 'error' event.
   */
  destroy(er) {
    if (this[DESTROYED]) {
      if (er)
        this.emit("error", er);
      else
        this.emit(DESTROYED);
      return this;
    }
    this[DESTROYED] = true;
    this[DISCARDED] = true;
    this[BUFFER].length = 0;
    this[BUFFERLENGTH] = 0;
    const wc = this;
    if (typeof wc.close === "function" && !this[CLOSED])
      wc.close();
    if (er)
      this.emit("error", er);
    else
      this.emit(DESTROYED);
    return this;
  }
  /**
   * Alias for {@link isStream}
   *
   * Former export location, maintained for backwards compatibility.
   *
   * @deprecated
   */
  static get isStream() {
    return isStream;
  }
};

// node_modules/path-scurry/dist/esm/index.js
var realpathSync = import_fs.realpathSync.native;
var defaultFS = {
  lstatSync: import_fs.lstatSync,
  readdir: import_fs.readdir,
  readdirSync: import_fs.readdirSync,
  readlinkSync: import_fs.readlinkSync,
  realpathSync,
  promises: {
    lstat: import_promises.lstat,
    readdir: import_promises.readdir,
    readlink: import_promises.readlink,
    realpath: import_promises.realpath
  }
};
var fsFromOption = (fsOption) => !fsOption || fsOption === defaultFS || fsOption === actualFS ? defaultFS : {
  ...defaultFS,
  ...fsOption,
  promises: {
    ...defaultFS.promises,
    ...fsOption.promises || {}
  }
};
var uncDriveRegexp = /^\\\\\?\\([a-z]:)\\?$/i;
var uncToDrive = (rootPath) => rootPath.replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
var eitherSep = /[\\\/]/;
var UNKNOWN = 0;
var IFIFO = 1;
var IFCHR = 2;
var IFDIR = 4;
var IFBLK = 6;
var IFREG = 8;
var IFLNK = 10;
var IFSOCK = 12;
var IFMT = 15;
var IFMT_UNKNOWN = ~IFMT;
var READDIR_CALLED = 16;
var LSTAT_CALLED = 32;
var ENOTDIR = 64;
var ENOENT = 128;
var ENOREADLINK = 256;
var ENOREALPATH = 512;
var ENOCHILD = ENOTDIR | ENOENT | ENOREALPATH;
var TYPEMASK = 1023;
var entToType = (s) => s.isFile() ? IFREG : s.isDirectory() ? IFDIR : s.isSymbolicLink() ? IFLNK : s.isCharacterDevice() ? IFCHR : s.isBlockDevice() ? IFBLK : s.isSocket() ? IFSOCK : s.isFIFO() ? IFIFO : UNKNOWN;
var normalizeCache = new L({ max: 2 ** 12 });
var normalize = (s) => {
  const c = normalizeCache.get(s);
  if (c)
    return c;
  const n2 = s.normalize("NFKD");
  normalizeCache.set(s, n2);
  return n2;
};
var normalizeNocaseCache = new L({ max: 2 ** 12 });
var normalizeNocase = (s) => {
  const c = normalizeNocaseCache.get(s);
  if (c)
    return c;
  const n2 = normalize(s.toLowerCase());
  normalizeNocaseCache.set(s, n2);
  return n2;
};
var ResolveCache = class extends L {
  constructor() {
    super({ max: 256 });
  }
};
var ChildrenCache = class extends L {
  constructor(maxSize = 16 * 1024) {
    super({
      maxSize,
      // parent + children
      sizeCalculation: (a) => a.length + 1
    });
  }
};
var setAsCwd = Symbol("PathScurry setAsCwd");
var _fs, _dev, _mode, _nlink, _uid, _gid, _rdev, _blksize, _ino, _size, _blocks, _atimeMs, _mtimeMs, _ctimeMs, _birthtimeMs, _atime, _mtime, _ctime, _birthtime, _matchName, _depth, _fullpath, _fullpathPosix, _relative, _relativePosix, _type, _children, _linkTarget, _realpath, _PathBase_instances, resolveParts_fn, readdirSuccess_fn, markENOENT_fn, markChildrenENOENT_fn, markENOREALPATH_fn, markENOTDIR_fn, readdirFail_fn, lstatFail_fn, readlinkFail_fn, readdirAddChild_fn, readdirAddNewChild_fn, readdirMaybePromoteChild_fn, readdirPromoteChild_fn, applyStat_fn, _onReaddirCB, _readdirCBInFlight, callOnReaddirCB_fn, _asyncReaddirInFlight;
var PathBase = class {
  /* c8 ignore stop */
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    __privateAdd(this, _PathBase_instances);
    /**
     * the basename of this path
     *
     * **Important**: *always* test the path name against any test string
     * usingthe {@link isNamed} method, and not by directly comparing this
     * string. Otherwise, unicode path strings that the system sees as identical
     * will not be properly treated as the same path, leading to incorrect
     * behavior and possible security issues.
     */
    __publicField(this, "name");
    /**
     * the Path entry corresponding to the path root.
     *
     * @internal
     */
    __publicField(this, "root");
    /**
     * All roots found within the current PathScurry family
     *
     * @internal
     */
    __publicField(this, "roots");
    /**
     * a reference to the parent path, or undefined in the case of root entries
     *
     * @internal
     */
    __publicField(this, "parent");
    /**
     * boolean indicating whether paths are compared case-insensitively
     * @internal
     */
    __publicField(this, "nocase");
    /**
     * boolean indicating that this path is the current working directory
     * of the PathScurry collection that contains it.
     */
    __publicField(this, "isCWD", false);
    // potential default fs override
    __privateAdd(this, _fs);
    // Stats fields
    __privateAdd(this, _dev);
    __privateAdd(this, _mode);
    __privateAdd(this, _nlink);
    __privateAdd(this, _uid);
    __privateAdd(this, _gid);
    __privateAdd(this, _rdev);
    __privateAdd(this, _blksize);
    __privateAdd(this, _ino);
    __privateAdd(this, _size);
    __privateAdd(this, _blocks);
    __privateAdd(this, _atimeMs);
    __privateAdd(this, _mtimeMs);
    __privateAdd(this, _ctimeMs);
    __privateAdd(this, _birthtimeMs);
    __privateAdd(this, _atime);
    __privateAdd(this, _mtime);
    __privateAdd(this, _ctime);
    __privateAdd(this, _birthtime);
    __privateAdd(this, _matchName);
    __privateAdd(this, _depth);
    __privateAdd(this, _fullpath);
    __privateAdd(this, _fullpathPosix);
    __privateAdd(this, _relative);
    __privateAdd(this, _relativePosix);
    __privateAdd(this, _type);
    __privateAdd(this, _children);
    __privateAdd(this, _linkTarget);
    __privateAdd(this, _realpath);
    __privateAdd(this, _onReaddirCB, []);
    __privateAdd(this, _readdirCBInFlight, false);
    __privateAdd(this, _asyncReaddirInFlight);
    this.name = name;
    __privateSet(this, _matchName, nocase ? normalizeNocase(name) : normalize(name));
    __privateSet(this, _type, type & TYPEMASK);
    this.nocase = nocase;
    this.roots = roots;
    this.root = root || this;
    __privateSet(this, _children, children);
    __privateSet(this, _fullpath, opts.fullpath);
    __privateSet(this, _relative, opts.relative);
    __privateSet(this, _relativePosix, opts.relativePosix);
    this.parent = opts.parent;
    if (this.parent) {
      __privateSet(this, _fs, __privateGet(this.parent, _fs));
    } else {
      __privateSet(this, _fs, fsFromOption(opts.fs));
    }
  }
  get dev() {
    return __privateGet(this, _dev);
  }
  get mode() {
    return __privateGet(this, _mode);
  }
  get nlink() {
    return __privateGet(this, _nlink);
  }
  get uid() {
    return __privateGet(this, _uid);
  }
  get gid() {
    return __privateGet(this, _gid);
  }
  get rdev() {
    return __privateGet(this, _rdev);
  }
  get blksize() {
    return __privateGet(this, _blksize);
  }
  get ino() {
    return __privateGet(this, _ino);
  }
  get size() {
    return __privateGet(this, _size);
  }
  get blocks() {
    return __privateGet(this, _blocks);
  }
  get atimeMs() {
    return __privateGet(this, _atimeMs);
  }
  get mtimeMs() {
    return __privateGet(this, _mtimeMs);
  }
  get ctimeMs() {
    return __privateGet(this, _ctimeMs);
  }
  get birthtimeMs() {
    return __privateGet(this, _birthtimeMs);
  }
  get atime() {
    return __privateGet(this, _atime);
  }
  get mtime() {
    return __privateGet(this, _mtime);
  }
  get ctime() {
    return __privateGet(this, _ctime);
  }
  get birthtime() {
    return __privateGet(this, _birthtime);
  }
  /**
   * This property is for compatibility with the Dirent class as of
   * Node v20, where Dirent['parentPath'] refers to the path of the
   * directory that was passed to readdir. For root entries, it's the path
   * to the entry itself.
   */
  get parentPath() {
    return (this.parent || this).fullpath();
  }
  /* c8 ignore start */
  /**
   * Deprecated alias for Dirent['parentPath'] Somewhat counterintuitively,
   * this property refers to the *parent* path, not the path object itself.
   *
   * @deprecated
   */
  get path() {
    return this.parentPath;
  }
  /**
   * Returns the depth of the Path object from its root.
   *
   * For example, a path at `/foo/bar` would have a depth of 2.
   */
  depth() {
    if (__privateGet(this, _depth) !== void 0)
      return __privateGet(this, _depth);
    if (!this.parent)
      return __privateSet(this, _depth, 0);
    return __privateSet(this, _depth, this.parent.depth() + 1);
  }
  /**
   * @internal
   */
  childrenCache() {
    return __privateGet(this, _children);
  }
  /**
   * Get the Path object referenced by the string path, resolved from this Path
   */
  resolve(path2) {
    var _a6;
    if (!path2) {
      return this;
    }
    const rootPath = this.getRootString(path2);
    const dir = path2.substring(rootPath.length);
    const dirParts = dir.split(this.splitSep);
    const result = rootPath ? __privateMethod(_a6 = this.getRoot(rootPath), _PathBase_instances, resolveParts_fn).call(_a6, dirParts) : __privateMethod(this, _PathBase_instances, resolveParts_fn).call(this, dirParts);
    return result;
  }
  /**
   * Returns the cached children Path objects, if still available.  If they
   * have fallen out of the cache, then returns an empty array, and resets the
   * READDIR_CALLED bit, so that future calls to readdir() will require an fs
   * lookup.
   *
   * @internal
   */
  children() {
    const cached = __privateGet(this, _children).get(this);
    if (cached) {
      return cached;
    }
    const children = Object.assign([], { provisional: 0 });
    __privateGet(this, _children).set(this, children);
    __privateSet(this, _type, __privateGet(this, _type) & ~READDIR_CALLED);
    return children;
  }
  /**
   * Resolves a path portion and returns or creates the child Path.
   *
   * Returns `this` if pathPart is `''` or `'.'`, or `parent` if pathPart is
   * `'..'`.
   *
   * This should not be called directly.  If `pathPart` contains any path
   * separators, it will lead to unsafe undefined behavior.
   *
   * Use `Path.resolve()` instead.
   *
   * @internal
   */
  child(pathPart, opts) {
    if (pathPart === "" || pathPart === ".") {
      return this;
    }
    if (pathPart === "..") {
      return this.parent || this;
    }
    const children = this.children();
    const name = this.nocase ? normalizeNocase(pathPart) : normalize(pathPart);
    for (const p of children) {
      if (__privateGet(p, _matchName) === name) {
        return p;
      }
    }
    const s = this.parent ? this.sep : "";
    const fullpath = __privateGet(this, _fullpath) ? __privateGet(this, _fullpath) + s + pathPart : void 0;
    const pchild = this.newChild(pathPart, UNKNOWN, {
      ...opts,
      parent: this,
      fullpath
    });
    if (!this.canReaddir()) {
      __privateSet(pchild, _type, __privateGet(pchild, _type) | ENOENT);
    }
    children.push(pchild);
    return pchild;
  }
  /**
   * The relative path from the cwd. If it does not share an ancestor with
   * the cwd, then this ends up being equivalent to the fullpath()
   */
  relative() {
    if (this.isCWD)
      return "";
    if (__privateGet(this, _relative) !== void 0) {
      return __privateGet(this, _relative);
    }
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _relative, this.name);
    }
    const pv = p.relative();
    return pv + (!pv || !p.parent ? "" : this.sep) + name;
  }
  /**
   * The relative path from the cwd, using / as the path separator.
   * If it does not share an ancestor with
   * the cwd, then this ends up being equivalent to the fullpathPosix()
   * On posix systems, this is identical to relative().
   */
  relativePosix() {
    if (this.sep === "/")
      return this.relative();
    if (this.isCWD)
      return "";
    if (__privateGet(this, _relativePosix) !== void 0)
      return __privateGet(this, _relativePosix);
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _relativePosix, this.fullpathPosix());
    }
    const pv = p.relativePosix();
    return pv + (!pv || !p.parent ? "" : "/") + name;
  }
  /**
   * The fully resolved path string for this Path entry
   */
  fullpath() {
    if (__privateGet(this, _fullpath) !== void 0) {
      return __privateGet(this, _fullpath);
    }
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _fullpath, this.name);
    }
    const pv = p.fullpath();
    const fp = pv + (!p.parent ? "" : this.sep) + name;
    return __privateSet(this, _fullpath, fp);
  }
  /**
   * On platforms other than windows, this is identical to fullpath.
   *
   * On windows, this is overridden to return the forward-slash form of the
   * full UNC path.
   */
  fullpathPosix() {
    if (__privateGet(this, _fullpathPosix) !== void 0)
      return __privateGet(this, _fullpathPosix);
    if (this.sep === "/")
      return __privateSet(this, _fullpathPosix, this.fullpath());
    if (!this.parent) {
      const p2 = this.fullpath().replace(/\\/g, "/");
      if (/^[a-z]:\//i.test(p2)) {
        return __privateSet(this, _fullpathPosix, `//?/${p2}`);
      } else {
        return __privateSet(this, _fullpathPosix, p2);
      }
    }
    const p = this.parent;
    const pfpp = p.fullpathPosix();
    const fpp = pfpp + (!pfpp || !p.parent ? "" : "/") + this.name;
    return __privateSet(this, _fullpathPosix, fpp);
  }
  /**
   * Is the Path of an unknown type?
   *
   * Note that we might know *something* about it if there has been a previous
   * filesystem operation, for example that it does not exist, or is not a
   * link, or whether it has child entries.
   */
  isUnknown() {
    return (__privateGet(this, _type) & IFMT) === UNKNOWN;
  }
  isType(type) {
    return this[`is${type}`]();
  }
  getType() {
    return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : (
      /* c8 ignore start */
      this.isSocket() ? "Socket" : "Unknown"
    );
  }
  /**
   * Is the Path a regular file?
   */
  isFile() {
    return (__privateGet(this, _type) & IFMT) === IFREG;
  }
  /**
   * Is the Path a directory?
   */
  isDirectory() {
    return (__privateGet(this, _type) & IFMT) === IFDIR;
  }
  /**
   * Is the path a character device?
   */
  isCharacterDevice() {
    return (__privateGet(this, _type) & IFMT) === IFCHR;
  }
  /**
   * Is the path a block device?
   */
  isBlockDevice() {
    return (__privateGet(this, _type) & IFMT) === IFBLK;
  }
  /**
   * Is the path a FIFO pipe?
   */
  isFIFO() {
    return (__privateGet(this, _type) & IFMT) === IFIFO;
  }
  /**
   * Is the path a socket?
   */
  isSocket() {
    return (__privateGet(this, _type) & IFMT) === IFSOCK;
  }
  /**
   * Is the path a symbolic link?
   */
  isSymbolicLink() {
    return (__privateGet(this, _type) & IFLNK) === IFLNK;
  }
  /**
   * Return the entry if it has been subject of a successful lstat, or
   * undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* simply
   * mean that we haven't called lstat on it.
   */
  lstatCached() {
    return __privateGet(this, _type) & LSTAT_CALLED ? this : void 0;
  }
  /**
   * Return the cached link target if the entry has been the subject of a
   * successful readlink, or undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * readlink() has been called at some point.
   */
  readlinkCached() {
    return __privateGet(this, _linkTarget);
  }
  /**
   * Returns the cached realpath target if the entry has been the subject
   * of a successful realpath, or undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * realpath() has been called at some point.
   */
  realpathCached() {
    return __privateGet(this, _realpath);
  }
  /**
   * Returns the cached child Path entries array if the entry has been the
   * subject of a successful readdir(), or [] otherwise.
   *
   * Does not read the filesystem, so an empty array *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * readdir() has been called recently enough to still be valid.
   */
  readdirCached() {
    const children = this.children();
    return children.slice(0, children.provisional);
  }
  /**
   * Return true if it's worth trying to readlink.  Ie, we don't (yet) have
   * any indication that readlink will definitely fail.
   *
   * Returns false if the path is known to not be a symlink, if a previous
   * readlink failed, or if the entry does not exist.
   */
  canReadlink() {
    if (__privateGet(this, _linkTarget))
      return true;
    if (!this.parent)
      return false;
    const ifmt = __privateGet(this, _type) & IFMT;
    return !(ifmt !== UNKNOWN && ifmt !== IFLNK || __privateGet(this, _type) & ENOREADLINK || __privateGet(this, _type) & ENOENT);
  }
  /**
   * Return true if readdir has previously been successfully called on this
   * path, indicating that cachedReaddir() is likely valid.
   */
  calledReaddir() {
    return !!(__privateGet(this, _type) & READDIR_CALLED);
  }
  /**
   * Returns true if the path is known to not exist. That is, a previous lstat
   * or readdir failed to verify its existence when that would have been
   * expected, or a parent entry was marked either enoent or enotdir.
   */
  isENOENT() {
    return !!(__privateGet(this, _type) & ENOENT);
  }
  /**
   * Return true if the path is a match for the given path name.  This handles
   * case sensitivity and unicode normalization.
   *
   * Note: even on case-sensitive systems, it is **not** safe to test the
   * equality of the `.name` property to determine whether a given pathname
   * matches, due to unicode normalization mismatches.
   *
   * Always use this method instead of testing the `path.name` property
   * directly.
   */
  isNamed(n2) {
    return !this.nocase ? __privateGet(this, _matchName) === normalize(n2) : __privateGet(this, _matchName) === normalizeNocase(n2);
  }
  /**
   * Return the Path object corresponding to the target of a symbolic link.
   *
   * If the Path is not a symbolic link, or if the readlink call fails for any
   * reason, `undefined` is returned.
   *
   * Result is cached, and thus may be outdated if the filesystem is mutated.
   */
  async readlink() {
    var _a6;
    const target = __privateGet(this, _linkTarget);
    if (target) {
      return target;
    }
    if (!this.canReadlink()) {
      return void 0;
    }
    if (!this.parent) {
      return void 0;
    }
    try {
      const read = await __privateGet(this, _fs).promises.readlink(this.fullpath());
      const linkTarget = (_a6 = await this.parent.realpath()) == null ? void 0 : _a6.resolve(read);
      if (linkTarget) {
        return __privateSet(this, _linkTarget, linkTarget);
      }
    } catch (er) {
      __privateMethod(this, _PathBase_instances, readlinkFail_fn).call(this, er.code);
      return void 0;
    }
  }
  /**
   * Synchronous {@link PathBase.readlink}
   */
  readlinkSync() {
    var _a6;
    const target = __privateGet(this, _linkTarget);
    if (target) {
      return target;
    }
    if (!this.canReadlink()) {
      return void 0;
    }
    if (!this.parent) {
      return void 0;
    }
    try {
      const read = __privateGet(this, _fs).readlinkSync(this.fullpath());
      const linkTarget = (_a6 = this.parent.realpathSync()) == null ? void 0 : _a6.resolve(read);
      if (linkTarget) {
        return __privateSet(this, _linkTarget, linkTarget);
      }
    } catch (er) {
      __privateMethod(this, _PathBase_instances, readlinkFail_fn).call(this, er.code);
      return void 0;
    }
  }
  /**
   * Call lstat() on this Path, and update all known information that can be
   * determined.
   *
   * Note that unlike `fs.lstat()`, the returned value does not contain some
   * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
   * information is required, you will need to call `fs.lstat` yourself.
   *
   * If the Path refers to a nonexistent file, or if the lstat call fails for
   * any reason, `undefined` is returned.  Otherwise the updated Path object is
   * returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async lstat() {
    if ((__privateGet(this, _type) & ENOENT) === 0) {
      try {
        __privateMethod(this, _PathBase_instances, applyStat_fn).call(this, await __privateGet(this, _fs).promises.lstat(this.fullpath()));
        return this;
      } catch (er) {
        __privateMethod(this, _PathBase_instances, lstatFail_fn).call(this, er.code);
      }
    }
  }
  /**
   * synchronous {@link PathBase.lstat}
   */
  lstatSync() {
    if ((__privateGet(this, _type) & ENOENT) === 0) {
      try {
        __privateMethod(this, _PathBase_instances, applyStat_fn).call(this, __privateGet(this, _fs).lstatSync(this.fullpath()));
        return this;
      } catch (er) {
        __privateMethod(this, _PathBase_instances, lstatFail_fn).call(this, er.code);
      }
    }
  }
  /**
   * Standard node-style callback interface to get list of directory entries.
   *
   * If the Path cannot or does not contain any children, then an empty array
   * is returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   *
   * @param cb The callback called with (er, entries).  Note that the `er`
   * param is somewhat extraneous, as all readdir() errors are handled and
   * simply result in an empty set of entries being returned.
   * @param allowZalgo Boolean indicating that immediately known results should
   * *not* be deferred with `queueMicrotask`. Defaults to `false`. Release
   * zalgo at your peril, the dark pony lord is devious and unforgiving.
   */
  readdirCB(cb, allowZalgo = false) {
    if (!this.canReaddir()) {
      if (allowZalgo)
        cb(null, []);
      else
        queueMicrotask(() => cb(null, []));
      return;
    }
    const children = this.children();
    if (this.calledReaddir()) {
      const c = children.slice(0, children.provisional);
      if (allowZalgo)
        cb(null, c);
      else
        queueMicrotask(() => cb(null, c));
      return;
    }
    __privateGet(this, _onReaddirCB).push(cb);
    if (__privateGet(this, _readdirCBInFlight)) {
      return;
    }
    __privateSet(this, _readdirCBInFlight, true);
    const fullpath = this.fullpath();
    __privateGet(this, _fs).readdir(fullpath, { withFileTypes: true }, (er, entries) => {
      if (er) {
        __privateMethod(this, _PathBase_instances, readdirFail_fn).call(this, er.code);
        children.provisional = 0;
      } else {
        for (const e3 of entries) {
          __privateMethod(this, _PathBase_instances, readdirAddChild_fn).call(this, e3, children);
        }
        __privateMethod(this, _PathBase_instances, readdirSuccess_fn).call(this, children);
      }
      __privateMethod(this, _PathBase_instances, callOnReaddirCB_fn).call(this, children.slice(0, children.provisional));
      return;
    });
  }
  /**
   * Return an array of known child entries.
   *
   * If the Path cannot or does not contain any children, then an empty array
   * is returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async readdir() {
    if (!this.canReaddir()) {
      return [];
    }
    const children = this.children();
    if (this.calledReaddir()) {
      return children.slice(0, children.provisional);
    }
    const fullpath = this.fullpath();
    if (__privateGet(this, _asyncReaddirInFlight)) {
      await __privateGet(this, _asyncReaddirInFlight);
    } else {
      let resolve = () => {
      };
      __privateSet(this, _asyncReaddirInFlight, new Promise((res) => resolve = res));
      try {
        for (const e3 of await __privateGet(this, _fs).promises.readdir(fullpath, {
          withFileTypes: true
        })) {
          __privateMethod(this, _PathBase_instances, readdirAddChild_fn).call(this, e3, children);
        }
        __privateMethod(this, _PathBase_instances, readdirSuccess_fn).call(this, children);
      } catch (er) {
        __privateMethod(this, _PathBase_instances, readdirFail_fn).call(this, er.code);
        children.provisional = 0;
      }
      __privateSet(this, _asyncReaddirInFlight, void 0);
      resolve();
    }
    return children.slice(0, children.provisional);
  }
  /**
   * synchronous {@link PathBase.readdir}
   */
  readdirSync() {
    if (!this.canReaddir()) {
      return [];
    }
    const children = this.children();
    if (this.calledReaddir()) {
      return children.slice(0, children.provisional);
    }
    const fullpath = this.fullpath();
    try {
      for (const e3 of __privateGet(this, _fs).readdirSync(fullpath, {
        withFileTypes: true
      })) {
        __privateMethod(this, _PathBase_instances, readdirAddChild_fn).call(this, e3, children);
      }
      __privateMethod(this, _PathBase_instances, readdirSuccess_fn).call(this, children);
    } catch (er) {
      __privateMethod(this, _PathBase_instances, readdirFail_fn).call(this, er.code);
      children.provisional = 0;
    }
    return children.slice(0, children.provisional);
  }
  canReaddir() {
    if (__privateGet(this, _type) & ENOCHILD)
      return false;
    const ifmt = IFMT & __privateGet(this, _type);
    if (!(ifmt === UNKNOWN || ifmt === IFDIR || ifmt === IFLNK)) {
      return false;
    }
    return true;
  }
  shouldWalk(dirs, walkFilter) {
    return (__privateGet(this, _type) & IFDIR) === IFDIR && !(__privateGet(this, _type) & ENOCHILD) && !dirs.has(this) && (!walkFilter || walkFilter(this));
  }
  /**
   * Return the Path object corresponding to path as resolved
   * by realpath(3).
   *
   * If the realpath call fails for any reason, `undefined` is returned.
   *
   * Result is cached, and thus may be outdated if the filesystem is mutated.
   * On success, returns a Path object.
   */
  async realpath() {
    if (__privateGet(this, _realpath))
      return __privateGet(this, _realpath);
    if ((ENOREALPATH | ENOREADLINK | ENOENT) & __privateGet(this, _type))
      return void 0;
    try {
      const rp = await __privateGet(this, _fs).promises.realpath(this.fullpath());
      return __privateSet(this, _realpath, this.resolve(rp));
    } catch (_) {
      __privateMethod(this, _PathBase_instances, markENOREALPATH_fn).call(this);
    }
  }
  /**
   * Synchronous {@link realpath}
   */
  realpathSync() {
    if (__privateGet(this, _realpath))
      return __privateGet(this, _realpath);
    if ((ENOREALPATH | ENOREADLINK | ENOENT) & __privateGet(this, _type))
      return void 0;
    try {
      const rp = __privateGet(this, _fs).realpathSync(this.fullpath());
      return __privateSet(this, _realpath, this.resolve(rp));
    } catch (_) {
      __privateMethod(this, _PathBase_instances, markENOREALPATH_fn).call(this);
    }
  }
  /**
   * Internal method to mark this Path object as the scurry cwd,
   * called by {@link PathScurry#chdir}
   *
   * @internal
   */
  [setAsCwd](oldCwd) {
    if (oldCwd === this)
      return;
    oldCwd.isCWD = false;
    this.isCWD = true;
    const changed = /* @__PURE__ */ new Set([]);
    let rp = [];
    let p = this;
    while (p && p.parent) {
      changed.add(p);
      __privateSet(p, _relative, rp.join(this.sep));
      __privateSet(p, _relativePosix, rp.join("/"));
      p = p.parent;
      rp.push("..");
    }
    p = oldCwd;
    while (p && p.parent && !changed.has(p)) {
      __privateSet(p, _relative, void 0);
      __privateSet(p, _relativePosix, void 0);
      p = p.parent;
    }
  }
};
_fs = new WeakMap();
_dev = new WeakMap();
_mode = new WeakMap();
_nlink = new WeakMap();
_uid = new WeakMap();
_gid = new WeakMap();
_rdev = new WeakMap();
_blksize = new WeakMap();
_ino = new WeakMap();
_size = new WeakMap();
_blocks = new WeakMap();
_atimeMs = new WeakMap();
_mtimeMs = new WeakMap();
_ctimeMs = new WeakMap();
_birthtimeMs = new WeakMap();
_atime = new WeakMap();
_mtime = new WeakMap();
_ctime = new WeakMap();
_birthtime = new WeakMap();
_matchName = new WeakMap();
_depth = new WeakMap();
_fullpath = new WeakMap();
_fullpathPosix = new WeakMap();
_relative = new WeakMap();
_relativePosix = new WeakMap();
_type = new WeakMap();
_children = new WeakMap();
_linkTarget = new WeakMap();
_realpath = new WeakMap();
_PathBase_instances = new WeakSet();
resolveParts_fn = function(dirParts) {
  let p = this;
  for (const part of dirParts) {
    p = p.child(part);
  }
  return p;
};
readdirSuccess_fn = function(children) {
  var _a6;
  __privateSet(this, _type, __privateGet(this, _type) | READDIR_CALLED);
  for (let p = children.provisional; p < children.length; p++) {
    const c = children[p];
    if (c)
      __privateMethod(_a6 = c, _PathBase_instances, markENOENT_fn).call(_a6);
  }
};
markENOENT_fn = function() {
  if (__privateGet(this, _type) & ENOENT)
    return;
  __privateSet(this, _type, (__privateGet(this, _type) | ENOENT) & IFMT_UNKNOWN);
  __privateMethod(this, _PathBase_instances, markChildrenENOENT_fn).call(this);
};
markChildrenENOENT_fn = function() {
  var _a6;
  const children = this.children();
  children.provisional = 0;
  for (const p of children) {
    __privateMethod(_a6 = p, _PathBase_instances, markENOENT_fn).call(_a6);
  }
};
markENOREALPATH_fn = function() {
  __privateSet(this, _type, __privateGet(this, _type) | ENOREALPATH);
  __privateMethod(this, _PathBase_instances, markENOTDIR_fn).call(this);
};
// save the information when we know the entry is not a dir
markENOTDIR_fn = function() {
  if (__privateGet(this, _type) & ENOTDIR)
    return;
  let t2 = __privateGet(this, _type);
  if ((t2 & IFMT) === IFDIR)
    t2 &= IFMT_UNKNOWN;
  __privateSet(this, _type, t2 | ENOTDIR);
  __privateMethod(this, _PathBase_instances, markChildrenENOENT_fn).call(this);
};
readdirFail_fn = function(code = "") {
  if (code === "ENOTDIR" || code === "EPERM") {
    __privateMethod(this, _PathBase_instances, markENOTDIR_fn).call(this);
  } else if (code === "ENOENT") {
    __privateMethod(this, _PathBase_instances, markENOENT_fn).call(this);
  } else {
    this.children().provisional = 0;
  }
};
lstatFail_fn = function(code = "") {
  var _a6;
  if (code === "ENOTDIR") {
    const p = this.parent;
    __privateMethod(_a6 = p, _PathBase_instances, markENOTDIR_fn).call(_a6);
  } else if (code === "ENOENT") {
    __privateMethod(this, _PathBase_instances, markENOENT_fn).call(this);
  }
};
readlinkFail_fn = function(code = "") {
  var _a6;
  let ter = __privateGet(this, _type);
  ter |= ENOREADLINK;
  if (code === "ENOENT")
    ter |= ENOENT;
  if (code === "EINVAL" || code === "UNKNOWN") {
    ter &= IFMT_UNKNOWN;
  }
  __privateSet(this, _type, ter);
  if (code === "ENOTDIR" && this.parent) {
    __privateMethod(_a6 = this.parent, _PathBase_instances, markENOTDIR_fn).call(_a6);
  }
};
readdirAddChild_fn = function(e3, c) {
  return __privateMethod(this, _PathBase_instances, readdirMaybePromoteChild_fn).call(this, e3, c) || __privateMethod(this, _PathBase_instances, readdirAddNewChild_fn).call(this, e3, c);
};
readdirAddNewChild_fn = function(e3, c) {
  const type = entToType(e3);
  const child = this.newChild(e3.name, type, { parent: this });
  const ifmt = __privateGet(child, _type) & IFMT;
  if (ifmt !== IFDIR && ifmt !== IFLNK && ifmt !== UNKNOWN) {
    __privateSet(child, _type, __privateGet(child, _type) | ENOTDIR);
  }
  c.unshift(child);
  c.provisional++;
  return child;
};
readdirMaybePromoteChild_fn = function(e3, c) {
  for (let p = c.provisional; p < c.length; p++) {
    const pchild = c[p];
    const name = this.nocase ? normalizeNocase(e3.name) : normalize(e3.name);
    if (name !== __privateGet(pchild, _matchName)) {
      continue;
    }
    return __privateMethod(this, _PathBase_instances, readdirPromoteChild_fn).call(this, e3, pchild, p, c);
  }
};
readdirPromoteChild_fn = function(e3, p, index, c) {
  const v = p.name;
  __privateSet(p, _type, __privateGet(p, _type) & IFMT_UNKNOWN | entToType(e3));
  if (v !== e3.name)
    p.name = e3.name;
  if (index !== c.provisional) {
    if (index === c.length - 1)
      c.pop();
    else
      c.splice(index, 1);
    c.unshift(p);
  }
  c.provisional++;
  return p;
};
applyStat_fn = function(st) {
  const { atime, atimeMs, birthtime, birthtimeMs, blksize, blocks, ctime, ctimeMs, dev, gid, ino, mode, mtime, mtimeMs, nlink, rdev, size, uid } = st;
  __privateSet(this, _atime, atime);
  __privateSet(this, _atimeMs, atimeMs);
  __privateSet(this, _birthtime, birthtime);
  __privateSet(this, _birthtimeMs, birthtimeMs);
  __privateSet(this, _blksize, blksize);
  __privateSet(this, _blocks, blocks);
  __privateSet(this, _ctime, ctime);
  __privateSet(this, _ctimeMs, ctimeMs);
  __privateSet(this, _dev, dev);
  __privateSet(this, _gid, gid);
  __privateSet(this, _ino, ino);
  __privateSet(this, _mode, mode);
  __privateSet(this, _mtime, mtime);
  __privateSet(this, _mtimeMs, mtimeMs);
  __privateSet(this, _nlink, nlink);
  __privateSet(this, _rdev, rdev);
  __privateSet(this, _size, size);
  __privateSet(this, _uid, uid);
  const ifmt = entToType(st);
  __privateSet(this, _type, __privateGet(this, _type) & IFMT_UNKNOWN | ifmt | LSTAT_CALLED);
  if (ifmt !== UNKNOWN && ifmt !== IFDIR && ifmt !== IFLNK) {
    __privateSet(this, _type, __privateGet(this, _type) | ENOTDIR);
  }
};
_onReaddirCB = new WeakMap();
_readdirCBInFlight = new WeakMap();
callOnReaddirCB_fn = function(children) {
  __privateSet(this, _readdirCBInFlight, false);
  const cbs = __privateGet(this, _onReaddirCB).slice();
  __privateGet(this, _onReaddirCB).length = 0;
  cbs.forEach((cb) => cb(null, children));
};
_asyncReaddirInFlight = new WeakMap();
var PathWin32 = class _PathWin32 extends PathBase {
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    super(name, type, root, roots, nocase, children, opts);
    /**
     * Separator for generating path strings.
     */
    __publicField(this, "sep", "\\");
    /**
     * Separator for parsing path strings.
     */
    __publicField(this, "splitSep", eitherSep);
  }
  /**
   * @internal
   */
  newChild(name, type = UNKNOWN, opts = {}) {
    return new _PathWin32(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
  }
  /**
   * @internal
   */
  getRootString(path2) {
    return import_node_path.win32.parse(path2).root;
  }
  /**
   * @internal
   */
  getRoot(rootPath) {
    rootPath = uncToDrive(rootPath.toUpperCase());
    if (rootPath === this.root.name) {
      return this.root;
    }
    for (const [compare, root] of Object.entries(this.roots)) {
      if (this.sameRoot(rootPath, compare)) {
        return this.roots[rootPath] = root;
      }
    }
    return this.roots[rootPath] = new PathScurryWin32(rootPath, this).root;
  }
  /**
   * @internal
   */
  sameRoot(rootPath, compare = this.root.name) {
    rootPath = rootPath.toUpperCase().replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
    return rootPath === compare;
  }
};
var PathPosix = class _PathPosix extends PathBase {
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    super(name, type, root, roots, nocase, children, opts);
    /**
     * separator for parsing path strings
     */
    __publicField(this, "splitSep", "/");
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "/");
  }
  /**
   * @internal
   */
  getRootString(path2) {
    return path2.startsWith("/") ? "/" : "";
  }
  /**
   * @internal
   */
  getRoot(_rootPath) {
    return this.root;
  }
  /**
   * @internal
   */
  newChild(name, type = UNKNOWN, opts = {}) {
    return new _PathPosix(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
  }
};
var _resolveCache, _resolvePosixCache, _children2, _fs2;
var PathScurryBase = class {
  /**
   * This class should not be instantiated directly.
   *
   * Use PathScurryWin32, PathScurryDarwin, PathScurryPosix, or PathScurry
   *
   * @internal
   */
  constructor(cwd = process.cwd(), pathImpl, sep2, { nocase, childrenCacheSize = 16 * 1024, fs = defaultFS } = {}) {
    /**
     * The root Path entry for the current working directory of this Scurry
     */
    __publicField(this, "root");
    /**
     * The string path for the root of this Scurry's current working directory
     */
    __publicField(this, "rootPath");
    /**
     * A collection of all roots encountered, referenced by rootPath
     */
    __publicField(this, "roots");
    /**
     * The Path entry corresponding to this PathScurry's current working directory.
     */
    __publicField(this, "cwd");
    __privateAdd(this, _resolveCache);
    __privateAdd(this, _resolvePosixCache);
    __privateAdd(this, _children2);
    /**
     * Perform path comparisons case-insensitively.
     *
     * Defaults true on Darwin and Windows systems, false elsewhere.
     */
    __publicField(this, "nocase");
    __privateAdd(this, _fs2);
    __privateSet(this, _fs2, fsFromOption(fs));
    if (cwd instanceof URL || cwd.startsWith("file://")) {
      cwd = (0, import_node_url.fileURLToPath)(cwd);
    }
    const cwdPath = pathImpl.resolve(cwd);
    this.roots = /* @__PURE__ */ Object.create(null);
    this.rootPath = this.parseRootPath(cwdPath);
    __privateSet(this, _resolveCache, new ResolveCache());
    __privateSet(this, _resolvePosixCache, new ResolveCache());
    __privateSet(this, _children2, new ChildrenCache(childrenCacheSize));
    const split2 = cwdPath.substring(this.rootPath.length).split(sep2);
    if (split2.length === 1 && !split2[0]) {
      split2.pop();
    }
    if (nocase === void 0) {
      throw new TypeError("must provide nocase setting to PathScurryBase ctor");
    }
    this.nocase = nocase;
    this.root = this.newRoot(__privateGet(this, _fs2));
    this.roots[this.rootPath] = this.root;
    let prev = this.root;
    let len2 = split2.length - 1;
    const joinSep = pathImpl.sep;
    let abs = this.rootPath;
    let sawFirst = false;
    for (const part of split2) {
      const l2 = len2--;
      prev = prev.child(part, {
        relative: new Array(l2).fill("..").join(joinSep),
        relativePosix: new Array(l2).fill("..").join("/"),
        fullpath: abs += (sawFirst ? "" : joinSep) + part
      });
      sawFirst = true;
    }
    this.cwd = prev;
  }
  /**
   * Get the depth of a provided path, string, or the cwd
   */
  depth(path2 = this.cwd) {
    if (typeof path2 === "string") {
      path2 = this.cwd.resolve(path2);
    }
    return path2.depth();
  }
  /**
   * Return the cache of child entries.  Exposed so subclasses can create
   * child Path objects in a platform-specific way.
   *
   * @internal
   */
  childrenCache() {
    return __privateGet(this, _children2);
  }
  /**
   * Resolve one or more path strings to a resolved string
   *
   * Same interface as require('path').resolve.
   *
   * Much faster than path.resolve() when called multiple times for the same
   * path, because the resolved Path objects are cached.  Much slower
   * otherwise.
   */
  resolve(...paths) {
    let r2 = "";
    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i];
      if (!p || p === ".")
        continue;
      r2 = r2 ? `${p}/${r2}` : p;
      if (this.isAbsolute(p)) {
        break;
      }
    }
    const cached = __privateGet(this, _resolveCache).get(r2);
    if (cached !== void 0) {
      return cached;
    }
    const result = this.cwd.resolve(r2).fullpath();
    __privateGet(this, _resolveCache).set(r2, result);
    return result;
  }
  /**
   * Resolve one or more path strings to a resolved string, returning
   * the posix path.  Identical to .resolve() on posix systems, but on
   * windows will return a forward-slash separated UNC path.
   *
   * Same interface as require('path').resolve.
   *
   * Much faster than path.resolve() when called multiple times for the same
   * path, because the resolved Path objects are cached.  Much slower
   * otherwise.
   */
  resolvePosix(...paths) {
    let r2 = "";
    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i];
      if (!p || p === ".")
        continue;
      r2 = r2 ? `${p}/${r2}` : p;
      if (this.isAbsolute(p)) {
        break;
      }
    }
    const cached = __privateGet(this, _resolvePosixCache).get(r2);
    if (cached !== void 0) {
      return cached;
    }
    const result = this.cwd.resolve(r2).fullpathPosix();
    __privateGet(this, _resolvePosixCache).set(r2, result);
    return result;
  }
  /**
   * find the relative path from the cwd to the supplied path string or entry
   */
  relative(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.relative();
  }
  /**
   * find the relative path from the cwd to the supplied path string or
   * entry, using / as the path delimiter, even on Windows.
   */
  relativePosix(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.relativePosix();
  }
  /**
   * Return the basename for the provided string or Path object
   */
  basename(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.name;
  }
  /**
   * Return the dirname for the provided string or Path object
   */
  dirname(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return (entry.parent || entry).fullpath();
  }
  async readdir(entry = this.cwd, opts = {
    withFileTypes: true
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes } = opts;
    if (!entry.canReaddir()) {
      return [];
    } else {
      const p = await entry.readdir();
      return withFileTypes ? p : p.map((e3) => e3.name);
    }
  }
  readdirSync(entry = this.cwd, opts = {
    withFileTypes: true
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true } = opts;
    if (!entry.canReaddir()) {
      return [];
    } else if (withFileTypes) {
      return entry.readdirSync();
    } else {
      return entry.readdirSync().map((e3) => e3.name);
    }
  }
  /**
   * Call lstat() on the string or Path object, and update all known
   * information that can be determined.
   *
   * Note that unlike `fs.lstat()`, the returned value does not contain some
   * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
   * information is required, you will need to call `fs.lstat` yourself.
   *
   * If the Path refers to a nonexistent file, or if the lstat call fails for
   * any reason, `undefined` is returned.  Otherwise the updated Path object is
   * returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async lstat(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.lstat();
  }
  /**
   * synchronous {@link PathScurryBase.lstat}
   */
  lstatSync(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.lstatSync();
  }
  async readlink(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e3 = await entry.readlink();
    return withFileTypes ? e3 : e3 == null ? void 0 : e3.fullpath();
  }
  readlinkSync(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e3 = entry.readlinkSync();
    return withFileTypes ? e3 : e3 == null ? void 0 : e3.fullpath();
  }
  async realpath(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e3 = await entry.realpath();
    return withFileTypes ? e3 : e3 == null ? void 0 : e3.fullpath();
  }
  realpathSync(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e3 = entry.realpathSync();
    return withFileTypes ? e3 : e3 == null ? void 0 : e3.fullpath();
  }
  async walk(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    const results = [];
    if (!filter2 || filter2(entry)) {
      results.push(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set();
    const walk = (dir, cb) => {
      dirs.add(dir);
      dir.readdirCB((er, entries) => {
        if (er) {
          return cb(er);
        }
        let len2 = entries.length;
        if (!len2)
          return cb();
        const next = () => {
          if (--len2 === 0) {
            cb();
          }
        };
        for (const e3 of entries) {
          if (!filter2 || filter2(e3)) {
            results.push(withFileTypes ? e3 : e3.fullpath());
          }
          if (follow && e3.isSymbolicLink()) {
            e3.realpath().then((r2) => (r2 == null ? void 0 : r2.isUnknown()) ? r2.lstat() : r2).then((r2) => (r2 == null ? void 0 : r2.shouldWalk(dirs, walkFilter)) ? walk(r2, next) : next());
          } else {
            if (e3.shouldWalk(dirs, walkFilter)) {
              walk(e3, next);
            } else {
              next();
            }
          }
        }
      }, true);
    };
    const start = entry;
    return new Promise((res, rej) => {
      walk(start, (er) => {
        if (er)
          return rej(er);
        res(results);
      });
    });
  }
  walkSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    const results = [];
    if (!filter2 || filter2(entry)) {
      results.push(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set([entry]);
    for (const dir of dirs) {
      const entries = dir.readdirSync();
      for (const e3 of entries) {
        if (!filter2 || filter2(e3)) {
          results.push(withFileTypes ? e3 : e3.fullpath());
        }
        let r2 = e3;
        if (e3.isSymbolicLink()) {
          if (!(follow && (r2 = e3.realpathSync())))
            continue;
          if (r2.isUnknown())
            r2.lstatSync();
        }
        if (r2.shouldWalk(dirs, walkFilter)) {
          dirs.add(r2);
        }
      }
    }
    return results;
  }
  /**
   * Support for `for await`
   *
   * Alias for {@link PathScurryBase.iterate}
   *
   * Note: As of Node 19, this is very slow, compared to other methods of
   * walking.  Consider using {@link PathScurryBase.stream} if memory overhead
   * and backpressure are concerns, or {@link PathScurryBase.walk} if not.
   */
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
  iterate(entry = this.cwd, options2 = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      options2 = entry;
      entry = this.cwd;
    }
    return this.stream(entry, options2)[Symbol.asyncIterator]();
  }
  /**
   * Iterating over a PathScurry performs a synchronous walk.
   *
   * Alias for {@link PathScurryBase.iterateSync}
   */
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  *iterateSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    if (!filter2 || filter2(entry)) {
      yield withFileTypes ? entry : entry.fullpath();
    }
    const dirs = /* @__PURE__ */ new Set([entry]);
    for (const dir of dirs) {
      const entries = dir.readdirSync();
      for (const e3 of entries) {
        if (!filter2 || filter2(e3)) {
          yield withFileTypes ? e3 : e3.fullpath();
        }
        let r2 = e3;
        if (e3.isSymbolicLink()) {
          if (!(follow && (r2 = e3.realpathSync())))
            continue;
          if (r2.isUnknown())
            r2.lstatSync();
        }
        if (r2.shouldWalk(dirs, walkFilter)) {
          dirs.add(r2);
        }
      }
    }
  }
  stream(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    const results = new Minipass({ objectMode: true });
    if (!filter2 || filter2(entry)) {
      results.write(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set();
    const queue = [entry];
    let processing = 0;
    const process2 = () => {
      let paused = false;
      while (!paused) {
        const dir = queue.shift();
        if (!dir) {
          if (processing === 0)
            results.end();
          return;
        }
        processing++;
        dirs.add(dir);
        const onReaddir = (er, entries, didRealpaths = false) => {
          if (er)
            return results.emit("error", er);
          if (follow && !didRealpaths) {
            const promises = [];
            for (const e3 of entries) {
              if (e3.isSymbolicLink()) {
                promises.push(e3.realpath().then((r2) => (r2 == null ? void 0 : r2.isUnknown()) ? r2.lstat() : r2));
              }
            }
            if (promises.length) {
              Promise.all(promises).then(() => onReaddir(null, entries, true));
              return;
            }
          }
          for (const e3 of entries) {
            if (e3 && (!filter2 || filter2(e3))) {
              if (!results.write(withFileTypes ? e3 : e3.fullpath())) {
                paused = true;
              }
            }
          }
          processing--;
          for (const e3 of entries) {
            const r2 = e3.realpathCached() || e3;
            if (r2.shouldWalk(dirs, walkFilter)) {
              queue.push(r2);
            }
          }
          if (paused && !results.flowing) {
            results.once("drain", process2);
          } else if (!sync2) {
            process2();
          }
        };
        let sync2 = true;
        dir.readdirCB(onReaddir, true);
        sync2 = false;
      }
    };
    process2();
    return results;
  }
  streamSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    const results = new Minipass({ objectMode: true });
    const dirs = /* @__PURE__ */ new Set();
    if (!filter2 || filter2(entry)) {
      results.write(withFileTypes ? entry : entry.fullpath());
    }
    const queue = [entry];
    let processing = 0;
    const process2 = () => {
      let paused = false;
      while (!paused) {
        const dir = queue.shift();
        if (!dir) {
          if (processing === 0)
            results.end();
          return;
        }
        processing++;
        dirs.add(dir);
        const entries = dir.readdirSync();
        for (const e3 of entries) {
          if (!filter2 || filter2(e3)) {
            if (!results.write(withFileTypes ? e3 : e3.fullpath())) {
              paused = true;
            }
          }
        }
        processing--;
        for (const e3 of entries) {
          let r2 = e3;
          if (e3.isSymbolicLink()) {
            if (!(follow && (r2 = e3.realpathSync())))
              continue;
            if (r2.isUnknown())
              r2.lstatSync();
          }
          if (r2.shouldWalk(dirs, walkFilter)) {
            queue.push(r2);
          }
        }
      }
      if (paused && !results.flowing)
        results.once("drain", process2);
    };
    process2();
    return results;
  }
  chdir(path2 = this.cwd) {
    const oldCwd = this.cwd;
    this.cwd = typeof path2 === "string" ? this.cwd.resolve(path2) : path2;
    this.cwd[setAsCwd](oldCwd);
  }
};
_resolveCache = new WeakMap();
_resolvePosixCache = new WeakMap();
_children2 = new WeakMap();
_fs2 = new WeakMap();
var PathScurryWin32 = class extends PathScurryBase {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = true } = opts;
    super(cwd, import_node_path.win32, "\\", { ...opts, nocase });
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "\\");
    this.nocase = nocase;
    for (let p = this.cwd; p; p = p.parent) {
      p.nocase = this.nocase;
    }
  }
  /**
   * @internal
   */
  parseRootPath(dir) {
    return import_node_path.win32.parse(dir).root.toUpperCase();
  }
  /**
   * @internal
   */
  newRoot(fs) {
    return new PathWin32(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs });
  }
  /**
   * Return true if the provided path string is an absolute path
   */
  isAbsolute(p) {
    return p.startsWith("/") || p.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(p);
  }
};
var PathScurryPosix = class extends PathScurryBase {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = false } = opts;
    super(cwd, import_node_path.posix, "/", { ...opts, nocase });
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "/");
    this.nocase = nocase;
  }
  /**
   * @internal
   */
  parseRootPath(_dir) {
    return "/";
  }
  /**
   * @internal
   */
  newRoot(fs) {
    return new PathPosix(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs });
  }
  /**
   * Return true if the provided path string is an absolute path
   */
  isAbsolute(p) {
    return p.startsWith("/");
  }
};
var PathScurryDarwin = class extends PathScurryPosix {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = true } = opts;
    super(cwd, { ...opts, nocase });
  }
};
var Path = process.platform === "win32" ? PathWin32 : PathPosix;
var PathScurry = process.platform === "win32" ? PathScurryWin32 : process.platform === "darwin" ? PathScurryDarwin : PathScurryPosix;

// node_modules/glob/dist/esm/pattern.js
var isPatternList = (pl) => pl.length >= 1;
var isGlobList = (gl) => gl.length >= 1;
var _patternList, _globList, _index, _platform, _rest, _globString, _isDrive, _isUNC, _isAbsolute, _followGlobstar;
var _Pattern = class _Pattern {
  constructor(patternList, globList, index, platform) {
    __privateAdd(this, _patternList);
    __privateAdd(this, _globList);
    __privateAdd(this, _index);
    __publicField(this, "length");
    __privateAdd(this, _platform);
    __privateAdd(this, _rest);
    __privateAdd(this, _globString);
    __privateAdd(this, _isDrive);
    __privateAdd(this, _isUNC);
    __privateAdd(this, _isAbsolute);
    __privateAdd(this, _followGlobstar, true);
    if (!isPatternList(patternList)) {
      throw new TypeError("empty pattern list");
    }
    if (!isGlobList(globList)) {
      throw new TypeError("empty glob list");
    }
    if (globList.length !== patternList.length) {
      throw new TypeError("mismatched pattern list and glob list lengths");
    }
    this.length = patternList.length;
    if (index < 0 || index >= this.length) {
      throw new TypeError("index out of range");
    }
    __privateSet(this, _patternList, patternList);
    __privateSet(this, _globList, globList);
    __privateSet(this, _index, index);
    __privateSet(this, _platform, platform);
    if (__privateGet(this, _index) === 0) {
      if (this.isUNC()) {
        const [p0, p1, p2, p3, ...prest] = __privateGet(this, _patternList);
        const [g0, g1, g2, g3, ...grest] = __privateGet(this, _globList);
        if (prest[0] === "") {
          prest.shift();
          grest.shift();
        }
        const p = [p0, p1, p2, p3, ""].join("/");
        const g = [g0, g1, g2, g3, ""].join("/");
        __privateSet(this, _patternList, [p, ...prest]);
        __privateSet(this, _globList, [g, ...grest]);
        this.length = __privateGet(this, _patternList).length;
      } else if (this.isDrive() || this.isAbsolute()) {
        const [p1, ...prest] = __privateGet(this, _patternList);
        const [g1, ...grest] = __privateGet(this, _globList);
        if (prest[0] === "") {
          prest.shift();
          grest.shift();
        }
        const p = p1 + "/";
        const g = g1 + "/";
        __privateSet(this, _patternList, [p, ...prest]);
        __privateSet(this, _globList, [g, ...grest]);
        this.length = __privateGet(this, _patternList).length;
      }
    }
  }
  /**
   * The first entry in the parsed list of patterns
   */
  pattern() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)];
  }
  /**
   * true of if pattern() returns a string
   */
  isString() {
    return typeof __privateGet(this, _patternList)[__privateGet(this, _index)] === "string";
  }
  /**
   * true of if pattern() returns GLOBSTAR
   */
  isGlobstar() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)] === GLOBSTAR;
  }
  /**
   * true if pattern() returns a regexp
   */
  isRegExp() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)] instanceof RegExp;
  }
  /**
   * The /-joined set of glob parts that make up this pattern
   */
  globString() {
    return __privateSet(this, _globString, __privateGet(this, _globString) || (__privateGet(this, _index) === 0 ? this.isAbsolute() ? __privateGet(this, _globList)[0] + __privateGet(this, _globList).slice(1).join("/") : __privateGet(this, _globList).join("/") : __privateGet(this, _globList).slice(__privateGet(this, _index)).join("/")));
  }
  /**
   * true if there are more pattern parts after this one
   */
  hasMore() {
    return this.length > __privateGet(this, _index) + 1;
  }
  /**
   * The rest of the pattern after this part, or null if this is the end
   */
  rest() {
    if (__privateGet(this, _rest) !== void 0)
      return __privateGet(this, _rest);
    if (!this.hasMore())
      return __privateSet(this, _rest, null);
    __privateSet(this, _rest, new _Pattern(__privateGet(this, _patternList), __privateGet(this, _globList), __privateGet(this, _index) + 1, __privateGet(this, _platform)));
    __privateSet(__privateGet(this, _rest), _isAbsolute, __privateGet(this, _isAbsolute));
    __privateSet(__privateGet(this, _rest), _isUNC, __privateGet(this, _isUNC));
    __privateSet(__privateGet(this, _rest), _isDrive, __privateGet(this, _isDrive));
    return __privateGet(this, _rest);
  }
  /**
   * true if the pattern represents a //unc/path/ on windows
   */
  isUNC() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isUNC) !== void 0 ? __privateGet(this, _isUNC) : __privateSet(this, _isUNC, __privateGet(this, _platform) === "win32" && __privateGet(this, _index) === 0 && pl[0] === "" && pl[1] === "" && typeof pl[2] === "string" && !!pl[2] && typeof pl[3] === "string" && !!pl[3]);
  }
  // pattern like C:/...
  // split = ['C:', ...]
  // XXX: would be nice to handle patterns like `c:*` to test the cwd
  // in c: for *, but I don't know of a way to even figure out what that
  // cwd is without actually chdir'ing into it?
  /**
   * True if the pattern starts with a drive letter on Windows
   */
  isDrive() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isDrive) !== void 0 ? __privateGet(this, _isDrive) : __privateSet(this, _isDrive, __privateGet(this, _platform) === "win32" && __privateGet(this, _index) === 0 && this.length > 1 && typeof pl[0] === "string" && /^[a-z]:$/i.test(pl[0]));
  }
  // pattern = '/' or '/...' or '/x/...'
  // split = ['', ''] or ['', ...] or ['', 'x', ...]
  // Drive and UNC both considered absolute on windows
  /**
   * True if the pattern is rooted on an absolute path
   */
  isAbsolute() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isAbsolute) !== void 0 ? __privateGet(this, _isAbsolute) : __privateSet(this, _isAbsolute, pl[0] === "" && pl.length > 1 || this.isDrive() || this.isUNC());
  }
  /**
   * consume the root of the pattern, and return it
   */
  root() {
    const p = __privateGet(this, _patternList)[0];
    return typeof p === "string" && this.isAbsolute() && __privateGet(this, _index) === 0 ? p : "";
  }
  /**
   * Check to see if the current globstar pattern is allowed to follow
   * a symbolic link.
   */
  checkFollowGlobstar() {
    return !(__privateGet(this, _index) === 0 || !this.isGlobstar() || !__privateGet(this, _followGlobstar));
  }
  /**
   * Mark that the current globstar pattern is following a symbolic link
   */
  markFollowGlobstar() {
    if (__privateGet(this, _index) === 0 || !this.isGlobstar() || !__privateGet(this, _followGlobstar))
      return false;
    __privateSet(this, _followGlobstar, false);
    return true;
  }
};
_patternList = new WeakMap();
_globList = new WeakMap();
_index = new WeakMap();
_platform = new WeakMap();
_rest = new WeakMap();
_globString = new WeakMap();
_isDrive = new WeakMap();
_isUNC = new WeakMap();
_isAbsolute = new WeakMap();
_followGlobstar = new WeakMap();
var Pattern = _Pattern;

// node_modules/glob/dist/esm/ignore.js
var defaultPlatform2 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
var Ignore = class {
  constructor(ignored, { nobrace, nocase, noext, noglobstar, platform = defaultPlatform2 }) {
    __publicField(this, "relative");
    __publicField(this, "relativeChildren");
    __publicField(this, "absolute");
    __publicField(this, "absoluteChildren");
    __publicField(this, "platform");
    __publicField(this, "mmopts");
    this.relative = [];
    this.absolute = [];
    this.relativeChildren = [];
    this.absoluteChildren = [];
    this.platform = platform;
    this.mmopts = {
      dot: true,
      nobrace,
      nocase,
      noext,
      noglobstar,
      optimizationLevel: 2,
      platform,
      nocomment: true,
      nonegate: true
    };
    for (const ign of ignored)
      this.add(ign);
  }
  add(ign) {
    const mm = new Minimatch(ign, this.mmopts);
    for (let i = 0; i < mm.set.length; i++) {
      const parsed = mm.set[i];
      const globParts = mm.globParts[i];
      if (!parsed || !globParts) {
        throw new Error("invalid pattern object");
      }
      while (parsed[0] === "." && globParts[0] === ".") {
        parsed.shift();
        globParts.shift();
      }
      const p = new Pattern(parsed, globParts, 0, this.platform);
      const m = new Minimatch(p.globString(), this.mmopts);
      const children = globParts[globParts.length - 1] === "**";
      const absolute = p.isAbsolute();
      if (absolute)
        this.absolute.push(m);
      else
        this.relative.push(m);
      if (children) {
        if (absolute)
          this.absoluteChildren.push(m);
        else
          this.relativeChildren.push(m);
      }
    }
  }
  ignored(p) {
    const fullpath = p.fullpath();
    const fullpaths = `${fullpath}/`;
    const relative = p.relative() || ".";
    const relatives = `${relative}/`;
    for (const m of this.relative) {
      if (m.match(relative) || m.match(relatives))
        return true;
    }
    for (const m of this.absolute) {
      if (m.match(fullpath) || m.match(fullpaths))
        return true;
    }
    return false;
  }
  childrenIgnored(p) {
    const fullpath = p.fullpath() + "/";
    const relative = (p.relative() || ".") + "/";
    for (const m of this.relativeChildren) {
      if (m.match(relative))
        return true;
    }
    for (const m of this.absoluteChildren) {
      if (m.match(fullpath))
        return true;
    }
    return false;
  }
};

// node_modules/glob/dist/esm/processor.js
var HasWalkedCache = class _HasWalkedCache {
  constructor(store = /* @__PURE__ */ new Map()) {
    __publicField(this, "store");
    this.store = store;
  }
  copy() {
    return new _HasWalkedCache(new Map(this.store));
  }
  hasWalked(target, pattern) {
    var _a6;
    return (_a6 = this.store.get(target.fullpath())) == null ? void 0 : _a6.has(pattern.globString());
  }
  storeWalked(target, pattern) {
    const fullpath = target.fullpath();
    const cached = this.store.get(fullpath);
    if (cached)
      cached.add(pattern.globString());
    else
      this.store.set(fullpath, /* @__PURE__ */ new Set([pattern.globString()]));
  }
};
var MatchRecord = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(target, absolute, ifDir) {
    const n2 = (absolute ? 2 : 0) | (ifDir ? 1 : 0);
    const current = this.store.get(target);
    this.store.set(target, current === void 0 ? n2 : n2 & current);
  }
  // match, absolute, ifdir
  entries() {
    return [...this.store.entries()].map(([path2, n2]) => [
      path2,
      !!(n2 & 2),
      !!(n2 & 1)
    ]);
  }
};
var SubWalks = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(target, pattern) {
    if (!target.canReaddir()) {
      return;
    }
    const subs = this.store.get(target);
    if (subs) {
      if (!subs.find((p) => p.globString() === pattern.globString())) {
        subs.push(pattern);
      }
    } else
      this.store.set(target, [pattern]);
  }
  get(target) {
    const subs = this.store.get(target);
    if (!subs) {
      throw new Error("attempting to walk unknown path");
    }
    return subs;
  }
  entries() {
    return this.keys().map((k) => [k, this.store.get(k)]);
  }
  keys() {
    return [...this.store.keys()].filter((t2) => t2.canReaddir());
  }
};
var Processor = class _Processor {
  constructor(opts, hasWalkedCache) {
    __publicField(this, "hasWalkedCache");
    __publicField(this, "matches", new MatchRecord());
    __publicField(this, "subwalks", new SubWalks());
    __publicField(this, "patterns");
    __publicField(this, "follow");
    __publicField(this, "dot");
    __publicField(this, "opts");
    this.opts = opts;
    this.follow = !!opts.follow;
    this.dot = !!opts.dot;
    this.hasWalkedCache = hasWalkedCache ? hasWalkedCache.copy() : new HasWalkedCache();
  }
  processPatterns(target, patterns) {
    this.patterns = patterns;
    const processingSet = patterns.map((p) => [target, p]);
    for (let [t2, pattern] of processingSet) {
      this.hasWalkedCache.storeWalked(t2, pattern);
      const root = pattern.root();
      const absolute = pattern.isAbsolute() && this.opts.absolute !== false;
      if (root) {
        t2 = t2.resolve(root === "/" && this.opts.root !== void 0 ? this.opts.root : root);
        const rest2 = pattern.rest();
        if (!rest2) {
          this.matches.add(t2, true, false);
          continue;
        } else {
          pattern = rest2;
        }
      }
      if (t2.isENOENT())
        continue;
      let p;
      let rest;
      let changed = false;
      while (typeof (p = pattern.pattern()) === "string" && (rest = pattern.rest())) {
        const c = t2.resolve(p);
        t2 = c;
        pattern = rest;
        changed = true;
      }
      p = pattern.pattern();
      rest = pattern.rest();
      if (changed) {
        if (this.hasWalkedCache.hasWalked(t2, pattern))
          continue;
        this.hasWalkedCache.storeWalked(t2, pattern);
      }
      if (typeof p === "string") {
        const ifDir = p === ".." || p === "" || p === ".";
        this.matches.add(t2.resolve(p), absolute, ifDir);
        continue;
      } else if (p === GLOBSTAR) {
        if (!t2.isSymbolicLink() || this.follow || pattern.checkFollowGlobstar()) {
          this.subwalks.add(t2, pattern);
        }
        const rp = rest == null ? void 0 : rest.pattern();
        const rrest = rest == null ? void 0 : rest.rest();
        if (!rest || (rp === "" || rp === ".") && !rrest) {
          this.matches.add(t2, absolute, rp === "" || rp === ".");
        } else {
          if (rp === "..") {
            const tp = t2.parent || t2;
            if (!rrest)
              this.matches.add(tp, absolute, true);
            else if (!this.hasWalkedCache.hasWalked(tp, rrest)) {
              this.subwalks.add(tp, rrest);
            }
          }
        }
      } else if (p instanceof RegExp) {
        this.subwalks.add(t2, pattern);
      }
    }
    return this;
  }
  subwalkTargets() {
    return this.subwalks.keys();
  }
  child() {
    return new _Processor(this.opts, this.hasWalkedCache);
  }
  // return a new Processor containing the subwalks for each
  // child entry, and a set of matches, and
  // a hasWalkedCache that's a copy of this one
  // then we're going to call
  filterEntries(parent, entries) {
    const patterns = this.subwalks.get(parent);
    const results = this.child();
    for (const e3 of entries) {
      for (const pattern of patterns) {
        const absolute = pattern.isAbsolute();
        const p = pattern.pattern();
        const rest = pattern.rest();
        if (p === GLOBSTAR) {
          results.testGlobstar(e3, pattern, rest, absolute);
        } else if (p instanceof RegExp) {
          results.testRegExp(e3, p, rest, absolute);
        } else {
          results.testString(e3, p, rest, absolute);
        }
      }
    }
    return results;
  }
  testGlobstar(e3, pattern, rest, absolute) {
    if (this.dot || !e3.name.startsWith(".")) {
      if (!pattern.hasMore()) {
        this.matches.add(e3, absolute, false);
      }
      if (e3.canReaddir()) {
        if (this.follow || !e3.isSymbolicLink()) {
          this.subwalks.add(e3, pattern);
        } else if (e3.isSymbolicLink()) {
          if (rest && pattern.checkFollowGlobstar()) {
            this.subwalks.add(e3, rest);
          } else if (pattern.markFollowGlobstar()) {
            this.subwalks.add(e3, pattern);
          }
        }
      }
    }
    if (rest) {
      const rp = rest.pattern();
      if (typeof rp === "string" && // dots and empty were handled already
      rp !== ".." && rp !== "" && rp !== ".") {
        this.testString(e3, rp, rest.rest(), absolute);
      } else if (rp === "..") {
        const ep = e3.parent || e3;
        this.subwalks.add(ep, rest);
      } else if (rp instanceof RegExp) {
        this.testRegExp(e3, rp, rest.rest(), absolute);
      }
    }
  }
  testRegExp(e3, p, rest, absolute) {
    if (!p.test(e3.name))
      return;
    if (!rest) {
      this.matches.add(e3, absolute, false);
    } else {
      this.subwalks.add(e3, rest);
    }
  }
  testString(e3, p, rest, absolute) {
    if (!e3.isNamed(p))
      return;
    if (!rest) {
      this.matches.add(e3, absolute, false);
    } else {
      this.subwalks.add(e3, rest);
    }
  }
};

// node_modules/glob/dist/esm/walker.js
var makeIgnore = (ignore, opts) => typeof ignore === "string" ? new Ignore([ignore], opts) : Array.isArray(ignore) ? new Ignore(ignore, opts) : ignore;
var _onResume, _ignore, _sep, _GlobUtil_instances, ignored_fn, childrenIgnored_fn;
var GlobUtil = class {
  constructor(patterns, path2, opts) {
    __privateAdd(this, _GlobUtil_instances);
    __publicField(this, "path");
    __publicField(this, "patterns");
    __publicField(this, "opts");
    __publicField(this, "seen", /* @__PURE__ */ new Set());
    __publicField(this, "paused", false);
    __publicField(this, "aborted", false);
    __privateAdd(this, _onResume, []);
    __privateAdd(this, _ignore);
    __privateAdd(this, _sep);
    __publicField(this, "signal");
    __publicField(this, "maxDepth");
    __publicField(this, "includeChildMatches");
    this.patterns = patterns;
    this.path = path2;
    this.opts = opts;
    __privateSet(this, _sep, !opts.posix && opts.platform === "win32" ? "\\" : "/");
    this.includeChildMatches = opts.includeChildMatches !== false;
    if (opts.ignore || !this.includeChildMatches) {
      __privateSet(this, _ignore, makeIgnore(opts.ignore ?? [], opts));
      if (!this.includeChildMatches && typeof __privateGet(this, _ignore).add !== "function") {
        const m = "cannot ignore child matches, ignore lacks add() method.";
        throw new Error(m);
      }
    }
    this.maxDepth = opts.maxDepth || Infinity;
    if (opts.signal) {
      this.signal = opts.signal;
      this.signal.addEventListener("abort", () => {
        __privateGet(this, _onResume).length = 0;
      });
    }
  }
  // backpressure mechanism
  pause() {
    this.paused = true;
  }
  resume() {
    var _a6;
    if ((_a6 = this.signal) == null ? void 0 : _a6.aborted)
      return;
    this.paused = false;
    let fn = void 0;
    while (!this.paused && (fn = __privateGet(this, _onResume).shift())) {
      fn();
    }
  }
  onResume(fn) {
    var _a6;
    if ((_a6 = this.signal) == null ? void 0 : _a6.aborted)
      return;
    if (!this.paused) {
      fn();
    } else {
      __privateGet(this, _onResume).push(fn);
    }
  }
  // do the requisite realpath/stat checking, and return the path
  // to add or undefined to filter it out.
  async matchCheck(e3, ifDir) {
    if (ifDir && this.opts.nodir)
      return void 0;
    let rpc;
    if (this.opts.realpath) {
      rpc = e3.realpathCached() || await e3.realpath();
      if (!rpc)
        return void 0;
      e3 = rpc;
    }
    const needStat = e3.isUnknown() || this.opts.stat;
    const s = needStat ? await e3.lstat() : e3;
    if (this.opts.follow && this.opts.nodir && (s == null ? void 0 : s.isSymbolicLink())) {
      const target = await s.realpath();
      if (target && (target.isUnknown() || this.opts.stat)) {
        await target.lstat();
      }
    }
    return this.matchCheckTest(s, ifDir);
  }
  matchCheckTest(e3, ifDir) {
    var _a6;
    return e3 && (this.maxDepth === Infinity || e3.depth() <= this.maxDepth) && (!ifDir || e3.canReaddir()) && (!this.opts.nodir || !e3.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !e3.isSymbolicLink() || !((_a6 = e3.realpathCached()) == null ? void 0 : _a6.isDirectory())) && !__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, e3) ? e3 : void 0;
  }
  matchCheckSync(e3, ifDir) {
    if (ifDir && this.opts.nodir)
      return void 0;
    let rpc;
    if (this.opts.realpath) {
      rpc = e3.realpathCached() || e3.realpathSync();
      if (!rpc)
        return void 0;
      e3 = rpc;
    }
    const needStat = e3.isUnknown() || this.opts.stat;
    const s = needStat ? e3.lstatSync() : e3;
    if (this.opts.follow && this.opts.nodir && (s == null ? void 0 : s.isSymbolicLink())) {
      const target = s.realpathSync();
      if (target && ((target == null ? void 0 : target.isUnknown()) || this.opts.stat)) {
        target.lstatSync();
      }
    }
    return this.matchCheckTest(s, ifDir);
  }
  matchFinish(e3, absolute) {
    var _a6;
    if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, e3))
      return;
    if (!this.includeChildMatches && ((_a6 = __privateGet(this, _ignore)) == null ? void 0 : _a6.add)) {
      const ign = `${e3.relativePosix()}/**`;
      __privateGet(this, _ignore).add(ign);
    }
    const abs = this.opts.absolute === void 0 ? absolute : this.opts.absolute;
    this.seen.add(e3);
    const mark = this.opts.mark && e3.isDirectory() ? __privateGet(this, _sep) : "";
    if (this.opts.withFileTypes) {
      this.matchEmit(e3);
    } else if (abs) {
      const abs2 = this.opts.posix ? e3.fullpathPosix() : e3.fullpath();
      this.matchEmit(abs2 + mark);
    } else {
      const rel = this.opts.posix ? e3.relativePosix() : e3.relative();
      const pre = this.opts.dotRelative && !rel.startsWith(".." + __privateGet(this, _sep)) ? "." + __privateGet(this, _sep) : "";
      this.matchEmit(!rel ? "." + mark : pre + rel + mark);
    }
  }
  async match(e3, absolute, ifDir) {
    const p = await this.matchCheck(e3, ifDir);
    if (p)
      this.matchFinish(p, absolute);
  }
  matchSync(e3, absolute, ifDir) {
    const p = this.matchCheckSync(e3, ifDir);
    if (p)
      this.matchFinish(p, absolute);
  }
  walkCB(target, patterns, cb) {
    var _a6;
    if ((_a6 = this.signal) == null ? void 0 : _a6.aborted)
      cb();
    this.walkCB2(target, patterns, new Processor(this.opts), cb);
  }
  walkCB2(target, patterns, processor, cb) {
    var _a6;
    if (__privateMethod(this, _GlobUtil_instances, childrenIgnored_fn).call(this, target))
      return cb();
    if ((_a6 = this.signal) == null ? void 0 : _a6.aborted)
      cb();
    if (this.paused) {
      this.onResume(() => this.walkCB2(target, patterns, processor, cb));
      return;
    }
    processor.processPatterns(target, patterns);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor.matches.entries()) {
      if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, m))
        continue;
      tasks++;
      this.match(m, absolute, ifDir).then(() => next());
    }
    for (const t2 of processor.subwalkTargets()) {
      if (this.maxDepth !== Infinity && t2.depth() >= this.maxDepth) {
        continue;
      }
      tasks++;
      const childrenCached = t2.readdirCached();
      if (t2.calledReaddir())
        this.walkCB3(t2, childrenCached, processor, next);
      else {
        t2.readdirCB((_, entries) => this.walkCB3(t2, entries, processor, next), true);
      }
    }
    next();
  }
  walkCB3(target, entries, processor, cb) {
    processor = processor.filterEntries(target, entries);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor.matches.entries()) {
      if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, m))
        continue;
      tasks++;
      this.match(m, absolute, ifDir).then(() => next());
    }
    for (const [target2, patterns] of processor.subwalks.entries()) {
      tasks++;
      this.walkCB2(target2, patterns, processor.child(), next);
    }
    next();
  }
  walkCBSync(target, patterns, cb) {
    var _a6;
    if ((_a6 = this.signal) == null ? void 0 : _a6.aborted)
      cb();
    this.walkCB2Sync(target, patterns, new Processor(this.opts), cb);
  }
  walkCB2Sync(target, patterns, processor, cb) {
    var _a6;
    if (__privateMethod(this, _GlobUtil_instances, childrenIgnored_fn).call(this, target))
      return cb();
    if ((_a6 = this.signal) == null ? void 0 : _a6.aborted)
      cb();
    if (this.paused) {
      this.onResume(() => this.walkCB2Sync(target, patterns, processor, cb));
      return;
    }
    processor.processPatterns(target, patterns);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor.matches.entries()) {
      if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, m))
        continue;
      this.matchSync(m, absolute, ifDir);
    }
    for (const t2 of processor.subwalkTargets()) {
      if (this.maxDepth !== Infinity && t2.depth() >= this.maxDepth) {
        continue;
      }
      tasks++;
      const children = t2.readdirSync();
      this.walkCB3Sync(t2, children, processor, next);
    }
    next();
  }
  walkCB3Sync(target, entries, processor, cb) {
    processor = processor.filterEntries(target, entries);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor.matches.entries()) {
      if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, m))
        continue;
      this.matchSync(m, absolute, ifDir);
    }
    for (const [target2, patterns] of processor.subwalks.entries()) {
      tasks++;
      this.walkCB2Sync(target2, patterns, processor.child(), next);
    }
    next();
  }
};
_onResume = new WeakMap();
_ignore = new WeakMap();
_sep = new WeakMap();
_GlobUtil_instances = new WeakSet();
ignored_fn = function(path2) {
  var _a6, _b4;
  return this.seen.has(path2) || !!((_b4 = (_a6 = __privateGet(this, _ignore)) == null ? void 0 : _a6.ignored) == null ? void 0 : _b4.call(_a6, path2));
};
childrenIgnored_fn = function(path2) {
  var _a6, _b4;
  return !!((_b4 = (_a6 = __privateGet(this, _ignore)) == null ? void 0 : _a6.childrenIgnored) == null ? void 0 : _b4.call(_a6, path2));
};
var GlobWalker = class extends GlobUtil {
  constructor(patterns, path2, opts) {
    super(patterns, path2, opts);
    __publicField(this, "matches", /* @__PURE__ */ new Set());
  }
  matchEmit(e3) {
    this.matches.add(e3);
  }
  async walk() {
    var _a6;
    if ((_a6 = this.signal) == null ? void 0 : _a6.aborted)
      throw this.signal.reason;
    if (this.path.isUnknown()) {
      await this.path.lstat();
    }
    await new Promise((res, rej) => {
      this.walkCB(this.path, this.patterns, () => {
        var _a7;
        if ((_a7 = this.signal) == null ? void 0 : _a7.aborted) {
          rej(this.signal.reason);
        } else {
          res(this.matches);
        }
      });
    });
    return this.matches;
  }
  walkSync() {
    var _a6;
    if ((_a6 = this.signal) == null ? void 0 : _a6.aborted)
      throw this.signal.reason;
    if (this.path.isUnknown()) {
      this.path.lstatSync();
    }
    this.walkCBSync(this.path, this.patterns, () => {
      var _a7;
      if ((_a7 = this.signal) == null ? void 0 : _a7.aborted)
        throw this.signal.reason;
    });
    return this.matches;
  }
};
var GlobStream = class extends GlobUtil {
  constructor(patterns, path2, opts) {
    super(patterns, path2, opts);
    __publicField(this, "results");
    this.results = new Minipass({
      signal: this.signal,
      objectMode: true
    });
    this.results.on("drain", () => this.resume());
    this.results.on("resume", () => this.resume());
  }
  matchEmit(e3) {
    this.results.write(e3);
    if (!this.results.flowing)
      this.pause();
  }
  stream() {
    const target = this.path;
    if (target.isUnknown()) {
      target.lstat().then(() => {
        this.walkCB(target, this.patterns, () => this.results.end());
      });
    } else {
      this.walkCB(target, this.patterns, () => this.results.end());
    }
    return this.results;
  }
  streamSync() {
    if (this.path.isUnknown()) {
      this.path.lstatSync();
    }
    this.walkCBSync(this.path, this.patterns, () => this.results.end());
    return this.results;
  }
};

// node_modules/glob/dist/esm/glob.js
var defaultPlatform3 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
var Glob = class {
  /**
   * All options are stored as properties on the `Glob` object.
   *
   * See {@link GlobOptions} for full options descriptions.
   *
   * Note that a previous `Glob` object can be passed as the
   * `GlobOptions` to another `Glob` instantiation to re-use settings
   * and caches with a new pattern.
   *
   * Traversal functions can be called multiple times to run the walk
   * again.
   */
  constructor(pattern, opts) {
    __publicField(this, "absolute");
    __publicField(this, "cwd");
    __publicField(this, "root");
    __publicField(this, "dot");
    __publicField(this, "dotRelative");
    __publicField(this, "follow");
    __publicField(this, "ignore");
    __publicField(this, "magicalBraces");
    __publicField(this, "mark");
    __publicField(this, "matchBase");
    __publicField(this, "maxDepth");
    __publicField(this, "nobrace");
    __publicField(this, "nocase");
    __publicField(this, "nodir");
    __publicField(this, "noext");
    __publicField(this, "noglobstar");
    __publicField(this, "pattern");
    __publicField(this, "platform");
    __publicField(this, "realpath");
    __publicField(this, "scurry");
    __publicField(this, "stat");
    __publicField(this, "signal");
    __publicField(this, "windowsPathsNoEscape");
    __publicField(this, "withFileTypes");
    __publicField(this, "includeChildMatches");
    /**
     * The options provided to the constructor.
     */
    __publicField(this, "opts");
    /**
     * An array of parsed immutable {@link Pattern} objects.
     */
    __publicField(this, "patterns");
    if (!opts)
      throw new TypeError("glob options required");
    this.withFileTypes = !!opts.withFileTypes;
    this.signal = opts.signal;
    this.follow = !!opts.follow;
    this.dot = !!opts.dot;
    this.dotRelative = !!opts.dotRelative;
    this.nodir = !!opts.nodir;
    this.mark = !!opts.mark;
    if (!opts.cwd) {
      this.cwd = "";
    } else if (opts.cwd instanceof URL || opts.cwd.startsWith("file://")) {
      opts.cwd = (0, import_node_url2.fileURLToPath)(opts.cwd);
    }
    this.cwd = opts.cwd || "";
    this.root = opts.root;
    this.magicalBraces = !!opts.magicalBraces;
    this.nobrace = !!opts.nobrace;
    this.noext = !!opts.noext;
    this.realpath = !!opts.realpath;
    this.absolute = opts.absolute;
    this.includeChildMatches = opts.includeChildMatches !== false;
    this.noglobstar = !!opts.noglobstar;
    this.matchBase = !!opts.matchBase;
    this.maxDepth = typeof opts.maxDepth === "number" ? opts.maxDepth : Infinity;
    this.stat = !!opts.stat;
    this.ignore = opts.ignore;
    if (this.withFileTypes && this.absolute !== void 0) {
      throw new Error("cannot set absolute and withFileTypes:true");
    }
    if (typeof pattern === "string") {
      pattern = [pattern];
    }
    this.windowsPathsNoEscape = !!opts.windowsPathsNoEscape || opts.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      pattern = pattern.map((p) => p.replace(/\\/g, "/"));
    }
    if (this.matchBase) {
      if (opts.noglobstar) {
        throw new TypeError("base matching requires globstar");
      }
      pattern = pattern.map((p) => p.includes("/") ? p : `./**/${p}`);
    }
    this.pattern = pattern;
    this.platform = opts.platform || defaultPlatform3;
    this.opts = { ...opts, platform: this.platform };
    if (opts.scurry) {
      this.scurry = opts.scurry;
      if (opts.nocase !== void 0 && opts.nocase !== opts.scurry.nocase) {
        throw new Error("nocase option contradicts provided scurry option");
      }
    } else {
      const Scurry = opts.platform === "win32" ? PathScurryWin32 : opts.platform === "darwin" ? PathScurryDarwin : opts.platform ? PathScurryPosix : PathScurry;
      this.scurry = new Scurry(this.cwd, {
        nocase: opts.nocase,
        fs: opts.fs
      });
    }
    this.nocase = this.scurry.nocase;
    const nocaseMagicOnly = this.platform === "darwin" || this.platform === "win32";
    const mmo = {
      // default nocase based on platform
      ...opts,
      dot: this.dot,
      matchBase: this.matchBase,
      nobrace: this.nobrace,
      nocase: this.nocase,
      nocaseMagicOnly,
      nocomment: true,
      noext: this.noext,
      nonegate: true,
      optimizationLevel: 2,
      platform: this.platform,
      windowsPathsNoEscape: this.windowsPathsNoEscape,
      debug: !!this.opts.debug
    };
    const mms = this.pattern.map((p) => new Minimatch(p, mmo));
    const [matchSet, globParts] = mms.reduce((set, m) => {
      set[0].push(...m.set);
      set[1].push(...m.globParts);
      return set;
    }, [[], []]);
    this.patterns = matchSet.map((set, i) => {
      const g = globParts[i];
      if (!g)
        throw new Error("invalid pattern object");
      return new Pattern(set, g, 0, this.platform);
    });
  }
  async walk() {
    return [
      ...await new GlobWalker(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches
      }).walk()
    ];
  }
  walkSync() {
    return [
      ...new GlobWalker(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches
      }).walkSync()
    ];
  }
  stream() {
    return new GlobStream(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).stream();
  }
  streamSync() {
    return new GlobStream(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).streamSync();
  }
  /**
   * Default sync iteration function. Returns a Generator that
   * iterates over the results.
   */
  iterateSync() {
    return this.streamSync()[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  /**
   * Default async iteration function. Returns an AsyncGenerator that
   * iterates over the results.
   */
  iterate() {
    return this.stream()[Symbol.asyncIterator]();
  }
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
};

// node_modules/glob/dist/esm/has-magic.js
var hasMagic = (pattern, options2 = {}) => {
  if (!Array.isArray(pattern)) {
    pattern = [pattern];
  }
  for (const p of pattern) {
    if (new Minimatch(p, options2).hasMagic())
      return true;
  }
  return false;
};

// node_modules/glob/dist/esm/index.js
function globStreamSync(pattern, options2 = {}) {
  return new Glob(pattern, options2).streamSync();
}
function globStream(pattern, options2 = {}) {
  return new Glob(pattern, options2).stream();
}
function globSync(pattern, options2 = {}) {
  return new Glob(pattern, options2).walkSync();
}
async function glob_(pattern, options2 = {}) {
  return new Glob(pattern, options2).walk();
}
function globIterateSync(pattern, options2 = {}) {
  return new Glob(pattern, options2).iterateSync();
}
function globIterate(pattern, options2 = {}) {
  return new Glob(pattern, options2).iterate();
}
var streamSync = globStreamSync;
var stream = Object.assign(globStream, { sync: globStreamSync });
var iterateSync = globIterateSync;
var iterate = Object.assign(globIterate, {
  sync: globIterateSync
});
var sync = Object.assign(globSync, {
  stream: globStreamSync,
  iterate: globIterateSync
});
var glob = Object.assign(glob_, {
  glob: glob_,
  globSync,
  sync,
  globStream,
  stream,
  globStreamSync,
  streamSync,
  globIterate,
  iterate,
  globIterateSync,
  iterateSync,
  Glob,
  hasMagic,
  escape,
  unescape
});
glob.glob = glob;

// node_modules/vitepress-sidebar/dist/sidebar.js
var import_fs3 = __toESM(require_fs(), 1);

// node_modules/qsu/dist/verify/isObject.js
function isObject(t2) {
  return null != t2 && Object.getPrototypeOf(t2) === Object.prototype;
}

// node_modules/qsu/dist/object/objMergeNewKey.js
function objMergeNewKey(r2, t2, o2) {
  if (!r2 || "object" != typeof r2 || !t2 || "object" != typeof t2) return null;
  const n2 = { ...r2 };
  return Object.keys(t2).forEach((r3) => {
    const i = t2[r3];
    if (Object.hasOwn(n2, r3)) if (Array.isArray(n2[r3]) && Array.isArray(i)) {
      if ("append" === (o2 == null ? void 0 : o2.arrayAction)) n2[r3].push(...i);
      else if ("replace" === (o2 == null ? void 0 : o2.arrayAction)) n2[r3] = i;
      else if (n2[r3].length === i.length) for (let t3 = 0; t3 < n2[r3].length; t3 += 1) {
        const s = i[t3];
        isObject(s) && (n2[r3][t3] = objMergeNewKey(n2[r3][t3], s, o2));
      }
    } else isObject(n2[r3]) && isObject(i) ? n2[r3] = objMergeNewKey(n2[r3], i, o2) : n2[r3] = i;
    else n2[r3] = i;
  }), n2;
}

// node_modules/qsu/dist/string/capitalizeFirst.js
function capitalizeFirst(t2) {
  return t2 ? t2.charAt(0).toUpperCase() + t2.slice(1) : "";
}

// node_modules/qsu/dist/verify/isTrueMinimumNumberOfTimes.js
function isTrueMinimumNumberOfTimes(e3, t2 = 1) {
  const n2 = e3.length;
  let o2 = 0;
  for (let t3 = 0; t3 < n2; t3 += 1) "boolean" == typeof e3[t3] && e3[t3] && (o2 += 1);
  return o2 >= t2;
}

// node_modules/vitepress-sidebar/dist/helper.js
var import_fs2 = __toESM(require_fs(), 1);
var import_gray_matter = __toESM(require_gray_matter(), 1);
function generateNotTogetherMessage(e3) {
  return `These options cannot be used together: ${e3.join(", ")}`;
}
function getValueFromFrontmatter(r2, o2, n2) {
  try {
    const n3 = (0, import_fs2.readFileSync)(r2, "utf-8"), { data: a } = (0, import_gray_matter.default)(n3);
    if (a == null ? void 0 : a[o2]) return a[o2];
    const i = n3.split("\n");
    let l2 = false;
    for (let e3 = 0, t2 = i.length; e3 < t2; e3 += 1) {
      const t3 = i[e3].toString().replace("\r", "");
      if (/^---$/.test(t3) && (l2 = true), new RegExp(`^${o2}: (.*)`).test(t3) && l2) return JSON.parse(t3.replace(`${o2}: `, ""));
    }
  } catch {
    return n2;
  }
  return n2;
}
function getOrderFromFrontmatter(e3, t2) {
  return parseFloat(getValueFromFrontmatter(e3, "order", t2.toString()));
}
function getDateFromFrontmatter(e3) {
  return getValueFromFrontmatter(e3, "date", "0001-01-01");
}
function getExcludeFromFrontmatter(e3, t2) {
  return !!t2 && getValueFromFrontmatter(e3, t2, false);
}
function formatTitle(e3, t2, o2 = false) {
  const n2 = [], a = [];
  let i = t2;
  if (i = i.replace(/<[^>]*>/g, (e4) => (n2.push(e4), "")), i = i.replace(/^(#+.*)$/gm, (e4) => (a.push(e4), "")), o2 && !e3.keepMarkdownSyntaxFromTitle && (i = i.replace(/\*{1,2}([^*]+?)\*{1,2}/g, "$1"), i = i.replace(/_{1,2}([^_]+?)_{1,2}/g, "$1"), i = i.replace(/~{1,2}([^~]+?)~{1,2}/g, "$1"), i = i.replace(/`{1,3}([^`]+?)`{1,3}/g, "$1")), e3.hyphenToSpace && (i = i.replace(/-/g, " ")), e3.underscoreToSpace && (i = i.replace(/_/g, " ")), e3.capitalizeEachWords) {
    let e4 = "";
    for (let t3 = 0; t3 < i.length; t3 += 1) 0 !== t3 && /[a-zA-Z0-9]/.test(e4) || !/[a-z]/.test(i[t3]) || (i = i.slice(0, t3) + i[t3].toUpperCase() + i.slice(t3 + 1)), e4 = i[t3];
  } else e3.capitalizeFirst && (i = capitalizeFirst(i));
  let l2 = -1, s = -1;
  return i = i.replace(new RegExp("", "g"), () => (l2 += 1, a[l2])), i = i.replace(new RegExp("", "g"), () => (s += 1, n2[s])), i;
}
function getTitleFromMd(t2, r2, o2, n2, a) {
  if (n2) return formatTitle(o2, t2);
  if (o2.useTitleFromFrontmatter) {
    let e3 = getValueFromFrontmatter(r2, o2.frontmatterTitleFieldName || "title", void 0);
    if (e3 || (e3 = getValueFromFrontmatter(r2, "title", void 0)), e3) return a == null ? void 0 : a(), formatTitle(o2, e3);
  }
  if (o2.useTitleFromFileHeading) try {
    const t3 = (0, import_fs2.readFileSync)(r2, "utf-8").split("\n");
    for (let e3 = 0, r3 = t3.length; e3 < r3; e3 += 1) {
      let r4 = t3[e3].toString().replace("\r", "");
      if (/^# /.test(r4)) {
        if (r4 = r4.replace(/^# /, ""), /\[(.*)]\(.*\)/.test(r4)) {
          const e4 = /(.*)?\[(.*)]\((.*)\)(.*)?/.exec(r4) || "";
          r4 = e4.length > 0 ? `${e4[1] || ""}${e4[2] || ""}${e4[4] || ""}` : "";
        }
        return a == null ? void 0 : a(), formatTitle(o2, r4, true);
      }
    }
  } catch {
    return "Unknown";
  }
  return formatTitle(o2, t2.replace(/\.md$/, ""));
}
function sortByFileTypes(e3, t2) {
  for (let r3 = 0; r3 < e3.length; r3 += 1) e3[r3].items && e3[r3].items.length && (e3[r3].items = sortByFileTypes(e3[r3].items, t2));
  const r2 = e3.filter((e4) => Object.hasOwn(e4, "items")), o2 = e3.filter((e4) => !Object.hasOwn(e4, "items"));
  return "top" === t2 ? [...r2, ...o2] : [...o2, ...r2];
}
function sortByObjectKey2(e3) {
  for (let t3 = 0; t3 < e3.arr.length; t3 += 1) e3.arr[t3].items && e3.arr[t3].items.length && (e3.arr[t3].items = sortByObjectKey2({ ...e3, arr: e3.arr[t3].items }));
  const t2 = new Intl.Collator([], { numeric: e3.numerically, sensitivity: "base" });
  let r2;
  if (e3.dateSortFromFrontmatter) r2 = e3.arr.sort((t3, r3) => new Date(t3[e3.key]).valueOf() - new Date(r3[e3.key]).valueOf()), e3.desc && (r2 = r2.reverse());
  else if (e3.dateSortFromTextWithPrefix) {
    const t3 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
    r2 = e3.arr.sort((r3, o2) => {
      var _a6, _b4;
      const n2 = (_a6 = r3[e3.key].split(t3)) == null ? void 0 : _a6[0], a = (_b4 = o2[e3.key].split(t3)) == null ? void 0 : _b4[0];
      return new Date(n2).valueOf() - new Date(a).valueOf();
    }), e3.desc && (r2 = r2.reverse());
  } else r2 = e3.arr.sort((r3, o2) => {
    const n2 = t2.compare(r3[e3.key], o2[e3.key]);
    return e3.desc ? -n2 : n2;
  });
  return r2;
}
function deepDeleteKey(e3, t2) {
  "object" == typeof e3 && null !== e3 && (Object.hasOwn(e3, t2) && delete e3[t2], Object.keys(e3).forEach((r2) => {
    "object" == typeof e3[r2] && deepDeleteKey(e3[r2], t2);
  }));
}
function removePrefixFromTitleAndLink(e3, t2) {
  const r2 = e3.length;
  for (let o2 = 0; o2 < r2; o2 += 1) {
    const r3 = e3[o2];
    for (let e4 = 0; e4 < Object.keys(r3).length; e4 += 1) {
      const o3 = Object.keys(r3)[e4];
      if ("text" === o3) {
        if (t2.prefixSeparator instanceof RegExp || -1 !== r3[o3].indexOf(t2.prefixSeparator)) {
          const e5 = r3[o3].split(t2.prefixSeparator);
          e5.shift(), r3[o3] = e5.join(t2.prefixSeparator);
        }
      } else "items" === o3 && (r3[o3] = removePrefixFromTitleAndLink(r3[o3], t2));
    }
  }
  return e3;
}
function debugPrint(e3, t2) {
  process.stdout.write(`
${"=".repeat(50)}
${JSON.stringify(e3, null, 2)}
${"-".repeat(50)}
${JSON.stringify(t2, null, 2)}
${"=".repeat(50)}

`);
}

// node_modules/vitepress-sidebar/dist/sidebar.js
function x2(e3, a, i, s, u) {
  if ("number" == typeof u.excludeByFolderDepth && u.excludeByFolderDepth <= e3) return [];
  const f = globSync("**", { cwd: a, maxDepth: 1, ignore: u.excludeByGlobPattern || u.excludePattern || [], dot: true, follow: u.followSymlinks ?? false });
  let P = (0, import_fs3.readdirSync)(a);
  if (u.manualSortFileNameByPriority.length > 0) {
    const e4 = P.filter((e5) => {
      var _a6;
      return -1 !== ((_a6 = u.manualSortFileNameByPriority) == null ? void 0 : _a6.indexOf(e5));
    }), r2 = P.filter((e5) => {
      var _a6;
      return -1 === ((_a6 = u.manualSortFileNameByPriority) == null ? void 0 : _a6.indexOf(e5));
    });
    e4.sort((e5, r3) => u.manualSortFileNameByPriority.indexOf(e5) - u.manualSortFileNameByPriority.indexOf(r3)), P = [...e4, ...r2];
  }
  let B = P.map((t2) => {
    const n2 = (0, import_path.resolve)(a, t2);
    let d = `${i}/${t2}`.replace(/\/{2}/, "/");
    if (d = d.endsWith("/index.md") ? d.replace("index.md", "") : d.replace(/\.md$/, ""), u.documentRootPath && d.startsWith(u.documentRootPath) && (1 === e3 && (d = d.replace(new RegExp(`^${u.documentRootPath}`, "g"), "")), u.scanStartPath || u.resolvePath ? (d = d.replace(/^\//g, ""), u.scanStartPath && (d = d.replace(new RegExp(`^${u.scanStartPath}`, "g"), "")), d = d.replace(/^\/(?!$)/g, ""), "/" === d && (d = "index.md")) : d.startsWith("/") || (d = `/${d}`)), d || (d = "index.md"), /\.vitepress/.test(n2)) return null;
    if (/node_modules/.test(n2)) return null;
    if (1 === e3 && "index.md" === t2 && !u.includeRootIndexFile) return null;
    if (1 !== e3 && "index.md" === t2 && !u.includeFolderIndexFile) return null;
    if (!u.includeDotFiles && /^\./.test(t2)) return null;
    if (!f.includes(t2)) return null;
    if ((0, import_fs3.statSync)(n2).isDirectory()) {
      let l2, a2 = x2(e3 + 1, n2, d, t2, u) || [], i2 = false, s2 = getTitleFromMd(t2, n2, u, true, () => {
        i2 = true;
      }), c = n2, f2 = false;
      const F = `${n2}/index.md`, h = a2.find((e4) => e4.text === t2);
      return u.useFolderLinkFromSameNameSubFile && h && (c = (0, import_path.resolve)(n2, `${h.text}.md`), s2 = getTitleFromMd(t2, c, u, false, () => {
        i2 = true;
      }), l2 = u.folderLinkNotIncludesFileName ? `${d}/` : h.link, a2 = a2.filter((e4) => e4.text !== t2)), (0, import_fs3.existsSync)(F) && (u.includeFolderIndexFile && (f2 = true), u.useFolderLinkFromIndexFile && (f2 = true, c = F, l2 = `${d}/index.md`), u.useFolderTitleFromIndexFile && !i2 && (f2 = true, c = F, s2 = getTitleFromMd("index", c, u, false))), l2 && false !== u.includeEmptyFolder || u.includeEmptyFolder || a2.length > 0 || f2 ? { text: s2, ...l2 ? { link: l2 } : {}, ...a2.length > 0 ? { items: a2 } : {}, ...null === u.collapsed || void 0 === u.collapsed || a2.length < 1 ? {} : { collapsed: e3 >= u.collapseDepth && u.collapsed }, ...u.sortMenusByFrontmatterOrder ? { order: getOrderFromFrontmatter(c, u.frontmatterOrderDefaultValue) } : {}, ...u.sortMenusByFrontmatterDate ? { date: getDateFromFrontmatter(n2) } : {} } : null;
    }
    if (n2.endsWith(".md")) {
      if (getExcludeFromFrontmatter(n2, u.excludeFilesByFrontmatterFieldName)) return null;
      let e4;
      const r2 = t2.replace(/\.md$/, "");
      return e4 = u.useFolderLinkFromSameNameSubFile && s === r2 ? r2 : getTitleFromMd(t2, n2, u, false), { text: e4, link: d, ...u.sortMenusByFrontmatterOrder ? { order: getOrderFromFrontmatter(n2, u.frontmatterOrderDefaultValue) } : {}, ...u.sortMenusByFrontmatterDate ? { date: getDateFromFrontmatter(n2) } : {} };
    }
    return null;
  }).filter((e4) => null !== e4);
  return u.sortMenusByName && (B = sortByObjectKey2({ arr: B, key: "text", desc: u.sortMenusOrderByDescending })), u.sortMenusByFileDatePrefix && (B = sortByObjectKey2({ arr: B, key: "text", desc: u.sortMenusOrderByDescending, dateSortFromTextWithPrefix: true, datePrefixSeparator: u.prefixSeparator })), u.sortMenusByFrontmatterOrder && (B = sortByObjectKey2({ arr: B, key: "order", desc: u.sortMenusOrderByDescending, numerically: true }), deepDeleteKey(B, "order")), u.sortMenusByFrontmatterDate && (B = sortByObjectKey2({ arr: B, key: "date", desc: u.sortMenusOrderByDescending, dateSortFromFrontmatter: true }), deepDeleteKey(B, "date")), u.sortMenusOrderNumericallyFromTitle && (B = sortByObjectKey2({ arr: B, key: "text", desc: u.sortMenusOrderByDescending, numerically: true })), u.sortMenusOrderNumericallyFromLink && (B = sortByObjectKey2({ arr: B, key: "link", desc: u.sortMenusOrderByDescending, numerically: true })), u.sortFolderTo && (B = sortByFileTypes(B, u.sortFolderTo)), B;
}
function generateSidebar(r2) {
  const t2 = {}, o2 = Array.isArray(r2);
  let n2, l2, i = false;
  if (arguments.length > 1) throw new Error("You must pass 1 argument, see the documentation for details.");
  n2 = void 0 === r2 ? [{}] : Array.isArray(r2) ? r2 : [r2];
  for (let r3 = 0; r3 < n2.length; r3 += 1) {
    const o3 = n2[r3];
    if (isTrueMinimumNumberOfTimes([o3.sortMenusByFrontmatterOrder, o3.sortMenusByName, o3.sortMenusByFileDatePrefix], 2)) throw new Error(generateNotTogetherMessage(["sortMenusByFrontmatterOrder", "sortMenusByName", "sortMenusByFileDatePrefix"]));
    if (isTrueMinimumNumberOfTimes([o3.sortMenusByFrontmatterOrder, o3.sortMenusOrderNumericallyFromTitle, o3.sortMenusOrderNumericallyFromLink], 2)) throw new Error(generateNotTogetherMessage(["sortMenusByFrontmatterOrder", "sortMenusOrderNumericallyFromTitle", "sortMenusOrderNumericallyFromLink"]));
    if (isTrueMinimumNumberOfTimes([o3.sortMenusByFrontmatterOrder, o3.sortMenusByFrontmatterDate], 2)) throw new Error(generateNotTogetherMessage(["sortMenusByFrontmatterOrder", "sortMenusByFrontmatterDate"]));
    if (o3.removePrefixAfterOrdering && !o3.prefixSeparator) throw new Error("'prefixSeparator' should not use empty string");
    o3.debugPrint && !i && (i = true), o3.documentRootPath = (o3 == null ? void 0 : o3.documentRootPath) ?? "/", /^\//.test(o3.documentRootPath) || (o3.documentRootPath = `/${o3.documentRootPath}`), o3.collapseDepth && (o3.collapsed = true), o3.prefixSeparator || (o3.prefixSeparator = "."), o3.collapseDepth = (o3 == null ? void 0 : o3.collapseDepth) ?? 1, o3.manualSortFileNameByPriority = (o3 == null ? void 0 : o3.manualSortFileNameByPriority) ?? [], o3.frontmatterOrderDefaultValue = (o3 == null ? void 0 : o3.frontmatterOrderDefaultValue) ?? 0;
    let l3 = o3.documentRootPath;
    o3.scanStartPath && (l3 = `${o3.documentRootPath}/${o3.scanStartPath}`.replace(/\/{2,}/g, "/").replace("/$", ""));
    let s = x2(1, (0, import_path.join)(process.cwd(), l3), l3, null, o3);
    o3.removePrefixAfterOrdering && (s = removePrefixFromTitleAndLink(s, o3)), t2[o3.resolvePath || "/"] = { base: o3.basePath || o3.resolvePath || "/", items: (s == null ? void 0 : s.items) || (o3.rootGroupText || o3.rootGroupLink || true === o3.rootGroupCollapsed || false === o3.rootGroupCollapsed ? [{ text: o3.rootGroupText, ...o3.rootGroupLink ? { link: o3.rootGroupLink } : {}, items: s, ...null === o3.rootGroupCollapsed ? {} : { collapsed: o3.rootGroupCollapsed } }] : s) };
  }
  return l2 = o2 || 1 !== Object.keys(t2).length ? t2 : Object.values(t2)[0].items, i && debugPrint(n2, l2), l2;
}
function withSidebar(e3, r2) {
  var _a6;
  let t2;
  t2 = void 0 === r2 ? [{}] : Array.isArray(r2) ? r2 : [r2];
  let o2 = false;
  t2.forEach((e4) => {
    (e4 == null ? void 0 : e4.debugPrint) && !o2 && (o2 = true, e4.debugPrint = false);
  });
  const n2 = { themeConfig: { sidebar: generateSidebar(r2) } };
  ((_a6 = e3 == null ? void 0 : e3.themeConfig) == null ? void 0 : _a6.sidebar) && (e3.themeConfig.sidebar = {});
  const l2 = objMergeNewKey(e3, n2);
  return o2 && debugPrint(r2, l2), l2;
}
export {
  generateSidebar,
  withSidebar
};
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=vitepress-sidebar.js.map
