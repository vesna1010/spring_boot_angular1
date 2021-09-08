package com.vesna1010.quizservice.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import com.vesna1010.quizservice.enums.Answer;
import com.vesna1010.quizservice.enums.Points;
import com.vesna1010.quizservice.model.Question;
import com.vesna1010.quizservice.model.Quiz;
import com.vesna1010.quizservice.service.QuestionService;

@WebMvcTest(QuestionController.class)
public class QuestionControllerTest extends BaseControllerTest {

	@MockBean
	private QuestionService questionService;

	@Test
	public void findQuestionsByQuizIdTest() throws Exception {
		when(questionService.findQuestionsByQuizIdAndOfSize(1L, 2)).thenReturn(Arrays.asList(
				new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TEN),
				new Question(2L, "Question B", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY),
				new Question(3L, "Question C", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY)));

		mockMvc.perform(
				get("/questions/quiz/1")
				.param("size", "2")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$", hasSize(3)))
			   .andExpect(jsonPath("$[0].text", is("Question A")))
			   .andExpect(jsonPath("$[1].text", is("Question B")))
			   .andExpect(jsonPath("$[2].text", is("Question C")));

		verify(questionService, times(1)).findQuestionsByQuizIdAndOfSize(1L, 2);
	}

	@Test
	public void findAllQuestionsTest() throws Exception {
		when(questionService.findAllQuestions(PAGEABLE)).thenReturn(new PageImpl<Question>(Arrays.asList(
				new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TEN),
				new Question(2L, "Question B", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY)), PAGEABLE, 5));

		mockMvc.perform(
				get("/questions")
				.param("page", "0")
				.param("size", "5")
				.param("sort", "id")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.number", is(0)))
			   .andExpect(jsonPath("$.size", is(5)))
			   .andExpect(jsonPath("$.totalPages", is(1)))
			   .andExpect(jsonPath("$.numberOfElements", is(2)))
			   .andExpect(jsonPath("$.content[0].text", is("Question A")))
			   .andExpect(jsonPath("$.content[1].text", is("Question B")));

		verify(questionService, times(1)).findAllQuestions(PAGEABLE);
	}

	@Test
	public void findQuestionByIdTest() throws Exception {
		when(questionService.findQuestionById(1L)).thenReturn(new Question(1L, "Question", "Answer A", "Answer B",
				"Answer C", "Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN));

		mockMvc.perform(
				get("/questions/1")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.text", is("Question")));

		verify(questionService, times(1)).findQuestionById(1L);
	}

	@Test
	public void saveQuestionTest() throws Exception {
		Question question = new Question("Question", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionService.saveQuestion(question)).thenReturn(new Question(1L, "Question A", "Answer A", "Answer B",
				"Answer C", "Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN));

		mockMvc.perform(
				post("/questions")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(question))
				)
		       .andExpect(status().isCreated())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.id", is(1)));

		verify(questionService, times(1)).saveQuestion(question);
	}

	@Test
	public void updateQuestionTest() throws Exception {
		Question question = new Question(1L, "Question", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionService.updateQuestion(question, 1L)).thenReturn(question);

		mockMvc.perform(
				put("/questions/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(question))
				)
		       .andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.text", is("Question")));

		verify(questionService, times(1)).updateQuestion(question, 1L);
	}

	@Test
	public void deleteQuestionByIdTest() throws Exception {
		doNothing().when(questionService).deleteQuestionById(1L);

		mockMvc.perform(
				delete("/questions/1")
				)
		       .andExpect(status().isNoContent());

		verify(questionService, times(1)).deleteQuestionById(1L);
	}

}
