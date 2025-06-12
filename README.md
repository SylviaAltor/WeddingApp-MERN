# LoveMapped 💍
![In Progress](https://img.shields.io/badge/status-In_Progress-yellow?style=flat-square)

_Interactive Wedding Website for Couples and Guests_  
**Status**: 🚧 In Progress — Currently implementing Epic 4 

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
- Frontend: GitHub Actions *(completed)* → Vercel *(planned)*
- Backend: Jenkins *(completed)* → Docker Hub *(planned)* → Render/Fly.io *(planned)*

---

## 🚧 Development Progress

- ✅ **Epic 1**: Wedding Subsite Landing and Login Authentication (completed)
  - Frontend: Subdomain routing and landing page UI built with React
  - Authentication: Guest login via invite code & Admin login via password
  - Security: JWT-based session authentication implemented using Express.js & MongoDB
- ✅ **Epic 2**: Guest RSVP & Preferences (completed)
  - Frontend: GuestWelcomePage post-login, styled with Bootstrap
  - Forms & Data Handling: RSVP form built with React Hook Form, supporting CR**U**D operations
  - Backend: RESTful API connecting frontend with MongoDB database
- ✅ **Epic 3**: Admin Dashboard & Guest Management (completed)
  - Frontend: Modularized components including AdminManagePage, AddGuestForm, GuestForm, and email invitation integration
  - Backend: RESTful APIs for guest creation, full guest info retrieval, and RSVP management; Redis caching integrated to optimize invite and RSVP data
  - Features: Nodemailer email invitation system with Gmail setup for automated, customized invites; real-time RSVP status and dietary preference tracking
- 🔄 **Epic 4**: Guest Location & Interactive Map Integration (in progress)
- 🔜 Epic 5: Photo Wall 

Currently, development is focused on a specific couple's subdomain (e.g., /Sylvia&Voke).
