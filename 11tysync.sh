#!/bin/bash

# This should be able to be run as a Platypus script but we need to make sure that the PATH is set correctly
# fswatch is installed via Homebrew and is located in /usr/local/bin

#TODO solve the platypus issue with the PATH

echo "STATUSTITLE|🔄 11ty 🔄"

# Define source and destination directories
SRC_DIR="/Users/somma/Documents/Projects/family-thoughts/Projects/Sites/Sage.Education"
DEST_DIR="/Users/somma/Documents/Projects/GitHub/WEB-Sage.Education/src/sage.education"

# Function to sync directories using rsync
sync_directories() {
    rsync -avz --delete "$SRC_DIR/" "$DEST_DIR/"
}


# Initial sync
sync_directories

# Monitor changes in source directory using fswatch
fswatch -0 -r "$SRC_DIR" | while read -d "" event; do
    echo "Change detected: $event"
    sync_directories
done
