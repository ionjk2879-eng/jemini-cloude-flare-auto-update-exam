import { useState, useEffect } from 'react';
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
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  {
    question: "무상수거 제외 대상은 어떤 것들이 있나요?",
    answer: "원형이 훼손된 가전(컴프레셔 탈취 등), 빌트인 가전, 그리고 가구류는 무상 수거 대상이 아닙니다. 가구는 반드시 지자체 스티커를 부착해야 합니다."
  },
  {
    question: "비가 오는 날에도 배출해도 되나요?",
    answer: "가전제품은 전자회로 부식 위험이 있어 가급적 맑은 날 배출을 권장합니다. 부득이한 경우 비닐 등으로 덮어 배출해 주세요."
  },
  {
    question: "스티커를 잘못 샀는데 환불이 가능한가요?",
    answer: "사용하지 않은 스티커(필증)는 구매하신 곳(주민센터, 편의점 등)이나 지자체 홈페이지를 통해 취소 및 환불이 가능합니다."
  }
];

const tips = [
  "대형 가전은 1599-0903으로 예약하면 집 안까지 방문 수거해드려요.",
  "소형 가전은 5개를 모으면 무상 방문 수거 대상이 됩니다.",
  "상태가 좋은 가구는 폐기 전에 나눔 커뮤니티에 먼저 올려보세요.",
  "거울이 달린 장롱은 깨지지 않도록 테이프로 'X'자 표시를 하면 안전합니다."
];

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-green-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-500 text-xs font-bold mb-6">
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

          {/* Today's Tip */}
          <div className="max-w-3xl mx-auto mb-24">
            <div className="glass p-4 rounded-2xl flex items-center gap-4 border-green-500/20 bg-green-500/5">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0 text-white">
                <Sparkles size={20} />
              </div>
              <p className="text-sm md:text-base font-medium">
                <span className="text-green-500 font-bold mr-2">오늘의 팁:</span>
                {currentTip}
              </p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div id="free-guide" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <div className="bento-card bg-gradient-to-br from-green-500/10 to-transparent animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
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

            <div className="bento-card animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
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

            <div className="bento-card animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px] mb-24">
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

          {/* FAQ Section */}
          <section className="max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center">자주 묻는 질문</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="glass rounded-2xl overflow-hidden border border-white/5 transition-all">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-left">{faq.question}</span>
                    {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
