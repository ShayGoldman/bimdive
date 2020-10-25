# BimDive

## Installation

This projects uses `lerna` for easy package management so installation is easy:

Run `yarn bootstrap` to install all packages

## Bootstraping and `bootstrap.sh`

Bootstraping is the process of installing and linking all packages.

Lerna takes care of that with `lerna bootstrap`, but sometimes that is not enough. Some dependencies require "special care" and for that we we have the `bootstrap.sh`.

All links between packages which cannot be symlinked using `lerna link` should be installed manually but still be executed when bootstrapping. These linking processes should be automated and placed inside the `bootstrap.sh` file.

**Note:** `lerna run` and `lerna exec` are useful for this task, look at [filter flags](https://github.com/lerna/lerna/tree/master/core/filter-options) for more granular control

## Ports

```
| Component  	| Port 	|
|-------------	|------	|
| API        	| 3000 	|
|           	|    	|
| Swagger-UI 	| 3001 	|
|           	|    	|
| App        	| 4000 	|
```
