'use client';

import { useState, useEffect } from 'react';
import { usePackage } from '@/hooks/api/usePackages';

interface PackageItem {
  treatment: {
    code: string;
    name_ko: string;
    base_price: number;
    duration_minutes: number;
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
  const { data: packageData, isLoading, error } = usePackage(packageCode || '');
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
  
  // Transform package items to timeline format
  const treatmentTimeline = packageData?.package_items
    ?.sort((a, b) => a.display_order - b.display_order)
    .map(item => ({
      code: item.treatment.code,
      name: item.treatment.name_ko,
      duration: item.treatment.duration_minutes,
      quantity: item.quantity
    })) || [];
  
  return {
    packageData,
    priceBreakdown,
    treatmentTimeline,
    isLoading: isLoading && !!packageCode,
    error
  };
}