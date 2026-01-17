import json
import os

rolling_release_os = ["Arch", "Manjaro", "Endeavour", "openSUSE", "Solus", "Void"]
classic_design_os = ["Mint", "Zorin", "Kubuntu", "MX Linux", "Deepin", "Lite"]
modern_design_os = ["elementary", "Ubuntu", "Pop!_OS", "Fedora"]
proprietary_friendly_os = ["Ubuntu", "Pop!_OS", "Manjaro", "Zorin", "Mint"]


def enrich_data():
    # Ensure we are looking in the backend folder
    file_path = 'os.json'

    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        distros = json.load(f)

    print(f"--- Enriching {len(distros)} entries ---")

    true_counts = {"rolling": 0, "classic": 0}

    for distro in distros:
        name = distro.get("name", "")

        distro["rolling_release"] = any(x.lower() in name.lower() for x in rolling_release_os)
        distro["classic_design"] = any(x.lower() in name.lower() for x in classic_design_os)
        distro["modern_design"] = any(x.lower() in name.lower() for x in modern_design_os)
        distro["proprietary_friendly"] = any(x.lower() in name.lower() for x in proprietary_friendly_os)

        if distro["rolling_release"]: true_counts["rolling"] += 1
        if distro["classic_design"]: true_counts["classic"] += 1

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(distros, f, ensure_ascii=False, indent=4)

    print(f"Enriched: Found {true_counts['rolling']} Rolling and {true_counts['classic']} Classic distros.")


if __name__ == "__main__":
    enrich_data()