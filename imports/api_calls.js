// Generic ExtendScript API helpers.
//
// These functions deliberately avoid anything specific to a particular route.
// Route-specific payload construction and response interpretation should stay in
// the calling script.

function api_is_array(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}

function api_json_escape(value) {
    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/\"/g, "\\\"")
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t");
}

function api_json_stringify(value) {
    if (value === null) {
        return "null";
    }
    if (typeof value == "number" || typeof value == "boolean") {
        return String(value);
    }
    if (typeof value == "string") {
        return "\"" + api_json_escape(value) + "\"";
    }
    if (api_is_array(value)) {
        var array_parts = [];
        for (var i = 0; i < value.length; i++) {
            array_parts.push(api_json_stringify(value[i]));
        }
        return "[" + array_parts.join(",") + "]";
    }

    var object_parts = [];
    for (var key in value) {
        object_parts.push("\"" + api_json_escape(key) + "\":" + api_json_stringify(value[key]));
    }
    return "{" + object_parts.join(",") + "}";
}

function api_trim_string(value) {
    return String(value).replace(/^\s+|\s+$/g, "");
}

function api_utf8_byte_length(value) {
    var count = 0;
    value = String(value);
    for (var i = 0; i < value.length; i++) {
        var code = value.charCodeAt(i);
        if (code < 0x80) {
            count += 1;
        } else if (code < 0x800) {
            count += 2;
        } else if (code >= 0xD800 && code <= 0xDBFF) {
            count += 4;
            i += 1;
        } else {
            count += 3;
        }
    }
    return count;
}

function api_parse_http_response(response) {
    var separator_index = response.indexOf("\r\n\r\n");
    var separator_length = 4;

    if (separator_index < 0) {
        separator_index = response.indexOf("\n\n");
        separator_length = 2;
    }

    var header = separator_index >= 0 ? response.substring(0, separator_index) : "";
    var body = separator_index >= 0 ? response.substring(separator_index + separator_length) : response;
    var status_match = header.match(/HTTP\/\d\.\d\s+(\d+)/);
    var status_code = status_match ? Number(status_match[1]) : null;

    return {
        status_code: status_code,
        header: header,
        body: body
    };
}

function api_post(host, port, path, body, content_type, timeout_seconds) {
    var socket = new Socket();
    socket.timeout = timeout_seconds || 600;

    var host_with_port = host + ":" + port;
    if (!socket.open(host_with_port, "UTF-8")) {
        throw new Error("Could not connect to http://" + host_with_port + path);
    }

    var request = "POST " + path + " HTTP/1.0\r\n" +
        "Host: " + host_with_port + "\r\n" +
        "Content-Type: " + content_type + "\r\n" +
        "Content-Length: " + api_utf8_byte_length(body) + "\r\n" +
        "Connection: close\r\n" +
        "\r\n" +
        body;

    socket.write(request);
    var response = socket.read(9999999);
    socket.close();

    var parsed_response = api_parse_http_response(response);
    if (parsed_response.status_code !== null &&
        (parsed_response.status_code < 200 || parsed_response.status_code >= 300)) {
        throw new Error("API returned HTTP " + parsed_response.status_code + ": " + parsed_response.body);
    }

    return parsed_response.body;
}

function api_post_json(host, port, path, payload, timeout_seconds) {
    return api_post(
        host,
        port,
        path,
        api_json_stringify(payload),
        "application/json",
        timeout_seconds
    );
}
