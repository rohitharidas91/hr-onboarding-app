# HR Onboarding App - Atomic Development Blueprint

## 🎯 Project Overview
Build a complete HR onboarding application that tracks employee onboarding journeys from start to finish.

**Stack:**
- Frontend: Next.js 14+ (App Router), React 18+
- Styling: CSS Modules
- Database: MongoDB Atlas
- Deployment: Vercel
- Version Control: GitHub

---

## 📋 Table of Contents
1. [Phase 0: Pre-Development Setup](#phase-0)
2. [Phase 1: Project Foundation](#phase-1)
3. [Phase 2: Database & Models](#phase-2)
4. [Phase 3: Authentication](#phase-3)
5. [Phase 4: Core Features](#phase-4)
6. [Phase 5: Advanced Features](#phase-5)
7. [Phase 6: Polish & Optimization](#phase-6)
8. [Phase 7: Deployment](#phase-7)

---

## <a name="phase-0"></a>Phase 0: Pre-Development Setup (Day 0)

### Milestone 0.1: Development Environment
- [x] Install Node.js (v18.17+ or v20+)
  - Download from nodejs.org
  - Verify: `node --version` and `npm --version`
- [x] Install VS Code (or preferred IDE)
- [x] Install Git
  - Verify: `git --version`
  - Configure: 
    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "your.email@example.com"
    ```

### Milestone 0.2: MongoDB Atlas Account
- [x] Go to mongodb.com/cloud/atlas
- [ ] Sign up for free account
- [ ] Create new organization (e.g., "My Projects")
- [ ] Create new project (e.g., "HR Onboarding")
- [ ] Keep tab open - you'll need this in Phase 2

### Milestone 0.3: GitHub Repository
- [ ] Go to github.com
- [ ] Click "New Repository"
- [ ] Name: `hr-onboarding-app`
- [ ] Description: "Employee onboarding tracking system"
- [ ] Set to Private
- [ ] Do NOT initialize with README (we'll do this locally)
- [ ] Create repository
- [ ] Copy the repository URL (https://github.com/yourusername/hr-onboarding-app.git)

### Milestone 0.4: Vercel Account
- [ ] Go to vercel.com
- [ ] Sign up with GitHub account
- [ ] Connect GitHub account
- [ ] Keep tab open - you'll need this in Phase 7

**✅ Checkpoint:** You have Node.js, Git, MongoDB account, GitHub repo, and Vercel account ready.

---

## <a name="phase-1"></a>Phase 1: Project Foundation (Day 1)

### Milestone 1.1: Create Next.js Project
Open terminal/command prompt:

```bash
# Navigate to where you want to create project
cd ~/Documents/projects

# Create Next.js app
npx create-next-app@latest hr-onboarding-app
```

When prompted, choose:
- ✅ TypeScript? → **No** (for simplicity, or Yes if comfortable)
- ✅ ESLint? → **Yes**
- ✅ Tailwind CSS? → **No** (we're using CSS Modules)
- ✅ `src/` directory? → **Yes**
- ✅ App Router? → **Yes**
- ✅ Import alias? → **No** (or default @/*)

```bash
# Navigate into project
cd hr-onboarding-app

# Open in VS Code
code .
```

**✅ Checkpoint:** Project created, VS Code open with project files visible.

### Milestone 1.2: Understand Project Structure
Your project should have:
```
hr-onboarding-app/
├── src/
│   └── app/
│       ├── layout.js
│       └── page.js
├── public/
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

- [ ] Open `package.json` - see dependencies
- [ ] Open `src/app/page.js` - this is your home page
- [ ] Open `src/app/layout.js` - this wraps all pages

### Milestone 1.3: Run Development Server
In terminal (in VS Code: Terminal → New Terminal):

```bash
npm run dev
```

- [ ] Server starts on http://localhost:3000
- [ ] Open browser to http://localhost:3000
- [ ] See default Next.js page
- [ ] Keep server running in this terminal

**✅ Checkpoint:** Development server running, Next.js welcome page visible.

### Milestone 1.4: Create Folder Structure

Create these folders in `src/`:

```bash
# In VS Code terminal:
mkdir src/components
mkdir src/styles
mkdir src/lib
mkdir src/models
mkdir src/utils
```

Your structure should now be:
```
src/
├── app/
├── components/
├── styles/
├── lib/
├── models/
└── utils/
```

- [ ] Verify all folders exist in VS Code file explorer

### Milestone 1.5: Initial Git Commit

```bash
# Initialize git (if not already done)
git init

# Check what files will be committed
git status

# Add all files
git add .

# Make first commit
git commit -m "Initial Next.js setup"

# Add remote repository (use YOUR GitHub URL)
git remote add origin https://github.com/yourusername/hr-onboarding-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

- [ ] Refresh your GitHub repository page
- [ ] See all files now on GitHub

**✅ Checkpoint:** Clean folder structure, first commit pushed to GitHub.

### Milestone 1.6: Install Core Dependencies

```bash
npm install mongodb
npm install bcryptjs
npm install jsonwebtoken
npm install next-auth
```

- [ ] Wait for installation to complete
- [ ] Check `package.json` - see new dependencies

### Milestone 1.7: Create Environment Variables File

```bash
# Create .env.local file
touch .env.local
```

Open `.env.local` and add (leave values empty for now):

```env
# MongoDB
MONGODB_URI=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# App
NODE_ENV=development
```

- [ ] Verify `.env.local` is in `.gitignore` (it should be by default)

**✅ Checkpoint:** All dependencies installed, environment file ready.

### Milestone 1.8: Commit Progress

```bash
git add .
git commit -m "Add dependencies and environment setup"
git push
```

**🎉 PHASE 1 COMPLETE!** You have a working Next.js project with proper structure.

---

## <a name="phase-2"></a>Phase 2: Database & Models (Day 2)

### Milestone 2.1: Setup MongoDB Atlas

Back to your MongoDB Atlas tab:

- [ ] Click "Build a Database"
- [ ] Choose "M0 Free" tier
- [ ] Select cloud provider (AWS recommended)
- [ ] Choose region closest to you
- [ ] Name cluster: `hr-onboarding-cluster`
- [ ] Click "Create"
- [ ] Wait 3-5 minutes for cluster creation

### Milestone 2.2: Configure Database Access

- [ ] Click "Database Access" in left sidebar
- [ ] Click "Add New Database User"
- [ ] Choose "Password" authentication
- [ ] Username: `hradmin`
- [ ] Click "Autogenerate Secure Password"
- [ ] **COPY AND SAVE THIS PASSWORD SECURELY**
- [ ] Database User Privileges: "Read and write to any database"
- [ ] Click "Add User"

### Milestone 2.3: Configure Network Access

- [ ] Click "Network Access" in left sidebar
- [ ] Click "Add IP Address"
- [ ] Click "Allow Access from Anywhere" (for development)
- [ ] Click "Confirm"
- [ ] Wait for status to become "Active"

### Milestone 2.4: Get Connection String

- [ ] Click "Database" in left sidebar
- [ ] Click "Connect" button on your cluster
- [ ] Choose "Connect your application"
- [ ] Driver: Node.js, Version: 5.5 or later
- [ ] Copy the connection string
- [ ] It looks like: `mongodb+srv://hradmin:<password>@hr-onboarding-cluster...`

### Milestone 2.5: Add Connection String to Environment

Open `.env.local`:

```env
MONGODB_URI=mongodb+srv://hradmin:YOUR_PASSWORD_HERE@hr-onboarding-cluster.xxxxx.mongodb.net/hr_onboarding?retryWrites=true&w=majority
```

- [ ] Replace `YOUR_PASSWORD_HERE` with the password you saved
- [ ] Replace `xxxxx` with your actual cluster domain
- [ ] Add database name: `hr_onboarding` (after .net/)

**✅ Checkpoint:** MongoDB Atlas configured, connection string in environment.

### Milestone 2.6: Create Database Connection Utility

Create `src/lib/mongodb.js`:

```javascript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

- [ ] Save file
- [ ] No errors should appear

### Milestone 2.7: Test Database Connection

Create `src/app/api/test-db/route.js`:

```javascript
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('hr_onboarding');
    
    // Test the connection
    await db.command({ ping: 1 });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully!' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

- [ ] Save file
- [ ] Go to http://localhost:3000/api/test-db
- [ ] Should see: `{"success":true,"message":"Database connected successfully!"}`

**✅ Checkpoint:** Database connected and working!

### Milestone 2.8: Define Database Schema

Create `src/models/schemas.js`:

```javascript
/**
 * Database Schema Definitions
 * These are documentation - MongoDB is schemaless, but this helps us stay consistent
 */

export const EmployeeSchema = {
  _id: 'ObjectId',
  firstName: 'string',
  lastName: 'string',
  email: 'string (unique)',
  department: 'string',
  position: 'string',
  startDate: 'Date',
  status: 'string (pending, in-progress, completed)',
  manager: 'string',
  phone: 'string',
  avatar: 'string (URL)',
  createdAt: 'Date',
  updatedAt: 'Date'
};

export const TaskSchema = {
  _id: 'ObjectId',
  employeeId: 'ObjectId (reference to Employee)',
  title: 'string',
  description: 'string',
  category: 'string (documents, training, equipment, access)',
  status: 'string (pending, in-progress, completed)',
  dueDate: 'Date',
  completedDate: 'Date',
  priority: 'string (low, medium, high)',
  assignedTo: 'string',
  notes: 'string',
  createdAt: 'Date',
  updatedAt: 'Date'
};

export const UserSchema = {
  _id: 'ObjectId',
  name: 'string',
  email: 'string (unique)',
  password: 'string (hashed)',
  role: 'string (admin, manager, employee)',
  createdAt: 'Date',
  updatedAt: 'Date'
};
```

- [ ] Save file - this is just documentation for now

### Milestone 2.9: Create Database Helper Functions

Create `src/lib/db-helpers.js`:

```javascript
import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = 'hr_onboarding';

// Get database instance
export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

// Get collection
export async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}

// Convert string to ObjectId
export function toObjectId(id) {
  return new ObjectId(id);
}

// Format document for response (convert _id to string)
export function formatDocument(doc) {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
  };
}

// Format multiple documents
export function formatDocuments(docs) {
  return docs.map(formatDocument);
}
```

- [ ] Save file

**✅ Checkpoint:** Database models and helpers ready!

### Milestone 2.10: Commit Database Setup

```bash
git add .
git commit -m "Setup MongoDB connection and database models"
git push
```

**🎉 PHASE 2 COMPLETE!** Database is connected and ready to use.

---

## <a name="phase-3"></a>Phase 3: Authentication (Day 3)

### Milestone 3.1: Generate NextAuth Secret

In terminal:

```bash
# Generate a random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- [ ] Copy the generated string
- [ ] Add to `.env.local`:

```env
NEXTAUTH_SECRET=paste_generated_string_here
```

### Milestone 3.2: Create NextAuth Configuration

Create `src/app/api/auth/[...nextauth]/route.js`:

```javascript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCollection } from '@/lib/db-helpers';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        const users = await getCollection('users');
        const user = await users.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

- [ ] Save file

### Milestone 3.3: Create Initial Admin User API

Create `src/app/api/setup/route.js`:

```javascript
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db-helpers';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const users = await getCollection('users');
    
    // Check if admin exists
    const existingAdmin = await users.findOne({ role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json({ 
        error: 'Admin user already exists' 
      }, { status: 400 });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const result = await users.insertOne({
      name: 'Admin User',
      email: 'admin@company.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'Admin user created',
      email: 'admin@company.com',
      password: 'admin123'
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
```

### Milestone 3.4: Create First Admin User

- [ ] Go to http://localhost:3000/api/setup
- [ ] Click POST (or use Postman/Thunder Client)
- [ ] Or create a simple test page to call it

Create `src/app/setup/page.js`:

```javascript
'use client';
import { useState } from 'react';

export default function SetupPage() {
  const [result, setResult] = useState(null);

  const createAdmin = async () => {
    const res = await fetch('/api/setup', { method: 'POST' });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Setup Admin User</h1>
      <button onClick={createAdmin}>Create Admin</button>
      {result && (
        <pre style={{ marginTop: '20px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
```

- [ ] Go to http://localhost:3000/setup
- [ ] Click "Create Admin"
- [ ] Should see success message with credentials

**✅ Checkpoint:** Authentication configured, admin user created.

### Milestone 3.5: Create Login Page

Create `src/app/login/page.js`:

```javascript
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>HR Onboarding</h1>
        <h2 className={styles.subtitle}>Sign In</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@company.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

Create `src/app/login/login.module.css`:

```css
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.loginBox {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.title {
  margin: 0 0 5px 0;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.subtitle {
  margin: 0 0 30px 0;
  font-size: 18px;
  color: #666;
  text-align: center;
  font-weight: normal;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.inputGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.inputGroup label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.inputGroup input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.inputGroup input:focus {
  outline: none;
  border-color: #667eea;
}

.submitButton {
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.submitButton:hover {
  background: #5568d3;
}

.submitButton:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  padding: 12px;
  background: #fee;
  color: #c33;
  border-radius: 5px;
  font-size: 14px;
}
```

- [ ] Save both files
- [ ] Go to http://localhost:3000/login
- [ ] See styled login page

**✅ Checkpoint:** Login page created and styled.

### Milestone 3.6: Test Authentication

- [ ] Go to http://localhost:3000/login
- [ ] Enter email: `admin@company.com`
- [ ] Enter password: `admin123`
- [ ] Click Sign In
- [ ] Should redirect (even if page doesn't exist yet)

### Milestone 3.7: Create Session Provider

Update `src/app/layout.js`:

```javascript
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HR Onboarding App',
  description: 'Track employee onboarding journey',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

Create `src/components/SessionProvider.js`:

```javascript
'use client';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export default function SessionProvider({ children }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
```

- [ ] Save files

**✅ Checkpoint:** Authentication fully working!

### Milestone 3.8: Commit Authentication

```bash
git add .
git commit -m "Add authentication with NextAuth"
git push
```

**🎉 PHASE 3 COMPLETE!** Users can now log in securely.

---

## <a name="phase-4"></a>Phase 4: Core Features (Days 4-6)

### Milestone 4.1: Create Dashboard Layout

Create `src/app/dashboard/layout.js`:

```javascript
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import styles from './dashboard.module.css';

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar user={session.user} />
      <div className={styles.mainContent}>
        <Header user={session.user} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
```

Create `src/app/dashboard/dashboard.module.css`:

```css
.dashboardLayout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.mainContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 250px;
}

.content {
  flex: 1;
  padding: 30px;
}

@media (max-width: 768px) {
  .mainContent {
    margin-left: 0;
  }
}
```

### Milestone 4.2: Create Sidebar Component

Create `src/components/Sidebar.js`:

```javascript
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar({ user }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/employees', label: 'Employees', icon: '👥' },
    { href: '/dashboard/tasks', label: 'Tasks', icon: '✓' },
    { href: '/dashboard/reports', label: 'Reports', icon: '📈' },
  ];

  if (user.role === 'admin') {
    menuItems.push({ href: '/dashboard/settings', label: 'Settings', icon: '⚙️' });
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>HR Onboarding</h2>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.user}>
        <div className={styles.userAvatar}>{user.name[0]}</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userRole}>{user.role}</div>
        </div>
      </div>
    </aside>
  );
}
```

Create `src/components/Sidebar.module.css`:

```css
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.logo {
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.nav {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
}

.navItem {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  gap: 12px;
}

.navItem:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.navItem.active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-left: 3px solid #3498db;
}

.icon {
  font-size: 20px;
  width: 24px;
}

.user {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
}

.userAvatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3498db;
  display: flex;
  align-items: center;
  justify-content