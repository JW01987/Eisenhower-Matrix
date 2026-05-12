package com.example.todo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.domain.Topic;
import com.example.todo.domain.User;
import com.example.todo.dto.TopicDto;
import com.example.todo.service.TopicService;
import com.example.todo.utils.ApiResponse;
import com.example.todo.utils.SessionUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    // 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<Topic>>> getTopics(
            HttpServletRequest request) {
        User loginUser = SessionUtils.getLoginUser(request);

        List<Topic> topics = topicService.findByUserId(loginUser.getUserId());
        return ResponseEntity.ok(ApiResponse.success(topics));
    }

    // 토픽 생성
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createTopic(
            @RequestBody TopicDto.Request dto,
            HttpServletRequest request) {
        User loginUser = SessionUtils.getLoginUser(request);

        Topic topic = new Topic();
        topic.setTitle(dto.getTitle());
        topic.setUserId(loginUser.getUserId());
        topicService.createTopic(topic);
        return ResponseEntity.ok(ApiResponse.successMessage("토픽이 생성되었습니다."));
    }

    // 토픽 수정
    @PutMapping("/{topicId}")
    public ResponseEntity<ApiResponse<Void>> updateTopic(
            @PathVariable Long topicId,
            @RequestBody TopicDto.Request dto,
            HttpServletRequest request) {
        User loginUser = SessionUtils.getLoginUser(request);

        // 1. 토픽 존재 여부 확인
        Topic existingTopic = topicService.findByTopicId(loginUser.getUserId(), topicId);
        if (existingTopic == null) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("토픽을 찾을 수 없습니다."));
        }
        // 2. 토픽 수정
        existingTopic.setTitle(dto.getTitle());
        topicService.updateTopic(existingTopic, loginUser.getUserId());
        return ResponseEntity.ok(ApiResponse.successMessage("토픽이 수정되었습니다."));
    }

    // 토픽 삭제
    @DeleteMapping("/{topicId}")
    public ResponseEntity<ApiResponse<Void>> deleteTopic(
            @PathVariable Long topicId,
            HttpServletRequest request) {
        User loginUser = SessionUtils.getLoginUser(request);

        // 1. 토픽 존재 여부 확인
        Topic existingTopic = topicService.findByTopicId(loginUser.getUserId(), topicId);
        if (existingTopic == null) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("토픽을 찾을 수 없습니다."));
        }
        // 2. 토픽 삭제
        topicService.deleteTopic(existingTopic.getTopicId(), loginUser.getUserId());
        return ResponseEntity.ok(ApiResponse.successMessage("토픽이 삭제되었습니다."));
    }

}