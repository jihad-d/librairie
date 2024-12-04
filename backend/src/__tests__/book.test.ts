import request from "supertest";
import express from "express";
import {app} from "../index"; // Remplace par le chemin vers ton fichier Express principal

describe("Backend Tests", () => {
  //test connexion
  describe("POST /login", () => {
    it("retourne un msg de bienvenu pour libraire", async () => {
      const response = await request(app).post("/login").send({
        userType: "libraire",
        email: "libraire@example.com",
        password: "libraire123",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Bienvenue, libraire!");
    });

    it("retourne un msg de bienvenu pour client", async () => {
      const response = await request(app).post("/login").send({
        userType: "client",
        email: "client@example.com",
        password: "client123",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Bienvenue, client!");
    });

    it("retourne erreur id invalide", async () => {
      const response = await request(app).post("/login").send({
        userType: "libraire",
        email: "wrong@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Identifiants invalides.");
    });
  });

  //test livres (ajout)
  describe("POST /books", () => {
    it("ajoute livre avec données valides", async () => {
      const newBook = {
        title: "Harry Potter",
        author: "JK Rowling",
        synopsis: "Le petit aux lunettes.",
      };

      const response = await request(app).post("/books").send(newBook);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Livre ajouté avec succès.");
    });

    it("erreur si champs obligatoires manquants", async () => {
      const response = await request(app).post("/books").send({
        title: "Incomplete Book",
        author: "",
        synopsis: "",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Tous les champs sont requis.");
    });
  });

  // test affiche livre
  describe("GET /books", () => {
    it("retourne la liste de tous les livres", async () => {
      await request(app).post("/books").send({
        title: "Test1",
        author: "Moi",
        synopsis: "Il était une fois.",
      });

      await request(app).post("/books").send({
        title: "Javascript",
        author: "Azerty",
        synopsis: "Fin de l'histoire.",
      });

      const response = await request(app).get("/books");

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0); 
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Test1",
            author: "Moi",
          }),
          expect.objectContaining({
            title: "Javascript",
            author: "Azerty",
          }),
        ])
      );
    });
  });
});
