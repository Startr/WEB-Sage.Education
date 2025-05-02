## Quick Start with Docker 🐳

Follow these steps to install Sage WebUI with Docker.

## Step 1: Pull the Sage WebUI Image

Start by pulling the latest Sage WebUI Docker image from the GitHub Container Registry.

```bash
docker pull ghcr.io/Startr/AI-WEB-openwebui:main
```

## Step 2: Run the Container

Run the container with default settings. This command includes a volume mapping to ensure persistent data storage.

```bash
docker run -d -p 3000:8080 -v sage-open-webui:/app/backend/data --name sage-open-webui ghcr.io/Startr/AI-WEB-openwebui:main
```

### Important Flags

- **Volume Mapping (`-v sage-open-webui:/app/backend/data`)**: Ensures persistent storage of your data. This prevents data loss between container restarts.
- **Port Mapping (`-p 3000:8080`)**: Exposes the WebUI on port 3000 of your local machine.

### Using GPU Support

For Nvidia GPU support, add `--gpus all` to the `docker run` command:

```bash
docker run -d -p 3000:8080 --gpus all -v sage-open-webui:/app/backend/data --name sage-open-webui ghcr.io/Startr/AI-WEB-openwebui:cuda
```


#### Single-User Mode (Disabling Login)

To bypass the login page for a single-user setup, set the `WEBUI_AUTH` environment variable to `False`:

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v sage-open-webui:/app/backend/data --name sage-open-webui ghcr.io/Startr/AI-WEB-openwebui:main
```

:::warning
You cannot switch between single-user mode and multi-account mode after this change.
:::

#### Advanced Configuration: Connecting to Ollama on a Different Server

To connect Sage WebUI to an Ollama server located on another host, add the `OLLAMA_BASE_URL` environment variable:

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v sage-open-webui:/app/backend/data --name sage-open-webui --restart always ghcr.io/Startr/AI-WEB-openwebui:main
```

## Access the WebUI

After the container is running, access Sage WebUI at:

[http://localhost:3000](http://localhost:3000)

For detailed help on each Docker flag, see [Docker's documentation](https://docs.docker.com/engine/reference/commandline/run/).
