import http.server

import socketserver

import random

PORT = random.randint(3000, 7999)

class MyHandler(http.server.SimpleHTTPRequestHandler):

    def end_headers(self):

        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')

        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')

        super().end_headers()



with socketserver.TCPServer(("", PORT), MyHandler) as httpd:

    print(f"Serving with COOP/COEP headers at http://localhost:{PORT}")

    httpd.serve_forever()
