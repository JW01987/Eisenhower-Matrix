package com.example.todo.dto;

import lombok.Data;

public class TopicDto {

    @Data
    public static class Request {
        private String title;
    }
}