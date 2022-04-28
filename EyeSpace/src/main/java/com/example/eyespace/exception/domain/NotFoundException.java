package com.example.eyespace.exception.domain;

public class NotFoundException extends BaseException {

    public NotFoundException(String message, String errorCode) {
        super(message, errorCode);
    }

    public NotFoundException(String message, Throwable cause, String errorCode) {
        super(message, cause, errorCode);
    }

}