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
  for (i = 0; i < graph.edges.length; i++) {
    if (removed.has(graph.edges[i])) {
      continue
    }
    for (j = i + 1; j < graph.edges.length; j++) {
      if (graph.edges[i].from == graph.edges[j].to
        && graph.edges[i].to == graph.edges[j].from) {
        removed.add(graph.edges[j])
      }
    }
    edges.push(graph.edges[i])
  }
  return { edges, removed: Array.from(removed) }
}

const findSource = (nodes, predecessors) => {
  for (i = 0; i < nodes.length; i++)
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
  for (i = 0; i < nodes.length; i++) {
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
      for (i = 1; i < nodes.length; i++) {
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
      edges: graph.edges.map(e => (sl.indexOf(e.from) != -1) ?
        { from: e.to, to: e.from, label: e.label } : e
      )
    }
  }
}
// G = (V, E)
// Sl ← Set.empty
// Sr ← Set.empty
// while G is not empty do
//   while G contains a sink do 
//     Choose a sink v
//     Remove v from G 
//     Prepend v to Sr
//   end while
//   while G contains a source do
//      Choose a source u 
//      Remove u from G 
//      Append u to Sl
//   end while
//   if G is not empty then
//     Choose a vertex w such that d+(w) − d−(w) is maximum 
//     Remove w from G
//     Append w it to Sl
//   end if 
// end while
