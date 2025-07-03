export function TrustBadges() {
  const badges = [
    {
      icon: '💰',
      title: '10% 패키지 할인',
      desc: '자동 적용'
    },
    {
      icon: '🗣️',
      title: '중국어 상담',
      desc: '언어 걱정 없어요'
    },
    {
      icon: '⏰',
      title: '원데이 올킬',
      desc: '하루에 끝'
    }
  ];

  return (
    <section className="px-5 py-12 bg-gray-50">
      <div className="max-w-md mx-auto">
        <h3 className="text-center text-lg font-bold text-gray-900 mb-8">
          왜 韩真选이야?
        </h3>
        <div className="space-y-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="text-3xl">{badge.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{badge.title}</h4>
                <p className="text-sm text-gray-600">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}