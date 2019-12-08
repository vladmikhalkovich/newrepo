package by.mikhalkovich.training_center_v2.model;

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
@Table(name = "listener")
public class Listener {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Listener(){}

    /** Mapping */

    @ManyToMany(mappedBy = "listener", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<Course> courses;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Override
    public boolean equals(Object otherObject){
        if (otherObject == this) return true;
        if (otherObject == null) return false;
        if (!(otherObject instanceof Listener)) return false;

        Listener other = (Listener) otherObject;

        return this.id.equals(other.id);
    }
    @Override
    public int hashCode(){
        return 31 * Objects.hashCode(id);
    }
}