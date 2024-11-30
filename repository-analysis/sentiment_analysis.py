#!/usr/bin/env python3

import sys
import subprocess
import pkg_resources

# List of required packages
required_packages = {'textblob': 'textblob'}

def install_missing_packages():
    # Get the list of installed packages
    installed_packages = {pkg.key for pkg in pkg_resources.working_set}
    missing_packages = {pkg: ver for pkg, ver in required_packages.items() if pkg not in installed_packages}

    if missing_packages:
        print(f"Missing packages detected: {', '.join(missing_packages.keys())}")
        print("Installing missing packages...")
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + list(missing_packages.values()))
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
