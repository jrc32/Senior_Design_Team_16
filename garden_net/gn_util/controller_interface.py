import socket
import select
import socket

from interface import Interface

interface = Interface()
SOCKET_LIST = []
RECV_BUFFER = 8192
# soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# host = socket.gethostname()
# print(host)
# port = 5555
# print(port)
# soc.listen(5)
# soc.bind((host, port))

SOCKET_LIST = []
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#soc.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
host = socket.gethostname()
<<<<<<< HEAD
port = 5530
=======
port = 5528
>>>>>>> 3b406e046e963e3e2a79f1248b0dc30e71e10117
print("The server hostname is: " + host)

server_socket.bind(('', port))
server_socket.listen(5)

SOCKET_LIST.append(server_socket)

x = 1

while True:
	ready_to_read, ready_to_write, in_error = select.select(SOCKET_LIST, [], [], 0)

	for sock in ready_to_read:
		if sock == server_socket:
			client_sock, addr = server_socket.accept()
			SOCKET_LIST.append(client_sock)
			print("Client (%s, %s) connected" % addr)
		else:
<<<<<<< HEAD
			print("Connection Lost")
			client_sock.close()
	x = 1
=======
			try:
				data = sock.recv(RECV_BUFFER)
				if data:
					msg = "Server Response: " + data.decode('utf-8')
					print("Received: " + data.decode('utf-8'))
					temp_host = socket.gethostname()
					print(temp_host)
					# if sock.gethostname() == host:
					# 	print("Socket is on the same host")
					if data.decode('utf-8') == 'quit':
						print("Closing connection with: " + str(sock))
						sock.close()
						SOCKET_LIST.remove(sock)
					else:
						sock.send(msg.encode('utf-8'))

			except:
				continue





	# client_sock, addr = soc.accept()
	# print("Client (%s, %s) connected" % addr)
	#
	# while x == 1:
	# 	data = client_sock.recv(8192)
	# 	if data:
	# 		msg = "Server Response: " + data.decode('utf-8')
	# 		print("Recieved: " + data.decode('utf-8'))
	# 		if data.decode('utf-8') == 'quit':
	# 			print("Closing connection with: " + str(addr))
	# 			client_sock.close()
	# 			x = 0
	# 		else:
	# 			client_sock.send(msg.encode('utf-8'))
	# 		# interface.run("controller")
	# 	else:
	# 		print("Connection Lost")
	# 		client_sock.close()
	# x = 1


>>>>>>> 3b406e046e963e3e2a79f1248b0dc30e71e10117
