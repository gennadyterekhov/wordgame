package controllers

import (
	"net/http"
)

type staticPart struct {
	Header string
	footer string
}

// func prepareStaticPart() staticPart {
// 	var headerHtml string = prepare("header")
// 	var footerHtml string = prepare("footer")

// 	var context = staticPart {
// 		Header string
// 		Footer string
// 	}{
// 		headerHtml,
// 		footerHtml,
// 	}
// 	return context
// }

func IndexPage(w http.ResponseWriter, req *http.Request) {
	render(w, "index", struct{}{})
}

func TemplateTestPage(w http.ResponseWriter, req *http.Request) {

	render(w, "templateTest", struct{}{})
}

func PlayPage(w http.ResponseWriter, req *http.Request) {

	render(w, "play", struct{}{})
}
