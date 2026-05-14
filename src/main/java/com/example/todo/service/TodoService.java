package com.example.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todo.domain.Todo;
import com.example.todo.domain.Topic;
import com.example.todo.mapper.TodoMapper;
import com.example.todo.mapper.TopicMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoMapper todoMapper;
    private final TopicMapper topicMapper;

    // 할일 목록 조회 (특정 토픽)
    public List<Todo> findByTopicId(Long topicId, Long userId) {
        Topic topic = topicMapper.findByTopicId(userId, topicId);
        if (topic == null) {
            throw new IllegalArgumentException("존재하지 않는 토픽입니다.");
        }
        List<Todo> todos = todoMapper.findByTopicId(topicId, userId);
        return todos;
    }

    // 할일 조회 (특정 할일)
    public Todo findByTodoId(Long todoId, Long userId) {
        Todo todo = todoMapper.findByTodoId(todoId, userId);
        if (todo == null)
            throw new IllegalArgumentException("할일을 찾을 수 없습니다.");
        return todo;
    }

    // 할일 생성
    public void createTodo(Todo todo) {
        Topic topic = topicMapper.findByTopicId(todo.getUserId(), todo.getTopicId());
        if (topic == null) {
            throw new IllegalArgumentException("존재하지 않는 토픽입니다.");
        }
        todoMapper.createTodo(todo);
    }

    // 할일 수정
    public void updateTodo(Todo todo, Long userId) {
        Todo existingTodo = todoMapper.findByTodoId(todo.getTodoId(), userId);
        if (existingTodo == null) {
            throw new IllegalArgumentException("할일을 찾을 수 없습니다.");
        }
        todo.setUserId(userId);
        todoMapper.updateTodo(todo);
    }

    // 할일 삭제
    public void deleteTodo(Long todoId, Long userId) {
        Todo todo = todoMapper.findByTodoId(todoId, userId);
        if (todo == null) {
            throw new IllegalArgumentException("할일을 찾을 수 없습니다.");
        }
        todoMapper.deleteTodo(todoId, userId);
    }

    // 할일 완료 상태 변경
    public void updateTodoStatus(Long todoId, Integer isDone, Long userId) {
        Todo todo = todoMapper.findByTodoId(todoId, userId);
        if (todo == null) {
            throw new IllegalArgumentException("할일을 찾을 수 없습니다.");
        }
        todoMapper.updateTodoStatus(todoId, isDone, userId);
    }
}
