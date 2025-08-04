![Logo](frontend/src/assets/logo.webp)

## Tooling

### Backend

* **Framework**: Express.js
* **Language**: TypeScript
* **Runtime**: Node.js
* **HTTP Client**: Axios

### Frontend

* **Framework**: React
* **Language**: TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Data Fetching**: Tanstack React Query
* **List Virtualization**: Tanstack React Virtual
* **Zod**: Type Guards

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mickael45/VirtualBrain-Test.git
    cd Virtualbrain-Test
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    pnpm install
    ```

3.  **Install frontend dependencies:**
   
    First update the CHAT_BOT_TOKEN constant in the `./frontend/src/constants.ts` file.
    Then run the following commands.

    ```bash
    cd ../frontend
    pnpm install
    ```

## Running the Application

### Backend

To start the backend server, run the following command from the `backend` directory:

```bash
pnpm dev
```

The server will start on port 3001.

### Frontend

To start the frontend development server, run the following command from the frontend directory:

```bash
pnpm dev
```

The application will be accessible in your browser.
