package com.vesna1010.quizservice.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vesna1010.quizservice.model.Quiz;
import com.vesna1010.quizservice.service.QuizService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/quizzes")
public class QuizController {

	@Autowired
	private QuizService quizService;

	@GetMapping
	public List<Quiz> findAllQuizzes(@SortDefault(sort = "id", direction = Direction.ASC) final Sort sort) {
		return quizService.findAllQuizzes(sort);
	}

	@GetMapping("/{id}")
	public Quiz findQuizById(@PathVariable final Long id) {
		return quizService.findQuizById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Quiz saveQuiz(@RequestBody final Quiz quiz) {
		return quizService.saveQuiz(quiz);
	}

	@PutMapping("/{id}")
	public Quiz updateQuiz(@RequestBody final Quiz quiz, @PathVariable final Long id) {
		return quizService.updateQuiz(quiz, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteQuizById(@PathVariable final Long id) {
		quizService.deleteQuizById(id);
	}

}
