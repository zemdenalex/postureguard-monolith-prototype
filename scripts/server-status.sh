#!/bin/bash
set -e

# ===========================================
# Server Status Check Script for PostureGuard
# ===========================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Script directory (go to repo root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_section() {
    echo -e "\n${CYAN}--- $1 ---${NC}\n"
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
    exit 1
fi

source .env

if [ -z "$SERVER_IP" ] || [ "$SERVER_IP" = "YOUR_SERVER_IP" ]; then
    print_error "SERVER_IP is not set in .env"
    exit 1
fi

SSH_TARGET="${SERVER_USER}@${SERVER_IP}"

# Sudo prefix (empty if root)
if [ "$SERVER_USER" = "root" ]; then
    SUDO=""
else
    SUDO="sudo"
fi

print_header "PostureGuard Server Status"
echo -e "Server: ${GREEN}${SSH_TARGET}${NC}"

# Test connection
print_info "Connecting to server..."
if ! ssh -o BatchMode=yes -o ConnectTimeout=5 "$SSH_TARGET" "exit" 2>/dev/null; then
    print_error "Cannot connect to server!"
    echo -e "Run ${YELLOW}./scripts/ssh-setup.sh${NC} first"
    exit 1
fi
print_success "Connected"

# Nginx status
print_section "Nginx Status"
ssh "$SSH_TARGET" "${SUDO} systemctl status nginx --no-pager -l 2>/dev/null | head -15" || echo -e "${RED}Nginx not running or not installed${NC}"

# Bot status
print_section "Bot Service Status"
ssh "$SSH_TARGET" "${SUDO} systemctl status postureguard-bot --no-pager -l 2>/dev/null | head -20" || echo -e "${YELLOW}Bot service not found or not running${NC}"

# Disk space
print_section "Disk Space"
ssh "$SSH_TARGET" "df -h / | tail -1"

# Web directory
print_section "Web Directory (${REMOTE_WEB_PATH})"
if ssh "$SSH_TARGET" "[ -d '$REMOTE_WEB_PATH' ]" 2>/dev/null; then
    ssh "$SSH_TARGET" "ls -la '$REMOTE_WEB_PATH' | head -10"
    echo ""
    SIZE=$(ssh "$SSH_TARGET" "du -sh '$REMOTE_WEB_PATH' 2>/dev/null | cut -f1")
    echo -e "Total size: ${GREEN}${SIZE}${NC}"
else
    echo -e "${YELLOW}Directory does not exist${NC}"
fi

# Bot directory
print_section "Bot Directory (${REMOTE_BOT_PATH})"
if ssh "$SSH_TARGET" "[ -d '$REMOTE_BOT_PATH' ]" 2>/dev/null; then
    ssh "$SSH_TARGET" "ls -la '$REMOTE_BOT_PATH' | head -10"
else
    echo -e "${YELLOW}Directory does not exist${NC}"
fi

# Bot logs
print_section "Bot Logs (last 20 lines)"
ssh "$SSH_TARGET" "${SUDO} journalctl -u postureguard-bot --no-pager -n 20 2>/dev/null" || echo -e "${YELLOW}No logs available${NC}"

# Memory usage
print_section "Memory Usage"
ssh "$SSH_TARGET" "free -h | head -2"

print_header "Status Check Complete"
