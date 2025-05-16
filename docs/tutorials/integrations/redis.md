---
sidebar_position: 30
title: "🔗 Redis Websocket Support"
---

:::warning
This tutorial is a community contribution and is not supported by the Sage WebUI team. It serves only as a demonstration on how to customize Sage WebUI for your specific use case. Want to contribute? Check out the contributing tutorial.
:::

# 🔗 Redis Websocket Support

## Overview

This documentation page outlines the steps required to integrate Redis with Sage WebUI for websocket support. By following these steps, you will be able to enable websocket functionality in your Sage WebUI instance, allowing for real-time communication and updates between clients and your application.

### Prerequisites

* A valid Sage WebUI instance (running version 1.0 or higher)
* A Redis container (we will use `docker.io/valkey/valkey:8.0.1-alpine` in this example, which is based on the latest Redis 7.x release)
* Docker Composer (version 2.0 or higher) installed on your system
* A Docker network for communication between Sage WebUI and Redis
* Basic understanding of Docker, Redis, and Sage WebUI

## Setting up Redis

To set up Redis for websocket support, you will need to create a `docker-compose.yml` file with the following contents:

```yml
version: '3.9'
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = 'PONG' ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info Notes

The `ports` directive is not included in this configuration, as it is not necessary in most cases. The Redis service will still be accessible from within the Docker network by the Sage WebUI service. However, if you need to access the Redis instance from outside the Docker network (e.g., for debugging or monitoring purposes), you can add the `ports` directive to expose the Redis port (e.g., `6379:6379`).

The above configuration sets up a Redis container named `redis-valkey` and mounts a volume for data persistence. The `healthcheck` directive ensures that the container is restarted if it fails to respond to the `ping` command. The `--save 30 1` command option saves the Redis database to disk every 30 minutes if at least 1 key has changed.

:::

To create a Docker network for communication between Sage WebUI and Redis, run the following command:

```bash
docker network create openwebui-network
```

## Configuring Sage WebUI

To enable websocket support in Sage WebUI, you will need to set the following environment variables for your Sage WebUI instance:

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

These environment variables enable websocket support, specify Redis as the websocket manager, and define the Redis URL. Make sure to replace the `WEBSOCKET_REDIS_URL` value with the actual IP address of your Redis instance.

When running Sage WebUI using Docker, you need to connect it to the same Docker network:

```bash
docker run -d \
  --name sage-open-webui \
  --network openwebui-network \
  -v sage-open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/Startr/AI-WEB-openwebui:main
```

Replace `127.0.0.1` with the actual IP address of your Redis container in the Docker network.

## Verification

If you have properly set up Redis and configured Sage WebUI, you should see the following log message when starting your Sage WebUI instance:

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

This confirms that Sage WebUI is using Redis for websocket management. You can also use the `docker exec` command to verify that the Redis instance is running and accepting connections:

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

This command should output `PONG` if the Redis instance is running correctly. If this command fails, you could try this command instead:

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## Troubleshooting

If you encounter issues with Redis or websocket support in Sage WebUI, you can refer to the following resources for troubleshooting:

* [Redis Documentation](https://redis.io/docs)
* [Docker Compose Documentation](https://docs.docker.com/compose/overview/)
* [sysctl Documentation](https://man7.org/linux/man-pages/man8/sysctl.8.html)

By following these steps and troubleshooting tips, you should be able to set up Redis with Sage WebUI for websocket support and enable real-time communication and updates between clients and your application.
