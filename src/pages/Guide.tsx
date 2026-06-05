import { useState } from 'react';
import { 
  Trash2, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Package,
  Armchair,
  Tv,
  Lightbulb,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const guideCategories = [
  {
    title: "가구류",
    icon: <Armchair size={24} />,
    color: "bg-blue-500",
    items: [
      { name: "장롱 (1자 기준)", price: "3,000원 ~", tip: "문짝 분리 시 운반이 쉬워요" },
      { name: "소파 (3인용)", price: "10,000원 ~", tip: "쿠션은 별도로 버려야 할 수 있어요" },
      { name: "침대 매트리스 (퀸)", price: "8,000원 ~", tip: "오염이 심하면 수거가 거절될 수 있어요" },
    ]
  },
  {
    title: "가전류",
    icon: <Tv size={24} />,
    color: "bg-green-500",
    items: [
      { name: "대형 가전 (냉장고 등)", price: "무료", tip: "무상방문수거(1599-0903) 이용" },
      { name: "컴퓨터/모니터", price: "무료/유료", tip: "소형 가전 5개 이상 묶음 시 무료" },
      { name: "전자레인지", price: "무료", tip: "주민센터 전용 수거함 이용 가능" },
    ]
  },
  {
    title: "기타 대형",
    icon: <Package size={24} />,
    color: "bg-purple-500",
    items: [
      { name: "자전거", price: "3,000원 ~", tip: "상태가 좋으면 '빼기' 앱 판매 추천" },
      { name: "피아노", price: "별도문의", tip: "전문 수거 업체 이용이 안전합니다" },
      { name: "거울/유리", price: "2,000원 ~", tip: "신문지로 감싸서 깨지지 않게 주의" },
    ]
  }
];

function Guide() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = guideCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-green-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black mb-4">품목별 배출 가이드</h1>
            <p className="text-slate-400">어떻게 버려야 할지 막막한 대형 폐기물, 여기서 한눈에 확인하세요.</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="무엇을 버리시나요? (예: 소파, 냉장고, 책상...)"
              className="w-full glass py-4 pl-12 pr-6 rounded-2xl outline-none border border-white/10 focus:border-green-500/50 transition-all text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick Tips Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">무상 수거 대상인가요?</h4>
                <p className="text-sm text-slate-400">대부분의 가전제품은 1599-0903을 통해 무료로 버릴 수 있습니다.</p>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">스티커는 어디서 사나요?</h4>
                <p className="text-sm text-slate-400">동사무소, 편의점 또는 지자체 홈페이지에서 구매 가능합니다.</p>
              </div>
            </div>
          </div>

          {/* Guide Sections */}
          <div className="space-y-8">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, idx) => (
                <section key={idx} className="bento-card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 ${category.color} rounded-xl flex items-center justify-center text-white`}>
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-white/5 hover:bg-white/10 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors border border-white/5">
                        <div>
                          <h4 className="font-bold text-lg">{item.name}</h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <Lightbulb size={12} className="text-yellow-500" /> {item.tip}
                          </p>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6">
                          <span className="text-green-500 font-bold">{item.price}</span>
                          <Link 
                            to={`/guide/${encodeURIComponent(item.name)}`}
                            className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all font-medium"
                          >
                            상세보기
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-20 glass rounded-3xl">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <Info size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">검색 결과가 없습니다</h3>
                <p className="text-slate-500">다른 품목으로 검색하시거나 사진 상담을 이용해보세요.</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10 text-center">
            <h3 className="text-xl font-bold mb-2 text-white">찾으시는 품목이 없나요?</h3>
            <p className="text-slate-400 text-sm mb-6">사진을 찍어 올리시면 인공지능이 배출 방법을 알려드려요.</p>
            <Link to="/estimate" className="inline-block bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-slate-200 transition-all">
              사진 상담 시작하기
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Guide;
