# Darksky SendWS

## Requirements

| Name    | Version |
| :------ | :------ |
| Node.js | 11.15.0 |
| npm | 6.7.0 |

## Usage

### Setup

```
> cp config/darksky-sample.js config/darksky.js
# replace "YOUR_API_KEY"
# see https://darksky.net/dev
> npm install
> docker-compose build
```

* Please execute only once

### Start

```
> docker-compose up -d
```

* Refer to the following file for the port number being used.  
`docker-compose.yml`

### Stop

```
> docker-compose down
```
