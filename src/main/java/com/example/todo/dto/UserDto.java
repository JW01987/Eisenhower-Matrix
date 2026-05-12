package com.example.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

public class UserDto {
    @Data
    public static class SignUpRequest {
        private String username;
        private String password;
        private String loginId;
    }

    @Data
    public static class LoginRequest {
        private String loginId;
        private String password;
    }

    @Data
    @AllArgsConstructor
    public static class Response {
        private String username;
        private String loginId;
    }

}
