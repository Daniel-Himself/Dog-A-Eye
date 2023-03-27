FROM ubuntu 
WORKDIR /testing
COPY testing /testing
VOLUME /testing/kivy
RUN apt update
RUN apt install -y git zip unzip openjdk-17-jdk python3-pip autoconf libtool pkg-config zlib1g-dev libncurses5-dev libncursesw5-dev libtinfo5 cmake libffi-dev libssl-dev
RUN pip3 install Cython==0.29.33 virtualenv buildozer kivy

# CMD ["/bin/bash"]
 # CMD ["./build", "0.1"] && \
    # ["cp", "bin/*.apk", "testing/kivy/bin/."] && \
    # ["cp", "-r", ".buildozer", "testing/."]
