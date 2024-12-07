package router

import (
	"Backend/internal/auth"
	"Backend/internal/handlers"
	"Backend/internal/healthz"
	"Backend/internal/middleware"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"net/http"
)

func RegisterRoutes(r *mux.Router, db *gorm.DB) {
	apiRouter := r.PathPrefix("/api").Subrouter()

	apiRouter.HandleFunc("/healthz", healthz.ServerHealthz).Methods("GET")
	apiRouter.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
		auth.Register(w, r, db)
	}).Methods("POST")
	apiRouter.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		auth.Login(w, r, db)
	}).Methods("POST")

	protected := apiRouter.PathPrefix("").Subrouter()
	protected.Use(middleware.AuthMiddleware)

	protected.HandleFunc("/profile", func(w http.ResponseWriter, r *http.Request) {
		handlers.GetProfile(w, r, db)
	}).Methods("GET")
}
