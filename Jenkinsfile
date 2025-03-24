pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            reuseNode true
        }
    }
    ...
}

    environment {
        NETLIFY_SITE_ID = '4084bc2b-2632-4a33-8aaa-4435cf4f995b'
        NETLIFY_AUTH = credentials('netlify-token')
    }

    stages {
        stage('Install Node.js') {
            steps {
                sh '''
                    echo "Installing Node.js..."
                    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                    apt-get install -y nodejs
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                sh '''
                    npm install -g netlify-cli
                    echo "Deploying to Netlify..."
                    netlify deploy --dir=build --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH
                '''
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline completed.'
        }
    }
}
