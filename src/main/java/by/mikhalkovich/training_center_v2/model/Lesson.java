package by.mikhalkovich.training_center_v2.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Simple JavaBean object that represents Lesson.
 */
@Entity
@Getter
@Setter
@ToString
@Table(name = "lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime;

    @Column(name = "lesson_duration")
    private int lessonDuration;

    @Column(name = "lesson_title")
    private String lessonTitle;

    public Lesson(){}

    /** Mapping */

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Course course;

    @Override
    public boolean equals(Object otherObject){
        if (otherObject == this) return true;
        if (otherObject == null) return false;
        if (!(otherObject instanceof Lesson)) return false;

        Lesson other = (Lesson) otherObject;

        return this.id.equals(other.id);
    }
    @Override
    public int hashCode(){
        return 31 * Objects.hashCode(id);
    }
}

