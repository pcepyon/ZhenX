export interface Hospital {
  id: string;
  name_ko: string;
  name_cn: string;
  logo_url?: string;
  established_year: number;
  address_ko: string;
  address_cn: string;
  subway_info: {
    line: string;
    station: string;
    exit: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  created_at: string;
  updated_at: string;
}

export interface HospitalCertification {
  id: string;
  hospital_id: string;
  foreign_patient_registration: boolean;
  registration_number?: string;
  medical_institution_number?: string;
  director_license_number?: string;
  same_price_policy: boolean;
  medical_insurance: boolean;
  post_care_protocol: boolean;
  updated_at: string;
}

export interface HospitalService {
  id: string;
  hospital_id: string;
  chinese_coordinators: number;
  wechat_official_account?: string;
  hotline_number?: string;
  emergency_support: boolean;
  service_hours: {
    weekday?: string;
    saturday?: string;
    sunday?: string;
  };
  updated_at: string;
}

export interface HospitalImage {
  id: string;
  hospital_id: string;
  image_url: string;
  image_type: 'exterior' | 'interior' | 'facility';
  display_order: number;
  created_at: string;
}

export interface HospitalDetail extends Hospital {
  certifications: HospitalCertification;
  services: HospitalService;
  images: HospitalImage[];
}