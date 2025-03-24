node {
    environment {
        NETLIFY_SITE_ID = '4084bc2b-2632-4a33-8aaa-4435cf4f995b'
    }

    try {
        stage('Build') {
            docker.image('node:18-alpine').inside {
                echo "================Building the project================"
                sh '''
                    node --version
                    npm --version
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test') {
            docker.image('node:18-alpine').inside {
                echo "================Testing the project================"
                sh '''
                    test -f build/index.html
                    npm test
                '''
            }
        }

        stage('Deploy') {
            docker.image('node:18-alpine').inside {
                withCredentials([string(credentialsId: 'netlify-token', variable: 'NETLIFY_AUTH_TOKEN')]) {
                    echo "================Deploying the project================"
                    sh '''
                        echo "NETLIFY_AUTH_TOKEN: $NETLIFY_AUTH_TOKEN"
                        echo "NETLIFY_SITE_ID: $NETLIFY_SITE_ID"
                        npm install -g netlify-cli
                        netlify --version
                        netlify deploy --dir=build --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
                    '''
                }
            }
        }
    } finally {
        junit 'test-results/junit.xml'
    }
}