import { useParams, Link } from 'react-router-dom';
import { 
  Trash2, 
  ArrowLeft, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  HelpCircle,
  Camera
} from 'lucide-react';

const itemDetails: Record<string, any> = {
  "장롱 (1자 기준)": {
    category: "가구류",
    price: "3,000원 ~",
    method: "대형폐기물 스티커 부착 후 배출",
    description: "장롱은 크기에 따라 비용이 달라집니다. 보통 1자(30cm) 기준으로 산정하며, 문짝을 분리하여 내놓으시면 수거가 더 원활합니다.",
    steps: [
      "거주지 관할 구청 홈페이지 또는 주민센터 방문하여 신고",
      "품목에 맞는 수수료 결제 후 스티커(필증) 발급",
      "지정된 배출 일시 및 장소에 내놓기",
      "배출한 물품에 스티커를 잘 보이게 부착"
    ],
    warnings: [
      "유리 거울이 부착된 경우 파손 주의",
      "내부 물건은 반드시 모두 비워야 함",
      "분해하지 않고 통째로 내놓는 것을 권장 (수거 시 용이)"
    ]
  },
  "소파 (3인용)": {
    category: "가구류",
    price: "10,000원 ~",
    method: "대형폐기물 신고 후 지정장소 배출",
    description: "3인용 소파는 부피가 커서 배출 시 공간 확보가 중요합니다. 인조가죽, 천, 목재 등 소재에 상관없이 대형폐기물로 분류됩니다.",
    steps: [
      "폐기물 스티커 구매 또는 모바일 앱 '빼기' 등 이용",
      "수거 업체와 일정 조율 (필요 시)",
      "현관 앞 또는 지정된 수거 장소로 이동",
      "신고 번호를 기재하거나 스티커 부착"
    ],
    warnings: [
      "쿠션이나 방석이 분리되는 경우 묶어서 배출",
      "리클라이너 소파는 무게가 무거우니 운반 시 주의",
      "수거 전까지 타인의 통행에 방해가 되지 않도록 배치"
    ]
  },
  "대형 가전 (냉장고 등)": {
    category: "가전류",
    price: "무료",
    method: "폐가전 무상방문수거 서비스 이용",
    description: "냉장고, 세탁기, 에어컨 등 대형 가전은 환경부 주관 무상방문수거 서비스를 통해 비용 없이 배출할 수 있습니다.",
    steps: [
      "폐가전 무상방문수거 홈페이지(15990903.or.kr) 접속",
      "배출 예약 신청 (품목, 수량, 장소 선택)",
      "예약된 날짜에 수거 기사님 방문",
      "현장 수거 진행"
    ],
    warnings: [
      "에어컨, 벽걸이 TV는 미리 철거되어 있어야 함",
      "원형이 훼손된 제품(핵심 부품 탈취 등)은 수거 불가할 수 있음",
      "빌트인 가전은 직접 분리해두어야 함"
    ]
  }
};

function GuideDetail() {
  const { itemName } = useParams();
  const detail = itemDetails[itemName || ""] || {
    category: "기타",
    price: "별도 문의",
    method: "지자체 문의 필요",
    description: "해당 품목의 상세 정보가 아직 등록되지 않았습니다.",
    steps: ["지자체 홈페이지 확인", "주민센터 문의"],
    warnings: ["정확한 배출 방법은 관할 구역에 따라 다를 수 있습니다."]
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Trash2 size={20} className="text-white" />
            </div>
            <span>클린 <span className="text-green-500">가이드</span></span>
          </Link>
          <Link to="/guide" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={16} /> 가이드 목록으로
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 mb-4">
              {detail.category}
            </div>
            <h1 className="text-4xl font-black mb-4">{itemName}</h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                <DollarSign size={18} />
                배출 비용: {detail.price}
              </div>
              <div className="flex items-center gap-2 text-blue-400 font-bold bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
                <Info size={18} />
                {detail.method}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Description */}
            <section className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="text-slate-400" size={20} />
                어떤 품목인가요?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {detail.description}
              </p>
            </section>

            {/* Steps */}
            <section className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                배출 절차
              </h3>
              <div className="space-y-4">
                {detail.steps.map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Warnings */}
            <section className="glass p-8 rounded-3xl border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                주의사항
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-400">
                {detail.warnings.map((warning: string, idx: number) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </section>

            {/* AI Call to Action */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">헷갈리시나요?</h3>
                <p className="text-slate-400 text-sm">사진을 찍으시면 정확한 규격을 AI가 분석해드립니다.</p>
              </div>
              <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition-all shrink-0">
                <Camera size={20} />
                AI 분석 시작
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950/50 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-slate-600">© 2026 클린 가이드. 모든 정보는 지자체별 조례에 따라 다를 수 있습니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default GuideDetail;
