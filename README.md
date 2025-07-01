# 🌱 Green Challenge

**Green Challenge** is a full-stack web app for tracking eco-friendly actions, earning points, and competing on a leaderboard.

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend:** Spring Boot (Java 17)
* **Database:** MongoDB
* **Deployment:** Docker, Render, Kubernetes

## 🚀 Features

* User registration & login
* Track, update, delete eco-actions
* View top users via leaderboard
* CI/CD with GitHub Actions

## 📂 Branches

* `master`: Docker Compose setup, deployed to Render
* `test`: Kubernetes manifests for local or cluster deployment

## ⚙️ Quick Start

### Docker (master branch)

```bash
docker compose up --build
```

Visit `http://localhost:3000`.

### Kubernetes (test branch)

```bash
kubectl apply -f k8s/
kubectl port-forward -n green-challenge deployment/frontend 3000:80
kubectl port-forward -n green-challenge deployment/backend 8080:8080
```

Visit `http://localhost:3000`.

### Ingress

After applying `k8s/ingress.yaml` and setting up `/etc/hosts`:

```bash
127.0.0.1 greenchallenge.local
```

Visit `http://greenchallenge.local`.

