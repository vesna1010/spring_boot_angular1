package com.vesna1010.quizservice.repository;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import com.vesna1010.quizservice.BaseTest;

@SpringBootTest
@Sql(scripts = "classpath:init.sql")
public abstract class BaseRepositoryTest extends BaseTest {

}
