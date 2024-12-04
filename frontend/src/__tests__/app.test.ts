import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// test('should render login form for client', () => {
//   render(<App />);

//   const libraireButton = screen.getByText(/Libraire/i);
//   const clientButton = screen.getByText(/Client/i);

//   expect(libraireButton).toBeInTheDocument();
//   expect(clientButton).toBeInTheDocument();

//   fireEvent.click(clientButton);

//   const emailInput = screen.getByPlaceholderText(/Email/i);
//   const passwordInput = screen.getByPlaceholderText(/Mot de passe/i);

//   expect(emailInput).toBeInTheDocument();
//   expect(passwordInput).toBeInTheDocument();
// });

// j'ai testé plusieurs méthodes pour régler le soucis mais j'y arrive pas, un soucis de config peut être (ou de concentration ou les deux)