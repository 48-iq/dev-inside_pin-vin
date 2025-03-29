package dev_inside.vin_pin_hac.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CallDto {
    private String managerId;
    private String tel;
    private MultipartFile audioFile;
}
