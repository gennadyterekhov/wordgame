package helper

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func Check(e error) {
	if e != nil {
		fmt.Println("==[AN ERROR OCURRED]==")
		panic(e)
	}
}

// copied from https://stackoverflow.com/questions/51183462/how-to-copy-os-stdout-output-to-string-variable/51183660
func Capture() func() (string, error) {
	r, w, err := os.Pipe()
	Check(err)

	done := make(chan error, 1)

	save := os.Stdout
	os.Stdout = w

	var buf strings.Builder

	go func() {
		_, err := io.Copy(&buf, r)
		r.Close()
		done <- err
	}()

	return func() (string, error) {
		os.Stdout = save
		w.Close()
		err := <-done
		return buf.String(), err
	}
}
