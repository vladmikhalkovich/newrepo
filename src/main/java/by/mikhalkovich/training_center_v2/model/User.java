package by.mikhalkovich.training_center_v2.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "skype")
    private String skype;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(){}

    @OneToOne(mappedBy = "user")
    private Listener listener;

    @OneToOne(mappedBy = "user")
    private Lecturer lecturer;


    @Override
    public boolean equals(Object otherObject){
        if (otherObject == this) return true;
        if (otherObject == null) return false;
        if (!(otherObject instanceof User)) return false;

        User other = (User) otherObject;

        return this.id.equals(other.id);
    }
    @Override
    public int hashCode(){
        return 31 * Objects.hashCode(id);
    }


}
