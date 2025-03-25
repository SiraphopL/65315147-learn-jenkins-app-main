FROM jenkins/jenkins:lts

USER 0  # ใช้ root (UID 0)

RUN apt-get update && \
    apt-get install -y docker.io git && \
    apt-get clean
