package com.example.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.todo.domain.Topic;

@Mapper
public interface TopicMapper {
    // 1. 토픽 생성
    void createTopic(Topic topic);

    // 2. 토픽 조회 (특정 사용자)
    List<Topic> findByUserId(@Param("userId") Long userId);

    // 2-1. 토픽 조회 (특정 토픽)
    Topic findByTopicId(@Param("userId") Long userId, @Param("topicId") Long topicId);

    // 3. 토픽 수정
    void updateTopic(Topic topic);

    // 4. 토픽 삭제
    void deleteTopic(@Param("topicId") Long topicId, @Param("userId") Long userId);
}
