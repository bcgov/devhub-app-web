#! /bin/bash
# variables
# ALGOLIA_API_KEY string
# ALGOLIA_APP_ID string
# ALGOLIA_SOURCE_INDEX string
# ALGOLIA_DEST_INDEX string
echo https://${ALGOLIA_APP_ID}.algolia.net/1/indexes/${ALGOLIA_SOURCE_INDEX}/operation"

curl -X POST \
     -H "X-Algolia-API-Key: ${ALGOLIA_API_KEY}" \
     -H "X-Algolia-Application-Id: ${ALGOLIA_APP_ID}" \
     --data-binary "{ \"operation\": \"copy\", \"destination\":\"${ALOGOLIA_DEST_INDEX}\" }" \
    "https://${ALGOLIA_APP_ID}.algolia.net/1/indexes/${ALGOLIA_SOURCE_INDEX}/operation"
