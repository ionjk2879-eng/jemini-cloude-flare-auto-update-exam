import { 
  Trash2, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Smile,
  CheckCircle2,
  Quote,
  Zap,
  Gift,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stories = [
  {
    id: 1,
    user: "김*현 (강남구)",
    item: "양문형 냉장고",
    method: "폐가전 무상수거",
    savings: "25,000원",
    icon: <Truck size={18} className="text-green-500" />,
    content: "오래된 냉장고라 어떻게 버릴지 고민했는데, 1599-0903 전화 한 통으로 집 안까지 오셔서 무료로 가져가셨어요. 스티커 값 아껴서 너무 좋네요!"
  },
  {
    id: 2,
    user: "이*진 (서초구)",
    item: "3인용 가죽 소파",
    method: "나눔 커뮤니티",
    savings: "15,000원",
    icon: <Gift size={18} className="text-purple-500" />,
    content: "상태가 꽤 괜찮아서 나눔 글 올렸더니 30분 만에 근처 사시는 분이 가져가셨어요. 버리는 비용도 아끼고 자원도 재활용하니 뿌듯합니다."
  },
  {
    id: 3,
    user: "박*호 (송파구)",
    item: "전자레인지, 청소기 등 5종",
    method: "소형가전 5개 묶음 수거",
    savings: "10,000원",
    icon: <Zap size={18} className="text-blue-500" />,
    content: "자잘한 가전들이 많았는데 5개 모으니까 방문 수거가 되더라고요. 아파트 분리수거장에 내놓는 번거로움 없이 편하게 처리했습니다."
  },
  {
    id: 4,
    user: "정*희 (마포구)",
    item: "원목 식탁 세트",
    method: "사진 견적 후 유료 배출",
    savings: "3,000원 (비교 후 최저가)",
    icon: <CheckCircle2 size={18} className="text-yellow-500" />,
    content: "크기가 커서 걱정했는데 사진 찍어 올리니 바로 배출 가격을 알려주더라고요. 업체 견적 비교해서 가장 저렴한 곳으로 안전하게 보냈습니다."
  }
];

function Success() {
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black mb-6">함께 아낀 비용</h1>
            <p className="text-slate-400 text-lg">클린 가이드를 통해 우리 이웃들이 절약한 실제 사례들입니다.</p>
          </div>

          {/* Big Stat Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bento-card flex flex-col items-center justify-center text-center p-8">
              <TrendingUp className="text-green-500 mb-4" size={32} />
              <div className="text-4xl font-black mb-1 text-green-500">₩1.2억+</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">누적 절약 비용</div>
            </div>
            <div className="bento-card flex flex-col items-center justify-center text-center p-8">
              <Users className="text-blue-500 mb-4" size={32} />
              <div className="text-4xl font-black mb-1 text-blue-500">32,841명</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">함께한 이웃들</div>
            </div>
            <div className="bento-card flex flex-col items-center justify-center text-center p-8">
              <Smile className="text-purple-500 mb-4" size={32} />
              <div className="text-4xl font-black mb-1 text-purple-500">98%</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">만족도 점수</div>
            </div>
          </div>

          {/* Stories List */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-8 border-l-4 border-green-500 pl-4">최근 처리 성공 사례</h3>
            {stories.map((story) => (
              <div key={story.id} className="glass p-8 rounded-3xl relative overflow-hidden group">
                <Quote className="absolute -right-4 -top-4 text-white/5 group-hover:text-green-500/10 transition-colors" size={160} />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 font-bold">
                      {story.user[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{story.user}</h4>
                      <p className="text-sm text-green-500 flex items-center gap-1 font-medium">
                        {story.item}
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
                    {story.icon}
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">절약 비용</p>
                      <p className="text-lg font-black text-green-500">{story.savings}</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-white/5 px-2 py-1 rounded-md text-slate-400 font-medium">
                      처리방법: {story.method}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">
                    "{story.content}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10 text-center">
            <h3 className="text-2xl font-bold mb-4">당신도 0원으로 버릴 수 있습니다</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">지금 바로 버리려는 물건의 가장 저렴한 처리 방법을 확인해보세요.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guide" className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-slate-200 transition-all">
                무료 여부 확인하기
              </Link>
              <Link to="/community" className="glass font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all">
                나눔 글 올리기
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-lg opacity-80 text-left">
            <Trash2 size={24} className="text-green-500" />
            <span>클린 가이드 성공사례</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 클린 가이드. 실제 사용자의 소중한 경험담을 바탕으로 작성되었습니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default Success;
