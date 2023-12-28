import * as express from 'express';
import sequelize from './sequelize';
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie !!');
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données :', error);
    });


const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: { title: "Todo Rest API" },
        servers: [ { url:"http://localhost:3000"}]
    },
    apis: ["./index.js"],
};

const swaggerDoc = swaggerJsdoc(swaggerOptions);
console.log("swagger doc from annotated js:", swaggerDoc);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDoc));

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

interface Movie {
    movie_id?: number;
    movie_title: string;
    movie_poster: string;
    movie_description: string;
    movie_releasedate: string;
    movie_filmgenre: string;
    movie_duration: number,
    movie_filmdirector: string;
     averageMark?: number; // Cette propriété est optionnelle et sera ajoutée plus tard
}

interface Critic{
    critic_id?: number; //id auto incrémentée au besoin
    critic_date: string;
    critic_remark: string;
    critic_mark: number;
    user_id: number;
    movie_id: number;
}

interface User{
    user_id?: number; //id auto incrémentée au besoin
    user_pseudo: string;
    user_email: string;
    user_password: string;
    user_role: " ";
    user_points : 0;
    user_level : 0;
}



app.get('/api/movies', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM MOVIE');
        let movies: Movie[] = result[0] as Movie[]; //On récupère sous la forme de l'interface Movie

        res.json(movies);
        return;
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des films.' });
        return;
    }
});

app.get('/api/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const result = await sequelize.query('SELECT * FROM movie WHERE movie_id = ' + movieId);
        let movies: Movie[] = result[0] as Movie[]; //On récupère sous la forme de l'interface Movie

        //Récupération des notes moyennes
        const result2 = await sequelize.query('SELECT critic_mark FROM Critic WHERE movie_id = ' + movieId);
        const critics_marks = result2[0];
        interface Critics_marks {critic_mark: number;}  //On crée une sous interface puisqu'on ne récupère que l'élément note
        let m: Critics_marks[] = critics_marks as Critics_marks[];
        let totalMark = m.reduce((sum, critic) => sum + critic.critic_mark, 0);
        movies[0].averageMark = m.length > 0 ? totalMark / m.length : 0;

        res.json(movies);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du film', error: error.message });
    }
});

app.get('/api/movie-critics/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        console.log("C'est parti");
        const result = await sequelize.query('SELECT *, users.user_pseudo FROM Critic JOIN users ON critic.user_id = users.user_id WHERE movie_id = ' + movieId);
        let critics: Critic[] = result[0] as Critic[];
        console.log(result);
        res.json(critics);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des critiques', error: error.message });
    }
});
app.get('/api/get_movie-critic', async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT critic_id FROM Critic WHERE movie_id = ${req.query.movie_id} and user_id = ${req.query.user_id}`);
        console.log('Résultat de la requête SQL :', result);

        if (result.length > 0 && Array.isArray(result[0]) && result[0].length > 0) {
            console.log("Retour SQL :", result[0]);

            // Mapping pour obtenir un tableau des valeurs de critic_id
            const criticIds = result[0].map(item => item.critic_id);
            console.log(criticIds)

            res.status(200).json(criticIds);
        } else {
            res.status(404).json({ message: 'Aucune critique trouvée pour cet utilisateur et ce film.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des IDs de critique :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des IDs de critique.' });
    }
});
app.get('/getids', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT user_id FROM users');
        let user: User[] = result[0] as User[]; //On récupère sous la forme de l'interface Movie
        res.json(user);
        console.log("Le premier éléments : ",user[0], " et le deuxieme element : ",user[1]);
        return;
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des films.' });
        return;
    }
});
app.get('/getnames', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT user_pseudo FROM users');
        let user: User[] = result[0] as User[]; //On récupère sous la forme de l'interface Movie
        res.json(user);
        return;
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des films.' });
        return;
    }
});

app.get('/api/movie-critics_byUser_id', async (req, res) => {
    console.log("Commencons");
    const user_id = req.query.user_id;
    console.log("USER_ID", user_id);
    try {
        const result = await sequelize.query(`SELECT * FROM Critic WHERE user_id = ${user_id}`);
        let critics: Critic[] = result[0] as Critic[];
        res.json(critics);
        console.log(res);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des critiques', error: error.message });
    }
});

app.get('/api/user-critics', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM Critic');
        let critics: Critic[] = result[0] as Critic[];
        res.json(critics);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des critiques', error: error.message });
    }
});

app.get('/api/getpassword', async (req, res) => {
    const { username } = req.query; // Récupérer le paramètre 'username' de la requête
    try {
        const result = await sequelize.query(
            `SELECT user_password FROM users WHERE user_pseudo = :username`,
            {
                replacements: { username },
            }
        );
        console.log('Résultat de la requête SQL :', result);
        if (result.length > 0 && Array.isArray(result[0]) && result[0].length > 0) {
            const password = result[0][0].user_password; // Accéder à la valeur du mot de passe
            res.status(200).json(password);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du mot de passe :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération du mot de passe.' });
    }
});

app.get('/api/getidbyusername', async (req, res) => {
    console.log("Recuperation de l id")
    const { username } = req.query; // Récupérer le paramètre 'username' de la requête
    try {
        const result = await sequelize.query(
            `SELECT user_id FROM users WHERE user_pseudo = :username`,
            {
                replacements: { username },
            }
        );
        console.log('Résultat de la requête SQL :', result);
        if (result.length > 0 && Array.isArray(result[0]) && result[0].length > 0) {
            const id = result[0][0].user_id; // Accéder à la valeur du mot de passe
            res.status(200).json(id);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l id :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l id.' });
    }
});

app.get('/api/movie-critics', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM Critic');
        let critics: Critic[] = result[0] as Critic[];
        res.json(critics);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des critiques', error: error.message });
    }
});

app.post('/api/submitMovie', async(req, res) => {
    try {
        console.log('reçu: ',req.body)
        //On initialise un élément critic

        const movie: Movie = {
            movie_title: req.body.title,
            movie_poster: req.body.poster,
            movie_description: req.body.description,
            movie_releasedate: req.body.releaseDate, //par défaut
            movie_filmgenre: req.body.filmGenre,
            movie_duration: req.body.duration,
            movie_filmdirector: req.body.filmdirector,
        };

        console.log('On va insérer dans la bdd',movie)
        // Utilisez la méthode execute ou query pour insérer les données
        try {
            const result = await sequelize.query(
                'INSERT INTO movie (movie_title,movie_poster,movie_description,movie_releasedate,movie_filmgenre,movie_duration,movie_filmdirector) VALUES (?,?,?, ?, ?, ?, ?)',
                {
                    replacements: [
                        movie.movie_title,
                        movie.movie_poster,
                        movie.movie_description,
                        movie.movie_releasedate,
                        movie.movie_filmgenre,
                        movie.movie_duration,
                        movie.movie_filmdirector,
                    ],
                }
            );
            console.log('Insertion réussie');
        } catch (error) {
            console.error('Erreur lors de l insertion:', error);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du traitement des données', error: error.message });
    }
});

app.post('/api/submitcritic', async(req, res) => {
    console.log('Route POST submit atteinte');
    try {
        console.log('reçu: ',req.body);
        console.log('test important',req.body.movie_id);
        //On initialise un élément critic

        const critic: Critic = {
            critic_date: formattedDate,
            critic_remark: req.body.description,
            critic_mark: req.body.note,
            user_id: req.body.user_id, //par défaut
            movie_id: req.body.movie_id,
        };

        console.log('On va insérer dans la bdd',critic)
        // Utilisez la méthode execute ou query pour insérer les données
        try {
            const result = await sequelize.query(
                'INSERT INTO Critic (critic_date, critic_remark, critic_mark, user_id, movie_id) VALUES (?, ?, ?, ?, ?)',
                {
                    replacements: [
                        critic.critic_date,
                        critic.critic_remark,
                        critic.critic_mark,
                        critic.user_id,
                        critic.movie_id,
                    ],
                }
            );
            console.log('Insertion réussie:', result);
        } catch (error) {
            console.error('Erreur lors de l insertion:', error);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du traitement des données', error: error.message });
    }
});

app.post('/api/adduser', async(req, res) => {
    console.log('Route POST submit atteinte');
    try {
        console.log('reçu: ',req.body);
        console.log('test important',req.body.movie_id);
        //On initialise un élément critic

        const user: User = {
            user_pseudo: req.body.username,
            user_email : req.body.email,
            user_password: req.body.password,
            user_id: 5, //par défaut
            user_role : " ",
            user_level : 0,
            user_points : 0
        };

        console.log('On va insérer dans la bdd',user)
        // Utilisez la méthode execute ou query pour insérer les données
        try {
            const result = await sequelize.query(
                'INSERT INTO users (user_pseudo,user_email,user_password) VALUES ( ?, ?, ?)',
                {
                    replacements: [
                        user.user_pseudo,
                        user.user_email,
                        user.user_password,
                    ],
                }
            );
            console.log('Insertion réussie:', result);
        } catch (error) {
            console.error('Erreur lors de l insertion:', error);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du traitement des données', error: error.message });
    }
});

app.post('/api/removecritic', async(req, res) => {
    try {
        console.log('On va supprimer la critique d id:',req.body.critic_id)
        try {
            const result = await sequelize.query('DELETE from Critic WHERE critic_id = ' + req.body.critic_id);
            console.log('Suppression réussie');
        } catch (error) {
            console.error('Erreur lors de la suppression', error);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du traitement des données', error: error.message });
    }
});


app.use(express.json()); // => to parse request body with http header "content-type": "application/json"
app.get('/api/liveness', function (req, res) {
    res.send('OK ca marche !!!');
});
console.log('starting...');
app.listen(3000, function () {
    console.log('Ok, started!');
});

//# sourceMappingURL=app.js.map



let idGenerator = 1;
let userGenerator : number = 1;
function newId() {
    return idGenerator++;
}

function idUserGenerator():number{
    return userGenerator++;
}







