import { 
  getNode,
  clearContents, 
  insertFirst,
  insertLast,
  attr
} from '../../lib/dom/index.js';

/* -------------------------------------------------------------------------- */
/*                               product_detail                               */
/* -------------------------------------------------------------------------- */
const buyBtnPlus = getNode('.product__buy-btn__plus');
const buyBtnMinus = getNode('.product__buy-btn__minus');
const buyBtnNum=getNode('.product__buy-btn__num');
const buyBtnNumPrice=getNode('.product__buy-last-money');

const buyHeartBtn=getNode('.product__buy-heart-btn'); //버튼

const buyCartBtn=getNode('.product__buy-feature-cart__btn'); //장바구니 버튼
const userOrder=getNode('.user-order');//ul 장바구니 노드

const navBtn_01=getNode('.product__nav-button_01'); //nav_상품 설명 
const navBtn_02=getNode('.product__nav-button_02'); //nav_상세 정보
const navBtn_03=getNode('.product__nav-button_03'); //nav_후기
const navBtn_04=getNode('.product__nav-button_04'); //nav_문의
const description=getNode('.description'); //상품 설명
const detail=getNode('.detail');
const review=getNode('.product-review');
const inquiry=getNode('.product-inquiry');


//텍스트컨텐트
let buyBtnText = +getSpanText(buyBtnNum); 
let buyBtnPriceText = +getSpanText(buyBtnNumPrice);
let buyBtnTotalPrice=buyBtnPriceText;
/* --------------------------------------------------------------------------------------------------------------------------- */

function getSpanText(node){
  if(node.tagName !== 'SPAN') refError('getInputValue 함수는 SPAN ELEMENT만 허용합니다.')
  return node.textContent;
}

/* 수량 버튼,총합 금액 */
function handlerBuy(e){
  e.preventDefault();

  if(e.currentTarget === buyBtnPlus){
    let buyBtnTotal= ++buyBtnText;
    buyBtnTotalPrice += buyBtnPriceText;

    clearContents(buyBtnNum);
    clearContents(buyBtnNumPrice);

    buyBtnNum.textContent=buyBtnTotal;
    buyBtnNumPrice.textContent=buyBtnTotalPrice.toLocaleString();
    
  }
  else{
    let buyBtnTotal= --buyBtnText;
    buyBtnTotalPrice -= buyBtnPriceText;

    clearContents(buyBtnNum);
    clearContents(buyBtnNumPrice);

    buyBtnNum.textContent=buyBtnTotal;
    buyBtnNumPrice.textContent=buyBtnTotalPrice.toLocaleString();
  }
}



/* 하트 아이콘 색 변경 ------------------------------------------------------------------------------------------------------------------------------------*/
function handlerBuyHeart(e){
  let buyEmptyHeart=getNode('.product__buy-empty-heart'); //빈 하트 이미지

  if(buyHeartBtn.firstElementChild.className=="product__buy-empty-heart"){ //누른게 빈 하트면

    buyEmptyHeart.remove();
    insertFirst(buyHeartBtn,` <img class="product__buy-heart" src="../assets/icons/Icon/squre-heart.svg" alt="좋아요 아이콘"/>`);
  }
  else{
      let buyHeart=getNode('.product__buy-heart'); //색 하트 이미지

      buyHeart.remove();
      insertFirst(buyHeartBtn,` <img class="product__buy-empty-heart" src="../assets/icons/Icon/squre-empty-heart.svg" alt="빈 좋아요 아이콘"/>`);
  }
}


/* 장바구니 (노드 지우기) setTimeout 함수 쓰기 위함 --------------------------------------------------------------------------------------------------------------------*/
function removeAlert(node){
  return node.remove();
}

/* 장바구니 알람 */
function handlerBuyCart(e){

  let userOrderCart=userOrder.lastElementChild; //이미지 노드
  
  insertLast(userOrderCart,` 
    <div class="product__buy-cart__alert">
      <img class="product__buy-cart-polygon" src="../assets/icons/Icon/cart-polygon.svg" alt="삼각형 말풍선">
      <div class="product__buy-cart__alert-info">
        <img class="product__buy-cart__alert-img" src="../assets/icons/Icon/product-detail-first.svg" width="46" height="60">
        <div class="product__buy-alert-p">
          <p class="product__buy-alert-title">[풀무원] 탱탱쫄면 (4개입)</p>
          <p class="product__buy-alert-content">장바구니에 상품을 담았습니다.</p>
        </div>
      </div>
    </div> `);

  let buyCartAlert=getNode('.product__buy-cart__alert')
/*   if(buyCartAlert==='.product__buy-cart__alert'){
    removeAlert(buyCartAlert);
  } */
  setTimeout(removeAlert, 2000, buyCartAlert );
}


/* 스크롤 이동 ------------------------------------------------------------------------------------------------------------------------*/
function moveScrollDescription(e){
  description.scrollIntoView({ behavior: 'smooth' });
}
function moveScrollDetail(e){
  detail.scrollIntoView({ behavior: 'smooth' });
}
function moveScrollReview(e){
  review.scrollIntoView({ behavior: 'smooth' });
}
function moveScrollInquiry(e){
  inquiry.scrollIntoView({ behavior: 'smooth' });
}


  /* 후기 팝업 (스크롤 막기 js모달창구현)----------------------------------------------------------------------------------------------------- */

 //모달
let reviewModal=getNode('.product-review__modal'); //리뷰 후기 작성 팝업 열기
let reviewHeaderBtn=getNode('.product-review_header-btn'); //후기 작성하기 버튼
let reviewModalCloseBtn=getNode('.review__modal-close_btn') // X 닫기 버튼
let reviewModalCancelBtn=getNode('.modal-form__cancel-btn')

function modalToggle(){
  reviewModal.classList.toggle('hidden');
}


/* 문의 팝업 ---------------------------------------------------------------------------------------------------------------------*/
let inquiryModal=getNode('.product-inquiry__modal'); //리뷰 문의 작성 팝업 열기
let inquiryHeaderBtn=getNode('.product-inquiry_header-btn'); //문의 작성하기 버튼
let inquiryModalCloseBtn=getNode('.inquiry__modal-close_btn'); // X 닫기 버튼
let inquiryModalCancelBtn=getNode('.inquiry__modal-form__cancel-btn');

function InquiryModalToggle(){
  inquiryModal.classList.toggle('hidden');
}

buyBtnPlus.addEventListener('click',handlerBuy); // +
buyBtnMinus.addEventListener('click',handlerBuy); //-

buyHeartBtn.addEventListener('click',handlerBuyHeart); //하트 아이콘

buyCartBtn.addEventListener('click',handlerBuyCart); //장바구니 


navBtn_01.addEventListener('click',moveScrollDescription); // 설명~문의 스크롤 이동
navBtn_02.addEventListener('click',moveScrollDetail);
navBtn_03.addEventListener('click',moveScrollReview);
navBtn_04.addEventListener('click',moveScrollInquiry);



reviewHeaderBtn.addEventListener('click',modalToggle); // 후기 작성하기
reviewModalCloseBtn.addEventListener('click',modalToggle); // X 닫기
reviewModalCancelBtn.addEventListener('click',modalToggle); //취소


inquiryHeaderBtn.addEventListener('click',InquiryModalToggle); // 문의 작성하기
inquiryModalCloseBtn.addEventListener('click',InquiryModalToggle); // X 닫기
inquiryModalCancelBtn.addEventListener('click',InquiryModalToggle); //취소


