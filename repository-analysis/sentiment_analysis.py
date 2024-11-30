#!/usr/bin/env python3

import sys
import subprocess
import importlib.util
import importlib.metadata

# List of required packages
required_packages = ['textblob']

def install_missing_packages():
    missing_packages = []

    for package in required_packages:
        if importlib.util.find_spec(package) is None:
            missing_packages.append(package)

    if missing_packages:
        print(f"Missing packages detected: {', '.join(missing_packages)}")
        print("Installing missing packages...")
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + missing_packages)
            print("Packages installed successfully.")
        except subprocess.CalledProcessError as e:
            print(f"An error occurred while installing packages: {e}")
            sys.exit(1)

def download_textblob_corpora():
    try:
        from textblob import download_corpora
        download_corpora.download_all()
        print("TextBlob corpora downloaded successfully.")
    except Exception as e:
        print(f"An error occurred while downloading TextBlob corpora: {e}")
        sys.exit(1)

def perform_sentiment_analysis():
    from textblob import TextBlob

    # Check if TextBlob corpora are available
    try:
        TextBlob("test").sentiment
    except LookupError:
        print("TextBlob corpora not found. Downloading...")
        download_textblob_corpora()

    with open('messages_clean.txt', 'r') as infile, open('sentiment_results.txt', 'w') as outfile:
        for line in infile:
            message = line.strip()
            analysis = TextBlob(message)
            polarity = analysis.sentiment.polarity
            if polarity > 0:
                sentiment = 'Positive'
            elif polarity < 0:
                sentiment = 'Negative'
            else:
                sentiment = 'Neutral'
            outfile.write(f"{message}|{sentiment}\n")
    print("Sentiment analysis completed and results saved to 'sentiment_results.txt'.")

def main():
    install_missing_packages()
    perform_sentiment_analysis()

if __name__ == "__main__":
    main()
