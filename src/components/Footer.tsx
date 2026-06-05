import { Trash2 } from 'lucide-react';

export default function Footer() {
  return (
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
  );
}
