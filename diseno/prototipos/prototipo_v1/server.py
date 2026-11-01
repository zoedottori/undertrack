#!/usr/bin/env python3
"""
UNDERTRACK Web Application Server
Sirve la aplicación localmente con soporte para ES Modules, MIME types y CORS.

Uso:
    python3 app/server.py
"""

import os
import sys
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class UndertrackHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Habilitar CORS y no-cache en desarrollo local
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        # Asegurar MIME types correctos para ES Modules JavaScript y assets
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        if path.endswith('.css'):
            return 'text/css; charset=utf-8'
        return super().guess_type(path)

def run():
    handler_class = partial(UndertrackHandler, directory=DIRECTORY)
    server_address = ('', PORT)
    try:
        httpd = ThreadingHTTPServer(server_address, handler_class)
    except OSError:
        alt_port = PORT + 1
        print(f"[!] Puerto {PORT} ocupado, intentando con {alt_port}...")
        httpd = ThreadingHTTPServer(('', alt_port), handler_class)

    port = httpd.server_address[1]
    url = f"http://localhost:{port}"

    print("=" * 68)
    print("  🏁 UNDERTRACK — CircuitDNA Platform Server")
    print("=" * 68)
    print(f"  ● Servidor activo en:  {url}")
    print(f"  ● Directorio servido: {DIRECTORY}")
    print("  ● Presioná Ctrl+C para detener el servidor.")
    print("=" * 68)

    # Abrir navegador si no se pasa --no-browser
    if '--no-browser' not in sys.argv:
        try:
            webbrowser.open(url)
        except Exception:
            pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[✓] Servidor UNDERTRACK detenido.")
        httpd.server_close()

if __name__ == '__main__':
    run()

