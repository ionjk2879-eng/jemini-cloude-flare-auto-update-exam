import { 
  Trash2, 
  ArrowLeft, 
  Camera, 
  Upload,
  Info,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Estimate() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-green-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Trash2 size={20} className="text-white" />
            </div>
            <span>클린 <span className="text-green-500">가이드</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={16} /> 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black mb-4">사진 견적 서비스</h1>
            <p className="text-slate-400">버리려는 물건의 사진을 찍어 올려주시면 AI가 배출 비용을 예측해 드립니다.</p>
          </div>

          {/* Upload Area */}
          <div className="w-full aspect-square md:aspect-video bg-slate-900 rounded-3xl border-2 border-dashed border-white/10 mb-12 flex flex-col items-center justify-center group cursor-pointer hover:border-green-500/50 hover:bg-green-500/5 transition-all">
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">사진 업로드 또는 촬영</h3>
            <p className="text-slate-500 text-sm mb-6">최대한 선명하게 전체 모습이 나오도록 찍어주세요.</p>
            <button className="bg-white text-black font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-200 transition-all">
              <Upload size={18} /> 파일 선택하기
            </button>
          </div>

          {/* Guide Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bento-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-500 rounded-xl flex items-center justify-center">
                  <Info size={20} />
                </div>
                <h4 className="font-bold">촬영 팁</h4>
              </div>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>주변이 밝은 곳에서 촬영하세요.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>물건의 전체 모습이 프레임에 담겨야 합니다.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>파손 부위가 있다면 함께 찍어주세요.</span>
                </li>
              </ul>
            </div>

            <div className="bento-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h4 className="font-bold">AI 분석 항목</h4>
              </div>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>품목 자동 식별 (소파, 장롱 등)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>예상 배출 수수료 계산</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>무상 수거 가능 여부 판독</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Warning Section */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <Info className="text-yellow-500 shrink-0 mt-1" size={20} />
              <p className="text-xs text-slate-400 leading-relaxed">
                AI 견적은 참고용이며, 실제 배출 시 지자체나 수거 업체의 기준에 따라 비용이 달라질 수 있습니다. 정확한 금액은 거주지 동사무소 또는 공식 앱을 통해 확인해 주세요.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-lg opacity-80 text-left">
            <Trash2 size={24} className="text-green-500" />
            <span>클린 가이드 견적</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 클린 가이드. 모든 견적 데이터는 자체 AI 모델로 분석됩니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default Estimate;
