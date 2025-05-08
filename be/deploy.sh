#!/bin/bash

# This script is for deploying PocketBase to a production environment
# For a real deployment, you would typically:
# 1. Set up a reverse proxy (Nginx, Caddy, etc.)
# 2. Configure SSL/TLS
# 3. Set up environment variables for production

# Start PocketBase in production mode
./pocketbase serve --http="0.0.0.0:8090" --dir="./pb_data" --publicDir="./pb_public"
