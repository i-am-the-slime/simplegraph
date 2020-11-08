module Algorithms where

import Prelude
import Control.Monad.ST (ST, while)
import Control.Monad.ST as ST
import Control.Monad.ST.Ref as STRef
import Data.Array (foldMap)
import Data.Array as Array
import Data.Array.ST (STArray)
import Data.Array.ST as AST
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..), isJust)
import Data.Newtype (un)
import Data.Set as Set
import Data.Traversable (all, find, for_, intercalate)
import Data.Tuple (Tuple(..))
import Foreign.Object (Object)
import Foreign.Object as Object
import Foreign.Object.ST (STObject)
import Foreign.Object.ST as OST
import Types (Edge(..), Graph(..), Node(..), NodeId(..))
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

-- G = (V, E)
-- Sl ← Set.empty
-- Sr ← Set.empty
-- while G is not empty do
--   while G contains a sink do 
--     Choose a sink v
--     Remove v from G 
--     Prepend v to Sr
--   end while
--   while G contains a source do
--      Choose a source u 
--      Remove u from G 
--      Append u to Sl
--   end while
--   if G is not empty then
--     Choose a vertex w such that d+(w) − d−(w) is maximum 
--     Remove w from G
--     Append w it to Sl
--   end if 
-- end while

foreign import greedyCycleRemoval ∷ Graph -> { edges ∷ Array Edge }

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

immediatePredecessors ∷ NodeId -> Array Edge -> Array NodeId
immediatePredecessors nid arr = arr >>= \(Edge { to, from }) -> if to == nid then [ from ] else []

printIds ∷ Graph -> String
printIds (Graph { nodes, edges }) = intercalate "\n" (edges <#> printEdge)
  where
    printEdge (Edge { from: NodeId fromId, to: NodeId toId }) = fromId <> " -> " <> toId
