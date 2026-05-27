import { 
  Trash2, 
  MapPin, 
  BookOpen, 
  Users, 
  MessageSquare, 
  ChevronRight, 
  Info, 
  Truck, 
  Zap,
  Globe,
  Search,
  Camera
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-green-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Trash2 size={20} className="text-white" />
            </div>
            <span>클린 <span className="text-green-500">가이드</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">폐기물 가이드</a>
            <a href="#" className="hover:text-white transition-colors">수거 업체 맵</a>
            <a href="#" className="hover:text-white transition-colors">나눔 커뮤니티</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-green-500 transition-colors">내 주변 검색</a>
            <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95">
              지금 신청하기
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-500 text-xs font-bold mb-6 animate-fade-in">
              <Zap size={14} />
              <span>복잡한 대형 폐기물, 이제 스마트하게</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
              버리기 힘든 큰 짐,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                한 번에 해결하세요
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              가구, 가전제품 폐기 방법이 궁금하신가요? <br />
              우리 동네 수거 비용 확인부터 배출 신고까지, 클린 가이드가 도와드립니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                배출 방법 검색하기 <Search size={20} />
              </button>
              <button className="w-full sm:w-auto glass hover:bg-white/10 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                <Camera size={20} /> 사진으로 견적받기
              </button>
            </div>
          </section>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
            {/* Disposal Guide */}
            <div className="md:col-span-2 md:row-span-2 bento-card flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">품목별 배출 가이드</h3>
                <p className="text-slate-400">장롱, 소파, 매트리스... 헷갈리는 품목별 정확한 비용과 배출 요령을 확인하세요.</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">가구</span>
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">가전</span>
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">기타대형</span>
              </div>
            </div>

            {/* Map Service */}
            <div className="md:col-span-2 md:row-span-1 bento-card flex items-center gap-6 group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <MapPin className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">우리 동네 수거 맵</h3>
                <p className="text-slate-400 text-sm">지자체 지정 수거 장소와 민간 수거 업체를 한눈에</p>
              </div>
            </div>

            {/* Community Stats */}
            <div className="md:col-span-1 md:row-span-2 bento-card flex flex-col justify-between text-center">
              <div className="flex justify-center mb-4">
                <Users className="text-purple-400" size={32} />
              </div>
              <div>
                <div className="text-4xl font-black mb-1">25K+</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">누적 해결 건수</div>
              </div>
              <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-green-500"></div>
              </div>
            </div>

            {/* Tips Highlight */}
            <div className="md:col-span-1 md:row-span-1 bento-card flex flex-col justify-center">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Info size={16} />
                <span className="text-xs font-bold uppercase tracking-tighter">오늘의 꿀팁</span>
              </div>
              <p className="text-sm font-medium line-clamp-2">"무료 수거 가능한 소형 가전 품목 정리 (5개 이상)"</p>
            </div>

            {/* Request Status */}
            <div className="md:col-span-2 md:row-span-1 bento-card flex items-center justify-between group overflow-hidden">
              <div className="z-10">
                <h3 className="text-xl font-bold">실시간 수거 현황</h3>
                <p className="text-slate-400 text-sm">내 주변 수거 차량의 위치를 확인해 보세요</p>
              </div>
              <Truck className="text-white/5 group-hover:text-green-500/20 transition-colors" size={120} style={{ marginRight: '-40px' }} />
            </div>

            {/* Share/Donate */}
            <div className="md:col-span-1 md:row-span-1 bento-card flex items-center justify-center group text-center">
              <div>
                <div className="text-green-500 mb-2 flex justify-center">
                  <MessageSquare size={24} />
                </div>
                <h4 className="text-sm font-bold">무료 나눔 게시판</h4>
                <p className="text-[10px] text-slate-500">버리기엔 아까운 물건,<br />이웃과 나눠보세요.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-lg opacity-50">
            <Trash2 size={24} className="text-green-500" />
            <span>클린 가이드 랩</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">업체 제휴 문의</a>
          </div>
          <p className="text-xs text-slate-600">© 2026 클린 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
