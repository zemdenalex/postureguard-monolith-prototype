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

# Deploy web (miniapp)
deploy_web() {
    print_header "Deploying Mini App"

    # Build
    print_info "Building miniapp..."
    cd apps/miniapp
    npm run build
    cd "$SCRIPT_DIR"
    print_success "Build completed"

    # Deploy
    print_info "Uploading to server..."
    rsync -avz --delete \
        apps/miniapp/dist/ \
        "${SSH_TARGET}:${REMOTE_WEB_PATH}/"
    print_success "Mini App deployed to ${REMOTE_WEB_PATH}"

    # Set permissions
    print_info "Setting permissions..."
    ssh "$SSH_TARGET" "chmod -R 755 ${REMOTE_WEB_PATH}"
    print_success "Permissions set"
}

# Deploy bot
deploy_bot() {
    print_header "Deploying Bot"

    # Upload bot files
    print_info "Uploading bot files..."
    rsync -avz \
        --exclude '__pycache__' \
        --exclude '*.pyc' \
        --exclude 'venv' \
        --exclude '.venv' \
        apps/bot/ \
        "${SSH_TARGET}:${REMOTE_BOT_PATH}/"
    print_success "Bot files uploaded to ${REMOTE_BOT_PATH}"

    # Restart service
    print_info "Restarting bot service..."
    ssh "$SSH_TARGET" "sudo systemctl restart postureguard-bot"
    print_success "Bot service restarted"

    # Check status
    print_info "Checking bot status..."
    ssh "$SSH_TARGET" "sudo systemctl status postureguard-bot --no-pager -l" || true
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
