# PostureGuard Telegram Bot

Простой бот для ответа на `/start` с кнопкой открытия Mini App.

## Быстрая установка на сервере

```bash
# 1. Создай папку и скопируй файлы
mkdir -p /home/deploy/postureguard-bot
cd /home/deploy/postureguard-bot

# 2. Создай виртуальное окружение
python3 -m venv venv
source venv/bin/activate

# 3. Установи зависимости
pip install -r requirements.txt

# 4. Проверь что работает (Ctrl+C для остановки)
BOT_TOKEN="твой_токен" python bot.py
```

## Запуск как сервис (автозапуск)

```bash
# 1. Отредактируй service файл - замени YOUR_BOT_TOKEN_HERE на токен
nano postureguard-bot.service

# 2. Скопируй в systemd
sudo cp postureguard-bot.service /etc/systemd/system/

# 3. Запусти
sudo systemctl daemon-reload
sudo systemctl enable postureguard-bot
sudo systemctl start postureguard-bot

# 4. Проверь статус
sudo systemctl status postureguard-bot
```

## Полезные команды

```bash
# Логи
sudo journalctl -u postureguard-bot -f

# Перезапуск
sudo systemctl restart postureguard-bot

# Остановка
sudo systemctl stop postureguard-bot
```
