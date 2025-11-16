
import React, { useState, useEffect } from 'react';
import EditMode from './components/EditMode.tsx';
import ViewMode from './components/ViewMode.tsx';
import { EditIcon, ViewIcon, ShareIcon } from './components/icons.tsx';
import type { BulletinData } from './types.ts';

const initialBulletinData: BulletinData = {
  main: {
    issue: "제26-46호",
    date: "2025.11.16",
    time: "10:00AM",
  },  
  about: {
    title: "라온은",
    body: "'즐거운'이라는 뜻을 가진 순 우리말 입니다.\n곧 “함께 즐거운 삶을 지향하는 교회공동체”를 의미하는 것입니다.\n\n이것은,\n첫째, 하나님과 동행하며 즐거움을 누리는 교회\n둘째, 성도가 동행하며 즐거움을 누리는 교회\n셋째, 세상에서 소금과 빛의 역할을 세상과 동행하며 즐거움을 누리는 교회라는 의미를 담고 있으며,\n\n우리교회의 가장 기본적인 바탕이 되는 신조이자, 마지막까지 지켜내야 할 사명입니다.",
  },
  worshipOrder: [
    { item: "주기도문" },
    { item: "경배와 찬양", subitem: "참회와 중보기도", person: "이동현" },
    { item: "예배를 위한 기도", person: "박영애" },
    { item: "성경동화 이야기", person: "이주예, 오승하" },
    { item: "다음세대말씀", subitem: "데살로니가전서 5장 16-18", person: "박영애", subperson: "감사의 조건?!" },
    { item: "말씀선포", subitem: "로마서 13장 1-7절", person: "이광복", subperson: "권세와 사랑 사이에서" },
    { item: "신앙고백" },
    { item: "결단찬송", subitem: "우린 어둠이었으나" },
    { item: "헌금기도 및 축도", person: "이광복 목사" },
    { item: "성도의 교제" },
  ],
  hymn: {
    title: "우린 어둠이었으나",
    musicSheet: null,
  },
  news: {
    title: "*기도회 요일 : 금 7시",
    items: [
      { date: "11월 11일(화)", event: "부천방회 소사 감찰모임" },
      { date: "11월 30일(주일)", event: "추수감사주일" },
      { date: "12월 8일(월)", event: "부천방회 교역자회" },
      { date: "12월 25일(목)", event: "성탄절" },
      { date: "12월 31일(수)", event: "송구영신예배" },
      { date: "1월 4일(주일)", event: "사무총회" },
      { date: "3시 30분", event: "부천방회 신년연합성회" },
    ],
  },
  finance: {
    reports: [
      { item: "씨앗헌금잔액", amount: "4,201,023" },
      { item: "선교와 섬김", amount: "15,399,400" },
      { item: "라온트리 지원금", amount: "13,200,000" },
      { item: "일반재정 수입", amount: "8,466,851" },
      { item: "일반재정 지출", amount: "9,136,088" },
      { item: "일반재정 잔액", amount: "-669,237" },
    ],
    account: {
      bank: "국민은행",
      number: "238501-04-288321",
      holder: "기독교대한성결교회라온동행교회",
    },
  },
  missionaries: {
    title: "선교사를 위한 중보",
    quote: "“가정사역을 위해”",
    items: [
      { country: "미얀마", names: "김병훈, 이정아" },
      { country: "헝가리", names: "한이삭, 변찬은" },
      { country: "동티모르", names: "손현성, 이경호" },
      { country: "몽 골", names: "이정형, 김소연" },
      { country: "중 국", names: "오소원, 유수연" },
      { country: "방글라데시", names: "전민수, 이은영" },
      { country: "라오스", names: "김종한, 김윤숙" },
    ],
  },
  schedule: {
    title: "설교 및 기도 순서",
    weekly: [
      { date: "11월 16일", prayer: "박영애", sermon: "박영애" },
      { date: "11월 23일", prayer: "윤혜영", sermon: "안현진" },
      { date: "11월 30일", prayer: "지하연", sermon: "안지선" },
      { date: "12월 7일", prayer: "김준호", sermon: "이광진" },
    ],
    prayerList: "기도순서 : 17명(나이순)\n홍윤희, 박상민, 정미경, 오상석, 강윤정, 최동호, 이동현, 임성호, 이광진, 안지선, 안현진, 박영애, 윤혜영, 지하연, 김준호, 박정탁, 오승현",
    sermonList: "설교순서 : 12명(나이역순)\n박정탁, 김준호, 지하연, 윤혜영, 박영애, 안현진, 안지선, 이광진, 최동호, 강윤정, 오상석, 정미경",
  },
};


const App = () => {
  const [bulletinData, setBulletinData] = useState<BulletinData>(initialBulletinData);
  const [isEditing, setIsEditing] = useState(true);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');

    if (data) {
      try {
        const decodedData = decodeURIComponent(atob(data));
        const parsedData = JSON.parse(decodedData);
        setBulletinData(parsedData);
        setIsEditing(false);
        window.history.replaceState({}, '', window.location.pathname);
      } catch (error) {
        console.error("Failed to parse bulletin data from URL:", error);
      }
    }
  }, []);

  const handleShare = async () => {
    try {
      const dataString = JSON.stringify(bulletinData);
      const encodedData = btoa(encodeURIComponent(dataString));
      const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
      
      await navigator.clipboard.writeText(shareUrl);
      
      setShowCopyMessage(true);
      setTimeout(() => {
        setShowCopyMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy share link:", error);
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {isEditing ? (
          <EditMode data={bulletinData} setData={setBulletinData} />
        ) : (
          <ViewMode data={bulletinData} />
        )}
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col-reverse items-center space-y-3 space-y-reverse">
        {showCopyMessage && (
          <div className="bg-gray-800 text-white text-sm py-2 px-4 rounded-md shadow-lg" role="alert">
              링크가 복사되었습니다!
          </div>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
          aria-label={isEditing ? '보기 모드로 전환' : '수정 모드로 전환'}
        >
          {isEditing ? <ViewIcon /> : <EditIcon />}
        </button>
        <button
          onClick={handleShare}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
          aria-label="공유 링크 복사"
        >
          <ShareIcon />
        </button>
      </div>
    </div>
  );
};

export default App;