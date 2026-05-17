import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";
import type { ApiResponse, User } from "../api/types";
import { useToast } from "../components/Toast";

type View = "home" | "login" | "signup";

export default function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [view, setView] = useState<View>("home");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post<ApiResponse<User>>("/api/users/login", {
        loginId,
        password,
      });
      if (response.data.success) {
        navigate("/topics", { replace: true });
      } else {
        showToast(response.data.message, "error");
      }
    } catch {
      showToast("로그인 중 오류가 발생했습니다.", "error");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post<ApiResponse<null>>("/api/users/signup", {
        loginId,
        password,
        username: name,
      });
      if (response.data.success) {
        showToast("회원가입이 완료되었습니다!", "success");
        setView("login");
      } else {
        showToast(response.data.message, "error");
      }
    } catch {
      showToast("회원가입 중 오류가 발생했습니다.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-purple-300 flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] md:max-w-md text-center">
        {/* 홈 화면 */}
        {view === "home" && (
          <>
            <div className="mb-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="w-12 h-12 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">
                Priority Matrix
              </h1>
              <p className="text-white/90 text-lg">
                Organize your tasks beautifully
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setView("login")}
                className="w-full py-4 bg-white text-purple-600 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </button>
              <button
                onClick={() => setView("signup")}
                className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </button>
            </div>
          </>
        )}

        {/* 로그인 화면 */}
        {view === "login" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-left">
            <button
              onClick={() => setView("home")}
              className="mb-4 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-500 mb-6 text-sm">Sign in to continue</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  아이디
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="아이디를 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Sign In
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              계정이 없으신가요?{" "}
              <span
                className="text-purple-500 font-medium cursor-pointer"
                onClick={() => setView("signup")}
              >
                회원가입
              </span>
            </p>
          </div>
        )}

        {/* 회원가입 화면 */}
        {view === "signup" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-left">
            <button
              onClick={() => setView("home")}
              className="mb-4 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Create Account
            </h2>
            <p className="text-gray-500 mb-6 text-sm">Sign up to get started</p>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  아이디
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="아이디를 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              이미 계정이 있으신가요?{" "}
              <span
                className="text-purple-500 font-medium cursor-pointer"
                onClick={() => setView("login")}
              >
                로그인
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
