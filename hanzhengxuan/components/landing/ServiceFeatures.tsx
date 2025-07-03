export function ServiceFeatures() {
  const features = [
    {
      icon: '🎯',
      title: '맞춤 추천',
      desc: 'AI가 분석해서 딱 맞는 패키지만'
    },
    {
      icon: '📋',
      title: '투명한 가격',
      desc: 'VAT 포함, 숨은 비용 없음'
    },
    {
      icon: '🏥',
      title: '검증된 병원',
      desc: '직접 다녀온 곳만 추천'
    },
    {
      icon: '💬',
      title: '실시간 상담',
      desc: '중국어로 편하게 물어봐'
    }
  ];

  return (
    <section className="px-5 py-12">
      <div className="max-w-md mx-auto">
        <h3 className="text-center text-lg font-bold text-gray-900 mb-8">
          이런 점이 좋아요
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}