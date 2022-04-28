package com.example.eyespace.exception.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class ErrorDto {

    private String errorCode;
    private String message;
    private Integer status;

}