 #!/bin/bash

echo "🚀 Starting DevOps Monitoring System..."

# Start server
node server.js &

# Function to start agent
start_agent () {
  SYSTEM_NAME="$1" node agent.js &
}

# Start all systems (PROFESSIONAL NAMES)
start_agent "Production Cluster"
start_agent "Staging Environment"
start_agent "API Gateway"
start_agent "DB Cluster"
start_agent "Local Dev Machine"

echo "✅ All systems started!"