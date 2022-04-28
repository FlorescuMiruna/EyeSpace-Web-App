package com.example.eyespace.exception.domain;

public abstract class BaseException extends RuntimeException {

    private final String errorCode;

    public BaseException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public BaseException(String message, Throwable cause, String errorCode) {
        super(message, cause);
        this.errorCode = errorCode;
    }


    public String getErrorCode() {
        return errorCode;
    }
}