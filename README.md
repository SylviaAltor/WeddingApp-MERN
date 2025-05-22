# LoveMapped 💍
![In Progress](https://img.shields.io/badge/status-In_Progress-yellow?style=flat-square)

_Interactive Wedding Website for Couples and Guests_  
**Status**: 🚧 In Progress — Currently implementing Epic 1 CI/CD 

## 🧠 Overview

LoveMapped is a full-stack web application enabling couples to create custom wedding websites where guests can RSVP, view event information, upload photos, and interact through map-based features.

Each couple gets a personalized subdomain like `lovemapped.com/Sylvia&Voke`.

In current project, I am developing the certain subdomain.

---

## ✨ Features (MVP)

- **Admin Authentication** via password  
- **Guest Authentication** via invite code  
- **Admin Dashboard** for RSVP tracking and guest management *(planned)*
- **Map-Based Interaction** (Leaflet.js) *(planned)*
- **Shared Photo Wall** for guests and admin *(planned)*
- **Email Invitations** with unique codes *(planned)*

---

## 🛠 Tech Stack

**Frontend**  
- React.js + Bootstrap 5  
- React Router  
- Axios  
- Leaflet.js *(planned)*

**Backend**  
- Node.js + Express.js  
- MongoDB Atlas
- JWT for Auth  
- Multer for image upload *(planned)*
- Nodemailer for emails *(planned)*

**CI/CD**  
- Frontend: GitHub Actions → Vercel *(planned)*
- Backend: Jenkins → Docker Hub → Render/Fly.io *(planned)*

---

## 🚧 Development Progress

- ✅ **Epic 1**: Wedding Subsite Landing and Login Authentication (completed, currently on CI/CD)
  - Guest login via invite code
  - Admin login via password
  - JWT-based session authentication
  - Subdomain routing and landing page UI
- 🔄 **Epic 2**: Guest RSVP & Preferences (in progress)  
- 🔜 Epic 3: Admin Dashboard & Guest Management  
- 🔜 Epic 4: Photo Wall  

Currently, development is focused on a specific couple's subdomain (e.g., /Sylvia&Voke).
