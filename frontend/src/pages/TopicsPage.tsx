import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, LogOut, ChevronRight } from "lucide-react";
import api from "../api/axios";
import type { ApiResponse, Topic } from "../api/types";

const COLORS = [
  "from-pink-200 to-pink-300",
  "from-purple-200 to-purple-300",
  "from-blue-200 to-blue-300",
  "from-green-200 to-green-300",
  "from-yellow-200 to-yellow-300",
  "from-rose-200 to-rose-300",
  "from-indigo-200 to-indigo-300",
  "from-teal-200 to-teal-300",
  "from-orange-200 to-orange-300",
  "from-cyan-200 to-cyan-300",
];

const getColor = (id: number) => COLORS[id % COLORS.length];

export default function TopicsPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const fetchTopics = async () => {
    try {
      const response = await api.get<ApiResponse<Topic[]>>("/api/topics");
      setTopics(response.data.data);
    } catch {
      alert("토픽 목록을 불러오는데 실패했습니다.");
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTopics();
  }, []);

  const handleAddTopic = async () => {
    if (!newTopicTitle.trim()) return;
    try {
      await api.post("/api/topics", { title: newTopicTitle });
      setNewTopicTitle("");
      setShowAddModal(false);
      fetchTopics(); // 목록 새로고침
    } catch {
      alert("토픽 추가에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/users/logout");
      navigate("/", { replace: true });
    } catch {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-purple-200">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">My Topics</h1>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 pb-24">
        {topics.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">토픽이 없어요!</p>
            <p className="text-sm">+ 버튼을 눌러 토픽을 추가해봐요</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <button
                key={topic.topicId}
                onClick={() => navigate(`/topics/${topic.topicId}`)}
                className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getColor(topic.topicId)} rounded-3xl opacity-40 group-hover:opacity-60 transition-opacity`}
                />
                <div className="relative z-10">
                  <h3 className="font-bold text-gray-800 mb-2 text-left">
                    {topic.title}
                  </h3>
                  <div className="flex items-center justify-end">
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add Topic Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-end md:items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              새 토픽 추가
            </h3>
            <input
              type="text"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder="토픽 이름을 입력하세요"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAddTopic}
                className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
