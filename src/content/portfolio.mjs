/** 공개 가능한 기존 포트폴리오 내용만 사용합니다. 진행 중 작업과 실무/개인 경험을 구분합니다. */
export const profile = {
  name: '성창민', englishName: 'Changmin Seong', role: 'Frontend-focused Fullstack Developer',
  email: 'hys1693359@gmail.com', github: 'https://github.com/indaegu', repository: 'https://github.com/indaegu/portfolio',
  origin: 'https://indaegu.github.io', basePath: '/portfolio', updated: '2026-09-14',
  intro: '금융 서비스의 화면과 서버를 연결하고, 성능과 운영의 문제를 개선하는 개발자입니다.',
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
  slug:'build-performance',index:'01',title:'빌드 시간을 줄여, 개발의 흐름을 바꾸다.',subtitle:'Webpack 라우터 코드 스플리팅 개선',
  category:'실무 / 개발 생산성',role:'Frontend',period:'2025.04 ~ 2025.05',status:'개선 완료',theme:'build',featured:true,
  tags:['Vue 2','Webpack','JavaScript'],summary:'번들러 교체가 아닌 원인 제거. 동적 import의 정적 분석 범위를 정리해 풀빌드 시간을 5분대에서 1분대로 줄였습니다.',
  metric:{value:'약 80%',label:'풀빌드 시간 단축'},media:null,
  sections:[
   {heading:'느린 빌드를, 당연하게 여기지 않기',body:['프론트엔드 풀빌드에 약 5분이 걸렸습니다. 라우터의 경로와 청크명을 변수로 구성하면서 빌드마다 모듈 탐색 범위와 청크 구성이 불안정해지는 상황이었습니다.','폐쇄망 환경에서 인프라 증설이나 신규 번들러 도입으로 우회하기 어려웠습니다. 기존 도구와 화면 동작을 유지하면서 병목을 줄이는 방향을 택했습니다.']},
   {heading:'원인은 코드가 만드는 탐색 범위에 있었다',body:['변수로 조합한 lazy-load 경로 때문에 Webpack이 context 모듈을 만들고, 폴더의 후보 파일을 스캔하고 파싱하는 구조를 확인했습니다.','라우트별 import를 정적 파일 경로로 바꾸고 청크명을 고정했습니다. 동적 선택이 필요한 부분은 한정된 매핑으로 남겨, 필요한 유연성과 정적 분석 가능성을 함께 확보했습니다.']},
   {heading:'도구를 바꾸기 전에, 바꾸지 않아도 되는지 판단하기',body:['라우팅의 외부 URL과 화면 동작은 유지하고 내부 로딩 정의만 변경했습니다. 번들러 전체 교체보다 변경 범위와 회귀 위험을 작게 유지하는 선택이었습니다.','풀빌드 시간을 5분대에서 1분대로 약 80% 단축했습니다. 이 성과로 ICT&디지털혁신본부 2025년 상반기 우수직원에 선정됐습니다.']},
   {heading:'결과의 범위',body:['5분대와 1분대는 기존 포트폴리오에 기록한 실무 풀빌드 결과입니다. 이 페이지의 그래픽은 전후 비교를 설명하는 시각화이며 실시간 벤치마크가 아닙니다.','팀 합산 월 약 13시간은 개발자 2명, 하루 5회, 월 20영업일, 회당 약 4분 절감을 적용한 대기시간 환산치입니다. 실제 근로시간 절감과는 구분합니다.']},
  ],takeaway:'성능 개선은 도구를 더하는 일보다, 도구가 불필요한 일을 하는 이유를 찾는 데서 시작합니다.'
 },
 {
  slug:'mulsigye',index:'02',title:'공공데이터를, 오늘의 행동으로.',subtitle:'수신호 / 농업용수 물관리 AI 코치',
  category:'개인 / 제품 개발',role:'기획 / 설계 / 웹 / Android 단독 개발',period:'2026.07',status:'공모전 출품',theme:'water',featured:true,
  tags:['Next.js','TypeScript','Kotlin','Supabase'],summary:'저수율 숫자를 이해하기 쉬운 안내로. 웹과 Android를 공용 API 계약으로 연결하고, AI가 응답하지 않아도 안내가 이어지도록 설계했습니다.',
  metric:{value:'Web + App',label:'기획부터 양쪽 클라이언트 구현'},media:null,
  links:[{label:'웹 서비스 열기',href:'https://3rd-krc-ai-digital-web.vercel.app/'},{label:'GitHub에서 코드 보기',href:'https://github.com/indaegu/3rd-krc-ai-digital'},{label:'Android 릴리즈',href:'https://github.com/indaegu/3rd-krc-ai-digital/releases'}],
  sections:[
   {heading:'숫자를 보여주는 것과, 판단을 돕는 것은 다르다',body:['한국농어촌공사의 공공데이터를 바탕으로 지역 저수지의 사정과 앞으로의 흐름, 오늘 할 일을 알려주는 서비스를 만들었습니다. 제3회 KRC AI 디지털 혁신 공모전 출품작입니다.','고령 농업인이 읽기 쉬운 글꼴과 표현, 로그인 없는 진입을 우선했습니다. 숫자와 그래프만 보여주는 대신 사용자가 이해하고 행동할 수 있는 안내를 목표로 했습니다.']},
   {heading:'AI에게 모든 판단을 맡기지 않기',body:['단계와 수치, 허용할 행동은 서버가 결정하고 LLM은 표현을 담당하도록 책임을 나눴습니다. 생성 모델이 근거 없는 조언을 덧붙이지 않도록 응답 범위를 제한했습니다.','외부 모델 장애나 예산 초과 시에는 정적 코치로 대체합니다. 자체 예측은 참고 정보이며 공식 가뭄 예경보가 우선한다는 경계를 UI와 문서에 명시했습니다.']},
   {heading:'두 클라이언트, 하나의 계약',body:['Next.js 웹과 Kotlin / Jetpack Compose Android 앱을 하나의 모노레포에서 개발했습니다. OpenAPI를 공통 계약으로 두고 문서, 예시, 픽스처의 불일치를 CI에서 검사하도록 구성했습니다.','회원가입 없이 지역 설정을 기기에 보관하고, 주소 원문을 서버에 저장하지 않도록 설계했습니다. 통신이 끊기는 상황에서는 마지막 화면을 유지하도록 처리했습니다.']},
   {heading:'결과와 확인할 수 있는 자료',body:['웹과 Android 클라이언트를 단독으로 설계하고 구현했습니다. 서비스와 저장소, Android 릴리즈는 아래 링크에서 확인할 수 있습니다.','예측 모델은 시간 순서를 지킨 백테스트로 비교했습니다. 수치만 떼어내어 일반적인 정확도로 표현하지 않고, 평가 조건과 적용 범위를 함께 저장소에 남겼습니다.']},
  ],takeaway:'외부 AI가 없어도 핵심 기능이 남아 있어야 하고, 예측의 한계도 제품의 일부로 전달해야 합니다.'
 },
 {
  slug:'mydata-auth',index:'03',title:'서로 다른 인증을, 하나의 경험으로.',subtitle:'공공마이데이터 연동 및 전자서명 통합 인증',
  category:'실무 / 금융 경험',role:'Fullstack',period:'2026.04 ~ 2026.06',status:'운영 배포 완료',theme:'auth',featured:true,
  tags:['Vue 2','Spring Boot','WebView'],summary:'공동, 금융, 간편 인증서 경로를 공통 흐름으로 묶었습니다. 검증된 기존 모달은 보존하고 상품 화면의 반복 로직을 줄였습니다.',
  metric:{value:'3 → 1',label:'인증 경로의 사용자 흐름 통합'},media:null,
  sections:[
   {heading:'화면마다 복사하던 인증 흐름',body:['인증서 종류에 따라 서명과 처리 경로가 달라 여러 상품 화면에 같은 로직이 반복됐습니다. 공공마이데이터 연동도 고객의 상품 가입 흐름 안에서 이어져야 했습니다.','운영에서 검증된 인증 모달을 수정하면 다른 금융 흐름의 회귀 위험이 생깁니다. 원본의 동작을 보존하면서 호출부의 복잡도를 줄여야 했습니다.']},
   {heading:'원본을 고치는 대신, 경계를 설계하다',body:['기존 모달을 자식으로 렌더링하는 오케스트레이터 래퍼를 만들고, 부모 컴포넌트와의 계약을 한곳에 모았습니다. 상품 화면에는 열기 호출과 성공, 취소, 실패 이벤트만 노출했습니다.','중복 콜백 대응도 공통 영역에 모아 상품마다 같은 방어 로직을 복사하지 않도록 구성했습니다. 편의성과 검증 신뢰를 함께 고려하면서 화면과 서버의 책임을 정리했습니다.']},
   {heading:'복잡성은 내부에 모으고, 사용은 단순하게',body:['공동, 금융, 간편 인증서 3종 경로를 하나의 화면 흐름으로 통합하고 공공마이데이터 거래 4종의 연동을 운영 배포까지 완료했습니다.','기존 모달을 변경하지 않고 공통 흐름을 확장해, 외부 명세 변경 시 수정 지점을 집중시켰습니다. 개발 환경에서 자체 검증할 수 없는 잔여 사항은 관련 부서에 공유했습니다.']},
  ],takeaway:'검증된 코드를 보존하면서도, 그 바깥의 인터페이스는 더 단순하게 만들 수 있습니다.'
 },
 {
  slug:'sbom-platform',index:'04',title:'복잡한 의존성을, 읽을 수 있는 정보로.',subtitle:'SBOM 기반 오픈소스 취약점 관리 플랫폼',
  category:'사내 CoP / 팀 프로젝트',role:'6인 팀 팀장 / 프론트엔드 단독',period:'2026.04 ~ 진행 중',status:'진행 중',theme:'sbom',featured:true,
  tags:['React','Next.js','TypeScript','TanStack Query'],summary:'오픈소스 자산과 취약점을 한곳에서 파악하는 플랫폼. 프론트엔드 구조를 설계하고, 팀의 브랜치와 PR 규칙, 코드 리뷰를 운영하고 있습니다.',
  metric:{value:'6인 팀',label:'팀 리딩 및 프론트엔드 설계'},media:null,
  sections:[
   {heading:'흩어진 오픈소스 정보를 한 화면으로',body:['업무 외 사내 학습 모임(CoP)에서 진행 중인 프로젝트입니다. 수작업으로 추적하기 어려운 오픈소스 구성요소와 취약점 현황을 파악할 수 있는 플랫폼을 개발하고 있습니다.','SPDX, CycloneDX 형식의 SBOM을 기반으로 자산을 가시화하고, 취약점 데이터와 연결해 대응에 필요한 정보를 전달하는 구성을 목표로 합니다.']},
   {heading:'화면의 상태와 팀의 작업 방식을 함께 설계하기',body:['TypeScript와 Next.js 프론트엔드를 단독으로 설계하고 구현하고 있습니다. TanStack Query를 활용하는 서버 상태 동기화와 컴포넌트 구조를 담당합니다.','6인 팀의 팀장으로 브랜치 전략, 커밋과 PR 규칙, 마일스톤을 정하고 코드 리뷰를 운영합니다. 구현뿐 아니라 협업이 이어질 수 있는 기준을 만드는 역할입니다.']},
   {heading:'현재 범위',body:['프론트엔드 구조와 협업 프로세스를 담당하며 개발을 진행하고 있습니다. 취약점 DB 매칭, 영향도 분석과 자동 알림은 플랫폼의 주요 개발 범위입니다.','진행 중인 프로젝트이므로 운영 완료나 정량적인 대응시간 단축을 확정된 성과로 표기하지 않습니다. 구성요소 그래픽은 개념 표현이며 실제 사내 화면이 아닙니다.']},
  ],takeaway:'좋은 컴포넌트 구조와 좋은 협업 규칙은 모두, 다음 변경을 더 쉽게 만드는 기반입니다.'
 },
 {
  slug:'web-accessibility',index:'05',title:'보이는 화면 너머의 사용성을 개선하다.',subtitle:'스마트뱅킹 웹 접근성 개선',category:'실무 / 접근성',role:'Frontend',period:'2025.07 ~ 2025.08 / 2026.07',status:'심사 대응 완료',theme:'access',featured:false,
  tags:['Vue 2','WAI-ARIA','VoiceOver','TalkBack'],summary:'시각적 화면과 기존 동작을 유지하면서 상태 전달과 포커스 흐름을 개선하고, 실제 스크린리더로 주요 거래를 검증했습니다.',metric:{value:'2회',label:'연도별 웹 접근성 심사 대응'},media:null,
  sections:[{heading:'회귀 없이 의미를 전달하기',body:['외부 심사기관의 진단 결과를 해석해 스마트뱅킹 WebView 화면과 공통 컴포넌트를 개선했습니다. 운영 중인 화면의 CSS, 기존 동작과 API 계약을 유지해야 했습니다.','토글 상태 속성의 문자열 바인딩, 모달의 역할과 포커스 흐름, 장식 아이콘의 대체 텍스트를 정리했습니다. 반복되는 항목은 공통 컴포넌트에서 대응했습니다.']},{heading:'실제 탐색 흐름으로 검증하기',body:['iOS VoiceOver와 Android TalkBack에서 주요 거래 흐름을 확인했습니다. 2025년에 이어 2026년 7월 심사 대응도 완료하고 개선 기준을 팀에 공유했습니다.']}],
  takeaway:'접근성은 시각적인 화면의 완성 이후가 아니라, 의미와 상태를 설계하는 순간부터 시작됩니다.'
 },
 {
  slug:'backoffice',index:'06',title:'반복되는 요청을, 스스로 할 수 있는 기능으로.',subtitle:'운영자 페이지 자체개선',category:'실무 / 업무 효율',role:'Fullstack',period:'2026.02 ~ 진행 중',status:'1차 배포 / 추가 개선 중',theme:'admin',featured:false,
  tags:['Vue 2','Element UI','Spring Boot','PostgreSQL'],summary:'전 채널 공통 등록과 이용 지표 조회, 이미지 직접 삽입을 구현했습니다. 운영 지원 과정에서 발견한 반복 업무를 기능으로 전환합니다.',metric:{value:'3 → 1',label:'채널별 반복 등록을 한 번으로'},media:null,
  sections:[{heading:'요청서를 기다리지 않고 발견한 문제',body:['같은 공지와 팝업을 채널마다 등록하고, 지표 조회나 이미지 교체 때마다 개발자를 거치는 절차가 있었습니다. 현업이 직접 처리할 수 있는 기능으로 바꾸는 작업을 시작했습니다.','한 번 작성한 내용을 채널별 화면에 맞게 반영하는 구조, MAU/DAU 조회, 이미지 직접 삽입 기능을 추가했습니다. 1차 범위는 2026년 7월 운영 배포했고 이후 개선을 이어가고 있습니다.']},{heading:'공시 원문을 보존하는 데이터 전환',body:['분기별 공시를 코드와 JSON이 아닌 DB에서 관리하도록 전환했습니다. 41개 분기의 과거 데이터를 조사하고 이관하면서 원문 표기를 보존하는 모델을 선택했습니다.','화면에서 수치를 재계산하지 않고 이미 공시된 문자열과 일치시키는 것을 기준으로 삼았습니다. 매 분기 코드를 수정하는 작업을 데이터 등록으로 대체했습니다.']}],takeaway:'기능의 수보다, 다시 발생하지 않게 된 수동 작업이 더 직접적인 개선 지표일 수 있습니다.'
 },
 {
  slug:'mobile-id',index:'07',title:'구현 방식의 차이를, 운영의 차이로 읽다.',subtitle:'모바일 신분증 도입',category:'실무 / WebView',role:'Fullstack',period:'2025.09 ~ 2025.10',status:'운영 배포 완료',theme:'identity',featured:false,
  tags:['Vue 2','WebView','Spring Boot'],summary:'Web2App 방식을 제안하고 선임 검토 후 구현했습니다. OS별 브리지 차이를 맞추고, 이후 웹 중심으로 대응할 수 있게 구성했습니다.',metric:{value:'Web2App',label:'운영 대응을 고려한 방식 선택'},media:null,
  sections:[{heading:'개발 이후의 비용까지 비교하기',body:['모바일 신분증 도입 과정에서 네이티브별 개발과 앱 심사를 거치는 App2App 대신, 운영 유연성을 고려한 Web2App 방식을 제안했습니다. 선임 검토 후 채택돼 구현과 운영 배포를 맡았습니다.','iOS와 Android의 브리지 콜백 시점과 데이터 규격을 각 담당자와 조율했습니다. 한글 정규화처럼 WebView에서 드러나는 호환성 차이도 확인하고 대응했습니다.']},{heading:'경계는 협의하고, 화면은 일관되게',body:['이후 운영 변경을 웹 개발 중심으로 대응할 수 있는 구조를 확보했습니다. 구현 방식 선택의 기준을 초기 개발뿐 아니라 유지보수와 운영 대응 비용으로 설명했습니다.']}],takeaway:'좋은 방식은 지금 만들기 쉬운 것만이 아니라, 나중에 바꾸기 쉬운 것이어야 합니다.'
 },
 {
  slug:'incremental-refactoring',index:'08',title:'큰 변경을, 되돌릴 수 있는 크기로.',subtitle:'레거시 API 점진 리팩토링',category:'실무 / 유지보수',role:'Backend',period:'2026.01 ~ 진행 중',status:'진행 중',theme:'refactor',featured:false,
  tags:['Java','Spring Boot','MyBatis'],summary:'URL과 JSON 계약을 유지한 채 순수 로직부터 분리합니다. 동등성 비교와 롤백 경로를 먼저 마련하고 변경 범위를 작게 유지합니다.',metric:{value:'Step by step',label:'계약을 보존하는 점진적 이관'},media:null,
  sections:[{heading:'새 코드보다 먼저 만든 안전망',body:['약 2,000줄 규모의 컨트롤러에 비즈니스 로직과 채널 분기가 섞여 있었습니다. 운영 중단을 피하면서 구조를 개선하기 위해 전면 재작성 대신 점진적인 분리를 선택했습니다.','URL과 JSON 계약을 유지하고 유틸과 생성기 등 순수 로직부터 추출합니다. 이관 전후 정상 거래 응답을 비교하고 되돌릴 수 있는 경로를 확보한 뒤 다음 범위로 진행하고 있습니다.']}],takeaway:'리팩토링의 안전성은 변경 뒤의 확신이 아니라, 변경 전의 비교와 복구 계획에서 나옵니다.'
 },
 {
  slug:'service-operations',index:'09',title:'운영에서 배우고, 다음 반복을 없애다.',subtitle:'스마트뱅킹 상시 운영과 제휴 연동',category:'실무 / 운영과 협업',role:'Fullstack',period:'2024.11 ~ 현재',status:'상시 운영',theme:'admin',featured:false,
  tags:['Vue 2','JSP','Spring Boot','기술 문서화'],summary:'신규 금융 서비스와 정책 변경을 반영하고, 제휴 규격의 불일치를 오픈 전에 조정합니다. 반복되는 함정은 팀의 문서와 공통 기준으로 남깁니다.',metric:{value:'End to end',label:'요건부터 운영까지 이어지는 책임'},media:null,
  sections:[{heading:'기능을 넘어서 서비스의 맥락까지',body:['안심차단 비대면 신청, 금리인하요구권 신청 등 신규 서비스와 정책 대응을 화면부터 서버 연동까지 담당했습니다. 솔루션사와 직접 규격을 조율하고 운영 과정의 문제를 추적했습니다.','제휴사가 인지한 진입 URL과 실제 운영 규격의 차이를 오픈 전에 확인했습니다. 기존 연동 현황과 환경별 규칙을 함께 정리해 상대와 같은 계약을 바라보도록 조정했습니다.']},{heading:'해결한 맥락을 팀에 남기기',body:['예외 처리, 라우터 가드, 빌드 설정에서 반복되는 이슈를 문서화했습니다. 회의록, 아키텍처 문서와 신입 온보딩 문서를 관리하며 개인의 문제 해결이 팀의 자산으로 이어지도록 합니다.']}],takeaway:'문제를 해결한 코드와 함께, 그 결정을 다시 이해할 수 있는 맥락을 남깁니다.'
 },
];
export const principles = [
 {number:'01',title:'원인부터 좁힙니다.',body:'현상을 도구 탓으로 돌리기 전에 동작 원리를 확인합니다. 바꿀 수 없는 조건과 바꿔야 할 원인을 구분합니다.',project:'build-performance',link:'빌드 최적화 사례'},
 {number:'02',title:'경계에서 멈추지 않습니다.',body:'화면에서 서버, 네이티브, 외부 연동까지 맥락을 따라갑니다. 담당 경계보다 사용자의 전체 흐름을 먼저 봅니다.',project:'mydata-auth',link:'인증 통합 사례'},
 {number:'03',title:'다음 변경을 쉽게 만듭니다.',body:'반복되는 코드는 공통 구조로, 반복되는 질문은 문서로 남깁니다. AI의 결과도 직접 설명하고 검증하며 사용합니다.',project:'sbom-platform',link:'설계와 협업 사례'},
];
