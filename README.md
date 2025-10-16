# 🌐 Personal Portfolio Website (Frontend)

A modern, responsive **personal portfolio website** built with **Next.js (App Router)**, designed to showcase projects, blogs, and personal information with excellent performance, SEO optimization, and dynamic data integration.  
The portfolio includes a private admin dashboard for managing blogs and portfolio items securely.

---

## 🚀 Live Demo

**Frontend (Live):** [https://b07-frontend3.vercel.app/](https://b07-frontend3.vercel.app/)  
**Backend Repository:** [https://github.com/imran-khan-dev/B07-backend](https://github.com/imran-khan-dev/B07-backend)

---

## 📖 Project Overview

This project is a **personal portfolio system** where the owner can manage blogs and portfolio items through a private dashboard.  
It follows modern web standards — built with **Next.js**, styled using **Tailwind CSS**, and powered by a secure backend built with **ExpressJS** and **Prisma**.

### 🔑 Core Features

#### 🧑‍💻 Public Features

- **Home / About Me Section** – Static details about the owner (name, contact, bio, skills).
- **Projects Showcase (ISR)** – Displays portfolio projects with title, description, features, and links.
- **Blog Page (ISR)** – Publicly accessible blog list and individual blog pages using Incremental Static Regeneration.
- **Dynamic SEO Tags** – Each blog and project page includes unique meta title, description, and Open Graph tags.
- **Responsive Design** – Fully responsive and optimized for all screen sizes.

#### 🔐 Private (Admin Only)

- **JWT Authentication** – Owner-only access to protected dashboard.
- **Dashboard Panel** – Create, update, and delete blogs and portfolio items.
- **Rich Text Editor** – Blog content editing with formatting options.
- **Secure Routes** – Protected pages and APIs using JWT token validation and Used Next js API proxy to securely use backend APIs.

#### 💡 Technical Enhancements

- ISR (Incremental Static Regeneration) for blogs and projects.
- Toast notifications (success & error states).
- Form validation with clear feedback.
- Global error boundary and 404 handling.

---

## 🧰 Tech Stack

### Frontend

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Hot Toast** – for notifications
- **React Hook Form / Zod** – for validation
- **uiw/react-md-editor** – Rich Text Editor

### Backend (API)

- **Express.js + TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT + bcrypt** for authentication
- \*\*Hosted separately → [Backend Repo](https://github.com/imran-khan-dev/B07-backend)

---

## ⚙️ Setup Instructions (Frontend)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/imran-khan-dev/B07-frontend
cd your-frontend-folder

### 2️⃣ Install dependencies
npm install

### 3️⃣ Configure environment variables

Create a .env.local file and add:

NEXT_PUBLIC_BASE_API=https://your-backend-deployment-url/api

### 4️⃣ Run the development server
npm run dev

Your app should now be running at http://localhost:3000

## Admin Credentials (for testing)

Please refer to the credentials provided in the submission (same as backend seed admin).

## Folder Structure
src/
 ┣ app/
 ┃ ┣ (public pages)
 ┃ ┣ dashboard/
 ┃ ┗ layout.tsx
 ┣ components/
 ┣ types/
 ┣ utils/
 ┗ styles/

## Additional Notes
This project uses Incremental Static Regeneration (ISR) for blog and portfolio pages.
The backend API handles all CRUD operations and authentication logic.
Admin user is seeded in the backend during setup.
The website is fully responsive, SEO-friendly, and accessibility-compliant.

## Submission Summary
| Requirement                    | Status        |
| ------------------------------ | ------------- |
| Authentication & Authorization | ✅ Implemented |
| Blog Management                | ✅ CRUD + ISR  |
| About Me Section               | ✅ SSG         |
| Project Showcase               | ✅ CRUD + ISR  |
| Dashboard                      | ✅ Owner Only  |
| SEO Optimization               | ✅ Implemented |
| Validation & Error Handling    | ✅ Done        |
| Live Deployment                | ✅ Done        |
| README + GitHub + Demo Video   | ✅ Included    |
```
