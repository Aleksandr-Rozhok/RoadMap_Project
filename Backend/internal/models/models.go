package models

import "time"

type User struct {
	ID           int64     `json:"id" gorm:"primaryKey"`
	Username     string    `json:"username" gorm:"unique;not null"`
	Email        string    `json:"email" gorm:"unique;not null"`
	PasswordHash string    `json:"password" gorm:"not null"`
	CreatedAt    time.Time `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updatedAt" gorm:"autoUpdateTime"`

	Progress Progress `json:"progress" gorm:"foreignKey:UserID;references:ID;constraint:OnDelete:CASCADE"`
}

type Progress struct {
	ID         int64     `json:"id" gorm:"primaryKey"`
	UserID     int64     `json:"user_id" gorm:"not null;index"`
	Level      int       `json:"level"`
	Experience int       `json:"experience"`
	UpdatedAt  time.Time `json:"updatedAt"`
}

func (Progress) TableName() string {
	return "progresses"
}
