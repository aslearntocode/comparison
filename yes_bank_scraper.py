import requests
from bs4 import BeautifulSoup
import pandas as pd

# URL for BankBazaar credit cards page
url = 'https://www.bankbazaar.com/credit-card.html'

# Send request to the website
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find all card containers in the page (this may vary depending on the website structure)
cards = soup.find_all('div', class_='card-listing')

# Initialize list to store card details
card_data = []

# Loop through each card and extract details
for card in cards:
    card_name = card.find('h3').text.strip() if card.find('h3') else 'N/A'
    bank_name = card.find('p', class_='card-provider').text.strip() if card.find('p', class_='card-provider') else 'N/A'
    annual_fee = card.find('div', class_='annual-fee').text.strip() if card.find('div', class_='annual-fee') else 'N/A'
    reward_points = card.find('div', class_='reward-points').text.strip() if card.find('div', class_='reward-points') else 'N/A'
    
    # Append data to list
    card_data.append({
        'Card Name': card_name,
        'Bank Name': bank_name,
        'Annual Fee': annual_fee,
        'Reward Points': reward_points
    })

# Convert the list of cards into a DataFrame
df = pd.DataFrame(card_data)

# Save to Excel
df.to_excel('bankbazaar_credit_cards.xlsx', index=False)

print("Data scraped and saved to bankbazaar_credit_cards.xlsx")
