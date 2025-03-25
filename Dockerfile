FROM jenkins/jenkins:lts

USER root  # ✅ ให้ root ตั้งแต่แรก

RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean