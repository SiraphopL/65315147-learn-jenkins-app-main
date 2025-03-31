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
        TZ = 'Asia/Bangkok'
        CI = 'true'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('🧾 Checkout Source Code') {
            steps {
                checkout scm
                echo "\u001B[34m✅ Source code checked out successfully\u001B[0m"
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo "\u001B[36m================ Installing Dependencies ================\u001B[0m"
                sh 'npm ci --no-audit'
                sh 'npm cache clean --force'
            }
        }

        stage('⚙️ Build Project') {
            steps {
                echo "\u001B[35m================ Building the Project ================\u001B[0m"
                sh 'npm run build'
                
                script {
                    if (!fileExists('build')) {
                        error('Build directory was not created! Build failed.')
                    }
                }
            }
        }

        stage('🧪 Run Tests') {
            steps {
                echo "\u001B[32m================ Running Tests ================\u001B[0m"
                sh 'npm test -- --watchAll=false'
            }
            
            post {
                always {
                    junit testResults: '**/test-results/*.xml', allowEmptyResults: true
                }
            }
        }

        stage('🚀 Deploy to Netlify') {
            steps {
                echo "\u001B[33m================ Deploying to Netlify ================\u001B[0m"
                script {
                    try {
                        // ติดตั้ง Netlify CLI แบบ global เพื่อหลีกเลี่ยงปัญหา path
                        sh 'npm install -g netlify-cli'
                        
                        // Deploy โดยแสดง output ธรรมดาแทน JSON
                        sh '''
                            netlify deploy \
                                --dir=build \
                                --prod \
                                --site=$NETLIFY_SITE_ID \
                                --auth=$NETLIFY_AUTH
                        '''
                    } catch (Exception e) {
                        error("Deployment failed: ${e.message}")
                    }
                }
            }
        }
    }

    post {
        success {
            echo "\u001B[32m🎉 Build & Deploy Success!\u001B[0m"
            // ถ้าต้องการแจ้งเตือนผ่าน Slack ให้ติดตั้ง plugin ก่อน
            // slackSend(color: 'good', message: "Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }

        failure {
            echo "\u001B[31m❌ Build Failed. Please check the logs.\u001B[0m"
            // ถ้าต้องการแจ้งเตือนผ่าน Slack ให้ติดตั้ง plugin ก่อน
            // slackSend(color: 'danger', message: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }

        cleanup {
            sh 'rm -rf node_modules' // ทำความสะอาดเพื่อประหยัดพื้นที่
        }
    }
}