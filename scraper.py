import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import random
import time
from typing import List, Dict, Optional
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class CreditCardScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
        }
        self.bank_urls = {
            'ICICI': 'https://www.icicibank.com/personal-banking/cards/credit-card?ITM=nli_na_cardsna_megamenuContainer_0_CMS_creditCards_NLI',
            'HDFC': 'https://www.hdfcbank.com/personal/pay/cards/credit-cards',
            'Axis': 'https://www.axisbank.com/retail/cards/credit-card',
            'SBI': 'https://www.sbicard.com/en/personal/credit-cards.page',
            'Kotak': 'https://www.kotak.com/en/personal-banking/credit-cards.html',
            'IndusInd': 'https://www.indusind.com/in/en/personal/credit-cards.html',
            'Yes Bank': 'https://www.yesbank.in/personal-banking/yes-first-credit-card',
            'RBL': 'https://www.rblbank.com/personal-banking/credit-cards',
            'Standard Chartered': 'https://www.sc.com/in/credit-cards/',
            'IDFC': 'https://www.idfcfirstbank.com/credit-card.html'
        }

    def get_random_feedback(self) -> List[Dict]:
        """Generate random feedback for testing purposes"""
        comments = [
            "Great rewards program, totally worth it!",
            "Good card but high annual fee",
            "Excellent customer service and benefits",
            "Decent cashback but customer service needs improvement",
            "Good value for money",
            "Processing time for cashback is too long"
        ]
        feedback = []
        for _ in range(random.randint(2, 4)):
            feedback.append({
                "comment": random.choice(comments),
                "rating": random.uniform(5, 10),
                "date": datetime.now().strftime("%Y-%m-%d")
            })
        return feedback

    def handle_http_error(self, bank: str, url: str, error: requests.exceptions.RequestException) -> None:
        """Handle HTTP errors with appropriate logging"""
        if isinstance(error, requests.exceptions.HTTPError):
            if error.response.status_code == 404:
                logging.error(f"URL not found for {bank}: {url}")
            elif error.response.status_code == 403:
                logging.error(f"Access forbidden for {bank}: {url}")
            else:
                logging.error(f"HTTP error for {bank}: {error.response.status_code}")
        elif isinstance(error, requests.exceptions.ConnectionError):
            logging.error(f"Connection error for {bank}: {url}")
        else:
            logging.error(f"Error scraping {bank}: {str(error)}")

    def scrape_bank_cards(self, bank: str, url: str) -> List[Dict]:
        """Scrape credit cards from a specific bank's website"""
        try:
            logging.info(f"Attempting to scrape {bank} from {url}")
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            # Check if the response is HTML
            if not response.headers.get('content-type', '').startswith('text/html'):
                logging.warning(f"Unexpected content type for {bank}: {response.headers.get('content-type')}")
                return []
                
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Log the page title for debugging
            title = soup.find('title')
            if title:
                logging.info(f"Page title for {bank}: {title.text.strip()}")
            
            # This is a placeholder for the actual scraping logic
            # Each bank's website structure is different, so we'll need to customize this
            # for each bank's specific HTML structure
            
            # For now, we'll return a sample card structure
            return [{
                "id": f"{bank.lower()}-sample-card",
                "name": f"{bank} Sample Credit Card",
                "bank": bank,
                "image": f"/credit-cards/{bank}-Sample.png",
                "apr": "42% p.a.",
                "annualFee": "₹500",
                "joiningFee": "₹1,000",
                "rewards": "Earn 2.5% Reward Points on international spends\nEarn 2% Reward Points on domestic spends",
                "rupay": random.choice([True, False]),
                "features": [
                    "Universal Cashback",
                    "Fuel Surcharge Waiver",
                    "EMI Options"
                ],
                "feedback": self.get_random_feedback(),
                "additionalDetails": {
                    "rewardsProgram": "Flat 2% cashback on all spends, credited monthly",
                    "welcomeBonus": "₹1,000 cashback on spending ₹25,000 in first 30 days",
                    "milestoneBenefits": [
                        "Annual fee waiver on spending ₹3,00,000 in a year"
                    ],
                    "airportLounge": "2 complimentary domestic lounge visits per quarter",
                    "fuelSurcharge": "Complete fuel surcharge waiver at all fuel stations",
                    "insuranceCover": [
                        "Purchase protection up to ₹1 lakh",
                        "Card fraud protection"
                    ],
                    "movieBenefits": "25% off on movie tickets up to ₹100 per ticket",
                    "diningPrivileges": [
                        "10% cashback at restaurants up to ₹200 per transaction",
                        "5% extra cashback at food delivery"
                    ],
                    "minimumSpend": "₹10,000 per month",
                    "paymentDueDays": "15 days",
                    "creditLimit": "Up to ₹3,00,000",
                    "domesticTransactionFee": "Nil",
                    "internationalTransactionFee": "3.5% + GST",
                    "interestRate": "3.75% per month",
                    "emiOptions": "Available on purchases above ₹5,000"
                }
            }]
            
        except requests.exceptions.RequestException as e:
            self.handle_http_error(bank, url, e)
            return []
        except Exception as e:
            logging.error(f"Unexpected error scraping {bank}: {str(e)}")
            return []

    def scrape_all_cards(self) -> List[Dict]:
        """Scrape credit cards from all banks"""
        all_cards = []
        for bank, url in self.bank_urls.items():
            logging.info(f"Starting to scrape {bank}...")
            cards = self.scrape_bank_cards(bank, url)
            all_cards.extend(cards)
            time.sleep(2)  # Be nice to the servers
        return all_cards

    def save_to_json(self, cards: List[Dict], filename: str = 'credit_cards.json'):
        """Save scraped cards to a JSON file"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(cards, f, indent=2, ensure_ascii=False)
            logging.info(f"Successfully saved {len(cards)} cards to {filename}")
        except Exception as e:
            logging.error(f"Error saving to {filename}: {str(e)}")

def main():
    try:
        scraper = CreditCardScraper()
        cards = scraper.scrape_all_cards()
        scraper.save_to_json(cards)
    except Exception as e:
        logging.error(f"Fatal error in main: {str(e)}")

if __name__ == "__main__":
    main() 