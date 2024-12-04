# Node.js (Bun) Dockerfile
FROM oven/bun:latest

WORKDIR /project
COPY . .
RUN bun install

EXPOSE 8080
CMD ["bun", "admin"]
