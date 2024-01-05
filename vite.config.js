import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        togetherBoard: resolve(__dirname, 'src/pages/togetherBoard/index.html'),
        story: resolve(__dirname, 'src/pages/story/index.html'),
        exchangeBoard: resolve(__dirname, 'src/pages/exchangeBoard/index.html'),
        exchange: resolve(__dirname, 'src/pages/exchange/index.html'),
        start: resolve(__dirname, 'src/pages/start/index.html'),
        category: resolve(__dirname, 'src/pages/category/index.html'),
        signUP: resolve(__dirname, 'src/pages/signUp/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        profile: resolve(__dirname, 'src/pages/profile/index.html'),
        profileCard: resolve(__dirname, 'src/pages/profileCard/index.html'),
        profileDetails: resolve(
          __dirname,
          'src/pages/profileDetails/index.html'
        ),
        board: resolve(__dirname, 'src/pages/board/index.html'),
        writeBoardSecond: resolve(
          __dirname,
          'src/pages/writeBoardSecond/index.html'
        ),
        writeBoardThird: resolve(
          __dirname,
          'src/pages/wirteBoardThird/index.html'
        ),
        boardContet: resolve(__dirname, 'src/pages/boardContent/index.html'),
        chatScreen: resolve(__dirname, 'src/pages/chatScreen/index.html'),
        writeBoard: resolve(__dirname, 'src/pages/writeBoard/index.html'),
      },
    },
  },
});
