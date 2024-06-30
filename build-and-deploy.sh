#/bin/bash

set -ex

export AWS_PROFILE=smotana

npm run build

aws s3 sync ./dist/ s3://matusnomin.com/ --cache-control "max-age=604800" --exclude index.html
aws s3 sync ./dist/ s3://matusnomin.com/ --cache-control "max-age=0" --exclude "*" --include index.html

aws cloudfront create-invalidation --distribution-id E16OUDB7557YPC --paths "/index.html" "/bundle*" "/favicon*"
