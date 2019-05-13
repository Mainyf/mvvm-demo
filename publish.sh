#!/bin/bash
echo "optimization code..."
npm run tslint
if [ $? -eq 0 ]; then
    echo "optimization Successful"
    echo "start commit/push code to remote resp"
    git add .
    git commit -m $1
    git push origin master
fi