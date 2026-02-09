
import RPi.GPIO as GPIO
import time
import requests

GPIO.setmode(GPIO.BCM)
# Pin 17 starts at HIGH (1) because of the internal pull-up
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)

url = "http://10.167.86.205:8000"
right = {
  "operation":'right'
}
left = {
  "operation":'left'
}

try:
    while True:
        # If the button is pressed, the pin goes to Ground (0)
        if GPIO.input(17) == GPIO.LOW:
            print("MOVE LEFT")
            response = requests.post(url, json=left)
            print(response.status_code)
            print(response.json())
            time.sleep(0.03) # Small delay to save CPU
        if GPIO.input(27) == GPIO.LOW:
            print("MOVE RIGHT")
            response = requests.post(url, json=right)
            print(response.status_code)
            print(response.json())
            time.sleep(0.03) # Small delay to save CPU
finally:
    GPIO.cleanup()      
    

