# AcaManager – 학원 관리 시스템

중·고등 입시 학원을 위한  
**학생 학습 관리 + 교직원 관리 + 학부모 커뮤니케이션** 통합 시스템

<details>
<summary><b><h2>1. 프로젝트 개요</b></summary>

### 1.1 프로젝트 명
**AcaManager**

### 1.2 프로젝트 목적
본 프로젝트는 중·고등 입시 학원을 대상으로  
학생 학습 관리, 교직원 관리, 학부모 커뮤니케이션을 **하나의 시스템으로 통합**하는 것을 목표로 한다.

기존 학원 운영 방식의 문제점인 다음 항목들을 시스템적으로 해결한다.

- 수기 / 엑셀 / 메신저 기반의 분산 관리
- 출결·과제·테스트 관리 누락
- 학부모 커뮤니케이션의 비효율
- 조교 근무 및 급여 관리의 불투명성

</details>

<details>
<summary><b><h2>2. 기획 배경 및 필요성</b></summary>

### 2.1 기존 문제점

#### 학생 관리의 파편화
- 출결: 수기 관리
- 과제 / 테스트: 교사 개인별 관리
- 학부모 안내: 카카오톡 수동 작성

#### 조교 관리의 비효율
- 근무 시간 수기 작성
- 급여 계산 오류 및 분쟁 가능성

#### 학부모 신뢰도 저하
- 학습 진행 상황 공유 부족
- 결석 / 보강 안내 지연

### 2.2 해결 방안
본 시스템은 다음을 제공한다.

- 학생 학습 데이터의 구조화 및 누적 관리
- 수업 종료 후 자동 학습 리포트 발송
- 조교 근무 및 급여의 투명한 관리
- 학원 내부 커뮤니케이션의 시스템화

</details>



<details>
<summary><b><h2>3. 사용자 및 권한(Role) 정의</b></summary>

### 3.1 전체 Role 구조

| Role | 설명 |
|---|---|
| ADMIN | 시스템 관리자 (서버/시스템 운영) |
| MASTER_TEACHER | 학원 원장, 전체 관리 |
| TEACHER | 담당 교사, 수업 책임자 |
| SUB_TEACHER | 조교, 학생 실무 관리 |
| STUDENT | 학생 (관리 대상) |
| PARENT | 학부모 (알림 수신) |

### 3.2 권한 계층 구조
ADMIN  
└ MASTER_TEACHER  
└ TEACHER  
└ SUB_TEACHER  


</details>

<details>
<summary><b><h2>4. WBS</b></summary>
    
[WBS](https://docs.google.com/spreadsheets/d/13bBhfvNyAx6Vv0_oIb2T18Mjv9yCGqABUHgHX-24H8c/edit?gid=0#gid=0)


</details>

<details>
<summary><b><h2>5. 요구사항 명세서</b></summary>
    
[요구사항 명세서](https://docs.google.com/spreadsheets/d/1AxbfO2X1UeemGQjrTqY9xi-pELPIFQw9JddZeZI_EAY/edit?gid=0#gid=0)
<img width="1346" height="1093" alt="image" src="https://github.com/user-attachments/assets/f30b894e-7c73-4717-845a-58ff8d4213c3" />


</details>


<details>
<summary><b><h2>6. 주요 기능 상세</b></summary>

### 6.1 학생 관리 기능 (핵심 도메인)

**관리 항목**
- 기본 정보: 이름, 학교명
- 연락처: 학생 / 학부모
- 재원 상태: 재원 / 전원 / 퇴원
- 수강 정보: 수업, 반
- 출결 이력
- 과제 수행도 (A/B/C)
- 테스트 점수
- 클리닉 일정
- 결석 시 영상 보강 여부

**특징**
- 모든 학습 데이터는 학생 단위로 누적 관리
- 전원 / 퇴원 후에도 데이터 보존


### 6.2 수업 및 출결 관리

**수업 관리**
- 강좌 / 반 생성
- 담당 교사 지정
- 일정 및 교실 관리

**출결 관리**
- 출결 상태: 출석 / 결석 / 지각
- 결석 시 자동 영상 보강 대상 지정
- 보강 영상 시청 여부 기록


### 6.3 과제 및 테스트 관리

**과제**
- 수업별 과제 등록
- 학생별 수행도 평가 (A/B/C)

**테스트**
- 수업별 테스트 관리
- 학생별 점수 기록
- 주간 학습 리포트 자동 반영


### 6.4 학부모 커뮤니케이션 (핵심 가치)

- 주간 학습 리포트 자동 발송
- 출결 + 과제 + 테스트 데이터 기반
- 템플릿 기반 자동 메시지 생성
- 수업 종료 후 또는 주 1회 발송
- 발송 이력 저장

**추가 발송 기능**
- 교재비 청구 안내
- 결석 / 보강 안내
- 공지사항

### 6.5 조교 근무 및 급여 관리

**근무 시간 관리**
- SUB_TEACHER 직접 입력
- TEACHER 승인 구조

**급여 관리**
- 시간당 급여 설정
- 월별 근무 시간 자동 집계
- 급여 지급 여부 관리


### 6.6 내부 채팅 기능

**목적**
- TEACHER ↔ SUB_TEACHER 간 업무 커뮤니케이션

**특징**
- 수업 / 학생 맥락 기반 채팅
- 메시지 이력 저장

</details>


<details>
<summary><b><h2>7. 비기능 요구사항</b></summary>

### 7.1 보안
- JWT 기반 인증
- Role 기반 접근 제어
- 민감 정보 암호화

### 7.2 안정성
- 메시지 발송 실패 이력 관리
- Soft Delete 기반 데이터 보존

### 7.3 확장성
- STUDENT / PARENT 기능 확장 가능
- 모바일 앱 연동 고려

</details>

<details>
<summary><b><h2>8. 기술 스택</b></summary>
    
### BACKEND


<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> <img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Java 21](https://img.shields.io/badge/Java%2021-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
<img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> <img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">



### FRONTEND
 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white">

<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">


### DATABASE

![redis](https://github.com/user-attachments/assets/df929d81-ce2f-4853-97fd-cdf7bf45907e) ![mariadb](https://github.com/user-attachments/assets/19a0ad09-804d-4303-80bd-32cafdae0e6f)


### API
<img src="https://img.shields.io/badge/apidog-FE4F19?style=for-the-badge&logoColor=white">


### IDE

![intellij](https://github.com/user-attachments/assets/25d426ed-e30e-4619-9968-11375adba8b9)
<img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

### DEVOPS

<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">

<img src="https://img.shields.io/badge/Amazon%20ECS-FF9900?style=for-the-badge&logo=amazonecs&logoColor=white">

<img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">

<img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">

<img src="https://img.shields.io/badge/Amazon%20CloudFront-8C4FFF?style=for-the-badge&logo=amazoncloudfront&logoColor=white">



</details>

<details>
<summary><b><h2>9. 시스템 아키텍처</b></summary>
  
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/993c7fc7-22e6-406b-b0d3-2148e4193211" />



</details>

<details>
<summary><b><h2>10. ERD</b></summary>
  
[ERD](https://www.erdcloud.com/d/Rr2AjnfmAGMGRGuNo)
<img width="4190" height="2872" alt="AcaManager (3)" src="https://github.com/user-attachments/assets/c490594b-11d1-4793-a7fe-8d7915e93e7d" />


</details>

<details>
<summary><b><h2>11. 화면 설계서</b></summary>
  
[화면 설계서](https://graph-crate-93709241.figma.site/)

</details>


  
<details>
<summary><b><h2>12. 기대 효과</b></summary>

- 관리자 / 교사의 행정 업무 감소
- 학부모 만족도 및 신뢰도 향상
- 학습 데이터 기반 관리 가능
- 학원 운영의 표준화

</details>


