FROM ubuntu 

ARG USERNAME=worker
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN useradd -ms /bin/bash ${USERNAME} && echo "worker:worker" | chpasswd && adduser ${USERNAME} sudo

RUN apt update \
   && apt install -y git zip unzip openjdk-17-jdk python3-pip autoconf libtool pkg-config zlib1g-dev libncurses5-dev libncursesw5-dev libtinfo5 cmake libffi-dev libssl-dev sudo \
   && pip3 install Cython==0.29.33 virtualenv buildozer kivy

# USER $USERNAME

WORKDIR /home/root/testing

COPY testing .

ENTRYPOINT ["/bin/bash"]
 # CMD ["./build", "0.1"] && \
    # ["cp", "bin/*.apk", "testing/kivy/bin/."] && \
    # ["cp", "-r", ".buildozer", "testing/."]
