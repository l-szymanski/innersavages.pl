# docker run --rm -it --user "$(id -u):$(id -g)" -p 1313:1313 -v "$PWD:/src" hugomods/hugo:latest hugo server --bind 0.0.0.0 --port 1313
# docker run --rm --user "$(id -u):$(id -g)" -v "$PWD:/src" hugomods/hugo:latest hugo --minify

rm -r public
hugo build
gcloud storage rsync -r -c public/ gs://innersavages.pl/
