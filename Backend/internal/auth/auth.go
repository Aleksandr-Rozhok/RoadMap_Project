package auth

import (
	"Backend/internal/models"
	"Backend/internal/pkg"
	"encoding/json"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
	"log"
	"net/http"
	"time"
)

func Register(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if user.Username == "" || user.Email == "" || user.PasswordHash == "" {
		http.Error(w, "All fields are required", http.StatusBadRequest)
		return
	}

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

	err = db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&user).Error; err != nil {
			return err
		}

		progress := models.Progress{
			UserID:     user.ID,
			Level:      0,
			Experience: 0,
		}

		if err := tx.Create(&progress).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &models.Claims{
		UserID: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(models.JwtKey)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	log.Printf("JWT Secret Key: %s\n", string(models.JwtKey))
	log.Printf("Generated token: %s\n", tokenString)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"token":   tokenString,
		"message": "User registered successfully",
		"user":    user,
	})
}

func Login(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	var request models.LoginRequest

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if request.Email == "" || request.Password == "" {
		http.Error(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.Preload("Progress").Where("email = ?", request.Email).First(&user).Error; err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	if !pkg.CheckPasswordHash(request.Password, user.PasswordHash) {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &models.Claims{
		UserID: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(models.JwtKey)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	log.Printf("JWT Secret Key: %s\n", string(models.JwtKey))
	log.Printf("Generated token: %s\n", tokenString)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"token":   tokenString,
		"message": "Login successful",
		"user":    user,
	})
}
