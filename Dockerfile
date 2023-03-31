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

# Install mysqli addon
RUN apt -y update \
    && apt -y install libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && apt-get clean && rm -Rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# replaced by volume mount in docker-compose.yml
#COPY . /var/www/html/

WORKDIR /usr/src/final-project
