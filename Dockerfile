FROM jenkins/jenkins:lts

USER 0  # ✅ ใช้ UID แทน "root"

RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean
