# Agri-Bot System

Welcome to the Agri-Bot System repository! This structure has been properly set up for you to continue development across multiple devices.

## Repository Structure

- `backend/` - Contains the server-side code (e.g., Python FastAPI/Flask, database connections).
- `frontend/` - Contains the client-side user interface code (e.g., React, HTML/CSS/JS).
- `models/` - Store your model scripts and YOLOv9 configurations here. Large model weights (`.pt`) are ignored by default.
- `data/` - Put your datasets here. This entire directory is ignored by Git, so your heavy dataset files won't be pushed.
- `notebooks/` - Jupyter notebooks for running experiments or dataset conversions.

## Getting Started with Git

1. **Move your files**: Move your existing frontend, backend, or dataset processing scripts into the corresponding folders above.
2. **Commit your work**:
   ```bash
   git add .
   git commit -m "Initial project structure setup"
   ```
3. **Push to a remote repository (like GitHub)**:
   - Go to GitHub and create a new repository called `agri-bot-system`.
   - Copy the repository URL.
   - Run the following terminal commands:
   ```bash
   git branch -M main
   git remote add origin YOUR_GITHUB_REPOSITORY_URL
   git push -u origin main
   ```

## Note on `.gitignore`
We have pre-configured `.gitignore`. It naturally ignores Python caches, `node_modules`, `runs/` (YOLO outputs), large datasets, model weights (`.pt`), and environment variables (`.env`).
