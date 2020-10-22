package router

import (
	"net/http"
	"portfolio/controllers"
)

func Router() {
	http.HandleFunc("/", controllers.Index)
	// http.HandleFunc("/reactPage", controllers.ReactPage)
	// http.HandleFunc("/templateTest", controllers.TemplateTest)
	// http.HandleFunc("/bootstrap", controllers.BootstrapTemplate)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("views"))))
	// http.HandleFunc("/webhook", webhook.Webhook)
}
