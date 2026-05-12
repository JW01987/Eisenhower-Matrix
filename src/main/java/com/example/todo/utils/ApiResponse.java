package com.example.todo.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    // 성공 (데이터 있음)
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "성공", data);
    }

    // 성공 (메시지만, 데이터 없음)
    public static <T> ApiResponse<T> successMessage(String message) {
        return new ApiResponse<>(true, message, null);
    }

    // 실패
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }
}