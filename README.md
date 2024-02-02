# Project setup for local development with Vercel Postgres and Neon Serverless Postgres proxy in Docker

## Overview

This project provides a streamlined boilerplate for running **Vercel Postgres** with **Neon Serverless Postgres** proxy locally within Docker. The setup aims to enhance your development environment, ensuring a smooth and efficient workflow.

**Note:** The `@vercel/postgres@0.7.2` library has been patched for this project to eliminate the need for any unconventional workarounds when running it locally. To opt out of the patched version and default to the base/unpatched version when deployed to the cloud (e.g., Vercel or any other cloud platform), set the `VERCEL_ENV` environment variable to reflect your cloud environment. This ensures a seamless transition between local development and cloud deployment.

## Prerequisites

Before getting started, ensure that the following tools are installed on your system:

### 1. make

- Linux

```bash
sudo apt install make
```

- macOS

```bash
brew install make
```

### 2. pnpm

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

or

```bash
wget -qO- https://get.pnpm.io/install.sh | sh -
```

## Getting started

Clone the repository and navigate to the project folder:

### 1. Clone and set up the project

```bash
git clone https://github.com/birzgalisn/vercel-neon-proxy.git && \
cd vercel-neon-proxy && \
cp .env.example .env && \
pnpm i
```

### 2. Start Docker services

Initiate Docker services to create a local development environment. Note that the `neon-proxy` service is cloned and built from the source, so this step might take a while:

```bash
make dev
```

or

```bash
docker compose up
```

### 3. Final steps

Upon successful setup, both `test-neon` and `test-vercel` containers should display output in the console, indicating readiness to handle file changes and perform hot file reloading.

Feel free to customize and adapt this boilerplate to meet your project's specific requirements. This template is designed to enhance the local development experience when working with **Vercel Postgres** and **Neon Serverless Postgres** proxy, facilitating smooth transitions based on the `VERCEL_ENV` environment variable, whether deployed to the Vercel cloud or any other cloud platform.

## Makefile commands for enhanced workflow

To further enhance your development experience, this project includes a set of helpful **Makefile** commands for ease of use. These commands streamline common tasks related to Docker and development environment management.

### Available commands

#### Build the containers::

```bash
make build
```

This command builds the Docker containers specified in the `docker-compose.yaml` file in parallel, optimizing the development environment setup.

#### Start development environment:

```bash
make dev
```

Use this command to initiate the Docker services and create a local development environment. It ensures that the containers specified in the `docker-compose.yaml` file are up and running.

#### Remove environment:

```bash
make remove
```

This command stops and removes the Docker containers, cleans up any orphaned resources, and removes associated volumes. It's a comprehensive cleanup command to reset the development environment.

Feel free to leverage these **Makefile** commands to simplify routine tasks during development. They are designed to provide a more efficient and user-friendly experience, contributing to a smoother workflow with **Vercel Postgres** and **Neon Serverless Postgres** proxy in your Docker-based local environment.
