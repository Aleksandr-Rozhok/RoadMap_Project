package models

import "time"

type User struct {
	ID           int64     `json:"id"`
	Username     string    `json:"username" gorm:"unique;not null"`
	Email        string    `json:"email" gorm:"unique;not null"`
	PasswordHash string    `json:"password" gorm:"not null"`
	CreatedAt    time.Time `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updatedAt" gorm:"autoUpdateTime"`
}

type Progress struct {
	ID         int64     `json:"id"`
	UserID     int64     `json:"user_id"`
	Level      int       `json:"level"`
	Experience int       `json:"experience"`
	UpdatedAt  time.Time `json:"updatedAt"`
}
