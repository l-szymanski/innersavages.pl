rm -r public
hugo build
gcloud storage rsync -r -c public/ gs://innersavages.pl/
