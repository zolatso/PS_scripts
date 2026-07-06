var thisFolder = File($.fileName).parent;

$.evalFile(File(thisFolder + '/imports/functions.js'));
$.evalFile(File(thisFolder + '/imports/ps_functions.js'));
$.evalFile(File(thisFolder + '/imports/config.js'));
$.evalFile(File(thisFolder + '/imports/api_calls.js'));

var THREADS_API_PATH = "/threads";

var doc = app.activeDocument;
var filename = doc.name;
var dimensions = [
    doc.selection.bounds[2] - doc.selection.bounds[0],
    doc.selection.bounds[3] - doc.selection.bounds[1]
];
var angle = 45;
var stripe_width = 5;
var gap = 5;
var color_type = "color_values";
var color_map = "viridis";
var color_map_intervals = 7;
var color_values = [
    [0, 0, 0],
    [100, 50, 50]
];
var sigmas = [5.0, 5.0, 5.0];

function unit_to_px(value) {
    if (value != null && value.as) {
        return value.as("px");
    }
    return Number(value);
}

function build_threads_payload(filename, dimensions, angle, stripe_width, gap, color, sigmas) {
    return {
        filename: filename,
        width: Math.round(unit_to_px(dimensions[0])),
        height: Math.round(unit_to_px(dimensions[1])),
        angle: angle,
        stripe_width: stripe_width,
        gap: gap,
        color: color,
        sigmas: sigmas
    };
}

function threads_filename_to_file_path(returned_filename) {
    returned_filename = api_trim_string(returned_filename);

    if (!returned_filename) {
        throw new Error("Threads API returned an empty filename.");
    }
    if (!API_OUTPUT_FOLDER.exists) {
        throw new Error("API_OUTPUT_FOLDER does not exist: " + API_OUTPUT_FOLDER.fsName);
    }

    return API_OUTPUT_FOLDER.fsName + "/" + returned_filename;
}

function post_json_to_threads_api(payload) {
    var returned_filename = api_post_json(
        API_HOST,
        API_PORT,
        THREADS_API_PATH,
        payload,
        API_TIMEOUT_SECONDS
    );

    return threads_filename_to_file_path(returned_filename);
}

function call_threads_api_with_color_map(filename, dimensions, angle, stripe_width, gap, color_map, color_map_intervals, sigmas) {
    var payload = build_threads_payload(
        filename,
        dimensions,
        angle,
        stripe_width,
        gap,
        {
            color_type: "color_map",
            color_map: color_map,
            color_map_intervals: color_map_intervals
        },
        sigmas
    );

    return post_json_to_threads_api(payload);
}

function call_threads_api_with_color_values(filename, dimensions, angle, stripe_width, gap, color_values, sigmas) {
    var payload = build_threads_payload(
        filename,
        dimensions,
        angle,
        stripe_width,
        gap,
        {
            color_type: "values",
            color_list: color_values
        },
        sigmas
    );

    return post_json_to_threads_api(payload);
}

var paste_location = get_sc(
    doc.selection.bounds[0],
    doc.selection.bounds[1],
    doc.selection.bounds[2],
    doc.selection.bounds[3]
);
var create_channel = store_selection_as_channel();

var original_doc = doc;
var new_file;

if (color_type == "color_map") {
    new_file = call_threads_api_with_color_map(
        filename,
        dimensions,
        angle,
        stripe_width,
        gap,
        color_map,
        color_map_intervals,
        sigmas
    );
} else if (color_type == "color_values") {
    new_file = call_threads_api_with_color_values(
        filename,
        dimensions,
        angle,
        stripe_width,
        gap,
        color_values,
        sigmas
    );
} else {
    throw new Error("Unknown color_type: " + color_type);
}

// Open the generated file, copy it, close it, then return to the original document.
var generated_file = File(new_file);
if (!generated_file.exists) {
    throw new Error("Threads API returned a filename, but the resolved file does not exist: " + new_file);
}

var generated_doc = app.open(generated_file);
generated_doc.selection.selectAll();
generated_doc.selection.copy(true);
generated_doc.close(SaveOptions.DONOTSAVECHANGES);
app.activeDocument = original_doc;

// Location of pasting in original document uses a selection based on the original selection
doc = app.activeDocument;
dal = doc.artLayers;
doc.selection.select(paste_location);
doc.paste();
// Apply the channel we created at the start of the script
doc.selection.load(create_channel);
applySelectionAsLayerMask();
doc.selection.deselect();
create_channel.remove();
