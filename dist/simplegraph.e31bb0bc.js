// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"output/Main/foreign.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var svgNS = "http://www.w3.org/2000/svg";

var createSVGElement = function createSVGElement(name) {
  return document.createElementNS(svgNS, name);
};

var FONT_SIZE = 11;
var CORNER_RADIUS = 19;
var TEXT_PADDING_LEFT = 20;
var TEXT_PADDING_RIGHT = 20;
var TEXT_PADDING_TOP = 14;
var TEXT_PADDING_BOTTOM = 14;
var MAX_NODE_WIDTH = 250;
var MAX_NODES_PER_ROW = 3;
var ARROW_LENGTH = 5;
var STROKE_WIDTH = 2;
var ARROW = ARROW_LENGTH * STROKE_WIDTH; // Colours
// const BG_COL = "#090910"

var BG_COL = "#101014";
var BOX_COL = "rgba(32, 33, 40, 0.7)";
var TEXT_COL = "#D0D0D0";
var ARROW_COL = "rgba(255,255,255, 0.5)";
var defs = "<defs>\n    <marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"0\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L".concat(ARROW_LENGTH, ",3 z\" fill=\"").concat(ARROW_COL, "\" />\n      </marker>\n   </defs>");

exports.init = function () {
  var svg = createSVGElement("svg");
  svg.setAttribute("id", "graph");
  svg.setAttribute("height", 800);
  svg.setAttribute("width", 800);
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute("style", "background: ".concat(BG_COL));
  var container = document.getElementById("container");
  container.innerHTML = ''; // clear previous content

  container.appendChild(svg);
  svg.innerHTML = defs;
  return svg;
};

var appendNode = function appendNode(n, graph) {
  n.visible = false;
  n2 = graph.appendChild(n);
  width = n2.childNodes[1].getBBox().width;
  n.childNodes[0].setAttribute("width", Math.min(width + TEXT_PADDING_LEFT + TEXT_PADDING_RIGHT, MAX_NODE_WIDTH));
  n.childNodes[0].setAttribute("height", TEXT_PADDING_TOP + FONT_SIZE + TEXT_PADDING_BOTTOM);
  n.visible = true;
};

var createElement = function createElement() {
  var rect = createSVGElement("rect");
  rect.setAttribute("rx", CORNER_RADIUS);
  rect.setAttribute("ry", CORNER_RADIUS);
  rect.setAttribute("fill", BOX_COL);
  var title = createSVGElement("text");
  title.setAttribute("style", "font-weight:600;text-transform:uppercase");
  title.setAttribute("fill", TEXT_COL);
  title.setAttribute("alignment-baseline", "hanging");
  title.setAttribute("font-size", FONT_SIZE);
  title.setAttribute("font-family", "Inter,sans-serif");
  var text = document.createTextNode("-");
  title.appendChild(text);
  var group = createSVGElement("g");
  group.appendChild(rect);
  group.appendChild(title);
  return group;
};

var updateNode = function updateNode(name, point, group) {
  var _group$childNodes = _slicedToArray(group.childNodes, 2),
      rect = _group$childNodes[0],
      title = _group$childNodes[1];

  rect.setAttribute("x", point.x);
  rect.setAttribute("y", point.y);
  title.setAttribute("x", point.x + TEXT_PADDING_LEFT);
  title.setAttribute("y", point.y + TEXT_PADDING_TOP);
  var text = title.firstChild;
  text.nodeValue = name;
};

var createPathLoop = function createPathLoop(bb) {
  return "M".concat(bb.x + bb.width / 2 - CORNER_RADIUS / 2, " ").concat(bb.y, " A ").concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 1, 1, ").concat(bb.x + bb.width / 2 + CORNER_RADIUS / 2 + ARROW, " ").concat(bb.y - ARROW);
};

var createPathUp = function createPathUp(bb1, bb2) {
  return "M".concat(bb1.x + bb1.width / 2, " ").concat(bb1.y, " L ").concat(bb2.x + bb2.width / 2, " ").concat(bb2.y + bb2.height);
};

var createPathRight = function createPathRight(bb1, bb2) {
  return "M".concat(bb1.x + bb1.width, " ").concat(bb1.y + bb1.height / 2, " L ").concat(bb2.x - ARROW, " ").concat(bb2.y + bb2.height / 2);
};

var createPathDown = function createPathDown(bb1, bb2) {
  return "M".concat(bb1.x + bb1.width / 2, " ").concat(bb1.y, " L ").concat(bb2.x + bb2.width / 2, " ").concat(bb2.y + bb2.height);
};

var createPathLeft = function createPathLeft(bb1, bb2) {
  return "M".concat(bb1.x, " ").concat(bb1.y + bb1.height / 2, " L ").concat(bb2.x + bb2.width + ARROW, " ").concat(bb2.y + bb2.height / 2);
};

var createPathUpRight = function createPathUpRight(bb1, bb2) {
  var move = "M".concat(bb1.x + bb1.width / 2, ",").concat(bb1.y);
  var up1 = "v ".concat((bb2.y + bb2.height / 2 - (bb1.y - bb1.height / 2)) / 2 + CORNER_RADIUS);
  var corner1 = "a ".concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 0 1, ").concat(CORNER_RADIUS, " -").concat(CORNER_RADIUS);
  var right = "h ".concat(bb2.x + bb2.width / 2 - (bb1.x + bb1.width / 2) - 2 * CORNER_RADIUS);
  var corner2 = "a ".concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 0 0, ").concat(CORNER_RADIUS, " -").concat(CORNER_RADIUS);
  var up2 = "v ".concat((bb2.y + bb2.height / 2 - (bb1.y - bb1.height / 2)) / 2 + ARROW + CORNER_RADIUS);
  return "".concat(move, " ").concat(up1, " ").concat(corner1, " ").concat(right, " ").concat(corner2, " ").concat(up2);
};

var createPathDownRight = function createPathDownRight(bb1, bb2) {
  var move = "M".concat(bb1.x + bb1.width / 2, ",").concat(bb1.y + bb1.height);
  var down1 = "v ".concat((bb2.y - bb2.height / 2 - (bb1.y + bb1.height / 2)) / 2 - CORNER_RADIUS);
  var corner1 = "a ".concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 0 0, ").concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS);
  var right = "h ".concat(bb2.x + bb2.width / 2 - (bb1.x + bb1.width / 2) - 2 * CORNER_RADIUS);
  var corner2 = "a ".concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 0 1, ").concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS);
  var down2 = "v ".concat((bb2.y - bb2.height / 2 - (bb1.y + bb1.height / 2)) / 2 - ARROW - CORNER_RADIUS);
  return "".concat(move, " ").concat(down1, " ").concat(corner1, " ").concat(right, " ").concat(corner2, " ").concat(down2);
};

var createPathDownLeft = function createPathDownLeft(bb1, bb2) {
  var move = "M".concat(bb1.x + bb1.width / 2, ",").concat(bb1.y + bb1.height);
  var down1 = "v ".concat((bb2.y - bb2.height / 2 - (bb1.y + bb1.height / 2)) / 2 - CORNER_RADIUS);
  var corner1 = "a ".concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 0 1, -").concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS);
  var right = "h ".concat(bb2.x + bb2.width / 2 - (bb1.x + bb1.width / 2) + 2 * CORNER_RADIUS);
  var corner2 = "a ".concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 0 0, -").concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS);
  var down2 = "v ".concat((bb2.y - bb2.height / 2 - (bb1.y + bb1.height / 2)) / 2 - ARROW - CORNER_RADIUS);
  return "".concat(move, " ").concat(down1, " ").concat(corner1, " ").concat(right, " ").concat(corner2, " ").concat(down2);
};

var createPathUpLeft = function createPathUpLeft(bb1, bb2) {
  var move = "M".concat(bb1.x + bb1.width / 2, ",").concat(bb1.y);
  var up1 = "v ".concat((bb2.y + bb2.height / 2 - (bb1.y - bb1.height / 2)) / 2 + CORNER_RADIUS);
  var corner1 = "a ".concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 0 0, -").concat(CORNER_RADIUS, " -").concat(CORNER_RADIUS);
  var left = "h ".concat(bb2.x + bb2.width / 2 - (bb1.x + bb1.width / 2) + 2 * CORNER_RADIUS);
  var corner2 = "a ".concat(CORNER_RADIUS, " ").concat(CORNER_RADIUS, ", 0, 0 1, -").concat(CORNER_RADIUS, " -").concat(CORNER_RADIUS);
  var up2 = "v ".concat((bb2.y + bb2.height / 2 - (bb1.y - bb1.height / 2)) / 2 + ARROW + CORNER_RADIUS);
  return "".concat(move, " ").concat(up1, " ").concat(corner1, " ").concat(left, " ").concat(corner2, " ").concat(up2);
};

var createEdge = function createEdge() {
  // Line
  var path = createSVGElement("path");
  path.setAttribute("stroke", ARROW_COL);
  path.setAttribute("stroke-width", STROKE_WIDTH);
  path.setAttribute("fill", "none");
  path.setAttribute("marker-end", "url(#arrow)");
  return path;
};

var updateEdge = function updateEdge(path, vEdge) {
  path.setAttribute("d", vEdge);
};

var calculateVirtualEdge = function calculateVirtualEdge(n1, n2) {
  var bb1 = n1.getBBox();
  var bb2 = n2.getBBox();
  var down = bb2.y + bb2.height / 2 > bb1.y + bb1.height / 2;
  var up = bb2.y + bb2.height / 2 < bb1.y + bb1.height / 2;
  var left = bb2.x + bb2.width / 2 < bb1.x + bb1.width / 2;
  var right = bb2.x + bb2.width / 2 > bb1.x + bb1.width / 2;
  var toDraw;

  if (!up && !down && !right && !left) {
    toDraw = createPathLoop(bb1);
  } else if (up && !right && !left) {
    toDraw = createPathUp(bb1, bb2);
  } else if (down && !right && !left) {
    toDraw = createPathDown(bb1, bb2);
  } else if (left && !up && !down) {
    toDraw = createPathLeft(bb1, bb2);
  } else if (right && !up && !down) {
    toDraw = createPathRight(bb1, bb2);
  } else if (up && right) {
    toDraw = createPathUpRight(bb1, bb2);
  } else if (down && right) {
    toDraw = createPathDownRight(bb1, bb2);
  } else if (down && left) {
    toDraw = createPathDownLeft(bb1, bb2);
  } else if (up && left) {
    toDraw = createPathUpLeft(bb1, bb2);
  } else {
    console.error("Hit an unreachable case");
  }

  return toDraw;
}; // type VEdge = Path"
// type VNode = { position :: Point, width :: Number, height :: Number }


exports.render = function (graph) {
  return function (services) {
    return function (interactions) {
      return function () {
        if (!graph.elementCache || !graph.vdom) {
          // initialise elementCache
          console.log("initialising element cache");
          graph.elementCache = {};
          graph.edgeElementCache = {};
          graph.vdom = {
            vNodes: {},
            vEdges: {}
          };
        } // Calculate new node vDom


        var newVNodes = services.map(function (service, i) {
          return {
            service: service,
            x: i % MAX_NODES_PER_ROW * MAX_NODE_WIDTH,
            y: (i / MAX_NODES_PER_ROW | 0) * 100
          };
        });

        var vNodeDiff = function () {
          var result = [];
          var toDelete = {};
          Object.assign(toDelete, graph.vdom.vNodes);
          newVNodes.forEach(function (vNode) {
            var fromCache = graph.vdom.vNodes[vNode.service.id];

            if (!fromCache) {
              // Not in cache yet!
              result.push({
                type: "add",
                vNode: vNode
              });
            } else if (fromCache.x == vNode.x && fromCache.y == vNode.y) {// Cached and fine
            } else {
              // In cache but stale
              result.push({
                type: "update",
                vNode: vNode
              });
            } // Delete from toDelete means keep


            delete toDelete[vNode.service.id];
          });

          for (var key in toDelete) {
            result.push({
              type: "delete",
              id: toDelete[key].service.id
            });
          }

          return result;
        }(); // Apply VDom changes


        vNodeDiff.forEach(function (change) {
          if (change.type == "add") {
            // console.log("Create", change.vNode.service.id)
            var element = createElement();
            var position = {
              x: change.vNode.x,
              y: change.vNode.y
            };
            updateNode(change.vNode.service.name, position, element);
            appendNode(element, graph);
            graph.elementCache[change.vNode.service.id] = element;
            graph.vdom.vNodes[change.vNode.service.id] = change.vNode;
          } else if (change.type == "update") {
            // console.log("Update", change.vNode.service.id)
            var _element = graph.elementCache[change.vNode.service.id];
            var _position = {
              x: change.vNode.x,
              y: change.vNode.y
            };
            updateNode(change.vNode.service.name, _position, _element);
            graph.elementCache[change.vNode.service.id] = _element;
            graph.vdom.vNodes[change.vNode.service.id] = change.vNode;
          } else if (change.type == "delete") {
            // console.log("Delete", change.id)
            var _element2 = graph.elementCache[change.id];
            graph.removeChild(_element2);
            delete graph.elementCache[change.id];
            delete graph.vdom.vNodes[change.id];
          }
        }); // Calculate new edge vDom

        var newEdgeVNodes = interactions.map(function (interaction) {
          var fromNode = graph.elementCache[interaction.from];
          var toNode = graph.elementCache[interaction.to];
          var vEdge = calculateVirtualEdge(fromNode, toNode);
          return {
            from: interaction.from,
            to: interaction.to,
            vEdge: vEdge
          };
        });

        var vNodeEdgeDiff = function () {
          var result = [];
          var toDelete = Object.assign({}, graph.vdom.vEdges);
          newEdgeVNodes.forEach(function (_ref) {
            var vEdge = _ref.vEdge,
                from = _ref.from,
                to = _ref.to;
            var key = JSON.stringify({
              from: from,
              to: to
            });
            var fromCache = graph.vdom.vEdges[key];

            if (!fromCache) {
              // Not in cache yet!
              result.push({
                type: "add",
                vEdge: vEdge,
                key: key
              });
            } else if (fromCache == key) {// Cached and fine
            } else {
              // In cache but stale
              result.push({
                type: "update",
                vEdge: vEdge,
                key: key
              });
            } // Delete from toDelete means keep


            delete toDelete[key];
          });

          for (var key2 in toDelete) {
            result.push({
              type: "delete",
              key: key2
            });
          }

          return result;
        }(); // Apply VDom changes


        vNodeEdgeDiff.forEach(function (change) {
          if (change.type == "add") {
            // console.log("Create edge", change.key)
            var element = createEdge();
            graph.appendChild(element);
            updateEdge(element, change.vEdge);
            graph.edgeElementCache[change.key] = element;
            graph.vdom.vEdges[change.key] = change.vEdge;
          } else if (change.type == "update") {
            // console.log("Update edge", change.key)
            var _element3 = graph.edgeElementCache[change.key];
            updateEdge(_element3, change.vEdge);
            graph.edgeElementCache[change.key] = _element3;
            graph.vdom.vEdges[change.key] = change.vEdge;
          } else if (change.type == "delete") {
            // console.log("Delete edge", change.key)
            var _element4 = graph.edgeElementCache[change.key];
            graph.removeChild(_element4);
            delete graph.edgeElementCache[change.key];
            delete graph.vdom.vEdges[change.key];
          }
        });
      };
    };
  };
};

exports.render2 = function (graph) {
  return function (services) {
    return function (interactions) {
      return function () {
        if (!graph.elementCache || !graph.vdom) {
          // initialise elementCache
          console.log("initialising element cache");
          graph.elementCache = {};
          graph.edgeElementCache = {};
          graph.vdom = {
            vNodes: {},
            vEdges: {}
          };
        } // Calculate new node vDom


        var newVNodes = services.map(function (service, i) {
          return {
            service: service,
            x: i % MAX_NODES_PER_ROW * MAX_NODE_WIDTH,
            y: (i / MAX_NODES_PER_ROW | 0) * 100
          };
        });

        var vNodeDiff = function () {
          var result = [];
          var toDelete = {};
          Object.assign(toDelete, graph.vdom.vNodes);
          newVNodes.forEach(function (vNode) {
            var fromCache = graph.vdom.vNodes[vNode.service.id];

            if (!fromCache) {
              // Not in cache yet!
              result.push({
                type: "add",
                vNode: vNode
              });
            } else if (fromCache.x == vNode.x && fromCache.y == vNode.y) {// Cached and fine
            } else {
              // In cache but stale
              result.push({
                type: "update",
                vNode: vNode
              });
            } // Delete from toDelete means keep


            delete toDelete[vNode.service.id];
          });

          for (var key in toDelete) {
            result.push({
              type: "delete",
              id: toDelete[key].service.id
            });
          }

          return result;
        }(); // Apply VDom changes


        vNodeDiff.forEach(function (change) {
          if (change.type == "add") {
            // console.log("Create", change.vNode.service.id)
            var element = createElement();
            var position = {
              x: change.vNode.x,
              y: change.vNode.y
            };
            updateNode(change.vNode.service.name, position, element);
            appendNode(element, graph);
            graph.elementCache[change.vNode.service.id] = element;
            graph.vdom.vNodes[change.vNode.service.id] = change.vNode;
          } else if (change.type == "update") {
            // console.log("Update", change.vNode.service.id)
            var _element5 = graph.elementCache[change.vNode.service.id];
            var _position2 = {
              x: change.vNode.x,
              y: change.vNode.y
            };
            updateNode(change.vNode.service.name, _position2, _element5);
            graph.elementCache[change.vNode.service.id] = _element5;
            graph.vdom.vNodes[change.vNode.service.id] = change.vNode;
          } else if (change.type == "delete") {
            // console.log("Delete", change.id)
            var _element6 = graph.elementCache[change.id];
            graph.removeChild(_element6);
            delete graph.elementCache[change.id];
            delete graph.vdom.vNodes[change.id];
          }
        }); // Calculate new edge vDom

        var newEdgeVNodes = interactions.map(function (interaction) {
          var fromNode = graph.elementCache[interaction.from];
          var toNode = graph.elementCache[interaction.to];
          var vEdge = calculateVirtualEdge(fromNode, toNode);
          return {
            from: interaction.from,
            to: interaction.to,
            vEdge: vEdge
          };
        });

        var vNodeEdgeDiff = function () {
          var result = [];
          var toDelete = Object.assign({}, graph.vdom.vEdges);
          newEdgeVNodes.forEach(function (_ref2) {
            var vEdge = _ref2.vEdge,
                from = _ref2.from,
                to = _ref2.to;
            var key = JSON.stringify({
              from: from,
              to: to
            });
            var fromCache = graph.vdom.vEdges[key];

            if (!fromCache) {
              // Not in cache yet!
              result.push({
                type: "add",
                vEdge: vEdge,
                key: key
              });
            } else if (fromCache == key) {// Cached and fine
            } else {
              // In cache but stale
              result.push({
                type: "update",
                vEdge: vEdge,
                key: key
              });
            } // Delete from toDelete means keep


            delete toDelete[key];
          });

          for (var key2 in toDelete) {
            result.push({
              type: "delete",
              key: key2
            });
          }

          return result;
        }(); // Apply VDom changes


        vNodeEdgeDiff.forEach(function (change) {
          if (change.type == "add") {
            // console.log("Create edge", change.key)
            var element = createEdge();
            graph.appendChild(element);
            updateEdge(element, change.vEdge);
            graph.edgeElementCache[change.key] = element;
            graph.vdom.vEdges[change.key] = change.vEdge;
          } else if (change.type == "update") {
            // console.log("Update edge", change.key)
            var _element7 = graph.edgeElementCache[change.key];
            updateEdge(_element7, change.vEdge);
            graph.edgeElementCache[change.key] = _element7;
            graph.vdom.vEdges[change.key] = change.vEdge;
          } else if (change.type == "delete") {
            // console.log("Delete edge", change.key)
            var _element8 = graph.edgeElementCache[change.key];
            graph.removeChild(_element8);
            delete graph.edgeElementCache[change.key];
            delete graph.vdom.vEdges[change.key];
          }
        });
      };
    };
  };
};
},{}],"output/Control.Bind/foreign.js":[function(require,module,exports) {
"use strict";

exports.arrayBind = function (arr) {
  return function (f) {
    var result = [];

    for (var i = 0, l = arr.length; i < l; i++) {
      Array.prototype.push.apply(result, f(arr[i]));
    }

    return result;
  };
};
},{}],"output/Control.Apply/foreign.js":[function(require,module,exports) {
"use strict";

exports.arrayApply = function (fs) {
  return function (xs) {
    var l = fs.length;
    var k = xs.length;
    var result = new Array(l * k);
    var n = 0;

    for (var i = 0; i < l; i++) {
      var f = fs[i];

      for (var j = 0; j < k; j++) {
        result[n++] = f(xs[j]);
      }
    }

    return result;
  };
};
},{}],"output/Control.Semigroupoid/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Semigroupoid = function Semigroupoid(compose) {
  this.compose = compose;
};

var semigroupoidFn = new Semigroupoid(function (f) {
  return function (g) {
    return function (x) {
      return f(g(x));
    };
  };
});

var compose = function compose(dict) {
  return dict.compose;
};

var composeFlipped = function composeFlipped(dictSemigroupoid) {
  return function (f) {
    return function (g) {
      return compose(dictSemigroupoid)(g)(f);
    };
  };
};

module.exports = {
  compose: compose,
  Semigroupoid: Semigroupoid,
  composeFlipped: composeFlipped,
  semigroupoidFn: semigroupoidFn
};
},{}],"output/Control.Category/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");

var Category = function Category(Semigroupoid0, identity) {
  this.Semigroupoid0 = Semigroupoid0;
  this.identity = identity;
};

var identity = function identity(dict) {
  return dict.identity;
};

var categoryFn = new Category(function () {
  return Control_Semigroupoid.semigroupoidFn;
}, function (x) {
  return x;
});
module.exports = {
  Category: Category,
  identity: identity,
  categoryFn: categoryFn
};
},{"../Control.Semigroupoid/index.js":"output/Control.Semigroupoid/index.js"}],"output/Data.Boolean/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var otherwise = true;
module.exports = {
  otherwise: otherwise
};
},{}],"output/Data.Function/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Boolean = require("../Data.Boolean/index.js");

var on = function on(f) {
  return function (g) {
    return function (x) {
      return function (y) {
        return f(g(x))(g(y));
      };
    };
  };
};

var flip = function flip(f) {
  return function (b) {
    return function (a) {
      return f(a)(b);
    };
  };
};

var $$const = function $$const(a) {
  return function (v) {
    return a;
  };
};

var applyN = function applyN(f) {
  var go = function go($copy_n) {
    return function ($copy_acc) {
      var $tco_var_n = $copy_n;
      var $tco_done = false;
      var $tco_result;

      function $tco_loop(n, acc) {
        if (n <= 0) {
          $tco_done = true;
          return acc;
        }

        ;

        if (Data_Boolean.otherwise) {
          $tco_var_n = n - 1 | 0;
          $copy_acc = f(acc);
          return;
        }

        ;
        throw new Error("Failed pattern match at Data.Function (line 94, column 3 - line 96, column 37): " + [n.constructor.name, acc.constructor.name]);
      }

      ;

      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_n, $copy_acc);
      }

      ;
      return $tco_result;
    };
  };

  return go;
};

var applyFlipped = function applyFlipped(x) {
  return function (f) {
    return f(x);
  };
};

var apply = function apply(f) {
  return function (x) {
    return f(x);
  };
};

module.exports = {
  flip: flip,
  "const": $$const,
  apply: apply,
  applyFlipped: applyFlipped,
  applyN: applyN,
  on: on
};
},{"../Data.Boolean/index.js":"output/Data.Boolean/index.js"}],"output/Data.Functor/foreign.js":[function(require,module,exports) {
"use strict";

exports.arrayMap = function (f) {
  return function (arr) {
    var l = arr.length;
    var result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }

    return result;
  };
};
},{}],"output/Data.Unit/foreign.js":[function(require,module,exports) {
"use strict";

exports.unit = {};
},{}],"output/Data.Show/foreign.js":[function(require,module,exports) {
"use strict";

exports.showIntImpl = function (n) {
  return n.toString();
};

exports.showNumberImpl = function (n) {
  var str = n.toString();
  return isNaN(str + ".0") ? str : str + ".0";
};

exports.showCharImpl = function (c) {
  var code = c.charCodeAt(0);

  if (code < 0x20 || code === 0x7F) {
    switch (c) {
      case "\x07":
        return "'\\a'";

      case "\b":
        return "'\\b'";

      case "\f":
        return "'\\f'";

      case "\n":
        return "'\\n'";

      case "\r":
        return "'\\r'";

      case "\t":
        return "'\\t'";

      case "\v":
        return "'\\v'";
    }

    return "'\\" + code.toString(10) + "'";
  }

  return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
};

exports.showStringImpl = function (s) {
  var l = s.length;
  return "\"" + s.replace(/[\0-\x1F\x7F"\\]/g, // eslint-disable-line no-control-regex
  function (c, i) {
    switch (c) {
      case "\"":
      case "\\":
        return "\\" + c;

      case "\x07":
        return "\\a";

      case "\b":
        return "\\b";

      case "\f":
        return "\\f";

      case "\n":
        return "\\n";

      case "\r":
        return "\\r";

      case "\t":
        return "\\t";

      case "\v":
        return "\\v";
    }

    var k = i + 1;
    var empty = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
    return "\\" + c.charCodeAt(0).toString(10) + empty;
  }) + "\"";
};

exports.showArrayImpl = function (f) {
  return function (xs) {
    var ss = [];

    for (var i = 0, l = xs.length; i < l; i++) {
      ss[i] = f(xs[i]);
    }

    return "[" + ss.join(",") + "]";
  };
};

exports.cons = function (head) {
  return function (tail) {
    return [head].concat(tail);
  };
};

exports.join = function (separator) {
  return function (xs) {
    return xs.join(separator);
  };
};
},{}],"output/Data.Symbol/foreign.js":[function(require,module,exports) {
"use strict"; // module Data.Symbol

exports.unsafeCoerce = function (arg) {
  return arg;
};
},{}],"output/Data.Symbol/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var SProxy = function () {
  function SProxy() {}

  ;
  SProxy.value = new SProxy();
  return SProxy;
}();

var IsSymbol = function IsSymbol(reflectSymbol) {
  this.reflectSymbol = reflectSymbol;
};

var reifySymbol = function reifySymbol(s) {
  return function (f) {
    return $foreign.unsafeCoerce(function (dictIsSymbol) {
      return f(dictIsSymbol);
    })({
      reflectSymbol: function reflectSymbol(v) {
        return s;
      }
    })(SProxy.value);
  };
};

var reflectSymbol = function reflectSymbol(dict) {
  return dict.reflectSymbol;
};

module.exports = {
  IsSymbol: IsSymbol,
  reflectSymbol: reflectSymbol,
  reifySymbol: reifySymbol,
  SProxy: SProxy
};
},{"./foreign.js":"output/Data.Symbol/foreign.js"}],"output/Record.Unsafe/foreign.js":[function(require,module,exports) {
"use strict";

exports.unsafeHas = function (label) {
  return function (rec) {
    return {}.hasOwnProperty.call(rec, label);
  };
};

exports.unsafeGet = function (label) {
  return function (rec) {
    return rec[label];
  };
};

exports.unsafeSet = function (label) {
  return function (value) {
    return function (rec) {
      var copy = {};

      for (var key in rec) {
        if ({}.hasOwnProperty.call(rec, key)) {
          copy[key] = rec[key];
        }
      }

      copy[label] = value;
      return copy;
    };
  };
};

exports.unsafeDelete = function (label) {
  return function (rec) {
    var copy = {};

    for (var key in rec) {
      if (key !== label && {}.hasOwnProperty.call(rec, key)) {
        copy[key] = rec[key];
      }
    }

    return copy;
  };
};
},{}],"output/Record.Unsafe/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

module.exports = {
  unsafeHas: $foreign.unsafeHas,
  unsafeGet: $foreign.unsafeGet,
  unsafeSet: $foreign.unsafeSet,
  unsafeDelete: $foreign.unsafeDelete
};
},{"./foreign.js":"output/Record.Unsafe/foreign.js"}],"output/Type.Data.RowList/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var RLProxy = function () {
  function RLProxy() {}

  ;
  RLProxy.value = new RLProxy();
  return RLProxy;
}();

module.exports = {
  RLProxy: RLProxy
};
},{}],"output/Data.Show/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var ShowRecordFields = function ShowRecordFields(showRecordFields) {
  this.showRecordFields = showRecordFields;
};

var Show = function Show(show) {
  this.show = show;
};

var showString = new Show($foreign.showStringImpl);
var showRecordFieldsNil = new ShowRecordFields(function (v) {
  return function (v1) {
    return [];
  };
});

var showRecordFields = function showRecordFields(dict) {
  return dict.showRecordFields;
};

var showRecord = function showRecord(dictRowToList) {
  return function (dictShowRecordFields) {
    return new Show(function (record) {
      var v = showRecordFields(dictShowRecordFields)(Type_Data_RowList.RLProxy.value)(record);

      if (v.length === 0) {
        return "{}";
      }

      ;
      return $foreign.join(" ")(["{", $foreign.join(", ")(v), "}"]);
    });
  };
};

var showNumber = new Show($foreign.showNumberImpl);
var showInt = new Show($foreign.showIntImpl);
var showChar = new Show($foreign.showCharImpl);
var showBoolean = new Show(function (v) {
  if (v) {
    return "true";
  }

  ;

  if (!v) {
    return "false";
  }

  ;
  throw new Error("Failed pattern match at Data.Show (line 20, column 1 - line 22, column 23): " + [v.constructor.name]);
});

var show = function show(dict) {
  return dict.show;
};

var showArray = function showArray(dictShow) {
  return new Show($foreign.showArrayImpl(show(dictShow)));
};

var showRecordFieldsCons = function showRecordFieldsCons(dictIsSymbol) {
  return function (dictShowRecordFields) {
    return function (dictShow) {
      return new ShowRecordFields(function (v) {
        return function (record) {
          var tail = showRecordFields(dictShowRecordFields)(Type_Data_RowList.RLProxy.value)(record);
          var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
          var focus = Record_Unsafe.unsafeGet(key)(record);
          return $foreign.cons($foreign.join(": ")([key, show(dictShow)(focus)]))(tail);
        };
      });
    };
  };
};

module.exports = {
  Show: Show,
  show: show,
  ShowRecordFields: ShowRecordFields,
  showRecordFields: showRecordFields,
  showBoolean: showBoolean,
  showInt: showInt,
  showNumber: showNumber,
  showChar: showChar,
  showString: showString,
  showArray: showArray,
  showRecord: showRecord,
  showRecordFieldsNil: showRecordFieldsNil,
  showRecordFieldsCons: showRecordFieldsCons
};
},{"./foreign.js":"output/Data.Show/foreign.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Data.Unit/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Show = require("../Data.Show/index.js");

var showUnit = new Data_Show.Show(function (v) {
  return "unit";
});
module.exports = {
  showUnit: showUnit,
  unit: $foreign.unit
};
},{"./foreign.js":"output/Data.Unit/foreign.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Functor/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Functor = function Functor(map) {
  this.map = map;
};

var map = function map(dict) {
  return dict.map;
};

var mapFlipped = function mapFlipped(dictFunctor) {
  return function (fa) {
    return function (f) {
      return map(dictFunctor)(f)(fa);
    };
  };
};

var $$void = function $$void(dictFunctor) {
  return map(dictFunctor)(Data_Function["const"](Data_Unit.unit));
};

var voidLeft = function voidLeft(dictFunctor) {
  return function (f) {
    return function (x) {
      return map(dictFunctor)(Data_Function["const"](x))(f);
    };
  };
};

var voidRight = function voidRight(dictFunctor) {
  return function (x) {
    return map(dictFunctor)(Data_Function["const"](x));
  };
};

var functorFn = new Functor(Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn));
var functorArray = new Functor($foreign.arrayMap);

var flap = function flap(dictFunctor) {
  return function (ff) {
    return function (x) {
      return map(dictFunctor)(function (f) {
        return f(x);
      })(ff);
    };
  };
};

module.exports = {
  Functor: Functor,
  map: map,
  mapFlipped: mapFlipped,
  "void": $$void,
  voidRight: voidRight,
  voidLeft: voidLeft,
  flap: flap,
  functorFn: functorFn,
  functorArray: functorArray
};
},{"./foreign.js":"output/Data.Functor/foreign.js","../Control.Semigroupoid/index.js":"output/Control.Semigroupoid/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Control.Apply/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Apply = function Apply(Functor0, apply) {
  this.Functor0 = Functor0;
  this.apply = apply;
};

var applyFn = new Apply(function () {
  return Data_Functor.functorFn;
}, function (f) {
  return function (g) {
    return function (x) {
      return f(x)(g(x));
    };
  };
});
var applyArray = new Apply(function () {
  return Data_Functor.functorArray;
}, $foreign.arrayApply);

var apply = function apply(dict) {
  return dict.apply;
};

var applyFirst = function applyFirst(dictApply) {
  return function (a) {
    return function (b) {
      return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"])(a))(b);
    };
  };
};

var applySecond = function applySecond(dictApply) {
  return function (a) {
    return function (b) {
      return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"](Control_Category.identity(Control_Category.categoryFn)))(a))(b);
    };
  };
};

var lift2 = function lift2(dictApply) {
  return function (f) {
    return function (a) {
      return function (b) {
        return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b);
      };
    };
  };
};

var lift3 = function lift3(dictApply) {
  return function (f) {
    return function (a) {
      return function (b) {
        return function (c) {
          return apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c);
        };
      };
    };
  };
};

var lift4 = function lift4(dictApply) {
  return function (f) {
    return function (a) {
      return function (b) {
        return function (c) {
          return function (d) {
            return apply(dictApply)(apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c))(d);
          };
        };
      };
    };
  };
};

var lift5 = function lift5(dictApply) {
  return function (f) {
    return function (a) {
      return function (b) {
        return function (c) {
          return function (d) {
            return function (e) {
              return apply(dictApply)(apply(dictApply)(apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c))(d))(e);
            };
          };
        };
      };
    };
  };
};

module.exports = {
  Apply: Apply,
  apply: apply,
  applyFirst: applyFirst,
  applySecond: applySecond,
  lift2: lift2,
  lift3: lift3,
  lift4: lift4,
  lift5: lift5,
  applyFn: applyFn,
  applyArray: applyArray
};
},{"./foreign.js":"output/Control.Apply/foreign.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js"}],"output/Control.Bind/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Function = require("../Data.Function/index.js");

var Discard = function Discard(discard) {
  this.discard = discard;
};

var Bind = function Bind(Apply0, bind) {
  this.Apply0 = Apply0;
  this.bind = bind;
};

var discard = function discard(dict) {
  return dict.discard;
};

var bindFn = new Bind(function () {
  return Control_Apply.applyFn;
}, function (m) {
  return function (f) {
    return function (x) {
      return f(m(x))(x);
    };
  };
});
var bindArray = new Bind(function () {
  return Control_Apply.applyArray;
}, $foreign.arrayBind);

var bind = function bind(dict) {
  return dict.bind;
};

var bindFlipped = function bindFlipped(dictBind) {
  return Data_Function.flip(bind(dictBind));
};

var composeKleisliFlipped = function composeKleisliFlipped(dictBind) {
  return function (f) {
    return function (g) {
      return function (a) {
        return bindFlipped(dictBind)(f)(g(a));
      };
    };
  };
};

var composeKleisli = function composeKleisli(dictBind) {
  return function (f) {
    return function (g) {
      return function (a) {
        return bind(dictBind)(f(a))(g);
      };
    };
  };
};

var discardUnit = new Discard(function (dictBind) {
  return bind(dictBind);
});

var ifM = function ifM(dictBind) {
  return function (cond) {
    return function (t) {
      return function (f) {
        return bind(dictBind)(cond)(function (cond$prime) {
          if (cond$prime) {
            return t;
          }

          ;
          return f;
        });
      };
    };
  };
};

var join = function join(dictBind) {
  return function (m) {
    return bind(dictBind)(m)(Control_Category.identity(Control_Category.categoryFn));
  };
};

module.exports = {
  Bind: Bind,
  bind: bind,
  bindFlipped: bindFlipped,
  Discard: Discard,
  discard: discard,
  join: join,
  composeKleisli: composeKleisli,
  composeKleisliFlipped: composeKleisliFlipped,
  ifM: ifM,
  bindFn: bindFn,
  bindArray: bindArray,
  discardUnit: discardUnit
};
},{"./foreign.js":"output/Control.Bind/foreign.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Function/index.js":"output/Data.Function/index.js"}],"output/Data.Array/foreign.js":[function(require,module,exports) {
"use strict"; //------------------------------------------------------------------------------
// Array creation --------------------------------------------------------------
//------------------------------------------------------------------------------

exports.range = function (start) {
  return function (end) {
    var step = start > end ? -1 : 1;
    var result = new Array(step * (end - start) + 1);
    var i = start,
        n = 0;

    while (i !== end) {
      result[n++] = i;
      i += step;
    }

    result[n] = i;
    return result;
  };
};

var replicateFill = function replicateFill(count) {
  return function (value) {
    if (count < 1) {
      return [];
    }

    var result = new Array(count);
    return result.fill(value);
  };
};

var replicatePolyfill = function replicatePolyfill(count) {
  return function (value) {
    var result = [];
    var n = 0;

    for (var i = 0; i < count; i++) {
      result[n++] = value;
    }

    return result;
  };
}; // In browsers that have Array.prototype.fill we use it, as it's faster.


exports.replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;

exports.fromFoldableImpl = function () {
  function Cons(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  var emptyList = {};

  function curryCons(head) {
    return function (tail) {
      return new Cons(head, tail);
    };
  }

  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;

    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }

    return result;
  }

  return function (foldr) {
    return function (xs) {
      return listToArray(foldr(curryCons)(emptyList)(xs));
    };
  };
}(); //------------------------------------------------------------------------------
// Array size ------------------------------------------------------------------
//------------------------------------------------------------------------------


exports.length = function (xs) {
  return xs.length;
}; //------------------------------------------------------------------------------
// Extending arrays ------------------------------------------------------------
//------------------------------------------------------------------------------


exports.cons = function (e) {
  return function (l) {
    return [e].concat(l);
  };
};

exports.snoc = function (l) {
  return function (e) {
    var l1 = l.slice();
    l1.push(e);
    return l1;
  };
}; //------------------------------------------------------------------------------
// Non-indexed reads -----------------------------------------------------------
//------------------------------------------------------------------------------


exports["uncons'"] = function (empty) {
  return function (next) {
    return function (xs) {
      return xs.length === 0 ? empty({}) : next(xs[0])(xs.slice(1));
    };
  };
}; //------------------------------------------------------------------------------
// Indexed operations ----------------------------------------------------------
//------------------------------------------------------------------------------


exports.indexImpl = function (just) {
  return function (nothing) {
    return function (xs) {
      return function (i) {
        return i < 0 || i >= xs.length ? nothing : just(xs[i]);
      };
    };
  };
};

exports.findIndexImpl = function (just) {
  return function (nothing) {
    return function (f) {
      return function (xs) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (f(xs[i])) return just(i);
        }

        return nothing;
      };
    };
  };
};

exports.findLastIndexImpl = function (just) {
  return function (nothing) {
    return function (f) {
      return function (xs) {
        for (var i = xs.length - 1; i >= 0; i--) {
          if (f(xs[i])) return just(i);
        }

        return nothing;
      };
    };
  };
};

exports._insertAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (a) {
        return function (l) {
          if (i < 0 || i > l.length) return nothing;
          var l1 = l.slice();
          l1.splice(i, 0, a);
          return just(l1);
        };
      };
    };
  };
};

exports._deleteAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (l) {
        if (i < 0 || i >= l.length) return nothing;
        var l1 = l.slice();
        l1.splice(i, 1);
        return just(l1);
      };
    };
  };
};

exports._updateAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (a) {
        return function (l) {
          if (i < 0 || i >= l.length) return nothing;
          var l1 = l.slice();
          l1[i] = a;
          return just(l1);
        };
      };
    };
  };
}; //------------------------------------------------------------------------------
// Transformations -------------------------------------------------------------
//------------------------------------------------------------------------------


exports.reverse = function (l) {
  return l.slice().reverse();
};

exports.concat = function (xss) {
  if (xss.length <= 10000) {
    // This method is faster, but it crashes on big arrays.
    // So we use it when can and fallback to simple variant otherwise.
    return Array.prototype.concat.apply([], xss);
  }

  var result = [];

  for (var i = 0, l = xss.length; i < l; i++) {
    var xs = xss[i];

    for (var j = 0, m = xs.length; j < m; j++) {
      result.push(xs[j]);
    }
  }

  return result;
};

exports.filter = function (f) {
  return function (xs) {
    return xs.filter(f);
  };
};

exports.partition = function (f) {
  return function (xs) {
    var yes = [];
    var no = [];

    for (var i = 0; i < xs.length; i++) {
      var x = xs[i];
      if (f(x)) yes.push(x);else no.push(x);
    }

    return {
      yes: yes,
      no: no
    };
  };
}; //------------------------------------------------------------------------------
// Sorting ---------------------------------------------------------------------
//------------------------------------------------------------------------------


exports.sortImpl = function (f) {
  return function (l) {
    return l.slice().sort(function (x, y) {
      return f(x)(y);
    });
  };
}; //------------------------------------------------------------------------------
// Subarrays -------------------------------------------------------------------
//------------------------------------------------------------------------------


exports.slice = function (s) {
  return function (e) {
    return function (l) {
      return l.slice(s, e);
    };
  };
};

exports.take = function (n) {
  return function (l) {
    return n < 1 ? [] : l.slice(0, n);
  };
};

exports.drop = function (n) {
  return function (l) {
    return n < 1 ? l : l.slice(n);
  };
}; //------------------------------------------------------------------------------
// Zipping ---------------------------------------------------------------------
//------------------------------------------------------------------------------


exports.zipWith = function (f) {
  return function (xs) {
    return function (ys) {
      var l = xs.length < ys.length ? xs.length : ys.length;
      var result = new Array(l);

      for (var i = 0; i < l; i++) {
        result[i] = f(xs[i])(ys[i]);
      }

      return result;
    };
  };
}; //------------------------------------------------------------------------------
// Partial ---------------------------------------------------------------------
//------------------------------------------------------------------------------


exports.unsafeIndexImpl = function (xs) {
  return function (n) {
    return xs[n];
  };
};
},{}],"output/Data.Semigroup/foreign.js":[function(require,module,exports) {
"use strict";

exports.concatString = function (s1) {
  return function (s2) {
    return s1 + s2;
  };
};

exports.concatArray = function (xs) {
  return function (ys) {
    if (xs.length === 0) return ys;
    if (ys.length === 0) return xs;
    return xs.concat(ys);
  };
};
},{}],"output/Data.Void/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Show = require("../Data.Show/index.js");

var Void = function Void(x) {
  return x;
};

var absurd = function absurd(a) {
  var spin = function spin($copy_v) {
    var $tco_result;

    function $tco_loop(v) {
      $copy_v = v;
      return;
    }

    ;

    while (!false) {
      $tco_result = $tco_loop($copy_v);
    }

    ;
    return $tco_result;
  };

  return spin(a);
};

var showVoid = new Data_Show.Show(absurd);
module.exports = {
  absurd: absurd,
  showVoid: showVoid
};
},{"../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Semigroup/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Data_Void = require("../Data.Void/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var SemigroupRecord = function SemigroupRecord(appendRecord) {
  this.appendRecord = appendRecord;
};

var Semigroup = function Semigroup(append) {
  this.append = append;
};

var semigroupVoid = new Semigroup(function (v) {
  return Data_Void.absurd;
});
var semigroupUnit = new Semigroup(function (v) {
  return function (v1) {
    return Data_Unit.unit;
  };
});
var semigroupString = new Semigroup($foreign.concatString);
var semigroupRecordNil = new SemigroupRecord(function (v) {
  return function (v1) {
    return function (v2) {
      return {};
    };
  };
});
var semigroupArray = new Semigroup($foreign.concatArray);

var appendRecord = function appendRecord(dict) {
  return dict.appendRecord;
};

var semigroupRecord = function semigroupRecord(dictRowToList) {
  return function (dictSemigroupRecord) {
    return new Semigroup(appendRecord(dictSemigroupRecord)(Type_Data_RowList.RLProxy.value));
  };
};

var append = function append(dict) {
  return dict.append;
};

var semigroupFn = function semigroupFn(dictSemigroup) {
  return new Semigroup(function (f) {
    return function (g) {
      return function (x) {
        return append(dictSemigroup)(f(x))(g(x));
      };
    };
  });
};

var semigroupRecordCons = function semigroupRecordCons(dictIsSymbol) {
  return function (dictCons) {
    return function (dictSemigroupRecord) {
      return function (dictSemigroup) {
        return new SemigroupRecord(function (v) {
          return function (ra) {
            return function (rb) {
              var tail = appendRecord(dictSemigroupRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var insert = Record_Unsafe.unsafeSet(key);
              var get = Record_Unsafe.unsafeGet(key);
              return insert(append(dictSemigroup)(get(ra))(get(rb)))(tail);
            };
          };
        });
      };
    };
  };
};

module.exports = {
  Semigroup: Semigroup,
  append: append,
  SemigroupRecord: SemigroupRecord,
  appendRecord: appendRecord,
  semigroupString: semigroupString,
  semigroupUnit: semigroupUnit,
  semigroupVoid: semigroupVoid,
  semigroupFn: semigroupFn,
  semigroupArray: semigroupArray,
  semigroupRecord: semigroupRecord,
  semigroupRecordNil: semigroupRecordNil,
  semigroupRecordCons: semigroupRecordCons
};
},{"./foreign.js":"output/Data.Semigroup/foreign.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Data.Void/index.js":"output/Data.Void/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Control.Alt/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Functor = require("../Data.Functor/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Alt = function Alt(Functor0, alt) {
  this.Functor0 = Functor0;
  this.alt = alt;
};

var altArray = new Alt(function () {
  return Data_Functor.functorArray;
}, Data_Semigroup.append(Data_Semigroup.semigroupArray));

var alt = function alt(dict) {
  return dict.alt;
};

module.exports = {
  Alt: Alt,
  alt: alt,
  altArray: altArray
};
},{"../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js"}],"output/Control.Applicative/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Apply = require("../Control.Apply/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Applicative = function Applicative(Apply0, pure) {
  this.Apply0 = Apply0;
  this.pure = pure;
};

var pure = function pure(dict) {
  return dict.pure;
};

var unless = function unless(dictApplicative) {
  return function (v) {
    return function (v1) {
      if (!v) {
        return v1;
      }

      ;

      if (v) {
        return pure(dictApplicative)(Data_Unit.unit);
      }

      ;
      throw new Error("Failed pattern match at Control.Applicative (line 62, column 1 - line 62, column 65): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};

var when = function when(dictApplicative) {
  return function (v) {
    return function (v1) {
      if (v) {
        return v1;
      }

      ;

      if (!v) {
        return pure(dictApplicative)(Data_Unit.unit);
      }

      ;
      throw new Error("Failed pattern match at Control.Applicative (line 57, column 1 - line 57, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};

var liftA1 = function liftA1(dictApplicative) {
  return function (f) {
    return function (a) {
      return Control_Apply.apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
    };
  };
};

var applicativeFn = new Applicative(function () {
  return Control_Apply.applyFn;
}, function (x) {
  return function (v) {
    return x;
  };
});
var applicativeArray = new Applicative(function () {
  return Control_Apply.applyArray;
}, function (x) {
  return [x];
});
module.exports = {
  Applicative: Applicative,
  pure: pure,
  liftA1: liftA1,
  unless: unless,
  when: when,
  applicativeFn: applicativeFn,
  applicativeArray: applicativeArray
};
},{"../Control.Apply/index.js":"output/Control.Apply/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Control.Lazy/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Unit = require("../Data.Unit/index.js");

var Lazy = function Lazy(defer) {
  this.defer = defer;
};

var lazyUnit = new Lazy(function (v) {
  return Data_Unit.unit;
});
var lazyFn = new Lazy(function (f) {
  return function (x) {
    return f(Data_Unit.unit)(x);
  };
});

var defer = function defer(dict) {
  return dict.defer;
};

var fix = function fix(dictLazy) {
  return function (f) {
    var go = defer(dictLazy)(function (v) {
      return f(go);
    });
    return go;
  };
};

module.exports = {
  defer: defer,
  Lazy: Lazy,
  fix: fix,
  lazyFn: lazyFn,
  lazyUnit: lazyUnit
};
},{"../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Control.Monad/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Monad = function Monad(Applicative0, Bind1) {
  this.Applicative0 = Applicative0;
  this.Bind1 = Bind1;
};

var whenM = function whenM(dictMonad) {
  return function (mb) {
    return function (m) {
      return Control_Bind.bind(dictMonad.Bind1())(mb)(function (b) {
        return Control_Applicative.when(dictMonad.Applicative0())(b)(m);
      });
    };
  };
};

var unlessM = function unlessM(dictMonad) {
  return function (mb) {
    return function (m) {
      return Control_Bind.bind(dictMonad.Bind1())(mb)(function (b) {
        return Control_Applicative.unless(dictMonad.Applicative0())(b)(m);
      });
    };
  };
};

var monadFn = new Monad(function () {
  return Control_Applicative.applicativeFn;
}, function () {
  return Control_Bind.bindFn;
});
var monadArray = new Monad(function () {
  return Control_Applicative.applicativeArray;
}, function () {
  return Control_Bind.bindArray;
});

var liftM1 = function liftM1(dictMonad) {
  return function (f) {
    return function (a) {
      return Control_Bind.bind(dictMonad.Bind1())(a)(function (a$prime) {
        return Control_Applicative.pure(dictMonad.Applicative0())(f(a$prime));
      });
    };
  };
};

var ap = function ap(dictMonad) {
  return function (f) {
    return function (a) {
      return Control_Bind.bind(dictMonad.Bind1())(f)(function (f$prime) {
        return Control_Bind.bind(dictMonad.Bind1())(a)(function (a$prime) {
          return Control_Applicative.pure(dictMonad.Applicative0())(f$prime(a$prime));
        });
      });
    };
  };
};

module.exports = {
  Monad: Monad,
  liftM1: liftM1,
  ap: ap,
  whenM: whenM,
  unlessM: unlessM,
  monadFn: monadFn,
  monadArray: monadArray
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js"}],"output/Data.Bifunctor/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Category = require("../Control.Category/index.js");

var Bifunctor = function Bifunctor(bimap) {
  this.bimap = bimap;
};

var bimap = function bimap(dict) {
  return dict.bimap;
};

var lmap = function lmap(dictBifunctor) {
  return function (f) {
    return bimap(dictBifunctor)(f)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var rmap = function rmap(dictBifunctor) {
  return bimap(dictBifunctor)(Control_Category.identity(Control_Category.categoryFn));
};

module.exports = {
  bimap: bimap,
  Bifunctor: Bifunctor,
  lmap: lmap,
  rmap: rmap
};
},{"../Control.Category/index.js":"output/Control.Category/index.js"}],"output/Control.Extend/foreign.js":[function(require,module,exports) {
"use strict";

exports.arrayExtend = function (f) {
  return function (xs) {
    return xs.map(function (_, i, xs) {
      return f(xs.slice(i));
    });
  };
};
},{}],"output/Control.Extend/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Extend = function Extend(Functor0, extend) {
  this.Functor0 = Functor0;
  this.extend = extend;
};

var extendFn = function extendFn(dictSemigroup) {
  return new Extend(function () {
    return Data_Functor.functorFn;
  }, function (f) {
    return function (g) {
      return function (w) {
        return f(function (w$prime) {
          return g(Data_Semigroup.append(dictSemigroup)(w)(w$prime));
        });
      };
    };
  });
};

var extendArray = new Extend(function () {
  return Data_Functor.functorArray;
}, $foreign.arrayExtend);

var extend = function extend(dict) {
  return dict.extend;
};

var extendFlipped = function extendFlipped(dictExtend) {
  return function (w) {
    return function (f) {
      return extend(dictExtend)(f)(w);
    };
  };
};

var duplicate = function duplicate(dictExtend) {
  return extend(dictExtend)(Control_Category.identity(Control_Category.categoryFn));
};

var composeCoKleisliFlipped = function composeCoKleisliFlipped(dictExtend) {
  return function (f) {
    return function (g) {
      return function (w) {
        return f(extend(dictExtend)(g)(w));
      };
    };
  };
};

var composeCoKleisli = function composeCoKleisli(dictExtend) {
  return function (f) {
    return function (g) {
      return function (w) {
        return g(extend(dictExtend)(f)(w));
      };
    };
  };
};

module.exports = {
  Extend: Extend,
  extend: extend,
  extendFlipped: extendFlipped,
  composeCoKleisli: composeCoKleisli,
  composeCoKleisliFlipped: composeCoKleisliFlipped,
  duplicate: duplicate,
  extendFn: extendFn,
  extendArray: extendArray
};
},{"./foreign.js":"output/Control.Extend/foreign.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js"}],"output/Data.Foldable/foreign.js":[function(require,module,exports) {
"use strict";

exports.foldrArray = function (f) {
  return function (init) {
    return function (xs) {
      var acc = init;
      var len = xs.length;

      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }

      return acc;
    };
  };
};

exports.foldlArray = function (f) {
  return function (init) {
    return function (xs) {
      var acc = init;
      var len = xs.length;

      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }

      return acc;
    };
  };
};
},{}],"output/Control.Plus/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Plus = function Plus(Alt0, empty) {
  this.Alt0 = Alt0;
  this.empty = empty;
};

var plusArray = new Plus(function () {
  return Control_Alt.altArray;
}, []);

var empty = function empty(dict) {
  return dict.empty;
};

module.exports = {
  Plus: Plus,
  empty: empty,
  plusArray: plusArray
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js"}],"output/Data.Eq/foreign.js":[function(require,module,exports) {
"use strict";

var refEq = function refEq(r1) {
  return function (r2) {
    return r1 === r2;
  };
};

exports.eqBooleanImpl = refEq;
exports.eqIntImpl = refEq;
exports.eqNumberImpl = refEq;
exports.eqCharImpl = refEq;
exports.eqStringImpl = refEq;

exports.eqArrayImpl = function (f) {
  return function (xs) {
    return function (ys) {
      if (xs === ys) return true;
      if (xs.length !== ys.length) return false;

      for (var i = 0; i < xs.length; i++) {
        if (!f(xs[i])(ys[i])) return false;
      }

      return true;
    };
  };
};
},{}],"output/Data.Eq/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var EqRecord = function EqRecord(eqRecord) {
  this.eqRecord = eqRecord;
};

var Eq1 = function Eq1(eq1) {
  this.eq1 = eq1;
};

var Eq = function Eq(eq) {
  this.eq = eq;
};

var eqVoid = new Eq(function (v) {
  return function (v1) {
    return true;
  };
});
var eqUnit = new Eq(function (v) {
  return function (v1) {
    return true;
  };
});
var eqString = new Eq($foreign.eqStringImpl);
var eqRowNil = new EqRecord(function (v) {
  return function (v1) {
    return function (v2) {
      return true;
    };
  };
});

var eqRecord = function eqRecord(dict) {
  return dict.eqRecord;
};

var eqRec = function eqRec(dictRowToList) {
  return function (dictEqRecord) {
    return new Eq(eqRecord(dictEqRecord)(Type_Data_RowList.RLProxy.value));
  };
};

var eqNumber = new Eq($foreign.eqNumberImpl);
var eqInt = new Eq($foreign.eqIntImpl);
var eqChar = new Eq($foreign.eqCharImpl);
var eqBoolean = new Eq($foreign.eqBooleanImpl);

var eq1 = function eq1(dict) {
  return dict.eq1;
};

var eq = function eq(dict) {
  return dict.eq;
};

var eqArray = function eqArray(dictEq) {
  return new Eq($foreign.eqArrayImpl(eq(dictEq)));
};

var eq1Array = new Eq1(function (dictEq) {
  return eq(eqArray(dictEq));
});

var eqRowCons = function eqRowCons(dictEqRecord) {
  return function (dictCons) {
    return function (dictIsSymbol) {
      return function (dictEq) {
        return new EqRecord(function (v) {
          return function (ra) {
            return function (rb) {
              var tail = eqRecord(dictEqRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var get = Record_Unsafe.unsafeGet(key);
              return eq(dictEq)(get(ra))(get(rb)) && tail;
            };
          };
        });
      };
    };
  };
};

var notEq = function notEq(dictEq) {
  return function (x) {
    return function (y) {
      return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
    };
  };
};

var notEq1 = function notEq1(dictEq1) {
  return function (dictEq) {
    return function (x) {
      return function (y) {
        return eq(eqBoolean)(eq1(dictEq1)(dictEq)(x)(y))(false);
      };
    };
  };
};

module.exports = {
  Eq: Eq,
  eq: eq,
  notEq: notEq,
  Eq1: Eq1,
  eq1: eq1,
  notEq1: notEq1,
  EqRecord: EqRecord,
  eqRecord: eqRecord,
  eqBoolean: eqBoolean,
  eqInt: eqInt,
  eqNumber: eqNumber,
  eqChar: eqChar,
  eqString: eqString,
  eqUnit: eqUnit,
  eqVoid: eqVoid,
  eqArray: eqArray,
  eqRec: eqRec,
  eq1Array: eq1Array,
  eqRowNil: eqRowNil,
  eqRowCons: eqRowCons
};
},{"./foreign.js":"output/Data.Eq/foreign.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Data.HeytingAlgebra/foreign.js":[function(require,module,exports) {
"use strict";

exports.boolConj = function (b1) {
  return function (b2) {
    return b1 && b2;
  };
};

exports.boolDisj = function (b1) {
  return function (b2) {
    return b1 || b2;
  };
};

exports.boolNot = function (b) {
  return !b;
};
},{}],"output/Type.Data.Row/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var RProxy = function () {
  function RProxy() {}

  ;
  RProxy.value = new RProxy();
  return RProxy;
}();

module.exports = {
  RProxy: RProxy
};
},{}],"output/Data.HeytingAlgebra/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_Row = require("../Type.Data.Row/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var HeytingAlgebraRecord = function HeytingAlgebraRecord(conjRecord, disjRecord, ffRecord, impliesRecord, notRecord, ttRecord) {
  this.conjRecord = conjRecord;
  this.disjRecord = disjRecord;
  this.ffRecord = ffRecord;
  this.impliesRecord = impliesRecord;
  this.notRecord = notRecord;
  this.ttRecord = ttRecord;
};

var HeytingAlgebra = function HeytingAlgebra(conj, disj, ff, implies, not, tt) {
  this.conj = conj;
  this.disj = disj;
  this.ff = ff;
  this.implies = implies;
  this.not = not;
  this.tt = tt;
};

var ttRecord = function ttRecord(dict) {
  return dict.ttRecord;
};

var tt = function tt(dict) {
  return dict.tt;
};

var notRecord = function notRecord(dict) {
  return dict.notRecord;
};

var not = function not(dict) {
  return dict.not;
};

var impliesRecord = function impliesRecord(dict) {
  return dict.impliesRecord;
};

var implies = function implies(dict) {
  return dict.implies;
};

var heytingAlgebraUnit = new HeytingAlgebra(function (v) {
  return function (v1) {
    return Data_Unit.unit;
  };
}, function (v) {
  return function (v1) {
    return Data_Unit.unit;
  };
}, Data_Unit.unit, function (v) {
  return function (v1) {
    return Data_Unit.unit;
  };
}, function (v) {
  return Data_Unit.unit;
}, Data_Unit.unit);
var heytingAlgebraRecordNil = new HeytingAlgebraRecord(function (v) {
  return function (v1) {
    return function (v2) {
      return {};
    };
  };
}, function (v) {
  return function (v1) {
    return function (v2) {
      return {};
    };
  };
}, function (v) {
  return function (v1) {
    return {};
  };
}, function (v) {
  return function (v1) {
    return function (v2) {
      return {};
    };
  };
}, function (v) {
  return function (v1) {
    return {};
  };
}, function (v) {
  return function (v1) {
    return {};
  };
});

var ffRecord = function ffRecord(dict) {
  return dict.ffRecord;
};

var ff = function ff(dict) {
  return dict.ff;
};

var disjRecord = function disjRecord(dict) {
  return dict.disjRecord;
};

var disj = function disj(dict) {
  return dict.disj;
};

var heytingAlgebraBoolean = new HeytingAlgebra($foreign.boolConj, $foreign.boolDisj, false, function (a) {
  return function (b) {
    return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
  };
}, $foreign.boolNot, true);

var conjRecord = function conjRecord(dict) {
  return dict.conjRecord;
};

var heytingAlgebraRecord = function heytingAlgebraRecord(dictRowToList) {
  return function (dictHeytingAlgebraRecord) {
    return new HeytingAlgebra(conjRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value), disjRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value), ffRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value)(Type_Data_Row.RProxy.value), impliesRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value), notRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value), ttRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value)(Type_Data_Row.RProxy.value));
  };
};

var conj = function conj(dict) {
  return dict.conj;
};

var heytingAlgebraFunction = function heytingAlgebraFunction(dictHeytingAlgebra) {
  return new HeytingAlgebra(function (f) {
    return function (g) {
      return function (a) {
        return conj(dictHeytingAlgebra)(f(a))(g(a));
      };
    };
  }, function (f) {
    return function (g) {
      return function (a) {
        return disj(dictHeytingAlgebra)(f(a))(g(a));
      };
    };
  }, function (v) {
    return ff(dictHeytingAlgebra);
  }, function (f) {
    return function (g) {
      return function (a) {
        return implies(dictHeytingAlgebra)(f(a))(g(a));
      };
    };
  }, function (f) {
    return function (a) {
      return not(dictHeytingAlgebra)(f(a));
    };
  }, function (v) {
    return tt(dictHeytingAlgebra);
  });
};

var heytingAlgebraRecordCons = function heytingAlgebraRecordCons(dictIsSymbol) {
  return function (dictCons) {
    return function (dictHeytingAlgebraRecord) {
      return function (dictHeytingAlgebra) {
        return new HeytingAlgebraRecord(function (v) {
          return function (ra) {
            return function (rb) {
              var tail = conjRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var insert = Record_Unsafe.unsafeSet(key);
              var get = Record_Unsafe.unsafeGet(key);
              return insert(conj(dictHeytingAlgebra)(get(ra))(get(rb)))(tail);
            };
          };
        }, function (v) {
          return function (ra) {
            return function (rb) {
              var tail = disjRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var insert = Record_Unsafe.unsafeSet(key);
              var get = Record_Unsafe.unsafeGet(key);
              return insert(disj(dictHeytingAlgebra)(get(ra))(get(rb)))(tail);
            };
          };
        }, function (v) {
          return function (row) {
            var tail = ffRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value)(row);
            var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
            var insert = Record_Unsafe.unsafeSet(key);
            return insert(ff(dictHeytingAlgebra))(tail);
          };
        }, function (v) {
          return function (ra) {
            return function (rb) {
              var tail = impliesRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var insert = Record_Unsafe.unsafeSet(key);
              var get = Record_Unsafe.unsafeGet(key);
              return insert(implies(dictHeytingAlgebra)(get(ra))(get(rb)))(tail);
            };
          };
        }, function (v) {
          return function (row) {
            var tail = notRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value)(row);
            var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
            var insert = Record_Unsafe.unsafeSet(key);
            var get = Record_Unsafe.unsafeGet(key);
            return insert(not(dictHeytingAlgebra)(get(row)))(tail);
          };
        }, function (v) {
          return function (row) {
            var tail = ttRecord(dictHeytingAlgebraRecord)(Type_Data_RowList.RLProxy.value)(row);
            var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
            var insert = Record_Unsafe.unsafeSet(key);
            return insert(tt(dictHeytingAlgebra))(tail);
          };
        });
      };
    };
  };
};

module.exports = {
  HeytingAlgebra: HeytingAlgebra,
  tt: tt,
  ff: ff,
  implies: implies,
  conj: conj,
  disj: disj,
  not: not,
  HeytingAlgebraRecord: HeytingAlgebraRecord,
  ffRecord: ffRecord,
  ttRecord: ttRecord,
  impliesRecord: impliesRecord,
  conjRecord: conjRecord,
  disjRecord: disjRecord,
  notRecord: notRecord,
  heytingAlgebraBoolean: heytingAlgebraBoolean,
  heytingAlgebraUnit: heytingAlgebraUnit,
  heytingAlgebraFunction: heytingAlgebraFunction,
  heytingAlgebraRecord: heytingAlgebraRecord,
  heytingAlgebraRecordNil: heytingAlgebraRecordNil,
  heytingAlgebraRecordCons: heytingAlgebraRecordCons
};
},{"./foreign.js":"output/Data.HeytingAlgebra/foreign.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.Row/index.js":"output/Type.Data.Row/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Control.Alternative/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Alternative = function Alternative(Applicative0, Plus1) {
  this.Applicative0 = Applicative0;
  this.Plus1 = Plus1;
};

var alternativeArray = new Alternative(function () {
  return Control_Applicative.applicativeArray;
}, function () {
  return Control_Plus.plusArray;
});
module.exports = {
  Alternative: Alternative,
  alternativeArray: alternativeArray
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js"}],"output/Control.MonadZero/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var MonadZero = function MonadZero(Alternative1, Monad0) {
  this.Alternative1 = Alternative1;
  this.Monad0 = Monad0;
};

var monadZeroArray = new MonadZero(function () {
  return Control_Alternative.alternativeArray;
}, function () {
  return Control_Monad.monadArray;
});

var guard = function guard(dictMonadZero) {
  return function (v) {
    if (v) {
      return Control_Applicative.pure(dictMonadZero.Alternative1().Applicative0())(Data_Unit.unit);
    }

    ;

    if (!v) {
      return Control_Plus.empty(dictMonadZero.Alternative1().Plus1());
    }

    ;
    throw new Error("Failed pattern match at Control.MonadZero (line 54, column 1 - line 54, column 52): " + [v.constructor.name]);
  };
};

module.exports = {
  MonadZero: MonadZero,
  guard: guard,
  monadZeroArray: monadZeroArray
};
},{"../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Bounded/foreign.js":[function(require,module,exports) {
"use strict";

exports.topInt = 2147483647;
exports.bottomInt = -2147483648;
exports.topChar = String.fromCharCode(65535);
exports.bottomChar = String.fromCharCode(0);
exports.topNumber = Number.POSITIVE_INFINITY;
exports.bottomNumber = Number.NEGATIVE_INFINITY;
},{}],"output/Data.Ord/foreign.js":[function(require,module,exports) {
"use strict";

var unsafeCompareImpl = function unsafeCompareImpl(lt) {
  return function (eq) {
    return function (gt) {
      return function (x) {
        return function (y) {
          return x < y ? lt : x === y ? eq : gt;
        };
      };
    };
  };
};

exports.ordBooleanImpl = unsafeCompareImpl;
exports.ordIntImpl = unsafeCompareImpl;
exports.ordNumberImpl = unsafeCompareImpl;
exports.ordStringImpl = unsafeCompareImpl;
exports.ordCharImpl = unsafeCompareImpl;

exports.ordArrayImpl = function (f) {
  return function (xs) {
    return function (ys) {
      var i = 0;
      var xlen = xs.length;
      var ylen = ys.length;

      while (i < xlen && i < ylen) {
        var x = xs[i];
        var y = ys[i];
        var o = f(x)(y);

        if (o !== 0) {
          return o;
        }

        i++;
      }

      if (xlen === ylen) {
        return 0;
      } else if (xlen > ylen) {
        return -1;
      } else {
        return 1;
      }
    };
  };
};
},{}],"output/Data.Ordering/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Eq = require("../Data.Eq/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var LT = function () {
  function LT() {}

  ;
  LT.value = new LT();
  return LT;
}();

var GT = function () {
  function GT() {}

  ;
  GT.value = new GT();
  return GT;
}();

var EQ = function () {
  function EQ() {}

  ;
  EQ.value = new EQ();
  return EQ;
}();

var showOrdering = new Data_Show.Show(function (v) {
  if (v instanceof LT) {
    return "LT";
  }

  ;

  if (v instanceof GT) {
    return "GT";
  }

  ;

  if (v instanceof EQ) {
    return "EQ";
  }

  ;
  throw new Error("Failed pattern match at Data.Ordering (line 26, column 1 - line 29, column 17): " + [v.constructor.name]);
});
var semigroupOrdering = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    if (v instanceof LT) {
      return LT.value;
    }

    ;

    if (v instanceof GT) {
      return GT.value;
    }

    ;

    if (v instanceof EQ) {
      return v1;
    }

    ;
    throw new Error("Failed pattern match at Data.Ordering (line 21, column 1 - line 24, column 18): " + [v.constructor.name, v1.constructor.name]);
  };
});

var invert = function invert(v) {
  if (v instanceof GT) {
    return LT.value;
  }

  ;

  if (v instanceof EQ) {
    return EQ.value;
  }

  ;

  if (v instanceof LT) {
    return GT.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Ordering (line 33, column 1 - line 33, column 31): " + [v.constructor.name]);
};

var eqOrdering = new Data_Eq.Eq(function (v) {
  return function (v1) {
    if (v instanceof LT && v1 instanceof LT) {
      return true;
    }

    ;

    if (v instanceof GT && v1 instanceof GT) {
      return true;
    }

    ;

    if (v instanceof EQ && v1 instanceof EQ) {
      return true;
    }

    ;
    return false;
  };
});
module.exports = {
  LT: LT,
  GT: GT,
  EQ: EQ,
  invert: invert,
  eqOrdering: eqOrdering,
  semigroupOrdering: semigroupOrdering,
  showOrdering: showOrdering
};
},{"../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Ring/foreign.js":[function(require,module,exports) {
"use strict";

exports.intSub = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x - y | 0;
  };
};

exports.numSub = function (n1) {
  return function (n2) {
    return n1 - n2;
  };
};
},{}],"output/Data.Semiring/foreign.js":[function(require,module,exports) {
"use strict";

exports.intAdd = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x + y | 0;
  };
};

exports.intMul = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x * y | 0;
  };
};

exports.numAdd = function (n1) {
  return function (n2) {
    return n1 + n2;
  };
};

exports.numMul = function (n1) {
  return function (n2) {
    return n1 * n2;
  };
};
},{}],"output/Data.Semiring/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_Row = require("../Type.Data.Row/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var SemiringRecord = function SemiringRecord(addRecord, mulRecord, oneRecord, zeroRecord) {
  this.addRecord = addRecord;
  this.mulRecord = mulRecord;
  this.oneRecord = oneRecord;
  this.zeroRecord = zeroRecord;
};

var Semiring = function Semiring(add, mul, one, zero) {
  this.add = add;
  this.mul = mul;
  this.one = one;
  this.zero = zero;
};

var zeroRecord = function zeroRecord(dict) {
  return dict.zeroRecord;
};

var zero = function zero(dict) {
  return dict.zero;
};

var semiringUnit = new Semiring(function (v) {
  return function (v1) {
    return Data_Unit.unit;
  };
}, function (v) {
  return function (v1) {
    return Data_Unit.unit;
  };
}, Data_Unit.unit, Data_Unit.unit);
var semiringRecordNil = new SemiringRecord(function (v) {
  return function (v1) {
    return function (v2) {
      return {};
    };
  };
}, function (v) {
  return function (v1) {
    return function (v2) {
      return {};
    };
  };
}, function (v) {
  return function (v1) {
    return {};
  };
}, function (v) {
  return function (v1) {
    return {};
  };
});
var semiringNumber = new Semiring($foreign.numAdd, $foreign.numMul, 1.0, 0.0);
var semiringInt = new Semiring($foreign.intAdd, $foreign.intMul, 1, 0);

var oneRecord = function oneRecord(dict) {
  return dict.oneRecord;
};

var one = function one(dict) {
  return dict.one;
};

var mulRecord = function mulRecord(dict) {
  return dict.mulRecord;
};

var mul = function mul(dict) {
  return dict.mul;
};

var addRecord = function addRecord(dict) {
  return dict.addRecord;
};

var semiringRecord = function semiringRecord(dictRowToList) {
  return function (dictSemiringRecord) {
    return new Semiring(addRecord(dictSemiringRecord)(Type_Data_RowList.RLProxy.value), mulRecord(dictSemiringRecord)(Type_Data_RowList.RLProxy.value), oneRecord(dictSemiringRecord)(Type_Data_RowList.RLProxy.value)(Type_Data_Row.RProxy.value), zeroRecord(dictSemiringRecord)(Type_Data_RowList.RLProxy.value)(Type_Data_Row.RProxy.value));
  };
};

var add = function add(dict) {
  return dict.add;
};

var semiringFn = function semiringFn(dictSemiring) {
  return new Semiring(function (f) {
    return function (g) {
      return function (x) {
        return add(dictSemiring)(f(x))(g(x));
      };
    };
  }, function (f) {
    return function (g) {
      return function (x) {
        return mul(dictSemiring)(f(x))(g(x));
      };
    };
  }, function (v) {
    return one(dictSemiring);
  }, function (v) {
    return zero(dictSemiring);
  });
};

var semiringRecordCons = function semiringRecordCons(dictIsSymbol) {
  return function (dictCons) {
    return function (dictSemiringRecord) {
      return function (dictSemiring) {
        return new SemiringRecord(function (v) {
          return function (ra) {
            return function (rb) {
              var tail = addRecord(dictSemiringRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var insert = Record_Unsafe.unsafeSet(key);
              var get = Record_Unsafe.unsafeGet(key);
              return insert(add(dictSemiring)(get(ra))(get(rb)))(tail);
            };
          };
        }, function (v) {
          return function (ra) {
            return function (rb) {
              var tail = mulRecord(dictSemiringRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var insert = Record_Unsafe.unsafeSet(key);
              var get = Record_Unsafe.unsafeGet(key);
              return insert(mul(dictSemiring)(get(ra))(get(rb)))(tail);
            };
          };
        }, function (v) {
          return function (v1) {
            var tail = oneRecord(dictSemiringRecord)(Type_Data_RowList.RLProxy.value)(Type_Data_Row.RProxy.value);
            var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
            var insert = Record_Unsafe.unsafeSet(key);
            return insert(one(dictSemiring))(tail);
          };
        }, function (v) {
          return function (v1) {
            var tail = zeroRecord(dictSemiringRecord)(Type_Data_RowList.RLProxy.value)(Type_Data_Row.RProxy.value);
            var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
            var insert = Record_Unsafe.unsafeSet(key);
            return insert(zero(dictSemiring))(tail);
          };
        });
      };
    };
  };
};

module.exports = {
  Semiring: Semiring,
  add: add,
  zero: zero,
  mul: mul,
  one: one,
  SemiringRecord: SemiringRecord,
  addRecord: addRecord,
  mulRecord: mulRecord,
  oneRecord: oneRecord,
  zeroRecord: zeroRecord,
  semiringInt: semiringInt,
  semiringNumber: semiringNumber,
  semiringFn: semiringFn,
  semiringUnit: semiringUnit,
  semiringRecord: semiringRecord,
  semiringRecordNil: semiringRecordNil,
  semiringRecordCons: semiringRecordCons
};
},{"./foreign.js":"output/Data.Semiring/foreign.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.Row/index.js":"output/Type.Data.Row/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Data.Ring/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var RingRecord = function RingRecord(SemiringRecord0, subRecord) {
  this.SemiringRecord0 = SemiringRecord0;
  this.subRecord = subRecord;
};

var Ring = function Ring(Semiring0, sub) {
  this.Semiring0 = Semiring0;
  this.sub = sub;
};

var subRecord = function subRecord(dict) {
  return dict.subRecord;
};

var sub = function sub(dict) {
  return dict.sub;
};

var ringUnit = new Ring(function () {
  return Data_Semiring.semiringUnit;
}, function (v) {
  return function (v1) {
    return Data_Unit.unit;
  };
});
var ringRecordNil = new RingRecord(function () {
  return Data_Semiring.semiringRecordNil;
}, function (v) {
  return function (v1) {
    return function (v2) {
      return {};
    };
  };
});

var ringRecordCons = function ringRecordCons(dictIsSymbol) {
  return function (dictCons) {
    return function (dictRingRecord) {
      return function (dictRing) {
        return new RingRecord(function () {
          return Data_Semiring.semiringRecordCons(dictIsSymbol)()(dictRingRecord.SemiringRecord0())(dictRing.Semiring0());
        }, function (v) {
          return function (ra) {
            return function (rb) {
              var tail = subRecord(dictRingRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var insert = Record_Unsafe.unsafeSet(key);
              var get = Record_Unsafe.unsafeGet(key);
              return insert(sub(dictRing)(get(ra))(get(rb)))(tail);
            };
          };
        });
      };
    };
  };
};

var ringRecord = function ringRecord(dictRowToList) {
  return function (dictRingRecord) {
    return new Ring(function () {
      return Data_Semiring.semiringRecord()(dictRingRecord.SemiringRecord0());
    }, subRecord(dictRingRecord)(Type_Data_RowList.RLProxy.value));
  };
};

var ringNumber = new Ring(function () {
  return Data_Semiring.semiringNumber;
}, $foreign.numSub);
var ringInt = new Ring(function () {
  return Data_Semiring.semiringInt;
}, $foreign.intSub);

var ringFn = function ringFn(dictRing) {
  return new Ring(function () {
    return Data_Semiring.semiringFn(dictRing.Semiring0());
  }, function (f) {
    return function (g) {
      return function (x) {
        return sub(dictRing)(f(x))(g(x));
      };
    };
  });
};

var negate = function negate(dictRing) {
  return function (a) {
    return sub(dictRing)(Data_Semiring.zero(dictRing.Semiring0()))(a);
  };
};

module.exports = {
  Ring: Ring,
  sub: sub,
  negate: negate,
  RingRecord: RingRecord,
  subRecord: subRecord,
  ringInt: ringInt,
  ringNumber: ringNumber,
  ringUnit: ringUnit,
  ringFn: ringFn,
  ringRecord: ringRecord,
  ringRecordNil: ringRecordNil,
  ringRecordCons: ringRecordCons
};
},{"./foreign.js":"output/Data.Ring/foreign.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Data.Ord/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Ring = require("../Data.Ring/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var OrdRecord = function OrdRecord(EqRecord0, compareRecord) {
  this.EqRecord0 = EqRecord0;
  this.compareRecord = compareRecord;
};

var Ord1 = function Ord1(Eq10, compare1) {
  this.Eq10 = Eq10;
  this.compare1 = compare1;
};

var Ord = function Ord(Eq0, compare) {
  this.Eq0 = Eq0;
  this.compare = compare;
};

var ordVoid = new Ord(function () {
  return Data_Eq.eqVoid;
}, function (v) {
  return function (v1) {
    return Data_Ordering.EQ.value;
  };
});
var ordUnit = new Ord(function () {
  return Data_Eq.eqUnit;
}, function (v) {
  return function (v1) {
    return Data_Ordering.EQ.value;
  };
});
var ordString = new Ord(function () {
  return Data_Eq.eqString;
}, $foreign.ordStringImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
var ordRecordNil = new OrdRecord(function () {
  return Data_Eq.eqRowNil;
}, function (v) {
  return function (v1) {
    return function (v2) {
      return Data_Ordering.EQ.value;
    };
  };
});
var ordOrdering = new Ord(function () {
  return Data_Ordering.eqOrdering;
}, function (v) {
  return function (v1) {
    if (v instanceof Data_Ordering.LT && v1 instanceof Data_Ordering.LT) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.EQ) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (v instanceof Data_Ordering.GT && v1 instanceof Data_Ordering.GT) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (v instanceof Data_Ordering.LT) {
      return Data_Ordering.LT.value;
    }

    ;

    if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.LT) {
      return Data_Ordering.GT.value;
    }

    ;

    if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.GT) {
      return Data_Ordering.LT.value;
    }

    ;

    if (v instanceof Data_Ordering.GT) {
      return Data_Ordering.GT.value;
    }

    ;
    throw new Error("Failed pattern match at Data.Ord (line 112, column 1 - line 119, column 21): " + [v.constructor.name, v1.constructor.name]);
  };
});
var ordNumber = new Ord(function () {
  return Data_Eq.eqNumber;
}, $foreign.ordNumberImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
var ordInt = new Ord(function () {
  return Data_Eq.eqInt;
}, $foreign.ordIntImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
var ordChar = new Ord(function () {
  return Data_Eq.eqChar;
}, $foreign.ordCharImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
var ordBoolean = new Ord(function () {
  return Data_Eq.eqBoolean;
}, $foreign.ordBooleanImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));

var compareRecord = function compareRecord(dict) {
  return dict.compareRecord;
};

var ordRecord = function ordRecord(dictRowToList) {
  return function (dictOrdRecord) {
    return new Ord(function () {
      return Data_Eq.eqRec()(dictOrdRecord.EqRecord0());
    }, compareRecord(dictOrdRecord)(Type_Data_RowList.RLProxy.value));
  };
};

var compare1 = function compare1(dict) {
  return dict.compare1;
};

var compare = function compare(dict) {
  return dict.compare;
};

var comparing = function comparing(dictOrd) {
  return function (f) {
    return function (x) {
      return function (y) {
        return compare(dictOrd)(f(x))(f(y));
      };
    };
  };
};

var greaterThan = function greaterThan(dictOrd) {
  return function (a1) {
    return function (a2) {
      var v = compare(dictOrd)(a1)(a2);

      if (v instanceof Data_Ordering.GT) {
        return true;
      }

      ;
      return false;
    };
  };
};

var greaterThanOrEq = function greaterThanOrEq(dictOrd) {
  return function (a1) {
    return function (a2) {
      var v = compare(dictOrd)(a1)(a2);

      if (v instanceof Data_Ordering.LT) {
        return false;
      }

      ;
      return true;
    };
  };
};

var signum = function signum(dictOrd) {
  return function (dictRing) {
    return function (x) {
      var $43 = greaterThanOrEq(dictOrd)(x)(Data_Semiring.zero(dictRing.Semiring0()));

      if ($43) {
        return Data_Semiring.one(dictRing.Semiring0());
      }

      ;
      return Data_Ring.negate(dictRing)(Data_Semiring.one(dictRing.Semiring0()));
    };
  };
};

var lessThan = function lessThan(dictOrd) {
  return function (a1) {
    return function (a2) {
      var v = compare(dictOrd)(a1)(a2);

      if (v instanceof Data_Ordering.LT) {
        return true;
      }

      ;
      return false;
    };
  };
};

var lessThanOrEq = function lessThanOrEq(dictOrd) {
  return function (a1) {
    return function (a2) {
      var v = compare(dictOrd)(a1)(a2);

      if (v instanceof Data_Ordering.GT) {
        return false;
      }

      ;
      return true;
    };
  };
};

var max = function max(dictOrd) {
  return function (x) {
    return function (y) {
      var v = compare(dictOrd)(x)(y);

      if (v instanceof Data_Ordering.LT) {
        return y;
      }

      ;

      if (v instanceof Data_Ordering.EQ) {
        return x;
      }

      ;

      if (v instanceof Data_Ordering.GT) {
        return x;
      }

      ;
      throw new Error("Failed pattern match at Data.Ord (line 167, column 3 - line 170, column 12): " + [v.constructor.name]);
    };
  };
};

var min = function min(dictOrd) {
  return function (x) {
    return function (y) {
      var v = compare(dictOrd)(x)(y);

      if (v instanceof Data_Ordering.LT) {
        return x;
      }

      ;

      if (v instanceof Data_Ordering.EQ) {
        return x;
      }

      ;

      if (v instanceof Data_Ordering.GT) {
        return y;
      }

      ;
      throw new Error("Failed pattern match at Data.Ord (line 158, column 3 - line 161, column 12): " + [v.constructor.name]);
    };
  };
};

var ordArray = function ordArray(dictOrd) {
  return new Ord(function () {
    return Data_Eq.eqArray(dictOrd.Eq0());
  }, function () {
    var toDelta = function toDelta(x) {
      return function (y) {
        var v = compare(dictOrd)(x)(y);

        if (v instanceof Data_Ordering.EQ) {
          return 0;
        }

        ;

        if (v instanceof Data_Ordering.LT) {
          return 1;
        }

        ;

        if (v instanceof Data_Ordering.GT) {
          return -1 | 0;
        }

        ;
        throw new Error("Failed pattern match at Data.Ord (line 65, column 7 - line 68, column 17): " + [v.constructor.name]);
      };
    };

    return function (xs) {
      return function (ys) {
        return compare(ordInt)(0)($foreign.ordArrayImpl(toDelta)(xs)(ys));
      };
    };
  }());
};

var ord1Array = new Ord1(function () {
  return Data_Eq.eq1Array;
}, function (dictOrd) {
  return compare(ordArray(dictOrd));
});

var ordRecordCons = function ordRecordCons(dictOrdRecord) {
  return function (dictCons) {
    return function (dictIsSymbol) {
      return function (dictOrd) {
        return new OrdRecord(function () {
          return Data_Eq.eqRowCons(dictOrdRecord.EqRecord0())()(dictIsSymbol)(dictOrd.Eq0());
        }, function (v) {
          return function (ra) {
            return function (rb) {
              var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
              var left = compare(dictOrd)(Record_Unsafe.unsafeGet(key)(ra))(Record_Unsafe.unsafeGet(key)(rb));
              var $49 = Data_Eq.notEq(Data_Ordering.eqOrdering)(left)(Data_Ordering.EQ.value);

              if ($49) {
                return left;
              }

              ;
              return compareRecord(dictOrdRecord)(Type_Data_RowList.RLProxy.value)(ra)(rb);
            };
          };
        });
      };
    };
  };
};

var clamp = function clamp(dictOrd) {
  return function (low) {
    return function (hi) {
      return function (x) {
        return min(dictOrd)(hi)(max(dictOrd)(low)(x));
      };
    };
  };
};

var between = function between(dictOrd) {
  return function (low) {
    return function (hi) {
      return function (x) {
        if (lessThan(dictOrd)(x)(low)) {
          return false;
        }

        ;

        if (greaterThan(dictOrd)(x)(hi)) {
          return false;
        }

        ;
        return true;
      };
    };
  };
};

var abs = function abs(dictOrd) {
  return function (dictRing) {
    return function (x) {
      var $53 = greaterThanOrEq(dictOrd)(x)(Data_Semiring.zero(dictRing.Semiring0()));

      if ($53) {
        return x;
      }

      ;
      return Data_Ring.negate(dictRing)(x);
    };
  };
};

module.exports = {
  Ord: Ord,
  compare: compare,
  Ord1: Ord1,
  compare1: compare1,
  lessThan: lessThan,
  lessThanOrEq: lessThanOrEq,
  greaterThan: greaterThan,
  greaterThanOrEq: greaterThanOrEq,
  comparing: comparing,
  min: min,
  max: max,
  clamp: clamp,
  between: between,
  abs: abs,
  signum: signum,
  OrdRecord: OrdRecord,
  compareRecord: compareRecord,
  ordBoolean: ordBoolean,
  ordInt: ordInt,
  ordNumber: ordNumber,
  ordString: ordString,
  ordChar: ordChar,
  ordUnit: ordUnit,
  ordVoid: ordVoid,
  ordArray: ordArray,
  ordOrdering: ordOrdering,
  ord1Array: ord1Array,
  ordRecordNil: ordRecordNil,
  ordRecordCons: ordRecordCons,
  ordRecord: ordRecord
};
},{"./foreign.js":"output/Data.Ord/foreign.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Ring/index.js":"output/Data.Ring/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Data.Bounded/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Bounded = function Bounded(Ord0, bottom, top) {
  this.Ord0 = Ord0;
  this.bottom = bottom;
  this.top = top;
};

var top = function top(dict) {
  return dict.top;
};

var boundedUnit = new Bounded(function () {
  return Data_Ord.ordUnit;
}, Data_Unit.unit, Data_Unit.unit);
var boundedOrdering = new Bounded(function () {
  return Data_Ord.ordOrdering;
}, Data_Ordering.LT.value, Data_Ordering.GT.value);
var boundedNumber = new Bounded(function () {
  return Data_Ord.ordNumber;
}, $foreign.bottomNumber, $foreign.topNumber);
var boundedInt = new Bounded(function () {
  return Data_Ord.ordInt;
}, $foreign.bottomInt, $foreign.topInt);
var boundedChar = new Bounded(function () {
  return Data_Ord.ordChar;
}, $foreign.bottomChar, $foreign.topChar);
var boundedBoolean = new Bounded(function () {
  return Data_Ord.ordBoolean;
}, false, true);

var bottom = function bottom(dict) {
  return dict.bottom;
};

module.exports = {
  Bounded: Bounded,
  bottom: bottom,
  top: top,
  boundedBoolean: boundedBoolean,
  boundedInt: boundedInt,
  boundedChar: boundedChar,
  boundedOrdering: boundedOrdering,
  boundedUnit: boundedUnit,
  boundedNumber: boundedNumber
};
},{"./foreign.js":"output/Data.Bounded/foreign.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Functor.Invariant/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Functor = require("../Data.Functor/index.js");

var Invariant = function Invariant(imap) {
  this.imap = imap;
};

var invariantMultiplicative = new Invariant(function (f) {
  return function (v) {
    return function (v1) {
      return f(v1);
    };
  };
});
var invariantEndo = new Invariant(function (ab) {
  return function (ba) {
    return function (v) {
      return function ($31) {
        return ab(v(ba($31)));
      };
    };
  };
});
var invariantDual = new Invariant(function (f) {
  return function (v) {
    return function (v1) {
      return f(v1);
    };
  };
});
var invariantDisj = new Invariant(function (f) {
  return function (v) {
    return function (v1) {
      return f(v1);
    };
  };
});
var invariantConj = new Invariant(function (f) {
  return function (v) {
    return function (v1) {
      return f(v1);
    };
  };
});
var invariantAdditive = new Invariant(function (f) {
  return function (v) {
    return function (v1) {
      return f(v1);
    };
  };
});

var imapF = function imapF(dictFunctor) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictFunctor)(f);
    };
  };
};

var invariantArray = new Invariant(imapF(Data_Functor.functorArray));
var invariantFn = new Invariant(imapF(Data_Functor.functorFn));

var imap = function imap(dict) {
  return dict.imap;
};

module.exports = {
  imap: imap,
  Invariant: Invariant,
  imapF: imapF,
  invariantFn: invariantFn,
  invariantArray: invariantArray,
  invariantAdditive: invariantAdditive,
  invariantConj: invariantConj,
  invariantDisj: invariantDisj,
  invariantDual: invariantDual,
  invariantEndo: invariantEndo,
  invariantMultiplicative: invariantMultiplicative
};
},{"../Data.Functor/index.js":"output/Data.Functor/index.js"}],"output/Data.EuclideanRing/foreign.js":[function(require,module,exports) {
"use strict";

exports.intDegree = function (x) {
  return Math.min(Math.abs(x), 2147483647);
}; // See the Euclidean definition in
// https://en.m.wikipedia.org/wiki/Modulo_operation.


exports.intDiv = function (x) {
  return function (y) {
    if (y === 0) return 0;
    return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
  };
};

exports.intMod = function (x) {
  return function (y) {
    if (y === 0) return 0;
    var yy = Math.abs(y);
    return (x % yy + yy) % yy;
  };
};

exports.numDiv = function (n1) {
  return function (n2) {
    return n1 / n2;
  };
};
},{}],"output/Data.CommutativeRing/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Ring = require("../Data.Ring/index.js");

var CommutativeRingRecord = function CommutativeRingRecord(RingRecord0) {
  this.RingRecord0 = RingRecord0;
};

var CommutativeRing = function CommutativeRing(Ring0) {
  this.Ring0 = Ring0;
};

var commutativeRingUnit = new CommutativeRing(function () {
  return Data_Ring.ringUnit;
});
var commutativeRingRecordNil = new CommutativeRingRecord(function () {
  return Data_Ring.ringRecordNil;
});

var commutativeRingRecordCons = function commutativeRingRecordCons(dictIsSymbol) {
  return function (dictCons) {
    return function (dictCommutativeRingRecord) {
      return function (dictCommutativeRing) {
        return new CommutativeRingRecord(function () {
          return Data_Ring.ringRecordCons(dictIsSymbol)()(dictCommutativeRingRecord.RingRecord0())(dictCommutativeRing.Ring0());
        });
      };
    };
  };
};

var commutativeRingRecord = function commutativeRingRecord(dictRowToList) {
  return function (dictCommutativeRingRecord) {
    return new CommutativeRing(function () {
      return Data_Ring.ringRecord()(dictCommutativeRingRecord.RingRecord0());
    });
  };
};

var commutativeRingNumber = new CommutativeRing(function () {
  return Data_Ring.ringNumber;
});
var commutativeRingInt = new CommutativeRing(function () {
  return Data_Ring.ringInt;
});

var commutativeRingFn = function commutativeRingFn(dictCommutativeRing) {
  return new CommutativeRing(function () {
    return Data_Ring.ringFn(dictCommutativeRing.Ring0());
  });
};

module.exports = {
  CommutativeRing: CommutativeRing,
  CommutativeRingRecord: CommutativeRingRecord,
  commutativeRingInt: commutativeRingInt,
  commutativeRingNumber: commutativeRingNumber,
  commutativeRingUnit: commutativeRingUnit,
  commutativeRingFn: commutativeRingFn,
  commutativeRingRecord: commutativeRingRecord,
  commutativeRingRecordNil: commutativeRingRecordNil,
  commutativeRingRecordCons: commutativeRingRecordCons
};
},{"../Data.Ring/index.js":"output/Data.Ring/index.js"}],"output/Data.EuclideanRing/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_CommutativeRing = require("../Data.CommutativeRing/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var EuclideanRing = function EuclideanRing(CommutativeRing0, degree, div, mod) {
  this.CommutativeRing0 = CommutativeRing0;
  this.degree = degree;
  this.div = div;
  this.mod = mod;
};

var mod = function mod(dict) {
  return dict.mod;
};

var gcd = function gcd($copy_dictEq) {
  return function ($copy_dictEuclideanRing) {
    return function ($copy_a) {
      return function ($copy_b) {
        var $tco_var_dictEq = $copy_dictEq;
        var $tco_var_dictEuclideanRing = $copy_dictEuclideanRing;
        var $tco_var_a = $copy_a;
        var $tco_done = false;
        var $tco_result;

        function $tco_loop(dictEq, dictEuclideanRing, a, b) {
          var $7 = Data_Eq.eq(dictEq)(b)(Data_Semiring.zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));

          if ($7) {
            $tco_done = true;
            return a;
          }

          ;
          $tco_var_dictEq = dictEq;
          $tco_var_dictEuclideanRing = dictEuclideanRing;
          $tco_var_a = b;
          $copy_b = mod(dictEuclideanRing)(a)(b);
          return;
        }

        ;

        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictEq, $tco_var_dictEuclideanRing, $tco_var_a, $copy_b);
        }

        ;
        return $tco_result;
      };
    };
  };
};

var euclideanRingNumber = new EuclideanRing(function () {
  return Data_CommutativeRing.commutativeRingNumber;
}, function (v) {
  return 1;
}, $foreign.numDiv, function (v) {
  return function (v1) {
    return 0.0;
  };
});
var euclideanRingInt = new EuclideanRing(function () {
  return Data_CommutativeRing.commutativeRingInt;
}, $foreign.intDegree, $foreign.intDiv, $foreign.intMod);

var div = function div(dict) {
  return dict.div;
};

var lcm = function lcm(dictEq) {
  return function (dictEuclideanRing) {
    return function (a) {
      return function (b) {
        var $8 = Data_Eq.eq(dictEq)(a)(Data_Semiring.zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())) || Data_Eq.eq(dictEq)(b)(Data_Semiring.zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));

        if ($8) {
          return Data_Semiring.zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
        }

        ;
        return div(dictEuclideanRing)(Data_Semiring.mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(a)(b))(gcd(dictEq)(dictEuclideanRing)(a)(b));
      };
    };
  };
};

var degree = function degree(dict) {
  return dict.degree;
};

module.exports = {
  EuclideanRing: EuclideanRing,
  degree: degree,
  div: div,
  mod: mod,
  gcd: gcd,
  lcm: lcm,
  euclideanRingInt: euclideanRingInt,
  euclideanRingNumber: euclideanRingNumber
};
},{"./foreign.js":"output/Data.EuclideanRing/foreign.js","../Data.CommutativeRing/index.js":"output/Data.CommutativeRing/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js"}],"output/Data.Monoid/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_EuclideanRing = require("../Data.EuclideanRing/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var MonoidRecord = function MonoidRecord(SemigroupRecord0, memptyRecord) {
  this.SemigroupRecord0 = SemigroupRecord0;
  this.memptyRecord = memptyRecord;
};

var Monoid = function Monoid(Semigroup0, mempty) {
  this.Semigroup0 = Semigroup0;
  this.mempty = mempty;
};

var monoidUnit = new Monoid(function () {
  return Data_Semigroup.semigroupUnit;
}, Data_Unit.unit);
var monoidString = new Monoid(function () {
  return Data_Semigroup.semigroupString;
}, "");
var monoidRecordNil = new MonoidRecord(function () {
  return Data_Semigroup.semigroupRecordNil;
}, function (v) {
  return {};
});
var monoidOrdering = new Monoid(function () {
  return Data_Ordering.semigroupOrdering;
}, Data_Ordering.EQ.value);
var monoidArray = new Monoid(function () {
  return Data_Semigroup.semigroupArray;
}, []);

var memptyRecord = function memptyRecord(dict) {
  return dict.memptyRecord;
};

var monoidRecord = function monoidRecord(dictRowToList) {
  return function (dictMonoidRecord) {
    return new Monoid(function () {
      return Data_Semigroup.semigroupRecord()(dictMonoidRecord.SemigroupRecord0());
    }, memptyRecord(dictMonoidRecord)(Type_Data_RowList.RLProxy.value));
  };
};

var mempty = function mempty(dict) {
  return dict.mempty;
};

var monoidFn = function monoidFn(dictMonoid) {
  return new Monoid(function () {
    return Data_Semigroup.semigroupFn(dictMonoid.Semigroup0());
  }, function (v) {
    return mempty(dictMonoid);
  });
};

var monoidRecordCons = function monoidRecordCons(dictIsSymbol) {
  return function (dictMonoid) {
    return function (dictCons) {
      return function (dictMonoidRecord) {
        return new MonoidRecord(function () {
          return Data_Semigroup.semigroupRecordCons(dictIsSymbol)()(dictMonoidRecord.SemigroupRecord0())(dictMonoid.Semigroup0());
        }, function (v) {
          var tail = memptyRecord(dictMonoidRecord)(Type_Data_RowList.RLProxy.value);
          var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
          var insert = Record_Unsafe.unsafeSet(key);
          return insert(mempty(dictMonoid))(tail);
        });
      };
    };
  };
};

var power = function power(dictMonoid) {
  return function (x) {
    var go = function go(p) {
      if (p <= 0) {
        return mempty(dictMonoid);
      }

      ;

      if (p === 1) {
        return x;
      }

      ;

      if (Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(p)(2) === 0) {
        var x$prime = go(Data_EuclideanRing.div(Data_EuclideanRing.euclideanRingInt)(p)(2));
        return Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(x$prime);
      }

      ;

      if (Data_Boolean.otherwise) {
        var x$prime = go(Data_EuclideanRing.div(Data_EuclideanRing.euclideanRingInt)(p)(2));
        return Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(x));
      }

      ;
      throw new Error("Failed pattern match at Data.Monoid (line 65, column 3 - line 65, column 17): " + [p.constructor.name]);
    };

    return go;
  };
};

var guard = function guard(dictMonoid) {
  return function (v) {
    return function (v1) {
      if (v) {
        return v1;
      }

      ;

      if (!v) {
        return mempty(dictMonoid);
      }

      ;
      throw new Error("Failed pattern match at Data.Monoid (line 73, column 1 - line 73, column 49): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};

module.exports = {
  Monoid: Monoid,
  mempty: mempty,
  power: power,
  guard: guard,
  MonoidRecord: MonoidRecord,
  memptyRecord: memptyRecord,
  monoidUnit: monoidUnit,
  monoidOrdering: monoidOrdering,
  monoidFn: monoidFn,
  monoidString: monoidString,
  monoidArray: monoidArray,
  monoidRecord: monoidRecord,
  monoidRecordNil: monoidRecordNil,
  monoidRecordCons: monoidRecordCons
};
},{"../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.EuclideanRing/index.js":"output/Data.EuclideanRing/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Data.Maybe/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Category = require("../Control.Category/index.js");

var Control_Extend = require("../Control.Extend/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_MonadZero = require("../Control.MonadZero/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Nothing = function () {
  function Nothing() {}

  ;
  Nothing.value = new Nothing();
  return Nothing;
}();

var Just = function () {
  function Just(value0) {
    this.value0 = value0;
  }

  ;

  Just.create = function (value0) {
    return new Just(value0);
  };

  return Just;
}();

var showMaybe = function showMaybe(dictShow) {
  return new Data_Show.Show(function (v) {
    if (v instanceof Just) {
      return "(Just " + (Data_Show.show(dictShow)(v.value0) + ")");
    }

    ;

    if (v instanceof Nothing) {
      return "Nothing";
    }

    ;
    throw new Error("Failed pattern match at Data.Maybe (line 205, column 1 - line 207, column 28): " + [v.constructor.name]);
  });
};

var semigroupMaybe = function semigroupMaybe(dictSemigroup) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      if (v instanceof Nothing) {
        return v1;
      }

      ;

      if (v1 instanceof Nothing) {
        return v;
      }

      ;

      if (v instanceof Just && v1 instanceof Just) {
        return new Just(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0));
      }

      ;
      throw new Error("Failed pattern match at Data.Maybe (line 174, column 1 - line 177, column 43): " + [v.constructor.name, v1.constructor.name]);
    };
  });
};

var optional = function optional(dictAlternative) {
  return function (a) {
    return Control_Alt.alt(dictAlternative.Plus1().Alt0())(Data_Functor.map(dictAlternative.Plus1().Alt0().Functor0())(Just.create)(a))(Control_Applicative.pure(dictAlternative.Applicative0())(Nothing.value));
  };
};

var monoidMaybe = function monoidMaybe(dictSemigroup) {
  return new Data_Monoid.Monoid(function () {
    return semigroupMaybe(dictSemigroup);
  }, Nothing.value);
};

var maybe$prime = function maybe$prime(v) {
  return function (v1) {
    return function (v2) {
      if (v2 instanceof Nothing) {
        return v(Data_Unit.unit);
      }

      ;

      if (v2 instanceof Just) {
        return v1(v2.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Maybe (line 230, column 1 - line 230, column 62): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};

var maybe = function maybe(v) {
  return function (v1) {
    return function (v2) {
      if (v2 instanceof Nothing) {
        return v;
      }

      ;

      if (v2 instanceof Just) {
        return v1(v2.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Maybe (line 217, column 1 - line 217, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};

var isNothing = maybe(true)(Data_Function["const"](false));
var isJust = maybe(false)(Data_Function["const"](true));
var functorMaybe = new Data_Functor.Functor(function (v) {
  return function (v1) {
    if (v1 instanceof Just) {
      return new Just(v(v1.value0));
    }

    ;
    return Nothing.value;
  };
});
var invariantMaybe = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorMaybe));

var fromMaybe$prime = function fromMaybe$prime(a) {
  return maybe$prime(a)(Control_Category.identity(Control_Category.categoryFn));
};

var fromMaybe = function fromMaybe(a) {
  return maybe(a)(Control_Category.identity(Control_Category.categoryFn));
};

var fromJust = function fromJust(dictPartial) {
  return function (v) {
    if (v instanceof Just) {
      return v.value0;
    }

    ;
    throw new Error("Failed pattern match at Data.Maybe (line 268, column 1 - line 268, column 46): " + [v.constructor.name]);
  };
};

var extendMaybe = new Control_Extend.Extend(function () {
  return functorMaybe;
}, function (v) {
  return function (v1) {
    if (v1 instanceof Nothing) {
      return Nothing.value;
    }

    ;
    return new Just(v(v1));
  };
});

var eqMaybe = function eqMaybe(dictEq) {
  return new Data_Eq.Eq(function (x) {
    return function (y) {
      if (x instanceof Nothing && y instanceof Nothing) {
        return true;
      }

      ;

      if (x instanceof Just && y instanceof Just) {
        return Data_Eq.eq(dictEq)(x.value0)(y.value0);
      }

      ;
      return false;
    };
  });
};

var ordMaybe = function ordMaybe(dictOrd) {
  return new Data_Ord.Ord(function () {
    return eqMaybe(dictOrd.Eq0());
  }, function (x) {
    return function (y) {
      if (x instanceof Nothing && y instanceof Nothing) {
        return Data_Ordering.EQ.value;
      }

      ;

      if (x instanceof Nothing) {
        return Data_Ordering.LT.value;
      }

      ;

      if (y instanceof Nothing) {
        return Data_Ordering.GT.value;
      }

      ;

      if (x instanceof Just && y instanceof Just) {
        return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Maybe (line 194, column 1 - line 194, column 51): " + [x.constructor.name, y.constructor.name]);
    };
  });
};

var eq1Maybe = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqMaybe(dictEq));
});
var ord1Maybe = new Data_Ord.Ord1(function () {
  return eq1Maybe;
}, function (dictOrd) {
  return Data_Ord.compare(ordMaybe(dictOrd));
});

var boundedMaybe = function boundedMaybe(dictBounded) {
  return new Data_Bounded.Bounded(function () {
    return ordMaybe(dictBounded.Ord0());
  }, Nothing.value, new Just(Data_Bounded.top(dictBounded)));
};

var applyMaybe = new Control_Apply.Apply(function () {
  return functorMaybe;
}, function (v) {
  return function (v1) {
    if (v instanceof Just) {
      return Data_Functor.map(functorMaybe)(v.value0)(v1);
    }

    ;

    if (v instanceof Nothing) {
      return Nothing.value;
    }

    ;
    throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
  };
});
var bindMaybe = new Control_Bind.Bind(function () {
  return applyMaybe;
}, function (v) {
  return function (v1) {
    if (v instanceof Just) {
      return v1(v.value0);
    }

    ;

    if (v instanceof Nothing) {
      return Nothing.value;
    }

    ;
    throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
  };
});
var applicativeMaybe = new Control_Applicative.Applicative(function () {
  return applyMaybe;
}, Just.create);
var monadMaybe = new Control_Monad.Monad(function () {
  return applicativeMaybe;
}, function () {
  return bindMaybe;
});
var altMaybe = new Control_Alt.Alt(function () {
  return functorMaybe;
}, function (v) {
  return function (v1) {
    if (v instanceof Nothing) {
      return v1;
    }

    ;
    return v;
  };
});
var plusMaybe = new Control_Plus.Plus(function () {
  return altMaybe;
}, Nothing.value);
var alternativeMaybe = new Control_Alternative.Alternative(function () {
  return applicativeMaybe;
}, function () {
  return plusMaybe;
});
var monadZeroMaybe = new Control_MonadZero.MonadZero(function () {
  return alternativeMaybe;
}, function () {
  return monadMaybe;
});
module.exports = {
  Nothing: Nothing,
  Just: Just,
  maybe: maybe,
  "maybe'": maybe$prime,
  fromMaybe: fromMaybe,
  "fromMaybe'": fromMaybe$prime,
  isJust: isJust,
  isNothing: isNothing,
  fromJust: fromJust,
  optional: optional,
  functorMaybe: functorMaybe,
  applyMaybe: applyMaybe,
  applicativeMaybe: applicativeMaybe,
  altMaybe: altMaybe,
  plusMaybe: plusMaybe,
  alternativeMaybe: alternativeMaybe,
  bindMaybe: bindMaybe,
  monadMaybe: monadMaybe,
  monadZeroMaybe: monadZeroMaybe,
  extendMaybe: extendMaybe,
  invariantMaybe: invariantMaybe,
  semigroupMaybe: semigroupMaybe,
  monoidMaybe: monoidMaybe,
  eqMaybe: eqMaybe,
  eq1Maybe: eq1Maybe,
  ordMaybe: ordMaybe,
  ord1Maybe: ord1Maybe,
  boundedMaybe: boundedMaybe,
  showMaybe: showMaybe
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Control.Extend/index.js":"output/Control.Extend/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.MonadZero/index.js":"output/Control.MonadZero/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Functor.Invariant/index.js":"output/Data.Functor.Invariant/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Monoid.Conj/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Show = require("../Data.Show/index.js");

var Conj = function Conj(x) {
  return x;
};

var showConj = function showConj(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Conj " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semiringConj = function semiringConj(dictHeytingAlgebra) {
  return new Data_Semiring.Semiring(function (v) {
    return function (v1) {
      return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
    };
  }, function (v) {
    return function (v1) {
      return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
    };
  }, Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};

var semigroupConj = function semigroupConj(dictHeytingAlgebra) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
    };
  });
};

var ordConj = function ordConj(dictOrd) {
  return dictOrd;
};

var monoidConj = function monoidConj(dictHeytingAlgebra) {
  return new Data_Monoid.Monoid(function () {
    return semigroupConj(dictHeytingAlgebra);
  }, Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};

var functorConj = new Data_Functor.Functor(function (f) {
  return function (m) {
    return f(m);
  };
});

var eqConj = function eqConj(dictEq) {
  return dictEq;
};

var eq1Conj = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqConj(dictEq));
});
var ord1Conj = new Data_Ord.Ord1(function () {
  return eq1Conj;
}, function (dictOrd) {
  return Data_Ord.compare(ordConj(dictOrd));
});

var boundedConj = function boundedConj(dictBounded) {
  return dictBounded;
};

var applyConj = new Control_Apply.Apply(function () {
  return functorConj;
}, function (v) {
  return function (v1) {
    return v(v1);
  };
});
var bindConj = new Control_Bind.Bind(function () {
  return applyConj;
}, function (v) {
  return function (f) {
    return f(v);
  };
});
var applicativeConj = new Control_Applicative.Applicative(function () {
  return applyConj;
}, Conj);
var monadConj = new Control_Monad.Monad(function () {
  return applicativeConj;
}, function () {
  return bindConj;
});
module.exports = {
  Conj: Conj,
  eqConj: eqConj,
  eq1Conj: eq1Conj,
  ordConj: ordConj,
  ord1Conj: ord1Conj,
  boundedConj: boundedConj,
  showConj: showConj,
  functorConj: functorConj,
  applyConj: applyConj,
  applicativeConj: applicativeConj,
  bindConj: bindConj,
  monadConj: monadConj,
  semigroupConj: semigroupConj,
  monoidConj: monoidConj,
  semiringConj: semiringConj
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.HeytingAlgebra/index.js":"output/Data.HeytingAlgebra/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Monoid.Disj/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Show = require("../Data.Show/index.js");

var Disj = function Disj(x) {
  return x;
};

var showDisj = function showDisj(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Disj " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semiringDisj = function semiringDisj(dictHeytingAlgebra) {
  return new Data_Semiring.Semiring(function (v) {
    return function (v1) {
      return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
    };
  }, function (v) {
    return function (v1) {
      return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
    };
  }, Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra));
};

var semigroupDisj = function semigroupDisj(dictHeytingAlgebra) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
    };
  });
};

var ordDisj = function ordDisj(dictOrd) {
  return dictOrd;
};

var monoidDisj = function monoidDisj(dictHeytingAlgebra) {
  return new Data_Monoid.Monoid(function () {
    return semigroupDisj(dictHeytingAlgebra);
  }, Data_HeytingAlgebra.ff(dictHeytingAlgebra));
};

var functorDisj = new Data_Functor.Functor(function (f) {
  return function (m) {
    return f(m);
  };
});

var eqDisj = function eqDisj(dictEq) {
  return dictEq;
};

var eq1Disj = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqDisj(dictEq));
});
var ord1Disj = new Data_Ord.Ord1(function () {
  return eq1Disj;
}, function (dictOrd) {
  return Data_Ord.compare(ordDisj(dictOrd));
});

var boundedDisj = function boundedDisj(dictBounded) {
  return dictBounded;
};

var applyDisj = new Control_Apply.Apply(function () {
  return functorDisj;
}, function (v) {
  return function (v1) {
    return v(v1);
  };
});
var bindDisj = new Control_Bind.Bind(function () {
  return applyDisj;
}, function (v) {
  return function (f) {
    return f(v);
  };
});
var applicativeDisj = new Control_Applicative.Applicative(function () {
  return applyDisj;
}, Disj);
var monadDisj = new Control_Monad.Monad(function () {
  return applicativeDisj;
}, function () {
  return bindDisj;
});
module.exports = {
  Disj: Disj,
  eqDisj: eqDisj,
  eq1Disj: eq1Disj,
  ordDisj: ordDisj,
  ord1Disj: ord1Disj,
  boundedDisj: boundedDisj,
  showDisj: showDisj,
  functorDisj: functorDisj,
  applyDisj: applyDisj,
  applicativeDisj: applicativeDisj,
  bindDisj: bindDisj,
  monadDisj: monadDisj,
  semigroupDisj: semigroupDisj,
  monoidDisj: monoidDisj,
  semiringDisj: semiringDisj
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.HeytingAlgebra/index.js":"output/Data.HeytingAlgebra/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Monoid.Dual/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Dual = function Dual(x) {
  return x;
};

var showDual = function showDual(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Dual " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupDual = function semigroupDual(dictSemigroup) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Data_Semigroup.append(dictSemigroup)(v1)(v);
    };
  });
};

var ordDual = function ordDual(dictOrd) {
  return dictOrd;
};

var monoidDual = function monoidDual(dictMonoid) {
  return new Data_Monoid.Monoid(function () {
    return semigroupDual(dictMonoid.Semigroup0());
  }, Data_Monoid.mempty(dictMonoid));
};

var functorDual = new Data_Functor.Functor(function (f) {
  return function (m) {
    return f(m);
  };
});

var eqDual = function eqDual(dictEq) {
  return dictEq;
};

var eq1Dual = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqDual(dictEq));
});
var ord1Dual = new Data_Ord.Ord1(function () {
  return eq1Dual;
}, function (dictOrd) {
  return Data_Ord.compare(ordDual(dictOrd));
});

var boundedDual = function boundedDual(dictBounded) {
  return dictBounded;
};

var applyDual = new Control_Apply.Apply(function () {
  return functorDual;
}, function (v) {
  return function (v1) {
    return v(v1);
  };
});
var bindDual = new Control_Bind.Bind(function () {
  return applyDual;
}, function (v) {
  return function (f) {
    return f(v);
  };
});
var applicativeDual = new Control_Applicative.Applicative(function () {
  return applyDual;
}, Dual);
var monadDual = new Control_Monad.Monad(function () {
  return applicativeDual;
}, function () {
  return bindDual;
});
module.exports = {
  Dual: Dual,
  eqDual: eqDual,
  eq1Dual: eq1Dual,
  ordDual: ordDual,
  ord1Dual: ord1Dual,
  boundedDual: boundedDual,
  showDual: showDual,
  functorDual: functorDual,
  applyDual: applyDual,
  applicativeDual: applicativeDual,
  bindDual: bindDual,
  monadDual: monadDual,
  semigroupDual: semigroupDual,
  monoidDual: monoidDual
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Monoid.Endo/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Category = require("../Control.Category/index.js");

var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Endo = function Endo(x) {
  return x;
};

var showEndo = function showEndo(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Endo " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupEndo = function semigroupEndo(dictSemigroupoid) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Control_Semigroupoid.compose(dictSemigroupoid)(v)(v1);
    };
  });
};

var ordEndo = function ordEndo(dictOrd) {
  return dictOrd;
};

var monoidEndo = function monoidEndo(dictCategory) {
  return new Data_Monoid.Monoid(function () {
    return semigroupEndo(dictCategory.Semigroupoid0());
  }, Control_Category.identity(dictCategory));
};

var eqEndo = function eqEndo(dictEq) {
  return dictEq;
};

var boundedEndo = function boundedEndo(dictBounded) {
  return dictBounded;
};

module.exports = {
  Endo: Endo,
  eqEndo: eqEndo,
  ordEndo: ordEndo,
  boundedEndo: boundedEndo,
  showEndo: showEndo,
  semigroupEndo: semigroupEndo,
  monoidEndo: monoidEndo
};
},{"../Control.Category/index.js":"output/Control.Category/index.js","../Control.Semigroupoid/index.js":"output/Control.Semigroupoid/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Monoid.Additive/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Show = require("../Data.Show/index.js");

var Additive = function Additive(x) {
  return x;
};

var showAdditive = function showAdditive(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Additive " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupAdditive = function semigroupAdditive(dictSemiring) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Data_Semiring.add(dictSemiring)(v)(v1);
    };
  });
};

var ordAdditive = function ordAdditive(dictOrd) {
  return dictOrd;
};

var monoidAdditive = function monoidAdditive(dictSemiring) {
  return new Data_Monoid.Monoid(function () {
    return semigroupAdditive(dictSemiring);
  }, Data_Semiring.zero(dictSemiring));
};

var functorAdditive = new Data_Functor.Functor(function (f) {
  return function (m) {
    return f(m);
  };
});

var eqAdditive = function eqAdditive(dictEq) {
  return dictEq;
};

var eq1Additive = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqAdditive(dictEq));
});
var ord1Additive = new Data_Ord.Ord1(function () {
  return eq1Additive;
}, function (dictOrd) {
  return Data_Ord.compare(ordAdditive(dictOrd));
});

var boundedAdditive = function boundedAdditive(dictBounded) {
  return dictBounded;
};

var applyAdditive = new Control_Apply.Apply(function () {
  return functorAdditive;
}, function (v) {
  return function (v1) {
    return v(v1);
  };
});
var bindAdditive = new Control_Bind.Bind(function () {
  return applyAdditive;
}, function (v) {
  return function (f) {
    return f(v);
  };
});
var applicativeAdditive = new Control_Applicative.Applicative(function () {
  return applyAdditive;
}, Additive);
var monadAdditive = new Control_Monad.Monad(function () {
  return applicativeAdditive;
}, function () {
  return bindAdditive;
});
module.exports = {
  Additive: Additive,
  eqAdditive: eqAdditive,
  eq1Additive: eq1Additive,
  ordAdditive: ordAdditive,
  ord1Additive: ord1Additive,
  boundedAdditive: boundedAdditive,
  showAdditive: showAdditive,
  functorAdditive: functorAdditive,
  applyAdditive: applyAdditive,
  applicativeAdditive: applicativeAdditive,
  bindAdditive: bindAdditive,
  monadAdditive: monadAdditive,
  semigroupAdditive: semigroupAdditive,
  monoidAdditive: monoidAdditive
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Monoid.Multiplicative/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Show = require("../Data.Show/index.js");

var Multiplicative = function Multiplicative(x) {
  return x;
};

var showMultiplicative = function showMultiplicative(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Multiplicative " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupMultiplicative = function semigroupMultiplicative(dictSemiring) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Data_Semiring.mul(dictSemiring)(v)(v1);
    };
  });
};

var ordMultiplicative = function ordMultiplicative(dictOrd) {
  return dictOrd;
};

var monoidMultiplicative = function monoidMultiplicative(dictSemiring) {
  return new Data_Monoid.Monoid(function () {
    return semigroupMultiplicative(dictSemiring);
  }, Data_Semiring.one(dictSemiring));
};

var functorMultiplicative = new Data_Functor.Functor(function (f) {
  return function (m) {
    return f(m);
  };
});

var eqMultiplicative = function eqMultiplicative(dictEq) {
  return dictEq;
};

var eq1Multiplicative = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqMultiplicative(dictEq));
});
var ord1Multiplicative = new Data_Ord.Ord1(function () {
  return eq1Multiplicative;
}, function (dictOrd) {
  return Data_Ord.compare(ordMultiplicative(dictOrd));
});

var boundedMultiplicative = function boundedMultiplicative(dictBounded) {
  return dictBounded;
};

var applyMultiplicative = new Control_Apply.Apply(function () {
  return functorMultiplicative;
}, function (v) {
  return function (v1) {
    return v(v1);
  };
});
var bindMultiplicative = new Control_Bind.Bind(function () {
  return applyMultiplicative;
}, function (v) {
  return function (f) {
    return f(v);
  };
});
var applicativeMultiplicative = new Control_Applicative.Applicative(function () {
  return applyMultiplicative;
}, Multiplicative);
var monadMultiplicative = new Control_Monad.Monad(function () {
  return applicativeMultiplicative;
}, function () {
  return bindMultiplicative;
});
module.exports = {
  Multiplicative: Multiplicative,
  eqMultiplicative: eqMultiplicative,
  eq1Multiplicative: eq1Multiplicative,
  ordMultiplicative: ordMultiplicative,
  ord1Multiplicative: ord1Multiplicative,
  boundedMultiplicative: boundedMultiplicative,
  showMultiplicative: showMultiplicative,
  functorMultiplicative: functorMultiplicative,
  applyMultiplicative: applyMultiplicative,
  applicativeMultiplicative: applicativeMultiplicative,
  bindMultiplicative: bindMultiplicative,
  monadMultiplicative: monadMultiplicative,
  semigroupMultiplicative: semigroupMultiplicative,
  monoidMultiplicative: monoidMultiplicative
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Semigroup.First/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var First = function First(x) {
  return x;
};

var showFirst = function showFirst(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(First " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupFirst = new Data_Semigroup.Semigroup(function (x) {
  return function (v) {
    return x;
  };
});

var ordFirst = function ordFirst(dictOrd) {
  return dictOrd;
};

var functorFirst = new Data_Functor.Functor(function (f) {
  return function (m) {
    return f(m);
  };
});

var eqFirst = function eqFirst(dictEq) {
  return dictEq;
};

var eq1First = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqFirst(dictEq));
});
var ord1First = new Data_Ord.Ord1(function () {
  return eq1First;
}, function (dictOrd) {
  return Data_Ord.compare(ordFirst(dictOrd));
});

var boundedFirst = function boundedFirst(dictBounded) {
  return dictBounded;
};

var applyFirst = new Control_Apply.Apply(function () {
  return functorFirst;
}, function (v) {
  return function (v1) {
    return v(v1);
  };
});
var bindFirst = new Control_Bind.Bind(function () {
  return applyFirst;
}, function (v) {
  return function (f) {
    return f(v);
  };
});
var applicativeFirst = new Control_Applicative.Applicative(function () {
  return applyFirst;
}, First);
var monadFirst = new Control_Monad.Monad(function () {
  return applicativeFirst;
}, function () {
  return bindFirst;
});
module.exports = {
  First: First,
  eqFirst: eqFirst,
  eq1First: eq1First,
  ordFirst: ordFirst,
  ord1First: ord1First,
  boundedFirst: boundedFirst,
  showFirst: showFirst,
  functorFirst: functorFirst,
  applyFirst: applyFirst,
  applicativeFirst: applicativeFirst,
  bindFirst: bindFirst,
  monadFirst: monadFirst,
  semigroupFirst: semigroupFirst
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Semigroup.Last/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Last = function Last(x) {
  return x;
};

var showLast = function showLast(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Last " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupLast = new Data_Semigroup.Semigroup(function (v) {
  return function (x) {
    return x;
  };
});

var ordLast = function ordLast(dictOrd) {
  return dictOrd;
};

var functorLast = new Data_Functor.Functor(function (f) {
  return function (m) {
    return f(m);
  };
});

var eqLast = function eqLast(dictEq) {
  return dictEq;
};

var eq1Last = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqLast(dictEq));
});
var ord1Last = new Data_Ord.Ord1(function () {
  return eq1Last;
}, function (dictOrd) {
  return Data_Ord.compare(ordLast(dictOrd));
});

var boundedLast = function boundedLast(dictBounded) {
  return dictBounded;
};

var applyLast = new Control_Apply.Apply(function () {
  return functorLast;
}, function (v) {
  return function (v1) {
    return v(v1);
  };
});
var bindLast = new Control_Bind.Bind(function () {
  return applyLast;
}, function (v) {
  return function (f) {
    return f(v);
  };
});
var applicativeLast = new Control_Applicative.Applicative(function () {
  return applyLast;
}, Last);
var monadLast = new Control_Monad.Monad(function () {
  return applicativeLast;
}, function () {
  return bindLast;
});
module.exports = {
  Last: Last,
  eqLast: eqLast,
  eq1Last: eq1Last,
  ordLast: ordLast,
  ord1Last: ord1Last,
  boundedLast: boundedLast,
  showLast: showLast,
  functorLast: functorLast,
  applyLast: applyLast,
  applicativeLast: applicativeLast,
  bindLast: bindLast,
  monadLast: monadLast,
  semigroupLast: semigroupLast
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Newtype/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");

var Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");

var Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");

var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");

var Data_Monoid_Endo = require("../Data.Monoid.Endo/index.js");

var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");

var Data_Semigroup_First = require("../Data.Semigroup.First/index.js");

var Data_Semigroup_Last = require("../Data.Semigroup.Last/index.js");

var Newtype = function Newtype(unwrap, wrap) {
  this.unwrap = unwrap;
  this.wrap = wrap;
};

var wrap = function wrap(dict) {
  return dict.wrap;
};

var unwrap = function unwrap(dict) {
  return dict.unwrap;
};

var underF2 = function underF2(dictFunctor) {
  return function (dictFunctor1) {
    return function (dictNewtype) {
      return function (dictNewtype1) {
        return function (v) {
          return function (f) {
            var $66 = Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn)(Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1)));
            var $67 = Data_Function.on(f)(Data_Functor.map(dictFunctor)(wrap(dictNewtype)));
            return function ($68) {
              return $66($67($68));
            };
          };
        };
      };
    };
  };
};

var underF = function underF(dictFunctor) {
  return function (dictFunctor1) {
    return function (dictNewtype) {
      return function (dictNewtype1) {
        return function (v) {
          return function (f) {
            var $69 = Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1));
            var $70 = Data_Functor.map(dictFunctor)(wrap(dictNewtype));
            return function ($71) {
              return $69(f($70($71)));
            };
          };
        };
      };
    };
  };
};

var under2 = function under2(dictNewtype) {
  return function (dictNewtype1) {
    return function (v) {
      return function (f) {
        var $72 = Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn)(unwrap(dictNewtype1));
        var $73 = Data_Function.on(f)(wrap(dictNewtype));
        return function ($74) {
          return $72($73($74));
        };
      };
    };
  };
};

var under = function under(dictNewtype) {
  return function (dictNewtype1) {
    return function (v) {
      return function (f) {
        var $75 = unwrap(dictNewtype1);
        var $76 = wrap(dictNewtype);
        return function ($77) {
          return $75(f($76($77)));
        };
      };
    };
  };
};

var un = function un(dictNewtype) {
  return function (v) {
    return unwrap(dictNewtype);
  };
};

var traverse = function traverse(dictFunctor) {
  return function (dictNewtype) {
    return function (v) {
      return function (f) {
        var $78 = Data_Functor.map(dictFunctor)(wrap(dictNewtype));
        var $79 = unwrap(dictNewtype);
        return function ($80) {
          return $78(f($79($80)));
        };
      };
    };
  };
};

var overF2 = function overF2(dictFunctor) {
  return function (dictFunctor1) {
    return function (dictNewtype) {
      return function (dictNewtype1) {
        return function (v) {
          return function (f) {
            var $81 = Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn)(Data_Functor.map(dictFunctor1)(wrap(dictNewtype1)));
            var $82 = Data_Function.on(f)(Data_Functor.map(dictFunctor)(unwrap(dictNewtype)));
            return function ($83) {
              return $81($82($83));
            };
          };
        };
      };
    };
  };
};

var overF = function overF(dictFunctor) {
  return function (dictFunctor1) {
    return function (dictNewtype) {
      return function (dictNewtype1) {
        return function (v) {
          return function (f) {
            var $84 = Data_Functor.map(dictFunctor1)(wrap(dictNewtype1));
            var $85 = Data_Functor.map(dictFunctor)(unwrap(dictNewtype));
            return function ($86) {
              return $84(f($85($86)));
            };
          };
        };
      };
    };
  };
};

var over2 = function over2(dictNewtype) {
  return function (dictNewtype1) {
    return function (v) {
      return function (f) {
        var $87 = Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn)(wrap(dictNewtype1));
        var $88 = Data_Function.on(f)(unwrap(dictNewtype));
        return function ($89) {
          return $87($88($89));
        };
      };
    };
  };
};

var over = function over(dictNewtype) {
  return function (dictNewtype1) {
    return function (v) {
      return function (f) {
        var $90 = wrap(dictNewtype1);
        var $91 = unwrap(dictNewtype);
        return function ($92) {
          return $90(f($91($92)));
        };
      };
    };
  };
};

var op = function op(dictNewtype) {
  return un(dictNewtype);
};

var newtypeMultiplicative = new Newtype(function (v) {
  return v;
}, Data_Monoid_Multiplicative.Multiplicative);
var newtypeLast = new Newtype(function (v) {
  return v;
}, Data_Semigroup_Last.Last);
var newtypeFirst = new Newtype(function (v) {
  return v;
}, Data_Semigroup_First.First);
var newtypeEndo = new Newtype(function (v) {
  return v;
}, Data_Monoid_Endo.Endo);
var newtypeDual = new Newtype(function (v) {
  return v;
}, Data_Monoid_Dual.Dual);
var newtypeDisj = new Newtype(function (v) {
  return v;
}, Data_Monoid_Disj.Disj);
var newtypeConj = new Newtype(function (v) {
  return v;
}, Data_Monoid_Conj.Conj);
var newtypeAdditive = new Newtype(function (v) {
  return v;
}, Data_Monoid_Additive.Additive);

var collect = function collect(dictFunctor) {
  return function (dictNewtype) {
    return function (v) {
      return function (f) {
        var $93 = wrap(dictNewtype);
        var $94 = Data_Functor.map(dictFunctor)(unwrap(dictNewtype));
        return function ($95) {
          return $93(f($94($95)));
        };
      };
    };
  };
};

var alaF = function alaF(dictFunctor) {
  return function (dictFunctor1) {
    return function (dictNewtype) {
      return function (dictNewtype1) {
        return function (v) {
          return function (f) {
            var $96 = Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1));
            var $97 = Data_Functor.map(dictFunctor)(wrap(dictNewtype));
            return function ($98) {
              return $96(f($97($98)));
            };
          };
        };
      };
    };
  };
};

var ala = function ala(dictFunctor) {
  return function (dictNewtype) {
    return function (dictNewtype1) {
      return function (v) {
        return function (f) {
          return Data_Functor.map(dictFunctor)(unwrap(dictNewtype))(f(wrap(dictNewtype1)));
        };
      };
    };
  };
};

module.exports = {
  unwrap: unwrap,
  wrap: wrap,
  Newtype: Newtype,
  un: un,
  op: op,
  ala: ala,
  alaF: alaF,
  over: over,
  overF: overF,
  under: under,
  underF: underF,
  over2: over2,
  overF2: overF2,
  under2: under2,
  underF2: underF2,
  traverse: traverse,
  collect: collect,
  newtypeAdditive: newtypeAdditive,
  newtypeMultiplicative: newtypeMultiplicative,
  newtypeConj: newtypeConj,
  newtypeDisj: newtypeDisj,
  newtypeDual: newtypeDual,
  newtypeEndo: newtypeEndo,
  newtypeFirst: newtypeFirst,
  newtypeLast: newtypeLast
};
},{"../Control.Semigroupoid/index.js":"output/Control.Semigroupoid/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid.Additive/index.js":"output/Data.Monoid.Additive/index.js","../Data.Monoid.Conj/index.js":"output/Data.Monoid.Conj/index.js","../Data.Monoid.Disj/index.js":"output/Data.Monoid.Disj/index.js","../Data.Monoid.Dual/index.js":"output/Data.Monoid.Dual/index.js","../Data.Monoid.Endo/index.js":"output/Data.Monoid.Endo/index.js","../Data.Monoid.Multiplicative/index.js":"output/Data.Monoid.Multiplicative/index.js","../Data.Semigroup.First/index.js":"output/Data.Semigroup.First/index.js","../Data.Semigroup.Last/index.js":"output/Data.Semigroup.Last/index.js"}],"output/Data.Foldable/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Alt = require("../Control.Alt/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Category = require("../Control.Category/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");

var Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");

var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");

var Data_Monoid_Endo = require("../Data.Monoid.Endo/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Foldable = function Foldable(foldMap, foldl, foldr) {
  this.foldMap = foldMap;
  this.foldl = foldl;
  this.foldr = foldr;
};

var foldr = function foldr(dict) {
  return dict.foldr;
};

var indexr = function indexr(dictFoldable) {
  return function (idx) {
    var go = function go(a) {
      return function (cursor) {
        if (cursor.elem instanceof Data_Maybe.Just) {
          return cursor;
        }

        ;
        var $106 = cursor.pos === idx;

        if ($106) {
          return {
            elem: new Data_Maybe.Just(a),
            pos: cursor.pos
          };
        }

        ;
        return {
          pos: cursor.pos + 1 | 0,
          elem: cursor.elem
        };
      };
    };

    var $193 = foldr(dictFoldable)(go)({
      elem: Data_Maybe.Nothing.value,
      pos: 0
    });
    return function ($194) {
      return function (v) {
        return v.elem;
      }($193($194));
    };
  };
};

var $$null = function $$null(dictFoldable) {
  return foldr(dictFoldable)(function (v) {
    return function (v1) {
      return false;
    };
  })(true);
};

var oneOf = function oneOf(dictFoldable) {
  return function (dictPlus) {
    return foldr(dictFoldable)(Control_Alt.alt(dictPlus.Alt0()))(Control_Plus.empty(dictPlus));
  };
};

var oneOfMap = function oneOfMap(dictFoldable) {
  return function (dictPlus) {
    return function (f) {
      return foldr(dictFoldable)(function () {
        var $195 = Control_Alt.alt(dictPlus.Alt0());
        return function ($196) {
          return $195(f($196));
        };
      }())(Control_Plus.empty(dictPlus));
    };
  };
};

var traverse_ = function traverse_(dictApplicative) {
  return function (dictFoldable) {
    return function (f) {
      return foldr(dictFoldable)(function () {
        var $197 = Control_Apply.applySecond(dictApplicative.Apply0());
        return function ($198) {
          return $197(f($198));
        };
      }())(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
    };
  };
};

var for_ = function for_(dictApplicative) {
  return function (dictFoldable) {
    return Data_Function.flip(traverse_(dictApplicative)(dictFoldable));
  };
};

var sequence_ = function sequence_(dictApplicative) {
  return function (dictFoldable) {
    return traverse_(dictApplicative)(dictFoldable)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var foldl = function foldl(dict) {
  return dict.foldl;
};

var indexl = function indexl(dictFoldable) {
  return function (idx) {
    var go = function go(cursor) {
      return function (a) {
        if (cursor.elem instanceof Data_Maybe.Just) {
          return cursor;
        }

        ;
        var $109 = cursor.pos === idx;

        if ($109) {
          return {
            elem: new Data_Maybe.Just(a),
            pos: cursor.pos
          };
        }

        ;
        return {
          pos: cursor.pos + 1 | 0,
          elem: cursor.elem
        };
      };
    };

    var $199 = foldl(dictFoldable)(go)({
      elem: Data_Maybe.Nothing.value,
      pos: 0
    });
    return function ($200) {
      return function (v) {
        return v.elem;
      }($199($200));
    };
  };
};

var intercalate = function intercalate(dictFoldable) {
  return function (dictMonoid) {
    return function (sep) {
      return function (xs) {
        var go = function go(v) {
          return function (x) {
            if (v.init) {
              return {
                init: false,
                acc: x
              };
            }

            ;
            return {
              init: false,
              acc: Data_Semigroup.append(dictMonoid.Semigroup0())(v.acc)(Data_Semigroup.append(dictMonoid.Semigroup0())(sep)(x))
            };
          };
        };

        return foldl(dictFoldable)(go)({
          init: true,
          acc: Data_Monoid.mempty(dictMonoid)
        })(xs).acc;
      };
    };
  };
};

var length = function length(dictFoldable) {
  return function (dictSemiring) {
    return foldl(dictFoldable)(function (c) {
      return function (v) {
        return Data_Semiring.add(dictSemiring)(Data_Semiring.one(dictSemiring))(c);
      };
    })(Data_Semiring.zero(dictSemiring));
  };
};

var maximumBy = function maximumBy(dictFoldable) {
  return function (cmp) {
    var max$prime = function max$prime(v) {
      return function (v1) {
        if (v instanceof Data_Maybe.Nothing) {
          return new Data_Maybe.Just(v1);
        }

        ;

        if (v instanceof Data_Maybe.Just) {
          return new Data_Maybe.Just(function () {
            var $116 = Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.GT.value);

            if ($116) {
              return v.value0;
            }

            ;
            return v1;
          }());
        }

        ;
        throw new Error("Failed pattern match at Data.Foldable (line 389, column 3 - line 389, column 27): " + [v.constructor.name, v1.constructor.name]);
      };
    };

    return foldl(dictFoldable)(max$prime)(Data_Maybe.Nothing.value);
  };
};

var maximum = function maximum(dictOrd) {
  return function (dictFoldable) {
    return maximumBy(dictFoldable)(Data_Ord.compare(dictOrd));
  };
};

var minimumBy = function minimumBy(dictFoldable) {
  return function (cmp) {
    var min$prime = function min$prime(v) {
      return function (v1) {
        if (v instanceof Data_Maybe.Nothing) {
          return new Data_Maybe.Just(v1);
        }

        ;

        if (v instanceof Data_Maybe.Just) {
          return new Data_Maybe.Just(function () {
            var $120 = Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.LT.value);

            if ($120) {
              return v.value0;
            }

            ;
            return v1;
          }());
        }

        ;
        throw new Error("Failed pattern match at Data.Foldable (line 402, column 3 - line 402, column 27): " + [v.constructor.name, v1.constructor.name]);
      };
    };

    return foldl(dictFoldable)(min$prime)(Data_Maybe.Nothing.value);
  };
};

var minimum = function minimum(dictOrd) {
  return function (dictFoldable) {
    return minimumBy(dictFoldable)(Data_Ord.compare(dictOrd));
  };
};

var product = function product(dictFoldable) {
  return function (dictSemiring) {
    return foldl(dictFoldable)(Data_Semiring.mul(dictSemiring))(Data_Semiring.one(dictSemiring));
  };
};

var sum = function sum(dictFoldable) {
  return function (dictSemiring) {
    return foldl(dictFoldable)(Data_Semiring.add(dictSemiring))(Data_Semiring.zero(dictSemiring));
  };
};

var foldableMultiplicative = new Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(v)(z);
    };
  };
});
var foldableMaybe = new Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      if (v instanceof Data_Maybe.Nothing) {
        return Data_Monoid.mempty(dictMonoid);
      }

      ;

      if (v instanceof Data_Maybe.Just) {
        return f(v.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Foldable (line 129, column 1 - line 135, column 27): " + [f.constructor.name, v.constructor.name]);
    };
  };
}, function (v) {
  return function (z) {
    return function (v1) {
      if (v1 instanceof Data_Maybe.Nothing) {
        return z;
      }

      ;

      if (v1 instanceof Data_Maybe.Just) {
        return v(z)(v1.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Foldable (line 129, column 1 - line 135, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
    };
  };
}, function (v) {
  return function (z) {
    return function (v1) {
      if (v1 instanceof Data_Maybe.Nothing) {
        return z;
      }

      ;

      if (v1 instanceof Data_Maybe.Just) {
        return v(v1.value0)(z);
      }

      ;
      throw new Error("Failed pattern match at Data.Foldable (line 129, column 1 - line 135, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
    };
  };
});
var foldableDual = new Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(v)(z);
    };
  };
});
var foldableDisj = new Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(v)(z);
    };
  };
});
var foldableConj = new Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(v)(z);
    };
  };
});
var foldableAdditive = new Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(v)(z);
    };
  };
});

var foldMapDefaultR = function foldMapDefaultR(dictFoldable) {
  return function (dictMonoid) {
    return function (f) {
      return foldr(dictFoldable)(function (x) {
        return function (acc) {
          return Data_Semigroup.append(dictMonoid.Semigroup0())(f(x))(acc);
        };
      })(Data_Monoid.mempty(dictMonoid));
    };
  };
};

var foldableArray = new Foldable(function (dictMonoid) {
  return foldMapDefaultR(foldableArray)(dictMonoid);
}, $foreign.foldlArray, $foreign.foldrArray);

var foldMapDefaultL = function foldMapDefaultL(dictFoldable) {
  return function (dictMonoid) {
    return function (f) {
      return foldl(dictFoldable)(function (acc) {
        return function (x) {
          return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(x));
        };
      })(Data_Monoid.mempty(dictMonoid));
    };
  };
};

var foldMap = function foldMap(dict) {
  return dict.foldMap;
};

var foldableFirst = new Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return foldMap(foldableMaybe)(dictMonoid)(f)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return foldl(foldableMaybe)(f)(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return foldr(foldableMaybe)(f)(z)(v);
    };
  };
});
var foldableLast = new Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return foldMap(foldableMaybe)(dictMonoid)(f)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return foldl(foldableMaybe)(f)(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return foldr(foldableMaybe)(f)(z)(v);
    };
  };
});

var foldlDefault = function foldlDefault(dictFoldable) {
  return function (c) {
    return function (u) {
      return function (xs) {
        return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(Data_Newtype.unwrap(Data_Newtype.newtypeDual)(foldMap(dictFoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn)))(function () {
          var $201 = Data_Function.flip(c);
          return function ($202) {
            return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($201($202)));
          };
        }())(xs)))(u);
      };
    };
  };
};

var foldrDefault = function foldrDefault(dictFoldable) {
  return function (c) {
    return function (u) {
      return function (xs) {
        return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(foldMap(dictFoldable)(Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn))(function ($203) {
          return Data_Monoid_Endo.Endo(c($203));
        })(xs))(u);
      };
    };
  };
};

var surroundMap = function surroundMap(dictFoldable) {
  return function (dictSemigroup) {
    return function (d) {
      return function (t) {
        return function (f) {
          var joined = function joined(a) {
            return function (m) {
              return Data_Semigroup.append(dictSemigroup)(d)(Data_Semigroup.append(dictSemigroup)(t(a))(m));
            };
          };

          return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(foldMap(dictFoldable)(Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn))(joined)(f))(d);
        };
      };
    };
  };
};

var surround = function surround(dictFoldable) {
  return function (dictSemigroup) {
    return function (d) {
      return surroundMap(dictFoldable)(dictSemigroup)(d)(Control_Category.identity(Control_Category.categoryFn));
    };
  };
};

var foldM = function foldM(dictFoldable) {
  return function (dictMonad) {
    return function (f) {
      return function (a0) {
        return foldl(dictFoldable)(function (ma) {
          return function (b) {
            return Control_Bind.bind(dictMonad.Bind1())(ma)(Data_Function.flip(f)(b));
          };
        })(Control_Applicative.pure(dictMonad.Applicative0())(a0));
      };
    };
  };
};

var fold = function fold(dictFoldable) {
  return function (dictMonoid) {
    return foldMap(dictFoldable)(dictMonoid)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var findMap = function findMap(dictFoldable) {
  return function (p) {
    var go = function go(v) {
      return function (v1) {
        if (v instanceof Data_Maybe.Nothing) {
          return p(v1);
        }

        ;
        return v;
      };
    };

    return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
  };
};

var find = function find(dictFoldable) {
  return function (p) {
    var go = function go(v) {
      return function (v1) {
        if (v instanceof Data_Maybe.Nothing && p(v1)) {
          return new Data_Maybe.Just(v1);
        }

        ;
        return v;
      };
    };

    return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
  };
};

var any = function any(dictFoldable) {
  return function (dictHeytingAlgebra) {
    return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Newtype.newtypeDisj)(Data_Newtype.newtypeDisj)(Data_Monoid_Disj.Disj)(foldMap(dictFoldable)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra)));
  };
};

var elem = function elem(dictFoldable) {
  return function (dictEq) {
    var $204 = any(dictFoldable)(Data_HeytingAlgebra.heytingAlgebraBoolean);
    var $205 = Data_Eq.eq(dictEq);
    return function ($206) {
      return $204($205($206));
    };
  };
};

var notElem = function notElem(dictFoldable) {
  return function (dictEq) {
    return function (x) {
      var $207 = Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean);
      var $208 = elem(dictFoldable)(dictEq)(x);
      return function ($209) {
        return $207($208($209));
      };
    };
  };
};

var or = function or(dictFoldable) {
  return function (dictHeytingAlgebra) {
    return any(dictFoldable)(dictHeytingAlgebra)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var all = function all(dictFoldable) {
  return function (dictHeytingAlgebra) {
    return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Newtype.newtypeConj)(Data_Newtype.newtypeConj)(Data_Monoid_Conj.Conj)(foldMap(dictFoldable)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra)));
  };
};

var and = function and(dictFoldable) {
  return function (dictHeytingAlgebra) {
    return all(dictFoldable)(dictHeytingAlgebra)(Control_Category.identity(Control_Category.categoryFn));
  };
};

module.exports = {
  Foldable: Foldable,
  foldr: foldr,
  foldl: foldl,
  foldMap: foldMap,
  foldrDefault: foldrDefault,
  foldlDefault: foldlDefault,
  foldMapDefaultL: foldMapDefaultL,
  foldMapDefaultR: foldMapDefaultR,
  fold: fold,
  foldM: foldM,
  traverse_: traverse_,
  for_: for_,
  sequence_: sequence_,
  oneOf: oneOf,
  oneOfMap: oneOfMap,
  intercalate: intercalate,
  surroundMap: surroundMap,
  surround: surround,
  and: and,
  or: or,
  all: all,
  any: any,
  sum: sum,
  product: product,
  elem: elem,
  notElem: notElem,
  indexl: indexl,
  indexr: indexr,
  find: find,
  findMap: findMap,
  maximum: maximum,
  maximumBy: maximumBy,
  minimum: minimum,
  minimumBy: minimumBy,
  "null": $$null,
  length: length,
  foldableArray: foldableArray,
  foldableMaybe: foldableMaybe,
  foldableFirst: foldableFirst,
  foldableLast: foldableLast,
  foldableAdditive: foldableAdditive,
  foldableDual: foldableDual,
  foldableDisj: foldableDisj,
  foldableConj: foldableConj,
  foldableMultiplicative: foldableMultiplicative
};
},{"./foreign.js":"output/Data.Foldable/foreign.js","../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.HeytingAlgebra/index.js":"output/Data.HeytingAlgebra/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Monoid.Conj/index.js":"output/Data.Monoid.Conj/index.js","../Data.Monoid.Disj/index.js":"output/Data.Monoid.Disj/index.js","../Data.Monoid.Dual/index.js":"output/Data.Monoid.Dual/index.js","../Data.Monoid.Endo/index.js":"output/Data.Monoid.Endo/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Bifoldable/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");

var Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");

var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");

var Data_Monoid_Endo = require("../Data.Monoid.Endo/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Bifoldable = function Bifoldable(bifoldMap, bifoldl, bifoldr) {
  this.bifoldMap = bifoldMap;
  this.bifoldl = bifoldl;
  this.bifoldr = bifoldr;
};

var bifoldr = function bifoldr(dict) {
  return dict.bifoldr;
};

var bitraverse_ = function bitraverse_(dictBifoldable) {
  return function (dictApplicative) {
    return function (f) {
      return function (g) {
        return bifoldr(dictBifoldable)(function () {
          var $97 = Control_Apply.applySecond(dictApplicative.Apply0());
          return function ($98) {
            return $97(f($98));
          };
        }())(function () {
          var $99 = Control_Apply.applySecond(dictApplicative.Apply0());
          return function ($100) {
            return $99(g($100));
          };
        }())(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
      };
    };
  };
};

var bifor_ = function bifor_(dictBifoldable) {
  return function (dictApplicative) {
    return function (t) {
      return function (f) {
        return function (g) {
          return bitraverse_(dictBifoldable)(dictApplicative)(f)(g)(t);
        };
      };
    };
  };
};

var bisequence_ = function bisequence_(dictBifoldable) {
  return function (dictApplicative) {
    return bitraverse_(dictBifoldable)(dictApplicative)(Control_Category.identity(Control_Category.categoryFn))(Control_Category.identity(Control_Category.categoryFn));
  };
};

var bifoldl = function bifoldl(dict) {
  return dict.bifoldl;
};

var bifoldableJoker = function bifoldableJoker(dictFoldable) {
  return new Bifoldable(function (dictMonoid) {
    return function (v) {
      return function (r) {
        return function (v1) {
          return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(r)(v1);
        };
      };
    };
  }, function (v) {
    return function (r) {
      return function (u) {
        return function (v1) {
          return Data_Foldable.foldl(dictFoldable)(r)(u)(v1);
        };
      };
    };
  }, function (v) {
    return function (r) {
      return function (u) {
        return function (v1) {
          return Data_Foldable.foldr(dictFoldable)(r)(u)(v1);
        };
      };
    };
  });
};

var bifoldableClown = function bifoldableClown(dictFoldable) {
  return new Bifoldable(function (dictMonoid) {
    return function (l) {
      return function (v) {
        return function (v1) {
          return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(l)(v1);
        };
      };
    };
  }, function (l) {
    return function (v) {
      return function (u) {
        return function (v1) {
          return Data_Foldable.foldl(dictFoldable)(l)(u)(v1);
        };
      };
    };
  }, function (l) {
    return function (v) {
      return function (u) {
        return function (v1) {
          return Data_Foldable.foldr(dictFoldable)(l)(u)(v1);
        };
      };
    };
  });
};

var bifoldMapDefaultR = function bifoldMapDefaultR(dictBifoldable) {
  return function (dictMonoid) {
    return function (f) {
      return function (g) {
        return bifoldr(dictBifoldable)(function () {
          var $101 = Data_Semigroup.append(dictMonoid.Semigroup0());
          return function ($102) {
            return $101(f($102));
          };
        }())(function () {
          var $103 = Data_Semigroup.append(dictMonoid.Semigroup0());
          return function ($104) {
            return $103(g($104));
          };
        }())(Data_Monoid.mempty(dictMonoid));
      };
    };
  };
};

var bifoldMapDefaultL = function bifoldMapDefaultL(dictBifoldable) {
  return function (dictMonoid) {
    return function (f) {
      return function (g) {
        return bifoldl(dictBifoldable)(function (m) {
          return function (a) {
            return Data_Semigroup.append(dictMonoid.Semigroup0())(m)(f(a));
          };
        })(function (m) {
          return function (b) {
            return Data_Semigroup.append(dictMonoid.Semigroup0())(m)(g(b));
          };
        })(Data_Monoid.mempty(dictMonoid));
      };
    };
  };
};

var bifoldMap = function bifoldMap(dict) {
  return dict.bifoldMap;
};

var bifoldableFlip = function bifoldableFlip(dictBifoldable) {
  return new Bifoldable(function (dictMonoid) {
    return function (r) {
      return function (l) {
        return function (v) {
          return bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v);
        };
      };
    };
  }, function (r) {
    return function (l) {
      return function (u) {
        return function (v) {
          return bifoldl(dictBifoldable)(l)(r)(u)(v);
        };
      };
    };
  }, function (r) {
    return function (l) {
      return function (u) {
        return function (v) {
          return bifoldr(dictBifoldable)(l)(r)(u)(v);
        };
      };
    };
  });
};

var bifoldableWrap = function bifoldableWrap(dictBifoldable) {
  return new Bifoldable(function (dictMonoid) {
    return function (l) {
      return function (r) {
        return function (v) {
          return bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v);
        };
      };
    };
  }, function (l) {
    return function (r) {
      return function (u) {
        return function (v) {
          return bifoldl(dictBifoldable)(l)(r)(u)(v);
        };
      };
    };
  }, function (l) {
    return function (r) {
      return function (u) {
        return function (v) {
          return bifoldr(dictBifoldable)(l)(r)(u)(v);
        };
      };
    };
  });
};

var bifoldlDefault = function bifoldlDefault(dictBifoldable) {
  return function (f) {
    return function (g) {
      return function (z) {
        return function (p) {
          return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(Data_Newtype.unwrap(Data_Newtype.newtypeDual)(bifoldMap(dictBifoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn)))(function () {
            var $105 = Data_Function.flip(f);
            return function ($106) {
              return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($105($106)));
            };
          }())(function () {
            var $107 = Data_Function.flip(g);
            return function ($108) {
              return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($107($108)));
            };
          }())(p)))(z);
        };
      };
    };
  };
};

var bifoldrDefault = function bifoldrDefault(dictBifoldable) {
  return function (f) {
    return function (g) {
      return function (z) {
        return function (p) {
          return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(bifoldMap(dictBifoldable)(Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn))(function ($109) {
            return Data_Monoid_Endo.Endo(f($109));
          })(function ($110) {
            return Data_Monoid_Endo.Endo(g($110));
          })(p))(z);
        };
      };
    };
  };
};

var bifoldableProduct = function bifoldableProduct(dictBifoldable) {
  return function (dictBifoldable1) {
    return new Bifoldable(function (dictMonoid) {
      return function (l) {
        return function (r) {
          return function (v) {
            return Data_Semigroup.append(dictMonoid.Semigroup0())(bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v.value0))(bifoldMap(dictBifoldable1)(dictMonoid)(l)(r)(v.value1));
          };
        };
      };
    }, function (l) {
      return function (r) {
        return function (u) {
          return function (m) {
            return bifoldlDefault(bifoldableProduct(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m);
          };
        };
      };
    }, function (l) {
      return function (r) {
        return function (u) {
          return function (m) {
            return bifoldrDefault(bifoldableProduct(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m);
          };
        };
      };
    });
  };
};

var bifold = function bifold(dictBifoldable) {
  return function (dictMonoid) {
    return bifoldMap(dictBifoldable)(dictMonoid)(Control_Category.identity(Control_Category.categoryFn))(Control_Category.identity(Control_Category.categoryFn));
  };
};

var biany = function biany(dictBifoldable) {
  return function (dictBooleanAlgebra) {
    return function (p) {
      return function (q) {
        var $111 = Data_Newtype.unwrap(Data_Newtype.newtypeDisj);
        var $112 = bifoldMap(dictBifoldable)(Data_Monoid_Disj.monoidDisj(dictBooleanAlgebra.HeytingAlgebra0()))(function ($114) {
          return Data_Monoid_Disj.Disj(p($114));
        })(function ($115) {
          return Data_Monoid_Disj.Disj(q($115));
        });
        return function ($113) {
          return $111($112($113));
        };
      };
    };
  };
};

var biall = function biall(dictBifoldable) {
  return function (dictBooleanAlgebra) {
    return function (p) {
      return function (q) {
        var $116 = Data_Newtype.unwrap(Data_Newtype.newtypeConj);
        var $117 = bifoldMap(dictBifoldable)(Data_Monoid_Conj.monoidConj(dictBooleanAlgebra.HeytingAlgebra0()))(function ($119) {
          return Data_Monoid_Conj.Conj(p($119));
        })(function ($120) {
          return Data_Monoid_Conj.Conj(q($120));
        });
        return function ($118) {
          return $116($117($118));
        };
      };
    };
  };
};

module.exports = {
  bifoldMap: bifoldMap,
  bifoldl: bifoldl,
  bifoldr: bifoldr,
  Bifoldable: Bifoldable,
  bifoldrDefault: bifoldrDefault,
  bifoldlDefault: bifoldlDefault,
  bifoldMapDefaultR: bifoldMapDefaultR,
  bifoldMapDefaultL: bifoldMapDefaultL,
  bifold: bifold,
  bitraverse_: bitraverse_,
  bifor_: bifor_,
  bisequence_: bisequence_,
  biany: biany,
  biall: biall,
  bifoldableClown: bifoldableClown,
  bifoldableJoker: bifoldableJoker,
  bifoldableFlip: bifoldableFlip,
  bifoldableProduct: bifoldableProduct,
  bifoldableWrap: bifoldableWrap
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Monoid.Conj/index.js":"output/Data.Monoid.Conj/index.js","../Data.Monoid.Disj/index.js":"output/Data.Monoid.Disj/index.js","../Data.Monoid.Dual/index.js":"output/Data.Monoid.Dual/index.js","../Data.Monoid.Endo/index.js":"output/Data.Monoid.Endo/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Control.Biapplicative/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Biapplicative = function Biapplicative(Biapply0, bipure) {
  this.Biapply0 = Biapply0;
  this.bipure = bipure;
};

var bipure = function bipure(dict) {
  return dict.bipure;
};

module.exports = {
  bipure: bipure,
  Biapplicative: Biapplicative
};
},{}],"output/Control.Biapply/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Category = require("../Control.Category/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Function = require("../Data.Function/index.js");

var Biapply = function Biapply(Bifunctor0, biapply) {
  this.Bifunctor0 = Bifunctor0;
  this.biapply = biapply;
};

var biapply = function biapply(dict) {
  return dict.biapply;
};

var biapplyFirst = function biapplyFirst(dictBiapply) {
  return function (a) {
    return function (b) {
      return biapply(dictBiapply)(Control_Category.identity(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(Data_Function["const"](Control_Category.identity(Control_Category.categoryFn)))(Data_Function["const"](Control_Category.identity(Control_Category.categoryFn))))(a))(b);
    };
  };
};

var biapplySecond = function biapplySecond(dictBiapply) {
  return function (a) {
    return function (b) {
      return biapply(dictBiapply)(Control_Category.identity(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(Data_Function["const"])(Data_Function["const"]))(a))(b);
    };
  };
};

var bilift2 = function bilift2(dictBiapply) {
  return function (f) {
    return function (g) {
      return function (a) {
        return function (b) {
          return biapply(dictBiapply)(Control_Category.identity(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(f)(g))(a))(b);
        };
      };
    };
  };
};

var bilift3 = function bilift3(dictBiapply) {
  return function (f) {
    return function (g) {
      return function (a) {
        return function (b) {
          return function (c) {
            return biapply(dictBiapply)(biapply(dictBiapply)(Control_Category.identity(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(f)(g))(a))(b))(c);
          };
        };
      };
    };
  };
};

module.exports = {
  biapply: biapply,
  Biapply: Biapply,
  biapplyFirst: biapplyFirst,
  biapplySecond: biapplySecond,
  bilift2: bilift2,
  bilift3: bilift3
};
},{"../Control.Category/index.js":"output/Control.Category/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Function/index.js":"output/Data.Function/index.js"}],"output/Data.Bifunctor.Clown/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Biapplicative = require("../Control.Biapplicative/index.js");

var Control_Biapply = require("../Control.Biapply/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Show = require("../Data.Show/index.js");

var Clown = function Clown(x) {
  return x;
};

var showClown = function showClown(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Clown " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var ordClown = function ordClown(dictOrd) {
  return dictOrd;
};

var newtypeClown = new Data_Newtype.Newtype(function (n) {
  return n;
}, Clown);
var functorClown = new Data_Functor.Functor(function (v) {
  return function (v1) {
    return v1;
  };
});

var eqClown = function eqClown(dictEq) {
  return dictEq;
};

var bifunctorClown = function bifunctorClown(dictFunctor) {
  return new Data_Bifunctor.Bifunctor(function (f) {
    return function (v) {
      return function (v1) {
        return Data_Functor.map(dictFunctor)(f)(v1);
      };
    };
  });
};

var biapplyClown = function biapplyClown(dictApply) {
  return new Control_Biapply.Biapply(function () {
    return bifunctorClown(dictApply.Functor0());
  }, function (v) {
    return function (v1) {
      return Control_Apply.apply(dictApply)(v)(v1);
    };
  });
};

var biapplicativeClown = function biapplicativeClown(dictApplicative) {
  return new Control_Biapplicative.Biapplicative(function () {
    return biapplyClown(dictApplicative.Apply0());
  }, function (a) {
    return function (v) {
      return Control_Applicative.pure(dictApplicative)(a);
    };
  });
};

module.exports = {
  Clown: Clown,
  newtypeClown: newtypeClown,
  eqClown: eqClown,
  ordClown: ordClown,
  showClown: showClown,
  functorClown: functorClown,
  bifunctorClown: bifunctorClown,
  biapplyClown: biapplyClown,
  biapplicativeClown: biapplicativeClown
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Biapplicative/index.js":"output/Control.Biapplicative/index.js","../Control.Biapply/index.js":"output/Control.Biapply/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Bifunctor.Flip/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Biapplicative = require("../Control.Biapplicative/index.js");

var Control_Biapply = require("../Control.Biapply/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Show = require("../Data.Show/index.js");

var Flip = function Flip(x) {
  return x;
};

var showFlip = function showFlip(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Flip " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var ordFlip = function ordFlip(dictOrd) {
  return dictOrd;
};

var newtypeFlip = new Data_Newtype.Newtype(function (n) {
  return n;
}, Flip);

var functorFlip = function functorFlip(dictBifunctor) {
  return new Data_Functor.Functor(function (f) {
    return function (v) {
      return Data_Bifunctor.lmap(dictBifunctor)(f)(v);
    };
  });
};

var eqFlip = function eqFlip(dictEq) {
  return dictEq;
};

var bifunctorFlip = function bifunctorFlip(dictBifunctor) {
  return new Data_Bifunctor.Bifunctor(function (f) {
    return function (g) {
      return function (v) {
        return Data_Bifunctor.bimap(dictBifunctor)(g)(f)(v);
      };
    };
  });
};

var biapplyFlip = function biapplyFlip(dictBiapply) {
  return new Control_Biapply.Biapply(function () {
    return bifunctorFlip(dictBiapply.Bifunctor0());
  }, function (v) {
    return function (v1) {
      return Control_Biapply.biapply(dictBiapply)(v)(v1);
    };
  });
};

var biapplicativeFlip = function biapplicativeFlip(dictBiapplicative) {
  return new Control_Biapplicative.Biapplicative(function () {
    return biapplyFlip(dictBiapplicative.Biapply0());
  }, function (a) {
    return function (b) {
      return Control_Biapplicative.bipure(dictBiapplicative)(b)(a);
    };
  });
};

module.exports = {
  Flip: Flip,
  newtypeFlip: newtypeFlip,
  eqFlip: eqFlip,
  ordFlip: ordFlip,
  showFlip: showFlip,
  functorFlip: functorFlip,
  bifunctorFlip: bifunctorFlip,
  biapplyFlip: biapplyFlip,
  biapplicativeFlip: biapplicativeFlip
};
},{"../Control.Biapplicative/index.js":"output/Control.Biapplicative/index.js","../Control.Biapply/index.js":"output/Control.Biapply/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Bifunctor.Joker/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Biapplicative = require("../Control.Biapplicative/index.js");

var Control_Biapply = require("../Control.Biapply/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Show = require("../Data.Show/index.js");

var Joker = function Joker(x) {
  return x;
};

var showJoker = function showJoker(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Joker " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var ordJoker = function ordJoker(dictOrd) {
  return dictOrd;
};

var newtypeJoker = new Data_Newtype.Newtype(function (n) {
  return n;
}, Joker);

var functorJoker = function functorJoker(dictFunctor) {
  return new Data_Functor.Functor(function (g) {
    return function (v) {
      return Data_Functor.map(dictFunctor)(g)(v);
    };
  });
};

var eqJoker = function eqJoker(dictEq) {
  return dictEq;
};

var bifunctorJoker = function bifunctorJoker(dictFunctor) {
  return new Data_Bifunctor.Bifunctor(function (v) {
    return function (g) {
      return function (v1) {
        return Data_Functor.map(dictFunctor)(g)(v1);
      };
    };
  });
};

var biapplyJoker = function biapplyJoker(dictApply) {
  return new Control_Biapply.Biapply(function () {
    return bifunctorJoker(dictApply.Functor0());
  }, function (v) {
    return function (v1) {
      return Control_Apply.apply(dictApply)(v)(v1);
    };
  });
};

var biapplicativeJoker = function biapplicativeJoker(dictApplicative) {
  return new Control_Biapplicative.Biapplicative(function () {
    return biapplyJoker(dictApplicative.Apply0());
  }, function (v) {
    return function (b) {
      return Control_Applicative.pure(dictApplicative)(b);
    };
  });
};

module.exports = {
  Joker: Joker,
  newtypeJoker: newtypeJoker,
  eqJoker: eqJoker,
  ordJoker: ordJoker,
  showJoker: showJoker,
  functorJoker: functorJoker,
  bifunctorJoker: bifunctorJoker,
  biapplyJoker: biapplyJoker,
  biapplicativeJoker: biapplicativeJoker
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Biapplicative/index.js":"output/Control.Biapplicative/index.js","../Control.Biapply/index.js":"output/Control.Biapply/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Bifunctor.Product/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Biapplicative = require("../Control.Biapplicative/index.js");

var Control_Biapply = require("../Control.Biapply/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Show = require("../Data.Show/index.js");

var Product = function () {
  function Product(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }

  ;

  Product.create = function (value0) {
    return function (value1) {
      return new Product(value0, value1);
    };
  };

  return Product;
}();

var showProduct = function showProduct(dictShow) {
  return function (dictShow1) {
    return new Data_Show.Show(function (v) {
      return "(Product " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
    });
  };
};

var eqProduct = function eqProduct(dictEq) {
  return function (dictEq1) {
    return new Data_Eq.Eq(function (x) {
      return function (y) {
        return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
      };
    });
  };
};

var ordProduct = function ordProduct(dictOrd) {
  return function (dictOrd1) {
    return new Data_Ord.Ord(function () {
      return eqProduct(dictOrd.Eq0())(dictOrd1.Eq0());
    }, function (x) {
      return function (y) {
        var v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);

        if (v instanceof Data_Ordering.LT) {
          return Data_Ordering.LT.value;
        }

        ;

        if (v instanceof Data_Ordering.GT) {
          return Data_Ordering.GT.value;
        }

        ;
        return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
      };
    });
  };
};

var bifunctorProduct = function bifunctorProduct(dictBifunctor) {
  return function (dictBifunctor1) {
    return new Data_Bifunctor.Bifunctor(function (f) {
      return function (g) {
        return function (v) {
          return new Product(Data_Bifunctor.bimap(dictBifunctor)(f)(g)(v.value0), Data_Bifunctor.bimap(dictBifunctor1)(f)(g)(v.value1));
        };
      };
    });
  };
};

var biapplyProduct = function biapplyProduct(dictBiapply) {
  return function (dictBiapply1) {
    return new Control_Biapply.Biapply(function () {
      return bifunctorProduct(dictBiapply.Bifunctor0())(dictBiapply1.Bifunctor0());
    }, function (v) {
      return function (v1) {
        return new Product(Control_Biapply.biapply(dictBiapply)(v.value0)(v1.value0), Control_Biapply.biapply(dictBiapply1)(v.value1)(v1.value1));
      };
    });
  };
};

var biapplicativeProduct = function biapplicativeProduct(dictBiapplicative) {
  return function (dictBiapplicative1) {
    return new Control_Biapplicative.Biapplicative(function () {
      return biapplyProduct(dictBiapplicative.Biapply0())(dictBiapplicative1.Biapply0());
    }, function (a) {
      return function (b) {
        return new Product(Control_Biapplicative.bipure(dictBiapplicative)(a)(b), Control_Biapplicative.bipure(dictBiapplicative1)(a)(b));
      };
    });
  };
};

module.exports = {
  Product: Product,
  eqProduct: eqProduct,
  ordProduct: ordProduct,
  showProduct: showProduct,
  bifunctorProduct: bifunctorProduct,
  biapplyProduct: biapplyProduct,
  biapplicativeProduct: biapplicativeProduct
};
},{"../Control.Biapplicative/index.js":"output/Control.Biapplicative/index.js","../Control.Biapply/index.js":"output/Control.Biapply/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Bifunctor.Wrap/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Biapplicative = require("../Control.Biapplicative/index.js");

var Control_Biapply = require("../Control.Biapply/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Show = require("../Data.Show/index.js");

var Wrap = function Wrap(x) {
  return x;
};

var showWrap = function showWrap(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Wrap " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var ordWrap = function ordWrap(dictOrd) {
  return dictOrd;
};

var newtypeWrap = new Data_Newtype.Newtype(function (n) {
  return n;
}, Wrap);

var functorWrap = function functorWrap(dictBifunctor) {
  return new Data_Functor.Functor(function (f) {
    return function (v) {
      return Data_Bifunctor.rmap(dictBifunctor)(f)(v);
    };
  });
};

var eqWrap = function eqWrap(dictEq) {
  return dictEq;
};

var bifunctorWrap = function bifunctorWrap(dictBifunctor) {
  return new Data_Bifunctor.Bifunctor(function (f) {
    return function (g) {
      return function (v) {
        return Data_Bifunctor.bimap(dictBifunctor)(f)(g)(v);
      };
    };
  });
};

var biapplyWrap = function biapplyWrap(dictBiapply) {
  return new Control_Biapply.Biapply(function () {
    return bifunctorWrap(dictBiapply.Bifunctor0());
  }, function (v) {
    return function (v1) {
      return Control_Biapply.biapply(dictBiapply)(v)(v1);
    };
  });
};

var biapplicativeWrap = function biapplicativeWrap(dictBiapplicative) {
  return new Control_Biapplicative.Biapplicative(function () {
    return biapplyWrap(dictBiapplicative.Biapply0());
  }, function (a) {
    return function (b) {
      return Control_Biapplicative.bipure(dictBiapplicative)(a)(b);
    };
  });
};

module.exports = {
  Wrap: Wrap,
  newtypeWrap: newtypeWrap,
  eqWrap: eqWrap,
  ordWrap: ordWrap,
  showWrap: showWrap,
  functorWrap: functorWrap,
  bifunctorWrap: bifunctorWrap,
  biapplyWrap: biapplyWrap,
  biapplicativeWrap: biapplicativeWrap
};
},{"../Control.Biapplicative/index.js":"output/Control.Biapplicative/index.js","../Control.Biapply/index.js":"output/Control.Biapply/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Traversable/foreign.js":[function(require,module,exports) {
"use strict"; // jshint maxparams: 3

exports.traverseArrayImpl = function () {
  function array1(a) {
    return [a];
  }

  function array2(a) {
    return function (b) {
      return [a, b];
    };
  }

  function array3(a) {
    return function (b) {
      return function (c) {
        return [a, b, c];
      };
    };
  }

  function concat2(xs) {
    return function (ys) {
      return xs.concat(ys);
    };
  }

  return function (apply) {
    return function (map) {
      return function (pure) {
        return function (f) {
          return function (array) {
            function go(bot, top) {
              switch (top - bot) {
                case 0:
                  return pure([]);

                case 1:
                  return map(array1)(f(array[bot]));

                case 2:
                  return apply(map(array2)(f(array[bot])))(f(array[bot + 1]));

                case 3:
                  return apply(apply(map(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));

                default:
                  // This slightly tricky pivot selection aims to produce two
                  // even-length partitions where possible.
                  var pivot = bot + Math.floor((top - bot) / 4) * 2;
                  return apply(map(concat2)(go(bot, pivot)))(go(pivot, top));
              }
            }

            return go(0, array.length);
          };
        };
      };
    };
  };
}();
},{}],"output/Data.Maybe.First/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_MonadZero = require("../Control.MonadZero/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var First = function First(x) {
  return x;
};

var showFirst = function showFirst(dictShow) {
  return new Data_Show.Show(function (v) {
    return "First (" + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
  });
};

var semigroupFirst = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    if (v instanceof Data_Maybe.Just) {
      return v;
    }

    ;
    return v1;
  };
});

var ordFirst = function ordFirst(dictOrd) {
  return Data_Maybe.ordMaybe(dictOrd);
};

var ord1First = Data_Maybe.ord1Maybe;
var newtypeFirst = new Data_Newtype.Newtype(function (n) {
  return n;
}, First);
var monoidFirst = new Data_Monoid.Monoid(function () {
  return semigroupFirst;
}, Data_Maybe.Nothing.value);
var monadFirst = Data_Maybe.monadMaybe;
var invariantFirst = Data_Maybe.invariantMaybe;
var functorFirst = Data_Maybe.functorMaybe;
var extendFirst = Data_Maybe.extendMaybe;

var eqFirst = function eqFirst(dictEq) {
  return Data_Maybe.eqMaybe(dictEq);
};

var eq1First = Data_Maybe.eq1Maybe;

var boundedFirst = function boundedFirst(dictBounded) {
  return Data_Maybe.boundedMaybe(dictBounded);
};

var bindFirst = Data_Maybe.bindMaybe;
var applyFirst = Data_Maybe.applyMaybe;
var applicativeFirst = Data_Maybe.applicativeMaybe;
var altFirst = new Control_Alt.Alt(function () {
  return functorFirst;
}, Data_Semigroup.append(semigroupFirst));
var plusFirst = new Control_Plus.Plus(function () {
  return altFirst;
}, Data_Monoid.mempty(monoidFirst));
var alternativeFirst = new Control_Alternative.Alternative(function () {
  return applicativeFirst;
}, function () {
  return plusFirst;
});
var monadZeroFirst = new Control_MonadZero.MonadZero(function () {
  return alternativeFirst;
}, function () {
  return monadFirst;
});
module.exports = {
  First: First,
  newtypeFirst: newtypeFirst,
  eqFirst: eqFirst,
  eq1First: eq1First,
  ordFirst: ordFirst,
  ord1First: ord1First,
  boundedFirst: boundedFirst,
  functorFirst: functorFirst,
  invariantFirst: invariantFirst,
  applyFirst: applyFirst,
  applicativeFirst: applicativeFirst,
  bindFirst: bindFirst,
  monadFirst: monadFirst,
  extendFirst: extendFirst,
  showFirst: showFirst,
  semigroupFirst: semigroupFirst,
  monoidFirst: monoidFirst,
  altFirst: altFirst,
  plusFirst: plusFirst,
  alternativeFirst: alternativeFirst,
  monadZeroFirst: monadZeroFirst
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.MonadZero/index.js":"output/Control.MonadZero/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Maybe.Last/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_MonadZero = require("../Control.MonadZero/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Last = function Last(x) {
  return x;
};

var showLast = function showLast(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Last " + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
  });
};

var semigroupLast = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    if (v1 instanceof Data_Maybe.Just) {
      return v1;
    }

    ;

    if (v1 instanceof Data_Maybe.Nothing) {
      return v;
    }

    ;
    throw new Error("Failed pattern match at Data.Maybe.Last (line 52, column 1 - line 54, column 36): " + [v.constructor.name, v1.constructor.name]);
  };
});

var ordLast = function ordLast(dictOrd) {
  return Data_Maybe.ordMaybe(dictOrd);
};

var ord1Last = Data_Maybe.ord1Maybe;
var newtypeLast = new Data_Newtype.Newtype(function (n) {
  return n;
}, Last);
var monoidLast = new Data_Monoid.Monoid(function () {
  return semigroupLast;
}, Data_Maybe.Nothing.value);
var monadLast = Data_Maybe.monadMaybe;
var invariantLast = Data_Maybe.invariantMaybe;
var functorLast = Data_Maybe.functorMaybe;
var extendLast = Data_Maybe.extendMaybe;

var eqLast = function eqLast(dictEq) {
  return Data_Maybe.eqMaybe(dictEq);
};

var eq1Last = Data_Maybe.eq1Maybe;

var boundedLast = function boundedLast(dictBounded) {
  return Data_Maybe.boundedMaybe(dictBounded);
};

var bindLast = Data_Maybe.bindMaybe;
var applyLast = Data_Maybe.applyMaybe;
var applicativeLast = Data_Maybe.applicativeMaybe;
var altLast = new Control_Alt.Alt(function () {
  return functorLast;
}, Data_Semigroup.append(semigroupLast));
var plusLast = new Control_Plus.Plus(function () {
  return altLast;
}, Data_Monoid.mempty(monoidLast));
var alternativeLast = new Control_Alternative.Alternative(function () {
  return applicativeLast;
}, function () {
  return plusLast;
});
var monadZeroLast = new Control_MonadZero.MonadZero(function () {
  return alternativeLast;
}, function () {
  return monadLast;
});
module.exports = {
  Last: Last,
  newtypeLast: newtypeLast,
  eqLast: eqLast,
  eq1Last: eq1Last,
  ordLast: ordLast,
  ord1Last: ord1Last,
  boundedLast: boundedLast,
  functorLast: functorLast,
  invariantLast: invariantLast,
  applyLast: applyLast,
  applicativeLast: applicativeLast,
  bindLast: bindLast,
  monadLast: monadLast,
  extendLast: extendLast,
  showLast: showLast,
  semigroupLast: semigroupLast,
  monoidLast: monoidLast,
  altLast: altLast,
  plusLast: plusLast,
  alternativeLast: alternativeLast,
  monadZeroLast: monadZeroLast
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.MonadZero/index.js":"output/Control.MonadZero/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Traversable.Accum.Internal/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var StateR = function StateR(x) {
  return x;
};

var StateL = function StateL(x) {
  return x;
};

var stateR = function stateR(v) {
  return v;
};

var stateL = function stateL(v) {
  return v;
};

var functorStateR = new Data_Functor.Functor(function (f) {
  return function (k) {
    return function (s) {
      var v = stateR(k)(s);
      return {
        accum: v.accum,
        value: f(v.value)
      };
    };
  };
});
var functorStateL = new Data_Functor.Functor(function (f) {
  return function (k) {
    return function (s) {
      var v = stateL(k)(s);
      return {
        accum: v.accum,
        value: f(v.value)
      };
    };
  };
});
var applyStateR = new Control_Apply.Apply(function () {
  return functorStateR;
}, function (f) {
  return function (x) {
    return function (s) {
      var v = stateR(x)(s);
      var v1 = stateR(f)(v.accum);
      return {
        accum: v1.accum,
        value: v1.value(v.value)
      };
    };
  };
});
var applyStateL = new Control_Apply.Apply(function () {
  return functorStateL;
}, function (f) {
  return function (x) {
    return function (s) {
      var v = stateL(f)(s);
      var v1 = stateL(x)(v.accum);
      return {
        accum: v1.accum,
        value: v.value(v1.value)
      };
    };
  };
});
var applicativeStateR = new Control_Applicative.Applicative(function () {
  return applyStateR;
}, function (a) {
  return function (s) {
    return {
      accum: s,
      value: a
    };
  };
});
var applicativeStateL = new Control_Applicative.Applicative(function () {
  return applyStateL;
}, function (a) {
  return function (s) {
    return {
      accum: s,
      value: a
    };
  };
});
module.exports = {
  StateL: StateL,
  stateL: stateL,
  StateR: StateR,
  stateR: stateR,
  functorStateL: functorStateL,
  applyStateL: applyStateL,
  applicativeStateL: applicativeStateL,
  functorStateR: functorStateR,
  applyStateR: applyStateR,
  applicativeStateR: applicativeStateR
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js"}],"output/Data.Traversable/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Maybe_First = require("../Data.Maybe.First/index.js");

var Data_Maybe_Last = require("../Data.Maybe.Last/index.js");

var Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");

var Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");

var Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");

var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");

var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");

var Data_Traversable_Accum_Internal = require("../Data.Traversable.Accum.Internal/index.js");

var Traversable = function Traversable(Foldable1, Functor0, sequence, traverse) {
  this.Foldable1 = Foldable1;
  this.Functor0 = Functor0;
  this.sequence = sequence;
  this.traverse = traverse;
};

var traverse = function traverse(dict) {
  return dict.traverse;
};

var traversableMultiplicative = new Traversable(function () {
  return Data_Foldable.foldableMultiplicative;
}, function () {
  return Data_Monoid_Multiplicative.functorMultiplicative;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Multiplicative.Multiplicative)(v);
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Multiplicative.Multiplicative)(f(v));
    };
  };
});
var traversableMaybe = new Traversable(function () {
  return Data_Foldable.foldableMaybe;
}, function () {
  return Data_Maybe.functorMaybe;
}, function (dictApplicative) {
  return function (v) {
    if (v instanceof Data_Maybe.Nothing) {
      return Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value);
    }

    ;

    if (v instanceof Data_Maybe.Just) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe.Just.create)(v.value0);
    }

    ;
    throw new Error("Failed pattern match at Data.Traversable (line 86, column 1 - line 90, column 33): " + [v.constructor.name]);
  };
}, function (dictApplicative) {
  return function (v) {
    return function (v1) {
      if (v1 instanceof Data_Maybe.Nothing) {
        return Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value);
      }

      ;

      if (v1 instanceof Data_Maybe.Just) {
        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe.Just.create)(v(v1.value0));
      }

      ;
      throw new Error("Failed pattern match at Data.Traversable (line 86, column 1 - line 90, column 33): " + [v.constructor.name, v1.constructor.name]);
    };
  };
});
var traversableDual = new Traversable(function () {
  return Data_Foldable.foldableDual;
}, function () {
  return Data_Monoid_Dual.functorDual;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Dual.Dual)(v);
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Dual.Dual)(f(v));
    };
  };
});
var traversableDisj = new Traversable(function () {
  return Data_Foldable.foldableDisj;
}, function () {
  return Data_Monoid_Disj.functorDisj;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Disj.Disj)(v);
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Disj.Disj)(f(v));
    };
  };
});
var traversableConj = new Traversable(function () {
  return Data_Foldable.foldableConj;
}, function () {
  return Data_Monoid_Conj.functorConj;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Conj.Conj)(v);
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Conj.Conj)(f(v));
    };
  };
});
var traversableAdditive = new Traversable(function () {
  return Data_Foldable.foldableAdditive;
}, function () {
  return Data_Monoid_Additive.functorAdditive;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Additive.Additive)(v);
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Additive.Additive)(f(v));
    };
  };
});

var sequenceDefault = function sequenceDefault(dictTraversable) {
  return function (dictApplicative) {
    return traverse(dictTraversable)(dictApplicative)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var traversableArray = new Traversable(function () {
  return Data_Foldable.foldableArray;
}, function () {
  return Data_Functor.functorArray;
}, function (dictApplicative) {
  return sequenceDefault(traversableArray)(dictApplicative);
}, function (dictApplicative) {
  return $foreign.traverseArrayImpl(Control_Apply.apply(dictApplicative.Apply0()))(Data_Functor.map(dictApplicative.Apply0().Functor0()))(Control_Applicative.pure(dictApplicative));
});

var sequence = function sequence(dict) {
  return dict.sequence;
};

var traversableFirst = new Traversable(function () {
  return Data_Foldable.foldableFirst;
}, function () {
  return Data_Maybe_First.functorFirst;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe_First.First)(sequence(traversableMaybe)(dictApplicative)(v));
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe_First.First)(traverse(traversableMaybe)(dictApplicative)(f)(v));
    };
  };
});
var traversableLast = new Traversable(function () {
  return Data_Foldable.foldableLast;
}, function () {
  return Data_Maybe_Last.functorLast;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe_Last.Last)(sequence(traversableMaybe)(dictApplicative)(v));
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe_Last.Last)(traverse(traversableMaybe)(dictApplicative)(f)(v));
    };
  };
});

var traverseDefault = function traverseDefault(dictTraversable) {
  return function (dictApplicative) {
    return function (f) {
      return function (ta) {
        return sequence(dictTraversable)(dictApplicative)(Data_Functor.map(dictTraversable.Functor0())(f)(ta));
      };
    };
  };
};

var mapAccumR = function mapAccumR(dictTraversable) {
  return function (f) {
    return function (s0) {
      return function (xs) {
        return Data_Traversable_Accum_Internal.stateR(traverse(dictTraversable)(Data_Traversable_Accum_Internal.applicativeStateR)(function (a) {
          return function (s) {
            return f(s)(a);
          };
        })(xs))(s0);
      };
    };
  };
};

var scanr = function scanr(dictTraversable) {
  return function (f) {
    return function (b0) {
      return function (xs) {
        return mapAccumR(dictTraversable)(function (b) {
          return function (a) {
            var b$prime = f(a)(b);
            return {
              accum: b$prime,
              value: b$prime
            };
          };
        })(b0)(xs).value;
      };
    };
  };
};

var mapAccumL = function mapAccumL(dictTraversable) {
  return function (f) {
    return function (s0) {
      return function (xs) {
        return Data_Traversable_Accum_Internal.stateL(traverse(dictTraversable)(Data_Traversable_Accum_Internal.applicativeStateL)(function (a) {
          return function (s) {
            return f(s)(a);
          };
        })(xs))(s0);
      };
    };
  };
};

var scanl = function scanl(dictTraversable) {
  return function (f) {
    return function (b0) {
      return function (xs) {
        return mapAccumL(dictTraversable)(function (b) {
          return function (a) {
            var b$prime = f(b)(a);
            return {
              accum: b$prime,
              value: b$prime
            };
          };
        })(b0)(xs).value;
      };
    };
  };
};

var $$for = function $$for(dictApplicative) {
  return function (dictTraversable) {
    return function (x) {
      return function (f) {
        return traverse(dictTraversable)(dictApplicative)(f)(x);
      };
    };
  };
};

module.exports = {
  Traversable: Traversable,
  traverse: traverse,
  sequence: sequence,
  traverseDefault: traverseDefault,
  sequenceDefault: sequenceDefault,
  "for": $$for,
  scanl: scanl,
  scanr: scanr,
  mapAccumL: mapAccumL,
  mapAccumR: mapAccumR,
  traversableArray: traversableArray,
  traversableMaybe: traversableMaybe,
  traversableFirst: traversableFirst,
  traversableLast: traversableLast,
  traversableAdditive: traversableAdditive,
  traversableDual: traversableDual,
  traversableConj: traversableConj,
  traversableDisj: traversableDisj,
  traversableMultiplicative: traversableMultiplicative
};
},{"./foreign.js":"output/Data.Traversable/foreign.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Maybe.First/index.js":"output/Data.Maybe.First/index.js","../Data.Maybe.Last/index.js":"output/Data.Maybe.Last/index.js","../Data.Monoid.Additive/index.js":"output/Data.Monoid.Additive/index.js","../Data.Monoid.Conj/index.js":"output/Data.Monoid.Conj/index.js","../Data.Monoid.Disj/index.js":"output/Data.Monoid.Disj/index.js","../Data.Monoid.Dual/index.js":"output/Data.Monoid.Dual/index.js","../Data.Monoid.Multiplicative/index.js":"output/Data.Monoid.Multiplicative/index.js","../Data.Traversable.Accum.Internal/index.js":"output/Data.Traversable.Accum.Internal/index.js"}],"output/Data.Bitraversable/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Bifoldable = require("../Data.Bifoldable/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Bifunctor_Clown = require("../Data.Bifunctor.Clown/index.js");

var Data_Bifunctor_Flip = require("../Data.Bifunctor.Flip/index.js");

var Data_Bifunctor_Joker = require("../Data.Bifunctor.Joker/index.js");

var Data_Bifunctor_Product = require("../Data.Bifunctor.Product/index.js");

var Data_Bifunctor_Wrap = require("../Data.Bifunctor.Wrap/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Bitraversable = function Bitraversable(Bifoldable1, Bifunctor0, bisequence, bitraverse) {
  this.Bifoldable1 = Bifoldable1;
  this.Bifunctor0 = Bifunctor0;
  this.bisequence = bisequence;
  this.bitraverse = bitraverse;
};

var bitraverse = function bitraverse(dict) {
  return dict.bitraverse;
};

var lfor = function lfor(dictBitraversable) {
  return function (dictApplicative) {
    return function (t) {
      return function (f) {
        return bitraverse(dictBitraversable)(dictApplicative)(f)(Control_Applicative.pure(dictApplicative))(t);
      };
    };
  };
};

var ltraverse = function ltraverse(dictBitraversable) {
  return function (dictApplicative) {
    return function (f) {
      return bitraverse(dictBitraversable)(dictApplicative)(f)(Control_Applicative.pure(dictApplicative));
    };
  };
};

var rfor = function rfor(dictBitraversable) {
  return function (dictApplicative) {
    return function (t) {
      return function (f) {
        return bitraverse(dictBitraversable)(dictApplicative)(Control_Applicative.pure(dictApplicative))(f)(t);
      };
    };
  };
};

var rtraverse = function rtraverse(dictBitraversable) {
  return function (dictApplicative) {
    return bitraverse(dictBitraversable)(dictApplicative)(Control_Applicative.pure(dictApplicative));
  };
};

var bitraversableJoker = function bitraversableJoker(dictTraversable) {
  return new Bitraversable(function () {
    return Data_Bifoldable.bifoldableJoker(dictTraversable.Foldable1());
  }, function () {
    return Data_Bifunctor_Joker.bifunctorJoker(dictTraversable.Functor0());
  }, function (dictApplicative) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Joker.Joker)(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v));
    };
  }, function (dictApplicative) {
    return function (v) {
      return function (r) {
        return function (v1) {
          return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Joker.Joker)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(r)(v1));
        };
      };
    };
  });
};

var bitraversableClown = function bitraversableClown(dictTraversable) {
  return new Bitraversable(function () {
    return Data_Bifoldable.bifoldableClown(dictTraversable.Foldable1());
  }, function () {
    return Data_Bifunctor_Clown.bifunctorClown(dictTraversable.Functor0());
  }, function (dictApplicative) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Clown.Clown)(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v));
    };
  }, function (dictApplicative) {
    return function (l) {
      return function (v) {
        return function (v1) {
          return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Clown.Clown)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(l)(v1));
        };
      };
    };
  });
};

var bisequenceDefault = function bisequenceDefault(dictBitraversable) {
  return function (dictApplicative) {
    return bitraverse(dictBitraversable)(dictApplicative)(Control_Category.identity(Control_Category.categoryFn))(Control_Category.identity(Control_Category.categoryFn));
  };
};

var bisequence = function bisequence(dict) {
  return dict.bisequence;
};

var bitraversableFlip = function bitraversableFlip(dictBitraversable) {
  return new Bitraversable(function () {
    return Data_Bifoldable.bifoldableFlip(dictBitraversable.Bifoldable1());
  }, function () {
    return Data_Bifunctor_Flip.bifunctorFlip(dictBitraversable.Bifunctor0());
  }, function (dictApplicative) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Flip.Flip)(bisequence(dictBitraversable)(dictApplicative)(v));
    };
  }, function (dictApplicative) {
    return function (r) {
      return function (l) {
        return function (v) {
          return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Flip.Flip)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v));
        };
      };
    };
  });
};

var bitraversableProduct = function bitraversableProduct(dictBitraversable) {
  return function (dictBitraversable1) {
    return new Bitraversable(function () {
      return Data_Bifoldable.bifoldableProduct(dictBitraversable.Bifoldable1())(dictBitraversable1.Bifoldable1());
    }, function () {
      return Data_Bifunctor_Product.bifunctorProduct(dictBitraversable.Bifunctor0())(dictBitraversable1.Bifunctor0());
    }, function (dictApplicative) {
      return function (v) {
        return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Product.Product.create)(bisequence(dictBitraversable)(dictApplicative)(v.value0)))(bisequence(dictBitraversable1)(dictApplicative)(v.value1));
      };
    }, function (dictApplicative) {
      return function (l) {
        return function (r) {
          return function (v) {
            return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Product.Product.create)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v.value0)))(bitraverse(dictBitraversable1)(dictApplicative)(l)(r)(v.value1));
          };
        };
      };
    });
  };
};

var bitraversableWrap = function bitraversableWrap(dictBitraversable) {
  return new Bitraversable(function () {
    return Data_Bifoldable.bifoldableWrap(dictBitraversable.Bifoldable1());
  }, function () {
    return Data_Bifunctor_Wrap.bifunctorWrap(dictBitraversable.Bifunctor0());
  }, function (dictApplicative) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Wrap.Wrap)(bisequence(dictBitraversable)(dictApplicative)(v));
    };
  }, function (dictApplicative) {
    return function (l) {
      return function (r) {
        return function (v) {
          return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Wrap.Wrap)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v));
        };
      };
    };
  });
};

var bitraverseDefault = function bitraverseDefault(dictBitraversable) {
  return function (dictApplicative) {
    return function (f) {
      return function (g) {
        return function (t) {
          return bisequence(dictBitraversable)(dictApplicative)(Data_Bifunctor.bimap(dictBitraversable.Bifunctor0())(f)(g)(t));
        };
      };
    };
  };
};

var bifor = function bifor(dictBitraversable) {
  return function (dictApplicative) {
    return function (t) {
      return function (f) {
        return function (g) {
          return bitraverse(dictBitraversable)(dictApplicative)(f)(g)(t);
        };
      };
    };
  };
};

module.exports = {
  Bitraversable: Bitraversable,
  bitraverse: bitraverse,
  bisequence: bisequence,
  bitraverseDefault: bitraverseDefault,
  bisequenceDefault: bisequenceDefault,
  ltraverse: ltraverse,
  rtraverse: rtraverse,
  bifor: bifor,
  lfor: lfor,
  rfor: rfor,
  bitraversableClown: bitraversableClown,
  bitraversableJoker: bitraversableJoker,
  bitraversableFlip: bitraversableFlip,
  bitraversableProduct: bitraversableProduct,
  bitraversableWrap: bitraversableWrap
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Bifoldable/index.js":"output/Data.Bifoldable/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Bifunctor.Clown/index.js":"output/Data.Bifunctor.Clown/index.js","../Data.Bifunctor.Flip/index.js":"output/Data.Bifunctor.Flip/index.js","../Data.Bifunctor.Joker/index.js":"output/Data.Bifunctor.Joker/index.js","../Data.Bifunctor.Product/index.js":"output/Data.Bifunctor.Product/index.js","../Data.Bifunctor.Wrap/index.js":"output/Data.Bifunctor.Wrap/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js"}],"output/Data.FunctorWithIndex/foreign.js":[function(require,module,exports) {
"use strict";

exports.mapWithIndexArray = function (f) {
  return function (xs) {
    var l = xs.length;
    var result = Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = f(i)(xs[i]);
    }

    return result;
  };
};
},{}],"output/Data.FunctorWithIndex/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Maybe_First = require("../Data.Maybe.First/index.js");

var Data_Maybe_Last = require("../Data.Maybe.Last/index.js");

var Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");

var Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");

var Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");

var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");

var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var FunctorWithIndex = function FunctorWithIndex(Functor0, mapWithIndex) {
  this.Functor0 = Functor0;
  this.mapWithIndex = mapWithIndex;
};

var mapWithIndex = function mapWithIndex(dict) {
  return dict.mapWithIndex;
};

var mapDefault = function mapDefault(dictFunctorWithIndex) {
  return function (f) {
    return mapWithIndex(dictFunctorWithIndex)(Data_Function["const"](f));
  };
};

var functorWithIndexMultiplicative = new FunctorWithIndex(function () {
  return Data_Monoid_Multiplicative.functorMultiplicative;
}, function (f) {
  return Data_Functor.map(Data_Monoid_Multiplicative.functorMultiplicative)(f(Data_Unit.unit));
});
var functorWithIndexMaybe = new FunctorWithIndex(function () {
  return Data_Maybe.functorMaybe;
}, function (f) {
  return Data_Functor.map(Data_Maybe.functorMaybe)(f(Data_Unit.unit));
});
var functorWithIndexLast = new FunctorWithIndex(function () {
  return Data_Maybe_Last.functorLast;
}, function (f) {
  return Data_Functor.map(Data_Maybe_Last.functorLast)(f(Data_Unit.unit));
});
var functorWithIndexFirst = new FunctorWithIndex(function () {
  return Data_Maybe_First.functorFirst;
}, function (f) {
  return Data_Functor.map(Data_Maybe_First.functorFirst)(f(Data_Unit.unit));
});
var functorWithIndexDual = new FunctorWithIndex(function () {
  return Data_Monoid_Dual.functorDual;
}, function (f) {
  return Data_Functor.map(Data_Monoid_Dual.functorDual)(f(Data_Unit.unit));
});
var functorWithIndexDisj = new FunctorWithIndex(function () {
  return Data_Monoid_Disj.functorDisj;
}, function (f) {
  return Data_Functor.map(Data_Monoid_Disj.functorDisj)(f(Data_Unit.unit));
});
var functorWithIndexConj = new FunctorWithIndex(function () {
  return Data_Monoid_Conj.functorConj;
}, function (f) {
  return Data_Functor.map(Data_Monoid_Conj.functorConj)(f(Data_Unit.unit));
});
var functorWithIndexArray = new FunctorWithIndex(function () {
  return Data_Functor.functorArray;
}, $foreign.mapWithIndexArray);
var functorWithIndexAdditive = new FunctorWithIndex(function () {
  return Data_Monoid_Additive.functorAdditive;
}, function (f) {
  return Data_Functor.map(Data_Monoid_Additive.functorAdditive)(f(Data_Unit.unit));
});
module.exports = {
  FunctorWithIndex: FunctorWithIndex,
  mapWithIndex: mapWithIndex,
  mapDefault: mapDefault,
  functorWithIndexArray: functorWithIndexArray,
  functorWithIndexMaybe: functorWithIndexMaybe,
  functorWithIndexFirst: functorWithIndexFirst,
  functorWithIndexLast: functorWithIndexLast,
  functorWithIndexAdditive: functorWithIndexAdditive,
  functorWithIndexDual: functorWithIndexDual,
  functorWithIndexConj: functorWithIndexConj,
  functorWithIndexDisj: functorWithIndexDisj,
  functorWithIndexMultiplicative: functorWithIndexMultiplicative
};
},{"./foreign.js":"output/Data.FunctorWithIndex/foreign.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Maybe.First/index.js":"output/Data.Maybe.First/index.js","../Data.Maybe.Last/index.js":"output/Data.Maybe.Last/index.js","../Data.Monoid.Additive/index.js":"output/Data.Monoid.Additive/index.js","../Data.Monoid.Conj/index.js":"output/Data.Monoid.Conj/index.js","../Data.Monoid.Disj/index.js":"output/Data.Monoid.Disj/index.js","../Data.Monoid.Dual/index.js":"output/Data.Monoid.Dual/index.js","../Data.Monoid.Multiplicative/index.js":"output/Data.Monoid.Multiplicative/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.FoldableWithIndex/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");

var Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");

var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");

var Data_Monoid_Endo = require("../Data.Monoid.Endo/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Tuple = function () {
  function Tuple(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }

  ;

  Tuple.create = function (value0) {
    return function (value1) {
      return new Tuple(value0, value1);
    };
  };

  return Tuple;
}();

var FoldableWithIndex = function FoldableWithIndex(Foldable0, foldMapWithIndex, foldlWithIndex, foldrWithIndex) {
  this.Foldable0 = Foldable0;
  this.foldMapWithIndex = foldMapWithIndex;
  this.foldlWithIndex = foldlWithIndex;
  this.foldrWithIndex = foldrWithIndex;
};

var foldrWithIndex = function foldrWithIndex(dict) {
  return dict.foldrWithIndex;
};

var traverseWithIndex_ = function traverseWithIndex_(dictApplicative) {
  return function (dictFoldableWithIndex) {
    return function (f) {
      return foldrWithIndex(dictFoldableWithIndex)(function (i) {
        var $46 = Control_Apply.applySecond(dictApplicative.Apply0());
        var $47 = f(i);
        return function ($48) {
          return $46($47($48));
        };
      })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
    };
  };
};

var forWithIndex_ = function forWithIndex_(dictApplicative) {
  return function (dictFoldableWithIndex) {
    return Data_Function.flip(traverseWithIndex_(dictApplicative)(dictFoldableWithIndex));
  };
};

var foldrDefault = function foldrDefault(dictFoldableWithIndex) {
  return function (f) {
    return foldrWithIndex(dictFoldableWithIndex)(Data_Function["const"](f));
  };
};

var foldlWithIndex = function foldlWithIndex(dict) {
  return dict.foldlWithIndex;
};

var foldlDefault = function foldlDefault(dictFoldableWithIndex) {
  return function (f) {
    return foldlWithIndex(dictFoldableWithIndex)(Data_Function["const"](f));
  };
};

var foldableWithIndexMultiplicative = new FoldableWithIndex(function () {
  return Data_Foldable.foldableMultiplicative;
}, function (dictMonoid) {
  return function (f) {
    return Data_Foldable.foldMap(Data_Foldable.foldableMultiplicative)(dictMonoid)(f(Data_Unit.unit));
  };
}, function (f) {
  return Data_Foldable.foldl(Data_Foldable.foldableMultiplicative)(f(Data_Unit.unit));
}, function (f) {
  return Data_Foldable.foldr(Data_Foldable.foldableMultiplicative)(f(Data_Unit.unit));
});
var foldableWithIndexMaybe = new FoldableWithIndex(function () {
  return Data_Foldable.foldableMaybe;
}, function (dictMonoid) {
  return function (f) {
    return Data_Foldable.foldMap(Data_Foldable.foldableMaybe)(dictMonoid)(f(Data_Unit.unit));
  };
}, function (f) {
  return Data_Foldable.foldl(Data_Foldable.foldableMaybe)(f(Data_Unit.unit));
}, function (f) {
  return Data_Foldable.foldr(Data_Foldable.foldableMaybe)(f(Data_Unit.unit));
});
var foldableWithIndexLast = new FoldableWithIndex(function () {
  return Data_Foldable.foldableLast;
}, function (dictMonoid) {
  return function (f) {
    return Data_Foldable.foldMap(Data_Foldable.foldableLast)(dictMonoid)(f(Data_Unit.unit));
  };
}, function (f) {
  return Data_Foldable.foldl(Data_Foldable.foldableLast)(f(Data_Unit.unit));
}, function (f) {
  return Data_Foldable.foldr(Data_Foldable.foldableLast)(f(Data_Unit.unit));
});
var foldableWithIndexFirst = new FoldableWithIndex(function () {
  return Data_Foldable.foldableFirst;
}, function (dictMonoid) {
  return function (f) {
    return Data_Foldable.foldMap(Data_Foldable.foldableFirst)(dictMonoid)(f(Data_Unit.unit));
  };
}, function (f) {
  return Data_Foldable.foldl(Data_Foldable.foldableFirst)(f(Data_Unit.unit));
}, function (f) {
  return Data_Foldable.foldr(Data_Foldable.foldableFirst)(f(Data_Unit.unit));
});
var foldableWithIndexDual = new FoldableWithIndex(function () {
  return Data_Foldable.foldableDual;
}, function (dictMonoid) {
  return function (f) {
    return Data_Foldable.foldMap(Data_Foldable.foldableDual)(dictMonoid)(f(Data_Unit.unit));
  };
}, function (f) {
  return Data_Foldable.foldl(Data_Foldable.foldableDual)(f(Data_Unit.unit));
}, function (f) {
  return Data_Foldable.foldr(Data_Foldable.foldableDual)(f(Data_Unit.unit));
});
var foldableWithIndexDisj = new FoldableWithIndex(function () {
  return Data_Foldable.foldableDisj;
}, function (dictMonoid) {
  return function (f) {
    return Data_Foldable.foldMap(Data_Foldable.foldableDisj)(dictMonoid)(f(Data_Unit.unit));
  };
}, function (f) {
  return Data_Foldable.foldl(Data_Foldable.foldableDisj)(f(Data_Unit.unit));
}, function (f) {
  return Data_Foldable.foldr(Data_Foldable.foldableDisj)(f(Data_Unit.unit));
});
var foldableWithIndexConj = new FoldableWithIndex(function () {
  return Data_Foldable.foldableConj;
}, function (dictMonoid) {
  return function (f) {
    return Data_Foldable.foldMap(Data_Foldable.foldableConj)(dictMonoid)(f(Data_Unit.unit));
  };
}, function (f) {
  return Data_Foldable.foldl(Data_Foldable.foldableConj)(f(Data_Unit.unit));
}, function (f) {
  return Data_Foldable.foldr(Data_Foldable.foldableConj)(f(Data_Unit.unit));
});
var foldableWithIndexAdditive = new FoldableWithIndex(function () {
  return Data_Foldable.foldableAdditive;
}, function (dictMonoid) {
  return function (f) {
    return Data_Foldable.foldMap(Data_Foldable.foldableAdditive)(dictMonoid)(f(Data_Unit.unit));
  };
}, function (f) {
  return Data_Foldable.foldl(Data_Foldable.foldableAdditive)(f(Data_Unit.unit));
}, function (f) {
  return Data_Foldable.foldr(Data_Foldable.foldableAdditive)(f(Data_Unit.unit));
});

var foldWithIndexM = function foldWithIndexM(dictFoldableWithIndex) {
  return function (dictMonad) {
    return function (f) {
      return function (a0) {
        return foldlWithIndex(dictFoldableWithIndex)(function (i) {
          return function (ma) {
            return function (b) {
              return Control_Bind.bind(dictMonad.Bind1())(ma)(Data_Function.flip(f(i))(b));
            };
          };
        })(Control_Applicative.pure(dictMonad.Applicative0())(a0));
      };
    };
  };
};

var foldMapWithIndexDefaultR = function foldMapWithIndexDefaultR(dictFoldableWithIndex) {
  return function (dictMonoid) {
    return function (f) {
      return foldrWithIndex(dictFoldableWithIndex)(function (i) {
        return function (x) {
          return function (acc) {
            return Data_Semigroup.append(dictMonoid.Semigroup0())(f(i)(x))(acc);
          };
        };
      })(Data_Monoid.mempty(dictMonoid));
    };
  };
};

var foldableWithIndexArray = new FoldableWithIndex(function () {
  return Data_Foldable.foldableArray;
}, function (dictMonoid) {
  return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
}, function (f) {
  return function (z) {
    var $49 = Data_Foldable.foldl(Data_Foldable.foldableArray)(function (y) {
      return function (v) {
        return f(v.value0)(y)(v.value1);
      };
    })(z);
    var $50 = Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray)(Tuple.create);
    return function ($51) {
      return $49($50($51));
    };
  };
}, function (f) {
  return function (z) {
    var $52 = Data_Foldable.foldr(Data_Foldable.foldableArray)(function (v) {
      return function (y) {
        return f(v.value0)(v.value1)(y);
      };
    })(z);
    var $53 = Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray)(Tuple.create);
    return function ($54) {
      return $52($53($54));
    };
  };
});

var foldMapWithIndexDefaultL = function foldMapWithIndexDefaultL(dictFoldableWithIndex) {
  return function (dictMonoid) {
    return function (f) {
      return foldlWithIndex(dictFoldableWithIndex)(function (i) {
        return function (acc) {
          return function (x) {
            return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(i)(x));
          };
        };
      })(Data_Monoid.mempty(dictMonoid));
    };
  };
};

var foldMapWithIndex = function foldMapWithIndex(dict) {
  return dict.foldMapWithIndex;
};

var foldlWithIndexDefault = function foldlWithIndexDefault(dictFoldableWithIndex) {
  return function (c) {
    return function (u) {
      return function (xs) {
        return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(Data_Newtype.unwrap(Data_Newtype.newtypeDual)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn)))(function (i) {
          var $55 = Data_Function.flip(c(i));
          return function ($56) {
            return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($55($56)));
          };
        })(xs)))(u);
      };
    };
  };
};

var foldrWithIndexDefault = function foldrWithIndexDefault(dictFoldableWithIndex) {
  return function (c) {
    return function (u) {
      return function (xs) {
        return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn))(function (i) {
          var $57 = c(i);
          return function ($58) {
            return Data_Monoid_Endo.Endo($57($58));
          };
        })(xs))(u);
      };
    };
  };
};

var surroundMapWithIndex = function surroundMapWithIndex(dictFoldableWithIndex) {
  return function (dictSemigroup) {
    return function (d) {
      return function (t) {
        return function (f) {
          var joined = function joined(i) {
            return function (a) {
              return function (m) {
                return Data_Semigroup.append(dictSemigroup)(d)(Data_Semigroup.append(dictSemigroup)(t(i)(a))(m));
              };
            };
          };

          return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Endo.monoidEndo(Control_Category.categoryFn))(joined)(f))(d);
        };
      };
    };
  };
};

var foldMapDefault = function foldMapDefault(dictFoldableWithIndex) {
  return function (dictMonoid) {
    return function (f) {
      return foldMapWithIndex(dictFoldableWithIndex)(dictMonoid)(Data_Function["const"](f));
    };
  };
};

var findWithIndex = function findWithIndex(dictFoldableWithIndex) {
  return function (p) {
    var go = function go(v) {
      return function (v1) {
        return function (v2) {
          if (v1 instanceof Data_Maybe.Nothing && p(v)(v2)) {
            return new Data_Maybe.Just({
              index: v,
              value: v2
            });
          }

          ;
          return v1;
        };
      };
    };

    return foldlWithIndex(dictFoldableWithIndex)(go)(Data_Maybe.Nothing.value);
  };
};

var anyWithIndex = function anyWithIndex(dictFoldableWithIndex) {
  return function (dictHeytingAlgebra) {
    return function (t) {
      var $59 = Data_Newtype.unwrap(Data_Newtype.newtypeDisj);
      var $60 = foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra))(function (i) {
        var $62 = t(i);
        return function ($63) {
          return Data_Monoid_Disj.Disj($62($63));
        };
      });
      return function ($61) {
        return $59($60($61));
      };
    };
  };
};

var allWithIndex = function allWithIndex(dictFoldableWithIndex) {
  return function (dictHeytingAlgebra) {
    return function (t) {
      var $64 = Data_Newtype.unwrap(Data_Newtype.newtypeConj);
      var $65 = foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra))(function (i) {
        var $67 = t(i);
        return function ($68) {
          return Data_Monoid_Conj.Conj($67($68));
        };
      });
      return function ($66) {
        return $64($65($66));
      };
    };
  };
};

module.exports = {
  FoldableWithIndex: FoldableWithIndex,
  foldrWithIndex: foldrWithIndex,
  foldlWithIndex: foldlWithIndex,
  foldMapWithIndex: foldMapWithIndex,
  foldrWithIndexDefault: foldrWithIndexDefault,
  foldlWithIndexDefault: foldlWithIndexDefault,
  foldMapWithIndexDefaultR: foldMapWithIndexDefaultR,
  foldMapWithIndexDefaultL: foldMapWithIndexDefaultL,
  foldWithIndexM: foldWithIndexM,
  traverseWithIndex_: traverseWithIndex_,
  forWithIndex_: forWithIndex_,
  surroundMapWithIndex: surroundMapWithIndex,
  allWithIndex: allWithIndex,
  anyWithIndex: anyWithIndex,
  findWithIndex: findWithIndex,
  foldrDefault: foldrDefault,
  foldlDefault: foldlDefault,
  foldMapDefault: foldMapDefault,
  foldableWithIndexArray: foldableWithIndexArray,
  foldableWithIndexMaybe: foldableWithIndexMaybe,
  foldableWithIndexFirst: foldableWithIndexFirst,
  foldableWithIndexLast: foldableWithIndexLast,
  foldableWithIndexAdditive: foldableWithIndexAdditive,
  foldableWithIndexDual: foldableWithIndexDual,
  foldableWithIndexDisj: foldableWithIndexDisj,
  foldableWithIndexConj: foldableWithIndexConj,
  foldableWithIndexMultiplicative: foldableWithIndexMultiplicative
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.FunctorWithIndex/index.js":"output/Data.FunctorWithIndex/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Monoid.Conj/index.js":"output/Data.Monoid.Conj/index.js","../Data.Monoid.Disj/index.js":"output/Data.Monoid.Disj/index.js","../Data.Monoid.Dual/index.js":"output/Data.Monoid.Dual/index.js","../Data.Monoid.Endo/index.js":"output/Data.Monoid.Endo/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.TraversableWithIndex/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Data_Traversable_Accum_Internal = require("../Data.Traversable.Accum.Internal/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var TraversableWithIndex = function TraversableWithIndex(FoldableWithIndex1, FunctorWithIndex0, Traversable2, traverseWithIndex) {
  this.FoldableWithIndex1 = FoldableWithIndex1;
  this.FunctorWithIndex0 = FunctorWithIndex0;
  this.Traversable2 = Traversable2;
  this.traverseWithIndex = traverseWithIndex;
};

var traverseWithIndexDefault = function traverseWithIndexDefault(dictTraversableWithIndex) {
  return function (dictApplicative) {
    return function (f) {
      var $19 = Data_Traversable.sequence(dictTraversableWithIndex.Traversable2())(dictApplicative);
      var $20 = Data_FunctorWithIndex.mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0())(f);
      return function ($21) {
        return $19($20($21));
      };
    };
  };
};

var traverseWithIndex = function traverseWithIndex(dict) {
  return dict.traverseWithIndex;
};

var traverseDefault = function traverseDefault(dictTraversableWithIndex) {
  return function (dictApplicative) {
    return function (f) {
      return traverseWithIndex(dictTraversableWithIndex)(dictApplicative)(Data_Function["const"](f));
    };
  };
};

var traversableWithIndexMultiplicative = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexMultiplicative;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexMultiplicative;
}, function () {
  return Data_Traversable.traversableMultiplicative;
}, function (dictApplicative) {
  return function (f) {
    return Data_Traversable.traverse(Data_Traversable.traversableMultiplicative)(dictApplicative)(f(Data_Unit.unit));
  };
});
var traversableWithIndexMaybe = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexMaybe;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexMaybe;
}, function () {
  return Data_Traversable.traversableMaybe;
}, function (dictApplicative) {
  return function (f) {
    return Data_Traversable.traverse(Data_Traversable.traversableMaybe)(dictApplicative)(f(Data_Unit.unit));
  };
});
var traversableWithIndexLast = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexLast;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexLast;
}, function () {
  return Data_Traversable.traversableLast;
}, function (dictApplicative) {
  return function (f) {
    return Data_Traversable.traverse(Data_Traversable.traversableLast)(dictApplicative)(f(Data_Unit.unit));
  };
});
var traversableWithIndexFirst = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexFirst;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexFirst;
}, function () {
  return Data_Traversable.traversableFirst;
}, function (dictApplicative) {
  return function (f) {
    return Data_Traversable.traverse(Data_Traversable.traversableFirst)(dictApplicative)(f(Data_Unit.unit));
  };
});
var traversableWithIndexDual = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexDual;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexDual;
}, function () {
  return Data_Traversable.traversableDual;
}, function (dictApplicative) {
  return function (f) {
    return Data_Traversable.traverse(Data_Traversable.traversableDual)(dictApplicative)(f(Data_Unit.unit));
  };
});
var traversableWithIndexDisj = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexDisj;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexDisj;
}, function () {
  return Data_Traversable.traversableDisj;
}, function (dictApplicative) {
  return function (f) {
    return Data_Traversable.traverse(Data_Traversable.traversableDisj)(dictApplicative)(f(Data_Unit.unit));
  };
});
var traversableWithIndexConj = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexConj;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexConj;
}, function () {
  return Data_Traversable.traversableConj;
}, function (dictApplicative) {
  return function (f) {
    return Data_Traversable.traverse(Data_Traversable.traversableConj)(dictApplicative)(f(Data_Unit.unit));
  };
});
var traversableWithIndexArray = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexArray;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexArray;
}, function () {
  return Data_Traversable.traversableArray;
}, function (dictApplicative) {
  return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
});
var traversableWithIndexAdditive = new TraversableWithIndex(function () {
  return Data_FoldableWithIndex.foldableWithIndexAdditive;
}, function () {
  return Data_FunctorWithIndex.functorWithIndexAdditive;
}, function () {
  return Data_Traversable.traversableAdditive;
}, function (dictApplicative) {
  return function (f) {
    return Data_Traversable.traverse(Data_Traversable.traversableAdditive)(dictApplicative)(f(Data_Unit.unit));
  };
});

var mapAccumRWithIndex = function mapAccumRWithIndex(dictTraversableWithIndex) {
  return function (f) {
    return function (s0) {
      return function (xs) {
        return Data_Traversable_Accum_Internal.stateR(traverseWithIndex(dictTraversableWithIndex)(Data_Traversable_Accum_Internal.applicativeStateR)(function (i) {
          return function (a) {
            return function (s) {
              return f(i)(s)(a);
            };
          };
        })(xs))(s0);
      };
    };
  };
};

var scanrWithIndex = function scanrWithIndex(dictTraversableWithIndex) {
  return function (f) {
    return function (b0) {
      return function (xs) {
        return mapAccumRWithIndex(dictTraversableWithIndex)(function (i) {
          return function (b) {
            return function (a) {
              var b$prime = f(i)(a)(b);
              return {
                accum: b$prime,
                value: b$prime
              };
            };
          };
        })(b0)(xs).value;
      };
    };
  };
};

var mapAccumLWithIndex = function mapAccumLWithIndex(dictTraversableWithIndex) {
  return function (f) {
    return function (s0) {
      return function (xs) {
        return Data_Traversable_Accum_Internal.stateL(traverseWithIndex(dictTraversableWithIndex)(Data_Traversable_Accum_Internal.applicativeStateL)(function (i) {
          return function (a) {
            return function (s) {
              return f(i)(s)(a);
            };
          };
        })(xs))(s0);
      };
    };
  };
};

var scanlWithIndex = function scanlWithIndex(dictTraversableWithIndex) {
  return function (f) {
    return function (b0) {
      return function (xs) {
        return mapAccumLWithIndex(dictTraversableWithIndex)(function (i) {
          return function (b) {
            return function (a) {
              var b$prime = f(i)(b)(a);
              return {
                accum: b$prime,
                value: b$prime
              };
            };
          };
        })(b0)(xs).value;
      };
    };
  };
};

var forWithIndex = function forWithIndex(dictApplicative) {
  return function (dictTraversableWithIndex) {
    return Data_Function.flip(traverseWithIndex(dictTraversableWithIndex)(dictApplicative));
  };
};

module.exports = {
  TraversableWithIndex: TraversableWithIndex,
  traverseWithIndex: traverseWithIndex,
  traverseWithIndexDefault: traverseWithIndexDefault,
  forWithIndex: forWithIndex,
  scanlWithIndex: scanlWithIndex,
  mapAccumLWithIndex: mapAccumLWithIndex,
  scanrWithIndex: scanrWithIndex,
  mapAccumRWithIndex: mapAccumRWithIndex,
  traverseDefault: traverseDefault,
  traversableWithIndexArray: traversableWithIndexArray,
  traversableWithIndexMaybe: traversableWithIndexMaybe,
  traversableWithIndexFirst: traversableWithIndexFirst,
  traversableWithIndexLast: traversableWithIndexLast,
  traversableWithIndexAdditive: traversableWithIndexAdditive,
  traversableWithIndexDual: traversableWithIndexDual,
  traversableWithIndexConj: traversableWithIndexConj,
  traversableWithIndexDisj: traversableWithIndexDisj,
  traversableWithIndexMultiplicative: traversableWithIndexMultiplicative
};
},{"../Data.FoldableWithIndex/index.js":"output/Data.FoldableWithIndex/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.FunctorWithIndex/index.js":"output/Data.FunctorWithIndex/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js","../Data.Traversable.Accum.Internal/index.js":"output/Data.Traversable.Accum.Internal/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Either/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Extend = require("../Control.Extend/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Bifoldable = require("../Data.Bifoldable/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Bitraversable = require("../Data.Bitraversable/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");

var Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Left = function () {
  function Left(value0) {
    this.value0 = value0;
  }

  ;

  Left.create = function (value0) {
    return new Left(value0);
  };

  return Left;
}();

var Right = function () {
  function Right(value0) {
    this.value0 = value0;
  }

  ;

  Right.create = function (value0) {
    return new Right(value0);
  };

  return Right;
}();

var showEither = function showEither(dictShow) {
  return function (dictShow1) {
    return new Data_Show.Show(function (v) {
      if (v instanceof Left) {
        return "(Left " + (Data_Show.show(dictShow)(v.value0) + ")");
      }

      ;

      if (v instanceof Right) {
        return "(Right " + (Data_Show.show(dictShow1)(v.value0) + ")");
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 163, column 1 - line 165, column 46): " + [v.constructor.name]);
    });
  };
};

var note$prime = function note$prime(f) {
  return Data_Maybe["maybe'"](function ($198) {
    return Left.create(f($198));
  })(Right.create);
};

var note = function note(a) {
  return Data_Maybe.maybe(new Left(a))(Right.create);
};

var functorEither = new Data_Functor.Functor(function (f) {
  return function (m) {
    if (m instanceof Left) {
      return new Left(m.value0);
    }

    ;

    if (m instanceof Right) {
      return new Right(f(m.value0));
    }

    ;
    throw new Error("Failed pattern match at Data.Either (line 38, column 1 - line 38, column 52): " + [m.constructor.name]);
  };
});
var functorWithIndexEither = new Data_FunctorWithIndex.FunctorWithIndex(function () {
  return functorEither;
}, function (f) {
  return Data_Functor.map(functorEither)(f(Data_Unit.unit));
});
var invariantEither = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorEither));

var fromRight = function fromRight(dictPartial) {
  return function (v) {
    if (v instanceof Right) {
      return v.value0;
    }

    ;
    throw new Error("Failed pattern match at Data.Either (line 261, column 1 - line 261, column 52): " + [v.constructor.name]);
  };
};

var fromLeft = function fromLeft(dictPartial) {
  return function (v) {
    if (v instanceof Left) {
      return v.value0;
    }

    ;
    throw new Error("Failed pattern match at Data.Either (line 256, column 1 - line 256, column 51): " + [v.constructor.name]);
  };
};

var foldableEither = new Data_Foldable.Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      if (v instanceof Left) {
        return Data_Monoid.mempty(dictMonoid);
      }

      ;

      if (v instanceof Right) {
        return f(v.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 187, column 1 - line 193, column 28): " + [f.constructor.name, v.constructor.name]);
    };
  };
}, function (v) {
  return function (z) {
    return function (v1) {
      if (v1 instanceof Left) {
        return z;
      }

      ;

      if (v1 instanceof Right) {
        return v(z)(v1.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 187, column 1 - line 193, column 28): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
    };
  };
}, function (v) {
  return function (z) {
    return function (v1) {
      if (v1 instanceof Left) {
        return z;
      }

      ;

      if (v1 instanceof Right) {
        return v(v1.value0)(z);
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 187, column 1 - line 193, column 28): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
    };
  };
});
var foldableWithIndexEither = new Data_FoldableWithIndex.FoldableWithIndex(function () {
  return foldableEither;
}, function (dictMonoid) {
  return function (f) {
    return function (v) {
      if (v instanceof Left) {
        return Data_Monoid.mempty(dictMonoid);
      }

      ;

      if (v instanceof Right) {
        return f(Data_Unit.unit)(v.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 195, column 1 - line 201, column 42): " + [f.constructor.name, v.constructor.name]);
    };
  };
}, function (v) {
  return function (z) {
    return function (v1) {
      if (v1 instanceof Left) {
        return z;
      }

      ;

      if (v1 instanceof Right) {
        return v(Data_Unit.unit)(z)(v1.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 195, column 1 - line 201, column 42): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
    };
  };
}, function (v) {
  return function (z) {
    return function (v1) {
      if (v1 instanceof Left) {
        return z;
      }

      ;

      if (v1 instanceof Right) {
        return v(Data_Unit.unit)(v1.value0)(z);
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 195, column 1 - line 201, column 42): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
    };
  };
});
var traversableEither = new Data_Traversable.Traversable(function () {
  return foldableEither;
}, function () {
  return functorEither;
}, function (dictApplicative) {
  return function (v) {
    if (v instanceof Left) {
      return Control_Applicative.pure(dictApplicative)(new Left(v.value0));
    }

    ;

    if (v instanceof Right) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v.value0);
    }

    ;
    throw new Error("Failed pattern match at Data.Either (line 211, column 1 - line 215, column 36): " + [v.constructor.name]);
  };
}, function (dictApplicative) {
  return function (v) {
    return function (v1) {
      if (v1 instanceof Left) {
        return Control_Applicative.pure(dictApplicative)(new Left(v1.value0));
      }

      ;

      if (v1 instanceof Right) {
        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v(v1.value0));
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 211, column 1 - line 215, column 36): " + [v.constructor.name, v1.constructor.name]);
    };
  };
});
var traversableWithIndexEither = new Data_TraversableWithIndex.TraversableWithIndex(function () {
  return foldableWithIndexEither;
}, function () {
  return functorWithIndexEither;
}, function () {
  return traversableEither;
}, function (dictApplicative) {
  return function (v) {
    return function (v1) {
      if (v1 instanceof Left) {
        return Control_Applicative.pure(dictApplicative)(new Left(v1.value0));
      }

      ;

      if (v1 instanceof Right) {
        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v(Data_Unit.unit)(v1.value0));
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 217, column 1 - line 219, column 53): " + [v.constructor.name, v1.constructor.name]);
    };
  };
});
var extendEither = new Control_Extend.Extend(function () {
  return functorEither;
}, function (v) {
  return function (v1) {
    if (v1 instanceof Left) {
      return new Left(v1.value0);
    }

    ;
    return new Right(v(v1));
  };
});

var eqEither = function eqEither(dictEq) {
  return function (dictEq1) {
    return new Data_Eq.Eq(function (x) {
      return function (y) {
        if (x instanceof Left && y instanceof Left) {
          return Data_Eq.eq(dictEq)(x.value0)(y.value0);
        }

        ;

        if (x instanceof Right && y instanceof Right) {
          return Data_Eq.eq(dictEq1)(x.value0)(y.value0);
        }

        ;
        return false;
      };
    });
  };
};

var ordEither = function ordEither(dictOrd) {
  return function (dictOrd1) {
    return new Data_Ord.Ord(function () {
      return eqEither(dictOrd.Eq0())(dictOrd1.Eq0());
    }, function (x) {
      return function (y) {
        if (x instanceof Left && y instanceof Left) {
          return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
        }

        ;

        if (x instanceof Left) {
          return Data_Ordering.LT.value;
        }

        ;

        if (y instanceof Left) {
          return Data_Ordering.GT.value;
        }

        ;

        if (x instanceof Right && y instanceof Right) {
          return Data_Ord.compare(dictOrd1)(x.value0)(y.value0);
        }

        ;
        throw new Error("Failed pattern match at Data.Either (line 179, column 1 - line 179, column 64): " + [x.constructor.name, y.constructor.name]);
      };
    });
  };
};

var eq1Either = function eq1Either(dictEq) {
  return new Data_Eq.Eq1(function (dictEq1) {
    return Data_Eq.eq(eqEither(dictEq)(dictEq1));
  });
};

var ord1Either = function ord1Either(dictOrd) {
  return new Data_Ord.Ord1(function () {
    return eq1Either(dictOrd.Eq0());
  }, function (dictOrd1) {
    return Data_Ord.compare(ordEither(dictOrd)(dictOrd1));
  });
};

var either = function either(v) {
  return function (v1) {
    return function (v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }

      ;

      if (v2 instanceof Right) {
        return v1(v2.value0);
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 238, column 1 - line 238, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};

var hush = either(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Maybe.Just.create);
var isLeft = either(Data_Function["const"](true))(Data_Function["const"](false));
var isRight = either(Data_Function["const"](false))(Data_Function["const"](true));

var choose = function choose(dictAlt) {
  return function (a) {
    return function (b) {
      return Control_Alt.alt(dictAlt)(Data_Functor.map(dictAlt.Functor0())(Left.create)(a))(Data_Functor.map(dictAlt.Functor0())(Right.create)(b));
    };
  };
};

var boundedEither = function boundedEither(dictBounded) {
  return function (dictBounded1) {
    return new Data_Bounded.Bounded(function () {
      return ordEither(dictBounded.Ord0())(dictBounded1.Ord0());
    }, new Left(Data_Bounded.bottom(dictBounded)), new Right(Data_Bounded.top(dictBounded1)));
  };
};

var bifunctorEither = new Data_Bifunctor.Bifunctor(function (v) {
  return function (v1) {
    return function (v2) {
      if (v2 instanceof Left) {
        return new Left(v(v2.value0));
      }

      ;

      if (v2 instanceof Right) {
        return new Right(v1(v2.value0));
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 46, column 1 - line 48, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
});
var bifoldableEither = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
  return function (v) {
    return function (v1) {
      return function (v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }

        ;

        if (v2 instanceof Right) {
          return v1(v2.value0);
        }

        ;
        throw new Error("Failed pattern match at Data.Either (line 203, column 1 - line 209, column 32): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
}, function (v) {
  return function (v1) {
    return function (z) {
      return function (v2) {
        if (v2 instanceof Left) {
          return v(z)(v2.value0);
        }

        ;

        if (v2 instanceof Right) {
          return v1(z)(v2.value0);
        }

        ;
        throw new Error("Failed pattern match at Data.Either (line 203, column 1 - line 209, column 32): " + [v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name]);
      };
    };
  };
}, function (v) {
  return function (v1) {
    return function (z) {
      return function (v2) {
        if (v2 instanceof Left) {
          return v(v2.value0)(z);
        }

        ;

        if (v2 instanceof Right) {
          return v1(v2.value0)(z);
        }

        ;
        throw new Error("Failed pattern match at Data.Either (line 203, column 1 - line 209, column 32): " + [v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name]);
      };
    };
  };
});
var bitraversableEither = new Data_Bitraversable.Bitraversable(function () {
  return bifoldableEither;
}, function () {
  return bifunctorEither;
}, function (dictApplicative) {
  return function (v) {
    if (v instanceof Left) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Left.create)(v.value0);
    }

    ;

    if (v instanceof Right) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v.value0);
    }

    ;
    throw new Error("Failed pattern match at Data.Either (line 221, column 1 - line 225, column 37): " + [v.constructor.name]);
  };
}, function (dictApplicative) {
  return function (v) {
    return function (v1) {
      return function (v2) {
        if (v2 instanceof Left) {
          return Data_Functor.map(dictApplicative.Apply0().Functor0())(Left.create)(v(v2.value0));
        }

        ;

        if (v2 instanceof Right) {
          return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v1(v2.value0));
        }

        ;
        throw new Error("Failed pattern match at Data.Either (line 221, column 1 - line 225, column 37): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
});
var applyEither = new Control_Apply.Apply(function () {
  return functorEither;
}, function (v) {
  return function (v1) {
    if (v instanceof Left) {
      return new Left(v.value0);
    }

    ;

    if (v instanceof Right) {
      return Data_Functor.map(functorEither)(v.value0)(v1);
    }

    ;
    throw new Error("Failed pattern match at Data.Either (line 82, column 1 - line 84, column 30): " + [v.constructor.name, v1.constructor.name]);
  };
});
var bindEither = new Control_Bind.Bind(function () {
  return applyEither;
}, either(function (e) {
  return function (v) {
    return new Left(e);
  };
})(function (a) {
  return function (f) {
    return f(a);
  };
}));

var semigroupEither = function semigroupEither(dictSemigroup) {
  return new Data_Semigroup.Semigroup(function (x) {
    return function (y) {
      return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semigroup.append(dictSemigroup))(x))(y);
    };
  });
};

var applicativeEither = new Control_Applicative.Applicative(function () {
  return applyEither;
}, Right.create);
var monadEither = new Control_Monad.Monad(function () {
  return applicativeEither;
}, function () {
  return bindEither;
});
var altEither = new Control_Alt.Alt(function () {
  return functorEither;
}, function (v) {
  return function (v1) {
    if (v instanceof Left) {
      return v1;
    }

    ;
    return v;
  };
});
module.exports = {
  Left: Left,
  Right: Right,
  either: either,
  choose: choose,
  isLeft: isLeft,
  isRight: isRight,
  fromLeft: fromLeft,
  fromRight: fromRight,
  note: note,
  "note'": note$prime,
  hush: hush,
  functorEither: functorEither,
  functorWithIndexEither: functorWithIndexEither,
  invariantEither: invariantEither,
  bifunctorEither: bifunctorEither,
  applyEither: applyEither,
  applicativeEither: applicativeEither,
  altEither: altEither,
  bindEither: bindEither,
  monadEither: monadEither,
  extendEither: extendEither,
  showEither: showEither,
  eqEither: eqEither,
  eq1Either: eq1Either,
  ordEither: ordEither,
  ord1Either: ord1Either,
  boundedEither: boundedEither,
  foldableEither: foldableEither,
  foldableWithIndexEither: foldableWithIndexEither,
  bifoldableEither: bifoldableEither,
  traversableEither: traversableEither,
  traversableWithIndexEither: traversableWithIndexEither,
  bitraversableEither: bitraversableEither,
  semigroupEither: semigroupEither
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Extend/index.js":"output/Control.Extend/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Bifoldable/index.js":"output/Data.Bifoldable/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Bitraversable/index.js":"output/Data.Bitraversable/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.FoldableWithIndex/index.js":"output/Data.FoldableWithIndex/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Functor.Invariant/index.js":"output/Data.Functor.Invariant/index.js","../Data.FunctorWithIndex/index.js":"output/Data.FunctorWithIndex/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js","../Data.TraversableWithIndex/index.js":"output/Data.TraversableWithIndex/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Control.Comonad/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Comonad = function Comonad(Extend0, extract) {
  this.Extend0 = Extend0;
  this.extract = extract;
};

var extract = function extract(dict) {
  return dict.extract;
};

module.exports = {
  Comonad: Comonad,
  extract: extract
};
},{}],"output/Data.Ord.Max/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Max = function Max(x) {
  return x;
};

var showMax = function showMax(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Max " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupMax = function semigroupMax(dictOrd) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Data_Ord.max(dictOrd)(v)(v1);
    };
  });
};

var newtypeMax = new Data_Newtype.Newtype(function (n) {
  return n;
}, Max);

var monoidMax = function monoidMax(dictBounded) {
  return new Data_Monoid.Monoid(function () {
    return semigroupMax(dictBounded.Ord0());
  }, Data_Bounded.bottom(dictBounded));
};

var eqMax = function eqMax(dictEq) {
  return dictEq;
};

var ordMax = function ordMax(dictOrd) {
  return new Data_Ord.Ord(function () {
    return eqMax(dictOrd.Eq0());
  }, function (v) {
    return function (v1) {
      return Data_Ord.compare(dictOrd)(v)(v1);
    };
  });
};

module.exports = {
  Max: Max,
  newtypeMax: newtypeMax,
  eqMax: eqMax,
  ordMax: ordMax,
  semigroupMax: semigroupMax,
  monoidMax: monoidMax,
  showMax: showMax
};
},{"../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Ord.Min/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Min = function Min(x) {
  return x;
};

var showMin = function showMin(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Min " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupMin = function semigroupMin(dictOrd) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Data_Ord.min(dictOrd)(v)(v1);
    };
  });
};

var newtypeMin = new Data_Newtype.Newtype(function (n) {
  return n;
}, Min);

var monoidMin = function monoidMin(dictBounded) {
  return new Data_Monoid.Monoid(function () {
    return semigroupMin(dictBounded.Ord0());
  }, Data_Bounded.top(dictBounded));
};

var eqMin = function eqMin(dictEq) {
  return dictEq;
};

var ordMin = function ordMin(dictOrd) {
  return new Data_Ord.Ord(function () {
    return eqMin(dictOrd.Eq0());
  }, function (v) {
    return function (v1) {
      return Data_Ord.compare(dictOrd)(v)(v1);
    };
  });
};

module.exports = {
  Min: Min,
  newtypeMin: newtypeMin,
  eqMin: eqMin,
  ordMin: ordMin,
  semigroupMin: semigroupMin,
  monoidMin: monoidMin,
  showMin: showMin
};
},{"../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Semigroup.Foldable/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Apply = require("../Control.Apply/index.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord_Max = require("../Data.Ord.Max/index.js");

var Data_Ord_Min = require("../Data.Ord.Min/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var JoinWith = function JoinWith(x) {
  return x;
};

var Act = function Act(x) {
  return x;
};

var Foldable1 = function Foldable1(Foldable0, fold1, foldMap1) {
  this.Foldable0 = Foldable0;
  this.fold1 = fold1;
  this.foldMap1 = foldMap1;
};

var semigroupJoinWith = function semigroupJoinWith(dictSemigroup) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return JoinWith(function (j) {
        return Data_Semigroup.append(dictSemigroup)(v(j))(Data_Semigroup.append(dictSemigroup)(j)(v1(j)));
      });
    };
  });
};

var semigroupAct = function semigroupAct(dictApply) {
  return new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
      return Control_Apply.applySecond(dictApply)(v)(v1);
    };
  });
};

var joinee = function joinee(v) {
  return v;
};

var getAct = function getAct(v) {
  return v;
};

var foldMap1 = function foldMap1(dict) {
  return dict.foldMap1;
};

var intercalateMap = function intercalateMap(dictFoldable1) {
  return function (dictSemigroup) {
    return function (j) {
      return function (f) {
        return function (foldable) {
          return joinee(foldMap1(dictFoldable1)(semigroupJoinWith(dictSemigroup))(function ($43) {
            return JoinWith(Data_Function["const"](f($43)));
          })(foldable))(j);
        };
      };
    };
  };
};

var intercalate = function intercalate(dictFoldable1) {
  return function (dictSemigroup) {
    return Data_Function.flip(intercalateMap(dictFoldable1)(dictSemigroup))(Control_Category.identity(Control_Category.categoryFn));
  };
};

var maximum = function maximum(dictOrd) {
  return function (dictFoldable1) {
    return Data_Newtype.ala(Data_Functor.functorFn)(Data_Ord_Max.newtypeMax)(Data_Ord_Max.newtypeMax)(Data_Ord_Max.Max)(foldMap1(dictFoldable1)(Data_Ord_Max.semigroupMax(dictOrd)));
  };
};

var minimum = function minimum(dictOrd) {
  return function (dictFoldable1) {
    return Data_Newtype.ala(Data_Functor.functorFn)(Data_Ord_Min.newtypeMin)(Data_Ord_Min.newtypeMin)(Data_Ord_Min.Min)(foldMap1(dictFoldable1)(Data_Ord_Min.semigroupMin(dictOrd)));
  };
};

var traverse1_ = function traverse1_(dictFoldable1) {
  return function (dictApply) {
    return function (f) {
      return function (t) {
        return Data_Functor.voidRight(dictApply.Functor0())(Data_Unit.unit)(getAct(foldMap1(dictFoldable1)(semigroupAct(dictApply))(function ($44) {
          return Act(f($44));
        })(t)));
      };
    };
  };
};

var for1_ = function for1_(dictFoldable1) {
  return function (dictApply) {
    return Data_Function.flip(traverse1_(dictFoldable1)(dictApply));
  };
};

var sequence1_ = function sequence1_(dictFoldable1) {
  return function (dictApply) {
    return traverse1_(dictFoldable1)(dictApply)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var fold1Default = function fold1Default(dictFoldable1) {
  return function (dictSemigroup) {
    return foldMap1(dictFoldable1)(dictSemigroup)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var foldableDual = new Foldable1(function () {
  return Data_Foldable.foldableDual;
}, function (dictSemigroup) {
  return fold1Default(foldableDual)(dictSemigroup);
}, function (dictSemigroup) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
});
var foldableMultiplicative = new Foldable1(function () {
  return Data_Foldable.foldableMultiplicative;
}, function (dictSemigroup) {
  return fold1Default(foldableMultiplicative)(dictSemigroup);
}, function (dictSemigroup) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
});

var fold1 = function fold1(dict) {
  return dict.fold1;
};

var foldMap1Default = function foldMap1Default(dictFoldable1) {
  return function (dictFunctor) {
    return function (dictSemigroup) {
      return function (f) {
        var $45 = fold1(dictFoldable1)(dictSemigroup);
        var $46 = Data_Functor.map(dictFunctor)(f);
        return function ($47) {
          return $45($46($47));
        };
      };
    };
  };
};

module.exports = {
  Foldable1: Foldable1,
  foldMap1: foldMap1,
  fold1: fold1,
  traverse1_: traverse1_,
  for1_: for1_,
  sequence1_: sequence1_,
  foldMap1Default: foldMap1Default,
  fold1Default: fold1Default,
  intercalate: intercalate,
  intercalateMap: intercalateMap,
  maximum: maximum,
  minimum: minimum,
  foldableDual: foldableDual,
  foldableMultiplicative: foldableMultiplicative
};
},{"../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord.Max/index.js":"output/Data.Ord.Max/index.js","../Data.Ord.Min/index.js":"output/Data.Ord.Min/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Semigroup.Traversable/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Category = require("../Control.Category/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");

var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");

var Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Traversable1 = function Traversable1(Foldable10, _Traversable, sequence1, traverse1) {
  this.Foldable10 = Foldable10;
  this.Traversable1 = _Traversable;
  this.sequence1 = sequence1;
  this.traverse1 = traverse1;
};

var traverse1 = function traverse1(dict) {
  return dict.traverse1;
};

var sequence1Default = function sequence1Default(dictTraversable1) {
  return function (dictApply) {
    return traverse1(dictTraversable1)(dictApply)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var traversableDual = new Traversable1(function () {
  return Data_Semigroup_Foldable.foldableDual;
}, function () {
  return Data_Traversable.traversableDual;
}, function (dictApply) {
  return sequence1Default(traversableDual)(dictApply);
}, function (dictApply) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApply.Functor0())(Data_Monoid_Dual.Dual)(f(v));
    };
  };
});
var traversableMultiplicative = new Traversable1(function () {
  return Data_Semigroup_Foldable.foldableMultiplicative;
}, function () {
  return Data_Traversable.traversableMultiplicative;
}, function (dictApply) {
  return sequence1Default(traversableMultiplicative)(dictApply);
}, function (dictApply) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApply.Functor0())(Data_Monoid_Multiplicative.Multiplicative)(f(v));
    };
  };
});

var sequence1 = function sequence1(dict) {
  return dict.sequence1;
};

var traverse1Default = function traverse1Default(dictTraversable1) {
  return function (dictApply) {
    return function (f) {
      return function (ta) {
        return sequence1(dictTraversable1)(dictApply)(Data_Functor.map(dictTraversable1.Traversable1().Functor0())(f)(ta));
      };
    };
  };
};

module.exports = {
  sequence1: sequence1,
  traverse1: traverse1,
  Traversable1: Traversable1,
  traverse1Default: traverse1Default,
  sequence1Default: sequence1Default,
  traversableDual: traversableDual,
  traversableMultiplicative: traversableMultiplicative
};
},{"../Control.Category/index.js":"output/Control.Category/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid.Dual/index.js":"output/Data.Monoid.Dual/index.js","../Data.Monoid.Multiplicative/index.js":"output/Data.Monoid.Multiplicative/index.js","../Data.Semigroup.Foldable/index.js":"output/Data.Semigroup.Foldable/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js"}],"output/Data.Identity/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Comonad = require("../Control.Comonad/index.js");

var Control_Extend = require("../Control.Extend/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");

var Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");

var Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Identity = function Identity(x) {
  return x;
};

var showIdentity = function showIdentity(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Identity " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semiringIdentity = function semiringIdentity(dictSemiring) {
  return dictSemiring;
};

var semigroupIdenity = function semigroupIdenity(dictSemigroup) {
  return dictSemigroup;
};

var ringIdentity = function ringIdentity(dictRing) {
  return dictRing;
};

var ordIdentity = function ordIdentity(dictOrd) {
  return dictOrd;
};

var newtypeIdentity = new Data_Newtype.Newtype(function (n) {
  return n;
}, Identity);

var monoidIdentity = function monoidIdentity(dictMonoid) {
  return dictMonoid;
};

var lazyIdentity = function lazyIdentity(dictLazy) {
  return dictLazy;
};

var heytingAlgebraIdentity = function heytingAlgebraIdentity(dictHeytingAlgebra) {
  return dictHeytingAlgebra;
};

var functorIdentity = new Data_Functor.Functor(function (f) {
  return function (m) {
    return f(m);
  };
});
var functorWithIndexIdentity = new Data_FunctorWithIndex.FunctorWithIndex(function () {
  return functorIdentity;
}, function (f) {
  return function (v) {
    return f(Data_Unit.unit)(v);
  };
});
var invariantIdentity = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorIdentity));
var foldableIdentity = new Data_Foldable.Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(v)(z);
    };
  };
});
var foldableWithIndexIdentity = new Data_FoldableWithIndex.FoldableWithIndex(function () {
  return foldableIdentity;
}, function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(Data_Unit.unit)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(Data_Unit.unit)(z)(v);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(Data_Unit.unit)(v)(z);
    };
  };
});
var traversableIdentity = new Data_Traversable.Traversable(function () {
  return foldableIdentity;
}, function () {
  return functorIdentity;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Identity)(v);
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Identity)(f(v));
    };
  };
});
var traversableWithIndexIdentity = new Data_TraversableWithIndex.TraversableWithIndex(function () {
  return foldableWithIndexIdentity;
}, function () {
  return functorWithIndexIdentity;
}, function () {
  return traversableIdentity;
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Identity)(f(Data_Unit.unit)(v));
    };
  };
});
var foldable1Identity = new Data_Semigroup_Foldable.Foldable1(function () {
  return foldableIdentity;
}, function (dictSemigroup) {
  return function (v) {
    return v;
  };
}, function (dictSemigroup) {
  return function (f) {
    return function (v) {
      return f(v);
    };
  };
});
var traversable1Identity = new Data_Semigroup_Traversable.Traversable1(function () {
  return foldable1Identity;
}, function () {
  return traversableIdentity;
}, function (dictApply) {
  return function (v) {
    return Data_Functor.map(dictApply.Functor0())(Identity)(v);
  };
}, function (dictApply) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApply.Functor0())(Identity)(f(v));
    };
  };
});
var extendIdentity = new Control_Extend.Extend(function () {
  return functorIdentity;
}, function (f) {
  return function (m) {
    return f(m);
  };
});

var euclideanRingIdentity = function euclideanRingIdentity(dictEuclideanRing) {
  return dictEuclideanRing;
};

var eqIdentity = function eqIdentity(dictEq) {
  return dictEq;
};

var eq1Identity = new Data_Eq.Eq1(function (dictEq) {
  return Data_Eq.eq(eqIdentity(dictEq));
});
var ord1Identity = new Data_Ord.Ord1(function () {
  return eq1Identity;
}, function (dictOrd) {
  return Data_Ord.compare(ordIdentity(dictOrd));
});
var comonadIdentity = new Control_Comonad.Comonad(function () {
  return extendIdentity;
}, function (v) {
  return v;
});

var commutativeRingIdentity = function commutativeRingIdentity(dictCommutativeRing) {
  return dictCommutativeRing;
};

var boundedIdentity = function boundedIdentity(dictBounded) {
  return dictBounded;
};

var booleanAlgebraIdentity = function booleanAlgebraIdentity(dictBooleanAlgebra) {
  return dictBooleanAlgebra;
};

var applyIdentity = new Control_Apply.Apply(function () {
  return functorIdentity;
}, function (v) {
  return function (v1) {
    return v(v1);
  };
});
var bindIdentity = new Control_Bind.Bind(function () {
  return applyIdentity;
}, function (v) {
  return function (f) {
    return f(v);
  };
});
var applicativeIdentity = new Control_Applicative.Applicative(function () {
  return applyIdentity;
}, Identity);
var monadIdentity = new Control_Monad.Monad(function () {
  return applicativeIdentity;
}, function () {
  return bindIdentity;
});
var altIdentity = new Control_Alt.Alt(function () {
  return functorIdentity;
}, function (x) {
  return function (v) {
    return x;
  };
});
module.exports = {
  Identity: Identity,
  newtypeIdentity: newtypeIdentity,
  eqIdentity: eqIdentity,
  ordIdentity: ordIdentity,
  boundedIdentity: boundedIdentity,
  heytingAlgebraIdentity: heytingAlgebraIdentity,
  booleanAlgebraIdentity: booleanAlgebraIdentity,
  semigroupIdenity: semigroupIdenity,
  monoidIdentity: monoidIdentity,
  semiringIdentity: semiringIdentity,
  euclideanRingIdentity: euclideanRingIdentity,
  ringIdentity: ringIdentity,
  commutativeRingIdentity: commutativeRingIdentity,
  lazyIdentity: lazyIdentity,
  showIdentity: showIdentity,
  eq1Identity: eq1Identity,
  ord1Identity: ord1Identity,
  functorIdentity: functorIdentity,
  functorWithIndexIdentity: functorWithIndexIdentity,
  invariantIdentity: invariantIdentity,
  altIdentity: altIdentity,
  applyIdentity: applyIdentity,
  applicativeIdentity: applicativeIdentity,
  bindIdentity: bindIdentity,
  monadIdentity: monadIdentity,
  extendIdentity: extendIdentity,
  comonadIdentity: comonadIdentity,
  foldableIdentity: foldableIdentity,
  foldable1Identity: foldable1Identity,
  foldableWithIndexIdentity: foldableWithIndexIdentity,
  traversableIdentity: traversableIdentity,
  traversable1Identity: traversable1Identity,
  traversableWithIndexIdentity: traversableWithIndexIdentity
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Comonad/index.js":"output/Control.Comonad/index.js","../Control.Extend/index.js":"output/Control.Extend/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.FoldableWithIndex/index.js":"output/Data.FoldableWithIndex/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Functor.Invariant/index.js":"output/Data.Functor.Invariant/index.js","../Data.FunctorWithIndex/index.js":"output/Data.FunctorWithIndex/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup.Foldable/index.js":"output/Data.Semigroup.Foldable/index.js","../Data.Semigroup.Traversable/index.js":"output/Data.Semigroup.Traversable/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js","../Data.TraversableWithIndex/index.js":"output/Data.TraversableWithIndex/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Effect/foreign.js":[function(require,module,exports) {
"use strict";

exports.pureE = function (a) {
  return function () {
    return a;
  };
};

exports.bindE = function (a) {
  return function (f) {
    return function () {
      return f(a())();
    };
  };
};

exports.untilE = function (f) {
  return function () {
    while (!f()) {
      ;
    }

    return {};
  };
};

exports.whileE = function (f) {
  return function (a) {
    return function () {
      while (f()) {
        a();
      }

      return {};
    };
  };
};

exports.forE = function (lo) {
  return function (hi) {
    return function (f) {
      return function () {
        for (var i = lo; i < hi; i++) {
          f(i)();
        }
      };
    };
  };
};

exports.foreachE = function (as) {
  return function (f) {
    return function () {
      for (var i = 0, l = as.length; i < l; i++) {
        f(as[i])();
      }
    };
  };
};
},{}],"output/Effect/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var monadEffect = new Control_Monad.Monad(function () {
  return applicativeEffect;
}, function () {
  return bindEffect;
});
var bindEffect = new Control_Bind.Bind(function () {
  return applyEffect;
}, $foreign.bindE);
var applyEffect = new Control_Apply.Apply(function () {
  return functorEffect;
}, Control_Monad.ap(monadEffect));
var applicativeEffect = new Control_Applicative.Applicative(function () {
  return applyEffect;
}, $foreign.pureE);
var functorEffect = new Data_Functor.Functor(Control_Applicative.liftA1(applicativeEffect));

var semigroupEffect = function semigroupEffect(dictSemigroup) {
  return new Data_Semigroup.Semigroup(Control_Apply.lift2(applyEffect)(Data_Semigroup.append(dictSemigroup)));
};

var monoidEffect = function monoidEffect(dictMonoid) {
  return new Data_Monoid.Monoid(function () {
    return semigroupEffect(dictMonoid.Semigroup0());
  }, $foreign.pureE(Data_Monoid.mempty(dictMonoid)));
};

module.exports = {
  functorEffect: functorEffect,
  applyEffect: applyEffect,
  applicativeEffect: applicativeEffect,
  bindEffect: bindEffect,
  monadEffect: monadEffect,
  semigroupEffect: semigroupEffect,
  monoidEffect: monoidEffect,
  untilE: $foreign.untilE,
  whileE: $foreign.whileE,
  forE: $foreign.forE,
  foreachE: $foreign.foreachE
};
},{"./foreign.js":"output/Effect/foreign.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js"}],"output/Effect.Ref/foreign.js":[function(require,module,exports) {
"use strict";

exports.new = function (val) {
  return function () {
    return {
      value: val
    };
  };
};

exports.read = function (ref) {
  return function () {
    return ref.value;
  };
};

exports["modify'"] = function (f) {
  return function (ref) {
    return function () {
      var t = f(ref.value);
      ref.value = t.state;
      return t.value;
    };
  };
};

exports.write = function (val) {
  return function (ref) {
    return function () {
      ref.value = val;
      return {};
    };
  };
};
},{}],"output/Effect.Ref/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Functor = require("../Data.Functor/index.js");

var Effect = require("../Effect/index.js");

var modify = function modify(f) {
  return $foreign["modify'"](function (s) {
    var s$prime = f(s);
    return {
      state: s$prime,
      value: s$prime
    };
  });
};

var modify_ = function modify_(f) {
  return function (s) {
    return Data_Functor["void"](Effect.functorEffect)(modify(f)(s));
  };
};

module.exports = {
  modify: modify,
  modify_: modify_,
  "new": $foreign["new"],
  read: $foreign.read,
  "modify'": $foreign["modify'"],
  write: $foreign.write
};
},{"./foreign.js":"output/Effect.Ref/foreign.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Effect/index.js":"output/Effect/index.js"}],"output/Control.Monad.Rec.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Either = require("../Data.Either/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Identity = require("../Data.Identity/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Effect = require("../Effect/index.js");

var Effect_Ref = require("../Effect.Ref/index.js");

var Loop = function () {
  function Loop(value0) {
    this.value0 = value0;
  }

  ;

  Loop.create = function (value0) {
    return new Loop(value0);
  };

  return Loop;
}();

var Done = function () {
  function Done(value0) {
    this.value0 = value0;
  }

  ;

  Done.create = function (value0) {
    return new Done(value0);
  };

  return Done;
}();

var MonadRec = function MonadRec(Monad0, tailRecM) {
  this.Monad0 = Monad0;
  this.tailRecM = tailRecM;
};

var tailRecM = function tailRecM(dict) {
  return dict.tailRecM;
};

var tailRecM2 = function tailRecM2(dictMonadRec) {
  return function (f) {
    return function (a) {
      return function (b) {
        return tailRecM(dictMonadRec)(function (o) {
          return f(o.a)(o.b);
        })({
          a: a,
          b: b
        });
      };
    };
  };
};

var tailRecM3 = function tailRecM3(dictMonadRec) {
  return function (f) {
    return function (a) {
      return function (b) {
        return function (c) {
          return tailRecM(dictMonadRec)(function (o) {
            return f(o.a)(o.b)(o.c);
          })({
            a: a,
            b: b,
            c: c
          });
        };
      };
    };
  };
};

var untilJust = function untilJust(dictMonadRec) {
  return function (m) {
    return tailRecM(dictMonadRec)(function (v) {
      return Data_Functor.mapFlipped(dictMonadRec.Monad0().Bind1().Apply0().Functor0())(m)(function (v1) {
        if (v1 instanceof Data_Maybe.Nothing) {
          return new Loop(Data_Unit.unit);
        }

        ;

        if (v1 instanceof Data_Maybe.Just) {
          return new Done(v1.value0);
        }

        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 155, column 43 - line 157, column 19): " + [v1.constructor.name]);
      });
    })(Data_Unit.unit);
  };
};

var whileJust = function whileJust(dictMonoid) {
  return function (dictMonadRec) {
    return function (m) {
      return tailRecM(dictMonadRec)(function (v) {
        return Data_Functor.mapFlipped(dictMonadRec.Monad0().Bind1().Apply0().Functor0())(m)(function (v1) {
          if (v1 instanceof Data_Maybe.Nothing) {
            return new Done(v);
          }

          ;

          if (v1 instanceof Data_Maybe.Just) {
            return Loop.create(Data_Semigroup.append(dictMonoid.Semigroup0())(v)(v1.value0));
          }

          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 148, column 45 - line 150, column 26): " + [v1.constructor.name]);
        });
      })(Data_Monoid.mempty(dictMonoid));
    };
  };
};

var tailRec = function tailRec(f) {
  var go = function go($copy_v) {
    var $tco_done = false;
    var $tco_result;

    function $tco_loop(v) {
      if (v instanceof Loop) {
        $copy_v = f(v.value0);
        return;
      }

      ;

      if (v instanceof Done) {
        $tco_done = true;
        return v.value0;
      }

      ;
      throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 93, column 3 - line 93, column 25): " + [v.constructor.name]);
    }

    ;

    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }

    ;
    return $tco_result;
  };

  return function ($58) {
    return go(f($58));
  };
};

var monadRecMaybe = new MonadRec(function () {
  return Data_Maybe.monadMaybe;
}, function (f) {
  return function (a0) {
    var g = function g(v) {
      if (v instanceof Data_Maybe.Nothing) {
        return new Done(Data_Maybe.Nothing.value);
      }

      ;

      if (v instanceof Data_Maybe.Just && v.value0 instanceof Loop) {
        return new Loop(f(v.value0.value0));
      }

      ;

      if (v instanceof Data_Maybe.Just && v.value0 instanceof Done) {
        return new Done(new Data_Maybe.Just(v.value0.value0));
      }

      ;
      throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 129, column 7 - line 129, column 31): " + [v.constructor.name]);
    };

    return tailRec(g)(f(a0));
  };
});
var monadRecIdentity = new MonadRec(function () {
  return Data_Identity.monadIdentity;
}, function (f) {
  var runIdentity = function runIdentity(v) {
    return v;
  };

  var $59 = tailRec(function ($61) {
    return runIdentity(f($61));
  });
  return function ($60) {
    return Data_Identity.Identity($59($60));
  };
});
var monadRecFunction = new MonadRec(function () {
  return Control_Monad.monadFn;
}, function (f) {
  return function (a0) {
    return function (e) {
      return tailRec(function (a) {
        return f(a)(e);
      })(a0);
    };
  };
});
var monadRecEither = new MonadRec(function () {
  return Data_Either.monadEither;
}, function (f) {
  return function (a0) {
    var g = function g(v) {
      if (v instanceof Data_Either.Left) {
        return new Done(new Data_Either.Left(v.value0));
      }

      ;

      if (v instanceof Data_Either.Right && v.value0 instanceof Loop) {
        return new Loop(f(v.value0.value0));
      }

      ;

      if (v instanceof Data_Either.Right && v.value0 instanceof Done) {
        return new Done(new Data_Either.Right(v.value0.value0));
      }

      ;
      throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 121, column 7 - line 121, column 33): " + [v.constructor.name]);
    };

    return tailRec(g)(f(a0));
  };
});
var monadRecEffect = new MonadRec(function () {
  return Effect.monadEffect;
}, function (f) {
  return function (a) {
    var fromDone = function fromDone(v) {
      if (v instanceof Done) {
        return v.value0;
      }

      ;
      throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 113, column 30 - line 113, column 44): " + [v.constructor.name]);
    };

    return function __do() {
      var r = Control_Bind.bindFlipped(Effect.bindEffect)(Effect_Ref["new"])(f(a))();

      (function () {
        while (!function __do() {
          var v = Effect_Ref.read(r)();

          if (v instanceof Loop) {
            var e = f(v.value0)();
            Effect_Ref.write(e)(r)();
            return false;
          }

          ;

          if (v instanceof Done) {
            return true;
          }

          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 104, column 22 - line 109, column 28): " + [v.constructor.name]);
        }()) {}

        ;
        return {};
      })();

      return Data_Functor.map(Effect.functorEffect)(fromDone)(Effect_Ref.read(r))();
    };
  };
});
var functorStep = new Data_Functor.Functor(function (f) {
  return function (m) {
    if (m instanceof Loop) {
      return new Loop(m.value0);
    }

    ;

    if (m instanceof Done) {
      return new Done(f(m.value0));
    }

    ;
    throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 27, column 1 - line 27, column 48): " + [m.constructor.name]);
  };
});

var forever = function forever(dictMonadRec) {
  return function (ma) {
    return tailRecM(dictMonadRec)(function (u) {
      return Data_Functor.voidRight(dictMonadRec.Monad0().Bind1().Apply0().Functor0())(new Loop(u))(ma);
    })(Data_Unit.unit);
  };
};

var bifunctorStep = new Data_Bifunctor.Bifunctor(function (v) {
  return function (v1) {
    return function (v2) {
      if (v2 instanceof Loop) {
        return new Loop(v(v2.value0));
      }

      ;

      if (v2 instanceof Done) {
        return new Done(v1(v2.value0));
      }

      ;
      throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 29, column 1 - line 31, column 34): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
});
module.exports = {
  Loop: Loop,
  Done: Done,
  MonadRec: MonadRec,
  tailRec: tailRec,
  tailRecM: tailRecM,
  tailRecM2: tailRecM2,
  tailRecM3: tailRecM3,
  forever: forever,
  whileJust: whileJust,
  untilJust: untilJust,
  functorStep: functorStep,
  bifunctorStep: bifunctorStep,
  monadRecIdentity: monadRecIdentity,
  monadRecEffect: monadRecEffect,
  monadRecFunction: monadRecFunction,
  monadRecEither: monadRecEither,
  monadRecMaybe: monadRecMaybe
};
},{"../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Either/index.js":"output/Data.Either/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Identity/index.js":"output/Data.Identity/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Effect/index.js":"output/Effect/index.js","../Effect.Ref/index.js":"output/Effect.Ref/index.js"}],"output/Control.Monad.ST.Internal/foreign.js":[function(require,module,exports) {
"use strict";

exports.map_ = function (f) {
  return function (a) {
    return function () {
      return f(a());
    };
  };
};

exports.pure_ = function (a) {
  return function () {
    return a;
  };
};

exports.bind_ = function (a) {
  return function (f) {
    return function () {
      return f(a())();
    };
  };
};

exports.run = function (f) {
  return f();
};

exports["while"] = function (f) {
  return function (a) {
    return function () {
      while (f()) {
        a();
      }
    };
  };
};

exports["for"] = function (lo) {
  return function (hi) {
    return function (f) {
      return function () {
        for (var i = lo; i < hi; i++) {
          f(i)();
        }
      };
    };
  };
};

exports.foreach = function (as) {
  return function (f) {
    return function () {
      for (var i = 0, l = as.length; i < l; i++) {
        f(as[i])();
      }
    };
  };
};

exports.new = function (val) {
  return function () {
    return {
      value: val
    };
  };
};

exports.read = function (ref) {
  return function () {
    return ref.value;
  };
};

exports["modify'"] = function (f) {
  return function (ref) {
    return function () {
      var t = f(ref.value);
      ref.value = t.state;
      return t.value;
    };
  };
};

exports.write = function (a) {
  return function (ref) {
    return function () {
      return ref.value = a; // eslint-disable-line no-return-assign
    };
  };
};
},{}],"output/Control.Monad.ST.Internal/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var modify = function modify(f) {
  return $foreign["modify'"](function (s) {
    var s$prime = f(s);
    return {
      state: s$prime,
      value: s$prime
    };
  });
};

var functorST = new Data_Functor.Functor($foreign.map_);
var monadST = new Control_Monad.Monad(function () {
  return applicativeST;
}, function () {
  return bindST;
});
var bindST = new Control_Bind.Bind(function () {
  return applyST;
}, $foreign.bind_);
var applyST = new Control_Apply.Apply(function () {
  return functorST;
}, Control_Monad.ap(monadST));
var applicativeST = new Control_Applicative.Applicative(function () {
  return applyST;
}, $foreign.pure_);
var monadRecST = new Control_Monad_Rec_Class.MonadRec(function () {
  return monadST;
}, function (f) {
  return function (a) {
    var isLooping = function isLooping(v) {
      if (v instanceof Control_Monad_Rec_Class.Loop) {
        return true;
      }

      ;
      return false;
    };

    var fromDone = function fromDone(v) {
      if (v instanceof Control_Monad_Rec_Class.Done) {
        return v.value0;
      }

      ;
      throw new Error("Failed pattern match at Control.Monad.ST.Internal (line 54, column 32 - line 54, column 46): " + [v.constructor.name]);
    };

    return Control_Bind.bind(bindST)(Control_Bind.bindFlipped(bindST)($foreign["new"])(f(a)))(function (r) {
      return Control_Bind.discard(Control_Bind.discardUnit)(bindST)($foreign["while"](Data_Functor.map(functorST)(isLooping)($foreign.read(r)))(Control_Bind.bind(bindST)($foreign.read(r))(function (v) {
        if (v instanceof Control_Monad_Rec_Class.Loop) {
          return Control_Bind.bind(bindST)(f(v.value0))(function (e) {
            return Data_Functor["void"](functorST)($foreign.write(e)(r));
          });
        }

        ;

        if (v instanceof Control_Monad_Rec_Class.Done) {
          return Control_Applicative.pure(applicativeST)(Data_Unit.unit);
        }

        ;
        throw new Error("Failed pattern match at Control.Monad.ST.Internal (line 46, column 18 - line 50, column 28): " + [v.constructor.name]);
      })))(function () {
        return Data_Functor.map(functorST)(fromDone)($foreign.read(r));
      });
    });
  };
});
module.exports = {
  modify: modify,
  functorST: functorST,
  applyST: applyST,
  applicativeST: applicativeST,
  bindST: bindST,
  monadST: monadST,
  monadRecST: monadRecST,
  map_: $foreign.map_,
  pure_: $foreign.pure_,
  bind_: $foreign.bind_,
  run: $foreign.run,
  "while": $foreign["while"],
  "for": $foreign["for"],
  foreach: $foreign.foreach,
  "new": $foreign["new"],
  read: $foreign.read,
  "modify'": $foreign["modify'"],
  write: $foreign.write
};
},{"./foreign.js":"output/Control.Monad.ST.Internal/foreign.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Monad.Rec.Class/index.js":"output/Control.Monad.Rec.Class/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Array.ST/foreign.js":[function(require,module,exports) {
"use strict";

exports.empty = function () {
  return [];
};

exports.peekImpl = function (just) {
  return function (nothing) {
    return function (i) {
      return function (xs) {
        return function () {
          return i >= 0 && i < xs.length ? just(xs[i]) : nothing;
        };
      };
    };
  };
};

exports.poke = function (i) {
  return function (a) {
    return function (xs) {
      return function () {
        var ret = i >= 0 && i < xs.length;
        if (ret) xs[i] = a;
        return ret;
      };
    };
  };
};

exports.popImpl = function (just) {
  return function (nothing) {
    return function (xs) {
      return function () {
        return xs.length > 0 ? just(xs.pop()) : nothing;
      };
    };
  };
};

exports.pushAll = function (as) {
  return function (xs) {
    return function () {
      return xs.push.apply(xs, as);
    };
  };
};

exports.shiftImpl = function (just) {
  return function (nothing) {
    return function (xs) {
      return function () {
        return xs.length > 0 ? just(xs.shift()) : nothing;
      };
    };
  };
};

exports.unshiftAll = function (as) {
  return function (xs) {
    return function () {
      return xs.unshift.apply(xs, as);
    };
  };
};

exports.splice = function (i) {
  return function (howMany) {
    return function (bs) {
      return function (xs) {
        return function () {
          return xs.splice.apply(xs, [i, howMany].concat(bs));
        };
      };
    };
  };
};

exports.unsafeFreeze = function (xs) {
  return function () {
    return xs;
  };
};

exports.unsafeThaw = function (xs) {
  return function () {
    return xs;
  };
};

function copyImpl(xs) {
  return function () {
    return xs.slice();
  };
}

exports.freeze = copyImpl;
exports.thaw = copyImpl;

exports.sortByImpl = function (comp) {
  return function (xs) {
    return function () {
      return xs.sort(function (x, y) {
        return comp(x)(y);
      });
    };
  };
};

exports.toAssocArray = function (xs) {
  return function () {
    var n = xs.length;
    var as = new Array(n);

    for (var i = 0; i < n; i++) {
      as[i] = {
        value: xs[i],
        index: i
      };
    }

    return as;
  };
};
},{}],"output/Data.Array.ST/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var withArray = function withArray(f) {
  return function (xs) {
    return function __do() {
      var result = $foreign.thaw(xs)();
      f(result)();
      return $foreign.unsafeFreeze(result)();
    };
  };
};

var unshift = function unshift(a) {
  return $foreign.unshiftAll([a]);
};

var sortBy = function sortBy(comp) {
  var comp$prime = function comp$prime(x) {
    return function (y) {
      var v = comp(x)(y);

      if (v instanceof Data_Ordering.GT) {
        return 1;
      }

      ;

      if (v instanceof Data_Ordering.EQ) {
        return 0;
      }

      ;

      if (v instanceof Data_Ordering.LT) {
        return -1 | 0;
      }

      ;
      throw new Error("Failed pattern match at Data.Array.ST (line 105, column 15 - line 108, column 13): " + [v.constructor.name]);
    };
  };

  return $foreign.sortByImpl(comp$prime);
};

var sortWith = function sortWith(dictOrd) {
  return function (f) {
    return sortBy(Data_Ord.comparing(dictOrd)(f));
  };
};

var sort = function sort(dictOrd) {
  return sortBy(Data_Ord.compare(dictOrd));
};

var shift = $foreign.shiftImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var run = function run(st) {
  return Control_Bind.bind(Control_Monad_ST_Internal.bindST)(st)($foreign.unsafeFreeze)();
};

var push = function push(a) {
  return $foreign.pushAll([a]);
};

var pop = $foreign.popImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var peek = $foreign.peekImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var modify = function modify(i) {
  return function (f) {
    return function (xs) {
      return function __do() {
        var entry = peek(i)(xs)();

        if (entry instanceof Data_Maybe.Just) {
          return $foreign.poke(i)(f(entry.value0))(xs)();
        }

        ;

        if (entry instanceof Data_Maybe.Nothing) {
          return false;
        }

        ;
        throw new Error("Failed pattern match at Data.Array.ST (line 188, column 3 - line 190, column 26): " + [entry.constructor.name]);
      };
    };
  };
};

module.exports = {
  run: run,
  withArray: withArray,
  peek: peek,
  modify: modify,
  pop: pop,
  push: push,
  shift: shift,
  unshift: unshift,
  sort: sort,
  sortBy: sortBy,
  sortWith: sortWith,
  empty: $foreign.empty,
  poke: $foreign.poke,
  pushAll: $foreign.pushAll,
  unshiftAll: $foreign.unshiftAll,
  splice: $foreign.splice,
  freeze: $foreign.freeze,
  thaw: $foreign.thaw,
  unsafeFreeze: $foreign.unsafeFreeze,
  unsafeThaw: $foreign.unsafeThaw,
  toAssocArray: $foreign.toAssocArray
};
},{"./foreign.js":"output/Data.Array.ST/foreign.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad.ST.Internal/index.js":"output/Control.Monad.ST.Internal/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js"}],"output/Data.Array.ST.Iterator/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");

var Data_Array_ST = require("../Data.Array.ST/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Iterator = function () {
  function Iterator(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }

  ;

  Iterator.create = function (value0) {
    return function (value1) {
      return new Iterator(value0, value1);
    };
  };

  return Iterator;
}();

var peek = function peek(v) {
  return function __do() {
    var i = Control_Monad_ST_Internal.read(v.value1)();
    return v.value0(i);
  };
};

var next = function next(v) {
  return function __do() {
    var i = Control_Monad_ST_Internal.read(v.value1)();
    Control_Monad_ST_Internal.modify(function (v1) {
      return v1 + 1 | 0;
    })(v.value1)();
    return v.value0(i);
  };
};

var pushWhile = function pushWhile(p) {
  return function (iter) {
    return function (array) {
      return function __do() {
        var $$break = Control_Monad_ST_Internal["new"](false)();

        while (Data_Functor.map(Control_Monad_ST_Internal.functorST)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))(Control_Monad_ST_Internal.read($$break))()) {
          (function __do() {
            var mx = peek(iter)();

            if (mx instanceof Data_Maybe.Just && p(mx.value0)) {
              Data_Array_ST.push(mx.value0)(array)();
              return Data_Functor["void"](Control_Monad_ST_Internal.functorST)(next(iter))();
            }

            ;
            return Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Control_Monad_ST_Internal.write(true)($$break))();
          })();
        }

        ;
        return {};
      };
    };
  };
};

var pushAll = pushWhile(Data_Function["const"](true));

var iterator = function iterator(f) {
  return Data_Functor.map(Control_Monad_ST_Internal.functorST)(Iterator.create(f))(Control_Monad_ST_Internal["new"](0));
};

var iterate = function iterate(iter) {
  return function (f) {
    return function __do() {
      var $$break = Control_Monad_ST_Internal["new"](false)();

      while (Data_Functor.map(Control_Monad_ST_Internal.functorST)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))(Control_Monad_ST_Internal.read($$break))()) {
        (function __do() {
          var mx = next(iter)();

          if (mx instanceof Data_Maybe.Just) {
            return f(mx.value0)();
          }

          ;

          if (mx instanceof Data_Maybe.Nothing) {
            return Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Control_Monad_ST_Internal.write(true)($$break))();
          }

          ;
          throw new Error("Failed pattern match at Data.Array.ST.Iterator (line 42, column 5 - line 44, column 47): " + [mx.constructor.name]);
        })();
      }

      ;
      return {};
    };
  };
};

var exhausted = function () {
  var $13 = Data_Functor.map(Control_Monad_ST_Internal.functorST)(Data_Maybe.isNothing);
  return function ($14) {
    return $13(peek($14));
  };
}();

module.exports = {
  iterator: iterator,
  iterate: iterate,
  next: next,
  peek: peek,
  exhausted: exhausted,
  pushWhile: pushWhile,
  pushAll: pushAll
};
},{"../Control.Monad.ST.Internal/index.js":"output/Control.Monad.ST.Internal/index.js","../Data.Array.ST/index.js":"output/Data.Array.ST/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.HeytingAlgebra/index.js":"output/Data.HeytingAlgebra/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js"}],"output/Data.BooleanAlgebra/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");

var BooleanAlgebraRecord = function BooleanAlgebraRecord(HeytingAlgebraRecord0) {
  this.HeytingAlgebraRecord0 = HeytingAlgebraRecord0;
};

var BooleanAlgebra = function BooleanAlgebra(HeytingAlgebra0) {
  this.HeytingAlgebra0 = HeytingAlgebra0;
};

var booleanAlgebraUnit = new BooleanAlgebra(function () {
  return Data_HeytingAlgebra.heytingAlgebraUnit;
});
var booleanAlgebraRecordNil = new BooleanAlgebraRecord(function () {
  return Data_HeytingAlgebra.heytingAlgebraRecordNil;
});

var booleanAlgebraRecordCons = function booleanAlgebraRecordCons(dictIsSymbol) {
  return function (dictCons) {
    return function (dictBooleanAlgebraRecord) {
      return function (dictBooleanAlgebra) {
        return new BooleanAlgebraRecord(function () {
          return Data_HeytingAlgebra.heytingAlgebraRecordCons(dictIsSymbol)()(dictBooleanAlgebraRecord.HeytingAlgebraRecord0())(dictBooleanAlgebra.HeytingAlgebra0());
        });
      };
    };
  };
};

var booleanAlgebraRecord = function booleanAlgebraRecord(dictRowToList) {
  return function (dictBooleanAlgebraRecord) {
    return new BooleanAlgebra(function () {
      return Data_HeytingAlgebra.heytingAlgebraRecord()(dictBooleanAlgebraRecord.HeytingAlgebraRecord0());
    });
  };
};

var booleanAlgebraFn = function booleanAlgebraFn(dictBooleanAlgebra) {
  return new BooleanAlgebra(function () {
    return Data_HeytingAlgebra.heytingAlgebraFunction(dictBooleanAlgebra.HeytingAlgebra0());
  });
};

var booleanAlgebraBoolean = new BooleanAlgebra(function () {
  return Data_HeytingAlgebra.heytingAlgebraBoolean;
});
module.exports = {
  BooleanAlgebra: BooleanAlgebra,
  BooleanAlgebraRecord: BooleanAlgebraRecord,
  booleanAlgebraBoolean: booleanAlgebraBoolean,
  booleanAlgebraUnit: booleanAlgebraUnit,
  booleanAlgebraFn: booleanAlgebraFn,
  booleanAlgebraRecord: booleanAlgebraRecord,
  booleanAlgebraRecordNil: booleanAlgebraRecordNil,
  booleanAlgebraRecordCons: booleanAlgebraRecordCons
};
},{"../Data.HeytingAlgebra/index.js":"output/Data.HeytingAlgebra/index.js"}],"output/Data.Distributive/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Category = require("../Control.Category/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Identity = require("../Data.Identity/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Distributive = function Distributive(Functor0, collect, distribute) {
  this.Functor0 = Functor0;
  this.collect = collect;
  this.distribute = distribute;
};

var distributiveIdentity = new Distributive(function () {
  return Data_Identity.functorIdentity;
}, function (dictFunctor) {
  return function (f) {
    var $11 = Data_Functor.map(dictFunctor)(function () {
      var $13 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
      return function ($14) {
        return $13(f($14));
      };
    }());
    return function ($12) {
      return Data_Identity.Identity($11($12));
    };
  };
}, function (dictFunctor) {
  var $15 = Data_Functor.map(dictFunctor)(Data_Newtype.unwrap(Data_Identity.newtypeIdentity));
  return function ($16) {
    return Data_Identity.Identity($15($16));
  };
});

var distribute = function distribute(dict) {
  return dict.distribute;
};

var distributiveFunction = new Distributive(function () {
  return Data_Functor.functorFn;
}, function (dictFunctor) {
  return function (f) {
    var $17 = distribute(distributiveFunction)(dictFunctor);
    var $18 = Data_Functor.map(dictFunctor)(f);
    return function ($19) {
      return $17($18($19));
    };
  };
}, function (dictFunctor) {
  return function (a) {
    return function (e) {
      return Data_Functor.map(dictFunctor)(function (v) {
        return v(e);
      })(a);
    };
  };
});

var cotraverse = function cotraverse(dictDistributive) {
  return function (dictFunctor) {
    return function (f) {
      var $20 = Data_Functor.map(dictDistributive.Functor0())(f);
      var $21 = distribute(dictDistributive)(dictFunctor);
      return function ($22) {
        return $20($21($22));
      };
    };
  };
};

var collectDefault = function collectDefault(dictDistributive) {
  return function (dictFunctor) {
    return function (f) {
      var $23 = distribute(dictDistributive)(dictFunctor);
      var $24 = Data_Functor.map(dictFunctor)(f);
      return function ($25) {
        return $23($24($25));
      };
    };
  };
};

var collect = function collect(dict) {
  return dict.collect;
};

var distributeDefault = function distributeDefault(dictDistributive) {
  return function (dictFunctor) {
    return collect(dictDistributive)(dictFunctor)(Control_Category.identity(Control_Category.categoryFn));
  };
};

module.exports = {
  collect: collect,
  distribute: distribute,
  Distributive: Distributive,
  distributeDefault: distributeDefault,
  collectDefault: collectDefault,
  cotraverse: cotraverse,
  distributiveIdentity: distributiveIdentity,
  distributiveFunction: distributiveFunction
};
},{"../Control.Category/index.js":"output/Control.Category/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Identity/index.js":"output/Data.Identity/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js"}],"output/Type.Equality/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var TypeEquals = function TypeEquals(from, to) {
  this.from = from;
  this.to = to;
};

var to = function to(dict) {
  return dict.to;
};

var refl = new TypeEquals(function (a) {
  return a;
}, function (a) {
  return a;
});

var from = function from(dict) {
  return dict.from;
};

module.exports = {
  TypeEquals: TypeEquals,
  to: to,
  from: from,
  refl: refl
};
},{}],"output/Data.Tuple/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Biapplicative = require("../Control.Biapplicative/index.js");

var Control_Biapply = require("../Control.Biapply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Comonad = require("../Control.Comonad/index.js");

var Control_Extend = require("../Control.Extend/index.js");

var Control_Lazy = require("../Control.Lazy/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");

var Data_Bifoldable = require("../Data.Bifoldable/index.js");

var Data_Bifunctor = require("../Data.Bifunctor/index.js");

var Data_Bitraversable = require("../Data.Bitraversable/index.js");

var Data_BooleanAlgebra = require("../Data.BooleanAlgebra/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_CommutativeRing = require("../Data.CommutativeRing/index.js");

var Data_Distributive = require("../Data.Distributive/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");

var Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");

var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Maybe_First = require("../Data.Maybe.First/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Ring = require("../Data.Ring/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");

var Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Type_Equality = require("../Type.Equality/index.js");

var Tuple = function () {
  function Tuple(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }

  ;

  Tuple.create = function (value0) {
    return function (value1) {
      return new Tuple(value0, value1);
    };
  };

  return Tuple;
}();

var uncurry = function uncurry(f) {
  return function (v) {
    return f(v.value0)(v.value1);
  };
};

var swap = function swap(v) {
  return new Tuple(v.value1, v.value0);
};

var snd = function snd(v) {
  return v.value1;
};

var showTuple = function showTuple(dictShow) {
  return function (dictShow1) {
    return new Data_Show.Show(function (v) {
      return "(Tuple " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
    });
  };
};

var semiringTuple = function semiringTuple(dictSemiring) {
  return function (dictSemiring1) {
    return new Data_Semiring.Semiring(function (v) {
      return function (v1) {
        return new Tuple(Data_Semiring.add(dictSemiring)(v.value0)(v1.value0), Data_Semiring.add(dictSemiring1)(v.value1)(v1.value1));
      };
    }, function (v) {
      return function (v1) {
        return new Tuple(Data_Semiring.mul(dictSemiring)(v.value0)(v1.value0), Data_Semiring.mul(dictSemiring1)(v.value1)(v1.value1));
      };
    }, new Tuple(Data_Semiring.one(dictSemiring), Data_Semiring.one(dictSemiring1)), new Tuple(Data_Semiring.zero(dictSemiring), Data_Semiring.zero(dictSemiring1)));
  };
};

var semigroupoidTuple = new Control_Semigroupoid.Semigroupoid(function (v) {
  return function (v1) {
    return new Tuple(v1.value0, v.value1);
  };
});

var semigroupTuple = function semigroupTuple(dictSemigroup) {
  return function (dictSemigroup1) {
    return new Data_Semigroup.Semigroup(function (v) {
      return function (v1) {
        return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), Data_Semigroup.append(dictSemigroup1)(v.value1)(v1.value1));
      };
    });
  };
};

var ringTuple = function ringTuple(dictRing) {
  return function (dictRing1) {
    return new Data_Ring.Ring(function () {
      return semiringTuple(dictRing.Semiring0())(dictRing1.Semiring0());
    }, function (v) {
      return function (v1) {
        return new Tuple(Data_Ring.sub(dictRing)(v.value0)(v1.value0), Data_Ring.sub(dictRing1)(v.value1)(v1.value1));
      };
    });
  };
};

var monoidTuple = function monoidTuple(dictMonoid) {
  return function (dictMonoid1) {
    return new Data_Monoid.Monoid(function () {
      return semigroupTuple(dictMonoid.Semigroup0())(dictMonoid1.Semigroup0());
    }, new Tuple(Data_Monoid.mempty(dictMonoid), Data_Monoid.mempty(dictMonoid1)));
  };
};

var lookup = function lookup(dictFoldable) {
  return function (dictEq) {
    return function (a) {
      var $312 = Data_Newtype.unwrap(Data_Maybe_First.newtypeFirst);
      var $313 = Data_Foldable.foldMap(dictFoldable)(Data_Maybe_First.monoidFirst)(function (v) {
        var $163 = Data_Eq.eq(dictEq)(a)(v.value0);

        if ($163) {
          return new Data_Maybe.Just(v.value1);
        }

        ;
        return Data_Maybe.Nothing.value;
      });
      return function ($314) {
        return $312($313($314));
      };
    };
  };
};

var heytingAlgebraTuple = function heytingAlgebraTuple(dictHeytingAlgebra) {
  return function (dictHeytingAlgebra1) {
    return new Data_HeytingAlgebra.HeytingAlgebra(function (v) {
      return function (v1) {
        return new Tuple(Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.conj(dictHeytingAlgebra1)(v.value1)(v1.value1));
      };
    }, function (v) {
      return function (v1) {
        return new Tuple(Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.disj(dictHeytingAlgebra1)(v.value1)(v1.value1));
      };
    }, new Tuple(Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra1)), function (v) {
      return function (v1) {
        return new Tuple(Data_HeytingAlgebra.implies(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.implies(dictHeytingAlgebra1)(v.value1)(v1.value1));
      };
    }, function (v) {
      return new Tuple(Data_HeytingAlgebra.not(dictHeytingAlgebra)(v.value0), Data_HeytingAlgebra.not(dictHeytingAlgebra1)(v.value1));
    }, new Tuple(Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra1)));
  };
};

var functorTuple = new Data_Functor.Functor(function (f) {
  return function (m) {
    return new Tuple(m.value0, f(m.value1));
  };
});
var functorWithIndexTuple = new Data_FunctorWithIndex.FunctorWithIndex(function () {
  return functorTuple;
}, function (f) {
  return Data_Functor.map(functorTuple)(f(Data_Unit.unit));
});
var invariantTuple = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorTuple));

var fst = function fst(v) {
  return v.value0;
};

var lazyTuple = function lazyTuple(dictLazy) {
  return function (dictLazy1) {
    return new Control_Lazy.Lazy(function (f) {
      return new Tuple(Control_Lazy.defer(dictLazy)(function (v) {
        return fst(f(Data_Unit.unit));
      }), Control_Lazy.defer(dictLazy1)(function (v) {
        return snd(f(Data_Unit.unit));
      }));
    });
  };
};

var foldableTuple = new Data_Foldable.Foldable(function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(v.value1);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(z)(v.value1);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(v.value1)(z);
    };
  };
});
var foldableWithIndexTuple = new Data_FoldableWithIndex.FoldableWithIndex(function () {
  return foldableTuple;
}, function (dictMonoid) {
  return function (f) {
    return function (v) {
      return f(Data_Unit.unit)(v.value1);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(Data_Unit.unit)(z)(v.value1);
    };
  };
}, function (f) {
  return function (z) {
    return function (v) {
      return f(Data_Unit.unit)(v.value1)(z);
    };
  };
});
var traversableTuple = new Data_Traversable.Traversable(function () {
  return foldableTuple;
}, function () {
  return functorTuple;
}, function (dictApplicative) {
  return function (v) {
    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create(v.value0))(v.value1);
  };
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create(v.value0))(f(v.value1));
    };
  };
});
var traversableWithIndexTuple = new Data_TraversableWithIndex.TraversableWithIndex(function () {
  return foldableWithIndexTuple;
}, function () {
  return functorWithIndexTuple;
}, function () {
  return traversableTuple;
}, function (dictApplicative) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create(v.value0))(f(Data_Unit.unit)(v.value1));
    };
  };
});
var foldable1Tuple = new Data_Semigroup_Foldable.Foldable1(function () {
  return foldableTuple;
}, function (dictSemigroup) {
  return function (v) {
    return v.value1;
  };
}, function (dictSemigroup) {
  return function (f) {
    return function (v) {
      return f(v.value1);
    };
  };
});
var traversable1Tuple = new Data_Semigroup_Traversable.Traversable1(function () {
  return foldable1Tuple;
}, function () {
  return traversableTuple;
}, function (dictApply) {
  return function (v) {
    return Data_Functor.map(dictApply.Functor0())(Tuple.create(v.value0))(v.value1);
  };
}, function (dictApply) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictApply.Functor0())(Tuple.create(v.value0))(f(v.value1));
    };
  };
});
var extendTuple = new Control_Extend.Extend(function () {
  return functorTuple;
}, function (f) {
  return function (v) {
    return new Tuple(v.value0, f(v));
  };
});

var eqTuple = function eqTuple(dictEq) {
  return function (dictEq1) {
    return new Data_Eq.Eq(function (x) {
      return function (y) {
        return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
      };
    });
  };
};

var ordTuple = function ordTuple(dictOrd) {
  return function (dictOrd1) {
    return new Data_Ord.Ord(function () {
      return eqTuple(dictOrd.Eq0())(dictOrd1.Eq0());
    }, function (x) {
      return function (y) {
        var v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);

        if (v instanceof Data_Ordering.LT) {
          return Data_Ordering.LT.value;
        }

        ;

        if (v instanceof Data_Ordering.GT) {
          return Data_Ordering.GT.value;
        }

        ;
        return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
      };
    });
  };
};

var eq1Tuple = function eq1Tuple(dictEq) {
  return new Data_Eq.Eq1(function (dictEq1) {
    return Data_Eq.eq(eqTuple(dictEq)(dictEq1));
  });
};

var ord1Tuple = function ord1Tuple(dictOrd) {
  return new Data_Ord.Ord1(function () {
    return eq1Tuple(dictOrd.Eq0());
  }, function (dictOrd1) {
    return Data_Ord.compare(ordTuple(dictOrd)(dictOrd1));
  });
};

var distributiveTuple = function distributiveTuple(dictTypeEquals) {
  return new Data_Distributive.Distributive(function () {
    return functorTuple;
  }, function (dictFunctor) {
    return Data_Distributive.collectDefault(distributiveTuple(dictTypeEquals))(dictFunctor);
  }, function (dictFunctor) {
    var $315 = Tuple.create(Type_Equality.from(dictTypeEquals)(Data_Unit.unit));
    var $316 = Data_Functor.map(dictFunctor)(snd);
    return function ($317) {
      return $315($316($317));
    };
  });
};

var curry = function curry(f) {
  return function (a) {
    return function (b) {
      return f(new Tuple(a, b));
    };
  };
};

var comonadTuple = new Control_Comonad.Comonad(function () {
  return extendTuple;
}, snd);

var commutativeRingTuple = function commutativeRingTuple(dictCommutativeRing) {
  return function (dictCommutativeRing1) {
    return new Data_CommutativeRing.CommutativeRing(function () {
      return ringTuple(dictCommutativeRing.Ring0())(dictCommutativeRing1.Ring0());
    });
  };
};

var boundedTuple = function boundedTuple(dictBounded) {
  return function (dictBounded1) {
    return new Data_Bounded.Bounded(function () {
      return ordTuple(dictBounded.Ord0())(dictBounded1.Ord0());
    }, new Tuple(Data_Bounded.bottom(dictBounded), Data_Bounded.bottom(dictBounded1)), new Tuple(Data_Bounded.top(dictBounded), Data_Bounded.top(dictBounded1)));
  };
};

var booleanAlgebraTuple = function booleanAlgebraTuple(dictBooleanAlgebra) {
  return function (dictBooleanAlgebra1) {
    return new Data_BooleanAlgebra.BooleanAlgebra(function () {
      return heytingAlgebraTuple(dictBooleanAlgebra.HeytingAlgebra0())(dictBooleanAlgebra1.HeytingAlgebra0());
    });
  };
};

var bifunctorTuple = new Data_Bifunctor.Bifunctor(function (f) {
  return function (g) {
    return function (v) {
      return new Tuple(f(v.value0), g(v.value1));
    };
  };
});
var bifoldableTuple = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
  return function (f) {
    return function (g) {
      return function (v) {
        return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(g(v.value1));
      };
    };
  };
}, function (f) {
  return function (g) {
    return function (z) {
      return function (v) {
        return g(f(z)(v.value0))(v.value1);
      };
    };
  };
}, function (f) {
  return function (g) {
    return function (z) {
      return function (v) {
        return f(v.value0)(g(v.value1)(z));
      };
    };
  };
});
var bitraversableTuple = new Data_Bitraversable.Bitraversable(function () {
  return bifoldableTuple;
}, function () {
  return bifunctorTuple;
}, function (dictApplicative) {
  return function (v) {
    return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create)(v.value0))(v.value1);
  };
}, function (dictApplicative) {
  return function (f) {
    return function (g) {
      return function (v) {
        return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create)(f(v.value0)))(g(v.value1));
      };
    };
  };
});
var biapplyTuple = new Control_Biapply.Biapply(function () {
  return bifunctorTuple;
}, function (v) {
  return function (v1) {
    return new Tuple(v.value0(v1.value0), v.value1(v1.value1));
  };
});
var biapplicativeTuple = new Control_Biapplicative.Biapplicative(function () {
  return biapplyTuple;
}, Tuple.create);

var applyTuple = function applyTuple(dictSemigroup) {
  return new Control_Apply.Apply(function () {
    return functorTuple;
  }, function (v) {
    return function (v1) {
      return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), v.value1(v1.value1));
    };
  });
};

var bindTuple = function bindTuple(dictSemigroup) {
  return new Control_Bind.Bind(function () {
    return applyTuple(dictSemigroup);
  }, function (v) {
    return function (f) {
      var v1 = f(v.value1);
      return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), v1.value1);
    };
  });
};

var applicativeTuple = function applicativeTuple(dictMonoid) {
  return new Control_Applicative.Applicative(function () {
    return applyTuple(dictMonoid.Semigroup0());
  }, Tuple.create(Data_Monoid.mempty(dictMonoid)));
};

var monadTuple = function monadTuple(dictMonoid) {
  return new Control_Monad.Monad(function () {
    return applicativeTuple(dictMonoid);
  }, function () {
    return bindTuple(dictMonoid.Semigroup0());
  });
};

module.exports = {
  Tuple: Tuple,
  fst: fst,
  snd: snd,
  curry: curry,
  uncurry: uncurry,
  swap: swap,
  lookup: lookup,
  showTuple: showTuple,
  eqTuple: eqTuple,
  eq1Tuple: eq1Tuple,
  ordTuple: ordTuple,
  ord1Tuple: ord1Tuple,
  boundedTuple: boundedTuple,
  semigroupoidTuple: semigroupoidTuple,
  semigroupTuple: semigroupTuple,
  monoidTuple: monoidTuple,
  semiringTuple: semiringTuple,
  ringTuple: ringTuple,
  commutativeRingTuple: commutativeRingTuple,
  heytingAlgebraTuple: heytingAlgebraTuple,
  booleanAlgebraTuple: booleanAlgebraTuple,
  functorTuple: functorTuple,
  functorWithIndexTuple: functorWithIndexTuple,
  invariantTuple: invariantTuple,
  bifunctorTuple: bifunctorTuple,
  applyTuple: applyTuple,
  biapplyTuple: biapplyTuple,
  applicativeTuple: applicativeTuple,
  biapplicativeTuple: biapplicativeTuple,
  bindTuple: bindTuple,
  monadTuple: monadTuple,
  extendTuple: extendTuple,
  comonadTuple: comonadTuple,
  lazyTuple: lazyTuple,
  foldableTuple: foldableTuple,
  foldable1Tuple: foldable1Tuple,
  foldableWithIndexTuple: foldableWithIndexTuple,
  bifoldableTuple: bifoldableTuple,
  traversableTuple: traversableTuple,
  traversable1Tuple: traversable1Tuple,
  traversableWithIndexTuple: traversableWithIndexTuple,
  bitraversableTuple: bitraversableTuple,
  distributiveTuple: distributiveTuple
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Biapplicative/index.js":"output/Control.Biapplicative/index.js","../Control.Biapply/index.js":"output/Control.Biapply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Comonad/index.js":"output/Control.Comonad/index.js","../Control.Extend/index.js":"output/Control.Extend/index.js","../Control.Lazy/index.js":"output/Control.Lazy/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Semigroupoid/index.js":"output/Control.Semigroupoid/index.js","../Data.Bifoldable/index.js":"output/Data.Bifoldable/index.js","../Data.Bifunctor/index.js":"output/Data.Bifunctor/index.js","../Data.Bitraversable/index.js":"output/Data.Bitraversable/index.js","../Data.BooleanAlgebra/index.js":"output/Data.BooleanAlgebra/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.CommutativeRing/index.js":"output/Data.CommutativeRing/index.js","../Data.Distributive/index.js":"output/Data.Distributive/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.FoldableWithIndex/index.js":"output/Data.FoldableWithIndex/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Functor.Invariant/index.js":"output/Data.Functor.Invariant/index.js","../Data.FunctorWithIndex/index.js":"output/Data.FunctorWithIndex/index.js","../Data.HeytingAlgebra/index.js":"output/Data.HeytingAlgebra/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Maybe.First/index.js":"output/Data.Maybe.First/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Ring/index.js":"output/Data.Ring/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Semigroup.Foldable/index.js":"output/Data.Semigroup.Foldable/index.js","../Data.Semigroup.Traversable/index.js":"output/Data.Semigroup.Traversable/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js","../Data.TraversableWithIndex/index.js":"output/Data.TraversableWithIndex/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Type.Equality/index.js":"output/Type.Equality/index.js"}],"output/Data.Unfoldable/foreign.js":[function(require,module,exports) {
"use strict";

exports.unfoldrArrayImpl = function (isNothing) {
  return function (fromJust) {
    return function (fst) {
      return function (snd) {
        return function (f) {
          return function (b) {
            var result = [];
            var value = b;

            while (true) {
              // eslint-disable-line no-constant-condition
              var maybe = f(value);
              if (isNothing(maybe)) return result;
              var tuple = fromJust(maybe);
              result.push(fst(tuple));
              value = snd(tuple);
            }
          };
        };
      };
    };
  };
};
},{}],"output/Data.Unfoldable1/foreign.js":[function(require,module,exports) {
"use strict";

exports.unfoldr1ArrayImpl = function (isNothing) {
  return function (fromJust) {
    return function (fst) {
      return function (snd) {
        return function (f) {
          return function (b) {
            var result = [];
            var value = b;

            while (true) {
              // eslint-disable-line no-constant-condition
              var tuple = f(value);
              result.push(fst(tuple));
              var maybe = snd(tuple);
              if (isNothing(maybe)) return result;
              value = fromJust(maybe);
            }
          };
        };
      };
    };
  };
};
},{}],"output/Data.Unfoldable1/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var Unfoldable1 = function Unfoldable1(unfoldr1) {
  this.unfoldr1 = unfoldr1;
};

var unfoldr1 = function unfoldr1(dict) {
  return dict.unfoldr1;
};

var unfoldable1Maybe = new Unfoldable1(function (f) {
  return function (b) {
    return new Data_Maybe.Just(Data_Tuple.fst(f(b)));
  };
});
var unfoldable1Array = new Unfoldable1($foreign.unfoldr1ArrayImpl(Data_Maybe.isNothing)(Data_Maybe.fromJust())(Data_Tuple.fst)(Data_Tuple.snd));

var replicate1 = function replicate1(dictUnfoldable1) {
  return function (n) {
    return function (v) {
      var step = function step(i) {
        if (i <= 0) {
          return new Data_Tuple.Tuple(v, Data_Maybe.Nothing.value);
        }

        ;

        if (Data_Boolean.otherwise) {
          return new Data_Tuple.Tuple(v, new Data_Maybe.Just(i - 1 | 0));
        }

        ;
        throw new Error("Failed pattern match at Data.Unfoldable1 (line 67, column 5 - line 67, column 39): " + [i.constructor.name]);
      };

      return unfoldr1(dictUnfoldable1)(step)(n - 1 | 0);
    };
  };
};

var replicate1A = function replicate1A(dictApply) {
  return function (dictUnfoldable1) {
    return function (dictTraversable1) {
      return function (n) {
        return function (m) {
          return Data_Semigroup_Traversable.sequence1(dictTraversable1)(dictApply)(replicate1(dictUnfoldable1)(n)(m));
        };
      };
    };
  };
};

var singleton = function singleton(dictUnfoldable1) {
  return replicate1(dictUnfoldable1)(1);
};

var range = function range(dictUnfoldable1) {
  return function (start) {
    return function (end) {
      var go = function go(delta) {
        return function (i) {
          var i$prime = i + delta | 0;
          return new Data_Tuple.Tuple(i, function () {
            var $8 = i === end;

            if ($8) {
              return Data_Maybe.Nothing.value;
            }

            ;
            return new Data_Maybe.Just(i$prime);
          }());
        };
      };

      var delta = function () {
        var $9 = end >= start;

        if ($9) {
          return 1;
        }

        ;
        return -1 | 0;
      }();

      return unfoldr1(dictUnfoldable1)(go(delta))(start);
    };
  };
};

module.exports = {
  Unfoldable1: Unfoldable1,
  unfoldr1: unfoldr1,
  replicate1: replicate1,
  replicate1A: replicate1A,
  singleton: singleton,
  range: range,
  unfoldable1Array: unfoldable1Array,
  unfoldable1Maybe: unfoldable1Maybe
};
},{"./foreign.js":"output/Data.Unfoldable1/foreign.js","../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Semigroup.Traversable/index.js":"output/Data.Semigroup.Traversable/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js"}],"output/Data.Unfoldable/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Unfoldable = function Unfoldable(Unfoldable10, unfoldr) {
  this.Unfoldable10 = Unfoldable10;
  this.unfoldr = unfoldr;
};

var unfoldr = function unfoldr(dict) {
  return dict.unfoldr;
};

var unfoldableMaybe = new Unfoldable(function () {
  return Data_Unfoldable1.unfoldable1Maybe;
}, function (f) {
  return function (b) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Tuple.fst)(f(b));
  };
});
var unfoldableArray = new Unfoldable(function () {
  return Data_Unfoldable1.unfoldable1Array;
}, $foreign.unfoldrArrayImpl(Data_Maybe.isNothing)(Data_Maybe.fromJust())(Data_Tuple.fst)(Data_Tuple.snd));

var replicate = function replicate(dictUnfoldable) {
  return function (n) {
    return function (v) {
      var step = function step(i) {
        var $7 = i <= 0;

        if ($7) {
          return Data_Maybe.Nothing.value;
        }

        ;
        return new Data_Maybe.Just(new Data_Tuple.Tuple(v, i - 1 | 0));
      };

      return unfoldr(dictUnfoldable)(step)(n);
    };
  };
};

var replicateA = function replicateA(dictApplicative) {
  return function (dictUnfoldable) {
    return function (dictTraversable) {
      return function (n) {
        return function (m) {
          return Data_Traversable.sequence(dictTraversable)(dictApplicative)(replicate(dictUnfoldable)(n)(m));
        };
      };
    };
  };
};

var none = function none(dictUnfoldable) {
  return unfoldr(dictUnfoldable)(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Unit.unit);
};

var fromMaybe = function fromMaybe(dictUnfoldable) {
  return unfoldr(dictUnfoldable)(function (b) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Function.flip(Data_Tuple.Tuple.create)(Data_Maybe.Nothing.value))(b);
  });
};

module.exports = {
  Unfoldable: Unfoldable,
  unfoldr: unfoldr,
  replicate: replicate,
  replicateA: replicateA,
  none: none,
  fromMaybe: fromMaybe,
  unfoldableArray: unfoldableArray,
  unfoldableMaybe: unfoldableMaybe
};
},{"./foreign.js":"output/Data.Unfoldable/foreign.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js","../Data.Unfoldable1/index.js":"output/Data.Unfoldable1/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Array/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Alt = require("../Control.Alt/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Category = require("../Control.Category/index.js");

var Control_Lazy = require("../Control.Lazy/index.js");

var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");

var Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");

var Data_Array_ST = require("../Data.Array.ST/index.js");

var Data_Array_ST_Iterator = require("../Data.Array.ST.Iterator/index.js");

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var Data_Unfoldable = require("../Data.Unfoldable/index.js");

var zipWithA = function zipWithA(dictApplicative) {
  return function (f) {
    return function (xs) {
      return function (ys) {
        return Data_Traversable.sequence(Data_Traversable.traversableArray)(dictApplicative)($foreign.zipWith(f)(xs)(ys));
      };
    };
  };
};

var zip = $foreign.zipWith(Data_Tuple.Tuple.create);

var updateAtIndices = function updateAtIndices(dictFoldable) {
  return function (us) {
    return function (xs) {
      return Data_Array_ST.withArray(function (res) {
        return Data_Foldable.traverse_(Control_Monad_ST_Internal.applicativeST)(dictFoldable)(function (v) {
          return Data_Array_ST.poke(v.value0)(v.value1)(res);
        })(us);
      })(xs)();
    };
  };
};

var updateAt = $foreign["_updateAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var unsafeIndex = function unsafeIndex(dictPartial) {
  return $foreign.unsafeIndexImpl;
};

var uncons = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (x) {
  return function (xs) {
    return new Data_Maybe.Just({
      head: x,
      tail: xs
    });
  };
});

var toUnfoldable = function toUnfoldable(dictUnfoldable) {
  return function (xs) {
    var len = $foreign.length(xs);

    var f = function f(i) {
      if (i < len) {
        return new Data_Maybe.Just(new Data_Tuple.Tuple(unsafeIndex()(xs)(i), i + 1 | 0));
      }

      ;

      if (Data_Boolean.otherwise) {
        return Data_Maybe.Nothing.value;
      }

      ;
      throw new Error("Failed pattern match at Data.Array (line 143, column 3 - line 145, column 26): " + [i.constructor.name]);
    };

    return Data_Unfoldable.unfoldr(dictUnfoldable)(f)(0);
  };
};

var takeEnd = function takeEnd(n) {
  return function (xs) {
    return $foreign.drop($foreign.length(xs) - n | 0)(xs);
  };
};

var tail = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (v) {
  return function (xs) {
    return new Data_Maybe.Just(xs);
  };
});

var sortBy = function sortBy(comp) {
  return function (xs) {
    var comp$prime = function comp$prime(x) {
      return function (y) {
        var v = comp(x)(y);

        if (v instanceof Data_Ordering.GT) {
          return 1;
        }

        ;

        if (v instanceof Data_Ordering.EQ) {
          return 0;
        }

        ;

        if (v instanceof Data_Ordering.LT) {
          return -1 | 0;
        }

        ;
        throw new Error("Failed pattern match at Data.Array (line 702, column 15 - line 705, column 13): " + [v.constructor.name]);
      };
    };

    return $foreign.sortImpl(comp$prime)(xs);
  };
};

var sortWith = function sortWith(dictOrd) {
  return function (f) {
    return sortBy(Data_Ord.comparing(dictOrd)(f));
  };
};

var sort = function sort(dictOrd) {
  return function (xs) {
    return sortBy(Data_Ord.compare(dictOrd))(xs);
  };
};

var singleton = function singleton(a) {
  return [a];
};

var $$null = function $$null(xs) {
  return $foreign.length(xs) === 0;
};

var nubByEq = function nubByEq(eq) {
  return function (xs) {
    return function __do() {
      var arr = Data_Array_ST.empty();
      Control_Monad_ST_Internal.foreach(xs)(function (x) {
        return function __do() {
          var e = Data_Functor.map(Control_Monad_ST_Internal.functorST)(function () {
            var $84 = Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean);
            var $85 = Data_Foldable.any(Data_Foldable.foldableArray)(Data_HeytingAlgebra.heytingAlgebraBoolean)(function (v) {
              return eq(v)(x);
            });
            return function ($86) {
              return $84($85($86));
            };
          }())(Data_Array_ST.unsafeFreeze(arr))();
          return Control_Applicative.when(Control_Monad_ST_Internal.applicativeST)(e)(Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(x)(arr)))();
        };
      })();
      return Data_Array_ST.unsafeFreeze(arr)();
    }();
  };
};

var nubEq = function nubEq(dictEq) {
  return nubByEq(Data_Eq.eq(dictEq));
};

var modifyAtIndices = function modifyAtIndices(dictFoldable) {
  return function (is) {
    return function (f) {
      return function (xs) {
        return Data_Array_ST.withArray(function (res) {
          return Data_Foldable.traverse_(Control_Monad_ST_Internal.applicativeST)(dictFoldable)(function (i) {
            return Data_Array_ST.modify(i)(f)(res);
          })(is);
        })(xs)();
      };
    };
  };
};

var mapWithIndex = function mapWithIndex(f) {
  return function (xs) {
    return $foreign.zipWith(f)($foreign.range(0)($foreign.length(xs) - 1 | 0))(xs);
  };
};

var some = function some(dictAlternative) {
  return function (dictLazy) {
    return function (v) {
      return Control_Apply.apply(dictAlternative.Applicative0().Apply0())(Data_Functor.map(dictAlternative.Plus1().Alt0().Functor0())($foreign.cons)(v))(Control_Lazy.defer(dictLazy)(function (v1) {
        return many(dictAlternative)(dictLazy)(v);
      }));
    };
  };
};

var many = function many(dictAlternative) {
  return function (dictLazy) {
    return function (v) {
      return Control_Alt.alt(dictAlternative.Plus1().Alt0())(some(dictAlternative)(dictLazy)(v))(Control_Applicative.pure(dictAlternative.Applicative0())([]));
    };
  };
};

var insertAt = $foreign["_insertAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var init = function init(xs) {
  if ($$null(xs)) {
    return Data_Maybe.Nothing.value;
  }

  ;

  if (Data_Boolean.otherwise) {
    return new Data_Maybe.Just($foreign.slice(0)($foreign.length(xs) - 1 | 0)(xs));
  }

  ;
  throw new Error("Failed pattern match at Data.Array (line 323, column 1 - line 323, column 45): " + [xs.constructor.name]);
};

var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var last = function last(xs) {
  return index(xs)($foreign.length(xs) - 1 | 0);
};

var unsnoc = function unsnoc(xs) {
  return Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
    return function (v1) {
      return {
        init: v,
        last: v1
      };
    };
  })(init(xs)))(last(xs));
};

var modifyAt = function modifyAt(i) {
  return function (f) {
    return function (xs) {
      var go = function go(x) {
        return updateAt(i)(f(x))(xs);
      };

      return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
    };
  };
};

var span = function span(p) {
  return function (arr) {
    var go = function go($copy_i) {
      var $tco_done = false;
      var $tco_result;

      function $tco_loop(i) {
        var v = index(arr)(i);

        if (v instanceof Data_Maybe.Just) {
          var $60 = p(v.value0);

          if ($60) {
            $copy_i = i + 1 | 0;
            return;
          }

          ;
          $tco_done = true;
          return new Data_Maybe.Just(i);
        }

        ;

        if (v instanceof Data_Maybe.Nothing) {
          $tco_done = true;
          return Data_Maybe.Nothing.value;
        }

        ;
        throw new Error("Failed pattern match at Data.Array (line 834, column 5 - line 836, column 25): " + [v.constructor.name]);
      }

      ;

      while (!$tco_done) {
        $tco_result = $tco_loop($copy_i);
      }

      ;
      return $tco_result;
    };

    var breakIndex = go(0);

    if (breakIndex instanceof Data_Maybe.Just && breakIndex.value0 === 0) {
      return {
        init: [],
        rest: arr
      };
    }

    ;

    if (breakIndex instanceof Data_Maybe.Just) {
      return {
        init: $foreign.slice(0)(breakIndex.value0)(arr),
        rest: $foreign.slice(breakIndex.value0)($foreign.length(arr))(arr)
      };
    }

    ;

    if (breakIndex instanceof Data_Maybe.Nothing) {
      return {
        init: arr,
        rest: []
      };
    }

    ;
    throw new Error("Failed pattern match at Data.Array (line 821, column 3 - line 827, column 30): " + [breakIndex.constructor.name]);
  };
};

var takeWhile = function takeWhile(p) {
  return function (xs) {
    return span(p)(xs).init;
  };
};

var unzip = function unzip(xs) {
  return function __do() {
    var fsts = Data_Array_ST.empty();
    var snds = Data_Array_ST.empty();
    var iter = Data_Array_ST_Iterator.iterator(function (v) {
      return index(xs)(v);
    })();
    Data_Array_ST_Iterator.iterate(iter)(function (v) {
      return function __do() {
        Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v.value0)(fsts))();
        return Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v.value1)(snds))();
      };
    })();
    var fsts$prime = Data_Array_ST.unsafeFreeze(fsts)();
    var snds$prime = Data_Array_ST.unsafeFreeze(snds)();
    return new Data_Tuple.Tuple(fsts$prime, snds$prime);
  }();
};

var head = function head(xs) {
  return index(xs)(0);
};

var nubBy = function nubBy(comp) {
  return function (xs) {
    var indexedAndSorted = sortBy(function (x) {
      return function (y) {
        return comp(Data_Tuple.snd(x))(Data_Tuple.snd(y));
      };
    })(mapWithIndex(Data_Tuple.Tuple.create)(xs));
    var v = head(indexedAndSorted);

    if (v instanceof Data_Maybe.Nothing) {
      return [];
    }

    ;

    if (v instanceof Data_Maybe.Just) {
      return Data_Functor.map(Data_Functor.functorArray)(Data_Tuple.snd)(sortWith(Data_Ord.ordInt)(Data_Tuple.fst)(function __do() {
        var result = Data_Array_ST.unsafeThaw(singleton(v.value0))();
        Control_Monad_ST_Internal.foreach(indexedAndSorted)(function (v1) {
          return function __do() {
            var lst = Data_Functor.map(Control_Monad_ST_Internal.functorST)(function () {
              var $87 = function (dictPartial) {
                var $89 = Data_Maybe.fromJust();
                return function ($90) {
                  return $89(last($90));
                };
              }();

              return function ($88) {
                return Data_Tuple.snd($87($88));
              };
            }())(Data_Array_ST.unsafeFreeze(result))();
            return Control_Applicative.when(Control_Monad_ST_Internal.applicativeST)(Data_Eq.notEq(Data_Ordering.eqOrdering)(comp(lst)(v1.value1))(Data_Ordering.EQ.value))(Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v1)(result)))();
          };
        })();
        return Data_Array_ST.unsafeFreeze(result)();
      }()));
    }

    ;
    throw new Error("Failed pattern match at Data.Array (line 903, column 17 - line 911, column 29): " + [v.constructor.name]);
  };
};

var nub = function nub(dictOrd) {
  return nubBy(Data_Ord.compare(dictOrd));
};

var groupBy = function groupBy(op) {
  return function (xs) {
    return function __do() {
      var result = Data_Array_ST.empty();
      var iter = Data_Array_ST_Iterator.iterator(function (v) {
        return index(xs)(v);
      })();
      Data_Array_ST_Iterator.iterate(iter)(function (x) {
        return Data_Functor["void"](Control_Monad_ST_Internal.functorST)(function __do() {
          var sub = Data_Array_ST.empty();
          Data_Array_ST.push(x)(sub)();
          Data_Array_ST_Iterator.pushWhile(op(x))(iter)(sub)();
          var grp = Data_Array_ST.unsafeFreeze(sub)();
          return Data_Array_ST.push(grp)(result)();
        });
      })();
      return Data_Array_ST.unsafeFreeze(result)();
    }();
  };
};

var group = function group(dictEq) {
  return function (xs) {
    return groupBy(Data_Eq.eq(dictEq))(xs);
  };
};

var group$prime = function group$prime(dictOrd) {
  var $91 = group(dictOrd.Eq0());
  var $92 = sort(dictOrd);
  return function ($93) {
    return $91($92($93));
  };
};

var fromFoldable = function fromFoldable(dictFoldable) {
  return $foreign.fromFoldableImpl(Data_Foldable.foldr(dictFoldable));
};

var foldRecM = function foldRecM(dictMonadRec) {
  return function (f) {
    return function (a) {
      return function (array) {
        var go = function go(res) {
          return function (i) {
            if (i >= $foreign.length(array)) {
              return Control_Applicative.pure(dictMonadRec.Monad0().Applicative0())(new Control_Monad_Rec_Class.Done(res));
            }

            ;

            if (Data_Boolean.otherwise) {
              return Control_Bind.bind(dictMonadRec.Monad0().Bind1())(f(res)(unsafeIndex()(array)(i)))(function (res$prime) {
                return Control_Applicative.pure(dictMonadRec.Monad0().Applicative0())(new Control_Monad_Rec_Class.Loop({
                  a: res$prime,
                  b: i + 1 | 0
                }));
              });
            }

            ;
            throw new Error("Failed pattern match at Data.Array (line 1101, column 3 - line 1105, column 42): " + [res.constructor.name, i.constructor.name]);
          };
        };

        return Control_Monad_Rec_Class.tailRecM2(dictMonadRec)(go)(a)(0);
      };
    };
  };
};

var foldM = function foldM(dictMonad) {
  return function (f) {
    return function (a) {
      return $foreign["uncons'"](function (v) {
        return Control_Applicative.pure(dictMonad.Applicative0())(a);
      })(function (b) {
        return function (bs) {
          return Control_Bind.bind(dictMonad.Bind1())(f(a)(b))(function (a$prime) {
            return foldM(dictMonad)(f)(a$prime)(bs);
          });
        };
      });
    };
  };
};

var findLastIndex = $foreign.findLastIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var insertBy = function insertBy(cmp) {
  return function (x) {
    return function (ys) {
      var i = Data_Maybe.maybe(0)(function (v) {
        return v + 1 | 0;
      })(findLastIndex(function (y) {
        return Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(x)(y))(Data_Ordering.GT.value);
      })(ys));
      return Data_Maybe.fromJust()(insertAt(i)(x)(ys));
    };
  };
};

var insert = function insert(dictOrd) {
  return insertBy(Data_Ord.compare(dictOrd));
};

var findIndex = $foreign.findIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var intersectBy = function intersectBy(eq) {
  return function (xs) {
    return function (ys) {
      return $foreign.filter(function (x) {
        return Data_Maybe.isJust(findIndex(eq(x))(ys));
      })(xs);
    };
  };
};

var intersect = function intersect(dictEq) {
  return intersectBy(Data_Eq.eq(dictEq));
};

var elemLastIndex = function elemLastIndex(dictEq) {
  return function (x) {
    return findLastIndex(function (v) {
      return Data_Eq.eq(dictEq)(v)(x);
    });
  };
};

var elemIndex = function elemIndex(dictEq) {
  return function (x) {
    return findIndex(function (v) {
      return Data_Eq.eq(dictEq)(v)(x);
    });
  };
};

var dropWhile = function dropWhile(p) {
  return function (xs) {
    return span(p)(xs).rest;
  };
};

var dropEnd = function dropEnd(n) {
  return function (xs) {
    return $foreign.take($foreign.length(xs) - n | 0)(xs);
  };
};

var deleteAt = $foreign["_deleteAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var deleteBy = function deleteBy(v) {
  return function (v1) {
    return function (v2) {
      if (v2.length === 0) {
        return [];
      }

      ;
      return Data_Maybe.maybe(v2)(function (i) {
        return Data_Maybe.fromJust()(deleteAt(i)(v2));
      })(findIndex(v(v1))(v2));
    };
  };
};

var unionBy = function unionBy(eq) {
  return function (xs) {
    return function (ys) {
      return Data_Semigroup.append(Data_Semigroup.semigroupArray)(xs)(Data_Foldable.foldl(Data_Foldable.foldableArray)(Data_Function.flip(deleteBy(eq)))(nubByEq(eq)(ys))(xs));
    };
  };
};

var union = function union(dictEq) {
  return unionBy(Data_Eq.eq(dictEq));
};

var $$delete = function $$delete(dictEq) {
  return deleteBy(Data_Eq.eq(dictEq));
};

var difference = function difference(dictEq) {
  return Data_Foldable.foldr(Data_Foldable.foldableArray)($$delete(dictEq));
};

var concatMap = Data_Function.flip(Control_Bind.bind(Control_Bind.bindArray));

var mapMaybe = function mapMaybe(f) {
  return concatMap(function () {
    var $94 = Data_Maybe.maybe([])(singleton);
    return function ($95) {
      return $94(f($95));
    };
  }());
};

var filterA = function filterA(dictApplicative) {
  return function (p) {
    var $96 = Data_Functor.map(dictApplicative.Apply0().Functor0())(mapMaybe(function (v) {
      if (v.value1) {
        return new Data_Maybe.Just(v.value0);
      }

      ;
      return Data_Maybe.Nothing.value;
    }));
    var $97 = Data_Traversable.traverse(Data_Traversable.traversableArray)(dictApplicative)(function (x) {
      return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Tuple.Tuple.create(x))(p(x));
    });
    return function ($98) {
      return $96($97($98));
    };
  };
};

var catMaybes = mapMaybe(Control_Category.identity(Control_Category.categoryFn));

var alterAt = function alterAt(i) {
  return function (f) {
    return function (xs) {
      var go = function go(x) {
        var v = f(x);

        if (v instanceof Data_Maybe.Nothing) {
          return deleteAt(i)(xs);
        }

        ;

        if (v instanceof Data_Maybe.Just) {
          return updateAt(i)(v.value0)(xs);
        }

        ;
        throw new Error("Failed pattern match at Data.Array (line 544, column 10 - line 546, column 32): " + [v.constructor.name]);
      };

      return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
    };
  };
};

module.exports = {
  fromFoldable: fromFoldable,
  toUnfoldable: toUnfoldable,
  singleton: singleton,
  some: some,
  many: many,
  "null": $$null,
  insert: insert,
  insertBy: insertBy,
  head: head,
  last: last,
  tail: tail,
  init: init,
  uncons: uncons,
  unsnoc: unsnoc,
  index: index,
  elemIndex: elemIndex,
  elemLastIndex: elemLastIndex,
  findIndex: findIndex,
  findLastIndex: findLastIndex,
  insertAt: insertAt,
  deleteAt: deleteAt,
  updateAt: updateAt,
  updateAtIndices: updateAtIndices,
  modifyAt: modifyAt,
  modifyAtIndices: modifyAtIndices,
  alterAt: alterAt,
  concatMap: concatMap,
  filterA: filterA,
  mapMaybe: mapMaybe,
  catMaybes: catMaybes,
  mapWithIndex: mapWithIndex,
  sort: sort,
  sortBy: sortBy,
  sortWith: sortWith,
  takeEnd: takeEnd,
  takeWhile: takeWhile,
  dropEnd: dropEnd,
  dropWhile: dropWhile,
  span: span,
  group: group,
  "group'": group$prime,
  groupBy: groupBy,
  nub: nub,
  nubEq: nubEq,
  nubBy: nubBy,
  nubByEq: nubByEq,
  union: union,
  unionBy: unionBy,
  "delete": $$delete,
  deleteBy: deleteBy,
  difference: difference,
  intersect: intersect,
  intersectBy: intersectBy,
  zipWithA: zipWithA,
  zip: zip,
  unzip: unzip,
  foldM: foldM,
  foldRecM: foldRecM,
  unsafeIndex: unsafeIndex,
  range: $foreign.range,
  replicate: $foreign.replicate,
  length: $foreign.length,
  cons: $foreign.cons,
  snoc: $foreign.snoc,
  reverse: $foreign.reverse,
  concat: $foreign.concat,
  filter: $foreign.filter,
  partition: $foreign.partition,
  slice: $foreign.slice,
  take: $foreign.take,
  drop: $foreign.drop,
  zipWith: $foreign.zipWith
};
},{"./foreign.js":"output/Data.Array/foreign.js","../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Control.Lazy/index.js":"output/Control.Lazy/index.js","../Control.Monad.Rec.Class/index.js":"output/Control.Monad.Rec.Class/index.js","../Control.Monad.ST.Internal/index.js":"output/Control.Monad.ST.Internal/index.js","../Data.Array.ST/index.js":"output/Data.Array.ST/index.js","../Data.Array.ST.Iterator/index.js":"output/Data.Array.ST.Iterator/index.js","../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.HeytingAlgebra/index.js":"output/Data.HeytingAlgebra/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js","../Data.Unfoldable/index.js":"output/Data.Unfoldable/index.js"}],"output/Data.DateTime.Instant/foreign.js":[function(require,module,exports) {
"use strict";

var createDateTime = function createDateTime(y, m, d, h, mi, s, ms) {
  var dateTime = new Date(Date.UTC(y, m, d, h, mi, s, ms));

  if (y >= 0 && y < 100) {
    dateTime.setUTCFullYear(y);
  }

  return dateTime;
};

exports.fromDateTimeImpl = function (y, mo, d, h, mi, s, ms) {
  return createDateTime(y, mo - 1, d, h, mi, s, ms).getTime();
};

exports.toDateTimeImpl = function (ctor) {
  return function (instant) {
    var dt = new Date(instant);
    return ctor(dt.getUTCFullYear())(dt.getUTCMonth() + 1)(dt.getUTCDate())(dt.getUTCHours())(dt.getUTCMinutes())(dt.getUTCSeconds())(dt.getUTCMilliseconds());
  };
};
},{}],"output/Data.Date/foreign.js":[function(require,module,exports) {
"use strict";

var createDate = function createDate(y, m, d) {
  var date = new Date(Date.UTC(y, m, d));

  if (y >= 0 && y < 100) {
    date.setUTCFullYear(y);
  }

  return date;
};

exports.canonicalDateImpl = function (ctor, y, m, d) {
  var date = createDate(y, m - 1, d);
  return ctor(date.getUTCFullYear())(date.getUTCMonth() + 1)(date.getUTCDate());
};

exports.calcWeekday = function (y, m, d) {
  return createDate(y, m - 1, d).getUTCDay();
};

exports.calcDiff = function (y1, m1, d1, y2, m2, d2) {
  var dt1 = createDate(y1, m1 - 1, d1);
  var dt2 = createDate(y2, m2 - 1, d2);
  return dt1.getTime() - dt2.getTime();
};
},{}],"output/Data.Enum/foreign.js":[function(require,module,exports) {
"use strict";

exports.toCharCode = function (c) {
  return c.charCodeAt(0);
};

exports.fromCharCode = function (c) {
  return String.fromCharCode(c);
};
},{}],"output/Data.Enum/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_MonadZero = require("../Control.MonadZero/index.js");

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Either = require("../Data.Either/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var Data_Unfoldable = require("../Data.Unfoldable/index.js");

var Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Cardinality = function Cardinality(x) {
  return x;
};

var Enum = function Enum(Ord0, pred, succ) {
  this.Ord0 = Ord0;
  this.pred = pred;
  this.succ = succ;
};

var BoundedEnum = function BoundedEnum(Bounded0, Enum1, cardinality, fromEnum, toEnum) {
  this.Bounded0 = Bounded0;
  this.Enum1 = Enum1;
  this.cardinality = cardinality;
  this.fromEnum = fromEnum;
  this.toEnum = toEnum;
};

var toEnum = function toEnum(dict) {
  return dict.toEnum;
};

var succ = function succ(dict) {
  return dict.succ;
};

var upFromIncluding = function upFromIncluding(dictEnum) {
  return function (dictUnfoldable1) {
    return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(Control_Apply.apply(Control_Apply.applyFn)(Data_Tuple.Tuple.create)(succ(dictEnum)));
  };
};

var showCardinality = new Data_Show.Show(function (v) {
  return "(Cardinality " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});

var pred = function pred(dict) {
  return dict.pred;
};

var ordCardinality = Data_Ord.ordInt;
var newtypeCardinality = new Data_Newtype.Newtype(function (n) {
  return n;
}, Cardinality);

var fromEnum = function fromEnum(dict) {
  return dict.fromEnum;
};

var toEnumWithDefaults = function toEnumWithDefaults(dictBoundedEnum) {
  return function (low) {
    return function (high) {
      return function (x) {
        var v = toEnum(dictBoundedEnum)(x);

        if (v instanceof Data_Maybe.Just) {
          return v.value0;
        }

        ;

        if (v instanceof Data_Maybe.Nothing) {
          var $54 = x < fromEnum(dictBoundedEnum)(Data_Bounded.bottom(dictBoundedEnum.Bounded0()));

          if ($54) {
            return low;
          }

          ;
          return high;
        }

        ;
        throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
      };
    };
  };
};

var eqCardinality = Data_Eq.eqInt;
var enumUnit = new Enum(function () {
  return Data_Ord.ordUnit;
}, Data_Function["const"](Data_Maybe.Nothing.value), Data_Function["const"](Data_Maybe.Nothing.value));

var enumTuple = function enumTuple(dictEnum) {
  return function (dictBoundedEnum) {
    return new Enum(function () {
      return Data_Tuple.ordTuple(dictEnum.Ord0())(dictBoundedEnum.Enum1().Ord0());
    }, function (v) {
      return Data_Maybe.maybe(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Function.flip(Data_Tuple.Tuple.create)(Data_Bounded.top(dictBoundedEnum.Bounded0())))(pred(dictEnum)(v.value0)))(function () {
        var $96 = Data_Tuple.Tuple.create(v.value0);
        return function ($97) {
          return Data_Maybe.Just.create($96($97));
        };
      }())(pred(dictBoundedEnum.Enum1())(v.value1));
    }, function (v) {
      return Data_Maybe.maybe(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Function.flip(Data_Tuple.Tuple.create)(Data_Bounded.bottom(dictBoundedEnum.Bounded0())))(succ(dictEnum)(v.value0)))(function () {
        var $98 = Data_Tuple.Tuple.create(v.value0);
        return function ($99) {
          return Data_Maybe.Just.create($98($99));
        };
      }())(succ(dictBoundedEnum.Enum1())(v.value1));
    });
  };
};

var enumOrdering = new Enum(function () {
  return Data_Ord.ordOrdering;
}, function (v) {
  if (v instanceof Data_Ordering.LT) {
    return Data_Maybe.Nothing.value;
  }

  ;

  if (v instanceof Data_Ordering.EQ) {
    return new Data_Maybe.Just(Data_Ordering.LT.value);
  }

  ;

  if (v instanceof Data_Ordering.GT) {
    return new Data_Maybe.Just(Data_Ordering.EQ.value);
  }

  ;
  throw new Error("Failed pattern match at Data.Enum (line 72, column 1 - line 78, column 20): " + [v.constructor.name]);
}, function (v) {
  if (v instanceof Data_Ordering.LT) {
    return new Data_Maybe.Just(Data_Ordering.EQ.value);
  }

  ;

  if (v instanceof Data_Ordering.EQ) {
    return new Data_Maybe.Just(Data_Ordering.GT.value);
  }

  ;

  if (v instanceof Data_Ordering.GT) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Enum (line 72, column 1 - line 78, column 20): " + [v.constructor.name]);
});

var enumMaybe = function enumMaybe(dictBoundedEnum) {
  return new Enum(function () {
    return Data_Maybe.ordMaybe(dictBoundedEnum.Enum1().Ord0());
  }, function (v) {
    if (v instanceof Data_Maybe.Nothing) {
      return Data_Maybe.Nothing.value;
    }

    ;

    if (v instanceof Data_Maybe.Just) {
      return new Data_Maybe.Just(pred(dictBoundedEnum.Enum1())(v.value0));
    }

    ;
    throw new Error("Failed pattern match at Data.Enum (line 80, column 1 - line 84, column 32): " + [v.constructor.name]);
  }, function (v) {
    if (v instanceof Data_Maybe.Nothing) {
      return new Data_Maybe.Just(new Data_Maybe.Just(Data_Bounded.bottom(dictBoundedEnum.Bounded0())));
    }

    ;

    if (v instanceof Data_Maybe.Just) {
      return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Maybe.Just.create)(succ(dictBoundedEnum.Enum1())(v.value0));
    }

    ;
    throw new Error("Failed pattern match at Data.Enum (line 80, column 1 - line 84, column 32): " + [v.constructor.name]);
  });
};

var enumInt = new Enum(function () {
  return Data_Ord.ordInt;
}, function (n) {
  var $67 = n > Data_Bounded.bottom(Data_Bounded.boundedInt);

  if ($67) {
    return new Data_Maybe.Just(n - 1 | 0);
  }

  ;
  return Data_Maybe.Nothing.value;
}, function (n) {
  var $68 = n < Data_Bounded.top(Data_Bounded.boundedInt);

  if ($68) {
    return new Data_Maybe.Just(n + 1 | 0);
  }

  ;
  return Data_Maybe.Nothing.value;
});

var enumFromTo = function enumFromTo(dictEnum) {
  return function (dictUnfoldable1) {
    var go = function go(step) {
      return function (op) {
        return function (to) {
          return function (a) {
            return new Data_Tuple.Tuple(a, Control_Bind.bind(Data_Maybe.bindMaybe)(step(a))(function (a$prime) {
              return Data_Functor.voidLeft(Data_Maybe.functorMaybe)(Control_MonadZero.guard(Data_Maybe.monadZeroMaybe)(op(a$prime)(to)))(a$prime);
            }));
          };
        };
      };
    };

    return function (v) {
      return function (v1) {
        if (Data_Eq.eq(dictEnum.Ord0().Eq0())(v)(v1)) {
          return Data_Unfoldable1.singleton(dictUnfoldable1)(v);
        }

        ;

        if (Data_Ord.lessThan(dictEnum.Ord0())(v)(v1)) {
          return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(go(succ(dictEnum))(Data_Ord.lessThanOrEq(dictEnum.Ord0()))(v1))(v);
        }

        ;

        if (Data_Boolean.otherwise) {
          return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(go(pred(dictEnum))(Data_Ord.greaterThanOrEq(dictEnum.Ord0()))(v1))(v);
        }

        ;
        throw new Error("Failed pattern match at Data.Enum (line 183, column 14 - line 187, column 51): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
};

var enumFromThenTo = function enumFromThenTo(dictUnfoldable) {
  return function (dictFunctor) {
    return function (dictBoundedEnum) {
      var go = function go(step) {
        return function (to) {
          return function (e) {
            if (e <= to) {
              return new Data_Maybe.Just(new Data_Tuple.Tuple(e, e + step | 0));
            }

            ;

            if (Data_Boolean.otherwise) {
              return Data_Maybe.Nothing.value;
            }

            ;
            throw new Error("Failed pattern match at Data.Enum (line 214, column 5 - line 216, column 28): " + [step.constructor.name, to.constructor.name, e.constructor.name]);
          };
        };
      };

      return function (a) {
        return function (b) {
          return function (c) {
            var c$prime = fromEnum(dictBoundedEnum)(c);
            var b$prime = fromEnum(dictBoundedEnum)(b);
            var a$prime = fromEnum(dictBoundedEnum)(a);
            return Data_Functor.map(dictFunctor)(function () {
              var $100 = Data_Maybe.fromJust();
              var $101 = toEnum(dictBoundedEnum);
              return function ($102) {
                return $100($101($102));
              };
            }())(Data_Unfoldable.unfoldr(dictUnfoldable)(go(b$prime - a$prime | 0)(c$prime))(a$prime));
          };
        };
      };
    };
  };
};

var enumEither = function enumEither(dictBoundedEnum) {
  return function (dictBoundedEnum1) {
    return new Enum(function () {
      return Data_Either.ordEither(dictBoundedEnum.Enum1().Ord0())(dictBoundedEnum1.Enum1().Ord0());
    }, function (v) {
      if (v instanceof Data_Either.Left) {
        return Data_Maybe.maybe(Data_Maybe.Nothing.value)(function ($103) {
          return Data_Maybe.Just.create(Data_Either.Left.create($103));
        })(pred(dictBoundedEnum.Enum1())(v.value0));
      }

      ;

      if (v instanceof Data_Either.Right) {
        return Data_Maybe.maybe(new Data_Maybe.Just(new Data_Either.Left(Data_Bounded.top(dictBoundedEnum.Bounded0()))))(function ($104) {
          return Data_Maybe.Just.create(Data_Either.Right.create($104));
        })(pred(dictBoundedEnum1.Enum1())(v.value0));
      }

      ;
      throw new Error("Failed pattern match at Data.Enum (line 86, column 1 - line 90, column 69): " + [v.constructor.name]);
    }, function (v) {
      if (v instanceof Data_Either.Left) {
        return Data_Maybe.maybe(new Data_Maybe.Just(new Data_Either.Right(Data_Bounded.bottom(dictBoundedEnum1.Bounded0()))))(function ($105) {
          return Data_Maybe.Just.create(Data_Either.Left.create($105));
        })(succ(dictBoundedEnum.Enum1())(v.value0));
      }

      ;

      if (v instanceof Data_Either.Right) {
        return Data_Maybe.maybe(Data_Maybe.Nothing.value)(function ($106) {
          return Data_Maybe.Just.create(Data_Either.Right.create($106));
        })(succ(dictBoundedEnum1.Enum1())(v.value0));
      }

      ;
      throw new Error("Failed pattern match at Data.Enum (line 86, column 1 - line 90, column 69): " + [v.constructor.name]);
    });
  };
};

var enumBoolean = new Enum(function () {
  return Data_Ord.ordBoolean;
}, function (v) {
  if (v) {
    return new Data_Maybe.Just(false);
  }

  ;
  return Data_Maybe.Nothing.value;
}, function (v) {
  if (!v) {
    return new Data_Maybe.Just(true);
  }

  ;
  return Data_Maybe.Nothing.value;
});

var downFromIncluding = function downFromIncluding(dictEnum) {
  return function (dictUnfoldable1) {
    return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(Control_Apply.apply(Control_Apply.applyFn)(Data_Tuple.Tuple.create)(pred(dictEnum)));
  };
};

var diag = function diag(a) {
  return new Data_Tuple.Tuple(a, a);
};

var downFrom = function downFrom(dictEnum) {
  return function (dictUnfoldable) {
    return Data_Unfoldable.unfoldr(dictUnfoldable)(function () {
      var $107 = Data_Functor.map(Data_Maybe.functorMaybe)(diag);
      var $108 = pred(dictEnum);
      return function ($109) {
        return $107($108($109));
      };
    }());
  };
};

var upFrom = function upFrom(dictEnum) {
  return function (dictUnfoldable) {
    return Data_Unfoldable.unfoldr(dictUnfoldable)(function () {
      var $110 = Data_Functor.map(Data_Maybe.functorMaybe)(diag);
      var $111 = succ(dictEnum);
      return function ($112) {
        return $110($111($112));
      };
    }());
  };
};

var defaultToEnum = function defaultToEnum(dictBounded) {
  return function (dictEnum) {
    return function (i$prime) {
      var go = function go($copy_i) {
        return function ($copy_x) {
          var $tco_var_i = $copy_i;
          var $tco_done = false;
          var $tco_result;

          function $tco_loop(i, x) {
            var $82 = i === 0;

            if ($82) {
              $tco_done = true;
              return new Data_Maybe.Just(x);
            }

            ;
            var v = succ(dictEnum)(x);

            if (v instanceof Data_Maybe.Just) {
              $tco_var_i = i - 1 | 0;
              $copy_x = v.value0;
              return;
            }

            ;

            if (v instanceof Data_Maybe.Nothing) {
              $tco_done = true;
              return Data_Maybe.Nothing.value;
            }

            ;
            throw new Error("Failed pattern match at Data.Enum (line 293, column 12 - line 295, column 33): " + [v.constructor.name]);
          }

          ;

          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_i, $copy_x);
          }

          ;
          return $tco_result;
        };
      };

      var $85 = i$prime < 0;

      if ($85) {
        return Data_Maybe.Nothing.value;
      }

      ;
      return go(i$prime)(Data_Bounded.bottom(dictBounded));
    };
  };
};

var defaultSucc = function defaultSucc(toEnum$prime) {
  return function (fromEnum$prime) {
    return function (a) {
      return toEnum$prime(fromEnum$prime(a) + 1 | 0);
    };
  };
};

var defaultPred = function defaultPred(toEnum$prime) {
  return function (fromEnum$prime) {
    return function (a) {
      return toEnum$prime(fromEnum$prime(a) - 1 | 0);
    };
  };
};

var defaultFromEnum = function defaultFromEnum(dictEnum) {
  var go = function go($copy_i) {
    return function ($copy_x) {
      var $tco_var_i = $copy_i;
      var $tco_done = false;
      var $tco_result;

      function $tco_loop(i, x) {
        var v = pred(dictEnum)(x);

        if (v instanceof Data_Maybe.Just) {
          $tco_var_i = i + 1 | 0;
          $copy_x = v.value0;
          return;
        }

        ;

        if (v instanceof Data_Maybe.Nothing) {
          $tco_done = true;
          return i;
        }

        ;
        throw new Error("Failed pattern match at Data.Enum (line 306, column 5 - line 308, column 19): " + [v.constructor.name]);
      }

      ;

      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_i, $copy_x);
      }

      ;
      return $tco_result;
    };
  };

  return go(0);
};

var defaultCardinality = function defaultCardinality(dictBounded) {
  return function (dictEnum) {
    var go = function go($copy_i) {
      return function ($copy_x) {
        var $tco_var_i = $copy_i;
        var $tco_done = false;
        var $tco_result;

        function $tco_loop(i, x) {
          var v = succ(dictEnum)(x);

          if (v instanceof Data_Maybe.Just) {
            $tco_var_i = i + 1 | 0;
            $copy_x = v.value0;
            return;
          }

          ;

          if (v instanceof Data_Maybe.Nothing) {
            $tco_done = true;
            return i;
          }

          ;
          throw new Error("Failed pattern match at Data.Enum (line 273, column 5 - line 275, column 19): " + [v.constructor.name]);
        }

        ;

        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_i, $copy_x);
        }

        ;
        return $tco_result;
      };
    };

    return Cardinality(go(1)(Data_Bounded.bottom(dictBounded)));
  };
};

var charToEnum = function charToEnum(v) {
  if (v >= Data_Bounded.bottom(Data_Bounded.boundedInt) && v <= Data_Bounded.top(Data_Bounded.boundedInt)) {
    return new Data_Maybe.Just($foreign.fromCharCode(v));
  }

  ;
  return Data_Maybe.Nothing.value;
};

var enumChar = new Enum(function () {
  return Data_Ord.ordChar;
}, defaultPred(charToEnum)($foreign.toCharCode), defaultSucc(charToEnum)($foreign.toCharCode));

var cardinality = function cardinality(dict) {
  return dict.cardinality;
};

var boundedEnumUnit = new BoundedEnum(function () {
  return Data_Bounded.boundedUnit;
}, function () {
  return enumUnit;
}, 1, Data_Function["const"](0), function (v) {
  if (v === 0) {
    return new Data_Maybe.Just(Data_Unit.unit);
  }

  ;
  return Data_Maybe.Nothing.value;
});
var boundedEnumOrdering = new BoundedEnum(function () {
  return Data_Bounded.boundedOrdering;
}, function () {
  return enumOrdering;
}, 3, function (v) {
  if (v instanceof Data_Ordering.LT) {
    return 0;
  }

  ;

  if (v instanceof Data_Ordering.EQ) {
    return 1;
  }

  ;

  if (v instanceof Data_Ordering.GT) {
    return 2;
  }

  ;
  throw new Error("Failed pattern match at Data.Enum (line 137, column 1 - line 145, column 18): " + [v.constructor.name]);
}, function (v) {
  if (v === 0) {
    return new Data_Maybe.Just(Data_Ordering.LT.value);
  }

  ;

  if (v === 1) {
    return new Data_Maybe.Just(Data_Ordering.EQ.value);
  }

  ;

  if (v === 2) {
    return new Data_Maybe.Just(Data_Ordering.GT.value);
  }

  ;
  return Data_Maybe.Nothing.value;
});
var boundedEnumChar = new BoundedEnum(function () {
  return Data_Bounded.boundedChar;
}, function () {
  return enumChar;
}, $foreign.toCharCode(Data_Bounded.top(Data_Bounded.boundedChar)) - $foreign.toCharCode(Data_Bounded.bottom(Data_Bounded.boundedChar)) | 0, $foreign.toCharCode, charToEnum);
var boundedEnumBoolean = new BoundedEnum(function () {
  return Data_Bounded.boundedBoolean;
}, function () {
  return enumBoolean;
}, 2, function (v) {
  if (!v) {
    return 0;
  }

  ;

  if (v) {
    return 1;
  }

  ;
  throw new Error("Failed pattern match at Data.Enum (line 118, column 1 - line 124, column 20): " + [v.constructor.name]);
}, function (v) {
  if (v === 0) {
    return new Data_Maybe.Just(false);
  }

  ;

  if (v === 1) {
    return new Data_Maybe.Just(true);
  }

  ;
  return Data_Maybe.Nothing.value;
});
module.exports = {
  Enum: Enum,
  succ: succ,
  pred: pred,
  BoundedEnum: BoundedEnum,
  cardinality: cardinality,
  toEnum: toEnum,
  fromEnum: fromEnum,
  toEnumWithDefaults: toEnumWithDefaults,
  Cardinality: Cardinality,
  enumFromTo: enumFromTo,
  enumFromThenTo: enumFromThenTo,
  upFrom: upFrom,
  upFromIncluding: upFromIncluding,
  downFrom: downFrom,
  downFromIncluding: downFromIncluding,
  defaultSucc: defaultSucc,
  defaultPred: defaultPred,
  defaultCardinality: defaultCardinality,
  defaultToEnum: defaultToEnum,
  defaultFromEnum: defaultFromEnum,
  enumBoolean: enumBoolean,
  enumInt: enumInt,
  enumChar: enumChar,
  enumUnit: enumUnit,
  enumOrdering: enumOrdering,
  enumMaybe: enumMaybe,
  enumEither: enumEither,
  enumTuple: enumTuple,
  boundedEnumBoolean: boundedEnumBoolean,
  boundedEnumChar: boundedEnumChar,
  boundedEnumUnit: boundedEnumUnit,
  boundedEnumOrdering: boundedEnumOrdering,
  newtypeCardinality: newtypeCardinality,
  eqCardinality: eqCardinality,
  ordCardinality: ordCardinality,
  showCardinality: showCardinality
};
},{"./foreign.js":"output/Data.Enum/foreign.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.MonadZero/index.js":"output/Control.MonadZero/index.js","../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Either/index.js":"output/Data.Either/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js","../Data.Unfoldable/index.js":"output/Data.Unfoldable/index.js","../Data.Unfoldable1/index.js":"output/Data.Unfoldable1/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Data.Date.Component/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Enum = require("../Data.Enum/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Show = require("../Data.Show/index.js");

var Year = function Year(x) {
  return x;
};

var Monday = function () {
  function Monday() {}

  ;
  Monday.value = new Monday();
  return Monday;
}();

var Tuesday = function () {
  function Tuesday() {}

  ;
  Tuesday.value = new Tuesday();
  return Tuesday;
}();

var Wednesday = function () {
  function Wednesday() {}

  ;
  Wednesday.value = new Wednesday();
  return Wednesday;
}();

var Thursday = function () {
  function Thursday() {}

  ;
  Thursday.value = new Thursday();
  return Thursday;
}();

var Friday = function () {
  function Friday() {}

  ;
  Friday.value = new Friday();
  return Friday;
}();

var Saturday = function () {
  function Saturday() {}

  ;
  Saturday.value = new Saturday();
  return Saturday;
}();

var Sunday = function () {
  function Sunday() {}

  ;
  Sunday.value = new Sunday();
  return Sunday;
}();

var January = function () {
  function January() {}

  ;
  January.value = new January();
  return January;
}();

var February = function () {
  function February() {}

  ;
  February.value = new February();
  return February;
}();

var March = function () {
  function March() {}

  ;
  March.value = new March();
  return March;
}();

var April = function () {
  function April() {}

  ;
  April.value = new April();
  return April;
}();

var May = function () {
  function May() {}

  ;
  May.value = new May();
  return May;
}();

var June = function () {
  function June() {}

  ;
  June.value = new June();
  return June;
}();

var July = function () {
  function July() {}

  ;
  July.value = new July();
  return July;
}();

var August = function () {
  function August() {}

  ;
  August.value = new August();
  return August;
}();

var September = function () {
  function September() {}

  ;
  September.value = new September();
  return September;
}();

var October = function () {
  function October() {}

  ;
  October.value = new October();
  return October;
}();

var November = function () {
  function November() {}

  ;
  November.value = new November();
  return November;
}();

var December = function () {
  function December() {}

  ;
  December.value = new December();
  return December;
}();

var Day = function Day(x) {
  return x;
};

var showYear = new Data_Show.Show(function (v) {
  return "(Year " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
var showWeekday = new Data_Show.Show(function (v) {
  if (v instanceof Monday) {
    return "Monday";
  }

  ;

  if (v instanceof Tuesday) {
    return "Tuesday";
  }

  ;

  if (v instanceof Wednesday) {
    return "Wednesday";
  }

  ;

  if (v instanceof Thursday) {
    return "Thursday";
  }

  ;

  if (v instanceof Friday) {
    return "Friday";
  }

  ;

  if (v instanceof Saturday) {
    return "Saturday";
  }

  ;

  if (v instanceof Sunday) {
    return "Sunday";
  }

  ;
  throw new Error("Failed pattern match at Data.Date.Component (line 184, column 1 - line 191, column 25): " + [v.constructor.name]);
});
var showMonth = new Data_Show.Show(function (v) {
  if (v instanceof January) {
    return "January";
  }

  ;

  if (v instanceof February) {
    return "February";
  }

  ;

  if (v instanceof March) {
    return "March";
  }

  ;

  if (v instanceof April) {
    return "April";
  }

  ;

  if (v instanceof May) {
    return "May";
  }

  ;

  if (v instanceof June) {
    return "June";
  }

  ;

  if (v instanceof July) {
    return "July";
  }

  ;

  if (v instanceof August) {
    return "August";
  }

  ;

  if (v instanceof September) {
    return "September";
  }

  ;

  if (v instanceof October) {
    return "October";
  }

  ;

  if (v instanceof November) {
    return "November";
  }

  ;

  if (v instanceof December) {
    return "December";
  }

  ;
  throw new Error("Failed pattern match at Data.Date.Component (line 101, column 1 - line 113, column 29): " + [v.constructor.name]);
});
var showDay = new Data_Show.Show(function (v) {
  return "(Day " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
var ordYear = Data_Ord.ordInt;
var ordDay = Data_Ord.ordInt;
var eqYear = Data_Eq.eqInt;
var eqWeekday = new Data_Eq.Eq(function (x) {
  return function (y) {
    if (x instanceof Monday && y instanceof Monday) {
      return true;
    }

    ;

    if (x instanceof Tuesday && y instanceof Tuesday) {
      return true;
    }

    ;

    if (x instanceof Wednesday && y instanceof Wednesday) {
      return true;
    }

    ;

    if (x instanceof Thursday && y instanceof Thursday) {
      return true;
    }

    ;

    if (x instanceof Friday && y instanceof Friday) {
      return true;
    }

    ;

    if (x instanceof Saturday && y instanceof Saturday) {
      return true;
    }

    ;

    if (x instanceof Sunday && y instanceof Sunday) {
      return true;
    }

    ;
    return false;
  };
});
var ordWeekday = new Data_Ord.Ord(function () {
  return eqWeekday;
}, function (x) {
  return function (y) {
    if (x instanceof Monday && y instanceof Monday) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof Monday) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof Monday) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof Tuesday && y instanceof Tuesday) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof Tuesday) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof Tuesday) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof Wednesday && y instanceof Wednesday) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof Wednesday) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof Wednesday) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof Thursday && y instanceof Thursday) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof Thursday) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof Thursday) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof Friday && y instanceof Friday) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof Friday) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof Friday) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof Saturday && y instanceof Saturday) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof Saturday) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof Saturday) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof Sunday && y instanceof Sunday) {
      return Data_Ordering.EQ.value;
    }

    ;
    throw new Error("Failed pattern match at Data.Date.Component (line 154, column 1 - line 154, column 42): " + [x.constructor.name, y.constructor.name]);
  };
});
var eqMonth = new Data_Eq.Eq(function (x) {
  return function (y) {
    if (x instanceof January && y instanceof January) {
      return true;
    }

    ;

    if (x instanceof February && y instanceof February) {
      return true;
    }

    ;

    if (x instanceof March && y instanceof March) {
      return true;
    }

    ;

    if (x instanceof April && y instanceof April) {
      return true;
    }

    ;

    if (x instanceof May && y instanceof May) {
      return true;
    }

    ;

    if (x instanceof June && y instanceof June) {
      return true;
    }

    ;

    if (x instanceof July && y instanceof July) {
      return true;
    }

    ;

    if (x instanceof August && y instanceof August) {
      return true;
    }

    ;

    if (x instanceof September && y instanceof September) {
      return true;
    }

    ;

    if (x instanceof October && y instanceof October) {
      return true;
    }

    ;

    if (x instanceof November && y instanceof November) {
      return true;
    }

    ;

    if (x instanceof December && y instanceof December) {
      return true;
    }

    ;
    return false;
  };
});
var ordMonth = new Data_Ord.Ord(function () {
  return eqMonth;
}, function (x) {
  return function (y) {
    if (x instanceof January && y instanceof January) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof January) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof January) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof February && y instanceof February) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof February) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof February) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof March && y instanceof March) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof March) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof March) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof April && y instanceof April) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof April) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof April) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof May && y instanceof May) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof May) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof May) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof June && y instanceof June) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof June) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof June) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof July && y instanceof July) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof July) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof July) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof August && y instanceof August) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof August) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof August) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof September && y instanceof September) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof September) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof September) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof October && y instanceof October) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof October) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof October) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof November && y instanceof November) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof November) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof November) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof December && y instanceof December) {
      return Data_Ordering.EQ.value;
    }

    ;
    throw new Error("Failed pattern match at Data.Date.Component (line 61, column 1 - line 61, column 38): " + [x.constructor.name, y.constructor.name]);
  };
});
var eqDay = Data_Eq.eqInt;
var boundedYear = new Data_Bounded.Bounded(function () {
  return ordYear;
}, -271820 | 0, 275759);
var boundedWeekday = new Data_Bounded.Bounded(function () {
  return ordWeekday;
}, Monday.value, Sunday.value);
var boundedMonth = new Data_Bounded.Bounded(function () {
  return ordMonth;
}, January.value, December.value);
var boundedEnumYear = new Data_Enum.BoundedEnum(function () {
  return boundedYear;
}, function () {
  return enumYear;
}, 547580, function (v) {
  return v;
}, function (n) {
  if (n >= (-271820 | 0) && n <= 275759) {
    return new Data_Maybe.Just(n);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Date.Component (line 35, column 1 - line 40, column 24): " + [n.constructor.name]);
});
var enumYear = new Data_Enum.Enum(function () {
  return ordYear;
}, function () {
  var $46 = Data_Enum.toEnum(boundedEnumYear);
  var $47 = Data_Enum.fromEnum(boundedEnumYear);
  return function ($48) {
    return $46(function (v) {
      return v - 1 | 0;
    }($47($48)));
  };
}(), function () {
  var $49 = Data_Enum.toEnum(boundedEnumYear);
  var $50 = Data_Enum.fromEnum(boundedEnumYear);
  return function ($51) {
    return $49(function (v) {
      return v + 1 | 0;
    }($50($51)));
  };
}());
var boundedEnumWeekday = new Data_Enum.BoundedEnum(function () {
  return boundedWeekday;
}, function () {
  return enumWeekday;
}, 7, function (v) {
  if (v instanceof Monday) {
    return 1;
  }

  ;

  if (v instanceof Tuesday) {
    return 2;
  }

  ;

  if (v instanceof Wednesday) {
    return 3;
  }

  ;

  if (v instanceof Thursday) {
    return 4;
  }

  ;

  if (v instanceof Friday) {
    return 5;
  }

  ;

  if (v instanceof Saturday) {
    return 6;
  }

  ;

  if (v instanceof Sunday) {
    return 7;
  }

  ;
  throw new Error("Failed pattern match at Data.Date.Component (line 175, column 14 - line 182, column 16): " + [v.constructor.name]);
}, function (v) {
  if (v === 1) {
    return new Data_Maybe.Just(Monday.value);
  }

  ;

  if (v === 2) {
    return new Data_Maybe.Just(Tuesday.value);
  }

  ;

  if (v === 3) {
    return new Data_Maybe.Just(Wednesday.value);
  }

  ;

  if (v === 4) {
    return new Data_Maybe.Just(Thursday.value);
  }

  ;

  if (v === 5) {
    return new Data_Maybe.Just(Friday.value);
  }

  ;

  if (v === 6) {
    return new Data_Maybe.Just(Saturday.value);
  }

  ;

  if (v === 7) {
    return new Data_Maybe.Just(Sunday.value);
  }

  ;
  return Data_Maybe.Nothing.value;
});
var enumWeekday = new Data_Enum.Enum(function () {
  return ordWeekday;
}, function () {
  var $52 = Data_Enum.toEnum(boundedEnumWeekday);
  var $53 = Data_Enum.fromEnum(boundedEnumWeekday);
  return function ($54) {
    return $52(function (v) {
      return v - 1 | 0;
    }($53($54)));
  };
}(), function () {
  var $55 = Data_Enum.toEnum(boundedEnumWeekday);
  var $56 = Data_Enum.fromEnum(boundedEnumWeekday);
  return function ($57) {
    return $55(function (v) {
      return v + 1 | 0;
    }($56($57)));
  };
}());
var boundedEnumMonth = new Data_Enum.BoundedEnum(function () {
  return boundedMonth;
}, function () {
  return enumMonth;
}, 12, function (v) {
  if (v instanceof January) {
    return 1;
  }

  ;

  if (v instanceof February) {
    return 2;
  }

  ;

  if (v instanceof March) {
    return 3;
  }

  ;

  if (v instanceof April) {
    return 4;
  }

  ;

  if (v instanceof May) {
    return 5;
  }

  ;

  if (v instanceof June) {
    return 6;
  }

  ;

  if (v instanceof July) {
    return 7;
  }

  ;

  if (v instanceof August) {
    return 8;
  }

  ;

  if (v instanceof September) {
    return 9;
  }

  ;

  if (v instanceof October) {
    return 10;
  }

  ;

  if (v instanceof November) {
    return 11;
  }

  ;

  if (v instanceof December) {
    return 12;
  }

  ;
  throw new Error("Failed pattern match at Data.Date.Component (line 87, column 14 - line 99, column 19): " + [v.constructor.name]);
}, function (v) {
  if (v === 1) {
    return new Data_Maybe.Just(January.value);
  }

  ;

  if (v === 2) {
    return new Data_Maybe.Just(February.value);
  }

  ;

  if (v === 3) {
    return new Data_Maybe.Just(March.value);
  }

  ;

  if (v === 4) {
    return new Data_Maybe.Just(April.value);
  }

  ;

  if (v === 5) {
    return new Data_Maybe.Just(May.value);
  }

  ;

  if (v === 6) {
    return new Data_Maybe.Just(June.value);
  }

  ;

  if (v === 7) {
    return new Data_Maybe.Just(July.value);
  }

  ;

  if (v === 8) {
    return new Data_Maybe.Just(August.value);
  }

  ;

  if (v === 9) {
    return new Data_Maybe.Just(September.value);
  }

  ;

  if (v === 10) {
    return new Data_Maybe.Just(October.value);
  }

  ;

  if (v === 11) {
    return new Data_Maybe.Just(November.value);
  }

  ;

  if (v === 12) {
    return new Data_Maybe.Just(December.value);
  }

  ;
  return Data_Maybe.Nothing.value;
});
var enumMonth = new Data_Enum.Enum(function () {
  return ordMonth;
}, function () {
  var $58 = Data_Enum.toEnum(boundedEnumMonth);
  var $59 = Data_Enum.fromEnum(boundedEnumMonth);
  return function ($60) {
    return $58(function (v) {
      return v - 1 | 0;
    }($59($60)));
  };
}(), function () {
  var $61 = Data_Enum.toEnum(boundedEnumMonth);
  var $62 = Data_Enum.fromEnum(boundedEnumMonth);
  return function ($63) {
    return $61(function (v) {
      return v + 1 | 0;
    }($62($63)));
  };
}());
var boundedDay = new Data_Bounded.Bounded(function () {
  return ordDay;
}, 1, 31);
var boundedEnumDay = new Data_Enum.BoundedEnum(function () {
  return boundedDay;
}, function () {
  return enumDay;
}, 31, function (v) {
  return v;
}, function (n) {
  if (n >= 1 && n <= 31) {
    return new Data_Maybe.Just(n);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Date.Component (line 133, column 1 - line 138, column 23): " + [n.constructor.name]);
});
var enumDay = new Data_Enum.Enum(function () {
  return ordDay;
}, function () {
  var $64 = Data_Enum.toEnum(boundedEnumDay);
  var $65 = Data_Enum.fromEnum(boundedEnumDay);
  return function ($66) {
    return $64(function (v) {
      return v - 1 | 0;
    }($65($66)));
  };
}(), function () {
  var $67 = Data_Enum.toEnum(boundedEnumDay);
  var $68 = Data_Enum.fromEnum(boundedEnumDay);
  return function ($69) {
    return $67(function (v) {
      return v + 1 | 0;
    }($68($69)));
  };
}());
module.exports = {
  January: January,
  February: February,
  March: March,
  April: April,
  May: May,
  June: June,
  July: July,
  August: August,
  September: September,
  October: October,
  November: November,
  December: December,
  Monday: Monday,
  Tuesday: Tuesday,
  Wednesday: Wednesday,
  Thursday: Thursday,
  Friday: Friday,
  Saturday: Saturday,
  Sunday: Sunday,
  eqYear: eqYear,
  ordYear: ordYear,
  boundedYear: boundedYear,
  enumYear: enumYear,
  boundedEnumYear: boundedEnumYear,
  showYear: showYear,
  eqMonth: eqMonth,
  ordMonth: ordMonth,
  boundedMonth: boundedMonth,
  enumMonth: enumMonth,
  boundedEnumMonth: boundedEnumMonth,
  showMonth: showMonth,
  eqDay: eqDay,
  ordDay: ordDay,
  boundedDay: boundedDay,
  enumDay: enumDay,
  boundedEnumDay: boundedEnumDay,
  showDay: showDay,
  eqWeekday: eqWeekday,
  ordWeekday: ordWeekday,
  boundedWeekday: boundedWeekday,
  enumWeekday: enumWeekday,
  boundedEnumWeekday: boundedEnumWeekday,
  showWeekday: showWeekday
};
},{"../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Enum/index.js":"output/Data.Enum/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Int/foreign.js":[function(require,module,exports) {
"use strict";

exports.fromNumberImpl = function (just) {
  return function (nothing) {
    return function (n) {
      /* jshint bitwise: false */
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};

exports.toNumber = function (n) {
  return n;
};

exports.fromStringAsImpl = function (just) {
  return function (nothing) {
    return function (radix) {
      var digits;

      if (radix < 11) {
        digits = "[0-" + (radix - 1).toString() + "]";
      } else if (radix === 11) {
        digits = "[0-9a]";
      } else {
        digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
      }

      var pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
      return function (s) {
        /* jshint bitwise: false */
        if (pattern.test(s)) {
          var i = parseInt(s, radix);
          return (i | 0) === i ? just(i) : nothing;
        } else {
          return nothing;
        }
      };
    };
  };
};

exports.toStringAs = function (radix) {
  return function (i) {
    return i.toString(radix);
  };
};

exports.quot = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x / y | 0;
  };
};

exports.rem = function (x) {
  return function (y) {
    return x % y;
  };
};

exports.pow = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return Math.pow(x, y) | 0;
  };
};
},{}],"output/Data.DivisionRing/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Ring = require("../Data.Ring/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var DivisionRing = function DivisionRing(Ring0, recip) {
  this.Ring0 = Ring0;
  this.recip = recip;
};

var recip = function recip(dict) {
  return dict.recip;
};

var rightDiv = function rightDiv(dictDivisionRing) {
  return function (a) {
    return function (b) {
      return Data_Semiring.mul(dictDivisionRing.Ring0().Semiring0())(a)(recip(dictDivisionRing)(b));
    };
  };
};

var leftDiv = function leftDiv(dictDivisionRing) {
  return function (a) {
    return function (b) {
      return Data_Semiring.mul(dictDivisionRing.Ring0().Semiring0())(recip(dictDivisionRing)(b))(a);
    };
  };
};

var divisionringNumber = new DivisionRing(function () {
  return Data_Ring.ringNumber;
}, function (x) {
  return 1.0 / x;
});
module.exports = {
  DivisionRing: DivisionRing,
  recip: recip,
  leftDiv: leftDiv,
  rightDiv: rightDiv,
  divisionringNumber: divisionringNumber
};
},{"../Data.Ring/index.js":"output/Data.Ring/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js"}],"output/Global/foreign.js":[function(require,module,exports) {
/* globals exports */
"use strict";

exports.nan = NaN;
exports.isNaN = isNaN;
exports.infinity = Infinity;
exports.isFinite = isFinite;

exports.readInt = function (radix) {
  return function (n) {
    return parseInt(n, radix);
  };
};

exports.readFloat = parseFloat;

var formatNumber = function formatNumber(format) {
  return function (fail, succ, digits, n) {
    try {
      return succ(n[format](digits));
    } catch (e) {
      return fail(e.message);
    }
  };
};

exports._toFixed = formatNumber("toFixed");
exports._toExponential = formatNumber("toExponential");
exports._toPrecision = formatNumber("toPrecision");

var encdecURI = function encdecURI(encdec) {
  return function (fail, succ, s) {
    try {
      return succ(encdec(s));
    } catch (e) {
      return fail(e.message);
    }
  };
};

exports._decodeURI = encdecURI(decodeURI);
exports._encodeURI = encdecURI(encodeURI);
exports._decodeURIComponent = encdecURI(decodeURIComponent);
exports._encodeURIComponent = encdecURI(encodeURIComponent);
},{}],"output/Global/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var toPrecision = function toPrecision(digits) {
  return function (n) {
    return $foreign["_toPrecision"](Data_Function["const"](Data_Maybe.Nothing.value), Data_Maybe.Just.create, digits, n);
  };
};

var toFixed = function toFixed(digits) {
  return function (n) {
    return $foreign["_toFixed"](Data_Function["const"](Data_Maybe.Nothing.value), Data_Maybe.Just.create, digits, n);
  };
};

var toExponential = function toExponential(digits) {
  return function (n) {
    return $foreign["_toExponential"](Data_Function["const"](Data_Maybe.Nothing.value), Data_Maybe.Just.create, digits, n);
  };
};

var $$encodeURIComponent = function $$encodeURIComponent(s) {
  return $foreign["_encodeURIComponent"](Data_Function["const"](Data_Maybe.Nothing.value), Data_Maybe.Just.create, s);
};

var $$encodeURI = function $$encodeURI(s) {
  return $foreign["_encodeURI"](Data_Function["const"](Data_Maybe.Nothing.value), Data_Maybe.Just.create, s);
};

var $$decodeURIComponent = function $$decodeURIComponent(s) {
  return $foreign["_decodeURIComponent"](Data_Function["const"](Data_Maybe.Nothing.value), Data_Maybe.Just.create, s);
};

var $$decodeURI = function $$decodeURI(s) {
  return $foreign["_decodeURI"](Data_Function["const"](Data_Maybe.Nothing.value), Data_Maybe.Just.create, s);
};

module.exports = {
  toFixed: toFixed,
  toExponential: toExponential,
  toPrecision: toPrecision,
  "decodeURI": $$decodeURI,
  "encodeURI": $$encodeURI,
  "decodeURIComponent": $$decodeURIComponent,
  "encodeURIComponent": $$encodeURIComponent,
  nan: $foreign.nan,
  "isNaN": $foreign["isNaN"],
  infinity: $foreign.infinity,
  "isFinite": $foreign["isFinite"],
  readInt: $foreign.readInt,
  readFloat: $foreign.readFloat
};
},{"./foreign.js":"output/Global/foreign.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js"}],"output/Math/foreign.js":[function(require,module,exports) {
"use strict"; // module Math

exports.abs = Math.abs;
exports.acos = Math.acos;
exports.asin = Math.asin;
exports.atan = Math.atan;

exports.atan2 = function (y) {
  return function (x) {
    return Math.atan2(y, x);
  };
};

exports.ceil = Math.ceil;
exports.cos = Math.cos;
exports.exp = Math.exp;
exports.floor = Math.floor;

exports.trunc = Math.trunc || function (n) {
  return n < 0 ? Math.ceil(n) : Math.floor(n);
};

exports.log = Math.log;

exports.max = function (n1) {
  return function (n2) {
    return Math.max(n1, n2);
  };
};

exports.min = function (n1) {
  return function (n2) {
    return Math.min(n1, n2);
  };
};

exports.pow = function (n) {
  return function (p) {
    return Math.pow(n, p);
  };
};

exports.remainder = function (n) {
  return function (m) {
    return n % m;
  };
};

exports.round = Math.round;
exports.sin = Math.sin;
exports.sqrt = Math.sqrt;
exports.tan = Math.tan;
exports.e = Math.E;
exports.ln2 = Math.LN2;
exports.ln10 = Math.LN10;
exports.log2e = Math.LOG2E;
exports.log10e = Math.LOG10E;
exports.pi = Math.PI;
exports.tau = 2 * Math.PI;
exports.sqrt1_2 = Math.SQRT1_2;
exports.sqrt2 = Math.SQRT2;
},{}],"output/Math/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

module.exports = {
  abs: $foreign.abs,
  acos: $foreign.acos,
  asin: $foreign.asin,
  atan: $foreign.atan,
  atan2: $foreign.atan2,
  ceil: $foreign.ceil,
  cos: $foreign.cos,
  exp: $foreign.exp,
  floor: $foreign.floor,
  log: $foreign.log,
  max: $foreign.max,
  min: $foreign.min,
  pow: $foreign.pow,
  round: $foreign.round,
  sin: $foreign.sin,
  sqrt: $foreign.sqrt,
  tan: $foreign.tan,
  trunc: $foreign.trunc,
  remainder: $foreign.remainder,
  e: $foreign.e,
  ln2: $foreign.ln2,
  ln10: $foreign.ln10,
  log2e: $foreign.log2e,
  log10e: $foreign.log10e,
  pi: $foreign.pi,
  tau: $foreign.tau,
  sqrt1_2: $foreign.sqrt1_2,
  sqrt2: $foreign.sqrt2
};
},{"./foreign.js":"output/Math/foreign.js"}],"output/Data.Int/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Category = require("../Control.Category/index.js");

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_CommutativeRing = require("../Data.CommutativeRing/index.js");

var Data_DivisionRing = require("../Data.DivisionRing/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_EuclideanRing = require("../Data.EuclideanRing/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Ring = require("../Data.Ring/index.js");

var Data_Semiring = require("../Data.Semiring/index.js");

var Data_Show = require("../Data.Show/index.js");

var Global = require("../Global/index.js");

var $$Math = require("../Math/index.js");

var Radix = function Radix(x) {
  return x;
};

var Even = function () {
  function Even() {}

  ;
  Even.value = new Even();
  return Even;
}();

var Odd = function () {
  function Odd() {}

  ;
  Odd.value = new Odd();
  return Odd;
}();

var showParity = new Data_Show.Show(function (v) {
  if (v instanceof Even) {
    return "Even";
  }

  ;

  if (v instanceof Odd) {
    return "Odd";
  }

  ;
  throw new Error("Failed pattern match at Data.Int (line 112, column 1 - line 114, column 19): " + [v.constructor.name]);
});

var radix = function radix(n) {
  if (n >= 2 && n <= 36) {
    return new Data_Maybe.Just(n);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Int (line 193, column 1 - line 193, column 28): " + [n.constructor.name]);
};

var odd = function odd(x) {
  return (x & 1) !== 0;
};

var octal = 8;
var hexadecimal = 16;
var fromStringAs = $foreign.fromStringAsImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var fromString = fromStringAs(10);
var fromNumber = $foreign.fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

var unsafeClamp = function unsafeClamp(x) {
  if (x === Global.infinity) {
    return 0;
  }

  ;

  if (x === -Global.infinity) {
    return 0;
  }

  ;

  if (x >= $foreign.toNumber(Data_Bounded.top(Data_Bounded.boundedInt))) {
    return Data_Bounded.top(Data_Bounded.boundedInt);
  }

  ;

  if (x <= $foreign.toNumber(Data_Bounded.bottom(Data_Bounded.boundedInt))) {
    return Data_Bounded.bottom(Data_Bounded.boundedInt);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.fromMaybe(0)(fromNumber(x));
  }

  ;
  throw new Error("Failed pattern match at Data.Int (line 66, column 1 - line 66, column 29): " + [x.constructor.name]);
};

var round = function round($23) {
  return unsafeClamp($$Math.round($23));
};

var floor = function floor($24) {
  return unsafeClamp($$Math.floor($24));
};

var even = function even(x) {
  return (x & 1) === 0;
};

var parity = function parity(n) {
  var $14 = even(n);

  if ($14) {
    return Even.value;
  }

  ;
  return Odd.value;
};

var eqParity = new Data_Eq.Eq(function (x) {
  return function (y) {
    if (x instanceof Even && y instanceof Even) {
      return true;
    }

    ;

    if (x instanceof Odd && y instanceof Odd) {
      return true;
    }

    ;
    return false;
  };
});
var ordParity = new Data_Ord.Ord(function () {
  return eqParity;
}, function (x) {
  return function (y) {
    if (x instanceof Even && y instanceof Even) {
      return Data_Ordering.EQ.value;
    }

    ;

    if (x instanceof Even) {
      return Data_Ordering.LT.value;
    }

    ;

    if (y instanceof Even) {
      return Data_Ordering.GT.value;
    }

    ;

    if (x instanceof Odd && y instanceof Odd) {
      return Data_Ordering.EQ.value;
    }

    ;
    throw new Error("Failed pattern match at Data.Int (line 110, column 1 - line 110, column 40): " + [x.constructor.name, y.constructor.name]);
  };
});
var semiringParity = new Data_Semiring.Semiring(function (x) {
  return function (y) {
    var $19 = Data_Eq.eq(eqParity)(x)(y);

    if ($19) {
      return Even.value;
    }

    ;
    return Odd.value;
  };
}, function (v) {
  return function (v1) {
    if (v instanceof Odd && v1 instanceof Odd) {
      return Odd.value;
    }

    ;
    return Even.value;
  };
}, Odd.value, Even.value);
var ringParity = new Data_Ring.Ring(function () {
  return semiringParity;
}, Data_Semiring.add(semiringParity));
var divisionRingParity = new Data_DivisionRing.DivisionRing(function () {
  return ringParity;
}, Control_Category.identity(Control_Category.categoryFn));
var decimal = 10;
var commutativeRingParity = new Data_CommutativeRing.CommutativeRing(function () {
  return ringParity;
});
var euclideanRingParity = new Data_EuclideanRing.EuclideanRing(function () {
  return commutativeRingParity;
}, function (v) {
  if (v instanceof Even) {
    return 0;
  }

  ;

  if (v instanceof Odd) {
    return 1;
  }

  ;
  throw new Error("Failed pattern match at Data.Int (line 132, column 1 - line 136, column 17): " + [v.constructor.name]);
}, function (x) {
  return function (v) {
    return x;
  };
}, function (v) {
  return function (v1) {
    return Even.value;
  };
});

var ceil = function ceil($25) {
  return unsafeClamp($$Math.ceil($25));
};

var boundedParity = new Data_Bounded.Bounded(function () {
  return ordParity;
}, Even.value, Odd.value);
var binary = 2;
var base36 = 36;
module.exports = {
  fromNumber: fromNumber,
  ceil: ceil,
  floor: floor,
  round: round,
  fromString: fromString,
  radix: radix,
  binary: binary,
  octal: octal,
  decimal: decimal,
  hexadecimal: hexadecimal,
  base36: base36,
  fromStringAs: fromStringAs,
  Even: Even,
  Odd: Odd,
  parity: parity,
  even: even,
  odd: odd,
  eqParity: eqParity,
  ordParity: ordParity,
  showParity: showParity,
  boundedParity: boundedParity,
  semiringParity: semiringParity,
  ringParity: ringParity,
  commutativeRingParity: commutativeRingParity,
  euclideanRingParity: euclideanRingParity,
  divisionRingParity: divisionRingParity,
  toNumber: $foreign.toNumber,
  toStringAs: $foreign.toStringAs,
  quot: $foreign.quot,
  rem: $foreign.rem,
  pow: $foreign.pow
};
},{"./foreign.js":"output/Data.Int/foreign.js","../Control.Category/index.js":"output/Control.Category/index.js","../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.CommutativeRing/index.js":"output/Data.CommutativeRing/index.js","../Data.DivisionRing/index.js":"output/Data.DivisionRing/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.EuclideanRing/index.js":"output/Data.EuclideanRing/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Ring/index.js":"output/Data.Ring/index.js","../Data.Semiring/index.js":"output/Data.Semiring/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Global/index.js":"output/Global/index.js","../Math/index.js":"output/Math/index.js"}],"output/Data.Time.Duration/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Category = require("../Control.Category/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ring = require("../Data.Ring/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Seconds = function Seconds(x) {
  return x;
};

var Minutes = function Minutes(x) {
  return x;
};

var Milliseconds = function Milliseconds(x) {
  return x;
};

var Hours = function Hours(x) {
  return x;
};

var Days = function Days(x) {
  return x;
};

var Duration = function Duration(fromDuration, toDuration) {
  this.fromDuration = fromDuration;
  this.toDuration = toDuration;
};

var toDuration = function toDuration(dict) {
  return dict.toDuration;
};

var showSeconds = new Data_Show.Show(function (v) {
  return "(Seconds " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
var showMinutes = new Data_Show.Show(function (v) {
  return "(Minutes " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
var showMilliseconds = new Data_Show.Show(function (v) {
  return "(Milliseconds " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
var showHours = new Data_Show.Show(function (v) {
  return "(Hours " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
var showDays = new Data_Show.Show(function (v) {
  return "(Days " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
var semigroupSeconds = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    return v + v1;
  };
});
var semigroupMinutes = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    return v + v1;
  };
});
var semigroupMilliseconds = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    return v + v1;
  };
});
var semigroupHours = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    return v + v1;
  };
});
var semigroupDays = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    return v + v1;
  };
});
var ordSeconds = Data_Ord.ordNumber;
var ordMinutes = Data_Ord.ordNumber;
var ordMilliseconds = Data_Ord.ordNumber;
var ordHours = Data_Ord.ordNumber;
var ordDays = Data_Ord.ordNumber;
var newtypeSeconds = new Data_Newtype.Newtype(function (n) {
  return n;
}, Seconds);
var newtypeMinutes = new Data_Newtype.Newtype(function (n) {
  return n;
}, Minutes);
var newtypeMilliseconds = new Data_Newtype.Newtype(function (n) {
  return n;
}, Milliseconds);
var newtypeHours = new Data_Newtype.Newtype(function (n) {
  return n;
}, Hours);
var newtypeDays = new Data_Newtype.Newtype(function (n) {
  return n;
}, Days);
var monoidSeconds = new Data_Monoid.Monoid(function () {
  return semigroupSeconds;
}, 0.0);
var monoidMinutes = new Data_Monoid.Monoid(function () {
  return semigroupMinutes;
}, 0.0);
var monoidMilliseconds = new Data_Monoid.Monoid(function () {
  return semigroupMilliseconds;
}, 0.0);
var monoidHours = new Data_Monoid.Monoid(function () {
  return semigroupHours;
}, 0.0);
var monoidDays = new Data_Monoid.Monoid(function () {
  return semigroupDays;
}, 0.0);

var fromDuration = function fromDuration(dict) {
  return dict.fromDuration;
};

var negateDuration = function negateDuration(dictDuration) {
  var $56 = toDuration(dictDuration);
  var $57 = Data_Newtype.over(newtypeMilliseconds)(newtypeMilliseconds)(Milliseconds)(Data_Ring.negate(Data_Ring.ringNumber));
  var $58 = fromDuration(dictDuration);
  return function ($59) {
    return $56($57($58($59)));
  };
};

var eqSeconds = Data_Eq.eqNumber;
var eqMinutes = Data_Eq.eqNumber;
var eqMilliseconds = Data_Eq.eqNumber;
var eqHours = Data_Eq.eqNumber;
var eqDays = Data_Eq.eqNumber;
var durationSeconds = new Duration(Data_Newtype.over(newtypeSeconds)(newtypeMilliseconds)(Seconds)(function (v) {
  return v * 1000.0;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeSeconds)(Milliseconds)(function (v) {
  return v / 1000.0;
}));
var durationMinutes = new Duration(Data_Newtype.over(newtypeMinutes)(newtypeMilliseconds)(Minutes)(function (v) {
  return v * 60000.0;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeMinutes)(Milliseconds)(function (v) {
  return v / 60000.0;
}));
var durationMilliseconds = new Duration(Control_Category.identity(Control_Category.categoryFn), Control_Category.identity(Control_Category.categoryFn));
var durationHours = new Duration(Data_Newtype.over(newtypeHours)(newtypeMilliseconds)(Hours)(function (v) {
  return v * 3600000.0;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeHours)(Milliseconds)(function (v) {
  return v / 3600000.0;
}));
var durationDays = new Duration(Data_Newtype.over(newtypeDays)(newtypeMilliseconds)(Days)(function (v) {
  return v * 8.64e7;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeDays)(Milliseconds)(function (v) {
  return v / 8.64e7;
}));

var convertDuration = function convertDuration(dictDuration) {
  return function (dictDuration1) {
    var $60 = toDuration(dictDuration1);
    var $61 = fromDuration(dictDuration);
    return function ($62) {
      return $60($61($62));
    };
  };
};

module.exports = {
  fromDuration: fromDuration,
  toDuration: toDuration,
  Milliseconds: Milliseconds,
  Seconds: Seconds,
  Minutes: Minutes,
  Hours: Hours,
  Days: Days,
  Duration: Duration,
  convertDuration: convertDuration,
  negateDuration: negateDuration,
  newtypeMilliseconds: newtypeMilliseconds,
  eqMilliseconds: eqMilliseconds,
  ordMilliseconds: ordMilliseconds,
  semigroupMilliseconds: semigroupMilliseconds,
  monoidMilliseconds: monoidMilliseconds,
  showMilliseconds: showMilliseconds,
  newtypeSeconds: newtypeSeconds,
  eqSeconds: eqSeconds,
  ordSeconds: ordSeconds,
  semigroupSeconds: semigroupSeconds,
  monoidSeconds: monoidSeconds,
  showSeconds: showSeconds,
  newtypeMinutes: newtypeMinutes,
  eqMinutes: eqMinutes,
  ordMinutes: ordMinutes,
  semigroupMinutes: semigroupMinutes,
  monoidMinutes: monoidMinutes,
  showMinutes: showMinutes,
  newtypeHours: newtypeHours,
  eqHours: eqHours,
  ordHours: ordHours,
  semigroupHours: semigroupHours,
  monoidHours: monoidHours,
  showHours: showHours,
  newtypeDays: newtypeDays,
  eqDays: eqDays,
  ordDays: ordDays,
  semigroupDays: semigroupDays,
  monoidDays: monoidDays,
  showDays: showDays,
  durationMilliseconds: durationMilliseconds,
  durationSeconds: durationSeconds,
  durationMinutes: durationMinutes,
  durationHours: durationHours,
  durationDays: durationDays
};
},{"../Control.Category/index.js":"output/Control.Category/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ring/index.js":"output/Data.Ring/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Date/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Date_Component = require("../Data.Date.Component/index.js");

var Data_Enum = require("../Data.Enum/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_EuclideanRing = require("../Data.EuclideanRing/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Int = require("../Data.Int/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Time_Duration = require("../Data.Time.Duration/index.js");

var $$Date = function () {
  function $$Date(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  ;

  $$Date.create = function (value0) {
    return function (value1) {
      return function (value2) {
        return new $$Date(value0, value1, value2);
      };
    };
  };

  return $$Date;
}();

var year = function year(v) {
  return v.value0;
};

var weekday = function weekday(v) {
  var n = $foreign.calcWeekday(v.value0, Data_Enum.fromEnum(Data_Date_Component.boundedEnumMonth)(v.value1), v.value2);
  var $41 = n === 0;

  if ($41) {
    return Data_Maybe.fromJust()(Data_Enum.toEnum(Data_Date_Component.boundedEnumWeekday)(7));
  }

  ;
  return Data_Maybe.fromJust()(Data_Enum.toEnum(Data_Date_Component.boundedEnumWeekday)(n));
};

var showDate = new Data_Show.Show(function (v) {
  return "(Date " + (Data_Show.show(Data_Date_Component.showYear)(v.value0) + (" " + (Data_Show.show(Data_Date_Component.showMonth)(v.value1) + (" " + (Data_Show.show(Data_Date_Component.showDay)(v.value2) + ")")))));
});

var month = function month(v) {
  return v.value1;
};

var isLeapYear = function isLeapYear(y) {
  var y$prime = Data_Enum.fromEnum(Data_Date_Component.boundedEnumYear)(y);
  return Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(y$prime)(4) === 0 && (Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(y$prime)(400) === 0 || !(Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(y$prime)(100) === 0));
};

var lastDayOfMonth = function lastDayOfMonth(y) {
  return function (m) {
    var unsafeDay = function () {
      var $108 = Data_Maybe.fromJust();
      var $109 = Data_Enum.toEnum(Data_Date_Component.boundedEnumDay);
      return function ($110) {
        return $108($109($110));
      };
    }();

    if (m instanceof Data_Date_Component.January) {
      return unsafeDay(31);
    }

    ;

    if (m instanceof Data_Date_Component.February) {
      if (isLeapYear(y)) {
        return unsafeDay(29);
      }

      ;

      if (Data_Boolean.otherwise) {
        return unsafeDay(28);
      }

      ;
    }

    ;

    if (m instanceof Data_Date_Component.March) {
      return unsafeDay(31);
    }

    ;

    if (m instanceof Data_Date_Component.April) {
      return unsafeDay(30);
    }

    ;

    if (m instanceof Data_Date_Component.May) {
      return unsafeDay(31);
    }

    ;

    if (m instanceof Data_Date_Component.June) {
      return unsafeDay(30);
    }

    ;

    if (m instanceof Data_Date_Component.July) {
      return unsafeDay(31);
    }

    ;

    if (m instanceof Data_Date_Component.August) {
      return unsafeDay(31);
    }

    ;

    if (m instanceof Data_Date_Component.September) {
      return unsafeDay(30);
    }

    ;

    if (m instanceof Data_Date_Component.October) {
      return unsafeDay(31);
    }

    ;

    if (m instanceof Data_Date_Component.November) {
      return unsafeDay(30);
    }

    ;

    if (m instanceof Data_Date_Component.December) {
      return unsafeDay(31);
    }

    ;
    throw new Error("Failed pattern match at Data.Date (line 127, column 22 - line 141, column 27): " + [m.constructor.name]);
  };
};

var eqDate = new Data_Eq.Eq(function (x) {
  return function (y) {
    return Data_Eq.eq(Data_Date_Component.eqYear)(x.value0)(y.value0) && Data_Eq.eq(Data_Date_Component.eqMonth)(x.value1)(y.value1) && Data_Eq.eq(Data_Date_Component.eqDay)(x.value2)(y.value2);
  };
});
var ordDate = new Data_Ord.Ord(function () {
  return eqDate;
}, function (x) {
  return function (y) {
    var v = Data_Ord.compare(Data_Date_Component.ordYear)(x.value0)(y.value0);

    if (v instanceof Data_Ordering.LT) {
      return Data_Ordering.LT.value;
    }

    ;

    if (v instanceof Data_Ordering.GT) {
      return Data_Ordering.GT.value;
    }

    ;
    var v1 = Data_Ord.compare(Data_Date_Component.ordMonth)(x.value1)(y.value1);

    if (v1 instanceof Data_Ordering.LT) {
      return Data_Ordering.LT.value;
    }

    ;

    if (v1 instanceof Data_Ordering.GT) {
      return Data_Ordering.GT.value;
    }

    ;
    return Data_Ord.compare(Data_Date_Component.ordDay)(x.value2)(y.value2);
  };
});
var enumDate = new Data_Enum.Enum(function () {
  return ordDate;
}, function (v) {
  var pm = Data_Enum.pred(Data_Date_Component.enumMonth)(v.value1);
  var pd = Data_Enum.pred(Data_Date_Component.enumDay)(v.value2);

  var y$prime = function () {
    var $73 = Data_Maybe.isNothing(pd) && Data_Maybe.isNothing(pm);

    if ($73) {
      return Data_Enum.pred(Data_Date_Component.enumYear)(v.value0);
    }

    ;
    return new Data_Maybe.Just(v.value0);
  }();

  var m$prime = function () {
    var $74 = Data_Maybe.isNothing(pd);

    if ($74) {
      return Data_Maybe.fromMaybe(Data_Date_Component.December.value)(pm);
    }

    ;
    return v.value1;
  }();

  var l = lastDayOfMonth(v.value0)(m$prime);

  var d$prime = function () {
    var $75 = Data_Maybe.isNothing(pd);

    if ($75) {
      return new Data_Maybe.Just(l);
    }

    ;
    return pd;
  }();

  return Control_Apply.apply(Data_Maybe.applyMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)($$Date.create)(y$prime))(Control_Applicative.pure(Data_Maybe.applicativeMaybe)(m$prime)))(d$prime);
}, function (v) {
  var sm = Data_Enum.succ(Data_Date_Component.enumMonth)(v.value1);
  var l = lastDayOfMonth(v.value0)(v.value1);

  var sd = function () {
    var v1 = Data_Enum.succ(Data_Date_Component.enumDay)(v.value2);
    var $80 = Data_Ord.greaterThan(Data_Maybe.ordMaybe(Data_Date_Component.ordDay))(v1)(new Data_Maybe.Just(l));

    if ($80) {
      return Data_Maybe.Nothing.value;
    }

    ;
    return v1;
  }();

  var m$prime = function () {
    var $81 = Data_Maybe.isNothing(sd);

    if ($81) {
      return Data_Maybe.fromMaybe(Data_Date_Component.January.value)(sm);
    }

    ;
    return v.value1;
  }();

  var y$prime = function () {
    var $82 = Data_Maybe.isNothing(sd) && Data_Maybe.isNothing(sm);

    if ($82) {
      return Data_Enum.succ(Data_Date_Component.enumYear)(v.value0);
    }

    ;
    return new Data_Maybe.Just(v.value0);
  }();

  var d$prime = function () {
    var $83 = Data_Maybe.isNothing(sd);

    if ($83) {
      return Data_Enum.toEnum(Data_Date_Component.boundedEnumDay)(1);
    }

    ;
    return sd;
  }();

  return Control_Apply.apply(Data_Maybe.applyMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)($$Date.create)(y$prime))(Control_Applicative.pure(Data_Maybe.applicativeMaybe)(m$prime)))(d$prime);
});

var diff = function diff(dictDuration) {
  return function (v) {
    return function (v1) {
      return Data_Time_Duration.toDuration(dictDuration)($foreign.calcDiff(v.value0, Data_Enum.fromEnum(Data_Date_Component.boundedEnumMonth)(v.value1), v.value2, v1.value0, Data_Enum.fromEnum(Data_Date_Component.boundedEnumMonth)(v1.value1), v1.value2));
    };
  };
};

var day = function day(v) {
  return v.value2;
};

var canonicalDate = function canonicalDate(y) {
  return function (m) {
    return function (d) {
      var mkDate = function mkDate(y$prime) {
        return function (m$prime) {
          return function (d$prime) {
            return new $$Date(y$prime, Data_Maybe.fromJust()(Data_Enum.toEnum(Data_Date_Component.boundedEnumMonth)(m$prime)), d$prime);
          };
        };
      };

      return $foreign.canonicalDateImpl(mkDate, y, Data_Enum.fromEnum(Data_Date_Component.boundedEnumMonth)(m), d);
    };
  };
};

var exactDate = function exactDate(y) {
  return function (m) {
    return function (d) {
      var dt = new $$Date(y, m, d);
      var $99 = Data_Eq.eq(eqDate)(canonicalDate(y)(m)(d))(dt);

      if ($99) {
        return new Data_Maybe.Just(dt);
      }

      ;
      return Data_Maybe.Nothing.value;
    };
  };
};

var boundedDate = new Data_Bounded.Bounded(function () {
  return ordDate;
}, new $$Date(Data_Bounded.bottom(Data_Date_Component.boundedYear), Data_Bounded.bottom(Data_Date_Component.boundedMonth), Data_Bounded.bottom(Data_Date_Component.boundedDay)), new $$Date(Data_Bounded.top(Data_Date_Component.boundedYear), Data_Bounded.top(Data_Date_Component.boundedMonth), Data_Bounded.top(Data_Date_Component.boundedDay)));

var adjust = function adjust(v) {
  return function (date) {
    var adj = function adj(v1) {
      return function (v2) {
        if (v1 === 0) {
          return new Data_Maybe.Just(v2);
        }

        ;
        var j = v1 + Data_Enum.fromEnum(Data_Date_Component.boundedEnumDay)(v2.value2) | 0;
        var low = j < 1;
        var l = lastDayOfMonth(v2.value0)(function () {
          if (low) {
            return Data_Maybe.fromMaybe(Data_Date_Component.December.value)(Data_Enum.pred(Data_Date_Component.enumMonth)(v2.value1));
          }

          ;
          return v2.value1;
        }());
        var hi = j > Data_Enum.fromEnum(Data_Date_Component.boundedEnumDay)(l);

        var i$prime = function () {
          if (low) {
            return j;
          }

          ;

          if (hi) {
            return (j - Data_Enum.fromEnum(Data_Date_Component.boundedEnumDay)(l) | 0) - 1 | 0;
          }

          ;

          if (Data_Boolean.otherwise) {
            return 0;
          }

          ;
          throw new Error("Failed pattern match at Data.Date (line 101, column 9 - line 103, column 28): " + []);
        }();

        var dt$prime = function () {
          if (low) {
            return Control_Bind.bindFlipped(Data_Maybe.bindMaybe)(Data_Enum.pred(enumDate))(Data_Functor.map(Data_Maybe.functorMaybe)($$Date.create(v2.value0)(v2.value1))(Data_Enum.toEnum(Data_Date_Component.boundedEnumDay)(1)));
          }

          ;

          if (hi) {
            return Data_Enum.succ(enumDate)(new $$Date(v2.value0, v2.value1, l));
          }

          ;

          if (Data_Boolean.otherwise) {
            return Data_Functor.map(Data_Maybe.functorMaybe)($$Date.create(v2.value0)(v2.value1))(Data_Enum.toEnum(Data_Date_Component.boundedEnumDay)(j));
          }

          ;
          throw new Error("Failed pattern match at Data.Date (line 104, column 9 - line 106, column 48): " + []);
        }();

        return Control_Bind.bindFlipped(Data_Maybe.bindMaybe)(adj(i$prime))(dt$prime);
      };
    };

    return Control_Bind.bind(Data_Maybe.bindMaybe)(Data_Int.fromNumber(v))(Data_Function.flip(adj)(date));
  };
};

module.exports = {
  canonicalDate: canonicalDate,
  exactDate: exactDate,
  year: year,
  month: month,
  day: day,
  weekday: weekday,
  diff: diff,
  isLeapYear: isLeapYear,
  lastDayOfMonth: lastDayOfMonth,
  adjust: adjust,
  eqDate: eqDate,
  ordDate: ordDate,
  boundedDate: boundedDate,
  showDate: showDate,
  enumDate: enumDate
};
},{"./foreign.js":"output/Data.Date/foreign.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Date.Component/index.js":"output/Data.Date.Component/index.js","../Data.Enum/index.js":"output/Data.Enum/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.EuclideanRing/index.js":"output/Data.EuclideanRing/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Int/index.js":"output/Data.Int/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Time.Duration/index.js":"output/Data.Time.Duration/index.js"}],"output/Data.DateTime/foreign.js":[function(require,module,exports) {
"use strict";

var createUTC = function createUTC(y, mo, d, h, m, s, ms) {
  var date = new Date(Date.UTC(y, mo, d, h, m, s, ms));

  if (y >= 0 && y < 100) {
    date.setUTCFullYear(y);
  }

  return date.getTime();
};

exports.calcDiff = function (rec1, rec2) {
  var msUTC1 = createUTC(rec1.year, rec1.month - 1, rec1.day, rec1.hour, rec1.minute, rec1.second, rec1.millisecond);
  var msUTC2 = createUTC(rec2.year, rec2.month - 1, rec2.day, rec2.hour, rec2.minute, rec2.second, rec2.millisecond);
  return msUTC1 - msUTC2;
};

exports.adjustImpl = function (just) {
  return function (nothing) {
    return function (offset) {
      return function (rec) {
        var msUTC = createUTC(rec.year, rec.month - 1, rec.day, rec.hour, rec.minute, rec.second, rec.millisecond);
        var dt = new Date(msUTC + offset);
        return isNaN(dt.getTime()) ? nothing : just({
          year: dt.getUTCFullYear(),
          month: dt.getUTCMonth() + 1,
          day: dt.getUTCDate(),
          hour: dt.getUTCHours(),
          minute: dt.getUTCMinutes(),
          second: dt.getUTCSeconds(),
          millisecond: dt.getUTCMilliseconds()
        });
      };
    };
  };
};
},{}],"output/Data.Time.Component/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Enum = require("../Data.Enum/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Show = require("../Data.Show/index.js");

var Second = function Second(x) {
  return x;
};

var Minute = function Minute(x) {
  return x;
};

var Millisecond = function Millisecond(x) {
  return x;
};

var Hour = function Hour(x) {
  return x;
};

var showSecond = new Data_Show.Show(function (v) {
  return "(Second " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
var showMinute = new Data_Show.Show(function (v) {
  return "(Minute " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
var showMillisecond = new Data_Show.Show(function (v) {
  return "(Millisecond " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
var showHour = new Data_Show.Show(function (v) {
  return "(Hour " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
var ordSecond = Data_Ord.ordInt;
var ordMinute = Data_Ord.ordInt;
var ordMillisecond = Data_Ord.ordInt;
var ordHour = Data_Ord.ordInt;
var eqSecond = Data_Eq.eqInt;
var eqMinute = Data_Eq.eqInt;
var eqMillisecond = Data_Eq.eqInt;
var eqHour = Data_Eq.eqInt;
var boundedSecond = new Data_Bounded.Bounded(function () {
  return ordSecond;
}, 0, 59);
var boundedMinute = new Data_Bounded.Bounded(function () {
  return ordMinute;
}, 0, 59);
var boundedMillisecond = new Data_Bounded.Bounded(function () {
  return ordMillisecond;
}, 0, 999);
var boundedHour = new Data_Bounded.Bounded(function () {
  return ordHour;
}, 0, 23);
var boundedEnumSecond = new Data_Enum.BoundedEnum(function () {
  return boundedSecond;
}, function () {
  return enumSecond;
}, 60, function (v) {
  return v;
}, function (n) {
  if (n >= 0 && n <= 59) {
    return new Data_Maybe.Just(n);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Time.Component (line 90, column 1 - line 95, column 26): " + [n.constructor.name]);
});
var enumSecond = new Data_Enum.Enum(function () {
  return ordSecond;
}, function () {
  var $28 = Data_Enum.toEnum(boundedEnumSecond);
  var $29 = Data_Enum.fromEnum(boundedEnumSecond);
  return function ($30) {
    return $28(function (v) {
      return v - 1 | 0;
    }($29($30)));
  };
}(), function () {
  var $31 = Data_Enum.toEnum(boundedEnumSecond);
  var $32 = Data_Enum.fromEnum(boundedEnumSecond);
  return function ($33) {
    return $31(function (v) {
      return v + 1 | 0;
    }($32($33)));
  };
}());
var boundedEnumMinute = new Data_Enum.BoundedEnum(function () {
  return boundedMinute;
}, function () {
  return enumMinute;
}, 60, function (v) {
  return v;
}, function (n) {
  if (n >= 0 && n <= 59) {
    return new Data_Maybe.Just(n);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Time.Component (line 61, column 1 - line 66, column 26): " + [n.constructor.name]);
});
var enumMinute = new Data_Enum.Enum(function () {
  return ordMinute;
}, function () {
  var $34 = Data_Enum.toEnum(boundedEnumMinute);
  var $35 = Data_Enum.fromEnum(boundedEnumMinute);
  return function ($36) {
    return $34(function (v) {
      return v - 1 | 0;
    }($35($36)));
  };
}(), function () {
  var $37 = Data_Enum.toEnum(boundedEnumMinute);
  var $38 = Data_Enum.fromEnum(boundedEnumMinute);
  return function ($39) {
    return $37(function (v) {
      return v + 1 | 0;
    }($38($39)));
  };
}());
var boundedEnumMillisecond = new Data_Enum.BoundedEnum(function () {
  return boundedMillisecond;
}, function () {
  return enumMillisecond;
}, 1000, function (v) {
  return v;
}, function (n) {
  if (n >= 0 && n <= 999) {
    return new Data_Maybe.Just(n);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Time.Component (line 120, column 1 - line 125, column 31): " + [n.constructor.name]);
});
var enumMillisecond = new Data_Enum.Enum(function () {
  return ordMillisecond;
}, function () {
  var $40 = Data_Enum.toEnum(boundedEnumMillisecond);
  var $41 = Data_Enum.fromEnum(boundedEnumMillisecond);
  return function ($42) {
    return $40(function (v) {
      return v - 1 | 0;
    }($41($42)));
  };
}(), function () {
  var $43 = Data_Enum.toEnum(boundedEnumMillisecond);
  var $44 = Data_Enum.fromEnum(boundedEnumMillisecond);
  return function ($45) {
    return $43(function (v) {
      return v + 1 | 0;
    }($44($45)));
  };
}());
var boundedEnumHour = new Data_Enum.BoundedEnum(function () {
  return boundedHour;
}, function () {
  return enumHour;
}, 24, function (v) {
  return v;
}, function (n) {
  if (n >= 0 && n <= 23) {
    return new Data_Maybe.Just(n);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.Time.Component (line 32, column 1 - line 37, column 24): " + [n.constructor.name]);
});
var enumHour = new Data_Enum.Enum(function () {
  return ordHour;
}, function () {
  var $46 = Data_Enum.toEnum(boundedEnumHour);
  var $47 = Data_Enum.fromEnum(boundedEnumHour);
  return function ($48) {
    return $46(function (v) {
      return v - 1 | 0;
    }($47($48)));
  };
}(), function () {
  var $49 = Data_Enum.toEnum(boundedEnumHour);
  var $50 = Data_Enum.fromEnum(boundedEnumHour);
  return function ($51) {
    return $49(function (v) {
      return v + 1 | 0;
    }($50($51)));
  };
}());
module.exports = {
  eqHour: eqHour,
  ordHour: ordHour,
  boundedHour: boundedHour,
  enumHour: enumHour,
  boundedEnumHour: boundedEnumHour,
  showHour: showHour,
  eqMinute: eqMinute,
  ordMinute: ordMinute,
  boundedMinute: boundedMinute,
  enumMinute: enumMinute,
  boundedEnumMinute: boundedEnumMinute,
  showMinute: showMinute,
  eqSecond: eqSecond,
  ordSecond: ordSecond,
  boundedSecond: boundedSecond,
  enumSecond: enumSecond,
  boundedEnumSecond: boundedEnumSecond,
  showSecond: showSecond,
  eqMillisecond: eqMillisecond,
  ordMillisecond: ordMillisecond,
  boundedMillisecond: boundedMillisecond,
  enumMillisecond: enumMillisecond,
  boundedEnumMillisecond: boundedEnumMillisecond,
  showMillisecond: showMillisecond
};
},{"../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Enum/index.js":"output/Data.Enum/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/Data.Time/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Apply = require("../Control.Apply/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Enum = require("../Data.Enum/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Int = require("../Data.Int/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Time_Component = require("../Data.Time.Component/index.js");

var Data_Time_Duration = require("../Data.Time.Duration/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var $$Math = require("../Math/index.js");

var Time = function () {
  function Time(value0, value1, value2, value3) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  ;

  Time.create = function (value0) {
    return function (value1) {
      return function (value2) {
        return function (value3) {
          return new Time(value0, value1, value2, value3);
        };
      };
    };
  };

  return Time;
}();

var showTime = new Data_Show.Show(function (v) {
  return "(Time " + (Data_Show.show(Data_Time_Component.showHour)(v.value0) + (" " + (Data_Show.show(Data_Time_Component.showMinute)(v.value1) + (" " + (Data_Show.show(Data_Time_Component.showSecond)(v.value2) + (" " + (Data_Show.show(Data_Time_Component.showMillisecond)(v.value3) + ")")))))));
});

var setSecond = function setSecond(s) {
  return function (v) {
    return new Time(v.value0, v.value1, s, v.value3);
  };
};

var setMinute = function setMinute(m) {
  return function (v) {
    return new Time(v.value0, m, v.value2, v.value3);
  };
};

var setMillisecond = function setMillisecond(ms) {
  return function (v) {
    return new Time(v.value0, v.value1, v.value2, ms);
  };
};

var setHour = function setHour(h) {
  return function (v) {
    return new Time(h, v.value1, v.value2, v.value3);
  };
};

var second = function second(v) {
  return v.value2;
};

var minute = function minute(v) {
  return v.value1;
};

var millisecond = function millisecond(v) {
  return v.value3;
};

var millisToTime = function millisToTime(v) {
  var hours = $$Math.floor(v / 3600000.0);
  var minutes = $$Math.floor((v - hours * 3600000.0) / 60000.0);
  var seconds = $$Math.floor((v - (hours * 3600000.0 + minutes * 60000.0)) / 1000.0);
  var milliseconds = v - (hours * 3600000.0 + minutes * 60000.0 + seconds * 1000.0);
  return Data_Maybe.fromJust()(Control_Apply.apply(Data_Maybe.applyMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(Time.create)(Data_Enum.toEnum(Data_Time_Component.boundedEnumHour)(Data_Int.floor(hours))))(Data_Enum.toEnum(Data_Time_Component.boundedEnumMinute)(Data_Int.floor(minutes))))(Data_Enum.toEnum(Data_Time_Component.boundedEnumSecond)(Data_Int.floor(seconds))))(Data_Enum.toEnum(Data_Time_Component.boundedEnumMillisecond)(Data_Int.floor(milliseconds))));
};

var hour = function hour(v) {
  return v.value0;
};

var timeToMillis = function timeToMillis(t) {
  return Data_Time_Duration.Milliseconds(3600000.0 * Data_Int.toNumber(Data_Enum.fromEnum(Data_Time_Component.boundedEnumHour)(hour(t))) + 60000.0 * Data_Int.toNumber(Data_Enum.fromEnum(Data_Time_Component.boundedEnumMinute)(minute(t))) + 1000.0 * Data_Int.toNumber(Data_Enum.fromEnum(Data_Time_Component.boundedEnumSecond)(second(t))) + Data_Int.toNumber(Data_Enum.fromEnum(Data_Time_Component.boundedEnumMillisecond)(millisecond(t))));
};

var eqTime = new Data_Eq.Eq(function (x) {
  return function (y) {
    return Data_Eq.eq(Data_Time_Component.eqHour)(x.value0)(y.value0) && Data_Eq.eq(Data_Time_Component.eqMinute)(x.value1)(y.value1) && Data_Eq.eq(Data_Time_Component.eqSecond)(x.value2)(y.value2) && Data_Eq.eq(Data_Time_Component.eqMillisecond)(x.value3)(y.value3);
  };
});
var ordTime = new Data_Ord.Ord(function () {
  return eqTime;
}, function (x) {
  return function (y) {
    var v = Data_Ord.compare(Data_Time_Component.ordHour)(x.value0)(y.value0);

    if (v instanceof Data_Ordering.LT) {
      return Data_Ordering.LT.value;
    }

    ;

    if (v instanceof Data_Ordering.GT) {
      return Data_Ordering.GT.value;
    }

    ;
    var v1 = Data_Ord.compare(Data_Time_Component.ordMinute)(x.value1)(y.value1);

    if (v1 instanceof Data_Ordering.LT) {
      return Data_Ordering.LT.value;
    }

    ;

    if (v1 instanceof Data_Ordering.GT) {
      return Data_Ordering.GT.value;
    }

    ;
    var v2 = Data_Ord.compare(Data_Time_Component.ordSecond)(x.value2)(y.value2);

    if (v2 instanceof Data_Ordering.LT) {
      return Data_Ordering.LT.value;
    }

    ;

    if (v2 instanceof Data_Ordering.GT) {
      return Data_Ordering.GT.value;
    }

    ;
    return Data_Ord.compare(Data_Time_Component.ordMillisecond)(x.value3)(y.value3);
  };
});

var diff = function diff(dictDuration) {
  return function (t1) {
    return function (t2) {
      return Data_Time_Duration.toDuration(dictDuration)(Data_Semigroup.append(Data_Time_Duration.semigroupMilliseconds)(timeToMillis(t1))(Data_Time_Duration.negateDuration(Data_Time_Duration.durationMilliseconds)(timeToMillis(t2))));
    };
  };
};

var boundedTime = new Data_Bounded.Bounded(function () {
  return ordTime;
}, new Time(Data_Bounded.bottom(Data_Time_Component.boundedHour), Data_Bounded.bottom(Data_Time_Component.boundedMinute), Data_Bounded.bottom(Data_Time_Component.boundedSecond), Data_Bounded.bottom(Data_Time_Component.boundedMillisecond)), new Time(Data_Bounded.top(Data_Time_Component.boundedHour), Data_Bounded.top(Data_Time_Component.boundedMinute), Data_Bounded.top(Data_Time_Component.boundedSecond), Data_Bounded.top(Data_Time_Component.boundedMillisecond)));
var maxTime = timeToMillis(Data_Bounded.top(boundedTime));
var minTime = timeToMillis(Data_Bounded.bottom(boundedTime));

var adjust = function adjust(dictDuration) {
  return function (d) {
    return function (t) {
      var tLength = timeToMillis(t);
      var d$prime = Data_Time_Duration.fromDuration(dictDuration)(d);
      var wholeDays = Data_Time_Duration.Days($$Math.floor(Data_Newtype.unwrap(Data_Time_Duration.newtypeMilliseconds)(d$prime) / 8.64e7));
      var msAdjust = Data_Semigroup.append(Data_Time_Duration.semigroupMilliseconds)(d$prime)(Data_Time_Duration.negateDuration(Data_Time_Duration.durationMilliseconds)(Data_Time_Duration.fromDuration(Data_Time_Duration.durationDays)(wholeDays)));
      var msAdjusted = Data_Semigroup.append(Data_Time_Duration.semigroupMilliseconds)(tLength)(msAdjust);

      var wrap = function () {
        var $112 = Data_Ord.greaterThan(Data_Time_Duration.ordMilliseconds)(msAdjusted)(maxTime);

        if ($112) {
          return 1.0;
        }

        ;
        var $113 = Data_Ord.lessThan(Data_Time_Duration.ordMilliseconds)(msAdjusted)(minTime);

        if ($113) {
          return -1.0;
        }

        ;
        return 0.0;
      }();

      return new Data_Tuple.Tuple(Data_Semigroup.append(Data_Time_Duration.semigroupDays)(wholeDays)(wrap), millisToTime(Data_Semigroup.append(Data_Time_Duration.semigroupMilliseconds)(msAdjusted)(8.64e7 * -wrap)));
    };
  };
};

module.exports = {
  Time: Time,
  hour: hour,
  setHour: setHour,
  minute: minute,
  setMinute: setMinute,
  second: second,
  setSecond: setSecond,
  millisecond: millisecond,
  setMillisecond: setMillisecond,
  adjust: adjust,
  diff: diff,
  eqTime: eqTime,
  ordTime: ordTime,
  boundedTime: boundedTime,
  showTime: showTime
};
},{"../Control.Apply/index.js":"output/Control.Apply/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Enum/index.js":"output/Data.Enum/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Int/index.js":"output/Data.Int/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Time.Component/index.js":"output/Data.Time.Component/index.js","../Data.Time.Duration/index.js":"output/Data.Time.Duration/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js","../Math/index.js":"output/Math/index.js"}],"output/Data.DateTime/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Date = require("../Data.Date/index.js");

var Data_Date_Component = require("../Data.Date.Component/index.js");

var Data_Enum = require("../Data.Enum/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Ordering = require("../Data.Ordering/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Time = require("../Data.Time/index.js");

var Data_Time_Component = require("../Data.Time.Component/index.js");

var Data_Time_Duration = require("../Data.Time.Duration/index.js");

var DateTime = function () {
  function DateTime(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }

  ;

  DateTime.create = function (value0) {
    return function (value1) {
      return new DateTime(value0, value1);
    };
  };

  return DateTime;
}();

var toRecord = function toRecord(v) {
  return {
    year: Data_Enum.fromEnum(Data_Date_Component.boundedEnumYear)(Data_Date.year(v.value0)),
    month: Data_Enum.fromEnum(Data_Date_Component.boundedEnumMonth)(Data_Date.month(v.value0)),
    day: Data_Enum.fromEnum(Data_Date_Component.boundedEnumDay)(Data_Date.day(v.value0)),
    hour: Data_Enum.fromEnum(Data_Time_Component.boundedEnumHour)(Data_Time.hour(v.value1)),
    minute: Data_Enum.fromEnum(Data_Time_Component.boundedEnumMinute)(Data_Time.minute(v.value1)),
    second: Data_Enum.fromEnum(Data_Time_Component.boundedEnumSecond)(Data_Time.second(v.value1)),
    millisecond: Data_Enum.fromEnum(Data_Time_Component.boundedEnumMillisecond)(Data_Time.millisecond(v.value1))
  };
};

var time = function time(v) {
  return v.value1;
};

var showDateTime = new Data_Show.Show(function (v) {
  return "(DateTime " + (Data_Show.show(Data_Date.showDate)(v.value0) + (" " + (Data_Show.show(Data_Time.showTime)(v.value1) + ")")));
});

var modifyTimeF = function modifyTimeF(dictFunctor) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictFunctor)(DateTime.create(v.value0))(f(v.value1));
    };
  };
};

var modifyTime = function modifyTime(f) {
  return function (v) {
    return new DateTime(v.value0, f(v.value1));
  };
};

var modifyDateF = function modifyDateF(dictFunctor) {
  return function (f) {
    return function (v) {
      return Data_Functor.map(dictFunctor)(Data_Function.flip(DateTime.create)(v.value1))(f(v.value0));
    };
  };
};

var modifyDate = function modifyDate(f) {
  return function (v) {
    return new DateTime(f(v.value0), v.value1);
  };
};

var eqDateTime = new Data_Eq.Eq(function (x) {
  return function (y) {
    return Data_Eq.eq(Data_Date.eqDate)(x.value0)(y.value0) && Data_Eq.eq(Data_Time.eqTime)(x.value1)(y.value1);
  };
});
var ordDateTime = new Data_Ord.Ord(function () {
  return eqDateTime;
}, function (x) {
  return function (y) {
    var v = Data_Ord.compare(Data_Date.ordDate)(x.value0)(y.value0);

    if (v instanceof Data_Ordering.LT) {
      return Data_Ordering.LT.value;
    }

    ;

    if (v instanceof Data_Ordering.GT) {
      return Data_Ordering.GT.value;
    }

    ;
    return Data_Ord.compare(Data_Time.ordTime)(x.value1)(y.value1);
  };
});

var diff = function diff(dictDuration) {
  return function (dt1) {
    return function (dt2) {
      return Data_Time_Duration.toDuration(dictDuration)($foreign.calcDiff(toRecord(dt1), toRecord(dt2)));
    };
  };
};

var date = function date(v) {
  return v.value0;
};

var boundedDateTime = new Data_Bounded.Bounded(function () {
  return ordDateTime;
}, new DateTime(Data_Bounded.bottom(Data_Date.boundedDate), Data_Bounded.bottom(Data_Time.boundedTime)), new DateTime(Data_Bounded.top(Data_Date.boundedDate), Data_Bounded.top(Data_Time.boundedTime)));

var adjust = function adjust(dictDuration) {
  return function (d) {
    return function (dt) {
      return Control_Bind.bind(Data_Maybe.bindMaybe)($foreign.adjustImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value)(Data_Time_Duration.fromDuration(dictDuration)(d))(toRecord(dt)))(function (rec) {
        return Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(DateTime.create)(Control_Bind.join(Data_Maybe.bindMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Date.exactDate)(Data_Enum.toEnum(Data_Date_Component.boundedEnumYear)(rec.year)))(Data_Enum.toEnum(Data_Date_Component.boundedEnumMonth)(rec.month)))(Data_Enum.toEnum(Data_Date_Component.boundedEnumDay)(rec.day)))))(Control_Apply.apply(Data_Maybe.applyMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Time.Time.create)(Data_Enum.toEnum(Data_Time_Component.boundedEnumHour)(rec.hour)))(Data_Enum.toEnum(Data_Time_Component.boundedEnumMinute)(rec.minute)))(Data_Enum.toEnum(Data_Time_Component.boundedEnumSecond)(rec.second)))(Data_Enum.toEnum(Data_Time_Component.boundedEnumMillisecond)(rec.millisecond)));
      });
    };
  };
};

module.exports = {
  DateTime: DateTime,
  date: date,
  modifyDate: modifyDate,
  modifyDateF: modifyDateF,
  time: time,
  modifyTime: modifyTime,
  modifyTimeF: modifyTimeF,
  adjust: adjust,
  diff: diff,
  eqDateTime: eqDateTime,
  ordDateTime: ordDateTime,
  boundedDateTime: boundedDateTime,
  showDateTime: showDateTime
};
},{"./foreign.js":"output/Data.DateTime/foreign.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Date/index.js":"output/Data.Date/index.js","../Data.Date.Component/index.js":"output/Data.Date.Component/index.js","../Data.Enum/index.js":"output/Data.Enum/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Ordering/index.js":"output/Data.Ordering/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Time/index.js":"output/Data.Time/index.js","../Data.Time.Component/index.js":"output/Data.Time.Component/index.js","../Data.Time.Duration/index.js":"output/Data.Time.Duration/index.js"}],"output/Data.DateTime.Instant/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Boolean = require("../Data.Boolean/index.js");

var Data_Bounded = require("../Data.Bounded/index.js");

var Data_Date = require("../Data.Date/index.js");

var Data_Date_Component = require("../Data.Date.Component/index.js");

var Data_DateTime = require("../Data.DateTime/index.js");

var Data_Enum = require("../Data.Enum/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Time = require("../Data.Time/index.js");

var Data_Time_Component = require("../Data.Time.Component/index.js");

var Data_Time_Duration = require("../Data.Time.Duration/index.js");

var Instant = function Instant(x) {
  return x;
};

var unInstant = function unInstant(v) {
  return v;
};

var toDateTime = function () {
  var mkDateTime = function mkDateTime(y) {
    return function (mo) {
      return function (d) {
        return function (h) {
          return function (mi) {
            return function (s) {
              return function (ms) {
                return new Data_DateTime.DateTime(Data_Date.canonicalDate(y)(Data_Maybe.fromJust()(Data_Enum.toEnum(Data_Date_Component.boundedEnumMonth)(mo)))(d), new Data_Time.Time(h, mi, s, ms));
              };
            };
          };
        };
      };
    };
  };

  return $foreign.toDateTimeImpl(mkDateTime);
}();

var showInstant = new Data_Show.Show(function (v) {
  return "(Instant " + (Data_Show.show(Data_Time_Duration.showMilliseconds)(v) + ")");
});
var ordDateTime = Data_Time_Duration.ordMilliseconds;

var instant = function instant(v) {
  if (v >= -8.6399778816e15 && v <= 8.639977881599999e15) {
    return new Data_Maybe.Just(v);
  }

  ;

  if (Data_Boolean.otherwise) {
    return Data_Maybe.Nothing.value;
  }

  ;
  throw new Error("Failed pattern match at Data.DateTime.Instant (line 44, column 1 - line 44, column 41): " + [v.constructor.name]);
};

var fromDateTime = function fromDateTime(v) {
  return $foreign.fromDateTimeImpl(Data_Date.year(v.value0), Data_Enum.fromEnum(Data_Date_Component.boundedEnumMonth)(Data_Date.month(v.value0)), Data_Date.day(v.value0), Data_Time.hour(v.value1), Data_Time.minute(v.value1), Data_Time.second(v.value1), Data_Time.millisecond(v.value1));
};

var fromDate = function fromDate(d) {
  return $foreign.fromDateTimeImpl(Data_Date.year(d), Data_Enum.fromEnum(Data_Date_Component.boundedEnumMonth)(Data_Date.month(d)), Data_Date.day(d), Data_Bounded.bottom(Data_Time_Component.boundedHour), Data_Bounded.bottom(Data_Time_Component.boundedMinute), Data_Bounded.bottom(Data_Time_Component.boundedSecond), Data_Bounded.bottom(Data_Time_Component.boundedMillisecond));
};

var eqDateTime = Data_Time_Duration.eqMilliseconds;
var boundedInstant = new Data_Bounded.Bounded(function () {
  return ordDateTime;
}, -8.6399778816e15, 8.639977881599999e15);
module.exports = {
  instant: instant,
  unInstant: unInstant,
  fromDateTime: fromDateTime,
  fromDate: fromDate,
  toDateTime: toDateTime,
  eqDateTime: eqDateTime,
  ordDateTime: ordDateTime,
  boundedInstant: boundedInstant,
  showInstant: showInstant
};
},{"./foreign.js":"output/Data.DateTime.Instant/foreign.js","../Data.Boolean/index.js":"output/Data.Boolean/index.js","../Data.Bounded/index.js":"output/Data.Bounded/index.js","../Data.Date/index.js":"output/Data.Date/index.js","../Data.Date.Component/index.js":"output/Data.Date.Component/index.js","../Data.DateTime/index.js":"output/Data.DateTime/index.js","../Data.Enum/index.js":"output/Data.Enum/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Time/index.js":"output/Data.Time/index.js","../Data.Time.Component/index.js":"output/Data.Time.Component/index.js","../Data.Time.Duration/index.js":"output/Data.Time.Duration/index.js"}],"output/Effect.Aff/foreign.js":[function(require,module,exports) {
/* globals setImmediate, clearImmediate, setTimeout, clearTimeout */

/* jshint -W083, -W098, -W003 */
"use strict";

var Aff = function () {
  // A unique value for empty.
  var EMPTY = {};
  /*
   An awkward approximation. We elide evidence we would otherwise need in PS for
  efficiency sake.
   data Aff eff a
    = Pure a
    | Throw Error
    | Catch (Aff eff a) (Error -> Aff eff a)
    | Sync (Eff eff a)
    | Async ((Either Error a -> Eff eff Unit) -> Eff eff (Canceler eff))
    | forall b. Bind (Aff eff b) (b -> Aff eff a)
    | forall b. Bracket (Aff eff b) (BracketConditions eff b) (b -> Aff eff a)
    | forall b. Fork Boolean (Aff eff b) ?(Fiber eff b -> a)
    | Sequential (ParAff aff a)
   */

  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  /*
   data ParAff eff a
    = forall b. Map (b -> a) (ParAff eff b)
    | forall b. Apply (ParAff eff (b -> a)) (ParAff eff b)
    | Alt (ParAff eff a) (ParAff eff a)
    | ?Par (Aff eff a)
   */

  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt"; // Various constructors used in interpretation

  var CONS = "Cons"; // Cons-list, for stacks

  var RESUME = "Resume"; // Continue indiscriminately

  var RELEASE = "Release"; // Continue with bracket finalizers

  var FINALIZER = "Finalizer"; // A non-interruptible effect

  var FINALIZED = "Finalized"; // Marker for finalization

  var FORKED = "Forked"; // Reference to a forked fiber, with resumption stack

  var FIBER = "Fiber"; // Actual fiber reference

  var THUNK = "Thunk"; // Primed effect, ready to invoke

  function Aff(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }

  function AffCtr(tag) {
    var fn = function fn(_1, _2, _3) {
      return new Aff(tag, _1, _2, _3);
    };

    fn.tag = tag;
    return fn;
  }

  function nonCanceler(error) {
    return new Aff(PURE, void 0);
  }

  function runEff(eff) {
    try {
      eff();
    } catch (error) {
      setTimeout(function () {
        throw error;
      }, 0);
    }
  }

  function runSync(left, right, eff) {
    try {
      return right(eff());
    } catch (error) {
      return left(error);
    }
  }

  function runAsync(left, eff, k) {
    try {
      return eff(k)();
    } catch (error) {
      k(left(error))();
      return nonCanceler;
    }
  }

  var Scheduler = function () {
    var limit = 1024;
    var size = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;

    function drain() {
      var thunk;
      draining = true;

      while (size !== 0) {
        size--;
        thunk = queue[ix];
        queue[ix] = void 0;
        ix = (ix + 1) % limit;
        thunk();
      }

      draining = false;
    }

    return {
      isDraining: function isDraining() {
        return draining;
      },
      enqueue: function enqueue(cb) {
        var i, tmp;

        if (size === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }

        queue[(ix + size) % limit] = cb;
        size++;

        if (!draining) {
          drain();
        }
      }
    };
  }();

  function Supervisor(util) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function register(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function handler(result) {
            return function () {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function isEmpty() {
        return count === 0;
      },
      killAll: function killAll(killError, cb) {
        return function () {
          if (count === 0) {
            return cb();
          }

          var killCount = 0;
          var kills = {};

          function kill(fid) {
            kills[fid] = fibers[fid].kill(killError, function (result) {
              return function () {
                delete kills[fid];
                killCount--;

                if (util.isLeft(result) && util.fromLeft(result)) {
                  setTimeout(function () {
                    throw util.fromLeft(result);
                  }, 0);
                }

                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }

          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill(k);
            }
          }

          fibers = {};
          fiberId = 0;
          count = 0;
          return function (error) {
            return new Aff(SYNC, function () {
              for (var k in kills) {
                if (kills.hasOwnProperty(k)) {
                  kills[k]();
                }
              }
            });
          };
        };
      }
    };
  } // Fiber state machine


  var SUSPENDED = 0; // Suspended, pending a join.

  var CONTINUE = 1; // Interpret the next instruction.

  var STEP_BIND = 2; // Apply the next bind.

  var STEP_RESULT = 3; // Handle potential failure from a result.

  var PENDING = 4; // An async effect is running.

  var RETURN = 5; // The current stack has returned.

  var COMPLETED = 6; // The entire fiber has completed.

  function Fiber(util, supervisor, aff) {
    // Monotonically increasing tick, increased on each asynchronous turn.
    var runTick = 0; // The current branch of the state machine.

    var status = SUSPENDED; // The current point of interest for the state machine branch.

    var step = aff; // Successful step

    var fail = null; // Failure step

    var interrupt = null; // Asynchronous interrupt
    // Stack of continuations for the current fiber.

    var bhead = null;
    var btail = null; // Stack of attempts and finalizers for error recovery. Every `Cons` is also
    // tagged with current `interrupt` state. We use this to track which items
    // should be ignored or evaluated as a result of a kill.

    var attempts = null; // A special state is needed for Bracket, because it cannot be killed. When
    // we enter a bracket acquisition or finalizer, we increment the counter,
    // and then decrement once complete.

    var bracketCount = 0; // Each join gets a new id so they can be revoked.

    var joinId = 0;
    var joins = null;
    var rethrow = true; // Each invocation of `run` requires a tick. When an asynchronous effect is
    // resolved, we must check that the local tick coincides with the fiber
    // tick before resuming. This prevents multiple async continuations from
    // accidentally resuming the same fiber. A common example may be invoking
    // the provided callback in `makeAff` more than once, but it may also be an
    // async effect resuming after the fiber was already cancelled.

    function _run(localRunTick) {
      var tmp, result, attempt;

      while (true) {
        tmp = null;
        result = null;
        attempt = null;

        switch (status) {
          case STEP_BIND:
            status = CONTINUE;

            try {
              step = bhead(step);

              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status = RETURN;
              fail = util.left(e);
              step = null;
            }

            break;

          case STEP_RESULT:
            if (util.isLeft(step)) {
              status = RETURN;
              fail = step;
              step = null;
            } else if (bhead === null) {
              status = RETURN;
            } else {
              status = STEP_BIND;
              step = util.fromRight(step);
            }

            break;

          case CONTINUE:
            switch (step.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff(CONS, bhead, btail);
                }

                bhead = step._2;
                status = CONTINUE;
                step = step._1;
                break;

              case PURE:
                if (bhead === null) {
                  status = RETURN;
                  step = util.right(step._1);
                } else {
                  status = STEP_BIND;
                  step = step._1;
                }

                break;

              case SYNC:
                status = STEP_RESULT;
                step = runSync(util.left, util.right, step._1);
                break;

              case ASYNC:
                status = PENDING;
                step = runAsync(util.left, step._1, function (result) {
                  return function () {
                    if (runTick !== localRunTick) {
                      return;
                    }

                    runTick++;
                    Scheduler.enqueue(function () {
                      // It's possible to interrupt the fiber between enqueuing and
                      // resuming, so we need to check that the runTick is still
                      // valid.
                      if (runTick !== localRunTick + 1) {
                        return;
                      }

                      status = STEP_RESULT;
                      step = result;

                      _run(runTick);
                    });
                  };
                });
                return;

              case THROW:
                status = RETURN;
                fail = util.left(step._1);
                step = null;
                break;
              // Enqueue the Catch so that we can call the error handler later on
              // in case of an exception.

              case CATCH:
                if (bhead === null) {
                  attempts = new Aff(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff(CONS, step, new Aff(CONS, new Aff(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }

                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              // Enqueue the Bracket so that we can call the appropriate handlers
              // after resource acquisition.

              case BRACKET:
                bracketCount++;

                if (bhead === null) {
                  attempts = new Aff(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff(CONS, step, new Aff(CONS, new Aff(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }

                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;

              case FORK:
                status = STEP_RESULT;
                tmp = Fiber(util, supervisor, step._2);

                if (supervisor) {
                  supervisor.register(tmp);
                }

                if (step._1) {
                  tmp.run();
                }

                step = util.right(tmp);
                break;

              case SEQ:
                status = CONTINUE;
                step = sequential(util, supervisor, step._1);
                break;
            }

            break;

          case RETURN:
            bhead = null;
            btail = null; // If the current stack has returned, and we have no other stacks to
            // resume or finalizers to run, the fiber has halted and we can
            // invoke all join callbacks. Otherwise we need to resume.

            if (attempts === null) {
              status = COMPLETED;
              step = interrupt || fail || step;
            } else {
              // The interrupt status for the enqueued item.
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;

              switch (attempt.tag) {
                // We cannot recover from an unmasked interrupt. Otherwise we should
                // continue stepping, or run the exception handler if an exception
                // was raised.
                case CATCH:
                  // We should compare the interrupt status as well because we
                  // only want it to apply if there has been an interrupt since
                  // enqueuing the catch.
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status = RETURN;
                  } else if (fail) {
                    status = CONTINUE;
                    step = attempt._2(util.fromLeft(fail));
                    fail = null;
                  }

                  break;
                // We cannot resume from an unmasked interrupt or exception.

                case RESUME:
                  // As with Catch, we only want to ignore in the case of an
                  // interrupt since enqueing the item.
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                    status = RETURN;
                  } else {
                    bhead = attempt._1;
                    btail = attempt._2;
                    status = STEP_BIND;
                    step = util.fromRight(step);
                  }

                  break;
                // If we have a bracket, we should enqueue the handlers,
                // and continue with the success branch only if the fiber has
                // not been interrupted. If the bracket acquisition failed, we
                // should not run either.

                case BRACKET:
                  bracketCount--;

                  if (fail === null) {
                    result = util.fromRight(step); // We need to enqueue the Release with the same interrupt
                    // status as the Bracket that is initiating it.

                    attempts = new Aff(CONS, new Aff(RELEASE, attempt._2, result), attempts, tmp); // We should only coninue as long as the interrupt status has not changed or
                    // we are currently within a non-interruptable finalizer.

                    if (interrupt === tmp || bracketCount > 0) {
                      status = CONTINUE;
                      step = attempt._3(result);
                    }
                  }

                  break;
                // Enqueue the appropriate handler. We increase the bracket count
                // because it should not be cancelled.

                case RELEASE:
                  attempts = new Aff(CONS, new Aff(FINALIZED, step, fail), attempts, interrupt);
                  status = CONTINUE; // It has only been killed if the interrupt status has changed
                  // since we enqueued the item, and the bracket count is 0. If the
                  // bracket count is non-zero then we are in a masked state so it's
                  // impossible to be killed.

                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                  } else if (fail) {
                    step = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                  } else {
                    step = attempt._1.completed(util.fromRight(step))(attempt._2);
                  }

                  fail = null;
                  bracketCount++;
                  break;

                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff(CONS, new Aff(FINALIZED, step, fail), attempts, interrupt);
                  status = CONTINUE;
                  step = attempt._1;
                  break;

                case FINALIZED:
                  bracketCount--;
                  status = RETURN;
                  step = attempt._1;
                  fail = attempt._2;
                  break;
              }
            }

            break;

          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step));
              }
            }

            joins = null; // If we have an interrupt and a fail, then the thread threw while
            // running finalizers. This should always rethrow in a fresh stack.

            if (interrupt && fail) {
              setTimeout(function () {
                throw util.fromLeft(fail);
              }, 0); // If we have an unhandled exception, and no other fiber has joined
              // then we need to throw the exception in a fresh stack.
            } else if (util.isLeft(step) && rethrow) {
              setTimeout(function () {
                // Guard on reathrow because a completely synchronous fiber can
                // still have an observer which was added after-the-fact.
                if (rethrow) {
                  throw util.fromLeft(step);
                }
              }, 0);
            }

            return;

          case SUSPENDED:
            status = CONTINUE;
            break;

          case PENDING:
            return;
        }
      }
    }

    function onComplete(join) {
      return function () {
        if (status === COMPLETED) {
          rethrow = rethrow && join.rethrow;
          join.handler(step)();
          return function () {};
        }

        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join;
        return function () {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }

    function kill(error, cb) {
      return function () {
        if (status === COMPLETED) {
          cb(util.right(void 0))();
          return function () {};
        }

        var canceler = onComplete({
          rethrow: false,
          handler: function handler()
          /* unused */
          {
            return cb(util.right(void 0));
          }
        })();

        switch (status) {
          case SUSPENDED:
            interrupt = util.left(error);
            status = COMPLETED;
            step = interrupt;

            _run(runTick);

            break;

          case PENDING:
            if (interrupt === null) {
              interrupt = util.left(error);
            }

            if (bracketCount === 0) {
              if (status === PENDING) {
                attempts = new Aff(CONS, new Aff(FINALIZER, step(error)), attempts, interrupt);
              }

              status = RETURN;
              step = null;
              fail = null;

              _run(++runTick);
            }

            break;

          default:
            if (interrupt === null) {
              interrupt = util.left(error);
            }

            if (bracketCount === 0) {
              status = RETURN;
              step = null;
              fail = null;
            }

        }

        return canceler;
      };
    }

    function join(cb) {
      return function () {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();

        if (status === SUSPENDED) {
          _run(runTick);
        }

        return canceler;
      };
    }

    return {
      kill: kill,
      join: join,
      onComplete: onComplete,
      isSuspended: function isSuspended() {
        return status === SUSPENDED;
      },
      run: function run() {
        if (status === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function () {
              _run(runTick);
            });
          } else {
            _run(runTick);
          }
        }
      }
    };
  }

  function runPar(util, supervisor, par, cb) {
    // Table of all forked fibers.
    var fiberId = 0;
    var fibers = {}; // Table of currently running cancelers, as a product of `Alt` behavior.

    var killId = 0;
    var kills = {}; // Error used for early cancelation on Alt branches.

    var early = new Error("[ParAff] Early exit"); // Error used to kill the entire tree.

    var interrupt = null; // The root pointer of the tree.

    var root = EMPTY; // Walks a tree, invoking all the cancelers. Returns the table of pending
    // cancellation fibers.

    function kill(error, par, cb) {
      var step = par;
      var head = null;
      var tail = null;
      var count = 0;
      var kills = {};
      var tmp, kid;

      loop: while (true) {
        tmp = null;

        switch (step.tag) {
          case FORKED:
            if (step._3 === EMPTY) {
              tmp = fibers[step._1];
              kills[count++] = tmp.kill(error, function (result) {
                return function () {
                  count--;

                  if (count === 0) {
                    cb(result)();
                  }
                };
              });
            } // Terminal case.


            if (head === null) {
              break loop;
            } // Go down the right side of the tree.


            step = head._2;

            if (tail === null) {
              head = null;
            } else {
              head = tail._1;
              tail = tail._2;
            }

            break;

          case MAP:
            step = step._2;
            break;

          case APPLY:
          case ALT:
            if (head) {
              tail = new Aff(CONS, head, tail);
            }

            head = step;
            step = step._1;
            break;
        }
      }

      if (count === 0) {
        cb(util.right(void 0))();
      } else {
        // Run the cancelation effects. We alias `count` because it's mutable.
        kid = 0;
        tmp = count;

        for (; kid < tmp; kid++) {
          kills[kid] = kills[kid]();
        }
      }

      return kills;
    } // When a fiber resolves, we need to bubble back up the tree with the
    // result, computing the applicative nodes.


    function join(result, head, tail) {
      var fail, step, lhs, rhs, tmp, kid;

      if (util.isLeft(result)) {
        fail = result;
        step = null;
      } else {
        step = result;
        fail = null;
      }

      loop: while (true) {
        lhs = null;
        rhs = null;
        tmp = null;
        kid = null; // We should never continue if the entire tree has been interrupted.

        if (interrupt !== null) {
          return;
        } // We've made it all the way to the root of the tree, which means
        // the tree has fully evaluated.


        if (head === null) {
          cb(fail || step)();
          return;
        } // The tree has already been computed, so we shouldn't try to do it
        // again. This should never happen.
        // TODO: Remove this?


        if (head._3 !== EMPTY) {
          return;
        }

        switch (head.tag) {
          case MAP:
            if (fail === null) {
              head._3 = util.right(head._1(util.fromRight(step)));
              step = head._3;
            } else {
              head._3 = fail;
            }

            break;

          case APPLY:
            lhs = head._1._3;
            rhs = head._2._3; // If we have a failure we should kill the other side because we
            // can't possible yield a result anymore.

            if (fail) {
              head._3 = fail;
              tmp = true;
              kid = killId++;
              kills[kid] = kill(early, fail === lhs ? head._2 : head._1, function ()
              /* unused */
              {
                return function () {
                  delete kills[kid];

                  if (tmp) {
                    tmp = false;
                  } else if (tail === null) {
                    join(fail, null, null);
                  } else {
                    join(fail, tail._1, tail._2);
                  }
                };
              });

              if (tmp) {
                tmp = false;
                return;
              }
            } else if (lhs === EMPTY || rhs === EMPTY) {
              // We can only proceed if both sides have resolved.
              return;
            } else {
              step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
              head._3 = step;
            }

            break;

          case ALT:
            lhs = head._1._3;
            rhs = head._2._3; // We can only proceed if both have resolved or we have a success

            if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
              return;
            } // If both sides resolve with an error, we should continue with the
            // first error


            if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
              fail = step === lhs ? rhs : lhs;
              step = null;
              head._3 = fail;
            } else {
              head._3 = step;
              tmp = true;
              kid = killId++; // Once a side has resolved, we need to cancel the side that is still
              // pending before we can continue.

              kills[kid] = kill(early, step === lhs ? head._2 : head._1, function ()
              /* unused */
              {
                return function () {
                  delete kills[kid];

                  if (tmp) {
                    tmp = false;
                  } else if (tail === null) {
                    join(step, null, null);
                  } else {
                    join(step, tail._1, tail._2);
                  }
                };
              });

              if (tmp) {
                tmp = false;
                return;
              }
            }

            break;
        }

        if (tail === null) {
          head = null;
        } else {
          head = tail._1;
          tail = tail._2;
        }
      }
    }

    function resolve(fiber) {
      return function (result) {
        return function () {
          delete fibers[fiber._1];
          fiber._3 = result;
          join(result, fiber._2._1, fiber._2._2);
        };
      };
    } // Walks the applicative tree, substituting non-applicative nodes with
    // `FORKED` nodes. In this tree, all applicative nodes use the `_3` slot
    // as a mutable slot for memoization. In an unresolved state, the `_3`
    // slot is `EMPTY`. In the cases of `ALT` and `APPLY`, we always walk
    // the left side first, because both operations are left-associative. As
    // we `RETURN` from those branches, we then walk the right side.


    function run() {
      var status = CONTINUE;
      var step = par;
      var head = null;
      var tail = null;
      var tmp, fid;

      loop: while (true) {
        tmp = null;
        fid = null;

        switch (status) {
          case CONTINUE:
            switch (step.tag) {
              case MAP:
                if (head) {
                  tail = new Aff(CONS, head, tail);
                }

                head = new Aff(MAP, step._1, EMPTY, EMPTY);
                step = step._2;
                break;

              case APPLY:
                if (head) {
                  tail = new Aff(CONS, head, tail);
                }

                head = new Aff(APPLY, EMPTY, step._2, EMPTY);
                step = step._1;
                break;

              case ALT:
                if (head) {
                  tail = new Aff(CONS, head, tail);
                }

                head = new Aff(ALT, EMPTY, step._2, EMPTY);
                step = step._1;
                break;

              default:
                // When we hit a leaf value, we suspend the stack in the `FORKED`.
                // When the fiber resolves, it can bubble back up the tree.
                fid = fiberId++;
                status = RETURN;
                tmp = step;
                step = new Aff(FORKED, fid, new Aff(CONS, head, tail), EMPTY);
                tmp = Fiber(util, supervisor, tmp);
                tmp.onComplete({
                  rethrow: false,
                  handler: resolve(step)
                })();
                fibers[fid] = tmp;

                if (supervisor) {
                  supervisor.register(tmp);
                }

            }

            break;

          case RETURN:
            // Terminal case, we are back at the root.
            if (head === null) {
              break loop;
            } // If we are done with the right side, we need to continue down the
            // left. Otherwise we should continue up the stack.


            if (head._1 === EMPTY) {
              head._1 = step;
              status = CONTINUE;
              step = head._2;
              head._2 = EMPTY;
            } else {
              head._2 = step;
              step = head;

              if (tail === null) {
                head = null;
              } else {
                head = tail._1;
                tail = tail._2;
              }
            }

        }
      } // Keep a reference to the tree root so it can be cancelled.


      root = step;

      for (fid = 0; fid < fiberId; fid++) {
        fibers[fid].run();
      }
    } // Cancels the entire tree. If there are already subtrees being canceled,
    // we need to first cancel those joins. We will then add fresh joins for
    // all pending branches including those that were in the process of being
    // canceled.


    function cancel(error, cb) {
      interrupt = util.left(error);
      var innerKills;

      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];

          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }

      kills = null;
      var newKills = kill(error, root, cb);
      return function (killError) {
        return new Aff(ASYNC, function (killCb) {
          return function () {
            for (var kid in newKills) {
              if (newKills.hasOwnProperty(kid)) {
                newKills[kid]();
              }
            }

            return nonCanceler;
          };
        });
      };
    }

    run();
    return function (killError) {
      return new Aff(ASYNC, function (killCb) {
        return function () {
          return cancel(killError, killCb);
        };
      });
    };
  }

  function sequential(util, supervisor, par) {
    return new Aff(ASYNC, function (cb) {
      return function () {
        return runPar(util, supervisor, par, cb);
      };
    });
  }

  Aff.EMPTY = EMPTY;
  Aff.Pure = AffCtr(PURE);
  Aff.Throw = AffCtr(THROW);
  Aff.Catch = AffCtr(CATCH);
  Aff.Sync = AffCtr(SYNC);
  Aff.Async = AffCtr(ASYNC);
  Aff.Bind = AffCtr(BIND);
  Aff.Bracket = AffCtr(BRACKET);
  Aff.Fork = AffCtr(FORK);
  Aff.Seq = AffCtr(SEQ);
  Aff.ParMap = AffCtr(MAP);
  Aff.ParApply = AffCtr(APPLY);
  Aff.ParAlt = AffCtr(ALT);
  Aff.Fiber = Fiber;
  Aff.Supervisor = Supervisor;
  Aff.Scheduler = Scheduler;
  Aff.nonCanceler = nonCanceler;
  return Aff;
}();

exports._pure = Aff.Pure;
exports._throwError = Aff.Throw;

exports._catchError = function (aff) {
  return function (k) {
    return Aff.Catch(aff, k);
  };
};

exports._map = function (f) {
  return function (aff) {
    if (aff.tag === Aff.Pure.tag) {
      return Aff.Pure(f(aff._1));
    } else {
      return Aff.Bind(aff, function (value) {
        return Aff.Pure(f(value));
      });
    }
  };
};

exports._bind = function (aff) {
  return function (k) {
    return Aff.Bind(aff, k);
  };
};

exports._fork = function (immediate) {
  return function (aff) {
    return Aff.Fork(immediate, aff);
  };
};

exports._liftEffect = Aff.Sync;

exports._parAffMap = function (f) {
  return function (aff) {
    return Aff.ParMap(f, aff);
  };
};

exports._parAffApply = function (aff1) {
  return function (aff2) {
    return Aff.ParApply(aff1, aff2);
  };
};

exports._parAffAlt = function (aff1) {
  return function (aff2) {
    return Aff.ParAlt(aff1, aff2);
  };
};

exports.makeAff = Aff.Async;

exports.generalBracket = function (acquire) {
  return function (options) {
    return function (k) {
      return Aff.Bracket(acquire, options, k);
    };
  };
};

exports._makeFiber = function (util, aff) {
  return function () {
    return Aff.Fiber(util, null, aff);
  };
};

exports._makeSupervisedFiber = function (util, aff) {
  return function () {
    var supervisor = Aff.Supervisor(util);
    return {
      fiber: Aff.Fiber(util, supervisor, aff),
      supervisor: supervisor
    };
  };
};

exports._killAll = function (error, supervisor, cb) {
  return supervisor.killAll(error, cb);
};

exports._delay = function () {
  function setDelay(n, k) {
    if (n === 0 && typeof setImmediate !== "undefined") {
      return setImmediate(k);
    } else {
      return setTimeout(k, n);
    }
  }

  function clearDelay(n, t) {
    if (n === 0 && typeof clearImmediate !== "undefined") {
      return clearImmediate(t);
    } else {
      return clearTimeout(t);
    }
  }

  return function (right, ms) {
    return Aff.Async(function (cb) {
      return function () {
        var timer = setDelay(ms, cb(right()));
        return function () {
          return Aff.Sync(function () {
            return right(clearDelay(ms, timer));
          });
        };
      };
    });
  };
}();

exports._sequential = Aff.Seq;
},{}],"output/Effect.Exception/foreign.js":[function(require,module,exports) {
"use strict";

exports.showErrorImpl = function (err) {
  return err.stack || err.toString();
};

exports.error = function (msg) {
  return new Error(msg);
};

exports.message = function (e) {
  return e.message;
};

exports.name = function (e) {
  return e.name || "Error";
};

exports.stackImpl = function (just) {
  return function (nothing) {
    return function (e) {
      return e.stack ? just(e.stack) : nothing;
    };
  };
};

exports.throwException = function (e) {
  return function () {
    throw e;
  };
};

exports.catchException = function (c) {
  return function (t) {
    return function () {
      try {
        return t();
      } catch (e) {
        if (e instanceof Error || Object.prototype.toString.call(e) === "[object Error]") {
          return c(e)();
        } else {
          return c(new Error(e.toString()))();
        }
      }
    };
  };
};
},{}],"output/Effect.Exception/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Data_Either = require("../Data.Either/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Show = require("../Data.Show/index.js");

var Effect = require("../Effect/index.js");

var $$try = function $$try(action) {
  return $foreign.catchException(function () {
    var $0 = Control_Applicative.pure(Effect.applicativeEffect);
    return function ($1) {
      return $0(Data_Either.Left.create($1));
    };
  }())(Data_Functor.map(Effect.functorEffect)(Data_Either.Right.create)(action));
};

var $$throw = function $$throw($2) {
  return $foreign.throwException($foreign.error($2));
};

var stack = $foreign.stackImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var showError = new Data_Show.Show($foreign.showErrorImpl);
module.exports = {
  stack: stack,
  "throw": $$throw,
  "try": $$try,
  showError: showError,
  error: $foreign.error,
  message: $foreign.message,
  name: $foreign.name,
  throwException: $foreign.throwException,
  catchException: $foreign.catchException
};
},{"./foreign.js":"output/Effect.Exception/foreign.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Data.Either/index.js":"output/Data.Either/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Effect/index.js":"output/Effect/index.js"}],"output/Control.Monad.Error.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Data_Either = require("../Data.Either/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Effect = require("../Effect/index.js");

var Effect_Exception = require("../Effect.Exception/index.js");

var MonadThrow = function MonadThrow(Monad0, throwError) {
  this.Monad0 = Monad0;
  this.throwError = throwError;
};

var MonadError = function MonadError(MonadThrow0, catchError) {
  this.MonadThrow0 = MonadThrow0;
  this.catchError = catchError;
};

var throwError = function throwError(dict) {
  return dict.throwError;
};

var monadThrowMaybe = new MonadThrow(function () {
  return Data_Maybe.monadMaybe;
}, Data_Function["const"](Data_Maybe.Nothing.value));
var monadThrowEither = new MonadThrow(function () {
  return Data_Either.monadEither;
}, Data_Either.Left.create);
var monadThrowEffect = new MonadThrow(function () {
  return Effect.monadEffect;
}, Effect_Exception.throwException);
var monadErrorMaybe = new MonadError(function () {
  return monadThrowMaybe;
}, function (v) {
  return function (v1) {
    if (v instanceof Data_Maybe.Nothing) {
      return v1(Data_Unit.unit);
    }

    ;

    if (v instanceof Data_Maybe.Just) {
      return new Data_Maybe.Just(v.value0);
    }

    ;
    throw new Error("Failed pattern match at Control.Monad.Error.Class (line 79, column 1 - line 81, column 33): " + [v.constructor.name, v1.constructor.name]);
  };
});
var monadErrorEither = new MonadError(function () {
  return monadThrowEither;
}, function (v) {
  return function (v1) {
    if (v instanceof Data_Either.Left) {
      return v1(v.value0);
    }

    ;

    if (v instanceof Data_Either.Right) {
      return new Data_Either.Right(v.value0);
    }

    ;
    throw new Error("Failed pattern match at Control.Monad.Error.Class (line 72, column 1 - line 74, column 35): " + [v.constructor.name, v1.constructor.name]);
  };
});
var monadErrorEffect = new MonadError(function () {
  return monadThrowEffect;
}, Data_Function.flip(Effect_Exception.catchException));

var catchError = function catchError(dict) {
  return dict.catchError;
};

var catchJust = function catchJust(dictMonadError) {
  return function (p) {
    return function (act) {
      return function (handler) {
        var handle = function handle(e) {
          var v = p(e);

          if (v instanceof Data_Maybe.Nothing) {
            return throwError(dictMonadError.MonadThrow0())(e);
          }

          ;

          if (v instanceof Data_Maybe.Just) {
            return handler(v.value0);
          }

          ;
          throw new Error("Failed pattern match at Control.Monad.Error.Class (line 57, column 5 - line 59, column 26): " + [v.constructor.name]);
        };

        return catchError(dictMonadError)(act)(handle);
      };
    };
  };
};

var $$try = function $$try(dictMonadError) {
  return function (a) {
    return catchError(dictMonadError)(Data_Functor.map(dictMonadError.MonadThrow0().Monad0().Bind1().Apply0().Functor0())(Data_Either.Right.create)(a))(function () {
      var $17 = Control_Applicative.pure(dictMonadError.MonadThrow0().Monad0().Applicative0());
      return function ($18) {
        return $17(Data_Either.Left.create($18));
      };
    }());
  };
};

var withResource = function withResource(dictMonadError) {
  return function (acquire) {
    return function (release) {
      return function (kleisli) {
        return Control_Bind.bind(dictMonadError.MonadThrow0().Monad0().Bind1())(acquire)(function (resource) {
          return Control_Bind.bind(dictMonadError.MonadThrow0().Monad0().Bind1())($$try(dictMonadError)(kleisli(resource)))(function (result) {
            return Control_Bind.discard(Control_Bind.discardUnit)(dictMonadError.MonadThrow0().Monad0().Bind1())(release(resource))(function () {
              return Data_Either.either(throwError(dictMonadError.MonadThrow0()))(Control_Applicative.pure(dictMonadError.MonadThrow0().Monad0().Applicative0()))(result);
            });
          });
        });
      };
    };
  };
};

module.exports = {
  catchError: catchError,
  throwError: throwError,
  MonadThrow: MonadThrow,
  MonadError: MonadError,
  catchJust: catchJust,
  "try": $$try,
  withResource: withResource,
  monadThrowEither: monadThrowEither,
  monadErrorEither: monadErrorEither,
  monadThrowMaybe: monadThrowMaybe,
  monadErrorMaybe: monadErrorMaybe,
  monadThrowEffect: monadThrowEffect,
  monadErrorEffect: monadErrorEffect
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Data.Either/index.js":"output/Data.Either/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Effect/index.js":"output/Effect/index.js","../Effect.Exception/index.js":"output/Effect.Exception/index.js"}],"output/Control.Monad.Cont.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var MonadCont = function MonadCont(Monad0, callCC) {
  this.Monad0 = Monad0;
  this.callCC = callCC;
};

var callCC = function callCC(dict) {
  return dict.callCC;
};

module.exports = {
  MonadCont: MonadCont,
  callCC: callCC
};
},{}],"output/Control.Monad.Reader.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Category = require("../Control.Category/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var MonadAsk = function MonadAsk(Monad0, ask) {
  this.Monad0 = Monad0;
  this.ask = ask;
};

var MonadReader = function MonadReader(MonadAsk0, local) {
  this.MonadAsk0 = MonadAsk0;
  this.local = local;
};

var monadAskFun = new MonadAsk(function () {
  return Control_Monad.monadFn;
}, Control_Category.identity(Control_Category.categoryFn));
var monadReaderFun = new MonadReader(function () {
  return monadAskFun;
}, Control_Semigroupoid.composeFlipped(Control_Semigroupoid.semigroupoidFn));

var local = function local(dict) {
  return dict.local;
};

var ask = function ask(dict) {
  return dict.ask;
};

var asks = function asks(dictMonadAsk) {
  return function (f) {
    return Data_Functor.map(dictMonadAsk.Monad0().Bind1().Apply0().Functor0())(f)(ask(dictMonadAsk));
  };
};

module.exports = {
  ask: ask,
  local: local,
  MonadAsk: MonadAsk,
  asks: asks,
  MonadReader: MonadReader,
  monadAskFun: monadAskFun,
  monadReaderFun: monadReaderFun
};
},{"../Control.Category/index.js":"output/Control.Category/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Semigroupoid/index.js":"output/Control.Semigroupoid/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js"}],"output/Control.Monad.State.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Data_Tuple = require("../Data.Tuple/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var MonadState = function MonadState(Monad0, state) {
  this.Monad0 = Monad0;
  this.state = state;
};

var state = function state(dict) {
  return dict.state;
};

var put = function put(dictMonadState) {
  return function (s) {
    return state(dictMonadState)(function (v) {
      return new Data_Tuple.Tuple(Data_Unit.unit, s);
    });
  };
};

var modify_ = function modify_(dictMonadState) {
  return function (f) {
    return state(dictMonadState)(function (s) {
      return new Data_Tuple.Tuple(Data_Unit.unit, f(s));
    });
  };
};

var modify = function modify(dictMonadState) {
  return function (f) {
    return state(dictMonadState)(function (s) {
      var s$prime = f(s);
      return new Data_Tuple.Tuple(s$prime, s$prime);
    });
  };
};

var gets = function gets(dictMonadState) {
  return function (f) {
    return state(dictMonadState)(function (s) {
      return new Data_Tuple.Tuple(f(s), s);
    });
  };
};

var get = function get(dictMonadState) {
  return state(dictMonadState)(function (s) {
    return new Data_Tuple.Tuple(s, s);
  });
};

module.exports = {
  state: state,
  MonadState: MonadState,
  get: get,
  gets: gets,
  put: put,
  modify: modify,
  modify_: modify_
};
},{"../Data.Tuple/index.js":"output/Data.Tuple/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js"}],"output/Control.Monad.Trans.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var MonadTrans = function MonadTrans(lift) {
  this.lift = lift;
};

var lift = function lift(dict) {
  return dict.lift;
};

module.exports = {
  lift: lift,
  MonadTrans: MonadTrans
};
},{}],"output/Effect.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Category = require("../Control.Category/index.js");

var Effect = require("../Effect/index.js");

var MonadEffect = function MonadEffect(Monad0, liftEffect) {
  this.Monad0 = Monad0;
  this.liftEffect = liftEffect;
};

var monadEffectEffect = new MonadEffect(function () {
  return Effect.monadEffect;
}, Control_Category.identity(Control_Category.categoryFn));

var liftEffect = function liftEffect(dict) {
  return dict.liftEffect;
};

module.exports = {
  liftEffect: liftEffect,
  MonadEffect: MonadEffect,
  monadEffectEffect: monadEffectEffect
};
},{"../Control.Category/index.js":"output/Control.Category/index.js","../Effect/index.js":"output/Effect/index.js"}],"output/Control.Monad.Cont.Trans/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Monad_Cont_Class = require("../Control.Monad.Cont.Class/index.js");

var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");

var Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");

var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Effect_Class = require("../Effect.Class/index.js");

var ContT = function ContT(x) {
  return x;
};

var withContT = function withContT(f) {
  return function (v) {
    return function (k) {
      return v(f(k));
    };
  };
};

var runContT = function runContT(v) {
  return function (k) {
    return v(k);
  };
};

var newtypeContT = new Data_Newtype.Newtype(function (n) {
  return n;
}, ContT);
var monadTransContT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
  return function (m) {
    return function (k) {
      return Control_Bind.bind(dictMonad.Bind1())(m)(k);
    };
  };
});

var mapContT = function mapContT(f) {
  return function (v) {
    return function (k) {
      return f(v(k));
    };
  };
};

var functorContT = function functorContT(dictFunctor) {
  return new Data_Functor.Functor(function (f) {
    return function (v) {
      return function (k) {
        return v(function (a) {
          return k(f(a));
        });
      };
    };
  });
};

var applyContT = function applyContT(dictApply) {
  return new Control_Apply.Apply(function () {
    return functorContT(dictApply.Functor0());
  }, function (v) {
    return function (v1) {
      return function (k) {
        return v(function (g) {
          return v1(function (a) {
            return k(g(a));
          });
        });
      };
    };
  });
};

var bindContT = function bindContT(dictBind) {
  return new Control_Bind.Bind(function () {
    return applyContT(dictBind.Apply0());
  }, function (v) {
    return function (k) {
      return function (k$prime) {
        return v(function (a) {
          var v1 = k(a);
          return v1(k$prime);
        });
      };
    };
  });
};

var applicativeContT = function applicativeContT(dictApplicative) {
  return new Control_Applicative.Applicative(function () {
    return applyContT(dictApplicative.Apply0());
  }, function (a) {
    return function (k) {
      return k(a);
    };
  });
};

var monadContT = function monadContT(dictMonad) {
  return new Control_Monad.Monad(function () {
    return applicativeContT(dictMonad.Applicative0());
  }, function () {
    return bindContT(dictMonad.Bind1());
  });
};

var monadAskContT = function monadAskContT(dictMonadAsk) {
  return new Control_Monad_Reader_Class.MonadAsk(function () {
    return monadContT(dictMonadAsk.Monad0());
  }, Control_Monad_Trans_Class.lift(monadTransContT)(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
};

var monadReaderContT = function monadReaderContT(dictMonadReader) {
  return new Control_Monad_Reader_Class.MonadReader(function () {
    return monadAskContT(dictMonadReader.MonadAsk0());
  }, function (f) {
    return function (v) {
      return function (k) {
        return Control_Bind.bind(dictMonadReader.MonadAsk0().Monad0().Bind1())(Control_Monad_Reader_Class.ask(dictMonadReader.MonadAsk0()))(function (r) {
          return Control_Monad_Reader_Class.local(dictMonadReader)(f)(v(function () {
            var $43 = Control_Monad_Reader_Class.local(dictMonadReader)(Data_Function["const"](r));
            return function ($44) {
              return $43(k($44));
            };
          }()));
        });
      };
    };
  });
};

var monadContContT = function monadContContT(dictMonad) {
  return new Control_Monad_Cont_Class.MonadCont(function () {
    return monadContT(dictMonad);
  }, function (f) {
    return function (k) {
      var v = f(function (a) {
        return function (v1) {
          return k(a);
        };
      });
      return v(k);
    };
  });
};

var monadEffectContT = function monadEffectContT(dictMonadEffect) {
  return new Effect_Class.MonadEffect(function () {
    return monadContT(dictMonadEffect.Monad0());
  }, function () {
    var $45 = Control_Monad_Trans_Class.lift(monadTransContT)(dictMonadEffect.Monad0());
    var $46 = Effect_Class.liftEffect(dictMonadEffect);
    return function ($47) {
      return $45($46($47));
    };
  }());
};

var monadStateContT = function monadStateContT(dictMonadState) {
  return new Control_Monad_State_Class.MonadState(function () {
    return monadContT(dictMonadState.Monad0());
  }, function () {
    var $48 = Control_Monad_Trans_Class.lift(monadTransContT)(dictMonadState.Monad0());
    var $49 = Control_Monad_State_Class.state(dictMonadState);
    return function ($50) {
      return $48($49($50));
    };
  }());
};

module.exports = {
  ContT: ContT,
  runContT: runContT,
  mapContT: mapContT,
  withContT: withContT,
  newtypeContT: newtypeContT,
  monadContContT: monadContContT,
  functorContT: functorContT,
  applyContT: applyContT,
  applicativeContT: applicativeContT,
  bindContT: bindContT,
  monadContT: monadContT,
  monadTransContT: monadTransContT,
  monadEffectContT: monadEffectContT,
  monadAskContT: monadAskContT,
  monadReaderContT: monadReaderContT,
  monadStateContT: monadStateContT
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Monad.Cont.Class/index.js":"output/Control.Monad.Cont.Class/index.js","../Control.Monad.Reader.Class/index.js":"output/Control.Monad.Reader.Class/index.js","../Control.Monad.State.Class/index.js":"output/Control.Monad.State.Class/index.js","../Control.Monad.Trans.Class/index.js":"output/Control.Monad.Trans.Class/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Effect.Class/index.js":"output/Effect.Class/index.js"}],"output/Control.Monad.Writer.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var MonadTell = function MonadTell(Monad0, tell) {
  this.Monad0 = Monad0;
  this.tell = tell;
};

var MonadWriter = function MonadWriter(MonadTell0, listen, pass) {
  this.MonadTell0 = MonadTell0;
  this.listen = listen;
  this.pass = pass;
};

var tell = function tell(dict) {
  return dict.tell;
};

var pass = function pass(dict) {
  return dict.pass;
};

var listen = function listen(dict) {
  return dict.listen;
};

var listens = function listens(dictMonadWriter) {
  return function (f) {
    return function (m) {
      return Control_Bind.bind(dictMonadWriter.MonadTell0().Monad0().Bind1())(listen(dictMonadWriter)(m))(function (v) {
        return Control_Applicative.pure(dictMonadWriter.MonadTell0().Monad0().Applicative0())(new Data_Tuple.Tuple(v.value0, f(v.value1)));
      });
    };
  };
};

var censor = function censor(dictMonadWriter) {
  return function (f) {
    return function (m) {
      return pass(dictMonadWriter)(Control_Bind.bind(dictMonadWriter.MonadTell0().Monad0().Bind1())(m)(function (a) {
        return Control_Applicative.pure(dictMonadWriter.MonadTell0().Monad0().Applicative0())(new Data_Tuple.Tuple(a, f));
      }));
    };
  };
};

module.exports = {
  listen: listen,
  pass: pass,
  tell: tell,
  MonadTell: MonadTell,
  MonadWriter: MonadWriter,
  listens: listens,
  censor: censor
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js"}],"output/Control.MonadPlus/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_MonadZero = require("../Control.MonadZero/index.js");

var MonadPlus = function MonadPlus(MonadZero0) {
  this.MonadZero0 = MonadZero0;
};

var monadPlusArray = new MonadPlus(function () {
  return Control_MonadZero.monadZeroArray;
});
module.exports = {
  MonadPlus: MonadPlus,
  monadPlusArray: monadPlusArray
};
},{"../Control.MonadZero/index.js":"output/Control.MonadZero/index.js"}],"output/Control.Monad.Except.Trans/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Category = require("../Control.Category/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Monad_Cont_Class = require("../Control.Monad.Cont.Class/index.js");

var Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");

var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");

var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");

var Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");

var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");

var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");

var Control_MonadPlus = require("../Control.MonadPlus/index.js");

var Control_MonadZero = require("../Control.MonadZero/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Either = require("../Data.Either/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var Effect_Class = require("../Effect.Class/index.js");

var ExceptT = function ExceptT(x) {
  return x;
};

var withExceptT = function withExceptT(dictFunctor) {
  return function (f) {
    return function (v) {
      var mapLeft = function mapLeft(v1) {
        return function (v2) {
          if (v2 instanceof Data_Either.Right) {
            return new Data_Either.Right(v2.value0);
          }

          ;

          if (v2 instanceof Data_Either.Left) {
            return new Data_Either.Left(v1(v2.value0));
          }

          ;
          throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 42, column 3 - line 42, column 32): " + [v1.constructor.name, v2.constructor.name]);
        };
      };

      return ExceptT(Data_Functor.map(dictFunctor)(mapLeft(f))(v));
    };
  };
};

var runExceptT = function runExceptT(v) {
  return v;
};

var newtypeExceptT = new Data_Newtype.Newtype(function (n) {
  return n;
}, ExceptT);
var monadTransExceptT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
  return function (m) {
    return Control_Bind.bind(dictMonad.Bind1())(m)(function (a) {
      return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(a));
    });
  };
});

var mapExceptT = function mapExceptT(f) {
  return function (v) {
    return f(v);
  };
};

var functorExceptT = function functorExceptT(dictFunctor) {
  return new Data_Functor.Functor(function (f) {
    return mapExceptT(Data_Functor.map(dictFunctor)(Data_Functor.map(Data_Either.functorEither)(f)));
  });
};

var except = function except(dictApplicative) {
  var $88 = Control_Applicative.pure(dictApplicative);
  return function ($89) {
    return ExceptT($88($89));
  };
};

var monadExceptT = function monadExceptT(dictMonad) {
  return new Control_Monad.Monad(function () {
    return applicativeExceptT(dictMonad);
  }, function () {
    return bindExceptT(dictMonad);
  });
};

var bindExceptT = function bindExceptT(dictMonad) {
  return new Control_Bind.Bind(function () {
    return applyExceptT(dictMonad);
  }, function (v) {
    return function (k) {
      return Control_Bind.bind(dictMonad.Bind1())(v)(Data_Either.either(function () {
        var $90 = Control_Applicative.pure(dictMonad.Applicative0());
        return function ($91) {
          return $90(Data_Either.Left.create($91));
        };
      }())(function (a) {
        var v1 = k(a);
        return v1;
      }));
    };
  });
};

var applyExceptT = function applyExceptT(dictMonad) {
  return new Control_Apply.Apply(function () {
    return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
  }, Control_Monad.ap(monadExceptT(dictMonad)));
};

var applicativeExceptT = function applicativeExceptT(dictMonad) {
  return new Control_Applicative.Applicative(function () {
    return applyExceptT(dictMonad);
  }, function () {
    var $92 = Control_Applicative.pure(dictMonad.Applicative0());
    return function ($93) {
      return ExceptT($92(Data_Either.Right.create($93)));
    };
  }());
};

var monadAskExceptT = function monadAskExceptT(dictMonadAsk) {
  return new Control_Monad_Reader_Class.MonadAsk(function () {
    return monadExceptT(dictMonadAsk.Monad0());
  }, Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
};

var monadReaderExceptT = function monadReaderExceptT(dictMonadReader) {
  return new Control_Monad_Reader_Class.MonadReader(function () {
    return monadAskExceptT(dictMonadReader.MonadAsk0());
  }, function (f) {
    return mapExceptT(Control_Monad_Reader_Class.local(dictMonadReader)(f));
  });
};

var monadContExceptT = function monadContExceptT(dictMonadCont) {
  return new Control_Monad_Cont_Class.MonadCont(function () {
    return monadExceptT(dictMonadCont.Monad0());
  }, function (f) {
    return ExceptT(Control_Monad_Cont_Class.callCC(dictMonadCont)(function (c) {
      var v = f(function (a) {
        return ExceptT(c(new Data_Either.Right(a)));
      });
      return v;
    }));
  });
};

var monadEffectExceptT = function monadEffectExceptT(dictMonadEffect) {
  return new Effect_Class.MonadEffect(function () {
    return monadExceptT(dictMonadEffect.Monad0());
  }, function () {
    var $94 = Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadEffect.Monad0());
    var $95 = Effect_Class.liftEffect(dictMonadEffect);
    return function ($96) {
      return $94($95($96));
    };
  }());
};

var monadRecExceptT = function monadRecExceptT(dictMonadRec) {
  return new Control_Monad_Rec_Class.MonadRec(function () {
    return monadExceptT(dictMonadRec.Monad0());
  }, function (f) {
    var $97 = Control_Monad_Rec_Class.tailRecM(dictMonadRec)(function (a) {
      var v = f(a);
      return Control_Bind.bind(dictMonadRec.Monad0().Bind1())(v)(function (m$prime) {
        return Control_Applicative.pure(dictMonadRec.Monad0().Applicative0())(function () {
          if (m$prime instanceof Data_Either.Left) {
            return new Control_Monad_Rec_Class.Done(new Data_Either.Left(m$prime.value0));
          }

          ;

          if (m$prime instanceof Data_Either.Right && m$prime.value0 instanceof Control_Monad_Rec_Class.Loop) {
            return new Control_Monad_Rec_Class.Loop(m$prime.value0.value0);
          }

          ;

          if (m$prime instanceof Data_Either.Right && m$prime.value0 instanceof Control_Monad_Rec_Class.Done) {
            return new Control_Monad_Rec_Class.Done(new Data_Either.Right(m$prime.value0.value0));
          }

          ;
          throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 74, column 14 - line 77, column 43): " + [m$prime.constructor.name]);
        }());
      });
    });
    return function ($98) {
      return ExceptT($97($98));
    };
  });
};

var monadStateExceptT = function monadStateExceptT(dictMonadState) {
  return new Control_Monad_State_Class.MonadState(function () {
    return monadExceptT(dictMonadState.Monad0());
  }, function (f) {
    return Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadState.Monad0())(Control_Monad_State_Class.state(dictMonadState)(f));
  });
};

var monadTellExceptT = function monadTellExceptT(dictMonadTell) {
  return new Control_Monad_Writer_Class.MonadTell(function () {
    return monadExceptT(dictMonadTell.Monad0());
  }, function () {
    var $99 = Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadTell.Monad0());
    var $100 = Control_Monad_Writer_Class.tell(dictMonadTell);
    return function ($101) {
      return $99($100($101));
    };
  }());
};

var monadWriterExceptT = function monadWriterExceptT(dictMonadWriter) {
  return new Control_Monad_Writer_Class.MonadWriter(function () {
    return monadTellExceptT(dictMonadWriter.MonadTell0());
  }, mapExceptT(function (m) {
    return Control_Bind.bind(dictMonadWriter.MonadTell0().Monad0().Bind1())(Control_Monad_Writer_Class.listen(dictMonadWriter)(m))(function (v) {
      return Control_Applicative.pure(dictMonadWriter.MonadTell0().Monad0().Applicative0())(Data_Functor.map(Data_Either.functorEither)(function (r) {
        return new Data_Tuple.Tuple(r, v.value1);
      })(v.value0));
    });
  }), mapExceptT(function (m) {
    return Control_Monad_Writer_Class.pass(dictMonadWriter)(Control_Bind.bind(dictMonadWriter.MonadTell0().Monad0().Bind1())(m)(function (a) {
      return Control_Applicative.pure(dictMonadWriter.MonadTell0().Monad0().Applicative0())(function () {
        if (a instanceof Data_Either.Left) {
          return new Data_Tuple.Tuple(new Data_Either.Left(a.value0), Control_Category.identity(Control_Category.categoryFn));
        }

        ;

        if (a instanceof Data_Either.Right) {
          return new Data_Tuple.Tuple(new Data_Either.Right(a.value0.value0), a.value0.value1);
        }

        ;
        throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 136, column 10 - line 138, column 45): " + [a.constructor.name]);
      }());
    }));
  }));
};

var monadThrowExceptT = function monadThrowExceptT(dictMonad) {
  return new Control_Monad_Error_Class.MonadThrow(function () {
    return monadExceptT(dictMonad);
  }, function () {
    var $102 = Control_Applicative.pure(dictMonad.Applicative0());
    return function ($103) {
      return ExceptT($102(Data_Either.Left.create($103)));
    };
  }());
};

var monadErrorExceptT = function monadErrorExceptT(dictMonad) {
  return new Control_Monad_Error_Class.MonadError(function () {
    return monadThrowExceptT(dictMonad);
  }, function (v) {
    return function (k) {
      return Control_Bind.bind(dictMonad.Bind1())(v)(Data_Either.either(function (a) {
        var v1 = k(a);
        return v1;
      })(function () {
        var $104 = Control_Applicative.pure(dictMonad.Applicative0());
        return function ($105) {
          return $104(Data_Either.Right.create($105));
        };
      }()));
    };
  });
};

var altExceptT = function altExceptT(dictSemigroup) {
  return function (dictMonad) {
    return new Control_Alt.Alt(function () {
      return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    }, function (v) {
      return function (v1) {
        return Control_Bind.bind(dictMonad.Bind1())(v)(function (rm) {
          if (rm instanceof Data_Either.Right) {
            return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(rm.value0));
          }

          ;

          if (rm instanceof Data_Either.Left) {
            return Control_Bind.bind(dictMonad.Bind1())(v1)(function (rn) {
              if (rn instanceof Data_Either.Right) {
                return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(rn.value0));
              }

              ;

              if (rn instanceof Data_Either.Left) {
                return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Left(Data_Semigroup.append(dictSemigroup)(rm.value0)(rn.value0)));
              }

              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn.constructor.name]);
            });
          }

          ;
          throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
        });
      };
    });
  };
};

var plusExceptT = function plusExceptT(dictMonoid) {
  return function (dictMonad) {
    return new Control_Plus.Plus(function () {
      return altExceptT(dictMonoid.Semigroup0())(dictMonad);
    }, Control_Monad_Error_Class.throwError(monadThrowExceptT(dictMonad))(Data_Monoid.mempty(dictMonoid)));
  };
};

var alternativeExceptT = function alternativeExceptT(dictMonoid) {
  return function (dictMonad) {
    return new Control_Alternative.Alternative(function () {
      return applicativeExceptT(dictMonad);
    }, function () {
      return plusExceptT(dictMonoid)(dictMonad);
    });
  };
};

var monadZeroExceptT = function monadZeroExceptT(dictMonoid) {
  return function (dictMonad) {
    return new Control_MonadZero.MonadZero(function () {
      return alternativeExceptT(dictMonoid)(dictMonad);
    }, function () {
      return monadExceptT(dictMonad);
    });
  };
};

var monadPlusExceptT = function monadPlusExceptT(dictMonoid) {
  return function (dictMonad) {
    return new Control_MonadPlus.MonadPlus(function () {
      return monadZeroExceptT(dictMonoid)(dictMonad);
    });
  };
};

module.exports = {
  ExceptT: ExceptT,
  runExceptT: runExceptT,
  withExceptT: withExceptT,
  mapExceptT: mapExceptT,
  except: except,
  newtypeExceptT: newtypeExceptT,
  functorExceptT: functorExceptT,
  applyExceptT: applyExceptT,
  applicativeExceptT: applicativeExceptT,
  bindExceptT: bindExceptT,
  monadExceptT: monadExceptT,
  monadRecExceptT: monadRecExceptT,
  altExceptT: altExceptT,
  plusExceptT: plusExceptT,
  alternativeExceptT: alternativeExceptT,
  monadPlusExceptT: monadPlusExceptT,
  monadZeroExceptT: monadZeroExceptT,
  monadTransExceptT: monadTransExceptT,
  monadEffectExceptT: monadEffectExceptT,
  monadContExceptT: monadContExceptT,
  monadThrowExceptT: monadThrowExceptT,
  monadErrorExceptT: monadErrorExceptT,
  monadAskExceptT: monadAskExceptT,
  monadReaderExceptT: monadReaderExceptT,
  monadStateExceptT: monadStateExceptT,
  monadTellExceptT: monadTellExceptT,
  monadWriterExceptT: monadWriterExceptT
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Monad.Cont.Class/index.js":"output/Control.Monad.Cont.Class/index.js","../Control.Monad.Error.Class/index.js":"output/Control.Monad.Error.Class/index.js","../Control.Monad.Reader.Class/index.js":"output/Control.Monad.Reader.Class/index.js","../Control.Monad.Rec.Class/index.js":"output/Control.Monad.Rec.Class/index.js","../Control.Monad.State.Class/index.js":"output/Control.Monad.State.Class/index.js","../Control.Monad.Trans.Class/index.js":"output/Control.Monad.Trans.Class/index.js","../Control.Monad.Writer.Class/index.js":"output/Control.Monad.Writer.Class/index.js","../Control.MonadPlus/index.js":"output/Control.MonadPlus/index.js","../Control.MonadZero/index.js":"output/Control.MonadZero/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Either/index.js":"output/Data.Either/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js","../Effect.Class/index.js":"output/Effect.Class/index.js"}],"output/Control.Monad.Maybe.Trans/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Category = require("../Control.Category/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Monad_Cont_Class = require("../Control.Monad.Cont.Class/index.js");

var Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");

var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");

var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");

var Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");

var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");

var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");

var Control_MonadPlus = require("../Control.MonadPlus/index.js");

var Control_MonadZero = require("../Control.MonadZero/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var Effect_Class = require("../Effect.Class/index.js");

var MaybeT = function MaybeT(x) {
  return x;
};

var runMaybeT = function runMaybeT(v) {
  return v;
};

var newtypeMaybeT = new Data_Newtype.Newtype(function (n) {
  return n;
}, MaybeT);
var monadTransMaybeT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
  var $71 = Control_Monad.liftM1(dictMonad)(Data_Maybe.Just.create);
  return function ($72) {
    return MaybeT($71($72));
  };
});

var mapMaybeT = function mapMaybeT(f) {
  return function (v) {
    return f(v);
  };
};

var functorMaybeT = function functorMaybeT(dictFunctor) {
  return new Data_Functor.Functor(function (f) {
    return function (v) {
      return Data_Functor.map(dictFunctor)(Data_Functor.map(Data_Maybe.functorMaybe)(f))(v);
    };
  });
};

var monadMaybeT = function monadMaybeT(dictMonad) {
  return new Control_Monad.Monad(function () {
    return applicativeMaybeT(dictMonad);
  }, function () {
    return bindMaybeT(dictMonad);
  });
};

var bindMaybeT = function bindMaybeT(dictMonad) {
  return new Control_Bind.Bind(function () {
    return applyMaybeT(dictMonad);
  }, function (v) {
    return function (f) {
      return Control_Bind.bind(dictMonad.Bind1())(v)(function (v1) {
        if (v1 instanceof Data_Maybe.Nothing) {
          return Control_Applicative.pure(dictMonad.Applicative0())(Data_Maybe.Nothing.value);
        }

        ;

        if (v1 instanceof Data_Maybe.Just) {
          var v2 = f(v1.value0);
          return v2;
        }

        ;
        throw new Error("Failed pattern match at Control.Monad.Maybe.Trans (line 54, column 11 - line 56, column 42): " + [v1.constructor.name]);
      });
    };
  });
};

var applyMaybeT = function applyMaybeT(dictMonad) {
  return new Control_Apply.Apply(function () {
    return functorMaybeT(dictMonad.Bind1().Apply0().Functor0());
  }, Control_Monad.ap(monadMaybeT(dictMonad)));
};

var applicativeMaybeT = function applicativeMaybeT(dictMonad) {
  return new Control_Applicative.Applicative(function () {
    return applyMaybeT(dictMonad);
  }, function () {
    var $73 = Control_Applicative.pure(dictMonad.Applicative0());
    return function ($74) {
      return MaybeT($73(Data_Maybe.Just.create($74)));
    };
  }());
};

var monadAskMaybeT = function monadAskMaybeT(dictMonadAsk) {
  return new Control_Monad_Reader_Class.MonadAsk(function () {
    return monadMaybeT(dictMonadAsk.Monad0());
  }, Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
};

var monadReaderMaybeT = function monadReaderMaybeT(dictMonadReader) {
  return new Control_Monad_Reader_Class.MonadReader(function () {
    return monadAskMaybeT(dictMonadReader.MonadAsk0());
  }, function (f) {
    return mapMaybeT(Control_Monad_Reader_Class.local(dictMonadReader)(f));
  });
};

var monadContMaybeT = function monadContMaybeT(dictMonadCont) {
  return new Control_Monad_Cont_Class.MonadCont(function () {
    return monadMaybeT(dictMonadCont.Monad0());
  }, function (f) {
    return MaybeT(Control_Monad_Cont_Class.callCC(dictMonadCont)(function (c) {
      var v = f(function (a) {
        return MaybeT(c(new Data_Maybe.Just(a)));
      });
      return v;
    }));
  });
};

var monadEffectMaybe = function monadEffectMaybe(dictMonadEffect) {
  return new Effect_Class.MonadEffect(function () {
    return monadMaybeT(dictMonadEffect.Monad0());
  }, function () {
    var $75 = Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadEffect.Monad0());
    var $76 = Effect_Class.liftEffect(dictMonadEffect);
    return function ($77) {
      return $75($76($77));
    };
  }());
};

var monadRecMaybeT = function monadRecMaybeT(dictMonadRec) {
  return new Control_Monad_Rec_Class.MonadRec(function () {
    return monadMaybeT(dictMonadRec.Monad0());
  }, function (f) {
    var $78 = Control_Monad_Rec_Class.tailRecM(dictMonadRec)(function (a) {
      var v = f(a);
      return Control_Bind.bind(dictMonadRec.Monad0().Bind1())(v)(function (m$prime) {
        return Control_Applicative.pure(dictMonadRec.Monad0().Applicative0())(function () {
          if (m$prime instanceof Data_Maybe.Nothing) {
            return new Control_Monad_Rec_Class.Done(Data_Maybe.Nothing.value);
          }

          ;

          if (m$prime instanceof Data_Maybe.Just && m$prime.value0 instanceof Control_Monad_Rec_Class.Loop) {
            return new Control_Monad_Rec_Class.Loop(m$prime.value0.value0);
          }

          ;

          if (m$prime instanceof Data_Maybe.Just && m$prime.value0 instanceof Control_Monad_Rec_Class.Done) {
            return new Control_Monad_Rec_Class.Done(new Data_Maybe.Just(m$prime.value0.value0));
          }

          ;
          throw new Error("Failed pattern match at Control.Monad.Maybe.Trans (line 84, column 16 - line 87, column 43): " + [m$prime.constructor.name]);
        }());
      });
    });
    return function ($79) {
      return MaybeT($78($79));
    };
  });
};

var monadStateMaybeT = function monadStateMaybeT(dictMonadState) {
  return new Control_Monad_State_Class.MonadState(function () {
    return monadMaybeT(dictMonadState.Monad0());
  }, function (f) {
    return Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadState.Monad0())(Control_Monad_State_Class.state(dictMonadState)(f));
  });
};

var monadTellMaybeT = function monadTellMaybeT(dictMonadTell) {
  return new Control_Monad_Writer_Class.MonadTell(function () {
    return monadMaybeT(dictMonadTell.Monad0());
  }, function () {
    var $80 = Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadTell.Monad0());
    var $81 = Control_Monad_Writer_Class.tell(dictMonadTell);
    return function ($82) {
      return $80($81($82));
    };
  }());
};

var monadWriterMaybeT = function monadWriterMaybeT(dictMonadWriter) {
  return new Control_Monad_Writer_Class.MonadWriter(function () {
    return monadTellMaybeT(dictMonadWriter.MonadTell0());
  }, mapMaybeT(function (m) {
    return Control_Bind.bind(dictMonadWriter.MonadTell0().Monad0().Bind1())(Control_Monad_Writer_Class.listen(dictMonadWriter)(m))(function (v) {
      return Control_Applicative.pure(dictMonadWriter.MonadTell0().Monad0().Applicative0())(Data_Functor.map(Data_Maybe.functorMaybe)(function (r) {
        return new Data_Tuple.Tuple(r, v.value1);
      })(v.value0));
    });
  }), mapMaybeT(function (m) {
    return Control_Monad_Writer_Class.pass(dictMonadWriter)(Control_Bind.bind(dictMonadWriter.MonadTell0().Monad0().Bind1())(m)(function (a) {
      return Control_Applicative.pure(dictMonadWriter.MonadTell0().Monad0().Applicative0())(function () {
        if (a instanceof Data_Maybe.Nothing) {
          return new Data_Tuple.Tuple(Data_Maybe.Nothing.value, Control_Category.identity(Control_Category.categoryFn));
        }

        ;

        if (a instanceof Data_Maybe.Just) {
          return new Data_Tuple.Tuple(new Data_Maybe.Just(a.value0.value0), a.value0.value1);
        }

        ;
        throw new Error("Failed pattern match at Control.Monad.Maybe.Trans (line 121, column 10 - line 123, column 43): " + [a.constructor.name]);
      }());
    }));
  }));
};

var monadThrowMaybeT = function monadThrowMaybeT(dictMonadThrow) {
  return new Control_Monad_Error_Class.MonadThrow(function () {
    return monadMaybeT(dictMonadThrow.Monad0());
  }, function (e) {
    return Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadThrow.Monad0())(Control_Monad_Error_Class.throwError(dictMonadThrow)(e));
  });
};

var monadErrorMaybeT = function monadErrorMaybeT(dictMonadError) {
  return new Control_Monad_Error_Class.MonadError(function () {
    return monadThrowMaybeT(dictMonadError.MonadThrow0());
  }, function (v) {
    return function (h) {
      return MaybeT(Control_Monad_Error_Class.catchError(dictMonadError)(v)(function (a) {
        var v1 = h(a);
        return v1;
      }));
    };
  });
};

var altMaybeT = function altMaybeT(dictMonad) {
  return new Control_Alt.Alt(function () {
    return functorMaybeT(dictMonad.Bind1().Apply0().Functor0());
  }, function (v) {
    return function (v1) {
      return Control_Bind.bind(dictMonad.Bind1())(v)(function (m) {
        if (m instanceof Data_Maybe.Nothing) {
          return v1;
        }

        ;
        return Control_Applicative.pure(dictMonad.Applicative0())(m);
      });
    };
  });
};

var plusMaybeT = function plusMaybeT(dictMonad) {
  return new Control_Plus.Plus(function () {
    return altMaybeT(dictMonad);
  }, Control_Applicative.pure(dictMonad.Applicative0())(Data_Maybe.Nothing.value));
};

var alternativeMaybeT = function alternativeMaybeT(dictMonad) {
  return new Control_Alternative.Alternative(function () {
    return applicativeMaybeT(dictMonad);
  }, function () {
    return plusMaybeT(dictMonad);
  });
};

var monadZeroMaybeT = function monadZeroMaybeT(dictMonad) {
  return new Control_MonadZero.MonadZero(function () {
    return alternativeMaybeT(dictMonad);
  }, function () {
    return monadMaybeT(dictMonad);
  });
};

var monadPlusMaybeT = function monadPlusMaybeT(dictMonad) {
  return new Control_MonadPlus.MonadPlus(function () {
    return monadZeroMaybeT(dictMonad);
  });
};

module.exports = {
  MaybeT: MaybeT,
  runMaybeT: runMaybeT,
  mapMaybeT: mapMaybeT,
  newtypeMaybeT: newtypeMaybeT,
  functorMaybeT: functorMaybeT,
  applyMaybeT: applyMaybeT,
  applicativeMaybeT: applicativeMaybeT,
  bindMaybeT: bindMaybeT,
  monadMaybeT: monadMaybeT,
  monadTransMaybeT: monadTransMaybeT,
  altMaybeT: altMaybeT,
  plusMaybeT: plusMaybeT,
  alternativeMaybeT: alternativeMaybeT,
  monadPlusMaybeT: monadPlusMaybeT,
  monadZeroMaybeT: monadZeroMaybeT,
  monadRecMaybeT: monadRecMaybeT,
  monadEffectMaybe: monadEffectMaybe,
  monadContMaybeT: monadContMaybeT,
  monadThrowMaybeT: monadThrowMaybeT,
  monadErrorMaybeT: monadErrorMaybeT,
  monadAskMaybeT: monadAskMaybeT,
  monadReaderMaybeT: monadReaderMaybeT,
  monadStateMaybeT: monadStateMaybeT,
  monadTellMaybeT: monadTellMaybeT,
  monadWriterMaybeT: monadWriterMaybeT
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Monad.Cont.Class/index.js":"output/Control.Monad.Cont.Class/index.js","../Control.Monad.Error.Class/index.js":"output/Control.Monad.Error.Class/index.js","../Control.Monad.Reader.Class/index.js":"output/Control.Monad.Reader.Class/index.js","../Control.Monad.Rec.Class/index.js":"output/Control.Monad.Rec.Class/index.js","../Control.Monad.State.Class/index.js":"output/Control.Monad.State.Class/index.js","../Control.Monad.Trans.Class/index.js":"output/Control.Monad.Trans.Class/index.js","../Control.Monad.Writer.Class/index.js":"output/Control.Monad.Writer.Class/index.js","../Control.MonadPlus/index.js":"output/Control.MonadPlus/index.js","../Control.MonadZero/index.js":"output/Control.MonadZero/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js","../Effect.Class/index.js":"output/Effect.Class/index.js"}],"output/Control.Monad.Reader.Trans/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Monad_Cont_Class = require("../Control.Monad.Cont.Class/index.js");

var Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");

var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");

var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");

var Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");

var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");

var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");

var Control_MonadPlus = require("../Control.MonadPlus/index.js");

var Control_MonadZero = require("../Control.MonadZero/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Distributive = require("../Data.Distributive/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Effect_Class = require("../Effect.Class/index.js");

var ReaderT = function ReaderT(x) {
  return x;
};

var withReaderT = function withReaderT(f) {
  return function (v) {
    return function ($66) {
      return v(f($66));
    };
  };
};

var runReaderT = function runReaderT(v) {
  return v;
};

var newtypeReaderT = new Data_Newtype.Newtype(function (n) {
  return n;
}, ReaderT);
var monadTransReaderT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
  return function ($67) {
    return ReaderT(Data_Function["const"]($67));
  };
});

var mapReaderT = function mapReaderT(f) {
  return function (v) {
    return function ($68) {
      return f(v($68));
    };
  };
};

var functorReaderT = function functorReaderT(dictFunctor) {
  return new Data_Functor.Functor(function () {
    var $69 = Data_Functor.map(dictFunctor);
    return function ($70) {
      return mapReaderT($69($70));
    };
  }());
};

var distributiveReaderT = function distributiveReaderT(dictDistributive) {
  return new Data_Distributive.Distributive(function () {
    return functorReaderT(dictDistributive.Functor0());
  }, function (dictFunctor) {
    return function (f) {
      var $71 = Data_Distributive.distribute(distributiveReaderT(dictDistributive))(dictFunctor);
      var $72 = Data_Functor.map(dictFunctor)(f);
      return function ($73) {
        return $71($72($73));
      };
    };
  }, function (dictFunctor) {
    return function (a) {
      return function (e) {
        return Data_Distributive.collect(dictDistributive)(dictFunctor)(function (r) {
          return r(e);
        })(a);
      };
    };
  });
};

var applyReaderT = function applyReaderT(dictApply) {
  return new Control_Apply.Apply(function () {
    return functorReaderT(dictApply.Functor0());
  }, function (v) {
    return function (v1) {
      return function (r) {
        return Control_Apply.apply(dictApply)(v(r))(v1(r));
      };
    };
  });
};

var bindReaderT = function bindReaderT(dictBind) {
  return new Control_Bind.Bind(function () {
    return applyReaderT(dictBind.Apply0());
  }, function (v) {
    return function (k) {
      return function (r) {
        return Control_Bind.bind(dictBind)(v(r))(function (a) {
          var v1 = k(a);
          return v1(r);
        });
      };
    };
  });
};

var semigroupReaderT = function semigroupReaderT(dictApply) {
  return function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(Control_Apply.lift2(applyReaderT(dictApply))(Data_Semigroup.append(dictSemigroup)));
  };
};

var applicativeReaderT = function applicativeReaderT(dictApplicative) {
  return new Control_Applicative.Applicative(function () {
    return applyReaderT(dictApplicative.Apply0());
  }, function () {
    var $74 = Control_Applicative.pure(dictApplicative);
    return function ($75) {
      return ReaderT(Data_Function["const"]($74($75)));
    };
  }());
};

var monadReaderT = function monadReaderT(dictMonad) {
  return new Control_Monad.Monad(function () {
    return applicativeReaderT(dictMonad.Applicative0());
  }, function () {
    return bindReaderT(dictMonad.Bind1());
  });
};

var monadAskReaderT = function monadAskReaderT(dictMonad) {
  return new Control_Monad_Reader_Class.MonadAsk(function () {
    return monadReaderT(dictMonad);
  }, Control_Applicative.pure(dictMonad.Applicative0()));
};

var monadReaderReaderT = function monadReaderReaderT(dictMonad) {
  return new Control_Monad_Reader_Class.MonadReader(function () {
    return monadAskReaderT(dictMonad);
  }, withReaderT);
};

var monadContReaderT = function monadContReaderT(dictMonadCont) {
  return new Control_Monad_Cont_Class.MonadCont(function () {
    return monadReaderT(dictMonadCont.Monad0());
  }, function (f) {
    return function (r) {
      return Control_Monad_Cont_Class.callCC(dictMonadCont)(function (c) {
        var v = f(function ($76) {
          return ReaderT(Data_Function["const"](c($76)));
        });
        return v(r);
      });
    };
  });
};

var monadEffectReader = function monadEffectReader(dictMonadEffect) {
  return new Effect_Class.MonadEffect(function () {
    return monadReaderT(dictMonadEffect.Monad0());
  }, function () {
    var $77 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadEffect.Monad0());
    var $78 = Effect_Class.liftEffect(dictMonadEffect);
    return function ($79) {
      return $77($78($79));
    };
  }());
};

var monadRecReaderT = function monadRecReaderT(dictMonadRec) {
  return new Control_Monad_Rec_Class.MonadRec(function () {
    return monadReaderT(dictMonadRec.Monad0());
  }, function (k) {
    return function (a) {
      var k$prime = function k$prime(r) {
        return function (a$prime) {
          var v = k(a$prime);
          return Control_Bind.bindFlipped(dictMonadRec.Monad0().Bind1())(Control_Applicative.pure(dictMonadRec.Monad0().Applicative0()))(v(r));
        };
      };

      return function (r) {
        return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(k$prime(r))(a);
      };
    };
  });
};

var monadStateReaderT = function monadStateReaderT(dictMonadState) {
  return new Control_Monad_State_Class.MonadState(function () {
    return monadReaderT(dictMonadState.Monad0());
  }, function () {
    var $80 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadState.Monad0());
    var $81 = Control_Monad_State_Class.state(dictMonadState);
    return function ($82) {
      return $80($81($82));
    };
  }());
};

var monadTellReaderT = function monadTellReaderT(dictMonadTell) {
  return new Control_Monad_Writer_Class.MonadTell(function () {
    return monadReaderT(dictMonadTell.Monad0());
  }, function () {
    var $83 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadTell.Monad0());
    var $84 = Control_Monad_Writer_Class.tell(dictMonadTell);
    return function ($85) {
      return $83($84($85));
    };
  }());
};

var monadWriterReaderT = function monadWriterReaderT(dictMonadWriter) {
  return new Control_Monad_Writer_Class.MonadWriter(function () {
    return monadTellReaderT(dictMonadWriter.MonadTell0());
  }, mapReaderT(Control_Monad_Writer_Class.listen(dictMonadWriter)), mapReaderT(Control_Monad_Writer_Class.pass(dictMonadWriter)));
};

var monadThrowReaderT = function monadThrowReaderT(dictMonadThrow) {
  return new Control_Monad_Error_Class.MonadThrow(function () {
    return monadReaderT(dictMonadThrow.Monad0());
  }, function () {
    var $86 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadThrow.Monad0());
    var $87 = Control_Monad_Error_Class.throwError(dictMonadThrow);
    return function ($88) {
      return $86($87($88));
    };
  }());
};

var monadErrorReaderT = function monadErrorReaderT(dictMonadError) {
  return new Control_Monad_Error_Class.MonadError(function () {
    return monadThrowReaderT(dictMonadError.MonadThrow0());
  }, function (v) {
    return function (h) {
      return function (r) {
        return Control_Monad_Error_Class.catchError(dictMonadError)(v(r))(function (e) {
          var v1 = h(e);
          return v1(r);
        });
      };
    };
  });
};

var monoidReaderT = function monoidReaderT(dictApplicative) {
  return function (dictMonoid) {
    return new Data_Monoid.Monoid(function () {
      return semigroupReaderT(dictApplicative.Apply0())(dictMonoid.Semigroup0());
    }, Control_Applicative.pure(applicativeReaderT(dictApplicative))(Data_Monoid.mempty(dictMonoid)));
  };
};

var altReaderT = function altReaderT(dictAlt) {
  return new Control_Alt.Alt(function () {
    return functorReaderT(dictAlt.Functor0());
  }, function (v) {
    return function (v1) {
      return function (r) {
        return Control_Alt.alt(dictAlt)(v(r))(v1(r));
      };
    };
  });
};

var plusReaderT = function plusReaderT(dictPlus) {
  return new Control_Plus.Plus(function () {
    return altReaderT(dictPlus.Alt0());
  }, Data_Function["const"](Control_Plus.empty(dictPlus)));
};

var alternativeReaderT = function alternativeReaderT(dictAlternative) {
  return new Control_Alternative.Alternative(function () {
    return applicativeReaderT(dictAlternative.Applicative0());
  }, function () {
    return plusReaderT(dictAlternative.Plus1());
  });
};

var monadZeroReaderT = function monadZeroReaderT(dictMonadZero) {
  return new Control_MonadZero.MonadZero(function () {
    return alternativeReaderT(dictMonadZero.Alternative1());
  }, function () {
    return monadReaderT(dictMonadZero.Monad0());
  });
};

var monadPlusReaderT = function monadPlusReaderT(dictMonadPlus) {
  return new Control_MonadPlus.MonadPlus(function () {
    return monadZeroReaderT(dictMonadPlus.MonadZero0());
  });
};

module.exports = {
  ReaderT: ReaderT,
  runReaderT: runReaderT,
  withReaderT: withReaderT,
  mapReaderT: mapReaderT,
  newtypeReaderT: newtypeReaderT,
  functorReaderT: functorReaderT,
  applyReaderT: applyReaderT,
  applicativeReaderT: applicativeReaderT,
  altReaderT: altReaderT,
  plusReaderT: plusReaderT,
  alternativeReaderT: alternativeReaderT,
  bindReaderT: bindReaderT,
  monadReaderT: monadReaderT,
  monadZeroReaderT: monadZeroReaderT,
  semigroupReaderT: semigroupReaderT,
  monoidReaderT: monoidReaderT,
  monadPlusReaderT: monadPlusReaderT,
  monadTransReaderT: monadTransReaderT,
  monadEffectReader: monadEffectReader,
  monadContReaderT: monadContReaderT,
  monadThrowReaderT: monadThrowReaderT,
  monadErrorReaderT: monadErrorReaderT,
  monadAskReaderT: monadAskReaderT,
  monadReaderReaderT: monadReaderReaderT,
  monadStateReaderT: monadStateReaderT,
  monadTellReaderT: monadTellReaderT,
  monadWriterReaderT: monadWriterReaderT,
  distributiveReaderT: distributiveReaderT,
  monadRecReaderT: monadRecReaderT
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Monad.Cont.Class/index.js":"output/Control.Monad.Cont.Class/index.js","../Control.Monad.Error.Class/index.js":"output/Control.Monad.Error.Class/index.js","../Control.Monad.Reader.Class/index.js":"output/Control.Monad.Reader.Class/index.js","../Control.Monad.Rec.Class/index.js":"output/Control.Monad.Rec.Class/index.js","../Control.Monad.State.Class/index.js":"output/Control.Monad.State.Class/index.js","../Control.Monad.Trans.Class/index.js":"output/Control.Monad.Trans.Class/index.js","../Control.Monad.Writer.Class/index.js":"output/Control.Monad.Writer.Class/index.js","../Control.MonadPlus/index.js":"output/Control.MonadPlus/index.js","../Control.MonadZero/index.js":"output/Control.MonadZero/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Distributive/index.js":"output/Data.Distributive/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Effect.Class/index.js":"output/Effect.Class/index.js"}],"output/Control.Monad.Writer.Trans/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Monad_Cont_Class = require("../Control.Monad.Cont.Class/index.js");

var Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");

var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");

var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");

var Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");

var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");

var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");

var Control_MonadPlus = require("../Control.MonadPlus/index.js");

var Control_MonadZero = require("../Control.MonadZero/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Effect_Class = require("../Effect.Class/index.js");

var WriterT = function WriterT(x) {
  return x;
};

var runWriterT = function runWriterT(v) {
  return v;
};

var newtypeWriterT = new Data_Newtype.Newtype(function (n) {
  return n;
}, WriterT);

var monadTransWriterT = function monadTransWriterT(dictMonoid) {
  return new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return function (m) {
      return Control_Bind.bind(dictMonad.Bind1())(m)(function (a) {
        return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(a, Data_Monoid.mempty(dictMonoid)));
      });
    };
  });
};

var mapWriterT = function mapWriterT(f) {
  return function (v) {
    return f(v);
  };
};

var functorWriterT = function functorWriterT(dictFunctor) {
  return new Data_Functor.Functor(function (f) {
    return mapWriterT(Data_Functor.map(dictFunctor)(function (v) {
      return new Data_Tuple.Tuple(f(v.value0), v.value1);
    }));
  });
};

var execWriterT = function execWriterT(dictFunctor) {
  return function (v) {
    return Data_Functor.map(dictFunctor)(Data_Tuple.snd)(v);
  };
};

var applyWriterT = function applyWriterT(dictSemigroup) {
  return function (dictApply) {
    return new Control_Apply.Apply(function () {
      return functorWriterT(dictApply.Functor0());
    }, function (v) {
      return function (v1) {
        var k = function k(v3) {
          return function (v4) {
            return new Data_Tuple.Tuple(v3.value0(v4.value0), Data_Semigroup.append(dictSemigroup)(v3.value1)(v4.value1));
          };
        };

        return Control_Apply.apply(dictApply)(Data_Functor.map(dictApply.Functor0())(k)(v))(v1);
      };
    });
  };
};

var bindWriterT = function bindWriterT(dictSemigroup) {
  return function (dictBind) {
    return new Control_Bind.Bind(function () {
      return applyWriterT(dictSemigroup)(dictBind.Apply0());
    }, function (v) {
      return function (k) {
        return WriterT(Control_Bind.bind(dictBind)(v)(function (v1) {
          var v2 = k(v1.value0);
          return Data_Functor.map(dictBind.Apply0().Functor0())(function (v3) {
            return new Data_Tuple.Tuple(v3.value0, Data_Semigroup.append(dictSemigroup)(v1.value1)(v3.value1));
          })(v2);
        }));
      };
    });
  };
};

var applicativeWriterT = function applicativeWriterT(dictMonoid) {
  return function (dictApplicative) {
    return new Control_Applicative.Applicative(function () {
      return applyWriterT(dictMonoid.Semigroup0())(dictApplicative.Apply0());
    }, function (a) {
      return WriterT(Control_Applicative.pure(dictApplicative)(new Data_Tuple.Tuple(a, Data_Monoid.mempty(dictMonoid))));
    });
  };
};

var monadWriterT = function monadWriterT(dictMonoid) {
  return function (dictMonad) {
    return new Control_Monad.Monad(function () {
      return applicativeWriterT(dictMonoid)(dictMonad.Applicative0());
    }, function () {
      return bindWriterT(dictMonoid.Semigroup0())(dictMonad.Bind1());
    });
  };
};

var monadAskWriterT = function monadAskWriterT(dictMonoid) {
  return function (dictMonadAsk) {
    return new Control_Monad_Reader_Class.MonadAsk(function () {
      return monadWriterT(dictMonoid)(dictMonadAsk.Monad0());
    }, Control_Monad_Trans_Class.lift(monadTransWriterT(dictMonoid))(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
  };
};

var monadReaderWriterT = function monadReaderWriterT(dictMonoid) {
  return function (dictMonadReader) {
    return new Control_Monad_Reader_Class.MonadReader(function () {
      return monadAskWriterT(dictMonoid)(dictMonadReader.MonadAsk0());
    }, function (f) {
      return mapWriterT(Control_Monad_Reader_Class.local(dictMonadReader)(f));
    });
  };
};

var monadContWriterT = function monadContWriterT(dictMonoid) {
  return function (dictMonadCont) {
    return new Control_Monad_Cont_Class.MonadCont(function () {
      return monadWriterT(dictMonoid)(dictMonadCont.Monad0());
    }, function (f) {
      return WriterT(Control_Monad_Cont_Class.callCC(dictMonadCont)(function (c) {
        var v = f(function (a) {
          return WriterT(c(new Data_Tuple.Tuple(a, Data_Monoid.mempty(dictMonoid))));
        });
        return v;
      }));
    });
  };
};

var monadEffectWriter = function monadEffectWriter(dictMonoid) {
  return function (dictMonadEffect) {
    return new Effect_Class.MonadEffect(function () {
      return monadWriterT(dictMonoid)(dictMonadEffect.Monad0());
    }, function () {
      var $121 = Control_Monad_Trans_Class.lift(monadTransWriterT(dictMonoid))(dictMonadEffect.Monad0());
      var $122 = Effect_Class.liftEffect(dictMonadEffect);
      return function ($123) {
        return $121($122($123));
      };
    }());
  };
};

var monadRecWriterT = function monadRecWriterT(dictMonoid) {
  return function (dictMonadRec) {
    return new Control_Monad_Rec_Class.MonadRec(function () {
      return monadWriterT(dictMonoid)(dictMonadRec.Monad0());
    }, function (f) {
      return function (a) {
        var f$prime = function f$prime(v) {
          var v1 = f(v.value0);
          return Control_Bind.bind(dictMonadRec.Monad0().Bind1())(v1)(function (v2) {
            return Control_Applicative.pure(dictMonadRec.Monad0().Applicative0())(function () {
              if (v2.value0 instanceof Control_Monad_Rec_Class.Loop) {
                return new Control_Monad_Rec_Class.Loop(new Data_Tuple.Tuple(v2.value0.value0, Data_Semigroup.append(dictMonoid.Semigroup0())(v.value1)(v2.value1)));
              }

              ;

              if (v2.value0 instanceof Control_Monad_Rec_Class.Done) {
                return new Control_Monad_Rec_Class.Done(new Data_Tuple.Tuple(v2.value0.value0, Data_Semigroup.append(dictMonoid.Semigroup0())(v.value1)(v2.value1)));
              }

              ;
              throw new Error("Failed pattern match at Control.Monad.Writer.Trans (line 83, column 16 - line 85, column 47): " + [v2.value0.constructor.name]);
            }());
          });
        };

        return WriterT(Control_Monad_Rec_Class.tailRecM(dictMonadRec)(f$prime)(new Data_Tuple.Tuple(a, Data_Monoid.mempty(dictMonoid))));
      };
    });
  };
};

var monadStateWriterT = function monadStateWriterT(dictMonoid) {
  return function (dictMonadState) {
    return new Control_Monad_State_Class.MonadState(function () {
      return monadWriterT(dictMonoid)(dictMonadState.Monad0());
    }, function (f) {
      return Control_Monad_Trans_Class.lift(monadTransWriterT(dictMonoid))(dictMonadState.Monad0())(Control_Monad_State_Class.state(dictMonadState)(f));
    });
  };
};

var monadTellWriterT = function monadTellWriterT(dictMonoid) {
  return function (dictMonad) {
    return new Control_Monad_Writer_Class.MonadTell(function () {
      return monadWriterT(dictMonoid)(dictMonad);
    }, function () {
      var $124 = Control_Applicative.pure(dictMonad.Applicative0());
      var $125 = Data_Tuple.Tuple.create(Data_Unit.unit);
      return function ($126) {
        return WriterT($124($125($126)));
      };
    }());
  };
};

var monadWriterWriterT = function monadWriterWriterT(dictMonoid) {
  return function (dictMonad) {
    return new Control_Monad_Writer_Class.MonadWriter(function () {
      return monadTellWriterT(dictMonoid)(dictMonad);
    }, function (v) {
      return Control_Bind.bind(dictMonad.Bind1())(v)(function (v1) {
        return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v1.value0, v1.value1), v1.value1));
      });
    }, function (v) {
      return Control_Bind.bind(dictMonad.Bind1())(v)(function (v1) {
        return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v1.value0.value0, v1.value0.value1(v1.value1)));
      });
    });
  };
};

var monadThrowWriterT = function monadThrowWriterT(dictMonoid) {
  return function (dictMonadThrow) {
    return new Control_Monad_Error_Class.MonadThrow(function () {
      return monadWriterT(dictMonoid)(dictMonadThrow.Monad0());
    }, function (e) {
      return Control_Monad_Trans_Class.lift(monadTransWriterT(dictMonoid))(dictMonadThrow.Monad0())(Control_Monad_Error_Class.throwError(dictMonadThrow)(e));
    });
  };
};

var monadErrorWriterT = function monadErrorWriterT(dictMonoid) {
  return function (dictMonadError) {
    return new Control_Monad_Error_Class.MonadError(function () {
      return monadThrowWriterT(dictMonoid)(dictMonadError.MonadThrow0());
    }, function (v) {
      return function (h) {
        return WriterT(Control_Monad_Error_Class.catchError(dictMonadError)(v)(function (e) {
          var v1 = h(e);
          return v1;
        }));
      };
    });
  };
};

var altWriterT = function altWriterT(dictAlt) {
  return new Control_Alt.Alt(function () {
    return functorWriterT(dictAlt.Functor0());
  }, function (v) {
    return function (v1) {
      return Control_Alt.alt(dictAlt)(v)(v1);
    };
  });
};

var plusWriterT = function plusWriterT(dictPlus) {
  return new Control_Plus.Plus(function () {
    return altWriterT(dictPlus.Alt0());
  }, Control_Plus.empty(dictPlus));
};

var alternativeWriterT = function alternativeWriterT(dictMonoid) {
  return function (dictAlternative) {
    return new Control_Alternative.Alternative(function () {
      return applicativeWriterT(dictMonoid)(dictAlternative.Applicative0());
    }, function () {
      return plusWriterT(dictAlternative.Plus1());
    });
  };
};

var monadZeroWriterT = function monadZeroWriterT(dictMonoid) {
  return function (dictMonadZero) {
    return new Control_MonadZero.MonadZero(function () {
      return alternativeWriterT(dictMonoid)(dictMonadZero.Alternative1());
    }, function () {
      return monadWriterT(dictMonoid)(dictMonadZero.Monad0());
    });
  };
};

var monadPlusWriterT = function monadPlusWriterT(dictMonoid) {
  return function (dictMonadPlus) {
    return new Control_MonadPlus.MonadPlus(function () {
      return monadZeroWriterT(dictMonoid)(dictMonadPlus.MonadZero0());
    });
  };
};

module.exports = {
  WriterT: WriterT,
  runWriterT: runWriterT,
  execWriterT: execWriterT,
  mapWriterT: mapWriterT,
  newtypeWriterT: newtypeWriterT,
  functorWriterT: functorWriterT,
  applyWriterT: applyWriterT,
  applicativeWriterT: applicativeWriterT,
  altWriterT: altWriterT,
  plusWriterT: plusWriterT,
  alternativeWriterT: alternativeWriterT,
  bindWriterT: bindWriterT,
  monadWriterT: monadWriterT,
  monadRecWriterT: monadRecWriterT,
  monadZeroWriterT: monadZeroWriterT,
  monadPlusWriterT: monadPlusWriterT,
  monadTransWriterT: monadTransWriterT,
  monadEffectWriter: monadEffectWriter,
  monadContWriterT: monadContWriterT,
  monadThrowWriterT: monadThrowWriterT,
  monadErrorWriterT: monadErrorWriterT,
  monadAskWriterT: monadAskWriterT,
  monadReaderWriterT: monadReaderWriterT,
  monadStateWriterT: monadStateWriterT,
  monadTellWriterT: monadTellWriterT,
  monadWriterWriterT: monadWriterWriterT
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Monad.Cont.Class/index.js":"output/Control.Monad.Cont.Class/index.js","../Control.Monad.Error.Class/index.js":"output/Control.Monad.Error.Class/index.js","../Control.Monad.Reader.Class/index.js":"output/Control.Monad.Reader.Class/index.js","../Control.Monad.Rec.Class/index.js":"output/Control.Monad.Rec.Class/index.js","../Control.Monad.State.Class/index.js":"output/Control.Monad.State.Class/index.js","../Control.Monad.Trans.Class/index.js":"output/Control.Monad.Trans.Class/index.js","../Control.Monad.Writer.Class/index.js":"output/Control.Monad.Writer.Class/index.js","../Control.MonadPlus/index.js":"output/Control.MonadPlus/index.js","../Control.MonadZero/index.js":"output/Control.MonadZero/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Effect.Class/index.js":"output/Effect.Class/index.js"}],"output/Unsafe.Coerce/foreign.js":[function(require,module,exports) {
"use strict"; // module Unsafe.Coerce

exports.unsafeCoerce = function (x) {
  return x;
};
},{}],"output/Unsafe.Coerce/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

module.exports = {
  unsafeCoerce: $foreign.unsafeCoerce
};
},{"./foreign.js":"output/Unsafe.Coerce/foreign.js"}],"output/Data.Functor.App/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Show = require("../Data.Show/index.js");

var Unsafe_Coerce = require("../Unsafe.Coerce/index.js");

var App = function App(x) {
  return x;
};

var traversableWithIndexApp = function traversableWithIndexApp(dictTraversableWithIndex) {
  return dictTraversableWithIndex;
};

var traversableApp = function traversableApp(dictTraversable) {
  return dictTraversable;
};

var showApp = function showApp(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(App " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var semigroupApp = function semigroupApp(dictApply) {
  return function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (v) {
      return function (v1) {
        return Control_Apply.lift2(dictApply)(Data_Semigroup.append(dictSemigroup))(v)(v1);
      };
    });
  };
};

var plusApp = function plusApp(dictPlus) {
  return dictPlus;
};

var newtypeApp = new Data_Newtype.Newtype(function (n) {
  return n;
}, App);

var monoidApp = function monoidApp(dictApplicative) {
  return function (dictMonoid) {
    return new Data_Monoid.Monoid(function () {
      return semigroupApp(dictApplicative.Apply0())(dictMonoid.Semigroup0());
    }, Control_Applicative.pure(dictApplicative)(Data_Monoid.mempty(dictMonoid)));
  };
};

var monadZeroApp = function monadZeroApp(dictMonadZero) {
  return dictMonadZero;
};

var monadPlusApp = function monadPlusApp(dictMonadPlus) {
  return dictMonadPlus;
};

var monadApp = function monadApp(dictMonad) {
  return dictMonad;
};

var lazyApp = function lazyApp(dictLazy) {
  return dictLazy;
};

var hoistLowerApp = Unsafe_Coerce.unsafeCoerce;
var hoistLiftApp = Unsafe_Coerce.unsafeCoerce;

var hoistApp = function hoistApp(f) {
  return function (v) {
    return f(v);
  };
};

var functorWithIndexApp = function functorWithIndexApp(dictFunctorWithIndex) {
  return dictFunctorWithIndex;
};

var functorApp = function functorApp(dictFunctor) {
  return dictFunctor;
};

var foldableWithIndexApp = function foldableWithIndexApp(dictFoldableWithIndex) {
  return dictFoldableWithIndex;
};

var foldableApp = function foldableApp(dictFoldable) {
  return dictFoldable;
};

var extendApp = function extendApp(dictExtend) {
  return dictExtend;
};

var eqApp = function eqApp(dictEq1) {
  return function (dictEq) {
    return new Data_Eq.Eq(function (x) {
      return function (y) {
        return Data_Eq.eq1(dictEq1)(dictEq)(x)(y);
      };
    });
  };
};

var ordApp = function ordApp(dictOrd1) {
  return function (dictOrd) {
    return new Data_Ord.Ord(function () {
      return eqApp(dictOrd1.Eq10())(dictOrd.Eq0());
    }, function (x) {
      return function (y) {
        return Data_Ord.compare1(dictOrd1)(dictOrd)(x)(y);
      };
    });
  };
};

var eq1App = function eq1App(dictEq1) {
  return new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqApp(dictEq1)(dictEq));
  });
};

var ord1App = function ord1App(dictOrd1) {
  return new Data_Ord.Ord1(function () {
    return eq1App(dictOrd1.Eq10());
  }, function (dictOrd) {
    return Data_Ord.compare(ordApp(dictOrd1)(dictOrd));
  });
};

var comonadApp = function comonadApp(dictComonad) {
  return dictComonad;
};

var bindApp = function bindApp(dictBind) {
  return dictBind;
};

var applyApp = function applyApp(dictApply) {
  return dictApply;
};

var applicativeApp = function applicativeApp(dictApplicative) {
  return dictApplicative;
};

var alternativeApp = function alternativeApp(dictAlternative) {
  return dictAlternative;
};

var altApp = function altApp(dictAlt) {
  return dictAlt;
};

module.exports = {
  App: App,
  hoistApp: hoistApp,
  hoistLiftApp: hoistLiftApp,
  hoistLowerApp: hoistLowerApp,
  newtypeApp: newtypeApp,
  eqApp: eqApp,
  eq1App: eq1App,
  ordApp: ordApp,
  ord1App: ord1App,
  showApp: showApp,
  semigroupApp: semigroupApp,
  monoidApp: monoidApp,
  functorApp: functorApp,
  functorWithIndexApp: functorWithIndexApp,
  applyApp: applyApp,
  applicativeApp: applicativeApp,
  bindApp: bindApp,
  monadApp: monadApp,
  altApp: altApp,
  plusApp: plusApp,
  alternativeApp: alternativeApp,
  monadZeroApp: monadZeroApp,
  monadPlusApp: monadPlusApp,
  lazyApp: lazyApp,
  foldableApp: foldableApp,
  traversableApp: traversableApp,
  foldableWithIndexApp: foldableWithIndexApp,
  traversableWithIndexApp: traversableWithIndexApp,
  extendApp: extendApp,
  comonadApp: comonadApp
};
},{"../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Unsafe.Coerce/index.js":"output/Unsafe.Coerce/index.js"}],"output/Data.Functor.Compose/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Category = require("../Control.Category/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Eq = require("../Data.Eq/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Functor_App = require("../Data.Functor.App/index.js");

var Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Ord = require("../Data.Ord/index.js");

var Data_Show = require("../Data.Show/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");

var Data_Tuple = require("../Data.Tuple/index.js");

var Compose = function Compose(x) {
  return x;
};

var showCompose = function showCompose(dictShow) {
  return new Data_Show.Show(function (v) {
    return "(Compose " + (Data_Show.show(dictShow)(v) + ")");
  });
};

var newtypeCompose = new Data_Newtype.Newtype(function (n) {
  return n;
}, Compose);

var functorCompose = function functorCompose(dictFunctor) {
  return function (dictFunctor1) {
    return new Data_Functor.Functor(function (f) {
      return function (v) {
        return Compose(Data_Functor.map(dictFunctor)(Data_Functor.map(dictFunctor1)(f))(v));
      };
    });
  };
};

var functorWithIndexCompose = function functorWithIndexCompose(dictFunctorWithIndex) {
  return function (dictFunctorWithIndex1) {
    return new Data_FunctorWithIndex.FunctorWithIndex(function () {
      return functorCompose(dictFunctorWithIndex.Functor0())(dictFunctorWithIndex1.Functor0());
    }, function (f) {
      return function (v) {
        return Compose(Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex)(function () {
          var $100 = Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex1);
          var $101 = Data_Tuple.curry(f);
          return function ($102) {
            return $100($101($102));
          };
        }())(v));
      };
    });
  };
};

var foldableCompose = function foldableCompose(dictFoldable) {
  return function (dictFoldable1) {
    return new Data_Foldable.Foldable(function (dictMonoid) {
      return function (f) {
        return function (v) {
          return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(Data_Foldable.foldMap(dictFoldable1)(dictMonoid)(f))(v);
        };
      };
    }, function (f) {
      return function (i) {
        return function (v) {
          return Data_Foldable.foldl(dictFoldable)(Data_Foldable.foldl(dictFoldable1)(f))(i)(v);
        };
      };
    }, function (f) {
      return function (i) {
        return function (v) {
          return Data_Foldable.foldr(dictFoldable)(Data_Function.flip(Data_Foldable.foldr(dictFoldable1)(f)))(i)(v);
        };
      };
    });
  };
};

var foldableWithIndexCompose = function foldableWithIndexCompose(dictFoldableWithIndex) {
  return function (dictFoldableWithIndex1) {
    return new Data_FoldableWithIndex.FoldableWithIndex(function () {
      return foldableCompose(dictFoldableWithIndex.Foldable0())(dictFoldableWithIndex1.Foldable0());
    }, function (dictMonoid) {
      return function (f) {
        return function (v) {
          return Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex)(dictMonoid)(function () {
            var $103 = Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex1)(dictMonoid);
            var $104 = Data_Tuple.curry(f);
            return function ($105) {
              return $103($104($105));
            };
          }())(v);
        };
      };
    }, function (f) {
      return function (i) {
        return function (v) {
          return Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex)(function () {
            var $106 = Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex1);
            var $107 = Data_Tuple.curry(f);
            return function ($108) {
              return $106($107($108));
            };
          }())(i)(v);
        };
      };
    }, function (f) {
      return function (i) {
        return function (v) {
          return Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex)(function (a) {
            return Data_Function.flip(Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex1)(Data_Tuple.curry(f)(a)));
          })(i)(v);
        };
      };
    });
  };
};

var traversableCompose = function traversableCompose(dictTraversable) {
  return function (dictTraversable1) {
    return new Data_Traversable.Traversable(function () {
      return foldableCompose(dictTraversable.Foldable1())(dictTraversable1.Foldable1());
    }, function () {
      return functorCompose(dictTraversable.Functor0())(dictTraversable1.Functor0());
    }, function (dictApplicative) {
      return Data_Traversable.traverse(traversableCompose(dictTraversable)(dictTraversable1))(dictApplicative)(Control_Category.identity(Control_Category.categoryFn));
    }, function (dictApplicative) {
      return function (f) {
        return function (v) {
          return Data_Functor.map(dictApplicative.Apply0().Functor0())(Compose)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(Data_Traversable.traverse(dictTraversable1)(dictApplicative)(f))(v));
        };
      };
    });
  };
};

var traversableWithIndexCompose = function traversableWithIndexCompose(dictTraversableWithIndex) {
  return function (dictTraversableWithIndex1) {
    return new Data_TraversableWithIndex.TraversableWithIndex(function () {
      return foldableWithIndexCompose(dictTraversableWithIndex.FoldableWithIndex1())(dictTraversableWithIndex1.FoldableWithIndex1());
    }, function () {
      return functorWithIndexCompose(dictTraversableWithIndex.FunctorWithIndex0())(dictTraversableWithIndex1.FunctorWithIndex0());
    }, function () {
      return traversableCompose(dictTraversableWithIndex.Traversable2())(dictTraversableWithIndex1.Traversable2());
    }, function (dictApplicative) {
      return function (f) {
        return function (v) {
          return Data_Functor.map(dictApplicative.Apply0().Functor0())(Compose)(Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex)(dictApplicative)(function () {
            var $109 = Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex1)(dictApplicative);
            var $110 = Data_Tuple.curry(f);
            return function ($111) {
              return $109($110($111));
            };
          }())(v));
        };
      };
    });
  };
};

var eqCompose = function eqCompose(dictEq1) {
  return function (dictEq11) {
    return function (dictEq) {
      return new Data_Eq.Eq(function (v) {
        return function (v1) {
          return Data_Eq.eq1(dictEq1)(Data_Functor_App.eqApp(dictEq11)(dictEq))(Data_Functor_App.hoistLiftApp(v))(Data_Functor_App.hoistLiftApp(v1));
        };
      });
    };
  };
};

var ordCompose = function ordCompose(dictOrd1) {
  return function (dictOrd11) {
    return function (dictOrd) {
      return new Data_Ord.Ord(function () {
        return eqCompose(dictOrd1.Eq10())(dictOrd11.Eq10())(dictOrd.Eq0());
      }, function (v) {
        return function (v1) {
          return Data_Ord.compare1(dictOrd1)(Data_Functor_App.ordApp(dictOrd11)(dictOrd))(Data_Functor_App.hoistLiftApp(v))(Data_Functor_App.hoistLiftApp(v1));
        };
      });
    };
  };
};

var eq1Compose = function eq1Compose(dictEq1) {
  return function (dictEq11) {
    return new Data_Eq.Eq1(function (dictEq) {
      return Data_Eq.eq(eqCompose(dictEq1)(dictEq11)(dictEq));
    });
  };
};

var ord1Compose = function ord1Compose(dictOrd1) {
  return function (dictOrd11) {
    return new Data_Ord.Ord1(function () {
      return eq1Compose(dictOrd1.Eq10())(dictOrd11.Eq10());
    }, function (dictOrd) {
      return Data_Ord.compare(ordCompose(dictOrd1)(dictOrd11)(dictOrd));
    });
  };
};

var bihoistCompose = function bihoistCompose(dictFunctor) {
  return function (natF) {
    return function (natG) {
      return function (v) {
        return natF(Data_Functor.map(dictFunctor)(natG)(v));
      };
    };
  };
};

var applyCompose = function applyCompose(dictApply) {
  return function (dictApply1) {
    return new Control_Apply.Apply(function () {
      return functorCompose(dictApply.Functor0())(dictApply1.Functor0());
    }, function (v) {
      return function (v1) {
        return Compose(Control_Apply.apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Control_Apply.apply(dictApply1))(v))(v1));
      };
    });
  };
};

var applicativeCompose = function applicativeCompose(dictApplicative) {
  return function (dictApplicative1) {
    return new Control_Applicative.Applicative(function () {
      return applyCompose(dictApplicative.Apply0())(dictApplicative1.Apply0());
    }, function () {
      var $112 = Control_Applicative.pure(dictApplicative);
      var $113 = Control_Applicative.pure(dictApplicative1);
      return function ($114) {
        return Compose($112($113($114)));
      };
    }());
  };
};

var altCompose = function altCompose(dictAlt) {
  return function (dictFunctor) {
    return new Control_Alt.Alt(function () {
      return functorCompose(dictAlt.Functor0())(dictFunctor);
    }, function (v) {
      return function (v1) {
        return Compose(Control_Alt.alt(dictAlt)(v)(v1));
      };
    });
  };
};

var plusCompose = function plusCompose(dictPlus) {
  return function (dictFunctor) {
    return new Control_Plus.Plus(function () {
      return altCompose(dictPlus.Alt0())(dictFunctor);
    }, Control_Plus.empty(dictPlus));
  };
};

var alternativeCompose = function alternativeCompose(dictAlternative) {
  return function (dictApplicative) {
    return new Control_Alternative.Alternative(function () {
      return applicativeCompose(dictAlternative.Applicative0())(dictApplicative);
    }, function () {
      return plusCompose(dictAlternative.Plus1())(dictApplicative.Apply0().Functor0());
    });
  };
};

module.exports = {
  Compose: Compose,
  bihoistCompose: bihoistCompose,
  newtypeCompose: newtypeCompose,
  eqCompose: eqCompose,
  eq1Compose: eq1Compose,
  ordCompose: ordCompose,
  ord1Compose: ord1Compose,
  showCompose: showCompose,
  functorCompose: functorCompose,
  functorWithIndexCompose: functorWithIndexCompose,
  applyCompose: applyCompose,
  applicativeCompose: applicativeCompose,
  foldableCompose: foldableCompose,
  foldableWithIndexCompose: foldableWithIndexCompose,
  traversableCompose: traversableCompose,
  traversableWithIndexCompose: traversableWithIndexCompose,
  altCompose: altCompose,
  plusCompose: plusCompose,
  alternativeCompose: alternativeCompose
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Eq/index.js":"output/Data.Eq/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.FoldableWithIndex/index.js":"output/Data.FoldableWithIndex/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Functor.App/index.js":"output/Data.Functor.App/index.js","../Data.FunctorWithIndex/index.js":"output/Data.FunctorWithIndex/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Ord/index.js":"output/Data.Ord/index.js","../Data.Show/index.js":"output/Data.Show/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js","../Data.TraversableWithIndex/index.js":"output/Data.TraversableWithIndex/index.js","../Data.Tuple/index.js":"output/Data.Tuple/index.js"}],"output/Control.Parallel.Class/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Monad_Cont_Trans = require("../Control.Monad.Cont.Trans/index.js");

var Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans/index.js");

var Control_Monad_Maybe_Trans = require("../Control.Monad.Maybe.Trans/index.js");

var Control_Monad_Reader_Trans = require("../Control.Monad.Reader.Trans/index.js");

var Control_Monad_Writer_Trans = require("../Control.Monad.Writer.Trans/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Either = require("../Data.Either/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Functor_Compose = require("../Data.Functor.Compose/index.js");

var Data_Maybe = require("../Data.Maybe/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Effect_Class = require("../Effect.Class/index.js");

var Effect_Ref = require("../Effect.Ref/index.js");

var ParCont = function ParCont(x) {
  return x;
};

var Parallel = function Parallel(Applicative1, Monad0, parallel, sequential) {
  this.Applicative1 = Applicative1;
  this.Monad0 = Monad0;
  this.parallel = parallel;
  this.sequential = sequential;
};

var sequential = function sequential(dict) {
  return dict.sequential;
};

var parallel = function parallel(dict) {
  return dict.parallel;
};

var newtypeParCont = new Data_Newtype.Newtype(function (n) {
  return n;
}, ParCont);

var monadParWriterT = function monadParWriterT(dictMonoid) {
  return function (dictParallel) {
    return new Parallel(function () {
      return Control_Monad_Writer_Trans.applicativeWriterT(dictMonoid)(dictParallel.Applicative1());
    }, function () {
      return Control_Monad_Writer_Trans.monadWriterT(dictMonoid)(dictParallel.Monad0());
    }, Control_Monad_Writer_Trans.mapWriterT(parallel(dictParallel)), Control_Monad_Writer_Trans.mapWriterT(sequential(dictParallel)));
  };
};

var monadParReaderT = function monadParReaderT(dictParallel) {
  return new Parallel(function () {
    return Control_Monad_Reader_Trans.applicativeReaderT(dictParallel.Applicative1());
  }, function () {
    return Control_Monad_Reader_Trans.monadReaderT(dictParallel.Monad0());
  }, Control_Monad_Reader_Trans.mapReaderT(parallel(dictParallel)), Control_Monad_Reader_Trans.mapReaderT(sequential(dictParallel)));
};

var monadParMaybeT = function monadParMaybeT(dictParallel) {
  return new Parallel(function () {
    return Data_Functor_Compose.applicativeCompose(dictParallel.Applicative1())(Data_Maybe.applicativeMaybe);
  }, function () {
    return Control_Monad_Maybe_Trans.monadMaybeT(dictParallel.Monad0());
  }, function (v) {
    return parallel(dictParallel)(v);
  }, function (v) {
    return sequential(dictParallel)(v);
  });
};

var monadParExceptT = function monadParExceptT(dictParallel) {
  return new Parallel(function () {
    return Data_Functor_Compose.applicativeCompose(dictParallel.Applicative1())(Data_Either.applicativeEither);
  }, function () {
    return Control_Monad_Except_Trans.monadExceptT(dictParallel.Monad0());
  }, function (v) {
    return parallel(dictParallel)(v);
  }, function (v) {
    return sequential(dictParallel)(v);
  });
};

var monadParParCont = function monadParParCont(dictMonadEffect) {
  return new Parallel(function () {
    return applicativeParCont(dictMonadEffect);
  }, function () {
    return Control_Monad_Cont_Trans.monadContT(dictMonadEffect.Monad0());
  }, ParCont, function (v) {
    return v;
  });
};

var functorParCont = function functorParCont(dictMonadEffect) {
  return new Data_Functor.Functor(function (f) {
    var $40 = parallel(monadParParCont(dictMonadEffect));
    var $41 = Data_Functor.map(Control_Monad_Cont_Trans.functorContT(dictMonadEffect.Monad0().Bind1().Apply0().Functor0()))(f);
    var $42 = sequential(monadParParCont(dictMonadEffect));
    return function ($43) {
      return $40($41($42($43)));
    };
  });
};

var applyParCont = function applyParCont(dictMonadEffect) {
  return new Control_Apply.Apply(function () {
    return functorParCont(dictMonadEffect);
  }, function (v) {
    return function (v1) {
      return ParCont(function (k) {
        return Control_Bind.bind(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref["new"](Data_Maybe.Nothing.value)))(function (ra) {
          return Control_Bind.bind(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref["new"](Data_Maybe.Nothing.value)))(function (rb) {
            return Control_Bind.discard(Control_Bind.discardUnit)(dictMonadEffect.Monad0().Bind1())(Control_Monad_Cont_Trans.runContT(v)(function (a) {
              return Control_Bind.bind(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.read(rb)))(function (mb) {
                if (mb instanceof Data_Maybe.Nothing) {
                  return Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.write(new Data_Maybe.Just(a))(ra));
                }

                ;

                if (mb instanceof Data_Maybe.Just) {
                  return k(a(mb.value0));
                }

                ;
                throw new Error("Failed pattern match at Control.Parallel.Class (line 71, column 7 - line 73, column 26): " + [mb.constructor.name]);
              });
            }))(function () {
              return Control_Monad_Cont_Trans.runContT(v1)(function (b) {
                return Control_Bind.bind(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.read(ra)))(function (ma) {
                  if (ma instanceof Data_Maybe.Nothing) {
                    return Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.write(new Data_Maybe.Just(b))(rb));
                  }

                  ;

                  if (ma instanceof Data_Maybe.Just) {
                    return k(ma.value0(b));
                  }

                  ;
                  throw new Error("Failed pattern match at Control.Parallel.Class (line 77, column 7 - line 79, column 26): " + [ma.constructor.name]);
                });
              });
            });
          });
        });
      });
    };
  });
};

var applicativeParCont = function applicativeParCont(dictMonadEffect) {
  return new Control_Applicative.Applicative(function () {
    return applyParCont(dictMonadEffect);
  }, function () {
    var $44 = parallel(monadParParCont(dictMonadEffect));
    var $45 = Control_Applicative.pure(Control_Monad_Cont_Trans.applicativeContT(dictMonadEffect.Monad0().Applicative0()));
    return function ($46) {
      return $44($45($46));
    };
  }());
};

var altParCont = function altParCont(dictMonadEffect) {
  return new Control_Alt.Alt(function () {
    return functorParCont(dictMonadEffect);
  }, function (v) {
    return function (v1) {
      return ParCont(function (k) {
        return Control_Bind.bind(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref["new"](false)))(function (done) {
          return Control_Bind.discard(Control_Bind.discardUnit)(dictMonadEffect.Monad0().Bind1())(Control_Monad_Cont_Trans.runContT(v)(function (a) {
            return Control_Bind.bind(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.read(done)))(function (b) {
              if (b) {
                return Control_Applicative.pure(dictMonadEffect.Monad0().Applicative0())(Data_Unit.unit);
              }

              ;
              return Control_Bind.discard(Control_Bind.discardUnit)(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.write(true)(done)))(function () {
                return k(a);
              });
            });
          }))(function () {
            return Control_Monad_Cont_Trans.runContT(v1)(function (a) {
              return Control_Bind.bind(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.read(done)))(function (b) {
                if (b) {
                  return Control_Applicative.pure(dictMonadEffect.Monad0().Applicative0())(Data_Unit.unit);
                }

                ;
                return Control_Bind.discard(Control_Bind.discardUnit)(dictMonadEffect.Monad0().Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.write(true)(done)))(function () {
                  return k(a);
                });
              });
            });
          });
        });
      });
    };
  });
};

var plusParCont = function plusParCont(dictMonadEffect) {
  return new Control_Plus.Plus(function () {
    return altParCont(dictMonadEffect);
  }, ParCont(function (v) {
    return Control_Applicative.pure(dictMonadEffect.Monad0().Applicative0())(Data_Unit.unit);
  }));
};

var alternativeParCont = function alternativeParCont(dictMonadEffect) {
  return new Control_Alternative.Alternative(function () {
    return applicativeParCont(dictMonadEffect);
  }, function () {
    return plusParCont(dictMonadEffect);
  });
};

module.exports = {
  parallel: parallel,
  sequential: sequential,
  Parallel: Parallel,
  ParCont: ParCont,
  monadParExceptT: monadParExceptT,
  monadParReaderT: monadParReaderT,
  monadParWriterT: monadParWriterT,
  monadParMaybeT: monadParMaybeT,
  newtypeParCont: newtypeParCont,
  functorParCont: functorParCont,
  applyParCont: applyParCont,
  applicativeParCont: applicativeParCont,
  altParCont: altParCont,
  plusParCont: plusParCont,
  alternativeParCont: alternativeParCont,
  monadParParCont: monadParParCont
};
},{"../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Monad.Cont.Trans/index.js":"output/Control.Monad.Cont.Trans/index.js","../Control.Monad.Except.Trans/index.js":"output/Control.Monad.Except.Trans/index.js","../Control.Monad.Maybe.Trans/index.js":"output/Control.Monad.Maybe.Trans/index.js","../Control.Monad.Reader.Trans/index.js":"output/Control.Monad.Reader.Trans/index.js","../Control.Monad.Writer.Trans/index.js":"output/Control.Monad.Writer.Trans/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Either/index.js":"output/Data.Either/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Functor.Compose/index.js":"output/Data.Functor.Compose/index.js","../Data.Maybe/index.js":"output/Data.Maybe/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Effect.Class/index.js":"output/Effect.Class/index.js","../Effect.Ref/index.js":"output/Effect.Ref/index.js"}],"output/Control.Parallel/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var Control_Apply = require("../Control.Apply/index.js");

var Control_Category = require("../Control.Category/index.js");

var Control_Parallel_Class = require("../Control.Parallel.Class/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_Traversable = require("../Data.Traversable/index.js");

var parTraverse_ = function parTraverse_(dictParallel) {
  return function (dictFoldable) {
    return function (f) {
      var $17 = Control_Parallel_Class.sequential(dictParallel);
      var $18 = Data_Foldable.traverse_(dictParallel.Applicative1())(dictFoldable)(function () {
        var $20 = Control_Parallel_Class.parallel(dictParallel);
        return function ($21) {
          return $20(f($21));
        };
      }());
      return function ($19) {
        return $17($18($19));
      };
    };
  };
};

var parTraverse = function parTraverse(dictParallel) {
  return function (dictTraversable) {
    return function (f) {
      var $22 = Control_Parallel_Class.sequential(dictParallel);
      var $23 = Data_Traversable.traverse(dictTraversable)(dictParallel.Applicative1())(function () {
        var $25 = Control_Parallel_Class.parallel(dictParallel);
        return function ($26) {
          return $25(f($26));
        };
      }());
      return function ($24) {
        return $22($23($24));
      };
    };
  };
};

var parSequence_ = function parSequence_(dictParallel) {
  return function (dictFoldable) {
    return parTraverse_(dictParallel)(dictFoldable)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var parSequence = function parSequence(dictParallel) {
  return function (dictTraversable) {
    return parTraverse(dictParallel)(dictTraversable)(Control_Category.identity(Control_Category.categoryFn));
  };
};

var parOneOfMap = function parOneOfMap(dictParallel) {
  return function (dictAlternative) {
    return function (dictFoldable) {
      return function (dictFunctor) {
        return function (f) {
          var $27 = Control_Parallel_Class.sequential(dictParallel);
          var $28 = Data_Foldable.oneOfMap(dictFoldable)(dictAlternative.Plus1())(function () {
            var $30 = Control_Parallel_Class.parallel(dictParallel);
            return function ($31) {
              return $30(f($31));
            };
          }());
          return function ($29) {
            return $27($28($29));
          };
        };
      };
    };
  };
};

var parOneOf = function parOneOf(dictParallel) {
  return function (dictAlternative) {
    return function (dictFoldable) {
      return function (dictFunctor) {
        var $32 = Control_Parallel_Class.sequential(dictParallel);
        var $33 = Data_Foldable.oneOfMap(dictFoldable)(dictAlternative.Plus1())(Control_Parallel_Class.parallel(dictParallel));
        return function ($34) {
          return $32($33($34));
        };
      };
    };
  };
};

var parApply = function parApply(dictParallel) {
  return function (mf) {
    return function (ma) {
      return Control_Parallel_Class.sequential(dictParallel)(Control_Apply.apply(dictParallel.Applicative1().Apply0())(Control_Parallel_Class.parallel(dictParallel)(mf))(Control_Parallel_Class.parallel(dictParallel)(ma)));
    };
  };
};

module.exports = {
  parApply: parApply,
  parTraverse: parTraverse,
  parTraverse_: parTraverse_,
  parSequence: parSequence,
  parSequence_: parSequence_,
  parOneOf: parOneOf,
  parOneOfMap: parOneOfMap
};
},{"../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Category/index.js":"output/Control.Category/index.js","../Control.Parallel.Class/index.js":"output/Control.Parallel.Class/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.Traversable/index.js":"output/Data.Traversable/index.js"}],"output/Effect.Unsafe/foreign.js":[function(require,module,exports) {
"use strict";

exports.unsafePerformEffect = function (f) {
  return f();
};
},{}],"output/Effect.Unsafe/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

module.exports = {
  unsafePerformEffect: $foreign.unsafePerformEffect
};
},{"./foreign.js":"output/Effect.Unsafe/foreign.js"}],"output/Partial.Unsafe/foreign.js":[function(require,module,exports) {
"use strict"; // module Partial.Unsafe

exports.unsafePartial = function (f) {
  return f();
};
},{}],"output/Partial/foreign.js":[function(require,module,exports) {
"use strict"; // module Partial

exports.crashWith = function () {
  return function (msg) {
    throw new Error(msg);
  };
};
},{}],"output/Partial/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var crash = function crash(dictPartial) {
  return $foreign.crashWith()("Partial.crash: partial function");
};

module.exports = {
  crash: crash,
  crashWith: $foreign.crashWith
};
},{"./foreign.js":"output/Partial/foreign.js"}],"output/Partial.Unsafe/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Partial = require("../Partial/index.js");

var unsafePartialBecause = function unsafePartialBecause(v) {
  return function (x) {
    return $foreign.unsafePartial(function (dictPartial) {
      return x();
    });
  };
};

var unsafeCrashWith = function unsafeCrashWith(msg) {
  return $foreign.unsafePartial(function (dictPartial) {
    return Partial.crashWith()(msg);
  });
};

module.exports = {
  unsafePartialBecause: unsafePartialBecause,
  unsafeCrashWith: unsafeCrashWith,
  unsafePartial: $foreign.unsafePartial
};
},{"./foreign.js":"output/Partial.Unsafe/foreign.js","../Partial/index.js":"output/Partial/index.js"}],"output/Effect.Aff/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Control_Alt = require("../Control.Alt/index.js");

var Control_Alternative = require("../Control.Alternative/index.js");

var Control_Applicative = require("../Control.Applicative/index.js");

var Control_Apply = require("../Control.Apply/index.js");

var Control_Bind = require("../Control.Bind/index.js");

var Control_Lazy = require("../Control.Lazy/index.js");

var Control_Monad = require("../Control.Monad/index.js");

var Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");

var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");

var Control_Parallel = require("../Control.Parallel/index.js");

var Control_Parallel_Class = require("../Control.Parallel.Class/index.js");

var Control_Plus = require("../Control.Plus/index.js");

var Data_Either = require("../Data.Either/index.js");

var Data_Foldable = require("../Data.Foldable/index.js");

var Data_Function = require("../Data.Function/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Monoid = require("../Data.Monoid/index.js");

var Data_Newtype = require("../Data.Newtype/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Unit = require("../Data.Unit/index.js");

var Effect = require("../Effect/index.js");

var Effect_Class = require("../Effect.Class/index.js");

var Effect_Exception = require("../Effect.Exception/index.js");

var Effect_Unsafe = require("../Effect.Unsafe/index.js");

var Partial_Unsafe = require("../Partial.Unsafe/index.js");

var Unsafe_Coerce = require("../Unsafe.Coerce/index.js");

var Fiber = function Fiber(x) {
  return x;
};

var FFIUtil = function FFIUtil(x) {
  return x;
};

var Canceler = function Canceler(x) {
  return x;
};

var suspendAff = $foreign["_fork"](false);
var newtypeCanceler = new Data_Newtype.Newtype(function (n) {
  return n;
}, Canceler);
var functorParAff = new Data_Functor.Functor($foreign["_parAffMap"]);
var functorAff = new Data_Functor.Functor($foreign["_map"]);
var forkAff = $foreign["_fork"](true);

var ffiUtil = function () {
  var unsafeFromRight = function unsafeFromRight(v) {
    if (v instanceof Data_Either.Right) {
      return v.value0;
    }

    ;

    if (v instanceof Data_Either.Left) {
      return Partial_Unsafe.unsafeCrashWith("unsafeFromRight: Left");
    }

    ;
    throw new Error("Failed pattern match at Effect.Aff (line 400, column 21 - line 402, column 54): " + [v.constructor.name]);
  };

  var unsafeFromLeft = function unsafeFromLeft(v) {
    if (v instanceof Data_Either.Left) {
      return v.value0;
    }

    ;

    if (v instanceof Data_Either.Right) {
      return Partial_Unsafe.unsafeCrashWith("unsafeFromLeft: Right");
    }

    ;
    throw new Error("Failed pattern match at Effect.Aff (line 395, column 20 - line 397, column 54): " + [v.constructor.name]);
  };

  var isLeft = function isLeft(v) {
    if (v instanceof Data_Either.Left) {
      return true;
    }

    ;

    if (v instanceof Data_Either.Right) {
      return false;
    }

    ;
    throw new Error("Failed pattern match at Effect.Aff (line 390, column 12 - line 392, column 20): " + [v.constructor.name]);
  };

  return {
    isLeft: isLeft,
    fromLeft: unsafeFromLeft,
    fromRight: unsafeFromRight,
    left: Data_Either.Left.create,
    right: Data_Either.Right.create
  };
}();

var makeFiber = function makeFiber(aff) {
  return $foreign["_makeFiber"](ffiUtil, aff);
};

var launchAff = function launchAff(aff) {
  return function __do() {
    var fiber = makeFiber(aff)();
    fiber.run();
    return fiber;
  };
};

var launchAff_ = function () {
  var $43 = Data_Functor["void"](Effect.functorEffect);
  return function ($44) {
    return $43(launchAff($44));
  };
}();

var launchSuspendedAff = makeFiber;

var delay = function delay(v) {
  return $foreign["_delay"](Data_Either.Right.create, v);
};

var bracket = function bracket(acquire) {
  return function (completed) {
    return $foreign.generalBracket(acquire)({
      killed: Data_Function["const"](completed),
      failed: Data_Function["const"](completed),
      completed: Data_Function["const"](completed)
    });
  };
};

var applyParAff = new Control_Apply.Apply(function () {
  return functorParAff;
}, $foreign["_parAffApply"]);

var semigroupParAff = function semigroupParAff(dictSemigroup) {
  return new Data_Semigroup.Semigroup(Control_Apply.lift2(applyParAff)(Data_Semigroup.append(dictSemigroup)));
};

var monadAff = new Control_Monad.Monad(function () {
  return applicativeAff;
}, function () {
  return bindAff;
});
var bindAff = new Control_Bind.Bind(function () {
  return applyAff;
}, $foreign["_bind"]);
var applyAff = new Control_Apply.Apply(function () {
  return functorAff;
}, Control_Monad.ap(monadAff));
var applicativeAff = new Control_Applicative.Applicative(function () {
  return applyAff;
}, $foreign["_pure"]);

var cancelWith = function cancelWith(aff) {
  return function (v) {
    return $foreign.generalBracket(Control_Applicative.pure(applicativeAff)(Data_Unit.unit))({
      killed: function killed(e) {
        return function (v1) {
          return v(e);
        };
      },
      failed: Data_Function["const"](Control_Applicative.pure(applicativeAff)),
      completed: Data_Function["const"](Control_Applicative.pure(applicativeAff))
    })(Data_Function["const"](aff));
  };
};

var $$finally = function $$finally(fin) {
  return function (a) {
    return bracket(Control_Applicative.pure(applicativeAff)(Data_Unit.unit))(Data_Function["const"](fin))(Data_Function["const"](a));
  };
};

var invincible = function invincible(a) {
  return bracket(a)(Data_Function["const"](Control_Applicative.pure(applicativeAff)(Data_Unit.unit)))(Control_Applicative.pure(applicativeAff));
};

var lazyAff = new Control_Lazy.Lazy(function (f) {
  return Control_Bind.bind(bindAff)(Control_Applicative.pure(applicativeAff)(Data_Unit.unit))(f);
});

var semigroupAff = function semigroupAff(dictSemigroup) {
  return new Data_Semigroup.Semigroup(Control_Apply.lift2(applyAff)(Data_Semigroup.append(dictSemigroup)));
};

var monadEffectAff = new Effect_Class.MonadEffect(function () {
  return monadAff;
}, $foreign["_liftEffect"]);

var effectCanceler = function () {
  var $45 = Effect_Class.liftEffect(monadEffectAff);
  return function ($46) {
    return Canceler(Data_Function["const"]($45($46)));
  };
}();

var joinFiber = function joinFiber(v) {
  return $foreign.makeAff(function (k) {
    return Data_Functor.map(Effect.functorEffect)(effectCanceler)(v.join(k));
  });
};

var functorFiber = new Data_Functor.Functor(function (f) {
  return function (t) {
    return Effect_Unsafe.unsafePerformEffect(makeFiber(Data_Functor.map(functorAff)(f)(joinFiber(t))));
  };
});
var applyFiber = new Control_Apply.Apply(function () {
  return functorFiber;
}, function (t1) {
  return function (t2) {
    return Effect_Unsafe.unsafePerformEffect(makeFiber(Control_Apply.apply(applyAff)(joinFiber(t1))(joinFiber(t2))));
  };
});
var applicativeFiber = new Control_Applicative.Applicative(function () {
  return applyFiber;
}, function (a) {
  return Effect_Unsafe.unsafePerformEffect(makeFiber(Control_Applicative.pure(applicativeAff)(a)));
});

var killFiber = function killFiber(e) {
  return function (v) {
    return Control_Bind.bind(bindAff)(Effect_Class.liftEffect(monadEffectAff)(v.isSuspended))(function (v1) {
      if (v1) {
        return Effect_Class.liftEffect(monadEffectAff)(Data_Functor["void"](Effect.functorEffect)(v.kill(e, Data_Function["const"](Control_Applicative.pure(Effect.applicativeEffect)(Data_Unit.unit)))));
      }

      ;
      return $foreign.makeAff(function (k) {
        return Data_Functor.map(Effect.functorEffect)(effectCanceler)(v.kill(e, k));
      });
    });
  };
};

var fiberCanceler = function () {
  var $47 = Data_Function.flip(killFiber);
  return function ($48) {
    return Canceler($47($48));
  };
}();

var monadThrowAff = new Control_Monad_Error_Class.MonadThrow(function () {
  return monadAff;
}, $foreign["_throwError"]);
var monadErrorAff = new Control_Monad_Error_Class.MonadError(function () {
  return monadThrowAff;
}, $foreign["_catchError"]);
var attempt = Control_Monad_Error_Class["try"](monadErrorAff);

var runAff = function runAff(k) {
  return function (aff) {
    return launchAff(Control_Bind.bindFlipped(bindAff)(function () {
      var $49 = Effect_Class.liftEffect(monadEffectAff);
      return function ($50) {
        return $49(k($50));
      };
    }())(Control_Monad_Error_Class["try"](monadErrorAff)(aff)));
  };
};

var runAff_ = function runAff_(k) {
  return function (aff) {
    return Data_Functor["void"](Effect.functorEffect)(runAff(k)(aff));
  };
};

var runSuspendedAff = function runSuspendedAff(k) {
  return function (aff) {
    return launchSuspendedAff(Control_Bind.bindFlipped(bindAff)(function () {
      var $51 = Effect_Class.liftEffect(monadEffectAff);
      return function ($52) {
        return $51(k($52));
      };
    }())(Control_Monad_Error_Class["try"](monadErrorAff)(aff)));
  };
};

var parallelAff = new Control_Parallel_Class.Parallel(function () {
  return applicativeParAff;
}, function () {
  return monadAff;
}, Unsafe_Coerce.unsafeCoerce, $foreign["_sequential"]);
var applicativeParAff = new Control_Applicative.Applicative(function () {
  return applyParAff;
}, function () {
  var $53 = Control_Parallel_Class.parallel(parallelAff);
  var $54 = Control_Applicative.pure(applicativeAff);
  return function ($55) {
    return $53($54($55));
  };
}());

var monoidParAff = function monoidParAff(dictMonoid) {
  return new Data_Monoid.Monoid(function () {
    return semigroupParAff(dictMonoid.Semigroup0());
  }, Control_Applicative.pure(applicativeParAff)(Data_Monoid.mempty(dictMonoid)));
};

var semigroupCanceler = new Data_Semigroup.Semigroup(function (v) {
  return function (v1) {
    return function (err) {
      return Control_Parallel.parSequence_(parallelAff)(Data_Foldable.foldableArray)([v(err), v1(err)]);
    };
  };
});

var supervise = function supervise(aff) {
  var killError = Effect_Exception.error("[Aff] Child fiber outlived parent");

  var killAll = function killAll(err) {
    return function (sup) {
      return $foreign.makeAff(function (k) {
        return $foreign["_killAll"](err, sup.supervisor, k(Control_Applicative.pure(Data_Either.applicativeEither)(Data_Unit.unit)));
      });
    };
  };

  var acquire = function __do() {
    var sup = $foreign["_makeSupervisedFiber"](ffiUtil, aff)();
    sup.fiber.run();
    return sup;
  };

  return $foreign.generalBracket(Effect_Class.liftEffect(monadEffectAff)(acquire))({
    killed: function killed(err) {
      return function (sup) {
        return Control_Parallel.parSequence_(parallelAff)(Data_Foldable.foldableArray)([killFiber(err)(sup.fiber), killAll(err)(sup)]);
      };
    },
    failed: Data_Function["const"](killAll(killError)),
    completed: Data_Function["const"](killAll(killError))
  })(function ($56) {
    return joinFiber(function (v) {
      return v.fiber;
    }($56));
  });
};

var monadRecAff = new Control_Monad_Rec_Class.MonadRec(function () {
  return monadAff;
}, function (k) {
  var go = function go(a) {
    return Control_Bind.bind(bindAff)(k(a))(function (res) {
      if (res instanceof Control_Monad_Rec_Class.Done) {
        return Control_Applicative.pure(applicativeAff)(res.value0);
      }

      ;

      if (res instanceof Control_Monad_Rec_Class.Loop) {
        return go(res.value0);
      }

      ;
      throw new Error("Failed pattern match at Effect.Aff (line 100, column 7 - line 102, column 22): " + [res.constructor.name]);
    });
  };

  return go;
});

var monoidAff = function monoidAff(dictMonoid) {
  return new Data_Monoid.Monoid(function () {
    return semigroupAff(dictMonoid.Semigroup0());
  }, Control_Applicative.pure(applicativeAff)(Data_Monoid.mempty(dictMonoid)));
};

var nonCanceler = Data_Function["const"](Control_Applicative.pure(applicativeAff)(Data_Unit.unit));
var monoidCanceler = new Data_Monoid.Monoid(function () {
  return semigroupCanceler;
}, nonCanceler);
var never = $foreign.makeAff(function (v) {
  return Control_Applicative.pure(Effect.applicativeEffect)(Data_Monoid.mempty(monoidCanceler));
});

var apathize = function () {
  var $57 = Data_Functor.map(functorAff)(Data_Function["const"](Data_Unit.unit));
  return function ($58) {
    return $57(attempt($58));
  };
}();

var altParAff = new Control_Alt.Alt(function () {
  return functorParAff;
}, $foreign["_parAffAlt"]);
var altAff = new Control_Alt.Alt(function () {
  return functorAff;
}, function (a1) {
  return function (a2) {
    return Control_Monad_Error_Class.catchError(monadErrorAff)(a1)(Data_Function["const"](a2));
  };
});
var plusAff = new Control_Plus.Plus(function () {
  return altAff;
}, Control_Monad_Error_Class.throwError(monadThrowAff)(Effect_Exception.error("Always fails")));
var plusParAff = new Control_Plus.Plus(function () {
  return altParAff;
}, Control_Parallel_Class.parallel(parallelAff)(Control_Plus.empty(plusAff)));
var alternativeParAff = new Control_Alternative.Alternative(function () {
  return applicativeParAff;
}, function () {
  return plusParAff;
});
module.exports = {
  Canceler: Canceler,
  launchAff: launchAff,
  launchAff_: launchAff_,
  launchSuspendedAff: launchSuspendedAff,
  runAff: runAff,
  runAff_: runAff_,
  runSuspendedAff: runSuspendedAff,
  forkAff: forkAff,
  suspendAff: suspendAff,
  supervise: supervise,
  attempt: attempt,
  apathize: apathize,
  delay: delay,
  never: never,
  "finally": $$finally,
  invincible: invincible,
  killFiber: killFiber,
  joinFiber: joinFiber,
  cancelWith: cancelWith,
  bracket: bracket,
  nonCanceler: nonCanceler,
  effectCanceler: effectCanceler,
  fiberCanceler: fiberCanceler,
  functorAff: functorAff,
  applyAff: applyAff,
  applicativeAff: applicativeAff,
  bindAff: bindAff,
  monadAff: monadAff,
  semigroupAff: semigroupAff,
  monoidAff: monoidAff,
  altAff: altAff,
  plusAff: plusAff,
  monadRecAff: monadRecAff,
  monadThrowAff: monadThrowAff,
  monadErrorAff: monadErrorAff,
  monadEffectAff: monadEffectAff,
  lazyAff: lazyAff,
  functorParAff: functorParAff,
  applyParAff: applyParAff,
  applicativeParAff: applicativeParAff,
  semigroupParAff: semigroupParAff,
  monoidParAff: monoidParAff,
  altParAff: altParAff,
  plusParAff: plusParAff,
  alternativeParAff: alternativeParAff,
  parallelAff: parallelAff,
  functorFiber: functorFiber,
  applyFiber: applyFiber,
  applicativeFiber: applicativeFiber,
  newtypeCanceler: newtypeCanceler,
  semigroupCanceler: semigroupCanceler,
  monoidCanceler: monoidCanceler,
  makeAff: $foreign.makeAff,
  generalBracket: $foreign.generalBracket
};
},{"./foreign.js":"output/Effect.Aff/foreign.js","../Control.Alt/index.js":"output/Control.Alt/index.js","../Control.Alternative/index.js":"output/Control.Alternative/index.js","../Control.Applicative/index.js":"output/Control.Applicative/index.js","../Control.Apply/index.js":"output/Control.Apply/index.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Control.Lazy/index.js":"output/Control.Lazy/index.js","../Control.Monad/index.js":"output/Control.Monad/index.js","../Control.Monad.Error.Class/index.js":"output/Control.Monad.Error.Class/index.js","../Control.Monad.Rec.Class/index.js":"output/Control.Monad.Rec.Class/index.js","../Control.Parallel/index.js":"output/Control.Parallel/index.js","../Control.Parallel.Class/index.js":"output/Control.Parallel.Class/index.js","../Control.Plus/index.js":"output/Control.Plus/index.js","../Data.Either/index.js":"output/Data.Either/index.js","../Data.Foldable/index.js":"output/Data.Foldable/index.js","../Data.Function/index.js":"output/Data.Function/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Monoid/index.js":"output/Data.Monoid/index.js","../Data.Newtype/index.js":"output/Data.Newtype/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Unit/index.js":"output/Data.Unit/index.js","../Effect/index.js":"output/Effect/index.js","../Effect.Class/index.js":"output/Effect.Class/index.js","../Effect.Exception/index.js":"output/Effect.Exception/index.js","../Effect.Unsafe/index.js":"output/Effect.Unsafe/index.js","../Partial.Unsafe/index.js":"output/Partial.Unsafe/index.js","../Unsafe.Coerce/index.js":"output/Unsafe.Coerce/index.js"}],"output/Effect.Now/foreign.js":[function(require,module,exports) {
"use strict";

exports.now = function () {
  return Date.now();
};
},{}],"output/Effect.Now/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_DateTime = require("../Data.DateTime/index.js");

var Data_DateTime_Instant = require("../Data.DateTime.Instant/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Effect = require("../Effect/index.js");

var nowTime = Data_Functor.map(Effect.functorEffect)(function ($0) {
  return Data_DateTime.time(Data_DateTime_Instant.toDateTime($0));
})($foreign.now);
var nowDateTime = Data_Functor.map(Effect.functorEffect)(Data_DateTime_Instant.toDateTime)($foreign.now);
var nowDate = Data_Functor.map(Effect.functorEffect)(function ($1) {
  return Data_DateTime.date(Data_DateTime_Instant.toDateTime($1));
})($foreign.now);
module.exports = {
  nowDateTime: nowDateTime,
  nowDate: nowDate,
  nowTime: nowTime,
  now: $foreign.now
};
},{"./foreign.js":"output/Effect.Now/foreign.js","../Data.DateTime/index.js":"output/Data.DateTime/index.js","../Data.DateTime.Instant/index.js":"output/Data.DateTime.Instant/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Effect/index.js":"output/Effect/index.js"}],"output/Effect.Random/foreign.js":[function(require,module,exports) {
"use strict";

exports.random = Math.random;
},{}],"output/Effect.Random/index.js":[function(require,module,exports) {
// Generated by purs version 0.13.8
"use strict";

var $foreign = require("./foreign.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Int = require("../Data.Int/index.js");

var Effect = require("../Effect/index.js");

var randomRange = function randomRange(min) {
  return function (max) {
    return function __do() {
      var n = $foreign.random();
      return n * (max - min) + min;
    };
  };
};

var randomInt = function randomInt(low) {
  return function (high) {
    return function __do() {
      var n = $foreign.random();
      var asNumber = (Data_Int.toNumber(high) - Data_Int.toNumber(low) + 1) * n + Data_Int.toNumber(low);
      return Data_Int.floor(asNumber);
    };
  };
};

var randomBool = Data_Functor.map(Effect.functorEffect)(function (v) {
  return v < 0.5;
})($foreign.random);
module.exports = {
  randomInt: randomInt,
  randomRange: randomRange,
  randomBool: randomBool,
  random: $foreign.random
};
},{"./foreign.js":"output/Effect.Random/foreign.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Int/index.js":"output/Data.Int/index.js","../Effect/index.js":"output/Effect/index.js"}],"output/Main/index.js":[function(require,module,exports) {
"use strict";

var $foreign = require("./foreign.js");

var Control_Bind = require("../Control.Bind/index.js");

var Data_Array = require("../Data.Array/index.js");

var Data_DateTime_Instant = require("../Data.DateTime.Instant/index.js");

var Data_Functor = require("../Data.Functor/index.js");

var Data_Semigroup = require("../Data.Semigroup/index.js");

var Data_Time_Duration = require("../Data.Time.Duration/index.js");

var Effect = require("../Effect/index.js");

var Effect_Aff = require("../Effect.Aff/index.js");

var Effect_Class = require("../Effect.Class/index.js");

var Effect_Now = require("../Effect.Now/index.js");

var Effect_Random = require("../Effect.Random/index.js");

var ServiceId = function ServiceId(x) {
  return x;
};

var Service = function Service(x) {
  return x;
};

var InteractionId = function InteractionId(x) {
  return x;
};

var Interaction = function Interaction(x) {
  return x;
};

var Drawable = {};

var minusDuration = function minusDuration(dictSemigroup) {
  return function (dictDuration) {
    return function (x) {
      return function (y) {
        return Data_Semigroup.append(dictSemigroup)(x)(Data_Time_Duration.negateDuration(dictDuration)(y));
      };
    };
  };
};

var interactions = [{
  description: "Bla bla",
  from: "some",
  to: "another"
}, {
  description: "Bla bl",
  from: "another",
  to: "4"
}, {
  description: "Bla bl",
  from: "some",
  to: "6"
}, {
  description: "Bla bl",
  from: "another",
  to: "some"
}, {
  description: "Bla bla",
  from: "5",
  to: "some"
}, {
  description: "Bla bla",
  from: "7",
  to: "some"
}, {
  description: "Bla bl",
  from: "another",
  to: "3"
}, {
  description: "Bla bl",
  from: "3",
  to: "4"
}, {
  description: "Bla bl",
  from: "4",
  to: "8"
}, {
  description: "Bla bl",
  from: "some",
  to: "4"
}, {
  description: "Bla bl",
  from: "another",
  to: "6"
}, {
  description: "Bla bla",
  from: "4",
  to: "5"
}, {
  description: "Bla bl",
  from: "another",
  to: "3"
}, {
  description: "Bla bl",
  from: "7",
  to: "3"
}];

var run = function run(graph) {
  var update = function __do() {
    var dropAmount = Effect_Random.randomInt(0)(Data_Array.length(interactions) - 2 | 0)();
    var takeAmount = Effect_Random.randomInt(1)(3)();
    return $foreign.render(graph)([{
      id: "some",
      name: "Some Service",
      description: "It does something"
    }, {
      id: "another",
      name: "Another Service",
      description: "It does something else"
    }, {
      id: "3",
      name: "Queue Service",
      description: "It does something else"
    }, {
      id: "4",
      name: "DB Service",
      description: "It does something else"
    }, {
      id: "5",
      name: "BS Service",
      description: "It does something else"
    }, {
      id: "8",
      name: "Out of Names Service",
      description: "It does something else"
    }, {
      id: "6",
      name: "Last Service",
      description: "It does something else"
    }, {
      id: "7",
      name: "Hollywood Service",
      description: "It does something else"
    }])(Data_Array.take(takeAmount)(Data_Array.drop(dropAmount)(interactions)))();
  };

  var mainLoop = Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Data_Functor.mapFlipped(Effect.functorEffect)(Effect_Now.now)(Data_DateTime_Instant.unInstant)))(function (startTime) {
    return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(update))(function () {
      return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Data_Functor.mapFlipped(Effect.functorEffect)(Effect_Now.now)(Data_DateTime_Instant.unInstant)))(function (endTime) {
        return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Effect_Aff.delay(Data_Time_Duration.Milliseconds(200.0)))(function () {
          return mainLoop;
        });
      });
    });
  });
  return Effect_Aff.launchAff_(mainLoop);
};

var main = function __do() {
  var graph = $foreign.init();
  return run(graph)();
};

var drawablePath = Drawable;
var drawableNode = Drawable;
module.exports = {
  Drawable: Drawable,
  ServiceId: ServiceId,
  Service: Service,
  InteractionId: InteractionId,
  Interaction: Interaction,
  main: main,
  run: run,
  interactions: interactions,
  minusDuration: minusDuration,
  drawableNode: drawableNode,
  drawablePath: drawablePath,
  init: $foreign.init,
  render: $foreign.render
};
},{"./foreign.js":"output/Main/foreign.js","../Control.Bind/index.js":"output/Control.Bind/index.js","../Data.Array/index.js":"output/Data.Array/index.js","../Data.DateTime.Instant/index.js":"output/Data.DateTime.Instant/index.js","../Data.Functor/index.js":"output/Data.Functor/index.js","../Data.Semigroup/index.js":"output/Data.Semigroup/index.js","../Data.Time.Duration/index.js":"output/Data.Time.Duration/index.js","../Effect/index.js":"output/Effect/index.js","../Effect.Aff/index.js":"output/Effect.Aff/index.js","../Effect.Class/index.js":"output/Effect.Class/index.js","../Effect.Now/index.js":"output/Effect.Now/index.js","../Effect.Random/index.js":"output/Effect.Random/index.js"}],"index.js":[function(require,module,exports) {
require("./output/Main").main();
},{"./output/Main":"output/Main/index.js"}],"../../.npm/_npx/2875/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52376" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.npm/_npx/2875/lib/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/simplegraph.e31bb0bc.js.map