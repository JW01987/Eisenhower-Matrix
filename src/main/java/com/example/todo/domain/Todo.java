@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    private Long todoId;
    private Long topicId;
    private Long userId;
    private String title;
    private String content;
    private Integer quadrant;
    private Boolean isDone;
    private LocalDateTime createdAt;
}
