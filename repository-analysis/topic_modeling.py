#!/usr/bin/env python3

import sys
import subprocess

def install_missing_packages():
    missing_packages = []
    
    # Check for gensim
    try:
        import gensim
    except ImportError:
        missing_packages.append('gensim')
    
    # Check for nltk
    try:
        import nltk
    except ImportError:
        missing_packages.append('nltk')
    
    # Check for pyLDAvis
    try:
        import pyLDAvis
    except ImportError:
        missing_packages.append('pyLDAvis')
    
    if missing_packages:
        print(f"Missing packages detected: {', '.join(missing_packages)}")
        print("Installing missing packages...")
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + missing_packages)
            print("Packages installed successfully.")
        except subprocess.CalledProcessError as e:
            print(f"An error occurred while installing packages: {e}")
            sys.exit(1)

def download_nltk_resources():
    try:
        import nltk
        nltk_packages = ['punkt', 'stopwords', 'wordnet']
        for pkg in nltk_packages:
            nltk.download(pkg, quiet=True)
        print("NLTK resources downloaded successfully.")
    except Exception as e:
        print(f"An error occurred while downloading NLTK resources: {e}")
        sys.exit(1)

def perform_topic_modeling():
    import nltk
    from nltk.corpus import stopwords
    from nltk.tokenize import word_tokenize
    from nltk.stem import WordNetLemmatizer

    # Ensure NLTK resources are available
    try:
        nltk.data.find('tokenizers/punkt')
        nltk.data.find('corpora/stopwords')
        nltk.data.find('corpora/wordnet')
    except LookupError:
        print("NLTK resources not found. Downloading...")
        download_nltk_resources()

    # Read preprocessed messages
    with open('messages_clean.txt', 'r') as infile:
        documents = infile.readlines()

    # Define stop words
    stop_words = set(stopwords.words('english'))
    custom_stop_words = [
        'added', 'updated', 'fixed', 'removed', 'update', 'file', 'files', 'commit',
        'refactored', 'reverted', 'change', 'initial', 'readme', 'readmemd', 'dockerfile',
        'build', 'app', 'code', 'project', 'repository', 'function', 'script', 'line', 'issue'
    ]
    stop_words.update(custom_stop_words)

    # Initialize lemmatizer
    lemmatizer = WordNetLemmatizer()

    # Tokenize, remove stop words, and lemmatize
    texts = []
    for doc in documents:
        tokens = word_tokenize(doc.lower())
        tokens = [lemmatizer.lemmatize(word) for word in tokens if word.isalpha() and word not in stop_words]
        texts.append(tokens)

    # Build bigrams and trigrams
    from gensim.models import Phrases, Phraser

    bigram = Phrases(texts, min_count=2, threshold=5)
    trigram = Phrases(bigram[texts], threshold=5)

    bigram_mod = Phraser(bigram)
    trigram_mod = Phraser(trigram)

    texts = [bigram_mod[doc] for doc in texts]
    texts = [trigram_mod[doc] for doc in texts]

    # Create a dictionary and corpus
    from gensim import corpora, models

    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]

    # Build the LDA model
    num_topics = 7  # Increased from 5 to 7
    lda_model = models.LdaModel(
        corpus, num_topics=num_topics, id2word=dictionary, passes=20, iterations=400, random_state=100
    )

    # Save the topics to a file
    with open('topics.txt', 'w') as outfile:
        for idx, topic in lda_model.show_topics(num_topics=num_topics, num_words=10, formatted=True):
            outfile.write(f"Topic {idx + 1}: {topic}\n")
    print("Topic modeling completed and results saved to 'topics.txt'.")

    # # Assign topics to documents - not functional atm
    # topics_per_commit = []
    # for i, row in enumerate(corpus):
    #     topic_distribution = lda_model.get_document_topics(row)
    #     dominant_topic = max(topic_distribution, key=lambda x: x[1])[0]
    #     topics_per_commit.append((documents[i].strip(), dominant_topic + 1))  # Adding 1 to make topic numbers 1-based

    # # Save topics per commit
    # with open('topics_per_commit.txt', 'w') as outfile:
    #     for doc, topic_num in topics_per_commit:
    #         outfile.write(f"{doc}|Topic {topic_num}\n")
    # print("Assigned topics to commits and saved to 'topics_per_commit.txt'.")

    # Generate topic visualization - not functional atm
    # import pyLDAvis.gensim_models
    # import pyLDAvis

    # vis = pyLDAvis.gensim_models.prepare(lda_model, corpus, dictionary)
    # pyLDAvis.save_html(vis, 'lda_visualization.html')
    # print("Topic visualization saved to 'lda_visualization.html'.")

def main():
    install_missing_packages()
    perform_topic_modeling()

if __name__ == "__main__":
    main()
