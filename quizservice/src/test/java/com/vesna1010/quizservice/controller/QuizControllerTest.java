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
import org.springframework.http.MediaType;
import com.vesna1010.quizservice.model.Quiz;
import com.vesna1010.quizservice.service.QuizService;

@WebMvcTest(QuizController.class)
public class QuizControllerTest extends BaseControllerTest {

	@MockBean
	private QuizService quizService;

	@Test
	public void findAllQuizzesTest() throws Exception {
		when(quizService.findAllQuizzes(SORT))
				.thenReturn(Arrays.asList(new Quiz(1L, "Quiz A"), new Quiz(2L, "Quiz B")));

		mockMvc.perform(
				get("/quizzes")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$", hasSize(2)))
			   .andExpect(jsonPath("$[0].name", is("Quiz A")))
			   .andExpect(jsonPath("$[1].name", is("Quiz B")));

		verify(quizService, times(1)).findAllQuizzes(SORT);
	}

	@Test
	public void findQuizByIdTest() throws Exception {
		when(quizService.findQuizById(1L)).thenReturn(new Quiz(1L, "Quiz"));

		mockMvc.perform(
				get("/quizzes/1")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.name", is("Quiz")));

		verify(quizService, times(1)).findQuizById(1L);
	}

	@Test
	public void saveQuizTest() throws Exception {
		Quiz quiz = new Quiz("Quiz");

		when(quizService.saveQuiz(quiz)).thenReturn(new Quiz(1L, "Quiz"));

		mockMvc.perform(
				post("/quizzes")
			    .contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(quiz))
				)
		        .andExpect(status().isCreated())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.id", is(1)));

		verify(quizService, times(1)).saveQuiz(quiz);
	}

	@Test
	public void updateQuizTest() throws Exception {
		Quiz quiz = new Quiz(1L, "Quiz");

		when(quizService.updateQuiz(quiz, 1L)).thenReturn(quiz);

		mockMvc.perform(
				put("/quizzes/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(quiz))
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.name", is("Quiz")));

		verify(quizService, times(1)).updateQuiz(quiz, 1L);
	}

	@Test
	public void deleteQuizByIdTest() throws Exception {
		doNothing().when(quizService).deleteQuizById(1L);

		mockMvc.perform(
				delete("/quizzes/1")
				)
		       .andExpect(status().isNoContent());

		verify(quizService, times(1)).deleteQuizById(1L);
	}

}
