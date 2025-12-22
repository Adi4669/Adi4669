<<<<<<< HEAD
## Hi there 👋

<!--
**Adi4669/Adi4669** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
=======
# Blood Donation Backend

Express + MongoDB backend for the Blood Donation project.

## Setup
- Install Node.js 18+
- Copy `.env.example` to `.env` and adjust values.

## Quick Start
```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:4000` by default.

## Environment
- `PORT`: API port
- `MONGODB_URI`: Mongo connection string
- `JWT_SECRET`: JWT signing secret

## Endpoints
- GET `/api/health` — health check

### Auth (`/api/auth`)
- POST `/signup` — name, email, password, bloodType?, phone?, location?
- POST `/login` — email, password
- POST `/logout`
- GET `/me` — current user

### Donations (`/api/donations`)
- POST `/` — create donation (auth)
- GET `/` — list donations with `bloodType`, `location`, `available`
- GET `/mine` — list current user's donations (auth)
- PATCH `/:id` — update own donation (auth)
- DELETE `/:id` — delete own donation (auth)

### Requests (`/api/requests`)
- POST `/` — create request (auth)
- GET `/` — list with `bloodType`, `location`, `fulfilled`
- GET `/mine` — list current user's requests (auth)
- PATCH `/:id` — update own request (auth)
- DELETE `/:id` — delete own request (auth)

## Integrating Frontend
- Point form `action`s or fetch calls to these endpoints.
- Ensure cookies are sent (`credentials: 'include'`) for auth.
>>>>>>> 637f92d (backend code)
