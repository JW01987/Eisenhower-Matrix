package com.example.todo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.domain.User;
import com.example.todo.dto.UserDto;
import com.example.todo.service.UserService;
import com.example.todo.utils.ApiResponse;
import com.example.todo.utils.SessionUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signUp(@RequestBody UserDto.SignUpRequest userDto) {
        userService.signUp(userDto);
        return ResponseEntity.ok(ApiResponse.successMessage("회원가입이 완료되었습니다."));

    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDto.Response>> login(
            @RequestBody UserDto.LoginRequest userDto,
            HttpServletRequest request) {
        User user = userService.login(userDto);
        if (user != null) {
            SessionUtils.setLoginUser(request, user);
            return ResponseEntity.ok(ApiResponse.success(
                    new UserDto.Response(user.getUsername(), user.getLoginId())));
        } else {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error("로그인에 실패했습니다."));
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
        SessionUtils.logout(request);
        return ResponseEntity.ok(ApiResponse.successMessage("로그아웃이 완료되었습니다."));
    }

    // 회원 탈퇴
    // 회원 탈퇴
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable Long userId,
            HttpServletRequest request) {
        userService.deleteUser(userId);
        SessionUtils.logout(request);
        return ResponseEntity.ok(ApiResponse.successMessage("회원 탈퇴가 완료되었습니다."));
    }
}
