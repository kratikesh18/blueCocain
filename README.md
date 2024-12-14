# blueCocain: A Lyrics Library 🎶

**blueCocain** is a dynamic and user-friendly platform that allows users to explore, manage, and enjoy song lyrics. With features like artist profiles, album management, and AI-generated content, this project redefines how we interact with music metadata.

## 🚀 Features

- **Lyrics Library**: Search and display lyrics from various songs.
- **Artist Profiles**: View detailed profiles of artists, including AI-generated bios.
- **Album Management**: Add and manage albums with album art, genre, release dates, and more.
- **User Authentication**: Secure login and registration using NextAuth.
- **Responsive Design**: Sleek, mobile-friendly interface styled with Tailwind CSS.
- **Advanced Search**: Quickly find songs, albums, or artists.
- **AI Integration**: Automatically generate artist bios for new profiles.

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js**: Server-side rendering and static site generation.
- **React**: Dynamic and responsive user interface.
- **Tailwind CSS**: Clean and customizable styling.

### Backend:
- **Node.js**: Scalable server-side environment.
- **MongoDB**: NoSQL database for fast and flexible data handling.
- **NextAuth**: Authentication for secure user login.

### Tools:
- **TypeScript**: Type-safe development.
- **Axios**: Simplified HTTP requests for API integration.
- **Zod**: Form validation and schema definitions.az4
---

## 🌟 Getting Started

### Prerequisites
- **Node.js**: v16+ recommended.
- **MongoDB**: Local or cloud instance.
- **npm**: (or **yarn**) for dependency management.


### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bluecocain.git
   cd bluecocain
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file and add the following:
     ```
     MONGODB_URI=<your-mongodb-uri>
     NEXTAUTH_SECRET=<your-secret>
     AI_API_KEY=<optional-for-ai-bio>
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Visit the app at:
   ```
   http://localhost:3000
   ```

---

## 🧩 Folder Structure
```
bluecocain/
├── components/       # Reusable UI components
├── pages/            # Next.js pages (routes)
├── styles/           # Tailwind CSS styles
├── utils/            # Helper functions and constants
├── models/           # MongoDB schema definitions
├── public/           # Static assets (images, icons, etc.)
├── api/              # Backend API endpoints
```

---

## 🌐 Live Demo

Check out the live application here: **[blueCocain Demo](https://bluecocain.vercel.app/)**

---

## 🤝 Contribution

We welcome contributions from the community! To contribute:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a clear description of your changes.

---

## 💌 Contact

For any questions or feedback, reach out at **im.kartikesh18@gmail.com** or connect on [LinkedIn](https://linkedin.com/in/kartikeshpachkawade).

---

### Made with ❤️ by Kartikesh
