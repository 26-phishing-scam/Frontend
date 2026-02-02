// 위험 요소 모의 데이터
export const mockThreats = [
  {
    id: '1',
    url: 'fake-bank-login.com',
    timestamp: '14:32',
    type: 'phishing',
    tag: '계정 탈취', // severity 대체
    description: '은행 로그인 페이지 위장',
    analysis:
      '공식 은행 사이트의 HTML 구조를 모방하였으나, 로그인 폼의 action 속성이 외부 서버로 연결되어 있습니다.',
    ip: '192.168.xxx.xxx (해외 IP)',
  },
  {
    id: '2',
    url: 'win-prize-now.net',
    timestamp: '14:15',
    type: 'scam',
    tag: '금전 요구',
    description: '가짜 경품 당첨 사이트',
    analysis:
      '사용자의 기기 정보를 무단으로 수집하며, 배송비 결제를 유도하여 카드 정보를 탈취하려는 시도가 감지되었습니다.',
    ip: '45.12.xxx.xxx',
  },
  {
    id: '3',
    url: 'paypal-verify.xyz',
    timestamp: '13:48',
    type: 'phishing',
    tag: '신원 도용',
    description: 'PayPal 계정 확인 요구',
    analysis:
      'PayPal 로고를 무단 사용하였으며, 도메인 등록일이 24시간 이내인 신생 도메인입니다.',
    ip: '104.21.xxx.xxx',
  },
  {
    id: '4',
    url: 'free-crypto-giveaway.io',
    timestamp: '13:22',
    type: 'scam',
    tag: '암호화폐 사기',
    description: '암호화폐 무료 지급 사기',
    analysis:
      '유명 인사를 사칭하여 이더리움 송금을 유도하는 전형적인 스캠 패턴과 99% 일치합니다.',
    ip: '172.67.xxx.xxx',
  },
  {
    id: '5',
    url: 'update-security-info.com',
    timestamp: '12:55',
    type: 'phishing',
    tag: '악성코드',
    description: '보안 정보 업데이트 유도',
    analysis:
      'ISP 업체를 사칭하여 개인정보 업데이트를 요구하는 피싱 사이트입니다.',
    ip: '185.199.xxx.xxx',
  },
  {
    id: '6',
    url: 'invest-guaranteed-return.biz',
    timestamp: '12:10',
    type: 'scam',
    tag: '투자 사기',
    description: '고수익 투자 사기',
    analysis:
      '비현실적인 수익률(월 50% 보장)을 미끼로 폰지 사기 형태의 투자금을 모집하고 있습니다.',
    ip: '51.15.xxx.xxx',
  },
  {
    id: '7',
    url: 'amazon-account-locked.net',
    timestamp: '11:45',
    type: 'phishing',
    tag: '개인정보 유출',
    description: 'Amazon 계정 잠김 알림',
    analysis:
      '계정 잠금을 해제하려면 신용카드 정보를 다시 입력하라는 메시지를 띄우고 있습니다.',
    ip: '203.0.xxx.xxx',
  },
  {
    id: '8',
    url: 'limited-time-offer.shop',
    timestamp: '11:20',
    type: 'scam',
    tag: '허위 쇼핑몰',
    description: '긴급 할인 쇼핑몰',
    analysis:
      '한정 수량 카운트다운 타이머를 조작하여 구매를 부추기는 다크 패턴이 사용되었습니다.',
    ip: '34.102.xxx.xxx',
  },
];
