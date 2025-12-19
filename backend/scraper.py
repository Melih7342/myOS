import requests
from bs4 import BeautifulSoup

url = "https://en.wikipedia.org/wiki/List_of_Linux_distributions"
headers = {'User-Agent': 'Mozilla/5.0'}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

os_list = []
for row in soup.select("table.wikitable tr"):
    # Get first cell with the os name
    cols = row.find_all("td")
    if cols:
        name = cols[0].get_text(strip=True)
        os_list.append(name)

print(os_list)