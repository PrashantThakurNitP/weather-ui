pipeline{
    agent any
    parameters {
            string(name: 'K8S_MANIFEST_FILE', defaultValue: 'deploymentservice.yaml', description: 'Path to your Kubernetes manifest file')
            string(name: 'DOCKER_IMAGE', defaultValue: 'prathaku3docker/weather-microservice', description: 'Docker image name')
            string(name: 'DOCKER_IMAGE_TAG', defaultValue: 'latest', description: 'Docker image Tag')
        }
    stages{
        stage('Checkout') {
            steps {
                                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/PrashantThakurNitP/weather-ui.git']])
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Use Node.js with NVM
                    sh "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash"
                    sh "export NVM_DIR=\"\$HOME/.nvm\" && [ -s \"\$NVM_DIR/nvm.sh\" ] && \\. \"\$NVM_DIR/nvm.sh\""
                    sh "nvm install 20"
                    sh "npm install"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh "npm run build"
                }
            }
        }
        stage("Build Docker Image"){
            steps{
                script{
                    sh 'docker build -t prathaku3docker/weather-ui .'
                }
            }
        }
        stage("Push Image to Docker Hub"){
            steps{
                script{

                    withCredentials([string(credentialsId: 'dockerhubpwd2', variable: 'dockerhubpwd2')]) {
                         sh 'docker login -u prathaku3docker -p ${dockerhubpwd2}'
                    }
                    sh 'docker push prathaku3docker/weather-ui:latest'
                }
            }
        }
              stage("Push Docker Image to Minikube") {
                   steps {
                        script {
                      // Set the Minikube context
                    sh 'kubectl config use-context minikube'

                    // Update the deployment.yaml file with your image details
                    sh 'sed -i "s|image: your-image-name:latest|image: prathaku3docker/weather-ui:latest|g" deploymentservice.yaml || true'

                    // Apply the Kubernetes manifest file to deploy your application
                    sh 'kubectl apply -f deploymentservice.yaml'
                        }
                     }

            }
    }

}