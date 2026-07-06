// Shared API / output settings for Photoshop ExtendScript scripts.

// Socket.open wants host and port as "host:port". Keeping these separate makes
// it easier to reuse them across different endpoints.
var API_HOST = "127.0.0.1";
var API_PORT = 8000;
var API_TIMEOUT_SECONDS = 600;

// Folder where the Python/FastAPI server writes generated files.
// If an endpoint returns only "generated.png", scripts can open:
// File(API_OUTPUT_FOLDER.fsName + "/" + returned_filename)
//
// Change this to match your FastAPI output directory.
var API_OUTPUT_FOLDER = Folder("~/code/python_images/tmp");
