node {
    environment {
        NETLIFY_SITE_ID = '4084bc2b-2632-4a33-8aaa-4435cf4f995b'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')  // เปลี่ยนจาก NETLIFY_AUTH
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
                withEnv(["NETLIFY_AUTH_TOKEN=${NETLIFY_AUTH_TOKEN}", "NETLIFY_SITE_ID=${NETLIFY_SITE_ID}"]) {
                    echo "================Deploying the project================"
                    sh '''
                        npm install -g netlify-cli
                        netlify deploy --dir=build --prod --site=$NETLIFY_SITE_ID
                    '''
                }
            }
        }
    } finally {
        junit 'test-results/junit.xml'
    }
}
