module Types where

import Prelude
import Data.Newtype (class Newtype)
import Data.Nullable (Nullable)

newtype NodeId = NodeId String

derive instance netwypeNodeId ∷ Newtype NodeId _
derive newtype instance eqNodeId ∷ Eq NodeId
derive newtype instance ordNodeId ∷ Ord NodeId
derive newtype instance showNodeId ∷ Show NodeId

newtype NodeLabel = NodeLabel String

derive instance netwypeNodeLabel ∷ Newtype NodeLabel _
derive newtype instance eqNodeLabel ∷ Eq NodeLabel
derive newtype instance ordNodeLabel ∷ Ord NodeLabel

newtype EdgeLabel = EdgeLabel String

newtype Node = Node { id ∷ NodeId, label ∷ NodeLabel, isDummy ∷ Nullable Boolean }

derive instance netwypeNode ∷ Newtype Node _
derive newtype instance eqNode ∷ Eq Node
derive newtype instance ordNode ∷ Ord Node

newtype Edge = Edge { from ∷ NodeId, to ∷ NodeId, label ∷ EdgeLabel }

newtype Graph = Graph { nodes ∷ Array Node, edges ∷ Array Edge }

derive instance ntGraph ∷ Newtype Graph _
