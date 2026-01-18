# myOS

This application provides an interactive quiz to help users find the ideal Linux distribution based on a weighted matching algorithm.


### Prerequisites
Ensure the following are installed:

 -Python 3.10+

 -Node.js & npm


### Installation and Execution

Follow these steps to set up the project in a clean environment:

**1. Setup Virtual Environment**

Windows (PowerShell/CMD):

 python -m venv venv

.\venv\Scripts\activate

Linux / macOS:

  python3 -m venv venv
  source venv/bin/activate

**2. Launch the Application**
The automation script installs dependencies (Python & Node), initializes the database, and starts the servers.

Windows:

python run_project.py

Linux / macOS:

python3 run_project.py


## Key Features:
 -Data Pipeline: Scrapes data from DistroWatch and enriches it locally with UI and release-cycle attributes.

 -Matching Logic: A weighted algorithm evaluates 12 categories. Match scores are normalized and capped at 100%.

 -Database: Uses SQLite. To reset the database, delete the backend/instance folder and restart the application.
