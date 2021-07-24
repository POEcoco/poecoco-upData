package main

import (
	router "Poecoco-udS/src"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
)

var port = ":1999"
var Flag = 0
var AcceptFlags = []string{`dev`, `pro`} // 0:Debug Mode、1:Production mode

func main() {
	argnames := os.Args
	msg := ``
	if len(argnames) != 2 {
		for i := range AcceptFlags {
			msg += `[` + AcceptFlags[i] + `] `
		}
		fmt.Println(`This application can run with one args tag. Option: ` + msg)
	} else {
		for i := range AcceptFlags {
			Flag = map[bool]int{true: i, false: -1}[strings.EqualFold(argnames[1], AcceptFlags[i])]
			if Flag != -1 {
				break
			}
		}
	}

	msg = `Start to run with flag:` + AcceptFlags[Flag]
	fmt.Println(msg)
	// Set Router
	r := mux.NewRouter()
	router.SetRouter(r) //Setting website Path

	fmt.Println("Server Listen at: " + port)
	http.ListenAndServe(port, r)
	return
}
