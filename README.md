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


### API

#### Today's weather

* Request
```
{"type": "TODAY"} or anything non-empty string
```

* Response
```
{"type":"TODAY","speechMessage":"只今の天気は、ところによりくもり。予想最高気温は、27度。最低気温は、21度。現在の気温は、24度です。","icon":"partly-cloudy-day","iconJa":"ところによりくもり","high":"27","low":"21","now":"24"}
```

#### Tomorrow's weather

* Request
```
{"type": "TOMORROW"}
```

* Response
```
{"type":"TOMORROW","speechMessage":"明日の天気は、晴れ。予想最高気温は、28度。最低気温は、20度です。","icon":"clear-day","iconJa":"晴れ","high":"28","low":"20"}
```
