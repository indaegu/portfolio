# 성창민 포트폴리오 v2

**복잡한 흐름을, 명확한 경험으로.**

큰 타이포그래피, 코드 기반 입체 그래픽, 대표 프로젝트 4개와 개별 사례 9개를 갖춘 정적 포트폴리오입니다. 실무의 Vue/Spring 경험과 개인/CoP의 React/TypeScript 경험을 구분합니다.

## 실행

Node.js 22 이상. 외부 npm 패키지 설치 없이 실행할 수 있습니다.

```bash
npm run dev
```

`http://localhost:4173/portfolio/`에서 확인합니다. `src/`, `public/` 수정 시 다시 빌드되며 브라우저는 직접 새로고침합니다. **기존 루트 index.html은 원본으로 보존합니다. 새 화면은 dist/에 빌드됩니다.** 파일을 더블클릭하는 대신 개발 서버로 열어주세요.

```bash
npm run check    # 테스트 + 정적 빌드 + 내부 링크/자산 검사
npm run build    # dist 생성
npm run preview  # 미리보기 서버
```

## 수정 위치

| 파일 | 역할 |
|---|---|
| `src/content/portfolio.mjs` | 소개, 경력, 프로젝트 본문, 성과, 이미지 경로 |
| `src/templates.mjs` | 메인 / 사례 / 404 HTML 구조 |
| `src/styles/site.css` | 디자인, 반응형, 모션, 인쇄 스타일 |
| `src/scripts/site.js` | 유한 애니메이션, 모션 설정, 복사, 옛 앵커 호환 |
| `scripts/` | 의존성 없는 정적 빌드, 서버, 검사 |
| `public/media/` | 실제 프로젝트 이미지/영상 |

Next.js로 전환하지 않고 Node 정적 템플릿과 HTML/CSS/JavaScript로 구현했습니다. 현재 GitHub Pages의 간단한 운영을 유지하고, 콘텐츠와 효과를 분리하기 위한 선택입니다. 문서는 JavaScript 없이도 읽을 수 있고, 애니메이션 초기화 실패로 숨겨지지 않습니다.

스크롤과 키보드 포커스, URL 해시는 브라우저 기본 동작을 사용합니다. 무한 커서/스크롤 루프는 없습니다. 기기의 동작 줄이기 설정과 수동 모션 정지 버튼을 지원합니다.

## GitHub Pages 배포

기존 main과 배포 사이트는 리뉴얼 검토 중 유지합니다. 기능 브랜치의 코드를 병합하기 전, 로컬 실행으로 먼저 확인하세요.

권장 방식은 GitHub Actions입니다. `.github/workflows/portfolio.yml`은 브랜치와 PR에서 검사/빌드만, main에서만 배포하도록 구분되어 있습니다.

1. 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 바꿉니다.
2. PR을 main에 병합합니다.
3. Actions에서 검사와 배포가 완료됐는지 확인합니다. 병합 후 소스를 전환했다면 워크플로를 수동 실행합니다.

이번 구현에서는 PR 병합과 Pages 설정 변경을 실행하지 않습니다. 연결의 workflow 권한이 제한되어 파일 등록이 거절된 경우에는 `docs/portfolio-workflow.yml`을 `.github/workflows/portfolio.yml`로 직접 복사한 뒤 커밋합니다.

기존 branch 방식 배포를 유지하려면 `dist/`의 **내용물**을 별도 배포 브랜치 루트에 올립니다. `.nojekyll`도 포함해야 합니다. 생성물과 소스를 같은 파일처럼 동시에 수정하지 마세요.

루트 도메인에서 쓰려면 `profile.origin`, `profile.basePath`와 `templates.mjs`의 기존 OG 이미지 주소를 변경합니다. 일시적인 루트 빌드: `BASE_PATH=/ npm run build`. PowerShell: `$env:BASE_PATH='/'; npm run build`.

## 실제 이미지 교체

이미지 없이도 모든 구간이 완성된 개념 그래픽으로 표시됩니다. 실제 서비스 화면이 아님을 명시했습니다. 파일을 `public/media/`에 넣고 프로젝트의 `media: null`을 교체합니다.

```js
media: {
  src: 'media/mulsigye-cover.webp',
  alt: '수신호 웹의 저수지 현황과 권장 행동 화면',
  width: 1600,
  height: 1250,
  caption: '수신호 실제 웹 화면',
}
```

영상은 `type: 'video'`, MP4 경로와 이미지 `poster`를 추가합니다. 사용자 재생 컨트롤을 제공하고 자동 재생하지 않습니다. 대사가 있다면 별도의 자막 track을 추가해야 합니다. 이미지 파일이 없거나 필수 메타데이터가 누락되면 빌드를 실패시킵니다.

[이미지/영상 제작 규격](docs/ASSET_GUIDE.md)

## 검증

`npm run check`는 Node 테스트 17개, HTML 11개, 내부 자산/앵커 참조를 검사합니다.

```bash
python -m pip install playwright
python -m playwright install chromium
npm run build
python tests/browser_smoke.py
```

`CHROMIUM_PATH` 환경변수로 설치된 Chromium을 사용할 수 있습니다. 브라우저 검사는 생성한 HTML/CSS/JS를 문서에 직접 삽입하는 방식이며, 외부 폰트와 네트워크 탐색은 제외합니다. 결과는 `test-results/browser-smoke.json`에 저장됩니다. 실제 기기의 스크린리더, WebView, 클립보드 권한과 공개 배포는 별도로 검증해야 합니다. 통과를 WCAG 인증이나 Lighthouse 점수로 표현하지 않습니다.

## 공개 콘텐츠

기존 공개 포트폴리오를 요약했습니다. 내부 엔드포인트나 보안 구성의 세부 정보는 새 본문에서 제외했지만, 기존 index.html과 Git 이력은 보존합니다. 이를 기존 공개 정보의 삭제 조치로 해석하면 안 됩니다. 진행 중인 CoP와 리팩토링을 완료된 성과로 표기하지 않습니다.

`noindex, nofollow`는 검색 제외 요청이지 접근 제한이 아닙니다. GitHub Pages 프로젝트 경로의 robots.txt는 호스트 루트의 정책을 대신하지 않습니다.

[GitHub Pages 공식 문서](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
