import { createBot } from 'mineflayer';
import * as dotenv from 'dotenv';
dotenv.config();

const {
  MC_USERNAME,
  MC_SERVER,
  MC_PORT,
  MC_VERSION,
  ANTI_AFK = 'true',
  RECONNECT = 'true'
} = process.env;

function startBot() {
  const bot = createBot({
    host: MC_SERVER,
    port: parseInt(MC_PORT),
    username: MC_USERNAME,
    version: MC_VERSION
  });

  bot.on('spawn', () => {
    console.log(`[+] ${MC_USERNAME} успешно вошёл на сервер!`);
    if (ANTI_AFK === 'true') startAntiAfk(bot);
  });

  bot.on('end', () => {
    console.log('[-] Бот отключился от сервера.');
    if (RECONNECT === 'true') {
      console.log('[~] Переподключение через 5 секунд...');
      setTimeout(startBot, 5000);
    }
  });

  bot.on('error', err => {
    console.log('[!] Ошибка:', err.message);
  });
}

function startAntiAfk(bot) {
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 10000);
}

startBot();