pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    // post {
    //     always {

    //         junit allowEmptyResults: true,
    //               testResults: 'test-results/results.xml'

    //         archiveArtifacts artifacts: 'playwright-report/**',
    //                          allowEmptyArchive: true

    //         archiveArtifacts artifacts: 'test-results/**',
    //                          allowEmptyArchive: true

    //         publishHTML([
    //             allowMissing: true,
    //             alwaysLinkToLastBuild: true,
    //             keepAll: true,
    //             reportDir: 'playwright-report',
    //             reportFiles: 'index.html',
    //             reportName: 'Playwright HTML Report'
    //         ])
    //     }
    // }
    post {
        always {
            junit allowEmptyResults: true,
              testResults: 'test-results/results.xml'

            archiveArtifacts artifacts: 'playwright-report/**',
                         allowEmptyArchive: true

            publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright HTML Report'
        ])
        }
    }
}
