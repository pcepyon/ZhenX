'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { useHospitalDetail } from '@/hooks/api/useHospitalDetail';
import { HOSPITAL_INFO_LABELS, HOSPITAL_ICONS, HOSPITAL_TAB_KEYS, type HospitalTabKey } from '@/constants/hospitalInfo';
import type { HospitalDetail } from '@/lib/types/hospital';

interface HospitalInfoModalProps {
  hospitalId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HospitalInfoModal({ hospitalId, isOpen, onClose }: HospitalInfoModalProps) {
  const [activeTab, setActiveTab] = useState<HospitalTabKey>(HOSPITAL_TAB_KEYS.CERTIFICATIONS);
  const { data: hospital, isLoading, error } = useHospitalDetail(hospitalId) as any;
  
  console.log('HospitalInfoModal - hospitalId:', hospitalId);
  console.log('HospitalInfoModal - isLoading:', isLoading);
  console.log('HospitalInfoModal - hospital data:', hospital);
  console.log('HospitalInfoModal - error:', error);

  return (
    <Modal open={isOpen} onClose={onClose} className="max-w-3xl" showCloseButton={false}>
      <div className="relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {isLoading ? (
          <HospitalInfoSkeleton />
        ) : hospital ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{HOSPITAL_ICONS.hospital}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-gray-800 mb-1">
                    {hospital.name_ko}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">{hospital.name_cn}</p>
                  {hospital.certifications?.foreign_patient_registration && (
                    <Badge variant="gradient" className="bg-gradient-to-r from-emerald-500 to-teal-500">
                      {HOSPITAL_ICONS.certified} 정부 인증 의료기관
                    </Badge>
                  )}
                </div>
              </div>

              {/* Trust Score Visualization */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">신뢰도</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-emerald-500">
                      {i < calculateTrustScore(hospital) ? HOSPITAL_ICONS.star : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex gap-2 p-1 bg-gray-100 rounded-full">
                {Object.entries(HOSPITAL_TAB_KEYS).map(([key, value]) => (
                  <button
                    key={value}
                    onClick={() => setActiveTab(value)}
                    className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === value
                        ? 'bg-white shadow-sm text-gray-800'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {HOSPITAL_INFO_LABELS[value as keyof typeof HOSPITAL_INFO_LABELS].title}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === HOSPITAL_TAB_KEYS.CERTIFICATIONS && (
                    <CertificationTab hospital={hospital} />
                  )}
                  {activeTab === HOSPITAL_TAB_KEYS.SERVICES && (
                    <ServicesTab hospital={hospital} />
                  )}
                  {activeTab === HOSPITAL_TAB_KEYS.SAFETY && (
                    <SafetyTab hospital={hospital} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                {HOSPITAL_INFO_LABELS.common.lastUpdated}: {new Date(hospital.updated_at).toLocaleDateString()}
              </p>
            </div>
          </>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-2">병원 정보를 불러올 수 없습니다.</p>
            <p className="text-sm text-red-500">{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            병원 정보가 없습니다.
          </div>
        )}

        {/* Contact Button - At the bottom */}
        {hospital && hospital.services?.hotline_number && (
          <div className="p-4 border-t border-gray-100">
            <motion.a
              href={`tel:${hospital.services.hotline_number}`}
              className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm">{HOSPITAL_ICONS.phone}</span>
              <span className="font-medium">{HOSPITAL_INFO_LABELS.common.contact}</span>
            </motion.a>
          </div>
        )}
      </div>
    </Modal>
  );
}

// Certification Tab Component
function CertificationTab({ hospital }: { hospital: HospitalDetail }) {
  const labels = HOSPITAL_INFO_LABELS.certifications;
  const certs = hospital.certifications;
  const yearsInOperation = new Date().getFullYear() - hospital.established_year;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          {HOSPITAL_ICONS.certified} 정부 인증 정보
        </h3>
        <div className="space-y-3">
          <InfoRow
            label={labels.foreignRegistration}
            value={certs?.foreign_patient_registration ? '등록 완료' : '미등록'}
            verified={certs?.foreign_patient_registration}
            detail={certs?.registration_number}
          />
          <InfoRow
            label={labels.institutionNumber}
            value={certs?.medical_institution_number || labels.common.notProvided}
          />
          <InfoRow
            label={labels.licenseNumber}
            value={certs?.director_license_number || labels.common.notProvided}
          />
          <InfoRow
            label={labels.establishedYear}
            value={`${hospital.established_year}년 (${yearsInOperation}년차)`}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          💰 투명한 가격 정책
        </h3>
        <InfoRow
          label={labels.samePricePolicy}
          value={certs?.same_price_policy ? '보장' : '미보장'}
          verified={certs?.same_price_policy}
        />
      </div>
    </div>
  );
}

// Services Tab Component
function ServicesTab({ hospital }: { hospital: HospitalDetail }) {
  const labels = HOSPITAL_INFO_LABELS.services;
  const services = hospital.services;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          {HOSPITAL_ICONS.coordinators} 전담 서비스
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">{labels.coordinators}</span>
            <span className="text-2xl font-bold text-gray-800">
              {services?.chinese_coordinators || 0}{HOSPITAL_INFO_LABELS.common.person}
            </span>
          </div>
          <InfoRow
            label={labels.emergencySupport}
            value={services?.emergency_support ? '지원' : '미지원'}
            verified={services?.emergency_support}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          {HOSPITAL_ICONS.wechat} 직통 연락처
        </h3>
        <div className="space-y-3">
          {services?.wechat_official_account && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{labels.wechatAccount}</span>
              <span className="font-medium text-gray-800">@{services.wechat_official_account}</span>
            </div>
          )}
          {services?.hotline_number && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{labels.hotline}</span>
              <a href={`tel:${services.hotline_number}`} className="font-medium text-emerald-600">
                {services.hotline_number}
              </a>
            </div>
          )}
        </div>
      </div>

      {services?.service_hours && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            {HOSPITAL_ICONS.clock} {labels.serviceHours}
          </h3>
          <div className="space-y-2">
            {services.service_hours.weekday && (
              <div className="flex justify-between">
                <span className="text-gray-600">평일</span>
                <span className="text-gray-800">{services.service_hours.weekday}</span>
              </div>
            )}
            {services.service_hours.saturday && (
              <div className="flex justify-between">
                <span className="text-gray-600">토요일</span>
                <span className="text-gray-800">{services.service_hours.saturday}</span>
              </div>
            )}
            {services.service_hours.sunday && (
              <div className="flex justify-between">
                <span className="text-gray-600">일요일</span>
                <span className="text-gray-800">{services.service_hours.sunday}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Safety Tab Component
function SafetyTab({ hospital }: { hospital: HospitalDetail }) {
  const labels = HOSPITAL_INFO_LABELS.safety;
  const certs = hospital.certifications;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          {HOSPITAL_ICONS.safety} 의료 안전
        </h3>
        <div className="space-y-3">
          <InfoRow
            label={labels.medicalInsurance}
            value={certs?.medical_insurance ? '가입' : '미가입'}
            verified={certs?.medical_insurance}
          />
          <InfoRow
            label={labels.postCareProtocol}
            value={certs?.post_care_protocol ? '보유' : '미보유'}
            verified={certs?.post_care_protocol}
            detail={certs?.post_care_protocol ? 'WeChat 실시간 상담 가능' : undefined}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          {HOSPITAL_ICONS.location} {labels.location}
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-gray-800 mb-1">{hospital.address_ko}</p>
            <p className="text-sm text-gray-600">{hospital.address_cn}</p>
          </div>
          {hospital.subway_info && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">지하철:</span>
              <span className="text-gray-800">
                {hospital.subway_info.line} {hospital.subway_info.station} {hospital.subway_info.exit}출구
              </span>
            </div>
          )}
        </div>
      </div>

      {hospital.images.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            📸 {labels.hospitalPhotos}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {hospital.images.map((image) => (
              <div key={image.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={image.image_url}
                  alt={`Hospital ${image.image_type}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function InfoRow({ label, value, verified, detail }: {
  label: string;
  value: string;
  verified?: boolean;
  detail?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <div className="text-right">
        <span className={`font-medium ${verified ? 'text-emerald-600' : 'text-gray-800'}`}>
          {verified && HOSPITAL_ICONS.check} {value}
        </span>
        {detail && <p className="text-xs text-gray-500 mt-1">{detail}</p>}
      </div>
    </div>
  );
}

function HospitalInfoSkeleton() {
  return (
    <div className="p-6">
      <LoadingSkeleton className="h-20 mb-6" />
      <LoadingSkeleton className="h-12 mb-4" />
      <div className="space-y-3">
        <LoadingSkeleton className="h-24" />
        <LoadingSkeleton className="h-24" />
        <LoadingSkeleton className="h-24" />
      </div>
    </div>
  );
}

function calculateTrustScore(hospital: HospitalDetail): number {
  let score = 0;
  const certs = hospital.certifications;
  
  if (certs?.foreign_patient_registration) score++;
  if (certs?.same_price_policy) score++;
  if (certs?.medical_insurance) score++;
  if (certs?.post_care_protocol) score++;
  if (hospital.services?.chinese_coordinators > 0) score++;
  
  return score;
}