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
        CI = 'true' // ตั้งค่าตัวแปร environment สำหรับโหมด CI
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES') // จำกัดเวลาการ build สูงสุด 30 นาที
        buildDiscarder(logRotator(numToKeepStr: '10')) // เก็บเฉพาะ 10 build ล่าสุด
    }

    stages {
        stage('🧾 Checkout Source Code') {
            steps {
                checkout scm // ตรวจสอบให้แน่ใจว่าโค้ดถูก checkout จริงๆ
                echo "\u001B[34m✅ Source code checked out successfully\u001B[0m"
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo "\u001B[36m================ Installing Dependencies ================\u001B[0m"
                sh 'npm ci --no-audit' // ใช้ npm ci แทน install สำหรับ環境 CI
                sh 'npm cache clean --force' // ลบ cache เพื่อประหยัดพื้นที่
            }
        }

        stage('🔍 Lint Code') {
            steps {
                echo "\u001B[33m================ Running Linter ================\u001B[0m"
                sh 'npm run lint || true' // ใช้ || true เพื่อไม่ให้ลินท์ผิดทำให้ build ล้มเหลว
            }
        }

        stage('⚙️ Build Project') {
            steps {
                echo "\u001B[35m================ Building the Project ================\u001B[0m"
                sh 'npm run build'
                
                // ตรวจสอบว่ามี build directory จริงๆ
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
                sh 'npm test -- --watchAll=false' // เพิ่ม flag สำหรับ CI
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
                        sh '''
                            npm install netlify-cli --save-dev --no-audit
                            ./node_modules/.bin/netlify deploy \
                                --dir=build \
                                --prod \
                                --site=$NETLIFY_SITE_ID \
                                --auth=$NETLIFY_AUTH \
                                --json > netlify-deploy.json
                        '''
                        
                        // อ่านผลลัพธ์ JSON จาก Netlify
                        def deployOutput = readJSON file: 'netlify-deploy.json'
                        env.DEPLOY_URL = deployOutput.deploy_url
                        echo "\u001B[32m🚀 Deployed to: ${env.DEPLOY_URL}\u001B[0m"
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
            script {
                slackSend(color: 'good', message: "Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nDeployed to: ${env.DEPLOY_URL ?: 'Not available'}")
            }
        }

        failure {
            echo "\u001B[31m❌ Build Failed. Please check the logs.\u001B[0m"
            script {
                slackSend(color: 'danger', message: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
            }
        }

        cleanup {
            sh 'rm -rf node_modules' // ทำความสะอาดเพื่อประหยัดพื้นที่
            sh 'rm -f netlify-deploy.json' // ลบไฟล์ชั่วคราว
        }
    }
}