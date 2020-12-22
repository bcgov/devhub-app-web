#! /bin/bash
# variables
# ALGOLIA_API_KEY string
# ALGOLIA_APP_ID string
# ALGOLIA_INDEX_NAME string

curl -X DELETE \
     -H "X-Algolia-API-Key: ${ALGOLIA_API_KEY}" \
     -H "X-Algolia-Application-Id: ${ALGOLIA_APP_ID}" \
    "https://${ALGOLIA_APP_ID}.algolia.net/1/indexes/$ALGOLIA_INDEX_NAME"