# Git-Ask

## Overview

Git-Ask is an application that allows users to submit a GitHub repository URL and ask questions related to that repository. The application fetches repository contents, generates embeddings for each file, and stores them in a Supabase database. Users can then query the repository and receive responses based on the stored embeddings.

## Technologies Used

* **Frontend**: Next.js
* **Backend**: Langchain, trpc for type-safe APIs
* **Database**: Supabase (PostgreSQL)
* **GitHub API**: Used for fetching repository contents

## Features

* **GitHub Repo Integration**: Users can submit a GitHub repository URL.
* **Embedding Generation**: Backend fetches repository contents, generates embeddings, and stores them.
* **Query Processing**: Backend processes user queries and generates relevant responses based on stored embeddings.

## How It Works

1. **Repository Submission**: Users enter a GitHub repository URL.
2. **Backend Processing**:

   * The backend fetches contents from the GitHub repository.
   * Embeddings are generated for each file using Langchain and stored in Supabase.
3. **Query and Response**:

   * Users can ask questions related to the repository.
   * Queries are sent to the backend, processed using trpc APIs, and responses are generated based on stored embeddings.
