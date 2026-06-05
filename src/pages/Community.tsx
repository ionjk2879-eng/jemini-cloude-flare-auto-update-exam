import { 
  Trash2, 
  ArrowLeft, 
  MessageSquare, 
  Plus,
  Heart,
  MessageCircle,
  Share2,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    author: "클린이",
    location: "강남구 역삼동",
    time: "방금 전",
    title: "3인용 소파 무료 나눔합니다!",
    content: "이사 가면서 상태 좋은 소파 나눔해요. 직접 가져가셔야 합니다.",
    tags: ["가구", "무료나눔"],
    likes: 12,
    comments: 5
  },
  {
    id: 2,
    author: "지구지킴이",
    location: "서초구 서초동",
    time: "15분 전",
    title: "전자레인지 필요하신 분?",
    content: "깨끗하게 사용한 전자레인지입니다. 작동 잘 돼요.",
    tags: ["가전", "무료나눔"],
    likes: 8,
    comments: 2
  },
  {
    id: 3,
    author: "미니멀리스트",
    location: "송파구 잠실동",
    time: "1시간 전",
    title: "원목 책상 나눔해요",
    content: "약간의 생활 기스가 있지만 튼튼합니다.",
    tags: ["가구", "책상"],
    likes: 15,
    comments: 8
  }
];

function Community() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Trash2 size={20} className="text-white" />
            </div>
            <span>클린 <span className="text-purple-500">커뮤니티</span></span>
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
          <div className="flex items-end justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black mb-4">실시간 나눔 커뮤니티</h1>
              <p className="text-slate-400">버리기 아까운 물건, 필요한 이웃에게 나눠주세요.</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Plus size={20} /> 나눔 글쓰기
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {["전체", "가구", "가전", "생활용품", "기타"].map((tab) => (
              <button 
                key={tab}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  tab === "전체" ? "bg-white text-black" : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bento-card hover:border-purple-500/30 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-sm">
                      {post.author[0]}
                    </div>
                    <div>
                      <h4 className="font-bold">{post.author}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {post.location}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{post.content}</p>

                <div className="flex gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded-md font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                  <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-pink-500 transition-colors">
                    <Heart size={18} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-purple-500 transition-colors">
                    <MessageCircle size={18} /> {post.comments}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full mt-12 py-4 glass rounded-2xl text-slate-400 font-bold hover:bg-white/5 transition-all">
            더 많은 나눔 보기
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-lg opacity-80 text-left">
            <Trash2 size={24} className="text-purple-500" />
            <span>클린 가이드 나눔</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 클린 가이드. 커뮤니티는 이웃 간의 따뜻한 나눔을 응원합니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default Community;
