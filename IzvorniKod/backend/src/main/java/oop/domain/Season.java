package oop.domain;

import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.Entity;

public enum Season {
    SPRING,
    SUMMER,
    AUTUMN,
    WINTER,
    ALL
}
