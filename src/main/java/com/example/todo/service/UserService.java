package com.example.todo.service;

import org.springframework.stereotype.Service;

import com.example.todo.domain.User;
import com.example.todo.dto.UserDto;
import com.example.todo.mapper.UserMapper;
import com.example.todo.utils.PasswordUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    // 회원가입
    public void signUp(UserDto.SignUpRequest dto) {
        // 1. loginId 중복 체크
        User existingUser = userMapper.findByLoginId(dto.getLoginId());
        if (existingUser != null) {
            throw new IllegalArgumentException("이미 사용 중인 로그인 ID입니다.");
        }
        // 2. 비밀번호 암호화
        dto.setPassword(PasswordUtils.encrypt(dto.getPassword()));
        // 3. 저장
        User user = new User();
        user.setLoginId(dto.getLoginId());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        userMapper.signUp(user);
    }

    // 로그인
    public User login(UserDto.LoginRequest dto) {
        // 1. loginId로 유저 찾기
        User user = userMapper.findByLoginId(dto.getLoginId());
        if (user == null) {
            return null;
        }
        // 2. 비밀번호 검증
        if (PasswordUtils.match(dto.getPassword(), user.getPassword())) {
            // 3. 맞으면 유저 반환
            return user;
        }
        // 4. 틀리면 null
        return null;
    }

    // 회원 정보 조회
    public User getUserById(Long userId) {
        return userMapper.findById(userId);
    }

    // 회원 정보 수정 (이름만)
    public void updateUserName(Long userId, String newName) {
        userMapper.updateUserName(userId, newName);
    }

    // 회원 탈퇴
    public void deleteUser(Long userId) {
        userMapper.deleteUser(userId);
    }
}