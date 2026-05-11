public interface UserMapper {
    // 1. 회원가입
    void signUp(User user);
    // 2. 로그인
    User findByLoginId(@Param("loginId") String loginId);
    // 3. 회원 정보 조회
    User findById(@Param("userId") Long userId);
    // 4. 회원 정보 수정 (이름만)
    void updateUserName(@Param("userId") Long userId, @Param("newName") String newName);
    // 5. 회원 탈퇴
    void deleteUser(@Param("userId") Long userId);
}
