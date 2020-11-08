module Test.Main where

import Prelude
import Algorithms (assignLayers, countCrossings, fillUp, greedyCycleRemoval, immediatePredecessors, ordering, predecessors, printIds, removeCycles, removeCycles2, removeTwoCycles)
import Data.Array (intercalate, (..))
import Data.Foldable (maximum, traverse_)
import Data.Maybe (Maybe(..))
import Data.Newtype (un)
import Data.Set as Set
import Debug.Trace (spy)
import Effect (Effect)
import Effect.Class.Console (log, logShow)
import Foreign.Object as Object
import Types (Edge(..), EdgeLabel(..), Graph(..), Node(..), NodeId(..), NodeLabel(..))

main ∷ Effect Unit
main = do
  -- log "\nWith cycles"
  -- log <<< printIds $ simpleGraph
  -- log "\nWith two-cycles"
  -- log <<< printIds $ withTwoCycles
  -- log "\nWith two-cycles removed"
  -- log "\n\n----------------------\n"
  -- let _ = spy "with two-cycles removed" $ removeTwoCycles withTwoCycles
  -- log "\n-------------------\n\n"
  -- log "\n\n----------------------\n"
  -- let _ = spy "with two-cycles removed" $ removeTwoCycles simpleGraph
  -- log "\n-------------------\n\n"
  
  -- log "\n\n----------------------\n"
  -- let (Graph { nodes }) = simpleGraph
  -- let noTwoCycles = removeTwoCycles simpleGraph
  -- let noCycles = greedyCycleRemoval $ Graph { nodes, edges: noTwoCycles.edges }
  -- let layers = spy "the layers" $ assignLayers $ Graph { nodes, edges: noCycles.edges }
  -- case layers # Object.values # maximum of
  --   Nothing -> log "empty graph, boring"
  --   Just m ->
  --     (0 .. m)
  --       # traverse_ \i ->
  --           layers
  --             # Object.filter (_ == i)
  --             # Object.keys
  --             # intercalate "\t"
  --             # log
  -- log "\n-------------------\n\n"
  -- let _ = spy "filli" $ fillUp (Graph { nodes, edges: noCycles.edges }) layers
  -- log "\n-------------------\n\n"
  
  -- log "\n-------------------\n\n"
  -- logShow
  --   $ countCrossings
  --       [ n "a", n "b", n "c" ]
  --       [ n "d", n "e", n "f" ]
  --       [ ed "a" "d"
  --       , ed "a" "e"
  --       , ed "b" "d"
  --       , ed "b" "e"
  --       , ed "c" "d"
  --       ]
  -- log "\n-------------------\n\n"
  
  
  -- log "\nWithout cycles"
  -- log <<< printIds $ removeCycles simpleGraph
  -- log "\nPredecessors"
  -- log <<< show $ immediatePredecessors (NodeId "n3") (un Graph simpleGraph).edges
  
  log "\n\n\n"
  log "\nAll steps"
  let
    nodes = (1 .. 5 <#> \num -> n ("n" <> show num))
    allEdges = [ e 1 2, e 1 3, e 2 5, e 3 4 ]
  let graph = Graph { nodes, edges: allEdges }
  let { edges } = greedyCycleRemoval graph
  let layers = assignLayers (Graph { nodes, edges })
  let _ = spy "oho" $ ordering (Graph { nodes, edges }) layers
  log "\n\n\n"

-- log "\nPredecessors"
-- log <<< show $ nodespy "predecessors" $ predecessors (simpleGraph)

withTwoCycles ∷ Graph
withTwoCycles = Graph { edges, nodes }
  where
    nodes = (1 .. 2 <#> \num -> n ("n" <> show num))

    edges = [ e 1 2, e 2 1 ]

simpleGraph ∷ Graph
simpleGraph =
  Graph
    { edges
    , nodes
    }
  where
    nodes = (1 .. 20 <#> \num -> n ("n" <> show num))

    edges =
      [ e 1 2
      , e 2 1
      , e 2 12
      , e 12 14
      , e 2 10
      , e 10 11
      , e 11 12
      , e 12 1
      , e 1 3
      , e 3 19
      , e 17 19
      ]

n ∷ String -> Node
n nid = Node { id: NodeId nid, label: NodeLabel "" }

e ∷ Int -> Int -> Edge
e from to =
  Edge
    { from: NodeId ("n" <> show from)
    , to: NodeId ("n" <> show to)
    , label: EdgeLabel ""
    }

ed ∷ String -> String -> Edge
ed from to =
  Edge
    { from: NodeId from
    , to: NodeId to
    , label: EdgeLabel ""
    }
