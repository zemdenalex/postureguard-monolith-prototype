#!/bin/bash
set -e

# ===========================================
# PostureGuard Deployment Script
# ===========================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Check .env file
if [ ! -f ".env" ]; then
    print_error ".env file not found!"
    echo -e "Please create .env from .env.example:"
    echo -e "  ${YELLOW}cp .env.example .env${NC}"
    echo -e "  ${YELLOW}nano .env${NC}"
    exit 1
fi

# Load environment variables
source .env

# Validate required variables
if [ -z "$SERVER_IP" ] || [ "$SERVER_IP" = "YOUR_SERVER_IP" ]; then
    print_error "SERVER_IP is not set in .env"
    exit 1
fi

if [ -z "$SERVER_USER" ]; then
    print_error "SERVER_USER is not set in .env"
    exit 1
fi

if [ -z "$REMOTE_WEB_PATH" ]; then
    print_error "REMOTE_WEB_PATH is not set in .env"
    exit 1
fi

if [ -z "$REMOTE_BOT_PATH" ]; then
    print_error "REMOTE_BOT_PATH is not set in .env"
    exit 1
fi

# SSH connection string
SSH_TARGET="${SERVER_USER}@${SERVER_IP}"

# Sudo prefix (empty if root)
if [ "$SERVER_USER" = "root" ]; then
    SUDO=""
else
    SUDO="sudo"
fi

# Deploy web (miniapp)
deploy_web() {
    print_header "Deploying Mini App"

    # Build
    print_info "Building miniapp..."
    cd apps/miniapp
    npm run build
    cd "$SCRIPT_DIR"
    print_success "Build completed"

    # Clean remote directory and create fresh
    print_info "Preparing remote directory..."
    ssh "$SSH_TARGET" "${SUDO} rm -rf ${REMOTE_WEB_PATH}/* 2>/dev/null || true"
    ssh "$SSH_TARGET" "${SUDO} mkdir -p ${REMOTE_WEB_PATH}"
    print_success "Remote directory ready"

    # Upload using scp (works on Windows)
    print_info "Uploading to server..."
    scp -r apps/miniapp/dist/* "${SSH_TARGET}:${REMOTE_WEB_PATH}/"
    print_success "Mini App deployed to ${REMOTE_WEB_PATH}"

    # Set permissions
    print_info "Setting permissions..."
    ssh "$SSH_TARGET" "${SUDO} chmod -R 755 ${REMOTE_WEB_PATH}"
    print_success "Permissions set"
}

# Deploy bot
deploy_bot() {
    print_header "Deploying Bot"

    # Prepare remote directory
    print_info "Preparing bot directory..."
    ssh "$SSH_TARGET" "mkdir -p ${REMOTE_BOT_PATH}"

    # Upload bot files (excluding venv, pycache)
    print_info "Uploading bot files..."
    scp apps/bot/bot.py "${SSH_TARGET}:${REMOTE_BOT_PATH}/"
    scp apps/bot/requirements.txt "${SSH_TARGET}:${REMOTE_BOT_PATH}/"
    # Copy service file if exists
    if [ -f "apps/bot/postureguard-bot.service" ]; then
        scp apps/bot/postureguard-bot.service "${SSH_TARGET}:${REMOTE_BOT_PATH}/"
    fi
    print_success "Bot files uploaded to ${REMOTE_BOT_PATH}"

    # Restart service
    print_info "Restarting bot service..."
    ssh "$SSH_TARGET" "${SUDO} systemctl restart postureguard-bot"
    print_success "Bot service restarted"

    # Check status
    print_info "Checking bot status..."
    ssh "$SSH_TARGET" "${SUDO} systemctl status postureguard-bot --no-pager -l" || true
}

# Show usage
usage() {
    echo -e "Usage: ${YELLOW}./deploy.sh [command]${NC}"
    echo ""
    echo "Commands:"
    echo -e "  ${GREEN}all${NC}   Deploy both miniapp and bot (default)"
    echo -e "  ${GREEN}web${NC}   Deploy only miniapp"
    echo -e "  ${GREEN}bot${NC}   Deploy only bot"
    echo -e "  ${GREEN}help${NC}  Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh         # Deploy everything"
    echo "  ./deploy.sh web     # Deploy only frontend"
    echo "  ./deploy.sh bot     # Deploy only bot"
}

# Main
print_header "PostureGuard Deployment"
echo -e "Server: ${GREEN}${SSH_TARGET}${NC}"
echo -e "Web path: ${YELLOW}${REMOTE_WEB_PATH}${NC}"
echo -e "Bot path: ${YELLOW}${REMOTE_BOT_PATH}${NC}"

case "${1:-all}" in
    all)
        deploy_web
        deploy_bot
        print_header "Deployment Complete!"
        print_success "All components deployed successfully"
        ;;
    web)
        deploy_web
        print_header "Web Deployment Complete!"
        ;;
    bot)
        deploy_bot
        print_header "Bot Deployment Complete!"
        ;;
    help|--help|-h)
        usage
        ;;
    *)
        print_error "Unknown command: $1"
        usage
        exit 1
        ;;
esac

echo ""
print_success "Done!"
