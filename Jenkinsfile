pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '4084bc2b-2632-4a33-8aaa-4435cf4f995b'
        NETLIFY_AUTH = credentials('netlify-token')
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                    echo "================Building the project================"
                    node --version
                    npm --version
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "================Testing the project================"
                    test -f build/index.html
                    npm test
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    npm install netlify-cli --save-dev
                    echo "================Deploying the project================"
                    node_modules/.bin/netlify deploy --dir=build --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH
                '''
            }
        }
    }

    post {
        always {
            script {
                try {
                    junit 'test-results/junit.xml'
                } catch (Exception e) {
                    echo "JUnit result not found or failed to publish: ${e.message}"
                }
            }
        }
    }
}