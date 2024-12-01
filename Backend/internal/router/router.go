package router

import (
	"Backend/internal/auth"
	"Backend/internal/healthz"
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
	apiRouter.HandleFunc("/login", auth.Login).Methods("POST")

	//apiRouter.HandleFunc("/profile", user.GetProfile).Methods("GET")
	//apiRouter.HandleFunc("/profile/update", user.UpdateProfile).Methods("PUT")
}
