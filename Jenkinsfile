pipeline {
    agent any

    environment {
        S3_BUCKET = 'imagegen'
        AWS_REGION = 'us-north-1'
    }

    stages {
        stage('Clone Code') {
            steps {
                git 'https://github.com/charan2r/image-generator.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh """
                    aws s3 sync build/ s3://${S3_BUCKET}/ --region ${AWS_REGION} --delete
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
