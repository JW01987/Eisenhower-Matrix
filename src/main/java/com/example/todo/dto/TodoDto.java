package com.example.todo.dto;

import lombok.Data;

public class TodoDto {

    @Data
    public static class CreateRequest {
        private Long topicId;
        private String title;
        private String content;
        private Integer quadrant;
        /**
         * 1: 긴급+중요(DO)
         * 2: 중요(SCHEDULE)
         * 3: 긴급(DELEGATE)
         * 4: 해당없음(ELIMINATE)
         */
    }

    @Data
    public static class UpdateRequest {
        private String title;
        private String content;
        private Integer quadrant;
    }
}