
import React from 'react';

const EditMode = ({ data, setData }) => {
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    const [section, field, subfield] = name.split('.');
    
    if (subfield) {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: {
                    ...prev[section][field],
                    [subfield]: value
                }
            }
        }));
    } else {
        setData(prev => ({
          ...prev,
          [section]: { ...prev[section], [field]: value }
        }));
    }
  };

  const handleArrayChange = (section, index, field, value) => {
      setData(prev => {
        const sectionData = prev[section];

        const updateArray = (arr) => {
          const newArray = [...arr];
          newArray[index] = { ...newArray[index], [field]: value };
          return newArray;
        };

        if (Array.isArray(sectionData)) {
            return { ...prev, [section]: updateArray(sectionData) };
        } else if (typeof sectionData === 'object' && sectionData !== null) {
           if ('items' in sectionData && Array.isArray(sectionData.items)) {
             return { ...prev, [section]: { ...sectionData, items: updateArray(sectionData.items) } };
           }
           if ('reports' in sectionData && Array.isArray(sectionData.reports)) {
             return { ...prev, [section]: { ...sectionData, reports: updateArray(sectionData.reports) } };
           }
            if ('weekly' in sectionData && Array.isArray(sectionData.weekly)) {
             return { ...prev, [section]: { ...sectionData, weekly: updateArray(sectionData.weekly) } };
           }
        }
        return prev;
      });
  };

  const handleHymnImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setData(prev => ({
          ...prev,
          hymn: { ...prev.hymn, musicSheet: event.target?.result }
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

export default EditMode;