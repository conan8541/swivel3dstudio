# Git Repository Setup Cheat Sheet

### For swivel3dstudio (or any project) – March 2025

*From local folder to GitHub, step-by-step with commands*

#### 1. Check Git Setup

Confirm Git’s installed and you’re logged into GitHub.
- **Command:** `git --version`
- *Expect:* Version number (e.g., “git version 2.39.2”).

#### 2. Verify Repo Status  
See if your folder’s already a Git repo.  
- **Command:** `git status`  
- *If “not a Git repository”*: Move to init.  
- *If files listed*: Skip to staging.

#### 3. Initialize the Repo  
Turn your folder into a Git repo (or reinitialize if broken).  
- **Command:** `git init`  
- *Output:* “Initialized…” or “Reinitialized existing Git repository in [path]/.git/”.

#### 4. Stage Files
Add all project files to track (ignores `.gitignore` stuff like `node_modules`).
- **Command:** `git add .`
- *Check:* `git status` (shows “Changes to be committed”).

#### 5. Configure Git Identity
Set your name/email for commits (run once globally).
- **Commands:**