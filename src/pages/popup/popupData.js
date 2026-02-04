// 초기 도메인 데이터 (스크롤 테스트용 15개)
export const initialDomains = [
  { id: 1, url: 'naver.com', safe: true, time: '방금 전' },
  { id: 2, url: 'google.com', safe: true, time: '2분 전' },
  { id: 3, url: 'fake-navor-login.xyz', safe: false, time: '5분 전' },
  { id: 4, url: 'github.com', safe: true, time: '12분 전' },
  { id: 5, url: 'woori-bank-update.net', safe: false, time: '15분 전' },
  { id: 6, url: 'coupang.com', safe: true, time: '22분 전' },
  { id: 7, url: 'free-lotto-win.vip', safe: false, time: '30분 전' },
  { id: 8, url: 'notion.so', safe: true, time: '45분 전' },
  { id: 9, url: 'apple-id-verify.cc', safe: false, time: '1시간 전' },
  { id: 10, url: 'youtube.com', safe: true, time: '1시간 전' },
  { id: 11, url: 'netflix-payment-error.info', safe: false, time: '2시간 전' },
  { id: 12, url: 'kakao.com', safe: true, time: '2시간 전' },
  { id: 13, url: 'bitcoin-giveaway.org', safe: false, time: '3시간 전' },
  { id: 14, url: 'stackoverflow.com', safe: true, time: '4시간 전' },
  { id: 15, url: 'delivery-tracker-fake.com', safe: false, time: '5시간 전' },
];

// 초기 이벤트 데이터 (스크롤 테스트용 10개)
export const initialEvents = [
  {
    id: 1,
    type: 'scam',
    msg: '피스냥이 경품 사기 사이트를 차단했어요!',
    time: '14:20',
  },
  {
    id: 2,
    type: 'phishing',
    msg: '네이버 로그인 위장 페이지 감지됨',
    time: '13:45',
  },
  {
    id: 3,
    type: 'phishing',
    msg: '해외 결제 승인 문자 스미싱 주의',
    time: '12:30',
  },
  { id: 4, type: 'scam', msg: '불법 도박 사이트 접속 차단', time: '11:15' },
  {
    id: 5,
    type: 'phishing',
    msg: '택배 주소지 변경 요청 피싱 감지',
    time: '10:40',
  },
  { id: 6, type: 'scam', msg: '암호화폐 무료 지급 사기 사이트', time: '09:55' },
  { id: 7, type: 'phishing', msg: '금융감독원 사칭 팝업 차단', time: '09:10' },
  {
    id: 8,
    type: 'phishing',
    msg: '구글 계정 보안 경고 위장 메일',
    time: '08:25',
  },
  { id: 9, type: 'scam', msg: '선착순 무료 이모티콘 사기 주의', time: '어제' },
  {
    id: 10,
    type: 'phishing',
    msg: '카카오톡 지인 사칭 피싱 탐지',
    time: '어제',
  },
];

// 상태별 UI 정보 반환 함수
export const getStatusInfo = (status) => {
  switch (status) {
    case 'active':
      return {
        label: '사냥 중',
        className: 'status-active',
        text: '실시간 감시하고 있어요!',
      };
    case 'paused':
      return {
        label: '일시 정지',
        className: 'status-paused',
        text: '잠시 쉬고 있어요.',
      };
    case 'stopped':
      return {
        label: '종료됨',
        className: 'status-stopped',
        text: '감시가 꺼져있어요.',
      };
    default:
      return { label: '-', className: 'status-default', text: '' };
  }
};
