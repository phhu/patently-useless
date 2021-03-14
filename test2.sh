curl 'https://api.inferkit.com/v1/models/standard/generate?useDemoCredits=true' \
    -H 'content-type: application/json;charset=UTF-8' \
  -H 'accept: */*' \
  --data-raw '{"streamResponse":false,"prompt":{"text":"I want some tea","isContinuation":false},"startFromBeginning":false,"length":50,"forceNoEnd":false,"topP":0.9,"temperature":1}' \
  --compressed


curl 'https://api.inferkit.com/v1/models/standard/generate?useDemoCredits=true'     -H 'content-type: application/json;charset=UTF-8'   -H 'accept: */*'   --data-raw '{"streamResponse":false,"prompt":{"text":"I love it when you look at me","isContinuation":true},"startFromBeginning":false,"length":150,"forceNoEnd":false,"topP":0.9,"temperature":1}'   --compressed