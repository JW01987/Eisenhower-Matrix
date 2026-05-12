package com.example.todo.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    private Long todoId;
    private Long topicId;
    private Long userId;
    private String title;
    private String content;
    private Integer quadrant;
    private Boolean isDone;
    private LocalDateTime createdAt;
}
