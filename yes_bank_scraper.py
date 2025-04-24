import os
import requests
from bs4 import BeautifulSoup
import json
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv('.env.local')

def scrape_credit_cards():
    url = "https://www.yesbank.in/personal-banking/yes-individual/cards/credit-cards"
    
    try:
        print("Sending request to Yes Bank website...")
        # Send GET request to the URL
        response = requests.get(url)
        response.raise_for_status()
        print("Received response from website")
        
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        print("Parsed HTML content")
        
        # Find all credit card sections
        card_sections = soup.find_all('div', class_='card-section')
        print(f"Found {len(card_sections)} card sections")
        
        if len(card_sections) == 0:
            print("No card sections found. Printing page structure:")
            print(soup.prettify()[:1000])  # Print first 1000 characters of HTML
        
        cards_data = []
        
        for section in card_sections:
            try:
                # Extract card name
                card_name = section.find('h3').text.strip()
                print(f"Processing card: {card_name}")
                
                # Extract card image URL
                card_image = section.find('img')['src']
                if not card_image.startswith('http'):
                    card_image = f"https://www.yesbank.in{card_image}"
                
                # Extract card features
                features = []
                feature_list = section.find_all('li')
                for feature in feature_list:
                    features.append(feature.text.strip())
                
                # Extract card benefits
                benefits = []
                benefit_list = section.find_all('div', class_='benefit-item')
                for benefit in benefit_list:
                    benefits.append(benefit.text.strip())
                
                # Create card data dictionary
                card_data = {
                    'card_name': card_name,
                    'card_image': card_image,
                    'features': features,
                    'benefits': benefits
                }
                
                cards_data.append(card_data)
                print(f"Successfully processed card: {card_name}")
                
            except Exception as e:
                print(f"Error processing card section: {str(e)}")
                continue
        
        return cards_data
    
    except Exception as e:
        print(f"Error scraping website: {str(e)}")
        return []

def save_to_json(cards_data):
    try:
        with open('yes_bank_cards.json', 'w', encoding='utf-8') as f:
            json.dump(cards_data, f, indent=4, ensure_ascii=False)
        print("Data successfully saved to yes_bank_cards.json")
    
    except Exception as e:
        print(f"Error saving data to JSON: {str(e)}")

def main():
    # Scrape credit card data
    cards_data = scrape_credit_cards()
    
    if cards_data:
        # Save data to JSON file
        save_to_json(cards_data)
    else:
        print("No credit card data found")

if __name__ == "__main__":
    main() 