select c.id, c.course_name from Course c where c.lecturer_id = 1;

CREATE TABLE user (
                      id              INT             NOT NULL AUTO_INCREMENT PRIMARY KEY ,
                      email        VARCHAR(100)    NOT NULL,
                      password        VARCHAR(100)    NOT NULL,
                      first_name      VARCHAR(100)    NOT NULL,
                      last_name       VARCHAR(100)    NOT NULL,
                      skype           VARCHAR(100)            ,
                      role            VARCHAR(100)    NOT NULL,

                      unique(email, skype)
)