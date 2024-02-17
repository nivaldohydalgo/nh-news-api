

# Buildar uma imabem com o comando abaixo:
docker buildx build --platform linux/amd64 -t nh-news-api .

# Criar a imagem com o nome padrão do Google Cloud:
docker tag nh-news-api us-central1-docker.pkg.dev/nh-news-web-site/nh-news-repository/nh-news-api

# Fazer o push da imagem no Artifact Repositóry do Google Cloud:
docker push us-central1-docker.pkg.dev/nh-news-web-site/nh-news-repository/nh-news-api

# Finalização do deploy no Google Cloud:
Conferir a imagem no Artifact Repository
Vincular a nova imagem no Cloud Run

## **-------- Se precisar fazer login no Google Cloud -------**

gcloud auth login

gcloud auth configure-docker us-central1-docker.pkg.dev

## **-------- Comandos iniciais de configuração -------**

gcloud init

sudo usermod -a -G docker ${USER}

