![Logo](frontend/src/assets/logo.webp)

# Important Note !

The `.md` file import into the brain fails with the following message:

```
{
    "name": "invalid-file-type",
    "message": "Invalid file type or file content does not match extension."
}
```

I tried:
- Changing the file extension to `.markdown`
- Sending an empty .md file to make sure the content wasn't an issue
- Changing the file name

But it didn't change anything.

What I ended up doing was converting all the files to PDF as a workaround.

To save you time, in case you experience the same issue, the conversion time all the converted pdf files are available in `backend/exports/pdf`

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

    First provide the VITE_CHAT_BOT_TOKEN and VITE_CHAT_BOT_URL environment variables in the `./frontend/.env` file.
    _I left my VITE_CHAT_BOT_URL in case you want to use it and assuming you have access to a new token for it._
    
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
