import { useState, useRef } from 'react';
import { 
  Trash2, 
  Camera, 
  Upload,
  Info,
  CheckCircle2,
  Zap,
  Loader2,
  ArrowRight,
  RefreshCcw,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Estimate() {
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [analysisResult, setAnalysisResult] = useState({
    name: '3인용 가죽 소파',
    price: '10,000',
    category: '가구류',
    sizeTag: '대형 폐기물',
    guideItem: '소파 (3인용)',
    description: '해당 품목은 대형 폐기물로 분류됩니다. 상태가 양호하다면 무상 나눔을 권장드리며, 폐기 시에는 지자체 신고 후 배출이 필요합니다.'
  });

  const mockResults = [
    {
      name: '3인용 가죽 소파',
      price: '10,000',
      category: '가구류',
      sizeTag: '대형 폐기물',
      guideItem: '소파 (3인용)',
      description: '부피가 큰 대형 가구로 분류됩니다. 지자체 대형폐기물 스티커 부착이 필수입니다.'
    },
    {
      name: '대형 양문형 냉장고',
      price: '무료',
      category: '가전류',
      sizeTag: '대형 폐기물 (무상수거)',
      guideItem: '대형 가전 (냉장고 등)',
      description: '대형 가전은 폐가전 무상방문수거 서비스를 통해 비용 없이 배출할 수 있습니다.'
    },
    {
      name: '목재 장롱 (1자)',
      price: '3,000',
      category: '가구류',
      sizeTag: '중형 폐기물',
      guideItem: '장롱 (1자 기준)',
      description: '크기에 따라 비용이 산정되는 중대형 가구입니다. 분해 배출 시 수거가 더 원활합니다.'
    }
  ];

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        startAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setStatus('analyzing');
    
    // Pick a mock result based on the filename or randomly
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    setTimeout(() => {
      setAnalysisResult(randomResult);
      setStatus('result');
    }, 2000);
  };

  const reset = () => {
    setStatus('idle');
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-green-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black mb-4">AI 사진 견적 서비스</h1>
            <p className="text-slate-400">버리려는 물건의 사진을 찍어 올려주시면 AI가 배출 비용을 예측해 드립니다.</p>
          </div>

          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {status === 'idle' && (
            <div 
              onClick={triggerFileInput}
              className="w-full aspect-square md:aspect-video bg-slate-900 rounded-3xl border-2 border-dashed border-white/10 mb-12 flex flex-col items-center justify-center group cursor-pointer hover:border-green-500/50 hover:bg-green-500/5 transition-all"
            >
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">사진 업로드 또는 촬영</h3>
              <p className="text-slate-500 text-sm mb-6">최대한 선명하게 전체 모습이 나오도록 찍어주세요.</p>
              <button className="bg-white text-black font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-200 transition-all">
                <Upload size={18} /> 파일 선택하기
              </button>
            </div>
          )}

          {status === 'analyzing' && (
            <div className="w-full aspect-square md:aspect-video bg-slate-900 rounded-3xl border border-white/10 mb-12 flex flex-col md:flex-row items-center justify-center gap-12 p-8">
              {previewImage && (
                <div className="w-full md:w-1/2 h-full rounded-2xl overflow-hidden border border-white/10 relative">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 size={48} className="text-green-500 animate-spin" />
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">이미지 분석 중...</h3>
                <p className="text-slate-500">인공지능이 품목과 규격을 판독하고 있습니다.</p>
                
                <div className="mt-8 w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 animate-[loading_3s_ease-in-out]"></div>
                </div>
              </div>
            </div>
          )}

          {status === 'result' && (
            <div className="mb-12 animate-in zoom-in-95 duration-500">
              <div className="glass p-8 md:p-12 rounded-3xl border-green-500/30 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Zap size={200} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-green-500 font-bold mb-8">
                    <CheckCircle2 size={24} />
                    <span>분석 완료!</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      {previewImage && (
                        <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                          <img src={previewImage} alt="Result" className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="space-y-6">
                        <div>
                          <p className="text-slate-400 text-sm mb-1">식별 품목</p>
                          <p className="text-3xl font-black">{analysisResult.name}</p>
                          <div className="inline-block mt-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-xs font-bold text-green-500">
                            {analysisResult.sizeTag}
                          </div>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm mb-1">예상 배출 수수료</p>
                          <p className="text-3xl font-black text-green-500">
                            {analysisResult.price === '무료' ? '무료' : `₩${analysisResult.price}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col">
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <Info size={18} className="text-blue-400" />
                        추천 배출 방법
                      </h4>
                      <p className="text-slate-400 leading-relaxed mb-8 flex-1">
                        {analysisResult.description}
                      </p>
                      <div className="space-y-3">
                        <Link 
                          to={`/guide/${encodeURIComponent(analysisResult.guideItem)}`}
                          className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-slate-200"
                        >
                          가이드에서 상세보기 <ArrowRight size={18} />
                        </Link>
                        <Link to="/truck" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                          방문 수거 예약하기
                        </Link>
                        <button 
                          onClick={reset}
                          className="w-full glass hover:bg-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm mt-4"
                        >
                          <RefreshCcw size={16} /> 다른 사진 찍기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guide Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bento-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-500 rounded-xl flex items-center justify-center">
                  <Info size={20} />
                </div>
                <h4 className="font-bold">촬영 팁</h4>
              </div>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>주변이 밝은 곳에서 촬영하세요.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>물건의 전체 모습이 프레임에 담겨야 합니다.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>파손 부위가 있다면 함께 찍어주세요.</span>
                </li>
              </ul>
            </div>

            <div className="bento-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h4 className="font-bold">AI 분석 항목</h4>
              </div>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>품목 자동 식별 (소파, 장롱 등)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>예상 배출 수수료 계산</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>무상 수거 가능 여부 판독</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Warning Section */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <Info className="text-yellow-500 shrink-0 mt-1" size={20} />
              <p className="text-xs text-slate-400 leading-relaxed">
                AI 견적은 참고용이며, 실제 배출 시 지자체나 수거 업체의 기준에 따라 비용이 달라질 수 있습니다. 정확한 금액은 거주지 동사무소 또는 공식 앱을 통해 확인해 주세요.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Estimate;
