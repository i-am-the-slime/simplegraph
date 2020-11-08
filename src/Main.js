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

// Colours
// const BG_COL = "#090910"
const BG_COL = "#101014"
const BOX_COL = "rgba(32, 33, 40, 0.7)"
const TEXT_COL = "#D0D0D0"
const ARROW_COL = "rgba(255,255,255, 0.5)"

const defs =
    `<defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L${ARROW_LENGTH},3 z" fill="${ARROW_COL}" />
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

const createElement = () => {

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

    const bb1 = n1.getBBox()
    const bb2 = n2.getBBox()

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
        return layer.map((nodeId, idx) => {
            const node = nodes.find(x => x.id == nodeId)
            const result = {
                node,
                x: idx * MAX_NODE_WIDTH + (((maxLayerLength - layer.length) / 2) * MAX_NODE_WIDTH),
                y: layerIdx * 100
            }
            return result
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
            const element = createElement()
            const position = { x: change.vNode.x, y: change.vNode.y }
            updateNode(change.vNode.node.label, position, element)
            appendNode(element, svgGraph)
            svgGraph.elementCache[change.vNode.node.id] = element
            svgGraph.vdom.vNodes[change.vNode.node.id] = change.vNode
        }
        else if (change.type == "update") {
            // console.log("Update", change.vNode.node.id)
            const element = svgGraph.elementCache[change.vNode.node.id]
            const position = { x: change.vNode.x, y: change.vNode.y }
            updateNode(change.vNode.node.label, position, element)
            svgGraph.elementCache[change.vNode.node.id] = element
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
    const newEdgeVNodes = edges.map((interaction) => {
        const fromNode = svgGraph.elementCache[interaction.from]
        const toNode = svgGraph.elementCache[interaction.to]
        const vEdge = calculateVirtualEdge(fromNode, toNode)
        return { from: interaction.from, to: interaction.to, vEdge }
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


/// !!!
// COPIED from Algorithms!!! Change it there and copy back here
/// !!!
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
