#!/bin/bash

# Script: repository-analysis/analyze_commits_verbose.sh
# Author: Daniel Sharon
# Description: Analyzes a Git repository's commit history with verbose outputs.
# Modifications:
# - Adjusted the Git repository check to account for the script running in 'repository-analysis'.
# - Ensured all path references are correct.

echo "Starting Git Repository Analysis..."

# Define the analysis directory
analysis_dir="repository-analysis"

# Since the script is inside 'repository-analysis', set the repository root to the parent directory
repo_root="$(dirname "$(pwd)")"

# Check if the parent directory has a .git directory
if [ ! -d "$repo_root/.git" ]; then
    echo "Error: This script must be run inside the 'repository-analysis' directory within a Git repository."
    exit 1
fi

echo "All analysis files will be stored in '$(pwd)'."

echo "--------------------------------------------------"

# Step 1: Extract commit data
echo "Step 1: Extracting commit data..."
git --git-dir="$repo_root/.git" --work-tree="$repo_root" log --pretty=format:"%H|%an|%ad|%s" --date=short > commits_raw.txt
echo "Extracted commit data to 'commits_raw.txt'."
echo "Total commits extracted: $(wc -l < commits_raw.txt)"

echo "--------------------------------------------------"

# Additional Preprocessing Step: Remove empty commit messages
echo "Removing commits with empty messages..."
grep -v '|$' commits_raw.txt > commits_nonempty.txt
echo "Commits after removing empty messages: $(wc -l < commits_nonempty.txt)"

# Replace commits_raw.txt with commits_nonempty.txt for further processing
mv commits_nonempty.txt commits_raw.txt

echo "--------------------------------------------------"

# Step 2: Map author names to full names
echo "Step 2: Mapping author names to full names..."

# Create associative array for author name mapping
declare -A author_map
author_map["Daniel"]="Daniel Sharon"
author_map["Calibourne"]="Eddie Kanevsky"
author_map["ColgateSmile"]="Dror Mor"
author_map["AliGranett"]="Ali Shaer"

# Process commits_raw.txt to replace author names
awk -F'|' -v OFS='|' '
BEGIN {
    author_map["Daniel"] = "Daniel Sharon"
    author_map["Calibourne"] = "Eddie Kanevsky"
    author_map["ColgateSmile"] = "Dror Mor"
    author_map["AliGranett"] = "Ali Shaer"
}
{
    if ($2 in author_map) {
        $2 = author_map[$2]
    }
    print $0
}' commits_raw.txt > commits_mapped.txt

echo "Author names mapped. Output saved to 'commits_mapped.txt'."

echo "--------------------------------------------------"

# Step 3: Extract commit messages
echo "Step 3: Extracting commit messages..."
cut -d'|' -f4 commits_mapped.txt > messages.txt
echo "Commit messages saved to 'messages.txt'."
echo "Total messages extracted: $(wc -l < messages.txt)"

echo "--------------------------------------------------"

# Step 4: Preprocessing commit messages
echo "Step 4: Preprocessing commit messages..."

# Convert to lowercase
echo "Converting messages to lowercase..."
awk '{print tolower($0)}' messages.txt > messages_lower.txt

# Remove punctuation
echo "Removing punctuation..."
sed 's/[^a-zA-Z0-9 ]//g' messages_lower.txt > messages_nopunct.txt

# Remove numbers
echo "Removing numbers..."
sed 's/[0-9]//g' messages_nopunct.txt > messages_nonum.txt

# Remove extra whitespace
echo "Removing extra whitespace..."
sed 's/  */ /g' messages_nonum.txt > messages_clean.txt

echo "Preprocessed messages saved to 'messages_clean.txt'."

echo "--------------------------------------------------"

# Step 5: Remove stop words
echo "Step 5: Removing stop words..."

# Define array of stop words
stopwords=("the" "is" "in" "at" "which" "on" "a" "an" "and" "or" "for" "of" "with" "to" "from" "by" "this" "that" "it" "be" "as" "are" "was" "were" "but" "if" "not" "no" "so" "we" "you" "he" "she" "they" "them" "their" "my" "your" "our" "also" "just" "can" "will" "has" "have" "had" "do" "did" "done")

# Create a temporary file for stop words
stopwords_file="stopwords_temp.txt"
printf "%s\n" "${stopwords[@]}" > "$stopwords_file"

# Remove stop words from messages
tr ' ' '\n' < messages_clean.txt | grep -vwF -f "$stopwords_file" > words_filtered.txt

# Remove the temporary stopwords file
rm "$stopwords_file"

echo "Stop words removed. Words saved to 'words_filtered.txt'."

echo "--------------------------------------------------"

# Step 6: Perform word frequency analysis
echo "Step 6: Performing word frequency analysis..."
sort words_filtered.txt | uniq -c | sort -nr > word_freq.txt
echo "Word frequency data saved to 'word_freq.txt'."
echo "Total unique words: $(wc -l < word_freq.txt)"

echo "--------------------------------------------------"

# Step 7: Analyze author activity
echo "Step 7: Analyzing author activity..."
cut -d'|' -f2 commits_mapped.txt | sort | uniq -c | sort -nr > author_activity.txt
echo "Author activity data saved to 'author_activity.txt'."
echo "Total authors: $(wc -l < author_activity.txt)"

echo "--------------------------------------------------"

# Step 8: Generate report
echo "Step 8: Generating report..."
{
    echo "Analysis Report"
    echo "==============="
    echo ""
    echo "Repository: $(basename "$repo_root")"
    echo "Analysis Directory: $(basename "$(pwd)")"
    echo "Date of Analysis: $(date)"
    echo ""
    echo "Total Commits Analyzed: $(wc -l < commits_mapped.txt)"
    echo ""
    echo "Top Keywords:"
    echo "-------------"
    head -n 10 word_freq.txt
    echo ""
    echo "Active Contributors:"
    echo "--------------------"
    cat author_activity.txt
} > report.txt
echo "Report generated and saved to 'report.txt'."

echo "--------------------------------------------------"

echo "Git Repository Analysis Complete."
echo "All output files are located in the 'repository-analysis' directory."

# Optional: Open the report
# Uncomment the following line if you want to automatically open the report in the default text editor
# xdg-open report.txt

exit 0