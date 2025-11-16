import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/sunday1/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
```

### 1-5. 저장
- 페이지 아래로 스크롤
- 초록색 **"Commit new file"** 버튼 클릭

---

## 📝 2단계: GitHub Actions 파일 만들기

### 2-1. 다시 Add file 클릭
- 저장소 메인 페이지에서
- **"Add file"** → **"Create new file"** 클릭

### 2-2. 파일 경로 입력 (중요!)
- 파일 이름 입력창에 정확히 이렇게 입력:
```
.github/workflows/deploy.yml
