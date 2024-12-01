package healthz

import (
	"fmt"
	"net/http"
)

func ServerHealthz(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
	w.WriteHeader(http.StatusOK)

	write, err := w.Write([]byte("OK"))
	if err != nil {
		fmt.Printf("Error writing response: %v\n", err)
	}

	fmt.Printf("Response written to: %d bytes\n", write)
}
