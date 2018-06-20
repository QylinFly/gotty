package server

import (
	"github.com/yudai/gotty/webtty"
)

// Slave is webtty.Slave with some additional methods.
type Slave interface {
	webtty.Slave

	Close() error
}

type Factory interface {
	Name() string
	// 命令和参数配置
	Command(cmd string) 
	Argv(argv []string) 
	
	New(params map[string][]string) (Slave, error)
}
