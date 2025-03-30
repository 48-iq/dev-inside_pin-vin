package dev_inside.vin_pin_hac.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Bean
    public NewTopic callCreatedTopic() {
        return TopicBuilder
                .name("call-created-events-topic")
                .build();
    }
}
