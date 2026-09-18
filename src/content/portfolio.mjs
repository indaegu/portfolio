/** 공개 가능한 기존 포트폴리오 내용만 사용합니다. 진행 중 작업과 실무/개인 경험을 구분합니다. */
export const profile = {
  name: '성창민', englishName: 'Changmin Seong', role: 'Frontend-focused Fullstack Developer',
  email: 'hys1693359@gmail.com', github: 'https://github.com/indaegu', repository: 'https://github.com/indaegu/portfolio',
  origin: 'https://indaegu.github.io', basePath: '/portfolio', updated: '2026-09-14',
  intro: '하나저축은행 스마트뱅킹의 화면과 서버를 개발합니다. 오래 걸리는 빌드와 반복되는 운영 업무를 줄여 왔습니다.',
  experience: [
    {company:'하나금융티아이',period:'2024.11 ~ 현재',role:'비대면 채널 웹 / 서버 개발 및 운영',description:'하나저축은행 스마트뱅킹의 WebView 화면과 Spring Boot 서버, 백오피스와 제휴 채널을 개발합니다. 구현부터 운영 대응까지 이어서 맡습니다.'},
    {company:'한국전자통신연구원 (ETRI)',period:'2023.01 ~ 2023.02',role:'복합 측위 데이터 수집 및 분석',description:'복합 측위 데이터를 수집하고, 관련 알고리즘을 분석하고 비교했습니다.'},
  ],
  skills: [
    {title:'금융 서비스 실무',caption:'PRODUCTION',items:['Vue 2','JavaScript','Webpack','WAI-ARIA','Spring Boot','Java','MyBatis','PostgreSQL','Redis','Docker','Jenkins']},
    {title:'개인 프로젝트 / 사내 CoP',caption:'PROJECTS & EXPLORATION',items:['React','TypeScript','Next.js','TanStack Query','Kotlin','Jetpack Compose','Supabase','OpenAPI']},
  ],
  awards: [
    {year:'2025.07',title:'ICT&디지털혁신본부 상반기 우수직원',description:'Webpack 빌드 최적화를 통한 팀 개발 생산성 개선'},
    {year:'2024.10',title:'마이크로소프트 클라우드 AI 모델 경진대회',description:'한국마이크로소프트 트레이닝 파트너 엘릭서'},
    {year:'2023.12',title:'한국정보산업연합회장상',description:'ICT 한이음 공모전'},
    {year:'2023.12',title:'프로젝트 최우수상',description:'한국소프트웨어기술진흥협회'},
  ],
};
/**
 * media: null이면 명시적으로 표시한 개념 그래픽을 사용합니다.
 * 이미지: {src:'media/name.webp',alt:'설명',width:1600,height:1250,caption:'실제 화면'}
 * 영상: 위 필드에 type:'video', poster:'media/poster.webp'를 추가합니다.
 */
export const projects = [
 {
  slug:'build-performance',index:'01',title:'풀빌드 시간을 5분대에서 1분대로 줄였습니다.',subtitle:'Webpack 라우터 코드 스플리팅 개선',
  category:'실무 / 개발 생산성',role:'Frontend',period:'2025.04 ~ 2025.05',status:'개선 완료',theme:'build',featured:true,
  tags:['Vue 2','Webpack','JavaScript'],summary:'풀빌드에 5분대가 걸렸습니다. 동적 import 때문에 넓어진 Webpack의 모듈 탐색 범위를 정리해 1분대로 줄였습니다. 번들러와 기존 라우팅은 그대로 유지했습니다.',
  metric:{value:'약 80%',label:'풀빌드 시간 단축'},media:null,
  sections:[
   {heading:'풀빌드에 약 5분이 걸렸습니다',body:['프론트엔드 풀빌드에 약 5분이 걸렸습니다. 라우터의 경로와 청크명을 변수로 구성하면서 빌드마다 모듈 탐색 범위와 청크 구성이 불안정해지는 상황이었습니다.','폐쇄망 환경에서 인프라 증설이나 신규 번들러 도입으로 우회하기 어려웠습니다. 기존 도구와 화면 동작을 유지하면서 병목을 줄이는 방향을 택했습니다.']},
   {heading:'Webpack이 어떤 모듈을 찾는지 확인했습니다',body:['변수로 조합한 lazy-load 경로 때문에 Webpack이 context 모듈을 만들고, 폴더의 후보 파일을 스캔하고 파싱하는 구조를 확인했습니다.','라우트별 import를 정적 파일 경로로 바꾸고 청크명을 고정했습니다. 동적 선택이 필요한 부분은 한정된 매핑으로 남겨, 필요한 유연성과 정적 분석 가능성을 함께 확보했습니다.']},
   {heading:'번들러 교체 없이 라우터의 import를 수정했습니다',body:['라우팅의 외부 URL과 화면 동작은 유지하고 내부 로딩 정의만 변경했습니다. 번들러 전체 교체보다 변경 범위와 회귀 위험을 작게 유지하는 선택이었습니다.','풀빌드 시간을 5분대에서 1분대로 약 80% 단축했습니다. 이 성과로 ICT&디지털혁신본부 2025년 상반기 우수직원에 선정됐습니다.']},
   {heading:'결과의 범위',body:['5분대와 1분대는 기존 포트폴리오에 기록한 실무 풀빌드 결과입니다. 이 페이지의 그래픽은 전후 비교를 설명하는 시각화이며 실시간 벤치마크가 아닙니다.','팀 합산 월 약 13시간은 개발자 2명, 하루 5회, 월 20영업일, 회당 약 4분 절감을 적용한 대기시간 환산치입니다. 실제 근로시간 절감과는 구분합니다.']},
  ],takeaway:'Webpack을 바꾸지 않고도 탐색 범위를 정리해 빌드 시간을 줄일 수 있었습니다.'
 },
 {
  slug:'mulsigye',index:'02',title:'저수율을 보고 물관리를 돕는 웹과 앱을 만들었습니다.',subtitle:'수신호 / 농업용수 물관리 AI 코치',
  category:'개인 / 제품 개발',role:'기획 / 설계 / 웹 / Android 단독 개발',period:'2026.07',status:'공모전 출품',theme:'water',featured:true,
  tags:['Next.js','TypeScript','Kotlin','Supabase'],summary:'개인 프로젝트로 Next.js 웹과 Android 앱을 혼자 만들었습니다. 저수율을 보고 물관리를 안내하며, 두 클라이언트는 OpenAPI 계약을 공유합니다. 외부 AI가 응답하지 않으면 정적 안내를 보여줍니다.',
  metric:{value:'Web + App',label:'기획부터 양쪽 클라이언트 구현'},media:null,
  links:[{label:'웹 서비스 열기',href:'https://3rd-krc-ai-digital-web.vercel.app/'},{label:'GitHub에서 코드 보기',href:'https://github.com/indaegu/3rd-krc-ai-digital'},{label:'Android 릴리즈',href:'https://github.com/indaegu/3rd-krc-ai-digital/releases'}],
  sections:[
   {heading:'저수율을 보고 무엇을 해야 할지 안내하고 싶었습니다',body:['한국농어촌공사의 공공데이터를 바탕으로 지역 저수지의 사정과 앞으로의 흐름, 오늘 할 일을 알려주는 서비스를 만들었습니다. 제3회 KRC AI 디지털 혁신 공모전 출품작입니다.','고령 농업인이 읽기 쉬운 글꼴과 표현, 로그인 없는 진입을 우선했습니다. 숫자와 그래프만 보여주는 대신 사용자가 이해하고 행동할 수 있는 안내를 목표로 했습니다.']},
   {heading:'서버가 판단하고 LLM은 문장을 쓰도록 나눴습니다',body:['단계와 수치, 허용할 행동은 서버가 결정하고 LLM은 표현을 담당하도록 책임을 나눴습니다. 생성 모델이 근거 없는 조언을 덧붙이지 않도록 응답 범위를 제한했습니다.','외부 모델 장애나 예산 초과 시에는 정적 코치로 대체합니다. 자체 예측은 참고 정보이며 공식 가뭄 예경보가 우선한다는 경계를 UI와 문서에 명시했습니다.']},
   {heading:'웹과 Android가 같은 API 계약을 씁니다',body:['Next.js 웹과 Kotlin / Jetpack Compose Android 앱을 하나의 모노레포에서 개발했습니다. OpenAPI를 공통 계약으로 두고 문서, 예시, 픽스처의 불일치를 CI에서 검사하도록 구성했습니다.','회원가입 없이 지역 설정을 기기에 보관하고, 주소 원문을 서버에 저장하지 않도록 설계했습니다. 통신이 끊기는 상황에서는 마지막 화면을 유지하도록 처리했습니다.']},
   {heading:'결과와 확인할 수 있는 자료',body:['웹과 Android 클라이언트를 단독으로 설계하고 구현했습니다. 서비스와 저장소, Android 릴리즈는 아래 링크에서 확인할 수 있습니다.','예측 모델은 시간 순서를 지킨 백테스트로 비교했습니다. 수치만 떼어내어 일반적인 정확도로 표현하지 않고, 평가 조건과 적용 범위를 함께 저장소에 남겼습니다.']},
  ],takeaway:'외부 AI가 응답하지 않아도 물관리 안내가 나오도록 했습니다. 예측은 참고 정보라는 점도 화면과 문서에 남겼습니다.'
 },
 {
  slug:'mydata-auth',index:'03',title:'상품 화면마다 반복하던 인증 처리를 공통으로 묶었습니다.',subtitle:'공공마이데이터 연동 및 전자서명 통합 인증',
  category:'실무 / 금융 경험',role:'Fullstack',period:'2026.04 ~ 2026.06',status:'운영 배포 완료',theme:'auth',featured:true,
  tags:['Vue 2','Spring Boot','WebView'],summary:'공동·금융·간편 인증서 처리를 공통으로 묶고 공공마이데이터를 연동했습니다. 운영 중인 인증 모달은 건드리지 않고, 이를 호출하는 상품 화면의 반복 코드를 줄였습니다.',
  metric:{value:'3 → 1',label:'인증 경로의 사용자 흐름 통합'},media:null,
  sections:[
   {heading:'화면마다 복사하던 인증 흐름',body:['인증서 종류에 따라 서명과 처리 경로가 달라 여러 상품 화면에 같은 로직이 반복됐습니다. 공공마이데이터 연동도 고객의 상품 가입 흐름 안에서 이어져야 했습니다.','운영에서 검증된 인증 모달을 수정하면 다른 금융 흐름의 회귀 위험이 생깁니다. 원본의 동작을 보존하면서 호출부의 복잡도를 줄여야 했습니다.']},
   {heading:'기존 모달 바깥에 래퍼를 만들었습니다',body:['기존 모달을 자식으로 렌더링하는 오케스트레이터 래퍼를 만들고, 부모 컴포넌트와의 계약을 한곳에 모았습니다. 상품 화면에는 열기 호출과 성공, 취소, 실패 이벤트만 노출했습니다.','중복 콜백 대응도 공통 영역에 모아 상품마다 같은 방어 로직을 복사하지 않도록 구성했습니다. 편의성과 검증 신뢰를 함께 고려하면서 화면과 서버의 책임을 정리했습니다.']},
   {heading:'인증 3종과 공공마이데이터 거래 4종을 배포했습니다',body:['공동, 금융, 간편 인증서 3종 경로를 하나의 화면 흐름으로 통합하고 공공마이데이터 거래 4종의 연동을 운영 배포까지 완료했습니다.','기존 모달을 변경하지 않고 공통 흐름을 확장해, 외부 명세 변경 시 수정 지점을 집중시켰습니다. 개발 환경에서 자체 검증할 수 없는 잔여 사항은 관련 부서에 공유했습니다.']},
  ],takeaway:'운영 중인 인증 모달은 그대로 두고, 이를 호출하는 상품 화면의 코드를 줄였습니다.'
 },
 {
  slug:'sbom-platform',index:'04',title:'오픈소스 취약점을 한곳에서 확인하는 화면을 만들고 있습니다.',subtitle:'SBOM 기반 오픈소스 취약점 관리 플랫폼',
  category:'사내 CoP / 팀 프로젝트',role:'6인 팀 팀장 / 프론트엔드 단독',period:'2026.04 ~ 진행 중',status:'진행 중',theme:'sbom',featured:true,
  tags:['React','Next.js','TypeScript','TanStack Query'],summary:'사내 CoP에서 오픈소스 자산과 취약점을 확인하는 플랫폼을 개발 중입니다. React·Next.js·TypeScript 프론트엔드와 TanStack Query 서버 상태 처리를 맡고, 6인 팀의 PR과 코드 리뷰를 운영합니다.',
  metric:{value:'6인 팀',label:'팀 리딩 및 프론트엔드 설계'},media:null,
  sections:[
   {heading:'어떤 오픈소스를 쓰는지 확인하는 화면',body:['업무 외 사내 학습 모임(CoP)에서 진행 중인 프로젝트입니다. 수작업으로 추적하기 어려운 오픈소스 구성요소와 취약점 현황을 파악할 수 있는 플랫폼을 개발하고 있습니다.','SPDX, CycloneDX 형식의 SBOM을 기반으로 자산을 가시화하고, 취약점 데이터와 연결해 대응에 필요한 정보를 전달하는 구성을 목표로 합니다.']},
   {heading:'프론트엔드 구현과 팀 운영을 맡고 있습니다',body:['TypeScript와 Next.js 프론트엔드를 단독으로 설계하고 구현하고 있습니다. TanStack Query를 활용하는 서버 상태 동기화와 컴포넌트 구조를 담당합니다.','6인 팀의 팀장으로 브랜치 전략, 커밋과 PR 규칙, 마일스톤을 정하고 코드 리뷰를 운영합니다. 구현뿐 아니라 협업이 이어질 수 있는 기준을 만드는 역할입니다.']},
   {heading:'현재 범위',body:['프론트엔드 구조와 협업 프로세스를 담당하며 개발을 진행하고 있습니다. 취약점 DB 매칭, 영향도 분석과 자동 알림은 플랫폼의 주요 개발 범위입니다.','진행 중인 프로젝트이므로 운영 완료나 정량적인 대응시간 단축을 확정된 성과로 표기하지 않습니다. 구성요소 그래픽은 개념 표현이며 실제 사내 화면이 아닙니다.']},
  ],takeaway:'프론트엔드를 구현하면서 브랜치·PR 규칙도 정하고 있습니다. 다음 변경을 쉽게 만들도록 컴포넌트 구조와 코드 리뷰를 함께 챙깁니다.'
 },
 {
  slug:'web-accessibility',index:'05',title:'스크린리더에서 상태와 포커스를 확인하고 고쳤습니다.',subtitle:'스마트뱅킹 웹 접근성 개선',category:'실무 / 접근성',role:'Frontend',period:'2025.07 ~ 2025.08 / 2026.07',status:'심사 대응 완료',theme:'access',featured:false,
  tags:['Vue 2','WAI-ARIA','VoiceOver','TalkBack'],summary:'WebView의 상태 전달과 모달 포커스를 고쳤습니다. 화면의 모양과 기존 동작은 유지하면서 VoiceOver·TalkBack으로 주요 거래를 확인하고 연도별 접근성 심사에 대응했습니다.',metric:{value:'2회',label:'연도별 웹 접근성 심사 대응'},media:null,
  sections:[{heading:'기존 화면을 유지하면서 상태와 포커스를 고쳤습니다',body:['외부 심사기관의 진단 결과를 해석해 스마트뱅킹 WebView 화면과 공통 컴포넌트를 개선했습니다. 운영 중인 화면의 CSS, 기존 동작과 API 계약을 유지해야 했습니다.','토글 상태 속성의 문자열 바인딩, 모달의 역할과 포커스 흐름, 장식 아이콘의 대체 텍스트를 정리했습니다. 반복되는 항목은 공통 컴포넌트에서 대응했습니다.']},{heading:'VoiceOver와 TalkBack으로 주요 거래를 확인했습니다',body:['iOS VoiceOver와 Android TalkBack에서 주요 거래 흐름을 확인했습니다. 2025년에 이어 2026년 7월 심사 대응도 완료하고 개선 기준을 팀에 공유했습니다.']}],
  takeaway:'화면의 모양과 기존 동작은 유지하면서 상태 전달과 포커스 이동을 개선했습니다.'
 },
 {
  slug:'backoffice',index:'06',title:'운영자가 직접 처리할 수 있는 일을 늘렸습니다.',subtitle:'운영자 페이지 자체개선',category:'실무 / 업무 효율',role:'Fullstack',period:'2026.02 ~ 진행 중',status:'1차 배포 / 추가 개선 중',theme:'admin',featured:false,
  tags:['Vue 2','Element UI','Spring Boot','PostgreSQL'],summary:'같은 공지와 팝업을 채널마다 세 번 등록하던 작업을 한 번으로 줄였습니다. 운영자가 지표를 조회하고 이미지를 직접 넣을 수 있게 했고, 공시 데이터 41개 분기는 원문을 보존해 DB로 옮겼습니다.',metric:{value:'3 → 1',label:'채널별 반복 등록을 한 번으로'},media:null,
  sections:[{heading:'같은 내용을 채널마다 등록하고 있었습니다',body:['같은 공지와 팝업을 채널마다 등록하고, 지표 조회나 이미지 교체 때마다 개발자를 거치는 절차가 있었습니다. 현업이 직접 처리할 수 있는 기능으로 바꾸는 작업을 시작했습니다.','한 번 작성한 내용을 채널별 화면에 맞게 반영하는 구조, MAU/DAU 조회, 이미지 직접 삽입 기능을 추가했습니다. 1차 범위는 2026년 7월 운영 배포했고 이후 개선을 이어가고 있습니다.']},{heading:'41개 분기의 공시 원문을 DB로 옮겼습니다',body:['분기별 공시를 코드와 JSON이 아닌 DB에서 관리하도록 전환했습니다. 41개 분기의 과거 데이터를 조사하고 이관하면서 원문 표기를 보존하는 모델을 선택했습니다.','화면에서 수치를 재계산하지 않고 이미 공시된 문자열과 일치시키는 것을 기준으로 삼았습니다. 매 분기 코드를 수정하는 작업을 데이터 등록으로 대체했습니다.']}],takeaway:'운영 요청이 들어올 때마다 개발자가 처리하던 일을, 운영자가 직접 등록하고 조회할 수 있게 바꿨습니다.'
 },
 {
  slug:'mobile-id',index:'07',title:'모바일 신분증을 Web2App 방식으로 연동했습니다.',subtitle:'모바일 신분증 도입',category:'실무 / WebView',role:'Fullstack',period:'2025.09 ~ 2025.10',status:'운영 배포 완료',theme:'identity',featured:false,
  tags:['Vue 2','WebView','Spring Boot'],summary:'배포 뒤의 운영 변경을 고려해 Web2App 방식을 제안했습니다. 선임 검토 후 iOS·Android 브리지의 콜백과 데이터 규격을 맞춰 구현하고 운영 배포했습니다.',metric:{value:'Web2App',label:'운영 대응을 고려한 방식 선택'},media:null,
  sections:[{heading:'배포 뒤의 수정 방법도 함께 비교했습니다',body:['모바일 신분증 도입 과정에서 네이티브별 개발과 앱 심사를 거치는 App2App 대신, 운영 유연성을 고려한 Web2App 방식을 제안했습니다. 선임 검토 후 채택돼 구현과 운영 배포를 맡았습니다.','iOS와 Android의 브리지 콜백 시점과 데이터 규격을 각 담당자와 조율했습니다. 한글 정규화처럼 WebView에서 드러나는 호환성 차이도 확인하고 대응했습니다.']},{heading:'웹에서 운영 변경에 대응할 수 있게 했습니다',body:['이후 운영 변경을 웹 개발 중심으로 대응할 수 있는 구조를 확보했습니다. 구현 방식 선택의 기준을 초기 개발뿐 아니라 유지보수와 운영 대응 비용으로 설명했습니다.']}],takeaway:'도입할 때의 개발량뿐 아니라 배포 뒤 누가 어떻게 수정할지도 고려해 Web2App을 제안했습니다.'
 },
 {
  slug:'incremental-refactoring',index:'08',title:'운영 중인 API를 조금씩 나누고 있습니다.',subtitle:'레거시 API 점진 리팩토링',category:'실무 / 유지보수',role:'Backend',period:'2026.01 ~ 진행 중',status:'진행 중',theme:'refactor',featured:false,
  tags:['Java','Spring Boot','MyBatis'],summary:'URL과 JSON 계약은 유지한 채 순수 로직부터 분리하고 있습니다. 이관 전후 응답을 비교하고, 문제가 생기면 되돌릴 수 있도록 준비한 뒤 다음 범위로 옮깁니다.',metric:{value:'Step by step',label:'계약을 보존하는 점진적 이관'},media:null,
  sections:[{heading:'이관 전후 응답과 롤백 경로부터 확인합니다',body:['약 2,000줄 규모의 컨트롤러에 비즈니스 로직과 채널 분기가 섞여 있었습니다. 운영 중단을 피하면서 구조를 개선하기 위해 전면 재작성 대신 점진적인 분리를 선택했습니다.','URL과 JSON 계약을 유지하고 유틸과 생성기 등 순수 로직부터 추출합니다. 이관 전후 정상 거래 응답을 비교하고 되돌릴 수 있는 경로를 확보한 뒤 다음 범위로 진행하고 있습니다.']}],takeaway:'기존 응답과 같은지 비교하고 되돌릴 방법을 준비한 범위부터 옮기고 있습니다.'
 },
 {
  slug:'service-operations',index:'09',title:'스마트뱅킹 운영과 제휴 연동을 함께 맡고 있습니다.',subtitle:'스마트뱅킹 상시 운영과 제휴 연동',category:'실무 / 운영과 협업',role:'Fullstack',period:'2024.11 ~ 현재',status:'상시 운영',theme:'admin',featured:false,
  tags:['Vue 2','JSP','Spring Boot','기술 문서화'],summary:'신규 금융 서비스와 정책 변경을 화면부터 서버까지 반영합니다. 제휴사와 다른 규격은 오픈 전에 맞추고, 운영 중 반복되는 이슈는 팀 문서와 공통 기준으로 남깁니다.',metric:{value:'End to end',label:'요건부터 운영까지 이어지는 책임'},media:null,
  sections:[{heading:'정책 변경과 제휴사 연동에 대응합니다',body:['안심차단 비대면 신청, 금리인하요구권 신청 등 신규 서비스와 정책 대응을 화면부터 서버 연동까지 담당했습니다. 솔루션사와 직접 규격을 조율하고 운영 과정의 문제를 추적했습니다.','제휴사가 인지한 진입 URL과 실제 운영 규격의 차이를 오픈 전에 확인했습니다. 기존 연동 현황과 환경별 규칙을 함께 정리해 상대와 같은 계약을 바라보도록 조정했습니다.']},{heading:'같은 이슈를 다시 찾을 수 있도록 문서에 남깁니다',body:['예외 처리, 라우터 가드, 빌드 설정에서 반복되는 이슈를 문서화했습니다. 회의록, 아키텍처 문서와 신입 온보딩 문서를 관리하며 개인의 문제 해결이 팀의 자산으로 이어지도록 합니다.']}],takeaway:'다음에 같은 문제를 맡는 사람이 확인할 수 있도록 해결 과정과 결정 이유를 팀 문서에 남깁니다.'
 },
];
export const principles = [
 {number:'01',title:'원인부터 좁힙니다.',body:'현상을 도구 탓으로 돌리기 전에 동작 원리를 확인합니다. 바꿀 수 없는 조건과 바꿔야 할 원인을 구분합니다.',project:'build-performance',link:'빌드 최적화 사례'},
 {number:'02',title:'경계에서 멈추지 않습니다.',body:'화면에서 서버, 네이티브, 외부 연동까지 맥락을 따라갑니다. 담당 경계보다 사용자의 전체 흐름을 먼저 봅니다.',project:'mydata-auth',link:'인증 통합 사례'},
 {number:'03',title:'다음 변경을 쉽게 만듭니다.',body:'반복되는 코드는 공통 구조로, 반복되는 질문은 문서로 남깁니다. AI의 결과도 직접 설명하고 검증하며 사용합니다.',project:'sbom-platform',link:'설계와 협업 사례'},
];
