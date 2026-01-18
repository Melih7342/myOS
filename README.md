# myOS

This project is an interactive web application designed to help users find the most suitable Linux distribution based on their specific needs and hardware.
It features a React-based frontend and a Flask backend with a weighted recommendation algorithm.

Prerequisites
Before starting the project, ensure the following software is installed on your system:

Python 3.10 or higher

Node.js (including npm)

Google Chrome (required only if you intend to run the web scraper)

Installation and Setup
Follow these steps to set up the project in a clean environment.

1. Clone the Repository
git clone https://github.com/Melih7342/myOS.git
cd myOS
2. Create and Activate a Virtual Environment
Using a virtual environment is highly recommended to avoid dependency conflicts and permission errors.

Windows (Command Prompt/PowerShell):

python -m venv venv
.\venv\Scripts\activate

Windows (Git Bash):

python -m venv venv
source ./venv/Scripts/activate

Linux / macOS:

python3 -m venv venv
source venv/bin/activate
3. Run the Project
The provided automation script handles Python dependency installation, Node.js package synchronization, database initialization, and server startup.

Windows:

python run_project.py

Linux / macOS:

python3 run_project.py

Project Architecture and Workflow
The application follows a structured data pipeline to ensure accuracy and performance:

Data Acquisition (backend/scraper.py): Extracts raw distribution data from DistroWatch.

Data Enrichment (backend/enrich_os_data.py): Locally adds attributes such as release cycles (Rolling Release) and UI design patterns (Modern vs. Classic) to the JSON data without redundant web requests.

Database Setup (backend/setup_db.py): Initializes the SQLite database and seeds it with the enriched data.

Recommendation Engine (backend/recommendation.py): A weighted algorithm that matches user input against the database.

Frontend (frontend/): A modern React application built with Vite and Tailwind CSS.

Technical Information for Evaluators
Recommendation Logic
The match score is calculated based on 12 different categories, including use case, hardware age, and desktop environment preferences.

Scores are weighted based on importance (e.g., Use Case is 20 points, Philosophy is 10 points).

Capping: The final match score is capped at a maximum of 100% to ensure a consistent user interface.

Knockout Criteria: Certain selections (like non-free software requirements) can set the score to 0 if criteria are not met.

Database Management
The application uses SQLite. To perform a complete "hard reset" of the data:

Stop the running servers.

Delete the backend/instance directory.

Restart the project using run_project.py. The script will automatically recreate the database and re-seed it from the os.json file.

Troubleshooting
Linux (Debian/Ubuntu/Mint): If the setup fails during the dependency phase, ensure that pip and venv are installed: sudo apt install python3-pip python3-venv

NPM Errors: Ensure Node.js is correctly installed. If npm is not found, install it via: sudo apt install nodejs npm

Ports: The backend uses port 3100 the frontend uses port 8080 ure these ports are not occupied by other services.