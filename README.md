# Dog Eye - Bsc Diploma Project
Authors: 
Eddie Kanevsky, 
Dror Mor,
Ali Shaer,
Daniel Sharon

## Table Of contents:
---
- [Dog Eye - Bsc Diploma Project](#dog-eye---bsc-diploma-project)
  - [Table Of contents:](#table-of-contents)
  - [Abstract](#abstract)
  - [The Problem](#the-problem)
    - [Pet Owners Perspective](#pet-owners-perspective)
    - [Veterinars Perspective](#veterinars-perspective)
    - [Researchers Perspective](#researchers-perspective)
  - [Proposed Solution](#proposed-solution)
  - [Technologies](#technologies)
  - [Setup](#setup)
    - [The Environment](#the-environment)
    - [Additional dependancies](#additional-dependancies)
  - [Building the Application](#building-the-application)
---

## Abstract

The purpose of this project is to implement a simple application for dog owners to upload their dogs' eye images to detect wheter a dog has a severe condition or not. The application should enable live communication between the dog owners and a vet for a further consultation. 

## The Problem

### Pet Owners Perspective

### Veterinars Perspective

### Researchers Perspective

## Proposed Solution

## Technologies

- Anaconda (Python version 3.10)
  - [Download Anaconda](https://www.anaconda.com/products/distribution)
  - [Download Miniconda](https://docs.conda.io/en/latest/miniconda.html)
  - Buildozer (Android packager)

## Setup

Note: The setup currently used works only for linux devices!

### The Environment

Run `make` in order to create the conda environment and install all the dependancies
Afterwards, run `conda activate DogVision`

### Additional dependancies

This part is based on the [buildozer official documentation](https://buildozer.readthedocs.io/en/latest/installation.html#targeting-android)

In order for the buildozer utility to work properly, you may need to run the following (on Ubuntu20/22 - may differ on other distributions):
```
sudo apt update
sudo apt install -y git zip unzip openjdk-17-jdk python3-pip autoconf libtool pkg-config zlib1g-dev libncurses5-dev libncursesw5-dev libtinfo5 cmake libffi-dev libssl-dev
pip3 install Cython==0.29.33 virtualenv
```

## Building the Application

Run `./build.sh` to create the application for android. Note that the first run may take a while (up to 30 minutes).
The consequtive runs will be considerably faster (assuming you have the `.buildozer` folder)