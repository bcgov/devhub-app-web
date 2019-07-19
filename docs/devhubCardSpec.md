# Devhub Card Spec

The basic unit of information within the Devhub is a __Resource__. All resources are represented within the
ui as a card. This spec outlines the _minimum_ required metadata for a resource to be represented as a card. 

As a note, all of this metadata should be made available as a _node field_.


## Title `<node>.fields.title` <String>

The title of the card

## Description `<node>.fields.description` <String>

The summary of the card (keep this to 140 characters or less for best results)

## Slug `<node>.fields.slug` <String>

This is the page path fragment for a resource. Resources can be linked to topics and so this
fragment in conjunction with a topic slug makes a full path. Alternatively, a resource can be _standalone_
in which case the slug is used as the full path to a template page.

## Image `<node>.fields.image` (this may be deprecated in future versions) <String>

Path to an external image url 

## ResourceType `<node>.fields.resourceType` <String>

One of the resource types enum

## Personas `<node>.fields.personas` <Array>

A set of resources this resource is relevant for, currently supported personas are
- Developer
- Designer
- Product Owner

## Labels `<node>.fields.labels` <Array>

A list of strings that are organized in key value pairs. There may be a set of reserved key value pairs
to trigger UI/UX effects in the future.

Labels will be validated in the future and ignored if they do not meet the spec. A well formed label looks like

`label=value` or `movie=starwars episode 4`

## Tags `<node>.fields.tags` <Array>

A list of strings that are added to the search index for this resource. These can also be thought as
'keywords'