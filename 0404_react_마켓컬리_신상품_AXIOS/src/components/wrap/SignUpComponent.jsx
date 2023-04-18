import React from 'react';
import axios from 'axios';
import $ from 'jquery';


//내부와 섞이는걸 방지하기위해 회원가입,timer로 넣은 => 원래는 중괄호없이 props=>({안에 넣어})
export default function SignUpComponent({회원가입, timer,timerCounterfn,mapAddressFn}) {
    //상위컴포넌트(wrap) 프롭스
    const {setId,minutes,seconds,msg,isEnd} = timer;

    const [state, setState] = React.useState(회원가입);
    //const createRef = React.createRef(); // 입력상자 태그요소 휴대폰을 선택함.(참조함)
    const createRef = React.useRef(); // 입력상자 태그요소 휴대폰을 선택함.(참조함)
    //useRef-> 새로고침 해야만 증가값 보인다.
    //useRef-> 새로고침해도 증가값이 유지된다.

    //state-> 상태변수 새로고침하면 새로 시작 초기화
    //state-> 상태변수 변경되면 화면이 다시 그려진다. ===>마운트된다.
    // let cnt = React.useRef(0); // 입력상자 태그요소 휴대폰을 선택함.(참조함)


    //타이머 카운트 점검 : 유효시간 만료 istimeend 변수 만들어서 true false  해도 가능
    React.useEffect(()=>{
          
            setState({
                ...state,
                isConfirmModal:isEnd, //모달 오픈 변수
                confirmModalMsg:msg //모달 메세지 변수
            })
        

    },[isEnd]); //false 에서 true 로 변경 시점에 실행


    //1.아이디 입력상자 onChange 이벤트
    const onChangeUserId=(e)=>{ 

        //입력제한조건 
        //정규표현식만들기
        //1.특수문자 입력즉시 삭제  ==> \- \] \\ 이스케이프 문자처리!!! replace()
        //2.6자 ~ 16자 이하 test()
        //3.한글 사용 불가 test()
        //4.영문 필수,숫자선택=>1가지 이상 영문 ,숫자 조합 test()
        //5.공백사용안됨 test()
        //툭수문자 \\는 2번써야지 문자로 표현

        const {value} = e.target;  // 비구조화 === 구조분할할당
        const regEx1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;   //특수문자
        const regEx2 = /^(.){6,16}$/g;   //6자 이상 16자 이하
        const regEx3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;   // 한글 
        const regEx4 = /[A-Za-z]+[0-9]*/g;   // 영문필수 1자이상 +,  숫자선택 0자이상 *
        const regEx5 = /\s/g;   // 공백

        let 아이디 = '';
        let isIdError = false;
        let errorMsg = '';

        //1)문자열.replace(정규식,'바꿀문자열'); //특수문자를 공백으로 치환 //특수문자이면  true 아니면 false
        아이디 = value.replace(regEx1,'');
         //console.log(regEx1.test(value)); 

        //2)테스트 정규식.test(문자열) {6,16} 범위이면 true 아니면 false
        //3)테스트 정규식.test(문자열) 한글사용하면 true 아니면 false
        //4)테스트 정규식.test(문자열) 영문필수 이상+,   숫자선택0자이상 *  
        //5)테스트 정규식.test(문자열) 공백 사용 불가 
        if(regEx2.test(value) ===false || regEx3.test(value)===true || regEx4.test(value)===false ||regEx5.test(value)===true ){
            //console.log('6자이상 16자 이하로 입력해주세요');
            errorMsg='6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
            isIdError=true;
        }
        else{
            //console.log('정상입니다');
            errorMsg='';
            isIdError=false;

        }

        setState({
            ...state,
            아이디:아이디,
            isIdError:isIdError,
            errorMsg:errorMsg

        })
    }
     
    //2.아이디 중복확인버튼 onClick 이벤트
    const onClickUserIdOk=(e)=>{
        e.preventDefault();
        const value = state.아이디;  // 상태관리 값 변수에 대입
        const regEx1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;   //특수문자
        const regEx2 = /^(.){6,16}$/g;   //6자 이상 16자 이하 시작 끝 지정해야 정확함.
        const regEx3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;   // 한글 
        const regEx4 = /[A-Za-z]+[0-9]*/g;   // 영문필수 1자이상 +,  숫자선택 0자이상 *
        const regEx5 = /\s/g;   // 공백

        if(regEx2.test(value) ===false || regEx3.test(value)===true || regEx4.test(value)===false ||regEx5.test(value)===true ){
            setState({
                ...state,
                isConfirmModal:true,
                confirmModalMsg:'6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합'
            })
        
        }
        else{
            //아이디 중복검사 실시
            //가져오는 방법은 REST API 사용 AJAX 또는  AXIOS  JSON데이터 처리에 가장 적합한 패키지
            //서버에서 DB에 저장된 아이디 데이터를 가져온다.
            //서버사이드 스크립트 언어가 MYSQL SQL명령문 이용 가지고 온다.
            //그리고 입력된 아이디랑 비교한다.
            //정보요청  Request 

            axios({
                url:'http://luck1409.dothome.co.kr/signup_db/select.php',
                method: 'GET'
            })
            .then((res)=>{
                
                console.log( res );
                console.log( res.data );

                // 맵함수이용 화살표함수 중괄호 빼고 사용하면
                // 비교 결과 true, false 배열로 곧바로 리턴 값

                const result = res.data.map((item)=>item.아이디===state.아이디);
                console.log( result );
                // result[false, false, false, true, ......]
                if( result.includes(true) ){
                    setState({
                        ...state,
                        isIdOk: false,
                        isConfirmModal:true,
                        confirmModalMsg:'사용 불가능한 아이디 입니다.'
                    })
                }
                else{
                    setState({
                        ...state,
                        isIdOk: true,
                        isConfirmModal:true,
                        confirmModalMsg:'사용 가능한 아이디 입니다.'
                    })
                }
            })
            .catch((err)=>{
                console.log(`AXIOS 실패! ${err} `)
            });    
        }

    }
    //3.비밀번호
            //입력제한조건
        //1)10자이상 16자이하
        //(영문숫자)+(숫자영문)+(영문특수문자)+(특수문자영문)+(숫자특수문자)+(특수문자숫자)+
        //2)([영문(1자이상)]+[숫자(1자이상)]+)  2가지이상조합 그룹1  +이거나 | 
        //  ([영문(1자이상)]+[특수문자(1자이상)]+)  2가지이상조합 그룹2 이거나 |  ====>3그룹 번갈아 가면서 3그룹*2 =>6그룹
        //  ([숫자(1자이상)]+[특수문자(1자이상)]+)  2가지이상조합 그룹3 이거나 |
        //3)한글사용안돼
        //4)공백사용안돼
        //5)동일한 숫자 3개이상 연속 사용 불가
    const onChangeUserPw1 =(e)=>{
        const {value} = e.target;
        let isPwError=false;
        let isPwMsg='';

        // const regEx1 = /[`~!@#$%^&*()-_=+,<.>/?;:'"\\|[{}]/g; 
        // const regEx2 = /.{6,16}/g;  //입력제한 6자 이상 16자 이하
        // const regEx3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;  //한글
        // const regEx4 = /[A-Za-z]+[0-9]*/g;  //영문필수->한글자 이상+,  무조건 나와야함  숫자선택0자이상 *  \d 도 숫자
        // const regEx5 = /\s/g;  //공백문자 사용 불가  

        const regExp1 = /.{10,16}/g; //1)10자이상 16자이하true
        const regExp2 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;  //3)한글사용안돼 false이면 정상
        const regExp3 = /\s/g; //4)공백사용안돼 false이면 정상
        const regExp4 = /(\d)\1\1/g;  //5)동일한 숫자 3개이상 연속 사용 불가 false 이면 정상
        const regExp5 = /([A-Za-z]+[0-9]+)+|([0-9]+[A-Za-z]+)+|([A-Za-z]+[`~!@#$%^&*()-_=+,<.>/?;:'"\\|[{}]+)+|([`~!@#$%^&*()-_=+,<.>/?;:'"\\|[{}]+[A-Za-z]+)+|([0-9]+[`~!@#$%^&*()-_=+,<.>/?;:'"\\|[{}]+)+|([`~!@#$%^&*()-_=+,<.>/?;:'"\\|[{}]+[0-9]+)+/g;

        if(regExp1.test(value)===false){
            isPwError=true;
            isPwMsg='최소 10자이상 입력';
        }
        else if(regExp2.test(value)===true ||regExp5.test(value)===true || regExp3.test(value)===true  ){
            isPwError=true;
            isPwError='영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
        }
        else if(regExp4===true){
            isPwError = true;
            isPwMsg = '동일한 숫자 3개 이상 연속 사용 불가';
        }
        else{
            isPwError=false;
            isPwMsg='';
        }
        setState({
            ...state,
            isPwError:isPwError,
            isPwMsg:isPwMsg,
            비밀번호:value
        })
    }


    //4.비밀번호확인
      //1)공백이면 : 비밀번호를 한번 더 입력해주세요.
      //  비밀번호 확인 입력 값 다르면 : 동일한 비밀번호를 입력
    const onChangeUserPw2 =(e)=>{
        const {value} = e.target;

        let isPw2Error= false;
        let isPw2Msg = '';

        if(value===''){
            isPw2Error= true;
            isPw2Msg='비밀번호를 한번 더 입력해주세요'
        }
        else if(value!==state.비밀번호){
            isPw2Error= true;
            isPw2Msg='동일한 비밀번호를 입력';
        }
        else{
            isPw2Error= false;
            isPw2Msg='';
        }
        setState({
            ...state,
            isPw2Error:isPw2Error,
            isPw2Msg : isPw2Msg,
            비밀번호확인:value
        })

        
        
    }   

    //5.이름
        //1)특수문자 입력과 동시에 삭제
        //2)공백이면 이름을 입력해주세요


    const onChangeUserName=(e)=>{
        const {value} = e.target;

        let isNameError=false;
        let isNameMsg='';
        let 이름='';

        const regExp =  /[`~!@#$%^&*()-_=+,<.>/?;:'"\\|[{}]/g; 
        이름 = value.replace(regExp,'');
        
        if(이름===''){
            isNameError=true;
            isNameMsg ='이름을 입력해주세요';
        }
        else{
            isNameError=false;
            isNameMsg ='';
        }
        setState({
            ...state,
            isNameError:isNameError,
            isNameMsg :isNameMsg,
            이름:이름
        })


    }

    //6.이메일
    const onChangeUserEmail=(e)=>{
        const {value} = e.target;
        let isEmailError = false;
        let isEmailMsg= '';
        // 맨앞 (영문숫자한글)필수(.)?(영문숫자한글)선택 @ (영문숫자한글-_.)필수 \.영문만{2,3}  맨뒤 
        //i눈 ignore 영문 대소문자 구별없음
        const regExp = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*_\-|+='/?{}]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*_\-|+='/?{}]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*_\-|+='/?{}]+\.[a-z]{2,3}$/gi;
        if(value===''){
            isEmailError=true;
            isEmailMsg='이메일 형식으로 입력해주세요.'
        }
        else if(regExp.test(value)===false){
            isEmailError=true;
            isEmailMsg='이메일 형식으로 입력해주세요.'
        }
        else{
            isEmailError=false;
            isEmailMsg=''
        }


        setState({
            ...state,
            isEmailError:isEmailError,
            isEmailMsg:isEmailMsg,
            이메일:value
        })
    }
    //6-1이메일 확인
    const onClickUserEmailOk=(e)=>{
            e.preventDefault();
            const value = state.이메일;
            const regExp = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/\.?]+\.[a-z]{2,3}$/gi; 
    
            if(value===''){
                setState({
                    ...state,
                    isConfirmModal: true,
                    confirmModalMsg:'이메일을 입력해 주세요.'
                });            
            }
            else if(regExp.test(value)===false){
                setState({
                    ...state,
                    isConfirmModal: true,
                    confirmModalMsg:'이메일 형식으로 입력해 주세요.'
                }); 
            }
            else{
                // 정상인 이메일인 경우
                // 이메일 중복검사
                axios({ // 웹서버 & DB서버에서 데이터 가져오기
                    url:'http://luck1409.dothome.co.kr/signup_db/select.php',
                    method:'GET'
                })
                .then((res)=>{ //Success
                    // console.log(res);
                    // console.log(res.data);
                    // console.log(res.data[0].이메일);
                    // console.log(res.data[1].이메일);
                    // console.log(res.data[2].이메일);
                    // 만약에 오류마면 어떡하지
                    // 예외처리
                    try{                    
                        const result = res.data.map((item)=>item.이메일===state.이메일);
    
                        if(result.includes(true)){
                            setState({
                                ...state,
                                isEmailOk: false,
                                isConfirmModal: true,
                                confirmModalMsg: "사용 불가능한 이메일 입니다."
                            });
                        }
                        else{
                            setState({
                                ...state,
                                isEmailOk: true,
                                isConfirmModal: true,
                                confirmModalMsg: "사용 가능한 이메일 입니다."
                            });
                        }
                    }
                    catch(err){
                        console.log(`AXIOS 오류 메시지!  ${err}`);
                    }
               
                })
                .catch((err)=>{
                    console.log(`AXIOS 실패 메시지!  ${err}`)
                });
    
            }
            
       
    
    }
    //7.휴대폰
    //입력제한조건
    //숫자이외 다 삭제
    const onChangeUserHp=(e)=>{
        const regExp = /[^0-9]/g  
        const {value} = e.target;
        let isHpError=false;
        let 휴대폰 = ''
        let isHpMsg='';
        let isHpdisabled=true;
        //숫자제외 다 삭제
        휴대폰 = value.replace(regExp, '');
        
        if(휴대폰 ===''){
            isHpError=true;
            isHpMsg='휴대폰 번호를 입력해 주세요.';
        }
        else{
            isHpError=false;
            isHpMsg='';
            if(휴대폰.length >= 1){
                isHpdisabled=false;
            }
            else{
                isHpdisabled=true;
            }
        }

        setState({

            ...state,
            휴대폰:휴대폰,
            isHpError:isHpError,
            isHpMsg:isHpMsg,
            isHpdisabled:isHpdisabled
        })

    


    }
    //7-1휴대폰 발송인증번호 받기 onClick 이벤트
    const onClickHpNum=(e)=>{
        e.preventDefault();

    //휴대폰 번호가 정확한지 유효성 검사 실행=====>정규표현식
    //010 011 012 013 014 015 016 017 018 019 맨앞 3자리
    //const regExp = /^01[0|1|2|3|4|5|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;   => 필요없는 번호는 지워!!!^01[0|1|2|3|4|5|6|7] 이런식으로!! 
    //const regExp = /^01[0|1|2|3|4|5|6|7|8|9]{1}[0-9]{3,4}[0-9]{4}$/g;
    const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
    let isConfirmModal = false;
    let confirmModalMsg='';
    let num = 0; //발송인증번호 상태관리변수 등록
    let 발송인증번호 = 0;

        if(regExp.test(state.휴대폰) ===false){

            isConfirmModal=true;
            confirmModalMsg='잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.';
          }
        else{
 

            //발송인증번호 전송 타이밍
            
            num = Math.floor(Math.random()*900000+100000) //6자리의 난수 발생 -> 발송인증번호

            //상태관리 변수에 발송인증번호 저장
            발송인증번호=num;
            isConfirmModal=true;
            confirmModalMsg=`인증번호가 발송되었습니다 . ${num} `;

        }
        

        setState({
            ...state,
            isConfirmModal:isConfirmModal,
            confirmModalMsg:confirmModalMsg,
            발송인증번호:발송인증번호
        })   
        
    }

    //7-2휴대폰 발송인증번호 확인 입력상자 onChange 이벤트
    const onChangeUserHp2=(e)=>{
        const {value}= e.target;
        let isHpdisabled2 = true;


        if(value.length>=1 ){
           isHpdisabled2 = false;
        }
        else{
            isHpdisabled2 = true;
        }


        setState({
            ...state,
            입력인증번호:value,
            isHpdisabled2:isHpdisabled2
        })
    }
    //7-3휴대폰 발송인증번호 확인 버튼클릭 onClick 이벤트
    const onClickHpNum2=(e)=>{
        e.preventDefault();
        let confirmModalMsg='';
        let isConfirmModal=false;
        let isHp3=true;
        let 발송인증번호=state.발송인증번호;
        let isHpdisabled=true;
        let isHpOk = false;

        isConfirmModal=true;
        if(state.발송인증번호===Number(state.입력인증번호)){
            confirmModalMsg=`인증에 성공하였습니다.`;
            isHp3=false;
            발송인증번호='';
            isHpdisabled=true;
            isHpOk=true;

            //타이머정지
            console.log(timer.setId);
            clearInterval(timer.setId)
        }   
        else{
            confirmModalMsg=`잘못된 인증코드 입니다.`;
            isHp3=true;
            발송인증번호=state.발송인증번호;
            isHpdisabled=false;
        }
        setState({
            ...state,
            isConfirmModal:isConfirmModal,
            confirmModalMsg:confirmModalMsg,
            isHp3:isHp3,
            발송인증번호:발송인증번호,
            isHpdisabled:isHpdisabled,
            isHpOk:isHpOk
        })
    }

    //7-4다른번호 인증 클릭 이벤트
    const onClickHpNum3=(e)=>{
        e.preventDefault();

        setState({
            ...state,
            isHp3:true,
            휴대폰:'',
            입력인증번호:'',
            발송인증번호:'',
        })
       
        createRef.current.focus(); //커서를 휴대폰 입력상자에 맞추고 커서가 깜박깜박
        

        //1.맨위 루트영역에 ref를 생성하고 변수 createRef에 지정한다.
        //2.createRef 변수를 태그요소 휴대폰 입력상자에 ref={createRef}에 대입시킨다.
        //3.이벤트 수행 시 휴대폰 입력상자에 커서를 포커스 시킨다. createRef.current.focus();
    }

    //8.주소검색 API : 팝업창 구현
    //public 정적요소 위치에
    //popup.html 
    const openPopupDaumPostApi=()=>{
        const popupFile = './popup.html';
        const popupName = '_popupAddressApi';
        const popupWidth = 530;
        const popupHeight = 570;
        const popupTop = (window.innerHeight-popupHeight) /2 ;
        const popupLeft = (window.innerWidth-popupWidth) /2 ;
        // const popupLeft = (윈도우창너비-팝업창너비) /2 ;
        // const popupTop = (윈도우창높이-팝업창높이) /2 ;
        
        //window.open(팝업창,html.팝업창이름, 'width=530, height=550,top=50%, left=50%')

        window.open(popupFile,popupName,`width=${popupWidth} height=${popupHeight} top=${popupTop} left=${popupLeft}`)
    }
    const onClickAddrPopupOpenApi=(e)=>{
        openPopupDaumPostApi(); //팝업창 열기!!
        e.preventDefault();

    }


    //sessionStorage 이벤트 ->가져오기
    //함수는 언제 실행이된다????  화면이 마운트 되고 난 후 실행한다. =>useEffect 사용
    //1.세션스토리지 키(JANEADDRESS)를 찾는다.
    //2.만약 있다면 가져오기 getItem(카)!!!
    //2.빈값이면 리턴~
    //4.값이 있다면 문자형 객체를 JSON.parse() 형식으로 변환한다.
    //5.그리고 속성값 주소1 주소2를 주소 입력창에 바인딩 시킨다. =>새로고침 할때마다 불러와서 안없어져~

    const getSessionStorage=()=>{
        const key = 'JANEADDRESS';
        let 주소1 = '';
        let 주소2 = '';
        let isAddress = false;
        //storage데이터 가져오기 데이터 없으면 null을 반환 ->null은 오류가 아니야 그래서 try catch 의미없음=>if문 써
        let result = sessionStorage.getItem(key);

        if(result!==null){//데이터가 있다면 =>널이아니면 
            result =JSON.parse(sessionStorage.getItem(key));
            주소1 =result.주소1;
            주소2 =result.주소2;
            isAddress =true;
            mapAddressFn(`${result.주소1} ${result.주소2}`,false);
         }
            setState({
                ...state,
                주소1:주소1,
                주소2:주소2,
                isAddress:isAddress
            })

            
        
        
    }
    React.useEffect(()=>{ //useEffect=> state뭔가 변화가 생기면 그때 실행 
        getSessionStorage();
    },[state.주소1]);

    //프롭스 내려받을때 state or 함수!!! 로 넣어도 가능!! mapAddressFn///////state가 더 나아 

    //8-1주소 1 입력상자 onChange이벤트

    const onChangeAddr1=(e)=>{
        
        setState({
            ...state,
            주소1:e.target.value,
            
        })
    }

    //8-2주소 2 입력상자 onChange이벤트

    const onChangeAddr2=(e)=>{
        setState({
            ...state,
            주소2:e.target.value,
            
        })
    }

    //8-3 주소 재검색 =>재검색버튼 클릭이벤트
    const onClickResearch=(e)=>{
        e.preventDefault();
        openPopupDaumPostApi(); //팝업창 열기!!
     
    }


    // 9.성별 : 라디오버튼 이벤트
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        })
    }

    //10.생년월일 
    //0.숫자만 입력가능 나머지 모두 제거 =>정규표현식

    ///////////////함수로 제작!! => 그리고 생년 생월 생일 연결=> useEffect 이용!!!!!!!/////////////////////

    //useEffect()는 상태관리 변수가 변경되면 즉각 실행!!!!!
    //1.모든 칸이 빈칸이면 오류없음 초기화
    //2.년(100세이하입력1923년)이 채워지면 => 월 입력요구
    //2.년(14세미만)이 채워지면 => 월 입력요구
    //2.년(미래 불가능 2024년)이 채워지면 => 월 입력요구
    //3.월(1~12)이 채워지면 => 일 입력요구
    //4.일(1~31)이 채워지고 오류가 없다면 완료!!

    //생년월일의 입력제한조건 및 이벤트 수행 메인함수```
    const birthCheckFn=()=>{
        const nowYear = new Date().getFullYear();
        let isBirth = false;
        let isBirthMsg = '';

        if(state.생년===''&& state.생월===''&& state.생일===''){
            isBirth =false;
            isBirthMsg = '';

        }
        else{
            //1.생년 제한조건->   
             //1)년(미래 불가능 2024년)이 채워지면 => 월 입력요구
             //2)년(14세미만)이 채워지면 => 월 입력요구
             //3)년(100세이하입력1923년)이 채워지면 => 월 입력요구
                                 
            if(state.생년.length < 4){ //생년월일 4자리 숫자
                isBirth =true;
                isBirthMsg = '태어난 년도 4자리를 정확하게 입력해주세요.';
            }
            else if(Number(state.생년) > nowYear){ //미래불가능
                isBirth =true;
                isBirthMsg = '생년월일이 미래로 입력 되었습니다.';
            }
            else if(Number(state.생년) >= (nowYear-14) ){ //14세미만
                isBirth =true;
                isBirthMsg = '만 14세 미만은 가입이 불가능합니다.';
            }                       
            else if(Number(state.생년) <( nowYear-100) ){ //100세이하
                isBirth =true;
                isBirthMsg = '생년월일을 다시 확인해주세요.';
            }
            else{
                //생월 체크1-12
                if(Number(state.생월) < 1 || Number(state.생월)>12){
                    isBirth =true;
                    isBirthMsg = '태어난 월을 정확하게 입력해주세요.';
                }
                else{
                    //생일 체크 1-31
                    if(Number(state.생일) < 1 || Number(state.생일)>31){
                        isBirth =true;
                        isBirthMsg = '태어난 일을 정확하게 입력해주세요.';
                    }
                    else{
                        isBirth =false;
                        isBirthMsg = '';
                    }
                }
            }                     
        }

        setState({
            ...state,
            isBirth:isBirth,
            isBirthMsg:isBirthMsg
        })
    }

    React.useEffect(()=>{
        birthCheckFn();
    },[state.생년, state.생월, state.생일]);

    //1)생년 입력상자 onChange 이벤트 상태관리자 연결 변수 만들어줘야함
   // const regExp = /[^\d]/g  
    const regExp = /[^0-9]/g  
    const onChangeUserBirthYear=(e)=>{
    const {value} = e.target;
       let 생년='';
       생년 = value.replace(regExp,'');


        setState({
            ...state,
            생년:생년
        })
    }
    //2)생월 입력상자 onChange 이벤트 상태관리자 연결 변수 만들어줘야함
    const onChangeUserBirthMonth=(e)=>{
        const regExp = /[^0-9]/g  
        const {value} = e.target;
        let 생월='';
        생월 = value.replace(regExp,'');
 
        setState({
            ...state,
            생월:생월
        })
    }
    //3)생일 입력상자 onChange 이벤트 상태관리자 연결 변수 만들어줘야함
    const onChangeUserBirthDate=(e)=>{
        const regExp = /[^0-9]/g  
        const {value} = e.target;
        let 생일='';
        생일 = value.replace(regExp,'');
        setState({
            ...state,
            생일:생일
        })
    }
    //11.추가입력사항 : 라디오버튼 onChange 이벤트
    const onChangeUserChooga=(e)=>{
        let 추가입력사항 = '';
        let isChooga1 = false;
        let isChooga2 = false;
        if(e.target.checked===true){
            추가입력사항=e.target.value;
            if(e.target.id ==='userChooga1'){//선택 라디오1, 라디오2
                isChooga1=true;
                isChooga2=false;
            }
            else{
                isChooga1=false;
                isChooga2=true;
            }
        }
        else{
            추가입력사항='';
            isChooga1=false;
            isChooga2=false;
        }

        setState({
            ...state,
            추가입력사항:추가입력사항,
            isChooga1:isChooga1,
            isChooga2:isChooga2
        });
    }
    //11-1.추천인아이디 :라디오버튼 onChange 이벤트
    const onChangeUserChoogaId=(e)=>{
        //추천인 아이디 글자입력 1자이상이면 우측 아이디확인버튼 사용가능하게한다

        let isChoogaIdOkBtn = false; //사용불가색상
       let isChoogaDisabled = true;//사용가능

        if(e.target.value.length > 1){
             isChoogaIdOkBtn = true;
             isChoogaDisabled = false;
        }
        else{
            isChoogaIdOkBtn = false;
            isChoogaDisabled = true;
        }
        setState({
            ...state,
            추천인아이디:e.target.value,
            isChoogaIdOkBtn:isChoogaIdOkBtn,
            isChoogaDisabled:isChoogaDisabled

        });

    }

    //11-2. 참여이벤트명 : 라디오버튼 onChange 이벤트
    const onChangeUserChoogaEvent=(e)=>{
        setState({
            ...state,
            참여이벤트명:e.target.value
        });
    }
    //11-3.추천인 아이디 확인버튼 onClick 이벤트 =>데이터 베이스 조회 서비스
    //서버에서 DB정보와 비교 아이디가 있다면 이벤트참여가능!!!
    //버튼 클릭 이벤트 
    const onClickChoogaIdokBtn=(e)=>{
        e.preventDefault();
        let isConfirmModal=false;
        let confirmModalMsg='';
        //웹서버에 접근해서 데이터베이스 접근 -> 조회 ->서버사이드 스크립트언어
        
        axios({
            url:'http://luck1409.dothome.co.kr/signup_db/select.php',
            method:'GET'
        })
        .then((res)=>{ //success
            //console.log( res.data);
            const result= res.data.map((item)=>item.아이디===state.추천인아이디);
            if(result.includes(true)){//추천인이있다면 모달창 띄우고, 버튼 사용불가, 버튼 색상 연하게 변경
                isConfirmModal = true;
                confirmModalMsg = '존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.';

            }

            else {
                isConfirmModal = true;
                confirmModalMsg = '존재하지 않는 아이디 입니다.';
            }
            setState({
                ...state,
                isConfirmModal:isConfirmModal,
                confirmModalMsg:confirmModalMsg,
                
            })
        })
        .catch((err)=>{//error
            console.log(`AXIOS 실패!!!!  ${err}`);
        });

    }


    //12.이용약관동의 
    //12-1전체동의 checkbox onChange 이벤트
    //개별체크해서 이용악관동의 항목이 7개이면 체크한다!!
    //7개미만이면 체크해제
    const onChangeUserServiceAll=(e)=>{
        let 이용약관동의 =[];
        if(e.target.checked===true){//전체체크

            이용약관동의=state.이용약관;//이용약관 배열7개의 항목 모두 => 이용약관동의 배열에 저장한다.
            
        }
        else{
            이용약관동의=[]; //빈배열 => 삭제!!

        }
        setState({
            ...state,
            이용약관동의:이용약관동의,

        })
    }
    //12-2 개별체크 7개 onChange 이벤트
    const onChangeUserService=(e)=>{     
        if(e.target.checked===true){//개별체크 선택항목 value값을 이용약관배열에 축척 저장한다.
            //'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' 가 선택(체크)되면 
            //SNS 이메일 체크해야한다
            //체크된다는건 이용약관동의 배열에 SNS 이메일 저장한다.
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SNS')===false && state.이용약관동의.includes('이메일')===false ){
                
                    setState({
                        ...state,
                        이용약관동의:[...state.이용약관동의,e.target.value,'SNS','이메일']

                    })
            }
            else if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SNS')===false && state.이용약관동의.includes('이메일')===true ){
                    setState({
                        ...state,
                        이용약관동의:[...state.이용약관동의,e.target.value,'SNS'] //이메일 있음 넣지마

                    })
            }
            else if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SNS')===true && state.이용약관동의.includes('이메일')===false ){
                    setState({
                        ...state,
                        이용약관동의:[...state.이용약관동의,e.target.value,'이메일'] //SNS 있음 넣지마

                    })
            }
            // else if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SNS')===true && state.이용약관동의.includes('이메일')===true ){
            //     setState({
            //         ...state,
            //         이용약관동의:[...state.이용약관동의,e.target.value] //SNS 이메일 둘 다 있음 넣지마 =>이 조건은 존재하지않는 조건!!

            //     })
            // }
            //현재 SNS를 체크했는데 이메일이 체크되고 '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' 체크가 안되어있다면
            else if(e.target.value==='SNS' && state.이용약관동의.includes('이메일')===true && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===false ){
                setState({
                    ...state,
                    이용약관동의:[...state.이용약관동의,e.target.value,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'] //SNS 이메일 둘 다 있음 넣지마 =>이 조건은 존재하지않는 조건!!

                })
            }
            else if(e.target.value==='이메일' && state.이용약관동의.includes('SNS')===true && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===false ){
                setState({
                    ...state,
                    이용약관동의:[...state.이용약관동의,e.target.value,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'] //SNS 이메일 둘 다 있음 넣지마 =>이 조건은 존재하지않는 조건!!

                })
            }
            else{
                
                    setState({
                        ...state,
                        이용약관동의:[...state.이용약관동의,e.target.value],

                    })
            }
        }

        else{//체크 안되면 개별체크 선택항목 value값을 이용약관배열에서 삭제시킨다.
            let 이용약관동의 =[]; //임시배열

            //1.'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' 해제하면 SNS 이메일 모두 해제한다. : state.이용약관동의 배열값3개 모두 삭제
            //==>1.삭제1[state.이용약관동의]'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' =>임시배열에 저장한다 : state.이용약관동의 제거 후->임시배열에 저장한다.
            //==>2.삭제2'SNS'[이용약관동의]
            //==>3.삭제3'이메일'[이용약관동의]
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                  //==>1.삭제1[state.이용약관동의]'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'====제거
                이용약관동의=state.이용약관동의.filter((item)=>item!==e.target.value);
                이용약관동의=이용약관동의.filter((item)=>item!=='SNS');//임시배열==>삭제2'SNS'
                이용약관동의=이용약관동의.filter((item)=>item!=='이메일');//임시배열==>삭제3'이메일'
                setState({
                    ...state,
                    이용약관동의:이용약관동의 //삭제되고 새롭게 배열구성 완료
                })
            }
            else if(e.target.value==='SNS' && state.이용약관동의.includes('이메일')===true){
                이용약관동의 = state.이용약관동의.filter((item)=>item!==e.target.value);
                이용약관동의 = 이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                setState({
                    ...state,
                    이용약관동의:이용약관동의 //삭제되고 새롭게 배열구성 완료
                })
            }
            //현제 체크한게 이메일이고 && SNS가 체크되어있다면 이메일만 삭제!!
            else if(e.target.value==='이메일' && state.이용약관동의.includes('SNS')===true){
                이용약관동의 = state.이용약관동의.filter((item)=>item!==e.target.value);
                이용약관동의 = 이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                setState({
                    ...state,
                    이용약관동의:이용약관동의 //삭제되고 새롭게 배열구성 완료
                })
            }

            else{
                setState({
                    ...state,
                    이용약관동의:state.이용약관동의.filter((item)=>item!==e.target.value),
    
                })
            }
        }

    }

    //컨펌모달 닫기 이벤트

    const onClickComfirmModalClose=(e)=>{
        e.preventDefault();
        // console.log(state.confirmModalMsg.includes('인증번호'));//찾으면 true 못찾으면 false
        // console.log(state.confirmModalMsg.indexOf('인증번호')); // -1찾지못함 / 찾으면 0 
        // console.log(state.confirmModalMsg.search('인증번호')); // -1찾지못함 / 찾으면 0 

        if(state.confirmModalMsg.includes('인증번호')){
            //모달닫기하면 함수 실행
            //타이머 함수 호출 실행
            timerCounterfn();

        }
        else{

        }

        setState({
            ...state,
            isConfirmModal:false
        })
    }

    //가입하기 onSubmit
    //가입하기 버튼 onSubmit이벤트 =>form 데이터 전송
    const onSubmitSignUpEvent =(e)=>{
        e.preventDefault();

    // AJAX({});
    // const formData ={
    //     아이디:state.아이디,
    //     비밀번호:state.비밀번호
    // }
    // $.ajax({
    //     url:'http://luck1409.dothome.co.kr/signup_db/insert.php',
    //     type:'POST',
    //     data:formData,
    //     success(res){
    //         console.log('AJAX성공!!!: ' +res);
    //     },
    //     error(err){
    //         console.log('AJAX성공!!!: ' +err);
    //     }
    // });

    // AXIOS({}).then(()=>{}).catch(()=>{});
    // FormData 생성자 생성
    // let newFormData= new FormData(); //전송할 폼데이터
    // newFormData.append('아이디', state.아이디);
    // newFormData.append('비밀번호', state.비밀번호);


    // axios({
    //     url:'',
    //     method:'POST',
    //     data: newFormData
    
    // })
    // .then((res)=>{
    //     console.log(res.data);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    
        // 입력폼 화면의 필수 항목과 선택항목 그리고 중복확인 인증등 항목들의
        //빠짐없는 항목을 체크하고 기용성있는 폼데이터를 전송한다.
        //1.아이디: 빈값이면 입력요구
        //2.아이디중복확인: 중복확인을 검사한다. isIdOk
        //3.비밀번호:빈값이면 입력요구 
        //4.비밀번호확인:두개 비밀번호 비교 확인 isPw2Error
        //5.이름:빈값이면 입력요구
        //6.이메일: 빈값이면 입력요구
        //7.이메일중복확인: 중복확인을 검사한다. isEmailOk
        //8.휴대폰: 인증번호 성공여부  state 추가 isHpOk
        //9.주소1, 주소2 =>빈값이면 입력요구
        //10.성별은 선택사항 검증 안해도 돼
        //11.생년월일은 선택사항 검증 안해도 돼
        //12.추가입력사항 : 선택사항 검증 안해도 돼
        //13.이용약관동의 : 필수항목 3개 확인 추가검증
            //가입하기 클릭하면 이용약관 동의 배열값 내용중 필수항목을 카운트한다. 그리고 변수에 대입한다.
            //includes('필수') indexOf search
             //14. 1~ 13번까지 이상없으면 전송
            const result =state.이용약관동의.map((item)=>item.includes('필수')===true? 1 : 0);

            console.log(result);
            let sum =0;
            result.map((item)=>{
                sum+=item;
            })
           // console.log(cnt);
            if(sum <3 ){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'이용약동의 필수항목 3개를 선택해야합니다.'
                })

            }
            else{
                
            }
            ///////////////////////////////////////////////////////////////
            //indexOf ('필수') 찾으면 0 1 2 3 ... 글자 위치 인덱스값
            //찾지못하면 -1 
            let cnt=0;
            state.이용약관동의.map((item)=>{
                if(item.indexOf('필수')!==-1){
                    cnt++
                }
                 //console.log(`item.indexOf('필수') ${item.indexOf('필수')}`);
            });
            if(cnt <3 ){
                    
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'이용약동의 필수항목 3개를 선택해야합니다.'
                })
            }
            else{
                
            }
            ///////////////////////////////////////////////////////////////////////
            //search('필수')
            let cnt2=0;
            state.이용약관동의.map((item)=>{
                if(item.search('필수')!==-1){
                    cnt2++
                }
                //console.log(`item.search('필수') ${item.search('필수')}`);
            });


            //유효성검사

            if(state.아이디===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'아이디를 입력하세요'
                })
            }
           else if(state.isIdOk===false){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'아이디 중복확인을 입력하세요'
                })
            }
            else if(state.비밀번호===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'비밀번호를 입력하세요'
                })
            }
            else if(state.비밀번호확인===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'비밀번호를 한번 더 입력하세요'
                })
            }
            else if(state.이름===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'이름을 입력하세요'
                })
            }
            else if(state.이메일===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'이메일을 입력하세요'
                })
            }
            else if(state.이메일확인===''){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'이메일 중복확인 하세요'
                })
            }
            else if(state.isHpOk===false){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'휴대폰 인증을 해주세요'
                })
            }
            else if(state.주소1===false){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'주소를 검색 해주세요'
                })
            }
            else if(state.주소2===false){
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'나머지 주소를 입력해주세요'
                })
            }
            else if(cnt2 <3 ){
                    
                setState({
                    ...state,
                    isConfirmModal:true,
                    confirmModalMsg:'이용약동의 필수항목 3개를 선택해야합니다.'
                })
            }
            else{ //모두 통과되면 전송
                setState({
                    ...state,
                    isConfirmModal:false,
                    confirmModalMsg:''
                   
                })
                //휴대폰 표현형식
                //시작 숫자3자리 (그룹1) $1
                //중간 숫자3-4자리 (그룹2) $2
                //끝   숫자4자리 (그룹3) $3
                const regExpHp = /^([0-9]{3})(\d{3,4})(\d{4})$/g; 

                //전송 폼데이터 생성
                //AXIOS 폼데이터 생성 생성자를 이용 폼데이터 삽입

                let newFormData = new FormData();

                newFormData.append('user_id', state.아이디);
                newFormData.append('user_pw', state.비밀번호);
                newFormData.append('user_name', state.이름);
                newFormData.append('user_email', state.이메일);
                newFormData.append('user_hp', state.휴대폰.replace(regExpHp,'$1-$2-$3')); //$1-$2 ->주민번호, 사업자번호로도 사용가능     자릿수만 변경해!!!
                newFormData.append('user_addr', `${state.주소1} ${state.주소2}`);
                newFormData.append('user_gender', state.성별);
                newFormData.append('user_birth', `${state.생년}-${state.생월}-${state.생일}` );
                newFormData.append('user_service',state.이용약관동의);
                newFormData.append('user_add_input',`${state.추가입력사항} ${state.추천인아이디} ${state.참여이벤트명}`);
                newFormData.append('user_gaib_date',`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);
    
                //AXIOS  API(REST API)
                //CORS CROSS ORIGIN RESORCE SHARING 
                //NODE js 기반 리액트가 있는 위치 http://localhost:3000/ =>http://luck1409.dothome.co.kr/signup_db/insert.php 
                //프로토콜: //도메인:포트번호/경로/index.html
                //브라우저가 보내는 주소(출처)와 받는주소가 같은지 검사 정책 SOP RFC6454 보안정책
                //=> 출처가 같은 출처에서만 공유 가능 정책 규칙
                axios({
                    url:'http://luck1409.dothome.co.kr/signup_db/form_data_insert.php', 
                    //닷홈 호스트 서버 : 서버사이드 스크립트 언어(JSP, PHP, ASP) =>SQL =>데이터베이스저장소
                    method:'POST',
                    data:newFormData
                })
                .then((res)=>{
                    if(res.status===200){
                        console.log(res.data);
                        setState({
                            ...state,
                            isConfirmModal:true,
                            confirmModalMsg:'AXIOS 성공'
                           
                        })
                    }
                    
                })
                .catch((err)=>{
                    console.log('AXIOS 실패',err);
                })
            }

            


    } //폼 서브밋 가입하기 버튼 클릭 이벤트 끝
   


    return (
        <>
        <main id='signUp'>
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>회원가입</h2>
                            <p><span><i>*</i>필수입력사항</span></p>
                        </div>
                        <div className="content">
                            <form onSubmit={onSubmitSignUpEvent} name='sign_up_form' id='signUpForm' method='post' action="./sign_up.php">
                                <ul>
                                    <li>
                                        <div>
                                            <label htmlFor="userId">아이디<i>*</i></label>
                                            <div className="center-box">
                                                <input
                                                    onChange={onChangeUserId} 
                                                    value={state.아이디}
                                                    type='text' 
                                                    maxLength={16} 
                                                    name='user_id' 
                                                    id='userId' 
                                                    placeholder='아이디를 입력해주세요' 
                                                    />
                                            </div>
                                            <button 
                                            onClick={onClickUserIdOk} 
                                            type='button'
                                            >중복확인</button>
                                            <p className={`errorMsg ${state.isIdError ? ' on': '' }`}>{state.errorMsg}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label htmlFor="userPw1">비밀번호<i>*</i></label>
                                            <div className="center-box">
                                                <input
                                                value={state.비밀번호}
                                                onChange={onChangeUserPw1}
                                                type='password'  
                                                maxLength={16} 
                                                name='user_pw1' 
                                                id='userPw1' 
                                                placeholder='비밀번호를 입력해주세요' 
                                                />
                                            </div>
                                            <p className={`error-msg ${state.isPwError ? ' on' : ''}`} >{state.isPwMsg}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label htmlFor="userPw2">비밀번호확인<i>*</i></label>
                                            <div className="center-box">
                                                <input 
                                                value={state.비밀번호확인}
                                                onChange={onChangeUserPw2}
                                                type='password'  
                                                maxLength={16} 
                                                name='user_pw2' 
                                                id='userPw2' 
                                                placeholder='비밀번호를 한번 더 입력해주세요'
                                                 />
                                            </div>
                                            <p className={`error-msg ${state.isPw2Error ? ' on' : ''}`}>비밀번호확인{state.isPw2Msg}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label htmlFor="userName">이름<i>*</i></label>
                                            <div className="center-box">
                                                <input 
                                                value={state.이름}
                                                onChange={onChangeUserName}
                                                type='text' 
                                                name='user_name' 
                                                id='userName' 
                                                placeholder='이름을 입력해주세요' 
                                                />
                                            </div>
                                            <p className={`error-msg ${state.isNameError ? ' on' : ''}`}>{state.isNameMsg}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label htmlFor="userEmail">이메일<i>*</i></label>
                                            <div className="center-box">
                                                <input 
                                                value={state.이메일}
                                                onChange={onChangeUserEmail}
                                                type='email' 
                                                name='user_email' 
                                                id='userEmail' 
                                                placeholder='이메일을 입력해주세요'
                                                 />
                                            </div>
                                            <p className={`error-msg ${state.isEmailError ? ' on' : ''}`}>{state.isEmailMsg}</p>
                                            <button 
                                            onClick={onClickUserEmailOk}
                                            type='button'>중복확인</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label htmlFor="userHp">휴대폰<i>*</i></label>
                                            <div className="center-box">
                                                <input 
                                                value={state.휴대폰}
                                                onChange={onChangeUserHp}
                                                type='text'  
                                                maxLength={11} 
                                                name='user_hp' 
                                                id='userHp' 
                                                placeholder='숫자만 입력해주세요' 
                                                ref={createRef}
                                                />
                                            </div>
                                            <p className={`error-msg ${state.isHpError ? ' on' : ''} `}>{state.isHpMsg}</p>
                                            <button className={`hp-num-btn ${state.isHpdisabled ? '': ' on'}`} onClick={onClickHpNum} disabled={state.isHpdisabled} type='button'>인증번호 받기</button>
                                            <button className={`hp-num-btn hp-num-btn3${state.isHp3 ? '': ' on'}`} onClick={onClickHpNum3}  type='button'>다른번호 인증</button>
                                        </div>
                                    </li>
                                    {
                                        state.발송인증번호!==''&&(
                                    <li>
                                        <div>
                                            <div className="center-box">
                                                <input  
                                                // value={state.휴대폰}
                                                onChange={onChangeUserHp2}
                                                type='text'  
                                                maxLength={6} 
                                                name='user_hp2' 
                                                id='userHp2' 
                                                placeholder='인증번호를 입력하세요' 
                                                />
                                                <span className='hp-timer-counter'> {minutes<10? `0${minutes}`: minutes}:{seconds <10? `0${seconds}` :seconds}</span>
                                            </div>
                                            <button className={`hp-num-btn ${state.isHpdisabled2 ? '': ' on'}`} onClick={onClickHpNum2} disabled={state.isHpdisabled2} type='button'>인증번호 확인</button>
                                        </div>
                                    </li>
                                        )
                                    }
                                    <li>
                                        <div>
                                            <label htmlFor="userAddress1">주소<i>*</i></label>
                                            <div className="center-box">
                                              <button className={`addr-search-btn ${state.isAddress?' on' :''}`} onClick={onClickAddrPopupOpenApi} type='button'>검색</button>
                                                <input 
                                                onFocus={onChangeAddr1} 
                                                onChange={onChangeAddr1}
                                                value={state.주소1} 
                                                type='text'
                                                className={`${state.isAddress?' on':''}`} 
                                                name='user_address1' 
                                                id='userAddress1' 
                                                placeholder='검색   주소1' />
                                                <input 
                                                onFocus={onChangeAddr2}
                                                onChange={onChangeAddr2} 
                                                value={state.주소2} 
                                                type='text'
                                                className={`${state.isAddress?' on':''}`} 
                                                name='user_address2' 
                                                id='userAddress2' 
                                                placeholder='나머지 주소2' />
                                                <h5>샛별배송</h5> 
                                                <h6>배송지에 따라 상품 정보가 달라질 수 있습니다.</h6>
                                            </div>
                                            <button 
                                            onClick={onClickResearch} 
                                            className={`addr-research-btn ${state.isAddress?' on' :''}`} 
                                            type='button'
                                            >재검색</button>
                                        </div>
                                    </li>                                 
                                    <li>
                                        <div>
                                            <label>성별</label>
                                            <div className="center-box gender">
                                                {/* <label htmlFor="userMale"><input onChange={onChangeGender} type='radio' name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')===true?true:false} />남자</label> */}
                                                <label><input onChange={onChangeGender} type='radio' name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')} />남자</label>
                                                <label><input onChange={onChangeGender} type='radio' name='user_gender' id='userFemale' value={'여자'} checked={state.성별.includes('여자')} />여자</label>
                                                <label><input onChange={onChangeGender} type='radio' name='user_gender' id='userNone' value={'선택안함'} checked={state.성별.includes('선택안함')} />선택안함</label>
                                            </div>                                            
                                        </div>
                                    </li>

                                    <li>
                                    <div>
                                            <label>생년월일</label>
                                            <div className="center-box birth">
                                                <div className="birth-box">
                                                    <ul>
                                                        <li><input 
                                                        onChange={onChangeUserBirthYear}
                                                        value={state.생년}
                                                        type="text"
                                                        maxLength={4} 
                                                        name='user_birth_year' 
                                                        id='userBirthYear' 
                                                        placeholder='YYYY' 
                                                        /></li>
                                                        <li><i>/</i></li>
                                                        <li><input
                                                        onChange={onChangeUserBirthMonth} 
                                                        value={state.생월}
                                                        type="text" 
                                                        maxLength={2} 
                                                        name='user_birth_month' 
                                                        id='userBirthMonth>' 
                                                        placeholder='MM' 
                                                        /></li>
                                                        <li><i>/</i></li>
                                                        <li><input 
                                                        onChange={onChangeUserBirthDate}
                                                        value={state.생일}
                                                        type="text" 
                                                        maxLength={2} 
                                                        name='user_birth_date' 
                                                        id='userBirthDate' 
                                                        placeholder='DD' 
                                                        /></li>
                                                    </ul>
                                                </div>
                                            </div> 
                                            <p className={`error-msg ${state.isBirth ? ' on' : ''}`}>{state.isBirthMsg}</p>                                           
                                        </div>
                                    </li>    
                                    <li>
                                        <div>
                                            <label>추가입력사항</label>
                                            <div className="center-box chooga">
                                                {/* <label htmlFor="userMale"><input onChange={onChangeGender} type='radio' name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')===true?true:false} />남자</label> */}
                                                <label><input 
                                                type='radio' 
                                                name='user_chooga' 
                                                id='userChooga1'
                                                value={'친구초대 추천인 아이디'} 
                                                onChange={onChangeUserChooga}
                                                checked={state.추가입력사항.includes('친구초대 추천인 아이디')}
                                                />친구초대 추천인 아이디</label>
                                                <label><input 
                                                type='radio' 
                                                name='user_chooga' 
                                                id='userChooga2' 
                                                value={'참여 이벤트명'} 
                                                onChange={onChangeUserChooga}
                                                checked={state.추가입력사항.includes('참여 이벤트명')}
                                                />참여 이벤트명</label>                                                
                                            </div> 
                                            <div className="chooga-box">
                                                    {
                                                        state.isChooga1 && (
                                                            <>
                                                                <input 
                                                                type="text" 
                                                                name='user_chooga_id' 
                                                                id='userChoogaId' 
                                                                placeholder='추천인 아이디를 입력해 주세요.'
                                                                onChange={onChangeUserChoogaId}
                                                                value={state.추천인아이디}
                                                                />
                                                                <h6>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</h6>
                                                            </>
                                                        )
                                                    }

                                                    {
                                                        state.isChooga2 && (
                                                            <>
                                                                <input 
                                                                type="text" 
                                                                name='user_chooga_event' 
                                                                id='userChoogaEvent' 
                                                                placeholder='참여 이벤트명을 입력해 주세요.'
                                                                onChange={onChangeUserChoogaEvent}
                                                                value={state.참여이벤트명}
                                                                />
                                                                <h6>
                                                                    추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                                                    가입 이후는 수정이 불가능 합니다.<br/>
                                                                    대소문자 및 띄어쓰기에 유의해주세요.
                                                                </h6>
                                                            </>
                                                        )
                                                    }
                            
                                            </div>  {/* 추가박스 끝  chooga-box*/}
                                                {
                                                    state.isChooga1 && (
                                                        <button 
                                                        onClick={onClickChoogaIdokBtn}
                                                        className={`chooga-idok-btn ${state.isChoogaIdOkBtn===true ? ' on': ''}`}
                                                        disabled={state.isChoogaDisabled}
                                                        >아이디 확인</button>
                                                    )
                                                }
                                        </div>
                                    </li>


                                    <li className='hr'>
                                        <hr />
                                    </li>  

                                    <li className='service-box'>
                                        <div>
                                            <label>이용약관동의<i>*</i></label>
                                            <div className="center-box service">
                                                {/* <label htmlFor="userMale"><input onChange={onChangeGender} type='radio' name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')===true?true:false} />남자</label> */}
                                               <ul>
                                                    <li>
                                                        <label>
                                                        <input 
                                                        onChange={onChangeUserServiceAll} 
                                                        type='checkbox' 
                                                        name='user_service_all' 
                                                        id='userServiceAll' 
                                                        value={'전체 동의합니다.'} 
                                                        checked={state.이용약관동의.length===7}
                                                        />전체 동의합니다.</label>                                                
                                                        <h5>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</h5>
                                                    </li>
                                                    
                                                    <li>
                                                        <label>
                                                            <input 
                                                            onChange={onChangeUserService}
                                                            type='checkbox' 
                                                            name='user_service_1' 
                                                            id='userService1' 
                                                            value={'이용약관 동의(필수)'} 
                                                            checked={state.이용약관동의.includes('이용약관 동의(필수)')}
                                                            />이용약관 동의</label><span>필수</span>                                                       
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input 
                                                            onChange={onChangeUserService}
                                                            type='checkbox' 
                                                            name='user_service_2' 
                                                            id='userService2' 
                                                            value={'개인정보 수집∙이용 동의(필수)'} 
                                                            checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}
                                                            />개인정보 수집∙이용 동의</label><span>필수</span>                                                       
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input 
                                                            onChange={onChangeUserService}
                                                            type='checkbox' 
                                                            name='user_service_3' 
                                                            id='userService3' 
                                                            value={'개인정보 수집∙이용 동의(선택)'} 
                                                            checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}
                                                            />개인정보 수집∙이용 동의</label><span>선택</span>                                                       
                                                    </li>
                                                    <li>
                                                        <label><input 
                                                        onChange={onChangeUserService}
                                                        type='checkbox'
                                                        name='user_service_4' 
                                                        id='userService4' 
                                                        value={'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'} 
                                                        checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}
                                                        />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><span>선택</span>                                                       
                                                    </li>
                                                    <li className='service56'>
                                                        <label>
                                                            <input 
                                                            onChange={onChangeUserService}
                                                            type='checkbox' 
                                                            name='user_service_5'
                                                            id='userService5' 
                                                            value={'SNS'} 
                                                            checked={state.이용약관동의.includes('SNS')}
                                                            />SNS</label>                                                    
                                                        <label>
                                                            <input 
                                                            onChange={onChangeUserService}
                                                            type='checkbox' 
                                                            name='user_service_6' 
                                                            id='userService6' 
                                                            value={'이메일'} 
                                                            checked={state.이용약관동의.includes('이메일')}
                                                            />이메일</label>
                                                        <h6>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</h6>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input 
                                                            onChange={onChangeUserService}
                                                            type='checkbox' 
                                                            name='user_service_7' 
                                                            id='userService7' 
                                                            value={'본인은 만 14세 이상입니다.(필수)'} 
                                                            checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                                            />본인은 만 14세 이상입니다.</label><span>필수</span>                                                       
                                                    </li>

                                               </ul> 

                                            </div>                                            
                                        </div>
                                    </li>

                                    <li>
                                        <button type='submit'>가입하기</button>
                                    </li>

                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
          {  
          state.isConfirmModal && (                                   
        <div id="confirmModal">
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className="title-box">
                            <h1>{state.confirmModalMsg}</h1>
                        </div>
                        <div className="button-box">
                            <button onClick={onClickComfirmModalClose}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
       </div>
          )
    }
        </>
    );
};


SignUpComponent.defaultProps = {
    회원가입: {
    //1.아이디
    아이디:'',  //입력상자 아이디 저장
    isIdError:false, //입력상자 아이디 유효성 검사 오류 여부
    errorMsg:'',
    //1-2아이디확인
    isIdOk:false,

    //2.비밀번호
    비밀번호:'',
    isPwError:false,
    isPwMsg:'',

    //3.비밀번호 확인
    비밀번호확인:'',
    isPw2Error:false,
    isPw2Msg:'', 
    //4.이름
    이름:'',
    isNameError:false,
    isNameMsg:'',   
    
    //5.이메일
    이메일:'',
    isEmailError : false,
    isEmailMsg:'',

    //5-1이메일중복확인
    isEmailOk:false,

    //6.휴대폰
    휴대폰:'',
    isHpError:false,
    isHpMsg:'',

    //6-1휴대폰 발송인증번호 받기 버튼 disabled
    isHpdisabled:true, //휴대폰 발송인증번호 받기 버튼 사용 못함  
    발송인증번호:'', 

    //6-2휴대폰 입력인증번호 확인 입력상자
    isHpdisabled2:true, //휴대폰 인증번호 확인 버튼 사용 못함 
    입력인증번호:'',

    //6-4휴대폰 입력인증번호 확인 버튼 클릭 이벤트
    
    //6-5다른번호인증 : 인증번호가 성공하면 보임
    isHp3:true,
    //6-6 휴대폰 인증성공  저장
    isHpOk:false,

     //주소
    isAddress: false,  // Boolean
    isAddress1: true,  // Boolean
    isAddress2: false,  // Boolean
    주소1:'',
    주소2:'',

     //성별
    성별: '선택안함', // String

     //추가입력사항
    추가입력사항:'', //string
    참여이벤트명 :'',
    추천인아이디:'',
    isChooga1: false,
    isChooga2: false,
    isChoogaIdOkBtn:false,
    isChoogaDisabled:true,

    //생년월일
    생년:'',
    생월:'',
    생일:'',
    isBirth:true,
    isBirthMsg:'',
    //이용약관
    이용약관:[
        "이용약관 동의(필수)",
        "개인정보 수집∙이용 동의(필수)",
        "개인정보 수집∙이용 동의(선택)",
        "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
        "SNS",
        "이메일",
        "본인은 만 14세 이상입니다.(필수)",
    ],

    //이용약관동의 : 내용이 체크박스 VALUE값과 같다면 체크된다.
    이용약관동의:[],
    //컨펌모달창
    isConfirmModal:false,
    confirmModalMsg:'',

    }
}
