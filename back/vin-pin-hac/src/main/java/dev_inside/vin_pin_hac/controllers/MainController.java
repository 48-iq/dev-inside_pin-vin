package dev_inside.vin_pin_hac.controllers;

import dev_inside.vin_pin_hac.dto.CallDto;
import dev_inside.vin_pin_hac.dto.CallKDto;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class MainController {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private MinioClient minioClient;

    private String getUuid() {
        return UUID.randomUUID().toString();
    }

    @PostMapping("/process-call")
    public ResponseEntity<String> processCall(@ModelAttribute CallDto callDto) {

        CallKDto callKDto = CallKDto.builder()
                .managerId(callDto.getManagerId())
                .tel(callDto.getTel())
                .minioId(getUuid() + ".mp3")
                .build();
        String json = callKDto.toJson();

        try {

            minioClient.putObject(
                    PutObjectArgs.
                    builder()
                    .bucket("mainbucket")
                    .object(callKDto.getMinioId())
                    .stream(callDto.getAudioFile().getInputStream(), callDto.getAudioFile().getSize(), -1)
                    .build());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        kafkaTemplate.send("call-created-events-topic", json, callKDto.getMinioId());
        return ResponseEntity.ok("ok");
    }
}
