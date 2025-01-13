# Scaling-Insights
QSD-Project: Horizontal Scaling in Kubernetes

## Prerequisites
1. Install Node
2. Install Docker
3. Install Helm
4. Enable Kubernetes within Docker Desktop
5. Install K9S

## Running with Docker
1. Start the Docker Daemon
2. Open en terminal in the root of the project
3. Run
```
docker compose up
```

## Running with Kubernetes
1. Go to cms/frontend/
2. Run `docker build . -t frontend`
- Wait for the build to complete
3. Open Docker desktop
4. Go to Images
5. Search the new build image and copy the hash under the name
6. Open the file `helm/values.yaml`
7. Replace the hash after `sha256`
```
  client:
    image: sha256:
```
8. Save the file

9. Go to cms/backend/
10. Run `docker build . -t backend`
- Wait for the build to complete
11. Open Docker desktop
12. Go to Images
13. Search the new build image and copy the hash under the name
14. Open the file `helm/values.yaml`
15. Replace the hash after `sha256`
```
cms:
  api:
    image: sha256:
```
16. Save the file

17. Open `/helm` in a terminal
18. Run `helm install scaling-insights .`
If everything went right you should see something like this in the terminal:
```
NAME: scaling-insights
LAST DEPLOYED: Thu Nov 21 15:50:22 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

19. Open a new terminal
20. Run the command K9S
21. Open the site in `http://localhost:30080/`

## K9S 
Add the metrics server: https://github.com/kubernetes-sigs/metrics-server
```
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

### Run 
```
kubectl top pods
```

If you see:
```
NAME                                          CPU(cores)   MEMORY(bytes)
scaling-insights-cms-api-68fcbb47c6-2rpsj     1m           28Mi
scaling-insights-cms-client-cc9955b5c-z95xs   1m           41Mi
scaling-insights-db-65b6867b79-nd9bx          1m           59Mi
```

Everything is good.

If you get
```
error: Metrics API not available
```

**Do this:**
Run:
```
kubectl get pods -n kube-system | grep metrics-server
```

If you get an error while using `grep`:
Run:
```
kubectl get pods -n kube-system | findstr metrics-server
```

If you get something like this:
```
metrics-server-75bf97fcc9-h6vs5          0/1     Running   0          5m37s
```

You have an error so the metrics-server can't start.

**Do this:**
Run:
```
kubectl logs -n kube-system deployment/metrics-server
```

If the log files contains:
```
tls: failed to verify certificate: x509: cannot validate certificate for <IP> because it doesn't contain any IP SANs
```

**Do this:**
Run:
```
kubectl edit deployment metrics-server -n kube-system
```

Go to:
```
    spec:
      containers:
      - args:
```

Add this:
```
- --kubelet-insecure-tls
- --kubelet-preferred-address-types=InternalIP,Hostname,ExternalIP
```

It should now be something like 
```
    spec:
      containers:
      - args:
        - --cert-dir=/tmp
        - --secure-port=10250
        - --kubelet-use-node-status-port
        - --metric-resolution=15s
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP,Hostname,ExternalIP
```

Save the file and wait for `metrics-server` to restart.

Run this again:
```
kubectl logs -n kube-system deployment/metrics-server
```

And check if the error are gone.

Now run `kubectl top nodes` again and see if the error is fixed.
It should now be something like this:
```
NAME                                          CPU(cores)   MEMORY(bytes)
scaling-insights-cms-api-68fcbb47c6-2rpsj     1m           28Mi
scaling-insights-cms-client-cc9955b5c-z95xs   1m           41Mi
scaling-insights-db-65b6867b79-nd9bx          1m           59Mi
```

Open K9S and see if CPU and memory usage aren't n/a anymore 

## Updating