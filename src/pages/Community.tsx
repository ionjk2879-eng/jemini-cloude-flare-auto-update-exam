import { useState } from 'react';
import { 
  Trash2, 
  MessageSquare, 
  Plus,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialPosts = [
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
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(p => p !== id));
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPosts([...likedPosts, id]);
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  const filteredPosts = activeTab === "전체" 
    ? posts 
    : posts.filter(post => post.tags.includes(activeTab) || (activeTab === "가전" && post.tags.includes("가전")) || (activeTab === "가구" && post.tags.includes("가구")));

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-purple-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-4">실시간 나눔 커뮤니티</h1>
              <p className="text-slate-400">버리기 아까운 물건, 필요한 이웃에게 나눠주세요.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.2)] self-start md:self-auto"
            >
              <Plus size={20} /> 나눔 글쓰기
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {["전체", "가구", "가전", "생활용품", "기타"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab ? "bg-white text-black" : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
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
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      likedPosts.includes(post.id) ? 'text-pink-500' : 'text-slate-400 hover:text-pink-500'
                    }`}
                  >
                    <Heart size={18} fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} /> {post.likes}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#0f172a] w-full max-w-xl rounded-3xl border border-white/10 p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">나눔 글쓰기</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">제목</label>
                <input 
                  type="text" 
                  placeholder="나눔할 물건을 짧게 소개해주세요"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">내용</label>
                <textarea 
                  rows={4}
                  placeholder="물건의 상태, 거래 희망 장소 등을 적어주세요"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 transition-all resize-none"
                ></textarea>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 glass py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-white/10 transition-all">
                  <ImageIcon size={18} /> 사진 추가
                </button>
                <button className="flex-1 bg-purple-600 hover:bg-purple-500 py-4 rounded-xl text-sm font-bold transition-all shadow-lg">
                  등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Community;
