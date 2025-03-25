pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            reuseNode true
        }
    }

    environment {
        NETLIFY_SITE_ID = '4084bc2b-2632-4a33-8aaa-4435cf4f995b'
        NETLIFY_AUTH = credentials('netlify-token')
    }

    stages {
        stage('Checkout') {
            steps {
                echo "✅ Source code already checked out by Jenkins."
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "================Installing Dependencies================"
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo "================Building the project================"
                sh 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                echo "================Running Tests================"
                sh 'npm test'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo "================Deploying to Netlify================"
                sh '''
                    npm install netlify-cli --save-dev
                    ./node_modules/.bin/netlify deploy --dir=build --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH
                '''
            }
        }
    }

    post {
        always {
            script {
                try {
                    junit '**/test-results/junit.xml'
                } catch (Exception e) {
                    echo "JUnit result not found or failed to publish: ${e.message}"
                }
            }
        }
    }
}
