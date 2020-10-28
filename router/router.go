package router

import (
	"net/http"
	"wordgame/controllers"
)

func Router() {
	http.HandleFunc("/", controllers.IndexPage)
	http.HandleFunc("/play", controllers.PlayPage)
	http.HandleFunc("/template", controllers.TemplateTestPage)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("views"))))
}
