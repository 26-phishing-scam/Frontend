// 초기 도메인 데이터
export const initialDomains = [
  { id: 1, url: 'naver.com', safe: true, time: '방금 전' },
  { id: 2, url: 'google.com', safe: true, time: '2분 전' },
  { id: 3, url: 'fake-login.xyz', safe: false, time: '15분 전' },
];

// 초기 이벤트 데이터
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
    msg: '피스냥이 피싱 의심 도메인을 발견했어요!',
    time: '13:45',
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
