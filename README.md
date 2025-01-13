Chess Game Project

Overview

This is a portfolio project that demonstrates my skills in software development, focusing on Object-Oriented Programming (OOP) principles and the application of SOLID design principles. The project implements a chess game with a robust business logic layer, global state management, and dynamic user interface updates using modern web technologies.

Key Features

Chess Business Logic Layer:

Designed with OOP principles.

Applied SOLID principles for maintainable and scalable code.

Used design patterns such as Singleton, Builder, Factory, and Strategy to enhance the structure and functionality of the game logic.

Global State Management:

Leveraged redux@toolkit for efficient and centralized state management.

Stored and managed the actual chessboard state, player information, and game progress.

Dynamic UI Updates:

Built with React for responsive and dynamic rendering of components.

Seamless synchronization between the business logic layer and the UI.

Multiplayer Support:

Integrated WebSocket connections to enable real-time multiplayer games.

Implemented features for session management, player synchronization, and move validation.

Technologies Used

Frontend:

React (for component-based UI development)

Redux Toolkit (for state management)

Backend:

WebSocket server (for real-time communication)

Design Patterns:

Singleton: For managing a single instance of key components.

Builder: For constructing complex game entities step by step.

Factory: For creating instances of chess pieces dynamically.

Strategy: For implementing flexible game rules and move validations.

Utilities:

TypeScript (for type-safe development)

CoordinationPositionMapper: For mapping 2D/3D board coordinates.

FigureMapper: For handling piece promotion and other operations.

Project Architecture

The project follows a clean and modular architecture:

Business Logic Layer:

Encapsulates chess game rules, piece movements, and validations.

Implements reusable and testable classes for game entities.

State Management Layer:

Uses Redux Toolkit to store and manage the chessboard state.

Provides selectors and actions for interacting with the state.

Presentation Layer:

Dynamic React components for displaying the chessboard, pieces, and game controls.

Real-time updates triggered by state changes.

WebSocket Integration:

Establishes player sessions and manages communication.

Synchronizes moves between players in online multiplayer mode.

Key Functionalities

Chess Game:

Full chess functionality with standard rules.

Supports piece promotion, castling, and checkmate detection.

Multiplayer Mode:

Real-time communication between players using WebSockets.

Dynamic updates to the game state on both ends.

State Persistence:

Ensures the game state is consistent across sessions.

Installation and Setup

Clone the repository:

git clone https://github.com/your-username/chess-game.git
cd chess-game

Install dependencies:

npm install

Start the development server:

npm start

Start the WebSocket server:

npm run server

Open the application in your browser:

http://localhost:3000

Usage

Select a game mode (single-player or multiplayer).

Make moves by clicking and dragging pieces on the board.

For multiplayer, share the session ID with another player.

Project Highlights

SOLID Principles in Action:

Ensures a clean and maintainable codebase.

Allows easy extension of chess rules and functionalities.

Design Patterns:

Singleton for managing game state.

Builder and Factory for creating chess entities.

Strategy for dynamic rule enforcement.

Real-Time Communication:

Multiplayer functionality powered by WebSocket.

Future Improvements

Add AI for single-player mode with varying difficulty levels.

Implement a database for storing game history and user profiles.

Enhance UI/UX with animations and better visuals.

Add mobile responsiveness for better accessibility.

Conclusion

This project demonstrates my ability to design and implement a complex application using modern technologies and best practices. The combination of OOP, SOLID principles, design patterns, and modern state management showcases my skills as a software developer. Thank you for reviewing my project!

License

This project is licensed under the MIT License.
