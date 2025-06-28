pipeline {
  agent any

  stages {
    stage('Clone Code') {
      steps {
        git url: 'https://github.com/charan2r/image-generator.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('Build App') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Deploy to S3') {
      steps {
        bat '''
          aws s3 sync build/ s3://your-bucket-name --delete
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful!'
    }
    failure {
      echo '❌ Deployment failed!'
    }
  }
}
