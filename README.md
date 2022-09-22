# MILTY(장병 근무 관리 웹 플랫폼)
![MILTY](https://user-images.githubusercontent.com/88999549/191758736-7b93192f-78c8-4e2f-8229-b41c2f27aa8e.jpg)



# 프로젝트 소개
장병들의 근무(위병소, 불침번, CCTV, 당직사관(사령), 당직/상황병 근무 등)을 효율적으로 만들고 관리해주는 WEB 플랫폼입니다. MILTY WEB 플랫폼 안에서 장병들의 근무를 실시간으로 확인하며 근무 변경할 때도 MILTY WEB을 통해 근무 변경을 할 수 있습니다. 프로젝트명은 Military Duty를 줄여서 MILTY(밀티)라고 정했습니다.

평소에 장병들이 경계작전명령서를 작성할 때 많은 시간과 노력이 필요로 합니다. 그리고 장병들도 오늘의 근무가 무엇인지 확인하기 위해 직접 경계작전명령서가 걸려있는 게시판에 가서 확인해야 합니다. 또한 근무를 불가피하게 다른 장병과 바꿔야 하는 경우가 생긴다면 바꿀 근무의 대상 장병과 근무를 관리하는 장병을 찾아가서 동의를 구해야 할 뿐만 아니라 근무를 매일 확인해야 하는 장병(ex. 상황병, 당직병 등)에게도 근무 교체 했다는 것을 알려줘야 하는 등 번거로운 상황이 자주 발생합니다. 따라서 이러한 문제를 해결하고자 이번 프로젝트를 기획하기로 했습니다.



# 기능 설명
* 처음 로그인 할 때 보안을 위해 해당 부대 관리자의 승인이 필요합니다. 해당 부대 관리자의 승인이 되면 로그인 할 때 아이디는 군번, 비밀번호는 생년월일(추후에 비밀번호 변경 가능), 부대 코드를 이용하여 로그인 할 수 있습니다.
 
* 대시보드에 자신의 어제, 오늘, 내일 근무가 무엇인지, '당직사관(사령), 당직병, 상황병'이 누구인지, 이번 달에 들어간 근무 횟수, 그리고 자신에게 들어온 근무 변경 요청 상황을 확인할 수 있습니다.
 
* 해당 기간의 장병의 근무를 작성할 때 '자동 작성'이라는 기능을 이용해 모든 장병들의 근무 들어가는 횟수가 서로 최대한 같게 만들도록 자동으로 작성해줍니다.
 
* 근무 작성 기준은 설정에서 정할 수 있습니다. 예를 들어 각 부대에 따른 근무 시간대나 사수, 부사수, 근무 열외자(ex. 휴가자, 신병 보호 기간인 병사 등)는 그 부대 근무 관리자가 설정 탭에 들어가서 설정 할 수 있습니다. 또한 병사에서 각 보직에 따라 투입할 수 있는 근무 시간대을 설정할 수도 있습니다.(ex. 운전병은 야간 근무 투입 X, 의무병은 응급 상황 대비하기 위해 위병소 투입 X)
 
* 해당 기간 동안 근무를 섰던 횟수를 나타내어 서로 공평하게 근무를 서고 있는지 숫자와 차트로 확인할 수 있습니다. (ex. 한 달 동안 가 장병들의 근무를 했던 횟수를 counting 함에 따라 자신이 각 근무를 한 달에 어느정도 들어갔는지, 다른 장병과 비교해서 공평하게 근무 투입되었는지 확인할 수 있습니다.)
 
* '수동 작성'을 이용해서 처음부터 수동으로 근무를 작성할 수 있거나 '자동 완성'으로 만든 근무에서도 추가로 수정할 수 있습니다.
 
* 부득이하게 근무를 다른 장병과 바꿔야 하게 된다면 '근무 변경 요청' 기능을 이용해 바꿀 장병의 근무를 선택 후 근무 교체를 할 수 있습니다. 여기서 '교체할 근무에 해당되는 장병'과 '근무 관련 관리하는 장병'에게 이 알림이 전송이 되며 두 명 전부 다 근무 변경 수락을 해야 Web에서 자동으로 근무 교체해줍니다.
 
* Web 플랫폼 자체 내에서 이 Web에 대한 평가을 줄 수 있고, 개선할 사항이나 각 부대의 또다른 특수 근무가 있다면 이러한 내용을 관리자에게 즉시 Web에서 전송할 수 있습니다. 받은 피드백을 토대로 관리자가 Web 점검을 하면서 반영할 것입니다.


# 컴퓨터 구성 / 필수 조건 안내 (prerequisites)

* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상


# 기술 스택 (Technique Used)
<h3>Server(back-end)</h3>

* JavaScript(TypeScript), Node.js
* Express 프레임워크
* Maria DB(Sequelize orm 사용하여 Node.js와 Express랑 연동할 예정)
 
<h3>Front-end</h3>

* Html, Css, JavaScript(TypeScript)
* React.js
* React UI Library


# 설치 안내 (Installation Process)
```
$ git clone git주소
$ yarn or npm install
$ yarn start or npm run start
```


# 프로젝트 사용법 (Getting Started)
공백


# 팀 정보 (Team Information)
* 김재준 (jkimkr08@gmail.com), Github Id: jaeiko
* 권종원 (ty_ty123@naver.com), Github Id: kwonjongwon123
* 이순형 (tnsgud9@naver.com), Github Id: tnsgud9
* 한동현 (hando1220@naver.com), Github Id: asitisdev
* 하승종 (hippo0419@daum.net), Github Id: hippo0419
* 김민철 (kminchul95@naver.com), Github Id: nyan101


# 저작권 및 사용권 정보 (Copyleft / End User License)

* MIT

This project is licensed under the terms of the MIT license.
