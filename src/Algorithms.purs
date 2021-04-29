module Algorithms where

import Prelude
import Control.Monad.ST (ST)
import Control.Monad.ST as ST
import Data.Array as Array
import Data.Array.ST (STArray)
import Data.Array.ST as AST
import Data.Maybe (isJust)
import Data.Traversable (for_, intercalate)
import Foreign.Object (Object)
import Foreign.Object as Object
import Foreign.Object.ST (STObject)
import Foreign.Object.ST as OST
import Types (Edge(..), Graph(..), Node, NodeId(..))
import Unsafe.Coerce (unsafeCoerce)

removeCycles ∷ Graph -> Graph
removeCycles (Graph { nodes, edges }) = Graph { nodes, edges: newEdges }
  where
    newEdges =
      ST.run do
        visited <- OST.new
        mstEdges <- AST.empty
        for_ edges \edge@(Edge { from: NodeId fromId, to: NodeId toId }) -> do
          seen <- OST.peek fromId visited <#> isJust
          unless seen do
            AST.push edge mstEdges # void
            OST.poke toId true visited # void
        AST.freeze mstEdges

foreign import greedyCycleRemoval ∷ Graph -> Array Edge

foreign import removeTwoCycles ∷ Graph -> { edges ∷ Array Edge, removed ∷ Array Edge }

removeCycles2 ∷ Graph -> Graph
removeCycles2 (Graph { nodes, edges }) = Graph { nodes, edges: newEdges }
  where
    newEdges =
      ST.run do
        visited <- OST.new
        mstEdges <- AST.empty
        for_ edges \edge@(Edge { from: NodeId fromId, to: NodeId toId }) -> do
          seen <- OST.peek fromId visited <#> isJust
          unless seen do
            AST.push edge mstEdges # void
            OST.poke toId true visited # void
        AST.freeze mstEdges

ostKeys ∷ ∀ r a. STObject r a -> Array String
ostKeys = Object.keys <<< unsafeCoerce

astLength ∷ ∀ r a. STArray r a -> ST r Int
astLength ast = AST.unsafeFreeze ast <#> Array.length

foreign import assignLayers ∷ Graph -> Object Int

foreign import predecessors ∷ Graph -> Object (Array NodeId)

foreign import successors ∷ Graph -> Object (Array NodeId)

foreign import fillUp ∷ Graph -> Object Int -> { nodes ∷ Array Node, edges ∷ Array Edge, layers ∷ Object Int }

foreign import countCrossings ∷ Array Node -> Array Node -> Array Edge -> Int

foreign import unsafeLookup ∷ ∀ a. String -> Object a -> a

foreign import ordering ∷ Graph -> Object Int -> Array (Array NodeId)

sugiyama ∷ Graph -> { nodes ∷ Array Node, edges ∷ Array Edge, order ∷ Array (Array NodeId) }
sugiyama g@(Graph { nodes, edges }) = do
  let noTwoCycles = removeTwoCycles g
  let noCyclesEdges = greedyCycleRemoval $ Graph { nodes: nodes, edges: noTwoCycles.edges }
  let layers1 = assignLayers $ Graph { nodes: nodes, edges: noCyclesEdges }
  let filled = fillUp g layers1
  let order = ordering (Graph { nodes: filled.nodes, edges: filled.edges }) filled.layers
  { nodes: filled.nodes, edges: noTwoCycles.removed <> filled.edges, order }

immediatePredecessors ∷ NodeId -> Array Edge -> Array NodeId
immediatePredecessors nid arr = arr >>= \(Edge { to, from }) -> if to == nid then [ from ] else []

printIds ∷ Graph -> String
printIds (Graph { nodes, edges }) = intercalate "\n" (edges <#> printEdge)
  where
    printEdge (Edge { from: NodeId fromId, to: NodeId toId }) = fromId <> " -> " <> toId
