# Eisenhower Matrix

아이젠하워 매트릭스 기반 할일 관리 시스템입니다.
Spring Boot 백엔드와 React 프론트엔드로 구성된 풀스택 프로젝트입니다.

<br>

## 💡 만들게 된 이유

할일 관리 앱을 쓰면서 단순 목록 관리보다 **우선순위를 시각적으로 파악**하고 싶었습니다.
아이젠하워 매트릭스(긴급/중요 4분면)를 직접 구현해보며 Java Spring Boot를 학습했습니다.

<br>

## 📸 스크린샷

### 홈 화면
> <img width="377" height="664" alt="Image" src="https://github.com/user-attachments/assets/efa77421-99e7-46db-be4e-9dea60dc0472" />

### 로그인
> <img width="377" height="664" alt="Image" src="https://github.com/user-attachments/assets/f6d2594b-815a-4e10-8f65-f008b3d8bd98" />

### 토픽 목록
> <img width="377" height="664" alt="Image" src="https://github.com/user-attachments/assets/ee60099b-7a5f-498c-8cc1-62c5f5412a76" />
> <img width="377" height="664" alt="Image" src="https://github.com/user-attachments/assets/08fd5cdb-a298-42f0-8f22-018b19d51288" />
> <img width="377" height="664" alt="Image" src="https://github.com/user-attachments/assets/125f1f9b-bfd5-41a0-8f10-42f8fea1cbed" />

### 4분면
> <img width="1039" height="735" alt="Image" src="https://github.com/user-attachments/assets/5f7e825e-239c-4df3-9e2b-09146aeb8b6c" />
> <img width="374" height="664" alt="Image" src="https://github.com/user-attachments/assets/6abcb629-1a56-445a-b691-3a28caebbcbc" />
> <img width="374" height="664" alt="Image" src="https://github.com/user-attachments/assets/07ed8395-818a-4bb8-8e88-429a12982e45" />

<br>

## 🛠 기술 스택

**Backend**
- Java 21
- Spring Boot 3.5.x
- MyBatis
- MySQL 8.x

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

<br>

## ⚙️ 주요 기능

### 인증
- 세션 기반 로그인 / 로그아웃
- 회원가입 (BCrypt 비밀번호 암호화)
- HandlerInterceptor 기반 인증 체크
- 같은 화면에서 로그인/회원가입 전환 (페이지 이동 없음)

### 토픽
- 토픽 CRUD
- 토픽별 색상 자동 배정
- 토픽 삭제 시 하위 할일 자동 삭제 (ON DELETE CASCADE)

### 아이젠하워 매트릭스
- 4분면 구조 (DO / SCHEDULE / DELEGATE / ELIMINATE)
- 할일 CRUD
- 완료 상태 토글
- 분면별 할일 필터링

### 보안
- 세션 기반 인증
- DB 레벨 권한 체크 (user_id 조건)
- BCrypt 비밀번호 해싱 (Salt 자동 포함)
- CORS Preflight OPTIONS 예외 처리

<br>

## 🗂 프로젝트 구조

```
todo/
├── backend/                        # Spring Boot
│   └── src/main/java/com/example/todo/
│       ├── config/                 # 인터셉터, WebMVC, 전역 예외처리
│       ├── constant/               # 상수 (SessionConst)
│       ├── controller/             # 요청 처리
│       ├── service/                # 비즈니스 로직
│       ├── mapper/                 # MyBatis Mapper
│       ├── dto/                    # 요청/응답 객체
│       ├── domain/                 # DB 매핑 객체
│       └── utils/                  # PasswordUtils, SessionUtils
└── frontend/                       # React + TypeScript
    └── src/
        ├── api/                    # axios 설정, 타입 정의
        ├── pages/                  # 화면 컴포넌트
        └── App.tsx                 # 라우팅
```

<br>

## 🗄 ERD

```
user
├── user_id (PK)
├── login_id
├── password (BCrypt 해시)
└── username

topic
├── topic_id (PK)
├── user_id (FK → user)
└── title

todo
├── todo_id (PK)
├── topic_id (FK → topic, ON DELETE CASCADE)
├── user_id (FK → user)
├── title
├── content
├── quadrant (1:DO / 2:SCHEDULE / 3:DELEGATE / 4:ELIMINATE)
├── is_done (0:미완료 / 1:완료)
└── created_at
```

<br>

## 🚀 실행 방법

### 사전 준비
- Java 21 이상
- MySQL 8.x
- Node.js 18 이상

### 백엔드 실행

```bash
# 1. 저장소 클론
git clone https://github.com/{username}/todo.git

# 2. DB 생성
mysql -u root -p
CREATE DATABASE todo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 3. application.yml 설정
cp backend/src/main/resources/application.yml.example \
   backend/src/main/resources/application.yml
# application.yml에 DB 정보 입력

# 4. 실행
cd backend
./gradlew bootRun
```

### 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

> `frontend/src/api/axios.ts` 에서 baseURL을 서버 주소에 맞게 변경하세요.

<br>

## 📌 트러블슈팅

### 1. BCrypt vs SHA-256
**문제** 기존 SHA-256은 Salt가 없어 Rainbow Table 공격에 취약

**해결** jbcrypt 라이브러리로 BCrypt 적용. Salt 자동 포함으로 같은 비밀번호도 매번 다른 해시값 생성

---

### 2. CORS Preflight 요청 차단
**문제** Flutter/React에서 POST 요청 전 브라우저가 보내는 OPTIONS 요청을 인터셉터가 401로 차단

**해결** 인터셉터에서 OPTIONS 메서드 예외 처리

```java
if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
    return true;
}
```

---

### 3. MyBatis 동적 쿼리 미적용으로 수정 시 데이터 유실
**문제** 수정 시 전송하지 않은 필드가 null로 덮어씌워지는 버그

**해결** `<set>` + `<if>` 동적 쿼리로 null인 필드는 UPDATE 제외

---

### 4. 토픽 삭제 시 하위 할일 미삭제
**문제** 토픽 삭제 시 해당 토픽의 할일이 남아있는 문제

**해결** DB 레벨에서 `ON DELETE CASCADE` 적용

```sql
FOREIGN KEY (topic_id) REFERENCES topic(topic_id) ON DELETE CASCADE
```

---

### 5. isDone 타입 불일치
**문제** 백엔드에서 Boolean으로 오는데 프론트에서 number(0/1)로 비교해 체크박스가 동작하지 않는 버그

**해결** TypeScript 타입을 `boolean`으로 통일하고 비교 로직 수정

---

### 6. React HMR 자동 반영 안 됨
**문제** 코드 저장 시 브라우저에 자동 반영이 안 되는 문제

**해결** VS Code Auto Save 설정을 `off`로 변경 후 수동 저장(`Cmd+S`)으로 해결

<br>

## 📅 개발 기간

2026.05 · 개인 프로젝트
