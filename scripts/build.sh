sudo docker build -f ./docker/api/Dockerfile -t gpyt-api:latest .
sudo docker build -f ./docker/content_gen/Dockerfile -t gpyt-content-gen:latest .
sudo docker build -f ./docker/fe/Dockerfile -t gpyt-fe:latest .
