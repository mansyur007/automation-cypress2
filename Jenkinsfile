pipeline {
    agent any

    parameters {
        string(name: 'BRANCH', defaultValue: 'dev', description: 'Branch to build')
    }

    environment {
        GITHUB_CREDENTIALS = credentials('jenkins-github') // token id from Jenkins
        K6_TOKEN = credentials('jenkins-k6') // token id from Jenkins
    } // changes here - trigger commit

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: params.BRANCH, url: 'https://github.com/mansyur007/automation-cypress2'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // or 'npm install' if not using lockfile
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npm run login'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/cypress/screenshots/**/*.*, **/cypress/videos/**/*.*', allowEmptyArchive: true
        }
        // failure {
        //     mail to: 'your@email.com',
        //          subject: "Cypress Tests Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        //          body: "Check console output: ${env.BUILD_URL}"
        // }
    }
}
