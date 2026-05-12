package com.example.todo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.domain.Todo;
import com.example.todo.domain.User;
import com.example.todo.dto.TodoDto;
import com.example.todo.service.TodoService;
import com.example.todo.utils.ApiResponse;
import com.example.todo.utils.SessionUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    // 할일 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<Todo>>> getTodos(
            @RequestParam Long topicId,
            HttpServletRequest request) {

        User loginUser = SessionUtils.getLoginUser(request);
        List<Todo> todos = todoService.findByTopicId(topicId, loginUser.getUserId());
        return ResponseEntity.ok(ApiResponse.success(todos));
    }

    // 할일 생성
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createTodo(
            @RequestBody TodoDto.CreateRequest dto,
            HttpServletRequest request) {
        User loginUser = SessionUtils.getLoginUser(request);
        Todo todo = new Todo();
        todo.setTopicId(dto.getTopicId());
        todo.setTitle(dto.getTitle());
        todo.setContent(dto.getContent());
        todo.setQuadrant(dto.getQuadrant());
        todo.setUserId(loginUser.getUserId());
        todoService.createTodo(todo);
        return ResponseEntity.ok(ApiResponse.successMessage("할일이 생성되었습니다."));
    }

    // 할일 수정
    @PutMapping("/{todoId}")
    public ResponseEntity<ApiResponse<Void>> updateTodo(
            @PathVariable Long todoId,
            @RequestBody TodoDto.UpdateRequest dto,
            HttpServletRequest request) {
        User loginUser = SessionUtils.getLoginUser(request);
        Todo todo = new Todo();
        todo.setTodoId(todoId);
        todo.setTitle(dto.getTitle());
        todo.setContent(dto.getContent());
        todo.setQuadrant(dto.getQuadrant());
        todoService.updateTodo(todo, loginUser.getUserId());
        return ResponseEntity.ok(ApiResponse.successMessage("할일이 수정되었습니다."));
    }

    // 할일 삭제
    @DeleteMapping("/{todoId}")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(
            @PathVariable Long todoId,
            HttpServletRequest request) {
        User loginUser = SessionUtils.getLoginUser(request);
        todoService.deleteTodo(todoId, loginUser.getUserId());
        return ResponseEntity.ok(ApiResponse.successMessage("할일이 삭제되었습니다."));
    }

    // 할일 완료 상태 변경
    @PatchMapping("/{todoId}/status")
    public ResponseEntity<ApiResponse<Void>> updateTodoStatus(
            @PathVariable Long todoId,
            @RequestParam Integer isDone,
            HttpServletRequest request) {
        User loginUser = SessionUtils.getLoginUser(request);
        todoService.updateTodoStatus(todoId, isDone, loginUser.getUserId());
        return ResponseEntity.ok(ApiResponse.successMessage("할일 상태가 변경되었습니다."));
    }

}
