package com.example.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todo.domain.Todo;
import com.example.todo.mapper.TodoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoMapper todoMapper;

    // 할일 목록 조회 (특정 토픽)
    public List<Todo> findByTopicId(Long topicId) {
        return todoMapper.findByTopicId(topicId);
    }

    // 할일 조회 (특정 할일)
    public Todo findByTodoId(Long todoId) {
        return todoMapper.findByTodoId(todoId);
    }

    // 할일 생성
    public void createTodo(Todo todo) {
        todoMapper.createTodo(todo);
    }

    // 할일 수정
    public void updateTodo(Todo todo) {
        todoMapper.updateTodo(todo);
    }

    // 할일 삭제
    public void deleteTodo(Long todoId) {
        todoMapper.deleteTodo(todoId);
    }

    // 할일 완료 상태 변경
    public void updateTodoStatus(Long todoId, Boolean isDone) {
        todoMapper.updateTodoStatus(todoId, isDone);
    }
}
