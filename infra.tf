terraform {

  backend "s3" {
    bucket = "my-sites-terraform-remote-state"
    key    = "jackdevries.com_state"
    region = "us-east-2"
  }

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.7.1"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.4.1"
    }

  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

data "external" "git_describe" {
  program = ["sh", "scripts/git_describe.sh"]
}

module "basic-deployment" {
  source  = "jdevries3133/basic-deployment/kubernetes"
  version = "0.0.7"

  app_name  = "jdv"
  container = "jdevries3133/jackdevries.com:${data.external.git_describe.result.output}"
  domain    = "jackdevries.com"
}
