from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

# Browser-options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")

# Start browser
driver = webdriver.Chrome(options=chrome_options)

url = "https://distrowatch.com/search.php?ostype=Linux&category=All&origin=All&basedon=All&notbasedon=None&desktop=All&architecture=All&package=All&rolling=All&isosize=All&netinstall=All&language=All&defaultinit=All&status=Active#simpleresults"
driver.get(url)

# Waiting time for scripts to load
time.sleep(3)

# Give the loaded html code to our soup
soup = BeautifulSoup(driver.page_source, "html.parser")
driver.quit()

os_list = []
cells = soup.select("td.NewsText b a")
for cell in cells:
    name = cell.get_text(strip=True)
    if name and not name.isdigit():
        os_list.append(name)

os_list.remove("popularity")

print(f"Found: {len(os_list)} systems")
print(os_list)