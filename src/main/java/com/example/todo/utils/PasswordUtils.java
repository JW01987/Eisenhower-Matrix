package com.example.todo.utils;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtils {
    public static String encrypt(String raw) {
        return BCrypt.hashpw(raw, BCrypt.gensalt()); 
    }

    public static boolean match(String raw, String hashed) {
        return BCrypt.checkpw(raw, hashed);
    }
}
