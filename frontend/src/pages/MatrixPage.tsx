import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import api from "../api/axios";
import type { ApiResponse, Todo } from "../api/types";
import { useToast } from "../components/Toast";

const QUADRANTS = [
  {
    quadrant: 1,
    title: "DO",
    subtitle: "Urgent & Important",
    color: "from-pink-100 to-pink-200",
  },
  {
    quadrant: 2,
    title: "SCHEDULE",
    subtitle: "Not Urgent & Important",
    color: "from-purple-100 to-purple-200",
  },
  {
    quadrant: 3,
    title: "DELEGATE",
    subtitle: "Urgent & Not Important",
    color: "from-blue-100 to-blue-200",
  },
  {
    quadrant: 4,
    title: "ELIMINATE",
    subtitle: "Not Urgent & Not Important",
    color: "from-gray-100 to-gray-200",
  },
];

export default function MatrixPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [editTaskText, setEditTaskText] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await api.get<ApiResponse<Todo[]>>(
        `/api/todos?topicId=${topicId}`,
      );
      setTodos([...response.data.data]);
    } catch {
      showToast("할일 목록을 불러오는데 실패했습니다.", "error");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodos();
  }, [topicId]);

  // 분면별 필터링
  const getTodosByQuadrant = (quadrant: number) =>
    todos.filter((t) => t.quadrant === quadrant);

  // 완료 토글
  const toggleTodo = async (todo: Todo) => {
    try {
      await api.patch(
        `/api/todos/${todo.todoId}/status?isDone=${todo.isDone === true ? 0 : 1}`,
      );
      await fetchTodos();
    } catch {
      showToast("상태 변경에 실패했습니다.", "error");
    }
  };

  // 할일 추가
  const addTask = async () => {
    if (!newTaskText.trim() || !selectedQuadrant) return;
    try {
      await api.post("/api/todos", {
        topicId: Number(topicId),
        title: newTaskText,
        quadrant: selectedQuadrant,
      });
      setNewTaskText("");
      setShowAddModal(false);
      setSelectedQuadrant(null);
      await fetchTodos();
    } catch {
      showToast("할일 추가에 실패했습니다.", "error");
    }
  };

  // 할일 수정
  const handleUpdateTask = async () => {
    console.log("수정 요청:", {
      todoId: selectedTodo?.todoId,
      title: editTaskText,
    });
    if (!editTaskText.trim() || !selectedTodo) return;
    try {
      const res = await api.put(`/api/todos/${selectedTodo.todoId}`, {
        title: editTaskText,
        content: selectedTodo.content,
        quadrant: selectedTodo.quadrant,
      });
      console.log("수정 응답:", res.data);
      setShowDetailModal(false);
      setSelectedTodo(null);
      await fetchTodos();
    } catch {
      showToast("수정에 실패했습니다.", "error");
    }
  };

  // 할일 삭제
  const deleteTodo = async (todoId: number) => {
    try {
      await api.delete(`/api/todos/${todoId}`);
      await fetchTodos();
    } catch {
      showToast("삭제에 실패했습니다.", "error");
    }
  };

  const openAddModal = (quadrant: number) => {
    setSelectedQuadrant(quadrant);
    setShowAddModal(true);
  };

  const openDetailModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setEditTaskText(todo.title);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/topics")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Priority Matrix</h1>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUADRANTS.map((q) => (
            <div
              key={q.quadrant}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              {/* Quadrant Header */}
              <div className={`bg-gradient-to-br ${q.color} p-4`}>
                <h2 className="font-bold text-gray-800">{q.title}</h2>
                <p className="text-sm text-gray-600">{q.subtitle}</p>
              </div>

              {/* Tasks List */}
              <div className="p-4 space-y-2 min-h-[200px]">
                {getTodosByQuadrant(q.quadrant).map((todo) => (
                  <div
                    key={todo.todoId}
                    className="group flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                  >
                    {/* 체크박스 */}
                    <div
                      onClick={() => toggleTodo(todo)}
                      className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        todo.isDone === true
                          ? "bg-gradient-to-br from-pink-400 to-purple-400"
                          : "bg-white border-2 border-gray-300"
                      }`}
                    >
                      {todo.isDone === true && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    {/* 제목 */}
                    <button
                      onClick={() => openDetailModal(todo)}
                      className={`flex-1 text-sm text-left ${
                        todo.isDone === true
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {todo.title}
                    </button>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTodo(todo.todoId);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}

                {/* Add Task Button */}
                <button
                  onClick={() => openAddModal(q.quadrant)}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 text-gray-500 hover:text-purple-600"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Task</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-end md:items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">New Task</h3>
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="할일을 입력하세요"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium"
              >
                취소
              </button>
              <button
                onClick={addTask}
                className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-medium shadow-lg"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {showDetailModal && selectedTodo && (
        <div
          className="fixed inset-0 bg-black/30 flex items-end md:items-center justify-center z-50 p-4"
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Task Details
            </h3>
            <textarea
              value={editTaskText}
              onChange={(e) => setEditTaskText(e.target.value)}
              placeholder="할일을 수정하세요"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4 resize-none"
              autoFocus
            />
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleUpdateTask}
                className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-medium shadow-lg"
              >
                수정
              </button>
              <button
                onClick={() => {
                  deleteTodo(selectedTodo.todoId);
                  setShowDetailModal(false);
                }}
                className="flex-1 py-3 bg-red-100 text-red-600 rounded-2xl font-medium"
              >
                삭제
              </button>
            </div>
            <button
              onClick={() => setShowDetailModal(false)}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
