def image
def branch_name = "${env.BRANCH_NAME}"
def github_token = "${env.GITHUB_STATUS_ACCESS_TOKEN}"
def build_number = "${env.BUILD_NUMBER}"

def tagName = 'jb_' + branch_name + "_" + build_number
def image_name = 'dein-li/dein-li-frontend:' + tagName

// Production deployment (replaces the old Portainer stack + localhost:34015 registry, which no longer exists)
def app_container = 'dein-li-frontend'
def app_network = 'dein-li'
def app_port = '34251'
// Public runtime config, rendered into assets/env.js by envsubst on container start - nothing secret here
def app_env = [
  'PRODUCTION=true',
  'API_URL=https://api.dein.li/',
  'BASE_URL=https://dein.li/',
  'KEYCLOAK_URL=https://account.sebamomann.de/auth/',
  'KEYCLOAK_REALM=sebamomann',
  'KEYCLOAK_REDIRECT_URI=https://dein.li/',
  'KEYCLOAK_POST_LOGOUT_REDIRECT_URI=https://dein.li/',
  'KEYCLOAK_CLIENT_ID=dein-li',
  'KEYCLOAK_RESPONSE_TYPE=code',
  'KEYCLOAK_SCOPE=openid profile email',
]

pipeline {
  agent any

  environment {
    GITHUB_STATUS_ACCESS_TOKEN_SEBAMOMANN = credentials('GITHUB_STATUS_ACCESS_TOKEN_SEBAMOMANN')
  }

  options {
    ansiColor('xterm')
    buildDiscarder(logRotator(numToKeepStr: '7'))
  }

  stages {
    stage('Preamble') {
      steps {
        script {
          updateStatus("pending")
        }
      }
    }

    stage('Build Docker image') {
      steps {
        script {
          image = docker.build(image_name, "-f Dockerfile .")
        }
      }
    }

    stage('Deploy') {
      when {
        expression {
          return branch_name == 'master'
        }
      }
      steps {
        script {
          def env_flags = app_env.collect { "-e '${it}'" }.join(' ')

          sh """
            docker network create ${app_network} || true

            # Keep the running container aside (stopped + renamed) so we can roll back
            docker rm -fv ${app_container}-old || true
            docker stop ${app_container} || true
            docker rename ${app_container} ${app_container}-old || true

            docker run -d \\
              --name ${app_container} \\
              --network ${app_network} \\
              --restart unless-stopped \\
              -p 127.0.0.1:${app_port}:80 \\
              ${env_flags} \\
              ${image_name}

            deployed=0
            for i in \$(seq 1 15); do
              docker exec ${app_container} wget -qO- http://127.0.0.1/assets/env.js 2>/dev/null | grep -q 'api.dein.li' && { deployed=1; break; }
              sleep 2
            done

            if [ "\$deployed" != "1" ]; then
              echo "New container failed health check - rolling back"
              docker logs --tail 80 ${app_container} || true
              docker rm -fv ${app_container} || true
              docker rename ${app_container}-old ${app_container} || true
              docker start ${app_container} || true
              exit 1
            fi

            echo "Deploy healthy - removing previous container"
            docker rm -fv ${app_container}-old || true
          """
        }
      }
    }
  }
  post {
    always {
      script {
        // On master the image is now running in production - keep it
        if (branch_name != 'master') {
          try {
            sh 'docker image rm ' + image_name + ' -f'
          } catch (err) {
            echo err.getMessage()
          }
        }
      }
    }
    success {
      script {
        updateStatus("success")

        // Drop older images of this repo; docker refuses to remove the one the running container uses
        if (branch_name == 'master') {
          sh "docker images dein-li/dein-li-frontend --format '{{.Repository}}:{{.Tag}}' | grep -v ':${tagName}\$' | xargs -r docker image rm || true"
        }
      }
    }
    failure {
      script {
        updateStatus("failure")
      }
    }
    aborted {
      script {
        updateStatus("error")
      }
    }
  }
}

void updateStatus(String value) {
  sh 'curl -s "https://api.github.com/repos/sebamomann/dein-li-frontend/statuses/$GIT_COMMIT" \\\n' +
    '  -H "Content-Type: application/json" \\\n' +
    '  -H "Authorization: token $GITHUB_STATUS_ACCESS_TOKEN_SEBAMOMANN" \\\n' +
    '  -X POST \\\n' +
    '  -d "{\\"state\\": \\"' + value + '\\", \\"description\\": \\"Jenkins\\", \\"context\\": \\"continuous-integration/jenkins\\", \\"target_url\\": \\"https://jenkins.dankoe.de/job/dein-li-frontend/job/$BRANCH_NAME/$BUILD_NUMBER/console\\"}" \\\n' +
    '  '
}
