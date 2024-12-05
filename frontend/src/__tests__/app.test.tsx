import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';


test('affiche le formulaire pour client', () => {
  render(<App />);

  const libraireButton = screen.getByText(/Libraire/i);
  const clientButton = screen.getByText(/Client/i);

  expect(libraireButton).toBeInTheDocument();
  expect(clientButton).toBeInTheDocument();

  fireEvent.click(clientButton);

  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Mot de passe/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});


test("connexion reussie pour le libraire", () => {
  render(<App />);

  fireEvent.click(screen.getByText(/Libraire/i));

  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "libraire@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
    target: { value: "libraire123" },
  });

  fireEvent.click(screen.getByText(/Se connecter/i));
  expect(screen.getByText(/Bienvenue, libraire/i)).toBeInTheDocument();
});


test("connexion echoue avec de mauvais identifiants", () => {
  render(<App />);

  fireEvent.click(screen.getByText(/Client/i));

  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "mauvais@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
    target: { value: "wrongpassword" },
  });

  fireEvent.click(screen.getByText(/Se connecter/i));
  expect(screen.queryByText(/Bienvenue/i)).not.toBeInTheDocument();
});


test("ajouter un livre pour le libraire", () => {
  render(<App />);

  // Connexion en tant que libraire
  fireEvent.click(screen.getByText(/Libraire/i));
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "libraire@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
    target: { value: "libraire123" },
  });
  fireEvent.click(screen.getByText(/Se connecter/i));

  // Ajouter un livre
  fireEvent.change(screen.getByPlaceholderText(/Titre/i), {
    target: { value: "Livre Test" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Auteur/i), {
    target: { value: "Auteur Test" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Synopsis/i), {
    target: { value: "Ceci est un test." },
  });
  fireEvent.click(screen.getByText(/Ajouter le livre/i));

  expect(screen.getByText(/Livre Test/i)).toBeInTheDocument();
});



test("supprimer un livre pour le libraire", () => {
  render(<App />);

  // connexion en tant que libraire
  fireEvent.click(screen.getByText(/Libraire/i));
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "libraire@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
    target: { value: "libraire123" },
  });
  fireEvent.click(screen.getByText(/Se connecter/i));

  //ajouter un livre
  fireEvent.change(screen.getByPlaceholderText(/Titre/i), {
    target: { value: "Livre Test" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Auteur/i), {
    target: { value: "Auteur Test" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Synopsis/i), {
    target: { value: "Ceci est un test." },
  });
  fireEvent.click(screen.getByText(/Ajouter le livre/i));

  //supprimer le livre
  const deleteButton = screen.getByText(/Supprimer le livre/i);
  fireEvent.click(deleteButton);

  expect(screen.queryByText(/Livre Test/i)).not.toBeInTheDocument();
});


test("déconnexion réinitialise l'état", () => {
  render(<App />);

  //connexion en tant que client
  fireEvent.click(screen.getByText(/Client/i));
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "client@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
    target: { value: "client123" },
  });
  fireEvent.click(screen.getByText(/Se connecter/i));

  fireEvent.click(screen.getByText(/Déconnexion/i));
  expect(screen.getByText(/Libraire/i)).toBeInTheDocument();
  expect(screen.getByText(/Client/i)).toBeInTheDocument();
});


test("emprunter un livre pour le client", () => {
  render(<App />);

  // connexion en tant que libraire pour ajouter un livre
  fireEvent.click(screen.getByText(/Libraire/i));
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "libraire@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
    target: { value: "libraire123" },
  });
  fireEvent.click(screen.getByText(/Se connecter/i));

  // ajouter un livre
  fireEvent.change(screen.getByPlaceholderText(/Titre/i), {
    target: { value: "Livre Test" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Auteur/i), {
    target: { value: "Auteur Test" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Synopsis/i), {
    target: { value: "Ceci est un test." },
  });
  fireEvent.click(screen.getByText(/Ajouter le livre/i));

  // deconnexion du libraire
  fireEvent.click(screen.getByText(/Déconnexion/i));

  // connexion en tant que client
  fireEvent.click(screen.getByText(/Client/i));
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "client@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
    target: { value: "client123" },
  });
  fireEvent.click(screen.getByText(/Se connecter/i));

  //emprunter le livre
  const emprunteButton = screen.getByText(/Emprunter/i);
  fireEvent.click(emprunteButton);

  // verifier que le livre est dans les livres empruntes
  const livresEmpruntes = screen.getByText(/Vos livres empruntés :/i);
  const livreTitre = within(livresEmpruntes.closest('div')!).getByText(/Livre Test/i);
  expect(livreTitre).toBeInTheDocument();
});