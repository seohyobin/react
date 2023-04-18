import React from 'react';

export default function HeaderComponent({MapText,isMap}) {

    const [state, setState] = React.useState({
        isFixed: false,
        isSub1: false,
        isSub2: false
    });
    //배송지 등록 및 변경
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

    // 고객센터 서브메뉴(툴팁메뉴) 마우스 엔터 이벤트
    const onMouseEnterSub1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub1: true
        })
    }

    // 고객센터 서브1 메뉴를 마우스가 떠나면
    const onMouseLeaveSub1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub1: false
        })
    }

    // 배송지 등록 서브2 메뉴를 마우스 오버 이벤트
    // isSub2 : false  조건부 연산자 이용 show & hide 구현
    const  onMouseOverSub2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub2: true
        })
    }   


    // 배송지 등록 서브2 메뉴를 마우스 아웃 이벤트
    const onMouseOutSub2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub2: false
        })
    }



    React.useEffect(()=>{
       const row3Top = document.querySelector('#header .row3').offsetTop;

       window.addEventListener('scroll', function(){
            let isFixed = false;
            if( window.scrollY>=row3Top ){
                isFixed = true;
            }
            else{
                isFixed = false;
            }
            setState({
                ...state,
                isFixed: isFixed
            });
       })

    },[]);

    return (
        <header id='header'>
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="row1">
                            <div className="container">
                                <ul>
                                    <li><a href="/회원가입" title='회원가입'>회원가입</a></li>
                                    <li><i>|</i></li>
                                    <li><a href="/로그인" title='로그인'>로그인</a></li>
                                    <li><i>|</i></li>
                                    <li>
                                        <a onMouseOver={onMouseEnterSub1} href="/고객센터" title='고객센터'>고객센터 <img src="./images/sign_up/ico_down_16x10.png" alt="" /></a>
                                        {
                                            state.isSub1 &&  (
                                                    <div className="sub"  onMouseLeave={onMouseLeaveSub1}>
                                                        <ul>
                                                            <li><a href="!#">공지사항</a></li>
                                                            <li><a href="!#">자주하는 질문</a></li>
                                                            <li><a href="!#">1:1문의</a></li>
                                                            <li><a href="!#">대량주문 문의</a></li>
                                                        </ul>
                                                    </div>
                                            )
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`row2${state.isFixed?' on':''}`}>
                            <div className="container">
                                <div className="left">
                                    <h1>
                                        <img src="./images/sign_up/logo.svg" alt="" />
                                        <span><a href="/">마켓컬리</a></span>
                                        <span><i>|</i></span>
                                        <span><a href="/뷰티컬리">뷰티컬리</a></span>
                                    </h1>
                                </div>
                                <div className="center">
                                    <div>
                                        <input type="text" name='' id='' placeholder='검색어를 입력해 주세요'/>
                                        <a href='!#'><img src="./images/sign_up/search.svg" alt="" /></a>
                                    </div>
                                </div>
                                <div className="right">
                                    <span onMouseLeave={onMouseOutSub2} >
                                        <a onMouseOver={onMouseOverSub2} href="!#"><img src="./images/sign_up/map.svg" alt="" /></a>
                                        {/* 배송지 등록 */}

                                        {
                                            state.isSub2 && (
                                                <div className="sub2">
                                                    <ul>
                                                        <li>
                                                            {
                                                                isMap ? 
                                                                (
                                                                    <>
                                                                    <span>배송지를 등록</span>하고<br />
                                                                    구매 가능한 상품을 확인하세요!
                                                                    </>

                                                                ) 
                                                                : 
                                                                (
                                                                    <>                                        
                                                                    <h2 className='mpa-address'>{MapText}</h2>
                                                                    <p>배송지불가</p>
                                                                    </>

                                                                
                                                                )
                                                            }

                                                        </li>
                                                        <li>
                                                            {
                                                                    isMap ? 
                                                                (
                                                                <>
                                                                <button>로그인</button>
                                                                <button onClick={openPopupDaumPostApi}>
                                                                    <img src="./images/sign_up/ico_search.svg" alt="" />
                                                                    주소검색
                                                                </button>
                                                                </>
                                                                )
                                                                :
                                                                (
                                                                    <button onClick={openPopupDaumPostApi} className='map-replace-btn'>
                                                                    배송지변경
                                                                </button>
                                                                )
                                                            }
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        }

                                    </span>
                                    <span><a href="!#"><img src="./images/sign_up/heart.svg" alt="" /></a></span>
                                    <span><a href="!#"><img src="./images/sign_up/cart.svg" alt="" /></a></span>
                                </div>
                            </div>
                        </div>
                        <nav id='nav' className={`row3${state.isFixed?' on':''}`}>
                            <div className="container">
                                <div className="left">
                                    <a href="!#"><img src="./images/sign_up/nav_bar.svg" alt="" /><span>카테고리</span></a>
                                </div>
                                <div className="center">
                                    <ul>
                                        <li><a href='!#'>신상품</a></li>
                                        <li><a href='!#'>베스트</a></li>
                                        <li><a href='!#'>알뜰상품</a></li>
                                        <li><a href='!#'>특가혜택</a></li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <a href="!#">샛별・택배<span>배송안내</span></a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
