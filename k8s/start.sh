#!/usr/bin/env sh

kubectl apply -f namespace.yaml
kubectl apply -f security.yaml
kubectl apply -f service.yaml
kubectl apply -f environments.yaml
kubectl apply -f redis.yaml
kubectl apply -f postgres.yaml
kubectl apply -f pvc-storage.yaml
kubectl apply -f deployment.yaml
#kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
#kubectl apply -f ingress.yaml
