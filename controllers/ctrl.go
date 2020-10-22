package controllers

import (
	"io/ioutil"
	"net/http"
	"portfolio/helper"
	"text/template"
)

type config struct {
	Port       int    `json:"PORT"`
	APIKey     string `json:"api_key"`
	WebhookUrl string `json:"webhook_url"`
	Cyrillic   string `json:"cyrillic"`
	Latin      string `json:"latin"`
}

func GetFile(filename string) string {
	configStr, err := ioutil.ReadFile(filename)
	helper.Check(err)

	return string(configStr)
}

func GetView(viewName string) string {
	return GetFile("views/html/" + viewName + ".html")
}

func render(w http.ResponseWriter, templateName string, context struct{}) {
	templateObj, err := template.New("templateTest").Parse(GetView(templateName))
	helper.Check(err)

	err = templateObj.Execute(w, context)
	helper.Check(err)
}
