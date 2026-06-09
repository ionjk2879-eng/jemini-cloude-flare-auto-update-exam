import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  HelpCircle,
  Camera,
  Phone,
  Globe,
  Search
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const itemDetails: Record<string, any> = {
  "장롱 (1자 기준)": {
    category: "가구류",
    price: "3,000원 ~",
    method: "대형폐기물 스티커 부착 후 배출",
    description: "장롱은 크기에 따라 비용이 달라집니다. 보통 1자(30cm) 기준으로 산정하며, 문짝을 분리하여 내놓으시면 수거가 더 원활합니다.",
    steps: [
      "거주지 관할 구청 홈페이지 또는 주민센터 방문하여 신고",
      "품목에 맞는 수수료 결제 후 스티커(필증) 발급",
      "지정된 배출 일시 및 장소에 내놓기",
      "배출한 물품에 스티커를 잘 보이게 부착"
    ],
    warnings: [
      "유리 거울이 부착된 경우 파손 주의",
      "내부 물건은 반드시 모두 비워야 함",
      "분해하지 않고 통째로 내놓는 것을 권장 (수거 시 용이)"
    ]
  },
  "소파 (3인용)": {
    category: "가구류",
    price: "10,000원 ~",
    method: "대형폐기물 신고 후 지정장소 배출",
    description: "3인용 소파는 부피가 커서 배출 시 공간 확보가 중요합니다. 인조가죽, 천, 목재 등 소재에 상관없이 대형폐기물로 분류됩니다.",
    steps: [
      "폐기물 스티커 구매 또는 모바일 앱 '빼기' 등 이용",
      "수거 업체와 일정 조율 (필요 시)",
      "현관 앞 또는 지정된 수거 장소로 이동",
      "신고 번호를 기재하거나 스티커 부착"
    ],
    warnings: [
      "쿠션이나 방석이 분리되는 경우 묶어서 배출",
      "리클라이너 소파는 무게가 무거우니 운반 시 주의",
      "수거 전까지 타인의 통행에 방해가 되지 않도록 배치"
    ]
  },
  "대형 가전 (냉장고 등)": {
    category: "가전류",
    price: "무료",
    method: "폐가전 무상방문수거 서비스 이용",
    description: "냉장고, 세탁기, 에어컨 등 대형 가전은 환경부 주관 무상방문수거 서비스를 통해 비용 없이 배출할 수 있습니다.",
    steps: [
      "폐가전 무상방문수거 홈페이지(15990903.or.kr) 접속",
      "배출 예약 신청 (품목, 수량, 장소 선택)",
      "예약된 날짜에 수거 기사님 방문",
      "현장 수거 진행"
    ],
    warnings: [
      "에어컨, 벽걸이 TV는 미리 철거되어 있어야 함",
      "원형이 훼손된 제품(핵심 부품 탈취 등)은 수거 불가할 수 있음",
      "빌트인 가전은 직접 분리해두어야 함"
    ]
  },
  "면도날/칼날": {
    category: "생활/위험류",
    price: "무료",
    method: "종량제 봉투 (일반쓰레기)",
    description: "사용하신 면도날이나 칼날은 수거 기사님이 다치지 않도록 안전하게 포장하여 버려야 하는 위험 품목입니다.",
    steps: [
      "신문지나 두꺼운 종이로 날카로운 부분을 여러 번 감싸기",
      "테이프로 꼼꼼히 고정하여 내용물이 빠지지 않게 하기",
      "종량제 봉투(일반쓰레기)의 가운데 부분에 넣어 배출",
      "봉투 겉면에 '날카로움 주의'라고 기재하면 더욱 안전합니다"
    ],
    warnings: [
      "절대로 그냥 버리지 마세요 (수거 기사님 부상 위험)",
      "캔이나 플라스틱 통에 모아서 버리는 것도 좋은 방법입니다",
      "재활용(금속류)으로 분류하지 마시고 일반쓰레기로 배출하세요"
    ]
  },
  "폐건전지": {
    category: "생활/위험류",
    price: "무료",
    method: "전용 수거함 배출",
    description: "건전지는 토양 오염과 화재 위험이 있어 반드시 분리배출해야 하는 품목입니다.",
    steps: [
      "다 쓴 건전지를 한곳에 모으기",
      "가까운 주민센터, 아파트 단지 내 전용 수거함 확인",
      "대형마트나 지하철역 등에 설치된 폐건전지 수거함 이용",
      "수거함에 투입"
    ],
    warnings: [
      "일반쓰레기와 섞어서 버리면 화재의 위험이 있습니다",
      "수은전지, 리튬전지 등 모든 종류의 건전지가 대상입니다",
      "녹슬거나 누액이 발생한 건전지는 비닐에 싸서 배출하세요"
    ]
  },
  "폐의약품": {
    category: "생활/위험류",
    price: "무료",
    method: "약국/보건소 수거함 이용",
    description: "유통기한이 지났거나 먹다 남은 약은 생태계 교란을 막기 위해 지정된 곳에 버려야 합니다.",
    steps: [
      "알약은 포장지(PTP)를 제거하고 내용물만 봉투에 모으기",
      "가루약은 포장지를 뜯지 말고 그대로 모으기",
      "물약(시럽)은 한 병에 모을 수 있는 만큼 모으기",
      "약국, 보건소, 또는 주민센터 내 폐의약품 전용 수거함에 제출"
    ],
    warnings: [
      "변기나 하수구에 버리면 수질 오염의 원인이 됩니다",
      "일반쓰레기로 버리면 토양에 흡수되어 생태계에 악영향을 줍니다",
      "포장지(상자)는 종이류로 분리배출 하세요"
    ]
  }
};

function GuideDetail() {
  const { itemName } = useParams();
  const [district, setDistrict] = useState('');

  const detail = itemDetails[itemName || ""] || {
    category: "기타",
    price: "별도 문의",
    method: "지자체 문의 필요",
    description: "해당 품목의 상세 정보가 아직 등록되지 않았습니다.",
    steps: ["지자체 홈페이지 확인", "주민센터 문의"],
    warnings: ["정확한 배출 방법은 관할 구역에 따라 다를 수 있습니다."]
  };

  const handleDistrictSearch = () => {
    if (!district.trim()) return;
    const searchQuery = `${district} 대형폐기물 인터넷 신고`;
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 mb-4">
              {detail.category}
            </div>
            <h1 className="text-4xl font-black mb-4">{itemName}</h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                <DollarSign size={18} />
                배출 비용: {detail.price}
              </div>
              <div className="flex items-center gap-2 text-blue-400 font-bold bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
                <Info size={18} />
                {detail.method}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Local District Quick Search */}
            <section className="glass p-8 rounded-3xl border-green-500/20 bg-green-500/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Search className="text-green-500" size={20} />
                    우리 동네 배출 사이트 찾기
                  </h3>
                  <p className="text-sm text-slate-400">거주하시는 구(예: 강남구, 영등포구)를 입력하시면 바로 연결해드려요.</p>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="예: 강남구"
                    className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl outline-none focus:border-green-500/50 transition-all w-full md:w-40 text-slate-200"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDistrictSearch()}
                  />
                  <button 
                    onClick={handleDistrictSearch}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl transition-all shrink-0 shadow-lg shadow-green-500/20"
                  >
                    이동
                  </button>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="text-slate-400" size={20} />
                어떤 품목인가요?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {detail.description}
              </p>
            </section>

            {/* Steps */}
            <section className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                배출 절차
              </h3>
              <div className="space-y-4">
                {detail.steps.map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-slate-300">{step}</p>
                  </div>
                ))}
              </div>

              {/* Local Gov Inquiry Tip */}
              <div className="mt-8 space-y-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                    <Phone size={18} />
                    전화 문의
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    관할 <strong className="text-slate-200 font-semibold">구청 청소행정과</strong> 또는 <strong className="text-slate-200 font-semibold">주민센터</strong>로 전화하시면 가장 정확하게 안내받으실 수 있습니다.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                    <Globe size={18} />
                    인터넷 문의
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-2">
                    지자체 홈페이지의 <strong className="text-slate-200 font-semibold">'대형폐기물 인터넷 신고'</strong> 게시판이나 <strong className="text-slate-200 font-semibold">'국민신문고'</strong>를 통해 온라인으로도 문의 및 민원 신청이 가능합니다.
                  </p>
                  <p className="text-[10px] text-slate-500 italic">* 네이버/구글에 'OO구 대형폐기물'을 검색하시면 해당 지역 사이트로 바로 이동할 수 있습니다.</p>
                </div>
              </div>
            </section>

            {/* Warnings */}
            <section className="glass p-8 rounded-3xl border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                주의사항
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-400">
                {detail.warnings.map((warning: string, idx: number) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </section>

            {/* AI Call to Action */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">헷갈리시나요?</h3>
                <p className="text-slate-400 text-sm">사진을 찍으시면 정확한 규격을 AI가 분석해드립니다.</p>
              </div>
              <Link to="/estimate" className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition-all shrink-0">
                <Camera size={20} />
                AI 분석 시작
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GuideDetail;
