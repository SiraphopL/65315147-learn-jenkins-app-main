pipeline {
  agent any

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
          npm install netlify-cli -g
          netlify deploy --dir=. --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH
        '''
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished!'
    }
  }
}
