package com.example.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todo.domain.Topic;
import com.example.todo.mapper.TopicMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TopicService {
    private final TopicMapper topicMapper;

    // 토픽 생성
    public void createTopic(Topic topic) {
        topicMapper.createTopic(topic);
    }

    // 토픽 조회 (특정 사용자)
    public List<Topic> findByUserId(Long userId) {
        return topicMapper.findByUserId(userId);
    }

    // 토픽 조회 (특정 토픽)
    public Topic findByTopicId(Long userId, Long topicId) {
        return topicMapper.findByTopicId(userId, topicId);
    }

    // 토픽 수정
    public void updateTopic(Topic topic, Long userId) {
        Topic existingTopic = findByTopicId(userId, topic.getTopicId());
        if (existingTopic == null) {
            throw new IllegalArgumentException("토픽을 찾을 수 없습니다.");
        }
        topicMapper.updateTopic(topic);
    }

    // 토픽 삭제
    public void deleteTopic(Long topicId, Long userId) {
        Topic existingTopic = findByTopicId(userId, topicId);
        if (existingTopic == null) {
            throw new IllegalArgumentException("토픽을 찾을 수 없습니다.");
        }
        topicMapper.deleteTopic(topicId, userId);
    }
}
