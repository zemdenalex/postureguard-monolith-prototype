import asyncio
import os
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

# Get token from environment variable
BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://easy-posture.site")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


@dp.message(CommandStart())
async def start_handler(message: types.Message):
    """Handle /start command"""
    
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🦴 Открыть PostureGuard",
                    web_app=WebAppInfo(url=WEBAPP_URL)
                )
            ],
            [
                InlineKeyboardButton(
                    text="📖 Как это работает?",
                    callback_data="how_it_works"
                )
            ]
        ]
    )
    
    await message.answer(
        "👋 <b>Привет!</b>\n\n"
        "Я помогу тебе следить за осанкой и сохранить здоровье спины.\n\n"
        "🎯 <b>Что умеет PostureGuard:</b>\n"
        "• Отслеживание осанки в реальном времени\n"
        "• Упражнения для шеи и спины\n"
        "• Система достижений и мотивации\n"
        "• Статистика прогресса\n\n"
        "Нажми кнопку ниже, чтобы начать! 👇",
        parse_mode="HTML",
        reply_markup=keyboard
    )


@dp.callback_query(lambda c: c.data == "how_it_works")
async def how_it_works_handler(callback: types.CallbackQuery):
    """Handle 'How it works' button"""
    
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🦴 Открыть приложение",
                    web_app=WebAppInfo(url=WEBAPP_URL)
                )
            ]
        ]
    )
    
    await callback.message.answer(
        "📖 <b>Как работает PostureGuard:</b>\n\n"
        "<b>1. Подключи устройство</b>\n"
        "Прикрепи датчик PostureGuard к одежде на спине\n\n"
        "<b>2. Начни сессию</b>\n"
        "Открой приложение и нажми «Начать отслеживание»\n\n"
        "<b>3. Следи за осанкой</b>\n"
        "Получай уведомления когда сутулишься\n\n"
        "<b>4. Выполняй упражнения</b>\n"
        "Делай разминку чтобы снять напряжение\n\n"
        "<b>5. Отслеживай прогресс</b>\n"
        "Смотри статистику и получай достижения!",
        parse_mode="HTML",
        reply_markup=keyboard
    )
    
    await callback.answer()


async def main():
    print("🤖 Bot starting...")
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
