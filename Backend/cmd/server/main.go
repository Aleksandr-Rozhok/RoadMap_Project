package main

import (
	"Backend/internal/db"
	"Backend/internal/router"
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {
	r := mux.NewRouter()
	db := db.InitDB()

	router.RegisterRoutes(r, db)

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	methodsOk := handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS"})
	originsOk := handlers.AllowedOrigins([]string{"*"})

	fmt.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(headersOk, methodsOk, originsOk)(r)))
}
