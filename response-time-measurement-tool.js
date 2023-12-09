(() => {

    // Key for the measurement session.
    const sessionKey = 'measurement';

    const amountOfMeasurements = 3;

    // Is this the first measurement?
    if (!sessionStorage.getItem(sessionKey)) {
        // Yes, initiate with number and data.
        // Measure response time.
        const responseTime = makeMeasurement();

        // Init measurement number.
        const number = 1;

        // Initilize data.
        const data = `number=${number};time=${responseTime}`;

        // Save session.
        sessionStorage.setItem(sessionKey, data);

        // Reload page.
        window.location.reload();
        
    } else {
        // No, this is an ongoing measurement.
        // Get the data from session.
        const data = sessionStorage.getItem(sessionKey);

        // Get latest measurement number.
        const number = parseInt(data.split(',')[0].split(';')[0].split('=')[1]);
        
        // ... and increase by 1, new measurement you know.
        const current = number + 1;

        // Make measurement again.
        const responseTime = makeMeasurement();

        // Append data from this measurement.
        const newData = `number=${current};time=${responseTime},`+data;
        
        // Save to session.
        sessionStorage.setItem(sessionKey, newData);

        // Check if we are done.
        if (current < amountOfMeasurements) {
            // No, keep going!
            window.location.reload();
        } else {
            // Yep, let's end it here!

            // Prepare CSV file with the data.
            const csvData = "data:text/csv;charset=utf-8,"+sessionStorage.getItem(sessionKey);
            const filename = createCSVFilename();

            // Prepare download anchor.
            const anchor = document.createElement('A');
            anchor.setAttribute('download', filename);
            anchor.href = csvData;
            anchor.target = '_blank';

            // Download.
            document.body.appendChild(anchor);
            anchor.click();

            // Reset measurement.
            clearMeasurement();

        }

    }

    function clearMeasurement() {
        if (sessionStorage.getItem(sessionKey)) {
            sessionStorage.clear();
        }
    }

    function createCSVFilename() {       
        // Preparation for filename.
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const id = generateRandomID();
        // Return filename.
        return `response_time_measurement_tool_result_${id}_${year}_${month}_${day}.csv`;
    }

    function generateRandomID() {
        const chars = [1,2,3,4,5,6,7,8,9,0,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        let id = "";
        for (let i = 0; i < 6; i++) {
            const n = Math.floor(Math.random() * (chars.length-1));
            id += chars[n].toString();
        }
        return id;
    }

    function makeMeasurement() {
        return window.performance.measure(window.onload).duration;
    }

})();