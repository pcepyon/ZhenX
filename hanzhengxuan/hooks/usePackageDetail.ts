'use client';

import { useState, useEffect } from 'react';
import { usePackageDetailsByCode } from '@/hooks/api/usePackages';

interface PackageItem {
  treatment: {
    code: string;
    name_ko: string;
    name_cn: string;
    base_price: number;
    duration_minutes: number;
  };
  treatment_info?: {
    category_ko: string;
    category_cn: string;
    simple_desc_ko: string;
    simple_desc_cn: string;
    icon_type: string;
  };
  quantity: number;
  display_order: number;
}

interface PriceBreakdown {
  subtotal: number;
  discount: number;
  package_price: number;
  vat: number;
  total: number;
}

export function usePackageDetail(packageCode: string | null) {
  const { data: packageData, isLoading, error } = usePackageDetailsByCode(packageCode || '');
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  
  // Calculate price breakdown when package data is loaded
  useEffect(() => {
    if (packageData && packageData.package_items) {
      const calculateBreakdown = (items: PackageItem[]): PriceBreakdown => {
        const subtotal = items.reduce((sum, item) => 
          sum + (item.treatment.base_price * item.quantity), 0
        );
        const discount = Math.round(subtotal * 0.1); // 10% package discount
        const package_price = subtotal - discount;
        const vat = Math.round(package_price * 0.1); // 10% VAT
        
        return {
          subtotal,
          discount,
          package_price,
          vat,
          total: package_price + vat
        };
      };
      
      setPriceBreakdown(calculateBreakdown(packageData.package_items));
    }
  }, [packageData]);
  
  // Transform package items to timeline format with treatment info
  const treatmentTimeline = packageData?.package_items
    ?.sort((a, b) => a.display_order - b.display_order)
    .map(item => ({
      code: item.treatment.code,
      name: item.treatment.name_ko,
      name_cn: item.treatment.name_cn,
      duration: item.treatment.duration_minutes,
      quantity: item.quantity,
      category: item.treatment_info?.category_ko || '',
      category_cn: item.treatment_info?.category_cn || '',
      description: item.treatment_info?.simple_desc_ko || '',
      description_cn: item.treatment_info?.simple_desc_cn || '',
      iconType: item.treatment_info?.icon_type || 'default'
    })) || [];
  
  return {
    packageData,
    priceBreakdown,
    treatmentTimeline,
    isLoading: isLoading && !!packageCode,
    error
  };
}