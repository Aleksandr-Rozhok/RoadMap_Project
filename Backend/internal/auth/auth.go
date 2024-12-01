package auth

import (
	"Backend/internal/models"
	"Backend/internal/pkg"
	"encoding/json"
	"fmt"
	"gorm.io/gorm"
	"net/http"
)

func Register(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		fmt.Errorf("Unable to decode request: %s", err)
	}
	fmt.Println(user)
	if user.Username == "" || user.Email == "" || user.PasswordHash == "" {
		http.Error(w, "All fields are required", http.StatusBadRequest)
		return
	}
	fmt.Println("WORKING")
	hashedPassword, err := pkg.HashPassword(user.PasswordHash)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}
	user.PasswordHash = hashedPassword

	var existingUser models.User
	if err := db.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		http.Error(w, "Email is already registered", http.StatusBadRequest)
		return
	}

	fmt.Println(user.Email)
	fmt.Println(user.PasswordHash)
	fmt.Println(user.Username)
	if err := db.Create(&user).Error; err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
}

func Login(http.ResponseWriter, *http.Request) {

}
