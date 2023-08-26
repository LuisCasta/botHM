/*curl --location --request POST 'https://api.landbot.io/v1/customers/297638254/send_template/'     --header 'Content-Type: application/json'     --header 'Authorization: Token 5046a0bf7add2c578e59ac8713fff7fe8300a589'     --data-raw '{
   "template_id": 3010,
   "template_params": {
      "body": {
         "params": []
      }
   },
   "template_language": "en"
}'

//abi
curl --location --request POST 'https://messages.landbot.io/wa/W-1818-YLSJCP6KP6OF6WQ0/opt_in?phone=+5218716093771'     --header 'Authorization: Token 5046a0bf7add2c578e59ac8713fff7fe8300a589' --header 'Content-Type: application/json'      --data-raw '{
   "customParams": {
      "body": {
         "params":[
            "test"
         ]
      }
   }
}'

//miriam

curl --location --request POST 'https://messages.landbot.io/wa/W-1818-YLSJCP6KP6OF6WQ0/opt_in?phone=+5218711316948&1=prueba' \
--header 'Authorization: Token 5046a0bf7add2c578e59ac8713fff7fe8300a589' \
--header 'Content-Type: application/json'

//ivan

curl --location --request POST 'https://messages.landbot.io/wa/W-1818-YLSJCP6KP6OF6WQ0/opt_in?phone=+5215539137906&1=prueba' \
--header 'Authorization: Token 5046a0bf7add2c578e59ac8713fff7fe8300a589' \
--header 'Content-Type: application/json'*/


curl --location --request POST 'https://api.landbot.io/v1/customers/297652403/send_template/'     --header 'Content-Type: application/json'     --header 'Authorization: Token 5046a0bf7add2c578e59ac8713fff7fe8300a589'     --data-raw '{
   "template_id": 4917,
   "template_params": {
      "body": {
         "params": [
            "prueba1",
            "prueba 2"
         ]
      },
      "buttons": [
         null
      ]
   },
   "template_language": "en"
}'