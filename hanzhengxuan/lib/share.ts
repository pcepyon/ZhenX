interface ShareOptions {
  title?: string;
  text?: string;
  url: string;
}

export async function shareToClipboard(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export function shareToWeChat(url: string): void {
  // WeChat sharing through URL scheme
  // Note: This works on mobile devices with WeChat installed
  const wechatUrl = `weixin://dl/business/?url=${encodeURIComponent(url)}`;
  window.open(wechatUrl, '_blank');
}

export function shareToKakao(options: ShareOptions): void {
  // Check if Kakao SDK is loaded
  if (typeof window !== 'undefined' && (window as any).Kakao) {
    const Kakao = (window as any).Kakao;
    
    // Initialize Kakao if not already done
    if (!Kakao.isInitialized()) {
      // Use a placeholder key - should be replaced with actual key in production
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY || 'YOUR_KAKAO_API_KEY');
    }
    
    // Share via Kakao
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: options.title || '韩真选 의료미용 견적서',
        description: options.text || '맞춤형 의료미용 패키지 견적서를 확인해보세요',
        imageUrl: 'https://hanzhengxuan.com/og-image.png', // Should be replaced with actual image
        link: {
          mobileWebUrl: options.url,
          webUrl: options.url,
        },
      },
      buttons: [
        {
          title: '견적서 보기',
          link: {
            mobileWebUrl: options.url,
            webUrl: options.url,
          },
        },
      ],
    });
  } else {
    // Fallback to web share API or custom share URL
    const kakaoShareUrl = `https://story.kakao.com/share?url=${encodeURIComponent(options.url)}`;
    window.open(kakaoShareUrl, '_blank', 'width=500,height=500');
  }
}

export function generateQRCode(url: string): string {
  // Using a QR code generation service
  // In production, consider using a library like qrcode.js
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
  return qrApiUrl;
}

export async function shareViaWebAPI(options: ShareOptions): Promise<boolean> {
  // Check if Web Share API is available
  if (navigator.share) {
    try {
      await navigator.share({
        title: options.title,
        text: options.text,
        url: options.url,
      });
      return true;
    } catch (error) {
      // User cancelled or error occurred
      console.error('Web Share API error:', error);
      return false;
    }
  }
  return false;
}

export function generateShareMessage(quoteId: string, packageCount: number): ShareOptions {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hanzhengxuan.com';
  const quoteUrl = `${baseUrl}/quote/${quoteId}`;
  
  return {
    title: '韩真选 의료미용 견적서',
    text: `총 ${packageCount}개의 맞춤형 의료미용 패키지 견적서입니다. 링크를 통해 자세한 내용을 확인하세요.`,
    url: quoteUrl,
  };
}