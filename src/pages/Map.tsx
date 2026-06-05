import { 
  MapPin, 
  Navigation,
  Info,
  Building2,
  Recycle,
  Search
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const locations = [
  {
    name: "강남구청 주민센터",
    address: "서울특별시 강남구 학동로 426",
    type: "폐가전/대형폐기물",
    distance: "0.8km",
    status: "운영중"
  },
  {
    name: "논현1동 사전 수거함",
    address: "서울특별시 강남구 학동로 168",
    type: "소형가전 전용",
    distance: "1.2km",
    status: "운영중"
  },
  {
    name: "삼성동 재활용 센터",
    address: "서울특별시 강남구 봉은사로 401",
    type: "대형가전/가구",
    distance: "2.5km",
    status: "운영중"
  }
];

function Map() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-4">우리 동네 수거함 지도</h1>
              <p className="text-slate-400">가장 가까운 폐가전 수거함과 동사무소 위치를 안내해 드립니다.</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="동네 이름으로 검색"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full aspect-video bg-slate-900 rounded-3xl border border-white/10 mb-12 relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale"></div>
            <div className="z-10 text-center">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <p className="font-bold text-lg mb-2">지도를 불러오는 중입니다</p>
              <p className="text-slate-500 text-sm">현재 위치 권한이 필요합니다.</p>
            </div>
          </div>

          {/* Location Search Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="glass p-6 rounded-2xl">
              <Building2 className="text-blue-500 mb-3" size={24} />
              <h4 className="font-bold mb-1">동사무소</h4>
              <p className="text-xs text-slate-400">대형 폐기물 스티커 구입 및 신고 가능</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <Recycle className="text-green-500 mb-3" size={24} />
              <h4 className="font-bold mb-1">소형가전 수거함</h4>
              <p className="text-xs text-slate-400">5개 미만 소형 가전 상시 배출 가능</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <Info className="text-purple-500 mb-3" size={24} />
              <h4 className="font-bold mb-1">배출 요일</h4>
              <p className="text-xs text-slate-400">지자체별 배출 요일을 꼭 확인하세요</p>
            </div>
          </div>

          {/* List of Locations */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">주변 수거 장소 목록</h3>
            {locations.map((loc, idx) => (
              <div key={idx} className="bento-card hover:border-blue-500/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                      <Navigation size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">{loc.name}</h4>
                        <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full font-bold">{loc.status}</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{loc.address}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500">유형: <span className="text-slate-300">{loc.type}</span></span>
                        <span className="text-slate-500">거리: <span className="text-slate-300">{loc.distance}</span></span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    길찾기 <Navigation size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Map;
