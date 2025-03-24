node {
    environment {
        NETLIFY_SITE_ID = '4084bc2b-2632-4a33-8aaa-4435cf4f995b'
        NETLIFY_AUTH = credentials('netlify-token')
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
                echo "================Deploying the project================"
                sh '''
                    npm install netlify-cli --save-dev
                    node_modules/.bin/netlify deploy --dir=build --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH
                '''
            }
        }
    } finally {
        junit 'test-results/junit.xml'
    }
}
