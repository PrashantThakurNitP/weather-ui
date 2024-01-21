pipeline{
    agent any
    tools {
    nodejs 'nodejs'
   }
   
    stages{
        stage('Checkout') {
            steps {
                                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/PrashantThakurNitP/weather-ui.git']])
            }
        }

        stage('Startup') {
        steps {
          sh 'npm install --force --verbose'
        }
      }
       stage('Test'){
        steps {
          sh 'npm run test'
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