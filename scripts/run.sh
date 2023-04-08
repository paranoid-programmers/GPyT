sudo docker rm -f gpyt-api
sudo docker run -p 8000:8000 --network=host --name gpyt-api --env-file=.env -d gpyt-api:latest

sudo docker rm -f gpyt-content-gen
sudo docker run -p 8001:8001 --network=host --name gpyt-content-gen --env-file=.env -d gpyt-content-gen:latest
