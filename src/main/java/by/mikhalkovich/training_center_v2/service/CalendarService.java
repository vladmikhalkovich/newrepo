package by.mikhalkovich.training_center_v2.service;

import by.mikhalkovich.training_center_v2.dto.CalendarDataDto;

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarService {

    List<CalendarDataDto> getDataForCalendar(String username, LocalDateTime start, LocalDateTime end);
}
