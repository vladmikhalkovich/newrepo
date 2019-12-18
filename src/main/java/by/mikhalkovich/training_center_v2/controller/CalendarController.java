package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.CalendarDataDto;
import by.mikhalkovich.training_center_v2.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class CalendarController {

    private final CalendarService calendarService;

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping("/calendar")
    public List<CalendarDataDto> getDataForCalendar(Authentication authentication,
                                                    @RequestParam("start")
                                                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
                                                    @RequestParam("end")
                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end){
        String username = authentication.getName();
        return calendarService.getDataForCalendar(username, start, end);
    }
}
