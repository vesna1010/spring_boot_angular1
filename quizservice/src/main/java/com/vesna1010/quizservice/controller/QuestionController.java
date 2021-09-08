package com.vesna1010.quizservice.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vesna1010.quizservice.model.Question;
import com.vesna1010.quizservice.service.QuestionService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/questions")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@GetMapping
	public Page<Question> findAllQuestions(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		return questionService.findAllQuestions(pageable);
	}

	@GetMapping("/quiz/{id}")
	public List<Question> findQuestionsByQuizId(@PathVariable Long id, @RequestParam Integer size) {
		return questionService.findQuestionsByQuizIdAndOfSize(id, size);
	}

	@GetMapping("/{id}")
	public Question findQuestionById(@PathVariable Long id) {
		return questionService.findQuestionById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Question saveQuestion(@RequestBody Question question) {
		return questionService.saveQuestion(question);
	}

	@PutMapping("/{id}")
	public Question updateQuestion(@RequestBody Question question, @PathVariable Long id) {
		return questionService.updateQuestion(question, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteQuestionById(@PathVariable Long id) {
		questionService.deleteQuestionById(id);
	}

}