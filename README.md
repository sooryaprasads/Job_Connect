# JobConnect - Job Portal Application Tracking System

JobConnect is a job portal and applicant tracking system built with React and Vite, focusing on connecting employers and job seekers.

## 🌟 Features

### For Employers
- Post and manage job listings
- Review job applications
- Track shortlisted candidates
- Company profile management
- View application statistics

### For Candidates
- Browse and search job listings
- Apply to jobs with resume upload
- Track application status
- Create and manage profiles
- Save jobs and set job alerts
- Resume management

## 🛠️ Technologies Used

- **Frontend Framework**: React 19.1.0 (Vite)
- **Routing**: React Router DOM 7.6.0
- **UI Components**: 
  - Lucide React (icons)
  - React CountUp
- **Styling**: Tailwind CSS with Forms plugin
- **Token Handling**: jwt-decode
- **Drag and Drop**: @hello-pangea/dnd

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- npm (v6.0.0 or later)


## 🚀 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**


```shellscript
git clone https://github.com/sooryaprasads/Job_Connect.git
cd JobConnect
```

2. **Install dependencies**


```shellscript
# Install core dependencies
npm install react-router-dom jwt-decode lucide-react

# Install Tailwind CSS and UI dependencies
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms tailwindcss-animate

# Install development dependencies
npm install -D @vitejs/plugin-react
```

3. **Initialize Tailwind CSS**


```shellscript
npx tailwindcss init -p
```

4. **Configure Tailwind CSS**


Update the `tailwind.config.js` file with the content provided in the project.

5. **Start the development server**


```shellscript
npm run dev
```

The application should now be running at `http://localhost:5173`.


## 📝 Usage

### Demo Accounts

Use these demo accounts to test different roles:

**Employer Account**
- Email: employer@example.com
- Password: any password will work

**Candidate Account**
- Email: candidate@example.com
- Password: any password will work

### Key Features by Role

#### Employers Can:
- Post new job openings
- Review applications
- Shortlist candidates
- Set up resume alerts
- View candidate profiles
- Track hiring metrics

#### Candidates Can:
- Browse available jobs
- Submit applications
- Upload and manage resumes
- Track application status
- Set up job alerts
- Maintain professional profile

## 📁 Project Structure
```
job_connect/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── job/
│   │   ├── layout/
│   │   └── notifications/
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── JobContext.jsx
│   │   └── NotificationContext.jsx
│   ├──data/
│   │    └── mockData.js
│   ├── pages/
│   │   ├── candidate/
│   │   ├── employer/
│   │   ├── common/
|   |   └──[public pages]
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Current Features

✅ User authentication with role-based access
✅ Job posting and management
✅ Application tracking
✅ Resume management
✅ Candidate shortlisting
✅ Company profiles
✅ Job alerts
✅ Responsive design

## Planned Enhancements

- [ ] Real backend integration
- [ ] Advanced search filters
- [ ] Email notifications
- [ ] Resume parsing
- [ ] Interview scheduling
- [ ] Analytics dashboard
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## 📬 Contact

Project Link: [https://github.com/sooryaprasads/Job_Connect](https://github.com/sooryaprasads/Job_Connect)

Demo Link: [https://job-connect-one.vercel.app/](https://job-connect-one.vercel.app/)