---
sidebar_position: 2
title: "Brave"
---

:::warning
This tutorial is a community contribution and is not supported by the Sage Open WebUI team. It serves only as a demonstration on how to customize Sage Open WebUI for your specific use case. Want to contribute? Check out the contributing tutorial.
:::

## Brave API

### Docker Compose Setup

Add the following environment variables to your Sage Open WebUI `docker-compose.yaml` file:

```yaml
services:
  sage-open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "brave"
      BRAVE_SEARCH_API_KEY: "YOUR_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
