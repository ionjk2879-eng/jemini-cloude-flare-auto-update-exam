import { useState, useMemo } from 'react';
import { 
  MapPin, 
  Navigation,
  Info,
  Building2,
  Recycle,
  Search,
  ExternalLink,
  CheckCircle2,
  X,
  Calendar,
  Store,
  Smartphone,
  CreditCard
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Location {
  id: number;
  name: string;
  address: string;
  type: string;
  lat: number;
  lng: number;
  city: string;
  category: 'office' | 'small' | 'recycle';
  desc: string;
}

const locations: Location[] = [
  // 서울
  { id: 1, name: "강남구청", address: "서울 강남구 학동로 426", type: "스티커/신고", lat: 37.5173, lng: 127.0474, city: "서울", category: 'office', desc: "스티커 구매 및 온라인/앱(빼기) 신고 가능" },
  { id: 2, name: "역삼1동 주민센터", address: "서울 강남구 역삼로7길 16", type: "스티커/신고", lat: 37.4950, lng: 127.0330, city: "서울", category: 'office', desc: "관내 대형 폐기물 배출 신고 및 편의점 판매 안내" },
  { id: 3, name: "삼성동 수거함", address: "서울 강남구 삼성동 16-1", type: "소형가전 전용", lat: 37.5140, lng: 127.0560, city: "서울", category: 'small', desc: "5개 미만 소형 가전 상시 무료 배출 가능" },
  { id: 4, name: "강남구 재활용센터", address: "서울 강남구 봉은사로 401", type: "대형 재활용", lat: 37.5110, lng: 127.0460, city: "서울", category: 'recycle', desc: "가구/가전 기증 및 매입 상담 가능" },
  { id: 5, name: "송파구청", address: "서울 송파구 올림픽로 326", type: "스티커/신고", lat: 37.5145, lng: 127.1058, city: "서울", category: 'office', desc: "스티커 판매소 위치 확인 가능" },
  
  // 대전 (확장 데이터)
  { id: 7, name: "대전광역시청", address: "대전 서구 둔산로 100", type: "종합 민원", lat: 36.3504, lng: 127.3845, city: "대전", category: 'office', desc: "대전 전역 배출 종합 안내" },
  { id: 8, name: "서구청 (대전)", address: "대전 서구 둔산서로 100", type: "스티커/신고", lat: 36.3467, lng: 127.3789, city: "대전", category: 'office', desc: "서구 관내 대형 폐기물 처리 거점" },
  { id: 9, name: "유성구청", address: "대전 유성구 대학로 211", type: "스티커/신고", lat: 36.3622, lng: 127.3563, city: "대전", category: 'office', desc: "유성구 전역 배출 신고 접수" },
  { id: 20, name: "중구청 (대전)", address: "대전 중구 중앙로 100", type: "스티커/신고", lat: 36.3248, lng: 127.4232, city: "대전", category: 'office', desc: "원도심 대형 폐기물 행정 처리" },
  { id: 21, name: "동구청 (대전)", address: "대전 동구 동구청로 147", type: "스티커/신고", lat: 36.3339, lng: 127.4522, city: "대전", category: 'office', desc: "동구 지역 폐기물 스티커 판매" },
  
  { id: 22, name: "둔산1동 수거함", address: "대전 서구 둔산로 155", type: "소형가전 전용", lat: 36.3520, lng: 127.3950, city: "대전", category: 'small', desc: "주민센터 내 소형가전 무상 수거함" },
  { id: 23, name: "궁동 소형 수거함", address: "대전 유성구 궁동 412", type: "소형가전 전용", lat: 36.3615, lng: 127.3480, city: "대전", category: 'small', desc: "대학가 인근 소형 가전 전용 배출처" },
  { id: 24, name: "노은동 수거거점", address: "대전 유성구 노은동 547", type: "소형가전 전용", lat: 36.3720, lng: 127.3180, city: "대전", category: 'small', desc: "노은지구 상시 무상 배출 가능" },
  { id: 25, name: "가양동 소형 수거함", address: "대전 동구 가양동 435", type: "소형가전 전용", lat: 36.3450, lng: 127.4420, city: "대전", category: 'small', desc: "동구 주택가 밀집 지역 수거함" },
  
  { id: 10, name: "서구 재활용센터", address: "대전 서구 문정로 48", type: "대형 재활용", lat: 36.3480, lng: 127.3910, city: "대전", category: 'recycle', desc: "중고 가구 수거 및 폐기 상담" },
  { id: 26, name: "유성구 재활용센터", address: "대전 유성구 현충원로 347", type: "대형 재활용", lat: 36.3580, lng: 127.2950, city: "대전", category: 'recycle', desc: "유성구 지정 대형 폐기물 재활용 거점" },
  { id: 27, name: "대덕구 재활용센터", address: "대전 대덕구 대화로 101", type: "대형 재활용", lat: 36.3650, lng: 127.4120, city: "대전", category: 'recycle', desc: "산업단지 인근 대형 품목 전문 처리" },

  // 부산
  { id: 11, name: "부산광역시청", address: "부산 연제구 중앙대로 1001", type: "스티커/신고", lat: 35.1795, lng: 129.0756, city: "부산", category: 'office', desc: "부산시 자원순환과 통합 안내" },
  { id: 12, name: "해운대구청", address: "부산 해운대구 중동 1로 1", type: "스티커/신고", lat: 35.1631, lng: 129.1636, city: "부산", category: 'office', desc: "관광 특구 내 대형 폐기물 신속 처리 신고" },
  { id: 13, name: "부산 재활용은행", address: "부산 동구 중앙대로 263", type: "대형 재활용", lat: 35.1205, lng: 129.0430, city: "부산", category: 'recycle', desc: "부산 최대 규모 중고 가구/가전 거점" },
  
  // 대구
  { id: 14, name: "대구광역시청", address: "대구 중구 공평로 88", type: "스티커/신고", lat: 35.8711, lng: 128.6014, city: "대구", category: 'office', desc: "대구시 대형 폐기물 수수료 확인 및 신고" },
  { id: 15, name: "수성구청 수거함", address: "대구 수성구 달구벌대로 2450", type: "소형가전 전용", lat: 35.8584, lng: 128.6300, city: "대구", category: 'small', desc: "수성구 지정 소형 가전 상시 배출" },

  // 광주
  { id: 16, name: "광주광역시청", address: "광주 서구 내방로 111", type: "스티커/신고", lat: 35.1601, lng: 126.8514, city: "광주", category: 'office', desc: "광주시 자원순환 통합 안내" },
  { id: 17, name: "광산구 재활용센터", address: "광주 광산구 사암로 340", type: "대형 재활용", lat: 35.1750, lng: 126.8120, city: "광주", category: 'recycle', desc: "호남권 대형 가구/가전 재활용 거점" },
];

function Map() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'office' | 'small' | 'recycle'>('all');
  const [showDayInfo, setShowDayInfo] = useState(false);

  const filteredLocations = useMemo(() => {
    let result = locations;
    
    if (filterType !== 'all') {
      result = result.filter(l => l.category === filterType);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(loc => 
        loc.name.toLowerCase().includes(query) || 
        loc.address.toLowerCase().includes(query) ||
        loc.city.toLowerCase().includes(query)
      );
    }
    return result;
  }, [searchQuery, filterType]);

  const selectedLocation = useMemo(() => 
    locations.find(l => l.id === selectedId) || (filteredLocations.length > 0 ? filteredLocations[0] : null)
  , [selectedId, filteredLocations]);

  const googleMapUrl = useMemo(() => {
    if (!selectedLocation) return "https://maps.google.com/maps?q=36.5,127.5&z=7&output=embed";
    return `https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&z=16&output=embed`;
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-4">전국 수거 거점 지도</h1>
              <p className="text-slate-400">구글 지도를 통해 대전 전역 및 전국 주요 장소를 확인하세요.</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-blue-500' : 'text-slate-500'}`} size={18} />
              <input 
                type="text" 
                placeholder="동네 이름 검색 (예: 둔산동, 유성, 강남)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-blue-500/50 transition-all focus:bg-white/10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedId(null);
                }}
              />
            </div>
          </div>

          {/* Quick Filter Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <button onClick={() => setFilterType(filterType === 'office' ? 'all' : 'office')} className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${filterType === 'office' ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
              <Building2 size={20} />
              <span className="font-bold text-sm">동사무소</span>
            </button>
            <button onClick={() => setFilterType(filterType === 'small' ? 'all' : 'small')} className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${filterType === 'small' ? 'bg-green-600 border-green-500 shadow-lg shadow-green-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
              <Recycle size={20} />
              <span className="font-bold text-sm">소형가전</span>
            </button>
            <button onClick={() => setFilterType(filterType === 'recycle' ? 'all' : 'recycle')} className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${filterType === 'recycle' ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
              <Store size={20} />
              <span className="font-bold text-sm">재활용센터</span>
            </button>
            <button onClick={() => setShowDayInfo(true)} className="p-4 rounded-2xl border bg-white/5 border-white/5 hover:bg-white/10 transition-all flex items-center gap-3 text-slate-400">
              <Calendar size={20} />
              <span className="font-bold text-sm">배출 가이드</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Map Area */}
            <div className="lg:col-span-3">
              <div className="w-full aspect-square md:aspect-[16/9] bg-slate-900 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
                <iframe 
                  key={selectedLocation?.id || 'base'}
                  title="Google Maps"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  src={googleMapUrl}
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen
                ></iframe>
                
                {selectedLocation && (
                  <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-3xl border-blue-500/30 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${selectedLocation.category === 'office' ? 'bg-blue-600' : (selectedLocation.category === 'small' ? 'bg-green-600' : 'bg-purple-600')}`}>
                          <MapPin size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-xl text-white">{selectedLocation.name}</h4>
                          <p className="text-sm text-slate-400">{selectedLocation.address}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedLocation.address)}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
                        >
                          <Navigation size={18} /> 길찾기
                        </a>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                      <Info size={14} className="text-blue-400" />
                      <p className="text-xs text-slate-400">{selectedLocation.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* List Area */}
            <div className="space-y-4 max-h-[600px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                <span>장소 목록</span>
                <span className="text-xs bg-white/5 px-2 py-1 rounded-md text-slate-500">{filteredLocations.length}곳</span>
              </h3>
              
              {filteredLocations.map((loc) => (
                <div 
                  key={loc.id} 
                  onClick={() => setSelectedId(loc.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer group ${selectedId === loc.id ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-lg ${loc.category === 'office' ? 'text-blue-400 bg-blue-400/10' : (loc.category === 'small' ? 'text-green-400 bg-green-400/10' : 'text-purple-400 bg-purple-400/10')}`}>
                      {loc.category === 'small' ? <Recycle size={18} /> : (loc.category === 'recycle' ? <Store size={18} /> : <Building2 size={18} />)}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">{loc.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{loc.address}</p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredLocations.length === 0 && (
                <div className="text-center py-20 text-slate-600">
                  <Search size={32} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">검색 결과가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Disposal Info Modal */}
      {showDayInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDayInfo(false)}></div>
          <div className="bg-[#0f172a] w-full max-w-3xl rounded-[2.5rem] border border-white/10 p-10 relative z-10 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <Smartphone className="text-blue-500" size={32} /> 대형 폐기물 스마트 배출
              </h2>
              <button onClick={() => setShowDayInfo(false)} className="bg-white/5 p-3 rounded-full text-slate-400 hover:text-white transition-all"><X size={24} /></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10"><CreditCard size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-2">편의점 스티커 구매</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">거주지 주변 지정 편의점에서 종량제 봉투처럼 스티커를 바로 구매할 수 있습니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-green-600/20 text-green-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-green-500/10"><Smartphone size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-2">전용 앱 (빼기 / 여기로)</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">사진만 찍어 올리면 결제부터 수거 예약까지 스마트폰으로 간편하게 해결됩니다.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 opacity-5 text-blue-500"><Search size={160} /></div>
                <h4 className="font-bold text-lg mb-6 text-blue-400">온라인 신고 4단계</h4>
                <div className="space-y-5 relative z-10">
                  {["구청 홈페이지 접속", "대형폐기물 신고 선택", "정보 입력 및 결제", "신고번호 기재 후 배출"].map((t, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm text-slate-300">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span>
                      <p className="font-medium">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-10 text-center text-xs text-slate-500">※ 정확한 배출 요일은 각 지자체 조례에 따라 다를 수 있습니다.</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Map;
