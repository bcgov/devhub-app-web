## Algolia Custom Definitions

This file contains different sets of JSON payloads to post to our managed indicies. These payloads include
common mispellings, synonyms against our indices to improve the search experience. 

## Where does the data come from?

The data comes from Algolia Search Usage & Statistics

## How are these payloads utilized?

In  our deployment pipeline, when the algolia index  is promoted  to production, the payload is sent to update
settings such as 'searchable attributes' and 'synonyms'. 