export const HOSPITAL_INFO_LABELS = {
  certifications: {
    title: '인증 및 신뢰도',
    titleCn: '认证与信誉',
    foreignRegistration: '외국인 유치기관 등록',
    foreignRegistrationCn: '外国患者医疗机构认证',
    institutionNumber: '요양기관번호',
    institutionNumberCn: '医疗机构编号',
    licenseNumber: '대표원장 면허번호',
    licenseNumberCn: '代表院长执照号',
    samePricePolicy: '중국인/한국인 동일 가격',
    samePricePolicyCn: '中韩同价政策',
    establishedYear: '개원 연도',
    establishedYearCn: '开业年份',
    yearsInOperation: '운영 경력',
    yearsInOperationCn: '运营年限'
  },
  services: {
    title: '중국인 특화 서비스',
    titleCn: '中国人专属服务',
    coordinators: '중국어 전문 코디네이터',
    coordinatorsCn: '中文专属协调员',
    wechatAccount: 'WeChat 공식 계정',
    wechatAccountCn: '微信官方账号',
    hotline: '전용 핫라인',
    hotlineCn: '专属热线',
    emergencySupport: '24시간 응급 지원',
    emergencySupportCn: '24小时应急支援',
    serviceHours: '운영 시간',
    serviceHoursCn: '营业时间'
  },
  safety: {
    title: '안전 및 편의',
    titleCn: '安全与便利',
    medicalInsurance: '의료배상보험 가입',
    medicalInsuranceCn: '医疗赔偿保险',
    postCareProtocol: '사후 관리 프로토콜',
    postCareProtocolCn: '术后管理方案',
    location: '위치 정보',
    locationCn: '位置信息',
    transportation: '교통 정보',
    transportationCn: '交通信息',
    hospitalPhotos: '병원 사진',
    hospitalPhotosCn: '医院照片'
  },
  common: {
    verified: '인증됨',
    verifiedCn: '已认证',
    notProvided: '정보 없음',
    notProvidedCn: '暂无信息',
    person: '명',
    personCn: '名',
    year: '년',
    yearCn: '年',
    contact: '문의하기',
    contactCn: '咨询',
    viewMore: '자세히 보기',
    viewMoreCn: '查看详情',
    lastUpdated: '최종 업데이트',
    lastUpdatedCn: '最后更新'
  }
};

export const HOSPITAL_ICONS = {
  certified: '✅',
  coordinators: '👥',
  wechat: '💬',
  safety: '🛡️',
  location: '📍',
  clock: '🕐',
  phone: '📞',
  hospital: '🏥',
  check: '✓',
  star: '⭐'
};

export const HOSPITAL_TAB_KEYS = {
  CERTIFICATIONS: 'certifications',
  SERVICES: 'services',
  SAFETY: 'safety'
} as const;

export type HospitalTabKey = typeof HOSPITAL_TAB_KEYS[keyof typeof HOSPITAL_TAB_KEYS];