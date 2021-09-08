package com.vesna1010.quizservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import com.vesna1010.quizservice.BaseTest;

public abstract class BaseControllerTest extends BaseTest {

	@Autowired
	protected MockMvc mockMvc;

}
