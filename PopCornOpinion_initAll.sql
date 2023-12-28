DROP DATABASE IF EXISTS PopCornOpinions;
CREATE DATABASE PopCornOpinions;

drop table if exists Critic;
drop table if exists Movie;
drop table if exists USERS;

create table USERS (user_id SERIAL PRIMARY KEY, user_pseudo varchar(30) UNIQUE, user_email varchar(30), user_password varchar(30), user_role varchar(30) DEFAULT 'utilisateur', user_points integer DEFAULT 0, user_level integer DEFAULT 0);
create table Movie (movie_id SERIAL PRIMARY KEY, movie_title varchar(50), movie_poster varchar(100), movie_description varchar(500), movie_releaseDate Date, movie_filmGenre varchar(32), movie_duration integer, movie_filmDirector varchar(32));
create table Critic (critic_id SERIAL PRIMARY KEY, critic_date Date, critic_remark varchar(500), critic_mark integer, user_id integer, movie_id integer);


ALTER TABLE Critic ADD CONSTRAINT fk_criticUser FOREIGN KEY (user_id) REFERENCES USERs(user_id);
ALTER TABLE Critic ADD CONSTRAINT fk_criticMovie FOREIGN KEY (movie_id) REFERENCES MOVIE(movie_id);

INSERT INTO users (user_pseudo,user_email,user_password) VALUES ('Mathis', 'mathis@gmail.com', 'MathisMdp');
INSERT INTO users (user_pseudo,user_email,user_password) VALUES ('Alexandre', 'alexandre@gmail.com', 'AlexandreMdp');
INSERT INTO users (user_pseudo,user_email,user_password) VALUES ('Mohamed', 'mohamed@gmail.com', 'MohamedMdp');
INSERT INTO users (user_pseudo,user_email,user_password) VALUES ('Mathilde', 'mathilde@gmail.com', 'MathildeMdp');
INSERT INTO users (user_id,user_pseudo,user_email,user_password, user_role) VALUES (0,'root', 'root@admin.com', 'root', 'administrator');

INSERT INTO movie (movie_title,movie_poster,movie_description, movie_releaseDate, movie_filmGenre, movie_duration, movie_filmDirector) VALUES ('Coco','https://fr.web.img3.acsta.net/r_1280_720/pictures/17/09/18/17/34/1102210.jpg','Film Disney tr s sympa','29-11-2017','Disney',105,'Adrian Molina');
INSERT INTO movie (movie_title,movie_poster,movie_description, movie_releaseDate, movie_filmGenre, movie_duration, movie_filmDirector) VALUES ('Harry Potter   l'' cole des sorciers','https://fr.web.img6.acsta.net/c_310_420/pictures/18/07/02/17/25/3643090.jpg','Un sorcier qui combat un monsieur','05/12/2001','Fantastique',152,'Chris Columbus');
INSERT INTO movie (
    movie_title, 
    movie_poster, 
    movie_description, 
    movie_releaseDate, 
    movie_filmGenre, 
    movie_duration, 
    movie_filmDirector
) VALUES 
('Les Aventuriers de l Arche Perdue', 'https://fr.web.img4.acsta.net/medias/nmedia/00/02/49/18/affiche.jpg', 'Un archéologue aventurier part à la recherche d''une relique sacrée.', '1981-06-12', 'Aventure', 115, 'Steven Spielberg'),
('Retour vers le Futur', 'https://fr.web.img2.acsta.net/pictures/22/07/22/15/00/2862661.jpg', 'Un adolescent voyage dans le temps dans une DeLorean modifiée, accompagné par un scientifique excentrique.', '1985-07-03', 'Science-fiction', 116, 'Robert Zemeckis'),
('Le Seigneur des Anneaux: La Communauté de l''Anneau', 'https://fr.web.img6.acsta.net/medias/nmedia/00/02/16/27/69218096_af.jpg', 'Un Hobbit entreprend un voyage périlleux pour détruire un anneau puissant.', '2001-12-19', 'Fantasy', 178, 'Peter Jackson'),
('Inception', 'https://fr.web.img2.acsta.net/medias/nmedia/18/72/34/14/19476654.jpg', 'Un voleur utilise la technologie de partage de rêves pour implanter une idée dans l''esprit d''un magnat.', '2010-07-16', 'Thriller', 148, 'Christopher Nolan'),
('Interstellar', 'https://fr.web.img6.acsta.net/pictures/14/09/24/12/08/158828.jpg', 'Un groupe d''explorateurs utilise un trou de ver dans l''espace pour dépasser les limites du voyage spatial humain.', '2014-11-07', 'Science-fiction', 169, 'Christopher Nolan');


INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'Mon film prefere', 4, 1, 1);
INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'Mon film prefere2', 4, 1, 1);
INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'Pas fou', 2, 2, 2);
INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'Pas mal', 3, 3, 1);
INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'J ai bien aime ce film', 3, 4, 2);
INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'Vraiment nul...', 1, 1, 1);
INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'Un tres bon film', 4, 2, 2);
INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'ca peut passer', 3, 3, 1);
INSERT INTO critic(critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES ('2023-12-10', 'Interessant', 4, 4, 2);
