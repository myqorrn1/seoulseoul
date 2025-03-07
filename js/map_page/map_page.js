let cardList; // 카드 전체 영역
let placeCard; // 카드 1장
let placeImg; // 카드에서 위에꺼
let placeText; // 카드에서 아래꺼
let placeNames = [];
let cardId;

function enterEvent(e) {
  // console.log(e)
  if (e.keyCode == 13) {
    clickEvent();
  }
}
function clickEvent() {
  let dest = document.querySelector("#dest").value;
  console.log(cardList)
  // console.log('카드 리스트 콘솔 출력',cardList)
  // console.log('하위 span들 선택', document.querySelectorAll('#cardList > span'))
  // 카드들이 생성되어있다면 삭제하기
  if (document.querySelector('#outputs > span') != null) {
    console.log('조건문 합격')
    const allspan = document.querySelectorAll("#outputs > span");
    for (i = 0; i < allspan.length; i++) {
      const removeSpan = document.querySelector("#outputs > span");
      // removeSpan.classList.remove('card')
      cardList.classList.remove("card-grid");
      // 카드삭제
      removeSpan.remove();
      // 이전 검색에 사용된 배열 초기화
      placeNames = [];
    }
  }

  // alert(`${dest}라고 입력하셨습니다.`)
  // 장소 검색 객체 생성
  var ps = new kakao.maps.services.Places();

  // console.log(ps)

  // 키워드로 장소를 검색합니다
  ps.keywordSearch(`${dest}`, placesSearchCB);

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      var bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  }

  // 지도에 마커 표시하는 코드
  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, "click", function () {
        // 객체로 출력
        
      //여기서부터 시작!
      // console.log(marker)
      // console.log(map)
      // console.log(place)
      // 이미 한번 클릭해서 카드가 생셩되어있다면 아래 내용 실행
      if (placeNames.includes(place.place_name)) {
        // 선택된 카드 아이디로 다시 한번 초기화 해줘야함 안그러면 삭제된 id를 한번더 선택하게됨.
        cardId = place.place_name.replace(/ /g, ""); //(/  /g공백 제거 코드)

        console.log("이미 한번 클릭한 식당입니다.");
        // 이거 지금 됐다가 안됐다가 그럼 이거 아이디에 공백이 들어가서임
        const moreClick = document.querySelector(`#${cardId}`);
        console.log("클릭한 마커의 id", cardId);
        // console.log(moreClick);
        moreClick.remove(cardId);
        //이미 클릭한 식당이라면 배열에서 삭제
        placeNames = placeNames.filter(function (e) {
          return e != place.place_name;
        });
        console.log(placeNames);
        // 클릭한 마커에 해당하는 식당 카드 삭제

        // 다 취소 눌렀다면 여백 제거
        if (placeNames.length == 0) {
          cardList.classList.remove("card-grid");
        }

        // moreClick.remove()
      } else {
        placeNames.push(place.place_name);
        console.log(placeNames);

        var infowindow = new window.kakao.maps.InfoWindow({});
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);

        //   지도 밑에 주소에대한 설명 추가되는 코드 시작
        cardList = document.querySelector("#outputs");
        cardList.classList.add("card-grid");
        // 카드형태 만들기
        placeCard = document.createElement("span");
        placeCard.classList.add("card");
        // 지역 이름으로 카드에 id추가
        cardId = place.place_name.replace(/ /g, "");
        placeCard.setAttribute("id", cardId);
        cardList.append(placeCard);
        // 카드 안에 상자 2개로 나누기(이미지칸, 정보칸)
        placeImg = document.createElement("div");
        placeImg.classList.add("card-top");
        placeText = document.createElement("div");
        placeText.classList.add("card-bottom");
        placeCard.append(placeImg, placeText);
        // 이미지칸에 카테고리별로 이미지 변경
        const placebackImg = document.createElement("img");
        const category = place.category_group_code;
        if (category == "FD6") {
          //카테고리가 음식점일때
          placebackImg.setAttribute(
            "src",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/d5/ce/6d/savor-the-exquisite-taste.jpg?w=600&h=-1&s=1"
          );
          placebackImg.classList.add("cardImg");
          placeImg.append(placebackImg);
        } else if (category == "AT4") {
          //카테고리가 관광명소일때
          placebackImg.setAttribute(
            "src",
            "https://pimg.mk.co.kr/meet/neds/2020/12/image_readtop_2020_1263248_16074725144464348.jpg"
          );
          placebackImg.classList.add("cardImg");
          placeImg.append(placebackImg);
        } else if (category == "MT1") {
          //카테고리가 대형마트일때
          placebackImg.setAttribute(
            "src",
            "https://www.thinkfood.co.kr/news/photo/201911/85600_110319_1815.jpg"
          );
          placebackImg.classList.add("cardImg");
          placeImg.append(placebackImg);
        } else if (category == "AD5") {
          //카테고리가 숙박일때
          placebackImg.setAttribute(
            "src",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BVn3DavQB6LMfnr3fbK30yQxAO0lB6ziDg&s"
          );
          placebackImg.classList.add("cardImg");
          placeImg.append(placebackImg);
        }

        //정보칸에 이름 입력
        const placeTitle = document.createElement("h3");
        // placeTitle.classList.add("placeTitle");
        placeTitle.textContent = place.place_name;
        placeText.append(placeTitle);
        //정보칸에 주소 입력
        const placeAdd = document.createElement("h4");
        // placeAdd.classList.add("placeadd");
        placeAdd.textContent = place.address_name;
        placeText.append(placeAdd);
        //정보칸에 버튼 출력
        const placeBtn = document.createElement("button");
        placeBtn.textContent = "자세히 알아보기";
        placeBtn.classList.add("cardBtn");
        placeBtn.setAttribute(
          "onclick",
          `location.href = '${place.place_url}'`
        );
        placeText.append(placeBtn);

        var btnTop = document.querySelector(".card-top")
        var location =  window.pageYOffset + btnTop.getBoundingClientRect().top;
        location = location - 210;
        window.scrollTo({top:location, bbehavior : "smooth"})
        

      }
  
    });
  }
}
// 위도와 경도를 알아오는 코드
navigator.geolocation.getCurrentPosition(function (position) {
  (lat = position.coords.latitude), // 위도
    (lon = position.coords.longitude); // 경도
});

// 지도 완성하는 코드
var container = document.getElementById("map");
var options = {
  center: new window.kakao.maps.LatLng(37.5756032, 126.9767925),
  level: 3,
};
var map = new window.kakao.maps.Map(container, options);
// console.log(map)
// console.log(window)


var tripCheckbox = document.querySelector(".tripCheckbox")



const bicycle = document.getElementById('bicycle');
const tripImg1 = document.querySelector('.tripImg1');
const tripImg2 = document.querySelector('.tripImg2');
const tripImg3 = document.querySelector('.tripImg3');
const tripImg4 = document.querySelector('.tripImg4');
const tripImg5 = document.querySelector('.tripImg5');

const bicycleTripList = document.querySelector('.bicycleTripList')


bicycle.addEventListener('click', function(){
  if(bicycleTripList.style.height != '50rem'){
    bicycleTripList.style.height = `50rem` 
  }
  else{
    bicycleTripList.style.height = '0'
  }

})

tripImg1.addEventListener('click', function(){
  console.log(tripImg1)
  if(bicycleTripList.style.height != '86rem' || tripImg1.style.height!='36rem'){
    bicycleTripList.style.height = `86rem` ;
    tripImg1.style.height = '36rem';
  }
  else if(bicycleTripList.style.height == '86rem' || tripImg1.style.height=='36rem'){
    bicycleTripList.style.height = '50rem'
    tripImg1.style.height = '8rem';

  }

})
tripImg2.addEventListener('click', function(){
  console.log(tripImg1)
  if(bicycleTripList.style.height != '86rem' || tripImg2.style.height!='36rem'){
    bicycleTripList.style.height = `86rem` ;
    tripImg2.style.height = '36rem';
  }
  else if(bicycleTripList.style.height == '86rem' || tripImg2.style.height=='36rem'){
    bicycleTripList.style.height = '50rem'
    tripImg2.style.height = '8rem';

  }

})
tripImg3.addEventListener('click', function(){
  console.log(tripImg1)
  if(bicycleTripList.style.height != '86rem' || tripImg3.style.height!='36rem'){
    bicycleTripList.style.height = `86rem` ;
    tripImg3.style.height = '36rem';
  }
  else if(bicycleTripList.style.height == '86rem' || tripImg3.style.height=='36rem'){
    bicycleTripList.style.height = '50rem'
    tripImg3.style.height = '8rem';

  }

})
tripImg4.addEventListener('click', function(){
  console.log(tripImg1)
  if(bicycleTripList.style.height != '86rem' || tripImg4.style.height!='36rem'){
    bicycleTripList.style.height = `86rem` ;
    tripImg4.style.height = '36rem';
  }
  else if(bicycleTripList.style.height == '86rem' || tripImg4.style.height=='36rem'){
    bicycleTripList.style.height = '50rem'
    tripImg4.style.height = '8rem';

  }

})
tripImg5.addEventListener('click', function(){
  console.log(tripImg1)
  if(bicycleTripList.style.height != '86rem' || tripImg5.style.height!='36rem'){
    bicycleTripList.style.height = `86rem` ;
    tripImg5.style.height = '36rem';
  }
  else if(bicycleTripList.style.height == '86rem' || tripImg5.style.height=='36rem'){
    bicycleTripList.style.height = '50rem'
    tripImg5.style.height = '8rem';

  }

})
//여기까지 자전거


//여기부터 지하철
const subway = document.getElementById('subway');
const subwayTripList = document.querySelector('.subwayTripList')
const subway1 = document.querySelector('.tripImg1-1');
const subway2 = document.querySelector('.tripImg2-1');
const subway3 = document.querySelector('.tripImg3-1');
const subway4 = document.querySelector('.tripImg4-1');
const subway5 = document.querySelector('.tripImg5-1');

subway.addEventListener('click', function(){
  if(subwayTripList.style.height != '50rem'){
    subwayTripList.style.height = `50rem` 
  }
  else{
    subwayTripList.style.height = '0'
  }

})

subway1.addEventListener('click', function(){
  if(subwayTripList.style.height != '86rem' || subway1.style.height!='36rem'){
    subwayTripList.style.height = `86rem` ;
    subway1.style.height = '36rem';
  }
  else if(subwayTripList.style.height == '86rem' || subway1.style.height=='36rem'){
    subwayTripList.style.height = '50rem'
    subway1.style.height = '8rem';

  }

})
subway2.addEventListener('click', function(){
  console.log(tripImg1)
  if(subwayTripList.style.height != '86rem' || subway2.style.height!='36rem'){
    subwayTripList.style.height = `86rem` ;
    subway2.style.height = '36rem';
  }
  else if(subwayTripList.style.height == '86rem' || subway2.style.height=='36rem'){
    subwayTripList.style.height = '50rem'
    subway2.style.height = '8rem';

  }

})
subway3.addEventListener('click', function(){
  console.log(tripImg1)
  if(subwayTripList.style.height != '86rem' || subway3.style.height!='36rem'){
    subwayTripList.style.height = `86rem` ;
    subway3.style.height = '36rem';
  }
  else if(subwayTripList.style.height == '86rem' || subway3.style.height=='36rem'){
    subwayTripList.style.height = '50rem'
    subway3.style.height = '8rem';

  }

})
subway4.addEventListener('click', function(){
  console.log(tripImg1)
  if(subwayTripList.style.height != '86rem' || subway4.style.height!='36rem'){
    subwayTripList.style.height = `86rem` ;
    subway4.style.height = '36rem';
  }
  else if(subwayTripList.style.height == '86rem' || subway4.style.height=='36rem'){
    subwayTripList.style.height = '50rem'
    subway4.style.height = '8rem';

  }

})
subway5.addEventListener('click', function(){
  console.log(tripImg1)
  if(subwayTripList.style.height != '86rem' || subway5.style.height!='36rem'){
    subwayTripList.style.height = `86rem` ;
    subway5.style.height = '36rem';
  }
  else if(subwayTripList.style.height == '86rem' || subway5.style.height=='36rem'){
    subwayTripList.style.height = '50rem'
    subway5.style.height = '8rem';

  }

})
//여기까지 지하철

const walk = document.getElementById('walk');
const walkTripList = document.querySelector('.walkTripList');
const walk1 = document.querySelector('.tripImg1-2');
const walk2 = document.querySelector('.tripImg2-2');
const walk3 = document.querySelector('.tripImg3-2');
const walk4 = document.querySelector('.tripImg4-2');
const walk5 = document.querySelector('.tripImg5-2');

walk.addEventListener('click', function(){
  if(walkTripList.style.height != '50rem'){
    walkTripList.style.height = `50rem` 

  }
  else{
    walkTripList.style.height = '0'
  }

})

walk1.addEventListener('click', function(){
  if(walkTripList.style.height != '86rem' || walk1.style.height!='36rem'){
    walkTripList.style.height = `86rem` ;
    walk1.style.height = '36rem';
  }
  else if(walkTripList.style.height == '86rem' || walk1.style.height=='36rem'){
    walkTripList.style.height = '50rem'
    walk1.style.height = '8rem';

  }

})
walk2.addEventListener('click', function(){
  console.log(tripImg1)
  if(walkTripList.style.height != '86rem' || walk2.style.height!='36rem'){
    walkTripList.style.height = `86rem` ;
    walk2.style.height = '36rem';
  }
  else if(walkTripList.style.height == '86rem' || walk2.style.height=='36rem'){
    walkTripList.style.height = '50rem'
    walk2.style.height = '8rem';

  }

})
walk3.addEventListener('click', function(){
  console.log(tripImg1)
  if(walkTripList.style.height != '86rem' || walk3.style.height!='36rem'){
    walkTripList.style.height = `86rem` ;
    walk3.style.height = '36rem';
  }
  else if(walkTripList.style.height == '86rem' || walk3.style.height=='36rem'){
    walkTripList.style.height = '50rem'
    walk3.style.height = '8rem';

  }

})
walk4.addEventListener('click', function(){
  console.log(tripImg1)
  if(walkTripList.style.height != '86rem' || walk4.style.height!='36rem'){
    walkTripList.style.height = `86rem` ;
    walk4.style.height = '36rem';
  }
  else if(walkTripList.style.height == '86rem' || walk4.style.height=='36rem'){
    walkTripList.style.height = '50rem'
    walk4.style.height = '8rem';

  }

})
walk5.addEventListener('click', function(){
  console.log(tripImg1)
  if(walkTripList.style.height != '86rem' || walk5.style.height!='36rem'){
    walkTripList.style.height = `86rem` ;
    walk5.style.height = '36rem';
  }
  else if(walkTripList.style.height == '86rem' || walk5.style.height=='36rem'){
    walkTripList.style.height = '50rem'
    walk5.style.height = '8rem';

  }

})