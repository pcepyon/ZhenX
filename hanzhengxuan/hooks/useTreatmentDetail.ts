'use client';

import { useState, useEffect } from 'react';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TreatmentDetail {
  code: string;
  name_ko: string;
  name_cn: string;
  category_id: string;
  base_price: number;
  duration_minutes: number;
  recovery_days: number;
  description: string;
  benefits: string[];
  process_steps: ProcessStep[];
  precautions: {
    before: string[];
    after: string[];
  };
  faqs: FAQ[];
}

// Mock data for treatments
const mockTreatments: Record<string, TreatmentDetail> = {
  'ulthera': {
    code: 'ulthera',
    name_ko: '울쎄라',
    name_cn: '超声刀',
    category_id: 'elasticity',
    base_price: 1500000,
    duration_minutes: 60,
    recovery_days: 0,
    description: '고강도 집속 초음파(HIFU)를 이용해 피부 깊은 층까지 열에너지를 전달하여 콜라겐 재생을 촉진하는 리프팅 시술이에요.',
    benefits: [
      '즉각적인 리프팅 효과',
      '시간이 지날수록 개선되는 탄력',
      '수술 없이 자연스러운 V라인',
      '일상생활 바로 가능'
    ],
    process_steps: [
      {
        step: 1,
        title: '세안 및 마취크림',
        description: '깨끗이 세안 후 통증 완화를 위한 마취크림을 도포해요',
        duration: '30분'
      },
      {
        step: 2,
        title: '디자인 및 마킹',
        description: '얼굴 윤곽에 맞춰 시술 부위를 디자인하고 표시해요',
        duration: '10분'
      },
      {
        step: 3,
        title: '울쎄라 시술',
        description: '초음파 에너지를 조사하여 피부 속 SMAS층을 자극해요',
        duration: '40-50분'
      },
      {
        step: 4,
        title: '진정 관리',
        description: '시술 후 피부 진정을 위한 쿨링 마스크를 적용해요',
        duration: '10분'
      }
    ],
    precautions: {
      before: [
        '시술 1주 전부터 레티놀 제품 사용 중단',
        '시술 당일 메이크업 최소화',
        '충분한 수분 섭취'
      ],
      after: [
        '시술 직후 약간의 붓기와 열감은 정상이에요',
        '2-3일간 사우나, 찜질방 피하기',
        '자외선 차단제 꼼꼼히 바르기',
        '1주일간 과도한 안면 마사지 피하기'
      ]
    },
    faqs: [
      {
        question: '시술이 많이 아픈가요?',
        answer: '마취크림을 충분히 도포하기 때문에 대부분 견딜 만한 정도예요. 턱선이나 이마 부위는 약간 더 예민할 수 있어요.'
      },
      {
        question: '효과는 언제부터 보이나요?',
        answer: '시술 직후부터 약간의 리프팅 효과를 느낄 수 있고, 콜라겐 재생으로 인한 본격적인 효과는 2-3개월 후부터 나타나요.'
      },
      {
        question: '얼마나 자주 받아야 하나요?',
        answer: '보통 1년에 1회 정도 추천드려요. 피부 상태와 연령에 따라 6개월-1년 주기로 받으시면 좋아요.'
      }
    ]
  },
  'thermage_flx': {
    code: 'thermage_flx',
    name_ko: '써마지FLX',
    name_cn: '热玛吉FLX',
    category_id: 'elasticity',
    base_price: 2000000,
    duration_minutes: 45,
    recovery_days: 0,
    description: '고주파 에너지로 진피층을 가열하여 즉각적인 타이트닝과 장기적인 콜라겐 리모델링을 유도하는 시술이에요.',
    benefits: [
      '즉각적인 타이트닝 효과',
      '6개월간 지속적인 개선',
      '안전한 FDA 승인 장비',
      '전체 얼굴 탄력 개선'
    ],
    process_steps: [
      {
        step: 1,
        title: '클렌징',
        description: '메이크업과 노폐물을 깨끗이 제거해요',
        duration: '10분'
      },
      {
        step: 2,
        title: '그리드 부착',
        description: '정확한 에너지 전달을 위한 가이드를 부착해요',
        duration: '5분'
      },
      {
        step: 3,
        title: '써마지 시술',
        description: '고주파 에너지를 조사하여 피부를 타이트닝해요',
        duration: '30-40분'
      }
    ],
    precautions: {
      before: [
        '금속 임플란트가 있다면 미리 알려주세요',
        '시술 전 충분한 수면 취하기'
      ],
      after: [
        '시술 후 붉은기는 1-2시간 내 사라져요',
        '보습 관리 철저히 하기'
      ]
    },
    faqs: [
      {
        question: '울쎄라와 어떤 차이가 있나요?',
        answer: '울쎄라는 점 단위로 깊숙이, 써마지는 면 단위로 넓게 작용해요. 함께 받으면 시너지 효과가 있어요.'
      }
    ]
  }
};

export function useTreatmentDetail(treatmentCode: string | null) {
  const [treatmentData, setTreatmentData] = useState<TreatmentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (!treatmentCode) {
      setTreatmentData(null);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const data = mockTreatments[treatmentCode];
      if (data) {
        setTreatmentData(data);
      } else {
        // Fallback for unknown treatments
        setTreatmentData({
          code: treatmentCode,
          name_ko: treatmentCode,
          name_cn: treatmentCode,
          category_id: 'unknown',
          base_price: 500000,
          duration_minutes: 30,
          recovery_days: 0,
          description: '상세 정보를 준비 중이에요.',
          benefits: ['전문의 상담 후 자세한 효과를 안내해 드려요'],
          process_steps: [],
          precautions: {
            before: ['상담 시 자세히 안내해 드려요'],
            after: ['시술 후 주의사항을 꼭 지켜주세요']
          },
          faqs: []
        });
      }
      setIsLoading(false);
    }, 500);
  }, [treatmentCode]);
  
  return {
    treatmentData,
    isLoading,
    error
  };
}