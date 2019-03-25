package main

import (
	"bytes"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type MonitoringData struct {
	OS         string
	Computer   string
	User       string
	Title      string
	Executable string
	URL        string
}

var (
	datas []MonitoringData
)

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/user-data", getUserData)

	http.Handle("/", r)

	// Solves Cross Origin Access Issue
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, //http://localhost:4200
	})
	handler := c.Handler(r)

	srv := &http.Server{
		Handler: handler,
		Addr:    ":" + os.Getenv("PORT"),
	}

	log.Fatal(srv.ListenAndServe())
}
func getUserData(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case "GET":
		for i := 0; i < 3; i++ {
			datas = append(datas, MonitoringData{OS: "MacOS", Computer: "pc", User: "user", Title: "title", Executable: "exec", URL: "Drake-PC"})
		}

		jsonBytes, err := StructToJSON(datas)
		if err != nil {
			log.Print(err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonBytes)
	case "POST":
		body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))

		if err != nil {
			log.Fatalln("Error AddProduct", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		log.Printf("Go server speaking.")
		log.Println(string(body))
	}
}
func StructToJSON(data interface{}) ([]byte, error) {
	buf := new(bytes.Buffer)

	if err := json.NewEncoder(buf).Encode(data); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
