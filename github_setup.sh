#!/bin/bash

# Replace with your GitHub username
GITHUB_USERNAME="your-username"

# Add the remote repository
git remote add origin https://github.com/$GITHUB_USERNAME/sx15_2.git

# Push to GitHub
git push -u origin master

# Create and switch to the gh-pages branch
git checkout -b gh-pages

# Push the gh-pages branch
git push -u origin gh-pages

# Switch back to the master branch
git checkout master
