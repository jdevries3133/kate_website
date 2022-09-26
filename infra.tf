terraform {

  backend "s3" {
    bucket = "my-sites-terraform-remote-state"
    key    = "kate_website_state"
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

resource "random_password" "admin_password" {
  length  = 48
  special = false
}

data "external" "git_describe" {
  program = ["sh", "-c", "echo '{\"output\": \"'\"$(git describe --tags)\"'\"}'"]
}

module "basic-deployment" {
  source  = "jdevries3133/basic-deployment/kubernetes"
  version = "0.2.0"

  app_name  = "jdv"
  container = "jdevries3133/kate_website:${data.external.git_describe.result.output}"
  domain    = "kate.jackdevries.com"

  extra_env = {
    ADMIN_PASSWORD = random_password.admin_password.result
  }
}
