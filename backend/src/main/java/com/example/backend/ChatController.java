package com.example.backend;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/user/{userId}/message")
    public void addMessageAndSendIntoChat(@Payload ChatMessage chatMessage) {
        messagingTemplate.convertAndSendToUser(chatMessage.recipientId(),"/queue", chatMessage);
    }
}
