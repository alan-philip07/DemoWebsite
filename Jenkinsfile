pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Getting source code from GitHub'
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

        stage('Build') {
            steps {
                echo 'Application build stage completed'
            }
        }
    }

    post {
        success {
            echo 'TaskFlow pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}