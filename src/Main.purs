module Main where

import Prelude
import Algorithms (assignLayers, fillUp, greedyCycleRemoval, removeTwoCycles)
import Data.Array as Array
import Data.DateTime.Instant (unInstant)
import Data.Time.Duration (class Duration, negateDuration)
import Effect (Effect)
import Effect.Aff (Aff, Milliseconds(..), delay, launchAff_)
import Effect.Class (liftEffect)
import Effect.Now (now)
import Effect.Random (randomInt)
import Foreign.Object (Object)
import Types (Edge(..), EdgeLabel(..), Graph(..), Node(..), NodeId(..), NodeLabel(..))

foreign import data SVGGraph ∷ Type

type Point =
  { x ∷ Int, y ∷ Int }

foreign import init ∷ Effect SVGGraph

foreign import render ∷ SVGGraph -> Array Node -> Array Edge -> Object Int -> Effect Unit

main ∷ Effect Unit
main = do
  svgGraph <- init
  run svgGraph

run ∷ SVGGraph -> Effect Unit
run svgGraph = do
  launchAff_ mainLoop
  where
    update = do
      let
        nodes = someNodes
        edges = interactions
        -- nodes =
        --   [ Node { id: NodeId "n1", label: NodeLabel "1" }
        --   , Node { id: NodeId "n2", label: NodeLabel "2" }
        --   , Node { id: NodeId "n3", label: NodeLabel "3" }
        --   , Node { id: NodeId "n4", label: NodeLabel "4" }
        --   ]
        -- edges =
        --   [ Edge { from: NodeId "n1", to: NodeId "n2", label: EdgeLabel "" }
        --   , Edge { from: NodeId "n1", to: NodeId "n4", label: EdgeLabel "" }
        --   , Edge { from: NodeId "n2", to: NodeId "n3", label: EdgeLabel "" }
        --   , Edge { from: NodeId "n3", to: NodeId "n4", label: EdgeLabel "" }
        --   ]
        noTwoCycles = removeTwoCycles $ Graph { nodes, edges }
        noCycles = greedyCycleRemoval $ Graph { nodes, edges: noTwoCycles.edges }
        layers1 = assignLayers $ Graph { nodes, edges: noCycles.edges }
        filled = fillUp (Graph { nodes, edges: edges }) layers1
      render svgGraph filled.nodes filled.edges filled.layers

    mainLoop ∷ Aff Void
    mainLoop = do
      startTime <- now <#> unInstant # liftEffect
      liftEffect update
      endTime <- now <#> unInstant # liftEffect
      delay (5000.0 # Milliseconds)
      -- delay ((1000.0 / 60.0 # Milliseconds) <>- (endTime <>- startTime))
      mainLoop

someNodes ∷ Array Node
someNodes =
  [ Node
      { id: NodeId "some"
      , label: NodeLabel "Some Node"
      }
  , Node
      { id: NodeId "another"
      , label: NodeLabel "Another Node"
      }
  , Node
      { id: NodeId "queue"
      , label: NodeLabel "Queue Node"
      }
  , Node
      { id: NodeId "db"
      , label: NodeLabel "DB Node"
      }
  , Node
      { id: NodeId "bs"
      , label: NodeLabel "BS Node"
      }
  , Node
      { id: NodeId "bus"
      , label: NodeLabel "Bus Node"
      }
  , Node
      { id: NodeId "last"
      , label: NodeLabel "Last Node"
      }
  , Node
      { id: NodeId "hollywood"
      , label: NodeLabel "Hollywood Service"
      }
  ]

interactions ∷ Array Edge
interactions =
  [ Edge
      { label: EdgeLabel "Bla bla"
      , from: NodeId "some"
      , to: NodeId "another"
      }
  --   , Edge
  --       { label: EdgeLabel "Bla bl"
  --       , from: NodeId "another"
  --       , to: NodeId "db"
  --       }
  --   , Edge
  --       { label: EdgeLabel "Bla bl"
  --       , from: NodeId "db"
  --       , to: NodeId "some"
  --       }
  --   , Edge
  --       { label: EdgeLabel "Bla bl"
  --       , from: NodeId "another"
  --       , to: NodeId "some"
  --       }
  --   , Edge
  --       { label: EdgeLabel "Bla bla"
  --       , from: NodeId "bs"
  --       , to: NodeId "some"
  --       }
  --   , Edge
  --       { label: EdgeLabel "Bla bla"
  --       , from: NodeId "hollywood"
  --       , to: NodeId "some"
  --       }
  --   , Edge
  --       { label: EdgeLabel "Bla bl"
  --       , from: NodeId "bus"
  --       , to: NodeId "hollywood"
  --       }
  , Edge
      { label: EdgeLabel "Bla bl"
      , from: NodeId "queue"
      , to: NodeId "db"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "db"
      , to: NodeId "bus"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "some"
      , to: NodeId "db"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "another"
      , to: NodeId "last"
      }
  , Edge
      { label: EdgeLabel "Bla bla"
      , from: NodeId "db"
      , to: NodeId "bs"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "hollywood"
      , to: NodeId "bs"
      }
  ]

minusDuration ∷ ∀ t3. Semigroup t3 => Duration t3 => t3 -> t3 -> t3
minusDuration x y = x <> negateDuration y

infixl 4 minusDuration as <>-
