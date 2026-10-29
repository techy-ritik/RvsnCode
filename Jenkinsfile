pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out latest code...'
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Expense Tracker...'
                sh 'sudo -u ubuntu /home/ubuntu/deploy-expense-tracker.sh'
            }
        }

        stage('Verify') {
            steps {
                echo 'Deployment completed successfully.'
            }
        }
    }
}