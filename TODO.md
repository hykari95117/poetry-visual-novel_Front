# 📋 TODO List - geum-soon (비주얼 노벨 게임)

> 마지막 업데이트: 2026-02-17
> 프로젝트: poetry-visual-novel_Front - geum-soon
> 엔진: React 19 + TypeScript + React Router v7

---

## 🚀 추후 개발 항목

### 🔴 높음

#### 게임 구조 및 시스템

- [ ] [L] 게임 상태 관리 시스템 구축 - Redux/Zustand 등으로 장면, 선택지, 저장/로드 상태 관리 (`src/store/`)
  - 현재는 각 GamePage 컴포넌트가 독립적으로 상태 관리 중 - 전체 게임 진행 추적 불가
  - 플레이어 진행도, 엔딩 상태, 스탯/관계도 관리 필요

- [ ] [M] GamePage 컴포넌트 코드 중복 제거 - GamePage.tsx와 GamePage2.tsx 거의 동일 (`src/components/`)
  - 제네릭 씬 컴포넌트 `SceneContainer` 생성 후 DIALOGUE_DATA만 교체 방식으로 리팩토링
  - 향후 씬3, 씬4 추가 시 코드 재사용성 향상

- [ ] [M] 선택지(선택지 분기) 시스템 구현 (`src/components/`)
  - 현재: 일방적인 대사만 진행 (GamePage2 끝에서 "계속하기" 클릭)
  - 필요: DialogueLine에 `choices` 필드 추가, 선택지 렌더링 및 라우팅 로직
  - 예시: 장면 분기로 여러 엔딩 지원

- [ ] [L] 엔딩 분기 및 다중 엔딩 지원 (`src/components/`)
  - Credits, Ending 컴포넌트는 작성됨 (미완성)
  - 선택지에 따른 엔딩 분기 로직 구현
  - 엔딩 화면에 크레딧/영상 삽입

#### 게임 흐름

- [ ] [M] Opening 화면 선택지 "SAVED", "EXIT" 기능 구현 (`src/components/Opening.tsx`)
  - START: 이미 구현 (씬1로 이동)
  - SAVED: 저장된 게임 로드 기능 (게임 저장 시스템 필요)
  - EXIT: 게임 종료 (타이틀로 이동)

- [ ] [M] GamePage2 끝에서 다음 씬으로 진행하기 구현 (`src/components/GamePage2.tsx:196-198`)
  - 현재: "계속하기" 클릭 시 아무 동작 없음 (navigate 미구현)
  - 씬3 추가 후 라우트 설정 및 navigate 처리

- [ ] [M] 씬3 이상 추가 (`src/components/`)
  - 게임 스토리 라인에 따른 추가 씬 개발 필요
  - 백그라운드, 캐릭터, 대사 데이터 포함

#### 상태 및 저장 기능

- [ ] [L] 게임 저장 및 로드 기능 (`src/services/` 신규)
  - localStorage 또는 IndexedDB 활용
  - 저장: 현재 씬, 대사 진행도, 선택지 이력, 스탯/관계도
  - 로드: Opening 화면의 "SAVED" 선택지에서 마지막 저장점 복원
  - 게임 시작 시 자동 저장 기능 추가

- [ ] [M] 플레이어 통계/스탯 추적 시스템 (`src/types/` 신규)
  - 캐릭터 호감도, 선택지 이력, 엔딩 달성률 등
  - UI: 필요 시 화면에 표시 (예: 하단 스탯 바)

### 🟡 중간

#### 코드 품질 및 유지보수

- [ ] [M] 타입 정의 모듈화 (`src/types/`)
  - DialogueLine, Scene, Choice, GameState 등을 별도 파일로 분리
  - 현재: 각 GamePage에 inline으로 정의되어 있음

- [ ] [M] 게임 데이터 구조화 (`src/data/`)
  - scenes.ts: 모든 씬의 대사 데이터 통합
  - characters.ts: 캐릭터 정보 (이름, 기본 이미지 등)
  - endings.ts: 엔딩 조건 및 메타데이터

- [ ] [S] PlaySong 컴포넌트 개선 (`src/components/PlaySong.tsx`)
  - 현재 음성 타입이 'audio/mpeg'로 고정
  - FLAC 파일 지원 추가 (hover.flac 파일 존재)
  - 타입 감지 자동화

- [ ] [S] useSoundEffect 훅 개선 (`src/hooks/useSoundEffect.tsx`)
  - 현재 오류 처리 미흡 - play() 실패 시 무음 가능
  - 음량 제어, 페이드 효과 추가 고려

- [ ] [M] ESLint 규칙 정리 (`eslint.config.js`)
  - react-hooks 의존성 배열 경고 처리 (현재 eslint-disable 다수)
  - 규칙 수정 후 주석 제거

#### UI/UX 개선

- [ ] [M] 자동 페이드아웃 기능 (`src/components/GamePage.tsx`, `GamePage2.tsx`)
  - 선택지 마무리 후 자동으로 다음 씬으로 진행하는 옵션 추가
  - 스킵 기능(빠른 재생) 추가 고려

- [ ] [M] 텍스트 속도 조절 기능 (`src/components/`)
  - 타이핑 속도 설정 메뉴 (느림, 보통, 빠름)
  - 설정값 localStorage에 저장

- [ ] [S] 마우스 커서 커스터마이징 (`src/styles/GamePage.css`)
  - 클릭 가능 요소에 손가락 커서 적용
  - 비주얼 노벨 테마에 맞는 커서 디자인 고려

- [ ] [M] 대사창 배경 색상 커스터마이징 (`src/styles/GamePage.css`)
  - 씬별로 다른 배경 색상 지원
  - 캐릭터에 따른 색상 변경 옵션

#### 사운드 및 음악

- [ ] [M] 효과음 통일 (`public/music/effect/`)
  - hover.flac (약 60KB), select.mp3 (약 20KB) 사용 중
  - 파일 형식 통일 (모두 mp3 또는 모두 flac) 고려
  - not_used/select_1.wav 삭제 검토

- [ ] [M] BGM 씬별 다르게 적용 (`src/components/`)
  - 현재: 모든 씬에서 'in_office.mp3' 사용 (GamePage, GamePage2)
  - 씬1: 집 분위기 음악, 씬2: 꽃밭 분위기 음악 등으로 변경 필요

- [ ] [S] 음소거 기능 (`src/styles/`, `src/components/`)
  - 게임 중 음소거 토글 UI 추가 (우측 상단 음소거 버튼)

### 🟢 낮음

#### 문서화

- [ ] [S] 프로젝트 README 완성 (`README.md`)
  - 현재: 스크린샷만 있음
  - 게임 개요, 설치 방법, 빌드 방법, 개발 가이드 추가

- [ ] [S] 컴포넌트별 JSDoc 주석 추가 (`src/components/`, `src/hooks/`)
  - Props 타입, 반환값, 사용 예시 문서화

- [ ] [S] 개발자 가이드 작성 (`docs/DEVELOPMENT.md` 신규)
  - 새 씬 추가 방법
  - 새 캐릭터 추가 방법
  - 게임 상태 관리 가이드

#### 성능 최적화

- [ ] [S] 이미지 최적화 (`public/image/`)
  - 캐릭터 webp 파일들 정상 형식인지 확인 (char1.webp~char8.webp)
  - 불필요한 파일 정리 (not_used 폴더)

- [ ] [S] 동적 import 적용 (`src/App.tsx`)
  - 각 페이지 컴포넌트를 동적으로 로드하여 초기 번들 크기 감소
  - React.lazy() 사용

- [ ] [S] 번들 크기 분석 (`package.json`)
  - Vite build 최적화 검토

#### 접근성 및 국제화

- [ ] [S] 스크린 리더 접근성 (`src/components/`)
  - role, aria-label 속성 추가
  - semantic HTML 사용

- [ ] [S] 국제화(i18n) 기반 구축 (`src/locales/` 신규)
  - 향후 다국어 지원을 고려한 구조 (i18next 등)
  - 현재는 한국어만 지원

---

## 🧪 테스트 항목

### 단위 테스트

- [ ] [M] GamePage 컴포넌트 테스트 (`src/components/__tests__/GamePage.test.tsx` 신규)
  - 타이핑 효과 진행 확인
  - 클릭 시 대사 진행
  - Shift+Enter 키보드 입력 처리
  - 마지막 대사 후 "계속하기" 버튼 표시

- [ ] [M] GamePage2 컴포넌트 테스트 (`src/components/__tests__/GamePage2.test.tsx` 신규)
  - GamePage와 동일한 테스트 케이스 적용
  - 네비게이션 확인

- [ ] [S] Opening 컴포넌트 테스트 (`src/components/__tests__/Opening.test.tsx` 신규)
  - 키보드 화살표 선택 기능
  - Enter 입력 시 네비게이션
  - 효과음 재생 호출 확인

- [ ] [S] IntroPage 컴포넌트 테스트 (`src/components/__tests__/IntroPage.test.tsx` 신규)
  - 클릭 시 /opening으로 네비게이션
  - Enter/Space 키 입력 처리

- [ ] [S] PlaySong 컴포넌트 테스트 (`src/components/__tests__/PlaySong.test.tsx` 신규)
  - 오디오 재생 확인
  - fadeIn 기능 확인
  - loop 속성 확인
  - src 변경 시 기존 음악 중단

- [ ] [S] useSoundEffect 훅 테스트 (`src/hooks/__tests__/useSoundEffect.test.ts` 신규)
  - 음성 생성 및 재생 호출 확인
  - currentTime 초기화 확인

### 통합 테스트

- [ ] [M] 라우트 네비게이션 테스트 (`src/__tests__/routing.test.tsx` 신규)
  - IntroPage -> Opening 이동
  - Opening -> GamePage (START 클릭)
  - GamePage -> GamePage2 (계속하기 클릭)
  - 뒤로가기 기능 (필요 시)

- [ ] [M] 사운드 시스템 통합 테스트 (`src/__tests__/audio.test.tsx` 신규)
  - 화면 진입 시 BGM 재생
  - 버튼 클릭 시 효과음 재생
  - BGM 전환 시 부드럽게 변경

- [ ] [M] 게임 상태 관리 테스트 (`src/__tests__/gameState.test.ts` 신규)
  - 장면별 상태 저장 및 복원
  - 선택지 이력 추적

### 엣지 케이스

- [ ] [S] 빠른 연속 클릭 처리 (`src/components/GamePage.tsx`)
  - 타이핑 중 여러 번 클릭 시 스킵 동작 확인
  - 대사 인덱스 초과 방지

- [ ] [S] 오디오 재생 실패 케이스 (`src/components/PlaySong.tsx`)
  - 브라우저 자동재생 정책 위반 시 처리
  - 네트워크 오류 시 처리

- [ ] [S] 초고속 클릭으로 씬 스킵 시도 (`src/components/GamePage.tsx:106-121`)
  - hasFinishedAll 상태 확인하여 과도한 진행 방지

- [ ] [S] 모바일 장치에서 터치 입력 (`src/components/GamePage.tsx`)
  - 터치 이벤트 핸들러 추가 (현재 클릭/키보드만 지원)

- [ ] [S] 작은 화면 크기 반응형 테스트 (`src/styles/GamePage.css`)
  - 모바일(320px), 태블릿(768px), 데스크톱 크기별 clamp() 값 검증

---

## ✅ 확인 사항

### 보안

- [ ] [S] XSS 방지 검증 (`src/components/`)
  - 사용자 입력이 없으므로 현재 주요 위험 없음
  - 향후 사용자 저장 파일 로드 시 검증 필요

- [ ] [S] localStorage 용량 제한 (`src/services/`)
  - 게임 저장 데이터가 5MB 초과하지 않도록 관리
  - 저장점 최대 개수 제한 (예: 최근 5개만 유지)

- [ ] [S] 캐시 정책 검토 (`vite.config.ts`)
  - 게임 리소스(이미지, 음악) 캐시 전략 확인
  - 버전 업데이트 시 캐시 무효화 로직

### 설정/환경

- [ ] [M] 환경 변수 설정 (`.env`, `.env.example` 신규)
  - API_URL (향후 백엔드 연동 시)
  - ASSET_PATH (CDN 사용 시)
  - 개발/프로덕션 구분

- [ ] [S] TypeScript 설정 검증 (`tsconfig.app.json`)
  - strict 모드 활성화 확인
  - 경고 없이 빌드 가능한지 확인

- [ ] [S] ESLint 설정 최종 검토 (`eslint.config.js`)
  - 현재 규칙에서 경고 없이 모든 파일 통과하는지 확인
  - 불필요한 eslint-disable 제거

- [ ] [S] package.json 스크립트 정리 (`package.json`)
  - "test" 스크립트 추가 (테스트 프레임워크 선택 후)
  - "lint:fix" 스크립트 추가

### 배포 전 체크

- [ ] [M] 빌드 성공 확인
  - `npm run build` 또는 `pnpm build` 실행
  - 빌드 결과 dist/ 폴더 생성 확인
  - 프로덕션 번들 크기 검토

- [ ] [M] 프로덕션 빌드 테스트 (`npm run preview`)
  - 빌드된 파일을 로컬에서 실행
  - 모든 라우트 동작 확인
  - 음악/이미지 로드 확인

- [ ] [M] 브라우저 호환성 테스트
  - 최신 Chrome, Firefox, Safari 확인
  - 모바일 Safari (iOS)에서 오디오 자동재생 정책 확인

- [ ] [S] 성능 측정 (Lighthouse)
  - 페이지 로드 속도
  - CLS(Cumulative Layout Shift) 확인
  - 타이핑 애니메이션 프레임율 안정성

- [ ] [S] 배포 전 최종 체크리스트
  - 하드코딩된 로컬 경로 제거
  - console.log() 디버그 문 제거
  - 주석 처리된 코드 정리
  - 모든 TODO/FIXME 주석 검토

### 문서화 및 배포

- [ ] [M] GitHub Pages 또는 Netlify 배포 (선택)
  - 배포 설정 파일 추가 (netlify.toml 또는 .github/workflows/)
  - 배포 자동화 (Push 시 자동 배포)

- [ ] [S] 게임 플레이 가이드 작성 (`docs/GAMEPLAY.md` 신규)
  - 조작법 설명
  - 게임 목표, 엔딩 종류 안내
  - 팀 정보 및 크레딧

- [ ] [S] 버전 관리 정책 수립
  - package.json 버전 관리
  - 변경 사항 CHANGELOG.md 유지

---

## 🎮 게임 개발 진행도

### 현재 상태
```
[████████████████░░░░░░░░░░░░░░░░░░░░] 약 45%

완료:
- IntroPage (타이틀)
- Opening (메인 메뉴)
- GamePage (씬1: 금순의 집)
- GamePage2 (씬2: 꽃밭)
- 타이핑 효과, 캐릭터 표시, BGM
- CSS 스타일링 (픽셀/도트풍)

진행 중:
- 게임 상태 관리 시스템
- 추가 씬 개발

미완료:
- 선택지/분기 시스템
- 다중 엔딩
- 저장/로드 기능
- 씬3+ 개발
```

---

## 📌 우선순위 가이드

### 즉시 처리 필요 (1주일 내)
1. GamePage 컴포넌트 중복 제거 (리팩토링)
2. 게임 상태 관리 시스템 기본 구축
3. 선택지 분기 시스템 구현

### 1-2주 내
4. 씬3 이상 추가
5. 게임 저장/로드 기능
6. 단위 테스트 작성

### 2주 이후
7. UI/UX 개선 (텍스트 속도, 자동진행)
8. 성능 최적화
9. 배포 준비

---

## 📂 파일 구조 개선 제안

```
src/
├── components/          # 현재 상태 유지
│   ├── SceneContainer.tsx    # NEW: 제네릭 씬 컴포넌트
│   ├── GamePage.tsx
│   ├── GamePage2.tsx
│   └── __tests__/            # NEW: 컴포넌트 테스트
├── hooks/
│   ├── useSoundEffect.tsx
│   └── __tests__/            # NEW: 훅 테스트
├── services/            # NEW: 비즈니스 로직
│   ├── saveGameService.ts    # 저장/로드
│   └── gameStateService.ts   # 상태 관리
├── types/               # NEW: 타입 정의
│   ├── dialogue.ts
│   ├── scene.ts
│   └── gameState.ts
├── data/                # NEW: 게임 데이터
│   ├── scenes.ts
│   ├── characters.ts
│   └── endings.ts
├── styles/              # 현재 상태 유지
├── locales/             # NEW: i18n (향후 대비)
└── __tests__/           # NEW: 통합 테스트
```

---

**작성자**: Claude Code TODO Analyzer
**작성일**: 2026-02-17
**대상 프로젝트**: poetry-visual-novel_Front / geum-soon
