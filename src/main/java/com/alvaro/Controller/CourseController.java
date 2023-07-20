package com.alvaro.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.alvaro.Service.CourseService;
import com.alvaro.dto.CourseDTO;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

	private final CourseService courseService;

	@GetMapping
	public List<CourseDTO> list() {
		return courseService.list();
	}

	@GetMapping("/{id}")
	public CourseDTO findById(@PathVariable @NotNull @Positive Long id) {
		return courseService.findById(id);
	}

	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public CourseDTO create(@RequestBody @Valid CourseDTO course) {
		return courseService.create(course);
	}

	@PutMapping("/{id}")
	public CourseDTO update(@PathVariable @NotNull @Positive Long id, @Valid @RequestBody @NonNull CourseDTO course) {
		return courseService.update(id, course);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id) {
		courseService.delete(id);
	}
}
