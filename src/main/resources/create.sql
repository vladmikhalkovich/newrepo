#TABLE: user
CREATE TABLE user (
    id              INT             NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    email        VARCHAR(100)    NOT NULL,
    password        VARCHAR(100)    NOT NULL,
    first_name      VARCHAR(100)    NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    skype           VARCHAR(100)            ,
    role            VARCHAR(100)    NOT NULL,

    unique(email, skype)
);

#TABLE: lecturer
CREATE TABLE lecturer (
    id              INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         INT             NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user(id)
);

#TABLE: listener
CREATE TABLE listener (
    id              INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         INT             NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user(id)
);

#TABLE: course
CREATE TABLE course (
    id              INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_name     VARCHAR (150)   NOT NULL,
    course_description BLOB         NOT NULL,
    course_duration    INT          DEFAULT 0,
    start_date         DATE         NOT NULL,
    course_category    VARCHAR(100) NOT NULL,
    lecturer_id        INT          NOT NULL,

    FOREIGN KEY (lecturer_id) REFERENCES lecturer(id)
);

#TABLE: course_listener
CREATE TABLE course_listener (
    course_id       INT             NOT NULL,
    listener_id     INT             NOT NULL,

    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (listener_id) REFERENCES listener(id),
    PRIMARY KEY (course_id, listener_id)
);

#TABLE: lesson
CREATE TABLE lesson (
    id              INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    start_time      DATETIME        NOT NULL,
    lesson_duration INT             NOT NULL,
    lesson_title    VARCHAR(150)    NOT NULL,
    course_id       INT NOT NULL,

    FOREIGN KEY (course_id) REFERENCES course(id)
);