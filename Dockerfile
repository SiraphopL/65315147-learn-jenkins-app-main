FROM jenkins/jenkins:lts

USER 0 

RUN apt-get update && \
    apt-get install -y git docker.io && \
    apt-get clean