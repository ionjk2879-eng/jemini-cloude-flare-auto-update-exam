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
  CreditCard,
  Home as HomeIcon,
  ArrowRight,
  ChevronRight
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
  { id: 5, name: "송파구청", address: "서울 송파구 올림픽로 326", type: "스티커/신고", lat: 37.5145, lng: 127.1058, city: "서울", category: 'office', desc: "송파구 관내 대형 폐기물 스티커 판매소 안내" },
  
  // 대전
  { id: 7, name: "대전광역시청", address: "대전 서구 둔산로 100", type: "종합 민원", lat: 36.3504, lng: 127.3845, city: "대전", category: 'office', desc: "대전 전역 배출 종합 안내" },
  { id: 8, name: "서구청 (대전)", address: "대전 서구 둔산서로 100", type: "스티커/신고", lat: 36.3467, lng: 127.3789, city: "대전", category: 'office', desc: "서구 관내 대형 폐기물 처리 거점" },
  { id: 9, name: "유성구청", address: "대전 유성구 대학로 211", type: "스티커/신고", lat: 36.3622, lng: 127.3563, city: "대전", category: 'office', desc: "유성구 전역 배출 신고 접수" },
  { id: 22, name: "둔산1동 수거함", address: "대전 서구 둔산로 155", type: "소형가전 전용", lat: 36.3520, lng: 127.3950, city: "대전", category: 'small', desc: "주민센터 내 소형가전 무상 수거함" },
  { id: 10, name: "서구 재활용센터", address: "대전 서구 문정로 48", type: "대형 재활용", lat: 36.3480, lng: 127.3910, city: "대전", category: 'recycle', desc: "중고 가구 수거 및 폐기 상담" },
];

function Map() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'office' | 'small' | 'recycle'>('all');
  const [showDayInfo, setShowDayInfo] = useState(false);
  
  // 거주지 및 주소 검색 상태
  const [homeAddress, setHomeAddress] = useState('');
  const [isHomeSet, setIsHomeSet] = useState(false);
  const [isAddrSearchOpen, setIsAddrSearchOpen] = useState(false);
  const [addrInput, setAddrInput] = useState('');
  
  // 가상의 검색 결과 (쇼핑몰 주소 검색 시뮬레이션)
  const mockAddrResults = useMemo(() => {
    if (addrInput.length < 2) return [];
    return [
      { post: "06040", road: `서울 강남구 학동로 ${addrInput}길`, jibun: "서울 강남구 논현동 123" },
      { post: "06234", road: `서울 강남구 테헤란로 ${addrInput}`, jibun: "서울 강남구 역삼동 456" },
      { post: "35230", road: `대전 서구 둔산로 ${addrInput}`, jibun: "대전 서구 둔산동 789" },
      { post: "35231", road: `대전 서구 문정로 ${addrInput}`, jibun: "대전 서구 탄방동 012" },
    ].filter(a => a.road.includes(addrInput) || a.post.includes(addrInput));
  }, [addrInput]);

  const filteredLocations = useMemo(() => {
    let result = locations;
    if (filterType !== 'all') result = result.filter(l => l.category === filterType);
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
    locations.find(l => l.id === selectedId) || null
  , [selectedId]);

  const focusLocation = useMemo(() => 
    selectedLocation || (filteredLocations.length > 0 ? filteredLocations[0] : null)
  , [selectedLocation, filteredLocations]);

  const googleMapUrl = useMemo(() => {
    if (!focusLocation) return "https://maps.google.com/maps?q=36.5,127.5&z=7&output=embed";
    if (isHomeSet && homeAddress) {
      return `https://maps.google.com/maps?saddr=${encodeURIComponent(homeAddress)}&daddr=${focusLocation.lat},${focusLocation.lng}&z=14&output=embed`;
    }
    return `https://maps.google.com/maps?q=${focusLocation.lat},${focusLocation.lng}&z=16&output=embed`;
  }, [focusLocation, isHomeSet, homeAddress]);

  const selectAddress = (addr: string) => {
    setHomeAddress(addr);
    setIsHomeSet(true);
    setIsAddrSearchOpen(false);
    setAddrInput('');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header & Address Registration */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-12">
            <div className="max-w-xl">
              <h1 className="text-4xl font-black mb-4 tracking-tight">내 주변 수거 경로 탐색</h1>
              <p className="text-slate-400 mb-8 text-lg">거주지를 등록하여 가장 빠른 폐기물 배출 경로를 확인하세요.</p>
              
              {!isHomeSet ? (
                <div 
                  onClick={() => setIsAddrSearchOpen(true)}
                  className="group flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-colors">
                      <HomeIcon size={24} />
                    </div>
                    <div>
                      <p className="text-slate-200 font-bold">우리 집 주소 찾기</p>
                      <p className="text-xs text-slate-500">도로명, 지번, 건물명으로 검색</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-600" />
                </div>
              ) : (
                <div className="flex items-center justify-between p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl animate-in fade-in slide-in-from-left-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      <HomeIcon size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">등록된 거주지</p>
                      <p className="font-bold text-white text-lg">{homeAddress}</p>
                    </div>
                  </div>
                  <button onClick={() => { setIsHomeSet(false); setHomeAddress(''); }} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 transition-all">변경</button>
                </div>
              )}
            </div>

            <div className="relative w-full lg:w-96 self-end">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-blue-500' : 'text-slate-500'}`} size={18} />
              <input 
                type="text" 
                placeholder="동네 이름 검색"
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
            <button 
              onClick={() => { setFilterType(filterType === 'office' ? 'all' : 'office'); setSelectedId(null); }}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${filterType === 'office' ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
            >
              <Building2 size={20} />
              <span className="font-bold text-sm">동사무소</span>
            </button>
            <button 
              onClick={() => { setFilterType(filterType === 'small' ? 'all' : 'small'); setSelectedId(null); }}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${filterType === 'small' ? 'bg-green-600 border-green-500 shadow-lg shadow-green-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
            >
              <Recycle size={20} />
              <span className="font-bold text-sm">소형가전</span>
            </button>
            <button 
              onClick={() => { setFilterType(filterType === 'recycle' ? 'all' : 'recycle'); setSelectedId(null); }}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${filterType === 'recycle' ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
            >
              <Store size={20} />
              <span className="font-bold text-sm">재활용센터</span>
            </button>
            <button onClick={() => setShowDayInfo(true)} className="p-4 rounded-2xl border bg-white/5 border-white/5 hover:bg-white/10 transition-all flex items-center gap-3 text-slate-400">
              <Calendar size={20} />
              <span className="font-bold text-sm">배출 가이드</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="w-full aspect-square md:aspect-[16/9] bg-slate-900 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
                <iframe 
                  key={`${focusLocation?.id || 'base'}-${isHomeSet}`}
                  title="Google Maps"
                  width="100%" height="100%" frameBorder="0" src={googleMapUrl}
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen
                ></iframe>
                
                {selectedLocation && (
                  <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-3xl border-blue-500/30 animate-in slide-in-from-bottom-4 duration-500 shadow-2xl z-20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${selectedLocation.category === 'office' ? 'bg-blue-600' : (selectedLocation.category === 'small' ? 'bg-green-600' : 'bg-purple-600')}`}>
                          <MapPin size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-xl text-white">{selectedLocation.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {isHomeSet && <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full">집 ➡️ 출발</span>}
                            <p className="text-sm text-slate-400">{selectedLocation.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedId(null)} className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-2xl transition-all"><X size={20} /></button>
                        <a 
                          href={`https://www.google.com/maps/dir/${encodeURIComponent(homeAddress || '')}/${encodeURIComponent(selectedLocation.address)}`} 
                          target="_blank" rel="noreferrer" 
                          className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
                        >
                          <Navigation size={18} /> {isHomeSet ? '최적 경로' : '길찾기'}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                <span>장소 목록</span>
                <span className="text-xs bg-white/5 px-2 py-1 rounded-md text-slate-500">{filteredLocations.length}곳</span>
              </h3>
              {filteredLocations.map((loc) => (
                <div key={loc.id} onClick={() => setSelectedId(loc.id)} className={`p-5 rounded-2xl border transition-all cursor-pointer group ${selectedId === loc.id ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-lg ${loc.category === 'office' ? 'text-blue-400 bg-blue-400/10' : (loc.category === 'small' ? 'text-green-400 bg-green-400/10' : 'text-purple-400 bg-purple-400/10')}`}>
                      {loc.category === 'small' ? <Recycle size={18} /> : (loc.category === 'recycle' ? <Store size={18} /> : <Building2 size={18} />)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">{loc.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{loc.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Address Search Modal (Shopping Mall Style) */}
      {isAddrSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAddrSearchOpen(false)}></div>
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="bg-[#1a1a1a] p-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">주소 검색</h2>
              <button onClick={() => setIsAddrSearchOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <div className="p-6 bg-slate-50">
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="예: 판교역로 235, 분당구 주공아파트"
                  className="w-full border-2 border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-900 focus:border-blue-500 outline-none transition-all pr-12"
                  value={addrInput}
                  onChange={(e) => setAddrInput(e.target.value)}
                  autoFocus
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {mockAddrResults.length > 0 ? (
                  mockAddrResults.map((addr, i) => (
                    <div 
                      key={i} 
                      onClick={() => selectAddress(addr.road)}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded leading-none">{addr.post}</span>
                      </div>
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-[10px] bg-blue-100 text-blue-600 font-bold px-1 rounded h-fit mt-0.5">도로명</span>
                        <p className="text-sm text-slate-800 font-medium group-hover:text-blue-600">{addr.road}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] bg-slate-100 text-slate-400 font-bold px-1 rounded h-fit mt-0.5">지번</span>
                        <p className="text-xs text-slate-400">{addr.jibun}</p>
                      </div>
                    </div>
                  ))
                ) : addrInput.length > 0 ? (
                  <div className="text-center py-10">
                    <p className="text-sm text-slate-400">검색 결과가 없습니다.</p>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-4 italic underline decoration-blue-500/30">Tip: 검색 방법</h4>
                    <ul className="text-xs text-slate-500 space-y-3">
                      <li>• <strong>도로명 + 건물번호</strong> (예: 판교역로 235)</li>
                      <li>• <strong>지역명(동/읍/면/리) + 번지</strong> (예: 역삼동 681)</li>
                      <li>• <strong>건물명, 아파트명</strong> (예: 반포자이)</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed">
              본 서비스는 가상의 주소 검색 UI 시뮬레이션입니다. 실제 사용 시에는 카카오/네이버 주소 검색 API를 연동하여 정확한 법정 주소 정보를 제공할 수 있습니다.
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
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
                  <div><h4 className="font-bold text-xl text-white mb-2">편의점 스티커 구매</h4><p className="text-sm text-slate-400 leading-relaxed">거주지 주변 지정 편의점에서 종량제 봉투처럼 스티커를 바로 구매할 수 있습니다.</p></div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-green-600/20 text-green-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-green-500/10"><Smartphone size={28} /></div>
                  <div><h4 className="font-bold text-xl text-white mb-2">전용 앱 (빼기 / 여기로)</h4><p className="text-sm text-slate-400 leading-relaxed">사진만 찍어 올리면 결제부터 수거 예약까지 스마트폰으로 간편하게 해결됩니다.</p></div>
                </div>
              </div>
              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden">
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
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Map;
