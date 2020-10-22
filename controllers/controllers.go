package controllers

import (
	"net/http"
)

func Index(w http.ResponseWriter, req *http.Request) {
	render(w, "index", struct{}{})
}

func ReactPage(w http.ResponseWriter, req *http.Request) {
	render(w, "reactPage", struct{}{})
}

func TemplateTest(w http.ResponseWriter, req *http.Request) {
	render(w, "templateTest", struct{}{})
}

func BootstrapTemplate(w http.ResponseWriter, req *http.Request) {
	render(w, "template", struct{}{})
}
