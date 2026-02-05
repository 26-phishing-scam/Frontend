import React, { useState, useRef } from 'react';
import {
  Shield,
  AlertTriangle,
  Download,
  Sparkles,
  CreditCard,
  Lock,
  Mail,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

import './Report.css';
import { mockThreats } from './reportData';
import ThreatCard from './components/ThreatCard';
import DetailModal from './components/DetailModal';

export default function Report() {
  const dashboardRef = useRef(null);
  const [selectedThreat, setSelectedThreat] = useState(null);

  const [stats] = useState({
    totalBaits: 47,
    scamsPrevented: 28,
    phishingBlocked: 19,
  });

  const [threats] = useState(mockThreats);
  const scamThreats = threats.filter((t) => t.type === 'scam');
  const phishingThreats = threats.filter((t) => t.type === 'phishing');

  const downloadPDF = async () => {
    const element = dashboardRef.current;
    if (!element) {
      alert('오류: 리포트 영역을 찾을 수 없습니다.');
      return;
    }

    const btn = document.getElementById('save-btn');
    if (btn) btn.style.display = 'none';

    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #b8845f, #a67350)',
      zIndex: '99999',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    });

    overlay.innerHTML = `
      <style>@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }</style>
      <div style="margin-bottom: 30px; animation: bounce 1s infinite;">
         <img src="/icon.png" alt="로딩 중" style="width: 120px; height: 120px; object-fit: contain;" />
      </div>
      <div style="font-size: 24px; font-weight: bold;">리포트 생성 중...</div>
      <div style="font-size: 16px; opacity: 0.9; margin-top: 10px; color: #FFF8E1;">잠시만 기다려주세요 🐾</div>
    `;
    document.body.appendChild(overlay);

    const cloneContainer = document.createElement('div');
    Object.assign(cloneContainer.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '1200px',
      zIndex: '99998',
      height: 'auto',
      overflow: 'visible',
    });
    document.body.appendChild(cloneContainer);

    try {
      const clone = element.cloneNode(true);

      clone.style.background = 'linear-gradient(135deg, #b8845f, #a67350)';

      clone.style.width = '100%';
      clone.style.height = 'auto';
      clone.style.minHeight = '100vh';
      clone.style.margin = '0';
      clone.style.padding = '40px';
      clone.style.boxSizing = 'border-box';
      clone.style.overflow = 'visible';

      const containers = clone.querySelectorAll('.threat-list-container');
      containers.forEach((container) => {
        container.style.height = 'auto';
        container.style.maxHeight = 'none';
        container.style.flex = 'none';
        container.style.overflow = 'visible';
      });

      const scrollables = clone.querySelectorAll(
        '.overflow-y-auto, .custom-scrollbar',
      );
      scrollables.forEach((el) => {
        el.style.height = 'auto';
        el.style.maxHeight = 'none';
        el.style.overflow = 'visible';
        el.style.flex = 'none';
      });

      cloneContainer.appendChild(clone);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const height = clone.scrollHeight;

      const dataUrl = await toPng(clone, {
        cacheBust: true,
        width: 1200,
        height: height,
        pixelRatio: 2,
        style: {
          background: 'linear-gradient(135deg, #b8845f, #a67350)',
        },
      });

      const pdfWidth = 210;
      const pdfHeight = (height * pdfWidth) / 1200;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`피스냥-리포트-${new Date().toLocaleDateString('ko-KR')}.pdf`);
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      if (document.body.contains(cloneContainer))
        document.body.removeChild(cloneContainer);
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
      if (btn) btn.style.display = 'flex';
    }
  };

  return (
    <div className="report-page-bg p-8">
      <div ref={dashboardRef} className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-[#fbbf24] blur-xl opacity-20 rounded-full"></div>
                <img
                  src="/icon.png"
                  alt="피스냥 로고"
                  className="w-20 h-20 object-contain relative z-10 drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
                  피스냥
                </h1>
                <p className="text-sm text-white/90 mt-1 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></span>
                  실시간 피싱·스캠 자동 사냥 중...
                </p>
              </div>
            </div>

            <button
              id="save-btn"
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-white text-[#3E2723] hover:bg-[#fff7ed] px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-bold border border-white/20"
            >
              <Download className="w-5 h-5" />
              리포트 저장
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 1. 오늘 잡은 미끼 (Total) */}
          <div className="bg-[#FFF8F6] rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles className="w-24 h-24 text-[#3E2723]" />
            </div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="bg-[#3E2723] p-2.5 rounded-xl shadow-md">
                <Sparkles
                  className="w-6 h-6 text-[#fbbf24]"
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-lg font-bold text-[#5D4037]">
                오늘 잡은 미끼
              </h3>
            </div>
            <p className="text-5xl font-black text-[#3E2723] relative z-10">
              {stats.totalBaits}
            </p>
            <p className="text-[#8D6E63] text-sm mt-2 font-medium relative z-10">
              위험 요소 차단 완료!
            </p>
          </div>

          {/* 2. 피싱 차단 (Phishing) */}
          <div className="bg-[#FFF8F6] rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <AlertTriangle className="w-24 h-24 text-[#3E2723]" />
            </div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="bg-[#3E2723] p-2.5 rounded-xl shadow-md">
                <AlertTriangle
                  className="w-6 h-6 text-[#fbbf24]"
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-lg font-bold text-[#5D4037]">피싱 차단</h3>
            </div>
            <p className="text-5xl font-black text-[#3E2723] relative z-10">
              {stats.phishingBlocked}
            </p>
            <p className="text-[#8D6E63] text-sm mt-2 font-medium relative z-10">
              낚시 시도 탐지 완료
            </p>
          </div>

          {/* 3. 스캠 예방 (Scam) */}
          <div className="bg-[#FFF8F6] rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield className="w-24 h-24 text-[#3E2723]" />
            </div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="bg-[#3E2723] p-2.5 rounded-xl shadow-md">
                <Shield className="w-6 h-6 text-[#fbbf24]" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-[#5D4037]">스캠 예방</h3>
            </div>
            <p className="text-5xl font-black text-[#3E2723] relative z-10">
              {stats.scamsPrevented}
            </p>
            <p className="text-[#8D6E63] text-sm mt-2 font-medium relative z-10">
              사기 시도 원천 차단
            </p>
          </div>
        </div>

        {/* Threat Lists (좌: 피싱, 우: 스캠) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Phishing List (왼쪽) */}
          <div className="threat-list-container list-phishing">
            {/* 배경 워터마크 */}
            <AlertTriangle className="watermark-icon text-[#f59e0b]" />

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#fcd34d]/30 relative z-10">
              <div className="p-3 rounded-2xl list-header-icon">
                <AlertTriangle className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#3E2723]">
                  피싱 (낚시)
                </h2>
                <p className="text-sm text-[#92400e] font-medium">
                  가짜 사이트 / 계정 탈취 시도
                </p>
              </div>
              <span className="ml-auto bg-[#3E2723] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {phishingThreats.length}건
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar relative z-10">
              {phishingThreats.map((threat) => (
                <ThreatCard
                  key={threat.id}
                  threat={threat}
                  onClick={setSelectedThreat}
                />
              ))}
            </div>
          </div>

          {/* Scam List (오른쪽) */}
          <div className="threat-list-container list-scam">
            {/* 배경 워터마크 */}
            <Shield className="watermark-icon text-[#f43f5e]" />

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#fda4af]/30 relative z-10">
              <div className="p-3 rounded-2xl list-header-icon">
                <Shield className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#3E2723]">
                  스캠 (사기)
                </h2>
                <p className="text-sm text-[#9f1239] font-medium">
                  금전 요구 / 허위 당첨 / 사기
                </p>
              </div>
              <span className="ml-auto bg-[#3E2723] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {scamThreats.length}건
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar relative z-10">
              {scamThreats.map((threat) => (
                <ThreatCard
                  key={threat.id}
                  threat={threat}
                  onClick={setSelectedThreat}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-[#2D1B15]/30 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/icon.png"
              alt="피스냥"
              className="w-10 h-10 object-contain drop-shadow"
            />
            <h2 className="text-3xl font-black text-white tracking-tight">
              피스냥 안전 팁 🐱
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-b-4 border-[#fb7185]">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#fff1f2] p-2.5 rounded-xl">
                  <CreditCard className="w-6 h-6 text-[#f43f5e]" />
                </div>
                <h3 className="text-lg font-black text-[#3E2723]">
                  카드 정보 주의!
                </h3>
              </div>
              <p className="text-sm text-[#57534e] font-medium leading-relaxed">
                이메일이나 문자로 카드 정보를{' '}
                <span className="text-[#e11d48] font-bold">
                  절대 입력하지 마세요!
                </span>{' '}
                공식 앱을 이용하는 것이 안전합니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-b-4 border-[#fbbf24]">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#fffbeb] p-2.5 rounded-xl">
                  <Lock className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <h3 className="text-lg font-black text-[#3E2723]">
                  URL 확인하기
                </h3>
              </div>
              <p className="text-sm text-[#57534e] font-medium leading-relaxed">
                의심스러운 URL은 클릭하지 말고,{' '}
                <span className="text-[#d97706] font-bold">
                  즐겨찾기나 검색
                </span>
                을 통해 공식 사이트를 직접 방문하세요!
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-b-4 border-[#34d399]">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#ecfdf5] p-2.5 rounded-xl">
                  <Mail className="w-6 h-6 text-[#10b981]" />
                </div>
                <h3 className="text-lg font-black text-[#3E2723]">
                  출처 확인 필수
                </h3>
              </div>
              <p className="text-sm text-[#57534e] font-medium leading-relaxed">
                가족이나 지인을 사칭하며 급하게 송금을 요구하는 메시지는{' '}
                <span className="text-[#059669] font-bold">
                  전화로 직접 확인
                </span>
                하세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <DetailModal
        threat={selectedThreat}
        onClose={() => setSelectedThreat(null)}
      />
    </div>
  );
}
