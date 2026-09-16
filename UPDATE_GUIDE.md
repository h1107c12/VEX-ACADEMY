# VEX Academy 전체 오더 반영본 (2차 업데이트)

## 적용 방법
압축을 해제하고 아래 변경 파일을 기존 프로젝트의 같은 경로에 덮어쓰세요. 신규 파일도 함께 복사합니다. 이전 수정본 적용 여부와 관계없이 사용할 수 있습니다.

기존 프로젝트의 `.env`, `.git`, node_modules는 유지하세요. 패키지 추가나 버전 변경은 없습니다. 신규 환경에서는 npm ci를 실행하세요.

```sh
npm run dev
npm run build
```

실제 홈페이지 반영에는 기존 방식의 배포가 필요합니다.

## 변경 파일
- src/App.tsx
- src/components/common/AdmissionsLink.tsx
- src/components/sections/AboutSection.tsx
- src/components/sections/CTASection.tsx
- src/components/sections/CurriculumSection.tsx
- src/components/sections/MOUSection.tsx
- src/components/sections/ProgramSection.tsx
- src/components/sections/UniversitySection.tsx
- src/data/gameData.ts
- src/main.tsx
- src/styles/academy-actions.css
- src/styles/curriculum.css
- src/styles/mou.css
- src/styles/university.css

## F. 커리큘럼-교육과정
- 소개 → 교육과정 → 대학 진학 지원 → 하단 신청하기 순서로 정리했습니다.
- PUBG 프로게이머 과정과 취미 · 실력향상 과정에 전달받은 본문을 모두 반영했습니다.
- 과정명은 각 카드에 한 번만 표시합니다. 번호와 PUBG반 배지로 구분합니다.
- 기존 ProgramSection의 별도 지원자격·운영 방향 노출을 없애고 커리큘럼으로 통합했습니다.
- 반복되던 WHY VEX 설명과 사용하지 않는 program/reasons 데이터를 제거했습니다.
- 기존 ProgramSection 파일은 이전 import 호환용 재내보내기만 남겼습니다. App에서는 CurriculumSection을 한 번만 렌더링합니다.
- 기존 program.css / cta.css의 전역 import를 제거했습니다. 파일은 호환을 위해 남아 있으며 새 화면에서는 사용하지 않습니다.
- 대학 지원의 상담 / 실기 / 포트폴리오 / 컨설팅은 네 카드로 정리하고 본문에서 동일 나열을 줄였습니다.
- 맨 아래 신청하기는 기존 Google Forms 수강 신청서로 연결됩니다.

## G. VEX MOU 대학교 입학 신청
- 대학 진학 안내와 첫 화면의 대학 로고 아래에 입학 신청 버튼을 추가했습니다.
- 버튼 링크: https://open.kakao.com/o/smAEavei
- 외부 링크는 새 창으로 열립니다. 링크 추가 작업이며 메시지 전송이나 신청은 수행하지 않았습니다.
- VIEW MORE +는 외부 링크가 아닌, 홈페이지 내 MOU 대학 로고 영역으로 이동합니다.
- MOU 영역의 기존 6개 대학 로고를 유지했습니다.

## 디자인과 종목 대응
- 기존 어두운 배경과 블루·퍼플 계열에 맞춘 카드, 얇은 테두리, 은은한 그라데이션을 적용했습니다.
- 과정 카드에는 번호·종목 배지·아이콘·특징 태그를 적용했습니다.
- 대학 안내에는 항목별 아이콘과 지원 카드, 기능이 구분되는 VIEW MORE / 입학 신청 버튼을 적용했습니다.
- 작은 화면에서는 세로 배치와 넓은 버튼을 사용합니다. 키보드 초점 표시와 동작 줄이기 설정도 반영했습니다.
- 발로란트 선택 시 해당 종목 문구와 붉은색·퍼플 테마가 표시됩니다. 공통 소개와 수강 신청 화면의 PUBG 고정 문구도 정리했습니다.
- PUBG 전용 프로팀 테스트 문구를 발로란트 과정에 임의로 확장하지 않았습니다.

## 추후 수정 위치
- 과정별 본문: src/data/gameData.ts → curriculum.courses
- 대학 지원 문구: src/components/sections/UniversitySection.tsx
- 대학 입학 신청 링크: src/components/common/AdmissionsLink.tsx
- 일반 수강 신청 링크: src/data/gameData.ts → applyUrl
- 공통 버튼·하단 신청 영역: src/styles/academy-actions.css

## 참고 소스
확인일: 2026-09-16

요청된 참고 홈페이지: https://geec.honam.ac.kr/#
확인 가능한 공식 페이지: https://mgeec.honam.ac.kr/Gallery/1/read/718
보조 공식 안내: https://mgeec.honam.ac.kr/PressRelease/20/read/785

홈페이지 직접 접속은 시간 초과가 발생했으나, 공식 모바일 도메인의 검색 도구 반환 본문에서 GE 교육과정의 프로게이머 / 온라인 / 생활취미 소개 및 VIEW MORE 구성을 확인했습니다. 교육과정을 목적별로 소개하는 구조를 참고해 VEX의 두 과정에 맞게 재구성했습니다. 타 사이트 HTML·CSS·이미지나 문구를 그대로 복제한 결과는 아닙니다.


## 검증
- TypeScript 검사: 통과
- 변경 TS/TSX 파일 ESLint: 통과
- Vite 프로덕션 빌드: 통과
- React 정적 렌더링 검사: PUBG 요청 본문, 두 종목의 문구 분리, 네 가지 대학 지원 항목, 대학 로고 6개, 카카오톡 링크, 수강 신청 링크 확인
- 실제 브라우저 시각 확인과 클릭·스크롤 검증은 브라우저 설치 제한으로 수행하지 못했습니다.

적용 후 PC·모바일에서 Academy를 열어 두 과정을 확인하고, VIEW MORE +로 로고 영역 이동 / 대학 신청으로 카카오톡 연결 / 하단 신청하기로 수강 신청서 연결을 확인하세요. 발로란트 전환 시 종목별 문구와 색상도 확인하세요.
