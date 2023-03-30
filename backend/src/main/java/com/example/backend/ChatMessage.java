package com.example.backend;

import java.time.Instant;

public record ChatMessage(
        String senderId,
        String recipientId,
        String content
) {

}
