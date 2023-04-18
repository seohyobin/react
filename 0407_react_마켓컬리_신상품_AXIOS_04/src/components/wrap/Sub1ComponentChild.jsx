import React from 'react';

export default function Sub1ComponentChild({신상품}){

    const newProductList=()=>{
        신상품.map((item,idx)=>{
            console.log(idx,item);
        })
    }


    React.useEffect(()=>{
        newProductList();
    },[신상품])

    return (
    <ul>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
        <li>
            <a href="!#">
                <div className="img-box">
                    <img src="./images/sub1/0a54f6a4-4f5a-4202-8f6d-045d2a1709de.jpg" alt="" />
                    
                    <span>
                        <img src="./images/sub1/icon_cart.svg" alt="" />
                    </span>
                </div>
                <div className="tit-box">
                    <ul>
                        <li>샛별배송</li>
                        <li><strong>[브리오신]</strong> <em>사봉 느와르 큐브 비누 300g</em></li>
                        <li>얼룩 제거 위한 손 세탁 전용 비누</li>
                        <li><span className='rate-price'>45%</span><span className='pan-price'>16,500원</span></li>
                        <li><s>30000원</s></li>
                        <li>Kurly Only</li>
                    </ul>
                </div>
            </a>
        </li>
    </ul>
    );
};

