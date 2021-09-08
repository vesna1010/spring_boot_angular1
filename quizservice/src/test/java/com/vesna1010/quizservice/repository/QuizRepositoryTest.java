package com.vesna1010.quizservice.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import com.vesna1010.quizservice.model.Quiz;

public class QuizRepositoryTest extends BaseRepositoryTest {

	@Autowired
	private QuizRepository quizRepository;

	@Test
	public void findAllQuizzesBySortTest() {
		List<Quiz> quizzesDB = quizRepository.findAll(SORT);

		assertEquals(3, quizzesDB.size());
	}

	@Test
	public void findQuizByIdTest() {
		Optional<Quiz> optional = quizRepository.findById(1L);
		Quiz quizDB = optional.get();

		assertEquals("Quiz A", quizDB.getName());
		assertEquals(5, quizDB.getQuestions().size());
	}

	@Test
	public void findQuizByIdNotFoundTest() {
		Optional<Quiz> optional = quizRepository.findById(4L);

		assertThrows(NoSuchElementException.class, () -> optional.get());
	}

	@Test
	public void saveQuizTest() {
		Quiz quiz = new Quiz("Quiz D");

		Quiz quizDB = quizRepository.save(quiz);

		assertNotNull(quizDB.getId());
	}

	@Test
	public void deleteQuizByIdTest() {
		quizRepository.deleteById(1L);

		assertFalse(quizRepository.existsById(1L));
	}

}