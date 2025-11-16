
import React from 'react';

// Fix: Extracted inline styles to constants to improve readability and resolve a potential JSX parsing issue.
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

const Section = ({ title, children, className = '' }) => (
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

const ViewMode = ({ data }) => {
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

export default ViewMode;