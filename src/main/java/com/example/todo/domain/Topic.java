package com.example.todo.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Topic {
  private Long topicId;
  private Long userId;
  private String title;
  private LocalDateTime createdAt;
}
