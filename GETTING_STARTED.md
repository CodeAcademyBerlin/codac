# Getting Started with codac 🚀

Welcome to codac! This guide will help you get started with contributing to the project, especially if you're new to open source development.

## 📋 Before You Begin

### What is codac?
codac is a learning management system and community platform for Code Academy Berlin students and alumni. It helps facilitate learning, collaboration, and community building.

### What You'll Need
- A computer with internet access
- Basic knowledge of Git (we'll help you learn!)
- Willingness to learn and ask questions

## 🛠 Setting Up Your Development Environment

### Step 1: Install Required Tools

1. **Install Node.js**
   - Go to [nodejs.org](https://nodejs.org/)
   - Download the LTS (Long Term Support) version
   - Follow the installation instructions for your operating system

2. **Install Git**
   - Go to [git-scm.com](https://git-scm.com/)
   - Download and install Git
   - Set up your Git username and email:
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```

3. **Install pnpm** (optional but recommended)
   ```bash
   npm install -g pnpm
   ```

### Step 2: Get the Code

1. **Fork the Repository**
   - Go to the [codac GitHub repository](https://github.com/code-academy-berlin/codac)
   - Click the "Fork" button in the top right corner
   - This creates your own copy of the project

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/codac.git
   cd codac
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   # or if you're using npm:
   npm install
   ```

### Step 3: Set Up Environment Variables

1. **Copy the example environment file**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit the environment file** (you can use any text editor)
   - Most settings can be left as defaults for development

### Step 4: Start the Development Server

```bash
pnpm dev
# or with npm:
npm run dev
```

Open your browser and go to `http://localhost:3000` - you should see codac running!

## 🗂 Understanding the Project Structure

```
codac/
├── README.md              # Project overview
├── CONTRIBUTING.md        # How to contribute
├── CODE_OF_CONDUCT.md     # Community guidelines
├── package.json           # Project dependencies and scripts
├── .gitignore            # Files to ignore in Git
└── src/                  # Source code (will be created)
    ├── components/       # Reusable UI components
    ├── pages/           # Next.js pages
    └── styles/          # CSS and styling
```

## 🤝 Making Your First Contribution

### Great First Contributions for Beginners

1. **Fix typos** in documentation
2. **Improve README** with clearer explanations
3. **Add comments** to code that needs explanation
4. **Report bugs** you find while testing
5. **Suggest improvements** to user experience

### The Contribution Process

1. **Find an issue to work on**
   - Look for issues labeled `good first issue`
   - Read the issue description carefully
   - Comment on the issue to let others know you're working on it

2. **Create a new branch**
   ```bash
   git checkout -b fix/issue-description
   # or
   git checkout -b feature/new-feature-name
   ```

3. **Make your changes**
   - Write clear, readable code
   - Add comments to explain complex parts
   - Test your changes

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Fix: brief description of what you fixed"
   ```

5. **Push to your fork**
   ```bash
   git push origin your-branch-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the pull request template
   - Wait for review and feedback

## 🧪 Testing Your Changes

Before submitting your contribution:

1. **Check for errors**
   ```bash
   pnpm lint
   ```

2. **Make sure the project builds**
   ```bash
   pnpm build
   ```

3. **Test in your browser**
   - Make sure your changes work as expected
   - Try different scenarios

## ❓ Getting Help

### Don't be afraid to ask questions!

- **GitHub Issues** - Create an issue with the `question` label
- **Pull Request Comments** - Ask for clarification on your PR
- **Community Discussions** - Join broader discussions

### Common Questions

**Q: I'm getting an error when installing dependencies**
A: Try deleting `node_modules` and `package-lock.json`, then run `pnpm install` again.

**Q: The development server won't start**
A: Check that you have Node.js 20+ installed and that port 3000 is available.

**Q: I don't understand the codebase**
A: That's normal! Start with small changes and ask questions. Everyone learns gradually.

**Q: My pull request was rejected**
A: Don't worry! Feedback is part of learning. Address the comments and try again.

## 🎉 Celebrating Your Contribution

When your pull request is merged:
- You'll be recognized as a contributor
- Your changes will help the entire community
- You'll have made your first open source contribution!

## 📚 Learning Resources

### Git and GitHub
- [GitHub's Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

### Web Development
- [MDN Web Docs](https://developer.mozilla.org/)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Tips for Success

1. **Start small** - Don't try to make huge changes initially
2. **Read the code** - Understanding how things work takes time
3. **Ask questions** - The community is here to help
4. **Be patient** - Learning takes time, and that's okay
5. **Have fun** - Enjoy the process of learning and contributing!

---

**Welcome to the codac community! We're excited to have you here! 🌟** 