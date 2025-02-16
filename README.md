# sigma2k_ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# sigma2k_ui" 

### Untuk update di docker 
```
1. npm run build
2. docker-compose up -d --build

#masuk ke terminal docker
docker exec -it scangenie_ui sh
```

## cara push image ke docker hub
1. npm run build
2. docker login
3. docker ps -a
4. docker commit <container_id> jemmy22/scangenie_ui:v1.3
5. docker build -t jemmy22/scangenie_ui:v1.3 .
6. docker push jemmy22/scangenie_ui:v1.3



