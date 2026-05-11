@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long userId;
    private String username;
    private String loginId;
    private String password;
    private LocalDateTime createdAt;
}
