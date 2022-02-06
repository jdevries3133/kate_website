variable "service_port" {
  type = number
}

resource "kubernetes_namespace" "jdv" {
  metadata {
    name = "jackdevries"
  }
}

resource "kubernetes_deployment" "jdv" {
  metadata {
    name      = "jdv-deployment"
    namespace = kubernetes_namespace.jdv.metadata.0.name
  }

  spec {
    // there should not be more than one replica as long as the app is using
    // temporary in-container sqlite databases.
    replicas = 1

    selector {
      match_labels = {
        app = "jdv"
      }
    }

    template {
      metadata {
        labels = {
          app = "jdv"
        }
      }

      spec {

        container {
          name  = "jdv"
          image = "jdevries3133/jackdevries.com:0.0.2"

        }
      }
    }
  }
}

resource "kubernetes_service" "jdv" {
  metadata {
    name      = "jdv-service"
    namespace = kubernetes_namespace.jdv.metadata.0.name
  }

  spec {
    selector = {
      app = kubernetes_deployment.jdv.spec.0.template.0.metadata.0.labels.app
    }
    type             = "LoadBalancer"
    session_affinity = "ClientIP"
    port {
      port        = var.service_port
      target_port = 3000
    }
  }
}
