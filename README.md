# 🚀 Resumind – AI Resume Analyzer

Resumind is an AI-powered resume analysis platform that helps job seekers improve their resumes for Applicant Tracking Systems (ATS). Upload your resume, receive an AI-generated evaluation, ATS score, and actionable suggestions to increase your chances of landing interviews.

## 🌐 Live Demo

🔗 **Deployed App:** https://ai-resume-analyzer-l6pxwe8ub-nitinrathore56654-9176s-projects.vercel.app

---

## ✨ Features

- 📄 Upload PDF resumes
- 🤖 AI-powered resume analysis
- 📊 ATS compatibility scoring
- 💡 Personalized improvement suggestions
- 📝 Resume structure and content evaluation
- 🎯 Job-specific resume feedback
- 🖼️ Resume preview
- 🔐 Secure authentication with Puter
- ☁️ Cloud file storage using Puter FS

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router v7
- TypeScript
- Tailwind CSS
- Vite

### AI & Backend Services

- Puter.js
- Puter AI
- Puter File System (FS)
- Puter KV Storage

### PDF Processing

- PDF.js
- React Dropzone

---

## 📸 Screenshots

### Home Page

<img width="1920" height="900" alt="Screenshot (1848)" src="https://github.com/user-attachments/assets/9cf19f59-a350-44ca-9c69-4a466a0fb674" />


### Upload Resume

<img width="938" height="909" alt="Screenshot (1849)" src="https://github.com/user-attachments/assets/01cbc55e-900a-46eb-bc0e-ffad20f0cf2e" />


### Resume Analysis

<img width="1920" height="898" alt="Screenshot (1851)" src="https://github.com/user-attachments/assets/1e8bb97b-e700-49ea-9b6f-6bd789186c96" />

<img width="1920" height="900" alt="Screenshot (1852)" src="https://github.com/user-attachments/assets/0f674329-13a6-44d3-93b9-4d8ceef440da" />


---

## 📂 Project Structure

```text
app/
│
├── components/
│   ├── ATS.tsx
│   ├── Details.tsx
│   ├── FileUploader.tsx
│   ├── Navbar.tsx
│   ├── ScoreBadge.tsx
│   ├── ScoreGauge.tsx
│   └── Summary.tsx
│
├── routes/
│   ├── home.tsx
│   ├── upload.tsx
│   ├── resume.tsx
│   └── auth.tsx
│
├── lib/
│   ├── puter.ts
│   ├── pdf2image.ts
│   └── utils.ts
│
├── constants/
└── types/
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/tech-nitin/ai-resume-analyzer.git
```

Navigate into the project

```bash
cd ai-resume-analyzer
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will run at

```
http://localhost:5173
```

---

## 🚀 Build for Production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## 🎯 How It Works

1. Sign in using Puter Authentication.
2. Upload a PDF resume.
3. Convert the first page into an image.
4. Upload the resume and preview image to Puter File System.
5. Send the resume to the AI model for analysis.
6. Receive:
   - Overall Resume Score
   - ATS Score
   - Content Review
   - Structure Review
   - Skills Evaluation
   - Tone & Style Feedback
7. View detailed suggestions for improvement.

---

## 📦 Dependencies

- React Router
- React Dropzone
- PDF.js
- Tailwind CSS
- TypeScript
- Puter SDK

---

## 🔮 Future Improvements

- Resume keyword optimization
- Multiple resume templates
- Download AI-improved resume
- Interview question generator
- Cover letter generator
- Resume comparison
- Multi-language support

---

## 👨‍💻 Author

**Nitin Rathore**

- GitHub: https://github.com/tech-nitin
- LinkedIn: www.linkedin.com/in/nitin-rathore-a464b8380

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
