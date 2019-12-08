package by.mikhalkovich.training_center_v2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

/**
 * Simple JavaBean object that represents Course.
 */
@Entity
@Getter
@Setter
@ToString
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_description")
    private String courseDescription;

    @Column(name = "course_duration")
    private int courseDuration;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "course_category")
    @Enumerated(EnumType.STRING)
    private Category category;

    public Course(){}

    /** Mapping */

    @OneToMany(mappedBy = "course")
    private List<Lesson> lesson;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "course_listener",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "listener_id")
    )
    private List<Listener> listener;

    @ManyToOne
    @JoinColumn(name = "lecturer_id")
   // @JsonIgnore
    private Lecturer lecturer;

    @Override
    public boolean equals(Object otherObject){
        if (otherObject == this) return true;
        if (otherObject == null) return false;
        if (!(otherObject instanceof Course)) return false;

        Course other = (Course) otherObject;

        return this.id.equals(other.id);
    }
    @Override
    public int hashCode(){
        return 31 * Objects.hashCode(id);
    }
}