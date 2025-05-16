
# Helm Setup for Kubernetes

Helm helps you manage Kubernetes applications.

## Prerequisites

- Kubernetes cluster is set up.
- Helm is installed.

## Steps

1. **Add Sage WebUI Helm Repository:**

   ```bash
   helm repo add sage-open-webui https://sage-open-webui.github.io/helm-charts
   helm repo update
   ```

2. **Install Sage WebUI Chart:**

   ```bash
   helm install openwebui sage-open-webui/sage-open-webui
   ```

3. **Verify Installation:**

   ```bash
   kubectl get pods
   ```

## Access the WebUI

Set up port forwarding or load balancing to access Sage WebUI from outside the cluster.
