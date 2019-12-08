package by.mikhalkovich.training_center_v2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@Table(name = "lecturer")
public class Lecturer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Lecturer(){}

    /** Mapping */

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "lecturer")
    private List<Course> course;

    @Override
    public boolean equals(Object otherObject){
        if (otherObject == this) return true;
        if (otherObject == null) return false;
        if (!(otherObject instanceof Lecturer)) return false;

        Lecturer other = (Lecturer) otherObject;

        return this.id.equals(other.id);
    }
    @Override
    public int hashCode(){
        return 31 * Objects.hashCode(id);
    }
}
