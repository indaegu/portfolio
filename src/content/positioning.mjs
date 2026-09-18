/** Main-page emphasis; project facts and summaries live in portfolio.mjs. */
import {projects} from './portfolio.mjs';
export const headline = ['“원래 이렇게 해요”를', '그냥 넘기지 않는 개발자', '성창민입니다.'];
export const featuredOrder = ['build-performance', 'mydata-auth', 'sbom-platform', 'mulsigye'];
export const projectHighlights = Object.fromEntries(projects.map(({slug, summary}) => [slug, summary]));
export const strengths = [
 {number:'01', title:'빌드가 왜 느린지부터 확인했습니다.', body:'풀빌드에 5분대가 걸렸습니다. Webpack이 탐색하는 모듈 범위를 정리해 기존 라우팅을 유지하면서 1분대로 줄였습니다. 약 80% 단축한 셈입니다.', project:'build-performance', link:'Webpack 빌드 개선 보기'},
 {number:'02', title:'인증 화면과 서버를 함께 맡았습니다.', body:'상품 화면마다 반복하던 인증 처리를 공통으로 묶었습니다. 운영 중인 인증 모달은 그대로 두고 바깥에 래퍼를 만들었습니다. 공공마이데이터 연동도 화면부터 서버까지 담당했습니다.', project:'mydata-auth', link:'인증 통합 사례 보기'},
 {number:'03', title:'같은 내용을 세 번 등록하지 않도록', body:'공지와 팝업을 채널마다 등록하던 작업을 한 번으로 줄였습니다. 공시 데이터 41개 분기도 DB로 옮겨, 분기마다 코드를 수정하지 않고 등록할 수 있게 했습니다.', project:'backoffice', link:'운영자 페이지 개선 보기'},
];
