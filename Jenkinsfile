pipeline {
    agent any

    environment {
        S3_BUCKET = 'imagegen'
        AWS_REGION = 'eu-north-1'
    }

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
                bat """
                    aws s3 sync dist/ s3://${S3_BUCKET}/ --region ${AWS_REGION} --delete
                    aws s3 website s3://${S3_BUCKET}/ --index-document index.html --error-document error.html
                """
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