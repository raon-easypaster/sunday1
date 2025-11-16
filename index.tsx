// All types, components, and application logic are consolidated into this single file.
// This removes the need for module imports/exports, resolving deployment issues.
// React and ReactDOM are available as global variables from the UMD scripts in index.html.

// FIX: Add imports for React and ReactDOM to fix module-related errors.
import React from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPE DEFINITIONS ---
interface WorshipOrderItem {
  item: string;
  subitem?: string;
  person?: string;
  subperson?: string;
}

interface NewsItem {
  date: string;
  event: string;
}

interface FinanceReportItem {
  item: string;
  amount: string;
}

interface MissionaryItem {
  country: string;
  names: string;
}

interface WeeklyScheduleItem {
  date: string;
  prayer: string;
  sermon: string;
}

interface BulletinData {
  main: {
    issue: string;
    date: string;
    time: string;
  };
  about: {
    title: string;
    body: string;
  };
  worshipOrder: WorshipOrderItem[];
  hymn: {
    title: string;
    musicSheet: string | null;
  };
  news: {
    title: string;
    items: NewsItem[];
  };
  finance: {
    reports: FinanceReportItem[];
    account: {
      bank: string;
      number: string;
      holder: string;
    };
  };
  missionaries: {
    title: string;
    quote: string;
    items: MissionaryItem[];
  };
  schedule: {
    title: string;
    weekly: WeeklyScheduleItem[];
    prayerList: string;
    sermonList: string;
  };
}

// --- ICON COMPONENTS ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);


// --- VIEWMODE COMPONENT ---
const churchLogoPStyle = { color: '#F2A03D' };
const churchLogoSpanStyle = { color: '#585858' };

const ChurchLogo = () => (
  <div className="text-right">
    <div className="inline-block">
      <p className="font-oswald text-xl sm:text-2xl font-bold" style={churchLogoPStyle}>RAON<span className="font-sans" style={churchLogoSpanStyle}>동행</span></p>
      <p className="stencil-text text-3xl sm:text-4xl -mt-2">CHURCH</p>
    </div>
  </div>
);

const Section = ({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string; }) => (
  <div className={`bg-white p-4 md:p-8 mb-8 shadow-lg rounded-lg ${className}`}>
    <div className="flex justify-between items-start mb-6">
      <h2 className="text-3xl md:text-4xl font-black text-gray-700">{title}</h2>
      <div className="flex-shrink-0 -mt-2">
        <ChurchLogo />
      </div>
    </div>
    {children}
  </div>
);

const ViewMode = ({ data }: { data: BulletinData }) => {
  return (
    <div className="text-gray-800">
      {/* Page 1: Main Cover */}
      <div className="bg-white p-4 md:p-8 mb-8 shadow-lg rounded-lg text-center flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-700">모든세대<span className="font-light">예배</span></h1>
        <p className="stencil-text text-6xl sm:text-8xl lg:text-9xl my-4">{data.main.time}</p>
        <div className="bg-orange-500 text-white text-base md:text-lg font-medium py-1 px-6 md:px-8 inline-block rounded">
          {data.main.issue} {data.main.date}
        </div>
        <div className="mt-12">
            <p className="font-oswald text-4xl sm:text-5xl font-bold" style={{ color: '#F2A03D' }}>RAON<span className="font-sans font-black text-gray-700">동행</span></p>
            <p className="stencil-text text-6xl sm:text-8xl -mt-4">CHURCH</p>
        </div>
      </div>

      {/* Page 2: About */}
      <Section title={data.about.title}>
        <p className="whitespace-pre-wrap text-base md:text-lg leading-relaxed text-gray-600">{data.about.body}</p>
      </Section>

      {/* Page 3: Worship Order */}
      <Section title="예배순서">
        <div className="space-y-4">
          {data.worshipOrder.map((o, i) => (
            <div key={i} className="flex justify-between items-start text-lg md:text-xl">
              <div className="flex-1 pr-4">
                <p className="font-bold">{o.item}</p>
                {o.subitem && <p className="text-gray-500 text-sm md:text-base pl-2">{o.subitem}</p>}
              </div>
              <div className="w-2/5 text-right">
                <p className="font-medium">{o.person}</p>
                {o.subperson && <p className="text-gray-500 text-sm md:text-base">{o.subperson}</p>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Page 4: Hymn */}
      <Section title={data.hymn.title}>
        {data.hymn.musicSheet ? (
          <img src={data.hymn.musicSheet} alt={data.hymn.title} className="w-full h-auto rounded-md" />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
            <p className="text-gray-500">악보 이미지가 없습니다.</p>
          </div>
        )}
      </Section>

      {/* Page 5: News & Finance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 md:p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl md:text-4xl font-black text-gray-700 mb-4">소식</h2>
          <p className="text-orange-600 font-semibold mb-6">{data.news.title}</p>
          <div className="space-y-3">
            {data.news.items.map((n, i) => (
              <div key={i} className="flex items-baseline border-b border-dotted pb-2 text-sm md:text-base">
                <p className="w-2/5 md:w-1/3 text-gray-600">{n.date}</p>
                <p className="flex-1 font-medium">{n.event}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 md:p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl md:text-4xl font-black text-gray-700 mb-6">재정</h2>
          <div className="space-y-2 mb-6">
            {data.finance.reports.map((r, i) => (
              <div key={i} className="flex justify-between items-center text-base md:text-lg">
                <p>{r.item}</p>
                <p className={`font-bold font-sans ${r.amount.startsWith('-') ? 'text-red-500' : 'text-blue-600'}`}>{r.amount}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
             <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">헌금<span className="font-light">계좌</span></h3>
             <div className="text-right text-base md:text-lg">
                <p>{data.finance.account.bank} {data.finance.account.number}</p>
                <p className="text-gray-600">{data.finance.account.holder}</p>
             </div>
          </div>
        </div>
      </div>
      
      {/* Page 6: Missionaries */}
      <Section title={data.missionaries.title}>
        <p className="text-center text-2xl md:text-3xl font-medium text-blue-600 mb-8">{data.missionaries.quote}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-center">
            {data.missionaries.items.map((m, i) => (
                <div key={i}>
                    <p className="text-2xl md:text-3xl font-extrabold">{m.country}</p>
                    <p className="text-base md:text-lg text-gray-600 mt-1">{m.names}</p>
                </div>
            ))}
        </div>
      </Section>

      {/* Page 7: Schedule */}
      <Section title={data.schedule.title}>
        <div className="space-y-4 mb-8">
            {data.schedule.weekly.map((s, i) => (
                <div key={i} className="md:flex md:items-center text-base md:text-xl border-b border-dotted pb-2">
                    <p className="font-bold md:w-1/3">{s.date}</p>
                    <p className="md:w-1/3 mt-1 md:mt-0">기도: <span className="font-normal">{s.prayer}</span></p>
                    <p className="md:w-1/3 mt-1 md:mt-0">말씀: <span className="font-normal">{s.sermon}</span></p>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 leading-relaxed text-sm md:text-base">
            <div className="bg-gray-50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{data.schedule.prayerList}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{data.schedule.sermonList}</p>
            </div>
        </div>
      </Section>

    </div>
  );
};


// --- EDITMODE COMPONENT ---
const EditMode = ({ data, setData }: { data: BulletinData, setData: React.Dispatch<React.SetStateAction<BulletinData>> }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [section, field, subfield] = name.split('.');
    
    setData((prev) => {
        const newPrev = JSON.parse(JSON.stringify(prev)); // Deep copy to avoid mutation issues
        if (subfield) {
            newPrev[section][field][subfield] = value;
        } else {
            newPrev[section][field] = value;
        }
        return newPrev;
    });
  };

  const handleArrayChange = (section: keyof BulletinData, index: number, field: string, value: string) => {
      setData((prev) => {
        const newPrev = JSON.parse(JSON.stringify(prev)); // Deep copy
        const sectionData = newPrev[section];

        const updateArray = (arr: any[]) => {
          arr[index] = { ...arr[index], [field]: value };
          return arr;
        };
        
        if (Array.isArray(sectionData)) {
            newPrev[section] = updateArray(sectionData);
        } else if (typeof sectionData === 'object' && sectionData !== null) {
           if ('items' in sectionData && Array.isArray((sectionData as any).items)) {
             (sectionData as any).items = updateArray((sectionData as any).items);
           }
           if ('reports' in sectionData && Array.isArray((sectionData as any).reports)) {
             (sectionData as any).reports = updateArray((sectionData as any).reports);
           }
            if ('weekly' in sectionData && Array.isArray((sectionData as any).weekly)) {
             (sectionData as any).weekly = updateArray((sectionData as any).weekly);
           }
        }
        return newPrev;
      });
  };

  const handleHymnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setData((prev) => ({
          ...prev,
          hymn: { ...prev.hymn, musicSheet: event.target?.result as string }
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500";
  const textareaClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[120px]";
  const fieldsetClass = "mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md";
  const legendClass = "text-xl md:text-2xl font-bold text-gray-700 mb-4 pb-2 border-b-2 border-orange-500";
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-black text-center text-gray-800">주보 내용 수정</h1>
      
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>메인 정보</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-600">발행 호수</label><input type="text" name="main.issue" value={data.main.issue} onChange={handleTextChange} className={inputClass} /></div>
          <div><label className="block text-sm font-medium text-gray-600">날짜</label><input type="text" name="main.date" value={data.main.date} onChange={handleTextChange} className={inputClass} /></div>
          <div><label className="block text-sm font-medium text-gray-600">예배 시간</label><input type="text" name="main.time" value={data.main.time} onChange={handleTextChange} className={inputClass} /></div>
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>교회 소개</legend>
        <div><label className="block text-sm font-medium text-gray-600">소개글 제목</label><input type="text" name="about.title" value={data.about.title} onChange={handleTextChange} className={inputClass} /></div>
        <div className="mt-4"><label className="block text-sm font-medium text-gray-600">소개글 본문</label><textarea name="about.body" value={data.about.body} onChange={handleTextChange} className={textareaClass}></textarea></div>
      </fieldset>
      
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>예배 순서</legend>
        <div className="space-y-4">
          {data.worshipOrder.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="항목" value={item.item} onChange={(e) => handleArrayChange('worshipOrder', index, 'item', e.target.value)} className={inputClass} />
                <input type="text" placeholder="담당자" value={item.person || ''} onChange={(e) => handleArrayChange('worshipOrder', index, 'person', e.target.value)} className={inputClass} />
                <input type="text" placeholder="소항목" value={item.subitem || ''} onChange={(e) => handleArrayChange('worshipOrder', index, 'subitem', e.target.value)} className={inputClass} />
                <input type="text" placeholder="소항목 담당/설명" value={item.subperson || ''} onChange={(e) => handleArrayChange('worshipOrder', index, 'subperson', e.target.value)} className={inputClass} />
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>결단 찬송</legend>
        <div><label className="block text-sm font-medium text-gray-600">찬송 제목</label><input type="text" name="hymn.title" value={data.hymn.title} onChange={handleTextChange} className={inputClass} /></div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">악보 이미지 업로드</label>
          <input type="file" accept="image/*" onChange={handleHymnImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"/>
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>소식</legend>
        <div><label className="block text-sm font-medium text-gray-600">소식 상단 제목</label><input type="text" name="news.title" value={data.news.title} onChange={handleTextChange} className={inputClass} /></div>
         <div className="space-y-2 mt-4">
          {data.news.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="날짜" value={item.date} onChange={(e) => handleArrayChange('news', index, 'date', e.target.value)} className={inputClass} />
                <input type="text" placeholder="이벤트" value={item.event} onChange={(e) => handleArrayChange('news', index, 'event', e.target.value)} className={inputClass} />
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>재정</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.finance.reports.map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 items-center">
                    <input type="text" placeholder="항목" value={item.item} onChange={(e) => handleArrayChange('finance', index, 'item', e.target.value)} className={inputClass} />
                    <input type="text" placeholder="금액" value={item.amount} onChange={(e) => handleArrayChange('finance', index, 'amount', e.target.value)} className={inputClass} />
                </div>
            ))}
        </div>
        <div className="mt-6 border-t pt-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" name="finance.account.bank" placeholder="은행" value={data.finance.account.bank} onChange={handleTextChange} className={inputClass} />
                <input type="text" name="finance.account.number" placeholder="계좌번호" value={data.finance.account.number} onChange={handleTextChange} className={inputClass} />
                <input type="text" name="finance.account.holder" placeholder="예금주" value={data.finance.account.holder} onChange={handleTextChange} className={inputClass} />
            </div>
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>선교사 중보</legend>
        <div><label className="block text-sm font-medium text-gray-600">기도 제목</label><input type="text" name="missionaries.quote" value={data.missionaries.quote} onChange={handleTextChange} className={inputClass} /></div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {data.missionaries.items.map((item, index) => (
            <div key={index} className="space-y-2">
                <input type="text" placeholder="국가" value={item.country} onChange={(e) => handleArrayChange('missionaries', index, 'country', e.target.value)} className={inputClass} />
                <input type="text" placeholder="이름" value={item.names} onChange={(e) => handleArrayChange('missionaries', index, 'names', e.target.value)} className={inputClass} />
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>설교 및 기도 순서</legend>
        <div className="space-y-2">
            {data.schedule.weekly.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="날짜" value={item.date} onChange={(e) => handleArrayChange('schedule', index, 'date', e.target.value)} className={inputClass} />
                    <input type="text" placeholder="기도" value={item.prayer} onChange={(e) => handleArrayChange('schedule', index, 'prayer', e.target.value)} className={inputClass} />
                    <input type="text" placeholder="말씀" value={item.sermon} onChange={(e) => handleArrayChange('schedule', index, 'sermon', e.target.value)} className={inputClass} />
                </div>
            ))}
        </div>
        <div className="mt-4"><label className="block text-sm font-medium text-gray-600">기도 순서 명단</label><textarea name="schedule.prayerList" value={data.schedule.prayerList} onChange={handleTextChange} className={textareaClass}></textarea></div>
        <div className="mt-4"><label className="block text-sm font-medium text-gray-600">설교 순서 명단</label><textarea name="schedule.sermonList" value={data.schedule.sermonList} onChange={handleTextChange} className={textareaClass}></textarea></div>
      </fieldset>
    </div>
  );
};


// --- MAIN APP COMPONENT ---
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
  const [bulletinData, setBulletinData] = React.useState(initialBulletinData);
  const [isEditing, setIsEditing] = React.useState(true);
  const [showCopyMessage, setShowCopyMessage] = React.useState(false);

  React.useEffect(() => {
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


// --- MOUNT THE APPLICATION ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);