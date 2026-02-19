# 📋 TODO List - geum-soon (비주얼 노벨 게임)

> 마지막 업데이트: 2026-02-18
> 프로젝트: poetry-visual-novel_Front - geum-soon
> 엔진: React 19 + TypeScript + React Router v7

---

## 🚀 추후 개발 항목

### 🔴 높음

#### 게임 저장/불러오기 (설계 완료, 미구현)

- [ ] [M] localStorage 저장 시스템 구현 (`src/services/saveGameService.ts` 신규)
  - SaveData 타입: { sceneIndex: number, dialogueIndex: number, timestamp: string }
  - GameScene에서 save 아이콘 클릭 시 clickSave() 함수 구현 완료 (현재 console.log만 있음)
  - localStorage.setItem('gameSave', JSON.stringify(saveData))로 저장

- [ ] [M] 저장된 게임 로드 기능 (`src/components/GameRouter.tsx`, `src/components/Opening.tsx`)
  - GameRouter: 마운트 시 localStorage.getItem('gameSave') 확인
  - 저장 데이터가 있으면 initialDialogueIndex props로 전달
  - Opening의 SAVED 버튼 활성화 (저장 데이터 있을 때만)
  - SAVED 클릭 시 저장된 sceneIndex와 dialogueIndex로 복원

- [ ] [S] 저장 시간 표시 (`src/components/Opening.tsx`)
  - SAVED 버튼 옆에 "2026-02-18 15:30 저장" 같은 타임스탬프 표시

#### 선택지/분기 시스템

- [ ] [M] DialogueLine 타입 확장 (`src/components/GameScene.tsx`, `src/data/scenes.ts`)
  - DialogueLine에 choices 필드 추가: `{ text: string, nextSceneIndex: number, nextDialogueIndex: number }`
  - 선택지가 있는 대사 데이터에 choices 배열 추가

- [ ] [M] 선택지 UI 렌더링 (`src/components/GameScene.tsx`)
  - hasFinishedAll이 true이고 choices가 존재할 때 버튼 그룹 렌더링
  - 각 선택지 버튼 클릭 시 onChoiceSelect(choiceIndex) 콜백 호출

- [ ] [M] 선택지 분기 처리 (`src/components/GameRouter.tsx`)
  - GameScene의 onChoiceSelect에서 nextSceneIndex와 nextDialogueIndex 받기
  - 필요하면 currentSceneIndex와 currentDialogueIndex를 동시에 관리 (또는 단순화)

#### 추가 씬 및 엔딩

- [ ] [L] 씬3 이상 추가 (`src/data/scenes.ts`)
  - 게임 스토리라인 설계 후 씬 추가
  - 각 씬에 배경, 캐릭터, 대사, BGM 구성

- [ ] [M] 다중 엔딩 분기 구현
  - 선택지에 따른 엔딩 경로 다양화 필요
  - Ending 컴포넌트 구현 완료 후 Routes 연결

- [ ] [M] Credits 컴포넌트 완성 (`src/components/Credits.tsx`)
  - 현재: "저작권 표시 해야함" placeholder만 있음
  - 팀 이름, 역할, 협력사 정보 표시
  - 스크롤 애니메이션 또는 크레딧 영상 추가

### 🟡 중간

#### 상태 관리 및 타입 정의

- [ ] [M] 게임 상태 관리 타입 정의 (`src/types/` 신규)
  - GameState: { currentSceneIndex, currentDialogueIndex, choices, stats, endings }
  - SaveData: { sceneIndex, dialogueIndex, timestamp }
  - CharacterInfo: { id, name, defaultImage }
  - SceneData는 이미 `src/data/scenes.ts`에 있음

- [ ] [M] 게임 전체 상태 관리 (Zustand 등으로 추후 고려)
  - 현재는 GameRouter가 currentSceneIndex만 관리 (충분할 수 있음)
  - 추후 플레이어 통계, 엔딩 달성률 추적 필요 시 상태관리 라이브러리 추가

- [ ] [S] 캐릭터 정보 모듈화 (`src/data/characters.ts` 신규)
  - Character 타입: { id, name, defaultImage, color? }
  - 각 캐릭터의 기본 정보 관리

#### 코드 품질 및 기술 부채

- [ ] [M] ESLint 규칙 정리 (`eslint.config.js`)
  - react-hooks 의존성 배열 경고 eslint-disable 주석 제거
  - exhaustive-deps 규칙 예외 정당성 재검토

- [ ] [S] 타이핑 애니메이션 skipToFull 로직 개선 (`src/components/GameScene.tsx:75-82`)
  - 현재: completeTypewriter()가 currentLine.text를 사용
  - displayText 상태 업데이트 후 isTyping false로 변경 (useCallback 순서 확인)

- [ ] [S] PlaySong 컴포넌트 음성 타입 동적화 (`src/components/PlaySong.tsx:74`)
  - 현재: type={'audio/mpeg'}로 고정
  - file extension으로 type 자동 감지 (mp3, flac, wav, ogg 등)

- [ ] [M] useSoundEffect 에러 처리 개선 (`src/hooks/useSoundEffect.tsx`)
  - Audio 생성 시 src 유효성 검증
  - play() catch에서 재시도 로직 보강 (최대 시도 횟수 제한)

#### UI/UX 개선

- [ ] [M] 모바일 터치 입력 지원 (`src/components/GameScene.tsx`)
  - 현재: 클릭과 키보드만 지원
  - 터치 이벤트(touchstart, touchend) 핸들러 추가

- [ ] [M] 텍스트 속도 설정 메뉴 (`src/components/`, `src/styles/`)
  - Settings 컴포넌트 신규 생성
  - TYPEWRITER_SPEED_MS 값을 동적으로 변경 가능하게
  - localStorage에 사용자 설정 저장

- [ ] [S] 자동 진행 기능 (Auto-play) (`src/components/GameScene.tsx`)
  - 대사 진행 후 자동으로 다음 대사로 넘어가는 옵션
  - 토글 버튼 UI 추가

- [ ] [S] 마우스 커서 커스터마이징 (`src/styles/GamePage.css`)
  - 클릭 가능 요소에 손가락 커서 (pointer) 적용
  - 비주얼 노벨 테마의 커스텀 커서 이미지 적용 검토

#### 사운드 및 음악

- [ ] [M] BGM 씬별 다르게 적용 (`src/data/scenes.ts`, `src/components/PlaySong.tsx`)
  - 현재: 모든 씬에서 'in_office.mp3' 사용
  - 씬별 bgm 값 설정 (scenes.ts에 이미 필드 있음)
  - BGM 전환 시 fadeOut → fadeIn 효과

- [ ] [M] 효과음 파일 형식 통일 (`public/music/effect/`)
  - hover.flac (약 60KB), select.mp3 (약 20KB) 혼재
  - 모두 mp3로 변환 또는 모두 flac로 변환 결정
  - save.wav 파일 형식 확인 필요

- [ ] [S] 음소거 기능 UI (`src/components/`, `src/styles/`)
  - 게임 중 음소거 토글 버튼 추가 (우측 상단)
  - 음소거 상태 localStorage에 저장

### 🟢 낮음

#### 문서화

- [ ] [S] 컴포넌트 JSDoc 주석 추가 (`src/components/`, `src/hooks/`)
  - GameScene: Props 설명, 동작 방식 문서화
  - GameRouter: 씬 진행 로직 설명
  - useSoundEffect: 반환값 및 사용법 설명

- [ ] [S] 개발자 가이드 작성 (`docs/DEVELOPMENT.md` 신규)
  - 새 씬 추가 방법: scenes.ts에 SceneData 추가, scenes 배열에 등록
  - 새 캐릭터 추가 방법: characters.ts 추가 후 GameScene에서 사용
  - 게임 상태 접근 방법

- [ ] [S] 프로젝트 README 완성 (`README.md`)
  - 게임 개요, 설치 방법, 개발 서버 실행 방법
  - 빌드 및 배포 방법 추가

#### 성능 최적화

- [ ] [S] 동적 import 적용 (`src/App.tsx`)
  - React.lazy()로 각 페이지 컴포넌트 감싸기
  - Suspense 폴백 UI 추가

- [ ] [S] 이미지 최적화 (`public/image/`)
  - 캐릭터 png 파일 크기 확인 및 최적화
  - 배경 이미지 webp 변환 검토

- [ ] [S] 번들 크기 분석
  - `npm run build` 후 dist/ 폴더 크기 확인
  - Vite build 최적화 검토

#### 접근성 및 국제화

- [ ] [S] 스크린 리더 접근성 (`src/components/`)
  - role, aria-label 속성 추가
  - semantic HTML 사용 검토

- [ ] [S] 국제화 기초 구축 (`src/locales/` 신규)
  - i18next 라이브러리 추가 고려
  - 현재는 한국어만 지원하지만 향후 다국어 지원 시 구조 미리 준비

---

## 🧪 테스트 항목

### 단위 테스트

- [ ] [M] GameScene 컴포넌트 테스트 (`src/components/__tests__/GameScene.test.tsx` 신규)
  - 초기 대사 렌더링 확인
  - 클릭 시 다음 대사로 진행 확인
  - 타이핑 효과 중 클릭 시 전체 텍스트 표시 (skipToFull) 확인
  - 모든 대사 완료 후 "계속하기" 버튼 표시 확인
  - 모든 대사 완료 후 "계속하기" 클릭 시 onComplete() 호출 확인
  - Enter/Space 키 입력 처리 확인
  - 캐릭터 이미지가 있으면 표시, 없으면 숨김 확인

- [ ] [M] GameRouter 컴포넌트 테스트 (`src/components/__tests__/GameRouter.test.tsx` 신규)
  - currentSceneIndex 상태로 적절한 씬 렌더링 확인
  - onComplete 호출 시 다음 씬으로 진행 확인
  - 마지막 씬 완료 시 navigate('/') 호출 확인

- [ ] [S] Opening 컴포넌트 테스트 (`src/components/__tests__/Opening.test.tsx` 신규)
  - 화살표 키 입력 시 버튼 선택 변경 확인
  - Enter 입력 시 handleSelect() 호출 확인
  - 마우스 hover 시 선택 변경 확인
  - START 클릭 시 '/game' 네비게이션 확인
  - EXIT 클릭 시 window.close() 호출 확인 (mock 필요)
  - 호버 효과음 재생 확인

- [ ] [S] IntroPage 컴포넌트 테스트 (`src/components/__tests__/IntroPage.test.tsx` 신규)
  - 클릭 시 '/opening' 네비게이션 확인
  - Enter/Space 키 입력 시 네비게이션 확인

- [ ] [S] PlaySong 컴포넌트 테스트 (`src/components/__tests__/PlaySong.test.tsx` 신규)
  - src 변경 시 이전 오디오 정지 확인
  - fadeIn 옵션으로 볼륨 증가 확인
  - loop 속성 적용 확인

- [ ] [S] useSoundEffect 훅 테스트 (`src/hooks/__tests__/useSoundEffect.test.ts` 신규)
  - 반환된 함수 호출 시 Audio 객체 생성 및 play() 호출 확인
  - currentTime이 0으로 초기화되어 있는지 확인

### 통합 테스트

- [ ] [M] 라우트 네비게이션 테스트 (`src/__tests__/routing.integration.test.tsx` 신규)
  - IntroPage -> Opening 이동 (클릭)
  - Opening -> GameRouter (START 클릭)
  - GameRouter -> GameRouter 다음 씬 (계속하기 클릭)
  - 마지막 씬 -> IntroPage (게임 종료)

- [ ] [M] 게임 플로우 테스트 (`src/__tests__/gameFlow.integration.test.tsx` 신규)
  - GameRouter 마운트 시 첫 번째 씬 렌더링
  - 각 대사 클릭 진행
  - 대사 완료 후 계속하기 버튼 표시 및 클릭
  - 씬 전환 확인

- [ ] [M] 저장/로드 기능 테스트 (`src/__tests__/saveLoad.integration.test.tsx` 신규, 설계 후)
  - 게임 진행 중 save.png 클릭
  - localStorage에 게임 상태 저장 확인
  - 새로 게임 시작 시 SAVED 버튼 활성화 확인
  - SAVED 클릭 시 저장된 상태에서 게임 복원 확인

### 엣지 케이스 및 기능 검증

- [ ] [S] 빠른 연속 클릭 테스트 (`src/components/GameScene.tsx`)
  - 한 번에 여러 번 클릭해도 대사 인덱스 초과하지 않음 확인
  - hasFinishedAll 상태 확인 후 추가 클릭 무시

- [ ] [S] 오디오 자동재생 정책 테스트 (`src/components/PlaySong.tsx`)
  - 브라우저 자동재생 정책 위반 시 첫 사용자 인터랙션 후 재시도 확인
  - 네트워크 오류 시 graceful하게 처리

- [ ] [S] 작은 화면 반응형 테스트 (`src/styles/GamePage.css`)
  - 모바일(320px), 태블릿(768px), 데스크톱(1024px) 크기별로 레이아웃 확인
  - clamp() 값이 적절하게 스케일 되는지 확인

- [ ] [S] 타이핑 효과 성능 테스트
  - TYPEWRITER_SPEED_MS 값에서 CPU 사용률 안정적인지 확인
  - 장문 텍스트(500자+) 타이핑 시 프레임 드롭 없음 확인

---

## ✅ 확인 사항

### 코드 검증

- [ ] [S] 현재 eslint 경고 없이 빌드 가능한지 확인 (`npm run lint`)
  - react-hooks exhaustive-deps 경고 있으면 검토

- [ ] [S] GameScene.tsx의 ESLint 비활성화 주석 정당성 검토 (line 131)
  - `// eslint-disable-next-line react-hooks/exhaustive-deps`
  - startTypewriter 의존성이 dialogueIndex 변경 시 필수인지 재확인

- [ ] [S] Opening.tsx의 useCallback 의존성 검토 (line 30, 61)
  - playClickSound, navigate, selectedIndex, handleSelect 등이 적절히 포함되어 있는지 확인

### 기능 검증

- [ ] [M] save.png 아이콘 클릭 기능 구현 완료 확인
  - 현재: console.log('saved'), playHoverSound() 만 있음
  - localStorage 저장 로직 구현 필요

- [ ] [M] Opening의 SAVED 버튼 활성화 로직 확인
  - 현재: TODO 주석만 있음 (line 23)
  - localStorage.getItem('gameSave')로 저장 데이터 확인 후 활성화

- [ ] [S] EXIT 버튼 동작 확인
  - window.close()는 브라우저에서는 작동하지 않을 수 있음 (보안)
  - Electron/데스크톱 앱 환경에서만 정상 작동
  - 대체 동작 필요 시 navigate('/') 사용

- [ ] [S] GameRouter의 key={currentSceneIndex} 리마운트 확인
  - 씬 변경 시 GameScene이 완전히 리마운트되어 상태 초기화 확인

- [ ] [S] PlaySong fadeIn 효과 정상 동작 확인
  - 5000ms(5초)에 걸쳐 음량이 0에서 1로 증가 확인

### 보안

- [ ] [S] 향후 사용자 파일 로드 시 XSS 방지
  - 현재: 하드코딩된 대사만 있으므로 XSS 위험 없음
  - 추후 외부 파일/네트워크에서 데이터 로드 시 DOMPurify 등 검토

- [ ] [S] localStorage 용량 제한 확인
  - 게임 저장 데이터 크기가 5MB 이내인지 확인
  - 브라우저 localStorage 제한은 보통 5-10MB

### 설정/환경

- [ ] [M] 환경 변수 설정 준비 (`.env.example` 신규)
  - 현재: 환경 변수 없음
  - 추후 필요 시: API_URL, ASSET_PATH 등 정의

- [ ] [S] TypeScript strict 모드 확인 (`tsconfig.app.json`)
  - strict: true 설정 확인

- [ ] [S] vite.config.ts 최적화 검토
  - React 플러그인 설정 확인

### 배포 전 체크

- [ ] [M] 프로덕션 빌드 성공 확인 (`npm run build`)
  - dist/ 폴더 생성 및 모든 리소스 포함 확인

- [ ] [M] 프로덕션 빌드 로컬 테스트 (`npm run preview`)
  - 모든 라우트 작동 확인
  - 배경 이미지, 캐릭터 이미지, 음악 파일 로드 확인
  - 타이핑 애니메이션 성능 확인

- [ ] [M] 브라우저 호환성 테스트
  - Chrome/Edge (최신)
  - Firefox (최신)
  - Safari (최신) - 특히 오디오 자동재생 정책 확인

- [ ] [S] 성능 측정 (Lighthouse)
  - 페이지 로드 시간
  - CLS(Cumulative Layout Shift)
  - FCP(First Contentful Paint)

- [ ] [S] 배포 전 최종 정리
  - console.log() 디버그 문 제거 (GameScene.tsx line 147은 저장 기능 구현 후 정리)
  - 주석 처리된 코드 정리
  - 하드코딩된 로컬 경로 확인

### 문서화

- [ ] [M] GitHub Pages 또는 Netlify 배포 설정 (선택)
  - 배포 자동화 설정 (CI/CD)

- [ ] [S] GAMEPLAY.md 작성 (`docs/GAMEPLAY.md` 신규)
  - 조작법: 클릭, 키보드, 마우스 호버
  - 게임 목표 및 엔딩 종류

- [ ] [S] 버전 관리 정책
  - package.json 버전 관리 체계 (Major.Minor.Patch)
  - CHANGELOG.md 유지

---

## 📊 최근 완료 항목 (2026-02-18)

### 게임 구조 통합
- ✓ GamePage, GamePage2 -> GameScene.tsx로 통합 (props 기반 재사용성)
- ✓ 씬 데이터 분리: src/data/scenes.ts 생성 (SceneData 인터페이스)
- ✓ GameRouter.tsx 생성 (currentSceneIndex로 씬 전환)

### 스타일 개선
- ✓ CSS 반응형 리팩터링 (px → clamp(), 미디어 쿼리 제거)
- ✓ 캐릭터 이미지 크기 통일 (height 기준)
- ✓ 배경 blur 제거
- ✓ 반투명 대화상자 스타일 적용

### 레이아웃 개선
- ✓ 캐릭터 대화창 좌측 상단 배치
- ✓ 캐릭터 이름 태그 우측 상단 배치
- ✓ 캐릭터 이미지 배경 제거 (투명 PNG 변환)

### 기능 구현
- ✓ Opening.tsx 키보드/마우스 hover 선택 통일 (stale closure 수정)
- ✓ Opening.tsx EXIT 버튼 window.close() 구현
- ✓ save.png 아이콘 GameScene 우측 상단에 추가 (UI만 구현, 기능은 미구현)
- ✓ useSoundEffect hook useCallback 안정화

### 코드 품질
- ✓ GameScene.tsx 주석 추가 (useState, Render 영역)
- ✓ visual-novel-css-designer.md 에이전트 규칙 다수 추가

---

## 🎮 게임 개발 진행도

```
[██████████████████░░░░░░░░░░░░░░░░░░░░] 약 50%

완료:
- IntroPage (타이틀)
- Opening (메인 메뉴) - 모든 기본 기능 완료
- GameRouter (씬 전환 관리)
- GameScene (씬1, 씬2 렌더링)
- 타이핑 효과, 캐릭터 표시, BGM 재생
- CSS 반응형 스타일링
- 저장 UI (save.png 아이콘)

구현 중:
- 저장/로드 기능 (localStorage 설계 완료, 코드 작성 대기)

미완료:
- 저장/로드 기능 (구현)
- 선택지/분기 시스템
- 다중 엔딩
- 씬3 이상 추가
- 전체 테스트
```

---

## 📌 우선순위 가이드

### 즉시 처리 필요 (이번 주)
1. 저장/로드 기능 구현 (설계 완료 상태)
2. GameScene save 기능 구현 (현재 console.log만 있음)
3. Opening SAVED 버튼 활성화 로직
4. 선택지 시스템 기초 구현 (DialogueLine에 choices 필드 추가)

### 1-2주 내
5. 선택지 분기 처리 완전 구현
6. 씬3 이상 추가 및 스토리 개발
7. 기본 단위 테스트 작성 시작

### 2주 이후
8. 통합 테스트 및 엣지 케이스 테스트
9. UI/UX 개선 (텍스트 속도, 자동진행, 모바일 터치)
10. 성능 최적화 및 배포 준비

---

## 🔗 관련 파일 및 주요 코드 위치

### 핵심 파일
- `src/components/GameScene.tsx` - 모든 씬 렌더링 로직 (대사, 타이핑, 캐릭터)
- `src/components/GameRouter.tsx` - 씬 전환 관리
- `src/components/Opening.tsx` - 메인 메뉴
- `src/data/scenes.ts` - 씬 데이터 정의
- `src/styles/GamePage.css` - 게임 화면 스타일

### 구현 필요 파일
- `src/services/saveGameService.ts` (신규) - 저장/로드 로직
- `src/types/gameState.ts` (신규) - GameState, SaveData 타입
- `src/data/characters.ts` (신규) - 캐릭터 정보

### 설정 파일
- `package.json` - 테스트 스크립트 추가 필요
- `tsconfig.app.json` - TypeScript 설정
- `eslint.config.js` - ESLint 규칙

---

**작성자**: Claude Code TODO Analyzer
**작성일**: 2026-02-18
**대상 프로젝트**: poetry-visual-novel_Front / geum-soon
