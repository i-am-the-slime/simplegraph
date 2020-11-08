exports.unsafeLookup = key => obj => obj[key]

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

exports.countCrossings = countCrossings

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

const VIRT = "_virtual-"
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
      const vNode = { id: nodeId, label: "VIRTUAL" }
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
      // Choose a vertex w such that d+(w) − d−(w) is maximum 
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

    return {
      edges: graph.edges.map(e => (sl.indexOf(e.from) == -1) ? e :
        { from: e.to, to: e.from, label: e.label }
      )
    }
  }
}
