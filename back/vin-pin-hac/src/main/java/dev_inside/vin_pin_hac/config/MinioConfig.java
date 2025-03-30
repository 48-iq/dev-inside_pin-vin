package dev_inside.vin_pin_hac.config;

import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {



    @Bean
    public MinioClient minioClient(@Value("${minio.url}") String url,
                                   @Value("${minio.accessKey}") String accessKey,
                                   @Value("${minio.secretKey}") String secretKey) {
        MinioClient minioClient = MinioClient.builder()
                .endpoint(url)
                .credentials(accessKey, secretKey)
                .build();
        try {

            minioClient.makeBucket(
                    MakeBucketArgs.builder()
                            .bucket("mainbucket")
                            .build());
        } catch (Exception e) {

            throw new RuntimeException(e);
        }
        return minioClient;
    }
}
