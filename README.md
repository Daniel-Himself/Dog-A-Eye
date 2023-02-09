# Final Project

## Abstract

The purpose of this project is to implement a simple application for dog owners to upload their dogs' eye images to detect wheter a dog has a severe condition or not. The application should enable live communication between the dog owners and a vet for a further consultation. 

## Deploying instructions

### Set up container environment
- Build container and bind to any available port (ex. 8080):
    ```
    docker compose up -d
    ```
- launch the web application on the chosen port:
    ```
    http://localhost:8080
    ```

### Shut down container environment
- Find container ID of running container:
    ```
    docker compose down
    ```
