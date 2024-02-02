# syntax=docker/dockerfile:1

# https://github.com/neondatabase/serverless/issues/33

FROM rust:bookworm as rust-builder
ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /neon

RUN \
  apt-get update -qq \
  && apt-get install -qq --no-install-recommends -o DPkg::Options::=--force-confold -o DPkg::Options::=--force-confdef \
  build-essential \
  pkg-config \
  git \
  libssl-dev \
  && apt-get clean -qq && rm -rf /var/lib/apt/lists/*

RUN git clone --recursive https://github.com/neondatabase/neon.git .
RUN cargo build --bin proxy --features "testing"

FROM debian:bookworm-slim
ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /app

RUN \
  apt-get update -qq \
  && apt-get install -qq --no-install-recommends -o DPkg::Options::=--force-confold -o DPkg::Options::=--force-confdef \
  curl \
  ca-certificates \
  openssl \
  postgresql-client \
  && apt-get clean -qq && rm -rf /var/lib/apt/lists/*

RUN \
  apt-get update -qq \
  && apt-get install -qq --no-install-recommends -o DPkg::Options::=--force-confold -o DPkg::Options::=--force-confdef \
  gnupg2 debian-keyring debian-archive-keyring apt-transport-https \
  && curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/gpg.key" | gpg2 --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg \
  && curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt" | tee /etc/apt/sources.list.d/caddy-stable.list \
  && apt-get update -qq \
  && apt-get install -qq --no-install-recommends -o DPkg::Options::=--force-confold -o DPkg::Options::=--force-confdef \
  caddy \
  && apt-get clean -qq && rm -rf /var/lib/apt/lists/*

ARG CNAME
ARG NEON_PROXY_HOST
ARG NEON_PROXY_PORT

ENV CNAME=$CNAME
ENV NEON_PROXY_HOST=$NEON_PROXY_HOST
ENV NEON_PROXY_PORT=$NEON_PROXY_PORT

RUN openssl req -new -x509 \
  -days 365 \
  -nodes -text \
  -out server.pem \
  -keyout server.key \
  -subj "/CN=*.$CNAME" \
  -addext "subjectAltName = DNS:*.$CNAME"

COPY --from=rust-builder /neon/target/debug/proxy ./neon-proxy
COPY Caddyfile start.sh ./

EXPOSE $NEON_PROXY_PORT
ENTRYPOINT ["bash", "start.sh"]
