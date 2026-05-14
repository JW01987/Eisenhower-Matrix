export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  username: string;
  loginId: string;
}

export interface Topic {
  topicId: number;
  title: string;
  createdAt: string;
}

export interface Todo {
  todoId: number;
  topicId: number;
  title: string;
  content: string;
  quadrant: number;
  isDone: boolean;
  createdAt: string;
}
