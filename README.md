# Final Project

## Set up container environment
- Build container and bind to any available port (ex. 8080):
    ```
    docker build -t final-project . 
    docker run -d -p 8080:80 --name final-project final-project 
    ```
- launch the web application on the chosen port:
    ```
    http://localhost:8080
    ```

### Shut down container environment
- Find container ID of running container:
    ```
    docker ps
    ```

- Stop and Remove container
    ```
    docker stop <containerID>
    docker rm <containerID>
    ```
