#!/usr/bin/env sh

read -p "URL Registry: " registry
read -p "Image Name: " image

tag=$(date +"%Y.%m.%d.%Hh.%Mm")
hub="$registry/$image"

echo "building image $hub:$tag..."
docker build -f Dockerfile.prod -t "$hub:$tag" .

echo "send build to docker hub $hub:$tag..."
docker push "$hub:$tag"
docker push "$hub:latest"

echo 'finish build and push'
