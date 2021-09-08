package com.vesna1010.quizservice;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class BaseTest {

	public static final Pageable PAGEABLE = PageRequest.of(0, 5, Direction.ASC, "id");
	public static final Sort SORT = Sort.by(Direction.ASC, "id");
	public static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

}
