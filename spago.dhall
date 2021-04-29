{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "aff"
  , "arrays"
  , "console"
  , "debug"
  , "effect"
  , "foreign-object"
  , "psci-support"
  , "datetime"
  , "foldable-traversable"
  , "maybe"
  , "newtype"
  , "now"
  , "nullable"
  , "prelude"
  , "st"
  , "unsafe-coerce"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
