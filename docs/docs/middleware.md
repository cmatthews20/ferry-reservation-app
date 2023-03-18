I had to add :

from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=[""]
)

in api.py to get api calls to work

Reasoning:
Why do we need CORSMiddleware? In order to make cross-origin requests -- i.e., requests that originate from a different protocol, IP address, domain name, or port -- you need to enable Cross Origin Resource Sharing (CORS). FastAPI's built-in CORSMiddleware handles this for us.

The above configuration will allow cross-origin requests from our frontend domain and port which will run at localhost:3000.