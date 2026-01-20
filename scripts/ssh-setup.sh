#!/bin/bash
set -e

# ===========================================
# SSH Key Setup Script for PostureGuard
# ===========================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Script directory (go to repo root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

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

# Check .env
if [ ! -f ".env" ]; then
    print_error ".env file not found!"
    echo -e "Please create .env from .env.example first:"
    echo -e "  ${YELLOW}cp .env.example .env${NC}"
    echo -e "  ${YELLOW}nano .env${NC}"
    exit 1
fi

source .env

if [ -z "$SERVER_IP" ] || [ "$SERVER_IP" = "YOUR_SERVER_IP" ]; then
    print_error "SERVER_IP is not set in .env"
    exit 1
fi

SSH_TARGET="${SERVER_USER}@${SERVER_IP}"
SSH_KEY="$HOME/.ssh/id_rsa"
SSH_KEY_ED25519="$HOME/.ssh/id_ed25519"

print_header "SSH Key Setup"

# Step 1: Check/Generate SSH key
print_info "Checking for existing SSH keys..."

if [ -f "$SSH_KEY_ED25519" ]; then
    print_success "Found existing key: $SSH_KEY_ED25519"
    SSH_KEY="$SSH_KEY_ED25519"
elif [ -f "$SSH_KEY" ]; then
    print_success "Found existing key: $SSH_KEY"
else
    print_info "No SSH key found. Generating new key..."
    ssh-keygen -t ed25519 -C "postureguard-deploy" -f "$SSH_KEY_ED25519" -N ""
    SSH_KEY="$SSH_KEY_ED25519"
    print_success "Generated new SSH key: $SSH_KEY"
fi

# Step 2: Copy key to server
print_header "Copying SSH Key to Server"
echo -e "Target: ${GREEN}${SSH_TARGET}${NC}"
echo ""
print_info "You may be asked for the server password..."
echo ""

ssh-copy-id -i "${SSH_KEY}.pub" "$SSH_TARGET"
print_success "SSH key copied to server"

# Step 3: Test connection
print_header "Testing SSH Connection"
print_info "Connecting to $SSH_TARGET..."

if ssh -o BatchMode=yes -o ConnectTimeout=5 "$SSH_TARGET" "echo 'SSH connection successful!'" 2>/dev/null; then
    print_success "SSH connection works without password!"
else
    print_error "SSH connection test failed"
    echo -e "Try connecting manually: ${YELLOW}ssh ${SSH_TARGET}${NC}"
    exit 1
fi

# Sudo prefix (empty if root)
if [ "$SERVER_USER" = "root" ]; then
    SUDO=""
else
    SUDO="sudo"
fi

# Step 4: Check server directories
print_header "Checking Server Directories"

print_info "Checking web directory: $REMOTE_WEB_PATH"
if ssh "$SSH_TARGET" "[ -d '$REMOTE_WEB_PATH' ]" 2>/dev/null; then
    print_success "Web directory exists"
else
    print_info "Creating web directory..."
    ssh "$SSH_TARGET" "${SUDO} mkdir -p '$REMOTE_WEB_PATH' && ${SUDO} chown ${SERVER_USER}:${SERVER_USER} '$REMOTE_WEB_PATH'"
    print_success "Web directory created"
fi

print_info "Checking bot directory: $REMOTE_BOT_PATH"
if ssh "$SSH_TARGET" "[ -d '$REMOTE_BOT_PATH' ]" 2>/dev/null; then
    print_success "Bot directory exists"
else
    print_info "Creating bot directory..."
    ssh "$SSH_TARGET" "mkdir -p '$REMOTE_BOT_PATH'"
    print_success "Bot directory created"
fi

print_header "Setup Complete!"
echo -e "You can now deploy using: ${GREEN}./deploy.sh${NC}"
echo ""
