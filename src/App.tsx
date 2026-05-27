import { 
  GitFork, 
  Cloud, 
  Terminal, 
  Users, 
  MessageSquare, 
  ChevronRight, 
  Layout, 
  Code2, 
  Zap,
  Globe
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans">
      {/* Test Message - Will be visible even if other things fail */}
      <div className="sr-only">렌더링 테스트 중...</div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span>디클라우디 <span className="text-blue-500">랩</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">커뮤니티</a>
            <a href="#" className="hover:text-white transition-colors">가이드</a>
            <a href="#" className="hover:text-white transition-colors">로드맵</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-blue-500 transition-colors">로그인</a>
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95">
              시작하기
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500 text-xs font-bold mb-6">
              <Zap size={14} />
              <span>2026 차세대 개발자 커뮤니티</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
              Git과 Cloudflare를<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                실전처럼 마스터하세요
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              복잡한 설정 없이 브라우저에서 바로 실습하고,<br /> 
              전 세계 개발자들과 지식을 공유하며 함께 성장하는 공간입니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                무료로 시작하기 <ChevronRight size={20} />
              </button>
              <button className="w-full sm:w-auto glass hover:bg-white/10 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                <GitFork size={20} /> GitHub로 연동
              </button>
            </div>
          </section>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
            {/* Main Feature - Git Practice */}
            <div className="md:col-span-2 md:row-span-2 bento-card flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Terminal className="text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">인터랙티브 Git 실습</h3>
                <p className="text-slate-400">명령어 한 줄 없이도 Git의 핵심 개념을 시각적으로 학습하세요.</p>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">Commit</span>
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">Branch</span>
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">Rebase</span>
              </div>
            </div>

            {/* Feature - Cloudflare Deployment */}
            <div className="md:col-span-2 md:row-span-1 bento-card flex items-center gap-6 group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Cloud className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">1초 광속 배포</h3>
                <p className="text-slate-400 text-sm">Cloudflare Pages를 통한 전 세계 배포 환경 구축</p>
              </div>
            </div>

            {/* Community Stats */}
            <div className="md:col-span-1 md:row-span-2 bento-card flex flex-col justify-between text-center">
              <div className="flex justify-center mb-4">
                <Users className="text-purple-400" size={32} />
              </div>
              <div>
                <div className="text-4xl font-black mb-1">12K+</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Active Members</div>
              </div>
              <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-purple-500"></div>
              </div>
            </div>

            {/* Forum Highlight */}
            <div className="md:col-span-1 md:row-span-1 bento-card flex flex-col justify-center">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <MessageSquare size={16} />
                <span className="text-xs font-bold uppercase tracking-tighter">Hot Discussion</span>
              </div>
              <p className="text-sm font-medium line-clamp-2">"2026년 프론트엔드 개발자가 꼭 알아야 할 Cloudflare 기능 5가지"</p>
            </div>

            {/* Global Edge */}
            <div className="md:col-span-2 md:row-span-1 bento-card flex items-center justify-between group overflow-hidden">
              <div className="z-10">
                <h3 className="text-xl font-bold">Global Edge Network</h3>
                <p className="text-slate-400 text-sm">전 세계 어디서든 빠른 응답 속도</p>
              </div>
              <Globe className="text-white/5 group-hover:text-blue-400/20 transition-colors" size={120} style={{ marginRight: '-40px' }} />
            </div>

            {/* Small Toggles/Icons */}
            <div className="md:col-span-1 md:row-span-1 bento-card flex items-center justify-center group">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layout size={20} />
                </div>
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-transform delay-75">
                  <Terminal size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-lg opacity-50">
            <Code2 size={24} />
            <span>디클라우디 랩</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <p className="text-xs text-slate-600">© 2026 DevCloud Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
