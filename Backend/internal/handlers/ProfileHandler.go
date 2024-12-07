package handlers

import (
	"Backend/internal/models"
	"encoding/json"
	"gorm.io/gorm"
	"log"
	"net/http"
)

func GetProfile(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	userID, ok := r.Context().Value("userID").(int64)
	if !ok {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	log.Printf("Fetching profile for userID: %d\n", userID)

	var user models.User

	if err := db.Preload("Progress").First(&user, userID).Error; err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
