pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18' // ตั้งชื่อ Node.js ตามที่คุณตั้งไว้ใน Jenkins
    }

    environment {
        NETLIFY_SITE_ID = '4084bc2b-2632-4a33-8aaa-4435cf4f995b'
        NETLIFY_AUTH = credentials('netlify-token')
    }

    stages {
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
