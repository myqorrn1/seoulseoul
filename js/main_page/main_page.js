// 카드 데이터를 객체로 정의
const cardData = {
  card1: {
    image: "/src/image/main_page/seoulcardimg1.png",
    title: "관악별빛산책",
    date: "2024.11.11 ~ 2025.02.09",
    location: "별빛내린천",
    description: "3개월동안 진행되는 관악별빛 산책",
  },
  card2: {
    image: "/src/image/main_page/seoulcardimg2.png",
    title: "서울밤하늘산책",
    date: "2025.01.01 ~ 2025.03.01",
    location: "서울숲",
    description: "서울의 아름다운 밤하늘을 산책",
  },
  card3: {
    image: "/src/image/main_page/seoulcardimg3.png",
    title: "한강별빛산책",
    date: "2025.02.01 ~ 2025.04.01",
    location: "한강공원",
    description: "한강을 따라 별빛 산책을 즐겨보세요",
  },
  card4: {
    image: "/src/image/main_page/seoulcardimg4.png",
    title: "도심별빛산책",
    date: "2025.03.01 ~ 2025.05.01",
    location: "도심지",
    description: "도심에서 별빛 산책을 즐기세요",
  },
  card5: {
    image: "/src/image/main_page/seoulcardimg5.png",
    title: "서울여행산책",
    date: "2025.04.01 ~ 2025.06.01",
    location: "서울여행",
    description: "서울을 여행하며 산책",
  },
  card6: {
    image: "/src/image/main_page/seoulcardimg6.png",
    title: "자연별빛산책",
    date: "2025.05.01 ~ 2025.07.01",
    location: "자연속",
    description: "자연 속에서 별빛 산책",
  },
  card7: {
    image: "/src/image/main_page/seoulcardimg7.png",
    title: "자연별빛산책",
    date: "2025.05.01 ~ 2025.07.01",
    location: "자연속",
    description: "자연 속에서 별빛 산책",
  },
  card8: {
    image: "/src/image/main_page/seoulcardimg8.png",
    title: "자연별빛산책",
    date: "2025.05.01 ~ 2025.07.01",
    location: "자연속",
    description: "자연 속에서 별빛 산책",
  },
};

// 플립 카드 생성 함수
function createFlipCard(card) {
  const flip = document.createElement("div");
  flip.classList.add("flip");

  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const front = document.createElement("div");
  front.classList.add("front");

  const img = document.createElement("img");
  img.src = card.image;
  img.alt = card.title;
  front.appendChild(img);

  const back = document.createElement("div");
  back.classList.add("back");

  const titleDiv = document.createElement("div");
  titleDiv.style.fontSize = "large";
  titleDiv.style.fontWeight = "bold";
  titleDiv.textContent = card.title;

  const dateDiv = document.createElement("div");
  dateDiv.textContent = card.date;

  const locationDiv = document.createElement("div");
  locationDiv.textContent = card.location;

  const descriptionDiv = document.createElement("div");
  descriptionDiv.textContent = card.description;

  back.append(titleDiv, dateDiv, locationDiv, descriptionDiv);
  cardElement.append(front, back);
  flip.appendChild(cardElement);

  return flip;
}

// 슬라이더에 카드 추가
const article = document.querySelector(".card-slider");
for (const cardKey in cardData) {
  const flipCard = createFlipCard(cardData[cardKey]);
  article.appendChild(flipCard);
}

// 슬라이드 버튼 동작
let currentIndex = 0; // 현재 카드의 인덱스

// 오른쪽 버튼 클릭 시
document.querySelector(".next-btn").addEventListener("click", () => {
  const totalCards = Object.keys(cardData).length; // 카드 총 개수
  const slideContainer = document.querySelector(".card-slider");

  // 슬라이드 크기를 설정하여 한 번에 보이는 카드 개수 (예: 한 번에 4개 카드)
  const cardWidth = 210; // 카드 한 개의 너비
  const visibleCards = 2; // 한 번에 보이는 카드 수
  const maxIndex = totalCards - visibleCards; // 최대 인덱스 (슬라이드 끝)

  if (currentIndex < maxIndex) {
    currentIndex++; // 한 번에 카드 하나씩 이동
    slideContainer.style.transform = `translateX(-${
      currentIndex * cardWidth
    }px)`; // 200px 만큼 슬라이드 이동
  }

  // 오른쪽 버튼 비활성화 (슬라이드 끝)
  if (currentIndex >= maxIndex) {
    document.querySelector(".next-btn").disabled = true;
  }

  // 왼쪽 버튼 활성화
  document.querySelector(".prev-btn").disabled = false;
});

// 왼쪽 버튼 클릭 시
document.querySelector(".prev-btn").addEventListener("click", () => {
  const slideContainer = document.querySelector(".card-slider");

  if (currentIndex > 0) {
    currentIndex--; // 한 번에 카드 하나씩 이동
    slideContainer.style.transform = `translateX(-${currentIndex * 210}px)`; // 200px 만큼 슬라이드 이동
  }

  // 왼쪽 버튼 비활성화 (슬라이드 처음)
  if (currentIndex === 0) {
    document.querySelector(".prev-btn").disabled = true;
  }

  // 오른쪽 버튼 활성화
  document.querySelector(".next-btn").disabled = false;
});

/* -------------------------------------- */
// 추천 이미지 상시로 하나 열려있는 코드
const containers = document.querySelectorAll(".image-container");

containers[0].classList.add("active");

containers.forEach((container) => {
  container.addEventListener("mouseover", () => {
    // 모든 컨테이너에서 active 제거
    containers.forEach((c) => c.classList.remove("active"));

    // 클릭한 컨테이너에 active 추가
    container.classList.add("active");
  });
});

/* --------------------------------------------- */
var topButton = document.getElementById("toTop");

// 사용자가 스크롤할 때 실행되는 함수
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.opacity = "1"; // 스크롤 위치가 20px 이상일 때 버튼 표시
  } else {
    topButton.style.opacity = "0"; // 그 외에는 버튼 숨김
  }
}

// 버튼 클릭 시 페이지 맨 위로 스무스하게 이동하는 함수
topButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
