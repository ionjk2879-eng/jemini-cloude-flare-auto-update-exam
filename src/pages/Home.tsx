import { 
  Trash2, 
  MapPin, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Truck as TruckIcon, 
  Zap,
  Search,
  Camera,
  Phone,
  CheckCircle2,
  Gift,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link to="/guide" className="hover:text-white transition-colors">폐기물 가이드</Link>
            <Link to="/map" className="hover:text-white transition-colors">수거 맵</Link>
            <Link to="/community" className="hover:text-white transition-colors">나눔 커뮤니티</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:1599-0903" className="hidden sm:flex items-center gap-2 text-sm font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
              <Phone size={14} /> 1599-0903
            </a>
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
              <span>스티커 사기 전에 확인하세요! 무료 배출 가이드</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
              대형 폐기물,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                0원으로 버리는 법
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              가전제품 무상 수거부터 이웃 나눔까지, <br />
              버리기 힘든 큰 짐을 가장 경제적이고 스마트하게 처리하는 모든 방법.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/guide" className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                품목별 무료 여부 확인 <Search size={20} />
              </Link>
              <button className="w-full sm:w-auto glass hover:bg-white/10 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                <Phone size={20} /> 무상수거 바로예약
              </button>
            </div>
          </section>

          {/* Quick Info Grid */}
          <div id="free-guide" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <div className="bento-card bg-gradient-to-br from-green-500/10 to-transparent">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <Phone size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">폐가전 무상수거</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                냉장고, 세탁기, TV 등 대형 가전은 국가에서 무료로 수거합니다. (전화: 1599-0903)
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> 단일 품목 방문 수거</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> 수수료 전액 무료</li>
              </ul>
            </div>

            <div className="bento-card">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">소형가전 '5개' 법칙</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                청소기, 선풍기 등 작은 가전은 5개 이상 모으면 무상 방문 수거가 가능합니다.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> 소형 가전 5개 이상 묶음</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> 대형 가전과 함께 배출 가능</li>
              </ul>
            </div>

            <div className="bento-card">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <Gift size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">무료 나눔 플랫폼</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                상태가 좋은 가구는 '당근', '빼기' 앱의 무료 나눔을 이용해 비용 없이 처리하세요.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-500" /> 당근마켓 무료나눔</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-500" /> 빼기 '내려드림' 서비스</li>
              </ul>
            </div>
          </div>

          {/* Bento Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
            {/* Disposal Guide Detail */}
            <Link to="/guide" className="md:col-span-2 md:row-span-2 bento-card flex flex-col justify-between group overflow-hidden text-left">
              <div className="z-10">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-green-500">
                  <BookOpen />
                </div>
                <h3 className="text-2xl font-bold mb-2">배출 가이드 매뉴얼</h3>
                <p className="text-slate-400">품목별 배출 요령과 평균 수수료, 무료 수거 가능 여부를 한눈에 확인하세요.</p>
              </div>
              <div className="z-10 mt-4 flex items-center gap-2 text-sm font-bold text-green-500 group-hover:gap-3 transition-all">
                가이드 전체 보기 <ArrowRight size={16} />
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <Trash2 size={240} />
              </div>
            </Link>

            {/* Map Service */}
            <Link to="/map" className="md:col-span-2 md:row-span-1 bento-card flex items-center gap-6 group text-left">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform text-blue-500">
                <MapPin />
              </div>
              <div>
                <h3 className="text-xl font-bold">우리 동네 수거함 지도</h3>
                <p className="text-slate-400 text-sm">가장 가까운 폐가전 수거함과 동사무소를 찾아보세요.</p>
              </div>
            </Link>

            {/* Success Counter */}
            <Link to="/success" className="md:col-span-1 md:row-span-2 bento-card flex flex-col justify-between text-center hover:border-green-500/30 transition-colors">
              <div className="flex justify-center mb-4">
                <Users className="text-purple-400" size={32} />
              </div>
              <div>
                <div className="text-4xl font-black mb-1">32,841</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">함께 아낀 비용</div>
              </div>
              <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">오늘도 12명이 비용 없이 처리했습니다.</p>
            </Link>

            {/* Community Highlight */}
            <Link to="/community" id="community" className="md:col-span-1 md:row-span-1 bento-card flex flex-col justify-center text-left hover:border-green-500/30 transition-colors">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <MessageSquare size={16} />
                <span className="text-xs font-bold uppercase tracking-tighter">실시간 나눔</span>
              </div>
              <p className="text-sm font-medium line-clamp-2">"방금 강남구에서 3인용 소파 무료 나눔이 올라왔어요!"</p>
            </Link>

            {/* Request Status */}
            <Link to="/truck" className="md:col-span-2 md:row-span-1 bento-card flex items-center justify-between group overflow-hidden hover:border-green-500/30 transition-colors">
              <div className="z-10 text-left">
                <h3 className="text-xl font-bold">전문 수거 차량 호출</h3>
                <p className="text-slate-400 text-sm">인증된 파트너 업체가 안전하게 수거해 드립니다.</p>
              </div>
              <TruckIcon className="text-white/5 group-hover:text-green-500/20 transition-colors" size={120} style={{ marginRight: '-40px' }} />
            </Link>

            {/* Camera Quote */}
            <Link to="/estimate" className="md:col-span-1 md:row-span-1 bento-card flex items-center justify-center group text-center cursor-pointer hover:bg-green-500/5 hover:border-green-500/30 transition-colors">
              <div>
                <div className="text-green-500 mb-2 flex justify-center">
                  <Camera size={24} />
                </div>
                <h4 className="text-sm font-bold">사진 견적</h4>
                <p className="text-[10px] text-slate-500">찍어서 올리면<br />무료 여부 판독</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-lg opacity-80 text-left">
            <Trash2 size={24} className="text-green-500" />
            <span>클린 가이드 랩</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">업체 제휴 문의</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-500">무상방문수거 문의</p>
              <p className="text-sm font-bold text-green-500">1599-0903</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-slate-600">© 2026 클린 가이드. 모든 정보는 e-순환거버넌스 및 지자체 공공 데이터를 기반으로 제공됩니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
