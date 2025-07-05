# Gemini AI API Proxy & Testing Application

This project provides a secure way to interact with the Gemini AI API from a client-side application by proxying API requests through a Node.js server. It consists of a server-side application that exposes a REST API, effectively hiding your sensitive Gemini API key, and a client-side React application for testing and demonstrating the API's functionality.

## Project Overview

The core purpose of this project is to abstract the direct exposure of your Gemini API key from the client-side. The server acts as an intermediary, making requests to the Gemini API on behalf of the client, thus enhancing security. The React client application serves as a simple interface to ensure that the integration and API calls are functioning correctly.

## Features

### Server Application (Node.js REST API)
* **API Key Hiding:** Securely stores and uses the Gemini API key, preventing its exposure in client-side code.
* **RESTful Endpoints:** Provides a simple REST API that the client application can consume to interact with the Gemini API.
* **Node.js Powered:** Built with Node.js, ensuring a robust and scalable backend for proxying requests.

### Client Application (React App)
* **User Interface for Testing:** A newly created React application designed for testing and verifying the server-side API integration.
* **API Interaction:** Communicates with the Node.js server's REST API to send requests to the Gemini AI.
* **Frontend Development:** A brand new React app, providing a clean slate for development and testing.

## Getting Started (Conceptual)

To get this project up and running, you would typically follow these general steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/peterchafe/gemini-ai-api.git](https://github.com/peterchafe/gemini-ai-api.git)
    cd gemini-ai-api
    ```
2.  **Install Dependencies:** Navigate into both the `server` (or similar name) and `client` (or similar name) directories and install their respective dependencies.
    ```bash
    # For the server application
    cd src/server
    npm install
    # For the client application
    cd ../my-gemini-app
    npm install
    ```
3.  **Configure Server Environment Variables:** Set up your `.env` file as described in the next section.

## .env File Configuration

The server application requires a `.env` file in its server directory to securely store your Gemini API key. This file is crucial for preventing your API key from being committed to version control.

> [!IMPORTANT]
> It is crucial that the .env file is added to the .gitignore file so that it remains private!

**File Name:** `.env` (note the leading dot)

**Location:** In the src/server/ directory of your Node.js server application.

**Format:**
The `.env` file uses a simple `KEY=VALUE` format. Each variable should be on a new line. No quotes are needed for the values unless they contain spaces or special characters, but it's generally good practice to omit them for simple API keys.

```dotenv
REACT_APP_GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY_HERE