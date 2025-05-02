## Updating

To update your local Docker installation to the latest version, you can either use **Watchtower** or manually update the container.

### Option 1: Using Watchtower

With [Watchtower](https://containrrr.dev/watchtower/), you can automate the update process:

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once sage-open-webui
```

_(Replace `sage-open-webui` with your container's name if it's different.)_

### Option 2: Manual Update

1. Stop and remove the current container:

   ```bash
   docker rm -f sage-open-webui
   ```

2. Pull the latest version:

   ```bash
   docker pull ghcr.io/Startr/AI-WEB-openwebui:main
   ```

3. Start the container again:

   ```bash
   docker run -d -p 3000:8080 -v sage-open-webui:/app/backend/data --name sage-open-webui ghcr.io/Startr/AI-WEB-openwebui:main
   ```

Both methods will get your Docker instance updated and running with the latest build.
