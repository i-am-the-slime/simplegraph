// Generated by purs bundle 0.14.1
var PS = {};
(function(exports) {
                                               

  exports.predecessors = ({ nodes, edges }) => {
    const result = {}
    nodes.forEach(node => {
      result[node.id] = []
      edges.forEach(e => { if (e.to == node.id) result[node.id].push(e.from) })
    });
    return result;
  }

  exports.successors = ({ nodes, edges }) => {
    const result = {}
    nodes.forEach(node => {
      result[node.id] = []
      edges.forEach(e => { if (e.from == node.id) result[node.id].push(e.to) })
    });
    return result;
  }

  const flipEdge = e => {
    return { from: e.to, to: e.from, label: e.label }
  }

  const countCrossings = nodes1 => nodes2 => edges => {
    countIdCrossings(nodes1.map(x => x.id))(nodes2.map(x => x.id))(edges)
  }

  // nodes1 must be the nodes on the top layer in order
  // nodes2 must be the nodes on the lower layer in order
  // [WARN] edges must all point from nodes1 to nodes2

  // Note that this is quadratic, and this'd be faster:
  // http://jgaa.info/accepted/2004/BarthMutzelJuenger2004.8.2.pdf
  const countIdCrossings = nodes1 => nodes2 => edges => {
    const toPosition = (acc, n, i) => { acc[n] = i; return acc }
    const positionsFrom = nodes1.reduce(toPosition, {})
    const positionsTo = nodes2.reduce(toPosition, {})
    let result = 0
    for (let i = 0; i < edges.length; i++) {
      const edge1 = edges[i]
      const x1 = positionsFrom[edge1.from]
      const y1 = positionsTo[edge1.to]
      for (let j = i; j < edges.length; j++) {
        const edge2 = edges[j]
        const x2 = positionsFrom[edge2.from]
        const y2 = positionsTo[edge2.to]
        if ((x1 < x2 && y1 > y2) || (x1 > x2 && y1 < y2)) {
          result++
        }
      }
    }
    return result
  }                                      

  const countAllCrossings = edges => order => {
    if (order.length <= 1) return 0
    let total = 0
    for (let layer = 0; layer < order.length - 1; layer++) {
      const relevantEdges =
        edges.filter(e => order[layer].indexOf(e.from) !== -1 &&
          order[layer + 1].indexOf(e.to) !== -1
        )
      const res = countIdCrossings(order[layer])(order[layer + 1])(relevantEdges)
      total += res
    }
    return total
  }

  const VIRT = "_dummy-"
  exports.fillUp = ({ nodes, edges }) => (layers) => {
    const result = { nodes: [...nodes], edges: [], layers: Object.assign({}, layers) }
    let virtualNodes = 0;
    const numEdges = edges.length
    for (let i = 0; i < numEdges; i++) {
      const edge = edges[i]
      // Should always point in the same direction so might have to swap
      const from = edge.from
      const to = edge.to
      const asc = layers[edge.from] < layers[edge.to]
      const lFrom = asc ? layers[from] : layers[to]
      const lTo = asc ? layers[to] : layers[from]
      // Same layer, nothing to insert
      if (lFrom == lTo || lFrom + 1 == lTo) {
        result.edges.push(edge)
        continue
      }
      for (let j = lFrom; j < lTo - 1; j++) {
        const nodeId = VIRT + virtualNodes
        const previousNodeId = VIRT + (virtualNodes - 1)
        const vNode = { id: nodeId, label: "DUMMY", isDummy: true }
        result.nodes.push(vNode)
        result.layers[nodeId] = j + 1
        const isFirstEdge = j == lFrom
        result.edges.push(
          {
            from: isFirstEdge ? from : previousNodeId,
            to: nodeId,
            label: ""
          })
        virtualNodes++
      }
      // Insert final edge
      result.edges.push(
        {
          from: VIRT + (virtualNodes - 1),
          to: to,
          label: ""
        }
      )
    }
    return result
  }

  const transpose = (edges, order) => {
    let improved = true
    const count = countAllCrossings(edges)
    while (improved) {
      improved = false
      for (let r = 0; r < order.length; r++) {
        for (let i = 0; i < order[r].length - 1; i++) {
          const crossings = count(order)
          const tmp = order[r][i]
          let swapped = [...order[r]]
          swapped[i] = swapped[i + 1]
          swapped[i + 1] = tmp
          order[r] = swapped
          const crossingsSwapped = count(order)
          if (crossingsSwapped < crossings) {
            improved = true
          } else {
            // swap back
            order[r][i + 1] = order[r][i]
            order[r][i] = tmp
          }
        }
      }
    }
  }

  const makeInitialOrdering = (layerObject) => {
    const ordering = []
    Object.entries(layerObject).forEach(([node, rank]) => {
      if (!ordering[rank]) {
        ordering[rank] = []
      }
      ordering[rank].push(node)
    })
    return ordering;
  }

  exports.ordering = (originalGraph) => (layerObject) => {
    // some helpers
    const adjacency = predecessorsAndSuccessors(originalGraph)
    const MaxIterations = 13
    const order = makeInitialOrdering(layerObject)
    let best = order

    const weightedMedian = (order, iter) => {

      // returns an ordered array of the present positions of 
      // the nodes adjacent to v in the given adjacent rank.
      const adjPosition = (v, adjRank) => {
        const rank = layerObject[v]
        if (rank > adjRank) {
          return order[adjRank].filter(x => adjacency.successors[v].indexOf(x) !== -1)
        }
        return order[adjRank].filter(x => adjacency.predecessors[v].indexOf(x) !== -1)
      }

      const medianValue = (v, adjRank) => {
        const P = adjPosition(v, adjRank)
        const m = P.length / 2
        if (P.length == 0) {
          return -1
        } else if (P.length % 2 == 1) {
          return P[m]
        } else if (P.length == 2) {
          return P[0] + P[1] / 2
        } else {
          const left = P[m - 1] - P[0]
          const right = P[P.length - 1] - P[m]
          return (P[m - 1] * right + P[m] * left) / (left + right)
        }
      }

      const sortWithMedians = (items, medians) => {
        const tmp = items.map((item, idx) => ({ item, median: medians[idx] }))
        tmp.sort((x, y) => x.idx - y.idx)
        return tmp.map(x => x.item)
      }

      if ((iter % 2) == 0) {
        for (let r = 1; r < order.length; r++) {
          const medians = []
          for (let v = 0; v < order[r].length; v++) {
            medians.push(medianValue(order[r][v], r - 1))
          }
          order[r] = sortWithMedians(order[r], medians)
        }
      } else { // traverse in other direction
        for (let r = order.length - 1; r > 1; r--) {
          const medians = []
          for (let v = 0; v < order[r].length; v++) {
            medians.push(medianValue(order[r][v], r - 1))
          }
          order[r] = sortWithMedians(order[r], medians)
        }
      }
    }

    const count = countAllCrossings(originalGraph.edges)

    // The algo
    for (let iter = 0; iter < MaxIterations; iter++) {
      weightedMedian(order, iter)
      transpose(originalGraph.edges, order)
      if (count(order) < count(best)) {
        best = order
      }
    }

    return best

  }

  const predecessorsAndSuccessors = ({ nodes, edges }) => {
    const predecessors = {}
    const successors = {}
    nodes.forEach(node => {
      predecessors[node.id] = []
      successors[node.id] = []
      edges.forEach(e => {
        if (e.from == node.id) successors[node.id].push(e.to)
        if (e.to == node.id) predecessors[node.id].push(e.from)
      })
    });
    return { predecessors, successors };
  }

  exports.removeTwoCycles = (graph) => {
    const edges = []
    const removed = new Set()
    for (let i = 0; i < graph.edges.length; i++) {
      if (removed.has(graph.edges[i])) {
        continue
      }
      for (let j = i + 1; j < graph.edges.length; j++) {
        if (graph.edges[i].from == graph.edges[j].to
          && graph.edges[i].to == graph.edges[j].from) {
          removed.add(graph.edges[j])
        }
      }
      edges.push(graph.edges[i])
    }
    return { edges, removed: Array.from(removed) }
  }


  exports.assignLayers = (graph) => {
    const result = {}
    const visited = new Set()
    let visitedBelowCurrentLayer = new Set()
    // Precompute predecessors
    const predecessors = exports.predecessors(graph)
    const allInPrev = (acc, id) => (acc && visitedBelowCurrentLayer.has(id))
    let currentLayer = 0
    while (visited.size < graph.nodes.length) {
      const predArray = Object.keys(predecessors)
      const nodeId = predArray.find(id => predecessors[id].reduce(allInPrev, true))
      if (nodeId) {
        result[nodeId] = currentLayer
        visited.add(nodeId)
        delete predecessors[nodeId]
      } else {
        currentLayer++
        visitedBelowCurrentLayer = new Set(visited)
      }
    }
    return result
  }

  const findSource = (nodes, predecessors) => {
    for (let i = 0; i < nodes.length; i++)
      if (predecessors[nodes[i].id].length == 0)
        return nodes[i].id
    return null
  }

  const findSink = (nodes, successors) => {
    for (i = 0; i < nodes.length; i++)
      if (successors[nodes[i].id].length == 0)
        return nodes[i].id
    return null
  }

  const unsafeRemoveNode = (nodeId, nodes, edges) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id == nodeId) {
        nodes.splice(i, 1)
        break
      }
    }
    for (i = 0; i < edges.length; i++) {
      if (edges[i].from == nodeId || edges[i].to == nodeId) {
        edges.splice(i, 1)
      }
    }
  }

  exports.greedyCycleRemoval = (graph) => {
    const nodes = [...graph.nodes]
    const edges = [...graph.edges]
    const sl = []
    const sr = []
    while (nodes.length > 0) { // While G is not empty do
      let sink = findSink(nodes, exports.successors({ nodes, edges })) // Choose a sink v
      while (sink != null) { // while G contains a sink
        unsafeRemoveNode(sink, nodes, edges) // Remove v from G
        sr.unshift(sink) // Prepend v to Sr
        // Update sink
        sink = findSink(nodes, exports.successors({ nodes, edges }))
      }
      let source = findSource(nodes, exports.predecessors({ nodes, edges })) // Choose a sink v
      while (source != null) { // while G contains a source
        unsafeRemoveNode(source, nodes, edges) // Remove v from G
        sl.push(source) // Append v to Sl
        // Update source
        source = findSource(nodes, exports.predecessors({ nodes, edges })) // Choose a sink v
      }
      if (nodes.length > 0) {
        // Choose a vertex w such that d+(w) ??? d???(w) is maximum 
        let w = nodes[0].id
        const adjacency = predecessorsAndSuccessors({ nodes, edges })
        let max = adjacency.successors[w].length - adjacency.predecessors[w].length
        for (let i = 1; i < nodes.length; i++) {
          let n = nodes[i].id
          let outMinusIndegree = adjacency.successors[n].length - adjacency.predecessors[n].length
          if (outMinusIndegree > max) {
            max = outMinusIndegree
            w = n
          }
          // Remove w from G
          unsafeRemoveNode(w, nodes, edges)
          // Append w to Sl
          sl.push(w)
        }
      }

      return graph.edges.map(e => (sl.indexOf(e.from) === -1) ? e :
        { from: e.to, to: e.from, label: e.label }
      )
    }
  }
})(PS["Algorithms"] = PS["Algorithms"] || {});
(function(exports) {
  "use strict";

  exports.concatArray = function (xs) {
    return function (ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };
})(PS["Data.Semigroup"] = PS["Data.Semigroup"] || {});
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Data.Semigroup"] = $PS["Data.Semigroup"] || {};
  var exports = $PS["Data.Semigroup"];
  var $foreign = $PS["Data.Semigroup"];
  var Semigroup = function (append) {
      this.append = append;
  }; 
  var semigroupArray = new Semigroup($foreign.concatArray);
  var append = function (dict) {
      return dict.append;
  };
  exports["append"] = append;
  exports["semigroupArray"] = semigroupArray;
})(PS);
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Algorithms"] = $PS["Algorithms"] || {};
  var exports = $PS["Algorithms"];
  var $foreign = $PS["Algorithms"];
  var Data_Semigroup = $PS["Data.Semigroup"];
  var sugiyama = function (v) {
      var noTwoCycles = $foreign.removeTwoCycles(v);
      var noCyclesEdges = $foreign.greedyCycleRemoval({
          nodes: v.nodes,
          edges: noTwoCycles.edges
      });
      var layers1 = $foreign.assignLayers({
          nodes: v.nodes,
          edges: noCyclesEdges
      });
      var filled = $foreign.fillUp(v)(layers1);
      var order = $foreign.ordering({
          nodes: filled.nodes,
          edges: filled.edges
      })(filled.layers);
      return {
          nodes: filled.nodes,
          edges: Data_Semigroup.append(Data_Semigroup.semigroupArray)(noTwoCycles.removed)(filled.edges),
          order: order
      };
  };
  exports["sugiyama"] = sugiyama;
})(PS);
(function(exports) {
  "use strict";

  // module Unsafe.Coerce

  exports.unsafeCoerce = function (x) {
    return x;
  };
})(PS["Unsafe.Coerce"] = PS["Unsafe.Coerce"] || {});
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Unsafe.Coerce"] = $PS["Unsafe.Coerce"] || {};
  var exports = $PS["Unsafe.Coerce"];
  var $foreign = $PS["Unsafe.Coerce"];
  exports["unsafeCoerce"] = $foreign.unsafeCoerce;
})(PS);
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Safe.Coerce"] = $PS["Safe.Coerce"] || {};
  var exports = $PS["Safe.Coerce"];
  var Unsafe_Coerce = $PS["Unsafe.Coerce"];                
  var coerce = function (dictCoercible) {
      return Unsafe_Coerce.unsafeCoerce;
  };
  exports["coerce"] = coerce;
})(PS);
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Data.Newtype"] = $PS["Data.Newtype"] || {};
  var exports = $PS["Data.Newtype"];
  var Safe_Coerce = $PS["Safe.Coerce"];
  var over = function (dictNewtype) {
      return function (dictNewtype1) {
          return function (v) {
              return Safe_Coerce.coerce();
          };
      };
  };
  exports["over"] = over;
})(PS);
(function(exports) {
  /* eslint-disable no-eq-null, eqeqeq */

  "use strict";

  exports.notNull = function (x) {
    return x;
  };
})(PS["Data.Nullable"] = PS["Data.Nullable"] || {});
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Data.Nullable"] = $PS["Data.Nullable"] || {};
  var exports = $PS["Data.Nullable"];
  var $foreign = $PS["Data.Nullable"];
  exports["notNull"] = $foreign.notNull;
})(PS);
(function(exports) {
  "use strict";

  exports.numSub = function (n1) {
    return function (n2) {
      return n1 - n2;
    };
  };
})(PS["Data.Ring"] = PS["Data.Ring"] || {});
(function(exports) {
  "use strict";

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
})(PS["Data.Semiring"] = PS["Data.Semiring"] || {});
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Data.Semiring"] = $PS["Data.Semiring"] || {};
  var exports = $PS["Data.Semiring"];
  var $foreign = $PS["Data.Semiring"];
  var Semiring = function (add, mul, one, zero) {
      this.add = add;
      this.mul = mul;
      this.one = one;
      this.zero = zero;
  };
  var zero = function (dict) {
      return dict.zero;
  };                                                       
  var semiringNumber = new Semiring($foreign.numAdd, $foreign.numMul, 1.0, 0.0);
  exports["zero"] = zero;
  exports["semiringNumber"] = semiringNumber;
})(PS);
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Data.Ring"] = $PS["Data.Ring"] || {};
  var exports = $PS["Data.Ring"];
  var $foreign = $PS["Data.Ring"];
  var Data_Semiring = $PS["Data.Semiring"];
  var Ring = function (Semiring0, sub) {
      this.Semiring0 = Semiring0;
      this.sub = sub;
  };
  var sub = function (dict) {
      return dict.sub;
  }; 
  var ringNumber = new Ring(function () {
      return Data_Semiring.semiringNumber;
  }, $foreign.numSub);
  var negate = function (dictRing) {
      return function (a) {
          return sub(dictRing)(Data_Semiring.zero(dictRing.Semiring0()))(a);
      };
  };
  exports["negate"] = negate;
  exports["ringNumber"] = ringNumber;
})(PS);
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Data.Time.Duration"] = $PS["Data.Time.Duration"] || {};
  var exports = $PS["Data.Time.Duration"];
  var Data_Newtype = $PS["Data.Newtype"];
  var Data_Ring = $PS["Data.Ring"];
  var Milliseconds = function (x) {
      return x;
  };
  var toDuration = function (dict) {
      return dict.toDuration;
  };      
  var fromDuration = function (dict) {
      return dict.fromDuration;
  };
  var negateDuration = function (dictDuration) {
      var $41 = toDuration(dictDuration);
      var $42 = Data_Newtype.over()()(Milliseconds)(Data_Ring.negate(Data_Ring.ringNumber));
      var $43 = fromDuration(dictDuration);
      return function ($44) {
          return $41($42($43($44)));
      };
  };
  exports["negateDuration"] = negateDuration;
})(PS);
(function(exports) {
  const svgNS = "http://www.w3.org/2000/svg";

  const createSVGElement = (name) => document.createElementNS(svgNS, name)
  const FONT_SIZE = 11
  const CORNER_RADIUS = 19
  const TEXT_PADDING_LEFT = 20
  const TEXT_PADDING_RIGHT = 20
  const TEXT_PADDING_TOP = 14
  const TEXT_PADDING_BOTTOM = 14
  const MAX_NODE_WIDTH = 180
  const MAX_NODES_PER_ROW = 3
  const ARROW_LENGTH = 5
  const STROKE_WIDTH = 2
  const ARROW = ARROW_LENGTH * STROKE_WIDTH
  const LAYER_HEIGHT = 150

  // Colours
  // const BG_COL = "#090910"
  const BG_COL = "#101014"
  const BOX_COL = "rgba(32, 33, 40, 0.7)"
  const TEXT_COL = "#D0D0D0"
  const ARROW_COL = "rgba(255,255,255, 0.5)"

  const defs =
      `<defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L${  ARROW_LENGTH},3 z" fill="${ARROW_COL}" />
      </marker>
   </defs>`  

  exports.init = () => {
      const svg = createSVGElement("svg")
      svg.setAttribute("id", "graph")
      svg.setAttribute("height", 5000)
      svg.setAttribute("width", 1000)
      svg.setAttribute("xmlns", svgNS)
      svg.setAttribute("style", `background: ${BG_COL}`)
      const container = document.getElementById("container")
      container.innerHTML = '' // clear previous content
      container.appendChild(svg)
      svg.innerHTML = defs
      return svg
  }

  const appendNode = (n, graph) => {
      n.visible = false
      const n2 = graph.appendChild(n)
      const width = n2.childNodes[1].getBBox().width
      const bbox = n2.getBBox()
      const x = bbox.x + ((MAX_NODE_WIDTH - width) / 2)
      n.childNodes[0].setAttribute("x", x)
      n.childNodes[1].setAttribute("x", x + TEXT_PADDING_LEFT)
      n.childNodes[0].setAttribute("width", Math.min(width + TEXT_PADDING_LEFT + TEXT_PADDING_RIGHT, MAX_NODE_WIDTH))
      n.childNodes[0].setAttribute("height", TEXT_PADDING_TOP + FONT_SIZE + TEXT_PADDING_BOTTOM)
      n.visible = true
  }

  const createNodeGroupElement = () => {
      const rect = createSVGElement("rect")
      rect.setAttribute("rx", CORNER_RADIUS)
      rect.setAttribute("ry", CORNER_RADIUS)
      rect.setAttribute("fill", BOX_COL)

      const title = createSVGElement("text")
      title.setAttribute("style", "font-weight:600;text-transform:uppercase")
      title.setAttribute("fill", TEXT_COL)
      title.setAttribute("alignment-baseline", "hanging")
      title.setAttribute("font-size", FONT_SIZE)
      title.setAttribute("font-family", `Inter,sans-serif`)

      const text = document.createTextNode("-")
      title.appendChild(text)

      const group = createSVGElement("g")
      group.appendChild(rect)
      group.appendChild(title)
      return group
  }

  const updateNode = (label, point, group) => {
      const [rect, title] = group.childNodes
      rect.setAttribute("x", point.x)
      rect.setAttribute("y", point.y)
      title.setAttribute("x", point.x + TEXT_PADDING_LEFT)
      title.setAttribute("y", point.y + TEXT_PADDING_TOP)
      const text = title.firstChild
      text.nodeValue = label
  }

  const updateDummyNode = (point, group) => {
      const [rect, title] = group.childNodes
      rect.setAttribute("x", point.x)
      rect.setAttribute("y", point.y)
      title.setAttribute("x", point.x + TEXT_PADDING_LEFT)
      title.setAttribute("y", point.y + TEXT_PADDING_TOP)
      const text = title.firstChild
      text.nodeValue = "<???>???"
  }

  const createPathLoop = (bb) => {
      return `M${bb.x + bb.width / 2 - CORNER_RADIUS / 2} ${bb.y} A ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 1, 1, ${bb.x + bb.width / 2 + CORNER_RADIUS / 2 + ARROW} ${bb.y - ARROW}`
  }

  const createPathUp = (bb1, bb2) => {
      return `M${bb1.x + bb1.width / 2} ${bb1.y} L ${bb2.x + bb2.width / 2} ${bb2.y + bb2.height + ARROW}`
  }

  const createPathRight = (bb1, bb2) => {
      return `M${bb1.x + bb1.width} ${bb1.y + bb1.height / 2} L ${bb2.x - ARROW} ${bb2.y + bb2.height / 2}`
  }

  const createPathDown = (bb1, bb2) => {
      return `M${bb1.x + bb1.width / 2} ${bb1.y + bb1.height} L ${bb2.x + bb2.width / 2} ${bb2.y - ARROW}`
  }

  const createPathLeft = (bb1, bb2) => {
      return `M${bb1.x} ${bb1.y + bb1.height / 2} L ${bb2.x + bb2.width + ARROW} ${bb2.y + bb2.height / 2}`
  }

  const createPathUpRight = (bb1, bb2) => {
      const move = `M${bb1.x + bb1.width / 2},${bb1.y}`
      const up1 = `v ${((bb2.y + bb2.height / 2) - (bb1.y - bb1.height / 2)) / 2 + CORNER_RADIUS}`
      const corner1 = `a ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 0 1, ${CORNER_RADIUS} -${CORNER_RADIUS}`
      const right = `h ${(bb2.x + bb2.width / 2) - (bb1.x + bb1.width / 2) - (2 * CORNER_RADIUS)}`
      const corner2 = `a ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 0 0, ${CORNER_RADIUS} -${CORNER_RADIUS}`
      const up2 = `v ${((bb2.y + bb2.height / 2) - (bb1.y - bb1.height / 2)) / 2 + ARROW + CORNER_RADIUS}`
      return `${move} ${up1} ${corner1} ${right} ${corner2} ${up2}`
  }

  const createPathDownRight = (bb1, bb2) => {
      const move = `M${bb1.x + bb1.width / 2},${bb1.y + bb1.height}`
      const down1 = `v ${((bb2.y - bb2.height / 2) - (bb1.y + bb1.height / 2)) / 2 - CORNER_RADIUS}`
      const corner1 = `a ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 0 0, ${CORNER_RADIUS} ${CORNER_RADIUS}`
      const right = `h ${(bb2.x + bb2.width / 2) - (bb1.x + bb1.width / 2) - (2 * CORNER_RADIUS)}`
      const corner2 = `a ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 0 1, ${CORNER_RADIUS} ${CORNER_RADIUS}`
      const down2 = `v ${((bb2.y - bb2.height / 2) - (bb1.y + bb1.height / 2)) / 2 - ARROW - CORNER_RADIUS}`
      return `${move} ${down1} ${corner1} ${right} ${corner2} ${down2}`
  }

  const createPathDownLeft = (bb1, bb2) => {
      const move = `M${bb1.x + bb1.width / 2},${bb1.y + bb1.height}`
      const down1 = `v ${((bb2.y - bb2.height / 2) - (bb1.y + bb1.height / 2)) / 2 - CORNER_RADIUS}`
      const corner1 = `a ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 0 1, -${CORNER_RADIUS} ${CORNER_RADIUS}`
      const right = `h ${(bb2.x + bb2.width / 2) - (bb1.x + bb1.width / 2) + (2 * CORNER_RADIUS)}`
      const corner2 = `a ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 0 0, -${CORNER_RADIUS} ${CORNER_RADIUS}`
      const down2 = `v ${((bb2.y - bb2.height / 2) - (bb1.y + bb1.height / 2)) / 2 - ARROW - CORNER_RADIUS}`
      return `${move} ${down1} ${corner1} ${right} ${corner2} ${down2}`
  }

  const createPathUpLeft = (bb1, bb2) => {
      const move = `M${bb1.x + bb1.width / 2},${bb1.y}`
      const up1 = `v ${((bb2.y + bb2.height / 2) - (bb1.y - bb1.height / 2)) / 2 + CORNER_RADIUS}`
      const corner1 = `a ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 0 0, -${CORNER_RADIUS} -${CORNER_RADIUS}`
      const left = `h ${(bb2.x + bb2.width / 2) - (bb1.x + bb1.width / 2) + (2 * CORNER_RADIUS)}`
      const corner2 = `a ${CORNER_RADIUS} ${CORNER_RADIUS}, 0, 0 1, -${CORNER_RADIUS} -${CORNER_RADIUS}`
      const up2 = `v ${((bb2.y + bb2.height / 2) - (bb1.y - bb1.height / 2)) / 2 + ARROW + CORNER_RADIUS}`
      return `${move} ${up1} ${corner1} ${left} ${corner2} ${up2}`
  }


  const createEdge = () => {
      // Line
      const path = createSVGElement("path")
      path.setAttribute("stroke", ARROW_COL)
      path.setAttribute("stroke-width", STROKE_WIDTH)
      path.setAttribute("fill", "none")
      path.setAttribute("marker-end", "url(#arrow)")

      return path
  }

  const updateEdge = (path, vEdge) => {
      path.setAttribute("d", vEdge)
  }

  // Names
  //
  //     ----o----o----o----
  //     |  NW    N   NE    |
  //     o W              E o
  //     |  SW    S   SE    |
  //     ----o----o----o----
  // 

  const calculateVirtualEdge = (n1, n2) => {

      let bb1 = n1.getBBox()
      let bb2 = n2.getBBox()

      const down = bb2.y + bb2.height / 2 > bb1.y + bb1.height / 2
      const up = bb2.y + bb2.height / 2 < bb1.y + bb1.height / 2
      const left = bb2.x + bb2.width / 2 < bb1.x + bb1.width / 2
      const right = bb2.x + bb2.width / 2 > bb1.x + bb1.width / 2


      let toDraw;
      if (!up && !down && !right && !left) {
          toDraw = createPathLoop(bb1)
      } else if (up && !right && !left) {
          toDraw = createPathUp(bb1, bb2)
      } else if (down && !right && !left) {
          toDraw = createPathDown(bb1, bb2)
      } else if (left && !up && !down) {
          toDraw = createPathLeft(bb1, bb2)
      } else if (right && !up && !down) {
          toDraw = createPathRight(bb1, bb2)
      } else if (up && right) {
          toDraw = createPathUpRight(bb1, bb2)
      } else if (down && right) {
          toDraw = createPathDownRight(bb1, bb2)
      } else if (down && left) {
          toDraw = createPathDownLeft(bb1, bb2)
      } else if (up && left) {
          toDraw = createPathUpLeft(bb1, bb2)
      } else {
          console.error("Hit an unreachable case")
      }
      return toDraw;
  }

  // type VEdge = Path"
  // type VNode = { position :: Point, width :: Number, height :: Number }

  exports.render = (svgGraph) => (nodes) => (edges) => (positions) => () => {
      if (!svgGraph.elementCache || !svgGraph.vdom) {
          // initialise elementCache
          console.log("initialising element cache")
          svgGraph.elementCache = {}
          svgGraph.edgeElementCache = {}
          svgGraph.vdom = { vNodes: {}, vEdges: {} }
      }

      // Calculate new node vDom
      const maxLayerLength = (() => {
          switch (positions.length) {
              case 0: return 0
              case 1: return positions[0].length
              case 2: return Math.max(positions[0].length, positions[1].length)
              default: return Math.max(positions[0].length, positions[1].length, positions[positions.length - 1].length)
          }
      })()
      const newVNodes = positions.flatMap((layer, layerIdx) => {
          return layer.flatMap((nodeId, idx) => {
              const node = nodes.find(x => x.id == nodeId)
              const result = {
                  node,
                  x: idx * MAX_NODE_WIDTH + (((maxLayerLength - layer.length) / 2) * MAX_NODE_WIDTH),
                  y: layerIdx * LAYER_HEIGHT,
              }
              return [result]
          })
      })

      const vNodeDiff = (() => {
          const result = [];
          const toDelete = {}
          Object.assign(toDelete, svgGraph.vdom.vNodes)
          newVNodes.forEach(vNode => {
              const fromCache = svgGraph.vdom.vNodes[vNode.node.id]
              if (!fromCache) { // Not in cache yet!
                  result.push({ type: "add", vNode })
              } else if (fromCache.x == vNode.x && fromCache.y == vNode.y) {
                  // Cached and fine
              } else {
                  // In cache but stale
                  result.push({ type: "update", vNode })
              }
              // Delete from toDelete means keep
              delete toDelete[vNode.node.id]
          })
          for (const key in toDelete) {
              result.push({ type: "delete", id: toDelete[key].node.id })
          }
          return result
      })()

      // Apply VDom changes
      vNodeDiff.forEach(change => {
          if (change.type == "add") {
              // console.log("Create", change.vNode.node.id)
              const element = createNodeGroupElement()
              const position = { x: change.vNode.x, y: change.vNode.y }
              if (change.vNode.node.isDummy) {
                  updateDummyNode(position, element)
              } else {
                  updateNode(change.vNode.node.label, position, element)
              }
              appendNode(element, svgGraph)
              svgGraph.elementCache[change.vNode.node.id] = element
              svgGraph.vdom.vNodes[change.vNode.node.id] = change.vNode
          }
          else if (change.type == "update") {
              // console.log("Update", change.vNode.node.id)
              const element = svgGraph.elementCache[change.vNode.node.id]
              const position = { x: change.vNode.x, y: change.vNode.y }
              updateNode(change.vNode.node.label, position, element)
              svgGraph.vdom.vNodes[change.vNode.node.id] = change.vNode
          } else if (change.type == "delete") {
              // console.log("Delete", change.id)
              const element = svgGraph.elementCache[change.id]
              svgGraph.removeChild(element)
              delete svgGraph.elementCache[change.id]
              delete svgGraph.vdom.vNodes[change.id]
          }
      })

      // Calculate new edge vDom
      const newEdgeVNodes = edges.map((edge) => {
          const fromNodeElement = svgGraph.elementCache[edge.from]
          const toNodeElement = svgGraph.elementCache[edge.to]
          const fromNode = nodes.find(x => x.id === edge.from)
          const toNode = nodes.find(x => x.id === edge.to)
          const vEdge = calculateVirtualEdge(
              fromNodeElement, toNodeElement,
              fromNode.isDummy, toNode.isDummy)
          return { from: edge.from, to: edge.to, vEdge }
      })

      const vNodeEdgeDiff = (() => {
          const result = [];
          const toDelete = Object.assign({}, svgGraph.vdom.vEdges)
          newEdgeVNodes.forEach(({ vEdge, from, to }) => {
              const key = JSON.stringify({ from, to })
              const fromCache = svgGraph.vdom.vEdges[key]
              if (!fromCache) { // Not in cache yet!
                  result.push({ type: "add", vEdge, key })
              } else if (fromCache == key) {
                  // Cached and fine
              } else {
                  // In cache but stale
                  result.push({ type: "update", vEdge, key })
              }
              // Delete from toDelete means keep
              delete toDelete[key]
          })
          for (const key2 in toDelete) {
              result.push({ type: "delete", key: key2 })
          }
          return result
      })()

      // Apply VDom changes
      vNodeEdgeDiff.forEach(change => {
          if (change.type == "add") {
              // console.log("Create edge", change.key)
              const element = createEdge()
              svgGraph.appendChild(element)
              updateEdge(element, change.vEdge)
              svgGraph.edgeElementCache[change.key] = element
              svgGraph.vdom.vEdges[change.key] = change.vEdge
          }
          else if (change.type == "update") {
              // console.log("Update edge", change.key)
              const element = svgGraph.edgeElementCache[change.key]
              updateEdge(element, change.vEdge)
              svgGraph.edgeElementCache[change.key] = element
              svgGraph.vdom.vEdges[change.key] = change.vEdge
          } else if (change.type == "delete") {
              // console.log("Delete edge", change.key)
              const element = svgGraph.edgeElementCache[change.key]
              svgGraph.removeChild(element)
              delete svgGraph.edgeElementCache[change.key]
              delete svgGraph.vdom.vEdges[change.key]
          }
      })

  }
})(PS["Main"] = PS["Main"] || {});
(function($PS) {
  // Generated by purs version 0.14.1
  "use strict";
  $PS["Main"] = $PS["Main"] || {};
  var exports = $PS["Main"];
  var $foreign = $PS["Main"];
  var Algorithms = $PS["Algorithms"];
  var Data_Nullable = $PS["Data.Nullable"];
  var Data_Semigroup = $PS["Data.Semigroup"];
  var Data_Time_Duration = $PS["Data.Time.Duration"];                
  var someNodes = [ {
      id: "some",
      label: "Some Node",
      isDummy: Data_Nullable.notNull(false)
  }, {
      id: "another",
      label: "Another Node",
      isDummy: Data_Nullable.notNull(false)
  }, {
      id: "queue",
      label: "Queue Node",
      isDummy: Data_Nullable.notNull(false)
  }, {
      id: "db",
      label: "DB Node",
      isDummy: Data_Nullable.notNull(false)
  }, {
      id: "bs",
      label: "BS Node",
      isDummy: Data_Nullable.notNull(false)
  }, {
      id: "bus",
      label: "Bus Node",
      isDummy: Data_Nullable.notNull(false)
  }, {
      id: "last",
      label: "Last Node",
      isDummy: Data_Nullable.notNull(false)
  }, {
      id: "hollywood",
      label: "Hollywood Service",
      isDummy: Data_Nullable.notNull(false)
  } ];
  var minusDuration = function (dictSemigroup) {
      return function (dictDuration) {
          return function (x) {
              return function (y) {
                  return Data_Semigroup.append(dictSemigroup)(x)(Data_Time_Duration.negateDuration(dictDuration)(y));
              };
          };
      };
  };
  var interactions = [ {
      label: "Bla bla",
      from: "some",
      to: "another"
  }, {
      label: "Bla bl",
      from: "bs",
      to: "hollywood"
  }, {
      label: "label",
      from: "some",
      to: "bus"
  }, {
      label: "label",
      from: "bus",
      to: "bs"
  }, {
      label: "label",
      from: "another",
      to: "last"
  }, {
      label: "Bla bla",
      from: "some",
      to: "bs"
  }, {
      label: "label",
      from: "hollywood",
      to: "queue"
  }, {
      label: "label",
      from: "another",
      to: "hollywood"
  }, {
      label: "label",
      from: "db",
      to: "last"
  } ];
  var run = function (svgGraph) {
      var ordered = Algorithms.sugiyama({
          nodes: someNodes,
          edges: interactions
      });
      return $foreign.render(svgGraph)(ordered.nodes)(ordered.edges)(ordered.order);
  };
  var main = function __do() {
      var svgGraph = $foreign.init();
      return run(svgGraph)();
  };
  exports["main"] = main;
  exports["run"] = run;
  exports["someNodes"] = someNodes;
  exports["interactions"] = interactions;
  exports["minusDuration"] = minusDuration;
  exports["init"] = $foreign.init;
  exports["render"] = $foreign.render;
})(PS);
PS["Main"].main();