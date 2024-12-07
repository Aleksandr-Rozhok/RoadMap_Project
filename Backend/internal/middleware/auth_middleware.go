package middleware

import (
	"Backend/internal/models"
	"context"
	"github.com/golang-jwt/jwt/v4"
	"log"
	"net/http"
	"strings"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")

		if tokenString == "" {
			http.Error(w, "Missing token", http.StatusUnauthorized)
			return
		}

		tokenString = strings.TrimPrefix(tokenString, "Bearer ")
		log.Printf("Received token: %s\n", tokenString)

		claims := &models.Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return models.JwtKey, nil
		})

		if err != nil || !token.Valid {
			log.Printf("Token parsing error: %v\n", err)
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		log.Printf("Token is valid for userID: %d\n", claims.UserID)

		ctx := context.WithValue(r.Context(), "userID", claims.UserID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
