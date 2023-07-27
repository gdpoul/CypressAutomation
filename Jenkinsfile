pipeline {
  agent any

  parameters{
     string(name: 'SPEC', defaultValue: "cypress/e2e/test_scripts/**/**", description: "Enter the script path that you want to execute")
     choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: "Choice the browser where you want to execute your scripts")
  }
  
  options{
     ansiColor('xterm')
  }

  stages {
    stage('Building') {
        steps {
            script {
              echo "Building the application"
            }
        }
    }

    stage('Testing') {
        steps {
            script {
                bat "npm i"
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
        }
      }
    }

    stage('Deploying') {
        steps {
            script {
              echo "Deploy the Application"
        }
      }
    }
  }

  post{
    always{
      publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/reports/html', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
    }
  }
}
