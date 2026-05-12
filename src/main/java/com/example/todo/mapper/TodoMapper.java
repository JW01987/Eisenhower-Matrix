package com.example.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.todo.domain.Todo;

@Mapper
public interface TodoMapper {
    // 1. 할일 목록 조회 (특정 토픽)
    List<Todo> findByTopicId(@Param("topicId") Long topicId, @Param("userId") Long userId);

    // 2. 할일 조회 (특정 할일)
    Todo findByTodoId(@Param("todoId") Long todoId, @Param("userId") Long userId);

    // 3. 할일 생성
    void createTodo(Todo todo);

    // 4. 할일 수정
    void updateTodo(Todo todo);

    // 5. 할일 삭제
    void deleteTodo(@Param("todoId") Long todoId, @Param("userId") Long userId);

    // 6. 할일 완료 상태 변경
    void updateTodoStatus(@Param("todoId") Long todoId, @Param("isDone") Integer isDone, @Param("userId") Long userId);
}
