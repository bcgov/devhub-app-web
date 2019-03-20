---
title: Search Flow in Devhub
description: An overview of how state is managed for searches
---

# Searching

The search flow for devhub is fairly simple and can be broken up into [] steps.

1. Search component

The search components implementation is that when a search is conducted it **navigates** to the page
path with a search query (with reach or react router navigation does not refresh the page or lose state)

So if there was a search of `hello world` this translates to `navigate('/?q=hello+world');` when searching
from the homepage. 

2. On did update of the page component

The logical steps in the did update routine is

- check for the existance of a the `q` query param in the url

- check if the query param in the url does not match the query param in the state (to prevent infinite loops)

- tokenize the query param (break the search terms into its sub components)

- set the tokenized search terms into state

3. Conduct the Lunr Search

- attempt to search lunr using `lunr.index.search`
> this allows for logical search terms such as OR or AND as well as other terms https://lunrjs.com/guides/searching.html

- if this search fails (which it can if a searching for term presences that don't exist within the index), attempt
search again, treating the terms as plain text

- convert any search results into a js plain object 'map' (organized by index id)

- set results in state
