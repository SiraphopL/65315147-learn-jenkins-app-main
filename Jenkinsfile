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
        TZ = 'Asia/Bangkok' // เพิ่ม timezone
    }

    options {
        timestamps() // ⏱ เพิ่ม timestamp ให้ log
        ansiColor('xterm') // 🎨 สีใน console
    }

    stages {
        stage('🧾 Checkout Source Code') {
            steps {
                echo "\u001B[34m✅ Source code already checked out by Jenkins.\u001B[0m"
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo "\u001B[36m================ Installing Dependencies ================\u001B[0m"
                sh 'npm install'
            }
        }

        stage('⚙️ Build Project') {
            steps {
                echo "\u001B[35m================ Building the Project ================\u001B[0m"
                sh 'npm run build'
            }
        }

        stage('🧪 Run Tests') {
            steps {
                echo "\u001B[32m================ Running Tests ================\u001B[0m"
                sh 'npm test'
            }
        }

        stage('🚀 Deploy to Netlify') {
            steps {
                echo "\u001B[33m================ Deploying to Netlify ================\u001B[0m"
                sh '''
                    npm install netlify-cli --save-dev
                    ./node_modules/.bin/netlify deploy --dir=build --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH
                '''
            }
        }
    }

    post {
        success {
            echo "\u001B[32m🎉 Build & Deploy Success!\u001B[0m"
        }

        failure {
            echo "\u001B[31m❌ Build Failed. Please check the logs.\u001B[0m"
        }

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
