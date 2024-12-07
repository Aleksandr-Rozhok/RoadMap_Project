package models

import (
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var JwtKey []byte

type Claims struct {
	UserID int64 `json:"user_id"`
	jwt.RegisteredClaims
}

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	secretKey := os.Getenv("JWT_SECRET_KEY")
	if secretKey == "" {
		log.Fatal("JWT_SECRET_KEY is not set in .env file")
	}

	JwtKey = []byte(secretKey)
	log.Printf("JWT_SECRET_KEY loaded successfully")
}
