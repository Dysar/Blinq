package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type MonitoringData struct {
	OS string
	// Computer   string
	// User       string
	// Title      string
	// Executable string
	URL string
}

var (
	datas []MonitoringData
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/golang", helloWorld)

	http.Handle("/", r)

	// Solves Cross Origin Access Issue
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4200"},
	})
	handler := c.Handler(r)

	srv := &http.Server{
		Handler: handler,
		Addr:    ":" + os.Getenv("PORT"),
	}

	log.Fatal(srv.ListenAndServe())
}

func helloWorld(w http.ResponseWriter, r *http.Request) {
	data := MonitoringData{OS: "MacOS", URL: "Drake-PC"}
	data2 := MonitoringData{OS: "MacOS", URL: "faceboog.com"}
	data3 := MonitoringData{OS: "MacOS", URL: "faceboog.com"}

	datas = append(datas, data)

	datas = append(datas, data2)
	datas = append(datas, data3)

	jsonBytes, err := StructToJSON(datas)
	if err != nil {
		fmt.Print(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)
}
func StructToJSON(data interface{}) ([]byte, error) {
	buf := new(bytes.Buffer)

	if err := json.NewEncoder(buf).Encode(data); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
