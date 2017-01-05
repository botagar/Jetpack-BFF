
def git_archive_file = "bff.tar.gz"

node {
   stage('Preparation') {
      git 'https://github.com/botagar/Jetpack-BFF'
      sh "npm install"
   }
}
node {
   stage('Package') {
      sh "git archive HEAD -o ${git_archive_file}"
   }
}
node {
  stage('Deploy') {
    sh "ansible-playbook -u '${DEPLOY_USER}' -i '${DEPLOY_HOST},' --extra-vars archive_file=../${git_archive_file} deployment/deploy.yml"
  }
}
