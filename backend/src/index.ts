import express from "express";
import cors from "cors";

export const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { userType: "libraire", email: "libraire@example.com", password: "libraire123" },
  { userType: "client", email: "client@example.com", password: "client123" },
];

const books: { title: string; author: string; synopsis: string }[] = [];

app.post("/login", (req, res) => {
  const { userType, email, password } = req.body;
  const user = users.find((u) => u.userType === userType && u.email === email && u.password === password);

  if (user) {
    return res.json({ message: `Bienvenue, ${userType}!` });
  } else {
    return res.status(401).json({ message: "Identifiants invalides." });
  }
});

// Route pour ajouter un livre
app.post("/books", (req, res) => {
  const { title, author, synopsis } = req.body;

  if (!title || !author || !synopsis) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  books.push({ title, author, synopsis });
  return res.json({ message: "Livre ajouté avec succès." });
});

// Route pour récupérer tous les livres
app.get("/books", (req, res) => {
  return res.json(books);
});

app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
