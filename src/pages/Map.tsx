import { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, 
  Navigation,
  Info,
  Building2,
  Recycle,
  Search,
  ExternalLink,
  Locate,
  CheckCircle2,
  Map as MapIcon
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Location {
  id: number;
  name: string;
  address: string;
  type: string;
  distance: string;
  status: string;
  lat: number;
  lng: number;
  city: '서울' | '대전';
}

const locations: Location[] = [
  // 서울 지역
  {
    id: 1,
    name: "강남구청 주민센터",
    address: "서울특별시 강남구 학동로 426",
    type: "폐가전/대형폐기물",
    distance: "0.8km",
    status: "운영중",
    lat: 37.5173,
    lng: 127.0474,
    city: '서울'
  },
  {
    id: 2,
    name: "논현1동 사전 수거함",
    address: "서울특별시 강남구 학동로 168",
    type: "소형가전 전용",
    distance: "1.2km",
    status: "운영중",
    lat: 37.5115,
    lng: 127.0285,
    city: '서울'
  },
  {
    id: 3,
    name: "삼성동 재활용 센터",
    address: "서울특별시 강남구 봉은사로 401",
    type: "대형가전/가구",
    distance: "2.5km",
    status: "운영중",
    lat: 37.5110,
    lng: 127.0460,
    city: '서울'
  },
  {
    id: 4,
    name: "서초2동 주민센터",
    address: "서울특별시 서초구 서초대로 314",
    type: "폐가전/대형폐기물",
    distance: "3.1km",
    status: "운영중",
    lat: 37.4925,
    lng: 127.0250,
    city: '서울'
  },
  // 대전 지역
  {
    id: 6,
    name: "대전광역시청",
    address: "대전광역시 서구 둔산로 100",
    type: "폐가전/대형폐기물",
    distance: "0.5km",
    status: "운영중",
    lat: 36.3504,
    lng: 127.3845,
    city: '대전'
  },
  {
    id: 7,
    name: "유성구청 수거함",
    address: "대전광역시 유성구 대학로 211",
    type: "소형가전 전용",
    distance: "1.8km",
    status: "운영중",
    lat: 36.3622,
    lng: 127.3563,
    city: '대전'
  },
  {
    id: 8,
    name: "둔산동 재활용 센터",
    address: "대전광역시 서구 문정로 48",
    type: "대형가전/가구",
    distance: "1.2km",
    status: "운영중",
    lat: 36.3480,
    lng: 127.3910,
    city: '대전'
  },
  {
    id: 9,
    name: "대전 중구청",
    address: "대전광역시 중구 중앙로 100",
    type: "폐가전/대형폐기물",
    distance: "2.5km",
    status: "운영중",
    lat: 36.3248,
    lng: 127.4232,
    city: '대전'
  }
];

// 지역별 지도 영역 설정
const REGION_BOUNDS = {
  '서울': {
    minLat: 37.48,
    maxLat: 37.53,
    minLng: 127.01,
    maxLng: 127.06
  },
  '대전': {
    minLat: 36.31,
    maxLat: 36.37,
    minLng: 127.34,
    maxLng: 127.43
  }
};

function Map() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentCity, setCurrentCity] = useState<'서울' | '대전'>('서울');

  const filteredLocations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return locations.filter(l => l.city === currentCity);
    
    const results = locations.filter(loc => 
      loc.name.toLowerCase().includes(query) || 
      loc.address.toLowerCase().includes(query)
    );

    // 검색 결과가 다른 도시에 있다면 자동으로 도시 전환
    if (results.length > 0 && results[0].city !== currentCity) {
      setCurrentCity(results[0].city);
    }

    return results;
  }, [searchQuery, currentCity]);

  const selectedLocation = useMemo(() => 
    locations.find(l => l.id === selectedId) || null
  , [selectedId]);

  // 위경도를 지도 상의 % 좌표로 변환
  const getPosition = (lat: number, lng: number) => {
    const bounds = REGION_BOUNDS[currentCity];
    const top = 100 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat) * 100);
    const left = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng) * 100;
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-4">우리 동네 수거함 지도</h1>
              <p className="text-slate-400">서울 강남권과 대전 지역의 수거 위치를 확인하실 수 있습니다.</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-blue-500' : 'text-slate-500'}`} size={18} />
              <input 
                type="text" 
                placeholder="동네 이름 검색 (예: 대전, 강남, 둔산)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500/50 transition-all focus:bg-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Region Switcher */}
          <div className="flex gap-2 mb-6">
            {(['서울', '대전'] as const).map((city) => (
              <button
                key={city}
                onClick={() => {
                  setCurrentCity(city);
                  setSearchQuery('');
                  setSelectedId(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentCity === city ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                {city} 지역
              </button>
            ))}
          </div>

          {/* Custom Interactive Map Canvas */}
          <div className="w-full aspect-video bg-slate-900 rounded-3xl border border-white/10 mb-12 relative overflow-hidden shadow-2xl bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {/* Region Label */}
            <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
              <div className="glass px-4 py-2 rounded-xl text-[10px] font-bold text-slate-300 flex items-center gap-2 border-blue-500/20">
                <MapIcon size={14} className="text-blue-500" />
                {currentCity} 지역 지도 활성화됨
              </div>
            </div>

            {/* Map Pins */}
            <div className="absolute inset-10">
              {filteredLocations.map((loc) => {
                const pos = getPosition(loc.lat, loc.lng);
                const isSelected = selectedId === loc.id;
                
                return (
                  <div 
                    key={loc.id}
                    className="absolute transition-all duration-700 ease-in-out"
                    style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                  >
                    <button 
                      onClick={() => setSelectedId(loc.id)}
                      className={`relative group flex flex-col items-center animate-in zoom-in-50 duration-500`}
                    >
                      <div className={`absolute bottom-full mb-2 whitespace-nowrap glass px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${isSelected ? 'opacity-100 translate-y-0 text-blue-400' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-slate-300'}`}>
                        {loc.name}
                      </div>
                      
                      <div className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                        isSelected 
                          ? 'w-10 h-10 bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-110 z-30' 
                          : 'w-8 h-8 bg-[#0f172a] border-2 border-blue-500/50 text-blue-500 hover:scale-110 hover:bg-blue-500/10 z-20'
                      }`}>
                        <MapPin size={isSelected ? 20 : 16} fill={isSelected ? "currentColor" : "none"} />
                      </div>
                      
                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selected Item Floating Card */}
            {selectedLocation && (
              <div className="absolute bottom-6 left-6 right-6 glass p-5 rounded-2xl border-blue-500/30 animate-in slide-in-from-bottom-4 duration-500 z-40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                      {selectedLocation.type.includes('가전') ? <Recycle size={24} /> : <Building2 size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-lg">{selectedLocation.name}</h4>
                        <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">운영중</span>
                      </div>
                      <p className="text-xs text-slate-400">{selectedLocation.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all"
                    >
                      닫기
                    </button>
                    <a 
                      href={`https://www.google.com/maps/search/${encodeURIComponent(selectedLocation.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 px-5 py-2.5 rounded-xl text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 text-sm"
                    >
                      길찾기 <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* List of Locations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {searchQuery ? `'${searchQuery}' 주변 수거 장소` : `${currentCity} 지역 수거 장소 목록`} 
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full">{filteredLocations.length}곳 발견</span>
            </div>
            
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <div 
                  key={loc.id} 
                  onClick={() => setSelectedId(loc.id)}
                  className={`bento-card cursor-pointer transition-all duration-300 border-white/5 ${
                    selectedId === loc.id 
                      ? 'border-blue-500/50 bg-blue-500/10 scale-[1.01] shadow-xl shadow-blue-500/5' 
                      : 'hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                        selectedId === loc.id ? 'bg-blue-500 text-white' : 'bg-white/5 text-blue-500'
                      }`}>
                        <Navigation size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-bold text-lg transition-colors ${selectedId === loc.id ? 'text-white' : 'text-slate-200'}`}>{loc.name}</h4>
                          {selectedId === loc.id && <CheckCircle2 size={14} className="text-blue-500 animate-in zoom-in" />}
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{loc.address}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-slate-500 flex items-center gap-1"><Info size={12} /> {loc.type}</span>
                          <span className="text-slate-500 flex items-center gap-1"><MapPin size={12} /> {loc.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end md:self-auto">
                       <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${selectedId === loc.id ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-500'}`}>
                         {selectedId === loc.id ? '지도에서 확인 중' : '위치 선택'}
                       </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 glass rounded-3xl border-white/5 border-dashed">
                <Search size={40} className="mx-auto text-slate-700 mb-4" />
                <p className="text-slate-400 font-bold">검색 결과가 없습니다.</p>
                <p className="text-xs text-slate-600 mt-2">다른 지역이나 장소명을 입력해 보세요.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Map;
