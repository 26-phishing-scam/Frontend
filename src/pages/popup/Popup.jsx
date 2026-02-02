import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

import './Popup.css';
import { initialDomains, initialEvents } from './popupData';
import PopupHeader from './components/PopupHeader';
import ControlPanel from './components/ControlPanel';
import DomainList from './components/DomainList';
import ActivityList from './components/ActivityList';

export default function Popup() {
  const [status, setStatus] = useState('active');
  const [domains, setDomains] = useState(initialDomains);
  const [events, setEvents] = useState(initialEvents);

  const [isDomainsOpen, setIsDomainsOpen] = useState(true);
  const [isEventsOpen, setIsEventsOpen] = useState(true);

  // 리포트 페이지 열기 (새 창 팝업 모드)
  const handleOpenReport = () => {
    if (typeof chrome !== 'undefined' && chrome.windows) {
      const reportUrl = chrome.runtime.getURL('report.html');
      chrome.windows.create({
        url: reportUrl,
        type: 'popup',
        width: 1200,
        height: 850,
        focused: true,
      });
    } else {
      window.open(
        '/report.html',
        'PeaceNyangReport',
        'width=1200,height=850,scrollbars=yes',
      );
    }
  };

  const handleReset = () => {
    if (window.confirm('피스냥의 사냥 기록을 초기화 하시겠습니까?')) {
      setDomains([]);
      setEvents([]);
    }
  };

  return (
    <div className="popup-container custom-scrollbar">
      {/* 1. 헤더 */}
      <PopupHeader status={status} />

      {/* 2. 컨트롤 패널 */}
      <ControlPanel
        status={status}
        setStatus={setStatus}
        onReset={handleReset}
      />

      {/* 3. 도메인 리스트 */}
      <DomainList
        domains={domains}
        isOpen={isDomainsOpen}
        toggle={() => setIsDomainsOpen(!isDomainsOpen)}
      />

      {/* 4. 활동 리스트 */}
      <ActivityList
        events={events}
        isOpen={isEventsOpen}
        toggle={() => setIsEventsOpen(!isEventsOpen)}
      />

      {/* 5. 리포트 이동 버튼 */}
      <button onClick={handleOpenReport} className="report-btn">
        <span>상세 리포트 보기</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}
