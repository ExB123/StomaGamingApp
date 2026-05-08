import { app, BrowserWindow, ipcMain } from 'electron'
import Store from 'electron-store';
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import https from 'node:https'; // <-- Используем HTTPS модуль

const store = new Store();
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// --- ФУНКЦИЯ ЗАПРОСА ЧЕРЕЗ HTTPS ---
async function fetchWarfaceData(nickname: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const encodedName = encodeURIComponent(nickname);
    // Официальный API теперь строго требует HTTPS
    const url = `https://api.warface.ru/user/stat/?name=${encodedName}`;

    https.get(url, { timeout: 5000 }, (res: any) => {
      // Если сервер всё ещё редиректит (301/302), сообщаем об этом
      if (res.statusCode === 301 || res.statusCode === 302) {
         reject(new Error(`API требует HTTPS. Редирект ${res.statusCode}`));
         return;
      }

      let data = '';
      res.on('data', (chunk: string) => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            reject(new Error(`Сервер вернул ошибку ${res.statusCode}`));
            return;
          }
          const json = JSON.parse(data);
          // Проверка на пустой массив или ошибку
          if (!json || (Array.isArray(json) && json.length === 0) || json.error) {
             reject(new Error('Игрок не найден или данные пусты'));
             return;
          }
          resolve(json);
        } catch (e: any) {
          reject(new Error('Ошибка чтения JSON: ' + e.message));
        }
      });
    }).on('error', (err: any) => reject(err));
  });
}

// --- ОБРАБОТЧИК API WARFACE ---
ipcMain.handle('warface-get-stats', async (_event, nickname: string) => {
  console.log(`[Main] Запрос статистики для: ${nickname}`);
  try {
    const data = await fetchWarfaceData(nickname);
    console.log('[Main] Данные получены успешно');
    return { success: true, data };
  } catch (error: any) {
    console.error('[Main] Ошибка API:', error.message);
    return { success: false, error: error.message };
  }
});

// --- ОБРАБОТЧИКИ STORE ---
ipcMain.handle('store-get', async (_event, key) => store.get(key));
ipcMain.handle('store-set', async (_event, key, value) => store.set(key, value));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)