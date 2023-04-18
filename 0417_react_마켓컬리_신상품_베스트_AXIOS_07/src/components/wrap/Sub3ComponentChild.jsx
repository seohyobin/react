import React from 'react';

export default function Sub3ComponentChild({알뜰쇼핑}){

 // 정가, 판매가 금액에 콤머 형식 정규표현식 구현하기
 const commaPrice=(price)=>{
    let value = price.toString();
    //     300  
    // 383,000  
    const regExp = /(^\d+)(\d{3})/g;  // (그룹1)(그룹2)
    // console.log('정가 가져오기 = ' , price );
    // console.log('정가.toString  = ' , value );
    // 가져온 데이터값은 숫자이다 그래서 파란색으로 콘솔로그에 표시
    // 정규표현식 반드시 문자열만 처리가능하다.
    // 문자열형식으로 변환 시키기

    // 반복문 처리 모두처리
    // 리턴문으로 결과값 돌려준다.
    while( regExp.test(value) ){
        return  value.replace(regExp, '$1,$2');
    }
    
}

    const result = 알뜰쇼핑.map((item)=>{
            return(
                    <li key={item.제품코드}>
                        <a href="!#">
                            <div className="img-box">
                                <img src={`./images/sub2/${item.이미지}`} alt="" />
                                
                                <span>
                                    <img src="./images/sub1/icon_cart.svg" alt="" />
                                </span>
                            </div>
                            <div className="tit-box">
                                <ul>
                                    <li>{item.배송구분}</li>
                                    <li><strong>[{item.제조사}]</strong> <em>{item.제품명}</em></li>
                                    <li>{item.제품특성}</li>
                                    <li><span className='rate-price'>{item.할인율===0 ? `` :`${Math.round(item.할인율*100)}%`}</span>{item.할인율 > 0 &&(<span className='pan-price'>{commaPrice(item.정가*(1-item.할인율))}</span>)}</li>
                                    <li>{item.할인율===0? <span className='pan-price'>{commaPrice(item.정가)}</span> : <s>{commaPrice(item.정가)}</s> }</li>
                                    <li>{item.판매처}</li>
                                </ul>
                            </div>
                        </a>
                    </li>
            )
        
    })

    return (
            <ul>

                {
                //     신상품.map((item)=>{
                //         return(
                //                 <li key={item.제품코드}>
                //                     <a href="!#">
                //                         <div className="img-box">
                //                             <img src={`./images/sub1/${item.이미지}`} alt="" />
                                            
                //                             <span>
                //                                 <img src="./images/sub1/icon_cart.svg" alt="" />
                //                             </span>
                //                         </div>
                //                         <div className="tit-box">
                //                             <ul>
                //                                 <li>{item.배송구분}</li>
                //                                 <li><strong>[{item.제조사}]</strong> <em>{item.제품명}</em></li>
                //                                 <li>{item.제품특성}</li>
                //                                 <li><span className='rate-price'>{item.할인율===0 ? `` :`${Math.round(item.할인율*100)}%`}</span>{item.할인율 > 0&&(<span className='pan-price'>{commaPrice(item.정가*(1-item.할인율))}</span>)}</li>
                //                                 <li><s>30000원</s></li>
                //                                 <li>{item.판매처}</li>
                //                             </ul>
                //                         </div>
                //                     </a>
                //                 </li>
                //         )
                    
                // })
                }

                {result}







            </ul>
    );
};

