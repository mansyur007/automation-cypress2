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

        // stage('Run k6 Performance Test - from dev') {
        //     steps {
        //         script {
        //             sh '''
        //             docker run --rm -v $PWD:/scripts -e K6_CLOUD_TOKEN=$K6_TOKEN grafana/k6 run /scripts/k6-test-api.js -o cloud
        //             '''
        //         }
        //     }
        // }
    }
}
