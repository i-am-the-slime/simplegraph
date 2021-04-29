module Main where

import Prelude
import Algorithms (sugiyama)
import Data.DateTime.Instant (unInstant)
import Data.Nullable as Nullable
import Data.Time.Duration (class Duration, negateDuration)
import Effect (Effect)
import Effect.Aff (Aff, Milliseconds(..), delay, launchAff_)
import Effect.Class (liftEffect)
import Effect.Now (now)
import Types (Edge(..), EdgeLabel(..), Graph(..), Node(..), NodeId(..), NodeLabel(..))

foreign import data SVGGraph ∷ Type

type Point =
  { x ∷ Int, y ∷ Int }

foreign import init ∷ Effect SVGGraph

foreign import render ∷ SVGGraph -> Array Node -> Array Edge -> Array (Array NodeId) -> Effect Unit

main ∷ Effect Unit
main = do
  svgGraph <- init
  run svgGraph

run ∷ SVGGraph -> Effect Unit
run svgGraph = do
  let ordered = sugiyama (Graph { nodes: someNodes, edges: interactions })
  render svgGraph ordered.nodes ordered.edges ordered.order

someNodes ∷ Array Node
someNodes =
  [ Node
      { id: NodeId "some"
      , label: NodeLabel "Some Node"
      , isDummy: Nullable.notNull false
      }
  , Node
      { id: NodeId "another"
      , label: NodeLabel "Another Node"
      , isDummy: Nullable.notNull false
      }
  , Node
      { id: NodeId "queue"
      , label: NodeLabel "Queue Node"
      , isDummy: Nullable.notNull false
      }
  , Node
      { id: NodeId "db"
      , label: NodeLabel "DB Node"
      , isDummy: Nullable.notNull false
      }
  , Node
      { id: NodeId "bs"
      , label: NodeLabel "BS Node"
      , isDummy: Nullable.notNull false
      }
  , Node
      { id: NodeId "bus"
      , label: NodeLabel "Bus Node"
      , isDummy: Nullable.notNull false
      }
  , Node
      { id: NodeId "last"
      , label: NodeLabel "Last Node"
      , isDummy: Nullable.notNull false
      }
  , Node
      { id: NodeId "hollywood"
      , label: NodeLabel "Hollywood Service"
      , isDummy: Nullable.notNull false
      }
  ]

interactions ∷ Array Edge
interactions =
  [ Edge
      { label: EdgeLabel "Bla bla"
      , from: NodeId "some"
      , to: NodeId "another"
      }
  , Edge
      { label: EdgeLabel "Bla bl"
      , from: NodeId "bs"
      , to: NodeId "hollywood"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "some"
      , to: NodeId "bus"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "bus"
      , to: NodeId "bs"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "another"
      , to: NodeId "last"
      }
  , Edge
      { label: EdgeLabel "Bla bla"
      , from: NodeId "some"
      , to: NodeId "bs"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "hollywood"
      , to: NodeId "queue"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "another"
      , to: NodeId "hollywood"
      }
  , Edge
      { label: EdgeLabel "label"
      , from: NodeId "db"
      , to: NodeId "last"
      }
  ]

minusDuration ∷ ∀ t3. Semigroup t3 => Duration t3 => t3 -> t3 -> t3
minusDuration x y = x <> negateDuration y

infixl 4 minusDuration as <>-
