module Main where

import Prelude
import Data.Array (take)
import Data.Array as Array
import Data.DateTime.Instant (unInstant)
import Data.Time.Duration (class Duration, negateDuration)
import Effect (Effect)
import Effect.Aff (Aff, Milliseconds(..), delay, launchAff_)
import Effect.Class (liftEffect)
import Effect.Now (now)
import Effect.Random (randomInt)
import Random.LCG (mkSeed)
import Test.QuickCheck.Gen (sample, shuffle)

foreign import data Graph ∷ Type

foreign import data Node ∷ Type

foreign import data Path ∷ Type

class Drawable a

instance drawableNode ∷ Drawable Node

instance drawablePath ∷ Drawable Path

type Point =
  { x ∷ Int, y ∷ Int }

type Fns =
  { appendChild ∷ Node -> Effect Unit }

foreign import init ∷ Effect Graph

foreign import render ∷ Graph -> Array Service -> Array Interaction -> Effect Unit

newtype ServiceId = ServiceId String

newtype Service = Service
  { id ∷ ServiceId
  , name ∷ String
  , description ∷ String
  }

newtype InteractionId = InteractionId String

newtype Interaction = Interaction
  { description ∷ String
  , from ∷ ServiceId
  , to ∷ ServiceId
  }

type State =
  { services ∷ Array Service
  , interactions ∷ Array Interaction
  }

main ∷ Effect Unit
main = do
  graph <- init
  run graph

run ∷ Graph -> Effect Unit
run graph = do
  launchAff_ mainLoop
  where
    update = do
      dropAmount <- randomInt 0 (Array.length interactions - 2)
      takeAmount <- randomInt 1 3
      render graph
        [ Service
            { id: ServiceId "some"
            , name: "Some Service"
            , description: "It does something"
            }
        , Service
            { id: ServiceId "another"
            , name: "Another Service"
            , description: "It does something else"
            }
        , Service
            { id: ServiceId "3"
            , name: "Queue Service"
            , description: "It does something else"
            }
        , Service
            { id: ServiceId "4"
            , name: "DB Service"
            , description: "It does something else"
            }
        , Service
            { id: ServiceId "5"
            , name: "BS Service"
            , description: "It does something else"
            }
        , Service
            { id: ServiceId "8"
            , name: "Out of Names Service"
            , description: "It does something else"
            }
        , Service
            { id: ServiceId "6"
            , name: "Last Service"
            , description: "It does something else"
            }
        , Service
            { id: ServiceId "7"
            , name: "Hollywood Service"
            , description: "It does something else"
            }
        ]
        ((Array.drop dropAmount >>> Array.take takeAmount) interactions)

    mainLoop ∷ Aff Void
    mainLoop = do
      startTime <- now <#> unInstant # liftEffect
      liftEffect update
      endTime <- now <#> unInstant # liftEffect
      delay (200.0 # Milliseconds)
      -- delay ((1000.0 / 60.0 # Milliseconds) <>- (endTime <>- startTime))
      mainLoop

interactions ∷ Array Interaction
interactions =
  [ Interaction
      { description: "Bla bla"
      , from: ServiceId "some"
      , to: ServiceId "another"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "another"
      , to: ServiceId "4"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "some"
      , to: ServiceId "6"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "another"
      , to: ServiceId "some"
      }
  , Interaction
      { description: "Bla bla"
      , from: ServiceId "5"
      , to: ServiceId "some"
      }
  , Interaction
      { description: "Bla bla"
      , from: ServiceId "7"
      , to: ServiceId "some"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "another"
      , to: ServiceId "3"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "3"
      , to: ServiceId "4"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "4"
      , to: ServiceId "8"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "some"
      , to: ServiceId "4"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "another"
      , to: ServiceId "6"
      }
  , Interaction
      { description: "Bla bla"
      , from: ServiceId "4"
      , to: ServiceId "5"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "another"
      , to: ServiceId "3"
      }
  , Interaction
      { description: "Bla bl"
      , from: ServiceId "7"
      , to: ServiceId "3"
      }
  ]

minusDuration ∷ ∀ t3. Semigroup t3 => Duration t3 => t3 -> t3 -> t3
minusDuration x y = x <> negateDuration y

infixl 4 minusDuration as <>-
