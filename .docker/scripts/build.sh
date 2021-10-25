#!/usr/bin/env sh

read -p "URL Registry: " registry
read -p "Image Name: " name

tag=$(date +"%Y.%m.%d.%Hh.%Mm")
image="$registry/$name"

echo "building name $image:$tag..."
docker build -f Dockerfile.prod -t "$image:$tag" .
docker tag "$image:$tag" "$name:latest"

echo "send build to docker image $image:$tag..."
docker push "$image:$tag"
docker push "$image:latest"

echo 'finish build and push'
