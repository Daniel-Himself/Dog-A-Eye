FROM composer:2.3.10
WORKDIR /usr/src/final-project
COPY composer.json composer.json
COPY composer.lock composer.lock

RUN composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist

FROM php:8.1-apache

# replaced by volume mount in docker-compose.yml
#COPY . /var/www/html/

WORKDIR /usr/src/final-project