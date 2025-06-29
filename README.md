# Personality Test App

This project is a full-stack web application for predicting personality type (Extrovert/Introvert) based on user input.  
It consists of a **Next.js** frontend and a **Flask** backend with a machine learning model.

---

## Project Structure

```
backend/    # Flask API (Python)
frontend/   # Next.js frontend (JavaScript/React)
```

---

## Backend (Flask)

### Features

- REST API endpoint `/personalitytest` for personality prediction.
- Loads ML model and scaler from GitHub.
- Handles CORS for frontend integration.

### Requirements

- Python 3.8+
- See [backend/requirements.txt](../backend/requirements.txt)

### Installation & Running Locally

```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

- The backend will run on `http://127.0.0.1:5000/` by default.

---

## Frontend (Next.js)

### Features

- User-friendly form for inputting personality-related data.
- Sends data to backend and displays prediction.
- Responsive and styled with Tailwind CSS.

### Requirements

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation & Running Locally

```sh
cd frontend
npm install
npm run dev
```

- The frontend will run on `http://localhost:3000/` by default.

### Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:5000
```

---

## Usage

1. Start the backend server.
2. Start the frontend development server.
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
4. Fill out the form and submit to get your personality prediction.

---

## Deployment

- The backend is configured for deployment on [Vercel](https://vercel.com/) using [backend/vercel.json](../backend/vercel.json).
- The frontend can be deployed to Vercel or any platform supporting Next.js.

---

## Important Files

- **Backend:** [backend/app.py](../backend/app.py)
- **Frontend:** [frontend/app/components/PersonalityTest.js](app/components/PersonalityTest.js)

---

## License
 For Educational purose 