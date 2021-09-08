package com.vesna1010.quizservice.enums;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vesna1010.quizservice.converter.PointsToIntegerConverter;
import com.vesna1010.quizservice.converter.StringToPointsConverter;

@JsonSerialize(converter = PointsToIntegerConverter.class)
@JsonDeserialize(converter = StringToPointsConverter.class)
public enum Points {
	TEN(10), TWENTY(20), FIFTY(50), HUNDRED(100);

	private Integer points;

	private Points(Integer points) {
		this.points = points;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = Integer.valueOf(points);
	}

}
