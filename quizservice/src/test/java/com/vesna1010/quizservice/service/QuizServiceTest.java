package com.vesna1010.quizservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.vesna1010.quizservice.model.Quiz;
import com.vesna1010.quizservice.repository.QuizRepository;

public class QuizServiceTest extends BaseServiceTest {

	@MockBean
	private QuizRepository quizRepository;
	@Autowired
	private QuizService quizService;

	@Test
	public void findAllQuizzesTest() {
		when(quizRepository.findAll(SORT)).thenReturn(Arrays.asList(new Quiz(1L, "Quiz A"), new Quiz(2L, "Quiz B")));

		List<Quiz> quizzesDB = quizService.findAllQuizzes(SORT);

		assertEquals(2, quizzesDB.size());
		verify(quizRepository, times(1)).findAll(SORT);
	}

	@Test
	public void findQuizByIdTest() {
		when(quizRepository.findById(1L)).thenReturn(Optional.of(new Quiz(1L, "Quiz")));

		Quiz quizDB = quizService.findQuizById(1L);

		assertEquals("Quiz", quizDB.getName());
		verify(quizRepository, times(1)).findById(1L);
	}

	@Test
	public void findQuizByIdNotFoundTest() {
		when(quizRepository.findById(1L)).thenReturn(Optional.empty());

		assertThrows(RuntimeException.class, () -> quizService.findQuizById(1L));
	}

	@Test
	public void saveQuizTest() {
		Quiz quiz = new Quiz("Quiz");

		when(quizRepository.save(quiz)).thenReturn(new Quiz(1L, "Quiz"));

		Quiz quizDB = quizService.saveQuiz(quiz);

		assertEquals(1L, quizDB.getId());
		verify(quizRepository, times(1)).save(quiz);
	}

	@Test
	public void updateQuizTest() {
		Quiz quiz = new Quiz(1L, "Quiz");

		when(quizRepository.save(quiz)).thenReturn(quiz);
		when(quizRepository.existsById(1L)).thenReturn(true);

		Quiz quizDB = quizService.updateQuiz(quiz, 1L);

		assertEquals("Quiz", quizDB.getName());
		verify(quizRepository, times(1)).existsById(1L);
		verify(quizRepository, times(1)).save(quiz);
	}

	@Test
	public void updateQuizNotFoundTest() {
		Quiz quiz = new Quiz(1L, "Quiz");

		when(quizRepository.save(quiz)).thenReturn(quiz);
		when(quizRepository.existsById(1L)).thenReturn(false);

		assertThrows(RuntimeException.class, () -> quizService.updateQuiz(quiz, 1L));
	}

	@Test
	public void deleteQuizByIdTest() {
		when(quizRepository.existsById(1L)).thenReturn(true);
		doNothing().when(quizRepository).deleteById(1L);

		quizService.deleteQuizById(1L);

		verify(quizRepository, times(1)).existsById(1L);
		verify(quizRepository, times(1)).deleteById(1L);
	}

	@Test
	public void deleteQuizByIdNotFoundTest() {
		when(quizRepository.existsById(1L)).thenReturn(false);
		doNothing().when(quizRepository).deleteById(1L);

		assertThrows(RuntimeException.class, () -> quizService.deleteQuizById(1L));
	}

}
