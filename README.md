# Final Project

## Set up container environment
```
docker build -t final-project . 
docker run -d -p 8080:80 --name final-project final-project 
```
### Shut down container environment
- Find container ID of running container: `docker ps`
- Stop and Remove container
    ```
    docker stop <containerID>
    docker rm <containerID>
    ```
