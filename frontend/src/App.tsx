import React, { useState } from "react";

interface Book {
  title: string;
  author: string;
  synopsis: string;
}

const App: React.FC = () => {
  const [userType, setUserType] = useState<"libraire" | "client" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]); // Livres empruntés par le client
  const [newBook, setNewBook] = useState<Book>({
    title: "",
    author: "",
    synopsis: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Pour vérifier si l'utilisateur est connecté

  // Ajouter un livre
  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.synopsis) {
      alert("Tous les champs sont requis.");
      return;
    }

    setBooks([...books, newBook]);
    setNewBook({ title: "", author: "", synopsis: "" }); // Réinitialiser le formulaire
  };

  // Supprimer un livre
  const handleDeleteBook = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    alert("Livre supprimé avec succès !");
  };

  // Emprunter un livre
  const handleBorrowBook = (book: Book) => {
    if (borrowedBooks.find((b) => b.title === book.title)) {
      alert("Vous avez déjà emprunté ce livre.");
      return;
    }
    setBorrowedBooks([...borrowedBooks, book]);
    alert(`Vous avez emprunté "${book.title}".`);
  };

  // Rendre un livre
  const handleReturnBook = (index: number) => {
    const updatedBorrowedBooks = borrowedBooks.filter((_, i) => i !== index);
    setBorrowedBooks(updatedBorrowedBooks);
    alert("Livre rendu avec succès !");
  };

  // Connexion
  const handleLogin = () => {
    if (
      (userType === "libraire" && email === "libraire@example.com" && password === "libraire123") ||
      (userType === "client" && email === "client@example.com" && password === "client123")
    ) {
      setIsLoggedIn(true); // Marquer comme connecté
      alert("Connexion réussie !");
    } else {
      alert("Identifiants invalides.");
    }
  };

  // Déconnexion
  const handleLogout = () => {
    setUserType(null); // Réinitialiser l'état de l'utilisateur
    setEmail("");
    setPassword("");
    setIsLoggedIn(false); // Marquer comme déconnecté
  };

  return (
    <div>
      {/* Sélection de l'utilisateur (Libraire / Client) */}
      {!userType && !isLoggedIn ? (
        <div>
          <button onClick={() => setUserType("libraire")}>Libraire</button>
          <button onClick={() => setUserType("client")}>Client</button>
        </div>
      ) : (
        <div>
          {/* Formulaire de connexion (affiché seulement si un utilisateur est sélectionné) */}
          {!isLoggedIn && userType && (
            <div>
              <h2>Connexion pour {userType}</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Se connecter</button>
            </div>
          )}

          {/* Si l'utilisateur est connecté, afficher les options spécifiques */}
          {isLoggedIn && (
            <div>
              <h1>Bienvenue, {userType} !</h1>

              {/* Bouton de déconnexion */}
              <button onClick={handleLogout}>Déconnexion</button>

              {/* Affichage des livres */}
              <h2>Liste des livres :</h2>
              {books.length > 0 ? (
                <ul>
                  {books.map((book, index) => (
                    <li key={index}>
                      <strong>{book.title}</strong> par {book.author}
                      <p>{book.synopsis}</p>
                      {userType === "libraire" ? (
                        <button onClick={() => handleDeleteBook(index)}>
                          Supprimer le livre
                        </button>
                      ) : (
                        <button onClick={() => handleBorrowBook(book)}>
                          Emprunter
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucun livre pour le moment.</p>
              )}

              {/* Formulaire pour ajouter un livre (visible uniquement pour le libraire) */}
              {userType === "libraire" && (
                <div>
                  <h2>Ajouter un livre</h2>
                  <input
                    type="text"
                    placeholder="Titre"
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook({ ...newBook, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Auteur"
                    value={newBook.author}
                    onChange={(e) =>
                      setNewBook({ ...newBook, author: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Synopsis"
                    value={newBook.synopsis}
                    onChange={(e) =>
                      setNewBook({ ...newBook, synopsis: e.target.value })
                    }
                  ></textarea>
                  <button onClick={handleAddBook}>Ajouter le livre</button>
                </div>
              )}

              {/* Liste des livres empruntés (visible uniquement pour le client) */}
              {userType === "client" && borrowedBooks.length > 0 && (
                <div>
                  <h2>Vos livres empruntés :</h2>
                  <ul>
                    {borrowedBooks.map((book, index) => (
                      <li key={index}>
                        <strong>{book.title}</strong> par {book.author}
                        <p>{book.synopsis}</p>
                        <button onClick={() => handleReturnBook(index)}>
                          Rendre le livre
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;




