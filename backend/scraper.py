from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

# Function to create a browser and get access to distrowatch
def create_browser():
    # Browser-options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")

    # Start browser
    driver = webdriver.Chrome(options=chrome_options)

    return driver

beginner_friendly_os = [
    "Linux Mint",
    "Ubuntu",
    "Zorin OS",
    "Pop!_OS",
    "MX Linux",
    "elementary OS",
    "Linux Lite",
    "Manjaro Linux",
    "Kubuntu",
    "EndeavourOS"
]

table_features = ["Price (US$)", "Image Size (MB)"]

# --- Part 1: Scrape os-name and detail-URL ---
os_names_url = "https://distrowatch.com/search.php?ostype=Linux&category=All&origin=All&basedon=All&notbasedon=None&desktop=All&architecture=All&package=All&rolling=All&isosize=All&netinstall=All&language=All&defaultinit=All&status=Active#simpleresults"
browser = create_browser()
browser.get(os_names_url)

# Waiting time for scripts to load
time.sleep(2)

# Give the loaded html code to our soup
soup = BeautifulSoup(browser.page_source, "html.parser")

os_list = []
cells = soup.select("td.NewsText b a")

# Add the os-names and urls to the os_list
for cell in cells:
    name = cell.get_text(strip=True)
    href = cell.get('href')  # href is e.g. 'table.php?distribution=cachyos'

    if name and not name.isdigit() and name.lower() != "popularity":
        os_list.append({
            "name": name,
            "url": "https://distrowatch.com/" + href
        })

# --- Part 2: Detail-Scraping ---
for os in os_list:
    browser.get(os["url"])
    time.sleep(2)

    detail_soup = BeautifulSoup(browser.page_source, "html.parser")

    info_container = detail_soup.select_one("td.TablesTitle")

    if info_container:
        items = info_container.select("ul li")

        for li in items:
            label_tag = li.find("b")
            if label_tag:
                key = label_tag.get_text(strip=True).replace(":", "")
                full_text = li.get_text(strip=True)
                value = full_text.replace(label_tag.get_text(strip=True), "").strip()

                if key == "Popularity":
                    # Change '1 (4,557 hits per day)' to '1'
                    value = value.split("(")[0].strip()

                if value:
                    os[key] = value

    # Scrape the description
    description_container = detail_soup.select_one("td.TablesTitle")
    if description_container:
        text_parts = [
            str(child).strip()
            for child in description_container.children
            if isinstance(child, str) and child.strip()
        ]
        if text_parts:
            os["description"] = text_parts[0]


    # Setting beginner friendliness with custom list
    if os["name"] in beginner_friendly_os:
        os["Beginner-friendly"] = True
    else: os["Beginner-friendly"] = False

    # Scrape the needed table infos (Price, Image Size, Installation-link)
    rows = detail_soup.find_all("tr")

    for row in rows:
        th = row.find("th")
        td = row.find("td")

        if th and td:
            key = th.get_text(strip=True)
            if key in table_features:
                value = td.get_text(strip=True)
                os[key] = value
            if key == "Free Download":
                a = td.select_one("a")
                os["Download"] = a.get("href")

browser.quit()
print(os_list)