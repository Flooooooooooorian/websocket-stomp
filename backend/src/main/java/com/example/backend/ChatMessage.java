package com.example.backend;

public record ChatMessage(
        String senderId,
        String recipientId,
        String content
) {

}
