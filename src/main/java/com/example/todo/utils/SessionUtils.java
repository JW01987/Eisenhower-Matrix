package com.example.todo.utils;

import com.example.todo.constant.SessionConst;
import com.example.todo.domain.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class SessionUtils {

    // 세션에 유저 저장 (로그인)
    public static void setLoginUser(HttpServletRequest request, User user) {
        request.getSession().setAttribute(SessionConst.LOGIN_USER, user);
    }

    // 세션에서 유저 꺼내기
    public static User getLoginUser(HttpServletRequest request) {
        return (User) request.getSession(false)
                .getAttribute(SessionConst.LOGIN_USER);
    }

    // 세션 제거 (로그아웃)
    public static void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null)
            session.invalidate();
    }
}