import { 
  Trash2, 
  ArrowLeft, 
  Truck as TruckIcon, 
  Calendar,
  Clock,
  ShieldCheck,
  Package,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Truck() {
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
            <h1 className="text-4xl font-black mb-4">전문 수거 차량 호출</h1>
            <p className="text-slate-400">직접 버리기 힘든 무거운 짐, 인증된 전문가가 방문하여 안전하게 수거합니다.</p>
          </div>

          {/* Booking Card */}
          <div className="bento-card bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="text-green-500" /> 수거 예약하기
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">수거 희망 날짜</label>
                  <div className="glass p-4 rounded-xl border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">날짜를 선택해주세요</span>
                    <Calendar size={18} className="text-slate-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">수거 희망 시간</label>
                  <div className="glass p-4 rounded-xl border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">시간을 선택해주세요</span>
                    <Clock size={18} className="text-slate-500" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">수거 물품 정보</label>
                <div className="glass p-4 rounded-xl border-white/5 min-h-[100px] flex items-start justify-between">
                  <span className="text-slate-300 text-sm">물품의 종류와 크기, 개수 등을 적어주세요.</span>
                  <Package size={18} className="text-slate-500" />
                </div>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(34,197,94,0.2)] flex items-center justify-center gap-2">
                무료 견적 및 예약 신청 <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="glass p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold mb-1">인증 파트너</h4>
              <p className="text-xs text-slate-500">엄격하게 검증된 수거 전문 업체만 매칭</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon size={24} />
              </div>
              <h4 className="font-bold mb-1">내려드림 서비스</h4>
              <p className="text-xs text-slate-500">집 안까지 방문하여 밖으로 옮겨드립니다</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold mb-1">안전 보험 가입</h4>
              <p className="text-xs text-slate-500">운반 중 사고 발생 시 100% 보상 지원</p>
            </div>
          </div>

          {/* Process Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">수거 진행 절차</h3>
            <div className="space-y-4">
              {[
                { step: "01", title: "예약 신청", desc: "물품 사진과 정보를 입력하고 예약을 신청합니다." },
                { step: "02", title: "견적 확정", desc: "매칭된 파트너 업체가 정확한 수거 비용을 안내합니다." },
                { step: "03", title: "방문 수거", desc: "약속된 시간에 전문가가 방문하여 물품을 수거합니다." },
                { step: "04", title: "수거 완료", desc: "안전하게 처리가 완료되면 사진과 함께 결과를 공유합니다." }
              ].map((item, idx) => (
                <div key={idx} className="glass p-5 rounded-2xl flex items-center gap-6 border-white/5">
                  <div className="text-2xl font-black text-green-500/50">{item.step}</div>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <CheckCircle2 className="ml-auto text-green-500/20" size={24} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-lg opacity-80 text-left">
            <Trash2 size={24} className="text-green-500" />
            <span>클린 가이드 수거</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 클린 가이드. 모든 파트너 업체는 화물운송종사 자격증을 보유하고 있습니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default Truck;
