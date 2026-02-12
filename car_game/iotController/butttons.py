import RPi.GPIO as GPIO
import time
import socket

right = 17
left = 27
front = 2
back = 3

GPIO.setmode(GPIO.BCM)
GPIO.setup(right, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(left, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(front, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(back, GPIO.IN, pull_up_down=GPIO.PUD_UP)

if __name__ == "__main__":
  try:
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(("127.0.0.1", 8000))
    print("Connected")
    while True:
      if GPIO.input(17) == GPIO.LOW:
        client_socket.sendall("right".encode('utf-8'))
        data = client_socket.recv(1024)
        print(data.decode('utf-8'))
        time.sleep(0.03)
      if GPIO.input(27) == GPIO.LOW:
        client_socket.sendall("left".encode('utf-8'))
        data = client_socket.recv(1024)
        print(data.decode('utf-8'))
        time.sleep(0.03)
      if GPIO.input(2) == GPIO.LOW:
        client_socket.sendall("front".encode('utf-8'))
        data = client_socket.recv(1024)
        print(data.decode('utf-8'))
        time.sleep(0.03)
      if GPIO.input(3) == GPIO.LOW:
        client_socket.sendall("back".encode('utf-8'))
        data = client_socket.recv(1024)
        print(data.decode('utf-8')) 
        time.sleep(0.03)
    
  except Exception as e:
    print("ERROR MSG" ,e)
  finally:
    client_socket.close()
    print("socket closed")
