
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Fetching source code from GitHub'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running application tests'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building TaskFlow Docker image'
                sh 'docker build -t taskflow-dashboard:${BUILD_NUMBER} .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying TaskFlow application'

                sh '''
                    docker rm -f taskflow-container || true

                    docker run -d \
                        --name taskflow-container \
                        -p 8082:80 \
                        taskflow-dashboard:${BUILD_NUMBER}
                '''
            }
        }
    }

    post {
        success {
            echo 'TaskFlow CI/CD pipeline completed successfully!'
            echo 'Application URL: http://localhost:8082'
        }

        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
    }
}
