# Response Time Measurement Tool

This JavaScript tool, "response-time-measurement-tool.js", is designed to measure the response time of websites. It performs a specified number of measurements to calculate the response time accurately. This tool also includes a minified version named "response-time-measurement-tool.min.js" for efficient integration.

## Features

- **Multiple Measurements**: Conducts a predetermined number of measurements for accuracy.
- **Automatic Page Reloads**: Automates the process by reloading the page for each measurement.
- **Session Storage**: Utilizes session storage to track ongoing measurements.
- **CSV Export**: Generates a CSV file with the measurement results, conveniently named with the date and a unique identifier.

## How It Works

1. **Initiates Measurement**: On the first visit, the script starts the measurement process and stores the initial data in the session storage.
2. **Continues Measurement**: On subsequent page reloads, it continues measuring and appending data until the pre-set number of measurements is reached.
3. **Result Compilation**: Once all measurements are complete, it compiles the data into a CSV file and initiates the download.

## Usage

Simply include the script in your HTML file. The script will automatically start the measurement process when the page loads. The number of measurements is set within the script, which can be adjusted as per your requirements.

```html
<script src="path/to/response-time-measurement-tool.js"></script>
```