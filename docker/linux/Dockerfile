FROM ubuntu

#======== Parameters =======#
ARG USERNAME=docker
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG HOME="/home/${USERNAME}"

#======================== Dependencies ======================#
RUN apt-get update && \
    apt-get install -y git zip unzip openjdk-17-jdk        \
    python3-pip autoconf libtool pkg-config                \
    zlib1g-dev libncurses5-dev libncursesw5-dev            \
    libtinfo5 cmake libffi-dev libssl-dev sudo &&          \
    apt-get clean && rm -Rf /var/lib/apt/lists/*
RUN pip3 install Cython==0.29.33 virtualenv buildozer kivy

#===== Adding User and finish setup =====#
RUN useradd -ms /bin/bash ${USERNAME} && echo "docker:docker" | chpasswd && adduser ${USERNAME} sudo
USER $USERNAME

WORKDIR ${HOME}/build

# COPY . .

# WORKDIR ${HOME}/build/testing

ENTRYPOINT ["/bin/bash"]
# ENTRYPOINT ["/bin/bash"]
# CMD ["./build", "0.1"] && \
    # ["cp", "bin/*.apk", "testing/kivy/bin/."] && \
    # ["cp", "-r", ".buildozer", "testing/."]
